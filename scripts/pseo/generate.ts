import type {
  FAQItem,
  ImageAssetRef,
  PseoArabicContent,
  PseoBlock,
  PseoPage,
  PseoSection,
} from "../../src/types";
import { getFactSheet } from "../../src/data/fact-sheets";
import {
  getImageByFilename,
  getImageBySrc,
  matchImageByAuthority,
  matchImageByTopic,
} from "../../src/data/images";
import { evaluateArabicQuality } from "./arabic";
import { callDeepSeek } from "./deepseek";
import {
  appendFactReview,
  decideReviewStatus,
  scanForUnverifiedNumbers,
} from "./fact-flag";
import { loadPseoPages, appendPseoPage, appendPseoArabicEntry } from "./pseo-store";
import {
  buildArSystemPrompt,
  buildArUserPrompt,
  buildEnSystemPrompt,
  buildEnUserPrompt,
} from "./prompts";
import { evaluateQuality, qualityFeedback } from "./quality";
import {
  enforceMetaDescription,
  enforceMetaTitle,
  ensureInternalLinks,
} from "./normalize";
import { getNextBatch, loadQueue, saveQueue, updateQueueItem } from "./queue";
import type { GeneratedPseoContent, PseoQueueItem } from "./types";
import { loadEnvLocal, parseJsonContent } from "./utils";

// Load .env.local (DEEPSEEK_API_KEY etc.) so local runs work out of the box.
// No-op when the key is already in the environment (GitHub Actions secrets).
loadEnvLocal();

/**
 * pSEO orchestrator.
 *
 * Flow per item:
 *   EN prompt → DeepSeek (JSON) → parse → EN quality gate
 *   AR prompt (with EN draft + Gulf-Arabic instructions) → DeepSeek (JSON)
 *   → parse → AR quality gate (contextual, not word-for-word)
 *   → fact gate (numbers vs fact sheet) → reviewStatus
 *   → compose PseoPage + AR entry → append to store → update queue status
 *
 * Failure → regenerate with feedback up to 2× → mark queue item "failed".
 */

const MAX_RETRIES = 2; // 1 initial + 2 regeneration attempts

/** Drop blocks that don't match the PseoBlock contract (defensive vs drift). */
function sanitizeBlocks(blocks: unknown): PseoBlock[] {
  if (!Array.isArray(blocks)) return [];
  return blocks.filter((b): b is PseoBlock => {
    if (!b || typeof b !== "object") return false;
    const t = (b as { type?: unknown }).type;
    if (t === "paragraph" || t === "quote" || t === "heading") {
      return typeof (b as { text?: unknown }).text === "string";
    }
    if (t === "list") {
      return Array.isArray((b as { items?: unknown }).items);
    }
    if (t === "table") {
      const tb = b as { headers?: unknown; rows?: unknown };
      return Array.isArray(tb.headers) && Array.isArray(tb.rows);
    }
    if (t === "image") {
      const ib = b as { image?: unknown };
      if (!ib.image || typeof ib.image !== "object") return false;
      const ref = ib.image as {
        src?: unknown;
        alt?: unknown;
        caption?: unknown;
        width?: unknown;
        height?: unknown;
      };
      // The src must reference a real registered asset — a hallucinated
      // filename would 404 at render time.
      if (typeof ref.src !== "string" || !getImageBySrc(ref.src)) return false;
      if (typeof ref.alt !== "string" || ref.alt.trim() === "") return false;
      const clean: ImageAssetRef = { src: ref.src, alt: ref.alt };
      if (typeof ref.caption === "string" && ref.caption.trim() !== "") {
        clean.caption = ref.caption;
      }
      if (
        typeof ref.width === "number" &&
        Number.isFinite(ref.width) &&
        typeof ref.height === "number" &&
        Number.isFinite(ref.height)
      ) {
        clean.width = ref.width;
        clean.height = ref.height;
      }
      ib.image = clean;
      return true;
    }
    return false;
  });
}

function normalizeContent(
  raw: GeneratedPseoContent,
  item: PseoQueueItem,
  lang: "en" | "ar"
): GeneratedPseoContent {
  // Defensive: pin the keyword fields to the queue item and enforce the SEO
  // metadata character windows deterministically (LLMs routinely miss char
  // limits or drop the brand suffix). Sections/blocks/faqs are sanitized so a
  // malformed model draft (e.g. a section missing `blocks`) can never crash
  // the downstream `.map()` calls in the quality gate.
  return {
    ...raw,
    primaryKeyword: item.primaryKeyword,
    secondaryKeywords: Array.from(
      new Set([...(raw.secondaryKeywords ?? []), ...item.secondaryKeywords])
    ),
    metaTitle: enforceMetaTitle(
      raw.metaTitle || (lang === "en" ? item.title : item.ar.title),
      lang
    ),
    metaDescription: enforceMetaDescription(raw.metaDescription ?? "", lang),
    sections: (raw.sections ?? []).map((s) => ({
      heading: typeof s.heading === "string" ? s.heading : "",
      ...(typeof s.anchor === "string" ? { anchor: s.anchor } : {}),
      blocks: sanitizeBlocks(s.blocks),
    })),
    faqs: (raw.faqs ?? []).filter(
      (f) =>
        f &&
        typeof f.question === "string" &&
        typeof f.answer === "string" &&
        f.question.trim() !== "" &&
        f.answer.trim() !== ""
    ),
  };
}

async function generateEn(
  item: PseoQueueItem,
  feedback?: string
): Promise<GeneratedPseoContent> {
  const sheet = getFactSheet(item.authority);
  const user = buildEnUserPrompt(item, sheet) + (feedback ? `\n\n${feedback}` : "");
  const out = await callDeepSeek({
    system: buildEnSystemPrompt(),
    user,
    jsonMode: true,
    temperature: 0.7,
    maxTokens: 6000,
  });
  const parsed = parseJsonContent<GeneratedPseoContent>(out);
  return ensureInternalLinks(normalizeContent(parsed, item, "en"), item, "en");
}

async function generateAr(
  item: PseoQueueItem,
  en: GeneratedPseoContent,
  feedback?: string
): Promise<GeneratedPseoContent> {
  const sheet = getFactSheet(item.authority);
  const user = buildArUserPrompt(item, sheet, JSON.stringify(en, null, 2)) +
    (feedback ? `\n\n${feedback}` : "");
  const out = await callDeepSeek({
    system: buildArSystemPrompt(),
    user,
    jsonMode: true,
    temperature: 0.5, // slightly lower for Arabic precision
    maxTokens: 8000, // Arabic is token-hungrier than English — headroom to avoid truncation
  });
  const parsed = parseJsonContent<GeneratedPseoContent>(out);
  return ensureInternalLinks(normalizeContent(parsed, item, "ar"), item, "ar");
}

/* ------------------------- image matching ------------------------- */

function pickImage(item: PseoQueueItem): ImageAssetRef | undefined {
  let img =
    (item.imageHint ? getImageByFilename(item.imageHint) : undefined) ??
    matchImageByAuthority(item.authority) ??
    matchImageByTopic(item.topicTags);
  if (!img) return undefined;
  return {
    src: img.src,
    alt: img.alt,
    caption: img.caption,
    width: img.width,
    height: img.height,
  };
}

/* ------------------------- sibling body text (for similarity gate) ------------------------- */

function pageBody(page: PseoPage): string {
  return [
    page.directAnswer,
    ...page.sections.map((s) => `${s.heading}\n${sectionText(s)}`),
    ...page.faqs.map((f) => `${f.question}\n${f.answer}`),
  ].join("\n\n");
}

function sectionText(s: PseoSection): string {
  return s.blocks.map(blockText).join(" ");
}

function blockText(b: PseoBlock): string {
  switch (b.type) {
    case "paragraph":
    case "quote":
    case "heading":
      return b.text;
    case "list":
      return b.items.join(" ");
    case "table":
      return [...b.headers, ...b.rows.flat()].join(" ");
    case "image":
      return b.image.alt ?? "";
  }
}

/** Sibling pages = previously generated pages sharing ≥1 related approval slug. */
function siblingBodies(item: PseoQueueItem): { en: string[]; ar: string[] } {
  const shared = new Set(item.relatedApprovalSlugs);
  const en: string[] = [];
  const ar: string[] = [];
  for (const p of loadPseoPages()) {
    const overlaps = p.relatedSlugs.some((s) => shared.has(s));
    if (!overlaps) continue;
    en.push(pageBody(p));
    if (p.ar) {
      ar.push(
        [
          p.ar.directAnswer,
          ...p.ar.sections.map((s) => `${s.heading}\n${sectionText(s)}`),
          ...p.ar.faqs.map((f) => `${f.question}\n${f.answer}`),
        ].join("\n\n")
      );
    }
  }
  return { en, ar };
}

/* ------------------------- compose final page ------------------------- */

function composePage(
  item: PseoQueueItem,
  en: GeneratedPseoContent,
  ar: GeneratedPseoContent,
  reviewStatus: "auto" | "needs-review",
  image: ImageAssetRef | undefined,
  sheetLastVerified: string,
  arImage?: ImageAssetRef
): { page: PseoPage; arEntry: { slug: string; ar: PseoArabicContent } } {
  const relatedSlugs = Array.from(
    new Set([...(item.relatedApprovalSlugs ?? [])])
  );

  const arContent: PseoArabicContent = {
    slug: item.slug,
    title: item.ar.title,
    metaTitle: ar.metaTitle,
    metaDescription: ar.metaDescription,
    primaryKeyword: ar.primaryKeyword,
    secondaryKeywords: ar.secondaryKeywords,
    directAnswer: ar.directAnswer,
    sections: ar.sections,
    faqs: ar.faqs,
  };

  const page: PseoPage = {
    slug: item.slug,
    kind: item.kind,
    title: item.title,
    metaTitle: en.metaTitle,
    metaDescription: en.metaDescription,
    primaryKeyword: en.primaryKeyword,
    secondaryKeywords: en.secondaryKeywords,
    directAnswer: en.directAnswer,
    sections: en.sections,
    faqs: en.faqs,
    relatedSlugs,
    image: image ?? arImage,
    parentApprovalSlug: item.relatedApprovalSlugs?.[0],
    lastVerified: sheetLastVerified,
    reviewStatus,
    ar: arContent,
  };

  return { page, arEntry: { slug: item.slug, ar: arContent } };
}

/* ------------------------- single-item pipeline ------------------------- */

export async function generateItem(item: PseoQueueItem): Promise<
  { ok: true; slug: string } | { ok: false; slug: string; error: string }
> {
  const sheet = getFactSheet(item.authority);
  const siblings = siblingBodies(item);

  try {
    // EN with retry-on-feedback
    let en: GeneratedPseoContent | null = null;
    let enFeedback: string | undefined;
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      const draft = await generateEn(item, enFeedback);
      const report = evaluateQuality({
        content: draft,
        kind: item.kind,
        siblings: siblings.en,
      });
      if (report.pass) {
        en = draft;
        break;
      }
      enFeedback = qualityFeedback(report);
      console.warn(`[${item.slug}] EN quality fail (attempt ${attempt + 1}): ${report.failures.join("; ")}`);
    }
    if (!en) {
      throw new Error("EN content failed the quality gate after regeneration");
    }

    // AR with retry-on-feedback
    let ar: GeneratedPseoContent | null = null;
    let arFeedback: string | undefined;
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      const draft = await generateAr(item, en, arFeedback);
      const report = evaluateArabicQuality(en, draft, item.kind, siblings.ar);
      if (report.pass) {
        ar = draft;
        break;
      }
      arFeedback = qualityFeedback(report);
      console.warn(`[${item.slug}] AR quality fail (attempt ${attempt + 1}): ${report.failures.join("; ")}`);
    }
    if (!ar) {
      throw new Error("AR content failed the quality gate after regeneration");
    }

    // Fact gate (YMYL)
    const factIssues = scanForUnverifiedNumbers(en, sheet);
    const reviewStatus = decideReviewStatus(sheet, factIssues);
    if (factIssues.length > 0) appendFactReview(item.slug, item.authority, factIssues);

    const image = pickImage(item);
    const { page, arEntry } = composePage(
      item,
      en,
      ar,
      reviewStatus,
      image,
      sheet?.lastVerified ?? "pending"
    );

    appendPseoPage(page);
    appendPseoArabicEntry(arEntry);

    return { ok: true, slug: item.slug };
  } catch (err) {
    const error = (err as Error).message;
    console.error(`[${item.slug}] generation failed: ${error}`);
    return { ok: false, slug: item.slug, error };
  }
}

/* ------------------------- batch orchestrator ------------------------- */

export async function runBatch(batchSize = 3): Promise<{ generated: number; failed: string[] }> {
  const items = loadQueue();
  const batch = getNextBatch(items, batchSize);
  if (batch.length === 0) {
    console.log("No pending items scheduled for today.");
    return { generated: 0, failed: [] };
  }
  console.log(`Generating ${batch.length} page(s): ${batch.map((b) => b.slug).join(", ")}`);

  const failed: string[] = [];
  let generated = 0;

  for (const item of batch) {
    updateQueueItem(items, item.id, { status: "in-progress", attempts: (item.attempts ?? 0) + 1 });
    const result = await generateItem(item);
    if (result.ok) {
      updateQueueItem(items, item.id, {
        status: "done",
        generatedAt: new Date().toISOString(),
        lastError: undefined,
      });
      generated++;
    } else {
      updateQueueItem(items, item.id, { status: "failed", lastError: result.error });
      failed.push(item.slug);
    }
  }

  saveQueue(items);
  console.log(`Done: ${generated} generated, ${failed.length} failed.`);
  if (failed.length) console.log(`Failed: ${failed.join(", ")}`);
  return { generated, failed };
}

/* CLI entry — `npx tsx scripts/pseo/generate.ts [batchSize]` */
if (process.argv[1] && process.argv[1].endsWith("generate.ts")) {
  const batchSize = Number(process.argv[2]) || 3;
  runBatch(batchSize)
    .then(({ failed }) => {
      if (failed.length > 0) process.exitCode = 1;
    })
    .catch((err) => {
      console.error(err);
      process.exitCode = 1;
    });
}

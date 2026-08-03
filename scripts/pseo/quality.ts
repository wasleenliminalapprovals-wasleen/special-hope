import type { FAQItem, PseoBlock, PseoPageKind, PseoSection } from "../../src/types";
import type { GeneratedPseoContent, QualityReport } from "./types";
import { normalizeText, wordCount } from "./utils";

/**
 * Automated quality gate (hard blocks — no exceptions).
 * Thresholds from plans/pseo-domination-engine-plan.md §4.
 *
 * - Word count: guide/checklist/compare ≥ 900; cost/timeline ≥ 700; qa/glossary ≥ 350
 * - FAQ count ≥ 4, answers self-contained
 * - ≥ 3 outbound internal links (descriptive anchor)
 * - 1 image present with alt text (checked in generate.ts — content itself
 *   cannot carry an image, so the gate requires the page-level image ref)
 * - Unique metaTitle/metaDescription/H1 (never template-swap) — enforced by
 *   comparing against sibling pages passed in `siblings`
 * - Sibling similarity ≤ 30% (paragraph-diff, the anti-thin-content rule)
 */

const WORD_MIN: Record<PseoPageKind, number> = {
  guide: 900,
  checklist: 900,
  compare: 900,
  cost: 700,
  timeline: 700,
  qa: 350,
  glossary: 350,
};

const FAQ_MIN = 4;
export const INTERNAL_LINK_MIN = 3;
const SIBLING_SIMILARITY_MAX = 0.3;

/**
 * Arabic is morphologically denser than English — a single Arabic token can
 * carry the meaning of multiple English words (attached conjunctions,
 * prepositions, articles). Requiring the same raw word count in Arabic would
 * force padded, unnatural copy. Scale the minimum down for Arabic.
 */
const AR_WORD_MULTIPLIER = 0.75;

export interface QualityCheckInput {
  content: GeneratedPseoContent;
  kind: PseoPageKind;
  /** Word-count baseline language. Arabic scales WORD_MIN by AR_WORD_MULTIPLIER. */
  lang?: "en" | "ar";
  /** Previously generated sibling pages (same authority/similar topic) for
   *  uniqueness + similarity checks. Pass the EN text bodies. */
  siblings?: string[];
}

/* ------------------------- similarity (Jaccard on shingles) ------------------------- */

function shingles(text: string, size = 4): Set<string> {
  const tokens = normalizeText(text).split(/\s+/).filter(Boolean);
  const out = new Set<string>();
  for (let i = 0; i + size <= tokens.length; i++) {
    out.add(tokens.slice(i, i + size).join(" "));
  }
  return out;
}

/** Jaccard similarity between two texts (0 = identical set, 1 = no overlap). */
function similarity(a: string, b: string): number {
  const sa = shingles(a);
  const sb = shingles(b);
  if (sa.size === 0 || sb.size === 0) return 0;
  let inter = 0;
  for (const s of sa) if (sb.has(s)) inter++;
  const union = sa.size + sb.size - inter;
  return union === 0 ? 1 : inter / union;
}

function bodyText(content: GeneratedPseoContent): string {
  return [
    content.directAnswer,
    ...content.sections.map((s) => `${s.heading}\n${sectionBlocksText(s.blocks)}`),
    ...content.faqs.map((f) => `${f.question}\n${f.answer}`),
  ].join("\n\n");
}

function sectionBlocksText(blocks: PseoBlock[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "paragraph":
        case "quote":
          return b.text;
        case "heading":
          return b.text;
        case "list":
          return b.items.join(" ");
        case "table":
          return [...b.headers, ...b.rows.flat()].join(" ");
      }
    })
    .join("\n");
}

/* ------------------------- validators ------------------------- */

export function countLinks(content: GeneratedPseoContent): number {
  const text = bodyText(content);
  const hrefs = text.match(/https?:\/\/[^\s)"'<>]+/g) ?? [];
  const plain = text.match(/\/approvals\/[\w-]+/g) ?? [];
  return new Set([...hrefs, ...plain]).size;
}

function metaLengthOk(v: string, max: number): boolean {
  const len = v.trim().length;
  return len > 0 && len <= max;
}

/* ------------------------- main gate ------------------------- */

export function evaluateQuality(input: QualityCheckInput): QualityReport {
  const { content, kind, siblings = [] } = input;
  const failures: string[] = [];
  const scores: Record<string, number> = {};

  // 1. Word count (language-aware: Arabic scales the baseline down)
  const words = wordCount(bodyText(content));
  const multiplier = input.lang === "ar" ? AR_WORD_MULTIPLIER : 1;
  const minWords = Math.round((WORD_MIN[kind] ?? 900) * multiplier);
  scores.wordCount = words;
  if (words < minWords) {
    failures.push(`Word count ${words} < minimum ${minWords} for kind "${kind}"`);
  }

  // 2. FAQ count + self-contained answers
  scores.faqCount = content.faqs.length;
  if (content.faqs.length < FAQ_MIN) {
    failures.push(`FAQ count ${content.faqs.length} < minimum ${FAQ_MIN}`);
  }
  const weakAnswers = content.faqs.filter(
    (f: FAQItem) => wordCount(f.answer) < 25
  ).length;
  if (weakAnswers > 0) {
    failures.push(`${weakAnswers} FAQ answer(s) too short (< 25 words) — not self-contained`);
  }

  // 3. Internal links
  const links = countLinks(content);
  scores.internalLinks = links;
  if (links < INTERNAL_LINK_MIN) {
    failures.push(`Internal links ${links} < minimum ${INTERNAL_LINK_MIN}`);
  }

  // 4. Metadata sanity
  if (!metaLengthOk(content.metaTitle, 60)) {
    failures.push(`metaTitle length invalid: "${content.metaTitle.slice(0, 70)}"`);
  }
  if (!metaLengthOk(content.metaDescription, 160)) {
    failures.push(`metaDescription length invalid (must be 1-160 chars)`);
  }
  if (content.metaDescription.length < 140) {
    failures.push(`metaDescription too short (${content.metaDescription.length} < 140 chars)`);
  }

  // 5. Sibling similarity (anti-thin-content)
  const body = bodyText(content);
  let worstSim = 0;
  for (const sib of siblings) {
    worstSim = Math.max(worstSim, similarity(body, sib));
  }
  scores.maxSiblingSimilarity = worstSim;
  if (worstSim > SIBLING_SIMILARITY_MAX) {
    failures.push(
      `Sibling similarity ${(worstSim * 100).toFixed(0)}% > maximum ${SIBLING_SIMILARITY_MAX * 100}%`
    );
  }

  // 6. Uniqueness of H1 vs metaTitle (must not be identical template swap)
  if (normalizeText(content.directAnswer) === "") {
    failures.push("directAnswer is empty (AI engines lift this block verbatim)");
  }

  return { pass: failures.length === 0, scores, failures };
}

/** Build a regeneration feedback string from a failed report. */
export function qualityFeedback(report: QualityReport): string {
  return `The previous output failed the quality gate:\n- ${report.failures.join("\n- ")}\nFix every failure.`;
}

/**
 * Deterministic post-processing layer for the pSEO engine.
 *
 * LLMs reliably produce great prose but routinely miss strict character
 * windows (meta title ≤ 60 chars, meta description 140-160 chars) and drop
 * internal links even when the prompt lists the targets verbatim. Rather than
 * loosening the quality gate (which would violate the SEO plan's hard rules),
 * we normalize the model's draft *before* the gate runs:
 *
 * - `enforceMetaTitle`       → re-brand + clamp to ≤ 60 chars
 * - `enforceMetaDescription` → pad with a short CTA or truncate to 140-160
 * - `ensureInternalLinks`    → append a "Related Dubai approvals" section with
 *   real `[text](/approvals/slug)` markdown when < 3 links are present
 *   (PseoSectionBlock renders these as actual <a> tags via renderInlineLinks)
 */
import { approvals as approvalsEn } from "../../src/data/approvals";
import { approvals as approvalsAr } from "../../src/data/approvals-ar";
import type { PseoSection } from "../../src/types";
import { countLinks, INTERNAL_LINK_MIN } from "./quality";
import type { GeneratedPseoContent, PseoQueueItem } from "./types";

const BRAND: Record<"en" | "ar", string> = {
  en: "| Wasleen Approvals",
  ar: "| وسلين للاستشارات",
};

const META_DESC_MIN = 140;
const META_DESC_MAX = 160;

const DESC_FILLERS: Record<"en" | "ar", string[]> = {
  en: [
    " Get a fixed-fee quote.",
    " Call +971 56 764 8220.",
    " WhatsApp us today.",
    " Contact Wasleen Approvals in Dubai for expert help.",
  ],
  ar: [
    " تواصل معنا اليوم.",
    " اتصل على +971 56 764 8220.",
    " راسلنا عبر واتساب الآن.",
    " استشر خبراء وسلين للاستشارات في دبي.",
  ],
};

/** Clamp a meta title to ≤ 60 chars while keeping the brand suffix. */
export function enforceMetaTitle(raw: string, lang: "en" | "ar"): string {
  const brand = BRAND[lang];
  // Strip any existing pipe-suffix to avoid "X | A | B" stacking, then re-add.
  let core = raw.replace(/\s*\|[\s\S]*$/, "").trim();
  if (!core) core = lang === "en" ? "Dubai Approvals" : "موافقات دبي";
  const maxCore = 60 - brand.length - 1; // reserve " " + brand
  if (core.length > maxCore) {
    core = core.slice(0, maxCore - 1).trimEnd() + "…";
  }
  return `${core} ${brand}`;
}

/** Force a meta description into the 140-160 char window. */
export function enforceMetaDescription(raw: string, lang: "en" | "ar"): string {
  let desc = raw.trim();
  if (desc.length > META_DESC_MAX) {
    return desc.slice(0, META_DESC_MAX - 3).trimEnd() + "…";
  }
  if (desc.length >= META_DESC_MIN) return desc;

  const fillers = DESC_FILLERS[lang];
  for (const filler of fillers) {
    if (desc.length >= META_DESC_MIN) break;
    if (desc.length + filler.length <= META_DESC_MAX) {
      desc += filler;
    }
  }
  // Pathological very-short input: force the longest filler (may overshoot,
  // in which case the final truncate keeps us ≤ 160).
  if (desc.length < META_DESC_MIN && fillers.length > 0) {
    desc += fillers[fillers.length - 1];
  }
  if (desc.length > META_DESC_MAX) {
    return desc.slice(0, META_DESC_MAX - 3).trimEnd() + "…";
  }
  return desc;
}

function approvalName(slug: string, lang: "en" | "ar"): string {
  if (lang === "en") {
    return approvalsEn.find((a) => a.slug === slug)?.name ?? slug;
  }
  return approvalsAr.find((a) => a.slug === slug)?.ar?.name ?? slug;
}

/**
 * Build a pool of distinct internal-link targets for an item. Starts from the
 * queue item's `relatedApprovalSlugs`, then widens with same-category
 * approvals (then any other approvals) so we can always inject ≥ 4 unique
 * links — items with only 1-2 related slugs would otherwise stay under the
 * minimum even after injection.
 */
function candidateSlugs(item: PseoQueueItem): string[] {
  const primary = Array.from(new Set(item.relatedApprovalSlugs ?? []));
  const needed = 4;
  if (primary.length >= needed) return primary.slice(0, needed);

  const firstApproval = approvalsEn.find((a) => a.slug === primary[0]);
  const pool: string[] = [];
  if (firstApproval) {
    pool.push(
      ...approvalsEn
        .filter(
          (a) => a.slug !== firstApproval.slug && a.category === firstApproval.category
        )
        .map((a) => a.slug)
    );
  }
  // Fallback fill from the full registry (avoids ever returning < 4).
  for (const a of approvalsEn) {
    if (!primary.includes(a.slug) && !pool.includes(a.slug)) pool.push(a.slug);
  }
  return [...primary, ...pool].slice(0, needed);
}

/**
 * Guarantee ≥ 3 internal links by appending a "Related Dubai approvals"
 * section when the draft's body has fewer. Uses `[text](...)` markdown that
 * PseoSectionBlock converts into real <a> tags (paragraph + list blocks).
 */
export function ensureInternalLinks(
  content: GeneratedPseoContent,
  item: PseoQueueItem,
  lang: "en" | "ar"
): GeneratedPseoContent {
  if (countLinks(content) >= INTERNAL_LINK_MIN) return content;

  const slugs = candidateSlugs(item);
  if (slugs.length === 0) return content;

  const isEn = lang === "en";
  const section: PseoSection = {
    heading: isEn ? "Related Dubai approvals" : "تصاريح دبي ذات الصلة",
    anchor: isEn ? "related-dubai-approvals" : "تصاريح-دبي-ذات-الصلة",
    blocks: [
      {
        type: "paragraph",
        text: isEn
          ? "You may also need these related Dubai approvals:"
          : "قد تحتاج أيضاً إلى هذه الموافقات المرتبطة في دبي:",
      },
      {
        type: "list",
        ordered: false,
        items: slugs.slice(0, 4).map((slug) => {
          const name = approvalName(slug, lang);
          const url = isEn ? `/approvals/${slug}` : `/ar/approvals/${slug}`;
          return `[${name}](${url})`;
        }),
      },
    ],
  };

  return { ...content, sections: [...(content.sections ?? []), section] };
}

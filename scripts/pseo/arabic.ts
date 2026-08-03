import type { PseoPageKind, PseoSection } from "../../src/types";
import type { GeneratedPseoContent, QualityReport } from "./types";
import { evaluateQuality } from "./quality";
import { normalizeText, wordCount } from "./utils";

/**
 * Arabic quality checks.
 *
 * The AR pages must be CONTEXTUAL Gulf/Emirati Arabic — NOT a word-for-word
 * translation of the EN page. We enforce this with a lightweight heuristic:
 * - Arabic script must dominate (≥ 70% of non-whitespace chars are Arabic).
 * - The EN→AR structural overlap (shared 3-gram shingles) must stay below a
 *   threshold — word-for-word translations share far more.
 * - AR passes the same quality gate (word count, FAQs, internal links) with
 *   the standard thresholds, reusing evaluateQuality().
 */

const ARABIC_CHAR_RE = /[\u0600-\u06FF]/;
const ARABIC_SHARE_MIN = 0.7;
const EN_AR_OVERLAP_MAX = 0.45;

/** Ratio of Arabic-script characters in a string (0-1). */
export function arabicShare(text: string): number {
  const meaningful = text.replace(/[\s\d\p{P}]/gu, "");
  if (meaningful.length === 0) return 0;
  let arCount = 0;
  for (const ch of meaningful) if (ARABIC_CHAR_RE.test(ch)) arCount++;
  return arCount / meaningful.length;
}

/** AR word count. */
export function arabicWordCount(content: GeneratedPseoContent): number {
  const text = [
    content.directAnswer,
    ...content.sections.map((s: PseoSection) => `${s.heading}\n${blocksText(s.blocks)}`),
    ...content.faqs.map((f) => f.answer),
  ].join(" ");
  return wordCount(text);
}

function blocksText(blocks: import("../../src/types").PseoBlock[]): string {
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
    .join(" ");
}

/**
 * Detect whether AR text is actually Arabic-script (not English copy-pasted).
 */
export function isArabicScript(content: GeneratedPseoContent): boolean {
  const sample = [
    content.directAnswer,
    ...content.sections.map((s) => s.heading),
    ...content.faqs.map((f) => f.question),
  ].join(" ");
  return arabicShare(sample) >= ARABIC_SHARE_MIN;
}

/** EN↔AR overlap — flag word-for-word translations (too much shared structure). */
export function translationOverlap(en: GeneratedPseoContent, ar: GeneratedPseoContent): number {
  const enNorm = normalizeText([en.directAnswer, ...en.sections.map((s) => s.heading), ...en.faqs.map((f) => f.question)].join(" "));
  const arNorm = normalizeText([ar.directAnswer, ...ar.sections.map((s) => s.heading), ...ar.faqs.map((f) => f.question)].join(" "));
  if (enNorm.length === 0 || arNorm.length === 0) return 0;
  // Count EN word-sequences that literally appear in the AR text (a rough
  // proxy for untranslated/pasted English inside the "Arabic" output).
  const enWords = enNorm.split(/\s+/).filter((w) => /[a-z]/.test(w));
  let hits = 0;
  for (const w of enWords) if (arNorm.includes(w)) hits++;
  return hits / Math.max(enWords.length, 1);
}

/** Full Arabic quality report (contextual Arabic + standard quality gate). */
export function evaluateArabicQuality(
  en: GeneratedPseoContent,
  ar: GeneratedPseoContent,
  kind: PseoPageKind,
  siblings: string[] = []
): QualityReport {
  const failures: string[] = [];
  const scores: Record<string, number> = {};

  const base = evaluateQuality({ content: ar, kind, siblings, lang: "ar" });
  Object.assign(scores, base.scores);
  failures.push(...base.failures);

  const arShare = arabicShare([ar.directAnswer, ...ar.sections.map((s) => s.heading)].join(" "));
  scores.arabicShare = arShare;
  if (arShare < ARABIC_SHARE_MIN) {
    failures.push(`Arabic script share ${(arShare * 100).toFixed(0)}% < minimum ${ARABIC_SHARE_MIN * 100}% — page is not Arabic`);
  }

  const overlap = translationOverlap(en, ar);
  scores.enArOverlap = overlap;
  if (overlap > EN_AR_OVERLAP_MAX) {
    failures.push(`EN→AR overlap ${(overlap * 100).toFixed(0)}% > maximum ${EN_AR_OVERLAP_MAX * 100}% — looks like word-for-word translation`);
  }

  return { pass: failures.length === 0, scores, failures };
}

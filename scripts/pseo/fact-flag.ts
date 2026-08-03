import { appendFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import type { FactSheet, PseoBlock, PseoSection } from "../../src/types";
import type { GeneratedPseoContent } from "./types";
import { ROOT } from "./queue";

/**
 * Fact gate (YMYL protection — non-negotiable).
 *
 * Every fee/timeline/document number in generated content MUST be sourced
 * from the authority fact sheet. Any number NOT present in the fact sheet is
 * flagged:
 *   - `reviewStatus: "needs-review"` is returned (the page still publishes,
 *     but renders a discreet "Last verified: pending review" badge), and
 *   - the finding is appended to `scripts/pseo/fact-review.md` so the user
 *     can verify facts in their weekly review.
 */

export const FACT_REVIEW_PATH = join(ROOT, "scripts", "pseo", "fact-review.md");

/**
 * Extract the money substrings from a sheet amount so content that drops a
 * suffix still matches. E.g. "≈ AED 120–500 per NOC" yields ["aed 120-500",
 * "120-500"], and "≈ AED 1,000–3,000 (indicative)" yields ["aed 1,000-3,000",
 * "1,000-3,000"]. Normalization of "–"/"to" happens later in normToken.
 */
function amountVariants(amount: string): string[] {
  const MONEY_RE = new RegExp(
    `${CURRENCY}\\s*${AMOUNT}(?:\\s*(?:–|—|−|-|to)\\s*${AMOUNT})?|${AMOUNT}(?:\\s*(?:–|—|−|-|to)\\s*${AMOUNT})?`,
    "g"
  );
  const variants: string[] = [];
  for (const m of amount.matchAll(MONEY_RE)) {
    const full = m[0].trim().toLowerCase();
    variants.push(full);
    variants.push(full.replace(/AED|د\.إ|درهم/gi, " ").replace(/\s+/g, " ").trim());
  }
  return variants.filter((v) => v.length > 0);
}

/**
 * Extract the numeric duration prefix from a timeline string so content that
 * drops qualifiers still matches. E.g. "Within 2–7 working days of request"
 * → "2-7 working days"; "5–15 working days after passing final inspection"
 * → "5-15 working days".
 */
function bareDuration(d: string): string {
  const cleaned = d
    .replace(/^within\s+/i, "")
    .replace(/^up to\s+/i, "")
    .replace(/^approximately\s+/i, "")
    .replace(/^approx\.?\s+/i, "");
  const m = cleaned.match(
    /^(\d(?:[\d,]*\d)?(?:\s*(?:–|—|−|-|to)\s*\d(?:[\d,]*\d)?)?\s*(?:working\s+|business\s+)?(?:days?|weeks?|months?|years?))/i
  );
  return (m ? m[1] : cleaned).replace(/\s+/g, " ").trim().toLowerCase();
}

/** All tokens (fees, durations, doc names) that are "allowed" from the sheet. */
export function factSheetAllowlist(sheet: FactSheet | undefined): string[] {
  if (!sheet) return [];
  const tokens: string[] = [];
  for (const f of sheet.fees) {
    tokens.push(f.name, f.amount, ...amountVariants(f.amount), ...(f.notes ?? "").split(/[(),;]/));
  }
  for (const t of sheet.timelines) {
    tokens.push(t.stage, t.duration, bareDuration(t.duration));
  }
  for (const d of sheet.documents) {
    tokens.push(d.name, ...(d.notes ?? "").split(/[(),;]/));
  }
  return tokens.map((t) => t.trim().toLowerCase()).filter((t) => t.length > 0);
}

/**
 * Normalize a numeric token for allowlist comparison: lowercase, collapse
 * whitespace, unify hyphen variants and "to" into "-", drop comma spaces.
 * This prevents false findings when content says "1 to 3" but the sheet says
 * "1-3", or "1,000 – 5,000" vs "1000-5000".
 */
function normToken(t: string): string {
  return t
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s*[–—−]\s*/g, "-")
    .replace(/\s+to\s+/g, "-")
    .replace(/,\s*/g, ",");
}

/** Currency markers used in EN + AR fee copy. */
const CURRENCY = "(?:AED|د\\.إ|درهم)";
/**
 * A "money-like" amount: either a thousands-grouped number ("1,000") or a bare
 * 3+ digit number ("500", "1200"). Deliberately excludes single/two-digit
 * values (1, 5, 1 to 3) which are day-duration ranges owned by dayRe — this
 * also prevents backtracking artifacts that would flag bare digits.
 */
const AMOUNT = "(?:\\d{1,3}(?:,\\d{3})+|\\d{3,})";

/**
 * Find numeric/fee-like tokens in text that are NOT covered by the fact sheet.
 * Returns human-readable findings.
 *
 * Conservative by design (YMYL): false positives are acceptable, false
 * negatives are not. Tokens are bounded by lookarounds so bare commas or
 * comma-fragments of a larger number are never flagged on their own, day
 * durations are only reported by dayRe, and 4-digit years (e.g. "2026") are
 * skipped.
 */
export function scanForUnverifiedNumbers(
  content: GeneratedPseoContent,
  sheet: FactSheet | undefined
): string[] {
  if (!sheet) return ["No fact sheet for this authority — all figures are unverified."];
  const allowlist = factSheetAllowlist(sheet).map(normToken);

  const findings = new Set<string>();
  // Money/fee tokens: optional currency, amount, optional range, optional
  // trailing currency. Bounded so we never split a grouped number or swallow a
  // trailing comma.
  const moneyRe = new RegExp(
    `(?<![\\d,])${CURRENCY}?\\s*${AMOUNT}(?:\\s*(?:–|—|−|-|to)\\s*${AMOUNT})?\\s*${CURRENCY}?(?![\\d,])`,
    "g"
  );
  // Duration ranges: X-Y days / working days / weeks / business days.
  const NUM = "\\d(?:[\\d,]*\\d)?";
  const dayRe = new RegExp(
    `(?<![\\d,])${NUM}(?:\\s*(?:–|—|−|-|to)\\s*${NUM})?\\s*(?:working\\s+|business\\s+)?(?:days?|weeks?|months?|years?)\\b`,
    "g"
  );

  const scan = (text: string, label: string) => {
    for (const m of text.matchAll(moneyRe)) {
      const token = m[0].trim();
      const norm = normToken(token);
      // Skip bare 4-digit years ("2026") — they are dates, not fees.
      if (!token || /^\d{4}$/.test(norm)) continue;
      if (!allowlist.includes(norm)) {
        findings.add(`${label}: "${token}" — not found in the ${sheet.name} fact sheet`);
      }
    }
    for (const m of text.matchAll(dayRe)) {
      const token = m[0].trim();
      if (token && !allowlist.includes(normToken(token))) {
        findings.add(`${label}: "${token}" — not found in the ${sheet.name} fact sheet`);
      }
    }
  };

  scan(content.directAnswer, "directAnswer");
  for (const s of content.sections) scan(sectionText(s), `section "${s.heading}"`);
  for (const f of content.faqs) scan(f.answer, `FAQ "${f.question}"`);
  return [...findings];
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
  }
}

/**
 * Decide the page review status. A page is "needs-review" when:
 * 1. its authority fact sheet is not yet human-verified ("pending"), OR
 * 2. scanForUnverifiedNumbers found numbers not covered by the sheet.
 */
export function decideReviewStatus(
  sheet: FactSheet | undefined,
  findings: string[]
): "auto" | "needs-review" {
  if (findings.length > 0) return "needs-review";
  if (sheet && sheet.lastVerified === "pending") return "needs-review";
  return "auto";
}

/** Append findings to scripts/pseo/fact-review.md (weekly review digest). */
export function appendFactReview(
  slug: string,
  authority: string,
  findings: string[]
): void {
  if (findings.length === 0) return;
  const dir = dirname(FACT_REVIEW_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const stamp = new Date().toISOString().slice(0, 10);
  const entry = [
    "",
    `## ${stamp} — ${slug} (${authority})`,
    ...findings.map((f) => `- [ ] ${f}`),
  ].join("\n");

  // Create the header on first write.
  if (!existsSync(FACT_REVIEW_PATH)) {
    appendFileSync(
      FACT_REVIEW_PATH,
      "# Fact Review — pSEO pages with unverified figures\n\nMark each item [x] once verified. This file drives your weekly 10-20 min review.\n",
      "utf8"
    );
  }
  appendFileSync(FACT_REVIEW_PATH, entry + "\n", "utf8");
}

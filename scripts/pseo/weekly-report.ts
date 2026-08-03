import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import type { PseoPage } from "../../src/types";
import { appendPseoPage, loadPseoPages } from "./pseo-store";
import { loadQueue, ROOT } from "./queue";

/**
 * Weekly fact-review report generator.
 *
 * The generation engine already runs a hard quality gate (scripts/pseo/quality.ts)
 * and a YMYL fact gate (scripts/pseo/fact-flag.ts) on every page. This script is
 * the human-facing WEEKLY digest: it aggregates every page flagged
 * `reviewStatus: "needs-review"` into a single markdown report so the user
 * spends ~15-20 minutes once per week verifying figures against official
 * authority portals, instead of reviewing 9 new pages every day.
 *
 * Outputs:
 *   - scripts/pseo/reports/weekly-YYYY-MM-DD.md  (archived, one per week)
 *   - scripts/pseo/reports/LATEST.md              (stable link for the ops guide)
 *
 * Usage:
 *   npx tsx scripts/pseo/weekly-report.ts                  # generate report
 *   npx tsx scripts/pseo/weekly-report.ts --verify <slug>  # mark a page verified after manual fact check
 */

export const REPORTS_DIR = join(ROOT, "scripts", "pseo", "reports");
export const FACT_REVIEW_PATH = join(ROOT, "scripts", "pseo", "fact-review.md");

export interface UnresolvedFinding {
  slug: string;
  authority: string;
  finding: string;
}

/* ------------------------- fact-review.md parser ------------------------- */

/**
 * Parse scripts/pseo/fact-review.md (append-only log written by
 * `appendFactReview`) and return every still-unchecked `- [ ]` item.
 */
export function parseFactReview(): UnresolvedFinding[] {
  if (!existsSync(FACT_REVIEW_PATH)) return [];
  const text = readFileSync(FACT_REVIEW_PATH, "utf8");
  const findings: UnresolvedFinding[] = [];
  let current: { slug: string; authority: string } | null = null;

  for (const line of text.split("\n")) {
    // Header format: "## YYYY-MM-DD — {slug} ({authority})"
    const header = line.match(/^## \d{4}-\d{2}-\d{2} — (.+?) \(([^)]+)\)$/);
    if (header) {
      current = { slug: header[1].trim(), authority: header[2].trim() };
      continue;
    }
    // Unchecked item format: "- [ ] {finding}"
    const item = line.match(/^- \[ \] (.+)$/);
    if (item && current) {
      findings.push({
        slug: current.slug,
        authority: current.authority,
        finding: item[1].trim(),
      });
    }
  }
  return findings;
}

/* ------------------------- report builder ------------------------- */

const KIND_ORDER = ["guide", "qa", "checklist", "cost", "timeline", "compare", "glossary"] as const;

export function buildWeeklyReport(
  pages: PseoPage[],
  unresolved: UnresolvedFinding[],
  stamp: string
): string {
  const queue = loadQueue();
  const authorityFor = (slug: string): string => {
    const item = queue.find((i) => i.slug === slug);
    return item?.authority ?? "General";
  };

  const needsReview = pages.filter((p) => p.reviewStatus === "needs-review");
  const auto = pages.filter((p) => p.reviewStatus === "auto");

  const lines: string[] = [];
  lines.push(`# pSEO Weekly Review — ${stamp}`);
  lines.push("");
  lines.push(`Generated ${new Date().toISOString()} (UTC). Cadence: **once per week**, ~15-20 minutes.`);
  lines.push("");

  /* 1. Summary */
  lines.push("## 1. Summary");
  lines.push("");
  lines.push("| Metric | Count |");
  lines.push("|---|---|");
  lines.push(`| Total pSEO pages published | ${pages.length} |`);
  lines.push(`| Verified (auto) | ${auto.length} |`);
  lines.push(`| **Needs review** (unverified figures) | **${needsReview.length}** |`);
  lines.push(`| Unresolved fact-review items | ${unresolved.length} |`);
  lines.push("");
  lines.push("| Kind | Pages |");
  lines.push("|---|---|");
  for (const kind of KIND_ORDER) {
    const n = pages.filter((p) => p.kind === kind).length;
    if (n > 0) lines.push(`| ${kind} | ${n} |`);
  }
  lines.push("");

  /* 2. Pages flagged for fact review */
  lines.push("## 2. Pages flagged for fact review");
  lines.push("");
  if (needsReview.length === 0) {
    lines.push(
      "No pages are currently flagged. Every published page passed the fact gate against a verified fact sheet. ✅"
    );
    lines.push("");
  } else {
    const byAuth = new Map<string, PseoPage[]>();
    for (const p of needsReview) {
      const auth = authorityFor(p.slug);
      if (!byAuth.has(auth)) byAuth.set(auth, []);
      byAuth.get(auth)!.push(p);
    }
    for (const [auth, authPages] of byAuth) {
      lines.push(`### ${auth}`);
      lines.push("");
      lines.push("| Page | Kind | Last verified | Live URL |");
      lines.push("|---|---|---|---|");
      for (const p of authPages) {
        lines.push(
          `| ${p.title} | ${p.kind} | ${p.lastVerified} | [/guides/${p.slug}](https://www.dubaiapprovalconsultants.com/guides/${p.slug}) |`
        );
      }
      lines.push("");
    }
    lines.push(
      "> Open each link and verify the flagged figures against the official authority portal, then follow Section 4."
    );
    lines.push("");
  }

  /* 3. Unresolved fact-review items */
  lines.push("## 3. Unresolved fact-review items (from scripts/pseo/fact-review.md)");
  lines.push("");
  if (unresolved.length === 0) {
    lines.push("None. All previously flagged figures have been checked off. ✅");
    lines.push("");
  } else {
    const bySlug = new Map<string, UnresolvedFinding[]>();
    for (const u of unresolved) {
      if (!bySlug.has(u.slug)) bySlug.set(u.slug, []);
      bySlug.get(u.slug)!.push(u);
    }
    for (const [slug, items] of bySlug) {
      lines.push(`### ${slug}`);
      lines.push("");
      for (const it of items) lines.push(`- [ ] ${it.finding}`);
      lines.push("");
    }
  }

  /* 4. How to resolve */
  lines.push("## 4. How to resolve (weekly workflow)");
  lines.push("");
  lines.push("1. Open each flagged URL and check the figure against the official authority portal.");
  lines.push(
    "2. If the figure is correct, update the authority fact sheet (`src/data/fact-sheets/{authority}.ts`) so future pages reuse it."
  );
  lines.push("3. Mark the page verified: `npx tsx scripts/pseo/weekly-report.ts --verify <slug>`");
  lines.push("4. Check off the matching `- [ ]` item in `scripts/pseo/fact-review.md`.");
  lines.push("5. Re-run this script (`npm run pseo:report`) to regenerate the report.");
  lines.push("");
  lines.push("---");
  lines.push("_Automated report from the pSEO domination engine. See plans/pseo-domination-engine-plan.md._");
  lines.push("");

  return lines.join("\n");
}

/* ------------------------- write helpers ------------------------- */

export function writeWeeklyReport(
  report: string,
  stamp: string
): { archived: string; latest: string } {
  if (!existsSync(REPORTS_DIR)) mkdirSync(REPORTS_DIR, { recursive: true });

  const archived = join(REPORTS_DIR, `weekly-${stamp}.md`);
  const latest = join(REPORTS_DIR, "LATEST.md");
  writeFileSync(archived, report, "utf8");
  writeFileSync(latest, report, "utf8");
  return { archived, latest };
}

/* ------------------------- verify action ------------------------- */

/**
 * Flip a page from `needs-review` → `auto` after the user manually confirmed
 * every flagged figure. Also records today's date as `lastVerified`.
 */
export function verifyPseoSlug(slug: string): void {
  const pages = loadPseoPages();
  const page = pages.find((p) => p.slug === slug);
  if (!page) {
    console.error(`Unknown pSEO slug: "${slug}". Run \`npx tsx scripts/pseo/weekly-report.ts\` to see all slugs.`);
    process.exit(1);
  }
  const today = new Date().toISOString().slice(0, 10);
  page.reviewStatus = "auto";
  page.lastVerified = today;
  appendPseoPage(page);
  console.log(`Verified ${slug} — reviewStatus=auto, lastVerified=${today}.`);
}

/* ------------------------- CLI ------------------------- */

function main(): void {
  const args = process.argv.slice(2);

  if (args[0] === "--verify") {
    const slug = args[1];
    if (!slug) {
      console.error("Usage: npx tsx scripts/pseo/weekly-report.ts --verify <slug>");
      process.exit(1);
    }
    verifyPseoSlug(slug);
    return;
  }

  const stamp = new Date().toISOString().slice(0, 10);
  const pages = loadPseoPages();
  const unresolved = parseFactReview();
  const report = buildWeeklyReport(pages, unresolved, stamp);
  const { archived, latest } = writeWeeklyReport(report, stamp);

  const needsReview = pages.filter((p) => p.reviewStatus === "needs-review").length;
  console.log(`Report written to ${archived}`);
  console.log(`Latest copy: ${latest}`);
  console.log(
    `Summary: ${pages.length} pages | ${needsReview} needs review | ${unresolved.length} unresolved fact items.`
  );
}

if (process.argv[1] && process.argv[1].endsWith("weekly-report.ts")) {
  main();
}

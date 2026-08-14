/**
 * Publish run for blog posts (PM workflow — blog-pre-build-plan.md §9 Phase 0.4).
 *
 * Flips every blog post in `src/data/blog-posts.ts` from `status: "ready"`
 * to `status: "live"` and stamps `publishedAt` / `lastUpdated` to the actual
 * live URL date (default: today, or pass `--date=YYYY-MM-DD`).
 *
 * Rules enforced (plan §9 / master rule):
 *   - Only `live` posts enter sitemap.xml — this script makes that happen.
 *   - `publishedAt` = the actual live URL date at deploy (never future-dated).
 *   - AR posts inherit status/dates from the merged EN post (blog-posts-ar.ts
 *     carries no status fields), so a single EN flip publishes the 19 AR URLs too.
 *
 * Usage:
 *   node scripts/publish-blog-posts.js [--date=YYYY-MM-DD]
 *
 * Idempotent: already-live posts are skipped; safe to re-run.
 */
const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "..", "src", "data", "blog-posts.ts");

const dateArg = process.argv.find((a) => a.startsWith("--date="));
const liveDate = dateArg ? dateArg.split("=")[1] : "2026-08-14";

// Guard: must be an ISO date (basic sanity).
if (!/^\d{4}-\d{2}-\d{2}$/.test(liveDate)) {
  console.error(`Invalid --date="${liveDate}" (expected YYYY-MM-DD).`);
  process.exit(1);
}

let src = fs.readFileSync(FILE, "utf8");

// Detect the file's dominant line ending so the search/replace blocks match
// verbatim regardless of whether the repo uses LF or CRLF.
const eol = (src.match(/\r\n/g) || []).length > (src.match(/(?<!\r)\n/g) || []).length ? "\r\n" : "\n";

const READY_BLOCK =
  `    publishedAt: "2026-07-28",${eol}` +
  `    lastUpdated: "2026-07-28",${eol}` +
  `    status: "ready",`;
const LIVE_BLOCK =
  `    publishedAt: "${liveDate}",${eol}` +
  `    lastUpdated: "${liveDate}",${eol}` +
  `    status: "live",`;

const readyCount = src.split(READY_BLOCK).length - 1;
const liveCount = (src.match(/status: "live"/g) || []).length;

console.log(`Ready posts found: ${readyCount}`);
console.log(`Already-live posts: ${liveCount}`);

if (readyCount === 0) {
  console.log("Nothing to publish — all posts are already live (or none ready).");
  process.exit(0);
}

// Only touch the exact ready placeholder block — never blindly replace status.
src = src.split(READY_BLOCK).join(LIVE_BLOCK);

fs.writeFileSync(FILE, src);

const afterLive = (src.match(/status: "live"/g) || []).length;
console.log(`Published ${readyCount} post(s) — stamped live date ${liveDate}.`);
console.log(`Live posts now: ${afterLive}.`);

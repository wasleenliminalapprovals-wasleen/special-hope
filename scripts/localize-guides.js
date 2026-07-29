#!/usr/bin/env node

/**
 * DeepSeek Localization Pipeline — Guides/Q&A (30+ entries)
 *
 * Reads English guide data from src/data/guides.ts, sends each entry's
 * text fields to DeepSeek API for Arabic localization, and writes the results
 * into src/data/guides-ar.ts.
 *
 * Usage:
 *   node scripts/localize-guides.js                      # Direct write
 *   node scripts/localize-guides.js --review             # Staging folder only
 *   node scripts/localize-guides.js --force              # Re-translate all (skip hash check)
 *   node scripts/localize-guides.js --dry-run            # Show what would be translated
 *   node scripts/localize-guides.js --slug=how-long-does-dm-building-permit-take
 *
 * Environment:
 *   DEEPSEEK_API_KEY  (required)
 *
 * @see plans/arabic-market-domination-reconciled-plan.md §2.2
 */

const path = require("path");
const fs = require("fs");
const {
  DATA_DIR,
  STAGING_DIR,
  SYSTEM_PROMPT,
  loadManifest,
  saveManifest,
  computeContentHash,
  parseEntries,
  extractField,
  extractStringArray,
  readArabicFile,
  rebuildArabicFileContent,
  callDeepSeek,
  processQueue,
  ensureStagingDir,
} = require("./lib/localize-utils");

/* ── Config ──────────────────────────────────────────────── */

const EN_FILE = path.join(DATA_DIR, "guides.ts");
const AR_FILE = path.join(DATA_DIR, "guides-ar.ts");
const EXPORT_NAME = "guides";
const TYPE_NAME = "GuideArabicEntry";

const TEXT_FIELDS = [
  "title", "description",
  "primaryKeyword", "secondaryKeywords",
  "question", "answer", "content",
];

/* ── Parse arguments ─────────────────────────────────────── */

const args = process.argv.slice(2);
const isReview = args.includes("--review");
const isForce = args.includes("--force");
const isDryRun = args.includes("--dry-run");
const slugFilter = args
  .find((a) => a.startsWith("--slug="))
  ?.split("=")[1];

if (isDryRun) {
  console.log("🔍 DRY RUN — no API calls will be made\n");
}

/* ── Extract English Guide Data ──────────────────────────── */

function extractGuideEntry(objStr) {
  const slug = extractField(objStr, "slug");
  if (!slug) return null;

  return {
    slug,
    title: extractField(objStr, "title") || "",
    description: extractField(objStr, "description") || "",
    primaryKeyword: extractField(objStr, "primaryKeyword") || "",
    secondaryKeywords: extractStringArray(objStr, "secondaryKeywords"),
    question: extractField(objStr, "question") || undefined,
    answer: extractField(objStr, "answer") || undefined,
    content: extractStringArray(objStr, "content"),
  };
}

/* ── Build DeepSeek Payload ──────────────────────────────── */

function buildPayload(entry) {
  const payload = {
    slug: entry.slug,
    title: entry.title,
    description: entry.description,
    primaryKeyword: entry.primaryKeyword,
    secondaryKeywords: entry.secondaryKeywords,
    content: entry.content,
  };

  // Only include question/answer for Q&A type guides
  if (entry.question) payload.question = entry.question;
  if (entry.answer) payload.answer = entry.answer;

  return JSON.stringify(payload, null, 2);
}

/* ── Map DeepSeek Response to GuideArabicContent ─────────── */

function mapResponseToArabic(response, entry) {
  return {
    slug: response.slug || `دليل-${entry.slug}`,
    title: response.title || entry.title,
    description: response.description || entry.description,
    primaryKeyword: response.primaryKeyword || entry.primaryKeyword,
    secondaryKeywords: Array.isArray(response.secondaryKeywords)
      ? response.secondaryKeywords
      : entry.secondaryKeywords,
    question: response.question || entry.question,
    answer: response.answer || entry.answer,
    content: Array.isArray(response.content)
      ? response.content
      : entry.content,
  };
}

/* ── Main ────────────────────────────────────────────────── */

async function main() {
  console.log("═══════════════════════════════════════════════");
  console.log("  DeepSeek Localization — Guides/Q&A (30+)");
  console.log("═══════════════════════════════════════════════\n");

  if (isReview) console.log("  📁 REVIEW MODE — output to staging folder\n");
  if (isForce) console.log("  ⚡ FORCE MODE — re-translating all entries\n");
  if (slugFilter) console.log(`  🎯 FILTER — only: ${slugFilter}\n`);

  // 1. Parse English entries
  const rawObjects = parseEntries(EN_FILE, EXPORT_NAME);
  console.log(`  📖 Read ${rawObjects.length} English guide entries\n`);

  const entries = rawObjects
    .map(extractGuideEntry)
    .filter(Boolean)
    .filter((e) => !slugFilter || e.slug === slugFilter);

  console.log(`  📋 Processing ${entries.length} entries\n`);

  // 2. Load manifest
  const manifest = loadManifest();
  const guidesManifest = manifest.guides || {};

  // 3. Check which entries need translation
  const toTranslate = [];
  const toSkip = [];

  for (const entry of entries) {
    const hash = computeContentHash(entry, TEXT_FIELDS);
    const existing = guidesManifest[entry.slug];

    if (isForce || !existing || existing.hash !== hash) {
      toTranslate.push(entry);
    } else {
      toSkip.push(entry.slug);
    }
  }

  if (toSkip.length > 0) {
    console.log(`  ⏭  Skipping ${toSkip.length} unchanged entries:`);
    for (const slug of toSkip) {
      console.log(`       • ${slug}`);
    }
    console.log("");
  }

  if (toTranslate.length === 0) {
    console.log("  ✅ All entries up to date. Nothing to translate.\n");
    return;
  }

  console.log(`  🌐 Translating ${toTranslate.length} entries\n`);

  if (isDryRun) {
    console.log("  📋 Entries that would be translated:");
    for (const entry of toTranslate) {
      console.log(`       • ${entry.slug} — "${entry.title}"`);
    }
    console.log("\n  ✅ Dry run complete. No API calls made.\n");
    return;
  }

  // 4. Process queue with rate limiting
  const results = await processQueue(toTranslate, async (entry, index) => {
    const payload = buildPayload(entry);
    const response = await callDeepSeek(SYSTEM_PROMPT, payload);
    const arabic = mapResponseToArabic(response, entry);

    // Update manifest
    guidesManifest[entry.slug] = {
      hash: computeContentHash(entry, TEXT_FIELDS),
      lastTranslated: new Date().toISOString(),
      status: "translated",
    };

    return { slug: entry.slug, ar: arabic };
  });

  // 5. Filter successful translations
  const successResults = results.filter((r) => r && r.ar && !r.error);

  if (successResults.length === 0) {
    console.log("\n  ❌ No successful translations.\n");
    process.exit(1);
  }

  // 6. Read existing Arabic file and merge
  const existingArabic = readArabicFile(AR_FILE);

  // 7. Write output
  const content = rebuildArabicFileContent(
    existingArabic,
    successResults,
    EXPORT_NAME,
    TYPE_NAME,
    `Arabic guide data — Auto-localized by DeepSeek (${new Date().toISOString().split("T")[0]})`
  );

  if (isReview) {
    const stagingDir = ensureStagingDir();
    const stagingPath = path.join(stagingDir, "guides-ar.json");
    fs.writeFileSync(stagingPath, JSON.stringify(successResults, null, 2), "utf-8");
    console.log(`  📁 Review output written to: ${stagingPath}`);
  } else {
    fs.writeFileSync(AR_FILE, content, "utf-8");
    console.log(`  💾 Wrote ${successResults.length} translations to: ${AR_FILE}`);
  }

  // 8. Save manifest
  manifest.guides = guidesManifest;
  saveManifest(manifest);
  console.log("  📋 Manifest updated.\n");

  // 9. Report
  const failed = toTranslate.length - successResults.length;
  console.log("─────────────────────────────────────────────");
  console.log(`  ✅ ${successResults.length} translated`);
  if (failed > 0) console.log(`  ❌ ${failed} failed`);
  console.log(`  ⏭  ${toSkip.length} skipped (unchanged)`);
  console.log("─────────────────────────────────────────────\n");

  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error("\n  ❌ Fatal error:", err.message);
  process.exit(1);
});

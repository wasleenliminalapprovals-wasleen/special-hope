#!/usr/bin/env node

/**
 * DeepSeek Localization Pipeline — Services (5 entries)
 *
 * Reads English service data from src/data/services.ts, sends each entry's
 * text fields to DeepSeek API for Arabic localization, and writes the results
 * into src/data/services-ar.ts.
 *
 * Usage:
 *   node scripts/localize-services.js                      # Direct write
 *   node scripts/localize-services.js --review             # Staging folder only
 *   node scripts/localize-services.js --force              # Re-translate all (skip hash check)
 *   node scripts/localize-services.js --dry-run            # Show what would be translated
 *   node scripts/localize-services.js --slug=2d-drawings   # Single service only
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
  extractObjectArray,
  readArabicFile,
  rebuildArabicFileContent,
  callDeepSeek,
  processQueue,
  ensureStagingDir,
} = require("./lib/localize-utils");

/* ── Config ──────────────────────────────────────────────── */

const EN_FILE = path.join(DATA_DIR, "services.ts");
const AR_FILE = path.join(DATA_DIR, "services-ar.ts");
const EXPORT_NAME = "services";
const TYPE_NAME = "ServiceArabicEntry";

const TEXT_FIELDS = [
  "name", "tagline",
  "primaryKeyword", "secondaryKeywords",
  "directAnswer", "description",
  "features", "process", "faqs",
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

/* ── Extract English Service Data ────────────────────────── */

function extractServiceEntry(objStr) {
  const slug = extractField(objStr, "slug");
  if (!slug) return null;

  return {
    slug,
    name: extractField(objStr, "name") || "",
    tagline: extractField(objStr, "tagline") || "",
    primaryKeyword: extractField(objStr, "primaryKeyword") || "",
    secondaryKeywords: extractStringArray(objStr, "secondaryKeywords"),
    directAnswer: extractField(objStr, "directAnswer") || "",
    description: extractField(objStr, "description") || "",
    features: extractStringArray(objStr, "features"),
    process: extractObjectArray(objStr, "process").map((s) => ({
      step: parseInt(extractField(s, "step") || "0", 10),
      title: extractField(s, "title") || "",
      description: extractField(s, "description") || "",
    })),
    faqs: extractObjectArray(objStr, "faqs").map((f) => ({
      question: extractField(f, "question") || "",
      answer: extractField(f, "answer") || "",
    })),
  };
}

/* ── Build DeepSeek Payload ──────────────────────────────── */

function buildPayload(entry) {
  const payload = {
    slug: entry.slug,
    name: entry.name,
    tagline: entry.tagline,
    primaryKeyword: entry.primaryKeyword,
    secondaryKeywords: entry.secondaryKeywords,
    directAnswer: entry.directAnswer,
    description: entry.description,
    features: entry.features,
    faqs: entry.faqs,
  };

  if (entry.process && entry.process.length > 0) {
    payload.process = entry.process.map((s) => ({
      step: s.step,
      title: s.title,
      description: s.description,
    }));
  }

  return JSON.stringify(payload, null, 2);
}

/* ── Map DeepSeek Response to ServiceArabicContent ───────── */

function mapResponseToArabic(response, entry) {
  return {
    slug: response.slug || `خدمة-${entry.slug}`,
    name: response.name || entry.name,
    tagline: response.tagline || entry.tagline,
    primaryKeyword: response.primaryKeyword || entry.primaryKeyword,
    secondaryKeywords: Array.isArray(response.secondaryKeywords)
      ? response.secondaryKeywords
      : entry.secondaryKeywords,
    directAnswer: response.directAnswer || entry.directAnswer,
    description: response.description || entry.description,
    features: Array.isArray(response.features)
      ? response.features
      : entry.features,
    process: Array.isArray(response.process)
      ? response.process.map((s, i) => ({
          step: s.step || i + 1,
          title: s.title || "",
          description: s.description || "",
        }))
      : entry.process,
    faqs: Array.isArray(response.faqs)
      ? response.faqs.map((f) => ({
          question: f.question || "",
          answer: f.answer || "",
        }))
      : entry.faqs,
  };
}

/* ── Main ────────────────────────────────────────────────── */

async function main() {
  console.log("═══════════════════════════════════════════════");
  console.log("  DeepSeek Localization — Services (5)");
  console.log("═══════════════════════════════════════════════\n");

  if (isReview) console.log("  📁 REVIEW MODE — output to staging folder\n");
  if (isForce) console.log("  ⚡ FORCE MODE — re-translating all entries\n");
  if (slugFilter) console.log(`  🎯 FILTER — only: ${slugFilter}\n`);

  // 1. Parse English entries
  const rawObjects = parseEntries(EN_FILE, EXPORT_NAME);
  console.log(`  📖 Read ${rawObjects.length} English service entries\n`);

  const entries = rawObjects
    .map(extractServiceEntry)
    .filter(Boolean)
    .filter((e) => !slugFilter || e.slug === slugFilter);

  console.log(`  📋 Processing ${entries.length} entries\n`);

  // 2. Load manifest
  const manifest = loadManifest();
  const servicesManifest = manifest.services || {};

  // 3. Check which entries need translation
  const toTranslate = [];
  const toSkip = [];

  for (const entry of entries) {
    const hash = computeContentHash(entry, TEXT_FIELDS);
    const existing = servicesManifest[entry.slug];

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
      console.log(`       • ${entry.slug} — "${entry.name}"`);
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
    servicesManifest[entry.slug] = {
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
    `Arabic service data — Auto-localized by DeepSeek (${new Date().toISOString().split("T")[0]})`
  );

  if (isReview) {
    const stagingDir = ensureStagingDir();
    const stagingPath = path.join(stagingDir, "services-ar.json");
    fs.writeFileSync(stagingPath, JSON.stringify(successResults, null, 2), "utf-8");
    console.log(`  📁 Review output written to: ${stagingPath}`);
  } else {
    fs.writeFileSync(AR_FILE, content, "utf-8");
    console.log(`  💾 Wrote ${successResults.length} translations to: ${AR_FILE}`);
  }

  // 8. Save manifest
  manifest.services = servicesManifest;
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

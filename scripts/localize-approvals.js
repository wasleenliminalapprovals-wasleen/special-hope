#!/usr/bin/env node

/**
 * DeepSeek Localization Pipeline — Approvals (52 entries)
 *
 * Reads English approval data from src/data/approvals.ts, sends each entry's
 * text fields to DeepSeek API for Arabic localization, and writes the results
 * into src/data/approvals-ar.ts.
 *
 * Usage:
 *   node scripts/localize-approvals.js                      # Direct write
 *   node scripts/localize-approvals.js --review             # Staging folder only
 *   node scripts/localize-approvals.js --force              # Re-translate all (skip hash check)
 *   node scripts/localize-approvals.js --dry-run            # Show what would be translated
 *   node scripts/localize-approvals.js --slug=dewa-approval # Single approval only
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
  extractObjectField,
  readArabicFile,
  rebuildArabicFileContent,
  callDeepSeek,
  processQueue,
  ensureStagingDir,
} = require("./lib/localize-utils");

/* ── Config ──────────────────────────────────────────────── */

const EN_FILE = path.join(DATA_DIR, "approvals.ts");
const AR_FILE = path.join(DATA_DIR, "approvals-ar.ts");
const EXPORT_NAME = "approvals";
const TYPE_NAME = "ApprovalArabicEntry";

const TEXT_FIELDS = [
  "name", "shortName", "authorityFull", "authorityAbbr",
  "primaryKeyword", "secondaryKeywords",
  "directAnswer", "description", "whoNeedsIt",
  "documents", "process", "timelineTable", "rejectionReasons",
  "caseStudy", "whyChooseUs", "faqs",
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

/* ── Extract English Approval Data ───────────────────────── */

function extractApprovalEntry(objStr) {
  const slug = extractField(objStr, "slug");
  if (!slug) return null;

  return {
    slug,
    name: extractField(objStr, "name") || "",
    shortName: extractField(objStr, "shortName") || "",
    authorityFull: extractField(objStr, "authorityFull") || "",
    authorityAbbr: extractField(objStr, "authorityAbbr") || "",
    primaryKeyword: extractField(objStr, "primaryKeyword") || "",
    secondaryKeywords: extractStringArray(objStr, "secondaryKeywords"),
    directAnswer: extractField(objStr, "directAnswer") || "",
    description: extractField(objStr, "description") || "",
    whoNeedsIt: extractStringArray(objStr, "whoNeedsIt"),
    documents: extractObjectArray(objStr, "documents").map((d) => ({
      document: extractField(d, "document") || "",
      mandatory: d.includes("mandatory: true"),
    })),
    process: extractObjectArray(objStr, "process").map((s) => ({
      step: parseInt(extractField(s, "step") || "0", 10),
      title: extractField(s, "title") || "",
      description: extractField(s, "description") || "",
    })),
    timelineTable: extractObjectArray(objStr, "timelineTable").map((t) => ({
      stage: extractField(t, "stage") || "",
      duration: extractField(t, "duration") || "",
      cost: extractField(t, "cost") || "",
      notes: extractField(t, "notes") || "",
    })),
    rejectionReasons: extractObjectArray(objStr, "rejectionReasons").map((r) => ({
      reason: extractField(r, "reason") || "",
      solution: extractField(r, "solution") || "",
    })),
    caseStudy: extractObjectField(objStr, "caseStudy"),
    whyChooseUs: extractStringArray(objStr, "whyChooseUs"),
    faqs: extractObjectArray(objStr, "faqs").map((f) => ({
      question: extractField(f, "question") || "",
      answer: extractField(f, "answer") || "",
    })),
  };
}

/* ── Build DeepSeek Payload ──────────────────────────────── */

function buildPayload(entry) {
  return JSON.stringify(
    {
      slug: entry.slug,
      name: entry.name,
      shortName: entry.shortName,
      authorityFull: entry.authorityFull,
      authorityAbbr: entry.authorityAbbr,
      primaryKeyword: entry.primaryKeyword,
      secondaryKeywords: entry.secondaryKeywords,
      directAnswer: entry.directAnswer,
      description: entry.description,
      whoNeedsIt: entry.whoNeedsIt,
      documents: entry.documents,
      process: entry.process.map((s) => ({ step: s.step, title: s.title, description: s.description })),
      timelineTable: entry.timelineTable.map((t) => ({
        stage: t.stage,
        duration: t.duration,
        cost: t.cost,
        notes: t.notes,
      })),
      rejectionReasons: entry.rejectionReasons,
      caseStudy: entry.caseStudy,
      whyChooseUs: entry.whyChooseUs,
      faqs: entry.faqs,
    },
    null,
    2
  );
}

/* ── Map DeepSeek Response to ApprovalArabicContent ──────── */

function mapResponseToArabic(response, entry) {
  return {
    slug: response.slug || `موافقة-${entry.slug}`,
    name: response.name || entry.name,
    shortName: response.shortName || entry.shortName,
    authorityFull: response.authorityFull || entry.authorityFull,
    authorityAbbr: response.authorityAbbr || entry.authorityAbbr,
    primaryKeyword: response.primaryKeyword || entry.primaryKeyword,
    secondaryKeywords: Array.isArray(response.secondaryKeywords)
      ? response.secondaryKeywords
      : entry.secondaryKeywords,
    directAnswer: response.directAnswer || entry.directAnswer,
    description: response.description || entry.description,
    whoNeedsIt: Array.isArray(response.whoNeedsIt)
      ? response.whoNeedsIt
      : entry.whoNeedsIt,
    documents: Array.isArray(response.documents)
      ? response.documents.map((d) => ({
          document: d.document || "",
          mandatory: d.mandatory !== undefined ? d.mandatory : true,
        }))
      : entry.documents,
    process: Array.isArray(response.process)
      ? response.process.map((s, i) => ({
          step: s.step || i + 1,
          title: s.title || "",
          description: s.description || "",
        }))
      : entry.process,
    timelineTable: Array.isArray(response.timelineTable)
      ? response.timelineTable.map((t) => ({
          stage: t.stage || "",
          duration: t.duration || "",
          cost: t.cost || "",
          notes: t.notes || "",
        }))
      : entry.timelineTable,
    rejectionReasons: Array.isArray(response.rejectionReasons)
      ? response.rejectionReasons.map((r) => ({
          reason: r.reason || "",
          solution: r.solution || "",
        }))
      : entry.rejectionReasons,
    caseStudy: response.caseStudy || entry.caseStudy || null,
    whyChooseUs: Array.isArray(response.whyChooseUs)
      ? response.whyChooseUs
      : entry.whyChooseUs,
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
  console.log("  DeepSeek Localization — Approvals (52)");
  console.log("═══════════════════════════════════════════════\n");

  if (isReview) console.log("  📁 REVIEW MODE — output to staging folder\n");
  if (isForce) console.log("  ⚡ FORCE MODE — re-translating all entries\n");
  if (slugFilter) console.log(`  🎯 FILTER — only: ${slugFilter}\n`);

  // 1. Parse English entries
  const rawObjects = parseEntries(EN_FILE, EXPORT_NAME);
  console.log(`  📖 Read ${rawObjects.length} English approval entries\n`);

  const entries = rawObjects
    .map(extractApprovalEntry)
    .filter(Boolean)
    .filter((e) => !slugFilter || e.slug === slugFilter);

  console.log(`  📋 Processing ${entries.length} entries\n`);

  // 2. Load manifest
  const manifest = loadManifest();
  const approvalsManifest = manifest.approvals || {};

  // 3. Check which entries need translation
  const toTranslate = [];
  const toSkip = [];

  for (const entry of entries) {
    const hash = computeContentHash(entry, TEXT_FIELDS);
    const existing = approvalsManifest[entry.slug];

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
    approvalsManifest[entry.slug] = {
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

  // Merge existing entries with new translations
  const existingMap = new Map(existingArabic.map((e) => [e.slug, e.raw]));
  const merged = [];
  const seenSlugs = new Set();

  for (const existing of existingArabic) {
    const update = successResults.find((r) => r.slug === existing.slug);
    if (update) {
      merged.push(update);
    } else {
      // Keep existing entry as-is (with its raw stub content)
      merged.push({ slug: existing.slug, ar: null, keepRaw: existing.raw });
    }
    seenSlugs.add(existing.slug);
  }

  // Add any new entries not in existing Arabic file
  for (const result of successResults) {
    if (!seenSlugs.has(result.slug)) {
      merged.push(result);
      seenSlugs.add(result.slug);
    }
  }

  // 7. Write output
  const content = rebuildArabicFileContent(
    existingArabic,
    successResults,
    EXPORT_NAME,
    TYPE_NAME,
    `Arabic approval data — Auto-localized by DeepSeek (${new Date().toISOString().split("T")[0]})`
  );

  if (isReview) {
    const stagingDir = ensureStagingDir();
    const stagingPath = path.join(stagingDir, "approvals-ar.json");
    fs.writeFileSync(stagingPath, JSON.stringify(successResults, null, 2), "utf-8");
    console.log(`  📁 Review output written to: ${stagingPath}`);
  } else {
    fs.writeFileSync(AR_FILE, content, "utf-8");
    console.log(`  💾 Wrote ${successResults.length} translations to: ${AR_FILE}`);
  }

  // 8. Save manifest
  manifest.approvals = approvalsManifest;
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

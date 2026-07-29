#!/usr/bin/env node

/**
 * Localization Review Helper — Phase 2.3 Human Review Quality Gates
 *
 * Reads the DeepSeek staging output and generates:
 *   --sample       Random spot-check sample (20% approvals, 30% guides)
 *   --all-pricing  All entries containing pricing/timeline (mandatory review)
 *   --report       Full coverage report with checklist
 *   --checklist    Printable per-entry review checklist
 *
 * Usage:
 *   node scripts/review-localization.js --sample
 *   node scripts/review-localization.js --all-pricing
 *   node scripts/review-localization.js --report
 *   node scripts/review-localization.js --checklist --slug=dubai-municipality-building-permit
 *
 * @see plans/arabic-market-domination-reconciled-plan.md §2.3
 */

const path = require("path");
const fs = require("fs");

const STAGING_DIR = path.resolve(__dirname, "staging");

/* ── Quality Gate Config ─────────────────────────────────── */

const REVIEW_RATES = {
  approvals: 0.2,   // 20% spot-check for general descriptions
  guides: 0.3,       // 30% spot-check for guides
  services: 0.2,     // 20% spot-check for services
};

const PRICING_SLUGS = new Set([
  // Approval pages with pricing/timeline — mandatory review
  "dubai-municipality-building-permit",
  "dubai-municipality-completion-certificate",
  "dubai-municipality-preliminary-building-permit",
  "dewa-approval",
  "dewa-connection-noc",
  "dewa-meter-installation",
  "dewa-load-enhancement",
  "dewa-temporary-power-connection",
  "rta-approval",
  "ejari-registration",
  "title-deed-registration",
  "rera-permit",
  "dubai-land-department-registration",
  "food-control-department-approval",
  "dha-healthcare-approval",
  "entertainment-license-approval",
  "change-of-usage-permit",
  "structural-modification-permit",
  "refurbishment-permit",
  "al-safat-green-building-approval",
]);

/* ── Loaders ─────────────────────────────────────────────── */

function loadStaging(name) {
  const p = path.join(STAGING_DIR, `${name}-ar.json`);
  try {
    return JSON.parse(fs.readFileSync(p, "utf-8"));
  } catch {
    return [];
  }
}

/* ── Random Sample (deterministic by slug hash) ──────────── */

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function sample(items, rate) {
  return items.filter((item) => {
    const slug = item.slug || item.ar?.slug || "";
    return (simpleHash(slug) % 100) < rate * 100;
  });
}

/* ── Output: Spot-Check Sample ───────────────────────────── */

function outputSample() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("  LOCALIZATION REVIEW — Spot-Check Sample");
  console.log("═══════════════════════════════════════════════════════\n");

  for (const [name, rate] of Object.entries(REVIEW_RATES)) {
    const entries = loadStaging(name);
    const selected = sample(entries, rate);
    console.log(`\n📂 ${name} (${entries.length} total — ${selected.length} to review at ${Math.round(rate * 100)}% rate)`);
    console.log("─".repeat(60));
    for (const entry of selected) {
      const slug = entry.slug || entry.ar?.slug || "?";
      const nameAr = entry.ar?.name || entry.ar?.title || "(no name)";
      const isPricing = PRICING_SLUGS.has(slug);
      console.log(`  ${isPricing ? "🔴 MANDATORY" : "  ☐"} ${slug}`);
      console.log(`     AR: ${nameAr}`);
      if (isPricing) console.log(`     ⚠  Contains pricing/timeline — full field review required`);
      console.log();
    }
  }
}

/* ── Output: All Pricing Pages (Mandatory Review) ────────── */

function outputAllPricing() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("  LOCALIZATION REVIEW — PRICING/TIMELINE PAGES");
  console.log("  🔴 MANDATORY — Every field must be reviewed");
  console.log("═══════════════════════════════════════════════════════\n");

  const approvals = loadStaging("approvals");
  const services = loadStaging("services");

  for (const entry of approvals) {
    const slug = entry.slug || entry.ar?.slug || "";
    if (!PRICING_SLUGS.has(slug)) continue;
    const nameAr = entry.ar?.name || "(no name)";
    console.log(`\n📄 ${slug}`);
    console.log(`   AR name: ${nameAr}`);
    console.log(`   Fields requiring review:`);

    if (entry.ar?.timelineTable) {
      console.log(`   ── timelineTable (${entry.ar.timelineTable.length} entries) ──`);
      for (const row of entry.ar.timelineTable) {
        console.log(`      ${row.stage}: ${row.duration} | ${row.cost}`);
      }
    }

    if (entry.ar?.directAnswer) {
      console.log(`   ── directAnswer (check pricing numbers) ──`);
      console.log(`      "${entry.ar.directAnswer.slice(0, 150)}..."`);
    }

    console.log();
  }

  for (const entry of services) {
    const slug = entry.slug || entry.ar?.slug || "";
    const nameAr = entry.ar?.name || "(no name)";
    console.log(`\n📄 ${slug}`);
    console.log(`   AR name: ${nameAr}`);
    console.log(`   Fields requiring review:`);
    if (entry.ar?.features) {
      console.log(`   ── features (check for pricing claims) ──`);
      for (const f of entry.ar.features) {
        console.log(`      • ${f}`);
      }
    }
    console.log();
  }
}

/* ── Output: Full Coverage Report ────────────────────────── */

function outputReport() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("  LOCALIZATION REVIEW — COVERAGE REPORT");
  console.log("═══════════════════════════════════════════════════════\n");

  let totalReviewed = 0;
  let totalMandatory = 0;

  for (const [name, rate] of Object.entries(REVIEW_RATES)) {
    const entries = loadStaging(name);
    const selected = sample(entries, rate);
    const mandatory = name === "approvals"
      ? entries.filter((e) => PRICING_SLUGS.has(e.slug || "")).length
      : 0;

    totalReviewed += selected.length;
    totalMandatory += mandatory;

    console.log(`\n📂 ${name.toUpperCase()}`);
    console.log(`   Total entries:           ${entries.length}`);
    console.log(`   Spot-check (${Math.round(rate * 100)}%):        ${selected.length}`);
    console.log(`   Mandatory review:        ${mandatory}`);
    console.log(`   Pass rate needed:        100% on mandatory, 0 critical errors on spot-check`);
    console.log();

    // Print review checklist for each selected entry
    for (const entry of selected) {
      const slug = entry.slug || entry.ar?.slug || "?";
      const isPricing = PRICING_SLUGS.has(slug);
      console.log(`   ${isPricing ? "🔴" : "☐"} [ ] ${slug}`);
    }
  }

  console.log("\n" + "─".repeat(60));
  console.log(`   Total to review: ${totalReviewed + totalMandatory} entries`);
  console.log(`   (${totalMandatory} mandatory + ${totalReviewed} spot-check)`);
  console.log("═══════════════════════════════════════════════════════\n");
}

/* ── Output: Per-Entry Checklist ─────────────────────────── */

function outputChecklist(targetSlug) {
  const allData = [
    ...loadStaging("approvals").map((e) => ({ ...e, _type: "approval" })),
    ...loadStaging("guides").map((e) => ({ ...e, _type: "guide" })),
    ...loadStaging("services").map((e) => ({ ...e, _type: "service" })),
  ];

  const entries = targetSlug
    ? allData.filter((e) => (e.slug || e.ar?.slug) === targetSlug)
    : allData;

  for (const entry of entries) {
    const slug = entry.slug || entry.ar?.slug || "?";
    const ar = entry.ar || {};
    const type = entry._type;

    console.log("═".repeat(72));
    console.log(`  REVIEW CHECKLIST — ${type.toUpperCase()}`);
    console.log(`  Slug: ${slug}`);
    console.log(`  AR Name: ${ar.name || ar.title || "(not set)"}`);
    console.log("═".repeat(72));

    const checks = [];

    // Universal checks
    checks.push({ field: "slug", ok: !!ar.slug, label: "slug is present" });
    checks.push({ field: "name/title", ok: !!(ar.name || ar.title), label: "Name/title is translated" });

    // Check for placeholder/stub content
    const stubPatterns = ["TODO", "FIXME", "{{", "english text", "stub", "lorem"];
    for (const pattern of stubPatterns) {
      const allText = JSON.stringify(ar).toLowerCase();
      if (allText.includes(pattern)) {
        checks.push({ field: "content", ok: false, label: `Contains placeholder/stub: "${pattern}"` });
      }
    }

    // Type-specific checks
    if (type === "approval") {
      checks.push({ field: "directAnswer", ok: !!ar.directAnswer, label: "Direct answer block is translated" });
      checks.push({ field: "description", ok: !!ar.description, label: "Description is translated" });
      checks.push({ field: "whoNeedsIt", ok: Array.isArray(ar.whoNeedsIt) && ar.whoNeedsIt.length > 0, label: "whoNeedsIt list is populated" });
      checks.push({ field: "documents", ok: Array.isArray(ar.documents) && ar.documents.length > 0, label: "Documents table is populated" });
      checks.push({ field: "process", ok: Array.isArray(ar.process) && ar.process.length > 0, label: "Process steps are translated" });
      checks.push({ field: "timelineTable", ok: Array.isArray(ar.timelineTable) && ar.timelineTable.length > 0, label: "Timeline/cost table is populated" });
      checks.push({ field: "rejectionReasons", ok: Array.isArray(ar.rejectionReasons) && ar.rejectionReasons.length > 0, label: "Rejection reasons are translated" });
      checks.push({ field: "faqs", ok: Array.isArray(ar.faqs) && ar.faqs.length >= 5, label: `FAQ block has ${ar.faqs?.length || 0} questions (min 5)` });
      checks.push({ field: "whyChooseUs", ok: Array.isArray(ar.whyChooseUs) && ar.whyChooseUs.length > 0, label: "Why Choose Us is populated" });

      // Verify FAQ text isn't identical to English
      if (ar.faqs && entry.faqs) {
        for (let i = 0; i < Math.min(ar.faqs.length, 3); i++) {
          const eq = ar.faqs[i]?.question === entry.faqs[i]?.question;
          if (eq) {
            checks.push({ field: `faqs[${i}]`, ok: false, label: `FAQ question #${i + 1} is identical to English (not translated)` });
          }
        }
      }
    }

    if (type === "guide") {
      checks.push({ field: "question", ok: !!ar.question, label: "Question is translated" });
      checks.push({ field: "answer", ok: !!ar.answer, label: "Answer is translated" });
      checks.push({ field: "content", ok: Array.isArray(ar.content) && ar.content.length > 0, label: "Content array is populated" });
    }

    if (type === "service") {
      checks.push({ field: "directAnswer", ok: !!ar.directAnswer, label: "Direct answer is translated" });
      checks.push({ field: "description", ok: !!ar.description, label: "Description is translated" });
      checks.push({ field: "features", ok: Array.isArray(ar.features) && ar.features.length > 0, label: "Features list is populated" });
      checks.push({ field: "faqs", ok: Array.isArray(ar.faqs) && ar.faqs.length >= 3, label: `FAQ block has ${ar.faqs?.length || 0} questions` });
    }

    // Print checklist
    const criticalErrors = checks.filter((c) => !c.ok && c.field !== "content");
    const allOk = checks.every((c) => c.ok);

    console.log();
    for (const check of checks) {
      console.log(`  ${check.ok ? "✅" : "❌"} [${check.ok ? "x" : " "}] ${check.label}`);
    }

    console.log();
    if (allOk) {
      console.log("  ✅ ALL CHECKS PASSED — Entry is ready for production.");
    } else {
      console.log(`  ⚠  ${criticalErrors.length} critical issues found — review required before production.`);
    }

    // Pricing/timeline warning
    if (PRICING_SLUGS.has(slug)) {
      console.log("  🔴 MANDATORY FULL REVIEW — This entry contains pricing/timeline data.");
      console.log("     Verify: numbers, currency (AED), durations, and cost ranges are correct.");
    }

    console.log();
  }
}

/* ── Main ────────────────────────────────────────────────── */

const args = process.argv.slice(2);

if (args.includes("--sample")) {
  outputSample();
} else if (args.includes("--all-pricing")) {
  outputAllPricing();
} else if (args.includes("--report")) {
  outputReport();
} else if (args.includes("--checklist")) {
  const slugIdx = args.indexOf("--slug");
  const targetSlug = slugIdx >= 0 ? args[slugIdx + 1] : null;
  outputChecklist(targetSlug);
} else {
  console.log(`
Usage:
  node scripts/review-localization.js --sample
    Random spot-check sample (20% approvals, 30% guides)

  node scripts/review-localization.js --all-pricing
    All entries with pricing/timeline (mandatory review)

  node scripts/review-localization.js --report
    Full coverage report with counts

  node scripts/review-localization.js --checklist
    Per-entry review checklist for ALL entries

  node scripts/review-localization.js --checklist --slug=X
    Review checklist for a specific entry only
`);
}

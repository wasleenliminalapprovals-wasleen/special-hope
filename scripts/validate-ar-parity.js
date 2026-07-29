/**
 * Arabic ↔ English Data Parity Validation Script
 *
 * Confirms every entry in approvals.ts has a matching entry in approvals-ar.ts
 * (by stable `id` field), and same for guides and services.
 *
 * Usage:
 *   node scripts/validate-ar-parity.js
 *
 * Returns exit code 0 on success, 1 on failure.
 *
 * @see plans/arabic-market-domination-reconciled-plan.md §0.1
 */

const fs = require("fs");
const path = require("path");

const SRC_DIR = path.resolve(__dirname, "..", "src", "data");

/* ── Helpers ─────────────────────────────────────────────── */

function parseExports(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");

  // Extract names of all exported identifiers (const/let exports)
  // Matches: `export const approvals: ApprovalData[] = [...]`
  const exportRegex = /export\s+(?:const|let|var)\s+(\w+)\s*:/g;
  const names = [];
  let match;
  while ((match = exportRegex.exec(raw)) !== null) {
    names.push(match[1]);
  }
  return names;
}

/**
 * Extract the `id` values from an export that contains an array of objects.
 * We assume each object has an `id` field (or we derive it from `slug` as fallback).
 * Searches for patterns like: `{ id: "dubai-municipality", ... }` or `{ slug: "dubai-municipality-approval", ... }`
 */
function extractIds(raw, exportName) {
  // Find the export declaration for this name
  const pattern = new RegExp(
    `export\\s+(?:const|let|var)\\s+${exportName}\\s*:\\s*(?:[^;]+?)\\s*=\\s*\\[`,
    "s"
  );
  const declMatch = raw.match(pattern);
  if (!declMatch) return [];

  // Find the start of the array
  const startIdx = declMatch.index + declMatch[0].length;
  if (startIdx < 0) return [];

  // Extract the full array content by bracket matching
  const rest = raw.slice(startIdx);
  let depth = 0;
  let endIdx = 0;
  for (let i = 0; i < rest.length; i++) {
    if (rest[i] === "[") depth++;
    else if (rest[i] === "]") {
      depth--;
      if (depth === 0) {
        endIdx = i;
        break;
      }
    }
  }

  const arrayContent = rest.slice(0, endIdx);

  // Split into individual entries by tracking bracket depth at the top level
  // Each entry starts when depth goes from 0 to 1 (encountering `{`)
  // and ends when depth returns to 0 (encountering `}`)
  const ids = [];
  let entryDepth = 0;
  let entryStart = -1;
  let inEntry = false;

  for (let i = 0; i < arrayContent.length; i++) {
    const ch = arrayContent[i];

    if (ch === "{") {
      if (entryDepth === 0) {
        // Start of a new entry at the top level
        entryStart = i;
      }
      entryDepth++;
    } else if (ch === "}") {
      entryDepth--;
      if (entryDepth === 0 && entryStart >= 0) {
        // End of an entry - extract the first slug/id from this entry
        const entryText = arrayContent.slice(entryStart, i + 1);
        const slugMatch = entryText.match(/(?:id|slug)\s*:\s*["']([^"']+)["']/);
        if (slugMatch) {
          ids.push(slugMatch[1]);
        }
        entryStart = -1;
      }
    }
  }

  return ids;
}

/* ── Main validation logic ───────────────────────────────── */

function validate() {
  let hasErrors = false;
  const errors = [];

  const datasets = [
    { en: "approvals.ts", ar: "approvals-ar.ts", label: "Approvals" },
    { en: "guides.ts", ar: "guides-ar.ts", label: "Guides" },
    { en: "services.ts", ar: "services-ar.ts", label: "Services" },
  ];

  for (const ds of datasets) {
    const enPath = path.join(SRC_DIR, ds.en);
    const arPath = path.join(SRC_DIR, ds.ar);

    // Check English file exists
    if (!fs.existsSync(enPath)) {
      console.log(`  ⚠  SKIP — English file not found: ${ds.en}`);
      continue;
    }

    const enRaw = fs.readFileSync(enPath, "utf-8");
    const enNames = parseExports(enPath);

    if (enNames.length === 0) {
      console.log(`  ⚠  SKIP — No exports found in ${ds.en}`);
      continue;
    }

    // For each export in English file, find corresponding Arabic export
    for (const enExportName of enNames) {
      const enIds = extractIds(enRaw, enExportName);

      // Check if Arabic file exists
      if (!fs.existsSync(arPath)) {
        errors.push(`MISSING Arabic file: ${ds.ar}`);
        hasErrors = true;
        continue;
      }

      const arRaw = fs.readFileSync(arPath, "utf-8");
      const arIds = extractIds(arRaw, enExportName);

      // Check each English ID has an Arabic counterpart
      for (const enId of enIds) {
        if (!arIds.includes(enId)) {
          errors.push(
            `${ds.label}: "${enId}" (from ${ds.en} export "${enExportName}") has NO Arabic counterpart in ${ds.ar}`
          );
          hasErrors = true;
        }
      }

      // Check Arabic slugs are non-empty and unique (if arIds found)
      if (arIds.length > 0) {
        const emptySlugs = arIds.filter((s) => !s || s.trim() === "");
        if (emptySlugs.length > 0) {
          errors.push(
            `${ds.label}: ${ds.ar} contains ${emptySlugs.length} empty slug(s)`
          );
          hasErrors = true;
        }

        const seen = new Set();
        const duplicates = arIds.filter((s) => {
          if (seen.has(s)) return true;
          seen.add(s);
          return false;
        });
        if (duplicates.length > 0) {
          errors.push(
            `${ds.label}: ${ds.ar} has duplicate slugs: ${duplicates.join(", ")}`
          );
          hasErrors = true;
        }
      }
    }
  }

  /* ── Report ─────────────────────────────────────────────── */

  console.log("\n========================================");
  console.log("  ARABIC ↔ ENGLISH PARITY VALIDATION");
  console.log("========================================\n");

  if (errors.length === 0) {
    console.log("  ✅ ALL CHECKS PASSED — Parity is complete.\n");
    process.exit(0);
  } else {
    console.log(`  ❌ ${errors.length} ERROR(S) FOUND:\n`);
    for (const err of errors) {
      console.log(`     • ${err}`);
    }
    console.log("\n");
    process.exit(1);
  }
}

validate();

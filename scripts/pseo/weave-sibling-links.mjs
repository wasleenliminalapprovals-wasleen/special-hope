// Weave the Law 3/2026 sibling "Related Topics" matrix into the EN pSEO store.
//
// The pSEO pipeline (`composePage`) only places APPROVAL slugs into each page's
// `relatedSlugs`. The content-cluster plan (Section 8.2) defines 3-4 sibling
// GUIDE slugs per guide. Both the EN renderer (`resolvePseoRelated`) and the AR
// renderer (`resolvePseoRelatedAr`) read `relatedSlugs` from the EN PseoPage, so
// appending sibling guide slugs here flows through to the EN and AR related cards.
//
// The pillar (`dubai-building-quality-safety-certificate`) is intentionally NOT
// in the matrix rows — it is separate and automatic via `parentApprovalSlug`.
//
// Usage: node scripts/pseo/weave-sibling-links.mjs
import { readFileSync, writeFileSync } from "node:fs";

const EN_PATH = "src/data/pseo/pseo-pages.json";
const PILLAR = "dubai-building-quality-safety-certificate";

// Section 8.2 — Full Related Topics matrix (all 34 guides).
// Each row: guide slug → sibling guide slugs to add to `relatedSlugs`.
const MATRIX = {
  "who-needs-quality-safety-certificate-dubai": [
    "jointly-owned-property-owners-safety-certificate",
    "law-3-2026-free-zone-buildings-guide",
    "buildings-over-40-years-safety-certificate",
    "how-to-get-building-safety-certificate-dubai",
  ],
  "how-to-get-building-safety-certificate-dubai": [
    "who-needs-quality-safety-certificate-dubai",
    "documents-required-quality-safety-certificate",
    "building-inspection-process-law-3-2026",
    "building-safety-certificate-cost-dubai",
  ],
  "building-safety-certificate-cost-dubai": [
    "how-to-get-building-safety-certificate-dubai",
    "documents-required-quality-safety-certificate",
    "how-to-choose-licensed-engineering-office-dubai",
    "law-3-2026-faq",
  ],
  "what-happens-if-you-dont-get-safety-certificate": [
    "law-3-2026-penalties-fines-guide",
    "building-permit-suspension-law-3-2026",
    "law-3-2026-compliance-deadline-guide",
    "buying-property-without-safety-certificate-dubai",
  ],
  "law-3-2026-penalties-fines-guide": [
    "what-happens-if-you-dont-get-safety-certificate",
    "repeat-violation-penalties-law-3-2026",
    "law-3-2026-appeal-process-guide",
    "building-permit-suspension-law-3-2026",
  ],
  "law-3-2026-compliance-deadline-guide": [
    "what-happens-if-you-dont-get-safety-certificate",
    "law-3-2026-penalties-fines-guide",
    "how-to-get-building-safety-certificate-dubai",
    "quality-safety-certificate-validity-renewal",
  ],
  "dubai-law-3-2026-complete-guide": [
    "law-3-2026-key-changes-explained",
    "why-dubai-introduced-building-safety-law-2026",
    "how-to-get-building-safety-certificate-dubai",
    "old-vs-new-building-safety-regulations-dubai",
  ],
  "why-dubai-introduced-building-safety-law-2026": [
    "dubai-law-3-2026-complete-guide",
    "law-3-2026-key-changes-explained",
    "old-vs-new-building-safety-regulations-dubai",
    "dubai-municipality-digital-building-portal",
  ],
  "law-3-2026-key-changes-explained": [
    "old-vs-new-building-safety-regulations-dubai",
    "why-dubai-introduced-building-safety-law-2026",
    "dubai-law-3-2026-complete-guide",
    "quality-safety-certificate-validity-renewal",
  ],
  "quality-safety-certificate-validity-renewal": [
    "buildings-over-40-years-safety-certificate",
    "how-to-get-building-safety-certificate-dubai",
    "law-3-2026-compliance-deadline-guide",
    "law-3-2026-key-changes-explained",
  ],
  "building-safety-certificate-compliance-checklist": [
    "documents-required-quality-safety-certificate",
    "how-to-get-building-safety-certificate-dubai",
    "building-inspection-process-law-3-2026",
    "building-management-obligations-law-3-2026",
  ],
  "documents-required-quality-safety-certificate": [
    "how-to-get-building-safety-certificate-dubai",
    "building-safety-certificate-compliance-checklist",
    "building-inspection-process-law-3-2026",
    "building-safety-certificate-cost-dubai",
  ],
  "building-inspection-process-law-3-2026": [
    "how-to-get-building-safety-certificate-dubai",
    "documents-required-quality-safety-certificate",
    "mep-systems-law-3-2026-compliance",
    "engineering-office-responsibilities-law-3-2026",
  ],
  "law-3-2026-free-zone-buildings-guide": [
    "who-needs-quality-safety-certificate-dubai",
    "jointly-owned-property-owners-safety-certificate",
    "dubai-law-3-2026-complete-guide",
    "property-investors-law-3-2026-impact",
  ],
  "jointly-owned-property-owners-safety-certificate": [
    "who-needs-quality-safety-certificate-dubai",
    "building-management-obligations-law-3-2026",
    "landlord-obligations-building-safety-law-2026",
    "buildings-over-40-years-safety-certificate",
  ],
  "buildings-over-40-years-safety-certificate": [
    "quality-safety-certificate-validity-renewal",
    "building-inspection-process-law-3-2026",
    "old-vs-new-building-safety-regulations-dubai",
    "tenant-rights-demolition-law-3-2026",
  ],
  "how-to-choose-licensed-engineering-office-dubai": [
    "engineering-office-responsibilities-law-3-2026",
    "building-safety-certificate-cost-dubai",
    "building-inspection-process-law-3-2026",
    "documents-required-quality-safety-certificate",
  ],
  "law-3-2026-appeal-process-guide": [
    "law-3-2026-penalties-fines-guide",
    "what-happens-if-you-dont-get-safety-certificate",
    "repeat-violation-penalties-law-3-2026",
    "law-3-2026-faq",
  ],
  "repeat-violation-penalties-law-3-2026": [
    "law-3-2026-penalties-fines-guide",
    "what-happens-if-you-dont-get-safety-certificate",
    "law-3-2026-appeal-process-guide",
    "law-3-2026-compliance-deadline-guide",
  ],
  "building-permit-suspension-law-3-2026": [
    "what-happens-if-you-dont-get-safety-certificate",
    "law-3-2026-penalties-fines-guide",
    "repeat-violation-penalties-law-3-2026",
    "buying-property-without-safety-certificate-dubai",
  ],
  "engineering-office-responsibilities-law-3-2026": [
    "how-to-choose-licensed-engineering-office-dubai",
    "contractor-responsibilities-law-3-2026",
    "building-inspection-process-law-3-2026",
    "mep-systems-law-3-2026-compliance",
  ],
  "contractor-responsibilities-law-3-2026": [
    "engineering-office-responsibilities-law-3-2026",
    "building-management-obligations-law-3-2026",
    "building-inspection-process-law-3-2026",
    "dubai-law-3-2026-complete-guide",
  ],
  "building-management-obligations-law-3-2026": [
    "jointly-owned-property-owners-safety-certificate",
    "landlord-obligations-building-safety-law-2026",
    "building-safety-certificate-compliance-checklist",
    "contractor-responsibilities-law-3-2026",
  ],
  "landlord-obligations-building-safety-law-2026": [
    "tenant-rights-demolition-law-3-2026",
    "jointly-owned-property-owners-safety-certificate",
    "building-management-obligations-law-3-2026",
    "what-happens-if-you-dont-get-safety-certificate",
  ],
  "tenant-rights-demolition-law-3-2026": [
    "landlord-obligations-building-safety-law-2026",
    "buildings-over-40-years-safety-certificate",
    "what-happens-if-you-dont-get-safety-certificate",
    "law-3-2026-faq",
  ],
  "mep-systems-law-3-2026-compliance": [
    "building-inspection-process-law-3-2026",
    "engineering-office-responsibilities-law-3-2026",
    "building-safety-certificate-compliance-checklist",
    "contractor-responsibilities-law-3-2026",
  ],
  "property-investors-law-3-2026-impact": [
    "buying-property-without-safety-certificate-dubai",
    "law-3-2026-free-zone-buildings-guide",
    "quality-safety-certificate-validity-renewal",
    "old-vs-new-building-safety-regulations-dubai",
  ],
  "buying-property-without-safety-certificate-dubai": [
    "what-happens-if-you-dont-get-safety-certificate",
    "property-investors-law-3-2026-impact",
    "building-permit-suspension-law-3-2026",
    "documents-required-quality-safety-certificate",
  ],
  "dubai-municipality-digital-building-portal": [
    "how-to-get-building-safety-certificate-dubai",
    "building-inspection-process-law-3-2026",
    "law-3-2026-key-changes-explained",
    "why-dubai-introduced-building-safety-law-2026",
  ],
  "old-vs-new-building-safety-regulations-dubai": [
    "law-3-2026-key-changes-explained",
    "why-dubai-introduced-building-safety-law-2026",
    "buildings-over-40-years-safety-certificate",
    "quality-safety-certificate-validity-renewal",
  ],
  "law-3-2026-faq": [
    "who-needs-quality-safety-certificate-dubai",
    "how-to-get-building-safety-certificate-dubai",
    "law-3-2026-penalties-fines-guide",
    "law-3-2026-compliance-deadline-guide",
  ],
  "building-maintenance-obligations-law-3-2026": [
    "building-safety-certificate-compliance-checklist",
    "quality-safety-certificate-validity-renewal",
    "buildings-over-40-years-safety-certificate",
    "how-to-get-building-safety-certificate-dubai",
  ],
  "quality-safety-certificate-vs-completion-certificate-dubai": [
    "how-to-get-building-safety-certificate-dubai",
    "buildings-over-40-years-safety-certificate",
    "old-vs-new-building-safety-regulations-dubai",
    "law-3-2026-faq",
  ],
  "dubai-building-safety-law-tenant-guide": [
    "tenant-rights-demolition-law-3-2026",
    "landlord-obligations-building-safety-law-2026",
    "what-happens-if-you-dont-get-safety-certificate",
    "how-to-get-building-safety-certificate-dubai",
  ],
};

function main() {
  const pages = JSON.parse(readFileSync(EN_PATH, "utf8"));
  const bySlug = new Map(pages.map((p) => [p.slug, p]));

  let updated = 0;
  let missingPages = 0;
  let missingSiblings = 0;

  for (const [slug, siblings] of Object.entries(MATRIX)) {
    const page = bySlug.get(slug);
    if (!page) {
      console.warn(`MISSING PAGE: ${slug} — not found in pseo-pages.json`);
      missingPages++;
      continue;
    }

    const before = page.relatedSlugs ?? [];
    const merged = [];
    const seen = new Set();

    // Preserve existing order (approval cross-links + redundant pillar).
    for (const s of before) {
      if (seen.has(s)) continue;
      seen.add(s);
      merged.push(s);
    }
    // Append sibling guides that resolve within the pSEO store (no self-links).
    let added = 0;
    for (const sib of siblings) {
      if (sib === slug) continue; // no self-link
      if (seen.has(sib)) continue;
      if (!bySlug.has(sib)) {
        console.warn(`  ${slug}: sibling MISSING from store → ${sib}`);
        missingSiblings++;
        continue;
      }
      seen.add(sib);
      merged.push(sib);
      added++;
    }

    if (merged.length !== before.length) {
      page.relatedSlugs = merged;
      updated++;
      console.log(
        `+${added}\t${slug}\n` +
        `   before: [${before.join(", ")}]\n` +
        `   after : [${merged.join(", ")}]`
      );
    } else {
      console.log(`=\t${slug} (no change: ${merged.length} related)`);
    }
  }

  writeFileSync(EN_PATH, JSON.stringify(pages, null, 2) + "\n", "utf8");
  console.log(
    `\nWoven: ${updated}/${Object.keys(MATRIX).length} pages updated | ` +
    `missing pages: ${missingPages} | missing siblings: ${missingSiblings}`
  );

  // Verify symmetry: every matrix sibling should be one of the matrix keys,
  // and every key should be reachable. Report any asymmetric edges.
  const keys = new Set(Object.keys(MATRIX));
  const asymmetric = [];
  for (const [slug, siblings] of Object.entries(MATRIX)) {
    for (const sib of siblings) {
      if (sib === slug) continue;
      const back = (MATRIX[sib] ?? []).includes(slug);
      if (!back) asymmetric.push(`${slug} → ${sib} (no backlink)`);
    }
  }
  console.log(`Symmetry: ${asymmetric.length} asymmetric edges`);
  if (asymmetric.length) console.log(asymmetric.join("\n"));
}

main();

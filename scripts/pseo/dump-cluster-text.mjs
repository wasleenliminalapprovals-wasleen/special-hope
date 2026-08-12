// Dump the body text of the 34 Law 3/2026 cluster guides (EN + AR) to a report
// file so we can design natural inline-link insertion points.
// Usage: node scripts/pseo/dump-cluster-text.mjs
import { readFileSync, writeFileSync } from "node:fs";

const EN_PATH = "src/data/pseo/pseo-pages.json";
const AR_PATH = "src/data/pseo/pseo-pages-ar.json";

const CLUSTER = [
  "who-needs-quality-safety-certificate-dubai",
  "how-to-get-building-safety-certificate-dubai",
  "building-safety-certificate-cost-dubai",
  "what-happens-if-you-dont-get-safety-certificate",
  "law-3-2026-penalties-fines-guide",
  "law-3-2026-compliance-deadline-guide",
  "dubai-law-3-2026-complete-guide",
  "why-dubai-introduced-building-safety-law-2026",
  "law-3-2026-key-changes-explained",
  "quality-safety-certificate-validity-renewal",
  "building-safety-certificate-compliance-checklist",
  "documents-required-quality-safety-certificate",
  "building-inspection-process-law-3-2026",
  "law-3-2026-free-zone-buildings-guide",
  "jointly-owned-property-owners-safety-certificate",
  "buildings-over-40-years-safety-certificate",
  "how-to-choose-licensed-engineering-office-dubai",
  "law-3-2026-appeal-process-guide",
  "repeat-violation-penalties-law-3-2026",
  "building-permit-suspension-law-3-2026",
  "engineering-office-responsibilities-law-3-2026",
  "contractor-responsibilities-law-3-2026",
  "building-management-obligations-law-3-2026",
  "landlord-obligations-building-safety-law-2026",
  "tenant-rights-demolition-law-3-2026",
  "mep-systems-law-3-2026-compliance",
  "property-investors-law-3-2026-impact",
  "buying-property-without-safety-certificate-dubai",
  "dubai-municipality-digital-building-portal",
  "old-vs-new-building-safety-regulations-dubai",
  "law-3-2026-faq",
  "building-maintenance-obligations-law-3-2026",
  "quality-safety-certificate-vs-completion-certificate-dubai",
  "dubai-building-safety-law-tenant-guide",
];

function walkBlocks(blocks, out) {
  const walk = (b) => {
    if (!b || typeof b !== "object") return;
    if (typeof b.text === "string" && b.text.trim()) out.push(b.text.trim());
    if (Array.isArray(b.items)) for (const it of b.items) walk({ text: it });
    if (Array.isArray(b.rows)) for (const row of b.rows) for (const cell of row) walk({ text: cell });
  };
  for (const b of blocks) walk(b);
}

const en = JSON.parse(readFileSync(EN_PATH, "utf8"));
const ar = JSON.parse(readFileSync(AR_PATH, "utf8"));
const enBy = new Map(en.map((p) => [p.slug, p]));
const arBy = new Map(ar.map((e) => [e.slug, e]));

const out = [];
for (const slug of CLUSTER) {
  const page = enBy.get(slug);
  out.push(`\n\n========== EN: ${slug} ==========`);
  if (!page) { out.push("  (NOT FOUND)"); continue; }
  for (const sec of page.sections || []) {
    const texts = [];
    walkBlocks(sec.blocks || [], texts);
    if (texts.length) {
      out.push(`-- [${sec.heading}]`);
      for (const t of texts) out.push(`   ${t}`);
    }
  }

  const arEntry = arBy.get(slug);
  out.push(`\n========== AR: ${slug} ==========`);
  if (!arEntry) { out.push("  (NOT FOUND)"); continue; }
  for (const sec of arEntry.ar?.sections || []) {
    const texts = [];
    walkBlocks(sec.blocks || [], texts);
    if (texts.length) {
      out.push(`-- [${sec.heading}]`);
      for (const t of texts) out.push(`   ${t}`);
    }
  }
}

writeFileSync("scripts/pseo/_cluster-text-dump.txt", out.join("\n"), "utf8");
console.log(`DUMPED ${CLUSTER.length} pages -> scripts/pseo/_cluster-text-dump.txt (${out.length} lines)`);

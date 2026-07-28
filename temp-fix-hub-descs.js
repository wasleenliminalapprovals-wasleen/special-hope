const fs = require('fs');

let content = fs.readFileSync('src/data/guides.ts', 'utf-8');
const hasCRLF = content.includes('\r\n');
content = content.replace(/\r\n/g, '\n');

// Expanded hub descriptions to 100+ words
const hubExpansions = {
  "complete-guide-dubai-building-approvals": 
    "Everything you need to know about building approvals in Dubai — from DM permits and DCD approvals to DEWA connections and developer NOCs. Covers all 8 approval categories including government-regulatory, free zone, developer community, property registration, technical utility, trade-food-hospitality, fit-out construction, and drawing documentation. Includes realistic timelines ranging from 3 to 25 business days depending on authority, fee ranges from AED 500 to AED 50,000+, required documents per authority, and common pitfalls that cause rejection. Expert guidance from Wasleen approval consultants with years of experience navigating Dubai's multi-authority approval landscape for residential, commercial, and industrial projects across all communities and free zones.",
  
  "how-to-avoid-approval-rejection-dubai":
    "Learn the most common reasons Dubai building approval applications get rejected and how to avoid them. Covers the top 3 causes of rejection — incomplete documentation, non-compliant drawings, and expired or incorrect NOCs — plus zoning non-compliance, incorrect fee calculation, missing signatures and stamps, and incomplete structural calculations. Each rejection cause is explained in detail with specific prevention strategies and document preparation tips. Expert guidance from Wasleen approval consultants on getting first-time approval through pre-submission audits, document checklist verification, and direct coordination with authority reviewers. Reduce your rejection risk by up to 90% with proper preparation and professional document review before official submission.",
  
  "dubai-approval-fees-guide":
    "Comprehensive breakdown of approval fees in Dubai for building permits, DCD approvals, DEWA connections, developer NOCs, and more. Covers Dubai Municipality permit fees calculated at 0.1% to 0.5% of project value, DCD fire safety fees ranging from AED 500 to AED 3,000, DEWA connection application and meter installation fees, developer NOC fees across Emaar, Nakheel, TECOM, DMCC, and other major communities. Plus Ejari registration at AED 155 to AED 550, title deed transfers at 2% of property value, and RERA permits for off-plan property sales. Includes indicative cost ranges for all 8 approval categories with realistic minimum and maximum fee estimates. Transparent fixed-fee packages from Wasleen with no hidden charges or surprise costs.",

  "approval-timelines-dubai-guide":
    "Realistic timelines for all Dubai building approvals — from DM permits and DCD NOCs to DEWA connections and developer approvals across every major authority. Covers standard processing times for Dubai Municipality building permits (5 to 15 business days for standard projects), DCD fire safety approval (5 to 10 business days), DEWA connection NOCs (3 to 7 business days), developer NOCs from Emaar, Nakheel, and others (3 to 10 business days), Ejari registration (1 to 2 business days), and completion certificates (10 to 20 business days after inspection). Total end-to-end timeline estimates for villa renovations at 4 to 8 weeks, commercial fit-outs at 8 to 16 weeks, and new construction at 3 to 6 months with expert tips on how to expedite each stage of the process.",
};

let count = 0;
for (const [slug, newDesc] of Object.entries(hubExpansions)) {
  // Find slug position
  const slugMarker = `slug: "${slug}"`;
  const slugPos = content.indexOf(slugMarker);
  if (slugPos === -1) { console.log(`❌ ${slug}: not found`); continue; }

  // Find entry bounds
  const afterSlug = content.substring(slugPos + slugMarker.length);
  const nextSlugMatch = afterSlug.match(/\n\s{4}slug:\s*"/);
  const entryEnd = nextSlugMatch ? slugPos + slugMarker.length + nextSlugMatch.index : content.length;
  const entryContent = content.substring(slugPos, entryEnd);

  // Match description value
  const descMatch = entryContent.match(/\n    description:\n(\s{6}")([^]*?)(",?)\s*$/m);
  if (!descMatch) { console.log(`❌ ${slug}: pattern not matched`); continue; }

  const oldFull = descMatch[0];
  const newFull = `\n    description:\n${descMatch[1]}${newDesc}${descMatch[3]}`;

  const localPos = entryContent.indexOf(oldFull);
  const globalPos = slugPos + localPos;

  if (content.substring(globalPos, globalPos + oldFull.length) === oldFull) {
    content = content.substring(0, globalPos) + newFull + content.substring(globalPos + oldFull.length);
    count++;
    console.log(`✅ ${slug}: description re-expanded`);
  }
}

const output = hasCRLF ? content.replace(/\n/g, '\r\n') : content;
fs.writeFileSync('src/data/guides.ts', output);
console.log(`\nDone! ${count} hub descriptions re-expanded.`);

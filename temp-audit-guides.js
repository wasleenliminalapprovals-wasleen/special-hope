const fs = require('fs');

// Read the guides file
const content = fs.readFileSync('src/data/guides.ts', 'utf-8');

// Extract all guide entries by finding slug lines and their surrounding context
// Each entry starts with { and has a slug property
const slugRegex = /slug:\s*"([^"]+)"/g;
const slugs = [];
let match;
while ((match = slugRegex.exec(content)) !== null) {
  slugs.push(match[1]);
}
console.log(`Total guides found: ${slugs.length}\n`);

// For each slug, find its entry and extract properties
const entries = [];
for (let i = 0; i < slugs.length; i++) {
  const slug = slugs[i];
  
  // Find the position of this slug
  const slugPos = content.indexOf(`slug: "${slug}"`);
  if (slugPos === -1) continue;
  
  // Find the start of this entry (backward search for `{` before slug)
  const beforeSlug = content.substring(0, slugPos);
  const entryStart = beforeSlug.lastIndexOf('  {');
  if (entryStart === -1) continue;
  
  // Find the end of this entry (find the matching closing `},` after slug)
  // Simple approach: find next slug and go back to find `},`
  let entryEnd;
  if (i < slugs.length - 1) {
    const nextSlugPos = content.indexOf(`slug: "${slugs[i+1]}"`);
    // Find the `},` before next slug
    const between = content.substring(entryStart, nextSlugPos);
    // Find the last `},` or `];` in this range
    const lastClose = between.lastIndexOf('},');
    entryEnd = entryStart + lastClose + 2; // include the `},`
  } else {
    // Last entry - find `];` at the end
    const afterSlug = content.substring(entryStart);
    const endArray = afterSlug.indexOf('];');
    // Find the last `},` before `];`
    const upToEnd = afterSlug.substring(0, endArray);
    const lastClose = upToEnd.lastIndexOf('},');
    entryEnd = entryStart + lastClose + 2;
  }
  
  const entryText = content.substring(entryStart, entryEnd);
  entries.push({ slug, entryText });
}

// Now analyze each entry
let results = [];
let totalDescriptions = 0;
let totalShortDescriptions = 0;
let totalAnswers = 0;
let totalShortAnswers = 0;
let totalContentParagraphs = 0;
let totalContentWords = 0;
let totalShortContent = 0;
let entriesWithParentSlug = 0;

for (const entry of entries) {
  const text = entry.entryText;
  
  // Extract type
  const typeMatch = text.match(/type:\s*"(hub|qa)"/);
  const type = typeMatch ? typeMatch[1] : 'unknown';
  
  // Extract description
  const descMatch = text.match(/description:\s*"([^"]*)"/);
  const description = descMatch ? descMatch[1] : '';
  const descWords = description.split(/\s+/).filter(w => w.length > 0).length;
  
  // Extract question (for QA types)
  const qMatch = text.match(/question:\s*"([^"]*)"/);
  const question = qMatch ? qMatch[1] : '';
  
  // Extract answer (for QA types)
  const aMatch = text.match(/answer:\s*"([^"]*)"/);
  const answer = aMatch ? aMatch[1] : '';
  const answerWords = answer.split(/\s+/).filter(w => w.length > 0).length;
  
  // Extract content array items
  const contentItems = text.match(/content:\s*\[([\s\S]*?)\]/);
  let contentParagraphs = 0;
  let contentWords = 0;
  if (contentItems) {
    const contentBody = contentItems[1];
    // Count string items within the array
    const stringMatches = contentBody.match(/"([^"]*)"/g);
    if (stringMatches) {
      contentParagraphs = stringMatches.length;
      contentWords = stringMatches.reduce((sum, s) => {
        // Remove the quotes
        const clean = s.slice(1, -1);
        return sum + clean.split(/\s+/).filter(w => w.length > 0).length;
      }, 0);
    }
  }
  
  // Extract relatedSlugs
  const relatedMatch = text.match(/relatedSlugs:\s*guideRelated\([^,]+,\s*"[^"]+"\)/);
  const hasRelatedSlugs = relatedMatch !== null;
  
  // Extract parentApprovalSlug
  const parentMatch = text.match(/parentApprovalSlug:\s*"([^"]+)"/);
  const parentSlug = parentMatch ? parentMatch[1] : null;
  
  // Check description threshold (≥100 for hub, ≥50 for qa)
  const descThreshold = type === 'hub' ? 100 : 50;
  const descPass = descWords >= descThreshold;
  
  // Check answer threshold (≥100 for qa)
  const answerPass = type !== 'qa' || answerWords >= 100;
  
  // Check content threshold (≥200 words for hub, ≥100 for qa)
  const contentThreshold = type === 'hub' ? 200 : 100;
  const contentPass = contentWords >= contentThreshold;
  
  // Check parent slug for qa types
  const parentPass = type !== 'qa' || parentSlug !== null;
  
  // Short descriptions
  if (!descPass) totalShortDescriptions++;
  totalDescriptions++;
  
  // Short answers
  if (type === 'qa') {
    totalAnswers++;
    if (!answerPass) totalShortAnswers++;
  }
  
  // Short content
  totalContentParagraphs += contentParagraphs;
  totalContentWords += contentWords;
  if (!contentPass) totalShortContent++;
  
  if (parentSlug) entriesWithParentSlug++;
  
  results.push({
    slug: entry.slug,
    type,
    descWords,
    descPass,
    answerWords: type === 'qa' ? answerWords : null,
    answerPass: type === 'qa' ? answerPass : null,
    contentParagraphs,
    contentWords,
    contentPass,
    hasRelatedSlugs,
    parentSlug
  });
}

// Print summary
console.log('=== GUIDE CONTENT AUDIT SUMMARY ===\n');

console.log(`Total guides: ${results.length}`);
console.log(`Hub guides: ${results.filter(r => r.type === 'hub').length}`);
console.log(`QA guides: ${results.filter(r => r.type === 'qa').length}\n`);

console.log('--- DESCRIPTIONS ---');
console.log(`Total: ${totalDescriptions}`);
console.log(`Short descriptions (hub <100 words, qa <50 words): ${totalShortDescriptions}`);
const shortDescs = results.filter(r => !r.descPass);
shortDescs.forEach(r => console.log(`  ❌ ${r.slug} (${r.type}) - ${r.descWords} words`));
results.filter(r => r.descPass).forEach(r => console.log(`  ✅ ${r.slug} (${r.type}) - ${r.descWords} words`));

console.log('\n--- QA ANSWERS ---');
console.log(`Total QA guides with answers: ${totalAnswers}`);
console.log(`Short answers (<100 words): ${totalShortAnswers}`);
const shortAnswers = results.filter(r => r.type === 'qa' && !r.answerPass);
shortAnswers.forEach(r => console.log(`  ❌ ${r.slug} - ${r.answerWords} words`));
results.filter(r => r.type === 'qa' && r.answerPass).forEach(r => console.log(`  ✅ ${r.slug} - ${r.answerWords} words`));

console.log('\n--- CONTENT PARAGRAPHS/WORDS ---');
console.log(`Total content paragraphs across all guides: ${totalContentParagraphs}`);
console.log(`Total content words across all guides: ${totalContentWords}`);
console.log(`Guides with thin content: ${totalShortContent}`);
const shortContent = results.filter(r => !r.contentPass);
shortContent.forEach(r => console.log(`  ❌ ${r.slug} (${r.type}) - ${r.contentWords} words (threshold: ${r.type === 'hub' ? 200 : 100})`));
results.filter(r => r.contentPass).forEach(r => console.log(`  ✅ ${r.slug} (${r.type}) - ${r.contentWords} words`));

console.log('\n--- INTERNAL LINKING ---');
const noRelated = results.filter(r => !r.hasRelatedSlugs);
console.log(`Guides with relatedSlugs: ${results.filter(r => r.hasRelatedSlugs).length}`);
console.log(`Guides without relatedSlugs: ${noRelated.length}`);
noRelated.forEach(r => console.log(`  ❌ ${r.slug}`));

console.log('\n--- PARENT APPROVAL ---');
console.log(`QA guides with parentApprovalSlug: ${entriesWithParentSlug}`);
console.log(`QA guides WITHOUT parentApprovalSlug: ${results.filter(r => r.type === 'qa').length - entriesWithParentSlug}`);

// Word count distribution
const descDist = {};
results.forEach(r => {
  const bucket = Math.floor(r.descWords / 10) * 10;
  descDist[bucket] = (descDist[bucket] || 0) + 1;
});
console.log('\n--- DESCRIPTION WORD COUNT DISTRIBUTION ---');
Object.keys(descDist).sort((a,b) => Number(a) - Number(b)).forEach(k => {
  console.log(`  ${k}-${Number(k)+9} words: ${descDist[k]} guides`);
});

const answerDist = {};
results.filter(r => r.type === 'qa').forEach(r => {
  const bucket = Math.floor(r.answerWords / 50) * 50;
  answerDist[bucket] = (answerDist[bucket] || 0) + 1;
});
console.log('\n--- ANSWER WORD COUNT DISTRIBUTION ---');
Object.keys(answerDist).sort((a,b) => Number(a) - Number(b)).forEach(k => {
  console.log(`  ${k}-${Number(k)+49} words: ${answerDist[k]} guides`);
});

const contentDist = {};
results.forEach(r => {
  const bucket = Math.floor(r.contentWords / 100) * 100;
  contentDist[bucket] = (contentDist[bucket] || 0) + 1;
});
console.log('\n--- CONTENT WORD COUNT DISTRIBUTION ---');
Object.keys(contentDist).sort((a,b) => Number(a) - Number(b)).forEach(k => {
  console.log(`  ${k}-${Number(k)+99} words: ${contentDist[k]} guides`);
});

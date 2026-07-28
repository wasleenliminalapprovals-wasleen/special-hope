const fs = require('fs');
const content = fs.readFileSync('src/data/approvals.ts', 'utf8');

const sections = content.split(/\n  \{/);
let results = [];

for (let i = 0; i < sections.length; i++) {
  const s = sections[i];
  const slugMatch = s.match(/slug:\s+"([^"]+)"/);
  if (!slugMatch) continue;
  const slug = slugMatch[1];
  
  // Skip categorySlugs function entries
  if (slug.includes('function')) continue;
  
  const faqMatches = s.match(/question:\s+"/g);
  const faqCount = faqMatches ? faqMatches.length : 0;
  
  const daMatch = s.match(/directAnswer:\s+"([^"]+)"/);
  const directAnswer = daMatch ? daMatch[1] : '';
  const daWords = directAnswer ? directAnswer.split(/\s+/).filter(w => w.length > 0).length : 0;
  
  const descMatch = s.match(/description:\s+"([^"]+)"/);
  let descWords = 0;
  if (descMatch) {
    descWords = descMatch[1].split(/\s+/).filter(w => w.length > 0).length;
  }
  
  const descSection = s.match(/description:\s+"[\s\S]*?"(?=\s*,?\s*\n\s+\w)/);
  const descText = descSection ? descSection[0] : '';
  const hasInternalLinks = descText.includes('/approvals/') || descText.includes('/guides/') || descText.includes('/services/');
  
  results.push({ slug, faqCount, daWords, descWords, hasInternalLinks });
}

// Prioritize by number of issues
results.sort((a, b) => {
  const aScore = (a.faqCount < 5 ? 1 : 0) + (a.daWords < 50 ? 1 : 0) + (a.descWords < 100 ? 1 : 0) + (a.hasInternalLinks ? 0 : 1);
  const bScore = (b.faqCount < 5 ? 1 : 0) + (b.daWords < 50 ? 1 : 0) + (b.descWords < 100 ? 1 : 0) + (b.hasInternalLinks ? 0 : 1);
  return bScore - aScore;
});

// Print distribution stats
const faqDist = {};
const daDist = {};
const descDist = {};
results.forEach(r => {
  const f = r.faqCount < 5 ? r.faqCount : '5+';
  faqDist[f] = (faqDist[f] || 0) + 1;
  const d = Math.floor(r.daWords / 5) * 5;
  daDist[d] = (daDist[d] || 0) + 1;
  const de = Math.floor(r.descWords / 10) * 10;
  descDist[de] = (descDist[de] || 0) + 1;
});

console.log('=== FAQ Count Distribution ===');
Object.entries(faqDist).sort().forEach(([k, v]) => console.log(`  ${k} FAQs: ${v} entries`));
console.log('\n=== DirectAnswer Word Count Distribution ===');
Object.entries(daDist).sort((a, b) => Number(a[0]) - Number(b[0])).forEach(([k, v]) => console.log(`  ${k}-${Number(k)+4} words: ${v} entries`));
console.log('\n=== Description Word Count Distribution ===');
Object.entries(descDist).sort((a, b) => Number(a[0]) - Number(b[0])).forEach(([k, v]) => console.log(`  ${k}-${Number(k)+9} words: ${v} entries`));

console.log(`\n=== MISSING INTERNAL LINKS ===`);
const noLinks = results.filter(r => !r.hasInternalLinks);
console.log(`${noLinks.length} entries missing internal links in description`);

console.log(`\n=== TOP PRIORITY (4 issues) ===`);
results.filter(r => (r.faqCount < 5 ? 1 : 0) + (r.daWords < 50 ? 1 : 0) + (r.descWords < 100 ? 1 : 0) + (!r.hasInternalLinks ? 1 : 0) >= 4).forEach(r => {
  console.log(`  ${r.slug} - FAQs:${r.faqCount}, DA:${r.daWords}w, Desc:${r.descWords}w, Links:${r.hasInternalLinks}`);
});

console.log(`\n=== NEAR-THRESHOLD (1-2 fixes needed) ===`);
results.filter(r => (r.faqCount < 5 ? 1 : 0) + (r.daWords < 50 ? 1 : 0) + (r.descWords < 100 ? 1 : 0) + (!r.hasInternalLinks ? 1 : 0) <= 2).forEach(r => {
  const issues = [];
  if (r.faqCount < 5) issues.push(`FAQs:${r.faqCount}`);
  if (r.daWords < 50) issues.push(`DA:${r.daWords}w`);
  if (r.descWords < 100) issues.push(`Desc:${r.descWords}w`);
  if (!r.hasInternalLinks) issues.push('No-links');
  console.log(`  ${r.slug} - ${issues.join(', ')}`);
});

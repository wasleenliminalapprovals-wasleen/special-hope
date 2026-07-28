const fs = require('fs');
const content = fs.readFileSync('src/data/approvals.ts', 'utf8');
const parts = content.split('slug: "');
const results = [];

for (let i = 1; i < parts.length; i++) {
  const part = parts[i];
  const slug = part.split('"')[0];
  
  // Find directAnswer field
  const daIdx = part.indexOf('directAnswer:');
  if (daIdx === -1) continue;
  
  const afterDa = part.substring(daIdx + 13);
  
  // Try backtick first, then quote
  let text = null;
  if (afterDa.trim().startsWith('`')) {
    const start = afterDa.indexOf('`');
    const end = afterDa.indexOf('`', start + 1);
    if (end > start) text = afterDa.substring(start + 1, end);
  } else if (afterDa.trim().startsWith('"')) {
    const start = afterDa.indexOf('"');
    const end = afterDa.indexOf('"', start + 1);
    if (end > start) text = afterDa.substring(start + 1, end);
  }
  
  if (!text) continue;
  
  const words = text.split(/\s+/).filter(Boolean).length;
  results.push({ slug, words, preview: text.substring(0, 60) });
}

results.sort((a, b) => a.words - b.words);
console.log('=== SHORTEST 15 directAnswers ===');
results.slice(0, 15).forEach(r => console.log(r.slug + ': ' + r.words + 'w - "' + r.preview + '..."'));
console.log('\n=== AVERAGE ===');
const avg = results.reduce((s, r) => s + r.words, 0) / results.length;
console.log('Average: ' + avg.toFixed(1) + ' words');
console.log('Total entries: ' + results.length);
console.log('Under 50 words: ' + results.filter(r => r.words < 50).length);

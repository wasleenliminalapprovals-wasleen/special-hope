const fs = require('fs');
const c = fs.readFileSync('src/data/approvals.ts', 'utf8').replace(/\r\n/g, '\n');
const entries = c.split(/\n  \{/);
let total = 0;
let under5 = 0;
let over13 = 0;
let dist = {};
for (let i = 1; i < entries.length; i++) {
  const s = entries[i];
  const sm = s.match(/slug:\s+"([^"]+)"/);
  if (!sm || sm[1].includes('function')) continue;
  total++;
  const oneLiner = (s.match(/\{\s*question:\s+"/g) || []).length;
  const multiLine = (s.match(/\n\s{8}question:\s+"/g) || []).length;
  const fq = oneLiner + multiLine;
  dist[fq] = (dist[fq] || 0) + 1;
  if (fq < 5) { under5++; }
  if (fq > 13) { over13++; console.log('OVER 13: ' + sm[1] + ': ' + fq); }
}
console.log('Distribution: ' + JSON.stringify(dist));
console.log('Total: ' + total + ' Under5: ' + under5 + ' Over13: ' + over13);

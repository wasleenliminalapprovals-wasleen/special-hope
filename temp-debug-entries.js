const fs = require('fs');
const content = fs.readFileSync('src/data/approvals.ts', 'utf8');
const lines = content.split('\n');

// Debug first few matching lines
console.log('=== Lines matching "  {" pattern ===');
let matchCount = 0;
for (let i = 0; i < Math.min(250, lines.length); i++) {
  const m = lines[i].match(/^\s{2}\{$/);
  if (m) {
    console.log(`Line ${i+1}: "${lines[i]}"`);
    matchCount++;
    if (matchCount >= 5) break;
  }
}

// Debug the first entry boundary detection
console.log('\n=== First entry boundary detection ===');
for (let i = 0; i < Math.min(200, lines.length); i++) {
  if (lines[i].match(/^\s{2}\{$/)) {
    console.log(`Entry starts at line ${i+1}: "${lines[i]}"`);
    
    // Find closing
    let braceCount = 0;
    for (let j = i; j < Math.min(i + 120, lines.length); j++) {
      const openBraces = (lines[j].match(/\{/g) || []).length;
      const closeBraces = (lines[j].match(/\}/g) || []).length;
      braceCount += openBraces - closeBraces;
      
      if (braceCount <= 0 && lines[j].match(/^\s{2}\},?$/)) {
        console.log(`Entry would END at line ${j+1}: "${lines[j]}", braceCount=${braceCount}`);
        break;
      }
    }
    break;
  }
}

// Debug: Show lines 117-125 to understand entry structure
console.log('\n=== Lines 117-125 ===');
for (let i = 116; i < Math.min(125, lines.length); i++) {
  console.log(`${i+1}: "${lines[i]}"`);
}

// Debug: Show closing area (lines 220-222)
console.log('\n=== Lines 219-222 ===');
for (let i = 218; i < Math.min(223, lines.length); i++) {
  console.log(`${i+1}: "${lines[i]}"`);
}

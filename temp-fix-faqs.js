const fs = require('fs');
const content = fs.readFileSync('src/data/approvals.ts', 'utf8');
const isWindows = content.includes('\r\n');
const cleanContent = content.replace(/\r\n/g, '\n');
const lines = cleanContent.split('\n');

let output = [];
let i = 0;
let fixedCount = 0;

while (i < lines.length) {
  const line = lines[i];
  
  // Detect entry start: line matching /^\s{2}\{/
  if (line.match(/^\s{2}\{/)) {
    const entryStart = i;
    let braceCount = 0;
    let entryEnd = -1;
    for (let j = i; j < lines.length; j++) {
      const l = lines[j];
      braceCount += (l.match(/\{/g) || []).length - (l.match(/\}/g) || []).length;
      if (braceCount <= 0 && l.match(/^\s{2}\},?$/)) {
        entryEnd = j;
        break;
      }
    }
    if (entryEnd === -1) { output.push(line); i++; continue; }
    
    const entryLines = lines.slice(entryStart, entryEnd + 1);
    
    // Check if this entry has mis-placed FAQ items (between caseStudy close and whyChooseUs/faqs)
    // Pattern: caseStudy: { ... }, followed by "      {" FAQ items before whyChooseUs:
    let hasMisplacedFaqs = false;
    let misplaceStart = -1;
    let misplaceEnd = -1;
    
    for (let j = 0; j < entryLines.length - 5; j++) {
      // Look for caseStudy closing }, followed by misplaced FAQ items
      if (entryLines[j].match(/^\s{4}\},?$/) && 
          j + 1 < entryLines.length && 
          entryLines[j + 1].match(/^\s{6}\{/) &&
          entryLines[j + 2] && entryLines[j + 2].includes('question:')) {
        // Found potential misplaced FAQ block
        // Verify there's no "faqs:" between this and whyChooseUs
        let isBeforeFaqs = false;
        let isBeforeWhyChooseUs = false;
        for (let k = j + 1; k < entryLines.length; k++) {
          if (entryLines[k].includes('faqs:')) { isBeforeFaqs = true; break; }
          if (entryLines[k].includes('whyChooseUs:')) { isBeforeWhyChooseUs = true; break; }
        }
        if (isBeforeWhyChooseUs && !isBeforeFaqs) {
          hasMisplacedFaqs = true;
          misplaceStart = j + 1;  // First line of misplaced FAQ block
          
          // Find end of misplaced FAQ block (5 FAQ items)
          let faqCount = 0;
          for (let k = misplaceStart; k < entryLines.length; k++) {
            if (entryLines[k].match(/^\s{6}\{/) && 
                k + 2 < entryLines.length && 
                entryLines[k + 1].includes('question:') &&
                entryLines[k + 2].includes('answer:')) {
              faqCount++;
              k += 3; // Skip ahead past question and answer lines
              // Check for closing brace
              if (k < entryLines.length && (entryLines[k].match(/^\s{6}\},?$/) || entryLines[k].match(/^\s{6}\}$/))) {
                // This FAQ item is closed
              }
            } else {
              misplaceEnd = k - 1;
              break;
            }
          }
          break;
        }
      }
    }
    
    if (hasMisplacedFaqs && misplaceStart >= 0 && misplaceEnd > misplaceStart) {
      // Remove the misplaced FAQ items from entryLines
      const fixedLines = [
        ...entryLines.slice(0, misplaceStart),
        ...entryLines.slice(misplaceEnd + 1)
      ];
      output.push(...fixedLines);
      fixedCount++;
      console.log(`Fixed entry starting at line ${entryStart + 1}: removed ${misplaceEnd - misplaceStart + 1} misplaced FAQ lines`);
    } else {
      output.push(...entryLines);
    }
    i = entryEnd + 1;
    continue;
  }
  output.push(line);
  i++;
}

const outputContent = output.join('\n');
const finalContent = isWindows ? outputContent.replace(/\n/g, '\r\n') : outputContent;
fs.writeFileSync('src/data/approvals.ts', finalContent);
console.log(`\nDone! Fixed ${fixedCount} entries with misplaced FAQs.`);

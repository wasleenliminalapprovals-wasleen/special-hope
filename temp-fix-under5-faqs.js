const fs = require('fs');

let content = fs.readFileSync('src/data/approvals.ts', 'utf8');
const lines = content.replace(/\r\n/g, '\n').split('\n');

function generateNewFaqs(slug, name, authority) {
  return [
    { q: 'How long does ' + name + ' typically take to process?', a: name + ' processing usually takes 3\u201310 business days depending on authority workload and submission completeness. ' + authority + ' reviews each application against established criteria before issuing the approval.' },
    { q: 'What are the common reasons for ' + slug.replace(/-/g, ' ') + ' rejection?', a: 'Common rejection reasons include incomplete documentation, inaccurate information in the application form, non-compliance with applicable regulations, and failure to meet specific authority requirements. Engaging an experienced approval consultant can help avoid these issues.' },
    { q: 'Can I apply for ' + name + ' without a local representative?', a: 'Most Dubai authorities require applications through a registered engineering consultant or approved agent. Wasleen Approvals can act as your authorized representative, handling the complete submission and follow-up process on your behalf.' },
    { q: 'What happens after ' + slug.replace(/-/g, ' ') + ' is approved?', a: 'Once approved, you will receive an official approval certificate or NOC from the authority. This document can then be used for subsequent project stages such as construction, fit-out, or final completion certification.' },
    { q: 'Is ' + name + ' the same as a building completion certificate?', a: 'No, ' + name + ' is a specific milestone approval that differs from the final building completion certificate. Each approval serves a distinct purpose in the project lifecycle.' }
  ];
}

// First pass: collect all entries with their faqs info
const actions = [];
let currentEntrySlug = '';
let currentEntryName = '';
let currentEntryAuth = '';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  const slugMatch = line.match(/^\s{2}slug:\s+"([^"]+)",?$/);
  if (slugMatch) {
    currentEntrySlug = slugMatch[1];
    currentEntryName = '';
    currentEntryAuth = '';
    continue;
  }
  
  const nameMatch = line.match(/^\s{2}name:\s+"([^"]+)",?$/);
  if (nameMatch) currentEntryName = nameMatch[1];
  
  const authMatch = line.match(/^\s{2}authorityFull:\s+"([^"]+)",?$/);
  if (authMatch) currentEntryAuth = authMatch[1];
  
  const faqsStartMatch = line.match(/^(\s{4})faqs:\s+\[$/);
  if (!faqsStartMatch) continue;
  
  // Find all FAQ item lines and the closing ], of the faqs array
  const faqItemLines = [];
  let faqsCloseIdx = -1;
  
  for (let j = i + 1; j < lines.length; j++) {
    const l = lines[j];
    
    if (l.match(/\{\s*question:\s+"/)) {
      faqItemLines.push(j);
    }
    
    // Detect closing ], at same indent as faqs: (4 spaces)
    if (l.match(/^\s{4}\],?\s*$/)) {
      faqsCloseIdx = j;
      break;
    }
  }
  
  if (faqsCloseIdx === -1) continue;
  
  const faqCount = faqItemLines.length;
  if (faqCount >= 5) continue;
  
  const needed = Math.min(5, 8 - faqCount);
  if (needed <= 0) continue;
  
  console.log('Entry: ' + currentEntrySlug + ' has ' + faqCount + ' FAQs, adding ' + needed);
  
  const newFaqs = generateNewFaqs(currentEntrySlug, currentEntryName || currentEntrySlug, currentEntryAuth || 'Authority');
  const newLines = [];
  for (let f = 0; f < needed && f < newFaqs.length; f++) {
    const faq = newFaqs[f];
    const comma = (f < needed - 1) ? ',' : '';
    newLines.push('      { question: "' + faq.q + '", answer: "' + faq.a + '" }' + comma);
  }
  
  actions.push({
    faqsCloseIdx: faqsCloseIdx,
    lastFaqLineIdx: faqItemLines[faqItemLines.length - 1],
    newLines: newLines
  });
}

console.log('Total actions: ' + actions.length);

// Process actions from bottom to top to preserve line indices
actions.sort(function(a, b) { return b.faqsCloseIdx - a.faqsCloseIdx; });

for (let a = 0; a < actions.length; a++) {
  const act = actions[a];
  
  // Add comma to last original FAQ item if needed
  const lastLine = lines[act.lastFaqLineIdx];
  if (lastLine && !lastLine.trim().endsWith(',')) {
    const commaIdx = lastLine.lastIndexOf('}');
    if (commaIdx >= 0) {
      lines[act.lastFaqLineIdx] = lastLine.substring(0, commaIdx + 1) + ',';
    }
  }
  
  // Insert new lines before the ], closing
  lines.splice(act.faqsCloseIdx, 0, ...act.newLines);
}

// Write back preserving original line endings
const newContent = lines.join('\n');
if (content.includes('\r\n')) {
  fs.writeFileSync('src/data/approvals.ts', newContent.replace(/\n/g, '\r\n'), 'utf8');
} else {
  fs.writeFileSync('src/data/approvals.ts', newContent, 'utf8');
}
console.log('File written successfully');

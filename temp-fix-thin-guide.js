const fs = require('fs');

let content = fs.readFileSync('src/data/guides.ts', 'utf-8');
const hasCRLF = content.includes('\r\n');
content = content.replace(/\r\n/g, '\n');

// Find the content array closing for how-to-avoid-approval-rejection-dubai
// Pattern: last "TEXT",\n    ],\n    relatedSlugs:
const search = `reviewers.",\n    ],\n    relatedSlugs: guideRelated("general", "how-to-avoid-approval-rejection-dubai")`;
const insertAfter = `reviewers.",`;

const newParagraph = `\n      "Working with an experienced approval consultant like Wasleen significantly reduces rejection risk. Our pre-submission audit service reviews your complete application package — documents, drawings, NOCs, and fee calculations — identifying and resolving issues before official submission. This ensures your application is complete and compliant, dramatically increasing the chances of first-time approval and saving you weeks of resubmission delays."`;

const pos = content.indexOf(insertAfter);
if (pos !== -1) {
  const insertPos = pos + insertAfter.length;
  content = content.substring(0, insertPos) + newParagraph + content.substring(insertPos);
  
  const output = hasCRLF ? content.replace(/\n/g, '\r\n') : content;
  fs.writeFileSync('src/data/guides.ts', output);
  console.log('✅ how-to-avoid-approval-rejection-dubai: content paragraph added');
} else {
  console.log('❌ Could not find insertion point');
}

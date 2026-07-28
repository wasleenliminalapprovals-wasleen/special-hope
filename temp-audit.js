const fs = require("fs");

const content = fs.readFileSync("src/data/approvals.ts", "utf-8");

// Find the start of the approvals array
const arrStart = content.indexOf("export const approvals: ApprovalData[] = [");
if (arrStart === -1) {
  console.log("Could not find approvals array");
  process.exit(1);
}

const afterArr = content.substring(arrStart);
// Split by "slug:" to get individual entries
const chunks = afterArr.split(/slug:\s*"/);

let shortDescs = [];
let shortAnswers = [];
let descWordCounts = [];
let totalDescs = 0;
let totalAnswers = 0;

for (let i = 1; i < chunks.length; i++) {
  const chunk = chunks[i];
  // Get slug (everything before the closing quote)
  const slugEnd = chunk.indexOf('"');
  if (slugEnd === -1) continue;
  const slug = chunk.substring(0, slugEnd);

  totalDescs++;

  // Extract description - handle both backtick and double-quoted strings
  const descIdx = chunk.indexOf("description:");
  if (descIdx !== -1) {
    let afterDesc = chunk.substring(descIdx + 12).trim();
    let descText = null;

    if (afterDesc.startsWith("`")) {
      const closeTick = afterDesc.indexOf("`", 1);
      if (closeTick !== -1) {
        descText = afterDesc.substring(1, closeTick);
      }
    } else if (afterDesc.startsWith('"')) {
      // Double-quoted string - find the closing quote that's not escaped
      let pos = 1;
      while (pos < afterDesc.length) {
        if (afterDesc[pos] === '"' && afterDesc[pos - 1] !== "\\") {
          descText = afterDesc.substring(1, pos);
          break;
        }
        pos++;
      }
    }

    if (descText !== null) {
      // Replace escaped newlines and normalize whitespace
      const cleanText = descText.replace(/\\n/g, " ").replace(/\s+/g, " ").trim();
      const words = cleanText.split(" ").filter((w) => w.length > 0).length;
      descWordCounts.push({ slug, words });

      if (words < 150) {
        shortDescs.push({ slug, words, preview: cleanText.substring(0, 80) });
      }
    }
  }

  // Extract directAnswer
  const ansIdx = chunk.indexOf("directAnswer:");
  if (ansIdx !== -1) {
    totalAnswers++;
    let afterAns = chunk.substring(ansIdx + 13).trim();
    let ansText = null;

    if (afterAns.startsWith("`")) {
      const closeTick = afterAns.indexOf("`", 1);
      if (closeTick !== -1) {
        ansText = afterAns.substring(1, closeTick);
      }
    } else if (afterAns.startsWith('"')) {
      let pos = 1;
      while (pos < afterAns.length) {
        if (afterAns[pos] === '"' && afterAns[pos - 1] !== "\\") {
          ansText = afterAns.substring(1, pos);
          break;
        }
        pos++;
      }
    }

    if (ansText !== null) {
      const cleanText = ansText.replace(/\\n/g, " ").replace(/\s+/g, " ").trim();
      const words = cleanText.split(" ").filter((w) => w.length > 0).length;
      if (words < 50) {
        shortAnswers.push({ slug, words });
      }
    }
  }
}

console.log("=== APPROVALS WITH DESCRIPTION < 150 WORDS ===");
if (shortDescs.length === 0) {
  console.log("All " + totalDescs + " descriptions checked - none below 150 words");
} else {
  shortDescs.forEach((d) =>
    console.log(d.slug + ": " + d.words + " words\n  " + d.preview + "...\n")
  );
}

console.log("\n=== APPROVALS WITH DIRECTANSWER < 50 WORDS ===");
if (shortAnswers.length === 0) {
  console.log("All " + totalAnswers + " directAnswers checked - none below 50 words");
} else {
  shortAnswers.forEach((a) => console.log(a.slug + ": " + a.words + " words"));
}

// Word count distribution
descWordCounts.sort((a, b) => a.words - b.words);
console.log("\n=== SHORTEST 10 DESCRIPTIONS ===");
descWordCounts.slice(0, 10).forEach((d) => console.log(d.slug + ": " + d.words + " words"));

console.log("\n=== LONGEST 5 DESCRIPTIONS ===");
descWordCounts.slice(-5).reverse().forEach((d) => console.log(d.slug + ": " + d.words + " words"));

const avg = Math.round(
  descWordCounts.reduce((s, d) => s + d.words, 0) / descWordCounts.length
);
console.log("\nTotal parsed: " + descWordCounts.length + " descriptions");
console.log("Average: " + avg + " words");
console.log("Range: " + descWordCounts[0].words + " - " + descWordCounts[descWordCounts.length - 1].words + " words");

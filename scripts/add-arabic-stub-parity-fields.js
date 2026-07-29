/**
 * Add structural parity fields (stats, typicalTimeline, typicalCostRange)
 * to all 52 stub entries in src/data/approvals-ar.ts.
 *
 * These fields were added to the ApprovalArabicContent type in Phase 0.5
 * but the stub data file doesn't have them yet.
 *
 * Usage: node scripts/add-arabic-stub-parity-fields.js
 */

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "src", "data", "approvals-ar.ts");
let content = fs.readFileSync(filePath, "utf-8");

// Pattern: match the end of each ar object (faqs closing `],` followed by `    },`)
// We look for `      ],\n    },` (faqs close, newline, ar object close)
// and insert the new fields between them.
const pattern = /(      \],\n)(    \},)/g;

const newFields = `      stats: [
        { label: "الجهة المختصة", value: "الجهة المختصة" },
        { label: "المدة التقريبية", value: "5-10 أيام عمل" },
        { label: "إلزامي لـ", value: "جميع المشاريع" },
        { label: "المستندات المطلوبة", value: "8-12 مستند" },
      ],
      typicalTimeline: "5-10 أيام عمل",
      typicalCostRange: "500-3000 درهم إماراتي",
`;

const newContent = content.replace(pattern, "$1" + newFields + "$2");
const count = (content.match(pattern) || []).length;

fs.writeFileSync(filePath, newContent, "utf-8");
console.log(`✅ Updated ${count} stub entries with new parity fields (stats, typicalTimeline, typicalCostRange).`);

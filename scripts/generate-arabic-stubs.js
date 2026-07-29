/**
 * Generate Arabic stub data files from English data files.
 *
 * Extracts all slugs from the English data files and creates stub
 * Arabic data files with matching slugs and placeholder content.
 *
 * Usage:
 *   node scripts/generate-arabic-stubs.js
 */

const fs = require("fs");
const path = require("path");

const DATA_DIR = path.resolve(__dirname, "..", "src", "data");

/* ── Extract slugs from a data file ─────────────────────── */

function extractDatasetSlugs(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const slugs = [];

  // Find the data array: `export const X: Type[] = [`
  const arrayStart = raw.match(/export\s+const\s+\w+\s*:\s*\w+\[\]\s*=\s*\[/);
  if (!arrayStart) {
    console.warn(`  ⚠ No data array found in ${filePath}`);
    return slugs;
  }

  const startIdx = arrayStart.index + arrayStart[0].length;
  const section = raw.slice(startIdx);

  // Find closing bracket of the array
  // depth starts at 1 because we sliced AFTER the opening [
  let depth = 1;
  let endIdx = -1;
  for (let i = 0; i < section.length; i++) {
    if (section[i] === "[") depth++;
    else if (section[i] === "]") {
      depth--;
      if (depth === 0) {
        endIdx = i;
        break;
      }
    }
  }

  if (endIdx === -1) {
    console.warn(`  ⚠ Could not find array close in ${filePath}`);
    return slugs;
  }

  const arrayContent = section.slice(0, endIdx);
  const slugRegex = /slug:\s*"([^"]+)"/g;
  let match;
  while ((match = slugRegex.exec(arrayContent)) !== null) {
    slugs.push(match[1]);
  }

  return slugs;
}

/* ── Generate approval stub ─────────────────────────────── */

function generateApprovalsStub(slugs) {
  const entries = slugs
    .map(
      (slug) => `  {
    slug: "${slug}",
    ar: {
      slug: "موافقة-${slug}",
      name: "موافقة ${slug.replace(/-/g, " ")}",
      shortName: "موافقة ${slug.split("-")[0]}",
      authorityFull: "سلطة ${slug.replace(/-/g, " ")}",
      authorityAbbr: "${slug.split("-").map((s) => s[0]).join("").toUpperCase()}",
      primaryKeyword: "${slug.replace(/-/g, " ")} دبي",
      secondaryKeywords: ["موافقة ${slug.replace(/-/g, " ")}", "تصريح ${slug.replace(/-/g, " ")}"],
      directAnswer: "هذه موافقة ${slug.replace(/-/g, " ")} في دبي. يتم إصدارها من قبل السلطة المختصة.",
      description: "وصف تفصيلي لموافقة ${slug.replace(/-/g, " ")} في دبي. هذه الموافقة مطلوبة لجميع المشاريع في الإمارة.",
      whoNeedsIt: ["أصحاب المشاريع", "المقاولون", "المهندسون المعماريون"],
      documents: [
        { document: "نموذج الطلب مكتمل", mandatory: true },
        { document: "نسخة من سند الملكية", mandatory: true },
      ],
      process: [
        { step: 1, title: "تقديم الطلب", description: "تقديم جميع المستندات المطلوبة عبر البوابة الإلكترونية." },
        { step: 2, title: "المراجعة", description: "مراجعة الطلب من قبل السلطة المختصة." },
        { step: 3, title: "الموافقة", description: "إصدار الموافقة بعد استيفاء جميع المتطلبات." },
      ],
      timelineTable: [
        { stage: "تحضير المستندات", duration: "3-7 أيام عمل", cost: "مشمول في رسوم الخدمة", notes: "حسب جاهزية المستندات" },
        { stage: "المراجعة الأولية", duration: "3-5 أيام عمل", cost: "500-2000 درهم", notes: "" },
        { stage: "الموافقة النهائية", duration: "1-2 يوم عمل", cost: "500-3000 درهم", notes: "" },
      ],
      rejectionReasons: [
        { reason: "مستندات غير مكتملة", solution: "استخدم قائمة التحقق الشاملة لدينا." },
        { reason: "رسومات غير معتمدة", solution: "تأكد من اعتماد جميع الرسومات من مهندس مسجل." },
      ],
      caseStudy: null,
      whyChooseUs: ["خبرة 8 سنوات في الموافقات", "فريق متخصص من المهندسين"],
      faqs: [
        { question: "ما هي موافقة ${slug.replace(/-/g, " ")}؟", answer: "هي موافقة مطلوبة من السلطة المختصة في دبي." },
        { question: "كم من الوقت تستغرق موافقة ${slug.replace(/-/g, " ")}؟", answer: "تستغرق عادة 5-10 أيام عمل." },
        { question: "ما هي المستندات المطلوبة لموافقة ${slug.replace(/-/g, " ")}؟", answer: "تختلف المستندات حسب نوع المشروع." },
      ],
    },
  }`
    )
    .join(",\n\n");

  return `/**
 * Arabic approval data — Stub file.
 * All Arabic strings are placeholders. Replace with DeepSeek-localized content.
 *
 * @see src/data/approvals.ts for English source
 * @see plans/arabic-market-domination-reconciled-plan.md §0.2
 */

import type { ApprovalData } from "@/types";

export const approvals: ApprovalData[] = [
${entries},
];
`;
}

/* ── Generate guide stub ────────────────────────────────── */

function generateGuidesStub(slugs) {
  const entries = slugs
    .map(
      (slug) => `  {
    slug: "${slug}",
    ar: {
      slug: "دليل-${slug}",
      title: "دليل ${slug.replace(/-/g, " ")}",
      description: "دليل شامل حول ${slug.replace(/-/g, " ")} في دبي",
      primaryKeyword: "دليل ${slug.replace(/-/g, " ")} دبي",
      secondaryKeywords: ["${slug.replace(/-/g, " ")}", "دليل ${slug.replace(/-/g, " ")}"],
      question: "ما هو ${slug.replace(/-/g, " ")} في دبي؟",
      answer: "${slug.replace(/-/g, " ")} هو إجراء مهم في دبي. إليك دليل شامل حول هذا الموضوع.",
      content: [
        "هذا دليل شامل حول ${slug.replace(/-/g, " ")} في دبي.",
        "نقدم لك جميع المعلومات التي تحتاجها.",
      ],
    },
  }`
    )
    .join(",\n\n");

  return `/**
 * Arabic guide data — Stub file.
 * All Arabic strings are placeholders. Replace with DeepSeek-localized content.
 *
 * @see src/data/guides.ts for English source
 * @see plans/arabic-market-domination-reconciled-plan.md §0.2
 */

import type { GuideData } from "@/types";

export const guides: GuideData[] = [
${entries},
];
`;
}

/* ── Generate service stub ──────────────────────────────── */

function generateServicesStub(slugs) {
  const entries = slugs
    .map(
      (slug) => `  {
    slug: "${slug}",
    ar: {
      slug: "خدمة-${slug}",
      name: "خدمة ${slug.replace(/-/g, " ")}",
      tagline: "خدمة ${slug.replace(/-/g, " ")} احترافية في دبي",
      primaryKeyword: "خدمة ${slug.replace(/-/g, " ")} دبي",
      secondaryKeywords: ["${slug.replace(/-/g, " ")}", "خدمة ${slug.replace(/-/g, " ")}"],
      directAnswer: "نقدم خدمة ${slug.replace(/-/g, " ")} احترافية في دبي.",
      description: "وصف تفصيلي لخدمة ${slug.replace(/-/g, " ")} التي نقدمها في دبي.",
      features: ["ميزة 1", "ميزة 2", "ميزة 3"],
      process: [
        { step: 1, title: "استشارة أولية", description: "نناقش متطلبات مشروعك." },
        { step: 2, title: "تقديم الخدمة", description: "نقدم الخدمة حسب متطلباتك." },
        { step: 3, title: "التسليم", description: "نسلمك النتيجة النهائية." },
      ],
      faqs: [
        { question: "ما هي خدمة ${slug.replace(/-/g, " ")}؟", answer: "هي خدمة متخصصة نقدمها في دبي." },
        { question: "كم تكلفة خدمة ${slug.replace(/-/g, " ")}؟", answer: "تختلف التكلفة حسب نطاق العمل." },
      ],
    },
  }`
    )
    .join(",\n\n");

  return `/**
 * Arabic service data — Stub file.
 * All Arabic strings are placeholders. Replace with DeepSeek-localized content.
 *
 * @see src/data/services.ts for English source
 * @see plans/arabic-market-domination-reconciled-plan.md §0.2
 */

import type { ServiceData } from "@/types";

export const services: ServiceData[] = [
${entries},
];
`;
}

/* ── Main ───────────────────────────────────────────────── */

function main() {
  const approvalSlugs = extractDatasetSlugs(path.join(DATA_DIR, "approvals.ts"));
  const guideSlugs = extractDatasetSlugs(path.join(DATA_DIR, "guides.ts"));
  const serviceSlugs = extractDatasetSlugs(path.join(DATA_DIR, "services.ts"));

  console.log(`Found ${approvalSlugs.length} approval slugs`);
  console.log(`Found ${guideSlugs.length} guide slugs`);
  console.log(`Found ${serviceSlugs.length} service slugs`);

  // Write approvals-ar.ts
  fs.writeFileSync(
    path.join(DATA_DIR, "approvals-ar.ts"),
    generateApprovalsStub(approvalSlugs),
    "utf-8"
  );
  console.log("✅ Created src/data/approvals-ar.ts");

  // Write guides-ar.ts
  fs.writeFileSync(
    path.join(DATA_DIR, "guides-ar.ts"),
    generateGuidesStub(guideSlugs),
    "utf-8"
  );
  console.log("✅ Created src/data/guides-ar.ts");

  // Write services-ar.ts
  fs.writeFileSync(
    path.join(DATA_DIR, "services-ar.ts"),
    generateServicesStub(serviceSlugs),
    "utf-8"
  );
  console.log("✅ Created src/data/services-ar.ts");

  console.log("\nDone! Stub Arabic data files created.");
}

main();

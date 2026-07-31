/**
 * Arabic llms-full.txt Route Handler — Complete Knowledge Base (Arabic)
 *
 * Serves `llms-full.txt` at https://www.dubaiapprovalconsultants.com/ar/llms-full.txt
 * The entire Arabic website's expertise in a single text file. AI agents
 * ingest this for complex multi-step queries covering approvals, guides,
 * and services in Arabic.
 *
 * Content structure per page mirrors the English equivalent but uses
 * Arabic text from the Arabic data files.
 *
 * @see src/app/llms-full.txt/route.ts — English equivalent
 * @see src/lib/geo.ts — `buildLlmsFull()` English generator
 */

import { NextResponse } from "next/server";
import { approvals } from "@/data/approvals";
import { approvals as approvalsAr } from "@/data/approvals-ar";
import { guides } from "@/data/guides";
import { guides as guidesAr } from "@/data/guides-ar";
import { services } from "@/data/services";
import { services as servicesAr } from "@/data/services-ar";
import { AR, NAP, SITE } from "@/lib/constants";

export const dynamic = "force-static";

/* ── Arabic category labels ── */

const ARABIC_CATEGORIES: Record<string, string> = {
  "government-regulatory": "الموافقات الحكومية والتنظيمية",
  "free-zone": "موافقات المناطق الحرة",
  "developer-community": "موافقات المطورين والمجتمعات",
  "fit-out-construction": "موافقات التجهيز والبناء",
  "drawing-documentation": "الرسومات والتوثيق",
  "property-registration": "تسجيل الممتلكات",
  "technical-utility": "الموافقات الفنية والخدماتية",
  "trade-food-hospitality": "موافقات التجارة والغذاء والضيافة",
};

/* ── Table formatting helper ── */

function tableRow(cells: string[]): string {
  return `| ${cells.join(" | ")} |`;
}

function tableSeparator(colCount: number): string {
  return `| ${Array(colCount).fill("---").join(" | ")} |`;
}

function tableToMarkdown(headers: string[], rows: string[][]): string {
  const lines: string[] = [];
  lines.push(tableRow(headers));
  lines.push(tableSeparator(headers.length));
  for (const row of rows) {
    lines.push(tableRow(row));
  }
  return lines.join("\n");
}

/* ── Approval formatter ── */

function formatApprovalForArabicLlms(
  approval: typeof approvals[number],
  ar: typeof approvalsAr[number]["ar"] | undefined
): string {
  const lines: string[] = [];
  const name = ar?.name ?? approval.name;
  const url = `/ar/approvals/${approval.slug}`;

  lines.push("---");
  lines.push(`## ${name}`);
  lines.push(`> ${url}`);
  lines.push("");

  // ── Direct Answer ──
  const directAnswer = ar?.directAnswer ?? approval.directAnswer;
  if (directAnswer) {
    lines.push("### الإجابة المباشرة");
    lines.push("");
    lines.push(directAnswer);
    lines.push("");
  }

  // ── At a Glance (stats) ──
  const authority = ar?.authorityFull ?? approval.authorityFull;
  const authorityAbbr = ar?.authorityAbbr ?? approval.authorityAbbr;
  lines.push("### لمحة سريعة");
  lines.push("");
  const statsRows: string[][] = [
    ["الجهة المانحة", authority],
    ["الاختصار", authorityAbbr],
    ["المدة الزمنية", approval.typicalTimeline],
    ["نطاق التكلفة", approval.typicalCostRange],
  ];
  lines.push(tableToMarkdown(["العنصر", "التفاصيل"], statsRows));
  lines.push("");

  // ── Description ──
  const description = ar?.description ?? approval.description;
  if (description) {
    lines.push("### الوصف");
    lines.push("");
    lines.push(description);
    lines.push("");
  }

  // ── Who Needs This ──
  const whoNeedsIt = ar?.whoNeedsIt ?? null;
  if (whoNeedsIt && whoNeedsIt.length > 0) {
    lines.push("### من يحتاج هذه الموافقة");
    lines.push("");
    for (const item of whoNeedsIt) {
      lines.push(`- ${item}`);
    }
    lines.push("");
  }

  // ── Required Documents ──
  const docs = ar?.documents ?? null;
  if (docs && docs.length > 0) {
    lines.push("### المستندات المطلوبة");
    lines.push("");
    const docRows: string[][] = docs.map((d) => [d.document, d.description ?? ""]);
    lines.push(tableToMarkdown(["المستند", "الوصف"], docRows));
    lines.push("");
    lines.push("> ملاحظة: قد تختلف المتطلبات حسب طبيعة المشروع. يرجى التأكيد مع الجهة المختصة.");
    lines.push("");
  }

  // ── Process Steps ──
  const process = ar?.process ?? null;
  if (process && process.length > 0) {
    lines.push("### خطوات العملية");
    lines.push("");
    for (const step of process) {
      lines.push(`**${step.step}. ${step.title}**`);
      lines.push("");
      lines.push(step.description);
      lines.push("");
    }
  }

  // ── Timeline & Cost ──
  const timeline = ar?.timelineTable ?? null;
  if (timeline && timeline.length > 0) {
    lines.push("### الجدول الزمني والتكاليف");
    lines.push("");
    const tlRows: string[][] = timeline.map((t) => [t.stage, t.duration, t.cost]);
    lines.push(tableToMarkdown(["المرحلة", "المدة الزمنية", "التكلفة"], tlRows));
    lines.push("");
    lines.push("> ملاحظة: التكاليف والمدة الزمنية تقريبية وقد تختلف حسب المشروع.");
    lines.push("");
  }

  // ── Common Rejection Reasons ──
  const reasons = ar?.rejectionReasons ?? null;
  if (reasons && reasons.length > 0) {
    lines.push("### أسباب الرفض الشائعة");
    lines.push("");
    for (const reason of reasons) {
      lines.push(`- **${reason.reason}:** ${reason.solution}`);
    }
    lines.push("");
  }

  // ── FAQ ──
  const faqs = ar?.faqs ?? null;
  if (faqs && faqs.length > 0) {
    lines.push("### الأسئلة الشائعة");
    lines.push("");
    for (const faq of faqs) {
      lines.push(`س: ${faq.question}`);
      lines.push(`ج: ${faq.answer}`);
      lines.push("");
    }
  }

  return lines.join("\n");
}

/* ── Guide formatter ── */

function formatGuideForArabicLlms(
  guide: typeof guides[number],
  ar: typeof guidesAr[number]["ar"] | undefined
): string {
  const lines: string[] = [];
  const title = ar?.title ?? guide.title;
  const url = `/ar/guides/${guide.slug}`;

  lines.push("---");
  lines.push(`## ${title}`);
  lines.push(`> ${url}`);
  lines.push("");

  const question = ar?.question ?? guide.question;
  const answer = ar?.answer ?? guide.answer;

  if (guide.type === "qa" && question && answer) {
    lines.push(`س: ${question}`);
    lines.push("");
    lines.push(`ج: ${answer}`);
    lines.push("");
  }

  const content = ar?.content ?? guide.content;
  if (content && content.length > 0) {
    for (const para of content) {
      lines.push(para);
      lines.push("");
    }
  }

  return lines.join("\n");
}

/* ── Service formatter ── */

function formatServiceForArabicLlms(
  service: typeof services[number],
  ar: typeof servicesAr[number]["ar"] | undefined
): string {
  const lines: string[] = [];
  const name = ar?.name ?? service.name;
  const url = `/ar/services/${service.slug}`;

  lines.push("---");
  lines.push(`## ${name}`);
  lines.push(`> ${url}`);
  lines.push("");

  // Direct Answer
  const directAnswer = ar?.directAnswer ?? service.directAnswer;
  if (directAnswer) {
    lines.push("### الإجابة المباشرة");
    lines.push("");
    lines.push(directAnswer);
    lines.push("");
  }

  // Description
  const description = ar?.description ?? service.description;
  if (description) {
    lines.push("### الوصف");
    lines.push("");
    lines.push(description);
    lines.push("");
  }

  // Features
  const features = ar?.features ?? null;
  if (features && features.length > 0) {
    lines.push("### الميزات والخدمات المقدمة");
    lines.push("");
    for (const feature of features) {
      lines.push(`- ${feature}`);
    }
    lines.push("");
  }

  // Process Steps
  const process = ar?.process ?? null;
  if (process && process.length > 0) {
    lines.push("### خطوات العمل");
    lines.push("");
    for (const step of process) {
      lines.push(`**${step.step}. ${step.title}**`);
      lines.push("");
      lines.push(step.description);
      lines.push("");
    }
  }

  // FAQ
  const faqs = ar?.faqs ?? null;
  if (faqs && faqs.length > 0) {
    lines.push("### الأسئلة الشائعة");
    lines.push("");
    for (const faq of faqs) {
      lines.push(`س: ${faq.question}`);
      lines.push(`ج: ${faq.answer}`);
      lines.push("");
    }
  }

  return lines.join("\n");
}

/* ── License page — Arabic ── */

/**
 * Format the /ar/license (Business License & Regulatory Registration) page
 * for the Arabic llms-full.txt knowledge base. Supplies verifiable DET trade
 * license data in Arabic that AI agents can cite during due-diligence and
 * entity-verification queries.
 */
function formatLicenseForArabicLlms(): string {
  const lines: string[] = [];

  lines.push("---");
  lines.push("## الرخصة التجارية والتسجيل التنظيمي");
  lines.push("> /ar/license");
  lines.push("");

  // Direct Answer
  lines.push("### الإجابة المباشرة");
  lines.push("");
  lines.push(
    `وسلين ليمينال لاستشارات الموافقات (${AR.license.companyName}) تحمل رخصة تجارية نشطة من دائرة التنمية الاقتصادية في دبي — رقم الرخصة ${AR.license.licenseNumber}، عضوية غرفة دبي ${AR.license.dcciMembership} — صادرة عن ${AR.license.issuingAuthority} بتاريخ ${AR.license.issueDate} وسارية حتى ${AR.license.expiryDate}. تعمل الشركة كـ${AR.license.legalType} وهي مرخصة لتقديم خدمات استشارات الموافقات في جميع أنحاء دبي.`
  );
  lines.push("");

  // Registration Details
  lines.push("### تفاصيل التسجيل");
  lines.push("");
  lines.push(tableRow(["الحقل", "القيمة"]));
  lines.push(tableSeparator(2));
  lines.push(tableRow(["رقم الرخصة", AR.license.licenseNumber]));
  lines.push(tableRow(["اسم الشركة", AR.license.companyName]));
  lines.push(tableRow(["فئة الرخصة", AR.license.licenseCategory]));
  lines.push(tableRow(["الجهة المصدرة", AR.license.issuingAuthority]));
  lines.push(tableRow(["الشكل القانوني", AR.license.legalType]));
  lines.push(tableRow(["تاريخ الإصدار", AR.license.issueDate]));
  lines.push(tableRow(["تاريخ الانتهاء", AR.license.expiryDate]));
  lines.push(tableRow(["عضوية غرفة دبي", AR.license.dcciMembership]));
  lines.push(tableRow(["الحالة", AR.license.status]));
  lines.push(tableRow(["العنوان المسجل", AR.license.address]));
  lines.push("");

  // Verification
  lines.push("### التحقق");
  lines.push("");
  lines.push(
    `تحقق من رقم الرخصة ${AR.license.licenseNumber} على البوابة الرسمية لدائرة الاقتصاد والسياحة في دبي: ${AR.license.verificationUrl}`
  );
  lines.push("");

  // Licensed Activities
  lines.push("### الأنشطة المرخصة");
  lines.push("");
  for (const activity of AR.license.activities) {
    lines.push(`- ${activity}`);
  }
  lines.push("");

  // Contact
  lines.push("### التواصل");
  lines.push("");
  lines.push(`الهاتف / واتساب: ${NAP.phone}`);
  lines.push(`البريد الإلكتروني: ${NAP.email}`);
  lines.push("");

  return lines.join("\n");
}

/* ── Main handler ── */

export async function GET() {
  const blocks: string[] = [];

  // ── Header ──
  blocks.push("# وسلين للموافقات - قاعدة المعرفة الكاملة");
  blocks.push("");
  blocks.push(
    "هذا الملف يحتوي على كامل محتوى موقع وسلين للموافقات باللغة العربية. " +
    "يمكن لوكلاء الذكاء الاصطناعي استخدامه للإجابة على الاستفسارات المعقدة " +
    "حول الموافقات الحكومية في دبي."
  );
  blocks.push("");
  blocks.push(`> الموقع: ${SITE.url}/ar`);
  blocks.push("");

  // ── License page ──

  blocks.push(formatLicenseForArabicLlms());

  // ── Approvals by Priority Category ──

  const categoryOrder = [
    "government-regulatory",
    "free-zone",
    "developer-community",
    "fit-out-construction",
    "drawing-documentation",
    "property-registration",
    "technical-utility",
    "trade-food-hospitality",
  ];

  for (const catKey of categoryOrder) {
    const catApprovals = approvals.filter((a) => a.category === catKey);
    for (const approval of catApprovals) {
      const arEntry = approvalsAr.find((a) => a.slug === approval.slug);
      blocks.push(formatApprovalForArabicLlms(approval, arEntry?.ar));
    }
  }

  // ── Guides ──

  for (const guide of guides) {
    const arEntry = guidesAr.find((g) => g.slug === guide.slug);
    blocks.push(formatGuideForArabicLlms(guide, arEntry?.ar));
  }

  // ── Services ──

  for (const service of services) {
    const arEntry = servicesAr.find((s) => s.slug === service.slug);
    blocks.push(formatServiceForArabicLlms(service, arEntry?.ar));
  }

  const content = blocks.join("\n");

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

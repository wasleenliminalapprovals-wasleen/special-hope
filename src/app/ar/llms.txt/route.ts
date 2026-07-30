/**
 * Arabic llms.txt Route Handler — AI Manifest Index (Arabic)
 *
 * Serves `llms.txt` at https://www.dubaiapprovalconsultants.com/ar/llms.txt
 * A plain-text markdown index of all Arabic pages organized by category.
 * AI search engines fetching Arabic content will discover the Arabic site
 * structure here.
 *
 * @see src/app/llms.txt/route.ts — English equivalent
 */

import { NextResponse } from "next/server";
import { approvals } from "@/data/approvals";
import { approvals as approvalsAr } from "@/data/approvals-ar";
import { guides } from "@/data/guides";
import { guides as guidesAr } from "@/data/guides-ar";
import { services } from "@/data/services";
import { services as servicesAr } from "@/data/services-ar";
import { AR } from "@/lib/constants";

export const dynamic = "force-static";

/**
 * Map English category keys to Arabic labels.
 */
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

export async function GET() {
  const lines: string[] = [];

  // Header
  lines.push("# وسلين للموافقات - دليل المحتوى العربي");
  lines.push("");
  lines.push(
    "> شركة استشارات هندسية متخصصة في الحصول على الموافقات الحكومية والجهات الرسمية " +
    "للمشاريع التجارية والسكنية في دبي، الإمارات العربية المتحدة."
  );
  lines.push("");

  // ── About / Contact Info (Arabic) ──

  lines.push("## عن الشركة");
  lines.push("");
  lines.push(
    "وسلين ليمينال لاستشارات الموافقات (الاسم التجاري: وسلين للموافقات) تساعد " +
    "أصحاب العقارات والمقاولين والشركات في الحصول على جميع الموافقات الحكومية " +
    "والجهات الرسمية للمشاريع التجارية والسكنية في دبي."
  );
  lines.push("");
  lines.push("- **الهاتف:** +971542330837");
  lines.push("- **واتساب:** +971542330837");
  lines.push("- **البريد الإلكتروني:** approvals@wasleen.com");
  lines.push("- **العنوان:** مكتب 401، مبنى درويش، القصيص، دبي، الإمارات العربية المتحدة");
  lines.push("- **منطقة الخدمة:** دبي، الإمارات العربية المتحدة");
  lines.push("- **ساعات العمل:** الأحد — الخميس، ٩:٠٠ صباحاً — ٦:٠٠ مساءً (بتوقيت الخليج)");
  lines.push("");

  // ── Approval Categories ──

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
    if (catApprovals.length === 0) continue;

    const arLabel = ARABIC_CATEGORIES[catKey] ?? catKey;
    lines.push(`## ${arLabel} — ${catApprovals.length} صفحة`);
    lines.push("");

    for (const approval of catApprovals) {
      const arEntry = approvalsAr.find((a) => a.slug === approval.slug);
      const arName = arEntry?.ar?.name ?? approval.name;
      const arDirect = arEntry?.ar?.directAnswer ?? approval.directAnswer;
      const oneLiner = arDirect
        ? arDirect.split(".")[0].trim() + "."
        : `${approval.authorityAbbr} - ${approval.shortName}.`;

      lines.push(
        `- [${arName}](/ar/approvals/${approval.slug}): ${oneLiner} المدة الزمنية: ${approval.typicalTimeline}.`
      );
    }
    lines.push("");
  }

  // ── Guide / Q&A Pages ──

  lines.push(`## صفحات الدليل والأسئلة — ${guides.length} صفحة`);
  lines.push("");

  for (const guide of guides) {
    const arEntry = guidesAr.find((g) => g.slug === guide.slug);
    const arTitle = arEntry?.ar?.title ?? guide.title;
    const arDesc = arEntry?.ar?.description ?? guide.description;
    const snippet = arDesc.split(".")[0].trim() + ".";
    lines.push(
      `- [${arTitle}](/ar/guides/${guide.slug}): ${snippet}`
    );
  }
  lines.push("");

  // ── Service Pages ──

  lines.push(`## صفحات الخدمات — ${services.length} صفحة`);
  lines.push("");

  for (const service of services) {
    const arEntry = servicesAr.find((s) => s.slug === service.slug);
    const arName = arEntry?.ar?.name ?? service.name;
    const arTagline = arEntry?.ar?.tagline ?? service.tagline;
    const snippet = arTagline || (arEntry?.ar?.directAnswer ?? service.directAnswer)?.split(".")[0].trim() + ".";
    lines.push(
      `- [${arName}](/ar/services/${service.slug}): ${snippet}`
    );
  }
  lines.push("");

  // ── Information Pages ──

  lines.push("## صفحات المعلومات");
  lines.push("");
  lines.push(`- [${AR.nav.aboutUs}](/ar/about-us)`);
  lines.push(`- [${AR.nav.contactUs}](/ar/contact-us)`);
  lines.push(`- [${AR.nav.approvals}](/ar/approvals)`);
  lines.push(`- [${AR.nav.guides}](/ar/guides)`);
  lines.push(`- [${AR.nav.services}](/ar/services)`);
  lines.push("");

  // ── Full Knowledge Base (Arabic llms-full.txt) ──

  const totalApprovals = approvals.length;
  const totalGuides = guides.length;
  const totalServices = services.length;
  const totalPages = totalApprovals + totalGuides + totalServices;

  lines.push("## قاعدة المعرفة الكاملة");
  lines.push("");
  lines.push(
    "للحصول على محتوى كامل يشمل قوائم المستندات وخطوات العملية " +
    "وجداول الوقت والتكاليف وأسباب الرفض والأسئلة الشائعة لكل موافقة ودليل وخدمة:"
  );
  lines.push("");
  lines.push(
    `- [llms-full.txt (عربي)](/ar/llms-full.txt) — قاعدة المعرفة الكاملة ` +
    `تحتوي على جميع ${totalApprovals} الموافقات و ${totalGuides} الأدلة ` +
    `و ${totalServices} الخدمات (إجمالي ${totalPages} صفحة). منظمة مع الإجابة ` +
    `المباشرة، إحصائيات سريعة، جداول المستندات المطلوبة، خطوات العملية، ` +
    `جدول الوقت والتكاليف، أسباب الرفض، والأسئلة الشائعة لكل صفحة.`
  );
  lines.push(
    `- [llms-full.txt (إنجليزي)](/llms-full.txt) — النسخة الإنجليزية من قاعدة ` +
    `المعرفة الكاملة.`
  );
  lines.push("");

  // ── Internal Resources (Arabic) ──

  lines.push("## داخلي");
  lines.push("");
  lines.push("الموارد التالية مخصصة لاستخدام وكلاء الذكاء الاصطناعي والمرجع الداخلي:");
  lines.push("");
  lines.push(`- [llms-full.txt (عربي)](/ar/llms-full.txt) — قاعدة المعرفة الكاملة (${totalPages} صفحة، محتوى منظم مع جداول وقوائم)`);
  lines.push(`- [خريطة الموقع (الرئيسية)](/sitemap/1.xml) — الصفحات الأساسية: الرئيسية، من نحن، اتصل بنا، الصفحات الدليلية (إنجليزي + عربي)`);
  lines.push(`- [خريطة الموقع (الخدمات)](/sitemap/2.xml) — صفحات الخدمات: ${totalApprovals} موافقة + ${totalServices} خدمة (إنجليزي + عربي)`);
  lines.push(`- [خريطة الموقع (الأدلة)](/sitemap/3.xml) — صفحات الأدلة: ${totalGuides} دليل (إنجليزي + عربي)`);
  lines.push("");

  const content = lines.join("\n");

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

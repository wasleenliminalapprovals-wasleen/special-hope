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
import { loadPseoArabicEntries } from "@/lib/pseo-data";

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

  // ── pSEO Pages (Arabic) ──

  const pseoArEntries = loadPseoArabicEntries();
  if (pseoArEntries.length > 0) {
    lines.push(`## صفحات البرمجة SEO — ${pseoArEntries.length} صفحة`);
    lines.push("");

    for (const entry of pseoArEntries) {
      const ar = entry.ar;
      const snippet = (ar.metaDescription || ar.directAnswer || "")
        .split(".")[0].trim() + ".";
      lines.push(
        `- [${ar.title}](/ar/guides/${entry.slug}): ${snippet}`
      );
    }
    lines.push("");
  }

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
  lines.push(
    `- [الرخصة التجارية والتسجيل التنظيمي](/ar/license): ${AR.license.companyName} — رخصة تجارية من دائرة التنمية الاقتصادية رقم ${AR.license.licenseNumber} (عضوية غرفة دبي ${AR.license.dcciMembership})، سارية حتى ${AR.license.expiryDate}.`
  );
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

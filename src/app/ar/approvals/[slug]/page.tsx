/**
 * Arabic Approval Page — /ar/approvals/{slug}
 *
 * Full Arabic template mirroring the English approval page structure:
 * - 13 content sections with Arabic localized text from approvals-ar.ts
 * - Full JSON-LD schema stack using approvalSchemaStack("ar")
 * - Arabic breadcrumbs, CTAs, internal links with /ar/ paths
 * - Inline RelatedApprovals/RelatedGuides with RTL-aware ArrowLeft icons
 * - CTASectionArabic client component for interactive CTA
 *
 * Data source: English approvals.ts (for stats, category, relatedSlugs, etc.)
 *             + approvals-ar.ts (for Arabic text content)
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, DollarSign, Shield, BookOpen, ArrowLeft } from "lucide-react";
import { approvals } from "@/data/approvals";
import { approvals as approvalsAr } from "@/data/approvals-ar";
import { guides } from "@/data/guides";
import { guides as guidesAr } from "@/data/guides-ar";
import { SITE, AR } from "@/lib/constants";
import { hreflangAlternates } from "@/lib/locale";
import { approvalSchemaStack } from "@/lib/schema";
import { renderDescription } from "@/lib/content";
import { APPROVAL_CATEGORIES } from "@/types";

/* ── Section Components ─────────────────────────────────── */
import StatsStrip from "@/components/sections/StatsStrip";
import DocumentsTable from "@/components/sections/DocumentsTable";
import TimelineCostTable from "@/components/sections/TimelineCostTable";
import ProcessStepsBlock from "@/components/sections/ProcessStepsBlock";
import RejectionReasons from "@/components/sections/RejectionReasons";
import CaseStudyBlock from "@/components/sections/CaseStudyBlock";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import FAQBlock from "@/components/sections/FAQBlock";
import Badge from "@/components/ui/Badge";
import CTASectionArabic from "@/components/sections/CTASectionArabic";
import FramedImage from "@/components/sections/FramedImage";

interface Props {
  params: Promise<{ slug: string }>;
}

/* ============================================================
   Static Generation
   ============================================================ */

/** Generate all 52 Arabic approval pages at build time */
export async function generateStaticParams() {
  return approvals.map((approval) => ({ slug: approval.slug }));
}

/* ============================================================
   Dynamic Metadata
   ============================================================ */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const approval = approvals.find((a) => a.slug === slug);
  const arEntry = approvalsAr.find((a) => a.slug === slug);
  if (!approval || !arEntry) return {};

  const ar = arEntry.ar;
  const seoTitle = `${ar.primaryKeyword} | ${AR.siteShortName}`.substring(0, 60);
  const truncateMeta = (text: string, max = 160): string => {
    if (text.length <= max) return text;
    const truncated = text.substring(0, max - 3);
    const lastSpace = truncated.lastIndexOf(' ');
    return (lastSpace > 0 ? text.substring(0, lastSpace) : truncated) + '...';
  };
  const description = truncateMeta(ar.directAnswer);
  const canonical = `${SITE.url}/ar/approvals/${slug}`;

  // Dedicated OG image for every approval page; the Quality & Safety Certificate
  // cluster (Law No. 3 of 2026) keeps its own specialist image
  const qscCluster = slug === "dubai-building-quality-safety-certificate";
  const ogImage = qscCluster
    ? {
        url: "/images/og-building-quality-safety-certificate-v3.jpg",
        width: 1200,
        height: 630,
        alt: "شهادة جودة وسلامة المباني في دبي — القانون رقم (3) لسنة 2026",
      }
    : {
        url: "/images/OG%20Image%202.jpg",
        width: 1200,
        height: 630,
        alt: ar.name,
      };

  return {
    title: seoTitle,
    description,
    alternates: { canonical, languages: hreflangAlternates(SITE.url, `/ar/approvals/${slug}`) },
    openGraph: {
      title: seoTitle,
      description: description.substring(0, 160),
      url: canonical,
      type: "website",
      siteName: SITE.name,
      locale: "ar_AE",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: description.substring(0, 160),
      images: [ogImage.url],
    },
  };
}

/* ============================================================
   Helpers
   ============================================================ */

function getCategoryLabel(slug: string): string {
  const cat = APPROVAL_CATEGORIES.find((c) => c.value === slug);
  return cat?.label ?? slug;
}

function getArabicCategoryLabel(slug: string): string {
  const key = slug as keyof typeof AR.categories;
  return AR.categories[key] ?? slug;
}

/* ============================================================
   Page Component
   ============================================================ */

export default async function ArabicApprovalPage({ params }: Props) {
  const { slug } = await params;
  const approval = approvals.find((a) => a.slug === slug);
  const arEntry = approvalsAr.find((a) => a.slug === slug);
  if (!approval || !arEntry) notFound();

  const ar = arEntry.ar;
  const canonical = `${SITE.url}/ar/approvals/${slug}`;

  /* ── Compute related guides dynamically ────────────────── */
  const relatedGuideSlugs = guides
    .filter((g) => g.parentApprovalSlug === approval.slug)
    .map((g) => g.slug);

  /* ── Schema (Arabic locale) ────────────────────────────── */
  const schemas = approvalSchemaStack(
    {
      url: canonical,
      title: `${ar.primaryKeyword} | ${AR.siteShortName}`,
      description: ar.directAnswer.substring(0, 160),
      serviceName: ar.name,
      serviceDescription: ar.directAnswer,
      serviceCategory: getCategoryLabel(approval.category),
      faqs: ar.faqs,
      howToSteps: ar.process,
      breadcrumbs: [
        { position: 1, name: AR.breadcrumb.home, slug: "/ar" },
        { position: 2, name: AR.breadcrumb.approvals, slug: "/ar/approvals" },
        { position: 3, name: ar.name, slug: `/ar/approvals/${slug}` },
      ],
      dateModified: approval.lastUpdated,
    },
    "ar",
  );

  /* ── Related approvals (from English structural data, linked with /ar/) ── */
  const relatedApprovals = (approval.relatedSlugs || [])
    .map((s) => {
      const en = approvals.find((a) => a.slug === s);
      const arRel = approvalsAr.find((a) => a.slug === s);
      if (!en || !arRel) return null;
      return { slug: en.slug, shortName: arRel.ar.shortName };
    })
    .filter(Boolean) as { slug: string; shortName: string }[];

  /* ── Related guides (from English structural data, linked with /ar/) ── */
  const relatedGuideEntries = relatedGuideSlugs
    .map((s) => {
      const g = guides.find((g) => g.slug === s);
      const gAr = guidesAr.find((g) => g.slug === s);
      if (!g || !gAr) return null;
      return { slug: g.slug, title: gAr.ar.title, type: g.type };
    })
    .filter(Boolean) as { slug: string; title: string; type: string }[];

  /* ── Category-specific CTA text (Arabic) ───────────────── */
  const ctaTexts: Record<string, string> = {
    "dubai-municipality": `تفاصيل ${ar.shortName}`,
    "dubai-civil-defense": `تفاصيل ${ar.shortName}`,
    rta: `تفاصيل ${ar.shortName}`,
    dewa: `تفاصيل ${ar.shortName}`,
    emaar: `تفاصيل ${ar.shortName}`,
    nakheel: `تفاصيل ${ar.shortName}`,
    dmcc: `تفاصيل ${ar.shortName}`,
    tecom: `تفاصيل ${ar.shortName}`,
    jebel: `تفاصيل ${ar.shortName}`,
    default: "عرض تفاصيل الموافقة",
  };

  function getCta(s: string): string {
    for (const [key, text] of Object.entries(ctaTexts)) {
      if (s.includes(key)) return text;
    }
    return ctaTexts.default;
  }

  /* ── Render ────────────────────────────────────────────── */

  return (
    <>
      {/* JSON-LD Schema */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ============================================================
          SECTION 1 — Hero / Direct Answer Block (Arabic)
          ============================================================ */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-16">
          {/* Breadcrumbs (visible for UX) */}
          <nav aria-label="مسار التنقل" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-caption text-body-text/80">
              <li>
                <Link href="/ar" className="hover:text-link-blue transition-colors">{AR.breadcrumb.home}</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/ar/approvals" className="hover:text-link-blue transition-colors">{AR.breadcrumb.approvals}</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-body-text font-medium truncate max-w-[200px]" aria-current="page">
                {ar.name}
              </li>
            </ol>
          </nav>

          {/* Category badge */}
          <Badge variant="default" className="mb-4">
            {getArabicCategoryLabel(approval.category)}
          </Badge>

          {/* H1 — Primary keyword */}
          <h1 className="text-h1 font-montserrat text-heading-text mb-4 max-w-4xl">
            {ar.primaryKeyword}
          </h1>

          {/* Direct Answer Block — self-contained, quotable by AI */}
          <p className="text-body-lg text-body-text max-w-4xl leading-relaxed mb-6">
            {ar.directAnswer}
          </p>

          {/* Quick info badges */}
          <div className="flex flex-wrap gap-4 text-body-sm text-body-text/70">
            <span className="inline-flex items-center gap-1.5">
              <Clock size={16} strokeWidth={1.75} />
              المدة التقريبية: <strong className="text-body-text">{ar.typicalTimeline}</strong>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <DollarSign size={16} strokeWidth={1.75} />
              التكلفة التقريبية: <strong className="text-body-text">{ar.typicalCostRange}</strong>
            </span>
          </div>

          {/* Hero image (optional — approval.images[0], above-the-fold priority) */}
          {approval.images?.[0] && (
            <div className="mt-8 max-w-4xl">
              <FramedImage image={approval.images[0]} priority />
            </div>
          )}
        </div>
      </section>

      {/* ============================================================
          SECTION 2 — At-a-Glance Stats Strip
          ============================================================ */}
      <StatsStrip stats={ar.stats} />

      {/* ============================================================
          SECTION 3 — What Is This Approval? (Arabic)
          ============================================================ */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 font-montserrat text-heading-text mb-4">
              ما هي {ar.shortName}؟
            </h2>
            <div
              className="text-body text-body-text leading-relaxed"
              dangerouslySetInnerHTML={{ __html: renderDescription(ar.description) }}
            />
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4 — Who Needs This? (Arabic)
          ============================================================ */}
      <section className="bg-light-bg">
        <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 font-montserrat text-heading-text mb-4">
              من يحتاج {ar.shortName}؟
            </h2>
            <p className="text-body-lg text-body-text mb-6 max-w-3xl">
              {ar.name} مطلوبة للأفراد والجهات التالية:
            </p>
            <ul className="space-y-3">
              {ar.whoNeedsIt.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-body text-body-text">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-card-bg text-brand-blue text-caption font-bold shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Optional second topical image (approval.images[1], mid-body) */}
      {approval.images?.[1] && (
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
            <div className="max-w-4xl mx-auto">
              <FramedImage image={approval.images[1]} />
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 5 — Documents & Requirements Table (Arabic)
          ============================================================ */}
      <DocumentsTable
        documents={ar.documents}
        disclaimer="قد تختلف المتطلبات حسب نطاق المشروع وتحديثات الجهة المختصة. يُرجى التأكد من قائمة المستندات الحالية مع الجهة المصدرة أو استشارة فريقنا."
      />

      {/* ============================================================
          SECTION 6 — Step-by-Step Process (Arabic)
          ============================================================ */}
      <ProcessStepsBlock steps={ar.process} />

      {/* ============================================================
          SECTION 7 — Timeline & Cost Breakdown (Arabic)
          ============================================================ */}
      <TimelineCostTable
        entries={ar.timelineTable}
        disclaimer="المدد والتكاليف تقريبية وقد تختلف حسب تعقيد المشروع وجاهزية المستندات وعبء عمل الجهة المختصة. اتصل بنا للحصول على تقييم شخصي."
      />

      {/* ============================================================
          SECTION 8 — Common Rejection Reasons (Arabic)
          ============================================================ */}
      <RejectionReasons reasons={ar.rejectionReasons} />

      {/* ============================================================
          SECTION 9 — Real Project Example / Case Study (Arabic)
          ============================================================ */}
      {ar.caseStudy && <CaseStudyBlock study={ar.caseStudy} />}

      {/* ============================================================
          SECTION 10 — Why Choose Wasleen (Arabic)
          ============================================================ */}
      <WhyChooseUs
        reasons={ar.whyChooseUs}
        authorityName={ar.authorityFull}
      />

      {/* ============================================================
          SECTION 11 — Frequently Asked Questions (Arabic)
          ============================================================ */}
      <FAQBlock
        title={`الأسئلة الشائعة حول ${ar.shortName}`}
        subtitle="اعثر على إجابات سريعة لأكثر الأسئلة شيوعاً حول عملية الموافقة هذه."
        items={ar.faqs}
        className="bg-light-bg"
        includeSchema={false}
      />

      {/* ============================================================
          SECTION 12 — Related Approvals (Arabic /ar/ paths)
          ============================================================ */}
      {relatedApprovals.length > 0 && (
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-h2 font-montserrat text-heading-text mb-3">
                الموافقات ذات الصلة
              </h2>
              <p className="text-body-lg text-body-text mb-8 max-w-3xl">
                اكتشف الموافقات الأخرى التي قد تكون ذات صلة بمشروعك.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedApprovals.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/ar/approvals/${item.slug}`}
                    className="flex items-start gap-3 p-4 rounded-md bg-white border border-border-light shadow-card hover:border-brand-blue/30 hover:shadow-dropdown transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-md bg-card-bg text-brand-blue shrink-0">
                      <Shield size={20} strokeWidth={1.75} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-body-sm font-montserrat font-bold text-heading-text mb-0.5 group-hover:text-brand-blue-hover transition-colors">
                        {item.shortName}
                      </h3>
                      <p className="text-caption text-body-text/80">
                        {getCta(item.slug)}
                      </p>
                    </div>
                    <ArrowLeft
                      size={16}
                      strokeWidth={1.75}
                      className="text-body-text/30 group-hover:text-brand-blue shrink-0 mt-1 transition-colors"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 12b — Related Guides & Resources (Arabic /ar/ paths)
          ============================================================ */}
      {relatedGuideEntries.length > 0 && (
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-h2 font-montserrat text-heading-text mb-3">
                الأدلة ذات الصلة
              </h2>
              <p className="text-body-lg text-body-text mb-8 max-w-3xl">
                استعرض أدلتنا الشاملة وصفحات الأسئلة والأجوبة لمزيد من المعلومات التفصيلية.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedGuideEntries.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/ar/guides/${item.slug}`}
                    className="flex items-start gap-3 p-4 rounded-md bg-white border border-border-light shadow-card hover:border-brand-blue/30 hover:shadow-dropdown transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-md bg-card-bg text-brand-blue shrink-0">
                      <BookOpen size={20} strokeWidth={1.75} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-body-sm font-montserrat font-bold text-heading-text mb-0.5 group-hover:text-brand-blue-hover transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-caption text-body-text/80">
                        {item.type === "qa" ? "سؤال وجواب" : "دليل"}
                      </p>
                    </div>
                    <ArrowLeft
                      size={16}
                      strokeWidth={1.75}
                      className="text-body-text/30 group-hover:text-brand-blue shrink-0 mt-1 transition-colors"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 13 — Call to Action (Arabic)
          ============================================================ */}
      <CTASectionArabic serviceSlug={slug} />
    </>
  );
}


/**
 * Dynamic Arabic Service Page — /ar/services/{slug}
 *
 * Renders the full service content template in Arabic with:
 * - Features & deliverables section
 * - Detailed service description
 * - Process steps (if applicable)
 * - FAQ accordion block
 * - Related services for internal linking
 * - Full JSON-LD schema stack (Service + WebPage + FAQPage + HowTo + BreadcrumbList)
 * - Mobile-first responsive layout with RTL support
 * - Semantic HTML with proper heading hierarchy
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md — On-page SEO rules
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md — Schema generation rules
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowLeft, ShieldCheck } from "lucide-react";
import { services } from "@/data/services";
import { services as servicesAr } from "@/data/services-ar";
import { approvals } from "@/data/approvals";
import { approvals as approvalsAr } from "@/data/approvals-ar";
import { getImageBySrc } from "@/data/images";
import { SITE, AR, HUB_SLUGS } from "@/lib/constants";
import { hreflangAlternates } from "@/lib/locale";
import { serviceSchemaStack } from "@/lib/schema";
import { renderDescription } from "@/lib/content";

/* ── Section Components ─────────────────────────────────── */
import ProcessStepsBlock from "@/components/sections/ProcessStepsBlock";
import FAQBlock from "@/components/sections/FAQBlock";
import CTASectionArabic from "@/components/sections/CTASectionArabic";
import FramedImage from "@/components/sections/FramedImage";

/* ============================================================
   Types
   ============================================================ */

interface Props {
  params: Promise<{ slug: string }>;
}

/* ============================================================
   Static Generation
   ============================================================ */

/** Generate all service pages at build time */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

/* ============================================================
   Dynamic Metadata
   ============================================================ */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  const arService = servicesAr.find((s) => s.slug === slug);
  if (!service || !arService) return {};

  const ar = arService.ar;
  const title = `${ar.primaryKeyword} | وسلين للموافقات`;
  const truncateMeta = (text: string, max = 160): string => {
    if (text.length <= max) return text;
    const truncated = text.substring(0, max - 3);
    const lastSpace = truncated.lastIndexOf(' ');
    return (lastSpace > 0 ? text.substring(0, lastSpace) : truncated) + '...';
  };
  const description = truncateMeta(ar.directAnswer);

  const canonical = `${SITE.url}/ar/services/${service.slug}`;

  return {
    title,
    description,
    alternates: { canonical, languages: hreflangAlternates(SITE.url, `/ar/services/${service.slug}`) },
    openGraph: {
      title: title.substring(0, 60),
      description: description.substring(0, 160),
      url: canonical,
      type: "website",
      siteName: "وسلين للموافقات",
      locale: "ar_AE",
    },
    twitter: {
      card: "summary_large_image",
      title: title.substring(0, 60),
      description: description.substring(0, 160),
    },
  };
}

/* ============================================================
   Page Component
   ============================================================ */

export default async function ArabicServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  const arEntry = servicesAr.find((s) => s.slug === slug);
  if (!service || !arEntry) notFound();

  const ar = arEntry.ar;
  const canonical = `${SITE.url}/ar/services/${service.slug}`;

  /* ── Localized framed images (Arabic alt/caption from image registry) ── */

  const heroImage = service.image
    ? {
        ...service.image,
        alt: getImageBySrc(service.image.src)?.ar?.alt ?? service.image.alt,
        caption: getImageBySrc(service.image.src)?.ar?.caption ?? service.image.caption,
      }
    : undefined;

  const processImage = service.processImage
    ? {
        ...service.processImage,
        alt: getImageBySrc(service.processImage.src)?.ar?.alt ?? service.processImage.alt,
        caption: getImageBySrc(service.processImage.src)?.ar?.caption ?? service.processImage.caption,
      }
    : undefined;

  /* ── Schema ─────────────────────────────────────────────── */

  const schemas = serviceSchemaStack(
    {
      url: canonical,
      title: `${ar.primaryKeyword} | وسلين للموافقات`,
      description: ar.directAnswer.substring(0, 160),
      serviceName: ar.name,
      serviceDescription: ar.directAnswer,
      faqs: ar.faqs,
      howToSteps: ar.process,
      breadcrumbs: [
        { position: 1, name: AR.breadcrumb.home, slug: "/ar" },
        { position: 2, name: AR.breadcrumb.services, slug: "/ar/services" },
        { position: 3, name: ar.name, slug: `/ar/services/${service.slug}` },
      ],
      dateModified: service.lastUpdated,
    },
    "ar",
  );

  /* ── Resolve related services ──────────────────────────── */

  const relatedServices = service.relatedSlugs
    .map((s) => {
      const en = services.find((svc) => svc.slug === s);
      const arRel = servicesAr.find((svc) => svc.slug === s);
      if (!en || !arRel) return null;
      return { slug: en.slug, name: arRel.ar.name, tagline: arRel.ar.tagline };
    })
    .filter((s): s is NonNullable<typeof s> => s !== null);

  /* ── Compute related approvals ─────────────────────────── */
  // Map service slugs to relevant approval categories
  const serviceApprovalCategories: Record<string, string[]> = {
    "2d-drawings": ["drawing-documentation", "government-regulatory"],
    "3d-design-visualization": ["drawing-documentation", "developer-community"],
    "cad-documentation": ["drawing-documentation", "technical-utility"],
    "approval-management": ["government-regulatory", "free-zone", "fit-out-construction"],
    "document-clearing": ["government-regulatory", "free-zone", "property-registration"],
    "fit-outs": ["fit-out-construction", "developer-community", "government-regulatory"],
    "project-management": ["fit-out-construction", "government-regulatory", "free-zone"],
  };
  const relevantCategories = serviceApprovalCategories[service.slug] ?? ["government-regulatory"];

  const relatedApprovalEntries = approvals
    .filter((a) => relevantCategories.includes(a.category))
    .slice(0, 4)
    .map((a) => {
      const arApproval = approvalsAr.find((arA) => arA.slug === a.slug);
      return {
        slug: a.slug,
        name: arApproval?.ar?.name ?? a.name,
        authorityAbbr: a.authorityAbbr,
        typicalTimeline: a.typicalTimeline,
      };
    });

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
          SECTION 1 — Hero / Direct Answer Block
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
                <Link href="/ar/services" className="hover:text-link-blue transition-colors">{AR.breadcrumb.services}</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-body-text font-medium truncate max-w-[200px]" aria-current="page">
                {ar.name}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 md:items-start">
            <div>
              {/* H1 — Primary keyword */}
              <h1 className="text-h1 font-montserrat text-heading-text mb-3 max-w-4xl">
                {ar.name}
              </h1>

              {/* Tagline */}
              <p className="text-body-lg font-medium text-body-text/70 mb-4">
                {ar.tagline}
              </p>

              {/* Direct Answer Block — self-contained, quotable by AI */}
              <p className="text-body-lg text-body-text max-w-4xl leading-relaxed mb-6">
                {ar.directAnswer}
              </p>

              {/* Last updated */}
              <p className="text-caption text-body-text/50">
                آخر تحديث: {service.lastUpdated}
              </p>
            </div>

            {/* Hero image — framed, above the fold */}
            {heroImage && (
              <div className="mt-8 md:mt-0">
                <FramedImage image={heroImage} priority halo />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2 — Features & Deliverables
          ============================================================ */}
      <section className="bg-light-bg">
        <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 font-montserrat text-heading-text mb-4">
              ما نقدمه
            </h2>
            <p className="text-body-lg text-body-text mb-8 max-w-3xl">
              تشمل خدمات {ar.name.toLowerCase()} المخرجات الرئيسية التالية،
              وكلها مصممة خصيصًا لمتطلبات مشروعك.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ar.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-md bg-white border border-border-light shadow-card"
                >
                  <CheckCircle2
                    size={20}
                    strokeWidth={1.75}
                    className="shrink-0 mt-0.5 text-body-text"
                  />
                  <span className="text-body text-body-text">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3 — Detailed Description
          ============================================================ */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 font-montserrat text-heading-text mb-4">
              حول خدمة {ar.name}
            </h2>
            <div
              className="text-body text-body-text leading-relaxed space-y-4 [&_a]:text-link-blue [&_a]:hover:text-link-blue [&_a]:underline [&_a]:transition-colors"
              dangerouslySetInnerHTML={{ __html: renderDescription(ar.description) }}
            />
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4a — Process Image (framed, above the process heading)
          ============================================================ */}
      {processImage && (
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-4 pt-12 md:px-8 md:pt-16">
            <div className="max-w-4xl mx-auto">
              <FramedImage image={processImage} halo />
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 4b — Process Steps (if available)
          ============================================================ */}
      {ar.process && ar.process.length > 0 && (
        <ProcessStepsBlock steps={ar.process} />
      )}

      {/* ============================================================
          SECTION 5 — Frequently Asked Questions
          ============================================================ */}
      <FAQBlock
        title={`الأسئلة الشائعة حول ${ar.name}`}
        subtitle="اعثر على إجابات سريعة للأسئلة الأكثر شيوعًا حول هذه الخدمة."
        items={ar.faqs}
        className="bg-light-bg"
        includeSchema={false}
      />

      {/* ============================================================
          SECTION 6 — Related Services (Internal Linking)
          ============================================================ */}
      {relatedServices.length > 0 && (
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-h2 font-montserrat text-heading-text mb-3">
                خدمات ذات صلة
              </h2>
              <p className="text-body-lg text-body-text mb-8 max-w-3xl">
                استكشف خدمات أخرى تكمل {ar.name.toLowerCase()}.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedServices.map((rs) => (
                  <Link
                    key={rs.slug}
                    href={`/ar/services/${rs.slug}`}
                    className="flex items-start gap-3 p-4 rounded-md bg-white border border-border-light shadow-card hover:border-brand-blue/30 hover:shadow-dropdown transition-all duration-200 group"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-body font-montserrat font-bold text-heading-text mb-0.5 group-hover:text-brand-blue-hover transition-colors">
                        {rs.name}
                      </h3>
                      <p className="text-body-sm text-body-text/70 line-clamp-2">
                        {rs.tagline}
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
          SECTION 6b — Related Approvals (Cross-Linking)
          ============================================================ */}
      {relatedApprovalEntries.length > 0 && (
        <section className="bg-light-bg">
          <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-h2 font-montserrat text-heading-text mb-3">
                الموافقات ذات الصلة
              </h2>
              <p className="text-body-lg text-body-text mb-8 max-w-3xl">
                ترتبط صفحات الموافقات هذه ارتباطًا وثيقًا بخدمة {ar.name.toLowerCase()} الخاصة بنا.
                اطّلع على المتطلبات والمستندات وعمليات التقديم المحددة.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedApprovalEntries.map((entry) => (
                  <Link
                    key={entry.slug}
                    href={`/ar/approvals/${entry.slug}`}
                    className="flex items-start gap-3 p-4 rounded-md bg-white border border-border-light shadow-card hover:border-brand-blue/30 hover:shadow-dropdown transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-md bg-card-bg text-brand-blue shrink-0">
                      <ShieldCheck size={20} strokeWidth={1.75} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-body-sm font-montserrat font-bold text-heading-text mb-0.5 group-hover:text-brand-blue-hover transition-colors line-clamp-2">
                        {entry.name}
                      </h3>
                      <p className="text-caption text-body-text/80">
                        {entry.authorityAbbr} &middot; {entry.typicalTimeline}
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

              <div className="mt-6">
                <Link
                  href="/ar/approvals"
                  className="inline-flex items-center gap-1.5 text-link-blue font-semibold hover:underline"
                >
                  عرض جميع أنواع الموافقات الـ 52+ ←
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 7 — Call to Action
          ============================================================ */}
      <CTASectionArabic serviceSlug={slug} />
    </>
  );
}

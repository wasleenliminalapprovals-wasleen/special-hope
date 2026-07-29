/**
 * Arabic Guide / Q&A Page — /ar/guides/{slug}
 *
 * Full Arabic template mirroring the English guide page structure:
 * - Hero with breadcrumbs, badge, H1, description, link back to parent approval
 * - Question & Answer section (for "qa" type)
 * - Content body (for "hub" type)
 * - Related approvals with /ar/approvals/ paths and Arabic names
 * - Related guides with /ar/guides/ paths
 * - CTASectionArabic client component
 * - Arabic JSON-LD schema stack
 *
 * Data source: English guides.ts (for type, parentApprovalSlug, relatedSlugs, etc.)
 *             + guides-ar.ts (for Arabic text content)
 *             + approvals.ts + approvals-ar.ts (for related approvals)
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, HelpCircle, BookOpen } from "lucide-react";
import { guides } from "@/data/guides";
import { guides as guidesAr } from "@/data/guides-ar";
import { approvals } from "@/data/approvals";
import { approvals as approvalsAr } from "@/data/approvals-ar";
import { SITE, AR } from "@/lib/constants";
import { hreflangAlternates } from "@/lib/locale";
import { guideSchemaStack } from "@/lib/schema";
import Badge from "@/components/ui/Badge";
import CTASectionArabic from "@/components/sections/CTASectionArabic";

interface Props {
  params: Promise<{ slug: string }>;
}

/* ============================================================
   Static Generation
   ============================================================ */

/** Generate all Arabic guide pages at build time */
export async function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

/* ============================================================
   Dynamic Metadata
   ============================================================ */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  const arEntry = guidesAr.find((g) => g.slug === slug);
  if (!guide || !arEntry) return {};

  const ar = arEntry.ar;
  const seoTitle = `${ar.primaryKeyword} | ${AR.siteShortName}`.substring(0, 60);
  const description = ar.description.substring(0, 160);
  const canonical = `${SITE.url}/ar/guides/${slug}`;

  return {
    title: seoTitle,
    description,
    alternates: { canonical, languages: hreflangAlternates(SITE.url, `/ar/guides/${slug}`) },
    openGraph: {
      title: seoTitle,
      description: description.substring(0, 160),
      url: canonical,
      type: "article",
      siteName: SITE.name,
      locale: "ar_AE",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: description.substring(0, 160),
    },
  };
}

/* ============================================================
   Helper: Find parent approval (Arabic name)
   ============================================================ */

function getParentApproval(slug?: string): { name: string; slug: string } | null {
  if (!slug) return null;
  const approval = approvals.find((a) => a.slug === slug);
  const arEntry = approvalsAr.find((a) => a.slug === slug);
  if (!approval) return null;
  return {
    name: arEntry?.ar?.name ?? approval.name,
    slug: approval.slug,
  };
}

/* ============================================================
   Page Component
   ============================================================ */

export default async function ArabicGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  const arEntry = guidesAr.find((g) => g.slug === slug);
  if (!guide || !arEntry) notFound();

  const ar = arEntry.ar;
  const canonical = `${SITE.url}/ar/guides/${slug}`;
  const parentApproval = getParentApproval(guide.parentApprovalSlug);

  /* ── Compute related approvals (Arabic names, /ar/ paths) ──── */
  const relatedApprovalEntries = (() => {
    const entries: { name: string; slug: string }[] = [];
    if (parentApproval) {
      entries.push(parentApproval);
    }
    if (guide.parentApprovalSlug) {
      const parent = approvals.find((a) => a.slug === guide.parentApprovalSlug);
      if (parent) {
        const sameCategory = approvals.filter(
          (a) => a.category === parent.category && a.slug !== parent.slug
        );
        sameCategory.slice(0, 3).forEach((a) => {
          if (!entries.find((e) => e.slug === a.slug)) {
            const arRel = approvalsAr.find((ar) => ar.slug === a.slug);
            entries.push({
              name: arRel?.ar?.name ?? a.name,
              slug: a.slug,
            });
          }
        });
      }
    }
    return entries;
  })();

  /* ── Related guides (Arabic names, /ar/ paths) ────────────── */
  const relatedGuideEntries = (guide.relatedSlugs || [])
    .map((s) => {
      const g = guides.find((g) => g.slug === s);
      const gAr = guidesAr.find((g) => g.slug === s);
      if (!g || !gAr) return null;
      return { slug: g.slug, title: gAr.ar.title, type: g.type };
    })
    .filter(Boolean) as { slug: string; title: string; type: string }[];

  /* ── Schema (Arabic locale) ─────────────────────────────── */
  const schemas = guideSchemaStack(
    {
      url: canonical,
      title: `${ar.primaryKeyword} | ${AR.siteShortName}`,
      description: ar.description.substring(0, 160),
      guideData: {
        type: guide.type,
        question: ar.question,
        answer: ar.answer,
      },
      breadcrumbs: [
        { position: 1, name: AR.breadcrumb.home, slug: "/ar" },
        { position: 2, name: AR.breadcrumb.guides, slug: "/ar/guides" },
        { position: 3, name: ar.title, slug: `/ar/guides/${slug}` },
      ],
      dateModified: guide.lastUpdated,
    },
    "ar",
  );

  /* ── Render ─────────────────────────────────────────────── */

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
          SECTION 1 — Hero / Header (Arabic)
          ============================================================ */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-16">
          {/* Breadcrumbs */}
          <nav aria-label="مسار التنقل" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-caption text-body-text/80">
              <li>
                <Link href="/ar" className="hover:text-link-blue transition-colors">{AR.breadcrumb.home}</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/ar/guides" className="hover:text-link-blue transition-colors">{AR.breadcrumb.guides}</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-body-text font-medium truncate max-w-[200px]" aria-current="page">
                {ar.title}
              </li>
            </ol>
          </nav>

          {/* Type badge */}
          <Badge variant="default" className="mb-4">
            {guide.type === "qa" ? "سؤال وجواب" : "دليل"}
          </Badge>

          {/* H1 — Title */}
          <h1 className="text-h1 font-montserrat text-heading-text mb-4 max-w-4xl">
            {ar.title}
          </h1>

          {/* Description / subtitle */}
          <p className="text-body-lg text-body-text max-w-4xl leading-relaxed mb-4">
            {ar.description}
          </p>

          {/* Link back to parent approval (Arabic) */}
          {parentApproval && (
            <Link
              href={`/ar/approvals/${parentApproval.slug}`}
              className="inline-flex items-center gap-1.5 text-body-sm text-link-blue hover:text-brand-blue-hover transition-colors"
            >
              <ArrowLeft size={16} strokeWidth={1.75} />
              العودة إلى {parentApproval.name}
            </Link>
          )}
        </div>
      </section>

      {/* ============================================================
          SECTION 2 — Question & Answer (for "qa" type, Arabic)
          ============================================================ */}
      {guide.type === "qa" && ar.question && ar.answer && (
        <section className="bg-light-bg">
          <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-6 rounded-lg bg-white border border-border-light shadow-card">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-card-bg text-brand-blue shrink-0">
                  <HelpCircle size={24} strokeWidth={1.75} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-h3 font-montserrat text-heading-text mb-4">
                    {ar.question}
                  </h2>
                  <div className="text-body text-body-text leading-relaxed">
                    <p>{ar.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 3 — Content Body (Arabic)
          ============================================================ */}
      {ar.content && ar.content.length > 0 && (
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
            <div className="max-w-4xl mx-auto">
              {guide.type === "hub" && (
                <h2 className="text-h2 font-montserrat text-heading-text mb-6">
                  نظرة عامة
                </h2>
              )}
              <div className="text-body text-body-text leading-relaxed space-y-5">
                {ar.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 3b — Related Approvals (Arabic /ar/approvals/ paths)
          ============================================================ */}
      {relatedApprovalEntries.length > 0 && (
        <section className="bg-light-bg">
          <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-h2 font-montserrat text-heading-text mb-3">
                الموافقات ذات الصلة
              </h2>
              <p className="text-body-lg text-body-text mb-8 max-w-3xl">
                استعرض صفحات الموافقات ذات الصلة بهذا الدليل للحصول على متطلبات التقديم والوثائق والمدد الزمنية التفصيلية.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedApprovalEntries.map((entry) => (
                  <Link
                    key={entry.slug}
                    href={`/ar/approvals/${entry.slug}`}
                    className="flex items-start gap-3 p-4 rounded-md bg-white border border-border-light shadow-card hover:border-brand-blue/30 hover:shadow-dropdown transition-all duration-200 group"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-body font-montserrat font-bold text-heading-text mb-0.5 group-hover:text-brand-blue-hover transition-colors">
                        {entry.name}
                      </h3>
                      <p className="text-body-sm text-body-text/70">
                        عرض متطلبات الموافقة &larr;
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
          SECTION 4 — Related Guides (Arabic /ar/guides/ paths)
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
          SECTION 5 — Call to Action (Arabic)
          ============================================================ */}
      <CTASectionArabic serviceSlug={slug} />
    </>
  );
}

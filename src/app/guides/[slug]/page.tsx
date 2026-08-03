/**
 * Dynamic Guide / Q&A Page — /guides/{slug}
 *
 * Supports two guide types:
 *   "hub" — Multi-topic article with paragraphs of content
 *   "qa"  — Single question + answer page with QAPage schema
 *
 * Generates:
 * - SEO-optimized metadata with proper heading hierarchy
 * - JSON-LD schema stack (WebPage + optional QAPage + BreadcrumbList)
 * - Mobile-first responsive layout with semantic HTML
 * - Internal links to parent approval and related guides
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md — Content rules for guides
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md — Schema generation rules
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, HelpCircle, BookOpen, ArrowRight } from "lucide-react";
import { guides } from "@/data/guides";
import { approvals } from "@/data/approvals";
import { SITE, HUB_SLUGS } from "@/lib/constants";
import { hreflangAlternates } from "@/lib/locale";
import { guideSchemaStack, pseoSchemaStack } from "@/lib/schema";
import { getPseoPage, loadPseoPages } from "@/lib/pseo-data";
import PseoPageRenderer from "@/components/pseo/PseoPageRenderer";
import type { PseoRelatedItem } from "@/components/pseo/PseoRelatedBlock";
import type { PseoPage } from "@/types";
import RelatedGuides from "@/components/sections/RelatedGuides";
import CTASection from "@/components/sections/CTASection";
import Badge from "@/components/ui/Badge";

/* ============================================================
   Static Generation
   ============================================================ */

/** Generate all guide + pSEO pages at build time */
export function generateStaticParams() {
  return [
    ...guides.map((guide) => ({ slug: guide.slug })),
    ...loadPseoPages().map((page) => ({ slug: page.slug })),
  ];
}

/* ============================================================
   Dynamic Metadata
   ============================================================ */

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  /* ── pSEO-generated page metadata ──────────────────────── */
  const pseoPage = getPseoPage(slug);
  if (pseoPage) {
    const seoTitle =
      pseoPage.metaTitle ||
      `${pseoPage.primaryKeyword} | ${SITE.name}`.substring(0, 60);
    const description = (pseoPage.metaDescription || pseoPage.directAnswer || "").substring(0, 160);
    const canonical = `${SITE.url}/guides/${pseoPage.slug}`;
    return {
      title: seoTitle,
      description,
      alternates: { canonical, languages: hreflangAlternates(SITE.url, `/guides/${pseoPage.slug}`) },
      openGraph: {
        title: seoTitle,
        description,
        url: canonical,
        type: "article",
        siteName: SITE.name,
      },
      twitter: {
        card: "summary_large_image",
        title: seoTitle,
        description,
      },
    };
  }

  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return {};

  const seoTitle = `${guide.primaryKeyword} | ${SITE.name}`.substring(0, 60);
  const description = guide.description.substring(0, 160);

  const canonical = `${SITE.url}/guides/${guide.slug}`;

  return {
    title: seoTitle,
    description,
    alternates: { canonical, languages: hreflangAlternates(SITE.url, `/guides/${guide.slug}`) },
    openGraph: {
      title: seoTitle,
      description: description.substring(0, 160),
      url: canonical,
      type: "article",
      siteName: SITE.name,
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: description.substring(0, 160),
    },
  };
}

/* ============================================================
   Helper: Find parent approval name
   ============================================================ */

function getParentApproval(slug?: string): { name: string; slug: string } | null {
  if (!slug) return null;
  const approval = approvals.find((a) => a.slug === slug);
  if (!approval) return null;
  return { name: approval.name, slug: approval.slug };
}

/* ============================================================
   Helpers: pSEO page rendering
   ============================================================ */

/** Fact-sheet date → valid ISO date for schema (falls back to build date). */
function schemaDate(value: string): string {
  if (!value || value === "pending") return new Date().toISOString();
  return value;
}

/** Resolve pSEO related slugs into named links (approvals → guides → pSEO). */
function resolvePseoRelated(page: PseoPage): PseoRelatedItem[] {
  const items: PseoRelatedItem[] = [];
  const seen = new Set<string>();

  const add = (slug: string, name: string, href: string, description?: string) => {
    if (seen.has(slug)) return;
    seen.add(slug);
    items.push({ name, href, description });
  };

  if (page.parentApprovalSlug) {
    const parent = approvals.find((a) => a.slug === page.parentApprovalSlug);
    if (parent) {
      add(
        parent.slug,
        parent.name,
        `/approvals/${parent.slug}`,
        "Full approval requirements, documents, and timeline",
      );
    }
  }

  for (const slug of page.relatedSlugs ?? []) {
    if (seen.has(slug)) continue;
    const approval = approvals.find((a) => a.slug === slug);
    if (approval) {
      add(slug, approval.name, `/approvals/${slug}`, "Approval requirements and timeline");
      continue;
    }
    const guide = guides.find((g) => g.slug === slug);
    if (guide) {
      add(slug, guide.title, `/guides/${slug}`, "Detailed guide");
      continue;
    }
    const pseo = getPseoPage(slug);
    if (pseo) {
      add(slug, pseo.title, `/guides/${slug}`, "Related guide");
      continue;
    }
    add(
      slug,
      slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      `/guides/${slug}`,
    );
  }
  return items;
}

/** Render a pSEO page with its schema stack and pSEO template. */
function renderPseoPage(page: PseoPage) {
  const canonical = `${SITE.url}/guides/${page.slug}`;
  const parentApproval = getParentApproval(page.parentApprovalSlug);
  const relatedItems = resolvePseoRelated(page);

  const schemas = pseoSchemaStack(
    {
      url: canonical,
      title: page.metaTitle || page.title,
      description: page.metaDescription || page.directAnswer || "",
      kind: page.kind,
      sections: page.sections,
      directAnswer: page.directAnswer,
      faqs: page.faqs,
      related: relatedItems.map((r) => ({ name: r.name, slug: r.href })),
      parentApproval: parentApproval
        ? { name: parentApproval.name, slug: parentApproval.slug }
        : undefined,
      dateModified: schemaDate(page.lastVerified),
    },
    "en",
  );

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <PseoPageRenderer
        page={page}
        locale="en"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Guides", href: HUB_SLUGS.guides },
          { name: page.title, href: `/guides/${page.slug}` },
        ]}
        related={relatedItems}
        parentApproval={
          parentApproval
            ? { name: parentApproval.name, href: `/approvals/${parentApproval.slug}` }
            : null
        }
      />
    </>
  );
}

/* ============================================================
   Page Component
   ============================================================ */

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  /* ── pSEO-generated page branch ───────────────────────── */
  const pseoPage = getPseoPage(slug);
  if (pseoPage) {
    return renderPseoPage(pseoPage);
  }

  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const canonical = `${SITE.url}/guides/${guide.slug}`;
  const parentApproval = getParentApproval(guide.parentApprovalSlug);

  /* ── Compute related approvals ─────────────────────────── */
  const relatedApprovalEntries = (() => {
    // Start with parent approval if it exists
    const entries: { name: string; slug: string }[] = [];
    if (parentApproval) {
      entries.push(parentApproval);
    }
    // Add 2-3 additional approvals from the same category as the parent
    if (guide.parentApprovalSlug) {
      const parent = approvals.find((a) => a.slug === guide.parentApprovalSlug);
      if (parent) {
        const sameCategory = approvals.filter(
          (a) => a.category === parent.category && a.slug !== parent.slug
        );
        sameCategory.slice(0, 3).forEach((a) => {
          if (!entries.find((e) => e.slug === a.slug)) {
            entries.push({ name: a.name, slug: a.slug });
          }
        });
      }
    }
    return entries;
  })();

  /* ── Schema ─────────────────────────────────────────────── */

  const schemas = guideSchemaStack(
    {
    url: canonical,
    title: `${guide.primaryKeyword} | ${SITE.name}`,
    description: guide.description.substring(0, 160),
    guideData: {
      type: guide.type,
      question: guide.question,
      answer: guide.answer,
    },
    breadcrumbs: [
      { position: 1, name: "Home", slug: "/" },
      { position: 2, name: "Guides", slug: HUB_SLUGS.guides },
      { position: 3, name: guide.title, slug: `/guides/${guide.slug}` },
    ],
      dateModified: guide.lastUpdated,
    },
    "en",
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
          SECTION 1 — Hero / Header
          ============================================================ */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-16">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-caption text-body-text/80">
              <li>
                <Link href="/" className="hover:text-link-blue transition-colors">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/guides" className="hover:text-link-blue transition-colors">Guides</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-body-text font-medium truncate max-w-[200px]" aria-current="page">
                {guide.title}
              </li>
            </ol>
          </nav>

          {/* Type badge */}
          <Badge variant="default" className="mb-4">
            {guide.type === "qa" ? "Q&A" : "Guide"}
          </Badge>

          {/* H1 — Title */}
          <h1 className="text-h1 font-montserrat text-heading-text mb-4 max-w-4xl">
            {guide.title}
          </h1>

          {/* Description / subtitle */}
          <p className="text-body-lg text-body-text max-w-4xl leading-relaxed mb-4">
            {guide.description}
          </p>

          {/* Link back to parent approval */}
          {parentApproval && (
            <Link
              href={`/approvals/${parentApproval.slug}`}
              className="inline-flex items-center gap-1.5 text-body-sm text-link-blue hover:text-brand-blue-hover transition-colors"
            >
              <ArrowLeft size={16} strokeWidth={1.75} />
              Back to {parentApproval.name}
            </Link>
          )}
        </div>
      </section>

      {/* ============================================================
          SECTION 2 — Question & Answer (for "qa" type)
          ============================================================ */}
      {guide.type === "qa" && guide.question && guide.answer && (
        <section className="bg-light-bg">
          <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-6 rounded-lg bg-white border border-border-light shadow-card">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-card-bg text-brand-blue shrink-0">
                  <HelpCircle size={24} strokeWidth={1.75} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-h3 font-montserrat text-heading-text mb-4">
                    {guide.question}
                  </h2>
                  <div className="text-body text-body-text leading-relaxed">
                    <p>{guide.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 3 — Content Body
          ============================================================ */}
      {guide.content && guide.content.length > 0 && (
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
            <div className="max-w-4xl mx-auto">
              {guide.type === "hub" && (
                <h2 className="text-h2 font-montserrat text-heading-text mb-6">
                  Overview
                </h2>
              )}
              <div className="text-body text-body-text leading-relaxed space-y-5">
                {guide.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 3b — Related Approvals (Cross-Linking)
          ============================================================ */}
      {relatedApprovalEntries.length > 0 && (
        <section className="bg-light-bg">
          <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-h2 font-montserrat text-heading-text mb-3">
                Related Approvals
              </h2>
              <p className="text-body-lg text-body-text mb-8 max-w-3xl">
                Explore the approval pages related to this guide for detailed
                submission requirements, documents, and timelines.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedApprovalEntries.map((entry) => (
                  <Link
                    key={entry.slug}
                    href={`/approvals/${entry.slug}`}
                    className="flex items-start gap-3 p-4 rounded-md bg-white border border-border-light shadow-card hover:border-brand-blue/30 hover:shadow-dropdown transition-all duration-200 group"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-body font-montserrat font-bold text-heading-text mb-0.5 group-hover:text-brand-blue-hover transition-colors">
                        {entry.name}
                      </h3>
                      <p className="text-body-sm text-body-text/70">
                        View approval requirements &rarr;
                      </p>
                    </div>
                    <ArrowRight
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
          SECTION 4 — Related Guides (Internal Linking)
          ============================================================ */}
      <RelatedGuides slugs={guide.relatedSlugs} />

      {/* ============================================================
          SECTION 5 — Call to Action
          ============================================================ */}
      <CTASection service_slug={slug} />
    </>
  );
}

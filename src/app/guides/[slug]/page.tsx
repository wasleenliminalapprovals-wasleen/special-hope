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
import { ArrowLeft, HelpCircle, BookOpen } from "lucide-react";
import { guides } from "@/data/guides";
import { approvals } from "@/data/approvals";
import { SITE, HUB_SLUGS } from "@/lib/constants";
import { guideSchemaStack } from "@/lib/schema";
import RelatedGuides from "@/components/sections/RelatedGuides";
import CTASection from "@/components/sections/CTASection";
import Badge from "@/components/ui/Badge";

/* ============================================================
   Static Generation
   ============================================================ */

/** Generate all guide pages at build time */
export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

/* ============================================================
   Dynamic Metadata
   ============================================================ */

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return {};

  const seoTitle = `${guide.primaryKeyword} | ${SITE.name}`.substring(0, 60);
  const description = guide.description.substring(0, 160);

  const canonical = `${SITE.url}/guides/${guide.slug}`;

  return {
    title: seoTitle,
    description,
    alternates: { canonical },
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
   Page Component
   ============================================================ */

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const canonical = `${SITE.url}/guides/${guide.slug}`;
  const parentApproval = getParentApproval(guide.parentApprovalSlug);

  /* ── Schema ─────────────────────────────────────────────── */

  const schemas = guideSchemaStack({
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
  });

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

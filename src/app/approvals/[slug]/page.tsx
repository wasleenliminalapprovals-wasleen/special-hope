/**
 * Dynamic Approval Page — /approvals/{slug}
 *
 * Generates a fully SEO-optimized approval page with:
 * - 12 structured content sections designed for AI extraction
 * - Full JSON-LD schema stack (Service + WebPage + FAQPage + HowTo + BreadcrumbList)
 * - Mobile-first responsive layout
 * - Semantic HTML with proper heading hierarchy
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md — Full content structure
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md — Schema generation rules
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, DollarSign } from "lucide-react";
import { approvals } from "@/data/approvals";
import { guides } from "@/data/guides";
import { SITE, HUB_SLUGS } from "@/lib/constants";
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
import RelatedApprovals from "@/components/sections/RelatedApprovals";
import RelatedGuides from "@/components/sections/RelatedGuides";
import CTASection from "@/components/sections/CTASection";
import Badge from "@/components/ui/Badge";

/* ============================================================
   Static Generation
   ============================================================ */

/** Generate all 52 approval pages at build time */
export function generateStaticParams() {
  return approvals.map((approval) => ({ slug: approval.slug }));
}

/* ============================================================
   Dynamic Metadata
   ============================================================ */

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const approval = approvals.find((a) => a.slug === slug);
  if (!approval) return {};

  const seoTitle = `${approval.primaryKeyword} | ${SITE.name}`.substring(0, 60);
  const description = `${approval.directAnswer.substring(0, 150)} Contact us today for expert assistance.`;

  const canonical = `${SITE.url}/approvals/${approval.slug}`;

  return {
    title: seoTitle,
    description,
    alternates: { canonical, languages: hreflangAlternates(SITE.url, `/approvals/${approval.slug}`) },
    openGraph: {
      title: seoTitle,
      description: description.substring(0, 160),
      url: canonical,
      type: "website",
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
   Helper: Find category label
   ============================================================ */

function getCategoryLabel(slug: string): string {
  const cat = APPROVAL_CATEGORIES.find((c) => c.value === slug);
  return cat?.label ?? slug;
}

/* ============================================================
   Page Component
   ============================================================ */

export default async function ApprovalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const approval = approvals.find((a) => a.slug === slug);
  if (!approval) notFound();

  const canonical = `${SITE.url}/approvals/${approval.slug}`;

  /* ── Compute related guides dynamically ────────────────── */
  const relatedGuideSlugs = guides
    .filter((g) => g.parentApprovalSlug === approval.slug)
    .map((g) => g.slug);

  /* ── Schema ─────────────────────────────────────────────── */

  const schemas = approvalSchemaStack(
    {
    url: canonical,
    title: `${approval.primaryKeyword} | ${SITE.name}`,
    description: approval.directAnswer.substring(0, 160),
    serviceName: approval.name,
    serviceDescription: approval.directAnswer,
    serviceCategory: getCategoryLabel(approval.category),
    faqs: approval.faqs,
    howToSteps: approval.process,
    breadcrumbs: [
      { position: 1, name: "Home", slug: "/" },
      { position: 2, name: "Approvals", slug: HUB_SLUGS.approvals },
      { position: 3, name: approval.name, slug: `/approvals/${approval.slug}` },
    ],
      dateModified: approval.lastUpdated,
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
          SECTION 1 — Hero / Direct Answer Block
          ============================================================ */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-16">
          {/* Breadcrumbs (visible for UX) */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-caption text-body-text/80">
              <li>
                <Link href="/" className="hover:text-link-blue transition-colors">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/approvals" className="hover:text-link-blue transition-colors">Approvals</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-body-text font-medium truncate max-w-[200px]" aria-current="page">
                {approval.name}
              </li>
            </ol>
          </nav>

          {/* Category badge */}
          <Badge variant="default" className="mb-4">
            {getCategoryLabel(approval.category)}
          </Badge>

          {/* H1 — Primary keyword */}
          <h1 className="text-h1 font-montserrat text-heading-text mb-4 max-w-4xl">
            {approval.primaryKeyword}
          </h1>

          {/* Direct Answer Block — self-contained, quotable by AI */}
          <p className="text-body-lg text-body-text max-w-4xl leading-relaxed mb-6">
            {approval.directAnswer}
          </p>

          {/* Quick info badges */}
          <div className="flex flex-wrap gap-4 text-body-sm text-body-text/70">
            <span className="inline-flex items-center gap-1.5">
              <Clock size={16} strokeWidth={1.75} />
              Typical timeline: <strong className="text-body-text">{approval.typicalTimeline}</strong>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <DollarSign size={16} strokeWidth={1.75} />
              Typical cost: <strong className="text-body-text">{approval.typicalCostRange}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2 — At-a-Glance Stats Strip
          ============================================================ */}
      <StatsStrip stats={approval.stats} />

      {/* ============================================================
          SECTION 3 — What Is This Approval?
          ============================================================ */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 font-montserrat text-heading-text mb-4">
              What is {approval.shortName}?
            </h2>
            <div
              className="text-body text-body-text leading-relaxed"
              dangerouslySetInnerHTML={{ __html: renderDescription(approval.description) }}
            />
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4 — Who Needs This?
          ============================================================ */}
      <section className="bg-light-bg">
        <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 font-montserrat text-heading-text mb-4">
              Who Needs {approval.shortName}?
            </h2>
            <p className="text-body-lg text-body-text mb-6 max-w-3xl">
              {approval.name} is required for the following individuals and
              organizations:
            </p>
            <ul className="space-y-3">
              {approval.whoNeedsIt.map((item, index) => (
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

      {/* ============================================================
          SECTION 5 — Documents & Requirements Table
          ============================================================ */}
      <DocumentsTable
        documents={approval.documents}
        disclaimer="Requirements may vary based on project scope and authority updates. Always confirm the current document list with the issuing authority or consult our team."
      />

      {/* ============================================================
          SECTION 6 — Step-by-Step Process
          ============================================================ */}
      <ProcessStepsBlock steps={approval.process} />

      {/* ============================================================
          SECTION 7 — Timeline & Cost Breakdown
          ============================================================ */}
      <TimelineCostTable
        entries={approval.timelineTable}
        disclaimer="Timelines and costs are indicative and may vary based on project complexity, document readiness, and authority workload. Contact us for a personalized assessment."
      />

      {/* ============================================================
          SECTION 8 — Common Rejection Reasons
          ============================================================ */}
      <RejectionReasons reasons={approval.rejectionReasons} />

      {/* ============================================================
          SECTION 9 — Real Project Example (Case Study)
          ============================================================ */}
      <CaseStudyBlock study={approval.caseStudy} />

      {/* ============================================================
          SECTION 10 — Why Choose Wasleen
          ============================================================ */}
      <WhyChooseUs
        reasons={approval.whyChooseUs}
        authorityName={approval.authorityFull}
      />

      {/* ============================================================
          SECTION 11 — Frequently Asked Questions
          ============================================================ */}
      <FAQBlock
        title={`Frequently Asked Questions About ${approval.shortName}`}
        subtitle="Find quick answers to the most common questions about this approval process."
        items={approval.faqs}
        className="bg-light-bg"
        includeSchema={false}
      />

      {/* ============================================================
          SECTION 12 — Related Approvals (Internal Linking)
          ============================================================ */}
      <RelatedApprovals slugs={approval.relatedSlugs} />

      {/* ============================================================
          SECTION 12b — Related Guides & Resources (Cross-Linking)
          ============================================================ */}
      {relatedGuideSlugs.length > 0 && (
        <RelatedGuides slugs={relatedGuideSlugs} />
      )}

      {/* ============================================================
          SECTION 13 — Call to Action
          ============================================================ */}
      <CTASection service_slug={slug} />
    </>
  );
}

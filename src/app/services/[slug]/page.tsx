/**
 * Dynamic Service Page — /services/{slug}
 *
 * Generates a fully SEO-optimized service page with:
 * - Features & deliverables section
 * - Detailed service description
 * - Process steps (if applicable)
 * - FAQ accordion block
 * - Related services for internal linking
 * - Full JSON-LD schema stack (Service + WebPage + FAQPage + HowTo + BreadcrumbList)
 * - Mobile-first responsive layout
 * - Semantic HTML with proper heading hierarchy
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md — On-page SEO rules
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md — Schema generation rules
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { services } from "@/data/services";
import { approvals } from "@/data/approvals";
import { SITE, HUB_SLUGS } from "@/lib/constants";
import { serviceSchemaStack } from "@/lib/schema";

/* ── Section Components ─────────────────────────────────── */
import ProcessStepsBlock from "@/components/sections/ProcessStepsBlock";
import FAQBlock from "@/components/sections/FAQBlock";
import CTASection from "@/components/sections/CTASection";

/* ============================================================
   Static Generation
   ============================================================ */

/** Generate all 5 service pages at build time */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

/* ============================================================
   Dynamic Metadata
   ============================================================ */

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  const title = `${service.primaryKeyword} | ${SITE.name}`;
  const description = `${service.directAnswer.substring(0, 150)} Contact us today for expert assistance.`;

  const canonical = `${SITE.url}/services/${service.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: title.substring(0, 60),
      description: description.substring(0, 160),
      url: canonical,
      type: "website",
      siteName: SITE.name,
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

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const canonical = `${SITE.url}/services/${service.slug}`;

  /* ── Schema ─────────────────────────────────────────────── */

  const schemas = serviceSchemaStack({
    url: canonical,
    title: `${service.primaryKeyword} | ${SITE.name}`,
    description: service.directAnswer.substring(0, 160),
    serviceName: service.name,
    serviceDescription: service.directAnswer,
    faqs: service.faqs,
    howToSteps: service.process,
    breadcrumbs: [
      { position: 1, name: "Home", slug: "/" },
      { position: 2, name: "Services", slug: HUB_SLUGS.services },
      { position: 3, name: service.name, slug: `/services/${service.slug}` },
    ],
    dateModified: service.lastUpdated,
  });

  /* ── Resolve related services ──────────────────────────── */

  const relatedServices = service.relatedSlugs
    .map((s) => services.find((svc) => svc.slug === s))
    .filter((s): s is (typeof services)[number] => s !== undefined);

  /* ── Compute related approvals ─────────────────────────── */
  // Map service slugs to relevant approval categories
  const serviceApprovalCategories: Record<string, string[]> = {
    "2d-drawings": ["drawing-documentation", "government-regulatory"],
    "3d-design-visualization": ["drawing-documentation", "developer-community"],
    "cad-documentation": ["drawing-documentation", "technical-utility"],
    "approval-management": ["government-regulatory", "free-zone", "fit-out-construction"],
    "document-clearing": ["government-regulatory", "free-zone", "property-registration"],
  };
  const relevantCategories = serviceApprovalCategories[service.slug] ?? ["government-regulatory"];
  const relatedApprovalEntries = approvals
    .filter((a) => relevantCategories.includes(a.category))
    .slice(0, 4);

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
                <Link href="/services" className="hover:text-link-blue transition-colors">Services</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-body-text font-medium truncate max-w-[200px]" aria-current="page">
                {service.name}
              </li>
            </ol>
          </nav>

          {/* H1 — Primary keyword */}
          <h1 className="text-h1 font-montserrat text-heading-text mb-3 max-w-4xl">
            {service.name}
          </h1>

          {/* Tagline */}
          <p className="text-body-lg font-medium text-body-text/70 mb-4">
            {service.tagline}
          </p>

          {/* Direct Answer Block — self-contained, quotable by AI */}
          <p className="text-body-lg text-body-text max-w-4xl leading-relaxed mb-6">
            {service.directAnswer}
          </p>

          {/* Last updated */}
          <p className="text-caption text-body-text/50">
            Last updated: {service.lastUpdated}
          </p>
        </div>
      </section>

      {/* ============================================================
          SECTION 2 — Features & Deliverables
          ============================================================ */}
      <section className="bg-light-bg">
        <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 font-montserrat text-heading-text mb-4">
              What We Deliver
            </h2>
            <p className="text-body-lg text-body-text mb-8 max-w-3xl">
              Our {service.name.toLowerCase()} service includes the following
              key deliverables, all tailored to your project requirements.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.features.map((feature, index) => (
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
              About Our {service.name} Service
            </h2>
            <div className="text-body text-body-text leading-relaxed space-y-4">
              {service.description.split("\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4 — Process Steps (if available)
          ============================================================ */}
      {service.process && service.process.length > 0 && (
        <ProcessStepsBlock steps={service.process} />
      )}

      {/* ============================================================
          SECTION 5 — Frequently Asked Questions
          ============================================================ */}
      <FAQBlock
        title={`Frequently Asked Questions About ${service.name}`}
        subtitle="Find quick answers to the most common questions about this service."
        items={service.faqs}
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
                Related Services
              </h2>
              <p className="text-body-lg text-body-text mb-8 max-w-3xl">
                Explore other services that complement {service.name.toLowerCase()}.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedServices.map((rs) => (
                  <Link
                    key={rs.slug}
                    href={`/services/${rs.slug}`}
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
          SECTION 6b — Related Approvals (Cross-Linking)
          ============================================================ */}
      {relatedApprovalEntries.length > 0 && (
        <section className="bg-light-bg">
          <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-h2 font-montserrat text-heading-text mb-3">
                Related Approvals
              </h2>
              <p className="text-body-lg text-body-text mb-8 max-w-3xl">
                These approval pages are closely related to our {service.name.toLowerCase()} service.
                View the specific requirements, documents, and submission processes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedApprovalEntries.map((entry) => (
                  <Link
                    key={entry.slug}
                    href={`/approvals/${entry.slug}`}
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
                    <ArrowRight
                      size={16}
                      strokeWidth={1.75}
                      className="text-body-text/30 group-hover:text-brand-blue shrink-0 mt-1 transition-colors"
                    />
                  </Link>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href="/approvals"
                  className="inline-flex items-center gap-1.5 text-link-blue font-semibold hover:underline"
                >
                  View all 52+ approval types &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 7 — Call to Action
          ============================================================ */}
      <CTASection service_slug={slug} />
    </>
  );
}

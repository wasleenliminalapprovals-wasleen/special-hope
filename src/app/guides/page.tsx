/**
 * Guides Hub — /guides
 *
 * Lists all 30+ guides and Q&A pages organized by type.
 * Hub guides appear first as featured content, followed by Q&A pages.
 * Each card links to the individual guide page at /guides/{slug}.
 *
 * Schema: WebPage + BreadcrumbList
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md — On-page SEO rules
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md — Schema generation rules
 */

import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, HelpCircle, ShieldCheck, PenTool, ArrowRight } from "lucide-react";
import { guides } from "@/data/guides";
import { SITE, HUB_SLUGS } from "@/lib/constants";
import { hreflangAlternates } from "@/lib/locale";
import { breadcrumbList, webPageSchema } from "@/lib/schema";
import Badge from "@/components/ui/Badge";
import CTASection from "@/components/sections/CTASection";
import PseoResourceHub from "@/components/pseo/PseoResourceHub";

/* ============================================================
   Metadata
   ============================================================ */

export const metadata: Metadata = {
  title: "Dubai Approvals Guides (30+) | Expert Resources | Wasleen",
  description:
    "Access 30+ expert guides and Q&A resources covering Dubai building approvals, DM permits, DCD NOCs, DEWA connections, developer approvals, and more. Free resources from Wasleen Approvals.",
  alternates: {
    canonical: `${SITE.url}${HUB_SLUGS.guides}`,
    languages: hreflangAlternates(SITE.url, HUB_SLUGS.guides),
  },
  openGraph: {
    title: "Dubai Approvals Guides (30+) | Expert Resources | Wasleen",
    description:
      "Access 30+ expert guides and Q&A resources covering Dubai building approvals, DM permits, DCD NOCs, DEWA connections, developer approvals, and more.",
    url: `${SITE.url}${HUB_SLUGS.guides}`,
  },
  twitter: {
    title: "Dubai Approvals Guides (30+) | Expert Resources | Wasleen",
    description:
      "Access 30+ expert guides and Q&A resources covering Dubai building approvals, DM permits, DCD NOCs, DEWA connections, developer approvals, and more.",
  },
};

/* ============================================================
   Page Component
   ============================================================ */

const LAST_UPDATED = "2026-07-15";

export default function GuidesHubPage() {
  /* ── Schema ─────────────────────────────────────────────── */

  const schemas = [
    webPageSchema({
      url: HUB_SLUGS.guides,
      title: "Dubai Approvals Guides (30+) | Expert Resources | Wasleen",
      description:
        "Access 30+ expert guides and Q&A resources covering Dubai building approvals, DM permits, DCD NOCs, DEWA connections, developer approvals, and more.",
      dateModified: LAST_UPDATED,
    }),
    breadcrumbList([
      { position: 1, name: "Home", slug: "/" },
      { position: 2, name: "Guides", slug: HUB_SLUGS.guides },
    ]),
  ];

  /* ── Separate hub guides from Q&A guides ────────────────── */

  const hubGuides = guides.filter((g) => g.type === "hub");
  const qaGuides = guides.filter((g) => g.type === "qa");

  return (
    <>
      {/* ===== Hero / Header ===== */}
      <section className="bg-brand-blue text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <h1 className="text-h1 font-montserrat font-bold mb-3">
            Dubai Approvals Guides & Q&A
          </h1>
          <p className="text-body-lg text-white/80 max-w-3xl">
            Expert-crafted resources to help you navigate Dubai's approval
            landscape. From comprehensive guides to specific Q&As —
            <strong className="text-white"> {guides.length} resources</strong>{" "}
            covering every authority and process.
          </p>
          <p className="text-body-sm text-white/60 mt-2">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* ===== Featured: Hub Guides ===== */}
      {hubGuides.length > 0 && (
        <section>
          <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-card-bg text-brand-blue shrink-0">
                <BookOpen size={22} strokeWidth={1.75} />
              </div>
              <div>
                <h2 className="text-h2 font-montserrat font-bold text-heading-text">
                  Comprehensive Guides
                </h2>
                <p className="text-body-sm text-body-text/70">
                  In-depth resources covering the full approval landscape
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {hubGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group flex flex-col gap-3 p-6 rounded-md bg-gradient-to-br from-card-bg to-white border border-border-light border-s-2 border-s-transparent shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-brand-blue/40 hover:border-s-4 hover:border-s-brand-blue hover:bg-gradient-to-br hover:from-white hover:to-card-bg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-h4 font-montserrat font-bold text-heading-text group-hover:text-link-blue transition-colors">
                      {guide.title}
                    </h3>
                    <ArrowRight
                      size={18}
                      strokeWidth={1.75}
                      className="shrink-0 mt-1 text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>

                  <p className="text-body-sm text-body-text line-clamp-3">
                    {guide.description}
                  </p>

                  <div className="flex items-center gap-2 mt-auto flex-wrap">
                    <Badge variant="default">Guide</Badge>
                    {guide.content.length > 0 && (
                      <Badge variant="outline">
                        {guide.content.length} sections
                      </Badge>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== Divider ===== */}
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <hr className="border-border-light" />
      </div>

      {/* ===== Q&A Guides ===== */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-card-bg text-brand-blue shrink-0">
              <HelpCircle size={22} strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="text-h2 font-montserrat font-bold text-heading-text">
                Q&A Resources
              </h2>
              <p className="text-body-sm text-body-text/70">
                {qaGuides.length} specific questions answered by our experts
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {qaGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group flex flex-col gap-3 p-5 rounded-md bg-gradient-to-br from-card-bg/80 to-white border border-border-light border-s-2 border-s-transparent shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-brand-blue/40 hover:border-s-4 hover:border-s-brand-blue hover:bg-gradient-to-br hover:from-white hover:to-card-bg"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-h4 font-montserrat font-bold text-heading-text group-hover:text-link-blue transition-colors line-clamp-2">
                    {guide.title}
                  </h3>
                  <ArrowRight
                    size={18}
                    strokeWidth={1.75}
                    className="shrink-0 mt-1 text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  />
                </div>

                <p className="text-body-sm text-body-text line-clamp-3">
                  {guide.description}
                </p>

                <div className="flex items-center gap-2 mt-auto flex-wrap">
                  <Badge variant="success">Q&A</Badge>
                  {guide.parentApprovalSlug && (
                    <Badge variant="outline">
                      Related Approval
                    </Badge>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Divider ===== */}
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <hr className="border-border-light" />
      </div>

      {/* ===== Resource Hubs (pSEO pages) ===== */}
      <PseoResourceHub />

      {/* ===== Cross-Hub Links ===== */}
      <section className="bg-light-bg">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 font-montserrat text-heading-text mb-4">
              Explore Approvals & Services
            </h2>
            <p className="text-body-lg text-body-text mb-8">
              Complement your research with our full directory of Dubai approvals and professional service offerings.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link
                href="/approvals"
                className="flex items-start gap-4 p-6 rounded-md bg-gradient-to-br from-white to-card-bg/30 border border-border-light shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-brand-blue/40 group"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-card-bg text-brand-blue shrink-0">
                  <ShieldCheck size={24} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-h4 font-montserrat font-bold text-heading-text group-hover:text-link-blue transition-colors mb-1">
                    All 52+ Approval Types
                  </h3>
                  <p className="text-body-sm text-body-text">
                    Browse our complete directory of DM, DCD, DEWA, DDA, free zone, and developer approvals required in Dubai.
                  </p>
                  <span className="inline-flex items-center gap-1 text-body-sm font-medium text-link-blue mt-2 group-hover:text-link-blue/80 transition-colors">
                    View all approvals <ArrowRight size={14} strokeWidth={1.75} />
                  </span>
                </div>
              </Link>
              <Link
                href="/services"
                className="flex items-start gap-4 p-6 rounded-md bg-gradient-to-br from-white to-card-bg/30 border border-border-light shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-brand-blue/40 group"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-card-bg text-brand-blue shrink-0">
                  <PenTool size={24} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-h4 font-montserrat font-bold text-heading-text group-hover:text-link-blue transition-colors mb-1">
                    Drawing & Documentation Services
                  </h3>
                  <p className="text-body-sm text-body-text">
                    Need technical drawings or approval management? Explore our full range of professional services.
                  </p>
                  <span className="inline-flex items-center gap-1 text-body-sm font-medium text-link-blue mt-2 group-hover:text-link-blue/80 transition-colors">
                    Explore services <ArrowRight size={14} strokeWidth={1.75} />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <CTASection service_slug="guides-hub" />

      {/* ============================================================
         JSON-LD Schema
         ============================================================ */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

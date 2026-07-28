/**
 * Services Hub — /services
 *
 * Lists all 5 service offerings from Wasleen Approvals.
 * Each card links to the individual service page at /services/{slug}.
 *
 * Schema: WebPage + BreadcrumbList
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md — On-page SEO rules
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md — Schema generation rules
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  PenTool,
  Boxes,
  FileText,
  ClipboardCheck,
  FileCheck,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { services } from "@/data/services";
import { SITE, HUB_SLUGS } from "@/lib/constants";
import { breadcrumbList, webPageSchema } from "@/lib/schema";
import Button from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";

/* ============================================================
   Metadata
   ============================================================ */

export const metadata: Metadata = {
  title: "Our Services | 2D Drawings, 3D Design & Approvals | Wasleen",
  description:
    "Expert approval services in Dubai: 2D & 3D drawings, CAD documentation, approval management, and document clearing. End-to-end support for DM, DCD, DEWA, and developer submissions. Contact us today.",
  alternates: {
    canonical: `${SITE.url}${HUB_SLUGS.services}`,
  },
  openGraph: {
    title: "Our Services | 2D Drawings, 3D Design & Approvals | Wasleen",
    description:
      "Expert approval services in Dubai: 2D & 3D drawings, CAD documentation, approval management, and document clearing. End-to-end support for DM, DCD, DEWA, and developer submissions.",
    url: `${SITE.url}${HUB_SLUGS.services}`,
  },
  twitter: {
    title: "Our Services | 2D Drawings, 3D Design & Approvals | Wasleen",
    description:
      "Expert approval services in Dubai: 2D & 3D drawings, CAD documentation, approval management, and document clearing. End-to-end support for DM, DCD, DEWA, and developer submissions.",
  },
};

/* ============================================================
   Icon Map
   ============================================================ */

const serviceIcon: Record<string, typeof PenTool> = {
  "2d-drawings": PenTool,
  "3d-design-visualization": Boxes,
  "cad-documentation": FileText,
  "approval-management": ClipboardCheck,
  "document-clearing": FileCheck,
};

/* ============================================================
   Page Component
   ============================================================ */

const LAST_UPDATED = "2026-07-15";

export default function ServicesHubPage() {
  /* ── Schema ─────────────────────────────────────────────── */

  const schemas = [
    webPageSchema({
      url: HUB_SLUGS.services,
      title: "Our Services | 2D Drawings, 3D Design & Approvals | Wasleen",
      description:
        "Expert approval services in Dubai: 2D & 3D drawings, CAD documentation, approval management, and document clearing. End-to-end support for DM, DCD, DEWA, and developer submissions.",
      dateModified: LAST_UPDATED,
    }),
    breadcrumbList([
      { position: 1, name: "Home", slug: "/" },
      { position: 2, name: "Services", slug: HUB_SLUGS.services },
    ]),
  ];

  return (
    <>
      {/* ===== Hero / Header ===== */}
      <section className="bg-brand-blue text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <h1 className="text-h1 font-montserrat font-bold mb-3">
            Our Services
          </h1>
          <p className="text-body-lg text-white/80 max-w-3xl">
            End-to-end approval services covering everything from drawing
            preparation and CAD documentation to full approval management and
            document clearing. <strong className="text-white">{services.length} core services</strong>{" "}
            tailored to your project needs.
          </p>
          <p className="text-body-sm text-white/60 mt-2">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* ===== Service Cards ===== */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => {
              const Icon = serviceIcon[service.slug] || PenTool;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex flex-col gap-4 p-6 rounded-md bg-white border border-border-light border-l-2 border-l-transparent shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-brand-blue/40 hover:border-l-4 hover:border-l-brand-blue hover:bg-gradient-to-br hover:from-white hover:to-card-bg"
                >
                  {/* Header with icon + title + arrow */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-card-bg text-brand-blue shrink-0">
                        <Icon size={24} strokeWidth={1.75} />
                      </div>
                      <h2 className="text-h3 font-montserrat font-bold text-heading-text group-hover:text-link-blue transition-colors">
                        {service.name}
                      </h2>
                    </div>
                    <ArrowRight
                      size={20}
                      strokeWidth={1.75}
                      className="shrink-0 mt-2 text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>

                  {/* Tagline */}
                  <p className="text-body text-body-text">
                    {service.tagline}
                  </p>

                  {/* Direct answer preview */}
                  <p className="text-body-sm text-body-text/80 line-clamp-2">
                    {service.directAnswer}
                  </p>

                  {/* Features list */}
                  <div className="flex flex-col gap-1.5 mt-auto">
                    <p className="text-caption font-medium text-heading-text uppercase tracking-wide">
                      What we deliver
                    </p>
                    <ul className="space-y-1">
                      {service.features.slice(0, 4).map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-body-sm text-body-text"
                        >
                          <CheckCircle2
                            size={14}
                            strokeWidth={1.75}
                            className="shrink-0 mt-0.5 text-body-text"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {service.features.length > 4 && (
                        <li className="text-body-sm text-link-blue font-medium">
                          +{service.features.length - 4} more
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="mt-2">
                    <span className="inline-flex items-center gap-1.5 text-body-sm font-medium text-link-blue group-hover:text-link-blue/80 transition-colors">
                      Learn more
                      <ArrowRight size={14} strokeWidth={1.75} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Cross-Hub Links ===== */}
      <section className="bg-light-bg">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 font-montserrat text-heading-text mb-4">
              Complementary Resources
            </h2>
            <p className="text-body-lg text-body-text mb-8">
              Our services work hand-in-hand with our approvals expertise and educational resources.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link
                href="/approvals"
                className="flex items-start gap-4 p-6 rounded-md bg-white border border-border-light shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-brand-blue/40 group"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-card-bg text-brand-blue shrink-0">
                  <ShieldCheck size={24} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-h4 font-montserrat font-bold text-heading-text group-hover:text-link-blue transition-colors mb-1">
                    All 52+ Approval Types
                  </h3>
                  <p className="text-body-sm text-body-text">
                    Browse Dubai Municipality, DCD, DEWA, DDA, free zone, and developer approvals you may need for your project.
                  </p>
                  <span className="inline-flex items-center gap-1 text-body-sm font-medium text-link-blue mt-2 group-hover:text-link-blue/80 transition-colors">
                    View all approvals <ArrowRight size={14} strokeWidth={1.75} />
                  </span>
                </div>
              </Link>
              <Link
                href="/guides"
                className="flex items-start gap-4 p-6 rounded-md bg-white border border-border-light shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-brand-blue/40 group"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-card-bg text-brand-blue shrink-0">
                  <BookOpen size={24} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-h4 font-montserrat font-bold text-heading-text group-hover:text-link-blue transition-colors mb-1">
                    Expert Guides & Q&A
                  </h3>
                  <p className="text-body-sm text-body-text">
                    Access 30+ expert guides and Q&A resources covering Dubai approval processes, timelines, and requirements.
                  </p>
                  <span className="inline-flex items-center gap-1 text-body-sm font-medium text-link-blue mt-2 group-hover:text-link-blue/80 transition-colors">
                    Browse guides <ArrowRight size={14} strokeWidth={1.75} />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <CTASection service_slug="services-hub" />

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

/**
 * Approvals Hub — /approvals
 *
 * Lists all 52 approval types grouped by 8 categories.
 * Each card links to the individual approval page at /approvals/{slug}.
 *
 * Schema: WebPage + BreadcrumbList
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md — On-page SEO rules
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md — Schema generation rules
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Building,
  Home,
  ScrollText,
  Zap,
  UtensilsCrossed,
  Hammer,
  PenTool,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { approvals } from "@/data/approvals";
import { SITE, HUB_SLUGS } from "@/lib/constants";
import { breadcrumbList, webPageSchema } from "@/lib/schema";
import { APPROVAL_CATEGORIES, type ApprovalCategory } from "@/types";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import CTASection from "@/components/sections/CTASection";

/* ============================================================
   Metadata
   ============================================================ */

export const metadata: Metadata = {
  title: "Dubai Approvals (52+) | DM, DDA, DEWA, DCD & More | Wasleen",
  description:
    "Complete list of 52+ Dubai building and engineering approvals. Find DM permits, DCD NOCs, DEWA connections, developer approvals, free zone permits, and more. Expert guidance from Wasleen Approvals.",
  alternates: {
    canonical: `${SITE.url}${HUB_SLUGS.approvals}`,
  },
  openGraph: {
    title: "Dubai Approvals (52+) | DM, DDA, DEWA, DCD & More | Wasleen",
    description:
      "Complete list of 52+ Dubai building and engineering approvals. Find DM permits, DCD NOCs, DEWA connections, developer approvals, free zone permits, and more. Expert guidance from Wasleen Approvals.",
    url: `${SITE.url}${HUB_SLUGS.approvals}`,
  },
  twitter: {
    title: "Dubai Approvals (52+) | DM, DDA, DEWA, DCD & More | Wasleen",
    description:
      "Complete list of 52+ Dubai building and engineering approvals. Find DM permits, DCD NOCs, DEWA connections, developer approvals, free zone permits, and more.",
  },
};

/* ============================================================
   Icon Map — one Lucide icon per category
   ============================================================ */

const categoryIcon: Record<ApprovalCategory, typeof Building2> = {
  "government-regulatory": Building2,
  "free-zone": Building,
  "developer-community": Home,
  "property-registration": ScrollText,
  "technical-utility": Zap,
  "trade-food-hospitality": UtensilsCrossed,
  "fit-out-construction": Hammer,
  "drawing-documentation": PenTool,
};

/* ============================================================
   Page Component
   ============================================================ */

const LAST_UPDATED = "2026-07-15";

export default function ApprovalsHubPage() {
  /* ── Schema ─────────────────────────────────────────────── */

  const schemas = [
    webPageSchema({
      url: HUB_SLUGS.approvals,
      title: "Dubai Approvals (52+) | DM, DDA, DEWA, DCD & More | Wasleen",
      description:
        "Complete list of 52+ Dubai building and engineering approvals. Find DM permits, DCD NOCs, DEWA connections, developer approvals, free zone permits, and more.",
      dateModified: LAST_UPDATED,
    }),
    breadcrumbList([
      { position: 1, name: "Home", slug: "/" },
      { position: 2, name: "Approvals", slug: HUB_SLUGS.approvals },
    ]),
  ];

  /* ── Group approvals by category ────────────────────────── */

  const grouped = APPROVAL_CATEGORIES.map((cat) => ({
    ...cat,
    items: approvals.filter((a) => a.category === cat.value),
  })).filter((g) => g.items.length > 0);

  const totalApprovals = approvals.length;

  return (
    <>
      {/* ===== Hero / Header ===== */}
      <section className="bg-brand-blue text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <h1 className="text-h1 font-montserrat font-bold mb-3">
            All Dubai Approvals
          </h1>
          <p className="text-body-lg text-white/80 max-w-3xl">
            We manage <strong className="text-white">{totalApprovals}+ approval types</strong> across Dubai's
            regulatory landscape. Browse by category to find the specific approval
            your project needs.
          </p>
          <p className="text-body-sm text-white/60 mt-2">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* ===== Category Sections ===== */}
      {grouped.map((group) => {
        const Icon = categoryIcon[group.value];
        return (
          <section
            key={group.value}
            id={group.slug}
            className="scroll-mt-24"
          >
            <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
              {/* Category heading */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-md bg-card-bg text-brand-blue shrink-0">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <div>
                  <h2 className="text-h2 font-montserrat font-bold text-heading-text">
                    {group.label}
                  </h2>
                  <p className="text-body-sm text-body-text/70">
                    {group.items.length} approval{group.items.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Approval cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.items.map((approval) => (
                  <Link
                    key={approval.slug}
                    href={`/approvals/${approval.slug}`}
                    className="group flex flex-col gap-3 p-5 rounded-md bg-white border border-border-light border-l-2 border-l-transparent shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-brand-blue/40 hover:border-l-4 hover:border-l-brand-blue hover:bg-gradient-to-br hover:from-white hover:to-card-bg"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-h4 font-montserrat font-bold text-heading-text group-hover:text-link-blue transition-colors">
                        {approval.name}
                      </h3>
                      <ArrowRight
                        size={18}
                        strokeWidth={1.75}
                        className="shrink-0 mt-1 text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>

                    <p className="text-body-sm text-body-text line-clamp-2">
                      {approval.directAnswer.substring(0, 160)}
                    </p>

                    <div className="flex items-center gap-2 mt-auto flex-wrap">
                      <Badge variant="outline">
                        {approval.typicalTimeline}
                      </Badge>
                      <Badge variant="outline">
                        {approval.authorityAbbr}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Section divider (except last) */}
            {group !== grouped[grouped.length - 1] && (
              <div className="mx-auto max-w-7xl px-4 md:px-8">
                <hr className="border-border-light" />
              </div>
            )}
          </section>
        );
      })}

      {/* ===== CTA Section ===== */}
      <CTASection service_slug="approvals-hub" />

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

/**
 * Free Quote — 5-step wizard page for Dubai approval quotes.
 *
 * Schema: WebPage + BreadcrumbList + Organization reference
 * Form: FreeQuoteForm (client) → Google Apps Script webhook
 *
 * @see /plans/free-quote-build-plan.md
 */

import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { hreflangAlternates } from "@/lib/locale";
import { staticPageSchema } from "@/lib/schema";
import FreeQuoteForm from "@/components/sections/FreeQuoteForm";
import { CheckCircle2, ShieldCheck, Clock, FileText } from "lucide-react";

/* ============================================================
   Metadata
   ============================================================ */

export const metadata: Metadata = {
  title: "Free Dubai Approval Quote | Wasleen",
  description:
    "Get a free Dubai approval quote in 2 minutes. DM, DCD, DEWA & DDA consultants — no obligation, reply within 24 hours. Request your quote today.",
  alternates: {
    canonical: `${SITE.url}/free-quote`,
    languages: hreflangAlternates(SITE.url, "/free-quote"),
  },
  openGraph: {
    title: "Free Dubai Approval Quote | Wasleen",
    description:
      "Free Dubai approval quote for DM, DCD, DEWA & DDA. No obligation — reply within 24 hours.",
  },
};

/* ============================================================
   Trust strip items
   ============================================================ */

const trustItems = [
  {
    icon: Clock,
    text: "Quote in 24 hours",
  },
  {
    icon: ShieldCheck,
    text: "Licensed consultants",
  },
  {
    icon: CheckCircle2,
    text: "No obligation",
  },
  {
    icon: FileText,
    text: "DM · DCD · DEWA · DDA",
  },
];

/* ============================================================
   Page Component
   ============================================================ */

export default function FreeQuotePage() {
  /* ── Schema ─────────────────────────────────────────── */
  const schemas = staticPageSchema(
    {
      url: "/free-quote",
      title: "Free Dubai Approval Quote | Wasleen",
      description:
        "Get a free Dubai approval quote in 2 minutes. DM, DCD, DEWA & DDA consultants — no obligation, reply within 24 hours.",
      pageType: "WebPage",
      breadcrumbs: [
        { position: 1, name: "Home", slug: "/" },
        { position: 2, name: "Free Quote", slug: "/free-quote" },
      ],
      dateModified: "2026-08-03",
    },
    "en",
  );

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

      {/* ===== Hero ===== */}
      <section className="bg-gradient-to-br from-brand-blue via-brand-blue-hover to-brand-blue px-4 py-16 md:px-8 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-caption font-semibold text-cta-amber uppercase tracking-wide mb-3">
            Free Quote
          </p>
          <h1 className="text-h1 font-montserrat text-white mb-4">
            Get Your Free Dubai Approval Quote
          </h1>
          <p className="text-body-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Tell us about your project and receive an accurate, no-obligation
            quote for DM, DCD, DEWA or DDA approvals in as little as 24 hours —
            from licensed Dubai approval consultants.
          </p>

          {/* Trust strip */}
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {trustItems.map((item) => (
              <li
                key={item.text}
                className="inline-flex items-center gap-2 text-body-sm text-white/90"
              >
                <item.icon size={16} strokeWidth={1.75} className="text-cta-amber shrink-0" />
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== Wizard ===== */}
      <section className="bg-light-bg px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-3xl mx-auto">
          <FreeQuoteForm locale="en" />
        </div>
      </section>
    </>
  );
}

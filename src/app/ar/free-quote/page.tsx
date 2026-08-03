/**
 * Free Quote (Arabic) — 5-step wizard page for Dubai approval quotes.
 *
 * Schema: WebPage + BreadcrumbList + Organization reference
 * Form: FreeQuoteForm (client, locale="ar") → Google Apps Script webhook
 *
 * @see /plans/free-quote-build-plan.md
 */

import type { Metadata } from "next";
import { SITE, AR } from "@/lib/constants";
import { hreflangAlternates } from "@/lib/locale";
import { staticPageSchema } from "@/lib/schema";
import FreeQuoteForm from "@/components/sections/FreeQuoteForm";
import { CheckCircle2, ShieldCheck, Clock, FileText } from "lucide-react";

/* ============================================================
   Metadata
   ============================================================ */

export const metadata: Metadata = {
  title: `${AR.breadcrumb.freeQuote} | ${AR.siteShortName}`,
  description:
    "احصل على عرض سعر مجاني لموافقات دبي خلال دقيقتين — بلدية دبي، ديوا، الدفاع المدني وهيئة دبي للتطوير. دون أي التزام، والرد خلال 24 ساعة.",
  alternates: {
    canonical: `${SITE.url}/ar/free-quote`,
    languages: hreflangAlternates(SITE.url, "/ar/free-quote"),
  },
};

/* ============================================================
   Trust strip items
   ============================================================ */

const trustItems = [
  {
    icon: Clock,
    text: "عرض سعر خلال 24 ساعة",
  },
  {
    icon: ShieldCheck,
    text: "مستشارون مرخصون",
  },
  {
    icon: CheckCircle2,
    text: "دون أي التزام",
  },
  {
    icon: FileText,
    text: "بلدية دبي · ديوا · الدفاع المدني · هيئة دبي للتطوير",
  },
];

/* ============================================================
   Page Component
   ============================================================ */

export default function ArabicFreeQuotePage() {
  /* ── Schema (Arabic) ──────────────────────────────── */
  const schemas = staticPageSchema(
    {
      url: "/ar/free-quote",
      title: `${AR.breadcrumb.freeQuote} | ${AR.siteShortName}`,
      description:
        "احصل على عرض سعر مجاني لموافقات دبي خلال دقيقتين — بلدية دبي، ديوا، الدفاع المدني وهيئة دبي للتطوير. دون أي التزام، والرد خلال 24 ساعة.",
      pageType: "WebPage",
      breadcrumbs: [
        { position: 1, name: AR.breadcrumb.home, slug: "/ar" },
        { position: 2, name: AR.breadcrumb.freeQuote, slug: "/ar/free-quote" },
      ],
      dateModified: "2026-08-03",
    },
    "ar",
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
            {AR.breadcrumb.freeQuote}
          </p>
          <h1 className="text-h1 font-montserrat text-white mb-4">
            {AR.breadcrumb.freeQuote}
          </h1>
          <p className="text-body-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            أخبرنا عن مشروعك واحصل على عرض سعر دقيق ودون أي التزام لموافقات
            بلدية دبي والدفاع المدني وديوا وهيئة دبي للتطوير — من مستشارين
            مرخصين لموافقات دبي.
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
          <FreeQuoteForm locale="ar" />
        </div>
      </section>
    </>
  );
}

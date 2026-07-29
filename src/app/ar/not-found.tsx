/**
 * Arabic Not Found — صفحة غير موجودة مخصصة.
 *
 * Displays a helpful message with navigation options when an Arabic page
 * is not found. Uses the Arabic root layout header/footer.
 *
 * Schema: WebPage + BreadcrumbList (Arabic)
 *
 * @see /plans/arabic-content-overhaul-plan.md (Phase 3.3 — 404 page)
 */

import type { Metadata } from "next";
import { SITE, AR } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { Home, Search, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: AR.misc.pageNotFound,
  description: AR.misc.pageNotFoundDesc,
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${SITE.url}/ar/not-found`,
    languages: {
      en: `${SITE.url}/not-found`,
      "ar-AE": `${SITE.url}/ar/not-found`,
    },
  },
};

export default function ArabicNotFoundPage() {
  return (
    <>
      <section className="bg-white px-4 py-20 md:px-8 md:py-32">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 visual */}
          <div className="text-[8rem] md:text-[10rem] font-montserrat font-black text-brand-blue/10 leading-none mb-4 select-none">
            404
          </div>

          <h1 className="text-h1 font-montserrat text-heading-text mb-4">
            {AR.misc.pageNotFound}
          </h1>

          <p className="text-body-lg text-body-text max-w-lg mx-auto mb-10 leading-relaxed">
            {AR.misc.pageNotFoundDesc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              href="/ar"
              className="text-body font-semibold px-8 py-4"
            >
              <Home size={20} strokeWidth={1.75} />
              {AR.misc.goHome}
            </Button>

            <Button
              variant="outline"
              href="/ar/approvals"
              className="text-body font-semibold px-8 py-4"
            >
              <Search size={20} strokeWidth={1.75} />
              {AR.breadcrumb.approvals}
            </Button>

            <Button
              variant="ghost"
              href="/ar/contact-us"
              className="text-body font-semibold px-8 py-4"
            >
              <ArrowLeft size={20} strokeWidth={1.75} />
              {AR.cta.contactUs}
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================
         JSON-LD Schema
         ============================================================ */}

      {/* WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${SITE.url}/ar/not-found/#webpage`,
            url: `${SITE.url}/ar/not-found`,
            name: `${AR.misc.pageNotFound} - ${AR.siteShortName}`,
            description: AR.misc.pageNotFoundDesc,
            isPartOf: {
              "@id": `${SITE.url}/ar/#website`,
            },
            inLanguage: "ar-AE",
          }),
        }}
      />

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "@id": `${SITE.url}/ar/not-found/#breadcrumb`,
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: AR.breadcrumb.home,
                item: `${SITE.url}/ar`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: AR.misc.pageNotFound,
                item: `${SITE.url}/ar/not-found`,
              },
            ],
          }),
        }}
      />
    </>
  );
}

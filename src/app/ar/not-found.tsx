/**
 * Arabic Not Found — صفحة "لوحة التصميم المفقودة" (404) بوضع السيانوتايب الداكن.
 *
 * Same "Lost Night Sheet" experience as the English 404, fully localized for
 * Arabic (RTL via the Arabic layout wrapper) with Arabic recovery copy from
 * AR.misc.notFound* in src/lib/constants.ts.
 *
 * SEO decisions (see /plans/404-redesign-plan.md §4):
 *  - NO self-canonical on the error page
 *  - NO `alternates.languages` hreflang block — an error page never joins an
 *    EN↔AR hreflang cluster
 *  - NO WebPage / BreadcrumbList JSON-LD (noindex error pages gain nothing)
 *  - robots: index:false, follow:true retained (404 stays crawlable)
 *  - Renders inside the Arabic layout → true HTTP 404 with full AR nav intact
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Home, MessageCircle, Phone, Search } from "lucide-react";
import { NAP, AR } from "@/lib/constants";
import NotFoundScene from "@/components/notfound/NotFoundScene";
import NotFoundSearch from "@/components/notfound/NotFoundSearch";
import PopularApprovals from "@/components/notfound/PopularApprovals";

export const metadata: Metadata = {
  title: AR.misc.notFoundTitle,
  description: AR.misc.notFoundSubtitle,
  robots: {
    index: false,
    follow: true,
  },
  // Empty alternates BLOCKS the Arabic layout's canonical + EN↔AR hreflang
  // from leaking onto the error page (SEO opinion points 2 & 3 — a 404 never
  // carries a canonical nor joins an hreflang cluster).
  alternates: {},
};

export default function ArabicNotFoundPage() {
  const whatsappUrl = `https://wa.me/${NAP.whatsapp}?text=${encodeURIComponent(AR.whatsappMessage)}`;

  const ctaSecondaryClasses =
    "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-cyano-night-line bg-cyano-night-card/40 px-6 py-3 text-body font-medium text-cyano-night-ink backdrop-blur-md transition-colors hover:border-cyano-night-ink/40 hover:bg-cyano-night-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyano-night-amber/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cyano-night-bg-deep";

  const typeLabels = { approval: "موافقة", service: "خدمة", guide: "دليل" };

  return (
    <section className="relative overflow-hidden bg-cyano-night-bg-deep text-cyano-night-text">
      {/* ---- Sheet backdrop: grid + ink glow blobs ----------------------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-cyano-night-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-cyano-night-grid)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_15%,black,transparent_82%)]" />
        <div className="absolute -top-24 start-[-12%] h-80 w-80 rounded-full bg-brand-blue/25 blur-3xl" />
        <div className="absolute bottom-16 end-[-6%] h-96 w-96 rounded-full bg-cyano-night-ink/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl min-h-[80vh] flex-col justify-center px-4 py-8 md:px-8">
        {/* ---- Animated drawing scene (decorative, aria-hidden) ---------- */}
        <NotFoundScene className="min-h-0 flex-1" />

        {/* ---- Content block --------------------------------------------- */}
        <div className="mx-auto mt-10 max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-cyano-night-line bg-cyano-night-ink/10 px-4 py-1.5 text-caption font-medium tracking-wide text-cyano-night-ink-soft backdrop-blur-sm">
            {AR.misc.notFoundErrorLabel} — {AR.misc.notFoundEyebrow}
          </span>

          <h1 className="mt-5 text-h1 font-bold text-cyano-night-heading">
            {AR.misc.notFoundTitle}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-body-lg leading-relaxed text-cyano-night-ink-soft">
            {AR.misc.notFoundSubtitle}
          </p>

          <div
            role="search"
            aria-label={AR.misc.notFoundSearchPlaceholder}
            className="mx-auto mt-8 max-w-xl text-start"
          >
            <NotFoundSearch
              locale="ar"
              label={AR.misc.notFoundSearchPlaceholder}
              placeholder={AR.misc.notFoundSearchPlaceholder}
              noResults={AR.misc.notFoundSearchNoResults}
              typeLabels={typeLabels}
            />
          </div>

          {/* ---- CTA row --------------------------------------------------- */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href="/ar"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-cta-amber px-8 py-3 text-body font-semibold text-brand-black transition-colors hover:bg-cta-amber-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyano-night-amber focus-visible:ring-offset-2 focus-visible:ring-offset-cyano-night-bg-deep"
            >
              <Home size={20} strokeWidth={1.75} aria-hidden="true" />
              {AR.misc.goHome}
            </Link>
            <Link href="/ar/approvals" className={ctaSecondaryClasses}>
              <Search size={20} strokeWidth={1.75} aria-hidden="true" />
              {AR.misc.notFoundBrowseApprovals}
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={ctaSecondaryClasses}
            >
              <MessageCircle size={20} strokeWidth={1.75} aria-hidden="true" />
              واتساب
            </a>
            <Link href="/ar/contact-us" className={ctaSecondaryClasses}>
              <Phone size={20} strokeWidth={1.75} aria-hidden="true" />
              {AR.misc.notFoundContact}
            </Link>
          </div>
        </div>

        {/* ---- Popular destinations + category chips ---------------------- */}
        <PopularApprovals
          locale="ar"
          popularHeading={AR.misc.notFoundPopular}
          categoriesHeading={AR.misc.notFoundCategories}
          browseAllLabel={AR.misc.notFoundBrowseAll}
          typeLabels={typeLabels}
        />
      </div>

      {/* ---- Bottom fade → white footer (softens dark→light seam) --------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white"
      />
    </section>
  );
}

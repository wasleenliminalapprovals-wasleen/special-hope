/**
 * Not Found — 404 "Lost Night Sheet" (dark cyanotype).
 *
 * A dark Prussian-blue blueprint sheet that draws an incomplete engineering
 * drawing — the page you wanted simply isn't on this sheet — then hands the
 * visitor real recovery paths: site-wide nav (via root layout header/footer),
 * a live frost search, CTA row, popular destinations and category chips.
 *
 * SEO decisions (see /plans/404-redesign-plan.md §4):
 *  - NO self-canonical on the error page
 *  - NO WebPage / BreadcrumbList JSON-LD (noindex error pages gain nothing)
 *  - robots: index:false, follow:true retained (404 stays crawlable to bots)
 *  - Renders inside the root layout → true HTTP 404 with full nav intact
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Home, MessageCircle, Phone, Search } from "lucide-react";
import { NAP, WHATSAPP_MESSAGE } from "@/lib/constants";
import NotFoundScene from "@/components/notfound/NotFoundScene";
import NotFoundSearch from "@/components/notfound/NotFoundSearch";
import PopularApprovals from "@/components/notfound/PopularApprovals";

export const metadata: Metadata = {
  // Title WITHOUT the brand suffix — the root layout template appends it.
  title: "Page Not Found",
  description:
    "The page you're looking for doesn't exist or has been moved. Search our Dubai approvals, services and guides, or contact us for help.",
  robots: {
    index: false,
    follow: true,
  },
  // Empty alternates BLOCKS the root layout's canonical from leaking onto the
  // error page (SEO opinion point 2 — no canonical on a 404).
  alternates: {},
};

export default function NotFoundPage() {
  const whatsappUrl = `https://wa.me/${NAP.whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const ctaSecondaryClasses =
    "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-cyano-night-line bg-cyano-night-card/40 px-6 py-3 text-body font-medium text-cyano-night-ink backdrop-blur-md transition-colors hover:border-cyano-night-ink/40 hover:bg-cyano-night-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyano-night-amber/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cyano-night-bg-deep";

  return (
    <section className="relative overflow-hidden bg-cyano-night-bg-deep text-cyano-night-text">
      {/* ---- Sheet backdrop: grid + ink glow blobs ----------------------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-cyano-night-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-cyano-night-grid)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_15%,black,transparent_82%)]" />
        <div className="absolute -top-24 start-[-12%] h-80 w-80 rounded-full bg-brand-blue/25 blur-3xl" />
        <div className="absolute bottom-16 end-[-6%] h-96 w-96 rounded-full bg-cyano-night-ink/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
        {/* ---- Animated drawing scene (decorative, aria-hidden) ---------- */}
        <NotFoundScene />

        {/* ---- Content block --------------------------------------------- */}
        <div className="mx-auto mt-10 max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-cyano-night-line bg-cyano-night-ink/10 px-4 py-1.5 text-caption font-medium tracking-wide text-cyano-night-ink-soft backdrop-blur-sm">
            Error 404 — Page Not Found
          </span>

          <h1 className="mt-5 text-h1 font-montserrat font-bold text-cyano-night-heading">
            We couldn't find that page.
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-body-lg leading-relaxed text-cyano-night-ink-soft">
            The drawing you're looking for isn't on this sheet. It may have been
            moved, renamed, or never existed. Let's get you back on plan.
          </p>

          <div
            role="search"
            aria-label="Search approvals, services and guides"
            className="mx-auto mt-8 max-w-xl text-start"
          >
            <NotFoundSearch
              locale="en"
              label="Search our approvals, services and guides"
              placeholder='Try "Dubai Municipality approval" or "DEWA connection"'
              noResults="No matching results. Try another keyword or browse the categories below."
              typeLabels={{ approval: "Approval", service: "Service", guide: "Guide" }}
            />
          </div>

          {/* ---- CTA row --------------------------------------------------- */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href="/"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-cta-amber px-8 py-3 text-body font-semibold text-brand-black transition-colors hover:bg-cta-amber-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyano-night-amber focus-visible:ring-offset-2 focus-visible:ring-offset-cyano-night-bg-deep"
            >
              <Home size={20} strokeWidth={1.75} aria-hidden="true" />
              Go Home
            </Link>
            <Link href="/approvals" className={ctaSecondaryClasses}>
              <Search size={20} strokeWidth={1.75} aria-hidden="true" />
              Browse Approvals
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={ctaSecondaryClasses}
            >
              <MessageCircle size={20} strokeWidth={1.75} aria-hidden="true" />
              WhatsApp us
            </a>
            <Link href="/contact-us" className={ctaSecondaryClasses}>
              <Phone size={20} strokeWidth={1.75} aria-hidden="true" />
              Contact Us
            </Link>
          </div>
        </div>

        {/* ---- Popular destinations + category chips ---------------------- */}
        <PopularApprovals
          locale="en"
          popularHeading="Popular destinations"
          categoriesHeading="Browse by category"
          browseAllLabel="Browse all approvals"
          typeLabels={{ approval: "Approval", service: "Service", guide: "Guide" }}
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

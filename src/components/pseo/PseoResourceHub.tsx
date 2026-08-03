/**
 * PseoResourceHub — "Resource Hubs" grid that surfaces programmatic SEO
 * (pSEO) pages so they are internally linked from hub pages instead of
 * remaining orphan URLs. Locale-aware (EN / AR).
 *
 * - Loads generated pSEO pages via loadPseoPages() (server-only).
 * - Renders a colorful gradient card grid with per-kind badges.
 * - Links to /guides/{slug} (EN) or /ar/guides/{slug} (AR).
 *
 * SERVER COMPONENT — uses node:fs through lib/pseo-data, so it must only be
 * imported from server components / route handlers (never client components).
 * Returns `null` when no pSEO pages have been generated yet, so the layout is
 * never broken by an empty data file.
 *
 * @see plans/pseo-domination-engine-plan.md
 */

import Link from "next/link";
import { Layers, ArrowRight, ArrowLeft } from "lucide-react";
import { loadPseoPages, getPseoArabicEntry } from "@/lib/pseo-data";
import type { PseoPageKind } from "@/types";

interface PseoResourceHubProps {
  /** Rendering locale — uses Arabic titles/descriptions when "ar". */
  locale?: "en" | "ar";
  /** Max cards to render — omit or 0 to render all generated pages. */
  limit?: number;
  /** Override the section heading (defaults to the localized default). */
  heading?: string;
  /** Override the section subheading. */
  subheading?: string;
  /** Show a "view all guides" link to the guides hub. */
  showViewAll?: boolean;
}

/** Localized labels for each pSEO page kind. */
const KIND_LABELS: Record<PseoPageKind, { en: string; ar: string }> = {
  guide: { en: "Complete Guide", ar: "دليل شامل" },
  qa: { en: "Q&A", ar: "سؤال وجواب" },
  checklist: { en: "Checklist", ar: "قائمة تحقق" },
  cost: { en: "Cost Guide", ar: "دليل الرسوم والتكاليف" },
  timeline: { en: "Timeline Guide", ar: "دليل المدة الزمنية" },
  compare: { en: "Comparison", ar: "مقارنة" },
  glossary: { en: "Glossary", ar: "مصطلحات" },
};

/** Vivid, readable badge colors per kind (design tokens only). */
const KIND_BADGE: Record<PseoPageKind, string> = {
  guide: "bg-brand-blue text-white",
  qa: "bg-link-blue text-white",
  checklist: "bg-success-green text-white",
  cost: "bg-cta-amber text-brand-black",
  timeline: "bg-brand-blue-hover text-white",
  compare: "bg-brand-blue text-white",
  glossary: "bg-link-blue text-white",
};

/** Colorful top accent strip gradient per kind (design tokens only). */
const KIND_STRIP: Record<PseoPageKind, string> = {
  guide: "from-brand-blue to-link-blue",
  qa: "from-link-blue to-brand-blue",
  checklist: "from-success-green to-brand-blue",
  cost: "from-cta-amber to-cta-amber-hover",
  timeline: "from-link-blue to-brand-blue-hover",
  compare: "from-brand-blue to-success-green",
  glossary: "from-brand-blue to-link-blue",
};

/** Soft, colorful gradient card background per kind (design tokens only). */
const KIND_GRADIENT: Record<PseoPageKind, string> = {
  guide: "bg-gradient-to-br from-brand-blue/20 via-card-bg to-link-blue/20",
  qa: "bg-gradient-to-br from-link-blue/20 via-card-bg to-brand-blue/20",
  checklist: "bg-gradient-to-br from-success-green/20 via-card-bg to-brand-blue/20",
  cost: "bg-gradient-to-br from-cta-amber/25 via-card-bg to-cta-amber-hover/20",
  timeline: "bg-gradient-to-br from-link-blue/20 via-card-bg to-brand-blue/20",
  compare: "bg-gradient-to-br from-brand-blue/20 via-card-bg to-success-green/20",
  glossary: "bg-gradient-to-br from-link-blue/20 via-card-bg to-brand-blue/20",
};

export default function PseoResourceHub({
  locale = "en",
  limit,
  heading,
  subheading,
  showViewAll = false,
}: PseoResourceHubProps) {
  const isAr = locale === "ar";

  /* Load generated pSEO pages (empty array → component renders nothing). */
  const pages = loadPseoPages();

  /* For Arabic, only surface pages that actually have an Arabic entry so we
     never link to a URL that would 404 (see /ar/guides/[slug] static params). */
  const localized = isAr
    ? pages.filter((p) => Boolean(p.ar) || Boolean(getPseoArabicEntry(p.slug)))
    : pages;

  const items = limit && limit > 0 ? localized.slice(0, limit) : localized;

  if (items.length === 0) return null;

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const resolvedHeading =
    heading ?? (isAr ? "مراكز الموارد — أدلة متخصصة" : "Resource Hubs — Specialist Guides");
  const resolvedSub =
    subheading ??
    (isAr
      ? "أدلة تفصيلية متعمقة أعدّها خبراؤنا لتغطية مواقف الموافقات في دبي"
      : "In-depth programmatic guides built by our experts to cover every Dubai approval scenario");

  return (
    <section aria-labelledby="pseo-resource-hubs-heading">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-brand-blue text-white shrink-0">
            <Layers size={22} strokeWidth={1.75} />
          </div>
          <div>
            <h2
              id="pseo-resource-hubs-heading"
              className="text-h2 font-montserrat font-bold text-heading-text"
            >
              {resolvedHeading}
            </h2>
            <p className="text-body-sm text-body-text/70">{resolvedSub}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((page) => {
            const arEntry = isAr ? getPseoArabicEntry(page.slug)?.ar : undefined;
            const title = arEntry?.title ?? page.title;
            const description =
              arEntry?.metaDescription ?? page.metaDescription ?? page.directAnswer ?? "";
            const href = isAr ? `/ar/guides/${page.slug}` : `/guides/${page.slug}`;
            const label = KIND_LABELS[page.kind] ?? KIND_LABELS.guide;
            const badgeClass = KIND_BADGE[page.kind] ?? KIND_BADGE.guide;
            const stripClass = KIND_STRIP[page.kind] ?? KIND_STRIP.guide;
            const gradientClass = KIND_GRADIENT[page.kind] ?? KIND_GRADIENT.guide;

            return (
              <Link
                key={page.slug}
                href={href}
                aria-label={title}
                className={`group relative flex flex-col gap-3 p-6 rounded-md overflow-hidden border border-border-light shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg ${gradientClass}`}
              >
                {/* Colorful top accent strip */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${stripClass}`}
                />

                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-sm text-caption font-medium ${badgeClass}`}
                  >
                    {isAr ? label.ar : label.en}
                  </span>
                  <ArrowIcon
                    size={18}
                    strokeWidth={1.75}
                    className="shrink-0 mt-1 text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                <h3 className="text-h4 font-montserrat font-bold text-heading-text group-hover:text-link-blue transition-colors line-clamp-2">
                  {title}
                </h3>

                <p className="text-body-sm text-body-text line-clamp-3">{description}</p>

                <span className="inline-flex items-center gap-1 text-body-sm font-medium text-link-blue mt-auto group-hover:text-link-blue/80 transition-colors">
                  {isAr ? "اقرأ الدليل" : "Read the guide"}
                  <ArrowIcon size={14} strokeWidth={1.75} />
                </span>
              </Link>
            );
          })}
        </div>

        {showViewAll && (
          <div className="mt-8 flex justify-center">
            <Link
              href={isAr ? "/ar/guides" : "/guides"}
              className="inline-flex items-center gap-2 rounded-md bg-brand-blue px-5 py-2.5 text-body-sm font-medium text-white transition-colors hover:bg-brand-blue-hover"
            >
              {isAr ? "عرض جميع الأدلة" : "View all guides"}
              <ArrowIcon size={16} strokeWidth={1.75} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

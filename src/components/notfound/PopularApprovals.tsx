/**
 * PopularApprovals — "Lost Night Sheet" recovery destinations (server component).
 *
 * Renders two recovery affordances for the dark 404 pages:
 *   1. A grid of frost "destination cards" from NOTFOUND_POPULAR (the highest
 *      value approval pages visitors are most likely to actually want).
 *   2. Category chips from NOTFOUND_CATEGORIES that deep-link into the
 *      approvals hub.
 *
 * Server component by design — no client JS needed. All links are real
 * server-rendered <a href> anchors (no JS-only navigation). Localized labels
 * and the hrefs are selected by the `locale` prop; layout uses CSS logical
 * properties only, so the component is fully RTL-safe without any JS.
 */

import Link from "next/link";
import { ArrowUpRight, BookOpen, ChevronRight, FileText, Wrench } from "lucide-react";
import { NOTFOUND_POPULAR, NOTFOUND_CATEGORIES, type NotFoundLinkType } from "@/data/notfound-links";

interface PopularApprovalsProps {
  /** Active locale — selects title/href variants */
  locale: "en" | "ar";
  /** Heading for the popular cards section */
  popularHeading: string;
  /** Heading for the category chips section */
  categoriesHeading: string;
  /** Link text for "Browse all approvals" (points to the approvals hub) */
  browseAllLabel: string;
  /** Localized labels for each content-type badge */
  typeLabels: { approval: string; service: string; guide: string };
}

const TYPE_ICONS: Record<NotFoundLinkType, typeof FileText> = {
  approval: FileText,
  service: Wrench,
  guide: BookOpen,
};

export default function PopularApprovals({
  locale,
  popularHeading,
  categoriesHeading,
  browseAllLabel,
  typeLabels,
}: PopularApprovalsProps) {
  const browseAllHref = locale === "en" ? "/approvals" : "/ar/approvals";

  const typeColor = (type: NotFoundLinkType): string => {
    switch (type) {
      case "approval":
        return "text-cyano-night-amber";
      case "service":
        return "text-cyano-night-ink";
      default:
        return "text-cyano-night-ink-soft";
    }
  };

  return (
    <div className="mt-12">
      {/* ---- Popular approvals — frost destination cards ---------------- */}
      <section aria-labelledby="notfound-popular-heading">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2
            id="notfound-popular-heading"
            className="text-h4 font-bold text-cyano-night-heading"
          >
            {popularHeading}
          </h2>
          <Link
            href={browseAllHref}
            className="inline-flex min-h-[44px] items-center gap-1.5 text-body-sm font-medium text-cyano-night-amber transition-colors hover:text-cyano-night-text"
          >
            {browseAllLabel}
            <ArrowUpRight
              className="size-4 transition-transform ltr:group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </Link>
        </div>

        <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NOTFOUND_POPULAR.map((link) => {
            const Icon = TYPE_ICONS[link.type];
            const href = locale === "en" ? link.href : link.hrefAr;
            const title = locale === "en" ? link.title : link.titleAr;
            return (
              <li key={link.id}>
                <Link
                  href={href}
                  className="group flex min-h-[72px] items-center gap-3 rounded-xl border border-cyano-night-line bg-cyano-night-card/60 p-4 backdrop-blur-xl transition-colors hover:border-cyano-night-amber/70 hover:bg-cyano-night-surface focus-visible:ring-2 focus-visible:ring-cyano-night-amber/40"
                >
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-lg border border-cyano-night-line bg-cyano-night-bg-deep/60 ${typeColor(link.type)}`}
                  >
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-body-sm font-medium text-cyano-night-text transition-colors group-hover:text-cyano-night-heading">
                      {title}
                    </span>
                    <span
                      className={`mt-0.5 block text-caption ${typeColor(link.type)}`}
                    >
                      {typeLabels[link.type]}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-cyano-night-ink-soft transition-all ltr:group-hover:translate-x-0.5 ltr:group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5 rtl:group-hover:-translate-y-0.5 group-hover:text-cyano-night-amber"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ---- Category chips -------------------------------------------- */}
      <section aria-labelledby="notfound-categories-heading" className="mt-10">
        <h2
          id="notfound-categories-heading"
          className="text-h4 font-bold text-cyano-night-heading"
        >
          {categoriesHeading}
        </h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {NOTFOUND_CATEGORIES.map((cat) => {
            const href = locale === "en" ? cat.href : cat.hrefAr;
            const label = locale === "en" ? cat.label : cat.labelAr;
            return (
              <li key={cat.value}>
                <Link
                  href={href}
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-cyano-night-line bg-cyano-night-card/50 px-4 py-2 text-caption font-medium text-cyano-night-ink-soft backdrop-blur-md transition-colors hover:border-cyano-night-amber/60 hover:text-cyano-night-amber focus-visible:ring-2 focus-visible:ring-cyano-night-amber/40"
                >
                  {label}
                  <ChevronRight
                    className="size-4 rtl:rotate-180"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

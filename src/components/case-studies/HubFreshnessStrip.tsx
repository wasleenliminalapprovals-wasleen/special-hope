import Link from "next/link";
import { CheckCircle2, CircleDot, Clock3, FileClock } from "lucide-react";
import type { ApprovalCaseStudy } from "@/types/case-study";

/**
 * HubFreshnessStrip — Z4 freshness strip (server).
 *
 * Part 19 §19.4.4. Sits above the register grid and lists the top 4 entries
 * by `lastUpdated` desc — a visible E-E-A-T freshness signal ("this register
 * moves"). Renders only real SSR data; `lastUpdated` values come from the
 * case-study array so the strip updates automatically as new proofs land.
 *
 * @see plans/case-studies-mega-plan.md §19.4.4
 */

export interface HubFreshnessItem {
  slug: string;
  projectTitle: string;
  sourceRef: string;
  lastUpdated: string;
  projectStatus: ApprovalCaseStudy["projectStatus"];
}

export interface HubFreshnessStripProps {
  /** Top 4 entries by `lastUpdated` desc — pre-sorted by the caller. */
  recent: HubFreshnessItem[];
}

/** en-GB, UTC-stable date (mirrors the detail-page formatDate helper). */
function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** Tiny status glyph — icon + colour, never colour-only (Part 19.4.5 rule). */
function StatusGlyph({
  status,
}: {
  status: ApprovalCaseStudy["projectStatus"];
}) {
  if (status === "completed") {
    return (
      <CheckCircle2
        size={14}
        strokeWidth={1.75}
        className="shrink-0 text-success-green"
        aria-hidden="true"
      />
    );
  }
  if (status === "in-progress") {
    return (
      <CircleDot
        size={14}
        strokeWidth={1.75}
        className="shrink-0 text-cta-amber"
        aria-hidden="true"
      />
    );
  }
  return (
    <FileClock
      size={14}
      strokeWidth={1.75}
      className="shrink-0 text-body-text/50"
      aria-hidden="true"
    />
  );
}

export default function HubFreshnessStrip({ recent }: HubFreshnessStripProps) {
  if (recent.length === 0) return null;

  return (
    <section
      aria-labelledby="recently-updated"
      className="rounded-md border border-border-light bg-white p-5 shadow-card"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Clock3
          size={20}
          strokeWidth={1.75}
          className="shrink-0 text-brand-blue"
          aria-hidden="true"
        />
        <h2
          id="recently-updated"
          className="text-h4 font-montserrat font-bold text-heading-text"
        >
          Recently updated
        </h2>
        <Link
          href="/case-studies"
          className="cs-underline-grow ml-auto inline-flex items-center gap-1 text-body-sm font-medium text-link-blue hover:text-brand-blue-hover"
        >
          View register
        </Link>
      </div>

      <p className="mt-2 text-body-sm text-body-text/70">
        The most recently updated proof documents in the register.
      </p>

      <ul className="cs-fresh-row mt-4 flex gap-3 overflow-x-auto">
        {recent.map((item) => (
          <li
            key={item.slug}
            className="min-w-[240px] flex-none rounded-md border border-border-light bg-light-bg p-4"
          >
            <div className="flex items-center gap-1.5">
              <StatusGlyph status={item.projectStatus} />
              <span className="font-mono text-caption text-body-text/70">
                {item.sourceRef}
              </span>
              <span className="ml-auto font-mono text-caption text-body-text/60">
                {formatDate(item.lastUpdated)}
              </span>
            </div>
            <h3 className="mt-2 font-montserrat text-body font-bold leading-snug text-heading-text">
              <Link
                href={`/case-studies/${item.slug}`}
                className="cs-underline-grow"
              >
                {item.projectTitle}
              </Link>
            </h3>
          </li>
        ))}
      </ul>
    </section>
  );
}

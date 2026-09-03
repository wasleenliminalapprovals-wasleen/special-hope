"use client";

/**
 * HubAuthorityRail — Z3 authority quick-jump pill row (Part 19 §19.4.3).
 *
 * Client-side only filter pills — they never change the URL (near-duplicate
 * protection, Part 1.3). Filter state lives in the `CaseStudyHub`
 * orchestrator, which also fires `case_study_hub_authority_jump` via
 * `onSelect` — this rail is purely presentational.
 *
 * The row scrolls horizontally (no wrapping buttons at 360px) and wraps on
 * `md+`. Each pill is `aria-pressed` for assistive tech. Counts are mono.
 */

export interface HubAuthorityCount {
  /** Raw authority string (matches the `authority` facet value). */
  key: string;
  /** Short display code, e.g. "DCD". */
  label: string;
  /** Number of register entries involving this authority. */
  count: number;
}

export interface HubAuthorityRailProps {
  /** Currently active authority (null = All). */
  active: string | null;
  /** Called with the selected authority string, or null for All. */
  onSelect: (authority: string | null) => void;
  /** Per-authority counts, rendered after the "All" pill. */
  counts: HubAuthorityCount[];
}

export default function HubAuthorityRail({
  active,
  onSelect,
  counts,
}: HubAuthorityRailProps) {
  const total = counts.reduce((sum, c) => sum + c.count, 0);

  return (
    <div
      role="group"
      aria-label="Filter register by authority"
      className="cs-pill-row flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible"
    >
      <button
        type="button"
        aria-pressed={active === null}
        onClick={() => onSelect(null)}
        className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-body-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${
          active === null
            ? "border-brand-blue bg-brand-blue text-white"
            : "border-border-light bg-white text-body-text hover:border-brand-blue"
        }`}
      >
        All
        <span
          className={`font-mono text-caption ${
            active === null ? "text-white/80" : "text-body-text/60"
          }`}
        >
          {total}
        </span>
      </button>

      {counts.map(({ key, label, count }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(isActive ? null : key)}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-body-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${
              isActive
                ? "border-brand-blue bg-brand-blue text-white"
                : "border-border-light bg-white text-body-text hover:border-brand-blue"
            }`}
          >
            {label}
            <span
              className={`font-mono text-caption ${
                isActive ? "text-white/80" : "text-body-text/60"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

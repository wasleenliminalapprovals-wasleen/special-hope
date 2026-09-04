/**
 * Arabic Case Study Hub — Authority Filter Rail (Z3)
 *
 * Arabic twin of `src/components/case-studies/HubAuthorityRail.tsx` for the
 * `/ar/case-studies` hub (mega-plan Part 19 Step 6c). "use client" — a
 * controlled presentational row; parent owns state. Pills show Latin authority
 * short codes (DCD, DDA, DM…) — standard entity identifiers already used across
 * the site's Arabic pages (gate 11.3 exception for Latin acronyms).
 *
 * @see plans/case-studies-mega-plan.md Part 19 Z3
 */
"use client";

import {
  AR_CASE_STUDY_ALL_LABEL,
  AR_CASE_STUDY_FILTER_AUTHORITY_ARIA,
} from "./ar-labels";

export interface ArHubAuthorityCount {
  key: string;
  label: string;
  count: number;
}

export interface ArHubAuthorityRailProps {
  active: string | null;
  onSelect: (authority: string | null) => void;
  counts: ArHubAuthorityCount[];
}

export default function ArHubAuthorityRail({
  active,
  onSelect,
  counts,
}: ArHubAuthorityRailProps) {
  const total = counts.reduce((sum, item) => sum + item.count, 0);

  return (
    <div
      role="group"
      aria-label={AR_CASE_STUDY_FILTER_AUTHORITY_ARIA}
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
        {AR_CASE_STUDY_ALL_LABEL}
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

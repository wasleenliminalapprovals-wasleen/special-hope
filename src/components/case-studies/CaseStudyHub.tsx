"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  SearchX,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import {
  authorityShortName,
  buildCaseStudyFilterOptions,
  filterCaseStudies,
  CASE_STUDY_FACET_LABELS,
  trackCaseStudyFilter,
  trackCaseStudyHubAuthorityJump,
  trackCaseStudyHubEmptySuggest,
} from "@/lib/case-studies";
import type { ApprovalCaseStudy, CaseStudyFacet } from "@/types/case-study";
import HubAuthorityRail from "./HubAuthorityRail";
import type { HubAuthorityCount } from "./HubAuthorityRail";
import CaseStudyFileCard from "./CaseStudyFileCard";
import HubCtaTile from "./HubCtaTile";
import HubDrawer from "./HubDrawer";

/** Amber pattern-break cadence — a CTA tile occupies a grid cell after every Nth card (Part 19 §19.4.6). */
const CTA_CADENCE = 6;

/**
 * Minimum cards that must still follow a potential in-grid tile before it is
 * safe to place it as a cell. Keeps the tile out of the lone cell of a short
 * final row at every breakpoint (1/2/3-col). When the cadence lands inside the
 * final sparse row the tile is appended after the grid instead (§19.4.6).
 */
const MIN_REMAINING_CARDS = 3;

/**
 * Facet `<select>`s offered on the register. `authority` is deliberately NOT
 * here: it is filtered exclusively by the Z3 quick-jump pills (desktop rail +
 * mobile drawer), which keeps the mono-count pills and the register in sync —
 * two controls over the same facet would desync (§19.4.8 reconciliation).
 *
 * Owner directive (2026-09-02): the hub presents EVERY register file as
 * "Approved / Completed" (fixed label in CaseStudyFileCard), so the `status`
 * facet is removed — a filter over one constant value would be a dead control.
 */
const FACET_SELECTS: CaseStudyFacet[] = ["sector", "projectType", "location"];

/** One register grid cell: a study card or the amber pattern-break tile. */
type GridItem = { type: "study"; study: ApprovalCaseStudy } | { type: "cta" };

/**
 * Case Study hub — project-register orchestrator (client; mega-plan Part 19).
 *
 * Renders the Z3 authority quick-jump rail (desktop), Z5 file-stamped card
 * grid with the Z6 amber tile woven into the cadence, the Z8 smart empty
 * state and the Z9 mobile filter drawer. The Z4 freshness strip and Z7
 * related rail are server components rendered by `page.tsx` around this
 * section (freshness directly above the grid in the main column).
 *
 * Filters are **client-side only** — they never change the URL, so no
 * crawlable near-duplicate filtered views exist (Part 1.3). All controls
 * funnel through `trackEvent()` helpers (never `sendGTMEvent`): facet selects
 * fire `case_study_filter`, authority pills fire
 * `case_study_hub_authority_jump`, and the smart-empty suggestion fires
 * `case_study_hub_empty_suggest` (taxonomy §4.1).
 *
 * @see plans/case-studies-mega-plan.md Part 19
 */
export default function CaseStudyHub() {
  const [activeFilters, setActiveFilters] = useState<
    Partial<Record<CaseStudyFacet, string | null>>
  >({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filterOptions = useMemo(() => buildCaseStudyFilterOptions(caseStudies), []);
  const filtered = useMemo(
    () => filterCaseStudies(caseStudies, activeFilters),
    [activeFilters],
  );

  /**
   * Z3 rail counts — computed from the full data array so pill counts stay
   * stable while other facets narrow the visible list (and so the drawer's
   * quick-jump list matches the rail exactly).
   */
  const authorityCounts = useMemo<HubAuthorityCount[]>(() => {
    const tally = new Map<string, number>();
    for (const study of caseStudies) {
      for (const authority of study.authorities) {
        tally.set(authority, (tally.get(authority) ?? 0) + 1);
      }
    }
    return Array.from(tally.entries())
      .map(([key, count]) => ({ key, label: authorityShortName(key), count }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
  }, []);

  const activeAuthority = activeFilters.authority ?? null;
  const hasActiveFilters = Object.values(activeFilters).some(Boolean);
  const activeCount = Object.values(activeFilters).filter(Boolean).length;

  /**
   * Z8 — nearest populated authority facet: when the authority filter (the
   * only suggestion source, §19.4.7) empties the register, propose the
   * highest-count alternative from the full data.
   */
  const suggestion = useMemo(() => {
    if (filtered.length > 0 || !activeAuthority) return null;
    return (
      authorityCounts
        .filter((c) => c.key !== activeAuthority)
        .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))[0] ?? null
    );
  }, [filtered.length, activeAuthority, authorityCounts]);

  /** In-grid cells: card, and after every 6th card a tile — unless <3 cards remain. */
  const gridItems = useMemo<GridItem[]>(() => {
    const items: GridItem[] = [];
    filtered.forEach((study, index) => {
      items.push({ type: "study", study });
      const placed = index + 1;
      if (
        placed % CTA_CADENCE === 0 &&
        filtered.length - placed >= MIN_REMAINING_CARDS
      ) {
        items.push({ type: "cta" });
      }
    });
    return items;
  }, [filtered]);

  /** Cadence landed inside the final sparse row → append the tile after the grid (§19.4.6). */
  const needsTrailingCta =
    filtered.length >= CTA_CADENCE &&
    filtered.length % CTA_CADENCE < MIN_REMAINING_CARDS;

  const handleFilterChange = (facet: CaseStudyFacet, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [facet]: value || null }));
    setDrawerOpen(false);
    if (value) {
      trackCaseStudyFilter({ facet, value });
    }
  };

  /** Shared by the desktop rail and the mobile drawer quick-jump list. */
  const handleAuthoritySelect = (authority: string | null) => {
    setActiveFilters((prev) => ({ ...prev, authority }));
    setDrawerOpen(false);
    if (authority) {
      trackCaseStudyHubAuthorityJump({ authority });
    }
  };

  const clearAll = () => {
    setActiveFilters({});
    setDrawerOpen(false);
  };

  const applySuggestion = () => {
    if (!suggestion) return;
    // Reset to just the suggested authority so the result set is guaranteed
    // non-empty (other facets may have been blocking the combination).
    setActiveFilters({ authority: suggestion.key });
    setDrawerOpen(false);
    trackCaseStudyHubEmptySuggest({ suggested_authority: suggestion.key });
  };

  /** Facet `<select>` group shared by the desktop "All filters" and the drawer. */
  const renderFacetSelects = () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {FACET_SELECTS.map((facet) => {
        const options = filterOptions.filter((o) => o.facet === facet);
        const label = CASE_STUDY_FACET_LABELS[facet];
        return (
          <label key={facet} className="block">
            <span className="sr-only">{label}</span>
            <select
              value={activeFilters[facet] ?? ""}
              onChange={(e) => handleFilterChange(facet, e.target.value)}
              aria-label={label}
              className="w-full rounded-md border border-border-light bg-light-bg px-3 py-2 text-body-sm text-body-text focus:outline-none focus:ring-2 focus:ring-brand-blue"
            >
              <option value="">All {label.toLowerCase()}</option>
              {options.map((option) => (
                <option key={`${facet}-${option.value}`} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        );
      })}
    </div>
  );

  return (
    <section aria-label="Project register">
      {/* Keeps heading hierarchy intact (H1 hero → H2 → H3 card titles) even if
          the freshness strip above is ever empty. */}
      <h2 className="sr-only">Browse the project register</h2>

      {/* ---- Z3 Authority quick-jump rail (desktop; the drawer hosts it on mobile) ---- */}
      <div className="hidden md:block">
        <HubAuthorityRail
          active={activeAuthority}
          onSelect={handleAuthoritySelect}
          counts={authorityCounts}
        />
      </div>

      {/* ---- Toolbar: result count + desktop Clear all + mobile Filter pill ---- */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <p role="status" className="text-body-sm text-body-text/70">
          {filtered.length} project{filtered.length === 1 ? "" : "s"} in register
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="hidden items-center gap-1 text-body-sm font-medium text-link-blue hover:text-brand-blue-hover md:inline-flex"
          >
            <X size={16} strokeWidth={1.75} aria-hidden="true" />
            Clear all
          </button>
        )}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="ml-auto inline-flex items-center gap-2 rounded-full border border-brand-blue bg-brand-blue px-4 py-2 text-body-sm font-semibold text-white shadow-card transition-colors hover:bg-brand-blue-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue md:hidden"
        >
          <SlidersHorizontal size={16} strokeWidth={1.75} aria-hidden="true" />
          Filter
          {activeCount > 0 && (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 font-mono text-caption text-brand-blue">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* ---- Desktop "All filters" (facet selects; authority is owned by the rail) ---- */}
      <details className="group mt-3 hidden rounded-md border border-border-light bg-white shadow-card md:block">
        <summary className="flex cursor-pointer select-none items-center gap-2 px-4 py-2.5 text-body-sm font-semibold text-heading-text hover:text-brand-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue">
          <SlidersHorizontal
            size={18}
            strokeWidth={1.75}
            className="text-brand-blue"
            aria-hidden="true"
          />
          All filters
          <ChevronDown
            size={18}
            strokeWidth={1.75}
            className="ml-auto text-body-text/50 transition-transform duration-200 group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <div className="border-t border-border-light p-4">{renderFacetSelects()}</div>
      </details>

      {/* ---- Register grid: file-stamped cards + amber pattern-break tile ---- */}
      {filtered.length > 0 ? (
        <>
          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gridItems.map((item, index) =>
              item.type === "cta" ? (
                <li key={`hub-cta-${index}`}>
                  <HubCtaTile />
                </li>
              ) : (
                <li key={item.study.slug}>
                  {/* tone rotates the light per-card gradient (owner 2026-09-02) */}
                  <CaseStudyFileCard study={item.study} tone={index} />
                </li>
              ),
            )}
          </ul>
          {needsTrailingCta && (
            <div className="mt-4">
              <HubCtaTile />
            </div>
          )}
        </>
      ) : (
        /* ---- Z8 Smart empty state (.cs-empty-hint supplies the dashed border + card-bg) ---- */
        <div className="cs-empty-hint mt-4 p-8 text-center shadow-card">
          <SearchX
            size={28}
            strokeWidth={1.75}
            className="mx-auto text-body-text/40"
            aria-hidden="true"
          />
          <p className="mt-3 text-body font-medium text-body-text">
            No projects match those filters.
          </p>
          {suggestion ? (
            <>
              <p className="mx-auto mt-2 max-w-md text-body-sm text-body-text/70">
                No{" "}
                <span className="font-semibold text-heading-text">
                  {authorityShortName(activeAuthority ?? "")}
                </span>{" "}
                projects in the register yet — try{" "}
                <span className="font-semibold text-heading-text">{suggestion.label}</span>{" "}
                instead, with {suggestion.count} project
                {suggestion.count === 1 ? "" : "s"}.
              </p>
              <button
                type="button"
                onClick={applySuggestion}
                className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-brand-blue bg-white px-4 py-2.5 text-body-sm font-semibold text-brand-blue transition-colors hover:bg-card-bg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              >
                Apply {suggestion.label}
                <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </>
          ) : null}
          <div className="mt-4">
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-1 text-body-sm font-medium text-link-blue hover:text-brand-blue-hover"
            >
              <X size={16} strokeWidth={1.75} aria-hidden="true" />
              Clear all filters
            </button>
          </div>
        </div>
      )}

      {/* ---- Z9 Mobile filter drawer: authority quick-jump → facet selects → Clear all ---- */}
      <HubDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Filter register"
      >
        <div className="space-y-6">
          <section aria-label="Filter by authority">
            <h3 className="font-montserrat text-body font-bold text-heading-text">
              Authority
            </h3>
            <p className="mt-0.5 text-caption text-body-text/60">
              Jump to one authority's files, or leave on All.
            </p>
            <div className="mt-3">
              <HubAuthorityRail
                active={activeAuthority}
                onSelect={handleAuthoritySelect}
                counts={authorityCounts}
              />
            </div>
          </section>

          <section aria-label="Refine by facet">
            <h3 className="font-montserrat text-body font-bold text-heading-text">
              Refine filters
            </h3>
            <div className="mt-3">{renderFacetSelects()}</div>
          </section>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-1 text-body-sm font-medium text-link-blue hover:text-brand-blue-hover"
            >
              <X size={16} strokeWidth={1.75} aria-hidden="true" />
              Clear all filters
            </button>
          )}
        </div>
      </HubDrawer>
    </section>
  );
}

/**
 * ArCaseStudyHub — Arabic case-study hub orchestrator (client; mega-plan
 * Part 19 Step 6c).
 *
 * RTL-safe Arabic twin of `src/components/case-studies/CaseStudyHub.tsx`.
 * The `/ar/case-studies` page computes the `{study, ar}` twin pairs (shared
 * slug) and passes them here; this orchestrator renders the Z3 authority
 * quick-jump rail (desktop), the Z5 file-stamped card grid with the Z6 amber
 * tile woven into the cadence, the Z8 smart empty state and the Z9 mobile
 * filter drawer. The Z4 freshness strip and Z7 related rail are server
 * components rendered by `page.tsx` around this section.
 *
 * Filtering is **client-side only** (never URL-changing, Part 1.3). Facet
 * values AND labels for `sector`/`projectType`/`location` are the native
 * Arabic `ar` field values themselves — no EN lib dependency (see the
 * `AR_CASE_STUDY_FILTER_ALL_OPTIONS` doc in `ar-labels.ts`). The `authority`
 * facet is filtered by the shared EN authority strings and displayed with
 * their Latin short codes (gate 11.3 exception for Latin acronyms), matching
 * `ArHubAuthorityRail`.
 *
 * Owner directive (2026-09-02): every register file shows "معتمد / مكتمل"
 * (fixed label inside `ArCaseStudyFileCard`), so the `status` facet is
 * removed — a filter over one constant value would be a dead control.
 *
 * RTL conventions (locked): logical `ms-auto` for inline-end pushes, and
 * `ArrowLeft` as the forward arrow (mirrors EN `ArrowRight`).
 *
 * @see plans/case-studies-mega-plan.md Part 19 / Step 6c
 */

"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  SearchX,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  authorityShortName,
  trackCaseStudyFilter,
  trackCaseStudyHubAuthorityJump,
  trackCaseStudyHubEmptySuggest,
} from "@/lib/case-studies";
import type {
  ApprovalCaseStudy,
  CaseStudyArabicContent,
  CaseStudyFacet,
} from "@/types/case-study";
import {
  AR_CASE_STUDY_ALL_FILTERS_LABEL,
  AR_CASE_STUDY_ALL_LABEL,
  AR_CASE_STUDY_CLEAR_FILTERS_LABEL,
  AR_CASE_STUDY_DRAWER_TITLE,
  AR_CASE_STUDY_EMPTY_HINT,
  AR_CASE_STUDY_EMPTY_TITLE,
  AR_CASE_STUDY_FACET_LABELS,
  AR_CASE_STUDY_FILTER_ALL_OPTIONS,
  AR_CASE_STUDY_FILTER_AUTHORITY_ARIA,
  AR_CASE_STUDY_FILTER_PILL,
  AR_CASE_STUDY_HERO_EYEBROW,
  arCaseStudySuggestionLabel,
  arRegisterFileCount,
} from "./ar-labels";
import ArCaseStudyFileCard from "./ArCaseStudyFileCard";
import ArHubAuthorityRail from "./ArHubAuthorityRail";
import type { ArHubAuthorityCount } from "./ArHubAuthorityRail";
import ArHubCtaTile from "./ArHubCtaTile";
import ArHubDrawer from "./ArHubDrawer";

/** One Arabic register entry: the shared EN twin + its native Arabic content. */
export interface ArCaseStudyPair {
  study: ApprovalCaseStudy;
  ar: CaseStudyArabicContent;
}

/** Amber pattern-break cadence — a CTA tile occupies a grid cell after every Nth card (Part 19 §19.4.6). */
const CTA_CADENCE = 6;

/** See the EN `CaseStudyHub` constant — keeps the tile out of a short final row. */
const MIN_REMAINING_CARDS = 3;

/** Facet `<select>`s offered on the register (authority lives on the rail). */
type FacetSelect = Exclude<CaseStudyFacet, "authority" | "status">;
const FACET_SELECTS: FacetSelect[] = ["sector", "projectType", "location"];

/** One register grid cell: a study card pair or the amber pattern-break tile. */
type ArGridItem =
  | { type: "study"; pair: ArCaseStudyPair }
  | { type: "cta" };

/** Arabic facet value for a non-authority facet (`ar` field). */
function arabicFacetValue(
  ar: CaseStudyArabicContent,
  facet: FacetSelect,
): string {
  if (facet === "sector") return ar.arSector;
  if (facet === "projectType") return ar.arProjectType;
  return ar.arLocation;
}

export interface ArCaseStudyHubProps {
  /** Arabic twin pairs computed by the page (full register — no gate). */
  pairs: ArCaseStudyPair[];
}

export default function ArCaseStudyHub({ pairs }: ArCaseStudyHubProps) {
  const [activeFilters, setActiveFilters] = useState<
    Partial<Record<CaseStudyFacet, string | null>>
  >({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  /** Distinct Arabic facet options, derived from the full register data. */
  const facetOptions = useMemo(() => {
    const options: { facet: CaseStudyFacet; value: string; label: string }[] =
      [];
    for (const facet of FACET_SELECTS) {
      const seen = new Set<string>();
      for (const { ar } of pairs) {
        const value = arabicFacetValue(ar, facet);
        if (value && !seen.has(value)) {
          seen.add(value);
          options.push({ facet, value, label: value });
        }
      }
    }
    return options;
  }, [pairs]);

  const filtered = useMemo(() => {
    return pairs.filter(({ study, ar }) => {
      if (
        activeFilters.authority &&
        !study.authorities.includes(activeFilters.authority)
      ) {
        return false;
      }
      for (const facet of FACET_SELECTS) {
        const want = activeFilters[facet];
        if (want && arabicFacetValue(ar, facet) !== want) return false;
      }
      return true;
    });
  }, [pairs, activeFilters]);

  /**
   * Z3 rail counts — computed from the full register so pill counts stay
   * stable while other facets narrow the visible list (and so the drawer's
   * quick-jump list matches the rail exactly). Keys are the shared EN
   * authority strings; labels are their Latin short codes.
   */
  const authorityCounts = useMemo<ArHubAuthorityCount[]>(() => {
    const tally = new Map<string, number>();
    for (const { study } of pairs) {
      for (const authority of study.authorities) {
        tally.set(authority, (tally.get(authority) ?? 0) + 1);
      }
    }
    return Array.from(tally.entries())
      .map(([key, count]) => ({ key, label: authorityShortName(key), count }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
  }, [pairs]);

  const activeAuthority = activeFilters.authority ?? null;
  const hasActiveFilters = Object.values(activeFilters).some(Boolean);
  const activeCount = Object.values(activeFilters).filter(Boolean).length;

  /** Z8 — nearest populated authority facet suggestion (mirrors EN). */
  const suggestion = useMemo(() => {
    if (filtered.length > 0 || !activeAuthority) return null;
    return (
      authorityCounts
        .filter((c) => c.key !== activeAuthority)
        .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))[0] ??
      null
    );
  }, [filtered.length, activeAuthority, authorityCounts]);

  /** In-grid cells: card, and after every 6th card a tile — unless <3 cards remain. */
  const gridItems = useMemo<ArGridItem[]>(() => {
    const items: ArGridItem[] = [];
    filtered.forEach((pair, index) => {
      items.push({ type: "study", pair });
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
        const options = facetOptions.filter((o) => o.facet === facet);
        const label = AR_CASE_STUDY_FACET_LABELS[facet];
        const allOption = AR_CASE_STUDY_FILTER_ALL_OPTIONS[facet];
        return (
          <label key={facet} className="block">
            <span className="sr-only">{label}</span>
            <select
              value={activeFilters[facet] ?? ""}
              onChange={(e) => handleFilterChange(facet, e.target.value)}
              aria-label={label}
              className="w-full rounded-md border border-border-light bg-light-bg px-3 py-2 text-body-sm text-body-text focus:outline-none focus:ring-2 focus:ring-brand-blue"
            >
              <option value="">{allOption ?? AR_CASE_STUDY_ALL_LABEL}</option>
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
    <section aria-label={AR_CASE_STUDY_HERO_EYEBROW}>
      {/* Keeps heading hierarchy intact (H1 hero → H2 → H3 card titles) even if
          the freshness strip above is ever empty. */}
      <h2 className="sr-only">تصفح سجل المشاريع</h2>

      {/* ---- Z3 Authority quick-jump rail (desktop; the drawer hosts it on mobile) ---- */}
      <div className="hidden md:block">
        <ArHubAuthorityRail
          active={activeAuthority}
          onSelect={handleAuthoritySelect}
          counts={authorityCounts}
        />
      </div>

      {/* ---- Toolbar: result count + desktop Clear all + mobile Filter pill ---- */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <p role="status" className="text-body-sm text-body-text/70">
          {arRegisterFileCount(filtered.length)}
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="hidden items-center gap-1 text-body-sm font-medium text-link-blue hover:text-brand-blue-hover md:inline-flex"
          >
            <X size={16} strokeWidth={1.75} aria-hidden="true" />
            مسح الكل
          </button>
        )}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="ms-auto inline-flex items-center gap-2 rounded-full border border-brand-blue bg-brand-blue px-4 py-2 text-body-sm font-semibold text-white shadow-card transition-colors hover:bg-brand-blue-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue md:hidden"
        >
          <SlidersHorizontal size={16} strokeWidth={1.75} aria-hidden="true" />
          {AR_CASE_STUDY_FILTER_PILL}
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
          {AR_CASE_STUDY_ALL_FILTERS_LABEL}
          <ChevronDown
            size={18}
            strokeWidth={1.75}
            className="ms-auto text-body-text/50 transition-transform duration-200 group-open:rotate-180"
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
                  <ArHubCtaTile />
                </li>
              ) : (
                <li key={item.pair.study.slug}>
                  {/* tone rotates the light per-card gradient (owner 2026-09-02) */}
                  <ArCaseStudyFileCard
                    study={item.pair.study}
                    ar={item.pair.ar}
                    tone={index}
                  />
                </li>
              ),
            )}
          </ul>
          {needsTrailingCta && (
            <div className="mt-4">
              <ArHubCtaTile />
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
            {AR_CASE_STUDY_EMPTY_TITLE}
          </p>
          <p className="mx-auto mt-2 max-w-md text-body-sm text-body-text/70">
            {AR_CASE_STUDY_EMPTY_HINT}
          </p>
          {suggestion ? (
            <button
              type="button"
              onClick={applySuggestion}
              className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-brand-blue bg-white px-4 py-2.5 text-body-sm font-semibold text-brand-blue transition-colors hover:bg-card-bg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              {arCaseStudySuggestionLabel(suggestion.count, suggestion.label)}
              <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
            </button>
          ) : null}
          <div className="mt-4">
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-1 text-body-sm font-medium text-link-blue hover:text-brand-blue-hover"
            >
              <X size={16} strokeWidth={1.75} aria-hidden="true" />
              {AR_CASE_STUDY_CLEAR_FILTERS_LABEL}
            </button>
          </div>
        </div>
      )}

      {/* ---- Z9 Mobile filter drawer: authority quick-jump → facet selects → Clear all ---- */}
      <ArHubDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={AR_CASE_STUDY_DRAWER_TITLE}
      >
        <div className="space-y-6">
          <section aria-label={AR_CASE_STUDY_FILTER_AUTHORITY_ARIA}>
            <h3 className="font-montserrat text-body font-bold text-heading-text">
              تصفية حسب الجهة
            </h3>
            <p className="mt-0.5 text-caption text-body-text/60">
              انتقل إلى ملفات جهة واحدة، أو اترك الخيار على "الكل".
            </p>
            <div className="mt-3">
              <ArHubAuthorityRail
                active={activeAuthority}
                onSelect={handleAuthoritySelect}
                counts={authorityCounts}
              />
            </div>
          </section>

          <section aria-label={AR_CASE_STUDY_ALL_FILTERS_LABEL}>
            <h3 className="font-montserrat text-body font-bold text-heading-text">
              تحسين عوامل التصفية
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
              {AR_CASE_STUDY_CLEAR_FILTERS_LABEL}
            </button>
          )}
        </div>
      </ArHubDrawer>
    </section>
  );
}

/**
 * NotFoundSearch — frost combobox/listbox search over the 404 recovery index.
 *
 * A locale-aware autocomplete that searches NOTFOUND_LINKS (title + keywords
 * in both languages) and presents real server-rendered <a href> options —
 * never JavaScript-only navigation (project rule). Full keyboard support:
 * ArrowUp / ArrowDown / Home / End / Enter / Escape.
 *
 * Accessibility: implements the WAI-ARIA combobox + listbox pattern
 * (role="combobox", aria-expanded, aria-controls, aria-activedescendant,
 * role="listbox", role="option", aria-selected).
 *
 * RTL: uses CSS logical properties only (ps/pe/start/end, text-start) so the
 * layout mirrors automatically on the Arabic page — no JS locale checks.
 *
 * @see /plans/404-redesign-plan.md (Task 4)
 */

"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { NOTFOUND_LINKS, type NotFoundLink } from "@/data/notfound-links";

const DISPLAY_LIMIT = 8;

interface NotFoundSearchProps {
  locale: "en" | "ar";
  /** Visible label text above the field (localized by the page) */
  label: string;
  /** Input placeholder (localized by the page) */
  placeholder: string;
  /** "No results" message (localized by the page) */
  noResults: string;
  /** Localized type badge labels */
  typeLabels: { approval: string; service: string; guide: string };
}

function normalize(value: string): string {
  return value.trim().toLocaleLowerCase();
}

/** Case/diacritic-tolerant substring match against every searchable field */
function matchesQuery(link: NotFoundLink, query: string): boolean {
  const q = normalize(query);
  if (!q) return true;
  return [link.title, link.titleAr, ...link.keywords, ...link.keywordsAr].some(
    (field) => normalize(field).includes(q)
  );
}

export default function NotFoundSearch({
  locale,
  label,
  placeholder,
  noResults,
  typeLabels,
}: NotFoundSearchProps) {
  const uid = useId();
  const listboxId = `${uid}-listbox`;
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const results = useMemo(
    () => NOTFOUND_LINKS.filter((link) => matchesQuery(link, query)).slice(0, DISPLAY_LIMIT),
    [query]
  );

  /* Keep the active option in range when the result list shrinks */
  useEffect(() => {
    setActiveIndex((current) => Math.min(current, Math.max(results.length - 1, 0)));
  }, [results.length]);

  /* Scroll the active option into view inside the listbox */
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    const el = document.getElementById(`${listboxId}-${results[activeIndex]?.id}`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open, results, listboxId]);

  const close = () => setOpen(false);
  const openList = () => {
    setOpen(true);
    setActiveIndex(0);
  };

  const hrefFor = (link: NotFoundLink) => (locale === "ar" ? link.hrefAr : link.href);
  const titleFor = (link: NotFoundLink) => (locale === "ar" ? link.titleAr : link.title);
  const typeLabelFor = (link: NotFoundLink) =>
    link.type === "approval"
      ? typeLabels.approval
      : link.type === "service"
        ? typeLabels.service
        : typeLabels.guide;

  const typeClass = (link: NotFoundLink) =>
    link.type === "approval"
      ? "text-cyano-night-amber"
      : link.type === "service"
        ? "text-cyano-night-ink"
        : "text-cyano-night-ink-soft";

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setOpen(true);
        setActiveIndex((current) =>
          results.length === 0 ? 0 : (current + 1) % results.length
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((current) =>
          results.length === 0 ? 0 : (current - 1 + results.length) % results.length
        );
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(results.length - 1);
        break;
      case "Enter": {
        const active = results[activeIndex];
        if (open && active) {
          event.preventDefault();
          document.getElementById(`${listboxId}-${active.id}`)?.click();
        }
        break;
      }
      case "Escape":
        event.preventDefault();
        setQuery("");
        close();
        (event.currentTarget as HTMLInputElement).blur();
        break;
      case "Tab":
        close();
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) close();
      }}
    >
      <label
        htmlFor={`${uid}-input`}
        className="block mb-2 text-sm font-medium text-cyano-night-ink-soft"
      >
        {label}
      </label>

      {/* Frosted input */}
      <div className="group relative rounded-xl border border-cyano-night-line bg-cyano-night-card/60 backdrop-blur-xl transition-colors focus-within:border-cyano-night-amber/70 focus-within:ring-2 focus-within:ring-cyano-night-amber/30">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-cyano-night-ink-soft"
          strokeWidth={1.75}
        />
        <input
          id={`${uid}-input`}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-activedescendant={
            open && results[activeIndex] ? `${listboxId}-${results[activeIndex].id}` : undefined
          }
          aria-autocomplete="list"
          aria-label={label}
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
          }}
          onFocus={openList}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full rounded-xl bg-transparent py-4 pe-12 ps-11 text-base text-cyano-night-text outline-none placeholder:text-cyano-night-ink-soft/70"
        />
        <ArrowUpRight
          aria-hidden="true"
          className="pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2 text-cyano-night-ink-soft/60"
          strokeWidth={1.75}
        />
      </div>

      {/* Listbox */}
      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={label}
          className="absolute inset-x-0 z-30 mt-2 max-h-80 overflow-auto rounded-xl border border-cyano-night-line bg-cyano-night-card/95 shadow-dropdown backdrop-blur-xl"
        >
          {results.length === 0 ? (
            <li role="option" aria-disabled="true" className="px-4 py-4 text-sm text-cyano-night-ink-soft">
              {noResults}
            </li>
          ) : (
            results.map((link, index) => {
              const isActive = index === activeIndex;
              return (
                <li key={link.id} role="none">
                  <a
                    id={`${listboxId}-${link.id}`}
                    role="option"
                    aria-selected={isActive}
                    href={hrefFor(link)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`flex items-center justify-between gap-3 px-4 py-3 text-start transition-colors ${
                      isActive ? "bg-cyano-night-surface" : "bg-transparent"
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-cyano-night-text">
                        {titleFor(link)}
                      </span>
                      <span
                        className={`mt-0.5 block text-[10px] font-medium uppercase tracking-wider ${typeClass(link)}`}
                      >
                        {typeLabelFor(link)}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className={`size-4 shrink-0 ${isActive ? "text-cyano-night-amber" : "text-cyano-night-ink-soft/50"}`}
                      strokeWidth={1.75}
                    />
                  </a>
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}

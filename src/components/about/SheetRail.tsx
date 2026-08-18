"use client";

/**
 * SheetRail — A5 desktop sheet-number rail (Phase D+1).
 *
 * A vertical 01…11 number rail fixed to the page edge that acts as a
 * table of contents for the eleven primary drawing sheets. Powered by the
 * same IntersectionObserver scroll-spy pattern as `ScrollReveal`, it highlights
 * the sheet currently in view and jumps between sheets on click.
 *
 * Locale-agnostic by design:
 * - All copy arrives via the `rail` prop (English from about.ts, Arabic from
 *   about-ar.ts) — this file contains no hardcoded strings.
 * - Positioning uses logical properties only (`inset-inline-end`), so the
 *   rail auto-flips to the LEFT edge in RTL (Q6) with zero extra CSS.
 *
 * Spec (plans/about-us-redesign-mega-plan.md §7):
 * - Desktop ≥1024px only (hidden below — gate lives in about.css).
 * - Real focusable `<a href="#sheet-N">` anchors with a visible focus ring;
 *   the raw hash is preserved as the no-JS fallback.
 * - Q11 clicks: preventDefault → scrollIntoView({behavior:'smooth'}) +
 *   history.replaceState (no back-button pollution); behavior:'auto' under
 *   prefers-reduced-motion.
 * - Q5: each click fires a `sheet_rail_navigate` analytics event with the
 *   sheet id as the label (Arabic ids are identical, so the target name needs
 *   no localization).
 *
 * Sheet 02b/03b are intentionally excluded — the rail lists only the primary
 * sheets (filtered by the `b` suffix).
 */

import { useEffect, useMemo, useState, type MouseEvent } from "react";
import type { AboutContent, SheetMeta } from "@/data/about";
import { trackEvent } from "@/lib/analytics";

interface SheetRailProps {
  /** All sheet meta entries; the primary 11 are derived by filtering out the `b`-suffix sub-sheets. */
  sheets: SheetMeta[];
  /** Localized rail copy — accessible name + per-link aria-label prefix. */
  rail: AboutContent["sheetRail"];
}

export default function SheetRail({ sheets, rail }: SheetRailProps) {
  // The rail lists only the primary sheets (Sheet 02b/03b are sub-sheets).
  const primary = useMemo(
    () => sheets.filter((sheet) => !sheet.id.endsWith("b")),
    [sheets]
  );

  const [activeId, setActiveId] = useState<string | null>(
    primary[0]?.id ?? null
  );

  // Scroll-spy: observe each primary sheet; the active sheet is the one
  // intersecting the horizontal band centred around the middle of the
  // viewport. IO fires its initial callback on observe(), so the rail
  // highlights the correct sheet on first paint without extra scroll work.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) return;

    const targets = primary
      .map((sheet) => document.getElementById(sheet.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Among intersecting sheets pick the one closest to the top of the
        // band (smallest boundingClientRect.top) — resolves tall-sheet ties.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      // Horizontal band from 40% → 45% of viewport height.
      { threshold: 0, rootMargin: "-40% 0px -55% 0px" }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [primary]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id);
    trackEvent({
      action: "sheet_rail_navigate",
      category: "navigation",
      label: id,
    });
  };

  return (
    <nav aria-label={rail.label} className="about-sheet-rail">
      <ol className="about-sheet-rail-list">
        {primary.map((sheet) => {
          const active = sheet.id === activeId;
          return (
            <li key={sheet.id} className="about-sheet-rail-item">
              <a
                href={`#${sheet.id}`}
                aria-label={`${rail.prefix} ${sheet.number} — ${sheet.label}`}
                aria-current={active ? "true" : undefined}
                className={
                  active
                    ? "about-sheet-rail-link is-active"
                    : "about-sheet-rail-link"
                }
                onClick={(event) => handleClick(event, sheet.id)}
              >
                <span className="about-sheet-rail-num">{sheet.number}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

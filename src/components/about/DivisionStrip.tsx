"use client";

/**
 * DivisionStrip — Sheet 01 "you are here" marker.
 *
 * The four Wasleen divisions rendered as a drawing title-block strip
 * (Interior · Approvals ⬤ YOU ARE HERE · Pergolas · Digital). The
 * Approvals entry is the active cell: amber ink, a pulsing dot and the
 * localized "YOU ARE HERE" label. Non-active divisions are REAL outbound
 * `<a>` links (target="_blank" rel="noopener") that fire an `outbound_click`
 * analytics event with the division id — hover/focus link states live in
 * about.css. Icons come from lucide-react via the `icon` string in the data
 * layer; grid/borders/pulse live in about.css so the cyanotype palette
 * (--about-*) resolves in both themes.
 *
 * Client component — the links call trackEvent (client-only GTM dispatch).
 *
 * Plan: plans/about-us-redesign-mega-plan.md (Sheet 01)
 */

import type { LucideIcon } from "lucide-react";
import { Home, Stamp, Sun, Globe } from "lucide-react";
import type { DivisionStripItem } from "@/data/about";
import { trackEvent } from "@/lib/analytics";

/** icon string → lucide component (resolved here, not in data). */
const DIVISION_ICONS: Record<string, LucideIcon> = {
  Home,
  Stamp,
  Sun,
  Globe,
};

interface DivisionStripProps {
  items: DivisionStripItem[];
  /** Localized active marker label — "YOU ARE HERE" / "أنت هنا". */
  youAreHereLabel: string;
  className?: string;
}

export default function DivisionStrip({
  items,
  youAreHereLabel,
  className = "",
}: DivisionStripProps) {
  return (
    <div
      role="list"
      className={`about-division-strip grid grid-cols-2 sm:grid-cols-4 ${className}`}
    >
      {items.map((item) => {
        const Icon = DIVISION_ICONS[item.icon] ?? Home;
        const active = Boolean(item.youAreHere);
        const content = (
          <>
            <Icon
              aria-hidden="true"
              size={20}
              strokeWidth={1.75}
              className="about-division-icon"
            />
            <span className="about-division-label">{item.label}</span>
            {active && (
              <span className="about-division-here">
                <span aria-hidden="true" className="about-here-dot" />
                <span className="about-division-here-label">
                  {youAreHereLabel}
                </span>
              </span>
            )}
          </>
        );

        // Active cell ("you are here") stays a plain div — not a link.
        if (active) {
          return (
            <div
              key={item.id}
              role="listitem"
              aria-current="true"
              className="about-division-item about-division-item--active"
            >
              {content}
            </div>
          );
        }

        // Non-active divisions with a URL are real outbound links.
        if (item.href) {
          return (
            <a
              key={item.id}
              role="listitem"
              href={item.href}
              target="_blank"
              rel="noopener"
              className="about-division-item"
              onClick={() =>
                trackEvent({
                  action: "outbound_click",
                  category: "navigation",
                  label: item.id,
                  division: item.id,
                })
              }
            >
              {content}
            </a>
          );
        }

        // Non-active division without a URL — inert cell.
        return (
          <div key={item.id} role="listitem" className="about-division-item">
            {content}
          </div>
        );
      })}
    </div>
  );
}

"use client";

/**
 * OfficeMaps — Sheet 11 · Our Offices.
 *
 * Three Wasleen locations rendered as drafting-framed cards (one frame per
 * location). Each card carries a lazy aspect-box Google Maps embed (no CLS)
 * as a NON-INTERACTIVE preview (`pointer-events-none`) so clicks can never
 * land inside the cross-origin embed (browsers popup-block that path as
 * `about:blank#blocked`). A real, full-cover overlay `<a>` sits above the
 * preview and opens `directionsUrl` in a new tab — real anchors are never
 * popup-blocked. A second real "GET DIRECTIONS" link sits below the address.
 * Both fire an `outbound_click` analytics event with the office id
 * (`office: approval | pergola-parking | cinemaxsky`).
 *
 * 1-col mobile → 3-col desktop (equal-height cards via h-full + the shared
 * DraftingFrame flex column). Locale-agnostic: all copy arrives via the
 * `offices` prop (English from about.ts, Arabic from about-ar.ts); the embed
 * and directions URLs are identical across locales. The head-office pin and
 * address match NAP byte-for-byte (src/lib/constants.ts).
 *
 * No new JSON-LD is emitted here — the AboutPage schema stack is untouched.
 *
 * Client component — the directions links call trackEvent (client-only GTM).
 *
 * Plan: plans/about-us-redesign-mega-plan.md §2 (Sheet 11) / §4.3 (files)
 */

import type { AboutContent, SheetMeta } from "@/data/about";
import { trackEvent } from "@/lib/analytics";
import DraftingFrame from "./DraftingFrame";

interface OfficeMapsProps {
  offices: AboutContent["offices"];
  sheet: SheetMeta;
}

export default function OfficeMaps({ offices, sheet }: OfficeMapsProps) {
  const handleDirectionsClick = (id: string) => {
    try {
      trackEvent({
        action: "outbound_click",
        category: "navigation",
        label: id,
        office: id,
      });
    } catch {
      // Analytics is best-effort and must never cancel the map navigation.
    }
  };

  return (
    <section
      id={sheet.id}
      aria-labelledby="about-offices-heading"
      className="relative overflow-hidden bg-(--about-bg)"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <p className="about-sheet-tag font-roboto-mono text-xs uppercase tracking-[0.2em]">
          SHEET {sheet.number} · {sheet.label}
        </p>
        <h2
          id="about-offices-heading"
          className="mt-4 font-montserrat text-h2 font-bold leading-tight text-(--about-heading)"
        >
          {offices.heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {offices.officeLocations.map((office) => (
            <DraftingFrame
              key={office.id}
              caption={office.caption}
              className="h-full"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-(--about-surface)">
                <iframe
                  src={office.embedSrc}
                  title={office.name}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="pointer-events-none absolute inset-0 h-full w-full border-0"
                />
                <a
                  href={office.directionsUrl}
                  target="_blank"
                  rel="noopener"
                  aria-label={`${offices.directionsLabel} — ${office.name}`}
                  className="group absolute inset-0 z-10 flex items-end justify-center p-4"
                  onClick={() => handleDirectionsClick(office.id)}
                >
                  <span className="inline-flex items-center gap-2 rounded-md border border-(--about-amber) bg-(--about-surface) px-4 py-2 font-roboto-mono text-xs font-medium uppercase tracking-[0.2em] text-(--about-amber) transition-colors group-hover:bg-(--about-amber) group-hover:text-(--about-ink)">
                    {offices.directionsLabel}
                  </span>
                </a>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className="font-montserrat text-h4 font-bold leading-tight text-(--about-heading)">
                  {office.name}
                </h3>
                <p className="text-body-sm text-(--about-text)">
                  {office.address}
                </p>
                <a
                  href={office.directionsUrl}
                  target="_blank"
                  rel="noopener"
                  className="mt-auto inline-flex items-center gap-2 font-roboto-mono text-xs font-medium uppercase tracking-[0.2em] text-(--about-amber) transition-colors hover:text-(--about-ink)"
                  onClick={() => handleDirectionsClick(office.id)}
                >
                  {offices.directionsLabel}
                </a>
              </div>
            </DraftingFrame>
          ))}
        </div>
      </div>
    </section>
  );
}

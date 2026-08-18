/**
 * BothSides — Sheet 04 "Both Sides of the Counter".
 *
 * A 2×2 icon grid (no cards, light background) — the four FeaturePoints
 * from the `bothSides` data block, each icon set inside a drafting note
 * circle (line circle + amber leader tick from about.css). Icons resolve
 * from the `icon` string in the data layer via the local BOTH_SIDES_ICONS
 * map, mirroring DivisionStrip.
 *
 * Server component — no interactivity, no "use client". Locale-agnostic:
 * copy flows from about.ts (EN) / about-ar.ts (AR) for 1:1 parity.
 *
 * Plan: plans/about-us-redesign-mega-plan.md (Sheet 04, E1)
 */

import type { LucideIcon } from "lucide-react";
import { FileCheck, ClipboardCheck, Construction, Users } from "lucide-react";
import type { AboutContent, SheetMeta } from "@/data/about";

/** icon string → lucide component (resolved here, not in data). */
const BOTH_SIDES_ICONS: Record<string, LucideIcon> = {
  FileCheck,
  ClipboardCheck,
  Construction,
  Users,
};

interface BothSidesProps {
  bothSides: AboutContent["bothSides"];
  sheet: SheetMeta;
}

export default function BothSides({ bothSides, sheet }: BothSidesProps) {
  return (
    <section
      id={sheet.id}
      aria-labelledby="about-both-sides-heading"
      className="relative overflow-hidden bg-(--about-bg)"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <p className="about-sheet-tag font-roboto-mono text-xs uppercase tracking-[0.2em]">
          SHEET {sheet.number} · {sheet.label}
        </p>

        <h2
          id="about-both-sides-heading"
          className="mt-4 font-montserrat text-h2 font-bold leading-tight text-(--about-heading)"
        >
          {bothSides.heading}
        </h2>

        <div className="about-both-sides-grid mt-10 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
          {bothSides.points.map((point) => {
            const Icon = BOTH_SIDES_ICONS[point.icon] ?? FileCheck;
            return (
              <article key={point.id} className="about-both-sides-item">
                <div className="about-draft-circle" aria-hidden="true">
                  <Icon size={24} strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 max-w-md font-montserrat text-h4 font-bold leading-snug text-(--about-heading)">
                  {point.title}
                </h3>
                <p className="mt-3 max-w-md text-body leading-relaxed text-(--about-text)">
                  {point.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

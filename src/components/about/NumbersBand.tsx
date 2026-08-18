/**
 * NumbersBand — Sheet 05 "Wasleen by the numbers".
 *
 * Four counter stats rendered as architectural dimension-line
 * measurements via DimensionLineStat (A3): number → vertical leader
 * with up-pointing arrowhead → horizontal dimension line with end
 * ticks → label. Each number stays real DOM text through CountUp
 * (screen reader + AI parse; Q10 no-JS shows the SSR final value) and
 * animates once on first intersect, respecting prefers-reduced-motion.
 * The dimension line draws in via the transform-only about-dim-draw
 * keyframe (compositor-friendly, no layout thrash).
 *
 * Server component — no interactivity, no "use client". Locale-agnostic:
 * copy flows from about.ts (EN) / about-ar.ts (AR) for 1:1 parity.
 *
 * Plan: plans/about-us-redesign-mega-plan.md (Sheet 05, E2)
 */

import type { AboutContent, SheetMeta } from "@/data/about";
import DimensionLineStat from "./DimensionLineStat";

interface NumbersBandProps {
  numbers: AboutContent["numbers"];
  sheet: SheetMeta;
}

export default function NumbersBand({ numbers, sheet }: NumbersBandProps) {
  return (
    <section
      id={sheet.id}
      aria-labelledby="about-numbers-heading"
      className="relative overflow-hidden bg-(--about-bg)"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <p className="about-sheet-tag font-roboto-mono text-xs uppercase tracking-[0.2em]">
          SHEET {sheet.number} · {sheet.label}
        </p>

        <h2
          id="about-numbers-heading"
          className="mt-4 font-montserrat text-h2 font-bold leading-tight text-(--about-heading)"
        >
          {numbers.heading}
        </h2>

        <div className="about-numbers-band mt-10 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {numbers.stats.map((stat) => (
            <DimensionLineStat
              key={stat.id}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

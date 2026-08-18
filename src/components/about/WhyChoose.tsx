/**
 * WhyChoose — Sheet 06 "Why choose Wasleen?".
 *
 * The four WhyCards restyled as blueprint cards: `--about-card`
 * background with an inset 1px line border, corner crop marks, a mono
 * sheet index and the icon in amber. Copy is unchanged from the current
 * page — it lives in the `why` data block. On hover the top/bottom
 * borders draw in via a compositor-only scaleX transform (motion
 * budget: "Card border-draw", transform-origin edge; RTL override in
 * about.css).
 *
 * Server component — no interactivity, no "use client". Locale-agnostic:
 * copy flows from about.ts (EN) / about-ar.ts (AR) for 1:1 parity.
 *
 * Plan: plans/about-us-redesign-mega-plan.md (Sheet 06, E3)
 */

import type { LucideIcon } from "lucide-react";
import { Shield, Award, Users, BadgeCheck } from "lucide-react";
import type { AboutContent, SheetMeta } from "@/data/about";

/** icon string → lucide component (resolved here, not in data). */
const WHY_ICONS: Record<string, LucideIcon> = {
  Shield,
  Award,
  Users,
  BadgeCheck,
};

interface WhyChooseProps {
  why: AboutContent["why"];
  sheet: SheetMeta;
}

export default function WhyChoose({ why, sheet }: WhyChooseProps) {
  return (
    <section
      id={sheet.id}
      aria-labelledby="about-why-heading"
      className="relative overflow-hidden bg-(--about-bg)"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <p className="about-sheet-tag font-roboto-mono text-xs uppercase tracking-[0.2em]">
          SHEET {sheet.number} · {sheet.label}
        </p>

        <h2
          id="about-why-heading"
          className="mt-4 font-montserrat text-h2 font-bold leading-tight text-(--about-heading)"
        >
          {why.heading}
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {why.cards.map((card, i) => {
            const Icon = WHY_ICONS[card.icon] ?? Shield;
            return (
              <article
                key={card.id}
                className="about-why-card relative flex flex-col p-6"
              >
                <span
                  aria-hidden="true"
                  className="about-crop-mark about-crop-mark--tl absolute top-0 start-0"
                />
                <span
                  aria-hidden="true"
                  className="about-crop-mark about-crop-mark--tr absolute top-0 end-0"
                />
                <span
                  aria-hidden="true"
                  className="about-crop-mark about-crop-mark--bl absolute bottom-0 start-0"
                />
                <span
                  aria-hidden="true"
                  className="about-crop-mark about-crop-mark--br absolute bottom-0 end-0"
                />

                <span className="font-roboto-mono text-xs tracking-[0.2em] text-(--about-ink-soft)">
                  0{i + 1}
                </span>
                <span className="mt-4 text-(--about-amber)">
                  <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-montserrat text-h4 font-bold leading-snug text-(--about-heading)">
                  {card.title}
                </h3>
                <p className="mt-3 text-body leading-relaxed text-(--about-text)">
                  {card.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

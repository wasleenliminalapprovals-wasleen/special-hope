/**
 * FounderCard — Sheet 07 "The people who sign your approvals".
 *
 * Two founder cards, each a drafting-frame people card: a portrait photo
 * in a line-border frame with the shared corner crop marks and a
 * title-block caption strip showing the NAME / ROLE / REV values exactly
 * as the plan specifies. Below the grid, the E-E-A-T reviewer credit line
 * ("Reviewed by ...") is drawn as a hairline-separated mono caption.
 *
 * Blocker-4 (§8): founder names and photos are client deliverables. The
 * `people` data block currently carries the "[... CONFIRM]" placeholders
 * and the webp assets are referenced by path in about.ts but not yet
 * present in /public — next/image renders the path, so the image request
 * 404s until the client supplies the files (does not fail the build).
 *
 * Server component — no "use client". Locale-agnostic: copy flows from
 * about.ts (EN) / about-ar.ts (AR) for 1:1 parity.
 *
 * Plan: plans/about-us-redesign-mega-plan.md (Sheet 07, F1)
 */

import Image from "next/image";
import type { AboutContent, SheetMeta } from "@/data/about";

interface FounderCardProps {
  people: AboutContent["people"];
  sheet: SheetMeta;
}

export default function FounderCard({ people, sheet }: FounderCardProps) {
  return (
    <section
      id={sheet.id}
      aria-labelledby="about-people-heading"
      className="relative overflow-hidden bg-(--about-bg)"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <p className="about-sheet-tag font-roboto-mono text-xs uppercase tracking-[0.2em]">
          SHEET {sheet.number} · {sheet.label}
        </p>
        <h2
          id="about-people-heading"
          className="mt-4 font-montserrat text-h2 font-bold leading-tight text-(--about-heading)"
        >
          {people.heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {people.founders.map((founder) => (
            <figure
              key={founder.id}
              className="about-founder-card relative flex flex-col overflow-hidden"
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
              <div className="about-founder-media">
                <Image
                  src={founder.image.src}
                  alt={founder.image.alt}
                  width={founder.image.width}
                  height={founder.image.height}
                  loading="lazy"
                  sizes="(min-width: 768px) 40vw, 92vw"
                  className="about-founder-img"
                />
              </div>
              <figcaption className="about-founder-caption">
                <div className="about-founder-caption-row">
                  <span className="about-founder-caption-key">NAME:</span>
                  <span className="about-founder-caption-value">
                    {founder.name}
                  </span>
                </div>
                <div className="about-founder-caption-row">
                  <span className="about-founder-caption-key">ROLE:</span>
                  <span className="about-founder-caption-value">
                    {founder.role}
                  </span>
                </div>
                <div className="about-founder-caption-row">
                  <span className="about-founder-caption-value about-founder-caption-rev">
                    {founder.rev}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="about-founder-reviewed mx-auto mt-10 max-w-2xl text-center font-roboto-mono text-xs tracking-wider">
          {people.reviewedBy}
        </p>
      </div>
    </section>
  );
}

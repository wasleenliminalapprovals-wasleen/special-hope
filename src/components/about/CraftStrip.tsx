/**
 * CraftStrip — Sheet 02b "The Craft Strip" (server component).
 *
 * Design (plans/about-us-redesign-mega-plan.md Sheet 02b, lines 74-80):
 * - Two photos side-by-side in a full-width band that visually proves the
 *   page's most differentiating claim: "we build AND we approve."
 *   - aluminium-glass-cnc-machining.webp → OUR FACTORY FLOOR
 *   - aluminium-glass-wind-load-engineering.webp → WIND-LOAD ENGINEERING
 * - Each photo sits in a DraftingFrame (corner crop marks + mono caption strip
 *   with the sheet number as the meta value), keeping the drawing-set language.
 *
 * Locale-agnostic: `craft` + `sheet` arrive as props from about.ts /
 * about-ar.ts. Both images are lazy-loaded below the fold (the hero drawing is
 * the LCP, not these photos); explicit width/height + aspect-ratio crop
 * prevent CLS. Uses only logical utilities (RTL-safe).
 */

import Image from "next/image";
import type { AboutContent, SheetMeta } from "@/data/about";
import DraftingFrame from "@/components/about/DraftingFrame";

type CraftContent = AboutContent["craft"];

interface CraftStripProps {
  craft: CraftContent;
  /** Sheet meta for sheet-02b (id / number / label). */
  sheet: SheetMeta;
}

export default function CraftStrip({ craft, sheet }: CraftStripProps) {
  return (
    <section
      id={sheet.id}
      aria-labelledby="about-craft-heading"
      className="relative overflow-hidden bg-(--about-bg-deep)"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <p className="about-sheet-tag font-roboto-mono text-xs uppercase tracking-[0.2em]">
          SHEET {sheet.number} · {sheet.label}
        </p>

        <h2
          id="about-craft-heading"
          className="mt-4 font-montserrat text-h2 font-bold leading-tight text-(--about-heading)"
        >
          {craft.heading}
        </h2>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {craft.items.map((item) => (
            <DraftingFrame
              key={item.id}
              caption={item.caption}
              meta={`SHEET ${sheet.number}`}
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                loading="lazy"
                sizes="(min-width: 640px) 50vw, 100vw"
                className="aspect-[16/10] h-auto w-full object-cover"
              />
            </DraftingFrame>
          ))}
        </div>
      </div>
    </section>
  );
}

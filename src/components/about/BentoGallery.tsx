/**
 * BentoGallery — Sheet 03b · Selected Work (Phase D3).
 *
 * Design (plans/about-us-redesign-mega-plan.md Sheet 03b, lines 103-113):
 * a 5-cell bento grid of "field photographs" pinned to the drawing sheet
 * like taped prints (A4, line 373) — ±1–2° rotation, soft shadow, one
 * tape-corner detail, mono caption; blueprint-muted at rest → full-color
 * bloom on hover (line 32).
 *
 * Grid layout (mobile-first):
 * - large  1× villa fit-out   2×2 on mobile (grid-cols-2), lg:grid-cols-3
 * - square 1× office fit-out  1×1
 * - square 1× car port        1×1
 * - wide   1× private cinema  2×1
 * - square 1× glass glazing   1×1
 * Span + aspect-ratio per size live in about.css (`.about-photo-frame--*`),
 * so cells align at both `grid-cols-2` (mobile) and `lg:grid-cols-3`.
 *
 * Lightbox is intentionally out of scope for the initial build (plan
 * line 112) — no client interactivity, so this stays a server component.
 * Q8 night-mode photo filtering lives in about.css on `.about-photo-img`
 * via the `data-theme` attribute; RTL rotation mirroring (Q6) is handled
 * in CSS via the `--about-photo-mirror` factor.
 *
 * Locale-agnostic: `work` + `sheet` arrive as props from about.ts /
 * about-ar.ts, so the same file drives both locales.
 */

import PhysicalPhotoFrame from "./PhysicalPhotoFrame";
import type { AboutContent, SheetMeta } from "@/data/about";

interface BentoGalleryProps {
  work: AboutContent["work"];
  /** Sheet meta for sheet-03b (id / number / label). */
  sheet: SheetMeta;
}

export default function BentoGallery({ work, sheet }: BentoGalleryProps) {
  return (
    <section
      id={sheet.id}
      aria-labelledby="about-work-heading"
      className="relative overflow-hidden bg-(--about-bg-deep)"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <p className="about-sheet-tag font-roboto-mono text-xs uppercase tracking-[0.2em]">
          SHEET {sheet.number} · {sheet.label}
        </p>

        <h2
          id="about-work-heading"
          className="mt-4 font-montserrat text-h2 font-bold leading-tight text-(--about-heading)"
        >
          {work.heading}
        </h2>

        <p className="mt-4 max-w-2xl text-body leading-relaxed text-(--about-ink-soft)">
          {work.intro}
        </p>

        <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-3">
          {work.cells.map((cell) => (
            <PhysicalPhotoFrame
              key={cell.id}
              image={cell.image}
              caption={cell.caption}
              rotation={cell.rotation}
              size={cell.size}
              sheet={sheet}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

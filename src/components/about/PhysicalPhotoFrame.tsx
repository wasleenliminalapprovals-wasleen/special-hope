/**
 * PhysicalPhotoFrame — A4 "field photograph" frame primitive (Phase D3).
 *
 * Design (plans/about-us-redesign-mega-plan.md A4, line 373):
 * - A rotated, softly-shadowed photo pinned to the drawing sheet like a
 *   taped field photograph — the physical counterpart to DraftingFrame.
 * - ±1–2° rotation comes from the data layer (`rotation`); hover
 *   straightens (`rotate(0)`) and lifts (`translateY(-4px)`).
 * - One translucent tape-corner detail (CSS bar — compositor-friendly,
 *   zero bytes; plan's "static tape/clip SVG asset" intent is met without
 *   a live SVG filter).
 * - Blueprint-muted at rest → full-color bloom on hover (line 32).
 * - Q8 night-mode photo filter: `brightness(0.92) saturate(0.85)` via the
 *   `data-theme` attribute so photos sit on navy instead of floating.
 *
 * RTL (Q6): the photo rotation direction mirrors in RTL through a CSS
 * `--about-photo-mirror` factor (`[dir="rtl"]` negates it) and the tape
 * angle flips via `scaleX(-1)`. The rotation value itself lives inline as
 * a CSS custom property (the same data-driven pattern as RevisionLogBlock
 * `--revlog-length`); no physical inline styles are used.
 *
 * Server component — all interactivity is pure CSS hover (straighten +
 * lift + bloom), so no "use client" is needed.
 */

import Image from "next/image";
import type { CSSProperties } from "react";
import type { AboutImage, BentoCell, SheetMeta } from "@/data/about";

type BentoSize = BentoCell["size"];

/** srcset hint per bento span (approximate — guides the browser's pick). */
const SIZE_SIZES: Record<BentoSize, string> = {
  large: "(min-width: 1024px) 60vw, 92vw",
  wide: "(min-width: 1024px) 60vw, 92vw",
  square: "(min-width: 1024px) 30vw, 45vw",
};

interface PhysicalPhotoFrameProps {
  image: AboutImage;
  caption: string;
  /** ±1–2° physical-photo rotation in degrees (mirrors in RTL via Q6). */
  rotation: number;
  /** bento span — drives the frame aspect-ratio + grid spans. */
  size: BentoSize;
  /** Sheet meta for sheet-03b — mono meta value on the caption strip. */
  sheet: SheetMeta;
}

export default function PhysicalPhotoFrame({
  image,
  caption,
  rotation,
  size,
  sheet,
}: PhysicalPhotoFrameProps) {
  return (
    <figure
      className={`about-photo-frame about-photo-frame--${size}`}
      style={{ "--about-photo-rot": `${rotation}deg` } as CSSProperties}
    >
      <span
        aria-hidden="true"
        className="about-photo-tape about-photo-tape--tl"
      />
      <div className="about-photo-media">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          sizes={SIZE_SIZES[size]}
          className="about-photo-img"
        />
      </div>
      <figcaption className="about-photo-caption">
        <span>{caption}</span>
        <span className="about-photo-caption-meta">SHEET {sheet.number}</span>
      </figcaption>
    </figure>
  );
}

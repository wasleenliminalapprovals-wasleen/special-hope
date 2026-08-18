import type { ReactNode } from "react";

interface DraftingFrameProps {
  /** Mono caption shown in the title-block strip (e.g. "SHEET 02 — STORY"). */
  caption: string;
  /** Optional meta value on the opposite end of the strip (e.g. "SCALE 1:50"). */
  meta?: string;
  /** The photo / media being framed. */
  children: ReactNode;
  /** Extra classes merged onto the figure wrapper. */
  className?: string;
  /** Extra classes merged onto the caption strip. */
  captionClassName?: string;
}

/**
 * DraftingFrame — bordered drawing-frame primitive (Phase B1).
 *
 * Server component. Wraps any photo/media in a drafting-frame box: corner crop
 * marks plus a mono caption strip (title-block style) with an optional meta
 * value. Locale-agnostic: the crop marks use logical start/end positioning so
 * they track RTL automatically, and the caption strip uses flex + logical
 * spacing utilities only.
 *
 * Colors come from the semantic `--about-*` custom properties defined in
 * src/components/about/about.css (Phase B1a). Mono typography uses the brand
 * `font-roboto-mono` utility (never the generic `font-mono`).
 */
export default function DraftingFrame({
  caption,
  meta,
  children,
  className = "",
  captionClassName = "",
}: DraftingFrameProps) {
  return (
    <figure
      className={`about-drafting-frame relative flex flex-col overflow-hidden ${className}`.trim()}
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
      <div className="flex-1">{children}</div>
      <figcaption
        className={`about-frame-caption flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t px-4 py-2 font-roboto-mono text-xs uppercase tracking-wider ${captionClassName}`.trim()}
      >
        <span>{caption}</span>
        {meta ? <span className="about-frame-meta">{meta}</span> : null}
      </figcaption>
    </figure>
  );
}

/**
 * FramedImage — Eye-catching framed image with an optional soft "halo" backdrop.
 *
 * The framed-image treatment gives photos a premium, designed feel using only
 * design tokens (no raw hex):
 *   - rounded-xl (16px) frame with a subtle border-border-light edge
 *   - shadow-card that lifts to shadow-dropdown on hover (subtle, motion-aware)
 *   - optional `halo`: an offset bg-card-bg backdrop behind the frame for depth
 *
 * Uses `next/image` with explicit dimensions to prevent CLS. The alt text must
 * be unique and descriptive per page (on-page SEO / AEO rule).
 *
 * @see .roo/rules/02-DESIGN-TOKEN-SYSTEM.md (radius + shadow tokens)
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md (Image optimization)
 */

import Image from "next/image";
import type { ImageAssetRef } from "@/types";

interface FramedImageProps {
  /** Image reference from the image registry (src/data/images.ts) */
  image: ImageAssetRef;
  /** Set true for the above-fold hero image (eager + high priority) */
  priority?: boolean;
  /** Add a soft card-bg halo behind the frame for depth */
  halo?: boolean;
  /** Additional className applied to the <figure> wrapper */
  className?: string;
  /** Responsive sizes hint for next/image */
  sizes?: string;
  /** Toggle the visible figcaption (default: shown when caption exists) */
  showCaption?: boolean;
}

export default function FramedImage({
  image,
  priority = false,
  halo = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, 768px",
  showCaption = true,
}: FramedImageProps) {
  if (!image?.src) return null;

  const width = image.width ?? 1376;
  const height = image.height ?? 768;

  return (
    <figure className={`relative ${className}`.trim()}>
      {halo && (
        <div
          aria-hidden="true"
          className="absolute -bottom-3 -right-3 w-full h-full rounded-xl bg-card-bg"
        />
      )}
      <Image
        src={image.src}
        alt={image.alt || "Dubai approval process"}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className="relative w-full h-auto rounded-xl border border-border-light shadow-card transition-shadow duration-300 hover:shadow-dropdown"
      />
      {showCaption && image.caption && (
        <figcaption className="mt-2 text-caption text-body-text/70">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

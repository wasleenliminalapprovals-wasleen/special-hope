/**
 * PseoImageBlock — Accessible image with descriptive alt + optional caption.
 *
 * Uses `next/image` with explicit dimensions to prevent CLS and lazy-loads
 * below-fold images. The alt text must be unique and descriptive per page.
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md (Image optimization)
 */

import Image from "next/image";
import type { ImageAssetRef } from "@/types";

interface PseoImageBlockProps {
  /** Image reference from the image registry (src/data/images.ts) */
  image: ImageAssetRef;
  /** Set true for the above-fold hero image (skip lazy-loading) */
  priority?: boolean;
}

export default function PseoImageBlock({
  image,
  priority = false,
}: PseoImageBlockProps) {
  if (!image?.src) return null;

  const width = image.width ?? 800;
  const height = image.height ?? 450;

  return (
    <figure className="my-6">
      <Image
        src={image.src}
        alt={image.alt || "Dubai approval process"}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 800px"
        loading={priority ? "eager" : "lazy"}
        className="w-full h-auto rounded-lg border border-border-light shadow-card"
      />
      {image.caption && (
        <figcaption className="mt-2 text-caption text-body-text/70">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

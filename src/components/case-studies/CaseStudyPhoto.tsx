/**
 * CaseStudyPhoto — Part 18.4: post-hero real photo.
 *
 * Server component. Renders the `placement: "photo"` image from the study's
 * image library (a real site photo — never a logo) directly after the hero
 * banner. Uses next/image with `fill` + explicit aspect ratio to prevent CLS.
 * Renders nothing when no photo image is configured for the study.
 */

import Image from "next/image";
import type { ApprovalCaseStudy } from "@/types/case-study";

interface CaseStudyPhotoProps {
  study: ApprovalCaseStudy;
}

export default function CaseStudyPhoto({ study }: CaseStudyPhotoProps) {
  const photo = study.images.find((img) => img.placement === "photo");
  if (!photo) return null;

  return (
    <figure aria-label="Project photo" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8 md:px-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg shadow-card">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 768px) 1152px, 100vw"
            className="object-cover"
            loading="lazy"
          />
        </div>
        {photo.caption && (
          <figcaption className="mt-3 text-caption text-body-text/70">
            {photo.caption}
          </figcaption>
        )}
      </div>
    </figure>
  );
}

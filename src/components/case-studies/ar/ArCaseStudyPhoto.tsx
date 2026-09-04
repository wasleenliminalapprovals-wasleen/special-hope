/**
 * ArCaseStudyPhoto — Arabic post-hero real photo (case-studies mega-plan
 * Part 18.4 / Step 6b.3). RTL-safe port of the EN `CaseStudyPhoto`.
 *
 * The image `src` is SHARED with the EN twin and read at render time (Part
 * 3.2 — images are never duplicated in `src/data/case-studies-ar.ts`). The
 * Arabic `alt` / `caption` are authored natively in the AR entry
 * (`arPhotoAlt` / `arPhotoCaption`). When `arPhotoCaption` is absent no
 * figcaption renders, so the English EN caption never leaks onto the `/ar/`
 * page (gate 11.3 — 100% Arabic visible content).
 *
 * @see plans/case-studies-mega-plan.md Part 18.4 / Step 6b.3 / gate 11.3
 */

import Image from "next/image";
import type {
  ApprovalCaseStudy,
  CaseStudyArabicContent,
} from "@/types/case-study";

interface ArCaseStudyPhotoProps {
  study: ApprovalCaseStudy;
  ar: CaseStudyArabicContent;
}

export default function ArCaseStudyPhoto({ study, ar }: ArCaseStudyPhotoProps) {
  const photo = study.images.find((img) => img.placement === "photo");
  if (!photo) return null;

  return (
    <figure aria-label="صورة المشروع" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8 md:px-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg shadow-card">
          <Image
            src={photo.src}
            alt={ar.arPhotoAlt ?? photo.alt}
            fill
            sizes="(min-width: 768px) 1152px, 100vw"
            className="object-cover"
            loading="lazy"
          />
        </div>
        {ar.arPhotoCaption && (
          <figcaption className="mt-3 text-caption text-body-text/70">
            {ar.arPhotoCaption}
          </figcaption>
        )}
      </div>
    </figure>
  );
}

/**
 * Arabic Case Study Hub — Amber CTA Tile (Z6)
 *
 * Arabic twin of `src/components/case-studies/HubCtaTile.tsx` for the
 * `/ar/case-studies` hub (mega-plan Part 19 §19.4.6). Rendered inside the
 * register grid rhythm every 6 cards to guard the amber-only-CTA rule. Same
 * footprint as a card. Real anchors to `/ar/free-quote` and `tel:` — never
 * `Button`-as-link tricks (real hrefs only). Uses `ArrowLeft` as the RTL
 * forward arrow. Fires `case_study_hub_cta` with `position: "pattern-break-tile"`.
 *
 * @see plans/case-studies-mega-plan.md §19.4.6
 */
"use client";

import Link from "next/link";
import { ArrowLeft, Phone } from "lucide-react";
import { NAP } from "@/lib/constants";
import { trackCaseStudyHubCta } from "@/lib/case-studies";
import {
  AR_CASE_STUDY_CTA_BODY,
  AR_CASE_STUDY_CTA_LINK,
  AR_CASE_STUDY_CTA_TITLE,
} from "./ar-labels";

const DISPLAY_PHONE = "+971 56 764 8220";

export default function ArHubCtaTile() {
  return (
    <div className="cs-cta-tile flex h-full flex-col justify-center rounded-md bg-cta-amber p-6 shadow-card">
      <h3 className="font-montserrat text-h4 font-bold text-white">
        {AR_CASE_STUDY_CTA_TITLE}
      </h3>
      <p className="mt-2 text-body-sm text-white/90">{AR_CASE_STUDY_CTA_BODY}</p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link
          href="/ar/free-quote"
          onClick={() => trackCaseStudyHubCta({ position: "pattern-break-tile" })}
          className="inline-flex items-center gap-1.5 rounded-md bg-brand-black px-4 py-2.5 text-body-sm font-semibold text-white transition-colors hover:bg-brand-blue-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {AR_CASE_STUDY_CTA_LINK}
          <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
        </Link>

        <a
          href={`tel:${NAP.phone}`}
          onClick={() => trackCaseStudyHubCta({ position: "pattern-break-tile" })}
          className="inline-flex items-center gap-1.5 text-body-sm font-medium text-white underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Phone size={16} strokeWidth={1.75} aria-hidden="true" />
          {DISPLAY_PHONE}
        </a>
      </div>
    </div>
  );
}

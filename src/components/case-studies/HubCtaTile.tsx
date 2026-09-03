"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { NAP } from "@/lib/constants";
import { trackCaseStudyHubCta } from "@/lib/case-studies";

/**
 * HubCtaTile — Z6 amber pattern-break CTA tile.
 *
 * Part 19 §19.4.6. Rendered inside the register grid rhythm every 6 cards to
 * guard the amber-only-CTA rule. Same footprint as a card. Real anchors to
 * `/free-quote` and `tel:` — never `Button`-as-link tricks (real hrefs only).
 * Fires `case_study_hub_cta` with `position: "pattern-break-tile"`.
 *
 * @see plans/case-studies-mega-plan.md §19.4.6
 */

const DISPLAY_PHONE = "+971 56 764 8220";

export default function HubCtaTile() {
  return (
    <div className="cs-cta-tile flex h-full flex-col justify-center rounded-md bg-cta-amber p-6 shadow-card">
      <h3 className="font-montserrat text-h4 font-bold text-white">
        Need this approval done?
      </h3>
      <p className="mt-2 text-body-sm text-white/90">
        Get a fixed quote and a file-stamped delivery plan for your Dubai
        project.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link
          href="/free-quote"
          onClick={() => trackCaseStudyHubCta({ position: "pattern-break-tile" })}
          className="inline-flex items-center gap-1.5 rounded-md bg-brand-black px-4 py-2.5 text-body-sm font-semibold text-white transition-colors hover:bg-brand-blue-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Get a free quote
          <ArrowRight
            size={16}
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </Link>

        <a
          href={`tel:${NAP.phone}`}
          onClick={() => trackCaseStudyHubCta({ position: "pattern-break-tile" })}
          className="inline-flex items-center gap-1.5 text-body-sm font-medium text-white underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Phone
            size={16}
            strokeWidth={1.75}
            aria-hidden="true"
          />
          {DISPLAY_PHONE}
        </a>
      </div>
    </div>
  );
}

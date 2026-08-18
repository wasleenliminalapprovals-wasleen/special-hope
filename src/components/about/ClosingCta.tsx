/**
 * ClosingCta — Sheet 09 "One call gets you the whole group" + directory.
 *
 * Closes the drawing set on the deep cyanotype background like a final
 * title block: the closing line, three CTAs (Get Free Quote / WhatsApp Us
 * / Call), and a mini group-directory strip so the page ends on the whole
 * group. Mirrors the CTASection pattern (real links + trackEvent).
 *
 * Tracking: each CTA fires trackEvent (contact_click) with its method so
 * the conversion path is visible in GA4 + the Meta Pixel bridge (see
 * lib/analytics.ts). Because Button cannot combine href + onClick, the
 * primary CTA is a real server-rendered <a> styled with the same cta
 * classes (Palette colours live in about.css; layout is Tailwind).
 *
 * Locale-agnostic client component — copy flows from the closing data
 * block (about.ts EN / about-ar.ts AR) for 1:1 parity.
 *
 * Plan: plans/about-us-redesign-mega-plan.md (Sheet 09, F2)
 */

"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import type { AboutContent, SheetMeta } from "@/data/about";

interface ClosingCtaProps {
  closing: AboutContent["closing"];
  sheet: SheetMeta;
}

export default function ClosingCta({ closing, sheet }: ClosingCtaProps) {
  return (
    <section
      id={sheet.id}
      aria-labelledby="about-closing-heading"
      className="relative overflow-hidden bg-(--about-bg-deep)"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-20 text-center">
        <p className="about-sheet-tag font-roboto-mono text-xs uppercase tracking-[0.2em]">
          SHEET {sheet.number} · {sheet.label}
        </p>
        <h2
          id="about-closing-heading"
          className="mx-auto mt-4 max-w-3xl font-montserrat text-h2 font-bold leading-tight text-(--about-heading)"
        >
          {closing.line}
        </h2>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={closing.ctaPrimary.href}
            onClick={() =>
              trackEvent({
                action: "contact_click",
                category: "contact",
                method: "quote",
                service_slug: "about",
              })
            }
            className="about-cta about-cta--primary"
            aria-label={closing.ctaPrimary.label}
          >
            {closing.ctaPrimary.label}
          </a>
          <a
            href={closing.ctaWhatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent({
                action: "contact_click",
                category: "contact",
                method: "whatsapp",
                service_slug: "about",
              })
            }
            className="about-cta about-cta--outline"
            aria-label={closing.ctaWhatsapp.label}
          >
            {closing.ctaWhatsapp.label}
          </a>
          <a
            href={closing.ctaPhone.href}
            onClick={() =>
              trackEvent({
                action: "contact_click",
                category: "contact",
                method: "phone",
                service_slug: "about",
              })
            }
            className="about-cta about-cta--outline"
            aria-label={closing.ctaPhone.label}
          >
            {closing.ctaPhone.label}
          </a>
        </div>

        <div className="about-directory mt-14">
          <p className="about-directory-title font-roboto-mono text-xs uppercase tracking-[0.2em]">
            {closing.directoryTitle}
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {closing.directory.map((item) =>
              item.external ? (
                <li key={item.id}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent({
                        action: "outbound_click",
                        category: "group_directory",
                        label: item.label,
                        service_slug: "about",
                      })
                    }
                    className="about-directory-link font-roboto-mono text-xs uppercase tracking-[0.08em]"
                    aria-label={`${item.label} (opens in a new tab)`}
                  >
                    {item.label}
                  </a>
                </li>
              ) : (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="about-directory-link font-roboto-mono text-xs uppercase tracking-[0.08em]"
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}

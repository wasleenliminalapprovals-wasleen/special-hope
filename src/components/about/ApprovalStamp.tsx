/**
 * ApprovalStamp — A6 single-use "APPROVED" rubber stamp (Sheet 08).
 *
 * The page's one "screenshot moment": a rubber-stamp SVG thuds down once
 * (~200ms scale + slight rotation settle) the first time the credentials
 * sheet scrolls into view, then never replays. The ink-bleed edge is baked
 * into the static SVG via a precomputed feTurbulence/feDisplacementMap
 * filter — zero runtime cost (the filter paints once), per plan §7/A6.
 *
 * Behaviour:
 * - Default SSR / no-JS / reduced-motion: static settled stamp, visible.
 * - JS + motion allowed: after mount it starts hidden (scaled, invisible)
 *   and an IntersectionObserver fires the one-time thud at ~40% visibility,
 *   then disconnects so it can never replay.
 * - prefers-reduced-motion: the effect early-returns so the stamp stays in
 *   its static settled pose; about.css adds a belt-and-suspenders guard.
 *
 * Colour: success-green — the same --color-success-green token used by the
 * existing .about-approved-stamp in Sheet 02's revision log — so "APPROVED"
 * carries the site's approval semantics in both cyanotype themes.
 *
 * Locale-agnostic client component: the stamp text arrives via the `label`
 * prop (data-driven — "APPROVED" from about.ts / "معتمد" from about-ar.ts,
 * mirroring the approvedLabel pattern on Sheet 02's revision log) so EN and
 * AR stay 1:1 with zero hardcoded copy here.
 *
 * Plan: plans/about-us-redesign-mega-plan.md (Sheet 08, A6, F2)
 */

"use client";

import { useEffect, useId, useRef, useState } from "react";

interface ApprovalStampProps {
  /** Rubber-stamp text — "APPROVED" (EN) / "معتمد" (AR), data-driven. */
  label?: string;
}

export default function ApprovalStamp({ label = "APPROVED" }: ApprovalStampProps = {}) {
  const ref = useRef<SVGSVGElement>(null);
  const [phase, setPhase] = useState<"idle" | "hidden" | "fired">("idle");
  // Hydration-safe unique filter id. React's useId() is guaranteed to produce
  // the same value on server and client for the same tree position — a
  // module-level counter drifted (SSR keeps climbing across requests while CSR
  // always starts at 0) and broke hydration. useId() emits ':' chars, so we
  // sanitize them out to keep a CSS-safe SVG filter id.
  const filterId = `about-stamp-bleed-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;

  useEffect(() => {
    // Reduced motion → keep the static settled stamp (never animate).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // JS + motion allowed → start hidden, then thud once on first view.
    setPhase("hidden");

    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setPhase("fired");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setPhase("fired");
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls =
    phase === "hidden"
      ? "about-stamp about-stamp--hidden"
      : phase === "fired"
        ? "about-stamp about-stamp--fired"
        : "about-stamp";

  return (
    <svg
      ref={ref}
      viewBox="0 0 220 84"
      className={cls}
      role="img"
      aria-label={label}
    >
      <defs>
        <filter id={filterId} x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="3"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="3"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
      <g filter={`url(#${filterId})`} fill="currentColor">
        <rect
          x="5"
          y="5"
          width="210"
          height="74"
          rx="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
        />
        <text
          className={
            /[\u0600-\u06FF]/.test(label)
              ? "about-stamp-text about-stamp-text--ar"
              : "about-stamp-text"
          }
          x="110"
          y="51"
          textAnchor="middle"
          fontSize="34"
        >
          {label}
        </text>
      </g>
    </svg>
  );
}

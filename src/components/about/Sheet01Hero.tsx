/**
 * Sheet01Hero — Sheet 01 hero with the A2 scroll-scrubbed drafting line.
 *
 * Design (plans/about-us-redesign-mega-plan.md Sheet 01 / §6 / §7 A2):
 * - Eyebrow (mono amber) → the page's only H1 → subhead → CTA row →
 *   DivisionStrip title-block ("YOU ARE HERE" marker).
 * - Visual: SceneA_FloorPlan, idle-loaded via requestIdleCallback (same
 *   pattern as HeroSection.tsx) but its reveal is scroll-scrubbed instead
 *   of CSS-animated. One passive, rAF-throttled scroll listener maps
 *   stroke-dashoffset to the hero's position across the viewport height;
 *   `getTotalLength()` is precomputed once per stroke. The listener is
 *   removed once the hero fully leaves the viewport (one wow-moment).
 * - Reduced motion / no-JS: no listener is installed and about.css renders
 *   the static completed drawing.
 * - Text stays the LCP element; the drawing is a background asset.
 *
 * Locale-agnostic: takes localized hero content from about.ts / about-ar.ts
 * and uses only logical positioning utilities (RTL-safe).
 */

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SceneA_FloorPlan from "@/components/drawings/SceneA_FloorPlan";
import Button from "@/components/ui/Button";
import BlueprintGrid from "@/components/about/BlueprintGrid";
import GradientMesh from "@/components/about/GradientMesh";
import DivisionStrip from "@/components/about/DivisionStrip";
import { trackEvent } from "@/lib/analytics";
import type { AboutContent } from "@/data/about";

type HeroContent = AboutContent["hero"];

interface Sheet01HeroProps {
  content: HeroContent;
}

export default function Sheet01Hero({ content }: Sheet01HeroProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const drawingRef = useRef<HTMLDivElement | null>(null);

  // Keep the SVG out of the LCP window, then release after idle (HeroSection
  // pattern). While deferred, `.drawing-deferred` disables SceneA's CSS
  // animations; the scrub effect below takes over once released.
  const [drawingDeferred, setDrawingDeferred] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const releaseDrawing = () => {
      if (!cancelled) setDrawingDeferred(false);
    };

    type IdleWindow = Window & {
      requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback: (handle: number) => void;
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const w = window as IdleWindow;
      const handle = w.requestIdleCallback(releaseDrawing, { timeout: 2500 });
      return () => {
        cancelled = true;
        w.cancelIdleCallback(handle);
      };
    }

    const timer = globalThis.setTimeout(releaseDrawing, 1200);
    return () => {
      cancelled = true;
      globalThis.clearTimeout(timer);
    };
  }, []);

  // Reduced motion → no scroll listener, no getTotalLength work. about.css
  // renders the static completed drawing in that case.
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // A2 — scroll-scrubbed drafting line.
  useEffect(() => {
    if (drawingDeferred || reducedMotion) return;

    const drawing = drawingRef.current;
    const section = heroRef.current;
    if (!drawing || !section) return;

    const svg = drawing.querySelector("svg");
    if (!svg) return;

    // Stroked geometry only (walls, dimension lines, door arcs, window
    // breaks, compass, title-block border, stamp rings). Pattern-fill grid
    // rects (stroke "none") and text are excluded.
    const strokes = Array.from(
      svg.querySelectorAll("line, path, rect, polyline, polygon, circle")
    ).filter((el) => {
      const cs = window.getComputedStyle(el);
      const sw = parseFloat(cs.strokeWidth || "0");
      return sw > 0 && cs.stroke !== "none" && cs.stroke !== "";
    }) as SVGGeometryElement[];

    if (strokes.length === 0) return;

    // Precompute each path length once (plan §6) and hide every stroke.
    const lengths = strokes.map((el) => el.getTotalLength());
    strokes.forEach((el, i) => {
      el.style.strokeDasharray = `${lengths[i]}`;
    });

    const applyProgress = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // p = 1 when the hero top is at the viewport top (drawing complete on
      // load — matches the CSS baseline, no flash); p = 0 once the hero top
      // is one range above the viewport top (drawing drafted out). Scroll
      // direction maps 1:1 to stroke-dashoffset.
      const range = vh * 0.85;
      let p = 1 + rect.top / range;
      p = Math.min(1, Math.max(0, p));
      strokes.forEach((el, i) => {
        el.style.strokeDashoffset = `${lengths[i] * (1 - p)}`;
      });
      return rect;
    };

    applyProgress();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        const rect = applyProgress();
        // Once the hero fully leaves the viewport, settle to the completed
        // drawing and drop the listener (plan §6 / §7 A2).
        if (rect.bottom < 0) {
          strokes.forEach((el) => {
            el.style.strokeDashoffset = "0";
          });
          window.removeEventListener("scroll", onScroll);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [drawingDeferred, reducedMotion]);

  const handleWhatsAppClick = () => {
    trackEvent({
      action: "contact_click",
      category: "contact",
      method: "whatsapp",
      service_slug: "about-us",
    });
    window.open(content.ctaPrimary.href, "_blank");
  };

  return (
    <section
      id="sheet-01"
      ref={heroRef}
      aria-labelledby="about-hero-heading"
      className="about-hero relative overflow-hidden"
    >
      <BlueprintGrid fadeBottom>
        <GradientMesh />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-18 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* Text column — stays the LCP element */}
            <div className="max-w-xl">
              <p className="about-hero-eyebrow font-roboto-mono text-xs uppercase tracking-widest">
                {content.eyebrow}
              </p>
              <h1
                id="about-hero-heading"
                className="mt-4 font-montserrat text-h1 font-bold leading-tight text-(--about-heading)"
              >
                {content.h1}
              </h1>
              <p className="mt-5 text-body-lg text-(--about-text)">
                {content.subhead}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button variant="cta" onClick={handleWhatsAppClick}>
                  {content.ctaPrimary.label}
                </Button>
                {/* Custom Link (not Button outline) so the border/ink follow
                    the --about-* tokens in both cyanotype themes. */}
                <Link
                  href={content.ctaSecondary.href}
                  className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-(--about-line) px-6 py-3 text-body font-medium text-(--about-ink) transition-colors duration-200 hover:bg-(--about-card) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--about-amber) focus-visible:ring-offset-2"
                >
                  {content.ctaSecondary.label}
                </Link>
              </div>

              <DivisionStrip
                items={content.divisions}
                youAreHereLabel={content.youAreHereLabel}
                className="mt-10"
              />
            </div>

            {/* Drawing column — A2 scroll-scrubbed floor plan */}
            <div
              ref={drawingRef}
              aria-hidden="true"
              className={`about-hero-scrub relative text-(--about-ink) ${
                drawingDeferred ? "drawing-deferred" : ""
              }`}
            >
              <SceneA_FloorPlan />
            </div>
          </div>
        </div>
      </BlueprintGrid>
    </section>
  );
}

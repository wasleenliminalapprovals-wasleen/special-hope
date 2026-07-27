/**
 * HeroSection — Homepage hero with animated SVG floor plan, H1, and CTAs.
 *
 * Design:
 * - Mobile: stacked (text top, drawing bottom, or vice versa)
 * - Desktop: side-by-side (text left, drawing right)
 * - Drawing uses SceneA_FloorPlan (animated SVG)
 *
 * @see /plans/complete-build-plan.md (Phase 6.1 — Homepage Hero)
 */

import Button from "@/components/ui/Button";
import { SITE, NAP } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative bg-brand-blue overflow-hidden">
      {/* Background pattern / subtle overlay */}
      <div className="absolute inset-0 opacity-10" />

      <div className="relative max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-20 lg:py-28">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
          {/* ===== Text Content ===== */}
          <div className="text-center md:text-left">
            <h1 className="text-h1 font-montserrat text-white leading-tight mb-4">
              {SITE.tagline}
            </h1>

            <p className="text-body-lg text-white/90 max-w-xl mb-8 leading-relaxed">
              Expert guidance through Dubai's approval landscape — DM,
              DDA, DEWA, DCD & more. Fast-track your project with
              Wasleen Approvals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                variant="cta"
                href={`https://wa.me/${NAP.whatsapp}`}
                external
                className="text-body font-semibold px-8 py-4"
                aria-label="Get a free consultation via WhatsApp"
              >
                Get Free Consultation
              </Button>

              <Button
                variant="outline"
                href="/approvals"
                className="text-body px-8 py-4 border-white text-white hover:bg-white hover:text-brand-blue"
                aria-label="Browse all approval services"
              >
                View All Approvals
              </Button>
            </div>

            {/* Trust signal: small stats row */}
            <div className="mt-8 pt-6 border-t border-white/20 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-h3 font-montserrat text-cta-amber">52+</p>
                <p className="text-caption text-white/70">Approval Types</p>
              </div>
              <div>
                <p className="text-h3 font-montserrat text-cta-amber">500+</p>
                <p className="text-caption text-white/70">Projects Delivered</p>
              </div>
              <div>
                <p className="text-h3 font-montserrat text-cta-amber">8+</p>
                <p className="text-caption text-white/70">Years Experience</p>
              </div>
            </div>
          </div>

          {/* ===== Animated SVG Drawing Placeholder ===== */}
          <div className="hidden md:flex justify-center items-center" aria-hidden="true">
            <div className="w-full max-w-md aspect-square rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-white/20 flex items-center justify-center">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 200 200"
                    fill="none"
                    className="text-white"
                  >
                    {/* Simplified floor plan icon */}
                    <rect x="20" y="20" width="160" height="160" stroke="currentColor" strokeWidth="4" fill="none" />
                    <line x1="100" y1="20" x2="100" y2="100" stroke="currentColor" strokeWidth="3" />
                    <line x1="100" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="3" />
                    <rect x="30" y="110" width="60" height="50" stroke="currentColor" strokeWidth="2" fill="none" />
                    <line x1="60" y1="110" x2="60" y2="130" stroke="currentColor" strokeWidth="2" />
                    <circle cx="60" cy="140" r="3" fill="currentColor" />
                  </svg>
                </div>
                <p className="text-body-sm text-white/60">
                  Animated floor plan scene coming in Phase 12
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

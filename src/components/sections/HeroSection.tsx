/**
 * HeroSection — Homepage hero with animated SVG floor plan, H1, and CTAs.
 *
 * Design:
 * - Mobile: stacked (text top, drawing bottom, or vice versa)
 * - Desktop: side-by-side (text left, drawing right)
 * - Drawing uses SceneA_FloorPlan (animated SVG)
 *
 * Tracks WhatsApp clicks via GTM analytics.
 *
 * @see /plans/complete-build-plan.md (Phase 6.1 — Homepage Hero)
 */

"use client";

import Button from "@/components/ui/Button";
import SceneA_FloorPlan from "@/components/drawings/SceneA_FloorPlan";
import { SITE, NAP, WHATSAPP_MESSAGE } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

export default function HeroSection() {
  const whatsappUrl = `https://wa.me/${NAP.whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const handleWhatsAppClick = () => {
    trackEvent({
      action: "contact_click",
      category: "contact",
      method: "whatsapp",
      service_slug: "homepage",
    });
    window.open(whatsappUrl, "_blank");
  };

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
              Expert guidance through Dubai's approval landscape &mdash; DM,
              DDA, DEWA, DCD & more. Fast-track your project with
              Wasleen Approvals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                variant="cta"
                onClick={handleWhatsAppClick}
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

          {/* ===== Animated SVG Floor Plan Drawing ===== */}
          <div
            className="hidden md:block w-full max-w-md aspect-square text-white"
            aria-hidden="true"
          >
            <SceneA_FloorPlan />
          </div>
        </div>
      </div>
    </section>
  );
}

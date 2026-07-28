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
          {/* ===== Text Content (z-10 on mobile to sit above drawing) ===== */}
          <div className="relative z-10 text-center md:text-left">
            <h1 className="text-h1 font-montserrat text-white leading-tight mb-4">
              Fast-Track Dubai Municipality, DDA, DEWA & DCD Project Approvals in UAE
            </h1>

            <p className="text-body-lg text-white/90 max-w-xl mb-8 leading-relaxed">
              Expert approval consultants serving Business Bay, Downtown Dubai, JLT, Sheikh Zayed
              Road, JAFZA, Meydan, Al Quoz, and all Dubai free zones. We manage DM building permits,
              DCD civil defense NOCs, DEWA connections, DDA fit-out approvals, and 48+ other
              government and developer permits across the UAE.
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
                className="text-body px-8 py-4 border-white text-white hover:bg-cta-amber hover:text-brand-black hover:border-cta-amber"
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
          {/*
            Mobile: absolutely positioned background overlay behind text
            Desktop: side-by-side grid column (md: overrides absolute)
          */}
          <div
            className="
              absolute inset-0 z-0 opacity-15 pointer-events-none overflow-hidden
              md:relative md:inset-auto md:z-auto md:opacity-100 md:pointer-events-auto
              md:block md:w-full md:max-w-lg text-white
            "
            aria-hidden="true"
          >
            <SceneA_FloorPlan />
          </div>
        </div>
      </div>
    </section>
  );
}

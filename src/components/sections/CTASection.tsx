/**
 * CTASection — Final call to action section used on homepage and approval pages.
 *
 * Displays three contact methods: phone, WhatsApp, and contact form link.
 * Designed for high conversion — prominent amber CTA button.
 * Tracks WhatsApp clicks via GTM analytics with service_slug context.
 *
 * @see /plans/complete-build-plan.md (Phase 6.8 — CTA Section)
 */

"use client";

import Button from "@/components/ui/Button";
import { FileText, Phone, MessageCircle, Mail } from "lucide-react";
import { NAP, WHATSAPP_MESSAGE } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

interface CTASectionProps {
  /** Slug of the page/section this CTA appears on, for analytics tracking */
  service_slug?: string;
}

export default function CTASection({ service_slug = "general" }: CTASectionProps) {
  const whatsappUrl = `https://wa.me/${NAP.whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const handleWhatsAppClick = () => {
    trackEvent({
      action: "contact_click",
      category: "contact",
      method: "whatsapp",
      service_slug,
    });
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="bg-brand-blue">
      <div className="max-w-6xl mx-auto px-4 py-16 md:px-8 md:py-20 text-center">
        <h2 className="text-h2 font-montserrat text-white mb-4">
          Ready to Get Started?
        </h2>

        <p className="text-body-lg text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
          Contact us today for a free consultation. We'll guide you
          through every step of the approval process.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Button
            variant="cta"
            href="/free-quote"
            className="text-body font-semibold px-8 py-4"
            aria-label="Get a free Dubai approval quote"
          >
            <FileText size={20} strokeWidth={1.75} />
            Get Free Quote
          </Button>

          <Button
            variant="outline"
            onClick={handleWhatsAppClick}
            className="text-body px-8 py-4 border-white text-white hover:bg-white hover:text-brand-blue"
            aria-label="Contact us via WhatsApp"
          >
            <MessageCircle size={20} strokeWidth={1.75} />
            WhatsApp Us
          </Button>

          <Button
            variant="outline"
            href={`tel:${NAP.phone}`}
            className="text-body px-8 py-4 border-white text-white hover:bg-white hover:text-brand-blue"
            aria-label={`Call us at ${NAP.phone}`}
          >
            <Phone size={20} strokeWidth={1.75} />
            Call {NAP.phone}
          </Button>
        </div>

        {/* Alternative contact methods */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/70">
          <a
            href={`mailto:${NAP.email}`}
            className="inline-flex items-center gap-2 text-body-sm hover:text-white transition-colors"
            aria-label={`Email us at ${NAP.email}`}
          >
            <Mail size={16} strokeWidth={1.75} />
            {NAP.email}
          </a>
        </div>
      </div>
    </section>
  );
}

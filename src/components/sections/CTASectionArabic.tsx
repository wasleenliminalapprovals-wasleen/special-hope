/**
 * CTASectionArabic — Arabic CTA section for use on Arabic pages.
 *
 * "use client" component that mirrors CTASection.tsx with Arabic text.
 * Needed because Arabic page templates cannot include onclick handlers
 * directly in server components.
 *
 * @usage
 * ```tsx
 * <CTASectionArabic serviceSlug={slug} />
 * ```
 */

"use client";

import { Phone, MessageCircle, Mail } from "lucide-react";
import { NAP, AR } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

interface CTASectionArabicProps {
  /** Slug of the page/section this CTA appears on, for analytics tracking */
  serviceSlug?: string;
}

export default function CTASectionArabic({ serviceSlug = "general" }: CTASectionArabicProps) {
  const whatsappUrl = `https://wa.me/${NAP.whatsapp}?text=${encodeURIComponent(AR.whatsappMessage)}`;

  const handleWhatsAppClick = () => {
    trackEvent({
      action: "contact_click",
      category: "contact",
      method: "whatsapp",
      service_slug: serviceSlug,
    });
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="bg-brand-blue">
      <div className="max-w-6xl mx-auto px-4 py-16 md:px-8 md:py-20 text-center">
        <h2 className="text-h2 font-montserrat text-white mb-4">
          {AR.cta.getStarted}
        </h2>

        <p className="text-body-lg text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
          اتصل بنا اليوم للحصول على استشارة مجانية. سنرشدك خلال كل خطوة من عملية الموافقة.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <button
            onClick={handleWhatsAppClick}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-cta-amber text-brand-black font-semibold px-8 py-4 text-body hover:bg-cta-amber-hover transition-colors"
            aria-label="تواصل معنا عبر واتساب"
          >
            <MessageCircle size={20} strokeWidth={1.75} />
            {AR.cta.whatsapp}
          </button>

          <a
            href={`tel:${NAP.phone}`}
            className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-white text-white font-semibold px-8 py-4 text-body hover:bg-white hover:text-brand-blue transition-colors"
            aria-label={`اتصل بنا على ${NAP.phone}`}
          >
            <Phone size={20} strokeWidth={1.75} />
            {AR.cta.callUs} {NAP.phone}
          </a>
        </div>

        {/* Alternative contact methods */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/70">
          <a
            href={`mailto:${NAP.email}`}
            className="inline-flex items-center gap-2 text-body-sm hover:text-white transition-colors"
            aria-label={`راسلنا عبر البريد الإلكتروني ${NAP.email}`}
          >
            <Mail size={16} strokeWidth={1.75} />
            {NAP.email}
          </a>
        </div>
      </div>
    </section>
  );
}

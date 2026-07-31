/**
 * LicenseWhatsAppButtonArabic — "طلب نسخة من الرخصة" CTA for the Arabic
 * /ar/license page.
 *
 * Client component (required for analytics) that renders a REAL server-rendered
 * <a href> to WhatsApp — navigation works without JavaScript (master rule:
 * no JS-only navigation). The onClick only enhances it with GTM tracking.
 *
 * Fires the `whatsapp_license_request` micro-conversion event
 * (see reference details/analytics-tracking.md §4).
 */

"use client";

import { MessageCircle } from "lucide-react";
import { NAP, AR } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

interface LicenseWhatsAppButtonArabicProps {
  /** Additional CSS classes */
  className?: string;
}

export default function LicenseWhatsAppButtonArabic({
  className = "",
}: LicenseWhatsAppButtonArabicProps) {
  const whatsappUrl = `https://wa.me/${NAP.whatsapp}?text=${encodeURIComponent(
    AR.license.whatsappMessage,
  )}`;

  const handleClick = () => {
    trackEvent({
      action: "whatsapp_license_request",
      category: "lead",
      method: "whatsapp",
      service_slug: "license",
    });
  };

  const baseClasses =
    "inline-flex items-center justify-center gap-2 px-6 py-3 text-body font-medium rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-cta-amber text-brand-black hover:bg-cta-amber-hover focus-visible:ring-cta-amber";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`${baseClasses} ${className}`.trim()}
      aria-label="طلب نسخة من الرخصة التجارية عبر واتساب"
    >
      <MessageCircle size={20} strokeWidth={1.75} />
      طلب نسخة من الرخصة
    </a>
  );
}

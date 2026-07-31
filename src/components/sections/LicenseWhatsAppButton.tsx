/**
 * LicenseWhatsAppButton — "Request License Copy" CTA for the /license page.
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
import { NAP, WHATSAPP_LICENSE_MESSAGE } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

interface LicenseWhatsAppButtonProps {
  /** Additional CSS classes */
  className?: string;
}

export default function LicenseWhatsAppButton({
  className = "",
}: LicenseWhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${NAP.whatsapp}?text=${encodeURIComponent(
    WHATSAPP_LICENSE_MESSAGE,
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
      aria-label="Request a copy of our DED trade license via WhatsApp"
    >
      <MessageCircle size={20} strokeWidth={1.75} />
      Request License Copy
    </a>
  );
}

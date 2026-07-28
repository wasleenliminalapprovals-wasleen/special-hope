/**
 * WhatsAppButton — Client component for WhatsApp CTA with analytics tracking.
 *
 * Renders a styled anchor tag that:
 * 1. Opens WhatsApp with a pre-filled enquiry message
 * 2. Fires a GTM analytics event for tracking conversions
 *
 * Used in contact-us page where metadata export prevents "use client" at page level.
 */

"use client";

import { MessageCircle } from "lucide-react";
import { NAP, WHATSAPP_MESSAGE } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

interface WhatsAppButtonProps {
  /** Slug for analytics context (e.g., "contact-us", "homepage") */
  service_slug?: string;
  /** Additional CSS classes */
  className?: string;
}

export default function WhatsAppButton({
  service_slug = "general",
  className = "",
}: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${NAP.whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const handleClick = () => {
    trackEvent({
      action: "contact_click",
      category: "contact",
      method: "whatsapp",
      service_slug,
    });
    window.open(whatsappUrl, "_blank");
  };

  const baseClasses =
    "inline-flex items-center justify-center gap-2 px-6 py-3 text-body font-medium rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-cta-amber text-brand-black hover:bg-cta-amber-hover focus-visible:ring-cta-amber";

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${baseClasses} ${className}`.trim()}
      aria-label="Contact us via WhatsApp"
    >
      <MessageCircle size={20} strokeWidth={1.75} />
      WhatsApp Us
    </button>
  );
}

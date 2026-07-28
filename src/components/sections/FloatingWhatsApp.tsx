/**
 * FloatingWhatsApp — Global floating WhatsApp button.
 *
 * Fixed bottom-right position on every page.
 * Opens WhatsApp with pre-filled message + analytics tracking.
 * Subtle pulse animation to draw attention without being intrusive.
 *
 * @see /plans/website-edits-optimizations-plan.md (Task 7)
 */

"use client";

import { MessageCircle } from "lucide-react";
import { NAP, WHATSAPP_MESSAGE } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

export default function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${NAP.whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const handleClick = () => {
    trackEvent({
      action: "contact_click",
      category: "contact",
      method: "whatsapp",
      service_slug: "floating-button",
    });
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="
        fixed bottom-4 right-4 z-50
        md:bottom-6 md:right-6
        flex items-center justify-center
        w-14 h-14 md:w-16 md:h-16
        rounded-full
        bg-[#25D366] hover:bg-[#20BD5D]
        text-white
        shadow-dropdown
        hover:shadow-lg
        transition-all duration-200 ease-out
        hover:scale-105 active:scale-95
        animate-whatsapp-pulse
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]
      "
      aria-label="Contact us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle size={24} strokeWidth={1.75} className="md:size-6" />
    </button>
  );
}

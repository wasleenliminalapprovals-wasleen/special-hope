"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Phone, X } from "lucide-react";
import MegaMenu from "./MegaMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import { AR, NAP } from "@/lib/constants";

/* ============================================================
   Mobile Navigation — slide-in drawer
   ============================================================ */

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  locale?: "en" | "ar";
}

function getNavLinks(locale: "en" | "ar") {
  if (locale === "ar") {
    return [
      { label: AR.nav.home, href: "/ar" },
      { label: AR.nav.guides, href: "/ar/guides" },
      { label: AR.nav.aboutUs, href: "/ar/about-us" },
      { label: AR.nav.contactUs, href: "/ar/contact-us" },
    ];
  }
  return [
    { label: "Home", href: "/" },
    { label: "Guides", href: "/guides" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact Us", href: "/contact-us" },
  ];
}

export default function MobileNav({ isOpen, onClose, locale = "en" }: MobileNavProps) {
  const NAV_LINKS = getNavLinks(locale);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState<"approvals" | "services" | null>(null);

  /* ── Trap focus inside drawer when open ── */
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  /* ── Close on route change ── */
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /* ── Close on backdrop click ── */
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/50 transition-opacity duration-300
          ${isOpen ? "visible opacity-100" : "invisible opacity-0"}
        `}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`
          fixed top-0 end-0 z-50 h-full w-[300px] max-w-[85vw] bg-white shadow-dropdown
          transform transition-transform duration-300 ease-out mobile-nav-drawer
          ${isOpen
            ? "translate-x-0"
            : locale === "ar"
              ? "-translate-x-full"
              : "translate-x-full"
          }
        `}
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-border-light">
          <span className="text-body-sm font-bold text-heading-text">{locale === "ar" ? "القائمة" : "Menu"}</span>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-card-bg transition-colors"
            aria-label={locale === "ar" ? "إغلاق قائمة التنقل" : "Close navigation menu"}
          >
            <X size={20} strokeWidth={1.75} />
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex flex-col overflow-y-auto pb-6" style={{ maxHeight: "calc(100vh - 140px)" }}>
          {/* Static nav links */}
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex items-center px-4 py-3 text-body-sm font-medium transition-colors min-h-[44px]
                ${isActive(link.href) ? "text-brand-blue bg-card-bg" : "text-body-text hover:text-brand-blue hover:bg-light-bg"}
              `}
            >
              {link.label}
            </Link>
          ))}

          {/* Mega menu sections (Approvals, Services) */}
          <MegaMenuSection
            type="approvals"
            locale={locale}
            isOpen={openMenu === "approvals"}
            onToggle={() => setOpenMenu((prev) => (prev === "approvals" ? null : "approvals"))}
          />
          <MegaMenuSection
            type="services"
            locale={locale}
            isOpen={openMenu === "services"}
            onToggle={() => setOpenMenu((prev) => (prev === "services" ? null : "services"))}
          />

          {/* CTA Row — Get Quote + Call */}
          <div className="px-4 mt-4 flex items-center gap-3">
            <Link
              href={locale === "ar" ? "/ar/free-quote" : "/free-quote"}
              className="flex items-center justify-center gap-2 flex-1 bg-cta-amber hover:bg-cta-amber-hover text-brand-black font-bold text-body-sm py-3 px-6 rounded-md transition-colors min-h-[44px]"
              aria-label={locale === "ar" ? AR.cta.requestQuote : "Get a free quote"}
              onClick={onClose}
            >
              <FileText size={18} strokeWidth={1.75} />
              <span>{locale === "ar" ? AR.cta.requestQuote : "Get Quote"}</span>
            </Link>
            <a
              href={`tel:${NAP.phone}`}
              className="flex items-center justify-center w-11 h-11 shrink-0 bg-brand-blue hover:bg-brand-blue-hover text-white rounded-md transition-colors"
              aria-label={locale === "ar" ? `اتصل بنا على ${NAP.phone}` : `Call us at ${NAP.phone}`}
            >
              <Phone size={18} strokeWidth={1.75} />
            </a>
          </div>

          {/* Language Switcher */}
          <div className="px-4 mt-3">
            <LanguageSwitcher variant="full" />
          </div>
        </nav>
      </div>
    </>
  );
}

/* ============================================================
   Sub-component: Accordion wrapper for MegaMenu in mobile
   ============================================================ */

function MegaMenuSection({
  type,
  locale,
  isOpen,
  onToggle,
}: {
  type: "approvals" | "services";
  locale: "en" | "ar";
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <MegaMenu
      type={type}
      locale={locale}
      forceMobile
      isOpen={isOpen}
      onToggle={onToggle}
    />
  );
}

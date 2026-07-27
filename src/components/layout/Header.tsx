"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";
import WasleenLogo from "@/components/logo/WasleenLogo";
import MegaMenu from "./MegaMenu";
import MobileNav from "./MobileNav";
import { NAP } from "@/lib/constants";

/* ============================================================
   Header — Sticky, with desktop nav + mobile hamburger
   ============================================================ */

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Approvals", href: "/approvals", hasMegaMenu: true as const },
  { label: "Services", href: "/services", hasMegaMenu: true as const },
  { label: "Guides", href: "/guides" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  /* ── Scroll listener for sticky shrink ── */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Close mega menus on route change ── */
  useEffect(() => {
    setActiveMegaMenu(null);
  }, [pathname]);

  /* ── Close mega menus on escape ── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMegaMenu(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname.startsWith(href);
    },
    [pathname]
  );

  const handleMegaMenuEnter = useCallback((label: string) => {
    setActiveMegaMenu(label);
  }, []);

  const handleMegaMenuLeave = useCallback(() => {
    setActiveMegaMenu(null);
  }, []);

  const openMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true);
    setActiveMegaMenu(null);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-sm
          transition-all duration-200 ease-out
          ${isScrolled ? "shadow-sticky py-1" : "py-2"}
        `}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* ── Logo ── */}
            <Link
              href="/"
              className="shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 rounded-md"
              aria-label="Wasleen Approvals — Home"
            >
              <WasleenLogo size={isScrolled ? 36 : 40} />
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => {
                if (item.hasMegaMenu) {
                  return (
                    <div key={item.label} className="relative">
                      <button
                        type="button"
                        onMouseEnter={() => handleMegaMenuEnter(item.label)}
                        onClick={() =>
                          setActiveMegaMenu((prev) =>
                            prev === item.label ? null : item.label
                          )
                        }
                        className={`
                          flex items-center gap-1 px-3 py-2 rounded-md text-body-sm font-medium
                          transition-colors min-h-[44px]
                          ${
                            isActive(item.href)
                              ? "text-brand-blue bg-card-bg"
                              : "text-body-text hover:text-brand-blue hover:bg-light-bg"
                          }
                        `}
                        aria-expanded={activeMegaMenu === item.label}
                        aria-haspopup="true"
                      >
                        {item.label}
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          className={`transition-transform duration-200 ${
                            activeMegaMenu === item.label ? "rotate-180" : ""
                          }`}
                        >
                          <path
                            d="M3 5L6 8L9 5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      <div
                        onMouseEnter={() => handleMegaMenuEnter(item.label)}
                        onMouseLeave={handleMegaMenuLeave}
                      >
                        <MegaMenu
                          type={item.label === "Approvals" ? "approvals" : "services"}
                          isActive={activeMegaMenu === item.label}
                          onMouseEnter={() => handleMegaMenuEnter(item.label)}
                          onMouseLeave={handleMegaMenuLeave}
                        />
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      px-3 py-2 rounded-md text-body-sm font-medium transition-colors min-h-[44px] flex items-center
                      ${
                        isActive(item.href)
                          ? "text-brand-blue bg-card-bg"
                          : "text-body-text hover:text-brand-blue hover:bg-light-bg"
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* ── Desktop CTA ── */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${NAP.phone}`}
                className="flex items-center gap-2 bg-cta-amber hover:bg-cta-amber-hover text-white font-bold text-body-sm py-2.5 px-5 rounded-md transition-colors shadow-sm whitespace-nowrap"
                aria-label={`Call us at ${NAP.phone}`}
              >
                <Phone size={16} strokeWidth={1.75} />
                <span>Get Free Consultation</span>
              </a>
            </div>

            {/* ── Mobile: Hamburger + CTA ── */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Mobile CTA (phone icon) */}
              <a
                href={`tel:${NAP.phone}`}
                className="flex items-center justify-center w-10 h-10 rounded-md bg-cta-amber hover:bg-cta-amber-hover text-white transition-colors"
                aria-label={`Call us at ${NAP.phone}`}
              >
                <Phone size={18} strokeWidth={1.75} />
              </a>

              {/* Hamburger */}
              <button
                type="button"
                onClick={openMobileMenu}
                className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-card-bg transition-colors"
                aria-label="Open navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                <Menu size={22} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for sticky header */}
      <div className={`transition-all duration-200 ${isScrolled ? "h-[57px]" : "h-[65px]"}`} />

      {/* Mobile navigation drawer */}
      <MobileNav isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </>
  );
}

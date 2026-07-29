"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import { getOppositeLocale, getLang, localePrefix } from "@/lib/locale";
import { Languages } from "lucide-react";

/**
 * Language Switcher Component
 *
 * Toggles between the current page's English and Arabic counterpart.
 * - English pages: shows "العربية" → navigates to /ar/... equivalent
 * - Arabic pages: shows "English" → navigates to the root-path equivalent
 *
 * @see plans/arabic-market-domination-reconciled-plan.md §3.1
 */

interface LanguageSwitcherProps {
  /** Visual variant — 'icon' for header bar, 'full' for mobile menu */
  variant?: "icon" | "full";
}

export default function LanguageSwitcher({ variant = "icon" }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const { isEnglish, targetHref, label, hreflang } = useMemo(() => {
    const isEnglish = !pathname.startsWith("/ar");
    const targetLocale = getOppositeLocale(isEnglish ? "en" : "ar");

    // Build the target path
    let target: string;
    if (isEnglish) {
      // Currently on English page → prepend /ar
      target = `/ar${pathname === "/" ? "" : pathname}`;
    } else {
      // Currently on Arabic page → strip /ar prefix
      target = pathname.replace(/^\/ar(?:\/|$)/, "/") || "/";
    }

    return {
      isEnglish,
      targetHref: target,
      label: isEnglish ? "العربية" : "English",
      hreflang: getLang(targetLocale),
    };
  }, [pathname]);

  const handleClick = useCallback(() => {
    // Track language switch event (if analytics is available)
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "language_switch", {
        from_language: isEnglish ? "en" : "ar",
        to_language: isEnglish ? "ar" : "en",
        path: pathname,
      });
    }
  }, [isEnglish, pathname]);

  if (variant === "full") {
    return (
      <Link
        href={targetHref}
        onClick={handleClick}
        hrefLang={hreflang}
        aria-label={`Switch to ${label}`}
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-brand-blue text-white hover:bg-brand-blue-hover transition-colors text-sm font-medium"
      >
        <Languages size={18} strokeWidth={1.75} aria-hidden="true" />
        <span>{label}</span>
      </Link>
    );
  }

  // Icon variant — compact for header toolbar (light background)
  return (
    <Link
      href={targetHref}
      onClick={handleClick}
      hrefLang={hreflang}
      aria-label={`Switch to ${label}`}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-body-text hover:text-brand-blue hover:bg-card-bg transition-colors"
    >
      <Languages size={16} strokeWidth={1.75} aria-hidden="true" />
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}

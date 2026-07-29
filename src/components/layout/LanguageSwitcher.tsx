"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import { getOppositeLocale, getLang } from "@/lib/locale";

/**
 * Language Switcher Component
 *
 * Displays two small colored boxes side by side — EN (blue) and AR (green).
 * The active language is shown with a darker background + border.
 * The inactive language is clickable to switch.
 *
 * No icon is used — only text labels "EN" and "AR".
 *
 * @see plans/fix-3-arabic-vercel-issues.md (Issue 3)
 */

interface LanguageSwitcherProps {
  /** Visual variant — 'icon' for header bar, 'full' for mobile menu */
  variant?: "icon" | "full";
}

export default function LanguageSwitcher({ variant = "icon" }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const { isEnglish, targetHref } = useMemo(() => {
    const isEnglish = !pathname.startsWith("/ar");

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

  return (
    <div
      className={`flex items-center gap-1 ${variant === "full" ? "justify-center" : ""}`}
      role="group"
      aria-label="Language switcher"
    >
      {/* English box */}
      <Link
        href={isEnglish ? "#" : targetHref}
        onClick={isEnglish ? undefined : handleClick}
        hrefLang="en"
        aria-current={isEnglish ? "true" : undefined}
        aria-label={isEnglish ? "Current language: English" : "Switch to English"}
        className={`
          inline-flex items-center justify-center rounded font-bold transition-colors
          ${variant === "full" ? "px-4 py-2 text-sm" : "px-2 py-1 text-xs"}
          ${
            isEnglish
              ? "bg-blue-100 text-blue-800 cursor-default ring-1 ring-blue-300"
              : "bg-gray-100 text-gray-400 hover:bg-blue-50 hover:text-blue-600 hover:ring-1 hover:ring-blue-200"
          }
        `}
      >
        EN
      </Link>

      {/* Arabic box */}
      <Link
        href={!isEnglish ? "#" : targetHref}
        onClick={!isEnglish ? undefined : handleClick}
        hrefLang="ar"
        aria-current={!isEnglish ? "true" : undefined}
        aria-label={!isEnglish ? "Current language: Arabic" : "Switch to Arabic"}
        className={`
          inline-flex items-center justify-center rounded font-bold transition-colors
          ${variant === "full" ? "px-4 py-2 text-sm" : "px-2 py-1 text-xs"}
          ${
            !isEnglish
              ? "bg-green-100 text-green-800 cursor-default ring-1 ring-green-300"
              : "bg-gray-100 text-gray-400 hover:bg-green-50 hover:text-green-600 hover:ring-1 hover:ring-green-200"
          }
        `}
      >
        AR
      </Link>
    </div>
  );
}

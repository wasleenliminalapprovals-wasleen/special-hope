/**
 * Locale Utility Library
 *
 * Single source of truth for locale-aware helpers used across both
 * English and Arabic layouts/pages. Prevents scattered `if (locale === 'ar')`
 * conditionals throughout the codebase.
 *
 * @see plans/arabic-market-domination-reconciled-plan.md §0.8
 */

import { LOCALE } from "@/lib/constants";

/* ── Type helpers ─────────────────────────────────────────── */

export type SupportedLocale = "en" | "ar";

/**
 * Check if the given locale code represents Arabic.
 */
export function isArabic(locale: string): boolean {
  return locale === "ar" || locale.startsWith("ar");
}

/**
 * Returns the full BCP 47 language tag for the given locale.
 *
 * @example getLang("en") // "en-AE"
 * @example getLang("ar") // "ar-AE"
 */
export function getLang(locale: string): string {
  if (isArabic(locale)) return "ar-AE";
  return "en-AE";
}

/**
 * Returns the writing direction for the given locale.
 * Used to set `dir` attribute on <html>.
 *
 * @example getDir("en") // "ltr"
 * @example getDir("ar") // "rtl"
 */
export function getDir(locale: string): "rtl" | "ltr" {
  if (isArabic(locale)) return "rtl";
  return "ltr";
}

/**
 * Returns the Open Graph locale value.
 * Used for `og:locale` meta tag.
 *
 * @example getOgLocale("en") // "en_AE"
 * @example getOgLocale("ar") // "ar_AE"
 */
export function getOgLocale(locale: string): string {
  if (isArabic(locale)) return "ar_AE";
  return "en_AE";
}

/**
 * Returns the alternative locale (the opposite of the current one).
 * Useful for language switcher links.
 *
 * @example getOppositeLocale("en") // "ar"
 * @example getOppositeLocale("ar") // "en"
 */
export function getOppositeLocale(locale: string): SupportedLocale {
  if (isArabic(locale)) return "en";
  return "ar";
}

/**
 * Get the locale prefix for URL construction.
 * English pages have no prefix; Arabic pages have "/ar".
 *
 * @example localePrefix("en") // ""
 * @example localePrefix("ar") // "/ar"
 */
export function localePrefix(locale: string): string {
  if (isArabic(locale)) return "/ar";
  return "";
}

/**
 * Localized data selector.
 *
 * Given a data object that may have an optional `ar` field, returns
 * the Arabic content when the locale is Arabic, or the whole object
 * (English content) otherwise.
 *
 * @example
 *   const approval = getLocalizedData(approvalData, "ar");
 *   // returns approvalData.ar (the Arabic content object)
 *
 *   const approval = getLocalizedData(approvalData, "en");
 *   // returns approvalData (the full English data object)
 */
export function getLocalizedData<T extends { ar?: unknown }>(
  data: T,
  locale: string,
): T | NonNullable<T["ar"]> {
  if (isArabic(locale) && data.ar) {
    return data.ar as NonNullable<T["ar"]>;
  }
  return data;
}

/**
 * Default locale constant.
 */
export const DEFAULT_LOCALE: SupportedLocale = "en";

/**
 * All supported locales in this application.
 */
export const SUPPORTED_LOCALES: SupportedLocale[] = ["en", "ar"];

/**
 * Generate hreflang `alternates.languages` object for a given path.
 *
 * Automatically derives the bilingual counterpart:
 * - English path "/about-us" → Arabic path "/ar/about-us"
 * - Arabic path "/ar/about-us" → English path "/about-us"
 * - Home paths "/" ↔ "/ar" are handled correctly.
 *
 * @example
 * hreflangAlternates("https://example.com", "/about-us")
 * // { "en-AE": "https://example.com/about-us",
 * //   "ar-AE": "https://example.com/ar/about-us",
 * //   "x-default": "https://example.com/about-us" }
 *
 * @example
 * hreflangAlternates("https://example.com", "/ar/about-us")
 * // { "en-AE": "https://example.com/about-us",
 * //   "ar-AE": "https://example.com/ar/about-us",
 * //   "x-default": "https://example.com/about-us" }
 */
export function hreflangAlternates(baseUrl: string, currentPath: string): Record<string, string> {
  if (currentPath.startsWith("/ar")) {
    // Arabic page — derive English counterpart
    const enPath = currentPath === "/ar" ? "/" : currentPath.replace(/^\/ar/, "") || "/";
    return {
      "en-AE": `${baseUrl}${enPath}`,
      "ar-AE": `${baseUrl}${currentPath}`,
      "x-default": `${baseUrl}${enPath}`,
    };
  }
  // English page — derive Arabic counterpart
  const arPath = currentPath === "/" ? "/ar" : `/ar${currentPath}`;
  return {
    "en-AE": `${baseUrl}${currentPath}`,
    "ar-AE": `${baseUrl}${arPath}`,
    "x-default": `${baseUrl}${currentPath}`,
  };
}

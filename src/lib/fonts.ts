/**
 * Font Configuration — Single source of truth for all next/font loading.
 *
 * Both English layout (src/app/layout.tsx) and Arabic layout (src/app/ar/layout.tsx)
 * import from this module. Future font changes happen in one place.
 *
 * Usage:
 *   import { fontVariables, localeFontVariable } from "@/lib/fonts";
 *   <html className={fontVariables} />            // English
 *   <html className={`${fontVariables} ${localeFontVariable('ar')}`} />  // Arabic
 */

import { Montserrat, Roboto, Roboto_Mono, Noto_Sans_Arabic } from "next/font/google";

/* ------------------------------------------------------------------ */
/*  English Fonts (unchanged from original layout.tsx)                  */
/* ------------------------------------------------------------------ */

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto-mono",
  display: "swap",
});

/* ------------------------------------------------------------------ */
/*  Arabic Font                                                        */
/* ------------------------------------------------------------------ */

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-arabic",
  display: "swap",
});

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

/**
 * CSS class string for all English fonts — same as the original
 * `${montserrat.variable} ${roboto.variable} ${robotoMono.variable}`.
 */
export const englishFontVariables = `${montserrat.variable} ${roboto.variable} ${robotoMono.variable}`;

/**
 * CSS class string for all fonts (English + Arabic).
 * Used by the Arabic layout which needs both font families.
 */
export const allFontVariables = `${englishFontVariables} ${notoSansArabic.variable}`;

/**
 * Locale-aware font variable selector.
 *
 * @returns The CSS variable string to apply on <html> for the given locale.
 *
 * @example
 *   // In English layout:
 *   <html className={fontVariables('en')}>
 *
 *   // In Arabic layout:
 *   <html className={fontVariables('ar')}>
 */
export function fontVariables(locale: "en" | "ar"): string {
  if (locale === "ar") {
    return allFontVariables;
  }
  return englishFontVariables;
}

/**
 * Returns just the locale-specific font variable (not all fonts).
 * Useful for applying locale font on <body> while keeping shared fonts on <html>.
 */
export function localeFontVariable(locale: "en" | "ar"): string {
  if (locale === "ar") {
    return notoSansArabic.variable;
  }
  return "";
}

/**
 * Returns the Tailwind font-family class for the given locale.
 */
export function fontFamilyClass(locale: "en" | "ar"): string {
  if (locale === "ar") {
    return "font-noto-sans-arabic";
  }
  return "font-roboto";
}

/* ------------------------------------------------------------------ */
/*  Individual font exports (for direct use if needed)                  */
/* ------------------------------------------------------------------ */

export {
  montserrat,
  roboto,
  robotoMono,
  notoSansArabic,
};

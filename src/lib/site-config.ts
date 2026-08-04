/**
 * Shared Sitewide Head Configuration
 *
 * Single source of truth for GTM, analytics, and sitewide schema injection.
 * Both English layout (src/app/layout.tsx) and Arabic layout (src/app/ar/layout.tsx)
 * import from this module so that any future update (new tracking pixel, changed GTM ID,
 * additional schema) happens in one place — preventing silent drift between layouts.
 *
 * Usage:
 *   import { siteConfig } from "@/lib/site-config";
 *   const { gtmId, gaId, sitewideSchema } = siteConfig('en');
 *
 * @see plans/arabic-market-domination-reconciled-plan.md §0.7
 */

import { GTM_ID, GA_MEASUREMENT_ID, META_PIXEL_ID } from "@/lib/constants";
import { organizationSchema, websiteSchema } from "@/lib/schema";

export interface SiteConfig {
  /** Google Tag Manager container ID */
  gtmId: string;
  /** Google Analytics 4 measurement ID */
  gaId: string;
  /** Meta Pixel ID (Facebook / Meta ads attribution) */
  metaPixelId: string;
  /**
   * Sitewide JSON-LD schema objects (Organization + WebSite).
   * These are injected once in the root <body> via <script type="application/ld+json">.
   */
  sitewideSchema: Record<string, unknown>[];
}

/**
 * Returns locale-aware sitewide configuration.
 *
 * Both layouts call this function. The locale parameter is passed through
 * to schema generators so they produce correct @id and name values.
 *
 * @param locale - The target locale ('en' | 'ar')
 * @returns SiteConfig object with GTM ID, GA ID, and sitewide schema array
 */
export function siteConfig(locale: "en" | "ar" = "en"): SiteConfig {
  return {
    gtmId: GTM_ID,
    gaId: GA_MEASUREMENT_ID,
    metaPixelId: META_PIXEL_ID,
    sitewideSchema: [
      organizationSchema(locale),
      websiteSchema(locale),
    ],
  };
}

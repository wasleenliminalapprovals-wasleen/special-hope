/**
 * Dynamic sitemap.xml generator — 3-way split index for ~190+ bilingual pages.
 *
 * Google strictly recommends sitemaps for HTML pages only. Text files intended
 * for AI agents (llms.txt, llms-full.txt) are served at their root URL and
 * MUST be excluded from the XML sitemap to avoid Soft 404 / crawl issues.
 *
 * Split structure (for future scale with dozens more guides/locations):
 *   sitemap/1.xml  — Core Pages    (home, about-us, contact-us, hubs — en + ar)
 *   sitemap/2.xml  — Service Pages (52 approvals + 5 services — en + ar)
 *   sitemap/3.xml  — Guide Pages   (30+ guides — en + ar)
 *
 * All three are registered in robots.ts so Googlebot discovers every page.
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md for SEO rules
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md for sitemap requirements
 */

import type { MetadataRoute } from "next";
import { approvals } from "@/data/approvals";
import { guides } from "@/data/guides";
import { services } from "@/data/services";
import { SITE } from "@/lib/constants";

const BASE_URL = SITE.url;

/* ── Sitemap segments ──────────────────────────────────────── */

export async function generateSitemaps() {
  return [{ id: 1 }, { id: 2 }, { id: 3 }];
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  switch (id) {
    case 1:
      return buildCoreSitemap();
    case 2:
      return buildServiceSitemap();
    case 3:
      return buildGuideSitemap();
    default:
      return [];
  }
}

/* ================================================================
   Sitemap 1 — Core Pages (static pages + hub pages, en + ar)
   ================================================================ */

function buildCoreSitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Homepage — English + Arabic
  entries.push({
    url: BASE_URL,
    lastModified: new Date("2026-07-15"),
    changeFrequency: "weekly",
    priority: 1.0,
    alternates: {
      languages: {
        "ar-AE": `${BASE_URL}/ar`,
        "x-default": BASE_URL,
      },
    },
  });

  entries.push({
    url: `${BASE_URL}/ar`,
    lastModified: new Date("2026-07-28"),
    changeFrequency: "weekly",
    priority: 0.9,
    alternates: {
      languages: {
        "en-AE": BASE_URL,
        "x-default": BASE_URL,
      },
    },
  });

  // About Us — English + Arabic
  entries.push({
    url: `${BASE_URL}/about-us`,
    lastModified: new Date("2026-07-01"),
    changeFrequency: "monthly",
    priority: 0.6,
    alternates: {
      languages: {
        "ar-AE": `${BASE_URL}/ar/about-us`,
        "x-default": `${BASE_URL}/about-us`,
      },
    },
  });

  entries.push({
    url: `${BASE_URL}/ar/about-us`,
    lastModified: new Date("2026-07-28"),
    changeFrequency: "monthly",
    priority: 0.6,
    alternates: {
      languages: {
        "en-AE": `${BASE_URL}/about-us`,
        "x-default": `${BASE_URL}/about-us`,
      },
    },
  });

  // Contact Us — English + Arabic
  entries.push({
    url: `${BASE_URL}/contact-us`,
    lastModified: new Date("2026-07-01"),
    changeFrequency: "monthly",
    priority: 0.6,
    alternates: {
      languages: {
        "ar-AE": `${BASE_URL}/ar/contact-us`,
        "x-default": `${BASE_URL}/contact-us`,
      },
    },
  });

  entries.push({
    url: `${BASE_URL}/ar/contact-us`,
    lastModified: new Date("2026-07-28"),
    changeFrequency: "monthly",
    priority: 0.6,
    alternates: {
      languages: {
        "en-AE": `${BASE_URL}/contact-us`,
        "x-default": `${BASE_URL}/contact-us`,
      },
    },
  });

  // Hub pages — English + Arabic
  const hubs = [
    { path: "/approvals", priority: 0.9, lastMod: "2026-07-15" },
    { path: "/guides", priority: 0.8, lastMod: "2026-07-15" },
    { path: "/services", priority: 0.8, lastMod: "2026-07-01" },
  ] as const;

  for (const hub of hubs) {
    // English
    entries.push({
      url: `${BASE_URL}${hub.path}`,
      lastModified: new Date(hub.lastMod),
      changeFrequency: "weekly",
      priority: hub.priority,
      alternates: {
        languages: {
          "ar-AE": `${BASE_URL}/ar${hub.path}`,
          "x-default": `${BASE_URL}${hub.path}`,
        },
      },
    });
    // Arabic
    entries.push({
      url: `${BASE_URL}/ar${hub.path}`,
      lastModified: new Date("2026-07-28"),
      changeFrequency: "weekly",
      priority: hub.priority - 0.1,
      alternates: {
        languages: {
          "en-AE": `${BASE_URL}${hub.path}`,
          "x-default": `${BASE_URL}${hub.path}`,
        },
      },
    });
  }

  return entries;
}

/* ================================================================
   Sitemap 2 — Service Pages (52 approvals + 5 services, en + ar)
   ================================================================ */

function buildServiceSitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Approval pages — 52 English + 52 Arabic
  for (const approval of approvals) {
    const slug = approval.slug;
    // English
    entries.push({
      url: `${BASE_URL}/approvals/${slug}`,
      lastModified: new Date(approval.lastUpdated),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          "ar-AE": `${BASE_URL}/ar/approvals/${slug}`,
          "x-default": `${BASE_URL}/approvals/${slug}`,
        },
      },
    });
    // Arabic
    entries.push({
      url: `${BASE_URL}/ar/approvals/${slug}`,
      lastModified: new Date(approval.lastUpdated),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          "en-AE": `${BASE_URL}/approvals/${slug}`,
          "x-default": `${BASE_URL}/approvals/${slug}`,
        },
      },
    });
  }

  // Service pages — 5 English + 5 Arabic
  for (const service of services) {
    const slug = service.slug;
    // English
    entries.push({
      url: `${BASE_URL}/services/${slug}`,
      lastModified: new Date(service.lastUpdated),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          "ar-AE": `${BASE_URL}/ar/services/${slug}`,
          "x-default": `${BASE_URL}/services/${slug}`,
        },
      },
    });
    // Arabic
    entries.push({
      url: `${BASE_URL}/ar/services/${slug}`,
      lastModified: new Date(service.lastUpdated),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          "en-AE": `${BASE_URL}/services/${slug}`,
          "x-default": `${BASE_URL}/services/${slug}`,
        },
      },
    });
  }

  return entries;
}

/* ================================================================
   Sitemap 3 — Guide / Q&A Pages (30+ en + ar)
   ================================================================ */

function buildGuideSitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const guide of guides) {
    const slug = guide.slug;
    // English — bumped to 0.7 for AI search priority (Google AI Overviews, ChatGPT Search)
    entries.push({
      url: `${BASE_URL}/guides/${slug}`,
      lastModified: new Date(guide.lastUpdated),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          "ar-AE": `${BASE_URL}/ar/guides/${slug}`,
          "x-default": `${BASE_URL}/guides/${slug}`,
        },
      },
    });
    // Arabic
    entries.push({
      url: `${BASE_URL}/ar/guides/${slug}`,
      lastModified: new Date(guide.lastUpdated),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          "en-AE": `${BASE_URL}/guides/${slug}`,
          "x-default": `${BASE_URL}/guides/${slug}`,
        },
      },
    });
  }

  return entries;
}

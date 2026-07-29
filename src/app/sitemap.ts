/**
 * Dynamic sitemap.xml generator — 128+ bilingual pages.
 *
 * Generates URLs for every page type in both English and Arabic,
 * with proper xhtml:link alternates for hreflang.
 * - Static pages (home, about-us, contact-us)
 * - Hub pages (approvals, guides, services)
 * - Approval service pages (52) — from @/data/approvals
 * - Guide / Q&A pages (30+) — from @/data/guides
 * - Service pages (5) — from @/data/services
 * - Arabic counterparts for every page
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

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  /* ================================================================
     1. STATIC PAGES — English + Arabic
     ================================================================ */

  // Homepage — English + Arabic
  entries.push({
    url: BASE_URL,
    lastModified: new Date("2026-07-15"),
    changeFrequency: "weekly",
    priority: 1.0,
    alternates: {
      languages: {
        "ar-AE": `${BASE_URL}/ar`,
      },
    },
  });

  entries.push({
    url: `${BASE_URL}/ar`,
    lastModified: new Date("2026-07-28"),
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: {
      languages: {
        "en-AE": BASE_URL,
      },
    },
  });

  // About Us — English + Arabic
  entries.push({
    url: `${BASE_URL}/about-us`,
    lastModified: new Date("2026-07-01"),
    changeFrequency: "monthly",
    priority: 0.5,
    alternates: {
      languages: {
        "ar-AE": `${BASE_URL}/ar/about-us`,
      },
    },
  });

  entries.push({
    url: `${BASE_URL}/ar/about-us`,
    lastModified: new Date("2026-07-28"),
    changeFrequency: "monthly",
    priority: 0.5,
    alternates: {
      languages: {
        "en-AE": `${BASE_URL}/about-us`,
      },
    },
  });

  // Contact Us — English + Arabic
  entries.push({
    url: `${BASE_URL}/contact-us`,
    lastModified: new Date("2026-07-01"),
    changeFrequency: "monthly",
    priority: 0.5,
    alternates: {
      languages: {
        "ar-AE": `${BASE_URL}/ar/contact-us`,
      },
    },
  });

  entries.push({
    url: `${BASE_URL}/ar/contact-us`,
    lastModified: new Date("2026-07-28"),
    changeFrequency: "monthly",
    priority: 0.5,
    alternates: {
      languages: {
        "en-AE": `${BASE_URL}/contact-us`,
      },
    },
  });

  /* ================================================================
     2. HUB PAGES — English + Arabic
     ================================================================ */

  entries.push({
    url: `${BASE_URL}/approvals`,
    lastModified: new Date("2026-07-15"),
    changeFrequency: "weekly",
    priority: 0.9,
    alternates: {
      languages: {
        "ar-AE": `${BASE_URL}/ar/approvals`,
      },
    },
  });

  entries.push({
    url: `${BASE_URL}/ar/approvals`,
    lastModified: new Date("2026-07-28"),
    changeFrequency: "weekly",
    priority: 0.7,
    alternates: {
      languages: {
        "en-AE": `${BASE_URL}/approvals`,
      },
    },
  });

  entries.push({
    url: `${BASE_URL}/guides`,
    lastModified: new Date("2026-07-15"),
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: {
      languages: {
        "ar-AE": `${BASE_URL}/ar/guides`,
      },
    },
  });

  entries.push({
    url: `${BASE_URL}/ar/guides`,
    lastModified: new Date("2026-07-28"),
    changeFrequency: "weekly",
    priority: 0.7,
    alternates: {
      languages: {
        "en-AE": `${BASE_URL}/guides`,
      },
    },
  });

  entries.push({
    url: `${BASE_URL}/services`,
    lastModified: new Date("2026-07-01"),
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: {
      languages: {
        "ar-AE": `${BASE_URL}/ar/services`,
      },
    },
  });

  entries.push({
    url: `${BASE_URL}/ar/services`,
    lastModified: new Date("2026-07-28"),
    changeFrequency: "weekly",
    priority: 0.7,
    alternates: {
      languages: {
        "en-AE": `${BASE_URL}/services`,
      },
    },
  });

  /* ================================================================
     3. APPROVAL PAGES — 52 English + 52 Arabic
     ================================================================ */

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
        },
      },
    });
    // Arabic
    entries.push({
      url: `${BASE_URL}/ar/approvals/${slug}`,
      lastModified: new Date(approval.lastUpdated),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          "en-AE": `${BASE_URL}/approvals/${slug}`,
        },
      },
    });
  }

  /* ================================================================
     4. GUIDE / Q&A PAGES — 30+ English + Arabic
     ================================================================ */

  for (const guide of guides) {
    const slug = guide.slug;
    // English
    entries.push({
      url: `${BASE_URL}/guides/${slug}`,
      lastModified: new Date(guide.lastUpdated),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          "ar-AE": `${BASE_URL}/ar/guides/${slug}`,
        },
      },
    });
    // Arabic
    entries.push({
      url: `${BASE_URL}/ar/guides/${slug}`,
      lastModified: new Date(guide.lastUpdated),
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: {
        languages: {
          "en-AE": `${BASE_URL}/guides/${slug}`,
        },
      },
    });
  }

  /* ================================================================
     5. SERVICE PAGES — 5 English + 5 Arabic
     ================================================================ */

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
        },
      },
    });
  }

  /* ================================================================
     6. GEO FILES — llms.txt & llms-full.txt (English only)
     ================================================================ */

  entries.push({
    url: `${BASE_URL}/llms.txt`,
    lastModified: new Date("2026-07-28"),
    changeFrequency: "weekly",
    priority: 0.5,
  });

  entries.push({
    url: `${BASE_URL}/llms-full.txt`,
    lastModified: new Date("2026-07-28"),
    changeFrequency: "weekly",
    priority: 0.5,
  });

  return entries;
}

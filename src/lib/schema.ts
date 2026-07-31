/**
 * JSON-LD Schema Generator Utilities
 *
 * Every function returns a plain object ready to be serialised via
 * JSON.stringify and injected as <script type="application/ld+json">.
 *
 * All generators reference the same global entity IDs:
 *   - #organization  → Organization
 *   - #website       → WebSite
 *
 * Phase 4.1: All functions accept a `locale` parameter for Arabic support.
 *   - English: @id uses BASE (e.g., /#organization)
 *   - Arabic:  @id uses BASE + /ar (e.g., /ar/#organization)
 *   - name/description use AR constants when locale === 'ar'
 *
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md for full schema rules
 * @see plans/arabic-market-domination-reconciled-plan.md §4.1
 */

import { SITE, NAP, AR, LICENSE, SOCIAL } from "@/lib/constants";
import { localePrefix } from "@/lib/locale";
import type { FAQItem, ProcessStep, GuideData } from "@/types";

/* ── helpers ─────────────────────────────────────────────── */

const BASE = SITE.url.replace(/\/+$/, "");

/**
 * Build a ListItem object for BreadcrumbList.
 */
function crumb(position: number, name: string, slug: string) {
  return {
    "@type": "ListItem",
    position,
    name,
    item: `${BASE}${slug}`,
  };
}

/* ── sitewide schemas (injected once in root layout) ─────── */

/**
 * Organization schema — references #organization.
 * Must match footer NAP byte-for-byte.
 */
export function organizationSchema(locale: "en" | "ar" = "en") {
  const lp = localePrefix(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE}${lp}/#organization`,
    name: locale === "ar" ? AR.siteName : NAP.companyName,
    legalName: locale === "ar" ? AR.license.companyName : LICENSE.companyName,
    url: `${BASE}${lp}`,
    logo: `${BASE}/logos/wasleen-logo-standalone.svg`,
    telephone: NAP.phone,
    email: NAP.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: NAP.address.streetAddress,
      addressLocality: NAP.address.addressLocality,
      addressRegion: NAP.address.addressRegion,
      addressCountry: NAP.address.addressCountry,
      postalCode: NAP.address.postalCode,
    },
    areaServed: NAP.areaServed,
    priceRange: "AED",
    availableLanguage: ["en", "ar"],
    /* ── Verifiable credential — License No. 1188577 (single source: LICENSE) ── */
    identifier: {
      "@type": "PropertyValue",
      propertyID: "DED Trade License Number",
      value: LICENSE.licenseNumber,
      url: LICENSE.verificationUrl,
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Business Trade License",
      name: locale === "ar" ? "الرخصة التجارية" : "DED Trade License",
      recognizedBy: {
        "@type": "GovernmentOrganization",
        name: locale === "ar" ? AR.license.issuingAuthority : LICENSE.issuingAuthority,
      },
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: NAP.phone,
      email: NAP.email,
      contactType: "customer service",
      availableLanguage: ["en", "ar"],
    },
    /* ── sameAs strengthens entity resolution for AI search engines (GEO) ── */
    sameAs: Object.values(SOCIAL),
  };
}

/**
 * WebSite schema — references #website.
 */
export function websiteSchema(locale: "en" | "ar" = "en") {
  const lp = localePrefix(locale);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}${lp}/#website`,
    url: `${BASE}${lp}`,
    name: locale === "ar" ? AR.siteName : SITE.name,
    publisher: { "@id": `${BASE}${lp}/#organization` },
    inLanguage: locale === "ar" ? "ar-AE" : "en-AE",
  };
}

/* ── per-page schemas ─────────────────────────────────────── */

export interface WebPageSchemaInput {
  url: string;
  title: string;
  description: string;
  dateModified: string;
  aboutRef?: string; // e.g. "#service"
}

/**
 * WebPage schema — generic for any page type.
 */
export function webPageSchema(data: WebPageSchemaInput, locale: "en" | "ar" = "en") {
  const lp = localePrefix(locale);
  const fullUrl = data.url.startsWith("http") ? data.url : `${BASE}${data.url}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": fullUrl,
    url: fullUrl,
    name: data.title,
    description: data.description,
    dateModified: data.dateModified,
    isPartOf: { "@id": `${BASE}${lp}/#website` },
    about: data.aboutRef
      ? { "@id": `${BASE}${lp}${data.aboutRef}` }
      : { "@id": `${BASE}${lp}/#organization` },
  };
}

export interface ServiceSchemaInput {
  name: string;
  description: string;
  providerRef?: string;
  category?: string;
}

/**
 * Service schema — used on approval service pages and service pages.
 */
export function serviceSchema(
  data: ServiceSchemaInput & { serviceId?: string },
  locale: "en" | "ar" = "en",
) {
  const lp = localePrefix(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    ...(data.serviceId ? { "@id": `${BASE}${lp}${data.serviceId}` } : {}),
    name: data.name,
    description: data.description,
    provider: { "@id": `${BASE}${lp}/#organization` },
    ...(data.category ? { category: data.category } : {}),
  };
}

/**
 * FAQPage schema — mirrors visible FAQ content exactly.
 */
export function faqPageSchema(faqs: FAQItem[], locale: "en" | "ar" = "en") {
  const lp = localePrefix(locale);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${BASE}${lp}/#faq`,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * HowTo schema — mirrors visible process steps exactly.
 */
export function howToSchema(steps: ProcessStep[], locale: "en" | "ar" = "en") {
  const lp = localePrefix(locale);
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${BASE}${lp}/#howto`,
    step: steps.map((s) => ({
      "@type": "HowToStep",
      position: s.step,
      name: s.title,
      text: s.description,
    })),
  };
}

export interface QAPageSchemaInput {
  question: string;
  answer: string;
  title: string;
  description: string;
}

/**
 * QAPage schema — used on guide/Q&A pages of type "qa".
 */
export function qaPageSchema(data: QAPageSchemaInput, locale: "en" | "ar" = "en") {
  const lp = localePrefix(locale);
  return {
    "@context": "https://schema.org",
    "@type": "QAPage",
    "@id": `${BASE}${lp}/#qa`,
    mainEntity: {
      "@type": "Question",
      name: data.question,
      text: data.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: data.answer,
      },
    },
  };
}

export interface BreadcrumbItem {
  position: number;
  name: string;
  slug: string;
}

/**
 * BreadcrumbList schema — every page must have one.
 *
 * Usage:
 *   breadcrumbList([
 *     { position: 1, name: "Home", slug: "/" },
 *     { position: 2, name: "Approvals", slug: "/approvals" },
 *     { position: 3, name: "DEWA Approval", slug: "/approvals/dewa-approval" },
 *   ])
 */
export function breadcrumbList(items: BreadcrumbItem[], locale: "en" | "ar" = "en") {
  const lp = localePrefix(locale);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${BASE}${lp}/#breadcrumb`,
    itemListElement: items.map((item) => crumb(item.position, item.name, item.slug)),
  };
}

/* ── convenience: full schema stack for approval pages ──── */

export interface ApprovalSchemaStackInput {
  url: string;
  title: string;
  description: string;
  serviceName: string;
  serviceDescription: string;
  serviceCategory?: string;
  faqs: FAQItem[];
  howToSteps: ProcessStep[];
  breadcrumbs: BreadcrumbItem[];
  dateModified: string;
}

/**
 * Generates the full schema stack required on every approval service page:
 *   WebPage + Service + FAQPage + HowTo + BreadcrumbList
 *
 * Returns an array of schema objects ready for stringification.
 */
export function approvalSchemaStack(
  input: ApprovalSchemaStackInput,
  locale: "en" | "ar" = "en",
) {
  const serviceId = `#service-${input.serviceName.toLowerCase().replace(/\s+/g, "-")}`;
  return [
    serviceSchema(
      {
        name: input.serviceName,
        description: input.serviceDescription,
        category: input.serviceCategory,
        serviceId,
      },
      locale,
    ),
    webPageSchema(
      {
        url: input.url,
        title: input.title,
        description: input.description,
        dateModified: input.dateModified,
        aboutRef: serviceId,
      },
      locale,
    ),
    faqPageSchema(input.faqs, locale),
    howToSchema(input.howToSteps, locale),
    breadcrumbList(input.breadcrumbs, locale),
  ];
}

/* ── convenience: full schema stack for guide pages ─────── */

export interface GuideSchemaStackInput {
  url: string;
  title: string;
  description: string;
  guideData: Pick<GuideData, "type" | "question" | "answer">;
  breadcrumbs: BreadcrumbItem[];
  dateModified: string;
}

/**
 * Generates the full schema stack required on guide pages:
 *   WebPage + (QAPage | WebPage) + BreadcrumbList
 */
export function guideSchemaStack(
  input: GuideSchemaStackInput,
  locale: "en" | "ar" = "en",
) {
  const schemas: Record<string, unknown>[] = [
    webPageSchema(
      {
        url: input.url,
        title: input.title,
        description: input.description,
        dateModified: input.dateModified,
      },
      locale,
    ),
    breadcrumbList(input.breadcrumbs, locale),
  ];

  if (input.guideData.type === "qa" && input.guideData.question && input.guideData.answer) {
    schemas.push(
      qaPageSchema(
        {
          question: input.guideData.question,
          answer: input.guideData.answer,
          title: input.title,
          description: input.description,
        },
        locale,
      ),
    );
  }

  return schemas;
}

/* ── convenience: full schema stack for service pages ──── */

export interface ServiceSchemaStackInput {
  url: string;
  title: string;
  description: string;
  serviceName: string;
  serviceDescription: string;
  faqs?: FAQItem[];
  howToSteps?: ProcessStep[];
  breadcrumbs: BreadcrumbItem[];
  dateModified: string;
}

/**
 * Generates the full schema stack required on /services/{slug} pages:
 *   WebPage + Service + (FAQPage?) + (HowTo?) + BreadcrumbList
 */
export function serviceSchemaStack(
  input: ServiceSchemaStackInput,
  locale: "en" | "ar" = "en",
) {
  const serviceId = `#service-${input.serviceName.toLowerCase().replace(/\s+/g, "-")}`;
  const schemas: Record<string, unknown>[] = [
    serviceSchema(
      {
        name: input.serviceName,
        description: input.serviceDescription,
        serviceId,
      },
      locale,
    ),
    webPageSchema(
      {
        url: input.url,
        title: input.title,
        description: input.description,
        dateModified: input.dateModified,
        aboutRef: serviceId,
      },
      locale,
    ),
    breadcrumbList(input.breadcrumbs, locale),
  ];

  if (input.faqs && input.faqs.length > 0) {
    schemas.push(faqPageSchema(input.faqs, locale));
  }

  if (input.howToSteps && input.howToSteps.length > 0) {
    schemas.push(howToSchema(input.howToSteps, locale));
  }

  return schemas;
}

/* ── convenience: static page schemas ────────────────────── */

export interface StaticPageSchemaInput {
  url: string;
  title: string;
  description: string;
  pageType: "AboutPage" | "ContactPage";
  breadcrumbs: BreadcrumbItem[];
  dateModified: string;
}

/**
 * Schema stack for static pages (About Us, Contact Us).
 */
export function staticPageSchema(input: StaticPageSchemaInput, locale: "en" | "ar" = "en") {
  const lp = localePrefix(locale);
  return [
    {
      "@context": "https://schema.org",
      "@type": input.pageType,
      "@id": `${BASE}${lp}${input.url}`,
      url: `${BASE}${lp}${input.url}`,
      name: input.title,
      description: input.description,
      isPartOf: { "@id": `${BASE}${lp}/#website` },
      about: { "@id": `${BASE}${lp}/#organization` },
    },
    breadcrumbList(input.breadcrumbs, locale),
  ];
}

/* ── convenience: license page schema stack ─────────────── */

export interface LicensePageSchemaInput {
  url: string;
  title: string;
  description: string;
  faqs: FAQItem[];
  dateModified: string;
}

/**
 * Schema stack for the /license page:
 *   WebPage (about → #organization) + BreadcrumbList + FAQPage
 *
 * NOTE: The Organization credential data (identifier/hasCredential) lives on
 * the single sitewide entity injected by the root layout — never duplicate a
 * second Organization block here (master rule 05 / §2.1 of the license plan).
 */
export function licensePageSchemaStack(
  input: LicensePageSchemaInput,
  locale: "en" | "ar" = "en",
) {
  return [
    webPageSchema(
      {
        url: input.url,
        title: input.title,
        description: input.description,
        dateModified: input.dateModified,
        aboutRef: "/#organization",
      },
      locale,
    ),
    breadcrumbList(
      [
        {
          position: 1,
          name: locale === "ar" ? AR.breadcrumb.home : "Home",
          slug: locale === "ar" ? "/ar" : "/",
        },
        {
          position: 2,
          name: locale === "ar" ? "الرخصة التجارية" : "Business License",
          slug: locale === "ar" ? "/ar/license" : "/license",
        },
      ],
      locale,
    ),
    faqPageSchema(input.faqs, locale),
  ];
}

/* ── convenience: homepage schemas ───────────────────────── */

export interface HomepageSchemaInput {
  title: string;
  description: string;
  dateModified: string;
}

/**
 * Schema stack for the homepage.
 */
export function homepageSchema(input: HomepageSchemaInput, locale: "en" | "ar" = "en") {
  return [
    webPageSchema(
      {
        url: "/",
        title: input.title,
        description: input.description,
        dateModified: input.dateModified,
      },
      locale,
    ),
    breadcrumbList(
      [
        {
          position: 1,
          name: locale === "ar" ? AR.breadcrumb.home : "Home",
          slug: locale === "ar" ? "/ar" : "/",
        },
      ],
      locale,
    ),
  ];
}

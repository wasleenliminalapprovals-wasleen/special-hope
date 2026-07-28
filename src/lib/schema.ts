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
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md for full schema rules
 */

import { SITE, NAP } from "@/lib/constants";
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
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE}/#organization`,
    name: NAP.companyName,
    url: BASE,
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
  };
}

/**
 * WebSite schema — references #website.
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    url: BASE,
    name: SITE.name,
    publisher: { "@id": `${BASE}/#organization` },
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
export function webPageSchema(data: WebPageSchemaInput) {
  const fullUrl = data.url.startsWith("http") ? data.url : `${BASE}${data.url}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": fullUrl,
    url: fullUrl,
    name: data.title,
    description: data.description,
    dateModified: data.dateModified,
    isPartOf: { "@id": `${BASE}/#website` },
    about: data.aboutRef ? { "@id": `${BASE}${data.aboutRef}` } : undefined,
    ...(data.aboutRef
      ? {}
      : { about: { "@id": `${BASE}/#organization` } }),
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
export function serviceSchema(data: ServiceSchemaInput & { serviceId?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    ...(data.serviceId ? { "@id": `${BASE}${data.serviceId}` } : {}),
    name: data.name,
    description: data.description,
    provider: { "@id": `${BASE}/#organization` },
    ...(data.category ? { category: data.category } : {}),
  };
}

/**
 * FAQPage schema — mirrors visible FAQ content exactly.
 */
export function faqPageSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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
export function howToSchema(steps: ProcessStep[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
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
export function qaPageSchema(data: QAPageSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "QAPage",
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
export function breadcrumbList(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
export function approvalSchemaStack(input: ApprovalSchemaStackInput) {
  const serviceId = `#service-${input.serviceName.toLowerCase().replace(/\s+/g, "-")}`;
  return [
    serviceSchema({
      name: input.serviceName,
      description: input.serviceDescription,
      category: input.serviceCategory,
      serviceId,
    }),
    webPageSchema({
      url: input.url,
      title: input.title,
      description: input.description,
      dateModified: input.dateModified,
      aboutRef: serviceId,
    }),
    faqPageSchema(input.faqs),
    howToSchema(input.howToSteps),
    breadcrumbList(input.breadcrumbs),
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
export function guideSchemaStack(input: GuideSchemaStackInput) {
  const schemas: Record<string, unknown>[] = [
    webPageSchema({
      url: input.url,
      title: input.title,
      description: input.description,
      dateModified: input.dateModified,
    }),
    breadcrumbList(input.breadcrumbs),
  ];

  if (input.guideData.type === "qa" && input.guideData.question && input.guideData.answer) {
    schemas.push(
      qaPageSchema({
        question: input.guideData.question,
        answer: input.guideData.answer,
        title: input.title,
        description: input.description,
      })
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
export function serviceSchemaStack(input: ServiceSchemaStackInput) {
  const serviceId = `#service-${input.serviceName.toLowerCase().replace(/\s+/g, "-")}`;
  const schemas: Record<string, unknown>[] = [
    serviceSchema({
      name: input.serviceName,
      description: input.serviceDescription,
      serviceId,
    }),
    webPageSchema({
      url: input.url,
      title: input.title,
      description: input.description,
      dateModified: input.dateModified,
      aboutRef: serviceId,
    }),
    breadcrumbList(input.breadcrumbs),
  ];

  if (input.faqs && input.faqs.length > 0) {
    schemas.push(faqPageSchema(input.faqs));
  }

  if (input.howToSteps && input.howToSteps.length > 0) {
    schemas.push(howToSchema(input.howToSteps));
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
export function staticPageSchema(input: StaticPageSchemaInput) {
  return [
    {
      "@context": "https://schema.org",
      "@type": input.pageType,
      "@id": `${BASE}${input.url}`,
      url: `${BASE}${input.url}`,
      name: input.title,
      description: input.description,
      isPartOf: { "@id": `${BASE}/#website` },
      about: { "@id": `${BASE}/#organization` },
    },
    breadcrumbList(input.breadcrumbs),
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
export function homepageSchema(input: HomepageSchemaInput) {
  return [
    webPageSchema({
      url: "/",
      title: input.title,
      description: input.description,
      dateModified: input.dateModified,
    }),
    breadcrumbList([{ position: 1, name: "Home", slug: "/" }]),
  ];
}

/**
 * Blog index JSON-LD schema stack (plan §9).
 *
 * Emits the full schema set for `/blog`:
 *   - `Blog` — with `blogPost` referencing the server-filtered visible set
 *   - `WebPage` — canonical URL, title, description, real `dateModified`
 *   - `FAQPage` — from `BLOG_FAQ_ITEMS`, so the schema mirrors the visible
 *     ZONE 11 accordion text word-for-word (master rule §5)
 *   - `BreadcrumbList` — Home → Blog
 *
 * All generators reuse the shared utilities in `src/lib/schema.ts` so the
 * blog graph stays connected to the sitewide `#organization` / `#website`
 * entities (master rule §5: every page references the same entities, no
 * fabricated data).
 *
 * @see plans/blog-pre-build-plan.md §9 (schema)
 * @see .roo/rules/05-TECHNICAL-SEO-SCHEMA.md
 */

import { SITE } from "@/lib/constants";
import { localePrefix } from "@/lib/locale";
import {
  breadcrumbList,
  faqPageSchema,
  howToSchema,
  webPageSchema,
  type BreadcrumbItem,
} from "@/lib/schema";
import { BLOG_FAQ_ITEMS } from "@/components/blog/BlogFAQ";
import { AR_BLOG_FAQ_ITEMS } from "@/components/blog/ar/BlogFAQArabic";
import { getCategoryName } from "@/lib/blog";
import { getArabicCategoryName } from "@/lib/blog-ar";
import { services } from "@/data/services";
import { services as arabicServices } from "@/data/services-ar";
import type { BlogPost, BlogSection, ProcessStep } from "@/types";

const BASE = SITE.url.replace(/\/+$/, "");

export interface BlogIndexSchemaInput {
  /** Canonical URL or absolute path (e.g. "/blog"). */
  url: string;
  title: string;
  description: string;
  /** ISO date — the newest visible post's `lastUpdated` (real, never bumped). */
  dateModified: string;
  /** Posts rendered on the page (server-filtered set when a category is active). */
  posts: BlogPost[];
  breadcrumbs: BreadcrumbItem[];
}

/**
 * Blog schema — schema.org `Blog` (a subtype of `CollectionPage`) with a
 * minimal `blogPost` list. Individual articles carry their own full
 * `BlogPosting` schema on their pages; here we only reference them so the
 * index graph stays light and Google can crawl the list.
 */
export function blogSchema(input: BlogIndexSchemaInput, locale: "en" | "ar" = "en") {
  const lp = localePrefix(locale);
  const fullUrl = input.url.startsWith("http") ? input.url : `${BASE}${input.url}`;
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${fullUrl}#blog`,
    url: fullUrl,
    name: input.title,
    description: input.description,
    inLanguage: locale === "ar" ? "ar-AE" : "en-AE",
    isPartOf: { "@id": `${BASE}${lp}/#website` },
    publisher: { "@id": `${BASE}${lp}/#organization` },
    blogPost: input.posts.map((post) => ({
      "@type": "BlogPosting",
      "@id": `${BASE}${lp}/blog/${post.slug}#post`,
      headline: post.title,
      url: `${BASE}${lp}/blog/${post.slug}`,
      datePublished: post.publishedAt,
      dateModified: post.lastUpdated,
    })),
  };
}

/**
 * Full index stack: Blog + WebPage + FAQPage + BreadcrumbList.
 * Returns an array of schema objects ready for stringification (mirrors
 * `approvalSchemaStack` / `guideSchemaStack` in src/lib/schema.ts).
 */
export function blogIndexSchemaStack(
  input: BlogIndexSchemaInput,
  locale: "en" | "ar" = "en",
) {
  return [
    blogSchema(input, locale),
    webPageSchema(
      {
        url: input.url,
        title: input.title,
        description: input.description,
        dateModified: input.dateModified,
      },
      locale,
    ),
    faqPageSchema(locale === "ar" ? AR_BLOG_FAQ_ITEMS : BLOG_FAQ_ITEMS, locale),
    breadcrumbList(input.breadcrumbs, locale),
  ];
}

/* ============================================================
   ARTICLE STACK (plan §7 / §8.1)
   Emits the full schema set for /blog/{slug}:
     - `BlogPosting` — headline, author @id, real datePublished/dateModified,
       hero image, articleSection, mainEntityOfPage, publisher ref
     - `WebPage` — canonical URL, about → the BlogPosting @id
     - `OfferCatalog` — services bridge (5 services, provider #organization)
     - `FAQPage` — from `post.faqs` when present (text mirrors visible FAQ)
     - `HowTo` — derived from ordered-list body blocks when present
     - `BreadcrumbList` — Home → Blog → {Category} → {Article}
   The article node is `BlogPosting` with `@id ...#post` — the SAME @type /
   @id suffix the index `blogSchema()` uses, so the graph stays connected.
   All entities connect to the sitewide `#organization` / `#website`
   (master rule §5) and the Person nodes registered via `personSchema`
   (`#author-{id}`) — never redefined here.
   ============================================================ */

export interface BlogArticleSchemaInput {
  /** Canonical URL or absolute path (e.g. "/blog/{slug}"). */
  url: string;
  title: string;
  description: string;
  /** The post being rendered — drives BlogPosting + FAQ + HowTo. */
  post: BlogPost;
  /** Home → Blog → {Category} → {Article} (3–4 items). */
  breadcrumbs: BreadcrumbItem[];
}

/** Resolve the JSON-LD author @id ref (mirrors private helper in schema.ts). */
function authorEntityRef(
  authorId: BlogPost["authorId"] | undefined,
  locale: "en" | "ar",
): string | undefined {
  if (!authorId) return undefined;
  const lp = localePrefix(locale);
  if (authorId === "organization") return `${BASE}${lp}/#organization`;
  return `${BASE}${lp}/#author-${authorId}`;
}

/** The BlogPosting node itself — unique @id per post (page URL + #post). */
function blogArticleSchema(post: BlogPost, url: string, locale: "en" | "ar") {
  const lp = localePrefix(locale);
  const fullUrl = url.startsWith("http") ? url : `${BASE}${url}`;
  const hero = post.images.find((i) => i.position === "hero") ?? post.images[0];
  const authorRef = authorEntityRef(post.authorId, locale);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${fullUrl}#post`,
    headline: post.title,
    description: post.description,
    ...(authorRef ? { author: { "@id": authorRef } } : {}),
    datePublished: post.publishedAt,
    dateModified: post.lastUpdated,
    ...(hero ? { image: `${BASE}${hero.src}` } : {}),
    articleSection:
      locale === "ar"
        ? getArabicCategoryName(post.categoryId)
        : getCategoryName(post.categoryId),
    inLanguage: locale === "ar" ? "ar-AE" : "en-AE",
    mainEntityOfPage: { "@type": "WebPage", "@id": fullUrl },
    isPartOf: { "@id": `${BASE}${lp}/#website` },
    publisher: { "@id": `${BASE}${lp}/#organization` },
  };
}

/** Services bridge — OfferCatalog of the 5 services (provider #organization). */
function offerCatalogSchema(locale: "en" | "ar") {
  const lp = localePrefix(locale);
  const isAr = locale === "ar";
  const list = isAr
    ? arabicServices.map((s) => ({ slug: s.slug, name: s.ar.name, description: s.ar.description }))
    : services.map((s) => ({ slug: s.slug, name: s.name, description: s.description }));
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${BASE}${lp}/#offer-catalog`,
    name: isAr ? "خدمات Wasleen Approvals" : "Wasleen Approvals services",
    inLanguage: isAr ? "ar-AE" : "en-AE",
    itemListElement: list.map((s) => ({
      "@type": "Service",
      "@id": `${BASE}${lp}/services/${s.slug}`,
      name: s.name,
      description: s.description,
      url: `${BASE}${lp}/services/${s.slug}`,
      provider: { "@id": `${BASE}${lp}/#organization` },
    })),
  };
}

/** HowTo steps from ordered-list body blocks (only when step content exists). */
function extractHowToSteps(sections: BlogSection[]): ProcessStep[] {
  const steps: ProcessStep[] = [];
  for (const block of sections) {
    if (block.type === "list" && block.ordered && block.items.length > 0) {
      for (const item of block.items) {
        steps.push({ step: steps.length + 1, title: item, description: item });
      }
    }
  }
  return steps;
}

/**
 * Full article stack: BlogPosting + WebPage + OfferCatalog + (FAQPage?) +
 * (HowTo?) + BreadcrumbList. Returns an array of schema objects ready for
 * stringification (separate <script> tags — the site's RULE 3 pattern).
 */
export function blogArticleSchemaStack(
  input: BlogArticleSchemaInput,
  locale: "en" | "ar" = "en",
) {
  const lp = localePrefix(locale);
  const rawPath = input.url.startsWith("http")
    ? input.url.replace(BASE, "")
    : input.url;
  // webPageSchema() prepends the locale prefix to `aboutRef`, so strip it here
  // to avoid a doubled /ar/ar/ path on Arabic article pages.
  const aboutRef = lp && rawPath.startsWith(lp) ? rawPath.slice(lp.length) : rawPath;
  const schemas: Record<string, unknown>[] = [
    blogArticleSchema(input.post, input.url, locale),
    webPageSchema(
      {
        url: input.url,
        title: input.title,
        description: input.description,
        dateModified: input.post.lastUpdated,
        aboutRef: `${aboutRef}#post`,
      },
      locale,
    ),
    offerCatalogSchema(locale),
    breadcrumbList(input.breadcrumbs, locale),
  ];

  if (input.post.faqs.length > 0) {
    schemas.push(faqPageSchema(input.post.faqs, locale));
  }

  const howToSteps = extractHowToSteps(input.post.body);
  if (howToSteps.length > 0) {
    schemas.push(howToSchema(howToSteps, locale));
  }

  return schemas;
}

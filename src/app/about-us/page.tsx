/**
 * About Us — "The Living Blueprint" (11 drawing sheets + Sheet 02b).
 *
 * The Wasleen Group story (Interior · Approvals · Pergolas · Digital) told
 * through an architectural drawing-set visual language with the A1–A8
 * signature interaction layer (cyanotype day/night, scroll-scrubbed hero
 * line, dimension-line stats, physical photo frames, sheet rail, single-use
 * stamp, custom cursor, linen texture).
 *
 * Schema stack (plan §3.2, all locale-aware):
 *   AboutPage + BreadcrumbList + ItemList (4 divisions) + FAQPage
 *   + Person×2 (founder / co-founder).
 *   Blocker-4 resolved: Jamsheed Khalid & Kavya Ramachandran. Persons reuse
 *   the sitewide author @ids (#author-jamsheed-khalid / #author-kavya-ramachandran)
 *   so each human keeps ONE identity across the site (entity dedup). `sameAs`
 *   comes from the verified author registry (LinkedIn/Gravatar) — nothing
 *   fabricated, per .roo/rules/03 §4 "What NEVER to do".
 *
 * Data is the single source of truth: src/data/about.ts (EN).
 * Plan: plans/about-us-redesign-mega-plan.md (Phases A–G)
 * Rule: .roo/rules/05-TECHNICAL-SEO-SCHEMA.md (AboutPage schema)
 */

import type { Metadata } from "next";

import { SITE } from "@/lib/constants";
import { hreflangAlternates, getOgLocale } from "@/lib/locale";
import { personSchema, staticPageSchema, faqPageSchema } from "@/lib/schema";
import { ABOUT_SIGNATURE_LAYER } from "@/lib/feature-flags";
import {
  aboutContent,
  type AboutContent,
  type SheetMeta,
} from "@/data/about";
import { AUTHOR_REGISTRY, type GuideAuthor } from "@/data/authors";

/* ── Page-scoped styles (cyanotype palette, sheet rail, toggle, frames) ── */
import "@/components/about/about.css";

import CyanotypeProvider from "@/components/about/CyanotypeProvider";
import CyanotypeToggle from "@/components/about/CyanotypeToggle";
import SheetRail from "@/components/about/SheetRail";
import Sheet01Hero from "@/components/about/Sheet01Hero";
import Sheet02Story from "@/components/about/Sheet02Story";
import CraftStrip from "@/components/about/CraftStrip";
import ParcelGrid from "@/components/about/ParcelGrid";
import BentoGallery from "@/components/about/BentoGallery";
import BothSides from "@/components/about/BothSides";
import NumbersBand from "@/components/about/NumbersBand";
import WhyChoose from "@/components/about/WhyChoose";
import FounderCard from "@/components/about/FounderCard";
import CredentialsSection from "@/components/about/CredentialsSection";
import ClosingCta from "@/components/about/ClosingCta";
import AboutFaq from "@/components/about/AboutFaq";
import OfficeMaps from "@/components/about/OfficeMaps";

/* ============================================================
   Metadata (sourced from the data layer — single source of truth)
   ============================================================ */

export const metadata: Metadata = {
  // `absolute` bypasses the root layout's `%s | Wasleen Approvals` template
  // so the exact plan-approved 51-char title renders without a double suffix.
  title: { absolute: aboutContent.metadata.title },
  description: aboutContent.metadata.description,
  alternates: {
    canonical: aboutContent.metadata.canonical,
    languages: hreflangAlternates(SITE.url, "/about-us"),
  },
  openGraph: {
    title: aboutContent.metadata.ogTitle,
    description: aboutContent.metadata.ogDescription,
    url: aboutContent.metadata.canonical,
    type: "website",
    locale: getOgLocale("en"),
    siteName: SITE.name,
    // Dedicated OG image for the About Us page ("The Living Blueprint" asset).
    // Resolves to an absolute URL via the root layout's metadataBase (SITE.url).
    images: [
      {
        url: "/images/about-us/pergola/about-us-og-image-wasleen-liminal-approval.webp",
        width: 1200,
        height: 675,
        alt: "Wasleen Liminal Approval Consultants — The Living Blueprint, About Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: aboutContent.metadata.ogTitle,
    description: aboutContent.metadata.ogDescription,
  },
};

/* ============================================================
   Helpers — sheet meta lookup + schema assembly
   ============================================================ */

/** Resolve SheetMeta for a sheet id (throws on a bad id = caught at build). */
function sheetById(id: string): SheetMeta {
  const found = aboutContent.sheets.find((s) => s.id === id);
  if (!found) throw new Error(`Missing sheet meta for "${id}"`);
  return found;
}

/**
 * Markdown `[label](url)` used in FAQ answers — the visible FAQ renders it as
 * a real link; the FAQPage schema must carry the plain label text only
 * (visible text = schema text).
 */
const LINK_MD_RE = /\[([^\]]+)\]\([^)]+\)/g;

/**
 * ItemList of the four group divisions — helps AI engines map the group.
 * `name` mirrors the visible "THE GROUP" directory-strip title; URLs resolve
 * external sites to absolute and internal paths against SITE.url.
 */
function divisionsItemList(content: AboutContent, locale: "en" | "ar") {
  const lp = locale === "ar" ? "/ar" : "";
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE.url}${lp}/about-us#divisions`,
    name: content.closing.directoryTitle,
    itemListElement: content.closing.directory.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      url: item.external ? item.href : `${SITE.url}${item.href}`,
    })),
  };
}

/* ── Sheet 07 · Person schema (plan §3.2 — founder + co-founder) ──
   Reuses the sitewide author @ids so each human keeps one entity identity.
   jobTitle mirrors the visible Sheet 07 role; sameAs = verified profiles
   from the author registry (LinkedIn/Gravatar — nothing fabricated). */
const FOUNDER_PERSONS: GuideAuthor[] = [
  {
    id: "jamsheed-khalid",
    name: "Jamsheed Khalid",
    arabicName: "جمشيد خالد",
    titleEn: "FOUNDER & OWNER",
    titleAr: "المؤسس والمالك",
    jobTitle: "FOUNDER & OWNER",
    sameAs: AUTHOR_REGISTRY["jamsheed-khalid"].sameAs,
  },
  {
    id: "kavya-ramachandran",
    name: "Kavya Ramachandran",
    arabicName: "كافيا راماشاندران",
    titleEn: "CO-FOUNDER",
    titleAr: "المؤسس المشارك",
    jobTitle: "CO-FOUNDER",
    sameAs: AUTHOR_REGISTRY["kavya-ramachandran"].sameAs,
  },
];

/* ============================================================
   Page Component
   ============================================================ */

export default function AboutUsPage() {
  const content = aboutContent;

  /* ── Schema (AboutPage + Breadcrumb + ItemList + FAQPage + Person×2) ── */
  const schemas = [
    ...staticPageSchema(
      {
        url: "/about-us",
        title: content.metadata.title,
        description: content.metadata.description,
        pageType: "AboutPage",
        breadcrumbs: [
          { position: 1, name: "Home", slug: "/" },
          { position: 2, name: "About Us", slug: "/about-us" },
        ],
        dateModified: content.metadata.dateModified,
      },
      "en",
    ),
    divisionsItemList(content, "en"),
    faqPageSchema(
      content.faq.items.map((item) => ({
        question: item.question,
        answer: item.answer.replace(LINK_MD_RE, "$1"),
      })),
      "en",
    ),
    ...FOUNDER_PERSONS.map((person) => personSchema(person, "en")),
  ];

  return (
    <>
      {/* JSON-LD Schema */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <CyanotypeProvider>
        {ABOUT_SIGNATURE_LAYER && (
          <>
            <SheetRail sheets={content.sheets} rail={content.sheetRail} />
            <CyanotypeToggle labels={content.toggle} />
          </>
        )}

        {/* Sheet 01 · Hero */}
        <Sheet01Hero content={content.hero} />

        {/* Sheet 02 · Our Story */}
        <Sheet02Story story={content.story} sheet={sheetById("sheet-02")} />

        {/* Sheet 02b · The Craft Strip */}
        <CraftStrip craft={content.craft} sheet={sheetById("sheet-02b")} />

        {/* Sheet 03 · The Wasleen Group (Site Plan) */}
        <ParcelGrid
          group={content.group}
          sheet={sheetById("sheet-03")}
          youAreHereLabel={content.hero.youAreHereLabel}
        />

        {/* Sheet 03b · Selected Work (Physical Photo Bento) */}
        <BentoGallery work={content.work} sheet={sheetById("sheet-03b")} />

        {/* Sheet 04 · Both Sides of the Counter */}
        <BothSides bothSides={content.bothSides} sheet={sheetById("sheet-04")} />

        {/* Sheet 05 · Numbers Band */}
        <NumbersBand numbers={content.numbers} sheet={sheetById("sheet-05")} />

        {/* Sheet 06 · Why Choose Wasleen */}
        <WhyChoose why={content.why} sheet={sheetById("sheet-06")} />

        {/* Sheet 07 · The People */}
        <FounderCard people={content.people} sheet={sheetById("sheet-07")} />

        {/* Sheet 08 · Credentials */}
        <CredentialsSection
          credentials={content.credentials}
          sheet={sheetById("sheet-08")}
        />

        {/* Sheet 09 · Closing CTA */}
        <ClosingCta closing={content.closing} sheet={sheetById("sheet-09")} />

        {/* Sheet 10 · FAQ */}
        <AboutFaq faq={content.faq} sheet={sheetById("sheet-10")} />

        {/* Sheet 11 · Our Offices */}
        <OfficeMaps offices={content.offices} sheet={sheetById("sheet-11")} />
      </CyanotypeProvider>
    </>
  );
}

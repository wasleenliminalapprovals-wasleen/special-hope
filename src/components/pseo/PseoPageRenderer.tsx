/**
 * PseoPageRenderer — Full-page template for programmatic SEO pages.
 *
 * Composes: breadcrumbs, kind badge, H1, meta
 * description, direct-answer callout (quotable by AI engines), hero image,
 * content sections, FAQ accordion, and related-link cards.
 *
 * Locale-aware: when `locale === "ar"` and `page.ar` exists, the H1, direct
 * answer, sections, FAQ, and description render from the contextual Arabic
 * content. Breadcrumbs and related items are passed in already localized.
 *
 * JSON-LD is emitted separately by `pseoSchemaStack()`.
 *
 * @see plans/pseo-domination-engine-plan.md §9 (page template)
 */

import Link from "next/link";
import { ArrowLeft, Info } from "lucide-react";
import type { ImageAssetRef, PseoArabicContent, PseoPage, PseoPageKind } from "@/types";
import Badge from "@/components/ui/Badge";
import PseoBreadcrumbs, { type PseoBreadcrumbItem } from "./PseoBreadcrumbs";
import PseoImageBlock from "./PseoImageBlock";
import PseoSectionBlock from "./PseoSectionBlock";
import PseoFaqBlock from "./PseoFaqBlock";
import PseoRelatedBlock, { type PseoRelatedItem } from "./PseoRelatedBlock";

const kindLabels: Record<PseoPageKind, { en: string; ar: string }> = {
  guide: { en: "Complete Guide", ar: "دليل شامل" },
  qa: { en: "Q&A", ar: "سؤال وجواب" },
  checklist: { en: "Checklist", ar: "قائمة تحقق" },
  cost: { en: "Cost Guide", ar: "دليل الرسوم والتكاليف" },
  timeline: { en: "Timeline Guide", ar: "دليل المدة الزمنية" },
  compare: { en: "Comparison", ar: "مقارنة" },
  glossary: { en: "Glossary", ar: "مصطلحات" },
};

interface PseoPageRendererProps {
  /** The generated pSEO page (EN canonical, may include `ar`) */
  page: PseoPage;
  /** Rendering locale — picks `page.ar` content when "ar" */
  locale?: "en" | "ar";
  /** Ordered breadcrumb trail (already localized) */
  breadcrumbs: PseoBreadcrumbItem[];
  /** Resolved related items (already localized) */
  related?: PseoRelatedItem[];
  /** Optional pillar approval "back to" link */
  parentApproval?: { name: string; href: string } | null;
  /** Optional visible author byline (name must match schema author name) */
  author?: { name: string; title: string } | null;
  /** Optional image override (e.g., Arabic alt/caption variant) */
  image?: ImageAssetRef;
}

export default function PseoPageRenderer({
  page,
  locale = "en",
  breadcrumbs,
  related = [],
  parentApproval,
  author,
  image,
}: PseoPageRendererProps) {
  const isAr = locale === "ar";
  const ar: PseoArabicContent | undefined = isAr ? page.ar : undefined;

  const title = ar?.title ?? page.title;
  const description = ar?.metaDescription ?? page.metaDescription;
  const directAnswer = ar?.directAnswer ?? page.directAnswer;
  const sections = ar?.sections ?? page.sections;
  const faqs = ar?.faqs ?? page.faqs;
  const heroImage = image ?? page.image;

  const label = kindLabels[page.kind];
  const kindText = isAr ? label.ar : label.en;
  const glanceTitle = isAr ? "باختصار" : "At a glance";

  return (
    <>
      {/* ============================================================
          SECTION 1 — Hero / Header
          ============================================================ */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-16">
          <PseoBreadcrumbs items={breadcrumbs} />

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="default">{kindText}</Badge>
          </div>

          <h1 className="text-h1 font-montserrat text-heading-text mb-4 max-w-4xl">
            {title}
          </h1>

          <p className="text-body-lg text-body-text max-w-4xl leading-relaxed mb-4">
            {description}
          </p>

          {/* Visible author byline — name must match the schema `author` name */}
          {author && (
            <p className="text-caption text-body-text/70 font-montserrat mb-4">
              {isAr
                ? `بقلم ${author.name} — ${author.title}`
                : `By ${author.name} — ${author.title}`}
            </p>
          )}

          {parentApproval && (
            <Link
              href={parentApproval.href}
              className="inline-flex items-center gap-1.5 text-body-sm text-link-blue hover:text-brand-blue-hover transition-colors"
            >
              <ArrowLeft size={16} strokeWidth={1.75} />
              {isAr ? `العودة إلى ${parentApproval.name}` : `Back to ${parentApproval.name}`}
            </Link>
          )}
        </div>
      </section>

      {/* ============================================================
          SECTION 2 — Direct Answer (quotable by AI engines)
          ============================================================ */}
      {directAnswer && (
        <section className="bg-light-bg">
          <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-6 rounded-lg bg-white border border-border-light shadow-card">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-card-bg text-brand-blue shrink-0">
                  <Info size={24} strokeWidth={1.75} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-h3 font-montserrat text-heading-text mb-3">
                    {glanceTitle}
                  </h2>
                  <p className="text-body text-body-text leading-relaxed">
                    {directAnswer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 3 — Hero Image
          ============================================================ */}
      {heroImage && (
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-4 py-8 md:px-8">
            <div className="max-w-4xl mx-auto">
              <PseoImageBlock image={heroImage} />
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 4 — Content Sections
          ============================================================ */}
      {sections && sections.length > 0 && (
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
            <div className="max-w-4xl mx-auto">
              {sections.map((section, i) => (
                <PseoSectionBlock key={i} section={section} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 5 — FAQ
          ============================================================ */}
      <PseoFaqBlock items={faqs} />

      {/* ============================================================
          SECTION 6 — Related (Internal Linking)
          ============================================================ */}
      <PseoRelatedBlock
        items={related}
        title={isAr ? "صفحات ذات صلة" : "Related pages"}
      />
    </>
  );
}

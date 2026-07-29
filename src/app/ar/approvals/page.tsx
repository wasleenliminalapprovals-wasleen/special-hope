/**
 * Arabic Approvals Hub — /ar/approvals
 *
 * Lists all 52 approval types grouped by 8 categories with Arabic names.
 * Each card links to the individual Arabic approval page at /ar/approvals/{slug}.
 *
 * Schema: WebPage + BreadcrumbList (Arabic locale)
 *
 * @see src/app/approvals/page.tsx — English equivalent
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Building,
  Home,
  ScrollText,
  Zap,
  UtensilsCrossed,
  Hammer,
  PenTool,
  ShieldCheck,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import { approvals } from "@/data/approvals";
import { approvals as approvalsAr } from "@/data/approvals-ar";
import { SITE, AR } from "@/lib/constants";
import { hreflangAlternates } from "@/lib/locale";
import { breadcrumbList, webPageSchema } from "@/lib/schema";
import { APPROVAL_CATEGORIES, type ApprovalCategory } from "@/types";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import CTASection from "@/components/sections/CTASectionArabic";

/* ============================================================
   Metadata
   ============================================================ */

export const metadata: Metadata = {
  title: `جميع الموافقات (52+) | دليل موافقات دبي | ${AR.siteShortName}`,
  description:
    "قائمة كاملة بأكثر من 52 موافقة حكومية وتنظيمية في دبي. تصفح موافقات بلدية دبي، الدفاع المدني، ديوا، المناطق الحرة، والمطورين العقاريين مع وسلين للموافقات.",
  alternates: {
    canonical: `${SITE.url}/ar/approvals`,
    languages: hreflangAlternates(SITE.url, "/ar/approvals"),
  },
  openGraph: {
    title: `جميع الموافقات (52+) | دليل موافقات دبي | ${AR.siteShortName}`,
    description:
      "قائمة كاملة بأكثر من 52 موافقة حكومية وتنظيمية في دبي. تصفح موافقات بلدية دبي، الدفاع المدني، ديوا، المناطق الحرة، والمطورين العقاريين.",
    url: `${SITE.url}/ar/approvals`,
    locale: "ar_AE",
  },
  twitter: {
    title: `جميع الموافقات (52+) | دليل موافقات دبي | ${AR.siteShortName}`,
    description:
      "قائمة كاملة بأكثر من 52 موافقة حكومية وتنظيمية في دبي. تصفح موافقات بلدية دبي، الدفاع المدني، ديوا، المناطق الحرة، والمطورين العقاريين.",
  },
};

/* ============================================================
   Icon Map — one Lucide icon per category
   ============================================================ */

const categoryIcon: Record<ApprovalCategory, typeof Building2> = {
  "government-regulatory": Building2,
  "free-zone": Building,
  "developer-community": Home,
  "property-registration": ScrollText,
  "technical-utility": Zap,
  "trade-food-hospitality": UtensilsCrossed,
  "fit-out-construction": Hammer,
  "drawing-documentation": PenTool,
};

/* ============================================================
   Page Component
   ============================================================ */

const LAST_UPDATED = "2026-07-15";

export default function ArabicApprovalsHub() {
  /* ── Schema ─────────────────────────────────────────────── */

  const schemas = [
    webPageSchema(
      {
        url: "/ar/approvals",
        title: `جميع الموافقات (52+) | دليل موافقات دبي | ${AR.siteShortName}`,
        description:
          "قائمة كاملة بأكثر من 52 موافقة حكومية وتنظيمية في دبي. تصفح موافقات بلدية دبي، الدفاع المدني، ديوا، المناطق الحرة، والمطورين العقاريين.",
        dateModified: LAST_UPDATED,
      },
      "ar"
    ),
    breadcrumbList(
      [
        { position: 1, name: AR.breadcrumb.home, slug: "/ar" },
        { position: 2, name: AR.breadcrumb.approvals, slug: "/ar/approvals" },
      ],
      "ar"
    ),
  ];

  /* ── Group approvals by category ────────────────────────── */

  const grouped = APPROVAL_CATEGORIES.map((cat) => ({
    ...cat,
    items: approvals.filter((a) => a.category === cat.value),
  })).filter((g) => g.items.length > 0);

  const totalApprovals = approvals.length;

  return (
    <>
      {/* ===== Hero / Header ===== */}
      <section className="bg-brand-blue text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <h1 className="text-h1 font-montserrat font-bold mb-3">
            جميع موافقات دبي
          </h1>
          <p className="text-body-lg text-white/80 max-w-3xl">
            ندير <strong className="text-white">{totalApprovals}+ نوع موافقة</strong> عبر المشهد
            التنظيمي في دبي. تصفح حسب الفئة للعثور على الموافقة المحددة التي يحتاجها مشروعك.
          </p>
          <p className="text-body-sm text-white/60 mt-2">
            آخر تحديث: {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* ===== Category Sections ===== */}
      {grouped.map((group) => {
        const Icon = categoryIcon[group.value];
        const arLabel = AR.categories[group.value] ?? group.label;
        return (
          <section
            key={group.value}
            id={group.slug}
            className="scroll-mt-24"
          >
            <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
              {/* Category heading */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-md bg-card-bg text-brand-blue shrink-0">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <div>
                  <h2 className="text-h2 font-montserrat font-bold text-heading-text">
                    {arLabel}
                  </h2>
                  <p className="text-body-sm text-body-text/70">
                    {group.items.length} {group.items.length === 1 ? "موافقة" : "موافقات"}
                  </p>
                </div>
              </div>

              {/* Approval cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.items.map((approval) => {
                  const arEntry = approvalsAr.find((a) => a.slug === approval.slug);
                  const arName = arEntry?.ar?.name ?? approval.name;
                  const arDirect = arEntry?.ar?.directAnswer ?? approval.directAnswer;
                  return (
                    <Link
                      key={approval.slug}
                      href={`/ar/approvals/${approval.slug}`}
                      className="group flex flex-col gap-3 p-5 rounded-md bg-gradient-to-br from-white to-card-bg/30 border border-border-light border-s-2 border-s-transparent shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-brand-blue/40 hover:border-s-4 hover:border-s-brand-blue hover:bg-gradient-to-br hover:from-white hover:to-card-bg"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-h4 font-montserrat font-bold text-heading-text group-hover:text-link-blue transition-colors">
                          {arName}
                        </h3>
                        <ArrowLeft
                          size={18}
                          strokeWidth={1.75}
                          className="shrink-0 mt-1 text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </div>

                      <p className="text-body-sm text-body-text line-clamp-2">
                        {arDirect.substring(0, 160)}
                      </p>

                      <div className="flex items-center gap-2 mt-auto flex-wrap">
                        <Badge variant="outline">
                          {approval.typicalTimeline}
                        </Badge>
                        <Badge variant="outline">
                          {approval.authorityAbbr}
                        </Badge>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Section divider (except last) */}
            {group !== grouped[grouped.length - 1] && (
              <div className="mx-auto max-w-7xl px-4 md:px-8">
                <hr className="border-border-light" />
              </div>
            )}
          </section>
        );
      })}

      {/* ===== Cross-Hub Links ===== */}
      <section className="bg-light-bg">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 font-montserrat text-heading-text mb-4">
              المزيد من الموارد لمشروعك
            </h2>
            <p className="text-body-lg text-body-text mb-8">
              بالإضافة إلى الموافقات، نقدم موارد وخدمات شاملة لدعم كل مرحلة من مراحل مشروعك.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link
                href="/ar/guides"
                className="flex items-start gap-4 p-6 rounded-md bg-gradient-to-br from-white to-card-bg/30 border border-border-light shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-brand-blue/40 group"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-card-bg text-brand-blue shrink-0">
                  <BookOpen size={24} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-h4 font-montserrat font-bold text-heading-text group-hover:text-link-blue transition-colors mb-1">
                    الأدلة والإرشادات
                  </h3>
                  <p className="text-body-sm text-body-text">
                    تصفح أكثر من 30 دليل وخبراء وأسئلة شائعة تغطي عمليات وموافقات دبي.
                  </p>
                  <span className="inline-flex items-center gap-1 text-body-sm font-medium text-link-blue mt-2 group-hover:text-link-blue/80 transition-colors">
                    تصفح الأدلة <ArrowLeft size={14} strokeWidth={1.75} />
                  </span>
                </div>
              </Link>
              <Link
                href="/ar/services"
                className="flex items-start gap-4 p-6 rounded-md bg-gradient-to-br from-white to-card-bg/30 border border-border-light shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-brand-blue/40 group"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-card-bg text-brand-blue shrink-0">
                  <PenTool size={24} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-h4 font-montserrat font-bold text-heading-text group-hover:text-link-blue transition-colors mb-1">
                    خدمات الرسم والتوثيق
                  </h3>
                  <p className="text-body-sm text-body-text">
                    استكشف خدماتنا في الرسم ثنائي وثلاثي الأبعاد والتوثيق الهندسي وإدارة الموافقات.
                  </p>
                  <span className="inline-flex items-center gap-1 text-body-sm font-medium text-link-blue mt-2 group-hover:text-link-blue/80 transition-colors">
                    استكشف الخدمات <ArrowLeft size={14} strokeWidth={1.75} />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <CTASection serviceSlug="approvals-hub" />

      {/* ============================================================
         JSON-LD Schema
         ============================================================ */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

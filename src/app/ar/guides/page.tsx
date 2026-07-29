/**
 * Arabic Guides Hub — /ar/guides
 *
 * Lists all guides and Q&A pages organized by type with Arabic titles.
 * Hub guides appear first as featured content, followed by Q&A pages.
 * Each card links to the individual Arabic guide page at /ar/guides/{slug}.
 *
 * Schema: WebPage + BreadcrumbList (Arabic locale)
 *
 * @see src/app/guides/page.tsx — English equivalent
 */

import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, HelpCircle, ShieldCheck, PenTool, ArrowLeft } from "lucide-react";
import { guides } from "@/data/guides";
import { guides as guidesAr } from "@/data/guides-ar";
import { SITE, AR } from "@/lib/constants";
import { hreflangAlternates } from "@/lib/locale";
import { breadcrumbList, webPageSchema } from "@/lib/schema";
import Badge from "@/components/ui/Badge";
import CTASection from "@/components/sections/CTASectionArabic";

/* ============================================================
   Metadata
   ============================================================ */

export const metadata: Metadata = {
  title: `الأدلة والإرشادات (30+) | موارد خبراء الموافقات | ${AR.siteShortName}`,
  description:
    "وصول إلى أكثر من 30 دليل وخبير وأسئلة شائعة تغطي موافقات دبي، تصاريح بلدية دبي، موافقات الدفاع المدني، اتصالات ديوا، وموافقات المطورين. موارد مجانية من وسلين للموافقات.",
  alternates: {
    canonical: `${SITE.url}/ar/guides`,
    languages: hreflangAlternates(SITE.url, "/ar/guides"),
  },
  openGraph: {
    title: `الأدلة والإرشادات (30+) | موارد خبراء الموافقات | ${AR.siteShortName}`,
    description:
      "وصول إلى أكثر من 30 دليل وخبير وأسئلة شائعة تغطي موافقات دبي، تصاريح بلدية دبي، موافقات الدفاع المدني، اتصالات ديوا، وموافقات المطورين.",
    url: `${SITE.url}/ar/guides`,
    locale: "ar_AE",
  },
  twitter: {
    title: `الأدلة والإرشادات (30+) | موارد خبراء الموافقات | ${AR.siteShortName}`,
    description:
      "وصول إلى أكثر من 30 دليل وخبير وأسئلة شائعة تغطي موافقات دبي، تصاريح بلدية دبي، موافقات الدفاع المدني، اتصالات ديوا، وموافقات المطورين.",
  },
};

/* ============================================================
   Page Component
   ============================================================ */

const LAST_UPDATED = "2026-07-15";

export default function ArabicGuidesHub() {
  /* ── Schema ─────────────────────────────────────────────── */

  const schemas = [
    webPageSchema(
      {
        url: "/ar/guides",
        title: `الأدلة والإرشادات (30+) | موارد خبراء الموافقات | ${AR.siteShortName}`,
        description:
          "وصول إلى أكثر من 30 دليل وخبير وأسئلة شائعة تغطي موافقات دبي، تصاريح بلدية دبي، موافقات الدفاع المدني، اتصالات ديوا، وموافقات المطورين.",
        dateModified: LAST_UPDATED,
      },
      "ar"
    ),
    breadcrumbList(
      [
        { position: 1, name: AR.breadcrumb.home, slug: "/ar" },
        { position: 2, name: AR.breadcrumb.guides, slug: "/ar/guides" },
      ],
      "ar"
    ),
  ];

  /* ── Separate hub guides from Q&A guides ────────────────── */

  const hubGuides = guides.filter((g) => g.type === "hub");
  const qaGuides = guides.filter((g) => g.type === "qa");

  return (
    <>
      {/* ===== Hero / Header ===== */}
      <section className="bg-brand-blue text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <h1 className="text-h1 font-montserrat font-bold mb-3">
            أدلة وإرشادات موافقات دبي
          </h1>
          <p className="text-body-lg text-white/80 max-w-3xl">
            موارد من إعداد خبراء لمساعدتك في التنقل عبر مشهد الموافقات في دبي.
            من أدلة شاملة إلى أسئلة وأجوبة محددة —
            <strong className="text-white"> {guides.length} مورد</strong>{" "}
            تغطي كل جهة وكل عملية.
          </p>
          <p className="text-body-sm text-white/60 mt-2">
            آخر تحديث: {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* ===== Featured: Hub Guides ===== */}
      {hubGuides.length > 0 && (
        <section>
          <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-card-bg text-brand-blue shrink-0">
                <BookOpen size={22} strokeWidth={1.75} />
              </div>
              <div>
                <h2 className="text-h2 font-montserrat font-bold text-heading-text">
                  أدلة شاملة
                </h2>
                <p className="text-body-sm text-body-text/70">
                  موارد متعمقة تغطي كامل مشهد الموافقات
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {hubGuides.map((guide) => {
                const arEntry = guidesAr.find((g) => g.slug === guide.slug);
                const arTitle = arEntry?.ar?.title ?? guide.title;
                const arDesc = arEntry?.ar?.description ?? guide.description;
                return (
                  <Link
                    key={guide.slug}
                    href={`/ar/guides/${guide.slug}`}
                    className="group flex flex-col gap-3 p-6 rounded-md bg-gradient-to-br from-card-bg to-white border border-border-light border-s-2 border-s-transparent shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-brand-blue/40 hover:border-s-4 hover:border-s-brand-blue hover:bg-gradient-to-br hover:from-white hover:to-card-bg"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-h4 font-montserrat font-bold text-heading-text group-hover:text-link-blue transition-colors">
                        {arTitle}
                      </h3>
                      <ArrowLeft
                        size={18}
                        strokeWidth={1.75}
                        className="shrink-0 mt-1 text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>

                    <p className="text-body-sm text-body-text line-clamp-3">
                      {arDesc}
                    </p>

                    <div className="flex items-center gap-2 mt-auto flex-wrap">
                      <Badge variant="default">دليل</Badge>
                      {guide.content.length > 0 && (
                        <Badge variant="outline">
                          {guide.content.length} أقسام
                        </Badge>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== Divider ===== */}
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <hr className="border-border-light" />
      </div>

      {/* ===== Q&A Guides ===== */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-card-bg text-brand-blue shrink-0">
              <HelpCircle size={22} strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="text-h2 font-montserrat font-bold text-heading-text">
                أسئلة وأجوبة
              </h2>
              <p className="text-body-sm text-body-text/70">
                {qaGuides.length} سؤال تمت الإجابة عليه من قبل خبرائنا
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {qaGuides.map((guide) => {
              const arEntry = guidesAr.find((g) => g.slug === guide.slug);
              const arTitle = arEntry?.ar?.title ?? guide.title;
              const arDesc = arEntry?.ar?.description ?? guide.description;
              return (
                <Link
                  key={guide.slug}
                  href={`/ar/guides/${guide.slug}`}
                  className="group flex flex-col gap-3 p-5 rounded-md bg-gradient-to-br from-card-bg/80 to-white border border-border-light border-s-2 border-s-transparent shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-brand-blue/40 hover:border-s-4 hover:border-s-brand-blue hover:bg-gradient-to-br hover:from-white hover:to-card-bg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-h4 font-montserrat font-bold text-heading-text group-hover:text-link-blue transition-colors line-clamp-2">
                      {arTitle}
                    </h3>
                    <ArrowLeft
                      size={18}
                      strokeWidth={1.75}
                      className="shrink-0 mt-1 text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>

                  <p className="text-body-sm text-body-text line-clamp-3">
                    {arDesc}
                  </p>

                  <div className="flex items-center gap-2 mt-auto flex-wrap">
                    <Badge variant="success">سؤال وجواب</Badge>
                    {guide.parentApprovalSlug && (
                      <Badge variant="outline">
                        موافقة ذات صلة
                      </Badge>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Cross-Hub Links ===== */}
      <section className="bg-light-bg">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 font-montserrat text-heading-text mb-4">
              استكشف الموافقات والخدمات
            </h2>
            <p className="text-body-lg text-body-text mb-8">
              أكمل بحثك مع دليلنا الكامل لموافقات دبي وخدماتنا الاحترافية.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link
                href="/ar/approvals"
                className="flex items-start gap-4 p-6 rounded-md bg-gradient-to-br from-white to-card-bg/30 border border-border-light shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-brand-blue/40 group"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-card-bg text-brand-blue shrink-0">
                  <ShieldCheck size={24} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-h4 font-montserrat font-bold text-heading-text group-hover:text-link-blue transition-colors mb-1">
                    جميع أنواع الموافقات (52+)
                  </h3>
                  <p className="text-body-sm text-body-text">
                    تصفح دليلنا الكامل لموافقات بلدية دبي، الدفاع المدني، ديوا، المناطق الحرة، والمطورين.
                  </p>
                  <span className="inline-flex items-center gap-1 text-body-sm font-medium text-link-blue mt-2 group-hover:text-link-blue/80 transition-colors">
                    عرض جميع الموافقات <ArrowLeft size={14} strokeWidth={1.75} />
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
                    هل تحتاج رسومات فنية أو إدارة موافقات؟ استكشف مجموعتنا الكاملة من الخدمات المهنية.
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
      <CTASection serviceSlug="guides-hub" />

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

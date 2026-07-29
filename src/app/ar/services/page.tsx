/**
 * Arabic Services Hub — /ar/services
 *
 * Lists all service offerings in Arabic.
 * Each card links to the individual Arabic service page at /ar/services/{slug}.
 *
 * Schema: WebPage + BreadcrumbList (Arabic locale)
 *
 * @see src/app/services/page.tsx — English equivalent
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  PenTool,
  Boxes,
  FileText,
  ClipboardCheck,
  FileCheck,
  ShieldCheck,
  BookOpen,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { services } from "@/data/services";
import { services as servicesAr } from "@/data/services-ar";
import { SITE, AR } from "@/lib/constants";
import { hreflangAlternates } from "@/lib/locale";
import { breadcrumbList, webPageSchema } from "@/lib/schema";
import Button from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASectionArabic";

/* ============================================================
   Metadata
   ============================================================ */

export const metadata: Metadata = {
  title: `خدماتنا | رسومات ثنائية وثلاثية الأبعاد وموافقات | ${AR.siteShortName}`,
  description:
    "خدمات احترافية في دبي: رسومات ثنائية وثلاثية الأبعاد، توثيق CAD، إدارة الموافقات، وتخليص المستندات. دعم كامل لبلدية دبي، الدفاع المدني، ديوا، والمطورين. اتصل بنا اليوم.",
  alternates: {
    canonical: `${SITE.url}/ar/services`,
    languages: hreflangAlternates(SITE.url, "/ar/services"),
  },
  openGraph: {
    title: `خدماتنا | رسومات ثنائية وثلاثية الأبعاد وموافقات | ${AR.siteShortName}`,
    description:
      "خدمات احترافية في دبي: رسومات ثنائية وثلاثية الأبعاد، توثيق CAD، إدارة الموافقات، وتخليص المستندات. دعم كامل لبلدية دبي، الدفاع المدني، ديوا، والمطورين.",
    url: `${SITE.url}/ar/services`,
    locale: "ar_AE",
  },
  twitter: {
    title: `خدماتنا | رسومات ثنائية وثلاثية الأبعاد وموافقات | ${AR.siteShortName}`,
    description:
      "خدمات احترافية في دبي: رسومات ثنائية وثلاثية الأبعاد، توثيق CAD، إدارة الموافقات، وتخليص المستندات.",
  },
};

/* ============================================================
   Icon Map
   ============================================================ */

const serviceIcon: Record<string, typeof PenTool> = {
  "2d-drawings": PenTool,
  "3d-design-visualization": Boxes,
  "cad-documentation": FileText,
  "approval-management": ClipboardCheck,
  "document-clearing": FileCheck,
};

/* ============================================================
   Page Component
   ============================================================ */

const LAST_UPDATED = "2026-07-15";

export default function ArabicServicesHub() {
  /* ── Schema ─────────────────────────────────────────────── */

  const schemas = [
    webPageSchema(
      {
        url: "/ar/services",
        title: `خدماتنا | رسومات ثنائية وثلاثية الأبعاد وموافقات | ${AR.siteShortName}`,
        description:
          "خدمات احترافية في دبي: رسومات ثنائية وثلاثية الأبعاد، توثيق CAD، إدارة الموافقات، وتخليص المستندات. دعم كامل لبلدية دبي، الدفاع المدني، ديوا، والمطورين.",
        dateModified: LAST_UPDATED,
      },
      "ar"
    ),
    breadcrumbList(
      [
        { position: 1, name: AR.breadcrumb.home, slug: "/ar" },
        { position: 2, name: AR.breadcrumb.services, slug: "/ar/services" },
      ],
      "ar"
    ),
  ];

  return (
    <>
      {/* ===== Hero / Header ===== */}
      <section className="bg-brand-blue text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <h1 className="text-h1 font-montserrat font-bold mb-3">
            خدماتنا
          </h1>
          <p className="text-body-lg text-white/80 max-w-3xl">
            خدمات موافقات شاملة تغطي كل شيء من إعداد الرسومات وتوثيق CAD
            إلى إدارة الموافقات الكاملة وتخليص المستندات.{" "}
            <strong className="text-white">{services.length} خدمات أساسية</strong>{" "}
            مصممة خصيصاً لاحتياجات مشروعك.
          </p>
          <p className="text-body-sm text-white/60 mt-2">
            آخر تحديث: {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* ===== Service Cards ===== */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => {
              const Icon = serviceIcon[service.slug] || PenTool;
              const arEntry = servicesAr.find((s) => s.slug === service.slug);
              const arName = arEntry?.ar?.name ?? service.name;
              const arTagline = arEntry?.ar?.tagline ?? service.tagline;
              const arDirect = arEntry?.ar?.directAnswer ?? service.directAnswer;
              const arFeatures = arEntry?.ar?.features ?? service.features;
              return (
                <Link
                  key={service.slug}
                  href={`/ar/services/${service.slug}`}
                  className="group flex flex-col gap-4 p-6 rounded-md bg-gradient-to-br from-white to-card-bg/30 border border-border-light border-s-2 border-s-transparent shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-brand-blue/40 hover:border-s-4 hover:border-s-brand-blue hover:bg-gradient-to-br hover:from-white hover:to-card-bg"
                >
                  {/* Header with icon + title + arrow */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-card-bg text-brand-blue shrink-0">
                        <Icon size={24} strokeWidth={1.75} />
                      </div>
                      <h2 className="text-h3 font-montserrat font-bold text-heading-text group-hover:text-link-blue transition-colors">
                        {arName}
                      </h2>
                    </div>
                    <ArrowLeft
                      size={20}
                      strokeWidth={1.75}
                      className="shrink-0 mt-2 text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>

                  {/* Tagline */}
                  <p className="text-body text-body-text">
                    {arTagline}
                  </p>

                  {/* Direct answer preview */}
                  <p className="text-body-sm text-body-text/80 line-clamp-2">
                    {arDirect}
                  </p>

                  {/* Features list */}
                  <div className="flex flex-col gap-1.5 mt-auto">
                    <p className="text-caption font-medium text-heading-text uppercase tracking-wide">
                      ما نقدمه
                    </p>
                    <ul className="space-y-1">
                      {arFeatures.slice(0, 4).map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-body-sm text-body-text"
                        >
                          <CheckCircle2
                            size={14}
                            strokeWidth={1.75}
                            className="shrink-0 mt-0.5 text-body-text"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {arFeatures.length > 4 && (
                        <li className="text-body-sm text-link-blue font-medium">
                          +{arFeatures.length - 4} المزيد
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="mt-2">
                    <span className="inline-flex items-center gap-1.5 text-body-sm font-medium text-link-blue group-hover:text-link-blue/80 transition-colors">
                      اعرف المزيد
                      <ArrowLeft size={14} strokeWidth={1.75} />
                    </span>
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
              موارد تكميلية
            </h2>
            <p className="text-body-lg text-body-text mb-8">
              خدماتنا تعمل جنباً إلى جنب مع خبراتنا في الموافقات ومواردنا التعليمية.
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
                    تصفح موافقات بلدية دبي، الدفاع المدني، ديوا، المناطق الحرة، والمطورين التي قد تحتاجها لمشروعك.
                  </p>
                  <span className="inline-flex items-center gap-1 text-body-sm font-medium text-link-blue mt-2 group-hover:text-link-blue/80 transition-colors">
                    عرض جميع الموافقات <ArrowLeft size={14} strokeWidth={1.75} />
                  </span>
                </div>
              </Link>
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
                    وصول إلى أكثر من 30 دليل وخبير وأسئلة شائعة تغطي عمليات ومتطلبات الموافقات في دبي.
                  </p>
                  <span className="inline-flex items-center gap-1 text-body-sm font-medium text-link-blue mt-2 group-hover:text-link-blue/80 transition-colors">
                    تصفح الأدلة <ArrowLeft size={14} strokeWidth={1.75} />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <CTASection serviceSlug="services-hub" />

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

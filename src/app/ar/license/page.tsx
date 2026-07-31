/**
 * Business License & Regulatory Registration — /ar/license (Arabic)
 *
 * Arabic mirror of /license. Publishes Wasleen Liminal Approval Consultants'
 * DED trade license details publicly for verification by Arabic-speaking
 * clients. RTL layout is inherited from the Arabic root layout.
 *
 * Schema: WebPage (about → #organization) + BreadcrumbList + FAQPage
 * (see lib/schema.ts licensePageSchemaStack, locale "ar").
 *
 * @see /plans/license-page-build-plan.md
 * @see reference details/license-page-guide.md
 */

import type { Metadata } from "next";
import {
  ExternalLink,
  ShieldCheck,
  BadgeCheck,
  Building2,
  CalendarClock,
  ScrollText,
  FileCheck2,
} from "lucide-react";
import { SITE, NAP, AR } from "@/lib/constants";
import { hreflangAlternates } from "@/lib/locale";
import { licensePageSchemaStack } from "@/lib/schema";
import type { FAQItem } from "@/types";
import FAQBlock from "@/components/sections/FAQBlock";
import LicenseWhatsAppButtonArabic from "@/components/sections/LicenseWhatsAppButtonArabic";

/* ============================================================
   Metadata
   ============================================================ */

export const metadata: Metadata = {
  title: "الرخصة التجارية | وسلين للموافقات",
  description:
    "تحقق من رخصتنا التجارية رقم 1188577 (عضوية غرفة دبي 486012). وسلين ليمينال لاستشارات الموافقات — استشارات موافقات مرخصة في دبي، سارية حتى 2027. اتصل بنا اليوم.",
  alternates: {
    canonical: `${SITE.url}/ar/license`,
    languages: hreflangAlternates(SITE.url, "/ar/license"),
  },
  openGraph: {
    title: "الرخصة التجارية | وسلين للموافقات",
    description:
      "تحقق من رخصتنا التجارية رقم 1188577 (عضوية غرفة دبي 486012). وسلين ليمينال لاستشارات الموافقات — استشارات موافقات مرخصة في دبي.",
    url: `${SITE.url}/ar/license`,
    type: "website",
  },
};

/* ============================================================
   FAQ data — visible Arabic text MUST match schema output verbatim
   ============================================================ */

const faqs: FAQItem[] = [
  {
    question: "هل شركة وسلين ليمينال لاستشارات الموافقات مرخصة في دبي؟",
    answer:
      "نعم. تحمل شركة وسلين ليمينال لاستشارات الموافقات رخصة تجارية نشطة من دائرة التنمية الاقتصادية (رقم الرخصة 1188577) صادرة عن دائرة الاقتصاد والسياحة في دبي. الرخصة سارية حتى 15 سبتمبر 2027 وعضوية غرفة تجارة دبي لدينا هي 486012.",
  },
  {
    question: "كيف يمكنني التحقق من رخصتكم التجارية رقم 1188577؟",
    answer:
      "يمكنك التحقق من رقم الرخصة 1188577 عبر البوابة الرسمية لدائرة الاقتصاد والسياحة (دي إي تي) سابقاً دائرة التنمية الاقتصادية على الرابط app.invest.dubai.ae/search-license. أدخل رقم الرخصة وستظهر حالة التسجيل النشطة واسم الشركة.",
  },
  {
    question: "لماذا تنشر وسلين تفاصيل رخصتها علناً؟",
    answer:
      "ننشر تفاصيل رخصتنا بشفافية تامة حتى يتمكن العملاء وأصحاب المشاريع من إتمام التحقق قبل التعامل معنا. التسجيل التجاري القابل للتحقق هو إشارة ثقة أساسية تؤكد أننا نعمل ككيان قانوني رسمي ومسؤول وليس كوسطاء أفراد.",
  },
  {
    question: "ما هو الشكل القانوني لشركة وسلين ليمينال لاستشارات الموافقات؟",
    answer:
      "مسجلة شركة وسلين ليمينال لاستشارات الموافقات كشركة ذات مسؤولية محدودة – مالك واحد وفق قانون دبي. مكتبنا المسجل في مكتب 401، مبنى درويش، القصيص، دبي، ونعمل بالتوافق الكامل مع اللوائح التجارية الإماراتية.",
  },
  {
    question: "هل تشاركون تفاصيل الرخصة مع العملاء قبل بدء المشروع؟",
    answer:
      "نعم. يسعدنا مشاركة نسخة من رخصتنا التجارية وشهادة غرفة دبي مع أي عميل أو جهة خلال مرحلة التعاقد. يمكنك طلب نسخة فوراً عبر واتساب باستخدام الزر الموجود في هذه الصفحة.",
  },
  {
    question: "كيف يفيدني امتلاك رخصة تجارية في عملية موافقات مشروعي؟",
    answer:
      "تتعامل الجهات مثل بلدية دبي والدفاع المدني في دبي مع الاستشاريين المسجلين. رخصة تجارية سارية تمكننا من العمل كاستشاري مسجل لديك، وتقديم الرسومات والطلبات نيابة عنك، والتواصل مع الجهات ككيان رسمي ومسؤول.",
  },
];

/* ============================================================
   License details table data (text-only, no certificate image)
   ============================================================ */

const licenseRows: { label: string; value: string }[] = [
  { label: "رقم الرخصة", value: AR.license.licenseNumber },
  { label: "اسم الشركة", value: AR.license.companyName },
  { label: "فئة الرخصة", value: AR.license.licenseCategory },
  { label: "جهة الإصدار", value: AR.license.issuingAuthority },
  { label: "الشكل القانوني", value: AR.license.legalType },
  { label: "تاريخ الإصدار", value: AR.license.issueDate },
  { label: "تاريخ الانتهاء", value: AR.license.expiryDate },
  { label: "عضوية غرفة دبي", value: AR.license.dcciMembership },
  { label: "الحالة", value: AR.license.status },
  { label: "العنوان المسجل", value: AR.license.address },
];

/* ============================================================
   Page Component
   ============================================================ */

export default function ArabicLicensePage() {
  /* ── Schema: WebPage + BreadcrumbList + FAQPage (Arabic) ── */
  const schemas = licensePageSchemaStack(
    {
      url: "/ar/license",
      title: "الرخصة التجارية | وسلين للموافقات",
      description:
        "تحقق من رخصة وسلين ليمينال لاستشارات الموافقات التجارية النشطة رقم 1188577 (عضوية غرفة دبي 486012)، سارية حتى 2027.",
      faqs,
      dateModified: "2026-07-31",
    },
    "ar",
  );

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

      {/* ===== Hero ===== */}
      <section className="bg-brand-blue px-4 py-16 md:px-8 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white rounded-full px-4 py-1.5 mb-5">
            <ShieldCheck size={18} strokeWidth={1.75} />
            <span className="text-caption font-medium uppercase tracking-wide">
              مرخصة ومعتمدة من دائرة التنمية الاقتصادية
            </span>
          </div>
          <h1 className="text-h1 font-montserrat text-white mb-4">
            استشاريون معتمدون للتراخيص والموافقات في دبي
          </h1>
          <p className="text-body-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            شركة وسلين ليمينال لاستشارات الموافقات هي شركة استشارات موافقات
            مسجلة ومرخصة في دبي — رقم الرخصة 1188577، عضوية غرفة دبي 486012،
            سارية حتى 15 سبتمبر 2027.
          </p>
        </div>
      </section>

      {/* ===== Direct Answer Block (AI-snippet ready) ===== */}
      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-body-lg text-body-text leading-relaxed">
            تحمل شركة وسلين ليمينال لاستشارات الموافقات (وسلين للموافقات)
            رخصة تجارية نشطة من دائرة التنمية الاقتصادية — رقم الرخصة{" "}
            <strong>{AR.license.licenseNumber}</strong>، وعضوية غرفة دبي{" "}
            <strong>{AR.license.dcciMembership}</strong> — صادرة عن دائرة
            الاقتصاد والسياحة في دبي بتاريخ 15 سبتمبر 2023 وسارية حتى 15
            سبتمبر 2027. وبصفتنا شركة ذات مسؤولية محدودة – مالك واحد، نحن
            مخولون قانوناً للعمل كمستشارين لك في موافقات بلدية دبي وهيئة دبي
            للتطوير وديوا والدفاع المدني والمناطق الحرة.
          </p>
        </div>
      </section>

      {/* ===== Stats Strip ===== */}
      <section className="bg-light-bg border-y border-border-light px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-h2 font-montserrat text-brand-blue">
                {AR.license.licenseNumber}
              </p>
              <p className="text-body-sm text-body-text">رقم الرخصة</p>
            </div>
            <div>
              <p className="text-h2 font-montserrat text-brand-blue">
                {AR.license.dcciMembership}
              </p>
              <p className="text-body-sm text-body-text">عضوية غرفة دبي</p>
            </div>
            <div>
              <p className="text-h2 font-montserrat text-brand-blue">
                شركة ذات مسؤولية محدودة
              </p>
              <p className="text-body-sm text-body-text">الشكل القانوني</p>
            </div>
            <div>
              <p className="text-h2 font-montserrat text-success-green">
                سارية حتى 2027
              </p>
              <p className="text-body-sm text-body-text">حالة الرخصة</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== License Details Table ===== */}
      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-h2 font-montserrat text-heading-text mb-3">
            تفاصيل رخصتنا التجارية
          </h2>
          <p className="text-body text-body-text mb-8">
            التفاصيل أدناه منشورة تماماً كما هي مسجلة لدى دائرة الاقتصاد
            والسياحة (دي إي تي) في دبي. يمكنك التحقق منها بشكل مستقل على
            البوابة الرسمية.
          </p>
          <div className="overflow-x-auto rounded-md border border-border-light">
            <table className="w-full text-left text-body-sm rtl:text-right">
              <thead>
                <tr className="bg-brand-blue text-white">
                  <th scope="col" className="px-4 py-3 font-medium">
                    الحقل
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    التفاصيل
                  </th>
                </tr>
              </thead>
              <tbody>
                {licenseRows.map((row, index) => (
                  <tr
                    key={row.label}
                    className={index % 2 === 0 ? "bg-white" : "bg-card-bg/50"}
                  >
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-heading-text align-top"
                    >
                      {row.label}
                    </th>
                    <td className="px-4 py-3 text-body-text">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-caption text-body-text/70 italic mt-4">
            * تعكس تفاصيل التسجيل أحدث تجديد وتخضع للتغيير من قبل جهة الإصدار.
            تحقق دائماً من الحالة الحالية على البوابة الرسمية لدائرة الاقتصاد
            والسياحة.
          </p>
        </div>
      </section>

      {/* ===== Independent Verification ===== */}
      <section className="bg-light-bg border-y border-border-light px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-h2 font-montserrat text-heading-text mb-4">
            تحقق بشكل مستقل من رخصتنا
          </h2>
          <p className="text-body text-body-text leading-relaxed mb-6">
            لست بحاجة إلى الاعتماد على كلامنا فقط. تحقق من تسجيلنا مباشرة مع
            دائرة الاقتصاد والسياحة (دي إي تي) في دبي باستخدام رقم الرخصة{" "}
            <strong>{AR.license.licenseNumber}</strong> على البوابة الحكومية
            الرسمية.
          </p>
          <a
            href={AR.license.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-body font-medium rounded-md bg-brand-blue text-white hover:bg-brand-blue-hover transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-blue"
            aria-label="تحقق من رخصتنا التجارية على البوابة الرسمية لدائرة الاقتصاد والسياحة (يفتح في نافذة جديدة)"
          >
            <ExternalLink size={20} strokeWidth={1.75} />
            تحقق من الرخصة على بوابة دائرة الاقتصاد والسياحة
          </a>
          <p className="text-caption text-body-text/70 mt-4">
            البوابة الرسمية: app.invest.dubai.ae/search-license
          </p>
        </div>
      </section>

      {/* ===== Licensed Activities ===== */}
      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-h2 font-montserrat text-heading-text mb-4">
            الأنشطة التجارية المرخصة
          </h2>
          <p className="text-body text-body-text mb-6">
            رخصتنا التجارية تخولنا لتقديم الخدمات التالية في دبي، الإمارات
            العربية المتحدة:
          </p>
          <ul className="space-y-3">
            {AR.license.activities.map((activity) => (
              <li
                key={activity}
                className="flex items-start gap-3 bg-card-bg rounded-md px-4 py-3"
              >
                <BadgeCheck
                  size={20}
                  strokeWidth={1.75}
                  className="text-success-green shrink-0 mt-0.5"
                />
                <span className="text-body text-body-text">{activity}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-5 rounded-md bg-card-bg">
              <Building2
                size={20}
                strokeWidth={1.75}
                className="text-brand-blue shrink-0"
              />
              <div>
                <p className="text-body-sm font-medium text-heading-text mb-1">
                  كيان مسجل
                </p>
                <p className="text-caption text-body-text">
                  شركة ذات مسؤولية محدودة – مالك واحد، دبي، الإمارات
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-5 rounded-md bg-card-bg">
              <CalendarClock
                size={20}
                strokeWidth={1.75}
                className="text-brand-blue shrink-0"
              />
              <div>
                <p className="text-body-sm font-medium text-heading-text mb-1">
                  صلاحية الرخصة
                </p>
                <p className="text-caption text-body-text">
                  15-09-2023 حتى 15-09-2027
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-5 rounded-md bg-card-bg">
              <FileCheck2
                size={20}
                strokeWidth={1.75}
                className="text-brand-blue shrink-0"
              />
              <div>
                <p className="text-body-sm font-medium text-heading-text mb-1">
                  التنسيق المخول
                </p>
                <p className="text-caption text-body-text">
                  بلدية دبي، هيئة دبي للتطوير، ديوا، الدفاع المدني والمناطق
                  الحرة
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-light-bg border-y border-border-light px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <FAQBlock
            title="الرخصة والتسجيل — الأسئلة الشائعة"
            subtitle="إجابات حول رخصتنا التجارية، والتحقق منها، ولماذا ننشر هذه التفاصيل علناً."
            items={faqs}
            includeSchema={false}
          />
        </div>
      </section>

      {/* ===== CTA — Request License Copy ===== */}
      <section className="bg-brand-blue px-4 py-16 md:px-8 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-h2 font-montserrat text-white mb-4">
            اطلب نسخة من رخصتنا
          </h2>
          <p className="text-body-lg text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            هل تحتاج رخصتنا التجارية أو شهادة غرفة دبي لسجلاتك أو مصرفك أو
            تقديمها لجهة؟ راسلنا على واتساب وسنرسلها لك فوراً.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LicenseWhatsAppButtonArabic />
            <a
              href="/ar/contact-us"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-body font-medium rounded-md border border-white/70 text-white hover:bg-white hover:text-brand-blue transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
              aria-label="الانتقال إلى صفحة الاتصال بنا"
            >
              <ScrollText size={20} strokeWidth={1.75} />
              اتصل بنا
            </a>
          </div>
          <p className="text-caption text-white/70 mt-6">
            الهاتف / واتساب: {NAP.phone} · البريد الإلكتروني: {NAP.email}
          </p>
        </div>
      </section>

      {/* ===== Last updated ===== */}
      <p className="text-center text-caption text-body-text/60 px-4 py-6">
        آخر تحديث: 31 يوليو 2026 · وسلين ليمينال لاستشارات الموافقات · مكتب
        401، مبنى درويش، القصيص، دبي، الإمارات العربية المتحدة
      </p>
    </>
  );
}

/**
 * من نحن (Arabic) — Company story, credentials, and E-E-A-T signals.
 *
 * Schema: AboutPage + BreadcrumbList + Organization reference
 * Mirrors the English /about-us page with Arabic content and RTL-safe layout.
 * Preserves the license link from the original stub (links to /ar/license).
 * NAP address stays byte-for-byte identical (English) per the master NAP rule.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { SITE, NAP, AR } from "@/lib/constants";
import { hreflangAlternates } from "@/lib/locale";
import { staticPageSchema } from "@/lib/schema";
import { Shield, Award, Users, BadgeCheck, ShieldCheck } from "lucide-react";

/* ============================================================
   Metadata — title is just the label; the ar/layout template
   appends "| وسلين للموافقات" (no duplicate brand suffix).
   ============================================================ */

export const metadata: Metadata = {
  title: AR.breadcrumb.aboutUs,
  description:
    "وسلين ليمينال لاستشارات الموافقات — أكثر من 8 سنوات من الخبرة في تبسيط موافقات دبي. موثوق من أكثر من 500 عميل لتراخيص بلدية دبي وهيئة دبي للتطوير وديوا والدفاع المدني.",
  alternates: {
    canonical: `${SITE.url}/ar/about-us`,
    languages: hreflangAlternates(SITE.url, "/ar/about-us"),
  },
  openGraph: {
    title: `${AR.breadcrumb.aboutUs} | ${AR.siteShortName}`,
    description:
      "تعرف على وسلين ليمينال لاستشارات الموافقات — شريكك الموثوق لموافقات دبي الحكومية والمناطق الحرة والمطورين.",
  },
};

/* ============================================================
   Core values / differentiators
   ============================================================ */

const values = [
  {
    icon: Shield,
    title: "الخبرة التنظيمية",
    description:
      "معرفة عميقة بالمشهد التنظيمي في دبي عبر بلدية دبي وهيئة دبي للتطوير وديوا والدفاع المدني والمناطق الحرة وسلطات المطورين.",
  },
  {
    icon: Award,
    title: "سجل حافل بالإنجازات",
    description:
      "أكثر من 500 موافقة ناجحة عبر المشاريع السكنية والتجارية والصناعية في دبي.",
  },
  {
    icon: Users,
    title: "دعم مخصص",
    description:
      "مديرو حسابات شخصيون يفهمون مشروعك ويقدمون تحديثات لحظية طوال العملية.",
  },
  {
    icon: BadgeCheck,
    title: "خدمة شاملة",
    description:
      "من إعداد المستندات إلى تسليم الموافقة النهائية — نتعامل مع كل شيء لتتفرغ أنت لمشروعك.",
  },
];

/* ============================================================
   Page Component
   ============================================================ */

export default function ArabicAboutUs() {
  /* ── Schema (Arabic) ──────────────────────────────── */
  const schemas = staticPageSchema(
    {
      url: "/ar/about-us",
      title: AR.breadcrumb.aboutUs,
      description:
        "وسلين ليمينال لاستشارات الموافقات — أكثر من 8 سنوات من الخبرة في تبسيط موافقات دبي.",
      pageType: "AboutPage",
      breadcrumbs: [
        { position: 1, name: AR.breadcrumb.home, slug: "/ar" },
        { position: 2, name: AR.breadcrumb.aboutUs, slug: "/ar/about-us" },
      ],
      dateModified: "2026-07-28",
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
          <h1 className="text-h1 font-montserrat text-white mb-4">
            عن {AR.siteName}
          </h1>
          <p className="text-body-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            نبسّط لك منظومة الموافقات المعقدة في دبي لتتمكن من البناء
            والتشغيل والنمو بثقة.
          </p>
        </div>
      </section>

      {/* ===== Company Story ===== */}
      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-h2 font-montserrat text-heading-text mb-6">
            قصتنا
          </h2>
          <div className="space-y-4 text-body text-body-text leading-relaxed">
            <p>
              تأسست وسلين ليمينال لاستشارات الموافقات لسد فجوة حرجة في منظومة
              موافقات المشاريع في دبي — التعقيد والتشتت والوقت الطويل الذي
              تستغرقه التعاملات مع جهات تنظيمية متعددة.
            </p>
            <p>
              بخبرة عملية تتجاوز 8 سنوات في مشهد الموافقات في دبي، طوّر فريقنا
              علاقات عميقة وفهماً إجرائياً شاملاً عبر كل الجهات الرئيسية — من
              بلدية دبي وديوا إلى سلطات المناطق الحرة مثل مدينة دبي للإنترنت
              (DSO) ومركز دبي للسلع المتعددة (DMCC).
            </p>
            <p>
              ساعدنا أكثر من 500 عميل — من مطورين ومقاولين وشركات وأصحاب منازل —
              على اجتياز عملية الموافقات بنجاح، مما وفّر عليهم أسابيع من التأخير
              وآلاف الدراهم من الغرامات التي يمكن تجنبها.
            </p>
            <p>
              مهمتنا بسيطة: جعل موافقات دبي متاحة وقابلة للتوقع وخالية من
              التوتر لكل عميل.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Stats Strip ===== */}
      <section className="bg-light-bg border-y border-border-light px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-h2 font-montserrat text-brand-blue">+8</p>
              <p className="text-body-sm text-body-text">سنوات خبرة</p>
            </div>
            <div>
              <p className="text-h2 font-montserrat text-brand-blue">+500</p>
              <p className="text-body-sm text-body-text">مشروع منجز</p>
            </div>
            <div>
              <p className="text-h2 font-montserrat text-brand-blue">+52</p>
              <p className="text-body-sm text-body-text">نوع موافقة</p>
            </div>
            <div>
              <p className="text-h2 font-montserrat text-brand-blue">+15</p>
              <p className="text-body-sm text-body-text">جهة معتمدة</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Values ===== */}
      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-h2 font-montserrat text-heading-text text-center mb-10">
            لماذا تختار وسلين؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="flex gap-4 p-6 rounded-md bg-card-bg"
                >
                  <div className="w-12 h-12 rounded-md bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                    <Icon size={24} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-h4 font-montserrat text-heading-text mb-2">
                      {value.title}
                    </h3>
                    <p className="text-body-sm text-body-text leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Credentials ===== */}
      <section className="bg-light-bg border-y border-border-light px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-h2 font-montserrat text-heading-text text-center mb-8">
            أوراق اعتمادنا
          </h2>
          <div className="space-y-4 text-body text-body-text leading-relaxed">
            <p>
              وسلين ليمينال لاستشارات الموافقات شركة استشارية مسجلة في دبي،
              الإمارات العربية المتحدة. نعمل بما يتوافق تماماً مع اللوائح
              التجارية الإماراتية ونحافظ على علاقات عمل نشطة مع جميع الجهات
              التنظيمية الرئيسية.
            </p>
            <p>
              <strong>العنوان المسجل:</strong>{" "}
              {NAP.address.streetAddress}, {NAP.address.addressLocality},{" "}
              {NAP.address.addressRegion}
            </p>
            <p>
              <strong>الرخصة:</strong> استشارات مهنية —{" "}
              <Link
                href="/ar/license"
                className="inline-flex items-center gap-2 text-link-blue hover:underline"
                aria-label="التحقق من الرخصة التجارية لوسلين ليمينال لاستشارات الموافقات"
              >
                <ShieldCheck size={18} strokeWidth={1.75} />
                {AR.license.title} — عرض تفاصيل الرخصة والتحقق
              </Link>
              .
            </p>
            <p className="text-body-sm text-body-text/70 italic">
              * تتوفر أرقام الرخصة المحددة وتفاصيل التسجيل للعملاء الموثقين
              أثناء عملية الإعداد.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

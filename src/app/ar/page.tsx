import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { AR, LICENSE, SITE } from "@/lib/constants";
import { hreflangAlternates } from "@/lib/locale";
import { homepageSchema } from "@/lib/schema";
import TrustStripArabic from "@/components/sections/TrustStripArabic";
import ServiceCategoriesArabic from "@/components/sections/ServiceCategoriesArabic";
import ProcessOverviewArabic from "@/components/sections/ProcessOverviewArabic";
import GeoContentSectionArabic from "@/components/sections/GeoContentSectionArabic";
import FAQBlock from "@/components/sections/FAQBlock";
import AuthorityUpdatesArabic from "@/components/sections/AuthorityUpdatesArabic";
import CTASectionArabic from "@/components/sections/CTASectionArabic";

export const metadata: Metadata = {
  title: `${AR.tagline} | ${AR.siteShortName}`,
  description: AR.description,
  alternates: {
    canonical: `${SITE.url}/ar`,
    languages: hreflangAlternates(SITE.url, "/ar"),
  },
};

/* ============================================================
   Arabic Homepage FAQ Items
   ============================================================ */

const faqItems = [
  {
    question: "ما أنواع الموافقات التي تتعامل معها وسلين في دبي؟",
    answer:
      "تتعامل وسلين مع أكثر من 52 نوعاً من الموافقات في جميع أنحاء دبي، تشمل بلدية دبي وهيئة دبي للتطوير وهيئة كهرباء ومياه دبي والدفاع المدني بدبي وموافقات المناطق الحرة وغيرها. نحن نغطي الموافقات الحكومية والمناطق الحرة والمطورين والموافقات الفنية لجميع أنواع المشاريع.",
  },
  {
    question: "كم من الوقت تستغرق الموافقة النموذجية في دبي؟",
    answer:
      "تختلف المدة حسب الجهة وتعقيد المشروع. قد تستغرق الموافقات البسيطة من 3 إلى 5 أيام عمل، بينما قد تستغرق الموافقات المعقدة متعددة الجهات من 4 إلى 8 أسابيع. نقدم تقديراً واقعياً للمدة خلال استشارتك المجانية بناءً على مشروعك المحدد.",
  },
  {
    question: "هل أحتاج إلى استشاري للحصول على موافقة مشروعي في دبي؟",
    answer:
      "على الرغم من أنه ليس مطلوباً قانونياً لجميع الموافقات، إلا أن العمل مع استشاري مثل وسلين يقلل بشكل كبير من التأخير والرفض. نحن نتولى إعداد المستندات والتقديم والمتابعة والمراجعات — مما يوفر عليك أسابيع من المراجعة مع مختلف الجهات.",
  },
  {
    question: "ما هي المستندات التي أحتاج لتقديمها للحصول على الموافقة؟",
    answer:
      "تختلف المستندات المطلوبة حسب نوع الموافقة، ولكنها تشمل عموماً: نموذج الطلب مكتمل، شهادة عدم ممانعة من الجهات المعنية، رسومات تفصيلية (ثنائية وثلاثية الأبعاد)، حسابات إنشائية، عقد إيجار أو سند ملكية، ورخصة تجارية سارية. سنقدم لك قائمة كاملة أثناء الاستشارة.",
  },
  {
    question: "كم تكلفة الحصول على موافقة في دبي؟",
    answer:
      "تختلف التكاليف حسب الجهة ونطاق المشروع. تتراوح الرسوم الحكومية من 500 إلى 5,000 درهم إماراتي لكل موافقة، بينما يتم تحديد رسوم الخدمات الاستشارية بناءً على التعقيد. نقدم أسعاراً شفافة وشاملة بدون رسوم خفيفة. اتصل بنا للحصول على عرض سعر مجاني.",
  },
  {
    question: "ما الذي يميز وسلين عن غيرها من مستشاري الموافقات؟",
    answer:
      "مع أكثر من 8 سنوات من الخبرة وأكثر من 500 مشروع ناجح، تقدم وسلين خبرة عميقة في المشهد التنظيمي في دبي. نوفر إدارة شاملة وأسعاراً شفافة وتحديثات فورية وسجلاً مثبتاً في تسريع الموافقات. فريقنا يعرف بالضبط كيفية عمل كل جهة.",
  },
];

export default function ArabicHomePage() {
  /* ── Schema (Arabic) ──────────────────────────────── */
  const schemas = homepageSchema(
    {
      title: `${AR.tagline} | ${AR.siteShortName}`,
      description: AR.description,
      dateModified: "2026-07-29",
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

      {/* ===== 1. Hero Section (Arabic) ===== */}
      <section className="bg-brand-blue text-white py-16 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-h1 font-bold mb-4">{AR.tagline}</h1>
          <p className="text-body-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            {AR.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/971567648220?text=${encodeURIComponent('مرحباً وسلين، لدي استفسار بخصوص موافقات مشروعي. هل يمكنكم مشاركة الخطوات التالية؟')}`}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-cta-amber text-brand-black font-semibold px-8 py-4 text-body hover:bg-cta-amber-hover transition-colors"
              aria-label="احصل على استشارة مجانية عبر واتساب"
            >
              {AR.cta.freeConsultation}
            </a>
            <a
              href="/ar/approvals"
              className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-white text-white font-semibold px-8 py-4 text-body hover:bg-white hover:text-brand-blue transition-colors"
              aria-label="عرض جميع الموافقات"
            >
              {AR.cta.viewAll}
            </a>
          </div>

          {/* Trust signals */}
          <div className="mt-8 pt-6 border-t border-white/20 grid grid-cols-3 gap-4 text-center max-w-lg mx-auto">
            <div>
              <p className="text-h3 font-bold text-cta-amber">52+</p>
              <p className="text-caption text-white/70">نوع موافقة</p>
            </div>
            <div>
              <p className="text-h3 font-bold text-cta-amber">500+</p>
              <p className="text-caption text-white/70">مشروع منجز</p>
            </div>
            <div>
              <p className="text-h3 font-bold text-cta-amber">8+</p>
              <p className="text-caption text-white/70">سنوات خبرة</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. Trust Strip (Arabic) ===== */}
      <TrustStripArabic />

      {/* ===== 2b. Verified & Licensed Badge (Arabic) ===== */}
      <div className="flex justify-center bg-light-bg px-4 pb-8">
        <Link
          href="/ar/license"
          className="inline-flex items-center gap-2 rounded-full border border-border-light bg-white px-5 py-2.5 text-body-sm font-medium text-brand-blue shadow-card transition-colors hover:border-brand-blue"
          aria-label="مرخصون ومعتمدون من دائرة التنمية الاقتصادية — عرض تفاصيل الرخصة"
        >
          <ShieldCheck size={18} strokeWidth={1.75} className="text-success-green" />
          مرخصون ومعتمدون من دائرة التنمية الاقتصادية — رقم الرخصة {LICENSE.licenseNumber}
        </Link>
      </div>

      {/* ===== 3. Service Categories (Arabic) ===== */}
      <ServiceCategoriesArabic />

      {/* ===== 4. Process Overview (Arabic) ===== */}
      <ProcessOverviewArabic />

      {/* ===== 5. GEO Content Section (Arabic) ===== */}
      <GeoContentSectionArabic />

      {/* ===== 6. FAQ Block ===== */}
      <FAQBlock
        title="الأسئلة الشائعة حول الموافقات في دبي"
        items={faqItems}
      />

      {/* ===== 7. Authority Updates (Arabic) ===== */}
      <AuthorityUpdatesArabic />

      {/* ===== 8. Arabic CTA Section ===== */}
      <CTASectionArabic serviceSlug="homepage" />
    </>
  );
}

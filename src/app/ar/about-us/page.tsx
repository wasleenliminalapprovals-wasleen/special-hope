/**
 * من نحن (Arabic) — "المخطط الحي" (11 ورقة رسم + ورقة 02b).
 *
 * قصة مجموعة وسلين (التصميم الداخلي · الموافقات · البرجولات · الرقمي)
 * عبر لغة مرئية معمارية لأوراق الرسم مع طبقة التفاعل المميزة A1–A8
 * (السيانوتايب نهار/ليل، خط البطل المتحرك عند التمرير، إحصائيات خطوط
 * الأبعاد، إطارات صور مادية، شريط الأوراق، ختم الاستخدام الواحد، مؤشر
 * مخصص، نسيج الكتان). المرآة الكاملة للنسخة الإنجليزية مع دعم RTL.
 *
 * مخطط Schema (الخطة §3.2، جميع الدوال واعية باللغة):
 *   AboutPage + BreadcrumbList + ItemList (الأقسام الأربعة) + FAQPage
 *   + Person×2 (المؤسس / المؤسس المشارك).
 *   تم حل Blocker-4: جمشيد خالد وكافيا راماشاندران. نعيد استخدام معرّفات
 *   المؤلفين العامة (#author-jamsheed-khalid / #author-kavya-ramachandran)
 *   ليحتفظ كل شخص بهوية واحدة عبر الموقع (توحيد الكيانات). `sameAs` من
 *   سجل المؤلفين الموثق (LinkedIn/Gravatar) — لا شيء مختلق وفق
 *   .roo/rules/03 §4 "ما لا يجب فعله أبدًا".
 *
 * مصدر البيانات الوحيد: src/data/about-ar.ts (AR).
 * الخطة: plans/about-us-redesign-mega-plan.md (المراحل A–G)
 * القاعدة: .roo/rules/05-TECHNICAL-SEO-SCHEMA.md (مخطط AboutPage)
 */

import type { Metadata } from "next";

import { SITE, AR } from "@/lib/constants";
import { hreflangAlternates, getOgLocale } from "@/lib/locale";
import { personSchema, staticPageSchema, faqPageSchema } from "@/lib/schema";
import { ABOUT_SIGNATURE_LAYER } from "@/lib/feature-flags";
import { aboutContentAr } from "@/data/about-ar";
import type { AboutContent, SheetMeta } from "@/data/about";
import { AUTHOR_REGISTRY, type GuideAuthor } from "@/data/authors";

/* ── أنماط الصفحة (لوحة السيانوتايب، شريط الأوراق، المبدّل، الإطارات) ── */
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
   البيانات الوصفية — من طبقة البيانات (مصدر الحقيقة الوحيد).
   العنوان نص عادي فقط؛ قالب ar/layout يضيف "| وسلين للموافقات".
   ============================================================ */

export const metadata: Metadata = {
  title: AR.breadcrumb.aboutUs,
  description: aboutContentAr.metadata.description,
  alternates: {
    canonical: aboutContentAr.metadata.canonical,
    languages: hreflangAlternates(SITE.url, "/ar/about-us"),
  },
  openGraph: {
    title: aboutContentAr.metadata.ogTitle,
    description: aboutContentAr.metadata.ogDescription,
    url: aboutContentAr.metadata.canonical,
    type: "website",
    locale: getOgLocale("ar"),
    siteName: AR.siteName,
    // ملاحظة: الخطة §3.1/§3.4.2 تريد صورة og فريدة
    // `/public/images/og-about-us.jpg` (1200×630). لم تُنشأ بعد — نرث
    // الصورة العامة `/logos/og.jpg` من التخطيط الجذري لتجنب صورة معطوبة.
    // أضف `images` هنا فور إنشاء الأصل (مهمة ما بعد البناء).
  },
  twitter: {
    card: "summary_large_image",
    title: aboutContentAr.metadata.ogTitle,
    description: aboutContentAr.metadata.ogDescription,
  },
};

/* ============================================================
   أدوات مساعدة — بحث بيانات الورقة + تجميع الـ Schema
   ============================================================ */

/** يحل SheetMeta لمعرّف ورقة (يرمي خطأً عند معرف خاطئ = يُكتشف أثناء البناء). */
function sheetById(id: string): SheetMeta {
  const found = aboutContentAr.sheets.find((s) => s.id === id);
  if (!found) throw new Error(`Missing sheet meta for "${id}"`);
  return found;
}

/**
 * ماركداون `[label](url)` في إجابات الأسئلة الشائعة — الواجهة المرئية تعرضه
 * كرابط حقيقي؛ مخطط FAQPage يجب أن يحمل نص التسمية فقط
 * (النص المرئي = نص الـ Schema).
 */
const LINK_MD_RE = /\[([^\]]+)\]\([^)]+\)/g;

/**
 * ItemList لأقسام المجموعة الأربعة — يساعد محركات الذكاء الاصطناعي على
 * رسم خريطة المجموعة. `name` يطابق عنوان شريط الدليل المرئي؛ الروابط
 * الخارجية تتحول إلى مطلقة والداخلية تُبنى على SITE.url.
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

/* ── ورقة 07 · مخطط Person (الخطة §3.2 — المؤسس + المؤسس المشارك) ──
   نعيد استخدام معرّفات المؤلفين العامة لكل شخص ليحتفظ كل إنسان بهوية
   واحدة عبر الموقع. jobTitle يطابق الدور المرئي في ورقة 07؛ sameAs من
   سجل المؤلفين الموثق (LinkedIn/Gravatar — لا شيء مختلق). */
const FOUNDER_PERSONS_AR: GuideAuthor[] = [
  {
    id: "jamsheed-khalid",
    name: "جمشيد خالد",
    arabicName: "جمشيد خالد",
    titleEn: "FOUNDER & OWNER",
    titleAr: "المؤسس والمالك",
    jobTitle: "المؤسس والمالك",
    sameAs: AUTHOR_REGISTRY["jamsheed-khalid"].sameAs,
  },
  {
    id: "kavya-ramachandran",
    name: "كافيا راماشاندران",
    arabicName: "كافيا راماشاندران",
    titleEn: "CO-FOUNDER",
    titleAr: "المؤسس المشارك",
    jobTitle: "المؤسس المشارك",
    sameAs: AUTHOR_REGISTRY["kavya-ramachandran"].sameAs,
  },
];

/* ============================================================
   مكوّن الصفحة
   ============================================================ */

export default function ArabicAboutUs() {
  const content = aboutContentAr;

  /* ── Schema (AboutPage + Breadcrumb + ItemList + FAQPage + Person×2) ── */
  const schemas = [
    ...staticPageSchema(
      {
        url: "/ar/about-us",
        title: content.metadata.title,
        description: content.metadata.description,
        pageType: "AboutPage",
        breadcrumbs: [
          { position: 1, name: AR.breadcrumb.home, slug: "/" },
          { position: 2, name: AR.breadcrumb.aboutUs, slug: "/ar/about-us" },
        ],
        dateModified: content.metadata.dateModified,
      },
      "ar",
    ),
    divisionsItemList(content, "ar"),
    faqPageSchema(
      content.faq.items.map((item) => ({
        question: item.question,
        answer: item.answer.replace(LINK_MD_RE, "$1"),
      })),
      "ar",
    ),
    ...FOUNDER_PERSONS_AR.map((person) => personSchema(person, "ar")),
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

        {/* الورقة 01 · البطل */}
        <Sheet01Hero content={content.hero} />

        {/* الورقة 02 · قصتنا */}
        <Sheet02Story story={content.story} sheet={sheetById("sheet-02")} />

        {/* الورقة 02b · شريط الحرفة */}
        <CraftStrip craft={content.craft} sheet={sheetById("sheet-02b")} />

        {/* الورقة 03 · مجموعة وسلين (المخطط العام) */}
        <ParcelGrid
          group={content.group}
          sheet={sheetById("sheet-03")}
          youAreHereLabel={content.hero.youAreHereLabel}
        />

        {/* الورقة 03b · أعمال مختارة (شبكة صور مادية) */}
        <BentoGallery work={content.work} sheet={sheetById("sheet-03b")} />

        {/* الورقة 04 · جانبا المعادلة */}
        <BothSides bothSides={content.bothSides} sheet={sheetById("sheet-04")} />

        {/* الورقة 05 · شريط الأرقام */}
        <NumbersBand numbers={content.numbers} sheet={sheetById("sheet-05")} />

        {/* الورقة 06 · لماذا وسلين */}
        <WhyChoose why={content.why} sheet={sheetById("sheet-06")} />

        {/* الورقة 07 · الفريق */}
        <FounderCard people={content.people} sheet={sheetById("sheet-07")} />

        {/* الورقة 08 · الاعتمادات */}
        <CredentialsSection
          credentials={content.credentials}
          sheet={sheetById("sheet-08")}
        />

        {/* الورقة 09 · دعوة ختامية */}
        <ClosingCta closing={content.closing} sheet={sheetById("sheet-09")} />

        {/* الورقة 10 · الأسئلة الشائعة */}
        <AboutFaq faq={content.faq} sheet={sheetById("sheet-10")} />

        {/* الورقة 11 · مكاتبنا */}
        <OfficeMaps offices={content.offices} sheet={sheetById("sheet-11")} />
      </CyanotypeProvider>
    </>
  );
}

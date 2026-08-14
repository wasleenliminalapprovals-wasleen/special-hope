/**
 * BlogFAQArabic — Arabic variant of ZONE 11 (plan §5, C-AR §9).
 *
 * Mirrors `BlogFAQ.tsx`: index-level FAQ accordion with the shared FAQ
 * primitives (`data-faq-toggle` / `data-faq-a` — driven by the index IIFE).
 *
 * `AR_BLOG_FAQ_ITEMS` is the single source of truth for BOTH the visible
 * Arabic accordion AND the FAQPage JSON-LD on `/ar/blog` (blog-schema.ts
 * imports it for the Arabic locale) so the schema text mirrors the visible
 * text word-for-word (master rule §5).
 *
 * @see src/components/blog/BlogFAQ.tsx (EN source)
 */

import type { BlogFaqItem } from "@/components/blog/BlogFAQ";

export const AR_BLOG_FAQ_ITEMS: BlogFaqItem[] = [
  {
    question: "ما هي الموافقات التي تتعامل معها وسلين في دبي؟",
    answer:
      "تتعامل وسلين ليمينال لاستشارات الموافقات مع بلدية دبي وهيئة دبي للتطوير وديوا والدفاع المدني وهيئة الصحة بدبي والمناطق الحرة — بما في ذلك تصاريح البناء وتصاريح التشطيب وشهادات الإنجاز وشهادة السلامة والجودة الإنشائية بموجب قانون رقم 3 لسنة 2026. شاهد القائمة الكاملة في مركز الموافقات.",
  },
  {
    question: "كم تستغرق الموافقة في دبي؟",
    answer:
      "تختلف المدد حسب الجهة والنطاق — موافقات تشطيب بلدية دبي النموذجية تستغرق من 2 إلى 6 أسابيع، بينما قد تستغرق شهادة الإنجاز من 4 إلى 8 أسابيع بعد الفحص النهائي. كل دليل في هذه المدونة يذكر المدة الزمنية الفعلية لموافقته.",
  },
  {
    question: "هل أحتاج موافقة بلدية دبي لتشطيب مكتب؟",
    answer:
      "نعم — معظم أعمال التشطيب التجارية في دبي تتطلب تصريح بناء من بلدية دبي (أو تصريحاً من هيئة دبي للتطوير داخل وسط المدينة) قبل بدء العمل، بالإضافة إلى شهادة إنجاز بعد فحص التشطيب. يغطي دليل تشطيب المكاتب لدينا المستندات الدقيقة المطلوبة.",
  },
  {
    question: "ما الذي تغيّر مع قانون رقم 3 لسنة 2026 بشأن سلامة المباني؟",
    answer:
      "أدخل قانون دبي رقم 3 لسنة 2026 شهادة جودة وسلامة البناء للمباني القائمة. يجب على الملاك الحصول عليها لإتمام تسجيل المبيعات والإيجارات، مع التجديد كل خمس سنوات. تشرح أدلتنا الخاصة بقانون رقم 3 لسنة 2026 من يحتاجها وكيفية التقديم.",
  },
  {
    question: "هل تتعاملون مع شركات المناطق الحرة؟",
    answer:
      "نعم — ننسق الموافقات عبر المناطق الحرة في دبي بما في ذلك هيئة دبي للتطوير ومركز دبي للسلع المتعددة ومركز دبي المالي الدولي وواحة دبي للسيليكون والمنطقة الحرة بإفزاع وغيرها. مشاريع المناطق الحرة ما زالت تتطلب موافقات الجهات، ونحن ندير شهادات عدم الممانعة والتصاريح نيابة عنك.",
  },
  {
    question: "كيف أحصل على عرض سعر لخدمات الموافقات؟",
    answer:
      "راسلنا عبر واتساب على الرقم +971567648220 مع تفاصيل مشروعك وسنرد عليك بالمستندات المطلوبة ورسوم تقريبية — عادة خلال يوم عمل واحد.",
  },
];

export default function BlogFAQArabic() {
  return (
    <section className="faq-zone" aria-labelledby="faq-heading">
      <div className="blog-container">
        <div className="zone-head reveal">
          <p className="blog-eyebrow">الأسئلة الشائعة</p>
          <h2 id="faq-heading" className="zone-title">
            أسئلة الموافقات، مجابة
          </h2>
        </div>

        <div className="faq-list fade-in">
          {AR_BLOG_FAQ_ITEMS.map((item, i) => (
            <div className="faq-item" key={i}>
              <h3 className="faq-q">
                <button
                  className="faq-toggle"
                  type="button"
                  aria-expanded="false"
                  data-faq-toggle
                  aria-label={`تبديل الإجابة عن: ${item.question}`}
                >
                  <span aria-hidden="true">+</span>
                </button>
                <span>{item.question}</span>
              </h3>
              <div className="faq-a" data-faq-a>
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * AuthorityUpdatesArabic — Arabic version of AuthorityUpdates.
 *
 * All text in Arabic, all links point to /ar/ paths.
 *
 * @see /plans/fix-arabic-100-percent-non-english-plan.md (Issue 2E)
 */

import Image from "next/image";
import Link from "next/link";

/* ── Update data (Arabic) ─────────────────────────────────── */

interface AuthorityUpdateItem {
  name: string;
  logoFilename: string;
  slug: string;
  lastUpdated: string;
  summary: string;
}

const updates: AuthorityUpdateItem[] = [
  {
    name: "بلدية دبي (DM)",
    logoFilename: "DubaiMuncipalityLogo.png",
    slug: "dubai-municipality-building-permit",
    lastUpdated: "يونيو 2026",
    summary:
      "قامت بلدية دبي بتحديث متطلبات كود البناء لعام 2026، مع إدخال سير عمل تقديم رقمي محسّن من خلال بوابة استدامة الجديدة. تتطلب المشاريع الآن وثائق BIM متكاملة لجميع تقديمات الهيكل والعمارة والخدمات. فريقنا مجهز بالكامل لإعداد وتقديم رسومات مطابقة لبلدية دبي وفقاً لأحدث المعايير.",
  },
  {
    name: "الدفاع المدني بدبي (DCD)",
    logoFilename: "DCDLogo.png",
    slug: "dubai-civil-defense-approval",
    lastUpdated: "يونيو 2026",
    summary:
      "قام الدفاع المدني بدبي بتبسيط عملية تقديم طلبات شهادة عدم الممانعة مع قائمة التحقق الجديدة الموحدة للامتثال للسلامة من الحرائق. تتطلب جميع طلبات التشطيبات وإتمام البناء الآن تصاميم معتمدة لأنظمة إخماد الحرائق وتقديمات محدثة لخطط الإخلاء. نرشد العملاء من خلال سير العمل المعدل للدفاع المدني لضمان الموافقة من المحاولة الأولى.",
  },
  {
    name: "هيئة كهرباء ومياه دبي (DEWA)",
    logoFilename: "dewalogo2024.webp",
    slug: "dewa-approval",
    lastUpdated: "مايو 2026",
    summary:
      "فرضت هيئة كهرباء ومياه دبي تركيب العدادات الذكية لجميع التوصيلات التجارية والسكنية الجديدة. تتطلب عملية زيادة الأحمال الآن مخططات أحادية الخط كهربائية محدثة تم التحقق منها من خلال بوابة الخدمات الإلكترونية لهيئة كهرباء ومياه دبي. نتولى عملية موافقة هيئة كهرباء ومياه دبي الكاملة، من تقييم الأحمال إلى تنسيق تركيب العداد.",
  },
  {
    name: "هيئة دبي للتطوير (DDA)",
    logoFilename: "logo-DDA-colour.svg",
    slug: "dda-approval",
    lastUpdated: "مايو 2026",
    summary:
      "أصدرت هيئة دبي للتطوير إرشادات التصميم لعام 2026 لمناطق d3 ومدينة دبي للإنترنت ومدينة دبي للإعلام، مع معايير محدثة لمعالجة الواجهات ومعايير استدامة محسّنة. تتطلب طلبات التشطيبات في مناطق هيئة دبي للتطوير الآن رسومات تنسيق للخدمات وتنسيقاً محدثاً لشهادات عدم الممانعة. نعد تقديمات متوافقة مع هيئة دبي للتطوير لجميع مستأجري المراكز التكنولوجية.",
  },
  {
    name: "DMCC والمناطق الحرة",
    logoFilename: "Dubai-Multi-Commodities-Centre-(DMCC)-thumb.png",
    slug: "dmcc-approval",
    lastUpdated: "أبريل 2026",
    summary:
      "قدمت DMCC متطلبات محدثة لتصاريح التشطيبات في JLT وبرج الماس، بما في ذلك الفواصل المقاومة للحريق الإلزامية لجميع الترقيات التجارية. كما قامت جافزا بمراجعة قواعد تعديل المستودعات. يتخصص خبراء المناطق الحرة لدينا في إدارة تقديمات DMCC وجافزا وDAFZA وجميع المناطق الحرة الأخرى بخبرة خاصة بكل جهة.",
  },
];

/* ── Component ──────────────────────────────────────────── */

export default function AuthorityUpdatesArabic() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-20">
        <h2 className="text-h2 font-montserrat text-heading-text mb-2">
          آخر تحديثات جهات الموافقات في دبي
        </h2>
        <p className="text-body text-body-text mb-10 max-w-3xl">
          ابق على اطلاع بأحدث التغييرات التنظيمية من جهات الموافقات الرئيسية في دبي.
          يقوم فريقنا باستمرار بمراقبة هذه التحديثات والتكيف معها لضمان بقاء تقديمات
          مشروعك متوافقة.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {updates.map((item) => (
            <article
              key={item.slug}
              className="flex flex-col gap-4 p-6 rounded-md bg-white border border-border-light shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-dropdown"
            >
              {/* Authority logo + name */}
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-md bg-white border border-border-light shrink-0 p-2">
                  <Image
                    src={`/logos/${item.logoFilename}`}
                    alt={`شعار ${item.name}`}
                    width={48}
                    height={32}
                    className="object-contain"
                    loading="lazy"
                    style={{ maxHeight: "32px" }}
                  />
                </div>
                <div>
                  <h3 className="text-h4 font-montserrat text-heading-text">
                    {item.name}
                  </h3>
                  <p className="text-caption font-medium text-body-text/60">
                    آخر تحديث: {item.lastUpdated}
                  </p>
                </div>
              </div>

              {/* Summary */}
              <p className="text-body-sm text-body-text leading-relaxed">
                {item.summary}
              </p>

              {/* CTA link */}
              <Link
                href={`/ar/approvals/${item.slug}`}
                className="mt-auto inline-flex items-center gap-1.5 text-link-blue font-semibold hover:underline text-body-sm"
              >
                اقرأ المزيد ←
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

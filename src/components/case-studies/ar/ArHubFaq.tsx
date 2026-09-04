import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { FAQItem } from "@/types";
import { approvals as approvalsAr } from "@/data/approvals-ar";

/**
 * ArHubFaq — Z10 hub-level FAQ + crawler-friendly "Authorities covered" row.
 *
 * Arabic RTL-safe twin of `src/components/case-studies/HubFaq.tsx`. Native
 * `<details>` accordion (no client JS required). The FAQ list is built by
 * `buildArHubFaqs(lastUpdated)` and exported so the `/ar/case-studies` page
 * shell can feed the SAME array into `FAQPage` schema — the visible Arabic
 * answer text equals the schema text word-for-word (Part 12 gate).
 *
 * Answers are plain Arabic sentences (no inline markup) so schema parity stays
 * exact. Real authority links live in the separate crawlable row below; they
 * are resolved against `approvals-ar.ts` by the canonical English top-level
 * slug so each href points to a real `/ar/approvals/{slug}` page and the
 * anchor text is the native Arabic approval name (no English leaks, no 404s).
 *
 * @see src/components/case-studies/HubFaq.tsx (EN twin)
 * @see plans/case-studies-mega-plan.md §19.4.10
 */

/** Canonical authorities → approvals-ar top-level slugs (all resolve). */
const AR_HUB_AUTHORITY_SLUGS: { code: string; slug: string }[] = [
  { code: "DCD", slug: "dubai-civil-defense-approval" },
  { code: "DDA", slug: "dda-approval" },
  { code: "DM", slug: "dubai-municipality-building-permit" },
  { code: "DEWA", slug: "dewa-load-enhancement" },
  { code: "Trakhees", slug: "jebel-ali-free-zone-approval" },
  { code: "RTA", slug: "rta-approval" },
  { code: "Nakheel", slug: "nakheel-developer-approval" },
];

export interface ArAuthorityLink {
  code: string;
  href: string;
  /** Native Arabic approval name (anchor text). */
  label: string;
}

/** Resolved Arabic authority → approval page links (real `/ar/` targets). */
export const AR_HUB_AUTHORITY_LINKS: ArAuthorityLink[] = AR_HUB_AUTHORITY_SLUGS.map(
  ({ code, slug }) => {
    const entry = approvalsAr.find((a) => a.slug === slug);
    if (!entry) return null;
    return {
      code,
      href: `/ar/approvals/${entry.slug}`,
      label: entry.ar.name,
    };
  },
).filter((link): link is ArAuthorityLink => link !== null);

/**
 * Build the Arabic hub FAQ set. `lastUpdated` is injected into the final
 * answer so the "How current is this register?" response always ends with the
 * real freshness date from the Arabic data array.
 */
export function buildArHubFaqs(lastUpdated: string): FAQItem[] {
  return [
    {
      question: "هل هذه مشاريع اعتماد حقيقية؟",
      answer:
        "نعم. كل سجل في هذا السجل هو مشروع اعتماد حقيقي في دبي قامت وسلين للموافقات بإدارته أو بتقديم عرض سعر لعميل بشأنه. يوثّق كل ملف الجهة المعنية والرسوم المقتبسة والمستندات المقدمة والنتيجة الفعلية. لا يوجد في هذه الصفحة أي مثال مختلق أو جاهز.",
    },
    {
      question: "لماذا تكون هوية العملاء سرية؟",
      answer:
        "يطلب معظم العملاء إبقاء هويتهم خاصة، لذلك نُخفي هوية كل مشروع افتراضياً. يعرض كل ملف قطاع العميل فقط مع إشعار بالإخفاء. وعندما يمنح العميل موافقة خطية على ذكر اسمه يظهر اسمه في الملف بدلاً من ذلك.",
    },
    {
      question: "ما الجهات التي تظهر في السجل؟",
      answer:
        "يغطي السجل الجهات التي تعاملت معها مشاريعنا الفعلية، ومنها الدفاع المدني بدبي (DCD) وبلدية دبي (DM) وهيئة دبي للتنمية (DDA) وهيئة كهرباء ومياه دبي (ديوا) ونخيل وتراخيص وهيئة الطرق والمواصلات (RTA). ومع إكمال مزيد من المشاريع تتوسع قائمة الجهات تلقائياً.",
    },
    {
      question: "هل يمكنني الاطلاع على الرسوم والمدد الدقيقة؟",
      answer:
        "نعم. يعرض كل ملف الرسوم المقتبسة والمدّة المخططة مقابل الفعلية لذلك المشروع. الرسوم هي المبالغ التي عرضناها على العميل، وليست تقديراً لتكلفة مشروعك أنت، فالعرض النهائي يعتمد على حجم المبنى واستخدامه وحالته.",
    },
    {
      question: "هل ستتولون مشروعاً مشابهاً؟",
      answer:
        "إذا كان مشروعك يقع ضمن إحدى الجهات أعلاه فغالباً نستطيع إدارته بالكامل، من الرسومات والمستندات وحتى الاعتماد النهائي. استخدم نموذج عرض السعر المجاني وأدخل نوع المبنى والمساحة ونطاق العمل، وسنرد عليك بعرض سعر مختوم.",
    },
    {
      question: "ما مدى حداثة هذا السجل؟",
      answer: `يحمل كل ملف تاريخ آخر تحديث له. وقد روجع السجل نفسه آخر مرة بتاريخ ${lastUpdated}. تتغير الرسوم والمدد واللوائح، لذلك تحمل صفحة كل جهة أيضاً إخلاء المسؤولية الخاص بها.`,
    },
  ];
}

export interface ArHubFaqProps {
  /** Built with `buildArHubFaqs(lastUpdated)` — same array as FAQPage schema. */
  faqs: FAQItem[];
}

export default function ArHubFaq({ faqs }: ArHubFaqProps) {
  return (
    <section
      aria-labelledby="ar-register-faq-heading"
      className="rounded-md border border-border-light bg-white p-6 shadow-card"
    >
      <div className="max-w-3xl">
        <h2
          id="ar-register-faq-heading"
          className="font-montserrat text-h4 font-bold text-heading-text"
        >
          كيف تقرأ هذا السجل؟
        </h2>
        <p className="mt-2 text-body-sm text-body-text/70">
          إجابات سريعة عن مستندات الإثبات أعلاه. افتح كل ملف لترى التفصيل
          الكامل للجهة والمستندات والمدّة الزمنية.
        </p>

        <div className="mt-5 space-y-2.5">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="cs-faq-item rounded-md border border-border-light bg-light-bg px-4 py-3"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-body font-semibold text-heading-text focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronDown
                  size={20}
                  strokeWidth={1.75}
                  className="cs-faq-chevron shrink-0 text-brand-blue"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-2 text-body-sm leading-relaxed text-body-text/80">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        {/* الجهات المشمولة — روابط حقيقية قابلة للزحف (تطابق أزرار Z3) */}
        <h3 className="mt-6 font-montserrat text-h4 font-bold text-heading-text">
          الجهات المشمولة في السجل
        </h3>
        <p className="mt-2 text-body-sm text-body-text/70">
          انتقل إلى صفحة الموافقة الخاصة بكل جهة تظهر في هذا السجل:
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-body-sm">
          {AR_HUB_AUTHORITY_LINKS.map((link) => (
            <li key={link.code}>
              <Link
                href={link.href}
                className="cs-underline-grow text-link-blue hover:text-brand-blue-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

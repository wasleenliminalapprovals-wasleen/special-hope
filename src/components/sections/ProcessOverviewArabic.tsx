/**
 * ProcessOverviewArabic — Arabic version of ProcessOverview.
 *
 * All text in Arabic (4-step process).
 *
 * @see /plans/fix-arabic-100-percent-non-english-plan.md (Issue 2C)
 */

import { Search, FileCheck, ClipboardCheck, BadgeCheck } from "lucide-react";

const steps = [
  {
    step: 1,
    title: "تقديم متطلباتك",
    description:
      "أخبرنا عن مشروعك — النوع والموقع والنطاق. سنحدد كل موافقة تحتاجها.",
    icon: Search,
  },
  {
    step: 2,
    title: "نحن نعد ونقدم",
    description:
      "يجمع فريقنا جميع المستندات والرسومات والنماذج المطلوبة. نقدم للجهة المختصة نيابة عنك.",
    icon: FileCheck,
  },
  {
    step: 3,
    title: "نتابع ونسأل",
    description:
      "نتابع حالة الطلب ونرد على الاستفسارات ونجري المراجعات حسب الحاجة. نبقيك على اطلاع في كل مرحلة.",
    icon: ClipboardCheck,
  },
  {
    step: 4,
    title: "تم تسليم الموافقة",
    description:
      "بعد الموافقة، نسلمك الشهادة أو التصريح ونتأكد من أن كل شيء جاهز لمشروعك للمتابعة.",
    icon: BadgeCheck,
  },
];

export default function ProcessOverviewArabic() {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-h2 font-montserrat text-heading-text mb-3">
            كيف نعمل
          </h2>
          <p className="text-body-lg text-body-text max-w-2xl mx-auto">
            عملية مبسطة مصممة لتوفير وقتك وإزالة تعقيد نظام الموافقات في دبي.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative flex flex-col items-center text-center p-6 bg-card-bg rounded-md border border-border-light shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-brand-blue/40 hover:border-s-4 hover:border-s-brand-blue hover:bg-gradient-to-br hover:from-white hover:to-card-bg group">
                {/* Step number circle */}
                <div className="absolute -top-2 -start-2 w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center text-caption font-montserrat font-bold">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-card-bg flex items-center justify-center text-brand-blue mb-4">
                  <Icon size={28} strokeWidth={1.75} />
                </div>

                <h3 className="text-h4 font-montserrat text-heading-text mb-2">
                  {step.title}
                </h3>

                <p className="text-body-sm text-body-text leading-relaxed">
                  {step.description}
                </p>

                {/* Connector line (desktop only) */}
                {step.step < 4 && (
                  <div
                    className="hidden lg:block absolute top-1/2 -end-3 w-6 h-0.5 bg-border-light"
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

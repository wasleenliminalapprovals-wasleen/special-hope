/**
 * GeoContentSectionArabic — Arabic version of GeoContentSection.
 *
 * All text in Arabic, all internal links point to /ar/ paths.
 *
 * @see /plans/fix-arabic-100-percent-non-english-plan.md (Issue 2D)
 */

import Link from "next/link";

export default function GeoContentSectionArabic() {
  return (
    <section className="bg-light-bg">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-20">
        {/* ===== Section A ===== */}
        <div className="mb-12">
          <h2 className="text-h2 font-montserrat text-heading-text mb-6">
            موثوق في جميع المراكز التجارية والسكنية الرئيسية في دبي
          </h2>

          <div className="space-y-4 text-body text-body-text leading-relaxed max-w-4xl">
            <p>
              تقدم وسلين ليمينال لاستشارات الموافقات إدارة متكاملة للموافقات عبر جميع
              الجهات الرئيسية في دبي — بما في ذلك
              <strong> بلدية دبي (DM)</strong> و<strong>هيئة دبي للتطوير (DDA)</strong> و
              <strong> هيئة كهرباء ومياه دبي (DEWA)</strong> و<strong>الدفاع المدني بدبي (DCD)</strong> و
              <strong> تراخيص</strong> وجميع سلطات المناطق الحرة في الإمارة. سواء كنت بحاجة إلى
              تصريح بناء أو شهادة عدم ممانعة للتشطيبات أو توصيلة ديوا أو شهادة امتثال للسلامة
              من الحرائق، فإن فريقنا يدير العملية التنظيمية من التقديم إلى الختم النهائي.
            </p>

            <p>
              من مكتبنا في القصيص، نخدم العملاء في جميع أنحاء
              <strong> الخليج التجاري</strong> و<strong>وسط مدينة دبي</strong> و
              <strong>أبراج بحيرة جميرا (JLT)</strong> و<strong>شارع الشيخ زايد</strong> و
              <strong>مرسى دبي</strong> و<strong>واحة دبي للسيليكون</strong> و
              <strong>DAFZA</strong> و<strong>JAFZA</strong> و<strong>ميدان</strong> و
              <strong>القوز الصناعية</strong> و<strong>دبي الجنوب</strong>
              وجميع المجتمعات السكنية الخمسين وما فوق. بغض النظر عن مكان وجود مشروعك،
              فإننا نتولى تقديمات الجهات والمتابعة حتى تتمكن من التركيز على البناء والتشغيل.
            </p>

            <p>
              مهندسونا المعتمدون يعدون ويختمون جميع الرسومات المطابقة لمتطلبات بلدية دبي
              داخلياً. نقدم مباشرة إلى <Link href="/ar/approvals/dubai-municipality-building-permit" className="text-link-blue hover:underline font-medium">بلدية دبي</Link> و
              <Link href="/ar/approvals/dda-approval" className="text-link-blue hover:underline font-medium"> هيئة دبي للتطوير</Link> و
              <Link href="/ar/approvals/dewa-approval" className="text-link-blue hover:underline font-medium"> هيئة كهرباء ومياه دبي</Link> و
              <Link href="/ar/approvals/dubai-civil-defense-approval" className="text-link-blue hover:underline font-medium"> الدفاع المدني بدبي</Link> و
              تراخيص وجميع سلطات المناطق الحرة نيابة عنك — مما يوفر عليك أسابيع من
              التنسيق ويزيل مخاطر الرفض الناتجة عن التقديمات غير المكتملة.
            </p>
          </div>

          <div className="mt-6">
            <Link
              href="/ar/approvals"
              className="inline-flex items-center gap-1.5 text-link-blue font-semibold hover:underline"
            >
              عرض جميع أنواع الموافقات الـ 52+ ←
            </Link>
          </div>
        </div>

        {/* ===== Section B ===== */}
        <div>
          <h2 className="text-h2 font-montserrat text-heading-text mb-6">
            لماذا تختار دبي وسلين لموافقات المشاريع
          </h2>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-md p-6 text-center border border-border-light shadow-card">
              <p className="text-h1 font-montserrat text-cta-amber">52+</p>
              <p className="text-body-sm text-body-text mt-1">نوع موافقة نغطيها</p>
            </div>
            <div className="bg-white rounded-md p-6 text-center border border-border-light shadow-card">
              <p className="text-h1 font-montserrat text-cta-amber">500+</p>
              <p className="text-body-sm text-body-text mt-1">مشروع تم تسليمه بنجاح</p>
            </div>
            <div className="bg-white rounded-md p-6 text-center border border-border-light shadow-card">
              <p className="text-h1 font-montserrat text-cta-amber">8+</p>
              <p className="text-body-sm text-body-text mt-1">سنوات من الخبرة التنظيمية</p>
            </div>
            <div className="bg-white rounded-md p-6 text-center border border-border-light shadow-card">
              <p className="text-h1 font-montserrat text-cta-amber">100%</p>
              <p className="text-body-sm text-body-text mt-1">رسومات وهندسة داخلية</p>
            </div>
          </div>

          <p className="text-body text-body-text leading-relaxed max-w-3xl">
            فريقنا من المهندسين المعتمدين والرسامين ومتخصصي الموافقات قام بتبسيط
            عملية الموافقات لمئات العملاء في جميع أنحاء القطاعات التجارية والسكنية
            في دبي. نحن نجمع بين المعرفة التنظيمية العميقة وإعداد المستندات الفعال
            لتقديم أسرع أوقات إنجاز ممكنة.
            <Link href="/ar/about-us" className="text-link-blue hover:underline font-medium me-1">
              {" "}اعرف المزيد عن فريقنا ←
            </Link>
          </p>
        </div>

        {/* ===== Section C ===== */}
        <div className="mt-12 pt-12 border-t border-border-light">
          <h2 className="text-h2 font-montserrat text-heading-text mb-6">
            خدمات موافقات شاملة عبر كل جهة
          </h2>

          <div className="space-y-4 text-body text-body-text leading-relaxed max-w-4xl">
            <p>
              ندير الطيف الكامل من <Link href="/ar/approvals" className="text-link-blue hover:underline font-medium">موافقات دبي</Link> التي تشمل
              التصاريح التنظيمية الحكومية وتصاريح المناطق الحرة وشهادات عدم الممانعة
              من المطورين وتوصيلات المرافق الفنية. خدمة <Link href="/ar/approvals/dubai-municipality-building-permit" className="text-link-blue hover:underline font-medium">تصريح بناء بلدية دبي</Link> لدينا
              تتولى كل شيء من تقديم الرسومات الأولي إلى الموافقة النهائية، بينما يضمن فريق
              <Link href="/ar/approvals/dubai-civil-defense-approval" className="text-link-blue hover:underline font-medium"> موافقة الدفاع المدني بدبي</Link> لدينا امتثال جميع أنظمة الحماية من الحرائق
              لمتطلبات كود الحرائق الإماراتي. لتوصيلات المرافق، ندير
              <Link href="/ar/approvals/dewa-approval" className="text-link-blue hover:underline font-medium"> موافقات هيئة كهرباء ومياه دبي</Link> وتركيبات العدادات
              وطلبات زيادة الأحمال عبر جميع أنواع العقارات.
            </p>

            <p>
              للشركات في المناطق الحرة في دبي، نقدم خدمات متخصصة لـ
              <Link href="/ar/approvals/dmcc-approval" className="text-link-blue hover:underline font-medium"> موافقة DMCC</Link> في JLT و
              <Link href="/ar/approvals/dubai-silicon-oasis-approval" className="text-link-blue hover:underline font-medium"> واحة دبي للسيليكون</Link> و
              <Link href="/ar/approvals/tecom-approvals" className="text-link-blue hover:underline font-medium"> تيكوم</Link> وتصاريح
              <Link href="/ar/approvals/jebel-ali-free-zone-approval" className="text-link-blue hover:underline font-medium"> جافزا</Link> عبر بوابة تراخيص.
              للمجتمعات المخطط لها، ننسق شهادات عدم الممانعة من
              <Link href="/ar/approvals/emaar-community-approval" className="text-link-blue hover:underline font-medium"> إعمار</Link> و
              <Link href="/ar/approvals/nakheel-developer-approval" className="text-link-blue hover:underline font-medium"> نخيل</Link> و
              <Link href="/ar/approvals/damac-properties-approval" className="text-link-blue hover:underline font-medium"> داماك</Link> و
              <Link href="/ar/approvals/dubai-properties-approval" className="text-link-blue hover:underline font-medium"> دبي بروبرتيز</Link>
              جنباً إلى جنب مع تصاريح بناء بلدية دبي وموافقات الدفاع المدني المرتبطة بها.
              تتم معالجة كل موافقة من البداية إلى النهاية، من جمع المستندات إلى تسليم الشهادة النهائية.
            </p>
          </div>

          <div className="mt-6">
            <Link
              href="/ar/contact-us"
              className="inline-flex items-center gap-1.5 bg-cta-amber hover:bg-cta-amber-hover text-brand-black font-semibold px-6 py-3 rounded-md transition-colors"
            >
              احصل على تقييم مجاني لموافقتك ←
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

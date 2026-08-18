/**
 * About Us content — Arabic (/ar/about-us)
 *
 * "The Living Blueprint" — 11 drawing sheets + Sheet 02b that tell the
 * Wasleen Group story (Interior · Approvals · Pergolas · Digital) through
 * an architectural drawing-set visual language.
 *
 * This file mirrors `about.ts` 1:1 — same structure, same images, same
 * numbers (273+ / 500+ / 52+ / 4), same `dateModified`. Arabic copy is
 * contextual, native Arabic (NOT a word-for-word translation), following the
 * `privacy.ts` / `privacy-ar.ts` parity pattern. NAP details, license numbers,
 * phone numbers, and external URLs stay byte-for-byte identical (English).
 *
 * Per .roo/rules/03-SEO-AI-SEARCH-MASTER.md: every string visible on the page
 * is also surfaced verbatim in the JSON-LD schema stack — never reword it.
 *
 * Plan: plans/about-us-redesign-mega-plan.md §2 (copy) / §3.5 (parity) / §4.3
 * Rule: .roo/rules/03-SEO-AI-SEARCH-MASTER.md (visible text = schema text)
 */

import type { AboutContent } from "@/data/about";

/* ────────────────────────────────────────────────────────────
   Images (same src / width / height as about.ts — Arabic alt)
   dims measured with scripts/get-webp-dims.mjs
   ──────────────────────────────────────────────────────────── */

const IMG = {
  story: {
    src: "/images/about-us/interior-fit-out-project-management-dcd-compliance-dubai-wasleen-interiors-dubai-18.webp",
    alt: "فريق وسلين لإدارة مشاريع التشطيبات الداخلية يراجع رسومات الامتثال للدفاع المدني في دبي",
    width: 1384,
    height: 1040,
    priority: true,
  },
  craftCnc: {
    src: "/images/about-us/pergola/aluminum-glass-cnc-machining.webp",
    alt: "تصنيع الألمنيوم والزجاج بالحاسوب داخل مصنع وسلين في دبي",
    width: 2400,
    height: 1350,
  },
  craftWind: {
    src: "/images/about-us/pergola/aluminum-glass-wind-load-engineering.webp",
    alt: "حسابات هندسة أحمال الرياح لهياكل الألمنيوم والزجاج في وسلين دبي",
    width: 1024,
    height: 915,
  },
  interior: {
    src: "/images/about-us/interior-fitout-company-dubai-wasleen.webp",
    alt: "تشطيب داخلي لفيلا فاخرة نفذته شركة وسلين للتشطيبات الداخلية في دبي",
    width: 1920,
    height: 1080,
  },
  pergolaCarParking: {
    src: "/images/about-us/pergola/pergola-car-parking-ajman.webp",
    alt: "هيكل مواقف سيارات حديث بنته وسلين للبرجولات في عجمان",
    width: 1384,
    height: 1040,
  },
  bentoVilla: {
    src: "/images/about-us/residential-interior-fitout-dubai-villa-design-wasleen.webp",
    alt: "تصميم تشطيب داخلي لفيلا سكنية أنجزته وسلين للتشطيبات الداخلية في دبي",
    width: 1920,
    height: 1080,
  },
  bentoOffice: {
    src: "/images/about-us/commercial-interior-fitout-dubai-office-renovation-wasleen.webp",
    alt: "تجديد تشطيب مكتب تجاري أنجزته وسلين للتشطيبات الداخلية في الخليج التجاري، دبي",
    width: 1920,
    height: 1080,
  },
  bentoCarport: {
    src: "/images/about-us/pergola/aluminum-car-port-villas.webp",
    alt: "مظلة سيارات من الألمنيوم للفيلات صممتها وركبتها وسلين للبرجولات في دبي",
    width: 1384,
    height: 1040,
  },
  bentoCinema: {
    src: "/images/about-us/luxury-home-cinema-design-dubai-wasleen-interiors-02.webp",
    alt: "تصميم سينما منزلية فاخرة من وسلين للتشطيبات الداخلية وسينماكس سكاي في دبي",
    width: 900,
    height: 650,
  },
  bentoGlazing: {
    src: "/images/about-us/pergola/aluminum-lift-slide-doors-windows.webp",
    alt: "أبواب ونوافذ انزلاقية من الألمنيوم الثقيل ركبتها وسلين في القوز، دبي",
    width: 1080,
    height: 1080,
  },
  founder: {
    src: "/images/Wasleen-interiors-fitouts-pergola-company-founder-owner.webp",
    alt: "مؤسس ومالك شركة وسلين للتشطيبات الداخلية والبرجولات في دبي",
    width: 784,
    height: 1168,
  },
  cofounder: {
    src: "/images/Wasleen-interiors-fitouts-pergola-company-cofounder.webp",
    alt: "المؤسس المشارك لشركة وسلين للتشطيبات الداخلية والبرجولات في دبي",
    width: 896,
    height: 1200,
  },
};

/* ────────────────────────────────────────────────────────────
   Arabic content — 1:1 parity mirror of about.ts
   ──────────────────────────────────────────────────────────── */

export const aboutContentAr: AboutContent = {
  locale: "ar",
  metadata: {
    title: "من نحن | وسلين ليمينال لاستشارات الموافقات",
    description:
      "تعرّف على وسلين ليمينال لاستشارات الموافقات — فريق مدعوم بخبرة المقاولات خلف أكثر من 273 مشروعاً و500+ موافقة في دبي عبر 52+ نوعاً. تواصل معنا اليوم.",
    ogTitle: "من نحن | وسلين ليمينال لاستشارات الموافقات",
    ogDescription:
      "تعرّف على وسلين ليمينال لاستشارات الموافقات — فريق مدعوم بخبرة المقاولات خلف أكثر من 273 مشروعاً و500+ موافقة في دبي عبر 52+ نوعاً.",
    dateModified: "2026-08-18",
    canonical: "https://www.dubaiapprovalconsultants.com/ar/about-us",
  },

  toggle: {
    toNight: "التبديل إلى عرض المخطط الليلي",
    toDay: "التبديل إلى عرض المخطط النهاري",
    day: "نهاري",
    night: "ليلي",
  },

  sheetRail: {
    label: "لوحات الرسم",
    prefix: "الانتقال إلى اللوحة",
  },

  sheets: [
    { id: "sheet-01", number: "01", label: "الواجهة" },
    { id: "sheet-02", number: "02", label: "قصتنا" },
    { id: "sheet-02b", number: "02B", label: "الحرفة" },
    { id: "sheet-03", number: "03", label: "المجموعة" },
    { id: "sheet-03b", number: "03B", label: "أعمال مختارة" },
    { id: "sheet-04", number: "04", label: "جانبا المعادلة" },
    { id: "sheet-05", number: "05", label: "الأرقام" },
    { id: "sheet-06", number: "06", label: "لماذا وسلين" },
    { id: "sheet-07", number: "07", label: "الفريق" },
    { id: "sheet-08", number: "08", label: "الاعتمادات" },
    { id: "sheet-09", number: "09", label: "اتصل بنا" },
    { id: "sheet-10", number: "10", label: "الأسئلة الشائعة" },
    { id: "sheet-11", number: "11", label: "مكاتبنا" },
  ],

  /* ── Sheet 01 · Hero ─────────────────────────────────── */
  hero: {
    eyebrow: "جزء من مجموعة وسلين",
    h1: "لا نعرف موافقات دبي فقط — نحن بنينا المشاريع التي احتاجتها.",
    subhead:
      "نشأت وسلين ليمينال لاستشارات الموافقات من وسلين للتشطيبات والديكور — أكثر من 273 مشروع بناء حقيقي علّمتنا، رخصةً برخصة، ما تتوقعه سلطات دبي بالضبط. واليوم نتولى أكثر من 52 نوعاً من الموافقات عبر كل الجهات الرئيسية.",
    ctaPrimary: { label: "احصل على استشارة مجانية", href: "https://wa.me/971567648220" },
    ctaSecondary: { label: "استكشف موافقاتنا", href: "/approvals" },
    youAreHereLabel: "أنت هنا",
    divisions: [
      { id: "interior", label: "الديكور الداخلي", icon: "Home", href: "https://wasleen.com", external: true },
      { id: "approvals", label: "الموافقات", icon: "Stamp", youAreHere: true },
      { id: "pergolas", label: "البرجولات", icon: "Sun", href: "https://www.pergolas.wasleen.com", external: true },
      { id: "digital", label: "الحلول الرقمية", icon: "Globe", href: "https://wasleen.com/wasleen-digital", external: true },
    ],
  },

  /* ── Sheet 02 · Our Story ────────────────────────────── */
  story: {
    heading: "كيف تحوّل مقاول إلى استشارات موافقات",
    paragraphs: [
      "لم تبدأ وسلين كشركة استشارات موافقات. بدأت كشركة إنشاءات وتشطيبات داخلية — النوع الذي يظهر في الموقع، ويدير مصنع النجارة، ويشرف على الأعمال الميكانيكية والكهربائية، ويسلّم فيلا أو مكتباً جاهزاً. وخلال أكثر من 273 مشروعاً في دبي وأبوظبي والشارقة وعجمان، كان أكثر ما يكلف عملاءنا وقتاً ومالاً هو — قبل أن يرتفع جدار واحد — إنجاز مشروعهم عبر بلدية دبي وديوا والدفاع المدني وسلطات المناطق الحرة.",
      "لذا بنينا هذه الخبرة داخلياً — مهندسون مسجلون قادرون على اعتماد رسومات متوافقة مع بلدية دبي، وفريق يفهم بالضبط ما يفحصه مفتش الدفاع المدني في موافقة السلامة من الحرائق، وعلاقات مع سلطات المناطق الحرة حيث تُبنى مشاريعنا. ومع الوقت تحولت هذه القدرة إلى عمل مستقل: وسلين ليمينال لاستشارات الموافقات.",
      "هذا هو الفرق بيننا وبين شركة تدفع الأوراق فقط. لقد كنا مقدمي الطلب. وكنا المقاول المنتظر للموافقة. ونعرف أين تُرفض الطلبات فعلياً، لأن رسوماتنا الخاصة رُفضت — وتعلمنا بالضبط ما يجب إصلاحه.",
    ],
    revisionTitle: "سجل المراجعات",
    revisionRows: [
      { rev: "REV A", division: "المقاول", scope: "تأسست 2013", status: "الديكور الداخلي" },
      { rev: "REV B", division: "المهندس", scope: "داخلياً", status: "بلدية دبي والدفاع المدني" },
      { rev: "REV C", division: "الموافقات", scope: "52+ نوعاً", status: "الحالي" },
    ],
    approvedLabel: "معتمد",
    timelineTitle: "الخط الزمني للمجموعة",
    timeline: [
      { year: "2013", label: "الديكور الداخلي" },
      { year: "2018", label: "الموافقات" },
      { year: "2018", label: "البرجولات" },
      { year: "2020", label: "الرقمية" },
    ],
    image: IMG.story,
    imageCaption: "امتثال الدفاع المدني · إدارة مشاريع التشطيبات",
  },

  /* ── Sheet 02b · The Craft Strip ─────────────────────── */
  craft: {
    heading: "مُبنى داخلياً. معتمد داخلياً.",
    items: [
      {
        id: "factory-floor",
        image: IMG.craftCnc,
        caption: "أرضية مصنعنا · تصنيع الألمنيوم والزجاج تحت سقف واحد",
      },
      {
        id: "wind-load",
        image: IMG.craftWind,
        caption: "هندسة أحمال الرياح · نفس الحسابات خلف موافقاتنا الإنشائية",
      },
    ],
  },

  /* ── Sheet 03 · The Wasleen Group (Site Plan) ────────── */
  group: {
    heading: "مجموعة واحدة، أربع حرف، معيار واحد",
    intro:
      "وسلين ليست شركة واحدة ترتدي أسماء مختلفة. إنها أربعة تخصصات نشأت من الغريزة نفسها — لا تستعن بمصادر خارجية للأمر المهم، بل ابنِ القدرة بنفسك.",
    tableCaption: "سجل مراجعات المجموعة",
    tableHeaders: ["المراجعة", "القسم", "النطاق", "الحالة"],
    tableRows: [
      {
        rev: "A",
        division: "وسلين للديكور الداخلي والتشطيبات",
        scope: "تشطيبات سكنية وتجارية، أعمال ميكانيكية وكهربائية، نجارة، أتمتة",
        status: "273+ مشروعاً · 7 إمارات",
      },
      {
        rev: "B",
        division: "وسلين للبرجولات وسينماكس سكاي",
        scope: "هندسة خارجية، برجولات ذكية، مواقف سيارات، طوابق ميزانين",
        status: "هياكل ذكية ومناخية",
      },
      {
        rev: "C",
        division: "وسلين ليمينال لاستشارات الموافقات",
        scope: "موافقات الحكومة والمناطق الحرة والمطورين — 52+ نوعاً",
        status: "أنت هنا",
        youAreHere: true,
      },
      {
        rev: "D",
        division: "وسلين للحلول الرقمية",
        scope: "مواقع مخصصة الهندسة للمجموعة وعملاء خارجيين",
        status: "أحدث أقسام المجموعة",
      },
    ],
    parcels: [
      {
        id: "interior",
        title: "وسلين للديكور الداخلي والتشطيبات",
        description:
          "تشطيبات فيلات فاخرة ومشاريع تجارية، وأعمال ميكانيكية وكهربائية ونجارة، عبر الإمارات السبع.",
        href: "https://wasleen.com",
        external: true,
        image: IMG.interior,
        caption: "الديكور الداخلي · wasleen.com",
      },
      {
        id: "approvals",
        title: "وسلين ليمينال لاستشارات الموافقات",
        description:
          "موافقات الحكومة والمناطق الحرة والمطورين عبر أكثر من 52 فئة.",
        youAreHere: true,
      },
      {
        id: "pergolas",
        title: "وسلين للبرجولات وسينماكس سكاي",
        description:
          "برجولات مناخية، هياكل خارجية ذكية، وتصميم سينما خارجية فاخرة.",
        href: "https://pergolas.wasleen.com",
        external: true,
        image: IMG.pergolaCarParking,
        caption: "البرجولات · pergolas.wasleen.com",
      },
      {
        id: "digital",
        title: "وسلين للحلول الرقمية",
        description:
          "مواقع مخصصة الهندسة وخالية من التضخم، مبنية للسرعة وظهور البحث.",
        href: "https://wasleen.com/wasleen-digital",
        external: true,
      },
    ],
    quote:
      "أربعة أعمال، ثقافة مكتب واحدة: ابنِ الأمر بشكل صحيح داخلياً، أو لا تفعله إطلاقاً.",
  },

  /* ── Sheet 03b · Selected Work (Physical Photo Bento) ── */
  work: {
    heading: "العمل خلف الموافقات",
    intro:
      "مختارات من مشاريع المجموعة — تشطيبات داخلية وهياكل خارجية مرّت عبر الموافقات التي نديرها.",
    cells: [
      {
        id: "villa-fitout",
        image: IMG.bentoVilla,
        caption: "مشروع: تشطيب فيلا · دبي",
        size: "large",
        rotation: -1.5,
      },
      {
        id: "office-fitout",
        image: IMG.bentoOffice,
        caption: "تشطيب مكتب · الخليج التجاري",
        size: "square",
        rotation: 1,
      },
      {
        id: "carport",
        image: IMG.bentoCarport,
        caption: "مظلة ألمنيوم · فيلا",
        size: "square",
        rotation: -1,
      },
      {
        id: "cinema",
        image: IMG.bentoCinema,
        caption: "سينما فاخرة · سينماكس سكاي",
        size: "wide",
        rotation: 1.5,
      },
      {
        id: "glazing",
        image: IMG.bentoGlazing,
        caption: "زجاج منزلق · القوز",
        size: "square",
        rotation: -1.25,
      },
    ],
  },

  /* ── Sheet 04 · Both Sides of the Counter ────────────── */
  bothSides: {
    heading: "وقفنا على جانبي المكتب معاً",
    points: [
      {
        id: "own-drawings",
        icon: "FileCheck",
        title: "قدّمنا رسوماتنا الخاصة، وليس رسومات العملاء فقط.",
        description:
          "كل عملية تقديم لبلدية دبي والدفاع المدني نديرها لك، أجريناها لمواقع البناء الحية الخاصة بنا.",
      },
      {
        id: "inspectors",
        icon: "ClipboardCheck",
        title: "نعرف ما يفحصه المفتشون فعلياً.",
        description:
          "موافقات السلامة من الحرائق للدفاع المدني، وتقييمات الأحمال لديوا، وموافقات التشطيبات لهيئة دبي للتطوير — خضعت طواقمنا للتفتيش وفق هذه المعايير، ولم نقرأ عنها فقط.",
      },
      {
        id: "rejections",
        icon: "Construction",
        title: "273+ مشروعاً مبنياً علّمنا أين تخطئ الموافقات.",
        description:
          "معظم الطلبات المرفوضة تفشل لنفس الأسباب القليلة. لقد رأينا تلك الأسباب من جانب المقاول.",
      },
      {
        id: "one-roof",
        icon: "Users",
        title: "مجموعة واحدة، أربعة تخصصات، نقطة تواصل واحدة.",
        description:
          "الموافقات والتشطيبات والهياكل الخارجية وموقع يحقق التحويل — أربع محادثات مع أشخاص يعملون تحت سقف واحد.",
      },
    ],
  },

  /* ── Sheet 05 · Numbers Band ─────────────────────────── */
  numbers: {
    heading: "وسلين بالأرقام",
    stats: [
      { id: "years", value: 8, suffix: "+", label: "سنوات من الموافقات" },
      { id: "approvals", value: 500, suffix: "+", label: "موافقة تم تسليمها" },
      { id: "projects", value: 273, suffix: "+", label: "مشروعاً للمجموعة" },
      { id: "divisions", value: 4, suffix: "", label: "أقسام داخلية" },
    ],
  },

  /* ── Sheet 06 · Why Choose Wasleen ───────────────────── */
  why: {
    heading: "لماذا تختار وسلين؟",
    cards: [
      {
        id: "regulatory",
        icon: "Shield",
        title: "الخبرة التنظيمية",
        description:
          "معرفة عميقة بالمشهد التنظيمي في دبي عبر بلدية دبي وهيئة دبي للتطوير وديوا والدفاع المدني والمناطق الحرة وسلطات المطورين.",
      },
      {
        id: "track-record",
        icon: "Award",
        title: "سجل حافل بالإنجازات",
        description:
          "أكثر من 500 موافقة ناجحة عبر المشاريع السكنية والتجارية والصناعية في دبي.",
      },
      {
        id: "support",
        icon: "Users",
        title: "دعم مخصص",
        description:
          "مديرو حسابات شخصيون يفهمون مشروعك ويقدمون تحديثات لحظية طوال العملية.",
      },
      {
        id: "end-to-end",
        icon: "BadgeCheck",
        title: "خدمة شاملة",
        description:
          "من إعداد المستندات إلى تسليم الموافقة النهائية — نتعامل مع كل شيء لتتفرغ أنت لمشروعك.",
      },
    ],
  },

  /* ── Sheet 07 · The People ───────────────────────────── */
  people: {
    heading: "الأشخاص الذين يبنون المنظومة",
    founders: [
      {
        id: "founder",
        name: "جمشيد خالد",
        role: "المؤسس والمالك",
        image: IMG.founder,
        rev: "REV A",
      },
      {
        id: "cofounder",
        name: "كافيا راماشاندران",
        role: "المؤسس المشارك",
        image: IMG.cofounder,
        rev: "REV A",
      },
    ],
    reviewedBy: "راجعها جمشيد خالد، المؤسس والمالك",
  },

  /* ── Sheet 08 · Credentials ──────────────────────────── */
  credentials: {
    heading: "اعتماداتنا",
    paragraphs: [
      "وسلين ليمينال لاستشارات الموافقات شركة استشارية مسجلة مقرها دبي، الإمارات العربية المتحدة. نعمل بما يتوافق تماماً مع لوائح التجارة الإماراتية ونحافظ على علاقات عمل نشطة مع جميع الجهات التنظيمية الرئيسية.",
    ],
    addressLabel: "العنوان المسجل:",
    licenseKey: "الرخصة:",
    licenseQualifier: "استشارات مهنية —",
    licenseLabel: "عرض الرخصة التجارية من دائرة التنمية الاقتصادية وتفاصيل التحقق",
    licenseHref: "/ar/license",
    disclaimer:
      "* تُتاح أرقام الرخص وتفاصيل التسجيل المحددة للعملاء الموثقين أثناء عملية بدء الخدمة.",
    stampLabel: "معتمد",
  },

  /* ── Sheet 09 · Closing CTA ──────────────────────────── */
  closing: {
    line: "مكالمة واحدة تمنحك المجموعة بأكملها — وليس خدمة واحدة فقط.",
    ctaPrimary: { label: "احصل على عرض سعر مجاني", href: "/ar/free-quote" },
    ctaWhatsapp: { label: "تواصل عبر واتساب", href: "https://wa.me/971567648220" },
    ctaPhone: { label: "اتصل +971 56 764 8220", href: "tel:+971567648220" },
    directoryTitle: "المجموعة",
    directory: [
      { id: "interior", label: "وسلين للديكور الداخلي والتشطيبات", href: "https://wasleen.com", external: true },
      { id: "approvals", label: "وسلين ليمينال لاستشارات الموافقات", href: "/ar/approvals" },
      { id: "pergolas", label: "وسلين للبرجولات وسينماكس سكاي", href: "https://pergolas.wasleen.com", external: true },
      { id: "digital", label: "وسلين للحلول الرقمية", href: "https://wasleen.com/wasleen-digital", external: true },
    ],
  },

  /* ── Sheet 10 · FAQ ──────────────────────────────────── */
  faq: {
    heading: "الأسئلة الشائعة عن وسلين",
    items: [
      {
        question: "ما هي وسلين ليمينال لاستشارات الموافقات؟",
        answer:
          "وسلين ليمينال لاستشارات الموافقات هي قسم الموافقات في مجموعة وسلين، مجموعة مقرها دبي تعمل في البناء والتشطيبات الداخلية والبرجولات والرقمية. ندير موافقات الحكومة والمناطق الحرة والمطورين — أكثر من 52 نوعاً — بما فيها بلدية دبي وديوا والدفاع المدني وهيئة دبي للتطوير.",
      },
      {
        question: "هل وسلين شركة استشارات موافقات مرخصة؟",
        answer:
          "نعم. تحمل وسلين ليمينال لاستشارات الموافقات رخصة تجارية نشطة من دائرة التنمية الاقتصادية (رقم 1188577) للاستشارات الهندسية والرسم الفني وتسهيل الموافقات في دبي، الإمارات. [عرض الرخصة](/ar/license).",
      },
      {
        question: "كيف تختلف وسلين عن غيرها من مستشاري الموافقات؟",
        answer:
          "نشأنا من أعمال التشطيبات الداخلية والبناء بخبرة أكثر من 273 مشروعاً. قدّمنا رسوماتنا الخاصة، وأدرنا مواقع البناء الخاصة بنا، وخضعنا للتفتيش وفق المعايير نفسها التي نساعدك على تحقيقها.",
      },
      {
        question: "هل تقدم مجموعة وسلين خدمات تتجاوز الموافقات؟",
        answer:
          "نعم. تضم المجموعة وسلين للديكور الداخلي والتشطيبات، ووسلين للبرجولات وسينماكس سكاي، ووسلين للحلول الرقمية — نقطة تواصل واحدة عبر الأقسام الأربعة.",
      },
    ],
  },

  /* ── Sheet 11 · Our Offices ──────────────────────────── */
  offices: {
    heading: "ثلاثة مواقع. مجموعة واحدة. لن تكون بعيداً عن مكتب يعرف الموافقات.",
    directionsLabel: "احصل على الاتجاهات",
    officeLocations: [
      {
        id: "approval",
        caption: "المكتب 01 · استشارات الموافقات",
        name: "Wasleen Liminal Approval Consultants",
        address: "Office 401, Darwish Building, Al Qusais, Dubai",
        embedSrc:
          "https://www.google.com/maps?q=Office%20401%2C%20Darwish%20Building%2C%20Al%20Qusais%2C%20Dubai&output=embed",
        directionsUrl: "https://share.google/XXAqVwLdUWyHJ3nG7",
      },
      {
        id: "pergola-parking",
        caption: "المكتب 02 · التصميم الداخلي والتجهيز",
        name: "Wasleen Technical Services — Interior & Fitout Solutions",
        address: "Dubai, United Arab Emirates",
        embedSrc:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.447891748681!2d55.299419775383804!3d25.255514377673393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f436925673a6f%3A0xdd525a8229093985!2sWasleen%20Technical%20Services%20%E2%80%93%20Pergola%20%26%20Car%20Parking%20Solutions%20in%20Dubai!5e0!3m2!1sen!2sae!4v1785229567827!5m2!1sen!2sae",
        directionsUrl:
          "https://www.google.com/maps/search/?api=1&query=Wasleen%20Technical%20Services%20Pergola%20%26%20Car%20Parking%20Solutions%20Dubai",
      },
      {
        id: "cinemaxsky",
        caption: "المكتب 03 · البرجولات وسينماكس سكاي",
        name: "Wasleen Pergolas & CinemaxSky",
        address: "Dubai, United Arab Emirates",
        embedSrc:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.1380597540597!2d55.38031657538407!3d25.265940777666803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa1176f7006181aff%3A0x734697b9bc64aefe!2sWasleen%20Pergolas%20%26%20CinemaxSky!5e0!3m2!1sen!2sae!4v1785229637998!5m2!1sen!2sae",
        directionsUrl:
          "https://www.google.com/maps/search/?api=1&query=Wasleen%20Pergolas%20%26%20CinemaxSky%20Dubai",
      },
    ],
  },
};

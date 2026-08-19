/**
 * Curated 404 recovery index — "Lost Night Sheet" (EN + AR).
 *
 * A small, self-contained index used by the 404 pages to help visitors
 * recover from a dead end. It deliberately does NOT import the full
 * 7,400-line approvals.ts: this keeps the error path lightweight and
 * resilient (the 404 must never fail to render because of a data-layer
 * problem). Slugs below mirror the REAL routes in:
 *   - src/data/approvals.ts  → /approvals/{slug}
 *   - src/data/services.ts   → /services/{slug}
 *   - src/data/guides.ts     → /guides/{slug}
 *
 * Arabic titles mirror src/data/approvals-ar.ts / services-ar.ts / guides-ar.ts.
 */

import type { ApprovalCategory } from "@/types";

/* ============================================================
   Types
   ============================================================ */

export type NotFoundLinkType = "approval" | "service" | "guide";

export interface NotFoundLink {
  /** Stable unique id (slug-based) */
  id: string;
  /** Content type — decides the URL prefix */
  type: NotFoundLinkType;
  /** English title (shown on EN 404, used in search) */
  title: string;
  /** Arabic title (shown on AR 404) */
  titleAr: string;
  /** English href */
  href: string;
  /** Arabic href */
  hrefAr: string;
  /** Approval category (approvals only) */
  category?: ApprovalCategory;
  /** English search keywords */
  keywords: string[];
  /** Arabic search keywords */
  keywordsAr: string[];
  /** Whether to surface in the "Popular approvals" section */
  popular?: boolean;
}

export interface NotFoundCategory {
  /** ApprovalCategory slug */
  value: ApprovalCategory;
  /** English label */
  label: string;
  /** Arabic label */
  labelAr: string;
  /** English hub href */
  href: string;
  /** Arabic hub href */
  hrefAr: string;
}

/* ============================================================
   Curated recovery index (~24 entries)
   ============================================================ */

export const NOTFOUND_LINKS: NotFoundLink[] = [
  // ---- Approvals: Government & Regulatory -------------------
  {
    id: "dubai-municipality-building-permit",
    type: "approval",
    title: "Dubai Municipality Building Permit",
    titleAr: "تصريح بناء بلدية دبي",
    href: "/approvals/dubai-municipality-building-permit",
    hrefAr: "/ar/approvals/dubai-municipality-building-permit",
    category: "government-regulatory",
    keywords: ["building permit", "dm", "construction", "dubai municipality", "permit"],
    keywordsAr: ["تصريح بناء", "بلدية دبي", "إنشاء", "رخصة بناء"],
    popular: true,
  },
  {
    id: "dubai-civil-defense-approval",
    type: "approval",
    title: "Dubai Civil Defense Approval",
    titleAr: "موافقة الدفاع المدني بدبي",
    href: "/approvals/dubai-civil-defense-approval",
    hrefAr: "/ar/approvals/dubai-civil-defense-approval",
    category: "government-regulatory",
    keywords: ["civil defense", "dcd", "fire safety", "noc"],
    keywordsAr: ["الدفاع المدني", "السلامة من الحرائق", "شهادة عدم ممانعة"],
    popular: true,
  },
  {
    id: "rta-approval",
    type: "approval",
    title: "RTA Approval",
    titleAr: "موافقة هيئة الطرق والمواصلات",
    href: "/approvals/rta-approval",
    hrefAr: "/ar/approvals/rta-approval",
    category: "government-regulatory",
    keywords: ["rta", "roads", "traffic", "roads and transport"],
    keywordsAr: ["هيئة الطرق والمواصلات", "طرق", "مرور", "أر تي إيه"],
  },
  {
    id: "ded-approval",
    type: "approval",
    title: "DED Approval",
    titleAr: "موافقة دائرة الاقتصاد والسياحة بدبي (الموافقة الاقتصادية)",
    href: "/approvals/ded-approval",
    hrefAr: "/ar/approvals/ded-approval",
    category: "government-regulatory",
    keywords: ["ded", "economy", "economic approval", "trade license"],
    keywordsAr: ["دائرة الاقتصاد", "موافقة اقتصادية", "رخصة تجارية"],
  },
  {
    id: "dda-approval",
    type: "approval",
    title: "DDA Approval",
    titleAr: "موافقة هيئة دبي التنموية (DDA)",
    href: "/approvals/dda-approval",
    hrefAr: "/ar/approvals/dda-approval",
    category: "government-regulatory",
    keywords: ["dda", "dubai development authority", "project approval"],
    keywordsAr: ["هيئة دبي التنموية", "دي دي إيه", "موافقة مشروع"],
    popular: true,
  },

  // ---- Approvals: Free Zone ---------------------------------
  {
    id: "dubai-silicon-oasis-approval",
    type: "approval",
    title: "Dubai Silicon Oasis Approval",
    titleAr: "موافقة واحة دبي للسيليكون",
    href: "/approvals/dubai-silicon-oasis-approval",
    hrefAr: "/ar/approvals/dubai-silicon-oasis-approval",
    category: "free-zone",
    keywords: ["dso", "silicon oasis", "free zone", "dso approval"],
    keywordsAr: ["واحة دبي للسيليكون", "دي إس أو", "منطقة حرة"],
    popular: true,
  },
  {
    id: "dmcc-approval",
    type: "approval",
    title: "DMCC Approval",
    titleAr: "موافقة مركز دبي للسلع المتعددة (DMCC)",
    href: "/approvals/dmcc-approval",
    hrefAr: "/ar/approvals/dmcc-approval",
    category: "free-zone",
    keywords: ["dmcc", "commodities", "jlt", "free zone"],
    keywordsAr: ["مركز دبي للسلع المتعددة", "دي إم سي سي", "جميرا ليك تاورز"],
  },

  // ---- Approvals: Developer & Community ---------------------
  {
    id: "emaar-community-approval",
    type: "approval",
    title: "Emaar Community Approval",
    titleAr: "موافقة إعمار المجتمعية",
    href: "/approvals/emaar-community-approval",
    hrefAr: "/ar/approvals/emaar-community-approval",
    category: "developer-community",
    keywords: ["emaar", "community", "developer", "downtown", "noc"],
    keywordsAr: ["إعمار", "مجتمع", "مطور", "وسط المدينة"],
    popular: true,
  },
  {
    id: "nakheel-developer-approval",
    type: "approval",
    title: "Nakheel Developer Approval",
    titleAr: "موافقة نخيل المطور العقاري",
    href: "/approvals/nakheel-developer-approval",
    hrefAr: "/ar/approvals/nakheel-developer-approval",
    category: "developer-community",
    keywords: ["nakheel", "developer", "palm", "community approval"],
    keywordsAr: ["نخيل", "مطور", "نخلة جميرا"],
  },

  // ---- Approvals: Property & Registration -------------------
  {
    id: "dubai-land-department-registration",
    type: "approval",
    title: "Dubai Land Department Registration",
    titleAr: "تسجيل دائرة الأراضي والأملاك بدبي",
    href: "/approvals/dubai-land-department-registration",
    hrefAr: "/ar/approvals/dubai-land-department-registration",
    category: "property-registration",
    keywords: ["land department", "dld", "registration", "property"],
    keywordsAr: ["دائرة الأراضي والأملاك", "تسجيل", "عقار"],
  },
  {
    id: "ejari-registration",
    type: "approval",
    title: "Ejari Registration",
    titleAr: "تسجيل الإيجار (إجاري)",
    href: "/approvals/ejari-registration",
    hrefAr: "/ar/approvals/ejari-registration",
    category: "property-registration",
    keywords: ["ejari", "tenancy", "rental", "registration"],
    keywordsAr: ["إجاري", "عقد إيجار", "تسجيل إيجار"],
    popular: true,
  },
  {
    id: "rera-permit",
    type: "approval",
    title: "RERA Permit",
    titleAr: "تصريح مؤسسة دبي العقارية (RERA)",
    href: "/approvals/rera-permit",
    hrefAr: "/ar/approvals/rera-permit",
    category: "property-registration",
    keywords: ["rera", "real estate", "permit", "off-plan"],
    keywordsAr: ["مؤسسة دبي العقارية", "ريرا", "تصريح", "عقارات"],
  },

  // ---- Approvals: Technical & Utility -----------------------
  {
    id: "dewa-approval",
    type: "approval",
    title: "DEWA Approval",
    titleAr: "موافقة هيئة كهرباء ومياه دبي (ديوا)",
    href: "/approvals/dewa-approval",
    hrefAr: "/ar/approvals/dewa-approval",
    category: "technical-utility",
    keywords: ["dewa", "electricity", "water", "power", "connection"],
    keywordsAr: ["ديوا", "كهرباء", "مياه", "طاقة", "توصيل"],
    popular: true,
  },
  {
    id: "dewa-connection-noc",
    type: "approval",
    title: "DEWA Connection NOC",
    titleAr: "شهادة عدم الممانعة من هيئة كهرباء ومياه دبي (ديوا) للتوصيل",
    href: "/approvals/dewa-connection-noc",
    hrefAr: "/ar/approvals/dewa-connection-noc",
    category: "technical-utility",
    keywords: ["dewa connection", "noc", "electricity connection"],
    keywordsAr: ["توصيل ديوا", "شهادة عدم ممانعة", "توصيل كهرباء"],
  },

  // ---- Approvals: Trade, Food & Hospitality -----------------
  {
    id: "food-control-department-approval",
    type: "approval",
    title: "Food Control Department Approval",
    titleAr: "موافقة إدارة الرقابة الغذائية (بلدية دبي)",
    href: "/approvals/food-control-department-approval",
    hrefAr: "/ar/approvals/food-control-department-approval",
    category: "trade-food-hospitality",
    keywords: ["food control", "restaurant", "food safety", "municipality"],
    keywordsAr: ["الرقابة الغذائية", "مطعم", "سلامة الغذاء"],
    popular: true,
  },
  {
    id: "dtcm-tourism-approval",
    type: "approval",
    title: "DTCM Tourism Approval",
    titleAr: "موافقة دائرة الاقتصاد والسياحة بدبي (سياحة دبي)",
    href: "/approvals/dtcm-tourism-approval",
    hrefAr: "/ar/approvals/dtcm-tourism-approval",
    category: "trade-food-hospitality",
    keywords: ["dtcm", "tourism", "hotel", "hospitality", "dubai tourism"],
    keywordsAr: ["سياحة دبي", "فندق", "ضيافة", "دائرة السياحة"],
  },

  // ---- Approvals: Fit-Out & Construction --------------------
  {
    id: "interior-fit-out-approval",
    type: "approval",
    title: "Interior Fit-Out Approval",
    titleAr: "موافقة التشطيب الداخلي (دبي)",
    href: "/approvals/interior-fit-out-approval",
    hrefAr: "/ar/approvals/interior-fit-out-approval",
    category: "fit-out-construction",
    keywords: ["fit out", "interior", "fitout", "office", "retail"],
    keywordsAr: ["تشطيب داخلي", "ديكور", "مكتب", "متجر"],
    popular: true,
  },
  {
    id: "mezzanine-floor-approval",
    type: "approval",
    title: "Mezzanine Floor Approval",
    titleAr: "موافقة تركيب طابق ميزانين في دبي",
    href: "/approvals/mezzanine-floor-approval",
    hrefAr: "/ar/approvals/mezzanine-floor-approval",
    category: "fit-out-construction",
    keywords: ["mezzanine", "floor", "mezzanine floor", "structure"],
    keywordsAr: ["ميزانين", "طابق ميزانين", "هيكل"],
  },

  // ---- Approvals: Drawing & Documentation -------------------
  {
    id: "2d-drawing-submission",
    type: "approval",
    title: "2D Drawing Submission",
    titleAr: "تقديم المخططات ثنائية الأبعاد (بلدية دبي)",
    href: "/approvals/2d-drawing-submission",
    hrefAr: "/ar/approvals/2d-drawing-submission",
    category: "drawing-documentation",
    keywords: ["2d drawings", "submission", "cad", "drawing approval"],
    keywordsAr: ["مخططات ثنائية الأبعاد", "تقديم", "كاد"],
  },

  // ---- Services ---------------------------------------------
  {
    id: "2d-drawings",
    type: "service",
    title: "2D Drawings",
    titleAr: "الرسومات ثنائية الأبعاد",
    href: "/services/2d-drawings",
    hrefAr: "/ar/services/2d-drawings",
    keywords: ["2d drawings", "floor plan", "drafting", "drawing service"],
    keywordsAr: ["رسومات ثنائية الأبعاد", "مخطط طابق", "رسم هندسي"],
  },
  {
    id: "3d-design-visualization",
    type: "service",
    title: "3D Design & Visualization",
    titleAr: "التصميم ثلاثي الأبعاد والتصور البصري",
    href: "/services/3d-design-visualization",
    hrefAr: "/ar/services/3d-design-visualization",
    keywords: ["3d design", "visualization", "rendering", "3d model"],
    keywordsAr: ["تصميم ثلاثي الأبعاد", "تصور بصري", "رندر"],
  },
  {
    id: "cad-documentation",
    type: "service",
    title: "CAD Documentation",
    titleAr: "توثيق رسومات CAD",
    href: "/services/cad-documentation",
    hrefAr: "/ar/services/cad-documentation",
    keywords: ["cad", "documentation", "as built", "drafting"],
    keywordsAr: ["كاد", "توثيق", "رسومات تنفيذية"],
  },

  // ---- Guides -----------------------------------------------
  {
    id: "how-long-does-dm-building-permit-take",
    type: "guide",
    title: "How Long Does a DM Building Permit Take?",
    titleAr: "كم تستغرق رخصة البناء من بلدية دبي؟",
    href: "/guides/how-long-does-dm-building-permit-take",
    hrefAr: "/ar/guides/how-long-does-dm-building-permit-take",
    keywords: ["how long", "building permit", "timeline", "dm permit"],
    keywordsAr: ["كم تستغرق", "رخصة البناء", "المدة الزمنية"],
  },
  {
    id: "dewa-connection-process-guide",
    type: "guide",
    title: "DEWA Connection Process Guide",
    titleAr: "عملية توصيل هيئة كهرباء ومياه دبي (ديوا): دليل شامل خطوة بخطوة 2026",
    href: "/guides/dewa-connection-process-guide",
    hrefAr: "/ar/guides/dewa-connection-process-guide",
    keywords: ["dewa", "connection", "process", "guide", "step by step"],
    keywordsAr: ["توصيل ديوا", "دليل", "خطوة بخطوة"],
  },
];

/* ============================================================
   Popular subset (surfaced in the "Popular approvals" section)
   ============================================================ */

export const NOTFOUND_POPULAR: NotFoundLink[] = NOTFOUND_LINKS.filter(
  (link) => link.popular === true,
);

/* ============================================================
   Category chips — mirror AR.categories in src/lib/constants.ts
   ============================================================ */

export const NOTFOUND_CATEGORIES: NotFoundCategory[] = [
  {
    value: "government-regulatory",
    label: "Government & Regulatory",
    labelAr: "الحكومية والتنظيمية",
    href: "/approvals",
    hrefAr: "/ar/approvals",
  },
  {
    value: "free-zone",
    label: "Free Zone Approvals",
    labelAr: "المناطق الحرة",
    href: "/approvals",
    hrefAr: "/ar/approvals",
  },
  {
    value: "developer-community",
    label: "Developer & Community",
    labelAr: "المطورين والمجتمعات",
    href: "/approvals",
    hrefAr: "/ar/approvals",
  },
  {
    value: "property-registration",
    label: "Property & Registration",
    labelAr: "العقارات والتسجيل",
    href: "/approvals",
    hrefAr: "/ar/approvals",
  },
  {
    value: "technical-utility",
    label: "Technical & Utility",
    labelAr: "الفنية والمرافق",
    href: "/approvals",
    hrefAr: "/ar/approvals",
  },
  {
    value: "trade-food-hospitality",
    label: "Trade, Food & Hospitality",
    labelAr: "التجارة والأغذية والضيافة",
    href: "/approvals",
    hrefAr: "/ar/approvals",
  },
  {
    value: "fit-out-construction",
    label: "Fit-Out & Construction",
    labelAr: "التشطيبات والبناء",
    href: "/approvals",
    hrefAr: "/ar/approvals",
  },
  {
    value: "drawing-documentation",
    label: "Drawing & Documentation",
    labelAr: "الرسومات والوثائق",
    href: "/approvals",
    hrefAr: "/ar/approvals",
  },
];

/**
 * Image Registry — every `public/images/*.webp` mapped to SEO metadata.
 *
 * This is the single source of truth for image selection, alt text and
 * captions used by the pSEO engine and page templates.
 *
 * - `status: "available"`  → the file exists in `public/images/` (safe to render).
 * - `status: "planned"`    → filename reserved (Section 6 of the pSEO plan) but
 *   the file has NOT been created yet. Planned images are excluded from
 *   auto-matching until you drop the `.webp` into `public/images/` and flip
 *   the flag to `"available"`.
 *
 * Naming convention for all future images:
 *   {subject}-{context}-{location}.webp  (lowercase, hyphenated, keyword-descriptive)
 *
 * @see plans/pseo-domination-engine-plan.md §6
 */
import type { ImageAsset } from "@/types";

export const IMAGES: ImageAsset[] = [
  /* ============================================================
     EXISTING IMAGES (in public/images/ — available now)
     ============================================================ */
  {
    filename: "2d-drawings-for-dcd-approvals-in-dubai.webp",
    src: "/images/2d-drawings-for-dcd-approvals-in-dubai.webp",
    alt: "2D drawings prepared for DCD approval in Dubai",
    caption: "2D drawings for Dubai Civil Defense approval",
    topicTags: ["drawing", "dcd", "2d", "documentation", "dubai"],
    width: 2336,
    height: 1760,
    status: "available",
    ar: {
      alt: "مخططات ثنائية الأبعاد مُعدّة لاعتماد الدفاع المدني في دبي",
      caption: "مخططات ثنائية الأبعاد لاعتماد الدفاع المدني في دبي",
    },
  },
  {
    filename: "1773525851355.webp",
    src: "/images/1773525851355.webp",
    alt: "Wasleen approval consultants reviewing permit documents in a Dubai office",
    caption: "Approval consultants in Dubai",
    topicTags: ["general", "consultation", "office", "dubai"],
    width: 1312,
    height: 768,
    status: "available",
    ar: {
      alt: "مستشارو اعتمادات في دبي يراجعون مستندات التصاريح في مكتب",
      caption: "مستشارو اعتمادات في دبي",
    },
  },
  {
    filename: "1773527415014.webp",
    src: "/images/1773527415014.webp",
    alt: "Approval consultant meeting with a client about Dubai permit requirements",
    caption: "Permit consultation in Dubai",
    topicTags: ["general", "consultation", "meeting", "dubai"],
    width: 1408,
    height: 768,
    status: "available",
    ar: {
      alt: "لقاء مستشار اعتمادات مع عميل حول متطلبات التصاريح في دبي",
      caption: "استشارة تصاريح في دبي",
    },
  },
  {
    filename: "1773527788836.webp",
    src: "/images/1773527788836.webp",
    alt: "Dubai building and skyline representing the approvals consultancy market",
    caption: "Approvals consultancy in Dubai",
    topicTags: ["general", "dubai", "skyline"],
    width: 1408,
    height: 768,
    status: "available",
    ar: {
      alt: "أبراج دبي وسكاي لاين تمثل سوق استشارات الاعتمادات",
      caption: "استشارات الاعتمادات في دبي",
    },
  },
  {
    filename: "1773529249805.webp",
    src: "/images/1773529249805.webp",
    alt: "Consultant explaining the approval process for a project in Dubai",
    caption: "Approval process consultation in Dubai",
    topicTags: ["general", "consultation", "process", "dubai"],
    width: 1306,
    height: 768,
    status: "available",
    ar: {
      alt: "مستشار يشرح عملية الاعتمادات لمشروع في دبي",
      caption: "استشارة عملية الاعتمادات في دبي",
    },
  },
  {
    filename: "commercial-interior-fit-out-approval-service-dubai.webp",
    src: "/images/commercial-interior-fit-out-approval-service-dubai.webp",
    alt: "Commercial interior fit-out approval service in Dubai for office fit-outs",
    caption: "Commercial fit-out approvals in Dubai",
    topicTags: ["fitout", "commercial", "office", "dubai", "dm"],
    width: 1200,
    height: 1200,
    status: "available",
    ar: {
      alt: "خدمة اعتماد التشطيبات الداخلية التجارية في دبي للمكاتب",
      caption: "اعتمادات التشطيبات التجارية في دبي",
    },
  },
  {
    filename: "DCD-approval-consultants-in-dubai (1).webp",
    src: "/images/DCD-approval-consultants-in-dubai (1).webp",
    alt: "Dubai Civil Defense approval consultants reviewing fire safety compliance in Dubai",
    caption: "Dubai Civil Defense approval consultants",
    topicTags: ["dcd", "fire", "safety", "consultants", "dubai"],
    width: 1920,
    height: 1080,
    status: "available",
    ar: {
      alt: "مستشارو اعتمادات الدفاع المدني في دبي يراجعون الامتثال للسلامة من الحرائق",
      caption: "مستشارو اعتمادات الدفاع المدني في دبي",
    },
  },
  {
    filename: "dcd-approval-consultants-in-dubai.webp",
    src: "/images/dcd-approval-consultants-in-dubai.webp",
    alt: "DCD approval consultants in Dubai preparing civil defense NOC documents",
    caption: "DCD approval consultants in Dubai",
    topicTags: ["dcd", "noc", "fire", "safety", "consultants", "dubai"],
    width: 2336,
    height: 1760,
    status: "available",
    ar: {
      alt: "مستشارو اعتمادات الدفاع المدني في دبي يجهّزون مستندات موافقة الدفاع المدني",
      caption: "مستشارو اعتمادات الدفاع المدني في دبي",
    },
  },
  {
    filename: "fire-and-safety-approvals-in-dubai-dcd-consultants.webp",
    src: "/images/fire-and-safety-approvals-in-dubai-dcd-consultants.webp",
    alt: "Fire and safety approvals in Dubai with DCD consultants for commercial buildings",
    caption: "Fire and safety approvals in Dubai",
    topicTags: ["dcd", "fire", "safety", "consultants", "dubai"],
    width: 2336,
    height: 1760,
    status: "available",
    ar: {
      alt: "اعتمادات السلامة من الحرائق في دبي مع مستشاري الدفاع المدني",
      caption: "اعتمادات السلامة من الحرائق في دبي",
    },
  },
  {
    filename: "industrial-approval-services-in-dubai.webp",
    src: "/images/industrial-approval-services-in-dubai.webp",
    alt: "Industrial approval services in Dubai for warehouse and factory projects",
    caption: "Industrial approval services in Dubai",
    topicTags: ["industrial", "warehouse", "factory", "dubai"],
    width: 1920,
    height: 1080,
    status: "available",
    ar: {
      alt: "خدمات الاعتمادات الصناعية في دبي لمشاريع المستودعات والمصانع",
      caption: "خدمات الاعتمادات الصناعية في دبي",
    },
  },
  {
    filename: "interior-approvals-dubai-muncipality-consultants.webp",
    src: "/images/interior-approvals-dubai-muncipality-consultants.webp",
    alt: "Interior approvals with Dubai Municipality consultants for fit-out projects",
    caption: "Dubai Municipality interior approvals",
    topicTags: ["dm", "interior", "fitout", "consultants", "dubai"],
    width: 2336,
    height: 1760,
    status: "available",
    ar: {
      alt: "اعتمادات التشطيبات الداخلية مع مستشاري بلدية دبي",
      caption: "اعتمادات التشطيبات الداخلية من بلدية دبي",
    },
  },
  {
    filename: "interior-fit-out-approval-consultants-in-dubai.webp",
    src: "/images/interior-fit-out-approval-consultants-in-dubai.webp",
    alt: "Interior fit-out approval consultants in Dubai for commercial and residential projects",
    caption: "Interior fit-out approval consultants in Dubai",
    topicTags: ["fitout", "interior", "dm", "dda", "consultants", "dubai"],
    width: 2336,
    height: 1760,
    status: "available",
    ar: {
      alt: "مستشارو اعتمادات التشطيبات الداخلية في دبي للمشاريع التجارية والسكنية",
      caption: "مستشارو اعتمادات التشطيبات الداخلية في دبي",
    },
  },
  {
    filename: "interior-fit-out-approval-service-dubai.webp",
    src: "/images/interior-fit-out-approval-service-dubai.webp",
    alt: "Interior fit-out approval service in Dubai covering drawings and permits",
    caption: "Interior fit-out approval service in Dubai",
    topicTags: ["fitout", "interior", "office", "service", "dubai"],
    width: 1200,
    height: 1200,
    status: "available",
    ar: {
      alt: "خدمة اعتماد التشطيبات الداخلية في دبي تشمل المخططات والتصاريح",
      caption: "خدمة اعتماد التشطيبات الداخلية في دبي",
    },
  },
  {
    filename: "MEP-approvals-in-dubai.webp",
    src: "/images/MEP-approvals-in-dubai.webp",
    alt: "MEP approvals in Dubai for electrical, mechanical and plumbing works",
    caption: "MEP approvals in Dubai",
    topicTags: ["mep", "electrical", "mechanical", "plumbing", "dubai"],
    width: 1920,
    height: 1080,
    status: "available",
    ar: {
      alt: "اعتمادات الأعمال الكهربائية والميكانيكية والسباكة في دبي",
      caption: "اعتمادات الأعمال الكهروميكانيكية في دبي",
    },
  },
  {
    filename: "mezzanine-floor-approval-consultants-in-dubai.webp",
    src: "/images/mezzanine-floor-approval-consultants-in-dubai.webp",
    alt: "Mezzanine floor approval consultants in Dubai for structural additions",
    caption: "Mezzanine floor approvals in Dubai",
    topicTags: ["structural", "mezzanine", "dm", "consultants", "dubai"],
    width: 2336,
    height: 1760,
    status: "available",
    ar: {
      alt: "مستشارو اعتمادات الطوابق النصفية في دبي للإضافات الإنشائية",
      caption: "اعتمادات الطوابق النصفية في دبي",
    },
  },
  {
    filename: "Structural-approvals-services-from-dubai-muncipality.webp",
    src: "/images/Structural-approvals-services-from-dubai-muncipality.webp",
    alt: "Structural approvals services from Dubai Municipality for building projects",
    caption: "Structural approvals from Dubai Municipality",
    topicTags: ["structural", "dm", "engineering", "service", "dubai"],
    width: 2336,
    height: 1760,
    status: "available",
    ar: {
      alt: "خدمات الاعتمادات الإنشائية من بلدية دبي لمشاريع البناء",
      caption: "الاعتمادات الإنشائية من بلدية دبي",
    },
  },
  {
    filename: "Warehouse Interior-fit-out-approval-from-dubai-muncilapity.webp",
    src: "/images/Warehouse Interior-fit-out-approval-from-dubai-muncilapity.webp",
    alt: "Warehouse interior fit-out approval from Dubai Municipality for industrial units",
    caption: "Warehouse fit-out approvals in Dubai",
    topicTags: ["warehouse", "industrial", "fitout", "dm", "dubai"],
    width: 2336,
    height: 1760,
    status: "available",
    ar: {
      alt: "اعتماد التشطيبات الداخلية للمستودعات من بلدية دبي",
      caption: "اعتمادات تشطيبات المستودعات في دبي",
    },
  },

  /* ============================================================
     PLANNED IMAGES (20 new filenames — create in public/images/)
     Flip `status` to "available" once the .webp file is added.
     ============================================================ */
  {
    filename: "dubai-approval-consultants-consultation.webp",
    src: "/images/dubai-approval-consultants-consultation.webp",
    alt: "Wasleen approval consultant explaining Dubai permit requirements to a client",
    caption: "Approval consultants in Dubai reviewing permit requirements",
    topicTags: ["general", "consultation", "dubai"],
    status: "available",
    ar: {
      alt: "مستشار اعتمادات في دبي يشرح متطلبات التصاريح للعميل",
      caption: "مستشارو اعتمادات في دبي يراجعون متطلبات التصاريح",
    },
  },
  {
    filename: "dm-building-permit-dubai-municipality.webp",
    src: "/images/dm-building-permit-dubai-municipality.webp",
    alt: "Dubai Municipality building permit approval documents for a construction project",
    caption: "DM building permit approval process in Dubai",
    topicTags: ["dm", "building-permit", "construction", "dubai"],
    status: "available",
    ar: {
      alt: "مستندات رخصة البناء من بلدية دبي لمشروع إنشائي",
      caption: "عملية رخصة البناء من بلدية دبي",
    },
  },
  {
    filename: "dcd-fire-safety-noc-dubai-civil-defense.webp",
    src: "/images/dcd-fire-safety-noc-dubai-civil-defense.webp",
    alt: "Dubai Civil Defense fire safety NOC approval documents for a commercial fit-out",
    caption: "DCD fire safety NOC for fit-out approvals",
    topicTags: ["dcd", "fire", "safety", "noc", "fitout", "dubai"],
    status: "available",
    ar: {
      alt: "مستندات موافقة الدفاع المدني في دبي للسلامة من الحرائق للتشطيبات التجارية",
      caption: "موافقة الدفاع المدني للسلامة من الحرائق",
    },
  },
  {
    filename: "dewa-electricity-connection-approval.webp",
    src: "/images/dewa-electricity-connection-approval.webp",
    alt: "DEWA electricity connection approval process for a new property in Dubai",
    caption: "DEWA approval and connection timeline in Dubai",
    topicTags: ["dewa", "electricity", "utility", "connection", "dubai"],
    status: "available",
    ar: {
      alt: "عملية اعتماد توصيل الكهرباء من هيئة كهرباء ومياه دبي لمبنى جديد",
      caption: "اعتماد ديوا وتوصيل الكهرباء في دبي",
    },
  },
  {
    filename: "dda-fit-out-approval-engineering.webp",
    src: "/images/dda-fit-out-approval-engineering.webp",
    alt: "DDA fit-out approval engineering drawings for an office fit-out in Dubai",
    caption: "DDA fit-out approval requirements in Dubai",
    topicTags: ["dda", "fitout", "engineering", "drawing", "dubai"],
    status: "available",
    ar: {
      alt: "مخططات هندسية لاعتماد التشطيبات من سلطة دبي للتنمية",
      caption: "متطلبات اعتماد التشطيبات من سلطة دبي للتنمية",
    },
  },
  {
    filename: "trade-license-approval-dubai-business-activity.webp",
    src: "/images/trade-license-approval-dubai-business-activity.webp",
    alt: "Trade license approval documents for a new business activity in Dubai",
    caption: "Trade license approval by business activity in Dubai",
    topicTags: ["trade", "license", "business", "dubai"],
    status: "available",
    ar: {
      alt: "مستندات ترخيص تجاري لنشاط تجاري جديد في دبي",
      caption: "اعتماد الترخيص التجاري حسب النشاط في دبي",
    },
  },
  {
    filename: "restaurant-food-business-approval-dubai.webp",
    src: "/images/restaurant-food-business-approval-dubai.webp",
    alt: "Restaurant food business approval checklist for DM Food Control in Dubai",
    caption: "Restaurant and food business approvals in Dubai",
    topicTags: ["restaurant", "food", "hospitality", "dm", "dubai"],
    status: "available",
    ar: {
      alt: "قائمة متطلبات اعتماد المطاعم والأغذية من بلدية دبي",
      caption: "اعتمادات المطاعم والأغذية في دبي",
    },
  },
  {
    filename: "approval-cost-fees-budget-dubai.webp",
    src: "/images/approval-cost-fees-budget-dubai.webp",
    alt: "Approval cost and fee breakdown for construction permits in Dubai",
    caption: "How much approvals cost in Dubai",
    topicTags: ["cost", "fees", "budget", "dubai"],
    status: "available",
    ar: {
      alt: "تفصيل تكاليف ورسوم الاعتمادات في دبي",
      caption: "كم تبلغ تكلفة الاعتمادات في دبي",
    },
  },
  {
    filename: "mainland-vs-free-zone-approval-dubai.webp",
    src: "/images/mainland-vs-free-zone-approval-dubai.webp",
    alt: "Mainland vs free zone company approval process comparison in Dubai",
    caption: "Mainland vs free zone approval in Dubai",
    topicTags: ["compare", "mainland", "freezone", "dubai"],
    status: "available",
    ar: {
      alt: "مقارنة عملية الاعتمادات بين الشركات المحلية والمناطق الحرة في دبي",
      caption: "المقارنة بين الشركات المحلية والمناطق الحرة في دبي",
    },
  },
  {
    filename: "approval-rejection-reasons-dubai.webp",
    src: "/images/approval-rejection-reasons-dubai.webp",
    alt: "Common reasons approval applications get rejected by Dubai authorities",
    caption: "Why approvals get rejected in Dubai",
    topicTags: ["rejection", "troubleshooting", "dubai"],
    status: "available",
    ar: {
      alt: "أسباب رفض طلبات الاعتمادات من الجهات في دبي",
      caption: "لماذا تُرفض الاعتمادات في دبي",
    },
  },
  {
    filename: "ejari-tenancy-registration-dubai.webp",
    src: "/images/ejari-tenancy-registration-dubai.webp",
    alt: "Ejari tenancy registration certificate for a rental property in Dubai",
    caption: "Ejari registration process in Dubai",
    topicTags: ["ejari", "tenancy", "rera", "dubai"],
    status: "available",
    ar: {
      alt: "شهادة تسجيل الإيجار (إجاري) لعقار مستأجر في دبي",
      caption: "عملية تسجيل الإيجار في دبي",
    },
  },
  {
    filename: "blueprint-drawing-submission-approval-dubai.webp",
    src: "/images/blueprint-drawing-submission-approval-dubai.webp",
    alt: "Blueprint drawing submission for building approval in Dubai",
    caption: "Drawing submission for approval in Dubai",
    topicTags: ["drawing", "blueprint", "submission", "documentation", "dubai"],
    status: "available",
    ar: {
      alt: "تقديم المخططات الهندسية لاعتماد البناء في دبي",
      caption: "تقديم المخططات للاعتماد في دبي",
    },
  },
  {
    filename: "commercial-office-fit-out-approval-dubai.webp",
    src: "/images/commercial-office-fit-out-approval-dubai.webp",
    alt: "Commercial office fit-out approval process in Dubai",
    caption: "Office fit-out approvals in Dubai",
    topicTags: ["fitout", "office", "commercial", "dubai"],
    status: "available",
    ar: {
      alt: "عملية اعتماد تشطيبات المكاتب التجارية في دبي",
      caption: "اعتمادات تشطيبات المكاتب في دبي",
    },
  },
  {
    filename: "warehouse-industrial-approval-dubai.webp",
    src: "/images/warehouse-industrial-approval-dubai.webp",
    alt: "Warehouse industrial approval process with Dubai Municipality",
    caption: "Warehouse and industrial approvals in Dubai",
    topicTags: ["warehouse", "industrial", "dm", "dubai"],
    status: "available",
    ar: {
      alt: "عملية اعتماد المستودعات الصناعية مع بلدية دبي",
      caption: "اعتمادات المستودعات والمنشآت الصناعية في دبي",
    },
  },
  {
    filename: "mep-electrical-mechanical-approval-dubai.webp",
    src: "/images/mep-electrical-mechanical-approval-dubai.webp",
    alt: "MEP electrical and mechanical approval drawings for a building in Dubai",
    caption: "MEP approvals in Dubai",
    topicTags: ["mep", "electrical", "mechanical", "dubai"],
    status: "available",
    ar: {
      alt: "مخططات اعتماد الأعمال الكهربائية والميكانيكية لمبنى في دبي",
      caption: "اعتمادات الأعمال الكهروميكانيكية في دبي",
    },
  },
  {
    filename: "signage-advertising-approval-dubai.webp",
    src: "/images/signage-advertising-approval-dubai.webp",
    alt: "Signage and advertising approval process with Dubai Municipality",
    caption: "Signage approvals in Dubai",
    topicTags: ["signage", "advertising", "dm", "dubai"],
    status: "available",
    ar: {
      alt: "عملية اعتماد اللوحات الإعلانية مع بلدية دبي",
      caption: "اعتمادات اللوحات الإعلانية في دبي",
    },
  },
  {
    filename: "structural-approval-engineering-dubai.webp",
    src: "/images/structural-approval-engineering-dubai.webp",
    alt: "Structural engineering approval for a building project in Dubai",
    caption: "Structural approvals in Dubai",
    topicTags: ["structural", "engineering", "dm", "dubai"],
    status: "available",
    ar: {
      alt: "اعتماد الهندسة الإنشائية لمشروع بناء في دبي",
      caption: "الاعتمادات الإنشائية في دبي",
    },
  },
  {
    filename: "villa-renovation-approval-dubai.webp",
    src: "/images/villa-renovation-approval-dubai.webp",
    alt: "Villa renovation approval process for a residential property in Dubai",
    caption: "Villa renovation approvals in Dubai",
    topicTags: ["villa", "residential", "renovation", "dm", "dubai"],
    status: "available",
    ar: {
      alt: "عملية اعتماد تجديد الفلل السكنية في دبي",
      caption: "اعتمادات تجديد الفلل في دبي",
    },
  },
  {
    filename: "free-zone-community-noc-approval-dubai.webp",
    src: "/images/free-zone-community-noc-approval-dubai.webp",
    alt: "Free zone community NOC approval for a fit-out in a Dubai free zone",
    caption: "Free zone NOC approvals in Dubai",
    topicTags: ["freezone", "community", "noc", "fitout", "dubai"],
    status: "available",
    ar: {
      alt: "موافقة المجتمعات في المناطق الحرة لتشطيبات في دبي",
      caption: "موافقات المناطق الحرة في دبي",
    },
  },
  {
    filename: "project-completion-handover-approval-dubai.webp",
    src: "/images/project-completion-handover-approval-dubai.webp",
    alt: "Project completion and handover approval from Dubai Municipality",
    caption: "Completion certificate and handover in Dubai",
    topicTags: ["completion", "handover", "dm", "dubai"],
    status: "available",
    ar: {
      alt: "اعتماد إنجاز المشروع والتسليم من بلدية دبي",
      caption: "شهادة الإنجاز والتسليم في دبي",
    },
  },
];

/* ============================================================
   Lookup helpers
   ============================================================ */

/** Look up a single image by exact filename (e.g. "dewa-electricity-connection-approval.webp"). */
export function getImageByFilename(filename: string): ImageAsset | undefined {
  return IMAGES.find((img) => img.filename === filename);
}

/** Look up a single image by public src path (e.g. "/images/dewa-...webp"). */
export function getImageBySrc(src: string): ImageAsset | undefined {
  return IMAGES.find((img) => img.src === src);
}

/** Only images that physically exist in public/images/ (safe to render). */
export function getAvailableImages(): ImageAsset[] {
  return IMAGES.filter((img) => img.status === "available");
}

/** All reserved filenames that still need to be created in public/images/. */
export function getPlannedImages(): ImageAsset[] {
  return IMAGES.filter((img) => img.status === "planned");
}

/**
 * Pick the best available image for a set of topic tags.
 * Exact-tag matches are preferred, then any available fallback (never planned).
 */
export function matchImageByTopic(topics: string[]): ImageAsset | undefined {
  const available = getAvailableImages();
  const normalized = topics.map((t) => t.toLowerCase());

  // 1) Prefer an image whose topicTags overlap the requested topics.
  for (const img of available) {
    if (img.topicTags.some((t) => normalized.includes(t.toLowerCase()))) {
      return img;
    }
  }
  // 2) Fall back to the first generic/consultation image.
  return (
    available.find((img) => img.topicTags.includes("general")) ??
    available.find((img) => img.topicTags.includes("consultation")) ??
    available[0]
  );
}

/**
 * Pick an image for a specific authority (DM, DCD, DEWA, DDA, ...).
 * Matches topic tags (e.g. "dm", "dcd") before falling back to generic.
 */
export function matchImageByAuthority(authority: string): ImageAsset | undefined {
  const key = authority.toLowerCase();
  return matchImageByTopic([key]);
}

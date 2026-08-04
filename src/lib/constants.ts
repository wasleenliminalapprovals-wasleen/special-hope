/**
 * Sitewide constants — NAP (Name, Address, Phone) data and shared values.
 * Must remain byte-for-byte consistent with JSON-LD schema, footer, and GBP.
 */

export const SITE = {
  url: "https://www.dubaiapprovalconsultants.com",
  name: "Wasleen Approvals",
  fullName: "Wasleen Liminal Approval Consultants",
  tagline: "Dubai Approval Consultant Experts",
  description:
    "Expert Dubai approvals consultancy — DM, DDA, DEWA, DCD & more. Fast-track your project approvals with Wasleen Approvals.",
} as const;

export const NAP = {
  companyName: "Wasleen Liminal Approval Consultants",
  phone: "+971567648220",
  whatsapp: "+971567648220",
  email: "approvals@wasleen.com",
  address: {
    streetAddress: "Office 401, Darwish Building",
    addressLocality: "Al Qusais",
    addressRegion: "Dubai",
    addressCountry: "AE",
    postalCode: "",
  },
  areaServed: "Dubai",
} as const;

export const SOCIAL = {
  instagram: "https://www.instagram.com/approvalsindubai",
  facebook: "https://www.facebook.com/profile.php?id=61592746433830",
  threads: "https://www.threads.com/@approvalsindubai",
  linkedin: "https://www.linkedin.com/in/wasleen-approvals-64038b425/",
  pinterest: "https://www.pinterest.com/wasleenliminalapprovals/",
  youtube: "https://www.youtube.com/channel/UC0nmieMmOpL4pvzRL98a-2w",
  tiktok: "https://www.tiktok.com/@approvals.in.dubai",
  reddit: "https://www.reddit.com/user/Dubai-Approvals-Team/",
  quora: "https://www.quora.com/profile/Wasleen-Liminal-Approvals",
} as const;

/* ============================================================
   LICENSE — DED Trade License data (single source of truth)
   Rendered byte-for-byte identically in the /license page table,
   the Organization JSON-LD schema, and the meta description.
   Source: reference details/license-page-guide.md §5
   ============================================================ */

export const LICENSE = {
  licenseNumber: "1188577",
  companyName: "Wasleen Liminal Approval Consultants",
  /** As printed on the certificate — "Dep. of Economic Development" */
  licenseCategory: "Department of Economic Development (DED)",
  issuingAuthority: "Department of Economy and Tourism (DET), Dubai",
  legalType: "LLC – Single Owner",
  issueDate: "2023-09-15",
  expiryDate: "2027-09-15",
  dcciMembership: "486012",
  status: "Active",
  /** Licensed activities as listed on the certificate */
  activities: [
    "Engineering consultancy",
    "Technical drawing & documentation services",
    "Government liaison & approval facilitation",
    "Interior fit-out coordination",
    "Technical services",
  ],
  address: "Office 401, Darwish Building, Al Qusais, Dubai",
  verificationUrl: "https://app.invest.dubai.ae/search-license",
} as const;

export const LOCALE = {
  default: "en-AE",
  alternatives: ["ar-AE"] as const,
} as const;

/**
 * Pre-filled WhatsApp message sent when users click any WhatsApp CTA.
 * URL-encoded automatically when constructing the wa.me link.
 * Keep professional and action-oriented.
 */
export const WHATSAPP_MESSAGE =
  "Hello Wasleen Liminal Approval Consultants, I have an approval enquiry for my project. Could you please share the next steps?";

/**
 * Pre-filled WhatsApp message for the /license page "Request License Copy" CTA.
 * Tracks the `whatsapp_license_request` micro-conversion (see analytics-tracking.md §4).
 */
export const WHATSAPP_LICENSE_MESSAGE =
  "Hello Wasleen Liminal Approval Consultants, I would like to verify or request a copy of your DED trade license (License No. 1188577).";

/** Hub page slugs for building breadcrumbs and internal links */
export const HUB_SLUGS = {
  approvals: "/approvals",
  guides: "/guides",
  services: "/services",
  aboutUs: "/about-us",
  contactUs: "/contact-us",
} as const;

/** Default SEO metadata used as fallback for pages without custom values */
export const DEFAULT_SEO = {
  title: "Dubai Approvals Expert | DM, DDA, DEWA & DCD | Wasleen",
  description:
    "Expert Dubai approvals consultancy — DM, DDA, DEWA, DCD & more. Fast-track your project approvals with Wasleen Approvals. Contact us today.",
  ogImage: `${SITE.url}/og-image.png`,
  twitterHandle: "@wasleenapprovals",
} as const;

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-SJF4WHM8QJ";
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

/** Meta Pixel ID — used by src/lib/meta-pixel.ts and the root-layout base script. */
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

/* ============================================================
   Arabic UI Constants — Navigation, Footer, CTAs & Labels
   Used by the Arabic layout (src/app/ar/layout.tsx) and all
   Arabic pages to render RTL-appropriate UI strings.
   ============================================================ */

export const AR = {
  /** Site name in Arabic */
  siteName: "وسلين ليمينال لاستشارات الموافقات",
  siteShortName: "وسلين للموافقات",
  tagline: "خبراء موافقات دبي",
  description:
    "استشارات متخصصة في موافقات دبي — بلدية دبي، ديوا، الدفاع المدني، وهيئة دبي للتطوير. تسريع موافقات مشروعك مع وسلين للموافقات.",

  /** Language switcher labels */
  lang: {
    switchToEnglish: "English",
    switchToArabic: "العربية",
    currentLang: "العربية",
  },

  /** Navigation labels (matches Header nav items) */
  nav: {
    home: "الرئيسية",
    approvals: "الموافقات",
    services: "الخدمات",
    guides: "الأدلة",
    aboutUs: "من نحن",
    contactUs: "اتصل بنا",
    whatsapp: "واتساب",
    callNow: "اتصل الآن",
  },

  /** Footer section labels */
  footer: {
    about: "عن وسلين",
    aboutDesc:
      "وسلين ليمينال لاستشارات الموافقات — خبراء في الحصول على الموافقات الحكومية في دبي. نساعدك في تسريع موافقات مشروعك.",
    quickLinks: "روابط سريعة",
    services: "خدماتنا",
    contact: "معلومات الاتصال",
    workingHours: "ساعات العمل",
    workingHoursDetail: "الأحد - الخميس: ٩:٠٠ صباحاً - ٦:٠٠ مساءً",
    rights: "© {year} وسلين ليمينال لاستشارات الموافقات. جميع الحقوق محفوظة.",
    privacy: "سياسة الخصوصية",
    terms: "شروط الاستخدام",
  },

  /** CTA (Call to Action) text */
  cta: {
    getStarted: "ابدأ الآن",
    contactUs: "اتصل بنا",
    requestQuote: "اطلب عرض سعر",
    learnMore: "اعرف المزيد",
    whatsapp: "تواصل عبر واتساب",
    callUs: "اتصل بنا الآن",
    submitEnquiry: "إرسال الاستفسار",
    getApproval: "احصل على الموافقة",
    viewAll: "عرض الكل",
    readMore: "اقرأ المزيد",
    startProject: "ابدأ مشروعك",
    freeConsultation: "استشارة مجانية",
  },

  /** Breadcrumb labels */
  breadcrumb: {
    home: "الرئيسية",
    approvals: "الموافقات",
    services: "الخدمات",
    guides: "الأدلة",
    aboutUs: "من نحن",
    contactUs: "اتصل بنا",
    freeQuote: "عرض سعر مجاني",
  },

  /** Category labels (8 approval categories translated) */
  categories: {
    "government-regulatory": "الحكومية والتنظيمية",
    "free-zone": "المناطق الحرة",
    "developer-community": "المطورين والمجتمعات",
    "property-registration": "العقارات والتسجيل",
    "technical-utility": "الفنية والمرافق",
    "trade-food-hospitality": "التجارة والأغذية والضيافة",
    "fit-out-construction": "التشطيبات والبناء",
    "drawing-documentation": "الرسومات والوثائق",
  },

  /** Form labels and placeholders */
  form: {
    name: "الاسم الكامل",
    namePlaceholder: "أدخل اسمك الكامل",
    email: "البريد الإلكتروني",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    phone: "رقم الهاتف",
    phonePlaceholder: "أدخل رقم هاتفك",
    message: "الرسالة",
    messagePlaceholder: "اكتب رسالتك هنا...",
    subject: "الموضوع",
    subjectPlaceholder: "أدخل موضوع الاستفسار",
    submit: "إرسال",
    required: "هذا الحقل مطلوب",
    success: "تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.",
    error: "حدث خطأ. يرجى المحاولة مرة أخرى.",
    privacyConsent: "أوافق على سياسة الخصوصية",
  },

  /** Search / page labels */
  search: {
    placeholder: "ابحث عن موافقة...",
    noResults: "لا توجد نتائج",
    results: "نتائج البحث",
  },

  /** Miscellaneous UI labels */
  misc: {
    lastUpdated: "آخر تحديث",
    readingTime: "دقائق للقراءة",
    share: "مشاركة",
    print: "طباعة",
    backToTop: "العودة إلى الأعلى",
    pageNotFound: "الصفحة غير موجودة",
    pageNotFoundDesc: "عذراً، الصفحة التي تبحث عنها غير موجودة.",
    goHome: "العودة إلى الرئيسية",
    loading: "جارٍ التحميل...",
    copies: "نسخ",
  },

  /** WhatsApp pre-filled message in Arabic */
  whatsappMessage:
    "مرحباً وسلين ليمينال لاستشارات الموافقات، لدي استفسار بخصوص موافقات مشروعي. هل يمكنكم مشاركة الخطوات التالية؟",

  /** License page — Arabic labels & values (mirrors LICENSE constant) */
  license: {
    title: "الرخصة التجارية والتسجيل التنظيمي",
    intro:
      "وسلين ليمينال لاستشارات الموافقات شركة مسجلة ومرخصة في دبي، الإمارات العربية المتحدة. نتعامل مع أعمال الموافقات الخاصة بك عبر كيان تجاري مسؤول وقانوني وقابل للتحقق — وليس عبر أفراد.",
    licenseNumber: "1188577",
    companyName: "وسلين ليمينال لاستشارات الموافقات",
    licenseCategory: "دائرة التنمية الاقتصادية",
    issuingAuthority: "دائرة الاقتصاد والسياحة (دي إي تي)، دبي",
    legalType: "شركة ذات مسؤولية محدودة – مالك واحد",
    issueDate: "15-09-2023",
    expiryDate: "15-09-2027",
    dcciMembership: "486012",
    status: "نشطة — سارية حتى 15-09-2027",
    address: "مكتب 401، مبنى درويش، القصيص، دبي",
    verificationUrl: "https://app.invest.dubai.ae/search-license",
    activities: [
      "الاستشارات الهندسية",
      "خدمات الرسم الفني والوثائق الهندسية",
      "التنسيق مع الجهات الحكومية وتسهيل الموافقات",
      "التنسيق لأعمال الديكور والتشطيبات الداخلية",
      "الخدمات الفنية",
    ],
    whatsappMessage:
      "مرحباً وسلين ليمينال لاستشارات الموافقات، أرغب في التحقق من رخصتكم التجارية أو طلب نسخة منها (رقم الرخصة 1188577).",
  },

  /** Free Quote wizard — Arabic labels (mirrors EN keys in FreeQuoteForm.tsx) */
  freeQuote: {
    eyebrow: "عرض سعر مجاني",
    stepOf: "الخطوة {current} من {total}",
    serviceTitle: "ما نوع الموافقة التي تحتاجها؟",
    serviceSub: "اختر خياراً واحداً للحصول على عرض سعر دقيق",
    locationTitle: "أين يقع مشروعك؟",
    locationSub: "اختر الخيار الأقرب",
    timelineTitle: "ما هو الإطار الزمني المطلوب؟",
    timelineSub: "يساعدنا هذا في تحديد أولويات عرض السعر",
    detailsTitle: "أخبرنا عن مشروعك",
    detailsSub: "اختياري — المزيد من التفاصيل يعني عرض سعر أدق",
    detailsPlaceholder: "مثال: تشطيب مطعم في الخليج التجاري، توصيلة ديوا لفيلا، موافقة دفاع مدني لمكتب...",
    contactTitle: "كيف يمكننا التواصل معك؟",
    nameLabel: "الاسم الكامل",
    phoneLabel: "رقم الهاتف / واتساب",
    emailLabel: "البريد الإلكتروني",
    emailHint: "سنرسل عرض السعر وتأكيد الطلب إلى هذا البريد الإلكتروني",
    optional: "اختياري",
    back: "السابق",
    next: "التالي",
    submit: "اطلب عرض سعري",
    sending: "جارٍ الإرسال...",
    requiredService: "الرجاء اختيار نوع الموافقة للمتابعة",
    requiredLocation: "الرجاء اختيار الموقع للمتابعة",
    requiredTimeline: "الرجاء اختيار الإطار الزمني للمتابعة",
    requiredName: "الرجاء إدخال الاسم الكامل",
    requiredPhone: "الرجاء إدخال رقم الهاتف",
    requiredEmail: "الرجاء إدخال بريدك الإلكتروني لإرسال عرض السعر",
    invalidEmail: "الرجاء إدخال بريد إلكتروني صحيح",
    privacyNote: "بإرسال هذا النموذج فأنت توافق على سياسة الخصوصية. لا نشارك بياناتك أبداً.",
    successTitle: "شكراً لك! تم استلام طلبك.",
    successBody: "سيراجع مستشار وسلين طلبك ويرد عليك خلال 24 ساعة — وغالباً أسرع. هل تحتاج مساعدة فورية؟",
    callNow: "اتصل الآن",
    submitAnother: "إرسال طلب آخر",
    errorTitle: "عذراً — حدث خطأ ما.",
    errorBody: "يرجى المحاولة مرة أخرى، أو تواصل معنا مباشرة عبر واتساب للحصول على مساعدة فورية.",
    tryAgain: "إعادة المحاولة",
  } as const,
} as const;

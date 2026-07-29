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
  phone: "+971542330837",
  whatsapp: "+971542330837",
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
} as const;

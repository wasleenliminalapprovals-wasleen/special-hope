/* Free Quote wizard data — EN + AR labels + Apps Script webhook config */

export interface QuoteOption {
  id: string;
  icon: string;
  labelEn: string;
  labelAr: string;
  helperEn: string;
  helperAr: string;
}

export const QUOTE_SERVICE_OPTIONS: QuoteOption[] = [
  { id: "dm", icon: "Landmark", labelEn: "DM Approval", labelAr: "موافقة بلدية دبي",
    helperEn: "Dubai Municipality building / health / trade approvals",
    helperAr: "موافقات بلدية دبي للمباني والصحة والتجارة" },
  { id: "dcd", icon: "ShieldCheck", labelEn: "DCD Approval", labelAr: "موافقة الدفاع المدني",
    helperEn: "Dubai Civil Defense fire & safety approval",
    helperAr: "موافقة الدفاع المدني لدبي للسلامة والحريق" },
  { id: "dewa", icon: "Zap", labelEn: "DEWA Approval", labelAr: "موافقة ديوا",
    helperEn: "DEWA connection / NOC approvals",
    helperAr: "موافقات ديوا للوصلات وعدم الممانعة" },
  { id: "dda", icon: "Building2", labelEn: "DDA Approval", labelAr: "موافقة هيئة دبي للتطوير",
    helperEn: "DDA plot / developer approvals",
    helperAr: "موافقات هيئة دبي للتطوير والأراضي" },
  { id: "fitout", icon: "Store", labelEn: "Fit-out / Commercial Approvals", labelAr: "موافقات التشطيبات التجارية",
    helperEn: "Shop / restaurant / office fit-out and trade approvals",
    helperAr: "تشطيبات المحلات والمطاعم والمكاتب وموافقات الترخيص" },
  { id: "others", icon: "HelpCircle", labelEn: "Others", labelAr: "أخرى",
    helperEn: "Any other authority or project type",
    helperAr: "أي جهة أخرى أو نوع مشروع آخر" },
];

export const QUOTE_LOCATION_OPTIONS: QuoteOption[] = [
  { id: "mainland", icon: "Building", labelEn: "Dubai Mainland", labelAr: "دبي البر الرئيسي",
    helperEn: "Department of Economy & Tourism license area", helperAr: "منطقة ترخيص دائرة الاقتصاد والسياحة" },
  { id: "freezone", icon: "Factory", labelEn: "Free Zone (DMCC, JAFZA, DIFC, etc.)", labelAr: "منطقة حرة",
    helperEn: "DMCC, JAFZA, DIFC, Dubai South and more", helperAr: "DMCC، جافزا، DIFC، دبي الجنوب وغيرها" },
  { id: "emaar", icon: "Home", labelEn: "Emaar Community", labelAr: "مجتمع إعمار",
    helperEn: "Downtown, Dubai Hills, Arabian Ranches", helperAr: "داون تاون، دبي هيلز، أرابيان رانشز" },
  { id: "nakheel", icon: "Palmtree", labelEn: "Nakheel Community", labelAr: "مجتمع نخيل",
    helperEn: "Palm Jumeirah, JVC, Dubai Islands", helperAr: "نخلة جميرا، الجميرا فيليج سيركل، جزر دبي" },
  { id: "damac", icon: "Building2", labelEn: "DAMAC Community", labelAr: "مجتمع داماك",
    helperEn: "DAMAC Hills, DAMAC Towers", helperAr: "داماك هيلز، أبراج داماك" },
  { id: "other", icon: "MapPin", labelEn: "Other Developer / Community", labelAr: "مطور أو مجتمع آخر",
    helperEn: "Any other master developer or community", helperAr: "أي مطور رئيسي أو مجتمع آخر" },
];

export const QUOTE_TIMELINE_OPTIONS: QuoteOption[] = [
  { id: "urgent", icon: "Zap", labelEn: "Urgent — as soon as possible", labelAr: "عاجل — في أقرب وقت",
    helperEn: "We prioritize fast-track approvals", helperAr: "نعطي الأولوية للموافقات السريعة" },
  { id: "weeks", icon: "CalendarClock", labelEn: "Within 1–2 weeks", labelAr: "خلال 1-2 أسبوع",
    helperEn: "Standard processing", helperAr: "معالجة قياسية" },
  { id: "flexible", icon: "Clock", labelEn: "Flexible — no deadline", labelAr: "مرن — بدون موعد نهائي",
    helperEn: "Best pricing, normal timeline", helperAr: "أفضل سعر، مدة عادية" },
];

/* Google Apps Script Web App — fill after deployment (see free-quote-build-plan.md section 6) */
export const APPS_SCRIPT = {
  url: "https://script.google.com/macros/s/AKfycbxCDHwI9ISmmUIUC_HTVMbDSZ0FUyWRgCulMfXVXYrtBtcQl5WP2qDpTPLA0Q2L7Hcf/exec",
  token: "wasleen-quote-2026",
} as const;

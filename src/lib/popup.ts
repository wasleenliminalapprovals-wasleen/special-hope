/**
 * Dynamic Popup — core library.
 *
 * Client-safe module holding every piece of popup logic that is NOT part of the
 * lazy-loaded UI: types, copy (EN/AR), trigger timing constants, runtime config
 * (`readPopupConfig()` for GTM-controlled A/B), event names, WhatsApp message
 * builders, page-type resolution, bot detection and suppression helpers.
 *
 * @see plans/dynamic-popup-implementation-plan.md (§3, §4, §5, §10, §12)
 *
 * RULES:
 * - Never import `src/data/approvals.ts` here (7,400 lines, server-bundled).
 *   Service names come from the generated `POPUP_SERVICE_NAMES` map (~2KB).
 * - NAP comes from `src/lib/constants.ts` (never hardcoded).
 * - No `trackEvent` calls here — analytics happen in components via
 *   `trackEvent()` from `@/lib/analytics`.
 */

import { NAP } from "@/lib/constants";
import { POPUP_SERVICE_NAMES } from "@/lib/popup-service-names";

/* ============================================================
   TYPES
   ============================================================ */

export type PopupLocale = "en" | "ar";

/** Page-level intent classification (see plan §4). */
export type PageType = "home" | "approvals-hub" | "service" | "guide" | "none";

/** Which trigger opened the popup (see plan §5). */
export type TriggerType = "timer" | "scrollDepth" | "exitIntent" | "scrollUp";

/** GTM-injectable A/B variant — flips which CTA is primary. */
export type PopupVariant = "whatsapp-primary" | "form-primary";

/** Runtime overrides injected by GTM via `window.WLP_POPUP_CONFIG` (no redeploys). */
export interface PopupRuntimeConfig {
  /** Service-page timer delay in seconds (default 10). */
  serviceTimerS: number;
  /** Service-page scroll depth trigger in percent (default 40). */
  serviceScrollPct: number;
  /** Which CTA is primary (default "whatsapp-primary"). */
  variant: PopupVariant;
}

/** Fully-resolved context the UI needs to render + the form needs to submit. */
export interface PopupContext {
  pageType: PageType;
  pageSlug: string;
  /** Clean short name for headlines/copy, e.g. "DM Building Permit". */
  serviceName: string;
  /** Same as serviceName — sent to Apps Script as `serviceInterest`. */
  serviceInterest: string;
  locale: PopupLocale;
  /** Pre-filled WhatsApp deep-link message. */
  whatsappMessage: string;
}

/* ============================================================
   EVENT NAMES (taxonomy added to reference details/analytics-tracking.md)
   ============================================================ */

export const POPUP_EVENTS = {
  view: "popup_view",
  close: "popup_close",
  formToggle: "popup_form_toggle",
  formAttempt: "popup_form_attempt",
  submitSuccess: "popup_submit_success",
  submitError: "popup_submit_error",
  whatsappClick: "popup_whatsapp_click",
} as const;

export type PopupEventName = (typeof POPUP_EVENTS)[keyof typeof POPUP_EVENTS];

/* ============================================================
   STORAGE KEYS & FREQUENCY CAPPING (plan §12)
   ============================================================ */

export const POPUP_STORAGE = {
  /** "1" = a popup was shown this session (max 1/session). */
  sessionShown: "wlp_popup_shown",
  /** ISO-ms timestamp of last dismissal (7-day cooldown). */
  dismissedAt: "wlp_popup_dismissed_at",
  /** "1" = a popup lead was submitted this session (never show again). */
  sessionLead: "wlp_popup_lead_submitted",
} as const;

/** Cooldown window — no popup for 7 days after a dismissal. */
export const POPUP_DISMISS_TTL_MS = 7 * 24 * 60 * 60 * 1000;

/* ============================================================
   TIMING CONSTANTS (plan §5)
   ============================================================ */

export const POPUP_TIMING = {
  serviceTimerS: 10,
  serviceScrollPct: 40,
  homeTimerS: 8,
  guideScrollPct: 55,
  guideDwellS: 15,
  /** Guide pages: never fire before this floor, regardless of trigger. */
  guideHardFloorS: 12,
  /** Exit-intent: mouse leaves with clientY below this value (desktop). */
  exitIntentY: 10,
  /** Scroll-up (mobile exit-intent): must have scrolled down ≥ 35% first. */
  scrollUpMinPct: 35,
} as const;

/* ============================================================
   ROLLOUT ALLOWLIST (plan §14 — Phase A)
   ============================================================ */

/**
 * Phase A ships the popup on these 8 high-intent service pages only, so we can
 * run a clean baseline + control incrementality test. Flip `PHASE_A_ONLY` to
 * `false` only after the Phase-A lift is confirmed (Phase B = all 69 + 7 pages).
 */
export const ROLLOUT_SLUGS: readonly string[] = [
  "dubai-municipality-building-permit", // DM Building Permit
  "dubai-civil-defense-approval", // DCD Approval
  "dewa-approval", // DEWA Approval
  "dda-approval", // DDA Approval
  "rta-approval", // RTA Approval
  "ejari-registration", // Ejari Registration
  "interior-fit-out-approval", // Fit-Out Approval
  "interior-works-approval", // Interior Works
] as const;

/** Phase A gate — see plan §14. Do NOT disable during baseline. */
export const PHASE_A_ONLY = true;

/* ============================================================
   RUNTIME CONFIG (GTM-controlled A/B — plan §5)
   ============================================================ */

declare global {
  interface Window {
    /** Injected by GTM to flip variant/timings per traffic slice. */
    WLP_POPUP_CONFIG?: Partial<PopupRuntimeConfig>;
  }
}

export const DEFAULT_POPUP_CFG: PopupRuntimeConfig = {
  serviceTimerS: POPUP_TIMING.serviceTimerS,
  serviceScrollPct: POPUP_TIMING.serviceScrollPct,
  variant: "whatsapp-primary",
};

export function readPopupConfig(): PopupRuntimeConfig {
  if (typeof window === "undefined") return DEFAULT_POPUP_CFG;
  return { ...DEFAULT_POPUP_CFG, ...(window.WLP_POPUP_CONFIG ?? {}) };
}

/* ============================================================
   COPY — EN / AR (plan §6.2, §10)
   ============================================================ */

export interface PopupPageCopy {
  /** Headline template — may contain `{service}`. */
  headline: string;
  /** Subheadline template — may contain `{service}`. */
  subheadline: string;
  /** WhatsApp pre-fill template — may contain `{service}` / `{topic}`. */
  whatsapp: string;
}

export interface PopupCopy {
  base: {
    eyebrow: string;
    whatsappCta: string;
    whatsappMicrocopy: string;
    formToggle: string;
    privacyNote: string;
    trustLine: string;
    trustLine2: string;
    dismiss: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    phonePrefix: string;
    submit: string;
    sending: string;
    successTitle: string;
    successBody: string;
    successWhatsApp: string;
    errorTitle: string;
    errorBody: string;
    retry: string;
    ariaClose: string;
    ariaWhatsApp: string;
    ariaFormToggle: string;
  };
  pages: Record<PageType, PopupPageCopy>;
}

const EN: PopupCopy = {
  base: {
    eyebrow: "FREE ESTIMATE",
    whatsappCta: "Chat on WhatsApp — Free & Instant",
    whatsappMicrocopy: "We reply within 1 hour · No forms needed",
    formToggle: "Get a written estimate",
    privacyNote:
      "Your details are only used to reply to your enquiry — we never share your number.",
    trustLine: "Trusted by 500+ Dubai projects",
    trustLine2: "8+ years experience",
    dismiss: "Not now",
    nameLabel: "Full name",
    namePlaceholder: "e.g. Ahmed",
    phoneLabel: "Phone / WhatsApp",
    phonePlaceholder: "5X XXX XXXX",
    phonePrefix: "+971 ",
    submit: "Get My Free Estimate",
    sending: "Sending...",
    successTitle: "Thank you! Your request is in.",
    successBody:
      "A Wasleen consultant will review your details and reply within 24 hours — usually much faster.",
    successWhatsApp: "Chat on WhatsApp instead",
    errorTitle: "Sorry — something went wrong.",
    errorBody:
      "Please try again, or reach us directly on WhatsApp for instant help.",
    retry: "Try again",
    ariaClose: "Close popup",
    ariaWhatsApp: "Chat with us on WhatsApp — free and instant",
    ariaFormToggle: "Get a written estimate instead",
  },
  pages: {
    home: {
      headline: "Not sure which approval you need?",
      subheadline:
        "Tell us about your project and we'll point you to the right approvals — free, takes 2 minutes.",
      whatsapp:
        "Hi Wasleen Approvals 👋 I'm on your website and not sure which Dubai approval my project needs. Could you help me work out the right permits and roughly how long they take? Thank you!",
    },
    "approvals-hub": {
      headline: "Comparing your approval options?",
      subheadline:
        "We'll shortlist the approvals that apply to your project — free, takes 2 minutes.",
      whatsapp:
        "Hi Wasleen Approvals 👋 I'm comparing approval options on your site. Which approvals apply to my project in Dubai, and can you give me an idea of timeline and cost? Thank you!",
    },
    service: {
      headline: "Get Your {service} Estimate",
      subheadline:
        "Get your {service} timeline & cost estimate — free, takes 2 minutes.",
      whatsapp:
        "Hi Wasleen Approvals 👋 I just read your {service} page — I need {service} for my project in Dubai. Could you share the typical timeline and an indicative cost estimate? Thank you!",
    },
    guide: {
      headline: "Question about your approval?",
      subheadline:
        "Get a clear answer for your project in Dubai — free, takes 2 minutes.",
      whatsapp:
        "Hi Wasleen Approvals 👋 I read your guide on {topic} and have a question about my situation in Dubai. Could you help me understand the next step? Thank you!",
    },
    none: { headline: "", subheadline: "", whatsapp: "" },
  },
};

/**
 * Arabic copy. NOTE: `/ar` routes are suppressed in v1 (separate AR layout does
 * not mount the provider + §13 QA gate). These strings are ready for the Phase-C
 * Arabic rollout and pending RTL QA.
 */
const AR: PopupCopy = {
  base: {
    eyebrow: "تقدير مجاني",
    whatsappCta: "تحدث عبر واتساب — مجاني وفوري",
    whatsappMicrocopy: "نرد خلال ساعة · لا حاجة لنماذج",
    formToggle: "احصل على تقدير مكتوب",
    privacyNote: "تُستخدم بياناتك فقط للرد على استفسارك — لا نشارك رقمك أبداً.",
    trustLine: "موثوقون من أكثر من 500 مشروع في دبي",
    trustLine2: "خبرة أكثر من 8 سنوات",
    dismiss: "ليس الآن",
    nameLabel: "الاسم الكامل",
    namePlaceholder: "مثال: أحمد",
    phoneLabel: "الهاتف / واتساب",
    phonePlaceholder: "5X XXX XXXX",
    phonePrefix: "+971 ",
    submit: "احصل على تقدير مجاني",
    sending: "جارٍ الإرسال...",
    successTitle: "شكراً لك! تم استلام طلبك.",
    successBody: "سيراجع مستشار وسلين تفاصيلك ويرد خلال 24 ساعة — غالباً أسرع.",
    successWhatsApp: "تحدث عبر واتساب بدلاً من ذلك",
    errorTitle: "عذراً — حدث خطأ ما.",
    errorBody: "يرجى المحاولة مرة أخرى، أو تواصل معنا مباشرة عبر واتساب.",
    retry: "حاول مرة أخرى",
    ariaClose: "إغلاق النافذة",
    ariaWhatsApp: "تحدث معنا عبر واتساب — مجاني وفوري",
    ariaFormToggle: "احصل على تقدير مكتوب بدلاً من ذلك",
  },
  pages: {
    home: {
      headline: "لست متأكداً من الموافقة التي تحتاجها؟",
      subheadline:
        "أخبرنا عن مشروعك وسنرشدك إلى الموافقات الصحيحة — مجاناً، خلال دقيقتين.",
      whatsapp:
        "مرحباً وسلين للموافقات 👋 أنا على موقعكم ولست متأكداً من الموافقة التي يحتاجها مشروعي في دبي. هل يمكنكم مساعدتي في تحديد التصاريح المناسبة ومدتها التقريبية؟ شكراً!",
    },
    "approvals-hub": {
      headline: "تقارن خيارات الموافقات؟",
      subheadline:
        "سنلخص الموافقات المطلوبة لمشروعك — مجاناً، خلال دقيقتين.",
      whatsapp:
        "مرحباً وسلين للموافقات 👋 أقارن خيارات الموافقات على موقعكم. ما هي الموافقات المطلوبة لمشروعي في دبي، وهل يمكنكم إعطائي فكرة عن المدة والتكلفة؟ شكراً!",
    },
    service: {
      headline: "احصل على تقدير {service}",
      subheadline: "احصل على مدة وتكلفة {service} — مجاناً، خلال دقيقتين.",
      whatsapp:
        "مرحباً وسلين للموافقات 👋 قرأت صفحة {service} — أحتاج {service} لمشروعي في دبي. هل يمكنكم مشاركة المدة النموذجية وتقدير التكلفة؟ شكراً!",
    },
    guide: {
      headline: "لديك سؤال حول موافقتك؟",
      subheadline: "احصل على إجابة واضحة لمشروعك في دبي — مجاناً.",
      whatsapp:
        "مرحباً وسلين للموافقات 👋 قرأت دليلكم حول {topic} ولدي سؤال حول حالتي في دبي. هل يمكنكم مساعدتي في فهم الخطوة التالية؟ شكراً!",
    },
    none: { headline: "", subheadline: "", whatsapp: "" },
  },
};

export const POPUP_COPY: Record<PopupLocale, PopupCopy> = { en: EN, ar: AR };

/* ============================================================
   PAGE-TYPE RESOLUTION (plan §4 — no per-page config)
   ============================================================ */

export function resolvePageType(pathname: string): PageType {
  const p = pathname.replace(/\/+$/, "") || "/";

  // Arabic routes: suppressed in v1 (separate AR layout; §13 QA gate).
  if (p.startsWith("/ar")) return "none";

  if (p === "/") return "home";
  if (p === "/approvals") return "approvals-hub";
  if (p.startsWith("/approvals/")) return "service";
  if (p === "/services") return "none"; // low-intent hub — suppressed
  if (p.startsWith("/services/")) return "service";
  if (p.startsWith("/guides/") || p.startsWith("/blog/")) return "guide";

  // Static / low-intent pages — suppressed (exit-intent only in later phases).
  if (
    p === "/about-us" ||
    p === "/contact-us" ||
    p === "/free-quote" ||
    p === "/license" ||
    p === "/privacy-policy"
  ) {
    return "none";
  }

  return "none"; // unknown / 404
}

export function resolvePageSlug(pathname: string): string {
  const segments = pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  return segments[segments.length - 1] ?? "";
}

const ACRONYMS = new Set([
  "2d", "3d", "dm", "dcd", "dewa", "dda", "rta", "ded", "noc", "mep", "dha",
  "difc", "dmcc", "jafza", "dafza", "impz", "dtcm", "dld", "rera",
]);

/** Last-resort slug → label (only used if the generated map + H1 both miss). */
export function prettifySlug(slug: string): string {
  if (!slug) return "";
  return slug
    .split("-")
    .map((word) =>
      ACRONYMS.has(word.toLowerCase())
        ? word.toUpperCase()
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

/**
 * Read + clean the live `<h1>`. Approval-page H1s are SEO keyword phrases
 * (e.g. "DEWA approval Dubai"), so we strip trailing "| Wasleen Approvals" and
 * "in Dubai" before falling back. Only called as the second fallback (the
 * generated `POPUP_SERVICE_NAMES` map is preferred — plan §4).
 */
export function cleanH1(): string {
  if (typeof document === "undefined") return "";
  const h1 = document.querySelector("h1");
  if (!h1?.textContent) return "";
  return (
    h1.textContent
      .replace(/\s*\|\s*Wasleen Approvals\s*$/i, "")
      .replace(/\s+in Dubai\s*$/i, "")
      .replace(/\s+/g, " ")
      .trim() ?? ""
  );
}

/**
 * Resolve the clean service name used for popup copy. Priority (plan §4):
 * 1. generated `POPUP_SERVICE_NAMES[slug]`
 * 2. cleaned live `<h1>`
 * 3. `prettifySlug(slug)`
 */
export function resolveServiceName(
  pageType: PageType,
  slug: string,
): string {
  if (pageType !== "service") return "";

  const fromMap = POPUP_SERVICE_NAMES[slug];
  if (fromMap) return fromMap;

  const fromH1 = cleanH1();
  if (fromH1) return fromH1;

  return prettifySlug(slug);
}

/* ============================================================
   WHATSAPP (plan §10 — NAP from constants, never hardcoded)
   ============================================================ */

export function buildWhatsAppMessage(
  pageType: PageType,
  service: string,
  topic: string,
  locale: PopupLocale,
): string {
  const template = POPUP_COPY[locale].pages[pageType]?.whatsapp ?? "";
  return template
    .replace(/\{service\}/g, service || "this approval")
    .replace(/\{topic\}/g, topic || service || "this topic");
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${NAP.whatsapp}?text=${encodeURIComponent(message)}`;
}

/* ============================================================
   BOT DETECTION (plan §12)
   ============================================================ */

const BOT_RE = /bot|crawl|spider|googlebot|bingbot|duckduckbot|baiduspider/i;

export function isBot(): boolean {
  // SSR: never render/arm the popup server-side anyway — treat as "bot-safe".
  if (typeof navigator === "undefined") return true;
  if (navigator.webdriver) return true;
  return BOT_RE.test(navigator.userAgent);
}

/* ============================================================
   SUPPRESSION / FREQUENCY CAPPING HELPERS (plan §12)
   ============================================================ */

function readSession(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSession(key: string, value: string): void {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    /* storage unavailable — ignore */
  }
}

function readLocal(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeLocal(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable — ignore */
  }
}

export function markPopupShownThisSession(): void {
  writeSession(POPUP_STORAGE.sessionShown, "1");
}

export function isPopupShownThisSession(): boolean {
  return readSession(POPUP_STORAGE.sessionShown) === "1";
}

export function markPopupDismissed(): void {
  writeLocal(POPUP_STORAGE.dismissedAt, String(Date.now()));
}

export function wasPopupDismissedRecently(): boolean {
  const raw = readLocal(POPUP_STORAGE.dismissedAt);
  if (!raw) return false;
  const ts = Number(raw);
  if (!Number.isFinite(ts)) return false;
  return Date.now() - ts < POPUP_DISMISS_TTL_MS;
}

export function markPopupLeadSubmitted(): void {
  writeSession(POPUP_STORAGE.sessionLead, "1");
}

export function isPopupLeadSubmittedThisSession(): boolean {
  return readSession(POPUP_STORAGE.sessionLead) === "1";
}

/** One combined gate — evaluated before ANY listener is registered. */
export function canShowPopup(): boolean {
  if (isBot()) return false;
  if (isPopupShownThisSession()) return false;
  if (isPopupLeadSubmittedThisSession()) return false;
  if (wasPopupDismissedRecently()) return false;
  return true;
}

/**
 * Phase-A routing gate — only the 8 rollout service pages arm the popup.
 * (Home / hub / guide become active in later phases — plan §14 Phase C.)
 */
export function isAllowedToShow(pageType: PageType, slug: string): boolean {
  if (pageType !== "service") return false;
  if (PHASE_A_ONLY) return ROLLOUT_SLUGS.includes(slug);
  return true;
}

/**
 * Capture-phase click listener that suppresses the popup once a visitor has
 * engaged an existing conversion path (plan §12): any `wa.me` link, the
 * FloatingWhatsApp button, or any form (FreeQuoteForm / contact forms).
 * This marks the session flag WITHOUT modifying FloatingWhatsApp/FreeQuoteForm.
 */
export function isExistingEngagementTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  if (target.closest("a[href^='https://wa.me']")) return true;
  if (target.closest('[aria-label="Contact us on WhatsApp"]')) return true;
  if (target.closest("form")) return true;
  return false;
}

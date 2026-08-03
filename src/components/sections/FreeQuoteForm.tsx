"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Building,
  Building2,
  CalendarClock,
  CheckCircle2,
  Clock,
  Factory,
  HelpCircle,
  Home,
  Landmark,
  Loader2,
  MapPin,
  MessageCircle,
  Palmtree,
  Phone,
  Send,
  ShieldCheck,
  Store,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { NAP, AR } from "@/lib/constants";
import {
  APPS_SCRIPT,
  QUOTE_LOCATION_OPTIONS,
  QUOTE_SERVICE_OPTIONS,
  QUOTE_TIMELINE_OPTIONS,
  type QuoteOption,
} from "@/data/free-quote";

const ICON_MAP: Record<string, LucideIcon> = {
  Landmark, ShieldCheck, Zap, Building2, Store, HelpCircle,
  Building, Factory, Home, Palmtree, MapPin, CalendarClock, Clock,
};

const EN = {
  eyebrow: "Free Quote",
  stepOf: "Step {current} of {total}",
  serviceTitle: "Which approval do you need?",
  serviceSub: "Choose one to get an accurate quote",
  locationTitle: "Where is your project located?",
  locationSub: "Choose the closest match",
  timelineTitle: "What is your timeline?",
  timelineSub: "This helps us prioritize your quote",
  detailsTitle: "Tell us about your project",
  detailsSub: "Optional — but more detail means a more accurate quote",
  detailsPlaceholder: "e.g. restaurant fit-out in Business Bay, DEWA connection for a villa, DCD approval for an office...",
  contactTitle: "How can we reach you?",
  nameLabel: "Full name",
  phoneLabel: "Phone / WhatsApp",
  emailLabel: "Email",
  emailHint: "We'll send your free quote and confirmation to this address.",
  optional: "Optional",
  back: "Back",
  next: "Next",
  submit: "Get My Free Quote",
  sending: "Sending...",
  requiredService: "Please choose an approval type to continue.",
  requiredLocation: "Please choose a location to continue.",
  requiredTimeline: "Please choose a timeline to continue.",
  requiredName: "Please enter your full name.",
  requiredPhone: "Please enter your phone number.",
  requiredEmail: "Please enter your email so we can send your quote.",
  invalidEmail: "Please enter a valid email address.",
  privacyNote: "By submitting you agree to our privacy policy. We never share your details.",
  successTitle: "Thank you! Your request is in.",
  successBody: "A Wasleen consultant will review your details and reply within 24 hours — usually much faster. Need help right now?",
  callNow: "Call us now",
  submitAnother: "Submit another request",
  errorTitle: "Sorry — something went wrong.",
  errorBody: "Please try again, or reach us directly on WhatsApp for instant help.",
  tryAgain: "Try again",
};

type FormData = {
  service: string;
  location: string;
  timeline: string;
  details: string;
  name: string;
  phone: string;
  email: string;
};

const initialData: FormData = {
  service: "", location: "", timeline: "", details: "", name: "", phone: "", email: "",
};

export default function FreeQuoteForm({ locale = "en" }: { locale?: "en" | "ar" }) {
  const t: typeof EN = locale === "ar" ? (AR.freeQuote as unknown as typeof EN) : EN;
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const total = 5;
  const progress = ((step + 1) / total) * 100;
  const stepLabel = t.stepOf.replace("{current}", String(step + 1)).replace("{total}", String(total));

  const setField = (key: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (idx: number): boolean => {
    const next: Partial<Record<keyof FormData, string>> = {};
    if (idx === 0 && !data.service) next.service = t.requiredService;
    if (idx === 1 && !data.location) next.location = t.requiredLocation;
    if (idx === 2 && !data.timeline) next.timeline = t.requiredTimeline;
    if (idx === 4) {
      if (!data.name.trim()) next.name = t.requiredName;
      if (!data.phone.trim()) next.phone = t.requiredPhone;
      if (!data.email.trim()) next.email = t.requiredEmail;
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = t.invalidEmail;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleNext = () => {
    if (!validate(step)) return;
    trackEvent({ action: "quote_step_next", category: "free_quote", label: `step=${step + 1}` });
    setStep((s) => Math.min(s + 1, total - 1));
  };

  const handleBack = () => {
    trackEvent({ action: "quote_step_back", category: "free_quote", label: `step=${step + 1}` });
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validate(4)) return;
    setSending(true);
    setSubmitError(false);
    trackEvent({ action: "quote_submit", category: "free_quote", label: data.service });
    try {
      const res = await fetch(APPS_SCRIPT.url, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          service: data.service, location: data.location, timeline: data.timeline,
          details: data.details, name: data.name, phone: data.phone, email: data.email,
          locale, token: APPS_SCRIPT.token, submittedAt: new Date().toISOString(),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success !== true) throw new Error("submit failed");
      trackEvent({ action: "quote_submit_success", category: "free_quote", label: data.service });
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setData(initialData);
    setErrors({});
    setStep(0);
    setSubmitted(false);
    setSubmitError(false);
  };

  const handleWhatsApp = (message: string) => {
    trackEvent({ action: "contact_click", category: "free_quote", method: "whatsapp", label: data.service });
    window.open(`https://wa.me/${NAP.whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
  };

  /* ---------- Success screen ---------- */
  if (submitted) {
    return (
      <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-dropdown p-8 md:p-12 text-center">
        <CheckCircle2 size={64} strokeWidth={1.5} className="mx-auto text-success-green animate-pulse" />
        <h2 className="mt-4 text-h3 font-bold text-heading-text">{t.successTitle}</h2>
        <p className="mt-2 text-body text-body-text max-w-md mx-auto">{t.successBody}</p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => handleWhatsApp(`Hi Wasleen Approvals, I just requested a free quote for ${data.service}.`)}
            className="inline-flex items-center gap-2 px-6 py-3 text-body font-medium rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-cta-amber text-brand-black hover:bg-cta-amber-hover focus-visible:ring-cta-amber"
            aria-label={locale === "ar" ? "تواصل معنا عبر واتساب" : "Chat with us on WhatsApp"}
          >
            <MessageCircle size={20} strokeWidth={1.75} />
            {locale === "ar" ? AR.cta.whatsapp : "Chat on WhatsApp"}
          </button>
          <a
            href={`tel:${NAP.phone}`}
            className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white font-bold text-body-sm py-3 px-6 rounded-md transition-colors"
            aria-label={locale === "ar" ? `اتصل بنا على ${NAP.phone}` : `Call us at ${NAP.phone}`}
          >
            <Phone size={18} strokeWidth={1.75} />
            {t.callNow}
          </a>
        </div>
        <button type="button" onClick={reset} className="mt-6 text-body-sm text-link-blue hover:underline">
          {t.submitAnother}
        </button>
      </div>
    );
  }

  /* ---------- Error screen ---------- */
  if (submitError) {
    return (
      <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-dropdown p-8 md:p-12 text-center">
        <AlertCircle size={64} strokeWidth={1.5} className="mx-auto text-uae-red" />
        <h2 className="mt-4 text-h3 font-bold text-heading-text">{t.errorTitle}</h2>
        <p className="mt-2 text-body text-body-text max-w-md mx-auto">{t.errorBody}</p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => { setSubmitError(false); handleSubmit(); }}
            className="inline-flex items-center gap-2 bg-cta-amber hover:bg-cta-amber-hover text-brand-black font-bold text-body-sm py-3 px-6 rounded-md transition-colors"
          >
            <Send size={18} strokeWidth={1.75} />
            {t.tryAgain}
          </button>
          <button
            type="button"
            onClick={() => handleWhatsApp(`Hi Wasleen Approvals, I need a free quote for ${data.service}.`)}
            className="inline-flex items-center gap-2 px-6 py-3 text-body font-medium rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-cta-amber text-brand-black hover:bg-cta-amber-hover focus-visible:ring-cta-amber"
            aria-label={locale === "ar" ? "تواصل معنا عبر واتساب" : "Chat with us on WhatsApp"}
          >
            <MessageCircle size={20} strokeWidth={1.75} />
            {locale === "ar" ? AR.cta.whatsapp : "Chat on WhatsApp"}
          </button>
        </div>
      </div>
    );
  }

  /* ---------- Wizard ---------- */
  return (
    <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-dropdown p-6 md:p-10">
      <div className="mb-6" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={total} aria-label={stepLabel}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-caption font-semibold text-brand-blue uppercase tracking-wide">{t.eyebrow}</p>
          <p className="text-caption text-body-text/70">{stepLabel}</p>
        </div>
        <div className="flex gap-1.5" aria-hidden="true">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                i < step ? "bg-success-green" : i === step ? "bg-cta-amber" : "bg-border-light"
              }`}
            />
          ))}
        </div>
      </div>

      <form name="quoteForm" noValidate>
        {/* Step 1 — Service */}
        {step === 0 && (
          <fieldset className="animate-[fade-in_0.3s_ease]">
            <legend className="text-h3 font-bold text-heading-text">{t.serviceTitle}</legend>
            <p className="text-body-sm text-body-text/70 mb-4">{t.serviceSub}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {QUOTE_SERVICE_OPTIONS.map((opt) => (
                <OptionCard key={opt.id} option={opt} locale={locale}
                  selected={data.service === opt.labelEn}
                  onSelect={() => setField("service", opt.labelEn)} />
              ))}
            </div>
            {errors.service && <p className="mt-2 text-body-sm text-uae-red" role="alert">{errors.service}</p>}
          </fieldset>
        )}

        {/* Step 2 — Location */}
        {step === 1 && (
          <fieldset className="animate-[fade-in_0.3s_ease]">
            <legend className="text-h3 font-bold text-heading-text">{t.locationTitle}</legend>
            <p className="text-body-sm text-body-text/70 mb-4">{t.locationSub}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {QUOTE_LOCATION_OPTIONS.map((opt) => (
                <OptionCard key={opt.id} option={opt} locale={locale}
                  selected={data.location === opt.labelEn}
                  onSelect={() => setField("location", opt.labelEn)} />
              ))}
            </div>
            {errors.location && <p className="mt-2 text-body-sm text-uae-red" role="alert">{errors.location}</p>}
          </fieldset>
        )}

        {/* Step 3 — Timeline */}
        {step === 2 && (
          <fieldset className="animate-[fade-in_0.3s_ease]">
            <legend className="text-h3 font-bold text-heading-text">{t.timelineTitle}</legend>
            <p className="text-body-sm text-body-text/70 mb-4">{t.timelineSub}</p>
            <div className="grid grid-cols-1 gap-3">
              {QUOTE_TIMELINE_OPTIONS.map((opt) => (
                <OptionCard key={opt.id} option={opt} locale={locale}
                  selected={data.timeline === opt.labelEn}
                  onSelect={() => setField("timeline", opt.labelEn)} />
              ))}
            </div>
            {errors.timeline && <p className="mt-2 text-body-sm text-uae-red" role="alert">{errors.timeline}</p>}
          </fieldset>
        )}

        {/* Step 4 — Details */}
        {step === 3 && (
          <fieldset className="animate-[fade-in_0.3s_ease]">
            <legend className="text-h3 font-bold text-heading-text">{t.detailsTitle}</legend>
            <p className="text-body-sm text-body-text/70 mb-4">{t.detailsSub}</p>
            <label className="sr-only" htmlFor="quote-details">{t.detailsTitle}</label>
            <textarea
              id="quote-details"
              rows={5}
              value={data.details}
              onChange={(e) => setField("details", e.target.value)}
              placeholder={t.detailsPlaceholder}
              className="w-full rounded-md border border-border-light bg-white p-4 text-body text-body-text focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition"
            />
            <p className="mt-2 text-right text-caption text-body-text/50">{data.details.length} / 500</p>
          </fieldset>
        )}

        {/* Step 5 — Contact */}
        {step === 4 && (
          <fieldset className="animate-[fade-in_0.3s_ease] space-y-4">
            <legend className="text-h3 font-bold text-heading-text">{t.contactTitle}</legend>
            <div>
              <label htmlFor="quote-name" className="block text-body-sm font-semibold text-body-text mb-1">{t.nameLabel}</label>
              <input
                id="quote-name" type="text" value={data.name} autoComplete="name"
                onChange={(e) => setField("name", e.target.value)}
                className="w-full rounded-md border border-border-light bg-white p-3 text-body text-body-text focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition"
              />
              {errors.name && <p className="mt-1 text-body-sm text-uae-red" role="alert">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="quote-phone" className="block text-body-sm font-semibold text-body-text mb-1">{t.phoneLabel}</label>
              <input
                id="quote-phone" type="tel" value={data.phone} autoComplete="tel"
                onChange={(e) => setField("phone", e.target.value)}
                className="w-full rounded-md border border-border-light bg-white p-3 text-body text-body-text focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition"
              />
              {errors.phone && <p className="mt-1 text-body-sm text-uae-red" role="alert">{errors.phone}</p>}
            </div>
            <div>
              <label htmlFor="quote-email" className="block text-body-sm font-semibold text-body-text mb-1">
                {t.emailLabel} <span className="font-normal text-uae-red">*</span>
              </label>
              <p className="mb-1 text-caption text-body-text/60">{t.emailHint}</p>
              <input
                id="quote-email" type="email" value={data.email} autoComplete="email"
                onChange={(e) => setField("email", e.target.value)}
                className="w-full rounded-md border border-border-light bg-white p-3 text-body text-body-text focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition"
              />
              {errors.email && <p className="mt-1 text-body-sm text-uae-red" role="alert">{errors.email}</p>}
            </div>
            <p className="text-caption text-body-text/60">
              {t.privacyNote}{" "}
              <Link href={locale === "ar" ? "/ar/privacy-policy" : "/privacy-policy"} className="text-link-blue hover:underline">
                {locale === "ar" ? AR.footer.privacy : "Privacy Policy"}
              </Link>
            </p>
          </fieldset>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button
              type="button" onClick={handleBack} disabled={sending}
              className="inline-flex items-center gap-2 rounded-md border border-border-light bg-white px-5 py-3 text-body-sm font-bold text-body-text hover:bg-card-bg transition-colors disabled:opacity-50"
            >
              <ArrowLeft size={18} strokeWidth={1.75} className="rtl:rotate-180" />
              {t.back}
            </button>
          ) : (
            <span />
          )}

          {step < total - 1 ? (
            <button
              type="button" onClick={handleNext}
              className="group inline-flex items-center gap-2 rounded-md bg-cta-amber hover:bg-cta-amber-hover px-8 py-3 text-body-sm font-bold text-brand-black shadow-sm transition-all active:scale-[0.98]"
            >
              {t.next}
              <ArrowRight size={18} strokeWidth={1.75} className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
            </button>
          ) : (
            <button
              type="button" onClick={handleSubmit} disabled={sending}
              className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-md bg-cta-amber hover:bg-cta-amber-hover px-8 py-3 text-body-sm font-bold text-brand-black shadow-sm transition-all active:scale-[0.98] disabled:opacity-60"
            >
              {sending ? (
                <><Loader2 size={18} strokeWidth={1.75} className="animate-spin" />{t.sending}</>
              ) : (
                <><Send size={18} strokeWidth={1.75} />{t.submit}</>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function OptionCard({
  option, selected, onSelect, locale,
}: { option: QuoteOption; selected: boolean; onSelect: () => void; locale: "en" | "ar" }) {
  const Icon = ICON_MAP[option.icon] ?? MapPin;
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group relative flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200 ${
        selected
          ? "border-brand-blue bg-card-bg shadow-card scale-[1.02]"
          : "border-border-light bg-white hover:border-brand-blue/50 hover:shadow-card"
      }`}
    >
      {selected && (
        <CheckCircle2 size={20} strokeWidth={1.75} className="absolute top-3 right-3 text-success-green" aria-hidden="true" />
      )}
      <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${selected ? "bg-brand-blue text-white" : "bg-card-bg text-brand-blue"}`}>
        <Icon size={20} strokeWidth={1.75} />
      </span>
      <span>
        <span className={`block text-body-sm font-bold ${selected ? "text-brand-blue" : "text-body-text"}`}>
          {locale === "ar" ? option.labelAr : option.labelEn}
        </span>
        <span className="block text-body-sm text-body-text/70">{locale === "ar" ? option.helperAr : option.helperEn}</span>
      </span>
    </button>
  );
}

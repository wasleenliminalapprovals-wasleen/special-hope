/**
 * PopupForm — the 2-field (name + phone) lead-capture form inside the popup.
 *
 * Apps Script contract — MUST mirror FreeQuoteForm.tsx handleSubmit byte-for-byte:
 * - `Content-Type: text/plain;charset=utf-8` (NOT application/json)
 * - Canonical `phone` field (NEVER `whatsapp`) — one Sheet column, one row-writer.
 * - `source: "popup"` so the existing Apps Script `doPost` can branch the email
 *   subject to "New Popup Lead — {serviceInterest}" without a new endpoint.
 * - `token` reused from `src/data/free-quote.ts` (same webhook).
 *
 * Success → provider `onSubmitSuccess()` (marks session lead + `popup_submit_success`).
 * Failure → inline error + WhatsApp fallback (real `<a href>` deep link).
 * NO `metaLead()` from the popup in v1 (plan §9 — decision gate).
 *
 * @see plans/dynamic-popup-implementation-plan.md (§6.2, §8, §9)
 */

"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { APPS_SCRIPT } from "@/data/free-quote";
import { POPUP_COPY } from "@/lib/popup";
import { usePopupProvider } from "@/components/popup/PopupProvider";

/** Read optional UTM params for the Apps Script payload (plan §8). */
function readUtm(): { utm_source?: string; utm_campaign?: string; utm_medium?: string } {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: { utm_source?: string; utm_campaign?: string; utm_medium?: string } = {};
  const source = params.get("utm_source");
  const campaign = params.get("utm_campaign");
  const medium = params.get("utm_medium");
  if (source) utm.utm_source = source;
  if (campaign) utm.utm_campaign = campaign;
  if (medium) utm.utm_medium = medium;
  return utm;
}

export default function PopupForm() {
  const {
    context,
    whatsappUrl,
    onFormAttempt,
    onSubmitSuccess,
    onSubmitError,
    onWhatsAppClick,
  } = usePopupProvider();

  const t = POPUP_COPY[context.locale].base;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    let valid = true;
    if (!name.trim()) {
      setNameError("Please enter your full name.");
      valid = false;
    } else {
      setNameError(null);
    }
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) {
      setPhoneError("Please enter a valid phone number.");
      valid = false;
    } else {
      setPhoneError(null);
    }
    return valid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);
    setSubmitError(false);
    onFormAttempt();

    // Canonical phone — normalized to +9715XXXXXXXX, exactly the field the
    // contact form sends. Popup NEVER sends a `whatsapp` field (plan §8).
    const normalizedPhone = `+971 ${phone.trim()}`;

    try {
      const res = await fetch(APPS_SCRIPT.url, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name: name.trim(),
          phone: normalizedPhone,
          email: "",
          source: "popup",
          pageType: context.pageType,
          pageSlug: context.pageSlug,
          serviceInterest: context.serviceInterest,
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
          ...readUtm(),
          locale: context.locale,
          token: APPS_SCRIPT.token,
          submittedAt: new Date().toISOString(),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success !== true) throw new Error("submit failed");

      onSubmitSuccess();
      setSubmitted(true);
    } catch {
      setSubmitError(true);
      onSubmitError();
    } finally {
      setSending(false);
    }
  };

  /* ---------- Success state ---------- */
  if (submitted) {
    return (
      <div className="text-center">
        <CheckCircle2
          size={44}
          strokeWidth={1.75}
          className="mx-auto text-success-green"
        />
        <p className="mt-3 text-h4 font-bold text-heading-text">{t.successTitle}</p>
        <p className="mt-2 text-body-sm text-body-text">{t.successBody}</p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onWhatsAppClick}
          className="mt-5 inline-block text-body-sm font-medium text-link-blue underline-offset-2 hover:underline"
        >
          {t.successWhatsApp}
        </a>
      </div>
    );
  }

  /* ---------- Error state (inline + WhatsApp fallback) ---------- */
  if (submitError) {
    return (
      <div className="text-center">
        <AlertCircle
          size={44}
          strokeWidth={1.75}
          className="mx-auto text-red-600"
        />
        <p className="mt-3 text-h4 font-bold text-heading-text">{t.errorTitle}</p>
        <p className="mt-2 text-body-sm text-body-text">{t.errorBody}</p>
        <div className="mt-5 flex flex-col gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onWhatsAppClick}
            className="inline-flex items-center justify-center rounded-md bg-[#25D366] px-4 py-3 text-body-sm font-bold text-white shadow-card transition-colors hover:bg-[#20BD5D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            {t.successWhatsApp}
          </a>
          <button
            type="button"
            onClick={() => setSubmitError(false)}
            className="inline-flex items-center justify-center rounded-md border border-border-light bg-white px-4 py-2.5 text-body-sm font-medium text-body-text transition-colors hover:bg-light-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            {t.retry}
          </button>
        </div>
      </div>
    );
  }

  /* ---------- Form ---------- */
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label
          htmlFor="popup-name"
          className="block text-caption font-medium text-body-text"
        >
          {t.nameLabel}
        </label>
        <input
          id="popup-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.namePlaceholder}
          aria-invalid={nameError ? true : undefined}
          className={`mt-1 w-full rounded-md border bg-card-bg px-3 py-2.5 text-body-sm text-body-text placeholder:text-body-text/40 focus:outline-none focus:ring-2 focus:ring-brand-blue ${
            nameError ? "border-red-500" : "border-border-light"
          }`}
        />
        {nameError ? (
          <p className="mt-1 text-caption text-red-600">{nameError}</p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="popup-phone"
          className="block text-caption font-medium text-body-text"
        >
          {t.phoneLabel}
        </label>
        <div
          className={`mt-1 flex items-center rounded-md border bg-card-bg focus-within:ring-2 focus-within:ring-brand-blue ${
            phoneError ? "border-red-500" : "border-border-light"
          }`}
        >
          <span className="pl-3 text-body-sm font-medium text-body-text/70">
            {t.phonePrefix}
          </span>
          <input
            id="popup-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t.phonePlaceholder}
            aria-invalid={phoneError ? true : undefined}
            className="w-full bg-transparent px-2 py-2.5 text-body-sm text-body-text placeholder:text-body-text/40 focus:outline-none"
          />
        </div>
        {phoneError ? (
          <p className="mt-1 text-caption text-red-600">{phoneError}</p>
        ) : null}
      </div>

      <p className="text-caption text-body-text/60">{t.privacyNote}</p>

      <button
        type="submit"
        disabled={sending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-cta-amber px-4 py-3 text-body-sm font-bold text-white shadow-card transition-colors hover:bg-cta-amber-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue disabled:cursor-not-allowed disabled:opacity-70"
      >
        {sending ? (
          <>
            <Loader2 size={18} strokeWidth={1.75} className="animate-spin" />
            {t.sending}
          </>
        ) : (
          t.submit
        )}
      </button>
    </form>
  );
}

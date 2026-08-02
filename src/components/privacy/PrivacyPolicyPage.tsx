/**
 * PrivacyPolicyPage — Shared server-rendered layout for /privacy-policy (EN)
 * and /ar/privacy-policy (AR).
 *
 * World-class trust-grade legal layout:
 *   hero (H1 + direct-answer block + last updated)
 *   → stats strip (numbers are the most-quoted by AI engines)
 *   → sticky category sidebar + 16 anchorable sections (paragraphs, lists,
 *     data tables with disclaimers, pillar callout, authority links)
 *   → FAQ accordion (text mirrors FAQPage schema verbatim)
 *   → contact CTA (real tel:/wa.me/mailto:/contact-us links, NAP from constant)
 *   → related internal-links block (trust cluster: license, contact, about)
 *
 * All markup uses design tokens (Tailwind classes only, no raw hex), semantic
 * landmarks, and CSS logical properties for automatic RTL support.
 *
 * @see plans/privacy-policy-build-plan.md §6
 * @see .roo/rules/02-DESIGN-TOKEN-SYSTEM.md
 */

import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Clock,
  ScrollText,
  CalendarClock,
  ExternalLink,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";
import type { PrivacyContent, PrivacySection } from "@/types/privacy";
import { NAP } from "@/lib/constants";
import Accordion from "@/components/ui/Accordion";
import PrivacySidebar from "@/components/privacy/PrivacySidebar";

interface PrivacyPolicyPageProps {
  content: PrivacyContent;
  locale?: "en" | "ar";
}

/** Fixed stat icons (order matches the 4-stat strip in both locales). */
const statIcons = [ShieldCheck, Lock, Clock, ScrollText] as const;

export default function PrivacyPolicyPage({
  content,
  locale = "en",
}: PrivacyPolicyPageProps) {
  const prefix = locale === "ar" ? "/ar" : "";
  const whatsappUrl = `https://wa.me/${NAP.whatsapp}?text=${encodeURIComponent(
    content.whatsappMessage,
  )}`;

  const sidebarItems = content.sections.map((section) => ({
    id: section.id,
    label: section.sidebarLabel ?? section.heading,
  }));

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="bg-brand-blue px-4 py-14 md:px-8 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white rounded-full px-4 py-1.5 mb-5">
            <ShieldCheck size={18} strokeWidth={1.75} />
            <span className="text-caption font-medium uppercase tracking-wide">
              {content.badgeLabel}
            </span>
          </div>
          <h1 className="text-h1 font-montserrat text-white mb-4">{content.h1}</h1>
          <p className="text-body-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            {content.directAnswer}
          </p>
          <p className="mt-5 inline-flex items-center gap-2 text-body-sm text-white/70">
            <CalendarClock size={16} strokeWidth={1.75} />
            <span>
              {content.lastUpdatedLabel}: {content.lastUpdated}
            </span>
          </p>
        </div>
      </section>

      {/* ===== Stats strip ===== */}
      <section className="bg-light-bg">
        <div className="max-w-6xl mx-auto px-4 py-8 md:px-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {content.stats.map((stat, index) => {
              const Icon = statIcons[index] ?? ShieldCheck;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-border-light p-5 text-center shadow-card"
                >
                  <Icon
                    size={24}
                    strokeWidth={1.75}
                    className="mx-auto mb-3 text-brand-blue"
                  />
                  <p className="text-h3 font-montserrat text-brand-blue mb-1">
                    {stat.value}
                  </p>
                  <p className="text-caption text-body-text">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Sidebar + Content ===== */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
          <div className="lg:grid lg:grid-cols-[18rem_1fr] lg:gap-10">
            <PrivacySidebar items={sidebarItems} ariaLabel={content.sidebarAriaLabel} />

            <article className="min-w-0 mt-8 lg:mt-0">
              {content.sections.map((section) => renderSection(section, content.disclaimer))}
            </article>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-light-bg" aria-labelledby="privacy-faq-heading">
        <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
          <div className="lg:ps-[18rem] lg:gap-10">
            <div className="max-w-3xl">
              <div className="mb-8">
                <h2
                  id="privacy-faq-heading"
                  className="text-h2 font-montserrat text-heading-text mb-3"
                >
                  {content.faqTitle}
                </h2>
                {content.faqSubtitle && (
                  <p className="text-body-lg text-body-text">{content.faqSubtitle}</p>
                )}
              </div>
              <div className="bg-white rounded-lg border border-border-light p-6 shadow-card">
                <Accordion
                  items={content.faqs.map((item, index) => ({
                    id: `privacy-faq-${index}`,
                    title: item.question,
                    content: <p>{item.answer}</p>,
                  }))}
                  defaultOpenIndex={0}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Contact CTA ===== */}
      <section className="bg-brand-blue px-4 py-14 md:px-8 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-h2 font-montserrat text-white mb-3">{content.contactTitle}</h2>
          <p className="text-body-lg text-white/90 leading-relaxed mb-8">
            {content.contactBody}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`${prefix}/contact-us`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-body font-medium rounded-md bg-cta-amber text-brand-black hover:bg-cta-amber-hover transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cta-amber"
            >
              {content.contactCtaLabel}
            </Link>
            <a
              href={`tel:${NAP.phone}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-body font-medium rounded-md bg-white/10 text-white hover:bg-white/20 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
              aria-label={`${content.callCtaLabel} ${NAP.phone}`}
            >
              <Phone size={20} strokeWidth={1.75} />
              {content.callCtaLabel}
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-body font-medium rounded-md bg-white/10 text-white hover:bg-white/20 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
              aria-label={content.whatsappCtaLabel}
            >
              <MessageCircle size={20} strokeWidth={1.75} />
              {content.whatsappCtaLabel}
            </a>
          </div>
          <p className="mt-6 text-body-sm text-white/70">
            {NAP.email} · {NAP.phone}
          </p>
        </div>
      </section>

      {/* ===== Related links (internal trust cluster) ===== */}
      <section className="bg-white" aria-labelledby="privacy-related-heading">
        <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
          <div className="text-center mb-10">
            <h2
              id="privacy-related-heading"
              className="text-h2 font-montserrat text-heading-text mb-3"
            >
              {content.relatedTitle}
            </h2>
            <p className="text-body-lg text-body-text max-w-2xl mx-auto">
              {content.relatedIntro}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={`${prefix}${link.href}`}
                className="group block bg-light-bg border border-border-light rounded-lg p-6 shadow-card hover:shadow-dropdown hover:border-brand-blue/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
              >
                <h3 className="text-body font-semibold text-brand-blue group-hover:text-brand-blue-hover mb-2">
                  {link.label}
                </h3>
                <p className="text-body-sm text-body-text leading-relaxed">
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================================================
   Section renderer (server-safe)
   ============================================================ */

function renderSection(section: PrivacySection, disclaimer: string) {
  return (
    <section
      key={section.id}
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="scroll-mt-28 border-b border-border-light py-10 first:pt-0 last:border-b-0"
    >
      <h2
        id={`${section.id}-heading`}
        className="text-h3 font-montserrat text-heading-text mb-4"
      >
        {section.heading}
      </h2>

      {section.callout && (
        <div className="bg-card-bg border-s-4 border-brand-blue rounded-md p-6 mb-6">
          <h3 className="text-body font-semibold text-brand-blue mb-2">
            {section.callout.title}
          </h3>
          <p className="text-body-sm text-body-text leading-relaxed">
            {section.callout.body}
          </p>
        </div>
      )}

      {section.paragraphs.map((paragraph, index) => (
        <p key={index} className="text-body text-body-text leading-relaxed mb-4">
          {paragraph}
        </p>
      ))}

      {section.lists?.map((list, listIndex) => (
        <div key={listIndex} className="mb-4">
          {list.intro && (
            <p className="text-body text-body-text leading-relaxed mb-2">{list.intro}</p>
          )}
          <ul className="list-disc ps-5 space-y-2">
            {list.items.map((item, itemIndex) => (
              <li
                key={itemIndex}
                className="text-body text-body-text leading-relaxed"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {section.table && (
        <div className="mb-4">
          {section.table.caption && (
            <p className="text-caption font-semibold text-heading-text uppercase tracking-wide mb-2">
              {section.table.caption}
            </p>
          )}
          <div className="overflow-x-auto rounded-lg border border-border-light">
            <table className="w-full text-start border-collapse">
              <thead>
                <tr className="bg-light-bg">
                  {section.table.headers.map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-4 py-3 text-caption font-semibold text-heading-text border-b border-border-light"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.table.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? "bg-white" : "bg-light-bg/50"}
                  >
                    {row.cells.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-4 py-3 text-body-sm text-body-text border-b border-border-light align-top"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-caption text-body-text/70 italic">
            {disclaimer}
          </p>
        </div>
      )}

      {section.links && section.links.length > 0 && (
        <ul className="space-y-2 mt-2">
          {section.links.map((link, index) => (
            <li key={index}>
              {link.href.startsWith("http") ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-body-sm font-medium text-link-blue hover:text-brand-blue transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
                >
                  {link.label}
                  {link.external && <ExternalLink size={14} strokeWidth={1.75} />}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-2 text-body-sm font-medium text-link-blue hover:text-brand-blue transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/**
 * SocialIconsRow — Shared component rendering all 9 social media icon links.
 *
 * Two variants:
 *   - "footer"   → white-on-blue, small 16px icons in 9x9 rounded circles
 *   - "contact"  → card-bg background, larger 20px icons in 12x12 circles
 *                  with hover:scale-110 + hover:bg-brand-blue + hover:text-white
 *
 * @see /plans/social-media-update-plan.md
 */

"use client";

import type { FC } from "react";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { SOCIAL } from "@/lib/constants";

/* ============================================================
   Custom SVG Icons (platforms without lucide-react equivalents)
   ============================================================ */

interface IconProps {
  size: number;
  strokeWidth: number;
}

function ThreadsIcon({ size, strokeWidth }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8c-2.5 0-4 1.5-4 4s1.5 4 4 4c2 0 3-1 3-2.5S14 11 12 11c-1 0-1.5.5-1.5 1.5s.5 1.5 1.5 1.5" />
    </svg>
  );
}

function PinterestIcon({ size, strokeWidth }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14v4" />
      <path d="M10 11c.6-.8 1.5-1 2.5-1 1.5 0 2.5 1 2.5 2.5v1c0 1-.8 1.5-1.5 1.5s-1.5-.5-1.5-1.5V11" />
    </svg>
  );
}

function TikTokIcon({ size, strokeWidth }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path d="M15 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path d="M15 16V6" />
      <path d="M15 6c2 0 3-1 3-3" />
    </svg>
  );
}

function RedditIcon({ size, strokeWidth }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="15" r="6" />
      <circle cx="9" cy="14" r="1" fill="currentColor" />
      <circle cx="15" cy="14" r="1" fill="currentColor" />
      <path d="M12 17c-1 0-1.5-.5-1.5-1" />
      <path d="M10 9c2-1.5 5-1 5 1" />
      <path d="M14 9c-2-1.5-5-1-5 1" />
    </svg>
  );
}

function QuoraIcon({ size, strokeWidth }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M10 8c3 0 4 1.5 4 3s-1 3-4 3" />
      <path d="M14.5 16.5c.5-.5 1-1.2 1-2s-.5-2-1.5-2.5" />
    </svg>
  );
}

/* ============================================================
   Social Links Config
   ============================================================ */

interface SocialLink {
  label: string;
  href: string;
  icon: FC<IconProps>;
}

const SOCIAL_LINKS: SocialLink[] = [
  { label: "Facebook", href: SOCIAL.facebook, icon: Facebook },
  { label: "Instagram", href: SOCIAL.instagram, icon: Instagram },
  { label: "Threads", href: SOCIAL.threads, icon: ThreadsIcon },
  { label: "LinkedIn", href: SOCIAL.linkedin, icon: Linkedin },
  { label: "Pinterest", href: SOCIAL.pinterest, icon: PinterestIcon },
  { label: "YouTube", href: SOCIAL.youtube, icon: Youtube },
  { label: "TikTok", href: SOCIAL.tiktok, icon: TikTokIcon },
  { label: "Reddit", href: SOCIAL.reddit, icon: RedditIcon },
  { label: "Quora", href: SOCIAL.quora, icon: QuoraIcon },
];

/* ============================================================
   Component
   ============================================================ */

interface SocialIconsRowProps {
  /** Styling variant — "footer" (default) or "contact" */
  variant?: "footer" | "contact";
  /** Additional CSS classes to append */
  className?: string;
}

export default function SocialIconsRow({
  variant = "footer",
  className = "",
}: SocialIconsRowProps) {
  const isContact = variant === "contact";

  const linkClasses = isContact
    ? "inline-flex items-center justify-center w-12 h-12 rounded-full bg-card-bg text-body-text/70 hover:bg-brand-blue hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
    : "inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue";

  const iconSize = isContact ? 20 : 16;

  return (
    <div className={`flex items-center gap-3 flex-wrap ${className}`}>
      {SOCIAL_LINKS.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClasses}
            aria-label={`Follow us on ${social.label}`}
          >
            <Icon size={iconSize} strokeWidth={1.75} />
          </a>
        );
      })}
    </div>
  );
}

/** Re-export for use in data configs */
export { SOCIAL_LINKS };

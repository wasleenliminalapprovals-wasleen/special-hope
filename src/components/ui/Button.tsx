/**
 * Button — Reusable button component with variants.
 *
 * Variants:
 * - `primary`   → brand-blue background (default)
 * - `cta`       → amber accent (reserved for primary CTAs)
 * - `outline`   → brand-blue border, transparent bg
 * - `ghost`     → no border/bg, text only
 *
 * When `href` is provided → renders an `<a>` tag (server-rendered link).
 * When `onClick` is provided → renders a `<button>` element.
 *
 * @usage
 * ```tsx
 * <Button variant="cta" href="https://wa.me/971542330837">
 *   Get Free Consultation
 * </Button>
 * <Button variant="primary" onClick={() => trackEvent({...})}>
 *   Click Me
 * </Button>
 * ```
 */

import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "cta" | "outline" | "ghost";

type ButtonProps = {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
  /** When provided, renders as an <a> tag */
  href?: string;
  /** Opens in new tab (only when href is provided) */
  external?: boolean;
  /** Click handler (only when href is NOT provided) */
  onClick?: () => void;
  /** HTML button type attribute */
  type?: "button" | "submit" | "reset";
  /** Disabled state */
  disabled?: boolean;
  /** aria-label for accessibility */
  "aria-label"?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-blue text-white hover:bg-brand-blue-hover focus-visible:ring-brand-blue",
  cta: "bg-cta-amber text-brand-black hover:bg-cta-amber-hover hover:text-brand-black focus-visible:ring-cta-amber",
  outline:
    "border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white focus-visible:ring-brand-blue",
  ghost:
    "text-brand-blue hover:bg-card-bg focus-visible:ring-brand-blue",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 px-6 py-3 text-body font-medium rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

export default function Button({
  variant = "primary",
  children,
  className = "",
  href,
  external = false,
  onClick,
  type = "button",
  disabled = false,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  // Render as a link
  if (href) {
    const isExternal = external || href.startsWith("http") || href.startsWith("//");
    const linkProps = {
      href,
      className: classes,
      "aria-label": ariaLabel,
      ...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {}),
    };

    // Internal route → use Next.js Link for prefetching
    if (!isExternal && (href.startsWith("/") || href.startsWith("#"))) {
      return <Link {...linkProps}>{children}</Link>;
    }

    // External URL → native <a>
    return <a {...linkProps}>{children}</a>;
  }

  // Render as a button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

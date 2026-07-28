/**
 * Card — Reusable content card with optional icon, title, and link.
 *
 * @usage
 * ```tsx
 * <Card
 *   icon={<Building2 size={24} />}
 *   title="DM Approval"
 *   description="Dubai Municipality approval for building permits"
 *   href="/approvals/dubai-municipality-approval"
 * />
 * ```
 */

import Link from "next/link";
import type { ReactNode } from "react";

interface CardProps {
  /** Optional icon component (Lucide icon) */
  icon?: ReactNode;
  /** Optional secondary icon (authority logo, rendered beside main icon) */
  secondaryIcon?: ReactNode;
  /** Card title */
  title: string;
  /** Short description */
  description?: string;
  /** Optional link — wraps the card as an <a> */
  href?: string;
  /** Optional badge text */
  badge?: string;
  /** Extra Tailwind classes */
  className?: string;
  children?: ReactNode;
}

export default function Card({
  icon,
  secondaryIcon,
  title,
  description,
  href,
  badge,
  className = "",
  children,
}: CardProps) {
  const content = (
    <>
      {(icon || secondaryIcon) && (
        <div className="flex items-center gap-2">
          {icon && (
            <div className="flex items-center justify-center w-12 h-12 rounded-md bg-card-bg text-brand-blue shrink-0">
              {icon}
            </div>
          )}
          {secondaryIcon && (
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-white border border-border-light shrink-0 p-1.5">
              {secondaryIcon}
            </div>
          )}
        </div>
      )}

      {badge && (
        <span className="inline-block px-2 py-0.5 text-caption font-medium rounded-sm bg-card-bg text-brand-blue uppercase tracking-wide">
          {badge}
        </span>
      )}

      <h3 className="text-h4 font-montserrat text-heading-text group-hover:text-link-blue transition-colors duration-300">{title}</h3>

      {description && <p className="text-body-sm text-body-text">{description}</p>}

      {children}
    </>
  );

  const cardClasses = `flex flex-col gap-3 p-6 rounded-md bg-gradient-to-br from-white to-card-bg/30 border border-border-light border-l-2 border-l-transparent shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-brand-blue/40 hover:border-l-4 hover:border-l-brand-blue hover:bg-gradient-to-br hover:from-white hover:to-card-bg ${className}`.trim();

  if (href) {
    const isExternal =
      href.startsWith("http") || href.startsWith("//");
    const linkProps = isExternal
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <Link
        href={href}
        className={`${cardClasses} group cursor-pointer`}
        {...linkProps}
      >
        {content}
      </Link>
    );
  }

  return <div className={`${cardClasses} group`}>{content}</div>;
}

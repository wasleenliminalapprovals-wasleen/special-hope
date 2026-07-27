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
  title,
  description,
  href,
  badge,
  className = "",
  children,
}: CardProps) {
  const content = (
    <>
      {icon && (
        <div className="flex items-center justify-center w-12 h-12 rounded-md bg-card-bg text-brand-blue shrink-0">
          {icon}
        </div>
      )}

      {badge && (
        <span className="inline-block px-2 py-0.5 text-caption font-medium rounded-sm bg-card-bg text-brand-blue uppercase tracking-wide">
          {badge}
        </span>
      )}

      <h3 className="text-h4 font-montserrat text-heading-text">{title}</h3>

      {description && <p className="text-body-sm text-body-text">{description}</p>}

      {children}
    </>
  );

  const cardClasses = `flex flex-col gap-3 p-6 rounded-md bg-white border border-border-light shadow-card transition-shadow duration-200 hover:shadow-dropdown ${className}`.trim();

  if (href) {
    const isExternal =
      href.startsWith("http") || href.startsWith("//");
    const linkProps = isExternal
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <Link
        href={href}
        className={`${cardClasses} cursor-pointer hover:border-brand-blue/30`}
        {...linkProps}
      >
        {content}
      </Link>
    );
  }

  return <div className={cardClasses}>{content}</div>;
}

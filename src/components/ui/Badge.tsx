/**
 * Badge — Small label for status, category, or metadata tags.
 *
 * Variants:
 * - `default`  → card-bg / brand-blue text
 * - `success`  → green bg / green text
 * - `warning`  → amber bg / amber text
 * - `outline`  → transparent with border
 *
 * @usage
 * ```tsx
 * <Badge variant="success">Approved</Badge>
 * <Badge>DM Approval</Badge>
 * ```
 */

import type { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "outline";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-card-bg text-brand-blue",
  success: "bg-success-green/10 text-success-green",
  warning: "bg-cta-amber/10 text-cta-amber",
  outline: "border border-border-light text-body-text",
};

export default function Badge({
  variant = "default",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-sm text-caption font-medium ${variantClasses[variant]} ${className}`.trim()}
    >
      {children}
    </span>
  );
}

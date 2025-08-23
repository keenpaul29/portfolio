"use client";
import * as React from "react";

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "solid" | "soft" | "outline";
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant = "soft", ...props }, ref) => {
  const base = "inline-flex items-center rounded-full text-xs font-medium px-3 py-1";
  const variants = {
    solid: "bg-[color:var(--primary)] text-[color:var(--primary-foreground)]",
    soft: "bg-[color:color-mix(in_srgb,var(--primary)_18%,transparent)] text-[color:var(--primary)] border border-[color:color-mix(in_srgb,var(--primary)_26%,transparent)]",
    outline: "border border-[color:var(--border)] text-[color:var(--foreground)]",
  } as const;
  return <span ref={ref} className={cn(base, variants[variant], className)} {...props} />;
});
Badge.displayName = "Badge";

export default Badge;

"use client";
import * as React from "react";

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[color:var(--primary)] disabled:opacity-60 disabled:cursor-not-allowed";

    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-5 text-sm",
      lg: "h-12 px-6 text-base",
    } as const;

    const variants = {
      primary:
        "bg-[color:var(--primary)] text-[color:var(--primary-foreground)] hover:brightness-95",
      secondary:
        "bg-[color:var(--surface-2)] text-[color:var(--foreground)] border border-[color:var(--border)] hover:bg-[color:color-mix(in_srgb,var(--surface)_80%,transparent)]",
      ghost:
        "bg-transparent text-[color:var(--foreground)] hover:bg-[color:color-mix(in_srgb,var(--surface)_60%,transparent)]"
    } as const;

    return (
      <button
        ref={ref}
        className={cn(base, sizes[size], variants[variant], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;

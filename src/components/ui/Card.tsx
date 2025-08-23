"use client";
import * as React from "react";

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "elevated" | "glass";
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "elevated", ...props }, ref) => {
    const base = "rounded-2xl border border-[color:var(--border)] transition-shadow";
    const styles = {
      elevated: "bg-[color:color-mix(in_srgb,var(--surface)_80%,transparent)] shadow-[0_4px_16px_rgba(0,0,0,0.15)]",
      glass: "glass-morphism",
    } as const;

    return <div ref={ref} className={cn(base, styles[variant], className)} {...props} />;
  }
);
Card.displayName = "Card";

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn("p-6 pb-0", className)} {...props} />
);
export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn("p-6", className)} {...props} />
);
export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

export default Card;

"use client";
import * as React from "react";

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg" | "xl";
};

const sizes = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-screen-2xl",
} as const;

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(({ className, size = "lg", ...props }, ref) => (
  <div ref={ref} className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizes[size], className)} {...props} />
));
Container.displayName = "Container";

export default Container;

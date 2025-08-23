"use client";
import * as React from "react";
import { Container } from "./Container";

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

export type SectionProps = React.HTMLAttributes<HTMLElement> & {
  bleed?: boolean;
  containerSize?: "sm" | "md" | "lg" | "xl";
};

export const Section: React.FC<SectionProps> = ({ className, children, bleed = false, containerSize = "lg", ...props }) => {
  const content = (
    <Container size={containerSize}>
      {children}
    </Container>
  );
  return (
    <section className={cn("py-16 md:py-24", className)} {...props}>
      {bleed ? children : content}
    </section>
  );
};

export default Section;

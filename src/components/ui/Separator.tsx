"use client";
import * as React from "react";

export const Separator: React.FC<React.HTMLAttributes<HTMLHRElement>> = ({ className, ...props }) => (
  <hr className={"my-8 h-px border-0 bg-[color:var(--border)] " + (className ?? "")} {...props} />
);

export default Separator;

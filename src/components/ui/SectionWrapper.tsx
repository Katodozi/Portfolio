"use client";

import { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  withAurora?: boolean;
  withGrid?: boolean;
}

export default function SectionWrapper({
  id,
  children,
  className = "",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`section-padding relative overflow-hidden ${className}`}
    >
      <div className="section-container relative z-10">{children}</div>
    </section>
  );
}

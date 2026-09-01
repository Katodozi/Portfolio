"use client";

import { ReactNode } from "react";
import SectionDivider from "@/components/ui/SectionDivider";

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
      className={`section-padding relative overflow-visible ${className}`}
    >
      <SectionDivider />
      <div className="section-container relative z-10">{children}</div>
    </section>
  );
}

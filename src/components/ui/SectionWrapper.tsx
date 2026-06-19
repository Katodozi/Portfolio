"use client";

import { ReactNode } from "react";
import ParallaxLayer from "@/components/ui/ParallaxLayer";

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
  withAurora = false,
  withGrid = false,
}: SectionWrapperProps) {
  return (
    <section id={id} className={`section-padding relative overflow-hidden ${className}`}>
      {withAurora && (
        <ParallaxLayer speed={-0.15} className="aurora-bg" />
      )}
      {withGrid && (
        <ParallaxLayer speed={0.2} className="absolute inset-0 grid-bg-perspective opacity-60" />
      )}
      <div className="noise-overlay" />
      <div className="section-container relative z-10">{children}</div>
    </section>
  );
}

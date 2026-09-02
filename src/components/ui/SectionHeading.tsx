"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  number: string;
  title: string;
  highlight: string;
  subtitle?: string;
}

export default function SectionHeading({
  number,
  title,
  highlight,
  subtitle,
}: SectionHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const words = `${title} ${highlight}`.trim().split(/\s+/);
  const label = `// ${title ? `${title} ${highlight}` : highlight}`
    .toLowerCase()
    .replace(/\s+/g, " ");

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const wordEls = headingRef.current?.querySelectorAll(".heading-word");
      if (!wordEls?.length) return;

      if (prefersReduced) {
        gsap.set(wordEls, { opacity: 1, y: 0 });
        if (lineRef.current) gsap.set(lineRef.current, { scaleX: 1 });
        return;
      }

      gsap.from(wordEls, {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
      });

      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleX: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        });
      }
    },
    { scope: headingRef }
  );

  return (
    <div className="mb-12">
      <span className="section-number">{number}</span>
      <span className="mb-2 block font-mono text-xs tracking-[0.15em] text-primary">
        {label}
      </span>
      <h2 ref={headingRef} className="section-heading">
        {words.map((word, i) => {
          const isHighlight = highlight.split(" ").includes(word);
          return (
            <span
              key={`${word}-${i}`}
              className={isHighlight ? "heading-word text-primary" : "heading-word"}
              style={{ display: "inline-block", marginRight: "0.35em" }}
            >
              {word}
            </span>
          );
        })}
      </h2>
      {subtitle && <p className="section-subheading !mb-0">{subtitle}</p>}
      <div ref={lineRef} className="heading-accent-line" />
    </div>
  );
}

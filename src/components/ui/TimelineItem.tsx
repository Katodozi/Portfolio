"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

interface TimelineItemProps {
  title: string;
  subtitle: string;
  period: string;
  isLast?: boolean;
  ongoing?: boolean;
  index: number;
}

export default function TimelineItem({
  title,
  subtitle,
  period,
  isLast = false,
  ongoing = false,
  index,
}: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!itemRef.current) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) {
        gsap.set(itemRef.current, { opacity: 1, x: 0 });
        if (dotRef.current) gsap.set(dotRef.current, { scale: 1 });
        if (lineRef.current) gsap.set(lineRef.current, { scaleY: 1 });
        return;
      }

      gsap.fromTo(
        itemRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: itemRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.15,
        }
      );

      if (dotRef.current) {
        gsap.fromTo(
          dotRef.current,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.4,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: itemRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.15,
          }
        );
      }

      if (lineRef.current && !isLast) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.8,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: itemRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.15 + 0.2,
          }
        );
      }
    },
    { scope: itemRef, dependencies: [index, isLast] }
  );

  return (
    <div ref={itemRef} className="relative flex gap-6 pb-10 opacity-0">
      <div className="relative flex flex-col items-center">
        <div
          ref={dotRef}
          className={clsx(
            "relative z-10 h-3 w-3 rounded-full border-2",
            ongoing
              ? "border-accent bg-accent/20 glow-dot"
              : "border-primary bg-surface"
          )}
        />
        {!isLast && (
          <div
            ref={lineRef}
            className="absolute top-3 h-full w-px origin-top bg-border"
            style={{ minHeight: "60px" }}
          />
        )}
      </div>

      <div className="flex-1 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-heading text-base font-semibold text-text md:text-lg">
            {title}
          </h3>
          {ongoing && (
            <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-xs text-accent">
              Ongoing
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-primary">{subtitle}</p>
        <p className="mt-1 font-mono text-xs text-muted">{period}</p>
      </div>
    </div>
  );
}

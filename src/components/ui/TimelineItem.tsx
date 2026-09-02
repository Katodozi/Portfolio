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
          delay: index * 0.12,
        }
      );

      if (dotRef.current) {
        gsap.fromTo(
          dotRef.current,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: itemRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.12,
          }
        );
      }

      if (lineRef.current && !isLast) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: itemRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.12 + 0.15,
          }
        );
      }
    },
    { scope: itemRef, dependencies: [index, isLast] }
  );

  return (
    <div ref={itemRef} className="relative flex gap-6 pb-8 opacity-0">
      <div className="relative flex flex-col items-center">
        <div
          ref={dotRef}
          data-timeline-dot
          className={clsx(
            "relative z-10 h-3 w-3 rounded-full bg-primary pulse-glow",
            ongoing && "ring-2 ring-primary/30"
          )}
        />
        {!isLast && (
          <div
            ref={lineRef}
            className="absolute top-3 h-full w-px origin-top bg-border-2"
            style={{ minHeight: "50px" }}
          />
        )}
      </div>

      <div className="flex-1 pb-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-heading text-base font-semibold text-primary md:text-lg">
            {title}
          </h3>
          {ongoing && (
            <span className="rounded-sharp border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary">
              Current
            </span>
          )}
        </div>
        <p className="mt-1 font-heading text-sm font-medium text-text md:text-base">
          {subtitle}
        </p>
        <p className="mt-1 font-mono text-xs text-muted">{period}</p>
      </div>
    </div>
  );
}

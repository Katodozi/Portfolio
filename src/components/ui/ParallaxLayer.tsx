"use client";

import { useRef, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxLayerProps {
  children?: ReactNode;
  speed?: number;
  className?: string;
  direction?: "y" | "x";
}

export default function ParallaxLayer({
  children,
  speed = 0.3,
  className = "",
  direction = "y",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const prop = direction === "y" ? "yPercent" : "xPercent";
      const value = speed * 100;

      gsap.to(ref.current, {
        [prop]: value,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    },
    { scope: ref, dependencies: [speed, direction] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

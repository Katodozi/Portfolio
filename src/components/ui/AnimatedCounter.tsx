"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  label,
}: AnimatedCounterProps) {
  const numberRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const { ref, inView } = useInView({ threshold: 0.35, triggerOnce: true });

  useEffect(() => {
    if (!inView || hasAnimated.current || !numberRef.current) return;
    hasAnimated.current = true;

    const obj = { value: 0 };
    gsap.to(obj, {
      value,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.textContent = `${Math.round(obj.value)}${suffix}`;
        }
      },
    });
  }, [inView, value, suffix]);

  return (
    <div
      ref={ref}
      className="glow-card rounded-md border border-border-2 bg-surface px-3 py-5 text-center transition-all duration-200 hover:border-primary md:px-4 md:py-6"
    >
      <div
        ref={numberRef}
        className="font-heading text-3xl font-bold text-primary md:text-4xl"
      >
        0{suffix}
      </div>
      <div className="mt-2 font-mono text-xs text-muted">{label}</div>
    </div>
  );
}

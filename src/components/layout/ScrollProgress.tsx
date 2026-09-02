"use client";

import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => {
      setProgress(lenis.progress * 100);
    };

    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [lenis]);

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[99999] h-[2px] w-full">
      <div
        className="h-full origin-left"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))",
          boxShadow: "0 0 8px rgba(91,184,212,0.5)",
        }}
      />
    </div>
  );
}

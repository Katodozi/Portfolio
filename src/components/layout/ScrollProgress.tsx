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
    <div className="fixed left-0 top-0 z-[60] h-[2px] w-full">
      <div
        className="h-full origin-left bg-gradient-to-r from-primary via-accent to-glow transition-transform duration-100 ease-out glow-line"
        style={{
          transform: `scaleX(${progress / 100})`,
          width: "100%",
        }}
      />
    </div>
  );
}

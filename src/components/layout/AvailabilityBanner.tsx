"use client";

import { useLenis } from "lenis/react";

export default function AvailabilityBanner() {
  const lenis = useLenis();

  const handleClick = () => {
    const target = document.querySelector("#contact");
    if (target && lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: -120, duration: 1.2 });
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Open to freelance and full-time opportunities — go to contact"
      data-cursor="pointer"
      className="fixed left-0 right-0 top-0 z-[55] flex h-9 w-full items-center justify-center gap-2 border-b border-primary/20 bg-[#0A0A0F]/90 px-3 font-mono text-[11px] text-text-2 backdrop-blur-md transition-colors duration-200 hover:text-primary md:text-xs"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      <span className="truncate">
        Open to freelance &amp; full-time opportunities — Let&apos;s talk →
      </span>
    </button>
  );
}

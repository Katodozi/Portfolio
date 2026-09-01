"use client";

import { useId } from "react";

export default function SectionDivider() {
  const id = useId().replace(/:/g, "");

  return (
    <div
      className="pointer-events-none absolute left-0 right-0 top-0 h-12 w-full md:h-16"
      aria-hidden="true"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 32L80 28C160 24 320 16 480 20C640 24 800 40 960 44C1120 48 1280 40 1360 36L1440 32V64H0V32Z"
          fill={`url(#${id})`}
        />
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0A0A0F" stopOpacity="0" />
            <stop offset="100%" stopColor="#0F0F1A" stopOpacity="0.45" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

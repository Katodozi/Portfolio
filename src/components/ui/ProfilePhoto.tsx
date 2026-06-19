"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "@/lib/data";
import { imageReveal, profileBlurDataURL } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

interface ProfilePhotoProps {
  size?: "hero" | "about";
  priority?: boolean;
  className?: string;
}

const sizeMap = {
  hero: { width: 380, height: 475, sizes: "(max-width: 768px) 280px, 380px" },
  about: { width: 280, height: 350, sizes: "(max-width: 768px) 200px, 280px" },
};

export default function ProfilePhoto({
  size = "hero",
  priority = false,
  className = "",
}: ProfilePhotoProps) {
  const [imgSrc, setImgSrc] = useState(personalInfo.profileImageFallback);
  const containerRef = useRef<HTMLDivElement>(null);
  const dims = sizeMap[size];

  useEffect(() => {
    const probe = new window.Image();
    probe.src = personalInfo.profileImage;
    probe.onload = () => setImgSrc(personalInfo.profileImage);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.to(containerRef.current, {
        yPercent: size === "hero" ? -12 : -8,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    },
    { scope: containerRef, dependencies: [size] }
  );

  return (
    <motion.div
      ref={containerRef}
      variants={imageReveal}
      initial="hidden"
      animate="visible"
      className={`relative ${className}`}
    >
      <div
        className={`tech-frame relative overflow-hidden rounded-2xl bg-surface ${
          size === "hero" ? "w-[280px] md:w-[340px] lg:w-[380px]" : "w-[200px] md:w-[260px] lg:w-[280px]"
        }`}
      >
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/20 via-glow/10 to-primary/20 blur-2xl" />

        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
          <Image
            src={imgSrc}
            alt={`${personalInfo.name} — profile photo`}
            width={dims.width}
            height={dims.height}
            sizes={dims.sizes}
            priority={priority}
            placeholder="blur"
            blurDataURL={profileBlurDataURL}
            className="h-full w-full object-cover object-top"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
          <div className="scanlines rounded-2xl" />
        </div>

        {/* Corner accents */}
        <span className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-accent" />
        <span className="absolute -right-px -top-px h-4 w-4 border-r-2 border-t-2 border-glow" />
        <span className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-primary" />
        <span className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-accent" />
      </div>

      {/* Status badge */}
      <div className="absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full glass px-4 py-1.5">
        <span className="relative flex items-center gap-2 font-mono text-xs text-accent">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent glow-dot" />
          Available for work
        </span>
      </div>
    </motion.div>
  );
}

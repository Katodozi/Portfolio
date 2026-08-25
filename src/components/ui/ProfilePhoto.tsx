"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";
import { personalInfo } from "@/lib/data";
import { imageReveal, profileBlurDataURL } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

interface ProfilePhotoProps {
  size?: "hero" | "about";
  layout?: "default" | "sticky" | "mobile";
  priority?: boolean;
  className?: string;
}

const sizeMap = {
  hero: { width: 380, height: 475, sizes: "(max-width: 768px) 280px, 380px" },
  about: { width: 300, height: 400, sizes: "(max-width: 1024px) 100vw, 300px" },
};

export default function ProfilePhoto({
  size = "hero",
  layout = "default",
  priority = false,
  className = "",
}: ProfilePhotoProps) {
  const [imgSrc, setImgSrc] = useState(personalInfo.profileImage);
  const [useBlur, setUseBlur] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const dims = sizeMap[size];

  const handleImageError = () => {
    setImgSrc(personalInfo.profileImageFallback);
    setUseBlur(false);
  };

  useGSAP(
    () => {
      if (!containerRef.current || size !== "hero") return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.to(containerRef.current, {
        yPercent: -8,
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

  const isAboutSticky = size === "about" && layout === "sticky";
  const isAboutMobile = size === "about" && layout === "mobile";

  const imageBlock = (
    <div
      className={clsx(
        "group relative overflow-hidden bg-surface",
        isAboutSticky && "w-full max-w-[300px] rounded-xl border border-primary/20 profile-glow",
        isAboutMobile && "w-full max-h-[300px] rounded-xl border border-primary/20 profile-glow",
        size === "hero" &&
          "rounded-lg border border-border-2 w-[280px] md:w-[340px] lg:w-[380px]",
        size === "about" && layout === "default" &&
          "rounded-lg border border-border-2 w-[200px] md:w-[260px] lg:w-[280px]"
      )}
      style={
        size === "hero"
          ? { boxShadow: "0 0 40px rgba(91, 184, 212, 0.1)" }
          : undefined
      }
    >
      <div
        className={clsx(
          "relative overflow-hidden",
          isAboutSticky && "aspect-[3/4]",
          isAboutMobile && "h-[300px]",
          !isAboutSticky && !isAboutMobile && "aspect-[4/5]"
        )}
      >
        <Image
          src={imgSrc}
          alt={`${personalInfo.name} — profile photo`}
          width={dims.width}
          height={dims.height}
          sizes={dims.sizes}
          priority={priority}
          placeholder={useBlur ? "blur" : "empty"}
          blurDataURL={useBlur ? profileBlurDataURL : undefined}
          onError={handleImageError}
          className="h-full w-full object-cover object-top"
        />
        <div
          className={clsx(
            "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent",
            isAboutSticky || isAboutMobile
              ? "h-24 rounded-b-xl from-[#0A0A0F]/40"
              : "inset-0 from-bg/50 via-transparent"
          )}
        />
      </div>
    </div>
  );

  if (isAboutSticky || isAboutMobile) {
    return (
      <div ref={containerRef} className={className}>
        {imageBlock}
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      variants={imageReveal}
      initial="hidden"
      animate="visible"
      className={`relative ${className}`}
    >
      {imageBlock}

      {size === "hero" && (
        <div className="badge-available absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-sharp border border-primary/30 bg-primary/10 px-3 py-1.5">
          <span className="relative flex items-center gap-2 font-mono text-xs text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
            Available for work
          </span>
        </div>
      )}
    </motion.div>
  );
}

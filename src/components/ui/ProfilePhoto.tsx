"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";
import { personalInfo } from "@/lib/data";
import { imageReveal, profileBlurDataURL } from "@/lib/animations";

interface ProfilePhotoProps {
  size?: "hero" | "about";
  layout?: "default" | "sticky" | "mobile";
  priority?: boolean;
  className?: string;
}

const sizeMap = {
  hero: { width: 280, height: 350, sizes: "(max-width: 768px) 220px, 280px" },
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

  if (size === "hero") {
    return (
      <div ref={containerRef} className={clsx("relative", className)}>
        <span
          className="absolute -left-4 -top-3 h-1.5 w-1.5 rounded-full bg-accent opacity-60"
          style={{ animation: "float-deco 3s ease-in-out infinite alternate" }}
          aria-hidden="true"
        />
        <span
          className="absolute -right-3 -top-4 h-3 w-3 rounded-full border-[1.5px] border-primary/40"
          style={{ animation: "float-deco 4s ease-in-out infinite alternate-reverse" }}
          aria-hidden="true"
        />
        <span
          className="absolute -bottom-2 -left-3 h-2 w-2 border-[1.5px] border-accent/30"
          style={{
            transform: "rotate(45deg)",
            animation: "float-deco 3.5s ease-in-out infinite alternate",
          }}
          aria-hidden="true"
        />

        <div className="hero-photo-card overflow-hidden">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[16px]">
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
              className="h-full w-full rounded-[inherit] object-cover object-top"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] rounded-b-[16px]"
              style={{
                background: "linear-gradient(to top, rgba(10,10,15,0.5), transparent)",
              }}
            />
            <span
              className="pointer-events-none absolute -right-px -top-px h-5 w-5 rounded-tr-[16px] border-r-2 border-t-2 border-accent/80"
              aria-hidden="true"
            />
          </div>
        </div>

        <div
          className="absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border px-3.5 py-1.5 font-mono text-[11px]"
          style={{
            background: "rgba(10,10,15,0.9)",
            borderColor: "rgba(91,184,212,0.3)",
            boxShadow: "0 0 15px rgba(91,184,212,0.15)",
          }}
        >
          <span className="flex items-center gap-2 text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for work
          </span>
        </div>
      </div>
    );
  }

  const isAboutSticky = layout === "sticky";
  const isAboutMobile = layout === "mobile";

  return (
    <motion.div
      ref={containerRef}
      variants={imageReveal}
      initial="hidden"
      animate="visible"
      className={`relative ${className}`}
    >
      <div
        className={clsx(
          "group relative overflow-hidden bg-surface",
          isAboutSticky && "w-full max-w-[300px] rounded-xl border border-primary/20 profile-glow",
          isAboutMobile && "w-full max-h-[300px] rounded-xl border border-primary/20 profile-glow",
          layout === "default" &&
            "w-[200px] rounded-lg border border-border-2 md:w-[260px] lg:w-[280px]"
        )}
      >
        <div
          className={clsx(
            "relative overflow-hidden",
            isAboutSticky && "aspect-[3/4]",
            isAboutMobile && "h-[300px]",
            layout === "default" && "aspect-[4/5]"
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
        </div>
      </div>
    </motion.div>
  );
}

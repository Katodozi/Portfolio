"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { personalInfo } from "@/lib/data";
import { FaGithub, FaLinkedin, FaInstagram, FaKaggle } from "react-icons/fa";
import clsx from "clsx";

const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  kaggle: FaKaggle,
};

interface SocialIconsProps {
  size?: number;
  className?: string;
}

export default function SocialIcons({ size = 20, className }: SocialIconsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const icons = container.querySelectorAll<HTMLElement>("[data-magnetic]");

      const onMove = (e: MouseEvent) => {
        icons.forEach((icon) => {
          const rect = icon.getBoundingClientRect();
          const dx = e.clientX - (rect.left + rect.width / 2);
          const dy = e.clientY - (rect.top + rect.height / 2);
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pull = Math.max(0, 1 - dist / 120);
          gsap.to(icon, {
            x: dx * pull * 0.35,
            y: dy * pull * 0.35,
            duration: 0.35,
            ease: "power2.out",
          });
        });
      };

      const onLeave = () => {
        icons.forEach((icon) => {
          gsap.to(icon, { x: 0, y: 0, duration: 0.5, ease: "power3.out" });
        });
      };

      container.addEventListener("mousemove", onMove);
      container.addEventListener("mouseleave", onLeave);

      return () => {
        container.removeEventListener("mousemove", onMove);
        container.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={clsx("flex items-center gap-4", className)}
    >
      {personalInfo.socials.map((social) => {
        const Icon = iconMap[social.icon as keyof typeof iconMap];
        if (!Icon) return null;

        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            data-magnetic
            data-cursor="pointer"
            className="inline-flex text-muted transition-colors duration-200 hover:text-primary"
          >
            <Icon size={size} />
          </a>
        );
      })}
    </div>
  );
}

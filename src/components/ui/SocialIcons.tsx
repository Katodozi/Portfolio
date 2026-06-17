"use client";

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
  return (
    <div className={clsx("flex items-center gap-4", className)}>
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
            className="text-muted transition-colors duration-200 hover:text-accent"
            data-cursor="pointer"
          >
            <Icon size={size} />
          </a>
        );
      })}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { badgeVariants } from "@/lib/animations";

interface SkillBadgeProps {
  skill: string;
  index?: number;
}

export default function SkillBadge({ skill, index = 0 }: SkillBadgeProps) {
  const handleEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    gsap.to(e.currentTarget, {
      boxShadow: "0 0 15px rgba(91,184,212,0.25)",
      borderColor: "rgba(91,184,212,0.6)",
      duration: 0.2,
    });
  };

  const handleLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    gsap.to(e.currentTarget, {
      boxShadow: "none",
      borderColor: "rgba(91,184,212,0.15)",
      duration: 0.3,
    });
  };

  return (
    <motion.span
      variants={badgeVariants}
      custom={index}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="inline-flex items-center rounded-sharp border border-border-2 bg-primary/5 px-2.5 py-1 font-mono text-xs text-text-2 md:text-sm"
    >
      {skill}
    </motion.span>
  );
}

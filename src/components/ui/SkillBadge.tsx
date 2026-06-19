"use client";

import { motion } from "framer-motion";
import { badgeVariants } from "@/lib/animations";

interface SkillBadgeProps {
  skill: string;
  index?: number;
}

export default function SkillBadge({ skill, index = 0 }: SkillBadgeProps) {
  return (
    <motion.span
      variants={badgeVariants}
      custom={index}
      className="inline-flex items-center rounded-lg border border-border/60 bg-bg/40 px-3 py-1.5 font-mono text-xs text-text backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:bg-accent/5 hover:text-accent hover:glow-accent md:text-sm"
      whileHover={{ scale: 1.05, y: -2 }}
    >
      {skill}
    </motion.span>
  );
}

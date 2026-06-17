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
      className="inline-flex items-center rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text transition-colors duration-200 hover:border-accent/50 hover:text-accent md:text-sm"
      whileHover={{ scale: 1.05 }}
    >
      {skill}
    </motion.span>
  );
}

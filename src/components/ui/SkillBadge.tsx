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
      className="inline-flex items-center rounded-sharp border border-border-2 bg-primary/5 px-2.5 py-1 font-mono text-xs text-text-2 transition-all duration-200 hover:border-primary hover:bg-primary/10 hover:text-text hover:glow-primary-sm md:text-sm"
    >
      {skill}
    </motion.span>
  );
}

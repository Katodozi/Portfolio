"use client";

import { motion } from "framer-motion";
import { wordReveal, staggerContainer } from "@/lib/animations";

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  splitBy?: "word" | "char";
}

export default function TextReveal({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  splitBy = "word",
}: TextRevealProps) {
  const parts = splitBy === "word" ? text.split(" ") : text.split("");

  return (
    <Tag className={className}>
      <motion.span
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="inline"
        style={{ transitionDelay: `${delay}s` }}
      >
        {parts.map((part, i) => (
          <span key={i} className="reveal-mask mr-[0.25em] inline-block last:mr-0">
            <motion.span variants={wordReveal} className="inline-block">
              {part}
              {splitBy === "word" && i < parts.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

"use client";

import { motion } from "framer-motion";
import { skillProficiency } from "@/lib/data";

export default function SkillBars() {
  return (
    <div className="mb-8 space-y-4 rounded-lg border border-border-2 bg-surface p-5 md:p-7">
      <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-primary">
        {"//"} proficiency
      </p>
      {skillProficiency.map((skill) => (
        <div key={skill.name}>
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="font-mono text-xs text-text-2">{skill.name}</span>
            <span className="font-mono text-xs text-primary">{skill.level}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-border-2">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1], delay: 0.1 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

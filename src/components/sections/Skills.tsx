"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { skillGroups } from "@/lib/data";
import SkillBadge from "@/components/ui/SkillBadge";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { SkillCategory } from "@/types";

export default function Skills() {
  const [activeTab, setActiveTab] = useState<SkillCategory>("ai-ml");

  const activeGroup = skillGroups.find((g) => g.id === activeTab);

  return (
    <SectionWrapper id="skills" withGrid>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <SectionHeading
          number="03."
          title="Technical"
          highlight="Skills"
          subtitle="A diverse toolkit spanning AI/ML, full-stack development, CMS/SEO, and DevOps."
        />
      </motion.div>

      <div className="mb-8 flex flex-wrap gap-2">
        {skillGroups.map((group) => (
          <button
            key={group.id}
            onClick={() => setActiveTab(group.id)}
            className={clsx(
              "relative overflow-hidden rounded-lg border px-5 py-2.5 text-sm font-medium transition-all duration-300",
              activeTab === group.id
                ? "border-accent/50 bg-accent/10 text-accent glow-accent"
                : "border-border bg-surface/80 text-muted hover:border-glow/40 hover:text-text card-shine"
            )}
            data-cursor="pointer"
          >
            {group.label}
            {activeTab === group.id && (
              <motion.span
                layoutId="skill-tab"
                className="absolute inset-0 -z-10 bg-gradient-to-r from-accent/5 via-glow/5 to-primary/5"
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="rounded-xl border border-border/60 bg-surface/40 p-6 backdrop-blur-sm md:p-8"
        >
          <div className="flex flex-wrap gap-3">
            {activeGroup?.skills.map((skill, index) => (
              <SkillBadge key={skill} skill={skill} index={index} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  );
}

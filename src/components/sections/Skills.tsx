"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { skillGroups } from "@/lib/data";
import SkillBadge from "@/components/ui/SkillBadge";
import SkillBars from "@/components/ui/SkillBars";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { SkillCategory } from "@/types";

export default function Skills() {
  const [activeTab, setActiveTab] = useState<SkillCategory>("ai-ml");

  const activeGroup = skillGroups.find((g) => g.id === activeTab);

  return (
    <SectionWrapper id="skills">
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

      <SkillBars />

      <div className="mb-6 flex flex-wrap gap-2">
        {skillGroups.map((group) => (
          <button
            key={group.id}
            onClick={() => setActiveTab(group.id)}
            className={clsx(
              "rounded-sharp border px-4 py-2 font-mono text-xs transition-all duration-200 md:text-sm",
              activeTab === group.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-transparent text-muted hover:text-text-2"
            )}
            data-cursor="pointer"
          >
            {group.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="rounded-lg border border-border-2 bg-surface p-5 md:p-7"
        >
          <div className="flex flex-wrap gap-2">
            {activeGroup?.skills.map((skill, index) => (
              <SkillBadge key={skill} skill={skill} index={index} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  );
}

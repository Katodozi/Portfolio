"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { skillGroups } from "@/lib/data";
import SkillBadge from "@/components/ui/SkillBadge";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { SkillCategory } from "@/types";

export default function Skills() {
  const [activeTab, setActiveTab] = useState<SkillCategory>("ai-ml");

  const activeGroup = skillGroups.find((g) => g.id === activeTab);

  return (
    <section id="skills" className="section-padding">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="section-heading">
            Technical <span>Skills</span>
          </h2>
          <p className="section-subheading">
            A diverse toolkit spanning AI/ML, full-stack development, CMS/SEO,
            and DevOps.
          </p>
        </motion.div>

        <div className="mb-8 flex flex-wrap gap-2">
          {skillGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => setActiveTab(group.id)}
              className={clsx(
                "rounded-md border px-4 py-2 text-sm font-medium transition-all duration-200",
                activeTab === group.id
                  ? "border-accent/40 bg-accent/10 text-accent glow-accent"
                  : "border-border bg-surface text-muted hover:border-primary/40 hover:text-text"
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
            exit="hidden"
            className="flex flex-wrap gap-3"
          >
            {activeGroup?.skills.map((skill, index) => (
              <SkillBadge key={skill} skill={skill} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

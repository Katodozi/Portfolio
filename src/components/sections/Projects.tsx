"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { projects, projectFilters } from "@/lib/data";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeInUp } from "@/lib/animations";
import type { ProjectCategory } from "@/types";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <SectionWrapper id="projects" withAurora className="bg-surface/20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <SectionHeading
          number="04."
          title="Featured"
          highlight="Projects"
          subtitle="Open-source tools and full-stack applications — from NLP research to production-ready platforms."
        />
      </motion.div>

      <div className="mb-10 flex flex-wrap gap-2">
        {projectFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={clsx(
              "rounded-lg border px-4 py-2 font-mono text-sm transition-all duration-300",
              activeFilter === filter.id
                ? "border-glow/50 bg-glow/10 text-accent glow-glow"
                : "border-border bg-surface/60 text-muted hover:border-primary/40 hover:text-text"
            )}
            data-cursor="pointer"
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}

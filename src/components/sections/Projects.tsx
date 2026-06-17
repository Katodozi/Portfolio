"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { projects, projectFilters } from "@/lib/data";
import ProjectCard from "@/components/ui/ProjectCard";
import { fadeInUp } from "@/lib/animations";
import type { ProjectCategory } from "@/types";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section-padding bg-surface/30">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="section-heading">
            Featured <span>Projects</span>
          </h2>
          <p className="section-subheading">
            Open-source tools and full-stack applications — from NLP research to
            production-ready platforms.
          </p>
        </motion.div>

        <div className="mb-10 flex flex-wrap gap-2">
          {projectFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={clsx(
                "rounded-md border px-4 py-2 text-sm font-medium transition-all duration-200",
                activeFilter === filter.id
                  ? "border-accent/40 bg-accent/10 text-accent"
                  : "border-border bg-surface text-muted hover:border-primary/40 hover:text-text"
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
      </div>
    </section>
  );
}

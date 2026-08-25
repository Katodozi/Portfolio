"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Tilt from "vanilla-tilt";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import type { Project } from "@/types";
import { cardVariants } from "@/lib/animations";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const categoryLabels: Record<string, string> = {
  "ai-ml": "AI/ML",
  "full-stack": "Full Stack",
  "web-scraping": "Web Scraping",
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 768;

    if (prefersReduced || isMobile) return;

    Tilt.init(card, {
      max: 6,
      speed: 400,
      glare: false,
      scale: 1.01,
    });

    return () => {
      const el = card as HTMLElement & { vanillaTilt?: { destroy: () => void } };
      el.vanillaTilt?.destroy();
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="project-card-glow group flex flex-col rounded-lg border border-border-2 bg-surface p-5 md:p-6"
      style={{ transformStyle: "preserve-3d" }}
    >
      <span className="mb-3 inline-block self-start rounded-sharp bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary">
        {categoryLabels[project.category] ?? project.category}
      </span>

      <h3 className="mb-2 font-heading text-base font-semibold text-text md:text-lg">
        {project.title}
      </h3>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-text-2">
        {project.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.tech.map((tech) => (
          <span key={tech} className="mono-tag">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 border-t border-border pt-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-mono text-xs text-muted transition-colors duration-200 hover:text-primary"
          data-cursor="pointer"
        >
          <FiGithub size={15} />
          <span>Code</span>
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs text-muted transition-colors duration-200 hover:text-primary"
            data-cursor="pointer"
          >
            <FiExternalLink size={15} />
            <span>Live</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}

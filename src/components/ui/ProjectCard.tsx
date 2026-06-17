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
      max: 8,
      speed: 400,
      glare: true,
      "max-glare": 0.1,
      scale: 1.02,
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
      className="group relative flex flex-col rounded-lg border border-border bg-surface p-6 transition-colors duration-300 hover:border-primary/50"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-accent opacity-0 glow-dot transition-opacity duration-300 group-hover:opacity-100" />

      <h3 className="mb-3 font-heading text-lg font-semibold text-text transition-colors group-hover:text-accent">
        {project.title}
      </h3>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      <div className="mb-5 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="rounded border border-border/60 bg-bg/50 px-2 py-0.5 font-mono text-xs text-muted"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
          data-cursor="pointer"
        >
          <FiGithub size={16} />
          <span>Code</span>
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
            data-cursor="pointer"
          >
            <FiExternalLink size={16} />
            <span>Live</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}

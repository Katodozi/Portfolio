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
      max: 10,
      speed: 400,
      glare: true,
      "max-glare": 0.15,
      scale: 1.03,
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
      className="card-shine group relative flex flex-col overflow-hidden rounded-xl border border-border/70 bg-surface/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-glow/40 hover:glow-glow"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-glow/5 blur-2xl transition-all duration-500 group-hover:bg-accent/10" />

      <div className="mb-3 flex items-start justify-between">
        <h3 className="font-heading text-lg font-semibold text-text transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <span className="font-mono text-[10px] text-glow/60">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      <div className="mb-5 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-border/50 bg-bg/60 px-2 py-0.5 font-mono text-xs text-muted transition-colors group-hover:border-primary/30"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 border-t border-border/40 pt-4">
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
            className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-highlight"
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

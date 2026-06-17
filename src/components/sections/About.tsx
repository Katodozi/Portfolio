"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { personalInfo, stats } from "@/lib/data";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { fadeInUp } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!contentRef.current || !statsRef.current) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) return;

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        statsRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
          delay: 0.2,
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/20 to-transparent" />

      <div className="section-container relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="section-heading">
            About <span>Me</span>
          </h2>
          <p className="section-subheading">
            Computer Engineering graduate building intelligent, production-ready
            web solutions.
          </p>
        </motion.div>

        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div ref={contentRef} className="space-y-4">
            <p className="text-base leading-relaxed text-muted md:text-lg">
              {personalInfo.about}
            </p>
            <p className="text-base leading-relaxed text-muted md:text-lg">
              I specialize in bridging AI/ML research with full-stack engineering
              — from NLP tools for Nepali language to locally-hosted LLM platforms
              that eliminate API costs. Currently based in{" "}
              <span className="text-accent">{personalInfo.location}</span>,
              open to freelance projects and collaborations.
            </p>
            <div className="pt-2">
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 font-mono text-sm text-primary transition-colors hover:text-accent"
                data-cursor="pointer"
              >
                <span className="text-accent">&gt;</span>
                {personalInfo.email}
              </a>
            </div>
          </div>

          <div
            ref={statsRef}
            className="grid grid-cols-3 gap-6 rounded-lg border border-border bg-surface/50 p-8"
          >
            {stats.map((stat) => (
              <AnimatedCounter
                key={stat.id}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

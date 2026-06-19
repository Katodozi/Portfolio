"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { personalInfo, stats } from "@/lib/data";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ProfilePhoto from "@/components/ui/ProfilePhoto";
import { fadeInUp } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!contentRef.current || !statsRef.current) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
            delay: 0.15,
          }
        );
      }

      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <SectionWrapper
      id="about"
      withAurora
      withGrid
      className="!pb-16"
    >
      <div ref={sectionRef as React.RefObject<HTMLDivElement>}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <SectionHeading
            number="02."
            title="About"
            highlight="Me"
            subtitle="Computer Engineering graduate building intelligent, production-ready web solutions."
          />
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
          <div ref={photoRef} className="hidden justify-center opacity-0 lg:flex">
            <ProfilePhoto size="about" />
          </div>

          <div className="space-y-8">
            <div ref={contentRef} className="space-y-4">
              <p className="text-base leading-relaxed text-muted md:text-lg">
                {personalInfo.about}
              </p>
              <p className="text-base leading-relaxed text-muted md:text-lg">
                I specialize in bridging{" "}
                <span className="text-highlight">AI/ML research</span> with{" "}
                <span className="text-accent">full-stack engineering</span> —
                from NLP tools for Nepali language to locally-hosted LLM
                platforms that eliminate API costs. Currently based in{" "}
                <span className="text-accent">{personalInfo.location}</span>,
                open to freelance projects and collaborations.
              </p>
              <div className="pt-2">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="group inline-flex items-center gap-2 rounded-md border border-border bg-surface/50 px-4 py-2 font-mono text-sm text-primary transition-all hover:border-accent/40 hover:text-accent hover:glow-accent"
                  data-cursor="pointer"
                >
                  <span className="text-accent">&gt;</span>
                  {personalInfo.email}
                </a>
              </div>
            </div>

            <div
              ref={statsRef}
              className="card-shine grid grid-cols-3 gap-4 rounded-xl border border-border/80 bg-tech-gradient p-6 backdrop-blur-sm md:gap-6 md:p-8"
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
      </div>
    </SectionWrapper>
  );
}

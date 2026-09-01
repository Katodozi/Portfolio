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
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
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
    <SectionWrapper id="about" className="!pb-16">
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

        <div className="mx-auto max-w-3xl space-y-8">
          <div ref={contentRef} className="space-y-4">
            <p className="text-base leading-[1.8] text-text-2 md:text-lg">
              {personalInfo.about}
            </p>
            <p className="text-base leading-[1.8] text-text-2 md:text-lg">
              I specialize in bridging{" "}
              <span className="text-primary">AI/ML research</span> with{" "}
              <span className="text-accent">full-stack engineering</span> —
              from NLP tools for Nepali language to locally-hosted LLM
              platforms that eliminate API costs. Currently based in{" "}
              <span className="text-primary">{personalInfo.location}</span>,
              open to freelance projects and collaborations.
            </p>
            <div className="pt-2">
              <a
                href={`mailto:${personalInfo.email}`}
                className="group inline-flex items-center gap-2 rounded-sharp border border-border-2 bg-surface px-4 py-2 font-mono text-sm text-text-2 transition-all duration-200 hover:border-primary hover:text-primary"
                data-cursor="pointer"
              >
                <span className="text-primary">&gt;</span>
                {personalInfo.email}
              </a>
            </div>
          </div>

          <div ref={statsRef} className="grid grid-cols-3 gap-3 md:gap-4">
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
    </SectionWrapper>
  );
}

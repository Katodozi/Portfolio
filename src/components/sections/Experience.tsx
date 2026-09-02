"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/lib/data";
import TimelineItem from "@/components/ui/TimelineItem";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeInUp } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!lineRef.current || !listRef.current) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: "top center",
        ease: "power2.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 60%",
          end: "bottom 70%",
          scrub: 1,
        },
      });

      const nodes = listRef.current.querySelectorAll("[data-timeline-dot]");
      gsap.from(nodes, {
        scale: 0,
        opacity: 0,
        stagger: 0.3,
        duration: 0.4,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 60%",
        },
      });
    },
    { scope: listRef }
  );

  return (
    <SectionWrapper id="experience">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <SectionHeading
          number="05."
          title="Work"
          highlight="Experience"
          subtitle="Internships where I applied full-stack and AI/ML skills in real-world environments."
        />
      </motion.div>

      <div ref={listRef} className="relative mx-auto max-w-2xl">
        <div
          ref={lineRef}
          className="absolute left-[5px] top-0 hidden h-full w-px origin-top bg-border-2 md:block"
        />
        {experience.map((item, index) => (
          <TimelineItem
            key={item.id}
            title={item.company}
            subtitle={item.role}
            period={item.duration}
            ongoing={item.ongoing}
            isLast={index === experience.length - 1}
            index={index}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}

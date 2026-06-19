"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import TimelineItem from "@/components/ui/TimelineItem";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeInUp } from "@/lib/animations";

export default function Experience() {
  return (
    <SectionWrapper id="experience" withGrid>
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

      <div className="relative mx-auto max-w-2xl">
        <div className="absolute left-[5px] top-0 hidden h-full w-px bg-gradient-to-b from-accent via-glow to-primary md:block" />
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

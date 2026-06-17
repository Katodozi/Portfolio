"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import TimelineItem from "@/components/ui/TimelineItem";
import { fadeInUp } from "@/lib/animations";

export default function Experience() {
  return (
    <section id="experience" className="section-padding">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="section-heading">
            Work <span>Experience</span>
          </h2>
          <p className="section-subheading">
            Internships where I applied full-stack and AI/ML skills in
            real-world environments.
          </p>
        </motion.div>

        <div className="mx-auto max-w-2xl">
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
      </div>
    </section>
  );
}

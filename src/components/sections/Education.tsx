"use client";

import { motion } from "framer-motion";
import { education } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeInUp } from "@/lib/animations";

export default function Education() {
  return (
    <SectionWrapper id="education">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <SectionHeading
          number="06."
          title=""
          highlight="Education"
          subtitle="Academic foundation in Computer Engineering from Pokhara University."
        />
      </motion.div>

      <div className="mx-auto max-w-2xl space-y-4">
        {education.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            className="glow-card group rounded-lg border border-border-2 bg-surface p-5 transition-all duration-300 hover:border-primary md:p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="font-heading text-base font-semibold text-text md:text-lg">
                  {item.degree}
                </h3>
                <p className="mt-1 text-sm text-text-2">{item.institution}</p>
                {item.university && (
                  <p className="text-sm text-text-2">{item.university}</p>
                )}
              </div>
              <span className="rounded-sharp border border-border-2 bg-bg px-3 py-1 font-mono text-xs text-primary">
                {item.period}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

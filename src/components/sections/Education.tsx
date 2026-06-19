"use client";

import { motion } from "framer-motion";
import { education } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeInUp } from "@/lib/animations";

export default function Education() {
  return (
    <SectionWrapper id="education" withAurora className="bg-surface/20">
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

      <div className="mx-auto max-w-2xl space-y-5">
        {education.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="card-shine group relative rounded-xl border border-border/80 bg-surface/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-glow/30 hover:glow-glow"
          >
            <div className="absolute -left-1 top-6 h-2 w-2 rounded-full bg-glow glow-dot" />
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="font-heading text-base font-semibold text-text transition-colors group-hover:text-accent md:text-lg">
                  {item.degree}
                </h3>
                <p className="mt-1 text-sm text-highlight">{item.institution}</p>
                {item.university && (
                  <p className="text-sm text-muted">{item.university}</p>
                )}
              </div>
              <span className="rounded-md border border-border bg-bg/50 px-3 py-1 font-mono text-xs text-muted">
                {item.period}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

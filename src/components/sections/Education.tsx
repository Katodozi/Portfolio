"use client";

import { motion } from "framer-motion";
import { education } from "@/lib/data";
import { fadeInUp } from "@/lib/animations";

export default function Education() {
  return (
    <section id="education" className="section-padding bg-surface/30">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="section-heading">
            <span>Education</span>
          </h2>
          <p className="section-subheading">
            Academic foundation in Computer Engineering from Pokhara University.
          </p>
        </motion.div>

        <div className="mx-auto max-w-2xl space-y-6">
          {education.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative rounded-lg border border-border bg-surface p-6 transition-colors hover:border-primary/40"
            >
              <div className="absolute -left-1 top-6 h-2 w-2 rounded-full bg-accent glow-dot" />
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-heading text-base font-semibold text-text md:text-lg">
                    {item.degree}
                  </h3>
                  <p className="mt-1 text-sm text-primary">{item.institution}</p>
                  {item.university && (
                    <p className="text-sm text-muted">{item.university}</p>
                  )}
                </div>
                <span className="font-mono text-xs text-muted">{item.period}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

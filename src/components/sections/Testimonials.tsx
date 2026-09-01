"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeInUp } from "@/lib/animations";

export default function Testimonials() {
  return (
    <SectionWrapper id="testimonials">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <SectionHeading
          number="08."
          title="References"
          highlight="& Testimonials"
          subtitle="Quotes from managers and collaborators. Placeholder cards until real reviews are added."
        />
      </motion.div>

      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((item, index) => (
          <motion.blockquote
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            className="flex flex-col rounded-lg border border-border-2 bg-surface p-5 md:p-6"
          >
            <p className="flex-1 text-sm leading-relaxed text-text-2">
              “{item.quote}”
            </p>
            <footer className="mt-5 border-t border-border pt-4">
              <cite className="not-italic">
                <span className="block font-heading text-sm font-semibold text-text">
                  {item.name}
                </span>
                <span className="mt-0.5 block font-mono text-[11px] text-muted">
                  {item.role}
                </span>
              </cite>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </SectionWrapper>
  );
}

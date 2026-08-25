"use client";

import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { certifications } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeInUp } from "@/lib/animations";

function IBMBadge() {
  return (
    <div
      className="relative flex h-16 w-16 items-center justify-center rounded-lg border border-border-2 bg-surface"
      style={{ background: "linear-gradient(135deg, var(--color-surface) 0%, rgba(91,184,212,0.08) 100%)" }}
    >
      <svg viewBox="0 0 48 48" className="relative h-10 w-10" aria-label="IBM">
        <text
          x="50%"
          y="55%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="#5BB8D4"
          fontSize="14"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
        >
          IBM
        </text>
      </svg>
    </div>
  );
}

export default function Certifications() {
  return (
    <SectionWrapper id="certifications">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <SectionHeading
          number="07."
          title=""
          highlight="Certifications"
          subtitle="Industry-recognized credentials validating AI and technical expertise."
        />
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:max-w-3xl">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="glow-card flex gap-5 rounded-lg border border-border-2 bg-surface p-5 transition-all duration-300 hover:border-primary md:p-6"
          >
            <IBMBadge />
            <div className="flex flex-1 flex-col">
              <h3 className="font-heading text-base font-semibold text-text">
                {cert.name}
              </h3>
              <p className="mt-1 font-mono text-xs text-primary">
                {cert.issuer}
              </p>
              <p className="mt-0.5 font-mono text-xs text-primary">{cert.date}</p>
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 self-start rounded-sharp border border-border-2 px-3 py-1.5 font-mono text-xs text-text-2 transition-all duration-200 hover:border-primary hover:text-primary"
                data-cursor="pointer"
              >
                <FiExternalLink size={12} className="text-muted" />
                Verify on Credly
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

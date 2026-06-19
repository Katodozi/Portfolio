"use client";

import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { certifications } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeInUp } from "@/lib/animations";

function IBMBadge() {
  return (
    <div className="relative flex h-16 w-16 items-center justify-center rounded-xl border border-border bg-gradient-to-br from-surface to-bg">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-glow/10" />
      <svg viewBox="0 0 48 48" className="relative h-10 w-10" aria-label="IBM">
        <text
          x="50%"
          y="55%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="#4A9EBF"
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
    <SectionWrapper id="certifications" withGrid>
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

      <div className="grid gap-6 sm:grid-cols-2 lg:max-w-3xl">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className="card-shine tech-frame flex gap-5 rounded-xl border border-border/60 bg-tech-gradient p-6 backdrop-blur-sm transition-all duration-300 hover:glow-accent"
          >
            <IBMBadge />
            <div className="flex flex-1 flex-col">
              <h3 className="font-heading text-base font-semibold text-text">
                {cert.name}
              </h3>
              <p className="mt-1 text-sm text-highlight">{cert.issuer}</p>
              <p className="mt-1 font-mono text-xs text-muted">{cert.date}</p>
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 self-start rounded-lg border border-accent/30 bg-accent/5 px-3 py-1.5 text-xs font-medium text-accent transition-all hover:bg-accent/15 hover:glow-accent"
                data-cursor="pointer"
              >
                <FiExternalLink size={12} />
                Verify on Credly
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

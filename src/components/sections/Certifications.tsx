"use client";

import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { certifications } from "@/lib/data";
import { fadeInUp } from "@/lib/animations";

function IBMBadge() {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-border bg-bg">
      <svg viewBox="0 0 48 48" className="h-10 w-10" aria-label="IBM">
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
    <section id="certifications" className="section-padding">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="section-heading">
            <span>Certifications</span>
          </h2>
          <p className="section-subheading">
            Industry-recognized credentials validating AI and technical expertise.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:max-w-3xl">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="flex gap-5 rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:border-accent/30 hover:glow-accent"
            >
              <IBMBadge />
              <div className="flex flex-1 flex-col">
                <h3 className="font-heading text-base font-semibold text-text">
                  {cert.name}
                </h3>
                <p className="mt-1 text-sm text-primary">{cert.issuer}</p>
                <p className="mt-1 font-mono text-xs text-muted">{cert.date}</p>
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 self-start rounded-md border border-accent/30 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/10"
                  data-cursor="pointer"
                >
                  <FiExternalLink size={12} />
                  Verify on Credly
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

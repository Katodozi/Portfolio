"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiGlobe } from "react-icons/fi";
import { testimonials } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeInUp } from "@/lib/animations";

const extras: Record<string, {
  initials: string;
  image: string;
  website: string;
  websiteLabel: string;
}> = {
  "placeholder-1": {
    initials: "SK",
    image: "/images/suraj-koirala.webp",
    website: "https://codequant.io",
    websiteLabel: "codequant.io",
  },
  "placeholder-2": {
    initials: "IT",
    image: "/images/ishwor-tamang.webp",
    website: "https://ishwortamang.com.np/",
    websiteLabel: "Profile",
  },
};

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
          subtitle="Quotes from managers and collaborators."
        />
      </motion.div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item, index) => {
          const extra = extras[item.id];
          const initials =
            extra?.initials ??
            item.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2);

          return (
            <motion.blockquote
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="flex flex-col rounded-lg border border-border-2 bg-surface p-5 md:p-6"
            >
              <p className="flex-1 text-sm leading-relaxed text-text-2">
              &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-5 flex items-center gap-3 border-t border-border pt-4">

                {/* Avatar — image if available, initials fallback */}
                <div className="relative h-11 w-11 shrink-0">
                  {extra?.image ? (
                    <Image
                      src={extra.image}
                      alt={`${item.name} photo`}
                      fill
                      sizes="44px"
                      className="rounded-full object-cover object-top ring-1 ring-primary/25"
                    />
                  ) : (
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 bg-primary/10 font-mono text-xs text-primary"
                      aria-hidden="true"
                    >
                      {initials}
                    </div>
                  )}
                </div>

                <cite className="min-w-0 not-italic">
                  <span className="block font-heading text-sm font-semibold text-text">
                    {item.name}
                  </span>
                  <span className="mt-0.5 block font-mono text-[11px] text-muted">
                    {item.role}
                  </span>
                  {extra?.website && (
                    <a
                      href={extra.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline mt-1 inline-flex items-center gap-1 font-mono text-[11px] text-primary"
                      data-cursor="pointer"
                    >
                      <FiGlobe size={11} />
                      {extra.websiteLabel}
                    </a>
                  )}
                </cite>
              </footer>
            </motion.blockquote>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { FiMail, FiSend } from "react-icons/fi";
import { personalInfo } from "@/lib/data";
import SocialIcons from "@/components/ui/SocialIcons";
import MagneticButton from "@/components/ui/MagneticButton";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeInUp } from "@/lib/animations";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formState;
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <SectionWrapper id="contact">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <SectionHeading
          number="08."
          title="Get In"
          highlight="Touch"
          subtitle="Have a project in mind? Let's build something intelligent together."
        />
      </motion.div>

      <div className="grid gap-10 md:grid-cols-2">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="space-y-4 rounded-lg border border-border-2 bg-surface p-5 md:p-7"
        >
          <div>
            <label htmlFor="name" className="mb-2 block font-mono text-xs text-muted">
              {"//"} Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={formState.name}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, name: e.target.value }))
              }
              className="input-focus w-full rounded-sharp border border-border-2 bg-surface px-4 py-2.5 text-sm text-text transition-all duration-200"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block font-mono text-xs text-muted">
              {"//"} Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={formState.email}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, email: e.target.value }))
              }
              className="input-focus w-full rounded-sharp border border-border-2 bg-surface px-4 py-2.5 text-sm text-text transition-all duration-200"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block font-mono text-xs text-muted">
              {"//"} Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={formState.message}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  message: e.target.value,
                }))
              }
              className="input-focus w-full resize-none rounded-sharp border border-border-2 bg-surface px-4 py-2.5 text-sm text-text transition-all duration-200"
              placeholder="Tell me about your project..."
            />
          </div>

          <MagneticButton variant="primary" type="submit">
            <FiSend size={16} />
            {submitted ? "Opening email..." : "Send Message"}
          </MagneticButton>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
          className="flex flex-col justify-center space-y-8"
        >
          <div>
            <p className="mb-2 font-mono text-xs text-muted">
              {"//"} open to freelance projects
            </p>
            <p className="mb-2 font-mono text-xs text-muted">{"//"} Email me directly</p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 font-mono text-base text-primary transition-colors duration-200 hover:text-accent"
              data-cursor="pointer"
            >
              <FiMail size={18} />
              {personalInfo.email}
            </a>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs text-muted">{"//"} Find me on</p>
            <SocialIcons size={22} />
          </div>

          <div className="rounded-lg border border-border-2 bg-surface p-5">
            <p className="text-sm leading-relaxed text-text-2">
              Based in <span className="text-primary">{personalInfo.location}</span>,
              available for freelance projects, remote collaborations, and
              full-time opportunities in Full Stack & AI/ML engineering.
            </p>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

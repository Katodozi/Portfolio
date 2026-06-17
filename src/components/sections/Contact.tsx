"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { FiMail, FiSend } from "react-icons/fi";
import { personalInfo } from "@/lib/data";
import SocialIcons from "@/components/ui/SocialIcons";
import MagneticButton from "@/components/ui/MagneticButton";
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
    <section id="contact" className="section-padding bg-surface/30">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="section-heading">
            Get In <span>Touch</span>
          </h2>
          <p className="section-subheading">
            Have a project in mind? Let&apos;s build something intelligent
            together.
          </p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-sm text-muted">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formState.name}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full rounded-md border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition-colors focus:border-accent"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm text-muted">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formState.email}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full rounded-md border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition-colors focus:border-accent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm text-muted"
              >
                Message
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
                className="w-full resize-none rounded-md border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition-colors focus:border-accent"
                placeholder="Tell me about your project..."
              />
            </div>

            <MagneticButton variant="primary" type="submit">
              <FiSend size={16} />
              {submitted ? "Opening email..." : "Send Message"}
            </MagneticButton>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div>
              <p className="mb-2 text-sm text-muted">Email me directly at</p>
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 font-mono text-lg text-accent transition-colors hover:text-text"
                data-cursor="pointer"
              >
                <FiMail size={20} />
                {personalInfo.email}
              </a>
            </div>

            <div>
              <p className="mb-4 text-sm text-muted">Or find me on</p>
              <SocialIcons size={24} />
            </div>

            <div className="rounded-lg border border-border bg-surface p-6">
              <p className="text-sm leading-relaxed text-muted">
                Based in <span className="text-text">{personalInfo.location}</span>,
                available for freelance projects, remote collaborations, and
                full-time opportunities in Full Stack & AI/ML engineering.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

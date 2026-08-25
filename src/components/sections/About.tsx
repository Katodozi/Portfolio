"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { personalInfo, stats } from "@/lib/data";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ProfilePhoto from "@/components/ui/ProfilePhoto";
import { fadeInUp } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const mobilePhotoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!contentRef.current || !statsRef.current) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { opacity: 0, scale: 0.97 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
            delay: 0.1,
          }
        );
      }

      if (mobilePhotoRef.current) {
        gsap.fromTo(
          mobilePhotoRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <SectionWrapper id="about" className="!pb-16">
      <div ref={sectionRef as React.RefObject<HTMLDivElement>}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <SectionHeading
            number="02."
            title="About"
            highlight="Me"
            subtitle="Computer Engineering graduate building intelligent, production-ready web solutions."
          />
        </motion.div>

        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-16 xl:gap-24">
            {/* LEFT — sticky profile image (desktop) */}
            <div className="hidden lg:block lg:w-[40%] lg:shrink-0">
              <div ref={photoRef} className="sticky top-[120px] opacity-0">
                <ProfilePhoto size="about" layout="sticky" />
              </div>
            </div>

            {/* RIGHT — scrollable content */}
            <div className="min-w-0 flex-1 lg:w-[60%]">
              <div ref={mobilePhotoRef} className="mb-8 opacity-0 lg:hidden">
                <ProfilePhoto size="about" layout="mobile" />
              </div>

              <div className="space-y-8">
                <div ref={contentRef} className="space-y-4">
                  <p className="text-base leading-[1.8] text-text-2 md:text-lg">
                    {personalInfo.about}
                  </p>
                  <p className="text-base leading-[1.8] text-text-2 md:text-lg">
                    I specialize in bridging{" "}
                    <span className="text-primary">AI/ML research</span> with{" "}
                    <span className="text-accent">full-stack engineering</span> —
                    from NLP tools for Nepali language to locally-hosted LLM
                    platforms that eliminate API costs. Currently based in{" "}
                    <span className="text-primary">{personalInfo.location}</span>,
                    open to freelance projects and collaborations.
                  </p>
                  <div className="pt-2">
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="group inline-flex items-center gap-2 rounded-sharp border border-border-2 bg-surface px-4 py-2 font-mono text-sm text-text-2 transition-all duration-200 hover:border-primary hover:text-primary"
                      data-cursor="pointer"
                    >
                      <span className="text-primary">&gt;</span>
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <div ref={statsRef} className="grid grid-cols-3 gap-3 md:gap-4">
                  {stats.map((stat) => (
                    <AnimatedCounter
                      key={stat.id}
                      value={stat.value}
                      suffix={stat.suffix}
                      label={stat.label}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

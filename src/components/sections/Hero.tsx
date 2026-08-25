"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowDown, FiDownload } from "react-icons/fi";
import clsx from "clsx";
import { useLenis } from "lenis/react";
import { personalInfo } from "@/lib/data";
import MagneticButton from "@/components/ui/MagneticButton";
import ProfilePhoto from "@/components/ui/ProfilePhoto";
import Marquee from "@/components/ui/Marquee";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const lenis = useLenis();

  const [typewriterText, setTypewriterText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useGSAP(
    () => {
      if (!nameRef.current || !contentRef.current) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const chars = nameRef.current.querySelectorAll(".char");

      if (prefersReduced) {
        gsap.set(chars, { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ delay: 0.4 });

      tl.fromTo(
        chars,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.03,
          ease: "power2.out",
        }
      );

      tl.fromTo(
        contentRef.current.querySelectorAll(".hero-reveal"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.3"
      );

      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.5,
          }
        );
      }

      gsap.to(contentRef.current, {
        yPercent: 10,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      if (photoRef.current) {
        gsap.to(photoRef.current, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    const currentRole = personalInfo.typewriterRoles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && typewriterText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typewriterText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % personalInfo.typewriterRoles.length);
    } else {
      const speed = isDeleting ? 50 : 100;
      timeout = setTimeout(() => {
        setTypewriterText(
          isDeleting
            ? currentRole.substring(0, typewriterText.length - 1)
            : currentRole.substring(0, typewriterText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [typewriterText, isDeleting, roleIndex]);

  const handleScrollTo = (selector: string) => {
    const target = document.querySelector(selector);
    if (target && lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.4 });
    }
  };

  const nameParts = personalInfo.name.split("");

  return (
    <>
      <section
        id="hero"
        ref={sectionRef}
        className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-24 section-padding"
      >
        <div className="hero-radial absolute inset-0 z-0" aria-hidden="true" />

        <div className="section-container relative z-[1]">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-14">
            <div ref={contentRef} className="text-center lg:text-left">
              <p className="hero-reveal mb-4 font-mono text-[13px] text-primary opacity-0">
                <span className="text-primary">01.</span> Hi, my name is
              </p>

              <h1
                ref={nameRef}
                className="mb-4 font-heading font-bold tracking-tight text-text"
                style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 1.05 }}
              >
                {nameParts.map((char, i) => (
                  <span
                    key={i}
                    className={clsx(
                      "char inline-block opacity-0",
                      i > personalInfo.name.indexOf(" ") && "glow-text-primary"
                    )}
                    style={{
                      whiteSpace: char === " " ? "pre" : undefined,
                      color:
                        i > personalInfo.name.indexOf(" ")
                          ? "var(--color-primary)"
                          : "var(--color-text)",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h1>

              <p className="hero-reveal mb-3 font-heading text-xl font-semibold text-text-2 opacity-0 sm:text-2xl md:text-3xl">
                <span className="text-gradient">{personalInfo.tagline}</span>
              </p>

              <p className="hero-reveal mb-2 font-mono text-sm text-accent opacity-0 md:text-base">
                <span className="text-muted">&gt;</span> {typewriterText}
                <span className="terminal-cursor text-accent">|</span>
              </p>

              <p className="hero-reveal mx-auto mb-8 max-w-lg font-mono text-xs text-muted opacity-0 lg:mx-0 md:text-sm">
                {personalInfo.location} — {personalInfo.title}
              </p>

              <div className="hero-reveal flex flex-col items-center justify-center gap-3 opacity-0 sm:flex-row lg:justify-start">
                <MagneticButton
                  variant="primary"
                  onClick={() => handleScrollTo("#projects")}
                >
                  View Projects
                  <FiArrowDown size={16} />
                </MagneticButton>
                <MagneticButton
                  variant="secondary"
                  href={personalInfo.cvPath}
                  download
                >
                  <FiDownload size={16} />
                  Download CV
                </MagneticButton>
              </div>
            </div>

            <div
              ref={photoRef}
              className="flex justify-center opacity-0 lg:justify-end"
            >
              <ProfilePhoto size="hero" priority />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-[1] -translate-x-1/2">
          <button
            onClick={() => handleScrollTo("#about")}
            className="flex flex-col items-center gap-1 font-mono text-muted transition-colors duration-200 hover:text-primary"
            aria-label="Scroll to about"
            data-cursor="pointer"
          >
            <span className="text-[10px] tracking-widest">SCROLL</span>
            <FiArrowDown size={16} className="animate-bounce" />
          </button>
        </div>
      </section>

      <Marquee />
    </>
  );
}

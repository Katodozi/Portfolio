"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FiArrowDown, FiDownload } from "react-icons/fi";
import { useLenis } from "lenis/react";
import { personalInfo } from "@/lib/data";
import MagneticButton from "@/components/ui/MagneticButton";

function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let animationId: number;
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const count = window.innerWidth < 768 ? 30 : 60;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 255, 218, ${p.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1]"
      aria-hidden="true"
    />
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const [typewriterText, setTypewriterText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useGSAP(
    () => {
      if (!nameRef.current) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const chars = nameRef.current.querySelectorAll(".char");

      if (prefersReduced) {
        gsap.set(chars, { opacity: 1, y: 0 });
        gsap.set([taglineRef.current, ctaRef.current], { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        chars,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.04,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      gsap.fromTo(
        [taglineRef.current, ctaRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          delay: 1.2,
        }
      );
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
      lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.2 });
    }
  };

  const nameParts = personalInfo.name.split("");

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden section-padding"
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="noise-overlay" />
      <FloatingParticles />

      <div className="absolute left-1/4 top-1/4 h-px w-32 bg-accent/20 glow-line" />
      <div className="absolute bottom-1/3 right-1/4 h-px w-24 bg-primary/20 glow-line" />
      <div className="absolute right-1/3 top-1/3 h-1.5 w-1.5 rounded-full bg-accent/40 glow-dot animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-1/3 h-1 w-1 rounded-full bg-primary/40 glow-dot animate-pulse-glow" />

      <div className="section-container relative z-10 text-center">
        <p className="mb-4 font-mono text-sm text-accent md:text-base">
          Hi, my name is
        </p>

        <h1
          ref={nameRef}
          className="mb-4 font-heading text-5xl font-bold tracking-tight text-text sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {nameParts.map((char, i) => (
            <span
              key={i}
              className="char inline-block opacity-0"
              style={{ whiteSpace: char === " " ? "pre" : undefined }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <p
          ref={taglineRef}
          className="mb-2 font-heading text-2xl font-semibold text-muted opacity-0 sm:text-3xl md:text-4xl"
        >
          {personalInfo.tagline}
        </p>

        <p className="mb-2 font-mono text-lg text-primary md:text-xl">
          <span className="text-accent">&gt;</span>{" "}
          <span>{typewriterText}</span>
          <span className="animate-pulse text-accent">|</span>
        </p>

        <p className="mx-auto mb-10 max-w-xl text-sm text-muted md:text-base">
          {personalInfo.location} — {personalInfo.title}
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col items-center justify-center gap-4 opacity-0 sm:flex-row"
        >
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

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <button
          onClick={() => handleScrollTo("#about")}
          className="text-muted transition-colors hover:text-accent"
          aria-label="Scroll to about"
          data-cursor="pointer"
        >
          <FiArrowDown size={20} />
        </button>
      </div>
    </section>
  );
}

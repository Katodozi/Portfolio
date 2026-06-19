"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowDown, FiDownload } from "react-icons/fi";
import { useLenis } from "lenis/react";
import { personalInfo } from "@/lib/data";
import MagneticButton from "@/components/ui/MagneticButton";
import ProfilePhoto from "@/components/ui/ProfilePhoto";
import ParallaxLayer from "@/components/ui/ParallaxLayer";
import Marquee from "@/components/ui/Marquee";

gsap.registerPlugin(ScrollTrigger);

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
      color: string;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const colors = ["#64ffda", "#4a9ebf", "#7b6cff", "#38bdf8"];
    const count = window.innerWidth < 768 ? 40 : 80;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.6 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 120) * 0.15;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
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
        { opacity: 0, y: 80, rotateX: -40 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.035,
          ease: "power4.out",
        }
      );

      tl.fromTo(
        contentRef.current.querySelectorAll(".hero-reveal"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=0.4"
      );

      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { opacity: 0, x: 60, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            delay: 0.6,
          }
        );
      }

      gsap.to(contentRef.current, {
        yPercent: 15,
        opacity: 0.3,
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
          yPercent: -20,
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
        <ParallaxLayer speed={0.25} className="absolute inset-0 grid-bg opacity-50" />
        <div className="aurora-bg" />
        <div className="noise-overlay" />
        <div className="scanlines" />
        <FloatingParticles />

        <ParallaxLayer speed={-0.1} className="absolute left-[10%] top-[20%] h-px w-40 bg-gradient-to-r from-transparent via-accent/40 to-transparent glow-line" />
        <ParallaxLayer speed={0.15} className="absolute bottom-[30%] right-[15%] h-px w-32 bg-gradient-to-r from-transparent via-glow/40 to-transparent" />
        <div className="absolute right-[20%] top-[25%] h-2 w-2 rounded-full bg-accent/50 glow-dot animate-pulse-glow" />
        <div className="absolute bottom-[35%] left-[20%] h-1.5 w-1.5 rounded-full bg-glow/50 glow-dot animate-pulse-glow" />

        <div className="section-container relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
            {/* Left: Content */}
            <div ref={contentRef} className="text-center lg:text-left">
              <p className="hero-reveal mb-4 font-mono text-sm text-accent opacity-0 md:text-base">
                <span className="text-glow">01.</span> Hi, my name is
              </p>

              <h1
                ref={nameRef}
                className="mb-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
              >
                {nameParts.map((char, i) => (
                  <span
                    key={i}
                    className="char inline-block opacity-0"
                    style={{
                      whiteSpace: char === " " ? "pre" : undefined,
                      color:
                        i > personalInfo.name.indexOf(" ")
                          ? "var(--color-accent)"
                          : "var(--color-text)",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h1>

              <p className="hero-reveal mb-3 font-heading text-xl font-semibold text-muted opacity-0 sm:text-2xl md:text-3xl">
                <span className="text-gradient">{personalInfo.tagline}</span>
              </p>

              <p className="hero-reveal mb-2 font-mono text-base text-primary opacity-0 md:text-lg">
                <span className="text-accent">&gt;</span>{" "}
                <span className="text-highlight">{typewriterText}</span>
                <span className="animate-pulse text-accent">|</span>
              </p>

              <p className="hero-reveal mx-auto mb-8 max-w-lg text-sm text-muted opacity-0 lg:mx-0 md:text-base">
                {personalInfo.location} — {personalInfo.title}
              </p>

              <div className="hero-reveal flex flex-col items-center justify-center gap-4 opacity-0 sm:flex-row lg:justify-start">
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

            {/* Right: Photo */}
            <div
              ref={photoRef}
              className="flex justify-center opacity-0 lg:justify-end"
            >
              <ProfilePhoto size="hero" priority />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <button
            onClick={() => handleScrollTo("#about")}
            className="flex flex-col items-center gap-1 text-muted transition-colors hover:text-accent"
            aria-label="Scroll to about"
            data-cursor="pointer"
          >
            <span className="font-mono text-[10px] tracking-widest">SCROLL</span>
            <FiArrowDown size={18} className="animate-bounce" />
          </button>
        </div>
      </section>

      <Marquee />
    </>
  );
}

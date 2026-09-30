"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/lib/data";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [buttonReady, setButtonReady] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Full-screen glass fragments used for the exit transition.
  // The grid gives the impression that the entire preloader UI is breaking apart.
  const shatterPieces = Array.from({ length: 24 }, (_, i) => {
    const column = i % 6;
    const row = Math.floor(i / 6);
    const centerX = column - 2.5;
    const centerY = row - 1.5;
    const distance = Math.sqrt(centerX * centerX + centerY * centerY) || 1;

    return {
      x: centerX * (210 + distance * 30),
      y: centerY * (190 + distance * 26),
      rotate: centerX * 7 + centerY * 5,
      delay: Math.min(distance * 0.018, 0.075),
      width: 16.8 + ((i * 7) % 7),
      height: 25 + ((i * 11) % 9),
    };
  });

  // Progress counter
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setButtonReady(true), 400);
          return 100;
        }
        return prev + Math.random() * 12 + 4;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Glitch effect on name every few seconds
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 300);
    }, 2500);
    return () => clearInterval(glitchInterval);
  }, []);

  // Canvas particle burst on button click
  useEffect(() => {
    if (!buttonClicked) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number; y: number;
      vx: number; vy: number;
      alpha: number; size: number; color: string;
    }[] = [];

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const colors = ["#5BB8D4", "#64FFDA", "#E8EDF2", "#4A9EBF"];

    for (let i = 0; i < 80; i++) {
      const angle = (Math.PI * 2 * i) / 80;
      const speed = Math.random() * 8 + 2;
      particles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.025;
        p.vy += 0.15;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      if (particles.some((p) => p.alpha > 0)) {
        animId = requestAnimationFrame(animate);
      }
    };
    animate();

    setTimeout(() => {
      setDone(true);
      cancelAnimationFrame(animId);
    }, 1250);

    return () => cancelAnimationFrame(animId);
  }, [buttonClicked]);

  useEffect(() => {
    if (done) {
      const timer = setTimeout(onComplete, 250);
      return () => clearTimeout(timer);
    }
  }, [done, onComplete]);

  const displayProgress = Math.min(Math.round(progress), 100);

  // Fake terminal lines that type in sequence
  const terminalLines = [
    "› initializing portfolio...",
    "› loading projects...",
    "› connecting to matrix...",
    "› calibrating animations...",
    "› ready.",
  ];

  const visibleLines = terminalLines.slice(
    0,
    Math.floor((displayProgress / 100) * terminalLines.length) + 1
  );

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          exit={{
            opacity: buttonClicked ? 0 : 0,
            scale: buttonClicked ? 1.015 : 1.05,
            filter: buttonClicked ? "blur(1px)" : "blur(10px)",
          }}
          transition={{
            duration: buttonClicked ? 1.2 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Subtle CRT / scanline overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.075]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(100,255,218,0.22) 3px, transparent 4px)",
              mixBlendMode: "screen",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.16]"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 45%, rgba(4,12,18,0.32) 100%)",
            }}
          />

          {/* Particle burst canvas */}
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 z-50"
          />

          {/* Full-screen glass shatter transition */}
          <AnimatePresence>
            {buttonClicked && (
              <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
                {/* Crack flash */}
                <motion.div
                  className="absolute inset-0 z-[1]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.12, 0.04, 0] }}
                  transition={{ duration: 1.05, times: [0, 0.08, 0.3, 1] }}
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(232,237,242,0.9), rgba(100,255,218,0.18) 24%, transparent 62%)",
                  }}
                />

                {/* Glass fragments */}
                {shatterPieces.map((piece, i) => (
                  <motion.div
                    key={i}
                    className="absolute overflow-hidden border border-white/20"
                    style={{
                      left: `${(i % 6) * 16.6667}%`,
                      top: `${Math.floor(i / 6) * 25}%`,
                      width: `${piece.width}%`,
                      height: `${piece.height}%`,
                      background:
                        "linear-gradient(135deg, rgba(232,237,242,0.075), rgba(91,184,212,0.055) 45%, rgba(100,255,218,0.025))",
                      backdropFilter: "blur(1.5px)",
                      WebkitBackdropFilter: "blur(1.5px)",
                      boxShadow:
                        "inset 0 0 28px rgba(232,237,242,0.045), 0 0 12px rgba(91,184,212,0.04)",
                      clipPath:
                        i % 3 === 0
                          ? "polygon(0 2%, 86% 0, 100% 76%, 72% 100%, 5% 91%)"
                          : i % 3 === 1
                            ? "polygon(7% 0, 100% 9%, 91% 94%, 18% 100%, 0 38%)"
                            : "polygon(0 12%, 74% 0, 100% 45%, 83% 100%, 10% 88%)",
                      transformOrigin: "50% 50%",
                    }}
                    initial={{
                      x: 0,
                      y: 0,
                      rotate: 0,
                      scale: 1,
                      opacity: 1,
                    }}
                    animate={{
                      x: piece.x,
                      y: piece.y,
                      rotate: piece.rotate,
                      scale: 0.72,
                      opacity: [1, 1, 0.85, 0],
                    }}
                    transition={{
                      duration: 1.12,
                      delay: piece.delay,
                      ease: [0.12, 0.8, 0.2, 1],
                    }}
                  >
                    {/* Internal reflection makes each fragment read as glass */}
                    <motion.span
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.28, 0] }}
                      transition={{
                        duration: 0.65,
                        delay: piece.delay + 0.04,
                        ease: "easeOut",
                      }}
                      style={{
                        background:
                          "linear-gradient(115deg, transparent 30%, rgba(232,237,242,0.34) 48%, transparent 53%)",
                      }}
                    />
                  </motion.div>
                ))}

                {/* Sharp crack lines over the UI before fragments separate */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: [0, 0.9, 0], scale: 1 }}
                  transition={{ duration: 0.62, ease: "easeOut" }}
                  style={{
                    backgroundImage: `
                      linear-gradient(118deg, transparent 49.7%, rgba(232,237,242,0.7) 50%, transparent 50.3%),
                      linear-gradient(62deg, transparent 49.8%, rgba(100,255,218,0.48) 50%, transparent 50.2%),
                      linear-gradient(171deg, transparent 49.8%, rgba(91,184,212,0.42) 50%, transparent 50.2%),
                      linear-gradient(14deg, transparent 49.85%, rgba(232,237,242,0.5) 50%, transparent 50.15%)
                    `,
                    filter: "drop-shadow(0 0 5px rgba(100,255,218,0.35))",
                  }}
                />
              </div>
            )}
          </AnimatePresence>

          {/* Animated background rings */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-primary/10"
                initial={{ width: 100, height: 100, opacity: 0 }}
                animate={{
                  width: [100, 400 + i * 120],
                  height: [100, 400 + i * 120],
                  opacity: [0, 0.15, 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.6,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-8">

            {/* Glitching name */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative font-heading text-4xl font-bold tracking-tight md:text-5xl"
              >
                {/* Glitch layers */}
                {glitchActive && (
                  <>
                    <span
                      className="absolute inset-0 font-heading text-4xl font-bold md:text-5xl"
                      style={{
                        color: "#64FFDA",
                        clipPath: "polygon(0 30%, 100% 30%, 100% 50%, 0 50%)",
                        transform: "translateX(-3px)",
                        opacity: 0.8,
                      }}
                    >
                      {personalInfo.name}
                    </span>
                    <span
                      className="absolute inset-0 font-heading text-4xl font-bold md:text-5xl"
                      style={{
                        color: "#5BB8D4",
                        clipPath: "polygon(0 60%, 100% 60%, 100% 80%, 0 80%)",
                        transform: "translateX(3px)",
                        opacity: 0.8,
                      }}
                    >
                      {personalInfo.name}
                    </span>
                  </>
                )}
                {/* Main text */}
                {personalInfo.name.split(" ").map((word, i) => (
                  <span key={i}>
                    {i > 0 && " "}
                    <span className={i === 1 ? "text-primary" : "text-text"}>
                      {word}
                    </span>
                  </span>
                ))}
              </motion.div>

              {/* Underline glow */}
              <motion.div
                className="mt-2 h-px w-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #5BB8D4, #64FFDA, transparent)",
                  boxShadow: "0 0 10px rgba(91,184,212,0.5)",
                }}
              />
            </div>

            {/* Terminal lines */}
            <motion.div
              className="w-64 rounded-lg border border-border bg-surface/80 p-4 font-mono text-xs md:w-80"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="mb-2 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500/70" />
                <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
                <span className="h-2 w-2 rounded-full bg-green-500/70" />
                <span className="ml-2 text-muted">portfolio.sh</span>
              </div>
              <div className="space-y-1">
                {visibleLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={
                      i === visibleLines.length - 1
                        ? "text-accent"
                        : "text-muted"
                    }
                  >
                    {line}
                    {i === visibleLines.length - 1 && displayProgress < 100 && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="ml-0.5 inline-block"
                      >
                        _
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Progress bar */}
            <div className="flex w-64 flex-col gap-2 md:w-80">
              <div className="h-0.5 w-full overflow-hidden rounded-full bg-border">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${displayProgress}%`,
                    background:
                      "linear-gradient(90deg, #4A9EBF, #5BB8D4, #64FFDA)",
                    boxShadow: "0 0 8px rgba(91,184,212,0.6)",
                    transition: "width 0.2s ease",
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted">
                  // loading
                </span>
                <span className="font-mono text-xs text-primary">
                  {displayProgress}%
                </span>
              </div>
            </div>

            {/* Enter button — appears when loading is done */}
            <AnimatePresence>
              {buttonReady && !buttonClicked && (
                <motion.button
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  onClick={() => setButtonClicked(true)}
                  aria-label="Enter portfolio"
                  className="group relative overflow-hidden rounded-md font-mono text-sm font-semibold"
                  style={{
                    padding: "12px 36px",
                    border: "1px solid rgba(91,184,212,0.4)",
                    color: "#5BB8D4",
                    background: "rgba(91,184,212,0.06)",
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  data-cursor="pointer"
                >
                  {/* Shimmer sweep on hover */}
                  <span
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-500 group-hover:translate-x-full"
                  />

                  {/* Corner brackets */}
                  <span
                    className="absolute left-1.5 top-1.5 h-2 w-2 border-l border-t"
                    style={{ borderColor: "#64FFDA" }}
                  />
                  <span
                    className="absolute right-1.5 top-1.5 h-2 w-2 border-r border-t"
                    style={{ borderColor: "#64FFDA" }}
                  />
                  <span
                    className="absolute bottom-1.5 left-1.5 h-2 w-2 border-b border-l"
                    style={{ borderColor: "#64FFDA" }}
                  />
                  <span
                    className="absolute bottom-1.5 right-1.5 h-2 w-2 border-b border-r"
                    style={{ borderColor: "#64FFDA" }}
                  />

                  {/* Button text */}
                  <span className="relative z-10 flex items-center gap-2">
                    <motion.span
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ●
                    </motion.span>
                    Enter My Domain!!
                    <span className="text-accent">_</span>
                  </span>

                  {/* Glow on hover */}
                  <motion.span
                    className="pointer-events-none absolute inset-0 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      boxShadow: "0 0 20px rgba(91,184,212,0.2) inset",
                    }}
                  />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Clicked state — burst feedback */}
            <AnimatePresence>
              {buttonClicked && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="font-mono text-xs text-accent"
                >
                  // launching...
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/lib/data";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 300);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (done) {
      const timer = setTimeout(onComplete, 600);
      return () => clearTimeout(timer);
    }
  }, [done, onComplete]);

  const displayProgress = Math.min(Math.round(progress), 100);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-heading text-2xl font-bold tracking-tight text-text md:text-3xl"
            >
              {personalInfo.name.split(" ").map((word, i) => (
                <span key={i}>
                  {i > 0 && " "}
                  <span className={i === 1 ? "text-accent" : ""}>{word}</span>
                </span>
              ))}
            </motion.div>

            <div className="h-0.5 w-48 overflow-hidden rounded-full bg-border md:w-64">
              <motion.div
                className="h-full rounded-full bg-accent glow-line"
                style={{ width: `${displayProgress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>

            <motion.span
              className="font-mono text-xs text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {displayProgress}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

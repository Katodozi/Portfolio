"use client";

import { useEffect, useState } from "react";

const LINES = [
  "> building nepali_nlp...",
  "> model.fit(devanagari_corpus)",
  "> accuracy: 94.2%",
  "> deploying to production...",
  "> ✓ done",
];

export default function CodeTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [hold, setHold] = useState(false);

  useEffect(() => {
    if (hold) {
      const pause = setTimeout(() => {
        setVisibleLines(0);
        setCharIndex(0);
        setHold(false);
      }, 1800);
      return () => clearTimeout(pause);
    }

    if (visibleLines >= LINES.length) {
      setHold(true);
      return;
    }

    const line = LINES[visibleLines];
    if (charIndex < line.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 28);
      return () => clearTimeout(t);
    }

    const next = setTimeout(() => {
      setVisibleLines((n) => n + 1);
      setCharIndex(0);
    }, 220);
    return () => clearTimeout(next);
  }, [visibleLines, charIndex, hold]);

  return (
    <div className="mb-8 overflow-hidden rounded-lg border border-border-2 bg-[#07070c] font-mono text-xs md:text-sm">
      <div className="flex items-center gap-2 border-b border-border bg-surface px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-500/70" />
        <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
        <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
        <span className="ml-2 text-[10px] uppercase tracking-widest text-muted">
          python · production
        </span>
      </div>
      <pre className="min-h-[148px] px-4 py-3 leading-relaxed text-accent">
        {LINES.slice(0, visibleLines).map((line) => (
          <div key={line}>{line}</div>
        ))}
        {!hold && visibleLines < LINES.length && (
          <div>
            {LINES[visibleLines].slice(0, charIndex)}
            <span className="terminal-cursor text-primary">|</span>
          </div>
        )}
      </pre>
    </div>
  );
}

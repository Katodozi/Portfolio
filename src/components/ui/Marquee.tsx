"use client";

const techStack = [
  "Python",
  "TensorFlow",
  "Next.js",
  "React",
  "Django",
  "Ollama",
  "RAG",
  "NLP",
  "Spring Boot",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "FastAPI",
  "TypeScript",
  "Scikit-learn",
  "Streamlit",
];

export default function Marquee() {
  const items = [...techStack, ...techStack];

  return (
    <div className="relative overflow-hidden border-y border-border/50 bg-surface/30 py-4">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-bg to-transparent" />

      <div className="marquee-track gap-8">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-8 font-mono text-sm text-muted/70"
          >
            <span className="text-accent/40">{"//"}</span>
            {item}
            <span className="h-1 w-1 rounded-full bg-glow/50" />
          </span>
        ))}
      </div>
    </div>
  );
}

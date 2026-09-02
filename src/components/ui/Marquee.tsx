"use client";

const techStack = [
  "React",
  "Next.js",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "Python",
  "TensorFlow",
  "Django",
  "Ollama",
  "RAG",
  "NLP",
  "Spring Boot",
  "FastAPI",
  "TypeScript",
  "Scikit-learn",
  "Streamlit",
];

export default function Marquee() {
  const items = [...techStack, ...techStack, ...techStack];

  return (
    <div className="relative overflow-hidden border-y border-border bg-surface py-3">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-bg to-transparent" />

      <div className="marquee-track gap-6">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-6 font-mono text-xs text-muted md:text-sm"
          >
            {item}
            <span className="text-muted/50">--</span>
          </span>
        ))}
      </div>
    </div>
  );
}

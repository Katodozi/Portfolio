"use client";

import { useRef, useState, ReactNode } from "react";
import clsx from "clsx";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  download?: boolean;
  target?: string;
  rel?: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
}

export default function MagneticButton({
  children,
  className,
  onClick,
  href,
  download,
  target,
  rel,
  variant = "primary",
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.25, y: y * 0.25 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = clsx(
    "relative inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300",
    variant === "primary"
      ? "border border-accent/40 bg-gradient-to-r from-accent/15 to-glow/10 text-accent hover:from-accent/25 hover:to-glow/15 hover:glow-accent"
      : "border border-primary/40 bg-transparent text-primary hover:border-highlight hover:text-highlight hover:glow-primary",
    className
  );

  const style = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: position.x === 0 && position.y === 0
      ? "transform 0.4s ease, background-color 0.3s, border-color 0.3s, color 0.3s, box-shadow 0.3s"
      : "transform 0.1s ease",
  };

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        download={download}
        target={target}
        rel={rel}
        className={baseStyles}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-cursor="pointer"
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      className={baseStyles}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="pointer"
    >
      {children}
    </button>
  );
}

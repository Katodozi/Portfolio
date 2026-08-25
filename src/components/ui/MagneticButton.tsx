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
    setPosition({ x: x * 0.15, y: y * 0.15 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = clsx(
    "relative inline-flex items-center justify-center gap-2 rounded-sharp px-5 py-2.5 font-mono text-sm font-semibold transition-all duration-200",
    variant === "primary"
      ? "btn-glow-primary bg-primary text-bg hover:bg-primary-dim"
      : "border border-border-2 bg-transparent text-text-2 hover:border-primary hover:text-primary",
    className
  );

  const style = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition:
      position.x === 0 && position.y === 0
        ? "transform 0.3s ease, background-color 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s"
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

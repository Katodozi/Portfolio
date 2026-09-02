"use client";

import { useRef, ReactNode } from "react";
import gsap from "gsap";
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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    gsap.to(ref.current, {
      x: (e.clientX - centerX) * 0.3,
      y: (e.clientY - centerY) * 0.3,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  const baseStyles = clsx(
    "relative inline-flex items-center justify-center gap-2 rounded-sharp px-5 py-2.5 font-mono text-sm font-semibold transition-all duration-200",
    variant === "primary"
      ? "btn-glow-primary bg-primary text-bg hover:bg-primary-dim"
      : "border border-border-2 bg-transparent text-text-2 hover:border-primary hover:text-primary",
    className
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        download={download}
        target={target}
        rel={rel}
        className={baseStyles}
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="pointer"
    >
      {children}
    </button>
  );
}

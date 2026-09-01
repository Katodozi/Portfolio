"use client";

import { useEffect, useRef } from "react";

type Drop = {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  width: number;
};

export default function ParticleCanvas() {
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

    const isMobile = window.innerWidth < 768;
    const DROP_COUNT = isMobile ? 55 : 110;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    const makeDrop = (): Drop => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: 8 + Math.random() * 18,
      speed: 2.2 + Math.random() * 4.2,
      opacity: 0.28 + Math.random() * 0.55,
      width: 0.6 + Math.random() * 1.1,
    });

    const drops: Drop[] = Array.from({ length: DROP_COUNT }, makeDrop);

    let animId: number;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drops.forEach((d) => {
        const gradient = ctx.createLinearGradient(d.x, d.y, d.x, d.y + d.length);
        gradient.addColorStop(0, `rgba(91, 184, 212, 0)`);
        gradient.addColorStop(0.35, `rgba(100, 255, 218, ${d.opacity * 0.45})`);
        gradient.addColorStop(1, `rgba(91, 184, 212, ${d.opacity})`);

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = d.width;
        ctx.lineCap = "round";
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + 0.4, d.y + d.length);
        ctx.stroke();

        d.y += d.speed;
        d.x += 0.12;

        if (d.y > canvas.height + 20) {
          d.y = -d.length;
          d.x = Math.random() * canvas.width;
        }
        if (d.x > canvas.width) d.x = 0;
      });

      animId = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => setCanvasSize();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 h-full w-full opacity-80"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}

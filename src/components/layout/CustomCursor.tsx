"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isClicking, setIsClicking] = useState(false);
  const trailRef = useRef<{ x: number; y: number; id: number }[]>([]);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const trailCounter = useRef(0);

  useEffect(() => {
    const touch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    setIsTouchDevice(touch);
    if (touch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Add trail point
      const newPoint = { x: e.clientX, y: e.clientY, id: trailCounter.current++ };
      trailRef.current = [...trailRef.current, newPoint].slice(-8);
      setTrail([...trailRef.current]);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor='pointer']"
      );
      setIsHovering(!!interactive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", handleElementHover);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleElementHover);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  const primaryColor = isHovering ? "#64FFDA" : "#5BB8D4";
  const ringSize = isClicking ? 20 : isHovering ? 48 : 32;

  return (
    <>
      {/* Trail dots */}
      {trail.map((point, index) => {
        const opacity = (index + 1) / trail.length;
        const size = ((index + 1) / trail.length) * 4;
        return (
          <div
            key={point.id}
            className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full"
            style={{
              transform: `translate(${point.x}px, ${point.y}px) translate(-50%, -50%)`,
              width: size,
              height: size,
              backgroundColor: isHovering
                ? `rgba(100, 255, 218, ${opacity * 0.6})`
                : `rgba(91, 184, 212, ${opacity * 0.5})`,
              boxShadow: `0 0 ${size * 2}px ${
                isHovering
                  ? `rgba(100, 255, 218, ${opacity * 0.4})`
                  : `rgba(91, 184, 212, ${opacity * 0.3})`
              }`,
            }}
          />
        );
      })}

      {/* Main cursor */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-[10000]"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Outer ring — hexagon-ish via clip-path */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            width: ringSize,
            height: ringSize,
            border: `1px solid ${
              isHovering
                ? "rgba(100, 255, 218, 0.8)"
                : "rgba(91, 184, 212, 0.5)"
            }`,
            clipPath:
              "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
            transition:
              "width 0.2s ease, height 0.2s ease, border-color 0.2s ease",
            animation: "spin-slow 4s linear infinite",
            boxShadow: `0 0 ${isHovering ? 16 : 8}px ${
              isHovering
                ? "rgba(100, 255, 218, 0.3)"
                : "rgba(91, 184, 212, 0.2)"
            }`,
          }}
        />

        {/* Inner rotating square */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            width: ringSize * 0.55,
            height: ringSize * 0.55,
            border: `1px solid ${
              isHovering
                ? "rgba(100, 255, 218, 0.5)"
                : "rgba(91, 184, 212, 0.3)"
            }`,
            transition: "width 0.2s ease, height 0.2s ease",
            animation: "spin-reverse 3s linear infinite",
          }}
        />

        {/* Center dot with glow */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: isClicking ? 2 : isHovering ? 5 : 3,
            height: isClicking ? 2 : isHovering ? 5 : 3,
            backgroundColor: primaryColor,
            boxShadow: `0 0 ${isHovering ? 12 : 6}px ${primaryColor}, 0 0 ${
              isHovering ? 24 : 10
            }px ${
              isHovering
                ? "rgba(100, 255, 218, 0.4)"
                : "rgba(91, 184, 212, 0.3)"
            }`,
            transition: "all 0.15s ease",
          }}
        />

        {/* Corner brackets — appear on hover */}
        {isHovering && (
          <>
            {/* Top-left */}
            <div className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: -ringSize * 0.6, top: -ringSize * 0.6 }}>
              <div style={{
                width: 8, height: 8,
                borderTop: "1.5px solid rgba(100,255,218,0.9)",
                borderLeft: "1.5px solid rgba(100,255,218,0.9)",
              }} />
            </div>
            {/* Top-right */}
            <div className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: ringSize * 0.6, top: -ringSize * 0.6 }}>
              <div style={{
                width: 8, height: 8,
                borderTop: "1.5px solid rgba(100,255,218,0.9)",
                borderRight: "1.5px solid rgba(100,255,218,0.9)",
              }} />
            </div>
            {/* Bottom-left */}
            <div className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: -ringSize * 0.6, top: ringSize * 0.6 }}>
              <div style={{
                width: 8, height: 8,
                borderBottom: "1.5px solid rgba(100,255,218,0.9)",
                borderLeft: "1.5px solid rgba(100,255,218,0.9)",
              }} />
            </div>
            {/* Bottom-right */}
            <div className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: ringSize * 0.6, top: ringSize * 0.6 }}>
              <div style={{
                width: 8, height: 8,
                borderBottom: "1.5px solid rgba(100,255,218,0.9)",
                borderRight: "1.5px solid rgba(100,255,218,0.9)",
              }} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
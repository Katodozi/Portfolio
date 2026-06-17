"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { navItems } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target && lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.2 });
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className={clsx(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass py-3" : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 md:px-8 lg:px-16">
        <button
          onClick={() => handleNavClick("#hero")}
          className="font-heading text-lg font-bold tracking-tight text-text"
          data-cursor="pointer"
        >
          AB<span className="text-accent">.</span>
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.slice(1).map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.href)}
                className={clsx(
                  "relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                  activeSection === item.id
                    ? "text-accent"
                    : "text-muted hover:text-text"
                )}
                data-cursor="pointer"
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-accent glow-line"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => handleNavClick("#contact")}
          className="hidden rounded-md border border-primary/40 px-4 py-2 text-sm font-medium text-primary transition-all duration-200 hover:border-accent hover:text-accent hover:glow-accent md:block"
          data-cursor="pointer"
        >
          Hire Me
        </button>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
          data-cursor="pointer"
        >
          <span
            className={clsx(
              "block h-0.5 w-6 bg-text transition-transform duration-300",
              mobileOpen && "translate-y-2 rotate-45"
            )}
          />
          <span
            className={clsx(
              "block h-0.5 w-6 bg-text transition-opacity duration-300",
              mobileOpen && "opacity-0"
            )}
          />
          <span
            className={clsx(
              "block h-0.5 w-6 bg-text transition-transform duration-300",
              mobileOpen && "-translate-y-2 -rotate-45"
            )}
          />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass overflow-hidden md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={clsx(
                      "w-full rounded-md px-4 py-3 text-left text-sm font-medium transition-colors",
                      activeSection === item.id
                        ? "text-accent bg-surface"
                        : "text-muted"
                    )}
                    data-cursor="pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

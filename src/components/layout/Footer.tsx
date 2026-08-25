"use client";

import { personalInfo } from "@/lib/data";
import SocialIcons from "@/components/ui/SocialIcons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-4 py-8 md:px-8 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-heading text-sm font-bold text-text">
            AB<span className="text-primary">.</span>
          </p>
          <p className="mt-1 font-mono text-xs text-muted">
            &copy; {year} {personalInfo.name}. All rights reserved.
          </p>
        </div>
        <SocialIcons size={18} />
      </div>
    </footer>
  );
}

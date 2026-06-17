"use client";

import { personalInfo } from "@/lib/data";
import SocialIcons from "@/components/ui/SocialIcons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/50 px-4 py-8 md:px-8 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-heading text-sm font-semibold text-text">
            {personalInfo.name}
          </p>
          <p className="mt-1 text-xs text-muted">
            &copy; {year} All rights reserved.
          </p>
        </div>
        <SocialIcons size={18} />
      </div>
    </footer>
  );
}

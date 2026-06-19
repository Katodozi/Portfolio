export type SkillCategory = "ai-ml" | "full-stack" | "cms-seo" | "devops";

export type ProjectCategory = "all" | "ai-ml" | "full-stack" | "web-scraping";

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  username?: string;
}

export interface SkillGroup {
  id: SkillCategory;
  label: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: Exclude<ProjectCategory, "all">;
  github: string;
  live?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  ongoing?: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  university?: string;
  period: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  verifyUrl: string;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  about: string;
  typewriterRoles: string[];
  cvPath: string;
  profileImage: string;
  profileImageFallback: string;
  initials: string;
  socials: SocialLink[];
}

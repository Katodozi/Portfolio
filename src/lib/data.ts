import type {
  Certification,
  Education,
  Experience,
  NavItem,
  PersonalInfo,
  Project,
  SkillGroup,
  Stat,
} from "@/types";

export const personalInfo: PersonalInfo = {
  name: "Anuj Bhattarai",
  title: "Full Stack Engineer & AI/ML Developer",
  tagline: "Building Intelligent Web Solutions",
  location: "Kathmandu, Nepal",
  email: "anuzbhattarai12@gmail.com",
  about:
    "Computer Engineering graduate (Pokhara University, 2026) specializing in AI/ML engineering and Full Stack development. Built one of Nepal's few open-source NLP tools for the Nepali language (17M+ speakers). Developed locally-hosted LLM platforms with zero paid API dependency. IBM-certified in AI Fundamentals (2026).",
  typewriterRoles: [
    "Full Stack Engineer",
    "AI/ML Developer",
    "NLP Researcher",
  ],
  cvPath: "/cv/anuj-bhattarai-cv.pdf",
  profileImage: "/images/profile.webp",
  profileImageFallback: "/images/profile-placeholder.svg",
  initials: "AB",
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/Katodozi",
      icon: "github",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/anuj-bhattarai-268a1a285/",
      icon: "linkedin",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/passing_through_2000s",
      icon: "instagram",
      username: "@passing_through_2000s",
    },
    {
      name: "Kaggle",
      url: "https://www.kaggle.com/anujbhattrai",
      icon: "kaggle",
    },
  ],
};

export const navItems: NavItem[] = [
  { id: "hero", label: "Home", href: "#hero" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "testimonials", label: "References", href: "#testimonials" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "education", label: "Education", href: "#education" },
  { id: "certifications", label: "Certs", href: "#certifications" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const stats: Stat[] = [
  { id: "internships", label: "Internships", value: 2 },
  { id: "projects", label: "Projects", value: 7, suffix: "+" },
  { id: "certifications", label: "IBM Certifications", value: 1 },
];

export const skillGroups: SkillGroup[] = [
  {
    id: "ai-ml",
    label: "AI/ML",
    skills: [
      "Python",
      "TensorFlow",
      "Scikit-learn",
      "NumPy",
      "Pandas",
      "NLTK",
      "TextRank",
      "Word Embeddings",
      "CNN",
      "NLP",
      "Prompt Engineering",
      "RAG Architecture",
      "Ollama",
      "Local LLMs",
      "Jupyter Notebook",
    ],
  },
  {
    id: "full-stack",
    label: "Full Stack",
    skills: [
      "React.js",
      "Next.js",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Java",
      "Spring Boot",
      "Spring Security",
      "JWT",
      "Django",
      "Django REST Framework",
      "FastAPI",
      "Streamlit",
      "Selenium",
      "Playwright",
      "BeautifulSoup",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
    ],
  },
  {
    id: "cms-seo",
    label: "CMS/SEO",
    skills: [
      "WordPress",
      "Elementor",
      "Yoast SEO",
      "RankMath",
      "Google Analytics",
      "Google Search Console",
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    skills: [
      "Docker",
      "Git",
      "GitHub",
      "GitHub Actions",
      "Linux",
      "Apache Kafka",
    ],
  },
];

export const skillProficiency = [
  { name: "Python", level: 85 },
  { name: "React / Next.js", level: 78 },
  { name: "Django", level: 75 },
  { name: "NLP / LLMs", level: 72 },
  { name: "TypeScript", level: 70 },
  { name: "Docker / DevOps", level: 62 },
];

export const testimonials = [
  {
    id: "placeholder-1",
    quote:
      "Demonstrated dedication, professionalism, and a willingness to learn throughout his internship period. He actively contributed to the development of an AI-Powered Auto Bill Scan and Record Keeping System, where he was involved in data processing, document digitization, and AI-based automation tasks.",
    name: "Suraj Koirala",
    role: "CEO · CodeQuant",
    placeholder: true,
  },
  {
    id: "placeholder-2",
    quote:
      "Anuj is a dedicated employee at Codavatar, where he has demonstrated a strong commitment to learning and contributing to the development of Enterprise websites and optimize their content for SEO. He was involved in data processing, document digitization, and AI-based automation tasks, showing a proactive approach to problem-solving and a willingness to take on new challenges.",
    name: "Ishwor Tamang",
    role: "Team Lead · Codavatar",
    placeholder: true,
  },
  // {
  //   id: "placeholder-3",
  //   quote:
  //     "Optional third testimonial. You can replace these three cards with real reviews anytime.",
  //   name: "Name",
  //   role: "Role · Company",
  //   placeholder: true,
  // },
];

export const projects: Project[] = [
  {
    id: "maxx-boxing",
    title: "MaxX Boxing Club",
    description:
      "A full-stack Next.js site and admin CMS for a boxing gym — from a parallax marketing site to authenticated content management. NextAuth-protected admin for coaches, blog posts, news, and memberships. Data layer redesigned to fail over from local JSON to Upstash Redis after Vercel’s read-only filesystem, with zero changes to the rest of the app.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "NextAuth", "Upstash Redis"],
    category: "full-stack",
    github: "https://github.com/Katodozi",
  },
  {
    id: "nepali-summarizer",
    title: "Nepali Text Summarizer",
    description:
      "Django web app for Nepali language NLP — extractive summarization using TextRank and custom word embeddings. One of Nepal's few open-source NLP tools.",
    tech: ["Python", "Django", "NumPy", "Scikit-learn", "NLP", "TextRank"],
    category: "ai-ml",
    github: "https://github.com/Katodozi/Nepali_summarizer",
    live: "https://nepali-summarizer.vercel.app",
  },
  {
    id: "career-navigation",
    title: "AI-Powered Career Navigation System",
    description:
      "End-to-end AI career platform: scrapes live jobs from Merojob, NLP-powered skill matching, locally-hosted LLM (Ollama) for personalized learning roadmaps. Zero paid API dependency.",
    tech: ["Python", "Streamlit", "MongoDB", "Ollama", "NLP", "RAG"],
    category: "ai-ml",
    github: "https://github.com/Katodozi/AI-powered-career-navigation-system",
  },
  {
    id: "petty-cash",
    title: "Petty Cash Expense Extractor",
    description:
      "Gemini API multimodal vision feature for a construction management system. Scans printed/handwritten expense bills (Nepali + English) and extracts structured data automatically.",
    tech: ["Python", "Gemini API", "Multimodal Vision", "OCR"],
    category: "ai-ml",
    github: "https://github.com/Katodozi",
  },

    {
      id: "job-scraper",
      title: "E-Learning Platform",
      category: "full-stack",
      description: "A one-stop learning platform covering frontend, backend, DevOps and more. Lets users browse courses, join discussions, and track their progress.",
      tech: ["React", "FastAPI", "Tailwindcss", "GEMINI", "Postgres", "Docker", "LLM"],
      github: "https://github.com/Katodozi/E-Learning-Platform",
    },
  {
    id: "journal-app",
    title: "Journal App — Spring Boot + React",
    description:
      "Secure full-stack journal with JWT auth, Spring Security, RBAC, MongoDB, React frontend.",
    tech: ["Java", "Spring Boot", "Spring Security", "JWT", "MongoDB", "React.js"],
    category: "full-stack",
    github: "https://github.com/Katodozi/Journal-App-Spring-boot-mongodb-",
  },
  {
    id: "blog-platform",
    title: "Blog Platform — Django REST Framework",
    description:
      "Full-featured blog REST API: token auth, CRUD, nested serializers, pagination.",
    tech: ["Python", "Django", "DRF", "PostgreSQL"],
    category: "full-stack",
    github: "https://github.com/Katodozi/Blog_using_Django_rest_framework",
  },
];

export const experience: Experience[] = [
  {
    id: "codequant",
    company: "CodeQuant",
    role: "Full Stack & AI/ML Intern",
    duration: "3 months",
  },
  {
    id: "entegra",
    company: "Entegra (Codavatar)",
    role: "WordPress & SEO Intern",
    duration: "3 months",
    ongoing: true,
  },
];

export const education: Education[] = [
  {
    id: "be-ce",
    degree: "BE Computer Engineering",
    institution: "Everest Engineering College",
    university: "Pokhara University",
    period: "2022–2026",
  },
  {
    id: "plus-two",
    degree: "+2 Science",
    institution: "Omega International College",
    period: "2019–2021",
  },
];

export const certifications: Certification[] = [
  {
    id: "ibm-ai",
    name: "Artificial Intelligence Fundamentals",
    issuer: "IBM SkillsBuild",
    date: "Apr 2026",
    verifyUrl:
      "https://www.credly.com/badges/79b405f8-1d24-43ca-bb63-f4cbc9236558",
  },
];

export const projectFilters = [
  { id: "all" as const, label: "All" },
  { id: "ai-ml" as const, label: "AI/ML" },
  { id: "full-stack" as const, label: "Full Stack" },
  { id: "web-scraping" as const, label: "Web Scraping" },
];

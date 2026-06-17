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
      url: "https://www.kaggle.com/anujbhattari",
      icon: "kaggle",
    },
  ],
};

export const navItems: NavItem[] = [
  { id: "hero", label: "Home", href: "#hero" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "education", label: "Education", href: "#education" },
  { id: "certifications", label: "Certs", href: "#certifications" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const stats: Stat[] = [
  { id: "internships", label: "Internships", value: 2 },
  { id: "projects", label: "Projects", value: 6, suffix: "+" },
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

export const projects: Project[] = [
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
    title: "Job Scraper + LLM Query Platform",
    description:
      "Automated job aggregator with natural-language query interface via local LLM. RAG-style architecture, no external API costs.",
    tech: ["Python", "BeautifulSoup", "Selenium", "Ollama", "RAG"],
    category: "web-scraping",
    github:
      "https://github.com/Katodozi/job-scraper-requests-and-bs4--and-query-platform-using-local-llm-",
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

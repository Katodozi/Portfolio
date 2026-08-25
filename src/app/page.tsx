"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import ParticleCanvas from "@/components/sections/ParticleCanvas";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Anuj Bhattarai",
  url: "https://anuj-bhattarai.com.np",
  email: "anuzbhattarai12@gmail.com",
  image: "https://anuj-bhattarai.com.np/og-image.jpg",
  jobTitle: "Full Stack Engineer & AI/ML Developer",
  description:
    "Computer Engineering graduate from Pokhara University, Nepal, specializing in Full Stack Development and AI/ML Engineering.",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Pokhara University",
    sameAs: "https://www.pu.edu.np",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
  sameAs: [
    "https://github.com/Katodozi",
    "https://www.linkedin.com/in/anuj-bhattarai-268a1a285/",
    "https://www.instagram.com/passing_through_2000s/",
  ],
  knowsAbout: [
    "Full Stack Development",
    "Artificial Intelligence",
    "Machine Learning",
    "Natural Language Processing",
    "React.js",
    "Next.js",
    "Django",
    "Spring Boot",
    "Python",
    "Java",
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "AI Fundamentals",
    credentialCategory: "Certificate",
    recognizedBy: {
      "@type": "Organization",
      name: "IBM SkillsBuild",
    },
  },
};

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <main
        className="relative min-h-screen"
        style={{ opacity: loading ? 0 : 1, transition: "opacity 0.6s ease" }}
      >
        <ParticleCanvas />
        <div className="hero-grid pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
        <div className="relative z-[1]">
          <ScrollProgress />
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Certifications />
          <Contact />
          <Footer />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </main>
    </>
  );
}

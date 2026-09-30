import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import CustomCursor from "@/components/layout/CustomCursor";
import AuroraBackground from "@/components/layout/AuroraBackground";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anuj-bhattarai.com.np"),
  title: {
    default: "Anuj Bhattarai | Full Stack Digital Marketer & Seo Specialist",
    template: "%s | Anuj Bhattarai",
  },
  description:
    "Computer Engineering graduate (Pokhara University, 2026) specializing in Full Stack web development and Digital Marketing proficient in Wordpress, Python, React, SEO, AI/ML/NLP and many other latest technologies.",
  keywords: [
    "Anuj Bhattarai",
    "Anuj Bhattarai Nepal",
    "Anuj Bhattarai portfolio",
    "Full Stack Digital Marketer",
    "Full Stack Developer Nepal",
    "Seo Specialist Nepal",
    "Seo Expert Nepal",
    "Wordpress Developer Nepal",
    "AI ML Engineer Nepal",
    "AI ML Engineer Kathmandu",
    "Next.js developer Nepal",
    "React developer Nepal",
    "Django developer Nepal",
    "NLP engineer Nepal",
    "freelance developer Nepal",
    "Kathmandu developer",
    "Pokhara University computer engineering",
    "Katodozi",
  ],
  authors: [{ name: "Anuj Bhattarai", url: "https://anuj-bhattarai.com.np" }],
  creator: "Anuj Bhattarai",
  publisher: "Anuj Bhattarai",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anuj-bhattarai.com.np",
    siteName: "Anuj Bhattarai",
    title: "Anuj Bhattarai | Full Stack Digital Marketer & Seo Specialist",
    description:
      "Computer Engineering graduate from Nepal building intelligent full-stack applications. Specializing in React, Next.js, Django, NLP, and LLM integration.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Anuj Bhattarai — Full Stack Digital Marketer & Seo Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anuj Bhattarai | Full Stack Digital Marketer & Seo Specialist",
    description:
      "Computer Engineering graduate from Nepal building intelligent full-stack applications.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://anuj-bhattarai.com.np",
  },
  verification: {
    google: "yYjfItYLniSMy-zpz1VL_2waRcujw8BQPjgVz93NVE4",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body antialiased">
        <SmoothScrollProvider>
          <AuroraBackground />
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  );
}

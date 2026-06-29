import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import CustomCursor from "@/components/layout/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
      metadataBase: new URL("https://anujbhattarai.dev"),
      title: "Anuj Bhattarai | Full Stack Engineer & AI/ML Developer",
      description:
        "Portfolio of Anuj Bhattarai — Full Stack Engineer & AI/ML Developer from Kathmandu, Nepal. Building intelligent web solutions with NLP, local LLMs, and modern full-stack technologies.",
      keywords: [
        "Anuj Bhattarai",
        "Full Stack Developer",
        "AI/ML Engineer",
        "NLP",
        "Nepal",
        "Freelance Developer",
        "Next.js",
        "Python",
        "Django",
      ],
      authors: [{ name: "Anuj Bhattarai" }],
      openGraph: {
        title: "Anuj Bhattarai | Full Stack Engineer & AI/ML Developer",
        description:
          "Building Intelligent Web Solutions — NLP tools, local LLM platforms, and full-stack applications.",
        url: "https://anujbhattarai.dev",
        siteName: "Anuj Bhattarai Portfolio",
        locale: "en_US",
        type: "website",
        images: [
          {
            url: "/og-image.png",
            width: 1200,
            height: 630,
            alt: "Anuj Bhattarai — Full Stack Engineer & AI/ML Developer",
          },
        ],
      },
      // Integrated Google Search Console verification code
      verification: {
        google: "ILZNB_pC5hw5WK0lRrJj-teUn27fPheYRzdQjNQqdLQ",
      },
  twitter: {
    card: "summary_large_image",
    title: "Anuj Bhattarai | Full Stack Engineer & AI/ML Developer",
    description:
      "Building Intelligent Web Solutions — NLP, AI/ML, and Full Stack Development.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

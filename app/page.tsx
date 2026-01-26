import { Metadata } from "next";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PrinciplesSection } from "@/components/sections/PrinciplesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { LogoSection } from "@/components/sections/LogoSection";
import PortfolioGallery from "@/components/sections/PortfolioGallery";
import FunctionsSection from "@/components/sections/FunctionsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { CardsSection } from "@/components/sections/CardsSection";
import { HeroSection } from "@/components/sections/HeroSection";

export const metadata: Metadata = {
  title: "Bureau d'Études Techniques Agadir & Ingénierie | JBH Engineering",
  description: "Bureau d'études techniques JBH Engineering à Agadir. Experts en ingénierie structure, lots techniques, VRD et sécurité incendie. +500 projets au Maroc.",
  keywords: [
    "bureau études techniques Agadir",
    "ingénierie structure Maroc",
    "JBH Engineering",
    "lots techniques Agadir",
    "VRD Maroc",
    "sécurité incendie Agadir",
    "ingénierie bâtiment Maroc",
    "bureau études Agadir",
    "conception structure béton armé",
    "charpente métallique Maroc",
    "CVC plomberie électricité",
    "contrôle technique construction",
    "étude technique bâtiment",
    "ingénieur structure Agadir",
    "voirie réseaux divers",
    "bureau ingénierie Maroc",
    "étude béton armé Agadir",
    "installation technique bâtiment"
  ],
  openGraph: {
    title: "Bureau d'Études Techniques Agadir & Ingénierie | JBH Engineering",
    description: "Expert en ingénierie de structure, lots techniques, VRD et sécurité incendie à Agadir. Plus de 500 projets réalisés.",
    type: "website",
    locale: "fr_MA",
    url: "https://jbh.ma",
    siteName: "JBH ENGINEERING",
    images: [
      {
        url: "/images/og/home-og.jpg",
        width: 1200,
        height: 630,
        alt: "JBH Engineering - Architecture & Design Visionnaire"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Bureau d'Études Techniques Agadir & Ingénierie | JBH Engineering",
    description: "Bureau d'études techniques à Agadir. Ingénierie structure, lots techniques, VRD, sécurité incendie. 500+ projets réalisés.",
    images: ["/images/og/home-og.jpg"]
  },
  alternates: {
    canonical: "https://jbh.ma"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    google: "your-google-verification-code"
  }
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PrinciplesSection />
      <CardsSection />
      <StatsSection />
      <FunctionsSection />
      <ProcessSection />
      <PortfolioGallery />
      <TestimonialsSection />
      <LogoSection />
      <BlogSection />
    </>
  );
}

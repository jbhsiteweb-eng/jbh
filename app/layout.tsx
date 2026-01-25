import type { Metadata, Viewport } from "next";
import { Josefin_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header2 } from "@/components/layout/Header2";
import { Footer2 } from "@/components/layout/Footer2";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { StructuredData } from "@/components/seo/StructuredData";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jbh.ma"),
  title: {
    default: "JBH ENGINEERING | Bureau d'Études Techniques - Ingénierie à Agadir, Maroc",
    template: "%s | JBH ENGINEERING"
  },
  description: "JBH ENGINEERING - Bureau d'études techniques de référence à Agadir, Maroc. Spécialisé en ingénierie de structure (béton armé, charpente métallique), lots techniques (CVC, plomberie, électricité), VRD et sécurité incendie. Plus de 500 projets réalisés avec expertise et innovation.",
  keywords: [
    "bureau études techniques Agadir",
    "ingénierie structure Maroc",
    "JBH Engineering Agadir",
    "lots techniques bâtiment",
    "VRD voirie réseaux divers",
    "sécurité incendie Maroc",
    "béton armé charpente métallique",
    "CVC plomberie électricité",
    "contrôle technique Agadir",
    "bureau ingénierie Maroc",
    "étude structure bâtiment",
    "installation technique Agadir",
    "ingénieur génie civil Maroc",
    "bureau études Agadir",
    "conception structure Maroc"
  ],
  authors: [{ name: "JBH ENGINEERING", url: "https://jbh.ma" }],
  creator: "JBH ENGINEERING",
  publisher: "JBH ENGINEERING",
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  twitter: {
    card: "summary_large_image",
    site: "@jbhengineering",
    creator: "@jbhengineering"
  },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    siteName: "JBH ENGINEERING",
    title: "JBH ENGINEERING | Bureau d'Études Techniques - Ingénierie Agadir",
    description: "Bureau d'études techniques expert à Agadir. Ingénierie structure, lots techniques, VRD, sécurité incendie. 500+ projets réalisés au Maroc.",
    images: [
      {
        url: "/images/og/home-og.jpg",
        width: 1200,
        height: 630,
        alt: "JBH Engineering - Architecture & Design"
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: "/images/logo/single-logo.png",
    shortcut: "/images/logo/single-logo.png",
    apple: "/images/logo/single-logo.png",
  },
  manifest: "/manifest.json",
  category: "Engineering"
};

export const viewport: Viewport = {
  themeColor: "#161616",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth antialiased" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body
        className={`${josefinSans.variable} ${dmSans.variable} font-body bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-foreground`}
        cz-shortcut-listen="true"
      >
        <Header2 />
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
        <Footer2 />
        <WhatsAppButton />
      </body>
    </html>
  );
}

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "À Propos | JBH ENGINEERING - Bureau d'Études Techniques Expert à Agadir",
    description: "Découvrez JBH ENGINEERING, bureau d'études techniques de référence à Agadir. Spécialisé en ingénierie de structure, lots techniques, VRD et sécurité incendie. Plus de 15 ans d'expérience et 100+ projets réalisés au Maroc.",
    keywords: [
        "bureau études techniques Agadir",
        "ingénierie structure Maroc",
        "JBH Engineering à propos",
        "équipe ingénieurs experts",
        "lots techniques Agadir",
        "VRD Maroc",
        "sécurité incendie expertise",
        "bureau ingénierie Agadir histoire"
    ],
    openGraph: {
        title: "À Propos de JBH ENGINEERING | Bureau d'Études Techniques Agadir",
        description: "Plus de 15 ans d'excellence en ingénierie. Découvrez notre équipe d'ingénieurs experts et notre approche technique innovante.",
        type: "website",
        locale: "fr_MA",
        url: "https://jbh.ma/about",
        siteName: "JBH ENGINEERING",
        images: [
            {
                url: "/images/og/about-og.jpg",
                width: 1200,
                height: 630,
                alt: "Équipe JBH Engineering - Architecture Innovante"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "À Propos | JBH ENGINEERING",
        description: "Découvrez notre équipe d'ingénieurs experts avec 15+ ans d'expérience et 100+ projets réalisés.",
        images: ["/images/og/about-og.jpg"]
    },
    alternates: {
        canonical: "https://jbh.ma/about"
    }
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projets | JBH ENGINEERING - Portfolio Ingénierie Structure, Lots Techniques & VRD",
    description: "Explorez notre portfolio de projets d'ingénierie : études de structure, lots techniques (CVC, plomberie, électricité), VRD et sécurité incendie. Plus de 100 projets réalisés au Maroc dans les secteurs résidentiel, commercial, industriel et santé.",
    keywords: [
        "projets ingénierie Maroc",
        "portfolio bureau études Agadir",
        "études structure béton armé",
        "projets lots techniques",
        "VRD voirie réseaux",
        "sécurité incendie projets",
        "ingénierie industrielle Maroc",
        "réalisations techniques Agadir"
    ],
    openGraph: {
        title: "Nos Projets | JBH ENGINEERING - Ingénierie d'Excellence",
        description: "Découvrez nos réalisations en ingénierie : projets de structure, lots techniques, VRD et sécurité incendie au Maroc.",
        type: "website",
        locale: "fr_MA",
        url: "https://jbh.ma/projects",
        siteName: "JBH ENGINEERING",
        images: [
            {
                url: "/images/og/projects-og.jpg",
                width: 1200,
                height: 630,
                alt: "Portfolio Projets JBH Engineering"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Projets | JBH ENGINEERING",
        description: "Portfolio de 100+ projets d'ingénierie : structure, lots techniques, VRD, sécurité incendie.",
        images: ["/images/og/projects-og.jpg"]
    },
    alternates: {
        canonical: "https://jbh.ma/projects"
    }
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

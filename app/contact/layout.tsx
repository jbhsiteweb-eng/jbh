import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | JBH ENGINEERING - Démarrez Votre Projet d'Ingénierie",
    description: "Contactez JBH ENGINEERING pour vos projets d'ingénierie de structure, lots techniques et VRD à Agadir, Maroc. Consultation gratuite, devis personnalisé. Appelez-nous au +212 661 85 85 81.",
    keywords: [
        "contact bureau études Agadir",
        "devis ingénierie Maroc",
        "consultation ingénieur gratuite",
        "bureau études techniques Agadir",
        "ingénieur structure contact",
        "projet ingénierie Maroc",
        "JBH Engineering contact",
        "demande devis études techniques"
    ],
    openGraph: {
        title: "Contactez-Nous | JBH ENGINEERING - Bureau d'Études Techniques",
        description: "Démarrez votre projet d'ingénierie. Consultation gratuite et devis personnalisé à Agadir, Maroc.",
        type: "website",
        locale: "fr_MA",
        url: "https://jbh.ma/contact",
        siteName: "JBH ENGINEERING",
        images: [
            {
                url: "/images/og/contact-og.jpg",
                width: 1200,
                height: 630,
                alt: "Contactez JBH Engineering"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact | JBH ENGINEERING",
        description: "Contactez-nous pour une consultation gratuite. +212 661 85 85 81 | Agadir, Maroc",
        images: ["/images/og/contact-og.jpg"]
    },
    alternates: {
        canonical: "https://jbh.ma/contact"
    },
    other: {
        "geo.region": "MA-AGD",
        "geo.placename": "Agadir",
        "geo.position": "30.4278;-9.5981"
    }
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

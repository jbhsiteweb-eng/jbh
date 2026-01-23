import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | JBH ENGINEERING - Actualités Ingénierie & Construction",
    description: "Suivez les dernières tendances en ingénierie de structure, lots techniques, VRD et sécurité incendie. Articles d'experts, conseils techniques et innovations du secteur.",
    keywords: [
        "blog ingénierie Maroc",
        "actualités construction technique",
        "tendances ingénierie structure",
        "lots techniques innovation",
        "VRD actualités",
        "conseils ingénieur",
        "articles ingénierie bâtiment",
        "sécurité incendie normes"
    ],
    openGraph: {
        title: "Blog Ingénierie | JBH ENGINEERING",
        description: "Articles et conseils d'experts sur l'ingénierie de structure, les lots techniques et la construction.",
        type: "website",
        locale: "fr_MA",
        url: "https://jbh.ma/blog",
        siteName: "JBH ENGINEERING",
        images: [
            {
                url: "/images/og/blog-og.jpg",
                width: 1200,
                height: 630,
                alt: "Blog JBH Engineering - Actualités Architecture"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog | JBH ENGINEERING",
        description: "Articles et tendances en ingénierie, construction technique et lots techniques.",
        images: ["/images/og/blog-og.jpg"]
    },
    alternates: {
        canonical: "https://jbh.ma/blog"
    }
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

import { siteConfig } from "@/config/site";

export function StructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ArchitecturalFirm",
        "@id": "https://jbh.ma",
        "name": siteConfig.name,
        "alternateName": "JBH Engineering Architecture",
        "url": "https://jbh.ma",
        "logo": "https://jbh.ma/images/logo/single-logo.png",
        "image": "https://jbh.ma/images/og/home-og.jpg",
        "description": siteConfig.description,
        "telephone": siteConfig.contact.phone,
        "email": siteConfig.contact.email,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": siteConfig.address.street,
            "addressLocality": siteConfig.address.city,
            "postalCode": siteConfig.address.zip,
            "addressCountry": siteConfig.address.country
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "30.4278",
            "longitude": "-9.5981"
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "09:00",
                "closes": "12:00"
            }
        ],
        "priceRange": "$$",
        "areaServed": [
            {
                "@type": "Country",
                "name": "Morocco"
            },
            {
                "@type": "City",
                "name": "Agadir"
            }
        ],
        "sameAs": [
            siteConfig.social.facebook,
            siteConfig.social.instagram,
            siteConfig.social.twitter,
            siteConfig.social.linkedin,
            siteConfig.social.youtube
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "150"
        },
        "founder": {
            "@type": "Person",
            "name": "JBH Engineering Team"
        },
        "foundingDate": "1999",
        "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "value": "50"
        },
        "award": "150+ Prix d'Architecture",
        "knowsAbout": [
            "Architecture",
            "Design d'intérieur",
            "Construction durable",
            "Urbanisme",
            "Ingénierie structurelle"
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Services d'Architecture",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Conception Architecturale",
                        "description": "Conception architecturale innovante pour projets résidentiels et commerciaux"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Design d'Intérieur",
                        "description": "Design d'intérieur moderne et fonctionnel"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Construction Durable",
                        "description": "Solutions de construction écologique et durable"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Urbanisme",
                        "description": "Planification et design urbain"
                    }
                }
            ]
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}

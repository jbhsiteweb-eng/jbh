import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import siteConfig from "@/config/site";

// Blog posts data - In production, this would come from a CMS or database
const blogPosts = [
    {
        id: 1,
        slug: "future-sustainable-architecture-urban-development",
        title: "L'Avenir de l'Architecture Durable dans le Développement Urbain",
        excerpt: "Explorer comment les principes de conception écologique remodèlent nos villes et créent des environnements de vie plus sains pour les générations futures.",
        content: `
            <p>L'architecture durable a évolué d'une préoccupation de niche à un principe fondamental guidant le développement urbain mondial. Alors que les villes sont confrontées au changement climatique et à la croissance démographique, architectes et urbanistes réimaginent la façon dont nous concevons et construisons notre environnement bâti.</p>
            
            <h2>L'Essor des Normes de Construction Écologique</h2>
            <p>Au cours de la dernière décennie, les certifications de construction écologique comme LEED, BREEAM et WELL sont devenues des exigences standard pour les grands développements. Ces cadres poussent les architectes à considérer l'efficacité énergétique, la conservation de l'eau et la qualité de l'environnement intérieur dès les premières étapes de la conception.</p>
            
            <h2>Matériaux et Technologies Innovants</h2>
            <p>De nouveaux matériaux révolutionnent la construction durable. Le bois lamellé-croisé (CLT) offre une alternative à faible émission de carbone au béton et à l'acier, tandis que les matériaux à changement de phase aident à réguler passivement la température des bâtiments. Le vitrage solaire qui génère de l'électricité tout en laissant passer la lumière naturelle devient de plus en plus viable.</p>
            
            <h2>Intégration du Design Biophilique</h2>
            <p>Les bâtiments durables modernes intègrent de plus en plus les principes du design biophilique — intégrant des éléments naturels, des motifs et des matériaux pour créer des espaces plus sains et plus productifs. Les murs végétaux, les jardins intérieurs et les systèmes de ventilation naturelle deviennent des caractéristiques standard plutôt que des luxes.</p>
            
            <h2>L'Argument Économique pour la Durabilité</h2>
            <p>Au-delà des avantages environnementaux, les bâtiments durables offrent des avantages financiers convaincants. Des coûts d'exploitation réduits, des taux d'occupation plus élevés et des valeurs locatives premium rendent les bâtiments verts attractifs pour les investissements. Les études montrent systématiquement que les bâtiments durables surpassent les structures conventionnelles en termes de conservation de la valeur à long terme.</p>
            
            <h2>Vers l'Avenir</h2>
            <p>L'avenir de l'architecture urbaine réside dans le design régénératif — des bâtiments qui ne se contentent pas de minimiser les dommages mais contribuent activement à la restauration de l'environnement. Des façades séquestrant le carbone aux bâtiments produisant plus d'énergie qu'ils n'en consomment, la prochaine génération d'architecture urbaine promet de transformer notre relation avec l'environnement bâti.</p>
        `,
        category: "Durabilité",
        author: siteConfig.team[0].name,
        authorRole: siteConfig.team[0].role,
        authorImage: siteConfig.team[0].image,
        date: "8 Janvier 2024",
        readTime: "8 min de lecture",
        image: "https://images.unsplash.com/photo-1518005068251-37900150dfca?q=80&w=1600&auto=format&fit=crop",
        tags: ["Durabilité", "Urbanisme", "Bâtiment Vert", "Architecture"],
    },
    {
        id: 2,
        slug: "innovative-construction-materials-revolutionizing-industry",
        title: "5 Matériaux de Construction Innovants Révolutionnant l'Industrie",
        excerpt: "Du béton auto-réparant à l'aluminium transparent, découvrez les matériaux de pointe transformant la construction moderne.",
        content: `
            <p>L'industrie de la construction vit une révolution des matériaux. Les nouvelles technologies et les avancées scientifiques produisent des matériaux qui relevaient autrefois de la science-fiction, offrant des possibilités inédites aux architectes et aux ingénieurs.</p>
            
            <h2>1. Béton Auto-Réparant</h2>
            <p>Développé à l'aide de bactéries produisant du calcaire lorsqu'elles sont exposées à l'eau, le béton auto-réparant peut réparer automatiquement les fissures, prolongeant potentiellement la durée de vie des structures de plusieurs décennies et réduisant considérablement les coûts de maintenance.</p>
            
            <h2>2. Aluminium Transparent (ALON)</h2>
            <p>L'oxynitrure d'aluminium, ou ALON, est un matériau céramique optiquement transparent et nettement plus résistant que le verre. Utilisé principalement dans des applications militaires, il trouve sa place dans des contextes architecturaux où transparence et sécurité sont primordiales.</p>
            
            <h2>3. Polymère Renforcé de Fibres de Carbone (CFRP)</h2>
            <p>Le CFRP révolutionne le renforcement structurel. Plus léger et plus résistant que l'acier, il est de plus en plus utilisé dans la construction de ponts et la rénovation de bâtiments, permettant des conceptions impossibles avec des matériaux traditionnels.</p>
            
            <h2>4. Isolation Aérogel</h2>
            <p>Autrefois excessivement coûteux, l'aérogel devient plus accessible pour les applications de construction. Avec une conductivité thermique bien inférieure aux matériaux d'isolation traditionnels, il permet des murs plus fins tout en maintenant une performance énergétique supérieure.</p>
            
            <h2>5. Béton Enrichi au Graphène</h2>
            <p>L'ajout de petites quantités de graphène au béton peut doubler sa résistance tout en réduisant la teneur en ciment de 50%. Cette avancée pourrait réduire considérablement l'empreinte carbone de l'industrie de la construction, la production de ciment représentant environ 8% des émissions mondiales de CO2.</p>
        `,
        category: "Construction",
        author: siteConfig.team[0].name,
        authorRole: siteConfig.team[0].role,
        authorImage: siteConfig.team[0].image,
        date: "5 Janvier 2024",
        readTime: "6 min de lecture",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop",
        tags: ["Construction", "Matériaux", "Innovation", "Technologie"],
    },
    {
        id: 3,
        slug: "minimalist-interior-design-creating-space-purpose",
        title: "Design Intérieur Minimaliste : Créer de l'Espace avec Intention",
        excerpt: "Apprenez comment les principes de design minimaliste peuvent transformer vos espaces de vie en environnements fonctionnels et sereins.",
        content: `
            <p>Le minimalisme en design d'intérieur est plus qu'un choix esthétique — c'est une philosophie qui privilégie l'intentionnalité, la fonctionnalité et l'impact psychologique de nos environnements physiques. Fondamentalement, le design minimaliste pose la question : de quoi avons-nous vraiment besoin pour nous épanouir ?</p>
            
            <h2>La Psychologie de la Simplicité</h2>
            <p>La recherche montre systématiquement que les environnements encombrés augmentent le stress et diminuent la concentration. Les intérieurs minimalistes, avec leurs lignes épurées et leur vide intentionnel, créent un espace mental en plus de l'espace physique, favorisant le calme et la clarté.</p>
            
            <h2>Qualité plutôt que Quantité</h2>
            <p>Le minimalisme ne signifie pas la privation. Au contraire, il met l'accent sur l'investissement dans moins de pièces, mais de meilleure qualité, qui apportent une véritable valeur à la vie quotidienne. Une seule chaise bien conçue devient un point focal plutôt que d'être perdue dans une foule de meubles.</p>
            
            <h2>Le Rôle de l'Espace Négatif</h2>
            <p>L'espace vide est un élément de design en soi. L'espace négatif — les zones entre et autour des objets — donne aux pièces de la respiration et permet d'apprécier les pièces individuelles. Apprendre à apprécier le vide est central dans le design minimaliste.</p>
            
            <h2>Mise en Œuvre Pratique</h2>
            <p>Passer au design minimaliste ne nécessite pas de repartir de zéro. Commencez par une seule pièce, en supprimant les objets qui ne servent pas un but clair ou n'apportent pas une joie véritable. Envisagez des solutions de rangement qui cachent les objets nécessaires mais visuellement perturbateurs.</p>
        `,
        category: "Design d'Intérieur",
        author: "Emily Rodriguez",
        authorRole: "Designer d'Intérieur",
        authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
        date: "3 Janvier 2024",
        readTime: "5 min de lecture",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop",
        tags: ["Design d'Intérieur", "Minimalisme", "Résidentiel", "Bien-être"],
    },
    {
        id: 4,
        slug: "smart-buildings-iot-transforming-architecture",
        title: "Bâtiments Intelligents : Comment l'IoT Transforme l'Architecture",
        excerpt: "Découvrez comment la technologie de l'Internet des Objets crée des bâtiments intelligents qui s'adaptent aux besoins des occupants.",
        content: `
            <p>L'intégration de la technologie de l'Internet des Objets (IoT) dans les systèmes de construction change fondamentalement la façon dont nous concevons, exploitons et vivons l'environnement bâti. Les bâtiments intelligents ne sont plus des concepts futuristes — ils sont la réalité d'aujourd'hui.</p>
            
            <h2>Au-delà de l'Automatisation</h2>
            <p>Si l'automatisation des bâtiments n'est pas nouvelle, l'IoT la porte à un autre niveau. Les bâtiments intelligents modernes ne se contentent pas d'automatiser — ils apprennent, prédisent et s'adaptent. Des capteurs dans tout le bâtiment collectent des données sur l'occupation, la température, l'éclairage et la qualité de l'air, alimentant des systèmes d'IA qui optimisent continuellement les performances.</p>
            
            <h2>L'Expérience de l'Occupant</h2>
            <p>Pour les occupants, la technologie intelligente se traduit par un confort personnalisé. Les applications permettent aux individus de contrôler leur environnement immédiat — réglage de l'éclairage, de la température et même de l'ombrage des fenêtres. Le bâtiment apprend les préférences au fil du temps, anticipant les besoins avant qu'ils ne soient exprimés.</p>
            
            <h2>Efficacité Opérationnelle</h2>
            <p>Les gestionnaires de bâtiments bénéficient d'une visibilité sans précédent sur les performances du bâtiment. Des tableaux de bord en temps réel suivent la consommation d'énergie, prédisent les besoins de maintenance et identifient les inefficacités. Les études montrent que les bâtiments intelligents peuvent réduire les coûts énergétiques de 20 à 40 % par rapport aux structures conventionnelles.</p>
            
            <h2>La Dimension des Données</h2>
            <p>Les bâtiments intelligents génèrent de vastes quantités de données, soulevant d'importantes questions sur la confidentialité et la sécurité. Une mise en œuvre responsable nécessite une réflexion approfondie sur les données collectées, leur utilisation et qui y a accès. Les bâtiments intelligents les plus réussis équilibrent fonctionnalité et transparence.</p>
        `,
        category: "Technologie",
        author: siteConfig.team[0].name,
        authorRole: siteConfig.team[0].role,
        authorImage: siteConfig.team[0].image,
        date: "28 Décembre 2023",
        readTime: "7 min de lecture",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
        tags: ["Technologie", "Bâtiments Intelligents", "IoT", "Innovation"],
    },
    {
        id: 5,
        slug: "biophilic-design-bringing-nature-modern-architecture",
        title: "Design Biophilique : Intégrer la Nature dans l'Architecture Moderne",
        excerpt: "Comment les architectes intègrent des éléments naturels pour améliorer le bien-être et la productivité dans les bâtiments.",
        content: `
            <p>Les humains ont évolué dans des environnements naturels, et nos corps et nos esprits restent en phase avec les rythmes et les modèles de la nature. Le design biophilique reconnaît cette connexion, intégrant délibérément des éléments naturels dans l'environnement bâti pour promouvoir le bien-être et la productivité.</p>
            
            <h2>La Science Derrière la Biophilie</h2>
            <p>La recherche démontre des avantages mesurables du design biophilique. Des études montrent que l'exposition à des éléments naturels dans les bâtiments réduit le stress, améliore la fonction cognitive et stimule la créativité. Les patients hospitalisés ayant vue sur la nature récupèrent plus vite que ceux faisant face à des murs de briques.</p>
            
            <h2>Expériences Directes de la Nature</h2>
            <p>Les éléments biophiliques les plus évidents sont les choses vivantes — plantes, éléments aquatiques et matériaux naturels. Les murs végétaux purifient l'air tout en offrant une connexion visuelle à la nature. Les arbres intérieurs et les jardins créent des points focaux qui rassemblent les occupants.</p>
            
            <h2>Références Indirectes à la Nature</h2>
            <p>Le design biophilique inclut également des références indirectes à la nature : des matériaux aux textures naturelles, des couleurs trouvées dans les paysages, des motifs fractals qui font écho aux formes naturelles. Ces éléments subtils fournissent une connexion subconsciente au monde naturel.</p>
            
            <h2>Mise en Œuvre des Principes Biophiliques</h2>
            <p>Un design biophilique réussi nécessite une intégration réfléchie dès les premières étapes de la conception. Il ne s'agit pas simplement d'ajouter des plantes à un bâtiment conventionnel — c'est repenser fondamentalement comment les bâtiments connectent les occupants aux modèles et processus naturels.</p>
        `,
        category: "Architecture",
        author: siteConfig.team[0].name,
        authorRole: siteConfig.team[0].role,
        authorImage: siteConfig.team[0].image,
        date: "22 Décembre 2023",
        readTime: "6 min de lecture",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
        tags: ["Architecture", "Design Biophilique", "Bien-être", "Nature"],
    },
    {
        id: 6,
        slug: "rise-modular-construction-commercial-buildings",
        title: "L'Essor de la Construction Modulaire dans les Bâtiments Commerciaux",
        excerpt: "Explorer comment les modules préfabriqués réduisent les délais et les coûts de construction tout en maintenant la qualité.",
        content: `
            <p>La construction modulaire — bâtir des structures à partir de modules préfabriqués fabriqués hors site — transforme le développement commercial. Autrefois associée principalement à des structures temporaires ou à faible coût, les méthodes modulaires livrent maintenant des bâtiments commerciaux sophistiqués en une fraction des délais traditionnels.</p>
            
            <h2>Vitesse de Mise sur le Marché</h2>
            <p>L'avantage le plus convaincant de la construction modulaire est la vitesse. Parce que les modules sont fabriqués pendant que les travaux sur site avancent, les délais globaux des projets peuvent être réduits de 30 à 50 %. Pour les clients commerciaux, cette accélération signifie un retour sur investissement plus rapide et des coûts de financement réduits.</p>
            
            <h2>Contrôle Qualité</h2>
            <p>La fabrication en usine permet une précision impossible sur les chantiers traditionnels. Les environnements climatisés éliminent les retards dus aux intempéries et permettent des conditions de travail constantes. Les outils de fabrication numérique garantissent une précision au millimètre près. Le résultat est une qualité supérieure à moindre coût.</p>
            
            <h2>Avantages en Matière de Durabilité</h2>
            <p>La construction modulaire génère beaucoup moins de déchets que les méthodes traditionnelles. La production en usine optimise l'utilisation des matériaux, et les environnements contrôlés réduisent les dommages pendant la construction. Le transport des modules terminés, bien que nécessitant de l'énergie, est généralement compensé par la réduction des impacts sur le site.</p>
            
            <h2>Flexibilité de Conception</h2>
            <p>La construction modulaire moderne offre une flexibilité de conception remarquable. L'ingénierie avancée permet aux modules de couvrir de plus grandes distances et de s'empiler plus haut. Les architectes explorent de plus en plus les méthodes modulaires pour des conceptions distinctives qui défient les idées préconçues sur les bâtiments préfabriqués.</p>
        `,
        category: "Construction",
        author: siteConfig.team[0].name,
        authorRole: siteConfig.team[0].role,
        authorImage: siteConfig.team[0].image,
        date: "18 Décembre 2023",
        readTime: "5 min de lecture",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop",
        tags: ["Construction", "Modulaire", "Commercial", "Innovation"],
    },
    {
        id: 7,
        slug: "color-psychology-interior-design-creating-mood",
        title: "Psychologie de la Couleur en Design d'Intérieur : Créer l'Ambiance",
        excerpt: "Comprendre comment les choix de couleurs affectent les émotions et le comportement dans les espaces résidentiels et commerciaux.",
        content: `
            <p>La couleur est l'un des outils les plus puissants de la palette d'un designer d'intérieur — non seulement pour l'esthétique, mais pour ses effets psychologiques profonds. Comprendre la psychologie des couleurs permet aux designers de créer des espaces qui évoquent des réponses émotionnelles spécifiques et soutiennent les activités prévues.</p>
            
            <h2>La Science de la Réponse à la Couleur</h2>
            <p>Nos réponses à la couleur ont des composantes à la fois physiologiques et culturelles. Si certaines réactions semblent universelles — le rouge augmentant le rythme cardiaque, le bleu abaissant la pression artérielle — les associations culturelles influencent considérablement la façon dont les individus interprètent des couleurs spécifiques.</p>
            
            <h2>Couleurs Chaudes : Énergie et Intimité</h2>
            <p>Les couleurs chaudes — rouges, oranges et jaunes — tendent à stimuler et à dynamiser. Elles peuvent rendre les grands espaces plus intimes mais peuvent submerger les petites pièces. Dans les salles à manger, les tons chauds stimulent l'appétit et la conversation. Dans les environnements commerciaux, elles peuvent encourager les achats impulsifs.</p>
            
            <h2>Couleurs Froides : Calme et Concentration</h2>
            <p>Les couleurs froides — bleus, verts et violets — favorisent généralement le calme et la concentration. Le bleu est particulièrement associé à la productivité, ce qui le rend populaire dans les environnements de bureau. Le vert, avec ses associations naturelles, fonctionne bien dans les espaces conçus pour la restauration et le bien-être.</p>
            
            <h2>Palettes Neutres</h2>
            <p>Les neutres offrent flexibilité et sophistication. Bien que souvent considérées comme sûres, les palettes neutres nécessitent une attention particulière aux sous-tons et aux textures pour éviter que les espaces ne paraissent plats. La clé est de comprendre que les neutres portent des informations de couleur subtiles qui affectent la perception spatiale.</p>
        `,
        category: "Design d'Intérieur",
        author: siteConfig.team[0].name,
        authorRole: siteConfig.team[0].role,
        authorImage: siteConfig.team[0].image,
        date: "15 Décembre 2023",
        readTime: "4 min de lecture",
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop",
        tags: ["Design d'Intérieur", "Théorie des Couleurs", "Psychologie", "Résidentiel"],
    },
    {
        id: 8,
        slug: "net-zero-buildings-carbon-neutral-architecture",
        title: "Bâtiments Zéro Émission : La Voie vers une Architecture Neutre en Carbone",
        excerpt: "Un guide complet pour concevoir et construire des bâtiments qui produisent autant d'énergie qu'ils en consomment.",
        content: `
            <p>Les bâtiments zéro émission — des structures qui produisent autant d'énergie qu'elles en consomment sur une année — représentent la pointe de la conception durable. Alors que l'industrie de la construction fait face à la pression de la décarbonisation, la certification zéro émission devient à la fois un impératif moral et un différenciateur de marché.</p>
            
            <h2>Réduire la Demande d'Abord</h2>
            <p>L'étape la plus importante vers le zéro émission est la réduction de la demande énergétique grâce à une conception d'enveloppe supérieure, des systèmes efficaces et une orientation réfléchie. Un bâtiment nécessitant peu d'énergie est beaucoup plus facile à alimenter de manière renouvelable qu'une structure conventionnelle.</p>
            
            <h2>Génération sur Site</h2>
            <p>La plupart des bâtiments zéro émission dépendent principalement du photovoltaïque solaire pour la génération d'énergie sur site. Le photovoltaïque intégré au bâtiment (BIPV) permet aux cellules solaires de remplacer les matériaux de construction conventionnels, générant de l'énergie à partir des façades et des toits sans compromettre l'esthétique.</p>
            
            <h2>Stockage et Interaction avec le Réseau</h2>
            <p>Le stockage de l'énergie est de plus en plus critique pour la conception zéro émission. Les systèmes de batteries stockent la production excédentaire diurne pour une utilisation en soirée, tandis que l'intégration au réseau intelligent permet aux bâtiments d'importer et d'exporter de l'énergie en fonction de la demande et de la disponibilité. Certains bâtiments zéro émission participent aux programmes de réponse à la demande, fournissant des services au réseau.</p>
            
            <h2>Considérations sur le Carbone Intrinsèque</h2>
            <p>Une conception zéro émission véritablement durable doit également aborder le carbone intrinsèque — les émissions associées à la production de matériaux et à la construction. Les projets phares calculent désormais le carbone sur toute la durée de vie, sélectionnant des matériaux à faible teneur en carbone et concevant pour la longévité et l'adaptabilité.</p>
        `,
        category: "Durabilité",
        author: siteConfig.team[0].name,
        authorRole: siteConfig.team[0].role,
        authorImage: siteConfig.team[0].image,
        date: "10 Décembre 2023",
        readTime: "9 min de lecture",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
        tags: ["Durabilité", "Zéro Émission", "Bâtiment Vert", "Énergie"],
    },
];

// Generate static params for all blog posts
export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return {
            title: "Article Non Trouvé",
            description: "L'article de blog demandé est introuvable.",
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
        keywords: post.tags.join(", "),
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.date,
            authors: [post.author],
            images: [
                {
                    url: post.image,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: [post.image],
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);
    const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
    const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

    if (!post) {
        notFound();
    }

    // Get related posts (same category, excluding current)
    const relatedPosts = blogPosts
        .filter((p) => p.category === post.category && p.id !== post.id)
        .slice(0, 2);

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/60 to-secondary/20" />

                <div className="absolute inset-0 flex items-end">
                    <div className="container mx-auto px-4 pb-16 relative z-10">
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-2 mb-6 text-sm">
                                <Link href="/" className="text-gray-400 hover:text-primary transition-colors">Accueil</Link>
                                <span className="text-gray-600">/</span>
                                <Link href="/blog" className="text-gray-400 hover:text-primary transition-colors">Blog</Link>
                                <span className="text-gray-600">/</span>
                                <span className="text-white truncate">{post.title}</span>
                            </div>

                            <span className="inline-block bg-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-6">
                                {post.category}
                            </span>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight mb-6">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-white/70">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={post.authorImage}
                                        alt={post.author}
                                        width={44}
                                        height={44}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <p className="font-medium text-white">{post.author}</p>
                                        <p className="text-sm">{post.authorRole}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {post.date}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {post.readTime}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="py-16 relative overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
                    <img src="/bg/bg.jpeg" alt="" className="w-full h-full object-cover" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Main Content */}
                        <article className="lg:col-span-8">
                            <div
                                className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* Tags */}
                            <div className="mt-12 pt-8 border-t border-border">
                                <div className="flex flex-wrap items-center gap-3">
                                    <Tag className="w-5 h-5 text-primary" />
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="bg-neutral-100 dark:bg-white/5 text-muted-foreground text-sm font-medium px-4 py-2 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Share */}
                            <div className="mt-8 pt-8 border-t border-border">
                                <div className="flex items-center gap-4">
                                    <span className="font-medium text-foreground">Partager :</span>
                                    <div className="flex gap-2">
                                        <button className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                            <Facebook className="w-5 h-5" />
                                        </button>
                                        <button className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                            <Twitter className="w-5 h-5" />
                                        </button>
                                        <button className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                            <Linkedin className="w-5 h-5" />
                                        </button>
                                        <button className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                            <Share2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </article>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4 space-y-8">
                            {/* Author Card */}
                            <div className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-neutral-100 dark:border-white/10">
                                <h3 className="text-lg font-bold text-foreground mb-6">À propos de l&apos;auteur</h3>
                                <div className="flex items-center gap-4 mb-4">
                                    <Image
                                        src={post.authorImage}
                                        alt={post.author}
                                        width={64}
                                        height={64}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <p className="font-bold text-foreground">{post.author}</p>
                                        <p className="text-sm text-primary">{post.authorRole}</p>
                                    </div>
                                </div>
                                <p className="text-muted-foreground text-sm">
                                    {siteConfig.team[0].description}
                                </p>
                               
                            </div>

                            {/* Related Posts */}
                            {relatedPosts.length > 0 && (
                                <div className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-neutral-100 dark:border-white/10">
                                    <h3 className="text-lg font-bold text-foreground mb-6">Articles Connexes</h3>
                                    <div className="space-y-6">
                                        {relatedPosts.map((related) => (
                                            <Link key={related.id} href={`/blog/${related.slug}`} className="group block">
                                                <div className="flex gap-4">
                                                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                                                        <Image
                                                            src={related.image}
                                                            alt={related.title}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 text-sm">
                                                            {related.title}
                                                        </h4>
                                                        <p className="text-xs text-muted-foreground mt-1">{related.date}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTA */}
                            <div className="bg-secondary p-8 rounded-3xl relative overflow-hidden">
                                <div className="absolute inset-0 opacity-10">
                                    <img src="/bg/bg.jpeg" alt="" className="w-full h-full object-cover invert" />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold text-white mb-4">
                                        Démarrer Votre Projet
                                    </h3>
                                    <p className="text-gray-300 text-sm mb-6">
                                        Prêt à donner vie à votre vision architecturale ?
                                    </p>
                                    <Button asChild className="w-full rounded-full">
                                        <Link href="/contact">Contactez-nous</Link>
                                    </Button>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* Navigation */}
            <section className="py-12 border-t border-border">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        {prevPost ? (
                            <Link href={`/blog/${prevPost.slug}`} className="group flex items-center gap-4 hover:text-primary transition-colors">
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                <div>
                                    <span className="text-sm text-muted-foreground">Précédent</span>
                                    <p className="font-bold line-clamp-1 max-w-xs">{prevPost.title}</p>
                                </div>
                            </Link>
                        ) : <div />}

                        <Button variant="outline" asChild className="rounded-full">
                            <Link href="/blog">Tous les Articles</Link>
                        </Button>

                        {nextPost ? (
                            <Link href={`/blog/${nextPost.slug}`} className="group flex items-center gap-4 text-right hover:text-primary transition-colors">
                                <div>
                                    <span className="text-sm text-muted-foreground">Suivant</span>
                                    <p className="font-bold line-clamp-1 max-w-xs">{nextPost.title}</p>
                                </div>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ) : <div />}
                    </div>
                </div>
            </section>
        </main>
    );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { motion, Variants } from "framer-motion";

const blogPosts = [
    {
        slug: "future-sustainable-architecture-urban-development",
        title: "L'Avenir de l'Architecture Durable dans le Développement Urbain",
        excerpt:
            "Explorer comment les principes de conception écologique remodèlent nos villes et créent des environnements de vie plus sains.",
        image:
            "https://images.unsplash.com/photo-1518005068251-37900150dfca?q=80&w=1200&auto=format&fit=crop",
        date: "8 Janv 2024",
        readTime: "8 min de lecture",
        category: "Durabilité",
    },
    {
        slug: "innovative-construction-materials-revolutionizing-industry",
        title: "5 Matériaux de Construction Innovants Révolutionnant l'Industrie",
        excerpt:
            "Du béton auto-réparant à l'aluminium transparent, découvrez les matériaux de pointe qui transforment la construction.",
        image:
            "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
        date: "5 Janv 2024",
        readTime: "6 min de lecture",
        category: "Construction",
    },
    {
        slug: "biophilic-design-bringing-nature-modern-architecture",
        title: "Design Biophilique : Intégrer la Nature dans l'Architecture Moderne",
        excerpt:
            "Comment les architectes incorporent des éléments naturels pour améliorer le bien-être et la productivité dans les bâtiments.",
        image:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
        date: "22 Déc 2023",
        readTime: "6 min de lecture",
        category: "Architecture",
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    },
};

export function BlogSection() {
    return (
        <section className="py-24 bg-background" id="blog">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-xl"
                    >
                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">
                            Notre Journal
                        </span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight">
                            Dernières Actualités & <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">
                                Analyses Architecturales
                            </span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Button asChild variant="outline" className="rounded-full px-8 border-primary/20 hover:bg-primary hover:text-white transition-all duration-300">
                            <Link href="/blog">Voir Tous les Articles</Link>
                        </Button>
                    </motion.div>
                </div>

                {/* Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {blogPosts.map((post, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group cursor-pointer"
                        >
                            <Link href={`/blog/${post.slug}`}>
                                <div className="relative overflow-hidden rounded-[2rem] aspect-4/3 mb-6">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-6 left-6 z-20">
                                        <span className="bg-primary text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="pr-4">
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4 text-primary" />
                                            {post.date}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-primary/40" />
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4 text-primary" />
                                            {post.readTime}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-bold font-heading text-foreground mb-3 leading-snug group-hover:text-primary transition-colors duration-300">
                                        {post.title}
                                    </h3>

                                    <p className="text-muted-foreground line-clamp-2 mb-6 text-base">
                                        {post.excerpt}
                                    </p>

                                    <span className="inline-flex items-center gap-2 text-foreground font-bold text-sm tracking-wide uppercase group-hover:text-primary transition-colors">
                                        Lire l'Article
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}


"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Ruler, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoSection } from "@/components/sections/LogoSection";
import { projects, categories } from "@/data/projects/projects";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState("Tous");
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    const filteredProjects = activeCategory === "Tous"
        ? projects
        : projects.filter(project => project.category === activeCategory);

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-32 bg-secondary overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-secondary/95 z-10" />
                    <img
                        src="/bg/bg.jpeg"
                        alt="Blueprint Background"
                        className="w-full h-full object-cover opacity-20 invert mix-blend-overlay"
                    />
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

                <div className="container mx-auto px-4 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <Link href="/" className="text-gray-400 hover:text-primary transition-colors">Accueil</Link>
                            <span className="text-gray-600">/</span>
                            <span className="text-white">Projets</span>
                        </div>

                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
                            Notre Portfolio
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
                            Projets <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">
                                En Vedette
                            </span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl">
                            Explorez notre portefeuille diversifié de projets
                            qui mettent en valeur notre engagement envers l'excellence technique.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-12 border-b border-border sticky top-0 bg-background/95 backdrop-blur-md z-40">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-wrap justify-center gap-3"
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-3 rounded-full font-medium text-sm uppercase tracking-wider transition-all duration-300 ${activeCategory === category
                                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                                    : "bg-neutral-100 dark:bg-white/5 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-24 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
                </div>

                <div className="container mx-auto px-4  relative z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    variants={itemVariants}
                                    onMouseEnter={() => setHoveredProject(project.id)}
                                    onMouseLeave={() => setHoveredProject(null)}
                                    className={`group cursor-pointer ${project.featured && index < 2 ? "md:col-span-2 lg:col-span-1" : ""
                                        }`}
                                >
                                    <Link href={`/projects/${project.slug}`} className="block p-4 relative rounded-3xl overflow-hidden bg-white dark:bg-white/5 border border-neutral-100 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500">
                                        {/* Image */}
                                        <div className="relative aspect-4/3 rounded-3xl overflow-hidden">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover   group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute rounded-3xl inset-0 bg-linear-to-t from-secondary/90 via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Overlay Content */}
                                            <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                                                <p className="text-white/80 text-sm m`b-4 line-clamp-2">
                                                    {project.description}
                                                </p>
                                                <Button
                                                    variant="outline"
                                                    className="w-fit rounded-full border-white/30 text-black hover:bg-white hover:text-secondary"
                                                >
                                                    Voir les Détails <ArrowRight className="w-4 h-4 ml-2" />
                                                </Button>
                                            </div>

                                            {/* Category Badge */}
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                                                    {project.category}
                                                </span>
                                            </div>

                                            {/* Featured Badge */}
                                            {project.featured && (
                                                <div className="absolute top-4 right-4">
                                                    <span className="bg-white/90 text-secondary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                                                        En Vedette
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h3>

                                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin className="w-4 h-4 text-primary" />
                                                    {project.location}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-4 h-4 text-primary" />
                                                    {project.year}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Ruler className="w-4 h-4 text-primary" />
                                                    {project.area}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {filteredProjects.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <p className="text-muted-foreground text-lg">Aucun projet trouvé dans cette catégorie.</p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-secondary/95 z-10" />
                    <img
                        src="/bg/bg.jpeg"
                        alt="Blueprint Background"
                        className="w-full h-full object-cover opacity-20 invert mix-blend-overlay"
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: "500+", label: "Projets Réalisés" },
                            { value: "98%", label: "Satisfaction Client" },
                            { value: "25+", label: "Années d'Expérience" },
                            { value: "15", label: "Pays Desservis" },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
                                    {stat.value}
                                </div>
                                <p className="text-gray-400 font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
                    <img src="/bg/bg.jpeg" alt="" className="w-full h-full object-cover" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
                            Démarrer Votre Projet
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight mb-6">
                            Vous Avez un Projet <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">
                                En Tête ?
                            </span>
                        </h2>
                        <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
                            Que vous planifiez une nouvelle construction, une rénovation ou un aménagement,
                            notre équipe est prête à partager votre vision.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild className="rounded-full px-10 h-14 font-bold tracking-wide shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all duration-300">
                                <Link href="/contact">
                                    Lancer un Projet <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline" asChild className="rounded-full px-10 h-14 border-primary/20 hover:bg-primary hover:text-white transition-all duration-300">
                                <Link href="/about">
                                    En Savoir Plus
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
            <LogoSection />
        </main>
    );
}

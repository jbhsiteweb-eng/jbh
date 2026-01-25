"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Ruler, Users, Award, CheckCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects/projects";

export default function ProjectDetailPage() {
    const params = useParams();
    const projectId = params.slug as string;

    const project = projects.find(p => p.slug === projectId);
    const currentIndex = projects.findIndex(p => p.slug === projectId);
    const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
    const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

    if (!project) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-heading font-bold text-foreground mb-4">Projet Non Trouvé</h1>
                    <p className="text-muted-foreground mb-8">Le projet que vous recherchez n&apos;existe pas.</p>
                    <Button asChild className="rounded-full">
                        <Link href="/projects">Retour aux Projets</Link>
                    </Button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/50 to-transparent" />

                <div className="absolute inset-0 flex items-end">
                    <div className="container mx-auto px-4 pb-16 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <Link href="/" className="text-gray-400 hover:text-primary transition-colors">Accueil</Link>
                                <span className="text-gray-600">/</span>
                                <Link href="/projects" className="text-gray-400 hover:text-primary transition-colors">Projets</Link>
                                <span className="text-gray-600">/</span>
                                <span className="text-white">{project.title}</span>
                            </div>

                            <span className="inline-block bg-primary text-white text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-6">
                                {project.category}
                            </span>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
                                {project.title}
                            </h1>

                            <div className="flex flex-wrap gap-6 text-white/80">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    {project.location}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-primary" />
                                    {project.year}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Ruler className="w-5 h-5 text-primary" />
                                    {project.area}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-primary" />
                                    {project.client}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Project Details */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
                    <Image src="/bg/bg.jpeg" alt="" fill aria-hidden="true" className="w-full h-full object-cover" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
                                    Aperçu du Projet
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    {project.description}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                            >
                                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
                                    Le Défi
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    {project.challenge}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
                                    Notre Solution
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    {project.solution}
                                </p>
                            </motion.div>

                            {/* Gallery */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
                                    Galerie du Projet
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {project.gallery.map((img, index) => (
                                        <div key={index} className="relative aspect-4/3 rounded-2xl overflow-hidden group cursor-pointer">
                                            <Image
                                                src={img}
                                                alt={`${project.title} - Image ${index + 1}`}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <Share2 className="w-8 h-8 text-white" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Project Info Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-neutral-100 dark:border-white/10 shadow-xl"
                            >
                                <h3 className="text-xl font-bold text-foreground mb-6">Détails du Projet</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between py-3 border-b border-border">
                                        <span className="text-muted-foreground">Client</span>
                                        <span className="font-medium text-foreground">{project.client}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-border">
                                        <span className="text-muted-foreground">Lieu</span>
                                        <span className="font-medium text-foreground">{project.location}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-border">
                                        <span className="text-muted-foreground">Année</span>
                                        <span className="font-medium text-foreground">{project.year}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-border">
                                        <span className="text-muted-foreground">Surface</span>
                                        <span className="font-medium text-foreground">{project.area}</span>
                                    </div>
                                    <div className="flex justify-between py-3">
                                        <span className="text-muted-foreground">Durée</span>
                                        <span className="font-medium text-foreground">{project.duration}</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Features Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="bg-secondary p-8 rounded-3xl relative overflow-hidden"
                            >
                                <div className="absolute inset-0 opacity-10">
                                    <Image src="/bg/bg.jpeg" fill alt="" aria-hidden="true" className="w-full h-full object-cover invert" />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold text-white mb-6">Caractéristiques Clés</h3>
                                    <div className="space-y-3">
                                        {project.features.map((feature, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                                                <span className="text-gray-300">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* CTA Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="bg-primary/10 p-8 rounded-3xl border border-primary/20"
                            >
                                <Award className="w-12 h-12 text-primary mb-4" />
                                <h3 className="text-xl font-bold text-foreground mb-3">Démarrer Votre Projet</h3>
                                <p className="text-muted-foreground mb-6">
                                    Intéressé par un projet similaire ? Discutons de votre vision.
                                </p>
                                <Button asChild className="w-full rounded-full">
                                    <Link href="/contact">Contactez-nous</Link>
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Navigation */}
            <section className="py-12 border-t border-border">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center">
                        {prevProject ? (
                            <Link href={`/projects/${prevProject.slug}`} className="group flex items-center gap-4 hover:text-primary transition-colors">
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                <div>
                                    <span className="text-sm text-muted-foreground">Précédent</span>
                                    <p className="font-bold">{prevProject.title}</p>
                                </div>
                            </Link>
                        ) : <div />}

                        <Button variant="outline" asChild className="rounded-full">
                            <Link href="/projects">Tous les Projets</Link>
                        </Button>

                        {nextProject ? (
                            <Link href={`/projects/${nextProject.slug}`} className="group flex items-center gap-4 text-right hover:text-primary transition-colors">
                                <div>
                                    <span className="text-sm text-muted-foreground">Suivant</span>
                                    <p className="font-bold">{nextProject.title}</p>
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

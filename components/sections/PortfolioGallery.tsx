'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { projects, categories } from '@/data/projects/projects';

export default function PortfolioGallery() {
    const [activeFilter, setActiveFilter] = useState('Tous');
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    const scrollingTexts = [
        'Nouveautés',
        'Derniers Projets',
        'Nouveaux Designs',
    ];

    // Change text every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prev) => (prev + 1) % scrollingTexts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [scrollingTexts.length]);

    // Get one project per category (limited to 5 total)
    const getFilteredProjects = () => {
        if (activeFilter === 'Tous') {
            // Show one project from the first 5 categories (excluding "Tous")
            const categoriesWithProjects = categories.filter(cat => cat !== 'Tous').slice(0, 5);
            return categoriesWithProjects.map(category => {
                return projects.find(project => project.category === category);
            }).filter(Boolean) as typeof projects;
        } else {
            // Show only the first project from the selected category
            const firstProject = projects.find(project => project.category === activeFilter);
            return firstProject ? [firstProject] : [];
        }
    };

    const filteredProjects = getFilteredProjects();

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 z-10 relative">

                {/* Rolling Text Badge */}
                <div className="flex justify-center mb-12">
                    <div className="relative h-10 w-[200px] overflow-hidden rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentTextIndex}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <span className="text-sm font-medium tracking-widest uppercase text-foreground/80">
                                    {scrollingTexts[currentTextIndex]}
                                </span>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Section Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 tracking-tight"
                    >
                        Nos Excellents <span className="text-primary italic">Travaux</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-muted-foreground text-lg md:text-xl font-light"
                    >

                        Notre expertise pluridisciplinaire et notre approche sur mesure font de nous le partenaire idéal pour vos projets dingénierie les plus ambitieux.
                    </motion.p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveFilter(category)}
                            className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 outline-hidden ${activeFilter === category ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {activeFilter === category && (
                                <motion.div
                                    layoutId="activeFilter"
                                    className="absolute inset-0 bg-primary rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{category}</span>
                        </button>
                    ))}
                </div>

                {/* Fixed Grid Layout - Not Masonry but Grid with spans */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px] lg:auto-rows-[350px]"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project) => {
                            // Determine spans based on size property
                            let spanClasses = "";
                            if (project.size === 'large') spanClasses = "md:col-span-2 md:row-span-2";
                            else if (project.size === 'wide') spanClasses = "md:col-span-2";
                            // Default is col-span-1 row-span-1

                            return (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                    key={project.id}
                                    className={`group relative overflow-hidden rounded-2xl bg-muted ${spanClasses}`}
                                >
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Glass Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Content Reveal */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-primary text-sm font-medium mb-1 tracking-wider uppercase">{project.category}</p>
                                                <h3 className="text-white text-2xl font-bold font-heading">{project.title}</h3>
                                            </div>
                                            <Link href={`/projects/${project.slug}`}>
                                                <div className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors">
                                                    <ArrowUpRight className="group-hover:text-primary" size={20}
                                                    />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* View More Button */}
                <div className="mt-16 text-center">
                    <Link href="/projects" className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-medium text-foreground overflow-hidden rounded-full border border-primary/20 hover:border-primary transition-colors duration-300">
                        <span className="mr-2">Voir Tous les Projets</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
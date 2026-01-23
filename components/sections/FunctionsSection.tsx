'use client';

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin, MoveRight } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { projects } from '@/data/projects/projects';

export default function FunctionsSection() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <section className="py-24 w-full mx-auto px-4">

            <div className="bg-neutral-900 rounded-[3rem] text-white relative overflow-hidden px-4 md:px-12 py-20">

                <Image
                    src="/bg/bg-arch.jpg"
                    alt="Background Architecture"
                    fill
                    className="object-cover"
                />

                <div className="relative  container mx-auto px-4 z-10">

                    {/* Header */}
                    <div className="flex flex-col items-center mb-16 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            <span className="text-xs font-medium tracking-widest uppercase text-gray-300">Projets en Vedette</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl leading-tight font-heading"
                        >
                            Notre Chemin Vers <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">l'Excellence Technique</span>
                        </motion.h2>
                    </div>

                    {/* Carousel */}
                    <div className="relative group">
                        {/* Navigation Buttons */}
                        <button
                            onClick={scrollPrev}
                            className="absolute left-[-20px] lg:left-[-60px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/20 items-center justify-center hover:bg-white hover:text-black transition-all duration-300 hidden md:flex"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="absolute right-[-20px] lg:right-[-60px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/20 items-center justify-center hover:bg-white hover:text-black transition-all duration-300 hidden md:flex"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>

                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="flex -ml-6 select-none touch-pan-y">
                                {projects.map((project, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        key={project.id}
                                        className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-6"
                                    >
                                        <Link href={`/projects/${project.slug}`}>
                                            <div className="bg-white rounded-[2rem] overflow-hidden group/card h-full hover:shadow-2xl transition-all duration-500 relative cursor-pointer">
                                                {/* Image Section */}
                                                <div className="relative h-64 rounded-[2rem] m-2 overflow-hidden">
                                                    <div className="absolute inset-0 bg-gray-900/10 group-hover/card:bg-gray-900/0 transition-colors duration-500 z-10"></div>
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover transform group-hover/card:scale-110 transition-transform duration-700"
                                                    />
                                                    {/* Category Badge */}
                                                    <div className="absolute top-4 left-4 z-20">
                                                        <span className="bg-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                                                            {project.category}
                                                        </span>
                                                    </div>
                                                    {/* Arrow Icon */}
                                                    <div className="absolute bottom-4 right-4 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg z-20 group-hover/card:scale-110 group-hover/card:bg-primary transition-all duration-300">
                                                        <ArrowUpRight className="w-6 h-6 text-black group-hover/card:text-white transition-colors duration-300" strokeWidth={1.5} />
                                                    </div>
                                                </div>

                                                {/* Content Section */}
                                                <div className="p-8">
                                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover/card:text-primary transition-colors">{project.title}</h3>
                                                    <span className='block h-[1px] w-full bg-primary mb-4 opacity-30'></span>
                                                    <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
                                                        <MapPin className="w-4 h-4 text-primary" />
                                                        {project.location}
                                                    </div>
                                                    <p className="text-gray-500 text-sm leading-relaxed min-h-12">
                                                        {project.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Action */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex justify-center mt-16"
                    >
                        <Link href="/projects" className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300 group cursor-pointer">
                            <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                                <MoveRight className="w-4 h-4" />
                            </span>
                            Voir Tous les Projets
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}


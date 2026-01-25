'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';

export function LogoSection() {

    const logos = [
        {
            src: "/images/logos/alomrane.jpeg",
            title: "Al Omrane",
            alt: "Al Omrane",
        },
        {
            src: "/images/logos/atlas.jpeg",
            title: "Atlas",
            alt: "Atlas",
        },
        {
            src: "/images/logos/danialand.jpeg",
            title: "Agadir Land",
            alt: "Danialand",
        },
        {
            src: "/images/logos/doha.jpeg",
            title: "Doha",
            alt: "Doha",
        },
        {
            src: "/images/logos/ibnozohr.jpeg",
            title: "Ibn Zohr",
            alt: "Ibn Zohr",
        },
        
        {
            src: "/images/logos/mobina.jpeg",
            title: "Mobina",
            alt: "Mobina",
        },
        {
            src: "/images/logos/ofppt.jpeg",
            title: "OFPT",
            alt: "OFPT",
        },
        {
            src: "/images/logos/police.jpeg",
            title: "Police",
            alt: "Police",
        },
        {
            src: "/images/logos/ramsa.jpeg",
            title: "RAMSA",
            alt: "RAMSA",
        },
        {
            src: "/images/logos/souscamp.jpeg",
            title: "Sous Camp",
            alt: "Sous Camp",
        },
    ];

    return (
        <section className="py-20 bg-background border-y border-neutral-100 overflow-hidden relative">
            <div className="container mx-auto px-4 mb-10 text-center">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Nos Meilleurs Partenaires et Clients</p>
            </div>

            <div className="relative flex overflow-hidden group">
                {/* Gradient masks for smooth fade edges */}
                <div className="absolute top-0 left-0 w-20 md:w-32 h-full bg-linear-to-r from-background to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-20 md:w-32 h-full bg-linear-to-l from-background to-transparent z-10 pointer-events-none"></div>

                <motion.div
                    className="flex gap-16 md:gap-24 items-center flex-nowrap"
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30,
                    }}
                    style={{ width: "max-content" }}
                >
                    {[...logos, ...logos].map((logo, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center gap-4 opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer w-24 md:w-32 group/logo"
                        >
                            <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white rounded-lg p-2 shadow-sm group-hover/logo:shadow-md transition-shadow duration-300">
                                <Image
                                    src={logo.src}
                                    alt={logo.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-xs font-bold text-foreground/80 tracking-wider">
                                {logo.title}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
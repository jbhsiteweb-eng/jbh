'use client'

import { motion } from 'framer-motion';

export function LogoSection() {

    const logos = [
        {
            svg: (
                <svg viewBox="0 0 120 120" className="w-full h-full">
                    <rect x="35" y="35" width="50" height="50" rx="8" fill="currentColor" />
                    <text x="60" y="68" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">OFPPT</text>
                </svg>
            ),
            title: "OFPPT",
        },
        {
            svg: (
                <svg viewBox="0 0 120 120" className="w-full h-full">
                    <circle cx="60" cy="50" r="25" fill="currentColor" />
                    <path d="M 50 75 L 70 75 L 68 90 L 52 90 Z" fill="currentColor" />
                    <path d="M 55 45 L 55 55 L 48 60 M 55 55 L 62 60" stroke="white" strokeWidth="3" fill="none" />
                </svg>
            ),
            title: "MIN. SANTÉ",
        },
        {
            svg: (
                <svg viewBox="0 0 120 120" className="w-full h-full">
                    <path d="M 35 70 L 60 30 L 85 70 Z" fill="currentColor" />
                    <rect x="50" y="50" width="20" height="20" fill="white" />
                    <rect x="55" y="55" width="10" height="15" fill="currentColor" />
                </svg>
            ),
            title: "DGAPR",
        },
        {
            svg: (
                <svg viewBox="0 0 120 120" className="w-full h-full">
                    <rect x="30" y="40" width="60" height="40" rx="5" fill="currentColor" />
                    <rect x="40" y="50" width="15" height="20" fill="white" />
                    <rect x="65" y="50" width="15" height="20" fill="white" />
                    <path d="M 45 35 L 45 40 M 75 35 L 75 40" stroke="currentColor" strokeWidth="4" />
                </svg>
            ),
            title: "Dania Land",
        },
        {
            svg: (
                <svg viewBox="0 0 120 120" className="w-full h-full">
                    <circle cx="60" cy="55" r="30" fill="currentColor" />
                    <path d="M 45 50 L 55 60 L 75 40" stroke="white" strokeWidth="4" fill="none" />
                </svg>
            ),
            title: "ANAPEC",
        },
        {
            svg: (
                <svg viewBox="0 0 120 120" className="w-full h-full">
                    <rect x="35" y="35" width="50" height="50" fill="currentColor" />
                    <path d="M 45 50 L 55 50 L 55 60 L 65 60 L 65 50 L 75 50 L 75 75 L 45 75 Z" fill="white" />
                </svg>
            ),
            title: "AL OMRANE",
        },
        {
            svg: (
                <svg viewBox="0 0 120 120" className="w-full h-full">
                    <path d="M 60 30 L 85 50 L 85 80 L 35 80 L 35 50 Z" fill="currentColor" />
                    <rect x="50" y="55" width="20" height="25" fill="white" />
                    <circle cx="60" cy="45" r="8" fill="white" />
                </svg>
            ),
            title: "ADDOHA",
        },
        {
            svg: (
                <svg viewBox="0 0 120 120" className="w-full h-full">
                    <rect x="30" y="45" width="60" height="35" rx="5" fill="currentColor" />
                    <circle cx="50" cy="62" r="10" fill="white" />
                    <circle cx="70" cy="62" r="10" fill="white" />
                    <rect x="40" y="35" width="40" height="15" rx="3" fill="currentColor" opacity="0.7" />
                </svg>
            ),
            title: "Sous Camp",
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
                            <div className="w-16 h-16 md:w-20 md:h-20 text-foreground group-hover/logo:text-primary transition-colors duration-300">
                                {logo.svg}
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
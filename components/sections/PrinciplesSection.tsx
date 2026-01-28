"use client";

import { Ruler, Building2 } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const principles = [
    {
        icon: Ruler,
        title: "Conseil, diagnostic et expertise",
        description: "Diagnostic sécurité Incendie , analyse de la résistance mécanique des structures, prélèvement des aciers pour mesure de ductilité...",
    },
    {
        icon: Building2,
        title: "Assistance à la maîtrise d’ouvrage",
        description: "Pour piloter vos chantiers, notre bureau d’étude vous propose l’assistance maîtrise d’ouvrage...",
    },
];

export function PrinciplesSection() {
    return (
        <section className="py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Side - Image Collage */}
                    <div className="relative h-[600px] w-full">
                        {/* Top Wide Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="absolute top-0 w-full left-0 h-full p-2 rounded-2xl overflow-hidden z-10"
                        >
                            <motion.div
                                animate={{
                                    y: [0, -15, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="relative w-full h-full"
                            >
                                <Image
                                    src="/images/principles/3D-hous.png"
                                    alt="Modern Interior Desk"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-contain hover:scale-105 transition-transform duration-700"
                                />
                            </motion.div>
                        </motion.div>

                        {/* Bottom Right Overlapping Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="absolute bottom-10 right-4 w-60 h-52 md:w-80 md:h-72 rounded-2xl overflow-hidden shadow-2xl z-20 border-4 border-white"
                        >
                            <Image
                                src="/images/principles/hero-2.webp"
                                alt="Architectural Sketch"
                                fill
                                sizes="(max-width: 768px) 50vw, 25vw"
                                className="object-cover"
                            />
                        </motion.div>

                        {/* Decorative Background Element */}
                        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
                    </div>

                    {/* Right Side - Content */}
                    <div className="lg:pl-8">
                        {/* Heading */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
                        >
                            Expertise
                            <span className="text-primary"> Pluridisciplinaire</span>
                        </motion.h2>

                        {/* Decorative Dots */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex gap-2 mb-8"
                        >
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            ))}
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-muted-foreground text-lg leading-relaxed mb-10"
                        >

                            JBH Engineering vous accompagne à chaque étape de votre projet, de la conception à la réalisation.
                        </motion.p>

                        {/* Feature Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {principles.map((principle, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    className="group bg-white border border-gray-100 p-8 rounded-3xl hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                                >
                                    {/* Icon */}
                                    <div className="mb-6 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                                        <principle.icon
                                            className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300"
                                            strokeWidth={1.5}
                                        />
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                                        {principle.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                                        {principle.description}
                                    </p>

                                    {/* Read More Link */}
                                    <button className="text-xs font-bold text-gray-900 tracking-widest hover:text-primary transition-colors duration-300 uppercase relative">
                                        En Savoir Plus
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}

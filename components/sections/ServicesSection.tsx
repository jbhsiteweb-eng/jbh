"use client";

import { Lightbulb, Cog, Leaf, Palette } from "lucide-react";
import { motion, Variants } from "framer-motion";

const services = [
    {
        icon: Lightbulb,
        title: "Analyse et Conception",
        description: "Étude approfondie de vos besoins et conception de solutions techniques adaptées à votre projet.",
    },
    {
        icon: Cog,
        title: "Ingénierie Détaillée",
        description: "Réalisation des plans d'exécution et notes de calcul pour chaque corps d'état.",
    },
    {
        icon: Leaf,
        title: "Suivi et Coordination",
        description: "Accompagnement sur chantier, coordination des intervenants et contrôle qualité.",
    },
    {
        icon: Palette,
        title: "Livraison et Réception",
        description: "Assistance à la réception des travaux et remise des documents techniques.",
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut", duration: 0.5 } }
};

export function ServicesSection() {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {services.map((service, index) => (
                        <motion.div
                            variants={itemVariants}
                            key={index}
                            className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                            {/* Icon and Title - Horizontal Layout */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="shrink-0 w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary transition-colors duration-300 flex items-center justify-center">
                                    <service.icon
                                        className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300"
                                        strokeWidth={1.5}
                                    />
                                </div>
                                <h3 className="font-heading text-lg font-bold text-gray-900">
                                    {service.title}
                                </h3>
                            </div>

                            {/* Divider Line */}
                            <div className="w-full h-px bg-gray-100 mb-6 group-hover:bg-gray-200 transition-colors"></div>

                            {/* Description */}
                            <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-600 transition-colors">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

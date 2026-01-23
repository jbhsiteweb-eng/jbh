"use client";

import { useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "PDG, TechCorp",
        image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
        quote:
            "JBH ENGINEERING a transformé nos bureaux en un environnement moderne et inspirant. Leur attention aux détails et leur approche innovante ont dépassé toutes nos attentes.",
    },
    {
        name: "Michael Chen",
        role: "Propriétaire",
        image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
        quote:
            "Travailler avec JBH ENGINEERING sur notre maison de rêve a été un véritable plaisir. Ils ont écouté nos besoins et créé un espace qui reflète parfaitement notre style de vie.",
    },
    {
        name: "Emily Rodriguez",
        role: "Restauratrice",
        image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
        quote:
            "La créativité et le professionnalisme de l'équipe sont incomparables. Ils ont conçu un espace de restaurant que nos clients adorent et qui fonctionne parfaitement pour nos opérations.",
    },
    {
        name: "James Wilson",
        role: "Chef de Projet",
        image:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&h=200&auto=format&fit=crop",
        quote:
            "Le niveau de précision et d'engagement envers les normes de qualité affiché par l'équipe était impressionnant. Des rapports détaillés nous ont tenus informés à chaque étape.",
    },
    {
        name: "Sofia Martinez",
        role: "Designer d'Intérieur",
        image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop",
        quote:
            "Collaborer avec JBH Engineering a été une expérience fluide. Ils ont parfaitement compris la vision esthétique et exécuté les éléments structurels de manière impeccable.",
    },
];

export function TestimonialsSection() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl"
                    >
                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">
                            Témoignages Clients
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
                            Approuvé Par <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">
                                Les Leaders du Secteur
                            </span>
                        </h2>
                    </motion.div>

                    <div className="flex gap-4">
                        <button
                            onClick={scrollPrev}
                            aria-label="Témoignage précédent"
                            className="w-14 h-14 rounded-full border border-border bg-background hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 flex items-center justify-center group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                        <button
                            onClick={scrollNext}
                            aria-label="Témoignage suivant"
                            className="w-14 h-14 rounded-full border border-border bg-background hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 flex items-center justify-center group"
                        >
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>

                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white dark:bg-white/5 border border-neutral-100 dark:border-white/10 p-8 md:p-10 rounded-[2rem] h-full flex flex-col justify-between hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group"
                                >
                                    <div>
                                        <Quote className="w-12 h-12 text-primary/20 mb-8 group-hover:text-primary transition-colors duration-300" />
                                        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8 font-medium">
                                            "{testimonial.quote}"
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4 pt-8 border-t border-neutral-100 dark:border-white/5">
                                        <Avatar className="w-14 h-14 border-2 border-primary/20">
                                            <AvatarImage src={testimonial.image} alt={testimonial.name} />
                                            <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-bold text-foreground text-lg leading-tight">
                                                {testimonial.name}
                                            </h3>
                                            <p className="text-sm text-primary font-medium">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

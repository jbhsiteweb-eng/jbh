"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { infoCards } from "@/data/services/services";
import { X } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";


export function CardsSection() {
    const [selectedCard, setSelectedCard] = useState<typeof infoCards[0] | null>(null);

    return (
        <section className="py-24 bg-background overflow-hidden relative">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/principles/2.jpeg"
                    alt="Background"
                    fill
                    className="object-cover opacity-20"
                />
            </div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    {/* Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
                    >
                        Nos <span className="relative inline-block">
                            <span className="text-primary relative z-10">Services</span>
                            <svg
                                className="absolute -top-[15%] -left-[10%] w-[120%] h-[130%] pointer-events-none"
                                viewBox="0 0 160 60"
                                preserveAspectRatio="none"
                                fill="none"
                            >
                                <motion.path
                                    d="M10,30 Q10,5 80,5 T150,30 T80,55 T10,30"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    className="text-primary"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{
                                        duration: 2,
                                        repeat: 2,
                                        repeatType: "reverse",
                                        ease: "easeInOut"
                                    }}
                                />
                            </svg>
                        </span>
                    </motion.h2>

                    {/* Decorative Dots */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex gap-2 justify-center mb-8"
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
                        className="text-muted-foreground text-lg leading-relaxed"
                    >
                        Une expertise complète pour répondre à tous vos besoins en ingénierie et architecture.
                    </motion.p>
                </div>

                {/* Carousel */}
                <div className="px-8">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {infoCards.map((card, index) => (
                                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                    <div className="h-full">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 }}
                                            className="group h-full bg-white border border-gray-100 p-8 rounded-3xl hover:shadow-lg hover:border-primary/20 transition-all duration-300 flex flex-col"
                                        >
                                            <div className="flex flex-col gap-6 items-start grow">
                                                {/* Icon */}
                                                <div className="shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                                                    <card.icon
                                                        className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300"
                                                        strokeWidth={1.5}
                                                    />
                                                </div>

                                                <div className="grow">
                                                    {/* Title */}
                                                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                                                        {card.title}
                                                    </h3>

                                                    {/* Description */}
                                                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                                                        {card.description}
                                                    </p>
                                                </div>

                                                {/* Read More Button */}
                                                <button
                                                    onClick={() => setSelectedCard(card)}
                                                    className="mt-auto text-xs font-bold text-gray-900 tracking-widest hover:text-primary transition-colors duration-300 uppercase relative"
                                                >
                                                    En Savoir Plus
                                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                                                </button>
                                            </div>
                                        </motion.div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex -left-12 opacity-50 hover:opacity-100" />
                        <CarouselNext className="hidden md:flex -right-12 opacity-50 hover:opacity-100" />
                    </Carousel>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedCard && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedCard(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl p-8 max-w-2xl w-full relative shadow-2xl overflow-hidden"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedCard(null)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-500" />
                            </button>

                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="shrink-0">
                                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                                        <selectedCard.icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                                        {selectedCard.title}
                                    </h3>
                                    <div className="w-12 h-1 bg-primary rounded-full mb-6"></div>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {selectedCard.description}
                                    </p>
                                    <div className="mt-8">
                                        <Button className="rounded-full px-8" onClick={() => setSelectedCard(null)}>
                                            Fermer
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

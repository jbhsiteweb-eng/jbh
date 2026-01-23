"use client";

import { useState } from "react";
import { Users, PenTool, FileCheck, HardHat, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const processSteps = [
    {
        number: "01",
        icon: Users,
        title: "Consultation",
        description: "Nous commençons par écouter attentivement vos besoins, désirs et objectifs. Cette étape fondamentale garantit que chaque solution technique correspond à votre vision.",
    },
    {
        number: "02",
        icon: PenTool,
        title: "Conception",
        description: "Nos ingénieurs traduisent votre besoin en solutions techniques créatifs et plans détaillés, explorant ingénierie, confort et technique.",
    },
    {
        number: "03",
        icon: FileCheck,
        title: "Approbations",
        description: "Nous naviguons dans les complexités des permis et règlementations, affinant les plans pour assurer une conformité totale sans compromettre le design.",
    },
    {
        number: "04",
        icon: HardHat,
        title: "Construction",
        description: "Avec une gestion précise, nous supervisons le processus de construction, garantissant que les methodes, installations et matériaux répondent aux normes et règlementations.",
    },
];

export function ProcessSection() {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        setCurrentStep((prev) => (prev + 1) % processSteps.length);
    };

    const prevStep = () => {
        setCurrentStep((prev) => (prev - 1 + processSteps.length) % processSteps.length);
    };

    return (
        <section className="py-24 bg-neutral-100 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 mb-4"
                        >
                            <span className="w-8 h-px bg-primary"></span>
                            <span className="text-xs font-bold text-primary tracking-widest uppercase">
                                Notre Processus
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white leading-tight"
                        >
                            Transformer les projets
                            <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">en réalité</span>
                        </motion.h2>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex gap-4">
                        <button
                            onClick={prevStep}
                            className="w-14 h-14 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 group"
                            aria-label="Étape précédente"
                        >
                            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={nextStep}
                            className="w-14 h-14 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 group"
                            aria-label="Étape suivante"
                        >
                            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Animated Process Display */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left: Interactive List */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        {processSteps.map((step, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentStep(index)}
                                className={`text-left group flex items-center gap-6 p-6 rounded-2xl transition-all duration-500 border ${index === currentStep
                                    ? "bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 shadow-xl scale-105"
                                    : "bg-transparent border-transparent hover:bg-white/50 dark:hover:bg-neutral-800/50"
                                    }`}
                            >
                                <span className={`text-xl font-bold font-mono transition-colors duration-300 ${index === currentStep ? "text-primary" : "text-neutral-500"
                                    }`}>
                                    {step.number}
                                </span>
                                <h3 className={`text-lg font-bold transition-colors duration-300 ${index === currentStep ? "text-neutral-900 dark:text-white" : "text-neutral-600"
                                    }`}>
                                    {step.title}
                                </h3>
                                {index === currentStep && (
                                    <motion.div
                                        layoutId="active-check"
                                        className="ml-auto text-primary"
                                    >
                                        <CheckCircle2 className="w-6 h-6" />
                                    </motion.div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Right: Detail View */}
                    <div className="lg:col-span-7 relative h-[400px] bg-white dark:bg-neutral-800 rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden border border-neutral-100 dark:border-neutral-700">
                        {/* Background Pattern */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="relative z-10 h-full flex flex-col justify-center"
                            >
                                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 text-primary">
                                    {(() => {
                                        const Icon = processSteps[currentStep].icon;
                                        return <Icon className="w-10 h-10" strokeWidth={1.5} />;
                                    })()}
                                </div>

                                <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6 font-heading">
                                    {processSteps[currentStep].title}
                                </h3>

                                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-lg">
                                    {processSteps[currentStep].description}
                                </p>

                                <div className="mt-8 flex gap-2">
                                    {processSteps.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`h-1 rounded-full transition-all duration-500 ${idx === currentStep ? "w-12 bg-primary" : "w-2 bg-neutral-200 dark:bg-neutral-700"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}

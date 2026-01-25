"use client";

import { useEffect, useRef } from "react";
import { Award, Users, Building, Smile, ArrowUpRight } from "lucide-react";
import { motion, useInView, useMotionValue, useSpring, Variants } from "framer-motion";
import Image from "next/image";

const stats = [
    { icon: Award, value: 10, label: "Awards Won", suffix: "+" },
    { icon: Building, value: 500, label: "Projects Completed", suffix: "+" },
    { icon: Users, value: 20, label: "Team Members", suffix: "+" },
    { icon: Smile, value: 1000, label: "Happy Clients", suffix: "+" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: 3000, bounce: 0 });
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [motionValue, isInView, value]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest).toLocaleString();
            }
        });
    }, [springValue]);

    return (
        <span className="flex items-center">
            <span ref={ref}>0</span>
            {suffix}
        </span>
    );
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1.0]
        }
    },
};

export function StatsSection() {
    return (
        <section className="py-24 bg-secondary relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-secondary/95 z-10" />
                <Image
                    src="/bg/bg.jpeg"
                    alt="Technical Floor Plan Background"
                    fill
                    className="object-cover opacity-20 invert mix-blend-overlay"
                />
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 z-0">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 L100 0 L100 100 Z" fill="currentColor" />
                </svg>
            </div>

            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
                            Our Achievements
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight">
                            Building Trust <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">
                                Through Excellence
                            </span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl"
                    >
                        Reviewing our journey through numbers. Each figure represents a milestone
                        in our commitment to delivering superior engineering solutions and
                        technical innovation.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="relative group p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                                        <stat.icon className="w-7 h-7" />
                                    </div>
                                    <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-primary transition-colors duration-300" />
                                </div>

                                <div className="text-5xl md:text-6xl font-heading font-bold text-white mb-3 tracking-tight">
                                    <Counter value={stat.value} suffix={stat.suffix} />
                                </div>

                                <p className="text-gray-400 font-medium tracking-wide uppercase text-sm group-hover:text-white transition-colors duration-300">
                                    {stat.label}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

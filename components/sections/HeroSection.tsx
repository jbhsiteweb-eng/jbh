'use client';
import React, { useRef, useEffect, useState, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight, Play, ChevronDown, Award, Building2, Users } from 'lucide-react';
import { siteConfig } from '@/config/site';

// Dynamically import 3D scene to avoid SSR issues
const Hero3DScene = dynamic(() => import('@/components/3d/Hero3DScene').then(mod => mod.Hero3DScene), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-secondary" />
});

gsap.registerPlugin(ScrollTrigger);

const slides = [
    {
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
        title: "JBH",
        subtitle: "ENGINEERING",
        description: "Acompagner les professionnels dans la réalisation de leurs projets",
    },
    {
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop",
        title: "Solutions",
        subtitle: "Innovantes",
        description: "Fusionner le technique et la fonctionnalité dans chaque projet",
    },
    {
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
        title: "Ingénierie",
        subtitle: "D'excellence",
        description: "Spécialisé dans les domaines du bâtiment, de l’industrie et de la gestion de projets.",
    },
];

const stats = [
    { icon: Building2, value: "500+", label: "Projets" },
    { icon: Award, value: "150+", label: "Prix" },
    { icon: Users, value: "50+", label: "Experts" },
];

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLSpanElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const scrollIndicatorRef = useRef<HTMLButtonElement>(null);

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Initial entrance animation
    useEffect(() => {
        // Ensure all refs are available before animating
        if (!containerRef.current || !heroRef.current || !titleRef.current ||
            !subtitleRef.current || !descRef.current || !ctaRef.current ||
            !statsRef.current || !scrollIndicatorRef.current) {
            return;
        }

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            // Hero container clip animation
            if (heroRef.current) {
                tl.fromTo(heroRef.current,
                    { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
                    { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.5 }
                );
            }

            // Overlay reveal
            if (overlayRef.current) {
                tl.fromTo(overlayRef.current,
                    { scaleX: 0 },
                    { scaleX: 1, duration: 1, transformOrigin: "left" },
                    "-=1"
                );
            }

            // Title animation with split text effect
            if (titleRef.current) {
                tl.fromTo(titleRef.current,
                    { y: 120, opacity: 0, rotateX: -90 },
                    { y: 0, opacity: 1, rotateX: 0, duration: 1.2 },
                    "-=0.5"
                );
            }

            // Subtitle with colored gradient
            if (subtitleRef.current) {
                tl.fromTo(subtitleRef.current,
                    { y: 80, opacity: 0, scale: 0.8 },
                    { y: 0, opacity: 1, scale: 1, duration: 1 },
                    "-=0.8"
                );
            }

            // Description fade up
            if (descRef.current) {
                tl.fromTo(descRef.current,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    "-=0.6"
                );
            }

            // CTA buttons stagger
            if (ctaRef.current?.children && ctaRef.current.children.length > 0) {
                tl.fromTo(Array.from(ctaRef.current.children),
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
                    "-=0.4"
                );
            }

            // Stats counter animation
            if (statsRef.current?.children && statsRef.current.children.length > 0) {
                tl.fromTo(Array.from(statsRef.current.children),
                    { y: 60, opacity: 0, scale: 0.9 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1 },
                    "-=0.3"
                );
            }

            // Scroll indicator bounce
            if (scrollIndicatorRef.current) {
                tl.fromTo(scrollIndicatorRef.current,
                    { y: -20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6 },
                    "-=0.2"
                );

                // Continuous scroll indicator animation
                gsap.to(scrollIndicatorRef.current, {
                    y: 10,
                    duration: 1,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut"
                });
            }

            // Parallax effect on scroll
            if (imageRef.current && containerRef.current) {
                gsap.to(imageRef.current, {
                    yPercent: 30,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true
                    }
                });
            }

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Slide transition animation
    const animateSlideChange = (newIndex: number) => {
        if (isAnimating || newIndex === currentSlide) return;
        setIsAnimating(true);

        const tl = gsap.timeline({
            onComplete: () => {
                setCurrentSlide(newIndex);
                setIsAnimating(false);
            }
        });

        // Fade out current content
        tl.to([titleRef.current, subtitleRef.current, descRef.current], {
            y: -50,
            opacity: 0,
            duration: 0.4,
            stagger: 0.05
        });

        // Image crossfade handled by state change
        tl.call(() => setCurrentSlide(newIndex), [], "-=0.2");

        // Fade in new content
        tl.fromTo([titleRef.current, subtitleRef.current, descRef.current],
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }
        );
    };

    // Auto-slide
    useEffect(() => {
        const interval = setInterval(() => {
            const nextSlide = (currentSlide + 1) % slides.length;
            animateSlideChange(nextSlide);
        }, 6000);

        return () => clearInterval(interval);
    }, [currentSlide, isAnimating]);

    return (
        <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-secondary">
            {/* 3D Scene Background */}
            <div ref={heroRef} className="absolute inset-0">
                <Suspense fallback={<div className="absolute inset-0 bg-secondary" />}>
                    <Hero3DScene />
                </Suspense>

                {/* Light overlay for text readability */}
                <div className="absolute inset-0 bg-secondary/30\" />
                <div className="absolute inset-0 bg-linear-to-r from-secondary/50 via-secondary/30 to-transparent\" />
                <div className="absolute inset-0 bg-linear-to-t from-secondary/40 via-transparent to-transparent\" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 min-h-screen flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-32">
                    {/* Text Content */}
                    <div className="max-w-2xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-white/80 text-sm font-medium tracking-wide">
                                {siteConfig.tagline}
                            </span>
                        </div>

                        {/* Main Title */}
                        <h1 className="mb-6 mt-3  overflow-hidden">
                            <span
                                ref={titleRef}
                                className="block text-5xl md:text-6xl lg:text-2xl xl:text-8xl font-heading font-bold text-white leading-[0.9] tracking-tight"
                                style={{ perspective: '1000px' }}
                            >
                                {slides[currentSlide].title}
                            </span>
                            <span
                                ref={subtitleRef}
                                className="block text-5xl md:text-6xl lg:text-6xl xl:text-6xl font-heading font-bold leading-[0.9] tracking-tight mt-2"
                            >
                                <span className="text-primary">
                                    {slides[currentSlide].subtitle}
                                </span>
                            </span>
                        </h1>

                        {/* Description */}
                        <p
                            ref={descRef}
                            className="text-xl md:text-2xl text-white/70 mb-10 font-light leading-relaxed max-w-lg"
                        >
                            {slides[currentSlide].description}
                        </p>

                        {/* CTA Buttons */}
                        <div ref={ctaRef} className="flex flex-wrap gap-4 mb-16">
                            <Link
                                href="/projects"
                                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1"
                            >
                                <span className="relative z-10">Voir Nos Projets</span>
                                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <button className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                                </div>
                                {/* <span>Voir la Vidéo</span> */}
                            </button>
                        </div>

                        {/* Stats */}
                        <div ref={statsRef} className="flex gap-8 md:gap-12">
                            {stats.map((stat, index) => (
                                <div key={index} className="group">
                                    <div className="flex items-center gap-3 mb-2">
                                        <stat.icon className="w-5 h-5 text-primary" />
                                        <span className="text-3xl md:text-4xl font-heading font-bold text-white">
                                            {stat.value}
                                        </span>
                                    </div>
                                    <span className="text-white/70 text-sm font-medium uppercase tracking-wider">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Floating Card */}
                    <div className="hidden lg:flex justify-end">
                        <div className="relative">
                            {/* Decorative Elements */}
                            <div className="absolute -top-10 -left-10 w-40 h-40 border border-white/10 rounded-3xl rotate-12" />
                            <div className="absolute -bottom-10 -right-10 w-60 h-60 border border-primary/20 rounded-full" />

                            {/* Main Card */}
                            <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 max-w-sm">
                                <div className="absolute top-0 left-0 w-full h-1 bg-primary rounded-t-3xl" />

                                <h3 className="text-2xl font-heading font-bold text-white mb-4">
                                    Commencez Votre Projet
                                </h3>
                                <p className="text-white/60 mb-6">
                                    Consultation gratuite avec nos ingénieurs experts pour transformer votre vision en réalité.
                                </p>

                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all"
                                >
                                    Prendre Rendez-vous
                                    <ArrowRight className="w-4 h-4" />
                                </Link>

                                {/* Floating Stats Badge */}
                                <div className="absolute -bottom-10 -left-12 bg-primary text-white px-6 py-3 rounded-2xl shadow-xl shadow-primary/30">
                                    <div className="text-2xl font-bold">5+</div>
                                    <div className="text-xs text-white/80">Ans d'Expérience</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => animateSlideChange(index)}
                        className={`relative h-1 rounded-full transition-all duration-500 ${index === currentSlide ? 'w-12 bg-primary' : 'w-6 bg-white/30 hover:bg-white/50'
                            }`}
                        aria-label={`Aller à la diapositive ${index + 1}`}
                    >
                        {index === currentSlide && (
                            <div className="absolute inset-0 bg-primary rounded-full animate-pulse" />
                        )}
                    </button>
                ))}
            </div>

            {/* Scroll Indicator */}
            {/* Scroll Indicator */}
            <button
                ref={scrollIndicatorRef}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer bg-transparent border-none p-2"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                aria-label="Défiler vers le bas"
            >
                <span className="text-white/70 text-xs uppercase tracking-widest">Défiler</span>
                <ChevronDown className="w-6 h-6 text-white/70" />
            </button>

            {/* Side Social Links */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-6">
                <div className="w-px h-16 bg-white/20 mx-auto" />
                {['facebook', 'instagram', 'twitter'].map((social) => (
                    <a
                        key={social}
                        href={siteConfig.social[social as keyof typeof siteConfig.social]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 hover:text-primary transition-colors text-sm font-medium uppercase tracking-widest"
                        style={{ writingMode: 'vertical-lr' }}
                    >
                        {social}
                    </a>
                ))}
                <div className="w-px h-16 bg-white/20 mx-auto" />
            </div>
        </section>
    );
}

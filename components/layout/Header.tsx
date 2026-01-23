"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Mail, MapPin, ArrowRight, Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { siteConfig } from "@/config/site";

const navigation = [
    { name: "Accueil", href: "/" },
    { name: "À Propos", href: "/about" },
    { name: "Projets", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
];

const socialLinks = [
    { name: "Facebook", href: siteConfig.social.facebook, icon: Facebook },
    { name: "Instagram", href: siteConfig.social.instagram, icon: Instagram },
    { name: "Twitter", href: siteConfig.social.twitter, icon: Twitter },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20);
    });

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Wrapper for pointer events to allow clicking through transparent areas if needed, 
                though typically header captures events. 
                Resetting pointer-events-auto on the actual bars. 
            */}

            {/* Top Bar - Hidden on Mobile, Fades out on scroll */}
            <motion.div
                className={`hidden lg:block bg-secondary text-white py-2 pointer-events-auto transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 overflow-hidden py-0' : 'h-10 opacity-100'}`}
            >
                <div className="container mx-auto px-4 h-full flex items-center justify-between text-xs font-medium tracking-wide">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                            <MapPin className="w-3.5 h-3.5 text-primary" />
                            <span>{siteConfig.address.short}</span>
                        </div>
                        <Link
                            href={siteConfig.contact.emailLink}
                            className="flex items-center gap-2 opacity-80 hover:opacity-100 hover:text-primary transition-all"
                        >
                            <Mail className="w-3.5 h-3.5 text-primary" />
                            <span>{siteConfig.contact.email}</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="opacity-80">{siteConfig.workingHours.full}</div>
                        <div className="h-3 w-px bg-white/20" />
                        <div className="flex items-center gap-4">
                            {socialLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="hover:text-primary hover:scale-110 transition-all duration-300"
                                    aria-label={item.name}
                                >
                                    <item.icon className="w-3.5 h-3.5" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main Navbar */}
            <div className={`pointer-events-auto transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-2xl py-3" : "bg-white py-5"}`}>
                <div className="container mx-auto px-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <Image
                            src="/images/logo/jbh.png"
                            alt="JBH Engineering"
                            width={200}
                            height={80}
                            className="h-12 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="relative px-5 py-2 group overflow-hidden rounded-full"
                            >
                                <span className="relative z-10 text-sm font-bold uppercase tracking-wider text-secondary group-hover:text-primary transition-colors duration-300">
                                    {item.name}
                                </span>
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                                <span className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full z-0 scale-90 group-hover:scale-100" />
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden lg:flex items-center gap-6">
                        <div className="flex flex-col items-end mr-2">
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Appelez-nous</span>
                            <a href="tel:+1234567890" className="text-sm font-bold font-heading text-secondary hover:text-primary transition-colors">
                                {siteConfig.contact.phone}
                            </a>
                        </div>
                        <Button className="rounded-full px-6 font-bold tracking-wide shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300">
                            Devis Gratuit <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <Sheet>
                        <SheetTrigger asChild className="lg:hidden">
                            <Button variant="ghost" size="icon" className="hover:bg-transparent">
                                <Menu className="w-8 h-8 text-secondary" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l border-white/10 p-0 overflow-hidden">
                            <SheetTitle className="sr-only">Menu</SheetTitle>
                            <SheetDescription className="sr-only">Menu de Navigation</SheetDescription>

                            <div className="h-full flex flex-col bg-secondary text-white relative">
                                {/* Decorative Background */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

                                <div className="p-8 border-b border-white/10 z-10">
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src="/images/logo/jbh.png"
                                            alt="JBH Engineering"
                                            width={180}
                                            height={60}
                                            className="h-12 w-auto object-contain"
                                        />
                                    </div>
                                </div>

                                <nav className="flex-1 px-8 py-12 flex flex-col gap-6 z-10 overflow-y-auto">
                                    {navigation.map((item, index) => (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + index * 0.1 }}
                                        >
                                            <Link
                                                href={item.href}
                                                className="group flex items-center justify-between text-2xl font-bold font-heading hover:text-primary transition-colors py-2 border-b border-white/5"
                                            >
                                                <span>{item.name}</span>
                                                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>

                                <div className="p-8 border-t border-white/10 bg-white/5 z-10 backdrop-blur-sm">
                                    <div className="flex flex-col gap-4">
                                        <p className="text-sm text-gray-400">
                                            Contactez-nous pour votre prochain projet.
                                        </p>
                                        <div className="flex gap-4">
                                            {socialLinks.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                                                >
                                                    <item.icon className="w-4 h-4" />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </motion.header>
    );
}

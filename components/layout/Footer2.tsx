'use client';

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowUpRight, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

const footerLinks = {
    navigation: [
        { name: "Accueil", href: "/" },
        { name: "À Propos", href: "/about" },
        { name: "Projets", href: "/projects" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ],
    services: [
        { name: "Ingénierie de structure", href: "/projects" },
        { name: "Ingénierie des lots techniques", href: "/projects" },
        { name: "Voirie et reseaux divers", href: "/projects" },
        { name: "Securité incendie", href: "/projects" },
    ],
};

const socialLinks = [
    { name: "Facebook", icon: Facebook, href: siteConfig.social.facebook },
    { name: "Instagram", icon: Instagram, href: siteConfig.social.instagram },
    { name: "Twitter", icon: Twitter, href: siteConfig.social.twitter },
    { name: "LinkedIn", icon: Linkedin, href: siteConfig.social.linkedin },
];

export function Footer2() {
    return (
        <footer className="bg-white border-t border-gray-100">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-16 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

                    {/* Brand Section */}
                    <div className="lg:col-span-4">
                        <Link href="/" className=" mb-6 flex items-center gap-2">
                            <Image
                                src="/images/logo/single-logo.png"
                                alt={siteConfig.name}
                                width={160}
                                height={50}
                                className="h-12 w-auto"
                            />
                            <span className="text-2xl font-bold text-gray-900">{siteConfig.name}</span>
                        </Link>
                        <p className="text-gray-600 mb-8 max-w-sm leading-relaxed">
                            Acompagner les professionnels dans la réalisation de leurs projets.
                        </p>

                        {/* Newsletter */}
                        <div className="bg-gray-50 rounded-2xl p-6">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">
                                Restez informé
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Abonnez-vous à notre newsletter pour les dernières nouvelles.
                            </p>
                            <form className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Votre email"
                                    className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                                <button
                                    type="submit"
                                    aria-label="S'abonner à la newsletter"
                                    className="px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                                >
                                    <ArrowUpRight className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Links Section */}
                    <div className="lg:col-span-5 grid grid-cols-2 gap-8">
                        {/* Navigation */}
                        <div>
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">
                                Navigation
                            </h4>
                            <ul className="space-y-4">
                                {footerLinks.navigation.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="group flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
                                        >
                                            <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">
                                Services
                            </h4>
                            <ul className="space-y-4">
                                {footerLinks.services.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="group flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
                                        >
                                            <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="lg:col-span-3">
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">
                            Contact
                        </h4>
                        <div className="space-y-5">
                            <motion.a
                                href={siteConfig.contact.phoneLink}
                                className="flex items-start gap-4 group"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                                    <Phone className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Téléphone</p>
                                    <p className="text-gray-700 font-medium group-hover:text-primary transition-colors">
                                        {siteConfig.contact.phone}
                                    </p>
                                </div>
                            </motion.a>

                            <motion.a
                                href={siteConfig.contact.emailLink}
                                className="flex items-start gap-4 group"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                                    <Mail className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Email</p>
                                    <p className="text-gray-700 font-medium group-hover:text-primary transition-colors">
                                        {siteConfig.contact.email}
                                    </p>
                                </div>
                            </motion.a>

                            <motion.div
                                className="flex items-start gap-4"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <MapPin className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Adresse</p>
                                    <p className="text-gray-700 font-medium text-sm leading-relaxed">
                                        {siteConfig.address.full}
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3 mt-8">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    aria-label={`Suivez-nous sur ${social.name}`}
                                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all"
                                    whileHover={{ y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <social.icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-100">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-500">
                            © {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link
                                href="#"
                                className="text-sm text-gray-500 hover:text-primary transition-colors"
                            >
                                Politique de Confidentialité
                            </Link>
                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                            <Link
                                href="#"
                                className="text-sm text-gray-500 hover:text-primary transition-colors"
                            >
                                Conditions d&apos;Utilisation
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

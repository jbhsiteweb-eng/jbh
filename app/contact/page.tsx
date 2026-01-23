"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, ArrowRight, Building2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const contactInfo = [
    {
        icon: MapPin,
        title: "Visitez Notre Bureau",
        details: [siteConfig.address.street, `${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`],
    },
    {
        icon: Phone,
        title: "Appelez-nous",
        details: [siteConfig.contact.phone, siteConfig.contact.phone2, siteConfig.contact.phone3],
    },
    {
        icon: Mail,
        title: "Envoyez-nous un Email",
        details: [siteConfig.contact.email],
    },
    {
        icon: Clock,
        title: "Heures d'Ouverture",
        details: [`${siteConfig.workingHours.weekdays}: ${siteConfig.workingHours.weekdayHours}`, `${siteConfig.workingHours.saturday}: ${siteConfig.workingHours.saturdayHours}`],
    },
];

const services = [
    "Securite Incendie",
    "Ingénierie de Structure",
    "Ingenierie des Lots Techniques",
    "Gestion de Projet",
    "Voirie et Reseaux Divers ",
    "Consulting et Assistance",
    "Expertise Technique",

];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
        website: "", // Honeypot field
        timestamp: Date.now().toString(), // Anti-bot timestamp
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    // Client-side validation
    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!formData.name || formData.name.trim().length < 2) {
            errors.name = "Le nom doit contenir au moins 2 caractères";
        }

        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Veuillez entrer un email valide";
        }

        if (formData.phone && !/^[\d\s+()-]{8,20}$/.test(formData.phone)) {
            errors.phone = "Format de téléphone invalide";
        }

        if (!formData.message || formData.message.trim().length < 10) {
            errors.message = "Le message doit contenir au moins 10 caractères";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setValidationErrors({});

        // Client-side validation
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setIsSubmitted(true);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    service: "",
                    message: "",
                    website: "",
                    timestamp: Date.now().toString(),
                });
                setTimeout(() => setIsSubmitted(false), 5000);
            } else {
                setError(data.error || "Une erreur est survenue. Veuillez réessayer.");
                if (data.details) {
                    console.error("Validation errors:", data.details);
                }
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setError("Erreur de connexion. Veuillez vérifier votre connexion internet.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear validation error for this field
        if (validationErrors[name]) {
            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-32 bg-secondary overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-secondary/95 z-10" />
                    <img
                        src="/bg/bg.jpeg"
                        alt="Blueprint detailsBackground"
                        className="w-full h-full object-cover opacity-20 invert mix-blend-overlay"
                    />
                </div>contactInfo

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

                <div className="container mx-auto px-4 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <Link href="/" className="text-gray-400 hover:text-primary transition-colors">Accueil</Link>
                            <span className="text-gray-600">/</span>
                            <span className="text-white">Contact</span>contactInfo
                        </div>

                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
                            Contactez-nous
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
                            Construisons <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">
                                Quelque Chose de Grand
                            </span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl">
                            Prêt à transformer votre vision en réalité ? Contactez notre équipe d'ingénieurs experts dès aujourd'hui.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 -mt-20 relative z-30">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white dark:bg-white/5 p-8 rounded-3xl shadow-xl shadow-black/5 border border-neutral-100 dark:border-white/10 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <info.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-3">{info.title}</h3>
                                {info.details.map((detail, i) => (
                                    <p key={i} className="text-muted-foreground text-sm">{detail}</p>
                                ))}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Contact Section */}
            <section className="py-24 relative overflow-hidden" id="inputs">
                {/* Background Pattern */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <img
                        src="/bg/bg.jpeg"
                        alt="Blueprint Background"
                        className="w-full h-full object-cover opacity-5"
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10" >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-white dark:bg-white/5 p-10 md:p-12 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-neutral-100 dark:border-white/10"
                        >
                            <div className="mb-10">
                                <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">
                                    Envoyer un Message
                                </span>
                                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                                    Démarrer Votre Projet
                                </h2>
                            </div>

                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-16 text-center"
                                >
                                    <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
                                    <h3 className="text-2xl font-bold text-foreground mb-2">Message Envoyé !</h3>
                                    <p className="text-muted-foreground">Nous vous répondrons dans les 24 heures.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Security: Honeypot field (hidden from users, visible to bots) */}
                                    <input
                                        type="text"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
                                        tabIndex={-1}
                                        autoComplete="off"
                                        aria-hidden="true"
                                    />

                                    {/* Error Display */}
                                    {error && (
                                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">!</div>
                                            <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                Nom Complet <span className="text-red-500">*</span>
                                            </label>
                                            <Input
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Nom Complet"
                                                className={`h-14 rounded-xl border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5 focus:border-primary ${validationErrors.name ? 'border-red-500' : ''}`}
                                                required
                                            />
                                            {validationErrors.name && (
                                                <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                Adresse Email <span className="text-red-500">*</span>
                                            </label>
                                            <Input
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="nom@example.com"
                                                className={`h-14 rounded-xl border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5 focus:border-primary ${validationErrors.email ? 'border-red-500' : ''}`}
                                                required
                                            />
                                            {validationErrors.email && (
                                                <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Numéro de Téléphone</label>
                                            <Input
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+212 6 55 55 55 55"
                                                className={`h-14 rounded-xl border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5 focus:border-primary ${validationErrors.phone ? 'border-red-500' : ''}`}
                                            />
                                            {validationErrors.phone && (
                                                <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Service Requis</label>
                                            <select
                                                name="service"
                                                value={formData.service}
                                                onChange={handleChange}
                                                className="w-full h-14 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5 px-4 text-foreground focus:border-primary focus:outline-none"
                                            >
                                                <option value="">Sélectionnez un service</option>
                                                {services.map((service, i) => (
                                                    <option key={i} value={service}>{service}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Détails du Projet <span className="text-red-500">*</span>
                                        </label>
                                        <Textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Parlez-nous de votre projet..."
                                            className={`min-h-[150px] rounded-xl border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5 focus:border-primary resize-none ${validationErrors.message ? 'border-red-500' : ''}`}
                                            required
                                        />
                                        {validationErrors.message && (
                                            <p className="text-red-500 text-xs mt-1">{validationErrors.message}</p>
                                        )}
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {formData.message.length}/5000 caractères
                                        </p>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-14 rounded-xl font-bold tracking-wide shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                                                Envoi en cours...
                                            </>
                                        ) : (
                                            <>Envoyer le Message <Send className="w-4 h-4 ml-2" /></>
                                        )}
                                    </Button>

                                    <p className="text-xs text-muted-foreground text-center">
                                        🔒 Vos informations sont protégées et ne seront jamais partagées
                                    </p>
                                </form>
                            )}
                        </motion.div>

                        {/* Right Side Content */}
                        <div className="space-y-10">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
                                    Pourquoi Nous Choisir
                                </span>
                                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight mb-6">
                                    Ingénierie Experte <br />
                                    <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">
                                        & Solutions de Pointe
                                    </span>
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                                    Avec plus de 15 ans d'expérience dans l'ingénierie de construction,
                                    nous partageons votre vision avec précision et innovation.
                                </p>

                                <div className="space-y-4">
                                    {[
                                        "Équipe ingénierie primée",
                                        "Solutions de construction durable",
                                        "Livraison de projet à temps",
                                        "Prix transparents",
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: i * 0.1 }}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                <CheckCircle className="w-4 h-4" />
                                            </div>
                                            <span className="text-foreground font-medium">{item}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* CTA Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="bg-secondary p-10 rounded-3xl relative overflow-hidden"
                            >
                                <div className="absolute inset-0 opacity-10">
                                    <img
                                        src="/bg/bg.jpeg"
                                        alt=""
                                        className="w-full h-full object-cover invert"
                                    />
                                </div>
                                <div className="relative z-10">
                                    <Building2 className="w-12 h-12 text-primary mb-6" />
                                    <h3 className="text-2xl font-bold text-white mb-4">
                                        Planifier une Consultation
                                    </h3>
                                    <p className="text-gray-300 mb-6">
                                        Réservez une consultation gratuite de 30 minutes avec nos ingénieurs seniors pour discuter des exigences de votre projet.
                                    </p>
                                    <Button
                                        onClick={() => {
                                            document.getElementById("inputs")?.scrollIntoView({ behavior: "smooth" })
                                        }}
                                        variant="outline"
                                        className="rounded-full px-8 border-white/20 text-black hover:bg-white hover:text-secondary transition-all duration-300"
                                    >
                                        Réserver <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="h-[500px] relative">
                <div className="absolute inset-0 bg-secondary/5">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3440.8436516987776!2d-9.567568323835625!3d30.412177501053062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3b74695c4cc19%3A0x531d7ace06ffd6ee!2sJBH%20ENGINEERING!5e0!3m2!1sen!2sma!4v1768253213092!5m2!1sen!2sma"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                        title="Our Location"
                    />
                </div>
            </section>
        </main>
    );
}

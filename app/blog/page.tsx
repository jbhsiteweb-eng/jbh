"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { blogPosts, categories } from "@/data/blogs/blogs";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState("Tous");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = activeCategory === "Tous" || post.category === activeCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredPosts = blogPosts.filter(post => post.featured);

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-32 bg-secondary overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-secondary/95 z-10" />
                    <Image
                        src="/bg/bg.jpeg"
                        alt="Blueprint Background"
                        fill
                        className="w-full h-full object-cover opacity-20 invert mix-blend-overlay"
                    />
                </div>

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
                            <span className="text-white">Blog</span>
                        </div>

                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
                            Informations & Articles
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
                            Blog d&apos;ingénierie <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">
                                & de Design
                            </span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl">
                            Explorez les dernières tendances, innovations et idées en ingénierie,
                            construction et design d&apos;intérieur de notre équipe d&apos;experts.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Featured Posts */}
            <section className="py-16 -mt-20 relative z-30">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {featuredPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Link href={`/blog/${post.slug}`}>
                                    <div className="relative rounded-3xl overflow-hidden group cursor-pointer h-[400px]">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/50 to-transparent" />

                                        <div className="absolute inset-0 flex flex-col justify-end p-8">
                                            <span className="inline-block bg-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full w-fit mb-4">
                                                {post.category}
                                            </span>
                                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                                                {post.title}
                                            </h2>
                                            <div className="flex items-center gap-6 text-white/70 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <User className="w-4 h-4" />
                                                    {post.author}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    {post.date}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4" />
                                                    {post.readTime}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Search and Filter */}
            <section className="py-8 border-b border-border">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
                        {/* Search */}
                        <div className="relative w-full lg:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Rechercher des articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-12 rounded-full border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5"
                            />
                        </div>

                        {/* Categories */}
                        <div className="flex flex-wrap justify-center gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 ${activeCategory === category
                                        ? "bg-primary text-white"
                                        : "bg-neutral-100 dark:bg-white/5 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="py-24 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
                    <Image src="/bg/bg.jpeg" fill alt="" aria-hidden="true" className="w-full h-full object-cover" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        key={activeCategory + searchQuery}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredPosts.filter(p => !p.featured).map((post) => (
                            <motion.article
                                key={post.id}
                                variants={itemVariants}
                                className="group"
                            >
                                <Link href={`/blog/${post.slug}`}>
                                    <div className="bg-white dark:bg-white/5 rounded-3xl overflow-hidden border border-neutral-100 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500">
                                        {/* Image */}
                                        <div className="relative aspect-video overflow-hidden">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-4 h-4 text-primary" />
                                                    {post.date}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-4 h-4 text-primary" />
                                                    {post.readTime}
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>

                                            <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-border">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <User className="w-4 h-4 text-primary" />
                                                    </div>
                                                    <span className="text-sm font-medium text-foreground">{post.author}</span>
                                                </div>
                                                <span className="text-primary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                                    Lire la Suite <ArrowRight className="w-4 h-4" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </motion.div>

                    {filteredPosts.filter(p => !p.featured).length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <p className="text-muted-foreground text-lg">Aucun article trouvé correspondant à vos critères.</p>
                        </motion.div>
                    )}

                    {/* Load More Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-center mt-16"
                    >
                        <Button variant="outline" className="rounded-full px-10 h-14 border-primary/20 hover:bg-primary hover:text-white transition-all duration-300">
                            Charger Plus d&apos;Articles
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-24 bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-secondary/95 z-10" />
                    <Image
                        src="/bg/bg.jpeg"
                        alt="Blueprint Background"
                        fill
                        className="w-full h-full object-cover opacity-20 invert mix-blend-overlay"
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
                            Restez Informé
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight mb-6">
                            Abonnez-vous à Notre <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">
                                Newsletter
                            </span>
                        </h2>
                        <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto">
                            Recevez les dernières tendances architecturales, les mises à jour des projets et les informations sur l&apos;industrie
                            directement dans votre boîte de réception.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                            <Input
                                type="email"
                                placeholder="Entrez votre email"
                                className="h-14 rounded-full bg-white/10 border-white/20 text-white placeholder:text-gray-400 flex-1"
                            />
                            <Button className="rounded-full px-8 h-14 font-bold tracking-wide shadow-lg shadow-primary/30">
                                S&apos;abonner <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}

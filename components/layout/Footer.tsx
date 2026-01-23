import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";

const footerLinks = {
    company: [
        { name: "À Propos", href: "/about" },
        { name: "Notre Équipe", href: "/about#team" },
        { name: "Notre Processus", href: "/about#process" },
        { name: "Nos Valeurs", href: "/about#values" },
    ],
    services: [
        { name: "Conception Architecturale", href: "/projects" },
        { name: "Design d'Intérieur", href: "/projects" },
        { name: "Urbanisme", href: "/projects" },
        { name: "Construction Durable", href: "/projects" },
    ],
    quickLinks: [
        { name: "Projets", href: "/projects" },
        { name: "Blog", href: "/blog" },
        { name: "Carrières", href: "/contact" },
        { name: "Contact", href: "/contact" },
    ],
};

export function Footer() {
    return (
        <footer className="bg-secondary text-white">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-2xl font-heading font-bold mb-4 text-primary">
                            {siteConfig.name}
                        </h3>
                        <p className="text-gray-400 mb-6">
                            Créer des solutions architecturales innovantes alliant esthétique
                            et fonctionnalité.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
                                <span className="text-sm text-gray-400">
                                    {siteConfig.address.full}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <a href={siteConfig.contact.phoneLink} className="text-sm text-gray-400 hover:text-primary transition-colors">
                                    {siteConfig.contact.phone}
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <a href={siteConfig.contact.emailLink} className="text-sm text-gray-400 hover:text-primary transition-colors">
                                    {siteConfig.contact.email}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-lg font-heading font-semibold mb-4">Entreprise</h4>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-primary transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Links */}
                    <div>
                        <h4 className="text-lg font-heading font-semibold mb-4">
                            Services
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-primary transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-heading font-semibold mb-4">
                            Liens Rapides
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-primary transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Separator className="bg-gray-700 mb-8" />

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} JBH ENGINEERING. Tous droits réservés.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link
                            href="#"
                            className="text-sm text-gray-400 hover:text-primary transition-colors"
                        >
                            Politique de Confidentialité
                        </Link>
                        <Link
                            href="#"
                            className="text-sm text-gray-400 hover:text-primary transition-colors"
                        >
                            Conditions d'Utilisation
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}


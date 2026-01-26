// Site configuration - Update these values to change contact info across the entire website

export const siteConfig = {

    ///team

    team: [
        {
            name: "Mr. Abdelaly Jabbad",
            role: "Ingénieur d'État en lots techniques, breveté en Sécurité incendie",
            description: "Responsable département lots techniques, sécurité incendie.",
            qualifications: [
                "Étude et suivi lots techniques",
                "Supervision des installations techniques",
                "Contrôle technique",
                "Etudes Sécurité incendie",
            ],
            image: "/images/company/profile-image.jpeg",
        },
        {
            name: "Mr. Mohamed El Hilali",
            role: "Ingénieur d'État en génie civil",
            description: "Responsable département structure ",
            qualifications: [
                "Étude et suivi béton armé et charpente métallique",
                "Contrôle technique construction",
            ],
            image: "/images/company/med.jpeg",
        },
    ],

    // Company Info
    name: "JBH ENGINEERING",
    tagline: "Bureau d'Études Techniques",
    description: "JBH ENGINEERING est un studio d'architecture de premier plan offrant des expériences spatiales durables, innovantes et esthétiquement profondes.",

    // Contact Information
    contact: {
        phone: "+212 661 85 85 81",
        phone2: "+212 661 51 61 09",
        phone3: "+212 528 23 25 26",
        phoneLink: "tel:+212 661 85 85 81",
        email: "Contact@jbh.ma",
        emailLink: "mailto:Contact@jbh.ma",
        whatsapp: "212661858581", // Without + or spaces
        whatsappMessage: "Bonjour ! Je suis intéressé par vos services.",
    },

    // Address
    address: {
        street: "Bur N°7, 2ème étage, Imm Ennassim, Bd Hassan I, Cité El Massira – Agadir",
        suite: "Suite 500",
        city: "AGADIR",
        state: "AG",
        zip: "80000",
        country: "MA",
        full: "Bur N°7, 2ème étage, Imm Ennassim, Bd Hassan I, Cité El Massira – Agadir",
        short: "Bur N°7, 2ème étage, Imm Ennassim, Bd Hassan I, Cité El Massira – Agadir",
        mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13218.123456789!2d-5.5678901234567!3d33.8901234567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDUzJzI0LjQiTiA1wrAzNCcwNC40Ilc!5e0!3m2!1sen!2sma!4v1234567890123!5m2!1sen!2sma",
    },

    // Working Hours
    workingHours: {
        weekdays: "Lundi - Vendredi",
        weekdayHours: "09h00 - 18h00",
        saturday: "Samedi",
        saturdayHours: "09h00 - 12h00",
        sunday: "Dimanche",
        sundayHours: "Fermé",
        timezone: "EST",
        full: "Lun-Ven : 09h00 - 18h00 | Sam : 09h00 - 12h00",
    },

    // Social Media Links
    social: {
        facebook: "https://facebook.com/jbhengineering",
        instagram: "https://instagram.com/jbhengineering",
        twitter: "https://twitter.com/jbhengineering",
        linkedin: "https://linkedin.com/company/jbhengineering",
        youtube: "https://youtube.com/@jbhengineering",
    },

    // SEO & Meta
    seo: {
        title: "JBH ENGINEERING | Architecture et Design Visionnaires",
        titleTemplate: "%s | JBH ENGINEERING",
        defaultImage: "/og-image.jpg",
        twitterHandle: "@jbhengineering",
    },

    // Company Stats (for about page, etc.)
    stats: {
        yearsExperience: "25+",
        projectsCompleted: "500+",
        awardsWon: "150+",
        teamMembers: "50+",
        clientSatisfaction: "98%",
        countriesServed: "15",
    },
};

// Helper function to get WhatsApp URL
export function getWhatsAppUrl(customMessage?: string): string {
    const message = customMessage || siteConfig.contact.whatsappMessage;
    return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

// Helper function to format phone for display
export function formatPhone(phone: string): string {
    return phone;
}

export default siteConfig;

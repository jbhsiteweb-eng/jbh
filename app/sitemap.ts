import { MetadataRoute } from "next";

import { projects } from "@/data/projects/projects";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://jbh.ma";

    // Main pages
    const routes: MetadataRoute.Sitemap = [
        "",
        "/about",
        "/projects",
        "/blog",
        "/contact"
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: (route === "" ? "weekly" : "monthly") as "weekly" | "monthly",
        priority: route === "" ? 1 : 0.8
    }));

    // Project pages
    const projectRoutes = projects.map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6
    }));

    // Blog posts (you can add dynamic blog data here)
    const blogRoutes = [
        "/blog/future-sustainable-architecture-urban-development",
        "/blog/innovative-construction-materials-revolutionizing-industry",
        "/blog/minimalist-interior-design-creating-space-purpose",
        "/blog/smart-buildings-iot-transforming-architecture",
        "/blog/biophilic-design-bringing-nature-modern-architecture",
        "/blog/rise-modular-construction-commercial-buildings",
        "/blog/color-psychology-interior-design-creating-mood",
        "/blog/net-zero-buildings-carbon-neutral-architecture"
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "yearly" as const,
        priority: 0.5
    }));

    return [...routes, ...projectRoutes, ...blogRoutes];
}

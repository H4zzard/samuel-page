import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/penhora-de-imoveis", "/politica-de-privacidade", "/politica-de-cookies"];
  return routes.map((route, index) => ({
    url: `${siteConfig.baseUrl}${route}`,
    lastModified: new Date("2026-10-09"),
    changeFrequency: index === 0 ? "monthly" : "yearly",
    priority: index === 0 ? 1 : 0.3,
  }));
}

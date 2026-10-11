import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/penhora-de-imoveis",
    "/bloqueio-judicial-de-conta",
    "/politica-de-privacidade",
    "/politica-de-cookies",
  ];
  return routes.map((route, index) => ({
    url: `${siteConfig.baseUrl}${route}`,
    lastModified: new Date("2026-10-10"),
    changeFrequency: index < 2 ? "monthly" : "yearly",
    priority: index < 2 ? 1 : 0.3,
  }));
}

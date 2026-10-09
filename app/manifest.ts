import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dr. Samuel Santos — Penhora de Imóveis",
    short_name: "Samuel Santos",
    description: "Informações jurídicas sobre penhora de imóveis e bem de família.",
    start_url: "/penhora-de-imoveis",
    display: "standalone",
    background_color: "#0b0b0b",
    theme_color: "#0b0b0b",
    lang: "pt-BR",
  };
}

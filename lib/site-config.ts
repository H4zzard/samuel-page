const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://advsamuelsantos.com.br").replace(/\/$/, "");

export const siteConfig = {
  name: "Dr. Samuel Santos",
  legalName: "Samuel dos Santos Silva Sociedade Individual de Advocacia",
  oab: "OAB/SP 349.894",
  cnpj: "35.852.807/0001-37",
  education: "Bacharel em Direito pela Universidade São Francisco",
  baseUrl,
  pagePath: "/penhora-de-imoveis",
  pageUrl: `${baseUrl}/penhora-de-imoveis`,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "",
  address: process.env.NEXT_PUBLIC_OFFICE_ADDRESS?.trim() ?? "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "5511947595005",
  whatsappMessage:
    "Olá, Dr. Samuel. Gostaria de informações sobre atendimento jurídico relacionado à penhora de um imóvel.",
  allowIndexing: process.env.ALLOW_INDEXING === "true",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? "",
} as const;

export function whatsappUrl() {
  if (!siteConfig.whatsapp) return "#contato";
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;
}

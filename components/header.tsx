import Link from "next/link";
import { Scale } from "lucide-react";
import { ContactCta } from "@/components/contact-cta";

const nav = [
  ["Início", "/penhora-de-imoveis#inicio"],
  ["Situações atendidas", "/penhora-de-imoveis#situacoes"],
  ["Sobre", "/penhora-de-imoveis#sobre"],
  ["Dúvidas", "/penhora-de-imoveis#duvidas"],
  ["Contato", "/penhora-de-imoveis#contato"],
] as const;

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/penhora-de-imoveis" aria-label="Página inicial — Dr. Samuel Santos">
          <span className="brand-mark"><Scale aria-hidden="true" size={21} strokeWidth={1.5} /></span>
          <span>
            <strong>Samuel Santos</strong>
            <small>Advocacia</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <ContactCta openForm location="header" className="header-cta">
          Falar com o escritório
        </ContactCta>
      </div>
    </header>
  );
}

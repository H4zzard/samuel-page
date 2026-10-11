import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-identity">
          <p className="footer-kicker">ADVOCACIA • DIREITO CIVIL</p>
          <h2>Dr. Samuel Santos</h2>
          <p>{siteConfig.oab}</p>
          <p className="footer-note">Informação jurídica com sobriedade, clareza e análise individualizada.</p>
        </div>
        <div>
          <h3>Institucional</h3>
          <Link href="/penhora-de-imoveis#sobre">Sobre o advogado</Link>
          <Link href="/penhora-de-imoveis#atuacao">Como funciona o atendimento</Link>
          <Link href="/penhora-de-imoveis#duvidas">Dúvidas frequentes</Link>
        </div>
        <div>
          <h3>Informações</h3>
          <Link href="/politica-de-privacidade">Política de Privacidade</Link>
          <Link href="/politica-de-cookies">Política de Cookies</Link>
          {siteConfig.email && <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>}
          {siteConfig.address && <p>{siteConfig.address}</p>}
        </div>
        <div className="footer-legal">
          <h3>Identificação</h3>
          <p>{siteConfig.legalName}</p>
          <p>CNPJ {siteConfig.cnpj}</p>
          <a href="#inicio">Voltar ao topo <ArrowUpRight aria-hidden="true" size={15} /></a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.legalName}.</span>
        <span>Conteúdo informativo. A análise jurídica depende das particularidades de cada caso.</span>
      </div>
    </footer>
  );
}

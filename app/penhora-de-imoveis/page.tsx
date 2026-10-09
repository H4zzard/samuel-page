import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarClock,
  CheckCircle2,
  FileCheck2,
  FileText,
  Gavel,
  Home,
  Landmark,
  Scale,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import { ContactCta } from "@/components/contact-cta";
import { ContactForm } from "@/components/contact-form";
import { ContactModal } from "@/components/contact-modal";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Penhora de Imóveis | Dr. Samuel Santos - OAB/SP",
  description:
    "Informações sobre penhora de imóveis, leilão judicial e impenhorabilidade. Conheça a atuação do Dr. Samuel Santos, OAB/SP 349.894.",
  alternates: { canonical: siteConfig.pageUrl },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.pageUrl,
    title: "Penhora de Imóveis | Dr. Samuel Santos - OAB/SP",
    description: "Orientação jurídica sobre imóvel penhorado, risco de leilão e bem de família.",
    siteName: "Dr. Samuel Santos — Advocacia",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Dr. Samuel Santos — Penhora de Imóveis" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Penhora de Imóveis | Dr. Samuel Santos - OAB/SP",
    description: "Informação jurídica sobre penhora de imóveis e bem de família.",
    images: ["/opengraph-image"],
  },
};

const situations = [
  { icon: Gavel, title: "Imóvel atingido por penhora judicial", text: "Análise do ato de constrição, do processo e das circunstâncias do bem." },
  { icon: FileText, title: "Intimação relacionada à execução", text: "Leitura técnica da comunicação recebida e identificação dos próximos atos." },
  { icon: CalendarClock, title: "Leilão judicial designado", text: "Verificação da fase processual, edital, avaliação e medidas juridicamente cabíveis." },
  { icon: Scale, title: "Penhorabilidade questionada", text: "Exame da natureza da dívida e das proteções previstas na legislação." },
  { icon: Home, title: "Penhora de imóvel residencial", text: "Avaliação da possível caracterização como bem de família e de suas exceções." },
  { icon: SearchCheck, title: "Dúvidas sobre medidas de defesa", text: "Orientação individualizada a partir dos documentos e do andamento do processo." },
];

const faq = [
  ["O que fazer quando um imóvel é penhorado?", "É importante obter a íntegra do processo, identificar a decisão que determinou a penhora, verificar como ocorreram as intimações e reunir documentos do imóvel e de sua utilização. As medidas possíveis dependem da fase processual, da natureza da dívida e das características do bem; por isso, a análise deve ser individualizada."],
  ["Uma casa pode ser penhorada por dívida?", "Pode, em determinadas situações. A Lei nº 8.009/1990 protege, em regra, o imóvel residencial da entidade familiar, mas prevê exceções. A origem da dívida, a destinação do imóvel e outros elementos do caso influenciam a análise."],
  ["O único imóvel da família pode ser penhorado?", "O fato de ser o único imóvel é relevante, mas não encerra a questão. É necessário verificar se ele se enquadra como bem de família e se a dívida está entre as exceções legais, como algumas obrigações relacionadas ao próprio imóvel, financiamento para sua aquisição, pensão alimentícia, tributos e condomínio, entre outras hipóteses previstas em lei."],
  ["É possível questionar uma penhora judicial?", "A legislação processual prevê instrumentos para discutir a penhora, mas a medida adequada e sua viabilidade variam conforme o processo. Podem ser relevantes aspectos como impenhorabilidade, excesso, avaliação, intimações e direitos de terceiros. Isso não significa que toda penhora seja inválida ou possa ser desfeita."],
  ["O que acontece quando o imóvel vai a leilão?", "Após a penhora e a avaliação, o processo pode avançar para atos de expropriação, inclusive adjudicação ou leilão. O edital informa condições, datas, avaliação, preço mínimo e eventuais ônus. A proximidade do leilão torna especialmente importante conhecer com precisão o estágio do processo e os prazos aplicáveis."],
  ["Quais documentos podem ser necessários?", "Em geral, podem ser úteis a íntegra do processo, a matrícula atualizada, contrato de aquisição ou financiamento, comprovantes de residência, documentos familiares e intimações recebidas. A lista correta depende do caso. Não envie documentos sigilosos por formulários públicos."],
  ["A penhora pode atingir imóvel financiado?", "Pode haver constrição de direitos relacionados ao imóvel, mesmo quando existe financiamento ou alienação fiduciária. O contrato, a titularidade registrada, o saldo e a posição do credor fiduciário precisam ser examinados para compreender o alcance da medida."],
  ["Existe prazo para apresentar defesa?", "Sim, atos processuais estão sujeitos a prazos que variam conforme a medida, o procedimento e a forma de intimação. Como a contagem exige acesso aos autos e análise técnica, não é seguro presumir um prazo sem examinar o processo concreto."],
] as const;

export default function PenhoraDeImoveisPage() {
  const legalServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: siteConfig.legalName,
    url: siteConfig.pageUrl,
    taxID: siteConfig.cnpj,
    founder: { "@type": "Person", name: "Samuel Santos", identifier: siteConfig.oab },
    serviceType: "Atuação jurídica em Direito Civil, execuções e penhora de imóveis",
  };
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Samuel Santos",
    honorificPrefix: "Dr.",
    jobTitle: "Advogado",
    identifier: siteConfig.oab,
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universidade São Francisco" },
    worksFor: { "@type": "LegalService", name: siteConfig.legalName },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: siteConfig.baseUrl },
      { "@type": "ListItem", position: 2, name: "Penhora de imóveis", item: siteConfig.pageUrl },
    ],
  };

  return (
    <>
      {[legalServiceJsonLd, personJsonLd, breadcrumbJsonLd].map((data, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
      ))}
      <Header />
      <main>
        <section className="hero" id="inicio">
          <div className="hero-rule" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <nav className="breadcrumb" aria-label="Navegação estrutural">
                <Link href="/">Início</Link><span>/</span><span>Penhora de imóveis</span>
              </nav>
              <p className="eyebrow"><span /> DIREITO CIVIL • EXECUÇÕES JUDICIAIS</p>
              <h1>Seu imóvel foi penhorado ou está em risco de <em>leilão judicial?</em></h1>
              <p className="hero-lead">Entenda as possibilidades jurídicas de defesa diante da penhora de um imóvel e a importância de uma análise individualizada do processo.</p>
              <div className="hero-actions">
                <ContactCta openForm location="hero">Solicitar atendimento jurídico</ContactCta>
                <a className="quiet-link" href="#entenda">Entender a penhora <ArrowDown aria-hidden="true" size={16} /></a>
              </div>
              <div className="lawyer-id"><span>SS</span><p><strong>Dr. Samuel Santos</strong><small>{siteConfig.oab}</small></p></div>
            </div>
            <div className="hero-portrait-wrap">
              <div className="portrait-frame">
                <Image
                  src="/images/samuel-santos-upscale.jpeg"
                  alt="Retrato profissional do Dr. Samuel Santos"
                  fill
                  priority
                  sizes="(max-width: 900px) 92vw, 42vw"
                  className="portrait-image"
                />
                <div className="portrait-vignette" />
                <div className="portrait-caption"><span>Atuação em</span><strong>Direito Civil</strong><small>Execuções e penhoras</small></div>
              </div>
              <div className="document-motif" aria-hidden="true"><FileText size={22} /><span /><span /><span /></div>
              <div className="gold-square" aria-hidden="true" />
            </div>
          </div>
          <div className="container trust-strip">
            <span><BadgeCheck size={18} aria-hidden="true" />Atuação profissional identificada</span>
            <span><FileCheck2 size={18} aria-hidden="true" />Análise documental e processual</span>
            <span><ShieldCheck size={18} aria-hidden="true" />Atendimento com confidencialidade</span>
          </div>
        </section>

        <section className="section light" id="situacoes">
          <div className="container">
            <div className="section-heading split-heading">
              <div><p className="section-index">01 — SITUAÇÕES ATENDIDAS</p><h2>Quando a penhora de um imóvel exige atenção jurídica?</h2></div>
              <p>A penhora integra um processo judicial e pode avançar para atos de expropriação. Compreender o estágio do caso ajuda a definir quais providências merecem ser avaliadas.</p>
            </div>
            <div className="situations-grid">
              {situations.map(({ icon: Icon, title, text }, index) => (
                <article className="situation-card" key={title}>
                  <span className="card-number">0{index + 1}</span><Icon aria-hidden="true" size={25} strokeWidth={1.5} />
                  <h3>{title}</h3><p>{text}</p>
                </article>
              ))}
            </div>
            <div className="section-cta-row">
              <ContactCta openForm location="situations_section" className="section-contact-button">Quero orientação sobre meu imóvel</ContactCta>
              <p>Apresente sua situação inicial ao escritório.</p>
            </div>
          </div>
        </section>

        <section className="section paper-section" id="entenda">
          <div className="container editorial-grid">
            <div className="sticky-title"><p className="section-index">02 — COMPREENSÃO DO PROCESSO</p><h2>Como funciona a penhora de imóveis?</h2><div className="editorial-mark"><Building2 size={34} aria-hidden="true" /></div></div>
            <div className="editorial-copy">
              <p className="lead-serif">A penhora é um ato de constrição patrimonial realizado em processo de execução para vincular um bem à satisfação de uma dívida reconhecida judicialmente.</p>
              <p>No caso de imóveis, a medida costuma envolver a identificação e avaliação do bem, o registro da penhora e a intimação das pessoas previstas em lei. Se o processo prosseguir, podem ocorrer atos de expropriação, como adjudicação ou alienação judicial.</p>
              <div className="process-line">
                {[["01","Decisão e constrição"],["02","Registro e intimações"],["03","Avaliação do imóvel"],["04","Possível expropriação"]].map(([n,t]) => <div key={n}><span>{n}</span><strong>{t}</strong></div>)}
              </div>
              <aside className="legal-note"><Scale size={22} aria-hidden="true" /><p><strong>Nem toda penhora é irregular.</strong> A possibilidade de questioná-la depende da legislação aplicável, dos fatos, das provas e do momento processual.</p></aside>
              <div className="section-cta-row align-start">
                <ContactCta openForm location="process_section" className="section-contact-button">Solicitar análise da situação</ContactCta>
              </div>
            </div>
          </div>
        </section>

        <section className="section dark-section">
          <div className="container family-grid">
            <div className="family-visual" aria-hidden="true"><Home size={58} strokeWidth={1.15} /><div className="orbit orbit-one" /><div className="orbit orbit-two" /><span>Lei nº<br/><strong>8.009</strong><br/>/1990</span></div>
            <div className="family-copy">
              <p className="section-index gold">03 — BEM DE FAMÍLIA</p>
              <h2>Um único imóvel residencial pode ser penhorado?</h2>
              <p>A Lei nº 8.009/1990 estabelece, como regra, a impenhorabilidade do imóvel residencial próprio do casal ou da entidade familiar. Essa proteção busca preservar a moradia, mas <strong>não é absoluta</strong>.</p>
              <p>A própria lei prevê exceções. Entre os pontos que podem exigir análise estão a origem da obrigação, a forma de utilização do imóvel, eventual financiamento, débitos vinculados ao próprio bem e outras circunstâncias jurídicas.</p>
              <div className="principles">
                <span><CheckCircle2 size={18} />Proteção legal da moradia</span>
                <span><CheckCircle2 size={18} />Exceções expressamente previstas</span>
                <span><CheckCircle2 size={18} />Prova e contexto de cada caso</span>
              </div>
              <a className="source-link" href="https://www.planalto.gov.br/ccivil_03/leis/l8009.htm" target="_blank" rel="noreferrer">Consultar a Lei nº 8.009/1990 no Planalto <ArrowRight size={16} /></a>
              <div className="section-cta-row dark-cta-row align-start">
                <ContactCta openForm location="family_property_section" className="section-contact-button">Conversar sobre o bem de família</ContactCta>
              </div>
            </div>
          </div>
        </section>

        <section className="section risk-section">
          <div className="container">
            <div className="section-heading centered"><p className="section-index">04 — RISCO DE LEILÃO</p><h2>O que avaliar quando um imóvel está em risco de leilão?</h2><p>A proximidade de uma data de leilão exige informação organizada e leitura precisa do processo — sem conclusões antecipadas.</p></div>
            <div className="assessment-grid">
              {[
                [FileText,"Documentação","Matrícula, contrato, comprovantes e comunicações recebidas ajudam a reconstruir a situação jurídica do bem."],
                [Landmark,"Situação processual","Decisões, intimações, avaliação, edital e eventuais recursos precisam ser examinados em conjunto."],
                [CalendarClock,"Prazos aplicáveis","A forma e a data da intimação podem influenciar a contagem. Cada medida possui requisitos próprios."],
                [SearchCheck,"Análise técnica","A estratégia depende da natureza da dívida, da titularidade, do uso do imóvel e das provas disponíveis."],
              ].map(([Icon,title,text], index) => {
                const IconComponent = Icon as typeof FileText;
                return <article key={String(title)} className="assessment-item"><div><span>0{index + 1}</span><IconComponent size={25} aria-hidden="true" /></div><h3>{String(title)}</h3><p>{String(text)}</p></article>;
              })}
            </div>
            <div className="section-cta-row">
              <ContactCta openForm location="auction_risk_section" className="section-contact-button">Meu imóvel está em risco de leilão</ContactCta>
              <p>Informe a situação e siga para o WhatsApp do escritório.</p>
            </div>
          </div>
        </section>

        <section className="section about-section" id="sobre">
          <div className="container about-grid">
            <div className="about-photo"><Image src="/images/samuel-santos-upscale.jpeg" alt="Dr. Samuel Santos, advogado inscrito na OAB/SP" fill sizes="(max-width: 900px) 92vw, 40vw" className="about-image" /><span className="photo-label">Atuação profissional<br/>em Direito Civil</span></div>
            <div className="about-copy"><p className="section-index">05 — SOBRE O ADVOGADO</p><h2>Dr. Samuel Santos</h2><p className="oab-line">{siteConfig.oab}</p><p className="lead-serif">Atuação jurídica em Direito Civil, com atenção a execuções e penhoras.</p><p>Bacharel em Direito pela Universidade São Francisco, Dr. Samuel Santos conduz o atendimento a partir da análise dos documentos e do contexto de cada processo, com comunicação objetiva sobre as alternativas juridicamente cabíveis.</p><div className="credentials"><div><span>Formação</span><strong>Universidade São Francisco</strong></div><div><span>Sociedade</span><strong>{siteConfig.legalName}</strong></div></div><div className="section-cta-row align-start"><ContactCta openForm location="about_section" className="section-contact-button">Falar com o Dr. Samuel</ContactCta></div></div>
          </div>
        </section>

        <section className="section method-section" id="atuacao">
          <div className="container"><div className="section-heading split-heading"><div><p className="section-index">06 — ATENDIMENTO</p><h2>Uma condução clara, etapa por etapa.</h2></div><p>O primeiro contato serve para compreender a situação inicial. A definição de qualquer medida depende da análise jurídica dos elementos disponíveis.</p></div>
            <div className="method-flow">
              {[["01","Primeiro contato","Relato inicial objetivo, sem envio de informações sensíveis por canais abertos."],["02","Identificação da situação","Compreensão do processo, do imóvel e das comunicações já recebidas."],["03","Análise individualizada","Exame dos documentos, da fase processual e das normas aplicáveis."],["04","Orientação sobre próximos passos","Apresentação das medidas cabíveis, limites e providências necessárias."]].map(([n,title,text]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}
            </div>
            <div className="section-cta-row">
              <ContactCta openForm location="method_section" className="section-contact-button">Iniciar o primeiro contato</ContactCta>
              <p>O formulário leva diretamente ao WhatsApp após a validação.</p>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="duvidas">
          <div className="container"><div className="faq-grid"><div className="faq-intro"><p className="section-index">07 — DÚVIDAS FREQUENTES</p><h2>Informação para decisões mais conscientes.</h2><p>As respostas abaixo são gerais e não substituem a análise do processo e dos documentos do caso concreto.</p></div><div className="faq-list">{faq.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2,"0")}</span>{question}<i aria-hidden="true">+</i></summary><p>{answer}</p></details>)}</div></div><div className="section-cta-row"><ContactCta openForm location="faq_section" className="section-contact-button">Ainda tenho dúvidas sobre meu caso</ContactCta><p>Converse com o escritório para uma análise individualizada.</p></div></div>
        </section>

        <section className="contact-section" id="contato">
          <div className="container contact-grid">
            <div className="contact-copy"><p className="section-index gold">08 — CONTATO</p><h2>Seu caso exige uma análise jurídica individualizada?</h2><p>Entre em contato com o escritório para apresentar a situação inicial. O atendimento não pressupõe resultado e qualquer orientação depende da análise dos elementos do caso.</p><ContactCta openForm location="final_cta" variant="outline">Entrar em contato com o escritório</ContactCta><small>Não envie documentos sigilosos antes de receber orientação sobre o canal adequado.</small></div>
            <div className="form-card"><div className="form-card-heading"><span>Solicitação de contato</span><p>Informe apenas os dados iniciais.</p></div><ContactForm whatsappNumber={siteConfig.whatsapp} location="contact_section" /></div>
          </div>
        </section>
      </main>
      <ContactModal whatsappNumber={siteConfig.whatsapp} />
      <Footer />
    </>
  );
}

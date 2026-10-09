import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><div><span>404</span><p className="section-index">PÁGINA NÃO ENCONTRADA</p><h1>O endereço informado não está disponível.</h1><p>Retorne à página principal para acessar as informações sobre penhora de imóveis.</p><Link className="button button-gold" href="/penhora-de-imoveis">Voltar ao início</Link></div></main>;
}

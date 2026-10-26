# Landing page — Penhora de imóveis

Landing page institucional do Dr. Samuel Santos para a rota `/penhora-de-imoveis`, construída com Next.js App Router, TypeScript estrito e Tailwind CSS.

## Executar localmente

```bash
npm install
copy .env.example .env.local
npm run dev
```

Acesse `http://localhost:3000/penhora-de-imoveis`.

## Configuração

Preencha `.env.local` sem versionar dados reais:

- `NEXT_PUBLIC_SITE_URL`: origem canônica, sem barra final. Em produção, use `https://imovel.advsamuelsantos.com.br`.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: número com DDI e DDD, apenas dígitos. O projeto usa como referência o número institucional verificado, mas a titularidade e atualidade devem ser confirmadas antes da publicação.
- `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL`: URL pública `/exec` da implantação do Apps Script que grava na aba `imovel`.
- `NEXT_PUBLIC_CONTACT_EMAIL` e `NEXT_PUBLIC_OFFICE_ADDRESS`: dados institucionais opcionais.
- `NEXT_PUBLIC_GTM_ID`: permite substituir o contêiner GTM padrão (`GTM-5KHN42MZ`). Não mantenha outra instalação duplicada.

## Formulário

O mesmo formulário aparece em um modal acionado pelos CTAs e permanece visível na seção final. A validação com Zod ocorre a cada alteração; o botão permanece desabilitado até que nome, WhatsApp, situação, valor do imóvel, cidade/UF e aceite de privacidade estejam válidos. No envio, o navegador tenta registrar o lead na aba `imovel` por `sendBeacon` e redireciona imediatamente ao WhatsApp do escritório com uma mensagem identificando a origem no site e os dados preenchidos.

O código e as instruções para a planilha estão em `apps-script/Code.gs` e `apps-script/README.md`.

Todas as seções informativas terminam com um CTA que abre o modal. Os botões possuem microinterações em CSS com suporte a `prefers-reduced-motion`, mantendo as animações discretas e acessíveis.

## Mensuração e consentimento

O GTM é carregado somente após consentimento. A camada de dados usa:

- `page_service = penhora_imovel`
- `page_view`
- `cta_whatsapp_click`
- `contact_form_submit` disparado imediatamente antes do redirecionamento ao WhatsApp, sem incluir dados pessoais no evento
- `lead_qualification_confirmed` reservado para confirmação real no fluxo de atendimento; a página não o dispara automaticamente.

Os parâmetros `gclid`, `gbraid`, `wbraid` e UTMs são guardados somente após consentimento. Nenhum evento `generate_lead` é disparado em clique ou abertura do WhatsApp.

## Verificações

```bash
npm run lint
npm run typecheck
npm run build
```

## Deploy

O projeto pode ser publicado em ambiente compatível com Next.js (por exemplo, Vercel) ou em infraestrutura Node. Configure `NEXT_PUBLIC_SITE_URL` como `https://imovel.advsamuelsantos.com.br`, aponte esse domínio para o projeto e confirme que a rota canônica responde em HTTPS. A indexação é habilitada somente em builds de produção desse domínio; previews Vercel, desenvolvimento e builds com outra origem permanecem bloqueados.

A fotografia em `public/images/samuel-santos-upscale.jpeg` utiliza a versão em alta resolução fornecida para o projeto. Confirme autorização, atualidade e preferência de enquadramento antes da publicação.

## Conteúdo e referências

O conteúdo educativo foi redigido com base geral na Lei nº 8.009/1990 e no Código de Processo Civil. A comunicação foi mantida informativa e sóbria, seguindo a orientação do Provimento CFOAB nº 205/2021. O material não substitui análise jurídica e deve ser revisado pelo advogado responsável antes de ir ao ar.

Consulte `CHECKLIST-PUBLICACAO.md` para as pendências externas.

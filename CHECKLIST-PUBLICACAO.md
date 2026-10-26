# Checklist de publicação

## Validação institucional

- [ ] Confirmar nome profissional, OAB, razão social, CNPJ e formação.
- [ ] Confirmar que a fotografia é atual e possui autorização de uso.
- [ ] Revisar todo o conteúdo jurídico pelo advogado responsável.
- [ ] Validar as políticas de privacidade e cookies com o responsável pelo tratamento.
- [ ] Preencher e validar e-mail, endereço (se desejado) e número oficial do WhatsApp.

## Integrações

- [ ] Confirmar que o número institucional `(11) 94759-5005` continua sendo o WhatsApp correto do escritório.
- [ ] Testar o preenchimento e o redirecionamento do formulário para o WhatsApp em dispositivo real.
- [ ] Publicar `apps-script/Code.gs` como Web App e configurar a URL `/exec` em `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL`.
- [ ] Fazer um envio real e confirmar as colunas na aba `imovel` antes de anunciar a página.
- [ ] Configurar GTM apenas se houver contêiner real e revisar o consentimento.
- [ ] Configurar no atendimento o evento `lead_qualification_confirmed` somente após confirmação real, sem dados jurídicos sensíveis.
- [ ] Verificar que não existe outra tag GTM/GA4/Ads duplicada no domínio.

## SEO e domínio

- [ ] Confirmar que a produção usa `https://imovel.advsamuelsantos.com.br` e que previews/staging permanecem bloqueados para indexação.
- [ ] Confirmar canonical, sitemap, robots e OG image no domínio final.
- [ ] Vincular Search Console e validar a propriedade do domínio.
- [ ] Conferir redirecionamentos HTTPS e variações com/sem `www`.

## Qualidade final

- [ ] Testar formulário e WhatsApp em dispositivo real.
- [ ] Revisar navegação por teclado, leitor de tela e contraste.
- [ ] Verificar layout em celulares, tablets e desktops reais.
- [ ] Executar Lighthouse em produção e revisar LCP, CLS e INP.
- [ ] Fazer teste final das páginas de privacidade, cookies e 404.

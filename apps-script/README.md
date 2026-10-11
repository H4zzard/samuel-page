# Integração com as abas `imovel` e `bloqueio_conta`

1. Abra a planilha que receberá os leads.
2. As abas `imovel` e `bloqueio_conta` são criadas automaticamente no primeiro envio válido de cada landing page.
3. Na planilha, acesse **Extensões → Apps Script**.
4. Substitua o conteúdo de `Code.gs` pelo arquivo deste diretório e salve.
5. Clique em **Implantar → Nova implantação**.
6. Selecione **Aplicativo da Web**.
7. Em **Executar como**, escolha **Eu**.
8. Em **Quem pode acessar**, escolha a opção que permita acesso anônimo/qualquer pessoa, pois os visitantes do site não estarão autenticados na sua conta Google.
9. Autorize o script e conclua a implantação.
10. Copie a URL pública terminada em `/exec` e envie-a nesta conversa. Não envie a URL de teste terminada em `/dev`.

Depois que a URL for configurada como `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL`, cada envio tentará registrar o lead na aba correspondente por `sendBeacon` e redirecionará imediatamente o visitante ao WhatsApp.

As colunas são criadas na primeira linha e cada valor é salvo em uma célula separada. A página de bloqueio de conta não solicita valor, dados bancários, CPF ou número de processo; por isso, a coluna de valor do imóvel permanece vazia nessa aba. O código aplica trava contra gravações simultâneas, valida campos obrigatórios e neutraliza valores que poderiam ser interpretados como fórmulas pela planilha.

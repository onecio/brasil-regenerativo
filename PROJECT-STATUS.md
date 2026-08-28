# PROJECT-STATUS — Brasil Regenerativo / Carbono para Todos

**Orquestrador:** Sentinel (perfil onecio) · **PI:** Optimus
**Início:** 2026-08-27 · **Estado:** PUBLICADO E VALIDADO EM PRODUÇÃO
**URL:** https://onecio.github.io/brasil-regenerativo/

> Formato: `[✓]` concluído · `[▶]` em andamento · `[ ]` pendente · `[✗]` bloqueado

## NÓ A — PESQUISA
- [✓] R1 Mercado regulado BR (22 itens verificados) — SBCE, CVM 223, B3, Fundo Clima, PSA
- [✓] R2 Mercado voluntário + críticas (10 itens) — NatureComms <16%, Kariba, CLPI Ka'apor, custos Verra
- [✓] R3 Dados Brasil (15 itens) — SEEG 2,145 Gt, PRODES, Censo Agro, BEN 2025, SINISA, ABREMA
- [✓] R4 Financiamento/experiências (9 itens) — Suruí, COOPESMA, Ant Forest, Sicoob
- [✓] Consolidação em src/data + registro de 54 fontes (verificação de URL automatizada)

## NÓ B — ARQUITETURA / DESIGN / DEV
- [✓] Identidade: Brasil Regenerativo — Carbono para Todos (paleta, tipografia, logo SVG)
- [✓] Scaffold Vite + React 18 + TS strict + recharts + HashRouter
- [✓] Home (hero, fluxo emissões→renda, quem participa, trilhas, princípio, CTA)
- [✓] O Problema · Barreira da escala · Justiça climática
- [✓] Regulado × Voluntário (SBCE verificado) · Críticas fundamentadas · 1 tonelada
- [✓] Simuladores: pegada · fazenda virtual · biodigestor · coop solar · incêndios
- [✓] Simuladores: cidade regenerativa · cooperativa climática · distribuição de receita · R$10bi · banco climático · IDC · comparador
- [✓] App emulator (Carbon Wallet) · smartwatch · marketplace · privacidade · jogo
- [✓] Mapa Brasil (27 UFs, CC-BY-4.0) · Painel Brasil (dados verificados) · economia circular · mina verde · rios · resíduos (estatísticas ABREMA)
- [✓] Testes unitários 10/10 + build exit 0
- [✓] Acessibilidade estrutural (WCAG 2.2 AA alvo) + responsividade testada (mobile menu)

## NÓ C — CYBER
- [✓] npm audit: 0 vulnerabilidades (upgrades react-router 7.18.2, vitest 4)
- [✓] Varredura de padrões perigosos: 0 XSS/eval/innerHTML/secrets
- [✓] Meta CSP adicionada (GH Pages sem headers)
- [✓] SECURITY-REPORT.md (0 Críticas/Altas/Médias abertas → LIBERADO)

## DOCUMENTAÇÃO
- [✓] README · ARCHITECTURE · RESEARCH · DATA-SOURCES · METHODOLOGY
- [✓] SECURITY · SECURITY-REPORT · PRIVACY · ACCESSIBILITY · DEPLOYMENT · CONTRIBUTING

## PUBLICAÇÃO
- [✓] GitHub repo onecio/brasil-regenerativo (público) + branch gh-pages
- [✓] Teste de produção: 29 rotas navegadas, interações (sliders, wallet/LocalStorage, mapa, gráficos), zero erros de console/CSP
- [✓] Refinamentos pós-produção (cache CDN confirmado; dados verificados no ar)

## Pendências do PI (decisões)
- [ ] Aprovar identidade final (implementada: Brasil Regenerativo — Carbono para Todos)
- [ ] Opcional: `gh auth refresh -s workflow` para ativar GitHub Actions (workflow pronto em .github/workflows/deploy.yml, fora do git por escopo de token)
- [ ] Opcional: PWA/service worker (com revisão de segurança dedicada)

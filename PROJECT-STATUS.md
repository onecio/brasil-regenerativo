# PROJECT-STATUS — Brasil Regenerativo / Carbono para Todos

**Orquestrador:** Sentinel (perfil onecio) · **PI:** Optimus
**Início:** 2026-08-27 · **Fase corrente:** PESQUISA + SCAFFOLD

> Formato: `[✓]` concluído · `[▶]` em andamento · `[ ]` pendente · `[✗]` bloqueado
> Regra: nunca marcar `[✓]` sem verificação real (build passou, URL resolveu, teste rodou).

## Grafo de execução

```text
PESQUISA → MODELO CONCEITUAL → UX/UI → DESENVOLVIMENTO → TESTES → CYBER → FIXES → VALIDAÇÃO → GITHUB → PAGES → TESTE PRODUÇÃO → REFINAR
```

## Status por nó

### NÓ A — PESQUISA
- [▶] R1 Mercado regulado BR (SBCE, CVM, BNDES) — subagente sa-0-6d2a81e5
- [▶] R2 Mercado voluntário + críticas + justiça climática — sa-1-b461c077
- [▶] R3 Dados Brasil (SEEG, IBGE, ABRELPE, ONS) — sa-2-88eb3b80
- [▶] R4 Financiamento/PSA/cooperativas/experiências — sa-3-458b2da3
- [ ] Consolidação: research/findings → src/data (registro de fontes)

### NÓ B — ARQUITETURA / DESIGN / DEV
- [▶] Identidade visual + design system
- [▶] Scaffold Vite + React + TS
- [ ] Home (hero, fluxo emissões→renda, quem participa)
- [ ] O Problema · Barreira da escala · Justiça climática
- [ ] Regulado × Voluntário · 1 tonelada · Como nasce um crédito
- [ ] Simuladores: pegada · fazenda virtual · biodigestor · coop solar · incêndios
- [ ] Simuladores: cidade regenerativa · cooperativa climática · distribuição de receita · R$10bi · banco climático · IDC
- [ ] App emulator (Carbon Wallet) · smartwatch · marketplace · privacidade
- [ ] Mapa Brasil · Painel Brasil · economia circular · mina verde · rios · resíduos
- [ ] Testes unitários (calculadoras) + build
- [ ] Acessibilidade (WCAG 2.2 AA) + responsividade

### NÓ C — CYBER
- [ ] npm audit + revisão de dependências/supply chain
- [ ] Revisão XSS/DOM XSS, CSP, SRI, CORS, LocalStorage, SW, formulários
- [ ] SECURITY-REPORT.md (Crítico/Alto/Médio/Baixo/Informativo)
- [ ] Bloqueio: nenhuma vulnerabilidade Crítica/Alta conhecida antes do deploy

### DOCUMENTAÇÃO
- [ ] README · ARCHITECTURE · RESEARCH · DATA-SOURCES · METHODOLOGY
- [ ] SECURITY · SECURITY-REPORT · PRIVACY · ACCESSIBILITY · DEPLOYMENT · CONTRIBUTING

### PUBLICAÇÃO
- [ ] GitHub repo + Actions + Pages
- [ ] Teste de produção (navegação real da URL publicada)
- [ ] Refinamentos pós-produção

## Pendências de decisão do PI
- [ ] Aprovar identidade (proposta: **Brasil Regenerativo — Carbono para Todos**)
- [ ] Aprovar visibilidade do repositório (proposta: público, necessário p/ GitHub Pages gratuito)

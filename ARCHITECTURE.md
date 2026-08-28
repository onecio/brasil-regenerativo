# ARCHITECTURE — Brasil Regenerativo

## Visão geral

SPA estática (zero backend) otimizada para GitHub Pages. Todo o conteúdo é empacotado no
bundle; o progresso do usuário (Carbon Wallet) vive no LocalStorage com prefixo próprio e
limite de tamanho.

## Stack

- **React 18 + TypeScript (strict) + Vite 6** — build e DX.
- **react-router-dom (HashRouter)** — rotas seguras em hospedagem estática (sem rewrites).
- **recharts** — gráficos do Painel Brasil (SVG, acessível por tooltips e aria).
- **Vitest** — testes dos motores de cálculo (`src/utils/*.test.ts`).
- CSS custom properties (design system próprio) — sem framework de UI.

## Estrutura

```
src/
  main.tsx            — bootstrap (HashRouter + StrictMode)
  App.tsx             — rotas (36)
  components/         — TopBar, Footer, NatureTag, SourceRef, FlowDiagram, Sim (sliders/chips/cards), SectionHead
  pages/              — 1 rota por módulo do briefing
  data/               — sources.ts (registro de fontes), participacao.ts, brazilMap.ts (CC-BY-4.0), painel.ts
  utils/              — carbon.ts (motores), points.ts (wallet), storage.ts (LocalStorage seguro), format.ts
  styles/global.css   — design system (paleta, tipografia, tags, simuladores, app emulator)
```

## Padrões transversais

1. **Etiqueta de natureza (§51)** — `NatureTag`: DADO OBSERVADO / ESTIMATIVA / CENÁRIO /
   PROPOSTA / CONCEITO EXPERIMENTAL. Obrigatória em todo conteúdo factual-hipotético.
2. **Sistema de fontes** — `SourceRef` renderiza `[FONTE nnn]` com tooltip e âncora para
   `/fontes#fnnn`; `SourceList` agrega as fontes de uma seção. Fonte não verificada aparece
   como pendente na página Fontes.
3. **Motores de cálculo declarativos** — `utils/carbon.ts` concentra fatores com `src` (ID da
   fonte) e documentação; UI apenas apresenta.
4. **Simuladores** — padrão `Sim` (controles à esquerda / resultados à direita), premissas
   sempre visíveis, cenários conservador/referência/otimista.
5. **Integridade financeira** — toda receita é "potencial"/"cenário"; preços parametrizáveis.
6. **Integridade climática** — "redução estimada ≠ crédito certificado" em todos os pontos de
   contato (ex.: `details.callout--danger` em Tonelada e Biodigestor).

## Persistência

- `br-regenerativo:wallet-v1` — pontos, histórico (máx. 200), streak. `storage.ts` usa
  try/catch + validação de tamanho (64 KB) e nunca guarda dados sensíveis.

## Acessibilidade

WCAG 2.2 AA (alvo): skip-link, landmarks (`header/main/footer`), foco visível
(`:focus-visible`), `aria-pressed` em chips, `aria-label` em progressbars/mapa,
`prefers-reduced-motion`, contraste AA, navegação por teclado no mapa (Tab+Enter).

## Performance

- `base: './'`, manualChunks (vendor/charts), sem sourcemaps em produção.
- Chunk de charts carregado apenas onde recharts é usado? Não — atualmente no bundle
  principal (melhoria futura: `React.lazy` no Painel). Meta Lighthouse: Perf ≥90.

## Riscos conhecidos / melhorias futuras

- `charts` (recharts ~111 KB gzip) no bundle inicial → lazy-load do Painel.
- PWA (manifest + SW) planejado como refinamento (com revisão de segurança do SW).
- Mapas de bioma por polígono real (IBGE/MapBiomas) — fora do escopo v1 (decisão registrada).

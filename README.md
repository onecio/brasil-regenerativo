# Brasil Regenerativo — Carbono para Todos

Plataforma web demonstrativa de **economia climática democratizada**: justiça climática,
créditos de carbono inclusivos, economia circular e prosperidade climática para o Brasil.

> Demonstração educacional e de políticas públicas — **não é oferta de créditos de carbono**
> nem promessa de renda. Cada simulação declara sua natureza: dado observado, estimativa,
> cenário, proposta ou conceito experimental.

## O que a plataforma faz

- **Diagnóstico**: a economia do clima é democrática? Quem participa, quem fica de fora.
- **Simuladores**: pegada de carbono, fazenda virtual, biodigestor popular, cooperativa
  solar, cidade regenerativa, cooperativa climática, distribuição de receita, R$ 10 bi,
  banco climático, IDC.
- **Experiências**: app Carbon Wallet (Pontos Climáticos), smartwatch, jogo de cenários,
  marketplace fictício.
- **Dados**: Painel Brasil com fontes citadas; mapa interativo por estado.
- **Educação climática**: como nasce um crédito, regulado × voluntário, 1 tonelada de CO₂.

## Stack

React 18 · TypeScript · Vite · recharts · HashRouter · GitHub Pages. Dados locais em
TypeScript/JSON, progresso em LocalStorage, zero backend, zero segredos no frontend.

## Estrutura

```
/src
  /components  → UI compartilhada (tags de natureza, simuladores, fluxos)
  /pages       → 36 rotas (diagnóstico, simuladores, experiências, dados)
  /data        → fontes, participantes, mapa, dados do painel
  /utils       → motores de cálculo (carbon, points, storage) + testes
  /styles      → design system
/docs          → documentação (metodologia, segurança, acessibilidade)
/research      → dossiês de pesquisa com fontes verificadas
```

## Rodar localmente

```bash
npm install
npm run dev      # dev server
npm run test     # vitest (calculadoras)
npm run build    # tsc + vite build → dist/
npm run preview  # serve dist/
```

## Publicação

GitHub Actions (`.github/workflows/deploy.yml`) roda testes + build e publica em GitHub Pages.
URL: <https://onecio.github.io/brasil-regenerativo/>

## Documentação

[Metodologia](docs/methodology/METHODOLOGY.md) · [Fontes](src/data/sources.ts) ·
[Segurança](docs/security/SECURITY-REPORT.md) · [Privacidade](docs/methodology/PRIVACY.md) ·
[Acessibilidade](docs/methodology/ACCESSIBILITY.md)

## Licença

MIT (código). Dados cartográficos de estados: @svg-maps/brazil, CC-BY-4.0.
Conteúdo factual citado com fontes — ver página **Fontes e metodologia** na plataforma.

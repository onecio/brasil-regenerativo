# CONTRIBUTING — Contribuindo

Obrigado por considerar contribuir com o Brasil Regenerativo. Este é um projeto
educacional e de políticas públicas — rigor e honestidade vêm antes de tudo.

## Regras de integridade

1. **Nunca adicione dados sem fonte.** Todo número factual precisa de `[FONTE nnn]` com URL
   que resolva. Dado não verificado entra como `[NÃO VERIFICADO]` — e não como fato.
2. **Respeite as etiquetas de natureza** (DADO / ESTIMATIVA / CENÁRIO / PROPOSTA /
   CONCEITO EXPERIMENTAL). Não venda cenário como promessa, nem redução estimada como
   crédito certificado.
3. **Sem greenwashing.** Críticas fundamentadas ao mercado de carbono são bem-vindas.
4. **Sem segredos.** Nunca commite chaves, tokens ou credenciais.

## Fluxo

1. Fork + branch (`feat/nome`).
2. Rode `npm run test` e `npm run build` — devem passar.
3. PR com descrição clara: o que muda, quais fontes, que etiquetas usa.
4. Mantenha commits semânticos (`feat:`, `fix:`, `docs:`, `data:`).

## Estrutura para novas seções

- Página em `src/pages/`, rota em `src/App.tsx`.
- Dados novos em `src/data/`, fontes em `src/data/sources.ts`.
- Cálculos em `src/utils/carbon.ts` + teste em `carbon.test.ts`.
- Links no rodapé (`src/components/Footer.tsx`) e trilhas na Home.

## Licença

MIT — código. Dados cartográficos de estados: CC-BY-4.0 (@svg-maps/brazil). Conteúdo
factual citado com fontes.

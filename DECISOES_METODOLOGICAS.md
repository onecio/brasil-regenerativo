# DECISÕES METODOLÓGICAS — Brasil Regenerativo / Carbono para Todos

Trilha de auditoria do projeto. Cada linha: data · decisão · motivo · alternativas · fonte.

## 2026-08-27

1. **Escopo definido como plataforma web demonstrativa (protótipo), não artigo acadêmico.** Motivo: o pedido do PI é uma demonstração funcional de ecossistema de economia climática democratizada. As regras de integridade científica da Diretriz de Governança (DIRETRIZ_GOVERNANCA.md) são aplicadas por analogia: nada de dados inventados; distinção obrigatória entre dado observado / estimativa / cenário / proposta / conceito experimental; toda informação factual com fonte verificada (URL que resolve + data de acesso). Alternativas: tratar como fase do projeto OSF — descartado (naturezas diferentes).
2. **Orquestração: subagentes delegate_task como "Nó Pesquisador".** Motivo: execução coordenada e verificável dentro da sessão; a frota bot-mode (pesquisador/dev-senior/cyber) continua disponível, mas handoff via `hermes -p` é assíncrono e de coleta trabalhosa; subagentes entregam arquivos em disco (verificáveis). Justificativa registrada conforme §4 da Diretriz.
3. **Identidade: "Brasil Regenerativo — Carbono para Todos".** Motivo: alinha com o CTA final do briefing ("Explore o Brasil Regenerativo"), nome marcante e não burocrático. Alternativas consideradas: Carbono para Todos, Brasil Carbono Cidadão, Clima que Gera Renda, Economia Climática Popular, Carbono Inclusivo.
4. **Stack: React 18 + TypeScript + Vite + recharts + HashRouter, dados locais em JSON/TS, LocalStorage para progresso.** Motivo: GitHub Pages (estático, sem backend), sem segredos no frontend, bundle leve, PWA viável.
5. **Mapa: estados via @svg-maps/brazil; biomas como cards com dados citados (sem polígonos aproximados).** Motivo: não fabricar geografia; estados têm dados públicos (DETER/SEEG por UF); sobreposição de biomas em polígonos não verificados seria imprecisa.
6. **Preços de carbono sempre parametrizáveis, 3 cenários (conservador/referência/otimista).** Motivo: regra de integridade financeira do briefing (§52).
7. **Toda simulação com etiqueta de natureza:** DADO OBSERVADO / ESTIMATIVA / CENÁRIO / PROPOSTA / CONCEITO EXPERIMENTAL (§51).

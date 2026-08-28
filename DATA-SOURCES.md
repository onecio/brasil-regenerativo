# DATA-SOURCES — Fontes de dados da plataforma

Registro centralizado de fontes usado pela aplicação (`src/data/sources.ts`) e pelos
dossiês de pesquisa (`research/findings/`). Cada item tem: instituição, título, ano, URL,
data de acesso, informação utilizada e nível de confiabilidade (oficial / acadêmica /
setor / mídia). URLs marcadas `✓` foram verificadas na data de acesso; demais aguardam a
rotina de verificação automática (ciclo de validação).

## Fontes oficiais (Brasil)

| ID | Instituição | Documento | Ano | URL | Status |
|----|-------------|-----------|-----|-----|--------|
| 1 | Presidência da República | Lei 15.042/2024 — SBCE | 2024 | planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/L15042.htm | ✓ |
| 2 | Presidência da República | Lei 14.119/2021 — PNPSA | 2021 | planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/L14119.htm | ✓ |
| 30 | Presidência da República | Decreto 13.018/2026 — regulamenta PNPSA | 2026 | planalto.gov.br/ccivil_03/_ato2023-2026/2026/decreto/d13018.htm | ✓ |
| 31 | CVM | Resolução CVM 223/2024 (OCPC 10) + FAQ mercado regulado | 2024/25 | conteudo.cvm.gov.br/legislacao/resolucoes/anexos/200/resol223.htm | ✓ |
| 32 | B3 | Piloto B3+ACX registro de créditos de carbono | 2025 | b3.com.br (notícia 26/09/2025) | ✓ |
| 33 | MMA/BNDES | Relatório Fundo Clima 2025 | 2025 | gov.br/mma (PDF) | ✓ |
| 34 | BNDES | Fundo Amazônia 2025 (>R$ 2 bi) | 2025 | agenciadenoticias.bndes.gov.br | ✓ |
| 35 | IPEA | ICMS Ecológico → IBS Ecológico (PPP 71) | 2025 | ipea.gov.br/ppp | ✓ |
| 36 | MMA | Floresta+ Amazônia — PSA no Amapá | 2026 | gov.br/mma (notícia 10/03/2026) | ✓ |
| 5 | Observatório do Clima/SEEG | Emissões por setor | — | seeg.eco.br | pendente |
| 6 | INPE | PRODES — desmatamento | — | obt.inpe.br | pendente |
| 7 | IBGE | Censo Agropecuário 2017 | 2019 | ibge.gov.br | pendente |
| 8 | ABRELPE | Panorama resíduos | — | abrelpe.org.br | pendente |
| 9 | ONS/EPE/MME | Matriz elétrica | — | gov.br/mme | pendente |
| 10 | Presidência | Lei 14.300/2022 (GD) | 2022 | planalto.gov.br | pendente |
| 11 | BNDES | Fundo Amazônia — página | — | bndes.gov.br | pendente |

## Padrões e organizações internacionais

| ID | Instituição | Documento | URL | Status |
|----|-------------|-----------|-----|--------|
| 13 | ICVCM | Core Carbon Principles | icvcm.org/core-carbon-principles | pendente |
| 14 | Verra | VCS Program | verra.org/programs/verified-carbon-standard | pendente |
| 15 | Gold Standard | GS for the Global Goals | goldstandard.org | pendente |
| 16 | ART | ART/TREES | artredd.com | pendente |
| 17 | Plan Vivo | Standards | planvivo.org | pendente |
| 18 | Banco Mundial | State and Trends of Carbon Pricing | worldbank.org (publication) | pendente |
| 19 | IPCC | AR6 Synthesis Report | ipcc.ch/report/ar6/syr | pendente |
| 20 | UNFCCC | Acordo de Paris (Art. 6) | unfccc.int | pendente |

## Fatores de emissão (estimativas educacionais)

| ID | Fonte | Uso | Status |
|----|-------|-----|--------|
| 21 | MCTI/INMETRO | kg CO₂e/km por modo de transporte | pendente |
| 22 | EPE/MME | Fator médio do SIN (t CO₂/MWh) | pendente |
| 23 | Scarborough et al. 2014 | Dieta (kg CO₂e/dia) | pendente |
| 24 | EPA/literatura | Resíduos e reciclagem | pendente |
| 25 | FAO/Embrapa | Biogás por animal | pendente |
| 26 | EPE/INPE/ABSOLAR | Produtividade e custo solar | pendente |
| 27 | ANEEL | Tarifa média residencial | pendente |
| 28 | Banco Mundial | Preços de carbono (cenários) | pendente |
| 29 | INPE/TerraBrasilis | Emissões de incêndios | pendente |

## Dossiês de pesquisa

- `research/findings/regulado_brasil.md` — dossiê completo do SBCE (22 itens, ✓).
- `research/findings/voluntario_criticas.md` — críticas fundamentadas (10 itens, ✓).
- `research/findings/dados_brasil.md` — dados quantitativos (15 itens, ✓).
- `research/findings/financiamento_experiencias.md` — experiências (9 itens, ✓).

/**
 * DADOS DO PAINEL BRASIL — valores verificados nas fontes primárias
 * (SEEG 13ª ed., PRODES NT 2024, IBGE Censo Agro 2017, BEN 2025/EPE,
 * SINISA 2024, Planares/MMA, ABREMA 2024). Fonte por série: ver src/data/sources.ts.
 */

export interface SerieDado {
  label: string;
  value: number;
  unidade: string;
  ano: number | string;
  fonteId: number;
  verificado: boolean;
  nota?: string;
}

export const EMISSOES_POR_SETOR: (SerieDado & { pct: number })[] = [
  { label: 'Mudança de uso da terra e florestas', value: 0.9, pct: 42, unidade: 'Gt CO₂e', ano: 2024, fonteId: 37, verificado: true },
  { label: 'Agropecuária', value: 0.62, pct: 29, unidade: 'Gt CO₂e', ano: 2024, fonteId: 37, verificado: true },
  { label: 'Energia', value: 0.43, pct: 20, unidade: 'Gt CO₂e', ano: 2024, fonteId: 37, verificado: true },
  { label: 'Resíduos', value: 0.11, pct: 5, unidade: 'Gt CO₂e', ano: 2024, fonteId: 37, verificado: true },
  { label: 'Processos industriais', value: 0.09, pct: 4, unidade: 'Gt CO₂e', ano: 2024, fonteId: 37, verificado: true },
];

export const DESMATAMENTO_AMAZONIA: { ano: number; km2: number; fonteId: number; verificado: boolean }[] = [
  { ano: 2019, km2: 10129, fonteId: 38, verificado: true },
  { ano: 2020, km2: 10851, fonteId: 38, verificado: true },
  { ano: 2021, km2: 13038, fonteId: 38, verificado: true },
  { ano: 2022, km2: 11594, fonteId: 38, verificado: true },
  { ano: 2023, km2: 9064, fonteId: 38, verificado: true },
  { ano: 2024, km2: 6288, fonteId: 38, verificado: true },
];

export const MATRIZ_ELETRICA: { label: string; value: number; fonteId: number; verificado: boolean }[] = [
  { label: 'Hidráulica', value: 56.1, fonteId: 40, verificado: true },
  { label: 'Eólica', value: 14.3, fonteId: 40, verificado: true },
  { label: 'Solar FV', value: 9.4, fonteId: 40, verificado: true },
  { label: 'Biomassa', value: 7.0, fonteId: 40, verificado: true },
  { label: 'Gás natural', value: 8.0, fonteId: 40, verificado: true },
  { label: 'Outros (inclui fósseis)', value: 5.2, fonteId: 40, verificado: true },
];

export const INDICADORES: SerieDado[] = [
  { label: 'Estabelecimentos da agricultura familiar', value: 3.897, unidade: 'milhões (77% do total)', ano: 2017, fonteId: 39, verificado: true },
  { label: 'Área da agricultura familiar', value: 80.9, unidade: 'milhões de ha (23% da área)', ano: 2017, fonteId: 39, verificado: true },
  { label: 'Esgoto tratado (referido à água consumida)', value: 49.4, unidade: '%', ano: 2023, fonteId: 41, verificado: true },
  { label: 'Reciclagem de resíduos secos', value: 8, unidade: '% (6,7 Mt/ano)', ano: 2023, fonteId: 43, verificado: true },
  { label: 'Renováveis na matriz elétrica', value: 88.2, unidade: '%', ano: 2024, fonteId: 40, verificado: true },
  { label: 'Emissões brutas totais (Brasil)', value: 2.145, unidade: 'Gt CO₂e', ano: 2024, fonteId: 37, verificado: true },
];

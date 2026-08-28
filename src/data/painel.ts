/**
 * DADOS DO PAINEL BRASIL
 * Cada série tem `verificado` — valores marcados `false` são PLACEHOLDERS
 * aguardando verificação na fonte primária (SEEG, INPE, ONS, SNIS, ABRELPE...).
 * NUNCA exibir como fato um valor não verificado: o componente Painel mostra
 * selo "verificação pendente" até a confirmação.
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
  { label: 'Mudança de uso da terra e florestas', value: 1.0, pct: 44, unidade: 'Gt CO₂e', ano: 2023, fonteId: 5, verificado: false },
  { label: 'Agropecuária', value: 0.6, pct: 27, unidade: 'Gt CO₂e', ano: 2023, fonteId: 5, verificado: false },
  { label: 'Energia', value: 0.4, pct: 18, unidade: 'Gt CO₂e', ano: 2023, fonteId: 5, verificado: false },
  { label: 'Processos industriais', value: 0.14, pct: 6, unidade: 'Gt CO₂e', ano: 2023, fonteId: 5, verificado: false },
  { label: 'Resíduos', value: 0.11, pct: 5, unidade: 'Gt CO₂e', ano: 2023, fonteId: 5, verificado: false },
];

export const DESMATAMENTO_AMAZONIA: { ano: number; km2: number; fonteId: number; verificado: boolean }[] = [
  { ano: 2019, km2: 10129, fonteId: 6, verificado: false },
  { ano: 2020, km2: 10851, fonteId: 6, verificado: false },
  { ano: 2021, km2: 13038, fonteId: 6, verificado: false },
  { ano: 2022, km2: 11594, fonteId: 6, verificado: false },
  { ano: 2023, km2: 9001, fonteId: 6, verificado: false },
  { ano: 2024, km2: 6288, fonteId: 6, verificado: false },
];

export const MATRIZ_ELETRICA: { label: string; value: number; fonteId: number; verificado: boolean }[] = [
  { label: 'Hidráulica', value: 60, fonteId: 9, verificado: false },
  { label: 'Eólica', value: 15, fonteId: 9, verificado: false },
  { label: 'Solar', value: 7, fonteId: 9, verificado: false },
  { label: 'Biomassa', value: 7, fonteId: 9, verificado: false },
  { label: 'Gás natural', value: 8, fonteId: 9, verificado: false },
  { label: 'Outros fósseis', value: 3, fonteId: 9, verificado: false },
];

export const INDICADORES: SerieDado[] = [
  { label: 'Estabelecimentos da agricultura familiar', value: 5.07, unidade: 'milhões (77% do total)', ano: 2017, fonteId: 7, verificado: false },
  { label: 'Área da agricultura familiar', value: 80.9, unidade: 'milhões de ha (23% da área)', ano: 2017, fonteId: 7, verificado: false },
  { label: 'População com coleta de esgoto', value: 56, unidade: '%', ano: 2023, fonteId: 22, verificado: false },
  { label: 'Resíduos sólidos urbanos reciclados', value: 4, unidade: '% (estimativa setorial)', ano: 2023, fonteId: 8, verificado: false },
  { label: 'Renováveis na matriz elétrica', value: 89, unidade: '%', ano: 2024, fonteId: 9, verificado: false },
];

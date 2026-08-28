/**
 * MOTOR DE CÁLCULO — Brasil Regenerativo
 * --------------------------------------
 * Todos os fatores são ESTIMATIVAS educacionais com fonte declarada.
 * Nenhum valor aqui representa medição nem crédito certificado.
 * Fontes referenciadas por ID — ver src/data/sources.ts e a página /fontes.
 */

// GWP CH4 (AR5, IPCC 2014) — [FONTE 004]
export const GWP_CH4 = 28;

export interface FatorEmissao {
  id: number; // id da fonte
  descricao: string;
}

/* ---------------- MOBILIDADE (kg CO2e por km ou por pass-km) ---------------- */
export const MOBILIDADE = {
  carro_gasolina: { kg: 0.18, src: 21 },
  carro_etanol: { kg: 0.11, src: 21 },
  carro_diesel: { kg: 0.19, src: 21 },
  moto: { kg: 0.085, src: 21 },
  onibus: { kg: 0.10, src: 21 }, // por passageiro-km
  metro: { kg: 0.028, src: 22 }, // por passageiro-km (matriz elétrica brasileira)
  trem: { kg: 0.04, src: 21 },
  aviao: { kg: 0.18, src: 21 }, // doméstico, por passageiro-km
  bike: { kg: 0, src: 21 },
  caminhada: { kg: 0, src: 21 },
} as const;

/* ---------------- ENERGIA (t CO2e por MWh consumido) ---------------- */
// Fator médio do SIN (sistema elétrico brasileiro) — [FONTE 022]
export const FATOR_GRID_SIN = 0.10; // t CO2e/MWh (estimativa conservadora pós-2020)

/* ---------------- ALIMENTAÇÃO (kg CO2e por dia, Scarborough et al. 2014) [FONTE 023] ---------------- */
export const DIETA = {
  onivora_alta: { kgDia: 3.3, src: 23 },
  onivora: { kgDia: 2.5, src: 23 },
  onivora_baixa: { kgDia: 2.0, src: 23 },
  vegetariana: { kgDia: 1.7, src: 23 },
  vegana: { kgDia: 1.5, src: 23 },
} as const;

/* ---------------- RESÍDUOS (kg CO2e por kg de material) [FONTE 024] ---------------- */
export const RESIDUOS = {
  aterro_organico: { kg: 0.5, src: 24 }, // CH4 de aterro, por kg de orgânico
  reciclagem_aluminio: { kg: 9.0, src: 24 }, // emissões evitadas por kg reciclado
  reciclagem_papel: { kg: 1.8, src: 24 },
  reciclagem_plastico: { kg: 2.5, src: 24 },
  reciclagem_vidro: { kg: 0.6, src: 24 },
  reciclagem_aco: { kg: 1.6, src: 24 },
  compostagem: { kg: 0.5, src: 24 }, // evitadas em relação ao aterro, por kg de orgânico
} as const;

/* ---------------- PEGADA DE CARBONO ---------------- */

export interface PegadaInput {
  carroKmAno: number;
  carroTipo: keyof typeof MOBILIDADE | 'carro_gasolina';
  motoKmAno: number;
  onibusKmAno: number;
  metroKmAno: number;
  aviaoKmAno: number;
  bikeKmAno: number;
  kWhMes: number;
  temSolar: boolean;
  dieta: keyof typeof DIETA;
  kgOrganicoAterro: number; // kg/semana enviado ao aterro
  kgRecicladoMes: number;
  kgRoupasAno: number;
  kgEletronicosAno: number;
}

export function calcPegada(i: PegadaInput) {
  const m = MOBILIDADE;
  const carro = i.carroKmAno * m[i.carroTipo].kg;
  const moto = i.motoKmAno * m.moto.kg;
  const onibus = i.onibusKmAno * m.onibus.kg;
  const metro = i.metroKmAno * m.metro.kg;
  const aviao = i.aviaoKmAno * m.aviao.kg;
  const bike = 0;

  const energiaAnual = i.kWhMes * 12; // kWh
  const fatorE = i.temSolar ? FATOR_GRID_SIN * 0.3 : FATOR_GRID_SIN;
  const energia = (energiaAnual / 1000) * fatorE * 1000; // kg CO2e/ano

  const dieta = DIETA[i.dieta].kgDia * 365;
  const residuos = i.kgOrganicoAterro * 52 * RESIDUOS.aterro_organico.kg;
  const reciclagem = -(i.kgRecicladoMes * 12 * RESIDUOS.reciclagem_papel.kg * 0.5); // crédito educacional parcial
  const consumo = i.kgRoupasAno * 10 + i.kgEletronicosAno * 12; // fatores agregados educacionais

  const total = carro + moto + onibus + metro + aviao + bike + energia + dieta + residuos + reciclagem + consumo;

  return {
    mobilidade: carro + moto + onibus + metro + aviao,
    energia,
    dieta,
    residuos: residuos + reciclagem,
    consumo,
    total: Math.max(total, 0),
  };
}

/* ---------------- BIODIGESTOR ---------------- */
// Potencial de biogás por animal por dia (m³) — faixas conservadoras [FONTE 025]
export const BIOGAS_POR_ANIMAL: Record<string, { m3Dia: number; src: number; label: string }> = {
  bovino: { m3Dia: 0.40, src: 25, label: 'Bovino de leite' },
  suino: { m3Dia: 0.08, src: 25, label: 'Suíno' },
  frango: { m3Dia: 0.003, src: 25, label: 'Frango (100 aves)' },
};

export interface BiodigestorInput {
  especie: keyof typeof BIOGAS_POR_ANIMAL;
  animais: number;
  diasUso: number; // dias por ano em operação
  ch4Percent: number; // % de metano no biogás (50–65)
}

export function calcBiodigestor(i: BiodigestorInput) {
  const porAnimal = BIOGAS_POR_ANIMAL[i.especie].m3Dia;
  const biogasAno = porAnimal * i.animais * i.diasUso;
  const ch4Ano = biogasAno * (i.ch4Percent / 100);
  const kgCH4 = ch4Ano * 0.717; // densidade CH4 kg/m³
  const tCO2e = (kgCH4 * GWP_CH4) / 1000;
  // Poder calorífico: 1 m³ biogás (60% CH4) ≈ 6 kWh térmicos; rendimento ~30% elétrico
  const kWhEletricoAno = biogasAno * 6 * 0.3;
  const kWhTermicoAno = biogasAno * 6 * 0.55;
  // Biofertilizante: digestato ~ 90% do volume, rico em N-P-K (estimativa)
  const fertilizanteLitro = biogasAno * 0.9 * 3; // estimativa educacional
  return { biogasAno, ch4Ano, kgCH4, tCO2e, kWhEletricoAno, kWhTermicoAno, fertilizanteLitro };
}

/* ---------------- COOPERATIVA SOLAR ---------------- */
export const PRODUTIVIDADE_SOLAR = 1450; // kWh/kWp/ano (média Brasil) [FONTE 026]
export const CUSTO_KWP = 4200; // R$/kWp instalado (referência 2024-2025) [FONTE 026]

export interface SolarInput {
  potenciaKw: number; // kWp
  familias: number;
  fatorAutoconsumo: number; // 0..1
  paybackAnos: number;
}

export function calcSolar(i: SolarInput) {
  const producaoAnual = i.potenciaKw * PRODUTIVIDADE_SOLAR;
  const tEvitadas = (producaoAnual / 1000) * FATOR_GRID_SIN;
  const investimento = i.potenciaKw * CUSTO_KWP;
  const energiaPorFamilia = (producaoAnual * i.fatorAutoconsumo) / Math.max(i.familias, 1);
  const tarifa = 0.80; // R$/kWh tarifa média residencial [FONTE 027]
  const economiaAnual = producaoAnual * i.fatorAutoconsumo * tarifa;
  const payback = economiaAnual > 0 ? investimento / economiaAnual : Infinity;
  return { producaoAnual, tEvitadas, investimento, energiaPorFamilia, economiaAnual, payback };
}

/* ---------------- COOPERATIVA CLIMÁTICA ---------------- */
export interface CoopInput {
  membros: number;
  hectares: number;
  tCO2ePorHa: number; // redução/remoção anual por hectare
  precoCenario: 'conservador' | 'referencia' | 'otimista';
  custoMRVAno: number;
  custoCertificacaoAno: number;
  custoOperacaoAno: number;
  reservaPct: number; // %
}

export const PRECO_CARBONO_BRL: Record<CoopInput['precoCenario'], { brl: number; src: number; label: string }> = {
  conservador: { brl: 25, src: 28, label: 'Conservador' },
  referencia: { brl: 60, src: 28, label: 'Referência' },
  otimista: { brl: 120, src: 28, label: 'Otimista' },
};

export function calcCoop(i: CoopInput) {
  const tTotal = i.hectares * i.tCO2ePorHa;
  const preco = PRECO_CARBONO_BRL[i.precoCenario].brl;
  const receitaBruta = tTotal * preco;
  const custos = i.custoMRVAno + i.custoCertificacaoAno + i.custoOperacaoAno;
  const reserva = receitaBruta * (i.reservaPct / 100);
  const distribuivel = Math.max(receitaBruta - custos - reserva, 0);
  const porMembro = i.membros > 0 ? distribuivel / i.membros : 0;
  return { tTotal, receitaBruta, custos, reserva, distribuivel, porMembro };
}

/* ---------------- INCÊNDIOS ---------------- */
export interface IncendioInput {
  areaHa: number;
  tCO2ePorHaQueimada: number; // emissão de incêndio por ha (floresta) [FONTE 029]
  valorAtivoPorHaAno: number; // renda anual vinculada à floresta em pé (R$/ha)
  anos: number;
}

export function calcIncendio(i: IncendioInput) {
  const tEmitidas = i.areaHa * i.tCO2ePorHaQueimada;
  const perdaRenda = i.areaHa * i.valorAtivoPorHaAno * i.anos;
  const custoPrevencao = i.areaHa * 120; // R$/ha/ano aceiros+brigada (estimativa)
  return { tEmitidas, perdaRenda, custoPrevencao, custoPrevencaoTotal: custoPrevencao * i.anos };
}

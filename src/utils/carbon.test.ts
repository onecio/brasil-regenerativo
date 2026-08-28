import { describe, it, expect } from 'vitest';
import {
  calcPegada,
  calcBiodigestor,
  calcSolar,
  calcCoop,
  calcIncendio,
  FATOR_GRID_SIN,
} from './carbon';

describe('calcPegada', () => {
  const base = {
    carroKmAno: 10000,
    carroTipo: 'carro_gasolina' as const,
    motoKmAno: 0,
    onibusKmAno: 0,
    metroKmAno: 0,
    aviaoKmAno: 0,
    bikeKmAno: 0,
    kWhMes: 200,
    temSolar: false,
    dieta: 'onivora' as const,
    kgOrganicoAterro: 2,
    kgRecicladoMes: 5,
    kgRoupasAno: 10,
    kgEletronicosAno: 5,
  };

  it('carro a gasolina contribui conforme fator', () => {
    const r = calcPegada(base);
    expect(r.mobilidade).toBeCloseTo(10000 * 0.18, 0);
  });

  it('solar reduz o fator de energia (educacional)', () => {
    const sem = calcPegada({ ...base, temSolar: false });
    const com = calcPegada({ ...base, temSolar: true });
    expect(com.energia).toBeLessThan(sem.energia);
  });

  it('total nunca é negativo', () => {
    const r = calcPegada({ ...base, carroKmAno: 0, kgRecicladoMes: 500 });
    expect(r.total).toBeGreaterThanOrEqual(0);
  });
});

describe('calcBiodigestor', () => {
  it('100 bovinos × 0.4 m³/dia × 300 dias', () => {
    const r = calcBiodigestor({ especie: 'bovino', animais: 100, diasUso: 300, ch4Percent: 60 });
    expect(r.biogasAno).toBeCloseTo(100 * 0.4 * 300, 5);
    expect(r.ch4Ano).toBeCloseTo(12000 * 0.6, 5);
    expect(r.tCO2e).toBeCloseTo((12000 * 0.6 * 0.717 * 28) / 1000, 2);
  });

  it('metano zero quando ch4Percent = 0', () => {
    const r = calcBiodigestor({ especie: 'bovino', animais: 10, diasUso: 300, ch4Percent: 0 });
    expect(r.tCO2e).toBe(0);
  });
});

describe('calcSolar', () => {
  it('produção = potência × produtividade', () => {
    const r = calcSolar({ potenciaKw: 50, familias: 20, fatorAutoconsumo: 0.8, paybackAnos: 5 });
    expect(r.producaoAnual).toBeCloseTo(50 * 1450, 5);
    expect(r.tEvitadas).toBeCloseTo((50 * 1450 / 1000) * FATOR_GRID_SIN, 3);
  });

  it('payback = investimento / economia anual', () => {
    const r = calcSolar({ potenciaKw: 50, familias: 20, fatorAutoconsumo: 0.8, paybackAnos: 5 });
    const esperado = (50 * 4200) / (50 * 1450 * 0.8 * 0.8);
    expect(r.payback).toBeCloseTo(esperado, 3);
  });
});

describe('calcCoop', () => {
  it('receita líquida = bruta - custos - reserva', () => {
    const r = calcCoop({
      membros: 100,
      hectares: 2000,
      tCO2ePorHa: 3,
      precoCenario: 'referencia',
      custoMRVAno: 80000,
      custoCertificacaoAno: 40000,
      custoOperacaoAno: 60000,
      reservaPct: 10,
    });
    const bruta = 2000 * 3 * 60;
    expect(r.receitaBruta).toBeCloseTo(bruta, 2);
    expect(r.distribuivel).toBeCloseTo(bruta - 180000 - bruta * 0.1, 2);
    expect(r.porMembro).toBeCloseTo(r.distribuivel / 100, 2);
  });

  it('não distribui prejuízo', () => {
    const r = calcCoop({
      membros: 10,
      hectares: 10,
      tCO2ePorHa: 0.5,
      precoCenario: 'conservador',
      custoMRVAno: 100000,
      custoCertificacaoAno: 50000,
      custoOperacaoAno: 50000,
      reservaPct: 0,
    });
    expect(r.distribuivel).toBe(0);
  });
});

describe('calcIncendio', () => {
  it('emissão = área × fator', () => {
    const r = calcIncendio({ areaHa: 1000, tCO2ePorHaQueimada: 150, valorAtivoPorHaAno: 300, anos: 5 });
    expect(r.tEmitidas).toBeCloseTo(1000 * 150, 2);
    expect(r.perdaRenda).toBeCloseTo(1000 * 300 * 5, 2);
  });
});

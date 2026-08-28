/**
 * Carbon Points — unidade EDUCACIONAL (não é crédito de carbono).
 * Valores de CO2e evitado são estimativas simplificadas com fonte.
 * Nada aqui é certificável.
 */
import { load, save } from './storage';

export interface PontoRegistro {
  acao: string;
  pontos: number;
  kgCO2e: number;
  ts: number;
}

export interface WalletState {
  pontos: number;
  kgCO2eTotal: number;
  historico: PontoRegistro[];
  streak: number;
  ultimoDia: string;
}

const KEY = 'wallet-v1';
const DIAS: Record<string, { pontos: number; kgCO2e: number; label: string }> = {
  caminhada_10min: { pontos: 5, kgCO2e: 0, label: 'Caminhada (10 min)' },
  bike_1km: { pontos: 8, kgCO2e: 0.08, label: 'Bicicleta (1 km)' },
  onibus_viagem: { pontos: 10, kgCO2e: 0.7, label: 'Transporte coletivo' },
  metro_viagem: { pontos: 12, kgCO2e: 0.8, label: 'Metrô/trem' },
  reciclagem: { pontos: 6, kgCO2e: 0.4, label: 'Reciclagem do dia' },
  compostagem: { pontos: 8, kgCO2e: 0.5, label: 'Compostagem' },
  energia_solar: { pontos: 15, kgCO2e: 2.0, label: 'Energia solar' },
  sem_desperdicio: { pontos: 7, kgCO2e: 0.3, label: 'Sem desperdício alimentar' },
  consumo_circular: { pontos: 9, kgCO2e: 0.6, label: 'Consumo circular' },
};

export const ACOES = DIAS;

function hoje(): string {
  return new Date().toISOString().slice(0, 10);
}

export function novoEstado(): WalletState {
  return { pontos: 0, kgCO2eTotal: 0, historico: [], streak: 0, ultimoDia: '' };
}

export function registrarAcao(acao: keyof typeof DIAS): { estado: WalletState; ok: boolean } {
  const atual = load<WalletState>(KEY, novoEstado());
  const a = DIAS[acao];
  const d = hoje();
  let streak = atual.streak;
  if (atual.ultimoDia !== d) {
    const ontem = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    streak = atual.ultimoDia === ontem ? streak + 1 : 1;
  }
  const estado: WalletState = {
    pontos: atual.pontos + a.pontos,
    kgCO2eTotal: atual.kgCO2eTotal + a.kgCO2e,
    historico: [...atual.historico, { acao: a.label, pontos: a.pontos, kgCO2e: a.kgCO2e, ts: Date.now() }].slice(-200),
    streak,
    ultimoDia: d,
  };
  const ok = save(KEY, estado);
  return { estado, ok };
}

export function lerWallet(): WalletState {
  return load<WalletState>(KEY, novoEstado());
}

export function rankDe(pontos: number): { nome: string; proximo: number | null } {
  if (pontos >= 5000) return { nome: 'Floresta Madura 🌳', proximo: null };
  if (pontos >= 2000) return { nome: 'Copa Alta 🌿', proximo: 5000 };
  if (pontos >= 800) return { nome: 'Raiz Profunda 🌱', proximo: 2000 };
  if (pontos >= 200) return { nome: 'Broto Verde 🍃', proximo: 800 };
  return { nome: 'Semente 🌰', proximo: 200 };
}

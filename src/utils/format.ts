/** Formatação pt-BR. */

export function fmtNum(n: number, digits = 0): string {
  if (!Number.isFinite(n)) return '—';
  return n.toLocaleString('pt-BR', { maximumFractionDigits: digits });
}

export function fmtCompact(n: number): string {
  if (!Number.isFinite(n)) return '—';
  const abs = Math.abs(n);
  if (abs >= 1e9) return `${(n / 1e9).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} bi`;
  if (abs >= 1e6) return `${(n / 1e6).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} mi`;
  if (abs >= 1e3) return `${(n / 1e3).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mil`;
  return n.toLocaleString('pt-BR', { maximumFractionDigits: 1 });
}

export function fmtMoney(n: number): string {
  if (!Number.isFinite(n)) return '—';
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}

export function fmtTons(n: number): string {
  if (!Number.isFinite(n)) return '—';
  const abs = Math.abs(n);
  if (abs >= 1000) return `${(n / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} mil t CO₂e`;
  if (abs >= 1) return `${n.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} t CO₂e`;
  return `${(n * 1000).toLocaleString('pt-BR', { maximumFractionDigits: 0 })} kg CO₂e`;
}

export function fmtPct(n: number, digits = 1): string {
  return `${n.toLocaleString('pt-BR', { maximumFractionDigits: digits })}%`;
}

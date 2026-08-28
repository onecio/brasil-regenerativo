import { useState } from 'react';
import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import { fmtMoney, fmtNum } from '../utils/format';
import { SourceList } from '../components/SourceRef';

interface Area {
  id: string;
  nome: string;
  emoji: string;
  custoUn: number; // R$ mi por unidade
  desc: string;
  emprego: number; // pontos
  clima: number;
  renda: number;
  resili: number;
}

const AREAS: Area[] = [
  { id: 'reflor', nome: 'Reflorestamento', emoji: '🌲', custoUn: 8, desc: 'Restauração com nativas em áreas degradadas', emprego: 7, clima: 9, renda: 4, resili: 7 },
  { id: 'biodig', nome: 'Biodigestores', emoji: '♻️', custoUn: 6, desc: 'Biogás em propriedades rurais e agroindústrias', emprego: 5, clima: 8, renda: 7, resili: 3 },
  { id: 'sanea', nome: 'Saneamento', emoji: '💧', custoUn: 10, desc: 'Esgoto tratado e recuperação de rios', emprego: 6, clima: 5, renda: 5, resili: 8 },
  { id: 'solar', nome: 'Energia solar', emoji: '☀️', custoUn: 7, desc: 'Geração distribuída e cooperativas solares', emprego: 5, clima: 8, renda: 6, resili: 4 },
  { id: 'coop', nome: 'Cooperativas climáticas', emoji: '🤝', custoUn: 5, desc: 'Estruturação de cooperativas e MRV compartilhado', emprego: 8, clima: 6, renda: 9, resili: 5 },
  { id: 'transp', nome: 'Transporte de baixo carbono', emoji: '🚌', custoUn: 9, desc: 'Ônibus elétrico/etanol e corredores verdes', emprego: 6, clima: 8, renda: 5, resili: 3 },
  { id: 'recicla', nome: 'Reciclagem e catadores', emoji: '♻️', custoUn: 4, desc: 'Infraestrutura e cooperativas de reciclagem', emprego: 9, clima: 6, renda: 8, resili: 3 },
  { id: 'rios', nome: 'Recuperação de rios', emoji: '🏞️', custoUn: 8, desc: 'Mata ciliar, nascentes e drenagem verde', emprego: 5, clima: 5, renda: 4, resili: 9 },
  { id: 'agrireg', nome: 'Agricultura regenerativa', emoji: '🌾', custoUn: 6, desc: 'Assistência técnica para plantio direto, SAF e solo', emprego: 7, clima: 7, renda: 7, resili: 6 },
  { id: 'pesq', nome: 'Pesquisa e monitoramento', emoji: '🔬', custoUn: 5, desc: 'Ciência, dados abertos e MRV nacional', emprego: 4, clima: 4, renda: 2, resili: 5 },
  { id: 'brigadas', nome: 'Prevenção de incêndios', emoji: '🔥', custoUn: 4, desc: 'Brigadas, aceiros e monitoramento de focos', emprego: 6, clima: 7, renda: 3, resili: 9 },
];

const ORCAMENTO = 10_000; // R$ mi = R$ 10 bi

export default function Politicas10bi() {
  const [aloc, setAloc] = useState<Record<string, number>>(
    Object.fromEntries(AREAS.map((a) => [a.id, 0])),
  );
  const gasto = Object.values(aloc).reduce((a, b) => a + b, 0);
  const saldo = ORCAMENTO - gasto;

  const total = (campo: 'emprego' | 'clima' | 'renda' | 'resili') =>
    AREAS.reduce((acc, a) => acc + (aloc[a.id] / a.custoUn) * a[campo], 0);

  function setQtd(id: string, v: number) {
    setAloc((prev) => ({ ...prev, [id]: Math.max(0, v) }));
  }

  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          kicker="Laboratório de políticas públicas"
          title="Se você fosse o governo: como distribuir R$ 10 bilhões?"
          lede={
            <>
              Você decide a alocação de um orçamento climático nacional fictício. Cada área tem um
              custo por unidade de investimento e gera impactos relativos (emprego, clima, renda,
              resiliência). O simulador mostra os trade-offs — não existe resposta certa, existe
              prioridade explícita.
            </>
          }
        />

        <NatureTag kind="cenario" />
        <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
          Exercício educacional inspirado em fundos reais (Fundo Clima, Fundo Amazônia, PAC
          seleções). Impactos são pontuações relativas, não previsões.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 24, alignItems: 'start', marginTop: 20 }}>
          <div className="sim-controls" style={{ position: 'sticky', top: 90 }}>
            <h3 style={{ marginTop: 0 }}>Orçamento: {fmtMoney(ORCAMENTO * 1e6)}</h3>
            <div className="stat stat--green">{fmtMoney(saldo * 1e6)}</div>
            <div className="meter" role="progressbar" aria-valuenow={Math.min(Math.round((gasto / ORCAMENTO) * 100), 100)} aria-valuemin={0} aria-valuemax={100} aria-label="Orçamento alocado">
              <span style={{ width: `${Math.min((gasto / ORCAMENTO) * 100, 100)}%` }} />
            </div>
            {AREAS.map((a) => (
              <div className="ctl" key={a.id}>
                <label htmlFor={`qtd-${a.id}`}>
                  <span>{a.emoji} {a.nome}</span>
                  <output htmlFor={`qtd-${a.id}`}>{fmtMoney(aloc[a.id] * 1e6)}</output>
                </label>
                <input id={`qtd-${a.id}`} type="range" min={0} max={40} step={1} value={aloc[a.id]} onChange={(e) => setQtd(a.id, Number(e.target.value))} />
              </div>
            ))}
            <NatureTag kind="cenario" />
          </div>

          <div>
            <h3>Impactos relativos do plano</h3>
            <div className="grid grid--2">
              {[
                { nome: 'Empregos', valor: total('emprego'), cor: 'green' as const },
                { nome: 'Clima (emissões evitadas)', valor: total('clima'), cor: 'cyan' as const },
                { nome: 'Renda e inclusão', valor: total('renda'), cor: 'amber' as const },
                { nome: 'Resiliência', valor: total('resili'), cor: 'green' as const },
              ].map((i) => (
                <div className="card" key={i.nome} style={{ padding: 16 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--ink-soft)' }}>{i.nome}</div>
                  <div className={`stat stat--${i.cor}`} style={{ fontSize: '1.6rem' }}>{fmtNum(i.valor)}<small> pts</small></div>
                </div>
              ))}
            </div>

            <div className="card" style={{ marginTop: 16 }}>
              <h3 style={{ marginTop: 0 }}>Leitura de política pública</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
                {saldo < 0
                  ? 'Você estourou o orçamento — na vida real, isso significaria buscar outras fontes (BNDES, fundos internacionais, PPPs) e explicar o déficit ao Congresso.'
                  : gasto === 0
                    ? 'Aloque recursos para ver os trade-offs. Dica: nenhuma área sozinha resolve tudo — a combinação é o desenho da política.'
                    : 'Seu plano privilegia as áreas com mais unidades alocadas. Compare os impactos: será que a prioridade declarada (emprego × clima × renda) está coerente com a alocação?'}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
                Na prática, programas como o Fundo Clima combinam crédito, subvenção e garantias; a
                distribuição territorial e a participação social são tão importantes quanto o total
                alocado.
              </p>
            </div>

            <SourceList ids={[11, 9, 10, 8, 2]} />
          </div>
        </div>
      </div>
    </section>
  );
}

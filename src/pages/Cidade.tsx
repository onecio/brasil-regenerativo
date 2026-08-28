import { useState } from 'react';
import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import { fmtMoney, fmtPct } from '../utils/format';
import { SourceList } from '../components/SourceRef';
import FichaTecnica from '../components/FichaTecnica';

interface Investimento {
  id: string;
  nome: string;
  emoji: string;
  custo: number; // R$ (milhões, unidade de investimento)
  emissao: number; // redução relativa de emissões (pontos 0-100)
  calor: number; // redução de temperatura urbana (pontos)
  residuo: number;
  energia: number;
  emprego: number;
  vegetacao: number;
  ar: number;
  risco: number; // redução de risco climático
  renda: number;
  saude: number;
}

const OPCOES: Investimento[] = [
  { id: 'arborizacao', nome: 'Arborização urbana', emoji: '🌳', custo: 8, emissao: 4, calor: 9, residuo: 0, energia: 2, emprego: 3, vegetacao: 9, ar: 8, risco: 5, renda: 2, saude: 6 },
  { id: 'parques', nome: 'Parques e corredores verdes', emoji: '🌿', custo: 15, emissao: 5, calor: 8, residuo: 1, energia: 1, emprego: 4, vegetacao: 9, ar: 7, risco: 6, renda: 3, saude: 7 },
  { id: 'saneamento', nome: 'Saneamento e recuperação de rios', emoji: '💧', custo: 25, emissao: 6, calor: 3, residuo: 4, energia: 1, emprego: 6, vegetacao: 5, ar: 3, risco: 8, renda: 4, saude: 9 },
  { id: 'ciclovias', nome: 'Ciclovias e mobilidade ativa', emoji: '🚲', custo: 10, emissao: 8, calor: 2, residuo: 0, energia: 2, emprego: 4, vegetacao: 3, ar: 8, risco: 2, renda: 3, saude: 8 },
  { id: 'onibus', nome: 'Ônibus de baixo carbono', emoji: '🚌', custo: 30, emissao: 12, calor: 1, residuo: 1, energia: 3, emprego: 5, vegetacao: 1, ar: 9, risco: 1, renda: 5, saude: 6 },
  { id: 'biodigestor', nome: 'Biodigestores (resíduos orgânicos)', emoji: '♻️', custo: 18, emissao: 10, calor: 0, residuo: 8, energia: 6, emprego: 4, vegetacao: 1, ar: 5, risco: 1, renda: 5, saude: 4 },
  { id: 'aterro', nome: 'Aterro adequado + captura de biogás', emoji: '🏗️', custo: 22, emissao: 11, calor: 0, residuo: 9, energia: 5, emprego: 3, vegetacao: 1, ar: 5, risco: 2, renda: 3, saude: 5 },
  { id: 'reciclagem', nome: 'Reciclagem e cooperativas de catadores', emoji: '♻️', custo: 12, emissao: 7, calor: 0, residuo: 9, energia: 2, emprego: 8, vegetacao: 1, ar: 4, risco: 1, renda: 8, saude: 3 },
  { id: 'solar', nome: 'Energia solar (telhados + usinas)', emoji: '☀️', custo: 20, emissao: 12, calor: 3, residuo: 0, energia: 9, emprego: 5, vegetacao: 1, ar: 4, risco: 1, renda: 5, saude: 2 },
  { id: 'drenagem', nome: 'Drenagem verde (SPAUP)', emoji: '🌧️', custo: 16, emissao: 2, calor: 4, residuo: 1, energia: 0, emprego: 3, vegetacao: 6, ar: 3, risco: 9, renda: 2, saude: 4 },
  { id: 'telhados', nome: 'Telhados verdes', emoji: '🏡', custo: 9, emissao: 3, calor: 8, residuo: 1, energia: 4, emprego: 3, vegetacao: 7, ar: 5, risco: 3, renda: 2, saude: 5 },
  { id: 'compostagem', nome: 'Compostagem comunitária', emoji: '🍂', custo: 6, emissao: 6, calor: 0, residuo: 8, energia: 1, emprego: 4, vegetacao: 2, ar: 3, risco: 1, renda: 3, saude: 2 },
];

const ORCAMENTO_INICIAL = 120; // R$ milhões

export default function Cidade() {
  const [escolhidos, setEscolhidos] = useState<Set<string>>(new Set(['arborizacao', 'saneamento', 'reciclagem']));
  const gasto = [...escolhidos].reduce((acc, id) => acc + (OPCOES.find((o) => o.id === id)?.custo ?? 0), 0);
  const saldo = ORCAMENTO_INICIAL - gasto;

  const soma = (campo: keyof Omit<Investimento, 'id' | 'nome' | 'emoji' | 'custo'>) =>
    [...escolhidos].reduce((acc, id) => acc + (OPCOES.find((o) => o.id === id)?.[campo] ?? 0), 0);

  const indicadores: { nome: string; valor: number; pct: number }[] = [
    { nome: 'Emissões reduzidas', valor: soma('emissao'), pct: Math.min(soma('emissao') * 2, 100) },
    { nome: 'Conforto térmico', valor: soma('calor'), pct: Math.min(soma('calor') * 2.5, 100) },
    { nome: 'Resíduos geridos', valor: soma('residuo'), pct: Math.min(soma('residuo') * 2.5, 100) },
    { nome: 'Energia limpa', valor: soma('energia'), pct: Math.min(soma('energia') * 3, 100) },
    { nome: 'Emprego verde', valor: soma('emprego'), pct: Math.min(soma('emprego') * 3, 100) },
    { nome: 'Cobertura vegetal', valor: soma('vegetacao'), pct: Math.min(soma('vegetacao') * 2.5, 100) },
    { nome: 'Qualidade do ar', valor: soma('ar'), pct: Math.min(soma('ar') * 2.5, 100) },
    { nome: 'Resiliência climática', valor: soma('risco'), pct: Math.min(soma('risco') * 2.5, 100) },
    { nome: 'Renda local', valor: soma('renda'), pct: Math.min(soma('renda') * 3, 100) },
    { nome: 'Saúde pública', valor: soma('saude'), pct: Math.min(soma('saude') * 2.5, 100) },
  ];

  function toggle(id: string) {
    setEscolhidos((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  return (
    <section className="section page-top">
      <div className="wrap">
        <SectionHead
          kicker="Jogo · Simulador"
          title="Cidade carbono positiva — você é a prefeitura"
          lede={
            <>
              Você recebe <strong>{fmtMoney(ORCAMENTO_INICIAL * 1e6)}</strong> (cenário de
              investimento climático municipal) para transformar sua cidade. Cada escolha mexe nos
              indicadores — e o saldo é o seu orçamento. Jogo educacional: os impactos são
              pontuações relativas, não previsões.
            </>
          }
        >
          <div className="meta">
            <NatureTag kind="cenario" />
            <span className="chip" style={{ cursor: 'default' }}>Impactos relativos (0–100 pts)</span>
          </div>
        </SectionHead>

        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 24, alignItems: 'start' }}>
          <div className="sim-controls" style={{ position: 'sticky', top: 90 }}>
            <h3 style={{ marginTop: 0 }}>Orçamento</h3>
            <div className="stat stat--green">{fmtMoney(saldo * 1e6)}</div>
            <div className="meter" role="progressbar" aria-valuenow={Math.round((gasto / ORCAMENTO_INICIAL) * 100)} aria-valuemin={0} aria-valuemax={100} aria-label="Orçamento utilizado">
              <span style={{ width: `${Math.min((gasto / ORCAMENTO_INICIAL) * 100, 100)}%` }} />
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>
              {saldo < 0 ? '⚠️ Orçamento estourado — o saldo pode ficar negativo (endividamento).' : `${fmtPct((gasto / ORCAMENTO_INICIAL) * 100)} utilizado`}
            </p>
            <NatureTag kind="cenario" />
            <h3>Investimentos</h3>
            <div role="group" aria-label="Investimentos da cidade" style={{ display: 'grid', gap: 6 }}>
              {OPCOES.map((o) => {
                const on = escolhidos.has(o.id);
                return (
                  <button key={o.id} type="button" className="chip" style={{ textAlign: 'left', justifyContent: 'space-between' }} aria-pressed={on} onClick={() => toggle(o.id)}>
                    <span>{on ? '☑' : '☐'} {o.emoji} {o.nome}</span>
                    <span className="mono" style={{ fontSize: '0.75rem' }}>{fmtMoney(o.custo * 1e6)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3>Indicadores da cidade</h3>
            <div className="grid grid--2">
              {indicadores.map((ind) => (
                <div className="card" key={ind.nome} style={{ padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600 }}>
                    <span>{ind.nome}</span>
                    <span className="mono">{ind.valor} pts</span>
                  </div>
                  <div className={`meter ${ind.pct < 30 ? 'meter--red' : ind.pct < 60 ? 'meter--amber' : ''}`} role="progressbar" aria-valuenow={Math.round(ind.pct)} aria-valuemin={0} aria-valuemax={100} aria-label={`${ind.nome} ${Math.round(ind.pct)}%`}>
                    <span style={{ width: `${ind.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="card" style={{ marginTop: 16 }}>
              <h3 style={{ marginTop: 0 }}>Leitura de gestão</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
                {saldo < 0
                  ? 'Você estourou o orçamento. Na vida real, isso significaria renegociar contratos, buscar fundos climáticos (Fundo Clima, BNDES, cooperação) e explicar escolhas à Câmara — a boa gestão climática também é gestão fiscal.'
                  : escolhidos.size < 3
                    ? 'Comece combinando infraestrutura verde com inclusão: arborização + saneamento + reciclagem costumam dar o melhor retorno por real investido.'
                    : 'Plano equilibrado. Em cenários reais, o próximo passo é o financiamento: fundos climáticos, PPPs e cooperativas de crédito para escalar.'}
              </p>
            </div>

            <SourceList ids={[9, 8, 11, 10]} />
            <FichaTecnica
              premissas={[
                { k: 'Orçamento', v: 'R$ 120 mi (cenário de investimento climático municipal)' },
                { k: 'Investimentos', v: '12 opções, R$ 6–30 mi cada' },
                { k: 'Impactos', v: 'Pontuação relativa 0–100 por indicador (não é previsão)' },
                { k: 'Mensagem', v: 'Boa gestão climática também é gestão fiscal' },
              ]}
              fontes={[9, 8, 11, 10]}
              nota="Jogo educacional inspirado em políticas reais (Fundo Clima, BNDES, ICMS Ecológico). Os números não representam estudos de viabilidade municipais."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

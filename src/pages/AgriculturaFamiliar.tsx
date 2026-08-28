import { useState } from 'react';
import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import { SliderCtl, ResultCard } from '../components/Sim';
import { fmtNum, fmtTons, fmtMoney } from '../utils/format';
import { SourceList } from '../components/SourceRef';

interface Intervencao {
  id: string;
  nome: string;
  emoji: string;
  desc: string;
  tCO2eHa: number; // redução/remoção estimada por ha/ano
  investimentoHa: number; // R$/ha
  economiaAnualHa: number; // R$/ha/ano (economia operacional)
  receitaPossivelHa: number; // R$/ha/ano (receita ambiental potencial, cenário)
}

const INTERVENCOES: Intervencao[] = [
  { id: 'plantio', nome: 'Plantio direto', emoji: '🌾', desc: 'Sem revolvimento do solo, com palhada — reduz emissões e erosão.', tCO2eHa: 0.8, investimentoHa: 1500, economiaAnualHa: 300, receitaPossivelHa: 120 },
  { id: 'saf', nome: 'Sistema agroflorestal (SAF)', emoji: '🌳', desc: 'Árvores + culturas + criação no mesmo espaço; sequestra carbono e diversifica renda.', tCO2eHa: 6, investimentoHa: 18000, economiaAnualHa: 500, receitaPossivelHa: 900 },
  { id: 'pasto', nome: 'Recuperação de pastagem', emoji: '🐄', desc: 'Pastagem degradada → manejada; aumenta produtividade e sequestro de carbono no solo.', tCO2eHa: 2.2, investimentoHa: 6000, economiaAnualHa: 700, receitaPossivelHa: 330 },
  { id: 'solo', nome: 'Recuperação de solo (adubação verde)', emoji: '🟫', desc: 'Leguminosas e matéria orgânica reconstroem o solo e estocam carbono.', tCO2eHa: 1.5, investimentoHa: 2500, economiaAnualHa: 250, receitaPossivelHa: 220 },
  { id: 'reflor', nome: 'Reflorestamento (nativas)', emoji: '🌲', desc: 'Plantio de espécies nativas em áreas de reserva legal e APPs.', tCO2eHa: 8, investimentoHa: 22000, economiaAnualHa: 0, receitaPossivelHa: 1200 },
  { id: 'app', nome: 'Proteção de APP e mata ciliar', emoji: '💧', desc: 'Preservar/recuperar margens de rios: água, biodiversidade e carbono.', tCO2eHa: 4, investimentoHa: 8000, economiaAnualHa: 200, receitaPossivelHa: 600 },
  { id: 'fert', nome: 'Redução de fertilizantes químicos', emoji: '🧪', desc: 'Manejo integrado de nutrientes: menos N sintético, menos N₂O.', tCO2eHa: 0.4, investimentoHa: 800, economiaAnualHa: 450, receitaPossivelHa: 60 },
  { id: 'bio', nome: 'Biodigestor (dejetos)', emoji: '♻️', desc: 'Metano capturado vira energia e biofertilizante (ver simulador próprio).', tCO2eHa: 0.3, investimentoHa: 5000, economiaAnualHa: 900, receitaPossivelHa: 200 },
  { id: 'fogo', nome: 'Prevenção de incêndios (aceiros/brigada)', emoji: '🔥', desc: 'Reduz queimadas acidentais e perda de carbono estocado.', tCO2eHa: 0.6, investimentoHa: 400, economiaAnualHa: 150, receitaPossivelHa: 90 },
];

export default function AgriculturaFamiliar() {
  const [ha, setHa] = useState(20);
  const [ativos, setAtivos] = useState<Set<string>>(new Set(['plantio', 'pasto']));

  function toggle(id: string) {
    setAtivos((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  const selecionadas = INTERVENCOES.filter((i) => ativos.has(i.id));
  const totais = selecionadas.reduce(
    (acc, i) => ({
      t: acc.t + i.tCO2eHa * ha,
      inv: acc.inv + i.investimentoHa * ha,
      eco: acc.eco + i.economiaAnualHa * ha,
      rec: acc.rec + i.receitaPossivelHa * ha,
    }),
    { t: 0, inv: 0, eco: 0, rec: 0 },
  );

  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          kicker="Simulador · Agricultura familiar"
          title="Fazenda virtual — da terra à renda climática"
          lede={
            <>
              Monte uma propriedade familiar, escolha intervenções regenerativas e veja o que muda
              em emissões, captura, investimento, economia operacional e receitas ambientais{' '}
              <strong>potenciais</strong>. Tudo é estimativa educacional com premissas ajustáveis —
              nada aqui é promessa financeira nem crédito garantido.
            </>
          }
        />

        <div className="sim">
          <div className="sim-controls">
            <h3 style={{ marginTop: 0 }}>Propriedade</h3>
            <SliderCtl label="Área da propriedade" value={ha} min={2} max={200} unit="ha" onChange={setHa} />
            <h3>Intervenções</h3>
            <div role="group" aria-label="Intervenções" style={{ display: 'grid', gap: 8 }}>
              {INTERVENCOES.map((i) => {
                const on = ativos.has(i.id);
                return (
                  <button
                    key={i.id}
                    type="button"
                    className="chip"
                    style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                    aria-pressed={on}
                    onClick={() => toggle(i.id)}
                  >
                    {on ? '☑' : '☐'} {i.emoji} {i.nome}
                  </button>
                );
              })}
            </div>
            <NatureTag kind="estimativa" />
          </div>

          <div className="sim-results">
            <div className="grid grid--2">
              <ResultCard label="Emissões evitadas + captura" value={fmtTons(totais.t)} kind="green" hint="Estimativa anual por ha das intervenções ativas" />
              <ResultCard label="Investimento estimado" value={fmtMoney(totais.inv)} kind="amber" hint="Custo de implantação (uma vez)" />
              <ResultCard label="Economia operacional" value={`${fmtMoney(totais.eco)}/ano`} kind="cyan" hint="Redução de insumos, energia e perdas" />
              <ResultCard label="Receita ambiental potencial" value={`${fmtMoney(totais.rec)}/ano`} kind="green" hint="Cenário (PSA/mercado) — depende de política, metodologia e preço" />
            </div>

            <table className="tbl">
              <thead>
                <tr><th scope="col">Intervenção</th><th scope="col">t CO₂e/ano</th><th scope="col">Investimento</th><th scope="col">Economia/ano</th><th scope="col">Receita potencial/ano</th></tr>
              </thead>
              <tbody>
                {selecionadas.map((i) => (
                  <tr key={i.id}>
                    <td>{i.emoji} {i.nome}</td>
                    <td className="mono">{fmtNum(i.tCO2eHa * ha, 1)}</td>
                    <td className="mono">{fmtMoney(i.investimentoHa * ha)}</td>
                    <td className="mono">{fmtMoney(i.economiaAnualHa * ha)}</td>
                    <td className="mono">{fmtMoney(i.receitaPossivelHa * ha)}</td>
                  </tr>
                ))}
                {selecionadas.length === 0 && (
                  <tr><td colSpan={5} style={{ color: 'var(--ink-soft)' }}>Selecione ao menos uma intervenção para ver o painel.</td></tr>
                )}
              </tbody>
            </table>

            <details className="callout callout--warn">
              <summary>O que falta para isso virar crédito de carbono?</summary>
              <p style={{ fontSize: '0.88rem' }}>
                Metodologia aprovada para a atividade e região, adicionalidade demonstrada, baseline
                documentado, MRV (medição/relato/verificação), validação e verificação por terceiros
                e registro com emissão. A agregação (cooperativa) dilui esses custos — veja{' '}
                <a href="#/escala">a barreira da escala</a> e{' '}
                <a href="#/cooperativa">o simulador de cooperativa</a>. Receitas de PSA dependem de
                programa existente (ex.: Lei 14.119/2021, programas estaduais).
              </p>
            </details>

            <SourceList ids={[7, 2, 3, 25]} />
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import FlowDiagram from '../components/FlowDiagram';
import { SliderCtl, ResultCard } from '../components/Sim';
import { fmtMoney, fmtNum, fmtTons } from '../utils/format';
import { SourceList } from '../components/SourceRef';

interface Carteira { id: string; nome: string; emoji: string; tPorR$: number; retornoPct: number; risco: number }

const CARTEIRAS: Carteira[] = [
  { id: 'biodig', nome: 'Biodigestores', emoji: '♻️', tPorR$: 3, retornoPct: 8, risco: 2 },
  { id: 'solar', nome: 'Parques solares', emoji: '☀️', tPorR$: 2.5, retornoPct: 10, risco: 1 },
  { id: 'recicla', nome: 'Reciclagem', emoji: '🔄', tPorR$: 2, retornoPct: 7, risco: 3 },
  { id: 'reflor', nome: 'Reflorestamento', emoji: '🌲', tPorR$: 4, retornoPct: 5, risco: 4 },
  { id: 'sanea', nome: 'Saneamento', emoji: '💧', tPorR$: 1.5, retornoPct: 6, risco: 2 },
  { id: 'agri', nome: 'Agricultura regenerativa', emoji: '🌾', tPorR$: 2.2, retornoPct: 7, risco: 3 },
];

export default function BancoClimatico() {
  const [capital, setCapital] = useState(500); // R$ mi
  const [ciclos, setCiclos] = useState(10); // anos
  const [aloc, setAloc] = useState<Record<string, number>>(
    Object.fromEntries(CARTEIRAS.map((c) => [c.id, 20])),
  );

  const totalPct = Object.values(aloc).reduce((a, b) => a + b, 0);

  // Carteira ponderada
  const tAno = CARTEIRAS.reduce((acc, c) => acc + (capital * (aloc[c.id] / 100) / 1e6) * c.tPorR$ * 1000, 0);
  const retornoAnualPct = CARTEIRAS.reduce((acc, c) => acc + (aloc[c.id] / 100) * c.retornoPct, 0);
  const riscoMedio = CARTEIRAS.reduce((acc, c) => acc + (aloc[c.id] / 100) * c.risco, 0);

  const jurosAnual = retornoAnualPct / 100;
  const reinvestido = capital * Math.pow(1 + jurosAnual * 0.6, ciclos); // 60% do retorno volta ao fundo
  const distribuido = capital * (jurosAnual * 0.4) * ciclos; // 40% distribuído como resultado
  const tTotal = tAno * ciclos;

  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          kicker="Simulador · Financiamento"
          title="Banco climático — capital que gira"
          lede={
            <>
              Um banco de desenvolvimento climático: o capital financia projetos, os projetos geram
              economia, receita e ativos ambientais, e parte do resultado <strong>retorna ao fundo</strong>{' '}
              para financiar o próximo ciclo. É a lógica do <em>fundo revolvente</em>.
            </>
          }
        />

        <div style={{ marginBottom: 24 }}>
          <FlowDiagram steps={['Capital', 'Investimento', 'Impacto', 'Economia/receita', 'Pagamento', 'Reinvestimento']} label="Ciclo do banco climático" />
        </div>

        <div className="sim">
          <div className="sim-controls">
            <h3 style={{ marginTop: 0 }}>Configuração</h3>
            <SliderCtl label="Capital inicial" value={capital} min={50} max={5000} step={50} unit="R$ mi" onChange={setCapital} format={(v) => fmtMoney(v * 1e6)} />
            <SliderCtl label="Horizonte" value={ciclos} min={3} max={30} unit="anos" onChange={setCiclos} />
            <h3>Carteira (%)</h3>
            {CARTEIRAS.map((c) => (
              <SliderCtl key={c.id} label={`${c.emoji} ${c.nome}`} value={aloc[c.id]} min={0} max={60} unit="%" onChange={(v) => setAloc((prev) => ({ ...prev, [c.id]: v }))} />
            ))}
            <div style={{ fontSize: '0.82rem', color: totalPct === 100 ? 'var(--green-600)' : 'var(--amber-600)', fontWeight: 600 }}>
              Total da carteira: {totalPct}% {totalPct !== 100 && '(ajuste para 100%)'}
            </div>
            <NatureTag kind="cenario" />
          </div>

          <div className="sim-results">
            <div className="grid grid--2">
              <ResultCard label="Impacto anual estimado" value={fmtTons(tAno)} kind="cyan" hint="Emissões evitadas/removidas pela carteira (cenário)" />
              <ResultCard label="Retorno médio anual" value={`${fmtNum(retornoAnualPct, 1)}%`} kind="green" hint="Ponderado pela carteira — simplificação" />
              <ResultCard label="Risco médio" value={`${fmtNum(riscoMedio, 1)}/5`} kind="amber" hint="Reflorestamento tem mais risco de permanência; solar menos" />
              <ResultCard label="Fundo ao final (reinvestido)" value={fmtMoney(reinvestido)} kind="green" hint="Premissa: 60% do retorno volta ao fundo" />
            </div>
            <ResultCard label="Resultado distribuído (40% do retorno)" value={fmtMoney(distribuido)} kind="amber" hint="Pode virar renda para comunidades, dividendos ou subsídio a taxas" />
            <ResultCard label="Impacto total no horizonte" value={fmtTons(tTotal)} kind="cyan" hint="Anual × horizonte (linear, sem decaimento)" />

            <details className="callout">
              <summary>Experiências reais que inspiram este ciclo</summary>
              <p style={{ fontSize: '0.88rem' }}>
                Fundos revolventes e de financiamento climático existem no Brasil e no mundo: Fundo
                Amazônia (captação + aplicação via BNDES), Fundo Clima, fundos de desenvolvimento
                regional e internacionais como o Green Climate Fund. A novidade proposta aqui é a{' '}
                <strong>regra de retorno</strong> (parte do resultado volta ao fundo) — desenho que
                precisa de governança, métricas e auditoria para não virar subsídio sem controle.
              </p>
            </details>

            <SourceList ids={[11, 9, 10, 18]} />
          </div>
        </div>
      </div>
    </section>
  );
}

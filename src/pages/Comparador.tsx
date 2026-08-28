import { useState } from 'react';
import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import { SliderCtl, ChipGroup } from '../components/Sim';
import { fmtNum, fmtTons, fmtMoney } from '../utils/format';
import { SourceList } from '../components/SourceRef';

type Premissa = 'conservador' | 'base' | 'otimista';

const MULT: Record<Premissa, { t: number; custo: number; preco: number }> = {
  conservador: { t: 0.7, custo: 1.3, preco: 0.5 },
  base: { t: 1, custo: 1, preco: 1 },
  otimista: { t: 1.4, custo: 0.8, preco: 1.8 },
};

export default function Comparador() {
  const [prem, setPrem] = useState<Premissa>('base');
  const [precoRef, setPrecoRef] = useState(60);
  const m = MULT[prem];

  // Projeto A: grande empreendimento
  const a = {
    t: 500000 * m.t,
    invest: 250000000,
    empregos: 150,
    familias: 200,
    mrv: 3000000,
    duracao: 30,
  };
  // Projeto B: cooperativa 2.000 agricultores
  const b = {
    t: 120000 * m.t,
    invest: 40000000,
    empregos: 900,
    familias: 4000,
    mrv: 400000,
    duracao: 25,
  };

  const receitaA = a.t * precoRef * m.preco;
  const receitaB = b.t * precoRef * m.preco;
  const porFamiliaA = receitaA / a.familias;
  const porFamiliaB = receitaB / b.familias;

  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          kicker="Simulador · Comparação"
          title="Comparador de projetos"
          lede={
            <>
              O mesmo dinheiro, dois desenhos: um grande empreendimento versus uma cooperativa com
              2.000 agricultores. A comparação não é “um é melhor” — é sobre <strong>o que cada
              arranjo entrega</strong> em emissões, empregos, famílias, distribuição, biodiversidade
              e risco. Altere as premissas.
            </>
          }
        />

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
          <div style={{ minWidth: 260 }}>
            <ChipGroup label="Cenário" value={prem} onChange={setPrem}
              options={[{ value: 'conservador', label: 'Conservador' }, { value: 'base', label: 'Base' }, { value: 'otimista', label: 'Otimista' }]} />
          </div>
          <div style={{ minWidth: 260 }}>
            <SliderCtl label="Preço de referência (R$/t)" value={precoRef} min={10} max={300} step={5} onChange={setPrecoRef} />
          </div>
        </div>

        <div className="compare">
          <div className="compare-col compare-col--a">
            <h3>Projeto A — grande empreendimento</h3>
            <table className="tbl">
              <tbody>
                <tr><th scope="row">Redução/remoção (ano)</th><td className="mono">{fmtTons(a.t)}</td></tr>
                <tr><th scope="row">Investimento</th><td className="mono">{fmtMoney(a.invest)}</td></tr>
                <tr><th scope="row">Empregos diretos</th><td className="mono">{fmtNum(a.empregos)}</td></tr>
                <tr><th scope="row">Famílias beneficiadas</th><td className="mono">{fmtNum(a.familias)}</td></tr>
                <tr><th scope="row">Receita potencial/ano</th><td className="mono">{fmtMoney(receitaA)}</td></tr>
                <tr><th scope="row">Receita por família/ano</th><td className="mono">{fmtMoney(porFamiliaA)}</td></tr>
                <tr><th scope="row">Custo MRV anual</th><td className="mono">{fmtMoney(a.mrv)}</td></tr>
                <tr><th scope="row">Duração (permanência)</th><td className="mono">{a.duracao} anos</td></tr>
              </tbody>
            </table>
          </div>
          <div className="compare-col compare-col--b">
            <h3>Projeto B — cooperativa de 2.000 agricultores</h3>
            <table className="tbl">
              <tbody>
                <tr><th scope="row">Redução/remoção (ano)</th><td className="mono">{fmtTons(b.t)}</td></tr>
                <tr><th scope="row">Investimento</th><td className="mono">{fmtMoney(b.invest)}</td></tr>
                <tr><th scope="row">Empregos diretos/indiretos</th><td className="mono">{fmtNum(b.empregos)}</td></tr>
                <tr><th scope="row">Famílias beneficiadas</th><td className="mono">{fmtNum(b.familias)}</td></tr>
                <tr><th scope="row">Receita potencial/ano</th><td className="mono">{fmtMoney(receitaB)}</td></tr>
                <tr><th scope="row">Receita por família/ano</th><td className="mono">{fmtMoney(porFamiliaB)}</td></tr>
                <tr><th scope="row">Custo MRV anual</th><td className="mono">{fmtMoney(b.mrv)}</td></tr>
                <tr><th scope="row">Duração (permanência)</th><td className="mono">{b.duracao} anos</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card" style={{ marginTop: 24 }}>
          <h3 style={{ marginTop: 0 }}>Leitura multidimensional</h3>
          <ul style={{ fontSize: '0.9rem' }}>
            <li><strong>Volume:</strong> o grande empreendimento tende a gerar mais tCO₂e por real investido — mas com receita concentrada.</li>
            <li><strong>Distribuição:</strong> a cooperativa pulveriza a receita por muito mais famílias (veja “receita por família” sob premissas iguais).</li>
            <li><strong>Empregos/território:</strong> projetos cooperativos tendem a gerar mais empregos locais e ancorar desenvolvimento regional.</li>
            <li><strong>Risco:</strong> cooperativa tem mais risco de governança e metodologia; grande projeto tem mais risco de permanência e impacto social.</li>
            <li><strong>Biodiversidade:</strong> depende do desenho — monocultura de carbono ≠ restauração ecológica.</li>
          </ul>
          <NatureTag kind="cenario" />
          <p style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>
            Valores de exemplo ajustáveis, não dados reais de projeto. Use para educar a discussão de
            trade-offs, não para decisão de investimento.
          </p>
        </div>

        <SourceList ids={[18, 13, 14, 17]} />
      </div>
    </section>
  );
}

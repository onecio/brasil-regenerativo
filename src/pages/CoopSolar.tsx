import { useState } from 'react';
import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import FlowDiagram from '../components/FlowDiagram';
import { SliderCtl, ResultCard } from '../components/Sim';
import { calcSolar } from '../utils/carbon';
import { fmtNum, fmtTons, fmtMoney } from '../utils/format';
import { SourceList } from '../components/SourceRef';
import FichaTecnica from '../components/FichaTecnica';

export default function CoopSolar() {
  const [kw, setKw] = useState(300);
  const [familias, setFamilias] = useState(60);
  const [autoconsumo, setAutoconsumo] = useState(0.8);

  const r = calcSolar({ potenciaKw: kw, familias, fatorAutoconsumo: autoconsumo, paybackAnos: 6 });

  return (
    <section className="section page-top">
      <div className="wrap">
        <SectionHead
          kicker="Simulador"
          title="Cooperativa solar"
          lede={
            <>
              Um parque fotovoltaico financiado por estado, banco de desenvolvimento ou fundo
              climático, administrado por uma cooperativa, atendendo famílias, pequenos produtores e
              agroindústria. A hipótese: energia mais barata → competitividade → desenvolvimento
              regional → menos emissões.
            </>
          }
        >
          <div className="meta">
            <NatureTag kind="estimativa" />
            <span className="chip" style={{ cursor: 'default' }}>Marco: Lei 14.300/2022 (geração compartilhada)</span>
          </div>
        </SectionHead>

        <div style={{ marginBottom: 24 }}>
          <FlowDiagram steps={['Financiamento', 'Infraestrutura solar', 'Cooperativa administra', 'Energia p/ famílias e produtores', 'Custo menor', 'Desenvolvimento regional', 'Emissões evitadas']} label="Fluxo da cooperativa solar" />
        </div>

        <div className="sim">
          <div className="sim-controls">
            <h3 className="ctl-group">Configuração</h3>
            <SliderCtl label="Potência instalada" value={kw} min={10} max={5000} step={10} unit="kWp" onChange={setKw} />
            <SliderCtl label="Famílias/unidades atendidas" value={familias} min={5} max={2000} step={5} onChange={setFamilias} />
            <SliderCtl label="Fator de autoconsumo" value={autoconsumo} min={0.2} max={1} step={0.05} onChange={setAutoconsumo} format={(v) => `${Math.round(v * 100)}%`} />
            <NatureTag kind="estimativa" />
          </div>

          <div className="sim-results">
            <div className="grid grid--2">
              <ResultCard label="Produção anual" value={`${fmtNum(r.producaoAnual)} kWh`} kind="green" hint="Produtividade média Brasil (kWh/kWp/ano)" />
              <ResultCard label="Emissões potencialmente evitadas" value={fmtTons(r.tEvitadas)} kind="cyan" hint="Fator do SIN (t CO₂e/MWh)" />
              <ResultCard label="Investimento estimado" value={fmtMoney(r.investimento)} kind="amber" hint="R$/kWp referência 2024-25" />
              <ResultCard label="Economia anual estimada" value={`${fmtMoney(r.economiaAnual)}/ano`} kind="green" hint="Tarifa média residencial R$/kWh" />
            </div>
            <ResultCard label="Payback aproximado" value={Number.isFinite(r.payback) ? `${fmtNum(r.payback, 1)} anos` : '—'} kind="amber" hint="Sem contar financiamento, impostos e manutenção — simplificação educacional" />
            <ResultCard label="Energia equivalente por unidade" value={`${fmtNum(r.energiaPorFamilia)} kWh/ano`} kind="cyan" hint="Produção × autoconsumo ÷ unidades — apoio à irrigação e agroindústria" />

            <details className="callout callout--warn">
              <summary>Limitações e o que depende de política pública</summary>
              <p style={{ fontSize: '0.88rem' }}>
                O marco da geração distribuída (Lei 14.300/2022) viabiliza geração compartilhada, mas
                o desenho de <em>cooperativa solar com capital público</em> é <strong>proposta
                conceitual</strong>: exige regras de financiamento, modelo de negócio, governança e
                regulação tarifária. A simulação educa sobre a lógica; a viabilidade real é de
                engenharia e jurídica.
              </p>
            </details>

            <SourceList ids={[10, 26, 27, 9]} />
            <FichaTecnica
              premissas={[
                { k: 'Produtividade', v: '1.450 kWh/kWp/ano (média Brasil)' },
                { k: 'Custo instalado', v: 'R$ 4.200/kWp (referência 2024–25)' },
                { k: 'Fator do SIN', v: '0,10 t CO₂e/MWh (estimativa conservadora)' },
                { k: 'Tarifa residencial', v: 'R$ 0,80/kWh (média, simplificação)' },
                { k: 'Referência real', v: 'COOPESMA (RO) e 17 cooperativas em SC (5.080 cooperados) — Lei 14.300/2022' },
              ]}
              fontes={[10, 26, 27, 9, 44]}
              nota="Payback sem financiamento, impostos e manutenção. Modelo de cooperativa com capital público é proposta conceitual — exige engenharia, jurídico e governança."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

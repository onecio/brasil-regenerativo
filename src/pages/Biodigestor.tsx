import { useState } from 'react';
import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import FlowDiagram from '../components/FlowDiagram';
import { SliderCtl, ChipGroup, ResultCard } from '../components/Sim';
import { calcBiodigestor, BIOGAS_POR_ANIMAL } from '../utils/carbon';
import { fmtNum, fmtTons } from '../utils/format';
import { SourceList } from '../components/SourceRef';

export default function Biodigestor() {
  const [especie, setEspecie] = useState<'bovino' | 'suino' | 'frango'>('bovino');
  const [animais, setAnimais] = useState(50);
  const [dias, setDias] = useState(300);
  const [ch4, setCh4] = useState(60);

  const r = calcBiodigestor({ especie, animais, diasUso: dias, ch4Percent: ch4 });

  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          kicker="Simulador"
          title="Biodigestor popular — transforme metano em energia"
          lede={
            <>
              Dejetos animais emitem metano (CH₄), um gás ~28× mais potente que o CO₂. Um biodigestor
              captura esse gás para gerar energia e biofertilizante. Estimativas com fatores de
              literatura — projeto real exige engenharia e, para crédito, metodologia e MRV.
            </>
          }
        />

        <div style={{ marginBottom: 24 }}>
          <FlowDiagram steps={['Dejetos', 'Biodigestor', 'Biogás (CH₄)', 'Energia + biofertilizante', 'Metano evitado', 'Possível projeto climático']} label="Fluxo do biodigestor" />
        </div>

        <div className="sim">
          <div className="sim-controls">
            <h3 style={{ marginTop: 0 }}>Configuração</h3>
            <ChipGroup label="Tipo de criação" value={especie} onChange={setEspecie}
              options={Object.entries(BIOGAS_POR_ANIMAL).map(([v, info]) => ({ value: v as 'bovino' | 'suino' | 'frango', label: info.label }))} />
            <SliderCtl label="Animais" value={animais} min={1} max={2000} step={1} onChange={setAnimais} />
            <SliderCtl label="Dias de operação/ano" value={dias} min={30} max={365} step={5} onChange={setDias} />
            <SliderCtl label="% metano no biogás" value={ch4} min={50} max={65} step={1} unit="%" onChange={setCh4} />
            <NatureTag kind="estimativa" />
          </div>

          <div className="sim-results">
            <ResultCard label="Biogás potencial" value={`${fmtNum(r.biogasAno)} m³/ano`} kind="green" hint="Com base em m³/animal/dia da literatura" />
            <ResultCard label="Metano evitado" value={`${fmtNum(r.kgCH4)} kg CH₄/ano`} kind="cyan" hint={`≈ ${fmtTons(r.tCO2e)} de CO₂e (GWP 28)`} />
            <ResultCard label="Energia elétrica potencial" value={`${fmtNum(r.kWhEletricoAno)} kWh/ano`} kind="amber" hint="Estimativa térmica→elétrica; serve para bombeamento, ordenha, iluminação" />
            <ResultCard label="Biofertilizante potencial" value={`${fmtNum(r.fertilizanteLitro)} L/ano`} kind="green" hint="Digestato rico em N-P-K (estimativa educacional)" />

            <details className="callout" style={{ marginTop: 8 }}>
              <summary>Metodologia e limitações</summary>
              <p style={{ fontSize: '0.88rem' }}>
                Fatores de produção de biogás por animal variam com raça, dieta, manejo e clima; o
                cálculo usa faixas conservadoras de literatura (FAO/Embrapa). A energia depende do
                rendimento do gerador. Para virar <strong>projeto climático</strong>, seria preciso:
                metodologia aprovada (ex.: captura de metano de dejetos), adicionalidade, baseline,
                MRV e verificação — nada disso está implícito nesta simulação.
              </p>
            </details>

            <SourceList ids={[25, 4, 14]} />
          </div>
        </div>
      </div>
    </section>
  );
}

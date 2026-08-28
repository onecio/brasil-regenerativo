import { useState } from 'react';
import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import FlowDiagram from '../components/FlowDiagram';
import { SliderCtl, ResultCard } from '../components/Sim';
import { calcIncendio } from '../utils/carbon';
import { fmtTons, fmtMoney } from '../utils/format';
import { SourceList } from '../components/SourceRef';

export default function Incendios() {
  const [area, setArea] = useState(1000);
  const [tHa, setTHa] = useState(150);
  const [valorHa, setValorHa] = useState(300);
  const [anos, setAnos] = useState(5);

  const r = calcIncendio({ areaHa: area, tCO2ePorHaQueimada: tHa, valorAtivoPorHaAno: valorHa, anos });

  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          kicker="Cenário · Preservação"
          title="Quando a floresta em pé passa a ter valor econômico"
          lede={
            <>
              Se a renda de uma comunidade está vinculada à manutenção de uma área ambiental, há
              incentivo econômico para monitorar, abrir aceiros, formar brigadas, comunicar focos e
              prevenir queimadas. Compare: <strong>incêndio → perda</strong> versus{' '}
              <strong>prevenção → floresta preservada → renda mantida</strong>.
            </>
          }
        />

        <div style={{ marginBottom: 24 }}>
          <FlowDiagram steps={['Floresta em pé', 'Monitoramento + aceiros + brigada', 'Prevenção de focos', 'Ativo ambiental mantido', 'Renda e serviços ecossistêmicos']} label="Fluxo da prevenção" />
        </div>

        <div className="sim">
          <div className="sim-controls">
            <h3 style={{ marginTop: 0 }}>Configuração</h3>
            <SliderCtl label="Área sob risco" value={area} min={10} max={50000} step={10} unit="ha" onChange={setArea} />
            <SliderCtl label="Emissão por incêndio (t CO₂e/ha)" value={tHa} min={20} max={400} step={10} onChange={setTHa} />
            <SliderCtl label="Valor do ativo (R$/ha/ano)" value={valorHa} min={0} max={2000} step={25} onChange={setValorHa} />
            <SliderCtl label="Horizonte (anos)" value={anos} min={1} max={20} onChange={setAnos} />
            <NatureTag kind="cenario" />
          </div>

          <div className="sim-results">
            <ResultCard label="Emissão estimada se queimar" value={fmtTons(r.tEmitidas)} kind="red" hint="Uma única queimada na área — sem contar perda futura de estoque" />
            <ResultCard label="Perda de renda potencial" value={`${fmtMoney(r.perdaRenda)}`} kind="amber" hint="Renda anual vinculada à área preservada × horizonte" />
            <ResultCard label="Custo de prevenção (total)" value={`${fmtMoney(r.custoPrevencaoTotal)}`} kind="green" hint="Aceiros + brigada + monitoramento (R$/ha/ano estimado)" />

            <div className="card">
              <h3 style={{ marginTop: 0 }}>A lógica econômica</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
                {r.perdaRenda + r.tEmitidas * 60 > r.custoPrevencaoTotal
                  ? 'Neste cenário, o custo da prevenção é menor que a perda potencial — o incentivo econômico para proteger existe.'
                  : 'Neste cenário, o valor vinculado à floresta ainda é baixo frente ao custo — exatamente por isso políticas públicas (PSA, crédito, mercado) precisam elevar o valor da floresta em pé.'}
              </p>
            </div>

            <details className="callout callout--danger">
              <summary>Riscos e salvaguardas</summary>
              <p style={{ fontSize: '0.88rem' }}>
                Vincular renda à floresta exige cuidado: (1) não pode gerar exclusão de quem depende
                da área; (2) precisa de consentimento livre, prévio e informado (CLPI/Convenção 169
                OIT) quando povos tradicionais estiverem envolvidos; (3) contratos de PSA devem ter
                cláusulas de saída e renegociação; (4) nenhum pagamento substitui o dever do Estado
                de combater o fogo. O valor econômico é um complemento — nunca uma condição para a
                proteção.
              </p>
            </details>

            <SourceList ids={[29, 2, 3]} />
          </div>
        </div>
      </div>
    </section>
  );
}

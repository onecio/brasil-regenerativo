import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import FlowDiagram from '../components/FlowDiagram';
import { SourceList } from '../components/SourceRef';

const MATERIAIS = [
  { m: 'Papel', e: '📄', kgCO2e: '~1,8 kg CO₂e evitados/kg', src: 24 },
  { m: 'Plástico', e: '🧴', kgCO2e: '~2,5 kg CO₂e evitados/kg', src: 24 },
  { m: 'Alumínio', e: '🥫', kgCO2e: '~9 kg CO₂e evitados/kg', src: 24 },
  { m: 'Vidro', e: '🫙', kgCO2e: '~0,6 kg CO₂e evitados/kg', src: 24 },
  { m: 'Metais (aço)', e: '⚙️', kgCO2e: '~1,6 kg CO₂e evitados/kg', src: 24 },
  { m: 'Eletrônicos', e: '🔌', kgCO2e: 'depende do componente; evita extração e refino', src: 24 },
  { m: 'Orgânicos (compostagem)', e: '🍂', kgCO2e: '~0,5 kg CO₂e evitados/kg vs. aterro', src: 24 },
];

export default function Recicladores() {
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 960 }}>
        <SectionHead
          kicker="Economia circular · Resíduos"
          title="Resíduo é matéria-prima + clima + renda"
          lede={
            <>
              Catadores e cooperativas de reciclagem são a espinha dorsal da economia circular
              brasileira — e os maiores “agentes climáticos” invisíveis das cidades. Cada material
              recuperado evita emissões da produção virgem e do aterro.
            </>
          }
        />

        <FlowDiagram steps={['Material recuperado', 'Matéria-prima secundária', 'Energia e emissões evitadas', 'Economia circular', 'Renda']} label="Fluxo da reciclagem" />

        <h3 style={{ marginTop: 28 }}>Emissões evitadas por material (estimativa educacional)</h3>
        <div className="grid grid--3">
          {MATERIAIS.map((mat) => (
            <div className="card" key={mat.m}>
              <div style={{ fontSize: '1.5rem' }}>{mat.e}</div>
              <strong>{mat.m}</strong>
              <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--ink-soft)' }}>{mat.kgCO2e}</p>
            </div>
          ))}
          <div className="card" style={{ borderColor: 'var(--amber-500)' }}>
            <div style={{ fontSize: '1.5rem' }}>⚠️</div>
            <strong>Limite conceitual</strong>
            <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--ink-soft)' }}>
              Evitar emissão não gera crédito automaticamente. Metodologias para resíduos existem,
              mas o custo de certificação raramente compensa para cooperativas — aí está a
              oportunidade de política pública e MRV compartilhado.
            </p>
          </div>
        </div>

        <div className="card" style={{ marginTop: 24 }}>
          <h3 style={{ marginTop: 0 }}>O papel econômico de catadores e cooperativas</h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--ink-soft)' }}>
            No Brasil, a coleta seletiva ainda alcança parcela minoritária dos municípios e a
            reciclagem representa pequena fração dos resíduos gerados (ver Painel Brasil). Os
            catadores — em grande parte em situação de vulnerabilidade — realizam o serviço
            ambiental com pouca remuneração e quase nenhum reconhecimento climático. Políticas de
            inclusão produtiva, pagamento por serviço ambiental urbano e cooperativas fortalecidas
            são o caminho para que o resíduo vire renda <em>de quem faz</em>.
          </p>
          <NatureTag kind="proposta" />
        </div>

        <SourceList ids={[8, 24]} />
      </div>
    </section>
  );
}

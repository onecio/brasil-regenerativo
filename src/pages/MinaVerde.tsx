import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import { SourceList } from '../components/SourceRef';

const VALORES = [
  { e: '🌍', t: 'Ecológico', d: 'Clima, água, solo e biodiversidade em equilíbrio.' },
  { e: '🌡️', t: 'Climático', d: 'Floresta em pé estoca carbono e regula o clima regional.' },
  { e: '🪘', t: 'Cultural', d: 'Territórios de povos e comunidades: história, conhecimento e identidade.' },
  { e: '💧', t: 'Hídrico', d: 'Nascentes, rios voadores e segurança hídrica.' },
  { e: '🤝', t: 'Social', d: 'Trabalho, alimentação e modos de vida.' },
  { e: '💵', t: 'Econômico', d: 'Bioeconomia, PSA, turismo e — quando houver metodologia — carbono.' },
  { e: '🗺️', t: 'Territorial', d: 'Ordem fundiária e direito ao território.' },
];

export default function MinaVerde() {
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 960 }}>
        <SectionHead
          kicker="Conceito"
          title="A “mina verde” do Brasil"
          lede={
            <>
              O Brasil possui uma riqueza climática que não precisa ser extraída destruindo: ela
              cresce justamente quando recuperamos, preservamos e utilizamos melhor os recursos.
              Usamos a metáfora da mina com cuidado — biodiversidade não é mercadoria banal, e
              nenhum valor único define a floresta.
            </>
          }
        />

        <blockquote className="big-quote" style={{ margin: '20px 0' }}>
          “O Brasil possui uma riqueza climática que não precisa ser extraída destruindo: ela pode
          crescer justamente quando recuperamos, preservamos e utilizamos melhor os recursos.”
        </blockquote>

        <NatureTag kind="conceito" />

        <h3 style={{ marginTop: 28 }}>A floresta tem múltiplos valores — nenhum isolado</h3>
        <div className="grid grid--3">
          {VALORES.map((v) => (
            <div className="card" key={v.t}>
              <div style={{ fontSize: '1.4rem' }}>{v.e}</div>
              <strong>{v.t}</strong>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>{v.d}</p>
            </div>
          ))}
        </div>

        <details className="callout callout--warn" style={{ marginTop: 24 }}>
          <summary>Cuidado com a metáfora</summary>
          <p style={{ fontSize: '0.9rem' }}>
            “Mina verde” não pode virar desculpa para <strong>financeirizar a natureza</strong> sem
            salvaguardas. O valor econômico é um dos sete valores — e qualquer mecanismo de mercado
            precisa de direitos territoriais, consulta prévia (CLPI), repartição justa e proteção à
            biodiversidade. Sem isso, vira greenwashing.
          </p>
        </details>

        <div style={{ marginTop: 20 }}>
          <SourceList ids={[19, 20]} />
        </div>
      </div>
    </section>
  );
}

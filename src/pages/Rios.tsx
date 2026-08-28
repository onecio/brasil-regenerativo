import SectionHead from '../components/SectionHead';
import FlowDiagram from '../components/FlowDiagram';
import { SourceList } from '../components/SourceRef';

const COBENEFICIOS = [
  { e: '🐟', t: 'Biodiversidade', d: 'Rios recuperados abrigam peixes, aves e vegetação ciliar.' },
  { e: '💧', t: 'Água', d: 'Mais vazão, melhor qualidade e recarga de aquíferos.' },
  { e: '🛡️', t: 'Resiliência', d: 'Menos enchentes e secas extremas para quem mora perto.' },
  { e: '🏥', t: 'Saúde', d: 'Menos doenças de veiculação hídrica.' },
  { e: '🌾', t: 'Agricultura', d: 'Água para irrigação e solo mais estável.' },
  { e: '🎒', t: 'Turismo', d: 'Rios limpos atraem turismo de base comunitária.' },
];

export default function Rios() {
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 960 }}>
        <SectionHead
          kicker="Narrativa interativa"
          title="Recuperação de rios"
          lede={
            <>
              Um rio degradado pode voltar a ser um ativo para a cidade e o campo. O caminho:
              saneamento, mata ciliar, recuperação de nascentes e controle de resíduos. Os benefícios
              são múltiplos — e <strong>não dependem de crédito de carbono</strong> para valer a pena.
            </>
          }
        />

        <FlowDiagram steps={['Rio degradado', 'Saneamento + mata ciliar + nascentes', 'Recuperação ambiental', 'Benefícios ambientais', 'Economia local', 'Possíveis ativos ambientais']} label="Fluxo de recuperação do rio" />

        <div className="card" style={{ marginTop: 24, borderColor: 'var(--red-500)', borderLeft: '4px solid var(--red-500)' }}>
          <h3 style={{ marginTop: 0, color: 'var(--red-600)' }}>Regra de integridade climática</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
            <strong>Recuperação de rio não gera crédito de carbono automaticamente.</strong> Só
            existiria crédito com metodologia aprovada (ex.: redução de metano em esgoto/aterro,
            restauração de vegetação ciliar) e todo o processo de MRV. Aqui, o foco são os
            co-benefícios — que são enormes e independentes do mercado de carbono.
          </p>
        </div>

        <h3 style={{ marginTop: 24 }}>Co-benefícios</h3>
        <div className="grid grid--3">
          {COBENEFICIOS.map((c) => (
            <div className="card" key={c.t}>
              <div style={{ fontSize: '1.4rem' }}>{c.e}</div>
              <strong>{c.t}</strong>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>{c.d}</p>
            </div>
          ))}
        </div>

        <SourceList ids={[9, 2]} />
      </div>
    </section>
  );
}

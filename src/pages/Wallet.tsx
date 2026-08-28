import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import FlowDiagram from '../components/FlowDiagram';
import { SourceList } from '../components/SourceRef';

const ACOES = [
  'Caminhada e bicicleta',
  'Transporte coletivo e carona',
  'Reciclagem e compostagem',
  'Eficiência energética e energia solar',
  'Redução de desperdício e consumo circular',
];

const COMPONENTES = [
  { t: 'Identidade digital do cidadão', d: 'Conta única, opt-in, sem dado biométrico obrigatório.' },
  { t: 'Registro de ações verificáveis', d: 'APIs de transporte, comprovantes, sensores locais — antifraude sem vigilância.' },
  { t: 'Pontuação transparente', d: 'Fórmula pública de Pontos Climáticos, versionada e auditável.' },
  { t: 'Carteira de benefícios', d: 'Descontos, acesso e reconhecimento por parcerias públicas/privadas.' },
  { t: 'Painel de impacto', d: 'Agregados anônimos para a política pública saber se o programa funciona.' },
];

export default function Wallet() {
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <SectionHead
          kicker="Proposta de política pública"
          title="Programa Cidadão de Baixo Carbono — Carbon Wallet"
          lede={
            <>
              Um protótipo de política pública e aplicativo: transformar ações cotidianas mensuráveis
              em <strong>Pontos Climáticos</strong> — unidade educacional e de incentivo, não crédito
              de carbono.
            </>
          }
        />

        <FlowDiagram steps={['Cidadão', 'Ações mensuráveis', 'Pontos Climáticos', 'Benefícios e reconhecimento', 'Impacto coletivo']} label="Fluxo do programa" />

        <div style={{ marginTop: 28 }}>
          <h3>Que ações pontuar</h3>
          <div className="grid grid--2">
            {ACOES.map((a) => (
              <div className="card" key={a} style={{ padding: 14 }}>
                <strong>🌱 {a}</strong>
              </div>
            ))}
            <div className="card" style={{ padding: 14, borderColor: 'var(--amber-500)' }}>
              <strong style={{ color: 'var(--amber-600)' }}>⚠️ O que NÃO é pontuado</strong>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
                Nada que não seja mensurável e verificável. E os pontos jamais são vendidos como
                “créditos de carbono certificados”.
              </p>
            </div>
          </div>
        </div>

        <h3 style={{ marginTop: 28 }}>Componentes do programa</h3>
        <div className="grid grid--2">
          {COMPONENTES.map((c) => (
            <div className="card" key={c.t}>
              <strong>{c.t}</strong>
              <p style={{ margin: '4px 0 0', fontSize: '0.88rem', color: 'var(--ink-soft)' }}>{c.d}</p>
            </div>
          ))}
        </div>

        <details className="callout callout--warn" style={{ marginTop: 24 }}>
          <summary>Natureza jurídica e limites</summary>
          <p style={{ fontSize: '0.9rem' }}>
            Esta é uma <strong>proposta conceitual</strong>. Um programa nacional exigiria lei ou
            decreto, integração com sistemas públicos, avaliação de impacto (ANPD), orçamento e
            controle social. Os Pontos Climáticos são um instrumento educacional e de incentivo —
            <strong> não equivalem automaticamente a créditos de carbono negociáveis</strong>, que
            dependem de metodologia, MRV e registro.
          </p>
        </details>

        <div className="hero-cta" style={{ marginTop: 18 }}>
          <a className="btn btn--primary" href="#/app">Experimentar o app →</a>
          <a className="btn btn--ghost" href="#/privacidade">Privacidade Primeiro</a>
        </div>

        <div style={{ marginTop: 20 }}>
          <NatureTag kind="proposta" />
          <SourceList ids={[1, 19]} />
        </div>
      </div>
    </section>
  );
}

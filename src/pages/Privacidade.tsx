import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import { SourceList } from '../components/SourceRef';

const PRINCIPIOS = [
  { e: '📜', t: 'LGPD', d: 'Base legal clara (consentimento ou legítimo interesse), direitos do titular garantidos (acesso, correção, exclusão, portabilidade).' },
  { e: '✅', t: 'Consentimento', d: 'Opt-in explícito por finalidade; revogável a qualquer momento, com o mesmo esforço do aceite.' },
  { e: '🧹', t: 'Minimização de dados', d: 'Coletar apenas o necessário para a finalidade declarada — nada de “já que estamos aqui...”' },
  { e: '📱', t: 'Processamento local', d: 'Sensores e contadores podem ser processados no dispositivo, enviando apenas agregados.' },
  { e: '🎭', t: 'Anonimização / pseudonimização', d: 'Identificadores trocados por chaves; agregação antes de qualquer uso estatístico.' },
  { e: '⏳', t: 'Retenção limitada', d: 'Dados apagados após a finalidade; prazos definidos e auditáveis.' },
  { e: '🔍', t: 'Explicabilidade', d: 'A pessoa entende como o ponto foi calculado — nunca uma caixa-preta de “score”.' },
  { e: '🛡️', t: 'Antifraude', d: 'Detecção de GPS spoofing e sensores falsificados sem vigiar a pessoa.' },
  { e: '📢', t: 'Transparência', d: 'Regras de pontuação públicas, versionadas e auditáveis.' },
  { e: '🔎', t: 'Auditoria', d: 'Registros de acesso e decisões de pontuação passíveis de verificação externa.' },
];

const IA = [
  'GPS e acelerômetro → modo de mobilidade (caminhada, bike, coletivo)',
  'Registros de transporte e consumo energético (com comprovantes)',
  'Registros de reciclagem/compostagem validados por QR ou local',
  'APIs de transporte público e energia (dados abertos)',
  'Sensores de smartwatch (passos, atividade) — processados no aparelho',
];

export default function Privacidade() {
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <SectionHead
          kicker="CLIMATE AI"
          title="Privacidade Primeiro"
          lede={
            <>
              A arquitetura conceitual <strong>Climate AI</strong> correlacionaria dados de sensores e
              registros para <em>detectar ações de baixo carbono</em>. Isso só é aceitável com um
              desenho de privacidade desde a concepção — este é o contrato mínimo proposto.
            </>
          }
        />

        <NatureTag kind="conceito" />

        <h3 style={{ marginTop: 28 }}>Fontes de dados conceituais (com consentimento)</h3>
        <ul>
          {IA.map((i) => <li key={i}>{i}</li>)}
        </ul>

        <h3 style={{ marginTop: 32 }}>Princípios aplicados</h3>
        <div className="grid grid--2">
          {PRINCIPIOS.map((p) => (
            <div className="card" key={p.t} style={{ padding: 16 }}>
              <strong>{p.e} {p.t}</strong>
              <p style={{ margin: '4px 0 0', fontSize: '0.88rem', color: 'var(--ink-soft)' }}>{p.d}</p>
            </div>
          ))}
        </div>

        <details className="callout callout--danger" style={{ marginTop: 28 }}>
          <summary>O que esta demonstração NÃO faz</summary>
          <p style={{ fontSize: '0.9rem' }}>
            Não coleta, não envia e não armazena dados de localização, saúde ou comportamento. O
            protótipo roda 100% no navegador, com LocalStorage local. Qualquer versão real do
            Climate AI exigiria avaliação de impacto à proteção de dados (ANPD), DPIA, e revisão
            ética — especialmente por envolver populações vulneráveis.
          </p>
        </details>

        <SourceList ids={[19]} />
      </div>
    </section>
  );
}

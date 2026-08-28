import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import FlowDiagram from '../components/FlowDiagram';
import { SourceList } from '../components/SourceRef';

const CAMINHOS = [
  { e: '🌳', t: 'Sistemas agroflorestais', d: 'Árvores + culturas + criação; recupera solo e gera renda diversificada.' },
  { e: '🧑‍🌾', t: 'Agricultura familiar e orgânica', d: 'Base produtiva dos assentamentos; orgânicos têm prêmio de mercado.' },
  { e: '🔄', t: 'Restauração ecológica', d: 'Recuperar reserva legal e APP degradadas com nativas.' },
  { e: '🌱', t: 'Viveiros de mudas', d: 'Economia local que abastece restauração e SAFs.' },
  { e: '💧', t: 'Proteção de nascentes', d: 'Água para o assentamento e para jusante; PSA hídrico possível.' },
  { e: '🟫', t: 'Recuperação de solo', d: 'Adubação verde e manejo orgânico reconstroem o estoque de carbono.' },
];

export default function ReformaAgraria() {
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 960 }}>
        <SectionHead
          kicker="Cenário conceitual"
          title="Reforma agrária e recuperação ambiental"
          lede={
            <>
              Assentamentos da reforma agrária podem ser laboratórios de <strong>produção +
              recuperação ambiental + assistência técnica + financiamento + ativos ambientais</strong>.
              A combinação é uma proposta de política pública — não uma política em vigor.
            </>
          }
        />

        <FlowDiagram steps={['Produção', 'Recuperação ambiental', 'Assistência técnica', 'Financiamento', 'Ativos ambientais']} label="Combinação proposta" />

        <h3 style={{ marginTop: 28 }}>Caminhos conceituais</h3>
        <div className="grid grid--3">
          {CAMINHOS.map((c) => (
            <div className="card" key={c.t}>
              <div style={{ fontSize: '1.4rem' }}>{c.e}</div>
              <strong>{c.t}</strong>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>{c.d}</p>
            </div>
          ))}
        </div>

        <div className="compare" style={{ marginTop: 28 }}>
          <div className="compare-col compare-col--a">
            <h3>O que já existe</h3>
            <ul>
              <li>Assentamentos com acesso a Pronaf e crédito rural</li>
              <li>Programas de ATER (assistência técnica e extensão rural)</li>
              <li>PSA federal e estaduais; Floresta+ (em desenho contínuo)</li>
              <li>Projetos de restauração em assentamentos (universidades, ONGs, empresas)</li>
            </ul>
          </div>
          <div className="compare-col compare-col--b">
            <h3>O que seria necessário (proposta)</h3>
            <ul>
              <li>Linha específica de financiamento climático para assentamentos</li>
              <li>ATER com foco em SAF e restauração produtiva</li>
              <li>Regularização ambiental e fundiária como pré-requisito resolvido</li>
              <li>Arranjos cooperativos de PSA e (futuramente) mercados de carbono</li>
            </ul>
          </div>
        </div>

        <details className="callout callout--warn" style={{ marginTop: 24 }}>
          <summary>Diferença entre proposta e política existente</summary>
          <p style={{ fontSize: '0.9rem' }}>
            A plataforma distingue rigorosamente: crédito e ATER <em>existem</em>; a linha climática
            dedicada, a integração com PSA e o acesso a mercados de carbono em escala de assentamento
            são <strong>propostas</strong>. Nenhuma simulação aqui representa programa em vigor.
          </p>
        </details>

        <NatureTag kind="proposta" />
        <div style={{ marginTop: 12 }}>
          <SourceList ids={[7, 2, 3]} />
        </div>
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';
import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import FlowDiagram from '../components/FlowDiagram';

const CADEIA = [
  'Redução/remoção',
  'Projeto + metodologia',
  'Baseline e adicionalidade',
  'Monitoramento (MRV)',
  'Validação',
  'Verificação',
  'Registro e emissão',
  'Compra',
  'Aposentadoria',
];

const QUEM_FAZ = [
  { papel: 'Proponente (desenvolvedor)', quem: 'Empresa, cooperativa, comunidade ou intermediário que estrutura o projeto', custo: 'Estudo de viabilidade, metodologia, baseline', tag: 'dado' as const },
  { papel: 'Validador', quem: 'Entidade independente que confere o desenho do projeto contra a metodologia', custo: 'Taxa por validação', tag: 'dado' as const },
  { papel: 'Verificador', quem: 'Entidade independente que audita as medições reportadas', custo: 'Taxa por verificação (periódica)', tag: 'dado' as const },
  { papel: 'Registro', quem: 'Plataforma que emite e rastreia créditos (ex.: Verra, Gold Standard, ART)', custo: 'Taxas de registro e emissão', tag: 'dado' as const },
  { papel: 'Comprador', quem: 'Empresas com metas voluntárias ou obrigações futuras; intermediários e traders', custo: 'Preço por tCO₂e', tag: 'dado' as const },
  { papel: 'Comunidade/produtor', quem: 'Quem de fato conserva, planta ou reduz emissões no território', custo: 'Tempo, trabalho, riscos — nem sempre recebe parcela definida', tag: 'dado' as const },
];

export default function Problema() {
  return (
    <>
      <section className="section">
        <div className="wrap">
          <SectionHead
            kicker="Diagnóstico"
            title="A economia do clima é democrática?"
            lede={
              <>
                O mercado de carbono existe sobre uma cadeia de requisitos técnicos, jurídicos e
                financeiros. Cada elo dessa cadeia tem custo e exige capacidade — e é exatamente aí
                que pequenos produtores, povos tradicionais e cidadãos perdem espaço.
              </>
            }
          />

          <h3 style={{ marginTop: 12 }}>Da redução de carbono ao dinheiro — a cadeia econômica</h3>
          <FlowDiagram steps={CADEIA} label="Cadeia: da redução ao dinheiro" />
          <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>
            Cadeia conceitual baseada nos fluxos típicos dos padrões voluntários:{' '}
            <SourceRefCompat id={14} /> <SourceRefCompat id={15} /> <SourceRefCompat id={16} /> <SourceRefCompat id={17} />
          </div>

          <div style={{ marginTop: 40 }}>
            <h3>Quem faz o quê — e quem paga</h3>
            <div className="grid grid--2">
              {QUEM_FAZ.map((q) => (
                <article className="card" key={q.papel}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
                    <h4 style={{ margin: 0 }}>{q.papel}</h4>
                    <NatureTag kind={q.tag} />
                  </div>
                  <p style={{ fontSize: '0.9rem', margin: '8px 0 4px' }}>{q.quem}</p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', margin: 0 }}>
                    <strong>Custo típico:</strong> {q.custo}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 40 }}>
            <h3>Os conceitos que definem o jogo</h3>
            <table className="tbl">
              <thead>
                <tr><th scope="col">Conceito</th><th scope="col">O que é</th><th scope="col">Por que é barreira</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>Baseline</strong></td><td>Cenário de referência: o que aconteceria sem o projeto</td><td>Construí-lo exige dados e metodologia; manipulação do baseline é risco de integridade</td></tr>
                <tr><td><strong>Adicionalidade</strong></td><td>Provar que a redução não ocorreria sem o projeto</td><td>Teste complexo e caro; pequenos projetos têm menos capacidade de demonstrar</td></tr>
                <tr><td><strong>Permanência</strong></td><td>Garantir que a remoção não será revertida (ex.: incêndio)</td><td>Exige compromissos de décadas e buffers/seguros</td></tr>
                <tr><td><strong>MRV</strong></td><td>Monitoramento, relato e verificação das medições</td><td>Sensores, técnicos e auditorias têm custo fixo alto para escalas pequenas</td></tr>
                <tr><td><strong>Registro</strong></td><td>Emissão e rastreio do crédito, com numeração única</td><td>Taxas e exigências documentais; sem registro não há crédito negociável</td></tr>
                <tr><td><strong>Intermediários</strong></td><td>Consultorias, validadores, traders</td><td>Agregam valor, mas também custo e assimetria de informação</td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
              Leitura recomendada para aprofundamento: ICVCM Core Carbon Principles{' '}
              <SourceRefCompat id={13} /> e literatura crítica sobre adicionalidade e integridade —
              ver <Link to="/fontes">Fontes</Link>.
            </p>
          </div>

          <div className="compare" style={{ marginTop: 40 }}>
            <div className="compare-col compare-col--a">
              <h3>✓ O que já existe</h3>
              <ul>
                <li>Mercado voluntário operando no Brasil com padrões internacionais (Verra, Gold Standard, Plan Vivo, ART)</li>
                <li>PSA federal (Lei 14.119/2021) e estaduais; Floresta+</li>
                <li>RenovaBio (CBIOs) como mecanismo de descarbonização de combustíveis</li>
                <li>Mercado regulado em implantação: SBCE (Lei 15.042/2024)</li>
              </ul>
            </div>
            <div className="compare-col compare-col--b">
              <h3>✗ O que ainda é barreira</h3>
              <ul>
                <li>Custo e complexidade de certificação para escalas pequenas</li>
                <li>Titulação da terra e direitos territoriais não resolvidos em parte do território</li>
                <li>Repartição de benefícios nem sempre garantida a quem preserva</li>
                <li>Risco de greenwashing e dupla contagem sem regras claras</li>
                <li>Assimetria de informação e concentração em grandes players</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--deep">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <h2 style={{ fontSize: '1.8rem' }}>A tese desta plataforma</h2>
          <p style={{ color: '#c4d6cc', fontSize: '1.05rem' }}>
            O problema não é o mercado em si — é a <strong>arquitetura de acesso</strong>. Agregação,
            cooperativismo, MRV compartilhado, financiamento e tecnologia podem reduzir custos e
            redistribuir a cadeia. É isso que os simuladores desta plataforma exploram — com a
            honestidade de marcar o que é realidade, estimativa, cenário, proposta e conceito.
          </p>
          <Link className="btn btn--ghost" to="/escala">Ver a barreira da escala →</Link>
        </div>
      </section>
    </>
  );
}

function SourceRefCompat({ id }: { id: number }) {
  return <a className="src-ref" href={`#/fontes#f${String(id).padStart(3, '0')}`}>[FONTE {String(id).padStart(3, '0')}]</a>;
}

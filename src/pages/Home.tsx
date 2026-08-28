import { Link } from 'react-router-dom';
import FlowDiagram from '../components/FlowDiagram';
import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import { SourceList } from '../components/SourceRef';
import { PARTICIPANTES } from '../data/participacao';

const FLUXO = [
  'Emissões',
  'Redução',
  'Mensuração (MRV)',
  'Ativo ambiental',
  'Financiamento',
  'Renda',
  'Reinvestimento ambiental',
];

const TRILHAS = [
  { to: '/problema', emoji: '⚖️', titulo: 'O Problema', desc: 'A economia do clima é democrática? Diagnóstico de quem participa — e quem fica de fora.' },
  { to: '/escala', emoji: '📐', titulo: 'Barreira da escala', desc: 'Por que 1 propriedade não basta — e como agregação e cooperativas mudam o jogo.' },
  { to: '/agri-familiar', emoji: '🌱', titulo: 'Fazenda virtual', desc: 'Da terra à renda climática: monte uma fazenda e veja intervenções regenerativas.' },
  { to: '/biodigestor', emoji: '♻️', titulo: 'Biodigestor popular', desc: 'Transforme metano em energia, fertilizante e possível projeto climático.' },
  { to: '/cidade', emoji: '🏙️', titulo: 'Cidade regenerativa', desc: 'Vire prefeito por um dia e invista em uma cidade carbono positiva.' },
  { to: '/cooperativa', emoji: '🤝', titulo: 'Cooperativa climática', desc: 'Simule receita, custos e distribuição entre membros.' },
  { to: '/app', emoji: '📱', titulo: 'App Carbon Wallet', desc: 'Pontos climáticos por ações cotidianas — protótipo educacional.' },
  { to: '/pegada', emoji: '👣', titulo: 'Pegada de carbono', desc: 'Calcule sua pegada e crie o cenário “e se eu mudar?”.' },
  { to: '/mapa', emoji: '🗺️', titulo: 'Mapa do Brasil', desc: 'Biomas, oportunidades e camada social por estado.' },
  { to: '/painel', emoji: '📊', titulo: 'Painel Brasil', desc: 'Dashboard com dados observados: emissões, energia, resíduos.' },
  { to: '/mercados', emoji: '🏛️', titulo: 'Regulado × voluntário', desc: 'Como funcionam (e como ainda se regulamentam) os mercados no Brasil.' },
  { to: '/justica', emoji: '🕊️', titulo: 'Justiça climática', desc: 'Quem menos emite pode ser quem mais sofre.' },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <p className="kicker" style={{ color: 'var(--green-300)' }}>Plataforma demonstrativa · Economia climática popular</p>
          <h1>
            E se proteger o clima <span className="hl">também gerasse patrimônio</span>?
          </h1>
          <p className="sub">
            Bilhões são movimentados pela transição climática. Mas quem planta, conserva, recicla,
            recupera solos, protege rios e evita incêndios participa dessa riqueza?
          </p>
          <div className="hero-cta">
            <Link className="btn btn--primary btn--lg" to="/pegada">Calcular minha pegada</Link>
            <Link className="btn btn--ghost btn--lg" to="/problema">Entender o problema</Link>
            <Link className="btn btn--ghost btn--lg" to="/app">Abrir o app</Link>
          </div>
          <p className="hero-note">
            Tudo aqui é <strong>demonstração educacional e de políticas públicas</strong> — não é
            oferta de crédito de carbono nem promessa de renda. Cada simulação declara sua natureza:
            dado observado, estimativa, cenário, proposta ou conceito experimental.
          </p>
          <div style={{ marginTop: 44 }}>
            <FlowDiagram steps={FLUXO} label="Fluxo conceitual: da emissão ao reinvestimento" />
            <p style={{ fontSize: '0.78rem', color: '#93aa9e', marginTop: 10 }}>
              Fluxo conceitual simplificado. Cada etapa tem requisitos metodológicos, jurídicos e
              econômicos reais — veja{' '}
              <Link to="/tonelada" style={{ color: 'var(--green-300)' }}>Como nasce um crédito</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* QUEM PARTICIPA */}
      <section className="section" id="quem-participa">
        <div className="wrap">
          <SectionHead
            kicker="Diagnóstico"
            title="Quem participa da economia do carbono?"
            lede={
              <>
                A escala dos mercados de carbono esconde uma assimetria: quem emite em grande volume
                tem estrutura para acessar mercados; quem preserva em pequena escala — agricultores
                familiares, povos tradicionais, catadores, cidadãos — enfrenta barreiras de custo,
                escala, titulação e informação. Compare os perfis:
              </>
            }
          />
          <div className="grid grid--2">
            {PARTICIPANTES.map((p) => (
              <article className="card" key={p.nome}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                  <h3>{p.emoji} {p.nome}</h3>
                  <NatureTag kind={p.tag} />
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)' }}>{p.descricao}</p>
                <table className="tbl" aria-label={`Perfil ${p.nome}`}>
                  <tbody>
                    <tr><th scope="row">Escala típica</th><td>{p.escala}</td></tr>
                    <tr><th scope="row">Custo de entrada</th><td>{p.custoEntrada}</td></tr>
                    <tr><th scope="row">Principal barreira</th><td>{p.barreira}</td></tr>
                  </tbody>
                </table>
              </article>
            ))}
          </div>
          <SourceList ids={[7, 18, 13, 14]} />
        </div>
      </section>

      {/* TRILHAS */}
      <section className="section section--tint">
        <div className="wrap">
          <SectionHead
            kicker="Explore"
            title="Trilhas da plataforma"
            lede="Diagnósticos, simuladores, experiências e dados. Cada módulo declara o que é observado, estimado, proposto ou conceitual."
          />
          <div className="grid grid--3">
            {TRILHAS.map((t) => (
              <Link to={t.to} key={t.to} className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <h3 style={{ fontSize: '1.05rem' }}>{t.emoji} {t.titulo}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-soft)', margin: 0 }}>{t.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCÍPIO */}
      <section className="section section--deep">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <NatureTag kind="conceito" />
          <blockquote className="big-quote" style={{ margin: '18px 0' }}>
            “A transição climática somente será verdadeiramente transformadora se a conservação, a
            recuperação ambiental e a redução de emissões também forem capazes de gerar renda,
            patrimônio, inclusão econômica e melhoria da qualidade de vida para as populações que
            tradicionalmente permanecem fora dos grandes mercados ambientais.”
          </blockquote>
          <p style={{ color: '#b9c9c0' }}>
            Esta é a <strong>hipótese estruturante</strong> da plataforma — e ela é investigada
            criticamente, não assumida. Nem toda ação cotidiana vira crédito de carbono; nem todo
            projeto comunitário é viável nas regras atuais. A plataforma distingue o que já é
            permitido, o que ocorre no mercado voluntário, o que depende de regulamentação e o que é
            proposta ou conceito experimental.{' '}
            <Link to="/metodologia" style={{ color: 'var(--green-300)' }}>Como este projeto é feito →</Link>
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section">
        <div className="wrap" style={{ textAlign: 'center', maxWidth: 820 }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>O clima pode deixar de ser apenas um custo</h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: '1.1rem' }}>
            Cada floresta recuperada, tonelada reciclada, emissão evitada, solo regenerado, resíduo
            reaproveitado e fonte renovável também pode representar uma oportunidade de construir uma
            economia mais resiliente, produtiva e inclusiva.
          </p>
          <p className="big-quote" style={{ margin: '32px 0' }}>
            A pergunta não é apenas quanto carbono conseguimos reduzir.
            <br />
            É <span style={{ color: 'var(--green-600)' }}>quantas pessoas conseguimos incluir</span>{' '}
            na economia que surgirá dessa transformação.
          </p>
          <Link to="/mapa" className="btn btn--primary btn--lg">Explore o Brasil Regenerativo →</Link>
        </div>
      </section>
    </>
  );
}

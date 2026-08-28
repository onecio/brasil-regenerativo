import { Link } from 'react-router-dom';
import FlowDiagram from '../components/FlowDiagram';
import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import Reveal from '../components/Reveal';
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

const HERO_STATS = [
  { v: '2,145', u: 'Gt CO₂e', l: 'Emissões brutas do Brasil em 2024 (SEEG 13ª ed.)', src: 37 },
  { v: '3,9 mi', u: '', l: 'Estabelecimentos de agricultura familiar — 77% do total (Censo Agro 2017)', src: 39 },
  { v: '88,2%', u: '', l: 'Renováveis na matriz elétrica em 2024 (BEN 2025)', src: 40 },
  { v: '81 Mt', u: '/ano', l: 'Resíduos sólidos urbanos gerados; 41,5% ainda em destinação inadequada', src: 43 },
];

const TRILHAS = [
  { to: '/problema', t: 'O Problema', d: 'A economia do clima é democrática? Diagnóstico de quem participa — e quem fica de fora.' },
  { to: '/escala', t: 'Barreira da escala', d: 'Por que 1 propriedade não basta — e como agregação e cooperativas mudam o jogo.' },
  { to: '/agri-familiar', t: 'Fazenda virtual', d: 'Da terra à renda climática: monte uma fazenda e veja intervenções regenerativas.' },
  { to: '/biodigestor', t: 'Biodigestor popular', d: 'Transforme metano em energia, fertilizante e possível projeto climático.' },
  { to: '/cidade', t: 'Cidade regenerativa', d: 'Vire prefeito por um dia e invista em uma cidade carbono positiva.' },
  { to: '/cooperativa', t: 'Cooperativa climática', d: 'Simule receita, custos e distribuição entre membros — com governança transparente.' },
  { to: '/app', t: 'App Carbon Wallet', d: 'Pontos climáticos por ações cotidianas — protótipo educacional.' },
  { to: '/pegada', t: 'Pegada de carbono', d: 'Calcule sua pegada e crie o cenário “e se eu mudar?”.' },
  { to: '/mapa', t: 'Mapa do Brasil', d: 'Biomas, oportunidades e camada social por estado.' },
  { to: '/painel', t: 'Painel Brasil', d: 'Dashboard com dados observados: emissões, energia, resíduos, saneamento.' },
  { to: '/mercados', t: 'Regulado × voluntário', d: 'Como funcionam (e como ainda se regulamentam) os mercados no Brasil — e as críticas fundamentadas.' },
  { to: '/justica', t: 'Justiça climática', d: 'Quem menos emite pode ser quem mais sofre.' },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="kicker" style={{ color: 'var(--pine-300)' }}>Plataforma demonstrativa · Economia climática popular</p>
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
              Demonstração educacional e de políticas públicas — não é oferta de crédito de carbono
              nem promessa de renda. Cada simulação declara sua natureza: dado observado, estimativa,
              cenário, proposta ou conceito experimental.
            </p>
            <div style={{ marginTop: 34 }}>
              <FlowDiagram steps={FLUXO} label="Fluxo conceitual: da emissão ao reinvestimento" />
              <p style={{ fontSize: '0.76rem', color: '#8aa99b', marginTop: 10 }}>
                Fluxo conceitual simplificado — cada etapa tem requisitos metodológicos, jurídicos e
                econômicos reais. Veja <Link to="/tonelada" style={{ color: 'var(--pine-300)' }}>como nasce um crédito</Link>.
              </p>
            </div>
          </div>

          <Reveal delay={120}>
            <aside className="hero-panel" aria-label="Brasil em números">
              <h3>Brasil em números <span style={{ fontWeight: 400, color: '#9db8aa', fontSize: '0.78rem' }}>· dados observados</span></h3>
              {HERO_STATS.map((s) => (
                <div className="hero-stat" key={s.l}>
                  <span className="v">{s.v}<small>{s.u}</small></span>
                  <span className="l">{s.l}</span>
                </div>
              ))}
              <p style={{ fontSize: '0.72rem', color: '#8aa99b', margin: '14px 0 0' }}>
                Fontes no painel: <a style={{ color: 'var(--pine-300)' }} href="#/fontes#f037">SEEG</a> ·{' '}
                <a style={{ color: 'var(--pine-300)' }} href="#/fontes#f039">IBGE</a> ·{' '}
                <a style={{ color: 'var(--pine-300)' }} href="#/fontes#f040">EPE</a> ·{' '}
                <a style={{ color: 'var(--pine-300)' }} href="#/fontes#f043">ABREMA</a>
              </p>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* QUEM PARTICIPA */}
      <section className="section" id="quem-participa">
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.4fr', gap: 48, alignItems: 'start' }}>
            <Reveal>
              <div style={{ position: 'sticky', top: 100 }}>
                <SectionHead
                  kicker="Diagnóstico"
                  title="Quem participa da economia do carbono?"
                  lede={
                    <>
                      A escala dos mercados esconde uma assimetria: quem emite em grande volume tem
                      estrutura para acessá-los; quem preserva em pequena escala — agricultores
                      familiares, povos tradicionais, catadores, cidadãos — enfrenta barreiras de
                      custo, escala, titulação e informação.
                    </>
                  }
                />
                <SourceList ids={[7, 18, 13, 14]} />
              </div>
            </Reveal>
            <div>
              {PARTICIPANTES.map((p, i) => (
                <Reveal key={p.nome} delay={i * 40}>
                  <article style={{ padding: '22px 6px', borderBottom: '1px solid var(--line)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
                      <h3 style={{ margin: 0, fontSize: '1.12rem' }}>
                        <span className="mono" style={{ color: 'var(--pine-500)', fontSize: '0.8rem', marginRight: 12 }}>{String(i + 1).padStart(2, '0')}</span>
                        {p.emoji} {p.nome}
                      </h3>
                      <NatureTag kind={p.tag} />
                    </div>
                    <p style={{ margin: '0 0 10px', color: 'var(--ink-2)', fontSize: '0.95rem' }}>{p.descricao}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      <span className="chip" style={{ cursor: 'default', fontSize: '0.76rem', padding: '5px 12px' }}>Escala: {p.escala}</span>
                      <span className="chip" style={{ cursor: 'default', fontSize: '0.76rem', padding: '5px 12px' }}>Custo de entrada: {p.custoEntrada}</span>
                      <span className="chip" style={{ cursor: 'default', fontSize: '0.76rem', padding: '5px 12px' }}>Barreira: {p.barreira}</span>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRILHAS */}
      <section className="section section--tint">
        <div className="wrap">
          <Reveal>
            <SectionHead
              kicker="Explore"
              title="Trilhas da plataforma"
              lede="Diagnósticos, simuladores, experiências e dados. Cada módulo declara o que é observado, estimado, proposto ou conceitual."
            />
          </Reveal>
          <Reveal>
            <div className="editorial-list">
              {TRILHAS.map((t, i) => (
                <Link to={t.to} key={t.to}>
                  <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <span className="t">{t.t}</span>
                    <span className="d">{t.d}</span>
                  </span>
                  <span className="arr" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRINCÍPIO */}
      <section className="section section--deep">
        <div className="wrap" style={{ maxWidth: 880 }}>
          <Reveal>
            <NatureTag kind="conceito" />
            <blockquote className="big-quote" style={{ margin: '22px 0 18px' }}>
              “A transição climática somente será verdadeiramente transformadora se a conservação, a
              recuperação ambiental e a redução de emissões também forem capazes de gerar{' '}
              <span style={{ color: 'var(--pine-300)' }}>renda, patrimônio, inclusão econômica e
              melhoria da qualidade de vida</span> para as populações que tradicionalmente permanecem
              fora dos grandes mercados ambientais.”
            </blockquote>
            <p style={{ color: '#9db8aa' }}>
              Esta é a <strong style={{ color: '#dcebe3' }}>hipótese estruturante</strong> — e ela é
              investigada criticamente, não assumida. Nem toda ação cotidiana vira crédito de
              carbono; nem todo projeto comunitário é viável nas regras atuais. A plataforma
              distingue o que já é permitido, o que ocorre no mercado voluntário, o que depende de
              regulamentação e o que é proposta ou conceito experimental.{' '}
              <Link to="/metodologia" style={{ color: 'var(--pine-300)' }}>Como este projeto é feito →</Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section">
        <div className="wrap" style={{ textAlign: 'center', maxWidth: 840 }}>
          <Reveal>
            <h2 style={{ fontSize: 'clamp(1.9rem, 4.2vw, 2.9rem)', fontWeight: 800 }}>O clima pode deixar de ser apenas um custo</h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.12rem' }}>
              Cada floresta recuperada, tonelada reciclada, emissão evitada, solo regenerado,
              resíduo reaproveitado e fonte renovável também pode representar uma oportunidade de
              construir uma economia mais resiliente, produtiva e inclusiva.
            </p>
            <p className="big-quote" style={{ margin: '34px 0' }}>
              A pergunta não é apenas quanto carbono conseguimos reduzir.
              <br />
              É <span style={{ color: 'var(--pine-600)' }}>quantas pessoas conseguimos incluir</span>{' '}
              na economia que surgirá dessa transformação.
            </p>
            <Link to="/mapa" className="btn btn--primary btn--lg">Explore o Brasil Regenerativo →</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

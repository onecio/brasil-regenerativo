import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import { SourceList } from '../components/SourceRef';

const TELAS = [
  { id: 'co2', emoji: '🌱', titulo: 'CO₂ evitado hoje', valor: '1,2 kg', sub: 'estimativa' },
  { id: 'bike', emoji: '🚲', titulo: 'Bicicleta', valor: '6,4 km', sub: 'hoje' },
  { id: 'passos', emoji: '🚶', titulo: 'Passos', valor: '8.240', sub: 'hoje' },
  { id: 'acoes', emoji: '♻️', titulo: 'Ações sustentáveis', valor: '3', sub: 'reciclagem · compostagem · coletivo' },
  { id: 'arvores', emoji: '🌳', titulo: 'Árvores equivalentes', valor: '0,02', sub: 'indicador educacional' },
  { id: 'pontos', emoji: '💰', titulo: 'Pontos climáticos', valor: '1.240', sub: 'Carbon Wallet' },
];

export default function Smartwatch() {
  return (
    <section className="section">
      <div className="wrap" style={{ textAlign: 'center' }}>
        <SectionHead
          kicker="Protótipo"
          title="Smartwatch do clima"
          lede={
            <>
              Mockup interativo: o mesmo ecossistema em um relógio. Os valores são estáticos para
              demonstração — a interação real exigiria sensores, consentimento e processamento
              local (LGPD).
            </>
          }
        />

        <div className="watch">
          <div className="watch-screen">
            {TELAS.map((t, i) => (
              <div key={t.id} style={{ display: i === 0 ? 'block' : 'none' }}>
                <div style={{ fontSize: '1.6rem' }}>{t.emoji}</div>
                <div style={{ fontSize: '0.62rem', color: '#7fd0ac', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '4px 0' }}>{t.titulo}</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>{t.valor}</div>
                <div style={{ fontSize: '0.6rem', color: '#7fa693' }}>{t.sub}</div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
              {TELAS.map((t, i) => (
                <span key={t.id} style={{ width: 6, height: 6, borderRadius: '50%', background: i === 0 ? '#7fd0ac' : 'rgba(255,255,255,.2)' }} />
              ))}
            </div>
          </div>
        </div>

        <p style={{ maxWidth: 620, margin: '18px auto 0', color: 'var(--ink-soft)', fontSize: '0.9rem' }}>
          ⚠️ <strong>“Árvores equivalentes” é apenas um indicador educacional</strong>: a absorção de
          CO₂ varia enormemente por espécie, bioma e idade — nunca apresentamos isso como medição
          científica. Clique em “alternar telas” para ver as telas conceituais (a demonstração alterna
          automaticamente em animação).
        </p>

        <NatureTag kind="conceito" />
        <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginTop: 8 }}>
          {TELAS.map((t) => t.titulo).join(' · ')}
        </p>

        <div className="hero-cta" style={{ justifyContent: 'center' }}>
          <a className="btn btn--primary" href="#/app">Abrir o app completo →</a>
          <a className="btn btn--ghost" href="#/privacidade">Privacidade Primeiro</a>
        </div>

        <div style={{ marginTop: 24 }}>
          <SourceList ids={[21, 22]} />
        </div>
      </div>
    </section>
  );
}

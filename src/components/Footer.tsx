import { Link } from 'react-router-dom';

const COLUMNS: { title: string; links: { to: string; label: string }[] }[] = [
  {
    title: 'Explorar',
    links: [
      { to: '/problema', label: 'A economia do clima é democrática?' },
      { to: '/escala', label: 'A barreira da escala' },
      { to: '/justica', label: 'Justiça climática' },
      { to: '/mercados', label: 'Regulado × voluntário' },
      { to: '/tonelada', label: 'O que é 1 tonelada?' },
    ],
  },
  {
    title: 'Simuladores',
    links: [
      { to: '/pegada', label: 'Pegada de carbono' },
      { to: '/agri-familiar', label: 'Fazenda virtual' },
      { to: '/biodigestor', label: 'Biodigestor popular' },
      { to: '/coop-solar', label: 'Cooperativa solar' },
      { to: '/cidade', label: 'Cidade regenerativa' },
      { to: '/cooperativa', label: 'Cooperativa climática' },
      { to: '/politicas-10bi', label: 'R$ 10 bilhões' },
    ],
  },
  {
    title: 'Experiências',
    links: [
      { to: '/app', label: 'App Carbon Wallet' },
      { to: '/smartwatch', label: 'Smartwatch' },
      { to: '/jogo', label: 'Sua vida em carbono' },
      { to: '/marketplace', label: 'Marketplace' },
      { to: '/mapa', label: 'Mapa do Brasil' },
      { to: '/painel', label: 'Painel Brasil' },
    ],
  },
  {
    title: 'Documentação',
    links: [
      { to: '/fontes', label: 'Fontes e metodologia' },
      { to: '/metodologia', label: 'Como este projeto é feito' },
      { to: '/privacidade', label: 'Privacidade' },
      { to: '/distribuicao', label: 'Quem fica com o dinheiro?' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <p className="brand" style={{ color: '#eaf3ee', marginBottom: 10 }}>
              <svg className="logo" viewBox="0 0 40 40" aria-hidden="true" width="30" height="30">
                <circle cx="20" cy="20" r="19" fill="#11523d" />
                <path d="M20 6c6 5 10 10 10 17a10 10 0 0 1-20 0C10 16 14 11 20 6Z" fill="#3fb284" />
                <path d="M20 12c3 3 5 6 5 10a5 5 0 0 1-10 0c0-4 2-7 5-10Z" fill="#fbbf24" />
              </svg>
              Brasil Regenerativo
            </p>
            <p style={{ maxWidth: 340 }}>
              Demonstração interativa de como a transição climática pode virar renda, patrimônio e
              inclusão para quem hoje fica fora dos grandes mercados ambientais. Protótipo educacional
              e de políticas públicas — não é oferta de créditos de carbono.
            </p>
          </div>
          {COLUMNS.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h4 style={{ color: '#eaf3ee', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{c.title}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                {c.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <p style={{ marginTop: 32, fontSize: '0.78rem', color: '#7d9387' }}>
          Licença: código aberto (MIT). Conteúdo factual com fontes citadas — ver{' '}
          <Link to="/fontes">Fontes e metodologia</Link>. Nenhum dado aqui constitui recomendação de
          investimento ou certificação ambiental.
        </p>
      </div>
    </footer>
  );
}

import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const LINKS = [
  { to: '/', label: 'Início' },
  { to: '/problema', label: 'O Problema' },
  { to: '/mercados', label: 'Mercados' },
  { to: '/mapa', label: 'Mapa' },
  { to: '/painel', label: 'Painel' },
  { to: '/app', label: 'App' },
  { to: '/fontes', label: 'Fontes' },
];

export default function TopBar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="topbar">
      <div className="wrap topbar-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <svg className="logo" viewBox="0 0 40 40" aria-hidden="true">
            <defs>
              <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#177052" />
                <stop offset="1" stopColor="#0b3527" />
              </linearGradient>
            </defs>
            <rect x="1" y="1" width="38" height="38" rx="11" fill="url(#lg1)" />
            <path d="M20 7c5.6 4.6 9.2 9.4 9.2 15.6A9.2 9.2 0 0 1 20 31.8a9.2 9.2 0 0 1-9.2-9.2C10.8 16.4 14.4 11.6 20 7Z" fill="#3db487" />
            <path d="M20 13.5c2.8 2.7 4.6 5.5 4.6 9a4.6 4.6 0 0 1-9.2 0c0-3.5 1.8-6.3 4.6-9Z" fill="#fbbf24" />
          </svg>
          <span>Brasil Regenerativo</span>
        </Link>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? '✕' : '☰'}
        </button>
        <nav id="main-nav" className={`nav-links${open ? ' open' : ''}`} aria-label="Navegação principal">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

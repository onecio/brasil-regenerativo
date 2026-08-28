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
            <circle cx="20" cy="20" r="19" fill="#0b3d2e" />
            <path d="M20 6c6 5 10 10 10 17a10 10 0 0 1-20 0C10 16 14 11 20 6Z" fill="#3fb284" />
            <path d="M20 12c3 3 5 6 5 10a5 5 0 0 1-10 0c0-4 2-7 5-10Z" fill="#fbbf24" />
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

import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap" style={{ textAlign: 'center', padding: '60px 0' }}>
        <h1 style={{ fontSize: '3rem' }}>404</h1>
        <p>Esta trilha não existe no mapa regenerativo.</p>
        <Link className="btn btn--primary" to="/">Voltar ao início</Link>
      </div>
    </section>
  );
}

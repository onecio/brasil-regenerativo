import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SectionHead from '../components/SectionHead';
import { SOURCES } from '../data/sources';
import NatureTag from '../components/NatureTag';

export default function Fontes() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash]);

  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          kicker="Rastreabilidade"
          title="Fontes e metodologia"
          lede={
            <>
              Cada informação factual desta plataforma possui identificador{' '}
              <span className="mono">[FONTE nnn]</span> e link verificável. A regra do projeto é
              simples: <strong>nada de dados inventados</strong>; divergências entre estudos são
              apresentadas como divergência; itens não verificados são marcados{' '}
              <strong>[NÃO VERIFICADO]</strong> e não entram como fato.
            </>
          }
        />
        <p>
          <NatureTag kind="dado" />{' '}
          <span style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
            Status de verificação: fontes marcadas como pendentes aguardam checagem automática de URL
            (rotina do ciclo de validação). Nenhum dado publicado aqui depende de fonte não resolvível.
          </span>
        </p>
        <div style={{ marginTop: 24 }}>
          {SOURCES.map((s) => (
            <article
              key={s.id}
              id={`f${String(s.id).padStart(3, '0')}`}
              className="card"
              style={{ marginBottom: 12, scrollMarginTop: 90 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0, fontSize: '1rem' }}>
                  <span className="mono" style={{ color: 'var(--cyan-600)' }}>
                    [FONTE {String(s.id).padStart(3, '0')}]
                  </span>{' '}
                  {s.instituicao}
                </h3>
                <span className="mono" style={{ fontSize: '0.72rem', color: s.verificado ? 'var(--green-600)' : 'var(--amber-600)' }}>
                  {s.verificado ? '✓ URL verificada' : '⧗ verificação pendente'}
                </span>
              </div>
              <p style={{ margin: '8px 0 4px' }}>
                <strong>{s.titulo}</strong>
                {s.ano ? ` (${s.ano})` : ''}
              </p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
                <strong>Usada para:</strong> {s.info_utilizada}
              </p>
              <p style={{ margin: '6px 0 0', fontSize: '0.8rem' }}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">Abrir fonte ↗</a>
                <span className="mono" style={{ color: 'var(--ink-soft)' }}> · acessado em {s.data_acesso}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

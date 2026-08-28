import { SourceList } from './SourceRef';

/** Ficha técnica de simulador: premissas declaradas + fontes — estética observatório. */
export default function FichaTecnica({
  premissas,
  fontes,
  nota,
}: {
  premissas: { k: string; v: string }[];
  fontes?: number[];
  nota?: string;
}) {
  return (
    <details className="ficha">
      <summary>Ficha técnica — premissas e fontes</summary>
      <dl className="ficha-grid">
        {premissas.map((p) => (
          <div key={p.k}>
            <dt>{p.k}</dt>
            <dd>{p.v}</dd>
          </div>
        ))}
      </dl>
      {(fontes && fontes.length > 0 || nota) && (
        <div className="ficha-src">
          {nota && <p style={{ margin: '0 0 8px', fontSize: '0.85rem', color: 'var(--muted)' }}>{nota}</p>}
          {fontes && fontes.length > 0 && <SourceList ids={fontes} />}
        </div>
      )}
    </details>
  );
}

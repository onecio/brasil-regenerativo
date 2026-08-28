import { getSource } from '../data/sources';

/** Renderiza [FONTE nnn] como link para a página de fontes, com tooltip. */
export default function SourceRef({ id }: { id: number }) {
  const s = getSource(id);
  const label = `[FONTE ${String(id).padStart(3, '0')}]`;
  if (!s) return <span className="src-ref">{label}</span>;
  return (
    <a
      className="src-ref"
      href={`#/fontes#f${String(id).padStart(3, '0')}`}
      title={`${s.instituicao} — ${s.titulo} (${s.ano ?? 's.d.'})`}
    >
      {label}
    </a>
  );
}

/** Lista de fontes usadas em um componente, para renderizar no rodapé. */
export function SourceList({ ids }: { ids: number[] }) {
  const uniq = [...new Set(ids)].sort((a, b) => a - b);
  return (
    <p className="src-note">
      Fontes nesta seção:{' '}
      {uniq.map((id, i) => (
        <span key={id}>
          <SourceRef id={id} />
          {i < uniq.length - 1 ? ' · ' : ''}
        </span>
      ))}
    </p>
  );
}

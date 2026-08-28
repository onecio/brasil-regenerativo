import { useId } from 'react';

/** Fluxo animado: cadeia de etapas com setas. */
export default function FlowDiagram({
  steps,
  highlight,
  label,
}: {
  steps: string[];
  highlight?: number;
  label?: string;
}) {
  const id = useId();
  return (
    <div className="flow" role="list" aria-label={label ?? 'Fluxo'}>
      {steps.map((s, i) => (
        <span key={`${id}-${i}`} role="listitem" style={{ display: 'contents' }}>
          <span
            className="flow-node"
            style={
              highlight === i
                ? { borderColor: 'var(--amber-400)', color: '#fff', boxShadow: '0 0 0 3px rgba(251,191,36,.3)' }
                : undefined
            }
          >
            {s}
          </span>
          {i < steps.length - 1 && (
            <span className="flow-arrow" aria-hidden="true">
              →
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

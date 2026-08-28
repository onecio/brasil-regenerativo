import { useId } from 'react';

export function SliderCtl({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) {
  const id = useId();
  return (
    <div className="ctl">
      <label htmlFor={id}>
        <span>{label}</span>
        <output htmlFor={id}>
          {format ? format(value) : `${value.toLocaleString('pt-BR')}${unit ? ` ${unit}` : ''}`}
        </output>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

export function NumberCtl({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}) {
  const id = useId();
  return (
    <div className="ctl">
      <label htmlFor={id}>
        <span>{label}</span>
        <output htmlFor={id}>{value.toLocaleString('pt-BR')}{unit ? ` ${unit}` : ''}</output>
      </label>
      <input
        id={id}
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

export function ChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="ctl" role="group" aria-label={label}>
      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{label}</span>
      <div className="chip-row">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            className="chip"
            aria-pressed={value === o.value}
            onClick={() => onChange(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ResultCard({
  label,
  value,
  hint,
  kind = 'green',
}: {
  label: string;
  value: string;
  hint?: string;
  kind?: 'green' | 'amber' | 'cyan' | 'red' | 'plain';
}) {
  return (
    <div className="card" style={{ padding: 20 }}>
      <div style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {label}
      </div>
      <div className={`stat stat--${kind}`} style={{ fontSize: '1.7rem', marginTop: 6 }}>{value}</div>
      {hint && <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: 4 }}>{hint}</div>}
    </div>
  );
}

import type { ReactNode } from 'react';

export default function SectionHead({
  kicker,
  title,
  lede,
  children,
}: {
  kicker?: string;
  title: string;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="section-head">
      {kicker && <p className="kicker">{kicker}</p>}
      <h2>{title}</h2>
      {lede && <p>{lede}</p>}
      {children}
    </div>
  );
}

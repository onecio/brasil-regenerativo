export type NatureKind = 'dado' | 'estimativa' | 'cenario' | 'proposta' | 'conceito';

const LABEL: Record<NatureKind, string> = {
  dado: 'Dado observado',
  estimativa: 'Estimativa',
  cenario: 'Cenário',
  proposta: 'Proposta',
  conceito: 'Conceito experimental',
};

const TITLE: Record<NatureKind, string> = {
  dado: 'Informação proveniente de fonte verificada (ver Fontes).',
  estimativa: 'Resultado calculado a partir de fatores e premissas declaradas — não é medição.',
  cenario: 'Simulação econômica hipotética — não é promessa de resultado.',
  proposta: 'Política pública sugerida — não é política em vigor.',
  conceito: 'Ideia ainda não implementada — demonstração conceitual.',
};

export default function NatureTag({ kind }: { kind: NatureKind }) {
  return (
    <span className={`nature-tag nature-tag--${kind}`} title={TITLE[kind]} role="note">
      {LABEL[kind]}
    </span>
  );
}

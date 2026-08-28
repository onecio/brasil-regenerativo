import { useState } from 'react';
import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import { SliderCtl, ResultCard } from '../components/Sim';
import { fmtMoney, fmtPct } from '../utils/format';
import { SourceList } from '../components/SourceRef';

const RECEITA = 10_000_000; // R$ 10 mi

const PARTICIPANTES = [
  { id: 'comunidade', nome: 'Comunidade local (quem preserva)', pct: 30 },
  { id: 'produtor', nome: 'Produtores individuais', pct: 15 },
  { id: 'cooperativa', nome: 'Cooperativa (gestão)', pct: 10 },
  { id: 'desenvolvedor', nome: 'Desenvolvedor do projeto', pct: 15 },
  { id: 'certificacao', nome: 'Certificação', pct: 8 },
  { id: 'auditoria', nome: 'Auditoria/validação', pct: 5 },
  { id: 'risco', nome: 'Fundo de risco/garantia', pct: 7 },
  { id: 'governo', nome: 'Governo (taxas/registro)', pct: 5 },
  { id: 'investidor', nome: 'Investidor', pct: 5 },
];

export default function Distribuicao() {
  const [aloc, setAloc] = useState<Record<string, number>>(
    Object.fromEntries(PARTICIPANTES.map((p) => [p.id, p.pct])),
  );
  const total = Object.values(aloc).reduce((a, b) => a + b, 0);
  const preservadores = aloc.comunidade + aloc.produtor + aloc.cooperativa;

  function setPct(id: string, v: number) {
    setAloc((prev) => ({ ...prev, [id]: v }));
  }

  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          kicker="Simulador · Repartição de benefícios"
          title="Quem fica com o dinheiro?"
          lede={
            <>
              Um projeto gera <strong>{fmtMoney(RECEITA)}</strong> em receitas ambientais. Você decide
              a repartição. A pergunta central: <strong>quanto chega a quem realmente preserva?</strong>{' '}
              Este exercício estimula o debate sobre distribuição justa — um dos pontos mais sensíveis
              e menos transparentes dos mercados de carbono.
            </>
          }
        />

        <NatureTag kind="cenario" />
        <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
          Percentuais hipotéticos. Na prática, a repartição é definida em contratos, editais e
          marcos regulatórios — e deve ser pactuada com as comunidades (CLPI).
        </p>

        <div className="sim" style={{ marginTop: 20 }}>
          <div className="sim-controls">
            <h3 style={{ marginTop: 0 }}>Ajuste a divisão</h3>
            {PARTICIPANTES.map((p) => (
              <SliderCtl key={p.id} label={p.nome} value={aloc[p.id]} min={0} max={60} unit="%" onChange={(v) => setPct(p.id, v)} />
            ))}
            <div style={{ fontSize: '0.85rem', fontWeight: 700, marginTop: 8 }}>
              Total: {fmtPct(total)} {total !== 100 && <span style={{ color: 'var(--amber-600)' }}>(não fecha 100% — no mundo real isso vira negociação)</span>}
            </div>
            <NatureTag kind="cenario" />
          </div>

          <div className="sim-results">
            <ResultCard label="Receita total" value={fmtMoney(RECEITA)} kind="green" hint="Cenário de exemplo" />
            <ResultCard
              label="Chega a quem preserva"
              value={fmtMoney((preservadores / 100) * RECEITA)}
              kind={preservadores >= 50 ? 'green' : preservadores >= 30 ? 'amber' : 'red'}
              hint={`${fmtPct(preservadores)} para comunidade + produtores + cooperativa`}
            />
            <ResultCard label="Estrutura (certificação, auditoria, governo, investidor)" value={fmtMoney(((100 - preservadores) / 100) * RECEITA)} kind="amber" hint="Custos e capital — legítimos, mas precisam ser transparentes" />

            <div className="card">
              <h3 style={{ marginTop: 0 }}>Leitura</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
                {preservadores >= 50
                  ? 'Nesta divisão, a maior parte do valor fica no território — fortalece a tese de que o ativo ambiental vira desenvolvimento local.'
                  : preservadores >= 30
                    ? 'Divisão intermediária: há repasse ao território, mas boa parte do valor sai da comunidade. Questione onde está o custo e o risco.'
                    : 'Aqui, quem preserva fica com menos de 30% — um retrato de muitos arranjos reais. Por isso repartição justa exige regra explícita, não boa vontade.'}
              </p>
            </div>

            <details className="callout callout--warn">
              <summary>O que a literatura e os padrões dizem</summary>
              <p style={{ fontSize: '0.88rem' }}>
                Padrões como Plan Vivo e Gold Standard exigem evidência de repartição de benefícios e
                salvaguardas sociais. A Convenção 169 da OIT (ratificada pelo Brasil) exige consulta
                livre, prévia e informada quando há impacto sobre povos indígenas e tradicionais.
                Critérios de repartição justa (Fraser/Schlosberg — ver Metodologia) orientam o{' '}
                <a href="#/idc">Índice de Democratização do Carbono</a>.
              </p>
            </details>

            <SourceList ids={[17, 15, 20, 13]} />
          </div>
        </div>
      </div>
    </section>
  );
}

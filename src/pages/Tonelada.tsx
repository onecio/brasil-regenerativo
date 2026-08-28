import { useState } from 'react';
import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import FlowDiagram from '../components/FlowDiagram';
import { SliderCtl } from '../components/Sim';
import { fmtTons } from '../utils/format';
import { SourceList } from '../components/SourceRef';

const PASSO_CREDITO = [
  'Projeto',
  'Baseline',
  'Adicionalidade',
  'Metodologia',
  'Monitoramento',
  'Validação',
  'Verificação',
  'Registro',
  'Emissão',
  'Transferência',
  'Aposentadoria',
];

const DETALHES: Record<number, string> = {
  0: 'Um desenho concreto de atividade (reflorestamento, biodigestor, eficiência...) com área, donos e responsáveis definidos.',
  1: 'O cenário de referência: o que aconteceria sem o projeto. Tem que ser defensável e documentado.',
  2: 'Prova de que a redução/remoção não ocorreria no cenário “business as usual”.',
  3: 'O projeto segue uma metodologia aprovada pelo padrão (Verra, Gold Standard, ART...), com regras de cálculo e monitoramento.',
  4: 'Medições periódicas: sensores, imagens, amostragens — o M do MRV.',
  5: 'Auditoria independente do desenho do projeto contra a metodologia.',
  6: 'Auditoria independente das medições reportadas (o V do MRV), em ciclos.',
  7: 'Créditos entram no registro do padrão com numeração única (evita dupla contagem).',
  8: 'Créditos efetivamente emitidos em nome do proponente — só aqui existe ativo negociável.',
  9: 'Venda ou transferência para o comprador; rastreio contínuo no registro.',
  10: 'Crédito retirado de circulação após o uso na compensação de emissões — fim da vida do ativo.',
};

export default function Tonelada() {
  const [kmCarro, setKmCarro] = useState(10000);
  const [passo, setPasso] = useState<number | null>(null);

  const tCarro = kmCarro * 0.18 / 1000;

  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          kicker="Educação climática"
          title="O que é 1 tonelada de CO₂? E como nasce um crédito?"
          lede={
            <>
              Antes de falar de mercado, é preciso entender a unidade. 1 tonelada de CO₂e é um volume
              enorme de gás — e transformar “redução estimada” em “crédito certificado” é um processo
              longo, caro e rigoroso. Esta seção combate desinformação.
            </>
          }
        />

        <div className="sim" style={{ marginTop: 20 }}>
          <div className="sim-controls">
            <h3 style={{ marginTop: 0 }}>Quanto é 1 tonelada?</h3>
            <SliderCtl label="Km por ano de carro a gasolina" value={kmCarro} min={1000} max={40000} step={500} onChange={setKmCarro} />
            <NatureTag kind="estimativa" />
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', marginTop: 10 }}>
              Fator: ~0,18 kg CO₂e/km (faixa nacional). Ver Fontes.
            </p>
          </div>
          <div className="sim-results">
            <div className="card">
              <div className="stat stat--green">{fmtTons(tCarro)}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
                estimativa anual do seu cenário — isso é <strong>≈ 556 m³ de CO₂</strong>, um cubo de
                ~8,2 m de lado a pressão atmosférica.
              </div>
            </div>
            <div className="card">
              <h3>1 tonelada também é...</h3>
              <ul style={{ margin: 0, fontSize: '0.9rem' }}>
                <li>~5.500 km de carro a gasolina (estimativa)</li>
                <li>~1.500 kWh de eletricidade média do SIN (estimativa)</li>
                <li>~4.000 refeições onívoras médias? Não: ~1,1 ano de dieta onívora de 1 pessoa (2,5 kg/dia)</li>
                <li>≈ 1/4 do total anual per capita brasileiro — <strong>referência nacional ainda a confirmar nas Fontes</strong></li>
              </ul>
              <p style={{ fontSize: '0.78rem', color: 'var(--amber-600)' }}>
                Valores educacionais com fatores declarados. A “árvore que absorve X kg/ano” varia
                muito por espécie e bioma — usamos só como indicador conceitual, explicado.
              </p>
            </div>
          </div>
        </div>

        <h2 style={{ marginTop: 56 }}>Como nasce um crédito?</h2>
        <NatureTag kind="dado" />
        <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
          Cadeia típica dos padrões voluntários. Clique em cada etapa para detalhe.
        </p>
        <div style={{ marginTop: 16 }}>
          <FlowDiagram steps={PASSO_CREDITO} highlight={passo ?? undefined} label="Cadeia de nascimento de um crédito" />
        </div>
        <div style={{ marginTop: 20 }}>
          {PASSO_CREDITO.map((p, i) => (
            <button
              key={p}
              type="button"
              onClick={() => setPasso(passo === i ? null : i)}
              aria-expanded={passo === i}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                background: passo === i ? 'var(--green-100)' : 'transparent',
                border: '1px solid var(--line)',
                borderLeft: passo === i ? '4px solid var(--green-600)' : '4px solid var(--line)',
                borderRadius: 10,
                padding: '10px 16px',
                marginBottom: 8,
                cursor: 'pointer',
                font: 'inherit',
                color: 'inherit',
              }}
            >
              <strong>{i + 1}. {p}</strong>
              {passo === i && (
                <span style={{ display: 'block', fontSize: '0.88rem', color: 'var(--ink-soft)', marginTop: 6 }}>
                  {DETALHES[i]}
                </span>
              )}
            </button>
          ))}
        </div>

        <details className="callout callout--danger" style={{ marginTop: 28 }}>
          <summary>Redução estimada ≠ crédito certificado (§53)</summary>
          <p style={{ fontSize: '0.9rem' }}>
            <strong>Nunca</strong> trate “1 tonelada evitada” como “1 crédito emitido”. A redução é
            uma estimativa; o crédito é um ativo que depende de metodologia aprovada, validação,
            verificação, registro e emissão. Plataformas que pulam essa distinção geram greenwashing.
          </p>
        </details>

        <SourceList ids={[4, 13, 14, 15, 18, 20]} />
      </div>
    </section>
  );
}

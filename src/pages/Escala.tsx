import { useState } from 'react';
import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import FlowDiagram from '../components/FlowDiagram';
import { SliderCtl, ResultCard } from '../components/Sim';
import { fmtNum, fmtTons, fmtMoney } from '../utils/format';
import { SourceList } from '../components/SourceRef';
import FichaTecnica from '../components/FichaTecnica';

const NIVEIS = [
  { n: 1, label: '1 propriedade', desc: 'Pouca escala: custo fixo de MRV e certificação inviabiliza projeto isolado na maioria das metodologias.' },
  { n: 100, label: '100 propriedades', desc: 'Agregação: custos compartilhados começam a diluir; associação ou cooperativa estrutura o desenho.' },
  { n: 1000, label: '1.000 propriedades', desc: 'Projeto regional: escala suficiente para metodologia, MRV consolidado e financiamento dedicado.' },
  { n: 10000, label: '10.000 propriedades', desc: 'Infraestrutura climática territorial: governo e fundos passam a tratar a região como ativo estratégico.' },
];

export default function Escala() {
  const [propriedades, setPropriedades] = useState(1000);
  const [haPorProp, setHaPorProp] = useState(20);
  const [tPorHa, setTPorHa] = useState(3);
  const [custoFixo, setCustoFixo] = useState(250000);

  const area = propriedades * haPorProp;
  const tTotal = area * tPorHa;
  const custoPorT = tTotal > 0 ? custoFixo / tTotal : 0;
  const nivel = propriedades <= 100 ? 0 : propriedades <= 1000 ? 1 : propriedades <= 5000 ? 2 : 3;

  return (
    <section className="section page-top">
      <div className="wrap">
        <SectionHead
          kicker="Diagnóstico · Simulação"
          title="A barreira da escala"
          lede={
            <>
              Um pequeno produtor isolado enfrenta custos fixos de certificação, MRV e verificação
              que podem consumir toda a receita potencial. A resposta estrutural é{' '}
              <strong>agregação</strong>: cooperativa, MRV compartilhado, financiamento e tecnologia.
            </>
          }
        >
          <div className="meta">
            <NatureTag kind="cenario" />
          </div>
        </SectionHead>

        <NatureTag kind="cenario" />
        <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginTop: 8 }}>
          Simulação educacional com premissas ajustáveis. A viabilidade real dependerá da metodologia,
          do padrão e da regulamentação aplicável — e <strong>nenhum valor aqui é promessa de receita</strong>.
        </p>

        <div style={{ marginTop: 24 }}>
          <FlowDiagram
            steps={['1 propriedade\n→ pouca escala', '100 propriedades\n→ agregação', '1.000 propriedades\n→ projeto regional', '10.000 propriedades\n→ infraestrutura climática territorial']}
            label="Escala da agregação"
          />
        </div>

        <div style={{ marginTop: 32 }}>
          {NIVEIS.map((n, i) => (
            <div
              key={n.n}
              style={{
                borderLeft: nivel === i ? '4px solid var(--amber-500)' : '4px solid var(--line)',
                padding: '8px 16px',
                marginBottom: 10,
                background: nivel === i ? 'var(--amber-100)' : 'transparent',
                borderRadius: '0 10px 10px 0',
              }}
            >
              <strong>{n.label}</strong> — {n.desc}
            </div>
          ))}
        </div>

        <div className="sim" style={{ marginTop: 40 }}>
          <div className="sim-controls">
            <h3 style={{ marginTop: 0 }}>Simular agregação</h3>
            <SliderCtl label="Propriedades no arranjo" value={propriedades} min={1} max={10000} step={50} onChange={setPropriedades} />
            <SliderCtl label="Hectares por propriedade" value={haPorProp} min={2} max={200} onChange={setHaPorProp} />
            <SliderCtl label="t CO₂e por ha por ano" value={tPorHa} min={0.5} max={10} step={0.5} onChange={setTPorHa} />
            <SliderCtl label="Custo fixo anual (MRV+certificação+operação)" value={custoFixo} min={30000} max={1000000} step={10000} unit="R$" onChange={setCustoFixo} format={(v) => fmtMoney(v)} />
            <NatureTag kind="estimativa" />
          </div>
          <div className="sim-results">
            <ResultCard label="Área agregada" value={`${fmtNum(area)} ha`} kind="green" hint="Área total do arranjo (cenário)" />
            <ResultCard label="Potencial de redução/remoção" value={fmtTons(tTotal)} kind="cyan" hint="Estimativa anual com fatores declarados — não é crédito emitido (§53)" />
            <ResultCard label="Custo fixo por tonelada" value={`${fmtNum(custoPorT, 2)} R$/t`} kind="amber" hint="Quanto menor a escala, maior o custo por tonelada — o coração da barreira" />
            <div className="card">
              <h3>Leitura da simulação</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
                {nivel === 0 && 'Nesta escala, o custo fixo por tonelada costuma inviabilizar projeto isolado na maioria dos padrões — a agregação é o caminho estrutural.'}
                {nivel === 1 && 'Com agregação, os custos começam a se diluir. Uma associação ou cooperativa pode estruturar MRV compartilhado e assistência técnica.'}
                {nivel === 2 && 'Escala de projeto regional: o arranjo passa a ser atrativo para metodologias voluntárias e financiamento dedicado (BNDES, fundos, cooperativas de crédito).'}
                {nivel === 3 && 'Escala territorial: municípios, estados e fundos podem tratar a região como infraestrutura climática — com políticas públicas e contratos de longo prazo.'}
              </p>
            </div>
            <SourceList ids={[13, 14, 18, 7]} />
            <FichaTecnica
              premissas={[
                { k: 'Propriedades', v: '1 a 10.000 (ajustável)' },
                { k: 'Hectares/propriedade', v: '2 a 200' },
                { k: 'Redução/remoção', v: '0,5 a 10 t CO₂e/ha/ano' },
                { k: 'Custo fixo anual', v: 'R$ 30 mil a R$ 1 mi (MRV + certificação + operação)' },
              ]}
              fontes={[13, 14, 18, 7]}
              nota="A agregação reduz custo por tonelada, mas não garante metodologia aprovada, adicionalidade, preço ou repartição — cada elo depende de regras, padrão e negociação."
            />
          </div>
        </div>

        <details className="callout callout--warn" style={{ marginTop: 32 }}>
          <summary>Por que isso não é uma promessa de renda</summary>
          <p style={{ fontSize: '0.9rem' }}>
            A agregação reduz custos, mas <strong>não garante</strong>: (1) aprovação de metodologia
            para o tipo de atividade; (2) adicionalidade aceita; (3) preço de venda; (4) repartição
            justa. Cada um desses pontos depende de regulamentação, padrão e negociação. A simulação
            existe para educar sobre a lógica — não para prever resultado financeiro.
          </p>
        </details>
      </div>
    </section>
  );
}

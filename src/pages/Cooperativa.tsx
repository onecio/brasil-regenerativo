import { useState } from 'react';
import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import FlowDiagram from '../components/FlowDiagram';
import { SliderCtl, ChipGroup, ResultCard } from '../components/Sim';
import { calcCoop, PRECO_CARBONO_BRL } from '../utils/carbon';
import { fmtTons, fmtMoney } from '../utils/format';
import { SourceList } from '../components/SourceRef';
import FichaTecnica from '../components/FichaTecnica';

export default function Cooperativa() {
  const [membros, setMembros] = useState(200);
  const [ha, setHa] = useState(3000);
  const [tHa, setTHa] = useState(2.5);
  const [preco, setPreco] = useState<'conservador' | 'referencia' | 'otimista'>('referencia');
  const [mrv, setMrv] = useState(80000);
  const [cert, setCert] = useState(40000);
  const [oper, setOper] = useState(60000);
  const [reserva, setReserva] = useState(10);

  const r = calcCoop({ membros, hectares: ha, tCO2ePorHa: tHa, precoCenario: preco, custoMRVAno: mrv, custoCertificacaoAno: cert, custoOperacaoAno: oper, reservaPct: reserva });
  const p = PRECO_CARBONO_BRL[preco];

  return (
    <section className="section page-top">
      <div className="wrap">
        <SectionHead
          kicker="Simulador · Tese central"
          title="Cooperativa climática"
          lede={
            <>
              O caminho estrutural para democratizar o carbono: <strong>indivíduo → cooperativa →
              assistência técnica → MRV compartilhado → agregação → certificação → registro →
              mercado → receita → distribuição</strong>. Ajuste as premissas e veja cenários — sem
              nunca tratar estimativa como promessa financeira.
            </>
          }
        >
          <div className="meta">
            <NatureTag kind="cenario" />
            <span className="chip" style={{ cursor: 'default' }}>Preços parametrizáveis · 3 cenários</span>
          </div>
        </SectionHead>

        <div style={{ marginBottom: 24 }}>
          <FlowDiagram steps={['Indivíduo', 'Cooperativa', 'Assistência técnica', 'MRV', 'Agregação', 'Certificação', 'Registro', 'Mercado', 'Receita', 'Distribuição']} label="Cadeia cooperativa" />
        </div>

        <div className="sim">
          <div className="sim-controls">
            <h3 className="ctl-group">Premissas</h3>
            <SliderCtl label="Membros" value={membros} min={10} max={5000} step={10} onChange={setMembros} />
            <SliderCtl label="Hectares agregados" value={ha} min={50} max={50000} step={50} onChange={setHa} />
            <SliderCtl label="t CO₂e por ha/ano" value={tHa} min={0.2} max={10} step={0.1} onChange={setTHa} />
            <ChipGroup label="Cenário de preço" value={preco} onChange={setPreco}
              options={(Object.keys(PRECO_CARBONO_BRL) as (keyof typeof PRECO_CARBONO_BRL)[]).map((k) => ({ value: k, label: `${PRECO_CARBONO_BRL[k].label} (R$ ${PRECO_CARBONO_BRL[k].brl}/t)` }))} />
            <SliderCtl label="Custo MRV (R$/ano)" value={mrv} min={10000} max={500000} step={5000} format={(v) => fmtMoney(v)} onChange={setMrv} />
            <SliderCtl label="Custo certificação/auditoria (R$/ano)" value={cert} min={10000} max={300000} step={5000} format={(v) => fmtMoney(v)} onChange={setCert} />
            <SliderCtl label="Custo operação/gestão (R$/ano)" value={oper} min={10000} max={500000} step={5000} format={(v) => fmtMoney(v)} onChange={setOper} />
            <SliderCtl label="Reserva da cooperativa" value={reserva} min={0} max={40} unit="%" onChange={setReserva} />
            <NatureTag kind="cenario" />
          </div>

          <div className="sim-results">
            <ResultCard label="Volume potencial" value={fmtTons(r.tTotal)} kind="cyan" hint="Redução/remoção estimada agregada (não é crédito emitido)" />
            <ResultCard label="Receita bruta potencial" value={`${fmtMoney(r.receitaBruta)}/ano`} kind="green" hint={`Cenário ${p.label}: R$ ${p.brl}/tCO₂e`} />
            <ResultCard label="Custos totais" value={`${fmtMoney(r.custos)}/ano`} kind="amber" hint="MRV + certificação + operação" />
            <ResultCard label="Reserva" value={`${fmtMoney(r.reserva)}/ano`} kind="amber" hint={`${reserva}% da receita bruta — fundo da cooperativa`} />
            <ResultCard label="Receita distribuível" value={`${fmtMoney(r.distribuivel)}/ano`} kind="green" hint="Após custos e reserva" />
            <ResultCard label="Receita por membro" value={`${fmtMoney(r.porMembro)}/ano`} kind={r.porMembro > 0 ? 'green' : 'red'} hint="Distribuível ÷ membros — cenário, não garantia" />

            <div className="card">
              <h3 style={{ marginTop: 0 }}>Governança transparente</h3>
              <div style={{ fontSize: '0.88rem', fontFamily: 'var(--font-mono)', lineHeight: 1.9 }}>
                <div>Receita bruta ................ {fmtMoney(r.receitaBruta)}</div>
                <div>− MRV ........................ {fmtMoney(mrv)}</div>
                <div>− Certificação/auditoria ..... {fmtMoney(cert)}</div>
                <div>− Operação/gestão ............ {fmtMoney(oper)}</div>
                <div>− Reserva .................... {fmtMoney(r.reserva)}</div>
                <div style={{ borderTop: '1px solid var(--line)' }}>= Receita distribuível ......... <strong>{fmtMoney(r.distribuivel)}</strong></div>
              </div>
            </div>

            <details className="callout callout--warn">
              <summary>Não é promessa financeira</summary>
              <p style={{ fontSize: '0.88rem' }}>
                A receita depende de: aprovação de metodologia, adicionalidade, MRV aprovado,
                verificação, registro, preço real de mercado no momento da venda e contratos de
                repartição. Se qualquer elo falhar, a receita pode ser zero. A simulação existe para
                entender a estrutura de custos e a lógica de escala — não para prever ganho.
              </p>
            </details>

            <SourceList ids={[18, 13, 14, 15, 17]} />
            <FichaTecnica
              premissas={[
                { k: 'Redução/remoção', v: 't CO₂e/ha/ano ajustável (0,2–10)' },
                { k: 'Preço conservador', v: 'R$ 25/t CO₂e' },
                { k: 'Preço referência', v: 'R$ 60/t CO₂e' },
                { k: 'Preço otimista', v: 'R$ 120/t CO₂e' },
                { k: 'Custos', v: 'MRV + certificação/auditoria + operação (ajustáveis)' },
                { k: 'Reserva', v: 'Percentual da receita bruta retido pela cooperativa' },
              ]}
              fontes={[18, 13, 14, 15, 17]}
              nota="Faixas de preço baseadas no State and Trends of Carbon Pricing (Banco Mundial) e mercado voluntário. Nenhum valor é promessa: receita depende de metodologia, adicionalidade, MRV aprovado, verificação, registro e preço no momento da venda."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

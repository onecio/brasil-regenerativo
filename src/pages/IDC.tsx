import { useState } from 'react';
import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import { SliderCtl } from '../components/Sim';
import { SourceList } from '../components/SourceRef';

const DIMENSOES = [
  { id: 'participacao', nome: 'Participação local', desc: 'Comunidades decidem o desenho e a governança do projeto' },
  { id: 'renda', nome: 'Distribuição da renda', desc: 'Parcela da receita que permanece no território' },
  { id: 'entrada', nome: 'Custo de entrada', desc: 'Barreiras financeiras para pequenos atores participarem' },
  { id: 'governanca', nome: 'Governança', desc: 'Regras claras, representação e resolução de conflitos' },
  { id: 'transparencia', nome: 'Transparência', desc: 'Contratos, custos e repartição públicos e auditáveis' },
  { id: 'acesso', nome: 'Acesso financeiro', desc: 'Crédito, fundos garantidores e capital de giro' },
  { id: 'mulheres', nome: 'Participação feminina', desc: 'Inclusão e protagonismo de mulheres' },
  { id: 'tradicionais', nome: 'Comunidades tradicionais', desc: 'Respeito a direitos, CLPI e conhecimentos' },
  { id: 'pequenos', nome: 'Pequenos produtores', desc: 'Agricultura familiar e assentamentos' },
  { id: 'tecnologia', nome: 'Tecnologia', desc: 'MRV acessível e apropriada ao território' },
  { id: 'autonomia', nome: 'Autonomia', desc: 'Capacidade de negociar sem dependência de intermediários' },
  { id: 'beneficios', nome: 'Benefícios sociais', desc: 'Empregos, saúde, educação e segurança alimentar' },
];

const PESOS: Record<string, number> = {
  participacao: 9, renda: 10, entrada: 9, governanca: 8, transparencia: 8, acesso: 8,
  mulheres: 7, tradicionais: 9, pequenos: 9, tecnologia: 6, autonomia: 8, beneficios: 7,
};

export default function IDC() {
  const [notas, setNotas] = useState<Record<string, number>>(
    Object.fromEntries(DIMENSOES.map((d) => [d.id, 50])),
  );

  const ponderado = DIMENSOES.reduce((acc, d) => acc + notas[d.id] * PESOS[d.id], 0);
  const somaPesos = DIMENSOES.reduce((acc, d) => acc + PESOS[d.id], 0);
  const idc = Math.round(ponderado / somaPesos);

  const nivel = idc >= 75 ? 'Alta democratização' : idc >= 50 ? 'Média democratização' : idc >= 25 ? 'Baixa democratização' : 'Concentração alta';

  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          kicker="Indicador experimental"
          title="IDC — Índice de Democratização do Carbono"
          lede={
            <>
              Um indicador 0–100 para avaliar <em>quão democrático</em> é um arranjo de carbono:
              participação, renda, custo de entrada, governança, transparência, acesso financeiro,
              gênero, comunidades tradicionais, pequenos produtores, tecnologia, autonomia e
              benefícios sociais.
            </>
          }
        />

        <p style={{ fontSize: '0.85rem', color: 'var(--amber-600)', fontWeight: 600 }}>
          ⚠️ Indicador experimental desenvolvido para fins educacionais e de análise de políticas
          públicas — não é norma, certificação nem métrica oficial.
        </p>

        <div className="sim" style={{ marginTop: 20 }}>
          <div className="sim-controls">
            <h3 style={{ marginTop: 0 }}>Avalie as dimensões (0–100)</h3>
            {DIMENSOES.map((d) => (
              <SliderCtl key={d.id} label={`${d.nome} (peso ${PESOS[d.id]})`} value={notas[d.id]} min={0} max={100} step={5} onChange={(v) => setNotas((prev) => ({ ...prev, [d.id]: v }))} />
            ))}
            <NatureTag kind="conceito" />
          </div>

          <div className="sim-results">
            <div className="card" style={{ textAlign: 'center' }}>
              <div className="stat stat--green" style={{ fontSize: '4rem' }}>{idc}<small>/100</small></div>
              <div style={{ fontWeight: 700, color: idc >= 75 ? 'var(--green-600)' : idc >= 50 ? 'var(--amber-600)' : 'var(--red-500)' }}>{nivel}</div>
              <div className="meter" style={{ marginTop: 14 }} role="progressbar" aria-valuenow={idc} aria-valuemin={0} aria-valuemax={100} aria-label="IDC">
                <span style={{ width: `${idc}%` }} />
              </div>
            </div>
            <div className="card">
              <h3 style={{ marginTop: 0 }}>Como usar</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
                Aplique a um projeto real (público ou hipotético): quanto maior o IDC, maior a
                probabilidade de o arranjo gerar desenvolvimento local em vez de concentrar valor.
                Ajustar os sliders para <em>baixo</em> em “custo de entrada”, “participação” e
                “tradicionais” reproduz a fotografia de muitos projetos atuais — e mostra onde a
                política pública deveria intervir.
              </p>
            </div>
            <SourceList ids={[20, 17, 15, 13]} />
          </div>
        </div>
      </div>
    </section>
  );
}

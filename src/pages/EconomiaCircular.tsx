import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import FlowDiagram from '../components/FlowDiagram';
import { SourceList } from '../components/SourceRef';

export default function EconomiaCircular() {
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 960 }}>
        <SectionHead
          kicker="Economia circular total"
          title="Do resíduo ao produto, em ciclo"
          lede={
            <>
              A economia linear extrai, usa e descarta. A circular mantém o material em uso — e o
              orgânico vira energia e fertilizante em vez de metano. Visualize o ciclo completo.
            </>
          }
        />

        <FlowDiagram steps={['Resíduo', 'Reciclagem', 'Matéria-prima', 'Indústria', 'Produto', 'Consumidor', 'Coleta']} label="Ciclo da economia circular" />

        <div style={{ marginTop: 28 }}>
          <h3>O ciclo orgânico fechado</h3>
          <FlowDiagram steps={['Orgânicos', 'Biogás', 'Energia', 'Biofertilizante', 'Agricultura', 'Alimento']} label="Ciclo orgânico" />
        </div>

        <div className="grid grid--2" style={{ marginTop: 28 }}>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Por que circular importa para o clima</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
              Cada material reciclado substitui produção virgem (energia + mineração) e desvia
              resíduo do aterro (metano). Cada orgânico compostado/biodigerido evita CH₄. Estima-se
              que a economia circular possa reduzir emissões globais de forma significativa — o
              Painel Brasil mostra a fotografia nacional.
            </p>
          </div>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Por que importa para a renda</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
              Reciclagem e compostagem geram empregos locais, especialmente para catadores e
              cooperativas; reduzem custo de gestão de resíduos dos municípios; e criam insumos
              (biofertilizante, matéria-prima secundária) para cadeias locais.
            </p>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <NatureTag kind="dado" />
          <SourceList ids={[8, 24]} />
        </div>
      </div>
    </section>
  );
}

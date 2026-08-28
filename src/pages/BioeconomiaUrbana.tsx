import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import FlowDiagram from '../components/FlowDiagram';
import { SourceList } from '../components/SourceRef';

const FONTES_ORGANICOS = ['CEASA', 'Supermercados', 'Restaurantes', 'Feiras', 'Podas urbanas', 'Resíduos orgânicos domiciliares'];

export default function BioeconomiaUrbana() {
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 960 }}>
        <SectionHead
          kicker="Conceito · Bioeconomia urbana"
          title="A cidade como uma usina circular"
          lede={
            <>
              Uma cidade gera toneladas de resíduos orgânicos por dia. No lugar do aterro (metano →
              clima), a proposta: coletar, biodigerir/compostar e transformar em{' '}
              <strong>biogás + biometano + biofertilizante + energia</strong> — com renda e benefício
              climático.
            </>
          }
        />

        <FlowDiagram steps={['Orgânicos da cidade', 'Coleta', 'Biodigestor / compostagem', 'Biogás + biometano + biofertilizante', 'Menos metano', 'Renda + energia + clima']} label="Fluxo da usina circular" />

        <div className="card" style={{ marginTop: 24 }}>
          <h3 style={{ marginTop: 0 }}>Fontes de matéria orgânica</h3>
          <div className="chip-row">
            {FONTES_ORGANICOS.map((f) => <span key={f} className="chip" style={{ cursor: 'default' }}>{f}</span>)}
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginTop: 10 }}>
            O biometano pode abastecer frota municipal (ônibus e coleta); o biofertilizante fecha o
            ciclo com hortas urbanas e periurbanas — agricultura de proximidade.
          </p>
        </div>

        <div className="card" style={{ marginTop: 16 }}>
          <h3 style={{ marginTop: 0 }}>E hidrogênio de baixo carbono nesse contexto?</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
            Tecnicamente, o <strong>hidrogênio renovável</strong> a partir de biogás (reforma) ou
            eletricidade renovável é possível, mas a escala urbana de resíduos normalmente não
            justifica a cadeia de H₂ (alto custo de purificação, compressão e transporte) frente ao
            uso direto do biometano como combustível. Cenários de H₂ renovável no Brasil se apoiam
            mais em eletricidade eólica/solar de grande escala (ver diretrizes do PNH2 e EPE). A
            plataforma, portanto, apresenta o H₂ aqui <strong>apenas como cenário tecnicamente
            condicional</strong>, não como promessa.
          </p>
          <NatureTag kind="cenario" />
        </div>

        <SourceList ids={[8, 9, 25]} />
      </div>
    </section>
  );
}

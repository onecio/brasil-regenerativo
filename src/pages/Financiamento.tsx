import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import FlowDiagram from '../components/FlowDiagram';
import { SourceList } from '../components/SourceRef';

const MECANISMOS = [
  { e: '🏦', t: 'BNDES e bancos regionais', d: 'Linhas de crédito, fundos (Fundo Clima, Fundo Amazônia) e estruturação de projetos.' },
  { e: '🤝', t: 'Cooperativas de crédito', d: 'Acesso financeiro local para agricultores e cooperativas — capilaridade.' },
  { e: '🌍', t: 'Fundos climáticos', d: 'Nacionais e internacionais (GCF, fundos filantrópicos) com critérios de inclusão.' },
  { e: '📈', t: 'Mercado de capitais', d: 'Títulos verdes, CRA/CRI verdes, debêntures incentivadas de infraestrutura.' },
  { e: '🛡️', t: 'Fundos garantidores', d: 'Reduzem o risco para o financiador — peça-chave para pequenos atores.' },
  { e: '🔀', t: 'Blended finance', d: 'Capital concessional + privado para desbloquear projetos que sozinhos não fecham.' },
  { e: '🤝', t: 'PPP e concessões', d: 'Parcerias para infraestrutura verde urbana e rural.' },
  { e: '🏛️', t: 'Municípios, estados, União', d: 'Políticas, subsídios cruzados e compras públicas sustentáveis.' },
  { e: '🎓', t: 'Universidades e Embrapa', d: 'Assistência técnica, validação científica e formação.' },
];

export default function Financiamento() {
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 960 }}>
        <SectionHead
          kicker="Financiamento climático"
          title="Fundo climático revolvente e o mosaico de instrumentos"
          lede={
            <>
              Nenhum instrumento resolve sozinho. O desenho proposto combina fundos públicos,
              bancos de desenvolvimento, cooperativas de crédito, garantias e capital privado —
              com uma regra central: <strong>parte do resultado volta para financiar o próximo
              projeto</strong>.
            </>
          }
        />

        <FlowDiagram steps={['Fundo público / banco de desenvolvimento', 'Financia projeto climático', 'Economia / receita / ativos', 'Parcela retorna ao fundo', 'Próximo projeto']} label="Ciclo do fundo revolvente" />

        <h3 style={{ marginTop: 28 }}>Mosaico de instrumentos (proposta + realidade)</h3>
        <div className="grid grid--3">
          {MECANISMOS.map((m) => (
            <div className="card" key={m.t}>
              <div style={{ fontSize: '1.3rem' }}>{m.e}</div>
              <strong>{m.t}</strong>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>{m.d}</p>
            </div>
          ))}
        </div>

        <div className="compare" style={{ marginTop: 24 }}>
          <div className="compare-col compare-col--a">
            <h3>Existe hoje</h3>
            <ul>
              <li>Fundo Amazônia (doadores → BNDES → projetos)</li>
              <li>Fundo Clima (crédito a taxas favorecidas)</li>
              <li>RenovaBio e linhas verdes dos bancos públicos e privados</li>
              <li>Cooperativas de crédito atuando em energia e agro</li>
              <li>Títulos verdes corporativos e municipais</li>
            </ul>
          </div>
          <div className="compare-col compare-col--b">
            <h3>Proposta da plataforma</h3>
            <ul>
              <li>Regra explícita de retorno ao fundo (revolvência) com auditoria</li>
              <li>Critérios de democratização (IDC) nos desembolsos</li>
              <li>Fundo garantidor específico para pequenos produtores</li>
              <li>Blended finance com metas sociais verificáveis</li>
              <li>Compras públicas como âncora de demanda (ex.: biometano)</li>
            </ul>
          </div>
        </div>

        <NatureTag kind="proposta" />
        <div style={{ marginTop: 12 }}>
          <SourceList ids={[11, 9, 10, 18]} />
        </div>
      </div>
    </section>
  );
}

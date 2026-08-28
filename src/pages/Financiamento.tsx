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
            <h3>Existe hoje (verificado, 2025–2026)</h3>
            <ul>
              <li><strong>Fundo Clima 2025:</strong> R$ 12,55 bi aprovados em 199 operações (transição energética liderou; florestas ×13)</li>
              <li><strong>Fundo Amazônia 2025:</strong> mais de R$ 2 bi aprovados — maior volume anual da história</li>
              <li><strong>Floresta+ Amazônia:</strong> R$ 5,1 mi em PSA para 368 agricultores de 13 municípios do Amapá (mar/2026)</li>
              <li><strong>Decreto 13.018/2026:</strong> regulamenta a Lei 14.119/2021 (PSA) — CEPSA e Rede-PSA</li>
              <li><strong>ICMS Ecológico</strong> em 17 estados; critério ambiental obrigatório no IBS (R$ 5,3 bi → R$ 10,4 bi/ano)</li>
              <li><strong>Carbono comunitário indígena:</strong> Projeto Suruí (2009, VCS+CCB) — Natura comprou 120 mil tCO₂ em 2013; Fundo Suruí</li>
              <li><strong>Cooperativas de energia:</strong> COOPESMA (RO) e 17 cooperativas em SC (5.080 cooperados) sob a Lei 14.300/2022</li>
              <li><strong>Cooperativas de crédito:</strong> Sicoob com Pronaf Eco, Inovagro e aporte de US$ 70 mi do BID Invest (2025)</li>
              <li>RenovaBio (CBIOs) e linhas verdes dos bancos públicos e privados</li>
              <li>Títulos verdes corporativos e municipais; B3/ACX piloto de registro</li>
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
          <SourceList ids={[33, 34, 36, 30, 32, 10, 18, 49, 51, 44]} />
        </div>
      </div>
    </section>
  );
}

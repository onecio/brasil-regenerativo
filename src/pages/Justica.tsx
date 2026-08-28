import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import { SourceList } from '../components/SourceRef';

const RISCOS = [
  { emoji: '🌊', titulo: 'Enchentes', texto: 'Chuvas extremas atingem com mais força quem mora em áreas de risco — onde o custo do solo é menor e a infraestrutura é mais frágil.' },
  { emoji: '☀️', titulo: 'Secas e calor', texto: 'Onda de calor e seca afetam produção de alimentos, água e saúde; populações sem ar-condicionado e com trabalho exposto sofrem mais.' },
  { emoji: '🍲', titulo: 'Segurança alimentar', texto: 'Agricultura familiar é a base da alimentação brasileira — e é a mais exposta a eventos climáticos extremos sem seguro e sem crédito.' },
  { emoji: '🏚️', titulo: 'Habitação', texto: 'Moradias precárias, sem isolamento térmico, tornam o clima extremo um problema de saúde e de renda.' },
  { emoji: '🏥', titulo: 'Saúde', texto: 'Doenças transmitidas por vetores, problemas respiratórios e estresse térmico sobrecarregam quem tem menos acesso a serviços.' },
  { emoji: '🗺️', titulo: 'Desigualdade territorial', texto: 'Norte e Nordeste, que menos emitem historicamente, concentram a vulnerabilidade climática — enquanto o custo da transição é distribuído de forma desigual.' },
];

const DISTRIBUIR = [
  { item: 'Riscos', texto: 'Quem está mais exposto deve ter prioridade em adaptação, não o contrário.' },
  { item: 'Custos', texto: 'A transição não pode recair só sobre trabalhadores e pequenos produtores.' },
  { item: 'Oportunidades', texto: 'Empregos verdes, crédito e mercados devem chegar a quem hoje está fora.' },
  { item: 'Financiamento', texto: 'Recursos públicos e privados precisam de critérios explícitos de inclusão.' },
  { item: 'Benefícios', texto: 'A repartição de receitas ambientais deve ser pactuada com as comunidades, com transparência.' },
];

export default function Justica() {
  return (
    <>
      <section className="section page-top">
        <div className="wrap">
          <SectionHead
            kicker="Justiça climática"
            title="Quem menos emite pode ser quem mais sofre"
            lede={
              <>
                A desigualdade climática é dupla: quem menos contribuiu para o aquecimento global
                frequentemente é quem mais perde com enchentes, secas, calor extremo e instabilidade
                de alimentos. Justiça climática significa olhar para a distribuição de{' '}
                <strong>riscos, custos, oportunidades, financiamento e benefícios</strong> — não apenas
                para o total de toneladas reduzidas.
              </>
            }
          />
          <NatureTag kind="dado" />
          <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
            Enquadramento conceitual baseado na lente de justiça climática (Schlosberg; Fraser) usada
            na pesquisa acadêmica do autor — ver <a href="#/metodologia">Metodologia</a>.
          </p>

          <div className="grid grid--3" style={{ marginTop: 24 }}>
            {RISCOS.map((r) => (
              <article className="card" key={r.titulo}>
                <h3 style={{ fontSize: '1.05rem' }}>{r.emoji} {r.titulo}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', margin: 0 }}>{r.texto}</p>
              </article>
            ))}
          </div>

          <h3 style={{ marginTop: 44 }}>O que justiça climática exige distribuir</h3>
          <div className="grid grid--2">
            {DISTRIBUIR.map((d) => (
              <div className="card" key={d.item}>
                <h4 style={{ margin: 0, color: 'var(--green-700)' }}>{d.item}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', margin: '6px 0 0' }}>{d.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--deep">
        <div className="wrap" style={{ maxWidth: 840 }}>
          <h2 style={{ fontSize: '1.7rem' }}>Na prática, isso muda o desenho das políticas</h2>
          <p style={{ color: '#c4d6cc' }}>
            Um programa de PSA que exige titulação perfeita exclui quem mais preserva. Um mercado de
            carbono sem salvaguardas pode concentrar renda em vez de distribuí-la. Um fundo climático
            sem critério de inclusão financia sempre os mesmos. Por isso esta plataforma testa{' '}
            <strong>arranjos alternativos</strong> — cooperativas, fundos revolventes, MRV
            compartilhado, pontuação de democratização — e marca claramente o que é proposta e o que
            é conceito.
          </p>
          <div className="hero-cta">
            <a className="btn btn--ghost" href="#/distribuicao">Quem fica com o dinheiro? →</a>
            <a className="btn btn--ghost" href="#/idc">Índice de Democratização →</a>
          </div>
        </div>
      </section>
      <section className="section page-top">
        <div className="wrap">
          <SourceList ids={[19, 20]} />
        </div>
      </section>
    </>
  );
}

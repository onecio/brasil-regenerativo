import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import { SourceList } from '../components/SourceRef';

const REGRAS = [
  { titulo: '1. Dado observado', texto: 'Informação com fonte verificada (URL que resolve), citada com [FONTE nnn] e data de acesso.' },
  { titulo: '2. Estimativa', texto: 'Resultado calculado com fatores e premissas declarados. Todo simulador mostra suas premissas.' },
  { titulo: '3. Cenário', texto: 'Simulação econômica hipotética. Nunca é promessa de receita, preço ou resultado.' },
  { titulo: '4. Proposta', texto: 'Política pública sugerida — não é política em vigor nem compromisso de governo.' },
  { titulo: '5. Conceito experimental', texto: 'Ideia ainda não implementada, apresentada para debate e teste de hipóteses.' },
];

export default function Metodologia() {
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <SectionHead
          kicker="Transparência"
          title="Como este projeto é feito"
          lede="Metodologia, limites e integridade — as mesmas regras que orientam a pesquisa acadêmica do autor são aplicadas a esta demonstração pública."
        />

        <h3>Regras de integridade</h3>
        <div className="grid grid--2">
          {REGRAS.map((r) => (
            <div className="card" key={r.titulo}>
              <NatureTag kind={r.titulo === '1. Dado observado' ? 'dado' : r.titulo === '2. Estimativa' ? 'estimativa' : r.titulo === '3. Cenário' ? 'cenario' : r.titulo === '4. Proposta' ? 'proposta' : 'conceito'} />
              <h4 style={{ margin: '8px 0 4px' }}>{r.titulo}</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', margin: 0 }}>{r.texto}</p>
            </div>
          ))}
          <div className="card">
            <h4>Anti-alucinação</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', margin: 0 }}>
              Toda referência citada precisa ter URL resolvível verificada antes de entrar. Citação
              não verificada é removida ou marcada [NÃO VERIFICADO] — jamais publicada como fato.
            </p>
          </div>
          <div className="card">
            <h4>Divergências são divulgadas</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', margin: 0 }}>
              Quando estudos divergem (ex.: emissões por setor), a divergência é apresentada com as
              fontes — nunca escondida para tornar o argumento mais dramático.
            </p>
          </div>
        </div>

        <h3 style={{ marginTop: 40 }}>Ciclo de qualidade</h3>
        <p>
          Cada módulo passa por: pesquisar → modelar → desenvolver → testar → revisar conteúdo →
          validar dados → validar UX → validar segurança → corrigir → retestar. A pergunta de
          fechamento é sempre: <em>o dado está correto? a fonte existe? está claro o que é realidade e
          o que é proposta? há risco de greenwashing? o usuário entende? está acessível? está seguro?</em>
        </p>

        <h3 style={{ marginTop: 40 }}>Declaração de uso de IA</h3>
        <p style={{ fontSize: '0.92rem' }}>
          Este projeto é conduzido por um agente de IA (Hermes/Sentinel) sob direção e revisão do
          autor (Optimus, Pesquisador Principal). Nenhuma saída de IA entra como fato sem verificação
          na fonte primária; todo conteúdo factual passa pelo sistema de fontes desta página. O
          processo segue a Diretriz de Governança Científica do projeto de pesquisa do autor
          (integridade, rastreabilidade, versão, auditoria).
        </p>

        <h3 style={{ marginTop: 40 }}>Limitações declaradas</h3>
        <ul>
          <li>Simuladores usam fatores simplificados — não substituem engenharia, MRV ou due diligence.</li>
          <li>Cenários econômicos são educacionais; preços de carbono são parametrizáveis e datados.</li>
          <li>A fotografia normativa (leis, regulamentos) é datada e pode mudar — especialmente o SBCE.</li>
          <li>Esta plataforma não vende, não certifica e não intermedia créditos de carbono.</li>
        </ul>

        <SourceList ids={[19, 20]} />
      </div>
    </section>
  );
}

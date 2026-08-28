import { useState } from 'react';
import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import { ChipGroup } from '../components/Sim';
import { SourceList } from '../components/SourceRef';

function SourceRefCompat({ id }: { id: number }) {
  return <a className="src-ref" href={`#/fontes#f${String(id).padStart(3, '0')}`}>[FONTE {String(id).padStart(3, '0')}]</a>;
}

type Ctx = 'brasil' | 'intl';

const TABELAS: Record<Ctx, { dimensao: string; regulado: string; voluntario: string }[]> = {
  brasil: [
    { dimensao: 'Finalidade', regulado: 'Cumprir metas obrigatórias de redução (compliance) — SBCE em implantação', voluntario: 'Compensação voluntária de emissões; metas corporativas' },
    { dimensao: 'Base legal', regulado: 'Lei 15.042/2024 + decretos 12.677/2025 (SEMC) e 12.768/2025 (CTCP); regulamentação em curso', voluntario: 'Contratos privados; padrões internacionais (Verra, Gold Standard, ART, Plan Vivo)' },
    { dimensao: 'Participantes', regulado: 'Operadores >10.000 tCO₂e/ano (relato) e >25.000 tCO₂e/ano (conciliação); agropecuária primária fora', voluntario: 'Empresas, projetos, intermediários, ONGs — adesão voluntária' },
    { dimensao: 'Regras e fiscalização', regulado: 'CIM define tetos; órgão gestor (SEMC) regula e sanciona; CVM supervisiona o mercado de capitais', voluntario: 'Padrões privados; validação e verificação por terceiros' },
    { dimensao: 'Créditos/ativos', regulado: 'CBE (permissão de emissão) e CRVE (certificado de redução/remoção verificada)', voluntario: 'Créditos de carbono emitidos por padrão, com metodologia' },
    { dimensao: 'Registros', regulado: 'Registro Central do SBCE (a implementar)', voluntario: 'Registros dos padrões (Verra Registry, Gold Standard Registry...); B3/ACX em piloto' },
    { dimensao: 'Relação', regulado: 'CRVEs e créditos voluntários convertidos com restrições (arts. 42–44)', voluntario: 'Pode alimentar compliance se o SBCE aceitar; risco de dupla contagem sem ajustes' },
  ],
  intl: [
    { dimensao: 'Finalidade', regulado: 'Metas obrigatórias (EU ETS, California, China...)', voluntario: 'Compensação voluntária; mercados de atributos' },
    { dimensao: 'Base legal', regulado: 'Leis e regulamentos nacionais/regionais', voluntario: 'Padrões privados + CORSIA/Art. 6 em parte' },
    { dimensao: 'Preço (referência)', regulado: 'Definido por leilão/mercado (ex.: EU ETS)', voluntario: 'Negociado por projeto; faixas muito variáveis' },
    { dimensao: 'Regras e fiscalização', regulado: 'Autoridade pública', voluntario: 'Padrões privados; ICVCM/CCP e VCMI como governança de integridade' },
    { dimensao: 'Créditos/ativos', regulado: 'Permissões e offsets regulados', voluntario: 'Créditos VCS, GS, TREES etc.' },
    { dimensao: 'Registros', regulado: 'Registros oficiais', voluntario: 'Registros privados dos padrões' },
    { dimensao: 'Ajuste correspondente', regulado: 'n/a (doméstico)', voluntario: 'Exigido para uso em metas NDC de outro país (Art. 6)' },
  ],
};

export default function Mercados() {
  const [ctx, setCtx] = useState<Ctx>('brasil');

  return (
    <section className="section page-top">
      <div className="wrap">
        <SectionHead
          kicker="Como funcionam os mercados"
          title="Mercado regulado × mercado voluntário"
          lede={
            <>
              “Mercado de carbono” não é uma coisa só. Existem pelo menos dois arranjos com regras,
              finalidades e participantes diferentes — e o Brasil está implantando o seu sistema
              regulado enquanto o voluntário já opera há anos.
            </>
          }
        />

        <NatureTag kind="dado" />
        <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
          Fotografia normativa de {new Date().toLocaleDateString('pt-BR')} — o SBCE está em fase de
          regulamentação (consulta pública de MRV nº 1/2026 aberta em 28/07/2026; previsão de
          transação plena em 2030). Divergências entre fontes são anotadas em{' '}
          <a href="#/fontes">Fontes</a>.
        </p>

        <details className="callout" style={{ marginBottom: 20 }}>
          <summary>O que já é fato no Brasil (verificado em agosto/2026)</summary>
          <ul style={{ fontSize: '0.9rem', margin: '8px 0 0' }}>
            <li><strong>Lei 15.042/2024</strong> criou o SBCE com dois ativos: <strong>CBE</strong> (permissão de emitir 1 tCO₂e) e <strong>CRVE</strong> (certificado de redução/remoção verificada).</li>
            <li>Obrigações: acima de <strong>10.000 tCO₂e/ano</strong> → monitoramento e relato; acima de <strong>25.000 tCO₂e/ano</strong> → conciliação de ativos. Produção primária agropecuária está fora do escopo.</li>
            <li>Regulamentação: Decretos 12.677/2025 (SEMC — órgão gestor provisório) e 12.768/2025 (CTCP); norma geral de regulamentação ainda não publicada; meta oficial: normas até dez/2026.</li>
            <li>Receitas do SBCE: <strong>≥75% para o Fundo Clima</strong> e <strong>≥5% para povos indígenas e comunidades tradicionais</strong>.</li>
            <li>Titularidade originária (art. 43) reconhece povos indígenas, quilombolas, extrativistas, assentados da reforma agrária e proprietários — base legal para repartição de benefícios.</li>
            <li>Créditos voluntários podem ser convertidos em CRVEs, com restrições (arts. 42–44).</li>
            <li>CVM: ativos do SBCE e créditos de carbono são <strong>valores mobiliários</strong> quando negociados no mercado financeiro (Lei 15.042, art. 14/54); Resolução CVM 223/2024 (OCPC 10) obrigatória desde 1º/1/2025; FAQ CVM (10/09/2025).</li>
            <li>B3 + ACX lançaram piloto de plataforma de registro de créditos de carbono (24/09/2025).</li>
            <li>RenovaBio segue como mercado setorial paralelo: meta 2026 de <strong>48,09 milhões de CBIOs</strong> (CNPE).</li>
            <li>O STF declarou inconstitucional o art. 56 da Lei 15.042 (compra obrigatória de ativos ambientais por seguradoras) — ADI 7795.</li>
          </ul>
        </details>

        <div style={{ margin: '24px 0' }}>
          <ChipGroup
            label="Contexto"
            value={ctx}
            onChange={setCtx}
            options={[
              { value: 'brasil', label: '🇧🇷 Brasil' },
              { value: 'intl', label: '🌎 Internacional' },
            ]}
          />
        </div>

        <div className="compare">
          <div className="compare-col compare-col--a">
            <h3>Regulado (compliance)</h3>
            <p style={{ fontSize: '0.85rem' }}>Obrigatório por lei. Limite de emissões para grandes operadores; quem emite acima compra permissões.</p>
          </div>
          <div className="compare-col compare-col--b">
            <h3>Voluntário</h3>
            <p style={{ fontSize: '0.85rem' }}>Adesão espontânea. Empresas compram créditos de projetos com metodologia e verificação.</p>
          </div>
        </div>

        <table className="tbl" style={{ marginTop: 24 }}>
          <thead>
            <tr>
              <th scope="col">Dimensão</th>
              <th scope="col">Regulado</th>
              <th scope="col">Voluntário</th>
            </tr>
          </thead>
          <tbody>
            {TABELAS[ctx].map((t) => (
              <tr key={t.dimensao}>
                <td><strong>{t.dimensao}</strong></td>
                <td>{t.regulado}</td>
                <td>{t.voluntario}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <details className="callout callout--warn" style={{ marginTop: 28 }}>
          <summary>O que isso significa para pequenos produtores e comunidades?</summary>
          <p style={{ fontSize: '0.9rem' }}>
            Hoje, o caminho mais acessível é o <strong>voluntário</strong> — mas ele exige metodologia
            aprovada, MRV e registro, com custos que a agregação ajuda a diluir. O futuro{' '}
            <strong>regulado</strong> pode criar demanda estável (e preço), mas as regras de quem pode
            gerar CRVEs e como a receita se distribui ainda estão em construção — por isso a plataforma
            trata isso como <strong>proposta e cenário</strong>, não como fato consumado.
          </p>
        </details>

        <h2 style={{ marginTop: 44 }}>Críticas fundamentadas ao mercado de carbono</h2>
        <p style={{ color: 'var(--ink-soft)' }}>
          Integridade exige ouvir as críticas — inclusive as mais duras. Estas são evidências
          verificadas (2024–2026); a plataforma as trata como razão para <strong>exigir mais
          rigor</strong>, não para descartar o instrumento.
        </p>
        <div className="grid grid--2">
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Adicionalidade e superestimativa</h3>
            <ul style={{ fontSize: '0.88rem' }}>
              <li>Avaliação sistemática <em>peer-reviewed</em> (Nature Communications, 2024): <strong>menos de 16%</strong> dos créditos investigados representam reduções reais — variando por tipo (11% fogões, 16% SF6, 25% desmatamento evitado, 68% HFC-23). <SourceRefCompat id={46} /></li>
              <li>Estudo do Oko-Institut encomendado pela Comissão Europeia (Cames et al., 2016): ~<strong>85% dos offsets do CDM</strong> provavelmente não-adicionais ou supercreditados.</li>
              <li>Projeto Kariba (Zimbábue): a própria Verra cancelou <strong>15,2 milhões de créditos</strong> (≈57% dos emitidos) por erro de baseline (2025). <SourceRefCompat id={47} /></li>
            </ul>
          </div>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Controvérsias documentadas</h3>
            <ul style={{ fontSize: '0.88rem' }}>
              <li>Investigação Guardian/Die Zeit (2023): até <strong>94% dos créditos de projetos florestais</strong> sem benefício climático real; US$ 1,16 bi em créditos de projetos “provavelmente-lixo” já negociados.</li>
              <li>Northern Kenya (NRT): corte local declarou inconstitucionais conservancies; mais de 6 mi de créditos vendidos a Meta, Netflix e British Airways. <SourceRefCompat id={48} /></li>
              <li>Camboja (Southern Cardamom, HRW 2024): projeto operou sem consulta e <strong>sem acordo de repartição com comunidades</strong>. <SourceRefCompat id={54} /></li>
            </ul>
          </div>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Salvaguardas e direitos no Brasil</h3>
            <ul style={{ fontSize: '0.88rem' }}>
              <li>Corte federal do Maranhão <strong>suspendeu projeto REDD+ na TI Ka'apor</strong> por falta de consentimento livre, prévio e informado (CF/88 + Convenção 169 OIT) — 2025. <SourceRefCompat id={48} /></li>
              <li>MPF/AM obteve liminar suspendendo créditos REDD+ estaduais por ausência de consulta prévia (2024).</li>
              <li>Investigações apontam contratos com páginas em branco assinados por indígenas e repasse de ~30% do valor de mercado (InfoAmazonia, 2023).</li>
            </ul>
          </div>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Custos, dupla contagem e governança</h3>
            <ul style={{ fontSize: '0.88rem' }}>
              <li>Tarifas da Verra (S&P Global, 2025): US$ 5.000 por revisão de verificação + ~US$ 0,23/crédito — custos que pesam sobre pequenos projetos. <SourceRefCompat id={53} /></li>
              <li>Estudos de transação em REDD+ (Thompson et al., 2013): US$ 0,16–1,44/ha/ano, peso desproporcional em pequenas áreas comunitárias.</li>
              <li>Sem <strong>ajuste correspondente</strong> (Art. 6 do Acordo de Paris), a mesma tonelada pode ser contada duas vezes. <SourceRefCompat id={52} /></li>
              <li>ICVCM/CCP respondem com requisitos de permanência (≥40 anos + buffer), adicionalidade e FPIC. <SourceRefCompat id={13} /></li>
              <li>Enquanto isso, a receita global de precificação passou de US$ 100 bi em 2024, com o voluntário crescendo “de forma negligenciável” frente ao compliance (Banco Mundial). <SourceRefCompat id={45} /></li>
            </ul>
          </div>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
          <strong>Leitura da plataforma:</strong> essas falhas não são argumento contra a transição —
          são argumento contra <em>integridade fraca</em>. Agregação, MRV compartilhado, salvaguardas
          vinculantes e repartição de benefícios pactuada são exatamente a resposta estrutural que os
          simuladores exploram.
        </p>

        <SourceList ids={[1, 31, 32, 13, 14, 15, 16, 18, 20, 45, 46, 47, 48, 52, 53, 54]} />
      </div>
    </section>
  );
}

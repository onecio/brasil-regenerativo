import { useState } from 'react';
import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import { ChipGroup } from '../components/Sim';
import { SourceList } from '../components/SourceRef';

type Ctx = 'brasil' | 'intl';

const TABELAS: Record<Ctx, { dimensao: string; regulado: string; voluntario: string }[]> = {
  brasil: [
    { dimensao: 'Finalidade', regulado: 'Cumprir metas obrigatórias de redução (compliance)', voluntario: 'Compensação voluntária de emissões; metas corporativas' },
    { dimensao: 'Base legal', regulado: 'SBCE — Lei 15.042/2024 (em regulamentação)', voluntario: 'Contratos privados; padrões internacionais (Verra, Gold Standard, ART, Plan Vivo)' },
    { dimensao: 'Participantes', regulado: 'Operadores obrigados (grandes emissores, ex.: >10.000 tCO₂e/ano)', voluntario: 'Empresas, projetos, intermediários, ONGs — adesão voluntária' },
    { dimensao: 'Regras e fiscalização', regulado: 'Governo define tetos, alocação e fiscalização', voluntario: 'Padrões privados; validação e verificação por terceiros' },
    { dimensao: 'Créditos/ativos', regulado: 'COTA (permissão de emissão) e CEV (certificado de redução)', voluntario: 'Créditos de carbono emitidos por padrão, com metodologia' },
    { dimensao: 'Registros', regulado: 'Registro central do SBCE (a implementar)', voluntario: 'Registros dos padrões (Verra Registry, Gold Standard Registry...)' },
    { dimensao: 'Relação', regulado: 'CEVs podem ser usados para compliance em limites definidos', voluntario: 'Pode alimentar compliance se o SBCE aceitar; risco de dupla contagem sem ajustes' },
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
    <section className="section">
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
          regulamentação; detalhes podem mudar. Divergências entre fontes são anotadas em{' '}
          <a href="#/fontes">Fontes</a>.
        </p>

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
            gerar CEVs e como a receita se distribui ainda estão em construção — por isso a plataforma
            trata isso como <strong>proposta e cenário</strong>, não como fato consumado.
          </p>
        </details>

        <SourceList ids={[1, 13, 14, 15, 16, 18, 20]} />
      </div>
    </section>
  );
}

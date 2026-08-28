import { useState } from 'react';
import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import { lerWallet, registrarAcao } from '../utils/points';
import { fmtNum } from '../utils/format';
import { SourceList } from '../components/SourceRef';

const ITENS = [
  { nome: 'Viagem de trem regional', emoji: '🚆', custo: 800, desc: 'Experiência de mobilidade sustentável' },
  { nome: 'Hospedagem comunitária', emoji: '🏕️', custo: 1200, desc: 'Rede de turismo de base comunitária' },
  { nome: 'Bicicleta elétrica (diária)', emoji: '🚲', custo: 450, desc: 'Mobilidade ativa assistida' },
  { nome: 'Kit de compostagem', emoji: '♻️', custo: 350, desc: 'Reduza resíduos em casa' },
  { nome: 'Eletrônico eficiente (desconto)', emoji: '🔌', custo: 1500, desc: 'Parceria com lojistas (fictício)' },
  { nome: 'Cesta de alimentos orgânicos', emoji: '🥗', custo: 500, desc: 'Apoio à agricultura familiar' },
  { nome: 'Ingresso para museu/parque', emoji: '🎫', custo: 220, desc: 'Cultura e áreas verdes' },
];

export default function Marketplace() {
  const [wallet, setWallet] = useState(lerWallet());
  const [resgatados, setResgatados] = useState<string[]>([]);

  function ganhar() {
    const r = registrarAcao('bike_1km');
    setWallet(r.estado);
  }

  function resgatar(nome: string, custo: number) {
    if (wallet.pontos < custo || resgatados.includes(nome)) return;
    setWallet({ ...wallet, pontos: wallet.pontos - custo });
    setResgatados([...resgatados, nome]);
  }

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <SectionHead
          kicker="Simulação"
          title="Climate Marketplace"
          lede={
            <>
              Acumule Pontos Climáticos nas simulações da plataforma e experimente o “resgate”.
              Tudo é <strong>explicitamente educacional e fictício</strong> — não há marcas reais,
              valor monetário ou obrigação de entrega.
            </>
          }
        />

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
          <div className="card" style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>Seu saldo climático</div>
            <div className="stat stat--green">{fmtNum(wallet.pontos)} pts</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>
              Você evitou ≈ {fmtNum(wallet.kgCO2eTotal, 1)} kg CO₂e (estimativa educacional)
            </div>
          </div>
          <button type="button" className="btn btn--primary" onClick={ganhar}>+ Ganhar pontos (demo: pedalar 1 km)</button>
        </div>

        <div className="grid grid--3">
          {ITENS.map((item) => {
            const ok = wallet.pontos >= item.custo && !resgatados.includes(item.nome);
            return (
              <div className="card" key={item.nome}>
                <div style={{ fontSize: '1.6rem' }}>{item.emoji}</div>
                <h3 style={{ fontSize: '1rem', margin: '6px 0 2px' }}>{item.nome}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', margin: 0 }}>{item.desc}</p>
                <div className="mono" style={{ fontSize: '0.85rem', margin: '8px 0' }}>{fmtNum(item.custo)} pts</div>
                <button type="button" className="btn btn--ghost" style={{ width: '100%', justifyContent: 'center', padding: '8px 12px' }} disabled={!ok} onClick={() => resgatar(item.nome, item.custo)}>
                  {resgatados.includes(item.nome) ? '✓ Resgatado' : ok ? 'Resgatar' : 'Pontos insuficientes'}
                </button>
              </div>
            );
          })}
        </div>

        <details className="callout callout--warn" style={{ marginTop: 24 }}>
          <summary>Termos da simulação</summary>
          <p style={{ fontSize: '0.88rem' }}>
            Marketplace fictício para demonstrar a mecânica de incentivos. Não realiza entregas, não
            envolve dinheiro real e não representa parcerias com marcas. Num programa real, o
            desenho exigiria: política pública ou parceria privada formal, regras antifraude,
            prestação de contas e respeito à LGPD.
          </p>
        </details>

        <NatureTag kind="cenario" />
        <div style={{ marginTop: 16 }}>
          <SourceList ids={[23, 21]} />
        </div>
      </div>
    </section>
  );
}

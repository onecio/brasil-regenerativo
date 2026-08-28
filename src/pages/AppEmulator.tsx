import { useState } from 'react';
import SectionHead from '../components/SectionHead';
import FlowDiagram from '../components/FlowDiagram';
import { ACOES, lerWallet, registrarAcao } from '../utils/points';
import { fmtNum } from '../utils/format';
import { SourceList } from '../components/SourceRef';

export default function AppEmulator() {
  const [wallet, setWallet] = useState(lerWallet());
  const [tab, setTab] = useState<'home' | 'atividades' | 'carteira' | 'market'>('home');
  const [fullscreen, setFullscreen] = useState(false);

  function doAcao(acao: keyof typeof ACOES) {
    const r = registrarAcao(acao);
    setWallet(r.estado);
  }

  const pctHoje = Math.min((wallet.historico.filter((h) => new Date(h.ts).toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10)).length / 6) * 100, 100);

  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          kicker="Protótipo de app"
          title="Carbon Wallet — pontos climáticos"
          lede={
            <>
              Protótipo de política pública e aplicativo: a pessoa recebe <strong>Pontos
              Climáticos</strong> por ações mensuráveis do cotidiano. Os pontos são uma unidade
              educacional e um potencial instrumento de incentivo —{' '}
              <strong>não equivalem automaticamente a créditos de carbono negociáveis</strong>.
            </>
          }
        />

        <div style={{ marginBottom: 24 }}>
          <FlowDiagram steps={['Ação cotidiana', 'Registro (verificável)', 'Pontos Climáticos', 'Benefícios educacionais/incentivos', 'Impacto acumulado']} label="Fluxo do Carbon Wallet" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 420px) 1fr', gap: 28, alignItems: 'start' }}>
          {/* PHONE */}
          <div className={`phone${fullscreen ? '' : ''}`} style={fullscreen ? { position: 'fixed', inset: 0, zIndex: 200, borderRadius: 0, border: 'none', maxWidth: '100vw', width: '100vw' } : {}}>
            <div className="phone-screen" style={fullscreen ? { height: '100vh' } : {}}>
              <div className="phone-notch" />
              <div style={{ padding: '0 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#8fc3a8' }}>Carbon Wallet</div>
                    <div style={{ fontWeight: 700 }}>🌱 {fmtNum(wallet.pontos)} pts</div>
                  </div>
                  <button type="button" onClick={() => setFullscreen(!fullscreen)} style={{ background: 'rgba(255,255,255,.1)', border: 'none', color: '#d9f2e5', borderRadius: 10, padding: '6px 10px', cursor: 'pointer' }}>
                    {fullscreen ? '✕' : '⛶'}
                  </button>
                </div>

                <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                  {([['home', 'Home'], ['atividades', 'Atividades'], ['carteira', 'Carteira'], ['market', 'Market']] as const).map(([id, label]) => (
                    <button key={id} type="button" onClick={() => setTab(id)} aria-pressed={tab === id}
                      style={{ flex: 1, padding: '8px 4px', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 600, fontSize: '0.72rem', background: tab === id ? '#1f8f68' : 'rgba(255,255,255,.08)', color: tab === id ? '#fff' : '#9fc4b2' }}>
                      {label}
                    </button>
                  ))}
                </div>

                {tab === 'home' && (
                  <div>
                    <div style={{ background: 'linear-gradient(135deg, #11523d, #1f8f68)', borderRadius: 16, padding: 16, marginBottom: 12 }}>
                      <div style={{ fontSize: '0.72rem', color: '#b9e4cd' }}>PEGADA DIÁRIA (indicador)</div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>~{fmtNum(Math.max(wallet.kgCO2eTotal * 0.12, 0), 1)} kg CO₂e</div>
                      <div className="meter" style={{ background: 'rgba(255,255,255,.25)', marginTop: 8 }}>
                        <span style={{ width: `${pctHoje}%`, background: 'linear-gradient(90deg,#fde68a,#fff)' }} />
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#d7f2e3', marginTop: 4 }}>estimativa educacional</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,.07)', borderRadius: 16, padding: 14, marginBottom: 12 }}>
                      <div style={{ fontSize: '0.78rem', color: '#9fc4b2' }}>Sequência de dias</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>🔥 {wallet.streak} dias</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,.07)', borderRadius: 16, padding: 14 }}>
                      <div style={{ fontSize: '0.78rem', color: '#9fc4b2' }}>Ranking (local)</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>#1.247 no seu bairro</div>
                      <div style={{ fontSize: '0.68rem', color: '#7fa693', marginTop: 4 }}>ranking fictício da demonstração</div>
                    </div>
                  </div>
                )}

                {tab === 'atividades' && (
                  <div>
                    {Object.entries(ACOES).map(([key, a]) => (
                      <button key={key} type="button" onClick={() => doAcao(key as keyof typeof ACOES)}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: 'rgba(255,255,255,.07)', border: 'none', color: '#e8efe9', borderRadius: 14, padding: '12px 14px', marginBottom: 8, cursor: 'pointer', textAlign: 'left' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{a.label}</span>
                        <span style={{ fontSize: '0.75rem', color: '#7fd0ac' }}>+{a.pontos} pts</span>
                      </button>
                    ))}
                    <p style={{ fontSize: '0.66rem', color: '#7fa693', marginTop: 8 }}>
                      Registro auto-declarado nesta demonstração. Num produto real: validação por
                      sensores/APIs/comprovantes, opt-in e LGPD (ver Privacidade Primeiro).
                    </p>
                  </div>
                )}

                {tab === 'carteira' && (
                  <div>
                    <div style={{ background: 'rgba(255,255,255,.07)', borderRadius: 16, padding: 14, marginBottom: 10 }}>
                      <div style={{ fontSize: '0.72rem', color: '#9fc4b2' }}>SALDO</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{fmtNum(wallet.pontos)} pts</div>
                      <div style={{ fontSize: '0.75rem', color: '#9fc4b2' }}>≈ {fmtNum(wallet.kgCO2eTotal, 1)} kg CO₂e evitados (estimativa)</div>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#9fc4b2', marginBottom: 6 }}>HISTÓRICO</div>
                    {wallet.historico.slice(-8).reverse().map((h, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,.05)', borderRadius: 10, padding: '8px 12px', marginBottom: 6, fontSize: '0.78rem' }}>
                        <span>{h.acao}</span>
                        <span style={{ color: '#7fd0ac' }}>+{h.pontos}</span>
                      </div>
                    ))}
                    {wallet.historico.length === 0 && <div style={{ fontSize: '0.75rem', color: '#7fa693' }}>Registre atividades para ver o histórico.</div>}
                  </div>
                )}

                {tab === 'market' && (
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#fbbf24', fontWeight: 700, marginBottom: 8 }}>⚠️ SIMULAÇÃO — itens fictícios</div>
                    {([
                      ['🎟️', 'Passagem de ônibus urbano', 150],
                      ['🚲', 'Aluguel de bicicleta (1 h)', 80],
                      ['🥗', 'Cesta de orgânicos', 400],
                      ['🎫', 'Ingresso museu local', 250],
                      ['🔌', 'Desconto em eletrônico eficiente', 900],
                      ['🏕️', 'Hospedagem comunitária', 1200],
                    ] as [string, string, number][]).map(([e, nome, custo]) => (
                      <div key={nome as string} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,.07)', borderRadius: 12, padding: '10px 12px', marginBottom: 8 }}>
                        <span style={{ fontSize: '0.82rem' }}>{e} {nome}</span>
                        <button type="button" disabled={wallet.pontos < (custo as number)}
                          style={{ background: wallet.pontos >= (custo as number) ? '#1f8f68' : 'rgba(255,255,255,.15)', color: '#fff', border: 'none', borderRadius: 10, padding: '6px 10px', cursor: wallet.pontos >= (custo as number) ? 'pointer' : 'not-allowed', fontSize: '0.72rem' }}>
                          {wallet.pontos >= (custo as number) ? 'Resgatar' : `${fmtNum(custo)} pts`}
                        </button>
                      </div>
                    ))}
                    <p style={{ fontSize: '0.66rem', color: '#7fa693' }}>
                      Marketplace fictício para demonstrar incentivos. Não há marcas reais nem valor
                      monetário dos pontos.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* EXPLICAÇÃO */}
          <div>
            <h3>Por que “Pontos Climáticos” e não “créditos de carbono”?</h3>
            <p style={{ color: 'var(--ink-soft)' }}>
              Crédito de carbono é um ativo com metodologia, validação, verificação e registro. Uma
              caminhada não gera isso — e fingir que gera seria greenwashing. Os pontos representam
              uma <strong>unidade educacional</strong> ou um potencial instrumento de incentivo
              público/privado, com regras próprias e transparentes.
            </p>
            <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
              {[
                ['🌱', 'Ações mensuráveis', 'Caminhada, bike, coletivo, reciclagem, compostagem, energia, consumo circular.'],
                ['📊', 'Impacto estimado', 'Cada ação mostra kg CO₂e evitados estimados — com fatores declarados.'],
                ['🏛️', 'Incentivo possível', 'Descontos, benefícios, reconhecimento — decididos por política pública ou parceria privada.'],
                ['🔒', 'Privacidade primeiro', 'Consentimento, minimização, processamento local, anonimização — ver Privacidade.'],
              ].map(([e, t, d]) => (
                <div className="card" key={t} style={{ padding: 14 }}>
                  <strong>{e} {t}</strong>
                  <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>{d}</p>
                </div>
              ))}
            </div>
            <div className="hero-cta" style={{ marginTop: 18 }}>
              <a className="btn btn--primary" href="#/smartwatch">Ver no smartwatch →</a>
              <a className="btn btn--ghost" href="#/privacidade">Privacidade Primeiro</a>
            </div>
            <SourceList ids={[21, 22, 23]} />
          </div>
        </div>
      </div>
    </section>
  );
}

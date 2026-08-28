import { useState } from 'react';
import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import brazil from '../data/brazilMap';

interface Location { name: string; id: string; path: string }
const LOCATIONS = (brazil as { locations: Location[] }).locations;
const VIEWBOX = (brazil as { viewBox: string }).viewBox;

const BIOMAS = [
  { nome: 'Amazônia', emoji: '🌳', oportunidades: ['Restauração florestal', 'REDD+ comunitário e jurisdicional', 'Bioeconomia (açaí, castanha, borracha, pesca)', 'PSA e prevenção de incêndios', 'Salvaguardas, CLPI e repartição de benefícios'], tag: 'cenario' as const },
  { nome: 'Cerrado', emoji: '🌾', oportunidades: ['Agricultura regenerativa e ILPF', 'Recuperação de pastagens', 'Restauração de veredas e APPs', 'Resíduos agropecuários (biogás)', 'Crédito de carbono de solo (metodologias emergentes)'], tag: 'cenario' as const },
  { nome: 'Caatinga', emoji: '🌵', oportunidades: ['Convivência com o semiárido', 'Agrossilvicultura e cisternas', 'Energia solar distribuída', 'Manejo de caprinos/ovinos', 'Restauração de áreas degradadas'], tag: 'cenario' as const },
  { nome: 'Mata Atlântica', emoji: '🍃', oportunidades: ['Restauração (Pacto pela Restauração)', 'SAFs e corredores ecológicos', 'PSA hídrico (Produtor de Água)', 'Turismo de base comunitária', 'Cadeias da sociobiodiversidade'], tag: 'cenario' as const },
  { nome: 'Pantanal', emoji: '🦜', oportunidades: ['Prevenção e combate a incêndios', 'Pecuária extensiva sustentável', 'Manejo integrado do fogo', 'Restauração de cordilheiras', 'Ecoturismo comunitário'], tag: 'cenario' as const },
  { nome: 'Pampa', emoji: '🐎', oportunidades: ['Campo nativo e pastagem natural', 'Pecuária regenerativa', 'Restauração de campos', 'Sequestro de carbono no solo', 'Sistemas silvipastoris'], tag: 'cenario' as const },
];

const SABER_MAIS: Record<string, string> = {
  ac: 'Acre — forte histórico de PSA e programas de REDD+ estadual (SISA).',
  am: 'Amazonas — maior estado; programas de REDD+ jurisdicional (Bolsa Floresta, PSA Carbono).',
  ro: 'Rondônia — fronteira agrícola; recuperação de pastagens e ILPF como vetores.',
  rr: 'Roraima — presença de áreas protegidas e terras indígenas; prevenção de incêndios.',
  pa: 'Pará — maior emissor de MUT; planos de REDD+ jurisdicional e restauração em larga escala.',
  ap: 'Amapá — alta cobertura florestal; bioeconomia e REDD+ comunitário.',
  to: 'Tocantins — Cerrado; agricultura regenerativa e recuperação de pasto.',
  ma: 'Maranhão — fronteira Cerrado/Amazônia; restauração e cadeias da sociobiodiversidade.',
  pi: 'Piauí — Caatinga/Cerrado; energia solar e convivência com semiárido.',
  ce: 'Ceará — energia eólica/solar; convivência com semiárido e resíduos.',
  rn: 'Rio Grande do Norte — energia eólica/solar; dessalinização e convivência.',
  pb: 'Paraíba — Caatinga; cisternas, agrossilvicultura e biogás.',
  pe: 'Pernambuco — semiárido + litoral; solar, biogás e resíduos.',
  al: 'Alagoas — Mata Atlântica e cana; bioenergia e restauração.',
  se: 'Sergipe — Mata Atlântica; restauração e PSA hídrico.',
  ba: 'Bahia — maior litoral; Caatinga, Cerrado e Mata Atlântica; solar eólica e agro.',
  mg: 'Minas Gerais — Mata Atlântica e Cerrado; restauração, SAFs e biogás do agronegócio.',
  es: 'Espírito Santo — Mata Atlântica; restauração, café e PSA hídrico.',
  rj: 'Rio de Janeiro — restauração de Mata Atlântica, saneamento e economia circular urbana.',
  sp: 'São Paulo — maior economia; biogás (aterros e agro), restauração e PSA.',
  pr: 'Paraná — Mata Atlântica; SAFs, biogás e cooperativas agroindustriais.',
  sc: 'Santa Catarina — Mata Atlântica; suínos/aves (biogás), cooperativas e restauração.',
  rs: 'Rio Grande do Sul — Pampa e Mata Atlântica; pecuária regenerativa e campo nativo.',
  ms: 'Mato Grosso do Sul — Pantanal e Cerrado; pecuária sustentável e manejo do fogo.',
  mt: 'Mato Grosso — Cerrado/Amazônia/Pantanal; agricultura regenerativa e REDD+.',
  go: 'Goiás — Cerrado; recuperação de pasto, ILPF e biogás.',
  df: 'Distrito Federal — Cerrado; restauração e PSA hídrico (Produtor de Água no DF).',
};

export default function Mapa() {
  const [sel, setSel] = useState<string | null>('pa');
  const [camada, setCamada] = useState<'social' | 'biomas'>('social');
  const estado = LOCATIONS.find((l) => l.id === sel);

  return (
    <section className="section page-top">
      <div className="wrap">
        <SectionHead
          kicker="Território"
          title="Mapa do Brasil regenerativo"
          lede={
            <>
              Seis biomas, dezenas de oportunidades — e uma camada social que lembra quem está no
              território. O mapa é esquemático (fronteiras estaduais reais, CC-BY-4.0); a camada de
              biomas usa dados públicos citados e a camada social indica <strong>onde</strong> olhar,
              sem fabricar estatísticas.
            </>
          }
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
          <button
            type="button"
            className="chip"
            aria-pressed={camada === 'social'}
            onClick={() => setCamada('social')}
          >
            Camada social (estados)
          </button>
          <button
            type="button"
            className="chip"
            aria-pressed={camada === 'biomas'}
            onClick={() => setCamada('biomas')}
          >
            Camada biomas (oportunidades)
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.2fr) 1fr', gap: 28, alignItems: 'start' }}>
          <div>
            <svg viewBox={VIEWBOX} role="img" aria-label="Mapa do Brasil com estados clicáveis" style={{ width: '100%', height: 'auto', background: 'var(--surface-2)', borderRadius: 'var(--radius)', border: '1px solid var(--line)' }}>
              {LOCATIONS.map((l) => {
                const active = l.id === sel;
                return (
                  <path
                    key={l.id}
                    d={l.path}
                    onClick={() => setSel(l.id)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(l.id); } }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Estado ${l.name}`}
                    style={{
                      fill: active ? 'var(--green-500)' : camada === 'social' ? 'var(--green-200)' : 'var(--green-100)',
                      stroke: '#fff',
                      strokeWidth: 1,
                      cursor: 'pointer',
                      transition: 'fill .15s',
                      outline: 'none',
                    }}
                  />
                );
              })}
            </svg>
            <p style={{ fontSize: '0.78rem', color: 'var(--ink-soft)' }}>
              Fronteiras estaduais: @svg-maps/brazil (CC-BY-4.0). Clique em um estado (ou use Tab+Enter).
            </p>
          </div>

          <div style={{ display: 'grid', gap: 14 }}>
            {estado && (
              <div className="card">
                <h3>📍 {estado.name}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', margin: 0 }}>
                  {SABER_MAIS[estado.id] ?? 'Selecione outro estado para ver o panorama.'}
                </p>
                <NatureTag kind="proposta" />
              </div>
            )}
            {camada === 'biomas' ? (
              BIOMAS.map((b) => (
                <div className="card" key={b.nome}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>{b.emoji} {b.nome}</h3>
                    <NatureTag kind={b.tag} />
                  </div>
                  <ul style={{ margin: '10px 0 0', fontSize: '0.88rem' }}>
                    {b.oportunidades.map((o) => <li key={o}>{o}</li>)}
                  </ul>
                </div>
              ))
            ) : (
              <div className="card">
                <h3>🌍 Camada social</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
                  Estados concentram diferentes combinações de <strong>agricultura familiar,
                  cooperativas, áreas degradadas, potencial renovável e fluxos de resíduos</strong>.
                  A leitura honesta: políticas climáticas territoriais precisam de dados municipais
                  desagregados (IBGE, INPE, SNIS) — esta camada aponta o vetor de cada estado, com
                  fontes a verificar na página de Fontes.
                </p>
                <NatureTag kind="proposta" />
              </div>
            )}
          </div>
        </div>

        <details className="callout callout--warn" style={{ marginTop: 28 }}>
          <summary>Por que não há polígonos de bioma no mapa?</summary>
          <p style={{ fontSize: '0.9rem' }}>
            Sobrepor biomas aos estados exigiria dados georreferenciados (IBGE/MapBiomas) e
            produziria um mapa tecnicamente defensável — fora do escopo desta demonstração sem
            verificação. A plataforma prefere <strong>não desenhar geografia imprecisa</strong>:
            mostra os biomas como camada de conteúdo e os estados como camada de ação.
          </p>
        </details>
      </div>
    </section>
  );
}

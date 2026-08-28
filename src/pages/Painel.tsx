import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, CartesianGrid,
} from 'recharts';
import { EMISSOES_POR_SETOR, DESMATAMENTO_AMAZONIA, MATRIZ_ELETRICA, INDICADORES } from '../data/painel';
import { SourceList } from '../components/SourceRef';

const CORES = ['#1f8f68', '#3fb284', '#7fd0ac', '#f59e0b', '#ef4444', '#22d3ee'];

function Pendente({ ok }: { ok: boolean }) {
  if (ok) return <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--green-600)' }}>✓ verificado</span>;
  return <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--amber-600)' }}>⧗ verificação pendente</span>;
}

export default function Painel() {
  const setores = EMISSOES_POR_SETOR.map((s) => ({ ...s, name: s.label.split(' — ')[0], valor: s.value }));
  const desm = DESMATAMENTO_AMAZONIA.map((d) => ({ ano: String(d.ano), km2: d.km2 }));
  const matriz = MATRIZ_ELETRICA.map((m) => ({ name: m.label, value: m.value }));

  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          kicker="Dados observados"
          title="Painel Brasil"
          lede={
            <>
              Fotografia nacional com dados públicos: emissões, desmatamento, energia, agricultura
              familiar, saneamento e resíduos. Cada número traz <strong>fonte + ano + metodologia</strong>.
            </>
          }
        />

        <div className="grid grid--2" style={{ marginBottom: 8 }}>
          {INDICADORES.map((ind) => (
            <div className="card" key={ind.label} style={{ padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--ink-soft)' }}>{ind.label}</div>
                <Pendente ok={ind.verificado} />
              </div>
              <div className="stat stat--green" style={{ fontSize: '1.5rem' }}>{ind.value.toLocaleString('pt-BR')}<small> {ind.unidade}</small></div>
              <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>Ano: {ind.ano} · <a href={`#/fontes#f${String(ind.fonteId).padStart(3, '0')}`}>fonte</a></div>
            </div>
          ))}
        </div>

        <div className="grid grid--2">
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <h3 style={{ marginTop: 0, fontSize: '1rem' }}>Emissões de GEE por setor (Brasil)</h3>
              <Pendente ok={EMISSOES_POR_SETOR.every((s) => s.verificado)} />
            </div>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={setores} layout="vertical" margin={{ left: 8, right: 24 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" />
                  <XAxis type="number" tickFormatter={(v) => `${v} Gt`} />
                  <YAxis type="category" dataKey="name" width={150} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v) => [`${v} Gt CO₂e`, 'Emissão']} />
                  <Bar dataKey="valor" fill="#1f8f68" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>SEEG/Observatório do Clima — valores ilustrativos até verificação.</p>
          </div>

          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <h3 style={{ marginTop: 0, fontSize: '1rem' }}>Desmatamento na Amazônia (km²/ano)</h3>
              <Pendente ok={DESMATAMENTO_AMAZONIA.every((d) => d.verificado)} />
            </div>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={desm} margin={{ top: 8, right: 16, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" />
                  <XAxis dataKey="ano" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v) => [`${v} km²`, 'Desmatamento']} />
                  <Bar dataKey="km2" fill="#ef4444" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>INPE/PRODES — valores ilustrativos até verificação.</p>
          </div>
        </div>

        <div className="card" style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
            <h3 style={{ marginTop: 0, fontSize: '1rem' }}>Matriz elétrica brasileira (%)</h3>
            <Pendente ok={MATRIZ_ELETRICA.every((m) => m.verificado)} />
          </div>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={matriz} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, value }) => `${name} ${value}%`} labelLine={false}>
                  {matriz.map((_, i) => <Cell key={i} fill={CORES[i % CORES.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, 'Participação']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>ONS/EPE/MME — valores ilustrativos até verificação.</p>
        </div>

        <div style={{ marginTop: 24 }}>
          <NatureTag kind="dado" />
          <SourceList ids={[5, 6, 7, 8, 9]} />
        </div>
      </div>
    </section>
  );
}

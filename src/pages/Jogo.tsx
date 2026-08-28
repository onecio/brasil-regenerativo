import { useState } from 'react';
import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import { SliderCtl, ChipGroup, ResultCard } from '../components/Sim';
import { fmtTons, fmtNum } from '../utils/format';
import { SourceList } from '../components/SourceRef';

type Perfil = 'A' | 'B' | 'C';
type Residencia = 'centro' | 'periferia' | 'rural';
type Renda = 'baixa' | 'media' | 'alta';

const FATORES: Record<Perfil, { renda: Renda; residencia: Residencia; carroKm: number; onibusKm: number; aviaoKm: number; kWh: number; dietaFator: number }> = {
  A: { renda: 'baixa', residencia: 'periferia', carroKm: 1000, onibusKm: 8000, aviaoKm: 0, kWh: 120, dietaFator: 0.8 },
  B: { renda: 'media', residencia: 'centro', carroKm: 8000, onibusKm: 2000, aviaoKm: 1500, kWh: 180, dietaFator: 1 },
  C: { renda: 'alta', residencia: 'centro', carroKm: 20000, onibusKm: 0, aviaoKm: 10000, kWh: 400, dietaFator: 1.3 },
};

export default function Jogo() {
  const [perfil, setPerfil] = useState<Perfil>('B');
  const [infra, setInfra] = useState(1); // 0 ruim, 1 média, 2 boa
  const [politica, setPolitica] = useState(0.5); // 0..1 apoio público

  const f = FATORES[perfil];
  const infraMult = [1.6, 1, 0.6][infra];
  const politicaMult = 1 - politica * 0.4;

  const carro = f.carroKm * (infra === 2 ? 0.5 : infra === 1 ? 0.8 : 1) * 0.18;
  const onibus = f.onibusKm * 0.1;
  const aviao = f.aviaoKm * 0.18;
  const energia = ((f.kWh * 12) / 1000) * 100 * 1.2 * politicaMult;
  const dieta = 2.5 * f.dietaFator * 365 * (politica > 0.6 ? 0.85 : 1);
  const total = (carro + onibus + aviao + energia + dieta) * infraMult;

  const msg =
    perfil === 'A'
      ? 'Renda restrita: a pessoa emite pouco por limitação de consumo — não por virtude. Sem transporte público de qualidade, a mobilidade ativa nem sempre é opção; sem renda, a dieta e a energia são o que são.'
      : perfil === 'B'
        ? 'Renda intermediária: a pegada depende fortemente de infraestrutura (transporte, energia) e de políticas (subsídio a coletivo, tarifa social, feiras). Escolhas ajudam, estrutura decide.'
        : 'Alto consumo: viagens, carro e eletrointensidade dominam. A mensagem não é culpa individual — é que políticas de preço, oferta e incentivo precisam atingir exatamente esses padrões de consumo.';

  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          kicker="Jogo · Cenários"
          title="Sua vida em carbono — sem culpabilizar"
          lede={
            <>
              Escolha um perfil e veja como <strong>infraestrutura + renda + políticas públicas +
              escolhas pessoais</strong> interagem na pegada. O objetivo não é julgar ninguém: é
              mostrar que a pegada individual é, em grande parte, um retrato da cidade, da renda e
              das políticas ao redor.
            </>
          }
        />

        <div className="sim">
          <div className="sim-controls">
            <h3 style={{ marginTop: 0 }}>Perfil</h3>
            <ChipGroup label="Perfil" value={perfil} onChange={setPerfil}
              options={[{ value: 'A', label: 'A · restrição de renda' }, { value: 'B', label: 'B · renda intermediária' }, { value: 'C', label: 'C · alto consumo' }]} />
            <ChipGroup label="Infraestrutura da cidade" value={String(infra) as '0' | '1' | '2'} onChange={(v) => setInfra(Number(v))}
              options={[{ value: '0', label: 'Precária' }, { value: '1', label: 'Média' }, { value: '2', label: 'Boa' }]} />
            <SliderCtl label="Políticas públicas de apoio" value={politica} min={0} max={1} step={0.05} onChange={setPolitica} format={(v) => `${Math.round(v * 100)}%`} />
            <NatureTag kind="cenario" />
          </div>

          <div className="sim-results">
            <ResultCard label="Pegada estimada do perfil" value={fmtTons(total)} kind="amber" hint={`${perfil === 'A' ? 'restrição de renda' : perfil === 'B' ? 'renda intermediária' : 'alto consumo'} · infraestrutura ${['precária', 'média', 'boa'][infra]}`} />
            <div className="card">
              <h3 style={{ marginTop: 0 }}>Decomposição</h3>
              {[
                ['Carro', carro * infraMult],
                ['Ônibus', onibus * infraMult],
                ['Avião', aviao * infraMult],
                ['Energia', energia * infraMult],
                ['Alimentação', dieta * infraMult],
              ].map(([nome, v]) => {
                const valor = v as number;
                const pct = total > 0 ? Math.min((valor / total) * 100, 100) : 0;
                return (
                  <div key={nome as string} style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span>{nome}</span><span className="mono">{fmtNum(valor)} kg</span>
                    </div>
                    <div className="meter" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} aria-label={`${nome} ${Math.round(pct)}%`}>
                      <span style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="card" style={{ borderLeft: '4px solid var(--green-500)' }}>
              <h3 style={{ marginTop: 0 }}>Leitura</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)' }}>{msg}</p>
              <p style={{ fontSize: '0.82rem', color: 'var(--ink-soft)' }}>
                <strong>Experimento:</strong> mantenha o perfil e mude a infraestrutura de “precária”
                para “boa” — veja a pegada cair. Depois mantenha a infra e reduza as políticas. A
                diferença mostra quem “carrega” o carbono na sua vida.
              </p>
            </div>
            <SourceList ids={[21, 22, 23]} />
          </div>
        </div>
      </div>
    </section>
  );
}

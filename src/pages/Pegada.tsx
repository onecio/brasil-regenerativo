import { useState } from 'react';
import SectionHead from '../components/SectionHead';
import NatureTag from '../components/NatureTag';
import { SliderCtl, ChipGroup, ResultCard } from '../components/Sim';
import { calcPegada, DIETA } from '../utils/carbon';
import { fmtTons, fmtNum } from '../utils/format';
import { SourceList } from '../components/SourceRef';

export default function Pegada() {
  const [carroKm, setCarroKm] = useState(10000);
  const [carroTipo, setCarroTipo] = useState<'carro_gasolina' | 'carro_etanol' | 'carro_diesel'>('carro_gasolina');
  const [motoKm, setMotoKm] = useState(0);
  const [onibusKm, setOnibusKm] = useState(2000);
  const [metroKm, setMetroKm] = useState(1500);
  const [aviaoKm, setAviaoKm] = useState(2000);
  const [kwh, setKwh] = useState(180);
  const [solar, setSolar] = useState(false);
  const [dieta, setDieta] = useState<keyof typeof DIETA>('onivora');
  const [orgAterro, setOrgAterro] = useState(2);
  const [reciclado, setReciclado] = useState(5);
  const [roupas, setRoupas] = useState(8);
  const [eletronicos, setEletronicos] = useState(4);

  const atual = calcPegada({
    carroKmAno: carroKm, carroTipo, motoKmAno: motoKm, onibusKmAno: onibusKm, metroKmAno: metroKm,
    aviaoKmAno: aviaoKm, bikeKmAno: 0, kWhMes: kwh, temSolar: solar, dieta,
    kgOrganicoAterro: orgAterro, kgRecicladoMes: reciclado, kgRoupasAno: roupas, kgEletronicosAno: eletronicos,
  });

  const cenario = calcPegada({
    carroKmAno: carroKm * 4 / 7, carroTipo, motoKmAno: motoKm, onibusKmAno: onibusKm + carroKm * 3 / 7 * 1.2, metroKmAno: metroKm,
    aviaoKmAno: aviaoKm, bikeKmAno: 0, kWhMes: kwh, temSolar: true, dieta: 'vegetariana' as keyof typeof DIETA,
    kgOrganicoAterro: 0, kgRecicladoMes: reciclado + 3, kgRoupasAno: roupas * 0.7, kgEletronicosAno: eletronicos * 0.7,
  });

  const diferenca = atual.total - cenario.total;

  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          kicker="Simulador"
          title="Calculadora de pegada de carbono"
          lede={
            <>
              Estime sua pegada anual e teste o cenário <strong>“e se eu mudar?”</strong>. Os fatores
              são educacionais, com fontes declaradas — a pegada é uma estimativa de ordem de
              grandeza, não uma medição pessoal.
            </>
          }
        />

        <div className="sim">
          <div className="sim-controls">
            <h3 style={{ marginTop: 0 }}>Mobilidade</h3>
            <ChipGroup label="Combustível do carro" value={carroTipo} onChange={setCarroTipo}
              options={[{ value: 'carro_gasolina', label: 'Gasolina' }, { value: 'carro_etanol', label: 'Etanol' }, { value: 'carro_diesel', label: 'Diesel' }]} />
            <SliderCtl label="Carro (km/ano)" value={carroKm} min={0} max={40000} step={500} onChange={setCarroKm} />
            <SliderCtl label="Moto (km/ano)" value={motoKm} min={0} max={20000} step={500} onChange={setMotoKm} />
            <SliderCtl label="Ônibus (km/ano)" value={onibusKm} min={0} max={15000} step={200} onChange={setOnibusKm} />
            <SliderCtl label="Metrô (km/ano)" value={metroKm} min={0} max={15000} step={200} onChange={setMetroKm} />
            <SliderCtl label="Avião doméstico (km/ano)" value={aviaoKm} min={0} max={30000} step={500} onChange={setAviaoKm} />

            <h3>Energia</h3>
            <SliderCtl label="Consumo elétrico (kWh/mês)" value={kwh} min={0} max={1000} step={10} onChange={setKwh} />
            <ChipGroup label="Geração própria" value={solar ? 'sim' as const : 'nao' as const} onChange={(v) => setSolar(v === 'sim')}
              options={[{ value: 'nao', label: 'Sem solar' }, { value: 'sim', label: 'Com solar' }]} />

            <h3>Alimentação e consumo</h3>
            <ChipGroup label="Padrão alimentar" value={dieta} onChange={setDieta}
              options={[{ value: 'onivora_alta', label: 'Onívora alta' }, { value: 'onivora', label: 'Onívora' }, { value: 'onivora_baixa', label: 'Onívora baixa' }, { value: 'vegetariana', label: 'Vegetariana' }, { value: 'vegana', label: 'Vegana' }]} />
            <SliderCtl label="Orgânicos p/ aterro (kg/semana)" value={orgAterro} min={0} max={15} step={0.5} onChange={setOrgAterro} />
            <SliderCtl label="Reciclados (kg/mês)" value={reciclado} min={0} max={100} step={1} onChange={setReciclado} />
            <SliderCtl label="Roupas novas (kg/ano)" value={roupas} min={0} max={60} step={1} onChange={setRoupas} />
            <SliderCtl label="Eletrônicos (kg/ano)" value={eletronicos} min={0} max={40} step={1} onChange={setEletronicos} />
            <NatureTag kind="estimativa" />
          </div>

          <div className="sim-results">
            <ResultCard label="Pegada estimada anual" value={fmtTons(atual.total)} kind="amber" hint="Soma de mobilidade + energia + alimentação + resíduos + consumo" />

            <div className="card">
              <h3 style={{ marginTop: 0 }}>Decomposição (kg CO₂e/ano)</h3>
              {[
                ['Mobilidade', atual.mobilidade],
                ['Energia', atual.energia],
                ['Alimentação', atual.dieta],
                ['Resíduos (líq.)', atual.residuos],
                ['Consumo', atual.consumo],
              ].map(([nome, valor]) => {
                const v = valor as number;
                const pct = atual.total > 0 ? Math.min((v / atual.total) * 100, 100) : 0;
                return (
                  <div key={nome as string} style={{ marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span>{nome}</span>
                      <span className="mono">{fmtNum(v)} kg</span>
                    </div>
                    <div className="meter" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} aria-label={`${nome} ${Math.round(pct)}%`}>
                      <span style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="card" style={{ borderColor: 'var(--green-500)', background: 'var(--green-100)' }}>
              <h3 style={{ marginTop: 0, color: 'var(--green-800)' }}>E se eu mudar? 🌱</h3>
              <p style={{ fontSize: '0.88rem', margin: 0 }}>
                Cenário: reduzir carro para 4 dias/semana (trocando o resto por ônibus/bicicleta),
                adotar energia solar, dieta com menos carne, compostar orgânicos e consumir menos.
              </p>
              <div className="stat stat--green" style={{ marginTop: 12 }}>
                {diferenca > 0 ? `−${fmtTons(diferenca)}` : '—'}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--ink-soft)' }}>
                Redução estimada em relação ao cenário atual. Lembrete: isso não gera “crédito”
                pessoal — é educação para decisões e políticas públicas.
              </p>
            </div>

            <SourceList ids={[21, 22, 23, 24]} />
          </div>
        </div>
      </div>
    </section>
  );
}

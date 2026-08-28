export interface Participante {
  nome: string;
  emoji: string;
  descricao: string;
  escala: string;
  custoEntrada: string;
  barreira: string;
  tag: 'dado' | 'estimativa' | 'cenario' | 'proposta' | 'conceito';
}

/**
 * Perfis comparativos — conteúdo qualitativo fundamentado em literatura
 * (ver Fontes). Valores quantitativos só entram com fonte verificada.
 */
export const PARTICIPANTES: Participante[] = [
  {
    nome: 'Grandes empresas',
    emoji: '🏢',
    descricao: 'Compradores e vendedores estruturados de créditos; emissores obrigados no futuro SBCE. Acesso a consultoria, jurídico e mercados.',
    escala: 'Milhares a milhões de tCO₂e',
    custoEntrada: 'Alto em volume, baixo relativo (%)',
    barreira: 'Pouca — têm equipe e capital para compliance e voluntariado',
    tag: 'dado',
  },
  {
    nome: 'Grandes projetos',
    emoji: '🌲',
    descricao: 'Projetos de larga escala (REDD+, reflorestamento industrial) com metodologia e registro em padrões como Verra e Gold Standard.',
    escala: 'Dezenas a centenas de milhares de ha',
    custoEntrada: 'R$ milhões (estudo, MRV, validação, verificação)',
    barreira: 'Capital de giro antes da primeira emissão de créditos',
    tag: 'dado',
  },
  {
    nome: 'Agricultores familiares',
    emoji: '🚜',
    descricao: '~5 milhões de estabelecimentos (77% do total, 23% da área — Censo Agro 2017). Potencial em SAF, recuperação de pasto e solo.',
    escala: 'Poucos ha por família',
    custoEntrada: 'Proporcionalmente altíssimo para certificação isolada',
    barreira: 'Escala, titulação, assistência técnica, custo de MRV, acesso a crédito',
    tag: 'dado',
  },
  {
    nome: 'Cooperativas',
    emoji: '🤝',
    descricao: 'Caminho natural de agregação: dividem custos de MRV, certificação e gestão; concentram oferta e poder de negociação.',
    escala: 'Centenas a milhares de membros',
    custoEntrada: 'Médio, diluído entre membros',
    barreira: 'Governança, capital de giro e capacidade técnica',
    tag: 'proposta',
  },
  {
    nome: 'Povos indígenas e tradicionais',
    emoji: '🛡️',
    descricao: 'Detentores de florestas em pé com papel central na conservação. Exigem respeito a direitos territoriais, CLPI (Convenção 169 OIT) e repartição justa.',
    escala: 'Territórios de milhares de ha',
    custoEntrada: 'Altíssimo sem apoio',
    barreira: 'Titulação/consulta prévia, risco de apropriação indevida, salvaguardas',
    tag: 'dado',
  },
  {
    nome: 'Catadores e cooperativas de reciclagem',
    emoji: '♻️',
    descricao: 'Base da economia circular no Brasil. Benefícios climáticos reais (materiais reciclados evitam emissões), mas raramente acessam mercados de carbono.',
    escala: 'Toneladas/mês por cooperativa',
    custoEntrada: 'Alto para metodologias convencionais',
    barreira: 'Formalização, infraestrutura, ausência de metodologia acessível de baixo custo',
    tag: 'dado',
  },
  {
    nome: 'Cidadãos comuns',
    emoji: '🧑‍🌾',
    descricao: 'Ações cotidianas (mobilidade, energia, consumo) reduzem emissões, mas não geram crédito negociável automaticamente — e não deveriam.',
    escala: 'kg CO₂e por pessoa/ano',
    custoEntrada: 'n/a',
    barreira: 'Sem metodologia individual de crédito; risco de greenwashing se tratado como “crédito”',
    tag: 'dado',
  },
  {
    nome: 'Municípios',
    emoji: '🏛️',
    descricao: 'Gestores de resíduos, mobilidade, saneamento e áreas verdes. Podem ser hubs de projetos de economia circular e regeneração urbana.',
    escala: 'Municipal',
    custoEntrada: 'Médio; depende de capacidade técnica local',
    barreira: 'Orçamento, capacitação, articulação com estados e União',
    tag: 'proposta',
  },
];

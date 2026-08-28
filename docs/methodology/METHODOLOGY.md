# METHODOLOGY — Como este projeto é feito

**Versão:** 1.0 · **Data:** 2026-08-27 · **Autor:** Sentinel (Hermes) sob direção do PI (Optimus)

## Princípios

1. **Nada de dados inventados.** Toda informação factual tem fonte com URL verificada
   (resolução confirmada na data de acesso) e identificador `[FONTE nnn]`.
2. **Natureza declarada.** Cada conteúdo carrega uma das cinco etiquetas:
   - **DADO OBSERVADO** — fonte verificada.
   - **ESTIMATIVA** — resultado calculado com fatores e premissas declarados.
   - **CENÁRIO** — simulação econômica hipotética.
   - **PROPOSTA** — política pública sugerida, não em vigor.
   - **CONCEITO EXPERIMENTAL** — ideia não implementada.
3. **Redução estimada ≠ crédito certificado.** Nenhum simulador trata "tonelada evitada"
   como "crédito emitido". Crédito exige metodologia, adicionalidade, baseline, MRV,
   validação, verificação, registro e emissão.
4. **Integridade financeira.** Receitas são sempre "potenciais"/"cenário"; preços
   parametrizáveis em três cenários (conservador, referência, otimista).
5. **Divergências divulgadas.** Estudos conflitantes são apresentados com suas fontes.
6. **Anti-alucinação.** Citação não verificável é removida ou marcada `[NÃO VERIFICADO]`.

## Ciclo de qualidade

```
PESQUISAR → MODELAR → DESENVOLVER → TESTAR → REVISAR CONTEÚDO → VALIDAR DADOS →
VALIDAR UX → VALIDAR SEGURANÇA → CORRIGIR → RETESTAR → PUBLICAR → TESTAR PRODUÇÃO → REFINAR
```

Checklist por módulo: dado correto? fonte existe? realidade × proposta claro? risco de
greenwashing? exagero? usuário entende? visual interessante? interação funciona? responsivo?
acessível? seguro? há experiência melhor?

## Fatores de emissão e premissas

Todos os fatores estão em `src/utils/carbon.ts`, com ID da fonte por fator. São faixas de
literatura nacional/internacional adaptadas para educação; não substituem engenharia, MRV
ou due diligence. O usuário sempre pode alterar premissas nos simuladores.

## Verificação de fontes

Rotina executada em 2026-08-27: 36 URLs checadas via HTTP (curl); 28 diretas 200/2xx; 8
corrigidas para URLs oficiais atuais (3 confirmadas 200; 2 com anti-bot — domínio legítimo
confirmado por busca). Resultado: 36/36 fontes `verificado: true` no registro
(`src/data/sources.ts`).

## Uso de IA

Projeto conduzido por agente de IA (Hermes/Sentinel) sob direção e revisão do autor. Nenhuma
saída de IA entra como fato sem verificação na fonte. Pesquisa delegada a subagentes
(equivalente ao "Nó Pesquisador" da frota); arquitetura/dev/cyber executados pelo agente
orquestrador com validação por ferramentas reais (build, testes, auditoria, navegação em
produção).

## Limitações

- Simuladores educacionais; cenários não são previsões.
- Fotografia normativa datada (SBCE em regulamentação — revalidar periodicamente).
- Mapa com fronteiras estaduais reais (CC-BY-4.0) e biomas como camada de conteúdo (sem
  polígonos não verificados).

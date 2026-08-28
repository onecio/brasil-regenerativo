# ACCESSIBILITY — Acessibilidade (WCAG 2.2 AA)

Alvo declarado: **WCAG 2.2 nível AA** sempre que viável. Status: implementação estrutural
presente; auditoria automatizada + manual pendente de refinamento contínuo.

## Implementado

- **Navegação por teclado** — skip-link ("Pular para o conteúdo"), foco visível
  (`:focus-visible`), mapa com `tabIndex=0` + Enter/Espaço, chips com `aria-pressed`.
- **Landmarks** — `<header>`, `<main id="main">`, `<footer>`, `<nav aria-label>`.
- **Semântica** — headings hierárquicos, `<table>` com `th scope`, `role="list"` no fluxo.
- **Contraste** — paleta projetada para AA (verificada visualmente nos tons principais);
  modo escuro via `prefers-color-scheme`.
- **Redução de movimento** — `prefers-reduced-motion` desativa animações e scroll suave.
- **aria** — labels em sliders (associados via `id`/`output`), progressbars com
  `role="progressbar"` + `aria-valuenow`, gráficos com tooltips e legendas, ícones com
  `aria-hidden` + texto.
- **Textos alternativos** — SVG do mapa com `role="img"` + `aria-label`; favicon decorativo.
- **Fontes legíveis** — sistema (sem webfonts que bloqueiam render), `letter-spacing` e
  `line-height` adequados; `lang="pt-BR"`.

## Pendências / melhorias contínuas

- Auditoria automatizada (axe-core) em CI quando Actions for habilitado.
- Testes manuais com leitores de tela (NVDA/VoiceOver) e navegação 100% teclado.
- Revisão de contraste nos estados hover/active de chips e cards no modo escuro.
- Foco: expandir `:focus-visible` para todos os elementos interativos (já coberto por
  regra global, revisar casos específicos).

## Como testar

1. Teclado: Tab percorre toda a página com anel visível; Enter/Espaço ativa chips e mapa.
2. `prefers-reduced-motion` no sistema operacional desativa animações.
3. Zoom 200% sem perda de conteúdo (layout responsivo até ~320px).
4. Leitor de tela: ler Home → Simulador → App e conferir labels.

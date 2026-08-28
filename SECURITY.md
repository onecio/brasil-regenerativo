# Security Policy — Brasil Regenerativo

## Reportando vulnerabilidades

Este é um projeto demonstrativo (estático, sem backend, sem coleta de dados). Para reportar
vulnerabilidades: abra uma issue privada em
<https://github.com/onecio/brasil-regenerativo/security/advisories> ou envie e-mail ao
mantenedor (ver commit history no GitHub).

Compromisso: triagem em até 7 dias úteis; correção de achados Críticos/Altos antes de
qualquer release que os contenha.

## Postura de segurança

- **Sem segredos no frontend** — nenhuma chave, token ou credential no repositório.
- **Sem dados pessoais** — o protótipo roda localmente (LocalStorage); nenhuma telemetria.
- **CSP ativa** — meta Content-Security-Policy no `index.html` (GH Pages não envia headers).
- **Dependências auditadas** — `npm audit` com 0 vulnerabilidades na última verificação
  (2026-08-27); política de upgrade imediato para correções de segurança.
- **Revisão por padrão** — SECURITY-REPORT.md gerado a cada ciclo de release (docs/security).

## Ambientes

| Ambiente | URL | Notas |
|----------|-----|-------|
| Produção | https://onecio.github.io/brasil-regenerativo/ | GitHub Pages (HTTPS, branch gh-pages) |
| Local | `npm run dev` / `npm run preview` | sem autenticação |

## Disclosure

Achados não exploráveis publicamente devem ser reportados de forma responsável. Não realizamos
bug bounty; o projeto é educacional e open source (MIT).

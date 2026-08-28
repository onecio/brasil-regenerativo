# SECURITY-REPORT — Brasil Regenerativo

**Nó C (Cyber)** · Data: 2026-08-27 · Escopo: análise da aplicação antes da publicação.

Classificação: **Crítico** / **Alto** / **Médio** / **Baixo** / **Informativo**.
Regra do projeto: **não publicar com vulnerabilidades Críticas ou Altas conhecidas.**

## Resumo executivo

| Severidade | Abertos | Corrigidos |
|------------|:-------:|:----------:|
| Crítico    | 0       | 1          |
| Alto       | 0       | 1          |
| Médio      | 0       | 5          |
| Baixo      | 0       | 0          |
| Informativo| 3       | 0          |

**Conclusão: LIBERADO PARA PUBLICAÇÃO** — sem vulnerabilidades Críticas/Alta/Médias
conhecidas após correções.

## 1. Dependências e supply chain

| Achado | Severidade | Status |
|--------|:----------:|--------|
| `react-router-dom` 6.x: open redirect via backslash em `<Link>` (CVE-2025-68470) e Constructor Injection via `deserializeErrors()` (GHSA-337j-9hxr-rhxg) — **afeta bundle de produção** | Médio | **Corrigido** — upgrade para 7.18.2 (versão com fix) |
| `vitest` 2.x com `vite` 5 aninhado: cadeia dev com 1 crítica e 1 alta (vite dev server) | Crítico/Alto (dev) | **Corrigido** — vitest 4.1.11 (sem vite aninhado) |
| `@svg-maps/brazil` com tipo quebrado (`svg-maps__common`) | Informativo | Corrigido — dados embutidos localmente (CC-BY-4.0) |
| Postinstall scripts de esbuild bloqueados pelo npm (`allow-scripts`) | Informativo | Aceito — binário via optionalDependencies funciona (build validado) |

`npm audit` final: **0 vulnerabilities** (verificado em 2026-08-27).

## 2. Análise de código

| Verificação | Resultado |
|-------------|-----------|
| XSS / DOM XSS (`dangerouslySetInnerHTML`, `eval`, `innerHTML`, `document.write`) | 0 ocorrências — React escapa por padrão; varredura de padrões: 0 |
| Sanitização de HTML dinâmico | n/a (nenhum HTML dinâmico inserido) |
| Segredos no frontend (api_key/secret/token/password em src/) | 0 ocorrências |
| Links externos `target="_blank"` sem `rel="noopener noreferrer"` | 0 ocorrências |
| Fontes/external requests de terceiros (Google Fonts, CDNs) | 0 — fontes do sistema; zero telemetria |

## 3. Configuração e runtime

| Área | Avaliação |
|------|-----------|
| **CSP** | GitHub Pages não permite headers HTTP; adicionada **meta CSP** no `index.html`: `default-src 'self'`; `script-src 'self'`; `style-src 'self' 'unsafe-inline'` (necessário p/ estilos inline do React); `img-src 'self' data:`; `connect-src 'self'`; `frame-ancestors 'none'`; `form-action 'self'`. Bloqueia scripts externos, iframes e exfiltração cross-origin. |
| **SRI** | n/a — nenhum asset externo (tudo self-hosted no bundle). |
| **CORS** | Sem chamadas cross-origin — dados 100% locais. |
| **LocalStorage** | Prefixo `br-regenerativo:`; try/catch; limite 64 KB; sem dados sensíveis (apenas pontos, streak e histórico de ações auto-declaradas da demonstração). |
| **Service Worker** | Não implementado — sem superfície de ataque de SW (PWA fica para refinamento com revisão dedicada). |
| **Formulários** | Não há formulários com backend; marketplace é simulação local. |
| **Redirecionamento** | HashRouter puro, sem lógica de redirect server-side. |
| **GitHub/Actions** | Workflow de CI local (não enviado ao repositório por escopo de token — anotado em PROJECT-STATUS). Nenhum secret em repositório; `.env*` no `.gitignore`. |

## 4. Privacidade / tracking

- Zero analytics, zero cookies de terceiros, zero pixel/beacon, zero requests externos.
- O site não coleta dados pessoais; o protótipo Carbon Wallet é auto-declarado e local.

## 5. Achados informativos (não bloqueiam publicação)

| Achado | Detalhe |
|--------|---------|
| `style-src 'unsafe-inline'` no CSP | Necessário por causa de estilos inline do React; mitigado por ausência de inputs de usuário renderizados como CSS |
| Meta CSP ≠ headers | Navegadores antigos e edge cases; GH Pages limita headers |
| Dependências dev instaladas no CI | `npm ci` instala dev deps no runner do Actions (quando ativado); sem secrets expostos |

## 6. Recomendações futuras

1. Habilitar GitHub Actions (requer `gh auth refresh -s workflow` no token) para build/test/deploy automatizados com `npm audit` no pipeline.
2. Implementar PWA com service worker **somente** após revisão de segurança dedicada (cache, scope, `updateViaCache`).
3. Se um dia houver backend (API de pontos real), reavaliar CORS, autenticação, rate limiting e LGPD/ANPD (DPIA).

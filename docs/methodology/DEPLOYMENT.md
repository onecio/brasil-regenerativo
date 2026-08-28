# DEPLOYMENT — Publicação (GitHub Pages)

## Estado atual (2026-08-27)

- Repositório: `onecio/brasil-regenerativo` (público).
- Produção: <https://onecio.github.io/brasil-regenerativo/> — branch `gh-pages` com o
  build estático (HTTPS).
- Build local validado: `npm run test` (10/10) + `npm run build`.

## Pipeline atual (manual, sem Actions)

O token `gh` da conta não tem escopo `workflow`, então o GitHub Actions não pôde ser
enviado. O deploy é feito por branch `gh-pages`:

```bash
npm run build
cp -r dist/. /tmp/brpages/          # repo temporário apontando para origin
cd /tmp/brpages && git add -A && git commit -m "deploy: ..." && git push origin gh-pages
```

## Pipeline desejado (GitHub Actions)

O arquivo `.github/workflows/deploy.yml` está no diretório do projeto (fora do git por
escopo de token). Para ativar:

1. `gh auth refresh -s workflow` (interativo) ou adicionar escopo no GitHub.
2. `git add .github/workflows/deploy.yml && git commit && git push`.
3. O workflow roda: `npm ci` → `npm run test` → `npm run build` →
   `upload-pages-artifact` → `deploy-pages`.

## Notas

- `base: './'` no Vite → assets relativos funcionam em subpath e em `file://`.
- `.nojekyll` incluído no build para evitar processamento Jekyll.
- GitHub Pages serve HTTPS com certificado automático (`*.github.io`).
- Sem custom domain configurado.

# Portfólio Felipe Araújo — notas para o Claude

- Leia `HANDOFF.md` antes de mexer: estrutura, pipeline do Figma, pendências.
- Site estático, sem build. Não introduza bundler/framework sem pedido explícito.
- `assets/js/data.js` é gerado: edite `scan/*.json` ou `scripts/build_data.py` e rode `python3 scripts/build_data.py`.
- Textos: interface em `assets/js/i18n.js`, projetos em `assets/js/i18n-projects.js` (9 idiomas). Mudou um texto em PT, atualize os outros idiomas.
- Peças sempre inteiras (sem `object-fit: cover` em posts); capas via `cover()`/`isPost()` em `main.js`.
- Teste local com `python3 -m http.server 8080` + screenshots Playwright (1600×900 e iPhone 13) antes de abrir PR.
- Deploy: merge na `main` → GitHub Pages.

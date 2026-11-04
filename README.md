# Portfólio — Felipe Araújo

Site estático, sem build, pronto para GitHub Pages. Animações com GSAP + ScrollTrigger e smooth scroll com Lenis (vendorizados em `assets/vendor`). Fontes self-hosted: Inter Tight (variável), Instrument Serif e JetBrains Mono.

## Estrutura

| Caminho | O que é |
|---|---|
| `index.html` | página única (hero, destaques, índice, arquivo, disciplinas, contato) |
| `assets/js/config.js` | **seus dados**: nome, cargo, e-mail, redes. Edite aqui. |
| `assets/js/data.js` | gerado a partir dos manifestos do Figma. Não edite à mão. |
| `assets/js/main.js` | todas as interações |
| `assets/css/style.css` | estilos |
| `assets/work/<projeto>/` | imagens exportadas do Figma (`<nodeId>.webp` + `<nodeId>_th.webp`) |
| `scan/*.json` | manifesto de cada arquivo Figma: páginas varridas e frames escolhidos |
| `scripts/build_data.py` | junta `scan/*.json` → `assets/js/data.js` |
| `scripts/grab.py` | baixa um PNG exportado do Figma e gera webp + miniatura |
| `assets/js/i18n.js` | textos da interface em 9 idiomas (PT, EN, ES, FR, DE, IT, RU, JA, ZH) |
| `assets/js/i18n-projects.js` | resumos e tags dos projetos traduzidos |
| `scan/EXPORT_TODO.tsv` | lista dos frames a exportar do Figma |
| `envio.html` | a antiga página de envio de arquivos (preservada) |

## Efeitos

- Preloader com contador e cortina
- Título com *text pressure* (peso variável segue o cursor) e rastro de imagens no hero
- Marquee que acelera e inclina com a velocidade do scroll
- Texto que acende palavra por palavra, contadores, selo circular girando
- Cards empilhados (sticky) nos destaques
- Índice com hover que revela a peça seguindo o mouse + filtros por disciplina
- Arquivo infinito arrastável com todas as peças + lightbox
- Disciplinas em cards expansíveis
- Case de cada projeto em overlay com rota `#/p/<slug>`, paleta, páginas varridas e galeria
- Cursor custom, botões magnéticos, toast estilo *dynamic island*, grão animado
- Respeita `prefers-reduced-motion`

## Rodar local

```bash
python3 -m http.server 8080
```

## Publicar no GitHub Pages

Settings → Pages → Deploy from a branch → escolha a branch e a pasta `/ (root)`.

## Idiomas

O site abre no idioma do navegador (ou português, se não houver tradução). Dá para forçar com `?lang=en`, `?lang=es` etc., e o seletor no menu lembra a escolha.

## Atualizar as artes

1. Ajuste `scan/<arquivo>.json` (frames escolhidos).
2. Exporte com o conector do Figma e `scripts/grab.py <slug> <nodeId> <url>` (ver `scripts/EXPORT_AGENT.md`).
3. Rode `python3 scripts/build_data.py`. Só peças com imagem aparecem no site.

Pendentes: **Kroma Tintas** e **Revival Nights** estão em times do Figma no plano Starter, que bloqueia a exportação. Duplique os arquivos no time Pro e exporte de novo.

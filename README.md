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

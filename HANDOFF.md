# Handoff — Portfólio Felipe Araújo

Documento para continuar o projeto (por você, por outro dev ou por uma nova sessão do Claude).
Estado em **04/11/2026**.

---

## 1. Links

| O quê | Onde |
|---|---|
| Site no ar | https://fliparaujor.github.io/felipe-araujo-portfolio/ |
| Repositório | https://github.com/Fliparaujor/felipe-araujo-portfolio (antes se chamava `envio`) |
| Branch de trabalho | `claude/elegant-johnson-5xnt0c` (já mergeada na `main` pelos PRs #1–#4) |
| Deploy | GitHub Pages → `main` → `/ (root)`. Acompanhe em *Actions → pages build and deployment* |
| Página antiga de envio de arquivos | `envio.html` (lê `link.txt` da `main`) |

---

## 2. O que é

Site **estático** (HTML + CSS + JS puro, sem build), animado com **GSAP 3.13 + ScrollTrigger** e **Lenis** (smooth scroll), todos vendorizados em `assets/vendor/`. Fontes self-hosted em `assets/fonts/`: Inter Tight (variável, latin + cirílico), Instrument Serif (itálico), JetBrains Mono.

**Conteúdo:** 21 projetos, 379 peças exportadas do Figma (24 arquivos varridos, 156 páginas).
**Idiomas:** PT, EN, ES, FR, DE, IT, RU, JA, ZH — detecção automática pelo navegador, `?lang=xx` e seletor no menu.

### Seções da página (`index.html`)
1. **Preloader** — contador 000→100 + cortina laranja.
2. **Hero** — nome com *text pressure* (peso da fonte segue o cursor) + rastro de imagens ao mover o mouse.
3. **Marquee** — duas faixas que aceleram/inclinam com a velocidade do scroll.
4. **Sobre** — texto que acende palavra por palavra + selo circular girando.
5. **Destaques** — cards empilhados (sticky) com esteira de posts inteiros.
6. **Índice** — lista de projetos com filtro por disciplina e preview que segue o mouse.
7. **Arquivo** — galeria infinita arrastável com todas as peças + lightbox.
8. **Disciplinas** — sanfona com faixa de peças por área.
9. **Clientes** — marquee de nomes.
10. **Contato** — título grande, botão que copia o e-mail (toast estilo *dynamic island*), Instagram.
11. **Case do projeto** — overlay em `#/p/<slug>`: esteira, grade de posts, banners largos, landing pages em janela de navegador que rola sozinha, paleta, páginas do Figma.

---

## 3. Estrutura de arquivos

```
index.html                 página única
envio.html                 página antiga de envio de arquivos (preservada)
assets/
  css/style.css            todos os estilos (tokens em :root)
  js/config.js             SEUS DADOS: nome, cargo, e-mail, Instagram, WhatsApp, Behance
  js/i18n.js               textos da interface nos 9 idiomas + seletor
  js/i18n-projects.js      resumos/tags/subtítulos dos projetos traduzidos (8 idiomas)
  js/data.js               GERADO por scripts/build_data.py — não editar à mão
  js/main.js               todas as interações
  vendor/                  gsap, ScrollTrigger, lenis (+ SplitText/Draggable/Inertia não usados)
  fonts/                   woff2
  work/<slug>/             imagens: <nodeId>.webp (até 1600px) + <nodeId>_th.webp (miniatura)
scan/
  <slug>.json              manifesto de cada arquivo Figma (páginas varridas + frames escolhidos)
  EXPORT_TODO.tsv          lista de todos os frames a exportar (slug, fileKey, nodeId, maxDimension, nome)
scripts/
  build_data.py            scan/*.json + assets/work → assets/js/data.js
  grab.py                  baixa um PNG do Figma e gera webp + miniatura
  EXPORT_AGENT.md          passo a passo de exportação (feito para um agente do Claude)
README.md                  resumo rápido
HANDOFF.md                 este documento
```

---

## 4. Rodar local

```bash
python3 -m http.server 8080
```
Abra http://localhost:8080 (precisa ser via servidor, não `file://`).

---

## 5. Tarefas comuns

### Trocar dados pessoais
Edite `assets/js/config.js` (e-mail, Instagram, WhatsApp, Behance, nome, ano de início).
O **cargo** exibido vem de `assets/js/i18n.js` (chave `role` de cada idioma).

### Editar textos da interface
`assets/js/i18n.js` → objeto de cada idioma. Chaves com HTML (`*_h`, `contact_h`) aceitam `<em class="serif">` para o trecho em itálico.
Para **adicionar um idioma**: copie o bloco `en`, troque o código (ex.: `nl`) e traduza; ele aparece sozinho no seletor.

### Editar o texto de um projeto
- Português: `scan/<slug>.json` → `summary_pt`, `tags`; depois rode `python3 scripts/build_data.py`.
- Outros idiomas: `assets/js/i18n-projects.js`.
- Nome curto exibido / agrupar arquivos do mesmo cliente: `OVERRIDE` em `scripts/build_data.py`.
- Ordem e quais vão para **Destaques**: `ORDER` e `FEATURED` em `scripts/build_data.py`.
- Esconder uma peça específica: `EXCLUDE` em `scripts/build_data.py`.

### Adicionar / atualizar peças do Figma
1. Escolha os frames e coloque em `scan/<slug>.json` (campo `selected`, com `nodeId`, `w`, `h`, `format`, `hero`).
   Para um arquivo novo, crie um JSON no mesmo formato (veja qualquer `scan/*.json`).
2. Exporte cada frame: pelo conector do Figma (`get_screenshot` com `maxDimension` da `EXPORT_TODO.tsv`) e rode
   `python3 scripts/grab.py <slug> <nodeId> "<url_png>"` (as URLs expiram em minutos).
   Alternativa manual: exporte PNG no Figma e converta com o mesmo `grab.py` adaptando para ler arquivo local.
3. `python3 scripts/build_data.py` → gera `assets/js/data.js`. Só peças com imagem aparecem no site; imagens lisas (frames vazios) são descartadas automaticamente.
4. Commit + push na `main` (ou PR) → Pages publica.

> Em ambiente de nuvem do Claude Code, `www.figma.com` precisa estar em **Allowed domains** da rede do ambiente para o download funcionar.

### Publicar
Merge na `main`. O GitHub Pages republica em ~1–2 min (às vezes a fila do Actions demora; dá para cancelar runs antigos ou *Re-run*). Depois, **Ctrl+Shift+R** no navegador.

---

## 6. Pendências

| Item | Situação | Como resolver |
|---|---|---|
| **Kroma Tintas** (12 peças) | Não exportado: o arquivo está no time "Atona" (plano Starter, assento *View*) e o Figma bloqueia a exportação via MCP | Duplicar `WVWDMyHwFJv5h0xnaWKXJI` no time Pro (FELIPE's team), atualizar `fileKey` em `scan/kroma.json` e exportar |
| **Revival Nights** (16 peças) | Mesmo bloqueio de plano Starter | Duplicar `iQ70uo5rgKvGiD4E4kJtWl` no time Pro e exportar |
| **Linda Colchões** | Fotos são banco de imagem marcadas "não publicar" no próprio handoff do Figma | Decidir se mantém; para esconder, remova de `ORDER`/adicione os nodes em `EXCLUDE`, ou apague `scan/proto-bwv.json` |
| **Coronel Lucas** | Material eleitoral com foto e dados provisórios | Revisar antes de divulgar |
| **Mormaço TCG** | Uma tela da landing ainda mostra "ilustração a fornecer" | Excluir o node em `EXCLUDE` ou atualizar no Figma e reexportar |
| Seven Church `35:1706`, Forno `74:12`, Monteplan `200:635` | Frames vazios/fundos — já ocultos | — |
| WhatsApp / Behance | Vazios em `config.js` | Preencher se quiser os links no contato |
| Domínio próprio | Não configurado | Settings → Pages → Custom domain |
| OG image | Não há imagem de compartilhamento | Exportar um 1200×630 e adicionar `<meta property="og:image">` |

---

## 7. Inventário Figma

| Projeto no site | slug | fileKey(s) | Peças |
|---|---|---|---|
| Monteplan | monteplan | tlYkJ87ReJnAnICRVZRWJa | 40 |
| Economia Farma | economia-farma | LBBcdxtov9afKtJjaNb336 | 69 |
| Mormaço TCG | mormaco-tcg | ANCdtkkPKJ2huwYxdPEtf3 | 22 |
| Rise | rise | YJq1Yeh9ht8sx8uoJmHXIl | 11 |
| Bispet | bispet | b7JMjRncAXhFlQWXQnfxRe | 23 |
| Coronel Lucas | proto-jhh | jHhD5dTLrizJWSPynrCFU3 | 13 |
| Linda Colchões | proto-bwv | bwVZjU9oh6Uq2hOZoXWFu4 | 16 |
| Seven Church | sede + untitled-ws8 | sONOe7mnaPumfYnGjBqIz0, WS8PI5x3H6lAjDWYqqGEQV | 23 |
| ZIP Imóveis | zip-imoveis | lcLBw8OYzLV2jiTa1hCsrk | 10 |
| WIND | untitled-sie | SIeA89hj4zmqldTNur8W1K | 8 |
| 7 Odara | odara | 2Xm9nBFwPnKuSs3bkcRcfX | 11 |
| Summit Investimentos | cr-summit | egJS5I5m3jj35tuOsWW062 | 17 |
| Dra. Aleksandra | dra-alexandra | HCWFBhyfMhOzujhoBejTOt | 19 |
| Feminité | feminite | ZCEvLe9T1nJTHSWdFdfQoz | 12 |
| Jardelly Advocacia | jardelly | B7EqwbOXQGueF33TL0eLME | 16 |
| Gbex | untitled-qqw | qqwHoSs2yVQWlGNnuYhvj4 | 12 |
| Barros Martins | untitled-ks7 | Ks7JSpcrmyJ7e5PwykRWu8 | 12 |
| Forno Lab | forno | 4DuVrp1fTlCmb3039Aejsy | 20 |
| Hub do Servidor | cr-hub | mernERixSHvs4f4QSS3rQR | 8 |
| Multimarcas — Agosto | cr-agosto | BzljX6yHVV36XuQT4v0DYL | 12 |
| UPAR | untitled-91m | 91M2yxwBuhJIn88mppp6Cs | 5 |
| *(oculto)* Kroma Tintas | kroma | WVWDMyHwFJv5h0xnaWKXJI | 0/12 |
| *(oculto)* Revival Nights | revival-night | iQ70uo5rgKvGiD4E4kJtWl | 0/16 |

Links: `https://www.figma.com/design/<fileKey>`.

---

## 8. Design system (resumo)

- **Cores** (`:root` em `style.css`): fundo `#0c0c0b`, texto `#ece8df`, apagado `#8b877e`, linha `rgba(236,232,223,.12)`, acento `#ff5a1f`, acento 2 `#ffb38a`.
- **Tipografia:** display Inter Tight 800, tracking −0.055em · itálico Instrument Serif para ênfase (`<em class="serif">`) · rótulos JetBrains Mono 12px caixa-alta.
- **Easing:** `--ease: cubic-bezier(.16,1,.3,1)`; GSAP `expo.out`.
- **Cores dos cards:** vêm da `palette` de cada projeto (`scan/*.json`); a cor do texto é calculada por contraste.
- **Acessibilidade:** respeita `prefers-reduced-motion` (desliga Lenis, esteiras e animações), foco visível, `aria` no seletor de idioma, lightbox navegável por teclado (← → Esc).

## 9. Mapa do código (`assets/js/main.js`)

| Bloco (procure pelo comentário) | Faz |
|---|---|
| `helpers de cor` / `media` / `cover` / `isPost` | escolha de imagem e capa (sempre peça inteira, sem logo cortado) |
| `Lenis` | smooth scroll + âncoras |
| `HERO: text pressure` / `image trail` | efeitos do hero |
| `cursor` / `magnetic` | cursor custom e botões magnéticos |
| `marquee com velocidade` / `loop principal` | marquees e ticker |
| `reveals` | títulos, palavras do "Sobre", contadores, selo |
| `DESTAQUES (sticky stack)` / `reel` | cards empilhados e esteira de posts |
| `LISTA + filtros` | índice, filtros e preview |
| `ARQUIVO infinito` | galeria arrastável (inércia, wrap, carga preguiçosa) |
| `SERVIÇOS` | sanfona de disciplinas |
| `LIGHTBOX` / `CASE overlay` | visualizador e página do projeto (rota `#/p/<slug>`) |
| `PRELOADER` | contador e entrada |

---

## 10. Para continuar com o Claude

Abra uma sessão neste repositório e cole, por exemplo:

> Leia o HANDOFF.md. Quero [sua mudança]. Rode o site local com `python3 -m http.server 8080`, confira com screenshots no Playwright (desktop 1600×900 e iPhone 13), faça commit e abra um PR para a `main`.

Para exportar mais artes do Figma, garanta `www.figma.com` liberado na rede do ambiente e peça:

> Siga scripts/EXPORT_AGENT.md para exportar os frames de scan/<slug>.json e rode scripts/build_data.py.

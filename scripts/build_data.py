#!/usr/bin/env python3
"""Junta scan/*.json -> assets/js/data.js (window.PORTFOLIO)."""
import json, glob, os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WORK = os.path.join(ROOT, "assets", "work")
# ordem e destaque (editável)
ORDER = ["monteplan", "economia-farma", "mormaco-tcg", "rise", "revival-night", "bispet", "proto-jhh", "proto-bwv", "seven", "zip-imoveis", "untitled-sie", "odara", "cr-summit", "kroma", "dra-alexandra", "feminite", "jardelly", "gbex", "untitled-qqw", "untitled-ks7", "forno"]
_OLD = ["monteplan", "economia-farma", "mormaco-tcg", "rise", "bispet", "revival-night", "proto-jhh", "proto-bwv", "cr-summit", "zip-imoveis", "kroma", "odara", "dra-alexandra", "feminite", "jardelly", "sede", "forno"]
FEATURED = {"monteplan", "economia-farma", "mormaco-tcg", "rise", "revival-night", "bispet"}

# nome curto de exibição + agrupamento de arquivos do mesmo cliente
OVERRIDE = {
    "cr-summit": {"title": "Summit Investimentos"},
    "dra-alexandra": {"title": "Dra. Aleksandra"},
    "feminite": {"title": "Feminité"},
    "forno": {"title": "Forno Lab"},
    "jardelly": {"title": "Jardelly Advocacia"},
    "odara": {"title": "7 Odara"},
    "revival-night": {"title": "Revival Nights"},
    "rise": {"title": "Rise"},
    "sede": {"title": "Seven Church", "group": "seven"},
    "untitled-ws8": {"title": "Seven Church", "group": "seven"},
    "untitled-91m": {"title": "UPAR"},
    "untitled-ks7": {"title": "Barros Martins"},
    "untitled-qqw": {"title": "Gbex"},
    "zip-imoveis": {"title": "ZIP Imóveis"},
    "proto-jhh": {"title": "Coronel Lucas"},
    "proto-bwv": {"title": "Linda Colchões"},
    "cr-hub": {"title": "Hub do Servidor"},
    "untitled-sie": {"title": "WIND"},
    "kroma": {"title": "Kroma Tintas"},
    "cr-agosto": {"title": "Multimarcas — Agosto"},
}

def fid(n): return n.replace(":", "-")

projects = {}
total_pages = 0
files = set()
for path in sorted(glob.glob(os.path.join(ROOT, "scan", "*.json"))):
    m = json.load(open(path, encoding="utf-8"))
    files.add(m["fileKey"])
    total_pages += len(m.get("pages", []))
    ov = OVERRIDE.get(m["slug"], {})
    key = ov.get("group") or m.get("group") or m["slug"]
    m["subtitle"] = m["title"]
    if ov.get("title"): m["title"] = ov["title"]
    p = projects.get(key)
    if not p:
        p = projects[key] = {k: m.get(k) for k in ("title", "subtitle", "client", "category", "tags", "summary_pt", "palette")}
        p.update(slug=key, pages=[], items=[], summary=m.get("summary_pt", ""), fileKeys=[])
        p.pop("summary_pt", None)
    else:  # mescla partes (ex.: economia-farma-a/b)
        p["tags"] = list(dict.fromkeys((p.get("tags") or []) + (m.get("tags") or [])))
        if m.get("summary_pt") and m["summary_pt"] not in p["summary"]:
            p["summary"] = (p["summary"] + " " + m["summary_pt"]).strip()
        p["palette"] = list(dict.fromkeys((p.get("palette") or []) + (m.get("palette") or [])))[:6]
    if m["fileKey"] not in p["fileKeys"]: p["fileKeys"].append(m["fileKey"])
    p["pages"] += [pg["pageName"] for pg in m.get("pages", [])]
    for s in m.get("selected", []):
        base = fid(s["nodeId"])
        full = os.path.join(WORK, m["slug"], base + ".webp"); th = os.path.join(WORK, m["slug"], base + "_th.webp")
        it = {"id": s["nodeId"], "name": s.get("name", ""), "page": s.get("pageName", ""), "w": round(s.get("w") or 1080), "h": round(s.get("h") or 1350), "format": s.get("format", ""), "hero": bool(s.get("hero"))}
        if os.path.exists(full):
            it["src"] = os.path.relpath(full, ROOT).replace(os.sep, "/")
            try:
                from PIL import Image
                with Image.open(full) as im: it["w"], it["h"] = im.size
            except Exception: pass
        if os.path.exists(th):
            it["th"] = os.path.relpath(th, ROOT).replace(os.sep, "/")
            try:
                from PIL import Image
                with Image.open(th) as im: it["tw"], it["thh"] = im.size
            except Exception: pass
        p["items"].append(it)

def rank(p):
    return (ORDER.index(p["slug"]) if p["slug"] in ORDER else 100, p["title"])
out = sorted([p for p in projects.values() if p["items"]], key=rank)
for p in out:
    p["featured"] = p["slug"] in FEATURED
    # imagens disponíveis primeiro, heróis antes
    p["items"].sort(key=lambda i: (not i["hero"], "th" not in i))
data = {"projects": out, "stats": {"files": len(files), "pages": total_pages, "pieces": sum(len(p["items"]) for p in out), "categories": len({p["category"] for p in out})}}
js = "/* gerado por scripts/build_data.py — não edite à mão */\nwindow.PORTFOLIO = " + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n"
open(os.path.join(ROOT, "assets", "js", "data.js"), "w", encoding="utf-8").write(js)
print(f"{len(out)} projetos, {data['stats']['pieces']} peças, {total_pages} páginas, {len(files)} arquivos; com imagem: {sum(1 for p in out for i in p['items'] if 'th' in i)}")

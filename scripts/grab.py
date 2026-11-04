#!/usr/bin/env python3
"""Uso: grab.py <slug> <nodeId> <url_png>  -> assets/work/<slug>/<id>.webp + _th.webp"""
import sys, os, urllib.request, io
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
slug, node, url = sys.argv[1:4]
d = os.path.join(ROOT, "assets", "work", slug); os.makedirs(d, exist_ok=True)
base = os.path.join(d, node.replace(":", "-"))
raw = urllib.request.urlopen(url, timeout=60).read()
im = Image.open(io.BytesIO(raw)).convert("RGB")
w, h = im.size
def fit(im, long_edge, max_w=None):
    w, h = im.size
    s = min(1, long_edge / max(w, h)) if h / w < 2.2 else min(1, (max_w or long_edge) / w)
    return im.resize((max(1, round(w * s)), max(1, round(h * s))), Image.LANCZOS) if s < 1 else im
fit(im, 1600, 1200).save(base + ".webp", "WEBP", quality=80, method=5)
t = fit(im, 640, 480)
if t.size[1] / t.size[0] > 2.2: t = t.crop((0, 0, t.size[0], int(t.size[0] * 2.1)))
t.save(base + "_th.webp", "WEBP", quality=72, method=5)
print("ok", slug, node, w, h, os.path.getsize(base + ".webp") // 1024, "KB")

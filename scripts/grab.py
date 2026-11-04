#!/usr/bin/env python3
"""Uso: grab.py <slug> <nodeId> <url_png>  -> assets/work/<slug>/<id>.webp + _th.webp"""
import sys, os, io, subprocess
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
slug, node, url = sys.argv[1:4]
d = os.path.join(ROOT, "assets", "work", slug); os.makedirs(d, exist_ok=True)
base = os.path.join(d, node.replace(":", "-"))
raw = subprocess.run(["curl", "-sSfL", "--retry", "3", "-m", "120", url], check=True, capture_output=True).stdout
im = Image.open(io.BytesIO(raw)).convert("RGB")
w, h = im.size
def fit(im, long_edge, short_edge, long_cap):
    w, h = im.size
    ar = max(w, h) / min(w, h)
    if ar <= 2.2: sc = long_edge / max(w, h)
    else: sc = min(short_edge / min(w, h), long_cap / max(w, h))
    sc = min(1, sc)
    return im.resize((max(1, round(w * sc)), max(1, round(h * sc))), Image.LANCZOS) if sc < 1 else im
fit(im, 1600, 1100, 7000).save(base + ".webp", "WEBP", quality=80, method=5)
t = fit(im, 640, 480, 4000)
tw, th = t.size
if th / tw > 2.2: t = t.crop((0, 0, tw, int(tw * 2.1)))
elif tw / th > 2.2: t = t.crop((0, 0, int(th * 1.6), th))
t.save(base + "_th.webp", "WEBP", quality=72, method=5)
print("ok", slug, node, w, h, os.path.getsize(base + ".webp") // 1024, "KB")

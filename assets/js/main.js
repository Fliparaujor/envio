/* =========================================================
   Portfólio — interações
   Efeitos inspirados em React Bits (TextPressure, ScrollVelocity,
   BlurText, Magnet), Skiper UI (image trail, sticky stack),
   Cult UI (dynamic island, expandable cards) e 21st.dev / Uiverse
   (botões, roll text). Tudo em JS puro + GSAP + Lenis.
   ========================================================= */
(() => {
  "use strict";
  const S = window.SITE || {};
  const D = window.PORTFOLIO || { projects: [], stats: {} };
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const mod = (n, m) => ((n % m) + m) % m;
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- helpers de cor ---------- */
  const hexRgb = (h) => { h = (h || "#222").replace("#", ""); if (h.length === 3) h = [...h].map((c) => c + c).join(""); const n = parseInt(h.slice(0, 6), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const lum = (h) => { const [r, g, b] = hexRgb(h).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
  const ink = (h) => (lum(h) > 0.4 ? "#0c0c0b" : "#f4f1ea");
  const pal = (p) => (p.palette && p.palette.length ? p.palette : ["#2a2a26", "#121210", "#ff5a1f"]);

  /* ---------- dados ---------- */
  const projects = D.projects || [];
  const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
  const allItems = [];
  projects.forEach((p) => p.items.forEach((it, i) => allItems.push({ ...it, p, i })));
  const imgItems = allItems.filter((it) => it.th);

  const media = (it, { full = false, cls = "", lazy = true } = {}) => {
    const p = it.p || bySlug[it.slug];
    const src = full ? it.src || it.th : it.th || it.src;
    if (src) return `<img class="${cls}" src="${src}" alt="${esc(p.title + " — " + (it.name || ""))}" width="${it.tw || it.w}" height="${it.thh || it.h}" ${lazy ? 'loading="lazy"' : ""} decoding="async">`;
    const c = pal(p);
    return `<div class="ph ${cls}" style="--p1:${c[0]};--p2:${c[1] || c[0]};--pi:${ink(c[0])}"><small>${esc(it.format || "frame")} · ${it.w}×${it.h}</small><b>${esc(it.name || p.title)}</b><small>${esc(p.title)}</small></div>`;
  };
  const cover = (p) => p.items.find((i) => i.hero && i.th) || p.items.find((i) => i.th) || p.items.find((i) => i.hero) || p.items[0];

  /* ---------- textos do config ---------- */
  $$("[data-first]").forEach((e) => (e.textContent = S.first || "FELIPE"));
  $$("[data-last]").forEach((e) => (e.textContent = S.last || "ARAÚJO"));
  $$("[data-name]").forEach((e) => (e.textContent = S.name));
  $$("[data-role]").forEach((e) => (e.textContent = S.role));
  $$("[data-city]").forEach((e) => (e.textContent = S.city));
  $$("[data-initials]").forEach((e) => (e.textContent = (S.first || "F")[0] + (S.last || "A")[0] + "©"));
  $$("[data-year]").forEach((e) => (e.textContent = new Date().getFullYear()));
  $$("[data-years]").forEach((e) => (e.textContent = `${S.since || ""} — Hoje`));
  $$("[data-email]").forEach((e) => { e.textContent = S.email; e.dataset.text = S.email; });
  $(".hero__title").setAttribute("aria-label", `${S.first} ${S.last}`);
  document.title = `${S.name} — ${S.role}`;

  const st = D.stats || {};
  const statsList = [
    [st.files || projects.length, "arquivos Figma"],
    [st.pages || 0, "páginas varridas"],
    [st.pieces || allItems.length, "peças no arquivo"],
    [st.categories || new Set(projects.map((p) => p.category)).size, "disciplinas"],
  ];
  $("[data-stats]").innerHTML = statsList.map(([n, l]) => `<div class="stat"><b data-count="${n}">0</b><span>${l}</span></div>`).join("");
  $("[data-hero-stats]").innerHTML = statsList.slice(0, 3).map(([n, l]) => `<div><b>${n}</b>${l}</div>`).join("");

  /* ---------- relógio ---------- */
  const clock = $("[data-clock]");
  const tick = () => { try { clock.textContent = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: S.timezone }).format(new Date()); } catch { clock.textContent = new Date().toTimeString().slice(0, 5); } };
  tick(); setInterval(tick, 15000);

  /* ---------- Lenis ---------- */
  let lenis = null;
  if (!reduce) {
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, touchMultiplier: 1.4 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }
  const scrollTo = (target) => (lenis ? lenis.scrollTo(target, { offset: 0, duration: 1.6 }) : $(target)?.scrollIntoView({ behavior: "smooth" }));
  $$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
    const h = a.getAttribute("href");
    if (h.length > 1 && !h.startsWith("#/") && $(h)) { e.preventDefault(); scrollTo(h === "#top" ? 0 : h); }
  }));

  /* nav some ao descer */
  const nav = $(".nav");
  let lastY = 0;
  const onScroll = (y) => { nav.classList.toggle("is-hidden", y > lastY && y > 300); lastY = y; };
  if (lenis) lenis.on("scroll", (l) => onScroll(l.scroll)); else addEventListener("scroll", () => onScroll(scrollY), { passive: true });

  /* ---------- split helpers ---------- */
  const splitChars = (el) => {
    const t = el.textContent; el.textContent = "";
    [...t].forEach((c) => { const s = document.createElement("span"); s.className = "char"; s.textContent = c === " " ? " " : c; el.appendChild(s); });
    return $$(".char", el);
  };
  const splitWordsMasked = (el) => {
    const out = [];
    const walk = (node, parent) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          n.textContent.split(/(\s+)/).forEach((w) => {
            if (!w) return;
            if (/^\s+$/.test(w)) { parent.appendChild(document.createTextNode(" ")); return; }
            const m = document.createElement("span"); m.className = "line-mask"; m.style.display = "inline-block";
            const i = document.createElement("span"); i.textContent = w; m.appendChild(i); parent.appendChild(m); out.push(i);
          });
        } else if (n.nodeName === "BR") parent.appendChild(document.createElement("br"));
        else { const c = n.cloneNode(false); parent.appendChild(c); walk(n, c); }
      });
    };
    const frag = document.createElement("div"); walk(el, frag);
    el.innerHTML = ""; [...frag.childNodes].forEach((n) => el.appendChild(n));
    return out;
  };

  /* ---------- HERO: text pressure ---------- */
  const heroChars = $$(".hero [data-pressure]").flatMap(splitChars);
  const hero = $(".hero");
  const mouse = { x: innerWidth / 2, y: innerHeight / 2, inHero: false };
  const wState = heroChars.map(() => ({ w: 800, sy: 1 }));
  let pressureOn = false;
  const pressure = () => {
    const R = Math.max(innerWidth * 0.28, 220);
    heroChars.forEach((c, i) => {
      let tw = 800, ts = 1;
      if (pressureOn) {
        const r = c.getBoundingClientRect();
        const d = Math.hypot(mouse.x - (r.left + r.width / 2), mouse.y - (r.top + r.height / 2));
        const k = 1 - clamp(d / R, 0, 1);
        tw = 250 + 650 * k * k; ts = 1 + 0.12 * k * k;
      } else if (!fine && !reduce) {
        const t = performance.now() / 900; const k = (Math.sin(t + i * 0.45) + 1) / 2;
        tw = 300 + 600 * k; ts = 1;
      }
      const s = wState[i]; s.w = lerp(s.w, tw, 0.14); s.sy = lerp(s.sy, ts, 0.14);
      c.style.fontVariationSettings = `"wght" ${s.w.toFixed(0)}`;
      c.style.transform = `scaleY(${s.sy.toFixed(3)})`;
    });
  };

  /* ---------- HERO: image trail ---------- */
  const trail = $(".hero__trail");
  const trailSrc = (imgItems.length ? imgItems : allItems).filter((it) => (it.h / it.w) < 1.9).slice(0);
  // embaralha determinístico, intercalando projetos
  trailSrc.sort((a, b) => (a.i - b.i) || a.p.slug.localeCompare(b.p.slug));
  const pool = [];
  const POOL = 14;
  for (let i = 0; i < Math.min(POOL, Math.max(trailSrc.length, 1)); i++) {
    const w = document.createElement("div"); w.style.cssText = "position:absolute;left:0;top:0;opacity:0"; trail.appendChild(w); pool.push(w);
  }
  let trailIdx = 0, trailZ = 1, lastTrail = { x: -999, y: -999 };
  const spawnTrail = (x, y) => {
    if (!trailSrc.length || reduce) return;
    const it = trailSrc[trailIdx % trailSrc.length]; const el = pool[trailIdx % pool.length]; trailIdx++;
    el.innerHTML = media(it, { lazy: false });
    const node = el.firstElementChild; node.style.position = "relative"; node.style.aspectRatio = `${it.w}/${it.h}`;
    el.style.zIndex = trailZ++;
    gsap.killTweensOf(el);
    const rot = gsap.utils.random(-12, 12);
    gsap.set(el, { x: x, y: y, xPercent: -50, yPercent: -50, opacity: 1, scale: 0.4, rotate: rot });
    gsap.to(el, { scale: 1, duration: 0.5, ease: "expo.out" });
    gsap.to(el, { opacity: 0, scale: 0.6, y: y + 60, rotate: rot * 1.6, duration: 0.9, delay: 0.55, ease: "power3.in" });
  };
  hero.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const r = hero.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    if (Math.hypot(x - lastTrail.x, y - lastTrail.y) > 90) { spawnTrail(x, y); lastTrail = { x, y }; }
  });
  hero.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") pressureOn = true; });
  hero.addEventListener("pointerleave", () => (pressureOn = false));

  /* ---------- cursor ---------- */
  const cur = $(".cursor"), ring = $(".cursor__ring"), dot = $(".cursor__dot"), clabel = $(".cursor__label");
  const ringPos = { x: mouse.x, y: mouse.y };
  if (fine && !reduce) document.documentElement.classList.add("has-cursor");
  addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; cur.classList.add("is-live"); });
  document.addEventListener("pointerleave", () => cur.classList.remove("is-live"));
  addEventListener("pointerdown", () => cur.classList.add("is-down"));
  addEventListener("pointerup", () => cur.classList.remove("is-down"));
  const bindCursor = (root = document) => {
    $$("[data-cursor]", root).forEach((el) => {
      if (el._cur) return; el._cur = 1;
      el.addEventListener("pointerenter", () => { clabel.textContent = el.dataset.cursor; cur.classList.add("is-hover"); });
      el.addEventListener("pointerleave", () => cur.classList.remove("is-hover"));
    });
  };
  bindCursor();

  /* ---------- magnetic ---------- */
  const bindMagnetic = (root = document) => {
    if (!fine || reduce) return;
    $$(".magnetic", root).forEach((el) => {
      if (el._mag) return; el._mag = 1;
      const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1,0.35)" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1,0.35)" });
      el.addEventListener("pointermove", (e) => { const r = el.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * 0.35); yTo((e.clientY - r.top - r.height / 2) * 0.35); });
      el.addEventListener("pointerleave", () => { xTo(0); yTo(0); });
    });
  };
  bindMagnetic();

  /* ---------- marquee com velocidade de scroll ---------- */
  const words = ["Social Media", "Branding", "Varejo", "Encartes", "Imobiliário", "Web & Landing", "Eventos", "Direção de Arte"];
  const fillRow = (row, arr, tag = "i", sym = "✺") => {
    const html = arr.map((w) => `<span>${esc(w)}<${tag}>${sym}</${tag}></span>`).join("");
    row.innerHTML = `<div class="mq" style="display:flex">${html}${html}${html}</div>`;
  };
  $$(".marquee__row").forEach((r, i) => fillRow(r, i ? [...words].reverse() : words));
  const clientNames = [...new Set(projects.map((p) => p.client || p.title))];
  const cr = $("[data-clients]");
  if (cr) { const h = clientNames.map((n) => `<span>${esc(n)}</span>`).join(""); cr.innerHTML = `<div class="mq" style="display:flex">${h}${h}${h}</div>`; }
  const vRows = $$("[data-velocity]").map((row) => ({ row, inner: row.firstElementChild, dir: parseFloat(row.dataset.velocity), x: 0 }));
  let velocity = 0;
  if (lenis) lenis.on("scroll", (l) => (velocity = l.velocity));

  /* ---------- loop principal ---------- */
  let skew = 0;
  gsap.ticker.add(() => {
    // cursor
    ringPos.x = lerp(ringPos.x, mouse.x, 0.16); ringPos.y = lerp(ringPos.y, mouse.y, 0.16);
    dot.style.transform = `translate(${mouse.x}px,${mouse.y}px)`;
    ring.style.transform = `translate(${ringPos.x}px,${ringPos.y}px)`;
    // pressure
    if (heroVisible) pressure();
    // marquee
    if (!reduce) {
      skew = lerp(skew, clamp(velocity * 0.6, -12, 12), 0.1);
      vRows.forEach((v) => {
        const half = v.inner.scrollWidth / 3; if (!half) return;
        v.x -= (0.6 + Math.abs(velocity) * 0.35) * Math.sign(v.dir || 1) * (Math.abs(v.dir) || 1) * (velocity < 0 ? -1 : 1);
        v.x = -mod(-v.x, half);
        v.inner.style.transform = `translate3d(${v.x}px,0,0) skewX(${(-skew * Math.sign(v.dir)).toFixed(2)}deg)`;
      });
    }
    velocity *= 0.92;
    previewTick();
  });
  let heroVisible = true;
  new IntersectionObserver(([e]) => (heroVisible = e.isIntersecting)).observe(hero);

  /* ---------- reveals ---------- */
  const splitHeads = $$("[data-split]").map((el) => ({ el, words: splitWordsMasked(el) }));
  const setupReveals = () => {
    splitHeads.forEach(({ el, words }) => {
      gsap.from(words, { yPercent: 110, rotate: 4, duration: 1.2, ease: "expo.out", stagger: 0.05, scrollTrigger: { trigger: el, start: "top 85%" } });
    });
    // intro: palavra por palavra
    const intro = $("[data-words]");
    const iw = intro.textContent.trim().split(/\s+/);
    intro.innerHTML = iw.map((w) => `<span class="w">${esc(w)}</span>`).join(" ");
    if (!reduce) gsap.to($$(".w", intro), { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: intro, start: "top 80%", end: "bottom 45%", scrub: true } });
    // contadores
    $$("[data-count]").forEach((el) => {
      const n = +el.dataset.count; const o = { v: 0 };
      ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => gsap.to(o, { v: n, duration: 2, ease: "power3.out", onUpdate: () => (el.textContent = Math.round(o.v)) }) });
    });
    // badge gira com o scroll
    gsap.to(".badge", { rotate: 360, ease: "none", scrollTrigger: { trigger: ".intro", start: "top bottom", end: "bottom top", scrub: true } });
    gsap.to(".progress i", { scaleY: 1, ease: "none", scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 } });
    // hero parallax ao sair
    gsap.to(".hero__title", { yPercent: 18, scale: 0.94, opacity: 0.3, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
    gsap.from(".contact__actions", { y: 60, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".contact__actions", start: "top 90%" } });
  };

  /* ---------- DESTAQUES (sticky stack) ---------- */
  const featured = [...projects].filter((p) => p.featured).concat(projects.filter((p) => !p.featured)).slice(0, 6);
  const stack = $("[data-stack]");
  stack.innerHTML = featured.map((p, i) => {
    const c = pal(p); const bg = c[0]; const tx = ink(bg);
    const imgs = p.items.filter((x) => x.hero).concat(p.items.filter((x) => !x.hero)).slice(0, 3);
    const tfs = p.title.length > 14 ? "3.8vw" : p.title.length > 9 ? "4.6vw" : "5.6vw";
    return `<article class="scard" style="--c1:${bg};--ink:${tx};--tfs:${tfs}" data-open="${p.slug}" data-cursor="abrir">
      <div class="scard__info">
        <div><div class="scard__num"><span>${String(i + 1).padStart(2, "0")} / ${String(featured.length).padStart(2, "0")}</span><span>${esc(p.category)}</span></div></div>
        <div><h3 class="scard__title">${esc(p.title)}</h3></div>
        <p class="scard__sum">${esc(p.summary)}</p>
        <div class="scard__tags">${(p.tags || []).slice(0, 4).map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
        <span class="scard__cta">Ver projeto <span aria-hidden="true">→</span></span>
      </div>
      <div class="scard__media">${imgs.map((it) => `<div class="m">${media({ ...it, p })}</div>`).join("")}</div>
    </article>`;
  }).join("");
  const setupStack = () => {
    const cards = $$(".scard", stack);
    cards.forEach((card, i) => {
      $$(".m img", card).forEach((img) => gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } }));
      const next = cards[i + 1]; if (!next || reduce) return;
      gsap.to(card, { scale: 0.88, filter: "brightness(.45)", rotateX: 4, ease: "none", scrollTrigger: { trigger: next, start: "top bottom", end: "top 12%", scrub: true } });
    });
  };

  /* ---------- LISTA + filtros ---------- */
  const list = $("[data-list]");
  list.innerHTML = projects.map((p, i) => {
    const c = pal(p);
    return `<a class="row" href="#/p/${p.slug}" data-cat="${esc(p.category)}" data-slug="${p.slug}" data-cursor="abrir" style="--rc:${c[0]};--rink:${ink(c[0])}">
      <span class="row__n">${String(i + 1).padStart(2, "0")}</span>
      <span class="row__t">${esc(p.title)}</span>
      <span class="row__meta">${esc(p.category)}</span>
      <span class="row__meta">${p.items.length} peças · ${p.pages.length} pág.</span>
      <span class="row__arrow" aria-hidden="true">→</span></a>`;
  }).join("");
  const cats = {};
  projects.forEach((p) => (cats[p.category] = (cats[p.category] || 0) + 1));
  const filters = $("[data-filters]");
  filters.innerHTML = [["Todos", projects.length], ...Object.entries(cats)].map(([c, n], i) => `<button class="filter ${i ? "" : "is-active"}" role="tab" aria-selected="${!i}" data-f="${esc(c)}">${esc(c)}<sup>${n}</sup></button>`).join("");
  filters.addEventListener("click", (e) => {
    const b = e.target.closest(".filter"); if (!b) return;
    $$(".filter", filters).forEach((x) => { x.classList.toggle("is-active", x === b); x.setAttribute("aria-selected", x === b); });
    const f = b.dataset.f; const rows = $$(".row", list);
    const show = rows.filter((r) => f === "Todos" || r.dataset.cat === f);
    rows.forEach((r) => r.classList.toggle("is-out", !show.includes(r)));
    gsap.fromTo(show, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.04, duration: 0.7, ease: "expo.out" });
    ScrollTrigger.refresh();
  });

  // preview que segue o mouse
  const prev = $(".list__preview"), prevIn = $(".list__preview-inner");
  const pv = { x: 0, y: 0, r: 0, on: false, cur: null };
  const previewTick = () => {
    if (!fine) return;
    const tx = mouse.x + 30, ty = mouse.y - 120;
    const dx = tx - pv.x; pv.x = lerp(pv.x, tx, 0.12); pv.y = lerp(pv.y, ty, 0.12); pv.r = lerp(pv.r, clamp(dx * 0.08, -14, 14), 0.1);
    prev.style.left = pv.x + "px"; prev.style.top = pv.y + "px"; prev.style.rotate = pv.r + "deg";
  };
  list.addEventListener("pointerover", (e) => {
    const row = e.target.closest(".row"); if (!row || !fine) return;
    if (pv.cur === row.dataset.slug) return; pv.cur = row.dataset.slug;
    const p = bySlug[pv.cur]; const it = cover(p);
    const el = document.createElement("div"); el.style.cssText = "position:absolute;inset:0"; el.innerHTML = media({ ...it, p }, { lazy: false });
    prevIn.appendChild(el);
    gsap.fromTo(el, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 0.6, ease: "expo.out", onComplete: () => { while (prevIn.children.length > 2) prevIn.firstChild.remove(); } });
    gsap.to(prev, { opacity: 1, scale: 1, duration: 0.5, ease: "expo.out" });
  });
  list.addEventListener("pointerleave", () => { pv.cur = null; gsap.to(prev, { opacity: 0, scale: 0.6, duration: 0.4 }); });

  /* ---------- ARQUIVO infinito ---------- */
  const archive = $("[data-archive]");
  const canvas = $(".archive__canvas", archive);
  const archItems = (() => {
    // intercala projetos para variar as cores
    const q = projects.map((p) => [...p.items.map((it) => ({ ...it, p }))]);
    const out = []; let added = true;
    while (added) { added = false; q.forEach((arr) => { if (arr.length) { out.push(arr.shift()); added = true; } }); }
    return out;
  })();
  $("[data-archive-count]").textContent = `${archItems.length} peças · ${projects.length} projetos`;
  const A = { tiles: [], W: 0, cols: [], ox: 0, oy: 0, vx: 0, vy: 0, drag: false, visible: false, built: false };
  const buildArchive = () => {
    canvas.innerHTML = ""; A.tiles = []; A.cols = [];
    if (!archItems.length) return;
    const vw = archive.clientWidth, vh = archive.clientHeight;
    const colW = clamp(vw / (vw < 700 ? 2.6 : 6.2), 140, 300); const gap = 12;
    const ncols = Math.ceil(vw / (colW + gap)) + 2;
    A.W = ncols * (colW + gap); A.colW = colW; A.gap = gap;
    let k = 0;
    for (let c = 0; c < ncols; c++) {
      const col = { x: c * (colW + gap), tiles: [], H: 0, f: c % 2 ? 1.15 : 0.9, off: (c * 137) % 400 };
      let maxH = 0;
      while (col.H < vh + 2 * maxH + 400 || col.tiles.length < 3) {
        const it = archItems[k++ % archItems.length];
        const h = colW * clamp(it.h / it.w, 0.5, 2.1);
        const el = document.createElement("figure"); el.className = "tile"; el.style.width = colW + "px"; el.style.height = h + "px"; el.style.margin = "0";
        el.dataset.k = (k - 1) % archItems.length;
        el.innerHTML = it.th ? `<img alt="${esc(it.p.title + " — " + it.name)}" decoding="async"><figcaption class="tile__cap">${esc(it.p.title)} — ${esc(it.name)}</figcaption>` : media(it) + `<figcaption class="tile__cap">${esc(it.p.title)} — ${esc(it.name)}</figcaption>`;
        canvas.appendChild(el);
        const t = { el, it, y: col.H, h, loaded: !it.th };
        col.tiles.push(t); A.tiles.push(t); col.H += h + gap; maxH = Math.max(maxH, h);
        if (col.tiles.length > 400) break;
      }
      col.maxH = maxH; A.cols.push(col);
    }
    A.built = true; A.vw = vw; A.vh = vh;
  };
  const renderArchive = () => {
    if (!A.built) return;
    A.cols.forEach((col) => {
      const x = mod(col.x + A.ox, A.W) - (A.colW + A.gap);
      col.tiles.forEach((t) => {
        const y = mod(t.y + A.oy * col.f + col.off, col.H) - col.maxH;
        t.el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
        if (!t.loaded && x > -A.colW * 2 && x < A.vw + A.colW && y > -t.h - 400 && y < A.vh + 400) { t.loaded = true; const img = t.el.querySelector("img"); img.src = t.it.th; }
      });
    });
  };
  let pdown = null;
  archive.addEventListener("pointerdown", (e) => { A.drag = true; pdown = { x: e.clientX, y: e.clientY, lx: e.clientX, ly: e.clientY, t: performance.now() }; archive.classList.add("is-drag"); archive.setPointerCapture(e.pointerId); });
  archive.addEventListener("pointermove", (e) => {
    if (!A.drag) return;
    const dx = e.clientX - pdown.lx, dy = e.clientY - pdown.ly; pdown.lx = e.clientX; pdown.ly = e.clientY;
    A.ox += dx; A.oy += dy; A.vx = dx; A.vy = dy;
  });
  const endDrag = (e) => {
    if (!A.drag) return; A.drag = false; archive.classList.remove("is-drag");
    if (pdown && Math.hypot(e.clientX - pdown.x, e.clientY - pdown.y) < 6) {
      archive.releasePointerCapture?.(e.pointerId);
      const el = document.elementsFromPoint(e.clientX, e.clientY).find((n) => n.classList?.contains("tile"));
      if (el) openLightbox(archItems, +el.dataset.k);
    }
  };
  archive.addEventListener("pointerup", endDrag);
  archive.addEventListener("pointercancel", endDrag);
  archive.addEventListener("wheel", (e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { e.preventDefault(); A.vx -= e.deltaX * 0.15; } }, { passive: false });
  new IntersectionObserver(([e]) => (A.visible = e.isIntersecting), { rootMargin: "200px" }).observe(archive);
  gsap.ticker.add(() => {
    if (!A.visible || !A.built) return;
    if (!A.drag) {
      A.vx *= 0.94; A.vy *= 0.94;
      A.ox += A.vx; A.oy += A.vy;
      if (!reduce) { A.oy -= 0.35; A.ox -= 0.15; }
    }
    renderArchive();
  });

  /* ---------- SERVIÇOS (expandable) ---------- */
  const svcText = {
    "Social Media": "Linhas editoriais, posts, carrosséis, stories e capas de reels para marcas que publicam todo dia — com sistema visual consistente mês a mês.",
    "Varejo & Encartes": "Lâminas de oferta, encartes A4, campanhas de data e ações de trade com indústria. Hierarquia de preço que vende no primeiro olhar.",
    "Imobiliário": "Key visuals de lançamentos, placas, tapumes, empenas, books e peças de vendas para incorporadoras.",
    "Branding": "Refresh de marca, papelaria, sistemas visuais e guias que fazem a identidade funcionar em qualquer ponto de contato.",
    "Web & Landing Page": "Landing pages e sites desenhados do briefing ao handoff — desktop, tablet e mobile, com protótipo navegável.",
    "Eventos & Games": "Identidade de eventos e torneios, telas de palco, artes de divulgação e materiais para comunidade.",
    "Apresentação": "Decks e apresentações com narrativa visual clara.",
    "Motion": "Animações e peças em movimento para redes e telas.",
  };
  const svcCats = Object.keys(cats);
  $("[data-services]").innerHTML = svcCats.map((c, i) => {
    const imgs = allItems.filter((it) => it.p.category === c && it.th).slice(0, 3);
    return `<div class="svc ${i === 0 ? "is-open" : ""}" tabindex="0">
      <div class="svc__n">${String(i + 1).padStart(2, "0")} · ${cats[c]} projeto${cats[c] > 1 ? "s" : ""}</div>
      <div class="svc__imgs">${imgs.map((it) => `<span>${media(it)}</span>`).join("")}</div>
      <div><h3 class="svc__t">${esc(c)}</h3><p class="svc__body">${esc(svcText[c] || "")}</p></div>
    </div>`;
  }).join("");
  const svcs = $$(".svc");
  const openSvc = (s) => svcs.forEach((x) => x.classList.toggle("is-open", x === s));
  svcs.forEach((s) => { s.addEventListener(fine ? "pointerenter" : "click", () => openSvc(s)); s.addEventListener("focus", () => openSvc(s)); });

  /* ---------- socials + email ---------- */
  const socials = [["Instagram", S.instagram], ["WhatsApp", S.whatsapp], ["Behance", S.behance]].filter((x) => x[1]);
  $("[data-socials]").innerHTML = socials.map(([n, u]) => `<a class="roll" href="${esc(u)}" target="_blank" rel="noopener"><span data-text="${n} ↗">${n} ↗</span></a>`).join("");
  const island = $(".island");
  const toast = (msg) => { $(".island__txt", island).textContent = msg; island.classList.add("is-on"); clearTimeout(toast.t); toast.t = setTimeout(() => island.classList.remove("is-on"), 2200); };
  $("[data-copy-email]").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(S.email); toast("E-mail copiado ✓"); } catch { location.href = "mailto:" + S.email; }
  });

  /* ---------- LIGHTBOX ---------- */
  const lb = $(".lightbox"); const LB = { arr: [], i: 0 };
  const lbShow = () => {
    const it = LB.arr[LB.i]; if (!it) return;
    $(".lightbox__media", lb).innerHTML = media(it, { full: true, lazy: false });
    $(".lightbox__cap", lb).textContent = `${it.p.title} — ${it.name || ""} · ${it.page || ""} · ${LB.i + 1}/${LB.arr.length}`;
    gsap.fromTo(".lightbox__media", { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "expo.out" });
  };
  const openLightbox = (arr, i) => { LB.arr = arr; LB.i = i; lb.classList.add("is-open"); lb.setAttribute("aria-hidden", "false"); lenis?.stop(); caseLenis?.stop(); lbShow(); };
  const closeLightbox = () => { lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true"); if (caseOpen) caseLenis?.start(); else lenis?.start(); };
  $(".lightbox__prev").addEventListener("click", (e) => { e.stopPropagation(); LB.i = mod(LB.i - 1, LB.arr.length); lbShow(); });
  $(".lightbox__next").addEventListener("click", (e) => { e.stopPropagation(); LB.i = mod(LB.i + 1, LB.arr.length); lbShow(); });
  lb.addEventListener("click", (e) => { if (!e.target.closest(".lightbox__nav")) closeLightbox(); });

  /* ---------- CASE overlay ---------- */
  const caseEl = $(".case"), caseScroll = $(".case__scroll", caseEl), caseContent = $(".case__content", caseEl), caseBg = $(".case__bg", caseEl);
  let caseOpen = null, caseLenis = null, caseIO = null;
  const renderCase = (p) => {
    const idx = projects.indexOf(p); const next = projects[(idx + 1) % projects.length];
    const c = pal(p);
    const hero = cover(p);
    const rest = p.items.filter((x) => x !== hero);
    caseContent.innerHTML = `
      <div class="case__eyebrow mono"><span>${String(idx + 1).padStart(2, "0")} / ${projects.length}</span><span>${esc(p.category)}</span><span>${esc(p.subtitle && p.subtitle !== p.title ? p.subtitle : p.client || "")}</span></div>
      <h2 class="case__title">${esc(p.title)}</h2>
      <div class="case__grid">
        <p class="case__sum">${esc(p.summary)}</p>
        <div><h4>Entregas</h4><div class="scard__tags">${(p.tags || []).map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div></div>
        <div><h4>Paleta</h4><div class="palette">${c.map((h) => `<span style="background:${h}" data-hex="${h}"></span>`).join("")}</div>
          <h4 style="margin-top:20px">Arquivo</h4><p class="mono">${p.pages.length} páginas · ${p.items.length} peças</p></div>
      </div>
      <div class="case__hero reveal-img" data-lb="0">${media({ ...hero, p }, { full: true, lazy: false })}</div>
      <div class="case__pages">${p.pages.map((pg) => `<span class="chip">${esc(pg)}</span>`).join("")}</div>
      <div class="gallery">${rest.map((it, i) => `<figure class="reveal-img" data-lb="${i + 1}" data-cursor="ampliar" style="--ar:${it.w}/${clamp(it.h, 1, it.w * 2.4)}">${media({ ...it, p }, { full: true })}<figcaption>${esc(it.name)} · ${esc(it.page || "")}</figcaption></figure>`).join("")}</div>
      <a class="case__next" href="#/p/${next.slug}" data-cursor="próximo"><span class="mono">Próximo projeto →</span><b>${esc(next.title)}</b></a>`;
    const lbArr = [hero, ...rest].map((it) => ({ ...it, p }));
    $$("[data-lb]", caseContent).forEach((f) => f.addEventListener("click", () => openLightbox(lbArr, +f.dataset.lb)));
    bindCursor(caseContent); bindMagnetic(caseContent);
    caseIO?.disconnect();
    caseIO = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); caseIO.unobserve(e.target); } }), { root: caseScroll, rootMargin: "0px 0px -8% 0px" });
    $$(".reveal-img", caseContent).forEach((f) => caseIO.observe(f));
    caseEl.style.setProperty("--case-bg", mixDark(c[0]));
  };
  const mixDark = (h) => { const [r, g, b] = hexRgb(h); return `rgb(${Math.round(r * 0.14 + 12)},${Math.round(g * 0.14 + 12)},${Math.round(b * 0.14 + 11)})`; };
  const openCase = (slug) => {
    const p = bySlug[slug]; if (!p) return;
    const switching = !!caseOpen;
    caseOpen = slug; lenis?.stop();
    caseEl.classList.add("is-open"); caseEl.setAttribute("aria-hidden", "false");
    const doRender = () => {
      renderCase(p); caseScroll.scrollTop = 0;
      if (!reduce) {
        if (!caseLenis) { caseLenis = new Lenis({ wrapper: caseScroll, content: caseContent, lerp: 0.1 }); gsap.ticker.add((t) => caseLenis && caseLenis.raf(t * 1000)); }
        caseLenis.scrollTo(0, { immediate: true }); caseLenis.start();
      }
      const titleChars = splitChars($(".case__title", caseContent));
      gsap.timeline()
        .to(caseScroll, { opacity: 1, duration: 0.3 })
        .from(titleChars, { yPercent: 100, opacity: 0, rotate: 8, stagger: 0.025, duration: 1, ease: "expo.out" }, 0)
        .from(".case__eyebrow, .case__grid", { y: 30, opacity: 0, duration: 0.9, stagger: 0.1, ease: "expo.out" }, 0.15);
      $(".case__close").focus({ preventScroll: true });
    };
    if (switching) {
      gsap.to(caseScroll, { opacity: 0, duration: 0.35, onComplete: doRender });
    } else {
      gsap.set(caseScroll, { opacity: 0 });
      gsap.fromTo(caseBg, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: reduce ? 0 : 0.9, ease: "expo.inOut", onComplete: doRender });
    }
  };
  const closeCase = () => {
    if (!caseOpen) return; caseOpen = null; caseLenis?.stop();
    gsap.to(caseScroll, { opacity: 0, duration: 0.3 });
    gsap.to(caseBg, { clipPath: "inset(0% 0% 100% 0%)", duration: reduce ? 0 : 0.8, ease: "expo.inOut", delay: 0.1, onComplete: () => { caseEl.classList.remove("is-open"); caseEl.setAttribute("aria-hidden", "true"); caseContent.innerHTML = ""; } });
    lenis?.start();
  };
  $(".case__close").addEventListener("click", () => { if (location.hash.startsWith("#/p/")) history.pushState(null, "", location.pathname + location.search); closeCase(); });
  document.addEventListener("click", (e) => {
    const o = e.target.closest("[data-open]"); if (o) { location.hash = "/p/" + o.dataset.open; }
  });
  const route = () => { const m = location.hash.match(/^#\/p\/([\w-]+)/); if (m) openCase(m[1]); else closeCase(); };
  addEventListener("hashchange", route);
  addEventListener("keydown", (e) => {
    if (lb.classList.contains("is-open")) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") { LB.i = mod(LB.i + 1, LB.arr.length); lbShow(); }
      if (e.key === "ArrowLeft") { LB.i = mod(LB.i - 1, LB.arr.length); lbShow(); }
    } else if (e.key === "Escape" && caseOpen) $(".case__close").click();
  });

  /* ---------- PRELOADER ---------- */
  const loader = $(".loader"), num = $(".loader__num"), bar = $(".loader__bar i"), strip = $(".loader__strip");
  const preload = imgItems.slice(0, 8);
  strip.innerHTML = preload.slice(0, 5).map((it) => `<span style="background-image:url('${it.th}')"></span>`).join("");
  const loadImgs = Promise.all(preload.map((it) => new Promise((r) => { const i = new Image(); i.onload = i.onerror = r; i.src = it.th; }))).then(() => document.fonts?.ready);
  const prog = { v: 0 };
  const intro = () => {
    const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });
    tl.to(num, { yPercent: -110, duration: 0.8, ease: "expo.in" })
      .to(".loader__grid", { yPercent: -100, duration: 1.1 }, "-=0.1")
      .to(".loader__curtain", { yPercent: -100, duration: 1.1 }, "-=0.85")
      .add(() => { document.body.classList.remove("is-loading"); lenis?.start(); loader.style.display = "none"; ScrollTrigger.refresh(); route(); }, "-=0.2")
      .from(heroChars, { yPercent: 110, rotate: 6, stagger: 0.035, duration: 1.4, ease: "expo.out" }, "-=0.75")
      .from(".hero__top > *, .hero__bottom > *, .nav > *", { y: 24, opacity: 0, stagger: 0.06, duration: 1, ease: "expo.out" }, "-=1.2")
      .from(".hero__line--2 em", { scale: 0, rotate: -90, duration: 1.2, ease: "back.out(2)" }, "-=1");
  };
  if (reduce) { loader.style.display = "none"; document.body.classList.remove("is-loading"); route(); }
  else {
    gsap.to(".loader__strip span", { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: "expo.out", delay: 0.2 });
    const t1 = gsap.to(prog, { v: 86, duration: 1.6, ease: "power2.out", onUpdate: () => { num.textContent = String(Math.round(prog.v)).padStart(3, "0"); bar.style.transform = `scaleX(${prog.v / 100})`; } });
    Promise.race([loadImgs, new Promise((r) => setTimeout(r, 4000))]).then(() => {
      t1.kill();
      gsap.to(prog, { v: 100, duration: 0.6, ease: "power2.inOut", onUpdate: () => { num.textContent = String(Math.round(prog.v)).padStart(3, "0"); bar.style.transform = `scaleX(${prog.v / 100})`; }, onComplete: intro });
    });
  }

  /* ---------- init ---------- */
  setupReveals();
  setupStack();
  buildArchive();
  let rw = innerWidth;
  addEventListener("resize", () => { if (Math.abs(innerWidth - rw) > 40) { rw = innerWidth; buildArchive(); } ScrollTrigger.refresh(); });
})();

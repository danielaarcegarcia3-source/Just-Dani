/* =====================================================================
   TODO está en la MISMA carpeta que index.html. Escribe aquí el nombre de
   cada archivo SIN la extensión (.jpg .png .mp4…): el código la detecta solo.
   Si un archivo no existe, se salta y la página sigue funcionando.
   ===================================================================== */
const WA = h => `WhatsApp Image 2026-10-30 at ${h}`;
const CAP = n => `Captura de pantalla 2026-10-31 ${n}`;
const C = {
  video: ['HELLOZUKOHEREAUDIO', 'inicio zuko here'],   // se usa SOLO el audio (no se ve la escena)
  helloAt: null,               // segundo en que dice "Hello, Zuko here". null = automático
  boost: 2.5,                  // amplificación del audio de la portada (1 = normal)
  tracks: ['VK Blanka', 'muscia fondo', 'evangelion op', 'cruel angels thesis', 'musica 1', 'musica 2', 'musica 3', 'musica1', 'musica2', 'musica3', 'audio 1', 'audio 2', 'cancion 1', 'cancion 2'],  // agrega aquí los nombres de tus nuevos audios
  sfx: {hamilton: ['HAMILTON AUDIO', 'HAMILTONAUDIO', 'hamilton sonido', 'hamilton audio', 'hamiltonaudio', 'my shot', 'myshot']},
  photos: [WA('4.44.39 PM'), 'MUN', WA('4.46.03 PM'), 'gimnasia', WA('4.45.35 PM'), WA('4.47.07 PM'), 'mejor amigaaa', WA('4.47.10 PM (3)'),
           WA('4.44.51 PM'), 'WIN_20260617_09_29_32_Pro', WA('4.47.10 PM (2)'), WA('4.46.59 PM'), 'medallas', WA('4.46.54 PM'), '20260710_130609',
           WA('4.47.03 PM'), WA('4.45.53 PM'), 'erizo', WA('4.47.10 PM (1)'), WA('4.45.01 PM'), WA('4.47.11 PM'), 'WIN_20261013_12_12_52_Pro',
           WA('4.47.11 PM (1)'), WA('4.44.35 PM'), 'gimansia', 'starbucks', 'makis', 'postres', WA('4.45.13 PM'), WA('4.47.11 PM (2)')],
  stickers: ['stickerrree', 'stickeraaa-removebg-preview', 'stickerrrs-removebg-preview', 'stikckers_anime-removebg-preview',
             'stickerasa-removebg-preview', 'stikcer-removebg-preview', 'stickeeeer', 'ce9a10c66913860ae18a5c99103a726a-removebg-preview', 'musicaaa-removebg-preview'],
  // marcos del collage: [marco, foto dentro, x%, y%, ancho vw, rotación]
  frames: [['marcocamara', 'WIN_20260617_09_29_32_Pro', 3, 62, 17, -6], ['foto_decoracion_camara-removebg-preview', 'MUN', 83, 8, 14, 7],
           ['marco_bonito-removebg-preview', 'mejor amigaaa', 70, 66, 12, 8], ['potho_tira-removebg-preview', null, 1, 24, 7, -6],
           ['casset', null, 21, 78, 12, 5], ['disco decoración', null, 56, 80, 9, 0]]
};
 
// Medidas de las ventanas de tus marcos (en % del archivo del marco). El recorte automático las reemplaza cuando puede.
const FALLBACK = {'marcocamara': {l: 8.6, t: 13.2, w: 56.8, h: 36.4, ar: 1.55}, 'foto_decoracion_camara-removebg-preview': {l: 10.7, t: 13.4, w: 46.1, h: 60.8, ar: 1.05},
  'marco_bonito-removebg-preview': {l: 28, t: 30, w: 45, h: 40, ar: .86}, 'cartapokemon marco': {l: 9, t: 9, w: 82, h: 40},
  'credencial de nerv': {l: 5, t: 25, w: 32, h: 62}, 'decoración_para_fotos_especiales-removebg-preview': {l: 25.7, t: 12, w: 67, h: 70, ar: .84}};
const V = (p, ch, a, b, s = '') => Array.from({length: b - a + 1}, (_, i) => p + ch.repeat(a + i) + s);
const DECOR = [['bitindecoracióon', 'bitindecoraciòon', 'bitindecoración'], ['boton decoración'], ['botondecoración jn'], V('decoración galleta', 'a', 0, 12), V('decoracióngalleta', 'a', 0, 12),
  ['decoracióndepaan', 'decoracióndepan'], ['cartasdecoración'], ['decoracion snoppy', 'decoración snoopy'], ['thesememories_makemismile-removebg-preview'], ['casset'], ['disco decoración'], ['decoracion'],
  [...V('decoraci', 'o', 2, 6, 'nn'), ...V('decoraci', 'o', 2, 6, 'n')], ['350932d5b5f22d6c05b34a1bc68e11af']];
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const body = document.body;
const show = id => $$('.stage').forEach(s => s.classList.toggle('active', s.id === id));
let theme = 'stars';
const setTheme = t => { theme = t; $$('.bgl').forEach(b => b.classList.toggle('on', b.dataset.t === t)); };
const rnd = a => (Math.random() - .5) * a;
// Rueda de fandoms: se duplica para que gire sin cortes (antes de cargar las imágenes)
{ const trk = document.querySelector('#track'); if (trk) [...trk.children].forEach(c => { const k = c.cloneNode(true); k.setAttribute('aria-hidden', 'true'); trk.append(k); }); }
 
/* ---------- Detector de extensiones ---------- */
const probe = (name, exts, tag, evt) => new Promise(res => {
  let i = 0;
  const next = () => {
    if (i >= exts.length) return res(null);
    const u = encodeURI(name) + '.' + exts[i++];
    const el = tag === 'img' ? new Image() : document.createElement(tag);
    el.addEventListener(evt, () => res(u), {once: true});
    el.addEventListener('error', next, {once: true});
    if (tag !== 'img') el.preload = 'metadata';
    el.src = u;
  };
  next();
});
const probeImg = n => probe(n, ['jpeg', 'jpg', 'png', 'webp', 'JPG', 'PNG'], 'img', 'load');
const probeVid = n => probe(n, ['mp4', 'mp3', 'm4a', 'webm', 'mov', 'wav', 'ogg'], 'video', 'loadedmetadata');
const probeAud = n => probe(n, ['mp3', 'mp4', 'm4a', 'wav', 'ogg', 'webm'], 'audio', 'loadedmetadata');
const probeAny = async (names, fn) => { for (const n of names) { const u = await fn(n); if (u) return u; } return null; };
 
$$('img[data-img]').forEach(im => probeAny(im.dataset.img.split('|'), probeImg).then(u => {
  if (u) return void (im.src = u);
  if (/ph|deco|bgimg|mapbg|playerimg|stk|tinlid|\bav\b/.test(im.className)) return im.remove();
  im.closest('figure,.frame')?.classList.add('empty');
}));
const decorP = Promise.all(DECOR.map(g => Promise.all(g.map(probeImg)).then(a => a.filter(Boolean)))).then(a => a.flat());
const novioP = probeAny(V('novio', 'o', 0, 8), probeImg);
const photosP = Promise.all(C.photos.map(probeImg));
const stickersP = Promise.all(C.stickers.map(probeImg)).then(a => a.filter(Boolean));
const videoP = probeAny(C.video, probeVid);
const tracksP = Promise.all(C.tracks.map(async n => ({name: n, url: await probeAud(n)}))).then(a => a.filter(t => t.url));
const sfxP = {}; Object.entries(C.sfx).forEach(([k, n]) => sfxP[k] = probeAny(n, probeAud));
let FLY = []; stickersP.then(a => FLY = a);
 
const letters = (el, attr) => { const t = el.textContent; el.textContent = ''; [...t].forEach((ch, i) => { const b = document.createElement('b'); b.textContent = ch === ' ' ? '\u00A0' : ch; b.style.setProperty('--i', i); el.append(b); }); };
$$('[data-split],[data-wave]').forEach(el => letters(el));
 
/* ---------- Marcos: la foto se recorta EXACTO con la forma de la ventana del marco ---------- */
function detect(img) {
  try {
    const S = Math.min(220, img.naturalWidth), k = S / img.naturalWidth, w = S, h = Math.round(img.naturalHeight * k);
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    const g = cv.getContext('2d', {willReadFrequently: true}); g.drawImage(img, 0, 0, w, h);
    const d = g.getImageData(0, 0, w, h).data, N = w * h, bg = new Uint8Array(N), out = new Uint8Array(N), st = [];
    for (let i = 0; i < N; i++) { const a = d[i * 4 + 3], r = d[i * 4], gr = d[i * 4 + 1], b = d[i * 4 + 2]; bg[i] = a < 40 || (r > 232 && gr > 232 && b > 232) ? 1 : 0; }
    const push = i => { if (bg[i] && !out[i]) { out[i] = 1; st.push(i); } };
    for (let i = 0; i < w; i++) { push(i); push((h - 1) * w + i); } for (let j = 0; j < h; j++) { push(j * w); push(j * w + w - 1); }
    while (st.length) { const i = st.pop(), x = i % w, y = (i / w) | 0; if (x > 0) push(i - 1); if (x < w - 1) push(i + 1); if (y > 0) push(i - w); if (y < h - 1) push(i + w); }
    const lab = new Int32Array(N); let best = null, id = 0;
    for (let s = 0; s < N; s++) {
      if (!bg[s] || out[s] || lab[s]) continue; id++; let n = 0, x1 = w, y1 = h, x2 = 0, y2 = 0; const q = [s]; lab[s] = id;
      while (q.length) {
        const i = q.pop(), cx = i % w, cy = (i / w) | 0; n++; if (cx < x1) x1 = cx; if (cx > x2) x2 = cx; if (cy < y1) y1 = cy; if (cy > y2) y2 = cy;
        for (const j of [cx > 0 ? i - 1 : -1, cx < w - 1 ? i + 1 : -1, i - w, i + w]) if (j >= 0 && j < N && bg[j] && !out[j] && !lab[j]) { lab[j] = id; q.push(j); }
      }
      if (!best || n > best.n) best = {n, id, x1, y1, x2, y2};
    }
    if (!best || best.n < N * .012 || best.n > N * .6) return null;
    const bw = best.x2 - best.x1 + 1, bh = best.y2 - best.y1 + 1, mc = document.createElement('canvas'); mc.width = bw; mc.height = bh;
    const mx = mc.getContext('2d'), mi = mx.createImageData(bw, bh);
    for (let yy = 0; yy < bh; yy++) {                     // relleno por filas (tapa letras y detalles dentro de la ventana)
      let a = -1, b = -1;
      for (let xx = 0; xx < bw; xx++) if (lab[(yy + best.y1) * w + xx + best.x1] === best.id) { if (a < 0) a = xx; b = xx; }
      if (a >= 0) for (let xx = a; xx <= b; xx++) { const o = (yy * bw + xx) * 4; mi.data[o + 3] = 255; }
    }
    mx.putImageData(mi, 0, 0);
    return {l: best.x1 / w * 100, t: best.y1 / h * 100, w: bw / w * 100, h: bh / h * 100, mask: mc.toDataURL()};
  } catch (e) { return null; }       // (si abres el archivo con doble clic el navegador lo bloquea: usa Live Server o GitHub Pages)
}
async function fillFrame(f, fr, ph) {
  const fu = await probeImg(fr); if (!fu) { f.classList.add('empty'); return f; }
  const fb = FALLBACK[fr]; if (fb && fb.ar) { f.style.aspectRatio = fb.ar; f.classList.add('crop'); }
  const fc = document.createElement('div'); fc.className = 'fc'; f.append(fc);
  const m = new Image(); m.className = 'fr'; m.alt = ''; m.src = fu; fc.append(m);
  if (!ph) return f;
  const pu = await probeAny(String(ph).split('|'), probeImg); if (!pu) return f;
  try { await m.decode(); } catch (e) {}
  const p = new Image(); p.className = 'ph'; p.alt = ''; p.src = pu;
  const win = detect(m);
  if (win) { f.classList.add('masked'); p.style.cssText = `left:${win.l}%;top:${win.t}%;width:${win.w}%;height:${win.h}%;-webkit-mask-image:url(${win.mask});mask-image:url(${win.mask})`; }
  else if (fb) p.style.cssText = `left:${fb.l}%;top:${fb.t}%;width:${fb.w}%;height:${fb.h}%`;
  fc.append(p); return f;
}
$$('.frame[data-fr]').forEach(f => fillFrame(f, f.dataset.fr, f.dataset.ph));
 
/* ---------- Sonidos ---------- */
let ac;
const AC = () => ac = ac || new (window.AudioContext || window.webkitAudioContext)();
function blip(f, d = .12, type = 'sine', v = .05, when = 0) {
  try { AC(); const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime + when;
    o.type = type; o.frequency.value = f; g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0001, t + d);
    o.connect(g).connect(ac.destination); o.start(t); o.stop(t + d); } catch (e) {}
}
function keySnd() {      // tecla de máquina de escribir
  try { AC(); const n = ac.sampleRate * .06, b = ac.createBuffer(1, n, ac.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (n * .12));
    const s = ac.createBufferSource(), g = ac.createGain(); s.buffer = b; g.gain.value = .35; s.connect(g).connect(ac.destination); s.start(); blip(140, .06, 'square', .05); } catch (e) {}
}
const PENTA = [659, 784, 880, 988, 1175, 1319];
const sparkleSnd = f => blip(f || PENTA[Math.random() * 6 | 0], .14, 'triangle', .03);
let lastHam = 0;
async function hamSound() {
  if (performance.now() - lastHam < 3500) return; lastHam = performance.now();
  const u = await sfxP.hamilton;
  if (u) { const a = new Audio(u); a.volume = 1; return void a.play().catch(() => {}); }
  [392, 523, 659, 784, 1047].forEach((f, i) => blip(f, .35, 'triangle', .08, i * .11));
}
 
/* ---------- Chispas que salen de los botones (cada botón con su tema) ---------- */
const GLY = ['✦', '♡', '★', '✿', '🍊', '⚡', '🐺', '🎵', '☆', '💛', '🌸'];
const lastB = new WeakMap();
function burst(el, strong) {
  const now = performance.now(); if (now - (lastB.get(el) || 0) < 320) return; lastB.set(el, now);
  const r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  const big = el.id === 'enter' || el.id === 'hello-enter', n = big ? 14 : strong ? 8 : 5, pool = el.dataset.fx ? el.dataset.fx.split(',') : GLY;
  sparkleSnd(+el.dataset.snd);
  for (let i = 0; i < n; i++) {
    const f = document.createElement('div'); f.className = 'flyer';
    if (big && FLY.length && Math.random() < .65) { const im = new Image(); im.src = FLY[Math.random() * FLY.length | 0]; f.append(im); }
    else f.textContent = pool[Math.random() * pool.length | 0];
    body.append(f);
    const vx = rnd(big ? 560 : 220), up = 50 + Math.random() * (big ? 280 : 100), fall = innerHeight - cy + 90, rot = rnd(720);
    f.animate([
      {transform: `translate(${cx}px,${cy}px) scale(.2) rotate(0deg)`, easing: 'cubic-bezier(.2,.8,.4,1)'},
      {transform: `translate(${cx + vx * .5}px,${cy - up}px) scale(1.1) rotate(${rot / 2}deg)`, offset: .35, easing: 'cubic-bezier(.5,0,.9,.6)'},
      {transform: `translate(${cx + vx}px,${cy + fall}px) scale(1) rotate(${rot}deg)`, opacity: .9}
    ], {duration: big ? 2300 : 1500 + Math.random() * 500, delay: i * (big ? 35 : 20)}).onfinish = () => f.remove();
  }
}
document.addEventListener('mouseover', e => { const b = e.target.closest?.('.fxb'); if (b && !b.contains(e.relatedTarget)) burst(b); });
document.addEventListener('pointerdown', e => { const b = e.target.closest?.('.fxb'); if (b) burst(b, true); });
let rain; const enterBtn = $('#enter');
enterBtn.addEventListener('mouseenter', () => { clearInterval(rain); rain = setInterval(() => burst(enterBtn, true), 700); });
enterBtn.addEventListener('mouseleave', () => clearInterval(rain));
 
/* ================= 1. BOLITA → PUM ================= */
let started = false, userPaused = false, wantMusic = false, typed = false;
const vid = $('#introVideo');
$('#orb').addEventListener('click', () => {
  if (started) return; started = true;
  $('#orb').classList.add('boom'); setTimeout(() => show('s-hello'), 650); runHello();
});
 
/* ================= 2. HELLO, ZUKO HERE: solo audio, texto que se escribe ================= */
async function runHello() {
  const u = await videoP;
  if (!u) return setTimeout(typeHello, 1800);
  vid.src = u; vid.volume = 1; vid.muted = false;
  if (location.protocol.startsWith('http')) { try { AC(); const s = ac.createMediaElementSource(vid), g = ac.createGain(), cmp = ac.createDynamicsCompressor(); g.gain.value = C.boost; s.connect(g).connect(cmp).connect(ac.destination); ac.resume(); } catch (e) {} }
  vid.addEventListener('ended', () => { typeHello(); startMusic(); });
  vid.addEventListener('timeupdate', () => { const at = C.helloAt ?? Math.max(0, (vid.duration || 8) - 3.5); if (!typed && vid.currentTime >= at) typeHello(); });
  try { await vid.play(); } catch (e) { vid.muted = true; try { await vid.play(); } catch (e2) { setTimeout(typeHello, 1800); } }
}
function typeHello() {
  if (typed) return; typed = true;
  const el = $('#typed'), txt = 'Hello, Zuko here'; let i = 0;
  const t = setInterval(() => {
    el.textContent = txt.slice(0, ++i); blip(880 + Math.random() * 300, .05, 'square', .015);
    if (i >= txt.length) { clearInterval(t); setTimeout(() => $('#hello-enter').classList.add('show'), 500); }
  }, 95);
}
$('#skip').onclick = () => { typeHello(); startMusic(); $('#hello-enter').classList.add('show'); };
$('#hello-enter').addEventListener('click', () => { vid.pause(); startCollage(); });
 
/* ================= 3. COLLAGE ordenado a pantalla completa con recortes ================= */
async function startCollage() {
  setTheme('tango'); body.classList.add('day');
  await buildCollage(); show('s-collage');
  for (let i = 0; i < 3; i++) { const s = document.createElement('div'); s.className = 'scis'; s.textContent = '✂'; s.style.cssText = `top:${15 + i * 30}vh;--d:${i * .5}s`; body.append(s); setTimeout(() => s.remove(), 4200); }
  startMusic();
}
async function buildCollage() {
  const box = $('#collage'); box.innerHTML = ''; $$('.pin').forEach(p => p.remove());
  const [photos, stickers, decor, novio] = await Promise.all([photosP, stickersP, decorP, novioP]), all = photos.filter(Boolean), mob = innerWidth < 700;
  const img = (src, cls) => { const im = new Image(); im.src = src; im.alt = ''; if (cls) im.className = cls; return im; };
  const el = (tag, cls, css) => { const d = document.createElement(tag); d.className = cls; if (css) d.style.cssText = css; return d; };
  // 1) mosaico de cuadrícula perfecta que llena TODA la pantalla
  const cols = mob ? 4 : 8, rows = mob ? 6 : 4, mosaic = el('div', 'mosaic', `--c:${cols};--r:${rows}`);
  for (let i = 0; i < cols * rows; i++) {
    const c = el('div', 'cell', `--d:${((i % cols) + ((i / cols) | 0)) * 90}ms`); if (all.length) c.append(img(all[i % all.length])); mosaic.append(c);
  }
  box.append(mosaic, el('div', 'ribbon top'), el('div', 'ribbon bot'));
  // 2) estantes ordenados arriba (stickers) y abajo (decoración)
  const shelf = (cls, list, n) => { const s = el('div', 'shelf ' + cls); list.slice(0, n).forEach((u, i) => { const im = img(u); im.style.setProperty('--d', i * 90 + 'ms'); s.append(im); }); box.append(s); };
  shelf('top', stickers, mob ? 4 : 8); shelf('bot', decor, mob ? 4 : 9);
  // 3) columnas simétricas a los lados: polaroids y marcos de cámara con tu foto
  const pick = i => all.length ? all[(i * 5 + 3) % all.length] : null;
  const snap = (i, heart) => { const d = el('div', 'it2 snap' + (heart ? ' heart' : '')); const p = pick(i); if (p) d.append(img(p)); return d; };
  const love = u => { const d = el('div', 'it2 snap love'); d.append(img(u || pick(1))); return d; };
  const frame = (fr, ph) => { const d = el('div', 'it2 cdeco'), f = el('div', 'frame'); f.style.width = '100%'; d.append(f); fillFrame(f, fr, ph); return d; };
  const plain = n => { const d = el('div', 'it2 cdeco'); probeImg(n).then(u => u ? d.append(img(u)) : d.remove()); d.firstChild; return d; };
  const column = (cls, items) => { const c = el('div', 'col ' + cls); items.forEach((it, k) => { it.style.setProperty('--rr', (k % 2 ? 3 : -3) + 'deg'); it.style.setProperty('--d', k * 140 + 'ms'); c.append(it); }); box.append(c); };
  column('l', [snap(0), frame('marcocamara', 'WIN_20260617_09_29_32_Pro'), love(novio)]);
  column('r', [snap(2), frame('foto_decoracion_camara-removebg-preview', 'MUN'), frame('marco_bonito-removebg-preview', 'mejor amigaaa')]);
  if (!mob) { column('l2', [plain('potho_tira-removebg-preview'), plain('casset')]); column('r2', [snap(3, true), plain('disco decoración')]); }
  const lab = el('div', 'script'); lab.textContent = 'mis recuerdos ✿'; box.append(lab);
  // 4) stickers prendidos en las 4 esquinas de la tarjeta del título
  const tw = $('.title-wrap'); ['tl', 'tr', 'bl', 'br'].forEach((p, i) => { const s = stickers[(i + 4) % Math.max(stickers.length, 1)]; if (s) tw.append(img(s, 'pin ' + p)); });
}
 
enterBtn.addEventListener('click', e => {
  e.preventDefault(); clearInterval(rain);
  const w = $('#wipe'); w.style.setProperty('--x', e.clientX + 'px'); w.style.setProperty('--y', e.clientY + 'px');
  w.classList.add('go'); setTimeout(enterSite, 900);
});
function enterSite() {
  body.classList.add('site'); document.documentElement.classList.add('site');
  scrollTo(0, 0); setTheme('tango');
  setTimeout(() => $('#wipe').classList.remove('go'), 150);
  setTimeout(() => say(pick('inicio')), 1800);
  decorate();
}
 
/* ================= MÚSICA ================= */
const bgm = $('#bgm'); let tracks = [], ti = 0; bgm.volume = .3;
tracksP.then(t => tracks = t);
function playTrack() { if (!tracks.length || userPaused) return; bgm.src = tracks[ti % tracks.length].url; bgm.play().catch(() => {}); upNow(); }
function startMusic() { if (wantMusic) return; wantMusic = true; playTrack(); }
const upNow = () => { const n = $('#nowp'); if (n) n.textContent = tracks.length ? '♪ ' + tracks[ti % tracks.length].name : 'Sin música todavía'; };
bgm.addEventListener('ended', () => { ti++; playTrack(); });
bgm.addEventListener('error', () => { if (++ti < 30) playTrack(); });
const setOff = off => $$('.mbtn').forEach(b => b.classList.toggle('off', off));
['pointerdown', 'keydown'].forEach(ev => addEventListener(ev, () => { if (wantMusic && !userPaused && bgm.paused) playTrack(); }));
$$('.mbtn').forEach(b => b.addEventListener('click', () => {
  if (!wantMusic) { vid.muted = false; return; }
  if (bgm.paused) { userPaused = false; bgm.src ? bgm.play() : playTrack(); setOff(false); } else { userPaused = true; bgm.pause(); setOff(true); }
}));
$('#pPlay').onclick = () => $('.mbtn').click();
$('#pNext').onclick = () => { ti++; wantMusic = true; userPaused = false; playTrack(); setOff(false); };
$('#pPrev').onclick = () => { ti = Math.max(0, ti - 1); wantMusic = true; userPaused = false; playTrack(); setOff(false); };
 
/* ================= QUOTES ================= */
// texto | personaje | sección donde sale como pop-up (opcional)
const LIB = `Surpass your limits! Right here, right now!|Asta, Black Clover|inicio
Not giving up is my magic!|Asta, Black Clover|suenos
The only thing that can stop you from achieving your dreams is you!|Asta, Black Clover|suenos
There isn't any shame in being weak, the shame is in staying weak.|Fuegoleon Vermillion, Black Clover|deportes
Mankind's greatest fear is mankind itself.|Gendo Ikari, Evangelion|yo
If you don’t take risks, you can’t create a future!|Monkey D. Luffy, One Piece|idiomas
Forgetting is like a wound. The wound may heal, but it has already left a scar.|Monkey D. Luffy, One Piece
Being lonely is more painful than getting hurt.|Monkey D. Luffy, One Piece|yo
Fools who don’t respect the past are likely to repeat it.|Nico Robin, One Piece|siglo
You need to accept the fact that you’re not the best and have all the will to strive to be better than anyone you face.|Roronoa Zoro, One Piece|deportes
Those who stand at the top determine what’s wrong and what’s right! This very place is neutral ground! Justice will prevail, you say? But of course, it will! Whoever wins this war becomes justice!|Doflamingo, One Piece|mun
If you begin to regret, you’ll dull your future decisions and let others make your choices for you. All that’s left for you then is to die. Nobody can foretell the outcome. Each decision you make holds meaning only by affecting your next decision.|Erwin Smith, Attack on Titan
If you win, you live. If you lose, you die. If you don’t fight, you can’t win.|Eren Yeager, Attack on Titan|deportes
People who can’t throw something important away can never hope to change anything.|Armin Arlert, Attack on Titan|stem
I don’t like the terms good person or bad person because it’s impossible to be entirely good to everyone, or entirely bad to everyone. To some, you are a good person, while to others you are a bad person.|Armin Arlert, Attack on Titan|curioso
If you don’t share someone’s pain, you can never understand them.|Nagato, Naruto
People become stronger because they have memories they can’t forget.|Tsunade, Naruto|entorno
Love is not necessary; power is the only true necessity.|Madara Uchiha, Naruto
A dropout will beat a genius through hard work.|Rock Lee, Naruto|deportes
Hard work is worthless for those that don’t believe in themselves.|Naruto Uzumaki|inicio
A place where someone still thinks about you is a place you can call home.|Jiraiya, Naruto|entorno
Religion, ideology, resources, land, spite, love, or just because… No matter how pathetic the reason, it’s enough to start a war. War will never cease to exist… Reasons can be thought up after the fact… Human nature pursues strife.|Pain, Naruto|mun
In this world, wherever there is light — there are also shadows. As long as the concept of winners exists, there must also be losers. The selfish desire of wanting to maintain peace causes wars, and hatred is born to protect love.|Madara Uchiha, Naruto
It’s not always possible to do what we want to do, but it’s important to believe in something before you actually do it.|Might Guy, Naruto|suenos
Knowing what it feels to be in pain is exactly why we try to be kind to others.|Jiraiya, Naruto|entorno
A person grows up when he’s able to overcome hardships. Protection is important, but there are some things that a person must learn on his own.|Jiraiya, Naruto
If you don’t like your destiny, don’t accept it. Instead, have the courage to change it the way you want it to be.|Naruto Uzumaki|yo
You’ll only realize that you truly love someone if they already caused you enormous pain. Your enemies can never hurt you the way your loved ones can. It’s the people close to your heart that can give you the most piercing wound. Love is a double-edged sword; it can heal the wound faster, or it can sink the blade even deeper.|Himura Kenshin, Rurouni Kenshin
Whatever you lose, you’ll find it again. But what you throw away, you’ll never get back.|Kenshin Himura
You can die anytime, but living takes true courage.|Kenshin Himura
If you really want to be strong… Stop caring about what your surrounding thinks of you!|Saitama, One Punch Man|yo
Is that really…the limit to your power? Do you honestly think that you won’t get any stronger for the rest of your life? Instead of sitting around frustrated, it’s better to keep on moving forward.|Saitama, One Punch Man
Who decides limits? And based on what? You said you worked hard? Well, maybe you need to work a little harder. Is that really the limit of your strength? Could you of tomorrow beat you today? Instead of giving in, move forward.|Saitama, One Punch Man
You may be able to get stronger with simply the right attitude. In other words, train your spirit before worrying about strength through power and technology.|Saitama, One Punch Man
I’ll leave tomorrow’s problems to tomorrow’s me.|Saitama, One Punch Man|curioso
Human beings are strong because we can change ourselves.|Saitama, One Punch Man|stem
The ticket to the future is always open.|Vash the Stampede, Trigun|gustos
Every journey begins with a single step. We just have to have patience.|Milly Thompson, Trigun|idiomas
I am the hope of the universe. I am the answer to all living things that cry out for peace. I am the protector of the innocent. I am the light in the darkness. I am the truth. Ally to good! Nightmare to you!|Goku, Dragon Ball Z
Power comes in response to a need, not a desire. You have to create that need.|Goku, Dragon Ball Z|stem
We can’t waste time worrying about the what if’s.|Ichigo Kurosaki, Bleach
I hate perfection. To be perfect is to be unable to improve any further.|Kurotsuchi Mayuri, Bleach|yo
To know sorrow is not terrifying. What is terrifying is to know you can’t go back to happiness you could have.|Matsumoto Rangiku, Bleach
Sometimes I do feel like I’m a failure. Like there’s no hope for me. But even so, I’m not gonna give up. Ever!|Izuku Midoriya, My Hero Academia|mun
Whether you win or lose, looking back and learning from your experiences is a part of life.|All Might, My Hero Academia
Hey Villain, have you ever heard these words? Go Beyond! Plus...Ultra...!|All Might, My Hero Academia|suenos
The world isn’t perfect. But it’s there for us, doing the best it can…that’s what makes it so beautiful.|Roy Mustang, FMA: Brotherhood
A lesson without pain is meaningless. That’s because no one can gain without sacrificing something. But by enduring that pain and overcoming it, he shall obtain a powerful, unmatched heart.|Edward Elric, FMA: Brotherhood|stem
Everything has a beginning and an end. Life is just a cycle of starts and stops. There are ends we don’t desire, but they’re inevitable — we have to face them. It’s what being human is all about.|Jet Black, Cowboy Bebop
I'm not going there to die. I'm going there to find out if I'm really alive.|Spike Spiegel, Cowboy Bebop|curioso
Angels banished from heaven have no choice but to become devils.|Vicious, Cowboy Bebop|siglo
I want you to be happy. I want you to laugh a lot. I don’t know what exactly I’ll be able to do for you, but I’ll always be by your side.|Kagome, InuYasha|entorno
You’ve got two legs and a heartbeat. What’s stopping you?|Inuyasha|suenos
It’s impossible to work hard for something you don’t enjoy.|Silica, Sword Art Online|arte
Sometimes the things that matter the most are right in front of you.|Asuna Yuuki, Sword Art Online|entorno
Having a sense of fear allows you to make cool-headed decisions. Just don't chicken out because of it.|Akitaru Obi, Fire Force|deportes
The brighter they shine, the darker the shadow grows.|Makino Fumito, Hajime no Ippo
We don’t have to know what tomorrow holds! That’s why we can live for everything we’re worth today!|Natsu Dragneel, Fairy Tail|arte
Moving doesn't mean you forget things. It just means you have to accept what happened and move on.|Erza Scarlet, Fairy Tail|idiomas`
  .split('\n').map(l => l.split('|'));
const shortQ = LIB.filter(q => q[0].length < 110);
const pick = sec => { const pool = LIB.filter(q => q[2] === sec && q[0].length < 140); const arr = pool.length ? pool : shortQ; return arr[Math.random() * arr.length | 0]; };
const toast = $('#toast'); let tt;
function say(q) {
  clearTimeout(tt); toast.classList.remove('show');
  setTimeout(() => {
    toast.innerHTML = '<q></q><small></small>';
    toast.querySelector('q').textContent = q[0]; toast.querySelector('small').textContent = '— ' + q[1];
    toast.classList.add('show'); tt = setTimeout(() => toast.classList.remove('show'), 7500);
  }, 250);
}
toast.onclick = () => toast.classList.remove('show');
$('#qbtn').onclick = () => say(shortQ[Math.random() * shortQ.length | 0]);
function bigQuote() {
  const pool = LIB.filter(x => x[0].length < 190), q = pool[Math.random() * pool.length | 0], b = $('#qbig');
  const n = b.cloneNode(false); n.id = 'qbig'; n.textContent = '“' + q[0] + '”';
  const c = document.createElement('cite'); c.textContent = '— ' + q[1]; n.append(c); b.replaceWith(n);
}
$('#qnew').onclick = bigQuote;
LIB.forEach(q => { const b = document.createElement('blockquote'); b.textContent = '“' + q[0] + '”'; const c = document.createElement('cite'); c.textContent = '— ' + q[1]; b.append(c); $('#wall').append(b); });
['gustos', 'arte', 'mun', 'entorno'].forEach(id => {
  const txt = shortQ.slice().sort(() => Math.random() - .5).slice(0, 8).map(q => `“${q[0]}” — ${q[1].split(',')[0]}`).join('   ✦   ') + '   ✦   ';
  const m = document.createElement('div'); m.className = 'marquee';
  const sp = document.createElement('span'); sp.textContent = txt + txt; m.append(sp); $('#' + id).after(m);
});
 
/* ================= Fondo por sección ================= */
const seen = new Set();
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const s = e.target; setTheme(s.dataset.theme); s.classList.add('seen');
  $$('#nav a').forEach(a => a.classList.toggle('on', a.hash === '#' + s.id));
  if (!seen.has(s.id) && s.id !== 'inicio') { seen.add(s.id); say(pick(s.dataset.q)); }
}), {rootMargin: '-45% 0px -45% 0px'});
$$('#site section').forEach(s => io.observe(s));
 
/* ================= Nombre en cuentitas ================= */
const BC = ['#ff8a5c', '#ffd166', '#ff5c93', '#ffffff', '#8fe3f2', '#c9a8ff'];
[...'Daniela Arce'].forEach((ch, i) => {
  const b = document.createElement('span'); b.className = 'bead' + (ch === ' ' ? ' gap' : ''); b.textContent = ch === ' ' ? '' : ch;
  b.style.setProperty('--c', BC[i % BC.length]); b.style.setProperty('--i', i); b.addEventListener('mouseenter', () => blip(500 + i * 70, .15, 'triangle', .05)); $('#beads').append(b);
});
 
/* ================= Fandoms: carrusel lateral ================= */
$$('.arr').forEach(a => a.addEventListener('click', () => $('#hscroll').scrollBy({left: a.dataset.dir * 340, behavior: 'smooth'})));
 
/* ================= Ventanas retro y dock lateral ================= */
let zTop = 40;
$$('[data-win]').forEach((b, k) => b.addEventListener('click', () => {
  const w = $('#' + b.dataset.win); w.hidden = !w.hidden;
  if (!w.hidden) { w.style.zIndex = ++zTop; if (!w.style.top) { w.style.top = Math.min(10 + k * 2, 20) + 'vh'; w.style.left = `calc(50% - ${w.classList.contains('wide') ? 280 : 170}px + ${(k % 5) * 26 - 50}px)`; } upNow(); }
  if (b.id === 'hamBtn') hamSound();
}));
$$('.win .x').forEach(x => x.onclick = () => x.closest('.win').hidden = true);
$$('.win .bar').forEach(bar => bar.addEventListener('pointerdown', e => {
  if (e.target.closest('.x')) return;
  const w = bar.parentElement, r = w.getBoundingClientRect(), dx = e.clientX - r.left, dy = e.clientY - r.top; w.style.zIndex = ++zTop;
  const mv = ev => { w.style.left = Math.max(0, Math.min(innerWidth - 80, ev.clientX - dx)) + 'px'; w.style.top = Math.max(0, ev.clientY - dy) + 'px'; };
  const up = () => { removeEventListener('pointermove', mv); removeEventListener('pointerup', up); };
  addEventListener('pointermove', mv); addEventListener('pointerup', up);
}));
 
/* ================= Fotos en grande ================= */
const lb = $('#lightbox');
document.addEventListener('click', e => {
  const im = e.target.closest?.('.pol img');
  if (im && im.src) { lb.querySelector('img').src = im.src; lb.hidden = false; blip(700, .1, 'triangle', .05); }
  else if (e.target.closest?.('#lightbox')) lb.hidden = true;
});
 
/* ================= Cuenta regresiva: mi mejor amiga llega el 16 de noviembre ================= */
const T = new Date('2026-11-16T00:00:00');
function tick() {
  const d = T - new Date();
  if (d <= 0) { $$('#count b').forEach(b => b.textContent = '0'); $('#cmsg').textContent = '¡Ya llegó mi mejor amiga! 💛'; return; }
  const p = n => String(n).padStart(2, '0');
  $('#cd').textContent = Math.floor(d / 864e5); $('#ch').textContent = p(Math.floor(d / 36e5) % 24);
  $('#cm').textContent = p(Math.floor(d / 6e4) % 60); $('#cs').textContent = p(Math.floor(d / 1e3) % 60);
}
tick(); setInterval(tick, 1000);
 
/* ================= Datos curiosos ================= */
const FACTS = ['Cumplo años el 8 de febrero, el mismo día que Byul (de Love Is an Illusion) y Tomioka.', 'Nací en 2012, el año de Tangerine Tango, el color Pantone del año.',
  'He visto unos 200 animes, pero me gusta más leer manga.', 'Nadé años en la Federación Nacional de Deportes Acuáticos y aun así odio el estilo pecho.',
  'No soporto ninguna fruta. Ninguna.', 'Soy Ravenclaw, mi patronus es un lobo y tengo todos los libros de Harry Potter.',
  'Me he visto mil veces las películas de Marvel.', 'Según un test de personalidad me parezco a Hamilton, pero mi personaje favorito es Eliza.',
  'Fui gimnasta y era muy buena. Fue un sueño frustrado.', 'Mi mejor amiga y yo nos conocemos desde los 2 años.',
  'Tengo un erizo y se llama Stitch.', 'Mi bebida de Starbucks es el Chocolate Cream Frappuccino y no negocio.', 'Toco flauta dulce y piano.', 'Mi grupo favorito de K-pop es NewJeans.'];
$('#nextFact').onclick = () => { const f = $('#fact'); f.textContent = FACTS[Math.random() * FACTS.length | 0]; f.style.animation = 'none'; f.offsetWidth; f.style.animation = 'pop .4s cubic-bezier(.2,1.8,.4,1)'; };
 
/* ================= Partículas kawaii: destellos, corazones, bolitas ================= */
const EXTRA = {lilac: '♪', sky: '☁', gold: '♬', aqua: '≈'};
const cv = $('#fx'), g = cv.getContext('2d'); let W, H;
const size = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
addEventListener('resize', size); size();
const P = Array.from({length: innerWidth < 700 ? 26 : 50}, () => ({x: Math.random() * W, y: Math.random() * H, s: 12 + Math.random() * 20, v: .3 + Math.random() * .9, t: Math.random() * 6, r: Math.random() * 6, k: Math.random() * 6 | 0}));
(function draw() {
  g.clearRect(0, 0, W, H);
  P.forEach(p => {
    p.t += .02; p.r += .01;
    p.y += p.v * (theme === 'vault' ? -.4 : theme === 'stars' ? .2 : 1); p.x += Math.sin(p.t) * .5;
    if (p.y > H + 30) p.y = -30; if (p.y < -30) p.y = H + 30;
    g.save(); g.translate(p.x, p.y); g.rotate(Math.sin(p.r) * .6);
    g.globalAlpha = .5 + .45 * Math.sin(p.t * 2) ** 2; g.shadowColor = 'rgba(255,120,80,.8)'; g.shadowBlur = 8;
    if (p.k === 2 || p.k === 5 && !EXTRA[theme]) {                      // bolitas brillantes
      g.beginPath(); g.arc(0, 0, p.s * .45, 0, 7); g.fillStyle = 'rgba(255,255,255,.2)'; g.fill();
      g.strokeStyle = 'rgba(255,255,255,.9)'; g.lineWidth = 1.5; g.stroke();
      g.beginPath(); g.arc(-p.s * .15, -p.s * .15, p.s * .1, 0, 7); g.fillStyle = '#fff'; g.fill();
    } else {
      g.font = p.s + 'px serif';
      g.fillStyle = p.k === 1 ? '#ffd1dc' : p.k === 4 || theme === 'vault' ? '#ffe08a' : '#fff';
      g.fillText(p.k === 5 ? EXTRA[theme] : ['✦', '♥', '', '✧', '★'][p.k], 0, 0);
    }
    g.restore();
  });
  requestAnimationFrame(draw);
})();
 
/* Estela de destellos con el mouse */
let lastT = 0;
addEventListener('pointermove', e => {
  if (!body.classList.contains('site') || e.pointerType === 'touch') return;
  const now = performance.now(); if (now - lastT < 60) return; lastT = now;
  const s = document.createElement('i'); s.className = 'trail'; s.textContent = ['✦', '♡', '✧'][Math.random() * 3 | 0];
  s.style.left = e.clientX + 'px'; s.style.top = e.clientY + 'px'; body.append(s); setTimeout(() => s.remove(), 800);
});
 
/* ================= Hamilton + rueda de fandoms ================= */
const wait = ms => new Promise(r => setTimeout(r, ms));
document.addEventListener('mouseover', e => { if (e.target.closest?.('.ham')) hamSound(); });
const fmodal = $('#fmodal');
$('#track')?.addEventListener('click', e => {
  const c = e.target.closest('.fcard'); if (!c) return;
  $('#fmin').innerHTML = c.innerHTML; fmodal.hidden = false; $('#film').classList.add('paused'); blip(660, .15, 'triangle', .06);
  if (c.classList.contains('ham')) hamSound();
});
fmodal.addEventListener('click', e => { if (!e.target.closest('.fm-in')) { fmodal.hidden = true; $('#film').classList.remove('paused'); $('#reelPause').textContent = '⏸ Pausar'; } });
$('#reelPause').onclick = e => { const p = $('#film').classList.toggle('paused'); e.currentTarget.textContent = p ? '▶ Seguir' : '⏸ Pausar'; };
 
/* ================= Costados: mapa, ir al final ================= */
$$('[data-go]').forEach(b => b.addEventListener('click', () => $(b.dataset.go).scrollIntoView({behavior: 'smooth'})));
const MAP = [['inicio', '🍊', 'Inicio', '#ffb38a'], ['sobre-mi', '💛', 'Quién soy', '#ffc2d4'], ['fandoms', '🎞', 'Fandoms', '#d9c8ff'], ['gustos', '🍣', 'Gustos', '#ffd9b8'],
  ['deportes', '🏊', 'Deportes', '#b8f0ff'], ['arte', '🎹', 'Arte', '#e0ccff'], ['idiomas', 'あ', 'Idiomas', '#c9f7e8'], ['mun', '🔨', 'MUN', '#ffe08a'], ['stem', '🧪', 'STEM', '#c4f5e4'],
  ['suenos', '✈️', 'Sueños', '#bfeaff'], ['amiga', '🫶', 'Mi amiga', '#ffc2d4'], ['entorno', '🦔', 'Erizo', '#ffd9a8'], ['curioso', '🔎', 'Curioso', '#e0ccff'],
  ['quotes', '💬', 'Quotes', '#ffc49b'], ['siglo-perdido', '🔒', 'Siglo Perdido', '#ffd66b'], ['fin', '⌨', 'The End', '#ff8a5c']];
const mfx = (sym, frames, dur, o = {}) => { const e = document.createElement('div'); e.className = 'mfx'; e.textContent = sym; if (o.size) e.style.fontSize = o.size; body.append(e); e.animate(frames, {duration: dur, delay: o.delay || 0, easing: o.ease || 'ease-in-out', fill: 'both'}).onfinish = () => e.remove(); };
const tr = (x, y, r = 0, s = 1, o = 1) => ({transform: `translate(${x}px,${y}px) rotate(${r}deg) scale(${s})`, opacity: o});
const arc = (sym, x0, y0, x1, y1, h, r0, r1, dur, o) => { const f = []; for (let i = 0; i <= 10; i++) { const t = i / 10; f.push(tr(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t - 4 * h * t * (1 - t), r0 + (r1 - r0) * t, 1, i === 0 || i === 10 ? 0 : 1)); } mfx(sym, f, dur, o); };
const rise = (sym, x, y, n, sp, h, dur) => { for (let i = 0; i < n; i++) { const px = x + rnd(sp), dx = rnd(60); mfx(sym, [tr(px, y, 0, .3, 0), tr(px + dx * .5, y - h * .5, rnd(30), 1, 1), tr(px + dx, y - h, rnd(60), .8, 0)], dur + Math.random() * 400, {delay: i * 110, ease: 'ease-out'}); } };
const pops = (syms, x, y, R) => syms.forEach((s, i) => { const a = i / syms.length * 6.283 - 1.57, px = x + Math.cos(a) * R, py = y + Math.sin(a) * R; mfx(s, [tr(x, y, 0, 0, 0), tr(px, py, rnd(20), 1.3, 1), tr(px, py - 20, 0, 1, 0)], 1100, {delay: i * 90, ease: 'cubic-bezier(.2,1.8,.4,1)', size: '1.6rem'}); });
const FXMAP = {
  'inicio': (x, y) => { arc('🍊', x - 120, y + 30, x + 120, y + 30, 100, 0, 540, 1300); arc('🍊', x + 120, y + 30, x - 120, y + 30, 60, 0, -360, 1300, {delay: 200}); rise('✨', x, y, 4, 90, 70, 900); },
  'sobre-mi': (x, y) => rise('💛', x, y, 7, 80, 110, 1400),
  'fandoms': (x, y) => { mfx('🎞', [tr(x, y, 0, .3, 0), tr(x, y - 50, 360, 1.4, 1), tr(x, y - 110, 720, .6, 0)], 1400, {size: '2.6rem'}); rise('⚡', x, y, 3, 90, 90, 1100); },
  'gustos': (x, y) => { [['🍣', 0], ['🍰', 40], ['🍫', -40]].forEach(([s, dx], i) => mfx(s, [tr(x + dx, y - 150, 0, 1, 0), tr(x + dx, y - 10, 20, 1, 1), tr(x + dx, y - 50, -10, 1, 1), tr(x + dx, y - 10, 0, 1, 1), tr(x + dx, y - 10, 0, 1, 0)], 1300, {ease: 'ease-in', delay: i * 180})); },
  'deportes': (x, y) => { arc('🐬', x - 140, y + 50, x + 140, y + 50, 140, -60, 50, 1500, {size: '3rem'}); setTimeout(() => pops(['💦', '💦', '🌊'], x + 130, y + 40, 40), 1250); rise('💧', x - 130, y + 50, 3, 40, 60, 700); },
  'arte': (x, y) => { rise('♪', x, y, 3, 70, 120, 1500); rise('♬', x, y, 3, 70, 110, 1600); mfx('🎹', [tr(x, y - 10, 0, .3, 0), tr(x, y - 40, -10, 1.4, 1), tr(x, y - 30, 10, 1.4, 1), tr(x, y - 70, 0, 1, 0)], 1300); },
  'idiomas': (x, y) => pops(['あ', 'Aa', 'é', '語', 'ñ', 'Ω'], x, y, 70),
  'mun': (x, y) => { mfx('🔨', [tr(x + 40, y - 100, -70, 1.6, 0), tr(x + 40, y - 70, -70, 1.6, 1), tr(x + 10, y - 10, 10, 1.6, 1), tr(x + 12, y - 14, 4, 1.6, 1), tr(x + 12, y - 14, 4, 1.6, 0)], 900); setTimeout(() => { mfx('💥', [tr(x, y + 10, 0, .3, 1), tr(x, y, 0, 1.6, 1), tr(x, y, 0, 2, 0)], 600); blip(120, .2, 'square', .1); }, 420); },
  'stem': (x, y) => { rise('🫧', x, y, 7, 70, 110, 1500); mfx('⚛', [tr(x, y, 0, .5, 0), tr(x, y - 60, 360, 1.3, 1), tr(x, y - 130, 720, .6, 0)], 1500); },
  'suenos': (x, y) => { arc('✈️', x - 180, y - 10, x + 180, y - 80, 10, 0, 0, 1700, {size: '2.6rem'}); rise('☁', x, y, 3, 100, 50, 1500); },
  'amiga': (x, y) => pops(['💛', '🫶', '💛', '✈️'], x, y, 65),
  'entorno': (x, y) => { const f = []; for (let i = 0; i <= 12; i++) f.push(tr(x - 130 + i * 22, y + 30 - Math.abs(Math.sin(i)) * 20, Math.sin(i) * 10, 1, i === 0 || i === 12 ? 0 : 1)); mfx('🦔', f, 1800, {size: '2.6rem'}); rise('🌿', x, y + 20, 3, 120, 40, 1400); },
  'curioso': (x, y) => { mfx('🔎', [tr(x - 90, y, -20, 1, 0), tr(x - 60, y - 10, 0, 1.4, 1), tr(x + 60, y + 10, 0, 1.4, 1), tr(x + 90, y, 20, 1, 0)], 1500, {size: '2.6rem'}); pops(['❓', '❔', '✦'], x, y - 20, 60); },
  'quotes': (x, y) => pops(['💬', '“', '”', '✨'], x, y, 60),
  'siglo-perdido': (x, y) => { mfx('🔒', [tr(x, y - 10, 0, 1.3, 1), tr(x, y - 10, 0, 1.3, 1), tr(x, y - 10, 0, .1, 0)], 600); setTimeout(() => { mfx('🔓', [tr(x, y - 10, 0, .2, 0), tr(x, y - 10, 0, 1.5, 1), tr(x, y - 40, 0, 1.5, 0)], 900); rise('🗝', x, y, 3, 40, 90, 1000); rise('✨', x, y, 5, 70, 100, 1000); }, 500); },
  'fin': (x, y) => [...'The End'].forEach((c, i) => { mfx(c === ' ' ? '·' : c, [tr(x - 60 + i * 20, y + 20, 0, .3, 0), tr(x - 60 + i * 20, y - 30, rnd(20), 1.2, 1), tr(x - 60 + i * 20, y - 50, 0, 1, 0)], 900, {delay: i * 110, size: '1.8rem'}); setTimeout(keySnd, i * 110); })
};
MAP.forEach(([id, e, t, c], i) => {
  const b = document.createElement('button'); b.className = 'bubble'; b.style.setProperty('--c', c); b.style.setProperty('--i', i);
  const play = () => { if (performance.now() - (b._t || 0) < 1500) return; b._t = performance.now(); const r = b.getBoundingClientRect(); FXMAP[id]?.(r.left + r.width / 2, r.top + r.height / 2); blip(440 + i * 45, .14, 'triangle', .05); };
  b.innerHTML = `<b>${e}</b>${t}`; b.onmouseenter = play;
  b.onclick = () => { play(); setTimeout(() => { $('#map').hidden = true; $('#' + id).scrollIntoView({behavior: 'smooth'}); }, 650); };
  $('#bubbles').append(b);
});
$$('[data-open=map]').forEach(b => b.addEventListener('click', () => { $('#map').hidden = false; blip(660, .2, 'triangle', .06); }));
$('#mapx').onclick = () => $('#map').hidden = true;
addEventListener('keydown', e => { if (e.key === 'Escape') { $('#map').hidden = true; lb.hidden = true; fmodal.hidden = true; $('#film').classList.remove('paused'); } });
 
/* ================= Minijuegos ================= */
const GAMES = {mem: memory, bub: bubbles, sim: simon, ttt, typ: typing};
let bubT; $$('[data-game]').forEach(b => b.addEventListener('click', () => { clearInterval(bubT); GAMES[b.dataset.game](); }));
function memory() {
  const g = $('#gbox'); g.innerHTML = '<div id="gm" style="display:grid;grid-template-columns:repeat(4,1fr);gap:.4rem"></div>';
  const items = [...FLY.slice(0, 6).map(u => ({u})), ...['🍊', '⚡', '🐺', '🌸', '🎹', '🔨'].map(t => ({t}))].slice(0, 8), grid = $('#gm');
  const deck = [...items, ...items].sort(() => Math.random() - .5); let first = null, lock = false, left = 8, moves = 0;
  deck.forEach(it => {
    const c = document.createElement('button'); c.className = 'mc'; c.dataset.k = it.u || it.t; c.textContent = '?';
    c.onclick = () => {
      if (lock || c.classList.contains('on') || c.classList.contains('ok')) return;
      c.classList.add('on'); c.innerHTML = it.u ? `<img src="${it.u}" alt="">` : it.t; blip(600, .08, 'triangle', .05);
      if (!first) return void (first = c); moves++;
      if (first.dataset.k === c.dataset.k) { first.classList.replace('on', 'ok'); c.classList.replace('on', 'ok'); first = null; blip(988, .2, 'triangle', .07);
        if (!--left) { grid.insertAdjacentHTML('beforeend', `<p style="grid-column:1/-1;text-align:center"><b>¡Ganaste en ${moves} movimientos! 🎉</b></p>`); [523, 659, 784, 1047].forEach((f, i) => blip(f, .3, 'triangle', .07, i * .1)); } }
      else { lock = true; const a = first; first = null; setTimeout(() => { [a, c].forEach(x => { x.classList.remove('on'); x.textContent = '?'; }); lock = false; }, 700); }
    }; grid.append(c);
  });
}
function bubbles() {
  const g = $('#gbox'); g.innerHTML = '<div id="gb" style="position:relative;height:240px;background:linear-gradient(#bfeaff,#fff);border:3px solid var(--ink);border-radius:12px;overflow:hidden"><p style="position:absolute;left:8px;top:2px;margin:0"><b id="bs">0</b> pts · <b id="bt">20</b>s</p></div>';
  const a = $('#gb'); let s = 0, t = 20; const hi = +(localStorage.getItem('bub-hi') || 0);
  bubT = setInterval(() => {
    if (--t <= 0) { clearInterval(bubT); try { localStorage.setItem('bub-hi', Math.max(hi, s)); } catch (e) {} a.innerHTML = `<p style="text-align:center;padding-top:70px"><b>${s} burbujas 🫧</b><br>Récord: ${Math.max(hi, s)}<br><button class="btn sm fxb" id="bagain">Otra vez</button></p>`; $('#bagain').onclick = bubbles; return; }
    $('#bt').textContent = t; const b = document.createElement('div'), z = 28 + Math.random() * 30; b.className = 'bb';
    b.style.cssText = `width:${z}px;height:${z}px;left:${Math.random() * (a.clientWidth - z)}px;top:${25 + Math.random() * (a.clientHeight - z - 30)}px`;
    b.onclick = () => { b.remove(); $('#bs').textContent = ++s; blip(700 + s * 15, .08, 'triangle', .05); }; a.append(b); setTimeout(() => b.remove(), 1400);
  }, 520);
}
function simon() {
  const g = $('#gbox'), cols = ['#dd4124', '#ffc857', '#8fe3f2', '#ff5c93'], notes = [262, 330, 392, 523];
  g.innerHTML = '<p class="center"><b id="sr">Ronda 0</b> <button class="btn sm fxb" id="ss">Empezar</button></p><div class="simgrid"></div>';
  const pads = cols.map(c => { const d = document.createElement('div'); d.className = 'sp2'; d.style.background = c; d.style.setProperty('--c', c); g.querySelector('.simgrid').append(d); return d; });
  let seq = [], pos = 0, busy = true;
  const flash = async i => { pads[i].classList.add('lit'); blip(notes[i], .3, 'triangle', .1); await wait(350); pads[i].classList.remove('lit'); await wait(120); };
  const next = async () => { seq.push(Math.random() * 4 | 0); $('#sr').textContent = 'Ronda ' + seq.length; await wait(500); busy = true; for (const i of seq) await flash(i); busy = false; pos = 0; };
  pads.forEach((p, i) => p.onclick = async () => {
    if (busy) return; await flash(i);
    if (seq[pos] !== i) { $('#sr').textContent = '¡Fallaste en la ronda ' + seq.length + '!'; blip(150, .5, 'sawtooth', .1); seq = []; busy = true; return; }
    if (++pos === seq.length) { busy = true; next(); }
  });
  $('#ss').onclick = () => { seq = []; next(); };
}
function ttt() {
  const g = $('#gbox'); g.innerHTML = '<p class="center" id="tm">Tú eres X. Empiezas.</p><div class="tttg"></div><p class="center"><button class="btn sm fxb" id="tr">Reiniciar</button></p>';
  let b = Array(9).fill(''), over = false; const L = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  const cells = [...Array(9)].map((_, i) => { const c = document.createElement('button'); c.onclick = () => mv(i); g.querySelector('.tttg').append(c); return c; });
  const win = p => L.some(l => l.every(i => b[i] === p)), draw = () => cells.forEach((c, i) => c.textContent = b[i]);
  const bot = () => { const free = b.map((v, i) => v ? null : i).filter(v => v !== null); const tw = p => free.find(i => { b[i] = p; const w = win(p); b[i] = ''; return w; });
    b[tw('O') ?? tw('X') ?? (b[4] === '' ? 4 : null) ?? free[Math.random() * free.length | 0]] = 'O'; };
  function mv(i) {
    if (over || b[i]) return; b[i] = 'X'; blip(600, .1, 'triangle', .06);
    if (win('X')) { draw(); $('#tm').textContent = '¡Ganaste! 🎉'; over = true; return; }
    if (b.every(Boolean)) { draw(); $('#tm').textContent = 'Empate'; over = true; return; }
    bot(); draw(); if (win('O')) { $('#tm').textContent = 'Gané yo 😌'; over = true; } else if (b.every(Boolean)) { $('#tm').textContent = 'Empate'; over = true; }
  }
  $('#tr').onclick = ttt;
}
function typing() {
  const g = $('#gbox'), qs = LIB.filter(q => q[0].length > 40 && q[0].length < 95), q = qs[Math.random() * qs.length | 0][0];
  g.innerHTML = '<p class="center">Escribe esta quote lo más rápido que puedas:</p><div class="typq" id="tq"></div><input id="typin" placeholder="Empieza a escribir…" autocomplete="off"><p class="center" id="tres"></p>';
  const tq = $('#tq'), inp = $('#typin'); let t0 = 0; tq.innerHTML = [...q].map(c => `<span>${c}</span>`).join('');
  inp.oninput = () => {
    if (!t0) t0 = performance.now(); const v = inp.value; [...tq.children].forEach((s, i) => s.className = v[i] == null ? '' : v[i] === q[i] ? 'ok' : 'bad'); keySnd();
    if (v.length >= q.length) { const secs = (performance.now() - t0) / 1000, ok = [...q].filter((c, i) => v[i] === c).length; $('#tres').innerHTML = `<b>${Math.round(ok / 5 / (secs / 60))} PPM · ${Math.round(ok / q.length * 100)}% de precisión</b>`; inp.disabled = true; }
  };
}
memory();
 
/* ================= Piano ================= */
const NOTES = [['C', 262], ['D', 294], ['E', 330], ['F', 349], ['G', 392], ['A', 440], ['B', 494], ['C', 523]], KEYS = 'asdfghjk', BLK = {0: 1, 1: 1, 3: 1, 4: 1, 5: 1};
const pi = $('#piano');
NOTES.forEach(([n, f], i) => { const k = document.createElement('div'); k.className = 'pk'; k.textContent = n; k.dataset.f = f; k.dataset.key = KEYS[i]; pi.append(k);
  if (BLK[i] && i < 7) { const b = document.createElement('div'); b.className = 'pk bk'; b.dataset.f = f * 1.0595; b.style.left = `calc(${(i + 1) * 12.5}% - 4%)`; pi.append(b); } });
const playK = k => { blip(+k.dataset.f, .7, 'triangle', .12); k.classList.add('on'); setTimeout(() => k.classList.remove('on'), 150); };
pi.addEventListener('pointerdown', e => { const k = e.target.closest('.pk'); if (k) playK(k); });
addEventListener('keydown', e => { if (e.target.matches('input,textarea')) return; const k = pi.querySelector(`[data-key="${e.key}"]`); if (k && !$('#w-piano').hidden) playK(k); });
 
/* ================= Cajita de indispensables ================= */
[...'MIS KIT'].forEach((ch, i) => { const b = document.createElement('b'); b.textContent = ch === ' ' ? '' : ch; if (ch === ' ') b.style.visibility = 'hidden'; b.onmouseenter = () => blip(500 + i * 60, .12, 'triangle', .05); $('#kbeads').append(b); });
$$('.it').forEach((it, i) => it.addEventListener('mouseenter', () => blip(440 + i * 35, .1, 'triangle', .04)));
 
/* ================= Galleta de la suerte y libro de visitas ================= */
const FORT = ['Pronto vas a conseguir tu martillo de Best Delegate 🔨', 'Alguien que quieres mucho está por llegar ✈️', 'Hoy vas a probar algo dulce y te va a encantar 🍪', 'Tu próximo proyecto va a ganar el primer puesto 🧪',
  'Un erizo te manda un abrazo (con cuidado) 🦔', 'Vas a ganar la próxima competencia. Odias perder, así que ya sabes cómo se hace 🏊', 'Lo que hoy te da miedo, mañana será una anécdota ✨', 'Te espera un maratón de anime sin culpa 🍿',
  'Tu fruta favorita es: ninguna. Y está bien 🍎✕', 'Un viaje largo empieza con una carrera STEM bien elegida 🎓', 'La suerte te sonríe… pero igual estudia para el cuestionario 😌'];
$('#cookieBtn').onclick = e => { const b = e.currentTarget; b.classList.remove('crack'); b.offsetWidth; b.classList.add('crack'); blip(200, .2, 'square', .06); setTimeout(() => { $('#fortune').textContent = FORT[Math.random() * FORT.length | 0]; blip(988, .3, 'triangle', .07); }, 300); };
const BK = 'libro-visitas';
function renderBook() { const box = $('#bentries'); box.innerHTML = ''; let a = []; try { a = JSON.parse(localStorage.getItem(BK) || '[]'); } catch (e) {} a.slice().reverse().forEach(m => { const d = document.createElement('div'); d.className = 'entry'; const b = document.createElement('b'); b.textContent = m.n || 'Anónimo'; const p = document.createElement('p'); p.textContent = m.m; d.append(b, p); box.append(d); }); }
$('#bookform').onsubmit = e => { e.preventDefault(); const m = $('#bmsg').value.trim(); if (!m) return; let a = []; try { a = JSON.parse(localStorage.getItem(BK) || '[]'); } catch (e2) {} a.push({n: $('#bname').value.trim(), m}); try { localStorage.setItem(BK, JSON.stringify(a.slice(-30))); } catch (e3) {} $('#bmsg').value = ''; renderBook(); blip(784, .2, 'triangle', .06); };
renderBook();
 
/* ================= Playlist ================= */
const pbar = $('#pbar'), fmt = s => isFinite(s) ? Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0') : '0:00';
bgm.addEventListener('timeupdate', () => { if (bgm.duration) { pbar.value = bgm.currentTime / bgm.duration * 100; $('#pcur').textContent = fmt(bgm.currentTime); $('#ptot').textContent = fmt(bgm.duration); } });
pbar.oninput = () => { if (bgm.duration) bgm.currentTime = pbar.value / 100 * bgm.duration; };
$('#pvol').oninput = e => bgm.volume = e.target.value / 100;
function renderList() { const l = $('#plist'); l.innerHTML = ''; tracks.forEach((t, i) => { const b = document.createElement('button'); b.textContent = '♪ ' + t.name; b.className = i === ti % tracks.length ? 'on' : ''; b.onclick = () => { ti = i; wantMusic = true; userPaused = false; playTrack(); setOff(false); renderList(); }; l.append(b); }); }
tracksP.then(renderList); bgm.addEventListener('play', renderList);
 
/* ================= Máquina de escribir: el texto va SOBRE la hoja ================= */
function detectPaper(img) {
  try {
    const S = Math.min(200, img.naturalWidth), k = S / img.naturalWidth, w = S, h = Math.round(img.naturalHeight * k), cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    const g = cv.getContext('2d', {willReadFrequently: true}); g.drawImage(img, 0, 0, w, h); const d = g.getImageData(0, 0, w, h).data, N = w * h, ok = new Uint8Array(N), lab = new Int32Array(N);
    for (let i = 0; i < N; i++) { const a = d[i * 4 + 3], r = d[i * 4], gr = d[i * 4 + 1], b = d[i * 4 + 2]; ok[i] = a > 200 && r > 222 && gr > 212 && b > 188 && r - b < 50 ? 1 : 0; }
    let best = null, id = 0;
    for (let s = 0; s < N; s++) { if (!ok[s] || lab[s]) continue; id++; let n = 0, x1 = w, y1 = h, x2 = 0, y2 = 0; const q = [s]; lab[s] = id;
      while (q.length) { const i = q.pop(), cx = i % w, cy = (i / w) | 0; n++; if (cx < x1) x1 = cx; if (cx > x2) x2 = cx; if (cy < y1) y1 = cy; if (cy > y2) y2 = cy;
        for (const j of [cx > 0 ? i - 1 : -1, cx < w - 1 ? i + 1 : -1, i - w, i + w]) if (j >= 0 && j < N && ok[j] && !lab[j]) { lab[j] = id; q.push(j); } }
      if (!best || n > best.n) best = {n, x1, y1, x2, y2}; }
    if (!best || best.n < N * .03) return null;
    return {l: best.x1 / w * 100, t: best.y1 / h * 100, w: (best.x2 - best.x1 + 1) / w * 100, h: (best.y2 - best.y1 + 1) / h * 100};
  } catch (e) { return null; }
}
const twImg = $('#tw .typewriter'), twt = $('#twtext');
function placeText() {
  const W = twImg.clientWidth || 460;
  twt.style.cssText = `left:${W * .18}px;top:${W * .25}px;width:${W * .62}px;height:${W * .4}px;font-size:${W * .07}px`;
}
twImg.complete && twImg.naturalWidth ? placeText() : twImg.addEventListener('load', placeText); addEventListener('resize', placeText);
let typingEnd = false;
function typeEnd() {
  if (typingEnd) return; typingEnd = true; placeText();
  const el = $('#typedEnd'), cr = $('#credits'); el.textContent = ''; cr.hidden = true; $('#seguro').hidden = true; let i = 0; const txt = 'The End..?';
  const t = setInterval(() => {
    el.textContent = txt.slice(0, ++i); keySnd();
    if (i >= txt.length) { clearInterval(t); blip(1568, .9, 'sine', .08); setTimeout(() => { $('#seguro').hidden = false; $('#restart').hidden = false; cr.hidden = false; const r = cr.querySelector('.roll'); r.style.animation = 'none'; r.offsetWidth; r.style.animation = ''; typingEnd = false; }, 1100); }
  }, 360);
}
new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { typeEnd(); o.disconnect(); } }, {threshold: .5}).observe($('#fin'));
$('#again2').onclick = typeEnd; $('#restart').onclick = () => { scrollTo(0, 0); setTimeout(() => location.reload(), 250); };
 
/* ================= Algo sale del botón de entrada, siempre ================= */
setInterval(() => {
  ['hello-enter', 'enter'].forEach(id => {
    const b = document.getElementById(id); if (!b || !b.offsetParent || getComputedStyle(b).opacity < .5 || document.hidden) return;
    const r = b.getBoundingClientRect(), n = 1 + (Math.random() < .5), pool = ['✦', '♡', '★', '✿', '🍊', '⚡', '🌸', '🎵'];
    for (let i = 0; i < n; i++) {
      const f = document.createElement('div'); f.className = 'emitter';
      if (FLY.length && Math.random() < .35) { const im = new Image(); im.src = FLY[Math.random() * FLY.length | 0]; f.append(im); } else f.textContent = pool[Math.random() * pool.length | 0];
      body.append(f); const x = r.left + Math.random() * r.width, y = r.top + r.height * .3, dx = rnd(160), up = 70 + Math.random() * 90;
      f.animate([{transform: `translate(${x}px,${y}px) scale(.2) rotate(0)`, opacity: 0}, {transform: `translate(${x + dx * .4}px,${y - up * .5}px) scale(1) rotate(${rnd(90)}deg)`, opacity: 1, offset: .35}, {transform: `translate(${x + dx}px,${y - up - 40}px) scale(.8) rotate(${rnd(200)}deg)`, opacity: 0}], {duration: 1700 + Math.random() * 600, easing: 'ease-out'}).onfinish = () => f.remove();
    }
  });
}, 750);
 
/* ================= Decoración en las esquinas de las tarjetas (con TODA tu decoración) ================= */
async function decorate() {
  const st = await stickersP, dc = await decorP, ph = (await photosP).filter(Boolean), mob = innerWidth < 900, pool = [...dc, ...dc, ...st];
  const frames = [['marco_bonito-removebg-preview', 0, 110], ['foto_decoracion_camara-removebg-preview', 1, 120], ['marcocamara', 2, 140]];
  const corners = ['right:-24px;top:-30px', 'left:-24px;bottom:-26px', 'right:-20px;bottom:-30px'];
  let n = 0;
  for (const p of $$('#site .panel:not(.vault)')) {
    const used = mob ? corners.slice(0, 1) : corners.slice(0, 2 + (n++ % 2));
    for (const pos of used) {
      const useFrame = Math.random() < .3, el = document.createElement(useFrame ? 'div' : 'img'), rot = rnd(24).toFixed(1) + 'deg';
      el.className = 'corner' + (mob ? ' keep' : ''); el.style.cssText = `${pos};--r:${rot};--w:${64 + Math.random() * 50}px`;
      if (useFrame) { const [f, k, w] = frames[Math.random() * frames.length | 0]; el.classList.add('frame'); el.style.setProperty('--w', w + 'px'); fillFrame(el, f, ph[(n * 3 + k * 7) % ph.length]); }
      else if (pool.length) { el.src = pool[Math.random() * pool.length | 0]; el.alt = ''; } else continue;
      p.append(el);
    }
  }
}
// Nombre en imagen (si tu banner existe); si no, las cuentitas
probeImg('Azul Blanco y Beige Simple Resumen Anual Publicación de Instagram').then(u => { if (u) { const b = $('#beads'); b.innerHTML = ''; const im = new Image(); im.src = u; im.alt = 'Daniela Arce'; im.className = 'namebanner'; b.append(im); } });
 
/* ================= SIGLO PERDIDO: cuestionario difícil ================= */
const QZ = [
  ["¿Cuáles fueron mis primeros animes?", "Pokémon y Glitter Force", ["Sailor Moon y Naruto", "Death Note y Bleach", "Dragon Ball y Digimon"]],
  ["¿Cuál es mi temporada favorita de Pokémon?", "XYZ", ["Sol y Luna", "Diamante y Perla", "Negro y Blanco"]],
  ["¿Cuáles son mis pokémon favoritos?", "Espeon y Hoopa", ["Pikachu y Eevee", "Mewtwo y Lucario", "Umbreon y Gengar"]],
  ["¿Qué personajes de Marvel son mis favoritos?", "Hawkeye y Tony Stark", ["Thor y Loki", "Spider-Man y Black Widow", "Capitán América y Hulk"]],
  ["¿Cuál es mi trilogía favorita de Star Wars?", "La de Anakin (las precuelas)", ["La original", "La de Rey", "No tengo favorita"]],
  ["¿Cuál es mi personaje favorito de Star Wars?", "R2-D2", ["Yoda", "Darth Vader", "Chewbacca"]],
  ["¿Cuál es mi patronus?", "Un lobo", ["Un ciervo", "Un gato", "Un fénix"]],
  ["¿De qué casa de Hogwarts soy?", "Ravenclaw", ["Gryffindor", "Slytherin", "Hufflepuff"]],
  ["¿Qué pido en Starbucks?", "Chocolate Cream Frappuccino", ["Caramel Macchiato", "Pink Drink", "Matcha Latte"]],
  ["¿Cuál es mi personaje favorito de Hamilton?", "Eliza", ["Hamilton", "Angelica", "Burr"]],
  ["¿Con quién me da el test de personalidad de Hamilton?", "Hamilton", ["Eliza", "Burr", "Jefferson"]],
  ["¿Qué estilo de natación odio?", "Pecho", ["Libre", "Espalda", "Mariposa"]],
  ["¿Cuánto era el fondo semilla de IntiCrisp?", "S/ 2,500", ["S/ 5,000", "S/ 1,000", "S/ 10,000"]],
  ["¿Qué día llega mi mejor amiga?", "16 de noviembre", ["8 de febrero", "16 de diciembre", "1 de noviembre"]],
  ["¿Qué palabra me define?", "Competitiva", ["Tranquila", "Distraída", "Perezosa"]],
  ["¿Cuál es mi grupo favorito de K-pop?", "NewJeans", ["BTS", "Blackpink", "Stray Kids"]],
  ["¿Con qué personajes me parezco más?", "Azula y Asuka", ["Zuko y Edward", "Luffy y Naruto", "Senku y Saitama"]],
  ["¿Qué quiero estudiar?", "Bioquímica o Ciencias Biológicas", ["Derecho internacional", "Arquitectura", "Medicina veterinaria"]],
  ["¿En qué comité fueron todos mis premios de MUN?", "WHO", ["UNICEF", "DISEC", "ECOSOC"]],
  ["¿En qué conferencia gané Outstanding Delegate?", "SFC MUN", ["Cambridge College", "SNJ", "Harvard MUN"]],
  ["¿Qué dulces llevo siempre en mi cajita?", "Chin Chin", ["Gomitas", "Sublime", "M&M's"]],
  ["¿Cómo se llama mi erizo?", "Stitch", ["Sonic", "Spike", "Pinchito"]],
  ["¿Qué país representé en el Cambridge College MUN?", "Taiwán", ["Australia", "Japón", "Perú"]],
  ["¿Qué país representé en SNJ MUN?", "Australia", ["Taiwán", "Canadá", "Francia"]]
];
const NEED = Math.ceil(QZ.length * .8), KEY = 'siglo-perdido-ok';
const unlock = () => { $('#locked').hidden = $('#quiz').hidden = true; $('#secret').hidden = false; $('#dockChat').hidden = false; if (!$('#msgs').children.length) botSay('¡Hola! Soy la versión chatbot de Daniela 💛 Pregúntame lo que quieras, usa los temas de arriba o escribe /ayuda.', DEF); };
$('#startQuiz').onclick = () => { $('#locked').hidden = true; $('#quiz').hidden = false; ask(0, 0); };
function ask(i, score) {
  const box = $('#quiz');
  if (i === QZ.length) {
    if (score >= NEED) { try { localStorage.setItem(KEY, 1); } catch (e) {} [523, 659, 784, 1047].forEach((f, j) => blip(f, .35, 'triangle', .08, j * .12)); return unlock(); }
    box.innerHTML = `<p class="q">Acertaste ${score} de ${QZ.length}. Necesitas ${NEED}. Vuelve a leer la página e inténtalo otra vez.</p><button class="btn fxb" id="again">Reintentar</button>`;
    return void ($('#again').onclick = () => ask(0, 0));
  }
  const [q, ok, bad] = QZ[i], opts = [ok, ...bad].sort(() => Math.random() - .5);
  box.innerHTML = `<h3>Pregunta ${i + 1} de ${QZ.length} · necesitas ${NEED}</h3><div class="qprog"><i style="width:${i / QZ.length * 100}%"></i></div><p class="q"></p>`; box.querySelector('.q').textContent = q;
  opts.forEach(o => { const b = document.createElement('button'); b.className = 'o'; b.textContent = o;
    b.onclick = () => { box.querySelectorAll('.o').forEach(x => { x.disabled = true; if (x.textContent === ok) x.classList.add('good'); }); if (o !== ok) b.classList.add('badc'); blip(o === ok ? 880 : 180, .25, o === ok ? 'triangle' : 'sawtooth', .07); setTimeout(() => ask(i + 1, score + (o === ok)), 750); }; box.append(b); });
}
 
/* ================= CHAT: responde como yo ================= */
const K = (keys, ans, nxt = '') => ({k: keys.split(','), a: ans.split('|'), n: nxt.split(',').filter(Boolean)});
const KB = [
  K('hola,buenas,holi,hey,que tal,buenos dias', '¡Hola! Soy la versión chatbot de Daniela 💛 Pregúntame lo que quieras.|¡Holi! ¿Qué quieres saber de mí?', '¿Cómo eres?,¿Qué estudiarás?,¿Tu color favorito?'),
  K('como te llamas,tu nombre,quien eres,presentate', 'Soy Daniela Arce… o bueno, su chatbot. Hablo como ella.', '¿Cómo eres?,¿Qué estudiarás?'),
  K('eres una ia,eres un bot,eres real,inteligencia artificial,robot,chatgpt', 'Soy un chatbot que programó Daniela con respuestas suyas. Todo lo que digo sale de lo que ella escribió, así que sí soy bastante ella.', '¿Qué sabes de mí?'),
  K('color,naranja,blanco', 'Naranja, obvio. Y el blanco también. Por eso esta página es naranja 🍊', '¿Por qué naranja?,¿Qué comes?'),
  K('2012,pantone,tangerine,por que naranja,pagina naranja', 'Nací en 2012, el año del color Pantone Tangerine Tango. Es mi color desde antes de saberlo.', '¿Cuándo es tu cumple?'),
  K('japon,sushi,maki,ramen,comida favorita,que comes,comer', 'Mi comida favorita es la japonesa. Los makis son mi felicidad.', '¿Y las frutas?,¿Postres?,¿Starbucks?'),
  K('starbucks,frapp,bebida,que tomas,chocolate cream', 'Chocolate Cream Frappuccino. Sin discusión.', '¿Comida favorita?'),
  K('fruta,manzana,platano,fresa', 'Odio las frutas. Todas. No las soporto y jamás me hagas comer ninguna.', '¿Y qué sí comes?'),
  K('play doh,playdoh,plastilina,secreto', 'Ya lo viste: me encanta comer Play-Doh. No me juzgues 😌', '¿Tienes más secretos?'),
  K('postre,hornear,torta,galleta,brownie,cocin,pastel', 'Hago postres de todo tipo, bastantes. Cocinar salado no es lo mío, pero un postre sí.', '¿Comida favorita?'),
  K('primer anime,primeros animes,glitter,empezaste', 'Mis primeros animes fueron Pokémon y Glitter Force.', '¿Cuántos animes has visto?,¿Último anime?'),
  K('ultimo anime,black clover,reciente,que viste', 'Lo último que vi fue la nueva temporada de Black Clover.', '¿Cuál te destrozó?'),
  K('destroz,edgerunner,cyberpunk,lloraste,triste', 'Cyberpunk: Edgerunners me destrozó. Todavía no me recupero.', '¿Anime favorito?'),
  K('anime favorito,que anime,animes,200', 'No tengo un favorito porque me gustan muchísimos. He visto unos 200, unos mejores que otros. Evangelion es de mis favoritos, y leo más manga de lo que veo anime.', '¿Primer anime?,¿Último anime?,¿Manga favorito?'),
  K('evangelion,asuka,azula,parezco,te pareces', 'Aunque quiero ser como Zuko, me parezco más a Azula y a Asuka (de Evangelion).', '¿Quién te inspira?'),
  K('inspir,zuko,senku,edward', 'Mi mayor inspiración es Zuko. También me inspiran Senku y Edward.', '¿Con quién te pareces?'),
  K('manga,manhwa,love is,leer,lectura', 'Me gusta más leer manga que ver anime. Mi manhwa favorito es Love Is an Illusion.', '¿Anime favorito?'),
  K('pokemon,espeon,hoopa,xyz', 'Amo Pokémon. Mi temporada favorita es XYZ y mis pokémon favoritos son Espeon y Hoopa.', '¿Primer anime?,¿Marvel?'),
  K('marvel,tony,hawkeye,avenger,pelis', 'Me he visto mil veces las películas de Marvel. Mis personajes favoritos son Hawkeye y Tony.', '¿Star Wars?'),
  K('star wars,starwars,r2,anakin,sith,jedi', 'Mi trilogía favorita es la de Anakin (la segunda en estreno, la primera cronológicamente). Mi película favorita es la 3 y mi personaje favorito es R2-D2.', '¿Harry Potter?'),
  K('harry,potter,ravenclaw,patronus,lobo,hogwarts,libros', 'Tengo todos los libros de Harry Potter. Soy Ravenclaw y mi patronus es un lobo.', '¿Hamilton?'),
  K('kpop,k-pop,newjeans,new jeans', 'Mi grupo favorito de K-pop es NewJeans.', '¿Qué música escuchas?'),
  K('hamilton,eliza,burr,musical', 'Hamilton es el único musical que me gusta de verdad. Mi personaje favorito es Eliza, pero según un test de personalidad me parezco a Hamilton. Qué ironía.', '¿Cómo eres?,¿Qué música escuchas?'),
  K('musica,playlist,escuchas,soundtrack,cancion', 'En mi playlist entra de todo: openings de anime, pop, rock, lo-fi, k-pop y música instrumental para concentrarme cuando programo o escribo para MUN.', '¿Canción de anime favorita?'),
  K('dan dan,kokoro,cancion de anime', 'Mi canción de anime favorita es Dan Dan Kokoro Hikareteku (Mi corazón encantado), por su mensaje.', '¿Qué música escuchas?'),
  K('mun,debate,naciones unidas,delegad', 'En MUN me encanta defender la postura de distintos países en comités exigentes. He aprendido a investigar, negociar, escribir resoluciones y hablar con seguridad.', '¿Qué premios tienes?,¿Qué es el martillo?'),
  K('premio,diploma,outstanding,honorable,verbal,position paper,ganaste', 'En MUN tengo un Outstanding Delegate, dos Honorable Mention, un Best Position Paper y una Verbal Mention.', '¿Qué es el martillo?'),
  K('martillo,best delegate,mejor delegada', 'El martillo es el premio de Best Delegate. Es el que me falta y voy por él.', '¿Y tus otros premios?'),
  K('natacion,nadar,nado,medalla,federacion,piscina', 'La natación es el deporte con el que más medallas tengo. Competí en la Federación Nacional de Deportes Acuáticos. Odio perder, así que un deporte individual me vuelve demasiado competitiva.', '¿Qué estilo odias?,¿Y la gimnasia?'),
  K('pecho,estilo', 'El estilo pecho lo odio. Siempre lo he odiado.', '¿Natación?'),
  K('gimnasia,gimnasta', 'Fui gimnasta y era muy buena. Para mí fue un sueño frustrado porque lo disfrutaba demasiado, pero ahí quedó.', '¿Hacías ballet?'),
  K('ballet,bailar', 'De pequeña hacía ballet y lo disfrutaba mucho.', '¿Gimnasia?'),
  K('deporte', 'Me encantan los deportes. La natación es mi favorita, pero también hice gimnasia y ballet, y me gustan casi todos.', '¿Natación?,¿Gimnasia?'),
  K('piano,flauta,instrumento,recital', 'Toco dos instrumentos: flauta dulce y piano. Hace mucho que no doy recitales, pero antes me encantaba.', '¿Actuabas?'),
  K('teatro,actu,obra,protagonic', 'En mi anterior colegio actuaba y en varias obras tuve el papel protagónico. Fue hace mucho tiempo, pero lo recuerdo con cariño.', '¿Tocas algún instrumento?'),
  K('dibuj,arte,pintar', 'Dibujo de vez en cuando. En la sección de arte están algunos de mis dibujos.', '¿Qué más haces?'),
  K('idioma,hablas,lengua', 'Inglés (voy a rendir el C1), francés (tengo el B1) y japonés, que recién lo estoy aprendiendo.', '¿Inglés?,¿Francés?,¿Japonés?'),
  K('ingles,english,c1', 'Estoy preparándome para dar mi examen C1 de inglés.', '¿Qué idiomas hablas?'),
  K('frances,b1', 'Tengo el B1 de francés.', '¿Qué idiomas hablas?'),
  K('japones,hiragana', 'Estoy empezando a aprender japonés. Lo hago por el anime y porque me fascina el idioma.', '¿Qué idiomas hablas?'),
  K('estudiar,carrera,bioquimica,biologia,universidad,que quieres ser,estudiaras,futuro', 'Quiero estudiar Bioquímica o Ciencias Biológicas, y de preferencia en el extranjero. La Universidad de Alberta me fascina, aunque todavía no estoy segura.', '¿Por qué en el extranjero?,¿Qué proyectos has hecho?'),
  K('extranjero,alberta,canada,irte,vivir fuera', 'Quiero vivir en otro país, adaptarme a una nueva cultura, poner a prueba mis idiomas en el mundo real y demostrarme de todo lo que soy capaz por mi cuenta.', '¿Qué quieres estudiar?'),
  K('proyecto,stem,ciencia,cientific,feria', 'He hecho cuatro proyectos grandes: una lámina de suero con centella asiática (1.er puesto), IntiCrisp (ganadores nacionales), unos prototipos piezoeléctricos (2.º puesto) y la Rosalind Franklin Academy of Science.', '¿Y la lámina de suero?,¿Qué es IntiCrisp?'),
  K('centella,lamina,suero,piel,cicatriz', 'Mi lámina de suero bio-regenerativa lleva centella asiática, que ayuda a cicatrizar y regenerar la piel. Con ella gané el primer puesto en Innovation in Science and Technology 2026.', '¿Qué es IntiCrisp?'),
  K('inticrisp,snack,compartamos,emprendimiento,cheque,2500', 'IntiCrisp es un snack nutricional con superalimentos peruanos. Ganamos el concurso nacional de Compartamos Impulsa y recibimos un fondo semilla de S/ 2,500. Yo era la líder del equipo.', '¿Qué otros proyectos tienes?'),
  K('piezo,circuito,led,energia,soldar', 'Construí un sistema con discos piezoeléctricos que convierte presión en electricidad para prender LEDs. Gané el 2.º puesto en la Science Exhibition 2025.', '¿Qué otros proyectos tienes?'),
  K('rosalind,cayetano,beca,academia', 'En 2022 me becaron para la Rosalind Franklin Academy of Science. Fue mi primera inmersión real en investigación y me convenció de que esto es lo mío.', '¿Qué quieres estudiar?'),
  K('cumple,cumpleanos,nacimiento,nacio,edad,años tienes', 'Cumplo el 8 de febrero, el mismo día que Byul y Tomioka. Nací en 2012.', '¿Por qué naranja?'),
  K('erizo,mascota,animal,stitch,pincho', 'Tengo un erizo y se llama Stitch 🦔 Es pequeño, pincha un poquito y es lo más lindo del mundo.', '¿Y tu mejor amiga?,¿Cómo eres?'),
  K('mejor amiga,amiga,bestie', 'La conozco desde los 2 años. Nuestras mamás ya se conocían, pero nadie sabía que nos íbamos a encontrar en el cole. Ahora está en Estados Unidos, la extraño un montón y viene el 16 de noviembre.', '¿Cómo eres?'),
  K('como eres,personalidad,defin,palabra,competitiv,ego,insegur,fracaso,perder', 'Competitiva. Parezco tener mucho ego, pero en el fondo soy bastante insegura, y eso es porque odio fracasar. Me exijo muchísimo.', '¿Y tu espacio personal?'),
  K('confianza,espacio personal,abrirte,timid,amigos,rara', 'Cuido muchísimo mi espacio personal. No le doy mi confianza a cualquiera y me toma tiempo abrirme. Pero cuando lo hago, me entrego al 100%.', '¿Cómo eres?'),
  K('indispensable,bolso,mochila,llevas,salir,chin chin,nivea,llavero,airpod', 'Mis indispensables para salir: Chin Chin, mi Nivea, un llavero antiestrés, mis AirPods y mi celular. Están en la ventana del costado 🎒', '¿Y tus gustos?'),
  K('quote,frase,cita', 'Mi favorita es la de Asta: "Surpass your limits! Right here, right now!" Hay muchas más en la sección de Quotes.', '¿Anime favorito?'),
  K('juego,jugar,minijuego,aburrid', 'Hay minijuegos en el costado izquierdo: memoria y burbujas. ¡Intenta superar mi récord!', '¿Qué más hay?'),
  K('chiste', '¿Por qué no confío en los átomos? Porque lo componen todo 😌', '¿Otro dato?'),
  K('dato curioso,curios', 'Cumplo años el mismo día que Byul y Tomioka, y odio todas las frutas.', '¿Otro dato?'),
  K('gracias,genial,lindo,bonito,me encanta,increible', '¡Gracias! 💛 Me encantó hablar contigo.', '¿Qué sabes de mí?'),
  K('adios,chao,nos vemos,bye', '¡Chao! Gracias por visitar mi mundo ✦', ''),
  K('ayuda,que sabes,que puedo preguntar,de que hablas,que mas', 'Pregúntame por mis gustos, anime, Marvel, Star Wars, Harry Potter, MUN, natación, idiomas, proyectos, mi carrera, mi erizo o mi mejor amiga.', '¿Anime favorito?,¿Y MUN?,¿Qué estudiarás?')
];
KB.push(
  K('conferencia,sfc,cambridge,snj,who,comite,organizacion mundial', 'Mis premios fueron en 2026 y en el comité WHO (la Organización Mundial de la Salud): Outstanding Delegate en SFC MUN, y mis dos Honorable Mention en Cambridge College y SNJ.', '¿Y el martillo?,¿Qué aprendiste en MUN?'),
  K('galleta,suerte,fortuna', 'Hay una galleta de la suerte en la ventana del costado izquierdo 🥠 Rómpela y te cuento tu futuro.', '¿Qué juegos hay?'),
  K('libro de visitas,firmar,mensaje', 'Puedes dejarme un mensaje en el libro de visitas del costado 📖', '¿Qué juegos hay?'),
  K('snoopy,boton,decoracion,cookie,galletas', 'Me encantan las cosas decorativas: botones, galletas, Snoopy… están por toda la página como stickers.', '¿Y tus indispensables?'),
  K('polera,camiseta,this girl', 'Tengo una polera que dice “This girl needs NewJeans”. Es mi grupo favorito.', '¿Qué música escuchas?'),
  K('regalo,carta,cartita', 'Soy de las que guardan cartitas. Hay una en mi kit de indispensables 💌', '¿Y tus indispensables?'),
  K('te quiero,te amo,eres genial', '¡Ay! Gracias 🥹 Yo también te quiero (en modo chatbot).', '¿Qué sabes de mí?'),
  K('aburrid,nada que hacer', 'Prueba los minijuegos del costado: memoria, burbujas, Simón, 3 en raya y escribir rápido. O toca el piano 🎹', '¿Qué juegos hay?'),
  K('nombre del bot,como me llamo', 'No sé cómo te llamas todavía. Dime: “me llamo …” y te recuerdo.', '¿Cómo eres?')
);
KB.find(e => e.k.includes('competitiv')).s = 'ce9a10c66913860ae18a5c99103a726a-removebg-preview';
KB.find(e => e.k.includes('erizo')).s = 'erizo';
KB.find(e => e.k.includes('sushi')).s = 'makis';
KB.find(e => e.k.includes('starbucks')).s = 'starbucks';
KB.find(e => e.k.includes('fruta')).s = 'stikcer-removebg-preview';
const q1 = () => shortQ[Math.random() * shortQ.length | 0];
KB.push(
  Object.assign(K('como estas,como andas,como te va,que tal estas,como te sientes,que tal tu dia,como amaneciste', '¡Muy bien! Aquí, esperando que alguien me escriba 😌 ¿Y tú, cómo estás?|Bien, con ganas de conversar 💛 ¿Y tú, cómo vas?', '¿Qué haces?,¿Cómo eres?'), {exp: 'mood'}),
  K('que haces,que estas haciendo,en que andas,que cuentas', 'Aquí, charlando contigo 😊 y pensando qué anime ver después. ¿Y tú?', '¿Cuéntame algo?,¿Anime favorito?'),
  K('cuentame algo,dime algo,hablame de ti,hablame,cuentame de ti', 'Te cuento algo: odio perder, amo la natación y no soporto ninguna fruta. ¿Quieres saber más de algo?', '¿Cómo eres?,¿Natación?,¿Qué comes?'),
  K('recomienda anime,recomiendame un anime,que anime veo,que anime me recomiendas,que anime ver', 'Black Clover si quieres acción y motivación, Cyberpunk: Edgerunners si quieres llorar, y Evangelion si quieres pensar. Y para leer: el manhwa Love Is an Illusion.', '¿Anime favorito?,¿Manga favorito?'),
  K('recomienda pelicula,recomiendame una peli,que peli veo,que pelicula veo', 'Star Wars: La venganza de los Sith (la 3), o una maratón de Marvel con Hawkeye y Tony 🍿', '¿Marvel?,¿Star Wars?'),
  K('recomienda cancion,recomiendame una cancion,que escucho,recomienda musica', 'Dan Dan Kokoro Hikareteku (Mi corazón encantado), el opening de Evangelion o algo de NewJeans 🎧', '¿Qué música escuchas?'),
  Object.assign(K('motivame,animo,consejo,dame un consejo,estoy triste,necesito animo,estoy mal', 'Ven, un abrazo grande 🫂 Algo que me ayuda a mí es esto:', '/quote,/chiste,/juego'), {q: 1}),
  K('ok,vale,listo,entiendo,dale,perfecto', 'Perfecto 😊 ¿Quieres saber algo más?', ''),
  K('jaja,jeje,jiji,xd,lol,jajaja,jsjs', '😂 ¿Qué pasó? Cuéntame.', ''),
  K('tienes novio,tu novio,enamorada,pareja,novio', 'Eso es secreto 😌… pero mira bien el collage del inicio 💗', '¿Qué más hay en la página?'),
  K('bonita,linda,guapa,hermosa,divina,preciosa', '¡Gracias! 🥹💛 Tú también.', ''),
  K('tonta,fea,mala,odio esto', 'Auch 🥲 …pero igual te quiero. ¿Jugamos algo para animarte?', '/juego,/chiste'),
  K('quien te hizo,quien te creo,quien te programo', 'Me hizo Daniela: las respuestas son suyas y yo las busco cuando me preguntas.', '¿Qué sabes de mí?'),
  K('donde vives,de donde eres,pais,peruana', 'Soy peruana 🧡 y sueño con estudiar en el extranjero.', '¿Qué estudiarás?'),
  K('hobby,pasatiempo,que te gusta hacer,tiempo libre,que haces en tu tiempo', 'Me gusta leer manga, ver anime, nadar, hacer postres, programar y debatir en MUN 😄', '¿Anime favorito?,¿Y MUN?'),
  K('buenas noches,a dormir,hasta manana', '¡Buenas noches! 🌙 Que sueñes bonito.', ''),
  K('si,no,tal vez,quizas', 'Cuéntame más 😊 ¿Quieres preguntarme algo?', '')
);
const MORE = {carrera: 'Me gusta cómo la química y la biología explican cómo funciona la vida. Mis proyectos (la centella, los snacks, la energía piezoeléctrica) van por ahí.', natacion: 'Nadar me obliga a competir contra mí misma: cada segundo cuenta y no hay equipo que te salve.', mun: 'En MUN lo que más disfruto es negociar con otros países en un comité difícil y salir con una resolución.'};
const TOPICS = {'Gustos': ['¿Anime favorito?', '¿Qué comes?', '¿Qué pokémon?', '¿Marvel?', '¿Star Wars?', '¿Harry Potter?', '¿Hamilton?', '¿K-pop?'], 'MUN': ['¿Y MUN?', '¿Qué premios tienes?', '¿Qué conferencias?', '¿Qué es el martillo?'],
  'STEM': ['¿Tus proyectos?', '¿Qué es IntiCrisp?', '¿Y la lámina de suero?', '¿Qué estudiarás?'], 'Deportes': ['¿Natación?', '¿Gimnasia?', '¿Qué estilo odias?', '¿Ballet?'], 'Idiomas': ['¿Qué idiomas hablas?', '¿Inglés?', '¿Francés?', '¿Japonés?'],
  'Mi amiga': ['¿Tu mejor amiga?', '¿Cuándo llega?'], 'Tú': ['¿Cómo eres?', '¿Tu cumple?', '¿Tu color favorito?', '¿Tu erizo?', '¿Tus indispensables?'], 'Extras': ['/quote', '/dato', '/chiste', '/juego', '/ayuda']};
const DEF = ['¿Cómo eres?', '¿Qué estudiarás?', '¿Anime favorito?', '¿Y MUN?', '¿Tu mejor amiga?'];
const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/(.)\1{2,}/g, '$1').replace(/[¿?¡!.,;:()"“”]/g, ' ').replace(/\s+/g, ' ').trim();
function lev(a, b) { const d = Array.from({length: b.length + 1}, (_, j) => j); for (let i = 1; i <= a.length; i++) { let p = d[0]; d[0] = i; for (let j = 1; j <= b.length; j++) { const t = d[j]; d[j] = Math.min(d[j] + 1, d[j - 1] + 1, p + (a[i - 1] === b[j - 1] ? 0 : 1)); p = t; } } return d[b.length]; }
const msgs = $('#msgs'), cx = {name: null, last: null, n: 0};
const clock = () => new Date().toTimeString().slice(0, 5);
function add(t, who, sticker) {
  const m = document.createElement('div'); m.className = 'msg ' + who; const s = document.createElement('span'); s.textContent = t; m.append(s);
  if (sticker) { const im = new Image(); im.src = sticker; im.className = 'st'; m.append(im); }
  const sm = document.createElement('small'); sm.textContent = clock(); m.append(sm);
  if (who === 'bot') { const r = document.createElement('button'); r.className = 're'; r.textContent = '❤'; r.onclick = () => { r.classList.toggle('on'); blip(990, .1, 'triangle', .05); }; m.append(r); }
  msgs.append(m); msgs.scrollTop = msgs.scrollHeight; return m;
}
function chips(list) { const s = $('#sugg'); s.innerHTML = ''; list.slice(0, 6).forEach(q => { const b = document.createElement('button'); b.type = 'button'; b.textContent = q; b.onclick = () => askBot(q); s.append(b); }); }
function botSay(t, next, stickerName) {
  const m = document.createElement('div'); m.className = 'msg bot'; m.innerHTML = '<span class="dots"><i></i><i></i><i></i></span>'; msgs.append(m); msgs.scrollTop = msgs.scrollHeight; $('#cstat').textContent = 'escribiendo…';
  setTimeout(async () => { m.remove(); const u = stickerName ? await probeImg(stickerName) : null; add(t, 'bot', u); $('#cstat').textContent = 'en línea'; blip(880, .08, 'triangle', .03); chips(next && next.length ? next : DEF); }, 450 + Math.min(t.length * 7, 900));
}
function hit(n, toks, k) { if (k.includes(' ')) return n.includes(k); return toks.some(t => t === k || (k.length >= 5 && t.length >= 4 && (t.startsWith(k) || (t.length >= 5 && k.startsWith(t)))) || (k.length >= 5 && t.length >= 4 && lev(t, k) <= 1)); }
function command(q) {
  const c = q.trim().toLowerCase();
  if (c === '/ayuda') return botSay('Puedes preguntarme por mis gustos, MUN, STEM, idiomas, deportes, mi mejor amiga, mi erizo… Comandos: /quote, /dato, /chiste, /juego, /limpiar. Y si me dices “me llamo …”, me acuerdo de ti.', DEF), true;
  if (c === '/quote') { const x = shortQ[Math.random() * shortQ.length | 0]; return botSay(`“${x[0]}” — ${x[1]}`, ['/quote', '/dato']), true; }
  if (c === '/dato') return botSay(FACTS[Math.random() * FACTS.length | 0], ['/dato', '/chiste']), true;
  if (c === '/chiste') return botSay(['¿Por qué no confío en los átomos? Porque lo componen todo 😌', '¿Qué le dice una enzima a otra? “Qué buena catálisis tienes.”', '¿Cómo se llama un erizo que hace postres? Un pincho-pastelero 🦔'][Math.random() * 3 | 0], ['/chiste', '/dato']), true;
  if (c === '/juego') { $('[data-win=w-games]').click(); return botSay('Te abrí los minijuegos 🎮', DEF), true; }
  if (c === '/limpiar') { msgs.innerHTML = ''; return botSay('Listo, conversación limpia ✨', DEF), true; }
  return false;
}
const GREET = /^(h?o+l+a+h*|hol+i+s*|ola+h*|hey+|hello+|hi+|wenas|buenas|saludos|alo+|holiwis)$/;
function askBot(q) {
  if (!q.trim()) return; add(q, 'me'); cx.n++;
  if (command(q)) return;
  const nm = q.match(/(?:me llamo|mi nombre es|soy)\s+([a-záéíóúñü]{2,15})/i);
  if (nm && !/competitiv|daniela|peruana/i.test(nm[1])) { cx.name = nm[1][0].toUpperCase() + nm[1].slice(1); return botSay(`¡Mucho gusto, ${cx.name}! 💛 ¿Qué quieres saber de mí?`, DEF); }
  const n = norm(q), toks = n.split(' ').filter(Boolean), ex = cx.name ? ', ' + cx.name : '';
  if (toks.length <= 3 && toks.some(t => GREET.test(t))) { cx.expect = 'mood'; const h = new Date().getHours(); return botSay([`¡Holaaa${ex}! 💛 Qué lindo que escribas. ¿Cómo estás?`, `¡Hola${ex}! 🧡 Soy la versión chatbot de Daniela. ¿Cómo va tu ${h < 12 ? 'mañana' : h < 19 ? 'tarde' : 'noche'}?`, `¡Holi${ex}! ✨ ¿Qué tal tu día?`][Math.random() * 3 | 0], DEF); }
  if (/buenos dias|buen dia/.test(n)) { cx.expect = 'mood'; return botSay(`¡Buenos días${ex}! ☀️ ¿Cómo amaneciste?`, DEF); }
  if (/buenas tardes/.test(n)) { cx.expect = 'mood'; return botSay(`¡Buenas tardes${ex}! 🍊 ¿Cómo va tu día?`, DEF); }
  if (cx.expect === 'mood') {
    cx.expect = null;
    if (/\b(mal|triste|cansad[oa]|estresad[oa]|agobiad[oa]|aburrid[oa]|ansios[oa]|fatal|regular|deprimid[oa])\b/.test(n)) { const x = q1(); return botSay(`Uy, lo siento 🥺 Un abrazo grande. Algo que me ayuda a mí: “${x[0]}” — ${x[1].split(',')[0]}. Y si quieres distraerte, prueba los minijuegos 🎮`, ['/juego', '/chiste', '/quote']); }
    if (/\b(bien|genial|feliz|contenta?|excelente|super|chevere|bacan|de maravilla|emocionad[oa]|muy bien)\b/.test(n)) return botSay('¡Qué bueno! Me alegra un montón 💛 ¿Qué quieres saber de mí?', DEF);
  }
  if (/^(y eso|por que|y por que|como asi|cuentame mas|mas|mas info|dime mas|sigue)$/.test(n) && cx.last) {
    const extra = Object.entries(MORE).find(([k]) => cx.last.k.some(w => w.includes(k)))?.[1];
    return botSay(extra || 'Eso es lo que te puedo contar por ahora. Pregúntame algo relacionado y sigo 💛', cx.last.n);
  }
  let best = null, sc = 0;
  KB.forEach(e => { let s = 0, hits = 0; e.k.forEach(k => { if (hit(n, toks, k)) { s += k.length; hits++; } }); s += hits > 1 ? hits * 2 : 0; if (e === cx.last) s -= 1; if (s > sc) { sc = s; best = e; } });
  if (!best) return botSay((cx.name ? cx.name + ', ' : '') + 'eso no me lo sé responder todavía 🥲 Pero pregúntame por mis gustos, MUN, STEM, idiomas, mi erizo o mi mejor amiga. O escribe /ayuda.', DEF);
  cx.last = best; if (best.exp) cx.expect = best.exp; let ans = best.a[Math.random() * best.a.length | 0];
  if (best.k.includes('hola') && cx.name) ans = `¡Hola de nuevo, ${cx.name}! 💛`;
  if (best.q) { const x = q1(); ans += ` “${x[0]}” — ${x[1].split(',')[0]}`; }
  botSay(ans, best.n, best.s);
}
$('#chatform').onsubmit = e => { e.preventDefault(); const i = $('#chatin'); askBot(i.value); i.value = ''; };
$('#cclear').onclick = () => command('/limpiar');
Object.keys(TOPICS).forEach((t, k) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = t; b.onclick = () => { $$('#topics button').forEach(x => x.classList.toggle('on', x === b)); chips(TOPICS[t]); blip(500 + k * 60, .1, 'triangle', .05); }; $('#topics').append(b); });
chips(DEF);
try { if (localStorage.getItem(KEY)) unlock(); } catch (e) {}
 
/* ================= Video de gimnasia ================= */
$$('video[data-vid]').forEach(v => probeAny(v.dataset.vid.split('|'), probeVid).then(u => u ? v.src = u : v.closest('.tv')?.remove()));
/* ================= Datos curiosos: la carta ================= */
const lf = $('#lfacts'), env = $('#env');
function renderFacts() { lf.innerHTML = ''; FACTS.slice().sort(() => Math.random() - .5).slice(0, 4).forEach((t, i) => { const li = document.createElement('li'); li.textContent = t; li.style.animationDelay = i * .18 + 's'; lf.append(li); }); }
function toggleEnv() { env.classList.toggle('open'); const o = env.classList.contains('open'); $('#openEnv').textContent = o ? 'Cerrar carta' : 'Abrir carta'; blip(o ? 660 : 440, .25, 'triangle', .07); if (o) blip(880, .2, 'triangle', .05, .15); }
renderFacts(); $('#openEnv').onclick = toggleEnv; $('#seal').onclick = toggleEnv;
$('#nextFact').onclick = () => { if (!env.classList.contains('open')) toggleEnv(); renderFacts(); blip(880, .1, 'triangle', .05); };
/* ================= Volver a bloquear Siglo Perdido ================= */
$('#relock').onclick = () => { try { localStorage.removeItem(KEY); } catch (e) {} $('#secret').hidden = true; $('#locked').hidden = false; $('#quiz').hidden = true; $('#dockChat').hidden = true; blip(300, .2, 'square', .06); };
 

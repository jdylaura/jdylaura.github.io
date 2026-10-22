/* Núcleo de la app: almacenamiento, progreso, láminas con repaso espaciado, misión diaria,
   racha, logros, sonido y el espejo de datos para los avisos. Todo se guarda en el celular. */
var APP = window.APP || (window.APP = {});

(function () {
  "use strict";
  var D = APP.data;

  /* ---------------- Configuración ---------------- */
  APP.cfg = APP.cfg || {
    nombre: "Pilas",            // provisional: lo eligen Laura y Juan David
    nombreProvisional: true,
    version: D.version,
    vapid: ""                   // llave pública de avisos; se carga cuando se activen
  };

  /* ---------------- Utilidades ---------------- */
  var U = APP.u = {};
  U.esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  U.pad = function (n) { return (n < 10 ? "0" : "") + n; };
  U.ymd = function (d) { d = d || new Date(); return d.getFullYear() + "-" + U.pad(d.getMonth() + 1) + "-" + U.pad(d.getDate()); };
  U.today = function () { return U.ymd(new Date()); };
  U.parse = function (s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); };
  U.addDays = function (s, n) { var d = U.parse(s); d.setDate(d.getDate() + n); return U.ymd(d); };
  U.diffDays = function (a, b) { return Math.round((U.parse(b) - U.parse(a)) / 86400000); };
  var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  U.fecha = function (d) { return DIAS[d.getDay()] + " " + d.getDate() + " de " + MESES[d.getMonth()]; };
  U.mmss = function (s) { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ":" + U.pad(s % 60); };
  U.rnd = function () { return (Math.random() * 4294967295) >>> 0; };
  U.shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  U.pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };
  U.clamp = function (x, a, b) { return Math.max(a, Math.min(b, x)); };
  U.hora = function () { return new Date().getHours(); };

  /* ---------------- Almacenamiento ---------------- */
  var KEY = "entrenamiento.v1";
  var mem = null;
  function blank() { return { activo: null, perfiles: {}, nombreVotos: {}, instalado: false }; }
  APP.store = {
    load: function () {
      if (mem) return mem;
      try { var raw = localStorage.getItem(KEY); mem = raw ? JSON.parse(raw) : blank(); } catch (e) { mem = blank(); }
      if (!mem.perfiles) mem = blank();
      return mem;
    },
    save: function () {
      try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) { /* sin almacenamiento */ }
      APP.mirror();
    },
    raw: function () { return APP.store.load(); },
    replace: function (obj) { mem = obj; APP.store.save(); }
  };
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) {}

  function nuevoPerfil(who) {
    return {
      v: 1, who: who, proyecto: "dian2676", temas: { "m06-1": true, "m06-2": true, "m06-3": true, comp: true, integ: true },
      meta: 15, sonido: true, creado: new Date().toISOString(),
      xp: 0, racha: { n: 0, ult: null, comodines: 0, max: 0 }, dias: {},
      lam: {}, esc: {}, fam: {}, sub: {}, sim: { intentos: [], vistos: {}, fallados: {} }, af: {},
      logros: {}, mision: null, records: { contrarreloj: 0 }, duelos: [], modoRetro: "final", onboard: false
    };
  }
  APP.perfil = function () {
    var s = APP.store.load();
    if (!s.activo || !s.perfiles[s.activo]) return null;
    return s.perfiles[s.activo];
  };
  APP.setPerfil = function (who) {
    var s = APP.store.load();
    if (!s.perfiles[who]) s.perfiles[who] = nuevoPerfil(who);
    s.activo = who;
    APP.store.save();
    return s.perfiles[who];
  };
  APP.usuario = function () { var p = APP.perfil(); return p ? D.usuarios[p.who] : null; };
  APP.proyecto = function () { return D.proyectos[0]; };

  /* ---------------- Días y XP ---------------- */
  function dia(p) { var t = U.today(); if (!p.dias[t]) p.dias[t] = { xp: 0, items: 0, ok: 0, seg: 0, mision: false }; return p.dias[t]; }
  APP.nivel = function (xp) {
    var L = D.niveles, i = 0;
    while (i + 1 < L.length && xp >= L[i + 1].xp) i++;
    var cur = L[i], next = L[i + 1] || null;
    return { i: i, nombre: cur.nombre, base: cur.xp, next: next ? next.xp : null, nextNombre: next ? next.nombre : null,
      pct: next ? (xp - cur.xp) / (next.xp - cur.xp) : 1 };
  };
  APP.addXP = function (n) {
    var p = APP.perfil(); if (!p || !n) return { levelUp: false };
    var before = APP.nivel(p.xp).i;
    p.xp += n; dia(p).xp += n;
    var after = APP.nivel(p.xp).i;
    APP.store.save();
    return { levelUp: after > before, nivel: APP.nivel(p.xp) };
  };

  /* ---------------- Láminas con repaso espaciado ----------------
     Niveles: 0 bloqueada · 1 obtenida · 2 brillante · 3 dorada.
     Sube un nivel con un acierto en un día distinto y ya vencido; baja uno con un error. */
  var GAP = { 1: 1, 2: 2, 3: 5 };
  APP.lam = {
    get: function (id) { var p = APP.perfil(); return (p && p.lam[id]) || { lv: 0 }; },
    unlock: function (id) {
      var p = APP.perfil(); if (!p) return false;
      var L = p.lam[id];
      if (L && L.lv >= 1) return false;
      p.lam[id] = { lv: 1, due: U.addDays(U.today(), 1), ok: 0, ko: 0, last: U.today(), t: new Date().toISOString() };
      APP.store.save();
      return true;
    },
    hit: function (id, ok) {
      var p = APP.perfil(); if (!p) return null;
      var L = p.lam[id];
      if (!L || L.lv < 1) return null; // solo cuentan las ya obtenidas
      var t = U.today(), prev = L.lv;
      if (ok) {
        L.ok++;
        if (L.lv < 3 && t >= L.due && t !== L.last) { L.lv++; L.last = t; L.due = U.addDays(t, GAP[L.lv] || 7); }
        else if (L.lv === 3 && t >= L.due) { L.last = t; L.due = U.addDays(t, 7); }
      } else {
        L.ko++;
        if (L.lv > 1) L.lv--;
        L.due = t; L.last = t;
      }
      return { id: id, from: prev, to: L.lv };
    },
    vencidas: function () {
      var p = APP.perfil(); if (!p) return [];
      var t = U.today();
      return Object.keys(p.lam).filter(function (k) { var L = p.lam[k]; return L.lv >= 1 && L.due <= t; });
    },
    conteo: function (pagina) {
      var p = APP.perfil(); var ls = D.laminas.filter(function (l) { return !pagina || l.pag === pagina; });
      ls = ls.filter(APP.lamVisible);
      var c = { total: ls.length, obt: 0, bri: 0, dor: 0 };
      ls.forEach(function (l) { var lv = (p && p.lam[l.id] && p.lam[l.id].lv) || 0; if (lv >= 1) c.obt++; if (lv >= 2) c.bri++; if (lv >= 3) c.dor++; });
      return c;
    }
  };
  /* Las láminas de competencias solo se muestran si el indicador es del usuario. */
  APP.lamVisible = function (l) {
    if (!l.ind) return true;
    var u = APP.usuario(); return !u || u.indicadores.indexOf(l.ind) >= 0;
  };

  /* ---------------- Registro de respuestas ---------------- */
  APP.track = function (o) {
    // o: {sub, fam, ok, seg, lam:[], tipo}
    var p = APP.perfil(); if (!p) return [];
    var d = dia(p); d.items++; if (o.ok) d.ok++; d.seg += (o.seg || 0);
    if (o.sub) {
      var s = p.sub[o.sub] || (p.sub[o.sub] = { ok: 0, ko: 0, h: [] });
      if (o.ok) s.ok++; else s.ko++;
      s.h.push(o.ok ? 1 : 0); if (s.h.length > 16) s.h.shift();
    }
    if (o.fam) {
      var f = p.fam[o.fam] || (p.fam[o.fam] = { ok: 0, ko: 0, h: [], lvl: 1 });
      if (o.ok) f.ok++; else f.ko++;
      f.h.push(o.ok ? 1 : 0); if (f.h.length > 12) f.h.shift();
      var recent = f.h.slice(-6), acc = recent.reduce(function (a, b) { return a + b; }, 0) / recent.length;
      if (recent.length >= 4) f.lvl = acc >= 0.84 ? Math.min(3, f.lvl + (f.lvl < 3 && f.h.length % 3 === 0 ? 1 : 0)) : (acc < 0.5 ? Math.max(1, f.lvl - 1) : f.lvl);
    }
    var cambios = [];
    (o.lam || []).forEach(function (id) { var r = APP.lam.hit(id, o.ok); if (r && r.to !== r.from) cambios.push(r); });
    APP.store.save();
    return cambios;
  };
  APP.famLvl = function (fam) { var p = APP.perfil(); return (p && p.fam[fam] && p.fam[fam].lvl) || 1; };

  /* ---------------- Dominio por subtema ---------------- */
  APP.dominio = function (sub) {
    var p = APP.perfil(); if (!p) return null;
    var ls = D.laminas.filter(function (l) { return l.sub === sub && APP.lamVisible(l); });
    var lamScore = null;
    if (ls.length) {
      var tot = 0, any = false;
      ls.forEach(function (l) { var lv = (p.lam[l.id] && p.lam[l.id].lv) || 0; if (lv) any = true; tot += lv; });
      lamScore = any ? tot / (3 * ls.length) : null;
    }
    var s = p.sub[sub], accScore = null;
    if (s && s.h.length >= 2) accScore = s.h.reduce(function (a, b) { return a + b; }, 0) / s.h.length;
    if (lamScore == null && accScore == null) return null;
    if (lamScore == null) return accScore;
    if (accScore == null) return lamScore * 0.8;
    return 0.4 * lamScore + 0.6 * accScore;
  };

  /* ---------------- Racha ---------------- */
  APP.racha = {
    revisar: function () {
      var p = APP.perfil(); if (!p) return;
      var r = p.racha, t = U.today();
      if (!r.ult) return;
      var gap = U.diffDays(r.ult, t);
      if (gap <= 1) return;
      var faltan = gap - 1;
      if (faltan <= r.comodines) { r.comodines -= faltan; r.ult = U.addDays(t, -1); r.usado = t; }
      else { r.n = 0; r.perdida = t; }
      APP.store.save();
    },
    completar: function () {
      var p = APP.perfil(); var r = p.racha, t = U.today();
      if (r.ult === t) return false;
      r.n = (r.ult && U.diffDays(r.ult, t) === 1) ? r.n + 1 : 1;
      r.ult = t; r.max = Math.max(r.max, r.n);
      if (r.n % 5 === 0 && r.comodines < 2) r.comodines++;
      APP.store.save();
      return true;
    },
    hoy: function () { var p = APP.perfil(); return p && p.racha.ult === U.today(); }
  };

  /* ---------------- Misión del día ---------------- */
  APP.mision = {
    hoy: function () {
      var p = APP.perfil(); var t = U.today();
      if (p.mision && p.mision.fecha === t) return p.mision;
      p.mision = APP.mision.crear();
      APP.store.save();
      return p.mision;
    },
    crear: function () {
      var p = APP.perfil(), pasos = [], T = p.temas;
      var func = T["m06-1"] || T["m06-2"] || T["m06-3"];
      var escena = APP.escenaSiguiente();
      var hayLam = Object.keys(p.lam).some(function (k) { return k.charAt(0) === "f" && p.lam[k].lv >= 1; });
      if (func) {
        if (hayLam && p.meta >= 15) pasos.push({ k: "repaso", t: "Calentamiento", d: "Seis casos para repasar lo que ya tienes", min: 2 });
        if (escena) pasos.push({ k: "escena", id: escena.id, t: "Escena nueva", d: escena.titulo, min: 2 });
        pasos.push({ k: "gemelos", t: "Gemelos", d: "Ocho casos en parejas: cambia un dato y cambia la respuesta", min: 4 });
        pasos.push({ k: "caso", t: "Reto del operador", d: "Dos casos con rodeos, como en la prueba: la figura no se nombra", min: 3 });
      }
      if (T.comp || T.integ) pasos.push({ k: "likert", t: "Tus afirmaciones", d: "Tres afirmaciones con marcado de competencias", min: 2 });
      if (p.meta >= 20 && func) pasos.push({ k: "reloj", t: "Contrarreloj", d: "Sesenta segundos: todos los casos que alcances", min: 1 });
      return { fecha: U.today(), pasos: pasos, hecho: pasos.map(function () { return false; }), cofre: false, seed: U.rnd() };
    },
    marcar: function (i) {
      var p = APP.perfil(), m = APP.mision.hoy();
      if (m.hecho[i]) return { completa: false };
      m.hecho[i] = true;
      var completa = m.hecho.every(Boolean);
      if (completa) { dia(p).mision = true; APP.racha.completar(); }
      APP.store.save();
      return { completa: completa };
    },
    restantes: function () { var m = APP.mision.hoy(); return m.hecho.filter(function (x) { return !x; }).length; }
  };
  APP.escenaSiguiente = function () {
    var p = APP.perfil(), T = p.temas;
    for (var i = 0; i < D.escenas.length; i++) {
      var e = D.escenas[i];
      if (!T[e.tema]) continue;
      if (!p.esc[e.id] || !p.esc[e.id].done) return e;
    }
    return null;
  };

  /* ---------------- Pesos para elegir familias de casos ---------------- */
  var PROBW = { alta: 3, media: 2, baja: 1 };
  APP.pesosFamilias = function (foco) {
    var p = APP.perfil(), w = {}, venc = APP.lam.vencidas();
    APP.gen.FAM_IDS.forEach(function (id) {
      var F = APP.gen.FAM[id], sub = D.subtemas[F.sub];
      if (!p.temas[sub.tema]) { w[id] = 0; return; }
      var base = PROBW[sub.prob] || 1;
      var f = p.fam[id], err = 0.5;
      if (f && f.h.length) err = 1 - f.h.reduce(function (a, b) { return a + b; }, 0) / f.h.length;
      var due = F.lam.filter(function (l) { return venc.indexOf(l) >= 0; }).length;
      w[id] = base * (0.6 + err * 1.6) + (foco === "repaso" ? due * 2.5 : due * 0.6);
      if (foco && foco.sub && F.sub !== foco.sub) w[id] *= 0.08;
    });
    // si todo quedó en cero (temas funcionales apagados), se permiten todas
    if (!Object.keys(w).some(function (k) { return w[k] > 0; })) APP.gen.FAM_IDS.forEach(function (k) { w[k] = 1; });
    return w;
  };

  /* ---------------- Logros ---------------- */
  APP.logrosDef = [
    { id: "primer-dia", t: "Primer día", d: "Completaste tu primera misión." },
    { id: "racha-3", t: "Tres seguidos", d: "Tres días seguidos de misión." },
    { id: "racha-7", t: "Una semana", d: "Siete días seguidos de misión." },
    { id: "racha-14", t: "Dos semanas", d: "Catorce días seguidos de misión." },
    { id: "perfecta", t: "Ráfaga perfecta", d: "Todos los casos de una ráfaga, sin un error." },
    { id: "combo-8", t: "Combo de ocho", d: "Ocho aciertos seguidos." },
    { id: "reloj-12", t: "Contra el reloj", d: "Doce o más casos en sesenta segundos." },
    { id: "pagina", t: "Página completa", d: "Todas las láminas de una página del álbum." },
    { id: "dorada", t: "Primera dorada", d: "Una lámina dominada en tres días distintos." },
    { id: "mapa", t: "Los tres mapas", d: "Todas las escenas vistas." },
    { id: "sim-func", t: "Juicio fino", d: "80 % o más en un simulacro funcional completo." },
    { id: "sim-comp", t: "Extremos de acero", d: "90 % o más de los puntos en un simulacro comportamental." },
    { id: "sim-integ", t: "Íntegro", d: "90 % o más de los puntos en un simulacro de integridad." },
    { id: "brujula", t: "Brújula fina", d: "Diez respuestas marcadas «Seguro» con nueve o más aciertos." },
    { id: "madrugador", t: "Madrugador", d: "Misión completa antes de las 7 de la mañana." },
    { id: "noche", t: "Turno de noche", d: "Misión completa después de las 10 de la noche." },
    { id: "duelo", t: "Duelo en casa", d: "Terminaste un duelo de pareja." }
  ];
  APP.logro = function (id) {
    var p = APP.perfil(); if (!p || p.logros[id]) return null;
    p.logros[id] = new Date().toISOString(); APP.store.save();
    var def = APP.logrosDef.filter(function (x) { return x.id === id; })[0];
    return def || null;
  };

  /* ---------------- Sonido y vibración ---------------- */
  var ctx = null;
  function ac() {
    if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { ctx = null; } }
    if (ctx && ctx.state === "suspended") { try { ctx.resume(); } catch (e) {} }
    return ctx;
  }
  function tone(f, t0, dur, type, vol, slide) {
    var c = ac(); if (!c) return;
    var o = c.createOscillator(), g = c.createGain();
    o.type = type || "sine"; o.frequency.setValueAtTime(f, c.currentTime + t0);
    if (slide) o.frequency.exponentialRampToValueAtTime(slide, c.currentTime + t0 + dur);
    g.gain.setValueAtTime(0.0001, c.currentTime + t0);
    g.gain.exponentialRampToValueAtTime(vol || 0.12, c.currentTime + t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + t0 + dur);
    o.connect(g); g.connect(c.destination); o.start(c.currentTime + t0); o.stop(c.currentTime + t0 + dur + 0.02);
  }
  function noise(t0, dur, vol, hp) {
    var c = ac(); if (!c) return;
    var len = Math.floor(c.sampleRate * dur), b = c.createBuffer(1, len, c.sampleRate), d = b.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    var s = c.createBufferSource(); s.buffer = b;
    var f = c.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = hp || 2400; f.Q.value = 0.8;
    var g = c.createGain(); g.gain.value = vol || 0.08;
    s.connect(f); f.connect(g); g.connect(c.destination); s.start(c.currentTime + t0);
  }
  APP.sfx = function (k, n) {
    var p = APP.perfil(); if (p && !p.sonido) return;
    try {
      if (k === "ok") { tone(660, 0, 0.12, "triangle", 0.12); tone(990, 0.09, 0.18, "triangle", 0.12); }
      else if (k === "bad") { tone(220, 0, 0.22, "sawtooth", 0.05, 150); }
      else if (k === "combo") { var b = 523 * Math.pow(1.06, Math.min(n || 0, 12)); tone(b, 0, 0.09, "square", 0.05); tone(b * 1.25, 0.07, 0.09, "square", 0.05); tone(b * 1.5, 0.14, 0.16, "square", 0.05); }
      else if (k === "level") { [523, 659, 784, 1047].forEach(function (f, i) { tone(f, i * 0.11, 0.3, "triangle", 0.11); }); }
      else if (k === "chest") { [392, 523, 659, 784, 1047, 1319].forEach(function (f, i) { tone(f, i * 0.06, 0.22, "sine", 0.08); }); }
      else if (k === "swish") { noise(0, 0.22, 0.07, 3200); }
      else if (k === "tap") { tone(880, 0, 0.04, "sine", 0.05); }
      else if (k === "flip") { noise(0, 0.12, 0.05, 1600); tone(1200, 0.05, 0.08, "sine", 0.04); }
      else if (k === "tick") { tone(1400, 0, 0.03, "square", 0.025); }
      else if (k === "lamina") { tone(784, 0, 0.12, "triangle", 0.09); tone(1175, 0.1, 0.12, "triangle", 0.09); tone(1568, 0.2, 0.25, "triangle", 0.08); }
    } catch (e) {}
  };
  APP.vibrar = function (pat) { try { if (navigator.vibrate) navigator.vibrate(pat); } catch (e) {} };

  /* ---------------- Espejo para los avisos (IndexedDB, lo lee el service worker) ---------------- */
  APP.mirror = function () {
    try {
      var p = APP.perfil(); if (!p || !window.indexedDB) return;
      var u = D.usuarios[p.who];
      var m = p.mision && p.mision.fecha === U.today() ? p.mision : null;
      var venc = Object.keys(p.lam).filter(function (k) { return p.lam[k].lv >= 1 && p.lam[k].due <= U.today(); });
      var teaser = null;
      if (venc.length) { var l = D.laminas.filter(function (x) { return x.id === venc[0]; })[0]; if (l) teaser = l.q; }
      var resumen = { nombre: u ? u.nombre : "", app: APP.cfg.nombre, racha: p.racha.n, ult: p.racha.ult, comodines: p.racha.comodines,
        hoy: U.today(), misionHecha: !!(m && m.hecho.every(Boolean)), pasosRestantes: m ? m.hecho.filter(function (x) { return !x; }).length : null,
        vencidas: venc.length, teaser: teaser, xp: p.xp, prueba: APP.proyecto().prueba.fecha };
      var req = indexedDB.open("entrenamiento", 1);
      req.onupgradeneeded = function () { req.result.createObjectStore("kv"); };
      req.onsuccess = function () { try { var tx = req.result.transaction("kv", "readwrite"); tx.objectStore("kv").put(resumen, "resumen"); } catch (e) {} };
      if (navigator.setAppBadge && resumen.pasosRestantes) { navigator.setAppBadge(resumen.pasosRestantes).catch(function () {}); }
      else if (navigator.clearAppBadge && resumen.misionHecha) { navigator.clearAppBadge().catch(function () {}); }
    } catch (e) {}
  };

  /* ---------------- Días que faltan para la prueba ---------------- */
  APP.faltan = function () {
    var f = new Date(APP.proyecto().prueba.fecha), now = new Date();
    var a = new Date(now.getFullYear(), now.getMonth(), now.getDate()), b = new Date(f.getFullYear(), f.getMonth(), f.getDate());
    return Math.round((b - a) / 86400000);
  };
})();

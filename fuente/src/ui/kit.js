/* Piezas de interfaz reutilizables: íconos, navegación, hojas, avisos, confeti, mapas y línea de tiempo. */
var APP = window.APP || (window.APP = {});

(function () {
  "use strict";
  var D = APP.data, U = APP.u;

  /* ---------------- Íconos ---------------- */
  var P = {
    home: '<path d="M3 11.2 12 4l9 7.2V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/><path class="fill" d="M9 21v-6h6v6z" stroke="none" fill="none"/>',
    route: '<circle cx="6" cy="18" r="2.4"/><circle cx="18" cy="6" r="2.4"/><path d="M8.4 18H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.6"/>',
    exam: '<rect x="5" y="3.5" width="14" height="17.5" rx="2.5"/><path d="M9 3.5h6v2.5H9z"/><path d="m8.6 13 2.2 2.2 4.6-4.8"/>',
    album: '<rect x="3" y="6" width="12" height="15" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v13"/>',
    dots: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
    back: '<path d="M15 18 9 12l6-6"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    flame: '<path d="M12 2.5c.8 3 4.6 5.1 4.6 10a4.6 4.6 0 0 1-9.2 0c0-2.3 1.2-3.7 2.3-4.8.1 2.1 1 3.2 2.3 3.2 0-3.4-1.2-5.8 0-8.4z"/>',
    bolt: '<path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12z"/>',
    lock: '<rect x="5" y="10.5" width="14" height="10" rx="2.2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    x: '<path d="M7 7l10 10M17 7 7 17"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    bell: '<path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2.2 2.2 0 0 0 4 0"/>',
    phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
    shield: '<path d="M12 3 4.5 6v6c0 4.4 3.2 7.8 7.5 9 4.3-1.2 7.5-4.6 7.5-9V6z"/><path d="m9 12 2 2 4-4"/>',
    send: '<path d="M21 3 3 10.5l7 2.5 2.5 7z"/><path d="M10 13l11-10"/>',
    sound: '<path d="M4 9.5h3.5L12 5v14l-4.5-4.5H4z"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"/>',
    mute: '<path d="M4 9.5h3.5L12 5v14l-4.5-4.5H4z"/><path d="m16 9.5 5 5M21 9.5l-5 5"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c.6-3.3 3-5.2 6-5.2s5.4 1.9 6 5.2"/><circle cx="17" cy="9" r="2.6"/><path d="M16.5 14.5c2.3.3 4 1.9 4.5 4.5"/>',
    trophy: '<path d="M7 4h10v4a5 5 0 0 1-10 0z"/><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20.5h7M10 17h4"/>',
    pencil: '<path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17z"/><path d="m15 7 3 3"/>',
    gift: '<rect x="3.5" y="9" width="17" height="11.5" rx="1.8"/><path d="M2.5 9h19v-3h-19zM12 6v14.5"/><path d="M12 6c-1.5-3.5-5-3.5-5-1.2C7 6 9.5 6 12 6zM12 6c1.5-3.5 5-3.5 5-1.2C17 6 14.5 6 12 6z"/>',
    sparkles: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.6v.2"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4.5V11h-6.5"/>',
    share: '<path d="M12 15V3.5M7.5 8 12 3.5 16.5 8"/><path d="M5 12v7.5h14V12"/>',
    plusbox: '<rect x="4" y="4" width="16" height="16" rx="3.5"/><path d="M12 8.5v7M8.5 12h7"/>',
    menuv: '<circle cx="12" cy="5" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="19" r="1.6"/>',
    burger: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>',
    star: '<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 17l-5.2 2.7 1-5.9-4.3-4.1 5.9-.8z"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".9"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>'
  };
  APP.ic = function (k, extra) {
    var fillish = (k === "flame" || k === "bolt" || k === "star") ? ' fill="currentColor" stroke="none"' : ' fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
    return '<svg viewBox="0 0 24 24" aria-hidden="true"' + fillish + (extra || "") + ">" + (P[k] || "") + "</svg>";
  };

  /* ---------------- Navegación ---------------- */
  var stack = [], root = null, cur = null;
  APP.views = {};
  APP.go = function (name, params, opts) {
    opts = opts || {};
    if (opts.replace && stack.length) stack[stack.length - 1] = { name: name, params: params || {} };
    else if (opts.reset) stack = [{ name: name, params: params || {} }];
    else stack.push({ name: name, params: params || {} });
    try { if (!opts.replace && !opts.reset) history.pushState({ d: stack.length }, ""); } catch (e) {}
    render(!!opts.keep);
  };
  APP.back = function () {
    if (cur && cur.onBack && cur.onBack() === false) return;
    if (stack.length > 1) { stack.pop(); render(); } else { APP.go("home", {}, { reset: true }); }
  };
  APP.current = function () { return stack[stack.length - 1]; };
  APP.rerender = function () { render(true); };
  window.addEventListener("popstate", function () {
    if (document.querySelector(".veil")) { APP.closeSheet(); try { history.pushState({ d: stack.length }, ""); } catch (e) {} return; }
    if (cur && cur.onBack && cur.onBack() === false) { try { history.pushState({ d: stack.length }, ""); } catch (e) {} return; }
    if (stack.length > 1) { stack.pop(); render(); }
  });

  var TABS = [["home", "Hoy", "home"], ["memoria", "Memoria", "route"], ["sim", "Simulacro", "exam"], ["album", "Álbum", "album"]];
  function tabbar(active) {
    return '<div class="tabbar"><nav aria-label="Secciones">' + TABS.map(function (t) {
      return '<button class="tab' + (t[0] === active ? " on" : "") + '" data-tab="' + t[0] + '" aria-current="' + (t[0] === active ? "page" : "false") + '">' + APP.ic(t[2]) + "<span>" + t[1] + "</span></button>";
    }).join("") + "</nav></div>";
  }
  function render(keepScroll) {
    if (!root) root = document.getElementById("app");
    var top = stack[stack.length - 1];
    var fn = APP.views[top.name];
    if (!fn) { top = { name: "home", params: {} }; stack = [top]; fn = APP.views.home; }
    var y = window.scrollY;
    try {
      cur = fn(top.params) || {};
      var tab = cur.tab === false ? "" : tabbar(cur.tab || top.name);
      root.innerHTML = cur.html + tab;
      if (cur.mount) cur.mount(root);
    } catch (err) {
      APP.logError(err, top.name);
      cur = { tab: false, on: { reset: function () { APP.go("home", {}, { reset: true }); } } };
      root.innerHTML = '<div class="scr full"><div class="onb"><h2>Algo falló en esta pantalla.</h2><p class="muted">Tu avance está guardado. Vuelve al inicio y sigue; el error quedó anotado en el «Reporte para Claude» para corregirlo.</p><button class="btn cta block" data-act="reset">Volver al inicio</button></div></div>';
    }
    if (!keepScroll) window.scrollTo(0, 0); else window.scrollTo(0, y);
  }
  /* Errores: se guardan los últimos diez para el reporte. */
  APP.logError = function (err, donde) {
    try {
      var s = APP.store.raw(); s.errores = s.errores || [];
      s.errores.push({ t: new Date().toISOString(), donde: donde || "", msg: String(err && (err.stack || err.message) || err).slice(0, 400), v: APP.cfg && APP.cfg.version });
      if (s.errores.length > 10) s.errores.shift();
      APP.store.save();
    } catch (e) {}
    try { console.error(err); } catch (e) {}
  };
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-tab]");
    if (t) { APP.sfx("tap"); APP.go(t.getAttribute("data-tab"), {}, { reset: true }); return; }
    var a = e.target.closest("[data-act]");
    if (!a) return;
    var act = a.getAttribute("data-act");
    if (act === "back") { APP.back(); return; }
    try {
      if (act === "go") { APP.go(a.getAttribute("data-view"), JSON.parse(a.getAttribute("data-p") || "{}")); return; }
      // Lo que está dentro de una hoja abierta responde primero a la hoja.
      var inSheet = !!a.closest(".veil");
      if (inSheet && APP.sheetOn && APP.sheetOn[act]) { APP.sheetOn[act](a, e); return; }
      if (cur && cur.on && cur.on[act]) { cur.on[act](a, e); return; }
      if (APP.sheetOn && APP.sheetOn[act]) { APP.sheetOn[act](a, e); return; }
      if (APP.globalOn[act]) APP.globalOn[act](a, e);
    } catch (err) {
      APP.logError(err, "acción " + act);
      APP.toast("Algo falló. Tu avance está guardado.");
    }
  });
  APP.globalOn = {};

  /* ---------------- Barra superior ---------------- */
  APP.top = function (title, opts) {
    opts = opts || {};
    var left = opts.noBack ? "" : '<button class="icon-btn" data-act="back" aria-label="Volver">' + APP.ic(opts.close ? "close" : "back") + "</button>";
    return '<div class="top">' + left + "<h1>" + U.esc(title) + "</h1>" + (opts.right || "") + "</div>";
  };

  /* ---------------- Hojas (bottom sheets) ---------------- */
  APP.sheetOn = null;
  APP.sheet = function (html, on, opts) {
    APP.closeSheet();
    var v = document.createElement("div");
    v.className = "veil"; v.setAttribute("role", "dialog"); v.setAttribute("aria-modal", "true");
    v.innerHTML = '<div class="sheet"><div class="grab"></div>' + html + "</div>";
    v.addEventListener("click", function (e) { if (e.target === v && !(opts && opts.sticky)) APP.closeSheet(); });
    document.body.appendChild(v);
    APP.sheetOn = on || {};
    APP.sheetOn.close = APP.closeSheet;
    if (opts && opts.mount) opts.mount(v);
    return v;
  };
  APP.closeSheet = function () {
    var v = document.querySelector(".veil"); if (v) v.remove(); APP.sheetOn = null;
    if (APP.celebPend && APP.celebPend.length) setTimeout(APP.celebrarPendientes, 450);
  };

  /* ---------------- Toast ---------------- */
  var toastT = null;
  APP.toast = function (msg, icon) {
    var old = document.querySelector(".toast"); if (old) old.remove();
    var t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status");
    t.innerHTML = (icon ? APP.ic(icon, ' width="20" height="20"') : "") + "<span>" + U.esc(msg) + "</span>";
    document.body.appendChild(t);
    clearTimeout(toastT); toastT = setTimeout(function () { t.remove(); }, 2600);
  };

  /* ---------------- Confeti ---------------- */
  APP.confetti = function (n) {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var c = document.createElement("canvas"); c.className = "confetti"; document.body.appendChild(c);
    var dpr = Math.min(2, window.devicePixelRatio || 1), W = c.width = innerWidth * dpr, H = c.height = innerHeight * dpr;
    var g = c.getContext("2d"), cols = ["#FFE24A", "#86D3FF", "#FF93C8", "#FFB566", "#82E3AC"];
    var ps = []; n = n || 120;
    for (var i = 0; i < n; i++) ps.push({ x: W / 2 + (Math.random() - .5) * W * .3, y: H * .35, vx: (Math.random() - .5) * 14 * dpr, vy: (-Math.random() * 14 - 4) * dpr, r: (4 + Math.random() * 5) * dpr, c: cols[i % 5], a: Math.random() * 6, s: (Math.random() - .5) * .3 });
    var t0 = performance.now();
    (function f(t) {
      g.clearRect(0, 0, W, H);
      ps.forEach(function (p) { p.vy += .45 * dpr; p.x += p.vx; p.y += p.vy; p.a += p.s; g.save(); g.translate(p.x, p.y); g.rotate(p.a); g.fillStyle = p.c; g.fillRect(-p.r, -p.r * .45, p.r * 2, p.r * .9); g.restore(); });
      if (t - t0 < 2600) requestAnimationFrame(f); else c.remove();
    })(t0);
  };

  /* ---------------- Anillo de progreso ---------------- */
  APP.ring = function (pct, label, size) {
    size = size || 74; var r = 30, C = 2 * Math.PI * r, off = C * (1 - U.clamp(pct, 0, 1));
    return '<svg class="ring" viewBox="0 0 74 74" width="' + size + '" height="' + size + '" role="img" aria-label="' + U.esc(label || "") + '">' +
      '<circle cx="37" cy="37" r="' + r + '" fill="none" stroke="var(--sunken)" stroke-width="9"/>' +
      '<circle cx="37" cy="37" r="' + r + '" fill="none" stroke="var(--hl-y)" stroke-width="9" stroke-linecap="round" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '" transform="rotate(-90 37 37)" style="transition:stroke-dashoffset .6s ease"/>' +
      '<text x="37" y="42" text-anchor="middle" font-size="16" font-weight="800" fill="var(--ink)" font-family="var(--font-ui)">' + U.esc(label || "") + "</text></svg>";
  };

  /* ---------------- Línea de tiempo mini (microcasos) ---------------- */
  APP.miniLine = function (L) {
    if (!L) return "";
    var W = 340, H = 30 + 22 * ((L.win || []).length + (L.zones ? 1 : 0)) + 28, x0 = 14, x1 = W - 14;
    var a = L.span[0], b = L.span[1];
    function X(m) { return x0 + (x1 - x0) * (U.clamp(m, a, b) - a) / (b - a); }
    var colors = { y: "var(--hl-y)", b: "var(--hl-b)", p: "var(--hl-p)", o: "var(--hl-o)", g: "var(--hl-g)" };
    var s = '<svg class="mini-line" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Línea de tiempo del caso">';
    var y = 14;
    (L.win || []).forEach(function (w) {
      s += '<rect x="' + X(w.from).toFixed(1) + '" y="' + y + '" width="' + Math.max(4, X(w.to) - X(w.from)).toFixed(1) + '" height="14" rx="7" fill="' + colors[w.col] + '"' + (w.ghost ? ' opacity=".45"' : "") + "/>";
      s += '<text x="' + (X(w.from) + 6).toFixed(1) + '" y="' + (y + 11) + '" style="fill:#13182B;font-weight:700">' + U.esc(w.lab) + "</text>";
      y += 22;
    });
    if (L.zones) {
      L.zones.forEach(function (z, i) {
        s += '<rect x="' + X(z.from).toFixed(1) + '" y="' + y + '" width="' + Math.max(4, X(z.to) - X(z.from)).toFixed(1) + '" height="14" rx="4" fill="' + (i ? "var(--hl-p)" : "var(--hl-o)") + '" opacity=".75"/>';
        s += '<text x="' + (X(z.from) + 6).toFixed(1) + '" y="' + (y + 11) + '" style="fill:#13182B;font-weight:800">' + U.esc(z.lab) + "</text>";
      });
      y += 22;
    }
    var axis = y + 6;
    s += '<line x1="' + x0 + '" x2="' + x1 + '" y1="' + axis + '" y2="' + axis + '" stroke="var(--ink-3)" stroke-width="1.5"/>';
    (L.ev || []).forEach(function (e) {
      var xx = X(e.m);
      s += '<line x1="' + xx.toFixed(1) + '" x2="' + xx.toFixed(1) + '" y1="10" y2="' + (axis + 4) + '" stroke="' + (e.k === "C" ? "var(--ink)" : "var(--ink-3)") + '" stroke-width="' + (e.k === "C" ? 2.5 : 1.2) + '" stroke-dasharray="' + (e.k === "C" ? "0" : "3 3") + '"/>';
      s += '<circle cx="' + xx.toFixed(1) + '" cy="' + axis + '" r="' + (e.k === "C" ? 5 : 3.5) + '" fill="' + (e.k === "C" ? "var(--ink)" : "var(--surface)") + '" stroke="var(--ink)" stroke-width="1.5"/>';
      var anchor = xx < 60 ? "start" : (xx > W - 60 ? "end" : "middle");
      s += '<text x="' + xx.toFixed(1) + '" y="' + (axis + 18) + '" text-anchor="' + anchor + '" style="font-weight:' + (e.k === "C" ? 800 : 600) + '">' + U.esc(e.lab) + "</text>";
    });
    return s + "</svg>";
  };

  /* ---------------- Mapas (los tres) ---------------- */
  function unlockedAny(ids) { return (ids || []).some(function (id) { return APP.lam.get(id).lv >= 1; }); }
  APP.mapHTML = function (mapaId, foco, opts) {
    opts = opts || {}; foco = foco || [];
    var M = D.mapas[mapaId], h = "";
    h += '<div class="map-q">' + M.preguntas.map(function (q) { return '<div class="qq">' + U.esc(q) + "</div>"; }).join("") + "</div>";
    if (mapaId === "m06-1") {
      h += '<div class="stack">' + M.ramas.map(function (r) {
        var open = opts.all || unlockedAny(r.lam) || foco.indexOf(r.k) >= 0;
        var cls = "branch" + (foco.indexOf(r.k) >= 0 ? " focus" : "") + (open ? "" : " locked");
        if (!open) return '<div class="' + cls + '"><div class="row">' + APP.ic("lock", ' width="18" height="18"') + '<span class="small muted">Se desbloquea en una escena</span></div></div>';
        return '<button class="' + cls + '" data-act="lamina" data-id="' + r.lam[0] + '"><div class="flow"><span class="mk b">' + U.esc(r.defecto) + '</span><span class="arrow">→</span><span class="mk ' + r.efectoCol + '"><b>' + U.esc(r.efecto) + '</b></span></div>' +
          '<div class="small">' + U.esc(r.salida) + '</div><div class="tiny">' + U.esc(r.norma) + "</div></button>";
      }).join("") + "</div>";
    } else if (mapaId === "m06-2") {
      h += '<div class="stack">' + M.puertas.map(function (d) {
        var open = opts.all || unlockedAny(d.lam) || foco.indexOf(d.k) >= 0;
        var cls = "door" + (foco.indexOf(d.k) >= 0 ? " focus" : "") + (open ? "" : " locked");
        if (!open) return '<div class="' + cls + '"><div class="row">' + APP.ic("lock", ' width="18" height="18"') + "<b>" + U.esc(d.nombre) + '</b></div><span class="small muted">Se desbloquea en una escena</span></div>';
        return '<button class="' + cls + '" data-act="lamina" data-id="' + d.lam[0] + '"><div class="row spread"><b><span class="mk ' + d.col + '">' + U.esc(d.nombre) + '</span></b><span class="tiny">' + U.esc(d.norma) + "</span></div><ul>" +
          d.reglas.map(function (x) { return "<li>" + U.esc(x) + "</li>"; }).join("") + '</ul><div class="exc">' + U.esc(d.excepcion) + "</div></button>";
      }).join("");
      var peajeOpen = opts.all || unlockedAny(["f19", "f20", "f21"]) || foco.indexOf("peaje") >= 0;
      h += '<div class="card' + (foco.indexOf("peaje") >= 0 ? " focus" : "") + '" style="' + (foco.indexOf("peaje") >= 0 ? "box-shadow:0 0 0 3px var(--hl-y)" : "") + '"><h3>Cuánto cuesta subir</h3>' +
        (peajeOpen ? '<div class="toll" style="margin-top:8px">' + M.peaje.map(function (t) { return "<span>" + U.esc(t.cuando) + '</span><b><span class="mk p">' + U.esc(t.pct) + "</span></b>"; }).join("") + '</div><p class="small muted" style="margin-top:8px">' + U.esc(M.peajeNota) + "</p>"
          : '<p class="small muted">' + APP.ic("lock", ' width="16" height="16"') + " Se desbloquea en la escena del peaje.</p>") + "</div></div>";
    } else {
      function col(title, arr, key) {
        return '<div class="fcol"><div class="hd">' + title + "</div>" + arr.map(function (c) {
          var open = opts.all || unlockedAny(c.lam) || foco.indexOf(c.k) >= 0;
          if (!open) return '<div class="fcell locked">' + APP.ic("lock", ' width="14" height="14"') + "</div>";
          return '<button class="fcell' + (foco.indexOf(c.k) >= 0 ? " focus" : "") + '" data-act="lamina" data-id="' + c.lam[0] + '"><b>' + U.esc(c.t) + "</b>" + U.esc(c.d) + "</button>";
        }).join("") + "</div>";
      }
      h += '<div class="formula">' + col("Desde", M.desde) + '<div class="op">+</div>' + col("Dura", M.cuanto) + '<div class="op">+</div>' + col("Pausas", M.pausas) + "</div>";
      h += '<p class="small muted">' + U.esc(M.nota) + "</p>";
    }
    return h;
  };

  /* ---------------- Lámina: detalle ---------------- */
  APP.lamColor = function (l) { var pg = D.paginas.filter(function (p) { return p.id === l.pag; })[0]; return pg ? pg.color : "y"; };
  APP.lamNum = function (l) { var vis = D.laminas.filter(APP.lamVisible); return vis.indexOf(l) + 1; };
  APP.showLamina = function (id) {
    var l = D.laminas.filter(function (x) { return x.id === id; })[0]; if (!l) return;
    var st = APP.lam.get(id), lv = st.lv || 0;
    var names = ["Por obtener", "Obtenida", "Brillante", "Dorada"];
    var how = lv === 0 ? (l.pag <= "p5" && l.id.charAt(0) === "f" ? "Se obtiene en una escena de la sección Memoria." : "Se obtiene al responder afirmaciones de esa competencia o de ese valor.")
      : lv < 3 ? "Para que suba de nivel, acierta un caso que la use en " + (st.due && st.due > U.today() ? "otro día (desde el " + st.due.split("-").reverse().slice(0, 2).join("/") + ")" : "tu próxima práctica") + "." : "Dominada. Vuelve de vez en cuando para que no se oxide.";
    var body = lv === 0 ? '<p class="muted">' + U.esc(how) + "</p>" :
      '<p class="q">' + U.esc(l.q) + '</p><div class="read"><p>' + U.esc(l.a) + "</p></div>" +
      (l.por ? '<div class="card sunk"><b>Por qué tiene sentido</b><p class="small" style="margin-top:4px">' + U.esc(l.por) + "</p></div>" : "") +
      (l.trampa ? '<div class="card sunk"><b><span class="mk o">La trampa</span></b><p class="small" style="margin-top:4px">' + U.esc(l.trampa) + "</p></div>" : "") +
      '<p class="tiny">Fuente: ' + U.esc(l.src) + "</p>" +
      (l.tri === "reconoce" ? '<p class="tiny">Basta con reconocerla: no hace falta saberla de memoria.</p>' : "");
    APP.sheet('<div class="row spread"><span class="chip ' + APP.lamColor(l) + '">Lámina ' + APP.lamNum(l) + " · " + names[lv] + '</span><button class="icon-btn ghost" data-act="close" aria-label="Cerrar">' + APP.ic("close") + "</button></div>" +
      "<h2>" + U.esc(lv ? l.t : "Lámina por obtener") + "</h2>" + body + (lv ? '<p class="tiny">' + U.esc(how) + "</p>" : ""), {});
    APP.sfx("flip");
  };
  APP.globalOn.lamina = function (el) { APP.showLamina(el.getAttribute("data-id")); };

  /* ---------------- Revelar láminas nuevas ---------------- */
  APP.revealLaminas = function (ids, done) {
    var nuevas = ids.filter(function (id) { return APP.lam.unlock(id); });
    if (!nuevas.length) { if (done) done(0); return; }
    if (nuevas.length > 3) {
      // Muchas de una vez: se revelan juntas, una tras otra, en una sola hoja.
      APP.sfx("chest"); APP.vibrar([18, 40, 18, 40, 18]);
      APP.sheet('<p class="tiny" style="text-align:center">' + nuevas.length + ' láminas nuevas para tu álbum</p><div class="reveal-grid">' + nuevas.map(function (id, k) {
        var l = D.laminas.filter(function (x) { return x.id === id; })[0];
        return '<div class="lam l1" style="--c:var(--hl-' + APP.lamColor(l) + ');animation:flipin .7s ' + (k * 0.12).toFixed(2) + 's cubic-bezier(.2,.8,.2,1) both"><span class="n">' + APP.lamNum(l) + '</span><span class="tt">' + U.esc(l.t) + '</span><span class="lv"><i></i><i></i><i></i></span></div>';
      }).join("") + '</div><p class="small muted" style="text-align:center">Las ves completas en tu álbum. Suben a brillante y a dorada cuando las aciertas en días distintos.</p><button class="btn cta block" data-act="okLams">¡A mi álbum!</button>',
        { okLams: function () { APP.closeSheet(); APP.addXP(15 * nuevas.length); if (done) done(nuevas.length); } }, { sticky: true });
      return;
    }
    var i = 0;
    function show() {
      var l = D.laminas.filter(function (x) { return x.id === nuevas[i]; })[0];
      APP.sfx("lamina"); APP.vibrar([18, 40, 18]);
      APP.sheet('<p class="tiny" style="text-align:center">Lámina nueva ' + (i + 1) + " de " + nuevas.length + '</p><div class="reveal"><div class="lam-big" style="--c:var(--hl-' + APP.lamColor(l) + ')"><span class="tiny">Lámina ' + APP.lamNum(l) + '</span><div class="tt">' + U.esc(l.t) + '</div><span class="chip ' + APP.lamColor(l) + '">Obtenida</span></div></div>' +
        '<p class="small muted" style="text-align:center">' + U.esc(l.q) + '</p><button class="btn cta block" data-act="nextLam">' + (i + 1 < nuevas.length ? "Siguiente lámina" : "Seguir") + "</button>",
        { nextLam: function () { i++; if (i < nuevas.length) show(); else { APP.closeSheet(); APP.addXP(15 * nuevas.length); if (done) done(nuevas.length); } } }, { sticky: true });
    }
    show();
  };

  /* ---------------- Celebraciones ---------------- */
  /* Las celebraciones no interrumpen una ronda: si llegan en mitad de una, esperan al Inicio. */
  var ACTIVAS = ["rafaga", "simplay", "likert", "escena", "paseo", "paseoL", "onb"];
  APP.celebPend = [];
  APP.celebrarPendientes = function () {
    if (!APP.celebPend.length || document.querySelector(".veil")) return;
    var n = APP.celebPend.shift(); APP.celebrarNivel(n);
  };
  APP.celebrarNivel = function (niv) {
    var c = APP.current && APP.current();
    if ((c && ACTIVAS.indexOf(c.name) >= 0) || document.querySelector(".veil")) { APP.celebPend.push(niv); return; }
    APP.sfx("level"); APP.confetti(160); APP.vibrar([30, 60, 30, 60, 60]);
    APP.sheet('<div class="stack" style="text-align:center;padding:10px 0"><p class="tiny">Subiste de nivel</p><h2 style="font-size:30px">' + U.esc(niv.nombre) + '</h2><p class="muted">Sigue así: el siguiente es ' + U.esc(niv.nextNombre || "la cima") + '.</p><button class="btn cta block" data-act="close">Seguir</button></div>', {});
  };
  APP.celebrarLogro = function (def) {
    if (!def) return;
    APP.sfx("chest");
    APP.toast("Logro: " + def.t, "trophy");
  };
  APP.consejos = [
    "Si un caso te toma más de tres minutos, anota su número en la hoja de operaciones y vuelve a él al final.",
    "En comportamentales e integridad, marca un extremo: B y C nunca dan el máximo puntaje.",
    "Cuando dos opciones parecen correctas, busca a cuál le falta un requisito.",
    "El operador casi nunca nombra la figura: la describe. Tradúcela antes de mirar las opciones.",
    "Desconfía de la opción que repite palabras de una norma vecina: «en cualquier tiempo», «no está en firme».",
    "Las puertas abren a las 7:15 a. m. y cierran a las 8:30. Llega temprano.",
    "Lleva lápiz de mina negra número 2 y borrador de nata. Llena el círculo completo.",
    "Documento válido: cédula amarilla con holograma o cédula digital.",
    "Calcula: 90 afirmaciones en menos de 30 minutos. El resto del tiempo es para los 66 casos.",
    "Ubica el caso en la línea de tiempo: qué acto ya llegó y cuál no. Eso decide el porcentaje.",
    "Antes de aplicar una regla general, pregúntate si hay una excepción en el mismo estatuto.",
    "Lee primero el enunciado: te dice qué buscar en el caso."
  ];
})();

/* Simulacros, afirmaciones, paseo del experto, estadísticas y pantallas de servicio. */
var APP = window.APP || (window.APP = {});

(function () {
  "use strict";
  var D = APP.data, U = APP.u, V = APP.views, esc = U.esc;
  var LETRAS = "ABCD";
  function casoById(id) { return D.casos.filter(function (c) { return c.id === id; })[0]; }
  function afById(id) { return D.afirmaciones.filter(function (a) { return a.id === id; })[0]; }
  function lamById(id) { return D.laminas.filter(function (l) { return l.id === id; })[0]; }

  /* ---------------- Afirmaciones disponibles para el usuario ---------------- */
  APP.afirmacionesDe = function (tipo, pool) {
    var u = APP.usuario();
    return D.afirmaciones.filter(function (a) {
      if (a.tipo !== tipo || (pool && a.pool !== pool)) return false;
      if (tipo === "comp" && a.ind && u.indicadores.indexOf(a.ind) < 0) return false;
      return true;
    });
  };
  /* Puntaje estimado tipo FUAA: 1 a 4 según la cercanía al extremo favorable (criterio de Claude). */
  APP.puntosLikert = function (a, resp) {
    if (a.clave === "H") return [4, 4, 2, 1][resp];
    if (a.clave === "D") return [1, 2, 3, 4][resp];
    return [4, 3, 2, 1][resp];
  };
  APP.extremoOk = function (a, resp) { return a.clave === "H" ? resp <= 1 : (a.clave === "D" ? resp === 3 : resp === 0); };
  function nombreComp(k) { return D.competencias[k] ? D.competencias[k].nombre : (D.valores[k] ? D.valores[k].nombre : k); }
  /* Láminas que una afirmación pone en juego: la de su competencia o valor y las del método que se usan para resolverla. */
  var NEGA = /^(evito|me niego|no acepto|no permito|rechazo|me abstengo|no comparto|no utilizo|no uso|no doy|no recibo)\b/i;
  function lamDeAfirm(a) {
    var ids = [];
    if (a.ind) ids.push("c-" + a.ind);
    if (a.val) ids.push(a.val);
    ids.push("m-pasos");
    if (a.clave !== "H") ids.push("m-extremos");
    if (a.condTipo) ids.push("m-costo");
    if (a.condTipo === "costo" && a.clave === "D") ids.push("m-abogado");
    if (a.clave === "H") ids.push("m-perfeccion");
    if (a.virtud && a.clave !== "H") ids.push(a.tipo === "integ" ? "v-disfraz" : "m-virtud");
    if (NEGA.test(a.texto)) ids.push("m-negacion");
    return ids;
  }
  APP.lamDeAfirm = lamDeAfirm;

  /* =========================================================================
     SIMULACRO · centro
     ========================================================================= */
  V.sim = function () {
    var p = APP.perfil(), P = APP.proyecto();
    var bloques = [
      { k: "func", t: "Prueba funcional", d: "Juicio situacional: un caso, un enunciado y tres opciones. Capítulos 1 a 3 del M06.", tema: ["m06-1", "m06-2", "m06-3"], ids: D.casos.filter(function (c) { return p.temas[c.tema]; }).map(function (c) { return c.id; }), corto: 4, meta: "Unos 3 minutos y medio por caso" },
      { k: "comp", t: "Prueba comportamental", d: "Afirmaciones con escala de cuatro niveles, hechas con tus competencias y niveles.", tema: ["comp"], ids: APP.afirmacionesDe("comp", "sim").map(function (a) { return a.id; }), corto: 10, meta: "Unos 20 segundos por afirmación" },
      { k: "integ", t: "Prueba de integridad", d: "Los cinco valores del Código de Integridad de la DIAN. Va en un bloque aparte, como en la prueba real.", tema: ["integ"], ids: APP.afirmacionesDe("integ", "sim").map(function (a) { return a.id; }), corto: 6, meta: "Unos 20 segundos por afirmación" }
    ];
    var h = '<div class="scr">' + APP.top("Simulacro", { noBack: true }) +
      '<p class="lede">El formato de ' + esc(P.convocatoria) + ". Fijas tu respuesta, cuentas cómo te fue y, al final, el experto te muestra cómo lo habría resuelto.</p>" +
      '<div class="card stack" style="gap:10px"><span class="small"><b>¿Cuándo quieres ver la explicación?</b></span><div class="row wrap"><button class="chip pick' + (p.modoRetro === "final" ? " on" : "") + '" data-act="modo" data-m="final">Al final, como en la prueba</button><button class="chip pick' + (p.modoRetro === "cada" ? " on" : "") + '" data-act="modo" data-m="cada">Después de cada uno</button></div></div>';
    bloques.forEach(function (b) {
      var on = b.tema.some(function (t) { return p.temas[t]; });
      if (!on) return;
      var vistos = b.ids.filter(function (id) { return p.sim.vistos[id]; }).length, fall = b.ids.filter(function (id) { return p.sim.fallados[id]; }).length;
      var ult = p.sim.intentos.filter(function (x) { return x.tipo === b.k; }).slice(-1)[0];
      h += '<div class="card stack"><div class="row spread"><h3>' + esc(b.t) + '</h3><span class="chip">' + vistos + "/" + b.ids.length + ' vistos</span></div><p class="small muted">' + esc(b.d) + '</p><p class="tiny">' + esc(b.meta) + (ult ? " · último resultado: " + esc(ult.resumen) : "") + "</p>" +
        '<div class="row wrap"><button class="btn dark grow" data-act="corto" data-k="' + b.k + '">Simulacro corto (' + Math.min(b.corto, b.ids.length) + ')</button><button class="btn soft grow" data-act="completo" data-k="' + b.k + '">Completo (' + b.ids.length + ")</button></div>" +
        (fall ? '<button class="btn line block" data-act="errores" data-k="' + b.k + '">Mis errores (' + fall + ")</button>" : "") + "</div>";
      b._ids = b.ids;
    });
    var hist = p.sim.intentos.slice(-6).reverse();
    if (hist.length) h += '<h3>Intentos recientes</h3><div class="stack">' + hist.map(function (x) { var i = p.sim.intentos.indexOf(x); return '<button class="menu-item" data-act="ver" data-i="' + i + '"><span class="ic">' + APP.ic(x.tipo === "func" ? "exam" : x.tipo === "comp" ? "users" : "shield") + "</span><span><b>" + esc({ func: "Funcional", comp: "Comportamental", integ: "Integridad" }[x.tipo]) + " · " + esc(x.resumen) + "</b><small>" + new Date(x.ini).toLocaleString("es-CO", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }) + "</small></span>" + APP.ic("back", ' width="18" height="18" style="transform:rotate(180deg);opacity:.5"') + "</button>"; }).join("") + "</div>";
    h += '<p class="tiny">Cuando vean todos los casos, Claude agrega casos nuevos en una actualización. Los que fallen vuelven en «Mis errores».</p></div>';
    function idsDe(k) { return bloques.filter(function (b) { return b.k === k; })[0].ids; }
    function ordenar(ids) { var no = ids.filter(function (id) { return !p.sim.vistos[id]; }), si = ids.filter(function (id) { return p.sim.vistos[id]; }); return U.shuffle(no).concat(U.shuffle(si)); }
    return { tab: "sim", html: h, on: {
      modo: function (el) { p.modoRetro = el.getAttribute("data-m"); APP.store.save(); APP.rerender(); },
      corto: function (el) { var k = el.getAttribute("data-k"), b = bloques.filter(function (x) { return x.k === k; })[0]; APP.go("simplay", { tipo: k, ids: ordenar(idsDe(k)).slice(0, b.corto) }); },
      completo: function (el) { var k = el.getAttribute("data-k"); APP.go("simplay", { tipo: k, ids: ordenar(idsDe(k)) }); },
      errores: function (el) { var k = el.getAttribute("data-k"); APP.go("simplay", { tipo: k, ids: U.shuffle(idsDe(k).filter(function (id) { return p.sim.fallados[id]; })), errores: true }); },
      ver: function (el) { APP.go("simres", { i: +el.getAttribute("data-i") }); }
    } };
  };

  /* =========================================================================
     SIMULACRO · jugador (funcional y escala de cuatro niveles)
     ========================================================================= */
  var SEG = ["Lo domino", "Seguro", "Dudé", "Adiviné"];
  var COMO = ["Por descarte", "Dudé entre dos", "Me confundió la redacción", "No recordaba el dato", "Me faltó tiempo", "Releí el caso"];
  V.simplay = function (pr) {
    var p = APP.perfil();
    var S = pr.S || (pr.S = { i: 0, fase: "resp", sel: null, items: [], pend: [], t0: Date.now(), tItem: Date.now(), marca: { seg: null, como: [], comps: [], nota: "" } });
    var likert = pr.tipo !== "func", N = pr.ids.length;
    if (S.done) return { html: "" };
    var id = pr.ids[S.i], it = likert ? afById(id) : casoById(id);
    var tipo = likert ? it.tipo : "func";
    var retroCada = pr.modo === "dia" || p.modoRetro === "cada";
    var h = '<div class="scr full"><div class="progress-top"><button class="icon-btn" data-act="salir" aria-label="Salir">' + APP.ic("close") + '</button><div class="bar b"><i style="width:' + Math.round(100 * S.i / N) + '%"></i></div><b class="num">' + (S.i + 1) + "/" + N + "</b></div>";
    h += '<div class="row spread"><span class="chip">' + esc(likert ? (tipo === "comp" ? "Comportamental" : "Integridad") : "Funcional") + (pr.errores ? " · mis errores" : "") + (pr.modo === "dia" ? " · práctica" : "") + '</span><span class="chip num" id="clk">' + APP.ic("clock", ' width="16" height="16"') + " <span>" + U.mmss((Date.now() - S.tItem) / 1000) + "</span></span></div>";
    if (!likert) {
      h += '<div class="card stack"><span class="tiny">Caso</span><div class="ctx">' + esc(it.caso) + '</div></div><p class="q">' + esc(it.enunciado) + '</p><div class="opts">' +
        it.ops.map(function (o, j) { return optBtn(LETRAS[j], o.t, j, S, o.ok); }).join("") + "</div>";
    } else {
      h += '<div class="card stack"><span class="tiny">Afirmación</span><div class="ctx" style="font-size:20px">' + esc(it.texto) + '</div></div><div class="opts">' +
        D.proyectos[0].likert.map(function (l, j) { return optBtn(LETRAS[j], l, j, S, null); }).join("") + "</div>";
    }
    // fases
    if (S.fase === "resp") {
      h += '<div class="sticky-foot"><button class="btn cta block" data-act="fijar"' + (S.sel == null ? " disabled" : "") + ">Fijar respuesta</button>" + (S.sel == null ? '<p class="tiny" style="text-align:center">Una vez fijada, no se puede cambiar.</p>' : "") + "</div>";
    } else if (S.fase === "marca") {
      h += '<div class="card stack" style="animation:rise .25s ease both"><div class="row spread"><h3>Marcado extra</h3><span class="tiny">' + APP.ic("clock", ' width="14" height="14"') + " reloj en pausa</span></div>";
      if (likert) {
        var opciones = tipo === "comp" ? Object.keys(D.competencias) : Object.keys(D.valores);
        h += '<p class="small"><b>¿Qué ' + (tipo === "comp" ? "competencia o competencias" : "valor o valores") + ' evalúa?</b> Puedes marcar varias.</p><div class="row wrap">' +
          opciones.map(function (k) { return '<button class="chip pick' + (S.marca.comps.indexOf(k) >= 0 ? " on" : "") + '" data-act="comp" data-k="' + k + '">' + esc(nombreComp(k)) + "</button>"; }).join("") +
          '<button class="chip pick' + (S.marca.comps.indexOf("control") >= 0 ? " on" : "") + '" data-act="comp" data-k="control">Ninguna: es de control</button></div>';
        h += '<p class="small"><b>¿Qué tan seguro?</b></p><div class="row wrap">' + ["Seguro", "Dudé"].map(function (s) { return '<button class="chip pick' + (S.marca.seg === s ? " on" : "") + '" data-act="seg" data-s="' + s + '">' + s + "</button>"; }).join("") + "</div>";
      } else {
        h += '<p class="small"><b>¿Qué tan seguro te sentiste?</b></p><div class="row wrap">' + SEG.map(function (s) { return '<button class="chip pick' + (S.marca.seg === s ? " on" : "") + '" data-act="seg" data-s="' + s + '">' + s + "</button>"; }).join("") + "</div>" +
          '<p class="small"><b>¿Cómo llegaste a la respuesta?</b> Puedes marcar varias.</p><div class="row wrap">' + COMO.map(function (s) { return '<button class="chip pick' + (S.marca.como.indexOf(s) >= 0 ? " on" : "") + '" data-act="como" data-s="' + s + '">' + s + "</button>"; }).join("") + "</div>";
      }
      h += '<label class="small" for="nota"><b>¿Qué te pasó en este punto?</b> (opcional)</label><textarea id="nota" placeholder="Escribe lo que pensaste, lo que dudaste o lo que te confundió">' + esc(S.marca.nota) + "</textarea></div>";
      h += '<div class="sticky-foot"><button class="btn cta block" data-act="sig"' + (S.marca.seg == null || (likert && !S.marca.comps.length) ? " disabled" : "") + ">" + (retroCada ? "Ver la explicación" : (S.i + 1 < N ? "Siguiente" : "Terminar")) + "</button>" +
        ((S.marca.seg == null || (likert && !S.marca.comps.length)) ? '<p class="tiny" style="text-align:center">' + (likert ? "Marca las competencias y tu seguridad." : "Marca tu seguridad para seguir.") + "</p>" : "") + "</div>";
    } else if (S.fase === "retro") {
      var last = S.items[S.items.length - 1];
      h += likert ? retroLikertInline(it, last) : retroFuncInline(it, last);
      h += '<div class="sticky-foot"><button class="btn cta block" data-act="next">' + (S.i + 1 < N ? "Siguiente" : "Terminar") + "</button>" + (!likert ? '<button class="btn soft block" data-act="paseo">Paseo del experto</button>' : "") + "</div>";
    }
    h += "</div>";
    return { tab: false, html: h,
      mount: function () {
        clearInterval(APP._clk);
        if (S.fase === "resp") APP._clk = setInterval(function () { var c = document.querySelector("#clk span"); if (c) c.textContent = U.mmss((Date.now() - S.tItem) / 1000); else clearInterval(APP._clk); }, 1000);
        var ta = document.getElementById("nota"); if (ta) ta.addEventListener("input", function () { S.marca.nota = ta.value; });
      },
      onBack: function () { return salirSim(pr, S); },
      on: {
        salir: function () { if (salirSim(pr, S) !== false) APP.back(); },
        pick: function (el) { if (S.fase !== "resp") return; S.sel = +el.getAttribute("data-j"); APP.sfx("tap"); APP.rerender(); },
        fijar: function () {
          if (S.sel == null) return;
          var seg = (Date.now() - S.tItem) / 1000;
          var rec = { id: id, resp: S.sel, seg: Math.round(seg) };
          if (likert) { rec.pts = APP.puntosLikert(it, S.sel); rec.ok = APP.extremoOk(it, S.sel); } else { rec.ok = !!it.ops[S.sel].ok; }
          S.items.push(rec); S.fase = "marca"; APP.sfx("swish"); clearInterval(APP._clk); APP.rerender();
          setTimeout(function () { window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }); }, 50);
        },
        seg: function (el) { S.marca.seg = el.getAttribute("data-s"); APP.rerender(); },
        como: function (el) { var s = el.getAttribute("data-s"), i = S.marca.como.indexOf(s); if (i >= 0) S.marca.como.splice(i, 1); else S.marca.como.push(s); APP.rerender(); },
        comp: function (el) { var k = el.getAttribute("data-k"), a = S.marca.comps; if (k === "control") { S.marca.comps = a.indexOf("control") >= 0 ? [] : ["control"]; } else { var i = a.indexOf(k); if (i >= 0) a.splice(i, 1); else { a.push(k); var ci = a.indexOf("control"); if (ci >= 0) a.splice(ci, 1); } } APP.rerender(); },
        sig: function () {
          var rec = S.items[S.items.length - 1];
          rec.marca = { seg: S.marca.seg, como: S.marca.como.slice(), comps: S.marca.comps.slice(), nota: S.marca.nota.trim() };
          registrar(it, rec, likert).forEach(function (lid) { if (S.pend.indexOf(lid) < 0) S.pend.push(lid); });
          if (retroCada) { S.fase = "retro"; APP.sfx(rec.ok ? "ok" : "bad"); APP.rerender(); }
          else avanzar(pr, S);
        },
        next: function () { avanzar(pr, S); },
        paseo: function () { APP.go("paseo", { caso: id, resp: S.items[S.items.length - 1].resp }); }
      } };
  };
  function optBtn(L, t, j, S, ok) {
    var cls = "opt";
    if (S.fase === "resp") { if (S.sel === j) cls += " sel"; }
    else if (S.fase === "retro" && ok != null) { if (ok) cls += " ok"; else if (S.sel === j) cls += " bad"; else cls += " fade"; }
    else if (S.sel === j) cls += " sel"; else cls += " fade";
    return '<button class="' + cls + '" data-act="pick" data-j="' + j + '"' + (S.fase !== "resp" ? " disabled" : "") + '><span class="L">' + L + "</span><span>" + esc(t) + "</span></button>";
  }
  /* Guarda la respuesta y devuelve las láminas que todavía no se han obtenido (se revelan al final). */
  function registrar(it, rec, likert) {
    var p = APP.perfil(), pend = [];
    if (it.pool !== "dia") {
      p.sim.vistos[it.id] = true;
      if (!rec.ok) p.sim.fallados[it.id] = true; else if (p.sim.fallados[it.id]) delete p.sim.fallados[it.id];
    }
    if (likert) {
      var sub = it.ind ? "c:" + it.ind : (it.val ? "v:" + it.val : (it.tipo === "integ" ? "v:control" : "c:control"));
      var ids = lamDeAfirm(it), propia = it.ind ? "c-" + it.ind : it.val;
      pend = ids.filter(function (lid) { return APP.lam.get(lid).lv < 1; });
      // Las láminas del método suben con el extremo; la de la competencia o el valor exige además marcarla bien.
      APP.track({ sub: sub, ok: rec.ok, seg: rec.seg, lam: ids.filter(function (lid) { return lid !== propia && pend.indexOf(lid) < 0; }) });
      if (propia && pend.indexOf(propia) < 0) APP.lam.hit(propia, rec.ok && (!rec.marca || marcadoOk(it, rec.marca.comps || [])));
      var af = p.af[it.id] || (p.af[it.id] = { n: 0, ok: 0 }); af.n++; if (rec.ok) af.ok++; af.last = U.today();
    } else {
      APP.track({ sub: it.sub, ok: rec.ok, seg: rec.seg, lam: it.lam });
    }
    var x = APP.addXP(rec.ok ? 15 : 4);
    if (x.levelUp) APP.celebrarNivel(x.nivel);
    APP.store.save();
    return pend;
  }
  /* ¿El marcado de competencias o valores coincide con lo que mide la afirmación? */
  function marcadoOk(a, comps) {
    var real = a.real.length ? a.real : ["control"];
    return real.every(function (k) { return comps.indexOf(k) >= 0; }) && comps.every(function (k) { return real.indexOf(k) >= 0; });
  }
  APP.marcadoOk = marcadoOk;
  function avanzar(pr, S) {
    S.i++; S.sel = null; S.fase = "resp"; S.tItem = Date.now(); S.marca = { seg: null, como: [], comps: [], nota: "" };
    if (S.i >= pr.ids.length) { S.done = true; return terminarSim(pr, S); }
    APP.sfx("tap"); APP.rerender();
  }
  function salirSim(pr, S) {
    if (S.done || !S.items.length) { clearInterval(APP._clk); return true; }
    APP.sheet('<h2>¿Terminar ahora?</h2><p class="muted">Se guarda lo que respondiste y verás el resultado de ' + (S.items.length === 1 ? "ese punto" : "esos " + S.items.length + " puntos") + '.</p><div class="row"><button class="btn soft grow" data-act="close">Seguir</button><button class="btn dark grow" data-act="si">Terminar</button></div>',
      { si: function () { APP.closeSheet(); clearInterval(APP._clk); S.done = true; terminarSim(pr, S, true); } });
    return false;
  }
  function terminarSim(pr, S) {
    clearInterval(APP._clk);
    var p = APP.perfil(), likert = pr.tipo !== "func";
    if (pr.modo === "dia") { // afirmaciones de la misión: no se guardan como simulacro
      var okd = S.items.filter(function (x) { return x.ok; }).length, completo = S.items.length === pr.ids.length;
      APP.revealLaminas(S.pend, function () {
        APP.toast(okd + " de " + S.items.length + " extremos correctos", "check");
        if (pr.paso != null && completo) APP.pasoHecho(pr.paso); else APP.back();
      });
      return;
    }
    var resumen;
    if (likert) {
      var pts = S.items.reduce(function (a, x) { return a + x.pts; }, 0), max = 4 * S.items.length;
      resumen = Math.round(100 * pts / max) + " % de los puntos";
      if (S.items.length >= 15 && pts / max >= 0.9) APP.celebrarLogro(APP.logro(pr.tipo === "comp" ? "sim-comp" : "sim-integ"));
    } else {
      var ok = S.items.filter(function (x) { return x.ok; }).length;
      resumen = ok + " de " + S.items.length;
      if (S.items.length >= 10 && ok / S.items.length >= 0.8) APP.celebrarLogro(APP.logro("sim-func"));
    }
    var segs = S.items.filter(function (x) { return x.marca && (x.marca.seg === "Seguro" || x.marca.seg === "Lo domino"); });
    var tot = p.sim.intentos.reduce(function (a, x) { return a.concat(x.items); }, []).concat(S.items).filter(function (x) { return x.marca && (x.marca.seg === "Seguro" || x.marca.seg === "Lo domino"); });
    if (tot.length >= 10 && tot.filter(function (x) { return x.ok; }).length / tot.length >= 0.9) APP.celebrarLogro(APP.logro("brujula"));
    p.sim.intentos.push({ tipo: pr.tipo, ini: new Date(S.t0).toISOString(), fin: new Date().toISOString(), items: S.items, resumen: resumen, errores: !!pr.errores });
    APP.store.save();
    APP.sfx("level");
    APP.go("simres", { i: p.sim.intentos.length - 1 }, { replace: true });
    if (S.pend.length) setTimeout(function () { APP.revealLaminas(S.pend); }, 450);
  }

  function retroFuncInline(it, rec) {
    var o = it.ops[rec.resp], k = it.ops.findIndex(function (x) { return x.ok; });
    return '<div class="fb ' + (rec.ok ? "ok" : "bad") + '"><span class="h">' + (rec.ok ? "Correcta." : "No era esa: la clave es la " + LETRAS[k] + ".") + '</span><span class="small">' + esc(o.por) + "</span>" + (rec.ok ? "" : '<span class="small"><b>' + LETRAS[k] + ".</b> " + esc(it.ops[k].por) + "</span>") + '</div><div class="card sunk small"><b>Para llevarte</b><p style="margin-top:4px">' + esc(it.llevar) + "</p></div>";
  }
  function retroLikertInline(a, rec) {
    return '<div class="fb ' + (rec.ok ? "ok" : "bad") + '"><span class="h">' + (rec.ok ? "Extremo correcto." : "Era la " + claveTxt(a) + ".") + '</span><span class="small">Tu respuesta vale ' + rec.pts + " de 4 puntos (estimación).</span></div>" + likertPaseoHTML(a, rec, true);
  }
  function claveTxt(a) { return a.clave === "H" ? "respuesta honesta (A o B)" : a.clave === "D" ? "D (totalmente de acuerdo)" : "A (totalmente en desacuerdo)"; }

  /* =========================================================================
     AFIRMACIONES DE LA MISIÓN (práctica con explicación inmediata)
     ========================================================================= */
  V.likert = function (pr) {
    if (!pr.ids) {
      var p = APP.perfil(), pick = [];
      var elegir = function (tipo, n) {
        var pool = APP.afirmacionesDe(tipo, "dia");
        var nuevos = U.shuffle(pool.filter(function (a) { return !p.af[a.id]; }));
        var fallados = U.shuffle(pool.filter(function (a) { return p.af[a.id] && p.af[a.id].ok < p.af[a.id].n; }));
        var resto = pool.filter(function (a) { return p.af[a.id] && p.af[a.id].ok >= p.af[a.id].n; }).sort(function (x, y) { return (p.af[x.id].last || "") < (p.af[y.id].last || "") ? -1 : 1; });
        return nuevos.concat(fallados, resto).slice(0, n);
      };
      if (p.temas.comp) pick = pick.concat(elegir("comp", p.temas.integ ? 2 : 3));
      if (p.temas.integ) pick = pick.concat(elegir("integ", p.temas.comp ? 1 : 3));
      pr.ids = pick.map(function (a) { return a.id; });
      pr.tipo = "mix"; pr.modo = "dia";
    }
    return V.simplay(pr);
  };

  /* =========================================================================
     RESULTADOS Y DIAGNÓSTICO
     ========================================================================= */
  V.simres = function (pr) {
    var p = APP.perfil(), x = p.sim.intentos[pr.i]; if (!x) return { html: "" };
    var likert = x.tipo !== "func", n = x.items.length;
    var h = '<div class="scr">' + APP.top("Resultado");
    var dur = x.items.reduce(function (a, b) { return a + b.seg; }, 0), prom = n ? dur / n : 0;
    h += '<div class="card stack" style="text-align:center"><p class="tiny">' + esc({ func: "Prueba funcional", comp: "Prueba comportamental", integ: "Prueba de integridad" }[x.tipo]) + '</p><div style="font-size:52px;font-weight:800;line-height:1" class="num">' + esc(grande(x)) + '</div><p class="small muted" style="margin-top:-6px">' + esc(likert ? "de los puntos posibles (estimado)" : "casos correctos") + '</p><div class="row wrap" style="justify-content:center"><span class="chip">' + U.mmss(dur) + ' respondiendo</span><span class="chip">' + U.mmss(prom) + " por " + (likert ? "afirmación" : "caso") + "</span></div>" +
      '<p class="small muted">' + (likert ? "Meta de la prueba: unos 20 segundos por afirmación." : "En la prueba real hay unos 4 minutos por caso funcional, si las 90 afirmaciones toman menos de media hora.") + "</p></div>";
    h += diagnostico(x);
    h += "<h3>Punto por punto</h3><div class=\"stack\">" + x.items.map(function (r, j) {
      var it = likert ? afById(r.id) : casoById(r.id); if (!it) return "";
      var txt = likert ? it.texto : it.enunciado;
      return '<button class="menu-item" data-act="paseo" data-j="' + j + '"><span class="ic" style="background:' + (r.ok ? "var(--ok-bg)" : "var(--bad-bg)") + ";color:" + (r.ok ? "var(--ok)" : "var(--bad)") + '">' + APP.ic(r.ok ? "check" : "x") + '</span><span><b class="small" style="display:block;line-height:1.3">' + esc(txt.length > 90 ? txt.slice(0, 88) + "…" : txt) + "</b><small>" +
        (likert ? "Marcaste " + LETRAS[r.resp] + " · " + r.pts + "/4 · clave " + (it.clave === "H" ? "A o B" : it.clave) : "Marcaste " + LETRAS[r.resp] + " · clave " + LETRAS[it.ops.findIndex(function (o) { return o.ok; })]) + (r.marca ? " · " + esc(r.marca.seg) : "") + "</small></span>" + APP.ic("back", ' width="18" height="18" style="transform:rotate(180deg);opacity:.5"') + "</button>";
    }).join("") + "</div>";
    h += '<p class="tiny">Toca cualquier punto para ver el paseo del experto.</p></div>';
    return { tab: "sim", html: h, on: {
      paseo: function (el) { var j = +el.getAttribute("data-j"), r = x.items[j]; if (likert) APP.go("paseoL", { id: r.id, rec: r }); else APP.go("paseo", { caso: r.id, resp: r.resp, rec: r }); }
    } };
  };

  function grande(x) {
    if (x.tipo === "func") { var ok = x.items.filter(function (r) { return r.ok; }).length; return ok + " de " + x.items.length; }
    var pts = x.items.reduce(function (a, r) { return a + r.pts; }, 0); return Math.round(100 * pts / (4 * Math.max(1, x.items.length))) + " %";
  }
  function diagnostico(x) {
    var likert = x.tipo !== "func", items = x.items, h = '<div class="card stack"><h3>Diagnóstico</h3>';
    var conf = items.filter(function (r) { return r.marca && (r.marca.seg === "Seguro" || r.marca.seg === "Lo domino"); });
    var dud = items.filter(function (r) { return r.marca && (r.marca.seg === "Dudé" || r.marca.seg === "Adiviné"); });
    var frases = [];
    if (!likert) {
      var errs = {}; items.forEach(function (r) { if (!r.ok) { var c = casoById(r.id); var e = c.ops[r.resp].err || "otro"; errs[e] = (errs[e] || 0) + 1; } });
      var top = Object.keys(errs).sort(function (a, b) { return errs[b] - errs[a]; });
      if (!top.length) frases.push("<b>Sin errores.</b> Ahora el reto es hacerlo igual de bien en menos tiempo.");
      top.forEach(function (k) { var E = D.errores[k] || { nombre: "Otro", consejo: "" }; frases.push("<b>" + esc(E.nombre) + "</b> (" + errs[k] + "): " + esc(E.consejo)); });
      var lentos = items.filter(function (r) { return r.seg > 210; });
      if (lentos.length) frases.push("<b>Ritmo:</b> " + lentos.length + " caso" + (lentos.length > 1 ? "s" : "") + " te tomaron más de tres minutos y medio. En la prueba, anota su número y vuelve al final.");
    } else {
      var pat = { costo: 0, falla: 0, virtud: 0, control: 0, comp: 0 }, mezclas = {};
      items.forEach(function (r) {
        var a = afById(r.id); if (!a) return;
        if (!r.ok) {
          if (a.clave === "H") pat.control++;
          else if (a.condTipo === "costo" && a.clave === "D") pat.costo++;
          else if (a.condTipo === "falla") pat.falla++;
          else if (a.virtud) pat.virtud++;
        }
        if (r.marca && r.marca.comps && !marcadoOk(a, r.marca.comps)) {
          var real = a.real.length ? a.real : ["control"];
          var sobra = r.marca.comps.filter(function (k) { return real.indexOf(k) < 0; })[0];
          var falta = real.filter(function (k) { return r.marca.comps.indexOf(k) < 0; })[0];
          pat.comp++;
          var key = (falta || real[0]) + "→" + (sobra || "—");
          mezclas[key] = (mezclas[key] || 0) + 1;
        }
      });
      if (pat.costo) frases.push("<b>Costo leído como falla</b> (" + pat.costo + "): la segunda parte decía lo que cuesta hacer bien la conducta, y la leíste como incumplimiento. Pregúntate: ¿se vence un plazo, se deja a alguien sin atender, se salta un requisito? Si no, es costo.");
      if (pat.falla) frases.push("<b>Falla no vista</b> (" + pat.falla + "): la segunda parte traía un incumplimiento expreso que volteaba la afirmación.");
      if (pat.virtud) frases.push("<b>Virtud aparente</b> (" + pat.virtud + "): una palabra amable escondía la conducta contraria. Pregúntate qué hace la persona, no cómo suena.");
      if (pat.control) frases.push("<b>Control respondido como conducta</b> (" + pat.control + "): la afirmación hablaba de sentimientos o de perfección. Se responde con honestidad: A o B.");
      if (pat.comp) {
        var mz = Object.keys(mezclas).sort(function (a, b) { return mezclas[b] - mezclas[a]; })[0];
        var pr2 = mz.split("→");
        var a0 = pr2[0] === "control" ? "una afirmación de control" : nombreComp(pr2[0]);
        var b0 = pr2[1] === "—" ? null : (pr2[1] === "control" ? "una de control" : nombreComp(pr2[1]));
        frases.push("<b>" + (x.tipo === "integ" ? "Valores confundidos" : "Competencias confundidas") + "</b> (" + pat.comp + "): " + (b0 ? "lo más frecuente fue leer " + esc(a0) + " como " + esc(b0) : "lo más frecuente fue no marcar " + esc(a0)) + ". Abre el paseo de esos puntos: ahí se explica cómo distinguirlas.");
      }
      if (!frases.length) frases.push("<b>Sin errores de extremo.</b> Revisa el marcado de competencias: es lo que te prepara para las afirmaciones más difíciles.");
    }
    var cOk = conf.filter(function (r) { return r.ok; }).length, dOk = dud.filter(function (r) { return r.ok; }).length;
    if (conf.length || dud.length) frases.push("<b>Calibración:</b> " + [conf.length ? "cuando marcaste seguridad acertaste " + cOk + " de " + conf.length : "", dud.length ? (conf.length ? "cuando dudaste, " : "cuando dudaste acertaste ") + dOk + " de " + dud.length : ""].filter(Boolean).join("; ") + "." +
      (conf.length && cOk / conf.length < 0.8 ? " Tu «seguro» todavía no es confiable: antes de fijar, busca la condición que falta." : (dud.length && dOk / dud.length < 0.5 ? " Tu duda te avisa algo: cuando dudes, vuelve al caso." : "")));
    var notas = items.filter(function (r) { return r.marca && r.marca.nota; });
    if (notas.length) frases.push("<b>Tus notas:</b> escribiste " + notas.length + ". Van en el reporte para Claude, que las usa para ajustar los próximos casos.");
    return h + frases.map(function (f) { return '<p class="small">' + f + "</p>"; }).join("") + "</div>";
  }

  /* =========================================================================
     PASEO DEL EXPERTO · funcional
     ========================================================================= */
  function marcar(text, marks, nuevos) {
    // marks: [{s, c, n, nuevo}] → HTML con resaltados, sin solapes
    var ranges = [];
    marks.forEach(function (m) {
      var i = text.indexOf(m.s); if (i < 0) return;
      var r = { a: i, b: i + m.s.length, c: m.c, n: m.n, nuevo: m.nuevo };
      if (!ranges.some(function (x) { return !(r.b <= x.a || r.a >= x.b); })) ranges.push(r);
    });
    ranges.sort(function (x, y) { return x.a - y.a; });
    var out = "", pos = 0;
    ranges.forEach(function (r) {
      out += esc(text.slice(pos, r.a)) + '<span class="mk ' + r.c + (r.nuevo ? " sweep" : " dim") + '">' + esc(text.slice(r.a, r.b)) + "</span>" + (r.nuevo && r.n ? '<span class="note">' + esc(r.n) + "</span>" : "");
      pos = r.b;
    });
    return out + esc(text.slice(pos));
  }
  V.paseo = function (pr) {
    var c = casoById(pr.caso), step = pr.step || 0, N = c.paseo.length + 1, fin = step >= c.paseo.length;
    var marks = [];
    for (var s = 0; s <= Math.min(step, c.paseo.length - 1); s++) (c.paseo[s].m || []).forEach(function (m) { marks.push({ s: m.s, c: m.c, n: m.n, nuevo: s === step }); });
    var focusOps = !fin ? (c.paseo[step].o || []) : [0, 1, 2];
    var h = '<div class="scr full paseo">' + APP.top("Paseo del experto", { close: true });
    h += '<div class="legend"><span class="chip y">Plazos</span><span class="chip b">Actos y hechos</span><span class="chip p">Cifras</span><span class="chip o">Trampas</span><span class="chip g">Lo que decide</span></div>';
    h += '<div class="card stack"><span class="tiny">Caso · ' + esc(D.tecnicas[c.tec] || "") + '</span><div class="paseo-text">' + marcar(c.caso, marks) + '</div><p class="q">' + marcar(c.enunciado, marks) + "</p></div>";
    h += '<div class="opts">' + c.ops.map(function (o, j) {
      var show = focusOps.indexOf(j) >= 0;
      var cls = "opt" + (show ? (o.ok ? " ok" : " bad") : "") + (pr.resp === j ? " sel" : "") + (show ? " focus-op" : "");
      return '<div class="' + cls + '"><span class="L">' + LETRAS[j] + '</span><span>' + marcar(o.t, marks) + (pr.resp === j ? ' <span class="chip" style="font-size:12px;padding:2px 8px">tu respuesta</span>' : "") + (show ? '<br><span class="small muted">' + esc(o.por) + "</span>" : "") + "</span></div>";
    }).join("") + "</div>";
    h += "</div>";
    // Panel del experto: queda fijo abajo mientras el caso se resalta arriba.
    var st = !fin ? c.paseo[step] : null;
    h += '<div class="coach" role="region" aria-label="Explicación del experto"><div class="coach-in">' +
      '<div class="row spread"><span class="k">Paso ' + (step + 1) + " de " + N + '</span><div class="dots">' + Array.apply(null, Array(N)).map(function (_, i) { return '<i class="' + (i === step ? "on" : "") + '"></i>'; }).join("") + "</div></div>" +
      (st ? "<h3>" + esc(st.t) + '</h3><p class="read">' + esc(st.txt) + "</p>"
          : '<h3>Para llevarte</h3><p class="read">' + esc(c.llevar) + '</p><div class="row wrap">' + c.lam.map(function (l) { var L = lamById(l); return '<button class="chip ' + APP.lamColor(L) + '" data-act="lamina" data-id="' + l + '">' + esc(L.t) + "</button>"; }).join("") + "</div>") +
      '</div><div class="row">' + (step > 0 ? '<button class="btn soft grow" data-act="prev">Anterior</button>' : "") + (!fin ? '<button class="btn cta grow" data-act="nx">Siguiente paso</button>' : '<button class="btn cta grow" data-act="back">Listo</button>') + "</div></div>";
    return { tab: false, html: h,
      mount: function (root) {
        APP.sfx(step === 0 && !pr.played ? "flip" : "swish"); pr.played = true;
        var coach = root.querySelector(".coach"), scr = root.querySelector(".scr");
        function ajustar() { if (coach && scr) scr.style.paddingBottom = (coach.offsetHeight + 24) + "px"; }
        ajustar(); setTimeout(ajustar, 60);
        setTimeout(function () {
          var t = root.querySelector(fin ? ".opt.ok" : ".mk.sweep") || root.querySelector(".opt.focus-op");
          if (!t) return;
          var r = t.getBoundingClientRect(), libre = window.innerHeight - (coach ? coach.offsetHeight : 0);
          var y = window.scrollY + r.top - Math.max(70, (libre - r.height) / 2);
          window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
        }, 120);
      },
      on: { nx: function () { APP.go("paseo", Object.assign({}, pr, { step: step + 1 }), { replace: true, keep: true }); }, prev: function () { APP.go("paseo", Object.assign({}, pr, { step: step - 1 }), { replace: true, keep: true }); } } };
  };

  /* =========================================================================
     PASEO DEL EXPERTO · afirmaciones
     ========================================================================= */
  function likertPaseoHTML(a, rec, compact) {
    var ind = a.ind ? D.indicadores[a.ind] : null;
    var marks = [{ s: a.conducta, c: "b", n: "Conducta", nuevo: true }];
    if (a.condicion) marks.push({ s: a.condicion, c: a.condTipo === "falla" ? "p" : (a.condTipo === "costo" ? "g" : "y"), n: a.condTipo === "falla" ? "Falla" : (a.condTipo === "costo" ? "Costo" : "Condición"), nuevo: true });
    if (a.virtud && a.virtud !== a.condicion) marks.push({ s: a.virtud, c: "o", n: "Distrae", nuevo: true });
    var h = '<div class="paseo-step"><span class="k">1 · La conducta</span><p class="paseo-text">' + marcar(a.texto, marks) + "</p><p class=\"small\">" + esc(a.exp.conducta) + "</p>" +
      (ind ? '<p class="tiny">' + esc(D.competencias[ind.comp].nombre) + " · nivel " + ind.nivel + ": " + esc(ind.resumen) + "</p>" : "") +
      (a.val && D.valores[a.val] ? '<p class="tiny">' + esc(D.valores[a.val].nombre) + ": " + esc(D.valores[a.val].def) + "</p>" : "") + "</div>";
    h += '<div class="paseo-step"><span class="k">2 · La condición</span><p class="small">' + esc(a.exp.condicion) + "</p></div>";
    h += '<div class="paseo-step"><span class="k">3 · El extremo</span><p class="small"><b>' + esc(a.exp.extremo) + "</b></p></div>";
    if (a.exp.atractor) h += '<div class="paseo-step"><span class="k">La colisión</span><p class="small">' + esc(a.exp.atractor) + "</p></div>";
    if (rec && rec.marca) {
      var real = a.real.length ? a.real : ["control"];
      var marc = rec.marca.comps || [];
      var bien = marcadoOk(a, marc);
      var sobran = marc.filter(function (k) { return real.indexOf(k) < 0; }), faltan = real.filter(function (k) { return marc.indexOf(k) < 0; });
      var nom = function (k) { return k === "control" ? "ninguna (es de control)" : nombreComp(k); };
      h += '<div class="paseo-step"><span class="k">Tu marcado de ' + (a.tipo === "comp" ? "competencias" : "valores") + '</span>' +
        '<div class="fb ' + (bien ? "ok" : "bad") + '" style="margin:6px 0"><span class="h">' + (bien ? "Marcado exacto" : "Marcado por ajustar") + '</span><span class="small">Marcaste: <b>' + (marc.length ? marc.map(nom).map(esc).join(", ") : "nada") + "</b>. Se mide: <b>" + real.map(nom).map(esc).join(", ") + "</b>.</span></div>" +
        (sobran.length ? '<p class="small">' + sobran.map(function (k) { return k === "control" ? "No es de control: describe una conducta que se puede evaluar." : (k === a.atractor ? "<b>" + esc(nombreComp(k)) + "</b> es justamente " + (a.tipo === "comp" ? "la competencia" : "el valor") + " que distrae en esta afirmación." : "<b>" + esc(nombreComp(k)) + "</b> no es " + (a.tipo === "comp" ? "la que se mide" : "el que se mide") + " aquí."); }).join(" ") + "</p>" : "") +
        (faltan.length ? '<p class="small">' + faltan.map(function (k) { return k === "control" ? "Era de control: no describe una conducta evaluable sino un sentimiento o una perfección." : "Te faltó <b>" + esc(nombreComp(k)) + "</b>."; }).join(" ") + "</p>" : "") +
        '<p class="small"><b>Cómo detectarla:</b> ' + esc(a.exp.detectar) + "</p></div>";
    } else {
      h += '<div class="paseo-step"><span class="k">Cómo detectarla</span><p class="small">' + esc(a.exp.detectar) + "</p></div>";
    }
    return h;
  }
  V.paseoL = function (pr) {
    var a = afById(pr.id), rec = pr.rec;
    var h = '<div class="scr full">' + APP.top("Paseo del experto", { close: true }) +
      '<div class="legend"><span class="chip b">Conducta</span><span class="chip g">Costo</span><span class="chip p">Falla</span><span class="chip o">Distrae</span></div>' +
      '<div class="fb ' + (rec.ok ? "ok" : "bad") + '"><span class="h">' + (rec.ok ? "Extremo correcto" : "La clave era " + esc(claveTxt(a))) + '</span><span class="small">Marcaste ' + LETRAS[rec.resp] + " (" + esc(D.proyectos[0].likert[rec.resp]) + ") · " + rec.pts + " de 4 puntos estimados.</span></div>" +
      likertPaseoHTML(a, rec) + '<p class="tiny">Las claves son criterio de Claude con el método de los tres pasos: la guía no publica claves oficiales.</p><div class="sticky-foot"><button class="btn cta block" data-act="back">Listo</button></div></div>';
    return { tab: false, html: h, mount: function () { APP.sfx("swish"); } };
  };

  /* =========================================================================
     ESTADÍSTICAS Y PRIORIDADES
     ========================================================================= */
  var TIER = { segura: 4, alta: 3, media: 2, baja: 1 };
  APP.prioridades = function () {
    var p = APP.perfil(), u = APP.usuario(), out = [];
    Object.keys(D.subtemas).forEach(function (k) {
      var s = D.subtemas[k]; if (!p.temas[s.tema]) return;
      var dom = APP.dominio(k);
      var fam = APP.gen.FAM_IDS.filter(function (f) { return APP.gen.FAM[f].sub === k; })[0];
      var esc1 = D.escenas.filter(function (e) { return e.lam.some(function (l) { return lamById(l).sub === k; }) && !(p.esc[e.id] && p.esc[e.id].done); })[0];
      var caso = D.casos.filter(function (c) { return c.sub === k; })[0];
      var como = [];
      if (esc1) como.push("ver la escena «" + esc1.titulo + "»");
      como.push("hacer dos rondas de refuerzo de este tema");
      if (caso) como.push("resolver en el simulacro un caso de este tema y recorrer su paseo del experto");
      out.push({ k: k, tipo: "func", nombre: s.nombre, prob: s.prob, dom: dom, porque: s.porque, como: como.join(", luego "), sub: k, fam: fam,
        motivo: "Probabilidad " + D.probTexto[s.prob].toLowerCase() + " de salir" + (dom == null ? " y todavía no lo has practicado." : " y tu dominio va en " + Math.round(dom * 100) + " %.") });
    });
    if (p.temas.comp) u.indicadores.forEach(function (ind) {
      var I = D.indicadores[ind], dom = APP.dominio("c:" + ind), nombre = D.competencias[I.comp].nombre + " · nivel " + I.nivel;
      out.push({ k: "c:" + ind, tipo: "comp", nombre: nombre, prob: "segura", dom: dom, porque: "Está en tus ejes oficiales. Son 60 afirmaciones para tus 10 indicadores: si se reparten parejo, unas seis por indicador (la guía no publica el reparto).", como: "repasar su lámina en el álbum y hacer el simulacro comportamental; en cada error, abre el paseo", sub: "c:" + ind,
        motivo: "Muy probable: está en tus ejes" + (dom == null ? "; aún sin práctica." : "; dominio " + Math.round(dom * 100) + " %.") });
    });
    if (p.temas.integ) Object.keys(D.valores).forEach(function (v) {
      var dom = APP.dominio("v:" + v);
      out.push({ k: "v:" + v, tipo: "integ", nombre: "Integridad · " + D.valores[v].nombre, prob: "segura", dom: dom, porque: "Los cinco valores son los ejes de integridad. Son 30 afirmaciones: si se reparten parejo, unas seis por valor (la guía no publica el reparto).", como: "repasar la lámina del valor y hacer el simulacro de integridad", sub: "v:" + v,
        motivo: "Muy probable" + (dom == null ? "; aún sin práctica." : "; dominio " + Math.round(dom * 100) + " %.") });
    });
    var peso = { func: 1, comp: 0.45, integ: 0.4 };
    out.forEach(function (x) { var d = x.dom == null ? 0.25 : x.dom; x.score = (TIER[x.prob] || 1) * (1 - d) * peso[x.tipo] * (x.tipo === "func" ? 1.2 : 1); });
    return out.filter(function (x) { return x.dom == null || x.dom < 0.8; }).sort(function (a, b) { return b.score - a.score; });
  };
  V.stats = function () {
    var p = APP.perfil(), lista = APP.prioridades();
    var h = '<div class="scr">' + APP.top("Mis estadísticas");
    var primero = lista[0];
    if (primero) h += '<div class="card stack" style="border:2px solid var(--ink)"><p class="tiny">Tu prioridad de hoy</p><h2 style="margin:0">' + esc(primero.nombre) + '</h2><p class="small">' + esc(primero.motivo) + '</p><p class="small"><b>Cómo reforzarlo:</b> ' + esc(primero.como) + ".</p>" + (primero.tipo === "func" ? '<button class="btn cta block" data-act="ref" data-s="' + primero.sub + '">Reforzar ahora</button>' : '<button class="btn cta block" data-act="simk" data-k="' + primero.tipo + '">Ir al simulacro</button>') + "</div>";
    [["func", "Funcional", "65 % del puntaje · eliminatoria"], ["comp", "Comportamental", "15 % del puntaje"], ["integ", "Integridad", "10 % del puntaje"]].forEach(function (t) {
      var items = lista.filter(function (x) { return x.tipo === t[0]; });
      if (!items.length) return;
      h += '<div class="row spread"><h3>' + t[1] + '</h3><span class="tiny">' + t[2] + '</span></div><div class="stack">' + items.map(function (x) {
        return '<div class="prio"><span class="nm">' + esc(x.nombre) + '</span><span class="chip ' + (x.prob === "alta" || x.prob === "segura" ? "p" : x.prob === "media" ? "y" : "") + '">' + esc(D.probTexto[x.prob]) + "</span>" +
          '<div class="bar g"><i style="width:' + (x.dom == null ? 0 : Math.round(x.dom * 100)) + '%"></i></div><span class="how">' + (x.dom == null ? "Sin práctica todavía. " : "Dominio " + Math.round(x.dom * 100) + " %. ") + "Cómo: " + esc(x.como) + ".</span>" +
          (x.tipo === "func" ? '<button class="link" data-act="ref" data-s="' + x.sub + '">Reforzar este tema</button>' : "") + '<button class="link" data-act="porque" data-k="' + x.k + '">¿Por qué esta probabilidad?</button></div>';
      }).join("") + "</div>";
    });
    if (!lista.length) h += '<div class="empty">Vas por encima del 80 % en todo lo que entrenas. Sigue con la misión diaria para que no se oxide.</div>';
    // Calibración y ritmo
    var all = p.sim.intentos.reduce(function (a, x) { return a.concat(x.items.map(function (r) { r._t = x.tipo; return r; })); }, []);
    var seguros = all.filter(function (r) { return r.marca && (r.marca.seg === "Seguro" || r.marca.seg === "Lo domino"); }), dudas = all.filter(function (r) { return r.marca && (r.marca.seg === "Dudé" || r.marca.seg === "Adiviné"); });
    var func = all.filter(function (r) { return r._t === "func"; }), lk = all.filter(function (r) { return r._t !== "func"; });
    var dias = Object.keys(p.dias).sort().slice(-7);
    h += '<div class="card stack"><h3>Calibración y ritmo</h3><div class="kv">' +
      "<span>Aciertos cuando marcas seguridad</span><b>" + (seguros.length ? seguros.filter(function (r) { return r.ok; }).length + "/" + seguros.length : "—") + "</b>" +
      "<span>Aciertos cuando dudas</span><b>" + (dudas.length ? dudas.filter(function (r) { return r.ok; }).length + "/" + dudas.length : "—") + "</b>" +
      "<span>Tiempo promedio por caso funcional</span><b>" + (func.length ? U.mmss(func.reduce(function (a, r) { return a + r.seg; }, 0) / func.length) : "—") + "</b>" +
      "<span>Tiempo promedio por afirmación</span><b>" + (lk.length ? U.mmss(lk.reduce(function (a, r) { return a + r.seg; }, 0) / lk.length) : "—") + "</b>" +
      "<span>Racha más larga</span><b>" + p.racha.max + (p.racha.max === 1 ? " día" : " días") + "</b>" +
      "<span>XP de los últimos 7 días</span><b>" + dias.reduce(function (a, d) { return a + p.dias[d].xp; }, 0) + "</b></div></div>";
    h += '<details class="card"><summary><b>¿Cómo se calcula todo esto?</b></summary><div class="stack small" style="margin-top:10px"><p>El <b>dominio</b> mezcla el nivel de tus láminas de ese tema con tus aciertos más recientes en él.</p><p>La <b>probabilidad</b> es criterio de Claude: mira si el tema está en sus ejes oficiales, si se puede volver juicio situacional y si tiene cifras o excepciones que el operador suele usar. Comportamental e integridad son «muy alta» porque son ejes oficiales. Pero cada afirmación comportamental vale cerca de un cuarto de punto y cada una de integridad un tercio, mientras que un caso funcional vale cerca de un punto. Por eso la prioridad de hoy pondera las dos cosas.</p></div></details>';
    h += "</div>";
    return { tab: "home", html: h, on: {
      ref: function (el) { APP.go("rafaga", { mode: "refuerzo", n: 8, sub: el.getAttribute("data-s") }); },
      simk: function () { APP.go("sim", {}, { reset: true }); },
      porque: function (el) { var x = lista.filter(function (z) { return z.k === el.getAttribute("data-k"); })[0]; APP.sheet("<h2>" + esc(x.nombre) + '</h2><p><span class="chip p">' + esc(D.probTexto[x.prob]) + '</span></p><p class="read">' + esc(x.porque) + '</p><p class="tiny">Criterio de Claude, no dato oficial.</p><button class="btn soft block" data-act="close">Cerrar</button>', {}); }
    } };
  };

  /* =========================================================================
     LOGROS
     ========================================================================= */
  V.logros = function () {
    var p = APP.perfil();
    var h = '<div class="scr">' + APP.top("Logros") + '<div class="grid2">' + APP.logrosDef.map(function (l) {
      var on = !!p.logros[l.id];
      return '<div class="card stack" style="' + (on ? "" : "opacity:.55") + '"><span class="ico" style="width:42px;height:42px;border-radius:14px;display:grid;place-items:center;background:' + (on ? "var(--hl-y)" : "var(--sunken)") + ';color:#13182B">' + APP.ic(on ? "trophy" : "lock") + "</span><b>" + esc(l.t) + '</b><span class="small muted">' + esc(l.d) + "</span></div>";
    }).join("") + "</div></div>";
    return { tab: "home", html: h };
  };

  /* =========================================================================
     INSTALAR
     ========================================================================= */
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault(); APP.installPrompt = e;
    var c = APP.current && APP.current();
    if (c && (c.name === "instalar" || c.name === "onb")) APP.rerender();
  });
  APP.plataforma = function () {
    var ua = navigator.userAgent || "";
    var ios = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    var android = /Android/.test(ua), samsung = /SamsungBrowser/.test(ua);
    var standalone = (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
    var safari = ios && /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|GSA/.test(ua);
    return { ios: ios, android: android, samsung: samsung, standalone: standalone, safari: safari };
  };
  V.instalar = function () {
    var pl = APP.plataforma(), url = location.origin + location.pathname.replace(/index\.html$/, ""), dir = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
    var I = function (k) { return '<span class="ill">' + APP.ic(k) + "</span>"; };
    var paso = function (t) { return "<li><span>" + t + "</span></li>"; };
    var h = '<div class="scr">' + APP.top("Instalar en el celular");
    if (pl.standalone) {
      h += '<div class="card stack"><h2>Ya está instalada</h2><p class="muted">La abriste desde el ícono de tu pantalla de inicio. No tienes que hacer nada más.</p></div>';
    } else if (pl.ios) {
      h += '<p class="lede">En el iPhone se instala desde Safari. No pasa por la App Store y se quita como cualquier ícono. Haz un paso a la vez.</p>';
      if (!pl.safari) h += '<div class="card stack" style="box-shadow:0 0 0 2px var(--bad)"><b>Estás en otro navegador. Ábrela en Safari.</b><p class="small">Toca «Copiar la dirección», abre <b>Safari</b> (la brújula azul), toca la barra de la dirección, mantén el dedo y toca <b>Pegar y abrir</b>.</p><button class="btn soft block" data-act="copiarDir">Copiar la dirección</button></div>';
      h += '<ol class="steps-guide">' +
        paso("Mira la parte de <b>abajo</b> de Safari. Si no ves ninguna barra, toca una vez el borde de abajo de la pantalla y aparece.") +
        paso("Si en esa barra ves un <b>cuadrado con una flecha hacia arriba</b> " + I("share") + ", tócalo y salta al paso 4.") +
        paso("Si en cambio ves <b>tres puntitos</b> " + I("dots") + " (a la derecha de la barra donde está la dirección), tócalos. Se abre un menú: toca <b>Compartir</b> " + I("share") + ".") +
        paso("Se abre una hoja con íconos de apps arriba y una lista de acciones abajo. Desliza esa lista hacia arriba con el dedo hasta ver <b>Agregar a inicio</b> " + I("plusbox") + " (puede decir <b>Agregar a pantalla de inicio</b>). Tócalo.") +
        paso("Si no está en la lista: al final de la lista toca <b>Editar acciones</b>, busca <b>Agregar a inicio</b>, toca el <b>+</b> verde y luego <b>OK</b> arriba. Vuelve a la lista y tócalo.") +
        paso("Aparece una ventanita con el ícono (un chulo amarillo) y el nombre <b>" + esc(APP.cfg.nombre) + "</b>. Si hay un interruptor <b>Abrir como app web</b>, déjalo encendido (en verde).") +
        paso("Toca <b>Agregar</b>, arriba a la derecha de esa ventanita.") +
        paso("Sal de Safari: desliza el dedo hacia arriba desde el borde inferior de la pantalla. Busca el ícono <b>" + esc(APP.cfg.nombre) + "</b>; si no lo ves, desliza las páginas de apps hacia la izquierda hasta la última.") +
        paso("Toca el ícono para abrirla. <b>Desde ahora ábrela siempre desde ese ícono</b>, no desde Safari: lo que hagas en Safari no pasa a la app instalada.") + "</ol>" +
        '<div class="card sunk small"><b>Para ver el ícono más grande:</b> mantén el dedo sobre un espacio vacío de la pantalla de inicio hasta que los íconos se muevan, toca <b>Editar</b> arriba a la izquierda, luego <b>Personalizar</b> y elige <b>Grande</b>.</div>';
    } else if (pl.android && pl.samsung) {
      h += '<div class="card stack" style="box-shadow:0 0 0 2px var(--bad)"><b>En el Samsung, instálala desde Chrome, no desde este navegador.</b><p class="small">Si la instalas desde <b>Samsung Internet</b>, Google Play Protect la bloquea con el aviso «Se bloqueó la app no segura». Si te aparece, toca <b>Entendido</b> y <b>no</b> toques «Instalar de todas formas».</p></div>' +
        '<ol class="steps-guide">' +
        paso("Toca el botón amarillo <b>Copiar la dirección</b> que está aquí abajo.") +
        paso("Sal de este navegador: desliza el dedo hacia arriba desde el borde inferior de la pantalla.") +
        paso("Abre <b>Chrome</b>: es un círculo rojo, amarillo y verde con el centro azul. Si no lo ves, desliza hacia arriba en la pantalla de inicio para ver todas las apps y escribe <b>Chrome</b> en la barra de búsqueda de arriba.") +
        paso("En Chrome, toca la barra de arriba que dice <b>Buscar o escribir dirección web</b>, mantén el dedo en ella y toca <b>Pegar</b>. Luego toca la tecla azul de la flecha del teclado.") +
        paso("Se abre Mérito dentro de Chrome. Toca <b>Cómo instalarla</b> y sigue los pasos que te muestra ahí.") + "</ol>" +
        '<button class="btn cta block" data-act="copiarDir">Copiar la dirección</button>';
    } else if (pl.android) {
      h += '<p class="lede">En el Samsung se instala desde <b>Chrome</b>. No pasa por Play Store y se quita como cualquier app. Haz un paso a la vez.</p>';
      if (APP.installPrompt) h += '<div class="card stack"><b>La forma más fácil</b><ol class="steps-guide">' + paso("Toca el botón amarillo <b>Instalar ahora</b>.") + paso("Abajo aparece una ventanita con el ícono y el nombre <b>" + esc(APP.cfg.nombre) + "</b>. Toca <b>Instalar</b>.") + '</ol><button class="btn cta block" data-act="inst">Instalar ahora</button></div><h3>Si el botón no funciona</h3>';
      h += '<ol class="steps-guide">' +
        paso("Arriba a la derecha de Chrome, al lado de la barra de la dirección, toca los <b>tres puntos en columna</b> " + I("menuv") + ".") +
        paso("Se abre una lista. Toca <b>Instalar app</b> " + I("phone") + ". Si no aparece, toca <b>Agregar a la pantalla principal</b>: es lo mismo.") +
        paso("Aparece una ventanita con el ícono (un chulo amarillo) y el nombre <b>" + esc(APP.cfg.nombre) + "</b>. Toca <b>Instalar</b>.") +
        paso("Espera unos segundos. El ícono <b>" + esc(APP.cfg.nombre) + "</b> aparece en la pantalla de inicio; si no, desliza hacia arriba para ver todas las apps y búscalo ahí.") +
        paso("Ábrela tocando ese ícono. Desde ahora, siempre desde ahí.") + "</ol>" +
        '<div class="card stack small"><b>Si sale el aviso de Google Play Protect</b><p>Toca <b>Entendido</b> y <b>no</b> toques «Instalar de todas formas». Puedes usar la app aquí mismo en Chrome mientras tanto (los avisos también funcionan así) y escríbele a Claude lo que pasó.</p></div>' +
        '<div class="card sunk small"><b>Para ver el ícono más grande:</b> mantén el dedo sobre un espacio vacío de la pantalla de inicio, toca <b>Ajustes</b> y en <b>Cuadrícula de la pantalla de inicio</b> elige una con menos íconos (por ejemplo 4 × 5). Todos los íconos se agrandan.</div>';
    } else {
      h += '<p class="lede">Esta app está hecha para el celular. Ábrela desde el iPhone o el Samsung con esta dirección:</p><div class="card" style="text-align:center"><b style="font-size:22px">' + esc(dir) + '</b>' + (APP.qr ? '<div style="max-width:220px;margin:12px auto">' + APP.qr + "</div><p class=\"tiny\">O apunta la cámara del celular a este código.</p>" : "") + "</div>";
    }
    h += '<details class="card"><summary><b>¿Es seguro?</b></summary><div class="stack small" style="margin-top:10px"><p>Sí. Es una página web que el celular guarda como app: no puede leer tus fotos, contactos ni mensajes, y solo te pedirá un permiso si activas los avisos.</p><p>No afecta tus otras aplicaciones ni el funcionamiento del celular. Para quitarla, mantén el dedo sobre el ícono y elige eliminar.</p></div></details></div>';
    return { tab: APP.perfil() ? "home" : false, html: h, on: {
      inst: function () { var e = APP.installPrompt; if (!e) return; e.prompt(); e.userChoice.then(function (r) { if (r.outcome === "accepted") APP.toast("Instalada. Búscala en tu pantalla de inicio.", "check"); APP.installPrompt = null; APP.rerender(); }); },
      copiarDir: function () { copiar(dir); }
    } };
  };

  /* =========================================================================
     AVISOS
     ========================================================================= */
  function b64ToU8(s) { var pad = "=".repeat((4 - s.length % 4) % 4), b = (s + pad).replace(/-/g, "+").replace(/_/g, "/"), raw = atob(b), a = new Uint8Array(raw.length); for (var i = 0; i < raw.length; i++) a[i] = raw.charCodeAt(i); return a; }
  V.avisos = function (pr) {
    var pl = APP.plataforma(), st = APP.store.raw(), soporta = "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
    var perm = ("Notification" in window) ? Notification.permission : "no";
    var activo = st.avisos && !st.avisosRoto && perm === "granted";
    var h = '<div class="scr">' + APP.top("Avisos diarios") +
      '<p class="lede">Dos avisos al día en la parte de arriba del celular, como cuando llega un mensaje: uno hacia las <b>6:30 a. m.</b> con tu misión y una pregunta del día, y otro hacia las <b>8:00 p. m.</b> que te dice si tu racha está asegurada o en peligro.</p>';
    if (pl.ios && !pl.standalone) h += '<div class="card stack"><b>Primero instala la app.</b><p class="small">En el iPhone los avisos solo funcionan si la abres desde el ícono de tu pantalla de inicio.</p><button class="btn soft block" data-act="go" data-view="instalar">Cómo instalarla</button></div>';
    else if (!soporta) h += '<div class="card"><b>Este navegador no permite avisos.</b><p class="small">Instala la app en la pantalla de inicio y ábrela desde el ícono.</p></div>';
    else if (!APP.cfg.vapid) h += '<div class="card"><b>Los avisos se activan en la siguiente actualización.</b><p class="small">Claude está preparando el servicio que los envía. Cuando esté listo, aquí aparecerá el botón.</p></div>';
    else if (perm === "denied") h += '<div class="card stack"><b>Los avisos están bloqueados en este celular.</b><p class="small">' + (pl.ios ? "Abre la app <b>Ajustes</b> del iPhone → <b>Notificaciones</b> → busca <b>" + esc(APP.cfg.nombre) + "</b> → enciende <b>Permitir notificaciones</b>. Luego vuelve aquí." : "Mantén el dedo sobre el ícono de la app → toca <b>Información de la app</b> (la «i») → <b>Notificaciones</b> → enciéndelas. Luego vuelve aquí.") + "</p></div>";
    else if (activo && !pr.codigo) h += '<div class="card stack" style="box-shadow:0 0 0 2px var(--ok)"><b>' + APP.ic("check", ' width="18" height="18"') + ' Avisos activados en este celular</b><p class="small">Desde el ' + esc(st.avisos.fecha) + '. Si ya le enviaste el código a Claude, no tienes que hacer nada más.</p><div class="row wrap"><button class="btn soft grow" data-act="probar">Probar un aviso</button><button class="btn line grow" data-act="vercod">Ver el código</button></div></div>';
    else if (!pr.codigo) h += '<button class="btn cta block" data-act="activar">' + (st.avisosRoto ? "Activar los avisos otra vez" : "Activar avisos en este celular") + '</button><p class="tiny" style="text-align:center">El celular te preguntará si permites notificaciones: toca <b>Permitir</b>.</p>';
    if (pr.codigo) h += '<div class="card stack" style="box-shadow:0 0 0 2px var(--hl-y)"><b>Último paso: envíale este código a Claude</b><ol class="small" style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:6px"><li>Toca <b>Copiar</b>.</li><li>Abre la app de Claude (o claude.ai) y entra al chat donde construyeron esta app.</li><li>Mantén el dedo en el cuadro de escribir, toca <b>Pegar</b> y envía.</li></ol><p class="small">Claude lo registra y, unos minutos después, te llega un aviso de bienvenida. Ese aviso confirma que todo quedó bien.</p><div class="kbd-code">' + esc(pr.codigo) + '</div><div class="row"><button class="btn dark grow" data-act="copiar">Copiar</button>' + (navigator.share ? '<button class="btn soft grow" data-act="compartir">Compartir</button>' : "") + "</div></div>";
    h += '<details class="card"><summary><b>¿Y por WhatsApp?</b></summary><p class="small" style="margin-top:8px">No conviene. WhatsApp solo permite mensajes automáticos desde cuentas empresariales verificadas por Meta, con un número aparte, plantillas aprobadas y cobro por mensaje. Los servicios gratuitos que lo hacen por la puerta de atrás convierten tu WhatsApp en un robot: pueden bloquearte el número y dejan tus chats en manos de un tercero. El aviso de la app llega igual de visible, es gratis y sabe cómo vas.</p></details>' +
      '<details class="card"><summary><b>¿Qué datos salen del celular?</b></summary><p class="small" style="margin-top:8px">Solo la «dirección» de tu celular para recibir avisos, y se guarda cifrada. Tu avance, tus respuestas y tus notas nunca salen del celular: el aviso se arma dentro del teléfono con lo que la app ya sabe de ti.</p></details></div>';
    function generar(sub) {
      var j = sub.toJSON();
      var out = { e: j.endpoint, k: j.keys, q: APP.perfil().who, d: APP.plataforma().ios ? "iphone" : "android" };
      st.avisos = { endpoint: j.endpoint, fecha: U.today() }; st.avisosRoto = false; APP.store.save();
      return "AVISO-" + btoa(unescape(encodeURIComponent(JSON.stringify(out))));
    }
    return { tab: "home", html: h, on: {
      activar: function (el) {
        el.disabled = true;
        Notification.requestPermission().then(function (res) {
          if (res !== "granted") { APP.toast("Sin permiso no se pueden enviar avisos"); APP.rerender(); return; }
          return navigator.serviceWorker.ready.then(function (reg) {
            return reg.pushManager.getSubscription().then(function (s) {
              if (s && st.avisosRoto) return s.unsubscribe().then(function () { return null; });
              return s;
            }).then(function (s) { return s || reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64ToU8(APP.cfg.vapid) }); });
          }).then(function (sub) {
            APP.sfx("ok"); APP.go("avisos", { codigo: generar(sub) }, { replace: true });
          });
        }).catch(function (e) { APP.logError(e, "avisos"); APP.toast("No se pudo activar. Ábrela desde el ícono e intenta de nuevo."); APP.rerender(); });
      },
      vercod: function () {
        navigator.serviceWorker.ready.then(function (reg) { return reg.pushManager.getSubscription(); }).then(function (sub) {
          if (!sub) { st.avisosRoto = true; APP.store.save(); APP.rerender(); return; }
          APP.go("avisos", { codigo: generar(sub) }, { replace: true });
        });
      },
      probar: function () {
        navigator.serviceWorker.ready.then(function (reg) {
          return reg.showNotification("Así se ven tus avisos", { body: "Mañana hacia las 6:30 llega tu misión del día. " + APP.u.pick(APP.consejos), icon: "icons/icon-192.png", badge: "icons/badge-96.png", tag: "prueba" });
        }).then(function () { APP.toast("Mira la parte de arriba de tu pantalla", "bell"); }).catch(function (e) { APP.logError(e, "probar aviso"); APP.toast("No se pudo mostrar el aviso de prueba"); });
      },
      copiar: function () { copiar(pr.codigo); },
      compartir: function () { navigator.share({ text: pr.codigo }).catch(function () {}); }
    } };
  };
  function copiar(t) {
    try { navigator.clipboard.writeText(t).then(function () { APP.toast("Copiado", "check"); }, function () { APP.toast("Mantén el dedo sobre el código para copiarlo"); }); } catch (e) { APP.toast("Mantén el dedo sobre el código para copiarlo"); }
  }
  APP.copiar = copiar;

  /* =========================================================================
     COPIA DE SEGURIDAD Y REPORTE PARA CLAUDE
     ========================================================================= */
  V.respaldo = function (pr) {
    var p = APP.perfil();
    var code = "RESPALDO-" + btoa(unescape(encodeURIComponent(JSON.stringify(p))));
    var h = '<div class="scr">' + APP.top("Copia de seguridad") + '<p class="lede">Tu avance vive en este celular. Guarda este código si vas a cambiar de celular o borrar la app: con él recuperas todo.</p>' +
      '<div class="card stack"><b>Tu código</b><div class="kbd-code">' + esc(code.slice(0, 160)) + '…</div><div class="row"><button class="btn dark grow" data-act="copiar">Copiar el código</button>' + (navigator.share ? '<button class="btn soft grow" data-act="compartir">Enviar</button>' : "") + '</div><p class="tiny">Puedes enviártelo por WhatsApp o por correo y guardarlo.</p></div>' +
      '<div class="card stack"><b>Recuperar un avance</b><label class="small" for="imp">Pega aquí un código de copia de seguridad.</label><textarea id="imp" placeholder="RESPALDO-..."></textarea><button class="btn soft block" data-act="importar">Recuperar</button><p class="tiny">Reemplaza el avance de ' + esc(APP.usuario().nombre) + " en este celular.</p></div></div>";
    return { tab: "home", html: h, on: {
      copiar: function () { copiar(code); },
      compartir: function () { navigator.share({ text: code }).catch(function () {}); },
      importar: function () {
        var t = (document.getElementById("imp").value || "").trim().replace(/^RESPALDO-/, "");
        try {
          var obj = JSON.parse(decodeURIComponent(escape(atob(t))));
          if (!obj || obj.v !== 1 || !obj.who) throw new Error("x");
          APP.sheet("<h2>¿Recuperar este avance?</h2><p class=\"muted\">Es de " + esc(D.usuarios[obj.who].nombre) + ", con " + obj.xp + ' XP. Reemplaza el que hay en este celular.</p><div class="row"><button class="btn soft grow" data-act="close">Cancelar</button><button class="btn dark grow" data-act="si">Recuperar</button></div>',
            { si: function () { var s = APP.store.raw(); s.perfiles[obj.who] = obj; s.activo = obj.who; APP.store.save(); APP.closeSheet(); APP.toast("Avance recuperado", "check"); APP.go("home", {}, { reset: true }); } });
        } catch (e) { APP.toast("Ese código no es válido. Revisa que esté completo."); }
      }
    } };
  };
  APP.reporte = function () {
    var p = APP.perfil(), u = APP.usuario(), L = [];
    L.push("REPORTE PARA CLAUDE · " + APP.cfg.nombre + " · versión " + APP.cfg.version);
    L.push("Persona: " + u.nombre + " · fecha: " + U.today() + " · XP: " + p.xp + " (" + APP.nivel(p.xp).nombre + ") · racha: " + p.racha.n + " (máx. " + p.racha.max + ")");
    var dias = Object.keys(p.dias).sort(); L.push("Días con práctica: " + dias.length + " · misiones completas: " + dias.filter(function (d) { return p.dias[d].mision; }).length);
    var tot = APP.lam.conteo(); L.push("Álbum: " + tot.obt + "/" + tot.total + " obtenidas, " + tot.bri + " brillantes, " + tot.dor + " doradas");
    L.push("Escenas vistas: " + D.escenas.filter(function (e) { return p.esc[e.id] && p.esc[e.id].done; }).map(function (e) { return e.id + (p.esc[e.id].ok ? "" : "(falló la comprobación)"); }).join(", "));
    L.push("Dominio por subtema:");
    Object.keys(p.sub).forEach(function (k) { var s = p.sub[k]; L.push("  " + k + ": " + s.ok + " bien / " + s.ko + " mal · últimos " + s.h.join("")); });
    L.push("Familias de casos (nivel de redacción 1-3):");
    Object.keys(p.fam).forEach(function (k) { var f = p.fam[k]; L.push("  " + k + ": " + f.ok + "/" + (f.ok + f.ko) + " · nivel " + f.lvl); });
    L.push("Simulacros:");
    p.sim.intentos.forEach(function (x) {
      L.push("  " + x.tipo + " · " + x.ini.slice(0, 16) + " · " + x.resumen + (x.errores ? " (mis errores)" : ""));
      x.items.forEach(function (r) { L.push("    " + r.id + ": marcó " + LETRAS[r.resp] + (r.ok ? " ✓" : " ✗") + " · " + r.seg + " s" + (r.marca ? " · " + r.marca.seg + (r.marca.como && r.marca.como.length ? " · " + r.marca.como.join("; ") : "") + (r.marca.comps && r.marca.comps.length ? " · competencias: " + r.marca.comps.join("+") : "") + (r.marca.nota ? " · NOTA: " + r.marca.nota : "") : "")); });
    });
    L.push("Afirmaciones de práctica: " + Object.keys(p.af).map(function (k) { return k + " " + p.af[k].ok + "/" + p.af[k].n; }).join(", "));
    L.push("Contrarreloj récord: " + p.records.contrarreloj + " · duelos: " + p.duelos.map(function (d) { return d.code + " " + d.ok + "/" + d.n + " en " + d.seg + " s"; }).join("; "));
    var s = APP.store.raw();
    if (s.errores && s.errores.length) { L.push("Errores de la app:"); s.errores.forEach(function (e) { L.push("  " + e.t.slice(0, 16) + " · " + e.v + " · " + e.donde + " · " + e.msg.split("\n")[0]); }); }
    var pl = APP.plataforma(); L.push("Celular: " + (pl.ios ? "iPhone" : pl.android ? "Android" : "otro") + (pl.standalone ? " · instalada" : " · en el navegador"));
    return L.join("\n");
  };
  V.reporte = function () {
    var txt = APP.reporte();
    var h = '<div class="scr">' + APP.top("Reporte para Claude") + '<p class="lede">Cuando quieras que Claude ajuste la app a lo que más fallas, copia este reporte y pégalo en el chat del proyecto, por ejemplo con «Lee la bitácora de la APP y este reporte».</p>' +
      '<div class="row"><button class="btn cta grow" data-act="copiar">Copiar el reporte</button>' + (navigator.share ? '<button class="btn soft grow" data-act="compartir">Enviar</button>' : "") + '</div><div class="kbd-code" style="max-height:none;white-space:pre-wrap">' + esc(txt) + "</div></div>";
    return { tab: "home", html: h, on: { copiar: function () { copiar(txt); }, compartir: function () { navigator.share({ text: txt }).catch(function () {}); } } };
  };

  /* =========================================================================
     NOMBRE DE LA APP
     ========================================================================= */
  APP.nombres = [
    [["PILAS", "«¡Pilas!»: atento, despierto. Y las pilas se cargan cada día con la misión."], ["FIRME", "Doble sentido: la firmeza de la declaración y la firmeza de quien se prepara."], ["PLAZA", "Lo que se gana en un concurso de méritos: la plaza."], ["TINO", "Tener tino: acertar con criterio, que es lo que mide el juicio situacional."], ["FOGUEO", "El entrenamiento antes de la batalla real."], ["MÉRITO", "El nombre mismo del concurso que van a ganar."]],
    [["ATINA", "Imperativo de atinar: dar en el blanco."], ["RACHA", "Cada día sin fallar suma: la racha es el corazón de la app."], ["PULSO", "Ganarse algo «a pulso»: con esfuerzo propio, día a día."], ["CLAVE", "La respuesta correcta de cada punto, y la llave del examen."], ["PODIO", "Quedar en los primeros puestos de la lista."], ["CIMA", "La meta alta, sin rodeos."]],
    [["JUICIO", "Juicio situacional: el formato de la prueba funcional."], ["PERITO", "El experto que les muestra cómo piensa en cada paseo."], ["SAGAZ", "Quien detecta la trampa antes de caer en ella."], ["AGUDO", "Lectura aguda: ver el dato escondido en el caso."], ["OLFATO", "Olfato para las trampas del operador."], ["CHISPA", "Tener chispa: pensar rápido y bien."]],
    [["DIANA", "Dar en la diana. Y adentro trae escondida la DIAN."], ["TICTAC", "El reloj de la firmeza y la cuenta regresiva al 8 de noviembre."], ["LOGRO", "Cada día, un logro pequeño que suma al grande."], ["VIGÍA", "El que vigila para que ningún plazo se le escape."], ["FARO", "La luz que guía entre tantos datos."], ["FOCO", "Diez minutos de concentración total al día."]],
    [["CORONA", "En Colombia, «coronar» es lograr lo que uno se propuso."], ["DUETO", "Dos que estudian juntos y compiten entre sí."], ["RETO", "El reto diario que engancha."], ["GANA", "Directo: la app para ganar el concurso."], ["CRACK", "Ser un crack: el mejor en lo suyo."], ["ÉPICA", "Una preparación que se recuerda."]]
  ];
  V.nombre = function (pr) {
    var s = APP.store.raw(); s.nombreVotos = s.nombreVotos || {};
    var tanda = pr.tanda || 0, fav = pr.fav;
    var lista = fav ? [].concat.apply([], APP.nombres).filter(function (n) { return s.nombreVotos[n[0]]; }) : APP.nombres[tanda];
    var h = '<div class="scr">' + APP.top("El nombre de la app") + '<p class="lede">' + (APP.cfg.nombreProvisional ? "De 4 a 6 letras: es el nombre que aparece debajo del ícono, así como se ve a la izquierda. Marquen con el corazón los que les gusten; pueden ver más nombres y volver a los anteriores cuando quieran." : "El nombre ya está elegido. Aquí siguen todas las opciones, por si algún día quieren cambiarlo.") + "</p>";
    if (!fav) h += '<div class="row spread"><span class="chip">Tanda ' + (tanda + 1) + " de " + APP.nombres.length + '</span><button class="link" data-act="favs">Ver nuestros favoritos (' + Object.keys(s.nombreVotos).filter(function (k) { return s.nombreVotos[k]; }).length + ")</button></div>";
    else h += '<div class="row spread"><span class="chip p">Sus favoritos</span><button class="link" data-act="tanda" data-t="0">Ver todas las tandas</button></div>';
    h += '<div class="stack">' + (lista.length ? lista.map(function (n) {
      var nom = n[0].charAt(0) + n[0].slice(1).toLowerCase();
      return '<div class="namecard"><div class="hs" aria-hidden="true"><img src="icons/icon-192.png" alt=""><span>' + esc(nom) + '</span></div><div><b style="font-size:18px">' + esc(nom) + '</b><p class="small muted">' + esc(n[1]) + '</p></div><button class="heart' + (s.nombreVotos[n[0]] ? " on" : "") + '" data-act="heart" data-n="' + esc(n[0]) + '" aria-label="Me gusta ' + esc(nom) + '">' + APP.ic("heart", ' width="22" height="22"') + "</button></div>";
    }).join("") : '<div class="empty">Todavía no han marcado favoritos.</div>') + "</div>";
    if (!fav) h += '<div class="row"><button class="btn soft grow" data-act="tanda" data-t="' + Math.max(0, tanda - 1) + '"' + (tanda === 0 ? " disabled" : "") + '>Volver a los anteriores</button><button class="btn dark grow" data-act="tanda" data-t="' + Math.min(APP.nombres.length - 1, tanda + 1) + '"' + (tanda === APP.nombres.length - 1 ? " disabled" : "") + ">Ver otros nombres</button></div>";
    h += (APP.cfg.nombreProvisional ? '<div class="card stack"><b>¿Ya lo eligieron?</b><p class="small">Escríbanle a Claude en el chat: «Elegimos el nombre …». Si ninguno los convence, pídanle otra tanda con la idea que tengan.</p>'
      : '<div class="card stack" style="box-shadow:0 0 0 2px var(--ok)"><b>' + APP.ic("check", ' width="18" height="18"') + ' Eligieron: ' + esc(APP.cfg.nombre) + '</b><p class="small">Si algún día quieren cambiarlo, escríbanle a Claude: «Cambiemos el nombre a …».</p>') +
      (Object.keys(s.nombreVotos).some(function (k) { return s.nombreVotos[k]; }) ? '<button class="btn soft block" data-act="copiarFav">Copiar nuestros favoritos para Claude</button>' : "") + "</div></div>";
    return { tab: APP.perfil() ? "home" : false, html: h, on: {
      heart: function (el) { var n = el.getAttribute("data-n"); s.nombreVotos[n] = !s.nombreVotos[n]; APP.store.save(); APP.sfx(s.nombreVotos[n] ? "ok" : "tap"); APP.rerender(); },
      tanda: function (el) { APP.go("nombre", { tanda: +el.getAttribute("data-t") }, { replace: true }); },
      favs: function () { APP.go("nombre", { fav: true }, { replace: true }); },
      copiarFav: function () { copiar("Nuestros nombres favoritos: " + Object.keys(s.nombreVotos).filter(function (k) { return s.nombreVotos[k]; }).join(", ")); }
    } };
  };

  /* =========================================================================
     TEMAS, PERSONA Y NOVEDADES
     ========================================================================= */
  V.temas = function () {
    var p = APP.perfil(), s = APP.store.raw();
    var h = '<div class="scr">' + APP.top("Temas, tiempo y persona") + "<h3>Proyecto</h3>" +
      '<div class="check on"><span class="bx">' + APP.ic("check", ' width="18" height="18"') + '</span><span><b>' + esc(APP.proyecto().nombre) + '</b><br><span class="small muted">' + esc(APP.proyecto().convocatoria) + "</span></span></div><h3>Temas</h3><div class=\"stack\">" +
      APP.proyecto().temas.map(function (t) { return '<button class="check' + (p.temas[t.id] ? " on" : "") + '" data-act="t" data-t="' + t.id + '"><span class="bx">' + APP.ic("check", ' width="18" height="18"') + "</span><span><b>" + esc(t.nombre) + "</b></span></button>"; }).join("") + "</div>" +
      '<h3>Minutos al día</h3><div class="row wrap">' + [10, 15, 20].map(function (m) { return '<button class="chip pick' + (p.meta === m ? " on" : "") + '" data-act="meta" data-m="' + m + '">' + m + " minutos</button>"; }).join("") + "</div>" +
      '<h3>Persona</h3><div class="who">' + ["laura", "juandavid"].map(function (w) { var u = D.usuarios[w]; return '<button data-act="who" data-w="' + w + '" style="' + (p.who === w ? "border-color:var(--ink)" : "") + '"><span class="av" style="background:' + (w === "laura" ? "var(--hl-p)" : "var(--hl-b)") + '">' + u.nombre.charAt(0) + "</span><b>" + esc(u.nombre) + "</b><small>" + (p.who === w ? "Activa" : (s.perfiles[w] ? "Cambiar" : "Crear perfil")) + "</small></button>"; }).join("") + "</div>" +
      '<p class="tiny">Los cambios de temas se aplican desde la misión de mañana.</p></div>';
    return { tab: "home", html: h, on: {
      t: function (el) { var k = el.getAttribute("data-t"); p.temas[k] = !p.temas[k]; if (!Object.keys(p.temas).some(function (z) { return p.temas[z]; })) { p.temas[k] = true; APP.toast("Debe quedar al menos un tema"); } APP.store.save(); APP.rerender(); },
      meta: function (el) { p.meta = +el.getAttribute("data-m"); APP.store.save(); APP.rerender(); },
      who: function (el) { var w = el.getAttribute("data-w"); if (w === p.who) return; var np = APP.setPerfil(w); if (!np.onboard) { APP.go("onb", { step: 2, draft: { who: w, temas: { "m06-1": true, "m06-2": true, "m06-3": true, comp: true, integ: true }, meta: 15 } }, { reset: true }); return; } APP.toast("Ahora entrena " + D.usuarios[w].nombre); APP.go("home", {}, { reset: true }); }
    } };
  };
  APP.novedades = [
    { v: "2026-10-22.3", t: "Más fácil de instalar y correcciones de la revisión legal", d: ["El botón del menú, arriba a la derecha de «Hoy», ahora dice «Menú».", "En el Samsung, la app explica cómo instalarla desde Chrome, porque desde Samsung Internet Google Play Protect la bloquea. Los pasos de instalación ahora tienen una sola acción cada uno.", "Una revisión independiente confrontó el contenido funcional con el Estatuto Tributario y la doctrina DIAN: las 12 respuestas del simulacro funcional y las cifras quedaron confirmadas.", "Escena «Tres maneras de que una declaración no sirva»: la pregunta ahora dice cuánto se debe (30 millones), porque una deuda de hasta 10 UVT pagada dentro del año sí salva la declaración.", "Lámina «Salida 2»: la declaración sin pago sirve de título para el cobro mientras no se presente de nuevo con el pago (art. 580-1).", "Escena «Las pausas del reloj»: los 3 meses de la inspección de oficio se cuentan desde la notificación del auto.", "Mapa del reloj: la imputación del saldo a favor sigue la regla general (si declaró tarde, desde la presentación).", "Los 71 UVT del beneficio de auditoría medidos en el año anterior quedan señalados como doctrina DIAN (Concepto 404 de 2026).", "Las preguntas sobre la sanción por corrección piden el valor antes de cualquier reducción (la del art. 640 va aparte)."] },
    { v: "2026-10-22.2", t: "Ya se llama Mérito", d: ["Laura y Juan David eligieron el nombre: Mérito. Aparece en la app, en el ícono de los celulares Android y en los avisos.", "En el iPhone, el nombre debajo del ícono es el que se escribió al instalar.", "Ajustes menores en la pantalla de avisos y en las explicaciones de Mis estadísticas."] },
    { v: "2026-10-22.1", t: "Primera versión", d: ["Capítulos 1 a 3 del M06: tres mapas, quince escenas, 39 láminas funcionales y un generador de casos gemelos con 11 familias de reglas.", "Simulacro funcional con 12 casos inéditos en el formato DIAN 2676 (caso, enunciado y tres opciones), marcado extra y paseo del experto.", "Simulacros comportamental y de integridad en bloques separados: 70 afirmaciones inéditas (46 de simulacro y 24 de práctica diaria), con marcado de competencias o valores y colisiones.", "Misión diaria, racha, comodines, cofre, álbum de 62 láminas por persona, logros, duelo de pareja, avisos diarios y estadísticas con prioridades."] }
  ];
  V.novedades = function () {
    var h = '<div class="scr">' + APP.top("Novedades") + APP.novedades.map(function (n) { return '<div class="card stack"><div class="row spread"><b>' + esc(n.t) + '</b><span class="tiny">' + esc(n.v) + "</span></div><ul class=\"small\" style=\"margin:0;padding-left:18px;display:flex;flex-direction:column;gap:6px\">" + n.d.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>"; }).join("") +
      '<p class="tiny">La app se actualiza sola cuando la abres con internet. Si hay una versión nueva, aparece un aviso verde para aplicarla.</p></div>';
    return { tab: "home", html: h };
  };

  /* =========================================================================
     DUELO DE PAREJA
     ========================================================================= */
  var ALF = "ACDEFGHJKLMNPQRTUVWXY3479";
  function codeFromSeed(n) { var s = ""; for (var i = 0; i < 4; i++) { s += ALF[n % ALF.length]; n = Math.floor(n / ALF.length); } return s; }
  function seedFromCode(c) { c = c.toUpperCase(); var n = 0; for (var i = c.length - 1; i >= 0; i--) { var k = ALF.indexOf(c[i]); if (k < 0) return null; n = n * ALF.length + k; } return n * 7919 + 17; }
  V.duelo = function () {
    var p = APP.perfil(), otro = p.who === "laura" ? "Juan David" : "Laura";
    var h = '<div class="scr">' + APP.top("Duelo de pareja") + '<p class="lede">Los dos responden los mismos diez casos. Gana quien acierte más; si empatan, quien tarde menos. Así se retan sin necesidad de internet.</p>' +
      '<div class="card stack"><b>Crear un duelo</b><p class="small">Te da un código de cuatro letras. Juegas tú y se lo dices a ' + esc(otro) + ".</p><button class=\"btn cta block\" data-act=\"crear\">Crear y jugar</button></div>" +
      '<div class="card stack"><b>Unirme a un duelo</b><label class="small" for="cod">Escribe el código que te dieron.</label><input type="text" id="cod" maxlength="4" autocapitalize="characters" autocomplete="off" style="text-transform:uppercase;font-size:24px;letter-spacing:.3em;text-align:center"><button class="btn dark block" data-act="unir">Jugar</button></div>';
    if (p.duelos.length) h += '<h3>Mis duelos</h3><div class="stack">' + p.duelos.slice(-8).reverse().map(function (d) { return '<div class="card row"><b class="grow">Código ' + esc(d.code) + '</b><span class="chip num">' + d.ok + "/" + d.n + '</span><span class="chip num">' + U.mmss(d.seg) + "</span></div>"; }).join("") + "</div>";
    h += "</div>";
    return { tab: "home", html: h, on: {
      crear: function () { var n = Math.floor(Math.random() * Math.pow(ALF.length, 4)); var code = codeFromSeed(n); APP.sheet('<div class="stack" style="text-align:center"><p class="tiny">Código del duelo</p><div style="font-size:48px;font-weight:800;letter-spacing:.2em">' + code + '</div><p class="muted">Díselo a ' + esc(otro) + '. Cuando estés listo, empieza.</p><button class="btn cta block" data-act="jugar">Empezar</button></div>', { jugar: function () { APP.closeSheet(); APP.go("rafaga", { mode: "duelo", n: 10, seed: seedFromCode(code), code: code }); } }); },
      unir: function () { var c = (document.getElementById("cod").value || "").trim().toUpperCase(); var sd = c.length === 4 ? seedFromCode(c) : null; if (sd == null) { APP.toast("El código tiene cuatro letras o números"); return; } APP.go("rafaga", { mode: "duelo", n: 10, seed: sd, code: c }); }
    } };
  };
})();

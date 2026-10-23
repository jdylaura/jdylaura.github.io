/* Pantallas de la app. */
var APP = window.APP || (window.APP = {});

(function () {
  "use strict";
  var D = APP.data, U = APP.u, V = APP.views;
  var esc = U.esc;
  function lamById(id) { return D.laminas.filter(function (l) { return l.id === id; })[0]; }
  function colorUser(who) { return who === "laura" ? "var(--hl-p)" : "var(--hl-b)"; }
  function pctTxt(x) { return Math.round(x * 100) + " %"; }

  /* =========================================================================
     BIENVENIDA Y CONFIGURACIÓN INICIAL
     ========================================================================= */
  V.onb = function (pr) {
    var step = pr.step || 0, draft = pr.draft || { temas: { "m06-1": true, "m06-2": true, "m06-3": true, comp: true, integ: true }, meta: 15 };
    var html = '<div class="scr full"><div class="onb">';
    if (step === 0) {
      var pl = APP.plataforma(), movil = pl.ios || pl.android;
      html += '<div class="stack"><div class="brand"><span class="brand-mark">' + esc(APP.cfg.nombre) + '</span></div>' +
        '<h2 style="font-size:30px;line-height:1.1">Diez a quince minutos al día para llegar al 8 de noviembre con los datos en su lugar.</h2>' +
        '<p class="lede">Escenas de un minuto, casos gemelos, un álbum que se llena con lo que dominas y simulacros con el formato de la DIAN 2676.</p>' +
        '<p class="small muted">Todo se guarda en este celular. No necesita cuenta ni contraseña.</p></div>';
      if (pl.standalone || pr.aqui) {
        html += '<button class="btn cta block" data-act="n0">Empezar</button>';
      } else if (movil && pl.samsung) {
        html += '<div class="card stack" style="box-shadow:0 0 0 2px var(--bad)"><b>En el Samsung, instálala desde Chrome</b><p class="small">Desde este navegador (Samsung Internet), Google Play Protect bloquea la instalación. Toca el botón y te explico cómo abrirla en Chrome, paso a paso.</p>' +
          '<button class="btn cta block" data-act="go" data-view="instalar">Cómo abrirla en Chrome</button>' +
          "</div>" + '<button class="link" data-act="aqui">Probarla aquí sin instalar</button>';
      } else if (movil) {
        html += '<div class="card stack"><b>Primero, instálala en tu pantalla de inicio</b><p class="small">Así tendrás su ícono como cualquier app, funcionará sin internet y podrá enviarte los avisos diarios. Toma un minuto.</p>' +
          (pl.ios ? '<p class="small"><b>Importante en el iPhone:</b> lo que hagas aquí, en Safari, no pasa a la app instalada. Instálala antes de empezar.</p>' : "") +
          (pl.android && APP.installPrompt ? '<button class="btn cta block" data-act="inst">Instalar ahora</button><p class="tiny" style="text-align:center">Luego, en la ventanita que aparece abajo, toca «Instalar».</p>' : "") +
          '<button class="btn ' + (pl.android && APP.installPrompt ? "soft" : "cta") + ' block" data-act="go" data-view="instalar">Cómo instalarla, paso a paso</button>' +
          (APP.cfg.nombreProvisional ? '<button class="btn soft block" data-act="go" data-view="nombre">Antes: elegir el nombre de la app</button>' : "") + "</div>" +
          '<button class="link" data-act="aqui">Probarla aquí sin instalar</button>';
      } else {
        var url = location.origin + location.pathname.replace(/index\.html$/, "");
        html += '<div class="card stack" style="text-align:center"><b>Esta app es para el celular</b><p class="small">Abre esta dirección en el navegador del iPhone o del Samsung:</p><b style="font-size:22px">' + esc(url.replace(/^https?:\/\//, "").replace(/\/$/, "")) + "</b>" +
          (APP.qr ? '<div style="max-width:200px;margin:4px auto">' + APP.qr + '</div><p class="tiny">O apunta la cámara del celular a este código.</p>' : "") + "</div>" +
          '<button class="link" data-act="aqui">Verla aquí de todos modos</button>';
      }
    } else if (step === 1) {
      html += '<h2>¿Quién entrena en este celular?</h2><p class="muted">Cada uno tiene sus competencias y su propio avance.</p><div class="who">' +
        ["laura", "juandavid"].map(function (w) { var u = D.usuarios[w]; return '<button data-act="who" data-w="' + w + '"><span class="av" style="background:' + colorUser(w) + '">' + u.nombre.charAt(0) + "</span><b>" + esc(u.nombre) + "</b><small>" + esc(u.empleo.split(" · ")[0]) + "</small></button>"; }).join("") + "</div>";
    } else if (step === 2) {
      var P = APP.proyecto();
      html += '<h2>¿Qué proyecto vas a entrenar?</h2><p class="muted">Sale de su proyecto de estudio en Claude. Cuando haya material de otro proyecto, aparecerá aquí.</p>' +
        '<button class="check on" data-act="n2"><span class="bx">' + APP.ic("check", ' width="18" height="18"') + '</span><span><b>' + esc(P.nombre) + '</b><br><span class="small muted">' + esc(P.convocatoria) + " · prueba el " + U.fecha(new Date(P.prueba.fecha)) + "</span></span></button>" +
        '<button class="btn cta block" data-act="n2">Continuar</button>';
    } else if (step === 3) {
      html += '<h2>¿Qué temas quieres entrenar?</h2><p class="muted">Puedes cambiarlo cuando quieras desde el menú.</p><div class="stack">' +
        '<button class="check' + (Object.keys(draft.temas).every(function (k) { return draft.temas[k]; }) ? " on" : "") + '" data-act="tAll"><span class="bx">' + APP.ic("check", ' width="18" height="18"') + "</span><span><b>Todos los temas</b></span></button>" +
        APP.proyecto().temas.map(function (t) {
          return '<button class="check' + (draft.temas[t.id] ? " on" : "") + '" data-act="tOne" data-t="' + t.id + '"><span class="bx">' + APP.ic("check", ' width="18" height="18"') + "</span><span><b>" + esc(t.nombre) + '</b><br><span class="small muted">' +
            (t.tipo === "funcional" ? "Funcional · M06" : t.tipo === "comportamental" ? "Tus competencias de la ficha del empleo" : "Los cinco valores del Código de Integridad") + "</span></span></button>";
        }).join("") + '</div><button class="btn cta block" data-act="n3">Continuar</button>';
    } else if (step === 4) {
      html += '<h2>¿Cuánto tiempo al día?</h2><p class="muted">La misión diaria se arma con ese tiempo. Una misión cumplida mantiene viva tu racha.</p><div class="stack">' +
        [[10, "Ligera", "Para los días pesados"], [15, "Normal", "La recomendada"], [20, "Intensa", "Con contrarreloj al final"]].map(function (m) {
          return '<button class="check' + (draft.meta === m[0] ? " on" : "") + '" data-act="meta" data-m="' + m[0] + '"><span class="bx">' + APP.ic("check", ' width="18" height="18"') + "</span><span><b>" + m[0] + " minutos · " + m[1] + '</b><br><span class="small muted">' + m[2] + "</span></span></button>";
        }).join("") + '</div><button class="btn cta block" data-act="n4">Listo</button>';
    }
    html += "</div></div>";
    return { tab: false, html: html, on: {
      n0: function () { APP.go("onb", { step: 1, draft: draft }, { replace: true }); },
      aqui: function () { APP.go("onb", { step: 0, draft: draft, aqui: true }, { replace: true }); },
      inst: function () { var e = APP.installPrompt; if (!e) return; e.prompt(); e.userChoice.then(function (r) { if (r.outcome === "accepted") APP.toast("Instalada. Búscala en tu pantalla de inicio.", "check"); APP.installPrompt = null; APP.rerender(); }); },
      who: function (el) { draft.who = el.getAttribute("data-w"); APP.sfx("tap"); APP.go("onb", { step: 2, draft: draft }, { replace: true }); },
      n2: function () { APP.go("onb", { step: 3, draft: draft }, { replace: true }); },
      tAll: function () { var all = Object.keys(draft.temas).every(function (k) { return draft.temas[k]; }); Object.keys(draft.temas).forEach(function (k) { draft.temas[k] = !all; }); APP.go("onb", { step: 3, draft: draft }, { replace: true }); },
      tOne: function (el) { var k = el.getAttribute("data-t"); draft.temas[k] = !draft.temas[k]; APP.go("onb", { step: 3, draft: draft }, { replace: true }); },
      n3: function () { if (!Object.keys(draft.temas).some(function (k) { return draft.temas[k]; })) { APP.toast("Elige al menos un tema"); return; } APP.go("onb", { step: 4, draft: draft }, { replace: true }); },
      meta: function (el) { draft.meta = +el.getAttribute("data-m"); APP.go("onb", { step: 4, draft: draft }, { replace: true }); },
      n4: function () {
        var p = APP.setPerfil(draft.who); p.temas = draft.temas; p.meta = draft.meta; p.onboard = true; p.mision = null; APP.store.save();
        APP.sfx("level"); APP.go("home", {}, { reset: true });
      }
    } };
  };

  /* =========================================================================
     INICIO
     ========================================================================= */
  V.home = function () {
    var p = APP.perfil(); if (!p || !p.onboard) { setTimeout(function () { APP.go("onb", { step: 0 }, { reset: true }); }); return { html: "" }; }
    APP.racha.revisar();
    var u = APP.usuario(), m = APP.mision.hoy(), niv = APP.nivel(p.xp), faltan = APP.faltan();
    var hechos = m.hecho.filter(Boolean).length, total = m.pasos.length, next = m.hecho.indexOf(false);
    var saludo = U.hora() < 12 ? "Buenos días" : U.hora() < 19 ? "Buenas tardes" : "Buenas noches";
    var h = '<div class="scr">';
    h += '<div class="top"><div class="brand"><span class="brand-mark">' + esc(APP.cfg.nombre) + '</span></div>' +
      '<span class="stat-pill" title="Racha"><span class="flame" style="color:#FF8A1F;display:inline-flex">' + APP.ic("flame") + '</span><span class="num">' + p.racha.n + "</span></span>" +
      '<button class="menu-btn" data-act="menu" aria-label="Menú: más opciones">' + APP.ic("burger") + "<span>Menú</span></button></div>";
    h += '<div><p class="muted small">' + saludo + ", " + esc(u.nombre) + '</p><h2 style="font-size:24px">' + (hechos === total ? "Misión de hoy cumplida." : (hechos ? (total - hechos === 1 ? "Vas bien: te falta un paso." : "Vas bien: te faltan " + (total - hechos) + " pasos.") : "Tu misión de hoy te espera.")) + "</h2></div>";

    // Misión
    h += '<div class="card mission stack"><div class="row">' + APP.ring(total ? hechos / total : 0, hechos + "/" + total) +
      '<div class="grow"><h3>Misión del día</h3><p class="small muted">' + m.pasos.reduce(function (a, s) { return a + s.min; }, 0) + " minutos · racha " + (APP.racha.hoy() ? "asegurada hoy" : "en juego") + (p.racha.comodines ? " · " + p.racha.comodines + " comodín" + (p.racha.comodines > 1 ? "es" : "") : "") + "</p></div></div>";
    h += '<ol class="steps">' + m.pasos.map(function (s, i) {
      var cls = "step" + (m.hecho[i] ? " done" : "") + (i === next ? " next" : "");
      return '<li><button class="' + cls + '" data-act="paso" data-i="' + i + '"><span class="dot">' + (m.hecho[i] ? APP.ic("check", ' width="18" height="18"') : (i + 1)) + '</span><span><span class="t">' + esc(s.t) + '</span><br><span class="d">' + esc(s.d) + '</span></span><span class="tiny">' + s.min + " min</span></button></li>";
    }).join("") + "</ol>";
    if (next >= 0) h += '<button class="btn cta block" data-act="paso" data-i="' + next + '">' + (hechos ? "Continuar" : "Empezar la misión") + "</button>";
    else if (!m.cofre) h += '<button class="btn cta block" data-act="cofre">' + APP.ic("gift", ' width="22" height="22"') + " Abrir el cofre del día</button>";
    else h += '<p class="small muted">Vuelve mañana para tu nueva misión. Mientras tanto, la práctica libre suma XP.</p>';
    h += "</div>";

    // Cuenta regresiva y nivel
    h += '<div class="grid2"><div class="card countdown"><div class="big">' + Math.max(0, faltan) + '<small>' + (faltan === 1 ? "día" : "días") + '</small></div><p class="small">para la prueba escrita, ' + U.fecha(new Date(APP.proyecto().prueba.fecha)) + "</p></div>" +
      '<div class="card stack" style="gap:8px"><p class="tiny">Nivel ' + (niv.i + 1) + '</p><b style="font-size:18px;line-height:1.15">' + esc(niv.nombre) + '</b><div class="bar y"><i style="width:' + Math.round(niv.pct * 100) + '%"></i></div><p class="tiny num">' + p.xp + " XP" + (niv.next ? " · " + (niv.next - p.xp) + " para " + esc(niv.nextNombre) : "") + "</p></div></div>";

    // Accesos
    h += '<div class="tiles">' +
      tile("rafagaLibre", "bolt", "var(--hl-y)", "Ráfaga libre", "Diez casos gemelos, cuando quieras") +
      tile("relojLibre", "clock", "var(--hl-o)", "Contrarreloj", "Sesenta segundos. Récord: " + p.records.contrarreloj) +
      tile("goSim", "exam", "var(--hl-b)", "Simulacro", "Formato DIAN 2676, con paseo del experto") +
      tile("goDuelo", "users", "var(--hl-p)", "Duelo de pareja", "Los mismos casos para los dos") + "</div>";

    // Prioridad
    var pr = APP.prioridades()[0];
    if (pr) h += '<button class="card stack" data-act="stats" style="text-align:left;border:0;cursor:pointer"><p class="tiny">Lo que más te conviene reforzar</p><b>' + esc(pr.nombre) + '</b><p class="small muted">' + esc(pr.motivo) + "</p></button>";
    var st = APP.store.raw(), pl = APP.plataforma();
    if (st.avisosRoto) h += '<button class="card row" data-act="go" data-view="avisos" style="border:0;cursor:pointer;text-align:left;box-shadow:0 0 0 2px var(--bad)">' + APP.ic("bell", ' width="22" height="22"') + '<span class="grow"><b>Los avisos de este celular se desconectaron</b><br><span class="small muted">Toca aquí para activarlos otra vez.</span></span></button>';
    else if (!st.avisos && pl.standalone && Object.keys(p.dias).length >= 1) h += '<button class="card row" data-act="go" data-view="avisos" style="border:0;cursor:pointer;text-align:left">' + APP.ic("bell", ' width="22" height="22"') + '<span class="grow"><b>Activa los avisos diarios</b><br><span class="small muted">Uno en la mañana con tu misión y otro en la noche para cuidar tu racha.</span></span></button>';
    else if (!pl.standalone && (pl.ios || pl.android)) h += '<button class="card row" data-act="go" data-view="instalar" style="border:0;cursor:pointer;text-align:left">' + APP.ic("phone", ' width="22" height="22"') + '<span class="grow"><b>Instálala en tu pantalla de inicio</b><br><span class="small muted">Para tener el ícono, usarla sin internet y recibir avisos.</span></span></button>';
    if (APP.cfg.nombreProvisional) h += '<button class="card row" data-act="nombre" style="border:0;cursor:pointer;text-align:left">' + APP.ic("pencil", ' width="22" height="22"') + '<span class="grow"><b>Falta el nombre de la app</b><br><span class="small muted">«' + esc(APP.cfg.nombre) + '» es provisional. Elíjanlo juntos aquí.</span></span></button>';
    h += "</div>";
    return { tab: "home", html: h, mount: function () { setTimeout(APP.celebrarPendientes, 900); }, on: {
      menu: function () { APP.menu(); },
      paso: function (el) { APP.abrirPaso(+el.getAttribute("data-i")); },
      cofre: function () { APP.cofre(); },
      rafagaLibre: function () { APP.go("rafaga", { mode: "gemelos", n: 10 }); },
      relojLibre: function () { APP.go("rafaga", { mode: "reloj" }); },
      goSim: function () { APP.go("sim", {}, { reset: true }); },
      goDuelo: function () { APP.go("duelo"); },
      stats: function () { APP.go("stats"); },
      nombre: function () { APP.go("nombre"); }
    } };
  };
  function tile(act, ic, bg, t, d) {
    return '<button class="tile" data-act="' + act + '"><span class="ico" style="background:' + bg + ';color:#13182B">' + APP.ic(ic) + '</span><span class="t">' + esc(t) + '</span><span class="d">' + esc(d) + "</span></button>";
  }

  /* Abrir un paso de la misión */
  APP.abrirPaso = function (i) {
    var m = APP.mision.hoy(), s = m.pasos[i]; if (!s) return;
    APP.sfx("tap");
    if (s.k === "repaso") APP.go("rafaga", { mode: "repaso", n: 6, paso: i });
    else if (s.k === "escena") APP.go("escena", { id: s.id, paso: i });
    else if (s.k === "gemelos") APP.go("rafaga", { mode: "gemelos", n: 8, paso: i });
    else if (s.k === "caso") APP.go("rafaga", { mode: "caso", n: 2, paso: i });
    else if (s.k === "reloj") APP.go("rafaga", { mode: "reloj", paso: i });
    else if (s.k === "likert") APP.go("likert", { modo: "dia", paso: i });
  };
  APP.pasoHecho = function (i) {
    if (i == null) return;
    var r = APP.mision.marcar(i);
    var p = APP.perfil();
    if (r.completa) {
      var x = APP.addXP(50);
      var h = U.hora();
      var lg = [APP.logro("primer-dia")];
      if (p.racha.n >= 3) lg.push(APP.logro("racha-3"));
      if (p.racha.n >= 7) lg.push(APP.logro("racha-7"));
      if (p.racha.n >= 14) lg.push(APP.logro("racha-14"));
      if (h < 7) lg.push(APP.logro("madrugador"));
      if (h >= 22) lg.push(APP.logro("noche"));
      lg.filter(Boolean).forEach(APP.celebrarLogro);
      APP.go("home", {}, { reset: true });
      setTimeout(function () {
        APP.sfx("level"); APP.confetti(180); APP.vibrar([40, 60, 40]);
        APP.sheet('<div class="stack" style="text-align:center"><span class="flame" style="color:#FF8A1F;margin:0 auto;width:64px;height:64px;display:block">' + APP.ic("flame", ' width="64" height="64"') + '</span><h2 style="font-size:28px">¡Misión cumplida!</h2><p class="muted">Racha de ' + p.racha.n + " día" + (p.racha.n > 1 ? "s" : "") + ". +50 XP.</p>" +
          '<button class="btn cta block" data-act="abrir">' + APP.ic("gift", ' width="22" height="22"') + " Abrir el cofre</button></div>", { abrir: function () { APP.closeSheet(); APP.cofre(); } });
        if (x.levelUp) setTimeout(function () { APP.celebrarNivel(x.nivel); }, 2500);
      }, 250);
    } else {
      APP.go("home", {}, { reset: true });
    }
  };

  /* Cofre del día: recompensa variable */
  APP.cofre = function () {
    var p = APP.perfil(), m = APP.mision.hoy();
    if (m.cofre) return;
    var r = Math.random(), premio, xp = 0;
    if (r < 0.22 && p.racha.comodines < 2) { p.racha.comodines++; premio = { t: "Un comodín", d: "Si un día no alcanzas a hacer la misión, el comodín salva tu racha." }; }
    else { xp = r < 0.55 ? 30 : r < 0.85 ? 50 : 90; premio = { t: "+" + xp + " XP", d: xp >= 90 ? "¡El premio mayor del cofre!" : "Puntos extra para tu nivel." }; }
    m.cofre = true; APP.store.save();
    var consejo = U.pick(APP.consejos);
    APP.sheet('<div class="stack" style="text-align:center"><div style="font-size:0;margin:6px auto;width:96px;height:96px;display:grid;place-items:center;border-radius:28px;background:var(--hl-y);color:#13182B;animation:pop .5s ease">' + APP.ic("gift", ' width="58" height="58"') + '</div><h2 style="font-size:28px">' + esc(premio.t) + '</h2><p class="muted">' + esc(premio.d) + '</p><div class="card sunk" style="text-align:left"><b>Consejo para la prueba</b><p class="small" style="margin-top:4px">' + esc(consejo) + '</p></div><button class="btn cta block" data-act="close">Guardar</button></div>', {});
    APP.sfx("chest"); APP.confetti(100);
    if (xp) { var x = APP.addXP(xp); if (x.levelUp) setTimeout(function () { APP.celebrarNivel(x.nivel); }, 1800); }
    APP.rerender();
  };

  /* Menú desplegable de Inicio */
  APP.menu = function () {
    var p = APP.perfil();
    function it(act, ic, t, d) { return '<button class="menu-item" data-act="' + act + '"><span class="ic">' + APP.ic(ic) + "</span><span><b>" + esc(t) + "</b><small>" + esc(d) + "</small></span>" + APP.ic("back", ' width="18" height="18" style="transform:rotate(180deg);opacity:.5"') + "</button>"; }
    APP.sheet('<h2>Más opciones</h2><div class="menu-list">' +
      it("mStats", "chart", "Mis estadísticas", "Qué reforzar primero y cómo") +
      it("mLogros", "trophy", "Logros", Object.keys(p.logros).length + " de " + APP.logrosDef.length) +
      it("mInstalar", "phone", "Instalar en el celular", "Ícono en la pantalla de inicio") +
      it("mAvisos", "bell", "Avisos diarios", "Recordatorio en la mañana y en la noche") +
      it("mNombre", "pencil", APP.cfg.nombreProvisional ? "Elegir el nombre de la app" : "El nombre de la app", APP.cfg.nombreProvisional ? "Pendiente" : "Elegido: " + APP.cfg.nombre) +
      it("mReporte", "send", "Reporte para Claude", "Para que ajuste la app a lo que más fallas") +
      it("mRespaldo", "shield", "Copia de seguridad", "Guarda o pasa tu avance a otro celular") +
      it("mTemas", "gear", "Temas, tiempo y persona", "Cambiar lo que entrenas") +
      it("mSonido", p.sonido ? "sound" : "mute", p.sonido ? "Sonido activado" : "Sonido apagado", "Toca para cambiarlo") +
      it("mNovedades", "sparkles", "Novedades", "Versión " + APP.cfg.version) +
      "</div>", {
        mStats: function () { APP.closeSheet(); APP.go("stats"); },
        mLogros: function () { APP.closeSheet(); APP.go("logros"); },
        mInstalar: function () { APP.closeSheet(); APP.go("instalar"); },
        mAvisos: function () { APP.closeSheet(); APP.go("avisos"); },
        mNombre: function () { APP.closeSheet(); APP.go("nombre"); },
        mReporte: function () { APP.closeSheet(); APP.go("reporte"); },
        mRespaldo: function () { APP.closeSheet(); APP.go("respaldo"); },
        mTemas: function () { APP.closeSheet(); APP.go("temas"); },
        mSonido: function () { p.sonido = !p.sonido; APP.store.save(); APP.closeSheet(); APP.toast(p.sonido ? "Sonido activado" : "Sonido apagado", p.sonido ? "sound" : "mute"); },
        mNovedades: function () { APP.closeSheet(); APP.go("novedades"); }
      });
  };

  /* =========================================================================
     MEMORIA (datos cruzados)
     ========================================================================= */
  V.memoria = function () {
    var p = APP.perfil();
    var h = '<div class="scr">' + APP.top("Memoria", { noBack: true }) +
      '<p class="lede">Los capítulos 1 a 3 del M06 caben en tres mapas. Cada mapa responde tres preguntas. El día de la prueba, recuerdas el mapa y respondes las tres.</p>';
    ["m06-1", "m06-2", "m06-3"].forEach(function (mid) {
      var M = D.mapas[mid], es = D.escenas.filter(function (e) { return e.mapa === mid; }), done = es.filter(function (e) { return p.esc[e.id] && p.esc[e.id].done; }).length;
      var on = p.temas[mid];
      h += '<div class="card stack"' + (on ? "" : ' style="opacity:.55"') + '><div class="row spread"><h3>' + esc(M.nombre) + '</h3><span class="chip">' + done + "/" + es.length + ' escenas</span></div><div class="row wrap">' +
        M.preguntas.map(function (q, i) { return '<span class="chip ' + ["y", "b", "g"][i] + '">' + esc(q) + "</span>"; }).join("") + '</div><div class="bar g"><i style="width:' + Math.round(100 * done / es.length) + '%"></i></div>' +
        '<div class="row"><button class="btn soft grow" data-act="verMapa" data-m="' + mid + '">Ver el mapa</button><button class="btn dark grow" data-act="escenas" data-m="' + mid + '">Escenas</button></div></div>';
    });
    h += '<div class="tiles">' + tile("raf", "bolt", "var(--hl-y)", "Ráfaga de gemelos", "Diez casos; cada pareja cambia un solo dato") +
      tile("reloj", "clock", "var(--hl-o)", "Contrarreloj", "Sesenta segundos para tu récord") + "</div>";
    h += "</div>";
    return { tab: "memoria", html: h, on: {
      verMapa: function (el) { APP.go("mapas", { m: el.getAttribute("data-m") }); },
      escenas: function (el) { APP.go("escenas", { m: el.getAttribute("data-m") }); },
      raf: function () { APP.go("rafaga", { mode: "gemelos", n: 10 }); },
      reloj: function () { APP.go("rafaga", { mode: "reloj" }); }
    } };
  };

  V.escenas = function (pr) {
    var p = APP.perfil(), M = D.mapas[pr.m], es = D.escenas.filter(function (e) { return e.mapa === pr.m; });
    var h = '<div class="scr">' + APP.top(M.nombre) + '<p class="muted">Cada escena dura un minuto, arma una pieza del mapa y te entrega láminas para el álbum.</p><div class="stack">';
    es.forEach(function (e, i) {
      var st = p.esc[e.id], done = st && st.done;
      h += '<button class="step' + (done ? " done" : "") + '" data-act="ver" data-id="' + e.id + '"><span class="dot">' + (done ? APP.ic("check", ' width="18" height="18"') : (i + 1)) + '</span><span><span class="t">' + esc(e.titulo) + '</span><br><span class="d">' + e.lam.length + " lámina" + (e.lam.length > 1 ? "s" : "") + (done ? " · vista" : "") + '</span></span><span class="tiny">1 min</span></button>';
    });
    h += "</div></div>";
    return { tab: "memoria", html: h, on: { ver: function (el) { APP.go("escena", { id: el.getAttribute("data-id") }); } } };
  };

  V.mapas = function (pr) {
    var m = pr.m || "m06-1";
    var h = '<div class="scr">' + APP.top("Los tres mapas") + '<div class="row wrap">' +
      ["m06-1", "m06-2", "m06-3"].map(function (id) { return '<button class="chip pick' + (id === m ? " on" : "") + '" data-act="tab" data-m="' + id + '">' + esc(D.mapas[id].nombre) + "</button>"; }).join("") + "</div>" +
      APP.mapHTML(m, []) + '<p class="tiny">Toca cualquier pieza para ver su lámina. Las piezas con candado se abren en las escenas.</p></div>';
    return { tab: "memoria", html: h, on: { tab: function (el) { APP.go("mapas", { m: el.getAttribute("data-m") }, { replace: true }); } } };
  };

  /* Escena: lección de un minuto */
  V.escena = function (pr) {
    var e = D.escenas.filter(function (x) { return x.id === pr.id; })[0];
    var st = pr.st || (pr.st = { fase: 0, sel: null });
    var total = e.cuerpo.length;
    var h = '<div class="scr full">' + APP.top(e.titulo, { close: true });
    h += '<div class="card stack">' + APP.mapHTML(e.mapa, e.foco, {}) + "</div>";
    h += '<div class="card stack read">';
    for (var i = 0; i <= Math.min(st.fase, total - 1); i++) h += '<p style="animation:rise .3s ease both">' + esc(e.cuerpo[i]) + "</p>";
    h += "</div>";
    if (st.fase >= total) h += '<div class="card sunk"><b><span class="mk g">Por qué tiene sentido</span></b><p class="small" style="margin-top:6px">' + esc(e.porque) + "</p></div>";
    if (st.fase >= total + 1) {
      var c = e.check;
      h += '<div class="stack"><p class="q">' + esc(c.q) + '</p><div class="opts">' + c.ops.map(function (o, j) {
        var cls = "opt";
        if (st.sel != null) { if (o.ok) cls += " ok"; else if (j === st.sel) cls += " bad"; else cls += " fade"; }
        return '<button class="' + cls + '" data-act="pick" data-j="' + j + '"' + (st.sel != null ? " disabled" : "") + '><span class="L">' + "ABC"[j] + "</span><span>" + esc(o.t) + "</span></button>";
      }).join("") + "</div>";
      if (st.sel != null) { var ok = c.ops[st.sel].ok; h += '<div class="fb ' + (ok ? "ok" : "bad") + '"><span class="h">' + (ok ? "¡Exacto!" : "Casi.") + '</span><span class="small">' + esc(c.ops[st.sel].por) + (ok ? "" : " La correcta: " + esc(c.ops.filter(function (o) { return o.ok; })[0].t)) + "</span></div>"; }
      h += "</div>";
    }
    h += '<div class="sticky-foot">';
    if (st.fase < total) h += '<button class="btn dark block" data-act="more">' + (st.fase + 1 < total ? "Siguiente idea (" + (st.fase + 1) + "/" + total + ")" : "Ver por qué tiene sentido") + "</button>";
    else if (st.fase === total) h += '<button class="btn dark block" data-act="more">Ponerlo a prueba</button>';
    else if (st.sel != null) h += '<button class="btn cta block" data-act="fin">Recibir mis láminas</button>';
    h += "</div></div>";
    return { tab: false, html: h, on: {
      more: function () { st.fase++; APP.sfx("swish"); APP.rerender(); window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }); },
      pick: function (el) {
        if (st.sel != null) return;
        st.sel = +el.getAttribute("data-j"); var ok = e.check.ops[st.sel].ok;
        APP.sfx(ok ? "ok" : "bad"); APP.vibrar(ok ? 15 : [30, 40, 30]);
        APP.track({ sub: lamById(e.lam[0]).sub, ok: ok, seg: 0, lam: [] });
        APP.rerender(); window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      },
      fin: function () {
        var p = APP.perfil(), ok = e.check.ops[st.sel].ok;
        p.esc[e.id] = { done: true, ok: ok, t: new Date().toISOString() }; APP.store.save();
        APP.revealLaminas(e.lam, function () {
          if (!ok) e.lam.forEach(function (id) { var L = p.lam[id]; if (L) L.due = U.today(); });
          var x = APP.addXP(ok ? 30 : 20);
          if (D.escenas.every(function (z) { return p.esc[z.id] && p.esc[z.id].done; })) APP.celebrarLogro(APP.logro("mapa"));
          if (pr.paso != null) APP.pasoHecho(pr.paso); else APP.back();
          if (x.levelUp) setTimeout(function () { APP.celebrarNivel(x.nivel); }, 600);
        });
      }
    } };
  };

  /* =========================================================================
     RÁFAGA DE CASOS (gemelos, repaso, caso del día, contrarreloj, duelo, refuerzo)
     ========================================================================= */
  V.rafaga = function (pr) {
    var S = pr.S;
    if (!S) {
      var mode = pr.mode || "gemelos";
      var seed = pr.seed || U.rnd();
      var weights = APP.pesosFamilias(mode === "repaso" ? "repaso" : (pr.sub ? { sub: pr.sub } : null));
      var lvlOf = function (f) { return mode === "caso" ? 3 : (mode === "reloj" ? Math.min(2, APP.famLvl(f)) : APP.famLvl(f)); };
      var n = mode === "reloj" ? 40 : (pr.n || 10);
      // En el duelo los dos deben recibir exactamente los mismos casos: todas las familias, sin pesos personales.
      var fams = mode === "duelo" ? APP.gen.FAM_IDS : APP.gen.FAM_IDS.filter(function (f) { return weights[f] > 0; });
      var cases = APP.gen.round({ seed: seed, n: n, lvl: mode === "duelo" ? function () { return 2; } : lvlOf, weights: mode === "duelo" ? null : weights, fams: fams, twins: mode !== "reloj" && mode !== "caso" });
      S = pr.S = { mode: mode, cases: cases, i: 0, sel: null, combo: 0, best: 0, ok: 0, xp: 0, t0: Date.now(), tItem: Date.now(), res: [], cambios: [], left: 60, seed: seed };
      if (mode === "reloj") startClock(S);
    }
    var c = S.cases[S.i], N = S.mode === "reloj" ? null : S.cases.length;
    if (S.fin) return rafagaFin(pr, S);
    var titles = { gemelos: "Gemelos", repaso: "Calentamiento", caso: "Reto del operador", reloj: "Contrarreloj", duelo: "Duelo " + (pr.code || ""), refuerzo: "Refuerzo" };
    var h = '<div class="scr full"><div class="progress-top"><button class="icon-btn" data-act="salir" aria-label="Salir">' + APP.ic("close") + "</button>";
    h += S.mode === "reloj" ? '<div class="timer"><i id="tbar" style="width:' + (100 * S.left / 60) + '%"></i></div><b class="num" id="tleft">' + S.left + " s</b>"
      : '<div class="bar y"><i style="width:' + Math.round(100 * S.i / N) + '%"></i></div><b class="num">' + (S.i + 1) + "/" + N + "</b>";
    h += "</div>";
    h += '<div class="row spread"><span class="chip">' + esc(titles[S.mode] || "Ráfaga") + " · " + esc(c.famNombre) + "</span>" + (S.combo >= 2 ? '<span class="combo">' + APP.ic("bolt", ' width="16" height="16"') + " x" + S.combo + "</span>" : "") + "</div>";
    if (c.twinOf && S.sel == null) h += '<div class="twin">' + APP.ic("refresh", ' width="18" height="18"') + "<span>Gemelo del caso anterior: algo cambió. Encuéntralo.</span></div>";
    h += '<div class="ctx">' + esc(c.ctx) + '</div><p class="q">' + esc(c.q) + '</p><div class="opts">';
    h += c.ops.map(function (o, j) {
      var cls = "opt";
      if (S.sel != null) { if (o.ok) cls += " ok"; else if (j === S.sel) cls += " bad"; else cls += " fade"; }
      return '<button class="' + cls + '" data-act="pick" data-j="' + j + '"' + (S.sel != null ? " disabled" : "") + '><span class="L">' + "ABC"[j] + "</span><span>" + esc(o.t) + "</span></button>";
    }).join("") + "</div>";
    if (S.sel != null && S.mode !== "reloj") {
      var okc = c.ops[S.sel].ok, right = c.ops[c.key];
      h += '<div class="fb ' + (okc ? "ok" : "bad") + '"><span class="h">' + (okc ? U.pick(["¡Correcto!", "¡Exacto!", "¡Bien leído!", "¡Eso es!"]) : "No era esa.") + "</span>" +
        '<span class="small">' + esc(c.ops[S.sel].por.replace(/^Correct[oa][.:]\s*/, "")) + "</span>" + (okc ? "" : '<span class="small"><b>La correcta:</b> ' + esc(right.por.replace(/^Correct[oa][.:]\s*/, "")) + "</span>") + "</div>";
      if (c.cambio) h += '<div class="twin">' + APP.ic("sparkles", ' width="18" height="18"') + "<span><b>Lo que cambió:</b> " + esc(c.cambio) + ". Un solo dato, y la respuesta cambió.</span></div>";
      if (c.linea) h += '<div class="card">' + APP.miniLine(c.linea) + "</div>";
      h += '<div class="card sunk small"><b>La regla</b><p style="margin-top:4px">' + esc(c.exp) + "</p></div>";
    }
    h += '<div class="sticky-foot">' + (S.sel != null && S.mode !== "reloj" ? '<button class="btn cta block" data-act="next">' + (S.i + 1 < N ? "Siguiente" : "Ver resultado") + "</button>" : "") + "</div></div>";
    return { tab: false, html: h,
      onBack: function () { return confirmSalir(S); },
      on: {
        salir: function () { if (confirmSalir(S) !== false) APP.back(); },
        pick: function (el) {
          if (S.sel != null || S.fin) return;
          S.sel = +el.getAttribute("data-j");
          var ok = c.ops[S.sel].ok, seg = (Date.now() - S.tItem) / 1000;
          if (ok) { S.ok++; S.combo++; S.best = Math.max(S.best, S.combo); } else S.combo = 0;
          var gain = ok ? 10 + (seg <= 12 ? 3 : 0) + (S.combo >= 3 ? 2 : 0) : 2;
          S.xp += gain;
          S.res.push({ c: c, sel: S.sel, ok: ok, seg: seg });
          var ch = APP.track({ sub: c.sub, fam: c.fam, ok: ok, seg: seg, lam: c.lam });
          S.cambios = S.cambios.concat(ch);
          if (ok) { APP.sfx(S.combo >= 3 ? "combo" : "ok", S.combo); APP.vibrar(12); } else { APP.sfx("bad"); APP.vibrar([30, 40, 30]); }
          if (S.mode === "reloj") { setTimeout(function () { if (S.fin) return; S.i++; S.sel = null; S.tItem = Date.now(); if (S.i >= S.cases.length) finish(S); APP.rerender(); }, ok ? 350 : 750); }
          APP.rerender();
          if (S.mode !== "reloj") setTimeout(function () { var f = document.querySelector(".fb"); if (f) f.scrollIntoView({ behavior: "smooth", block: "start" }); }, 60);
        },
        next: function () {
          if (S.i + 1 >= S.cases.length) { finish(S); APP.rerender(); return; }
          S.i++; S.sel = null; S.tItem = Date.now(); APP.sfx("tap"); APP.rerender();
        }
      } };
  };
  function startClock(S) {
    S.timer = setInterval(function () {
      S.left--;
      var b = document.getElementById("tbar"), l = document.getElementById("tleft");
      if (b) b.style.width = (100 * S.left / 60) + "%"; if (l) l.textContent = S.left + " s";
      if (S.left <= 5 && S.left > 0) APP.sfx("tick");
      if (S.left <= 0) { finish(S); APP.rerender(); }
    }, 1000);
  }
  function finish(S) { S.fin = true; if (S.timer) clearInterval(S.timer); }
  function confirmSalir(S) {
    if (S.fin || !S.res.length) { if (S.timer) clearInterval(S.timer); return true; }
    APP.sheet('<h2>¿Salir de la ronda?</h2><p class="muted">Lo que ya respondiste queda guardado en tus láminas y estadísticas, pero esta ronda no cuenta para la misión.</p><div class="row"><button class="btn soft grow" data-act="close">Seguir jugando</button><button class="btn dark grow" data-act="si">Salir</button></div>',
      { si: function () { APP.closeSheet(); if (S.timer) clearInterval(S.timer); S.res = []; S.fin = true; APP.back(); } });
    return false;
  }
  function rafagaFin(pr, S) {
    if (!S.cerrado) {
      S.cerrado = true;
      var p = APP.perfil();
      var lg = [];
      var total = S.res.length;
      if (S.mode !== "reloj" && total >= 6 && S.ok === total) lg.push(APP.logro("perfecta"));
      if (S.best >= 8) lg.push(APP.logro("combo-8"));
      if (S.mode === "reloj") { if (S.ok > p.records.contrarreloj) { p.records.contrarreloj = S.ok; S.record = true; } if (S.ok >= 12) lg.push(APP.logro("reloj-12")); }
      if (S.mode === "duelo") { p.duelos.push({ code: pr.code, ok: S.ok, n: total, seg: Math.round((Date.now() - S.t0) / 1000), t: new Date().toISOString() }); lg.push(APP.logro("duelo")); }
      APP.store.save();
      var x = APP.addXP(S.xp);
      S.levelUp = x.levelUp ? x.nivel : null;
      lg.filter(Boolean).forEach(APP.celebrarLogro);
      if (S.ok === total && total) { APP.sfx("level"); APP.confetti(); }
      ["f", "c", "v", "m"].forEach(function () {});
      if (S.cambios.some(function (c) { return c.to === 3; })) APP.celebrarLogro(APP.logro("dorada"));
    }
    var total2 = S.res.length, segs = Math.round((Date.now() - S.t0) / 1000);
    var h = '<div class="scr full">' + APP.top(S.mode === "reloj" ? "Se acabó el tiempo" : "Resultado", { close: true });
    h += '<div class="card stack" style="text-align:center"><div style="font-size:54px;font-weight:800;line-height:1" class="num">' + S.ok + "/" + total2 + '</div><p class="muted">' +
      (S.mode === "reloj" ? (S.record ? "¡Nuevo récord!" : "Récord: " + APP.perfil().records.contrarreloj) : (S.ok === total2 ? "Ronda perfecta." : S.ok >= total2 * 0.7 ? "Muy bien." : "Cada error te mostró una trampa: ya la conoces.")) +
      '</p><div class="row" style="justify-content:center"><span class="chip y">+' + S.xp + ' XP</span>' + (S.best >= 2 ? '<span class="chip o">Mejor combo x' + S.best + "</span>" : "") + '<span class="chip">' + U.mmss(segs) + "</span></div>" +
      (S.mode === "duelo" ? '<p class="small">Código del duelo: <b>' + esc(pr.code) + "</b>. Comparen el resultado: gana quien tenga más aciertos; si empatan, quien tardó menos.</p>" : "") + "</div>";
    var subidas = S.cambios.filter(function (c) { return c.to > c.from; }), bajadas = S.cambios.filter(function (c) { return c.to < c.from; });
    if (subidas.length || bajadas.length) {
      h += '<div class="card stack"><h3>Tu álbum</h3>' + subidas.map(function (c) { var l = lamById(c.id); return '<button class="row" data-act="lamina" data-id="' + c.id + '" style="border:0;background:none;text-align:left;cursor:pointer;padding:0"><span class="chip ' + (c.to === 3 ? "y" : "g") + '">' + (c.to === 3 ? "Dorada" : "Brillante") + '</span><span class="small grow">' + esc(l.t) + "</span></button>"; }).join("") +
        bajadas.map(function (c) { var l = lamById(c.id); return '<button class="row" data-act="lamina" data-id="' + c.id + '" style="border:0;background:none;text-align:left;cursor:pointer;padding:0"><span class="chip bad">Bajó</span><span class="small grow">' + esc(l.t) + "</span></button>"; }).join("") + "</div>";
    }
    var errs = S.res.filter(function (r) { return !r.ok; });
    if (errs.length) {
      h += '<h3>Para no repetir el error</h3>' + errs.map(function (r) {
        return '<div class="card stack"><p class="small read">' + esc(r.c.ctx) + '</p><p class="small"><span class="chip bad">Elegiste</span> ' + esc(r.c.ops[r.sel].t) + '</p><p class="small"><span class="chip ok">Era</span> ' + esc(r.c.ops[r.c.key].t) + '</p><p class="small muted">' + esc(r.c.exp) + "</p></div>";
      }).join("");
    }
    h += '<div class="sticky-foot">';
    if (pr.paso != null) h += '<button class="btn cta block" data-act="cont">Seguir con la misión</button>';
    else h += '<button class="btn cta block" data-act="otra">Otra ronda</button><button class="btn soft block" data-act="back">Volver</button>';
    h += "</div></div>";
    return { tab: false, html: h, on: {
      cont: function () { APP.pasoHecho(pr.paso); if (S.levelUp) setTimeout(function () { APP.celebrarNivel(S.levelUp); }, 2600); },
      otra: function () { APP.go("rafaga", { mode: S.mode === "duelo" ? "gemelos" : S.mode, n: S.mode === "caso" ? 2 : (S.cases.length > 10 ? 10 : S.cases.length), sub: pr.sub }, { replace: true }); }
    } };
  }

  /* =========================================================================
     ÁLBUM
     ========================================================================= */
  V.album = function (pr) {
    var pg = pr.pg || "p1";
    var tot = APP.lam.conteo();
    var h = '<div class="scr">' + APP.top("Álbum", { noBack: true }) +
      '<div class="card row"><div class="grow"><b class="num" style="font-size:22px">' + tot.obt + " de " + tot.total + '</b><p class="small muted">láminas obtenidas · ' + tot.bri + " brillantes · " + tot.dor + ' doradas</p></div>' + APP.ring(tot.total ? tot.obt / tot.total : 0, Math.round(100 * (tot.total ? tot.obt / tot.total : 0)) + "%", 64) + "</div>" +
      '<p class="small muted">Una lámina se obtiene en las escenas o al responder. Se vuelve <span class="mk g">brillante</span> cuando la aciertas otro día, y <span class="mk y">dorada</span> cuando la aciertas en un tercer día. Así funciona el repaso espaciado: sin que tengas que pensar en él.</p>';
    h += '<div class="row wrap">' + D.paginas.filter(function (p) { return APP.perfil().temas[p.tema]; }).map(function (p) { var c = APP.lam.conteo(p.id); return '<button class="chip pick' + (p.id === pg ? " on" : "") + '" data-act="pg" data-p="' + p.id + '">' + esc(p.nombre) + " · " + c.obt + "/" + c.total + "</button>"; }).join("") + "</div>";
    var ls = D.laminas.filter(function (l) { return l.pag === pg && APP.lamVisible(l); });
    h += '<div class="album-grid">' + ls.map(function (l) {
      var lv = APP.lam.get(l.id).lv || 0;
      return '<button class="lam l' + lv + '" style="--c:var(--hl-' + APP.lamColor(l) + ')" data-act="lamina" data-id="' + l.id + '"><span class="n">' + APP.lamNum(l) + '</span><span class="tt">' + (lv ? esc(l.t) : "Por obtener") + '</span><span class="lv"><i></i><i></i><i></i></span></button>';
    }).join("") + "</div>";
    var c = APP.lam.conteo(pg);
    if (c.total && c.obt === c.total) { var lg = APP.logro("pagina"); if (lg) setTimeout(function () { APP.celebrarLogro(lg); }, 400); }
    h += "</div>";
    return { tab: "album", html: h, on: { pg: function (el) { APP.go("album", { pg: el.getAttribute("data-p") }, { replace: true }); } } };
  };
})();

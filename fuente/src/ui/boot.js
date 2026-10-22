/* Arranque: primera pantalla, actualizaciones automáticas, cambio de día y estado de los avisos. */
var APP = window.APP || (window.APP = {});

(function () {
  "use strict";
  var U = APP.u, D = APP.data;
  var reg = null, recargando = false, t0 = Date.now(), diaActual = U.today();
  var EN_CURSO = ["rafaga", "simplay", "likert", "escena", "paseo", "paseoL", "onb"];

  /* ¿Se puede recargar sin interrumpir? Solo en pantallas de consulta y si no hay una hoja abierta. */
  function seguroRecargar() {
    var c = APP.current && APP.current();
    if (document.querySelector(".veil")) return false;
    if (c && c.name === "onb") return !c.params || !c.params.step;
    return !c || EN_CURSO.indexOf(c.name) < 0;
  }

  /* ---------------- Actualizaciones ---------------- */
  function aplicar(w) {
    if (!w) return;
    try { w.postMessage({ tipo: "SKIP_WAITING" }); } catch (e) {}
    setTimeout(function () { if (!recargando) { recargando = true; location.reload(); } }, 5000);
  }
  function barra(w) {
    // Recién abierta la app (o recién vuelta al frente) y sin nada en curso: se actualiza sola.
    if (Date.now() - t0 < 12000 && seguroRecargar()) {
      APP.toast("Actualizando a la versión nueva…", "refresh");
      aplicar(w);
      return;
    }
    if (document.querySelector(".update-bar")) return;
    var b = document.createElement("div");
    b.className = "update-bar"; b.setAttribute("role", "status");
    b.innerHTML = '<span class="grow">Hay una versión nueva de la app.</span><button class="btn dark" type="button">Actualizar</button>';
    b.querySelector("button").addEventListener("click", function () {
      this.disabled = true; b.querySelector("span").textContent = "Actualizando… tu avance no se pierde.";
      aplicar(w);
    });
    document.body.appendChild(b);
  }
  function registrarSW() {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("sw.js").then(function (r) {
      reg = r;
      if (r.waiting && navigator.serviceWorker.controller) barra(r.waiting);
      r.addEventListener("updatefound", function () {
        var nw = r.installing; if (!nw) return;
        nw.addEventListener("statechange", function () {
          if (nw.state === "installed" && navigator.serviceWorker.controller) barra(nw);
        });
      });
      setInterval(function () { r.update().catch(function () {}); }, 30 * 60 * 1000);
      revisarAvisos();
    }).catch(function (e) { APP.logError(e, "service worker"); });
    navigator.serviceWorker.addEventListener("controllerchange", function () {
      if (recargando) return; recargando = true; location.reload();
    });
  }
  APP.buscarActualizacion = function () {
    t0 = Date.now();
    if (reg) return reg.update().then(function () { return !!(reg.installing || reg.waiting); }).catch(function () { return false; });
    return Promise.resolve(false);
  };

  /* ---------------- Novedades después de actualizar ---------------- */
  function novedades(desde) {
    var nuevas = (APP.novedades || []).filter(function (n) { return n.v > desde; });
    if (!nuevas.length) return;
    APP.sheet('<p class="tiny">La app se actualizó sola · versión ' + U.esc(APP.cfg.version) + "</p><h2>Lo nuevo</h2>" + nuevas.map(function (n) {
      return '<div class="card stack"><b>' + U.esc(n.t) + '</b><ul class="small" style="margin:0;padding-left:18px;display:flex;flex-direction:column;gap:6px">' + n.d.map(function (x) { return "<li>" + U.esc(x) + "</li>"; }).join("") + "</ul></div>";
    }).join("") + '<button class="btn cta block" data-act="close">Seguir</button>', {});
  }

  /* ---------------- Avisos: ¿se desconectaron? ---------------- */
  function revisarAvisos() {
    var s = APP.store.raw();
    if (!s.avisos || !reg || !reg.pushManager) return;
    reg.pushManager.getSubscription().then(function (sub) {
      var roto = !sub || sub.endpoint !== s.avisos.endpoint || (window.Notification && Notification.permission !== "granted");
      if (roto !== !!s.avisosRoto) { s.avisosRoto = roto; APP.store.save(); var c = APP.current(); if (c && c.name === "home") APP.rerender(); }
    }).catch(function () {});
  }

  /* ---------------- Cambio de día ---------------- */
  function revisarDia() {
    var hoy = U.today();
    if (hoy === diaActual) return;
    diaActual = hoy;
    var c = APP.current();
    if (c && c.name === "home") APP.go("home", {}, { reset: true });
  }

  /* ---------------- Inicio ---------------- */
  function start() {
    var s = APP.store.load(), pl = APP.plataforma();
    if (pl.standalone && !s.instalado) { s.instalado = true; APP.store.save(); }
    var p = APP.perfil();
    if (!p || !p.onboard) APP.go("onb", { step: 0 }, { reset: true });
    else APP.go("home", {}, { reset: true });
    try { history.replaceState({ d: 1 }, ""); } catch (e) {}
    var ult = s.ultVersion;
    if (p && p.onboard && ult && ult !== APP.cfg.version) setTimeout(function () { novedades(ult); }, 700);
    if (s.ultVersion !== APP.cfg.version) { s.ultVersion = APP.cfg.version; APP.store.save(); }
    APP.mirror();
    registrarSW();
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState !== "visible") return;
      revisarDia();
      t0 = Date.now();
      if (reg) reg.update().catch(function () {});
      revisarAvisos();
    });
    window.addEventListener("error", function (e) { APP.logError(e.error || e.message, "global"); });
    window.addEventListener("unhandledrejection", function (e) { APP.logError(e.reason, "promesa"); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();

/* MiMeta (Plan Principal) · service worker.
   No guarda nada para usar sin internet (MiMeta exige conexión). Hace tres cosas:
   1) reemplaza al de Mérito y borra lo que Mérito dejó guardado en el celular;
   2) deja pasar todo a la red, sin copias viejas;
   3) muestra los avisos diarios. */
"use strict";
var VERSION = "P20261115.01";

self.addEventListener("install", function () { self.skipWaiting(); });

self.addEventListener("activate", function (e) {
  var habiaMerito = false;
  e.waitUntil(caches.keys().then(function (keys) {
    habiaMerito = keys.length > 0; // MiMeta no guarda nada: si hay algo guardado, es de Mérito
    return Promise.all(keys.map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }).then(function () {
    return habiaMerito ? self.clients.matchAll({ type: "window" }) : [];
  }).then(function (list) {
    // Una ventana que todavía muestra Mérito se recarga para mostrar MiMeta.
    list.forEach(function (c) { try { c.navigate(c.url.split("#")[0].split("?")[0] + "?mm=" + VERSION); } catch (err) {} });
  }));
});

self.addEventListener("message", function (e) {
  if (e.data && e.data.tipo === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith(fetch(req, { cache: "no-store" }).catch(function () {
    return new Response("<!doctype html><meta charset=utf-8><meta name=viewport content='width=device-width,initial-scale=1'><body style='font-family:sans-serif;padding:40px 24px;text-align:center'><h2>Necesitas internet</h2><p>MiMeta necesita conexión. Conéctate y vuelve a abrirla.</p><p><a href='./'>Reintentar</a></p>", { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } });
  }));
});

/* ---------------- Avisos ---------------- */
function leerResumen() {
  return new Promise(function (resolve) {
    try {
      var rq = indexedDB.open("mimeta", 1);
      rq.onupgradeneeded = function () { rq.result.createObjectStore("kv"); };
      rq.onerror = function () { resolve(null); };
      rq.onsuccess = function () {
        try {
          var g = rq.result.transaction("kv", "readonly").objectStore("kv").get("resumen");
          g.onsuccess = function () { resolve(g.result || null); };
          g.onerror = function () { resolve(null); };
        } catch (err) { resolve(null); }
      };
    } catch (err) { resolve(null); }
  });
}
function pad(n) { return (n < 10 ? "0" : "") + n; }
function ymd(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }

function componer(data, r) {
  var tipo = (data && data.tipo) || "manana", t, b, tag = "diario";
  var hoy = ymd(new Date());
  var nombre = r && r.nombre ? r.nombre + ", " : "";
  var alDia = r && r.hoy === hoy && r.pendientes === 0;
  if (tipo === "bienvenida") { t = "¡Avisos activados!"; b = "Así te llegarán: uno en la mañana y otro en la noche, para que no se te pasen las tarjetas."; tag = "bienvenida"; }
  else if (tipo === "prueba") { t = "Aviso de prueba"; b = "Si ves esto, los avisos de MiMeta funcionan."; tag = "prueba"; }
  else if (alDia) { t = "Hoy ya repasaste"; b = "Tus tarjetas están al día. Mañana seguimos."; }
  else if (tipo === "noche") { t = nombre ? nombre + "¿ya repasaste hoy?" : "¿Ya repasaste hoy?"; b = "Tus tarjetas de repaso toman pocos minutos y no dejan que se te olvide lo estudiado."; }
  else { t = nombre ? nombre + "tus tarjetas de hoy te esperan" : "Tus tarjetas de hoy te esperan"; b = "Pocos minutos de repaso. Ábrelas antes de empezar el día."; }
  return { t: t, opts: { body: b, icon: "icons/icon-192.png", badge: "icons/badge-96.png", tag: tag, renotify: true, data: { url: "./" }, lang: "es-CO" } };
}

self.addEventListener("push", function (e) {
  var data = {};
  try { data = e.data ? e.data.json() : {}; } catch (err) { data = {}; }
  e.waitUntil(leerResumen().then(function (r) {
    var n = componer(data, r);
    return self.registration.showNotification(n.t, n.opts);
  }));
});

self.addEventListener("notificationclick", function (e) {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (list) {
    for (var i = 0; i < list.length; i++) { if ("focus" in list[i]) return list[i].focus(); }
    return self.clients.openWindow("./");
  }));
});

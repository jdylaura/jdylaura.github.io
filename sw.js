/* Service worker de la app: la guarda en el celular para que funcione sin internet,
   detecta versiones nuevas y arma los avisos diarios con lo que la app sabe de cada uno. */
"use strict";
var VERSION = "2026-10-22.1";
var CACHE = "app-" + VERSION;
var ASSETS = ["./","index.html","app.js","styles.css","manifest.webmanifest","fonts/bricolage.woff2","fonts/literata.woff2","icons/icon-192.png","icons/icon-512.png","icons/apple-touch-icon.png","icons/badge-96.png","icons/favicon-32.png","icons/icon.svg"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return c.addAll(ASSETS.map(function (u) { return new Request(u, { cache: "reload" }); }));
  }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf("app-") === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("message", function (e) {
  if (e.data && e.data.tipo === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.indexOf("/avisos/") >= 0 || url.pathname.indexOf("/.github/") >= 0) return;
  if (req.mode === "navigate") {
    e.respondWith(caches.match("./index.html").then(function (r) { return r || fetch(req); }).catch(function () { return fetch(req); }));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(function (r) {
    return r || fetch(req);
  }));
});

/* ---------------- Avisos ---------------- */
function leerResumen() {
  return new Promise(function (resolve) {
    try {
      var rq = indexedDB.open("entrenamiento", 1);
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
function dias(n) { return n + (n === 1 ? " día" : " días"); }

function componer(data, r) {
  var tipo = (data && data.tipo) || "manana";
  var hoyD = new Date(), hoy = ymd(hoyD);
  var ayerD = new Date(hoyD.getFullYear(), hoyD.getMonth(), hoyD.getDate() - 1), ayer = ymd(ayerD);
  var t, b, tag = "diario";
  if (tipo === "bienvenida") {
    t = "¡Avisos activados!";
    b = "Así te llegarán: hacia las 6:30 a. m., tu misión del día; hacia las 8:00 p. m., cómo va tu racha.";
    tag = "bienvenida";
  } else if (tipo === "prueba") {
    t = "Aviso de prueba";
    b = "Si ves esto, los avisos de tu app funcionan.";
    tag = "prueba";
  } else if (!r) {
    t = tipo === "noche" ? "¿Ya hiciste tu misión de hoy?" : "Tu misión de hoy está lista";
    b = "Diez minutos y sumas un día a tu racha.";
  } else {
    var hechaHoy = r.hoy === hoy && r.misionHecha;
    var activa = r.racha > 0 && (r.ult === ayer || r.ult === hoy);
    var faltan = null;
    try { var f = new Date(r.prueba); faltan = Math.round((new Date(f.getFullYear(), f.getMonth(), f.getDate()) - new Date(hoyD.getFullYear(), hoyD.getMonth(), hoyD.getDate())) / 86400000); } catch (err) {}
    if (tipo === "manana") {
      if (hechaHoy) { t = "Misión de hoy cumplida"; b = "Racha de " + dias(r.racha) + ". Puedes repasar en la práctica libre."; }
      else {
        t = activa ? "Día " + (r.racha + 1) + " de tu racha: tu misión está lista" : (r.nombre ? r.nombre + ", tu misión de hoy está lista" : "Tu misión de hoy está lista");
        b = r.teaser ? "Pregunta del día: " + r.teaser : (faltan != null && faltan >= 0 ? "Faltan " + dias(faltan) + " para la prueba. Diez minutos y sumas un día." : "Diez minutos y sumas un día a tu racha.");
      }
    } else {
      if (hechaHoy) { t = "Racha asegurada: " + dias(r.racha); b = "Buen trabajo. Mañana hacia las 6:30 llega tu nueva misión."; }
      else if (activa) {
        t = "Tu racha de " + dias(r.racha) + " está en peligro";
        b = (r.hoy === hoy && r.pasosRestantes ? "Te faltan " + r.pasosRestantes + (r.pasosRestantes === 1 ? " paso" : " pasos") + "." : "Todavía no haces la misión de hoy.") + " Diez minutos y queda a salvo." + (r.comodines ? " Tienes un comodín, pero mejor no gastarlo." : "");
      } else { t = "Hoy todavía no entrenas"; b = "Diez minutos de misión y empiezas una racha nueva."; }
    }
  }
  return { t: t, opts: { body: b, icon: "icons/icon-192.png", badge: "icons/badge-96.png", tag: tag, renotify: true, data: { url: "./" }, lang: "es-CO" } };
}

self.addEventListener("push", function (e) {
  var data = {};
  try { data = e.data ? e.data.json() : {}; } catch (err) { data = {}; }
  e.waitUntil(leerResumen().then(function (r) {
    var n = componer(data, r);
    try {
      if (self.navigator && self.navigator.setAppBadge && r && r.hoy === ymd(new Date()) && r.pasosRestantes && !r.misionHecha) self.navigator.setAppBadge(r.pasosRestantes);
      else if (self.navigator && self.navigator.setAppBadge && (data.tipo === "manana") && !(r && r.hoy === ymd(new Date()) && r.misionHecha)) self.navigator.setAppBadge(1);
    } catch (err) {}
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

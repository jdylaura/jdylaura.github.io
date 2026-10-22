#!/usr/bin/env node
/* Envía los avisos diarios. Lo ejecuta GitHub Actions (.github/workflows/avisos.yml).
   Uso: node avisos/enviar.js manana|noche|bienvenida|prueba
   El texto del aviso NO viaja desde aquí: el celular lo arma con lo que la app sabe de cada uno
   (racha, pasos que faltan, pregunta del día). Aquí solo se manda el tipo y la fecha. */
"use strict";
const fs = require("fs");
const path = require("path");
const webpush = require("web-push");
const { descifrar } = require("./cifrado");

const DIR = __dirname;
const TIPOS = ["manana", "noche", "bienvenida", "prueba"];
const tipo = process.argv[2] || "manana";
if (TIPOS.indexOf(tipo) < 0) { console.error("Tipo desconocido: " + tipo); process.exit(1); }

const FILE = path.join(DIR, "suscripciones.json");
const lista = fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, "utf8")) : { suscripciones: [] };
let subs = lista.suscripciones || [];
if (tipo === "bienvenida") subs = subs.filter(function (s) { return Date.now() - Date.parse(s.agregada) < 3 * 3600 * 1000; });
if (!subs.length) { console.log("No hay celulares para avisar (" + tipo + ")."); process.exit(0); }

const PRIV = (process.env.VAPID_PRIVATE_KEY || "").trim();
if (!PRIV) { console.error("Falta el secreto VAPID_PRIVATE_KEY en GitHub (Settings → Secrets and variables → Actions)."); process.exit(1); }
const PUB = fs.readFileSync(path.join(DIR, "vapid-public.txt"), "utf8").trim();
webpush.setVapidDetails("https://jdylaura.github.io", PUB, PRIV);

const fecha = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
const payload = JSON.stringify({ v: 1, tipo: tipo, fecha: fecha });
const TTL = { manana: 4 * 3600, noche: 3 * 3600, bienvenida: 24 * 3600, prueba: 3600 }[tipo];

(async function () {
  let ok = 0, malas = 0;
  for (const s of subs) {
    const quien = s.quien + " · " + s.disp;
    let sub;
    try { sub = descifrar(s.c, PRIV); } catch (e) { console.log("✗ " + quien + ": no se pudo descifrar (¿cambió la llave?)"); malas++; continue; }
    try {
      const r = await webpush.sendNotification(sub, payload, { TTL: TTL, urgency: "high", topic: tipo === "noche" ? "noche" : "diario" });
      console.log("✓ " + quien + " (" + r.statusCode + ")"); ok++;
    } catch (e) {
      const st = e.statusCode || "sin respuesta";
      console.log("✗ " + quien + ": " + st + (st === 404 || st === 410 ? " · la suscripción venció: hay que activar los avisos de nuevo en ese celular" : " · " + String(e.body || e.message).slice(0, 160)));
      malas++;
    }
  }
  console.log("Enviados: " + ok + " · con problema: " + malas + " · tipo: " + tipo + " · fecha: " + fecha);
  if (!ok && malas) process.exit(1);
})();

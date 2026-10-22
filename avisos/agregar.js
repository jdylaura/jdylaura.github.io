#!/usr/bin/env node
/* Registra el celular de Laura o de Juan David para recibir avisos.
   Uso (desde la raíz del repositorio):  node avisos/agregar.js "AVISO-...."
   Solo usa la llave pública: cualquier sesión de Claude puede registrar un celular nuevo.
   Si la misma persona ya tenía registrado ese tipo de celular, la suscripción vieja se reemplaza. */
"use strict";
const fs = require("fs");
const path = require("path");
const { cifrar } = require("./cifrado");

const DIR = __dirname;
const FILE = path.join(DIR, "suscripciones.json");
const PUB = fs.readFileSync(path.join(DIR, "vapid-public.txt"), "utf8").trim();
const PERSONAS = ["laura", "juandavid"];

function falla(msg) { console.error("No se registró: " + msg); process.exit(1); }

const code = (process.argv.slice(2).join("") || "").replace(/\s+/g, "");
if (!/^AVISO-/.test(code)) falla("el código debe empezar por AVISO-");
let obj;
try { obj = JSON.parse(Buffer.from(code.slice(6), "base64").toString("utf8")); }
catch (e) { falla("el código está incompleto o mal copiado"); }
if (!obj || typeof obj.e !== "string" || !/^https:\/\//.test(obj.e)) falla("falta la dirección del celular");
if (!obj.k || !obj.k.p256dh || !obj.k.auth) falla("faltan las llaves del celular");
if (PERSONAS.indexOf(obj.q) < 0) falla("la persona no es Laura ni Juan David");
const disp = obj.d === "iphone" ? "iphone" : "android";
const host = new URL(obj.e).host;

const lista = fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, "utf8")) : { v: 1, suscripciones: [] };
const antes = lista.suscripciones.length;
lista.suscripciones = lista.suscripciones.filter(function (s) { return !(s.quien === obj.q && s.disp === disp); });
lista.suscripciones.push({ quien: obj.q, disp: disp, host: host, agregada: new Date().toISOString(),
  c: cifrar({ endpoint: obj.e, keys: { p256dh: obj.k.p256dh, auth: obj.k.auth } }, PUB) });
fs.writeFileSync(FILE, JSON.stringify(lista, null, 2) + "\n");
console.log("Registrada: " + obj.q + " · " + disp + " · " + host + (lista.suscripciones.length === antes ? " (reemplazó la anterior)" : ""));

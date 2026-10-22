#!/usr/bin/env node
/* Construye la app publicable: une los archivos, copia fuentes e íconos, escribe el manifiesto
   y el service worker con la versión. Uso: node tools/build.js [carpeta de salida] */
"use strict";
const fs = require("fs");
const path = require("path");
let sharp;
try { sharp = require("sharp"); } catch (e) { sharp = require("/opt/npm-tools/node_modules/sharp"); }
const QR = require("qrcode");

const ROOT = path.join(__dirname, "..");
const OUT = path.resolve(process.argv[2] || path.join(ROOT, "dist"));
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, "config/app.json"), "utf8"));
const vapid = fs.readFileSync(path.join(ROOT, "config/vapid-public.txt"), "utf8").trim();
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const mkdir = (p) => fs.mkdirSync(p, { recursive: true });

async function main() {
  mkdir(OUT); mkdir(path.join(OUT, "fonts")); mkdir(path.join(OUT, "icons"));

  /* ---------- JavaScript ---------- */
  const qrSvg = await QR.toString(cfg.url, { type: "svg", margin: 1, errorCorrectionLevel: "M", color: { dark: "#13182B", light: "#FFFFFF" } });
  const cfgJs = "APP.cfg = " + JSON.stringify({ nombre: cfg.nombre, nombreProvisional: !!cfg.nombreProvisional, version: cfg.version, vapid: vapid, url: cfg.url }) + ";\n" +
    "APP.qr = " + JSON.stringify(qrSvg.replace(/<svg /, '<svg role="img" aria-label="Código QR de la dirección de la app" ')) + ";\n";
  const parts = [
    "src/data/proyecto.js", "src/data/laminas.js", "src/data/escenas.js", "src/data/casos.js", "src/data/afirmaciones.js",
    "src/engine/gen.js", "__cfg__", "src/ui/core.js", "src/ui/kit.js", "src/ui/views.js", "src/ui/views2.js", "src/ui/boot.js"
  ];
  let js = "/* " + cfg.nombre + " · versión " + cfg.version + " · entrenamiento DIAN 2676 de Laura y Juan David. Hecha con Claude. */\n" +
    "var APP = window.APP || (window.APP = {});\n";
  for (const p of parts) js += "\n/* ===== " + p + " ===== */\n" + (p === "__cfg__" ? cfgJs : read(p)) + "\n";
  fs.writeFileSync(path.join(OUT, "app.js"), js);

  /* ---------- Estilos y fuentes ---------- */
  const fontCss =
    '@font-face { font-family: "Bricolage Grotesque Variable"; font-style: normal; font-display: swap; font-weight: 200 800; src: url("fonts/bricolage.woff2") format("woff2-variations"), url("fonts/bricolage.woff2") format("woff2"); }\n' +
    '@font-face { font-family: "Literata Variable"; font-style: normal; font-display: swap; font-weight: 200 900; src: url("fonts/literata.woff2") format("woff2-variations"), url("fonts/literata.woff2") format("woff2"); }\n';
  fs.writeFileSync(path.join(OUT, "styles.css"), fontCss + read("src/styles.css"));
  fs.copyFileSync(path.join(ROOT, "node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2"), path.join(OUT, "fonts/bricolage.woff2"));
  fs.copyFileSync(path.join(ROOT, "node_modules/@fontsource-variable/literata/files/literata-latin-wght-normal.woff2"), path.join(OUT, "fonts/literata.woff2"));

  /* ---------- Íconos ---------- */
  const icon = path.join(ROOT, "assets/icon.svg");
  const sizes = { "icon-192.png": 192, "icon-512.png": 512, "icon-maskable-512.png": 512, "apple-touch-icon.png": 180, "favicon-32.png": 32 };
  for (const [name, s] of Object.entries(sizes)) await sharp(icon, { density: 300 }).resize(s, s).png().toFile(path.join(OUT, "icons", name));
  await sharp(path.join(ROOT, "assets/badge.svg"), { density: 300 }).resize(96, 96).png().toFile(path.join(OUT, "icons/badge-96.png"));
  fs.copyFileSync(icon, path.join(OUT, "icons/icon.svg"));

  /* ---------- Manifiesto ---------- */
  const manifest = {
    id: "/",
    name: cfg.nombre + " · entrenamiento DIAN 2676",
    short_name: cfg.nombre,
    description: "Misión diaria, casos gemelos, álbum de láminas y simulacros para la prueba de la DIAN 2676.",
    lang: "es-CO", dir: "ltr",
    start_url: "./",
    scope: "./",
    display: "standalone",
    orientation: "portrait",
    background_color: "#EDF0F6",
    theme_color: "#EDF0F6",
    categories: ["education"],
    icons: [
      { src: "icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
    ]
  };
  fs.writeFileSync(path.join(OUT, "manifest.webmanifest"), JSON.stringify(manifest, null, 2));

  /* ---------- Página ---------- */
  const html = read("web/index.template.html").replace(/__NOMBRE__/g, cfg.nombre).replace(/__VERSION__/g, cfg.version);
  fs.writeFileSync(path.join(OUT, "index.html"), html);
  fs.writeFileSync(path.join(OUT, "robots.txt"), "User-agent: *\nDisallow: /\n");
  fs.writeFileSync(path.join(OUT, ".nojekyll"), "");

  /* ---------- Service worker ---------- */
  const assets = ["./", "index.html", "app.js", "styles.css", "manifest.webmanifest", "fonts/bricolage.woff2", "fonts/literata.woff2",
    "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "icons/badge-96.png", "icons/favicon-32.png", "icons/icon.svg"];
  const sw = read("web/sw.template.js").replace("__VERSION__", cfg.version).replace("__ASSETS__", JSON.stringify(assets));
  fs.writeFileSync(path.join(OUT, "sw.js"), sw);

  /* ---------- Avisos (servidor de GitHub Actions) ---------- */
  mkdir(path.join(OUT, "avisos"));
  for (const f of ["cifrado.js", "agregar.js", "enviar.js", "package.json", "package-lock.json", "vapid-public.txt"]) fs.copyFileSync(path.join(ROOT, "avisos", f), path.join(OUT, "avisos", f));
  if (!fs.existsSync(path.join(OUT, "avisos/suscripciones.json"))) fs.writeFileSync(path.join(OUT, "avisos/suscripciones.json"), JSON.stringify({ v: 1, suscripciones: [] }, null, 2) + "\n");
  mkdir(path.join(OUT, ".github/workflows"));
  fs.copyFileSync(path.join(ROOT, "web/.github/workflows/avisos.yml"), path.join(OUT, ".github/workflows/avisos.yml"));
  fs.writeFileSync(path.join(OUT, "README.md"), "# " + cfg.nombre + "\n\nApp de entrenamiento diario de Laura y Juan David para la prueba de la DIAN 2676 (CNSC). Hecha con Claude.\n\n" +
    "- La app se abre en " + cfg.url + " y se instala en la pantalla de inicio del celular.\n" +
    "- El avance de cada uno vive solo en su celular; aquí no hay datos de estudio.\n" +
    "- `fuente/` tiene el código y el contenido. Para publicar una versión: `cd fuente && npm install && node tools/build.js ..` y subir el cambio.\n" +
    "- `avisos/` y `.github/workflows/avisos.yml` envían los avisos diarios. Las direcciones de los celulares están cifradas; la llave para descifrarlas es un secreto de GitHub Actions (`VAPID_PRIVATE_KEY`), que nunca va en el repositorio.\n" +
    "- Para registrar un celular (desde la raíz): `node avisos/agregar.js \"AVISO-...\"` y subir el cambio; GitHub envía un aviso de bienvenida.\n");

  const kb = (f) => (fs.statSync(path.join(OUT, f)).size / 1024).toFixed(1) + " KB";
  console.log("Versión " + cfg.version + " · nombre " + cfg.nombre + " → " + OUT);
  console.log("app.js " + kb("app.js") + " · styles.css " + kb("styles.css") + " · fuentes " + kb("fonts/bricolage.woff2") + " + " + kb("fonts/literata.woff2"));
}
main().catch((e) => { console.error(e); process.exit(1); });

// Prueba del generador: miles de casos, cada uno con exactamente una opción correcta,
// tres opciones distintas, sin textos vacíos ni «undefined»/«NaN».
global.window = global;
require("../src/engine/gen.js");
const G = window.APP.gen;
let total = 0, errors = [], byFam = {}, keyPos = [0, 0, 0], lenRank = { longest: 0, middle: 0, shortest: 0 };
const samples = {};
for (let s = 1; s <= 6000; s++) {
  const lvl = 1 + (s % 3);
  const round = G.round({ seed: s * 7919, n: 10, lvl: () => lvl });
  for (const c of round) {
    total++;
    byFam[c.fam] = (byFam[c.fam] || 0) + 1;
    const oks = c.ops.filter(o => o.ok).length;
    const texts = c.ops.map(o => o.t);
    const all = [c.ctx, c.q, c.exp].concat(texts).concat(c.ops.map(o => o.por)).join(" | ");
    if (oks !== 1) errors.push(["oks=" + oks, c.fam, JSON.stringify(c.vars), c.ctx]);
    if (new Set(texts).size !== texts.length) errors.push(["dup", c.fam, texts]);
    if (c.ops.length !== 3) errors.push(["nops", c.fam, c.ops.length]);
    if (/undefined|NaN|\[object/.test(all)) errors.push(["bad text", c.fam, all.slice(0, 300)]);
    if (c.ops.some(o => !o.por)) errors.push(["no por", c.fam, texts]);
    keyPos[c.key]++;
    const lens = c.ops.map(o => o.t.length); const kl = lens[c.key]; const sorted = lens.slice().sort((a, b) => a - b);
    if (kl === sorted[2]) lenRank.longest++; else if (kl === sorted[0]) lenRank.shortest++; else lenRank.middle++;
    if (!samples[c.fam + c.lvl] ) samples[c.fam + c.lvl] = c;
  }
}
console.log("casos:", total, "errores:", errors.length);
console.log("por familia:", byFam);
console.log("posición de la clave:", keyPos, "longitud de la clave:", lenRank);
errors.slice(0, 10).forEach(e => console.log("ERR", e));
if (process.argv[2] === "show") {
  for (const k of Object.keys(samples).sort()) {
    const c = samples[k];
    console.log("\n=== " + c.fam + " nivel " + c.lvl + (c.cambio ? " (gemelo: " + c.cambio + ")" : ""));
    console.log(c.ctx); console.log(">> " + c.q);
    c.ops.forEach((o, i) => console.log((o.ok ? " ✔ " : "   ") + "ABC"[i] + ". " + o.t + "\n      · " + o.por));
  }
}

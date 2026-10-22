global.window = global;
require("../src/data/proyecto.js"); require("../src/data/afirmaciones.js");
const A = window.APP.data.afirmaciones, D = window.APP.data;
const corpus = require("/home/claude/ref/no_repetir.json");
const strip = t => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-zñ ]/g," ");
const STOP = new Set("de la el los las y a en que por con para un una mi mis me se lo le del al su sus o aunque cuando sin es no como mas ya ha he".split(" "));
const toks = t => new Set(strip(t).split(/\s+/).filter(w=>w.length>2 && !STOP.has(w)));
const ref = [].concat(corpus.items122.map(x=>x.texto), corpus.guia.map(x=>x.texto), corpus.anla.map(x=>x.texto));
// lecciones: afirmaciones de ejemplo
const fs=require('fs'); const les = fs.readFileSync('/home/claude/ref/txt_comp_all.txt','utf8').match(/«[^»]{25,220}»/g)||[];
const refAll = ref.concat(les.map(x=>x.slice(1,-1)));
let errs=0; const ids=new Set(); const stats={};
for (const a of A) {
  if (ids.has(a.id)) {console.log('dup id',a.id);errs++;} ids.add(a.id);
  for (const f of ['conducta','condicion','virtud']) if (a[f] && a.texto.indexOf(a[f])<0) {console.log(a.id,'NO SUBSTR',f,a[f]);errs++;}
  if (a.ind && !D.indicadores[a.ind]) {console.log(a.id,'bad ind');errs++;}
  if (a.val && !D.valores[a.val]) {console.log(a.id,'bad val');errs++;}
  const at=a.atractor; if (at && !D.competencias[at] && !D.valores[at]) {console.log(a.id,'bad atractor',at);errs++;}
  const T=toks(a.texto); let best=0,bt='';
  for (const r of refAll){ const R=toks(r); const inter=[...T].filter(x=>R.has(x)).length; const j=inter/(T.size+R.size-inter); if(j>best){best=j;bt=r;} }
  if (best>0.3) console.log(a.id, 'SIMILAR', best.toFixed(2), '|', a.texto, '||', bt);
  const k=a.tipo+'/'+a.pool; stats[k]=stats[k]||{D:0,A:0,H:0}; stats[k][a.clave]++;
}
console.log('errores',errs, 'total',A.length, stats);
for (const u of ['laura','juandavid']) { const inds=new Set(D.usuarios[u].indicadores);
  const sim=A.filter(a=>a.tipo==='comp'&&a.pool==='sim'&&(a.ind===null||inds.has(a.ind))); const dia=A.filter(a=>a.tipo==='comp'&&a.pool==='dia'&&(a.ind===null||inds.has(a.ind)));
  console.log(u,'comp sim',sim.length,'dia',dia.length, 'claves sim', sim.reduce((m,a)=>(m[a.clave]=(m[a.clave]||0)+1,m),{})); }

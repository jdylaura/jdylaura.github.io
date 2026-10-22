global.window = global;
require("../src/data/casos.js");
const C = window.APP.data.casos; let errs = 0; const pos=[0,0,0]; const rank={longest:0,middle:0,shortest:0}; const tec={};
for (const c of C) {
  const oks = c.ops.filter(o=>o.ok).length; if (oks!==1){console.log(c.id,'oks',oks);errs++;}
  const k = c.ops.findIndex(o=>o.ok); pos[k]++;
  const L = c.ops.map(o=>o.t.length), sorted=L.slice().sort((a,b)=>a-b);
  const r = L[k]===sorted[2]?'longest':(L[k]===sorted[0]?'shortest':'middle'); rank[r]++;
  tec[c.tec]=(tec[c.tec]||0)+1;
  const full = [c.caso, c.enunciado].concat(c.ops.map(o=>o.t)).join(' || ');
  for (const st of c.paseo) for (const m of (st.m||[])) if (full.indexOf(m.s)<0){console.log(c.id,'MISSING:',m.s);errs++;}
  for (const o of c.ops) if(!o.ok && !o.err){console.log(c.id,'no err type');errs++;}
  console.log(c.id, c.tec, 'clave', 'ABC'[k], r, L.join('/'));
}
console.log('errores',errs,'posiciones',pos,'longitud',rank,'técnicas',tec);

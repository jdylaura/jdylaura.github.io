/* MiMeta · conexión con el espacio privado (GitHub). */
(function () {
  'use strict';
  const F = window.F;
  const api = () => 'https://api.github.com/repos/' + F.native.repo() + '/contents/';
  const cab = (raw) => {
    const h = { Accept: raw ? 'application/vnd.github.raw+json' : 'application/vnd.github+json' };
    const t = F.native.token();
    if (t) h.Authorization = 'Bearer ' + t;
    return h;
  };
  const ruta = (p) => p.split('/').map(encodeURIComponent).join('/');

  async function pedir(url, opt, ms) {
    const ctl = new AbortController();
    const tm = setTimeout(() => ctl.abort(), ms || 20000);
    try { return await fetch(url, Object.assign({ signal: ctl.signal }, opt)); }
    finally { clearTimeout(tm); }
  }

  F.gh = {
    async texto(p) {
      const r = await pedir(api() + ruta(p) + '?ref=main&t=' + Date.now(), { headers: cab(true) });
      if (r.status === 404) return null;
      if (!r.ok) throw new Error('HTTP ' + r.status + ' leyendo ' + p);
      return await r.text();
    },
    async json(p) {
      const t = await F.gh.texto(p);
      return t == null ? null : JSON.parse(t);
    },
    async sha(p) {
      const r = await pedir(api() + ruta(p) + '?ref=main&t=' + Date.now(), { headers: cab(false) });
      if (r.status === 404) return null;
      if (!r.ok) throw new Error('HTTP ' + r.status + ' revisando ' + p);
      const j = await r.json();
      return j.sha || null;
    },
    async poner(p, obj, mensaje, reemplaza) {
      const contenido = typeof obj === 'string' ? obj : JSON.stringify(obj, null, 1);
      const body = { message: mensaje || ('MiMeta: ' + p), content: F.toB64(contenido), branch: 'main' };
      if (reemplaza) { const s0 = await F.gh.sha(p); if (s0) body.sha = s0; }
      let r = await pedir(api() + ruta(p), { method: 'PUT', headers: Object.assign({ 'Content-Type': 'application/json' }, cab(false)), body: JSON.stringify(body) });
      if (r.status === 422 || r.status === 409) {
        // el archivo ya existía: hay que decir cuál versión se reemplaza
        body.sha = await F.gh.sha(p);
        r = await pedir(api() + ruta(p), { method: 'PUT', headers: Object.assign({ 'Content-Type': 'application/json' }, cab(false)), body: JSON.stringify(body) });
      }
      if (!r.ok) throw new Error('HTTP ' + r.status + ' guardando ' + p);
      return true;
    },
    // ¿Hay internet y la llave sirve? (esta consulta no gasta cupo)
    async hayConexion() {
      if (navigator.onLine === false) return false;
      try {
        const r = await pedir('https://api.github.com/rate_limit', { headers: cab(false) }, 8000);
        return r.ok;
      } catch (e) { return false; }
    }
  };

  // Si ya hay un envío en curso, quien llama espera ese mismo envío (y lo nuevo se suma a la fila).
  let enCurso = null;
  F.enviarPendientes = () => {
    if (enCurso) return enCurso;
    enCurso = (async () => {
      try {
        // Antes de enviar nada se comprueba la conexión; si no hay, todo queda en la fila y sale cuando vuelva.
        if (F.conexion && !(await F.conexion.exigir())) return;
        let l = F.salida.lista();
        while (l.length) {
          const it = l[0];
          await F.gh.poner(it.ruta, it.obj);
          l = F.salida.lista(); l.shift(); F.salida.guardar(l);
        }
        F.bus.emit('salida', 0);
      } catch (e) {
        F.st.tec.ultimoError = String(e && e.message || e);
      }
    })().then(() => { enCurso = null; }, () => { enCurso = null; });
    return enCurso;
  };
  F.pendientesPorEnviar = () => F.salida.lista().length;
})();

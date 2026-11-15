/* MiMeta · traer lecciones, retos y simulacros nuevos, quitar los retirados y enviar el avance. */
(function () {
  'use strict';
  const F = window.F;
  const dirC = () => 'contenido/';
  const dirD = () => 'datos/' + F.st.activacion.cliente + '/';
  F.dirDatos = dirD;

  let corriendo = false;
  F.sincronizar = async (opts) => {
    if (!F.st.activacion || corriendo) return { ok: false };
    corriendo = true;
    const cambios = { nuevas: 0, nuevasLecciones: 0, retiradas: 0 };
    try {
      if (!(await F.gh.hayConexion())) return { ok: false, sinInternet: true };

      // ¿Sigue activa esta tablet? (el asesor puede pausar el plan o pasarlo a otra tablet)
      const reg = await F.gh.json(dirD() + 'registro.json');
      if (reg && (reg.estado !== 'activo' || reg.dispositivo !== F.st.activacion.dispositivo)) {
        F.st.bloqueo = reg.estado !== 'activo' ? 'pausado' : 'otra';
        F.guardar(true);
        F.bus.emit('bloqueo', F.st.bloqueo);
        return { ok: false, bloqueo: F.st.bloqueo };
      }
      if (F.st.bloqueo) { delete F.st.bloqueo; F.bus.emit('bloqueo', null); }

      const plan = await F.gh.json(dirC() + 'plan.json');
      if (plan) F.st.plan = Object.assign({}, plan, { nombre: F.st.activacion.nombre });
      const idx = await F.gh.json(dirC() + 'indice.json');
      if (idx) {
        const antes = F.st.indice || { lecciones: [], retos: [] };
        for (const tipo of ['lecciones', 'retos', 'simulacros']) {
          const carpeta = tipo + '/';
          const activas = (idx[tipo] || []).filter((x) => x.estado !== 'retirada');
          for (const it of activas) {
            const local = F.contenido.get(it.id);
            if (!local || (local.version || 0) < (it.version || 0)) {
              const c = await F.gh.json(dirC() + carpeta + it.id + '.json');
              if (c) { F.contenido.set(it.id, c); if (!local) { cambios.nuevas++; if (tipo === 'lecciones') cambios.nuevasLecciones++; } }
            }
          }
          // lo que ya no está activo se borra de la tablet
          for (const it of antes[tipo] || []) {
            if (!activas.find((x) => x.id === it.id)) { F.contenido.del(it.id); cambios.retiradas++; }
          }
        }
        if (idx.tarjetas) {
          const lt = F.contenido.get('tarjetas');
          if (!lt || (lt.version || 0) < (idx.tarjetas.version || 0)) {
            const t = await F.gh.json(dirC() + 'tarjetas.json');
            if (t) F.contenido.set('tarjetas', t);
          }
        }
        F.st.indice = idx;
      }
      F.st.tec.ultimaSync = new Date().toISOString();
      F.guardar(true);
      await F.enviarPendientes();
      if (opts && opts.subirEstado) await F.subirEstado(true);
      if (F.resumenAvisos) F.resumenAvisos();
      F.bus.emit('sincronizado', cambios);
      return Object.assign({ ok: true }, cambios);
    } catch (e) {
      F.st.tec.ultimoError = String(e && e.message || e);
      F.guardar();
      return { ok: false, error: F.st.tec.ultimoError };
    } finally {
      corriendo = false;
    }
  };

  // Copia del avance completo en el espacio privado: sirve al asesor y permite recuperar todo si se borra la app.
  F.subirEstado = async (forzar) => {
    if (!F.st.activacion) return;
    const ahora = Date.now();
    const ultimo = F.st.tec.estadoSubidoEl ? Date.parse(F.st.tec.estadoSubidoEl) : 0;
    if (!forzar && ahora - ultimo < 20 * 60 * 1000) return;
    const info = F.native.info();
    // Las dudas guardadas sin enviar son del cliente hasta que decida enviarlas: no salen en la copia del avance.
    const progreso = Object.assign({}, F.st.progreso, { dudas: (F.st.progreso.dudas || []).filter((d) => d.estado === 'enviada') });
    const estado = {
      cliente: F.st.activacion.cliente,
      actualizado: new Date().toISOString(),
      dispositivo: F.st.activacion.dispositivo,
      aplicacion: 'MiMeta',
      app: info.app, pantallas: F.VERSION_UI, webview: info.webview,
      progreso, ajustes: F.st.ajustes, pendientesPorEnviar: F.pendientesPorEnviar()
    };
    try {
      await F.gh.poner(dirD() + 'estado.json', estado, 'MiMeta: avance', true);
      F.st.tec.estadoSubidoEl = new Date().toISOString();
      F.guardar();
    } catch (e) { F.st.tec.ultimoError = String(e && e.message || e); }
  };

  F.enviar = (subruta, obj) => {
    F.salida.agregar(dirD() + subruta, obj);
    F.enviarPendientes();
  };

  // Listas que usa el inicio
  F.lecciones = () => ((F.st.indice && F.st.indice.lecciones) || [])
    .filter((x) => x.estado !== 'retirada' && F.contenido.get(x.id));
  F.retos = () => ((F.st.indice && F.st.indice.retos) || [])
    .filter((x) => x.estado !== 'retirada' && F.contenido.get(x.id));
  F.simulacros = () => ((F.st.indice && F.st.indice.simulacros) || [])
    .filter((x) => x.estado !== 'retirada' && F.contenido.get(x.id));
})();

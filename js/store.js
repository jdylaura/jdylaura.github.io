/* MiMeta · lo que la app guarda en la tablet (solo dentro de la app; no se ve en la galería ni en los archivos). */
(function () {
  'use strict';
  const F = window.F;
  const K_ESTADO = 'fokia.estado', K_OUT = 'fokia.salida', K_C = 'fokia.c.';

  const base = () => ({
    v: 1,
    activacion: null, // {cliente, fecha, dispositivo, cedulaHash}
    plan: null,
    indice: null,
    progreso: {
      lecturas: {}, // id -> {pos:{pagina,total,ancla,letra}, pct, terminado, terminadoEl, segundos, sesiones, retrocesos, saltos, abiertaEl}
      pausas: {},   // leccion:bloque -> {elegida, correcta, fecha}
      ysi: {},      // leccion:bloque -> fecha
      retos: {},    // id -> {intentos:[{fecha, aciertos, total, estrellas, repaso, seguras, segurasBien}], ultimaVariante:{pregunta:variante}}. Las estrellas son solo las del primer intento; los demás son repasos.
      simulacros: {}, // id -> {intentos:[{fecha, aciertos, total, porcentaje}], ultimo:{...detalle del último intento, para repasar el paseo del experto}}
      tarjetas: {}, // id -> {caja, proxima, vistas, fallos, ultima}
      dias: {},     // fecha -> {seg, lectura, retos, tarjetas, mision}
      logros: {},   // id -> fecha
      dudas: [],    // {id, fecha, donde:{leccion,titulo,pagina,total,letra,ancla,fragmento}, texto, estado:'guardada'|'enviada', enviadaEl, editadaEl}. Las guardadas NO salen de la tableta.
      avisosVistos: {},
      tarjetasDiaCompleto: {} // fecha -> true
    },
    ajustes: {
      letra: 2,
      fondo: 'papel',
      recordatorios: null // {activos, horas}
    },
    tec: { ultimaSync: null, ultimoError: null, estadoSubidoEl: null }
  });

  let st;
  try { st = JSON.parse(localStorage.getItem(K_ESTADO)) || base(); } catch (e) { st = base(); }
  // completar campos nuevos sin perder lo guardado
  const b = base();
  st.progreso = Object.assign(b.progreso, st.progreso || {});
  st.ajustes = Object.assign(b.ajustes, st.ajustes || {});
  st.tec = Object.assign(b.tec, st.tec || {});

  let tGuardar = null;
  F.st = st;
  F.guardar = (inmediato) => {
    const go = () => { try { localStorage.setItem(K_ESTADO, JSON.stringify(F.st)); } catch (e) { console.error('guardar', e); } };
    clearTimeout(tGuardar);
    if (inmediato) go(); else tGuardar = setTimeout(go, 250);
  };
  F.reiniciarTodo = () => {
    Object.keys(localStorage).filter((k) => k.startsWith('fokia.')).forEach((k) => localStorage.removeItem(k));
    F.st = base();
  };

  // Contenido (lecciones, retos, tarjetas), cada uno en su propio cajón
  F.contenido = {
    get: (id) => { try { return JSON.parse(localStorage.getItem(K_C + id)); } catch (e) { return null; } },
    set: (id, obj) => localStorage.setItem(K_C + id, JSON.stringify(obj)),
    del: (id) => localStorage.removeItem(K_C + id)
  };

  // Bandeja de salida: lo que debe llegarle al asesor cuando haya internet
  F.salida = {
    lista: () => { try { return JSON.parse(localStorage.getItem(K_OUT)) || []; } catch (e) { return []; } },
    guardar: (l) => localStorage.setItem(K_OUT, JSON.stringify(l)),
    agregar: (ruta, obj) => { const l = F.salida.lista(); l.push({ ruta, obj, t: Date.now() }); F.salida.guardar(l); }
  };

  // Registro del día (para la meta semanal y la misión)
  F.dia = (fecha) => {
    fecha = fecha || F.hoy();
    const d = F.st.progreso.dias;
    if (!d[fecha]) d[fecha] = { seg: 0, lectura: 0, retos: 0, tarjetas: 0, mision: false };
    return d[fecha];
  };
  F.esDiaDeEstudio = (reg) => !!reg && (reg.lectura >= 300 || reg.retos > 0 || reg.tarjetas >= 5 || reg.mision);
})();

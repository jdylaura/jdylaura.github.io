/* MiMeta · todo exige internet.
   Sin conexión aparece una pantalla de bloqueo («Necesitas internet», con «Reintentar») por encima de todo:
   no se puede leer, repasar tarjetas, hacer retos ni simulacros. La conexión se comprueba:
   al abrir, al volver la app al primer plano, cada cierto tiempo mientras está abierta y antes de cada envío. */
(function () {
  'use strict';
  const F = window.F;
  const CADA = 25 * 1000;          // revisión periódica
  const FRESCO = 3 * 1000;         // una comprobación reciente sirve para las acciones inmediatas

  let enLinea = true, ultima = 0, enCurso = null, pantalla = null, corre = false;

  const ICONO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 8.8a15 15 0 0 1 6.2-3.3"/><path d="M22 8.8a15 15 0 0 0-8.5-4.1"/><path d="M5 12.6a10 10 0 0 1 3.2-2"/><path d="M19 12.6a10 10 0 0 0-4.3-2.6"/><path d="M8.5 16.4a5 5 0 0 1 7 0"/><path d="M12 20h.01"/><path d="M3 3l18 18"/></svg>';

  function mostrar() {
    if (pantalla) return;
    pantalla = F.h(`<div class="sin-internet" role="alertdialog" aria-labelledby="siTit"><div>
      ${F.mascota('sin_senal', { clase: 'centro' })}
      <h2 id="siTit">Necesitas internet</h2>
      <p>MiMeta necesita conexión para repasar y hacer retos y simulacros, y para guardar tu avance en el espacio privado. Conéctate al WiFi o a tus datos móviles y toca «Reintentar».</p>
      <button class="btn primario grande" id="siOtra">Reintentar</button>
      <p class="ayuda nota-chica" id="siNota"></p>
    </div></div>`);
    pantalla.querySelector('#siOtra').onclick = reintentar;
    document.body.appendChild(pantalla);
    F.bus.emit('pausa'); // el tiempo de lectura y de respuesta no corre mientras no hay conexión
  }

  function ocultar() {
    if (!pantalla) return;
    pantalla.remove(); pantalla = null;
    F.bus.emit('reanuda');
  }

  async function reintentar() {
    const b = pantalla && pantalla.querySelector('#siOtra'), nota = pantalla && pantalla.querySelector('#siNota');
    if (b) { b.disabled = true; b.textContent = 'Revisando…'; }
    const ok = await comprobar(true);
    if (!ok && pantalla) {
      const b2 = pantalla.querySelector('#siOtra'), n2 = pantalla.querySelector('#siNota');
      b2.disabled = false; b2.textContent = 'Reintentar';
      n2.textContent = navigator.onLine === false
        ? 'Todavía no hay conexión en este celular.'
        : 'Parece que hay red pero MiMeta no logra conectarse. Revisa el WiFi; si sigue igual, puede que la llave haya vencido: cuéntaselo a Claude.';
    }
  }

  function cambiar(ok) {
    const antes = enLinea;
    enLinea = ok;
    if (!ok) { mostrar(); return; }
    ocultar();
    if (!antes) alVolver();
  }

  // Lo que quedó pendiente de envío sale en cuanto vuelve la conexión.
  function alVolver() {
    F.enviarPendientes().then(() => {
      if (F.st.activacion) return F.sincronizar({ subirEstado: true }).then((r) => { if (F.avisarNuevo) F.avisarNuevo(r); if (!F.hayCompleta()) F.render(); });
    });
  }

  function comprobar(forzar) {
    if (enCurso) return enCurso;
    if (!forzar && Date.now() - ultima < FRESCO) return Promise.resolve(enLinea);
    enCurso = (async () => {
      let ok = false;
      try { ok = await F.gh.hayConexion(); } catch (e) { ok = false; }
      ultima = Date.now();
      cambiar(ok);
      return ok;
    })().then((ok) => { enCurso = null; return ok; }, () => { enCurso = null; return false; });
    return enCurso;
  }

  F.conexion = {
    enLinea: () => enLinea,
    comprobar,
    // Antes de una acción que envía datos: true si hay conexión; si no, aparece el bloqueo y la acción no sigue.
    exigir: () => comprobar(false),
    // Al abrir la app (y para quedar vigilando mientras está abierta)
    iniciar: () => {
      if (!corre) {
        corre = true;
        setInterval(() => { if (!document.hidden) comprobar(true); }, CADA);
        window.addEventListener('offline', () => { ultima = Date.now(); cambiar(false); });
        window.addEventListener('online', () => comprobar(true));
      }
      return comprobar(true);
    },
    // Al volver la app al primer plano: se mira antes de seguir contando el tiempo.
    alVolverAlPrimerPlano: () => comprobar(true).then((ok) => { if (ok) F.bus.emit('reanuda'); return ok; })
  };
})();

/* MiMeta · pantalla técnica escondida (se abre tocando 7 veces la versión en «Mi avance»). Sirve al asesor para revisar y arreglar. */
(function () {
  'use strict';
  const F = window.F;

  F.vistas.tecnico = () => {
    const info = F.native.info();
    const t = F.st.tec;
    const filas = [
      ['Cliente', F.st.activacion && F.st.activacion.cliente],
      ['Tableta', info.modelo], ['Android', info.android + ' (API ' + info.sdk + ')'],
      ['Navegador interno (WebView)', info.webview],
      ['Versión de la app', info.app], ['Versión de las pantallas', F.VERSION_UI + ' (instaladas: ' + info.pantallas + ')'],
      ['Llave de la app', info.llave ? 'sí' : 'NO'],
      ['Identificador de la tableta', info.dispositivo],
      ['Última sincronización', t.ultimaSync || 'nunca'],
      ['Pendientes por enviar', F.pendientesPorEnviar()],
      ['Dudas guardadas sin enviar (solo en esta tableta)', F.dudasSinEnviar().length],
      ['Último error', t.ultimoError || 'ninguno']
    ];
    const el = F.h(`<div class="completa">
      <div class="arriba"><button class="icono-btn" data-a="salir">← <span>Salir</span></button><div class="titulo">Información técnica</div><div style="width:52px"></div></div>
      <div class="cuerpo" style="flex:1;overflow-y:auto;padding:6px 20px 30px">
        <div class="caja">${filas.map(([k, v]) => `<div style="padding:8px 0;border-bottom:1px solid var(--linea)"><div class="ayuda">${F.esc(k)}</div><div style="word-break:break-all">${F.esc(v)}</div></div>`).join('')}</div>
        <div class="caja" style="margin-top:16px">
          <button class="btn secundario grande" data-x="sync">Sincronizar ahora</button>
          <button class="btn secundario grande" data-x="ui" style="margin:10px 0 0">Buscar pantallas nuevas</button>
          <button class="btn secundario grande" data-x="rec" style="margin:10px 0 0">Probar un recordatorio</button>
          <button class="btn secundario grande" data-x="inf" style="margin:10px 0 0">Enviar este informe a Claude</button>
        </div>
        <div class="caja" style="margin-top:16px"><h2>Salir de MiMeta en este celular</h2>
          <label class="campo"><span>Para confirmar, escribe SALIR</span><input id="codA" autocomplete="off"></label>
          <button class="btn suave grande" data-x="desact" style="margin-top:12px">Salir y borrar la llave de este celular</button>
          <p class="ayuda">Borra la llave y el plan de este celular. Tu avance queda guardado en el espacio privado y vuelve completo cuando entres de nuevo con la llave.</p>
        </div>
      </div></div>`);
    el.querySelector('[data-a="salir"]').onclick = () => { F.cerrarCompleta(true); F.ir('avance'); };
    el.addEventListener('click', async (e) => {
      const b = e.target.closest('[data-x]'); if (!b) return;
      const x = b.dataset.x;
      if (x === 'sync') { b.disabled = true; const r = await F.sincronizar({ subirEstado: true }); b.disabled = false; F.aviso(r.ok ? 'Sincronizado ✓' : ('No se pudo: ' + (r.error || (r.sinInternet ? 'sin internet' : r.bloqueo || ''))), r.ok ? 'ok' : 'mal'); }
      if (x === 'ui') { F.native.checkUiUpdate(); F.aviso('Buscando… si hay algo nuevo, aparece un aviso.'); }
      if (x === 'rec') F.native.testReminder();
      if (x === 'inf') { F.enviar('tecnico/' + F.marcaTiempo() + '.json', { info, tec: F.st.tec, pantallas: F.VERSION_UI, salida: F.pendientesPorEnviar() }); F.aviso('Informe en camino ✓', 'ok'); }
      if (x === 'desact') {
        const cod = F.normCodigo(el.querySelector('#codA').value);
        const h = await F.sha256('fokia-asesor:' + cod);
        if (cod !== 'SALIR') { F.aviso('Escribe SALIR en el cuadro para confirmar.', 'mal'); return; }
        await F.enviarPendientes();
        await F.subirEstado(true);
        F.native.setReminders({ activos: false, horas: [] });
        F.reiniciarTodo(); F.llave.borrar();
        F.cerrarCompleta(true);
        location.hash = '#/activar';
        F.render();
      }
    });
    F.abrirCompleta(el);
  };
})();

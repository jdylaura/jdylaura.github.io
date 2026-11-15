/* MiMeta · armazón: pestañas, pantallas completas, botón atrás y arranque. */
(function () {
  'use strict';
  const F = window.F;
  F.vistas = F.vistas || {};

  const ICO = {
    hoy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h14V9.5"/><path d="M10 20v-6h4v6"/></svg>',
    leer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5z"/><path d="M12 6.5v13"/></svg>',
    practicar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>',
    simulacro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13.5" r="7.5"/><path d="M12 9.5v4l2.6 1.6"/><path d="M9.5 3h5"/><path d="M12 3v3"/></svg>',
    dudas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4h0A2.5 2.5 0 0 1 4 13.5z"/><path d="M9.6 8.4a2.4 2.4 0 1 1 3.4 2.2c-.6.3-1 .8-1 1.4"/><path d="M12 13.6h.01"/></svg>',
    avance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 21l5-2.5 5 2.5-1.5-7"/><path d="m10 9 1.5 1.5L14.5 7.5"/></svg>'
  };
  F.ICO = ICO;
  const PESTANAS = [['hoy', 'Hoy'], ['practicar', 'Retos'], ['simulacro', 'Simulacro'], ['avance', 'Mi avance']];

  function armazon() {
    if (F.$('#app .nav')) return;
    const app = F.$('#app');
    app.innerHTML = `
      <header class="cab"><img src="img/logo.png" alt=""><div class="marca">MiMeta<small>Plan Principal</small></div><div class="der" id="cabDer"></div></header>
      <main class="vista" id="vista"></main>
      <nav class="nav">${PESTANAS.map(([id, t]) => `<a href="#/${id}" data-p="${id}">${ICO[id]}<span>${t}</span>${id === 'dudas' ? '<b class="insignia" id="insDudas" hidden></b>' : ''}</a>`).join('')}</nav>`;
  }

  F.ruta = () => {
    const r = (location.hash || '').replace(/^#\/?/, '');
    const partes = r.split('/');
    return { vista: partes[0] || 'hoy', arg: partes[1] || null };
  };
  F.ir = (r) => { if (location.hash === '#/' + r) F.render(); else location.hash = '#/' + r; };

  // ---------- Pantallas completas encima de las pestañas ----------
  let completa = null, cierreCompleta = null;
  F.abrirCompleta = (el, alCerrar) => {
    F.cerrarCompleta(true);
    completa = el; cierreCompleta = alCerrar || null;
    document.body.appendChild(el);
  };
  F.cerrarCompleta = (silencioso) => {
    F.atrasLocal = null; // gancho del botón «atrás» propio de una pantalla completa (p. ej. el paseo del simulacro)
    if (completa) {
      const fn = cierreCompleta; completa.remove(); completa = null; cierreCompleta = null;
      if (fn && !silencioso) { try { fn(); } catch (e) { console.error(e); } }
    }
  };
  F.hayCompleta = () => !!completa;

  // ---------- Hojas que suben desde abajo ----------
  let hojaAbierta = null;
  F.hoja = (html, alMontar) => {
    F.cerrarHoja();
    const v = F.h(`<div class="velo"><div class="hoja">${html}</div></div>`);
    v.addEventListener('click', (e) => { if (e.target === v) F.cerrarHoja(); });
    document.body.appendChild(v);
    hojaAbierta = v;
    if (alMontar) alMontar(v.querySelector('.hoja'));
    return v;
  };
  F.cerrarHoja = () => { if (hojaAbierta) { hojaAbierta.remove(); hojaAbierta = null; return true; } return false; };

  // ---------- Marca de agua ----------
  F.marcaAgua = (el, tono) => {
    const txt = (F.st.plan && F.st.plan.marcaAgua) || '';
    const color = tono || '#44506B';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="330"><text x="250" y="165" text-anchor="middle" transform="rotate(-24 250 165)" font-family="Atkinson, sans-serif" font-size="16" fill="${color}" fill-opacity="0.085">${F.esc(txt)}</text></svg>`;
    el.style.backgroundImage = 'url("data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg) + '")';
    el.style.backgroundRepeat = 'repeat';
  };

  // ---------- Dibujo de la pantalla ----------
  F.render = () => {
    const { vista, arg } = F.ruta();
    if (!F.st.activacion) {
      F.cerrarCompleta(true);
      F.$('#app').innerHTML = '';
      return F.vistas.activar();
    }
    armazon();
    const bloqueo = F.$('.bloqueo'); if (bloqueo) bloqueo.remove();
    if (F.st.bloqueo) return mostrarBloqueo(F.st.bloqueo);

    const enPestana = PESTANAS.find((p) => p[0] === vista);
    const pest = enPestana ? vista : (F.ultimaPestana || 'hoy');
    F.$$('.nav a').forEach((a) => a.classList.toggle('activo', a.dataset.p === pest));
    if (enPestana) {
      F.ultimaPestana = vista;
      F.cerrarCompleta(true);
      const v = F.$('#vista');
      v.innerHTML = '';
      v.scrollTop = 0;
      F.vistas[vista](v);
    } else if (F.vistas[vista]) {
      if (!F.$('#vista').children.length) F.vistas[pest](F.$('#vista'));
      F.vistas[vista](arg);
    } else {
      F.ir('hoy');
    }
    const der = F.$('#cabDer');
    if (der) {
      const p = F.pendientesPorEnviar();
      der.innerHTML = p ? `<span class="chip dorado" title="Se envían cuando haya internet">${p} por enviar</span>` : '';
    }
    F.insigniaDudas();
  };
  // Número de dudas guardadas (sin enviar) sobre el menú
  F.dudasSinEnviar = () => F.st.progreso.dudas.filter((d) => d.estado !== 'enviada');
  F.insigniaDudas = () => {
    const b = F.$('#insDudas'); if (!b) return;
    const n = F.dudasSinEnviar().length;
    b.hidden = !n; b.textContent = n;
  };

  function mostrarBloqueo(tipo) {
    const msg = tipo === 'otra'
      ? 'Tu plan quedó activo en otra tableta. Si cambiaste de tableta, pídele a tu asesor un código nuevo.'
      : 'Tu plan está en pausa por ahora. Habla con tu asesor para reanudarlo.';
    document.body.appendChild(F.h(`<div class="bloqueo"><div><img src="img/logo.png" style="width:110px;height:110px;margin:0 auto 12px" alt=""><h2>MiMeta</h2><p>${F.esc(msg)}</p><button class="btn secundario" onclick="F.sincronizar().then(F.render)">Volver a revisar</button></div></div>`));
  }

  // ---------- Teléfono: botón atrás, pausa y regreso ----------
  window.fokiaBack = () => {
    if (F.$('.sin-internet')) return false; // sin conexión no hay nada que cerrar: la app se va al fondo
    if (F.cerrarHoja()) return true;
    if (F.$('.medalla-nueva')) { F.$('.medalla-nueva').remove(); return true; }
    if (F.hayCompleta() && F.atrasLocal && F.atrasLocal()) return true;
    if (F.hayCompleta()) { F.cerrarCompleta(); F.ir(F.ultimaPestana || 'hoy'); return true; }
    if (F.st.activacion && F.ruta().vista !== 'hoy') { F.ir('hoy'); return true; }
    return false;
  };
  let ultimaVuelta = Date.now();
  window.fokiaPause = () => { F.bus.emit('pausa'); F.guardar(true); };
  window.fokiaResume = () => {
    // Al volver al primer plano se comprueba la conexión antes de seguir contando el tiempo.
    F.conexion.alVolverAlPrimerPlano().then((ok) => {
      if (ok && Date.now() - ultimaVuelta > 10 * 60 * 1000 && F.st.activacion) {
        ultimaVuelta = Date.now();
        F.sincronizar().then(() => { if (!F.hayCompleta()) F.render(); });
      }
    });
  };
  document.addEventListener('visibilitychange', () => { if (document.hidden) window.fokiaPause(); else window.fokiaResume(); });
  // Nada de copiar ni de menú contextual
  [].forEach((ev) => document.addEventListener(ev, (e) => {
    if (!e.target.closest || !e.target.closest('input, textarea')) e.preventDefault();
  }));

  window.fokiaUiUpdated = (v) => {
    F.versionNueva = v;
    if (!F.st.activacion) { F.native.reload(); return; } // antes de activar no hay nada que interrumpir
    if (F.hayCompleta()) return; // no interrumpir una lectura ni un reto
    const v0 = F.$('#vista');
    if (v0 && !F.$('#franjaNueva')) {
      const f = F.h(`<div class="franja" id="franjaNueva">Hay una versión nueva de MiMeta. <button class="btn primario">Actualizar</button></div>`);
      f.querySelector('button').onclick = () => F.native.reload();
      v0.insertBefore(f, v0.firstChild);
    }
  };
  window.fokiaUiError = (e) => { F.st.tec.ultimoErrorPantallas = e; };

  // ---------- Arranque ----------
  window.addEventListener('hashchange', F.render);
  // Aviso de contenido nuevo. Si el plan incluye sesiones presenciales, cada aviso de lección nueva lo recuerda.
  F.FRASE_PRESENCIAL = 'Si tu plan incluye sesiones presenciales con tu asesor, no olvides escribirle.';
  F.avisarNuevo = (r) => {
    if (!r || !r.nuevas) return;
    let t = r.nuevas === 1 ? 'Te llegó contenido nuevo.' : `Te llegaron ${r.nuevas} cosas nuevas.`;
    if (r.nuevasLecciones && F.st.plan && F.st.plan.presencial) { t += ' ' + F.FRASE_PRESENCIAL; F.aviso(t, 'ok', 9000); }
    else F.aviso(t, 'ok');
  };
  async function iniciar() {
    try { await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]); } catch (e) {}
    F.render();
    F.native.checkUiUpdate(); // también antes de activar: así un arreglo de pantallas llega sin reinstalar
    const hay = await F.conexion.iniciar(); // si no hay internet, queda el bloqueo; al volver la conexión se sincroniza solo
    if (F.st.activacion) {
      if (hay) {
        const r = await F.sincronizar({ subirEstado: true });
        if (!F.hayCompleta()) F.render();
        F.avisarNuevo(r);
      }
      F.actualizarRecordatorios();
      F.revisarLogros();
      setInterval(() => { F.sincronizar(); }, 30 * 60 * 1000);
    }
  }
  F.bus.on('salida', () => { const d = F.$('#cabDer'); if (d && !F.pendientesPorEnviar()) d.innerHTML = ''; });
  F.bus.on('bloqueo', () => F.render());
  document.addEventListener('DOMContentLoaded', iniciar);
})();

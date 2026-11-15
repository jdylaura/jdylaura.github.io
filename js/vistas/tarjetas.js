/* MiMeta · tarjetas de repaso (cajas que vuelven en 1, 3, 7, 16, 35 y 90 días). */
(function () {
  'use strict';
  const F = window.F;
  const INT = [1, 3, 7, 16, 35, 90];

  F.vistas.tarjetas = () => {
    const P = F.st.progreso;
    const banco = F.contenido.get('tarjetas');
    const lista = F.tarjetasDeHoy().sort(() => Math.random() - 0.5);
    const el = F.h(`<div class="completa">
      <div class="arriba"><button class="icono-btn" data-a="salir">← <span>Salir</span></button><div class="titulo">Tarjetas de repaso</div><div class="chip" id="cuenta"></div></div>
      <div class="tarjetas-zona"></div></div>`);
    const zona = el.querySelector('.tarjetas-zona');
    const sesion = { inicio: new Date().toISOString(), items: [] };
    let k = 0, tCarta = 0;

    el.querySelector('[data-a="salir"]').onclick = () => { cerrar(); F.cerrarCompleta(true); F.ir(F.ultimaPestana || 'practicar'); };
    function cerrar() {
      if (sesion.items.length && !sesion.enviada) {
        sesion.enviada = true;
        sesion.fin = new Date().toISOString();
        F.enviar('repasos/' + F.marcaTiempo() + '.json', sesion);
        F.subirEstado();
      }
    }

    if (!lista.length) {
      const total = banco && banco.items ? banco.items.length : 0;
      zona.innerHTML = `<div class="caja vacio" style="margin-top:20px">${F.mascota('victoria', { clase: 'centro' })}<h2>No tienes tarjetas para hoy</h2>
        <p>${total ? 'Ya repasaste todo lo que tocaba. Las tarjetas vuelven solas en los días justos para que no se te olviden.' : 'Las tarjetas nuevas llegan después de la comprobación de cada lección. Después vuelven solas en los días justos para que no se te olviden.'}</p>
        <button class="btn primario grande" id="ok">Volver</button></div>`;
      zona.querySelector('#ok').onclick = () => { F.cerrarCompleta(true); F.ir(F.ultimaPestana || 'hoy'); };
      F.abrirCompleta(el);
      return;
    }

    function mostrar() {
      const c = lista[k];
      el.querySelector('#cuenta').textContent = (k + 1) + ' de ' + lista.length;
      zona.innerHTML = `
        <div class="ficha"><div class="marca-agua"></div><div class="tema">${F.esc(c.tema || '')}</div>
          <div class="frente">${F.md(c.frente)}</div><div class="reverso" hidden>${F.md(c.reverso)}${c.fuente ? '<p class="ayuda" style="margin-top:12px;font-size:13px">Fuente: ' + F.esc(c.fuente) + '</p>' : ''}</div></div>
        <div id="acc"><button class="btn primario grande" id="mostrar" style="margin-top:14px">Mostrar la respuesta</button>
          <p class="ayuda" style="text-align:center">Primero trata de responder en tu mente. Después mira.</p></div>`;
      F.marcaAgua(zona.querySelector('.marca-agua'));
      tCarta = Date.now();
      zona.querySelector('#mostrar').onclick = () => {
        zona.querySelector('.reverso').hidden = false;
        zona.querySelector('#acc').innerHTML = `<div class="tres-r">
          <button class="no" data-r="no">No la sabía<small>vuelve mañana</small></button>
          <button class="du" data-r="du">Dudé<small>se queda en su caja</small></button>
          <button class="si" data-r="si">La sabía<small>sube de caja</small></button></div>
          <p class="ayuda" style="text-align:center">Responde con sinceridad: si dudaste, marca «Dudé». Así la tarjeta vuelve cuando la necesitas.</p>`;
        zona.querySelectorAll('[data-r]').forEach((b) => b.onclick = () => calificar(c, b.dataset.r));
      };
    }

    function calificar(c, r) {
      const s = P.tarjetas[c.id] || (P.tarjetas[c.id] = { caja: 1, vistas: 0, fallos: 0 });
      if (r === 'no') { s.caja = 1; s.fallos++; }
      else if (r === 'si') { s.caja = Math.min(INT.length, (s.caja || 1) + 1); }
      s.vistas++;
      s.ultima = F.hoy();
      s.proxima = F.sumarDias(F.hoy(), INT[(s.caja || 1) - 1]);
      sesion.items.push({ id: c.id, r, caja: s.caja, segundos: Math.round((Date.now() - tCarta) / 1000) });
      F.dia().tarjetas++;
      F.guardar();
      k++;
      if (k < lista.length) mostrar(); else final();
    }

    function final() {
      if (!F.tarjetasDeHoy().length) P.tarjetasDiaCompleto[F.hoy()] = true;
      F.guardar(true);
      cerrar();
      const sabia = sesion.items.filter((x) => x.r === 'si').length;
      const manana = (banco.items || []).filter((c) => { const s = P.tarjetas[c.id]; return s && s.proxima === F.sumarDias(F.hoy(), 1); }).length;
      zona.innerHTML = `<div class="caja vacio" style="margin-top:20px">${F.mascota('victoria', { clase: 'centro' })}<h2>¡Listo por hoy!</h2>
        <p>Repasaste ${sesion.items.length} ${sesion.items.length === 1 ? 'tarjeta' : 'tarjetas'} y sabías ${sabia}.${manana ? ' Mañana te esperan ' + manana + '.' : ''}</p>
        <p class="ayuda">Cada vez que recuerdas una tarjeta, sube de caja y vuelve más tarde. Las que fallas vuelven pronto: así se quedan contigo.</p>
        <button class="btn primario grande" id="ok">Volver a Hoy</button></div>`;
      zona.querySelector('#ok').onclick = () => { F.cerrarCompleta(true); F.ir('hoy'); };
      F.revisarLogros();
      F.actualizarRecordatorios();
    }

    F.abrirCompleta(el, cerrar);
    mostrar();
  };
})();

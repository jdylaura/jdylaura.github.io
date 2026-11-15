/* MiMeta (Plan Principal) · entrada única en este celular: quién eres y la llave del espacio privado. */
(function () {
  'use strict';
  const F = window.F;
  const QUIENES = [['juan-david', 'Juan David'], ['laura', 'Laura']];
  let quien = null;

  F.vistas.activar = () => {
    const app = F.$('#app');
    app.innerHTML = `
      <div class="activar">
        <div class="logo"><img src="img/logo.png" alt=""><div><b>MiMeta</b><span>Plan Principal · Juan David y Laura</span></div></div>
        <div class="caja" id="cajaActivar"></div>
        <p class="ayuda" style="text-align:center;margin-top:18px">La llave se guarda solo en este celular. No la envíes por ningún chat.</p>
      </div>`;
    form();
  };

  function form() {
    const c = F.$('#cajaActivar');
    c.innerHTML = `
      <h2>Entra a tu plan</h2>
      <p class="sub">Esto se hace una sola vez en este celular. Después entras directo.</p>
      <div class="campo"><span>¿Quién va a estudiar en este celular?</span>
        <div class="fila" style="gap:10px;margin-top:6px">${QUIENES.map(([id, n]) => `<button class="btn secundario" style="flex:1" data-q="${id}">${n}</button>`).join('')}</div></div>
      <label class="campo"><span>Llave del espacio privado</span><input id="aLlave" type="password" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Pégala aquí (empieza por github_pat_)"></label>
      <div id="aErr"></div>
      <button class="btn primario grande" id="aBtn" style="margin-top:18px">Entrar</button>`;
    F.$$('[data-q]', c).forEach((b) => b.onclick = () => {
      quien = b.dataset.q;
      F.$$('[data-q]', c).forEach((x) => { const si = x === b; x.classList.toggle('primario', si); x.classList.toggle('secundario', !si); });
    });
    F.$('#aBtn').onclick = entrar;
  }

  const error = (t) => { F.$('#aErr').innerHTML = t ? `<div class="error">${F.esc(t)}</div>` : ''; };

  async function entrar() {
    const btn = F.$('#aBtn');
    const llave = (F.$('#aLlave').value || '').replace(/\s+/g, '');
    error('');
    if (!quien) return error('Toca tu nombre: Juan David o Laura.');
    if (llave.length < 20) return error('Pega la llave completa. Empieza por github_pat_ y es larga.');
    btn.disabled = true; btn.textContent = 'Entrando…';
    try {
      if (navigator.onLine === false) throw new Error('Para entrar necesitas internet. Conéctate y vuelve a intentarlo.');
      F.llave.set(llave);
      let r;
      try {
        r = await fetch('https://api.github.com/repos/' + F.native.repo() + '/contents/contenido/plan.json?ref=main&t=' + Date.now(),
          { headers: { Accept: 'application/vnd.github.raw+json', Authorization: 'Bearer ' + llave } });
      } catch (e) { throw new Error('No se pudo conectar. Revisa tu internet y vuelve a intentarlo.'); }
      if (r.status === 401) throw new Error('Esa llave no sirve: está mal copiada, venció o fue borrada. Cópiala otra vez completa.');
      if (r.status === 403 || r.status === 404) throw new Error('La llave no tiene permiso para el espacio privado del Plan Principal. Hay que crearla de nuevo siguiendo la guía.');
      if (!r.ok) throw new Error('No se pudo entrar (error ' + r.status + '). Inténtalo otra vez en un momento.');
      const plan = JSON.parse(await r.text());
      const nombre = QUIENES.find((q) => q[0] === quien)[1];
      const info = F.native.info();
      F.st.activacion = { cliente: quien, nombre, fecha: new Date().toISOString(), dispositivo: info.dispositivo };
      F.st.plan = Object.assign({}, plan, { nombre });
      // Si ya había avance guardado en el espacio privado (el que venía del Aula, o el de otro celular), vuelve completo.
      const est = await F.gh.json('datos/' + quien + '/estado.json');
      const volvio = !!(est && est.progreso);
      if (volvio) { F.st.progreso = Object.assign(F.st.progreso, est.progreso); if (est.ajustes) F.st.ajustes = Object.assign(F.st.ajustes, est.ajustes); }
      F.guardar(true);
      const c = F.$('#cajaActivar');
      c.innerHTML = `<div class="vacio"><div class="grande">⏳</div>Preparando tu plan…</div>`;
      await F.sincronizar({ subirEstado: true });
      const due = F.tarjetasDeHoy().length;
      c.innerHTML = `<div class="vacio"><img src="img/logo.png" alt="" style="width:132px;height:132px;margin:0 auto 10px"><h2>¡Listo, ${F.esc(nombre)}!</h2>
        <p>${volvio ? 'Tus tarjetas llegaron con el avance que ya traías.' : 'Tu plan ya está en este celular.'} ${due ? 'Tienes ' + due + (due === 1 ? ' tarjeta' : ' tarjetas') + ' para hoy.' : ''}</p>
        <button class="btn primario grande" id="aEntrar">Empezar</button></div>`;
      F.confeti();
      F.$('#aEntrar').onclick = () => { F.actualizarRecordatorios(); F.revisarLogros(); location.hash = '#/hoy'; F.render(); };
    } catch (e) {
      F.llave.borrar();
      F.st.activacion = null;
      error(e.message || String(e));
      btn.disabled = false; btn.textContent = 'Entrar';
    }
  }
})();

/* MiMeta · Retos: preguntas con su explicación. Todos los retos viven mezclados en un solo espacio.
   Formato del reto (ver CLAUDE.md): casos compartidos, gemelos (campo «cambio») y variantes. */
(function () {
  'use strict';
  const F = window.F;

  const estrellas = (n) => '<span class="estrellas">' + [1, 2, 3].map((i) => i <= n ? '★' : '<span class="no">★</span>').join('') + '</span>';
  F.estrellasHtml = estrellas;

  // ---------- Retos (lista) ----------
  F.vistas.practicar = (v) => {
    const P = F.st.progreso;
    const retos = F.retos();
    const due = F.tarjetasDeHoy().length;
    v.innerHTML = `
      <section><h1 style="margin:6px 0 2px;font-size:30px">Retos</h1>
      <p class="ayuda" style="margin:0">Casos como los del examen. Aquí se aprende de verdad: tratando de resolver, no releyendo.</p></section>
      <section class="caja tarjetas-atajo">
        <div class="num">${due}</div>
        <div class="txt"><b>Tarjetas de repaso</b><span>${due ? (due === 1 ? 'una para hoy' : due + ' para hoy') : 'nada pendiente por hoy'}</span></div>
        <button class="btn ${due ? 'primario' : 'secundario'}" data-ir="tarjetas">Repasar</button>
      </section>
      <section id="listaRetos">
        ${retos.length ? retos.map((r) => {
          const pr = P.retos[r.id];
          const ints = (pr && pr.intentos) || [];
          const primero = ints[0] || null;
          const repasos = ints.slice(1);
          const lecOk = !r.leccion || (P.lecturas[r.leccion] && P.lecturas[r.leccion].terminado);
          const lec = ((F.st.indice && F.st.indice.lecciones) || []).find((x) => x.id === r.leccion);
          return `<a class="item ${lecOk ? '' : 'bloqueado'} ${primero ? 'hecho' : ''}" href="#/reto/${r.id}">
            <div class="num">${F.mascota('ejercicio', { mini: true })}</div><div class="txt"><b>${F.esc(r.titulo)}</b>
            <small>${lecOk ? (r.preguntas || '') + ' preguntas' : 'Primero termina ' + F.esc(lec ? lec.titulo : 'su lección')}</small>
            ${primero ? `<div>${estrellas(primero.estrellas)} <span class="ayuda">primer intento · ${primero.aciertos} de ${primero.total}</span></div>`
              : (lecOk ? '<span class="chip dorado">Nuevo</span>' : '')}
            ${repasos.length ? `<div class="repasos">${repasos.length === 1 ? 'Repaso' : 'Repasos'}: ${repasos.slice(-3).map((i) => `<span class="rp">${i.aciertos} de ${i.total} · ${F.esc(F.fechaCorta(i.fecha))}</span>`).join('')}</div>` : ''}
            </div><div class="flecha">›</div></a>`;
        }).join('') : '<div class="caja vacio">' + F.mascota('espera', { clase: 'centro' }) + 'Todavía no hay retos del Plan Principal. Cuando Claude publique uno, aparece aquí.</div>'}
        <p class="ayuda" style="text-align:center;margin-top:14px">Las estrellas son las de tu primer intento. Si repites un reto, cuenta como repaso y no cambia tus estrellas.</p>
      </section>`;
    F.$$('[data-ir]', v).forEach((b) => b.onclick = () => F.ir('tarjetas'));
  };

  // ---------- Un reto ----------
  F.vistas.reto = (id) => {
    const reto = F.contenido.get(id);
    if (!reto) { F.aviso('Ese reto ya no está disponible.'); return F.ir('practicar'); }
    const P = F.st.progreso;
    if (reto.leccion && !(P.lecturas[reto.leccion] && P.lecturas[reto.leccion].terminado)) {
      const lec = ((F.st.indice && F.st.indice.lecciones) || []).find((x) => x.id === reto.leccion);
      F.ir(F.ultimaPestana || 'practicar');
      F.hoja(`<h3>Primero, la lección</h3><p>Este reto mide lo que aprendiste en «${F.esc(lec ? lec.titulo : 'su lección')}». Termínala y el reto se abre solo.</p>
        <button class="btn primario grande" id="irLec">Ir a la lección</button>`, (h) => { h.querySelector('#irLec').onclick = () => { F.cerrarHoja(); F.ir('lector/' + reto.leccion); }; });
      return;
    }
    const preguntas = reto.preguntas || [];
    const el = F.h(`<div class="completa reto">
      <div class="arriba"><button class="icono-btn" data-a="salir">← <span>Salir</span></button><div class="titulo">${F.esc(reto.titulo)}</div><div style="width:52px"></div></div>
      <div class="progreso-reto">${preguntas.map(() => '<i></i>').join('')}</div>
      <div class="cuerpo"><div class="marca-agua"></div><div class="zona"></div></div></div>`);
    const zona = el.querySelector('.zona');
    F.marcaAgua(el.querySelector('.marca-agua'));
    const intento = { reto: id, version: reto.version, inicio: null, respuestas: [], variantes: {} };
    let i = 0, terminado = false, tPregunta = 0, pausaT = null;
    let versiones = [];      // cada pregunta ya resuelta a su versión (si tiene variantes, la escogida para este intento)

    // El tiempo de respuesta no corre mientras no hay conexión o la app está en segundo plano
    F.bus.on('pausa', () => { if (document.body.contains(el) && pausaT === null) pausaT = Date.now(); });
    F.bus.on('reanuda', () => { if (document.body.contains(el) && pausaT !== null) { tPregunta += Date.now() - pausaT; pausaT = null; } });

    el.querySelector('[data-a="salir"]').onclick = () => {
      if (terminado || !intento.inicio) { cerrar(); return; }
      F.hoja(`<h3>¿Salir del reto?</h3><p>Llevas ${intento.respuestas.length} de ${preguntas.length} preguntas. Si sales ahora, el reto queda sin terminar y tendrás que empezarlo otra vez.</p>
        <div class="fila"><button class="btn secundario" onclick="F.cerrarHoja()">Seguir con el reto</button><button class="btn suave" id="salirSi">Salir</button></div>`,
      (h) => { h.querySelector('#salirSi').onclick = () => { F.cerrarHoja(); enviarIncompleto(); cerrar(); }; });
    };
    function cerrar() { F.cerrarCompleta(true); F.ir(F.ultimaPestana || 'practicar'); }
    function enviarIncompleto() {
      if (!intento.respuestas.length) return;
      F.enviar('resultados/' + F.marcaTiempo() + '_' + id + '_incompleto.json', Object.assign({}, intento, { incompleto: true, fin: new Date().toISOString() }));
    }

    // ----- Variantes: una versión al azar por intento, distinta de la del intento anterior -----
    const idPregunta = (q, k) => q.id || ('q' + (k + 1));
    const idVariante = (v, n) => v.id || ('v' + (n + 1));
    function resolverVersiones() {
      const pr = P.retos[id] || (P.retos[id] = { intentos: [] });
      const ult = pr.ultimaVariante || (pr.ultimaVariante = {});
      intento.variantes = {};
      versiones = preguntas.map((q, k) => {
        const qid = idPregunta(q, k);
        if (!q.variantes || !q.variantes.length) return Object.assign({}, q, { id: qid });
        let cand = q.variantes.map((v, n) => n);
        if (cand.length > 1) cand = cand.filter((n) => idVariante(q.variantes[n], n) !== ult[qid]);
        const n = cand[Math.floor(Math.random() * cand.length)];
        const v = q.variantes[n], vid = idVariante(v, n);
        ult[qid] = vid;
        intento.variantes[qid] = vid;
        const base = Object.assign({}, q); delete base.variantes;
        return Object.assign(base, v, { id: qid, variante: vid });
      });
      F.guardar(true);
    }
    const casoDe = (x) => (typeof x.caso === 'string' ? (reto.casos || {})[x.caso] : (x.caso || null)) || null;

    async function inicio() {
      zona.innerHTML = '<div class="vacio">' + F.mascota('sin_senal', { clase: 'centro' }) + 'Revisando la conexión…</div>';
      const ok = await F.conexion.exigir();
      if (!ok) {
        zona.innerHTML = `<div class="caja vacio">${F.mascota('sin_senal', { clase: 'centro' })}<h2>Necesitas internet</h2>
          <p>Los retos necesitan internet para guardar tus resultados apenas termines. Conéctate y vuelve a intentarlo.</p>
          <button class="btn primario grande" id="otraVez">Reintentar</button></div>`;
        zona.querySelector('#otraVez').onclick = inicio;
        return;
      }
      const prev = (P.retos[id] && P.retos[id].intentos.length) || 0;
      zona.innerHTML = `
        <div class="caja"><h2>${F.esc(reto.titulo)}</h2>
          ${reto.entrena ? `<p class="sub">${F.md(reto.entrena)}</p>` : ''}
          <div class="fila" style="margin-top:6px"><span class="chip">${preguntas.length} preguntas</span><span class="chip">unos ${reto.minutos || Math.max(5, preguntas.length * 2)} min</span>${prev ? '<span class="chip repaso">Esta vez es un repaso</span>' : ''}</div>
          ${prev ? '<p class="ayuda" style="margin:10px 0 0">Tus estrellas de este reto son las de tu primer intento. Este intento queda como repaso, con su resultado.</p>' : ''}</div>
        <div class="caja" style="border:2px solid #E8B10E"><h2>Antes de empezar</h2>
          <p style="margin:6px 0 0">Resuélvelo <b>sin ayudas</b>: sin buscar en internet, sin preguntarle a nadie y sin volver a la lección. Si usas ayudas, el resultado deja de mostrar lo que de verdad sabes, y la autopsia no podrá decir qué te falta.</p></div>
        <div class="caja"><h2>Después de cada respuesta, dime qué tan segura es</h2>
          <div class="paso" style="margin-top:10px"><div class="ico n">•</div><div class="txt"><b>Segura</b><span>Podría explicar por qué es esa.</span></div></div>
          <div class="paso"><div class="ico n">•</div><div class="txt"><b>Dudosa</b><span>Dudé entre dos, o no estoy del todo convencido.</span></div></div>
          <div class="paso"><div class="ico n">•</div><div class="txt"><b>Adiviné</b><span>No sabía y escogí sin saber.</span></div></div>
          <p class="ayuda" style="margin-top:10px">Si dudas entre dos marcas, escoge la más baja. Esto no te quita puntos: te enseña a saber qué sabes.</p></div>
        <button class="btn primario grande" id="empezar">Empezar el reto</button>`;
      zona.querySelector('#empezar').onclick = () => {
        intento.inicio = new Date().toISOString(); intento.intento = prev + 1; intento.repaso = prev > 0;
        resolverVersiones();
        pregunta();
      };
    }

    function pintarProgreso() {
      el.querySelectorAll('.progreso-reto i').forEach((n, k) => {
        n.className = '';
        const r = intento.respuestas[k];
        if (r) n.classList.add(r.correcta ? 'ok' : 'mal'); else if (k === i) n.classList.add('ya');
      });
    }

    function pregunta() {
      const q = versiones[i];
      pintarProgreso();
      const caso = casoDe(q);
      const previa = i > 0 ? versiones[i - 1] : null;
      const mismoCaso = !!(caso && previa && typeof q.caso === 'string' && q.caso === previa.caso);
      zona.innerHTML = `
        <div class="ayuda" style="margin:2px 2px 8px">Pregunta ${i + 1} de ${preguntas.length}</div>
        ${caso ? `<div class="caso-reto"><div class="fila"><span class="etq">${F.esc(mismoCaso ? 'El mismo caso' : (caso.titulo || 'El caso'))}</span></div>
          <div class="txt" style="margin-top:6px">${F.md(caso.texto)}</div></div>` : ''}
        ${q.cambio ? `<div class="cambio-reto"><b>Cambia un hecho</b>${F.md(q.cambio)}</div>` : ''}
        <div class="enunciado">${F.md(q.enunciado)}</div>
        <div class="ops">${q.opciones.map((o) => `<button class="opcion" data-l="${F.esc(o.l)}"><span class="l">${F.esc(o.l)}</span><span>${F.md(o.t)}</span></button>`).join('')}</div>
        <div id="seg"></div><div id="ret"></div>`;
      tPregunta = Date.now(); pausaT = null;
      let elegida = null;
      zona.querySelectorAll('.opcion').forEach((b) => b.onclick = () => {
        if (zona.dataset.bloq) return;
        elegida = b.dataset.l;
        zona.querySelectorAll('.opcion').forEach((x) => x.classList.toggle('sel', x === b));
        const s = zona.querySelector('#seg');
        if (!s.innerHTML) {
          s.innerHTML = `<div class="seguridad"><b>¿Qué tan segura es tu respuesta?</b><div class="tres">
            <button data-s="Segura">Segura<small>podría explicarlo</small></button>
            <button data-s="Dudosa">Dudosa<small>dudé entre dos</small></button>
            <button data-s="Adiviné">Adiviné<small>no sabía</small></button></div></div>`;
          s.querySelectorAll('[data-s]').forEach((x) => x.onclick = () => responder(q, elegida, x.dataset.s));
          setTimeout(() => { if (s.isConnected) s.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 50);
        }
      });
      zona.dataset.bloq = '';
      el.querySelector('.cuerpo').scrollTop = 0;
    }

    function responder(q, elegida, seguridad) {
      if (zona.dataset.bloq) return;
      zona.dataset.bloq = '1';
      const correcta = elegida === q.clave;
      const r = { id: q.id, elegida, clave: q.clave, correcta, seguridad, segundos: Math.round((Date.now() - tPregunta) / 1000), habilidad: q.habilidad || null };
      if (typeof q.caso === 'string') r.caso = q.caso;
      if (q.cambio) r.gemelo = true;
      if (q.variante) r.variante = q.variante;
      intento.respuestas.push(r);
      zona.querySelector('#seg').innerHTML = '';
      zona.querySelectorAll('.opcion').forEach((b) => {
        b.disabled = true; b.classList.remove('sel');
        if (b.dataset.l === q.clave) b.classList.add('bien'); else if (b.dataset.l === elegida) b.classList.add('mal');
      });
      const ex = q.explica || {};
      const otras = q.opciones.filter((o) => o.l !== q.clave && o.l !== elegida && ex[o.l]);
      const ultima = i === preguntas.length - 1;
      zona.querySelector('#ret').innerHTML = `<div class="retro ${correcta ? 'bien' : 'mal'}">
        <h3>${correcta ? '¡Correcto!' : 'No era esa: la correcta es la ' + F.esc(q.clave)}</h3>
        ${!correcta && ex[elegida] ? `<div><b>Por qué la ${F.esc(elegida)} no:</b> ${F.md(ex[elegida])}</div>` : ''}
        ${ex[q.clave] ? `<div style="margin-top:8px"><b>Por qué la ${F.esc(q.clave)} sí:</b> ${F.md(ex[q.clave])}</div>` : ''}
        ${otras.length ? `<button class="enlace" id="verOtras">Ver por qué fallan las demás</button><div class="porque" id="otras" hidden>${otras.map((o) => `<div><b>${F.esc(o.l)}:</b> ${F.md(ex[o.l])}</div>`).join('')}</div>` : ''}
        </div>
        <button class="btn primario grande" id="sig" style="margin-top:16px">${ultima ? 'Ver mi resultado' : 'Siguiente pregunta'}</button>`;
      const vo = zona.querySelector('#verOtras');
      if (vo) vo.onclick = () => { zona.querySelector('#otras').hidden = false; vo.remove(); };
      zona.querySelector('#sig').onclick = () => { if (ultima) final(); else { i++; pregunta(); } };
      pintarProgreso();
      setTimeout(() => { const r = zona.querySelector('#ret'); if (r) r.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
    }

    function final() {
      terminado = true;
      i = preguntas.length;
      pintarProgreso();
      const R = intento.respuestas;
      const aciertos = R.filter((r) => r.correcta).length, total = R.length;
      const pct = total ? Math.round(aciertos / total * 100) : 0;
      const pr = P.retos[id] || (P.retos[id] = { intentos: [] });
      const repaso = pr.intentos.length > 0;          // solo el primer intento da estrellas
      const est = repaso ? null : (pct >= 80 ? 3 : pct >= 60 ? 2 : pct >= 40 ? 1 : 0);
      const primero = repaso ? pr.intentos[0] : null;
      const seguras = R.filter((r) => r.seguridad === 'Segura'), segBien = seguras.filter((r) => r.correcta).length;
      const dudosasBien = R.filter((r) => r.seguridad === 'Dudosa' && r.correcta).length;
      Object.assign(intento, { fin: new Date().toISOString(), aciertos, total, porcentaje: pct, estrellas: est, repaso, seguras: seguras.length, segurasBien: segBien });
      pr.intentos.push({ fecha: F.hoy(), aciertos, total, estrellas: est, repaso, seguras: seguras.length, segurasBien: segBien });
      const d = F.dia(); d.retos++; d.seg += R.reduce((a, r) => a + r.segundos, 0);
      F.guardar(true);
      F.enviar('resultados/' + F.marcaTiempo() + '_' + id + '.json', intento);

      let cal = '';
      if (seguras.length) cal += segBien === seguras.length
        ? `<p>Marcaste «Segura» en ${seguras.length} y <b>acertaste todas</b>. Tu seguridad fue confiable.</p>`
        : `<p>Marcaste «Segura» en ${seguras.length} y acertaste ${segBien}. Ojo con ${seguras.length - segBien === 1 ? 'la que fallaste' : 'las ' + (seguras.length - segBien) + ' que fallaste'} estando seguro: son las más importantes de repasar.</p>`;
      if (dudosasBien) cal += `<p>De las que marcaste «Dudosa» acertaste ${dudosasBien}. ${dudosasBien > 1 ? 'Sabes más de lo que crees.' : 'A veces sabes más de lo que crees.'}</p>`;
      zona.innerHTML = `
        <div class="caja resultado">${F.mascota(F.mascotaPorResultado(aciertos, total), { clase: 'centro' })}<div class="ayuda">${repaso ? 'Tu resultado de repaso' : 'Tu resultado'}</div><div class="grande">${aciertos} de ${total}</div>
          ${repaso
            ? `<p class="sub" style="margin-top:10px">Este intento es un repaso: no cambia tus estrellas. Las de este reto siguen siendo las de tu primer intento:</p><div>${estrellas(primero.estrellas)}</div>`
            : `<div class="estrellas">${[1, 2, 3].map((k) => k <= est ? '★' : '<span class="no">★</span>').join('')}</div>
               <p class="sub">${est === 3 ? '¡Excelente!' : est === 2 ? '¡Muy bien! Vas por buen camino.' : est === 1 ? 'Buen intento. Con el repaso esto sube.' : 'Este reto te mostró qué repasar. Así se aprende.'}</p>
               <p class="ayuda">Estas estrellas quedan fijas: son las de tu primer intento. Si lo repites, cuenta como repaso.</p>`}</div>
        ${cal ? `<div class="caja"><h2>Lo que dice tu seguridad</h2>${cal}</div>` : ''}
        <div class="caja" id="envio"><div class="fila"><div>${F.mascota('envia', { mini: true })}</div><div>Guardando tus resultados en el espacio privado…</div></div></div>
        <button class="btn primario grande" id="listo">Volver a Hoy</button>`;
      zona.querySelector('#listo').onclick = () => { F.cerrarCompleta(true); F.ir('hoy'); };
      el.querySelector('.cuerpo').scrollTop = 0;
      F.enviarPendientes().then(() => {
        const e = zona.querySelector('#envio');
        if (!e) return;
        e.innerHTML = F.pendientesPorEnviar()
          ? '<div class="fila"><div>' + F.mascota('espera', { mini: true }) + '</div><div>Tus resultados quedaron guardados y se envían apenas haya internet.</div></div>'
          : '<div class="fila"><div>' + F.mascota('bien', { mini: true }) + '</div><div>Tus resultados ya quedaron guardados.</div></div>';
      });
      F.revisarLogros();
      F.subirEstado(true);
      F.actualizarRecordatorios();
    }

    F.abrirCompleta(el, () => { if (!terminado) enviarIncompleto(); });
    inicio();
  };
})();

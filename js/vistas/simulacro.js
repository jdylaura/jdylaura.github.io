/* MiMeta · Simulacro con «paseo del experto».
   Casos con varias preguntas (3 o 4 opciones), sin retroalimentación hasta el final, con escala de seguridad
   (Segura / Dudosa / Adiviné) y segundos por pregunta. Temporizador visible opcional que avisa y no corta.
   Al terminar: resultado y, por cada caso, el paseo del experto (pasos con nota y fragmento resaltado)
   y por qué se descarta cada opción. Formato del archivo: ver CLAUDE.md. */
(function () {
  'use strict';
  const F = window.F;
  const SEG_DEFECTO = 90;
  const AVISO_NO_REEMPLAZA = 'Este simulacro no reemplaza los simulacros largos del Aula de Estudio. Sirve para practicar el formato: casos, tiempo y seguridad en tus respuestas.';

  const mmss = (s) => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
  const aplanar = (sim) => {
    const out = [];
    (sim.casos || []).forEach((c, ci) => (c.preguntas || []).forEach((q, qi) => out.push({ caso: c, ci, q, qi, n: c.preguntas.length })));
    return out;
  };
  const sugerido = (sim, it) => it.q.segundos || it.caso.segundos || sim.segundosPorPregunta || SEG_DEFECTO;

  // Busca el fragmento en el texto del caso (exacto; si no, tolerando espacios distintos)
  function buscar(texto, frag) {
    if (!frag) return null;
    let i = texto.indexOf(frag);
    if (i >= 0) return { i, len: frag.length };
    try {
      const re = new RegExp(frag.trim().split(/\s+/).map((x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('\\s+'));
      const m = re.exec(texto);
      if (m) return { i: m.index, len: m[0].length };
    } catch (e) { /* sin resaltado */ }
    return null;
  }
  function textoConResalte(texto, frag) {
    const h = buscar(texto, frag);
    if (!h) return F.md(texto);
    const marcado = texto.slice(0, h.i) + '\u0001' + texto.slice(h.i, h.i + h.len) + '\u0002' + texto.slice(h.i + h.len);
    return F.md(marcado).replace(/\u0001/g, '<mark class="paseo" id="resaltado">').replace(/\u0002/g, '</mark>');
  }

  // ---------- Lista (pestaña Simulacro) ----------
  F.vistas.simulacro = (v) => {
    const P = F.st.progreso;
    const sims = F.simulacros();
    v.innerHTML = `
      <section><h1 style="margin:6px 0 2px;font-size:30px">Simulacro</h1>
      <p class="ayuda" style="margin:0">Casos con varias preguntas, como en el examen: sin ayudas y sin saber si acertaste hasta el final.</p></section>
      <section class="sim-aviso"><b>Ojo:</b> ${F.esc(AVISO_NO_REEMPLAZA)}</section>
      <section>${sims.length ? sims.map((m) => {
        const sim = F.contenido.get(m.id) || {};
        const pr = P.simulacros[m.id], ints = (pr && pr.intentos) || [], ult = ints[ints.length - 1];
        const lecOk = !sim.leccion || (P.lecturas[sim.leccion] && P.lecturas[sim.leccion].terminado);
        const lec = ((F.st.indice && F.st.indice.lecciones) || []).find((x) => x.id === sim.leccion);
        const casos = (sim.casos || []).length, pregs = aplanar(sim).length;
        const min = Math.max(5, Math.ceil(aplanar(sim).reduce((a, it) => a + sugerido(sim, it), 0) / 60));
        return `<div class="caja ${lecOk ? '' : 'bloqueado'}" style="margin-bottom:14px"><h2>${F.esc(m.titulo || sim.titulo)}</h2>
          <p class="sub" style="margin-bottom:8px">${casos} ${casos === 1 ? 'caso' : 'casos'} · ${pregs} preguntas · unos ${min} min</p>
          ${lecOk ? '' : `<p class="ayuda">Primero termina ${F.esc(lec ? lec.titulo : 'su lección')}.</p>`}
          ${ult ? `<p class="ayuda" style="margin:0 0 10px">Último intento: <b>${ult.aciertos} de ${ult.total}</b> · ${F.esc(F.fechaCorta(ult.fecha))}${ints.length > 1 ? ' · ' + ints.length + ' intentos' : ''}</p>` : ''}
          <div class="fila" style="flex-wrap:wrap">
            ${lecOk ? `<button class="btn primario" data-sim="${F.esc(m.id)}">${ult ? 'Hacerlo otra vez' : 'Empezar'}</button>` : ''}
            ${pr && pr.ultimo ? `<button class="btn secundario" data-res="${F.esc(m.id)}">Ver resultado y paseo</button>` : ''}
          </div></div>`;
      }).join('') : '<div class="caja vacio">' + F.mascota('espera', { clase: 'centro' }) + 'Todavía no hay simulacros aquí. Los simulacros largos se presentan en el Aula de Estudio.</div>'}</section>`;
    F.$$('[data-sim]', v).forEach((b) => b.onclick = () => F.ir('simu/' + b.dataset.sim));
    F.$$('[data-res]', v).forEach((b) => b.onclick = () => F.ir('simures/' + b.dataset.res));
  };

  // ---------- Resultado + paseo del experto (se usa al terminar y al reabrir desde la lista) ----------
  function abrirResultado(sim, intento, alCerrar) {
    const P = F.st.progreso;
    const el = F.h(`<div class="completa reto">
      <div class="arriba"><button class="icono-btn" data-a="salir">← <span>Salir</span></button><div class="titulo">${F.esc(sim.titulo)}</div><div style="width:52px"></div></div>
      <div class="cuerpo"><div class="marca-agua"></div><div class="zona"></div></div></div>`);
    const zona = el.querySelector('.zona'), cuerpo = el.querySelector('.cuerpo');
    F.marcaAgua(el.querySelector('.marca-agua'));
    const resp = {}; (intento.respuestas || []).forEach((r) => { resp[r.caso + '/' + r.id] = r; });
    let enPaseo = false;

    function cerrar() { F.cerrarCompleta(true); F.ir('simulacro'); }
    el.querySelector('[data-a="salir"]').onclick = () => { if (enPaseo) resultado(); else cerrar(); };
    function resultado() {
      enPaseo = false;
      const R = intento.respuestas || [];
      const aciertos = intento.aciertos, total = intento.total;
      const seg = R.reduce((a, r) => a + (r.segundos || 0), 0);
      const pasadas = R.filter((r) => r.pasoDelTiempo).length;
      const fila = (nombre, ico) => {
        const g = R.filter((r) => r.seguridad === nombre), b = g.filter((r) => r.correcta).length;
        return g.length ? `<div class="paso"><div class="ico">${ico}</div><div class="txt"><b>${nombre}: ${g.length} ${g.length === 1 ? 'respuesta' : 'respuestas'}</b><span>acertaste ${b} de ${g.length}</span></div></div>` : '';
      };
      zona.innerHTML = `
        <div class="caja resultado"><div class="ayuda">Tu resultado</div><div class="grande">${aciertos} de ${total}</div>
          <p class="sub" style="margin-top:8px">${intento.porcentaje} % de aciertos · ${mmss(seg)} en total${pasadas ? ' · pasaste el tiempo sugerido en ' + pasadas : ''}</p></div>
        <div class="caja"><h2>Lo que dice tu seguridad</h2>${fila('Segura', '')}${fila('Dudosa', '')}${fila('Adiviné', '')}
          <p class="ayuda" style="margin-top:10px">Lo más valioso: las que marcaste «Segura» y fallaste. Ahí está lo que crees saber y no sabes.</p></div>
        <div class="caja"><h2>Paseo del experto</h2>
          <p class="sub">Caso por caso: qué leer, en qué fijarse y por qué se descarta cada opción.</p>
          ${(sim.casos || []).map((c, k) => {
            const qs = c.preguntas || [], ok = qs.filter((q) => (resp[c.id + '/' + q.id] || {}).correcta).length;
            return `<div class="paso"><div class="ico n">•</div><div class="txt"><b>${F.esc(c.titulo || 'Caso ' + (k + 1))}</b><span>${ok} de ${qs.length} correctas</span></div><button class="btn primario" data-paseo="${k}">Ver el paseo</button></div>`;
          }).join('')}</div>
        <div class="sim-aviso"><b>Recuerda:</b> ${F.esc(AVISO_NO_REEMPLAZA)}</div>
        <button class="btn primario grande" id="cerrarRes">Listo</button>`;
      cuerpo.scrollTop = 0;
      zona.querySelectorAll('[data-paseo]').forEach((b) => b.onclick = () => paseo(parseInt(b.dataset.paseo, 10)));
      zona.querySelector('#cerrarRes').onclick = cerrar;
    }

    function paseo(k) {
      enPaseo = true;
      const c = sim.casos[k], pasos = c.paseo || [];
      let p = 0;
      zona.innerHTML = `
        <h2 style="margin:4px 2px 6px">Paseo del experto · ${F.esc(c.titulo || 'Caso ' + (k + 1))}</h2>
        ${pasos.length ? `<div class="paseo-nav"><button class="btn secundario" id="pAnt">◀ Anterior</button><div class="cuenta" id="pCuenta"></div><button class="btn secundario" id="pSig">Siguiente ▶</button></div>` : ''}
        <div class="paseo-caja" id="paseoTexto"></div>
        <div class="paseo-nota" id="paseoNota"></div>
        <h2 style="margin:22px 2px 8px">Tus preguntas de este caso</h2>
        ${(c.preguntas || []).map((q, qi) => revisar(c, q, qi)).join('')}
        <button class="btn primario grande" id="volverRes" style="margin-top:18px">Volver al resultado</button>`;
      const pintar = () => {
        const paso = pasos[p];
        zona.querySelector('#paseoTexto').innerHTML = textoConResalte(c.texto, paso && paso.resalta);
        const nota = zona.querySelector('#paseoNota');
        if (paso) {
          nota.innerHTML = `<span class="n">Paso ${p + 1}: qué leer y por qué</span>${F.md(paso.nota || '')}`;
          zona.querySelector('#pCuenta').textContent = 'Paso ' + (p + 1) + ' de ' + pasos.length;
          zona.querySelector('#pAnt').disabled = p === 0; zona.querySelector('#pSig').disabled = p === pasos.length - 1;
          const m = zona.querySelector('#resaltado');
          if (m) setTimeout(() => m.scrollIntoView({ block: 'center', behavior: 'smooth' }), 40);
        } else {
          nota.hidden = true;
        }
      };
      if (pasos.length) {
        zona.querySelector('#pAnt').onclick = () => { if (p > 0) { p--; pintar(); } };
        zona.querySelector('#pSig').onclick = () => { if (p < pasos.length - 1) { p++; pintar(); } };
      }
      zona.querySelector('#volverRes').onclick = resultado;
      pintar();
      cuerpo.scrollTop = 0;
    }

    function revisar(c, q, qi) {
      const r = resp[c.id + '/' + q.id] || {};
      const ex = q.explica || {};
      return `<div class="caja" style="margin-bottom:12px">
        <div class="ayuda">Pregunta ${qi + 1} · ${r.elegida ? (r.correcta ? '✓ acertaste' : '✗ no acertaste') + ' · marcaste «' + F.esc(r.seguridad || '') + '»' : 'sin responder'}</div>
        <div class="enunciado" style="margin:6px 0 8px;font-size:19px">${F.md(q.enunciado)}</div>
        ${q.opciones.map((o) => {
          const esClave = o.l === q.clave, tuya = o.l === r.elegida;
          return `<div class="revision-op ${esClave ? 'clave' : ''} ${tuya ? 'tuya' : ''}"><span class="l">${F.esc(o.l)}</span><div>
            <small>${esClave ? 'Por qué es la correcta' : 'Por qué se descarta'}${tuya ? ' · tu respuesta' : ''}</small>${F.md(o.t)}${ex[o.l] ? `<div style="margin-top:4px;color:var(--suave)">${F.md(ex[o.l])}</div>` : ''}</div></div>`;
        }).join('')}</div>`;
    }

    F.abrirCompleta(el, alCerrar);
    F.atrasLocal = () => { if (enPaseo) { resultado(); return true; } return false; }; // después de abrir: abrir reinicia el gancho
    resultado();
  }

  F.vistas.simures = (id) => {
    const sim = F.contenido.get(id), pr = F.st.progreso.simulacros[id];
    if (!sim || !pr || !pr.ultimo) { F.aviso('Ese simulacro todavía no tiene resultado.'); return F.ir('simulacro'); }
    abrirResultado(sim, pr.ultimo);
  };

  // ---------- Presentar un simulacro ----------
  F.vistas.simu = (id) => {
    const sim = F.contenido.get(id);
    if (!sim) { F.aviso('Ese simulacro ya no está disponible.'); return F.ir('simulacro'); }
    const P = F.st.progreso;
    if (sim.leccion && !(P.lecturas[sim.leccion] && P.lecturas[sim.leccion].terminado)) {
      const lec = ((F.st.indice && F.st.indice.lecciones) || []).find((x) => x.id === sim.leccion);
      F.ir('simulacro');
      F.hoja(`<h3>Primero, la lección</h3><p>Este simulacro se abre cuando termines «${F.esc(lec ? lec.titulo : 'su lección')}».</p>`);
      return;
    }
    const items = aplanar(sim);
    const el = F.h(`<div class="completa reto">
      <div class="arriba"><button class="icono-btn" data-a="salir">← <span>Salir</span></button><div class="titulo">${F.esc(sim.titulo)}</div><div style="width:52px"></div></div>
      <div class="progreso-reto">${items.map(() => '<i></i>').join('')}</div>
      <div class="sim-barra" id="simBarra" hidden><span class="ayuda" id="simCuenta"></span><span class="temp" id="simTemp"></span></div>
      <div class="cuerpo"><div class="marca-agua"></div><div class="zona"></div></div></div>`);
    const zona = el.querySelector('.zona');
    F.marcaAgua(el.querySelector('.marca-agua'));
    const intento = { simulacro: id, version: sim.version, inicio: null, temporizador: false, respuestas: [] };
    let k = 0, terminado = false, tPregunta = 0, pausaT = null, tick = null, avisado = false, usaTemp = !!F.st.ajustes.temporizadorSim;

    F.bus.on('pausa', () => { if (document.body.contains(el) && pausaT === null) pausaT = Date.now(); });
    F.bus.on('reanuda', () => { if (document.body.contains(el) && pausaT !== null) { tPregunta += Date.now() - pausaT; pausaT = null; } });

    const detener = () => { if (tick) { clearInterval(tick); tick = null; } };
    function cerrar() { detener(); F.cerrarCompleta(true); F.ir('simulacro'); }
    function enviarIncompleto() {
      if (!intento.respuestas.length || intento.enviado) return;
      intento.enviado = true;
      F.enviar('simulacros/' + F.marcaTiempo() + '_' + id + '_incompleto.json', Object.assign({}, intento, { incompleto: true, fin: new Date().toISOString() }));
    }
    el.querySelector('[data-a="salir"]').onclick = () => {
      if (terminado || !intento.inicio) { cerrar(); return; }
      F.hoja(`<h3>¿Salir del simulacro?</h3><p>Llevas ${intento.respuestas.length} de ${items.length} preguntas. Si sales ahora, el simulacro queda sin terminar y no verás el paseo del experto.</p>
        <div class="fila"><button class="btn secundario" onclick="F.cerrarHoja()">Seguir</button><button class="btn suave" id="salirSi">Salir</button></div>`,
      (h) => { h.querySelector('#salirSi').onclick = () => { F.cerrarHoja(); enviarIncompleto(); cerrar(); }; });
    };

    async function inicio() {
      zona.innerHTML = '<div class="vacio">' + F.mascota('sin_senal', { clase: 'centro' }) + 'Revisando la conexión…</div>';
      if (!(await F.conexion.exigir())) {
        zona.innerHTML = `<div class="caja vacio">${F.mascota('sin_senal', { clase: 'centro' })}<h2>Necesitas internet</h2><p>El simulacro necesita internet para guardar tus resultados.</p>
          <button class="btn primario grande" id="otraVez">Reintentar</button></div>`;
        zona.querySelector('#otraVez').onclick = inicio;
        return;
      }
      const total = items.reduce((a, it) => a + sugerido(sim, it), 0);
      zona.innerHTML = `
        <div class="caja"><h2>${F.esc(sim.titulo)}</h2>
          ${sim.instrucciones ? `<p class="sub">${F.md(sim.instrucciones)}</p>` : ''}
          <div class="fila" style="margin-top:6px;flex-wrap:wrap"><span class="chip">${(sim.casos || []).length} casos</span><span class="chip">${items.length} preguntas</span><span class="chip">unos ${Math.max(5, Math.ceil(total / 60))} min</span></div></div>
        <div class="sim-aviso"><b>Ojo:</b> ${F.esc(AVISO_NO_REEMPLAZA)}</div>
        <div class="caja"><h2>Cómo funciona</h2>
          <div class="paso" style="margin-top:10px"><div class="ico n">•</div><div class="txt"><b>Sin respuestas hasta el final</b><span>No sabrás si acertaste mientras lo presentas.</span></div></div>
          <div class="paso"><div class="ico n">•</div><div class="txt"><b>Segura, Dudosa o Adiviné</b><span>Después de cada respuesta, marca qué tan segura es.</span></div></div>
          <div class="paso"><div class="ico n">•</div><div class="txt"><b>Solo hacia adelante</b><span>Cuando confirmas una respuesta, no puedes volver a ella.</span></div></div>
          <div class="paso"><div class="ico n">•</div><div class="txt"><b>Paseo del experto</b><span>Al terminar, cada caso se recorre paso a paso.</span></div></div></div>
        <div class="caja"><div class="fila"><div style="flex:1"><b>Mostrar el temporizador</b><div class="ayuda">Te muestra el tiempo sugerido por pregunta y te avisa si lo pasas. No te corta.</div></div>
          <label class="switch"><input type="checkbox" id="tempOn" ${usaTemp ? 'checked' : ''}><i></i></label></div></div>
        <button class="btn primario grande" id="empezar">Empezar el simulacro</button>`;
      zona.querySelector('#tempOn').onchange = (e) => { usaTemp = e.target.checked; F.st.ajustes.temporizadorSim = usaTemp; F.guardar(); };
      zona.querySelector('#empezar').onclick = () => { intento.inicio = new Date().toISOString(); intento.temporizador = usaTemp; pregunta(); };
    }

    function pintarProgreso() {
      el.querySelectorAll('.progreso-reto i').forEach((n, j) => { n.className = j < intento.respuestas.length ? 'hecha' : (j === k ? 'ya' : ''); });
    }

    function temporizador(sug) {
      detener(); avisado = false;
      const barra = el.querySelector('#simBarra'); barra.hidden = false;
      el.querySelector('#simCuenta').textContent = 'Pregunta ' + (k + 1) + ' de ' + items.length;
      const caja = el.querySelector('#simTemp');
      if (!usaTemp) { caja.hidden = true; return; }
      caja.hidden = false;
      const pintar = () => {
        const t = Math.round((Date.now() - tPregunta) / 1000), resta = sug - t;
        if (resta >= 0) { caja.textContent = '⏱ ' + mmss(resta); caja.className = 'temp' + (resta <= 15 ? ' ambar' : ''); }
        else {
          caja.textContent = '⏱ +' + mmss(-resta); caja.className = 'temp rojo';
          if (!avisado) { avisado = true; F.aviso('Llegaste al tiempo sugerido. Puedes seguir: el temporizador avisa, no corta.', '', 5000); }
        }
      };
      pintar();
      tick = setInterval(() => { if (!document.body.contains(el)) { detener(); return; } if (pausaT === null) pintar(); }, 1000);
    }

    function pregunta() {
      const it = items[k], q = it.q, c = it.caso;
      const previa = k > 0 ? items[k - 1] : null;
      const mismo = previa && previa.caso === c;
      pintarProgreso();
      zona.innerHTML = `
        <div class="caso-reto"><div class="fila"><span class="etq">${F.esc(mismo ? (c.titulo || 'El caso') + ' · pregunta ' + (it.qi + 1) + ' de ' + it.n : (c.titulo || 'El caso'))}</span></div>
          <div class="txt" style="margin-top:6px">${F.md(c.texto)}</div></div>
        <div class="enunciado">${F.md(q.enunciado)}</div>
        <div class="ops">${q.opciones.map((o) => `<button class="opcion" data-l="${F.esc(o.l)}"><span class="l">${F.esc(o.l)}</span><span>${F.md(o.t)}</span></button>`).join('')}</div>
        <div id="seg"></div>`;
      tPregunta = Date.now(); pausaT = null;
      temporizador(sugerido(sim, it));
      let elegida = null, seguridad = null;
      const seg = zona.querySelector('#seg');
      const botonSeguir = () => {
        let b = seg.querySelector('#seguir');
        if (!seguridad || !elegida) { if (b) b.remove(); return; }
        if (!b) {
          b = F.h(`<button class="btn primario grande" id="seguir" style="margin-top:14px"></button>`);
          b.onclick = () => responder(it, elegida, seguridad);
          seg.appendChild(b);
        }
        b.textContent = k === items.length - 1 ? 'Confirmar y terminar' : 'Confirmar y seguir';
      };
      zona.querySelectorAll('.opcion').forEach((b) => b.onclick = () => {
        elegida = b.dataset.l;
        zona.querySelectorAll('.opcion').forEach((x) => x.classList.toggle('sim-sel', x === b));
        if (!seg.querySelector('.seguridad')) {
          const d = F.h(`<div class="seguridad"><b>¿Qué tan segura es tu respuesta?</b><div class="tres">
            <button data-s="Segura">Segura<small>podría explicarlo</small></button>
            <button data-s="Dudosa">Dudosa<small>dudé entre dos</small></button>
            <button data-s="Adiviné">Adiviné<small>no sabía</small></button></div></div>`);
          d.querySelectorAll('[data-s]').forEach((x) => x.onclick = () => {
            seguridad = x.dataset.s;
            d.querySelectorAll('[data-s]').forEach((y) => { y.style.borderColor = y === x ? '#1F2E4D' : ''; y.style.background = y === x ? '#EEF2FA' : ''; });
            botonSeguir();
          });
          seg.insertBefore(d, seg.firstChild);
          setTimeout(() => { if (seg.isConnected) seg.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 50);
        }
        botonSeguir();
      });
      el.querySelector('.cuerpo').scrollTop = 0;
    }

    function responder(it, elegida, seguridad) {
      detener();
      const q = it.q, sug = sugerido(sim, it);
      const segundos = Math.round((Date.now() - tPregunta) / 1000);
      intento.respuestas.push({ caso: it.caso.id, id: q.id, elegida, clave: q.clave, correcta: elegida === q.clave, seguridad, segundos, tiempoSugerido: sug, pasoDelTiempo: segundos > sug, habilidad: q.habilidad || null });
      if (k < items.length - 1) { k++; pregunta(); } else final();
    }

    function final() {
      terminado = true; detener();
      el.querySelector('#simBarra').hidden = true;
      const R = intento.respuestas, aciertos = R.filter((r) => r.correcta).length;
      Object.assign(intento, { fin: new Date().toISOString(), aciertos, total: R.length, porcentaje: R.length ? Math.round(aciertos / R.length * 100) : 0, segundosTotales: R.reduce((a, r) => a + r.segundos, 0) });
      const pr = P.simulacros[id] || (P.simulacros[id] = { intentos: [] });
      pr.intentos.push({ fecha: F.hoy(), aciertos, total: R.length, porcentaje: intento.porcentaje });
      pr.ultimo = JSON.parse(JSON.stringify(intento));
      const d = F.dia(); d.retos++; d.seg += intento.segundosTotales;
      F.guardar(true);
      F.enviar('simulacros/' + F.marcaTiempo() + '_' + id + '.json', intento);
      F.revisarLogros(); F.subirEstado(true); F.actualizarRecordatorios();
      // Se muestra el resultado con el paseo del experto (esta misma pantalla se reemplaza)
      abrirResultado(sim, intento);
    }

    F.abrirCompleta(el, () => { detener(); if (!terminado) enviarIncompleto(); });
    inicio();
  };
})();

/* MiMeta · pestaña Hoy: saludo, misión del día, semana y próxima medalla. */
(function () {
  'use strict';
  const F = window.F;

  function anillo(hechos, total) {
    const r = 26, c = 2 * Math.PI * r, f = total ? hechos / total : 0;
    return `<div class="anillo"><svg width="62" height="62" viewBox="0 0 62 62"><circle cx="31" cy="31" r="${r}" fill="none" stroke="#E3E7F0" stroke-width="7"/>
      <circle cx="31" cy="31" r="${r}" fill="none" stroke="url(#ga)" stroke-width="7" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - f)}" transform="rotate(-90 31 31)"/>
      <defs><linearGradient id="ga" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E8B10E"/><stop offset="1" stop-color="#F4CB4B"/></linearGradient></defs></svg><span>${hechos}/${total}</span></div>`;
  }

  F.vistas.hoy = (v) => {
    const plan = F.st.plan || {};
    const nombre = plan.nombre || '';
    const iniciales = (plan.asesor || 'A').split(' ').map((x) => x[0]).join('').slice(0, 2);
    const m = F.mision();
    const s = F.semana();
    const prox = F.proximoLogro();
    const P = F.st.progreso;
    const aviso = plan.aviso && !P.avisosVistos[plan.aviso.id] ? plan.aviso : null;
    const dudasAbiertas = F.dudasSinEnviar().length;
    const mh = F.mascotaHoy(m, s, P, plan);
    const letras = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    v.innerHTML = `
      <section class="saludo">
        <h1>Hola${nombre ? ', ' + F.esc(nombre) : ''}</h1>
        <div class="fecha">${F.esc(F.fechaLarga())}</div>
        ${plan.asesor ? `<div class="asesor"><span class="av">${F.esc(iniciales)}</span>Tu asesor: ${F.esc(plan.asesor)}</div>` : ''}
        ${F.mascota(mh.e, { texto: mh.t, flecha: mh.f ? 'abajo' : '' })}
      </section>

      ${aviso ? `<section class="caja" style="border:2px solid #E8B10E">
        <h2>Mensaje de ${F.esc(plan.asesor || 'tu asesor')}</h2><p style="margin:6px 0 12px">${F.md(aviso.texto)}${plan.presencial && aviso.tipo !== 'general' ? ' ' + F.esc(F.FRASE_PRESENCIAL) : ''}</p>
        <button class="btn secundario" id="avisoOk">Entendido</button></section>` : ''}

      <section class="caja">
        <div class="mision-cab"><div><h2>Tu misión de hoy</h2><div class="ayuda">${m.items.length ? 'Pasos cortos. Hazlos en orden.' : ''}</div></div>${m.items.length ? anillo(m.hechos, m.items.length) : ''}</div>
        ${m.items.length ? m.items.map((it, i) => `
          <div class="paso ${it.hecho ? 'hecho' : ''}">
            <div class="ico n">${it.hecho ? '✓' : (i + 1)}</div>
            <div class="txt"><b>${F.esc(it.tipo === 'leer' ? 'Leer: ' + it.titulo : it.tipo === 'reto' ? 'Reto: ' + it.titulo : it.titulo)}</b><span>${F.esc(it.detalle)}</span></div>
            ${it.hecho && it.tipo !== 'leer' ? '' : `<button class="btn ${it.hecho ? 'secundario' : 'primario'}" data-ir="${it.tipo}" data-id="${it.id || ''}">${
              it.tipo === 'leer' ? (it.hecho ? 'Abrir' : (it.detalle.indexOf('Vas en') === 0 ? 'Seguir' : 'Empezar')) : it.tipo === 'reto' ? 'Hacer' : 'Repasar'}</button>`}
          </div>`).join('') : `<div class="vacio">Hoy no tienes tarjetas ni retos pendientes.</div>`}
        ${m.completa ? '<div class="cumplida">¡Misión cumplida! Hoy cuenta para tu meta de la semana.</div>' : ''}
      </section>

      <section class="caja">
        <h2>Tu semana</h2>
        <p class="sub">Meta: estudiar ${s.meta} días esta semana. Llevas <b>${s.hechos}</b>.</p>
        <div class="semana">${s.dias.map((d, i) => `<div class="d ${d.estudio ? 'si' : ''} ${d.hoy ? 'hoy' : ''}"><i></i>${letras[i]}</div>`).join('')}</div>
        <div class="ayuda">${s.cumplida ? '¡Meta de la semana cumplida! Lo que sumes ahora es ganancia.' : `Te ${s.meta - s.hechos === 1 ? 'falta 1 día' : 'faltan ' + (s.meta - s.hechos) + ' días'}. Cuenta un día cuando haces un reto o repasas 5 tarjetas (o todas las del día).`}</div>
      </section>

      ${prox ? `<section class="caja">
        <div class="fila"><div>${prox.L.ico}</div><div style="flex:1"><h2 style="margin:0">Tu próxima medalla: ${F.esc(prox.L.nombre)}</h2>
        <div class="ayuda">${F.esc(prox.L.como)}</div>
         ${prox.e.meta > 1 ? `<div class="barra" style="margin-top:8px"><i style="width:${Math.round(prox.e.actual / prox.e.meta * 100)}%"></i></div><div class="ayuda">${prox.e.actual} de ${prox.e.meta}</div>` : ''}</div></div>
      </section>` : ''}

      ${plan.presencial ? `<section class="presencial"><span class="ico">${F.mascota('cita', { mini: true })}</span><span>Tus simulacros se hacen de manera presencial con tu asesor. Escríbele para acordar la fecha.</span></section>` : ''}
    `;
    F.$$('[data-ir]', v).forEach((b) => b.onclick = () => {
      const t = b.dataset.ir;
      if (t === 'leer') F.ir('lector/' + b.dataset.id);
      else if (t === 'reto') F.ir('reto/' + b.dataset.id);
      else F.ir('tarjetas');
    });
    const ok = F.$('#avisoOk', v);
    if (ok) ok.onclick = () => { P.avisosVistos[aviso.id] = F.hoy(); F.guardar(); F.render(); };
    if (F.versionNueva) window.fokiaUiUpdated(F.versionNueva);
  };

})();

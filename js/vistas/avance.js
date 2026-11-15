/* MiMeta · Mi avance: datos claros, medallas con su explicación, dudas y ajustes. */
(function () {
  'use strict';
  const F = window.F;

  F.vistas.avance = (v) => {
    const P = F.st.progreso, plan = F.st.plan || {};
    const lecs = F.lecciones();
    const term = lecs.filter((l) => P.lecturas[l.id] && P.lecturas[l.id].terminado).length;
    const ints = Object.values(P.retos).reduce((a, r) => a.concat(r.intentos || []), []);
    const tot = ints.reduce((a, i) => a + i.total, 0), bien = ints.reduce((a, i) => a + i.aciertos, 0);
    const recuerda = F.tarjetasEnCaja(3);
    const lunes = F.lunes();
    let segSemana = 0;
    for (let d = 0; d < 7; d++) { const r = P.dias[F.sumarDias(lunes, d)]; if (r) segSemana += r.seg || 0; }
    const ganadas = F.LOGROS.filter((L) => P.logros[L.id]).length;
    const dudas = F.dudasSinEnviar();
    const rem = F.st.ajustes.recordatorios || { activos: true, horas: ['07:00', '21:00'] };
    const info = F.native.info();
    const ses = plan.sesiones || {};

    v.innerHTML = `
      <section><h1 style="margin:6px 0 2px;font-size:30px">Tu avance</h1>
      <p class="ayuda" style="margin:0">Todo lo que has logrado, en un solo lugar.</p></section>

      <section class="caja"><div class="datos">
        <div class="dato"><b>${(F.contenido.get('tarjetas') || { items: [] }).items.filter((c) => c.activa !== false).length}</b><span>tarjetas activas</span></div>
        <div class="dato"><b>${ints.length}</b><span>${ints.length === 1 ? 'reto hecho' : 'retos hechos'}${tot ? ' · ' + Math.round(bien / tot * 100) + ' % de aciertos' : ''}</span></div>
        <div class="dato"><b>${recuerda}</b><span>tarjetas que ya recuerdas (caja 3 o más)</span></div>
        <div class="dato"><b>${F.minutos(segSemana)}</b><span>de estudio esta semana</span></div>
      </div></section>

      <section class="caja"><h2>Tus medallas · ${ganadas} de ${F.LOGROS.filter((L) => !F.LOGROS_SIN[L.id]).length}</h2>
        <p class="sub">Cada medalla dice cómo se gana. Las grises todavía te esperan.</p>
        <div class="medallas">${F.LOGROS.filter((L) => !F.LOGROS_SIN[L.id]).map((L) => {
          const e = F.estadoLogro(L);
          return `<div class="medalla ${e.ganado ? 'si' : 'no'}"><div class="m">${L.ico}</div><b>${F.esc(L.nombre)}</b>
            <small>${e.ganado ? 'Ganada el ' + F.esc(F.fechaCorta(e.fecha)) : F.esc(L.como)}</small>
            ${!e.ganado && e.meta > 1 ? `<div class="barra"><i style="width:${Math.round(e.actual / e.meta * 100)}%"></i></div><small>${e.actual} de ${e.meta}</small>` : ''}</div>`;
        }).join('')}</div></section>

      ${plan.presencial ? `<section class="caja" style="background:linear-gradient(135deg,#E7ECF6,#FFF3CC)">
        <h2>${F.esc(ses.titulo || 'Tu plan se completa en persona')}</h2>
        <p style="margin:6px 0 0">${F.md(ses.texto || ('La app y las sesiones presenciales son dos partes del mismo plan. Aquí practicas todos los días; en las sesiones con ' + (plan.asesor || 'tu asesor') + ' revisan juntos lo que marcaste como dudoso y lo convierten en seguro, y hacen los simulacros presenciales. Escríbele para acordar la fecha.'))}</p>
      </section>` : ''}

      ${F.avisosHtml()}

      <section class="ayuda" style="text-align:center;line-height:1.6">
        Tu avance se guarda en este celular y en el espacio privado del Plan Principal, donde Claude lo lee para las autopsias.<br>
        <span id="version">MiMeta · versión ${F.esc(info.app || '')} · pantallas ${F.esc(F.VERSION_UI)}</span><br>
        ${F.esc(plan.marcaAgua || '')}
      </section>`;

    F.avisosMontar();
    let toques = 0, tt = null;
    F.$('#version').onclick = () => { toques++; clearTimeout(tt); tt = setTimeout(() => toques = 0, 2500); if (toques >= 7) { toques = 0; F.ir('tecnico'); } };
  };
})();

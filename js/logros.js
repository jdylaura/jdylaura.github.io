/* MiMeta · misión del día, meta de la semana y medallas. Todo con reglas claras que se le explican a quien estudia. */
(function () {
  'use strict';
  const F = window.F;
  const P = () => F.st.progreso;

  // ---------- Tarjetas que tocan hoy ----------
  F.tarjetasDeHoy = () => {
    const t = F.contenido.get('tarjetas');
    if (!t || !t.items) return [];
    const hoy = F.hoy();
    return t.items.filter((c) => {
      if (c.activa === false) return false;
      if (c.leccion && !(P().lecturas[c.leccion] && P().lecturas[c.leccion].terminado)) return false; // nunca antes de su lección
      const s = P().tarjetas[c.id];
      return !s || !s.proxima || s.proxima <= hoy;
    });
  };
  F.tarjetasEnCaja = (min) => Object.values(P().tarjetas).filter((s) => (s.caja || 1) >= min).length;

  // ---------- Misión del día ----------
  F.mision = () => {
    const hoy = F.hoy(), reg = F.dia(hoy), items = [];
    const lecs = F.lecciones();
    const enCurso = lecs.find((l) => { const r = P().lecturas[l.id]; return r && !r.terminado && r.pct > 0; });
    const siguiente = enCurso || lecs.find((l) => !(P().lecturas[l.id] && P().lecturas[l.id].terminado));
    const terminadaHoy = lecs.find((l) => P().lecturas[l.id] && P().lecturas[l.id].terminadoEl === hoy);
    if (siguiente || terminadaHoy) {
      const l = siguiente || terminadaHoy;
      const r = P().lecturas[l.id] || {};
      const vel = (F.st.plan && F.st.plan.velocidadLectura) || 110;
      const faltan = Math.max(2, Math.round(((l.palabras || 1500) * (1 - (r.pct || 0) / 100)) / vel));
      items.push({
        tipo: 'leer', id: l.id, titulo: l.titulo, numero: l.numero,
        detalle: r.terminado ? 'Terminada' : (r.pct > 0 ? `Vas en el ${r.pct} % · te faltan unos ${faltan} min` : `Unos ${faltan} minutos`),
        hecho: reg.lectura >= 600 || !!terminadaHoy
      });
    }
    const retoHoy = F.retos().find((x) => { const r = P().retos[x.id]; return r && r.intentos && r.intentos.some((i) => i.fecha === hoy); });
    const retoPend = F.retos().find((x) => {
      const lecOk = !x.leccion || (P().lecturas[x.leccion] && P().lecturas[x.leccion].terminado);
      const r = P().retos[x.id];
      return lecOk && !(r && r.intentos && r.intentos.length);
    });
    if (retoHoy || retoPend) {
      const x = retoHoy || retoPend;
      items.push({ tipo: 'reto', id: x.id, titulo: x.titulo, detalle: `${x.preguntas || ''} preguntas`, hecho: !!retoHoy });
    }
    const due = F.tarjetasDeHoy().length;
    if (due > 0 || reg.tarjetas > 0) {
      items.push({ tipo: 'tarjetas', titulo: 'Tarjetas de repaso', detalle: due > 0 ? `${due} para hoy` : 'Listas por hoy', hecho: due === 0, n: due });
    }
    const completa = items.length > 0 && items.every((i) => i.hecho);
    if (completa && !reg.mision) { reg.mision = true; F.guardar(); F.revisarLogros(); }
    return { items, completa, hechos: items.filter((i) => i.hecho).length };
  };

  // ---------- Meta de la semana ----------
  F.semana = (lunes) => {
    lunes = lunes || F.lunes();
    const dias = [];
    for (let i = 0; i < 7; i++) {
      const f = F.sumarDias(lunes, i);
      dias.push({ fecha: f, estudio: F.esDiaDeEstudio(P().dias[f]), hoy: f === F.hoy(), futuro: f > F.hoy() });
    }
    const meta = (F.st.plan && F.st.plan.metaSemanal) || 4;
    const hechos = dias.filter((d) => d.estudio).length;
    return { dias, meta, hechos, cumplida: hechos >= meta };
  };
  F.semanasSeguidas = () => {
    let n = 0, lunes = F.lunes();
    if (!F.semana(lunes).cumplida) lunes = F.sumarDias(lunes, -7); // la semana en curso todavía puede cumplirse
    for (let k = 0; k < 60; k++) {
      if (F.semana(lunes).cumplida) { n++; lunes = F.sumarDias(lunes, -7); } else break;
    }
    return n;
  };

  // ---------- Medallas ----------
  const lecTerminadas = () => Object.values(P().lecturas).filter((r) => r.terminado).length;
  const intentos = () => Object.values(P().retos).reduce((a, r) => a.concat(r.intentos || []), []);
  F.LOGROS = [
    { id: 'primer_paso', get ico() { return F.mascota('saludo', { mini: true }); }, nombre: 'Primer paso', como: 'Abre tu primera lección.', ok: () => Object.keys(P().lecturas).length > 0 },
    { id: 'principio_fin', get ico() { return F.mascota('lectura', { mini: true }); }, nombre: 'De principio a fin', como: 'Termina una lección completa, hasta la última página.', ok: () => lecTerminadas() >= 1 },
    { id: 'tres_lecciones', get ico() { return F.mascota('lectura', { mini: true }); }, nombre: 'Tres lecciones', como: 'Termina 3 lecciones.', meta: 3, val: lecTerminadas },
    { id: 'primer_reto', get ico() { return F.mascota('ejercicio', { mini: true }); }, nombre: 'Primer reto', como: 'Termina tu primer reto.', ok: () => intentos().length >= 1 },
    { id: 'tres_estrellas', get ico() { return F.mascota('victoria', { mini: true }); }, nombre: 'Tres estrellas', como: 'Acierta el 80 % o más en tu primer intento de un reto.', ok: () => intentos().some((i) => !i.repaso && i.estrellas >= 3) },
    { id: 'ojo_fino', get ico() { return F.mascota('simulacro', { mini: true }); }, nombre: 'Ojo fino', como: 'En un reto, marca «Segura» al menos 3 veces y acierta todas esas. Es saber que sabes.', ok: () => intentos().some((i) => i.seguras >= 3 && i.segurasBien === i.seguras) },
    { id: 'pregunta_valiente', get ico() { return F.mascota('duda', { mini: true }); }, nombre: 'Pregunta valiente', como: 'Guarda una duda mientras lees. Preguntar también es estudiar.', ok: () => P().dudas.length >= 1 },
    { id: 'repaso_dia', get ico() { return F.mascota('tarjetas', { mini: true }); }, nombre: 'Repaso al día', como: 'Termina todas tus tarjetas de un día.', ok: () => Object.keys(P().tarjetasDiaCompleto).length >= 1 },
    { id: 'memoria', get ico() { return F.mascota('tarjetas', { mini: true }); }, nombre: 'Memoria de largo plazo', como: 'Lleva 10 tarjetas a la caja 4: las recuerdas aun después de una semana.', meta: 10, val: () => F.tarjetasEnCaja(4) },
    { id: 'mision', get ico() { return F.mascota('victoria', { mini: true }); }, nombre: 'Misión cumplida', como: 'Completa toda la misión de un día.', ok: () => Object.values(P().dias).some((d) => d.mision) },
    { id: 'semana', get ico() { return F.mascota('racha', { mini: true }); }, nombre: 'Semana cumplida', como: 'Estudia los días de tu meta en una misma semana.', ok: () => F.semanasSeguidas() >= 1 },
    { id: 'constancia', get ico() { return F.mascota('racha', { mini: true }); }, nombre: 'Constancia', como: 'Cumple tu meta 3 semanas seguidas.', meta: 3, val: F.semanasSeguidas }
  ];
  F.LOGROS_SIN = { primer_paso: 1, principio_fin: 1, tres_lecciones: 1, pregunta_valiente: 1 }; // sin lecciones ni dudas en el Plan Principal
  F.estadoLogro = (L) => {
    const fecha = P().logros[L.id];
    let actual = 0, meta = 1;
    if (L.meta) { meta = L.meta; actual = Math.min(L.meta, L.val()); } else { actual = L.ok() ? 1 : 0; }
    return { ganado: !!fecha, fecha, actual, meta };
  };
  F.revisarLogros = () => {
    const nuevos = [];
    for (const L of F.LOGROS) {
      if (P().logros[L.id] || F.LOGROS_SIN[L.id]) continue;
      const ok = L.meta ? L.val() >= L.meta : L.ok();
      if (ok) { P().logros[L.id] = F.hoy(); nuevos.push(L); }
    }
    if (nuevos.length) { F.guardar(); nuevos.forEach((L, i) => setTimeout(() => F.celebrarLogro(L), 400 + i * 2600)); }
    return nuevos;
  };
  F.proximoLogro = () => {
    let mejor = null, mejorFrac = -1;
    for (const L of F.LOGROS) {
      const e = F.estadoLogro(L);
      if (e.ganado) continue;
      const frac = e.actual / e.meta;
      if (frac > mejorFrac) { mejor = { L, e }; mejorFrac = frac; }
    }
    return mejor;
  };

  F.celebrarLogro = (L) => {
    const m = F.h(`<div class="medalla-nueva" role="dialog">
      <div class="medalla-caja">
        <div class="medalla-etq">¡Ganaste una medalla!</div>
        <div class="medalla-ico">${L.ico}</div>
        <div class="medalla-nom">${F.esc(L.nombre)}</div>
        <p>${F.esc(L.como)}</p>
        <button class="btn primario grande">¡Sigamos!</button>
      </div></div>`);
    document.body.appendChild(m);
    F.confeti();
    m.querySelector('button').onclick = () => m.remove();
  };

  F.confeti = () => {
    const c = document.createElement('canvas');
    c.className = 'confeti';
    c.width = innerWidth; c.height = innerHeight;
    document.body.appendChild(c);
    const x = c.getContext('2d');
    const col = ['#1F2E4D', '#E8B10E', '#F4CB4B', '#34508A', '#178F55'];
    const ps = Array.from({ length: 90 }, () => ({
      x: c.width / 2, y: c.height * 0.35, vx: (Math.random() - 0.5) * 12, vy: -Math.random() * 12 - 4,
      r: 4 + Math.random() * 5, c: col[Math.floor(Math.random() * col.length)], a: Math.random() * 6
    }));
    let t = 0;
    (function paso() {
      x.clearRect(0, 0, c.width, c.height);
      ps.forEach((p) => { p.vy += 0.35; p.x += p.vx; p.y += p.vy; p.a += 0.2;
        x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.fillStyle = p.c; x.fillRect(-p.r, -p.r / 2, p.r * 2, p.r); x.restore(); });
      if (++t < 110) requestAnimationFrame(paso); else c.remove();
    })();
  };

  // ---------- Recordatorios: mensajes listos para que el teléfono escoja uno ----------
  F.actualizarRecordatorios = () => {
    const a = F.st.ajustes.recordatorios || { activos: true, horas: ((F.st.plan && F.st.plan.recordatorios && F.st.plan.recordatorios.horas) || ['07:00', '21:00']) };
    F.st.ajustes.recordatorios = a;
    F.native.setReminders(a);
    const nombre = (F.st.plan && F.st.plan.nombre) || '';
    const m = F.mision(), s = F.semana();
    const pend = [];
    const leer = m.items.find((i) => i.tipo === 'leer' && !i.hecho);
    const tarj = m.items.find((i) => i.tipo === 'tarjetas' && !i.hecho);
    pend.push({ t: `${nombre ? nombre + ', tu' : 'Tu'} misión de hoy te espera`, x: 'Lee un rato, haz tu reto y repasa tus tarjetas. La app te abre justo donde quedaste.' });
    if (leer) pend.push({ t: `Vas en «${leer.titulo}»`, x: leer.detalle + '. Retoma en la página exacta donde ibas.' });
    if (tarj) pend.push({ t: `Tienes ${tarj.n} tarjetas para hoy`, x: 'Repasarlas toma pocos minutos y es lo que hace que no se te olvide lo que ya estudiaste.' });
    if (!s.cumplida) pend.push({ t: `Llevas ${s.hechos} de ${s.meta} días esta semana`, x: 'Un día más de estudio y estás más cerca de tu meta de la semana.' });
    const cump = [
      { t: `¡Hoy cumpliste${nombre ? ', ' + nombre : ''}!`, x: 'Tu misión de hoy está completa. Descansa: mañana seguimos.' },
      { t: 'Misión cumplida', x: 'Lo que estudiaste hoy ya está trabajando por ti. Nos vemos mañana.' }
    ];
    const gen = [
      { t: 'Un ratico de estudio hoy', x: 'Estudiar un poco cada día ayuda a recordar más que estudiarlo todo de una vez.' },
      { t: 'Tu plan te espera', x: 'Abre MiMeta y mira tu misión de hoy: son pasos cortos y claros.' }
    ];
    F.native.setReminderContext({ fecha: F.hoy(), cumplidoEl: m.completa ? F.hoy() : '', pendientes: pend, cumplidos: cump, generales: gen });
  };
})();

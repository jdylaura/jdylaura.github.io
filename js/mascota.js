/* MiMeta · la mascota. Única figura de la app: cambia de color, de ojos y de gesto según lo que pase.
   Uso: F.mascota('estado', { texto: '...', mini: true, flecha: 'abajo' }) devuelve HTML. Estados en E. */
(function () {
  'use strict';
  const F = window.F;
  // h: giro de color (grados) · s: saturación · b: brillo · sup/inf: párpados (0 a 1) · ceja: ángulo · gesto: animación · acc: accesorio
  const E = {
    natural:   { h: 0,   s: 1,    b: 1,    sup: 0,   gesto: 'respira' },
    saludo:    { h: 0,   s: 1.05, b: 1.03, sup: 0,   gesto: 'saluda' },
    espera:    { h: 0,   s: .9,   b: 1.02, sup: .12, gesto: 'respira', acc: 'sobre' },
    lectura:   { h: 38,  s: 1.1,  b: 1,    sup: .38, gesto: 'lee', acc: 'libro' },
    ejercicio: { h: 198, s: 1.5,  b: 1.08, sup: .1,  ceja: 8, gesto: 'pesa', acc: 'pesa' },
    tarjetas:  { h: 92,  s: 1.1,  b: 1,    sup: 0,   gesto: 'baraja', acc: 'cartas' },
    simulacro: { h: 60,  s: 1.2,  b: .92,  sup: .15, ceja: 6, gesto: 'firme', acc: 'crono' },
    bravo:     { h: 172, s: 1.7,  b: .98,  sup: .34, ceja: 24, gesto: 'zapatea', acc: 'reloj' },
    victoria:  { h: -32, s: 1.35, b: 1.08, sup: 0,   inf: .28, gesto: 'salta', acc: 'chispas' },
    bien:      { h: -18, s: 1.15, b: 1.04, sup: 0,   inf: .18, gesto: 'asiente' },
    perplejo:  { h: 222, s: 1.25, b: 1.1,  sup: .0,  supD: .42, ceja: -14, cejaD: 12, gesto: 'ladea', acc: 'duda' },
    triste:    { h: 34,  s: .38,  b: .92,  sup: .5,  ceja: -20, gesto: 'hundido', acc: 'nube' },
    dormido:   { h: 70,  s: .28,  b: .95,  sup: 1,   gesto: 'duerme', acc: 'zzz' },
    racha:     { h: 138, s: 1.35, b: 1.05, sup: 0,   inf: .2, gesto: 'salta', acc: 'chispas' },
    duda:      { h: 105, s: .8,   b: 1.08, sup: .1,  ceja: -10, gesto: 'ladea', acc: 'duda' },
    cita:      { h: 20,  s: 1,    b: 1.03, sup: 0,   gesto: 'asiente', acc: 'calendario' },
    sin_senal: { h: 0,   s: .08,  b: .96,  sup: .25, ceja: -12, gesto: 'busca', acc: 'senal' },
    envia:     { h: 20,  s: 1.1,  b: 1.03, sup: 0,   gesto: 'asiente', acc: 'avion' }
  };
  const T = '#1F2A44', O = '#E8B10E', B = '#fff';
  const svg = (x, vb) => `<svg viewBox="${vb || '0 0 100 100'}" aria-hidden="true">${x}</svg>`;
  const ACC = {
    pesa: svg(`<rect x="22" y="44" width="56" height="12" rx="4" fill="${T}"/><rect x="6" y="26" width="18" height="48" rx="7" fill="${T}"/><rect x="76" y="26" width="18" height="48" rx="7" fill="${T}"/><rect x="0" y="36" width="8" height="28" rx="4" fill="${O}"/><rect x="92" y="36" width="8" height="28" rx="4" fill="${O}"/>`),
    libro: svg(`<path d="M50 30C38 20 20 20 8 26v52c12-6 30-6 42 4 12-10 30-10 42-4V26C80 20 62 20 50 30z" fill="${B}" stroke="${T}" stroke-width="5" stroke-linejoin="round"/><path d="M50 30v52" stroke="${T}" stroke-width="5"/><path d="M18 40c8-3 16-3 24 1M18 54c8-3 16-3 24 1M58 41c8-4 16-4 24-1M58 55c8-4 16-4 24-1" stroke="${O}" stroke-width="4" fill="none" stroke-linecap="round"/>`),
    cartas: svg(`<rect x="14" y="22" width="46" height="62" rx="8" fill="${O}" stroke="${T}" stroke-width="5" transform="rotate(-14 37 53)"/><rect x="40" y="18" width="46" height="62" rx="8" fill="${B}" stroke="${T}" stroke-width="5" transform="rotate(10 63 49)"/><path d="M52 40h22M52 52h16" stroke="${T}" stroke-width="5" stroke-linecap="round" transform="rotate(10 63 49)"/>`),
    reloj: svg(`<circle cx="50" cy="56" r="32" fill="${B}" stroke="${T}" stroke-width="6"/><path d="M50 38v19l12 8" stroke="${T}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 26l12-12M80 26L68 14" stroke="${T}" stroke-width="9" stroke-linecap="round"/><path d="M30 86l-6 8M70 86l6 8" stroke="${T}" stroke-width="6" stroke-linecap="round"/>`),
    crono: svg(`<circle cx="50" cy="58" r="32" fill="${B}" stroke="${T}" stroke-width="6"/><path d="M50 58V40" stroke="${O}" stroke-width="7" stroke-linecap="round"/><rect x="42" y="10" width="16" height="12" rx="3" fill="${T}"/>`),
    chispas: svg(`<path d="M20 30l4 12 12 4-12 4-4 12-4-12-12-4 12-4zM78 8l3 9 9 3-9 3-3 9-3-9-9-3 9-3zM72 58l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="${O}"/>`),
    duda: svg(`<path d="M32 36c0-12 8-20 19-20s19 8 19 18c0 14-17 15-17 30" fill="none" stroke="${T}" stroke-width="11" stroke-linecap="round"/><circle cx="53" cy="84" r="7" fill="${T}"/>`),
    nube: svg(`<path d="M26 60a16 16 0 0 1 3-32 22 22 0 0 1 42 4 14 14 0 0 1 2 28z" fill="#8C96AB"/><path d="M34 70l-4 12M52 70l-4 12M70 70l-4 12" stroke="#5B8DEF" stroke-width="5" stroke-linecap="round"/>`),
    zzz: svg(`<text x="6" y="88" font-size="40" font-weight="700" fill="${T}" font-family="sans-serif">z</text><text x="34" y="62" font-size="32" font-weight="700" fill="${T}" font-family="sans-serif" opacity=".7">z</text><text x="58" y="38" font-size="26" font-weight="700" fill="${T}" font-family="sans-serif" opacity=".45">z</text>`),
    calendario: svg(`<rect x="12" y="20" width="76" height="68" rx="10" fill="${B}" stroke="${T}" stroke-width="6"/><path d="M12 40h76" stroke="${T}" stroke-width="6"/><path d="M32 12v16M68 12v16" stroke="${T}" stroke-width="7" stroke-linecap="round"/><circle cx="50" cy="63" r="10" fill="${O}"/>`),
    senal: svg(`<path d="M14 44a52 52 0 0 1 72 0M28 58a32 32 0 0 1 44 0M41 72a13 13 0 0 1 18 0" fill="none" stroke="#8C96AB" stroke-width="8" stroke-linecap="round"/><path d="M16 14l68 76" stroke="${T}" stroke-width="8" stroke-linecap="round"/>`),
    sobre: svg(`<rect x="10" y="26" width="80" height="52" rx="8" fill="${B}" stroke="${T}" stroke-width="6"/><path d="M12 30l38 28 38-28" fill="none" stroke="${T}" stroke-width="6" stroke-linejoin="round"/>`),
    avion: svg(`<path d="M8 50l84-36-24 74-20-28z" fill="${B}" stroke="${T}" stroke-width="6" stroke-linejoin="round"/><path d="M48 60l44-46" stroke="${T}" stroke-width="5"/>`),
    flecha: svg(`<path d="M50 10v62M24 50l26 28 26-28" fill="none" stroke="${O}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>`)
  };
  const PIEL = '#4C9EA0', SOMBRA = '#2C777C';
  function ojo(cx, sup, inf, ceja, lado, id) {
    const cy = 297, r = 79;
    let x = `<clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath><g clip-path="url(#${id})">`;
    if (sup > 0) x += `<rect x="${cx - r}" y="${cy - r - 4}" width="${2 * r}" height="${2 * r * sup + 4}" fill="${PIEL}"/><rect x="${cx - r}" y="${cy - r + 2 * r * sup - 5}" width="${2 * r}" height="7" fill="${SOMBRA}"/>`;
    if (inf > 0) x += `<ellipse cx="${cx}" cy="${cy + r + r * .9 - 2 * r * inf}" rx="${r * 1.25}" ry="${r * .9}" fill="${PIEL}" stroke="${SOMBRA}" stroke-width="6"/>`;
    x += '</g>';
    if (ceja != null) x += `<path d="M${cx - 58} ${cy - r - 20}h116" stroke="${SOMBRA}" stroke-width="19" stroke-linecap="round" transform="rotate(${ceja * lado} ${cx} ${cy - r - 20})"/>`;
    return x;
  }
  let n = 0;
  F.mascota = (estado, o) => {
    o = o || {};
    const e = E[estado] ? estado : 'natural', c = E[e], k = ++n;
    const ojos = `<svg class="masc-ojos" viewBox="0 0 467 853" aria-hidden="true">${ojo(116, c.sup || 0, c.inf || 0, c.ceja, 1, 'mo' + k + 'a')}${ojo(351, c.supD != null ? c.supD : (c.sup || 0), c.inf || 0, c.cejaD != null ? c.cejaD : c.ceja, -1, 'mo' + k + 'b')}</svg>`;
    return `<div class="masc g-${c.gesto}${o.mini ? ' mini' : ''}${o.clase ? ' ' + o.clase : ''}" data-e="${e}" role="img" aria-label="Mascota de MiMeta">
      <div class="masc-fig"><div class="masc-cuerpo" data-h="${c.h}" data-s="${c.s}" data-b="${c.b}"><img src="img/mascota.png" alt="">${ojos}</div>
      ${c.acc && !o.mini ? `<div class="masc-acc a-${c.acc}">${ACC[c.acc]}</div>` : ''}<i class="masc-sombra"></i>
      ${o.flecha ? `<div class="masc-flecha f-${o.flecha}">${ACC.flecha}</div>` : ''}</div>
      ${o.texto ? `<div class="masc-globo">${o.texto}</div>` : ''}</div>`;
  };
  F.mascotaEstados = E;
  // El color llega con una transición suave: la figura nace en su color natural y pasa al del estado.
  function despierta(raiz) {
    const l = raiz.querySelectorAll ? raiz.querySelectorAll('.masc-cuerpo:not([data-ok])') : [];
    l.forEach((c) => {
      c.setAttribute('data-ok', '1');
      const f = `hue-rotate(${c.dataset.h}deg) saturate(${c.dataset.s}) brightness(${c.dataset.b})`;
      if (c.closest('.mini')) { c.style.filter = f; return; }
      requestAnimationFrame(() => setTimeout(() => { c.style.filter = f; }, 120));
    });
  }
  new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach((x) => { if (x.nodeType === 1) despierta(x.matches && x.matches('.masc-cuerpo') ? x.parentNode : x); }))).observe(document.documentElement, { childList: true, subtree: true });

  // Qué hace la mascota en «Hoy»: mira lo pendiente y lo atrasado.
  F.mascotaHoy = (m, s, P, plan) => {
    const nombre = plan && plan.nombre ? ', ' + F.esc(plan.nombre) : '';
    const dias = Object.keys(P.dias || {}).filter((d) => F.esDiaDeEstudio(P.dias[d])).sort();
    const ultimo = dias[dias.length - 1];
    const sin = ultimo ? Math.round((new Date(F.hoy() + 'T12:00:00') - new Date(ultimo + 'T12:00:00')) / 864e5) : 0;
    if (!m.items.length) return { e: 'espera', t: `Hola${nombre}. Hoy no tienes nada pendiente. Las tarjetas vuelven solas el día que toca.` };
    if (m.completa) return s.cumplida ? { e: 'racha', t: `¡Misión de hoy y meta de la semana${nombre}! Así se llega.` } : { e: 'victoria', t: `¡Misión cumplida${nombre}! Hoy ya cuenta para tu semana.` };
    const p = m.items.find((x) => !x.hecho);
    const que = p.tipo === 'leer' ? 'la lectura' : p.tipo === 'reto' ? 'el reto' : 'las tarjetas';
    if (sin >= 3) return { e: 'bravo', f: 1, t: `¡${sin} días sin venir${nombre}! Me tenías zapateando. Empieza ya por ${que}.` };
    if (sin === 2) return { e: 'dormido', f: 1, t: `Me estaba quedando dormido esperándote. Despiértame con ${que}.` };
    if (p.tipo === 'leer') return { e: 'lectura', f: 1, t: `Hola${nombre}. Hoy toca leer: ya tengo el libro abierto. Toca el botón de abajo.` };
    if (p.tipo === 'reto') return { e: 'ejercicio', f: 1, t: `Hora de entrenar${nombre}. Yo levanto la pesa y tú haces el reto.` };
    return { e: 'tarjetas', f: 1, t: `Tus tarjetas de repaso están listas${nombre}. Son pocos minutos y se quedan contigo.` };
  };
  F.mascotaPorResultado = (aciertos, total) => {
    const r = total ? aciertos / total : 0;
    return r >= .8 ? 'victoria' : r >= .6 ? 'bien' : r >= .4 ? 'perplejo' : 'triste';
  };
})();

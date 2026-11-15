/* MiMeta · utilidades comunes */
(function () {
  'use strict';
  const F = (window.F = window.F || {});

  F.$ = (sel, root) => (root || document).querySelector(sel);
  F.$$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  F.esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  // Marcado mínimo dentro de los textos: **negrita**, *cursiva*, ==resaltado==, saltos de línea.
  F.md = (s) => F.esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/==(.+?)==/g, '<mark>$1</mark>')
    .replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, '$1<em>$2</em>')
    .replace(/\n/g, '<br>');

  F.h = (html) => {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  };

  const pad = (n) => String(n).padStart(2, '0');
  F.hoy = (d) => { d = d || new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
  F.sumarDias = (iso, n) => { const d = new Date(iso + 'T12:00:00'); d.setDate(d.getDate() + n); return F.hoy(d); };
  F.diasEntre = (a, b) => Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 86400000);
  F.marcaTiempo = (d) => { d = d || new Date(); return F.hoy(d) + '_' + pad(d.getHours()) + '-' + pad(d.getMinutes()) + '-' + pad(d.getSeconds()); };
  // Lunes de la semana de una fecha (la semana empieza el lunes)
  F.lunes = (iso) => { const d = new Date((iso || F.hoy()) + 'T12:00:00'); const w = (d.getDay() + 6) % 7; d.setDate(d.getDate() - w); return F.hoy(d); };
  F.fechaLarga = (d) => {
    d = d || new Date();
    try { return new Intl.DateTimeFormat('es-CO', { weekday: 'long', day: 'numeric', month: 'long' }).format(d); }
    catch (e) { return F.hoy(d); }
  };
  F.fechaCorta = (iso) => {
    try { return new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'short' }).format(new Date(iso.slice(0, 10) + 'T12:00:00')); }
    catch (e) { return iso; }
  };
  F.minutos = (seg) => {
    const m = Math.round(seg / 60);
    if (m < 60) return m + ' min';
    const h = Math.floor(m / 60), r = m % 60;
    return h + ' h' + (r ? ' ' + r + ' min' : '');
  };

  F.uid = () => Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);

  F.toB64 = (str) => {
    const bytes = new TextEncoder().encode(str);
    let bin = '';
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(bin);
  };
  F.hex = (buf) => Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
  F.sha256 = async (str) => F.hex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str)));
  F.pbkdf2 = async (clave, saltHex, iter) => {
    const salt = new Uint8Array(saltHex.match(/.{2}/g).map((x) => parseInt(x, 16)));
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(clave), 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: iter }, key, 256);
    return F.hex(bits);
  };
  F.sal = () => F.hex(crypto.getRandomValues(new Uint8Array(16)));

  F.normCodigo = (s) => String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  F.normCedula = (s) => String(s || '').replace(/[^0-9]/g, '');

  F.contarPalabras = (txt) => (String(txt || '').match(/\S+/g) || []).length;

  // Avisos cortos que aparecen abajo y se van solos
  F.aviso = (texto, tipo, ms) => {
    let cont = F.$('#avisos');
    if (!cont) { cont = F.h('<div id="avisos" aria-live="polite"></div>'); document.body.appendChild(cont); }
    const n = F.h(`<div class="aviso ${tipo || ''}">${F.md(texto)}</div>`);
    cont.appendChild(n);
    const dura = ms || 3200;
    setTimeout(() => n.classList.add('sale'), dura);
    setTimeout(() => n.remove(), dura + 600);
  };

  F.bus = (() => {
    const m = {};
    return {
      on: (ev, fn) => { (m[ev] = m[ev] || []).push(fn); },
      emit: (ev, data) => { (m[ev] || []).forEach((fn) => { try { fn(data); } catch (e) { console.error(e); } }); }
    };
  })();
})();

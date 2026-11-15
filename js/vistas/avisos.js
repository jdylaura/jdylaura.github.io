/* MiMeta (Plan Principal) · avisos diarios (los envía el servicio de avisos de jdylaura.github.io). */
(function () {
  'use strict';
  const F = window.F;
  const b64ToU8 = (s) => { const pad = '='.repeat((4 - s.length % 4) % 4), b = (s + pad).replace(/-/g, '+').replace(/_/g, '/'), raw = atob(b), a = new Uint8Array(raw.length); for (let i = 0; i < raw.length; i++) a[i] = raw.charCodeAt(i); return a; };

  function codigo(sub) {
    const j = sub.toJSON();
    const out = { e: j.endpoint, k: j.keys, q: F.st.activacion.cliente.replace('-', ''), d: F.plataforma.ios ? 'iphone' : 'android' };
    F.st.ajustes.avisos = { fecha: F.hoy() }; F.guardar(true);
    return 'AVISO-' + btoa(unescape(encodeURIComponent(JSON.stringify(out))));
  }

  F.avisosHtml = () => {
    const soporta = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
    const perm = ('Notification' in window) ? Notification.permission : 'no';
    let h = '<section class="caja"><h2>Avisos diarios</h2><p class="sub">Dos avisos al día, uno en la mañana y otro en la noche, para que no se te pasen las tarjetas.</p>';
    if (F.plataforma.ios && !F.plataforma.instalada) h += '<p>En el iPhone los avisos solo funcionan si abres MiMeta desde el ícono de la pantalla de inicio.</p>';
    else if (!soporta) h += '<p>Este navegador no permite avisos. Abre MiMeta desde su ícono en la pantalla de inicio.</p>';
    else if (perm === 'denied') h += '<p>Los avisos están bloqueados en este celular. Actívalos en los ajustes de notificaciones del celular y vuelve aquí.</p>';
    else if (perm === 'granted' && F.st.ajustes.avisos) h += `<p><b>Avisos activados en este celular</b> desde el ${F.esc(F.st.ajustes.avisos.fecha)}.</p><div class="fila" style="gap:10px"><button class="btn secundario" id="avProbar">Probar un aviso</button><button class="btn secundario" id="avVer">Ver el código</button></div>`;
    else h += '<button class="btn primario" id="avActivar">Activar avisos en este celular</button><p class="ayuda">El celular te preguntará si permites notificaciones: toca «Permitir».</p>';
    h += '<div id="avCodigo"></div></section>';
    return h;
  };

  function mostrarCodigo(cod) {
    const z = F.$('#avCodigo'); if (!z) return;
    z.innerHTML = `<div style="margin-top:12px;border:2px solid #E8B10E;border-radius:14px;padding:12px"><b>Último paso: envíale este código a Claude</b>
      <p class="ayuda">Toca «Copiar», abre el chat de Claude del Plan Principal, pega el código y envíalo. Unos minutos después te llega un aviso de bienvenida.</p>
      <textarea readonly style="width:100%;height:84px;font-size:12px;word-break:break-all">${F.esc(cod)}</textarea>
      <button class="btn primario" id="avCopiar" style="margin-top:8px">Copiar</button></div>`;
    F.$('#avCopiar').onclick = () => {
      try { navigator.clipboard.writeText(cod).then(() => F.aviso('Copiado ✓', 'ok'), () => F.aviso('Mantén el dedo sobre el código para copiarlo')); }
      catch (e) { F.aviso('Mantén el dedo sobre el código para copiarlo'); }
    };
  }

  F.avisosMontar = () => {
    const act = F.$('#avActivar'), ver = F.$('#avVer'), pro = F.$('#avProbar');
    const suscribir = async () => {
      const res = await Notification.requestPermission();
      if (res !== 'granted') { F.aviso('Sin permiso no se pueden enviar avisos.', 'mal'); return null; }
      const pub = (await (await fetch('avisos/vapid-public.txt?t=' + Date.now())).text()).trim();
      const reg = await navigator.serviceWorker.ready;
      return (await reg.pushManager.getSubscription()) || (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64ToU8(pub) }));
    };
    const ir = async (b) => {
      b.disabled = true;
      try { const s = await suscribir(); if (s) { const c = codigo(s); F.resumenAvisos(); F.render(); mostrarCodigo(c); } }
      catch (e) { F.aviso('No se pudo activar. Abre MiMeta desde su ícono e inténtalo de nuevo.', 'mal'); }
      b.disabled = false;
    };
    if (act) act.onclick = () => ir(act);
    if (ver) ver.onclick = () => ir(ver);
    if (pro) pro.onclick = () => { F.native.testReminder(); F.aviso('Mira la parte de arriba de la pantalla'); };
  };
})();

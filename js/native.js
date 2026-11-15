/* MiMeta (Plan Principal) · en el celular no hay cáscara de Android: la app es una página instalable.
   Este archivo ocupa el lugar del «puente con el teléfono» de la versión de clientes. */
(function () {
  'use strict';
  const F = window.F;
  const K_LLAVE = 'mm.llave', K_DISP = 'mm.dispositivo';
  const REPO = 'jdylaura/mimeta-plan-principal';
  const ua = navigator.userAgent || '';
  const ios = /iPhone|iPad|iPod/.test(ua);
  const instalada = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;

  let disp = localStorage.getItem(K_DISP);
  if (!disp) { disp = 'WEB-' + Math.random().toString(36).slice(2, 10).toUpperCase(); localStorage.setItem(K_DISP, disp); }

  F.esSimulado = false;
  F.esWeb = true;
  F.plataforma = { ios, instalada };
  F.llave = {
    get: () => localStorage.getItem(K_LLAVE) || '',
    set: (t) => localStorage.setItem(K_LLAVE, String(t || '').trim()),
    borrar: () => localStorage.removeItem(K_LLAVE)
  };

  // Resumen para los avisos (el service worker no puede leer lo demás)
  F.resumenAvisos = () => {
    try {
      const rq = indexedDB.open('mimeta', 1);
      rq.onupgradeneeded = () => rq.result.createObjectStore('kv');
      rq.onsuccess = () => {
        try {
          const r = { hoy: F.hoy(), pendientes: F.tarjetasDeHoy().length, nombre: (F.st.activacion && F.st.activacion.nombre) || '' };
          rq.result.transaction('kv', 'readwrite').objectStore('kv').put(r, 'resumen');
        } catch (e) {}
      };
    } catch (e) {}
  };

  let registro = null;
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then((r) => { registro = r; }).catch(() => {});
  }

  async function buscarVersion() {
    try {
      const r = await fetch('version.txt?t=' + Date.now(), { cache: 'no-store' });
      if (!r.ok) return;
      const v = (await r.text()).trim();
      if (v && v !== F.VERSION_UI && window.fokiaUiUpdated) window.fokiaUiUpdated(v);
    } catch (e) {}
  }

  F.native = {
    info: () => ({
      dispositivo: disp, modelo: ios ? 'iPhone' : (/Android/.test(ua) ? 'Android' : 'Computador'),
      android: '', sdk: '', app: 'web' + (instalada ? ' (instalada)' : ' (navegador)'), nativo: 0,
      pantallas: F.VERSION_UI, webview: ua, llave: !!F.llave.get()
    }),
    token: () => F.llave.get(),
    repo: () => REPO,
    setReminders: () => {},
    setReminderContext: () => { F.resumenAvisos(); },
    testReminder: () => {
      if (!registro || !('Notification' in window) || Notification.permission !== 'granted') { F.aviso('Primero activa los avisos en este celular.'); return; }
      registro.showNotification('Así se ven tus avisos', { body: 'Uno en la mañana y otro en la noche.', icon: 'icons/icon-192.png', badge: 'icons/badge-96.png', tag: 'prueba' });
    },
    requestNotifications: () => {},
    keepScreenOn: () => {},
    checkUiUpdate: buscarVersion,
    reload: () => { location.href = location.pathname + '?mm=' + Date.now() + location.hash; }
  };
})();

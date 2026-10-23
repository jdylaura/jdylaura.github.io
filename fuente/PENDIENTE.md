# Trabajo en curso (suspendido el 22-oct-2026, 11:00 p. m., a pedido de Juan David)

La app publicada es la versión 2026-10-22.2 («Mérito»). En `fuente/` ya está la 2026-10-22.3, **sin publicar**:

1. Correcciones de la auditoría legal independiente (12 claves y cifras confirmadas; corregido: escena e01 con el monto adeudado, lámina f06 «en todo caso, mientras no la presente de nuevo con el pago…», escena e14 «desde la notificación del auto», mapa m06-3 imputación, F07 «antes de cualquier reducción» y distractor de 3 millones, e09 y generador «antes de cualquier reducción», f37 y e15 con los 71 UVT como doctrina DIAN (Concepto 404 de 2026), generador b35base con 40 UVT, citas no confirmadas retiradas de f02, f03, f12, f15 y f30).
2. `boot.js`: revisa si hay versión nueva apenas abre la app.
3. Novedad 2026-10-22.3 en `src/ui/views2.js`.

Para publicarla: `cd fuente && npm install && node tools/build.js ..`, correr `tools/smoke.py` y `tools/sw_test.py`, subir.

Pendientes con ellos:
- Juan David (Samsung S25 Ultra): al instalar desde Samsung Internet apareció «Google Play Protect · Se bloqueó la app no segura · Esta app se diseñó para una versión anterior de Android». No tocar «Instalar de todas formas». Probar la instalación desde Chrome (⋮ → Instalar app) y confirmar.
- Paso 4 (avisos) en los dos celulares: el menú es ☰ (tres rayitas) arriba a la derecha de «Hoy», después de la bienvenida. Recibir los códigos AVISO- y registrarlos con `node avisos/agregar.js`.
- Ya hecho: clave VAPID en GitHub (según ellos), nombre «Mérito», instalación en el iPhone de Laura, nota en la bitácora del Exprés (secciones 9 y 13).
- Actualizar `APP/BITACORA APP.docx` (nombre, auditoría, nota del Exprés, Play Protect) y la guía (Mérito; Samsung por Chrome).

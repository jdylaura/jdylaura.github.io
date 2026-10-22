# Fuente de la app

Todo lo que se publica en la raíz del repositorio se construye desde aquí.

- `src/data/` · contenido: proyecto y usuarios, láminas, escenas, casos del simulacro funcional, afirmaciones.
- `src/engine/gen.js` · generador de casos gemelos (11 familias de reglas).
- `src/ui/` · pantallas: `core.js` (almacenamiento, racha, láminas, misión), `kit.js` (navegación y piezas), `views.js` y `views2.js` (pantallas), `boot.js` (arranque y actualizaciones).
- `src/styles.css` · diseño. `assets/` · ícono. `web/` · plantillas de la página, del service worker y del flujo de avisos.
- `config/app.json` · nombre, versión y dirección. Cada publicación sube la versión (por ejemplo `2026-10-23.1`) y agrega una entrada en `APP.novedades` (en `src/ui/views2.js`).
- `avisos/` · plantilla del servidor de avisos (se copia a la raíz al construir; la lista real de celulares vive en `../avisos/suscripciones.json`).

Publicar una versión:

    cd fuente
    npm install
    node tools/build.js ..                     # escribe la app en la raíz del repositorio
    python3 tools/smoke.py .. /tmp/capturas    # prueba de humo en iPhone y Samsung simulados (opcional)
    cd .. && git add -A && git commit -m "..." && git push

La llave privada de los avisos NO está aquí: es el secreto `VAPID_PRIVATE_KEY` de GitHub Actions.

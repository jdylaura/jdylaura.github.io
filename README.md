# Pilas

App de entrenamiento diario de Laura y Juan David para la prueba de la DIAN 2676 (CNSC). Hecha con Claude.

- La app se abre en https://jdylaura.github.io/ y se instala en la pantalla de inicio del celular.
- El avance de cada uno vive solo en su celular; aquí no hay datos de estudio.
- `fuente/` tiene el código y el contenido. Para publicar una versión: `cd fuente && npm install && node tools/build.js ..` y subir el cambio.
- `avisos/` y `.github/workflows/avisos.yml` envían los avisos diarios. Las direcciones de los celulares están cifradas; la llave para descifrarlas es un secreto de GitHub Actions (`VAPID_PRIVATE_KEY`), que nunca va en el repositorio.
- Para registrar un celular (desde la raíz): `node avisos/agregar.js "AVISO-..."` y subir el cambio; GitHub envía un aviso de bienvenida.

# Pilas

App de entrenamiento diario de Laura y Juan David para la prueba de la DIAN 2676 (CNSC). Hecha con Claude.

- La app se abre en https://jdylaura.github.io/ y se instala en la pantalla de inicio del celular.
- El avance de cada uno vive solo en su celular; aquí no hay datos de estudio.
- `avisos/` y `.github/workflows/avisos.yml` envían los avisos diarios. Las direcciones de los celulares están cifradas; la llave para descifrarlas es un secreto de GitHub Actions (`VAPID_PRIVATE_KEY`).
- Para registrar un celular: `node avisos/agregar.js "AVISO-..."` y subir el cambio.

/* Genera GUIA DE INSTALACION Y USO.docx. Uso: node guia.js salida.docx carpeta_capturas */
const fs = require("fs");
const path = require("path");
const D = require("/opt/npm-tools/node_modules/docx");
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle, AlignmentType, LevelFormat, Footer, PageNumber, ImageRun, PageBreak } = D;

const out = process.argv[2], IMG = process.argv[3];
const FONT = "Calibri", W = 12240 - 2 * 1440;

function runs(text, base) {
  return String(text).split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((t) => t.startsWith("**") ? new TextRun({ text: t.slice(2, -2), bold: true, ...(base || {}) }) : new TextRun({ text: t, ...(base || {}) }));
}
const P = (t, o) => new Paragraph({ children: runs(t), spacing: { after: 120, line: 300 }, ...(o || {}) });
const H1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: t })], spacing: { before: 360, after: 160 } });
const H2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: t })], spacing: { before: 240, after: 120 } });
const B = (t) => new Paragraph({ children: runs(t), numbering: { reference: "vinetas", level: 0 }, spacing: { after: 80, line: 290 } });
let lista = 0;
const pasos = (arr) => { lista++; const ref = "pasos" + lista; refs.push(ref); return arr.map((t) => new Paragraph({ children: runs(t), numbering: { reference: ref, level: 0 }, spacing: { after: 100, line: 300 } })); };
const refs = [];
const sinBorde = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const sinBordes = { top: sinBorde, bottom: sinBorde, left: sinBorde, right: sinBorde };
function imgs(pares) {
  // pares: [[archivo, pie], ...] de a dos por fila
  const rows = [];
  for (let i = 0; i < pares.length; i += 2) {
    const fila = pares.slice(i, i + 2);
    rows.push(new TableRow({ children: [0, 1].map((k) => {
      const it = fila[k];
      const kids = it ? [
        new Paragraph({ alignment: AlignmentType.CENTER, children: [new ImageRun({ type: "jpg", data: fs.readFileSync(path.join(IMG, it[0])), transformation: { width: 205, height: 444 }, altText: { title: it[1], description: it[1], name: it[0] } })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60, after: 160 }, children: [new TextRun({ text: it[1], italics: true, size: 19 })] })
      ] : [new Paragraph("")];
      return new TableCell({ borders: sinBordes, width: { size: W / 2, type: WidthType.DXA }, children: kids });
    }) }));
  }
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [W / 2, W / 2], borders: { top: sinBorde, bottom: sinBorde, left: sinBorde, right: sinBorde, insideHorizontal: sinBorde, insideVertical: sinBorde }, rows });
}

const c = [];
c.push(new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun({ text: "GUÍA DE INSTALACIÓN Y USO" })], spacing: { after: 80 } }));
c.push(P("App de entrenamiento diario de Laura y Juan David · versión 2026-10-22.1 · dirección: **jdylaura.github.io**"));
c.push(P("Necesitan unos 15 minutos: 5 en el computador (una sola vez) y 10 en cada celular. Sigan las partes en orden. Cada paso dice qué botón tocar y dónde está."));

c.push(H1("Lo que conviene saber antes"));
c.push(B("**En el iPhone, borrar el ícono borra el avance de ese celular.** Antes de borrarlo o de cambiar de celular, guarden la copia de seguridad (Parte 7)."));
c.push(B("**La página es pública**, como cualquier página web, pero los buscadores no la muestran y no tiene datos suyos: el avance, las respuestas y las notas viven solo en cada celular."));
c.push(B("**Los avisos diarios solo llegan si la app está instalada** y la abrieron al menos una vez desde el ícono. En el iPhone es obligatorio que esté en la pantalla de inicio."));

c.push(H1("Parte 1 · La clave de los avisos (en el computador, una sola vez)"));
c.push(P("Esto permite que GitHub, el servicio gratuito donde vive la app, les envíe los avisos de la mañana y de la noche. Lo hace uno de los dos."));
c.push(...pasos([
  "En el computador, abre la carpeta **APP** (está en Documentos → A_CLAUDE → PROYECTOS → APP).",
  "Haz doble clic en el archivo **«CLAVE DE AVISOS - PEGAR EN GITHUB Y LUEGO BORRAR»**. Se abre el Bloc de notas con una sola línea de letras y números.",
  "Haz clic derecho sobre esa línea y elige **«Seleccionar todo»**. Luego haz clic derecho otra vez y elige **«Copiar»**.",
  "Abre el navegador (Chrome o Edge), haz clic en la barra de direcciones de arriba, escribe **github.com/jdylaura/jdylaura.github.io/settings/secrets/actions** y presiona la tecla Enter. Si GitHub pide iniciar sesión, escribe tu usuario **jdylaura** y tu contraseña (Claude nunca la necesita).",
  "Se abre la página **«Actions secrets and variables»**. Toca el botón verde **«New repository secret»**. (Si no ves esa página: arriba, en la fila de pestañas del repositorio, toca **«Settings»**, la del engranaje; en la columna de la izquierda busca **«Secrets and variables»**, ábrela y toca **«Actions»**.)",
  "En la casilla **«Name»** escribe exactamente **VAPID_PRIVATE_KEY** (en mayúsculas y con los guiones bajos).",
  "Haz clic dentro de la casilla grande **«Secret»**, luego clic derecho y **«Pegar»**.",
  "Toca el botón verde **«Add secret»**. Verás en la lista una línea llamada **VAPID_PRIVATE_KEY**. GitHub no vuelve a mostrar la clave: es normal.",
  "Vuelve a la carpeta APP, haz clic derecho sobre el archivo de la clave y elige **«Eliminar»**. Ya no se necesita y es mejor que no quede en el computador.",
  "Escríbanle a Claude en el chat: **«Ya pegamos la clave de avisos»**."
]));
c.push(P("Si GitHub te pide confirmar tu contraseña o un código, escríbelo: es una protección normal de GitHub."));

c.push(new Paragraph({ children: [new PageBreak()] }));
c.push(H1("Parte 2 · Instalar la app en el celular"));
c.push(H2("2A · iPhone 16 (Laura), desde Safari"));
c.push(...pasos([
  "Abre **Safari** (el ícono de la brújula azul). Tiene que ser Safari: desde Chrome no se instala en el iPhone.",
  "Toca la barra de direcciones, escribe **jdylaura.github.io** y toca **«Ir»**.",
  "Verás la bienvenida y el recuadro **«Primero, instálala en tu pantalla de inicio»**. Si quieres, toca **«Cómo instalarla»**: la app te muestra estos mismos pasos.",
  "Toca el botón **Compartir** (un cuadrado con una flecha hacia arriba), que está en la barra de abajo de Safari. Si no lo ves, toca primero el botón de los **tres puntos** (abajo a la derecha) y ahí aparece **Compartir**.",
  "Desliza la lista hacia abajo y toca **«Agregar a inicio»** (en algunos iPhone dice «Agregar a pantalla de inicio»).",
  "Si aparece la opción **«Abrir como app web»**, déjala encendida. En la casilla del nombre escribe el nombre que elijan (si aún no lo eligieron, deja «Pilas») y toca **«Agregar»**, arriba a la derecha.",
  "Sal de Safari. En tu pantalla de inicio está el ícono: un chulo amarillo sobre fondo azul. **Ábrela siempre desde ese ícono.**",
  "Para ver el ícono más grande: mantén el dedo sobre un espacio vacío de la pantalla de inicio, toca **«Editar»** (arriba a la izquierda), luego **«Personalizar»** y elige **«Grande»**. El iPhone agranda todos los íconos; no deja agrandar uno solo."
]));
c.push(imgs([["g01-safari-bienvenida.jpg", "En Safari, antes de instalar"], ["g02-safari-instalar.jpg", "La app muestra los pasos para instalarla"]]));
c.push(H2("2B · Samsung S25 Ultra (Juan David)"));
c.push(P("**Con Samsung Internet** (el globo morado que viene en el Samsung):"));
c.push(...pasos([
  "Abre **Internet** (Samsung Internet), toca la barra de direcciones, escribe **jdylaura.github.io** y toca **«Ir»**.",
  "Toca el botón de **menú** (tres rayas), abajo a la derecha. Toca **«Agregar página a»** y luego **«Pantalla de inicio»**. Si en la barra de direcciones ves un ícono de descarga o de instalar, también sirve: tócalo.",
  "Confirma con **«Agregar»**. El ícono aparece en tu pantalla de inicio."
]));
c.push(P("**Con Chrome:**"));
c.push(...pasos([
  "Abre **Chrome**, escribe **jdylaura.github.io** y toca **«Ir»**.",
  "Toca los **tres puntos** de arriba a la derecha y luego **«Instalar app»** (en algunos celulares dice «Agregar a la pantalla principal»).",
  "Confirma con **«Instalar»**. En unos segundos aparece el ícono en la pantalla de inicio y en el cajón de aplicaciones."
]));
c.push(P("Ícono más grande en el Samsung: mantén el dedo sobre un espacio vacío de la pantalla de inicio, toca **«Ajustes»** y en **«Cuadrícula de la pantalla de inicio»** elige una con menos íconos (por ejemplo 4 × 5). Toca **«Guardar»**."));

c.push(H1("Parte 3 · La primera vez (2 minutos)"));
c.push(...pasos([
  "Abre la app desde el ícono y toca **«Empezar»**.",
  "Toca tu nombre: **Laura** o **Juan David**. Cada uno tiene sus competencias y su propio avance.",
  "Confirma el proyecto (Plan DIAN Exprés) con **«Continuar»**.",
  "Elige los temas (al principio, **«Todos los temas»**) y toca **«Continuar»**.",
  "Elige cuántos minutos al día (recomendado: **15**) y toca **«Listo»**. Llegas a **Hoy**, con tu misión del día."
]));
c.push(imgs([["g03-bienvenida.jpg", "Bienvenida"], ["g04-quien.jpg", "Quién entrena en este celular"], ["g05-temas.jpg", "Temas: se pueden cambiar después"], ["g06-inicio.jpg", "Hoy: la misión del día"]]));

c.push(H1("Parte 4 · Elegir el nombre de la app"));
c.push(...pasos([
  "En **Hoy**, toca el botón de **tres rayas** (arriba a la derecha) y luego **«Elegir el nombre de la app»**.",
  "Marca con el **corazón** los nombres que te gusten. La imagen de la izquierda muestra cómo se verá el ícono con ese nombre.",
  "Toca **«Ver otros nombres»** para la siguiente tanda (son 5 tandas) y **«Volver a los anteriores»** si dudas. **«Ver nuestros favoritos»** junta los marcados.",
  "Cuando lo decidan, escríbanle a Claude: **«Elegimos el nombre …»**. Claude actualiza la app. En el iPhone, el nombre debajo del ícono es el que se escribió al instalar."
]));
c.push(imgs([["g07-menu.jpg", "El menú de tres rayas"], ["g08-nombre.jpg", "El selector de nombres"]]));

c.push(new Paragraph({ children: [new PageBreak()] }));
c.push(H1("Parte 5 · Activar los avisos (cada uno en su celular)"));
c.push(P("Háganlo después de la Parte 1 y con la app ya instalada y abierta desde el ícono."));
c.push(...pasos([
  "En **Hoy**, toca las **tres rayas** y luego **«Avisos diarios»**.",
  "Toca el botón amarillo **«Activar avisos en este celular»**. El celular pregunta si permites notificaciones: toca **«Permitir»**.",
  "Aparece un recuadro con un código largo que empieza por **AVISO-**. Toca **«Copiar»**.",
  "Abre la app de **Claude** (o claude.ai) y entra a este mismo chat. Mantén el dedo en el cuadro de escribir, toca **«Pegar»** y envía.",
  "Claude lo registra y, unos minutos después, te llega el aviso **«¡Avisos activados!»**. Desde ahí llegan solos: hacia las 6:30 a. m. y hacia las 8:00 p. m."
]));
c.push(imgs([["g09-avisos.jpg", "Activar los avisos"], ["g10-avisos-codigo.jpg", "El código para enviar a Claude"]]));
c.push(P("Si no llegan: revisa en **Ajustes** del celular → **Notificaciones** que la app tenga los avisos permitidos, y ábrela una vez desde el ícono. En la app, **«Avisos diarios» → «Probar un aviso»** muestra uno de prueba."));

c.push(new Paragraph({ children: [new PageBreak()] }));
c.push(H1("Parte 6 · Cómo se usa cada día"));
c.push(B("**Hoy:** la misión del día (10 a 20 minutos). Cumplirla mantiene viva la racha y abre el cofre con un premio y un consejo para la prueba."));
c.push(B("**Escenas:** lecciones de un minuto que arman los tres mapas y entregan láminas para el álbum."));
c.push(B("**Gemelos:** parejas de casos donde cambia un solo dato y cambia la respuesta. Así se separan plazos, porcentajes y excepciones que se confunden."));
c.push(B("**Memoria:** los tres mapas, las escenas, la ráfaga de gemelos y el contrarreloj de 60 segundos."));
c.push(B("**Simulacro:** el formato de la DIAN 2676. Fijas la respuesta, marcas cómo te fue (el reloj se detiene) y al final ves el diagnóstico y el **paseo del experto**, que resalta el caso paso a paso."));
c.push(B("**Álbum:** las láminas que vas ganando. Se vuelven brillantes y doradas cuando las aciertas en días distintos."));
c.push(B("**Mis estadísticas** (menú de tres rayas): qué reforzar primero, ordenado por la probabilidad de que salga en la prueba, y cómo hacerlo."));
c.push(imgs([["g11-escena.jpg", "Una escena de un minuto"], ["g12-gemelos.jpg", "Gemelos: la explicación al responder"], ["g13-memoria.jpg", "Memoria: los tres mapas"], ["g14-simulacro.jpg", "Simulacro: funcional, comportamental e integridad"], ["g15-marcado.jpg", "Marcado extra con el reloj en pausa"], ["g16-paseo.jpg", "Paseo del experto"], ["g17-album.jpg", "Álbum"], ["g18-estadisticas.jpg", "Mis estadísticas y prioridades"]]));

c.push(H1("Parte 7 · Cuidar el avance y resolver problemas"));
c.push(B("**Copia de seguridad:** menú → «Copia de seguridad» → «Copiar el código». Envíatelo por WhatsApp o correo y guárdalo. Con «Recuperar» lo pegas en otro celular."));
c.push(B("**Actualizaciones:** la app se actualiza sola al abrirla con internet. Si estás en mitad de un ejercicio, aparece una franja verde «Hay una versión nueva»: toca «Actualizar». Tu avance no se pierde."));
c.push(B("**Si sale «Algo falló en esta pantalla»:** toca «Volver al inicio». El error queda anotado; envíenle a Claude el «Reporte para Claude» (menú) y lo corrige."));
c.push(B("**Para que Claude ajuste la app a lo que más fallan:** menú → «Reporte para Claude» → «Copiar el reporte», y péguenlo en el chat con «APP: lee la bitácora y este reporte»."));
c.push(imgs([["g19-respaldo.jpg", "Copia de seguridad"]]));

const numbering = { config: [{ reference: "vinetas", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] }]
  .concat(refs.map((r) => ({ reference: r, levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 320 } } } }] }))) };

const doc = new Document({
  creator: "Claude", title: "Guía de instalación y uso de la app", numbering,
  styles: { default: { document: { run: { font: FONT, size: 23 } } }, paragraphStyles: [
    { id: "Title", name: "Title", basedOn: "Normal", run: { font: FONT, size: 40, bold: true } },
    { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: FONT, size: 30, bold: true }, paragraph: { outlineLevel: 0 } },
    { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: FONT, size: 25, bold: true }, paragraph: { outlineLevel: 1 } }] },
  sections: [{ properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Guía de la app · página " }), new TextRun({ children: [PageNumber.CURRENT] })] })] }) },
    children: c }]
});
Packer.toBuffer(doc).then((b) => { fs.writeFileSync(out, b); console.log("ok", out, b.length); });

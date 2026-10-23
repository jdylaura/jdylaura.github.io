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
const ancha = (archivo, pie, alto) => [
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new ImageRun({ type: "jpg", data: fs.readFileSync(path.join(IMG, archivo)), transformation: { width: 620, height: alto }, altText: { title: pie, description: pie, name: archivo } })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60, after: 200 }, children: [new TextRun({ text: pie, italics: true, size: 19 })] })];
c.push(new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun({ text: "GUÍA DE INSTALACIÓN Y USO DE MÉRITO" })], spacing: { after: 80 } }));
c.push(P("App de entrenamiento diario de Laura y Juan David · versión 2026-10-22.3 · dirección: **jdylaura.github.io**"));
c.push(P("Hagan un paso a la vez. Cada paso dice qué tocar, cómo se ve y dónde está. Si algo se ve distinto, no adivinen: tómenle una captura de pantalla y envíensela a Claude."));

c.push(H1("Lo que conviene saber antes"));
c.push(B("**En el iPhone, borrar el ícono borra el avance de ese celular.** Antes de borrarlo, guarden la copia de seguridad (Parte 6)."));
c.push(B("**En el Samsung se instala desde Chrome, no desde Samsung Internet.** Desde Samsung Internet, Google Play Protect la bloquea con el aviso «Se bloqueó la app no segura». Si aparece ese aviso, toquen «Entendido» y nunca «Instalar de todas formas»."));
c.push(B("**La página es pública**, como cualquier página web, pero los buscadores no la muestran y no tiene datos suyos: el avance vive solo en cada celular."));

c.push(H1("Parte 1 · iPhone de Laura: instalar desde Safari"));
c.push(...pasos([
  "Abre **Safari**: el ícono de la brújula azul. Tiene que ser Safari; desde otro navegador no se instala.",
  "Toca la barra donde se escribe la dirección. En los iPhone nuevos está abajo; en otros, arriba.",
  "Escribe **jdylaura.github.io** (todo junto, en minúsculas) y toca **Ir** en el teclado.",
  "Se abre Mérito: arriba dice **Mérito** en un recuadro amarillo. Si no ves ninguna barra abajo, toca una vez el borde de abajo de la pantalla y aparece.",
  "Mira la barra de abajo. **Si ves tres puntitos (•••)** a la derecha de la dirección, tócalos y, en el menú que se abre, toca **Compartir**. **Si en cambio ves un cuadrado con una flecha hacia arriba**, tócalo.",
  "Se abre una hoja con íconos de apps arriba y una lista abajo. Desliza la lista hacia arriba con el dedo hasta ver **Agregar a inicio** (puede decir «Agregar a pantalla de inicio»), con un cuadrado y un +. Tócalo.",
  "Si no está en la lista: al final de la lista toca **Editar acciones**, busca **Agregar a inicio**, toca el **+** verde, toca **OK** arriba y vuelve a la lista.",
  "Aparece una ventanita con el ícono (un chulo amarillo) y el nombre. Si no dice **Mérito**, bórralo y escríbelo. Si hay un interruptor **Abrir como app web**, déjalo en verde.",
  "Toca **Agregar**, arriba a la derecha de esa ventanita.",
  "Sal de Safari deslizando el dedo hacia arriba desde el borde de abajo. Busca el ícono **Mérito** en la pantalla de inicio; si no está, desliza las páginas hacia la izquierda hasta la última.",
  "Toca el ícono. **Desde ahora ábrela siempre desde ese ícono**, no desde Safari."
]));
c.push(...ancha("iphone-pasos.jpg", "Pasos 5 a 9 en dibujo aproximado: los dos tipos de barra de Safari, la lista y la ventanita final", 336));

c.push(H1("Parte 2 · Samsung de Juan David: instalar desde Chrome"));
c.push(...pasos([
  "En la pantalla de inicio, busca **Chrome**: un círculo rojo, amarillo y verde con un punto azul en el centro. Suele estar en la carpeta **Google**. Si no lo ves, desliza hacia arriba para ver todas las apps y escribe **Chrome** en la búsqueda de arriba.",
  "Toca **Chrome**.",
  "Toca la barra de arriba que dice **Buscar o escribir dirección web**.",
  "Escribe **jdylaura.github.io** y toca **Ir** (o la flecha azul) en el teclado.",
  "Se abre Mérito, con un recuadro blanco que dice **Primero, instálala en tu pantalla de inicio**.",
  "Si en ese recuadro hay un botón amarillo **Instalar ahora**, tócalo y luego toca **Instalar** en la ventanita que aparece abajo. Salta al paso 9.",
  "Si no lo hay: arriba a la derecha de Chrome toca los **tres puntos en columna (⋮)**. En la lista toca **Instalar app** (o **Agregar a la pantalla principal**).",
  "En la ventanita con el chulo amarillo y **Mérito**, toca **Instalar**.",
  "Espera unos segundos. Sal de Chrome deslizando hacia arriba desde el borde de abajo y busca el ícono **Mérito**; si no está en la pantalla de inicio, desliza hacia arriba para ver todas las apps.",
  "Tócalo. Desde ahora, ábrela siempre desde ese ícono."
]));

c.push(new Paragraph({ children: [new PageBreak()] }));
c.push(H1("Parte 3 · La primera vez (1 minuto)"));
c.push(...pasos([
  "Toca el botón amarillo **Empezar**.",
  "Toca el recuadro con tu nombre: **Laura** (círculo rosado) o **Juan David** (círculo azul).",
  "Toca el botón amarillo **Continuar** (proyecto Plan DIAN Exprés).",
  "Toca el botón amarillo **Continuar** (temas: déjalos todos marcados).",
  "Toca **15 minutos · Normal** y luego el botón amarillo **Listo**. Llegas a la pantalla **Hoy**."
]));
c.push(imgs([["g03-bienvenida.jpg", "Paso 1: Empezar"], ["g04-quien.jpg", "Paso 2: tu nombre"], ["g05-temas.jpg", "Paso 4: temas"], ["g06-inicio.jpg", "La pantalla Hoy, con el botón «Menú» arriba a la derecha"]]));

c.push(H1("Parte 4 · Activar los avisos"));
c.push(...pasos([
  "En **Hoy**, arriba a la derecha, toca el botón blanco que dice **Menú** (con tres rayitas al lado).",
  "Sube un panel que dice **Más opciones**. Toca **Avisos diarios** (el de la campanita).",
  "Toca el botón amarillo **Activar avisos en este celular**.",
  "El celular pregunta si permites notificaciones. Toca **Permitir**.",
  "Aparece un recuadro con borde amarillo: **Último paso: envíale este código a Claude**, con un código largo. Toca el botón negro **Copiar**.",
  "Abre la app de **Claude** y entra al chat del proyecto. Mantén el dedo sobre el cuadro de escribir, toca **Pegar** y envía.",
  "Claude lo registra y, en unos minutos, llega arriba en la pantalla el aviso **«¡Avisos activados!»**. Desde ahí llegan solos: hacia las 6:30 a. m. y hacia las 8:00 p. m."
]));
c.push(imgs([["g07-menu.jpg", "Paso 2: el panel «Más opciones»"], ["g09-avisos.jpg", "Paso 3: «Activar avisos en este celular»"], ["g10-avisos-codigo.jpg", "Paso 5: el código y el botón «Copiar»"]]));
c.push(P("Si no llegan: en **Ajustes** del celular → **Notificaciones**, revisa que Mérito tenga los avisos permitidos. En la app, **Menú → Avisos diarios → Probar un aviso** muestra uno de prueba."));

c.push(new Paragraph({ children: [new PageBreak()] }));
c.push(H1("Parte 5 · Cómo se usa cada día"));
c.push(B("**Hoy:** la misión del día (10 a 20 minutos). Cumplirla mantiene viva la racha y abre el cofre con un premio y un consejo para la prueba."));
c.push(B("**Escenas:** lecciones de un minuto que arman los tres mapas y entregan láminas para el álbum."));
c.push(B("**Gemelos:** parejas de casos donde cambia un solo dato y cambia la respuesta."));
c.push(B("**Memoria** (pestaña de abajo): los tres mapas, las escenas, la ráfaga de gemelos y el contrarreloj."));
c.push(B("**Simulacro** (pestaña de abajo): el formato de la DIAN 2676. Fijas la respuesta, marcas cómo te fue (el reloj se detiene) y al final ves el diagnóstico y el **paseo del experto**."));
c.push(B("**Álbum** (pestaña de abajo): las láminas que vas ganando; se vuelven brillantes y doradas cuando las aciertas en días distintos."));
c.push(B("**Menú → Mis estadísticas:** qué reforzar primero, ordenado por la probabilidad de que salga en la prueba, y cómo hacerlo."));
c.push(imgs([["g11-escena.jpg", "Una escena de un minuto"], ["g12-gemelos.jpg", "Gemelos: la explicación al responder"], ["g13-memoria.jpg", "Memoria: los tres mapas"], ["g14-simulacro.jpg", "Simulacro"], ["g15-marcado.jpg", "Marcado extra con el reloj en pausa"], ["g16-paseo.jpg", "Paseo del experto"], ["g17-album.jpg", "Álbum"], ["g18-estadisticas.jpg", "Mis estadísticas"]]));

c.push(H1("Parte 6 · Cuidar el avance y resolver problemas"));
c.push(B("**Copia de seguridad:** Menú → «Copia de seguridad» → «Copiar el código». Envíatelo por WhatsApp o correo y guárdalo. Con «Recuperar» lo pegas en otro celular."));
c.push(B("**Actualizaciones:** la app se actualiza sola al abrirla con internet. Si estás en mitad de un ejercicio, aparece una franja verde «Hay una versión nueva»: toca «Actualizar». Tu avance no se pierde."));
c.push(B("**Si sale «Algo falló en esta pantalla»:** toca «Volver al inicio» y envíenle a Claude el «Reporte para Claude» (Menú)."));
c.push(B("**Para que Claude ajuste la app a lo que más fallan:** Menú → «Reporte para Claude» → «Copiar el reporte», y péguenlo en el chat con «APP: lee la bitácora y este reporte»."));
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

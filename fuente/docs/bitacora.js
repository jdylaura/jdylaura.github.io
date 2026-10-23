/* Genera BITACORA APP.docx. Uso: node bitacora.js salida.docx datos.json */
const fs = require("fs");
const D = require("/opt/npm-tools/node_modules/docx");
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle, AlignmentType, LevelFormat, Footer, PageNumber, ExternalHyperlink } = D;

const out = process.argv[2];
const datos = JSON.parse(fs.readFileSync(process.argv[3], "utf8"));

const FONT = "Calibri";
const W = 12240 - 2 * 1440; // ancho útil en DXA (carta, márgenes de 1")

function runs(text, base) {
  // **negrilla** dentro del texto
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((t) => t.startsWith("**") ? new TextRun({ text: t.slice(2, -2), bold: true, ...(base || {}) }) : new TextRun({ text: t, ...(base || {}) }));
}
const P = (text, opts) => new Paragraph({ children: runs(text), spacing: { after: 120, line: 300 }, ...(opts || {}) });
const H1 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text })], spacing: { before: 360, after: 160 } });
const H2 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text })], spacing: { before: 240, after: 120 } });
const B = (text, level) => new Paragraph({ children: runs(text), numbering: { reference: "vinetas", level: level || 0 }, spacing: { after: 80, line: 290 } });
const N = (text, ref) => new Paragraph({ children: runs(text), numbering: { reference: ref || "numeros", level: 0 }, spacing: { after: 80, line: 290 } });

const borde = { style: BorderStyle.SINGLE, size: 4, color: "999999" };
const bordes = { top: borde, bottom: borde, left: borde, right: borde };
function tabla(cols, filas) {
  const total = cols.reduce((a, c) => a + c.w, 0);
  const widths = cols.map((c) => Math.round(W * c.w / total));
  const fila = (celdas, head) => new TableRow({
    tableHeader: !!head,
    children: celdas.map((txt, i) => new TableCell({
      borders: bordes, width: { size: widths[i], type: WidthType.DXA },
      margins: { top: 60, bottom: 60, left: 100, right: 100 },
      children: String(txt).split("\n").map((linea) => new Paragraph({ children: runs(linea, head ? { bold: true } : undefined), spacing: { after: 40, line: 270 } }))
    }))
  });
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: widths, rows: [fila(cols.map((c) => c.t), true)].concat(filas.map((f) => fila(f))) });
}

const children = [];
children.push(new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun({ text: "BITÁCORA DEL PROYECTO APP" })], spacing: { after: 120 } }));
children.push(P("App de entrenamiento diario de Laura y Juan David · creada el 22 de octubre de 2026 · última actualización: " + datos.actualizada));

children.push(H1("0. Cómo se usa esta bitácora"));
children.push(P("Es el registro oficial del proyecto APP. **Manda sobre la memoria automática de Claude**: si algo no está escrito aquí o en el repositorio, no se reconstruye de memoria."));
children.push(P("Para retomar en un chat nuevo, escriban: **«APP: lee la bitácora y continúa»**. Claude lee esta bitácora (carpeta APP del computador), el repositorio de GitHub y, si se lo pegan, el «Reporte para Claude» que da la app."));
children.push(P("La APP **no hace parte** del Plan DIAN Exprés ni del Proyecto Disciplinario: no cambia su avance ni se usa como medición de esos proyectos, salvo que ustedes lo pidan. Sí se alimenta de su material (lecciones, ejes, bitácoras, mejoras)."));

children.push(H1("1. Estado actual"));
datos.estado.forEach((l) => children.push(B(l)));

children.push(H1("2. Dónde está cada cosa"));
children.push(tabla([{ t: "Qué", w: 34 }, { t: "Dónde", w: 66 }], datos.donde));

children.push(H1("3. Decisiones y por qué"));
datos.decisiones.forEach((d) => {
  children.push(H2(d.t));
  d.p.forEach((x) => children.push(Array.isArray(x) ? B(x[0], x[1] || 0) : P(x)));
});

children.push(H1("4. Contenido de la versión " + datos.version));
datos.contenido.forEach((x) => children.push(Array.isArray(x) ? B(x[0], x[1] || 0) : P(x)));

children.push(H1("5. Pendientes"));
children.push(tabla([{ t: "#", w: 5 }, { t: "Qué", w: 55 }, { t: "Quién", w: 20 }, { t: "Estado", w: 20 }], datos.pendientes));

children.push(H1("6. Cómo trabaja Claude en la app (técnico)"));
datos.tecnico.forEach((x) => children.push(Array.isArray(x) ? B(x[0], x[1] || 0) : P(x)));

children.push(H1("7. Registro de fallos"));
children.push(P("Si un error de Claude aparece en una versión anterior, la corrección se anota aquí y se avisa en «Lo nuevo» de la app."));
children.push(tabla([{ t: "Fecha", w: 14 }, { t: "Fallo", w: 46 }, { t: "Corrección", w: 40 }], datos.fallos));

children.push(H1("8. Historial de versiones"));
children.push(tabla([{ t: "Versión", w: 18 }, { t: "Fecha", w: 16 }, { t: "Cambios", w: 66 }], datos.versiones));

children.push(H1("9. Reportes y resultados recibidos"));
children.push(P("Aquí se anota cada «Reporte para Claude» que envíen desde la app (menú → Reporte para Claude): fecha, quién, qué mostró y qué se ajustó."));
children.push(tabla([{ t: "Fecha", w: 14 }, { t: "Quién", w: 14 }, { t: "Lo que mostró", w: 40 }, { t: "Ajuste", w: 32 }], datos.reportes.length ? datos.reportes : [["—", "—", "Aún no hay reportes.", "—"]]));

const doc = new Document({
  creator: "Claude", title: "Bitácora del proyecto APP", description: "Registro del proyecto APP de Laura y Juan David",
  styles: {
    default: { document: { run: { font: FONT, size: 22 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal", run: { font: FONT, size: 40, bold: true } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: FONT, size: 30, bold: true }, paragraph: { outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: FONT, size: 25, bold: true }, paragraph: { outlineLevel: 1 } }
    ]
  },
  numbering: { config: [
    { reference: "vinetas", levels: [
      { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } },
      { level: 1, format: LevelFormat.BULLET, text: "–", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 1080, hanging: 270 } } } }] },
    { reference: "numeros", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 300 } } } }] }
  ] },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Bitácora APP · página " }), new TextRun({ children: [PageNumber.CURRENT] })] })] }) },
    children
  }]
});
Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(out, buf); console.log("ok", out, buf.length); });

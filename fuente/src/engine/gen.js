/* Generador de microcasos «gemelos» para los capítulos 1 a 3 del M06.
   Cada familia construye primero las variables del caso, calcula la respuesta con la regla
   y solo después redacta el texto. Los gemelos cambian una sola variable para que la respuesta cambie.
   Reglas confrontadas el 22-oct-2026 en secretariasenado.gov.co (ver laminas.js). */
var APP = window.APP || (window.APP = {});

APP.gen = (function () {
  "use strict";

  /* ---------- Azar con semilla ---------- */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function Rng(seed) {
    var f = mulberry32(seed >>> 0);
    var r = {
      seed: seed >>> 0,
      f: f,
      int: function (a, b) { return a + Math.floor(f() * (b - a + 1)); },
      pick: function (arr) { return arr[Math.floor(f() * arr.length)]; },
      chance: function (p) { return f() < p; },
      shuffle: function (arr) {
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(f() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
        return a;
      }
    };
    return r;
  }

  /* ---------- Utilidades de texto ---------- */
  var NUM = ["cero", "un", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce",
    "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte", "veintiún", "veintidós",
    "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete", "veintiocho", "veintinueve", "treinta"];
  function n2w(n) {
    if (n >= 0 && n <= 30) return NUM[n];
    if (n > 30 && n < 100) { var t = ["", "", "", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"][Math.floor(n / 10)], u = n % 10; return u ? t + " y " + NUM[u] : t; }
    return String(n);
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function meses(n) { return n === 1 ? "un mes" : n2w(n) + " meses"; }
  function dias(n) { return n === 1 ? "un día" : n2w(n).replace(/^un$/, "uno") + " días"; }
  function semanas(n) { return n === 1 ? "una semana" : n2w(n) + " semanas"; }
  function pesos(n) { return n.toLocaleString("es-CO") + " pesos"; }
  function millones(n) { return n2w(n).replace(/^un$/, "un") + " millones de pesos"; }

  var ENT = [
    { n: "una ferretería de Pereira", s: "la ferretería", g: "f" },
    { n: "una cooperativa de ahorro de Tunja", s: "la cooperativa", g: "f" },
    { n: "un hotel de Santa Marta", s: "el hotel", g: "m" },
    { n: "una clínica veterinaria de Cali", s: "la clínica", g: "f" },
    { n: "una empresa de software de Medellín", s: "la empresa", g: "f" },
    { n: "una distribuidora de lácteos de Bucaramanga", s: "la distribuidora", g: "f" },
    { n: "una transportadora de carga de Barranquilla", s: "la transportadora", g: "f" },
    { n: "una panadería industrial de Manizales", s: "la panadería", g: "f" },
    { n: "una constructora de Villavicencio", s: "la constructora", g: "f" },
    { n: "una tostadora de café de Armenia", s: "la tostadora", g: "f" },
    { n: "una agencia de viajes de Cartagena", s: "la agencia", g: "f" },
    { n: "una imprenta de Ibagué", s: "la imprenta", g: "f" },
    { n: "un taller de carrocerías de Cúcuta", s: "el taller", g: "m" },
    { n: "una comercializadora de llantas de Montería", s: "la comercializadora", g: "f" },
    { n: "un colegio privado de Pasto", s: "el colegio", g: "m" },
    { n: "una productora de eventos de Bogotá", s: "la productora", g: "f" },
    { n: "un laboratorio dental de Neiva", s: "el laboratorio", g: "m" },
    { n: "una exportadora de flores de Rionegro", s: "la exportadora", g: "f" },
    { n: "un gimnasio de Sincelejo", s: "el gimnasio", g: "m" },
    { n: "una fábrica de muebles de Itagüí", s: "la fábrica", g: "f" }
  ];

  /* Paráfrasis: en nivel 1 la figura se nombra; en nivel 3 se describe como lo haría el operador. */
  var PAR = {
    E: ["un emplazamiento para corregir",
        "una invitación formal a corregir lo declarado",
        "un escrito con indicios de inexactitud y una invitación a revisar lo declarado"],
    AUTO: ["un auto que ordena una inspección tributaria",
           "la orden de una visita de inspección tributaria",
           "un auto que decreta la revisión de sus libros en una inspección tributaria"],
    R: ["el requerimiento especial",
        "el acto con el que la DIAN propone modificar la declaración",
        "la propuesta oficial de modificación de su liquidación privada"],
    V: ["el vencimiento del plazo para declarar",
        "la fecha límite del calendario tributario",
        "el último día que le fijaba el calendario"],
    BAJAR: ["corregirla para pagar menos",
            "presentar una nueva declaración con un menor valor a cargo",
            "presentar una nueva versión de la declaración que reduce el impuesto"],
    SALDO: ["corregirla para aumentar el saldo a favor",
            "presentar una nueva declaración con un saldo a favor mayor",
            "presentar una nueva versión que incrementa lo que la DIAN le debe"],
    SUBIR: ["corregirla para pagar más",
            "presentar una nueva declaración con un mayor impuesto a cargo",
            "presentar una nueva versión de la declaración que aumenta el valor a pagar"],
    DEV: ["pidió la devolución del saldo a favor",
          "solicitó que la DIAN le devolviera el saldo a favor",
          "radicó la solicitud para que le reintegraran el saldo a favor"],
    IMP: ["llevó el saldo a favor a la declaración del periodo siguiente",
          "imputó el saldo a favor en la declaración siguiente",
          "restó el saldo a favor del impuesto en la declaración del año siguiente"],
    NODECL: ["la sanción por no declarar",
             "la resolución que la sanciona por no declarar",
             "el acto que le impone sanción por no haber cumplido el deber de declarar"]
  };
  function P(key, lvl, r) {
    var arr = PAR[key];
    if (lvl <= 1) return arr[0];
    if (lvl === 2) return r.chance(0.5) ? arr[0] : arr[1];
    return r.chance(0.35) ? arr[1] : arr[2];
  }

  function decl(r, tipo) {
    if (tipo === "iva") return r.pick(["su declaración de IVA del segundo bimestre de 2025", "su declaración de IVA del primer cuatrimestre de 2025", "su declaración de IVA del quinto bimestre de 2024"]);
    if (tipo === "ret") return r.pick(["su declaración de retención en la fuente de marzo de 2026", "su declaración de retención en la fuente de enero de 2026", "su declaración de retención en la fuente de abril de 2026"]);
    return r.pick(["su declaración de renta del año gravable 2024", "su declaración de renta del año gravable 2023"]);
  }

  /* ---------- Construcción de opciones ---------- */
  function op(t, ok, por) { return { t: t, ok: !!ok, por: por || "" }; }
  function fixc(t) { return typeof t === "string" ? t.replace(/(^|\s)de el(?=\s)/g, "$1del").replace(/(^|\s)De el(?=\s)/g, "$1Del").replace(/(^|\s)a el(?=\s)/g, "$1al") : t; }
  function finish(c, r) {
    c.ctx = fixc(c.ctx); c.q = fixc(c.q); c.exp = fixc(c.exp);
    c.ops.forEach(function (o) { o.t = fixc(o.t); o.por = fixc(o.por); });
    c.ops = r.shuffle(c.ops);
    c.key = c.ops.findIndex(function (o) { return o.ok; });
    return c;
  }

  /* ---------- Familias ---------- */
  var FAM = {};

  /* 1 · Corregir para bajar (art. 589) */
  FAM.bajar = {
    nombre: "Corregir para bajar", sub: "s-bajar", lam: ["f14", "f16", "f39"], twin: true,
    vars: function (r) { return { inside: r.chance(0.5), m: 0, obj: r.pick(["pagar", "saldo"]), tipo: r.pick(["renta", "iva"]) }; },
    flip: function (v) { return Object.assign({}, v, { inside: !v.inside, m: 0 }); },
    cambio: "el tiempo que pasó desde el vencimiento",
    build: function (v, lvl, r) {
      var m = v.m || (v.inside ? r.int(3, 10) : r.int(14, 22));
      var e = r.pick(ENT);
      var accion = v.obj === "pagar" ? P("BAJAR", lvl, r) : P("SALDO", lvl, r);
      var ctx = cap(e.n) + " presentó a tiempo " + decl(r, v.tipo) + ". " + cap(meses(m)) + " después de " + P("V", lvl, r) +
        " quiere " + accion + ". La DIAN no le ha enviado ningún acto sobre ese periodo.";
      var c = {
        ctx: ctx, q: lvl <= 1 ? "¿Puede hacerlo?" : "Sobre esa nueva declaración es correcto afirmar que:",
        ops: [
          op("Procede, porque está dentro del año siguiente al vencimiento, y no lleva sanción de corrección.", v.inside,
             v.inside ? "Correcto: la corrección a la baja tiene un año desde el vencimiento (art. 589) y no lleva sanción (art. 644, par. 4)." : "El año siguiente al vencimiento ya terminó: pasaron " + meses(m) + "."),
          op("No procede por esa vía, porque el año siguiente al vencimiento ya terminó.", !v.inside,
             !v.inside ? "Correcto: pasaron " + meses(m) + " y el art. 589 da un año desde el vencimiento." : "Todavía no ha pasado el año: van " + meses(m) + "."),
          op("Procede mientras la declaración no esté en firme, es decir, dentro de los tres años siguientes.", false,
             "Trampa: los tres años son de la firmeza (art. 714) y de la corrección que sube el impuesto (art. 588). Para bajar, el plazo es un año.")
        ],
        exp: "Para bajar el impuesto o subir el saldo a favor: un año desde el vencimiento, sin sanción (art. 589). Que la declaración no esté en firme no abre esa puerta.",
        linea: { span: [-2, 40], ev: [{ m: 0, k: "V", lab: "Vence" }, { m: m, k: "C", lab: "Quiere corregir" }],
          win: [{ from: 0, to: 12, col: "b", lab: "Bajar: 1 año" }, { from: 0, to: 36, col: "o", lab: "Reloj de la DIAN: 3 años", ghost: true }] }
      };
      return finish(c, r);
    }
  };

  /* 2 · Corregir para subir (art. 588) */
  FAM.subir = {
    nombre: "Corregir para subir", sub: "s-subir", lam: ["f11", "f12", "f39"], twin: true,
    vars: function (r) { return { mode: r.pick(["tiempo", "req", "par1"]), st: r.chance(0.5), tipo: r.pick(["renta", "iva"]) }; },
    flip: function (v) { return Object.assign({}, v, { st: !v.st }); },
    cambio: function (v) { return v.mode === "tiempo" ? "el tiempo que pasó desde el vencimiento" : v.mode === "req" ? "si la DIAN ya había notificado su propuesta de modificación" : "cuántos días pasaron entre el emplazamiento y la corrección"; },
    build: function (v, lvl, r) {
      var e = r.pick(ENT), R = P("R", lvl, r), d = decl(r, v.tipo), ctx, ops, linea, exp;
      var O_SI = "Procede, porque está dentro de los tres años siguientes al vencimiento y no se le ha notificado " + R + ".";
      var O_ANY = "Procede en cualquier tiempo, porque la corrección aumenta el impuesto a favor del fisco.";
      if (v.mode === "tiempo") {
        var m = v.st ? r.int(6, 33) : r.int(38, 46);
        ctx = cap(e.n) + " presentó a tiempo " + d + ". " + cap(meses(m)) + " después de " + P("V", lvl, r) + " descubre un ingreso que no declaró y quiere " + P("SUBIR", lvl, r) + ". La DIAN no le ha enviado ningún acto.";
        ops = [op(O_SI, v.st, v.st ? "Correcto: se cumplen las dos condiciones del art. 588." : "Ya pasaron " + meses(m) + ": más de tres años."),
               op("No procede, porque ya pasaron los tres años siguientes al vencimiento.", !v.st, !v.st ? "Correcto: van " + meses(m) + " y el art. 588 da tres años." : "Todavía no han pasado tres años: van " + meses(m) + "."),
               op(O_ANY, false, "Trampa: subir el impuesto también tiene límite: tres años y antes del requerimiento (art. 588). «En cualquier tiempo» es del art. 43 de la Ley 962.")];
        linea = { span: [-2, 48], ev: [{ m: 0, k: "V", lab: "Vence" }, { m: m, k: "C", lab: "Quiere corregir" }], win: [{ from: 0, to: 36, col: "y", lab: "Subir: 3 años" }] };
        exp = "Subir el impuesto exige las dos condiciones a la vez: tres años desde el vencimiento y ningún requerimiento especial notificado (art. 588).";
      } else if (v.mode === "req") {
        var m2 = r.int(16, 30), rq = m2 - r.int(1, 4);
        ctx = cap(e.n) + " presentó a tiempo " + d + ". " + (v.st ? "" : cap(meses(rq)) + " después del vencimiento, la DIAN le notificó " + R + ". ") +
          cap(meses(m2)) + " después del vencimiento, " + e.s + " quiere " + P("SUBIR", lvl, r) + (v.st ? ". La DIAN no le ha notificado ningún acto." : ".");
        ops = [op(O_SI, v.st, v.st ? "Correcto: dentro de los tres años y sin requerimiento notificado." : "Falla la segunda condición: ya le notificaron " + R + "."),
               op("No procede como corrección voluntaria, porque ya se le notificó " + R + ".", !v.st, !v.st ? "Correcto: notificado el requerimiento, la puerta del art. 588 se cierra aunque falten meses para los tres años. Queda la corrección al responder el requerimiento (M07)." : "El caso dice que no se le ha notificado ningún acto."),
               op(O_ANY, false, "Trampa: la corrección que sube el impuesto tiene límites en el art. 588.")];
        linea = { span: [-2, 40], ev: [{ m: 0, k: "V", lab: "Vence" }].concat(v.st ? [] : [{ m: rq, k: "R", lab: "Requerimiento" }]).concat([{ m: m2, k: "C", lab: "Quiere corregir" }]),
          win: [{ from: 0, to: v.st ? 36 : rq, col: "y", lab: "Subir (588)" }] };
        exp = "Una sola condición no basta: con el requerimiento notificado se cierra la puerta del art. 588, aunque no hayan pasado tres años.";
      } else {
        var antes = r.int(6, 12), despues = v.st ? r.int(8, 15) : r.int(35, 45);
        ctx = cap(e.n) + " presentó a tiempo " + d + ". " + cap(dias(antes)) + " antes de que se cumplieran tres años del vencimiento, la DIAN le notificó " + P("E", lvl, r) + ". " +
          cap(e.s) + " corrige y aumenta el impuesto " + dias(despues) + " después de cumplidos los tres años. No hay requerimiento notificado.";
        ops = [op("Procede, porque corrige dentro del término para responder el emplazamiento, aunque ya pasaron los tres años.", v.st,
                  v.st ? "Correcto: el parágrafo del art. 588 valida la corrección hecha en el término de respuesta al emplazamiento (un mes, art. 685). Entre la notificación y la corrección pasaron " + dias(antes + despues) + "." : "Entre la notificación y la corrección pasaron " + dias(antes + despues) + ": el mes para responder ya había vencido."),
               op("No procede, porque pasaron los tres años y el término para responder el emplazamiento ya venció.", !v.st,
                  !v.st ? "Correcto: pasaron " + dias(antes + despues) + " desde la notificación; el mes del art. 685 ya había vencido y el art. 588 ya no la cubre." : "Todavía corría el mes para responder: pasaron " + dias(antes + despues) + " desde la notificación."),
               op("Procede, porque el emplazamiento suspende el plazo de tres años del contribuyente mientras no responda.", false,
                  "Trampa: lo que se suspende (un mes) es el término de la DIAN para notificar el requerimiento (art. 706), no el del contribuyente. Lo que salva al contribuyente es el parágrafo del art. 588.")];
        linea = { span: [30, 40], ev: [{ m: 36 - antes / 30, k: "E", lab: "Emplazamiento" }, { m: 36, k: "V3", lab: "3 años" }, { m: 36 + despues / 30, k: "C", lab: "Corrige" }],
          win: [{ from: 30, to: 36, col: "y", lab: "Subir (588)" }, { from: 36 - antes / 30, to: 36 - antes / 30 + 1, col: "p", lab: "Mes para responder" }] };
        exp = "El parágrafo del art. 588 permite corregir aunque hayan pasado los tres años, si se hace en el término de respuesta al pliego de cargos o al emplazamiento para corregir (un mes).";
      }
      return finish({ ctx: ctx, q: lvl <= 1 ? "¿Procede la corrección?" : "Frente a esa corrección es correcto concluir que:", ops: ops, exp: exp, linea: linea }, r);
    }
  };

  /* 3 · El peaje (art. 644) */
  function pctTxt(n) { return n === 0 ? "Ninguna sanción de corrección." : n + " % del mayor valor a pagar."; }
  FAM.peaje = {
    nombre: "Cuánto cuesta corregir", sub: "s-peaje", lam: ["f18", "f19", "f20", "f21", "f22"], twin: true,
    vars: function (r) {
      var mode = r.pick(["momento", "momento", "tarde", "tope"]);
      return { mode: mode, st: r.chance(0.5), act: r.pick(["E", "AUTO"]), x: r.int(1, 3), y: r.int(2, 20), amt: r.pick([8, 12, 15, 20, 24, 30, 40]) };
    },
    flip: function (v) { return Object.assign({}, v, { st: !v.st }); },
    cambio: function (v) { return v.mode === "momento" ? "si la DIAN ya había notificado su invitación a corregir" : v.mode === "tarde" ? "si la declaración inicial se presentó a tiempo o tarde" : "cuántos meses tardó la declaración inicial"; },
    build: function (v, lvl, r) {
      var e = r.pick(ENT), d = decl(r, r.pick(["renta", "iva"])), act = P(v.act, lvl, r), ctx, base, add = 0, tot, ops, exp, linea;
      if (v.mode === "momento") {
        base = v.st ? 20 : 10;
        ctx = cap(e.n) + " presentó a tiempo " + d + ". " + (v.st ? "Después de que la DIAN le notificó " + act + ", y antes de cualquier otro acto, " : "Ocho meses después del vencimiento, sin que la DIAN le haya notificado nada, ") +
          e.s + " corrige y aumenta el impuesto en " + millones(v.amt) + ".";
        tot = base;
        ops = [op(pctTxt(10), base === 10, base === 10 ? "Correcto: corrige después del vencimiento y antes de cualquier emplazamiento o auto de inspección (art. 644, num. 1)." : "El 10 % es para quien corrige antes de que la DIAN toque la puerta. Aquí ya le notificaron " + act + "."),
               op(pctTxt(20), base === 20, base === 20 ? "Correcto: corrige después de notificado " + act + " y antes del requerimiento especial (art. 644, num. 2)." : "El 20 % exige un emplazamiento o un auto de inspección ya notificado. Aquí no hay ninguno."),
               op(pctTxt(0), false, "Sin sanción solo se corrige antes del vencimiento, por diferencias de criterio, sin cambiar el valor o a la baja (art. 589).")];
        exp = "El acto que ya se notificó decide el porcentaje: antes de emplazamiento o auto de inspección, 10 %; después, 20 % (art. 644).";
        linea = { span: [-2, 20], ev: [{ m: 0, k: "V", lab: "Vence" }].concat(v.st ? [{ m: 6, k: "E", lab: v.act === "E" ? "Emplazamiento" : "Auto de inspección" }, { m: 9, k: "C", lab: "Corrige" }] : [{ m: 8, k: "C", lab: "Corrige" }]),
          zones: [{ from: 0, to: v.st ? 6 : 20, lab: "10 %" }].concat(v.st ? [{ from: 6, to: 20, lab: "20 %" }] : []) };
      } else if (v.mode === "tarde") {
        base = 10;
        var fr = v.x + 1;
        add = v.st ? 5 * fr : 0;
        tot = base + add;
        ctx = cap(e.n) + " presentó " + d + " " + (v.st ? cap(meses(v.x)).toLowerCase() + " y " + dias(v.y) + " después del vencimiento" : "a tiempo") + ". Un año después del vencimiento, sin que la DIAN le haya notificado nada, corrige y aumenta el impuesto en " + millones(v.amt) + ".";
        // conjunto fijo para el par: 10, 10+5(fr-1), 10+5fr
        var set = [10, 10 + 5 * (fr - 1), 10 + 5 * fr];
        ops = set.map(function (p) {
          var ok = p === tot, por;
          if (ok) por = v.st ? "Correcto: 10 % por corregir antes de cualquier invitación, más 5 % por cada mes o fracción de retardo de la inicial: " + meses(v.x) + " y " + dias(v.y) + " son " + n2w(fr) + " fracciones, " + (5 * fr) + " puntos más (art. 644, par. 1)." : "Correcto: la inicial fue oportuna, así que al 10 % no se le suma nada.";
          else if (!v.st) por = "La inicial se presentó a tiempo: no hay retardo que sumar al 10 %.";
          else if (p === 10) por = "Falta sumar el 5 % por cada mes o fracción de retardo de la declaración inicial.";
          else por = "Contó mal las fracciones: " + meses(v.x) + " y " + dias(v.y) + " son " + n2w(fr) + " fracciones, no " + n2w(fr - 1) + ".";
          return op(p + " % del mayor valor a pagar.", ok, por);
        });
        exp = "Si la inicial fue extemporánea, al 10 % o al 20 % se le suma 5 % por cada mes o fracción de retardo, con tope del 100 % (art. 644, par. 1).";
        linea = { span: [-2, 14], ev: [{ m: 0, k: "V", lab: "Vence" }].concat(v.st ? [{ m: v.x + v.y / 30, k: "P", lab: "Presentó" }] : []).concat([{ m: 12, k: "C", lab: "Corrige" }]), zones: [{ from: 0, to: 14, lab: "10 %" }] };
      } else {
        base = 20;
        var late = v.st ? r.int(17, 22) : r.int(2, 4);
        var frc = late + 1;
        add = 5 * frc;
        tot = Math.min(100, base + add);
        ctx = cap(e.n) + " presentó " + d + " " + meses(late) + " y " + dias(v.y) + " después del vencimiento. Antes de que se cumplieran tres años del vencimiento, la DIAN le notificó " + act + ", y dentro del mes siguiente " + e.s + " corrige y aumenta el impuesto en " + millones(v.amt) + ". No le han notificado ningún otro acto.";
        var sum = base + add;
        var setT = v.st ? [100, sum, 20] : [sum, sum - 5, 20];
        ops = setT.map(function (p) {
          var ok = p === tot;
          var por = ok ? (v.st ? "Correcto: 20 % más " + (5 * frc) + " puntos por " + n2w(frc) + " fracciones de retardo suman " + sum + " %, pero la sanción total no puede pasar del 100 % del mayor valor (art. 644, par. 1)." : "Correcto: 20 % por corregir después del acto de la DIAN, más 5 % por cada una de las " + n2w(frc) + " fracciones de retardo: " + sum + " %.")
                         : (p === 20 ? "Falta sumar el 5 % por cada mes o fracción de retardo de la inicial." : (p > 100 ? "La suma da " + sum + " %, pero el parágrafo 1 del art. 644 pone un tope del 100 %." : "Contó mal las fracciones de retardo."));
          return op(p + " % del mayor valor a pagar.", ok, por);
        });
        exp = "20 % por corregir después del emplazamiento o del auto de inspección, más 5 % por mes o fracción de retardo de la inicial, sin pasar del 100 % (art. 644).";
        linea = null;
      }
      return finish({ ctx: ctx, q: "¿Qué sanción de corrección debe liquidar, antes de cualquier reducción?", ops: ops, exp: exp, linea: linea }, r);
    }
  };

  /* 4 · Correcciones sin sanción */
  FAM.sinsancion = {
    nombre: "Correcciones sin sanción", sub: "s-sinsancion", lam: ["f13", "f17", "f18"], twin: true,
    vars: function (r) { return { mode: r.pick(["criterio", "sincambio", "antes"]), st: r.chance(0.5) }; },
    flip: function (v) { return Object.assign({}, v, { st: !v.st }); },
    cambio: function (v) { return v.mode === "criterio" ? "de dónde venía el mayor valor" : v.mode === "sincambio" ? "si la corrección cambiaba el valor a pagar" : "si corrigió antes o después del vencimiento"; },
    build: function (v, lvl, r) {
      var e = r.pick(ENT), d = decl(r, "renta"), ctx, okIdx, why;
      if (v.mode === "criterio") {
        ctx = cap(e.n) + " presentó a tiempo " + d + ". Siete meses después del vencimiento, sin que la DIAN le haya notificado nada, corrige y aumenta el impuesto, porque " +
          (v.st ? "había interpretado una norma de manera distinta a como la entiende la DIAN; los hechos que declaró eran completos y verdaderos" : "había olvidado incluir unos ingresos por arrendamientos") + ".";
        okIdx = v.st ? 0 : 1;
        why = v.st ? "Correcto: es una diferencia de criterio con hechos completos y verdaderos; se corrige siguiendo el procedimiento del art. 589 y explicando las razones, sin sanción (art. 588, inc. 3)." : "Correcto: omitir ingresos no es diferencia de criterio. Corrige después del vencimiento y sin invitación de la DIAN: 10 % (art. 644, num. 1).";
      } else if (v.mode === "sincambio") {
        ctx = cap(e.n) + " presentó a tiempo " + d + ". Cinco meses después del vencimiento, sin que la DIAN le haya notificado nada, presenta una corrección " +
          (v.st ? "que ajusta unos renglones informativos sin cambiar el impuesto a cargo ni el saldo a favor" : "que aumenta el impuesto a cargo en " + millones(r.pick([6, 9, 14]))) + ".";
        okIdx = v.st ? 0 : 1;
        why = v.st ? "Correcto: la corrección cabe aunque no cambie el valor, y en ese caso no se liquida sanción (art. 588, inc. 4)." : "Correcto: hay mayor valor, después del vencimiento y sin invitación de la DIAN: 10 %.";
      } else {
        ctx = cap(e.n) + " presentó " + d + " " + n2w(r.int(8, 14)) + " días antes del vencimiento. " + (v.st ? "Tres días antes de que venciera el plazo" : "Tres semanas después de que venció el plazo") +
          ", sin que la DIAN le haya notificado nada, corrige y aumenta el impuesto.";
        okIdx = v.st ? 0 : 1;
        why = v.st ? "Correcto: el 10 % del art. 644 se cobra cuando se corrige «después del vencimiento del plazo para declarar». Antes, no hay sanción." : "Correcto: corrige después del vencimiento y antes de cualquier acto de la DIAN: 10 %.";
      }
      var ops = [op("Ninguna sanción de corrección.", okIdx === 0, okIdx === 0 ? why : "Aquí sí hay sanción: " + (v.mode === "criterio" ? "omitir un ingreso no es una diferencia de criterio." : v.mode === "sincambio" ? "la corrección aumenta el impuesto." : "se corrigió después del vencimiento.")),
                 op("10 % del mayor valor a pagar.", okIdx === 1, okIdx === 1 ? why : "No hay sanción: " + (v.mode === "criterio" ? "es una diferencia de criterio con hechos completos y verdaderos." : v.mode === "sincambio" ? "la corrección no cambia el valor." : "se corrigió antes del vencimiento.")),
                 op("20 % del mayor valor a pagar.", false, "El 20 % exige un emplazamiento para corregir o un auto de inspección ya notificados, y aquí no hay ninguno.")];
      return finish({ ctx: ctx, q: "¿Qué sanción de corrección debe liquidar, antes de cualquier reducción?", ops: ops,
        exp: "Tres correcciones no llevan sanción: la que nace de una diferencia de criterio con hechos completos y verdaderos, la que no cambia el valor y la que se hace antes del vencimiento. Y la del art. 589.", linea: null }, r);
    }
  };

  /* 5 · El emplazamiento (arts. 685 y 706) */
  FAM.emplaza = {
    nombre: "El emplazamiento", sub: "s-peaje", lam: ["f23", "f34", "f20"], twin: true,
    vars: function (r) { return { st: r.chance(0.5) }; },
    flip: function (v) { return { st: !v.st }; },
    cambio: "si respondió o no la invitación",
    build: function (v, lvl, r) {
      var e = r.pick(ENT), E = P("E", lvl, r), ctx, ops, q;
      if (v.st) {
        ctx = "La DIAN le notificó a " + e.n + " " + E + ", respecto de su declaración de renta del año gravable 2024. Pasa el mes siguiente y " + e.s + " no responde ni corrige.";
        q = "¿Qué consecuencias tiene que no responda?";
        ops = [op("Ninguna sanción; pero el término de la DIAN para notificar el requerimiento especial se suspende durante ese mes.", true, "Correcto: no responder el emplazamiento no ocasiona sanción (art. 685), y el término para notificar el requerimiento se suspende el mes siguiente a su notificación (art. 706)."),
               op("Una sanción por no atender la invitación de la DIAN a corregir.", false, "Trampa clásica: el art. 685 dice que la no respuesta «no ocasiona sanción alguna»."),
               op("Ninguna: si no se responde, el emplazamiento no produce ningún efecto.", false, "Sí produce un efecto: suspende un mes el término de la DIAN para notificar el requerimiento (art. 706).")];
      } else {
        ctx = "La DIAN le notificó a " + e.n + " " + E + ", respecto de su declaración de renta del año gravable 2024. Dentro del mes siguiente, " + e.s + " corrige y aumenta el impuesto.";
        q = "¿Qué sanción de corrección debe liquidar, antes de cualquier reducción?";
        ops = [op("20 % del mayor valor a pagar.", true, "Correcto: corrige después de notificado el emplazamiento y antes del requerimiento (art. 644, num. 2), dentro del mes que le da el art. 685."),
               op("10 % del mayor valor a pagar.", false, "El 10 % es para quien corrige antes de que la DIAN le notifique el emplazamiento."),
               op("Ninguna sanción, porque respondió dentro del mes que le dieron.", false, "Responder a tiempo no borra la sanción: el art. 685 dice que se corrige «liquidando la sanción de corrección respectiva de conformidad con el artículo 644».")];
      }
      return finish({ ctx: ctx, q: q, ops: ops, exp: "El emplazamiento da un mes para corregir con el 20 %. No responderlo no se sanciona, pero congela un mes el reloj de la DIAN.", linea: null }, r);
    }
  };

  /* 6 · ¿Vale o no vale? */
  var VAL = {
    N: "Se tiene por no presentada: el deber de declarar sigue sin cumplirse.",
    I: "No produce efecto legal alguno, sin que la DIAN tenga que declararlo en un acto.",
    V: "Es válida: el error se corrige sin sanción y en cualquier tiempo.",
    E: "Produce efectos legales, como cualquier declaración.",
    T: "Se entiende presentada a tiempo: no hay sanción de extemporaneidad.",
    X: "Es extemporánea: debe liquidar la sanción de extemporaneidad."
  };
  var VALST = {
    firma: { ok: "N", d: ["I", "V"], lam: ["f01"], txt: function (e) { return cap(e.n) + ", obligada a tener revisor fiscal, presentó su declaración de IVA firmada solo por su representante legal: faltó la firma del revisor fiscal."; },
             por: "Falta la firma del revisor fiscal estando obligado: literal d del art. 580." },
    bases: { ok: "N", d: ["V", "I"], lam: ["f01"], txt: function (e) { return cap(e.n) + " presentó su declaración de IVA con los renglones de ingresos y de base gravable en blanco; solo diligenció el total a pagar."; },
             por: "Sin los factores para identificar las bases gravables: literal c del art. 580." },
    papel: { ok: "N", d: ["X", "V"], lam: ["f02"], txt: function (e) { return cap(e.n) + " está obligada por resolución a declarar por medios electrónicos, pero presentó su declaración en un formulario de papel en una oficina bancaria."; },
             por: "Quien debe declarar por medios electrónicos y usa otro medio tiene la declaración por no presentada (art. 579-2)." },
    caida: { ok: "T", d: ["X", "N"], lam: ["f02"], txt: function (e) { return cap(e.n) + " debe declarar en línea. El último día del plazo, los servicios informáticos de la DIAN no estuvieron disponibles; " + e.s + " presentó la declaración el día siguiente a aquel en que se restablecieron."; },
             por: "Si los servicios de la DIAN fallan, no hay sanción de extemporaneidad cuando se presenta a más tardar el día siguiente al restablecimiento (art. 579-2)." },
    retencion: { ok: "I", d: ["N", "E"], lam: ["f04"], txt: function (e) { return cap(e.n) + " presentó a tiempo su declaración de retención en la fuente, pero no pagó nada. Han pasado cinco meses desde el vencimiento, no tiene saldos a favor y lo que debe supera con amplitud 10 UVT."; },
             por: "Retención sin pago total y sin ninguna de las tres salidas: no produce efecto legal alguno, sin necesidad de acto (art. 580-1)." },
    noobligado: { ok: "I", d: ["E", "N"], lam: ["f08"], txt: function () { return "Un estudiante universitario que no estaba obligado a declarar renta, y al que nunca le practicaron retenciones, presentó la declaración «para tener historial ante el banco»."; },
             por: "La declaración de quien no estaba obligado no produce efecto legal alguno (art. 594-2), y aquí no hay retenciones que activen la excepción del art. 6." },
    art6: { ok: "E", d: ["I", "N"], lam: ["f08"], txt: function () { return "Una profesora residente en Colombia, que no estaba obligada a declarar renta, presentó la declaración para recuperar las retenciones en la fuente que le practicaron durante el año."; },
             por: "Excepción del art. 6, parágrafo: la persona natural residente con retenciones, no obligada, puede declarar y esa declaración produce efectos legales." },
    forma: { ok: "V", d: ["N", "I"], lam: ["f09"], txt: function (e) { return cap(e.n) + " presentó y pagó a tiempo su declaración de IVA, pero en el formulario marcó el periodo equivocado: el anterior al que declaraba. El valor declarado y pagado es correcto."; },
             por: "Error en el periodo que no afecta el valor por declarar: se corrige de oficio o a solicitud, sin sanción y en cualquier tiempo (Ley 962, art. 43)." }
  };
  var VALPAIRS = [["art6", "noobligado"], ["forma", "bases"], ["caida", "papel"], ["firma", "forma"], ["retencion", "art6"]];
  FAM.vale = {
    nombre: "¿Vale o no vale?", sub: "s-nopres", lam: ["f01", "f02", "f04", "f08", "f09"], twin: true,
    vars: function (r) { var p = r.pick(VALPAIRS); return { pair: p, st: r.chance(0.5) }; },
    flip: function (v) { return { pair: v.pair, st: !v.st }; },
    cambio: "el defecto de la declaración",
    build: function (v, lvl, r) {
      var k = v.st ? v.pair[0] : v.pair[1], S = VALST[k], e = r.pick(ENT);
      var codes = [S.ok].concat(S.d);
      var ops = codes.map(function (c) { return op(VAL[c], c === S.ok, c === S.ok ? "Correcto. " + S.por : explainVal(c, k)); });
      var c = finish({ ctx: S.txt(e), q: "¿Qué le pasa a esa declaración?", ops: ops, exp: S.por, linea: null }, r);
      c.sub = k === "noobligado" || k === "art6" ? "s-noobligado" : (k === "forma" ? "s-forma" : (k === "retencion" ? "s-retsinpago" : "s-nopres"));
      c.lam = S.lam;
      return c;
    }
  };
  var VALX = {
    "caida:N": "No usó otro medio: declaró en línea, solo que un día después, porque el sistema de la DIAN falló.",
    "caida:X": "La salvedad del art. 579-2 evita la sanción de extemporaneidad si se presenta a más tardar el día siguiente al restablecimiento.",
    "papel:X": "No es un problema de tardanza: usó un medio distinto al obligatorio, y por eso se tiene por no presentada (art. 579-2).",
    "papel:V": "No es un error de forma del art. 43 de la Ley 962: el medio electrónico obligatorio hace parte del deber de declarar.",
    "forma:N": "Equivocarse de periodo sin afectar el valor no es ninguna de las causas del art. 580: se corrige por el art. 43 de la Ley 962.",
    "forma:I": "No hay retención sin pago ni declarante no obligado: el error de periodo no le quita efectos.",
    "bases:V": "Sin los datos de las bases gravables no es un simple error de forma: falta lo esencial (literal c del art. 580).",
    "firma:V": "La firma del revisor fiscal obligatoria no es un error de forma del art. 43: es una causa del art. 580 (literal d).",
    "art6:I": "Esa es la regla general del no obligado (art. 594-2), pero el art. 6 la exceptúa cuando hay retenciones.",
    "noobligado:E": "El art. 6 solo da efectos a la declaración de la persona natural residente a quien le practicaron retenciones.",
    "retencion:E": "Presentarla a tiempo no basta: sin pago total y sin ninguna de las tres salidas, no produce efectos (art. 580-1).",
    "retencion:N": "No es una causa del art. 580: el literal sobre retención sin pago fue derogado y hoy rige el art. 580-1 (ineficacia)."
  };
  function explainVal(code, k) {
    if (VALX[k + ":" + code]) return VALX[k + ":" + code];
    var m = {
      N: "«No presentada» es para las cuatro causas del art. 580 y para el art. 579-2. Este caso es otro.",
      I: "«No produce efecto legal alguno» es la regla de la retención sin pago (art. 580-1) y del no obligado (art. 594-2). Este caso es otro.",
      V: "El art. 43 de la Ley 962 solo cubre errores de forma que no afectan el valor por declarar (concepto, año, periodo).",
      E: "Este caso no tiene una regla que le dé efectos.",
      T: "El día de gracia del art. 579-2 solo existe si fallaron los servicios de la DIAN o hubo fuerza mayor.",
      X: "No hubo extemporaneidad que liquidar en este caso."
    };
    return m[code];
  }

  /* 7 · Cómo se sanea (art. 588, par. 2) */
  FAM.sanea = {
    nombre: "Sanear con el 2 %", sub: "s-nopres", lam: ["f03", "f01"], twin: true,
    vars: function (r) { return { st: r.pick(["d", "dsan", "c"]), alt: r.pick(["dsan", "c"]) }; },
    flip: function (v) { return { st: v.st === "d" ? v.alt : "d", alt: v.alt }; },
    cambio: "el defecto o si ya había sanción notificada",
    build: function (v, lvl, r) {
      var e = r.pick(ENT), ND = P("NODECL", lvl, r);
      var defect = v.st === "c" ? "con los renglones de base gravable en blanco" : r.pick(["sin la firma del contador público, estando obligada a llevarla", "sin la firma del revisor fiscal, estando obligada a tenerlo"]);
      var ctx = cap(e.n) + " presentó su declaración de IVA " + defect + ". " + (v.st === "dsan" ? "Meses después, la DIAN le notificó " + ND + ". " : "La DIAN no le ha notificado ninguna sanción. ") +
        "Ahora quiere arreglar la situación con el menor costo que permita la ley.";
      var ops = [
        op("Puede corregir por el procedimiento del art. 588 y liquidar el 2 % de la sanción de extemporaneidad, sin pasar de 1.300 UVT.", v.st === "d",
           v.st === "d" ? "Correcto: falta de firma (literal d), sin sanción por no declarar notificada: 2 % del art. 641 con tope de 1.300 UVT (art. 588, par. 2)." : (v.st === "dsan" ? "Ese mecanismo exige que no se haya notificado sanción por no declarar." : "El 2 % solo cubre los literales a, b y d del art. 580; aquí faltan las bases gravables (literal c).")),
        op("Ya no puede sanearla por esa vía, porque le notificaron " + ND + ".", v.st === "dsan",
           v.st === "dsan" ? "Correcto: el parágrafo 2 del art. 588 solo opera «siempre y cuando no se haya notificado sanción por no declarar»." : "No se ha notificado ninguna sanción en este caso."),
        op("La corrección del 2 % no le sirve, porque ese mecanismo no cubre la falta de los datos de las bases gravables.", v.st === "c",
           v.st === "c" ? "Correcto: el parágrafo 2 del art. 588 menciona los literales a, b y d; el c (bases gravables) no está." : "El defecto aquí es de firma (literal d), que sí está cubierto.")
      ];
      return finish({ ctx: ctx, q: "¿Qué puede hacer?", ops: ops, exp: "El 2 % (tope 1.300 UVT) sanea lugar, identificación y firma, solo si no hay sanción por no declarar notificada. No cubre las bases gravables.", linea: null }, r);
    }
  };

  /* 8 · Retención sin pago (art. 580-1) */
  FAM.retencion = {
    nombre: "Retención sin pago", sub: "s-retsinpago", lam: ["f04", "f05", "f06", "f07", "f38"], twin: true,
    vars: function (r) {
      var g = r.pick(["saldo", "dosmeses", "pequena"]);
      var fails = { saldo: ["ratio", "tiempo", "antes"], dosmeses: ["tarde", "pago"], pequena: ["monto", "tiempo"] }[g];
      return { g: g, st: r.chance(0.5), fail: r.pick(fails) };
    },
    flip: function (v) { return Object.assign({}, v, { st: !v.st }); },
    cambio: function (v) {
      return ({ ratio: "el tamaño del saldo a favor", tiempo: v.g === "saldo" ? "cuándo pidió la compensación" : "cuándo pagó", antes: "cuándo se generó el saldo a favor",
                tarde: "si presentó antes o después del vencimiento", pago: "cuándo pagó", monto: "cuánto quedó debiendo" })[v.fail];
    },
    build: function (v, lvl, r) {
      var e = r.pick(ENT), d = decl(r, "ret"), ret = r.pick([18, 25, 32, 40, 55]), ctx, okTxt, okPor, failPor;
      var NO = "No produce efecto legal alguno.";
      var ACTO = "Produce efectos solo cuando la DIAN la reconozca mediante un acto administrativo.";
      if (v.g === "saldo") {
        var ratio = (!v.st && v.fail === "ratio") ? r.pick([1.2, 1.5, 1.8]) : r.pick([2.2, 2.5, 3]);
        var saldo = Math.round(ret * ratio);
        var mesSol = (!v.st && v.fail === "tiempo") ? r.int(7, 9) : r.int(2, 5);
        var despues = (!v.st && v.fail === "antes");
        ctx = cap(e.n) + " presentó a tiempo " + d + ", con una retención a cargo de " + millones(ret) + ", sin pagar nada. " +
          (despues ? "Un mes después presentó su declaración de renta, en la que liquidó por primera vez un saldo a favor de " + millones(saldo) + "." : "Desde antes tenía un saldo a favor de " + millones(saldo) + ", liquidado en su declaración de renta del año anterior.") +
          " " + cap(meses(mesSol)) + " después de presentar la declaración de retención, pidió compensar ese saldo con la retención.";
        okTxt = "Produce efectos, porque el saldo a favor alcanza el doble de la retención, es anterior y la compensación se pidió a tiempo.";
        okPor = "Correcto: saldo de al menos dos veces la retención, generado antes de la declaración de retención y compensación pedida dentro de los seis meses (art. 580-1, incs. 2 y 3).";
        failPor = { ratio: "El saldo (" + millones(saldo) + ") no llega a dos veces la retención (" + millones(ret * 2) + ").",
                    tiempo: "La compensación se pidió " + meses(mesSol) + " después: el plazo era de seis meses desde la presentación.",
                    antes: "El saldo a favor nació después de presentar la declaración de retención: la ley exige que se haya generado antes." }[v.fail];
      } else if (v.g === "dosmeses") {
        var tarde = (!v.st && v.fail === "tarde");
        var sem = (!v.st && v.fail === "pago") ? r.int(10, 13) : r.int(3, 7);
        ctx = cap(e.n) + " presentó " + d + " " + (tarde ? "tres días después del vencimiento" : "cinco días antes del vencimiento") + ", con una retención a cargo de " + millones(ret) + ", sin pagar. No tiene saldos a favor. " +
          cap(semanas(sem)) + " después del vencimiento pagó toda la retención con sus intereses de mora.";
        okTxt = "Produce efectos, porque se presentó antes del vencimiento y el pago total se hizo dentro de los dos meses siguientes.";
        okPor = "Correcto: presentada antes del vencimiento y pagada en su totalidad dentro de los dos meses siguientes al vencimiento (art. 580-1, inc. 5).";
        failPor = { tarde: "Esta salida exige que la declaración se haya presentado antes del vencimiento, y se presentó tres días después.",
                    pago: "Pagó " + semanas(sem) + " después del vencimiento: más de dos meses." }[v.fail];
      } else {
        var monto = (!v.st && v.fail === "monto") ? r.pick([780000, 950000, 1200000]) : r.pick([310000, 365000, 410000, 480000]);
        var mp = (!v.st && v.fail === "tiempo") ? r.int(13, 16) : r.int(4, 11);
        ctx = cap(e.n) + " presentó a tiempo " + d + " y pagó casi toda la retención, pero quedó debiendo " + pesos(monto) + ". No tiene saldos a favor. Pagó ese saldo, con sus intereses, " + meses(mp) + " después del vencimiento.";
        okTxt = "Produce efectos, porque lo que quedó debiendo no supera 10 UVT y lo pagó dentro del año siguiente al vencimiento.";
        okPor = "Correcto: 10 UVT de 2026 son 523.740 pesos; debía " + pesos(monto) + " y pagó dentro del año (art. 580-1, par. 3).";
        failPor = { monto: "Debía " + pesos(monto) + ": más de 10 UVT (523.740 pesos en 2026). Y pagó después de los dos meses.",
                    tiempo: "Pagó " + meses(mp) + " después del vencimiento: más de un año." }[v.fail];
      }
      var ops = [op(okTxt, v.st, v.st ? okPor : failPor),
                 op(NO, !v.st, !v.st ? "Correcto. " + failPor + " Sin salida, la declaración no produce efecto legal alguno, sin necesidad de acto (art. 580-1)." : "Sí produce efectos: se cumplen las condiciones de una de las salidas."),
                 op(ACTO, false, "Trampa: la ineficacia y sus salidas operan sin acto administrativo; la DIAN no tiene que reconocer nada.")];
      return finish({ ctx: ctx, q: lvl <= 1 ? "¿La declaración de retención produce efectos?" : "La situación de esa declaración es:", ops: ops,
        exp: "Retención sin pago: no produce efectos, salvo tres salidas. Saldo a favor del doble, anterior, compensación pedida en seis meses; presentada a tiempo y pagada en dos meses; deuda de hasta 10 UVT pagada en un año.", linea: null }, r);
    }
  };

  /* 9 · ¿Desde cuándo corre el reloj? (arts. 589, 705, 714) */
  var DESDE = {
    V: "Desde el vencimiento del plazo para declarar.",
    P: "Desde la fecha en que presentó la declaración.",
    S: "Desde la fecha de la solicitud de devolución o compensación.",
    C: "Desde la fecha de la corrección."
  };
  var DESDEST = {
    tiempo: { ok: "V", d: ["P", "S"], txt: function (e, lvl, r) { return cap(e.n) + " presentó a tiempo su declaración de renta del año gravable 2024, con impuesto a pagar. No tiene saldo a favor."; }, por: "Declaración oportuna sin saldo a favor: tres años desde el vencimiento (art. 714, inc. 1)." },
    tarde: { ok: "P", d: ["V", "S"], txt: function (e, lvl, r) { return cap(e.n) + " presentó su declaración de renta del año gravable 2024 " + meses(r.int(2, 5)) + " después del vencimiento, con impuesto a pagar."; }, por: "Declaración extemporánea: los tres años se cuentan desde su presentación (art. 714, inc. 1)." },
    dev: { ok: "S", d: ["V", "P"], txt: function (e, lvl, r) { return cap(e.n) + " presentó a tiempo su declaración de renta del año gravable 2024, con un saldo a favor. Cuatro meses después " + P("DEV", lvl, r) + "."; }, por: "Saldo a favor con solicitud de devolución o compensación: tres años desde la solicitud (art. 714, inc. 2)." },
    imp: { ok: "V", d: ["S", "P"], txt: function (e, lvl, r) { return cap(e.n) + " presentó a tiempo su declaración de renta del año gravable 2024, con un saldo a favor. No lo pidió en devolución: " + P("IMP", lvl, r) + "."; }, por: "Saldo imputado al periodo siguiente: no hay solicitud, rige la regla general desde el vencimiento (art. 714, inc. 2)." },
    c589: { ok: "C", d: ["V", "P"], q: "¿Desde cuándo se cuenta el término de la DIAN para revisarla?", txt: function (e, lvl, r) { return cap(e.n) + " presentó a tiempo su declaración de renta del año gravable 2024. Diez meses después del vencimiento la corrigió para pagar menos."; }, por: "La corrección que disminuye el valor no impide la revisión, y ese término se cuenta desde la fecha de la corrección (art. 589, inc. 2)." },
    c588: { ok: "V", d: ["C", "P"], q: "¿Desde cuándo se cuenta el término de la DIAN para revisarla?", txt: function (e, lvl, r) { return cap(e.n) + " presentó a tiempo su declaración de renta del año gravable 2024. Diez meses después del vencimiento la corrigió para pagar más, con la sanción del 10 %."; }, por: "La corrección que sube el impuesto no mueve el reloj: sigue corriendo desde el vencimiento (art. 714). Solo la del art. 589 tiene regla propia." }
  };
  var DESDEPAIRS = [["dev", "imp"], ["tiempo", "tarde"], ["c589", "c588"], ["dev", "tarde"]];
  FAM.desde = {
    nombre: "¿Desde cuándo corre el reloj?", sub: "s-reloj", lam: ["f24", "f25", "f26", "f27", "f16", "f28"], twin: true,
    vars: function (r) { return { pair: r.pick(DESDEPAIRS), st: r.chance(0.5) }; },
    flip: function (v) { return { pair: v.pair, st: !v.st }; },
    cambio: "un solo detalle del caso",
    build: function (v, lvl, r) {
      var k = v.st ? v.pair[0] : v.pair[1], S = DESDEST[k], e = r.pick(ENT);
      var codes = [S.ok].concat(S.d);
      var ops = codes.map(function (c) { return op(DESDE[c], c === S.ok, c === S.ok ? "Correcto. " + S.por : desdeWhy(c)); });
      return finish({ ctx: S.txt(e, lvl, r), q: S.q || "¿Desde qué fecha se cuentan los tres años que tiene la DIAN para notificarle el requerimiento especial?", ops: ops, exp: S.por, linea: null }, r);
    }
  };
  function desdeWhy(c) {
    return ({ V: "El vencimiento manda solo si se declaró a tiempo, sin solicitud de devolución y sin corrección a la baja.",
              P: "La presentación manda solo si la declaración fue extemporánea.",
              S: "La solicitud manda solo si hubo saldo a favor y se pidió su devolución o compensación.",
              C: "Solo la corrección que disminuye el valor (art. 589) da un término de revisión desde su fecha." })[c];
  }

  /* 10 · ¿Cuánto dura el reloj? */
  var DUR = { a3: "Tres años.", a5: "Cinco años.", a6: "Seis años.", m6: "Seis meses desde su presentación.", m12: "Doce meses desde su presentación." };
  var DURST = {
    normal: { ok: "a3", d: ["a5", "m12"], txt: function (e) { return cap(e.n) + " presentó a tiempo su declaración de renta del año gravable 2025. Su impuesto neto bajó frente al del año anterior. No liquidó pérdidas y no está en el régimen de precios de transferencia."; }, por: "Ningún régimen especial: regla general de tres años (art. 714)." },
    perdida: { ok: "a5", d: ["a3", "a6"], txt: function (e) { return cap(e.n) + " presentó a tiempo su declaración de renta del año gravable 2025, en la que liquidó una pérdida fiscal que piensa compensar en los años siguientes."; }, por: "Declaración que determina o compensa pérdidas: cinco años (Ley 2010 de 2019, art. 117), aunque el texto del art. 714 hable del término para compensar." },
    pt: { ok: "a5", d: ["a6", "a3"], txt: function (e) { return cap(e.n) + " está sujeta al régimen de precios de transferencia y presentó a tiempo su declaración de renta del año gravable 2025."; }, por: "Precios de transferencia: cinco años (Ley 2010 de 2019, art. 117). Los seis años son el texto del art. 714 que esa ley desplazó." },
    b35: { ok: "m6", d: ["m12", "a3"], txt: function (e, r) { return cap(e.n) + " presentó y pagó a tiempo su declaración de renta del año gravable 2025, con un impuesto neto " + r.int(36, 48) + " % mayor que el del año anterior, que fue de 900 UVT. No tiene beneficios por ubicación geográfica y la DIAN no le ha notificado ningún acto."; }, por: "Aumento de al menos 35 % con todos los requisitos: firmeza a los seis meses desde la presentación (art. 689-3)." },
    b25: { ok: "m12", d: ["m6", "a3"], txt: function (e, r) { return cap(e.n) + " presentó y pagó a tiempo su declaración de renta del año gravable 2025, con un impuesto neto " + r.int(26, 33) + " % mayor que el del año anterior, que fue de 900 UVT. No tiene beneficios por ubicación geográfica y la DIAN no le ha notificado ningún acto."; }, por: "Aumento de al menos 25 % (pero menos de 35 %) con todos los requisitos: firmeza a los doce meses desde la presentación (art. 689-3)." },
    b35pago: { ok: "a3", d: ["m6", "m12"], txt: function (e, r) { return cap(e.n) + " presentó a tiempo su declaración de renta del año gravable 2025, con un impuesto neto " + r.int(36, 48) + " % mayor que el del año anterior, que fue de 900 UVT. Pagó la última cuota cuatro días después del plazo, con intereses. No tiene beneficios por ubicación geográfica."; }, por: "Falta un requisito del beneficio (el pago total en los plazos): vuelve la regla general de tres años." },
    b35base: { ok: "a3", d: ["m6", "m12"], txt: function (e, r) { return cap(e.n) + " presentó y pagó a tiempo su declaración de renta del año gravable 2025, con un impuesto neto " + r.int(36, 48) + " % mayor que el del año anterior, que fue de 40 UVT. No tiene beneficios por ubicación geográfica."; }, por: "El impuesto neto no llega a 71 UVT, ni el del año anterior ni el del año que se declara: no procede el beneficio (art. 689-3, par. 2). Regla general: tres años." },
    b20: { ok: "a3", d: ["m12", "m6"], txt: function (e, r) { return cap(e.n) + " presentó y pagó a tiempo su declaración de renta del año gravable 2025, con un impuesto neto " + r.int(15, 23) + " % mayor que el del año anterior, que fue de 900 UVT."; }, por: "Un aumento menor al 25 % no da beneficio de auditoría: regla general de tres años." }
  };
  var DURPAIRS = [["b35", "b35pago"], ["b25", "b20"], ["pt", "normal"], ["b35", "b35base"], ["perdida", "normal"], ["b35", "b25"]];
  FAM.cuanto = {
    nombre: "¿Cuánto dura el reloj?", sub: "s-beneficio", lam: ["f24", "f30", "f35", "f36", "f37"], twin: true,
    vars: function (r) { return { pair: r.pick(DURPAIRS), st: r.chance(0.5) }; },
    flip: function (v) { return { pair: v.pair, st: !v.st }; },
    cambio: "un solo dato del caso",
    build: function (v, lvl, r) {
      var k = v.st ? v.pair[0] : v.pair[1], S = DURST[k], e = r.pick(ENT);
      var codes = [S.ok].concat(S.d);
      var ops = codes.map(function (c) { return op(DUR[c], c === S.ok, c === S.ok ? "Correcto. " + S.por : durWhy(c, k)); });
      var c = finish({ ctx: S.txt(e, r), q: "¿En cuánto tiempo queda en firme esa declaración?", ops: ops, exp: S.por, linea: null }, r);
      c.sub = (k === "perdida" || k === "pt") ? "s-largos" : (k === "normal" ? "s-reloj" : "s-beneficio");
      return c;
    }
  };
  function durWhy(c, k) {
    return ({ a3: "Tres años es la regla general; aquí hay una regla especial que la desplaza.",
              a5: "Cinco años es solo para pérdidas fiscales y precios de transferencia.",
              a6: "Seis años es el texto del art. 714 para precios de transferencia, desplazado por la Ley 2010 de 2019 (cinco años).",
              m6: "Seis meses exige un aumento de al menos 35 % y todos los requisitos del beneficio.",
              m12: "Doce meses exige un aumento de al menos 25 % y todos los requisitos del beneficio." })[c];
  }

  /* 11 · Las pausas (art. 706) */
  var PAU = { m3: "Tres meses.", m1: "Un mes.", dura: "Lo que duró la inspección.", no: "Nada: ese hecho no suspende el término." };
  var PAUST = {
    oficio: { ok: "m3", d: ["dura", "m1"], txt: function (e) { return "Dentro del término para notificarle el requerimiento especial a " + e.n + ", la DIAN le notificó un auto que decreta una inspección tributaria de oficio."; }, por: "Inspección de oficio: tres meses desde la notificación del auto que la decreta (art. 706)." },
    solicitud: { ok: "dura", d: ["m3", "no"], txt: function (e) { return "Dentro del término para notificarle el requerimiento especial, " + e.n + " pidió que se practicara una inspección tributaria, que duró dos meses y diez días."; }, por: "Inspección pedida por el contribuyente: el término se suspende mientras dure (art. 706)." },
    empl: { ok: "m1", d: ["m3", "no"], txt: function (e, lvl, r) { return "Dentro del término para notificarle el requerimiento especial, la DIAN le notificó a " + e.n + " " + P("E", lvl, r) + ". No lo respondió."; }, por: "Emplazamiento para corregir: se suspende durante el mes siguiente a su notificación (art. 706), aunque no se responda." }
  };
  var PAUPAIRS = [["oficio", "solicitud"], ["empl", "oficio"], ["empl", "solicitud"]];
  FAM.pausa = {
    nombre: "Las pausas del reloj", sub: "s-pausas", lam: ["f32", "f33", "f34"], twin: true,
    vars: function (r) { return { pair: r.pick(PAUPAIRS), st: r.chance(0.5) }; },
    flip: function (v) { return { pair: v.pair, st: !v.st }; },
    cambio: "qué acto se notificó o quién pidió la inspección",
    build: function (v, lvl, r) {
      var k = v.st ? v.pair[0] : v.pair[1], S = PAUST[k], e = r.pick(ENT);
      var codes = [S.ok].concat(S.d);
      var ops = codes.map(function (c) { return op(PAU[c], c === S.ok, c === S.ok ? "Correcto. " + S.por : ({ m3: "Tres meses es solo para la inspección de oficio.", m1: "Un mes es solo para el emplazamiento para corregir.", dura: "«Lo que dure» es solo para la inspección pedida por el contribuyente.", no: "Este hecho sí suspende el término (art. 706)." })[c]); });
      return finish({ ctx: S.txt(e, lvl, r), q: "¿Cuánto se suspende el término para notificar el requerimiento especial?", ops: ops, exp: S.por, linea: null }, r);
    }
  };

  /* ---------- Rondas ---------- */
  var FAM_IDS = Object.keys(FAM);

  function makeCase(famId, vars, lvl, seed) {
    var F = FAM[famId];
    var r = Rng(seed);
    var c = F.build(vars, lvl, r);
    c.fam = famId;
    c.famNombre = F.nombre;
    c.sub = c.sub || F.sub;
    c.lam = c.lam || F.lam;
    c.lvl = lvl;
    c.seed = seed;
    c.vars = vars;
    c.id = famId + ":" + seed + ":" + lvl + ":" + JSON.stringify(vars);
    return c;
  }

  /* pesos: {famId: peso}; devuelve una lista de pares de gemelos (o casos sueltos) */
  function round(opts) {
    var seed = opts.seed >>> 0, n = opts.n || 10, lvlOf = opts.lvl || function () { return 1; };
    var weights = opts.weights || {}, allowed = opts.fams || FAM_IDS, twins = opts.twins !== false;
    var r = Rng(seed);
    var out = [], used = {};
    var guard = 0;
    while (out.length < n && guard++ < 200) {
      var famId = weightedPick(r, allowed, weights, used);
      used[famId] = (used[famId] || 0) + 1;
      var F = FAM[famId];
      var v = F.vars(r);
      var lvl = lvlOf(famId);
      var a = makeCase(famId, v, lvl, (r.int(1, 2147483646)));
      out.push(a);
      if (twins && F.twin && out.length < n) {
        var v2 = F.flip(v);
        var b = makeCase(famId, v2, lvl, (r.int(1, 2147483646)));
        b.twinOf = a.id;
        b.cambio = typeof F.cambio === "function" ? F.cambio(v) : F.cambio;
        out.push(b);
      }
    }
    return out;
  }
  function weightedPick(r, ids, w, used) {
    var tot = 0, arr = ids.map(function (id) { var x = (w[id] == null ? 1 : w[id]) / (1 + 1.5 * (used[id] || 0)); tot += x; return x; });
    var t = r.f() * tot;
    for (var i = 0; i < ids.length; i++) { t -= arr[i]; if (t <= 0) return ids[i]; }
    return ids[ids.length - 1];
  }

  return { Rng: Rng, FAM: FAM, FAM_IDS: FAM_IDS, makeCase: makeCase, round: round, n2w: n2w, cap: cap };
})();

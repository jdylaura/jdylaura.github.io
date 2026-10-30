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

  /* =====================================================================
     Actualización M05 (capítulos 2 a 4) · 30-oct-2026
     Fuente: lección DIAN EXPRÉS M05 «La DIAN por dentro», que leyó en secretariasenado.gov.co y en el
     normograma DIAN el ET (art. 560), el Decreto 1742 de 2020 (arts. 4-8, 12, 55-59, 63, 69-81), la Ley 2010
     de 2019 (art. 131) y la Resolución 000238 de 2025 (UVT 2026 = 52.374 pesos).
     ===================================================================== */
  var UVT26 = 52374;
  function miles(n) { return n.toLocaleString("es-CO"); }
  function fill(t, x) { return typeof t === "function" ? t(x) : String(t).replace(/\{(\w+)\}/g, function (m, k) { return x[k] != null ? x[k] : m; }); }

  /* Familias de tabla: cada situación trae su contexto, su pregunta, la respuesta y sus distractores con el porqué.
     Los gemelos son parejas de situaciones que cambian un solo dato y cambian la respuesta. */
  function tabla(def) {
    var ids = Object.keys(def.st), par = {};
    (def.pares || []).forEach(function (pp) { if (!par[pp[0]]) par[pp[0]] = pp[1]; if (!par[pp[1]]) par[pp[1]] = pp[0]; });
    ids.forEach(function (k, i) { if (!par[k]) par[k] = ids[(i + 1) % ids.length]; });
    return {
      nombre: def.nombre, sub: def.sub, lam: def.lam, twin: true,
      vars: function (r) { return { st: r.pick(ids) }; },
      flip: function (v) { return { st: par[v.st] }; },
      cambio: function (v) { return def.st[v.st].cambio || def.cambio; },
      build: function (v, lvl, r) {
        var s = def.st[v.st], x = def.x ? def.x(r, v.st) : {};
        var dis = r.shuffle(s.no).slice(0, 2);
        var ops = [op(fill(s.ok, x), true, fill(s.por, x))].concat(dis.map(function (d) { return op(fill(d[0], x), false, fill(d[1], x)); }));
        return finish({ ctx: cap(fill((lvl >= 3 && s.ctx3) ? s.ctx3 : s.ctx, x)), q: fill(s.q || def.q, x), ops: ops, exp: fill(s.exp || def.exp || "", x), linea: null }, r);
      }
    };
  }

  var ENT2 = [
    { n: "una comercializadora de insumos agrícolas", s: "la comercializadora" },
    { n: "una sociedad importadora de maquinaria", s: "la importadora" },
    { n: "una empresa de transporte de carga", s: "la empresa" },
    { n: "una distribuidora de medicamentos", s: "la distribuidora" },
    { n: "una sociedad constructora", s: "la constructora" },
    { n: "una cooperativa de caficultores", s: "la cooperativa" },
    { n: "una comercializadora de electrodomésticos", s: "la comercializadora" }
  ];
  /* Seccionales que deciden su propio segundo escalón (Decreto 1742, art. 69, num. 2.17). */
  var PROPIAS = ["Neiva", "Pereira", "Armenia", "Manizales", "Ibagué", "Montería", "Santa Marta", "Villavicencio", "Valledupar", "Popayán", "Sincelejo", "Yopal", "Florencia"];
  /* Seccionales cuyo segundo escalón decide otra (art. 69, num. 2). capT: lo tributario; capA: lo aduanero y cambiario. */
  var SAT = [
    { c: "Sogamoso", dep: "Boyacá", capT: "la Dirección Seccional de Impuestos y Aduanas de Tunja" },
    { c: "Barrancabermeja", dep: "Santander", capT: "la Dirección Seccional de Impuestos y Aduanas de Bucaramanga" },
    { c: "Ipiales", dep: "Nariño", capT: "la Dirección Seccional de Impuestos y Aduanas de Pasto" },
    { c: "Tumaco", dep: "Nariño", capT: "la Dirección Seccional de Impuestos y Aduanas de Pasto" },
    { c: "Maicao", dep: "La Guajira", capT: "la Dirección Seccional de Impuestos y Aduanas de Riohacha" },
    { c: "Girardot", dep: "Cundinamarca", capT: "la Dirección Seccional de Impuestos de Bogotá", capA: "la Dirección Seccional de Aduanas de Bogotá" },
    { c: "Buenaventura", dep: "el Valle del Cauca", capT: "la Dirección Seccional de Impuestos de Cali", capA: "la Dirección Seccional de Aduanas de Cali" },
    { c: "Palmira", dep: "el Valle del Cauca", capT: "la Dirección Seccional de Impuestos de Cali", capA: "la Dirección Seccional de Aduanas de Cali" },
    { c: "Tuluá", dep: "el Valle del Cauca", capT: "la Dirección Seccional de Impuestos de Cali", capA: "la Dirección Seccional de Aduanas de Cali" },
    { c: "Puerto Asís", dep: "el Putumayo", capT: "la Dirección Seccional de Impuestos de Cali", capA: "la Dirección Seccional de Aduanas de Cali", nota: " El Putumayo no tiene seccional en Mocoa: el decreto manda a Puerto Asís a Cali." },
    { c: "Urabá", dep: "Antioquia", capT: "la Dirección Seccional de Impuestos de Medellín", capA: "la Dirección Seccional de Aduanas de Medellín" }
  ];
  function secN(c) { return "la Dirección Seccional de Impuestos y Aduanas de " + c; }
  function capDe(s, m) { return (m === "t" || !s.capA) ? s.capT : s.capA; }
  var ACTO = {
    t: ["una liquidación oficial de revisión de su declaración de renta del año gravable 2024", "una resolución que le impone una sanción por no enviar información"],
    a: ["una resolución que le impone una multa por una infracción aduanera"],
    c: ["una resolución que le impone una multa por no canalizar por el mercado cambiario el pago de dos importaciones"]
  };
  var MATTXT = { t: "tributario", a: "aduanero", c: "cambiario" };
  function opJur(lugar) { return "La división jurídica de " + lugar + "."; }
  var OP_SUB = "La Subdirección de Recursos Jurídicos, del nivel central.";

  /* M05-3 · Los tres escalones por cuantía (ET, art. 560; Decreto 1742, arts. 57 y 69) */
  function montoEscalon(b, lvl, r, liq) {
    var tot;
    if (lvl <= 1) {
      var u = b === 1 ? r.int(3, 19) * 100 : b === 2 ? r.int(25, 190) * 100 : r.int(21, 60) * 1000;
      return { uvt: u, txt: liq ? "con un mayor impuesto y una sanción que suman " + miles(u) + " UVT" : "por " + miles(u) + " UVT", calc: miles(u) + " UVT" };
    }
    if (lvl === 2) tot = (b === 1 ? r.int(40, 100) : b === 2 ? r.int(120, 1000) : r.int(1100, 3000)) * 1000000;
    else if (b === 1) tot = r.int(1000, 1046) * 100000;
    else if (b === 3) tot = r.int(1049, 1150) * 1000000;
    else tot = r.chance(0.5) ? r.int(1049, 1120) * 100000 : r.int(990, 1046) * 1000000;
    var imp = Math.round(tot * 0.55 / 100000) * 100000, san = tot - imp, u2 = Math.floor(tot / UVT26), nota = lvl === 2 ? " (la UVT de 2026 es de 52.374 pesos)" : "";
    if (!liq) return { uvt: u2, txt: "por " + pesos(tot) + nota, calc: pesos(tot) + ", unas " + miles(u2) + " UVT" };
    return { uvt: u2, txt: "con un mayor impuesto de " + pesos(imp) + " y una sanción de " + pesos(san) + nota,
      calc: pesos(imp) + " + " + pesos(san) + " = " + pesos(tot) + ", unas " + miles(u2) + " UVT" };
  }
  function bandaDe(u) { return u < 2000 ? 1 : u < 20000 ? 2 : 3; }
  function opsEscalon(s, m, b, mt) {
    var capS = capDe(s, m), own = secN(s.c);
    var tr = " (" + mt.calc + ")";
    return [
      op(opJur(own), b === 1, b === 1 ? "Correcto: es menos de 2.000 UVT" + tr + ". En el primer escalón decide la división jurídica de la dependencia que profirió el acto (ET, art. 560; Decreto 1742, art. 69)." :
        "La seccional que profirió el acto solo decide en el primer escalón, por debajo de 2.000 UVT" + tr + ". La cuantía suma impuestos y sanciones."),
      op(opJur(capS), b === 2, b === 2 ? "Correcto: está entre 2.000 y menos de 20.000 UVT" + tr + ". Ese segundo escalón lo decide la seccional que el decreto señala para " + s.dep + " (Decreto 1742, art. 69, num. 2)." + (s.nota || "") :
        b === 1 ? "La seccional de la capital decide desde 2.000 UVT, y este acto no llega" + tr + "." : "La seccional de la capital decide solo por debajo de 20.000 UVT" + tr + "."),
      op(OP_SUB, b === 3, b === 3 ? "Correcto: 20.000 UVT o más" + tr + ". El tercer escalón lo decide la Subdirección de Recursos Jurídicos (Decreto 1742, art. 57, nums. 1 y 3)." :
        "La Subdirección decide desde 20.000 UVT, o cuando avoca el conocimiento, y aquí no avocó" + tr + ".")
    ];
  }
  FAM.escalon = {
    nombre: "Quién decide: la cuantía", sub: "s-escalon", lam: ["f52", "f53", "f54"], twin: true,
    vars: function (r) { return { o: r.int(0, SAT.length - 1), b: r.pick([1, 2, 2, 3]), m: r.pick(["t", "t", "a", "c"]) }; },
    flip: function (v) { return { o: v.o, b: v.b === 2 ? (v.o % 2 ? 1 : 3) : 2, m: v.m }; },
    cambio: "la cuantía del acto",
    build: function (v, lvl, r) {
      var s = SAT[v.o], e = r.pick(ENT2), m = v.m, acto = r.pick(ACTO[m]), mt = montoEscalon(v.b, lvl, r, acto.indexOf("una liquidación") === 0);
      var ctx = cap(e.n) + " recibió de " + secN(s.c) + " " + acto + ", " + mt.txt + ". Interpuso el recurso de reconsideración dentro del término. No hay mercancía aprehendida ni garantías de por medio, y nadie ha avocado el conocimiento.";
      return finish({ ctx: ctx, q: "¿Quién debe decidir el recurso?", ops: opsEscalon(s, m, bandaDe(mt.uvt), mt),
        exp: "Primero las excepciones; después la cuantía, que suma impuestos y sanciones: menos de 2.000 UVT, la jurídica de quien profirió; de 2.000 a menos de 20.000, la seccional que el decreto señala; 20.000 o más, la Subdirección de Recursos Jurídicos.", linea: null }, r);
    }
  };

  /* M05-3 · La capital del departamento, con nombres propios (Decreto 1742, art. 69, num. 2) */
  FAM.capital = {
    nombre: "Quién decide: el lugar", sub: "s-capital", lam: ["f55", "f56", "f52"], twin: true,
    vars: function (r) { var o = r.int(0, SAT.length - 1); return { o: o, m: SAT[o].capA ? r.pick(["t", "a", "c"]) : "t", b: 2 }; },
    flip: function (v) { return SAT[v.o].capA ? { o: v.o, m: v.m === "t" ? (v.o % 2 ? "a" : "c") : "t", b: 2 } : { o: v.o, m: v.m, b: v.b === 2 ? 1 : 2 }; },
    cambio: function (v) { return SAT[v.o].capA ? "la materia del acto (tributaria, aduanera o cambiaria)" : "la cuantía del acto"; },
    build: function (v, lvl, r) {
      var s = SAT[v.o], e = r.pick(ENT2), m = v.m;
      var u = v.b === 1 ? r.int(4, 19) * 100 : r.int(25, 190) * 100, mt = { uvt: u, calc: miles(u) + " UVT" };
      var ctx = cap(e.n) + " recibió de " + secN(s.c) + " " + r.pick(ACTO[m]) + ", por " + miles(u) + " UVT. Interpuso el recurso de reconsideración a tiempo.";
      var ops = opsEscalon(s, m, v.b, mt), out;
      if (s.capA && v.b === 2) {
        var otra = m === "t" ? s.capA : s.capT;
        out = [ops[1], op(opJur(otra), false, "Esa seccional decide lo " + (m === "t" ? "aduanero y cambiario" : "tributario") + " de " + s.c + ", y este acto es " + MATTXT[m] + "."), r.chance(0.5) ? ops[0] : ops[2]];
      } else out = ops;
      return finish({ ctx: ctx, q: "¿Quién debe decidir el recurso?", ops: out,
        exp: "Las capitales tienen nombres propios: Tunja (Sogamoso), Bucaramanga (Barrancabermeja), Pasto (Ipiales y Tumaco), Riohacha (Maicao), Cali (Buenaventura, Palmira, Tuluá y Puerto Asís), Medellín (Urabá) y Bogotá (Girardot). Donde hay dos seccionales, la de impuestos decide lo tributario y la de aduanas lo aduanero y cambiario.", linea: null }, r);
    }
  };

  /* M05-3 · Las excepciones que se imponen sobre la cuantía */
  FAM.excrec = tabla({
    nombre: "Quién decide: las excepciones", sub: "s-excrec", lam: ["f57", "f58", "f59", "f60"],
    cambio: "un solo dato del acto o del trámite",
    q: "¿Quién debe decidir el recurso?",
    exp: "Antes de mirar la cuantía, busca la regla especial: mercancía aprehendida, garantía de objeto único, avocación, revocatoria de actos de la propia Subdirección. Y para la cuantía no se acumulan expedientes.",
    x: function (r) {
      var s = SAT[r.int(0, 4)], u3 = r.int(21, 45) * 1000, u2 = r.int(70, 90) * 100;
      return { e: r.pick(ENT2).n, adu: r.pick(["la Dirección Seccional de Aduanas de Cartagena", "la Dirección Seccional de Aduanas de Barranquilla", "la Dirección Seccional de Impuestos y Aduanas de Ipiales", "la Dirección Seccional de Impuestos y Aduanas de Maicao"]),
        merc: r.pick(["un lote de llantas", "un cargamento de textiles", "dos tractocamiones", "un lote de teléfonos celulares"]),
        u3: miles(u3), u2: miles(u2), u2x3: miles(u2 * 3), uc: miles(r.int(6, 18) * 100), sat: secN(s.c), cap: s.capT, prop: secN(r.pick(PROPIAS)) };
    },
    pares: [["decomiso", "multaadu"], ["garantia", "garsan"], ["avoca", "noavoca"], ["revsub", "revsec"], ["acumula", "unico"], ["dogc", "dogc3"]],
    st: {
      decomiso: { cambio: "la clase de acto: decomiso de mercancía aprehendida o multa",
        ctx: "La División de Fiscalización y Liquidación Aduanera de {adu} expidió el acto que decomisó {merc}, aprehendido en un control posterior y avaluado en {u3} UVT. El importador interpuso el recurso dentro del término.",
        ok: "La división jurídica de la seccional que expidió el acto, cualquiera que sea el valor de la mercancía.", por: "Correcto: el acto que define la situación jurídica de mercancía aprehendida lo decide la jurídica de la seccional, sin importar el valor (Decreto 1742, art. 69, par. 3, y art. 74).",
        no: [[OP_SUB.replace(".", ", porque el avalúo supera 20.000 UVT."), "Trampa de la regla general: en la mercancía aprehendida la cuantía no cuenta."],
             ["La seccional de la capital del departamento, por tratarse de un acto aduanero.", "No hay un segundo escalón por materia: la regla especial deja el decomiso en la jurídica de la seccional."],
             ["La Dirección de Gestión de Aduanas, porque el acto versa sobre mercancía y no sobre impuestos.", "Esa competencia no existe: decide la jurídica de la seccional."]] },
      multaadu: { cambio: "la clase de acto: multa o decomiso",
        ctx: "La División de Fiscalización y Liquidación Aduanera de {adu} le impuso a {e} una multa de {u3} UVT por una infracción aduanera. No hubo aprehensión de mercancía. La sociedad interpuso el recurso dentro del término.",
        ok: OP_SUB.replace(".", ", porque la multa es de 20.000 UVT o más."), por: "Correcto: sin mercancía aprehendida vuelve la regla de cuantía, y 20.000 UVT o más es el tercer escalón (Decreto 1742, art. 57).",
        no: [["La división jurídica de la seccional que expidió el acto, cualquiera que sea su valor.", "Eso vale para el decomiso de mercancía aprehendida, y aquí no hubo aprehensión."],
             ["La seccional de la capital del departamento, porque el acto es aduanero.", "La capital decide solo de 2.000 a menos de 20.000 UVT."]] },
      garantia: { cambio: "si el acto, además de hacer efectiva la garantía, impone una sanción",
        ctx: "La DIAN expidió contra {e} una resolución cuyo único objeto es declarar el incumplimiento de una obligación aduanera y ordenar que se haga efectiva la póliza que la respaldaba, por {u3} UVT. La sociedad interpuso el recurso dentro del término.",
        ok: "La división jurídica de la dependencia que expidió el acto, sin importar la cuantía.", por: "Correcto: el acto de objeto único que declara el incumplimiento y ordena hacer efectiva la garantía lo decide la jurídica de quien lo expidió (Decreto 1742, art. 69, par. 4).",
        no: [[OP_SUB.replace(".", ", porque la garantía supera 20.000 UVT."), "La palabra decisiva es «único»: con objeto único, la cuantía no cuenta."],
             ["La seccional de la capital del departamento, porque es un asunto aduanero.", "La regla especial desplaza tanto la cuantía como el lugar."]] },
      garsan: { cambio: "si el acto, además de hacer efectiva la garantía, impone una sanción",
        ctx: "La DIAN expidió contra {e} una resolución que declara el incumplimiento de una obligación aduanera, ordena hacer efectiva la póliza que la respaldaba y, además, le impone una multa. En total, {u3} UVT. La sociedad interpuso el recurso dentro del término.",
        ok: OP_SUB.replace(".", ", porque el acto ya no es de objeto único."), por: "Correcto: al imponer también una sanción, el acto deja de ser de objeto único y vuelve la regla de cuantía: 20.000 UVT o más, tercer escalón.",
        no: [["La división jurídica de la dependencia que expidió el acto, porque versa sobre una garantía.", "Esa excepción exige que el único objeto del acto sea la garantía; este también sanciona."],
             ["La seccional de la capital del departamento, porque es un asunto aduanero.", "La capital decide solo de 2.000 a menos de 20.000 UVT."]] },
      avoca: { cambio: "si la Subdirección de Recursos Jurídicos avocó o no el conocimiento",
        ctx: "{sat} profirió contra {e} una liquidación oficial de revisión por {u2} UVT. Mientras la seccional de la capital proyectaba la decisión del recurso, la Subdirección de Recursos Jurídicos comunicó que avocaba su conocimiento.",
        ctx3: "{sat} profirió contra {e} una liquidación oficial de revisión por {u2} UVT. Cuando el proyecto de fallo de la seccional de la capital estaba listo para la firma, una dependencia del nivel central informó que asumía el conocimiento del recurso.",
        ok: OP_SUB.replace(".", ", porque avocó el conocimiento."), por: "Correcto: la Subdirección puede avocar los recursos de cuantía inferior a 20.000 UVT, y si avocó decide ella, aunque la seccional tuviera listo un proyecto (Decreto 1742, art. 57, num. 7).",
        no: [["La división jurídica de {cap}, porque ya tenía listo el proyecto de fallo.", "El proyecto listo no le quita la competencia a la Subdirección que avocó."],
             ["La división jurídica de {sat}, que profirió el acto.", "Por cuantía tampoco le tocaría: está en el segundo escalón. Y la Subdirección avocó."]] },
      noavoca: { cambio: "si la Subdirección de Recursos Jurídicos avocó o no el conocimiento",
        ctx: "{sat} profirió contra {e} una liquidación oficial de revisión por {u2} UVT. El recurso se interpuso a tiempo y nadie en el nivel central se ha pronunciado sobre él.",
        ok: "La división jurídica de {cap}.", por: "Correcto: segundo escalón, y la Subdirección no avocó. Decide la seccional que el decreto señala para esa capital (Decreto 1742, art. 69, num. 2).",
        no: [[OP_SUB.replace(".", ", porque puede avocar los recursos del segundo escalón."), "Puede avocar, pero no lo hizo: sin avocación decide la seccional de la capital."],
             ["La división jurídica de {sat}, que profirió el acto.", "La seccional que profirió solo decide por debajo de 2.000 UVT."]] },
      revsub: { cambio: "qué dependencia expidió el acto cuya revocatoria se pide",
        ctx: "La Subdirección de Recursos Jurídicos resolvió un recurso de reconsideración y confirmó una sanción de {uc} UVT. Meses después, el contribuyente pide la revocatoria directa de esa resolución.",
        ok: "La propia Subdirección de Recursos Jurídicos, independientemente de la cuantía.", por: "Correcto: las revocatorias contra actos proferidos por la Subdirección de Recursos Jurídicos las resuelve ella, «independientemente de su cuantía» (Decreto 1742, art. 57, num. 5).",
        no: [["La división jurídica de la seccional que impuso la sanción, porque es menos de 2.000 UVT.", "La regla de cuantía cede: el acto es de la Subdirección, y ella resuelve su revocatoria."],
             ["La Dirección de Gestión Jurídica, como superior de la Subdirección.", "La norma no la manda al superior: la resuelve la misma Subdirección."]] },
      revsec: { cambio: "qué dependencia expidió el acto cuya revocatoria se pide",
        ctx: "{prop} le impuso a {e} una sanción de {uc} UVT, que quedó en firme sin que se interpusiera recurso. Meses después, la sociedad pide su revocatoria directa.",
        ok: "La división jurídica de esa misma seccional.", por: "Correcto: a la revocatoria directa se le aplican las mismas reglas de cuantía que a los recursos (Decreto 1742, art. 69, par. 2). Menos de 2.000 UVT: decide la jurídica de quien profirió el acto.",
        no: [["La división jurídica de la seccional de la capital del departamento, por tratarse de una revocatoria.", "Las reglas de cuantía son las mismas que en el recurso: por debajo de 2.000 UVT no sube a la capital."],
             [OP_SUB, "La Subdirección resuelve sin importar la cuantía solo las revocatorias de sus propios actos."]] },
      acumula: { cambio: "si son tres actos o uno solo",
        ctx: "{sat} le notificó a {e} tres resoluciones sanción, cada una por {u2} UVT. La sociedad las impugnó todas en un solo escrito, presentado a tiempo.",
        ok: "La división jurídica de {cap}, porque cada acto conserva su propia cuantía.", por: "Correcto: para fijar la cuantía «no hay lugar a la acumulación de expedientes» (Decreto 1742, art. 57, par.). Tres actos en el segundo escalón siguen en el segundo escalón.",
        no: [[OP_SUB.replace(".", ", porque las tres sanciones suman más de 20.000 UVT."), "Trampa de la suma: los expedientes no se acumulan para fijar la cuantía."],
             ["La división jurídica de {sat}, ante la cual se presentó el escrito.", "El lugar de radicación no fija la competencia, y cada acto está en el segundo escalón."]] },
      unico: { cambio: "si son tres actos o uno solo",
        ctx: "{sat} le notificó a {e} una sola resolución sanción, por {u2x3} UVT. La sociedad la impugnó a tiempo.",
        ok: OP_SUB.replace(".", ", porque el acto es de 20.000 UVT o más."), por: "Correcto: un solo acto de 20.000 UVT o más está en el tercer escalón.",
        no: [["La división jurídica de {cap}, seccional de la capital del departamento.", "La capital decide solo por debajo de 20.000 UVT."],
             ["La división jurídica de {sat}, que profirió el acto.", "La seccional que profirió decide solo por debajo de 2.000 UVT."]] },
      dogc: { cambio: "la cuantía del acto",
        ctx: "La Dirección Operativa de Grandes Contribuyentes profirió una liquidación oficial de revisión contra {e}, gran contribuyente con domicilio en Bogotá, por {u2} UVT. La sociedad interpuso el recurso a tiempo.",
        ok: "La división jurídica de la misma Dirección Operativa de Grandes Contribuyentes.", por: "Correcto: en el segundo escalón, la Dirección Operativa de Grandes Contribuyentes decide sus propios recursos, como las seccionales que el decreto enumera (art. 69, num. 2).",
        no: [["La división jurídica de la Dirección Seccional de Impuestos de Bogotá, por el domicilio.", "El gran contribuyente no depende de la seccional de su domicilio, ni en la gestión ni en los recursos."],
             [OP_SUB.replace(".", ", porque el acto es del nivel central."), "La Subdirección decide desde 20.000 UVT; la cuantía, no el nivel del acto, define el escalón."]] },
      dogc3: { cambio: "la cuantía del acto",
        ctx: "La Dirección Operativa de Grandes Contribuyentes profirió una liquidación oficial de revisión contra {e}, gran contribuyente con domicilio en Bogotá, por {u3} UVT. La sociedad interpuso el recurso a tiempo.",
        ok: OP_SUB.replace(".", ", porque el acto es de 20.000 UVT o más."), por: "Correcto: tercer escalón. La Dirección Operativa decide sus propios recursos solo por debajo de 20.000 UVT.",
        no: [["La división jurídica de la misma Dirección Operativa de Grandes Contribuyentes.", "Eso es hasta menos de 20.000 UVT; este acto llega al tercer escalón."],
             ["La división jurídica de la Dirección Seccional de Impuestos de Bogotá, por el domicilio.", "Ni el domicilio ni la capital deciden los actos de grandes contribuyentes de esta cuantía."]] }
    }
  });
  /* M05-3 · El Comité Técnico (ET, art. 560, par. 1) se entrena dentro de excrec y de los casos de simulacro. */

  /* M05-2 · Los tres niveles y las piezas que se prestan para trampa (Decreto 1742, arts. 4-7, 12, 63 y 77) */
  FAM.nivel = tabla({
    nombre: "¿En qué nivel está?", sub: "s-niveles", lam: ["f40", "f41", "f42", "f43", "f44"],
    cambio: "un solo dato del caso",
    exp: "Tres trampas del nivel central: Tributación Internacional está en el despacho del director general; Grandes Contribuyentes administra sin importar la ubicación; el Comité Institucional Estratégico propone el plan, no lo aprueba.",
    x: function (r) { return { c: r.pick(PROPIAS), e: r.pick(ENT2).n }; },
    pares: [["gc", "nogc"], ["plan", "pol"], ["ti", "gc"], ["delegada", "reclas"]],
    st: {
      ti: { q: "¿Qué debe hacer la seccional?",
        ctx: "La Dirección Seccional de Impuestos y Aduanas de {c} recibe de una administración tributaria extranjera, con base en un convenio, una solicitud de información sobre un contribuyente de su jurisdicción.",
        ctx3: "A la seccional de {c} llega una petición de la administración de impuestos de otro país, que invoca un acuerdo entre los dos Estados y pide datos de una sociedad domiciliada en esa ciudad.",
        ok: "Canalizarla hacia la Oficina de Tributación Internacional, autoridad competente para ese intercambio.", por: "Correcto: la Oficina de Tributación Internacional, en el despacho del director general, es la autoridad competente para el intercambio internacional de información (Decreto 1742, art. 12).",
        no: [["Responderla directamente, porque el contribuyente está en su jurisdicción.", "La seccional no responde por su cuenta a otra administración: se canaliza a la autoridad competente."],
             ["Remitirla a la Dirección de Gestión de Fiscalización, de la que depende esa oficina.", "Trampa de ubicación: la oficina está en el despacho del director general, no en Fiscalización."]] },
      gc: { q: "¿Qué dependencia administra sus impuestos?", cambio: "si la sociedad está calificada o no como gran contribuyente",
        ctx: "{e}, calificada como gran contribuyente, tiene su domicilio principal en {c}.",
        ok: "La Dirección Operativa de Grandes Contribuyentes, sin consideración de su ubicación.", por: "Correcto: esa dirección del nivel central administra los impuestos de los grandes contribuyentes «sin consideración de su ubicación geográfica» (Decreto 1742, art. 63).",
        no: [["La Dirección Seccional de Impuestos y Aduanas de {c}, por el domicilio.", "El domicilio no manda para el gran contribuyente."],
             ["La Dirección Seccional de Impuestos de Bogotá, que atiende a los grandes del país.", "Esa competencia no existe: es una dirección del nivel central."]] },
      nogc: { q: "¿Qué dependencia administra sus impuestos?", cambio: "si la sociedad está calificada o no como gran contribuyente",
        ctx: "{e}, con domicilio principal en {c}, fue excluida por resolución de la calificación de gran contribuyente que tenía.",
        ok: "La Dirección Seccional de Impuestos y Aduanas de {c}, por su domicilio.", por: "Correcto: excluida de la calificación, sale de la Dirección Operativa de Grandes Contribuyentes y queda en la seccional de su jurisdicción.",
        no: [["La Dirección Operativa de Grandes Contribuyentes, que conserva a quien calificó.", "La calificación se puede excluir, y con ella sale de esa dirección."],
             ["La Dirección de Gestión de Impuestos, del nivel central.", "Las direcciones de gestión no administran contribuyentes uno por uno."]] },
      plan: { q: "¿Qué falta para que quede aprobado?", cambio: "si se trata del plan estratégico o de una política de gestión",
        ctx: "El Comité Institucional Estratégico estudió el borrador del Plan Estratégico de la DIAN y lo votó por unanimidad.",
        ok: "La aprobación del director general: el comité solo lo propone.", por: "Correcto: el comité propone el plan al director general «para su aprobación» y le hace seguimiento (Decreto 1742, art. 77).",
        no: [["Nada: el comité, como órgano estratégico, aprueba el plan.", "El comité es solo asesor frente al plan estratégico."],
             ["La firma del ministro de Hacienda, superior de la entidad.", "La norma no exige al ministro: aprueba el director general."]] },
      pol: { q: "¿Qué falta para que quede aprobada?", cambio: "si se trata del plan estratégico o de una política de gestión",
        ctx: "El Comité Institucional Estratégico estudió la política de seguridad de la información de la DIAN y la aprobó por unanimidad.",
        ok: "Nada: el comité aprueba esa política de gestión.", por: "Correcto: el comité aprueba ciertas políticas de gestión, como la de seguridad de la información, la archivística y la de talento humano (Decreto 1742, art. 77).",
        no: [["La aprobación del director general, como ocurre con el plan.", "Eso es para el Plan Estratégico; esta política la aprueba el comité."],
             ["El visto bueno de la Oficina de Seguridad de la Información.", "Su jefe integra el comité, pero no aprueba aparte."]] },
      delegada: { q: "¿Cómo se crea?", cambio: "si se crea una delegada o se reclasifica una seccional",
        ctx: "Un municipio fronterizo sin seccional tiene un movimiento creciente de comercio exterior, y la DIAN quiere tener allí una dependencia permanente.",
        ok: "Por resolución del director general, previa disponibilidad presupuestal, como seccional delegada.", por: "Correcto: el nivel delegado no está fijo en el decreto; el director general lo autoriza por resolución, con su jurisdicción y grupos (Decreto 1742, art. 7).",
        no: [["Solo por decreto, porque el nivel delegado está fijado en el Decreto 1742.", "Al revés: el decreto deja el nivel delegado a resolución del director general."],
             ["Por resolución del director seccional más cercano, superior del nivel delegado.", "El director seccional es superior de la delegada, pero no la crea."]] },
      reclas: { q: "¿Quién puede cambiarle el tipo?", cambio: "si se crea una delegada o se reclasifica una seccional",
        ctx: "La Dirección Seccional de Impuestos y Aduanas de {c}, de tipo III, creció en recaudo y comercio exterior, y se estudia pasarla a tipo II.",
        ok: "El director general, con acto motivado, previa disponibilidad presupuestal y con un análisis técnico.", por: "Correcto: el director general puede reclasificar las seccionales con acto motivado, previa disponibilidad presupuestal y con base en variables organizacionales, económicas, de recaudo y de comercio exterior (Decreto 1742, art. 6).",
        no: [["Solo el Gobierno, modificando el decreto de estructura.", "El decreto le da esa facultad al director general."],
             ["El propio director seccional, al demostrar el aumento del recaudo.", "El director seccional no se reclasifica a sí mismo."]] }
    }
  });

  /* M05-2 · Quién firma, cómo se delega, quién responde y quién practica pruebas (Decreto 1742, arts. 78-81; ET, art. 560) */
  FAM.delega = tabla({
    nombre: "Firmar y delegar", sub: "s-delega", lam: ["f45", "f46", "f47", "f48"],
    cambio: "un solo requisito",
    q: "¿Qué debe concluirse?",
    exp: "Antes de juzgar una delegación, identifica el cargo de quien delega: director general (en directores de gestión o en quien designe), nivel directivo (en su dependencia y con autorización previa del director general) o jefe de división (con resolución del director seccional).",
    x: function (r) { return { c: r.pick(PROPIAS), e: r.pick(ENT2).n }; },
    pares: [["dsecsin", "dseccon"], ["jdivsin", "jdivres"], ["perito", "visita"], ["juez", "juezab"], ["dg", "dsecsin"]],
    st: {
      dsecsin: { cambio: "si hubo autorización previa del director general",
        ctx: "El director de la Dirección Seccional de Impuestos y Aduanas de {c} firma una resolución que traslada a la jefe de la División de Recaudo y Cobranzas una función que el decreto le asigna a él. No pide autorización al nivel central.",
        ok: "La delegación no es válida: faltó la autorización previa del director general.", por: "Correcto: las funciones del nivel directivo solo se delegan en empleados de la respectiva dependencia y con autorización previa del director general (Decreto 1742, art. 80, inc. 2). Sin ella, la delegataria no tiene competencia.",
        no: [["La delegación es válida: la jefe de división pertenece a la misma seccional.", "Cumple uno de los dos requisitos; le falta la autorización previa del director general."],
             ["La delegación es válida con la sola aprobación del superior del delegante.", "Esa aprobación es la regla del ET para el nivel ejecutivo; el director seccional es nivel directivo."]] },
      dseccon: { cambio: "si hubo autorización previa del director general",
        ctx: "El director de la Dirección Seccional de Impuestos y Aduanas de {c}, con autorización previa del director general, firma una resolución que delega en la jefe de la División de Recaudo y Cobranzas una función que el decreto le asigna a él.",
        ok: "La delegación es válida: se hizo en una empleada de la dependencia y con la autorización previa.", por: "Correcto: cumple los dos requisitos del art. 80, inc. 2, del Decreto 1742 de 2020.",
        no: [["La delegación no es válida: las funciones del director seccional son indelegables.", "No lo son: se delegan con los requisitos del art. 80."],
             ["La delegación no es válida: solo podía delegar en un director de gestión.", "Esa es la regla para las funciones del director general."]] },
      jdivsin: { cambio: "el instrumento con el que se delega",
        ctx: "El jefe de la División de Fiscalización y Liquidación Tributaria de la seccional de {c} delega, mediante un memorando firmado por él mismo, una de sus funciones en un profesional de su división.",
        ok: "La delegación no es válida: debía hacerse mediante resolución del director seccional.", por: "Correcto: las funciones de los jefes de división se delegan en empleados de esas divisiones «mediante resolución de quien ejerza la jefatura de la Dirección Seccional» (Decreto 1742, art. 80, inc. 3).",
        no: [["La delegación es válida, porque el delegatario es de la misma división.", "Le falta el instrumento: la resolución del director seccional."],
             ["Solo sería válida con autorización previa del director general.", "Esa autorización es la regla del nivel directivo, no la de los jefes de división."]] },
      jdivres: { cambio: "el instrumento con el que se delega",
        ctx: "Mediante resolución del director de la seccional de {c}, el jefe de la División de Fiscalización y Liquidación Tributaria delega una de sus funciones en un profesional de su división.",
        ok: "La delegación es válida: se hizo en un empleado de la división y con resolución del director seccional.", por: "Correcto: es exactamente lo que exige el art. 80, inc. 3, del Decreto 1742 de 2020.",
        no: [["No es válida: faltó la autorización previa del director general.", "Esa autorización se exige para delegar funciones del nivel directivo."],
             ["No es válida: los jefes de división no pueden delegar sus funciones.", "Sí pueden, en empleados de su división y con resolución del director seccional."]] },
      dg: { cambio: "quién delega",
        ctx: "El director general de la DIAN expide una resolución con la que delega una de sus funciones en el director de gestión de impuestos.",
        ok: "La delegación es válida: el director general puede delegar en cualquiera de los directores de gestión.", por: "Correcto: las funciones del director general pueden delegarse en los directores de gestión o en el empleado que él designe por resolución (Decreto 1742, art. 80, inc. 1).",
        no: [["Solo sería válida con la aprobación del Comité Institucional Estratégico.", "El comité es asesor; no aprueba delegaciones."],
             ["No es válida: el director general solo puede delegar en los directores seccionales.", "La norma dice lo contrario: delega en directores de gestión o en quien designe."]] },
      perito: { cambio: "la clase de prueba que se practica",
        ctx: "Para verificar la contabilidad de {e}, la división comisiona a un abogado de planta, sin título de contador, para practicar una inspección contable.",
        ok: "La comisión es irregular: la inspección contable exige un contador público matriculado.", por: "Correcto: cualquier empleado puede cumplir comisiones para practicar pruebas, salvo las inspecciones contables y la prueba pericial contable, que exigen contador público (Decreto 1742, art. 79).",
        no: [["La comisión es válida: cualquier empleado puede practicar pruebas.", "Regla general donde rige la especial: en lo contable, contador público."],
             ["La comisión es válida si el acta la firma también el contador de la empresa.", "La firma del contador de la empresa no suple la calidad del funcionario."]] },
      visita: { cambio: "la clase de prueba que se practica",
        ctx: "Para verificar que {e} funciona en la dirección que informó en el RUT, la división comisiona a un abogado de planta para practicar una visita.",
        ok: "La comisión es válida: cualquier empleado puede cumplir comisiones para investigar y practicar pruebas.", por: "Correcto: es la regla general del art. 79 del Decreto 1742; la exigencia de contador público se limita a las pruebas contables.",
        no: [["Es irregular: toda prueba de la DIAN debe practicarla un contador público.", "El contador se exige solo en la inspección contable y en la prueba pericial contable."],
             ["Es irregular: solo el jefe de la división puede practicar pruebas.", "El art. 78 dice quién firma los actos, no quién practica pruebas."]] },
      juez: { cambio: "si el empleado es abogado",
        ctx: "Para representar a la DIAN en una audiencia ante un juez, la seccional de {c} designa a un contador público de planta, sin título de abogado, y le otorga poder especial.",
        ok: "No puede actuar: ante los jueces el empleado debe ser abogado matriculado y tener poder.", por: "Correcto: para actuar ante los jueces se exigen las dos cosas: ser abogado matriculado y tener poder especial o general (Decreto 1742, art. 79).",
        no: [["Puede actuar, porque tiene poder especial otorgado en debida forma.", "El poder es uno de los dos requisitos; le falta ser abogado."],
             ["Puede actuar, porque cualquier empleado cumple las comisiones que le asignan.", "Esa regla es para investigar y practicar pruebas, no para actuar ante jueces."]] },
      juezab: { cambio: "si el empleado es abogado",
        ctx: "Para representar a la DIAN en una audiencia ante un juez, la seccional de {c} designa a una abogada matriculada de planta y le otorga poder especial.",
        ok: "Puede actuar: es abogada matriculada y tiene poder.", por: "Correcto: cumple los dos requisitos del art. 79 del Decreto 1742 de 2020.",
        no: [["No puede: además debe ser contadora pública, porque el asunto es tributario.", "El contador se exige para las pruebas contables, no para actuar ante jueces."],
             ["No puede: solo representa a la DIAN el director general en persona.", "La DIAN actúa por medio de empleados abogados con poder."]] },
      grupo: { q: "¿Quién responde por esas funciones?", cambio: "quién delega",
        ctx: "Un grupo interno de trabajo de la seccional de {c}, al que se le delegaron funciones de devoluciones, aprobó una devolución improcedente.",
        ok: "El jefe del grupo, sin perjuicio del jefe de la dependencia por la orientación y el control.", por: "Correcto: respecto de las funciones delegadas al grupo, responde su jefe, «sin perjuicio» de la responsabilidad del jefe de la dependencia (Decreto 1742, art. 81). Es compartida, con contenidos distintos.",
        no: [["Solo el jefe de la dependencia, porque el grupo no tiene funciones propias.", "La norma pone la responsabilidad primero en el jefe del grupo."],
             ["Solo el director general, porque él creó el grupo.", "Crear el grupo no lo hace responsable de lo que el grupo hace."]] }
    }
  });

  /* M05-2 · Conflictos de competencia (Decreto 1742, arts. 8, num. 27, y 70, num. 11; CPACA, art. 39) */
  FAM.conflicto = tabla({
    nombre: "¿Quién destraba?", sub: "s-conflicto", lam: ["f49", "f50"],
    q: "¿Quién debe dirimir el conflicto?",
    cambio: "de qué nivel o de qué entidad son las dos partes",
    exp: "Primero: ¿el conflicto es dentro de la DIAN o con otra entidad? Dentro: ¿las dos partes son de la misma seccional (director seccional) o una es del nivel central y la otra del local (director general)?",
    x: function (r) { return { c: r.pick(PROPIAS), sup: r.pick(["una superintendencia", "un ministerio", "un departamento administrativo del orden nacional"]) }; },
    pares: [["cenloc", "locloc"], ["locloc", "ext"], ["ext", "cenloc"]],
    st: {
      cenloc: { ctx: "Una subdirección del nivel central y la División de Fiscalización y Liquidación Tributaria de la seccional de {c} sostienen, cada una, que una investigación le corresponde a la otra.",
        ctx3: "Un expediente lleva un mes quieto porque una dependencia de Bogotá, del nivel central, y una división de la seccional de {c} se lo devuelven una a otra.",
        ok: "El director general de la DIAN.", por: "Correcto: el director general dirime los conflictos entre las direcciones del nivel central y las del nivel local (Decreto 1742, art. 8, num. 27).",
        no: [["La Sala de Consulta y Servicio Civil del Consejo de Estado.", "Esa es la puerta del CPACA para conflictos entre autoridades distintas, y aquí el conflicto es dentro de la DIAN."],
             ["El director de la seccional de {c}, porque una de las partes es suya.", "Solo dirime los conflictos entre dependencias de su propia seccional."]] },
      locloc: { ctx: "La División Jurídica y la División de Fiscalización y Liquidación Tributaria de la seccional de {c} se declaran, cada una, incompetentes para tramitar un escrito.",
        ok: "El director de la seccional de {c}.", por: "Correcto: el director seccional dirime los conflictos de competencia entre las dependencias de su seccional (Decreto 1742, art. 70, num. 11).",
        no: [["El director general, que dirime todo conflicto entre dependencias de la DIAN.", "Él dirime los que surgen entre el nivel central y el local."],
             ["La Sala de Consulta y Servicio Civil del Consejo de Estado.", "Las dos son de la misma entidad: no es la puerta del CPACA."]] },
      ext: { ctx: "La Dirección Seccional de Impuestos y Aduanas de {c} y {sup} se declaran, cada una, incompetentes para resolver una misma petición.",
        ok: "La Sala de Consulta y Servicio Civil del Consejo de Estado.", por: "Correcto: entre autoridades del orden nacional distintas, decide la Sala de Consulta y Servicio Civil (CPACA, art. 39).",
        no: [["El director general de la DIAN, porque una de las partes es una seccional suya.", "El director general no es superior de la otra entidad."],
             ["El director de la seccional de {c}, que recibió primero la petición.", "Recibir primero no da competencia para decidir el conflicto."]] }
    }
  });

  /* M05-4 · Doctrina: general, obligatoria para los funcionarios y su reconsideración (Decreto 1742, arts. 55 y 56; Ley 2010, art. 131) */
  FAM.doctrina = tabla({
    nombre: "La voz oficial", sub: "s-doctrina", lam: ["f61", "f62", "f63", "f64", "f65"],
    cambio: "un solo dato del caso",
    exp: "La doctrina es general, obliga a los empleados si está publicada y se discute pidiendo su reconsideración a la Dirección de Gestión Jurídica. La asesoría no obliga a quien la pidió, y el contribuyente puede sustentarse en todas las fuentes del derecho.",
    x: function (r) { return { e: r.pick(ENT2).n, c: r.pick(PROPIAS) }; },
    pares: [["concreta", "general"], ["pub", "nopub"], ["asesoria", "conceptodir"], ["contrib", "pub"]],
    st: {
      concreta: { q: "¿Cómo debe responder la Subdirección de Normativa y Doctrina?", cambio: "si la consulta es general o describe un caso concreto",
        ctx: "{e} envía a la Subdirección de Normativa y Doctrina una consulta en la que describe, con facturas y fechas, una operación suya, y pide que le confirme si debía practicar retención.",
        ok: "Explicando en abstracto cómo se interpretan las normas, sin calificar el caso concreto.", por: "Correcto: la doctrina «será de carácter general y no se referirá a asuntos particulares» (Decreto 1742, art. 56).",
        no: [["Calificando la operación descrita, porque el consultante aportó los soportes.", "Los soportes no cambian la regla: la doctrina no califica asuntos particulares."],
             ["Remitiendo la consulta a la seccional del domicilio para que la califique.", "Ninguna dependencia está llamada a calificar el caso por esa vía."]] },
      general: { q: "¿Cómo debe responder la Subdirección de Normativa y Doctrina?", cambio: "si la consulta es general o describe un caso concreto",
        ctx: "{e} envía a la Subdirección de Normativa y Doctrina una consulta general sobre cómo se interpreta una norma de retención, sin referirse a una operación suya.",
        ok: "Absolviéndola con doctrina general, que una vez publicada obliga a los empleados de la DIAN.", por: "Correcto: la Subdirección absuelve las consultas «presentadas de manera general», y sus conceptos publicados son interpretación oficial obligatoria para los empleados (Decreto 1742, art. 56 y par.).",
        no: [["Absolviéndola con un concepto que obliga al consultante.", "El concepto obliga a los empleados de la DIAN, no al contribuyente."],
             ["Remitiéndola a la Dirección de Gestión Jurídica, única que puede emitir conceptos.", "La Subdirección es la autoridad doctrinaria nacional y absuelve las consultas."]] },
      pub: { q: "¿Qué debe hacer?", cambio: "si el concepto fue publicado en la página web",
        ctx: "Un gestor de la seccional de {c} proyecta una liquidación oficial y encuentra un concepto de la Subdirección de Normativa y Doctrina, publicado en la página web de la DIAN, que considera contrario al Estatuto.",
        ok: "Aplicarlo y, si lo cree equivocado, promover su reconsideración ante la Dirección de Gestión Jurídica.", por: "Correcto: el concepto publicado es interpretación oficial obligatoria para los empleados (Decreto 1742, art. 56, par.), y su reconsideración la absuelve la Dirección de Gestión Jurídica (art. 55, num. 20).",
        no: [["Apartarse del concepto y explicar en el acto por qué no lo comparte.", "No compartirlo no lo libera: el concepto publicado lo obliga."],
             ["Pedir la reconsideración a la misma Subdirección y aplicarlo solo si ella lo ratifica.", "La reconsideración va a la Dirección de Gestión Jurídica, y mientras tanto el concepto obliga."]] },
      nopub: { q: "¿Lo obliga como interpretación oficial?", cambio: "si el concepto fue publicado en la página web",
        ctx: "Un gestor de la seccional de {c} encuentra en un archivo un oficio de la Subdirección de Normativa y Doctrina que nunca fue publicado en la página web de la DIAN.",
        ok: "No: la obligatoriedad de los conceptos exige que estén publicados en la página web.", por: "Correcto: el decreto condiciona la obligatoriedad a que los conceptos estén publicados en la página web de la entidad (arts. 55 y 56, pars.).",
        no: [["Sí: todo pronunciamiento de esa Subdirección obliga a los empleados.", "Le falta un requisito: la publicación en la página web."],
             ["Sí, hasta que la Dirección de Gestión Jurídica lo revoque.", "Sin publicación no nace la obligatoriedad que habría que revocar."]] },
      asesoria: { q: "¿Está obligado a seguirla?", cambio: "si es una asesoría pedida por él o un concepto publicado",
        ctx: "El director de gestión de fiscalización pidió a la Subdirección de Normativa y Doctrina una asesoría jurídica sobre un proyecto de instrucción. La respuesta recomienda un camino que él no comparte.",
        ok: "No: la asesoría jurídica a los directores no es vinculante para quien la pidió.", por: "Correcto: la asesoría a los directores del nivel central «no será vinculante para el solicitante» (Decreto 1742, arts. 55 y 56, nums. 5 y 2).",
        no: [["Sí: todo pronunciamiento de la autoridad doctrinaria obliga a los empleados.", "Lo que obliga es el concepto publicado, no la asesoría."],
             ["Sí, salvo que la Dirección de Gestión Jurídica la reconsidere.", "La asesoría no obliga desde el principio: no hay nada que reconsiderar."]] },
      conceptodir: { q: "¿Está obligado a seguirlo?", cambio: "si es una asesoría pedida por él o un concepto publicado",
        ctx: "El director de gestión de fiscalización encuentra un concepto general de la Subdirección de Normativa y Doctrina, publicado en la página web, sobre un punto que él interpreta distinto.",
        ok: "Sí: el concepto publicado es interpretación oficial obligatoria para los empleados.", por: "Correcto: los conceptos publicados obligan a los empleados públicos de la DIAN, también a los directores (Decreto 1742, art. 56, par.).",
        no: [["No: los conceptos solo obligan a los funcionarios de las seccionales.", "La norma habla de los empleados de la DIAN, sin distinguir niveles."],
             ["No: un director del nivel central puede apartarse de él si lo motiva.", "Puede promover su reconsideración, no apartarse de él."]] },
      contrib: { q: "¿Puede la DIAN rechazar el argumento por esa sola razón?", cambio: "si quien invoca la fuente es el contribuyente o el funcionario",
        ctx: "Al responder un requerimiento especial, {e} sustenta su posición en una sentencia de unificación del Consejo de Estado, contraria a un concepto publicado. El funcionario propone rechazar el argumento porque «solo vale la ley o la doctrina oficial».",
        ok: "No: el contribuyente puede sustentarse en la ley, entendida como todas las fuentes del derecho.", por: "Correcto: los contribuyentes pueden sustentar sus actuaciones «con base en la ley» (Ley 2010 de 2019, art. 131), y la Corte condicionó la palabra: comprende todas las fuentes del derecho (C-514 de 2019).",
        no: [["Sí: frente a la DIAN solo valen la ley formal y los conceptos publicados.", "La Corte condicionó «ley»: comprende todas las fuentes que admite el ordenamiento."],
             ["Sí, porque los conceptos publicados también obligan a los contribuyentes.", "Obligan a los empleados de la DIAN, no a los contribuyentes."]] }
    }
  });

  /* M05-4 · Quién defiende a la DIAN (Decreto 1742, arts. 58 y 59) */
  FAM.repres = tabla({
    nombre: "Quién defiende a la DIAN", sub: "s-repres", lam: ["f66", "f67", "f48"],
    cambio: "la clase de proceso",
    exp: "Lo penal es de la Subdirección de Asuntos Penales (denuncias, reparación integral, preacuerdos). Lo demás no asignado a otra dependencia, las conciliaciones y el buzón de notificaciones judiciales son de la Subdirección de Representación Externa.",
    x: function (r) { return { c: r.pick(PROPIAS) }; },
    pares: [["penal", "concil"], ["buzon", "denuncia"]],
    st: {
      penal: { q: "¿Qué dependencia lleva ese preacuerdo al Comité de Conciliación y Defensa Judicial?",
        ctx: "Un funcionario de la seccional de {c} detectó y denunció un contrabando en el que la DIAN puede ser víctima. En el proceso penal, la defensa ofrece un preacuerdo.",
        ok: "La Subdirección de Asuntos Penales, que representa a la DIAN en ese proceso.", por: "Correcto: la Subdirección de Asuntos Penales representa a la DIAN en los procesos penales y lleva al comité los preacuerdos, los principios de oportunidad y las ofertas conciliatorias de esos procesos (Decreto 1742, art. 59).",
        no: [["La Subdirección de Representación Externa, que gestiona los asuntos del comité.", "Regla vecina: Representación Externa no lleva los procesos penales."],
             ["La División de Fiscalización de la seccional que detectó la conducta.", "Detectar la conducta no da la representación en el proceso penal."]] },
      concil: { q: "¿Qué dependencia representa a la DIAN en esa conciliación?",
        ctx: "En un proceso judicial que no está asignado a otra dependencia, el demandante propone conciliar.",
        ok: "La Subdirección de Representación Externa, que gestiona ese asunto ante el comité.", por: "Correcto: representa a la DIAN en los procesos no asignados a otra dependencia y en conciliaciones, y gestiona los asuntos del Comité de Conciliación y Defensa Judicial (Decreto 1742, art. 58).",
        no: [["La Subdirección de Asuntos Penales, que lleva al comité las ofertas conciliatorias.", "Lo hace solo en los procesos penales."],
             ["La Subdirección de Normativa y Doctrina, que fija la posición oficial.", "Fija doctrina; no representa a la entidad en procesos."]] },
      buzon: { q: "¿A cargo de quién está el buzón al que debe llegar?",
        ctx: "Un juzgado va a notificar a la DIAN la admisión de una demanda.",
        ok: "La Subdirección de Representación Externa, que administra el buzón de notificaciones judiciales.", por: "Correcto: administra el buzón de correo creado exclusivamente para las notificaciones judiciales (Decreto 1742, art. 58).",
        no: [["El director de la seccional de {c}, que notifica por medio electrónico.", "El director seccional notifica sus propios actos; no recibe notificaciones judiciales."],
             ["La Subdirección de Asuntos Penales, que recibe lo que llega de los jueces.", "Solo actúa en procesos penales."]] },
      denuncia: { q: "¿Qué dependencia formula la denuncia y promueve la reparación integral?",
        ctx: "La DIAN quiere denunciar penalmente una defraudación de la que es víctima y pedir, en su momento, la reparación del daño.",
        ok: "La Subdirección de Asuntos Penales.", por: "Correcto: formula denuncias y promueve el incidente de reparación integral (Decreto 1742, art. 59).",
        no: [["La Subdirección de Representación Externa, que administra el buzón judicial.", "Regla vecina: su campo son los procesos no penales y las conciliaciones."],
             ["La Oficina de Control Interno, porque la conducta afecta a la entidad.", "Control Interno no representa a la DIAN ante los jueces."]] }
    }
  });


  /* =====================================================================
     Actualización M07 «Ruta tributaria 2» · 30-oct-2026
     Fuente: lección DIAN EXPRÉS M07, que leyó en secretariasenado.gov.co el ET (arts. 638, 641-643, 691, 697-699,
     701-703, 705-711, 713-717, 720, 722, 723, 726, 730-738-1) con sus notas, la C-1441 de 2000 y el CPACA.
     Las claves no dependen de los puntos que la lección marcó como inferencia (quién decide hoy la revocatoria,
     la notificación del fallo dentro del año, la causal derogada, el art. 728).
     ===================================================================== */
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  function fD(d) { return d.getUTCDate() + " de " + MESES[d.getUTCMonth()] + " de " + d.getUTCFullYear(); }
  function addM(d, m) { return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + m, d.getUTCDate())); }
  function addDd(d, n) { return new Date(d.getTime() + n * 86400000); }
  function dia28(d) { var x = d; while (x.getUTCDate() > 28) x = addDd(x, -1); return x; }
  /* Fechas de vencimiento en martes, miércoles o jueves, lejos de festivos fijos y de Semana Santa:
     así la clave no depende de si el último día fue hábil. */
  function habil(d) {
    var w = d.getUTCDay(), m = d.getUTCMonth(), dd = d.getUTCDate();
    if (w < 2 || w > 4) return false;
    if (["0-1", "0-2", "4-1", "6-20", "7-7", "11-8", "11-25", "11-24", "11-31"].indexOf(m + "-" + dd) >= 0) return false;
    if ((m === 2 && dd >= 18) || (m === 3 && dd <= 25)) return false;
    return true;
  }
  function fechaR(r, y0, y1) { return new Date(Date.UTC(r.int(y0, y1), r.int(0, 11), r.int(2, 28))); }
  function fechaOk(r, y0, y1, prueba) { for (var i = 0; i < 80; i++) { var d = fechaR(r, y0, y1); if (prueba(d)) return d; } return fechaR(r, y0, y1); }
  function mill(n) { return miles(n) + " millones de pesos"; }

  /* M07-1 · Corrección aritmética (arts. 697-699 y 701) */
  FAM.aritm = tabla({
    nombre: "Solo cuentas", sub: "s-aritm", lam: ["f69", "f70", "f71"],
    exp: "Error aritmético: resultado mal anotado, tarifa mal aplicada u operación mal hecha, siempre con un menor valor a pagar o un mayor saldo a favor. La DIAN lo corrige en dos años desde la presentación, sin requerimiento especial y sin gastar la revisión.",
    x: function (r) { var e = r.pick(ENT2); return { e: e.n, s: e.s, n: r.int(2, 9) }; },
    pares: [["dentro", "fuera"], ["perjudica", "tarifa"], ["sancion", "acepta"]],
    st: {
      dentro: { cambio: "cuánto tiempo pasó desde la presentación", q: "¿Puede la DIAN corregirlo con una liquidación oficial de corrección aritmética?",
        ctx: "{e} presentó su declaración de renta. Al sumar los costos que ella misma detalló, anotó un total mayor, y el impuesto quedó más bajo. La DIAN lo detecta un año y {n} meses después de la presentación.",
        ok: "Sí: está dentro de los dos años siguientes a la presentación.", por: "Correcto: es una operación aritmética con resultado equivocado que produce un menor valor a pagar (art. 697), y la DIAN tiene dos años desde la presentación (art. 699).",
        no: [["No: primero debe notificarle un requerimiento especial.", "La corrección aritmética no exige requerimiento especial: es una cuenta mal hecha."],
             ["No: los dos años de la corrección aritmética ya pasaron.", "Pasó un año y unos meses: todavía está dentro de los dos años."]] },
      fuera: { cambio: "cuánto tiempo pasó desde la presentación", q: "¿Puede la DIAN corregirlo con una liquidación oficial de corrección aritmética?",
        ctx: "{e} presentó a tiempo su declaración de renta. Al sumar los costos que ella misma detalló, anotó un total mayor, y el impuesto quedó más bajo. La DIAN lo detecta dos años y {n} meses después de la presentación.",
        ok: "No: los dos años para esa liquidación se cuentan desde la presentación, y ya pasaron.", por: "Correcto: la liquidación oficial de corrección aritmética se profiere dentro de los dos años siguientes a la presentación de la declaración (art. 699).",
        no: [["Sí: tiene tres años desde el vencimiento del plazo para declarar.", "Mezcla el plazo del requerimiento especial con el de la corrección aritmética."],
             ["Sí: un error de cuentas puede corregirse en cualquier tiempo.", "«En cualquier tiempo» es la corrección de errores de forma que no afectan el valor; la DIAN tiene dos años para este."]] },
      perjudica: { cambio: "si el error baja o sube el impuesto", q: "¿Procede una liquidación oficial de corrección aritmética?",
        ctx: "Al aplicar la tarifa, {e} se equivocó y anotó un impuesto mayor del que le resultaba.",
        ok: "No: el error aritmético debe producir un menor valor a pagar o un mayor saldo a favor.", por: "Correcto: los tres casos del art. 697 exigen ese efecto. Un error de cuentas que perjudica al contribuyente no entra aquí.",
        no: [["Sí: toda tarifa mal aplicada es un error aritmético.", "Le falta el efecto: debe producir un menor valor a pagar o un mayor saldo a favor."],
             ["Sí, y la DIAN debe devolverle de oficio la diferencia.", "Esa consecuencia no está en las normas de la corrección aritmética."]] },
      tarifa: { cambio: "si el error baja o sube el impuesto", q: "¿Procede una liquidación oficial de corrección aritmética?",
        ctx: "Al aplicar la tarifa, {e} se equivocó y anotó un impuesto menor del que le resultaba.",
        ok: "Sí: aplicar mal la tarifa con un menor valor a pagar es un error aritmético.", por: "Correcto: es el segundo caso del art. 697, y produce un menor valor a pagar.",
        no: [["No: solo es error aritmético una suma mal hecha.", "El art. 697 tiene tres casos: resultado mal anotado, tarifa mal aplicada y operación mal hecha."],
             ["No: exige requerimiento especial y liquidación oficial de revisión.", "Eso es para los problemas de fondo, no para una cuenta mal hecha."]] },
      sancion: { cambio: "si aceptó, renunció al recurso y pagó dentro del plazo",
        q: "¿Cómo liquida la DIAN esa sanción?",
        ctx: "{e} declaró tarde y no liquidó en su declaración la sanción por extemporaneidad que le correspondía.",
        ok: "Incrementada en un 30 %.", por: "Correcto: si el contribuyente no liquidó las sanciones o las liquidó mal, la DIAN las liquida incrementadas en un 30 % (art. 701).",
        no: [["Por el mismo valor, sin incremento alguno.", "El art. 701 incrementa en un 30 % la sanción no liquidada o mal liquidada."],
             ["Al doble, como la extemporaneidad después del emplazamiento.", "Mezcla con el art. 642; el incremento del art. 701 es del 30 %."]] },
      acepta: { cambio: "si aceptó, renunció al recurso y pagó dentro del plazo",
        q: "¿Qué incremento paga sobre la sanción?",
        ctx: "{e} no liquidó la sanción por extemporaneidad, y la DIAN se la liquidó con el incremento. Dentro del plazo para recurrir, {s} acepta los hechos, renuncia al recurso y paga.",
        ok: "La mitad del incremento: un 15 % sobre la sanción.", por: "Correcto: el incremento del 30 % se reduce a la mitad si, dentro del plazo para recurrir, acepta los hechos, renuncia al recurso y paga (art. 701).",
        no: [["El 30 % completo: aceptar no reduce el incremento.", "El art. 701 lo reduce a la mitad con esas tres condiciones."],
             ["Ninguno: al aceptar, el incremento desaparece.", "Se reduce a la mitad; no desaparece."]] }
    }
  });

  /* M07-1 · Las tres rutas y quién firma (arts. 691 par., 697-703, 715-717) */
  FAM.rutas = tabla({
    nombre: "Tres maneras de liquidar", sub: "s-rutas", lam: ["f68", "f72", "f70"],
    q: "¿Qué camino tiene la DIAN?",
    exp: "Cuenta mal hecha: corrección aritmética. Problema de fondo: requerimiento especial y liquidación oficial de revisión. No declaró: emplazamiento previo, sanción por no declarar y liquidación oficial de aforo.",
    x: function (r) { return { e: r.pick(ENT2).n, c: r.pick(PROPIAS) }; },
    pares: [["arit", "fondo"], ["fondo", "nodecl"], ["despues", "arit"], ["firma", "fondo"]],
    st: {
      arit: { cambio: "si el problema es de cuentas o de fondo",
        ctx: "En la declaración de renta de {e}, el total de costos no coincide con la suma de los costos que ella misma detalló, y el impuesto quedó más bajo.",
        ok: "Una liquidación oficial de corrección aritmética, sin requerimiento especial.", por: "Correcto: es un error aritmético (art. 697) que se corrige con liquidación oficial de corrección aritmética (art. 698).",
        no: [["Un requerimiento especial y luego una liquidación oficial de revisión.", "Esa es la ruta de los problemas de fondo, no de una suma mal hecha."],
             ["Una liquidación oficial de aforo, porque la declaración no vale.", "El aforo es para quien no declaró."]] },
      fondo: { cambio: "si el problema es de cuentas o de fondo",
        ctx: "La DIAN encuentra que {e} incluyó en su declaración de renta compras respaldadas por facturas de operaciones que, a su juicio, nunca existieron.",
        ok: "Un requerimiento especial y, después, una liquidación oficial de revisión.", por: "Correcto: es un problema de fondo. La declaración se modifica una sola vez, con liquidación oficial de revisión, y antes debe ir el requerimiento especial (arts. 702 y 703).",
        no: [["Una liquidación oficial de corrección aritmética, porque cambia el valor a pagar.", "Las operaciones inexistentes no son un error de cuentas."],
             ["Un emplazamiento previo por no declarar.", "Ese emplazamiento es para quien no declaró."]] },
      nodecl: { cambio: "si la sociedad declaró o no",
        ctx: "{e} estaba obligada a declarar renta y no presentó la declaración.",
        ok: "Emplazamiento previo por no declarar, sanción por no declarar y, después, liquidación oficial de aforo.", por: "Correcto: es la ruta de quien no declara (arts. 715, 716 y 717).",
        no: [["Requerimiento especial y liquidación oficial de revisión.", "Esa ruta modifica una declaración que existe."],
             ["Liquidación oficial de corrección aritmética de la última declaración.", "No hay declaración que corregir para ese periodo."]] },
      despues: { cambio: "qué acto había expedido antes la DIAN", q: "¿Puede todavía modificar la declaración en el fondo?",
        ctx: "La DIAN ya le profirió a {e} una liquidación oficial de corrección aritmética. Meses después encuentra ingresos que no se declararon.",
        ok: "Sí: la corrección aritmética no le gasta la facultad de revisión.", por: "Correcto: la liquidación oficial de corrección aritmética «se entiende sin perjuicio de la facultad de revisión» (art. 699).",
        no: [["No: la declaración solo se modifica una vez, y ya se modificó.", "La única oportunidad es la de la liquidación oficial de revisión; la corrección aritmética no la gasta."],
             ["Solo si la sociedad acepta los nuevos hechos.", "La facultad de revisión no depende de que el contribuyente acepte."]] },
      firma: { q: "¿Quién la profiere hoy?",
        ctx: "En la seccional de {c}, un funcionario de fiscalización y uno de liquidación discuten quién debe firmar la liquidación oficial de revisión que cierra una investigación.",
        ok: "El jefe de la unidad de fiscalización, por el parágrafo del art. 691.", por: "Correcto: el parágrafo que el Decreto Ley 2106 de 2019 agregó al art. 691 asignó esos actos al jefe de la unidad de fiscalización. La misma dependencia propone y decide.",
        no: [["El jefe de la unidad de liquidación, como dice el texto del art. 691.", "Es leer el artículo sin su parágrafo."],
             ["El jefe de la división jurídica, que decide los recursos.", "La jurídica decide los recursos; no profiere la liquidación."]] }
    }
  });

  /* M07-2 · Responder y ampliar el requerimiento especial (arts. 707, 708 y 730, num. 2) */
  FAM.respuesta = tabla({
    nombre: "Responder y ampliar", sub: "s-respuesta", lam: ["f73", "f74", "f76"],
    exp: "Tres meses para responder el requerimiento especial, desde su notificación. La ampliación, una sola vez, dentro de los tres meses siguientes al vencimiento de ese plazo, puede traer hechos nuevos y da entre tres y seis meses para responder.",
    x: function (r) {
      var D = fechaOk(r, 2025, 2026, function (d) { return habil(addM(d, 3)) && habil(addM(d, 6)) && habil(addM(d, 1)); });
      var R = addM(D, 3), resp = dia28(addDd(R, -r.int(5, 25)));
      return { e: r.pick(ENT2).n, D: fD(D), D1: fD(addM(D, 1)), D3: fD(R), D6: fD(addM(D, 6)), resp: fD(resp), resp3: fD(addM(resp, 3)) };
    },
    pares: [["resp", "ampdesde"], ["ampnuevo", "ampdos"], ["antes", "despues"], ["ampplazo", "resp"]],
    st: {
      resp: { q: "¿Hasta cuándo puede responderlo?", cambio: "qué plazo se pregunta",
        ctx: "El {D}, la DIAN le notificó a {e} un requerimiento especial sobre su declaración de renta.",
        ok: "Hasta el {D3}: tres meses desde la notificación.", por: "Correcto: el requerimiento especial se responde por escrito dentro de los tres meses siguientes a su notificación (art. 707).",
        no: [["Hasta el {D1}: un mes desde la notificación.", "Un mes es el del emplazamiento; el requerimiento especial da tres meses."],
             ["Hasta el {D6}: seis meses desde la notificación.", "Seis meses es el término de la DIAN para la liquidación de revisión."]] },
      ampdesde: { q: "¿Hasta cuándo puede la DIAN ampliar el requerimiento especial?", cambio: "qué plazo se pregunta",
        ctx: "El {D}, la DIAN le notificó a {e} un requerimiento especial. La sociedad lo respondió el {resp}, antes de que venciera el plazo.",
        ctx3: "El {D}, la DIAN le notificó a {e} el acto que le propone modificar su declaración. La sociedad presentó sus objeciones el {resp}, sin agotar el término que tenía.",
        ok: "Hasta el {D6}: tres meses desde el vencimiento del plazo para responder.", por: "Correcto: el plazo para responder vencía el {D3}, y la ampliación cabe dentro de los tres meses siguientes a ese vencimiento (art. 708). Responder antes no lo cambia.",
        no: [["Hasta el {resp3}: tres meses desde la fecha en que respondió.", "Se cuenta desde que venció el plazo para responder, no desde la respuesta."],
             ["Hasta el {D3}: tres meses desde la notificación del requerimiento.", "Ese es el plazo para responder; la ampliación corre desde su vencimiento."]] },
      ampplazo: { q: "¿Cuánto tiempo tiene para responder la ampliación?",
        ctx: "La DIAN amplió a tiempo el requerimiento especial de {e} y agregó un hecho nuevo.",
        ok: "El que fije la DIAN en la ampliación: no menos de tres meses ni más de seis.", por: "Correcto: es el art. 708.",
        no: [["Tres meses exactos, como el requerimiento especial.", "La ley da un rango: entre tres y seis meses, según lo fije la DIAN."],
             ["Un mes, como el emplazamiento para corregir.", "Un mes es el del emplazamiento; la ampliación da entre tres y seis."]] },
      ampnuevo: { q: "¿Puede la ampliación traer un hecho que el requerimiento especial no mencionaba?", cambio: "si es la primera ampliación o una segunda",
        ctx: "Mientras estudia la respuesta de {e}, la DIAN encuentra unos gastos que el requerimiento especial no cuestionó. Todavía no ha ampliado el requerimiento y está dentro del plazo para hacerlo.",
        ok: "Sí: la ampliación puede incluir hechos y conceptos nuevos y proponer una nueva determinación.", por: "Correcto: el art. 708 lo permite expresamente, una sola vez.",
        no: [["No: la ampliación solo puede precisar los hechos ya propuestos.", "El art. 708 permite hechos y conceptos que el requerimiento no contemplaba."],
             ["Sí, pero solo si la sociedad lo pidió en su respuesta.", "La ampliación es una facultad de la DIAN; no depende de una solicitud."]] },
      ampdos: { q: "¿Puede ampliarlo otra vez?", cambio: "si es la primera ampliación o una segunda",
        ctx: "La DIAN ya amplió una vez el requerimiento especial de {e}. Ahora encuentra otro hecho y quiere ampliarlo de nuevo, todavía dentro de los tres meses.",
        ok: "No: la ampliación procede una sola vez.", por: "Correcto: el art. 708 permite ampliar el requerimiento especial «por una sola vez».",
        no: [["Sí, mientras esté dentro de los tres meses.", "El tiempo no es el problema: ya usó su única ampliación."],
             ["Sí, si le da a la sociedad seis meses para responder.", "El plazo de respuesta no habilita una segunda ampliación."]] },
      antes: { q: "¿Qué vicio tiene la liquidación?", cambio: "si la DIAN esperó o no el plazo para responder",
        ctx: "La DIAN le notificó a {e} la liquidación oficial de revisión cuando todavía no habían vencido los tres meses para responder el requerimiento especial.",
        ok: "Es nula: se pretermitió el término para responder el requerimiento especial.", por: "Correcto: es causal de nulidad omitir el requerimiento especial o pretermitir el término para responderlo (art. 730, num. 2).",
        no: [["Ninguno: la DIAN puede decidir apenas tenga las pruebas.", "Debe esperar el término: pretermitirlo es causal de nulidad."],
             ["Es nula solo si la sociedad había pedido pruebas.", "La causal no depende de que haya pedido pruebas."]] },
      despues: { q: "¿Tiene la liquidación ese vicio?", cambio: "si la DIAN esperó o no el plazo para responder",
        ctx: "La DIAN le notificó a {e} la liquidación oficial de revisión un mes después de que vencieron los tres meses para responder el requerimiento especial. No hubo ampliación.",
        ok: "No: respetó el término para responder, y está dentro de los seis meses.", por: "Correcto: esperó el vencimiento del plazo para responder (art. 707) y notificó dentro de los seis meses siguientes (art. 710).",
        no: [["Sí: debía notificarla dentro del mes siguiente a la respuesta.", "Esa regla no existe: tiene seis meses desde el vencimiento del plazo para responder."],
             ["Sí: la liquidación debía notificarse junto con el requerimiento.", "Al revés: primero el requerimiento, después la liquidación."]] }
    }
  });

  /* M07-2 · La corrección provocada: la cuarta parte (art. 709) y la mitad (art. 713) */
  FAM.cuarta = tabla({
    nombre: "La cuarta parte", sub: "s-cuarta", lam: ["f75", "f81"],
    q: "Sobre los hechos aceptados, la DIAN había propuesto una sanción por inexactitud de {sp}. ¿Cuánta sanción corresponde?",
    exp: "Al responder el requerimiento especial o su ampliación: la cuarta parte. Dentro del término para recurrir la liquidación de revisión: la mitad. Y en los dos casos, solo si corrige, adjunta la corrección y paga o firma acuerdo de pago.",
    x: function (r) { var sp = r.int(1, 8) * 40; return { e: r.pick(ENT2).n, sp: mill(sp), c4: mill(sp / 4), c2: mill(sp / 2) }; },
    pares: [["completo", "sinpago"], ["completo", "lor"], ["acuerdo", "sincorr"], ["ampl", "lor"]],
    st: {
      completo: { cambio: "un solo requisito o el momento de la aceptación",
        ctx: "Al responder el requerimiento especial, {e} aceptó parte de los hechos, corrigió su declaración con los mayores valores aceptados y la sanción reducida, adjuntó copia de la corrección y la prueba del pago.",
        ok: "La cuarta parte: {c4}.", por: "Correcto: es la corrección provocada del art. 709, con sus cuatro requisitos cumplidos.",
        no: [["La mitad: {c2}.", "La mitad es para quien acepta después de la liquidación de revisión (art. 713)."],
             ["La propuesta completa: {sp}.", "Cumplió los cuatro requisitos: tiene la reducción."]] },
      sinpago: { cambio: "un solo requisito",
        ctx: "Al responder el requerimiento especial, {e} aceptó parte de los hechos, corrigió su declaración y adjuntó la corrección, pero no pagó ni firmó acuerdo de pago.",
        ok: "La propuesta completa: {sp}.", por: "Correcto: la reducción exige probar el pago o el acuerdo de pago de impuestos y sanciones (art. 709). Sin eso, no hay rebaja.",
        no: [["La cuarta parte: {c4}.", "Le faltó un requisito: el pago o el acuerdo de pago."],
             ["La mitad: {c2}.", "Ni la cuarta parte ni la mitad: sin pago o acuerdo no hay reducción."]] },
      acuerdo: { cambio: "un solo requisito",
        ctx: "Al responder el requerimiento especial, {e} aceptó parte de los hechos, corrigió su declaración con la sanción reducida, adjuntó la corrección y, en lugar de pagar, adjuntó un acuerdo de pago firmado con la DIAN.",
        ok: "La cuarta parte: {c4}.", por: "Correcto: el art. 709 acepta la prueba del pago o del acuerdo de pago.",
        no: [["La propuesta completa: {sp}.", "El acuerdo de pago sustituye el pago para este efecto."],
             ["La mitad: {c2}.", "La mitad corresponde a la aceptación posterior a la liquidación de revisión."]] },
      sincorr: { cambio: "un solo requisito",
        ctx: "Al responder el requerimiento especial, {e} aceptó parte de los hechos y pagó el mayor impuesto y la sanción reducida, pero no corrigió su declaración.",
        ok: "La propuesta completa: {sp}.", por: "Correcto: la corrección de la declaración privada es uno de los cuatro requisitos del art. 709.",
        no: [["La cuarta parte: {c4}.", "Pagar no basta: faltó corregir la declaración y adjuntar la corrección."],
             ["La mitad: {c2}.", "Sin corrección no hay reducción alguna."]] },
      ampl: { cambio: "el momento de la aceptación",
        ctx: "Al responder la ampliación del requerimiento especial, {e} aceptó el hecho nuevo, corrigió su declaración con la sanción reducida, adjuntó la corrección y pagó.",
        ok: "La cuarta parte: {c4}.", por: "Correcto: el art. 709 incluye la respuesta a la ampliación del requerimiento especial.",
        no: [["La mitad: {c2}.", "La mitad es para la aceptación después de la liquidación de revisión."],
             ["La propuesta completa: {sp}.", "La reducción también opera al responder la ampliación."]] },
      lor: { cambio: "el momento de la aceptación",
        ctx: "{e} no aceptó nada al responder el requerimiento especial. Dentro del término para recurrir la liquidación oficial de revisión, aceptó parte de los hechos, corrigió, presentó el memorial con la corrección y pagó.",
        ok: "La mitad: {c2}.", por: "Correcto: aceptar dentro del término para recurrir la liquidación de revisión reduce la sanción a la mitad de la inicialmente propuesta (art. 713).",
        no: [["La cuarta parte: {c4}.", "La cuarta parte era al responder el requerimiento especial o su ampliación."],
             ["La propuesta completa: {sp}.", "Cumplió los requisitos del art. 713 a tiempo: tiene la mitad."]] }
    }
  });

  /* M07-3 · Seis meses para la liquidación oficial de revisión, y lo que los mueve (arts. 707, 708 y 710) */
  FAM.lor = {
    nombre: "¿Hasta cuándo la liquidación?", sub: "s-seismeses", lam: ["f77", "f78", "f74"], twin: true,
    vars: function (r) { return { amp: r.chance(0.45), sus: r.pick(["no", "no", "prueba", "insp"]) }; },
    flip: function (v) { return v.sus !== "no" ? { amp: v.amp, sus: "no" } : { amp: !v.amp, sus: v.sus }; },
    cambio: function (v) { return v.sus !== "no" ? "si hubo o no un hecho que suspende el término" : "si hubo o no ampliación del requerimiento especial"; },
    build: function (v, lvl, r) {
      var e = r.pick(ENT2), D, R, A, mA, S, L, resp, i;
      for (i = 0; i < 80; i++) {
        D = fechaR(r, 2025, 2025); R = addM(D, 3);
        if (v.amp) { A = dia28(addDd(R, r.int(15, 70))); mA = r.int(3, 6); S = addM(A, mA); } else S = R;
        L = addM(S, 6 + (v.sus === "prueba" ? 2 : v.sus === "insp" ? 3 : 0));
        if (habil(L)) break;
      }
      resp = dia28(addDd(R, -r.int(6, 25)));
      var ctx = cap(e.n) + " recibió el " + fD(D) + " la notificación de un requerimiento especial sobre su declaración de renta del año gravable 2022. Lo respondió por escrito el " + fD(resp) + ".";
      if (v.amp) ctx += " El " + fD(A) + ", la DIAN le notificó una ampliación del requerimiento especial y le dio " + n2w(mA) + " meses para responderla; la respondió dentro de ese plazo.";
      if (v.sus === "prueba") ctx += " En su respuesta pidió que la DIAN obtuviera unos documentos que reposan en " + r.pick(["la Cámara de Comercio", "un banco", "una notaría"]) + ", no en el expediente.";
      if (v.sus === "insp") ctx += " Dentro del término para proferir la liquidación, la DIAN le notificó un auto que ordenó de oficio una inspección tributaria.";
      ctx += " No hubo otros hechos que suspendieran términos.";
      var susTxt = v.sus === "prueba" ? " más dos meses por la prueba en documentos que no reposan en el expediente" : v.sus === "insp" ? " más tres meses por la inspección tributaria de oficio" : "";
      var base = v.amp ? "el vencimiento del plazo para responder la ampliación (" + fD(S) + ")" : "el vencimiento del plazo para responder el requerimiento especial (" + fD(R) + ")";
      var ok = op("Hasta el " + fD(L) + ".", true, "Correcto: seis meses desde " + base + susTxt + " (art. 710).");
      var cands = [];
      var extra = v.sus === "prueba" ? 2 : v.sus === "insp" ? 3 : 0;
      if (v.amp) cands.push([addM(R, 6 + extra), "Cuenta desde el vencimiento del plazo para responder el requerimiento especial y olvida que hubo ampliación."]);
      cands.push([addM(dia28(resp), 6 + extra), "Cuenta desde la fecha de la respuesta. Los seis meses corren desde el vencimiento del plazo, no desde que respondió."]);
      if (v.sus !== "no") cands.push([addM(S, 6), "Olvida la suspensión: " + (v.sus === "prueba" ? "dos meses si la prueba pedida está en documentos que no reposan en el expediente." : "tres meses por la inspección tributaria de oficio.")]);
      else cands.push([addM(S, 3), "Tres meses es la familia del requerimiento especial; para la liquidación de revisión son seis."]);
      cands.push([addM(D, 6 + extra), "Cuenta desde la notificación del requerimiento especial. Se cuenta desde el vencimiento del plazo para responder."]);
      var used = [fD(L)], dis = [];
      r.shuffle(cands).forEach(function (c) { var t = fD(c[0]); if (dis.length < 2 && used.indexOf(t) < 0) { used.push(t); dis.push(op("Hasta el " + t + ".", false, c[1])); } });
      return finish({ ctx: ctx, q: "¿Hasta qué fecha puede la DIAN notificar la liquidación oficial de revisión?", ops: [ok].concat(dis),
        exp: "Seis meses desde el vencimiento del plazo para responder el requerimiento especial o su ampliación, no desde la respuesta. Se suspenden tres meses por inspección tributaria de oficio, mientras dure la inspección contable pedida por el contribuyente y dos meses si la prueba pedida está en documentos que no reposan en el expediente.", linea: null }, r);
    }
  };

  /* M07-3 · Lo que la liquidación puede decir y el segundo reloj (arts. 711, 713 y 714) */
  FAM.mitad = tabla({
    nombre: "Solo lo propuesto", sub: "s-mitad", lam: ["f79", "f80", "f81"],
    exp: "La liquidación de revisión se limita a los hechos del requerimiento especial o de su ampliación; si no llega en sus seis meses, la declaración queda en firme; y quien acepta dentro del término para recurrir paga la mitad de la sanción propuesta.",
    x: function (r) { return { e: r.pick(ENT2).n, n: r.int(7, 11), k: r.int(2, 5) }; },
    pares: [["nuevo", "ampliado"], ["firme", "atiempo"], ["mitad1", "mitad2"]],
    st: {
      nuevo: { q: "¿Qué debe concluirse sobre ese punto?", cambio: "de dónde salió el hecho nuevo",
        ctx: "La liquidación oficial de revisión de {e} confirmó lo propuesto y, además, adicionó unos ingresos por arrendamientos que el requerimiento especial nunca mencionó. No hubo ampliación.",
        ok: "Desconoce el art. 711, y la sociedad debe alegarlo al discutir la liquidación.", por: "Correcto: la liquidación debe limitarse a los hechos del requerimiento especial o de su ampliación (art. 711). La DIAN no puede sorprender en la decisión.",
        no: [["Es válido: la DIAN puede adicionar lo que encuentre hasta que decida.", "Para agregar hechos debía ampliar el requerimiento especial a tiempo."],
             ["Es válido si la sanción por ese hecho se reduce a la cuarta parte.", "La reducción de la sanción no subsana que el hecho no se propuso."]] },
      ampliado: { q: "¿Qué debe concluirse sobre ese punto?", cambio: "de dónde salió el hecho nuevo",
        ctx: "La liquidación oficial de revisión de {e} adicionó unos ingresos por arrendamientos que no estaban en el requerimiento especial, pero sí en su ampliación, notificada a tiempo.",
        ok: "Es válido: la liquidación puede incluir los hechos de la ampliación.", por: "Correcto: el art. 711 permite los hechos del requerimiento especial o de su ampliación.",
        no: [["Desconoce el art. 711: solo valen los hechos del requerimiento original.", "El art. 711 menciona expresamente la ampliación."],
             ["Es nulo: la ampliación no puede traer hechos nuevos.", "Sí puede: el art. 708 lo permite, una sola vez."]] },
      firme: { q: "¿Qué pasa con la declaración?", cambio: "cuándo se notificó la liquidación",
        ctx: "La DIAN notificó a tiempo el requerimiento especial de {e}, pero notificó la liquidación oficial de revisión {n} meses después del vencimiento del plazo para responderlo. No hubo ampliación ni suspensiones.",
        ok: "Quedó en firme: venció el término para notificar la liquidación de revisión.", por: "Correcto: la declaración queda en firme si, vencido el término para practicar la liquidación de revisión, esta no se notificó (art. 714). Era de seis meses (art. 710).",
        no: [["Sigue abierta, porque el requerimiento especial llegó a tiempo.", "Haber notificado a tiempo el requerimiento no basta: el art. 714 tiene un segundo reloj."],
             ["Sigue abierta hasta tres años después del requerimiento especial.", "No existe ese plazo: la liquidación tenía seis meses."]] },
      atiempo: { q: "¿Llegó a tiempo la liquidación?", cambio: "cuándo se notificó la liquidación",
        ctx: "La DIAN notificó a tiempo el requerimiento especial de {e} y notificó la liquidación oficial de revisión {k} meses después del vencimiento del plazo para responderlo. No hubo ampliación ni suspensiones.",
        ok: "Sí: tenía seis meses desde el vencimiento del plazo para responder.", por: "Correcto: art. 710.",
        no: [["No: tenía tres meses desde la respuesta.", "Tres meses es la familia del requerimiento especial."],
             ["No: debía notificarse junto con el requerimiento especial.", "Primero el requerimiento; la liquidación llega después."]] },
      mitad1: { q: "¿Tiene alguna reducción de la sanción por inexactitud?", cambio: "si aceptó dentro o fuera del término para recurrir",
        ctx: "Un mes después de recibir la liquidación oficial de revisión, {e} acepta parte de los hechos, corrige, presenta el memorial con la corrección y paga.",
        ok: "Sí: la mitad de la sanción inicialmente propuesta, sobre los hechos aceptados.", por: "Correcto: aceptó dentro del término para interponer el recurso de reconsideración (art. 713).",
        no: [["No: la reducción solo procedía al responder el requerimiento especial.", "Esa era la cuarta parte; después de la liquidación queda la mitad."],
             ["Sí: la cuarta parte de la sanción propuesta.", "La cuarta parte era al responder el requerimiento especial."]] },
      mitad2: { q: "¿Tiene alguna reducción de la sanción por inexactitud?", cambio: "si aceptó dentro o fuera del término para recurrir",
        ctx: "Tres meses después de recibir la liquidación oficial de revisión, sin haberla recurrido, {e} acepta parte de los hechos, corrige y paga.",
        ok: "No: debía aceptar dentro del término para interponer el recurso de reconsideración.", por: "Correcto: el término del recurso es de dos meses (art. 720), y la reducción del art. 713 exige aceptar dentro de él.",
        no: [["Sí: la mitad, mientras la liquidación no esté en firme.", "El art. 713 exige aceptar dentro del término para recurrir."],
             ["Sí: la cuarta parte, porque aceptó voluntariamente.", "La cuarta parte era al responder el requerimiento especial."]] }
    }
  });

  /* M07-4 · El emplazamiento previo duplica el precio del retardo (arts. 641, 642 y 715) */
  FAM.extemp = {
    nombre: "El precio del retardo", sub: "s-extemp", lam: ["f82"], twin: true,
    vars: function (r) { return { emp: r.chance(0.5), m: r.int(2, 30), d: r.pick([0, 0, r.int(3, 25)]) }; },
    flip: function (v) { return { emp: !v.emp, m: v.m, d: v.d }; },
    cambio: "si declaró antes o después del emplazamiento previo por no declarar",
    build: function (v, lvl, r) {
      var e = r.pick(ENT2), I = r.int(2, 40) * 5, mm = v.m + (v.d ? 1 : 0);
      var p641 = Math.min(5 * mm, 100), p642 = Math.min(10 * mm, 200);
      var ret = n2w(v.m) + " meses" + (v.d ? " y " + n2w(v.d) + " días" : "");
      var ctx = cap(e.n) + " presentó su declaración de renta del año gravable 2024 con " + ret + " de retraso, con un impuesto a cargo de " + mill(I) + ". " +
        (v.emp ? "Lo hizo dentro del mes que le dio el emplazamiento previo por no declarar que la DIAN le había notificado." : "La DIAN no le había notificado ningún emplazamiento ni auto de inspección tributaria.");
      var okP = v.emp ? p642 : p641, otherP = v.emp ? p641 : p642;
      var w = function (p) { return mill(I * p / 100) + " (" + p + " % del impuesto)."; };
      var ops = [op(w(okP), true, v.emp ? "Correcto: después del emplazamiento previo, el 10 % por cada mes o fracción, sin pasar del 200 % (art. 642). Son " + n2w(mm) + " meses o fracción." :
        "Correcto: sin emplazamiento ni auto de inspección, el 5 % por cada mes o fracción, sin pasar del 100 % (art. 641). Son " + n2w(mm) + " meses o fracción.")];
      var cands = [[otherP, v.emp ? "Ese es el art. 641, para quien declara sin emplazamiento; el emplazamiento duplica el precio." : "El 10 % por mes del art. 642 es para quien declara después del emplazamiento o del auto de inspección."],
        [v.emp ? 10 * mm : 5 * mm, "Olvida el tope: " + (v.emp ? "200 %" : "100 %") + " del impuesto."],
        [v.emp ? Math.min(10 * v.m, 200) : Math.min(5 * v.m, 100), "Olvida que la fracción de mes cuenta como un mes completo."],
        [v.emp ? Math.min(5 * mm, 200) : Math.min(10 * mm, 100), "Mezcla la tarifa de un artículo con el tope del otro."],
        [Math.min((v.emp ? 10 : 5) * (mm + 1), v.emp ? 200 : 100), "Cuenta un mes de más: son " + n2w(mm) + " meses o fracción."],
        [Math.min((v.emp ? 10 : 5) * (mm - 1), v.emp ? 200 : 100), "Cuenta un mes de menos: son " + n2w(mm) + " meses o fracción."],
        [okP / 2, "Aplica una reducción, y la pregunta pide el valor antes de cualquier reducción."]];
      var used = [okP];
      r.shuffle(cands).forEach(function (c) { if (ops.length < 3 && used.indexOf(c[0]) < 0) { used.push(c[0]); ops.push(op(w(c[0]), false, c[1])); } });
      return finish({ ctx: ctx, q: "¿Qué sanción por extemporaneidad debe liquidar, antes de cualquier reducción?", ops: ops,
        exp: "Sin emplazamiento: 5 % por mes o fracción, tope 100 % (art. 641). Después del emplazamiento previo por no declarar o del auto de inspección: 10 % por mes o fracción, tope 200 % (art. 642).", linea: null }, r);
    }
  };

  /* M07-4 · La sanción por no declarar, su rebaja y su piso (art. 643) */
  FAM.sancnodecl = {
    nombre: "La sanción por no declarar", sub: "s-sancnodecl", lam: ["f83", "f84"], twin: true,
    vars: function (r) { return { red: r.chance(0.5), piso: r.chance(0.3) }; },
    flip: function (v) { return { red: !v.red, piso: v.piso }; },
    cambio: "si presentó o no la declaración dentro del plazo para recurrir la resolución sanción",
    build: function (v, lvl, r) {
      var e = r.pick(ENT2), C = r.int(10, 80) * 50, G = r.int(10, 80) * 50;
      while (G === C) G = r.int(10, 80) * 50;
      var base = Math.max(C, G), menor = Math.min(C, G), S = base / 5, half = S / 2;
      var X = v.piso ? half + r.int(2, 20) * 5 : Math.max(5, half - r.int(2, 20) * 5);
      var ctx = cap(e.n) + " no declaró renta del año gravable 2023, aunque estaba obligada. Venció el mes del emplazamiento previo por no declarar y la DIAN le impuso, en resolución sanción, la sanción por no declarar. La DIAN determinó consignaciones bancarias por " + mill(C) + "; en su última declaración de renta, la sociedad había reportado ingresos brutos por " + mill(G) + ".";
      var ops, q;
      if (v.red) {
        ctx += " Dentro del plazo para recurrir esa resolución, presentó la declaración. La sanción por extemporaneidad del artículo 642 que le correspondería es de " + mill(X) + ".";
        q = "¿Qué sanción por no declarar debe liquidar y pagar con la declaración, sin considerar otras reducciones?";
        var okV = Math.max(half, X);
        ops = [op(mill(okV) + ".", true, okV === half ? "Correcto: el 20 % de la base mayor es " + mill(S) + "; al declarar dentro del plazo para recurrir se reduce a la mitad, y la mitad supera el piso del art. 642 (art. 643, par. 2)." :
          "Correcto: la mitad (" + mill(half) + ") queda por debajo de la extemporaneidad del art. 642, que es el piso: no puede ser inferior a ella (art. 643, par. 2).")];
        var c2 = [[S, "No aplica la rebaja: declaró dentro del plazo para recurrir, y la sanción se reduce a la mitad."],
          [okV === half ? X : half, okV === half ? "El art. 642 es el piso, no el valor: la mitad es mayor." : "La mitad no puede quedar por debajo de la extemporaneidad del art. 642."],
          [menor / 10, "Usa la base menor; la ley manda tomar la mayor."],
          [base / 20, "Aplica la tarifa del IVA (10 %) y además la rebaja; en renta la tarifa es el 20 %."],
          [S + X, "Suma la extemporaneidad a la sanción por no declarar; el art. 642 solo funciona como piso."]];
        var used = [okV];
        r.shuffle(c2).forEach(function (c) { if (ops.length < 3 && used.indexOf(c[0]) < 0) { used.push(c[0]); ops.push(op(mill(c[0]) + ".", false, c[1])); } });
      } else {
        ctx += " No recurrió la resolución ni presentó la declaración.";
        q = "¿Cuánto es la sanción por no declarar, antes de cualquier reducción?";
        ops = [op(mill(S) + ".", true, "Correcto: en renta, el 20 % de las consignaciones o ingresos determinados, o de los ingresos de la última declaración, el que sea mayor (art. 643).")];
        var c3 = [[menor / 5, "Usa la base menor; el art. 643 manda tomar la mayor."], [base / 10, "El 10 % es la tarifa del IVA y del impuesto al consumo; en renta es el 20 %."], [half, "La rebaja a la mitad exige presentar la declaración dentro del plazo para recurrir."],
          [menor / 10, "Usa la base menor y la tarifa del IVA; en renta es el 20 % de la base mayor."], [(C + G) / 5, "Suma las dos bases; el art. 643 manda tomar la mayor de ellas."]];
        var used2 = [S];
        r.shuffle(c3).forEach(function (c) { if (ops.length < 3 && used2.indexOf(c[0]) < 0) { used2.push(c[0]); ops.push(op(mill(c[0]) + ".", false, c[1])); } });
      }
      return finish({ ctx: ctx, q: q, ops: ops, exp: "Renta: 20 % de la base mayor (consignaciones o ingresos determinados, o ingresos de la última declaración). Si declara dentro del plazo para recurrir la resolución sanción, la mitad, pero nunca menos que la extemporaneidad del art. 642.", linea: null }, r);
    }
  };

  /* M07-4 · Aforo, emplazamiento y caducidad de la sanción (arts. 638, 715 y 717) */
  FAM.aforo = tabla({
    nombre: "El que no declara", sub: "s-aforo", lam: ["f85", "f82"],
    exp: "Quien no declara recorre tres pasos: emplazamiento previo (un mes), sanción por no declarar y liquidación oficial de aforo, dentro de los cinco años siguientes al vencimiento del plazo para declarar. La facultad de imponer la sanción por no declarar también dura cinco años.",
    x: function (r) {
      var V = fechaOk(r, 2023, 2025, function (d) { return habil(addM(d, 60)); });
      return { e: r.pick(ENT2).n, V: fD(V), V5: fD(addM(V, 60)), V3: fD(addM(V, 36)), V2: fD(addM(V, 24)) };
    },
    pares: [["aforo", "emplaza"], ["orden", "aforo"], ["sancion5", "emplaza"]],
    st: {
      aforo: { q: "¿Hasta cuándo puede la DIAN fijarle el impuesto con una liquidación oficial de aforo?",
        ctx: "{e} nunca presentó su declaración de renta; el plazo para declarar vencía el {V}. La DIAN ya agotó el emplazamiento previo y le impuso la sanción por no declarar.",
        ok: "Hasta el {V5}: cinco años desde el vencimiento del plazo para declarar.", por: "Correcto: art. 717.",
        no: [["Hasta el {V3}: tres años desde el vencimiento del plazo para declarar.", "Tres años es el término del requerimiento especial, para quien sí declaró."],
             ["Hasta el {V2}: dos años desde el vencimiento del plazo para declarar.", "Dos años es la corrección aritmética, y se cuenta desde la presentación."]] },
      emplaza: { q: "¿Cuánto tiempo le da el emplazamiento previo por no declarar?",
        ctx: "Previa comprobación de su obligación, la DIAN emplazó a {e} para que presente la declaración de renta que omitió.",
        ok: "Un mes, con la advertencia de las consecuencias de no declarar.", por: "Correcto: es el término perentorio de un mes del art. 715.",
        no: [["Tres meses, como el requerimiento especial.", "El requerimiento especial es otra ruta; el emplazamiento previo da un mes."],
             ["Dos meses, como el recurso de reconsideración.", "Dos meses es el recurso; el emplazamiento da un mes."]] },
      orden: { q: "¿Qué debe hacer primero?",
        ctx: "La DIAN quiere fijarle el impuesto a {e}, que no declaró renta, sin haberle notificado antes ningún acto.",
        ok: "Notificarle el emplazamiento previo por no declarar, con un mes para cumplir.", por: "Correcto: la liquidación de aforo procede «agotado el procedimiento» de los arts. 643, 715 y 716: emplazamiento y sanción por no declarar (art. 717).",
        no: [["Notificarle un requerimiento especial y esperar tres meses.", "El requerimiento especial es la ruta de quien sí declaró."],
             ["Proferir de una vez la liquidación oficial de aforo.", "El aforo llega después del emplazamiento y de la sanción por no declarar."]] },
      sancion5: { q: "¿Cuánto dura la facultad de imponerle la sanción por no declarar?",
        ctx: "La DIAN tiene identificada a {e}, que no declaró renta, pero todavía no le ha impuesto la sanción por no declarar.",
        ok: "Cinco años.", por: "Correcto: la facultad de imponer la sanción por no declarar se extingue en cinco años (art. 638). El Estatuto lo llama prescripción; el Consejo de Estado precisó que es caducidad.",
        no: [["Dos años, como el pliego de cargos de las sanciones independientes.", "Esa es la regla general del art. 638; la sanción por no declarar tiene cinco años."],
             ["Tres años, como el requerimiento especial.", "Tres años es otra ruta: la de quien sí declaró."]] }
    }
  });

  /* M07-5 · Un recurso, dos meses, y la puerta directa al juez (arts. 720, 723, 731 y 735) */
  FAM.recon = tabla({
    nombre: "Un recurso, dos meses", sub: "s-recurso", lam: ["f86", "f87", "f90"],
    exp: "El Estatuto tiene un solo recurso, el de reconsideración, en dos meses. Quien atendió en debida forma el requerimiento especial puede ir directamente ante el juez en cuatro meses. La clausura tiene norma especial: reposición en diez días.",
    x: function (r) {
      var D = fechaOk(r, 2025, 2026, function (d) { return habil(addM(d, 2)) && habil(addM(d, 4)); });
      return { e: r.pick(ENT2).n, D: fD(D), D2: fD(addM(D, 2)), D4: fD(addM(D, 4)) };
    },
    pares: [["nojuez", "juez"], ["clausura", "multa"], ["aceptado", "nulidad"], ["nulidad", "nulidad2"]],
    st: {
      nojuez: { q: "¿Puede demandar ante el juez sin interponer antes el recurso de reconsideración?", cambio: "si respondió o no el requerimiento especial",
        ctx: "El {D}, la DIAN le notificó a {e} una liquidación oficial de revisión. La sociedad nunca respondió el requerimiento especial que la precedió.",
        ok: "No: debe agotar el recurso de reconsideración, que vence el {D2}.", por: "Correcto: la demanda directa exige haber atendido en debida forma el requerimiento especial (art. 720, par.). Sin eso, recurso en dos meses.",
        no: [["Sí, dentro de los cuatro meses siguientes: hasta el {D4}.", "Esa puerta es solo para quien atendió en debida forma el requerimiento especial."],
             ["Sí, pero dentro de los diez días siguientes a la notificación.", "Diez días es el esquema del CPACA; aquí rige el Estatuto."]] },
      juez: { q: "¿Puede demandar ante el juez sin interponer antes el recurso de reconsideración?", cambio: "si respondió o no el requerimiento especial",
        ctx: "El {D}, la DIAN le notificó a {e} una liquidación oficial de revisión. La sociedad había respondido por escrito y a tiempo el requerimiento especial que la precedió.",
        ok: "Sí, dentro de los cuatro meses siguientes: hasta el {D4}.", por: "Correcto: atendió en debida forma el requerimiento especial, y puede prescindir del recurso y demandar en cuatro meses (art. 720, par.).",
        no: [["No: el recurso es obligatorio para ir ante el juez, como la apelación.", "Esa es la lógica del CPACA; el parágrafo del art. 720 abre la puerta directa."],
             ["Sí, pero dentro de los dos meses siguientes: hasta el {D2}.", "Dos meses es el plazo del recurso; para la demanda directa son cuatro."]] },
      clausura: { q: "¿Qué recurso procede y en qué plazo?", cambio: "la clase de sanción",
        ctx: "La DIAN le impuso a {e} la sanción de clausura de su establecimiento.",
        ok: "Reposición, dentro de los diez días siguientes.", por: "Correcto: es la norma especial del art. 735.",
        no: [["Reconsideración, dentro de los dos meses siguientes.", "Es la regla general, pero la clausura tiene norma especial."],
             ["Reposición y en subsidio apelación, dentro de los diez días.", "La apelación es del CPACA; aquí procede solo la reposición."]] },
      multa: { q: "¿Qué recurso procede y en qué plazo?", cambio: "la clase de sanción",
        ctx: "El {D}, la DIAN le notificó a {e} una resolución que le impone una sanción por no enviar información.",
        ok: "Reconsideración, hasta el {D2}.", por: "Correcto: contra las resoluciones que imponen sanciones procede el recurso de reconsideración, dentro de los dos meses siguientes a su notificación (art. 720).",
        no: [["Reposición, dentro de los diez días siguientes.", "Esa es la norma especial de la clausura."],
             ["Reposición y en subsidio apelación, dentro de los diez días.", "Ese es el esquema del CPACA."]] },
      aceptado: { q: "¿Puede volver a discutirlos en el recurso?",
        ctx: "Al responder el requerimiento especial, {e} aceptó expresamente el rechazo de unos costos y discutió lo demás. En el recurso contra la liquidación quiere volver a discutir esos costos.",
        ok: "No: no puede objetar los hechos que aceptó expresamente al responder.", por: "Correcto: art. 723. Lo aceptado, aceptado queda.",
        no: [["Sí: el recurso permite discutir toda la liquidación.", "El art. 723 excluye los hechos aceptados expresamente."],
             ["Sí, si devuelve la reducción de sanción que obtuvo.", "Esa posibilidad no existe."]] },
      nulidad: { q: "¿Debe estudiarse esa nulidad?", cambio: "cuándo alegó la nulidad",
        ctx: "Vencidos los dos meses del recurso, {e} presenta un escrito en el que alega por primera vez una nulidad de la liquidación.",
        ok: "No: las nulidades deben alegarse dentro del término para interponer el recurso.", por: "Correcto: se alegan en el escrito del recurso o en una adición, dentro de ese término (art. 731).",
        no: [["Sí: las nulidades pueden alegarse en cualquier momento antes del fallo.", "El art. 731 fija la oportunidad: el término del recurso."],
             ["Sí, si el escrito lo firma un abogado.", "La firma no cambia la oportunidad."]] },
      nulidad2: { q: "¿Debe estudiarse esa nulidad?", cambio: "cuándo alegó la nulidad",
        ctx: "Un mes después de interponer el recurso, y todavía dentro de los dos meses, {e} presenta una adición en la que alega una nulidad de la liquidación.",
        ok: "Sí: puede alegarse en una adición, dentro del término para recurrir.", por: "Correcto: art. 731.",
        no: [["No: las nulidades solo pueden alegarse en el escrito inicial del recurso.", "El art. 731 admite la adición dentro del término."],
             ["No: las nulidades se alegan ante el juez, no en el recurso.", "Se alegan en el recurso o en su adición."]] }
    }
  });

  /* M07-5 · Requisitos del recurso (arts. 722 y 726; C-1441 de 2000) */
  FAM.requisitos = tabla({
    nombre: "Requisitos del recurso", sub: "s-requisitos", lam: ["f88", "f89"],
    exp: "Por escrito, con motivos concretos, a tiempo y por el contribuyente o su apoderado abogado. El agente oficioso solo puede ser abogado, y la persona debe ratificar dentro de los dos meses siguientes a la notificación del auto admisorio. El pago de la liquidación privada ya no se exige.",
    x: function (r) {
      var A = fechaOk(r, 2025, 2026, function (d) { return habil(addM(d, 2)); });
      var I = dia28(addDd(A, -r.int(20, 40)));
      return { e: r.pick(ENT2).n, A: fD(A), A2: fD(addM(A, 2)), I: fD(I), I2: fD(addM(I, 2)) };
    },
    pares: [["oficab", "oficcont"], ["pago", "motivos"], ["repos", "pago"], ["apod", "oficab"]],
    st: {
      oficab: { q: "¿Hasta cuándo debe la sociedad ratificar la actuación?", cambio: "quién actuó como agente oficioso",
        ctx: "El {I}, una abogada sin poder interpuso a tiempo, como agente oficiosa de {e}, el recurso de reconsideración, con motivos concretos. El auto que admitió el recurso se notificó el {A}.",
        ok: "Hasta el {A2}: dos meses desde la notificación del auto admisorio.", por: "Correcto: art. 722. Si no ratifica, el recurso se entiende no presentado en debida forma y se revoca el auto admisorio.",
        no: [["Hasta el {I2}: dos meses desde la interposición del recurso.", "Se cuentan desde la notificación del auto que admite el recurso."],
             ["No necesita ratificarla, porque la agente es abogada.", "Ser abogada la habilita como agente oficiosa, pero la ratificación sigue siendo necesaria."]] },
      oficcont: { q: "¿Es válida esa actuación?", cambio: "quién actuó como agente oficioso",
        ctx: "El {I}, el contador de {e}, que no es abogado, interpuso sin poder, como agente oficioso, el recurso de reconsideración.",
        ok: "No: únicamente los abogados pueden actuar como agentes oficiosos.", por: "Correcto: art. 722.",
        no: [["Sí, si la sociedad la ratifica dentro de los dos meses.", "La ratificación no suple la falta de calidad: solo los abogados pueden ser agentes oficiosos."],
             ["Sí, porque conoce la contabilidad de la sociedad.", "Conocer la contabilidad no lo habilita."]] },
      pago: { q: "¿Es correcta la inadmisión?", cambio: "el motivo de la inadmisión",
        ctx: "La DIAN inadmite el recurso de {e} contra una liquidación oficial de revisión porque no acreditó el pago de la liquidación privada.",
        ok: "No: ese requisito fue declarado inexequible.", por: "Correcto: la Corte Constitucional declaró inexequible el literal d) del art. 722 en la sentencia C-1441 de 2000.",
        no: [["Sí: el art. 722 exige acreditar el pago de la liquidación privada.", "Ese literal d) ya no rige."],
             ["Sí, salvo que el recurso lo interponga un abogado.", "El requisito no existe para nadie."]] },
      motivos: { q: "¿Es correcta la inadmisión?", cambio: "el motivo de la inadmisión",
        ctx: "La DIAN inadmite el recurso de {e} contra una liquidación oficial de revisión porque el escrito solo dice que la sociedad no está de acuerdo, sin explicar por qué.",
        ok: "Sí: falta la expresión concreta de los motivos de inconformidad.", por: "Correcto: es un requisito vigente del art. 722.",
        no: [["No: basta con manifestar el desacuerdo dentro del plazo.", "El art. 722 exige motivos concretos."],
             ["No: ese requisito fue declarado inexequible.", "Lo inexequible fue el pago de la liquidación privada."]] },
      repos: { q: "¿Qué puede hacer contra el auto inadmisorio?",
        ctx: "La DIAN le notificó a {e} un auto que inadmite su recurso de reconsideración.",
        ok: "Interponer reposición ante el mismo funcionario, dentro de los diez días siguientes.", por: "Correcto: contra el auto inadmisorio solo procede la reposición, en diez días, y se resuelve en cinco (art. 726).",
        no: [["Apelarlo ante el director seccional, dentro de los diez días.", "No procede apelación: solo reposición."],
             ["Interponer un nuevo recurso de reconsideración, en dos meses.", "Contra el auto procede únicamente la reposición."]] },
      apod: { q: "¿Puede el contador interponer el recurso?",
        ctx: "{e} le otorga poder a su contador, que no es abogado, para que interponga el recurso de reconsideración.",
        ok: "No: para interponer recursos, el apoderado debe ser abogado.", por: "Correcto: para interponer recursos ante la administración tributaria el apoderado debe ser abogado; para otras actuaciones no se exige (art. 722, con el art. 68 del Decreto 19 de 2012 que transcribe su nota).",
        no: [["Sí: con poder, cualquier persona puede representar al contribuyente.", "Para los recursos, el apoderado debe ser abogado."],
             ["Sí, si la sociedad ratifica luego su actuación.", "La ratificación es para el agente oficioso abogado, no para suplir la calidad."]] }
    }
  });

  /* M07-5 · Un año para resolver y el silencio positivo (arts. 732-734; CPACA, art. 86) */
  FAM.silencio = tabla({
    nombre: "Un año y el silencio positivo", sub: "s-silencio", lam: ["f91", "f92"],
    exp: "La DIAN tiene un año desde la interposición en debida forma. La inspección tributaria lo suspende (mientras dure si la pidió el contribuyente; hasta tres meses si es de oficio). Si el año pasa sin decisión, opera el silencio positivo.",
    x: function (r) { return { e: r.pick(ENT2).n, k: r.int(3, 9) }; },
    pares: [["anio", "inspof"], ["cpaca", "anio"]],
    st: {
      anio: { q: "¿Qué pasó con el recurso?", cambio: "si hubo o no una inspección tributaria",
        ctx: "{e} interpuso en debida forma el recurso de reconsideración. No hubo inspección tributaria ni otra suspensión. Un año y {k} semanas después, la DIAN no había firmado ni notificado ninguna decisión.",
        ok: "Se entiende fallado a favor de la sociedad: operó el silencio positivo.", por: "Correcto: arts. 732 y 734. La DIAN debe declararlo de oficio o a petición de parte.",
        no: [["Se entiende negado, y la sociedad puede demandar.", "Ese es el silencio negativo del CPACA; en el Estatuto es positivo."],
             ["Sigue en trámite: la DIAN puede decidir mientras no lo declare.", "Vencido el año sin decisión, el recurso se entiende fallado a favor."]] },
      inspof: { q: "¿Qué pasó con el recurso?", cambio: "si hubo o no una inspección tributaria",
        ctx: "{e} interpuso en debida forma el recurso de reconsideración. Durante el trámite, la DIAN practicó de oficio una inspección tributaria que duró tres meses. Notificó la decisión un año y dos meses después de la interposición.",
        ok: "La decisión llegó a tiempo: la inspección suspendió el año tres meses.", por: "Correcto: la inspección de oficio suspende el término para fallar hasta por tres meses (art. 733). El año se corrió a quince meses.",
        no: [["Operó el silencio positivo: el año ya había vencido.", "Olvida la suspensión del art. 733."],
             ["La decisión es nula: la inspección no suspende el término del recurso.", "Sí lo suspende: art. 733."]] },
      cpaca: { q: "¿Tiene razón?",
        ctx: "Un abogado acostumbrado al CPACA le dice a {e} que, como la DIAN no ha resuelto en {k} meses su recurso de reconsideración, debe entenderlo negado y demandar.",
        ok: "No: la DIAN tiene un año para resolver, y si no lo hace, el silencio es positivo.", por: "Correcto: el Estatuto desplaza al CPACA (arts. 732 y 734 frente al art. 86 del CPACA).",
        no: [["Sí: a los dos meses opera el silencio negativo del CPACA.", "En el Estatuto rige norma propia: un año y silencio positivo."],
             ["Sí, pero solo si el recurso es contra una sanción.", "No hay esa distinción: el año y el silencio positivo valen para el recurso de reconsideración."]] }
    }
  });

  /* M07-6 · La revocatoria directa (arts. 736, 737 y 738-1; CPACA, arts. 93-96) */
  FAM.revoc = tabla({
    nombre: "La revocatoria directa", sub: "s-revoc", lam: ["f93", "f94", "f95"],
    exp: "En el Estatuto, la revocatoria directa procede solo si no se interpusieron recursos, se pide dentro de los dos años desde la ejecutoria y la DIAN tiene un año para decidir; si no decide, silencio positivo.",
    x: function (r) { return { e: r.pick(ENT2).n, k: r.int(2, 10) }; },
    pares: [["sinrec", "conrec"], ["tarde", "sinrec"], ["silencio", "conrec"]],
    st: {
      sinrec: { q: "¿Procede la solicitud?", cambio: "si recurrió o no el acto, o cuándo pidió la revocatoria",
        ctx: "{e} no recurrió una resolución sanción. Un año después de que quedó ejecutoriada, pide su revocatoria directa.",
        ok: "Sí: no interpuso recursos y está dentro de los dos años desde la ejecutoria.", por: "Correcto: arts. 736 y 737.",
        no: [["No: el acto ya está ejecutoriado y no admite discusión.", "La revocatoria directa existe justamente para actos ejecutoriados, dentro de dos años."],
             ["No: debía pedirla dentro de los dos meses del recurso.", "Dos meses es el recurso; la revocatoria tiene dos años desde la ejecutoria."]] },
      conrec: { q: "¿Procede la solicitud?", cambio: "si recurrió o no el acto",
        ctx: "{e} recurrió en reconsideración una resolución sanción y perdió. Un año después pide su revocatoria directa por agravio injustificado.",
        ok: "No: quien interpuso recursos no puede pedirla por ninguna causal.", por: "Correcto: en el Estatuto, la revocatoria directa solo procede si no se interpusieron los recursos (art. 736).",
        no: [["Sí: el agravio injustificado permite pedirla aunque haya recurrido.", "Esa es la regla del CPACA; el art. 736 la cierra por completo."],
             ["Sí, porque está dentro de los dos años desde la ejecutoria.", "El plazo no salva la improcedencia."]] },
      tarde: { q: "¿Procede la solicitud?", cambio: "cuándo pidió la revocatoria",
        ctx: "{e} no recurrió una resolución sanción. Pide su revocatoria directa dos años y {k} meses después de que quedó ejecutoriada. No ha demandado.",
        ok: "No: debía pedirla dentro de los dos años desde la ejecutoria.", por: "Correcto: art. 737.",
        no: [["Sí: mientras no haya demandado, puede pedirla en cualquier tiempo.", "Esa es la lógica del CPACA (art. 95); el Estatuto da dos años."],
             ["Sí: la revocatoria directa no tiene plazo.", "El art. 737 fija dos años desde la ejecutoria."]] },
      silencio: { q: "¿Qué pasó con la solicitud?",
        ctx: "{e} pidió en debida forma la revocatoria directa de una sanción que no recurrió. Pasaron un año y {k} semanas sin decisión.",
        ok: "Se entiende resuelta a su favor: opera el silencio positivo, que debe declararse.", por: "Correcto: art. 738-1.",
        no: [["Se entiende negada, como en el CPACA.", "En el CPACA no hay silencio en la revocatoria; en el Estatuto es positivo."],
             ["Nada: la DIAN puede decidir en cualquier tiempo.", "Tiene un año; vencido, opera el silencio positivo."]] }
    }
  });

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

/* Mérito · versión 2026-10-22.2 · entrenamiento DIAN 2676 de Laura y Juan David. Hecha con Claude. */
var APP = window.APP || (window.APP = {});

/* ===== src/data/proyecto.js ===== */
/* Datos del proyecto, de la convocatoria y de los usuarios.
   Fuentes: guía de orientación DIAN 2676 (FUAA, oct-2026); ejes consultados el 16-oct-2026;
   Resolución DIAN 65 de 2024 (Diccionario de Competencias); Código de Integridad DIAN v3.
   Todo lo marcado como «criterio» es criterio de Claude, no dato oficial. */
var APP = window.APP || (window.APP = {});
APP.data = APP.data || {};

APP.data.version = "2026-10-22.1";

APP.data.proyectos = [
  {
    id: "dian2676",
    nombre: "Plan DIAN Exprés",
    convocatoria: "Proceso de Selección DIAN 2676",
    operador: "Fundación Universitaria del Área Andina (FUAA), contrato CNSC 489 de 2026",
    prueba: { fecha: "2026-11-08T08:00:00-05:00", puertas: "7:15 a. m.", cierre: "8:30 a. m.", horas: 5 },
    corte: "Normas vigentes y expedidas hasta el 19 de junio de 2026 (guía, num. 4.3).",
    formato: {
      funcional: { items: 66, opciones: 3, peso: 65, minimo: 70, nota: "Juicio situacional: un caso, un enunciado y tres opciones. Solo una es correcta." },
      comportamental: { items: 60, opciones: 4, peso: 15, nota: "Autoinforme con escala Likert de cuatro niveles. Bloque separado del de integridad." },
      integridad: { items: 30, opciones: 4, peso: 10, nota: "Mismo formato que la comportamental; mide los valores del Código de Integridad de la DIAN." }
    },
    likert: ["Totalmente en desacuerdo", "En desacuerdo", "De acuerdo", "Totalmente de acuerdo"],
    temas: [
      { id: "m06-1", tipo: "funcional", nombre: "La declaración que vale y la que no", corto: "Vale o no vale", denso: true,
        subtemas: ["s-nopres", "s-retsinpago", "s-noobligado", "s-forma"] },
      { id: "m06-2", tipo: "funcional", nombre: "Corregir: cuatro puertas y una regla de dos condiciones", corto: "Corregir", denso: true,
        subtemas: ["s-subir", "s-bajar", "s-sinsancion", "s-peaje"] },
      { id: "m06-3", tipo: "funcional", nombre: "El reloj de la firmeza", corto: "Firmeza", denso: true,
        subtemas: ["s-reloj", "s-largos", "s-pausas", "s-beneficio"] },
      { id: "comp", tipo: "comportamental", nombre: "Competencias comportamentales", corto: "Comportamental", denso: false, subtemas: [] },
      { id: "integ", tipo: "integridad", nombre: "Integridad", corto: "Integridad", denso: false, subtemas: [] }
    ]
  }
];

/* Probabilidad de que el subtema aparezca en la prueba: criterio de Claude.
   alta = casi seguro que aparece en al menos un caso; media = puede aparecer; baja = poco probable o solo como distractor. */
APP.data.subtemas = {
  "s-nopres":     { tema: "m06-1", nombre: "Declaraciones que se tienen por no presentadas y cómo se sanean", prob: "media",
                    porque: "Es una lista cerrada (literales a, b y d) con una excepción que deja por fuera el literal c: material fácil de convertir en trampa." },
  "s-retsinpago": { tema: "m06-1", nombre: "Retención en la fuente presentada sin pago", prob: "alta",
                    porque: "Es la regla más propia de la DIAN en este capítulo: tres salidas, cada una con su cifra (el doble, dos meses, 10 UVT y un año)." },
  "s-noobligado": { tema: "m06-1", nombre: "Declaración del no obligado y su excepción", prob: "baja",
                    porque: "Regla corta; suele aparecer como distractor o como excepción (art. 6, parágrafo)." },
  "s-forma":      { tema: "m06-1", nombre: "Errores de forma e imputación (Ley 962, art. 43)", prob: "media",
                    porque: "Es la excepción que desplaza a la firmeza y a los plazos de corrección: el operador la usa para sorprender." },
  "s-subir":      { tema: "m06-2", nombre: "Corregir para subir el impuesto (art. 588)", prob: "alta",
                    porque: "Dos condiciones que se cumplen a la vez y una excepción: el formato favorito del operador." },
  "s-bajar":      { tema: "m06-2", nombre: "Corregir para bajar el impuesto (art. 589)", prob: "alta",
                    porque: "Confundir el año del 589 con los tres años de la firmeza es el error más probable del examen." },
  "s-sinsancion": { tema: "m06-2", nombre: "Correcciones que no llevan sanción", prob: "media",
                    porque: "Tres puertas sin sanción que el operador puede poner a competir con el 10 % y el 20 %." },
  "s-peaje":      { tema: "m06-2", nombre: "Cuánto cuesta corregir (art. 644) y el emplazamiento (art. 685)", prob: "alta",
                    porque: "El porcentaje cambia según el acto que ya se notificó y se suma el 5 % por mes si la inicial fue tardía." },
  "s-reloj":      { tema: "m06-3", nombre: "Firmeza: regla general y desde cuándo corre", prob: "alta",
                    porque: "El punto de partida cambia por un detalle del caso (tardía, saldo a favor, devolución, imputación)." },
  "s-largos":     { tema: "m06-3", nombre: "Pérdidas fiscales y precios de transferencia", prob: "media",
                    porque: "El texto del art. 714 dice una cosa y la Ley 2010 de 2019 otra: trampa servida." },
  "s-pausas":     { tema: "m06-3", nombre: "Suspensión del término (art. 706)", prob: "media",
                    porque: "Un emplazamiento o una inspección escondidos en el caso cambian la fecha final." },
  "s-beneficio":  { tema: "m06-3", nombre: "Beneficio de auditoría", prob: "media",
                    porque: "Requisitos que se acumulan: basta que falte uno para volver a la regla general." }
};

APP.data.probTexto = {
  alta: "Alta", media: "Media", baja: "Baja", segura: "Muy alta"
};

/* Competencias comportamentales (Resolución DIAN 65 de 2024). Conductas copiadas de la resolución,
   tal como las traen las lecciones del Plan DIAN Exprés. */
APP.data.competencias = {
  adap: { nombre: "Adaptabilidad",
    def: "Capacidad para comprender diferentes perspectivas y responder oportunamente a diversas situaciones, contextos, medios y personas, modificando su conducta y formas de trabajo, alineadas con el cumplimiento de los objetivos institucionales." },
  etic: { nombre: "Comportamiento ético",
    def: "Capacidad para actuar de acuerdo con prácticas laborales correctas, demostrando congruencia entre el discurso y la actuación, enmarcado en el código de integridad de la DIAN." },
  com: { nombre: "Comunicación efectiva",
    def: "Capacidad para escuchar, entender a otros y transmitir de forma clara y precisa la información requerida, tanto en lo escrito como en lo verbal y gestual, a fin de construir redes de contacto efectivas con los funcionarios y ciudadanos para alcanzar los objetivos institucionales." },
  log: { nombre: "Orientación al logro",
    def: "Capacidad de orientar el trabajo propio para el cumplimiento de los objetivos propuestos en el marco de la estrategia organizacional, bajo estándares de calidad establecidos." },
  usu: { nombre: "Orientación al usuario y al ciudadano",
    def: "Capacidad y disposición para entender y satisfacer las necesidades y expectativas de los usuarios y ciudadanos, según las políticas públicas, los estándares de calidad establecidos y las competencias institucionales." },
  equ: { nombre: "Trabajo en equipo",
    def: "Capacidad para trabajar con otros de forma coordinada, armónica y sinérgica, potenciando los aportes de cada integrante, en pro del logro de los objetivos establecidos." }
};

APP.data.indicadores = {
  "adap-1": { comp: "adap", nivel: 1, resumen: "Pone en práctica los cambios sin resistirse, aprende lo nuevo y enfrenta lo inesperado con disposición.",
    conductas: ["Pone en marcha los cambios que le son propuestos en sus objetivos laborales.",
                "Integra con facilidad nuevas perspectivas, aprendizajes y tecnologías que le permitan cumplir con su labor.",
                "Acepta con disposición el enfrentarse a nuevas e inesperadas situaciones y medios."] },
  "adap-2": { comp: "adap", nivel: 2, resumen: "Revisa sus certezas ante nuevos argumentos, entiende el cambio como sistema y lo promueve.",
    conductas: ["Evalúa las distintas posturas, mostrando apertura para ajustar su accionar ante nuevas evidencias o posibilidades.",
                "Se esfuerza por entender de manera sistémica los cambios y aplica las metodologías y herramientas que propone la organización para facilitar su adaptación.",
                "Apoya y promueve los cambios en las dinámicas laborales y trabaja para llevarlos a cabo, fundamentado en el Código de Integridad."] },
  "etic-1": { comp: "etic", nivel: 1, resumen: "Trabaja conforme al Código de Integridad, lo conoce, lo aplica y lo asume como propio.",
    conductas: ["Demuestra integridad en el ejercicio de sus tareas.",
                "Conoce y aplica el código de integridad de la organización.",
                "Se identifica y asume como propio el código de integridad de la Entidad."] },
  "etic-4": { comp: "etic", nivel: 4, resumen: "Piensa en el efecto de su conducta en el servicio, promueve el Código en los equipos y es referente ético.",
    conductas: ["Es consciente de las repercusiones de su actuación en el servicio que ofrece la entidad, orientando su conducta de acuerdo con el código de integridad.",
                "Promueve en los equipos de trabajo en los que participa la práctica del código de integridad en todas las esferas de actuación.",
                "Es referente en la organización por su comportamiento ético."] },
  "com-1": { comp: "com", nivel: 1, resumen: "Escucha, pregunta lo necesario, habla con respeto y verifica que le entendieron.",
    conductas: ["Hace un uso adecuado de las redes de contacto organizacionales, manteniendo un diálogo respetuoso con superiores, colaboradores, pares y ciudadanos.",
                "Realiza las preguntas adecuadas a fin de obtener la información que necesita, de acuerdo con la necesidad.",
                "Se asegura de que su interlocutor comprenda el mensaje."] },
  "com-2": { comp: "com", nivel: 2, resumen: "Adapta discurso y canal al interlocutor, busca redes que faciliten su gestión y dice acuerdos y desacuerdos con asertividad.",
    conductas: ["Identifica nuevas redes de contacto externas e internas que faciliten su gestión.",
                "Comunica con transparencia y asertividad, tanto los acuerdos como los desacuerdos.",
                "Adapta su discurso y canal de acuerdo con el tipo de interlocutor."] },
  "com-3": { comp: "com", nivel: 3, resumen: "Elige el medio según su efecto, consolida redes de colaboración y quita barreras a la información.",
    conductas: ["Consolida las redes de contacto externas e internas generando un clima de colaboración.",
                "Minimiza las barreras y distorsiones que dificultan la circulación de la información organizacional, para ello puede hacer uso de la tecnología.",
                "Se muestra motivado por generar intercambios de información veraz y efectiva, que faciliten el logro de los objetivos institucionales."] },
  "log-1": { comp: "log", nivel: 1, resumen: "Cumple a tiempo con los recursos asignados, organiza y controla su trabajo y responde por sus objetivos.",
    conductas: ["Cumple con lo solicitado en los tiempos previstos y con los recursos que se le asignan.",
                "Realiza una adecuada organización y control de su propio trabajo para incrementar su productividad, haciendo buen uso de la tecnología.",
                "Se responsabiliza por el logro de los objetivos y actividades propias."] },
  "log-3": { comp: "log", nivel: 3, resumen: "Prevé contingencias, monitorea resultados contra metas y cambia su método, y empuja al equipo bajo presión.",
    conductas: ["Realiza aportes significativos al cumplimiento de los objetivos fijados, enfocando los esfuerzos al logro de los resultados de la dependencia, previendo planes de contingencia para asegurar los resultados.",
                "Monitorea sus resultados en correspondencia con las metas de su dependencia, modificando sus propios métodos de trabajo, de ser necesario, para lograr los resultados esperados.",
                "Promueve en los equipos de trabajo en los que participa el cumplimiento responsable de los resultados, gestionando la presión ante las dificultades que se presenten."] },
  "usu-1": { comp: "usu", nivel: 1, resumen: "Escucha al ciudadano, responde oportuna y actualizadamente, aplica protocolos y atiende con amabilidad.",
    conductas: ["Escucha activamente las necesidades y requerimientos de los ciudadanos y orienta sus esfuerzos en la entrega de respuestas y/o soluciones oportunas, actualizadas y eficientes.",
                "Brinda soluciones a los usuarios y ciudadanos aplicando los protocolos de servicio, los estándares de calidad y haciendo uso de la tecnología disponible.",
                "Muestra disposición de servicio, amabilidad y respeto en la atención a los ciudadanos y usuarios."] },
  "usu-3": { comp: "usu", nivel: 3, resumen: "Tiende puentes entre áreas y entidades, estudia necesidades para mejorar el servicio y actúa con responsabilidad social.",
    conductas: ["Se esmera por cumplir con los requerimientos, creando puentes entre unidades, procesos y entidades, reconociendo el impacto del servicio que presta.",
                "Estudia las necesidades actuales y potenciales de los usuarios y ciudadanos para mejorar consistentemente la calidad del producto o servicio, hace un uso intensivo de la tecnología.",
                "Demuestra respeto y responsabilidad social ante las necesidades actuales y futuras de los usuarios y ciudadanos."] },
  "equ-1": { comp: "equ", nivel: 1, resumen: "Participa, cumple los acuerdos del equipo, colabora y acepta las normas comunes.",
    conductas: ["Participa en las actividades del equipo y cumple con los acuerdos, en pro de la consecución de los objetivos establecidos.",
                "Colabora con los demás integrantes del equipo.",
                "Acepta las normas comunes de trabajo establecidas para la consecución de los resultados."] },
  "equ-2": { comp: "equ", nivel: 2, resumen: "Coopera y ayuda, aporta su conocimiento y reconoce el aporte y la opinión de cada uno.",
    conductas: ["Interactúa con los demás miembros del equipo en el marco de los valores institucionales, para el logro de los objetivos establecidos.",
                "Aporta su conocimiento y reconoce el aporte de cada integrante del equipo, entendiendo el valor de la diversidad de opinión.",
                "Muestra disposición para ayudar a otros miembros del equipo, con el fin de aunar esfuerzos hacia un objetivo común."] }
};

/* Valores del Código de Integridad de la DIAN (CG-TAH-0002, versión 3). */
APP.data.valores = {
  "v-hon": { nombre: "Honestidad", def: "Actúo siempre con fundamento en la verdad, cumpliendo mis deberes con transparencia y rectitud y favoreciendo el interés general." },
  "v-res": { nombre: "Respeto", def: "Reconozco, valoro y trato de manera digna a todas las personas, con sus virtudes y defectos, sin importar su labor, su procedencia, sus títulos o cualquier otra condición." },
  "v-comp": { nombre: "Compromiso", def: "Soy consciente de la importancia de mi rol como servidor público y estoy en disposición permanente para comprender y resolver las necesidades de las personas con las que me relaciono en mis labores cotidianas, buscando siempre mejorar su bienestar." },
  "v-dil": { nombre: "Diligencia", def: "Cumplo con los deberes, funciones y responsabilidades asignadas a mi cargo de la mejor manera posible, con atención, prontitud, destreza y eficiencia, para así optimizar el uso de los recursos del Estado." },
  "v-jus": { nombre: "Justicia", def: "Actúo con imparcialidad garantizando los derechos de las personas, con equidad, igualdad y sin discriminación." }
};

APP.data.usuarios = {
  laura: {
    nombre: "Laura", empleo: "Gestor II · código 302, grado 02",
    indicadores: ["adap-1", "adap-2", "etic-1", "etic-4", "com-1", "com-3", "log-1", "usu-1", "equ-1", "equ-2"]
  },
  juandavid: {
    nombre: "Juan David", empleo: "Gestor III · código 303, grado 03",
    indicadores: ["adap-1", "etic-1", "etic-4", "com-1", "com-2", "log-1", "log-3", "usu-1", "usu-3", "equ-1"]
  }
};

/* Niveles del jugador: la carrera que quieren recorrer. */
APP.data.niveles = [
  { xp: 0, nombre: "Aspirante" },
  { xp: 120, nombre: "Inscrito" },
  { xp: 300, nombre: "Admitido" },
  { xp: 550, nombre: "Citado a prueba" },
  { xp: 850, nombre: "Gestor I" },
  { xp: 1250, nombre: "Gestor II" },
  { xp: 1750, nombre: "Gestor III" },
  { xp: 2350, nombre: "Gestor IV" },
  { xp: 3050, nombre: "Gestor V" },
  { xp: 3900, nombre: "Jefe de División" },
  { xp: 4900, nombre: "Subdirector" },
  { xp: 6100, nombre: "Director Seccional" },
  { xp: 7500, nombre: "Primer puesto de la lista" }
];


/* ===== src/data/laminas.js ===== */
/* Álbum de láminas. Cada lámina es un dato o una regla que se domina con repasos espaciados.
   Funcionales: textos confrontados el 22-oct-2026 en secretariasenado.gov.co (ET arts. 6, 579-2, 580, 580-1,
   588, 589, 594-2, 641, 644, 685, 689-3, 705, 706, 714; Ley 962 de 2005, art. 43, con su cuadro de unificación).
   Cuadros desplegables leídos el 19-oct-2026 para la lección M06 (bitácora exprés).
   Campos: id, pag (página del álbum), sub (subtema), t (título), q (pregunta de repaso), a (respuesta),
   por (por qué tiene sentido), trampa, src (fuente), tri (domina | reconoce), prob, num (cifras clave). */
var APP = window.APP || (window.APP = {});
APP.data = APP.data || {};

APP.data.paginas = [
  { id: "p1", nombre: "¿Vale o no vale?", tema: "m06-1", tipo: "funcional", color: "y" },
  { id: "p2", nombre: "Las puertas para corregir", tema: "m06-2", tipo: "funcional", color: "b" },
  { id: "p3", nombre: "El peaje de corregir", tema: "m06-2", tipo: "funcional", color: "p" },
  { id: "p4", nombre: "El reloj de la firmeza", tema: "m06-3", tipo: "funcional", color: "o" },
  { id: "p5", nombre: "Pausas y atajos del reloj", tema: "m06-3", tipo: "funcional", color: "g" },
  { id: "p6", nombre: "Tus competencias", tema: "comp", tipo: "comportamental", color: "b" },
  { id: "p7", nombre: "El método de los tres pasos", tema: "comp", tipo: "comportamental", color: "y" },
  { id: "p8", nombre: "Los valores del Código", tema: "integ", tipo: "integridad", color: "g" }
];

APP.data.laminas = [
  /* ---------------- Página 1 · ¿Vale o no vale? ---------------- */
  { id: "f01", pag: "p1", sub: "s-nopres", t: "Cuatro causas de «no presentada»",
    q: "¿En qué cuatro casos una declaración se tiene por no presentada según el art. 580?",
    a: "a) No se presenta en los lugares señalados. b) No trae la identificación del declarante o la trae equivocada. c) No contiene los factores para identificar las bases gravables. d) No la firma quien debe declarar, o falta la firma del contador o del revisor fiscal estando obligado. El deber de declarar sigue sin cumplirse.",
    por: "Sin lugar, sin quién, sin qué o sin firma no hay declaración: hay un papel sin dueño o sin contenido.",
    trampa: "El literal e (retención sin pago) fue derogado en 2010: esa situación vive hoy en el art. 580-1 y tiene otro efecto.",
    src: "ET, art. 580; literal e derogado por la Ley 1430 de 2010, art. 67.", tri: "domina", num: [] },
  { id: "f02", pag: "p1", sub: "s-nopres", t: "Obligado a declarar en línea",
    q: "¿Qué pasa si quien está obligado a declarar por medios electrónicos presenta por otro medio? ¿Y si el sistema de la DIAN falló el último día?",
    a: "Se tiene por no presentada. Pero si los servicios electrónicos de la DIAN no estuvieron disponibles, o hubo fuerza mayor, no hay sanción de extemporaneidad si se presenta a más tardar el día siguiente al restablecimiento. La fuerza mayor se prueba ante la DIAN.",
    por: "El canal obligatorio hace parte de la forma de declarar. La caída del sistema no es culpa del declarante: le dan un día.",
    trampa: "El día de gracia es «al día siguiente» del restablecimiento, no al día siguiente del vencimiento.",
    src: "ET, art. 579-2 (incisos de la Ley 1607 de 2012, art. 136).", tri: "reconoce", num: ["1 día"] },
  { id: "f03", pag: "p1", sub: "s-nopres", t: "Sanear con el 2 %",
    q: "¿Cómo se sanea una declaración no presentada por lugar, identificación o firma (literales a, b y d)?",
    a: "Por el procedimiento de corrección del art. 588, liquidando el 2 % de la sanción de extemporaneidad del art. 641, sin pasar de 1.300 UVT. Solo mientras no se haya notificado sanción por no declarar. El literal c no está en esa lista.",
    por: "Lugar, identificación y firma son fallas de forma: se arreglan con una multa pequeña, el 2 % de lo que costaría haber declarado tarde.",
    trampa: "Si ya le notificaron la sanción por no declarar, esta puerta se cerró. Y si faltan las bases gravables (literal c), el 2 % no sirve.",
    src: "ET, art. 588, parágrafo 2 (Ley 223 de 1995; cifras en UVT por la Ley 1111 de 2006).", tri: "domina", num: ["2 %", "1.300 UVT"] },
  { id: "f04", pag: "p1", sub: "s-retsinpago", t: "Retención sin pago: ineficaz",
    q: "¿Qué efecto tiene una declaración de retención en la fuente presentada sin pago total?",
    a: "No produce efecto legal alguno, sin necesidad de acto administrativo que así lo declare. La ineficacia opera sola.",
    por: "La retención es plata ajena que el agente solo administra. Declararla sin entregarla no sirve de nada.",
    trampa: "No es una declaración «no presentada» del art. 580: es ineficaz por el art. 580-1. Y no hay que esperar a que la DIAN lo diga.",
    src: "ET, art. 580-1, inciso 1 (Ley 1430 de 2010, art. 15).", tri: "domina", num: [] },
  { id: "f05", pag: "p1", sub: "s-retsinpago", t: "Salida 1: el saldo a favor doble",
    q: "¿Cuándo produce efectos la retención sin pago gracias a un saldo a favor?",
    a: "Si el agente tiene un saldo a favor igual o superior a dos veces la retención a cargo, generado antes de presentar la declaración de retención, y pide la compensación dentro de los seis meses siguientes a esa presentación. Si no la pide a tiempo o se la rechazan, la declaración no produce efecto, otra vez sin acto.",
    por: "Si tienes con qué pagar, con margen (el doble), y lo pides pronto, el fisco se cobra solo.",
    trampa: "Las tres condiciones van juntas: el doble, generado antes y pedido en seis meses. Si el saldo nació después de presentar la retención, no sirve aunque sea enorme.",
    src: "ET, art. 580-1, incisos 2 a 4 (inciso 2 modificado por la Ley 1819 de 2016, art. 270).", tri: "domina", num: ["2 veces", "6 meses"] },
  { id: "f06", pag: "p1", sub: "s-retsinpago", t: "Salida 2: dos meses de gracia",
    q: "¿Cuándo produce efectos la retención sin pago si el agente paga después?",
    a: "Si la declaración se presentó antes del vencimiento del plazo y el pago total se hace a más tardar dentro de los dos meses siguientes al vencimiento, con intereses de mora. Mientras tanto, la declaración sirve de título para el cobro coactivo, aunque el sistema la marque como ineficaz.",
    por: "Es un premio a quien declaró a tiempo: dos meses para conseguir la plata.",
    trampa: "Si la declaración se presentó tarde, esta salida no existe. Los dos meses se cuentan desde el vencimiento, no desde la presentación.",
    src: "ET, art. 580-1, inciso 5 (Ley 2010 de 2019, art. 101).", tri: "domina", num: ["2 meses"] },
  { id: "f07", pag: "p1", sub: "s-retsinpago", t: "Salida 3: la deuda pequeña",
    q: "¿Cuándo produce efectos la retención sin pago si lo que quedó debiendo es poco?",
    a: "Si el valor dejado de pagar no supera 10 UVT y se paga a más tardar dentro del año siguiente al vencimiento del plazo, con intereses de mora.",
    por: "Una deuda pequeña no justifica borrar la declaración: le dan un año para pagarla.",
    trampa: "10 UVT de 2026 son 523.740 pesos. Si debe más, esta salida no aplica, aunque pague dentro del año.",
    src: "ET, art. 580-1, parágrafo 3 (Ley 2277 de 2022, art. 78).", tri: "domina", num: ["10 UVT", "1 año"] },
  { id: "f08", pag: "p1", sub: "s-noobligado", t: "El no obligado y su excepción",
    q: "¿Qué efecto tiene la declaración que presenta quien no estaba obligado? ¿Cuál es la excepción?",
    a: "No produce efecto legal alguno (art. 594-2). Excepción: la persona natural residente a quien le practicaron retenciones y no está obligada a declarar renta puede presentarla, y esa declaración sí produce efectos legales (art. 6, parágrafo).",
    por: "Sin deber no hay declaración, salvo para recuperar lo que le retuvieron.",
    trampa: "«No producirá efecto legal alguno» no es absoluto: antes de aplicarlo, busca la norma que lo exceptúa.",
    src: "ET, arts. 594-2 (Ley 223 de 1995) y 6, parágrafo (Ley 1607 de 2012, art. 1).", tri: "domina", num: [] },
  { id: "f09", pag: "p1", sub: "s-forma", t: "Errores de forma: en cualquier tiempo",
    q: "¿Cómo se corrigen los errores de forma que no afectan el valor por declarar?",
    a: "Los errores en el concepto del tributo, el año o el periodo se corrigen de oficio o a solicitud, sin sanción, en cualquier tiempo, si no afectan el valor por declarar. La DIAN también puede corregir así errores de NIT, de imputación o aritméticos que no sean relevantes para el fondo. La declaración corregida reemplaza a la original si el interesado no objeta por escrito dentro del mes siguiente al aviso.",
    por: "Prevalece la verdad real sobre la formal: corregir un rótulo no le quita nada al fisco.",
    trampa: "«En cualquier tiempo» es de esta norma, no de la corrección general de los arts. 588 y 589.",
    src: "Ley 962 de 2005, art. 43.", tri: "domina", num: ["1 mes"] },
  { id: "f10", pag: "p1", sub: "s-forma", t: "Imputación: no la detiene la firmeza",
    q: "¿Hasta cuándo se puede corregir un error al imputar un saldo a favor al periodo siguiente?",
    a: "La solicitud con base en el art. 43 de la Ley 962 no está sometida al término de firmeza ni a los plazos de los arts. 588 y 589, y permite aumentar o disminuir lo imputado.",
    por: "Es la misma plata del contribuyente, mal trasladada de una casilla a otra.",
    trampa: "Un caso que diga «las declaraciones ya están en firme» puede tener como respuesta correcta «procede la corrección».",
    src: "Consejo de Estado, Sección Cuarta, sentencia de unificación 2022CE-SUJ-4-002 (8-sep-2022), reglas 1 y 2.", tri: "domina", prob: "media", num: [] },

  /* ---------------- Página 2 · Las puertas para corregir ---------------- */
  { id: "f11", pag: "p2", sub: "s-subir", t: "La puerta para subir",
    q: "¿Qué dos condiciones exige el art. 588 para corregir y aumentar el impuesto o disminuir el saldo a favor?",
    a: "Las dos a la vez: hacerlo dentro de los tres años siguientes al vencimiento del plazo para declarar, y antes de que se notifique requerimiento especial o pliego de cargos sobre esa declaración.",
    por: "Subir le conviene al fisco: la puerta queda abierta los mismos tres años que tiene la DIAN para revisar. Cuando la DIAN ya formuló su reclamo, corregir deja de ser voluntario.",
    trampa: "Con una sola condición no alcanza: si llegó el requerimiento, la puerta se cerró aunque falten meses para los tres años.",
    src: "ET, art. 588, inciso 1 (Ley 2010 de 2019, art. 107).", tri: "domina", num: ["3 años"] },
  { id: "f12", pag: "p2", sub: "s-subir", t: "La excepción del término de respuesta",
    q: "¿Se puede corregir para subir después de los tres años?",
    a: "Sí, si la corrección se hace dentro del término para responder un pliego de cargos o un emplazamiento para corregir: la ley la tiene por válida aunque el término del art. 588 esté vencido.",
    por: "Si la DIAN te invita a corregir, no puede cerrarte la puerta mientras corre el plazo para responderle.",
    trampa: "Cuidado con el 10 %: si corrige porque lo emplazaron, ya va en el 20 %.",
    src: "ET, art. 588, parágrafo 1 (Ley 6 de 1992, art. 65).", tri: "domina", num: [] },
  { id: "f13", pag: "p2", sub: "s-sinsancion", t: "Toda declaración nueva es corrección",
    q: "¿Qué es una declaración que se presenta después de la inicial? ¿Y si no cambia el valor?",
    a: "Es una corrección de la inicial o de la última corrección, aunque se titule de otra forma. Y la corrección cabe aunque no cambie el valor a pagar ni el saldo a favor: en ese caso no se liquida sanción.",
    por: "Para la ley solo hay una declaración por periodo, con sus versiones.",
    trampa: "Una opción que diga «reemplaza a la inicial sin ser corrección» está mal.",
    src: "ET, art. 588, incisos 2 y 4.", tri: "reconoce", num: [] },
  { id: "f14", pag: "p2", sub: "s-bajar", t: "La puerta para bajar",
    q: "¿Cómo y dentro de qué plazo se corrige para disminuir el valor a pagar o aumentar el saldo a favor?",
    a: "Presentando la declaración por el medio al que esté obligado el contribuyente, dentro del año siguiente al vencimiento del término para declarar. No lleva sanción de corrección.",
    por: "Bajar le cuesta al fisco: la puerta se cierra rápido, en un año.",
    trampa: "«Todavía no está en firme» no abre esta puerta. El plazo es un año, no tres.",
    src: "ET, art. 589, inciso 1 (Ley 1819 de 2016, art. 274), y art. 644, parágrafo 4.", tri: "domina", num: ["1 año"] },
  { id: "f15", pag: "p2", sub: "s-bajar", t: "El procedimiento que ya no rige",
    q: "¿Hay que pedirle permiso a la DIAN para corregir a la baja?",
    a: "No. El texto anterior exigía una solicitud previa y una liquidación oficial de corrección dentro de seis meses (Ley 223 de 1995). Desde la Ley 1819 de 2016 basta presentar la declaración dentro del año.",
    por: "Hoy no se pide permiso: se presenta la declaración.",
    trampa: "Si una opción habla de «solicitud» y «liquidación oficial de corrección», describe un texto derogado.",
    src: "ET, art. 589, cuadro «Legislación anterior».", tri: "reconoce", num: ["6 meses (texto viejo)"] },
  { id: "f16", pag: "p2", sub: "s-bajar", t: "Bajar le da tiempo nuevo a la DIAN",
    q: "Después de una corrección que baja el valor, ¿desde cuándo se cuenta el término de revisión?",
    a: "Desde la fecha de la corrección. Esa corrección no impide que la DIAN revise la declaración.",
    por: "Lo que le cuesta plata al fisco le da tiempo nuevo a la DIAN.",
    trampa: "La corrección que sube el impuesto (588) no mueve el reloj: solo la del 589 tiene esta regla.",
    src: "ET, art. 589, inciso 2.", tri: "domina", num: [] },
  { id: "f17", pag: "p2", sub: "s-sinsancion", t: "Diferencia de criterio: sin sanción",
    q: "¿Cuándo el mayor valor de una corrección no lleva sanción por venir de una diferencia de criterio?",
    a: "Cuando viene de una diferencia de interpretación del derecho entre la DIAN y el declarante y los hechos declarados son completos y verdaderos. Se corrige siguiendo el procedimiento del art. 589 y explicando las razones. La DIAN puede señalar esas diferencias en el emplazamiento para corregir.",
    por: "Equivocarse en cómo se interpreta la norma, con hechos completos y verdaderos, no es esconderle nada al fisco.",
    trampa: "Si faltó un hecho (un ingreso omitido, un dato falso), ya no es diferencia de criterio: hay sanción.",
    src: "ET, art. 588, inciso 3, y art. 685, inciso 2.", tri: "domina", num: [] },
  { id: "f18", pag: "p2", sub: "s-sinsancion", t: "Corregir antes del vencimiento",
    q: "¿Qué sanción lleva una corrección hecha antes de que venza el plazo para declarar?",
    a: "Ninguna. El 10 % del art. 644 es para la corrección hecha «después del vencimiento del plazo para declarar».",
    por: "Mientras el plazo no ha vencido, el fisco todavía no ha perdido nada.",
    trampa: "Antes del vencimiento no se aplica ni el 10 % ni el 20 %.",
    src: "ET, art. 644, numeral 1 (Ley 1819 de 2016, art. 285).", tri: "domina", num: ["0 %"] },
  { id: "f39", pag: "p2", sub: "s-subir", t: "Dos años: el número viejo",
    q: "¿De dónde sale el «dos años» que aparece en algunas opciones sobre corrección y firmeza?",
    a: "Es el término anterior. Hasta la Ley 2010 de 2019 se corregía para subir dentro de dos años, y el texto original del art. 714 fijaba la firmeza en dos años. Hoy son tres en los dos casos.",
    por: "Los números viejos siguen en internet y en la memoria de muchos: el operador los usa como distractor.",
    trampa: "Si ve «dos años» en una opción de corrección o de firmeza, sospeche.",
    src: "ET, art. 588 (Ley 2010 de 2019, art. 107) y art. 714, cuadro «Legislación anterior».", tri: "reconoce", num: ["2 años (viejo)"] },

  /* ---------------- Página 3 · El peaje de corregir ---------------- */
  { id: "f19", pag: "p3", sub: "s-peaje", t: "10 %: corregir por iniciativa propia",
    q: "¿Cuándo la sanción por corrección es del 10 %?",
    a: "Cuando se corrige después del vencimiento del plazo para declarar y antes de que se notifique un emplazamiento para corregir o un auto que ordene inspección tributaria. Se calcula sobre el mayor valor a pagar o el menor saldo a favor.",
    por: "Corregir por cuenta propia, antes de que la DIAN toque la puerta, cuesta poco.",
    trampa: "El auto de inspección tributaria pesa igual que el emplazamiento: después de cualquiera de los dos ya no es 10 %.",
    src: "ET, art. 644, numeral 1.", tri: "domina", num: ["10 %"] },
  { id: "f20", pag: "p3", sub: "s-peaje", t: "20 %: corregir porque tocaron la puerta",
    q: "¿Cuándo la sanción por corrección es del 20 %?",
    a: "Cuando se corrige después de notificado el emplazamiento para corregir o el auto que ordena inspección tributaria, y antes de que se notifique el requerimiento especial o el pliego de cargos.",
    por: "El emplazamiento es la DIAN tocando la puerta: corregir porque te tocaron cuesta el doble.",
    trampa: "Después del requerimiento especial ya no hay corrección voluntaria del art. 588 (eso lo verán en M07).",
    src: "ET, art. 644, numeral 2.", tri: "domina", num: ["20 %"] },
  { id: "f21", pag: "p3", sub: "s-peaje", t: "El 5 % que persigue a la tardanza",
    q: "¿Qué se suma a la sanción por corrección si la declaración inicial fue extemporánea?",
    a: "Un 5 % del mayor valor por cada mes o fracción de mes entre el vencimiento del plazo y la presentación de la declaración inicial, sin que la sanción total pase del 100 % del mayor valor.",
    por: "Es el mismo 5 % por mes de la extemporaneidad (art. 641): la tardanza inicial se sigue pagando en la corrección.",
    trampa: "Un mes y un día son dos fracciones: se suman 10 puntos, no 5.",
    src: "ET, art. 644, parágrafo 1.", tri: "domina", num: ["5 % por mes", "tope 100 %"] },
  { id: "f22", pag: "p3", sub: "s-peaje", t: "Lo que no entra en la cuenta",
    q: "¿Qué no se incluye al calcular la sanción por corrección y a qué corrección no se aplica?",
    a: "Los intereses de mora se cobran aparte; el mayor valor no incluye la propia sanción; y la sanción no se aplica a la corrección del art. 589.",
    por: "La sanción castiga la corrección; los intereses pagan el tiempo. Son dos cuentas distintas.",
    trampa: "Si una opción suma los intereses a la base de la sanción, está mal.",
    src: "ET, art. 644, parágrafos 2, 3 y 4.", tri: "reconoce", num: [] },
  { id: "f23", pag: "p3", sub: "s-peaje", t: "El emplazamiento: invitación, no orden",
    q: "¿Cuánto tiempo da el emplazamiento para corregir y qué pasa si no se responde?",
    a: "Da un mes desde su notificación para corregir con la sanción del art. 644 (20 %). No responderlo no ocasiona sanción alguna.",
    por: "Es una invitación de la DIAN: no aceptarla no se castiga.",
    trampa: "Si una opción dice que el silencio frente al emplazamiento se sanciona, está mal. Lo que sí produce es una pausa de un mes en el reloj de la DIAN.",
    src: "ET, art. 685, inciso 1.", tri: "domina", num: ["1 mes"] },

  /* ---------------- Página 4 · El reloj de la firmeza ---------------- */
  { id: "f24", pag: "p4", sub: "s-reloj", t: "Tres años y dos lados del mismo reloj",
    q: "¿Cuándo queda en firme una declaración según la regla general?",
    a: "Si dentro de los tres años siguientes al vencimiento del plazo para declarar no se notifica requerimiento especial. Es el mismo término que el art. 705 le da a la DIAN para notificar ese requerimiento.",
    por: "La DIAN tiene tres años para revisar, y el contribuyente los mismos tres para subir el impuesto (art. 588).",
    trampa: "Firmeza de una declaración privada (art. 714) no es firmeza de un acto administrativo del CPACA.",
    src: "ET, arts. 714, inciso 1, y 705 (Ley 1819 de 2016).", tri: "domina", num: ["3 años"] },
  { id: "f25", pag: "p4", sub: "s-reloj", t: "Si declaró tarde",
    q: "Si la declaración inicial fue extemporánea, ¿desde cuándo se cuentan los tres años?",
    a: "Desde la fecha en que se presentó, no desde el vencimiento.",
    por: "La DIAN no puede revisar lo que todavía no existía.",
    trampa: "El vencimiento manda solo si declaró a tiempo.",
    src: "ET, arts. 714, inciso 1, y 705.", tri: "domina", num: [] },
  { id: "f26", pag: "p4", sub: "s-reloj", t: "Si pidió devolución o compensación",
    q: "Si la declaración tiene saldo a favor y se pidió su devolución o compensación, ¿desde cuándo se cuentan los tres años?",
    a: "Desde la fecha de la solicitud de devolución o compensación.",
    por: "Si le pides plata al fisco, la DIAN gana tiempo para revisar antes de soltarla.",
    trampa: "Si el saldo no se pidió sino que se llevó al periodo siguiente, no hay solicitud: rige el vencimiento.",
    src: "ET, art. 714, inciso 2, y art. 705.", tri: "domina", num: [] },
  { id: "f27", pag: "p4", sub: "s-reloj", t: "Si imputó el saldo a favor",
    q: "Si el saldo a favor se imputó en la declaración del periodo siguiente, ¿qué término de firmeza rige?",
    a: "El general: tres años desde el vencimiento del plazo para declarar (o desde la presentación, si fue extemporánea).",
    por: "Imputar no es pedir plata al fisco: no hay solicitud que mueva el reloj.",
    trampa: "No se cuenta desde que «se usó» el saldo en el periodo siguiente.",
    src: "ET, art. 714, inciso 2, segunda frase.", tri: "domina", num: [] },
  { id: "f28", pag: "p4", sub: "s-reloj", t: "La regla madre del reloj",
    q: "¿Cómo se resume en una sola idea desde cuándo corre el reloj de la DIAN?",
    a: "Corre desde el último de estos hechos: el vencimiento del plazo, la presentación tardía o la solicitud de devolución o compensación. Una corrección que baja el valor (art. 589) le da a la DIAN un término de revisión desde esa corrección. Subir el impuesto (art. 588) no mueve nada.",
    por: "Cada vez que el contribuyente le pide plata al fisco o le baja el impuesto, la DIAN recibe tiempo para revisar.",
    trampa: "Es una síntesis de Claude para recordar: en el examen se responde con la regla de cada artículo.",
    src: "Síntesis de los arts. 589, 705 y 714 del ET.", tri: "domina", num: [] },
  { id: "f29", pag: "p4", sub: "s-reloj", t: "Cómo se cuentan los años",
    q: "¿Cómo se cuentan los tres años de firmeza y qué pasa si el último día es feriado?",
    a: "Por el calendario común: tres años desde el 14 de mayo de 2024 terminan el 14 de mayo de 2027. Si el último día es feriado, el plazo se corre al primer día hábil.",
    por: "Los años y los meses se cuentan de fecha a fecha; solo los días se cuentan hábiles.",
    trampa: "No se descuentan feriados dentro de los años: solo se corre el último día si cae en feriado.",
    src: "Ley 4.ª de 1913, arts. 59 y 62.", tri: "reconoce", num: [] },
  { id: "f30", pag: "p4", sub: "s-largos", t: "Pérdidas y precios de transferencia: cinco años",
    q: "¿Cuál es el término de firmeza de la declaración de renta que determina o compensa pérdidas fiscales o que está sujeta al régimen de precios de transferencia?",
    a: "Cinco años (Ley 2010 de 2019, art. 117). El texto del art. 714 todavía dice «el término para compensar» (pérdidas) y «seis años» (precios de transferencia), pero esa ley posterior y especial los fijó en cinco.",
    por: "Lo complejo se mira más tiempo: cinco años.",
    trampa: "Seis años es el texto del 714 para precios de transferencia; el Consejo de Estado (2021) lo aplicó mientras rigió. Para el examen, con la ley vigente: cinco.",
    src: "Ley 2010 de 2019, art. 117 (C-384 de 2022, inhibida); ET, art. 714; CE, unificación 2021CE-SUJ-4-001.", tri: "domina", num: ["5 años", "6 años (texto del 714)"] },
  { id: "f31", pag: "p4", sub: "s-reloj", t: "El segundo reloj",
    q: "Además de los tres años sin requerimiento, ¿en qué otro caso queda en firme la declaración?",
    a: "Cuando, notificado el requerimiento especial, vence el término para practicar la liquidación de revisión y esta no se notifica. Ese segundo reloj se estudia en M07.",
    por: "La DIAN también tiene plazo para terminar lo que empezó.",
    trampa: "Notificar el requerimiento no deja la declaración abierta para siempre.",
    src: "ET, art. 714, inciso 3.", tri: "reconoce", prob: "baja", num: [] },

  /* ---------------- Página 5 · Pausas y atajos ---------------- */
  { id: "f32", pag: "p5", sub: "s-pausas", t: "Pausa: inspección de oficio",
    q: "¿Cuánto se suspende el término para notificar el requerimiento si la DIAN ordena una inspección tributaria de oficio?",
    a: "Tres meses, contados desde la notificación del auto que la decreta.",
    por: "La DIAN está trabajando en el expediente: su reloj se detiene tres meses.",
    trampa: "La de oficio tiene número fijo (tres meses); la pedida por el contribuyente, no.",
    src: "ET, art. 706, inciso 2 (Ley 223 de 1995, art. 251).", tri: "domina", num: ["3 meses"] },
  { id: "f33", pag: "p5", sub: "s-pausas", t: "Pausa: inspección pedida por el contribuyente",
    q: "¿Cuánto se suspende el término si la inspección tributaria la pidió el contribuyente?",
    a: "Mientras dure la inspección.",
    por: "Si el contribuyente la pidió, el reloj espera a que termine.",
    trampa: "No son tres meses: es lo que dure.",
    src: "ET, art. 706, inciso 3.", tri: "domina", num: ["lo que dure"] },
  { id: "f34", pag: "p5", sub: "s-pausas", t: "Pausa: emplazamiento para corregir",
    q: "¿Cuánto se suspende el término para notificar el requerimiento cuando se notifica un emplazamiento para corregir?",
    a: "Durante el mes siguiente a la notificación del emplazamiento.",
    por: "El mismo mes que el contribuyente tiene para responder (art. 685) es el mes que se congela el reloj (art. 706).",
    trampa: "No responder no se sanciona, pero la pausa ocurre igual. Es el dato que más se esconde en los casos.",
    src: "ET, art. 706, inciso 4.", tri: "domina", num: ["1 mes"] },
  { id: "f35", pag: "p5", sub: "s-beneficio", t: "El atajo: beneficio de auditoría",
    q: "¿En cuánto tiempo queda en firme la declaración de renta con beneficio de auditoría?",
    a: "Para los años gravables 2022 a 2026: a los seis meses desde su presentación si el impuesto neto de renta sube al menos 35 % frente al año anterior; a los doce meses si sube al menos 25 %.",
    por: "Más subes, más rápido quedas libre.",
    trampa: "Se cuenta desde la presentación, no desde el vencimiento. Un aumento menor al 25 % no da beneficio.",
    src: "ET, art. 689-3 (Ley 2155 de 2021, art. 51); prórroga a 2024-2026 por la Ley 2294 de 2023, art. 69.", tri: "domina", num: ["35 % → 6 meses", "25 % → 12 meses"] },
  { id: "f36", pag: "p5", sub: "s-beneficio", t: "Requisitos que se acumulan",
    q: "¿Qué requisitos exige el beneficio de auditoría?",
    a: "Presentación oportuna, pago total dentro de los plazos y que dentro del término no se notifique emplazamiento para corregir, requerimiento especial, emplazamiento especial ni liquidación provisional. Si falta uno, vuelve la regla general.",
    por: "El atajo es un premio al cumplido: un solo incumplimiento lo quita.",
    trampa: "Pagar la última cuota tarde también tumba el beneficio.",
    src: "ET, art. 689-3, incisos 1 y 2.", tri: "domina", num: [] },
  { id: "f37", pag: "p5", sub: "s-beneficio", t: "Cuándo no hay atajo",
    q: "¿En qué casos no procede el beneficio de auditoría aunque el impuesto suba?",
    a: "Si el impuesto neto del año con el que se compara es inferior a 71 UVT; si el contribuyente goza de beneficios por su ubicación en una zona geográfica; si se demuestra que las retenciones declaradas son inexistentes. Si hay pérdida, la DIAN conserva la facultad de revisarla. Las correcciones antes de la firmeza especial no hacen perder el beneficio si se mantienen los requisitos, y el plazo para pedir la devolución del saldo a favor es el de esa firmeza.",
    por: "Subir el 35 % sobre casi nada no merece premio.",
    trampa: "Los 71 UVT se miden en el año anterior, el de comparación, no en el año que se declara.",
    src: "ET, art. 689-3, incisos 3, 4 y 6, y parágrafos 1, 2 y 3.", tri: "reconoce", num: ["71 UVT"] },
  { id: "f38", pag: "p5", sub: "s-beneficio", t: "La UVT de 2026",
    q: "¿Cuánto vale la UVT de 2026 y cuánto suman 10, 71 y 1.300 UVT?",
    a: "52.374 pesos. 10 UVT = 523.740; 71 UVT = 3.718.554; 1.300 UVT = 68.086.200.",
    por: "Sirve para saber si un caso con pesos cruza una frontera.",
    trampa: "Los casos pueden dar la cifra en pesos para que tú la conviertas.",
    src: "Resolución DIAN 000238 de 2025.", tri: "reconoce", num: ["52.374"] },

  /* ---------------- Página 6 · Tus competencias (una por indicador) ---------------- */
  { id: "c-adap-1", pag: "p6", sub: "c:adap-1", ind: "adap-1", t: "Adaptabilidad · nivel 1",
    q: "¿Qué conductas describe el nivel 1 de adaptabilidad?", a: "Pone en marcha los cambios que le proponen; integra con facilidad nuevas perspectivas, aprendizajes y tecnologías; acepta con disposición las situaciones nuevas e inesperadas.",
    por: "Cuando la entidad cambia algo, lo aplicas sin resistirte.", trampa: "La prudencia disfrazada: «hasta que demuestre que funciona», «mientras termino de entenderlo». Va a A.", src: "Resolución DIAN 65 de 2024.", tri: "domina" },
  { id: "c-adap-2", pag: "p6", sub: "c:adap-2", ind: "adap-2", t: "Adaptabilidad · nivel 2",
    q: "¿Qué agrega el nivel 2 de adaptabilidad?", a: "Revisa sus certezas ante nuevas evidencias o argumentos; entiende el cambio como sistema y usa las metodologías que propone la entidad; apoya y promueve los cambios.",
    por: "El nivel 1 acepta y aplica; el 2 revisa lo que cree y empuja el cambio.", trampa: "Revisar tus certezas es D; revisar las decisiones de la entidad para frenarlas es A.", src: "Resolución DIAN 65 de 2024.", tri: "domina" },
  { id: "c-etic-1", pag: "p6", sub: "c:etic-1", ind: "etic-1", t: "Comportamiento ético · nivel 1",
    q: "¿Qué conductas describe el nivel 1 de comportamiento ético?", a: "Demuestra integridad en sus tareas; conoce y aplica el código de integridad; se identifica con él y lo asume como propio.",
    por: "Es la base de todo: actuar conforme al Código.", trampa: "La justificación noble (buena fe, urgencia, confianza) para apartarse de una regla va a A.", src: "Resolución DIAN 65 de 2024.", tri: "domina" },
  { id: "c-etic-4", pag: "p6", sub: "c:etic-4", ind: "etic-4", t: "Comportamiento ético · nivel 4",
    q: "¿Qué conductas describe el nivel 4 de comportamiento ético?", a: "Es consciente de las repercusiones de su actuación en el servicio; promueve el código de integridad en los equipos en que participa; es referente ético en la organización.",
    por: "El nivel 4 mira hacia afuera: tu ética influye en otros.", trampa: "«No intervengo, es responsabilidad de cada quien» suena respetuoso y va a A.", src: "Resolución DIAN 65 de 2024.", tri: "domina" },
  { id: "c-com-1", pag: "p6", sub: "c:com-1", ind: "com-1", t: "Comunicación efectiva · nivel 1",
    q: "¿Qué conductas describe el nivel 1 de comunicación efectiva?", a: "Mantiene un diálogo respetuoso con todos; hace las preguntas adecuadas para obtener la información; se asegura de que su interlocutor comprenda el mensaje.",
    por: "Informar no basta: hay que verificar que el otro entendió.", trampa: "«Doy la información completa una vez y que cada quien la interprete» va a A.", src: "Resolución DIAN 65 de 2024.", tri: "domina" },
  { id: "c-com-2", pag: "p6", sub: "c:com-2", ind: "com-2", t: "Comunicación efectiva · nivel 2",
    q: "¿Qué agrega el nivel 2 de comunicación efectiva?", a: "Identifica nuevas redes de contacto que faciliten su gestión; comunica con transparencia y asertividad acuerdos y desacuerdos; adapta su discurso y canal al tipo de interlocutor.",
    por: "El nivel 1 verifica la comprensión; el 2 ajusta la forma a cada persona y se atreve a disentir con respeto.", trampa: "Guardarse un desacuerdo «para no generar conflictos» va a A.", src: "Resolución DIAN 65 de 2024.", tri: "domina" },
  { id: "c-com-3", pag: "p6", sub: "c:com-3", ind: "com-3", t: "Comunicación efectiva · nivel 3",
    q: "¿Qué agrega el nivel 3 de comunicación efectiva?", a: "Consolida redes de contacto con clima de colaboración; minimiza las barreras y distorsiones que impiden que la información circule, incluso con tecnología; busca intercambios de información veraz y efectiva.",
    por: "El nivel 1 cuida una conversación; el 3 cuida cómo circula la información en la organización.", trampa: "«Un único canal para no duplicar esfuerzos, aunque algunos no lo consulten» va a A.", src: "Resolución DIAN 65 de 2024.", tri: "domina" },
  { id: "c-log-1", pag: "p6", sub: "c:log-1", ind: "log-1", t: "Orientación al logro · nivel 1",
    q: "¿Qué conductas describe el nivel 1 de orientación al logro?", a: "Cumple lo solicitado en los tiempos previstos y con los recursos asignados; organiza y controla su propio trabajo usando bien la tecnología; se responsabiliza por sus objetivos.",
    por: "Cumplir lo propio, a tiempo.", trampa: "Invertir más tiempo para hacer bien la tarea no es falla; vencer el plazo sí.", src: "Resolución DIAN 65 de 2024.", tri: "domina" },
  { id: "c-log-3", pag: "p6", sub: "c:log-3", ind: "log-3", t: "Orientación al logro · nivel 3",
    q: "¿Qué agrega el nivel 3 de orientación al logro?", a: "Hace aportes a los resultados de la dependencia previendo planes de contingencia; monitorea sus resultados frente a las metas y cambia su método si hace falta; promueve el cumplimiento en el equipo y gestiona la presión.",
    por: "El nivel 1 cumple; el 3 se anticipa y mide.", trampa: "«Ejecuto con los recursos disponibles en el momento de la implementación» es improvisar: A.", src: "Resolución DIAN 65 de 2024.", tri: "domina" },
  { id: "c-usu-1", pag: "p6", sub: "c:usu-1", ind: "usu-1", t: "Orientación al usuario · nivel 1",
    q: "¿Qué conductas describe el nivel 1 de orientación al usuario y al ciudadano?", a: "Escucha activamente y entrega respuestas oportunas, actualizadas y eficientes; aplica los protocolos de servicio y la tecnología disponible; atiende con disposición, amabilidad y respeto.",
    por: "Atender bien a quien tienes enfrente.", trampa: "Las barreras con apariencia correcta (orden de llegada rígido, «consulte la página») van a A.", src: "Resolución DIAN 65 de 2024.", tri: "domina" },
  { id: "c-usu-3", pag: "p6", sub: "c:usu-3", ind: "usu-3", t: "Orientación al usuario · nivel 3",
    q: "¿Qué agrega el nivel 3 de orientación al usuario y al ciudadano?", a: "Crea puentes entre unidades, procesos y entidades para cumplir los requerimientos; estudia las necesidades actuales y futuras para mejorar el servicio, con uso intensivo de la tecnología; actúa con responsabilidad social.",
    por: "El nivel 1 atiende; el 3 conecta áreas para que el caso se resuelva entero.", trampa: "«Resuelvo lo mío y que él gestione lo de otras áreas» va a A.", src: "Resolución DIAN 65 de 2024.", tri: "domina" },
  { id: "c-equ-1", pag: "p6", sub: "c:equ-1", ind: "equ-1", t: "Trabajo en equipo · nivel 1",
    q: "¿Qué conductas describe el nivel 1 de trabajo en equipo?", a: "Participa y cumple los acuerdos del equipo; colabora con los demás; acepta las normas comunes de trabajo.",
    por: "Cumplir lo acordado aunque hubieras preferido otra cosa.", trampa: "La eficiencia como excusa para romper los acuerdos va a A.", src: "Resolución DIAN 65 de 2024.", tri: "domina" },
  { id: "c-equ-2", pag: "p6", sub: "c:equ-2", ind: "equ-2", t: "Trabajo en equipo · nivel 2",
    q: "¿Qué agrega el nivel 2 de trabajo en equipo?", a: "Interactúa con el equipo en el marco de los valores institucionales; aporta su conocimiento y reconoce el aporte de cada uno, valorando la diversidad de opinión; muestra disposición para ayudar a los demás.",
    por: "El nivel 1 cumple; el 2 ayuda y comparte.", trampa: "Guardarse lo aprendido «para no recargar a los compañeros» suena considerado y va a A.", src: "Resolución DIAN 65 de 2024.", tri: "domina" },

  /* ---------------- Página 7 · El método ---------------- */
  { id: "m-pasos", pag: "p7", sub: "c:metodo", t: "Los tres pasos",
    q: "¿Cuáles son los tres pasos para decidir el extremo de una afirmación?",
    a: "1. Conducta: la oración principal, comparada con el diccionario o el Código, en sentido directo o inverso. 2. Condición: la segunda parte, ¿es un costo de hacer bien la conducta o es una falla? 3. Extremo: directa sin condición o con costo, D; inversa, o directa con falla, A.",
    por: "Manda la oración principal; la condición solo la confirma o la voltea.", trampa: "La pregunta no es «quién paga», sino «¿costo o falla?».", src: "Método del Plan DIAN Exprés.", tri: "domina" },
  { id: "m-costo", pag: "p7", sub: "c:metodo", t: "Costo o falla",
    q: "¿Cómo se distingue un costo de una falla en la segunda parte de una afirmación?",
    a: "Costo: más tiempo, más esfuerzo, salir del área, actuar sin instrucciones, que otros no lo vean necesario. Falla: se vence un plazo, se aplaza lo planeado por el área, se deja a alguien sin atender, se decide sin pruebas, se salta un requisito, se favorece a alguien.",
    por: "Un costo no cambia la respuesta; una falla la voltea.", trampa: "«Aunque haya otros esperando su turno» es costo; «aunque deje sin atender a los demás» es falla.", src: "Método del Plan DIAN Exprés.", tri: "domina" },
  { id: "m-extremos", pag: "p7", sub: "c:metodo", t: "Por qué los extremos",
    q: "¿Por qué conviene marcar un extremo aunque se dude?",
    a: "Cada afirmación vale de 1 a 4 puntos según qué tan cerca quede del extremo favorable. B y C nunca dan el máximo. Si crees más en una dirección que en la otra, el extremo de esa dirección rinde más en promedio.",
    por: "En la revisión de ANLA, el máximo puntaje estuvo siempre en A o en D.", trampa: "La «respuesta prudente» (B o C) no protege.", src: "Revisión de la prueba de ANLA (FUAA); criterio de Claude.", tri: "domina" },
  { id: "m-perfeccion", pag: "p7", sub: "c:metodo", t: "Afirmaciones de control",
    q: "¿Cómo se reconocen y cómo se responden las afirmaciones de control (perfección)?",
    a: "Hablan de sentimientos, de toda la vida o de no fallar nunca, y no describen una conducta del diccionario ni una pauta del Código. Se responden con honestidad, normalmente A o B. Si la frase repite una pauta del Código, aunque diga «siempre» o «nunca», es una pauta: extremo favorable.",
    por: "La guía anuncia «dos subescalas de control» para detectar respuestas exageradamente favorables.", trampa: "No todas son cortas: algunas mezclan un sentimiento con una conducta para hacerte dudar.", src: "Guía DIAN 2676, num. 4.7; criterio de Claude.", tri: "domina" },
  { id: "m-negacion", pag: "p7", sub: "c:metodo", t: "La doble negación",
    q: "¿Qué hacer cuando el verbo niega algo prohibido («evito», «me niego a», «no acepto»)?",
    a: "Leerlo como una conducta buena: negar lo prohibido es cumplir. Va a D.",
    por: "«Evito dar trato preferencial» es lo mismo que «doy trato igual».", trampa: "La negación asusta y empuja a marcar A sin pensar.", src: "Método del Plan DIAN Exprés.", tri: "domina" },
  { id: "m-abogado", pag: "p7", sub: "c:metodo", t: "La trampa del abogado",
    q: "¿En qué consiste la trampa del abogado?",
    a: "Leer con prudencia jurídica lo que la prueba mide como disposición: ver ilegalidad en «fuera de mi competencia», imprudencia en «respuestas rápidas» o ineficiencia en «ajustes que otros consideran innecesarios».",
    por: "En la revisión de ANLA, seis de ocho errores fueron esta trampa.", trampa: "La prueba comportamental no evalúa legalidad: evalúa conducta.", src: "Revisión de ANLA; lecciones del Plan DIAN Exprés.", tri: "domina" },
  { id: "m-virtud", pag: "p7", sub: "c:metodo", t: "La virtud aparente",
    q: "¿Qué es la virtud aparente?",
    a: "Una palabra que suena bien y esconde la conducta contraria: «revisar cuidadosamente» decisiones para frenarlas, ejecutar «con los recursos disponibles» sin prever, guardarse un desacuerdo «para no generar conflictos».",
    por: "La palabra amable distrae de lo que de verdad hace la persona.", trampa: "Pregúntate qué hace la persona, no cómo suena.", src: "Revisión de ANLA; lecciones del Plan DIAN Exprés.", tri: "domina" },

  /* ---------------- Página 8 · Los valores del Código ---------------- */
  { id: "v-hon", pag: "p8", sub: "v:v-hon", val: "v-hon", t: "Honestidad",
    q: "¿Qué hace y qué no hace un servidor honesto según el Código de Integridad de la DIAN?",
    a: "Dice la verdad aunque se haya equivocado; pide orientación cuando duda; facilita información pública; denuncia faltas; cumple aunque nadie lo supervise; guarda la confidencialidad; se aparta cuando hay conflicto de intereses. No da trato preferencial, no acepta favores ni incentivos, no usa recursos públicos para fines personales, no presta su carné.",
    por: "Para ser impecable no se necesitan testigos.", trampa: "«De bajo valor», «en agradecimiento», «de confianza»: justificaciones que no convierten la falta en pauta.", src: "Código de Integridad DIAN, CG-TAH-0002, v3.", tri: "domina" },
  { id: "v-res", pag: "p8", sub: "v:v-res", val: "v-res", t: "Respeto",
    q: "¿Qué hace y qué no hace un servidor respetuoso según el Código?",
    a: "Atiende con amabilidad e igualdad a todas las personas; está abierto al diálogo; expone su posición con argumentos y consideración; contribuye al buen clima laboral. No discrimina, no decide por estereotipos o prejuicios, no usa ironía, burla ni sarcasmo.",
    por: "Dignidad para todos, en palabras, gestos y actitudes.", trampa: "«Para hacerme respetar» o «cuando la situación lo amerita» disfrazan la falta.", src: "Código de Integridad DIAN, v3.", tri: "domina" },
  { id: "v-comp", pag: "p8", sub: "v:v-comp", val: "v-comp", t: "Compromiso",
    q: "¿Qué hace y qué no hace un servidor comprometido según el Código?",
    a: "Asume su papel de servidor; se pone en los zapatos del otro; escucha, atiende y orienta a quien lo necesite; presta un servicio ágil y amable; redobla esfuerzos en situaciones extraordinarias; se capacita. No trabaja con actitud negativa, no ve su trabajo como un favor, no ignora a un ciudadano.",
    por: "Servir es un compromiso y un orgullo, no un favor.", trampa: "«Ya entendí de qué se trata» no justifica distraerse mientras el ciudadano habla.", src: "Código de Integridad DIAN, v3.", tri: "domina" },
  { id: "v-dil", pag: "p8", sub: "v:v-dil", val: "v-dil", t: "Diligencia",
    q: "¿Qué hace y qué no hace un servidor diligente según el Código?",
    a: "Usa responsablemente los recursos públicos; cumple los tiempos de cada obligación; asegura la calidad de lo que entrega; propone mejoras a tiempo; conoce el ordenamiento de su función. No malgasta recursos, no posterga decisiones que resuelven problemas ciudadanos, no evade sus funciones.",
    por: "Atención, prontitud, destreza y eficiencia.", trampa: "«Con la idea de completarlo después» disfraza una gestión a medias.", src: "Código de Integridad DIAN, v3.", tri: "domina" },
  { id: "v-jus", pag: "p8", sub: "v:v-jus", val: "v-jus", t: "Justicia",
    q: "¿Qué hace y qué no hace un servidor justo según el Código?",
    a: "Decide con información objetiva, evidencias y datos confiables; protege los derechos de cada persona según sus necesidades; decide con diálogo y concertación. No afecta la igualdad, no favorece a un grupo de interés sin oír a todos, no deja que simpatías, antipatías o presiones interfieran en su criterio.",
    por: "Imparcialidad con equidad e igualdad.", trampa: "Decidir rápido «los casos que parecen sencillos» sin revisar las pruebas va a A.", src: "Código de Integridad DIAN, v3.", tri: "domina" },
  { id: "v-disfraz", pag: "p8", sub: "v:metodo", t: "Las justificaciones que disfrazan una falta",
    q: "¿Cuáles son las justificaciones más comunes que disfrazan una falta en las afirmaciones de integridad?",
    a: "«De bajo valor», «en agradecimiento», «de confianza», «cuando ya terminé mis pendientes», «si considero que puedo manejarla», «para hacerme respetar», «para preparar mejor la atención», «cuando la situación lo amerita», «siempre que no perjudique a los demás».",
    por: "Ninguna convierte la falta en pauta: la conducta sigue siendo la del «lo que no hago».", trampa: "La afirmación con «aunque» más un costo es otra cosa: describe una pauta que cuesta cumplir, y va a D.", src: "Código de Integridad DIAN, v3; lecciones del Plan DIAN Exprés.", tri: "domina" }
];


/* ===== src/data/escenas.js ===== */
/* Escenas: lecciones de un minuto que arman los tres mapas, pieza por pieza.
   Cada escena desbloquea láminas y cierra con una comprobación.
   Las tres preguntas de cada mapa son la herramienta para el día de la prueba. */
var APP = window.APP || (window.APP = {});
APP.data = APP.data || {};

APP.data.mapas = {
  "m06-1": { nombre: "¿Vale o no vale?", preguntas: ["¿Qué defecto tiene?", "¿Qué le pasa?", "¿Hay salida?"],
    ramas: [
      { k: "nopres", defecto: "Lugar, identificación o firma", norma: "Art. 580, literales a, b y d", efecto: "No presentada", efectoCol: "p",
        salida: "Se sanea por el art. 588: 2 % de la sanción del art. 641, sin pasar de 1.300 UVT, si no le han notificado sanción por no declarar.", lam: ["f01", "f03"] },
      { k: "bases", defecto: "Sin los datos de las bases gravables", norma: "Art. 580, literal c", efecto: "No presentada", efectoCol: "p",
        salida: "El 2 % no la cubre: ese literal no está en la lista.", lam: ["f01", "f03"] },
      { k: "papel", defecto: "Obligado en línea que usa otro medio", norma: "Art. 579-2", efecto: "No presentada", efectoCol: "p",
        salida: "Si falló el sistema de la DIAN: declarar a más tardar el día siguiente al restablecimiento, sin extemporaneidad.", lam: ["f02"] },
      { k: "ret", defecto: "Retención en la fuente sin pago total", norma: "Art. 580-1", efecto: "Sin efecto, sin acto", efectoCol: "o",
        salida: "Tres salidas: saldo a favor del doble, anterior, compensación pedida en 6 meses · presentada a tiempo y pagada en 2 meses · deuda de hasta 10 UVT pagada en 1 año.", lam: ["f04", "f05", "f06", "f07"] },
      { k: "noobl", defecto: "La presentó quien no estaba obligado", norma: "Art. 594-2", efecto: "Sin efecto", efectoCol: "o",
        salida: "Excepción: la persona natural residente con retenciones sí puede declarar, y produce efectos (art. 6).", lam: ["f08"] },
      { k: "forma", defecto: "Error de concepto, año, periodo, NIT, imputación o aritmético", norma: "Ley 962, art. 43", efecto: "Vale", efectoCol: "g",
        salida: "Se corrige de oficio o a solicitud, sin sanción y en cualquier tiempo, si no afecta el valor.", lam: ["f09", "f10"] }
    ] },
  "m06-2": { nombre: "Las puertas para corregir", preguntas: ["¿Sube o baja?", "¿Está a tiempo?", "¿Cuánto cuesta?"],
    puertas: [
      { k: "subir", nombre: "Subir el impuesto", norma: "Art. 588", col: "y",
        reglas: ["Dentro de los 3 años siguientes al vencimiento.", "Antes del requerimiento especial o del pliego de cargos.", "Las dos condiciones a la vez."],
        excepcion: "Vale aunque pasen los 3 años si se corrige en el término para responder un emplazamiento o un pliego.", lam: ["f11", "f12"] },
      { k: "bajar", nombre: "Bajar el impuesto o subir el saldo a favor", norma: "Art. 589", col: "b",
        reglas: ["Dentro del año siguiente al vencimiento.", "Se presenta la declaración: no se pide permiso.", "Sin sanción.", "La revisión de la DIAN corre desde esa corrección."],
        excepcion: "«No está en firme» no abre esta puerta.", lam: ["f14", "f15", "f16"] },
      { k: "gratis", nombre: "Corregir sin sanción", norma: "Arts. 588 y 644", col: "g",
        reglas: ["Diferencia de criterio con hechos completos y verdaderos.", "Corrección que no cambia el valor.", "Corrección antes del vencimiento."],
        excepcion: "Si faltó un hecho, ya no es diferencia de criterio.", lam: ["f13", "f17", "f18"] },
      { k: "forma", nombre: "Errores de forma", norma: "Ley 962, art. 43", col: "o",
        reglas: ["Concepto, año o periodo; NIT, imputación o aritmético.", "En cualquier tiempo y sin sanción.", "La imputación de saldos no se detiene por la firmeza."],
        excepcion: "«En cualquier tiempo» es solo de esta norma.", lam: ["f09", "f10"] }
    ],
    peaje: [
      { cuando: "Antes del vencimiento", pct: "0 %" },
      { cuando: "Después del vencimiento, sin acto de la DIAN", pct: "10 %" },
      { cuando: "Después del emplazamiento o del auto de inspección", pct: "20 %" },
      { cuando: "Después del requerimiento o del pliego", pct: "Cerrada" }
    ],
    peajeNota: "Si la declaración inicial fue tardía: + 5 % por cada mes o fracción de retardo, sin pasar del 100 %. Los intereses van aparte." },
  "m06-3": { nombre: "El reloj de la firmeza", preguntas: ["¿Desde cuándo?", "¿Cuánto dura?", "¿Hubo pausas?"],
    desde: [
      { k: "V", t: "Vencimiento", d: "Si declaró a tiempo, o si imputó el saldo a favor.", lam: ["f24", "f27"] },
      { k: "P", t: "Presentación", d: "Si declaró tarde.", lam: ["f25"] },
      { k: "S", t: "Solicitud de devolución o compensación", d: "Si pidió el saldo a favor.", lam: ["f26"] },
      { k: "C", t: "Corrección a la baja", d: "La revisión corre desde esa corrección (art. 589).", lam: ["f16"] }
    ],
    cuanto: [
      { k: "3a", t: "3 años", d: "Regla general.", lam: ["f24"] },
      { k: "5a", t: "5 años", d: "Pérdidas fiscales o precios de transferencia.", lam: ["f30"] },
      { k: "12m", t: "12 meses", d: "Beneficio de auditoría con aumento de al menos 25 %.", lam: ["f35"] },
      { k: "6m", t: "6 meses", d: "Beneficio de auditoría con aumento de al menos 35 %.", lam: ["f35"] }
    ],
    pausas: [
      { k: "of", t: "+ 3 meses", d: "Inspección tributaria de oficio.", lam: ["f32"] },
      { k: "so", t: "+ lo que dure", d: "Inspección pedida por el contribuyente.", lam: ["f33"] },
      { k: "em", t: "+ 1 mes", d: "Emplazamiento para corregir, aunque no se responda.", lam: ["f34"] }
    ],
    nota: "El beneficio de auditoría (años 2022 a 2026) exige presentar y pagar a tiempo, que no llegue ningún acto en ese término y un impuesto base de al menos 71 UVT." }
};

APP.data.escenas = [
  /* ---------- Mapa 1 ---------- */
  { id: "e01", tema: "m06-1", mapa: "m06-1", foco: ["nopres", "ret", "noobl"], lam: ["f01", "f04", "f08"],
    titulo: "Tres maneras de que una declaración no sirva",
    cuerpo: ["El Estatuto tiene tres consecuencias distintas para una declaración defectuosa, y el operador las pone a competir.",
             "No presentada (art. 580): el deber de declarar sigue sin cumplirse.",
             "Sin efecto (art. 580-1): la retención presentada sin pago total no produce efecto alguno, y no hace falta que la DIAN lo diga.",
             "Sin efecto (art. 594-2): la declaración de quien no estaba obligado."],
    porque: "Sin lugar, sin quién, sin qué o sin firma no hay declaración. Sin plata, la retención no sirve. Sin deber, el papel no produce nada.",
    check: { q: "Un agente de retención presentó a tiempo su declaración de retención, pero sin pagar. No tiene saldos a favor y ya pasaron cuatro meses. ¿Qué le pasa a la declaración?",
      ops: [{ t: "No produce efecto legal alguno, sin necesidad de acto de la DIAN.", ok: true, por: "Art. 580-1: la ineficacia opera sola." },
            { t: "Se tiene por no presentada, por el literal e del art. 580.", ok: false, por: "Ese literal fue derogado en 2010; hoy rige el art. 580-1." },
            { t: "Es válida mientras la DIAN no expida un acto que la declare ineficaz.", ok: false, por: "La ineficacia no necesita acto administrativo." }] } },
  { id: "e02", tema: "m06-1", mapa: "m06-1", foco: ["nopres", "bases", "papel"], lam: ["f02", "f03"],
    titulo: "No presentada: cuándo se sanea con el 2 %",
    cuerpo: ["Lugar, identificación y firma (literales a, b y d) se sanean por el procedimiento de corrección del art. 588.",
             "Se liquida el 2 % de la sanción de extemporaneidad, sin pasar de 1.300 UVT, siempre que no se haya notificado sanción por no declarar.",
             "El literal c (sin datos de las bases gravables) no está en la lista.",
             "Quien debe declarar en línea y usa otro medio también la tiene por no presentada (art. 579-2). Si falló el sistema de la DIAN, tiene hasta el día siguiente al restablecimiento."],
    porque: "Son fallas de forma: se arreglan con el 2 % de lo que costaría declarar tarde. Si faltan las bases, no hay nada que arreglar.",
    check: { q: "Una sociedad presentó su IVA sin la firma del contador, estando obligada. La DIAN ya le notificó la sanción por no declarar. ¿Puede sanearla con el 2 %?",
      ops: [{ t: "No: esa vía exige que no se haya notificado la sanción por no declarar.", ok: true, por: "Art. 588, par. 2." },
            { t: "Sí: la falta de firma siempre se sanea con el 2 %, sin pasar de 1.300 UVT.", ok: false, por: "Falta la condición: que no se haya notificado sanción por no declarar." },
            { t: "Sí, pero sin sanción, porque es un error de forma del art. 43 de la Ley 962.", ok: false, por: "La firma obligatoria es una causa del art. 580, no un error de forma de la Ley 962." }] } },
  { id: "e03", tema: "m06-1", mapa: "m06-1", foco: ["ret"], lam: ["f05", "f06", "f07"],
    titulo: "Retención sin pago: tres salidas con tres números",
    cuerpo: ["Salida 1 · El doble: saldo a favor de al menos dos veces la retención, generado antes de presentarla, y compensación pedida dentro de los 6 meses siguientes.",
             "Salida 2 · Dos meses: presentada antes del vencimiento y pagada toda dentro de los 2 meses siguientes al vencimiento, con intereses.",
             "Salida 3 · La deuda pequeña: lo que quedó debiendo no supera 10 UVT y se paga dentro del año siguiente al vencimiento, con intereses."],
    porque: "Si tiene con qué pagar, si declaró a tiempo o si debe poco, la ley le da una salida. Si no, la declaración no sirve.",
    check: { q: "Un agente presentó a tiempo su retención sin pagar 30 millones. No tiene saldos a favor. Pagó todo nueve semanas después del vencimiento. ¿Produce efectos?",
      ops: [{ t: "No: pagó después de los dos meses y la deuda supera 10 UVT.", ok: true, por: "Nueve semanas pasan de dos meses, y 30 millones superan con creces 10 UVT." },
            { t: "Sí: presentó a tiempo y pagó con intereses.", ok: false, por: "La salida 2 exige pagar dentro de los dos meses siguientes al vencimiento." },
            { t: "Sí: tiene un año para pagar.", ok: false, por: "El año es solo para deudas de hasta 10 UVT." }] } },
  { id: "e04", tema: "m06-1", mapa: "m06-1", foco: ["forma", "noobl"], lam: ["f09", "f10"],
    titulo: "El error de forma y la puerta de cualquier tiempo",
    cuerpo: ["Los errores de concepto, año o periodo, que no afectan el valor, se corrigen de oficio o a solicitud, sin sanción y en cualquier tiempo (Ley 962, art. 43).",
             "La DIAN también corrige así errores de NIT, de imputación o aritméticos que no sean relevantes para el fondo.",
             "El Consejo de Estado unificó en 2022: corregir un error de imputación de saldos a favor no se detiene por la firmeza ni por los plazos de los arts. 588 y 589."],
    porque: "Corregir un rótulo no le quita nada al fisco: prevalece la verdad real sobre la formal.",
    check: { q: "Una cooperativa imputó mal su saldo a favor al año siguiente. Las dos declaraciones ya están en firme. ¿Procede corregir la imputación?",
      ops: [{ t: "Sí: la corrección de errores de imputación no se detiene por la firmeza.", ok: true, por: "Unificación 2022CE-SUJ-4-002, regla 1." },
            { t: "No: la firmeza cerró cualquier corrección.", ok: false, por: "Es la regla general, que la unificación desplaza en este caso." },
            { t: "Sí, pero solo dentro del año siguiente al vencimiento.", ok: false, por: "Ese es el plazo del art. 589, al que esta corrección no está sometida." }] } },
  /* ---------- Mapa 2 ---------- */
  { id: "e05", tema: "m06-2", mapa: "m06-2", foco: ["subir"], lam: ["f11", "f13"],
    titulo: "La puerta para subir: dos condiciones a la vez",
    cuerpo: ["Para aumentar el impuesto o disminuir el saldo a favor (art. 588) se necesitan dos cosas a la vez:",
             "Hacerlo dentro de los 3 años siguientes al vencimiento del plazo para declarar.",
             "Y antes de que le notifiquen el requerimiento especial o el pliego de cargos.",
             "Toda declaración nueva es una corrección de la anterior, aunque se titule distinto."],
    porque: "Subir le conviene al fisco: la puerta queda abierta los mismos 3 años que tiene la DIAN para revisar.",
    check: { q: "Han pasado 20 meses desde el vencimiento y ya le notificaron el requerimiento especial. ¿Puede corregir voluntariamente para subir?",
      ops: [{ t: "No por el art. 588: el requerimiento ya cerró esa puerta.", ok: true, por: "Falta la segunda condición." },
            { t: "Sí: no han pasado tres años.", ok: false, por: "Una sola condición no basta." },
            { t: "Sí, con el 20 %.", ok: false, por: "El 20 % es para después del emplazamiento y antes del requerimiento." }] } },
  { id: "e06", tema: "m06-2", mapa: "m06-2", foco: ["subir"], lam: ["f12", "f39"],
    titulo: "La excepción del término de respuesta",
    cuerpo: ["El parágrafo del art. 588 permite corregir válidamente aunque ya hayan pasado los 3 años, si la corrección se hace dentro del término para responder un pliego de cargos o un emplazamiento para corregir.",
             "El emplazamiento da un mes para responder (art. 685).",
             "Ojo con el número viejo: antes eran dos años para corregir y para la firmeza. Hoy son tres."],
    porque: "Si la DIAN te invita a corregir, no puede cerrarte la puerta mientras corre el plazo para responderle.",
    check: { q: "Le notificaron un emplazamiento diez días antes de cumplirse tres años del vencimiento. Corrige quince días después de cumplidos los tres años. ¿Vale?",
      ops: [{ t: "Sí: corrigió dentro del mes para responder el emplazamiento.", ok: true, por: "Pasaron 25 días desde la notificación: parágrafo del art. 588." },
            { t: "No: ya pasaron los tres años.", ok: false, por: "El parágrafo la salva." },
            { t: "Sí, porque el emplazamiento congela los tres años del contribuyente.", ok: false, por: "Lo que se congela (art. 706) es el término de la DIAN, no el del contribuyente." }] } },
  { id: "e07", tema: "m06-2", mapa: "m06-2", foco: ["bajar"], lam: ["f14", "f15", "f16"],
    titulo: "La puerta para bajar: un año",
    cuerpo: ["Para disminuir el valor a pagar o aumentar el saldo a favor (art. 589) se presenta la declaración dentro del año siguiente al vencimiento.",
             "No lleva sanción y no se pide permiso: el procedimiento de solicitud y liquidación oficial en seis meses ya no rige.",
             "La revisión de la DIAN se cuenta desde la fecha de esa corrección."],
    porque: "Bajar le cuesta al fisco: la puerta se cierra rápido, y la DIAN gana tiempo para revisar.",
    check: { q: "Pasaron 15 meses desde el vencimiento. La contadora dice que puede bajar el impuesto porque la declaración «todavía no está en firme». ¿Tiene razón?",
      ops: [{ t: "No: para bajar el plazo es de un año, y ya pasó.", ok: true, por: "Art. 589." },
            { t: "Sí: mientras no esté en firme, puede corregir en cualquier sentido.", ok: false, por: "Confunde la firmeza (3 años) con el plazo del 589 (1 año)." },
            { t: "Sí, si pide permiso a la DIAN y esta lo acepta en seis meses.", ok: false, por: "Es el procedimiento derogado." }] } },
  { id: "e08", tema: "m06-2", mapa: "m06-2", foco: ["gratis"], lam: ["f17", "f18"],
    titulo: "Correcciones que no pagan peaje",
    cuerpo: ["Diferencia de criterio: si el mayor valor sale de interpretar distinto el derecho y los hechos declarados eran completos y verdaderos, no hay sanción. Se corrige siguiendo el procedimiento del art. 589 y explicando las razones.",
             "La DIAN puede señalar esas diferencias en el propio emplazamiento.",
             "Tampoco hay sanción si la corrección no cambia el valor, ni si se hace antes del vencimiento."],
    porque: "Interpretar distinto, con hechos completos y verdaderos, no es esconderle nada al fisco.",
    check: { q: "Una empresa corrige para subir el impuesto porque había omitido unos ingresos. Dice que es una «diferencia de criterio». ¿Hay sanción?",
      ops: [{ t: "Sí: omitir ingresos no es diferencia de criterio.", ok: true, por: "La diferencia de criterio exige hechos completos y verdaderos." },
            { t: "No: toda corrección voluntaria es gratuita.", ok: false, por: "Solo algunas lo son." },
            { t: "No, si explica sus razones por escrito.", ok: false, por: "Explicar las razones es un requisito, no una salida para cualquier corrección." }] } },
  { id: "e09", tema: "m06-2", mapa: "m06-2", foco: ["peaje"], lam: ["f19", "f20", "f21", "f22"],
    titulo: "El peaje: 10, 20 y el 5 que persigue",
    cuerpo: ["Después del vencimiento y antes de que la DIAN toque la puerta: 10 % del mayor valor.",
             "Después del emplazamiento para corregir o del auto de inspección tributaria, y antes del requerimiento: 20 %.",
             "Si la declaración inicial fue tardía, se suma 5 % por cada mes o fracción de retardo, sin pasar del 100 %.",
             "Los intereses de mora van aparte y la sanción no entra en la base."],
    porque: "Corregir porque te tocaron la puerta cuesta el doble. Y la tardanza inicial te persigue con el mismo 5 % por mes de la extemporaneidad.",
    check: { q: "La inicial salió un mes y tres días tarde. Corrige sin que la DIAN le haya escrito. ¿Cuánto paga de sanción?",
      ops: [{ t: "20 % del mayor valor.", ok: true, por: "10 % más 5 % por cada una de las dos fracciones." },
            { t: "15 % del mayor valor.", ok: false, por: "Un mes y tres días son dos fracciones, no una." },
            { t: "10 % del mayor valor.", ok: false, por: "Falta sumar el retardo de la inicial." }] } },
  { id: "e10", tema: "m06-2", mapa: "m06-2", foco: ["peaje"], lam: ["f23"],
    titulo: "El emplazamiento: una invitación",
    cuerpo: ["El emplazamiento para corregir da un mes desde su notificación para corregir con la sanción del art. 644.",
             "No responderlo no ocasiona sanción alguna.",
             "Pero sí congela un mes el reloj de la DIAN para notificar el requerimiento (art. 706)."],
    porque: "Es una invitación: no aceptarla no se castiga. El mismo mes que tienes para responder es el mes que la DIAN gana.",
    check: { q: "Una empresa no respondió el emplazamiento. ¿Qué es cierto?",
      ops: [{ t: "No hay sanción, pero el término de la DIAN se suspendió un mes.", ok: true, por: "Arts. 685 y 706." },
            { t: "Recibirá una sanción por no responder.", ok: false, por: "El art. 685 dice que no ocasiona sanción alguna." },
            { t: "Nada cambia: el emplazamiento sin respuesta no produce efectos.", ok: false, por: "Sí produce la suspensión de un mes." }] } },
  /* ---------- Mapa 3 ---------- */
  { id: "e11", tema: "m06-3", mapa: "m06-3", foco: ["V", "3a"], lam: ["f24", "f29"],
    titulo: "Tres años y dos lados del mismo reloj",
    cuerpo: ["La declaración queda en firme si en los 3 años siguientes al vencimiento no se notifica requerimiento especial (art. 714).",
             "Es el mismo término que tiene la DIAN para notificarlo (art. 705).",
             "Los años se cuentan de fecha a fecha. Si el último día es feriado, se corre al primer día hábil."],
    porque: "La DIAN tiene 3 años para revisar; el contribuyente, los mismos 3 para subir el impuesto.",
    check: { q: "Declaró a tiempo; el plazo vencía el 14 de mayo de 2024. Sin otras novedades, ¿hasta cuándo puede la DIAN notificar el requerimiento?",
      ops: [{ t: "Hasta el 14 de mayo de 2027.", ok: true, por: "Tres años de fecha a fecha desde el vencimiento." },
            { t: "Hasta el 14 de mayo de 2026.", ok: false, por: "Dos años era el término viejo." },
            { t: "Hasta el 14 de mayo de 2029.", ok: false, por: "Cinco años es solo para pérdidas y precios de transferencia." }] } },
  { id: "e12", tema: "m06-3", mapa: "m06-3", foco: ["P", "S", "C"], lam: ["f25", "f26", "f27", "f28"],
    titulo: "¿Desde cuándo corre el reloj?",
    cuerpo: ["Si declaró tarde: desde la presentación.",
             "Si pidió devolución o compensación del saldo a favor: desde la solicitud.",
             "Si imputó el saldo al periodo siguiente: regla general, desde el vencimiento.",
             "Si corrigió a la baja: la revisión corre desde esa corrección. Subir el impuesto no mueve el reloj."],
    porque: "Cada vez que le pides plata al fisco o le bajas el impuesto, la DIAN recibe tiempo para revisar.",
    check: { q: "Declaró a tiempo con saldo a favor y, cinco meses después, pidió la devolución. ¿Desde cuándo corren los tres años?",
      ops: [{ t: "Desde la solicitud de devolución.", ok: true, por: "Art. 714, inc. 2." },
            { t: "Desde el vencimiento del plazo.", ok: false, por: "Eso sería si hubiera imputado el saldo." },
            { t: "Desde la presentación de la declaración.", ok: false, por: "La presentación manda solo si fue tardía." }] } },
  { id: "e13", tema: "m06-3", mapa: "m06-3", foco: ["5a"], lam: ["f30", "f31"],
    titulo: "Los relojes largos",
    cuerpo: ["Las declaraciones de renta que determinan o compensan pérdidas fiscales y las de quienes están en el régimen de precios de transferencia quedan en firme a los 5 años (Ley 2010 de 2019, art. 117).",
             "El texto del art. 714 todavía dice «el término para compensar» y «seis años»: es la trampa servida.",
             "También queda en firme si, notificado el requerimiento, vence el término para la liquidación de revisión y esta no llega (lo verán en M07)."],
    porque: "Lo complejo se mira más tiempo: cinco años.",
    check: { q: "Una empresa del régimen de precios de transferencia declaró a tiempo la renta de 2025. ¿Cuál es su término de firmeza?",
      ops: [{ t: "Cinco años.", ok: true, por: "Ley 2010 de 2019, art. 117." },
            { t: "Seis años.", ok: false, por: "Es el texto del art. 714 que esa ley desplazó." },
            { t: "Tres años.", ok: false, por: "La regla general cede ante la especial." }] } },
  { id: "e14", tema: "m06-3", mapa: "m06-3", foco: ["of", "so", "em"], lam: ["f32", "f33", "f34"],
    titulo: "Las pausas del reloj",
    cuerpo: ["Inspección tributaria de oficio: el término para notificar el requerimiento se suspende 3 meses desde el auto que la decreta.",
             "Inspección pedida por el contribuyente: mientras dure.",
             "Emplazamiento para corregir: el mes siguiente a su notificación, aunque no se responda.",
             "En la práctica, el último día se corre lo mismo que dure la pausa."],
    porque: "Mientras la DIAN trabaja el expediente, su reloj se detiene.",
    check: { q: "Le notificaron un auto que decreta inspección de oficio dentro del término. ¿Cuánto se corre el último día?",
      ops: [{ t: "Tres meses.", ok: true, por: "Art. 706." },
            { t: "Un mes.", ok: false, por: "Un mes es por el emplazamiento." },
            { t: "Lo que dure la inspección.", ok: false, por: "Eso es cuando la pide el contribuyente." }] } },
  { id: "e15", tema: "m06-3", mapa: "m06-3", foco: ["12m", "6m"], lam: ["f35", "f36", "f37", "f38"],
    titulo: "El atajo: beneficio de auditoría",
    cuerpo: ["Renta de los años 2022 a 2026: si el impuesto neto sube al menos 35 %, queda en firme a los 6 meses desde la presentación; si sube al menos 25 %, a los 12 meses.",
             "Requisitos que se acumulan: presentar a tiempo, pagar todo en los plazos y que en ese término no llegue emplazamiento, requerimiento especial, emplazamiento especial ni liquidación provisional.",
             "No hay atajo si el impuesto del año anterior fue menor de 71 UVT, con beneficios por zona geográfica o con retenciones inexistentes."],
    porque: "Más subes, más rápido quedas libre. Un solo incumplimiento quita el premio.",
    check: { q: "Subió el impuesto 40 %, presentó a tiempo, pero pagó la última cuota tarde. ¿En cuánto queda en firme?",
      ops: [{ t: "Tres años: faltó el pago total en los plazos.", ok: true, por: "Los requisitos se acumulan." },
            { t: "Seis meses: el aumento superó el 35 %.", ok: false, por: "Falta un requisito." },
            { t: "Doce meses, por el pago tardío.", ok: false, por: "El pago tardío no rebaja el beneficio: lo quita." }] } }
];


/* ===== src/data/casos.js ===== */
/* Simulacro funcional · capítulos 1 a 3 del M06 · formato DIAN 2676 (un caso, un enunciado, tres opciones).
   Casos inéditos: no repiten los de la lección M06, la Arena M06 ni «El reloj fiscal».
   Técnicas (reglas de CALIDAD DE LOS INSTRUMENTOS): T1 perífrasis · T2 dato escondido · T3 correcta en otro momento ·
   T5 dos reglas compiten · T6 la excepción desplaza la regla general · T7 cifra o plazo en la frontera · T8 falta un requisito.
   Tipos de error de cada distractor (para el diagnóstico): requisito · vecina · momento · general · verdad · derogada · lectura · inventada.
   Paseo del experto: cada paso resalta frases exactas del caso o de las opciones.
   Colores: y = plazos y fechas · b = actos y hechos · p = cifras y porcentajes · o = trampas y palabras que distraen · g = lo que decide. */
var APP = window.APP || (window.APP = {});
APP.data = APP.data || {};

APP.data.tecnicas = {
  T1: "La figura descrita con un rodeo",
  T2: "El dato que decide está escondido",
  T3: "La opción sería correcta en otro momento",
  T5: "Dos reglas compiten",
  T6: "La excepción desplaza a la regla general",
  T7: "La cifra o el plazo en la frontera",
  T8: "A una opción le falta un requisito"
};

APP.data.errores = {
  requisito: { nombre: "Le faltaba un requisito", consejo: "Antes de marcar, cuenta las condiciones de la regla y verifica cada una en el caso." },
  vecina: { nombre: "Regla vecina", consejo: "La opción usaba palabras verdaderas de otra norma. Pregúntate de qué norma viene cada palabra." },
  momento: { nombre: "Correcta en otro momento", consejo: "Ubica el caso en la línea de tiempo: qué acto ya llegó y cuál no." },
  general: { nombre: "Regla general donde rige una especial", consejo: "Es el patrón más repetido: busca siempre la excepción antes de aplicar la regla general." },
  verdad: { nombre: "Verdad a medias", consejo: "La opción decía algo cierto, pero incompleto o aplicado al caso equivocado." },
  derogada: { nombre: "Texto que ya no rige", consejo: "Desconfía de los números viejos y de los procedimientos derogados." },
  lectura: { nombre: "Un dato del caso mal leído", consejo: "Relee el caso buscando fechas, montos y actos antes de mirar las opciones." },
  inventada: { nombre: "Una regla que no existe", consejo: "Si la opción suena lógica pero no recuerdas la norma que la sostiene, desconfía." }
};

APP.data.casos = [
  /* ===================== F01 · Retención sin pago: el saldo que nació después ===================== */
  { id: "F01", tema: "m06-1", sub: "s-retsinpago", tec: "T8", lam: ["f04", "f05", "f06", "f07"],
    caso: "Una sociedad de mantenimiento industrial, agente de retención, radicó dentro del plazo la declaración de retención en la fuente de febrero de 2026, con un valor a cargo de 22 millones de pesos, sin acompañarla de pago alguno. Once días después presentó su declaración de renta del año gravable 2025, en la que determinó, por primera vez, un saldo a su favor de 61 millones de pesos. Cuarenta días después de haber radicado la declaración de retención, solicitó a la DIAN aplicar ese saldo contra lo que adeudaba por retenciones. En septiembre de 2026 no había pagado suma alguna por ese periodo.",
    enunciado: "Al revisar en septiembre la situación de la declaración de retención, la división debe concluir que",
    ops: [
      { t: "produce efectos legales, porque el saldo a favor supera el doble del valor a cargo y su compensación se pidió dentro de los seis meses siguientes a la presentación.", ok: false, err: "requisito",
        por: "Cumple dos de las tres condiciones de la salida del saldo a favor: el doble (61 frente a 44 millones) y la solicitud dentro de seis meses. Le falta la tercera: el art. 580-1 exige que el saldo se haya «generado antes de la presentación de la declaración de retención», y aquí nació once días después." },
      { t: "carece de efecto legal, sin que se requiera pronunciamiento alguno de la administración que así lo declare.", ok: true,
        por: "Es correcta. La declaración de retención presentada sin pago total no produce efecto legal alguno, sin necesidad de acto administrativo (art. 580-1, inc. 1). Ninguna salida la rescata: el saldo a favor se generó después; no hubo pago total dentro de los dos meses siguientes al vencimiento; y lo adeudado (22 millones) supera con amplitud 10 UVT." },
      { t: "producirá efectos legales cuando la administración resuelva de fondo la compensación solicitada por el agente retenedor.", ok: false, err: "inventada",
        por: "La ley no hace depender los efectos de un acto que resuelva la compensación: la ineficacia opera sin pronunciamiento. Y aunque se resolviera, el saldo no sirve, porque se generó después de la declaración de retención." }
    ],
    paseo: [
      { t: "Primero: ¿qué figura está en juego?", txt: "El experto no lee las opciones todavía. Busca el verbo que define la situación: una declaración de retención radicada sin pago. Eso lo lleva al art. 580-1: la regla es que no produce efectos, salvo que una de las tres salidas la rescate.",
        m: [{ s: "declaración de retención en la fuente de febrero de 2026", c: "b" }, { s: "sin acompañarla de pago alguno", c: "o", n: "Sin pago: art. 580-1" }] },
      { t: "Segundo: recorrer la salida del saldo a favor", txt: "Son tres condiciones a la vez: saldo de al menos el doble de la retención, generado antes de presentarla y compensación pedida dentro de seis meses. 61 millones supera el doble de 22 (44). Cuarenta días está dentro de seis meses. Falta mirar cuándo nació el saldo.",
        m: [{ s: "22 millones de pesos", c: "p" }, { s: "61 millones de pesos", c: "p", n: "Más del doble" }, { s: "Cuarenta días después", c: "y", n: "Dentro de 6 meses" }] },
      { t: "El dato escondido", txt: "«Once días después» y «por primera vez»: el saldo a favor se generó después de radicar la declaración de retención. La ley exige que se haya generado antes. Esa salida se cae.",
        m: [{ s: "Once días después", c: "g", n: "Nació después" }, { s: "por primera vez", c: "g" }] },
      { t: "Las otras dos salidas", txt: "La de los dos meses exige el pago total dentro de los dos meses siguientes al vencimiento: en septiembre no había pagado nada. La de la deuda pequeña exige no superar 10 UVT (523.740 pesos en 2026): debe 22 millones. Ninguna aplica.",
        m: [{ s: "En septiembre de 2026 no había pagado suma alguna", c: "b" }] },
      { t: "Descartar las opciones", txt: "La primera opción es la trampa del requisito faltante: suena completa porque menciona el doble y los seis meses, pero calla el «antes». La tercera inventa que los efectos dependen de un acto. La segunda dice exactamente lo que dice la norma.",
        o: [0, 2] }
    ],
    llevar: "Retención sin pago: las condiciones de cada salida se cumplen todas o no sirve ninguna. El saldo a favor tiene que existir antes." },

  /* ===================== F02 · Retención: la deuda pequeña en la frontera del año ===================== */
  { id: "F02", tema: "m06-1", sub: "s-retsinpago", tec: "T7", lam: ["f07", "f06", "f38"],
    caso: "Una cadena de droguerías de Cali presentó oportunamente la declaración de retención en la fuente de marzo de 2026. Por un descuadre en la conciliación bancaria, el valor pagado con la declaración quedó 400.000 pesos por debajo del total de las retenciones declaradas, y nadie lo advirtió en su momento. La diferencia, con sus intereses de mora, se pagó once meses y veintiocho días después del vencimiento del plazo para declarar ese periodo. La cadena no registra saldos a favor.",
    enunciado: "Sobre la eficacia de esa declaración, es acertado sostener que",
    ops: [
      { t: "produce efectos legales, porque el valor que quedó sin pagar no supera diez unidades de valor tributario y se canceló antes de cumplirse el año siguiente al vencimiento.", ok: true,
        por: "Es correcta. El parágrafo 3 del art. 580-1 (Ley 2277 de 2022) da efectos a la declaración presentada sin pago total cuando lo dejado de pagar no supera 10 UVT y se cancela a más tardar dentro del año siguiente al vencimiento, con intereses. En 2026, 10 UVT son 523.740 pesos; se debían 400.000 y se pagaron a los once meses y veintiocho días." },
      { t: "no produce efecto legal alguno, porque el pago total debía completarse dentro de los dos meses siguientes al vencimiento del plazo.", ok: false, err: "vecina",
        por: "Es la regla de la segunda salida (art. 580-1, inc. 5). Sería la conclusión correcta si lo adeudado superara 10 UVT. Para deudas pequeñas, la ley da un año." },
      { t: "produce efectos legales únicamente si la cadena solicita compensar un saldo a favor dentro de los seis meses siguientes a la presentación.", ok: false, err: "vecina",
        por: "Es la primera salida, la del saldo a favor, y el caso dice que la cadena no registra saldos a favor. No es la única forma de rescatar la declaración." }
    ],
    paseo: [
      { t: "La figura", txt: "Una declaración de retención presentada a tiempo pero sin pago total. Regla: ineficaz, salvo una salida. El experto revisa primero cuánto quedó debiendo.",
        m: [{ s: "presentó oportunamente", c: "b" }, { s: "400.000 pesos por debajo", c: "p", n: "¿Menos de 10 UVT?" }] },
      { t: "Convertir a UVT", txt: "La UVT de 2026 vale 52.374 pesos: 10 UVT son 523.740. Lo adeudado (400.000) está por debajo. Se abre la salida de la deuda pequeña.",
        m: [{ s: "400.000 pesos", c: "g", n: "≤ 523.740" }] },
      { t: "El plazo en la frontera", txt: "La salida exige pagar a más tardar dentro del año siguiente al vencimiento. Once meses y veintiocho días todavía están dentro del año. El operador puso la cifra cerca de la frontera para hacer dudar.",
        m: [{ s: "once meses y veintiocho días después del vencimiento", c: "y", n: "Dentro del año" }, { s: "con sus intereses de mora", c: "b" }] },
      { t: "Descartar", txt: "La segunda opción aplica la regla de los dos meses, que es para quien debe más de 10 UVT. La tercera exige un saldo a favor que el caso descarta expresamente.",
        m: [{ s: "La cadena no registra saldos a favor", c: "o" }], o: [1, 2] }
    ],
    llevar: "Deuda de hasta 10 UVT: un año para pagarla. Más de 10 UVT: dos meses, y solo si se presentó a tiempo." },

  /* ===================== F03 · El pensionado que no estaba obligado ===================== */
  { id: "F03", tema: "m06-1", sub: "s-noobligado", tec: "T6", lam: ["f08"],
    caso: "Un pensionado residente en Pereira, cuyos ingresos y patrimonio del año gravable 2025 no lo obligaban a declarar renta, recibió durante ese año rendimientos financieros sobre los cuales su banco le practicó retenciones en la fuente. En agosto de 2026 presentó voluntariamente la declaración de renta, liquidó un saldo a favor y pidió su devolución. El funcionario que estudia la solicitud proyecta el rechazo con el argumento de que «lo presentado por quien no tenía el deber de declarar carece de todo efecto».",
    enunciado: "Frente al proyecto del funcionario, lo procedente es",
    ops: [
      { t: "mantener el rechazo, porque las declaraciones de quienes no estaban obligados a presentarlas no producen efecto legal alguno.", ok: false, err: "general",
        por: "Es la regla general del art. 594-2, pero el parágrafo del art. 6 la exceptúa: la persona natural residente a quien le practicaron retenciones puede declarar, y esa declaración produce efectos legales." },
      { t: "mantener el rechazo, porque las retenciones practicadas a quien no está obligado a declarar constituyen su impuesto y no generan saldo a favor.", ok: false, err: "verdad",
        por: "Verdad a medias tomada del mismo art. 6: para el no obligado que no declara, el impuesto es la suma de sus retenciones. Pero si declara, la declaración se rige por el Libro I del Estatuto y puede arrojar saldo a favor." },
      { t: "apartarse del proyecto, porque la declaración presentada por la persona natural residente con retenciones produce efectos legales.", ok: true,
        por: "Es correcta. El parágrafo del art. 6 del Estatuto permite a las personas naturales residentes con retenciones, no obligadas, presentar la declaración, que «produce efectos legales». Es la excepción que desplaza al art. 594-2." }
    ],
    paseo: [
      { t: "Quién es y qué hizo", txt: "Persona natural, residente, no obligada, con retenciones, que declaró voluntariamente. Cada palabra cuenta: son los requisitos de la excepción del art. 6.",
        m: [{ s: "pensionado residente en Pereira", c: "b", n: "Persona natural residente" }, { s: "no lo obligaban a declarar renta", c: "b" }, { s: "le practicó retenciones en la fuente", c: "g", n: "Activa la excepción" }] },
      { t: "La frase que empuja al error", txt: "El funcionario repite casi literal el art. 594-2. Suena a norma, y lo es, pero es la regla general. El experto se pregunta siempre: ¿esta norma tiene una excepción en el mismo estatuto?",
        m: [{ s: "«lo presentado por quien no tenía el deber de declarar carece de todo efecto»", c: "o", n: "Regla general" }] },
      { t: "La excepción", txt: "Art. 6, parágrafo: la persona natural residente con retenciones, no obligada, «podrá presentarla. Dicha declaración produce efectos legales». Con efectos, el saldo a favor se puede pedir.",
        o: [2] },
      { t: "Descartar", txt: "La primera opción aplica la regla general. La segunda toma una frase verdadera del mismo artículo, pero la aplica a quien sí declaró: verdad a medias.",
        o: [0, 1] }
    ],
    llevar: "Antes de aplicar «no producirá efecto legal alguno», busca la norma que lo exceptúa. Persona natural residente con retenciones: su declaración voluntaria sí vale." },

  /* ===================== F04 · Sanear la firma antes de la sanción ===================== */
  { id: "F04", tema: "m06-1", sub: "s-nopres", tec: "T3", lam: ["f01", "f03"],
    caso: "Una sociedad de servicios de aseo, obligada a llevar contabilidad pero sin revisor fiscal, presentó a tiempo su declaración del impuesto sobre las ventas del tercer bimestre de 2026, firmada únicamente por la representante legal, aunque por el monto de sus ingresos debía llevar también la firma de contador público. Semanas después, la DIAN le comunicó un escrito en el que la invita a cumplir el deber de declarar ese periodo y le advierte las consecuencias de no hacerlo. A la fecha no se le ha notificado ningún acto que la sancione. La representante legal pide que se le indique la alternativa menos gravosa que la ley le ofrece.",
    enunciado: "La alternativa que debe indicársele es",
    ops: [
      { t: "corregir por el procedimiento del artículo 588 y liquidar el dos por ciento de la sanción por extemporaneidad, sin exceder de 1.300 UVT.", ok: true,
        por: "Es correcta. La falta de firma del contador estando obligado es causal del literal d del art. 580. El parágrafo 2 del art. 588 permite corregirla con el 2 % de la sanción del art. 641, sin pasar de 1.300 UVT, «siempre y cuando no se haya notificado sanción por no declarar». El escrito recibido invita a declarar, pero no es la sanción." },
      { t: "presentar una nueva declaración y liquidar la sanción de extemporaneidad que corresponde a quien declara después de haber sido invitado a hacerlo.", ok: false, err: "momento",
        por: "Es una salida posible, pero más gravosa, y desconoce el mecanismo especial del parágrafo 2 del art. 588, que sigue abierto porque no se ha notificado sanción por no declarar." },
      { t: "abstenerse de corregir, porque la invitación de la administración a declarar cerró la posibilidad de subsanar la falta de firma.", ok: false, err: "momento",
        por: "Sería correcta en otro momento: cuando ya se haya notificado la sanción por no declarar. Una invitación a declarar no es esa sanción." }
    ],
    paseo: [
      { t: "La causal", txt: "Falta la firma del contador, y la sociedad estaba obligada a llevarla. Es el literal d del art. 580: la declaración se tiene por no presentada.",
        m: [{ s: "debía llevar también la firma de contador público", c: "b", n: "Art. 580, literal d" }] },
      { t: "La puerta del 2 %", txt: "Los literales a, b y d se sanean por el art. 588 con el 2 % de la sanción del art. 641, sin pasar de 1.300 UVT. Condición: que no se haya notificado sanción por no declarar.",
        m: [{ s: "alternativa menos gravosa", c: "o", n: "Pide la vía más barata" }] },
      { t: "El acto que confunde", txt: "La DIAN envió un escrito que invita a declarar. Es un acto previo, no la sanción. El caso lo confirma con todas las letras: no se ha notificado ningún acto que la sancione.",
        m: [{ s: "le comunicó un escrito en el que la invita a cumplir el deber de declarar", c: "b", n: "No es la sanción" }, { s: "A la fecha no se le ha notificado ningún acto que la sancione", c: "g" }] },
      { t: "Descartar", txt: "La tercera opción sería cierta después de la sanción por no declarar: correcta en otro momento. La segunda es más cara y salta el mecanismo especial que sigue abierto.",
        o: [1, 2] }
    ],
    llevar: "El 2 % sanea lugar, identificación y firma hasta que llegue la sanción por no declarar. Una invitación a declarar no cierra esa puerta." },

  /* ===================== F05 · El costo olvidado y la puerta equivocada ===================== */
  { id: "F05", tema: "m06-2", sub: "s-bajar", tec: "T5", lam: ["f14", "f09"],
    caso: "Una fábrica de empaques presentó y pagó a tiempo su declaración de renta del año gravable 2024; el plazo vencía el 9 de mayo de 2025. En agosto de 2026, al cerrar una auditoría interna, encontró que un contrato de mantenimiento de 70 millones de pesos, debidamente soportado, nunca se llevó como costo, de modo que el impuesto quedó liquidado por encima de lo debido. Su contador propone pedir a la DIAN que «enmiende la inconsistencia del formulario», como se hace con los errores de diligenciamiento, porque considera que la omisión fue un simple descuido. La DIAN no le ha notificado actuación alguna sobre ese año.",
    enunciado: "Frente a la propuesta del contador, el análisis que se ajusta a la norma concluye que la corrección",
    ops: [
      { t: "procede en cualquier tiempo y sin sanción, porque se trata de una inconsistencia en el diligenciamiento que la administración puede enmendar.", ok: false, err: "vecina",
        por: "Usa el vocabulario del art. 43 de la Ley 962 («en cualquier tiempo», «inconsistencias en el diligenciamiento»), pero esa norma solo cubre errores que no afectan el valor por declarar. Un costo omitido cambia el impuesto." },
      { t: "no procede por ninguna de las dos vías, porque el error afecta el valor declarado y el plazo para disminuirlo ya expiró.", ok: true,
        por: "Es correcta. Como el error cambia el impuesto, no es un error de forma de la Ley 962. Y la corrección que disminuye el valor a pagar debía presentarse dentro del año siguiente al vencimiento (art. 589): ese año terminó el 9 de mayo de 2026." },
      { t: "procede mientras la administración conserve la facultad de modificar la declaración, sin sanción por tratarse de una disminución.", ok: false, err: "vecina",
        por: "Confunde el término de la firmeza (tres años, art. 714) con el plazo para corregir a la baja (un año, art. 589). Que la DIAN todavía pueda revisar no abre la puerta del contribuyente." }
    ],
    paseo: [
      { t: "¿Sube o baja?", txt: "Primera pregunta del mapa de corrección. Un costo que no se llevó hace que el impuesto quedara alto: corregir es bajarlo. Puerta del art. 589.",
        m: [{ s: "nunca se llevó como costo", c: "b" }, { s: "el impuesto quedó liquidado por encima de lo debido", c: "g", n: "Corregir = bajar" }] },
      { t: "¿Está a tiempo?", txt: "El 589 da un año desde el vencimiento. Venció el 9 de mayo de 2025; el año terminó el 9 de mayo de 2026. En agosto de 2026 ya pasó.",
        m: [{ s: "el plazo vencía el 9 de mayo de 2025", c: "y" }, { s: "En agosto de 2026", c: "y", n: "Pasó el año" }] },
      { t: "La puerta que propone el contador", txt: "«Enmendar la inconsistencia del formulario» es el lenguaje del art. 43 de la Ley 962. Esa puerta está abierta en cualquier tiempo, pero solo para errores que no afectan el valor. Llamar «descuido» a un costo de 70 millones no lo vuelve un error de forma.",
        m: [{ s: "«enmiende la inconsistencia del formulario»", c: "o", n: "Lenguaje de la Ley 962" }, { s: "70 millones de pesos", c: "p", n: "Afecta el valor" }] },
      { t: "Descartar", txt: "La primera opción trae palabras verdaderas de la norma vecina. La tercera mezcla la firmeza con la corrección: es el error más probable del examen.",
        o: [0, 2] }
    ],
    llevar: "Bajar el impuesto: un año. «En cualquier tiempo» es solo para errores que no tocan el valor." },

  /* ===================== F06 · El saldo que se encogió ===================== */
  { id: "F06", tema: "m06-2", sub: "s-peaje", tec: "T1", lam: ["f20", "f22", "f23"],
    caso: "Una comercializadora de insumos agrícolas liquidó en su declaración de renta del año gravable 2024, presentada a tiempo, un saldo a favor de 80 millones de pesos, que decidió no pedir en devolución. En marzo de 2026 la DIAN le notificó un escrito en el que le señala indicios de que algunos costos carecen de soporte y la invita a revisar lo declarado. Dentro del mes siguiente, la comercializadora presentó una nueva declaración en la que el saldo a favor quedó en 50 millones de pesos; no resultó ningún valor a pagar.",
    enunciado: "Para liquidar correctamente la sanción en la nueva declaración, la comercializadora debe aplicar",
    ops: [
      { t: "el diez por ciento sobre los cincuenta millones del nuevo saldo, porque no se generó un mayor valor a pagar sino un saldo menor.", ok: false, err: "lectura",
        por: "Falla dos veces. La tarifa es del 20 %, porque corrige después del emplazamiento. Y la base no es el saldo que quedó, sino la diferencia: el «menor saldo a favor»." },
      { t: "el veinte por ciento sobre los ochenta millones del saldo inicial, porque la corrección se hizo después de la invitación de la administración.", ok: false, err: "verdad",
        por: "Acierta en la tarifa y falla en la base. El art. 644 calcula la sanción sobre el menor saldo a favor que se genera entre la corrección y la declaración anterior: 30 millones, no 80." },
      { t: "el veinte por ciento sobre los treinta millones en que disminuyó el saldo a favor.", ok: true,
        por: "Es correcta. El escrito que señala indicios e invita a revisar es un emplazamiento para corregir (art. 685). Corregir después de notificado y antes del requerimiento cuesta el 20 % (art. 644, num. 2) del menor saldo a favor: 80 − 50 = 30 millones. La sanción es de 6 millones." }
    ],
    paseo: [
      { t: "Descifrar el rodeo", txt: "El caso nunca dice «emplazamiento». Lo describe: un escrito con indicios y una invitación a revisar. El experto lo traduce de inmediato, porque de ese acto depende la tarifa.",
        m: [{ s: "un escrito en el que le señala indicios de que algunos costos carecen de soporte y la invita a revisar lo declarado", c: "b", n: "= emplazamiento para corregir" }] },
      { t: "La tarifa", txt: "Corrige dentro del mes siguiente al emplazamiento y antes de cualquier requerimiento: 20 %.",
        m: [{ s: "Dentro del mes siguiente", c: "y", n: "Después del emplazamiento: 20 %" }] },
      { t: "La base", txt: "El art. 644 no habla solo de «mayor valor a pagar»: también de «menor saldo a favor». Aquí no hay nada que pagar, pero el saldo bajó de 80 a 50. La base es la diferencia: 30 millones.",
        m: [{ s: "80 millones de pesos", c: "p" }, { s: "50 millones de pesos", c: "p" }, { s: "no resultó ningún valor a pagar", c: "o", n: "Distrae: igual hay sanción" }] },
      { t: "Descartar", txt: "La primera opción cae en la trampa de «no hay valor a pagar» y además usa la tarifa equivocada. La segunda acierta la tarifa y toma la base equivocada: verdad a medias.",
        o: [0, 1] }
    ],
    llevar: "La sanción por corrección se calcula sobre la diferencia: el mayor valor a pagar o el menor saldo a favor." },

  /* ===================== F07 · Dos glosas en un solo emplazamiento ===================== */
  { id: "F07", tema: "m06-2", sub: "s-sinsancion", tec: "T2", lam: ["f17", "f20", "f23"],
    caso: "En el emplazamiento que notificó a una empresa de vigilancia privada sobre su declaración de renta del año gravable 2024, la DIAN formuló dos glosas. En la primera cuestionó unos gastos sin soporte, que generarían un mayor impuesto de 18 millones de pesos. En la segunda sostuvo que unas indemnizaciones laborales no eran deducibles en el año en que se declararon, y aclaró que se trataba de una discrepancia de interpretación, porque los hechos declarados eran completos y verdaderos; esta glosa implicaba un mayor impuesto de 12 millones de pesos. Dentro del mes siguiente, la empresa aceptó ambas glosas y corrigió, con un aumento total del impuesto de 30 millones de pesos.",
    enunciado: "La sanción por corrección que debe liquidar la empresa asciende a",
    ops: [
      { t: "3,6 millones de pesos, que equivalen al veinte por ciento del mayor impuesto originado en la glosa por falta de soportes.", ok: true,
        por: "Es correcta. La corrección después del emplazamiento cuesta el 20 % (art. 644, num. 2). Pero el art. 685, inc. 2, permite corregir «sin sanción de corrección en lo que respecta a» las diferencias de criterio que la DIAN señale en el emplazamiento. La sanción recae solo sobre los 18 millones de la primera glosa: 3,6 millones." },
      { t: "6 millones de pesos, que equivalen al veinte por ciento de todo el mayor impuesto que liquidó la corrección.", ok: false, err: "requisito",
        por: "Aplica el 20 % a toda la corrección y olvida que la parte que la propia DIAN calificó como diferencia de criterio no lleva sanción." },
      { t: "1,8 millones de pesos, porque la empresa corrigió por su voluntad y la tarifa aplicable es la del diez por ciento.", ok: false, err: "momento",
        por: "El 10 % es para quien corrige antes del emplazamiento. Aquí corrigió después: la tarifa es del 20 %." }
    ],
    paseo: [
      { t: "El acto y el momento", txt: "Hay un emplazamiento y la empresa corrige dentro del mes siguiente. La tarifa de partida es el 20 %.",
        m: [{ s: "En el emplazamiento que notificó", c: "b" }, { s: "Dentro del mes siguiente", c: "y", n: "Tarifa: 20 %" }] },
      { t: "El dato escondido", txt: "La segunda glosa trae una frase decisiva: la propia DIAN la califica como discrepancia de interpretación con hechos completos y verdaderos. El art. 685 dice que esa parte se corrige sin sanción.",
        m: [{ s: "aclaró que se trataba de una discrepancia de interpretación, porque los hechos declarados eran completos y verdaderos", c: "g", n: "Sin sanción en esa parte" }] },
      { t: "La cuenta", txt: "Se separa la corrección en dos: 18 millones con sanción del 20 % (3,6 millones) y 12 millones sin sanción.",
        m: [{ s: "18 millones de pesos", c: "p", n: "× 20 % = 3,6" }, { s: "12 millones de pesos", c: "p", n: "Sin sanción" }, { s: "30 millones de pesos", c: "o", n: "No es la base" }] },
      { t: "Descartar", txt: "La segunda opción ignora la diferencia de criterio: le falta un requisito al cálculo. La tercera usa la tarifa del momento anterior al emplazamiento.",
        o: [1, 2] }
    ],
    llevar: "En un mismo emplazamiento puede haber parte con sanción y parte sin ella: la diferencia de criterio señalada por la DIAN no paga peaje." },

  /* ===================== F08 · Tres años que terminaban en festivo ===================== */
  { id: "F08", tema: "m06-2", sub: "s-subir", tec: "T7", lam: ["f11", "f29", "f19"],
    caso: "Una distribuidora de repuestos presentó a tiempo su declaración de renta del año gravable 2022; según el calendario, el plazo le vencía el jueves 18 de mayo de 2023. Al preparar un proceso de venta de la compañía, su revisor fiscal encontró ingresos no declarados, y el martes 19 de mayo de 2026 la distribuidora presentó una nueva declaración que aumenta el impuesto. El lunes 18 de mayo de 2026 fue festivo. La DIAN no le ha notificado ningún acto sobre esa declaración.",
    enunciado: "Sobre la declaración presentada el 19 de mayo de 2026 es acertado afirmar que",
    ops: [
      { t: "no tiene efectos de corrección, porque los tres años siguientes al vencimiento se cumplieron el 18 de mayo de 2026.", ok: false, err: "lectura",
        por: "Los plazos en años se cuentan por el calendario, pero si el último día es feriado, se extienden hasta el primer día hábil (Ley 4.ª de 1913, art. 62). El 18 de mayo de 2026 fue festivo." },
      { t: "es una corrección válida y debe liquidar el diez por ciento del mayor valor, porque el término que vencía en festivo se extendió hasta ese día.", ok: true,
        por: "Es correcta. El término de tres años del art. 588 terminaba el lunes 18 de mayo de 2026, festivo, y se extendió al martes 19 (Ley 4.ª de 1913, art. 62). No hay requerimiento notificado. Corrige después del vencimiento y sin emplazamiento: 10 % (art. 644, num. 1)." },
      { t: "es una corrección válida que no causa sanción, porque se presentó el último día del término para corregir.", ok: false, err: "inventada",
        por: "Presentarla el último día no la exime de sanción. Sin sanción solo se corrige antes del vencimiento del plazo para declarar, por diferencias de criterio o sin cambiar el valor." }
    ],
    paseo: [
      { t: "¿Sube o baja?", txt: "Ingresos no declarados: la nueva declaración aumenta el impuesto. Puerta del art. 588: tres años desde el vencimiento y sin requerimiento.",
        m: [{ s: "aumenta el impuesto", c: "b", n: "Art. 588" }, { s: "La DIAN no le ha notificado ningún acto", c: "b" }] },
      { t: "Contar los años", txt: "Tres años desde el jueves 18 de mayo de 2023 terminan el lunes 18 de mayo de 2026. Los años se cuentan de fecha a fecha.",
        m: [{ s: "el jueves 18 de mayo de 2023", c: "y" }] },
      { t: "La frontera", txt: "El último día fue festivo. La Ley 4.ª de 1913 (art. 62) extiende el plazo hasta el primer día hábil: el martes 19. La corrección llegó justo a tiempo.",
        m: [{ s: "El lunes 18 de mayo de 2026 fue festivo", c: "g", n: "Se corre al día hábil" }, { s: "el martes 19 de mayo de 2026", c: "y" }] },
      { t: "¿Cuánto cuesta?", txt: "Después del vencimiento y sin ningún emplazamiento: 10 %. El último día no tiene descuento.",
        o: [1] },
      { t: "Descartar", txt: "La primera opción cuenta bien los años pero olvida el festivo. La tercera inventa una exención por presentar el último día.",
        o: [0, 2] }
    ],
    llevar: "Años y meses se cuentan de fecha a fecha; si el último día es feriado, el plazo se corre al primer día hábil." },

  /* ===================== F09 · El reloj que empezó tarde y se detuvo ===================== */
  { id: "F09", tema: "m06-3", sub: "s-reloj", tec: "T2", lam: ["f25", "f34", "f28"],
    caso: "Una sociedad de ingeniería debía presentar su declaración de renta del año gravable 2023 a más tardar el martes 14 de mayo de 2024, pero la presentó el viernes 14 de junio de 2024. El 21 de agosto de 2025, la DIAN le notificó un escrito con indicios de inexactitud y una invitación a revisar lo declarado, que la sociedad dejó sin respuesta. El jueves 8 de julio de 2027, la DIAN remitió al correo electrónico registrado en el RUT el acto con el que propone modificar la declaración. La sociedad alega que la administración actuó por fuera del término.",
    enunciado: "Respecto de la oportunidad del acto remitido el 8 de julio de 2027, debe concluirse que",
    ops: [
      { t: "fue extemporáneo, porque el término de tres años se cumplió el 14 de mayo de 2027.", ok: false, err: "general",
        por: "Cuenta desde el vencimiento, que es la regla para quien declara a tiempo. Esta declaración fue extemporánea: los tres años corren desde su presentación (arts. 705 y 714)." },
      { t: "fue extemporáneo, porque el término de tres años contado desde la presentación de la declaración se cumplió el 14 de junio de 2027.", ok: false, err: "requisito",
        por: "Acierta el punto de partida y olvida la suspensión: el emplazamiento para corregir suspende el término durante el mes siguiente a su notificación (art. 706), aunque no se responda." },
      { t: "fue oportuno, porque el término se extendió hasta el 14 de julio de 2027.", ok: true,
        por: "Es correcta. Declaración extemporánea: tres años desde la presentación (14 de junio de 2027). El emplazamiento notificado dentro del término lo suspendió un mes (art. 706): hasta el 14 de julio de 2027. El acto se remitió el 8 de julio y, en la notificación electrónica, para la DIAN cuenta la fecha del envío." }
    ],
    paseo: [
      { t: "¿Desde cuándo?", txt: "Primera pregunta del reloj. Venció el 14 de mayo y presentó el 14 de junio: declaración extemporánea. Los tres años corren desde la presentación.",
        m: [{ s: "a más tardar el martes 14 de mayo de 2024", c: "y" }, { s: "la presentó el viernes 14 de junio de 2024", c: "g", n: "Tardía: cuenta desde aquí" }] },
      { t: "¿Cuánto dura?", txt: "Renta sin pérdidas ni precios de transferencia, y sin beneficio de auditoría (se presentó tarde): tres años. Llega al 14 de junio de 2027." },
      { t: "¿Hubo pausas?", txt: "El escrito con indicios e invitación a revisar es un emplazamiento para corregir. Aunque no se respondió, suspendió el término un mes (art. 706). El reloj llega al 14 de julio de 2027.",
        m: [{ s: "un escrito con indicios de inexactitud y una invitación a revisar lo declarado", c: "b", n: "= emplazamiento" }, { s: "que la sociedad dejó sin respuesta", c: "o", n: "Igual suspende" }] },
      { t: "La fecha del acto", txt: "El 8 de julio de 2027 está antes del 14 de julio. En la notificación electrónica, para la DIAN cuenta la fecha del envío (art. 566-1, que verán con las notificaciones).",
        m: [{ s: "El jueves 8 de julio de 2027", c: "y", n: "Antes del 14 de julio" }] },
      { t: "Descartar", txt: "La primera opción usa la regla general donde rige la especial (declaración tardía). La segunda acierta el punto de partida pero le falta la pausa: es el dato que el operador escondió.",
        o: [0, 1] }
    ],
    llevar: "Fórmula del reloj: ¿desde cuándo? + ¿cuánto dura? + ¿hubo pausas? Las tres preguntas, siempre." },

  /* ===================== F10 · El atajo que no aplica ===================== */
  { id: "F10", tema: "m06-3", sub: "s-beneficio", tec: "T8", lam: ["f35", "f36", "f37"],
    caso: "Una empresa de alimentos que, por estar ubicada en una zona que la ley favorece, liquida el impuesto de renta con una tarifa reducida, presentó y pagó dentro de los plazos su declaración de renta del año gravable 2025. Su impuesto neto de renta aumentó 38 % frente al del año anterior, que fue de 1.200 UVT. Dentro de los seis meses siguientes a la presentación no se le notificó ningún acto. Su gerente sostiene que la declaración ya quedó en firme.",
    enunciado: "La conclusión que se ajusta a la ley sobre el término con que cuenta la DIAN para revisarla es que",
    ops: [
      { t: "venció a los seis meses de la presentación, porque el aumento superó el treinta y cinco por ciento y se cumplieron los plazos de presentación y pago.", ok: false, err: "requisito",
        por: "Revisa los requisitos de aumento, presentación y pago, pero olvida una exclusión expresa: el beneficio de auditoría no es aplicable a quienes gozan de beneficios tributarios por su ubicación en una zona geográfica determinada (art. 689-3)." },
      { t: "corre por la regla general de tres años, porque el beneficio no se aplica a quienes gozan de ventajas tributarias por su ubicación.", ok: true,
        por: "Es correcta. El art. 689-3 dice que la norma «no es aplicable a los contribuyentes que gocen de beneficios tributarios en razón a su ubicación en una zona geográfica determinada». Sin beneficio, rige el término general de tres años del art. 714." },
      { t: "vence a los doce meses de la presentación, porque la tarifa reducida obliga a aplicar el término del menor incremento.", ok: false, err: "inventada",
        por: "No existe esa regla. Quien goza de beneficios por ubicación no accede a ninguno de los dos términos especiales." }
    ],
    paseo: [
      { t: "Lo que suena a atajo", txt: "Renta de 2025, aumento del 38 %, presentación y pago a tiempo, base de 1.200 UVT y ningún acto en seis meses. Todo apunta a los seis meses.",
        m: [{ s: "aumentó 38 %", c: "p" }, { s: "presentó y pagó dentro de los plazos", c: "b" }, { s: "1.200 UVT", c: "p", n: "Más de 71 UVT" }] },
      { t: "La exclusión escondida", txt: "La primera frase del caso describe a una empresa con tarifa reducida por su ubicación. El art. 689-3 excluye expresamente a esos contribuyentes. El experto revisa exclusiones, no solo requisitos.",
        m: [{ s: "por estar ubicada en una zona que la ley favorece, liquida el impuesto de renta con una tarifa reducida", c: "g", n: "Excluida del beneficio" }] },
      { t: "Entonces, ¿cuánto dura?", txt: "Sin beneficio, regla general: tres años desde el vencimiento.", o: [1] },
      { t: "Descartar", txt: "La primera opción verifica requisitos y olvida la exclusión: le falta un requisito. La tercera inventa una regla intermedia.",
        o: [0, 2] }
    ],
    llevar: "Beneficio de auditoría: además de los requisitos, revisa las exclusiones (ubicación, base de 71 UVT, retenciones inexistentes)." },

  /* ===================== F11 · La pérdida y el inciso que ya no existe ===================== */
  { id: "F11", tema: "m06-3", sub: "s-largos", tec: "T5", lam: ["f30"],
    caso: "Una sociedad hotelera presentó a tiempo su declaración de renta del año gravable 2025, en la que determinó una pérdida fiscal que espera compensar en los años siguientes. En un comité de la sociedad, la asesora tributaria explicó que la DIAN podrá revisar esa declaración «durante el mismo tiempo que la sociedad tenga para compensar la pérdida». El contador agregó que, «si la pérdida se compensa en los dos últimos años permitidos, la revisión se extiende por tres años más desde esa compensación». El gerente pidió una sola respuesta.",
    enunciado: "Entre las siguientes afirmaciones sobre esa declaración, la única que se ajusta a la norma vigente es que",
    ops: [
      { t: "su término de firmeza es de cinco años, por la regla especial para declaraciones que determinan o compensan pérdidas fiscales.", ok: true,
        por: "Es correcta. El art. 117 de la Ley 2010 de 2019 fijó en cinco años el término de firmeza de las declaraciones de renta de quienes determinen o compensen pérdidas fiscales. Esa ley posterior y especial desplaza el inciso del art. 714 que todavía menciona el término para compensar." },
      { t: "queda en firme en el mismo término que la sociedad tiene para compensar la pérdida, como lo dice el texto del Estatuto.", ok: false, err: "general",
        por: "Es la frase que todavía trae el art. 714, pero el art. 117 de la Ley 2010 de 2019, posterior y especial, fijó cinco años. Es la trampa servida del texto del Estatuto." },
      { t: "su término se extenderá por tres años más si la pérdida se compensa en cualquiera de los dos últimos años permitidos.", ok: false, err: "derogada",
        por: "Era el inciso 5 del art. 714 en el texto de la Ley 1819 de 2016, derogado por la Ley 1943 de 2018 y por la Ley 2010 de 2019 (art. 160). Ya no rige." }
    ],
    paseo: [
      { t: "El supuesto", txt: "Declaración de renta con pérdida fiscal. Antes de escuchar a nadie, el experto recuerda el término especial: cinco años.",
        m: [{ s: "determinó una pérdida fiscal", c: "b", n: "Régimen especial" }] },
      { t: "Dos voces, dos trampas", txt: "La asesora repite el texto del art. 714, desplazado por la Ley 2010 de 2019. El contador repite un inciso derogado. Las dos suenan a norma porque lo fueron.",
        m: [{ s: "«durante el mismo tiempo que la sociedad tenga para compensar la pérdida»", c: "o", n: "Texto desplazado" }, { s: "«si la pérdida se compensa en los dos últimos años permitidos, la revisión se extiende por tres años más desde esa compensación»", c: "o", n: "Inciso derogado" }] },
      { t: "La regla vigente", txt: "Ley 2010 de 2019, art. 117: cinco años para quienes determinen o compensen pérdidas fiscales o estén sujetos al régimen de precios de transferencia.", o: [0] },
      { t: "Descartar", txt: "La segunda opción aplica el texto general del Estatuto donde rige la ley especial. La tercera revive un inciso derogado.", o: [1, 2] }
    ],
    llevar: "Pérdidas y precios de transferencia: cinco años. Desconfía de lo que «dice el Estatuto» cuando una ley posterior lo cambió." },

  /* ===================== F12 · La plataforma caída y el día de más ===================== */
  { id: "F12", tema: "m06-1", sub: "s-nopres", tec: "T1", lam: ["f02"],
    caso: "Una empresa de transporte escolar, obligada por resolución a declarar por medios electrónicos, intentó presentar el último día del plazo su declaración del impuesto sobre las ventas, pero la plataforma transaccional de la administración permaneció fuera de servicio toda la tarde. El servicio se restableció a las 7:00 p. m. de ese mismo día. La empresa presentó la declaración por el canal electrónico dos días después del restablecimiento, sin liquidar sanción, y adjuntó una copia del aviso de la DIAN que informaba la falla.",
    enunciado: "La consecuencia jurídica de la forma en que se presentó la declaración es que",
    ops: [
      { t: "se entiende presentada en término, porque la falla fue imputable a la administración y la empresa usó el canal electrónico.", ok: false, err: "requisito",
        por: "La salvedad del art. 579-2 tiene una condición de tiempo: presentar a más tardar el día siguiente al restablecimiento. Se presentó dos días después." },
      { t: "se tiene por no presentada, porque no se usó el medio electrónico dentro del plazo para declarar.", ok: false, err: "vecina",
        por: "La consecuencia de «no presentada» del art. 579-2 es para quien usa un medio distinto al electrónico obligatorio. Aquí sí se usó el canal electrónico, solo que tarde." },
      { t: "es extemporánea y debe liquidar la sanción por extemporaneidad, porque se presentó después del día de gracia.", ok: true,
        por: "Es correcta. El art. 579-2 evita la sanción de extemporaneidad cuando, por inconvenientes técnicos de la DIAN, la declaración se presenta «a más tardar al día siguiente» del restablecimiento. Se presentó dos días después: no cumple la condición y debe liquidar la sanción del art. 641." }
    ],
    paseo: [
      { t: "Descifrar el rodeo", txt: "«La plataforma transaccional de la administración permaneció fuera de servicio» es la forma larga de decir que no hubo disponibilidad de los servicios informáticos electrónicos de la DIAN: art. 579-2.",
        m: [{ s: "la plataforma transaccional de la administración permaneció fuera de servicio", c: "b", n: "= falla técnica de la DIAN" }] },
      { t: "La condición de tiempo", txt: "La salvedad no da tiempo indefinido: a más tardar el día siguiente a aquel en que se restablecieron los servicios. El restablecimiento fue el mismo último día, en la noche; el día de gracia era el siguiente.",
        m: [{ s: "El servicio se restableció a las 7:00 p. m. de ese mismo día", c: "y" }, { s: "dos días después del restablecimiento", c: "g", n: "Un día de más" }] },
      { t: "Lo que distrae", txt: "El aviso de la DIAN prueba la falla, pero no cambia el plazo de gracia. Y usar el canal electrónico descarta el «no presentada».",
        m: [{ s: "adjuntó una copia del aviso de la DIAN que informaba la falla", c: "o", n: "Prueba la falla, no salva el plazo" }, { s: "por el canal electrónico", c: "b" }] },
      { t: "Descartar", txt: "La primera opción olvida la condición de tiempo. La segunda aplica la consecuencia de quien usa otro medio.", o: [0, 1] }
    ],
    llevar: "Si falla el sistema de la DIAN: un solo día de gracia, el siguiente al restablecimiento. Después, extemporaneidad." }
];


/* ===== src/data/afirmaciones.js ===== */
/* Afirmaciones comportamentales y de integridad · formato DIAN 2676 (autoinforme Likert de cuatro niveles).
   Inéditas: no repiten el banco de 122 del Centro DIAN Exprés, las lecciones, las guías ni las 8 de ANLA.
   Claves: criterio de Claude con el método de los tres pasos, anclado en la Resolución DIAN 65 de 2024 y el
   Código de Integridad. D = totalmente de acuerdo; A = totalmente en desacuerdo; H = afirmación de control:
   respuesta honesta (A o B). La guía no publica claves: ninguna de estas es oficial.
   Campos: real = lo que mide (competencias o valores); atractor = lo que distrae hacia el extremo contrario.
   conducta, condicion y virtud son frases exactas del texto, para el paseo del experto. */
var APP = window.APP || (window.APP = {});
APP.data = APP.data || {};

APP.data.afirmaciones = [
  /* ===================== ADAPTABILIDAD · NIVEL 1 (los dos) ===================== */
  { id: "a01", tipo: "comp", pool: "sim", ind: "adap-1", clave: "D", real: ["adap"], atractor: "log",
    texto: "Incorporo los ajustes que la entidad introduce a mitad de vigencia en los procedimientos a mi cargo, aunque ello reprograme la secuencia de entregas que había fijado.",
    conducta: "Incorporo los ajustes que la entidad introduce", condicion: "aunque ello reprograme la secuencia de entregas que había fijado", condTipo: "costo",
    exp: { conducta: "Poner en práctica los cambios que propone la entidad: primera conducta del nivel 1 de adaptabilidad, en sentido directo.",
           condicion: "Reprogramar la secuencia que la propia persona había fijado es lo que cuesta adaptarse. No dice que se venza un plazo ni que se incumpla lo planeado por el área.",
           extremo: "Directa con costo: D.",
           atractor: "Orientación al logro (cumplir «en los tiempos previstos») empuja a leer la reprogramación como incumplimiento y marcar A. Pero la secuencia era propia y nadie incumple nada.",
           detectar: "El verbo («incorporo») recae sobre un cambio que viene de la entidad: eso es adaptabilidad." } },
  { id: "a02", tipo: "comp", pool: "sim", ind: "adap-1", clave: "A", real: ["adap"], atractor: "log",
    texto: "Dejo para el cierre de la semana los requerimientos que surgen por fuera de la planeación, a fin de no alterar el orden de las actividades previstas.",
    conducta: "Dejo para el cierre de la semana los requerimientos que surgen por fuera de la planeación", condicion: null, condTipo: null, virtud: "a fin de no alterar el orden de las actividades previstas",
    exp: { conducta: "Aplazar todo lo inesperado hasta el final de la semana es lo contrario de «acepta con disposición el enfrentarse a nuevas e inesperadas situaciones» (adaptabilidad, nivel 1): sentido inverso.",
           condicion: "«A fin de no alterar el orden» es una virtud aparente: suena a organización, pero describe rigidez.",
           extremo: "Inversa: A.",
           atractor: "Orientación al logro (organizar y controlar el propio trabajo) hace que parezca disciplina y empuja a D. La organización que mide el nivel 1 no consiste en negarse a lo imprevisto.",
           detectar: "Lo que se evalúa es la reacción ante lo que no estaba previsto: adaptabilidad." } },
  { id: "a03", tipo: "comp", pool: "dia", ind: "adap-1", clave: "D", real: ["adap"], atractor: null,
    texto: "Me pongo al frente de las situaciones imprevistas que se presentan en la atención, aunque no correspondan a los casos para los que fui entrenado.",
    conducta: "Me pongo al frente de las situaciones imprevistas", condicion: "aunque no correspondan a los casos para los que fui entrenado", condTipo: "costo",
    exp: { conducta: "Enfrentar con disposición lo nuevo e inesperado: tercera conducta del nivel 1 de adaptabilidad.",
           condicion: "No haber sido entrenado para ese caso es un costo: exige más esfuerzo, no incumple nada.",
           extremo: "Directa con costo: D.", atractor: "",
           detectar: "«Imprevistas» y «no correspondan a los casos para los que fui entrenado» señalan adaptabilidad." } },

  /* ===================== ADAPTABILIDAD · NIVEL 2 (Laura) ===================== */
  { id: "a04", tipo: "comp", pool: "sim", ind: "adap-2", clave: "D", real: ["adap"], atractor: "etic",
    texto: "Replanteo los criterios con los que vengo resolviendo los asuntos del área cuando la entidad expone fundamentos distintos a los que sustentaban mi posición.",
    conducta: "Replanteo los criterios con los que vengo resolviendo los asuntos del área", condicion: "cuando la entidad expone fundamentos distintos a los que sustentaban mi posición", condTipo: "costo",
    exp: { conducta: "Revisar las propias certezas ante nuevos argumentos de la organización: primera conducta del nivel 2 de adaptabilidad.",
           condicion: "Abandonar una posición que se tenía sustentada es el costo de abrirse a la evidencia.",
           extremo: "Directa con costo: D.",
           atractor: "La coherencia del comportamiento ético («congruencia entre el discurso y la actuación») y el reflejo de abogado («firmeza de criterio») empujan a A. La prueba no mide firmeza: mide apertura.",
           detectar: "Cambiar el propio criterio ante argumentos de la entidad es el nivel 2 de adaptabilidad." } },
  { id: "a05", tipo: "comp", pool: "sim", ind: "adap-2", clave: "A", real: ["adap", "equ"], atractor: "equ",
    texto: "Opto por mantener la metodología que el equipo domina, aun cuando la entidad haya dispuesto una nueva para el seguimiento de los procesos.",
    conducta: "Opto por mantener la metodología que el equipo domina", condicion: "aun cuando la entidad haya dispuesto una nueva para el seguimiento de los procesos", condTipo: "falla",
    exp: { conducta: "No aplicar las metodologías que propone la organización es el sentido inverso de la segunda conducta del nivel 2 de adaptabilidad.",
           condicion: "La entidad ya dispuso la nueva metodología: mantener la anterior es dejar de cumplir una norma común de trabajo.",
           extremo: "Inversa: A.",
           atractor: "Trabajo en equipo («lo que el equipo domina») suena a cohesión y empuja a D. Pero el nivel 1 de trabajo en equipo pide aceptar las normas comunes establecidas, y la entidad ya fijó la nueva.",
           detectar: "Mide la respuesta frente a un cambio dispuesto por la entidad: adaptabilidad. También roza trabajo en equipo (normas comunes)." } },
  { id: "a06", tipo: "comp", pool: "dia", ind: "adap-2", clave: "D", real: ["adap"], atractor: null,
    texto: "Promuevo entre mis compañeros la adopción de las nuevas dinámicas de trabajo, incluso cuando la decisión de implementarlas no fue consultada con el área.",
    conducta: "Promuevo entre mis compañeros la adopción de las nuevas dinámicas de trabajo", condicion: "incluso cuando la decisión de implementarlas no fue consultada con el área", condTipo: "costo",
    exp: { conducta: "Apoyar y promover los cambios en las dinámicas laborales: tercera conducta del nivel 2 de adaptabilidad.",
           condicion: "Que no lo hayan consultado es una incomodidad, un costo. No es una falla de quien promueve el cambio.",
           extremo: "Directa con costo: D.", atractor: "",
           detectar: "Promover el cambio en otros es el salto del nivel 1 (aplicarlo) al nivel 2 (impulsarlo)." } },

  /* ===================== COMPORTAMIENTO ÉTICO · NIVEL 1 (los dos) ===================== */
  { id: "e01", tipo: "comp", pool: "sim", ind: "etic-1", clave: "A", real: ["etic"], atractor: "usu",
    texto: "Agilizo el trámite de los contribuyentes que conozco cuando su urgencia está debidamente justificada.",
    conducta: "Agilizo el trámite de los contribuyentes que conozco", condicion: "cuando su urgencia está debidamente justificada", condTipo: "falla", virtud: "debidamente justificada",
    exp: { conducta: "Dar un trámite más rápido a personas conocidas es trato preferencial: contrario al código de integridad (comportamiento ético, nivel 1).",
           condicion: "La urgencia «debidamente justificada» es la justificación noble que disfraza la falta. Si la urgencia justificara agilizar, valdría para todos, no solo para los conocidos.",
           extremo: "Inversa: A.",
           atractor: "Orientación al usuario (respuestas oportunas) empuja a D. Pero la palabra que decide es «que conozco»: el beneficio depende de la cercanía.",
           detectar: "Cuando aparece una relación personal (conocidos, amigos, familiares), piensa en ética e integridad antes que en servicio." } },
  { id: "e02", tipo: "comp", pool: "sim", ind: "etic-1", clave: "D", real: ["etic"], atractor: null,
    texto: "Me ciño a lo que establece el código de integridad en las decisiones de mi cargo, aun cuando no exista un procedimiento escrito que lo exija.",
    conducta: "Me ciño a lo que establece el código de integridad en las decisiones de mi cargo", condicion: "aun cuando no exista un procedimiento escrito que lo exija", condTipo: "costo",
    exp: { conducta: "Conocer y aplicar el código de integridad: segunda conducta del nivel 1 de comportamiento ético.",
           condicion: "Que ningún procedimiento lo exija es un costo: la persona lo hace por convicción, sin obligación formal.",
           extremo: "Directa con costo: D.", atractor: "",
           detectar: "La mención expresa del código de integridad en una afirmación comportamental suele señalar comportamiento ético." } },
  { id: "e03", tipo: "comp", pool: "dia", ind: "etic-1", clave: "A", real: ["etic"], atractor: "com",
    texto: "Anticipo a los interesados el sentido probable de las decisiones que aún están en estudio, para que puedan prepararse con tiempo.",
    conducta: "Anticipo a los interesados el sentido probable de las decisiones que aún están en estudio", condicion: null, condTipo: null, virtud: "para que puedan prepararse con tiempo",
    exp: { conducta: "Revelar el sentido de decisiones que no se han adoptado compromete la reserva y la imparcialidad que exige el código: comportamiento ético en sentido inverso.",
           condicion: "«Para que puedan prepararse» es la finalidad amable que disfraza la falta.",
           extremo: "Inversa: A.",
           atractor: "Comunicación efectiva (dar información a tiempo) empuja a D. Pero lo que se comunica es información que todavía no debe salir.",
           detectar: "Información de decisiones en estudio: piensa en reserva y ética." } },

  /* ===================== COMPORTAMIENTO ÉTICO · NIVEL 4 (los dos) ===================== */
  { id: "e04", tipo: "comp", pool: "sim", ind: "etic-4", clave: "D", real: ["etic"], atractor: "equ",
    texto: "Planteo en las reuniones del equipo las prácticas que se apartan del código de integridad, así ello genere tensiones con compañeros de mayor antigüedad.",
    conducta: "Planteo en las reuniones del equipo las prácticas que se apartan del código de integridad", condicion: "así ello genere tensiones con compañeros de mayor antigüedad", condTipo: "costo",
    exp: { conducta: "Promover en los equipos la práctica del código de integridad: segunda conducta del nivel 4 de comportamiento ético.",
           condicion: "Las tensiones con compañeros antiguos son el costo de hacerlo. No es una falla.",
           extremo: "Directa con costo: D.",
           atractor: "Trabajo en equipo (armonía, colaboración) hace pensar que generar tensiones es malo y empuja a A. El nivel 4 de ética pesa más: ser referente exige incomodar.",
           detectar: "Promover el código ante otros, y no solo cumplirlo, es el nivel 4." } },
  { id: "e05", tipo: "comp", pool: "sim", ind: "etic-4", clave: "A", real: ["etic"], atractor: "equ",
    texto: "Limito mi aporte ético al cumplimiento de mis propias funciones, porque la orientación de los demás en esa materia le corresponde a la jefatura.",
    conducta: "Limito mi aporte ético al cumplimiento de mis propias funciones", condicion: null, condTipo: null, virtud: "porque la orientación de los demás en esa materia le corresponde a la jefatura",
    exp: { conducta: "Restringir la ética a lo propio es lo contrario de promoverla en los equipos y de ser referente (nivel 4): sentido inverso.",
           condicion: "La razón («le corresponde a la jefatura») suena a respeto por las funciones de otros: virtud aparente.",
           extremo: "Inversa: A.",
           atractor: "El respeto por la línea de mando (trabajo en equipo, normas comunes) empuja a D. Pero el nivel 4 dice que la persona promueve el código «en los equipos de trabajo en los que participa».",
           detectar: "«Limito» frente a una conducta que el nivel 4 pide extender a otros: inversa." } },
  { id: "e06", tipo: "comp", pool: "dia", ind: "etic-4", clave: "D", real: ["etic"], atractor: null,
    texto: "Evalúo el efecto que mis decisiones pueden tener en la confianza de los ciudadanos hacia la entidad antes de adoptarlas.",
    conducta: "Evalúo el efecto que mis decisiones pueden tener en la confianza de los ciudadanos hacia la entidad", condicion: null, condTipo: null,
    exp: { conducta: "Ser consciente de las repercusiones de la propia actuación en el servicio de la entidad: primera conducta del nivel 4.",
           condicion: "No tiene condición que la desmienta.", extremo: "Directa: D.", atractor: "",
           detectar: "Pensar en el impacto institucional de la propia conducta es el nivel 4 de ética." } },

  /* ===================== COMUNICACIÓN EFECTIVA · NIVEL 1 (los dos) ===================== */
  { id: "c01", tipo: "comp", pool: "sim", ind: "com-1", clave: "A", real: ["com"], atractor: "log",
    texto: "Remito por escrito las instrucciones del procedimiento a quien las solicita, con lo cual doy por cumplida la orientación requerida.",
    conducta: "Remito por escrito las instrucciones del procedimiento a quien las solicita", condicion: "con lo cual doy por cumplida la orientación requerida", condTipo: "falla",
    exp: { conducta: "Enviar instrucciones es comunicar, pero el nivel 1 exige asegurarse de que el interlocutor comprenda el mensaje.",
           condicion: "«Doy por cumplida la orientación» con el solo envío es la falla: nadie verifica que se entendió.",
           extremo: "Directa con falla: A.",
           atractor: "Orientación al logro (eficiencia, uso de la tecnología, cumplir lo solicitado) empuja a D. Pero lo que se mide es si el mensaje llegó.",
           detectar: "Cuando la afirmación termina en «doy por cumplida», «doy por hecho» o «una sola vez», piensa en comunicación sin verificación." } },
  { id: "c02", tipo: "comp", pool: "sim", ind: "com-1", clave: "D", real: ["com"], atractor: "usu",
    texto: "Indago sobre los antecedentes de cada solicitud antes de emitir una respuesta, así el solicitante considere que ya aportó lo necesario.",
    conducta: "Indago sobre los antecedentes de cada solicitud antes de emitir una respuesta", condicion: "así el solicitante considere que ya aportó lo necesario", condTipo: "costo",
    exp: { conducta: "Hacer las preguntas adecuadas para obtener la información necesaria: segunda conducta del nivel 1.",
           condicion: "La incomodidad del solicitante es un costo; no se deja de atenderlo ni se vence un término.",
           extremo: "Directa con costo: D.",
           atractor: "Orientación al usuario (satisfacer expectativas, rapidez) hace pensar que contrariar al solicitante es malo y empuja a A.",
           detectar: "«Indago», «pregunto», «consulto los antecedentes»: comunicación efectiva, nivel 1." } },
  { id: "c03", tipo: "comp", pool: "dia", ind: "com-1", clave: "D", real: ["com"], atractor: null,
    texto: "Confirmo con mi interlocutor el sentido de lo que le expliqué cuando advierto que el tema le resulta ajeno.",
    conducta: "Confirmo con mi interlocutor el sentido de lo que le expliqué", condicion: "cuando advierto que el tema le resulta ajeno", condTipo: null,
    exp: { conducta: "Asegurarse de que el interlocutor comprenda: tercera conducta del nivel 1.",
           condicion: "La circunstancia solo describe cuándo se hace; no es costo ni falla.", extremo: "Directa: D.", atractor: "",
           detectar: "Verificar la comprensión es la marca del nivel 1." } },

  /* ===================== COMUNICACIÓN EFECTIVA · NIVEL 2 (Juan David) ===================== */
  { id: "c04", tipo: "comp", pool: "sim", ind: "com-2", clave: "D", real: ["com"], atractor: "equ",
    texto: "Expongo ante mis superiores las objeciones que tengo frente a una directriz, con argumentos y en el espacio dispuesto para ello.",
    conducta: "Expongo ante mis superiores las objeciones que tengo frente a una directriz", condicion: "con argumentos y en el espacio dispuesto para ello", condTipo: null,
    exp: { conducta: "Comunicar con transparencia y asertividad los desacuerdos: segunda conducta del nivel 2.",
           condicion: "«Con argumentos y en el espacio dispuesto» describe la forma asertiva: refuerza la conducta.",
           extremo: "Directa: D.",
           atractor: "Trabajo en equipo (aceptar las normas comunes, cumplir los acuerdos) puede leer la objeción como indisciplina y empujar a A.",
           detectar: "Decir el desacuerdo con argumentos y por el canal correcto es asertividad: nivel 2." } },
  { id: "c05", tipo: "comp", pool: "sim", ind: "com-2", clave: "A", real: ["com"], atractor: "v-jus",
    texto: "Utilizo el mismo lenguaje técnico con todos los contribuyentes, para no generar diferencias en la información que cada uno recibe.",
    conducta: "Utilizo el mismo lenguaje técnico con todos los contribuyentes", condicion: null, condTipo: null, virtud: "para no generar diferencias en la información que cada uno recibe",
    exp: { conducta: "No adaptar el discurso al tipo de interlocutor es el sentido inverso de la tercera conducta del nivel 2.",
           condicion: "«Para no generar diferencias» es una virtud aparente de igualdad.",
           extremo: "Inversa: A.",
           atractor: "La justicia (igualdad, no discriminación) empuja a D. Pero adaptar el lenguaje no cambia el contenido de la información: la iguala en comprensión.",
           detectar: "Lenguaje, canal, forma de explicar según la persona: comunicación efectiva, nivel 2." } },
  { id: "c06", tipo: "comp", pool: "dia", ind: "com-2", clave: "D", real: ["com"], atractor: null,
    texto: "Manifiesto mi conformidad o mi desacuerdo con las propuestas del equipo en el momento en que se discuten, y no después de adoptadas.",
    conducta: "Manifiesto mi conformidad o mi desacuerdo con las propuestas del equipo", condicion: "en el momento en que se discuten, y no después de adoptadas", condTipo: null,
    exp: { conducta: "Comunicar con transparencia tanto los acuerdos como los desacuerdos: nivel 2.",
           condicion: "Hacerlo a tiempo refuerza la transparencia.", extremo: "Directa: D.", atractor: "",
           detectar: "Acuerdos y desacuerdos dichos abiertamente: comunicación efectiva, nivel 2." } },

  /* ===================== COMUNICACIÓN EFECTIVA · NIVEL 3 (Laura) ===================== */
  { id: "c07", tipo: "comp", pool: "sim", ind: "com-3", clave: "A", real: ["com"], atractor: "etic",
    texto: "Reservo para mi grupo de trabajo las actualizaciones de doctrina que recopilo, mientras otras áreas no las soliciten formalmente.",
    conducta: "Reservo para mi grupo de trabajo las actualizaciones de doctrina que recopilo", condicion: "mientras otras áreas no las soliciten formalmente", condTipo: "falla",
    exp: { conducta: "Retener información que sirve a otras áreas crea una barrera a su circulación: sentido inverso de la segunda conducta del nivel 3.",
           condicion: "Esperar una solicitud formal mantiene la barrera.",
           extremo: "Inversa: A.",
           atractor: "Comportamiento ético (reserva, confidencialidad) empuja a D porque «reservar» suena prudente. Pero la doctrina no es información reservada: es criterio que debe circular.",
           detectar: "Cuando el objeto es información de la organización y la conducta la frena o la libera, piensa en comunicación efectiva, nivel 3." } },
  { id: "c08", tipo: "comp", pool: "sim", ind: "com-3", clave: "D", real: ["com"], atractor: "log",
    texto: "Dispongo repositorios compartidos para que la información que produce el área esté al alcance de quienes la necesitan, aunque su organización me demande tiempo adicional.",
    conducta: "Dispongo repositorios compartidos para que la información que produce el área esté al alcance de quienes la necesitan", condicion: "aunque su organización me demande tiempo adicional", condTipo: "costo",
    exp: { conducta: "Minimizar las barreras para que la información circule, con ayuda de la tecnología: segunda conducta del nivel 3.",
           condicion: "El tiempo adicional es un costo.", extremo: "Directa con costo: D.",
           atractor: "Orientación al logro (cumplir con los recursos y tiempos asignados) puede hacer ver ese tiempo como desvío y empujar a A.",
           detectar: "Repositorios, canales, herramientas para que la información llegue: nivel 3 de comunicación." } },
  { id: "c09", tipo: "comp", pool: "dia", ind: "com-3", clave: "D", real: ["com"], atractor: null,
    texto: "Fomento espacios de intercambio con otras dependencias para que los criterios que aplicamos se conozcan y se discutan.",
    conducta: "Fomento espacios de intercambio con otras dependencias", condicion: "para que los criterios que aplicamos se conozcan y se discutan", condTipo: null,
    exp: { conducta: "Consolidar redes de contacto internas con clima de colaboración: primera conducta del nivel 3.",
           condicion: "La finalidad refuerza la conducta.", extremo: "Directa: D.", atractor: "",
           detectar: "Redes, intercambio, colaboración entre áreas: nivel 3 de comunicación." } },

  /* ===================== ORIENTACIÓN AL LOGRO · NIVEL 1 (los dos) ===================== */
  { id: "l01", tipo: "comp", pool: "sim", ind: "log-1", clave: "D", real: ["log"], atractor: null,
    texto: "Llevo un control de los compromisos asumidos en cada comité para verificar su cumplimiento antes de la siguiente sesión.",
    conducta: "Llevo un control de los compromisos asumidos en cada comité", condicion: "para verificar su cumplimiento antes de la siguiente sesión", condTipo: null,
    exp: { conducta: "Organizar y controlar el propio trabajo: segunda conducta del nivel 1 de orientación al logro.",
           condicion: "La finalidad refuerza la conducta.", extremo: "Directa: D.", atractor: "",
           detectar: "Control, seguimiento y cumplimiento de lo propio: orientación al logro." } },
  { id: "l02", tipo: "comp", pool: "sim", ind: "log-1", clave: "A", real: ["log"], atractor: "usu",
    texto: "Amplío por mi cuenta el plazo de las entregas cuando estimo que con más tiempo el resultado tendrá mejor calidad.",
    conducta: "Amplío por mi cuenta el plazo de las entregas", condicion: "cuando estimo que con más tiempo el resultado tendrá mejor calidad", condTipo: "falla", virtud: "tendrá mejor calidad",
    exp: { conducta: "Cambiar unilateralmente el plazo es dejar de cumplir «en los tiempos previstos»: primera conducta del nivel 1, en sentido inverso.",
           condicion: "La calidad es la virtud aparente. Compárela con la afirmación real de ANLA sobre «ajustes que otros consideran innecesarios»: allá se invertía más trabajo sin vencer el plazo (D); aquí se vence el plazo (A).",
           extremo: "Inversa: A.",
           atractor: "La calidad (estándares de calidad, mejor servicio) empuja a D. La palabra que decide es «amplío por mi cuenta el plazo».",
           detectar: "Plazos y entregas propias: orientación al logro." } },
  { id: "l03", tipo: "comp", pool: "dia", ind: "log-1", clave: "A", real: ["log"], atractor: "adap",
    texto: "Distribuyo mi jornada según la carga que se presenta cada día, sin fijar de antemano el orden de las tareas.",
    conducta: "Distribuyo mi jornada según la carga que se presenta cada día", condicion: "sin fijar de antemano el orden de las tareas", condTipo: "falla",
    exp: { conducta: "No organizar de antemano el propio trabajo es el sentido inverso de la segunda conducta del nivel 1 de orientación al logro.",
           condicion: "«Sin fijar de antemano» revela que no hay organización ni control.",
           extremo: "Inversa: A.",
           atractor: "Adaptabilidad (responder a cada situación) hace que suene flexible y empuja a D. La adaptabilidad no consiste en renunciar a organizarse.",
           detectar: "Organización del propio trabajo: orientación al logro." } },

  /* ===================== ORIENTACIÓN AL LOGRO · NIVEL 3 (Juan David) ===================== */
  { id: "l04", tipo: "comp", pool: "sim", ind: "log-3", clave: "D", real: ["log"], atractor: "v-dil",
    texto: "Tengo previstas alternativas para los procesos críticos de la dependencia, aun cuando su ejecución no se haya visto amenazada.",
    conducta: "Tengo previstas alternativas para los procesos críticos de la dependencia", condicion: "aun cuando su ejecución no se haya visto amenazada", condTipo: "costo",
    exp: { conducta: "Prever planes de contingencia para asegurar los resultados de la dependencia: primera conducta del nivel 3.",
           condicion: "Prepararse sin amenaza a la vista es el costo de anticiparse.",
           extremo: "Directa con costo: D.",
           atractor: "La diligencia (no malgastar recursos) puede hacer ver la preparación sin amenaza como desperdicio y empujar a A.",
           detectar: "«Previstas», «alternativas», «contingencia»: nivel 3 de orientación al logro." } },
  { id: "l05", tipo: "comp", pool: "sim", ind: "log-3", clave: "A", real: ["log"], atractor: "v-jus",
    texto: "Reviso el avance de las metas del área al finalizar cada vigencia, momento en el cual se cuenta con la información completa.",
    conducta: "Reviso el avance de las metas del área al finalizar cada vigencia", condicion: null, condTipo: null, virtud: "momento en el cual se cuenta con la información completa",
    exp: { conducta: "Revisar solo al final de la vigencia es lo contrario de monitorear los resultados para corregir el método a tiempo (segunda conducta del nivel 3).",
           condicion: "«Con la información completa» es la virtud aparente del rigor.",
           extremo: "Inversa: A.",
           atractor: "La justicia (decidir con información objetiva y completa) empuja a D. Pero lo que se mide es el monitoreo oportuno.",
           detectar: "Metas, indicadores, seguimiento: orientación al logro." } },
  { id: "l06", tipo: "comp", pool: "dia", ind: "log-3", clave: "D", real: ["log"], atractor: null,
    texto: "Mantengo al equipo enfocado en los resultados comprometidos cuando la presión de los vencimientos genera desánimo.",
    conducta: "Mantengo al equipo enfocado en los resultados comprometidos", condicion: "cuando la presión de los vencimientos genera desánimo", condTipo: null,
    exp: { conducta: "Promover en el equipo el cumplimiento de los resultados gestionando la presión: tercera conducta del nivel 3.",
           condicion: "La presión es el escenario en que se demuestra la conducta.", extremo: "Directa: D.", atractor: "",
           detectar: "Resultados más presión más equipo: nivel 3 de orientación al logro." } },

  /* ===================== ORIENTACIÓN AL USUARIO · NIVEL 1 (los dos) ===================== */
  { id: "u01", tipo: "comp", pool: "sim", ind: "usu-1", clave: "A", real: ["usu"], atractor: "v-jus",
    texto: "Aplico a todos los usuarios el mismo tiempo de atención, con independencia de la dificultad que cada uno tenga para comprender el trámite.",
    conducta: "Aplico a todos los usuarios el mismo tiempo de atención", condicion: "con independencia de la dificultad que cada uno tenga para comprender el trámite", condTipo: "falla", virtud: "a todos los usuarios el mismo",
    exp: { conducta: "Un tiempo idéntico para todos, sin importar la necesidad, es una barrera con apariencia de igualdad: contraria a escuchar y atender las necesidades (nivel 1).",
           condicion: "Ignorar la dificultad de cada uno para comprender es la falla.",
           extremo: "Inversa: A.",
           atractor: "La justicia (igualdad) empuja a D. Pero el Código pide reconocer los derechos de cada persona «de acuerdo con sus necesidades y condiciones»: tratar igual a quien está en situación distinta no es equidad.",
           detectar: "Atención al usuario y su necesidad concreta: orientación al usuario." } },
  { id: "u02", tipo: "comp", pool: "sim", ind: "usu-1", clave: "D", real: ["usu"], atractor: "log",
    texto: "Oriento al ciudadano sobre la totalidad de los pasos que debe surtir, aun cuando su consulta inicial se limite a uno de ellos.",
    conducta: "Oriento al ciudadano sobre la totalidad de los pasos que debe surtir", condicion: "aun cuando su consulta inicial se limite a uno de ellos", condTipo: "costo",
    exp: { conducta: "Escuchar la necesidad real y dar una solución completa: primera conducta del nivel 1.",
           condicion: "Ir más allá de lo preguntado cuesta tiempo; no incumple nada.",
           extremo: "Directa con costo: D.",
           atractor: "Orientación al logro (eficiencia, cumplir solo lo solicitado) empuja a A.",
           detectar: "El ciudadano y su necesidad son el centro: orientación al usuario." } },
  { id: "u03", tipo: "comp", pool: "dia", ind: "usu-1", clave: "D", real: ["usu"], atractor: null,
    texto: "Atiendo con cordialidad a quienes llegan molestos por demoras que no dependen de mí.",
    conducta: "Atiendo con cordialidad", condicion: "a quienes llegan molestos por demoras que no dependen de mí", condTipo: "costo",
    exp: { conducta: "Disposición de servicio, amabilidad y respeto: tercera conducta del nivel 1.",
           condicion: "El malestar ajeno es el costo; la conducta se mantiene.", extremo: "Directa con costo: D.", atractor: "",
           detectar: "Amabilidad en la atención: orientación al usuario." } },

  /* ===================== ORIENTACIÓN AL USUARIO · NIVEL 3 (Juan David) ===================== */
  { id: "u04", tipo: "comp", pool: "sim", ind: "usu-3", clave: "D", real: ["usu"], atractor: "equ",
    texto: "Hago seguimiento ante las otras áreas a los asuntos que remito por competencia, hasta que el contribuyente obtiene respuesta.",
    conducta: "Hago seguimiento ante las otras áreas a los asuntos que remito por competencia", condicion: "hasta que el contribuyente obtiene respuesta", condTipo: "costo",
    exp: { conducta: "Crear puentes entre unidades para que el requerimiento se cumpla: primera conducta del nivel 3.",
           condicion: "Seguir el caso hasta el final es el costo; nada se incumple.",
           extremo: "Directa con costo: D.",
           atractor: "Trabajo en equipo (respetar lo que le toca a cada área) puede hacer ver el seguimiento como intromisión y empujar a A.",
           detectar: "Varias áreas o entidades y un ciudadano esperando: nivel 3 de orientación al usuario." } },
  { id: "u05", tipo: "comp", pool: "sim", ind: "usu-3", clave: "A", real: ["usu"], atractor: "com",
    texto: "Remito al contribuyente a la entidad competente con la indicación de la dirección a la que debe acudir, y con ello concluyo mi intervención.",
    conducta: "Remito al contribuyente a la entidad competente", condicion: "y con ello concluyo mi intervención", condTipo: "falla",
    exp: { conducta: "Orientar está bien, pero el nivel 3 pide crear puentes entre unidades, procesos y entidades, no trasladar la carga al ciudadano.",
           condicion: "«Con ello concluyo mi intervención» es la falla: el puente nunca se tiende.",
           extremo: "Directa con falla: A.",
           atractor: "Comunicación efectiva y orientación al usuario de nivel 1 (dar información clara) empujan a D. Para el nivel 3 no basta informar.",
           detectar: "Remisiones entre entidades: nivel 3 de orientación al usuario." } },
  { id: "u06", tipo: "comp", pool: "dia", ind: "usu-3", clave: "D", real: ["usu"], atractor: null,
    texto: "Propongo ajustes a los canales digitales de atención a partir de las dificultades que reportan los usuarios.",
    conducta: "Propongo ajustes a los canales digitales de atención", condicion: "a partir de las dificultades que reportan los usuarios", condTipo: null,
    exp: { conducta: "Estudiar las necesidades de los usuarios para mejorar el servicio con uso intensivo de la tecnología: segunda conducta del nivel 3.",
           condicion: "La fuente de la propuesta refuerza la conducta.", extremo: "Directa: D.", atractor: "",
           detectar: "Mejorar el servicio a partir de las necesidades: nivel 3." } },

  /* ===================== TRABAJO EN EQUIPO · NIVEL 1 (los dos) ===================== */
  { id: "t01", tipo: "comp", pool: "sim", ind: "equ-1", clave: "D", real: ["equ"], atractor: "log",
    texto: "Me acojo a la distribución de expedientes definida en el comité del grupo, aun cuando me asigne asuntos ajenos a mi especialidad.",
    conducta: "Me acojo a la distribución de expedientes definida en el comité del grupo", condicion: "aun cuando me asigne asuntos ajenos a mi especialidad", condTipo: "costo",
    exp: { conducta: "Cumplir los acuerdos del equipo: primera conducta del nivel 1 de trabajo en equipo.",
           condicion: "Recibir asuntos fuera de la especialidad es un costo.",
           extremo: "Directa con costo: D.",
           atractor: "Orientación al logro (productividad, cada quien en lo que mejor hace) empuja a A.",
           detectar: "Acuerdos del grupo y su cumplimiento: trabajo en equipo." } },
  { id: "t02", tipo: "comp", pool: "sim", ind: "equ-1", clave: "A", real: ["equ"], atractor: "log",
    texto: "Participo en las reuniones del equipo cuando los temas de la agenda guardan relación directa con mis funciones.",
    conducta: "Participo en las reuniones del equipo", condicion: "cuando los temas de la agenda guardan relación directa con mis funciones", condTipo: "falla",
    exp: { conducta: "Participar en las actividades del equipo es la primera conducta del nivel 1.",
           condicion: "Condicionar la participación a que el tema sea propio es la falla: el equipo no es solo lo que me toca.",
           extremo: "Directa con falla: A.",
           atractor: "Orientación al logro (usar bien el tiempo, enfocarse en lo propio) empuja a D.",
           detectar: "Reuniones, acuerdos y actividades comunes: trabajo en equipo." } },
  { id: "t03", tipo: "comp", pool: "dia", ind: "equ-1", clave: "D", real: ["equ"], atractor: null,
    texto: "Asumo parte de la carga de un compañero que enfrenta una contingencia, aunque eso aplace mis propias actividades.",
    conducta: "Asumo parte de la carga de un compañero que enfrenta una contingencia", condicion: "aunque eso aplace mis propias actividades", condTipo: "costo",
    exp: { conducta: "Colaborar con los demás integrantes del equipo: segunda conducta del nivel 1.",
           condicion: "Aplazar lo propio para ayudar es costo; lo que sería falla es aplazar lo planeado por el área o vencer un plazo.",
           extremo: "Directa con costo: D.", atractor: "",
           detectar: "Ayudar a un compañero: trabajo en equipo." } },

  /* ===================== TRABAJO EN EQUIPO · NIVEL 2 (Laura) ===================== */
  { id: "t04", tipo: "comp", pool: "sim", ind: "equ-2", clave: "D", real: ["equ"], atractor: "etic",
    texto: "Incorporo en los documentos del grupo las observaciones de compañeros con formación distinta a la mía, aunque parezcan alejadas del enfoque jurídico.",
    conducta: "Incorporo en los documentos del grupo las observaciones de compañeros con formación distinta a la mía", condicion: "aunque parezcan alejadas del enfoque jurídico", condTipo: "costo",
    exp: { conducta: "Reconocer el aporte de cada integrante y el valor de la diversidad de opinión: segunda conducta del nivel 2.",
           condicion: "Que el aporte parezca ajeno al enfoque jurídico es el costo de valorar la diversidad.",
           extremo: "Directa con costo: D.",
           atractor: "La trampa del abogado: «alejadas del enfoque jurídico» invita a pensar en rigor técnico y marcar A.",
           detectar: "Aportes de otros y diversidad de opinión: trabajo en equipo, nivel 2." } },
  { id: "t05", tipo: "comp", pool: "sim", ind: "equ-2", clave: "A", real: ["equ", "etic"], atractor: "log",
    texto: "Presento como propia la solución final de un caso cuando fui yo quien la redactó, aunque se haya construido con aportes del equipo.",
    conducta: "Presento como propia la solución final de un caso", condicion: "aunque se haya construido con aportes del equipo", condTipo: "falla", virtud: "cuando fui yo quien la redactó",
    exp: { conducta: "No reconocer el aporte de los demás es el sentido inverso de la segunda conducta del nivel 2. También roza la honestidad.",
           condicion: "Los aportes del equipo hacen que la conducta sea una falla, no un mérito.",
           extremo: "Inversa: A.",
           atractor: "Orientación al logro (responsabilizarse por el propio resultado) empuja a D. Redactar no es construir sola.",
           detectar: "Reconocimiento de aportes: trabajo en equipo, nivel 2; y ética." } },
  { id: "t06", tipo: "comp", pool: "dia", ind: "equ-2", clave: "D", real: ["equ"], atractor: null,
    texto: "Explico a los compañeros recién vinculados los criterios que he construido con la experiencia, sin esperar a que me lo pidan.",
    conducta: "Explico a los compañeros recién vinculados los criterios que he construido con la experiencia", condicion: "sin esperar a que me lo pidan", condTipo: null,
    exp: { conducta: "Aportar el propio conocimiento al equipo: segunda conducta del nivel 2.",
           condicion: "Hacerlo por iniciativa refuerza la conducta.", extremo: "Directa: D.", atractor: "",
           detectar: "Compartir conocimiento: trabajo en equipo, nivel 2." } },

  /* ===================== CONTROL (comportamental) ===================== */
  { id: "x01", tipo: "comp", pool: "sim", ind: null, clave: "H", real: [], atractor: "equ",
    texto: "A lo largo de mi vida laboral he recibido cada instrucción de mis superiores sin experimentar inconformidad alguna.",
    conducta: "he recibido cada instrucción de mis superiores", condicion: "sin experimentar inconformidad alguna", condTipo: null, virtud: "A lo largo de mi vida laboral",
    exp: { conducta: "Parece una conducta (acatar instrucciones), pero lo que afirma es un estado emocional absoluto: nunca haber sentido inconformidad.",
           condicion: "«A lo largo de mi vida laboral» y «alguna» hacen imposible estar totalmente de acuerdo con honestidad.",
           extremo: "Afirmación de control: respuesta honesta, A o B.",
           atractor: "Trabajo en equipo (aceptar normas e instrucciones) empuja a D. Pero ninguna conducta del diccionario pide no sentir inconformidad.",
           detectar: "Sentimientos más absolutos («nunca», «alguna», «toda mi vida»): control." } },
  { id: "x02", tipo: "comp", pool: "sim", ind: null, clave: "H", real: [], atractor: "log",
    texto: "Entrego cada producto en la fecha prevista sin que en mi trayectoria se registre un solo incumplimiento.",
    conducta: "Entrego cada producto en la fecha prevista", condicion: "sin que en mi trayectoria se registre un solo incumplimiento", condTipo: null, virtud: "un solo incumplimiento",
    exp: { conducta: "La primera parte es una conducta de orientación al logro. La segunda la convierte en una afirmación de perfección.",
           condicion: "«Sin que en mi trayectoria se registre un solo incumplimiento» es imposible de sostener con honestidad.",
           extremo: "Afirmación de control: respuesta honesta, A o B.",
           atractor: "Orientación al logro empuja a D. Es el mismo patrón de «Nunca he dejado una tarea para después», que ya fallaron una vez.",
           detectar: "Conducta más «un solo», «jamás», «en toda mi trayectoria»: control." } },
  { id: "x03", tipo: "comp", pool: "sim", ind: null, clave: "H", real: [], atractor: "usu",
    texto: "Conservo la misma serenidad en todas las jornadas de atención, sin que la actitud de algún usuario haya llegado a afectarme.",
    conducta: "Conservo la misma serenidad en todas las jornadas de atención", condicion: "sin que la actitud de algún usuario haya llegado a afectarme", condTipo: null, virtud: "en todas las jornadas",
    exp: { conducta: "No describe una conducta de servicio, sino un estado de ánimo constante.",
           condicion: "«Todas las jornadas» y «sin que... haya llegado a afectarme»: perfección emocional.",
           extremo: "Afirmación de control: respuesta honesta, A o B.",
           atractor: "Orientación al usuario (amabilidad) empuja a D. Compara: «Atiendo con cordialidad a quienes llegan molestos» describe una conducta (D); esta describe no sentir nada (control).",
           detectar: "Estados emocionales permanentes: control." } },
  { id: "x04", tipo: "comp", pool: "dia", ind: null, clave: "H", real: [], atractor: "equ",
    texto: "Disfruto por igual el trabajo con cada uno de mis compañeros, sin excepción.",
    conducta: "Disfruto por igual el trabajo con cada uno de mis compañeros", condicion: "sin excepción", condTipo: null,
    exp: { conducta: "Habla de un sentimiento (disfrutar), no de una conducta.", condicion: "«Por igual» y «sin excepción»: absoluto.",
           extremo: "Afirmación de control: respuesta honesta, A o B.", atractor: "Trabajo en equipo empuja a D.",
           detectar: "Sentimiento más absoluto: control." } },

  /* ===================== INTEGRIDAD · HONESTIDAD ===================== */
  { id: "ih1", tipo: "integ", pool: "sim", val: "v-hon", clave: "D", real: ["v-hon"], atractor: "v-dil",
    texto: "Informo a mi jefe el error que cometí en la liquidación de un expediente, aunque con ello se reabra un trámite que ya se había dado por concluido.",
    conducta: "Informo a mi jefe el error que cometí en la liquidación de un expediente", condicion: "aunque con ello se reabra un trámite que ya se había dado por concluido", condTipo: "costo",
    exp: { conducta: "«Siempre digo la verdad, incluso cuando tengo errores»: pauta de honestidad, en sentido directo.",
           condicion: "Reabrir el trámite es el costo de decir la verdad. No es una falla de quien informa: la falla fue el error, y se está corrigiendo.",
           extremo: "Directa con costo: D.",
           atractor: "La diligencia (no reabrir, no postergar) empuja a leer la reapertura como falla y marcar A. Es exactamente el patrón de i08, i38 e i40: «aunque» más un costo leído como falla.",
           detectar: "Verdad sobre los propios errores: honestidad." } },
  { id: "ih2", tipo: "integ", pool: "sim", val: "v-hon", clave: "A", real: ["v-hon", "v-dil"], atractor: null,
    texto: "Utilizo el equipo de cómputo asignado para adelantar gestiones personales una vez concluyo mis labores del día.",
    conducta: "Utilizo el equipo de cómputo asignado para adelantar gestiones personales", condicion: "una vez concluyo mis labores del día", condTipo: "falla", virtud: "una vez concluyo mis labores del día",
    exp: { conducta: "Usar bienes asignados para fines personales está en el «lo que no hago» de honestidad (y la diligencia pide no malgastar recursos públicos).",
           condicion: "«Una vez concluyo mis labores» es una justificación de la lista que disfraza faltas: no la convierte en pauta.",
           extremo: "Inversa: A.", atractor: "",
           detectar: "Recursos públicos para fines personales: honestidad." } },
  { id: "ih3", tipo: "integ", pool: "sim", val: "v-hon", clave: "D", real: ["v-hon"], atractor: "v-comp",
    texto: "Me declaro impedido para conocer el asunto de un familiar, aunque mi conocimiento del tema agilizaría su resolución.",
    conducta: "Me declaro impedido para conocer el asunto de un familiar", condicion: "aunque mi conocimiento del tema agilizaría su resolución", condTipo: "costo",
    exp: { conducta: "Apartarse de los asuntos en que hay conflicto de intereses: pauta de honestidad.",
           condicion: "Perder la agilidad que daría el propio conocimiento es el costo.",
           extremo: "Directa con costo: D.",
           atractor: "El compromiso (servicio ágil) empuja a pensar que apartarse perjudica al ciudadano y a marcar A.",
           detectar: "Familiares, intereses personales, impedimentos: honestidad." } },
  { id: "ih4", tipo: "integ", pool: "dia", val: "v-hon", clave: "D", real: ["v-hon"], atractor: null,
    texto: "Digo siempre la verdad acerca de mis equivocaciones en el trabajo, aun cuando me resulte incómodo.",
    conducta: "Digo siempre la verdad acerca de mis equivocaciones en el trabajo", condicion: "aun cuando me resulte incómodo", condTipo: "costo",
    exp: { conducta: "Repite casi literal la pauta del Código: «Siempre digo la verdad, incluso cuando tengo errores».",
           condicion: "La incomodidad es costo.",
           extremo: "D. Ojo: el «siempre» no la convierte en control, porque repite una pauta del Código.",
           atractor: "", detectar: "Pauta del Código con «siempre»: extremo favorable, no control." } },
  { id: "ih5", tipo: "integ", pool: "dia", val: "v-hon", clave: "A", real: ["v-hon"], atractor: "v-comp",
    texto: "Comento con mis allegados la situación tributaria de personas conocidas cuando estoy seguro de que la información no afectará su reputación.",
    conducta: "Comento con mis allegados la situación tributaria de personas conocidas", condicion: "cuando estoy seguro de que la información no afectará su reputación", condTipo: "falla", virtud: "no afectará su reputación",
    exp: { conducta: "Honrar la confidencialidad y no ser descuidado con la información a cargo: pautas de honestidad, aquí en sentido inverso.",
           condicion: "La seguridad de no dañar la reputación es la justificación que disfraza la falta.",
           extremo: "Inversa: A.", atractor: "",
           detectar: "Información a cargo que sale de la entidad: honestidad." } },

  /* ===================== INTEGRIDAD · RESPETO ===================== */
  { id: "ir1", tipo: "integ", pool: "sim", val: "v-res", clave: "A", real: ["v-res"], atractor: "v-dil",
    texto: "Uso un tono firme y cortante con los usuarios que insisten en un trámite improcedente, para que comprendan la decisión.",
    conducta: "Uso un tono firme y cortante con los usuarios", condicion: "para que comprendan la decisión", condTipo: "falla", virtud: "para que comprendan la decisión",
    exp: { conducta: "«Cortante» describe un trato hiriente: está en el «lo que no hago» de respeto.",
           condicion: "La finalidad pedagógica es la justificación que disfraza la falta.",
           extremo: "Inversa: A.",
           atractor: "La diligencia (eficiencia, cerrar el tema) y la comunicación (claridad) empujan a D.",
           detectar: "Tono, palabras, gestos con las personas: respeto." } },
  { id: "ir2", tipo: "integ", pool: "sim", val: "v-res", clave: "D", real: ["v-res"], atractor: null,
    texto: "Escucho con atención los argumentos de quienes sostienen en las reuniones del área posiciones contrarias a las mías.",
    conducta: "Escucho con atención los argumentos de quienes sostienen en las reuniones del área posiciones contrarias a las mías", condicion: null, condTipo: null,
    exp: { conducta: "«Estoy abierto al diálogo y a la comprensión, a pesar de perspectivas y opiniones distintas a las mías»: pauta de respeto.",
           condicion: "Sin condición.", extremo: "Directa: D.", atractor: "", detectar: "Diálogo con quien piensa distinto: respeto." } },
  { id: "ir3", tipo: "integ", pool: "sim", val: "v-res", clave: "A", real: ["v-res", "v-jus"], atractor: "v-dil",
    texto: "Ajusto el rigor de mi revisión según la impresión que me genera la presentación personal de quien radica la solicitud.",
    conducta: "Ajusto el rigor de mi revisión según la impresión que me genera la presentación personal", condicion: null, condTipo: null, virtud: "Ajusto el rigor de mi revisión",
    exp: { conducta: "Decidir con base en impresiones y apariencias es basar las decisiones en presunciones o prejuicios (respeto) y apartarse de la imparcialidad (justicia).",
           condicion: "«Ajusto el rigor» suena técnico: virtud aparente.",
           extremo: "Inversa: A.",
           atractor: "La diligencia (revisar con cuidado) empuja a D.",
           detectar: "Apariencia, procedencia, impresión personal: respeto y justicia." } },
  { id: "ir4", tipo: "integ", pool: "dia", val: "v-res", clave: "D", real: ["v-res"], atractor: null,
    texto: "Expongo mi desacuerdo con la propuesta de un compañero cuidando que mis palabras no descalifiquen su trabajo.",
    conducta: "Expongo mi desacuerdo con la propuesta de un compañero", condicion: "cuidando que mis palabras no descalifiquen su trabajo", condTipo: null,
    exp: { conducta: "«Expongo con argumentos mi posición diferente, de manera noble»: pauta de respeto.",
           condicion: "El cuidado de las palabras refuerza la conducta.", extremo: "Directa: D.", atractor: "", detectar: "Desacuerdo con consideración: respeto." } },
  { id: "ir5", tipo: "integ", pool: "dia", val: "v-res", clave: "A", real: ["v-res"], atractor: null,
    texto: "Recurro a la ironía en las reuniones para señalar los descuidos que se repiten en el equipo, porque así el mensaje se recuerda.",
    conducta: "Recurro a la ironía en las reuniones", condicion: "porque así el mensaje se recuerda", condTipo: "falla", virtud: "porque así el mensaje se recuerda",
    exp: { conducta: "El Código prohíbe referirse a los otros con ironía, burla o sarcasmo.",
           condicion: "La eficacia del mensaje es la justificación.", extremo: "Inversa: A.", atractor: "", detectar: "Ironía, burla, sarcasmo: respeto." } },

  /* ===================== INTEGRIDAD · COMPROMISO ===================== */
  { id: "ic1", tipo: "integ", pool: "sim", val: "v-comp", clave: "D", real: ["v-comp"], atractor: "v-dil",
    texto: "Redoblo la atención en las temporadas de vencimientos, aun cuando ello implique postergar las vacaciones que tenía programadas.",
    conducta: "Redoblo la atención en las temporadas de vencimientos", condicion: "aun cuando ello implique postergar las vacaciones que tenía programadas", condTipo: "costo",
    exp: { conducta: "«En situaciones extraordinarias o de excepción, redoblo con generosidad mis esfuerzos»: pauta de compromiso.",
           condicion: "Postergar las propias vacaciones es un costo personal, no una falla.",
           extremo: "Directa con costo: D.",
           atractor: "«Postergar» activa la diligencia («no postergo decisiones») y empuja a A. Pero lo que se posterga es un beneficio propio, no una decisión del servicio.",
           detectar: "Esfuerzo extra en situaciones extraordinarias: compromiso." } },
  { id: "ic2", tipo: "integ", pool: "sim", val: "v-comp", clave: "A", real: ["v-comp"], atractor: null,
    texto: "Considero que orientar a las personas que no son contribuyentes excede lo que corresponde a mi cargo.",
    conducta: "Considero que orientar a las personas que no son contribuyentes excede lo que corresponde a mi cargo", condicion: null, condTipo: null,
    exp: { conducta: "El Código pide escuchar, atender y orientar «a quien necesite cualquier información o guía en algún asunto público», y no ver el servicio como un favor.",
           condicion: "Sin condición: la idea misma es contraria.", extremo: "Inversa: A.", atractor: "",
           detectar: "Atender u orientar al ciudadano: compromiso." } },
  { id: "ic3", tipo: "integ", pool: "sim", val: "v-comp", clave: "D", real: ["v-comp"], atractor: "v-dil",
    texto: "Me tomo el tiempo necesario para entender el contexto del usuario antes de explicarle la decisión que lo afecta.",
    conducta: "Me tomo el tiempo necesario para entender el contexto del usuario", condicion: "antes de explicarle la decisión que lo afecta", condTipo: null,
    exp: { conducta: "«Ponerme en los zapatos de las personas, entender su contexto, sus necesidades»: pauta de compromiso.",
           condicion: "Sin falla.", extremo: "Directa: D.",
           atractor: "La diligencia (prontitud) empuja a A por el «tiempo necesario».",
           detectar: "Empatía con el usuario: compromiso." } },
  { id: "ic4", tipo: "integ", pool: "dia", val: "v-comp", clave: "A", real: ["v-comp"], atractor: null,
    texto: "Me permito una actitud distante en la atención durante los días de mayor desgaste.",
    conducta: "Me permito una actitud distante en la atención", condicion: "durante los días de mayor desgaste", condTipo: "falla",
    exp: { conducta: "«Nunca trabajo con una actitud negativa»: aquí se describe lo contrario.",
           condicion: "El desgaste es la justificación.", extremo: "Inversa: A.", atractor: "", detectar: "Actitud en el trabajo: compromiso." } },
  { id: "ic5", tipo: "integ", pool: "dia", val: "v-comp", clave: "D", real: ["v-comp"], atractor: null,
    texto: "Dedico tiempo fuera de las capacitaciones programadas a estudiar las normas que regulan mi situación como servidor.",
    conducta: "Dedico tiempo fuera de las capacitaciones programadas a estudiar las normas que regulan mi situación como servidor", condicion: null, condTipo: null,
    exp: { conducta: "«Estudio, entiendo e interiorizo todas las normas relacionadas con la disciplina, empleo público...»: pauta de compromiso.",
           condicion: "El tiempo adicional es costo.", extremo: "Directa: D.", atractor: "", detectar: "Autoaprendizaje sobre el propio régimen: compromiso." } },

  /* ===================== INTEGRIDAD · DILIGENCIA ===================== */
  { id: "id1", tipo: "integ", pool: "sim", val: "v-dil", clave: "D", real: ["v-dil"], atractor: "log",
    texto: "Resuelvo el mismo día las solicitudes que puedo atender de inmediato, aunque no estén incluidas en mi plan semanal.",
    conducta: "Resuelvo el mismo día las solicitudes que puedo atender de inmediato", condicion: "aunque no estén incluidas en mi plan semanal", condTipo: "costo",
    exp: { conducta: "«No postergo decisiones ni actividades que den solución a problemáticas ciudadanas»: pauta de diligencia, en sentido directo.",
           condicion: "Salirse del plan propio es costo.", extremo: "Directa con costo: D.",
           atractor: "La organización del propio trabajo (orientación al logro) puede hacer ver el desvío del plan como desorden.",
           detectar: "Prontitud en resolver: diligencia." } },
  { id: "id2", tipo: "integ", pool: "sim", val: "v-dil", clave: "A", real: ["v-dil"], atractor: "log",
    texto: "Aplazo las respuestas que requieren consulta normativa hasta reunir un bloque de casos similares que justifique el estudio.",
    conducta: "Aplazo las respuestas que requieren consulta normativa", condicion: "hasta reunir un bloque de casos similares que justifique el estudio", condTipo: "falla", virtud: "que justifique el estudio",
    exp: { conducta: "Postergar respuestas está en el «lo que no hago» de diligencia.",
           condicion: "Agrupar para estudiar «mejor» es la virtud aparente de la eficiencia.",
           extremo: "Inversa: A.",
           atractor: "El uso eficiente de recursos (orientación al logro, diligencia) empuja a D. Pero el costo lo pagan los ciudadanos que esperan.",
           detectar: "Respuestas que se aplazan: diligencia." } },
  { id: "id3", tipo: "integ", pool: "sim", val: "v-dil", clave: "D", real: ["v-dil"], atractor: null,
    texto: "Estudio las modificaciones normativas que afectan mis funciones tan pronto se expiden, aunque deba hacerlo fuera de los espacios de capacitación.",
    conducta: "Estudio las modificaciones normativas que afectan mis funciones tan pronto se expiden", condicion: "aunque deba hacerlo fuera de los espacios de capacitación", condTipo: "costo",
    exp: { conducta: "«Conozco y entiendo en detalle el ordenamiento jurídico que regula mi función»: pauta de diligencia.",
           condicion: "El tiempo fuera de la capacitación es costo.", extremo: "Directa con costo: D.", atractor: "",
           detectar: "Conocer la norma de la propia función: diligencia (y compromiso)." } },
  { id: "id4", tipo: "integ", pool: "dia", val: "v-dil", clave: "A", real: ["v-dil"], atractor: null,
    texto: "Dejo para la semana siguiente los asuntos sencillos que llegan el viernes en la tarde.",
    conducta: "Dejo para la semana siguiente los asuntos sencillos", condicion: "que llegan el viernes en la tarde", condTipo: "falla",
    exp: { conducta: "Postergar actividades que dan solución: contrario a la diligencia.", condicion: "El viernes en la tarde es la excusa.",
           extremo: "Inversa: A.", atractor: "", detectar: "Postergar: diligencia." } },
  { id: "id5", tipo: "integ", pool: "dia", val: "v-dil", clave: "D", real: ["v-dil"], atractor: null,
    texto: "Verifico cada documento antes de remitirlo, aun cuando el plazo de entrega todavía no esté próximo a vencer.",
    conducta: "Verifico cada documento antes de remitirlo", condicion: "aun cuando el plazo de entrega todavía no esté próximo a vencer", condTipo: null,
    exp: { conducta: "«Aseguro la calidad en cada uno de los productos que entrego»: pauta de diligencia.",
           condicion: "Sin falla.", extremo: "Directa: D.", atractor: "", detectar: "Calidad de lo que se entrega: diligencia." } },

  /* ===================== INTEGRIDAD · JUSTICIA ===================== */
  { id: "ij1", tipo: "integ", pool: "sim", val: "v-jus", clave: "D", real: ["v-jus"], atractor: "v-dil",
    texto: "Doy traslado a la contraparte de los documentos nuevos que aporta un interesado, aunque esa actuación prolongue el trámite.",
    conducta: "Doy traslado a la contraparte de los documentos nuevos que aporta un interesado", condicion: "aunque esa actuación prolongue el trámite", condTipo: "costo",
    exp: { conducta: "Garantizar los derechos de cada persona y decidir con diálogo con las partes involucradas: pautas de justicia.",
           condicion: "Prolongar el trámite es el costo de garantizar el derecho de la contraparte.",
           extremo: "Directa con costo: D.",
           atractor: "La diligencia (prontitud) empuja a leer la prolongación como falla y marcar A.",
           detectar: "Partes, contraparte, traslado, imparcialidad: justicia." } },
  { id: "ij2", tipo: "integ", pool: "sim", val: "v-jus", clave: "A", real: ["v-jus"], atractor: "v-comp",
    texto: "Resuelvo a favor del contribuyente las dudas probatorias únicamente en los casos de personas que atraviesan una situación económica difícil.",
    conducta: "Resuelvo a favor del contribuyente las dudas probatorias", condicion: "únicamente en los casos de personas que atraviesan una situación económica difícil", condTipo: "falla", virtud: "situación económica difícil",
    exp: { conducta: "Resolver las dudas a favor del contribuyente es una regla del Estatuto que vale para todos. Aplicarla «únicamente» a algunos es trato desigual.",
           condicion: "«Únicamente» convierte una regla general en un favor selectivo: falla de imparcialidad.",
           extremo: "Directa con falla: A.",
           atractor: "El compromiso (empatía con quien la pasa mal) empuja a D.",
           detectar: "A quién se le aplica una regla y a quién no: justicia." } },
  { id: "ij3", tipo: "integ", pool: "sim", val: "v-jus", clave: "D", real: ["v-jus"], atractor: "v-comp",
    texto: "Fundamento mis decisiones en la información verificada del expediente, aunque los interesados presionen por una respuesta inmediata.",
    conducta: "Fundamento mis decisiones en la información verificada del expediente", condicion: "aunque los interesados presionen por una respuesta inmediata", condTipo: "costo",
    exp: { conducta: "«Tomo decisiones informadas y objetivas basadas en evidencias»: pauta de justicia; también «nunca permito que presiones interfieran en mi criterio».",
           condicion: "La presión es el costo.", extremo: "Directa con costo: D.",
           atractor: "El compromiso y la orientación al usuario (respuesta inmediata) empujan a A.",
           detectar: "Decisiones con evidencia y sin presiones: justicia." } },
  { id: "ij4", tipo: "integ", pool: "dia", val: "v-jus", clave: "A", real: ["v-jus"], atractor: "log",
    texto: "Atiendo primero las solicitudes de las empresas con mayor recaudo, porque su impacto en las metas institucionales es superior.",
    conducta: "Atiendo primero las solicitudes de las empresas con mayor recaudo", condicion: "porque su impacto en las metas institucionales es superior", condTipo: "falla", virtud: "su impacto en las metas institucionales es superior",
    exp: { conducta: "Favorecer a un grupo de interés sin tener en cuenta a todos los actores está en el «lo que no hago» de justicia.",
           condicion: "Las metas son la justificación.", extremo: "Inversa: A.",
           atractor: "La orientación al logro (metas) empuja a D.", detectar: "Prioridades por tamaño o poder del interesado: justicia." } },
  { id: "ij5", tipo: "integ", pool: "dia", val: "v-jus", clave: "D", real: ["v-jus"], atractor: null,
    texto: "Aplico los mismos criterios de revisión a los expedientes de quienes han presentado quejas contra mi dependencia.",
    conducta: "Aplico los mismos criterios de revisión a los expedientes de quienes han presentado quejas contra mi dependencia", condicion: null, condTipo: null,
    exp: { conducta: "«Nunca permito que odios, simpatías, antipatías... interfieran en mi criterio»: pauta de justicia.",
           condicion: "Sin condición.", extremo: "Directa: D.", atractor: "", detectar: "Imparcialidad frente a quien molesta: justicia." } },

  /* ===================== CONTROL (integridad) ===================== */
  { id: "ix1", tipo: "integ", pool: "sim", val: null, clave: "H", real: [], atractor: "v-hon",
    texto: "Jamás he dudado acerca de cuál es la conducta correcta cuando enfrento un dilema ético en el trabajo.",
    conducta: "Jamás he dudado acerca de cuál es la conducta correcta", condicion: "cuando enfrento un dilema ético en el trabajo", condTipo: null, virtud: "Jamás he dudado",
    exp: { conducta: "No describe una pauta del Código: el Código mismo dice que «es válido no saberlo todo y también es válido pedir ayuda».",
           condicion: "«Jamás he dudado» frente a dilemas: perfección.",
           extremo: "Afirmación de control: respuesta honesta, A o B.",
           atractor: "La honestidad y la rectitud empujan a D.", detectar: "«Jamás» más un estado interno: control." } },
  { id: "ix2", tipo: "integ", pool: "sim", val: null, clave: "H", real: [], atractor: "v-dil",
    texto: "En mi trayectoria laboral no he cometido un solo error que haya afectado el trabajo de otras personas.",
    conducta: "no he cometido un solo error", condicion: "que haya afectado el trabajo de otras personas", condTipo: null, virtud: "En mi trayectoria laboral",
    exp: { conducta: "Nadie puede sostener con honestidad no haber cometido errores. El Código mismo dice que «es humano cometerlos».",
           condicion: "«Un solo error» en toda la trayectoria: perfección.",
           extremo: "Afirmación de control: respuesta honesta, A o B.",
           atractor: "La diligencia (calidad) empuja a D.", detectar: "Trayectoria completa más «un solo»: control." } }
];


/* ===== src/engine/gen.js ===== */
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
      return finish({ ctx: ctx, q: "¿Qué sanción de corrección debe liquidar?", ops: ops, exp: exp, linea: linea }, r);
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
      return finish({ ctx: ctx, q: "¿Qué sanción de corrección debe liquidar?", ops: ops,
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
        q = "¿Qué sanción de corrección debe liquidar?";
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
    b35base: { ok: "a3", d: ["m6", "m12"], txt: function (e, r) { return cap(e.n) + " presentó y pagó a tiempo su declaración de renta del año gravable 2025, con un impuesto neto " + r.int(36, 48) + " % mayor que el del año anterior, que fue de 60 UVT. No tiene beneficios por ubicación geográfica."; }, por: "El impuesto neto del año de comparación fue inferior a 71 UVT: no procede el beneficio (art. 689-3, par. 2). Regla general: tres años." },
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


/* ===== __cfg__ ===== */
APP.cfg = {"nombre":"Mérito","nombreProvisional":false,"version":"2026-10-22.2","vapid":"BMHjDsDzqZzJwUuLUqKU-vnQ_pdJJ0uMfnUX0-ISuTzsraFRPXn5IZRL_aV2cvsOK0wXnxZbNuaxdYg4EFOsLqk","url":"https://jdylaura.github.io/"};
APP.qr = "<svg role=\"img\" aria-label=\"Código QR de la dirección de la app\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 31 31\" shape-rendering=\"crispEdges\"><path fill=\"#FFFFFF\" d=\"M0 0h31v31H0z\"/><path stroke=\"#13182B\" d=\"M1 1.5h7m4 0h1m2 0h1m3 0h2m2 0h7M1 2.5h1m5 0h1m2 0h1m1 0h2m3 0h1m3 0h1m1 0h1m5 0h1M1 3.5h1m1 0h3m1 0h1m3 0h3m1 0h2m1 0h2m1 0h1m1 0h1m1 0h3m1 0h1M1 4.5h1m1 0h3m1 0h1m2 0h1m1 0h1m1 0h1m2 0h1m2 0h2m1 0h1m1 0h3m1 0h1M1 5.5h1m1 0h3m1 0h1m2 0h4m4 0h2m3 0h1m1 0h3m1 0h1M1 6.5h1m5 0h1m1 0h2m5 0h6m1 0h1m5 0h1M1 7.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M10 8.5h2m2 0h1m1 0h3M1 9.5h1m2 0h1m1 0h2m1 0h1m3 0h1m1 0h1m1 0h1m2 0h1m1 0h1m1 0h1M3 10.5h1m8 0h3m1 0h2m3 0h3m2 0h1m2 0h1M2 11.5h1m2 0h1m1 0h4m1 0h5m2 0h3m3 0h4M1 12.5h2m2 0h2m1 0h1m1 0h2m2 0h1m2 0h1m1 0h2m3 0h2m1 0h2M1 13.5h1m2 0h1m2 0h2m2 0h1m3 0h2m1 0h1m3 0h2m2 0h1m1 0h2M1 14.5h1m1 0h1m1 0h1m2 0h1m1 0h1m1 0h6m2 0h2M1 15.5h1m4 0h3m2 0h1m2 0h2m5 0h3m1 0h5M2 16.5h1m3 0h1m1 0h1m1 0h4m2 0h1m1 0h3m3 0h3m1 0h1M1 17.5h1m3 0h1m1 0h1m1 0h1m1 0h1m2 0h1m3 0h2m1 0h2m1 0h1m3 0h1M4 18.5h1m3 0h1m1 0h9m4 0h2m1 0h1m2 0h1M1 19.5h1m1 0h1m2 0h3m1 0h1m4 0h4m4 0h1m1 0h1m2 0h2M3 20.5h3m2 0h2m3 0h1m1 0h1m2 0h5m5 0h2M1 21.5h1m3 0h1m1 0h1m1 0h2m5 0h1m1 0h2m1 0h5m1 0h1M9 22.5h3m3 0h2m3 0h2m3 0h1m1 0h3M1 23.5h7m9 0h2m2 0h1m1 0h1m1 0h1m2 0h1M1 24.5h1m5 0h1m1 0h4m2 0h2m1 0h1m2 0h1m3 0h3m1 0h1M1 25.5h1m1 0h3m1 0h1m2 0h1m1 0h2m3 0h1m3 0h5M1 26.5h1m1 0h3m1 0h1m1 0h4m1 0h1m1 0h1m1 0h1m2 0h1m1 0h5m1 0h1M1 27.5h1m1 0h3m1 0h1m2 0h3m3 0h6m3 0h3m1 0h1M1 28.5h1m5 0h1m2 0h3m1 0h1m2 0h6m1 0h2m2 0h1M1 29.5h7m1 0h1m4 0h4m1 0h4m3 0h1m1 0h1\"/></svg>\n";


/* ===== src/ui/core.js ===== */
/* Núcleo de la app: almacenamiento, progreso, láminas con repaso espaciado, misión diaria,
   racha, logros, sonido y el espejo de datos para los avisos. Todo se guarda en el celular. */
var APP = window.APP || (window.APP = {});

(function () {
  "use strict";
  var D = APP.data;

  /* ---------------- Configuración ---------------- */
  APP.cfg = APP.cfg || {
    nombre: "Mérito",           // elegido por Laura y Juan David el 22-oct-2026
    nombreProvisional: false,
    version: D.version,
    vapid: ""                   // llave pública de avisos; se carga cuando se activen
  };

  /* ---------------- Utilidades ---------------- */
  var U = APP.u = {};
  U.esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  U.pad = function (n) { return (n < 10 ? "0" : "") + n; };
  U.ymd = function (d) { d = d || new Date(); return d.getFullYear() + "-" + U.pad(d.getMonth() + 1) + "-" + U.pad(d.getDate()); };
  U.today = function () { return U.ymd(new Date()); };
  U.parse = function (s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); };
  U.addDays = function (s, n) { var d = U.parse(s); d.setDate(d.getDate() + n); return U.ymd(d); };
  U.diffDays = function (a, b) { return Math.round((U.parse(b) - U.parse(a)) / 86400000); };
  var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  U.fecha = function (d) { return DIAS[d.getDay()] + " " + d.getDate() + " de " + MESES[d.getMonth()]; };
  U.mmss = function (s) { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ":" + U.pad(s % 60); };
  U.rnd = function () { return (Math.random() * 4294967295) >>> 0; };
  U.shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  U.pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };
  U.clamp = function (x, a, b) { return Math.max(a, Math.min(b, x)); };
  U.hora = function () { return new Date().getHours(); };

  /* ---------------- Almacenamiento ---------------- */
  var KEY = "entrenamiento.v1";
  var mem = null;
  function blank() { return { activo: null, perfiles: {}, nombreVotos: {}, instalado: false }; }
  APP.store = {
    load: function () {
      if (mem) return mem;
      try { var raw = localStorage.getItem(KEY); mem = raw ? JSON.parse(raw) : blank(); } catch (e) { mem = blank(); }
      if (!mem.perfiles) mem = blank();
      return mem;
    },
    save: function () {
      try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) { /* sin almacenamiento */ }
      APP.mirror();
    },
    raw: function () { return APP.store.load(); },
    replace: function (obj) { mem = obj; APP.store.save(); }
  };
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) {}

  function nuevoPerfil(who) {
    return {
      v: 1, who: who, proyecto: "dian2676", temas: { "m06-1": true, "m06-2": true, "m06-3": true, comp: true, integ: true },
      meta: 15, sonido: true, creado: new Date().toISOString(),
      xp: 0, racha: { n: 0, ult: null, comodines: 0, max: 0 }, dias: {},
      lam: {}, esc: {}, fam: {}, sub: {}, sim: { intentos: [], vistos: {}, fallados: {} }, af: {},
      logros: {}, mision: null, records: { contrarreloj: 0 }, duelos: [], modoRetro: "final", onboard: false
    };
  }
  APP.perfil = function () {
    var s = APP.store.load();
    if (!s.activo || !s.perfiles[s.activo]) return null;
    return s.perfiles[s.activo];
  };
  APP.setPerfil = function (who) {
    var s = APP.store.load();
    if (!s.perfiles[who]) s.perfiles[who] = nuevoPerfil(who);
    s.activo = who;
    APP.store.save();
    return s.perfiles[who];
  };
  APP.usuario = function () { var p = APP.perfil(); return p ? D.usuarios[p.who] : null; };
  APP.proyecto = function () { return D.proyectos[0]; };

  /* ---------------- Días y XP ---------------- */
  function dia(p) { var t = U.today(); if (!p.dias[t]) p.dias[t] = { xp: 0, items: 0, ok: 0, seg: 0, mision: false }; return p.dias[t]; }
  APP.nivel = function (xp) {
    var L = D.niveles, i = 0;
    while (i + 1 < L.length && xp >= L[i + 1].xp) i++;
    var cur = L[i], next = L[i + 1] || null;
    return { i: i, nombre: cur.nombre, base: cur.xp, next: next ? next.xp : null, nextNombre: next ? next.nombre : null,
      pct: next ? (xp - cur.xp) / (next.xp - cur.xp) : 1 };
  };
  APP.addXP = function (n) {
    var p = APP.perfil(); if (!p || !n) return { levelUp: false };
    var before = APP.nivel(p.xp).i;
    p.xp += n; dia(p).xp += n;
    var after = APP.nivel(p.xp).i;
    APP.store.save();
    return { levelUp: after > before, nivel: APP.nivel(p.xp) };
  };

  /* ---------------- Láminas con repaso espaciado ----------------
     Niveles: 0 bloqueada · 1 obtenida · 2 brillante · 3 dorada.
     Sube un nivel con un acierto en un día distinto y ya vencido; baja uno con un error. */
  var GAP = { 1: 1, 2: 2, 3: 5 };
  APP.lam = {
    get: function (id) { var p = APP.perfil(); return (p && p.lam[id]) || { lv: 0 }; },
    unlock: function (id) {
      var p = APP.perfil(); if (!p) return false;
      var L = p.lam[id];
      if (L && L.lv >= 1) return false;
      p.lam[id] = { lv: 1, due: U.addDays(U.today(), 1), ok: 0, ko: 0, last: U.today(), t: new Date().toISOString() };
      APP.store.save();
      return true;
    },
    hit: function (id, ok) {
      var p = APP.perfil(); if (!p) return null;
      var L = p.lam[id];
      if (!L || L.lv < 1) return null; // solo cuentan las ya obtenidas
      var t = U.today(), prev = L.lv;
      if (ok) {
        L.ok++;
        if (L.lv < 3 && t >= L.due && t !== L.last) { L.lv++; L.last = t; L.due = U.addDays(t, GAP[L.lv] || 7); }
        else if (L.lv === 3 && t >= L.due) { L.last = t; L.due = U.addDays(t, 7); }
      } else {
        L.ko++;
        if (L.lv > 1) L.lv--;
        L.due = t; L.last = t;
      }
      return { id: id, from: prev, to: L.lv };
    },
    vencidas: function () {
      var p = APP.perfil(); if (!p) return [];
      var t = U.today();
      return Object.keys(p.lam).filter(function (k) { var L = p.lam[k]; return L.lv >= 1 && L.due <= t; });
    },
    conteo: function (pagina) {
      var p = APP.perfil(); var ls = D.laminas.filter(function (l) { return !pagina || l.pag === pagina; });
      ls = ls.filter(APP.lamVisible);
      var c = { total: ls.length, obt: 0, bri: 0, dor: 0 };
      ls.forEach(function (l) { var lv = (p && p.lam[l.id] && p.lam[l.id].lv) || 0; if (lv >= 1) c.obt++; if (lv >= 2) c.bri++; if (lv >= 3) c.dor++; });
      return c;
    }
  };
  /* Las láminas de competencias solo se muestran si el indicador es del usuario. */
  APP.lamVisible = function (l) {
    if (!l.ind) return true;
    var u = APP.usuario(); return !u || u.indicadores.indexOf(l.ind) >= 0;
  };

  /* ---------------- Registro de respuestas ---------------- */
  APP.track = function (o) {
    // o: {sub, fam, ok, seg, lam:[], tipo}
    var p = APP.perfil(); if (!p) return [];
    var d = dia(p); d.items++; if (o.ok) d.ok++; d.seg += (o.seg || 0);
    if (o.sub) {
      var s = p.sub[o.sub] || (p.sub[o.sub] = { ok: 0, ko: 0, h: [] });
      if (o.ok) s.ok++; else s.ko++;
      s.h.push(o.ok ? 1 : 0); if (s.h.length > 16) s.h.shift();
    }
    if (o.fam) {
      var f = p.fam[o.fam] || (p.fam[o.fam] = { ok: 0, ko: 0, h: [], lvl: 1 });
      if (o.ok) f.ok++; else f.ko++;
      f.h.push(o.ok ? 1 : 0); if (f.h.length > 12) f.h.shift();
      var recent = f.h.slice(-6), acc = recent.reduce(function (a, b) { return a + b; }, 0) / recent.length;
      if (recent.length >= 4) f.lvl = acc >= 0.84 ? Math.min(3, f.lvl + (f.lvl < 3 && f.h.length % 3 === 0 ? 1 : 0)) : (acc < 0.5 ? Math.max(1, f.lvl - 1) : f.lvl);
    }
    var cambios = [];
    (o.lam || []).forEach(function (id) { var r = APP.lam.hit(id, o.ok); if (r && r.to !== r.from) cambios.push(r); });
    APP.store.save();
    return cambios;
  };
  APP.famLvl = function (fam) { var p = APP.perfil(); return (p && p.fam[fam] && p.fam[fam].lvl) || 1; };

  /* ---------------- Dominio por subtema ---------------- */
  APP.dominio = function (sub) {
    var p = APP.perfil(); if (!p) return null;
    var ls = D.laminas.filter(function (l) { return l.sub === sub && APP.lamVisible(l); });
    var lamScore = null;
    if (ls.length) {
      var tot = 0, any = false;
      ls.forEach(function (l) { var lv = (p.lam[l.id] && p.lam[l.id].lv) || 0; if (lv) any = true; tot += lv; });
      lamScore = any ? tot / (3 * ls.length) : null;
    }
    var s = p.sub[sub], accScore = null;
    if (s && s.h.length >= 2) accScore = s.h.reduce(function (a, b) { return a + b; }, 0) / s.h.length;
    if (lamScore == null && accScore == null) return null;
    if (lamScore == null) return accScore;
    if (accScore == null) return lamScore * 0.8;
    return 0.4 * lamScore + 0.6 * accScore;
  };

  /* ---------------- Racha ---------------- */
  APP.racha = {
    revisar: function () {
      var p = APP.perfil(); if (!p) return;
      var r = p.racha, t = U.today();
      if (!r.ult) return;
      var gap = U.diffDays(r.ult, t);
      if (gap <= 1) return;
      var faltan = gap - 1;
      if (faltan <= r.comodines) { r.comodines -= faltan; r.ult = U.addDays(t, -1); r.usado = t; }
      else { r.n = 0; r.perdida = t; }
      APP.store.save();
    },
    completar: function () {
      var p = APP.perfil(); var r = p.racha, t = U.today();
      if (r.ult === t) return false;
      r.n = (r.ult && U.diffDays(r.ult, t) === 1) ? r.n + 1 : 1;
      r.ult = t; r.max = Math.max(r.max, r.n);
      if (r.n % 5 === 0 && r.comodines < 2) r.comodines++;
      APP.store.save();
      return true;
    },
    hoy: function () { var p = APP.perfil(); return p && p.racha.ult === U.today(); }
  };

  /* ---------------- Misión del día ---------------- */
  APP.mision = {
    hoy: function () {
      var p = APP.perfil(); var t = U.today();
      if (p.mision && p.mision.fecha === t) return p.mision;
      p.mision = APP.mision.crear();
      APP.store.save();
      return p.mision;
    },
    crear: function () {
      var p = APP.perfil(), pasos = [], T = p.temas;
      var func = T["m06-1"] || T["m06-2"] || T["m06-3"];
      var escena = APP.escenaSiguiente();
      var hayLam = Object.keys(p.lam).some(function (k) { return k.charAt(0) === "f" && p.lam[k].lv >= 1; });
      if (func) {
        if (hayLam && p.meta >= 15) pasos.push({ k: "repaso", t: "Calentamiento", d: "Seis casos para repasar lo que ya tienes", min: 2 });
        if (escena) pasos.push({ k: "escena", id: escena.id, t: "Escena nueva", d: escena.titulo, min: 2 });
        pasos.push({ k: "gemelos", t: "Gemelos", d: "Ocho casos en parejas: cambia un dato y cambia la respuesta", min: 4 });
        pasos.push({ k: "caso", t: "Reto del operador", d: "Dos casos con rodeos, como en la prueba: la figura no se nombra", min: 3 });
      }
      if (T.comp || T.integ) pasos.push({ k: "likert", t: "Tus afirmaciones", d: "Tres afirmaciones con marcado de competencias", min: 2 });
      if (p.meta >= 20 && func) pasos.push({ k: "reloj", t: "Contrarreloj", d: "Sesenta segundos: todos los casos que alcances", min: 1 });
      return { fecha: U.today(), pasos: pasos, hecho: pasos.map(function () { return false; }), cofre: false, seed: U.rnd() };
    },
    marcar: function (i) {
      var p = APP.perfil(), m = APP.mision.hoy();
      if (m.hecho[i]) return { completa: false };
      m.hecho[i] = true;
      var completa = m.hecho.every(Boolean);
      if (completa) { dia(p).mision = true; APP.racha.completar(); }
      APP.store.save();
      return { completa: completa };
    },
    restantes: function () { var m = APP.mision.hoy(); return m.hecho.filter(function (x) { return !x; }).length; }
  };
  APP.escenaSiguiente = function () {
    var p = APP.perfil(), T = p.temas;
    for (var i = 0; i < D.escenas.length; i++) {
      var e = D.escenas[i];
      if (!T[e.tema]) continue;
      if (!p.esc[e.id] || !p.esc[e.id].done) return e;
    }
    return null;
  };

  /* ---------------- Pesos para elegir familias de casos ---------------- */
  var PROBW = { alta: 3, media: 2, baja: 1 };
  APP.pesosFamilias = function (foco) {
    var p = APP.perfil(), w = {}, venc = APP.lam.vencidas();
    APP.gen.FAM_IDS.forEach(function (id) {
      var F = APP.gen.FAM[id], sub = D.subtemas[F.sub];
      if (!p.temas[sub.tema]) { w[id] = 0; return; }
      var base = PROBW[sub.prob] || 1;
      var f = p.fam[id], err = 0.5;
      if (f && f.h.length) err = 1 - f.h.reduce(function (a, b) { return a + b; }, 0) / f.h.length;
      var due = F.lam.filter(function (l) { return venc.indexOf(l) >= 0; }).length;
      w[id] = base * (0.6 + err * 1.6) + (foco === "repaso" ? due * 2.5 : due * 0.6);
      if (foco && foco.sub && F.sub !== foco.sub) w[id] *= 0.08;
    });
    // si todo quedó en cero (temas funcionales apagados), se permiten todas
    if (!Object.keys(w).some(function (k) { return w[k] > 0; })) APP.gen.FAM_IDS.forEach(function (k) { w[k] = 1; });
    return w;
  };

  /* ---------------- Logros ---------------- */
  APP.logrosDef = [
    { id: "primer-dia", t: "Primer día", d: "Completaste tu primera misión." },
    { id: "racha-3", t: "Tres seguidos", d: "Tres días seguidos de misión." },
    { id: "racha-7", t: "Una semana", d: "Siete días seguidos de misión." },
    { id: "racha-14", t: "Dos semanas", d: "Catorce días seguidos de misión." },
    { id: "perfecta", t: "Ráfaga perfecta", d: "Todos los casos de una ráfaga, sin un error." },
    { id: "combo-8", t: "Combo de ocho", d: "Ocho aciertos seguidos." },
    { id: "reloj-12", t: "Contra el reloj", d: "Doce o más casos en sesenta segundos." },
    { id: "pagina", t: "Página completa", d: "Todas las láminas de una página del álbum." },
    { id: "dorada", t: "Primera dorada", d: "Una lámina dominada en tres días distintos." },
    { id: "mapa", t: "Los tres mapas", d: "Todas las escenas vistas." },
    { id: "sim-func", t: "Juicio fino", d: "80 % o más en un simulacro funcional completo." },
    { id: "sim-comp", t: "Extremos de acero", d: "90 % o más de los puntos en un simulacro comportamental." },
    { id: "sim-integ", t: "Íntegro", d: "90 % o más de los puntos en un simulacro de integridad." },
    { id: "brujula", t: "Brújula fina", d: "Diez respuestas marcadas «Seguro» con nueve o más aciertos." },
    { id: "madrugador", t: "Madrugador", d: "Misión completa antes de las 7 de la mañana." },
    { id: "noche", t: "Turno de noche", d: "Misión completa después de las 10 de la noche." },
    { id: "duelo", t: "Duelo en casa", d: "Terminaste un duelo de pareja." }
  ];
  APP.logro = function (id) {
    var p = APP.perfil(); if (!p || p.logros[id]) return null;
    p.logros[id] = new Date().toISOString(); APP.store.save();
    var def = APP.logrosDef.filter(function (x) { return x.id === id; })[0];
    return def || null;
  };

  /* ---------------- Sonido y vibración ---------------- */
  var ctx = null;
  function ac() {
    if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { ctx = null; } }
    if (ctx && ctx.state === "suspended") { try { ctx.resume(); } catch (e) {} }
    return ctx;
  }
  function tone(f, t0, dur, type, vol, slide) {
    var c = ac(); if (!c) return;
    var o = c.createOscillator(), g = c.createGain();
    o.type = type || "sine"; o.frequency.setValueAtTime(f, c.currentTime + t0);
    if (slide) o.frequency.exponentialRampToValueAtTime(slide, c.currentTime + t0 + dur);
    g.gain.setValueAtTime(0.0001, c.currentTime + t0);
    g.gain.exponentialRampToValueAtTime(vol || 0.12, c.currentTime + t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + t0 + dur);
    o.connect(g); g.connect(c.destination); o.start(c.currentTime + t0); o.stop(c.currentTime + t0 + dur + 0.02);
  }
  function noise(t0, dur, vol, hp) {
    var c = ac(); if (!c) return;
    var len = Math.floor(c.sampleRate * dur), b = c.createBuffer(1, len, c.sampleRate), d = b.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    var s = c.createBufferSource(); s.buffer = b;
    var f = c.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = hp || 2400; f.Q.value = 0.8;
    var g = c.createGain(); g.gain.value = vol || 0.08;
    s.connect(f); f.connect(g); g.connect(c.destination); s.start(c.currentTime + t0);
  }
  APP.sfx = function (k, n) {
    var p = APP.perfil(); if (p && !p.sonido) return;
    try {
      if (k === "ok") { tone(660, 0, 0.12, "triangle", 0.12); tone(990, 0.09, 0.18, "triangle", 0.12); }
      else if (k === "bad") { tone(220, 0, 0.22, "sawtooth", 0.05, 150); }
      else if (k === "combo") { var b = 523 * Math.pow(1.06, Math.min(n || 0, 12)); tone(b, 0, 0.09, "square", 0.05); tone(b * 1.25, 0.07, 0.09, "square", 0.05); tone(b * 1.5, 0.14, 0.16, "square", 0.05); }
      else if (k === "level") { [523, 659, 784, 1047].forEach(function (f, i) { tone(f, i * 0.11, 0.3, "triangle", 0.11); }); }
      else if (k === "chest") { [392, 523, 659, 784, 1047, 1319].forEach(function (f, i) { tone(f, i * 0.06, 0.22, "sine", 0.08); }); }
      else if (k === "swish") { noise(0, 0.22, 0.07, 3200); }
      else if (k === "tap") { tone(880, 0, 0.04, "sine", 0.05); }
      else if (k === "flip") { noise(0, 0.12, 0.05, 1600); tone(1200, 0.05, 0.08, "sine", 0.04); }
      else if (k === "tick") { tone(1400, 0, 0.03, "square", 0.025); }
      else if (k === "lamina") { tone(784, 0, 0.12, "triangle", 0.09); tone(1175, 0.1, 0.12, "triangle", 0.09); tone(1568, 0.2, 0.25, "triangle", 0.08); }
    } catch (e) {}
  };
  APP.vibrar = function (pat) { try { if (navigator.vibrate) navigator.vibrate(pat); } catch (e) {} };

  /* ---------------- Espejo para los avisos (IndexedDB, lo lee el service worker) ---------------- */
  APP.mirror = function () {
    try {
      var p = APP.perfil(); if (!p || !window.indexedDB) return;
      var u = D.usuarios[p.who];
      var m = p.mision && p.mision.fecha === U.today() ? p.mision : null;
      var venc = Object.keys(p.lam).filter(function (k) { return p.lam[k].lv >= 1 && p.lam[k].due <= U.today(); });
      var teaser = null;
      if (venc.length) { var l = D.laminas.filter(function (x) { return x.id === venc[0]; })[0]; if (l) teaser = l.q; }
      var resumen = { nombre: u ? u.nombre : "", app: APP.cfg.nombre, racha: p.racha.n, ult: p.racha.ult, comodines: p.racha.comodines,
        hoy: U.today(), misionHecha: !!(m && m.hecho.every(Boolean)), pasosRestantes: m ? m.hecho.filter(function (x) { return !x; }).length : null,
        vencidas: venc.length, teaser: teaser, xp: p.xp, prueba: APP.proyecto().prueba.fecha };
      var req = indexedDB.open("entrenamiento", 1);
      req.onupgradeneeded = function () { req.result.createObjectStore("kv"); };
      req.onsuccess = function () { try { var tx = req.result.transaction("kv", "readwrite"); tx.objectStore("kv").put(resumen, "resumen"); } catch (e) {} };
      if (navigator.setAppBadge && resumen.pasosRestantes) { navigator.setAppBadge(resumen.pasosRestantes).catch(function () {}); }
      else if (navigator.clearAppBadge && resumen.misionHecha) { navigator.clearAppBadge().catch(function () {}); }
    } catch (e) {}
  };

  /* ---------------- Días que faltan para la prueba ---------------- */
  APP.faltan = function () {
    var f = new Date(APP.proyecto().prueba.fecha), now = new Date();
    var a = new Date(now.getFullYear(), now.getMonth(), now.getDate()), b = new Date(f.getFullYear(), f.getMonth(), f.getDate());
    return Math.round((b - a) / 86400000);
  };
})();


/* ===== src/ui/kit.js ===== */
/* Piezas de interfaz reutilizables: íconos, navegación, hojas, avisos, confeti, mapas y línea de tiempo. */
var APP = window.APP || (window.APP = {});

(function () {
  "use strict";
  var D = APP.data, U = APP.u;

  /* ---------------- Íconos ---------------- */
  var P = {
    home: '<path d="M3 11.2 12 4l9 7.2V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/><path class="fill" d="M9 21v-6h6v6z" stroke="none" fill="none"/>',
    route: '<circle cx="6" cy="18" r="2.4"/><circle cx="18" cy="6" r="2.4"/><path d="M8.4 18H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.6"/>',
    exam: '<rect x="5" y="3.5" width="14" height="17.5" rx="2.5"/><path d="M9 3.5h6v2.5H9z"/><path d="m8.6 13 2.2 2.2 4.6-4.8"/>',
    album: '<rect x="3" y="6" width="12" height="15" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v13"/>',
    dots: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
    back: '<path d="M15 18 9 12l6-6"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    flame: '<path d="M12 2.5c.8 3 4.6 5.1 4.6 10a4.6 4.6 0 0 1-9.2 0c0-2.3 1.2-3.7 2.3-4.8.1 2.1 1 3.2 2.3 3.2 0-3.4-1.2-5.8 0-8.4z"/>',
    bolt: '<path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12z"/>',
    lock: '<rect x="5" y="10.5" width="14" height="10" rx="2.2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    x: '<path d="M7 7l10 10M17 7 7 17"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    bell: '<path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2.2 2.2 0 0 0 4 0"/>',
    phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
    shield: '<path d="M12 3 4.5 6v6c0 4.4 3.2 7.8 7.5 9 4.3-1.2 7.5-4.6 7.5-9V6z"/><path d="m9 12 2 2 4-4"/>',
    send: '<path d="M21 3 3 10.5l7 2.5 2.5 7z"/><path d="M10 13l11-10"/>',
    sound: '<path d="M4 9.5h3.5L12 5v14l-4.5-4.5H4z"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"/>',
    mute: '<path d="M4 9.5h3.5L12 5v14l-4.5-4.5H4z"/><path d="m16 9.5 5 5M21 9.5l-5 5"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c.6-3.3 3-5.2 6-5.2s5.4 1.9 6 5.2"/><circle cx="17" cy="9" r="2.6"/><path d="M16.5 14.5c2.3.3 4 1.9 4.5 4.5"/>',
    trophy: '<path d="M7 4h10v4a5 5 0 0 1-10 0z"/><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20.5h7M10 17h4"/>',
    pencil: '<path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17z"/><path d="m15 7 3 3"/>',
    gift: '<rect x="3.5" y="9" width="17" height="11.5" rx="1.8"/><path d="M2.5 9h19v-3h-19zM12 6v14.5"/><path d="M12 6c-1.5-3.5-5-3.5-5-1.2C7 6 9.5 6 12 6zM12 6c1.5-3.5 5-3.5 5-1.2C17 6 14.5 6 12 6z"/>',
    sparkles: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.6v.2"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4.5V11h-6.5"/>',
    share: '<path d="M12 15V3.5M7.5 8 12 3.5 16.5 8"/><path d="M5 12v7.5h14V12"/>',
    plusbox: '<rect x="4" y="4" width="16" height="16" rx="3.5"/><path d="M12 8.5v7M8.5 12h7"/>',
    menuv: '<circle cx="12" cy="5" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="19" r="1.6"/>',
    burger: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>',
    star: '<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 17l-5.2 2.7 1-5.9-4.3-4.1 5.9-.8z"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".9"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>'
  };
  APP.ic = function (k, extra) {
    var fillish = (k === "flame" || k === "bolt" || k === "star") ? ' fill="currentColor" stroke="none"' : ' fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
    return '<svg viewBox="0 0 24 24" aria-hidden="true"' + fillish + (extra || "") + ">" + (P[k] || "") + "</svg>";
  };

  /* ---------------- Navegación ---------------- */
  var stack = [], root = null, cur = null;
  APP.views = {};
  APP.go = function (name, params, opts) {
    opts = opts || {};
    if (opts.replace && stack.length) stack[stack.length - 1] = { name: name, params: params || {} };
    else if (opts.reset) stack = [{ name: name, params: params || {} }];
    else stack.push({ name: name, params: params || {} });
    try { if (!opts.replace && !opts.reset) history.pushState({ d: stack.length }, ""); } catch (e) {}
    render(!!opts.keep);
  };
  APP.back = function () {
    if (cur && cur.onBack && cur.onBack() === false) return;
    if (stack.length > 1) { stack.pop(); render(); } else { APP.go("home", {}, { reset: true }); }
  };
  APP.current = function () { return stack[stack.length - 1]; };
  APP.rerender = function () { render(true); };
  window.addEventListener("popstate", function () {
    if (document.querySelector(".veil")) { APP.closeSheet(); try { history.pushState({ d: stack.length }, ""); } catch (e) {} return; }
    if (cur && cur.onBack && cur.onBack() === false) { try { history.pushState({ d: stack.length }, ""); } catch (e) {} return; }
    if (stack.length > 1) { stack.pop(); render(); }
  });

  var TABS = [["home", "Hoy", "home"], ["memoria", "Memoria", "route"], ["sim", "Simulacro", "exam"], ["album", "Álbum", "album"]];
  function tabbar(active) {
    return '<div class="tabbar"><nav aria-label="Secciones">' + TABS.map(function (t) {
      return '<button class="tab' + (t[0] === active ? " on" : "") + '" data-tab="' + t[0] + '" aria-current="' + (t[0] === active ? "page" : "false") + '">' + APP.ic(t[2]) + "<span>" + t[1] + "</span></button>";
    }).join("") + "</nav></div>";
  }
  function render(keepScroll) {
    if (!root) root = document.getElementById("app");
    var top = stack[stack.length - 1];
    var fn = APP.views[top.name];
    if (!fn) { top = { name: "home", params: {} }; stack = [top]; fn = APP.views.home; }
    var y = window.scrollY;
    try {
      cur = fn(top.params) || {};
      var tab = cur.tab === false ? "" : tabbar(cur.tab || top.name);
      root.innerHTML = cur.html + tab;
      if (cur.mount) cur.mount(root);
    } catch (err) {
      APP.logError(err, top.name);
      cur = { tab: false, on: { reset: function () { APP.go("home", {}, { reset: true }); } } };
      root.innerHTML = '<div class="scr full"><div class="onb"><h2>Algo falló en esta pantalla.</h2><p class="muted">Tu avance está guardado. Vuelve al inicio y sigue; el error quedó anotado en el «Reporte para Claude» para corregirlo.</p><button class="btn cta block" data-act="reset">Volver al inicio</button></div></div>';
    }
    if (!keepScroll) window.scrollTo(0, 0); else window.scrollTo(0, y);
  }
  /* Errores: se guardan los últimos diez para el reporte. */
  APP.logError = function (err, donde) {
    try {
      var s = APP.store.raw(); s.errores = s.errores || [];
      s.errores.push({ t: new Date().toISOString(), donde: donde || "", msg: String(err && (err.stack || err.message) || err).slice(0, 400), v: APP.cfg && APP.cfg.version });
      if (s.errores.length > 10) s.errores.shift();
      APP.store.save();
    } catch (e) {}
    try { console.error(err); } catch (e) {}
  };
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-tab]");
    if (t) { APP.sfx("tap"); APP.go(t.getAttribute("data-tab"), {}, { reset: true }); return; }
    var a = e.target.closest("[data-act]");
    if (!a) return;
    var act = a.getAttribute("data-act");
    if (act === "back") { APP.back(); return; }
    try {
      if (act === "go") { APP.go(a.getAttribute("data-view"), JSON.parse(a.getAttribute("data-p") || "{}")); return; }
      // Lo que está dentro de una hoja abierta responde primero a la hoja.
      var inSheet = !!a.closest(".veil");
      if (inSheet && APP.sheetOn && APP.sheetOn[act]) { APP.sheetOn[act](a, e); return; }
      if (cur && cur.on && cur.on[act]) { cur.on[act](a, e); return; }
      if (APP.sheetOn && APP.sheetOn[act]) { APP.sheetOn[act](a, e); return; }
      if (APP.globalOn[act]) APP.globalOn[act](a, e);
    } catch (err) {
      APP.logError(err, "acción " + act);
      APP.toast("Algo falló. Tu avance está guardado.");
    }
  });
  APP.globalOn = {};

  /* ---------------- Barra superior ---------------- */
  APP.top = function (title, opts) {
    opts = opts || {};
    var left = opts.noBack ? "" : '<button class="icon-btn" data-act="back" aria-label="Volver">' + APP.ic(opts.close ? "close" : "back") + "</button>";
    return '<div class="top">' + left + "<h1>" + U.esc(title) + "</h1>" + (opts.right || "") + "</div>";
  };

  /* ---------------- Hojas (bottom sheets) ---------------- */
  APP.sheetOn = null;
  APP.sheet = function (html, on, opts) {
    APP.closeSheet();
    var v = document.createElement("div");
    v.className = "veil"; v.setAttribute("role", "dialog"); v.setAttribute("aria-modal", "true");
    v.innerHTML = '<div class="sheet"><div class="grab"></div>' + html + "</div>";
    v.addEventListener("click", function (e) { if (e.target === v && !(opts && opts.sticky)) APP.closeSheet(); });
    document.body.appendChild(v);
    APP.sheetOn = on || {};
    APP.sheetOn.close = APP.closeSheet;
    if (opts && opts.mount) opts.mount(v);
    return v;
  };
  APP.closeSheet = function () {
    var v = document.querySelector(".veil"); if (v) v.remove(); APP.sheetOn = null;
    if (APP.celebPend && APP.celebPend.length) setTimeout(APP.celebrarPendientes, 450);
  };

  /* ---------------- Toast ---------------- */
  var toastT = null;
  APP.toast = function (msg, icon) {
    var old = document.querySelector(".toast"); if (old) old.remove();
    var t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status");
    t.innerHTML = (icon ? APP.ic(icon, ' width="20" height="20"') : "") + "<span>" + U.esc(msg) + "</span>";
    document.body.appendChild(t);
    clearTimeout(toastT); toastT = setTimeout(function () { t.remove(); }, 2600);
  };

  /* ---------------- Confeti ---------------- */
  APP.confetti = function (n) {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var c = document.createElement("canvas"); c.className = "confetti"; document.body.appendChild(c);
    var dpr = Math.min(2, window.devicePixelRatio || 1), W = c.width = innerWidth * dpr, H = c.height = innerHeight * dpr;
    var g = c.getContext("2d"), cols = ["#FFE24A", "#86D3FF", "#FF93C8", "#FFB566", "#82E3AC"];
    var ps = []; n = n || 120;
    for (var i = 0; i < n; i++) ps.push({ x: W / 2 + (Math.random() - .5) * W * .3, y: H * .35, vx: (Math.random() - .5) * 14 * dpr, vy: (-Math.random() * 14 - 4) * dpr, r: (4 + Math.random() * 5) * dpr, c: cols[i % 5], a: Math.random() * 6, s: (Math.random() - .5) * .3 });
    var t0 = performance.now();
    (function f(t) {
      g.clearRect(0, 0, W, H);
      ps.forEach(function (p) { p.vy += .45 * dpr; p.x += p.vx; p.y += p.vy; p.a += p.s; g.save(); g.translate(p.x, p.y); g.rotate(p.a); g.fillStyle = p.c; g.fillRect(-p.r, -p.r * .45, p.r * 2, p.r * .9); g.restore(); });
      if (t - t0 < 2600) requestAnimationFrame(f); else c.remove();
    })(t0);
  };

  /* ---------------- Anillo de progreso ---------------- */
  APP.ring = function (pct, label, size) {
    size = size || 74; var r = 30, C = 2 * Math.PI * r, off = C * (1 - U.clamp(pct, 0, 1));
    return '<svg class="ring" viewBox="0 0 74 74" width="' + size + '" height="' + size + '" role="img" aria-label="' + U.esc(label || "") + '">' +
      '<circle cx="37" cy="37" r="' + r + '" fill="none" stroke="var(--sunken)" stroke-width="9"/>' +
      '<circle cx="37" cy="37" r="' + r + '" fill="none" stroke="var(--hl-y)" stroke-width="9" stroke-linecap="round" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '" transform="rotate(-90 37 37)" style="transition:stroke-dashoffset .6s ease"/>' +
      '<text x="37" y="42" text-anchor="middle" font-size="16" font-weight="800" fill="var(--ink)" font-family="var(--font-ui)">' + U.esc(label || "") + "</text></svg>";
  };

  /* ---------------- Línea de tiempo mini (microcasos) ---------------- */
  APP.miniLine = function (L) {
    if (!L) return "";
    var W = 340, H = 30 + 22 * ((L.win || []).length + (L.zones ? 1 : 0)) + 28, x0 = 14, x1 = W - 14;
    var a = L.span[0], b = L.span[1];
    function X(m) { return x0 + (x1 - x0) * (U.clamp(m, a, b) - a) / (b - a); }
    var colors = { y: "var(--hl-y)", b: "var(--hl-b)", p: "var(--hl-p)", o: "var(--hl-o)", g: "var(--hl-g)" };
    var s = '<svg class="mini-line" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Línea de tiempo del caso">';
    var y = 14;
    (L.win || []).forEach(function (w) {
      s += '<rect x="' + X(w.from).toFixed(1) + '" y="' + y + '" width="' + Math.max(4, X(w.to) - X(w.from)).toFixed(1) + '" height="14" rx="7" fill="' + colors[w.col] + '"' + (w.ghost ? ' opacity=".45"' : "") + "/>";
      s += '<text x="' + (X(w.from) + 6).toFixed(1) + '" y="' + (y + 11) + '" style="fill:#13182B;font-weight:700">' + U.esc(w.lab) + "</text>";
      y += 22;
    });
    if (L.zones) {
      L.zones.forEach(function (z, i) {
        s += '<rect x="' + X(z.from).toFixed(1) + '" y="' + y + '" width="' + Math.max(4, X(z.to) - X(z.from)).toFixed(1) + '" height="14" rx="4" fill="' + (i ? "var(--hl-p)" : "var(--hl-o)") + '" opacity=".75"/>';
        s += '<text x="' + (X(z.from) + 6).toFixed(1) + '" y="' + (y + 11) + '" style="fill:#13182B;font-weight:800">' + U.esc(z.lab) + "</text>";
      });
      y += 22;
    }
    var axis = y + 6;
    s += '<line x1="' + x0 + '" x2="' + x1 + '" y1="' + axis + '" y2="' + axis + '" stroke="var(--ink-3)" stroke-width="1.5"/>';
    (L.ev || []).forEach(function (e) {
      var xx = X(e.m);
      s += '<line x1="' + xx.toFixed(1) + '" x2="' + xx.toFixed(1) + '" y1="10" y2="' + (axis + 4) + '" stroke="' + (e.k === "C" ? "var(--ink)" : "var(--ink-3)") + '" stroke-width="' + (e.k === "C" ? 2.5 : 1.2) + '" stroke-dasharray="' + (e.k === "C" ? "0" : "3 3") + '"/>';
      s += '<circle cx="' + xx.toFixed(1) + '" cy="' + axis + '" r="' + (e.k === "C" ? 5 : 3.5) + '" fill="' + (e.k === "C" ? "var(--ink)" : "var(--surface)") + '" stroke="var(--ink)" stroke-width="1.5"/>';
      var anchor = xx < 60 ? "start" : (xx > W - 60 ? "end" : "middle");
      s += '<text x="' + xx.toFixed(1) + '" y="' + (axis + 18) + '" text-anchor="' + anchor + '" style="font-weight:' + (e.k === "C" ? 800 : 600) + '">' + U.esc(e.lab) + "</text>";
    });
    return s + "</svg>";
  };

  /* ---------------- Mapas (los tres) ---------------- */
  function unlockedAny(ids) { return (ids || []).some(function (id) { return APP.lam.get(id).lv >= 1; }); }
  APP.mapHTML = function (mapaId, foco, opts) {
    opts = opts || {}; foco = foco || [];
    var M = D.mapas[mapaId], h = "";
    h += '<div class="map-q">' + M.preguntas.map(function (q) { return '<div class="qq">' + U.esc(q) + "</div>"; }).join("") + "</div>";
    if (mapaId === "m06-1") {
      h += '<div class="stack">' + M.ramas.map(function (r) {
        var open = opts.all || unlockedAny(r.lam) || foco.indexOf(r.k) >= 0;
        var cls = "branch" + (foco.indexOf(r.k) >= 0 ? " focus" : "") + (open ? "" : " locked");
        if (!open) return '<div class="' + cls + '"><div class="row">' + APP.ic("lock", ' width="18" height="18"') + '<span class="small muted">Se desbloquea en una escena</span></div></div>';
        return '<button class="' + cls + '" data-act="lamina" data-id="' + r.lam[0] + '"><div class="flow"><span class="mk b">' + U.esc(r.defecto) + '</span><span class="arrow">→</span><span class="mk ' + r.efectoCol + '"><b>' + U.esc(r.efecto) + '</b></span></div>' +
          '<div class="small">' + U.esc(r.salida) + '</div><div class="tiny">' + U.esc(r.norma) + "</div></button>";
      }).join("") + "</div>";
    } else if (mapaId === "m06-2") {
      h += '<div class="stack">' + M.puertas.map(function (d) {
        var open = opts.all || unlockedAny(d.lam) || foco.indexOf(d.k) >= 0;
        var cls = "door" + (foco.indexOf(d.k) >= 0 ? " focus" : "") + (open ? "" : " locked");
        if (!open) return '<div class="' + cls + '"><div class="row">' + APP.ic("lock", ' width="18" height="18"') + "<b>" + U.esc(d.nombre) + '</b></div><span class="small muted">Se desbloquea en una escena</span></div>';
        return '<button class="' + cls + '" data-act="lamina" data-id="' + d.lam[0] + '"><div class="row spread"><b><span class="mk ' + d.col + '">' + U.esc(d.nombre) + '</span></b><span class="tiny">' + U.esc(d.norma) + "</span></div><ul>" +
          d.reglas.map(function (x) { return "<li>" + U.esc(x) + "</li>"; }).join("") + '</ul><div class="exc">' + U.esc(d.excepcion) + "</div></button>";
      }).join("");
      var peajeOpen = opts.all || unlockedAny(["f19", "f20", "f21"]) || foco.indexOf("peaje") >= 0;
      h += '<div class="card' + (foco.indexOf("peaje") >= 0 ? " focus" : "") + '" style="' + (foco.indexOf("peaje") >= 0 ? "box-shadow:0 0 0 3px var(--hl-y)" : "") + '"><h3>Cuánto cuesta subir</h3>' +
        (peajeOpen ? '<div class="toll" style="margin-top:8px">' + M.peaje.map(function (t) { return "<span>" + U.esc(t.cuando) + '</span><b><span class="mk p">' + U.esc(t.pct) + "</span></b>"; }).join("") + '</div><p class="small muted" style="margin-top:8px">' + U.esc(M.peajeNota) + "</p>"
          : '<p class="small muted">' + APP.ic("lock", ' width="16" height="16"') + " Se desbloquea en la escena del peaje.</p>") + "</div></div>";
    } else {
      function col(title, arr, key) {
        return '<div class="fcol"><div class="hd">' + title + "</div>" + arr.map(function (c) {
          var open = opts.all || unlockedAny(c.lam) || foco.indexOf(c.k) >= 0;
          if (!open) return '<div class="fcell locked">' + APP.ic("lock", ' width="14" height="14"') + "</div>";
          return '<button class="fcell' + (foco.indexOf(c.k) >= 0 ? " focus" : "") + '" data-act="lamina" data-id="' + c.lam[0] + '"><b>' + U.esc(c.t) + "</b>" + U.esc(c.d) + "</button>";
        }).join("") + "</div>";
      }
      h += '<div class="formula">' + col("Desde", M.desde) + '<div class="op">+</div>' + col("Dura", M.cuanto) + '<div class="op">+</div>' + col("Pausas", M.pausas) + "</div>";
      h += '<p class="small muted">' + U.esc(M.nota) + "</p>";
    }
    return h;
  };

  /* ---------------- Lámina: detalle ---------------- */
  APP.lamColor = function (l) { var pg = D.paginas.filter(function (p) { return p.id === l.pag; })[0]; return pg ? pg.color : "y"; };
  APP.lamNum = function (l) { var vis = D.laminas.filter(APP.lamVisible); return vis.indexOf(l) + 1; };
  APP.showLamina = function (id) {
    var l = D.laminas.filter(function (x) { return x.id === id; })[0]; if (!l) return;
    var st = APP.lam.get(id), lv = st.lv || 0;
    var names = ["Por obtener", "Obtenida", "Brillante", "Dorada"];
    var how = lv === 0 ? (l.pag <= "p5" && l.id.charAt(0) === "f" ? "Se obtiene en una escena de la sección Memoria." : "Se obtiene al responder afirmaciones de esa competencia o de ese valor.")
      : lv < 3 ? "Para que suba de nivel, acierta un caso que la use en " + (st.due && st.due > U.today() ? "otro día (desde el " + st.due.split("-").reverse().slice(0, 2).join("/") + ")" : "tu próxima práctica") + "." : "Dominada. Vuelve de vez en cuando para que no se oxide.";
    var body = lv === 0 ? '<p class="muted">' + U.esc(how) + "</p>" :
      '<p class="q">' + U.esc(l.q) + '</p><div class="read"><p>' + U.esc(l.a) + "</p></div>" +
      (l.por ? '<div class="card sunk"><b>Por qué tiene sentido</b><p class="small" style="margin-top:4px">' + U.esc(l.por) + "</p></div>" : "") +
      (l.trampa ? '<div class="card sunk"><b><span class="mk o">La trampa</span></b><p class="small" style="margin-top:4px">' + U.esc(l.trampa) + "</p></div>" : "") +
      '<p class="tiny">Fuente: ' + U.esc(l.src) + "</p>" +
      (l.tri === "reconoce" ? '<p class="tiny">Basta con reconocerla: no hace falta saberla de memoria.</p>' : "");
    APP.sheet('<div class="row spread"><span class="chip ' + APP.lamColor(l) + '">Lámina ' + APP.lamNum(l) + " · " + names[lv] + '</span><button class="icon-btn ghost" data-act="close" aria-label="Cerrar">' + APP.ic("close") + "</button></div>" +
      "<h2>" + U.esc(lv ? l.t : "Lámina por obtener") + "</h2>" + body + (lv ? '<p class="tiny">' + U.esc(how) + "</p>" : ""), {});
    APP.sfx("flip");
  };
  APP.globalOn.lamina = function (el) { APP.showLamina(el.getAttribute("data-id")); };

  /* ---------------- Revelar láminas nuevas ---------------- */
  APP.revealLaminas = function (ids, done) {
    var nuevas = ids.filter(function (id) { return APP.lam.unlock(id); });
    if (!nuevas.length) { if (done) done(0); return; }
    if (nuevas.length > 3) {
      // Muchas de una vez: se revelan juntas, una tras otra, en una sola hoja.
      APP.sfx("chest"); APP.vibrar([18, 40, 18, 40, 18]);
      APP.sheet('<p class="tiny" style="text-align:center">' + nuevas.length + ' láminas nuevas para tu álbum</p><div class="reveal-grid">' + nuevas.map(function (id, k) {
        var l = D.laminas.filter(function (x) { return x.id === id; })[0];
        return '<div class="lam l1" style="--c:var(--hl-' + APP.lamColor(l) + ');animation:flipin .7s ' + (k * 0.12).toFixed(2) + 's cubic-bezier(.2,.8,.2,1) both"><span class="n">' + APP.lamNum(l) + '</span><span class="tt">' + U.esc(l.t) + '</span><span class="lv"><i></i><i></i><i></i></span></div>';
      }).join("") + '</div><p class="small muted" style="text-align:center">Las ves completas en tu álbum. Suben a brillante y a dorada cuando las aciertas en días distintos.</p><button class="btn cta block" data-act="okLams">¡A mi álbum!</button>',
        { okLams: function () { APP.closeSheet(); APP.addXP(15 * nuevas.length); if (done) done(nuevas.length); } }, { sticky: true });
      return;
    }
    var i = 0;
    function show() {
      var l = D.laminas.filter(function (x) { return x.id === nuevas[i]; })[0];
      APP.sfx("lamina"); APP.vibrar([18, 40, 18]);
      APP.sheet('<p class="tiny" style="text-align:center">Lámina nueva ' + (i + 1) + " de " + nuevas.length + '</p><div class="reveal"><div class="lam-big" style="--c:var(--hl-' + APP.lamColor(l) + ')"><span class="tiny">Lámina ' + APP.lamNum(l) + '</span><div class="tt">' + U.esc(l.t) + '</div><span class="chip ' + APP.lamColor(l) + '">Obtenida</span></div></div>' +
        '<p class="small muted" style="text-align:center">' + U.esc(l.q) + '</p><button class="btn cta block" data-act="nextLam">' + (i + 1 < nuevas.length ? "Siguiente lámina" : "Seguir") + "</button>",
        { nextLam: function () { i++; if (i < nuevas.length) show(); else { APP.closeSheet(); APP.addXP(15 * nuevas.length); if (done) done(nuevas.length); } } }, { sticky: true });
    }
    show();
  };

  /* ---------------- Celebraciones ---------------- */
  /* Las celebraciones no interrumpen una ronda: si llegan en mitad de una, esperan al Inicio. */
  var ACTIVAS = ["rafaga", "simplay", "likert", "escena", "paseo", "paseoL", "onb"];
  APP.celebPend = [];
  APP.celebrarPendientes = function () {
    if (!APP.celebPend.length || document.querySelector(".veil")) return;
    var n = APP.celebPend.shift(); APP.celebrarNivel(n);
  };
  APP.celebrarNivel = function (niv) {
    var c = APP.current && APP.current();
    if ((c && ACTIVAS.indexOf(c.name) >= 0) || document.querySelector(".veil")) { APP.celebPend.push(niv); return; }
    APP.sfx("level"); APP.confetti(160); APP.vibrar([30, 60, 30, 60, 60]);
    APP.sheet('<div class="stack" style="text-align:center;padding:10px 0"><p class="tiny">Subiste de nivel</p><h2 style="font-size:30px">' + U.esc(niv.nombre) + '</h2><p class="muted">Sigue así: el siguiente es ' + U.esc(niv.nextNombre || "la cima") + '.</p><button class="btn cta block" data-act="close">Seguir</button></div>', {});
  };
  APP.celebrarLogro = function (def) {
    if (!def) return;
    APP.sfx("chest");
    APP.toast("Logro: " + def.t, "trophy");
  };
  APP.consejos = [
    "Si un caso te toma más de tres minutos, anota su número en la hoja de operaciones y vuelve a él al final.",
    "En comportamentales e integridad, marca un extremo: B y C nunca dan el máximo puntaje.",
    "Cuando dos opciones parecen correctas, busca a cuál le falta un requisito.",
    "El operador casi nunca nombra la figura: la describe. Tradúcela antes de mirar las opciones.",
    "Desconfía de la opción que repite palabras de una norma vecina: «en cualquier tiempo», «no está en firme».",
    "Las puertas abren a las 7:15 a. m. y cierran a las 8:30. Llega temprano.",
    "Lleva lápiz de mina negra número 2 y borrador de nata. Llena el círculo completo.",
    "Documento válido: cédula amarilla con holograma o cédula digital.",
    "Calcula: 90 afirmaciones en menos de 30 minutos. El resto del tiempo es para los 66 casos.",
    "Ubica el caso en la línea de tiempo: qué acto ya llegó y cuál no. Eso decide el porcentaje.",
    "Antes de aplicar una regla general, pregúntate si hay una excepción en el mismo estatuto.",
    "Lee primero el enunciado: te dice qué buscar en el caso."
  ];
})();


/* ===== src/ui/views.js ===== */
/* Pantallas de la app. */
var APP = window.APP || (window.APP = {});

(function () {
  "use strict";
  var D = APP.data, U = APP.u, V = APP.views;
  var esc = U.esc;
  function lamById(id) { return D.laminas.filter(function (l) { return l.id === id; })[0]; }
  function colorUser(who) { return who === "laura" ? "var(--hl-p)" : "var(--hl-b)"; }
  function pctTxt(x) { return Math.round(x * 100) + " %"; }

  /* =========================================================================
     BIENVENIDA Y CONFIGURACIÓN INICIAL
     ========================================================================= */
  V.onb = function (pr) {
    var step = pr.step || 0, draft = pr.draft || { temas: { "m06-1": true, "m06-2": true, "m06-3": true, comp: true, integ: true }, meta: 15 };
    var html = '<div class="scr full"><div class="onb">';
    if (step === 0) {
      var pl = APP.plataforma(), movil = pl.ios || pl.android;
      html += '<div class="stack"><div class="brand"><span class="brand-mark">' + esc(APP.cfg.nombre) + '</span></div>' +
        '<h2 style="font-size:30px;line-height:1.1">Diez a quince minutos al día para llegar al 8 de noviembre con los datos en su lugar.</h2>' +
        '<p class="lede">Escenas de un minuto, casos gemelos, un álbum que se llena con lo que dominas y simulacros con el formato de la DIAN 2676.</p>' +
        '<p class="small muted">Todo se guarda en este celular. No necesita cuenta ni contraseña.</p></div>';
      if (pl.standalone || pr.aqui) {
        html += '<button class="btn cta block" data-act="n0">Empezar</button>';
      } else if (movil) {
        html += '<div class="card stack"><b>Primero, instálala en tu pantalla de inicio</b><p class="small">Así tendrás su ícono como cualquier app, funcionará sin internet y podrá enviarte los avisos diarios. Toma un minuto.</p>' +
          (pl.ios ? '<p class="small"><b>Importante en el iPhone:</b> lo que hagas aquí, en Safari, no pasa a la app instalada. Instálala antes de empezar.</p>' : "") +
          '<button class="btn cta block" data-act="go" data-view="instalar">Cómo instalarla</button>' +
          (APP.cfg.nombreProvisional ? '<button class="btn soft block" data-act="go" data-view="nombre">Antes: elegir el nombre de la app</button>' : "") + "</div>" +
          '<button class="link" data-act="aqui">Probarla aquí sin instalar</button>';
      } else {
        var url = location.origin + location.pathname.replace(/index\.html$/, "");
        html += '<div class="card stack" style="text-align:center"><b>Esta app es para el celular</b><p class="small">Abre esta dirección en el navegador del iPhone o del Samsung:</p><b style="font-size:22px">' + esc(url.replace(/^https?:\/\//, "").replace(/\/$/, "")) + "</b>" +
          (APP.qr ? '<div style="max-width:200px;margin:4px auto">' + APP.qr + '</div><p class="tiny">O apunta la cámara del celular a este código.</p>' : "") + "</div>" +
          '<button class="link" data-act="aqui">Verla aquí de todos modos</button>';
      }
    } else if (step === 1) {
      html += '<h2>¿Quién entrena en este celular?</h2><p class="muted">Cada uno tiene sus competencias y su propio avance.</p><div class="who">' +
        ["laura", "juandavid"].map(function (w) { var u = D.usuarios[w]; return '<button data-act="who" data-w="' + w + '"><span class="av" style="background:' + colorUser(w) + '">' + u.nombre.charAt(0) + "</span><b>" + esc(u.nombre) + "</b><small>" + esc(u.empleo.split(" · ")[0]) + "</small></button>"; }).join("") + "</div>";
    } else if (step === 2) {
      var P = APP.proyecto();
      html += '<h2>¿Qué proyecto vas a entrenar?</h2><p class="muted">Sale de su proyecto de estudio en Claude. Cuando haya material de otro proyecto, aparecerá aquí.</p>' +
        '<button class="check on" data-act="n2"><span class="bx">' + APP.ic("check", ' width="18" height="18"') + '</span><span><b>' + esc(P.nombre) + '</b><br><span class="small muted">' + esc(P.convocatoria) + " · prueba el " + U.fecha(new Date(P.prueba.fecha)) + "</span></span></button>" +
        '<button class="btn cta block" data-act="n2">Continuar</button>';
    } else if (step === 3) {
      html += '<h2>¿Qué temas quieres entrenar?</h2><p class="muted">Puedes cambiarlo cuando quieras desde el menú.</p><div class="stack">' +
        '<button class="check' + (Object.keys(draft.temas).every(function (k) { return draft.temas[k]; }) ? " on" : "") + '" data-act="tAll"><span class="bx">' + APP.ic("check", ' width="18" height="18"') + "</span><span><b>Todos los temas</b></span></button>" +
        APP.proyecto().temas.map(function (t) {
          return '<button class="check' + (draft.temas[t.id] ? " on" : "") + '" data-act="tOne" data-t="' + t.id + '"><span class="bx">' + APP.ic("check", ' width="18" height="18"') + "</span><span><b>" + esc(t.nombre) + '</b><br><span class="small muted">' +
            (t.tipo === "funcional" ? "Funcional · M06" : t.tipo === "comportamental" ? "Tus competencias de la ficha del empleo" : "Los cinco valores del Código de Integridad") + "</span></span></button>";
        }).join("") + '</div><button class="btn cta block" data-act="n3">Continuar</button>';
    } else if (step === 4) {
      html += '<h2>¿Cuánto tiempo al día?</h2><p class="muted">La misión diaria se arma con ese tiempo. Una misión cumplida mantiene viva tu racha.</p><div class="stack">' +
        [[10, "Ligera", "Para los días pesados"], [15, "Normal", "La recomendada"], [20, "Intensa", "Con contrarreloj al final"]].map(function (m) {
          return '<button class="check' + (draft.meta === m[0] ? " on" : "") + '" data-act="meta" data-m="' + m[0] + '"><span class="bx">' + APP.ic("check", ' width="18" height="18"') + "</span><span><b>" + m[0] + " minutos · " + m[1] + '</b><br><span class="small muted">' + m[2] + "</span></span></button>";
        }).join("") + '</div><button class="btn cta block" data-act="n4">Listo</button>';
    }
    html += "</div></div>";
    return { tab: false, html: html, on: {
      n0: function () { APP.go("onb", { step: 1, draft: draft }, { replace: true }); },
      aqui: function () { APP.go("onb", { step: 0, draft: draft, aqui: true }, { replace: true }); },
      who: function (el) { draft.who = el.getAttribute("data-w"); APP.sfx("tap"); APP.go("onb", { step: 2, draft: draft }, { replace: true }); },
      n2: function () { APP.go("onb", { step: 3, draft: draft }, { replace: true }); },
      tAll: function () { var all = Object.keys(draft.temas).every(function (k) { return draft.temas[k]; }); Object.keys(draft.temas).forEach(function (k) { draft.temas[k] = !all; }); APP.go("onb", { step: 3, draft: draft }, { replace: true }); },
      tOne: function (el) { var k = el.getAttribute("data-t"); draft.temas[k] = !draft.temas[k]; APP.go("onb", { step: 3, draft: draft }, { replace: true }); },
      n3: function () { if (!Object.keys(draft.temas).some(function (k) { return draft.temas[k]; })) { APP.toast("Elige al menos un tema"); return; } APP.go("onb", { step: 4, draft: draft }, { replace: true }); },
      meta: function (el) { draft.meta = +el.getAttribute("data-m"); APP.go("onb", { step: 4, draft: draft }, { replace: true }); },
      n4: function () {
        var p = APP.setPerfil(draft.who); p.temas = draft.temas; p.meta = draft.meta; p.onboard = true; p.mision = null; APP.store.save();
        APP.sfx("level"); APP.go("home", {}, { reset: true });
      }
    } };
  };

  /* =========================================================================
     INICIO
     ========================================================================= */
  V.home = function () {
    var p = APP.perfil(); if (!p || !p.onboard) { setTimeout(function () { APP.go("onb", { step: 0 }, { reset: true }); }); return { html: "" }; }
    APP.racha.revisar();
    var u = APP.usuario(), m = APP.mision.hoy(), niv = APP.nivel(p.xp), faltan = APP.faltan();
    var hechos = m.hecho.filter(Boolean).length, total = m.pasos.length, next = m.hecho.indexOf(false);
    var saludo = U.hora() < 12 ? "Buenos días" : U.hora() < 19 ? "Buenas tardes" : "Buenas noches";
    var h = '<div class="scr">';
    h += '<div class="top"><div class="brand"><span class="brand-mark">' + esc(APP.cfg.nombre) + '</span></div>' +
      '<span class="stat-pill" title="Racha"><span class="flame" style="color:#FF8A1F;display:inline-flex">' + APP.ic("flame") + '</span><span class="num">' + p.racha.n + "</span></span>" +
      '<button class="icon-btn" data-act="menu" aria-label="Más opciones">' + APP.ic("burger") + "</button></div>";
    h += '<div><p class="muted small">' + saludo + ", " + esc(u.nombre) + '</p><h2 style="font-size:24px">' + (hechos === total ? "Misión de hoy cumplida." : (hechos ? (total - hechos === 1 ? "Vas bien: te falta un paso." : "Vas bien: te faltan " + (total - hechos) + " pasos.") : "Tu misión de hoy te espera.")) + "</h2></div>";

    // Misión
    h += '<div class="card mission stack"><div class="row">' + APP.ring(total ? hechos / total : 0, hechos + "/" + total) +
      '<div class="grow"><h3>Misión del día</h3><p class="small muted">' + m.pasos.reduce(function (a, s) { return a + s.min; }, 0) + " minutos · racha " + (APP.racha.hoy() ? "asegurada hoy" : "en juego") + (p.racha.comodines ? " · " + p.racha.comodines + " comodín" + (p.racha.comodines > 1 ? "es" : "") : "") + "</p></div></div>";
    h += '<ol class="steps">' + m.pasos.map(function (s, i) {
      var cls = "step" + (m.hecho[i] ? " done" : "") + (i === next ? " next" : "");
      return '<li><button class="' + cls + '" data-act="paso" data-i="' + i + '"><span class="dot">' + (m.hecho[i] ? APP.ic("check", ' width="18" height="18"') : (i + 1)) + '</span><span><span class="t">' + esc(s.t) + '</span><br><span class="d">' + esc(s.d) + '</span></span><span class="tiny">' + s.min + " min</span></button></li>";
    }).join("") + "</ol>";
    if (next >= 0) h += '<button class="btn cta block" data-act="paso" data-i="' + next + '">' + (hechos ? "Continuar" : "Empezar la misión") + "</button>";
    else if (!m.cofre) h += '<button class="btn cta block" data-act="cofre">' + APP.ic("gift", ' width="22" height="22"') + " Abrir el cofre del día</button>";
    else h += '<p class="small muted">Vuelve mañana para tu nueva misión. Mientras tanto, la práctica libre suma XP.</p>';
    h += "</div>";

    // Cuenta regresiva y nivel
    h += '<div class="grid2"><div class="card countdown"><div class="big">' + Math.max(0, faltan) + '<small>' + (faltan === 1 ? "día" : "días") + '</small></div><p class="small">para la prueba escrita, ' + U.fecha(new Date(APP.proyecto().prueba.fecha)) + "</p></div>" +
      '<div class="card stack" style="gap:8px"><p class="tiny">Nivel ' + (niv.i + 1) + '</p><b style="font-size:18px;line-height:1.15">' + esc(niv.nombre) + '</b><div class="bar y"><i style="width:' + Math.round(niv.pct * 100) + '%"></i></div><p class="tiny num">' + p.xp + " XP" + (niv.next ? " · " + (niv.next - p.xp) + " para " + esc(niv.nextNombre) : "") + "</p></div></div>";

    // Accesos
    h += '<div class="tiles">' +
      tile("rafagaLibre", "bolt", "var(--hl-y)", "Ráfaga libre", "Diez casos gemelos, cuando quieras") +
      tile("relojLibre", "clock", "var(--hl-o)", "Contrarreloj", "Sesenta segundos. Récord: " + p.records.contrarreloj) +
      tile("goSim", "exam", "var(--hl-b)", "Simulacro", "Formato DIAN 2676, con paseo del experto") +
      tile("goDuelo", "users", "var(--hl-p)", "Duelo de pareja", "Los mismos casos para los dos") + "</div>";

    // Prioridad
    var pr = APP.prioridades()[0];
    if (pr) h += '<button class="card stack" data-act="stats" style="text-align:left;border:0;cursor:pointer"><p class="tiny">Lo que más te conviene reforzar</p><b>' + esc(pr.nombre) + '</b><p class="small muted">' + esc(pr.motivo) + "</p></button>";
    var st = APP.store.raw(), pl = APP.plataforma();
    if (st.avisosRoto) h += '<button class="card row" data-act="go" data-view="avisos" style="border:0;cursor:pointer;text-align:left;box-shadow:0 0 0 2px var(--bad)">' + APP.ic("bell", ' width="22" height="22"') + '<span class="grow"><b>Los avisos de este celular se desconectaron</b><br><span class="small muted">Toca aquí para activarlos otra vez.</span></span></button>';
    else if (!st.avisos && pl.standalone && Object.keys(p.dias).length >= 1) h += '<button class="card row" data-act="go" data-view="avisos" style="border:0;cursor:pointer;text-align:left">' + APP.ic("bell", ' width="22" height="22"') + '<span class="grow"><b>Activa los avisos diarios</b><br><span class="small muted">Uno en la mañana con tu misión y otro en la noche para cuidar tu racha.</span></span></button>';
    else if (!pl.standalone && (pl.ios || pl.android)) h += '<button class="card row" data-act="go" data-view="instalar" style="border:0;cursor:pointer;text-align:left">' + APP.ic("phone", ' width="22" height="22"') + '<span class="grow"><b>Instálala en tu pantalla de inicio</b><br><span class="small muted">Para tener el ícono, usarla sin internet y recibir avisos.</span></span></button>';
    if (APP.cfg.nombreProvisional) h += '<button class="card row" data-act="nombre" style="border:0;cursor:pointer;text-align:left">' + APP.ic("pencil", ' width="22" height="22"') + '<span class="grow"><b>Falta el nombre de la app</b><br><span class="small muted">«' + esc(APP.cfg.nombre) + '» es provisional. Elíjanlo juntos aquí.</span></span></button>';
    h += "</div>";
    return { tab: "home", html: h, mount: function () { setTimeout(APP.celebrarPendientes, 900); }, on: {
      menu: function () { APP.menu(); },
      paso: function (el) { APP.abrirPaso(+el.getAttribute("data-i")); },
      cofre: function () { APP.cofre(); },
      rafagaLibre: function () { APP.go("rafaga", { mode: "gemelos", n: 10 }); },
      relojLibre: function () { APP.go("rafaga", { mode: "reloj" }); },
      goSim: function () { APP.go("sim", {}, { reset: true }); },
      goDuelo: function () { APP.go("duelo"); },
      stats: function () { APP.go("stats"); },
      nombre: function () { APP.go("nombre"); }
    } };
  };
  function tile(act, ic, bg, t, d) {
    return '<button class="tile" data-act="' + act + '"><span class="ico" style="background:' + bg + ';color:#13182B">' + APP.ic(ic) + '</span><span class="t">' + esc(t) + '</span><span class="d">' + esc(d) + "</span></button>";
  }

  /* Abrir un paso de la misión */
  APP.abrirPaso = function (i) {
    var m = APP.mision.hoy(), s = m.pasos[i]; if (!s) return;
    APP.sfx("tap");
    if (s.k === "repaso") APP.go("rafaga", { mode: "repaso", n: 6, paso: i });
    else if (s.k === "escena") APP.go("escena", { id: s.id, paso: i });
    else if (s.k === "gemelos") APP.go("rafaga", { mode: "gemelos", n: 8, paso: i });
    else if (s.k === "caso") APP.go("rafaga", { mode: "caso", n: 2, paso: i });
    else if (s.k === "reloj") APP.go("rafaga", { mode: "reloj", paso: i });
    else if (s.k === "likert") APP.go("likert", { modo: "dia", paso: i });
  };
  APP.pasoHecho = function (i) {
    if (i == null) return;
    var r = APP.mision.marcar(i);
    var p = APP.perfil();
    if (r.completa) {
      var x = APP.addXP(50);
      var h = U.hora();
      var lg = [APP.logro("primer-dia")];
      if (p.racha.n >= 3) lg.push(APP.logro("racha-3"));
      if (p.racha.n >= 7) lg.push(APP.logro("racha-7"));
      if (p.racha.n >= 14) lg.push(APP.logro("racha-14"));
      if (h < 7) lg.push(APP.logro("madrugador"));
      if (h >= 22) lg.push(APP.logro("noche"));
      lg.filter(Boolean).forEach(APP.celebrarLogro);
      APP.go("home", {}, { reset: true });
      setTimeout(function () {
        APP.sfx("level"); APP.confetti(180); APP.vibrar([40, 60, 40]);
        APP.sheet('<div class="stack" style="text-align:center"><span class="flame" style="color:#FF8A1F;margin:0 auto;width:64px;height:64px;display:block">' + APP.ic("flame", ' width="64" height="64"') + '</span><h2 style="font-size:28px">¡Misión cumplida!</h2><p class="muted">Racha de ' + p.racha.n + " día" + (p.racha.n > 1 ? "s" : "") + ". +50 XP.</p>" +
          '<button class="btn cta block" data-act="abrir">' + APP.ic("gift", ' width="22" height="22"') + " Abrir el cofre</button></div>", { abrir: function () { APP.closeSheet(); APP.cofre(); } });
        if (x.levelUp) setTimeout(function () { APP.celebrarNivel(x.nivel); }, 2500);
      }, 250);
    } else {
      APP.go("home", {}, { reset: true });
    }
  };

  /* Cofre del día: recompensa variable */
  APP.cofre = function () {
    var p = APP.perfil(), m = APP.mision.hoy();
    if (m.cofre) return;
    var r = Math.random(), premio, xp = 0;
    if (r < 0.22 && p.racha.comodines < 2) { p.racha.comodines++; premio = { t: "Un comodín", d: "Si un día no alcanzas a hacer la misión, el comodín salva tu racha." }; }
    else { xp = r < 0.55 ? 30 : r < 0.85 ? 50 : 90; premio = { t: "+" + xp + " XP", d: xp >= 90 ? "¡El premio mayor del cofre!" : "Puntos extra para tu nivel." }; }
    m.cofre = true; APP.store.save();
    var consejo = U.pick(APP.consejos);
    APP.sheet('<div class="stack" style="text-align:center"><div style="font-size:0;margin:6px auto;width:96px;height:96px;display:grid;place-items:center;border-radius:28px;background:var(--hl-y);color:#13182B;animation:pop .5s ease">' + APP.ic("gift", ' width="58" height="58"') + '</div><h2 style="font-size:28px">' + esc(premio.t) + '</h2><p class="muted">' + esc(premio.d) + '</p><div class="card sunk" style="text-align:left"><b>Consejo para la prueba</b><p class="small" style="margin-top:4px">' + esc(consejo) + '</p></div><button class="btn cta block" data-act="close">Guardar</button></div>', {});
    APP.sfx("chest"); APP.confetti(100);
    if (xp) { var x = APP.addXP(xp); if (x.levelUp) setTimeout(function () { APP.celebrarNivel(x.nivel); }, 1800); }
    APP.rerender();
  };

  /* Menú desplegable de Inicio */
  APP.menu = function () {
    var p = APP.perfil();
    function it(act, ic, t, d) { return '<button class="menu-item" data-act="' + act + '"><span class="ic">' + APP.ic(ic) + "</span><span><b>" + esc(t) + "</b><small>" + esc(d) + "</small></span>" + APP.ic("back", ' width="18" height="18" style="transform:rotate(180deg);opacity:.5"') + "</button>"; }
    APP.sheet('<h2>Más opciones</h2><div class="menu-list">' +
      it("mStats", "chart", "Mis estadísticas", "Qué reforzar primero y cómo") +
      it("mLogros", "trophy", "Logros", Object.keys(p.logros).length + " de " + APP.logrosDef.length) +
      it("mInstalar", "phone", "Instalar en el celular", "Ícono en la pantalla de inicio") +
      it("mAvisos", "bell", "Avisos diarios", "Recordatorio en la mañana y en la noche") +
      it("mNombre", "pencil", APP.cfg.nombreProvisional ? "Elegir el nombre de la app" : "El nombre de la app", APP.cfg.nombreProvisional ? "Pendiente" : "Elegido: " + APP.cfg.nombre) +
      it("mReporte", "send", "Reporte para Claude", "Para que ajuste la app a lo que más fallas") +
      it("mRespaldo", "shield", "Copia de seguridad", "Guarda o pasa tu avance a otro celular") +
      it("mTemas", "gear", "Temas, tiempo y persona", "Cambiar lo que entrenas") +
      it("mSonido", p.sonido ? "sound" : "mute", p.sonido ? "Sonido activado" : "Sonido apagado", "Toca para cambiarlo") +
      it("mNovedades", "sparkles", "Novedades", "Versión " + APP.cfg.version) +
      "</div>", {
        mStats: function () { APP.closeSheet(); APP.go("stats"); },
        mLogros: function () { APP.closeSheet(); APP.go("logros"); },
        mInstalar: function () { APP.closeSheet(); APP.go("instalar"); },
        mAvisos: function () { APP.closeSheet(); APP.go("avisos"); },
        mNombre: function () { APP.closeSheet(); APP.go("nombre"); },
        mReporte: function () { APP.closeSheet(); APP.go("reporte"); },
        mRespaldo: function () { APP.closeSheet(); APP.go("respaldo"); },
        mTemas: function () { APP.closeSheet(); APP.go("temas"); },
        mSonido: function () { p.sonido = !p.sonido; APP.store.save(); APP.closeSheet(); APP.toast(p.sonido ? "Sonido activado" : "Sonido apagado", p.sonido ? "sound" : "mute"); },
        mNovedades: function () { APP.closeSheet(); APP.go("novedades"); }
      });
  };

  /* =========================================================================
     MEMORIA (datos cruzados)
     ========================================================================= */
  V.memoria = function () {
    var p = APP.perfil();
    var h = '<div class="scr">' + APP.top("Memoria", { noBack: true }) +
      '<p class="lede">Los capítulos 1 a 3 del M06 caben en tres mapas. Cada mapa responde tres preguntas. El día de la prueba, recuerdas el mapa y respondes las tres.</p>';
    ["m06-1", "m06-2", "m06-3"].forEach(function (mid) {
      var M = D.mapas[mid], es = D.escenas.filter(function (e) { return e.mapa === mid; }), done = es.filter(function (e) { return p.esc[e.id] && p.esc[e.id].done; }).length;
      var on = p.temas[mid];
      h += '<div class="card stack"' + (on ? "" : ' style="opacity:.55"') + '><div class="row spread"><h3>' + esc(M.nombre) + '</h3><span class="chip">' + done + "/" + es.length + ' escenas</span></div><div class="row wrap">' +
        M.preguntas.map(function (q, i) { return '<span class="chip ' + ["y", "b", "g"][i] + '">' + esc(q) + "</span>"; }).join("") + '</div><div class="bar g"><i style="width:' + Math.round(100 * done / es.length) + '%"></i></div>' +
        '<div class="row"><button class="btn soft grow" data-act="verMapa" data-m="' + mid + '">Ver el mapa</button><button class="btn dark grow" data-act="escenas" data-m="' + mid + '">Escenas</button></div></div>';
    });
    h += '<div class="tiles">' + tile("raf", "bolt", "var(--hl-y)", "Ráfaga de gemelos", "Diez casos; cada pareja cambia un solo dato") +
      tile("reloj", "clock", "var(--hl-o)", "Contrarreloj", "Sesenta segundos para tu récord") + "</div>";
    h += "</div>";
    return { tab: "memoria", html: h, on: {
      verMapa: function (el) { APP.go("mapas", { m: el.getAttribute("data-m") }); },
      escenas: function (el) { APP.go("escenas", { m: el.getAttribute("data-m") }); },
      raf: function () { APP.go("rafaga", { mode: "gemelos", n: 10 }); },
      reloj: function () { APP.go("rafaga", { mode: "reloj" }); }
    } };
  };

  V.escenas = function (pr) {
    var p = APP.perfil(), M = D.mapas[pr.m], es = D.escenas.filter(function (e) { return e.mapa === pr.m; });
    var h = '<div class="scr">' + APP.top(M.nombre) + '<p class="muted">Cada escena dura un minuto, arma una pieza del mapa y te entrega láminas para el álbum.</p><div class="stack">';
    es.forEach(function (e, i) {
      var st = p.esc[e.id], done = st && st.done;
      h += '<button class="step' + (done ? " done" : "") + '" data-act="ver" data-id="' + e.id + '"><span class="dot">' + (done ? APP.ic("check", ' width="18" height="18"') : (i + 1)) + '</span><span><span class="t">' + esc(e.titulo) + '</span><br><span class="d">' + e.lam.length + " lámina" + (e.lam.length > 1 ? "s" : "") + (done ? " · vista" : "") + '</span></span><span class="tiny">1 min</span></button>';
    });
    h += "</div></div>";
    return { tab: "memoria", html: h, on: { ver: function (el) { APP.go("escena", { id: el.getAttribute("data-id") }); } } };
  };

  V.mapas = function (pr) {
    var m = pr.m || "m06-1";
    var h = '<div class="scr">' + APP.top("Los tres mapas") + '<div class="row wrap">' +
      ["m06-1", "m06-2", "m06-3"].map(function (id) { return '<button class="chip pick' + (id === m ? " on" : "") + '" data-act="tab" data-m="' + id + '">' + esc(D.mapas[id].nombre) + "</button>"; }).join("") + "</div>" +
      APP.mapHTML(m, []) + '<p class="tiny">Toca cualquier pieza para ver su lámina. Las piezas con candado se abren en las escenas.</p></div>';
    return { tab: "memoria", html: h, on: { tab: function (el) { APP.go("mapas", { m: el.getAttribute("data-m") }, { replace: true }); } } };
  };

  /* Escena: lección de un minuto */
  V.escena = function (pr) {
    var e = D.escenas.filter(function (x) { return x.id === pr.id; })[0];
    var st = pr.st || (pr.st = { fase: 0, sel: null });
    var total = e.cuerpo.length;
    var h = '<div class="scr full">' + APP.top(e.titulo, { close: true });
    h += '<div class="card stack">' + APP.mapHTML(e.mapa, e.foco, {}) + "</div>";
    h += '<div class="card stack read">';
    for (var i = 0; i <= Math.min(st.fase, total - 1); i++) h += '<p style="animation:rise .3s ease both">' + esc(e.cuerpo[i]) + "</p>";
    h += "</div>";
    if (st.fase >= total) h += '<div class="card sunk"><b><span class="mk g">Por qué tiene sentido</span></b><p class="small" style="margin-top:6px">' + esc(e.porque) + "</p></div>";
    if (st.fase >= total + 1) {
      var c = e.check;
      h += '<div class="stack"><p class="q">' + esc(c.q) + '</p><div class="opts">' + c.ops.map(function (o, j) {
        var cls = "opt";
        if (st.sel != null) { if (o.ok) cls += " ok"; else if (j === st.sel) cls += " bad"; else cls += " fade"; }
        return '<button class="' + cls + '" data-act="pick" data-j="' + j + '"' + (st.sel != null ? " disabled" : "") + '><span class="L">' + "ABC"[j] + "</span><span>" + esc(o.t) + "</span></button>";
      }).join("") + "</div>";
      if (st.sel != null) { var ok = c.ops[st.sel].ok; h += '<div class="fb ' + (ok ? "ok" : "bad") + '"><span class="h">' + (ok ? "¡Exacto!" : "Casi.") + '</span><span class="small">' + esc(c.ops[st.sel].por) + (ok ? "" : " La correcta: " + esc(c.ops.filter(function (o) { return o.ok; })[0].t)) + "</span></div>"; }
      h += "</div>";
    }
    h += '<div class="sticky-foot">';
    if (st.fase < total) h += '<button class="btn dark block" data-act="more">' + (st.fase + 1 < total ? "Siguiente idea (" + (st.fase + 1) + "/" + total + ")" : "Ver por qué tiene sentido") + "</button>";
    else if (st.fase === total) h += '<button class="btn dark block" data-act="more">Ponerlo a prueba</button>';
    else if (st.sel != null) h += '<button class="btn cta block" data-act="fin">Recibir mis láminas</button>';
    h += "</div></div>";
    return { tab: false, html: h, on: {
      more: function () { st.fase++; APP.sfx("swish"); APP.rerender(); window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }); },
      pick: function (el) {
        if (st.sel != null) return;
        st.sel = +el.getAttribute("data-j"); var ok = e.check.ops[st.sel].ok;
        APP.sfx(ok ? "ok" : "bad"); APP.vibrar(ok ? 15 : [30, 40, 30]);
        APP.track({ sub: lamById(e.lam[0]).sub, ok: ok, seg: 0, lam: [] });
        APP.rerender(); window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      },
      fin: function () {
        var p = APP.perfil(), ok = e.check.ops[st.sel].ok;
        p.esc[e.id] = { done: true, ok: ok, t: new Date().toISOString() }; APP.store.save();
        APP.revealLaminas(e.lam, function () {
          if (!ok) e.lam.forEach(function (id) { var L = p.lam[id]; if (L) L.due = U.today(); });
          var x = APP.addXP(ok ? 30 : 20);
          if (D.escenas.every(function (z) { return p.esc[z.id] && p.esc[z.id].done; })) APP.celebrarLogro(APP.logro("mapa"));
          if (pr.paso != null) APP.pasoHecho(pr.paso); else APP.back();
          if (x.levelUp) setTimeout(function () { APP.celebrarNivel(x.nivel); }, 600);
        });
      }
    } };
  };

  /* =========================================================================
     RÁFAGA DE CASOS (gemelos, repaso, caso del día, contrarreloj, duelo, refuerzo)
     ========================================================================= */
  V.rafaga = function (pr) {
    var S = pr.S;
    if (!S) {
      var mode = pr.mode || "gemelos";
      var seed = pr.seed || U.rnd();
      var weights = APP.pesosFamilias(mode === "repaso" ? "repaso" : (pr.sub ? { sub: pr.sub } : null));
      var lvlOf = function (f) { return mode === "caso" ? 3 : (mode === "reloj" ? Math.min(2, APP.famLvl(f)) : APP.famLvl(f)); };
      var n = mode === "reloj" ? 40 : (pr.n || 10);
      // En el duelo los dos deben recibir exactamente los mismos casos: todas las familias, sin pesos personales.
      var fams = mode === "duelo" ? APP.gen.FAM_IDS : APP.gen.FAM_IDS.filter(function (f) { return weights[f] > 0; });
      var cases = APP.gen.round({ seed: seed, n: n, lvl: mode === "duelo" ? function () { return 2; } : lvlOf, weights: mode === "duelo" ? null : weights, fams: fams, twins: mode !== "reloj" && mode !== "caso" });
      S = pr.S = { mode: mode, cases: cases, i: 0, sel: null, combo: 0, best: 0, ok: 0, xp: 0, t0: Date.now(), tItem: Date.now(), res: [], cambios: [], left: 60, seed: seed };
      if (mode === "reloj") startClock(S);
    }
    var c = S.cases[S.i], N = S.mode === "reloj" ? null : S.cases.length;
    if (S.fin) return rafagaFin(pr, S);
    var titles = { gemelos: "Gemelos", repaso: "Calentamiento", caso: "Reto del operador", reloj: "Contrarreloj", duelo: "Duelo " + (pr.code || ""), refuerzo: "Refuerzo" };
    var h = '<div class="scr full"><div class="progress-top"><button class="icon-btn" data-act="salir" aria-label="Salir">' + APP.ic("close") + "</button>";
    h += S.mode === "reloj" ? '<div class="timer"><i id="tbar" style="width:' + (100 * S.left / 60) + '%"></i></div><b class="num" id="tleft">' + S.left + " s</b>"
      : '<div class="bar y"><i style="width:' + Math.round(100 * S.i / N) + '%"></i></div><b class="num">' + (S.i + 1) + "/" + N + "</b>";
    h += "</div>";
    h += '<div class="row spread"><span class="chip">' + esc(titles[S.mode] || "Ráfaga") + " · " + esc(c.famNombre) + "</span>" + (S.combo >= 2 ? '<span class="combo">' + APP.ic("bolt", ' width="16" height="16"') + " x" + S.combo + "</span>" : "") + "</div>";
    if (c.twinOf && S.sel == null) h += '<div class="twin">' + APP.ic("refresh", ' width="18" height="18"') + "<span>Gemelo del caso anterior: algo cambió. Encuéntralo.</span></div>";
    h += '<div class="ctx">' + esc(c.ctx) + '</div><p class="q">' + esc(c.q) + '</p><div class="opts">';
    h += c.ops.map(function (o, j) {
      var cls = "opt";
      if (S.sel != null) { if (o.ok) cls += " ok"; else if (j === S.sel) cls += " bad"; else cls += " fade"; }
      return '<button class="' + cls + '" data-act="pick" data-j="' + j + '"' + (S.sel != null ? " disabled" : "") + '><span class="L">' + "ABC"[j] + "</span><span>" + esc(o.t) + "</span></button>";
    }).join("") + "</div>";
    if (S.sel != null && S.mode !== "reloj") {
      var okc = c.ops[S.sel].ok, right = c.ops[c.key];
      h += '<div class="fb ' + (okc ? "ok" : "bad") + '"><span class="h">' + (okc ? U.pick(["¡Correcto!", "¡Exacto!", "¡Bien leído!", "¡Eso es!"]) : "No era esa.") + "</span>" +
        '<span class="small">' + esc(c.ops[S.sel].por.replace(/^Correct[oa][.:]\s*/, "")) + "</span>" + (okc ? "" : '<span class="small"><b>La correcta:</b> ' + esc(right.por.replace(/^Correct[oa][.:]\s*/, "")) + "</span>") + "</div>";
      if (c.cambio) h += '<div class="twin">' + APP.ic("sparkles", ' width="18" height="18"') + "<span><b>Lo que cambió:</b> " + esc(c.cambio) + ". Un solo dato, y la respuesta cambió.</span></div>";
      if (c.linea) h += '<div class="card">' + APP.miniLine(c.linea) + "</div>";
      h += '<div class="card sunk small"><b>La regla</b><p style="margin-top:4px">' + esc(c.exp) + "</p></div>";
    }
    h += '<div class="sticky-foot">' + (S.sel != null && S.mode !== "reloj" ? '<button class="btn cta block" data-act="next">' + (S.i + 1 < N ? "Siguiente" : "Ver resultado") + "</button>" : "") + "</div></div>";
    return { tab: false, html: h,
      onBack: function () { return confirmSalir(S); },
      on: {
        salir: function () { if (confirmSalir(S) !== false) APP.back(); },
        pick: function (el) {
          if (S.sel != null || S.fin) return;
          S.sel = +el.getAttribute("data-j");
          var ok = c.ops[S.sel].ok, seg = (Date.now() - S.tItem) / 1000;
          if (ok) { S.ok++; S.combo++; S.best = Math.max(S.best, S.combo); } else S.combo = 0;
          var gain = ok ? 10 + (seg <= 12 ? 3 : 0) + (S.combo >= 3 ? 2 : 0) : 2;
          S.xp += gain;
          S.res.push({ c: c, sel: S.sel, ok: ok, seg: seg });
          var ch = APP.track({ sub: c.sub, fam: c.fam, ok: ok, seg: seg, lam: c.lam });
          S.cambios = S.cambios.concat(ch);
          if (ok) { APP.sfx(S.combo >= 3 ? "combo" : "ok", S.combo); APP.vibrar(12); } else { APP.sfx("bad"); APP.vibrar([30, 40, 30]); }
          if (S.mode === "reloj") { setTimeout(function () { if (S.fin) return; S.i++; S.sel = null; S.tItem = Date.now(); if (S.i >= S.cases.length) finish(S); APP.rerender(); }, ok ? 350 : 750); }
          APP.rerender();
          if (S.mode !== "reloj") setTimeout(function () { var f = document.querySelector(".fb"); if (f) f.scrollIntoView({ behavior: "smooth", block: "start" }); }, 60);
        },
        next: function () {
          if (S.i + 1 >= S.cases.length) { finish(S); APP.rerender(); return; }
          S.i++; S.sel = null; S.tItem = Date.now(); APP.sfx("tap"); APP.rerender();
        }
      } };
  };
  function startClock(S) {
    S.timer = setInterval(function () {
      S.left--;
      var b = document.getElementById("tbar"), l = document.getElementById("tleft");
      if (b) b.style.width = (100 * S.left / 60) + "%"; if (l) l.textContent = S.left + " s";
      if (S.left <= 5 && S.left > 0) APP.sfx("tick");
      if (S.left <= 0) { finish(S); APP.rerender(); }
    }, 1000);
  }
  function finish(S) { S.fin = true; if (S.timer) clearInterval(S.timer); }
  function confirmSalir(S) {
    if (S.fin || !S.res.length) { if (S.timer) clearInterval(S.timer); return true; }
    APP.sheet('<h2>¿Salir de la ronda?</h2><p class="muted">Lo que ya respondiste queda guardado en tus láminas y estadísticas, pero esta ronda no cuenta para la misión.</p><div class="row"><button class="btn soft grow" data-act="close">Seguir jugando</button><button class="btn dark grow" data-act="si">Salir</button></div>',
      { si: function () { APP.closeSheet(); if (S.timer) clearInterval(S.timer); S.res = []; S.fin = true; APP.back(); } });
    return false;
  }
  function rafagaFin(pr, S) {
    if (!S.cerrado) {
      S.cerrado = true;
      var p = APP.perfil();
      var lg = [];
      var total = S.res.length;
      if (S.mode !== "reloj" && total >= 6 && S.ok === total) lg.push(APP.logro("perfecta"));
      if (S.best >= 8) lg.push(APP.logro("combo-8"));
      if (S.mode === "reloj") { if (S.ok > p.records.contrarreloj) { p.records.contrarreloj = S.ok; S.record = true; } if (S.ok >= 12) lg.push(APP.logro("reloj-12")); }
      if (S.mode === "duelo") { p.duelos.push({ code: pr.code, ok: S.ok, n: total, seg: Math.round((Date.now() - S.t0) / 1000), t: new Date().toISOString() }); lg.push(APP.logro("duelo")); }
      APP.store.save();
      var x = APP.addXP(S.xp);
      S.levelUp = x.levelUp ? x.nivel : null;
      lg.filter(Boolean).forEach(APP.celebrarLogro);
      if (S.ok === total && total) { APP.sfx("level"); APP.confetti(); }
      ["f", "c", "v", "m"].forEach(function () {});
      if (S.cambios.some(function (c) { return c.to === 3; })) APP.celebrarLogro(APP.logro("dorada"));
    }
    var total2 = S.res.length, segs = Math.round((Date.now() - S.t0) / 1000);
    var h = '<div class="scr full">' + APP.top(S.mode === "reloj" ? "Se acabó el tiempo" : "Resultado", { close: true });
    h += '<div class="card stack" style="text-align:center"><div style="font-size:54px;font-weight:800;line-height:1" class="num">' + S.ok + "/" + total2 + '</div><p class="muted">' +
      (S.mode === "reloj" ? (S.record ? "¡Nuevo récord!" : "Récord: " + APP.perfil().records.contrarreloj) : (S.ok === total2 ? "Ronda perfecta." : S.ok >= total2 * 0.7 ? "Muy bien." : "Cada error te mostró una trampa: ya la conoces.")) +
      '</p><div class="row" style="justify-content:center"><span class="chip y">+' + S.xp + ' XP</span>' + (S.best >= 2 ? '<span class="chip o">Mejor combo x' + S.best + "</span>" : "") + '<span class="chip">' + U.mmss(segs) + "</span></div>" +
      (S.mode === "duelo" ? '<p class="small">Código del duelo: <b>' + esc(pr.code) + "</b>. Comparen el resultado: gana quien tenga más aciertos; si empatan, quien tardó menos.</p>" : "") + "</div>";
    var subidas = S.cambios.filter(function (c) { return c.to > c.from; }), bajadas = S.cambios.filter(function (c) { return c.to < c.from; });
    if (subidas.length || bajadas.length) {
      h += '<div class="card stack"><h3>Tu álbum</h3>' + subidas.map(function (c) { var l = lamById(c.id); return '<button class="row" data-act="lamina" data-id="' + c.id + '" style="border:0;background:none;text-align:left;cursor:pointer;padding:0"><span class="chip ' + (c.to === 3 ? "y" : "g") + '">' + (c.to === 3 ? "Dorada" : "Brillante") + '</span><span class="small grow">' + esc(l.t) + "</span></button>"; }).join("") +
        bajadas.map(function (c) { var l = lamById(c.id); return '<button class="row" data-act="lamina" data-id="' + c.id + '" style="border:0;background:none;text-align:left;cursor:pointer;padding:0"><span class="chip bad">Bajó</span><span class="small grow">' + esc(l.t) + "</span></button>"; }).join("") + "</div>";
    }
    var errs = S.res.filter(function (r) { return !r.ok; });
    if (errs.length) {
      h += '<h3>Para no repetir el error</h3>' + errs.map(function (r) {
        return '<div class="card stack"><p class="small read">' + esc(r.c.ctx) + '</p><p class="small"><span class="chip bad">Elegiste</span> ' + esc(r.c.ops[r.sel].t) + '</p><p class="small"><span class="chip ok">Era</span> ' + esc(r.c.ops[r.c.key].t) + '</p><p class="small muted">' + esc(r.c.exp) + "</p></div>";
      }).join("");
    }
    h += '<div class="sticky-foot">';
    if (pr.paso != null) h += '<button class="btn cta block" data-act="cont">Seguir con la misión</button>';
    else h += '<button class="btn cta block" data-act="otra">Otra ronda</button><button class="btn soft block" data-act="back">Volver</button>';
    h += "</div></div>";
    return { tab: false, html: h, on: {
      cont: function () { APP.pasoHecho(pr.paso); if (S.levelUp) setTimeout(function () { APP.celebrarNivel(S.levelUp); }, 2600); },
      otra: function () { APP.go("rafaga", { mode: S.mode === "duelo" ? "gemelos" : S.mode, n: S.mode === "caso" ? 2 : (S.cases.length > 10 ? 10 : S.cases.length), sub: pr.sub }, { replace: true }); }
    } };
  }

  /* =========================================================================
     ÁLBUM
     ========================================================================= */
  V.album = function (pr) {
    var pg = pr.pg || "p1";
    var tot = APP.lam.conteo();
    var h = '<div class="scr">' + APP.top("Álbum", { noBack: true }) +
      '<div class="card row"><div class="grow"><b class="num" style="font-size:22px">' + tot.obt + " de " + tot.total + '</b><p class="small muted">láminas obtenidas · ' + tot.bri + " brillantes · " + tot.dor + ' doradas</p></div>' + APP.ring(tot.total ? tot.obt / tot.total : 0, Math.round(100 * (tot.total ? tot.obt / tot.total : 0)) + "%", 64) + "</div>" +
      '<p class="small muted">Una lámina se obtiene en las escenas o al responder. Se vuelve <span class="mk g">brillante</span> cuando la aciertas otro día, y <span class="mk y">dorada</span> cuando la aciertas en un tercer día. Así funciona el repaso espaciado: sin que tengas que pensar en él.</p>';
    h += '<div class="row wrap">' + D.paginas.filter(function (p) { return APP.perfil().temas[p.tema]; }).map(function (p) { var c = APP.lam.conteo(p.id); return '<button class="chip pick' + (p.id === pg ? " on" : "") + '" data-act="pg" data-p="' + p.id + '">' + esc(p.nombre) + " · " + c.obt + "/" + c.total + "</button>"; }).join("") + "</div>";
    var ls = D.laminas.filter(function (l) { return l.pag === pg && APP.lamVisible(l); });
    h += '<div class="album-grid">' + ls.map(function (l) {
      var lv = APP.lam.get(l.id).lv || 0;
      return '<button class="lam l' + lv + '" style="--c:var(--hl-' + APP.lamColor(l) + ')" data-act="lamina" data-id="' + l.id + '"><span class="n">' + APP.lamNum(l) + '</span><span class="tt">' + (lv ? esc(l.t) : "Por obtener") + '</span><span class="lv"><i></i><i></i><i></i></span></button>';
    }).join("") + "</div>";
    var c = APP.lam.conteo(pg);
    if (c.total && c.obt === c.total) { var lg = APP.logro("pagina"); if (lg) setTimeout(function () { APP.celebrarLogro(lg); }, 400); }
    h += "</div>";
    return { tab: "album", html: h, on: { pg: function (el) { APP.go("album", { pg: el.getAttribute("data-p") }, { replace: true }); } } };
  };
})();


/* ===== src/ui/views2.js ===== */
/* Simulacros, afirmaciones, paseo del experto, estadísticas y pantallas de servicio. */
var APP = window.APP || (window.APP = {});

(function () {
  "use strict";
  var D = APP.data, U = APP.u, V = APP.views, esc = U.esc;
  var LETRAS = "ABCD";
  function casoById(id) { return D.casos.filter(function (c) { return c.id === id; })[0]; }
  function afById(id) { return D.afirmaciones.filter(function (a) { return a.id === id; })[0]; }
  function lamById(id) { return D.laminas.filter(function (l) { return l.id === id; })[0]; }

  /* ---------------- Afirmaciones disponibles para el usuario ---------------- */
  APP.afirmacionesDe = function (tipo, pool) {
    var u = APP.usuario();
    return D.afirmaciones.filter(function (a) {
      if (a.tipo !== tipo || (pool && a.pool !== pool)) return false;
      if (tipo === "comp" && a.ind && u.indicadores.indexOf(a.ind) < 0) return false;
      return true;
    });
  };
  /* Puntaje estimado tipo FUAA: 1 a 4 según la cercanía al extremo favorable (criterio de Claude). */
  APP.puntosLikert = function (a, resp) {
    if (a.clave === "H") return [4, 4, 2, 1][resp];
    if (a.clave === "D") return [1, 2, 3, 4][resp];
    return [4, 3, 2, 1][resp];
  };
  APP.extremoOk = function (a, resp) { return a.clave === "H" ? resp <= 1 : (a.clave === "D" ? resp === 3 : resp === 0); };
  function nombreComp(k) { return D.competencias[k] ? D.competencias[k].nombre : (D.valores[k] ? D.valores[k].nombre : k); }
  /* Láminas que una afirmación pone en juego: la de su competencia o valor y las del método que se usan para resolverla. */
  var NEGA = /^(evito|me niego|no acepto|no permito|rechazo|me abstengo|no comparto|no utilizo|no uso|no doy|no recibo)\b/i;
  function lamDeAfirm(a) {
    var ids = [];
    if (a.ind) ids.push("c-" + a.ind);
    if (a.val) ids.push(a.val);
    ids.push("m-pasos");
    if (a.clave !== "H") ids.push("m-extremos");
    if (a.condTipo) ids.push("m-costo");
    if (a.condTipo === "costo" && a.clave === "D") ids.push("m-abogado");
    if (a.clave === "H") ids.push("m-perfeccion");
    if (a.virtud && a.clave !== "H") ids.push(a.tipo === "integ" ? "v-disfraz" : "m-virtud");
    if (NEGA.test(a.texto)) ids.push("m-negacion");
    return ids;
  }
  APP.lamDeAfirm = lamDeAfirm;

  /* =========================================================================
     SIMULACRO · centro
     ========================================================================= */
  V.sim = function () {
    var p = APP.perfil(), P = APP.proyecto();
    var bloques = [
      { k: "func", t: "Prueba funcional", d: "Juicio situacional: un caso, un enunciado y tres opciones. Capítulos 1 a 3 del M06.", tema: ["m06-1", "m06-2", "m06-3"], ids: D.casos.filter(function (c) { return p.temas[c.tema]; }).map(function (c) { return c.id; }), corto: 4, meta: "Unos 3 minutos y medio por caso" },
      { k: "comp", t: "Prueba comportamental", d: "Afirmaciones con escala de cuatro niveles, hechas con tus competencias y niveles.", tema: ["comp"], ids: APP.afirmacionesDe("comp", "sim").map(function (a) { return a.id; }), corto: 10, meta: "Unos 20 segundos por afirmación" },
      { k: "integ", t: "Prueba de integridad", d: "Los cinco valores del Código de Integridad de la DIAN. Va en un bloque aparte, como en la prueba real.", tema: ["integ"], ids: APP.afirmacionesDe("integ", "sim").map(function (a) { return a.id; }), corto: 6, meta: "Unos 20 segundos por afirmación" }
    ];
    var h = '<div class="scr">' + APP.top("Simulacro", { noBack: true }) +
      '<p class="lede">El formato de ' + esc(P.convocatoria) + ". Fijas tu respuesta, cuentas cómo te fue y, al final, el experto te muestra cómo lo habría resuelto.</p>" +
      '<div class="card stack" style="gap:10px"><span class="small"><b>¿Cuándo quieres ver la explicación?</b></span><div class="row wrap"><button class="chip pick' + (p.modoRetro === "final" ? " on" : "") + '" data-act="modo" data-m="final">Al final, como en la prueba</button><button class="chip pick' + (p.modoRetro === "cada" ? " on" : "") + '" data-act="modo" data-m="cada">Después de cada uno</button></div></div>';
    bloques.forEach(function (b) {
      var on = b.tema.some(function (t) { return p.temas[t]; });
      if (!on) return;
      var vistos = b.ids.filter(function (id) { return p.sim.vistos[id]; }).length, fall = b.ids.filter(function (id) { return p.sim.fallados[id]; }).length;
      var ult = p.sim.intentos.filter(function (x) { return x.tipo === b.k; }).slice(-1)[0];
      h += '<div class="card stack"><div class="row spread"><h3>' + esc(b.t) + '</h3><span class="chip">' + vistos + "/" + b.ids.length + ' vistos</span></div><p class="small muted">' + esc(b.d) + '</p><p class="tiny">' + esc(b.meta) + (ult ? " · último resultado: " + esc(ult.resumen) : "") + "</p>" +
        '<div class="row wrap"><button class="btn dark grow" data-act="corto" data-k="' + b.k + '">Simulacro corto (' + Math.min(b.corto, b.ids.length) + ')</button><button class="btn soft grow" data-act="completo" data-k="' + b.k + '">Completo (' + b.ids.length + ")</button></div>" +
        (fall ? '<button class="btn line block" data-act="errores" data-k="' + b.k + '">Mis errores (' + fall + ")</button>" : "") + "</div>";
      b._ids = b.ids;
    });
    var hist = p.sim.intentos.slice(-6).reverse();
    if (hist.length) h += '<h3>Intentos recientes</h3><div class="stack">' + hist.map(function (x) { var i = p.sim.intentos.indexOf(x); return '<button class="menu-item" data-act="ver" data-i="' + i + '"><span class="ic">' + APP.ic(x.tipo === "func" ? "exam" : x.tipo === "comp" ? "users" : "shield") + "</span><span><b>" + esc({ func: "Funcional", comp: "Comportamental", integ: "Integridad" }[x.tipo]) + " · " + esc(x.resumen) + "</b><small>" + new Date(x.ini).toLocaleString("es-CO", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }) + "</small></span>" + APP.ic("back", ' width="18" height="18" style="transform:rotate(180deg);opacity:.5"') + "</button>"; }).join("") + "</div>";
    h += '<p class="tiny">Cuando vean todos los casos, Claude agrega casos nuevos en una actualización. Los que fallen vuelven en «Mis errores».</p></div>';
    function idsDe(k) { return bloques.filter(function (b) { return b.k === k; })[0].ids; }
    function ordenar(ids) { var no = ids.filter(function (id) { return !p.sim.vistos[id]; }), si = ids.filter(function (id) { return p.sim.vistos[id]; }); return U.shuffle(no).concat(U.shuffle(si)); }
    return { tab: "sim", html: h, on: {
      modo: function (el) { p.modoRetro = el.getAttribute("data-m"); APP.store.save(); APP.rerender(); },
      corto: function (el) { var k = el.getAttribute("data-k"), b = bloques.filter(function (x) { return x.k === k; })[0]; APP.go("simplay", { tipo: k, ids: ordenar(idsDe(k)).slice(0, b.corto) }); },
      completo: function (el) { var k = el.getAttribute("data-k"); APP.go("simplay", { tipo: k, ids: ordenar(idsDe(k)) }); },
      errores: function (el) { var k = el.getAttribute("data-k"); APP.go("simplay", { tipo: k, ids: U.shuffle(idsDe(k).filter(function (id) { return p.sim.fallados[id]; })), errores: true }); },
      ver: function (el) { APP.go("simres", { i: +el.getAttribute("data-i") }); }
    } };
  };

  /* =========================================================================
     SIMULACRO · jugador (funcional y escala de cuatro niveles)
     ========================================================================= */
  var SEG = ["Lo domino", "Seguro", "Dudé", "Adiviné"];
  var COMO = ["Por descarte", "Dudé entre dos", "Me confundió la redacción", "No recordaba el dato", "Me faltó tiempo", "Releí el caso"];
  V.simplay = function (pr) {
    var p = APP.perfil();
    var S = pr.S || (pr.S = { i: 0, fase: "resp", sel: null, items: [], pend: [], t0: Date.now(), tItem: Date.now(), marca: { seg: null, como: [], comps: [], nota: "" } });
    var likert = pr.tipo !== "func", N = pr.ids.length;
    if (S.done) return { html: "" };
    var id = pr.ids[S.i], it = likert ? afById(id) : casoById(id);
    var tipo = likert ? it.tipo : "func";
    var retroCada = pr.modo === "dia" || p.modoRetro === "cada";
    var h = '<div class="scr full"><div class="progress-top"><button class="icon-btn" data-act="salir" aria-label="Salir">' + APP.ic("close") + '</button><div class="bar b"><i style="width:' + Math.round(100 * S.i / N) + '%"></i></div><b class="num">' + (S.i + 1) + "/" + N + "</b></div>";
    h += '<div class="row spread"><span class="chip">' + esc(likert ? (tipo === "comp" ? "Comportamental" : "Integridad") : "Funcional") + (pr.errores ? " · mis errores" : "") + (pr.modo === "dia" ? " · práctica" : "") + '</span><span class="chip num" id="clk">' + APP.ic("clock", ' width="16" height="16"') + " <span>" + U.mmss((Date.now() - S.tItem) / 1000) + "</span></span></div>";
    if (!likert) {
      h += '<div class="card stack"><span class="tiny">Caso</span><div class="ctx">' + esc(it.caso) + '</div></div><p class="q">' + esc(it.enunciado) + '</p><div class="opts">' +
        it.ops.map(function (o, j) { return optBtn(LETRAS[j], o.t, j, S, o.ok); }).join("") + "</div>";
    } else {
      h += '<div class="card stack"><span class="tiny">Afirmación</span><div class="ctx" style="font-size:20px">' + esc(it.texto) + '</div></div><div class="opts">' +
        D.proyectos[0].likert.map(function (l, j) { return optBtn(LETRAS[j], l, j, S, null); }).join("") + "</div>";
    }
    // fases
    if (S.fase === "resp") {
      h += '<div class="sticky-foot"><button class="btn cta block" data-act="fijar"' + (S.sel == null ? " disabled" : "") + ">Fijar respuesta</button>" + (S.sel == null ? '<p class="tiny" style="text-align:center">Una vez fijada, no se puede cambiar.</p>' : "") + "</div>";
    } else if (S.fase === "marca") {
      h += '<div class="card stack" style="animation:rise .25s ease both"><div class="row spread"><h3>Marcado extra</h3><span class="tiny">' + APP.ic("clock", ' width="14" height="14"') + " reloj en pausa</span></div>";
      if (likert) {
        var opciones = tipo === "comp" ? Object.keys(D.competencias) : Object.keys(D.valores);
        h += '<p class="small"><b>¿Qué ' + (tipo === "comp" ? "competencia o competencias" : "valor o valores") + ' evalúa?</b> Puedes marcar varias.</p><div class="row wrap">' +
          opciones.map(function (k) { return '<button class="chip pick' + (S.marca.comps.indexOf(k) >= 0 ? " on" : "") + '" data-act="comp" data-k="' + k + '">' + esc(nombreComp(k)) + "</button>"; }).join("") +
          '<button class="chip pick' + (S.marca.comps.indexOf("control") >= 0 ? " on" : "") + '" data-act="comp" data-k="control">Ninguna: es de control</button></div>';
        h += '<p class="small"><b>¿Qué tan seguro?</b></p><div class="row wrap">' + ["Seguro", "Dudé"].map(function (s) { return '<button class="chip pick' + (S.marca.seg === s ? " on" : "") + '" data-act="seg" data-s="' + s + '">' + s + "</button>"; }).join("") + "</div>";
      } else {
        h += '<p class="small"><b>¿Qué tan seguro te sentiste?</b></p><div class="row wrap">' + SEG.map(function (s) { return '<button class="chip pick' + (S.marca.seg === s ? " on" : "") + '" data-act="seg" data-s="' + s + '">' + s + "</button>"; }).join("") + "</div>" +
          '<p class="small"><b>¿Cómo llegaste a la respuesta?</b> Puedes marcar varias.</p><div class="row wrap">' + COMO.map(function (s) { return '<button class="chip pick' + (S.marca.como.indexOf(s) >= 0 ? " on" : "") + '" data-act="como" data-s="' + s + '">' + s + "</button>"; }).join("") + "</div>";
      }
      h += '<label class="small" for="nota"><b>¿Qué te pasó en este punto?</b> (opcional)</label><textarea id="nota" placeholder="Escribe lo que pensaste, lo que dudaste o lo que te confundió">' + esc(S.marca.nota) + "</textarea></div>";
      h += '<div class="sticky-foot"><button class="btn cta block" data-act="sig"' + (S.marca.seg == null || (likert && !S.marca.comps.length) ? " disabled" : "") + ">" + (retroCada ? "Ver la explicación" : (S.i + 1 < N ? "Siguiente" : "Terminar")) + "</button>" +
        ((S.marca.seg == null || (likert && !S.marca.comps.length)) ? '<p class="tiny" style="text-align:center">' + (likert ? "Marca las competencias y tu seguridad." : "Marca tu seguridad para seguir.") + "</p>" : "") + "</div>";
    } else if (S.fase === "retro") {
      var last = S.items[S.items.length - 1];
      h += likert ? retroLikertInline(it, last) : retroFuncInline(it, last);
      h += '<div class="sticky-foot"><button class="btn cta block" data-act="next">' + (S.i + 1 < N ? "Siguiente" : "Terminar") + "</button>" + (!likert ? '<button class="btn soft block" data-act="paseo">Paseo del experto</button>' : "") + "</div>";
    }
    h += "</div>";
    return { tab: false, html: h,
      mount: function () {
        clearInterval(APP._clk);
        if (S.fase === "resp") APP._clk = setInterval(function () { var c = document.querySelector("#clk span"); if (c) c.textContent = U.mmss((Date.now() - S.tItem) / 1000); else clearInterval(APP._clk); }, 1000);
        var ta = document.getElementById("nota"); if (ta) ta.addEventListener("input", function () { S.marca.nota = ta.value; });
      },
      onBack: function () { return salirSim(pr, S); },
      on: {
        salir: function () { if (salirSim(pr, S) !== false) APP.back(); },
        pick: function (el) { if (S.fase !== "resp") return; S.sel = +el.getAttribute("data-j"); APP.sfx("tap"); APP.rerender(); },
        fijar: function () {
          if (S.sel == null) return;
          var seg = (Date.now() - S.tItem) / 1000;
          var rec = { id: id, resp: S.sel, seg: Math.round(seg) };
          if (likert) { rec.pts = APP.puntosLikert(it, S.sel); rec.ok = APP.extremoOk(it, S.sel); } else { rec.ok = !!it.ops[S.sel].ok; }
          S.items.push(rec); S.fase = "marca"; APP.sfx("swish"); clearInterval(APP._clk); APP.rerender();
          setTimeout(function () { window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }); }, 50);
        },
        seg: function (el) { S.marca.seg = el.getAttribute("data-s"); APP.rerender(); },
        como: function (el) { var s = el.getAttribute("data-s"), i = S.marca.como.indexOf(s); if (i >= 0) S.marca.como.splice(i, 1); else S.marca.como.push(s); APP.rerender(); },
        comp: function (el) { var k = el.getAttribute("data-k"), a = S.marca.comps; if (k === "control") { S.marca.comps = a.indexOf("control") >= 0 ? [] : ["control"]; } else { var i = a.indexOf(k); if (i >= 0) a.splice(i, 1); else { a.push(k); var ci = a.indexOf("control"); if (ci >= 0) a.splice(ci, 1); } } APP.rerender(); },
        sig: function () {
          var rec = S.items[S.items.length - 1];
          rec.marca = { seg: S.marca.seg, como: S.marca.como.slice(), comps: S.marca.comps.slice(), nota: S.marca.nota.trim() };
          registrar(it, rec, likert).forEach(function (lid) { if (S.pend.indexOf(lid) < 0) S.pend.push(lid); });
          if (retroCada) { S.fase = "retro"; APP.sfx(rec.ok ? "ok" : "bad"); APP.rerender(); }
          else avanzar(pr, S);
        },
        next: function () { avanzar(pr, S); },
        paseo: function () { APP.go("paseo", { caso: id, resp: S.items[S.items.length - 1].resp }); }
      } };
  };
  function optBtn(L, t, j, S, ok) {
    var cls = "opt";
    if (S.fase === "resp") { if (S.sel === j) cls += " sel"; }
    else if (S.fase === "retro" && ok != null) { if (ok) cls += " ok"; else if (S.sel === j) cls += " bad"; else cls += " fade"; }
    else if (S.sel === j) cls += " sel"; else cls += " fade";
    return '<button class="' + cls + '" data-act="pick" data-j="' + j + '"' + (S.fase !== "resp" ? " disabled" : "") + '><span class="L">' + L + "</span><span>" + esc(t) + "</span></button>";
  }
  /* Guarda la respuesta y devuelve las láminas que todavía no se han obtenido (se revelan al final). */
  function registrar(it, rec, likert) {
    var p = APP.perfil(), pend = [];
    if (it.pool !== "dia") {
      p.sim.vistos[it.id] = true;
      if (!rec.ok) p.sim.fallados[it.id] = true; else if (p.sim.fallados[it.id]) delete p.sim.fallados[it.id];
    }
    if (likert) {
      var sub = it.ind ? "c:" + it.ind : (it.val ? "v:" + it.val : (it.tipo === "integ" ? "v:control" : "c:control"));
      var ids = lamDeAfirm(it), propia = it.ind ? "c-" + it.ind : it.val;
      pend = ids.filter(function (lid) { return APP.lam.get(lid).lv < 1; });
      // Las láminas del método suben con el extremo; la de la competencia o el valor exige además marcarla bien.
      APP.track({ sub: sub, ok: rec.ok, seg: rec.seg, lam: ids.filter(function (lid) { return lid !== propia && pend.indexOf(lid) < 0; }) });
      if (propia && pend.indexOf(propia) < 0) APP.lam.hit(propia, rec.ok && (!rec.marca || marcadoOk(it, rec.marca.comps || [])));
      var af = p.af[it.id] || (p.af[it.id] = { n: 0, ok: 0 }); af.n++; if (rec.ok) af.ok++; af.last = U.today();
    } else {
      APP.track({ sub: it.sub, ok: rec.ok, seg: rec.seg, lam: it.lam });
    }
    var x = APP.addXP(rec.ok ? 15 : 4);
    if (x.levelUp) APP.celebrarNivel(x.nivel);
    APP.store.save();
    return pend;
  }
  /* ¿El marcado de competencias o valores coincide con lo que mide la afirmación? */
  function marcadoOk(a, comps) {
    var real = a.real.length ? a.real : ["control"];
    return real.every(function (k) { return comps.indexOf(k) >= 0; }) && comps.every(function (k) { return real.indexOf(k) >= 0; });
  }
  APP.marcadoOk = marcadoOk;
  function avanzar(pr, S) {
    S.i++; S.sel = null; S.fase = "resp"; S.tItem = Date.now(); S.marca = { seg: null, como: [], comps: [], nota: "" };
    if (S.i >= pr.ids.length) { S.done = true; return terminarSim(pr, S); }
    APP.sfx("tap"); APP.rerender();
  }
  function salirSim(pr, S) {
    if (S.done || !S.items.length) { clearInterval(APP._clk); return true; }
    APP.sheet('<h2>¿Terminar ahora?</h2><p class="muted">Se guarda lo que respondiste y verás el resultado de ' + (S.items.length === 1 ? "ese punto" : "esos " + S.items.length + " puntos") + '.</p><div class="row"><button class="btn soft grow" data-act="close">Seguir</button><button class="btn dark grow" data-act="si">Terminar</button></div>',
      { si: function () { APP.closeSheet(); clearInterval(APP._clk); S.done = true; terminarSim(pr, S, true); } });
    return false;
  }
  function terminarSim(pr, S) {
    clearInterval(APP._clk);
    var p = APP.perfil(), likert = pr.tipo !== "func";
    if (pr.modo === "dia") { // afirmaciones de la misión: no se guardan como simulacro
      var okd = S.items.filter(function (x) { return x.ok; }).length, completo = S.items.length === pr.ids.length;
      APP.revealLaminas(S.pend, function () {
        APP.toast(okd + " de " + S.items.length + " extremos correctos", "check");
        if (pr.paso != null && completo) APP.pasoHecho(pr.paso); else APP.back();
      });
      return;
    }
    var resumen;
    if (likert) {
      var pts = S.items.reduce(function (a, x) { return a + x.pts; }, 0), max = 4 * S.items.length;
      resumen = Math.round(100 * pts / max) + " % de los puntos";
      if (S.items.length >= 15 && pts / max >= 0.9) APP.celebrarLogro(APP.logro(pr.tipo === "comp" ? "sim-comp" : "sim-integ"));
    } else {
      var ok = S.items.filter(function (x) { return x.ok; }).length;
      resumen = ok + " de " + S.items.length;
      if (S.items.length >= 10 && ok / S.items.length >= 0.8) APP.celebrarLogro(APP.logro("sim-func"));
    }
    var segs = S.items.filter(function (x) { return x.marca && (x.marca.seg === "Seguro" || x.marca.seg === "Lo domino"); });
    var tot = p.sim.intentos.reduce(function (a, x) { return a.concat(x.items); }, []).concat(S.items).filter(function (x) { return x.marca && (x.marca.seg === "Seguro" || x.marca.seg === "Lo domino"); });
    if (tot.length >= 10 && tot.filter(function (x) { return x.ok; }).length / tot.length >= 0.9) APP.celebrarLogro(APP.logro("brujula"));
    p.sim.intentos.push({ tipo: pr.tipo, ini: new Date(S.t0).toISOString(), fin: new Date().toISOString(), items: S.items, resumen: resumen, errores: !!pr.errores });
    APP.store.save();
    APP.sfx("level");
    APP.go("simres", { i: p.sim.intentos.length - 1 }, { replace: true });
    if (S.pend.length) setTimeout(function () { APP.revealLaminas(S.pend); }, 450);
  }

  function retroFuncInline(it, rec) {
    var o = it.ops[rec.resp], k = it.ops.findIndex(function (x) { return x.ok; });
    return '<div class="fb ' + (rec.ok ? "ok" : "bad") + '"><span class="h">' + (rec.ok ? "Correcta." : "No era esa: la clave es la " + LETRAS[k] + ".") + '</span><span class="small">' + esc(o.por) + "</span>" + (rec.ok ? "" : '<span class="small"><b>' + LETRAS[k] + ".</b> " + esc(it.ops[k].por) + "</span>") + '</div><div class="card sunk small"><b>Para llevarte</b><p style="margin-top:4px">' + esc(it.llevar) + "</p></div>";
  }
  function retroLikertInline(a, rec) {
    return '<div class="fb ' + (rec.ok ? "ok" : "bad") + '"><span class="h">' + (rec.ok ? "Extremo correcto." : "Era la " + claveTxt(a) + ".") + '</span><span class="small">Tu respuesta vale ' + rec.pts + " de 4 puntos (estimación).</span></div>" + likertPaseoHTML(a, rec, true);
  }
  function claveTxt(a) { return a.clave === "H" ? "respuesta honesta (A o B)" : a.clave === "D" ? "D (totalmente de acuerdo)" : "A (totalmente en desacuerdo)"; }

  /* =========================================================================
     AFIRMACIONES DE LA MISIÓN (práctica con explicación inmediata)
     ========================================================================= */
  V.likert = function (pr) {
    if (!pr.ids) {
      var p = APP.perfil(), pick = [];
      var elegir = function (tipo, n) {
        var pool = APP.afirmacionesDe(tipo, "dia");
        var nuevos = U.shuffle(pool.filter(function (a) { return !p.af[a.id]; }));
        var fallados = U.shuffle(pool.filter(function (a) { return p.af[a.id] && p.af[a.id].ok < p.af[a.id].n; }));
        var resto = pool.filter(function (a) { return p.af[a.id] && p.af[a.id].ok >= p.af[a.id].n; }).sort(function (x, y) { return (p.af[x.id].last || "") < (p.af[y.id].last || "") ? -1 : 1; });
        return nuevos.concat(fallados, resto).slice(0, n);
      };
      if (p.temas.comp) pick = pick.concat(elegir("comp", p.temas.integ ? 2 : 3));
      if (p.temas.integ) pick = pick.concat(elegir("integ", p.temas.comp ? 1 : 3));
      pr.ids = pick.map(function (a) { return a.id; });
      pr.tipo = "mix"; pr.modo = "dia";
    }
    return V.simplay(pr);
  };

  /* =========================================================================
     RESULTADOS Y DIAGNÓSTICO
     ========================================================================= */
  V.simres = function (pr) {
    var p = APP.perfil(), x = p.sim.intentos[pr.i]; if (!x) return { html: "" };
    var likert = x.tipo !== "func", n = x.items.length;
    var h = '<div class="scr">' + APP.top("Resultado");
    var dur = x.items.reduce(function (a, b) { return a + b.seg; }, 0), prom = n ? dur / n : 0;
    h += '<div class="card stack" style="text-align:center"><p class="tiny">' + esc({ func: "Prueba funcional", comp: "Prueba comportamental", integ: "Prueba de integridad" }[x.tipo]) + '</p><div style="font-size:52px;font-weight:800;line-height:1" class="num">' + esc(grande(x)) + '</div><p class="small muted" style="margin-top:-6px">' + esc(likert ? "de los puntos posibles (estimado)" : "casos correctos") + '</p><div class="row wrap" style="justify-content:center"><span class="chip">' + U.mmss(dur) + ' respondiendo</span><span class="chip">' + U.mmss(prom) + " por " + (likert ? "afirmación" : "caso") + "</span></div>" +
      '<p class="small muted">' + (likert ? "Meta de la prueba: unos 20 segundos por afirmación." : "En la prueba real hay unos 4 minutos por caso funcional, si las 90 afirmaciones toman menos de media hora.") + "</p></div>";
    h += diagnostico(x);
    h += "<h3>Punto por punto</h3><div class=\"stack\">" + x.items.map(function (r, j) {
      var it = likert ? afById(r.id) : casoById(r.id); if (!it) return "";
      var txt = likert ? it.texto : it.enunciado;
      return '<button class="menu-item" data-act="paseo" data-j="' + j + '"><span class="ic" style="background:' + (r.ok ? "var(--ok-bg)" : "var(--bad-bg)") + ";color:" + (r.ok ? "var(--ok)" : "var(--bad)") + '">' + APP.ic(r.ok ? "check" : "x") + '</span><span><b class="small" style="display:block;line-height:1.3">' + esc(txt.length > 90 ? txt.slice(0, 88) + "…" : txt) + "</b><small>" +
        (likert ? "Marcaste " + LETRAS[r.resp] + " · " + r.pts + "/4 · clave " + (it.clave === "H" ? "A o B" : it.clave) : "Marcaste " + LETRAS[r.resp] + " · clave " + LETRAS[it.ops.findIndex(function (o) { return o.ok; })]) + (r.marca ? " · " + esc(r.marca.seg) : "") + "</small></span>" + APP.ic("back", ' width="18" height="18" style="transform:rotate(180deg);opacity:.5"') + "</button>";
    }).join("") + "</div>";
    h += '<p class="tiny">Toca cualquier punto para ver el paseo del experto.</p></div>';
    return { tab: "sim", html: h, on: {
      paseo: function (el) { var j = +el.getAttribute("data-j"), r = x.items[j]; if (likert) APP.go("paseoL", { id: r.id, rec: r }); else APP.go("paseo", { caso: r.id, resp: r.resp, rec: r }); }
    } };
  };

  function grande(x) {
    if (x.tipo === "func") { var ok = x.items.filter(function (r) { return r.ok; }).length; return ok + " de " + x.items.length; }
    var pts = x.items.reduce(function (a, r) { return a + r.pts; }, 0); return Math.round(100 * pts / (4 * Math.max(1, x.items.length))) + " %";
  }
  function diagnostico(x) {
    var likert = x.tipo !== "func", items = x.items, h = '<div class="card stack"><h3>Diagnóstico</h3>';
    var conf = items.filter(function (r) { return r.marca && (r.marca.seg === "Seguro" || r.marca.seg === "Lo domino"); });
    var dud = items.filter(function (r) { return r.marca && (r.marca.seg === "Dudé" || r.marca.seg === "Adiviné"); });
    var frases = [];
    if (!likert) {
      var errs = {}; items.forEach(function (r) { if (!r.ok) { var c = casoById(r.id); var e = c.ops[r.resp].err || "otro"; errs[e] = (errs[e] || 0) + 1; } });
      var top = Object.keys(errs).sort(function (a, b) { return errs[b] - errs[a]; });
      if (!top.length) frases.push("<b>Sin errores.</b> Ahora el reto es hacerlo igual de bien en menos tiempo.");
      top.forEach(function (k) { var E = D.errores[k] || { nombre: "Otro", consejo: "" }; frases.push("<b>" + esc(E.nombre) + "</b> (" + errs[k] + "): " + esc(E.consejo)); });
      var lentos = items.filter(function (r) { return r.seg > 210; });
      if (lentos.length) frases.push("<b>Ritmo:</b> " + lentos.length + " caso" + (lentos.length > 1 ? "s" : "") + " te tomaron más de tres minutos y medio. En la prueba, anota su número y vuelve al final.");
    } else {
      var pat = { costo: 0, falla: 0, virtud: 0, control: 0, comp: 0 }, mezclas = {};
      items.forEach(function (r) {
        var a = afById(r.id); if (!a) return;
        if (!r.ok) {
          if (a.clave === "H") pat.control++;
          else if (a.condTipo === "costo" && a.clave === "D") pat.costo++;
          else if (a.condTipo === "falla") pat.falla++;
          else if (a.virtud) pat.virtud++;
        }
        if (r.marca && r.marca.comps && !marcadoOk(a, r.marca.comps)) {
          var real = a.real.length ? a.real : ["control"];
          var sobra = r.marca.comps.filter(function (k) { return real.indexOf(k) < 0; })[0];
          var falta = real.filter(function (k) { return r.marca.comps.indexOf(k) < 0; })[0];
          pat.comp++;
          var key = (falta || real[0]) + "→" + (sobra || "—");
          mezclas[key] = (mezclas[key] || 0) + 1;
        }
      });
      if (pat.costo) frases.push("<b>Costo leído como falla</b> (" + pat.costo + "): la segunda parte decía lo que cuesta hacer bien la conducta, y la leíste como incumplimiento. Pregúntate: ¿se vence un plazo, se deja a alguien sin atender, se salta un requisito? Si no, es costo.");
      if (pat.falla) frases.push("<b>Falla no vista</b> (" + pat.falla + "): la segunda parte traía un incumplimiento expreso que volteaba la afirmación.");
      if (pat.virtud) frases.push("<b>Virtud aparente</b> (" + pat.virtud + "): una palabra amable escondía la conducta contraria. Pregúntate qué hace la persona, no cómo suena.");
      if (pat.control) frases.push("<b>Control respondido como conducta</b> (" + pat.control + "): la afirmación hablaba de sentimientos o de perfección. Se responde con honestidad: A o B.");
      if (pat.comp) {
        var mz = Object.keys(mezclas).sort(function (a, b) { return mezclas[b] - mezclas[a]; })[0];
        var pr2 = mz.split("→");
        var a0 = pr2[0] === "control" ? "una afirmación de control" : nombreComp(pr2[0]);
        var b0 = pr2[1] === "—" ? null : (pr2[1] === "control" ? "una de control" : nombreComp(pr2[1]));
        frases.push("<b>" + (x.tipo === "integ" ? "Valores confundidos" : "Competencias confundidas") + "</b> (" + pat.comp + "): " + (b0 ? "lo más frecuente fue leer " + esc(a0) + " como " + esc(b0) : "lo más frecuente fue no marcar " + esc(a0)) + ". Abre el paseo de esos puntos: ahí se explica cómo distinguirlas.");
      }
      if (!frases.length) frases.push("<b>Sin errores de extremo.</b> Revisa el marcado de competencias: es lo que te prepara para las afirmaciones más difíciles.");
    }
    var cOk = conf.filter(function (r) { return r.ok; }).length, dOk = dud.filter(function (r) { return r.ok; }).length;
    if (conf.length || dud.length) frases.push("<b>Calibración:</b> " + [conf.length ? "cuando marcaste seguridad acertaste " + cOk + " de " + conf.length : "", dud.length ? (conf.length ? "cuando dudaste, " : "cuando dudaste acertaste ") + dOk + " de " + dud.length : ""].filter(Boolean).join("; ") + "." +
      (conf.length && cOk / conf.length < 0.8 ? " Tu «seguro» todavía no es confiable: antes de fijar, busca la condición que falta." : (dud.length && dOk / dud.length < 0.5 ? " Tu duda te avisa algo: cuando dudes, vuelve al caso." : "")));
    var notas = items.filter(function (r) { return r.marca && r.marca.nota; });
    if (notas.length) frases.push("<b>Tus notas:</b> escribiste " + notas.length + ". Van en el reporte para Claude, que las usa para ajustar los próximos casos.");
    return h + frases.map(function (f) { return '<p class="small">' + f + "</p>"; }).join("") + "</div>";
  }

  /* =========================================================================
     PASEO DEL EXPERTO · funcional
     ========================================================================= */
  function marcar(text, marks, nuevos) {
    // marks: [{s, c, n, nuevo}] → HTML con resaltados, sin solapes
    var ranges = [];
    marks.forEach(function (m) {
      var i = text.indexOf(m.s); if (i < 0) return;
      var r = { a: i, b: i + m.s.length, c: m.c, n: m.n, nuevo: m.nuevo };
      if (!ranges.some(function (x) { return !(r.b <= x.a || r.a >= x.b); })) ranges.push(r);
    });
    ranges.sort(function (x, y) { return x.a - y.a; });
    var out = "", pos = 0;
    ranges.forEach(function (r) {
      out += esc(text.slice(pos, r.a)) + '<span class="mk ' + r.c + (r.nuevo ? " sweep" : " dim") + '">' + esc(text.slice(r.a, r.b)) + "</span>" + (r.nuevo && r.n ? '<span class="note">' + esc(r.n) + "</span>" : "");
      pos = r.b;
    });
    return out + esc(text.slice(pos));
  }
  V.paseo = function (pr) {
    var c = casoById(pr.caso), step = pr.step || 0, N = c.paseo.length + 1, fin = step >= c.paseo.length;
    var marks = [];
    for (var s = 0; s <= Math.min(step, c.paseo.length - 1); s++) (c.paseo[s].m || []).forEach(function (m) { marks.push({ s: m.s, c: m.c, n: m.n, nuevo: s === step }); });
    var focusOps = !fin ? (c.paseo[step].o || []) : [0, 1, 2];
    var h = '<div class="scr full paseo">' + APP.top("Paseo del experto", { close: true });
    h += '<div class="legend"><span class="chip y">Plazos</span><span class="chip b">Actos y hechos</span><span class="chip p">Cifras</span><span class="chip o">Trampas</span><span class="chip g">Lo que decide</span></div>';
    h += '<div class="card stack"><span class="tiny">Caso · ' + esc(D.tecnicas[c.tec] || "") + '</span><div class="paseo-text">' + marcar(c.caso, marks) + '</div><p class="q">' + marcar(c.enunciado, marks) + "</p></div>";
    h += '<div class="opts">' + c.ops.map(function (o, j) {
      var show = focusOps.indexOf(j) >= 0;
      var cls = "opt" + (show ? (o.ok ? " ok" : " bad") : "") + (pr.resp === j ? " sel" : "") + (show ? " focus-op" : "");
      return '<div class="' + cls + '"><span class="L">' + LETRAS[j] + '</span><span>' + marcar(o.t, marks) + (pr.resp === j ? ' <span class="chip" style="font-size:12px;padding:2px 8px">tu respuesta</span>' : "") + (show ? '<br><span class="small muted">' + esc(o.por) + "</span>" : "") + "</span></div>";
    }).join("") + "</div>";
    h += "</div>";
    // Panel del experto: queda fijo abajo mientras el caso se resalta arriba.
    var st = !fin ? c.paseo[step] : null;
    h += '<div class="coach" role="region" aria-label="Explicación del experto"><div class="coach-in">' +
      '<div class="row spread"><span class="k">Paso ' + (step + 1) + " de " + N + '</span><div class="dots">' + Array.apply(null, Array(N)).map(function (_, i) { return '<i class="' + (i === step ? "on" : "") + '"></i>'; }).join("") + "</div></div>" +
      (st ? "<h3>" + esc(st.t) + '</h3><p class="read">' + esc(st.txt) + "</p>"
          : '<h3>Para llevarte</h3><p class="read">' + esc(c.llevar) + '</p><div class="row wrap">' + c.lam.map(function (l) { var L = lamById(l); return '<button class="chip ' + APP.lamColor(L) + '" data-act="lamina" data-id="' + l + '">' + esc(L.t) + "</button>"; }).join("") + "</div>") +
      '</div><div class="row">' + (step > 0 ? '<button class="btn soft grow" data-act="prev">Anterior</button>' : "") + (!fin ? '<button class="btn cta grow" data-act="nx">Siguiente paso</button>' : '<button class="btn cta grow" data-act="back">Listo</button>') + "</div></div>";
    return { tab: false, html: h,
      mount: function (root) {
        APP.sfx(step === 0 && !pr.played ? "flip" : "swish"); pr.played = true;
        var coach = root.querySelector(".coach"), scr = root.querySelector(".scr");
        function ajustar() { if (coach && scr) scr.style.paddingBottom = (coach.offsetHeight + 24) + "px"; }
        ajustar(); setTimeout(ajustar, 60);
        setTimeout(function () {
          var t = root.querySelector(fin ? ".opt.ok" : ".mk.sweep") || root.querySelector(".opt.focus-op");
          if (!t) return;
          var r = t.getBoundingClientRect(), libre = window.innerHeight - (coach ? coach.offsetHeight : 0);
          var y = window.scrollY + r.top - Math.max(70, (libre - r.height) / 2);
          window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
        }, 120);
      },
      on: { nx: function () { APP.go("paseo", Object.assign({}, pr, { step: step + 1 }), { replace: true, keep: true }); }, prev: function () { APP.go("paseo", Object.assign({}, pr, { step: step - 1 }), { replace: true, keep: true }); } } };
  };

  /* =========================================================================
     PASEO DEL EXPERTO · afirmaciones
     ========================================================================= */
  function likertPaseoHTML(a, rec, compact) {
    var ind = a.ind ? D.indicadores[a.ind] : null;
    var marks = [{ s: a.conducta, c: "b", n: "Conducta", nuevo: true }];
    if (a.condicion) marks.push({ s: a.condicion, c: a.condTipo === "falla" ? "p" : (a.condTipo === "costo" ? "g" : "y"), n: a.condTipo === "falla" ? "Falla" : (a.condTipo === "costo" ? "Costo" : "Condición"), nuevo: true });
    if (a.virtud && a.virtud !== a.condicion) marks.push({ s: a.virtud, c: "o", n: "Distrae", nuevo: true });
    var h = '<div class="paseo-step"><span class="k">1 · La conducta</span><p class="paseo-text">' + marcar(a.texto, marks) + "</p><p class=\"small\">" + esc(a.exp.conducta) + "</p>" +
      (ind ? '<p class="tiny">' + esc(D.competencias[ind.comp].nombre) + " · nivel " + ind.nivel + ": " + esc(ind.resumen) + "</p>" : "") +
      (a.val && D.valores[a.val] ? '<p class="tiny">' + esc(D.valores[a.val].nombre) + ": " + esc(D.valores[a.val].def) + "</p>" : "") + "</div>";
    h += '<div class="paseo-step"><span class="k">2 · La condición</span><p class="small">' + esc(a.exp.condicion) + "</p></div>";
    h += '<div class="paseo-step"><span class="k">3 · El extremo</span><p class="small"><b>' + esc(a.exp.extremo) + "</b></p></div>";
    if (a.exp.atractor) h += '<div class="paseo-step"><span class="k">La colisión</span><p class="small">' + esc(a.exp.atractor) + "</p></div>";
    if (rec && rec.marca) {
      var real = a.real.length ? a.real : ["control"];
      var marc = rec.marca.comps || [];
      var bien = marcadoOk(a, marc);
      var sobran = marc.filter(function (k) { return real.indexOf(k) < 0; }), faltan = real.filter(function (k) { return marc.indexOf(k) < 0; });
      var nom = function (k) { return k === "control" ? "ninguna (es de control)" : nombreComp(k); };
      h += '<div class="paseo-step"><span class="k">Tu marcado de ' + (a.tipo === "comp" ? "competencias" : "valores") + '</span>' +
        '<div class="fb ' + (bien ? "ok" : "bad") + '" style="margin:6px 0"><span class="h">' + (bien ? "Marcado exacto" : "Marcado por ajustar") + '</span><span class="small">Marcaste: <b>' + (marc.length ? marc.map(nom).map(esc).join(", ") : "nada") + "</b>. Se mide: <b>" + real.map(nom).map(esc).join(", ") + "</b>.</span></div>" +
        (sobran.length ? '<p class="small">' + sobran.map(function (k) { return k === "control" ? "No es de control: describe una conducta que se puede evaluar." : (k === a.atractor ? "<b>" + esc(nombreComp(k)) + "</b> es justamente " + (a.tipo === "comp" ? "la competencia" : "el valor") + " que distrae en esta afirmación." : "<b>" + esc(nombreComp(k)) + "</b> no es " + (a.tipo === "comp" ? "la que se mide" : "el que se mide") + " aquí."); }).join(" ") + "</p>" : "") +
        (faltan.length ? '<p class="small">' + faltan.map(function (k) { return k === "control" ? "Era de control: no describe una conducta evaluable sino un sentimiento o una perfección." : "Te faltó <b>" + esc(nombreComp(k)) + "</b>."; }).join(" ") + "</p>" : "") +
        '<p class="small"><b>Cómo detectarla:</b> ' + esc(a.exp.detectar) + "</p></div>";
    } else {
      h += '<div class="paseo-step"><span class="k">Cómo detectarla</span><p class="small">' + esc(a.exp.detectar) + "</p></div>";
    }
    return h;
  }
  V.paseoL = function (pr) {
    var a = afById(pr.id), rec = pr.rec;
    var h = '<div class="scr full">' + APP.top("Paseo del experto", { close: true }) +
      '<div class="legend"><span class="chip b">Conducta</span><span class="chip g">Costo</span><span class="chip p">Falla</span><span class="chip o">Distrae</span></div>' +
      '<div class="fb ' + (rec.ok ? "ok" : "bad") + '"><span class="h">' + (rec.ok ? "Extremo correcto" : "La clave era " + esc(claveTxt(a))) + '</span><span class="small">Marcaste ' + LETRAS[rec.resp] + " (" + esc(D.proyectos[0].likert[rec.resp]) + ") · " + rec.pts + " de 4 puntos estimados.</span></div>" +
      likertPaseoHTML(a, rec) + '<p class="tiny">Las claves son criterio de Claude con el método de los tres pasos: la guía no publica claves oficiales.</p><div class="sticky-foot"><button class="btn cta block" data-act="back">Listo</button></div></div>';
    return { tab: false, html: h, mount: function () { APP.sfx("swish"); } };
  };

  /* =========================================================================
     ESTADÍSTICAS Y PRIORIDADES
     ========================================================================= */
  var TIER = { segura: 4, alta: 3, media: 2, baja: 1 };
  APP.prioridades = function () {
    var p = APP.perfil(), u = APP.usuario(), out = [];
    Object.keys(D.subtemas).forEach(function (k) {
      var s = D.subtemas[k]; if (!p.temas[s.tema]) return;
      var dom = APP.dominio(k);
      var fam = APP.gen.FAM_IDS.filter(function (f) { return APP.gen.FAM[f].sub === k; })[0];
      var esc1 = D.escenas.filter(function (e) { return e.lam.some(function (l) { return lamById(l).sub === k; }) && !(p.esc[e.id] && p.esc[e.id].done); })[0];
      var caso = D.casos.filter(function (c) { return c.sub === k; })[0];
      var como = [];
      if (esc1) como.push("ver la escena «" + esc1.titulo + "»");
      como.push("hacer dos rondas de refuerzo de este tema");
      if (caso) como.push("resolver en el simulacro un caso de este tema y recorrer su paseo del experto");
      out.push({ k: k, tipo: "func", nombre: s.nombre, prob: s.prob, dom: dom, porque: s.porque, como: como.join(", luego "), sub: k, fam: fam,
        motivo: "Probabilidad " + D.probTexto[s.prob].toLowerCase() + " de salir" + (dom == null ? " y todavía no lo has practicado." : " y tu dominio va en " + Math.round(dom * 100) + " %.") });
    });
    if (p.temas.comp) u.indicadores.forEach(function (ind) {
      var I = D.indicadores[ind], dom = APP.dominio("c:" + ind), nombre = D.competencias[I.comp].nombre + " · nivel " + I.nivel;
      out.push({ k: "c:" + ind, tipo: "comp", nombre: nombre, prob: "segura", dom: dom, porque: "Está en tus ejes oficiales. Son 60 afirmaciones para tus 10 indicadores: si se reparten parejo, unas seis por indicador (la guía no publica el reparto).", como: "repasar su lámina en el álbum y hacer el simulacro comportamental; en cada error, abre el paseo", sub: "c:" + ind,
        motivo: "Muy probable: está en tus ejes" + (dom == null ? "; aún sin práctica." : "; dominio " + Math.round(dom * 100) + " %.") });
    });
    if (p.temas.integ) Object.keys(D.valores).forEach(function (v) {
      var dom = APP.dominio("v:" + v);
      out.push({ k: "v:" + v, tipo: "integ", nombre: "Integridad · " + D.valores[v].nombre, prob: "segura", dom: dom, porque: "Los cinco valores son los ejes de integridad. Son 30 afirmaciones: si se reparten parejo, unas seis por valor (la guía no publica el reparto).", como: "repasar la lámina del valor y hacer el simulacro de integridad", sub: "v:" + v,
        motivo: "Muy probable" + (dom == null ? "; aún sin práctica." : "; dominio " + Math.round(dom * 100) + " %.") });
    });
    var peso = { func: 1, comp: 0.45, integ: 0.4 };
    out.forEach(function (x) { var d = x.dom == null ? 0.25 : x.dom; x.score = (TIER[x.prob] || 1) * (1 - d) * peso[x.tipo] * (x.tipo === "func" ? 1.2 : 1); });
    return out.filter(function (x) { return x.dom == null || x.dom < 0.8; }).sort(function (a, b) { return b.score - a.score; });
  };
  V.stats = function () {
    var p = APP.perfil(), lista = APP.prioridades();
    var h = '<div class="scr">' + APP.top("Mis estadísticas");
    var primero = lista[0];
    if (primero) h += '<div class="card stack" style="border:2px solid var(--ink)"><p class="tiny">Tu prioridad de hoy</p><h2 style="margin:0">' + esc(primero.nombre) + '</h2><p class="small">' + esc(primero.motivo) + '</p><p class="small"><b>Cómo reforzarlo:</b> ' + esc(primero.como) + ".</p>" + (primero.tipo === "func" ? '<button class="btn cta block" data-act="ref" data-s="' + primero.sub + '">Reforzar ahora</button>' : '<button class="btn cta block" data-act="simk" data-k="' + primero.tipo + '">Ir al simulacro</button>') + "</div>";
    [["func", "Funcional", "65 % del puntaje · eliminatoria"], ["comp", "Comportamental", "15 % del puntaje"], ["integ", "Integridad", "10 % del puntaje"]].forEach(function (t) {
      var items = lista.filter(function (x) { return x.tipo === t[0]; });
      if (!items.length) return;
      h += '<div class="row spread"><h3>' + t[1] + '</h3><span class="tiny">' + t[2] + '</span></div><div class="stack">' + items.map(function (x) {
        return '<div class="prio"><span class="nm">' + esc(x.nombre) + '</span><span class="chip ' + (x.prob === "alta" || x.prob === "segura" ? "p" : x.prob === "media" ? "y" : "") + '">' + esc(D.probTexto[x.prob]) + "</span>" +
          '<div class="bar g"><i style="width:' + (x.dom == null ? 0 : Math.round(x.dom * 100)) + '%"></i></div><span class="how">' + (x.dom == null ? "Sin práctica todavía. " : "Dominio " + Math.round(x.dom * 100) + " %. ") + "Cómo: " + esc(x.como) + ".</span>" +
          (x.tipo === "func" ? '<button class="link" data-act="ref" data-s="' + x.sub + '">Reforzar este tema</button>' : "") + '<button class="link" data-act="porque" data-k="' + x.k + '">¿Por qué esta probabilidad?</button></div>';
      }).join("") + "</div>";
    });
    if (!lista.length) h += '<div class="empty">Vas por encima del 80 % en todo lo que entrenas. Sigue con la misión diaria para que no se oxide.</div>';
    // Calibración y ritmo
    var all = p.sim.intentos.reduce(function (a, x) { return a.concat(x.items.map(function (r) { r._t = x.tipo; return r; })); }, []);
    var seguros = all.filter(function (r) { return r.marca && (r.marca.seg === "Seguro" || r.marca.seg === "Lo domino"); }), dudas = all.filter(function (r) { return r.marca && (r.marca.seg === "Dudé" || r.marca.seg === "Adiviné"); });
    var func = all.filter(function (r) { return r._t === "func"; }), lk = all.filter(function (r) { return r._t !== "func"; });
    var dias = Object.keys(p.dias).sort().slice(-7);
    h += '<div class="card stack"><h3>Calibración y ritmo</h3><div class="kv">' +
      "<span>Aciertos cuando marcas seguridad</span><b>" + (seguros.length ? seguros.filter(function (r) { return r.ok; }).length + "/" + seguros.length : "—") + "</b>" +
      "<span>Aciertos cuando dudas</span><b>" + (dudas.length ? dudas.filter(function (r) { return r.ok; }).length + "/" + dudas.length : "—") + "</b>" +
      "<span>Tiempo promedio por caso funcional</span><b>" + (func.length ? U.mmss(func.reduce(function (a, r) { return a + r.seg; }, 0) / func.length) : "—") + "</b>" +
      "<span>Tiempo promedio por afirmación</span><b>" + (lk.length ? U.mmss(lk.reduce(function (a, r) { return a + r.seg; }, 0) / lk.length) : "—") + "</b>" +
      "<span>Racha más larga</span><b>" + p.racha.max + (p.racha.max === 1 ? " día" : " días") + "</b>" +
      "<span>XP de los últimos 7 días</span><b>" + dias.reduce(function (a, d) { return a + p.dias[d].xp; }, 0) + "</b></div></div>";
    h += '<details class="card"><summary><b>¿Cómo se calcula todo esto?</b></summary><div class="stack small" style="margin-top:10px"><p>El <b>dominio</b> mezcla el nivel de tus láminas de ese tema con tus aciertos más recientes en él.</p><p>La <b>probabilidad</b> es criterio de Claude: mira si el tema está en sus ejes oficiales, si se puede volver juicio situacional y si tiene cifras o excepciones que el operador suele usar. Comportamental e integridad son «muy alta» porque son ejes oficiales. Pero cada afirmación comportamental vale cerca de un cuarto de punto y cada una de integridad un tercio, mientras que un caso funcional vale cerca de un punto. Por eso la prioridad de hoy pondera las dos cosas.</p></div></details>';
    h += "</div>";
    return { tab: "home", html: h, on: {
      ref: function (el) { APP.go("rafaga", { mode: "refuerzo", n: 8, sub: el.getAttribute("data-s") }); },
      simk: function () { APP.go("sim", {}, { reset: true }); },
      porque: function (el) { var x = lista.filter(function (z) { return z.k === el.getAttribute("data-k"); })[0]; APP.sheet("<h2>" + esc(x.nombre) + '</h2><p><span class="chip p">' + esc(D.probTexto[x.prob]) + '</span></p><p class="read">' + esc(x.porque) + '</p><p class="tiny">Criterio de Claude, no dato oficial.</p><button class="btn soft block" data-act="close">Cerrar</button>', {}); }
    } };
  };

  /* =========================================================================
     LOGROS
     ========================================================================= */
  V.logros = function () {
    var p = APP.perfil();
    var h = '<div class="scr">' + APP.top("Logros") + '<div class="grid2">' + APP.logrosDef.map(function (l) {
      var on = !!p.logros[l.id];
      return '<div class="card stack" style="' + (on ? "" : "opacity:.55") + '"><span class="ico" style="width:42px;height:42px;border-radius:14px;display:grid;place-items:center;background:' + (on ? "var(--hl-y)" : "var(--sunken)") + ';color:#13182B">' + APP.ic(on ? "trophy" : "lock") + "</span><b>" + esc(l.t) + '</b><span class="small muted">' + esc(l.d) + "</span></div>";
    }).join("") + "</div></div>";
    return { tab: "home", html: h };
  };

  /* =========================================================================
     INSTALAR
     ========================================================================= */
  window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); APP.installPrompt = e; });
  APP.plataforma = function () {
    var ua = navigator.userAgent || "";
    var ios = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    var android = /Android/.test(ua), samsung = /SamsungBrowser/.test(ua);
    var standalone = (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
    var safari = ios && /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|GSA/.test(ua);
    return { ios: ios, android: android, samsung: samsung, standalone: standalone, safari: safari };
  };
  V.instalar = function () {
    var pl = APP.plataforma(), url = location.origin + location.pathname.replace(/index\.html$/, "");
    var h = '<div class="scr">' + APP.top("Instalar en el celular");
    if (pl.standalone) {
      h += '<div class="card stack"><h2>Ya está instalada</h2><p class="muted">La abriste desde el ícono de tu pantalla de inicio. No tienes que hacer nada más.</p></div>';
    } else if (pl.ios) {
      h += '<p class="lede">En el iPhone se instala desde Safari. No pasa por la App Store, no ocupa casi espacio y se quita como cualquier ícono.</p>' + (pl.safari ? "" : '<div class="card"><b>Primero ábrela en Safari.</b><p class="small">Copia esta dirección y pégala en Safari: <b>' + esc(url) + "</b></p></div>") +
        '<ol class="steps-guide"><li><span>Abajo en Safari toca el botón <b>Compartir</b> <span class="ill">' + APP.ic("share") + '</span>. Si no lo ves, toca primero el botón de los tres puntos <span class="ill">' + APP.ic("dots") + "</span> y ahí aparece <b>Compartir</b>.</span></li>" +
        '<li><span>Desliza hacia abajo en la lista y toca <b>Agregar a inicio</b> <span class="ill">' + APP.ic("plusbox") + "</span>.</span></li>" +
        '<li><span>Si aparece la opción <b>Abrir como app web</b>, déjala encendida. En el nombre deja <b>' + esc(APP.cfg.nombre) + "</b> y toca <b>Agregar</b> arriba a la derecha.</span></li>" +
        "<li><span>Sal de Safari. En tu pantalla de inicio aparece el ícono. Ábrela siempre desde ahí: así funciona sin internet y puede mandarte avisos.</span></li></ol>" +
        '<div class="card sunk small"><b>Para verlo más grande:</b> mantén el dedo sobre un espacio vacío de la pantalla de inicio, toca <b>Editar</b> arriba a la izquierda, luego <b>Personalizar</b> y elige el tamaño <b>Grande</b>. Agranda todos los íconos; el sistema no permite agrandar uno solo.</div>';
    } else if (pl.android) {
      h += '<p class="lede">En el Samsung se instala desde el navegador. No pasa por Play Store ni pide permisos especiales, y se quita como cualquier app.</p>';
      if (APP.installPrompt) h += '<button class="btn cta block" data-act="inst">Instalar ahora</button><p class="tiny" style="text-align:center">Toca el botón y luego «Instalar» en la ventana que aparece.</p>';
      h += '<h3>' + (APP.installPrompt ? "Si el botón no aparece o no funciona" : "Paso a paso") + "</h3>" +
        (pl.samsung ? '<ol class="steps-guide"><li><span>En Samsung Internet toca el botón de menú <span class="ill">' + APP.ic("burger") + "</span> abajo a la derecha.</span></li><li><span>Toca <b>Agregar página a</b> y luego <b>Pantalla de inicio</b>. Si ves el ícono de descarga en la barra de la dirección, también sirve: tócalo.</span></li><li><span>Confirma con <b>Agregar</b>. El ícono aparece en tu pantalla de inicio.</span></li></ol>"
          : '<ol class="steps-guide"><li><span>En Chrome toca los tres puntos <span class="ill">' + APP.ic("menuv") + "</span> arriba a la derecha.</span></li><li><span>Toca <b>Instalar app</b> (en algunos celulares dice <b>Agregar a la pantalla principal</b>).</span></li><li><span>Confirma con <b>Instalar</b>. En unos segundos aparece el ícono en tu pantalla de inicio y en el cajón de aplicaciones.</span></li></ol>") +
        '<div class="card sunk small"><b>Para verlo más grande:</b> mantén el dedo sobre un espacio vacío de la pantalla de inicio, toca <b>Ajustes</b> y en <b>Cuadrícula de la pantalla de inicio</b> elige una con menos íconos (por ejemplo 4 × 5). Todos los íconos se agrandan.</div>';
    } else {
      h += '<p class="lede">Esta app está hecha para el celular. Ábrela desde el iPhone o el Samsung con esta dirección:</p><div class="card" style="text-align:center"><b style="font-size:22px">' + esc(url.replace(/^https?:\/\//, "").replace(/\/$/, "")) + '</b>' + (APP.qr ? '<div style="max-width:220px;margin:12px auto">' + APP.qr + "</div><p class=\"tiny\">O apunta la cámara del celular a este código.</p>" : "") + "</div>";
    }
    h += '<details class="card"><summary><b>¿Es seguro?</b></summary><div class="stack small" style="margin-top:10px"><p>Sí. No es un archivo que se descarga ni pasa por fuera de las tiendas: es una página web que el celular guarda como app. No puede leer tus fotos, contactos ni mensajes, y solo te pedirá un permiso si activas los avisos.</p><p>No afecta tus otras aplicaciones ni el funcionamiento del celular. Para quitarla, mantén el dedo sobre el ícono y elige eliminar.</p></div></details></div>';
    return { tab: APP.perfil() ? "home" : false, html: h, on: { inst: function () { var e = APP.installPrompt; if (!e) return; e.prompt(); e.userChoice.then(function (r) { if (r.outcome === "accepted") APP.toast("Instalada. Búscala en tu pantalla de inicio.", "check"); APP.installPrompt = null; APP.rerender(); }); } } };
  };

  /* =========================================================================
     AVISOS
     ========================================================================= */
  function b64ToU8(s) { var pad = "=".repeat((4 - s.length % 4) % 4), b = (s + pad).replace(/-/g, "+").replace(/_/g, "/"), raw = atob(b), a = new Uint8Array(raw.length); for (var i = 0; i < raw.length; i++) a[i] = raw.charCodeAt(i); return a; }
  V.avisos = function (pr) {
    var pl = APP.plataforma(), st = APP.store.raw(), soporta = "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
    var perm = ("Notification" in window) ? Notification.permission : "no";
    var activo = st.avisos && !st.avisosRoto && perm === "granted";
    var h = '<div class="scr">' + APP.top("Avisos diarios") +
      '<p class="lede">Dos avisos al día en la parte de arriba del celular, como cuando llega un mensaje: uno hacia las <b>6:30 a. m.</b> con tu misión y una pregunta del día, y otro hacia las <b>8:00 p. m.</b> que te dice si tu racha está asegurada o en peligro.</p>';
    if (pl.ios && !pl.standalone) h += '<div class="card stack"><b>Primero instala la app.</b><p class="small">En el iPhone los avisos solo funcionan si la abres desde el ícono de tu pantalla de inicio.</p><button class="btn soft block" data-act="go" data-view="instalar">Cómo instalarla</button></div>';
    else if (!soporta) h += '<div class="card"><b>Este navegador no permite avisos.</b><p class="small">Instala la app en la pantalla de inicio y ábrela desde el ícono.</p></div>';
    else if (!APP.cfg.vapid) h += '<div class="card"><b>Los avisos se activan en la siguiente actualización.</b><p class="small">Claude está preparando el servicio que los envía. Cuando esté listo, aquí aparecerá el botón.</p></div>';
    else if (perm === "denied") h += '<div class="card stack"><b>Los avisos están bloqueados en este celular.</b><p class="small">' + (pl.ios ? "Abre la app <b>Ajustes</b> del iPhone → <b>Notificaciones</b> → busca <b>" + esc(APP.cfg.nombre) + "</b> → enciende <b>Permitir notificaciones</b>. Luego vuelve aquí." : "Mantén el dedo sobre el ícono de la app → toca <b>Información de la app</b> (la «i») → <b>Notificaciones</b> → enciéndelas. Luego vuelve aquí.") + "</p></div>";
    else if (activo && !pr.codigo) h += '<div class="card stack" style="box-shadow:0 0 0 2px var(--ok)"><b>' + APP.ic("check", ' width="18" height="18"') + ' Avisos activados en este celular</b><p class="small">Desde el ' + esc(st.avisos.fecha) + '. Si ya le enviaste el código a Claude, no tienes que hacer nada más.</p><div class="row wrap"><button class="btn soft grow" data-act="probar">Probar un aviso</button><button class="btn line grow" data-act="vercod">Ver el código</button></div></div>';
    else if (!pr.codigo) h += '<button class="btn cta block" data-act="activar">' + (st.avisosRoto ? "Activar los avisos otra vez" : "Activar avisos en este celular") + '</button><p class="tiny" style="text-align:center">El celular te preguntará si permites notificaciones: toca <b>Permitir</b>.</p>';
    if (pr.codigo) h += '<div class="card stack" style="box-shadow:0 0 0 2px var(--hl-y)"><b>Último paso: envíale este código a Claude</b><ol class="small" style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:6px"><li>Toca <b>Copiar</b>.</li><li>Abre la app de Claude (o claude.ai) y entra al chat donde construyeron esta app.</li><li>Mantén el dedo en el cuadro de escribir, toca <b>Pegar</b> y envía.</li></ol><p class="small">Claude lo registra y, unos minutos después, te llega un aviso de bienvenida. Ese aviso confirma que todo quedó bien.</p><div class="kbd-code">' + esc(pr.codigo) + '</div><div class="row"><button class="btn dark grow" data-act="copiar">Copiar</button>' + (navigator.share ? '<button class="btn soft grow" data-act="compartir">Compartir</button>' : "") + "</div></div>";
    h += '<details class="card"><summary><b>¿Y por WhatsApp?</b></summary><p class="small" style="margin-top:8px">No conviene. WhatsApp solo permite mensajes automáticos desde cuentas empresariales verificadas por Meta, con un número aparte, plantillas aprobadas y cobro por mensaje. Los servicios gratuitos que lo hacen por la puerta de atrás convierten tu WhatsApp en un robot: pueden bloquearte el número y dejan tus chats en manos de un tercero. El aviso de la app llega igual de visible, es gratis y sabe cómo vas.</p></details>' +
      '<details class="card"><summary><b>¿Qué datos salen del celular?</b></summary><p class="small" style="margin-top:8px">Solo la «dirección» de tu celular para recibir avisos, y se guarda cifrada. Tu avance, tus respuestas y tus notas nunca salen del celular: el aviso se arma dentro del teléfono con lo que la app ya sabe de ti.</p></details></div>';
    function generar(sub) {
      var j = sub.toJSON();
      var out = { e: j.endpoint, k: j.keys, q: APP.perfil().who, d: APP.plataforma().ios ? "iphone" : "android" };
      st.avisos = { endpoint: j.endpoint, fecha: U.today() }; st.avisosRoto = false; APP.store.save();
      return "AVISO-" + btoa(unescape(encodeURIComponent(JSON.stringify(out))));
    }
    return { tab: "home", html: h, on: {
      activar: function (el) {
        el.disabled = true;
        Notification.requestPermission().then(function (res) {
          if (res !== "granted") { APP.toast("Sin permiso no se pueden enviar avisos"); APP.rerender(); return; }
          return navigator.serviceWorker.ready.then(function (reg) {
            return reg.pushManager.getSubscription().then(function (s) {
              if (s && st.avisosRoto) return s.unsubscribe().then(function () { return null; });
              return s;
            }).then(function (s) { return s || reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64ToU8(APP.cfg.vapid) }); });
          }).then(function (sub) {
            APP.sfx("ok"); APP.go("avisos", { codigo: generar(sub) }, { replace: true });
          });
        }).catch(function (e) { APP.logError(e, "avisos"); APP.toast("No se pudo activar. Ábrela desde el ícono e intenta de nuevo."); APP.rerender(); });
      },
      vercod: function () {
        navigator.serviceWorker.ready.then(function (reg) { return reg.pushManager.getSubscription(); }).then(function (sub) {
          if (!sub) { st.avisosRoto = true; APP.store.save(); APP.rerender(); return; }
          APP.go("avisos", { codigo: generar(sub) }, { replace: true });
        });
      },
      probar: function () {
        navigator.serviceWorker.ready.then(function (reg) {
          return reg.showNotification("Así se ven tus avisos", { body: "Mañana hacia las 6:30 llega tu misión del día. " + APP.u.pick(APP.consejos), icon: "icons/icon-192.png", badge: "icons/badge-96.png", tag: "prueba" });
        }).then(function () { APP.toast("Mira la parte de arriba de tu pantalla", "bell"); }).catch(function (e) { APP.logError(e, "probar aviso"); APP.toast("No se pudo mostrar el aviso de prueba"); });
      },
      copiar: function () { copiar(pr.codigo); },
      compartir: function () { navigator.share({ text: pr.codigo }).catch(function () {}); }
    } };
  };
  function copiar(t) {
    try { navigator.clipboard.writeText(t).then(function () { APP.toast("Copiado", "check"); }, function () { APP.toast("Mantén el dedo sobre el código para copiarlo"); }); } catch (e) { APP.toast("Mantén el dedo sobre el código para copiarlo"); }
  }
  APP.copiar = copiar;

  /* =========================================================================
     COPIA DE SEGURIDAD Y REPORTE PARA CLAUDE
     ========================================================================= */
  V.respaldo = function (pr) {
    var p = APP.perfil();
    var code = "RESPALDO-" + btoa(unescape(encodeURIComponent(JSON.stringify(p))));
    var h = '<div class="scr">' + APP.top("Copia de seguridad") + '<p class="lede">Tu avance vive en este celular. Guarda este código si vas a cambiar de celular o borrar la app: con él recuperas todo.</p>' +
      '<div class="card stack"><b>Tu código</b><div class="kbd-code">' + esc(code.slice(0, 160)) + '…</div><div class="row"><button class="btn dark grow" data-act="copiar">Copiar el código</button>' + (navigator.share ? '<button class="btn soft grow" data-act="compartir">Enviar</button>' : "") + '</div><p class="tiny">Puedes enviártelo por WhatsApp o por correo y guardarlo.</p></div>' +
      '<div class="card stack"><b>Recuperar un avance</b><label class="small" for="imp">Pega aquí un código de copia de seguridad.</label><textarea id="imp" placeholder="RESPALDO-..."></textarea><button class="btn soft block" data-act="importar">Recuperar</button><p class="tiny">Reemplaza el avance de ' + esc(APP.usuario().nombre) + " en este celular.</p></div></div>";
    return { tab: "home", html: h, on: {
      copiar: function () { copiar(code); },
      compartir: function () { navigator.share({ text: code }).catch(function () {}); },
      importar: function () {
        var t = (document.getElementById("imp").value || "").trim().replace(/^RESPALDO-/, "");
        try {
          var obj = JSON.parse(decodeURIComponent(escape(atob(t))));
          if (!obj || obj.v !== 1 || !obj.who) throw new Error("x");
          APP.sheet("<h2>¿Recuperar este avance?</h2><p class=\"muted\">Es de " + esc(D.usuarios[obj.who].nombre) + ", con " + obj.xp + ' XP. Reemplaza el que hay en este celular.</p><div class="row"><button class="btn soft grow" data-act="close">Cancelar</button><button class="btn dark grow" data-act="si">Recuperar</button></div>',
            { si: function () { var s = APP.store.raw(); s.perfiles[obj.who] = obj; s.activo = obj.who; APP.store.save(); APP.closeSheet(); APP.toast("Avance recuperado", "check"); APP.go("home", {}, { reset: true }); } });
        } catch (e) { APP.toast("Ese código no es válido. Revisa que esté completo."); }
      }
    } };
  };
  APP.reporte = function () {
    var p = APP.perfil(), u = APP.usuario(), L = [];
    L.push("REPORTE PARA CLAUDE · " + APP.cfg.nombre + " · versión " + APP.cfg.version);
    L.push("Persona: " + u.nombre + " · fecha: " + U.today() + " · XP: " + p.xp + " (" + APP.nivel(p.xp).nombre + ") · racha: " + p.racha.n + " (máx. " + p.racha.max + ")");
    var dias = Object.keys(p.dias).sort(); L.push("Días con práctica: " + dias.length + " · misiones completas: " + dias.filter(function (d) { return p.dias[d].mision; }).length);
    var tot = APP.lam.conteo(); L.push("Álbum: " + tot.obt + "/" + tot.total + " obtenidas, " + tot.bri + " brillantes, " + tot.dor + " doradas");
    L.push("Escenas vistas: " + D.escenas.filter(function (e) { return p.esc[e.id] && p.esc[e.id].done; }).map(function (e) { return e.id + (p.esc[e.id].ok ? "" : "(falló la comprobación)"); }).join(", "));
    L.push("Dominio por subtema:");
    Object.keys(p.sub).forEach(function (k) { var s = p.sub[k]; L.push("  " + k + ": " + s.ok + " bien / " + s.ko + " mal · últimos " + s.h.join("")); });
    L.push("Familias de casos (nivel de redacción 1-3):");
    Object.keys(p.fam).forEach(function (k) { var f = p.fam[k]; L.push("  " + k + ": " + f.ok + "/" + (f.ok + f.ko) + " · nivel " + f.lvl); });
    L.push("Simulacros:");
    p.sim.intentos.forEach(function (x) {
      L.push("  " + x.tipo + " · " + x.ini.slice(0, 16) + " · " + x.resumen + (x.errores ? " (mis errores)" : ""));
      x.items.forEach(function (r) { L.push("    " + r.id + ": marcó " + LETRAS[r.resp] + (r.ok ? " ✓" : " ✗") + " · " + r.seg + " s" + (r.marca ? " · " + r.marca.seg + (r.marca.como && r.marca.como.length ? " · " + r.marca.como.join("; ") : "") + (r.marca.comps && r.marca.comps.length ? " · competencias: " + r.marca.comps.join("+") : "") + (r.marca.nota ? " · NOTA: " + r.marca.nota : "") : "")); });
    });
    L.push("Afirmaciones de práctica: " + Object.keys(p.af).map(function (k) { return k + " " + p.af[k].ok + "/" + p.af[k].n; }).join(", "));
    L.push("Contrarreloj récord: " + p.records.contrarreloj + " · duelos: " + p.duelos.map(function (d) { return d.code + " " + d.ok + "/" + d.n + " en " + d.seg + " s"; }).join("; "));
    var s = APP.store.raw();
    if (s.errores && s.errores.length) { L.push("Errores de la app:"); s.errores.forEach(function (e) { L.push("  " + e.t.slice(0, 16) + " · " + e.v + " · " + e.donde + " · " + e.msg.split("\n")[0]); }); }
    var pl = APP.plataforma(); L.push("Celular: " + (pl.ios ? "iPhone" : pl.android ? "Android" : "otro") + (pl.standalone ? " · instalada" : " · en el navegador"));
    return L.join("\n");
  };
  V.reporte = function () {
    var txt = APP.reporte();
    var h = '<div class="scr">' + APP.top("Reporte para Claude") + '<p class="lede">Cuando quieras que Claude ajuste la app a lo que más fallas, copia este reporte y pégalo en el chat del proyecto, por ejemplo con «Lee la bitácora de la APP y este reporte».</p>' +
      '<div class="row"><button class="btn cta grow" data-act="copiar">Copiar el reporte</button>' + (navigator.share ? '<button class="btn soft grow" data-act="compartir">Enviar</button>' : "") + '</div><div class="kbd-code" style="max-height:none;white-space:pre-wrap">' + esc(txt) + "</div></div>";
    return { tab: "home", html: h, on: { copiar: function () { copiar(txt); }, compartir: function () { navigator.share({ text: txt }).catch(function () {}); } } };
  };

  /* =========================================================================
     NOMBRE DE LA APP
     ========================================================================= */
  APP.nombres = [
    [["PILAS", "«¡Pilas!»: atento, despierto. Y las pilas se cargan cada día con la misión."], ["FIRME", "Doble sentido: la firmeza de la declaración y la firmeza de quien se prepara."], ["PLAZA", "Lo que se gana en un concurso de méritos: la plaza."], ["TINO", "Tener tino: acertar con criterio, que es lo que mide el juicio situacional."], ["FOGUEO", "El entrenamiento antes de la batalla real."], ["MÉRITO", "El nombre mismo del concurso que van a ganar."]],
    [["ATINA", "Imperativo de atinar: dar en el blanco."], ["RACHA", "Cada día sin fallar suma: la racha es el corazón de la app."], ["PULSO", "Ganarse algo «a pulso»: con esfuerzo propio, día a día."], ["CLAVE", "La respuesta correcta de cada punto, y la llave del examen."], ["PODIO", "Quedar en los primeros puestos de la lista."], ["CIMA", "La meta alta, sin rodeos."]],
    [["JUICIO", "Juicio situacional: el formato de la prueba funcional."], ["PERITO", "El experto que les muestra cómo piensa en cada paseo."], ["SAGAZ", "Quien detecta la trampa antes de caer en ella."], ["AGUDO", "Lectura aguda: ver el dato escondido en el caso."], ["OLFATO", "Olfato para las trampas del operador."], ["CHISPA", "Tener chispa: pensar rápido y bien."]],
    [["DIANA", "Dar en la diana. Y adentro trae escondida la DIAN."], ["TICTAC", "El reloj de la firmeza y la cuenta regresiva al 8 de noviembre."], ["LOGRO", "Cada día, un logro pequeño que suma al grande."], ["VIGÍA", "El que vigila para que ningún plazo se le escape."], ["FARO", "La luz que guía entre tantos datos."], ["FOCO", "Diez minutos de concentración total al día."]],
    [["CORONA", "En Colombia, «coronar» es lograr lo que uno se propuso."], ["DUETO", "Dos que estudian juntos y compiten entre sí."], ["RETO", "El reto diario que engancha."], ["GANA", "Directo: la app para ganar el concurso."], ["CRACK", "Ser un crack: el mejor en lo suyo."], ["ÉPICA", "Una preparación que se recuerda."]]
  ];
  V.nombre = function (pr) {
    var s = APP.store.raw(); s.nombreVotos = s.nombreVotos || {};
    var tanda = pr.tanda || 0, fav = pr.fav;
    var lista = fav ? [].concat.apply([], APP.nombres).filter(function (n) { return s.nombreVotos[n[0]]; }) : APP.nombres[tanda];
    var h = '<div class="scr">' + APP.top("El nombre de la app") + '<p class="lede">' + (APP.cfg.nombreProvisional ? "De 4 a 6 letras: es el nombre que aparece debajo del ícono, así como se ve a la izquierda. Marquen con el corazón los que les gusten; pueden ver más nombres y volver a los anteriores cuando quieran." : "El nombre ya está elegido. Aquí siguen todas las opciones, por si algún día quieren cambiarlo.") + "</p>";
    if (!fav) h += '<div class="row spread"><span class="chip">Tanda ' + (tanda + 1) + " de " + APP.nombres.length + '</span><button class="link" data-act="favs">Ver nuestros favoritos (' + Object.keys(s.nombreVotos).filter(function (k) { return s.nombreVotos[k]; }).length + ")</button></div>";
    else h += '<div class="row spread"><span class="chip p">Sus favoritos</span><button class="link" data-act="tanda" data-t="0">Ver todas las tandas</button></div>';
    h += '<div class="stack">' + (lista.length ? lista.map(function (n) {
      var nom = n[0].charAt(0) + n[0].slice(1).toLowerCase();
      return '<div class="namecard"><div class="hs" aria-hidden="true"><img src="icons/icon-192.png" alt=""><span>' + esc(nom) + '</span></div><div><b style="font-size:18px">' + esc(nom) + '</b><p class="small muted">' + esc(n[1]) + '</p></div><button class="heart' + (s.nombreVotos[n[0]] ? " on" : "") + '" data-act="heart" data-n="' + esc(n[0]) + '" aria-label="Me gusta ' + esc(nom) + '">' + APP.ic("heart", ' width="22" height="22"') + "</button></div>";
    }).join("") : '<div class="empty">Todavía no han marcado favoritos.</div>') + "</div>";
    if (!fav) h += '<div class="row"><button class="btn soft grow" data-act="tanda" data-t="' + Math.max(0, tanda - 1) + '"' + (tanda === 0 ? " disabled" : "") + '>Volver a los anteriores</button><button class="btn dark grow" data-act="tanda" data-t="' + Math.min(APP.nombres.length - 1, tanda + 1) + '"' + (tanda === APP.nombres.length - 1 ? " disabled" : "") + ">Ver otros nombres</button></div>";
    h += (APP.cfg.nombreProvisional ? '<div class="card stack"><b>¿Ya lo eligieron?</b><p class="small">Escríbanle a Claude en el chat: «Elegimos el nombre …». Si ninguno los convence, pídanle otra tanda con la idea que tengan.</p>'
      : '<div class="card stack" style="box-shadow:0 0 0 2px var(--ok)"><b>' + APP.ic("check", ' width="18" height="18"') + ' Eligieron: ' + esc(APP.cfg.nombre) + '</b><p class="small">Si algún día quieren cambiarlo, escríbanle a Claude: «Cambiemos el nombre a …».</p>') +
      (Object.keys(s.nombreVotos).some(function (k) { return s.nombreVotos[k]; }) ? '<button class="btn soft block" data-act="copiarFav">Copiar nuestros favoritos para Claude</button>' : "") + "</div></div>";
    return { tab: APP.perfil() ? "home" : false, html: h, on: {
      heart: function (el) { var n = el.getAttribute("data-n"); s.nombreVotos[n] = !s.nombreVotos[n]; APP.store.save(); APP.sfx(s.nombreVotos[n] ? "ok" : "tap"); APP.rerender(); },
      tanda: function (el) { APP.go("nombre", { tanda: +el.getAttribute("data-t") }, { replace: true }); },
      favs: function () { APP.go("nombre", { fav: true }, { replace: true }); },
      copiarFav: function () { copiar("Nuestros nombres favoritos: " + Object.keys(s.nombreVotos).filter(function (k) { return s.nombreVotos[k]; }).join(", ")); }
    } };
  };

  /* =========================================================================
     TEMAS, PERSONA Y NOVEDADES
     ========================================================================= */
  V.temas = function () {
    var p = APP.perfil(), s = APP.store.raw();
    var h = '<div class="scr">' + APP.top("Temas, tiempo y persona") + "<h3>Proyecto</h3>" +
      '<div class="check on"><span class="bx">' + APP.ic("check", ' width="18" height="18"') + '</span><span><b>' + esc(APP.proyecto().nombre) + '</b><br><span class="small muted">' + esc(APP.proyecto().convocatoria) + "</span></span></div><h3>Temas</h3><div class=\"stack\">" +
      APP.proyecto().temas.map(function (t) { return '<button class="check' + (p.temas[t.id] ? " on" : "") + '" data-act="t" data-t="' + t.id + '"><span class="bx">' + APP.ic("check", ' width="18" height="18"') + "</span><span><b>" + esc(t.nombre) + "</b></span></button>"; }).join("") + "</div>" +
      '<h3>Minutos al día</h3><div class="row wrap">' + [10, 15, 20].map(function (m) { return '<button class="chip pick' + (p.meta === m ? " on" : "") + '" data-act="meta" data-m="' + m + '">' + m + " minutos</button>"; }).join("") + "</div>" +
      '<h3>Persona</h3><div class="who">' + ["laura", "juandavid"].map(function (w) { var u = D.usuarios[w]; return '<button data-act="who" data-w="' + w + '" style="' + (p.who === w ? "border-color:var(--ink)" : "") + '"><span class="av" style="background:' + (w === "laura" ? "var(--hl-p)" : "var(--hl-b)") + '">' + u.nombre.charAt(0) + "</span><b>" + esc(u.nombre) + "</b><small>" + (p.who === w ? "Activa" : (s.perfiles[w] ? "Cambiar" : "Crear perfil")) + "</small></button>"; }).join("") + "</div>" +
      '<p class="tiny">Los cambios de temas se aplican desde la misión de mañana.</p></div>';
    return { tab: "home", html: h, on: {
      t: function (el) { var k = el.getAttribute("data-t"); p.temas[k] = !p.temas[k]; if (!Object.keys(p.temas).some(function (z) { return p.temas[z]; })) { p.temas[k] = true; APP.toast("Debe quedar al menos un tema"); } APP.store.save(); APP.rerender(); },
      meta: function (el) { p.meta = +el.getAttribute("data-m"); APP.store.save(); APP.rerender(); },
      who: function (el) { var w = el.getAttribute("data-w"); if (w === p.who) return; var np = APP.setPerfil(w); if (!np.onboard) { APP.go("onb", { step: 2, draft: { who: w, temas: { "m06-1": true, "m06-2": true, "m06-3": true, comp: true, integ: true }, meta: 15 } }, { reset: true }); return; } APP.toast("Ahora entrena " + D.usuarios[w].nombre); APP.go("home", {}, { reset: true }); }
    } };
  };
  APP.novedades = [
    { v: "2026-10-22.2", t: "Ya se llama Mérito", d: ["Laura y Juan David eligieron el nombre: Mérito. Aparece en la app, en el ícono de los celulares Android y en los avisos.", "En el iPhone, el nombre debajo del ícono es el que se escribió al instalar.", "Ajustes menores en la pantalla de avisos y en las explicaciones de Mis estadísticas."] },
    { v: "2026-10-22.1", t: "Primera versión", d: ["Capítulos 1 a 3 del M06: tres mapas, quince escenas, 39 láminas funcionales y un generador de casos gemelos con 11 familias de reglas.", "Simulacro funcional con 12 casos inéditos en el formato DIAN 2676 (caso, enunciado y tres opciones), marcado extra y paseo del experto.", "Simulacros comportamental y de integridad en bloques separados: 70 afirmaciones inéditas (46 de simulacro y 24 de práctica diaria), con marcado de competencias o valores y colisiones.", "Misión diaria, racha, comodines, cofre, álbum de 62 láminas por persona, logros, duelo de pareja, avisos diarios y estadísticas con prioridades."] }
  ];
  V.novedades = function () {
    var h = '<div class="scr">' + APP.top("Novedades") + APP.novedades.map(function (n) { return '<div class="card stack"><div class="row spread"><b>' + esc(n.t) + '</b><span class="tiny">' + esc(n.v) + "</span></div><ul class=\"small\" style=\"margin:0;padding-left:18px;display:flex;flex-direction:column;gap:6px\">" + n.d.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>"; }).join("") +
      '<p class="tiny">La app se actualiza sola cuando la abres con internet. Si hay una versión nueva, aparece un aviso verde para aplicarla.</p></div>';
    return { tab: "home", html: h };
  };

  /* =========================================================================
     DUELO DE PAREJA
     ========================================================================= */
  var ALF = "ACDEFGHJKLMNPQRTUVWXY3479";
  function codeFromSeed(n) { var s = ""; for (var i = 0; i < 4; i++) { s += ALF[n % ALF.length]; n = Math.floor(n / ALF.length); } return s; }
  function seedFromCode(c) { c = c.toUpperCase(); var n = 0; for (var i = c.length - 1; i >= 0; i--) { var k = ALF.indexOf(c[i]); if (k < 0) return null; n = n * ALF.length + k; } return n * 7919 + 17; }
  V.duelo = function () {
    var p = APP.perfil(), otro = p.who === "laura" ? "Juan David" : "Laura";
    var h = '<div class="scr">' + APP.top("Duelo de pareja") + '<p class="lede">Los dos responden los mismos diez casos. Gana quien acierte más; si empatan, quien tarde menos. Así se retan sin necesidad de internet.</p>' +
      '<div class="card stack"><b>Crear un duelo</b><p class="small">Te da un código de cuatro letras. Juegas tú y se lo dices a ' + esc(otro) + ".</p><button class=\"btn cta block\" data-act=\"crear\">Crear y jugar</button></div>" +
      '<div class="card stack"><b>Unirme a un duelo</b><label class="small" for="cod">Escribe el código que te dieron.</label><input type="text" id="cod" maxlength="4" autocapitalize="characters" autocomplete="off" style="text-transform:uppercase;font-size:24px;letter-spacing:.3em;text-align:center"><button class="btn dark block" data-act="unir">Jugar</button></div>';
    if (p.duelos.length) h += '<h3>Mis duelos</h3><div class="stack">' + p.duelos.slice(-8).reverse().map(function (d) { return '<div class="card row"><b class="grow">Código ' + esc(d.code) + '</b><span class="chip num">' + d.ok + "/" + d.n + '</span><span class="chip num">' + U.mmss(d.seg) + "</span></div>"; }).join("") + "</div>";
    h += "</div>";
    return { tab: "home", html: h, on: {
      crear: function () { var n = Math.floor(Math.random() * Math.pow(ALF.length, 4)); var code = codeFromSeed(n); APP.sheet('<div class="stack" style="text-align:center"><p class="tiny">Código del duelo</p><div style="font-size:48px;font-weight:800;letter-spacing:.2em">' + code + '</div><p class="muted">Díselo a ' + esc(otro) + '. Cuando estés listo, empieza.</p><button class="btn cta block" data-act="jugar">Empezar</button></div>', { jugar: function () { APP.closeSheet(); APP.go("rafaga", { mode: "duelo", n: 10, seed: seedFromCode(code), code: code }); } }); },
      unir: function () { var c = (document.getElementById("cod").value || "").trim().toUpperCase(); var sd = c.length === 4 ? seedFromCode(c) : null; if (sd == null) { APP.toast("El código tiene cuatro letras o números"); return; } APP.go("rafaga", { mode: "duelo", n: 10, seed: sd, code: c }); }
    } };
  };
})();


/* ===== src/ui/boot.js ===== */
/* Arranque: primera pantalla, actualizaciones automáticas, cambio de día y estado de los avisos. */
var APP = window.APP || (window.APP = {});

(function () {
  "use strict";
  var U = APP.u, D = APP.data;
  var reg = null, recargando = false, t0 = Date.now(), diaActual = U.today();
  var EN_CURSO = ["rafaga", "simplay", "likert", "escena", "paseo", "paseoL", "onb"];

  /* ¿Se puede recargar sin interrumpir? Solo en pantallas de consulta y si no hay una hoja abierta. */
  function seguroRecargar() {
    var c = APP.current && APP.current();
    if (document.querySelector(".veil")) return false;
    if (c && c.name === "onb") return !c.params || !c.params.step;
    return !c || EN_CURSO.indexOf(c.name) < 0;
  }

  /* ---------------- Actualizaciones ---------------- */
  function aplicar(w) {
    if (!w) return;
    try { w.postMessage({ tipo: "SKIP_WAITING" }); } catch (e) {}
    setTimeout(function () { if (!recargando) { recargando = true; location.reload(); } }, 5000);
  }
  function barra(w) {
    // Recién abierta la app (o recién vuelta al frente) y sin nada en curso: se actualiza sola.
    if (Date.now() - t0 < 12000 && seguroRecargar()) {
      APP.toast("Actualizando a la versión nueva…", "refresh");
      aplicar(w);
      return;
    }
    if (document.querySelector(".update-bar")) return;
    var b = document.createElement("div");
    b.className = "update-bar"; b.setAttribute("role", "status");
    b.innerHTML = '<span class="grow">Hay una versión nueva de la app.</span><button class="btn dark" type="button">Actualizar</button>';
    b.querySelector("button").addEventListener("click", function () {
      this.disabled = true; b.querySelector("span").textContent = "Actualizando… tu avance no se pierde.";
      aplicar(w);
    });
    document.body.appendChild(b);
  }
  function registrarSW() {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("sw.js").then(function (r) {
      reg = r;
      if (r.waiting && navigator.serviceWorker.controller) barra(r.waiting);
      r.addEventListener("updatefound", function () {
        var nw = r.installing; if (!nw) return;
        nw.addEventListener("statechange", function () {
          if (nw.state === "installed" && navigator.serviceWorker.controller) barra(nw);
        });
      });
      setInterval(function () { r.update().catch(function () {}); }, 30 * 60 * 1000);
      revisarAvisos();
    }).catch(function (e) { APP.logError(e, "service worker"); });
    navigator.serviceWorker.addEventListener("controllerchange", function () {
      if (recargando) return; recargando = true; location.reload();
    });
  }
  APP.buscarActualizacion = function () {
    t0 = Date.now();
    if (reg) return reg.update().then(function () { return !!(reg.installing || reg.waiting); }).catch(function () { return false; });
    return Promise.resolve(false);
  };

  /* ---------------- Novedades después de actualizar ---------------- */
  function novedades(desde) {
    var nuevas = (APP.novedades || []).filter(function (n) { return n.v > desde; });
    if (!nuevas.length) return;
    APP.sheet('<p class="tiny">La app se actualizó sola · versión ' + U.esc(APP.cfg.version) + "</p><h2>Lo nuevo</h2>" + nuevas.map(function (n) {
      return '<div class="card stack"><b>' + U.esc(n.t) + '</b><ul class="small" style="margin:0;padding-left:18px;display:flex;flex-direction:column;gap:6px">' + n.d.map(function (x) { return "<li>" + U.esc(x) + "</li>"; }).join("") + "</ul></div>";
    }).join("") + '<button class="btn cta block" data-act="close">Seguir</button>', {});
  }

  /* ---------------- Avisos: ¿se desconectaron? ---------------- */
  function revisarAvisos() {
    var s = APP.store.raw();
    if (!s.avisos || !reg || !reg.pushManager) return;
    reg.pushManager.getSubscription().then(function (sub) {
      var roto = !sub || sub.endpoint !== s.avisos.endpoint || (window.Notification && Notification.permission !== "granted");
      if (roto !== !!s.avisosRoto) { s.avisosRoto = roto; APP.store.save(); var c = APP.current(); if (c && c.name === "home") APP.rerender(); }
    }).catch(function () {});
  }

  /* ---------------- Cambio de día ---------------- */
  function revisarDia() {
    var hoy = U.today();
    if (hoy === diaActual) return;
    diaActual = hoy;
    var c = APP.current();
    if (c && c.name === "home") APP.go("home", {}, { reset: true });
  }

  /* ---------------- Inicio ---------------- */
  function start() {
    var s = APP.store.load(), pl = APP.plataforma();
    if (pl.standalone && !s.instalado) { s.instalado = true; APP.store.save(); }
    var p = APP.perfil();
    if (!p || !p.onboard) APP.go("onb", { step: 0 }, { reset: true });
    else APP.go("home", {}, { reset: true });
    try { history.replaceState({ d: 1 }, ""); } catch (e) {}
    var ult = s.ultVersion;
    if (p && p.onboard && ult && ult !== APP.cfg.version) setTimeout(function () { novedades(ult); }, 700);
    if (s.ultVersion !== APP.cfg.version) { s.ultVersion = APP.cfg.version; APP.store.save(); }
    APP.mirror();
    registrarSW();
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState !== "visible") return;
      revisarDia();
      t0 = Date.now();
      if (reg) reg.update().catch(function () {});
      revisarAvisos();
    });
    window.addEventListener("error", function (e) { APP.logError(e.error || e.message, "global"); });
    window.addEventListener("unhandledrejection", function (e) { APP.logError(e.reason, "promesa"); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();


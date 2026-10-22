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

/* Mérito · versión 2026-10-30.2 · entrenamiento DIAN 2676 de Laura y Juan David. Hecha con Claude. */
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
      { id: "m05-2", tipo: "funcional", nombre: "Tres niveles y quién manda en cada uno", corto: "Niveles", denso: true,
        subtemas: ["s-niveles", "s-delega", "s-conflicto"] },
      { id: "m05-3", tipo: "funcional", nombre: "Quién decide el recurso: cuantía, lugar y excepciones", corto: "Quién decide", denso: true,
        subtemas: ["s-escalon", "s-capital", "s-excrec"] },
      { id: "m05-4", tipo: "funcional", nombre: "La voz oficial: doctrina y representación", corto: "Doctrina", denso: false,
        subtemas: ["s-doctrina", "s-repres"] },
      { id: "m07-1", tipo: "funcional", nombre: "Tres maneras de liquidar: aritmética, revisión y aforo", corto: "Liquidar", denso: false,
        subtemas: ["s-aritm", "s-rutas"] },
      { id: "m07-2", tipo: "funcional", nombre: "El requerimiento especial: responder, ampliar y la cuarta parte", corto: "Requerimiento", denso: true,
        subtemas: ["s-respuesta", "s-cuarta"] },
      { id: "m07-3", tipo: "funcional", nombre: "La liquidación oficial de revisión: seis meses, límites y la mitad", corto: "Revisión", denso: true,
        subtemas: ["s-seismeses", "s-mitad"] },
      { id: "m07-4", tipo: "funcional", nombre: "El que no declara: emplazamiento, sanción y aforo", corto: "No declara", denso: true,
        subtemas: ["s-extemp", "s-sancnodecl", "s-aforo"] },
      { id: "m07-5", tipo: "funcional", nombre: "El recurso de reconsideración", corto: "Reconsideración", denso: true,
        subtemas: ["s-recurso", "s-requisitos", "s-silencio"] },
      { id: "m07-6", tipo: "funcional", nombre: "La revocatoria directa", corto: "Revocatoria", denso: false,
        subtemas: ["s-revoc"] },
      { id: "comp", tipo: "comportamental", nombre: "Competencias comportamentales", corto: "Comportamental", denso: false, subtemas: [] },
      { id: "integ", tipo: "integridad", nombre: "Integridad", corto: "Integridad", denso: false, subtemas: [] }
    ]
  }
];

/* Probabilidad de que el subtema aparezca en la prueba: criterio de Claude.
   alta = casi seguro que aparece en al menos un caso; media = puede aparecer; baja = poco probable o solo como distractor. */
APP.data.modulos = { M05: "M05 · La DIAN por dentro", M06: "M06 · Ruta tributaria 1", M07: "M07 · Ruta tributaria 2" };

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
                    porque: "Requisitos que se acumulan: basta que falte uno para volver a la regla general." },
  /* M05 · La DIAN por dentro (capítulos 2 a 4), desde el 30-oct-2026 */
  "s-niveles":   { tema: "m05-2", nombre: "Los tres niveles y las piezas que se prestan para trampa", prob: "media",
                   porque: "Tres datos de estructura suelen volverse distractores: Tributación Internacional en el despacho del director, Grandes Contribuyentes sin geografía y el Comité que solo propone." },
  "s-delega":    { tema: "m05-2", nombre: "Quién firma, cómo se delega, quién responde y quién practica pruebas", prob: "alta",
                   porque: "Decide la validez de los actos, y tiene tres reglas que se confunden entre sí y una excepción clásica (el contador en la inspección contable)." },
  "s-conflicto": { tema: "m05-2", nombre: "Conflictos de competencia dentro y fuera de la DIAN", prob: "media",
                   porque: "Mezcla el Decreto 1742 con el CPACA, que ya estudiaron: material natural para la trampa de la regla vecina." },
  "s-escalon":   { tema: "m05-3", nombre: "Los tres escalones por cuantía (2.000 y 20.000 UVT)", prob: "alta",
                   porque: "Es aritmética con umbrales: el operador puede dar la cuantía en pesos o separar impuesto y sanción." },
  "s-capital":   { tema: "m05-3", nombre: "La seccional de la capital, con nombres propios", prob: "media",
                   porque: "Lista larga con casos raros (Puerto Asís a Cali, Girardot a Bogotá, impuestos y aduanas partidos) que se prestan para distractores." },
  "s-excrec":    { tema: "m05-3", nombre: "Excepciones: mercancía aprehendida, garantía, avocación, revocatoria y acumulación", prob: "alta",
                   porque: "Son la puerta de la técnica favorita del operador: la excepción que desplaza a la regla general de cuantía." },
  "s-doctrina":  { tema: "m05-4", nombre: "Doctrina: general, obligatoria si está publicada, y su reconsideración", prob: "alta",
                   porque: "Toca el día a día del gestor: qué hacer con un concepto que no comparte y cómo responder una consulta concreta." },
  "s-repres":    { tema: "m05-4", nombre: "Quién defiende a la DIAN: Representación Externa y Asuntos Penales", prob: "media",
                   porque: "Dos subdirecciones con funciones vecinas (comité, conciliaciones, preacuerdos) que el operador puede intercambiar." },
  /* M07 · Ruta tributaria 2, desde el 30-oct-2026. Probabilidades según el triaje de la lección («se domina» = alta). */
  "s-aritm":      { tema: "m07-1", nombre: "Corrección aritmética: qué es, dos años y el 30 %", prob: "media",
                    porque: "Sus dos años desde la presentación se cruzan con los tres años desde el vencimiento del requerimiento especial: trampa natural." },
  "s-rutas":      { tema: "m07-1", nombre: "Qué camino tiene la DIAN y quién firma", prob: "media",
                    porque: "Elegir la ruta correcta es el primer paso de cualquier caso; y el parágrafo del art. 691 se presta para distractor." },
  "s-respuesta":  { tema: "m07-2", nombre: "Responder y ampliar el requerimiento especial", prob: "alta",
                    porque: "Tres plazos de tres meses que corren desde puntos distintos: el operador cambia el punto de partida." },
  "s-cuarta":     { tema: "m07-2", nombre: "La corrección provocada: la cuarta parte y sus cuatro requisitos", prob: "alta",
                    porque: "Es la cifra más rentable del módulo y el operador suele quitar un requisito." },
  "s-seismeses":  { tema: "m07-3", nombre: "Seis meses para la liquidación de revisión y sus pausas", prob: "alta",
                    porque: "Cálculo de fechas con un acto anterior que mueve el reloj: el tipo de caso que más falló en M06." },
  "s-mitad":      { tema: "m07-3", nombre: "Solo lo propuesto, el segundo reloj y la mitad", prob: "alta",
                    porque: "Tres reglas cortas que deciden casos: art. 711, art. 714 y art. 713." },
  "s-extemp":     { tema: "m07-4", nombre: "El emplazamiento previo duplica el precio del retardo", prob: "alta",
                    porque: "Dos tarifas y dos topes vecinos (arts. 641 y 642): material perfecto para el distractor." },
  "s-sancnodecl": { tema: "m07-4", nombre: "La sanción por no declarar, su mitad y su piso", prob: "alta",
                    porque: "Bases alternativas, tarifa por impuesto y una rebaja con piso: varios puntos donde equivocarse." },
  "s-aforo":      { tema: "m07-4", nombre: "Aforo y caducidad: cinco años", prob: "media",
                    porque: "Cinco años frente a los tres del requerimiento especial y los dos de la corrección aritmética." },
  "s-recurso":    { tema: "m07-5", nombre: "Un recurso, dos meses, y la puerta directa al juez", prob: "alta",
                    porque: "Es el choque con el CPACA que ustedes ya estudiaron: el operador pone palabras del CPACA en un caso tributario." },
  "s-requisitos": { tema: "m07-5", nombre: "Requisitos del recurso, agente oficioso e inadmisión", prob: "media",
                    porque: "El agente oficioso abogado, la ratificación y el requisito inexequible son trampas clásicas." },
  "s-silencio":   { tema: "m07-5", nombre: "Un año para resolver y el silencio positivo", prob: "alta",
                    porque: "Silencio positivo frente al negativo del CPACA, con la pausa de la inspección." },
  "s-revoc":      { tema: "m07-6", nombre: "La revocatoria directa en el Estatuto", prob: "alta",
                    porque: "Tres diferencias con el CPACA (procedencia, oportunidad y silencio) en un solo tema." }
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
  { id: "p8", nombre: "Los valores del Código", tema: "integ", tipo: "integridad", color: "g" },
  { id: "p9", nombre: "Tres niveles y quién manda", tema: "m05-2", tipo: "funcional", color: "b" },
  { id: "p10", nombre: "Quién decide el recurso", tema: "m05-3", tipo: "funcional", color: "p" },
  { id: "p11", nombre: "La voz oficial de la entidad", tema: "m05-4", tipo: "funcional", color: "g" },
  { id: "p12", nombre: "Tres maneras de liquidar", tema: "m07-1", tipo: "funcional", color: "y" },
  { id: "p13", nombre: "El requerimiento especial", tema: "m07-2", tipo: "funcional", color: "b" },
  { id: "p14", nombre: "La liquidación de revisión", tema: "m07-3", tipo: "funcional", color: "o" },
  { id: "p15", nombre: "El que no declara", tema: "m07-4", tipo: "funcional", color: "p" },
  { id: "p16", nombre: "El recurso de reconsideración", tema: "m07-5", tipo: "funcional", color: "g" },
  { id: "p17", nombre: "La revocatoria directa", tema: "m07-6", tipo: "funcional", color: "b" }
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
    src: "ET, art. 579-2.", tri: "reconoce", num: ["1 día"] },
  { id: "f03", pag: "p1", sub: "s-nopres", t: "Sanear con el 2 %",
    q: "¿Cómo se sanea una declaración no presentada por lugar, identificación o firma (literales a, b y d)?",
    a: "Por el procedimiento de corrección del art. 588, liquidando el 2 % de la sanción de extemporaneidad del art. 641, sin pasar de 1.300 UVT. Solo mientras no se haya notificado sanción por no declarar. El literal c no está en esa lista.",
    por: "Lugar, identificación y firma son fallas de forma: se arreglan con una multa pequeña, el 2 % de lo que costaría haber declarado tarde.",
    trampa: "Si ya le notificaron la sanción por no declarar, esta puerta se cerró. Y si faltan las bases gravables (literal c), el 2 % no sirve.",
    src: "ET, art. 588, parágrafo 2.", tri: "domina", num: ["2 %", "1.300 UVT"] },
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
    a: "Si la declaración se presentó antes del vencimiento del plazo y el pago total se hace a más tardar dentro de los dos meses siguientes al vencimiento, con intereses de mora. En todo caso, mientras no la presente de nuevo con el pago, la declaración inicial sirve de título para el cobro coactivo, aunque el sistema la marque como ineficaz.",
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
    src: "ET, art. 588, parágrafo 1.", tri: "domina", num: [] },
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
    a: "No. El texto anterior a la Ley 1819 de 2016 exigía una solicitud previa y una liquidación oficial de corrección dentro de seis meses. Desde esa ley basta presentar la declaración dentro del año.",
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
    src: "Ley 2010 de 2019, art. 117; ET, art. 714; CE, unificación 2021CE-SUJ-4-001.", tri: "domina", num: ["5 años", "6 años (texto del 714)"] },
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
    trampa: "Según la DIAN, los 71 UVT se miden en el impuesto del año anterior, el de comparación, no en el del año que se declara. Es doctrina oficial, no texto literal de la ley.",
    src: "ET, art. 689-3, incisos 3, 4 y 6, y parágrafos 1, 2 y 3; DIAN, Concepto 404 de 2026 (sobre los 71 UVT).", tri: "reconoce", num: ["71 UVT"] },
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
    por: "Ninguna convierte la falta en pauta: la conducta sigue siendo la del «lo que no hago».", trampa: "La afirmación con «aunque» más un costo es otra cosa: describe una pauta que cuesta cumplir, y va a D.", src: "Código de Integridad DIAN, v3; lecciones del Plan DIAN Exprés.", tri: "domina" },
  /* ================= Actualización M05 (capítulos 2 a 4) · 30-oct-2026 =================
     Fuente: lección DIAN EXPRÉS M05, que leyó el Decreto 1742 de 2020, el ET (art. 560, con sus notas de vigencia),
     la Ley 2010 de 2019 (art. 131, con la C-514 de 2019) y la Resolución DIAN 000238 de 2025 (UVT 2026). */

  /* ---------------- Página 9 · Tres niveles y quién manda ---------------- */
  { id: "f40", pag: "p9", sub: "s-niveles", t: "Tres niveles",
    q: "¿En qué niveles funciona la DIAN y qué hay en el central?",
    a: "Central, local y delegado. En el central: la Dirección General con cuatro oficinas (Control Interno, Seguridad de la Información, Comunicaciones Institucionales y Tributación Internacional), ocho direcciones de gestión, la Dirección Operativa de Grandes Contribuyentes, el Defensor del Contribuyente y del Usuario Aduanero y el Comité Institucional Estratégico.",
    por: "Uno fija el rumbo, otro lo ejecuta en el territorio y el delegado llega donde la actividad lo pide.",
    trampa: "El nivel delegado no está fijo en el decreto: lo autoriza el director general por resolución.",
    src: "Decreto 1742 de 2020, arts. 4 y 5.", tri: "reconoce", num: ["4 oficinas", "8 direcciones de gestión"] },
  { id: "f41", pag: "p9", sub: "s-niveles", t: "Tributación Internacional",
    q: "¿Quién es la «autoridad competente» para el intercambio internacional de información y el procedimiento de mutuo acuerdo?",
    a: "La Oficina de Tributación Internacional, del despacho del director general. También lleva los acuerdos anticipados de precios de transferencia. Una solicitud de una administración extranjera no la responde una seccional: se canaliza hacia ella.",
    por: "Lo que compromete al país frente a otro Estado se maneja arriba, en un solo punto.",
    trampa: "No está en la Dirección de Gestión de Fiscalización, aunque el tema suene a fiscalización.",
    src: "Decreto 1742 de 2020, arts. 5 y 12.", tri: "domina", num: [] },
  { id: "f42", pag: "p9", sub: "s-niveles", t: "Grandes contribuyentes, sin geografía",
    q: "¿Quién administra los impuestos de un gran contribuyente con domicilio en Pereira?",
    a: "La Dirección Operativa de Grandes Contribuyentes, del nivel central, «sin consideración de su ubicación geográfica». No la seccional de Pereira. Esa dirección también proyecta, para la firma del director general, la resolución que califica o excluye a los grandes contribuyentes.",
    por: "Al gran contribuyente se le mira como uno solo en todo el país.",
    trampa: "El domicilio no manda. Y si lo excluyen de la calificación, vuelve a la seccional de su jurisdicción.",
    src: "Decreto 1742 de 2020, art. 63.", tri: "domina", num: [] },
  { id: "f43", pag: "p9", sub: "s-niveles", t: "El Comité solo asesora",
    q: "¿Quién aprueba el Plan Estratégico de la DIAN? ¿Qué aprueba el Comité Institucional Estratégico?",
    a: "El plan lo aprueba el director general. El comité lo propone «para su aprobación» y le hace seguimiento. Sí aprueba ciertas políticas de gestión: la de seguridad de la información, la archivística y la de talento humano. Lo preside el director general; lo integran los directores de gestión y el jefe de la Oficina de Seguridad de la Información; su secretaría técnica es la Dirección de Gestión Corporativa.",
    por: "El comité reúne a los que saben; el que decide el rumbo es el director.",
    trampa: "«Estratégico» suena a quien aprueba el plan estratégico: solo lo propone.",
    src: "Decreto 1742 de 2020, art. 77.", tri: "domina", num: [] },
  { id: "f44", pag: "p9", sub: "s-niveles", t: "45 seccionales y las delegadas",
    q: "¿Cuántas seccionales hay, de qué clase, y quién crea las delegadas?",
    a: "45: 6 de impuestos (Barranquilla, Bogotá, Cali, Cartagena, Cúcuta y Medellín), 7 de aduanas (esas seis más Bogotá-Aeropuerto El Dorado) y 32 de impuestos y aduanas. Son de tipo I, II o III, y el director general puede reclasificarlas con acto motivado. Las delegadas, permanentes o transitorias, las autoriza el director general por resolución, previa disponibilidad presupuestal.",
    por: "Donde hay mucho movimiento se separan impuestos y aduanas; en el resto, una sola seccional hace las dos cosas.",
    trampa: "El director seccional es superior de la delegada, pero no la crea.",
    src: "Decreto 1742 de 2020, arts. 6 y 7.", tri: "reconoce", num: ["45", "6 + 7 + 32"] },
  { id: "f51", pag: "p9", sub: "s-niveles", t: "El director seccional y sus divisiones",
    q: "¿Qué hace el director seccional y cómo se reparten el trabajo las divisiones?",
    a: "El director seccional es el superior funcional y jerárquico de su seccional y del nivel delegado; dirime los conflictos entre sus dependencias, tramita quejas y reclamos y notifica por medio electrónico sus actos. Fiscalización y Liquidación Tributaria profiere los actos preparatorios y los de determinación y sanción; la Aduanera o Cambiaria investiga, aprehende y decide de fondo; la jurídica resuelve los recursos contra decomiso y abandono.",
    por: "Una sola cabeza en el territorio; las divisiones se reparten el fondo.",
    trampa: "Donde existe una división de determinación, sanción y decomiso, es ella la que estudia las respuestas y profiere los actos definitivos.",
    src: "Decreto 1742 de 2020, arts. 70 a 74.", tri: "reconoce", num: [] },
  { id: "f45", pag: "p9", sub: "s-delega", t: "Quién firma y cómo delega el director general",
    q: "¿Quién es competente para proferir los actos, y en quién delega el director general?",
    a: "Salvo normas especiales, firman los empleados nombrados o designados como jefes de las dependencias. El director general puede delegar sus funciones en cualquiera de los directores de gestión o en el empleado que él designe por resolución.",
    por: "El jefe de cada dependencia responde por lo que sale de ella.",
    trampa: "No delega en el Comité ni necesita su aprobación.",
    src: "Decreto 1742 de 2020, arts. 78 y 80, inc. 1.", tri: "domina", num: [] },
  { id: "f46", pag: "p9", sub: "s-delega", t: "Delegar: nivel directivo y jefes de división",
    q: "¿Cómo delegan un director seccional y un jefe de división?",
    a: "El nivel directivo (central o local) solo delega en empleados de la respectiva dependencia y con autorización previa del director general. El jefe de división delega en empleados de su división mediante resolución de quien ejerza la jefatura de la Dirección Seccional. El ET añade: el funcionario del nivel ejecutivo delega en funcionarios ejecutivos o profesionales a su cargo, con resolución aprobada por su superior.",
    por: "Entre más alto el cargo, más alto el permiso.",
    trampa: "Antes de juzgar una delegación, identifica el cargo de quien delega: de eso depende la regla. Mal hecha, deja al delegatario sin competencia.",
    src: "Decreto 1742 de 2020, art. 80, incs. 2 y 3; ET, art. 560.", tri: "domina", num: [] },
  { id: "f47", pag: "p9", sub: "s-delega", t: "Grupos internos: quién responde",
    q: "¿Quién responde por las funciones delegadas a un grupo interno de trabajo?",
    a: "El jefe del grupo, «sin perjuicio» de la responsabilidad del jefe de la dependencia por la orientación y el control. Los grupos los crea, suprime, fusiona o escinde el director general por acto administrativo; en el nivel central se llaman «coordinaciones», salvo en la Policía Fiscal y Aduanera, donde se llaman «divisiones».",
    por: "Uno responde por lo que hizo; el otro, por cómo orientó y controló.",
    trampa: "No es responsabilidad de uno solo: es compartida, con contenidos distintos.",
    src: "Decreto 1742 de 2020, art. 81.", tri: "reconoce", num: [] },
  { id: "f48", pag: "p9", sub: "s-delega", t: "Pruebas y jueces: contador y abogado",
    q: "¿Quién puede practicar pruebas y quién puede actuar ante los jueces?",
    a: "Cualquier empleado puede cumplir comisiones para investigar y practicar pruebas, salvo las inspecciones contables y la prueba pericial contable: ahí el funcionario debe ser contador público matriculado. Para actuar ante los jueces, abogado matriculado con poder especial o general.",
    por: "Para leer una contabilidad se necesita un contador; para hablar ante un juez, un abogado.",
    trampa: "El patrón de siempre: aplicar la regla general («cualquier empleado») donde rige la especial.",
    src: "Decreto 1742 de 2020, art. 79.", tri: "domina", num: [] },
  { id: "f49", pag: "p9", sub: "s-conflicto", t: "Conflictos: dentro y fuera de la DIAN",
    q: "¿Quién dirime un conflicto de competencia en cada caso?",
    a: "Entre dependencias de una misma seccional: el director seccional. Entre una dirección del nivel central y una del nivel local: el director general. Entre la DIAN y otra autoridad del orden nacional: la Sala de Consulta y Servicio Civil del Consejo de Estado.",
    por: "Decide el primer jefe común de las dos partes; si no hay jefe común, el juez de los conflictos.",
    trampa: "La Sala de Consulta no es superior de las dependencias de la DIAN: no se llega a ella por un conflicto interno.",
    src: "Decreto 1742 de 2020, arts. 8, num. 27, y 70, num. 11; CPACA, art. 39.", tri: "domina", num: [] },
  { id: "f50", pag: "p9", sub: "s-conflicto", t: "Cómo se ataca un conflicto",
    q: "¿En qué orden se analiza un conflicto de competencia?",
    a: "Primero: ¿está dentro de una sola entidad o entre entidades distintas? Si es entre entidades, CPACA. Si es dentro de la DIAN: ¿de qué nivel es cada parte? Las dos de la misma seccional, director seccional; una del central y otra del local, director general.",
    por: "Dos preguntas bastan: ¿una o dos entidades?, ¿qué nivel tiene cada parte?",
    trampa: "Que una parte sea de una seccional no le da al director de esa seccional el poder de decidir contra el nivel central.",
    src: "Decreto 1742 de 2020, arts. 8 y 70; CPACA, art. 39.", tri: "reconoce", num: [] },

  /* ---------------- Página 10 · Quién decide el recurso ---------------- */
  { id: "f52", pag: "p10", sub: "s-escalon", t: "Tres escalones por cuantía",
    q: "¿Quién decide el recurso de reconsideración según la cuantía del acto?",
    a: "Sin cuantía o menos de 2.000 UVT: la división jurídica de la dependencia que profirió el acto. De 2.000 UVT a menos de 20.000: la seccional que el decreto señala para la capital del departamento. 20.000 UVT o más: la Subdirección de Recursos Jurídicos, del nivel central.",
    por: "Entre más plata en discusión, más arriba se decide.",
    trampa: "Los umbrales viejos (750 y 5.000; 750 y 10.000 UVT) ya no rigen.",
    src: "ET, art. 560 (mod. Ley 1819 de 2016, art. 281); Decreto 1742 de 2020, arts. 57 y 69.", tri: "domina", num: ["2.000 UVT", "20.000 UVT"] },
  { id: "f53", pag: "p10", sub: "s-escalon", t: "Los umbrales en pesos de 2026",
    q: "Con la UVT de 2026, ¿cuánto son 2.000 y 20.000 UVT?",
    a: "La UVT de 2026 es de 52.374 pesos. 2.000 UVT = 104.748.000 pesos. 20.000 UVT = 1.047.480.000 pesos. Si el caso da la cuantía en pesos, se divide por la UVT.",
    por: "Unos 105 millones y unos mil cuarenta y siete millones: el primer umbral es la décima parte del segundo.",
    trampa: "La cuantía suma impuestos y sanciones: no basta mirar el mayor impuesto.",
    src: "Resolución DIAN 000238 de 2025; Decreto 1742 de 2020, art. 69.", tri: "domina", num: ["52.374", "104.748.000", "1.047.480.000"] },
  { id: "f54", pag: "p10", sub: "s-escalon", t: "Qué actos y qué cuenta",
    q: "¿Contra qué actos procede la reconsideración, qué suma la cuantía y qué más sigue estas reglas?",
    a: "Procede contra los actos de determinación (con las sanciones que contienen), los que imponen sanciones, los que deciden devoluciones o compensaciones y los cambiarios. La cuantía comprende los mayores valores por impuestos y sanciones. Las mismas reglas se aplican a la revocatoria directa de esos actos: de oficio, a petición de parte o por orden judicial.",
    por: "El recurso y la revocatoria discuten lo mismo: los decide el mismo escalón.",
    trampa: "No olvides la revocatoria directa: el decreto la reparte con las mismas reglas de cuantía que el recurso.",
    src: "ET, art. 560; Decreto 1742 de 2020, art. 69, par. 2.", tri: "domina", num: [] },
  { id: "f55", pag: "p10", sub: "s-capital", t: "Capitales partidas: Bogotá, Cali y Medellín",
    q: "En el segundo escalón, ¿quién decide lo de Girardot, Buenaventura, Palmira, Tuluá, Puerto Asís y Urabá?",
    a: "Donde hay dos seccionales, la de impuestos decide lo tributario y la de aduanas lo aduanero y cambiario. Bogotá: lo suyo y lo de Girardot (y la de aduanas, lo de El Dorado). Cali: lo suyo y lo de Buenaventura, Palmira, Tuluá y Puerto Asís. Medellín: lo suyo y lo de Urabá.",
    por: "Primero el lugar, después la materia: impuestos con impuestos, aduanas con aduanas.",
    trampa: "Puerto Asís queda en el Putumayo, pero va a Cali: en Mocoa no hay seccional. Y El Dorado es zona gris: el num. 2.2 lo manda a Aduanas de Bogotá y el 2.17 lo pone a decidir lo suyo.",
    src: "Decreto 1742 de 2020, art. 69, num. 2.", tri: "domina", num: [] },
  { id: "f56", pag: "p10", sub: "s-capital", t: "Una sola seccional para todo",
    q: "¿Qué capitales deciden con una sola seccional, y quiénes deciden lo suyo?",
    a: "Bucaramanga (y Barrancabermeja), Pasto (y Ipiales y Tumaco), Riohacha (y Maicao) y Tunja (y Sogamoso) deciden todas las materias. Barranquilla, Cartagena y Cúcuta deciden lo suyo, separando impuestos y aduanas. Las demás seccionales de impuestos y aduanas deciden sus propios recursos, y también la Dirección Operativa de Grandes Contribuyentes.",
    por: "La capital del departamento recoge lo de las seccionales pequeñas de su departamento.",
    trampa: "La Dirección Operativa de Grandes Contribuyentes decide su segundo escalón: no lo manda a la seccional de Bogotá.",
    src: "Decreto 1742 de 2020, art. 69, num. 2.", tri: "reconoce", num: [] },
  { id: "f57", pag: "p10", sub: "s-excrec", t: "Mercancía aprehendida",
    q: "¿Quién decide el recurso contra el acto que define la situación jurídica de mercancía aprehendida?",
    a: "La división jurídica de la seccional de aduanas o de impuestos y aduanas, cualquiera que sea el valor de la mercancía. Un decomiso de 30.000 UVT no sube al nivel central.",
    por: "La mercancía está en el territorio, y allí se resuelve su suerte.",
    trampa: "Si el acto es una multa sin aprehensión, vuelve la regla de cuantía.",
    src: "Decreto 1742 de 2020, art. 69, par. 3, y art. 74.", tri: "domina", num: [] },
  { id: "f58", pag: "p10", sub: "s-excrec", t: "Garantía de objeto único",
    q: "¿Quién decide el recurso contra el acto que declara un incumplimiento y ordena hacer efectiva la garantía?",
    a: "Si ese es su objeto único, la división jurídica de la Dirección Operativa de Grandes Contribuyentes o de la seccional que lo expidió, sin importar la cuantía.",
    por: "Hacer efectiva una póliza es un trámite de la dependencia que la recibió.",
    trampa: "La palabra decisiva es «único»: si el mismo acto impone además una sanción, vuelve la regla de cuantía.",
    src: "Decreto 1742 de 2020, art. 69, par. 4.", tri: "domina", num: [] },
  { id: "f59", pag: "p10", sub: "s-excrec", t: "Avocar y revocar en la Subdirección",
    q: "¿Cuándo decide la Subdirección de Recursos Jurídicos aunque el acto sea de menos de 20.000 UVT?",
    a: "Cuando avoca el conocimiento, cosa que puede hacer si lo estima conveniente, aunque la seccional ya tenga listo un proyecto. Y las revocatorias directas contra sus propios actos las resuelve ella, independientemente de su cuantía.",
    por: "El nivel central puede llamar a sí lo que considere importante, y responde por lo que él mismo firmó.",
    trampa: "Poder avocar no es haber avocado: sin avocación, decide el escalón que corresponda.",
    src: "Decreto 1742 de 2020, art. 57, nums. 5 y 7.", tri: "domina", num: [] },
  { id: "f60", pag: "p10", sub: "s-excrec", t: "Sin acumular, y el Comité Técnico",
    q: "¿Se suman varios actos para fijar la cuantía? ¿Cuándo actúa el Comité Técnico?",
    a: "No: para fijar la cuantía no hay lugar a la acumulación de expedientes; tres actos de 8.000 UVT siguen siendo tres actos del segundo escalón. En el tercer escalón, si el contribuyente lo pide, el expediente pasa antes del fallo por un Comité Técnico (ministro de Hacienda o su delegado, director general o su delegado, director de gestión jurídica o su delegado, y los abogados ponente y revisor).",
    por: "Cada acto se discute por lo que vale. Y en los grandes, el contribuyente puede pedir una segunda mirada técnica.",
    trampa: "Si el contribuyente lo pidió, la revisión del comité no es facultativa para la DIAN.",
    src: "Decreto 1742 de 2020, art. 57, par.; ET, art. 560, par. 1.", tri: "domina", num: [] },

  /* ---------------- Página 11 · La voz oficial ---------------- */
  { id: "f61", pag: "p11", sub: "s-doctrina", t: "Doctrina general, no particular",
    q: "¿Qué consultas absuelve la Subdirección de Normativa y Doctrina, y cuáles no?",
    a: "Es la autoridad doctrinaria nacional en materia tributaria, aduanera y de fiscalización cambiaria. Absuelve las consultas escritas presentadas de manera general. La doctrina «será de carácter general y no se referirá a asuntos particulares»: ante un caso concreto, explica en abstracto cómo se interpretan las normas, sin calificarlo.",
    por: "Si la doctrina calificara casos, cada consulta sería una sentencia anticipada.",
    trampa: "Aportar facturas y fechas no obliga a la Subdirección a calificar la operación.",
    src: "Decreto 1742 de 2020, art. 56.", tri: "domina", num: [] },
  { id: "f62", pag: "p11", sub: "s-doctrina", t: "Obliga si está publicada",
    q: "¿A quién obligan los conceptos de la Dirección de Gestión Jurídica y de la Subdirección de Normativa y Doctrina?",
    a: "Son interpretación oficial obligatoria para los empleados públicos de la DIAN, siempre que estén publicados en la página web de la entidad. El gestor que proyecta un acto no puede apartarse de un concepto publicado solo porque no lo comparte.",
    por: "Una entidad no puede hablar con dos voces: la publicada es la de todos.",
    trampa: "Obligan a los empleados, no a los contribuyentes. Y sin publicación no hay obligatoriedad.",
    src: "Decreto 1742 de 2020, arts. 55 y 56, pars.; Ley 2010 de 2019, art. 131.", tri: "domina", num: [] },
  { id: "f63", pag: "p11", sub: "s-doctrina", t: "Reconsiderar un concepto",
    q: "¿Ante quién se pide la reconsideración de un concepto de la Subdirección de Normativa y Doctrina?",
    a: "Ante la Dirección de Gestión Jurídica, que está encima de esa subdirección, profiere los conceptos unificados y absuelve las peticiones de reconsideración. Mientras se decide, el funcionario sigue aplicando el concepto publicado.",
    por: "No se «apela» ante quien expidió el concepto: se pide al superior que lo revise.",
    trampa: "Inaplicarlo por cuenta propia expone el acto a discusión y al funcionario a un riesgo disciplinario.",
    src: "Decreto 1742 de 2020, art. 55, num. 20.", tri: "domina", num: [] },
  { id: "f64", pag: "p11", sub: "s-doctrina", t: "El contribuyente y la «ley»",
    q: "¿En qué puede sustentar el contribuyente sus actuaciones frente a la DIAN y ante los jueces?",
    a: "«Con base en la ley». La Corte condicionó la palabra: comprende todas las fuentes del derecho que admite el ordenamiento, no solo la ley en sentido formal ni solo la doctrina oficial.",
    por: "La doctrina ata a los funcionarios; al contribuyente lo ata el derecho.",
    trampa: "La DIAN no puede rechazar un argumento solo porque se apoya en una fuente distinta de la ley formal o de su doctrina.",
    src: "Ley 2010 de 2019, art. 131; Corte Constitucional, C-514 de 2019.", tri: "reconoce", num: [] },
  { id: "f65", pag: "p11", sub: "s-doctrina", t: "La asesoría no obliga",
    q: "¿Obliga la asesoría jurídica que la Dirección de Gestión Jurídica o la Subdirección de Normativa y Doctrina le dan a un director?",
    a: "No: esa asesoría «no será vinculante para el solicitante». Se parece al concepto, pero es otra cosa: el concepto publicado obliga a los funcionarios; la asesoría no obliga a quien la pidió.",
    por: "Quien pide consejo conserva la decisión.",
    trampa: "No confundas asesoría con concepto: el segundo sí obliga, aun al director que no lo comparte.",
    src: "Decreto 1742 de 2020, arts. 55, num. 5, y 56, num. 2.", tri: "domina", num: [] },
  { id: "f66", pag: "p11", sub: "s-repres", t: "Representación Externa",
    q: "¿Qué hace la Subdirección de Representación Externa?",
    a: "Representa a la DIAN, según las delegaciones del director general, en los procesos judiciales y administrativos que no estén asignados a otra dependencia, y en conciliaciones y otros mecanismos alternativos. Administra el buzón exclusivo de notificaciones judiciales y gestiona los asuntos del Comité de Conciliación y Defensa Judicial.",
    por: "Es la puerta judicial de la entidad para todo lo que no sea penal ni esté asignado a otro.",
    trampa: "Las ofertas conciliatorias de los procesos penales no son suyas: las lleva Asuntos Penales.",
    src: "Decreto 1742 de 2020, art. 58.", tri: "domina", num: [] },
  { id: "f67", pag: "p11", sub: "s-repres", t: "Asuntos Penales",
    q: "¿Qué hace la Subdirección de Asuntos Penales?",
    a: "Representa a la DIAN en los procesos penales por conductas detectadas y denunciadas por sus empleados y en aquellos en que la entidad puede ser víctima. Formula denuncias, promueve el incidente de reparación integral y lleva al Comité de Conciliación y Defensa Judicial los preacuerdos, los principios de oportunidad y las ofertas conciliatorias de esos procesos.",
    por: "Lo penal tiene su propio abogado dentro de la entidad.",
    trampa: "Que el comité lo gestione Representación Externa no le quita a Asuntos Penales sus preacuerdos.",
    src: "Decreto 1742 de 2020, art. 59.", tri: "domina", num: [] },
  /* ================= Actualización M07 «Ruta tributaria 2» · 30-oct-2026 =================
     Fuente: lección DIAN EXPRÉS M07, que leyó el ET en secretariasenado.gov.co con sus cuadros, la C-1441 de 2000 y el CPACA. */

  /* ---------------- Página 12 · Tres maneras de liquidar ---------------- */
  { id: "f68", pag: "p12", sub: "s-rutas", t: "Tres maneras de liquidar",
    q: "¿Qué caminos tiene la DIAN frente a la liquidación privada?",
    a: "Error de cuentas: liquidación oficial de corrección aritmética. Problema de fondo (ingresos omitidos, costos inexistentes, deducciones improcedentes): requerimiento especial y liquidación oficial de revisión. No declaró: emplazamiento previo por no declarar, sanción por no declarar y liquidación oficial de aforo.",
    por: "Cada camino tiene su acto, su plazo y su punto de partida.",
    trampa: "No mezclar plazos: la corrección aritmética cuenta desde la presentación; el requerimiento especial, desde el vencimiento.",
    src: "ET, arts. 697-703 y 715-717.", tri: "domina", num: [] },
  { id: "f69", pag: "p12", sub: "s-aritm", t: "Qué es error aritmético",
    q: "¿Cuándo hay error aritmético?",
    a: "Cuando, con los valores bien declarados, se anota un resultado equivocado; cuando al aplicar la tarifa se anota un valor distinto del que resultaba, o cuando una operación da un valor equivocado. En los tres casos, el error debe producir un menor valor a pagar o un mayor saldo a favor.",
    por: "La DIAN corrige de oficio solo lo que la perjudica a ella.",
    trampa: "Un error de cuentas que perjudica al contribuyente no entra en el art. 697.",
    src: "ET, art. 697.", tri: "domina", num: [] },
  { id: "f70", pag: "p12", sub: "s-aritm", t: "Dos años desde la presentación",
    q: "¿En qué plazo profiere la DIAN la liquidación oficial de corrección aritmética, y qué le pasa a la revisión?",
    a: "Dentro de los dos años siguientes a la fecha de presentación de la declaración. Y se entiende sin perjuicio de la facultad de revisión: corregir una suma no le gasta a la DIAN su única oportunidad de modificar la declaración en el fondo.",
    por: "Una cuenta es rápida de ver; el fondo necesita su propio procedimiento.",
    trampa: "El punto de partida es la presentación, no el vencimiento del plazo para declarar.",
    src: "ET, arts. 698 y 699.", tri: "domina", num: ["2 años"] },
  { id: "f71", pag: "p12", sub: "s-aritm", t: "Sanciones mal liquidadas: 30 %",
    q: "¿Qué pasa si el contribuyente no liquidó las sanciones o las liquidó mal?",
    a: "La DIAN las liquida incrementadas en un 30 %. El incremento se reduce a la mitad si, dentro del plazo para recurrir, el contribuyente acepta los hechos, renuncia al recurso y paga la sanción con el incremento reducido.",
    por: "Liquidar bien las propias sanciones sale más barato que esperar a la DIAN.",
    trampa: "No confundir con el 10 % mensual del art. 642: el art. 701 es un incremento del 30 %.",
    src: "ET, art. 701.", tri: "reconoce", num: ["30 %", "15 %"] },
  { id: "f72", pag: "p12", sub: "s-rutas", t: "Quién firma hoy",
    q: "¿Quién profiere hoy el requerimiento especial, su ampliación y la liquidación oficial de revisión?",
    a: "El jefe de la unidad de fiscalización. El texto del art. 691 hablaba del jefe de liquidación, pero el parágrafo que agregó el Decreto Ley 2106 de 2019 asignó esos actos a fiscalización. La misma dependencia propone y decide: en las seccionales, la División de Fiscalización y Liquidación Tributaria.",
    por: "Hoy hay una sola división que investiga, propone y liquida.",
    trampa: "Si una opción dice «el jefe de la unidad de liquidación», está leyendo el artículo sin su parágrafo.",
    src: "ET, arts. 688 y 691 (par. agregado por el Decreto Ley 2106 de 2019).", tri: "reconoce", num: [] },

  /* ---------------- Página 13 · El requerimiento especial ---------------- */
  { id: "f73", pag: "p13", sub: "s-respuesta", t: "Tres meses para responder",
    q: "¿Cuánto tiempo hay para responder el requerimiento especial y qué se puede hacer en la respuesta?",
    a: "Tres meses desde su notificación, por escrito. Se pueden formular objeciones, pedir pruebas, subsanar omisiones, pedir que la DIAN traiga documentos de sus archivos y pedir inspecciones tributarias; si son conducentes, la DIAN debe atenderlas.",
    por: "El contribuyente se defiende antes de que la DIAN decida.",
    trampa: "No responder no tiene sanción propia, pero cierra dos puertas: la cuarta parte de la sanción y la demanda directa ante el juez.",
    src: "ET, art. 707.", tri: "domina", num: ["3 meses"] },
  { id: "f74", pag: "p13", sub: "s-respuesta", t: "La ampliación",
    q: "¿Cuándo, cuántas veces y con qué contenido puede ampliarse el requerimiento especial?",
    a: "Una sola vez, dentro de los tres meses siguientes al vencimiento del plazo para responderlo. Puede incluir hechos y conceptos nuevos y proponer una nueva determinación del impuesto y de las sanciones. El contribuyente tiene para responderla el plazo que fije la DIAN: no menos de tres meses ni más de seis.",
    por: "Si la DIAN quiere decidir sobre algo nuevo, debe avisarlo antes.",
    trampa: "Los tres meses se cuentan desde el vencimiento del plazo para responder, no desde la notificación ni desde la fecha en que el contribuyente respondió.",
    src: "ET, art. 708.", tri: "domina", num: ["3 meses", "3 a 6 meses"] },
  { id: "f75", pag: "p13", sub: "s-cuarta", t: "La cuarta parte",
    q: "¿Qué requisitos tiene la reducción de la sanción por inexactitud a la cuarta parte?",
    a: "Cuatro a la vez: 1) aceptar los hechos al responder el requerimiento especial o su ampliación; 2) corregir la declaración con los mayores valores aceptados y la sanción reducida; 3) adjuntar copia de la corrección; 4) adjuntar la prueba del pago o del acuerdo de pago de impuestos, retenciones y sanciones. La reducción opera sobre los hechos aceptados.",
    por: "Cuanto antes acepta, menos paga.",
    trampa: "El operador suele quitar un requisito: quien acepta pero no corrige o no paga ni firma acuerdo, no tiene la rebaja.",
    src: "ET, art. 709.", tri: "domina", num: ["1/4"] },
  { id: "f76", pag: "p13", sub: "s-respuesta", t: "La liquidación sin aviso es nula",
    q: "¿Qué pasa si la DIAN profiere la liquidación oficial de revisión sin requerimiento especial o antes de que venza el plazo para responderlo?",
    a: "La liquidación es nula: es causal omitir el requerimiento especial o pretermitir el término para responderlo. Antes de modificar la declaración, la DIAN debe enviar, una sola vez, el requerimiento especial con todos los puntos y su cuantificación.",
    por: "El orden es una garantía: primero el aviso y la defensa, después la decisión.",
    trampa: "La nulidad no depende de que el contribuyente haya pedido pruebas.",
    src: "ET, arts. 703, 704 y 730, num. 2.", tri: "domina", num: [] },

  /* ---------------- Página 14 · La liquidación oficial de revisión ---------------- */
  { id: "f77", pag: "p14", sub: "s-seismeses", t: "Seis meses para la liquidación",
    q: "¿Dentro de qué término debe notificarse la liquidación oficial de revisión?",
    a: "Dentro de los seis meses siguientes al vencimiento del término para responder el requerimiento especial o su ampliación, según el caso.",
    por: "La DIAN ya escuchó al contribuyente: tiene medio año para decidir.",
    trampa: "Se cuenta desde el vencimiento del plazo, no desde la fecha en que el contribuyente respondió. Si hubo ampliación, desde el vencimiento del plazo para responderla.",
    src: "ET, art. 710.", tri: "domina", num: ["6 meses"] },
  { id: "f78", pag: "p14", sub: "s-seismeses", t: "Lo que suspende los seis meses",
    q: "¿Qué suspende el término para notificar la liquidación oficial de revisión?",
    a: "La inspección tributaria de oficio, tres meses desde la notificación del auto que la ordena; la inspección contable pedida por el contribuyente, mientras dure; y la prueba pedida por el contribuyente en documentos que no reposan en el expediente, dos meses.",
    por: "Si el contribuyente pidió algo, el reloj de la DIAN se detiene mientras se practica.",
    trampa: "Antes de contar, pregunta: ¿qué pasó antes que mueva este reloj?",
    src: "ET, art. 710.", tri: "domina", num: ["3 meses", "2 meses"] },
  { id: "f79", pag: "p14", sub: "s-mitad", t: "El segundo reloj de la firmeza",
    q: "¿Qué pasa si la DIAN notificó a tiempo el requerimiento especial, pero deja vencer los seis meses de la liquidación?",
    a: "La declaración queda en firme: si, vencido el término para practicar la liquidación de revisión, esta no se notificó, la DIAN pierde la oportunidad y la declaración queda como el contribuyente la dejó.",
    por: "Cada paso de la DIAN tiene su propio reloj.",
    trampa: "Haber notificado a tiempo el requerimiento especial no basta.",
    src: "ET, art. 714.", tri: "domina", num: [] },
  { id: "f80", pag: "p14", sub: "s-mitad", t: "Solo lo que se propuso",
    q: "¿Puede la liquidación oficial de revisión incluir un hecho que no estaba en el requerimiento especial?",
    a: "No: debe limitarse a la declaración y a los hechos contemplados en el requerimiento especial o en su ampliación. Si la DIAN quiere agregar algo, debe ampliar el requerimiento a tiempo. El contribuyente debe alegar la violación al discutir la liquidación.",
    por: "Nadie se defiende de lo que no le han dicho.",
    trampa: "Un hecho que llegó por la ampliación sí puede estar en la liquidación.",
    src: "ET, art. 711.", tri: "domina", num: [] },
  { id: "f81", pag: "p14", sub: "s-mitad", t: "La mitad",
    q: "¿Cuándo se reduce la sanción por inexactitud a la mitad?",
    a: "Si, dentro del término para interponer el recurso de reconsideración contra la liquidación oficial de revisión, el contribuyente acepta los hechos, corrige su declaración con los mayores valores y la sanción reducida, y presenta ante la oficina de recursos un memorial con la corrección y la prueba del pago o del acuerdo de pago. Es la mitad de la sanción inicialmente propuesta, sobre los hechos aceptados.",
    por: "Segunda oportunidad, más cara que la primera.",
    trampa: "Con el requerimiento especial, la cuarta parte; con la liquidación, la mitad; fuera del término para recurrir, nada.",
    src: "ET, arts. 713 y 648, par. 1.", tri: "domina", num: ["1/2"] },

  /* ---------------- Página 15 · El que no declara ---------------- */
  { id: "f82", pag: "p15", sub: "s-extemp", t: "El emplazamiento duplica el precio",
    q: "¿Cuánto da el emplazamiento previo por no declarar y cuánto cuesta declarar después?",
    a: "Un mes, previa comprobación de la obligación. Quien declara después del emplazamiento (o del auto de inspección tributaria) paga el 10 % del impuesto o retención por mes o fracción, sin pasar del 200 % (art. 642). Antes del emplazamiento, el 5 % por mes o fracción, sin pasar del 100 % (art. 641).",
    por: "Esperar a que la DIAN te llame cuesta el doble.",
    trampa: "La fracción de mes cuenta como mes completo, y cada artículo tiene su tope.",
    src: "ET, arts. 641, 642 y 715.", tri: "domina", num: ["1 mes", "10 %", "200 %"] },
  { id: "f83", pag: "p15", sub: "s-sancnodecl", t: "La sanción por no declarar",
    q: "¿Cuánto es la sanción por no declarar en renta, en IVA y en retención?",
    a: "Renta: 20 % de las consignaciones bancarias o de los ingresos brutos que determine la DIAN, o de los ingresos brutos de la última declaración de renta, el que sea mayor. IVA e impuesto nacional al consumo: 10 %, con la misma lógica. Retención: 10 % de los cheques u otros medios de pago, o de los costos y gastos, o 100 % de las retenciones de la última declaración, el que sea mayor. Si la DIAN solo tiene una base, puede usarla.",
    por: "Quien no declara no puede beneficiarse de su silencio: se toma la base mayor.",
    trampa: "El 10 % es del IVA; en renta es el 20 %.",
    src: "ET, arts. 643 y 716.", tri: "domina", num: ["20 %", "10 %"] },
  { id: "f84", pag: "p15", sub: "s-sancnodecl", t: "La mitad, con piso",
    q: "¿Cómo se reduce la sanción por no declarar?",
    a: "Si, dentro del plazo para recurrir la resolución sanción, el contribuyente presenta la declaración, la sanción se reduce al 50 % de la impuesta. Debe liquidarla y pagarla con la declaración, y nunca puede quedar por debajo de la sanción por extemporaneidad del art. 642.",
    por: "Declarar tarde siempre sale más barato que no declarar.",
    trampa: "La extemporaneidad del art. 642 es el piso, no un valor que se suma.",
    src: "ET, art. 643, par. 2.", tri: "domina", num: ["50 %"] },
  { id: "f85", pag: "p15", sub: "s-aforo", t: "Aforo: cinco años",
    q: "¿Cuándo y hasta cuándo puede la DIAN proferir la liquidación oficial de aforo?",
    a: "Agotado el procedimiento (emplazamiento previo y sanción por no declarar), dentro de los cinco años siguientes al vencimiento del plazo para declarar. La facultad de imponer la sanción por no declarar también se extingue en cinco años (art. 638), aunque la regla general de las sanciones independientes es de dos años.",
    por: "Quien no declaró no tiene firmeza que lo proteja: la DIAN tiene más tiempo.",
    trampa: "Tres años es el requerimiento especial, para quien sí declaró.",
    src: "ET, arts. 638, 717 y 719.", tri: "domina", num: ["5 años"] },

  /* ---------------- Página 16 · El recurso de reconsideración ---------------- */
  { id: "f86", pag: "p16", sub: "s-recurso", t: "Un recurso, dos meses",
    q: "¿Contra qué procede el recurso de reconsideración, ante quién y en qué plazo?",
    a: "Contra las liquidaciones oficiales, las resoluciones que imponen sanciones, las que ordenan reintegrar sumas devueltas y los demás actos sobre los impuestos que administra la DIAN, salvo norma especial. Se interpone ante la oficina de recursos de la administración que profirió el acto, dentro de los dos meses siguientes a su notificación. Norma especial: contra la clausura del establecimiento, reposición en diez días.",
    por: "El Estatuto tiene su propio recurso y su propio plazo.",
    trampa: "No es reposición y apelación en diez días: eso es el CPACA.",
    src: "ET, arts. 720 y 735.", tri: "domina", num: ["2 meses", "10 días"] },
  { id: "f87", pag: "p16", sub: "s-recurso", t: "Directo ante el juez",
    q: "¿Cuándo puede el contribuyente demandar sin interponer el recurso de reconsideración?",
    a: "Si atendió en debida forma el requerimiento especial y aun así la DIAN profirió la liquidación oficial, puede prescindir del recurso y acudir directamente ante la jurisdicción de lo contencioso administrativo, dentro de los cuatro meses siguientes a la notificación de la liquidación.",
    por: "Ya se defendió una vez ante la DIAN: puede ir al juez.",
    trampa: "Quien no respondió el requerimiento especial no tiene esa puerta.",
    src: "ET, art. 720, par.", tri: "domina", num: ["4 meses"] },
  { id: "f88", pag: "p16", sub: "s-requisitos", t: "Requisitos del recurso",
    q: "¿Qué requisitos tiene el recurso de reconsideración y quién puede interponerlo?",
    a: "Por escrito, con expresión concreta de los motivos de inconformidad, dentro de la oportunidad legal y por el contribuyente o su apoderado o representante, que para interponer recursos debe ser abogado. El agente oficioso solo puede ser abogado, y la persona debe ratificar dentro de los dos meses siguientes a la notificación del auto admisorio; si no ratifica, se revoca el auto admisorio.",
    por: "El recurso abre una discusión seria: exige motivos y alguien habilitado.",
    trampa: "La ratificación se cuenta desde la notificación del auto admisorio, no desde la interposición.",
    src: "ET, art. 722; Decreto 19 de 2012, art. 68 (en la nota del editor).", tri: "domina", num: ["2 meses"] },
  { id: "f89", pag: "p16", sub: "s-requisitos", t: "Lo que ya no se exige, y la inadmisión",
    q: "¿Hay que acreditar el pago de la liquidación privada para recurrir? ¿Qué procede contra el auto inadmisorio?",
    a: "No: ese requisito (literal d del art. 722) fue declarado inexequible en la C-1441 de 2000. Contra el auto que inadmite el recurso solo procede la reposición ante el mismo funcionario, dentro de los diez días siguientes, y debe resolverse en cinco días.",
    por: "No se puede condicionar la defensa a pagar primero.",
    trampa: "Si una opción exige el pago de la liquidación privada, está mal.",
    src: "ET, arts. 722 y 726; C-1441 de 2000.", tri: "reconoce", num: ["10 días", "5 días"] },
  { id: "f90", pag: "p16", sub: "s-recurso", t: "Lo aceptado y las nulidades",
    q: "¿Qué no puede discutirse en el recurso, y cuándo se alegan las nulidades?",
    a: "No pueden objetarse los hechos aceptados expresamente al responder el requerimiento especial o su ampliación. Las nulidades se alegan dentro del término para interponer el recurso, en el escrito o en una adición. Causales: funcionario incompetente; omisión del requerimiento especial o del término para responderlo; omisión de bases, montos o explicaciones; procedimientos concluidos; y otras que la ley declare.",
    por: "Lo aceptado, aceptado queda; y lo que se reclama, se reclama a tiempo.",
    trampa: "La causal «no notificarse dentro del término legal» fue derogada: hoy un acto tardío se combate por firmeza o por pérdida de competencia.",
    src: "ET, arts. 723, 730 y 731.", tri: "reconoce", num: [] },
  { id: "f91", pag: "p16", sub: "s-silencio", t: "Un año y silencio positivo",
    q: "¿Cuánto tiene la DIAN para resolver el recurso y qué pasa si no lo hace?",
    a: "Un año desde la interposición en debida forma. Se suspende si se practica inspección tributaria: mientras dure, si la pidió el contribuyente, y hasta por tres meses, si es de oficio. Si el año pasa sin decisión, el recurso se entiende fallado a favor del recurrente, y la DIAN debe declararlo de oficio o a petición de parte.",
    por: "La DIAN no puede tener al contribuyente esperando indefinidamente.",
    trampa: "Cuenta el año hasta la notificación de la decisión, no hasta su firma.",
    src: "ET, arts. 732, 733 y 734.", tri: "domina", num: ["1 año", "3 meses"] },
  { id: "f92", pag: "p16", sub: "s-silencio", t: "El choque con el CPACA",
    q: "¿En qué tres puntos el Estatuto desplaza al CPACA en los recursos?",
    a: "Recurso: CPACA, reposición y apelación en diez días; Estatuto, solo reconsideración en dos meses. Silencio: CPACA, negativo a los dos meses; Estatuto, un año y positivo. Juez sin recurso: CPACA, la apelación obligatoria cuando procede; Estatuto, demanda directa en cuatro meses si se atendió en debida forma el requerimiento especial.",
    por: "Donde el Estatuto tiene norma propia, desplaza al CPACA.",
    trampa: "El operador pone palabras verdaderas del CPACA en un caso tributario.",
    src: "ET, arts. 720, 732 y 734; CPACA, arts. 74, 76 y 86.", tri: "domina", num: [] },

  /* ---------------- Página 17 · La revocatoria directa ---------------- */
  { id: "f93", pag: "p17", sub: "s-revoc", t: "Solo sin recursos",
    q: "¿Cuándo procede la revocatoria directa en materia tributaria?",
    a: "Solo cuando el contribuyente no interpuso los recursos de la vía gubernativa. Quien interpuso el recurso de reconsideración no puede pedir después la revocatoria del mismo acto, por ninguna causal.",
    por: "Quien ya discutió el acto tuvo su oportunidad.",
    trampa: "En el CPACA, quien recurrió puede pedirla por interés público o agravio injustificado; en el Estatuto, no.",
    src: "ET, art. 736.", tri: "domina", num: [] },
  { id: "f94", pag: "p17", sub: "s-revoc", t: "Dos años, un año y silencio positivo",
    q: "¿En qué plazo se pide la revocatoria directa, en cuánto se decide y qué pasa si no se decide?",
    a: "Se pide dentro de los dos años siguientes a la ejecutoria del acto. La DIAN tiene un año desde la petición en debida forma para decidir; si no decide, la solicitud se entiende resuelta a favor del solicitante, y el silencio positivo debe declararse de oficio o a petición de parte.",
    por: "Segunda oportunidad para quien no recurrió, pero con plazo.",
    trampa: "El plazo corre desde la ejecutoria, no desde la notificación.",
    src: "ET, arts. 737 y 738-1.", tri: "domina", num: ["2 años", "1 año"] },
  { id: "f95", pag: "p17", sub: "s-revoc", t: "Revocatoria: el choque con el CPACA",
    q: "¿En qué se diferencia la revocatoria directa del Estatuto de la del CPACA?",
    a: "Procedencia: el CPACA la permite a quien recurrió por interés público o agravio injustificado; el Estatuto, a nadie que haya recurrido. Oportunidad: el CPACA, aun después de demandar, mientras no se notifique el auto admisorio; el Estatuto, dos años desde la ejecutoria. Término: el CPACA, dos meses y sin silencio; el Estatuto, un año con silencio positivo.",
    por: "Otra vez, el Estatuto trae norma propia.",
    trampa: "Las palabras del CPACA son verdaderas, pero para otro régimen.",
    src: "ET, arts. 736 a 738-1; CPACA, arts. 93 a 96.", tri: "reconoce", num: [] }

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
      { k: "V", t: "Vencimiento", d: "Si declaró a tiempo. Si imputó el saldo a favor, rige esta misma regla (desde la presentación, si declaró tarde).", lam: ["f24", "f27"] },
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
    nota: "El beneficio de auditoría (años 2022 a 2026) exige presentar y pagar a tiempo, que no llegue ningún acto en ese término y un impuesto base de al menos 71 UVT." },
  /* ---------- M05 · La DIAN por dentro (capítulos 2 a 4), desde el 30-oct-2026 ---------- */
  "m05-2": { nombre: "¿Quién manda aquí?", preguntas: ["¿En qué nivel está?", "¿Quién firma o delega?", "¿Quién destraba?"],
    filas: [
      { k: "central", t: "Nivel central", col: "b", lam: ["f40", "f41", "f42", "f43"], norma: "Decreto 1742 de 2020, arts. 4, 5, 12, 63 y 77",
        d: "Dirección General con cuatro oficinas (Tributación Internacional entre ellas), ocho direcciones de gestión, Grandes Contribuyentes (sin geografía), el Defensor y el Comité Institucional Estratégico, que solo propone el plan." },
      { k: "local", t: "Nivel local y delegado", col: "y", lam: ["f44", "f51"], norma: "Arts. 6, 7 y 70 a 74",
        d: "45 seccionales (6 de impuestos, 7 de aduanas y 32 de impuestos y aduanas), de tipo I, II o III. Las delegadas las autoriza el director general. El director seccional es el superior de su seccional." },
      { k: "firma", t: "Quién firma y cómo se delega", col: "g", lam: ["f45", "f46"], norma: "Arts. 78 y 80; ET, art. 560",
        d: "Firman los jefes de dependencia. Director general: en directores de gestión o en quien designe. Nivel directivo: en su dependencia, con autorización previa del director general. Jefe de división: con resolución del director seccional." },
      { k: "grupos", t: "Grupos internos, pruebas y jueces", col: "o", lam: ["f47", "f48"], norma: "Arts. 79 y 81",
        d: "En el grupo responde su jefe, sin perjuicio del jefe de la dependencia. Pruebas: cualquier empleado comisionado, salvo las contables (contador público). Ante jueces: abogado con poder." },
      { k: "conflicto", t: "Conflictos de competencia", col: "p", lam: ["f49", "f50"], norma: "Arts. 8, num. 27, y 70, num. 11; CPACA, art. 39",
        d: "Dentro de una seccional: el director seccional. Entre el central y el local: el director general. Con otra autoridad nacional: la Sala de Consulta y Servicio Civil." }
    ] },
  "m05-3": { nombre: "¿Quién decide el recurso?", preguntas: ["¿Tiene regla especial?", "¿Cuánto vale?", "¿De dónde salió?"],
    filas: [
      { k: "esp", t: "Primero, las excepciones", col: "o", lam: ["f57", "f58", "f59"], norma: "Decreto 1742, arts. 57 y 69, pars. 3 y 4",
        d: "Mercancía aprehendida: la jurídica de la seccional, sin importar el valor. Garantía de objeto único: la jurídica de quien la expidió. Avocación: la Subdirección de Recursos Jurídicos. Revocatoria de sus propios actos: ella misma." },
      { k: "cuantia", t: "Después, la cuantía", col: "p", lam: ["f52", "f53", "f54"], norma: "ET, art. 560; Decreto 1742, art. 69",
        d: "Menos de 2.000 UVT o sin cuantía: la jurídica de quien profirió. De 2.000 a menos de 20.000: la seccional de la capital. 20.000 o más: la Subdirección de Recursos Jurídicos. Impuestos y sanciones se suman." },
      { k: "lugar", t: "Por último, el lugar", col: "y", lam: ["f55", "f56"], norma: "Decreto 1742, art. 69, num. 2",
        d: "Tunja (Sogamoso), Bucaramanga (Barrancabermeja), Pasto (Ipiales y Tumaco), Riohacha (Maicao), Cali (Buenaventura, Palmira, Tuluá y Puerto Asís), Medellín (Urabá), Bogotá (Girardot). Las demás deciden lo suyo." },
      { k: "comite", t: "Sin acumular, y el Comité Técnico", col: "g", lam: ["f60"], norma: "Decreto 1742, art. 57, par.; ET, art. 560, par. 1",
        d: "Para la cuantía no se acumulan expedientes. En el tercer escalón, si el contribuyente lo pide, el expediente pasa por el Comité Técnico antes del fallo." }
    ],
    nota: "Con la UVT de 2026 (52.374 pesos), 2.000 UVT son 104.748.000 pesos y 20.000 UVT son 1.047.480.000 pesos." },
  "m05-4": { nombre: "La voz oficial", preguntas: ["¿Quién habla?", "¿A quién obliga?", "¿Cómo se discute?"],
    filas: [
      { k: "doct", t: "Doctrina general", col: "b", lam: ["f61"], norma: "Decreto 1742, art. 56",
        d: "La Subdirección de Normativa y Doctrina absuelve consultas generales. No califica asuntos particulares: explica en abstracto." },
      { k: "obliga", t: "Obliga a los funcionarios", col: "g", lam: ["f62", "f64"], norma: "Decreto 1742, arts. 55 y 56, pars.; Ley 2010, art. 131; C-514 de 2019",
        d: "Los conceptos publicados en la página web obligan a los empleados de la DIAN. El contribuyente puede sustentarse en la ley, entendida como todas las fuentes del derecho." },
      { k: "reconsid", t: "Reconsideración y asesoría", col: "o", lam: ["f63", "f65"], norma: "Decreto 1742, arts. 55, nums. 5 y 20, y 56, num. 2",
        d: "La reconsideración de un concepto de la Subdirección la absuelve la Dirección de Gestión Jurídica. La asesoría a los directores no obliga a quien la pidió." },
      { k: "repres", t: "Quién defiende a la DIAN", col: "y", lam: ["f66", "f67"], norma: "Decreto 1742, arts. 58 y 59",
        d: "Representación Externa: procesos no asignados a otra dependencia, conciliaciones, buzón judicial y Comité de Conciliación. Asuntos Penales: procesos penales, denuncias, reparación integral y preacuerdos." }
    ] },
  /* ---------- M07 · Ruta tributaria 2, desde el 30-oct-2026 ---------- */
  "m07-1": { nombre: "Tres maneras de liquidar", preguntas: ["¿Cuentas o fondo?", "¿Declaró o no?", "¿Desde cuándo corre?"],
    filas: [
      { k: "arit", t: "Corrección aritmética", col: "y", lam: ["f69", "f70", "f71"], norma: "ET, arts. 697-699 y 701",
        d: "Resultado mal anotado, tarifa mal aplicada u operación mal hecha, con menor valor a pagar. Dos años desde la presentación, sin requerimiento especial y sin gastar la revisión." },
      { k: "revision", t: "Revisión", col: "b", lam: ["f68", "f72"], norma: "ET, arts. 691 par., 702 y 703",
        d: "Problemas de fondo: una sola liquidación oficial de revisión, con un requerimiento especial previo. La firma hoy el jefe de fiscalización." },
      { k: "aforo", t: "Aforo", col: "o", lam: ["f68"], norma: "ET, arts. 715-717",
        d: "Para quien no declaró: emplazamiento previo, sanción por no declarar y liquidación oficial de aforo." }
    ] },
  "m07-2": { nombre: "El requerimiento especial", preguntas: ["¿Cuándo venció el plazo para responder?", "¿Hubo ampliación?", "¿Aceptó, corrigió y pagó?"],
    filas: [
      { k: "resp", t: "Tres meses para responder", col: "y", lam: ["f73", "f76"], norma: "ET, arts. 707 y 730, num. 2",
        d: "Desde la notificación, por escrito. La DIAN no puede liquidar antes de que venzan: sería nulo." },
      { k: "amp", t: "La ampliación", col: "b", lam: ["f74"], norma: "ET, art. 708",
        d: "Una sola vez, dentro de los tres meses siguientes al vencimiento del plazo para responder. Puede traer hechos nuevos y da entre tres y seis meses." },
      { k: "cuarta", t: "La cuarta parte", col: "p", lam: ["f75"], norma: "ET, art. 709",
        d: "Aceptar, corregir, adjuntar la corrección y probar el pago o el acuerdo: la sanción por inexactitud baja a la cuarta parte sobre lo aceptado." }
    ],
    nota: "La familia del tres: tres años para notificarlo, tres meses para responderlo, tres meses para ampliarlo." },
  "m07-3": { nombre: "La liquidación de revisión", preguntas: ["¿Desde qué vencimiento?", "¿Hubo pausas?", "¿Se limitó a lo propuesto?"],
    filas: [
      { k: "seis", t: "Seis meses", col: "y", lam: ["f77"], norma: "ET, art. 710",
        d: "Desde el vencimiento del plazo para responder el requerimiento especial o su ampliación; no desde la respuesta." },
      { k: "pausas", t: "Las pausas", col: "o", lam: ["f78"], norma: "ET, art. 710",
        d: "Inspección de oficio: tres meses. Inspección contable pedida: mientras dure. Prueba en documentos fuera del expediente: dos meses." },
      { k: "limite", t: "Solo lo propuesto y el segundo reloj", col: "b", lam: ["f79", "f80"], norma: "ET, arts. 711 y 714",
        d: "Solo los hechos del requerimiento o de su ampliación. Si la liquidación no llega en sus seis meses, la declaración queda en firme." },
      { k: "mitad", t: "La mitad", col: "p", lam: ["f81"], norma: "ET, art. 713",
        d: "Aceptar dentro del término para recurrir, corregir, presentar el memorial y pagar: la mitad de la sanción propuesta." }
    ] },
  "m07-4": { nombre: "El que no declara", preguntas: ["¿Declaró tras el emplazamiento?", "¿Cuál base es mayor?", "¿Cuánto falta para los cinco años?"],
    filas: [
      { k: "emp", t: "Emplazamiento previo", col: "y", lam: ["f82"], norma: "ET, arts. 641, 642 y 715",
        d: "Un mes. Si declara después: 10 % por mes o fracción, tope 200 %. Antes: 5 % y tope 100 %." },
      { k: "sanc", t: "Sanción por no declarar", col: "p", lam: ["f83", "f84"], norma: "ET, art. 643",
        d: "Renta: 20 % de la base mayor. Si declara dentro del plazo para recurrir, la mitad, con el piso del art. 642." },
      { k: "aforo", t: "Aforo", col: "o", lam: ["f85"], norma: "ET, arts. 638 y 717",
        d: "Cinco años desde el vencimiento del plazo para declarar. La sanción por no declarar también caduca en cinco años." }
    ] },
  "m07-5": { nombre: "El recurso de reconsideración", preguntas: ["¿Qué puerta?", "¿Cumple los requisitos?", "¿Pasó el año?"],
    filas: [
      { k: "puerta", t: "Un recurso o el juez", col: "b", lam: ["f86", "f87"], norma: "ET, arts. 720 y 735",
        d: "Reconsideración en dos meses; directo al juez en cuatro si atendió en debida forma el requerimiento especial. Clausura: reposición en diez días." },
      { k: "req", t: "Requisitos", col: "g", lam: ["f88", "f89"], norma: "ET, arts. 722 y 726",
        d: "Escrito, motivos concretos, a tiempo, por quien está habilitado. Agente oficioso solo abogado, con ratificación. Ya no se exige pagar la liquidación privada." },
      { k: "acept", t: "Lo aceptado y las nulidades", col: "o", lam: ["f90"], norma: "ET, arts. 723, 730 y 731",
        d: "No se discute lo aceptado al responder. Las nulidades, dentro del término del recurso." },
      { k: "anio", t: "Un año y silencio positivo", col: "y", lam: ["f91", "f92"], norma: "ET, arts. 732-734",
        d: "Un año desde la interposición en debida forma, con la pausa de la inspección. Sin decisión, el recurso se entiende fallado a favor." }
    ] },
  "m07-6": { nombre: "La revocatoria directa", preguntas: ["¿Recurrió?", "¿Está en los dos años?", "¿Pasó el año?"],
    filas: [
      { k: "proc", t: "Solo sin recursos", col: "o", lam: ["f93"], norma: "ET, art. 736",
        d: "Quien interpuso recursos no puede pedirla por ninguna causal." },
      { k: "plazos", t: "Dos años y un año", col: "y", lam: ["f94"], norma: "ET, arts. 737 y 738-1",
        d: "Dos años desde la ejecutoria para pedirla; un año para decidirla; si no, silencio positivo." },
      { k: "cpaca", t: "Frente al CPACA", col: "b", lam: ["f95"], norma: "CPACA, arts. 93-96",
        d: "En el CPACA puede pedirla quien recurrió (por dos causales), aun después de demandar, y se decide en dos meses sin silencio." }
    ] }
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
    check: { q: "Un agente de retención presentó a tiempo su declaración de retención, con 30 millones de pesos a cargo, pero sin pagar. No tiene saldos a favor y ya pasaron cuatro meses del vencimiento. ¿Qué le pasa a la declaración?",
      ops: [{ t: "No produce efecto legal alguno, sin necesidad de acto de la DIAN.", ok: true, por: "Art. 580-1: la ineficacia opera sola. Ninguna salida aplica: no hay saldo a favor, pasaron los dos meses y debe más de 10 UVT." },
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
    check: { q: "La inicial salió un mes y tres días tarde. Corrige sin que la DIAN le haya escrito. ¿Qué porcentaje de sanción por corrección le corresponde, antes de cualquier reducción?",
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
    cuerpo: ["Inspección tributaria de oficio: el término para notificar el requerimiento se suspende 3 meses, contados desde la notificación del auto que la decreta.",
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
             "No hay atajo con beneficios por zona geográfica, con retenciones inexistentes o si el impuesto de referencia es menor de 71 UVT (según la DIAN, el del año anterior)."],
    porque: "Más subes, más rápido quedas libre. Un solo incumplimiento quita el premio.",
    check: { q: "Subió el impuesto 40 %, presentó a tiempo, pero pagó la última cuota tarde. ¿En cuánto queda en firme?",
      ops: [{ t: "Tres años: faltó el pago total en los plazos.", ok: true, por: "Los requisitos se acumulan." },
            { t: "Seis meses: el aumento superó el 35 %.", ok: false, por: "Falta un requisito." },
            { t: "Doce meses, por el pago tardío.", ok: false, por: "El pago tardío no rebaja el beneficio: lo quita." }] } },
  /* ---------- M05 · La DIAN por dentro (capítulos 2 a 4), desde el 30-oct-2026 ---------- */
  { id: "e16", tema: "m05-2", mapa: "m05-2", foco: ["central"], lam: ["f40", "f41", "f42", "f43"],
    titulo: "Tres niveles y tres trampas del nivel central",
    cuerpo: ["La DIAN funciona en tres niveles: central, local y delegado. El delegado no está fijo en el decreto: lo autoriza el director general.",
             "Primera trampa: la Oficina de Tributación Internacional está en el despacho del director general, no en Fiscalización. Es la autoridad competente para el intercambio internacional de información.",
             "Segunda: la Dirección Operativa de Grandes Contribuyentes administra sus impuestos sin importar dónde estén. Un grande de Pereira no es de la seccional de Pereira.",
             "Tercera: el Comité Institucional Estratégico solo propone el Plan Estratégico. Lo aprueba el director general."],
    porque: "Lo que compromete al país, lo de los contribuyentes más grandes y el rumbo de la entidad se manejan desde arriba, en un solo punto.",
    check: { q: "Una sociedad con domicilio en Manizales fue calificada como gran contribuyente, y una administración tributaria extranjera acaba de pedir información sobre ella. ¿Qué dependencia administra sus impuestos?",
      ops: [{ t: "La Dirección Operativa de Grandes Contribuyentes, sin consideración de su ubicación.", ok: true, por: "Decreto 1742, art. 63." },
            { t: "La Dirección Seccional de Impuestos y Aduanas de Manizales, por su domicilio.", ok: false, por: "Para el gran contribuyente, el domicilio no manda." },
            { t: "La Oficina de Tributación Internacional, porque hay una administración extranjera de por medio.", ok: false, por: "Esa oficina canaliza el intercambio de información; no administra los impuestos del contribuyente." }] } },
  { id: "e17", tema: "m05-2", mapa: "m05-2", foco: ["firma", "grupos"], lam: ["f45", "f46", "f47", "f48"],
    titulo: "Mandar no es lo mismo que firmar",
    cuerpo: ["Firman los jefes de las dependencias. Para delegar, primero identifica el cargo de quien delega.",
             "Director general: delega en cualquier director de gestión o en el empleado que designe. Nivel directivo: en su dependencia y con autorización previa del director general. Jefe de división: con resolución del director seccional.",
             "En un grupo interno responde su jefe, sin perjuicio del jefe de la dependencia por la orientación y el control.",
             "Cualquier empleado puede practicar pruebas, salvo la inspección contable y la pericial contable: contador público. Ante jueces: abogado con poder."],
    porque: "Entre más alto el cargo, más alto el permiso para delegar. Y lo técnico lo hace quien tiene el título.",
    check: { q: "Un jefe de división de una seccional delega una de sus funciones en un profesional de su división mediante una resolución firmada por el director seccional. ¿Qué debe concluirse?",
      ops: [{ t: "Es válida: es la forma que el decreto exige para los jefes de división.", ok: true, por: "Decreto 1742, art. 80, inc. 3." },
            { t: "No es válida: faltó la autorización previa del director general.", ok: false, por: "Esa autorización se exige para delegar funciones del nivel directivo, no las de un jefe de división." },
            { t: "No es válida: los jefes de división no pueden delegar sus funciones.", ok: false, por: "Sí pueden, en empleados de su división y con resolución del director seccional." }] } },
  { id: "e18", tema: "m05-2", mapa: "m05-2", foco: ["conflicto", "local"], lam: ["f44", "f49", "f50", "f51"],
    titulo: "Cuando dos dependencias se pasan el expediente",
    cuerpo: ["El nivel local son 45 seccionales: 6 de impuestos, 7 de aduanas y 32 de impuestos y aduanas. Su director es el superior de todo lo que hay en ella.",
             "Para un conflicto de competencia, dos preguntas: ¿es dentro de la DIAN o con otra entidad?, ¿de qué nivel es cada parte?",
             "Dos dependencias de la misma seccional: el director seccional. Una del central y otra del local: el director general.",
             "La DIAN y otra autoridad del orden nacional: la Sala de Consulta y Servicio Civil del Consejo de Estado (CPACA, art. 39)."],
    porque: "Decide el primer jefe común de las dos partes. Si no lo hay, decide el juez de los conflictos.",
    check: { q: "La División de Recaudo y Cobranzas de una seccional y una subdirección del nivel central se devuelven un expediente de cobro. ¿Quién decide?",
      ops: [{ t: "El director general de la DIAN.", ok: true, por: "Conflicto entre el nivel central y el local: Decreto 1742, art. 8, num. 27." },
            { t: "El director de la seccional, porque el cobro es de su jurisdicción.", ok: false, por: "El director seccional solo dirime conflictos entre dependencias de su seccional." },
            { t: "La Sala de Consulta y Servicio Civil del Consejo de Estado.", ok: false, por: "El conflicto es dentro de la DIAN: no es la puerta del CPACA." }] } },
  { id: "e19", tema: "m05-3", mapa: "m05-3", foco: ["cuantia"], lam: ["f52", "f53", "f54"],
    titulo: "Tres escalones por cuantía",
    cuerpo: ["El recurso de reconsideración lo decide un escalón distinto según la cuantía del acto: impuestos y sanciones sumados.",
             "Sin cuantía o menos de 2.000 UVT: la división jurídica de quien profirió el acto.",
             "De 2.000 a menos de 20.000 UVT: la seccional que el decreto señala para la capital del departamento. 20.000 UVT o más: la Subdirección de Recursos Jurídicos.",
             "Con la UVT de 2026 (52.374 pesos): 104.748.000 y 1.047.480.000 pesos. Las mismas reglas valen para la revocatoria directa."],
    porque: "Entre más plata en discusión, más arriba se decide.",
    check: { q: "Una liquidación oficial de revisión trae un mayor impuesto de 60 millones de pesos y una sanción de 60 millones. Es de 2026 y la expidió una seccional que decide lo suyo. ¿En qué escalón está el recurso?",
      ops: [{ t: "En el segundo: suma 120 millones, más de 2.000 UVT y menos de 20.000.", ok: true, por: "La cuantía suma impuestos y sanciones: 120 millones pasan de 104.748.000 pesos." },
            { t: "En el primero: el mayor impuesto no llega a 2.000 UVT.", ok: false, por: "La cuantía comprende también la sanción." },
            { t: "En el tercero: toda liquidación con sanción sube al nivel central.", ok: false, por: "Lo que define el escalón es la cuantía, no que haya sanción." }] } },
  { id: "e20", tema: "m05-3", mapa: "m05-3", foco: ["lugar"], lam: ["f55", "f56"],
    titulo: "La capital, con nombres propios",
    cuerpo: ["El segundo escalón no se adivina: el decreto nombra a cada seccional.",
             "Tunja decide lo de Sogamoso; Bucaramanga, lo de Barrancabermeja; Pasto, lo de Ipiales y Tumaco; Riohacha, lo de Maicao. Una sola seccional, todas las materias.",
             "Donde hay dos seccionales, la de impuestos decide lo tributario y la de aduanas lo aduanero y cambiario: Bogotá (Girardot), Cali (Buenaventura, Palmira, Tuluá y Puerto Asís) y Medellín (Urabá).",
             "Las demás seccionales de impuestos y aduanas, y la Dirección Operativa de Grandes Contribuyentes, deciden sus propios recursos."],
    porque: "La capital del departamento recoge lo de las seccionales pequeñas, y la materia separa impuestos de aduanas.",
    check: { q: "La seccional de Puerto Asís impone una multa cambiaria de 4.000 UVT. ¿Quién decide el recurso?",
      ops: [{ t: "La división jurídica de la Dirección Seccional de Aduanas de Cali.", ok: true, por: "Puerto Asís va a Cali, y lo cambiario lo decide la de aduanas." },
            { t: "La división jurídica de la Dirección Seccional de Impuestos de Cali.", ok: false, por: "Esa decide lo tributario; lo cambiario va a la de aduanas." },
            { t: "La división jurídica de la seccional de Mocoa, capital del Putumayo.", ok: false, por: "En Mocoa no hay seccional: el decreto manda a Puerto Asís a Cali." }] } },
  { id: "e21", tema: "m05-3", mapa: "m05-3", foco: ["esp", "comite"], lam: ["f57", "f58", "f59", "f60"],
    titulo: "Las excepciones mandan primero",
    cuerpo: ["Antes de la cuantía, busca la regla especial.",
             "Mercancía aprehendida: decide la jurídica de la seccional, sin importar el valor. Garantía cuyo único objeto es hacerla efectiva: la jurídica de quien la expidió. Si además sanciona, vuelve la cuantía.",
             "La Subdirección de Recursos Jurídicos decide si avoca un recurso de menos de 20.000 UVT, y resuelve la revocatoria de sus propios actos sin importar la cuantía.",
             "Para la cuantía no se acumulan expedientes. Y en el tercer escalón, si el contribuyente lo pide, el expediente pasa por el Comité Técnico antes del fallo."],
    porque: "Lo que pasa con la mercancía se resuelve donde está; lo que el nivel central llama a sí o firmó, lo resuelve él.",
    check: { q: "Una seccional decomisa un lote de mercancía aprehendida avaluado en 32.000 UVT. ¿Quién decide el recurso?",
      ops: [{ t: "La división jurídica de esa seccional, cualquiera que sea el valor.", ok: true, por: "Decreto 1742, art. 69, par. 3, y art. 74." },
            { t: "La Subdirección de Recursos Jurídicos, porque pasa de 20.000 UVT.", ok: false, por: "En la mercancía aprehendida la cuantía no cuenta." },
            { t: "La seccional de la capital del departamento, por ser un acto aduanero.", ok: false, por: "La regla especial desplaza la cuantía y el lugar." }] } },
  { id: "e22", tema: "m05-4", mapa: "m05-4", foco: ["doct", "obliga"], lam: ["f61", "f62", "f64"],
    titulo: "Doctrina general y obligatoria",
    cuerpo: ["La Subdirección de Normativa y Doctrina es la autoridad doctrinaria nacional. Absuelve consultas generales.",
             "La doctrina «será de carácter general y no se referirá a asuntos particulares»: ante un caso concreto, explica en abstracto y no lo califica.",
             "Los conceptos publicados en la página web obligan a los empleados de la DIAN. Sin publicación, no hay obligatoriedad.",
             "El contribuyente puede sustentarse en la ley, y la Corte aclaró que «ley» comprende todas las fuentes del derecho (C-514 de 2019)."],
    porque: "Una entidad no puede hablar con dos voces; pero su voz ata a sus funcionarios, no a los ciudadanos.",
    check: { q: "Una gestora encuentra un concepto publicado de la Subdirección de Normativa y Doctrina que considera equivocado. Proyecta un acto sobre ese punto. ¿Qué hace?",
      ops: [{ t: "Lo aplica y, si lo cree equivocado, promueve su reconsideración.", ok: true, por: "El concepto publicado la obliga; la vía es la reconsideración ante la Dirección de Gestión Jurídica." },
            { t: "Se aparta de él y explica en el acto por qué no lo comparte.", ok: false, por: "No compartirlo no la libera de aplicarlo." },
            { t: "Lo aplica solo si el contribuyente lo invoca a su favor.", ok: false, por: "Obliga a los empleados en todos los casos, lo invoque o no el contribuyente." }] } },
  { id: "e23", tema: "m05-4", mapa: "m05-4", foco: ["reconsid"], lam: ["f63", "f65"],
    titulo: "Cómo se discute un concepto",
    cuerpo: ["Un concepto de la Subdirección de Normativa y Doctrina no se «apela» ante ella misma.",
             "Su reconsideración la absuelve la Dirección de Gestión Jurídica, que también profiere los conceptos unificados.",
             "Mientras se decide, el funcionario sigue aplicando el concepto publicado.",
             "Otra cosa es la asesoría jurídica que esas dependencias dan a los directores: no obliga a quien la pidió."],
    porque: "Se discute ante el superior, sin dejar de cumplir mientras tanto. Y quien pide consejo conserva la decisión.",
    check: { q: "Un director del nivel central pidió una asesoría jurídica a la Subdirección de Normativa y Doctrina y no comparte la respuesta. ¿Está obligado a seguirla?",
      ops: [{ t: "No: la asesoría no es vinculante para quien la pidió.", ok: true, por: "Decreto 1742, arts. 55, num. 5, y 56, num. 2." },
            { t: "Sí: todo pronunciamiento de esa Subdirección obliga a los empleados.", ok: false, por: "Lo que obliga es el concepto publicado, no la asesoría." },
            { t: "Sí, hasta que la Dirección de Gestión Jurídica la reconsidere.", ok: false, por: "La asesoría no obliga desde el principio." }] } },
  { id: "e24", tema: "m05-4", mapa: "m05-4", foco: ["repres"], lam: ["f66", "f67"],
    titulo: "Quién defiende a la DIAN",
    cuerpo: ["Dos subdirecciones del nivel central defienden a la entidad, cada una en su terreno.",
             "Representación Externa: procesos judiciales y administrativos no asignados a otra dependencia, conciliaciones, el buzón de notificaciones judiciales y el Comité de Conciliación y Defensa Judicial.",
             "Asuntos Penales: procesos penales por conductas que denuncian los empleados o en que la DIAN es víctima; denuncias, reparación integral y, ante el comité, preacuerdos y principios de oportunidad.",
             "Y quien actúe ante un juez debe ser abogado matriculado con poder."],
    porque: "Lo penal tiene su propio abogado; todo lo demás llega por la puerta de Representación Externa.",
    check: { q: "En un proceso por contrabando en que la DIAN es víctima, la defensa propone un preacuerdo. ¿Qué dependencia lo lleva al Comité de Conciliación y Defensa Judicial?",
      ops: [{ t: "La Subdirección de Asuntos Penales.", ok: true, por: "Decreto 1742, art. 59." },
            { t: "La Subdirección de Representación Externa, que gestiona el comité.", ok: false, por: "Gestiona el comité, pero los preacuerdos penales los lleva Asuntos Penales." },
            { t: "La división jurídica de la seccional que detectó el contrabando.", ok: false, por: "Detectar la conducta no da la representación en el proceso penal." }] } },
  /* ---------- M07 · Ruta tributaria 2, desde el 30-oct-2026 ---------- */
  { id: "e25", tema: "m07-1", mapa: "m07-1", foco: ["revision", "aforo"], lam: ["f68", "f72"],
    titulo: "Tres maneras de liquidar",
    cuerpo: ["La declaración es la liquidación privada. Frente a ella, la DIAN tiene tres caminos, cada uno con su acto, su plazo y su punto de partida.",
             "Error de cuentas: liquidación oficial de corrección aritmética. Problema de fondo: requerimiento especial y liquidación oficial de revisión, una sola vez.",
             "No declaró: emplazamiento previo por no declarar, sanción por no declarar y liquidación oficial de aforo.",
             "Hoy, el requerimiento especial y la liquidación de revisión los firma el jefe de fiscalización (art. 691, parágrafo)."],
    porque: "Antes de contar plazos, hay que saber en qué camino está el caso.",
    check: { q: "La DIAN encuentra que una sociedad dedujo pagos a proveedores que, según la investigación, nunca prestaron el servicio. ¿Qué camino tiene?",
      ops: [{ t: "Requerimiento especial y, después, liquidación oficial de revisión.", ok: true, por: "Es un problema de fondo: arts. 702 y 703." },
            { t: "Liquidación oficial de corrección aritmética.", ok: false, por: "No es una cuenta mal hecha." },
            { t: "Emplazamiento previo por no declarar.", ok: false, por: "La sociedad sí declaró." }] } },
  { id: "e26", tema: "m07-1", mapa: "m07-1", foco: ["arit"], lam: ["f69", "f70", "f71"],
    titulo: "Solo cuentas",
    cuerpo: ["Error aritmético: resultado mal anotado, tarifa mal aplicada u operación mal hecha. Siempre con un menor valor a pagar o un mayor saldo a favor.",
             "La DIAN lo corrige con liquidación oficial de corrección aritmética, sin requerimiento especial, dentro de los dos años siguientes a la presentación.",
             "Corregir la cuenta no le gasta la revisión: la corrección aritmética es «sin perjuicio de la facultad de revisión».",
             "Si el contribuyente no liquidó sus sanciones o las liquidó mal, la DIAN las liquida con un 30 % más; la mitad, si acepta, renuncia y paga a tiempo."],
    porque: "Una cuenta mal hecha se ve rápido; por eso tiene un plazo corto que corre desde que se presentó.",
    check: { q: "Una sociedad presentó su declaración tarde, el 13 de agosto de 2024. La DIAN detecta una suma mal hecha que bajó el impuesto el 3 de septiembre de 2026. ¿Puede proferir la liquidación oficial de corrección aritmética?",
      ops: [{ t: "No: los dos años desde la presentación vencieron el 13 de agosto de 2026.", ok: true, por: "Art. 699: dos años desde la presentación." },
            { t: "Sí: tiene tres años desde la presentación tardía.", ok: false, por: "Tres años es el término del requerimiento especial." },
            { t: "Sí: los errores de cuentas se corrigen en cualquier tiempo.", ok: false, por: "La DIAN tiene dos años para este acto." }] } },
  { id: "e27", tema: "m07-2", mapa: "m07-2", foco: ["resp"], lam: ["f73", "f76"],
    titulo: "Tres meses para responder",
    cuerpo: ["El requerimiento especial se responde por escrito dentro de los tres meses siguientes a su notificación.",
             "En la respuesta se puede objetar, pedir pruebas, subsanar omisiones y pedir inspecciones tributarias. Si son conducentes, la DIAN debe atenderlas.",
             "No responder no tiene sanción propia, pero cierra dos puertas: la cuarta parte y la demanda directa ante el juez.",
             "Y la DIAN no puede adelantarse: si liquida antes de que venzan los tres meses, la liquidación es nula."],
    porque: "El contribuyente se defiende antes de que la DIAN decida.",
    check: { q: "La DIAN notificó un requerimiento especial el 13 de mayo de 2026. ¿Hasta cuándo puede responderlo la sociedad?",
      ops: [{ t: "Hasta el 13 de agosto de 2026.", ok: true, por: "Tres meses desde la notificación (art. 707)." },
            { t: "Hasta el 13 de junio de 2026.", ok: false, por: "Un mes es el emplazamiento; el requerimiento especial da tres." },
            { t: "Hasta el 13 de noviembre de 2026.", ok: false, por: "Seis meses es el término de la DIAN para liquidar." }] } },
  { id: "e28", tema: "m07-2", mapa: "m07-2", foco: ["amp"], lam: ["f74"],
    titulo: "La ampliación",
    cuerpo: ["La DIAN puede ampliar el requerimiento especial una sola vez.",
             "Tiene tres meses contados desde el vencimiento del plazo para responder, no desde la notificación ni desde la fecha en que el contribuyente respondió.",
             "La ampliación puede traer hechos y conceptos nuevos y proponer una nueva determinación.",
             "El contribuyente la responde en el plazo que fije la DIAN: entre tres y seis meses."],
    porque: "Si la DIAN quiere decidir sobre algo nuevo, tiene que avisarlo antes, y darle tiempo al contribuyente.",
    check: { q: "Un requerimiento especial se notificó el 10 de marzo de 2026 y la sociedad lo respondió el 20 de mayo. ¿Hasta cuándo puede la DIAN ampliarlo?",
      ops: [{ t: "Hasta el 10 de septiembre de 2026.", ok: true, por: "El plazo para responder vencía el 10 de junio; la ampliación cabe en los tres meses siguientes." },
            { t: "Hasta el 20 de agosto de 2026.", ok: false, por: "No se cuenta desde la respuesta." },
            { t: "Hasta el 10 de junio de 2026.", ok: false, por: "Ese es el vencimiento del plazo para responder, el punto de partida." }] } },
  { id: "e29", tema: "m07-2", mapa: "m07-2", foco: ["cuarta"], lam: ["f75"],
    titulo: "La cuarta parte",
    cuerpo: ["Si al responder el requerimiento especial o su ampliación el contribuyente acepta los hechos, la sanción por inexactitud baja a la cuarta parte de la propuesta, sobre lo aceptado.",
             "Pero exige cuatro cosas a la vez: aceptar, corregir la declaración con los mayores valores y la sanción reducida, adjuntar la corrección y probar el pago o el acuerdo de pago.",
             "Si falta una, no hay rebaja.",
             "Quien acepta después, frente a la liquidación de revisión, paga la mitad."],
    porque: "Cuanto antes acepta, menos paga.",
    check: { q: "Al responder, una sociedad acepta un mayor impuesto cuya sanción propuesta es de 100 millones. Corrige, adjunta la corrección y firma un acuerdo de pago. ¿Qué sanción paga por ese hecho?",
      ops: [{ t: "25 millones: la cuarta parte.", ok: true, por: "Cumplió los cuatro requisitos; el acuerdo de pago vale (art. 709)." },
            { t: "50 millones: la mitad.", ok: false, por: "La mitad es para la aceptación posterior a la liquidación." },
            { t: "100 millones: sin pago no hay rebaja.", ok: false, por: "El acuerdo de pago sustituye el pago para este efecto." }] } },
  { id: "e30", tema: "m07-3", mapa: "m07-3", foco: ["seis", "pausas"], lam: ["f77", "f78"],
    titulo: "Seis meses y sus pausas",
    cuerpo: ["La liquidación oficial de revisión debe notificarse dentro de los seis meses siguientes al vencimiento del plazo para responder el requerimiento especial o su ampliación.",
             "Otra vez, el punto de partida es el vencimiento, no la respuesta.",
             "Pausas: inspección tributaria de oficio, tres meses; inspección contable pedida por el contribuyente, mientras dure; prueba pedida en documentos que no están en el expediente, dos meses.",
             "Antes de contar, pregunta: ¿qué pasó antes que mueva este reloj?"],
    porque: "La DIAN ya escuchó al contribuyente; si él pidió pruebas, el reloj de la DIAN espera.",
    check: { q: "El plazo para responder un requerimiento especial venció el 6 de febrero de 2026. El contribuyente pidió documentos que están en un banco, no en el expediente. No hubo ampliación. ¿Hasta cuándo puede la DIAN notificar la liquidación?",
      ops: [{ t: "Hasta el 6 de octubre de 2026.", ok: true, por: "Seis meses (6 de agosto) más dos de suspensión (art. 710)." },
            { t: "Hasta el 6 de agosto de 2026.", ok: false, por: "Olvida la suspensión de dos meses." },
            { t: "Hasta el 6 de noviembre de 2026.", ok: false, por: "La prueba en documentos suspende dos meses, no tres." }] } },
  { id: "e31", tema: "m07-3", mapa: "m07-3", foco: ["limite"], lam: ["f79", "f80"],
    titulo: "Solo lo propuesto y el segundo reloj",
    cuerpo: ["La liquidación de revisión se limita a los hechos del requerimiento especial o de su ampliación. La DIAN no puede sorprender en la decisión.",
             "Para agregar algo, debe ampliar el requerimiento a tiempo.",
             "Y hay un segundo reloj: si los seis meses vencen sin notificar la liquidación, la declaración queda en firme.",
             "Haber notificado a tiempo el requerimiento especial no basta."],
    porque: "Nadie se defiende de lo que no le han dicho, y cada paso de la DIAN tiene su reloj.",
    check: { q: "La liquidación de revisión agregó unos ingresos que no estaban en el requerimiento especial ni en su ampliación. ¿Qué debe hacer la sociedad?",
      ops: [{ t: "Alegar al discutir la liquidación que desconoce el art. 711.", ok: true, por: "La liquidación debe limitarse a lo propuesto." },
            { t: "Aceptarlos: la DIAN puede adicionar hechos hasta que decide.", ok: false, por: "Para eso estaba la ampliación." },
            { t: "Pedir la cuarta parte de la sanción por esos ingresos.", ok: false, por: "La rebaja no subsana que el hecho no se propuso." }] } },
  { id: "e32", tema: "m07-3", mapa: "m07-3", foco: ["mitad"], lam: ["f81"],
    titulo: "La mitad",
    cuerpo: ["Segunda oportunidad para pagar menos: aceptar los hechos de la liquidación de revisión dentro del término para interponer el recurso de reconsideración.",
             "La sanción por inexactitud baja a la mitad de la inicialmente propuesta, sobre lo aceptado.",
             "Requisitos paralelos: corregir, presentar un memorial ante la oficina de recursos con la corrección y probar el pago o el acuerdo.",
             "Con el requerimiento especial, la cuarta parte; con la liquidación, la mitad; fuera de término, nada."],
    porque: "Esperar tiene un precio: cada etapa que pasa cuesta más.",
    check: { q: "Tres meses después de recibir la liquidación de revisión, sin recurrirla, una sociedad acepta los hechos, corrige y paga. ¿Tiene la rebaja a la mitad?",
      ops: [{ t: "No: debía aceptar dentro de los dos meses del recurso.", ok: true, por: "Art. 713." },
            { t: "Sí: mientras la liquidación no esté en firme.", ok: false, por: "El plazo es el del recurso." },
            { t: "Sí, pero solo a la cuarta parte.", ok: false, por: "La cuarta parte era al responder el requerimiento especial." }] } },
  { id: "e33", tema: "m07-4", mapa: "m07-4", foco: ["emp"], lam: ["f82"],
    titulo: "El emplazamiento duplica el precio",
    cuerpo: ["A quien no declaró, la DIAN lo emplaza, previa comprobación de su obligación, para que declare en un mes.",
             "Si declara después del emplazamiento, paga el 10 % del impuesto por cada mes o fracción, sin pasar del 200 % (art. 642).",
             "Antes del emplazamiento habría pagado el 5 % por mes o fracción, con tope del 100 % (art. 641).",
             "La misma tarifa doble aplica a quien declara después del auto que ordena una inspección tributaria."],
    porque: "Esperar a que la DIAN te llame cuesta el doble.",
    check: { q: "Después del emplazamiento previo, una sociedad declara con 8 meses y 5 días de retraso. Su impuesto es de 60 millones. ¿Qué extemporaneidad liquida, antes de reducciones?",
      ops: [{ t: "54 millones: 10 % por 9 meses.", ok: true, por: "La fracción cuenta como mes: 9 meses al 10 % (art. 642)." },
            { t: "27 millones: 5 % por 9 meses.", ok: false, por: "El 5 % es para quien declara sin emplazamiento." },
            { t: "48 millones: 10 % por 8 meses.", ok: false, por: "Olvida la fracción de mes." }] } },
  { id: "e34", tema: "m07-4", mapa: "m07-4", foco: ["sanc"], lam: ["f83", "f84"],
    titulo: "La sanción por no declarar",
    cuerpo: ["Si vence el mes y no declara, la DIAN impone la sanción por no declarar en una resolución sanción.",
             "En renta: el 20 % de las consignaciones o ingresos que determine la DIAN, o de los ingresos de la última declaración, el que sea mayor. En IVA e impuesto al consumo, el 10 %.",
             "Si declara dentro del plazo para recurrir esa resolución, la sanción baja a la mitad, y la liquida y paga con la declaración.",
             "Pero nunca por debajo de la extemporaneidad del art. 642: ese es el piso."],
    porque: "Declarar tarde siempre sale más barato que no declarar.",
    check: { q: "La DIAN determinó consignaciones por 900 millones; la última declaración traía ingresos por 1.200 millones. ¿Cuál es la sanción por no declarar en renta?",
      ops: [{ t: "240 millones: 20 % de la base mayor.", ok: true, por: "Art. 643: se toma la mayor." },
            { t: "180 millones: 20 % de las consignaciones.", ok: false, por: "Esa es la base menor." },
            { t: "120 millones: 10 % de la base mayor.", ok: false, por: "El 10 % es la tarifa del IVA." }] } },
  { id: "e35", tema: "m07-4", mapa: "m07-4", foco: ["aforo"], lam: ["f85"],
    titulo: "La liquidación de aforo",
    cuerpo: ["Agotados el emplazamiento previo y la sanción por no declarar, la DIAN puede fijar el impuesto con una liquidación oficial de aforo.",
             "Tiene cinco años desde el vencimiento del plazo para declarar.",
             "La facultad de imponer la sanción por no declarar también se extingue en cinco años, aunque la regla general de las sanciones independientes es de dos.",
             "Tres años es la ruta de quien sí declaró; cinco, la de quien no declaró."],
    porque: "Quien no declaró no tiene una firmeza que lo proteja: la DIAN tiene más tiempo.",
    check: { q: "El plazo para declarar la renta de una sociedad vencía el 15 de mayo de 2024, y nunca declaró. ¿Hasta cuándo puede la DIAN proferir la liquidación de aforo?",
      ops: [{ t: "Hasta el 15 de mayo de 2029.", ok: true, por: "Cinco años desde el vencimiento (art. 717)." },
            { t: "Hasta el 15 de mayo de 2027.", ok: false, por: "Tres años es el requerimiento especial." },
            { t: "Hasta el 15 de mayo de 2026.", ok: false, por: "Dos años es la corrección aritmética." }] } },
  { id: "e36", tema: "m07-5", mapa: "m07-5", foco: ["puerta"], lam: ["f86", "f87"],
    titulo: "Un recurso, dos meses",
    cuerpo: ["Contra liquidaciones oficiales, sanciones y demás actos sobre impuestos procede un solo recurso: el de reconsideración, dentro de los dos meses siguientes a la notificación.",
             "Norma especial: contra la clausura del establecimiento, reposición en diez días.",
             "Si el contribuyente atendió en debida forma el requerimiento especial, puede saltarse el recurso y demandar directamente en cuatro meses.",
             "El CPACA no rige aquí: ni reposición y apelación en diez días, ni apelación obligatoria."],
    porque: "El Estatuto tiene su propio recurso, su propio plazo y su propia puerta al juez.",
    check: { q: "Una sociedad que respondió a tiempo el requerimiento especial recibe la liquidación de revisión el 8 de junio de 2026. ¿Hasta cuándo puede demandarla directamente?",
      ops: [{ t: "Hasta el 8 de octubre de 2026.", ok: true, por: "Cuatro meses (art. 720, par.)." },
            { t: "Hasta el 8 de agosto de 2026.", ok: false, por: "Dos meses es el recurso de reconsideración." },
            { t: "No puede: el recurso es obligatorio.", ok: false, por: "Esa es la lógica del CPACA." }] } },
  { id: "e37", tema: "m07-5", mapa: "m07-5", foco: ["req"], lam: ["f88", "f89"],
    titulo: "Los requisitos del recurso",
    cuerpo: ["Por escrito, con motivos concretos, a tiempo y por el contribuyente o su apoderado, que para recurrir debe ser abogado.",
             "El agente oficioso solo puede ser abogado, y la persona debe ratificar dentro de los dos meses siguientes a la notificación del auto admisorio.",
             "Ya no se exige pagar la liquidación privada: la Corte lo declaró inexequible en el año 2000.",
             "Contra el auto que inadmite, solo reposición, en diez días."],
    porque: "El recurso abre una discusión seria: exige motivos y alguien habilitado, pero no pagar primero.",
    check: { q: "Un contador, sin poder y sin ser abogado, interpone el recurso como agente oficioso, y la empresa ratifica a tiempo. ¿Es válido?",
      ops: [{ t: "No: solo los abogados pueden ser agentes oficiosos.", ok: true, por: "Art. 722." },
            { t: "Sí: la ratificación oportuna lo convalida.", ok: false, por: "La ratificación no suple la calidad de abogado." },
            { t: "Sí, si además acredita el pago de la liquidación privada.", ok: false, por: "Ese requisito es inexequible y no suple la calidad." }] } },
  { id: "e38", tema: "m07-5", mapa: "m07-5", foco: ["acept"], lam: ["f90"],
    titulo: "Lo que ya no se discute",
    cuerpo: ["En el recurso no pueden objetarse los hechos que se aceptaron expresamente al responder el requerimiento especial o su ampliación.",
             "Las nulidades se alegan dentro del término del recurso, en el escrito o en una adición.",
             "Causales: funcionario incompetente, omisión del requerimiento especial o de su término, omisión de bases o explicaciones, procedimientos concluidos y otras que la ley declare.",
             "La causal de «no notificarse dentro del término legal» ya no existe."],
    porque: "Lo aceptado, aceptado queda; y lo que se reclama, se reclama a tiempo.",
    check: { q: "En el recurso, una sociedad quiere discutir unos costos cuyo rechazo aceptó expresamente al responder el requerimiento especial. ¿Puede?",
      ops: [{ t: "No: lo aceptado al responder no se discute en el recurso.", ok: true, por: "Art. 723." },
            { t: "Sí: el recurso abre de nuevo toda la discusión.", ok: false, por: "El art. 723 lo excluye." },
            { t: "Sí, si alega una nulidad sobre ese punto.", ok: false, por: "La nulidad no revive los hechos aceptados." }] } },
  { id: "e39", tema: "m07-5", mapa: "m07-5", foco: ["anio"], lam: ["f91", "f92"],
    titulo: "Un año y el silencio positivo",
    cuerpo: ["La DIAN tiene un año para resolver el recurso, desde su interposición en debida forma.",
             "La inspección tributaria suspende ese año: mientras dure, si la pidió el contribuyente; hasta tres meses, si es de oficio.",
             "Si el año pasa sin decisión notificada, el recurso se entiende fallado a favor del recurrente, y la DIAN debe declararlo.",
             "En el CPACA, el silencio en los recursos es negativo a los dos meses. Aquí, un año y positivo."],
    porque: "La DIAN no puede dejar al contribuyente esperando sin consecuencias.",
    check: { q: "Un recurso se interpuso en debida forma, sin inspecciones. A los trece meses la DIAN no ha firmado ni notificado nada. ¿Qué pasó?",
      ops: [{ t: "Operó el silencio positivo: se entiende fallado a favor.", ok: true, por: "Arts. 732 y 734." },
            { t: "Se entiende negado, y queda abierta la vía judicial.", ok: false, por: "Ese es el silencio negativo del CPACA." },
            { t: "Nada: la DIAN puede decidir mientras no se declare el silencio.", ok: false, por: "El efecto se produce al vencer el año." }] } },
  { id: "e40", tema: "m07-6", mapa: "m07-6", foco: ["proc", "plazos", "cpaca"], lam: ["f93", "f94", "f95"],
    titulo: "La revocatoria directa",
    cuerpo: ["En el Estatuto, la revocatoria directa procede solo si el contribuyente no interpuso los recursos.",
             "Se pide dentro de los dos años siguientes a la ejecutoria del acto.",
             "La DIAN tiene un año para decidir; si no lo hace, opera el silencio positivo, que debe declararse.",
             "En el CPACA, quien recurrió puede pedirla por interés público o agravio injustificado, aun después de demandar, y se decide en dos meses sin silencio. Aquí no."],
    porque: "Es la segunda oportunidad de quien no discutió el acto, con plazo y con silencio positivo.",
    check: { q: "Una sociedad perdió el recurso de reconsideración contra una sanción. Un año después pide la revocatoria directa por agravio injustificado. ¿Procede?",
      ops: [{ t: "No: quien interpuso recursos no puede pedirla por ninguna causal.", ok: true, por: "Art. 736." },
            { t: "Sí: el agravio injustificado la permite aunque haya recurrido.", ok: false, por: "Esa es la regla del CPACA." },
            { t: "Sí, porque está dentro de los dos años desde la ejecutoria.", ok: false, por: "El plazo no salva la improcedencia." }] } }
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
    enunciado: "La sanción por corrección que debe liquidar la empresa, antes de cualquier reducción, asciende a",
    ops: [
      { t: "3,6 millones de pesos, que equivalen al veinte por ciento del mayor impuesto originado en la glosa por falta de soportes.", ok: true,
        por: "Es correcta. La corrección después del emplazamiento cuesta el 20 % (art. 644, num. 2). Pero el art. 685, inc. 2, permite corregir «sin sanción de corrección en lo que respecta a» las diferencias de criterio que la DIAN señale en el emplazamiento. La sanción recae solo sobre los 18 millones de la primera glosa: 3,6 millones." },
      { t: "6 millones de pesos, que equivalen al veinte por ciento de todo el mayor impuesto que liquidó la corrección.", ok: false, err: "requisito",
        por: "Aplica el 20 % a toda la corrección y olvida que la parte que la propia DIAN calificó como diferencia de criterio no lleva sanción." },
      { t: "3 millones de pesos, el diez por ciento de todo el mayor impuesto, porque la empresa corrigió por su voluntad.", ok: false, err: "momento",
        por: "El 10 % es para quien corrige antes del emplazamiento. Aquí corrigió después: la tarifa es del 20 %. Además toma como base todo el mayor impuesto, sin descontar la diferencia de criterio." }
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
    llevar: "Si falla el sistema de la DIAN: un solo día de gracia, el siguiente al restablecimiento. Después, extemporaneidad." },
  /* ============ Actualización M05 (capítulos 2 a 4) · 30-oct-2026 · casos inéditos ============
     No repiten los casos de la lección M05, de la Arena M05 ni del ejercicio «¿Quién decide el recurso?» del Centro DIAN Exprés. */

  /* ===================== F13 · El decomiso que parecía de tercer escalón ===================== */
  { id: "F13", tema: "m05-3", sub: "s-excrec", tec: "T6", lam: ["f57", "f52", "f55"],
    caso: "En un control posterior, funcionarios de la Dirección Seccional de Impuestos y Aduanas de Barrancabermeja aprehendieron cuatro tractocamiones que, según la investigación, ingresaron al país sin declaración de importación. Agotado el procedimiento, la División de Fiscalización y Liquidación Aduanera de esa seccional expidió el acto que definió la situación jurídica de los vehículos y ordenó su decomiso. El avalúo de los cuatro tractocamiones asciende a 26.000 UVT. El importador interpuso el recurso dentro del término.",
    enunciado: "La competencia para decidir el recurso radica en",
    ops: [
      { t: "la Subdirección de Recursos Jurídicos, porque el valor de los bienes involucrados alcanza el tercer escalón de cuantía.", ok: false, err: "general",
        por: "Es la regla general de cuantía (20.000 UVT o más), pero aquí no se aplica: cuando el acto define la situación jurídica de mercancía aprehendida, decide la jurídica de la seccional, cualquiera que sea el valor (Decreto 1742 de 2020, art. 69, par. 3)." },
      { t: "la división jurídica de la Dirección Seccional de Impuestos y Aduanas de Bucaramanga, por ser la de la capital del departamento.", ok: false, err: "vecina",
        por: "Bucaramanga decide el segundo escalón de Barrancabermeja, pero esa regla tampoco entra: la regla especial de la mercancía aprehendida desplaza tanto la cuantía como el lugar." },
      { t: "la dependencia jurídica de la misma seccional de Barrancabermeja, sin consideración al avalúo de los vehículos.", ok: true,
        por: "Es correcta. El acto define la situación jurídica de mercancía aprehendida: decide la división jurídica de la seccional de aduanas o de impuestos y aduanas, cualquiera que sea el valor (Decreto 1742 de 2020, art. 69, par. 3, y art. 74). Los 26.000 UVT no lo suben al nivel central." }
    ],
    paseo: [
      { t: "Primero: ¿qué clase de acto es?", txt: "Antes de mirar cifras, el experto identifica el acto. No es una liquidación ni una multa: es el que define la situación jurídica de mercancía aprehendida. Eso activa una regla especial.",
        m: [{ s: "aprehendieron cuatro tractocamiones", c: "b" }, { s: "definió la situación jurídica de los vehículos y ordenó su decomiso", c: "g", n: "Regla especial: art. 69, par. 3" }] },
      { t: "El número que distrae", txt: "26.000 UVT empuja hacia el tercer escalón. Pero en la mercancía aprehendida la cuantía no cuenta: decide la jurídica de la seccional, cualquiera que sea el valor.",
        m: [{ s: "26.000 UVT", c: "p", n: "Aquí no cuenta" }] },
      { t: "El lugar que distrae", txt: "Barrancabermeja queda en Santander, y su segundo escalón lo decide Bucaramanga. Esa regla tampoco entra: la especial desplaza la cuantía y el lugar.",
        m: [{ s: "Dirección Seccional de Impuestos y Aduanas de Barrancabermeja", c: "o" }] },
      { t: "Descartar", txt: "La primera opción aplica la regla general de cuantía; la segunda, la del lugar. La tercera aplica la excepción.", o: [0, 1] }
    ],
    llevar: "Mercancía aprehendida: decide la jurídica de la seccional, cualquiera que sea el valor. Primero las excepciones, después la cuantía y el lugar." },

  /* ===================== F14 · La sanción que cruza el umbral ===================== */
  { id: "F14", tema: "m05-3", sub: "s-escalon", tec: "T7", lam: ["f52", "f53", "f55"],
    caso: "La Dirección Seccional de Impuestos y Aduanas de Girardot profirió en julio de 2026 una liquidación oficial de revisión contra una clínica de la ciudad. El acto determinó un mayor impuesto de renta de 61.300.000 pesos y una sanción por inexactitud de 44.100.000 pesos. La clínica interpuso el recurso de reconsideración dentro del término. Ninguna dependencia del nivel central ha avocado el conocimiento del asunto.",
    enunciado: "Teniendo en cuenta que la UVT de 2026 es de 52.374 pesos, el recurso debe decidirlo",
    ops: [
      { t: "la división jurídica de la Dirección Seccional de Impuestos y Aduanas de Girardot, porque el mayor impuesto determinado no alcanza las 2.000 UVT.", ok: false, err: "verdad",
        por: "Es cierto que el mayor impuesto (61.300.000 pesos, unas 1.170 UVT) no llega a 2.000 UVT. Pero la cuantía comprende los mayores valores por impuestos y sanciones: 105.400.000 pesos, unas 2.012 UVT." },
      { t: "la división jurídica de la Dirección Seccional de Impuestos de Bogotá, porque la suma de los valores en discusión supera las 2.000 UVT.", ok: true,
        por: "Es correcta. Impuesto más sanción: 105.400.000 pesos, unas 2.012 UVT. Está en el segundo escalón (de 2.000 a menos de 20.000 UVT), y lo tributario de Girardot lo decide la seccional de Impuestos de Bogotá (Decreto 1742 de 2020, art. 69, num. 2)." },
      { t: "la división jurídica de la Dirección Seccional de Aduanas de Bogotá, porque a ella le corresponde el segundo escalón de los actos de Girardot.", ok: false, err: "vecina",
        por: "La seccional de Aduanas de Bogotá decide el segundo escalón de Girardot solo en lo aduanero y cambiario. Una liquidación de renta es tributaria." }
    ],
    paseo: [
      { t: "Ubicar el acto", txt: "Es una liquidación oficial de revisión: determinación con sanción, sin mercancía ni garantía, y nadie avocó. Rige la regla de cuantía.",
        m: [{ s: "liquidación oficial de revisión", c: "b" }, { s: "Ninguna dependencia del nivel central ha avocado", c: "b", n: "Sin excepción" }] },
      { t: "Sumar antes de dividir", txt: "La cuantía suma impuestos y sanciones: 61.300.000 + 44.100.000 = 105.400.000 pesos. Dividido por 52.374, unas 2.012 UVT. Pasa el umbral de 2.000 por muy poco: 2.000 UVT son 104.748.000 pesos.",
        m: [{ s: "61.300.000 pesos", c: "p" }, { s: "44.100.000 pesos", c: "p" }, { s: "52.374 pesos", c: "y", n: "2.000 UVT = 104.748.000" }] },
      { t: "El lugar y la materia", txt: "Girardot queda en Cundinamarca: su segundo escalón lo decide Bogotá. Como es renta, decide la de Impuestos; la de Aduanas solo lo aduanero y cambiario.",
        m: [{ s: "mayor impuesto de renta", c: "g", n: "Tributario" }] },
      { t: "Descartar", txt: "La primera opción mira solo el impuesto y olvida la sanción. La tercera acierta el lugar, pero no la materia.", o: [0, 2] }
    ],
    llevar: "La cuantía suma impuesto y sanción. En Bogotá, Cali y Medellín: impuestos con impuestos, aduanas con aduanas." },

  /* ===================== F15 · La delegación por memorando ===================== */
  { id: "F15", tema: "m05-2", sub: "s-delega", tec: "T8", lam: ["f46", "f45"],
    caso: "El jefe de la División de Recaudo y Cobranzas de la Dirección Seccional de Impuestos y Aduanas de Armenia, con más de trescientos expedientes represados, firmó un memorando interno en el que le asignó a una profesional de su división una de las funciones que el decreto le atribuye a él como jefe. El director seccional conoció el memorando por correo electrónico y respondió: «De acuerdo, adelante». Semanas después, un contribuyente alega que el acto que recibió, firmado por esa profesional, fue expedido sin competencia.",
    enunciado: "Frente a la alegación del contribuyente, lo jurídicamente correcto es concluir que",
    ops: [
      { t: "la profesional actuó con competencia, porque la delegación recayó en una empleada de la misma división y el superior manifestó su conformidad.", ok: false, err: "requisito",
        por: "Cumple el destinatario (una empleada de la división), pero no la forma: el decreto exige resolución de quien ejerza la jefatura de la Dirección Seccional. Un memorando con un «de acuerdo» por correo no es esa resolución." },
      { t: "la delegación no se perfeccionó, porque para las funciones de un jefe de división se exige resolución de quien ejerce la jefatura de la seccional.", ok: true,
        por: "Es correcta. Las funciones de los jefes de división se delegan en empleados de esas divisiones «mediante resolución de quien ejerza la jefatura de la Dirección Seccional» (Decreto 1742 de 2020, art. 80, inc. 3). Sin ese acto, la profesional no tenía competencia y el acto queda expuesto a nulidad." },
      { t: "la delegación sería válida si el director general la hubiera autorizado previamente, requisito que en este caso no se acreditó.", ok: false, err: "vecina",
        por: "La autorización previa del director general es la regla para delegar funciones del nivel directivo. Para un jefe de división, lo que falta es la resolución del director seccional." }
    ],
    paseo: [
      { t: "¿Quién delega?", txt: "El experto empieza por el cargo del delegante, porque de eso depende la regla. Es un jefe de división de una seccional: art. 80, inc. 3. En empleados de su división y mediante resolución del director seccional.",
        m: [{ s: "El jefe de la División de Recaudo y Cobranzas", c: "b", n: "Jefe de división" }] },
      { t: "¿Con qué instrumento?", txt: "Un memorando interno firmado por el propio jefe, y un «de acuerdo» por correo del director. Ninguno de los dos es la resolución de quien ejerce la jefatura de la seccional.",
        m: [{ s: "firmó un memorando interno", c: "o", n: "No es resolución" }, { s: "«De acuerdo, adelante»", c: "o" }] },
      { t: "La consecuencia", txt: "Una delegación mal hecha deja a la delegataria sin competencia, y sus actos quedan expuestos a nulidad. El contribuyente tiene un argumento serio.",
        m: [{ s: "firmado por esa profesional", c: "g" }] },
      { t: "Descartar", txt: "La primera opción cuenta el destinatario y olvida la forma. La tercera trae la regla del nivel directivo.", o: [0, 2] }
    ],
    llevar: "Delegación: primero el cargo de quien delega. Jefe de división: en empleados de su división y con resolución del director seccional." },

  /* ===================== F16 · El concepto que el gestor no comparte ===================== */
  { id: "F16", tema: "m05-4", sub: "s-doctrina", tec: "T5", lam: ["f62", "f63", "f64"],
    caso: "Un gestor de la División de Fiscalización y Liquidación Tributaria de la Dirección Seccional de Impuestos y Aduanas de Pereira proyecta una liquidación oficial de revisión. Al estudiar el punto central de la discusión, encuentra un concepto de la Subdirección de Normativa y Doctrina, publicado en la página web de la entidad, que favorece la tesis del contribuyente. A su juicio, el concepto contradice el Estatuto Tributario. Su jefe le sugiere separarse de él, motivando el acto, porque «la doctrina no es ley y los funcionarios también se rigen por la ley».",
    enunciado: "La actuación que se ajusta a las normas que rigen la doctrina de la DIAN es que el gestor",
    ops: [
      { t: "proyecte el acto conforme al concepto publicado y, si lo considera contrario a la ley, promueva su reconsideración ante la Dirección de Gestión Jurídica.", ok: true,
        por: "Es correcta. Los conceptos publicados de la Subdirección de Normativa y Doctrina son interpretación oficial obligatoria para los empleados de la DIAN (Decreto 1742 de 2020, art. 56, par.), y su reconsideración la absuelve la Dirección de Gestión Jurídica (art. 55, num. 20)." },
      { t: "se aparte del concepto con una motivación suficiente, porque las actuaciones ante la administración pueden sustentarse en la ley y no en la doctrina.", ok: false, err: "vecina",
        por: "Mezcla una regla verdadera con el sujeto equivocado: sustentar las actuaciones «con base en la ley» es una garantía de los contribuyentes (Ley 2010 de 2019, art. 131). A los empleados, el concepto publicado los obliga." },
      { t: "solicite a la Subdirección de Normativa y Doctrina que reconsidere su concepto y suspenda el proyecto hasta que ella se pronuncie.", ok: false, err: "inventada",
        por: "La reconsideración no la decide la misma Subdirección, sino la Dirección de Gestión Jurídica. Y ninguna norma suspende el proyecto mientras tanto: el concepto sigue obligando." }
    ],
    paseo: [
      { t: "¿Qué clase de pronunciamiento es?", txt: "Un concepto de la Subdirección de Normativa y Doctrina, publicado en la página web. Están las dos condiciones: lo expidió la autoridad doctrinaria y está publicado.",
        m: [{ s: "publicado en la página web de la entidad", c: "g", n: "Condición de obligatoriedad" }] },
      { t: "¿A quién obliga?", txt: "A los empleados públicos de la DIAN. El gestor no puede apartarse solo porque no lo comparte.",
        m: [{ s: "Un gestor de la División de Fiscalización y Liquidación Tributaria", c: "b", n: "Empleado: obligado" }] },
      { t: "La frase que distrae", txt: "«La doctrina no es ley» trae palabras verdaderas de otra norma: la que permite a los contribuyentes sustentarse en la ley. No libera al funcionario.",
        m: [{ s: "«la doctrina no es ley y los funcionarios también se rigen por la ley»", c: "o", n: "Regla de los contribuyentes" }] },
      { t: "¿Cómo se discute?", txt: "Pidiendo la reconsideración a la Dirección de Gestión Jurídica, no a la misma Subdirección. Mientras tanto, se aplica.", o: [1, 2] }
    ],
    llevar: "Concepto publicado: el funcionario lo aplica aunque no lo comparta, y lo discute ante la Dirección de Gestión Jurídica." },

  /* ===================== F17 · «No es de nuestro resorte» ===================== */
  { id: "F17", tema: "m05-2", sub: "s-conflicto", tec: "T1", lam: ["f49", "f50"],
    caso: "La División Jurídica de la Dirección Seccional de Impuestos y Aduanas de Neiva recibió un escrito en el que un contribuyente pide que se le aclare el alcance de un emplazamiento que le notificaron. Lo remitió a la División de Fiscalización y Liquidación Tributaria de la misma seccional, que lo devolvió con un oficio: «No es de nuestro resorte». La División Jurídica insistió con otro oficio, y el escrito lleva cinco semanas sin respuesta. Un funcionario propone enviar el asunto a la Sala de Consulta y Servicio Civil del Consejo de Estado, «que es la que resuelve los conflictos entre autoridades nacionales».",
    enunciado: "Para destrabar el trámite, la autoridad a la que corresponde definir cuál dependencia debe atender el escrito es",
    ops: [
      { t: "la Sala de Consulta y Servicio Civil del Consejo de Estado, porque las dos dependencias hacen parte de una autoridad del orden nacional.", ok: false, err: "vecina",
        por: "El art. 39 del CPACA resuelve conflictos entre autoridades distintas. Aquí las dos dependencias son de la misma entidad y de la misma seccional: la Sala no es su superior." },
      { t: "el director general de la entidad, porque le corresponde dirimir los conflictos de competencia entre dependencias de la DIAN.", ok: false, err: "verdad",
        por: "El director general dirime los conflictos entre las direcciones del nivel central y las del nivel local. Entre dos dependencias de una misma seccional decide el director seccional." },
      { t: "el director de la seccional de Neiva, porque el desacuerdo se presenta entre dos dependencias de esa misma seccional.", ok: true,
        por: "Es correcta. El director seccional dirime los conflictos de competencia entre las dependencias de su seccional (Decreto 1742 de 2020, art. 70, num. 11)." }
    ],
    paseo: [
      { t: "Traducir el rodeo", txt: "«No es de nuestro resorte» y el ir y venir de oficios describen un conflicto negativo de competencia: dos dependencias se declaran incompetentes.",
        m: [{ s: "«No es de nuestro resorte»", c: "o", n: "= se declara incompetente" }, { s: "La División Jurídica insistió con otro oficio", c: "b" }] },
      { t: "¿Una entidad o dos?", txt: "Las dos dependencias son de la DIAN: el art. 39 del CPACA no es la puerta. La frase del funcionario trae palabras verdaderas de esa norma, pero para otro supuesto.",
        m: [{ s: "«que es la que resuelve los conflictos entre autoridades nacionales»", c: "o", n: "Regla vecina" }] },
      { t: "¿De qué nivel es cada parte?", txt: "Las dos divisiones son de la seccional de Neiva. Decide su director (art. 70, num. 11). Si una fuera del nivel central, decidiría el director general.",
        m: [{ s: "de la misma seccional", c: "g", n: "Misma seccional" }] },
      { t: "Descartar", txt: "La primera opción aplica el CPACA a un conflicto interno. La segunda sube el conflicto un piso de más.", o: [0, 1] }
    ],
    llevar: "Conflicto de competencia: ¿una entidad o dos?, ¿de qué nivel es cada parte? Misma seccional: decide su director." },
  /* ============ Actualización M07 «Ruta tributaria 2» · 30-oct-2026 · casos inéditos ============
     No repiten los casos de la lección M07 (Agroinsumos del Meta, Seguridad Opita, Lácteos del Sur, Hotel Rodadero Azul,
     Transportes Frontera, Distribuidora Tolima Grande, Ferretería El Puente) ni los del Centro DIAN Exprés.
     Fechas de vencimiento en días hábiles. */

  /* ===================== F18 · Las respuestas anticipadas ===================== */
  { id: "F18", tema: "m07-3", sub: "s-seismeses", tec: "T3", lam: ["f77", "f74", "f78"],
    caso: "El 11 de marzo de 2025, la DIAN le notificó a una comercializadora de repuestos de Bucaramanga un requerimiento especial sobre su declaración de renta del año gravable 2022. La sociedad respondió por escrito el 27 de mayo de 2025. El 2 de julio de 2025, la DIAN le notificó un nuevo acto que agregó a la propuesta inicial unos pagos al exterior que no se habían cuestionado, y le concedió cinco meses para pronunciarse sobre él. La sociedad se pronunció el 18 de noviembre de 2025. En el expediente no hay inspecciones tributarias ni solicitudes de pruebas pendientes.",
    enunciado: "La DIAN puede notificar válidamente la liquidación oficial de revisión",
    ops: [
      { t: "hasta el 11 de diciembre de 2025, seis meses después del vencimiento del término para responder el requerimiento inicial.", ok: false, err: "momento",
        por: "Sería correcta si no hubiera habido ampliación. Con ampliación, los seis meses corren desde el vencimiento del plazo para responderla (art. 710)." },
      { t: "hasta el 18 de mayo de 2026, seis meses después de la fecha en que la sociedad se pronunció sobre el acto del 2 de julio.", ok: false, err: "inventada",
        por: "Los seis meses no se cuentan desde la respuesta, sino desde el vencimiento del plazo para darla." },
      { t: "hasta el 2 de junio de 2026, seis meses después del vencimiento del término fijado para pronunciarse sobre el acto del 2 de julio.", ok: true,
        por: "Es correcta. El acto del 2 de julio es la ampliación del requerimiento especial, notificada a tiempo. Su plazo de respuesta, cinco meses, venció el 2 de diciembre de 2025, y desde allí corren los seis meses (arts. 708 y 710)." }
    ],
    paseo: [
      { t: "Traducir el rodeo", txt: "«Un nuevo acto que agregó a la propuesta inicial» unos pagos no cuestionados es la ampliación del requerimiento especial. Llegó dentro de los tres meses siguientes al vencimiento del plazo para responder, que era el 11 de junio de 2025.",
        m: [{ s: "un nuevo acto que agregó a la propuesta inicial unos pagos al exterior que no se habían cuestionado", c: "b", n: "= ampliación" }] },
      { t: "El punto de partida", txt: "Con ampliación, los seis meses corren desde el vencimiento del plazo para responderla: cinco meses desde el 2 de julio de 2025, es decir, el 2 de diciembre de 2025.",
        m: [{ s: "le concedió cinco meses para pronunciarse sobre él", c: "y", n: "Vence el 2 de diciembre de 2025" }] },
      { t: "Las fechas que distraen", txt: "Las dos respuestas fueron anticipadas. No mueven nada: se cuenta desde el vencimiento del plazo, no desde la respuesta.",
        m: [{ s: "respondió por escrito el 27 de mayo de 2025", c: "o" }, { s: "se pronunció el 18 de noviembre de 2025", c: "o", n: "No es el punto de partida" }] },
      { t: "Sin pausas, y descartar", txt: "Nada suspende el término: 2 de diciembre de 2025 más seis meses, 2 de junio de 2026. La primera opción olvida la ampliación; la segunda cuenta desde la respuesta.",
        m: [{ s: "no hay inspecciones tributarias ni solicitudes de pruebas pendientes", c: "g" }], o: [0, 1] }
    ],
    llevar: "Seis meses desde el vencimiento del plazo para responder la ampliación, si la hubo. Las respuestas anticipadas no mueven el reloj." },

  /* ===================== F19 · El pago que no cubrió la sanción ===================== */
  { id: "F19", tema: "m07-2", sub: "s-cuarta", tec: "T8", lam: ["f75"],
    caso: "Al responder dentro del término el requerimiento especial, una sociedad hotelera de Cartagena aceptó que omitió ingresos por arrendamiento de salones. Sobre ese hecho, la DIAN había propuesto un mayor impuesto de 70 millones de pesos y una sanción por inexactitud de 70 millones. La sociedad corrigió su declaración incluyendo el mayor impuesto y una sanción reducida de 17,5 millones, adjuntó a la respuesta copia de la corrección y el recibo de pago del mayor impuesto con sus intereses, y anunció que pagaría la sanción cuando la DIAN le confirmara su valor.",
    enunciado: "Frente a la sanción por inexactitud de los ingresos aceptados, la DIAN debe",
    ops: [
      { t: "reconocer la reducción a la cuarta parte, porque la sociedad aceptó los hechos al responder y corrigió con la sanción reducida.", ok: false, err: "requisito",
        por: "Cuenta tres requisitos y calla el cuarto: la prueba del pago o del acuerdo de pago de los impuestos y de las sanciones, incluida la de inexactitud reducida (art. 709)." },
      { t: "negar la reducción, porque con la respuesta no se probó el pago ni el acuerdo de pago de la sanción reducida.", ok: true,
        por: "Es correcta. El art. 709 exige adjuntar la prueba del pago o del acuerdo de pago de impuestos, retenciones y sanciones, incluida la de inexactitud reducida. Pagar solo el impuesto y anunciar el pago de la sanción no lo cumple." },
      { t: "reducir la sanción a la mitad, porque el pago del mayor impuesto demuestra la aceptación de los hechos.", ok: false, err: "vecina",
        por: "La mitad es la reducción del art. 713, para quien acepta después de la liquidación de revisión, y también exige el pago." }
    ],
    paseo: [
      { t: "La regla y sus cuatro piezas", txt: "Aceptar al responder, corregir con la sanción reducida, adjuntar la corrección y probar el pago o el acuerdo de pago de impuestos y sanciones (art. 709). El experto revisa una por una.",
        m: [{ s: "Al responder dentro del término el requerimiento especial", c: "y" }, { s: "corrigió su declaración incluyendo el mayor impuesto y una sanción reducida de 17,5 millones", c: "b", n: "Corrección: sí" }, { s: "adjuntó a la respuesta copia de la corrección", c: "b", n: "Copia: sí" }] },
      { t: "La pieza que falta", txt: "Pagó el mayor impuesto y los intereses, pero no la sanción. La norma exige el pago o el acuerdo de pago también de la sanción por inexactitud reducida.",
        m: [{ s: "el recibo de pago del mayor impuesto con sus intereses", c: "p", n: "Falta la sanción" }, { s: "anunció que pagaría la sanción cuando la DIAN le confirmara su valor", c: "o", n: "Anunciar no es pagar" }] },
      { t: "Descartar", txt: "La primera opción cuenta tres requisitos y calla el cuarto. La tercera trae la mitad del art. 713, que es para otro momento.", o: [0, 2] }
    ],
    llevar: "La cuarta parte exige las cuatro piezas, y el pago debe cubrir también la sanción reducida." },

  /* ===================== F20 · La mitad que quedó bajo el piso ===================== */
  { id: "F20", tema: "m07-4", sub: "s-sancnodecl", tec: "T5", lam: ["f83", "f84", "f82"],
    caso: "Una empresa de transporte de Montería no presentó su declaración de renta del año gravable 2023, aunque estaba obligada. Previa comprobación de su obligación, la DIAN la emplazó para declarar, y venció el mes sin respuesta. Luego le notificó la resolución que le impuso la sanción por no declarar, calculada sobre los ingresos brutos de su última declaración de renta, 900 millones de pesos, porque las consignaciones bancarias que pudo establecer sumaban 640 millones. Dentro del plazo para recurrir esa resolución, la empresa presentó la declaración, con un impuesto a cargo de 80 millones de pesos y con 22 meses y 12 días de retardo.",
    enunciado: "Sin considerar otras reducciones, la sanción por no declarar que la empresa debe liquidar y pagar con su declaración es de",
    ops: [
      { t: "160 millones de pesos, porque la sanción reducida no puede ser inferior a la de extemporaneidad.", ok: true,
        por: "Es correcta. La sanción impuesta es el 20 % de 900 millones: 180 millones. Al declarar dentro del plazo para recurrir, baja a la mitad, 90 millones, pero no puede quedar por debajo de la extemporaneidad del art. 642: 23 meses al 10 % superan el tope, que es el 200 % de 80 millones, 160 millones (art. 643, par. 2)." },
      { t: "90 millones de pesos, que corresponden a la mitad de la sanción impuesta por la DIAN.", ok: false, err: "verdad",
        por: "Es la mitad, pero olvida el piso: la sanción reducida nunca puede ser inferior a la extemporaneidad del art. 642, que aquí es de 160 millones." },
      { t: "64 millones de pesos, que corresponden a la mitad de la sanción calculada sobre las consignaciones.", ok: false, err: "lectura",
        por: "Usa la base menor. El art. 643 manda tomar la mayor, y la DIAN la tomó: 900 millones." }
    ],
    paseo: [
      { t: "La sanción impuesta", txt: "En renta, el 20 % de la base mayor: los ingresos de la última declaración (900 millones) superan las consignaciones (640). El 20 % de 900 son 180 millones (art. 643).",
        m: [{ s: "900 millones de pesos", c: "p", n: "Base mayor" }, { s: "640 millones", c: "o", n: "Base menor" }] },
      { t: "La rebaja", txt: "Declaró dentro del plazo para recurrir la resolución: la sanción baja a la mitad, 90 millones (art. 643, par. 2).",
        m: [{ s: "Dentro del plazo para recurrir esa resolución, la empresa presentó la declaración", c: "y" }] },
      { t: "El piso que decide", txt: "La mitad no puede quedar por debajo de la extemporaneidad del art. 642: 22 meses y 12 días son 23 meses o fracción; al 10 %, el 230 %, con tope del 200 %: 160 millones. Gana el piso.",
        m: [{ s: "80 millones de pesos", c: "p" }, { s: "22 meses y 12 días de retardo", c: "y", n: "23 meses: tope del 200 %" }] },
      { t: "Descartar", txt: "La segunda opción olvida el piso. La tercera usa la base menor.", o: [1, 2] }
    ],
    llevar: "Sanción por no declarar: 20 % de la base mayor; la mitad si declara a tiempo, pero nunca por debajo de la extemporaneidad del art. 642." },

  /* ===================== F21 · La puerta cerrada ===================== */
  { id: "F21", tema: "m07-5", sub: "s-recurso", tec: "T1", lam: ["f86", "f87", "f92"],
    caso: "El 9 de septiembre de 2025, la DIAN le notificó a una distribuidora de insumos médicos de Valledupar el acto con el que le proponía desconocer unas deducciones de su declaración de renta del año gravable 2022, con la explicación de sus razones y la cuantificación del mayor impuesto y de la sanción. La distribuidora no presentó escrito alguno frente a esa propuesta. El 4 de junio de 2026, la DIAN le notificó personalmente el acto que modificó la declaración en los mismos términos. Su revisor fiscal sostiene que, como en cualquier actuación administrativa, debe interponer reposición y en subsidio apelación dentro de los diez días siguientes; su abogado externo prefiere demandar de una vez ante el juez.",
    enunciado: "Para controvertir el acto notificado el 4 de junio de 2026, la distribuidora debe",
    ops: [
      { t: "interponer reposición y, en subsidio, apelación, dentro de los diez días siguientes a la notificación del acto.", ok: false, err: "vecina",
        por: "Es el esquema del CPACA. El Estatuto tiene norma propia: un solo recurso, el de reconsideración, en dos meses (art. 720)." },
      { t: "demandar ante la jurisdicción de lo contencioso administrativo dentro de los cuatro meses siguientes, sin agotar recurso alguno.", ok: false, err: "requisito",
        por: "La demanda directa exige haber atendido en debida forma el requerimiento especial (art. 720, par.), y la distribuidora no lo respondió." },
      { t: "interponer el recurso de reconsideración a más tardar el 4 de agosto de 2026, porque no tiene abierta la demanda directa.", ok: true,
        por: "Es correcta. Contra la liquidación oficial de revisión procede el recurso de reconsideración, dentro de los dos meses siguientes a su notificación (art. 720). Como no respondió el requerimiento especial, no puede saltárselo." }
    ],
    paseo: [
      { t: "Traducir el rodeo", txt: "El acto que «proponía desconocer unas deducciones», con razones y cuantificación, es el requerimiento especial. El que «modificó la declaración» es la liquidación oficial de revisión.",
        m: [{ s: "el acto con el que le proponía desconocer unas deducciones", c: "b", n: "= requerimiento especial" }, { s: "el acto que modificó la declaración en los mismos términos", c: "b", n: "= liquidación de revisión" }] },
      { t: "El dato que cierra una puerta", txt: "La distribuidora no respondió el requerimiento especial. La demanda directa exige haberlo atendido en debida forma.",
        m: [{ s: "no presentó escrito alguno frente a esa propuesta", c: "g", n: "Sin demanda directa" }] },
      { t: "El recurso y su plazo", txt: "Queda el recurso de reconsideración: dos meses desde el 4 de junio, hasta el 4 de agosto de 2026. El esquema del revisor fiscal es el del CPACA.",
        m: [{ s: "como en cualquier actuación administrativa", c: "o", n: "CPACA: no rige aquí" }] },
      { t: "Descartar", txt: "La primera opción aplica el CPACA. La segunda abre una puerta que exige haber respondido el requerimiento especial.", o: [0, 1] }
    ],
    llevar: "Sin respuesta al requerimiento especial no hay demanda directa: recurso de reconsideración en dos meses." },

  /* ===================== F22 · El año que se alargó ===================== */
  { id: "F22", tema: "m07-5", sub: "s-silencio", tec: "T2", lam: ["f91"],
    caso: "Una constructora de Ibagué interpuso en debida forma, el 15 de julio de 2025, el recurso de reconsideración contra una liquidación oficial de revisión. En el escrito pidió que se practicara una inspección tributaria en sus oficinas, y la DIAN la practicó entre el 2 de febrero y el 13 de marzo de 2026. La DIAN notificó la decisión que confirmó la liquidación el 5 de agosto de 2026. No hubo otras suspensiones. La constructora sostiene que, como pasó más de un año desde la interposición del recurso, este debe entenderse fallado a su favor.",
    enunciado: "Sobre la oportunidad de la decisión, lo correcto es concluir que",
    ops: [
      { t: "operó el silencio administrativo positivo, porque la decisión se notificó más de un año después de la interposición del recurso.", ok: false, err: "verdad",
        por: "Es cierto que pasó más de un año, pero el término se suspendió mientras duró la inspección que pidió la constructora (art. 733)." },
      { t: "la decisión es oportuna, porque el término para fallar se suspendió mientras duró la inspección que pidió la constructora.", ok: true,
        por: "Es correcta. El año corría hasta el 15 de julio de 2026, pero la inspección pedida por la contribuyente lo suspendió mientras duró: unos cuarenta días. El término se corrió hasta la segunda quincena de agosto, y la decisión se notificó el 5 de agosto." },
      { t: "operó el silencio administrativo negativo, y la constructora puede demandar el acto inicial ante el juez.", ok: false, err: "vecina",
        por: "El silencio negativo en los recursos es del CPACA. En el Estatuto, vencido el año, el silencio es positivo; y aquí el año no había vencido." }
    ],
    paseo: [
      { t: "El año", txt: "La DIAN tiene un año desde la interposición en debida forma: hasta el 15 de julio de 2026, si nada lo suspende (art. 732).",
        m: [{ s: "el 15 de julio de 2025", c: "y" }] },
      { t: "Lo que mueve el reloj", txt: "La inspección la pidió la constructora: el término se suspende mientras dure (art. 733). Del 2 de febrero al 13 de marzo de 2026 van unos cuarenta días, y el año se corre hasta la segunda quincena de agosto.",
        m: [{ s: "En el escrito pidió que se practicara una inspección tributaria", c: "g", n: "La pidió ella: mientras dure" }, { s: "entre el 2 de febrero y el 13 de marzo de 2026", c: "y", n: "Unos 40 días" }] },
      { t: "La conclusión", txt: "La decisión se notificó el 5 de agosto de 2026, antes de que venciera el término ampliado. La constructora olvida la suspensión.",
        m: [{ s: "el 5 de agosto de 2026", c: "y" }, { s: "como pasó más de un año desde la interposición del recurso", c: "o", n: "Olvida la suspensión" }] },
      { t: "Descartar", txt: "La primera opción calla la suspensión. La tercera trae el silencio negativo del CPACA.", o: [0, 2] }
    ],
    llevar: "Antes de declarar el silencio positivo, busca la inspección: si la pidió el contribuyente, suspende el año mientras dure." },

  /* ===================== F23 · La revocatoria sin respuesta ===================== */
  { id: "F23", tema: "m07-6", sub: "s-revoc", tec: "T6", lam: ["f93", "f94", "f95"],
    caso: "El 4 de marzo de 2024, la DIAN le notificó a una papelería de Manizales una resolución que le impuso una sanción por no enviar información. La papelería no interpuso recurso alguno, y la resolución quedó ejecutoriada en mayo de 2024. El 13 de enero de 2026, la papelería pidió en debida forma la revocatoria directa de la sanción. El 17 de marzo de 2027, la DIAN profirió y notificó una resolución que negó la solicitud.",
    enunciado: "Sobre la solicitud de revocatoria directa, lo correcto es concluir que",
    ops: [
      { t: "se entiende resuelta a favor de la papelería, porque la DIAN no la decidió dentro del año siguiente a la petición.", ok: true,
        por: "Es correcta. La revocatoria procedía (no hubo recursos) y se pidió a tiempo (dentro de los dos años desde la ejecutoria). La DIAN tenía un año desde la petición, hasta el 13 de enero de 2027; vencido sin decisión, opera el silencio positivo, que debe declararse (arts. 736, 737 y 738-1)." },
      { t: "era improcedente, porque cuando se pidió el acto ya estaba ejecutoriado.", ok: false, err: "inventada",
        por: "La ejecutoria no impide la revocatoria: es el punto desde el que corren los dos años para pedirla (art. 737)." },
      { t: "la DIAN podía negarla en cualquier tiempo, porque en la revocatoria directa no opera el silencio administrativo.", ok: false, err: "vecina",
        por: "Es la regla del CPACA. En el Estatuto, la DIAN tiene un año y opera el silencio positivo (art. 738-1)." }
    ],
    paseo: [
      { t: "¿Procede?", txt: "La papelería no interpuso recurso: la revocatoria directa procede (art. 736). Y la pidió dentro de los dos años siguientes a la ejecutoria, que corrían hasta mayo de 2026 (art. 737).",
        m: [{ s: "no interpuso recurso alguno", c: "g", n: "Procede" }, { s: "quedó ejecutoriada en mayo de 2024", c: "y" }, { s: "El 13 de enero de 2026", c: "y", n: "Dentro de los dos años" }] },
      { t: "El año para decidir", txt: "La DIAN tenía un año desde la petición en debida forma: hasta el 13 de enero de 2027. Profirió y notificó el 17 de marzo de 2027.",
        m: [{ s: "El 17 de marzo de 2027", c: "y", n: "Fuera del año" }] },
      { t: "La consecuencia, y descartar", txt: "Vencido el año sin decisión, la solicitud se entiende resuelta a favor, y el silencio positivo debe declararse de oficio o a petición de parte. Lo de «sin silencio» es del CPACA.", o: [1, 2] }
    ],
    llevar: "Revocatoria directa en el Estatuto: sin recursos, dentro de dos años desde la ejecutoria, y un año para decidir con silencio positivo." },

  /* ===================== F24 · La suma que se corrigió tarde ===================== */
  { id: "F24", tema: "m07-1", sub: "s-aritm", tec: "T7", lam: ["f69", "f70"],
    caso: "Una tostadora de café de Popayán presentó el 22 de abril de 2024 su declaración de renta del año gravable 2023, dentro del plazo. Al trasladar al total de costos los valores que ella misma detalló, anotó una cifra mayor, y el impuesto quedó más bajo. El 27 de mayo de 2026, sin haberle enviado antes ningún requerimiento, la DIAN le notificó un acto que corrigió esa suma y le liquidó el mayor impuesto. La tostadora alega que la DIAN actuó fuera de tiempo.",
    enunciado: "Frente a la alegación de la tostadora, lo correcto es concluir que el acto",
    ops: [
      { t: "es extemporáneo, porque los dos años para corregir ese error se cuentan desde la presentación de la declaración.", ok: true,
        por: "Es correcta. Es una liquidación oficial de corrección aritmética, y debía proferirse dentro de los dos años siguientes a la presentación (art. 699): hasta el 22 de abril de 2026." },
      { t: "es oportuno, porque la DIAN tiene tres años desde el vencimiento del plazo para declarar para modificar la declaración.", ok: false, err: "vecina",
        por: "Los tres años desde el vencimiento son el término del requerimiento especial, no el de la corrección aritmética." },
      { t: "es oportuno, porque los errores de cálculo pueden corregirse en cualquier tiempo, a solicitud o de oficio.", ok: false, err: "vecina",
        por: "«En cualquier tiempo» es la corrección de errores de forma que no afectan el valor (Ley 962, art. 43). Este error bajó el impuesto." }
    ],
    paseo: [
      { t: "¿Qué acto es?", txt: "Un acto que, sin requerimiento previo, corrige una suma mal trasladada que bajó el impuesto: es la liquidación oficial de corrección aritmética (arts. 697 y 698).",
        m: [{ s: "anotó una cifra mayor, y el impuesto quedó más bajo", c: "b", n: "Error aritmético" }, { s: "sin haberle enviado antes ningún requerimiento", c: "b", n: "= corrección aritmética" }] },
      { t: "El reloj de ese acto", txt: "Dos años desde la presentación (art. 699): del 22 de abril de 2024 al 22 de abril de 2026. El acto llegó el 27 de mayo de 2026, un mes tarde.",
        m: [{ s: "presentó el 22 de abril de 2024", c: "y", n: "Desde aquí" }, { s: "El 27 de mayo de 2026", c: "y", n: "Tarde" }] },
      { t: "Los relojes vecinos", txt: "Los tres años desde el vencimiento son del requerimiento especial; «en cualquier tiempo» es la corrección de errores que no afectan el valor.", o: [1, 2] }
    ],
    llevar: "Corrección aritmética: dos años desde la presentación, no desde el vencimiento." }
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


/* ===== __cfg__ ===== */
APP.cfg = {"nombre":"Mérito","nombreProvisional":false,"version":"2026-10-30.2","vapid":"BMHjDsDzqZzJwUuLUqKU-vnQ_pdJJ0uMfnUX0-ISuTzsraFRPXn5IZRL_aV2cvsOK0wXnxZbNuaxdYg4EFOsLqk","url":"https://jdylaura.github.io/"};
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
      v: 1, who: who, proyecto: "dian2676", temas: APP.temasTodos(),
      meta: 15, sonido: true, creado: new Date().toISOString(),
      xp: 0, racha: { n: 0, ult: null, comodines: 0, max: 0 }, dias: {},
      lam: {}, esc: {}, fam: {}, sub: {}, sim: { intentos: [], vistos: {}, fallados: {} }, af: {},
      logros: {}, mision: null, records: { contrarreloj: 0 }, duelos: [], modoRetro: "final", onboard: false
    };
  }
  /* Temas sacados de los datos: un tema nuevo llega encendido a los perfiles que ya existían. */
  APP.temasTodos = function () { var o = {}; APP.proyecto().temas.forEach(function (t) { o[t.id] = true; }); return o; };
  APP.temasFuncionales = function () { return APP.proyecto().temas.filter(function (t) { return t.tipo === "funcional"; }).map(function (t) { return t.id; }); };
  APP.mapasIds = function () { return APP.temasFuncionales().filter(function (id) { return D.mapas[id]; }).sort(); };
  function migrarTemas(p) {
    if (!p || !p.temas) return;
    var cambio = false;
    APP.proyecto().temas.forEach(function (t) { if (!(t.id in p.temas)) { p.temas[t.id] = true; cambio = true; } });
    if (cambio) APP.store.save();
  }
  APP.perfil = function () {
    var s = APP.store.load();
    if (!s.activo || !s.perfiles[s.activo]) return null;
    migrarTemas(s.perfiles[s.activo]);
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
      var func = APP.temasFuncionales().some(function (id) { return T[id]; });
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
    { id: "mapa", t: "Todos los mapas", d: "Todas las escenas vistas." },
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
    if (M.filas) {
      /* Mapa genérico: una fila por pieza (temas desde la actualización M05-M07). */
      h += '<div class="stack">' + M.filas.map(function (r) {
        var open = opts.all || unlockedAny(r.lam) || foco.indexOf(r.k) >= 0;
        var cls = "branch" + (foco.indexOf(r.k) >= 0 ? " focus" : "") + (open ? "" : " locked");
        if (!open) return '<div class="' + cls + '"><div class="row">' + APP.ic("lock", ' width="18" height="18"') + "<b>" + U.esc(r.t) + '</b></div><span class="small muted">Se desbloquea en una escena</span></div>';
        return '<button class="' + cls + '" data-act="lamina" data-id="' + r.lam[0] + '"><div class="flow"><span class="mk ' + (r.col || "b") + '"><b>' + U.esc(r.t) + "</b></span></div>" +
          '<div class="small">' + U.esc(r.d) + '</div><div class="tiny">' + U.esc(r.norma) + "</div></button>";
      }).join("") + "</div>";
      if (M.nota) h += '<p class="small muted">' + U.esc(M.nota) + "</p>";
    } else if (mapaId === "m06-1") {
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
    var how = lv === 0 ? ((D.paginas.filter(function (pg) { return pg.id === l.pag; })[0] || {}).tipo === "funcional" ? "Se obtiene en una escena de la sección Memoria." : "Se obtiene al responder afirmaciones de esa competencia o de ese valor.")
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
    var step = pr.step || 0, draft = pr.draft || { temas: APP.temasTodos(), meta: 15 };
    var html = '<div class="scr full"><div class="onb">';
    if (step === 0) {
      var pl = APP.plataforma(), movil = pl.ios || pl.android;
      html += '<div class="stack"><div class="brand"><span class="brand-mark">' + esc(APP.cfg.nombre) + '</span></div>' +
        '<h2 style="font-size:30px;line-height:1.1">Diez a quince minutos al día para llegar al 8 de noviembre con los datos en su lugar.</h2>' +
        '<p class="lede">Escenas de un minuto, casos gemelos, un álbum que se llena con lo que dominas y simulacros con el formato de la DIAN 2676.</p>' +
        '<p class="small muted">Todo se guarda en este celular. No necesita cuenta ni contraseña.</p></div>';
      if (pl.standalone || pr.aqui) {
        html += '<button class="btn cta block" data-act="n0">Empezar</button>';
      } else if (movil && pl.samsung) {
        html += '<div class="card stack" style="box-shadow:0 0 0 2px var(--bad)"><b>En el Samsung, instálala desde Chrome</b><p class="small">Desde este navegador (Samsung Internet), Google Play Protect bloquea la instalación. Toca el botón y te explico cómo abrirla en Chrome, paso a paso.</p>' +
          '<button class="btn cta block" data-act="go" data-view="instalar">Cómo abrirla en Chrome</button>' +
          "</div>" + '<button class="link" data-act="aqui">Probarla aquí sin instalar</button>';
      } else if (movil) {
        html += '<div class="card stack"><b>Primero, instálala en tu pantalla de inicio</b><p class="small">Así tendrás su ícono como cualquier app, funcionará sin internet y podrá enviarte los avisos diarios. Toma un minuto.</p>' +
          (pl.ios ? '<p class="small"><b>Importante en el iPhone:</b> lo que hagas aquí, en Safari, no pasa a la app instalada. Instálala antes de empezar.</p>' : "") +
          (pl.android && APP.installPrompt ? '<button class="btn cta block" data-act="inst">Instalar ahora</button><p class="tiny" style="text-align:center">Luego, en la ventanita que aparece abajo, toca «Instalar».</p>' : "") +
          '<button class="btn ' + (pl.android && APP.installPrompt ? "soft" : "cta") + ' block" data-act="go" data-view="instalar">Cómo instalarla, paso a paso</button>' +
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
      inst: function () { var e = APP.installPrompt; if (!e) return; e.prompt(); e.userChoice.then(function (r) { if (r.outcome === "accepted") APP.toast("Instalada. Búscala en tu pantalla de inicio.", "check"); APP.installPrompt = null; APP.rerender(); }); },
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
      '<button class="menu-btn" data-act="menu" aria-label="Menú: más opciones">' + APP.ic("burger") + "<span>Menú</span></button></div>";
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
      '<p class="lede">Cada capítulo cabe en un mapa, y cada mapa responde tres preguntas. El día de la prueba, recuerdas el mapa y respondes las tres.</p>';
    var modAnt = "";
    APP.mapasIds().forEach(function (mid) {
      var mod = mid.split("-")[0].toUpperCase();
      if (mod !== modAnt) { modAnt = mod; h += '<h3 style="margin-top:6px">' + esc((D.modulos && D.modulos[mod]) || mod) + "</h3>"; }
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
    var m = pr.m || APP.mapasIds()[0];
    var h = '<div class="scr">' + APP.top("Los mapas") + '<div class="row wrap">' +
      APP.mapasIds().map(function (id) { return '<button class="chip pick' + (id === m ? " on" : "") + '" data-act="tab" data-m="' + id + '">' + esc(D.mapas[id].nombre) + "</button>"; }).join("") + "</div>" +
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
      { k: "func", t: "Prueba funcional", d: "Juicio situacional: un caso, un enunciado y tres opciones. Casos de los módulos M05, M06 y M07 que tengas encendidos.", tema: APP.temasFuncionales(), ids: D.casos.filter(function (c) { return p.temas[c.tema]; }).map(function (c) { return c.id; }), corto: 4, meta: "Unos 3 minutos y medio por caso" },
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
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault(); APP.installPrompt = e;
    var c = APP.current && APP.current();
    if (c && (c.name === "instalar" || c.name === "onb")) APP.rerender();
  });
  APP.plataforma = function () {
    var ua = navigator.userAgent || "";
    var ios = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    var android = /Android/.test(ua), samsung = /SamsungBrowser/.test(ua);
    var standalone = (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
    var safari = ios && /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|GSA/.test(ua);
    return { ios: ios, android: android, samsung: samsung, standalone: standalone, safari: safari };
  };
  V.instalar = function () {
    var pl = APP.plataforma(), url = location.origin + location.pathname.replace(/index\.html$/, ""), dir = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
    var I = function (k) { return '<span class="ill">' + APP.ic(k) + "</span>"; };
    var paso = function (t) { return "<li><span>" + t + "</span></li>"; };
    var h = '<div class="scr">' + APP.top("Instalar en el celular");
    if (pl.standalone) {
      h += '<div class="card stack"><h2>Ya está instalada</h2><p class="muted">La abriste desde el ícono de tu pantalla de inicio. No tienes que hacer nada más.</p></div>';
    } else if (pl.ios) {
      h += '<p class="lede">En el iPhone se instala desde Safari. No pasa por la App Store y se quita como cualquier ícono. Haz un paso a la vez.</p>';
      if (!pl.safari) h += '<div class="card stack" style="box-shadow:0 0 0 2px var(--bad)"><b>Estás en otro navegador. Ábrela en Safari.</b><p class="small">Toca «Copiar la dirección», abre <b>Safari</b> (la brújula azul), toca la barra de la dirección, mantén el dedo y toca <b>Pegar y abrir</b>.</p><button class="btn soft block" data-act="copiarDir">Copiar la dirección</button></div>';
      h += '<ol class="steps-guide">' +
        paso("Mira la parte de <b>abajo</b> de Safari. Si no ves ninguna barra, toca una vez el borde de abajo de la pantalla y aparece.") +
        paso("Si en esa barra ves un <b>cuadrado con una flecha hacia arriba</b> " + I("share") + ", tócalo y salta al paso 4.") +
        paso("Si en cambio ves <b>tres puntitos</b> " + I("dots") + " (a la derecha de la barra donde está la dirección), tócalos. Se abre un menú: toca <b>Compartir</b> " + I("share") + ".") +
        paso("Se abre una hoja con íconos de apps arriba y una lista de acciones abajo. Desliza esa lista hacia arriba con el dedo hasta ver <b>Agregar a inicio</b> " + I("plusbox") + " (puede decir <b>Agregar a pantalla de inicio</b>). Tócalo.") +
        paso("Si no está en la lista: al final de la lista toca <b>Editar acciones</b>, busca <b>Agregar a inicio</b>, toca el <b>+</b> verde y luego <b>OK</b> arriba. Vuelve a la lista y tócalo.") +
        paso("Aparece una ventanita con el ícono (un chulo amarillo) y el nombre <b>" + esc(APP.cfg.nombre) + "</b>. Si hay un interruptor <b>Abrir como app web</b>, déjalo encendido (en verde).") +
        paso("Toca <b>Agregar</b>, arriba a la derecha de esa ventanita.") +
        paso("Sal de Safari: desliza el dedo hacia arriba desde el borde inferior de la pantalla. Busca el ícono <b>" + esc(APP.cfg.nombre) + "</b>; si no lo ves, desliza las páginas de apps hacia la izquierda hasta la última.") +
        paso("Toca el ícono para abrirla. <b>Desde ahora ábrela siempre desde ese ícono</b>, no desde Safari: lo que hagas en Safari no pasa a la app instalada.") + "</ol>" +
        '<div class="card sunk small"><b>Para ver el ícono más grande:</b> mantén el dedo sobre un espacio vacío de la pantalla de inicio hasta que los íconos se muevan, toca <b>Editar</b> arriba a la izquierda, luego <b>Personalizar</b> y elige <b>Grande</b>.</div>';
    } else if (pl.android && pl.samsung) {
      h += '<div class="card stack" style="box-shadow:0 0 0 2px var(--bad)"><b>En el Samsung, instálala desde Chrome, no desde este navegador.</b><p class="small">Si la instalas desde <b>Samsung Internet</b>, Google Play Protect la bloquea con el aviso «Se bloqueó la app no segura». Si te aparece, toca <b>Entendido</b> y <b>no</b> toques «Instalar de todas formas».</p></div>' +
        '<ol class="steps-guide">' +
        paso("Toca el botón amarillo <b>Copiar la dirección</b> que está aquí abajo.") +
        paso("Sal de este navegador: desliza el dedo hacia arriba desde el borde inferior de la pantalla.") +
        paso("Abre <b>Chrome</b>: es un círculo rojo, amarillo y verde con el centro azul. Si no lo ves, desliza hacia arriba en la pantalla de inicio para ver todas las apps y escribe <b>Chrome</b> en la barra de búsqueda de arriba.") +
        paso("En Chrome, toca la barra de arriba que dice <b>Buscar o escribir dirección web</b>, mantén el dedo en ella y toca <b>Pegar</b>. Luego toca la tecla azul de la flecha del teclado.") +
        paso("Se abre Mérito dentro de Chrome. Toca <b>Cómo instalarla</b> y sigue los pasos que te muestra ahí.") + "</ol>" +
        '<button class="btn cta block" data-act="copiarDir">Copiar la dirección</button>';
    } else if (pl.android) {
      h += '<p class="lede">En el Samsung se instala desde <b>Chrome</b>. No pasa por Play Store y se quita como cualquier app. Haz un paso a la vez.</p>';
      if (APP.installPrompt) h += '<div class="card stack"><b>La forma más fácil</b><ol class="steps-guide">' + paso("Toca el botón amarillo <b>Instalar ahora</b>.") + paso("Abajo aparece una ventanita con el ícono y el nombre <b>" + esc(APP.cfg.nombre) + "</b>. Toca <b>Instalar</b>.") + '</ol><button class="btn cta block" data-act="inst">Instalar ahora</button></div><h3>Si el botón no funciona</h3>';
      h += '<ol class="steps-guide">' +
        paso("Arriba a la derecha de Chrome, al lado de la barra de la dirección, toca los <b>tres puntos en columna</b> " + I("menuv") + ".") +
        paso("Se abre una lista. Toca <b>Instalar app</b> " + I("phone") + ". Si no aparece, toca <b>Agregar a la pantalla principal</b>: es lo mismo.") +
        paso("Aparece una ventanita con el ícono (un chulo amarillo) y el nombre <b>" + esc(APP.cfg.nombre) + "</b>. Toca <b>Instalar</b>.") +
        paso("Espera unos segundos. El ícono <b>" + esc(APP.cfg.nombre) + "</b> aparece en la pantalla de inicio; si no, desliza hacia arriba para ver todas las apps y búscalo ahí.") +
        paso("Ábrela tocando ese ícono. Desde ahora, siempre desde ahí.") + "</ol>" +
        '<div class="card stack small"><b>Si sale el aviso de Google Play Protect</b><p>Toca <b>Entendido</b> y <b>no</b> toques «Instalar de todas formas». Puedes usar la app aquí mismo en Chrome mientras tanto (los avisos también funcionan así) y escríbele a Claude lo que pasó.</p></div>' +
        '<div class="card sunk small"><b>Para ver el ícono más grande:</b> mantén el dedo sobre un espacio vacío de la pantalla de inicio, toca <b>Ajustes</b> y en <b>Cuadrícula de la pantalla de inicio</b> elige una con menos íconos (por ejemplo 4 × 5). Todos los íconos se agrandan.</div>';
    } else {
      h += '<p class="lede">Esta app está hecha para el celular. Ábrela desde el iPhone o el Samsung con esta dirección:</p><div class="card" style="text-align:center"><b style="font-size:22px">' + esc(dir) + '</b>' + (APP.qr ? '<div style="max-width:220px;margin:12px auto">' + APP.qr + "</div><p class=\"tiny\">O apunta la cámara del celular a este código.</p>" : "") + "</div>";
    }
    h += '<details class="card"><summary><b>¿Es seguro?</b></summary><div class="stack small" style="margin-top:10px"><p>Sí. Es una página web que el celular guarda como app: no puede leer tus fotos, contactos ni mensajes, y solo te pedirá un permiso si activas los avisos.</p><p>No afecta tus otras aplicaciones ni el funcionamiento del celular. Para quitarla, mantén el dedo sobre el ícono y elige eliminar.</p></div></details></div>';
    return { tab: APP.perfil() ? "home" : false, html: h, on: {
      inst: function () { var e = APP.installPrompt; if (!e) return; e.prompt(); e.userChoice.then(function (r) { if (r.outcome === "accepted") APP.toast("Instalada. Búscala en tu pantalla de inicio.", "check"); APP.installPrompt = null; APP.rerender(); }); },
      copiarDir: function () { copiar(dir); }
    } };
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
      who: function (el) { var w = el.getAttribute("data-w"); if (w === p.who) return; var np = APP.setPerfil(w); if (!np.onboard) { APP.go("onb", { step: 2, draft: { who: w, temas: APP.temasTodos(), meta: 15 } }, { reset: true }); return; } APP.toast("Ahora entrena " + D.usuarios[w].nombre); APP.go("home", {}, { reset: true }); }
    } };
  };
  APP.novedades = [
    { v: "2026-10-30.2", t: "Llega el M07: ruta tributaria 2", d: ["Seis temas nuevos del M07: las tres maneras de liquidar, el requerimiento especial, la liquidación de revisión, el que no declara, el recurso de reconsideración y la revocatoria directa. Llegan encendidos.", "En Memoria, seis mapas nuevos con 16 escenas, y 28 láminas nuevas en el álbum (páginas 12 a 17).", "Trece familias nuevas de casos gemelos. Las de fechas y sanciones hacen las cuentas de verdad: hasta cuándo la liquidación de revisión, con ampliación y pausas; cuánto cuesta declarar tarde antes y después del emplazamiento; cuánto es la sanción por no declarar, con su mitad y su piso.", "Siete casos nuevos en el simulacro funcional (F18 a F24), con su paseo del experto.", "Corrección de Claude en el M05: en un gemelo sobre la revocatoria directa, la opción «el director de la seccional» podía defenderse con el artículo 738 del Estatuto. Se cambió por otra que sí es falsa, y se ajustó la trampa de la lámina «Qué actos y qué cuenta»."] },
    { v: "2026-10-30.1", t: "Llega el M05: la DIAN por dentro", d: ["Tres temas nuevos del M05 (capítulos 2, 3 y 4): quién manda en cada nivel, quién decide el recurso y la voz oficial de la entidad. Llegan encendidos; puedes apagarlos en el menú, en «Temas, tiempo y persona».", "En Memoria, tres mapas nuevos con nueve escenas, y 28 láminas nuevas en el álbum (páginas 9 a 11).", "Ocho familias nuevas de casos gemelos. La de «¿quién decide el recurso?» calcula la cuantía en UVT y en pesos de 2026, y te pone casos justo en la frontera de los 2.000 y los 20.000 UVT.", "Cinco casos nuevos en el simulacro funcional (F13 a F17), con su paseo del experto.", "Tu misión de mañana ya incluye el M05. Tu avance no se tocó."] },
    { v: "2026-10-22.3", t: "Más fácil de instalar y correcciones de la revisión legal", d: ["El botón del menú, arriba a la derecha de «Hoy», ahora dice «Menú».", "En el Samsung, la app explica cómo instalarla desde Chrome, porque desde Samsung Internet Google Play Protect la bloquea. Los pasos de instalación ahora tienen una sola acción cada uno.", "Una revisión independiente confrontó el contenido funcional con el Estatuto Tributario y la doctrina DIAN: las 12 respuestas del simulacro funcional y las cifras quedaron confirmadas.", "Escena «Tres maneras de que una declaración no sirva»: la pregunta ahora dice cuánto se debe (30 millones), porque una deuda de hasta 10 UVT pagada dentro del año sí salva la declaración.", "Lámina «Salida 2»: la declaración sin pago sirve de título para el cobro mientras no se presente de nuevo con el pago (art. 580-1).", "Escena «Las pausas del reloj»: los 3 meses de la inspección de oficio se cuentan desde la notificación del auto.", "Mapa del reloj: la imputación del saldo a favor sigue la regla general (si declaró tarde, desde la presentación).", "Los 71 UVT del beneficio de auditoría medidos en el año anterior quedan señalados como doctrina DIAN (Concepto 404 de 2026).", "Las preguntas sobre la sanción por corrección piden el valor antes de cualquier reducción (la del art. 640 va aparte)."] },
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
      r.update().catch(function () {}); // revisa ya si hay versión nueva, sin esperar al navegador
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


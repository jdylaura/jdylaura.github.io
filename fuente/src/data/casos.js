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

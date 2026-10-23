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
    llevar: "Si falla el sistema de la DIAN: un solo día de gracia, el siguiente al restablecimiento. Después, extemporaneidad." }
];

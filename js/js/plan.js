// js/plan.js
// Esta constante contiene la información estructurada de cada día del plan.
// **ATENCIÓN: Se asume que este archivo se carga antes que app.js**

const PLAN_DIARIO = [
    { day: 1, word: 'Hallo', wordTrans: 'Hola', plural: 'Hallo', title: 'Saludos y Presentaciones', journalPrompt: 'Escribe 3 frases presentándote.', exampleSentence: 'Hallo, wie geht es Ihnen?', exampleTranslation: 'Hola, ¿cómo está usted?', learningGoals: ["Saludar y despedirse formal e informalmente.", "Presentarse (nombre).", "Preguntar '¿Cómo estás?' y responder."], lessonContent: `
        <h3>Saludos Básicos (Grüße)</h3>
        <p>La forma más común y versátil de saludar es <strong>Hallo</strong> (Hola). Para ser más específico con el tiempo del día:</p>
        <ul>
            <li><strong>Guten Morgen!</strong> (Buenos días - hasta el mediodía)</li>
            <li><strong>Guten Tag!</strong> (Buen día - de mediodía a tarde, el más neutral)</li>
            <li><strong>Guten Abend!</strong> (Buenas tardes/noches - a partir de las 6 PM)</li>
        </ul>
        <h3>Presentaciones y Formas de Cortesía</h3>
        <p>En alemán, la cortesía es clave. Usamos <strong>Sie</strong> (Usted, formal) y <strong>du</strong> (tú, informal).</p>
        <p>Para preguntar el nombre:</p>
        <ul>
            <li>Formal: <strong>Wie heißen Sie?</strong> (¿Cómo se llama Usted?)</li>
            <li>Informal: <strong>Wie heißt du?</strong> (¿Cómo te llamas tú?)</li>
        </ul>
        <p>Para responder: <strong>Ich heiße [Tu Nombre].</strong> (Yo me llamo [Tu Nombre]).</p>
    `, tasks: [ { id:'d1-t1', icon:'🧠', color:'bg-pink-50', desc:'Vocabulario: Aprende 5 saludos y 3 despedidas.', time:'20 min' }, { id:'d1-t2', icon:'🎧', color:'bg-purple-50', desc:'Escucha un diálogo "Hallo, wie geht\'s?" y repite.', time:'15 min' }, { id:'d1-t3', icon:'✍️', color:'bg-yellow-50', desc:'Escribe 3 mini-diálogos presentándote.', time:'15 min' } ] },
    
    { day: 2, word: 'die Woche', wordTrans: 'la semana', plural: 'die Wochen', title: 'Formal (Sie) vs. Informal (du)', journalPrompt: 'Escribe 2 frases formales y 2 informales.', exampleSentence: 'Diese Woche habe ich viel Arbeit.', exampleTranslation: 'Esta semana tengo mucho trabajo.', learningGoals: ["Diferenciar entre tratamiento formal (Sie) e informal (du).", "Usar las formas correctas al preguntar el nombre."], lessonContent: `
        <h3>El Dilema Sie vs. Du</h3>
        <p>La elección entre <strong>Sie (Usted)</strong> y <strong>du (tú)</strong> es crucial en Alemania. El error más común de los principiantes es usar "du" con desconocidos o personas mayores.</p>
        <ul>
            <li><strong>Sie:</strong> Se usa con desconocidos, clientes, jefes, profesores y personas mayores (salvo que ellos te ofrezcan usar "du"). Siempre va con mayúscula inicial.</li>
            <li><strong>du:</strong> Se usa con amigos, familia, niños y adolescentes, o si te lo han ofrecido explícitamente ("Wir können uns duzen" / "Podemos tutearnos").</li>
        </ul>
        <h3>La Palabra del Día: die Woche</h3>
        <p>La palabra <strong>die Woche</strong> (la semana) es femenina, por lo que usa el artículo femenino <strong>die</strong>. Su plural es <strong>die Wochen</strong>.</p>
        <p>Aprender la palabra con el artículo es vital: <strong>die Woche, die Wochen</strong>.</p>
    `, tasks: [ { id:'d2-t1', icon:'🧠', color:'bg-pink-50', desc:'Gramática: Entiende la diferencia entre "Sie" (formal) y "du" (informal).', time:'15 min' }, { id:'d2-t2', icon:'📖', color:'bg-yellow-50', desc:'Lee ejemplos de "Wie heißen Sie?" vs. "Wie heißt du?".', time:'15 min' }, { id:'d2-t3', icon:'🗣️', color:'bg-orange-50', desc:'Practica presentarte de ambas formas en voz alta.', time:'15 min' } ] },
    
    { day: 3, word: 'sein', wordTrans: 'ser/estar', title: 'El Verbo "sein" (Ser/Estar)', journalPrompt: 'Escribe una frase con cada conjugación de "sein".', exampleSentence: 'Ich bin müde.', exampleTranslation: 'Estoy cansado/a.', learningGoals: ["Conjugar el verbo 'sein' (ser/estar) en presente.", "Formar frases básicas usando 'sein' (nacionalidad, profesión, estado)."], lessonContent: `
        <h3>El Verbo Irregular más Importante: sein</h3>
        <p><strong>Sein</strong> (ser/estar) es irregular y fundamental. Debes memorizar estas conjugaciones, ya que se usa constantemente para indicar identidad, estado y ubicación.</p>
        <div class="p-3 bg-red-50 rounded-md font-mono text-sm">
            <p>Ich <strong>bin</strong> (Yo soy/estoy)</p>
            <p>Du <strong>bist</strong> (Tú eres/estás)</p>
            <p>Er/Sie/Es <strong>ist</strong> (Él/Ella/Ello es/está)</p>
            <p>Wir <strong>sind</strong> (Nosotros somos/estamos)</p>
            <p>Ihr <strong>seid</strong> (Vosotros sois/estáis)</p>
            <p>Sie/sie <strong>sind</strong> (Usted/Ellos son/están)</p>
        </div>
        <h3>Ejemplos de Uso</h3>
        <ul>
            <li>Nacionalidad: "Ich <strong>bin</strong> Spanier."</li>
            <li>Estado: "Er <strong>ist</strong> glücklich."</li>
            <li>Profesión: "Wir <strong>sind</strong> Studenten."</li>
        </ul>
    `, tasks: [ { id:'d3-t1', icon:'🧠', color:'bg-purple-50', desc:'Gramática: Conjuga "sein" (ich bin, du bist, er/sie/es ist...).', time:'20 min' }, { id:'d3-t2', icon:'✍️', color:'bg-yellow-50', desc:'Escribe 5 frases usando "sein" (Ej: Ich bin müde, Du bist nett).', time:'20 min' }, { id:'d3-t3', icon:'🗣️', color:'bg-orange-50', desc:'Di las conjugaciones de "sein" en voz alta 10 veces.', time:'10 min' } ] },
    
    { day: 4, word: 'haben', wordTrans: 'tener', title: 'El Verbo "haben" (Tener)', journalPrompt: 'Escribe 5 cosas que tienes.', exampleSentence: 'Wir haben Hunger.', exampleTranslation: 'Tenemos hambre.', learningGoals: ["Conjugar el verbo 'haben' (tener) en presente.", "Formar frases básicas usando 'haben' (posesión, edad, sensaciones)."], lessonContent: `
        <h3>Conjugando el Verbo: haben</h3>
        <p><strong>Haben</strong> (tener) también es irregular, pero se usa para posesión y algunas expresiones de estado (como tener hambre o sed).</p>
        <div class="p-3 bg-red-50 rounded-md font-mono text-sm">
            <p>Ich <strong>habe</strong> (Yo tengo)</p>
            <p>Du <strong>hast</strong> (Tú tienes)</p>
            <p>Er/Sie/Es <strong>hat</strong> (Él/Ella/Ello tiene)</p>
            <p>Wir <strong>haben</strong> (Nosotros tenemos)</p>
            <p>Ihr <strong>habt</strong> (Vosotros tenéis)</p>
            <p>Sie/sie <strong>haben</strong> (Usted/Ellos tienen)</p>
        </div>
        <h3>Importante: haben vs. sein</h3>
        <p>En alemán, las sensaciones (hambre, sed, sueño) se expresan con <strong>haben</strong> (tener), no con <strong>sein</strong> (estar), a diferencia del español.</p>
        <ul>
            <li>Tener hambre: Ich <strong>habe</strong> Hunger.</li>
            <li>Tener 30 años: Er <strong>hat</strong> dreißig Jahre.</li>
        </ul>
    `, tasks: [ { id:'d4-t1', icon:'🧠', color:'bg-purple-50', desc:'Gramática: Conjuga "haben" (ich habe, du hast, er/sie/es hat...).', time:'20 min' }, { id:'d4-t2', icon:'✍️', color:'bg-yellow-50', desc:'Escribe 5 frases con "haben" (Ej: Ich habe einen Hund, Du hast Hunger).', time:'20 min' }, { id:'d4-t3', icon:'🎧', color:'bg-pink-50', desc:'Escucha un audio que use "sein" y "haben".', time:'15 min' } ] },
    
    { day: 5, word: 'Woher?', wordTrans: '¿De dónde?', title: 'Preguntas (W-Fragen)', journalPrompt: 'Escribe 3 preguntas W y sus respuestas.', exampleSentence: 'Woher kommen Sie?', exampleTranslation: '¿De dónde viene usted?', learningGoals: ["Identificar y usar las principales partículas interrogativas (Wer, Was, Wo, Wie, Wann, Woher, etc.).", "Formular preguntas básicas sobre información personal."], lessonContent: `
        <h3>Las Partículas Interrogativas (W-Fragen)</h3>
        <p>Las preguntas que no se responden con sí/no (como las de información personal) comienzan con una 'W'.</p>
        <ul>
            <li><strong>Wer?</strong> (¿Quién?) Ejemplo: Wer ist das?</li>
            <li><strong>Was?</strong> (¿Qué?) Ejemplo: Was machen Sie?</li>
            <li><strong>Wo?</strong> (¿Dónde?) Ejemplo: Wo wohnst du?</li>
            <li><strong>Woher?</strong> (¿De dónde?) Ejemplo: Woher kommen Sie?</li>
            <li><strong>Wie?</strong> (¿Cómo?) Ejemplo: Wie geht es dir?</li>
        </ul>
        <h3>Estructura Clave</h3>
        <p>La regla de oro en alemán es que el verbo (la acción) siempre debe ir en la <strong>segunda posición</strong> de la oración, incluso en las preguntas con W-Fragen:</p>
        <p><strong>[W-Frage] + [Verbo conjugado] + [Sujeto/Complementos]</strong></p>
        <p>Ejemplo: <strong>Wie</strong> <strong>heißen</strong> Sie? / <strong>Wo</strong> <strong>ist</strong> die Toilette?</p>
    `, tasks: [ { id:'d5-t1', icon:'🧠', color:'bg-purple-50', desc:'Vocabulario: Aprende las "W-Fragen" (Wer, Was, Wo, Wie, Wann, Woher).', time:'20 min' }, { id:'d5-t2', icon:'✍️', color:'bg-yellow-50', desc:'Escribe una pregunta con cada "W-Frage" (Ej: Wer bist du? Wo wohnst du?).', time:'20 min' }, { id:'d5-t3', icon:'🗣️', color:'bg-orange-50', desc:'Practica preguntar y responder estas preguntas básicas en voz alta.', time:'15 min' } ] },
    
    { day: 6, word: 'die Zahl', wordTrans: 'el Número', plural: 'die Zahlen', title: 'El Alfabeto y Números (0-20)', journalPrompt: 'Escribe tu edad y número de teléfono.', exampleSentence: 'Meine Lieblingszahl ist sieben.', exampleTranslation: 'Mi número favorito es el siete.', learningGoals: ["Reconocer y pronunciar el alfabeto alemán.", "Contar del 0 al 20."], lessonContent: `
        <h3>El Alfabeto Alemán (Das Alphabet)</h3>
        <p>El alfabeto es similar al español, pero tiene letras con diéresis (Ä, Ö, Ü) y la eszett (ß).</p>
        <p><strong>Puntos clave:</strong></p>
        <ul>
            <li>La letra V se pronuncia como "F" (Ej: Vater -> Fater).</li>
            <li>La letra W se pronuncia como "V" (Ej: Woche -> Voche).</li>
            <li>La letra Z se pronuncia como "Ts" (Ej: Zahl -> Tsal).</li>
        </ul>
        <h3>Números 0-20</h3>
        <p>Es esencial memorizar los números hasta el 12. A partir del 13, se forma como en inglés: [Unidad] + [diez].</p>
        <ul>
            <li><strong>11:</strong> elf, <strong>12:</strong> zwölf</li>
            <li><strong>13:</strong> dreizehn, <strong>16:</strong> sechzehn (¡Ojo! Pierde la 's')</li>
        </ul>
    `, tasks: [ { id:'d6-t1', icon:'🧠', color:'bg-purple-50', desc:'Vocabulario: Aprende los números de 0 a 20.', time:'20 min' }, { id:'d6-t2', icon:'🎧', color:'bg-pink-50', desc:'Escucha una canción del alfabeto alemán y cántala.', time:'15 min' }, { id:'d6-t3', icon:'🗣️', color:'bg-orange-50', desc:'Practica decir tu número de teléfono y edad.', time:'15 min' } ] },
    
    { day: 7, word: 'Repaso', wordTrans: 'Revisión', title: 'Repaso Semana 1', journalPrompt: 'Escribe un párrafo presentándote.', exampleSentence: 'Heute machen wir einen Repaso.', exampleTranslation: 'Hoy hacemos un repaso.', learningGoals: ["Consolidar saludos, presentaciones.", "Repasar conjugaciones de 'sein' y 'haben'.", "Practicar W-Fragen y números básicos."], lessonContent: `<p>Esta semana se centró en las bases de la comunicación: presentarse, preguntar y responder información personal, y los dos verbos más importantes: <strong>sein</strong> (ser/estar) y <strong>haben</strong> (tener).</p><h3>Autoevaluación Rápida</h3><p>Intenta conjugar 'sein' y 'haben' para 'Ich', 'Du', 'Er/Sie/Es' de memoria. Si lo logras, estás listo para la siguiente semana.</p>`, tasks: [ { id:'d7-t1', icon:'📖', color:'bg-yellow-50', desc:'Lee un diálogo corto (A1) e identifica saludos, "sein", "haben".', time:'20 min' }, { id:'d7-t2', icon:'✍️', color:'bg-yellow-50', desc:'Escribe un párrafo corto (3-5 frases) presentándote.', time:'20 min' }, { id:'d7-t3', icon:'🧠', color:'bg-purple-50', desc:'Repasa vocabulario días 1-6 con flashcards.', time:'15 min' } ] },
    
    { day: 8, word: 'die Familie', wordTrans: 'la Familia', plural: 'die Familien', title: 'La Familia y Posesivos', journalPrompt: 'Describe a tu familia (nombre y relación).', exampleSentence: 'Meine Familie wohnt in Spanien.', exampleTranslation: 'Mi familia vive en España.', learningGoals: ["Nombrar a los miembros básicos de la familia.", "Usar los posesivos 'mein' y 'dein'."], lessonContent: `
        <h3>Vocabulario Familiar (Familienmitglieder)</h3>
        <p>Recuerda el género es vital:</p>
        <ul>
            <li>Masculino (der): <strong>der Vater, der Bruder, der Sohn.</strong></li>
            <li>Femenino (die): <strong>die Mutter, die Schwester, die Tochter.</strong></li>
            <li>Neutro (das): <strong>das Kind.</strong></li>
        </ul>
        <h3>Posesivos Básicos (Nominativo)</h3>
        <p>Los posesivos se comportan como el artículo indefinido "ein".</p>
        <ul>
            <li>Para Masculino y Neutro: <strong>mein</strong> (mi), <strong>dein</strong> (tu). (Ej: mein Vater, mein Kind)</li>
            <li>Para Femenino y Plural: Añaden '-e': <strong>meine</strong> (mi), <strong>deine</strong> (tu). (Ej: meine Mutter, meine Eltern)</li>
        </ul>
    `, tasks: [ { id:'d8-t1', icon:'🧠', color:'bg-purple-50', desc:'Vocabulario: Aprende los miembros de la familia con su artículo (der/die).', time:'20 min' }, { id:'d8-t2', icon:'✍️', color:'bg-yellow-50', desc:'Escribe 5 frases usando posesivos (Ej: Meine Schwester heißt Anna).', time:'20 min' }, { id:'d8-t3', icon:'🗣️', color:'bg-orange-50', desc:'Describe a tu familia en frases simples.', time:'15 min' } ] },
    
    { day: 9, word: 'der', wordTrans: 'el (masc.)', title: 'Artículos: Nominativo (Sujeto)', journalPrompt: 'Escribe 10 sustantivos con su artículo (der, die, das).', exampleSentence: 'Der Stuhl ist alt.', exampleTranslation: 'La silla es vieja.', learningGoals: ["Identificar los 3 géneros gramaticales.", "Usar los artículos definidos (der, die, das) en el caso Nominativo."], lessonContent: `
        <h3>Gramática del Día: El Nominativo y los Artículos</h3>
        <p>El **Nominativo** es el caso del sujeto de la oración, es decir, quien realiza la acción (o quien "es" algo). ¡Recuerda que todos los sustantivos alemanes llevan mayúscula inicial!</p>
        <p>Los artículos definidos en Nominativo son:</p>
        <div class="p-3 bg-red-50 rounded-md font-mono text-sm">
            <p>Masculino: <strong>Der</strong> Mann</p>
            <p>Femenino: <strong>Die</strong> Frau</p>
            <p>Neutro: <strong>Das</strong> Kind</p>
            <p>Plural: <strong>Die</strong> Kinder</p>
        </div>
        <p>Aprende siempre el sustantivo con su artículo, ¡nunca solo! (Ej: Der Tisch, Die Lampe, Das Haus).</p>
    `, tasks: [ { id:'d9-t1', icon:'🧠', color:'bg-purple-50', desc:'Gramática: Aprende los 4 artículos del Nominativo (der, die, das, die).', time:'20 min' }, { id:'d9-t2', icon:'🧠', color:'bg-purple-50', desc:'Vocabulario: Aprende 10 sustantivos comunes CON su artículo.', time:'15 min' }, { id:'d9-t3', icon:'✍️', color:'bg-yellow-50', desc:'Crea 5 frases simples en Nominativo (Ej: Die Wohnung ist groß).', time:'20 min' } ] },
    
    { day: 10, word: 'den', wordTrans: 'el (masc. acus.)', title: 'El Caso Akkusativ (Objeto Directo)', journalPrompt: 'Escribe 5 frases donde el objeto sea Masculino (Ej: Ich sehe den Mann).', exampleSentence: 'Ich sehe den Mann.', exampleTranslation: 'Veo al hombre.', learningGoals: ["Comprender el caso Acusativo (objeto directo).", "Aplicar el cambio der → den."], lessonContent: `
        <h3>El Akkusativ (Acusativo)</h3>
        <p>El Akkusativ se usa para el **objeto directo** de la acción (aquello sobre lo que recae el verbo). El único artículo que cambia en Acusativo es el **masculino**:</p>
        <div class="p-3 bg-red-50 rounded-md font-mono text-sm">
            <p>Masculino: <strong>Der</strong> → <strong>Den</strong></p>
            <p>Femenino: <strong>Die</strong> → <strong>Die</strong> (No cambia)</p>
            <p>Neutro: <strong>Das</strong> → <strong>Das</strong> (No cambia)</p>
            <p>Plural: <strong>Die</strong> → <strong>Die</strong> (No cambia)</p>
        </div>
        <p>Esto aplica también a verbos que siempre rigen acusativo, como **haben** (tener) y **sehen** (ver).</p>
        <p>Ejemplo: "Yo tengo **la** mesa" (Tisch es masc.). → Ich habe **den** Tisch.</p>
    `, tasks: [ { id:'d10-t1', icon:'🧠', color:'bg-purple-50', desc:'Gramática: Memoriza la regla del Akkusativ: SOLO el artículo masculino cambia (der -> den).', time:'20 min' }, { id:'d10-t2', icon:'✍️', color:'bg-yellow-50', desc:'Escribe 5 frases con el verbo "haben" + objeto directo.', time:'20 min' }, { id:'d10-t3', icon:'📖', color:'bg-yellow-50', desc:'Completa 10 ejercicios online de Nominativo vs Acusativo.', time:'15 min' } ] },
    
    { day: 11, word: 'ein', wordTrans: 'un', title: 'Artículos Indefinidos (Nominativo y Acusativo)', journalPrompt: 'Escribe 3 frases Nom. y 3 Akk. usando artículos indefinidos.', exampleSentence: 'Das ist ein Tisch.', exampleTranslation: 'Esto es una mesa.', learningGoals: ["Usar artículos indefinidos (ein, eine) en Nominativo y Acusativo.", "Aplicar el cambio en el Acusativo."], lessonContent: `
        <h3>Artículos Indefinidos: ein/eine</h3>
        <p>Los artículos indefinidos ('un', 'una') no existen en plural en alemán. Se comportan exactamente igual que los artículos definidos en cuanto a las terminaciones de caso:</p>
        <div class="p-3 bg-red-50 rounded-md font-mono text-sm">
            <p><strong>Nominativo:</strong> ein (Masc/Neutro), eine (Femenino)</p>
            <p><strong>Acusativo:</strong> **einen** (Masc.), eine (Fem.), ein (Neutro)</p>
        </div>
        <p>Ejemplo: "Ich habe **einen** Hund." (Tengo un perro. Hund es masculino, por lo tanto **einen** en Acusativo).</p>
    `, tasks: [ { id:'d11-t1', icon:'🧠', color:'bg-purple-50', desc:'Gramática: Aprende \'ein/eine\' (Nom) y \'einen/eine\' (Akk).', time:'20 min' }, { id:'d11-t2', icon:'✍️', color:'bg-yellow-50', desc:'Escribe frases: "Das ist ein..." vs. "Ich habe einen/eine...".', time:'20 min' }, { id:'d11-t3', icon:'🗣️', color:'bg-orange-50', desc:'Señala objetos a tu alrededor y di "Ich habe ein(en/e)...".', time:'10 min' } ] },
    
    { day: 12, word: 'nein', wordTrans: 'no', title: 'Negación (nicht, kein)', journalPrompt: 'Escribe 5 frases negando cosas que no tienes o no eres.', exampleSentence: 'Ich bin nicht müde.', exampleTranslation: 'No estoy cansado/a.', learningGoals: ["Usar 'nicht' para negar verbos y adjetivos.", "Usar 'kein' para negar sustantivos."], lessonContent: `
        <h3>Negación con 'Nicht'</h3>
        <p><strong>Nicht</strong> se usa para negar:</p>
        <ul>
            <li>Verbos (acciones): Ich **kaufe** **nicht**.</li>
            <li>Adjetivos (cualidades): Das Haus ist **nicht** groß.</li>
            <li>Sustantivos precedidos de artículo definido: Der Tisch ist **nicht** **der** Tisch von Peter.</li>
        </ul>
        <h3>Negación con 'Kein'</h3>
        <p><strong>Kein</strong> (ningún, ninguna) se usa para negar un sustantivo que iría con un artículo indefinido (ein/eine) o sin artículo.</p>
        <p><strong>Importante:</strong> 'Kein' se declina exactamente igual que 'ein/eine' (Ej: Ich habe **keinen** Hund - Acusativo Masculino).</p>
    `, tasks: [ { id:'d12-t1', icon:'🧠', color:'bg-purple-50', desc:'Gramática: Entiende la diferencia entre "nicht" y "kein".', time:'20 min' }, { id:'d12-t2', icon:'✍️', color:'bg-yellow-50', desc:'Escribe 5 frases con "kein/keine" en Nom y Akk.', time:'20 min' }, { id:'d12-t3', icon:'🗣️', color:'bg-orange-50', desc:'Niega 10 frases simples que te digas a ti mismo/a.', time:'15 min' } ] },
    
    { day: 13, word: 'rot', wordTrans: 'rojo', title: 'Colores y Adjetivos Básicos', journalPrompt: 'Describe 5 objetos a tu alrededor (color y tamaño).', exampleSentence: 'Das Auto ist rot.', exampleTranslation: 'El coche es rojo.', learningGoals: ["Nombrar colores y adjetivos de descripción básicos.", "Usar el adjetivo en el predicado (después de 'sein')."], lessonContent: `
        <h3>Describiendo el mundo: Colores y Adjetivos</h3>
        <p>Los adjetivos en alemán son sencillos cuando están en el **predicado** (es decir, después de un verbo como *sein* o *werden*), ya que no se declinan.</p>
        <ul>
            <li><strong>Colores:</strong> rot (rojo), blau (azul), grün (verde), schwarz (negro), weiß (blanco), gelb (amarillo).</li>
            <li><strong>Cualidades:</strong> groß (grande), klein (pequeño), schön (bonito), alt (viejo), neu (nuevo).</li>
        </ul>
        <p>Estructura: **[Sujeto] + [sein] + [Adjetivo]**</p>
        <p>Ejemplo: Die Lampe **ist** **schön**.</p>
    `, tasks: [ { id:'d13-t1', icon:'🧠', color:'bg-purple-50', desc:'Vocabulario: Aprende 10 colores y 5 adjetivos comunes.', time:'20 min' }, { id:'d13-t2', icon:'✍️', color:'bg-yellow-50', desc:'Escribe 5 frases describiendo objetos (Ej: Die Hose ist blau).', time:'20 min' }, { id:'d13-t3', icon:'🎧', color:'bg-pink-50', desc:'Busca y escucha una canción sencilla sobre los colores en alemán.', time:'15 min' } ] },
    
    { day: 14, word: 'die Wohnung', wordTrans: 'el Apartamento', plural: 'die Wohnungen', title: 'Repaso Semana 2 y La Casa', journalPrompt: 'Describe tu habitación o apartamento usando Nom/Akk y adjetivos.', exampleSentence: 'Meine Wohnung ist klein.', exampleTranslation: 'Mi apartamento es pequeño.', learningGoals: ["Consolidar Nominativo, Acusativo y Negación.", "Practicar vocabulario de la casa."], lessonContent: `
        <h3>Repaso de Artículos y Casos</h3>
        <p>Este día es para asegurar que las declinaciones de los artículos (Nom/Akk) y el uso de la negación (**nicht** vs **kein**) son claros. Céntrate en identificar el sujeto (Nominativo) y el objeto directo (Acusativo).</p>
        <ul>
            <li>**Nominativo (Sujeto):** Der, Die, Das, Die / Ein, Eine, Ein</li>
            <li>**Acusativo (Objeto Directo):** Den, Die, Das, Die / Einen, Eine, Ein</li>
        </ul>
        <h3>Vocabulario: Die Wohnung</h3>
        <p>Aprende las partes principales de la casa (Ej: das Zimmer, die Küche, das Bad).</p>
    `, tasks: [ { id:'d14-t1', icon:'🧠', color:'bg-purple-50', desc:'Gramática: Repasa las tablas de Nominativo y Acusativo.', time:'15 min' }, { id:'d14-t2', icon:'✍️', color:'bg-yellow-50', desc:'Escribe un párrafo describiendo tu vivienda.', time:'25 min' }, { id:'d14-t3', icon:'📖', color:'bg-yellow-50', desc:'Lee un texto A1 sobre la búsqueda de un piso.', time:'15 min' } ] },
    
    { day: 15, word: 'lernen', wordTrans: 'aprender', title: 'Verbos Regulares (Konjugation)', journalPrompt: 'Conjuga "lernen" y "kaufen" con todos los pronombres.', exampleSentence: 'Ich lerne Deutsch.', exampleTranslation: 'Aprendo alemán.', learningGoals: ["Conjugar verbos regulares en presente.", "Identificar y usar las terminaciones correctas."], lessonContent: `
        <h3>La Regla de la Terminación -en</h3>
        <p>La mayoría de verbos en alemán son **regulares** (o débiles). Para conjugarlos, quita la terminación de infinitivo '-en' y añade las terminaciones personales al tallo (raíz):</p>
        <div class="p-3 bg-red-50 rounded-md font-mono text-sm">
            <p>Ich <strong>lernen</strong> → Ich <strong>lern**e**</strong></p>
            <p>Du <strong>lernst</strong></p>
            <p>Er/Sie/Es <strong>lernt</strong></p>
            <p>Wir <strong>lernen</strong></p>
            <p>Ihr <strong>lernt</strong></p>
            <p>Sie/sie <strong>lernen</strong></p>
        </div>
        <p>Verbos de práctica: **kaufen** (comprar), **machen** (hacer), **wohnen** (vivir/residir).</p>
    `, tasks: [ { id:'d15-t1', icon:'🧠', color:'bg-purple-50', desc:'Gramática: Memoriza las terminaciones del presente (-e, -st, -t, -en, -t, -en).', time:'20 min' }, { id:'d15-t2', icon:'✍️', color:'bg-yellow-50', desc:'Escribe 5 frases con verbos regulares (Ej: Wir machen Pizza).', time:'20 min' }, { id:'d15-t3', icon:'🗣️', color:'bg-orange-50', desc:'Practica la conjugación de 3 verbos comunes en voz alta.', time:'15 min' } ] },
    
    { day: 16, word: 'sprechen', wordTrans: 'hablar', title: 'Verbos Irregulares (con cambio de vocal)', journalPrompt: 'Conjuga "sprechen" y "essen".', exampleSentence: 'Ich spreche Spanisch.', exampleTranslation: 'Hablo español.', learningGoals: ["Identificar verbos irregulares con cambio de vocal (e → i).", "Conjugar verbos como 'sprechen' y 'essen'."], lessonContent: `
        <h3>Verbos con Cambio de Vocal (Starke Verben)</h3>
        <p>Algunos verbos fuertes (irregulares) cambian la vocal de la raíz, pero **solo en la 2ª y 3ª persona del singular** (du, er/sie/es). El resto de la conjugación sigue la regla regular.</p>
        <p>Ejemplo: **Sprechen** (hablar) e → i</p>
        <ul>
            <li>Ich **spreche**</li>
            <li>Du **sprichst** (¡Cambio de vocal!)</li>
            <li>Er/Sie/Es **spricht** (¡Cambio de vocal!)</li>
            <li>Wir **sprechen**</li>
        </ul>
        <p>Otro ejemplo común es **essen** (comer), que también cambia a **isst**.</p>
    `, tasks: [ { id:'d16-t1', icon:'🧠', color:'bg-purple-50', desc:'Gramática: Aprende la conjugación de \'sprechen\' y \'essen\'.', time:'20 min' }, { id:'d16-t2', icon:'✍️', color:'bg-yellow-50', desc:'Escribe 4 frases con estos verbos, usando "du" y "er/sie".', time:'20 min' }, { id:'d16-t3', icon:'📖', color:'bg-yellow-50', desc:'Busca 3 verbos más con cambio e → i (Ej: sehen, geben).', time:'15 min' } ] },
    
    { day: 17, word: 'können', wordTrans: 'poder', title: 'Verbos Modales (Parte 1: können, wollen)', journalPrompt: 'Escribe 3 cosas que puedes hacer y 3 que quieres hacer.', exampleSentence: 'Ich kann gut singen.', exampleTranslation: 'Puedo cantar bien.', learningGoals: ["Conjugar los modales 'können' (poder) y 'wollen' (querer).", "Usar la estructura: Modal en pos. 2 + Infinitivo al final."], lessonContent: `
        <h3>Estructura Clave de los Modales</h3>
        <p>Los verbos **modales** son irregulares en el singular y tienen una regla de sintaxis especial: El modal se conjuga en la posición 2, y el verbo principal va en **infinitivo al final** de la oración.</p>
        <p>Fórmula: **[Sujeto] + [Modal conjugado] + [Complementos] + [Verbo Principal en Infinitivo]**</p>
        <p>Ejemplo: Ich **kann** Deutsch **sprechen**.</p>
        <h3>Können y Wollen</h3>
        <ul>
            <li>**können** (poder/ser capaz de): Ich kann, Du kannst, Er/Sie/Es kann.</li>
            <li>**wollen** (querer, con firmeza): Ich will, Du willst, Er/Sie/Es will.</li>
        </ul>
    `, tasks: [ { id:'d17-t1', icon:'🧠', color:'bg-purple-50', desc:'Gramática: Conjuga \'können\' y \'wollen\'.', time:'20 min' }, { id:'d17-t2', icon:'✍️', color:'bg-yellow-50', desc:'Escribe 5 frases con la estructura modal (Ej: Ich will Pizza essen).', time:'20 min' }, { id:'d17-t3', icon:'🗣️', color:'bg-orange-50', desc:'Di 5 frases con modales sobre tus habilidades o deseos.', time:'15 min' } ] },
    
    { day: 18, word: 'müssen', wordTrans: 'deber (oblig.)', title: 'Verbos Modales (Parte 2: müssen, dürfen)', journalPrompt: 'Escribe 3 cosas que debes hacer y 2 que tienes permitido.', exampleSentence: 'Ich muss arbeiten.', exampleTranslation: 'Debo trabajar.', learningGoals: ["Conjugar 'müssen' (obligación) y 'dürfen' (permiso).", "Reforzar la estructura modal."], lessonContent: `
        <h3>Müssen y Dürfen</h3>
        <ul>
            <li>**müssen** (deber, obligación fuerte): Ich muss, Du musst, Er/Sie/Es muss. (Ej: Ich muss **lernen** = Debo estudiar).</li>
            <li>**dürfen** (tener permiso): Ich darf, Du darfst, Er/Sie/Es darf. (Ej: Hier darf man **rauchen** = Aquí está permitido fumar).</li>
        </ul>
        <h3>Verbos Modales sin Umlaut (Vocal con diéresis)</h3>
        <p>Observa que, al igual que *können* y *wollen*, *müssen* y *dürfen* pierden la diéresis (Umlaut) en las conjugaciones singulares (Ich, Du, Er/Sie/Es).</p>
    `, tasks: [ { id:'d18-t1', icon:'🧠', color:'bg-purple-50', desc:'Gramática: Conjuga \'müssen\' y \'dürfen\'.', time:'20 min' }, { id:'d18-t2', icon:'✍️', color:'bg-yellow-50', desc:'Escribe 5 frases con \'müssen\' y \'dürfen\'.', time:'20 min' }, { id:'d18-t3', icon:'📖', color:'bg-yellow-50', desc:'Identifica modales en un texto A1 y sus infinitivos.', time:'15 min' } ] },
    
    { day: 19, word: 'die Uhr', wordTrans: 'el reloj', plural: 'die Uhren', title: 'La Hora (Formal e Informal)', journalPrompt: 'Escribe tu horario de hoy usando la hora formal.', exampleSentence: 'Es ist vierzehn Uhr.', exampleTranslation: 'Son las catorce (dos de la tarde).', learningGoals: ["Decir la hora de forma formal (oficial, 24h).", "Decir la hora de forma informal (con 'halb' y 'viertel')."], lessonContent: `
        <h3>Hora Formal (Oficial - 24 horas)</h3>
        <p>Se usa para horarios de trenes, tiendas, citas. Es simple: **[Es ist] + [Hora] + Uhr + [Minutos]**</p>
        <ul>
            <li>14:15: Es ist vierzehn Uhr fünfzehn.</li>
        </ul>
        <h3>Hora Informal (Conversacional)</h3>
        <p>Se usa el formato de 12 horas con vocabulario especial:</p>
        <ul>
            <li><strong>halb:</strong> significa "la mitad de la hora que viene". (Ej: **halb drei** = 2:30).</li>
            <li><strong>viertel:</strong> significa "cuarto". (Ej: Viertel nach zwei = 2:15, Viertel vor drei = 2:45).</li>
            <li><strong>nach:</strong> después (minutos después de la hora).</li>
            <li><strong>vor:</strong> antes (minutos antes de la hora).</li>
        </ul>
    `, tasks: [ { id:'d19-t1', icon:'🧠', color:'bg-purple-50', desc:'Gramática: Aprende el concepto de "halb" (media hora antes de la siguiente).', time:'20 min' }, { id:'d19-t2', icon:'✍️', color:'bg-yellow-50', desc:'Practica decir 10 horas distintas (5 formales, 5 informales).', time:'20 min' }, { id:'d19-t3', icon:'🎧', color:'bg-pink-50', desc:'Escucha y repite diálogos sobre pedir la hora.', time:'15 min' } ] },
    
    { day: 20, word: 'das Hobby', wordTrans: 'el Hobby', plural: 'die Hobbys', title: 'Actividades y Hobbies', journalPrompt: 'Escribe 5 hobbies que tienes y 5 actividades que haces semanalmente.', exampleSentence: 'Mein Hobby ist Lesen.', exampleTranslation: 'Mi hobby es leer.', learningGoals: ["Nombrar actividades de tiempo libre y hobbies.", "Preguntar y responder sobre hobbies.", "Usar el adverbio 'gern' (con gusto)."], lessonContent: `
        <h3>¿Qué te gusta hacer?</h3>
        <p>La forma más común de expresar que algo te gusta hacer es usando el adverbio **gern** (con gusto), el cual se coloca después del verbo.</p>
        <p>Fórmula: **[Sujeto] + [Verbo] + gern + [Complementos]**</p>
        <ul>
            <li>Ich **spiele** **gern** Fußball. (Me gusta jugar fútbol)</li>
            <li>Er **kocht** **gern**. (A él le gusta cocinar)</li>
        </ul>
        <h3>Vocabulario de Hobbies</h3>
        <p>Aprende las frases verbales clave: **Sport machen** (hacer deporte), **lesen** (leer), **Musik hören** (escuchar música), **reisen** (viajar).</p>
    `, tasks: [ { id:'d20-t1', icon:'🧠', color:'bg-purple-50', desc:'Vocabulario: Aprende 10 hobbies y verbos de actividad.', time:'20 min' }, { id:'d20-t2', icon:'✍️', color:'bg-yellow-50', desc:'Escribe 5 frases sobre lo que haces en tu tiempo libre usando "gern".', time:'20 min' }, { id:'d20-t3', icon:'🗣️', color:'bg-orange-50', desc:'Describe tu día (con horas y actividades) en voz alta.', time:'15 min' } ] },
    
    { day: 21, word: 'Repaso', wordTrans: 'Revisión', title: 'Repaso Semana 3', journalPrompt: 'Escribe una carta a un amigo sobre tus planes del fin de semana (usando modales y la hora).', exampleSentence: 'Wir wiederholen die Verben.', exampleTranslation: 'Repasamos los verbos.', learningGoals: ["Consolidar conjugaciones (regulares, irregulares, modales).", "Repasar la hora (formal e informal).", "Practicar hobbies con 'gern'."], lessonContent: `
        <h3>Enfoque en Verbos y Estructura</h3>
        <p>El desafío de la semana 3 fue la conjugación y la sintaxis: la posición del verbo en las frases simples (Pos. 2) y el envío del infinitivo al final en las frases con modales.</p>
        <p>Asegúrate de que puedes conjugar los modales *können, wollen, müssen, dürfen* sin pensarlo.</p>
    `, tasks: [ { id:'d21-t1', icon:'🧠', color:'bg-purple-50', desc:'Gramática: Conjuga todos los verbos aprendidos (sein, haben, modales, regulares).', time:'20 min' }, { id:'d21-t2', icon:'✍️', color:'bg-yellow-50', desc:'Escribe una carta corta (A1) con tus planes (3-5 frases).', time:'25 min' }, { id:'d21-t3', icon:'📖', color:'bg-yellow-50', desc:'Revisa ejercicios de modales y la hora.', time:'15 min' } ] },
    
    { day: 22, word: 'der Bahnhof', wordTrans: 'la estación de tren', plural: 'die Bahnhöfe', title: 'Preposiciones Locales (Wo? - Dativo)', journalPrompt: 'Escribe 5 frases de ubicación sobre objetos en tu escritorio.', exampleSentence: 'Der Bahnhof ist in der Nähe.', exampleTranslation: 'La estación de tren está cerca.', learningGoals: ["Usar preposiciones locales que rigen Dativo (Wo?).", "Preguntar y responder por la posición fija."], lessonContent: `
        <h3>Preposiciones Fijas (Dativo)</h3>
        <p>Cuando preguntas **Wo?** (¿Dónde?), estás indicando una posición fija (no hay movimiento). Las preposiciones que responden a Wo? rigen el caso **Dativo**.</p>
        <p>Ejemplo de preposiciones: **in** (en, dentro), **auf** (sobre, encima), **unter** (debajo), **neben** (al lado de), **hinter** (detrás de).</p>
        <h3>El Dativo (Cambio de Artículo)</h3>
        <p>En el Dativo, todos los artículos cambian:</p>
        <div class="p-3 bg-red-50 rounded-md font-mono text-sm">
            <p>Masc: **Der** → **Dem**</p>
            <p>Fem: **Die** → **Der**</p>
            <p>Neut: **Das** → **Dem**</p>
            <p>Plural: **Die** → **Den** (+ **n** al sustantivo, ej: den Autos)</p>
        </div>
        <p>Ejemplo: Wo ist die Lampe? → Die Lampe ist **auf dem Tisch** (Tisch es masc., se usa **dem**).</p>
    `, tasks: [ { id:'d22-t1', icon:'🧠', color:'bg-purple-50', desc:'Vocabulario: Aprende 5 preposiciones de lugar (in, auf, unter, neben, vor).', time:'20 min' }, { id:'d22-t2', icon:'✍️', color:'bg-yellow-50', desc:'Escribe 5 frases de ubicación usando Dativo (Ej: Die Katze ist unter dem Tisch).', time:'20 min' }, { id:'d22-t3', icon:'🗣️', color:'bg-orange-50', desc:'Describe un mapa o una imagen usando el Dativo.', time:'15 min' } ] },
    
    { day: 23, word: 'in die Stadt', wordTrans: 'a la ciudad', title: 'Preposiciones Locales (Wohin? - Acusativo)', journalPrompt: 'Escribe 3 frases de movimiento hacia 3 lugares distintos.', exampleSentence: 'Ich gehe in die Stadt.', exampleTranslation: 'Voy a la ciudad.', learningGoals: ["Usar preposiciones locales que rigen Acusativo (Wohin?).", "Diferenciar entre Wo? (Dativo) y Wohin? (Acusativo)."], lessonContent: `
        <h3>Preposiciones de Movimiento (Acusativo)</h3>
        <p>Cuando preguntas **Wohin?** (¿Hacia dónde?), estás indicando una dirección o movimiento. Las preposiciones que responden a Wohin? rigen el caso **Acusativo**.</p>
        <p>La buena noticia es que, de las preposiciones de lugar (an, auf, in, etc.), solo cambia el artículo masculino (**den**).</p>
        <p>Ejemplo: Wohin gehst du? → Ich gehe **in den Park** (Park es masc., se usa **den** en Acusativo).</p>
        <p>**En resumen:** Mismo lugar, distinto caso. **Wo? → Dativo (posición). Wohin? → Acusativo (movimiento).**</p>
    `, tasks: [ { id:'d23-t1', icon:'🧠', color:'bg-purple-50', desc:'Gramática: Repasa la tabla de Acusativo (der->den) y Dativo (die->der, das->dem, der->dem).', time:'20 min' }, { id:'d23-t2', icon:'✍️', color:'bg-yellow-50', desc:'Escribe 5 frases de movimiento (Ej: Wir fahren in die Schweiz).', time:'20 min' }, { id:'d23-t3', icon:'📖', color:'bg-yellow-50', desc:'Lee textos de orientación en la ciudad e identifica el caso.', time:'15 min' } ] },
    
    { day: 24, word: 'der Kaffee', wordTrans: 'el café', title: 'Comida y Bebida (Bestellungen)', journalPrompt: 'Escribe tu pedido ideal en un restaurante.', exampleSentence: 'Ich trinke einen Kaffee.', exampleTranslation: 'Bebo un café.', learningGoals: ["Nombrar comidas y bebidas básicas.", "Hacer pedidos en restaurantes/cafés usando modales."], lessonContent: `
        <h3>¡A la mesa! (Am Tisch)</h3>
        <p>El vocabulario de comida es esencial, ¡aprende el artículo!</p>
        <ul>
            <li>der: **der** Kaffee, **der** Fisch, **der** Reis</li>
            <li>die: **die** Milch, **die** Suppe, **die** Kartoffel</li>
            <li>das: **das** Brot, **das** Wasser, **das** Gemüse</li>
        </ul>
        <h3>Hacer Pedidos (Bestellungen)</h3>
        <p>Usamos verbos modales o frases educadas para ordenar:</p>
        <ul>
            <li>**Ich möchte** einen Kaffee. (Me gustaría un café)</li>
            <li>**Ich hätte gern** eine Cola. (Me gustaría una Coca-Cola)</li>
        </ul>
        <p>Observa que la mayoría de los pedidos serán en **Acusativo** (el objeto que quieres). Ej: Ich möchte **einen** Salat (Salat es masc.).</p>
    `, tasks: [ { id:'d24-t1', icon:'🧠', color:'bg-purple-50', desc:'Vocabulario: Aprende 10 palabras de comida y 5 de bebida con su artículo.', time:'20 min' }, { id:'d24-t2', icon:'✍️', color:'bg-yellow-50', desc:'Escribe 5 frases con pedidos usando "Ich möchte...".', time:'20 min' }, { id:'d24-t3', icon:'🗣️', color:'bg-orange-50', desc:'Simula un diálogo en un café, pidiendo 3 cosas.', time:'15 min' } ] },
    
    { day: 25, word: 'die Kleidung', wordTrans: 'la ropa', plural: 'die Kleidungen', title: 'Ropa, Compras y Precios', journalPrompt: 'Describe tu atuendo ideal para una fiesta de verano.', exampleSentence: 'Die Kleidung ist schön.', exampleTranslation: 'La ropa es bonita.', learningGoals: ["Nombrar prendas de vestir básicas.", "Preguntar y decir precios.", "Usar números del 21 al 100."], lessonContent: `
        <h3>De Compras (Einkaufen)</h3>
        <p>Frases clave para comprar y preguntar por precios:</p>
        <ul>
            <li>**Was kostet...?** / **Wie viel kostet...?** (¿Cuánto cuesta...?)</li>
            <li>**Das kostet zehn Euro.** (Cuesta diez euros.)</li>
            <li>**Kann ich das anprobieren?** (¿Puedo probármelo?)</li>
        </ul>
        <h3>Números 21 - 100</h3>
        <p>A diferencia del español o el inglés, en alemán se dice la unidad, luego "und" (y), y luego la decena. Es crucial dominar esto.</p>
        <ul>
            <li>21: **einundzwanzig** (uno y veinte)</li>
            <li>99: **neunundneunzig** (nueve y noventa)</li>
        </ul>
    `, tasks: [ { id:'d25-t1', icon:'🧠', color:'bg-purple-50', desc:'Vocabulario: Aprende 10 prendas de vestir y 5 frases de compra.', time:'20 min' }, { id:'d25-t2', icon:'✍️', color:'bg-yellow-50', desc:'Escribe 5 frases describiendo ropa (Ej: Ich kaufe eine rote Jacke).', time:'20 min' }, { id:'d25-t3', icon:'🧠', color:'bg-purple-50', desc:'Repasa y practica números hasta 100. Pide precios imaginarios.', time:'15 min' } ] },
    
    { day: 26, word: 'die E-Mail', wordTrans: 'el correo electrónico', plural: 'die E-Mails', title: 'Escribir E-mails y Cartas', journalPrompt: 'Escribe un e-mail a un amigo invitándolo a cenar la próxima semana.', exampleSentence: 'Ich schreibe eine E-Mail.', exampleTranslation: 'Escribo un correo electrónico.', learningGoals: ["Escribir saludos y despedidas de e-mails/cartas.", "Estructurar una invitación simple."], lessonContent: `
        <h3>Comunicación Escrita (Schriftliche Kommunikation)</h3>
        <p>Aprende las frases de cortesía que enmarcan una carta o e-mail (A1):</p>
        <ul>
            <li>**Saludo Informal:** Liebe [Nombre Femenino] / Lieber [Nombre Masculino]</li>
            <li>**Saludo Formal:** Sehr geehrte Damen und Herren (Estimados Sres./Sras.)</li>
        </ul>
        <p>Cierre de la carta:</p>
        <ul>
            <li>**Cierre Informal:** Viele Grüße (Muchos saludos) / Dein/Deine [Tu Nombre]</li>
            <li>**Cierre Formal:** Mit freundlichen Grüßen (Atentamente)</li>
        </ul>
        <p>Estructura: Saludo, Cuerpo (Pos. 2 del verbo), Despedida.</p>
    `, tasks: [ { id:'d26-t1', icon:'🧠', color:'bg-purple-50', desc:'Gramática: Memoriza los saludos y cierres de cartas.', time:'20 min' }, { id:'d26-t2', icon:'✍️', color:'bg-yellow-50', desc:'Escribe el e-mail de 5 frases para invitar a alguien.', time:'20 min' }, { id:'d26-t3', icon:'📖', color:'bg-yellow-50', desc:'Lee y analiza 3 e-mails A1, identificando sus partes.', time:'15 min' } ] },
    
    { day: 27, word: 'das Wetter', wordTrans: 'el clima', title: 'El Clima y las Estaciones', journalPrompt: 'Describe el clima de hoy y haz un pronóstico para mañana.', exampleSentence: 'Das Wetter ist kalt.', exampleTranslation: 'El clima es frío.', learningGoals: ["Nombrar estaciones y condiciones climáticas básicas.", "Describir el clima usando 'Es ist...' y 'Die Sonne scheint...'."], lessonContent: `
        <h3>Hablando del Clima (Das Wetter)</h3>
        <p>La forma más común de hablar del clima es usando la estructura **Es ist...** (Es/Está...)</p>
        <ul>
            <li>**Es ist sonnig** (Está soleado)</li>
            <li>**Es ist kalt** (Está frío)</li>
            <li>**Es regnet** (Está lloviendo - *regnet* es el verbo llover)</li>
        </ul>
        <h3>Las Estaciones (Jahreszeiten)</h3>
        <p>Der Frühling (primavera), der Sommer (verano), der Herbst (otoño), der Winter (invierno). Todas son masculinas (**der**).</p>
    `, tasks: [ { id:'d27-t1', icon:'🧠', color:'bg-purple-50', desc:'Vocabulario: Aprende 10 palabras de clima y las 4 estaciones.', time:'20 min' }, { id:'d27-t2', icon:'✍️', color:'bg-yellow-50', desc:'Escribe 5 frases sobre el clima de tu región.', time:'20 min' }, { id:'d27-t3', icon:'🗣️', color:'bg-orange-50', desc:'Practica frases de clima en voz alta.', time:'15 min' } ] },
    
    { day: 28, word: 'Repaso', wordTrans: 'Revisión', title: 'Repaso Semana 4', journalPrompt: 'Escribe un diálogo de 10 líneas sobre ir de compras y preguntar por ubicación.', exampleSentence: 'Wir üben die Dialoge.', exampleTranslation: 'Practicamos los diálogos.', learningGoals: ["Consolidar preposiciones (Wo/Wohin).", "Repasar vocabulario de comida/ropa.", "Practicar diálogos de la vida diaria."], lessonContent: `
        <h3>Cierre de Contenido A1</h3>
        <p>La última semana consolidó la aplicación del idioma en el mundo real: orientación (**Dativo** vs **Acusativo**) y situaciones de compra/pedido.</p>
        <p>Tu tarea hoy es asegurarte de que puedes diferenciar la gramática de la ubicación:</p>
        <ul>
            <li>**Wo?** → Dativo (posición fija)</li>
            <li>**Wohin?** → Acusativo (movimiento/destino)</li>
        </ul>
    `, tasks: [ { id:'d28-t1', icon:'🧠', color:'bg-purple-50', desc:'Gramática: Haz un último repaso de las reglas de Dativo vs Acusativo con preposiciones.', time:'20 min' }, { id:'d28-t2', icon:'✍️', color:'bg-yellow-50', desc:'Escribe el diálogo de compras y ubicación.', time:'25 min' }, { id:'d28-t3', icon:'📖', color:'bg-yellow-50', desc:'Revisa las entradas del diario de las 4 semanas.', time:'15 min' } ] },
    
    { day: 29, word: 'alles', wordTrans: 'todo', title: 'Simulación de Examen (A1)', journalPrompt: 'Escribe 3 frases de las partes que fallaste en la simulación (ej: Ich muss die Zahlen lernen).', exampleSentence: 'Ich habe fast alles verstanden.', exampleTranslation: 'Casi lo he entendido todo.', learningGoals: ["Medir el nivel A1 en comprensión lectora, auditiva y oral.", "Identificar puntos débiles antes de pasar al A2."], lessonContent: `
        <h3>Prepárate para el Examen</h3>
        <p>Hoy es un día de simulación. Tu objetivo es encontrar un examen modelo A1 online (Goethe-Institut, ÖSD o Telc) e intentar hacerlo bajo condiciones de tiempo (si es posible).</p>
        <p>No te frustres si encuentras partes difíciles. Esto te dice exactamente qué debes repasar antes de empezar el A2.</p>
        <p>Concéntrate en la estructura de los exámenes: Lesen (Lectura), Hören (Audio), Schreiben (Escritura), Sprechen (Oral).</p>
    `, tasks: [ { id:'d29-t1', icon:'🧠', color:'bg-purple-50', desc:'Simulación: Haz un examen modelo de lectura (Lesen).', time:'30 min' }, { id:'d29-t2', icon:'🎧', color:'bg-pink-50', desc:'Simulación: Haz un examen modelo auditivo (Hören).', time:'30 min' }, { id:'d29-t3', icon:'🗣️', color:'bg-orange-50', desc:'Simulación: Practica la sección oral (Sprechen) grabándote o frente a un espejo.', time:'30 min' } ] },
    
    { day: 30, word: 'das Zertifikat', wordTrans: 'el certificado', plural: 'die Zertifikate', title: '¡Felicidades! Logro A1', journalPrompt: 'Escribe tu reflexión del mes, tus logros y tus metas para el Nivel A2 (Ej: Ich will fließend sprechen).', exampleSentence: 'Das Zertifikat ist wichtig.', exampleTranslation: 'El certificado es importante.', learningGoals: ["Reflexionar sobre el aprendizaje.", "Establecer metas para el Nivel A2 y planificar los próximos pasos."], lessonContent: `
        <h3>¡Lo lograste!</h3>
        <p>Has completado el Nivel A1 de alemán. Esto significa que ya puedes:</p>
        <ul>
            <li>Presentarte y saludar.</li>
            <li>Preguntar y responder información personal básica.</li>
            <li>Formular frases simples en presente.</li>
            <li>Usar artículos y preposiciones de lugar básicos.</li>
        </ul>
        <p>El primer mes es el más difícil. Tómate el tiempo de celebrar tu logro y planear tu próximo paso, que probablemente será el Nivel A2, donde empezarás a usar el pasado (Perfecto) y estructuras de frases más complejas.</p>
    `, tasks: [ { id:'d30-t1', icon:'🧠', color:'bg-purple-50', desc:'Revisa todas las tareas pendientes y márcalas como hechas.', time:'30 min' }, { id:'d30-t2', icon:'✍️', color:'bg-yellow-50', desc:'Escribe la reflexión del mes en el diario de este día.', time:'30 min' }, { id:'d30-t3', icon:'🗣️', color:'bg-orange-50', desc:'Di en voz alta 10 frases que no sabías decir hace un mes.', time:'30 min' } ] }
];

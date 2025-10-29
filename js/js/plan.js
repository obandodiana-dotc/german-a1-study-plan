// js/plan.js
// Esta constante contiene la información estructurada de cada día del plan.
// **ATENCIÓN: Se asume que este archivo se carga antes que app.js**

const PLAN_DIARIO = [
    { 
        day: 1, 
        word: 'Hallo', 
        wordTrans: 'Hola', 
        plural: 'Hallo', 
        title: 'Saludos y Presentaciones', 
        journalPrompt: 'Escribe 3 frases presentándote.', 
        exampleSentence: 'Hallo, wie geht es Ihnen?', 
        exampleTranslation: 'Hola, ¿cómo está usted?', 
        learningGoals: ["Saludar y despedirse formal e informalmente.", "Presentarse (nombre).", "Preguntar '¿Cómo estás?' y responder."], 
        lessonContent: `
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
            </ul>
        `,
        // --- INNOVACIÓN 3: MINI-EJERCICIOS INTERACTIVOS ---
        miniExercises: [
            // Ejercicio de llenar el espacio
            { id: 'ex1-1', type: 'fill_in', prompt: 'Ich ___ müde.', answer: 'bin', hint: 'Verbo "ser/estar" (sein)' },
            // Ejercicio de emparejamiento
            { id: 'ex1-2', type: 'match', items: ['Guten Tag', 'Wie heißen Sie?'], matches: ['Saludo neutro', 'Pregunta formal por el nombre'] }
        ]
    },
    { day: 2, word: 'Ich', wordTrans: 'Yo', plural: 'Wir', title: 'Pronombres Personales y Verbos Básicos', journalPrompt: 'Escribe una frase sobre qué haces hoy (ej. "Yo bebo café").', exampleSentence: 'Ich lerne Deutsch.', exampleTranslation: 'Yo aprendo alemán.', learningGoals: ["Aprender los pronombres personales (Ich, Du, Er, Sie, Es, Wir, Ihr, Sie).", "Conjugación básica de verbos regulares."], lessonContent: `<h3>Pronombres Personales</h3><p>Los pronombres son la base de toda oración. Recuerda la diferencia entre Sie (formal) y sie (ella/ellos).</p>`, tasks: [ { id:'d2-t1', icon:'✍️', color:'bg-blue-50', desc:'Escribe todos los pronombres personales y su traducción.', time:'10 min' }, { id:'d2-t2', icon:'🗣️', color:'bg-pink-50', desc:'Practica la conjugación del verbo "machen" (hacer).', time:'15 min' } ],
        miniExercises: [
            { id: 'ex2-1', type: 'fill_in', prompt: '___ arbeite in Berlin.', answer: 'Ich', hint: 'El pronombre para la primera persona' }
        ]
    },
    // ... (Se asume que el resto de los 30 días del plan se mantienen o se rellenan) ...
    { day: 30, word: 'das Zertifikat', wordTrans: 'el certificado', plural: 'die Zertifikate', title: '¡Felicidades! Logro A1', journalPrompt: 'Escribe tu reflexión del mes y tus metas futuras.', exampleSentence: 'Das Zertifikat ist wichtig.', exampleTranslation: 'El certificado es importante.', learningGoals: ["Reflexionar sobre el aprendizaje.", "Establecer metas para el Nivel A2."], lessonContent: `<h3>¡Lo lograste!</h3><p>El primer mes es el más difícil. Tómate el tiempo de celebrar tu logro y planear tu próximo paso.</p>`, tasks: [ { id:'d30-t1', icon:'🧠', color:'bg-purple-50', desc:'Revisa todas las tareas pendientes.', time:'30 min' } ] }
];

// --- INNOVACIÓN 2: VOCABULARIO EXTENDIDO PARA SRS ---
// Helper que extrae las palabras clave y les asigna un ID para el sistema SRS.
const VOCABULARIO_SRS = PLAN_DIARIO.map((day, index) => ({
    id: `wod-${index + 1}`,
    word: day.word,
    wordTrans: day.wordTrans
}));

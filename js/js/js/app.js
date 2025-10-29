// js/app.js
(function() {
    'use strict';

    // Se asume que PLAN_DIARIO y VOCABULARIO_SRS se cargan desde plan.js

    // --- Variables de Estado ---
    let state = {
        tasks: {},
        journal: {},
        streak: 0,
        lastCompletionDate: null,
        reminders: [],
        vocabularyScores: {} // INNOVACIÓN 2: Almacenará los scores SRS
    };
    let currentlyDisplayedDay = 1;
    let currentWordId = null; // INNOVACIÓN 2: ID de la palabra actual para SRS
    let currentWordData = null; // Datos de la palabra actual

    // --- Referencias del DOM (Elementos HTML) ---
    // Se declaran las variables necesarias
    let daysContainer, dayTemplate, taskTemplate, progressPercentEl, progressBar, streakEl, currentDayDisplay, headerDayDisplay;
    let jumpDay, goDay, resetProgressBtn, prevDayBtn, nextDayBtn;
    let wodWordEl, wodPluralEl, wodTranslationEl, openWordOfDayCard;
    let modalBackdrop, modalContainer, modalTitle, closeModalBtn;
    let quizView, answerView, greetingView, reminderView;
    let quizWordTrans, quizInput, quizFeedback, checkAnswerBtn, revealAnswerBtn;
    let modalMessage, modalExampleSentence, modalExampleTranslation, listenWordBtn, listenExampleBtn, prevWordBtn, nextWordBtn, closeGreetingBtn;
    let journalModal, journalCurrentDay, journalTextarea, saveJournalBtn, exportStateBtn, importStateBtn, importFile;
    
    // --- NUEVAS REFERENCIAS DOM PARA INNOVACIONES ---
    let checkGrammarBtn, aiFeedbackContainer; // INNOVACIÓN 1: Chequeo de gramática
    let srsEasyBtn, srsHardBtn; // INNOVACIÓN 2: Botones para SRS


    // --- Funciones de Estado y Persistencia ---

    function initDOMReferences() {
        // [Referencias DOM originales]
        daysContainer = document.getElementById('days-container');
        dayTemplate = document.getElementById('day-template');
        taskTemplate = document.getElementById('task-template');
        progressPercentEl = document.getElementById('progress-percent-el');
        progressBar = document.getElementById('progress-bar');
        streakEl = document.getElementById('streak-el');
        currentDayDisplay = document.getElementById('current-day-display');
        headerDayDisplay = document.getElementById('header-day-display');
        jumpDay = document.getElementById('jump-day');
        // ... (otras referencias de navegación y stats) ...

        // [Referencias DOM de Modales y Quiz]
        modalBackdrop = document.getElementById('modal-backdrop');
        quizView = document.getElementById('quiz-view');
        answerView = document.getElementById('answer-view');
        quizWordTrans = document.getElementById('quiz-word-trans');
        quizInput = document.getElementById('quiz-input');
        quizFeedback = document.getElementById('quiz-feedback');
        checkAnswerBtn = document.getElementById('check-answer-btn');
        revealAnswerBtn = document.getElementById('reveal-answer-btn');
        modalMessage = document.getElementById('modal-message');
        modalExampleSentence = document.getElementById('modal-example-sentence');
        modalExampleTranslation = document.getElementById('modal-example-translation');
        
        // [Referencias DOM del Diario]
        journalModal = document.getElementById('journalModal');
        journalTextarea = document.getElementById('journalTextarea');
        journalCurrentDay = document.querySelector('.journal-current-day');
        
        // [NUEVAS Referencias para INNOVACIONES]
        checkGrammarBtn = document.getElementById('checkGrammarBtn'); // INNOVACIÓN 1
        aiFeedbackContainer = document.getElementById('aiFeedbackContainer'); // INNOVACIÓN 1
        srsEasyBtn = document.getElementById('srsEasyBtn'); // INNOVACIÓN 2
        srsHardBtn = document.getElementById('srsHardBtn'); // INNOVACIÓN 2
    }

    function loadState() {
        const storedState = localStorage.getItem('germanPlanState');
        if (storedState) {
            state = JSON.parse(storedState);
        }
        // INNOVACIÓN 2: Asegurar que vocabularyScores existe y tiene valores por defecto si es nuevo.
        if (!state.vocabularyScores || Object.keys(state.vocabularyScores).length === 0) {
            initializeVocabularyScores();
        }
    }

    // INNOVACIÓN 2: Inicialización de scores
    function initializeVocabularyScores() {
        state.vocabularyScores = {};
        if (typeof VOCABULARIO_SRS !== 'undefined') {
             VOCABULARIO_SRS.forEach(word => {
                // score 0 = nunca visto/más difícil. lastReview 0 = nunca revisado.
                state.vocabularyScores[word.id] = { score: 0, lastReview: 0 }; 
            });
        }
    }
    
    function saveState() {
        localStorage.setItem('germanPlanState', JSON.stringify(state));
    }
    
    // ... (Otras funciones como saveJournal, updateProgress, showModal se asumen existentes) ...


    // --- INNOVACIÓN 2: SISTEMA DE REPETICIÓN ESPACIADA (SRS) ---

    function getWordForSRS() {
        // Lógica para seleccionar la palabra menos dominada o la más antigua de revisar.
        let wordToReviewId = null;
        let lowestScore = Infinity;
        let oldestReview = Infinity;

        // Asegurar que todas las palabras están en el estado si es la primera carga.
        if (Object.keys(state.vocabularyScores).length === 0 && typeof VOCABULARIO_SRS !== 'undefined') {
            initializeVocabularyScores();
            saveState();
        }

        for (const id in state.vocabularyScores) {
            const scoreData = state.vocabularyScores[id];
            
            // Si tiene un score menor (es más difícil)
            if (scoreData.score < lowestScore) {
                lowestScore = scoreData.score;
                wordToReviewId = id;
            } 
            // Si el score es el mismo, priorizar la que se revisó hace más tiempo
            else if (scoreData.score === lowestScore && scoreData.lastReview < oldestReview) {
                oldestReview = scoreData.lastReview;
                wordToReviewId = id;
            }
        }
        
        return wordToReviewId || 'wod-1'; // Fallback a Día 1
    }

    function updateSRS(wordId, difficulty) {
        if (!state.vocabularyScores[wordId]) return;

        let currentScore = state.vocabularyScores[wordId].score;

        if (difficulty === 'easy') {
            state.vocabularyScores[wordId].score = Math.min(5, currentScore + 1); // Max score 5
        } else if (difficulty === 'hard') {
            state.vocabularyScores[wordId].score = Math.max(0, currentScore - 1); // Min score 0
        }
        
        state.vocabularyScores[wordId].lastReview = Date.now();
        saveState();

        // Ocultar modal actual y preparar el siguiente quiz
        modalBackdrop.classList.add('hidden');
        modalBackdrop.style.display = 'none';

        renderWordOfTheDay();
        showModal('quiz');
    }

    function renderWordOfTheDay() {
        // INNOVACIÓN 2: Usar SRS para determinar qué palabra mostrar
        currentWordId = getWordForSRS();
        const wordIndex = parseInt(currentWordId.split('-')[1]) - 1;
        currentWordData = PLAN_DIARIO[wordIndex];

        // ... (Lógica de renderizado WOD original para el card en la página principal) ...
        // ... (Actualizar quiz-word-trans, quiz-input, etc.) ...
    }


    // --- INNOVACIÓN 1: CHEQUEO DE GRAMÁTICA CON MOCK IA ---

    function MockAIGrammarCheck() {
        const text = journalTextarea.value.trim();
        if (!text) {
            aiFeedbackContainer.textContent = 'Por favor, escribe algo en el diario para que la IA lo verifique.';
            aiFeedbackContainer.classList.remove('hidden');
            aiFeedbackContainer.classList.add('ai-feedback');
            return;
        }

        // Mostrar estado de carga de la IA
        aiFeedbackContainer.classList.remove('hidden', 'ai-feedback');
        aiFeedbackContainer.classList.add('loading');
        aiFeedbackContainer.innerHTML = '🧠 Analizando gramática con Co-Pilot IA...';
        checkGrammarBtn.disabled = true;

        // Simular llamada asíncrona a la API de IA (2 segundos de latencia)
        setTimeout(() => {
            aiFeedbackContainer.classList.remove('loading');
            checkGrammarBtn.disabled = false;

            // Simulación de Corrección y Feedback
            let correctedText = text;
            let feedback = '¡Excelente! Gramática correcta y clara. Muy buen uso de la estructura de oración.';

            // Lógica de MOCK simple para demostración:
            if (text.toLowerCase().includes('ich haben')) {
                correctedText = text.replace(/ich haben/gi, 'ich habe');
                feedback = `**Corrección Clave:** El verbo "haben" (tener) se conjuga como "ich habe", no "ich haben".\n\n**Texto Corregido (IA Co-Pilot):**\n\n\`\`\`\n${correctedText}\n\`\`\`\n\n**Análisis:** Atento a la conjugación básica del verbo.`;
            } else if (text.toLowerCase().includes('ich sein')) {
                correctedText = text.replace(/ich sein/gi, 'ich bin');
                feedback = `**Corrección Clave:** El verbo "sein" (ser/estar) se conjuga como "ich bin", no "ich sein".\n\n**Texto Corregido (IA Co-Pilot):**\n\n\`\`\`\n${correctedText}\n\`\`\`\n\n**Análisis:** ¡Sigue practicando las conjugaciones básicas!`;
            } 
            else if (text.length < 10) {
                 feedback = `**Consejo:** La gramática básica está bien, pero intenta escribir frases más largas para practicar la estructura de la oración.`;
            }

            aiFeedbackContainer.innerHTML = feedback.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            aiFeedbackContainer.classList.add('ai-feedback');
        }, 2000); // 2 segundos de simulación
    }


    // --- INNOVACIÓN 3: RENDERIZADO DE EJERCICIOS INTERACTIVOS ---

    function renderMiniExercises(dayIndex) {
        const dayData = PLAN_DIARIO[dayIndex];
        const container = document.querySelector('.mini-exercises-container');
        container.innerHTML = ''; // Limpiar ejercicios anteriores

        if (!dayData.miniExercises || dayData.miniExercises.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-center py-8">¡Aún no hay ejercicios interactivos para este día! Vuelve pronto.</p>';
            return;
        }
        
        dayData.miniExercises.forEach((exercise, index) => {
            const exerciseEl = document.createElement('div');
            exerciseEl.id = `exercise-${exercise.id}`;
            exerciseEl.classList.add('p-4', 'border', 'rounded-lg', 'bg-pink-50', 'shadow-sm');

            let html = `<p class="font-medium text-pink-700 mb-2">Ejercicio ${index + 1}:</p>`;
            let buttonText = 'Verificar';

            if (exercise.type === 'fill_in') {
                const parts = exercise.prompt.split('___');
                // Se usa el ID del ejercicio para el input
                html += `<div class="text-lg text-gray-800">${parts[0]} <input type="text" id="input-${exercise.id}" class="w-20 p-1 border-b-2 border-pink-300 focus:border-pink-500 text-pink-600 font-semibold text-center" placeholder="..." autocomplete="off"> ${parts[1]}</div>`;
                html += `<p class="text-sm text-gray-500 mt-2">Pista: ${exercise.hint}</p>`;
            } else if (exercise.type === 'match') {
                 // Simplificación: solo muestra las parejas (ejercicio de lectura/comprensión)
                html += `<p class="text-lg text-gray-800 font-semibold mb-3">Empareja el concepto:</p>`;
                html += `<div class="grid grid-cols-2 gap-2 text-sm">`;
                exercise.items.forEach((item, i) => {
                    html += `<div class="p-2 bg-white rounded border">${item}</div>`;
                    html += `<div class="p-2 bg-gray-100 rounded border font-mono">${exercise.matches[i]}</div>`;
                });
                html += `</div>`;
                buttonText = 'Entendido';
            }

            html += `<div id="feedback-${exercise.id}" class="mt-3 text-sm font-semibold"></div>`;
            html += `<button data-exid="${exercise.id}" data-type="${exercise.type}" class="mt-4 px-3 py-1 bg-pink-500 text-white rounded-md text-sm hover:bg-pink-600 check-exercise-btn">${buttonText}</button>`;
            
            exerciseEl.innerHTML = html;
            container.appendChild(exerciseEl);
        });

        // Añadir listeners para los botones de verificación de ejercicios
        container.querySelectorAll('.check-exercise-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const exId = e.target.getAttribute('data-exid');
                const exType = e.target.getAttribute('data-type');
                const dayData = PLAN_DIARIO[currentlyDisplayedDay - 1];
                const exercise = dayData.miniExercises.find(ex => ex.id === exId);

                const feedbackEl = document.getElementById(`feedback-${exId}`);
                feedbackEl.classList.remove('text-green-500', 'text-red-500');

                if (exType === 'fill_in') {
                    const input = document.getElementById(`input-${exId}`);
                    if (input.value.toLowerCase().trim() === exercise.answer.toLowerCase().trim()) {
                        feedbackEl.textContent = '¡Correcto! ✅';
                        feedbackEl.classList.add('text-green-500');
                    } else {
                        feedbackEl.textContent = `Incorrecto. Pista: "${exercise.hint}"`;
                        feedbackEl.classList.add('text-red-500');
                    }
                } else if (exType === 'match') {
                     feedbackEl.textContent = '¡Muy bien! Pasa al siguiente ejercicio. 👏';
                     feedbackEl.classList.add('text-green-500');
                }
            });
        });
    }

    // --- RENDERIZADO PRINCIPAL (MODIFICAR RENDER SINGLE DAY para pestañas) ---

    function renderSingleDay(dayIndex) {
        const day = PLAN_DIARIO[dayIndex];
        const dayTemplateClone = dayTemplate.content.cloneNode(true);
        const dayCard = dayTemplateClone.querySelector('.day-card');
        
        // Asignación de contenido (título, tareas, etc.)
        dayCard.querySelector('.day-title').textContent = `Día ${day.day}: ${day.title}`;
        dayCard.querySelector('.lesson-content').innerHTML = day.lessonContent;
        // ... (otras asignaciones de contenido) ...

        // --- Referencias de Pestañas y Contenido ---
        const lessonTab = dayCard.querySelector('.lesson-tab');
        const tasksTab = dayCard.querySelector('.tasks-tab');
        const exercisesTab = dayCard.querySelector('.exercises-tab'); 

        // --- Manejo de Pestañas (INNOVACIÓN 3) ---
        const tabButtons = dayCard.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetTab = e.target.getAttribute('data-tab');
                
                // 1. Resetear activos y ocultar contenidos
                tabButtons.forEach(btn => btn.classList.remove('active'));
                [lessonTab, tasksTab, exercisesTab].forEach(content => content.classList.add('hidden'));

                // 2. Activar la pestaña correcta
                e.target.classList.add('active');
                
                if (targetTab === 'lesson') lessonTab.classList.remove('hidden');
                if (targetTab === 'tasks') tasksTab.classList.remove('hidden');
                if (targetTab === 'exercises') {
                    exercisesTab.classList.remove('hidden');
                    // INNOVACIÓN 3: Renderizar ejercicios al abrir la pestaña
                    renderMiniExercises(dayIndex);
                }
            });
        });
        
        return dayTemplateClone;
    }

    // ... (El resto de las funciones auxiliares se mantiene) ...

    function setupEventListeners() {
        // ... (Listeners existentes) ...
        
        // --- LISTENERS DE INNOVACIÓN 1 (DIARIO/IA) ---
        if (checkGrammarBtn) checkGrammarBtn.addEventListener('click', MockAIGrammarCheck);
        if (saveJournalBtn) saveJournalBtn.addEventListener('click', () => {
             // Limpiar el feedback de la IA al guardar
             aiFeedbackContainer.classList.add('hidden');
             aiFeedbackContainer.innerHTML = '';
             // Se asume que saveJournal() existe y guarda el texto del diario
             // saveJournal(); 
        });

        // Listener para botones SRS (INNOVACIÓN 2)
        if (srsEasyBtn) srsEasyBtn.addEventListener('click', () => updateSRS(currentWordId, 'easy'));
        if (srsHardBtn) srsHardBtn.addEventListener('click', () => updateSRS(currentWordId, 'hard'));

        // ... (Otros listeners) ...
    }

    function init() {
        loadState();
        initDOMReferences(); 
        
        // Asegurarse de que el vocabulario esté inicializado para SRS
        if (Object.keys(state.vocabularyScores).length === 0) {
            initializeVocabularyScores();
            saveState();
        }

        // Simplemente renderiza la UI inicial
        // renderDays(); // Asume que esta función renderiza todos los días
        // updateUIStats(); // Asume que esta función actualiza el porcentaje y racha
        // renderWordOfTheDay(); // Llama la palabra inicial basada en SRS
        setupEventListeners();
        
        // Esto es un placeholder para asegurar que la app funciona
        if (daysContainer) {
            daysContainer.innerHTML = '';
            daysContainer.appendChild(renderSingleDay(currentlyDisplayedDay - 1));
        }

    }

    document.addEventListener('DOMContentLoaded', init);

})();

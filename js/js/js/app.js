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
        vocabularyScores: {}
    };
    let currentlyDisplayedDay = 1;
    let currentWordId = null; 
    let currentWordData = null; 

    // --- Referencias del DOM (Elementos HTML) ---
    // Variables de Navegación y Stats
    let daysContainer, dayTemplate, taskTemplate, progressPercentEl, progressBar, streakEl, currentDayDisplay, headerDayDisplay;
    let jumpDay, resetProgressBtn, prevDayBtn, nextDayBtn;
    
    // Variables de Sidebar (SRS)
    let wodTranslationEl, openWordOfDayCard, wodWordDisplay; 

    // Variables de Modales y Quiz
    let modalBackdrop, modalTitle;
    let quizView, answerView, greetingView;
    let quizWordTrans, quizInput, quizFeedback, checkAnswerBtn, revealAnswerBtn;
    let modalMessage, modalExampleSentence, modalExampleTranslation, closeGreetingBtn;
    let listenWordBtn, listenExampleBtn; 
    let journalModal, journalCurrentDay, journalTextarea, saveJournalBtn;
    let checkGrammarBtn, aiFeedbackContainer; 
    let srsEasyBtn, srsHardBtn; 

    // --- Funciones de Estado y Persistencia ---

    function initDOMReferences() {
        // [Referencias DOM de Navegación y Encabezado]
        daysContainer = document.getElementById('days-container');
        dayTemplate = document.getElementById('day-template');
        taskTemplate = document.getElementById('task-template');
        headerDayDisplay = document.getElementById('header-day-display');
        jumpDay = document.getElementById('jump-day');
        prevDayBtn = document.getElementById('prev-day-btn');
        nextDayBtn = document.getElementById('next-day-btn');
        currentDayDisplay = document.getElementById('current-day-display');

        // [Referencias DOM de Estadísticas (Sidebar)]
        progressPercentEl = document.getElementById('progress-percent-el');
        progressBar = document.getElementById('progress-bar');
        streakEl = document.getElementById('streak-el');
        resetProgressBtn = document.getElementById('reset-progress-btn');

        // [Referencias DOM de Word of the Day (WOD/SRS - Sidebar)]
        wodTranslationEl = document.getElementById('wod-translation-el');
        openWordOfDayCard = document.getElementById('open-word-of-day-card');
        wodWordDisplay = document.getElementById('wod-word-display');
        
        // [Referencias DOM de Modales y Quiz]
        modalBackdrop = document.getElementById('modal-backdrop');
        modalTitle = document.getElementById('modal-title');
        quizView = document.getElementById('quiz-view');
        answerView = document.getElementById('answer-view');
        greetingView = document.getElementById('greeting-view');
        quizWordTrans = document.getElementById('quiz-word-trans');
        quizInput = document.getElementById('quiz-input');
        quizFeedback = document.getElementById('quiz-feedback');
        checkAnswerBtn = document.getElementById('check-answer-btn');
        revealAnswerBtn = document.getElementById('reveal-answer-btn');
        modalMessage = document.getElementById('modal-message');
        modalExampleSentence = document.getElementById('modal-example-sentence');
        modalExampleTranslation = document.getElementById('modal-example-translation');
        closeGreetingBtn = document.getElementById('closeGreetingBtn');
        listenWordBtn = document.getElementById('listen-word-btn');
        listenExampleBtn = document.getElementById('listen-example-btn');
        
        // [Referencias DOM del Diario / IA]
        journalModal = document.getElementById('journalModal');
        journalTextarea = document.getElementById('journalTextarea');
        journalCurrentDay = document.querySelector('.journal-current-day');
        saveJournalBtn = document.getElementById('saveJournalBtn');
        checkGrammarBtn = document.getElementById('checkGrammarBtn'); 
        aiFeedbackContainer = document.getElementById('aiFeedbackContainer'); 
        
        // [Referencias para SRS]
        srsEasyBtn = document.getElementById('srsEasyBtn'); 
        srsHardBtn = document.getElementById('srsHardBtn'); 
    }

    function loadState() {
        const storedState = localStorage.getItem('germanPlanState');
        if (storedState) {
            state = JSON.parse(storedState);
        } else {
            currentlyDisplayedDay = 1;
        }
        if (!state.vocabularyScores || Object.keys(state.vocabularyScores).length === 0) {
            initializeVocabularyScores();
        }
    }

    function initializeVocabularyScores() {
        state.vocabularyScores = {};
        if (typeof VOCABULARIO_SRS !== 'undefined') {
             VOCABULARIO_SRS.forEach(word => {
                state.vocabularyScores[word.id] = { score: 0, lastReview: 0 }; 
            });
        }
    }
    
    function saveState() {
        localStorage.setItem('germanPlanState', JSON.stringify(state));
    }
    
    function showModal(view, dayIndex = null) {
        [quizView, answerView, greetingView, journalModal].forEach(el => {
            if (el) el.classList.add('hidden');
        });
        
        if (modalBackdrop) {
            modalBackdrop.classList.remove('hidden');
            modalBackdrop.style.display = 'block';
        }

        if (view === 'quiz' && quizView) quizView.classList.remove('hidden');
        if (view === 'answer' && answerView) answerView.classList.remove('hidden');
        if (view === 'journal' && journalModal) {
            journalModal.classList.remove('hidden');
            const dayData = PLAN_DIARIO[currentlyDisplayedDay - 1];
            if (journalCurrentDay) journalCurrentDay.textContent = currentlyDisplayedDay;
            const promptEl = document.querySelector('.journal-prompt');
            if (promptEl) promptEl.textContent = dayData.journalPrompt;
            if (journalTextarea) journalTextarea.value = state.journal[currentlyDisplayedDay] || '';
            
            if (aiFeedbackContainer) {
                aiFeedbackContainer.classList.add('hidden');
                aiFeedbackContainer.innerHTML = '';
            }
        }
        if (view === 'greeting' && greetingView) greetingView.classList.remove('hidden');
    }

    function saveJournal() {
        if (!journalTextarea) return;
        state.journal[currentlyDisplayedDay] = journalTextarea.value;
        saveState();
        if (modalBackdrop) { modalBackdrop.classList.add('hidden'); modalBackdrop.style.display = 'none'; }
    }

    function updateUIStats() {
        const totalDays = PLAN_DIARIO.length;
        const progress = currentlyDisplayedDay; 
        const percent = Math.floor((progress / totalDays) * 100);
        
        if(progressPercentEl) progressPercentEl.textContent = `${percent}%`;
        if(progressBar) progressBar.style.width = `${percent}%`;
        if(streakEl) streakEl.textContent = state.streak;
    }

    function checkAnswer() {
        const userAnswer = quizInput.value.trim().toLowerCase();
        const correctAnswer = currentWordData.word.trim().toLowerCase();

        if (userAnswer === correctAnswer) {
            if (modalTitle) modalTitle.textContent = '¡Correcto! 🎉';
            if (modalMessage) modalMessage.textContent = `La palabra "${currentWordData.wordTrans}" se dice "${currentWordData.word}".`;
            updateSRS(currentWordId, 'easy');
            showModal('answer');
        } else {
            if (quizFeedback) quizFeedback.textContent = 'Respuesta incorrecta. ¡Sigue intentando!';
            if (quizInput) quizInput.classList.add('shake-anim');
            setTimeout(() => { if (quizInput) quizInput.classList.remove('shake-anim'); }, 300);
        }
    }

    function revealAnswer() {
        if (modalTitle) modalTitle.textContent = 'Respuesta Revelada';
        if (modalMessage) modalMessage.textContent = `La palabra correcta es: "${currentWordData.word}".`;
        updateSRS(currentWordId, 'hard'); 
        showModal('answer');
    }

    function getWordForSRS() {
        let wordToReviewId = null;
        let lowestScore = Infinity;
        let oldestReview = Infinity;

        for (const id in state.vocabularyScores) {
            const scoreData = state.vocabularyScores[id];
            
            if (scoreData.score < lowestScore) {
                lowestScore = scoreData.score;
                wordToReviewId = id;
            } 
            else if (scoreData.score === lowestScore && scoreData.lastReview < oldestReview) {
                oldestReview = scoreData.lastReview;
                wordToReviewId = id;
            }
        }
        
        return wordToReviewId || 'wod-1'; 
    }

    function updateSRS(wordId, difficulty) {
        if (!state.vocabularyScores[wordId]) return;

        let currentScore = state.vocabularyScores[wordId].score;

        if (difficulty === 'easy') {
            state.vocabularyScores[wordId].score = Math.min(5, currentScore + 1); 
        } else if (difficulty === 'hard') {
            state.vocabularyScores[wordId].score = Math.max(0, currentScore - 1); 
        }
        
        state.vocabularyScores[wordId].lastReview = Date.now();
        saveState();
        renderWordOfTheDay();
    }

    function renderWordOfTheDay() {
        currentWordId = getWordForSRS();
        const wordIndex = parseInt(currentWordId.split('-')[1]) - 1;
        currentWordData = PLAN_DIARIO[wordIndex];

        if (wodTranslationEl) wodTranslationEl.textContent = currentWordData.wordTrans;
        
        if (wodWordDisplay) {
            const plural = currentWordData.plural && currentWordData.plural !== currentWordData.word ? ` (${currentWordData.plural})` : '';
            wodWordDisplay.innerHTML = `Palabra: <span class="font-bold">${currentWordData.word}${plural}</span>`;
        }
        
        if (quizWordTrans) quizWordTrans.textContent = `¿Cómo se dice "${currentWordData.wordTrans}"?`;
        if (quizInput) quizInput.value = '';
        if (quizFeedback) quizFeedback.textContent = '';
        
        if (modalExampleSentence) modalExampleSentence.textContent = currentWordData.exampleSentence;
        if (modalExampleTranslation) modalExampleTranslation.textContent = currentWordData.exampleTranslation;
    }


    function MockAIGrammarCheck() {
        const text = journalTextarea.value.trim();
        if (!text) {
            if (aiFeedbackContainer) {
                aiFeedbackContainer.textContent = 'Por favor, escribe algo en el diario para que la IA lo verifique.';
                aiFeedbackContainer.classList.remove('hidden', 'loading');
                aiFeedbackContainer.classList.add('ai-feedback');
            }
            return;
        }

        if (aiFeedbackContainer) {
            aiFeedbackContainer.classList.remove('hidden', 'ai-feedback');
            aiFeedbackContainer.classList.add('loading');
            aiFeedbackContainer.innerHTML = '🧠 Analizando gramática con Co-Pilot IA...';
        }
        if (checkGrammarBtn) checkGrammarBtn.disabled = true;

        setTimeout(() => {
            if (aiFeedbackContainer) aiFeedbackContainer.classList.remove('loading');
            if (checkGrammarBtn) checkGrammarBtn.disabled = false;

            let correctedText = text;
            let feedback = '¡Excelente! Gramática correcta y clara. Muy buen uso de la estructura de oración.';

            if (text.toLowerCase().includes('ich haben')) {
                correctedText = text.replace(/ich haben/gi, 'ich habe');
                feedback = `**Corrección Clave:** El verbo "haben" (tener) se conjuga como "ich habe", no "ich haben".\n\n**Texto Corregido (IA Co-Pilot):**\n\n\`\`\`\n${correctedText}\n\`\`\`\n\n**Análisis:** Atento a la conjugación básica del verbo.`;
            } else if (text.toLowerCase().includes('ich sein')) {
                correctedText = text.replace(/ich sein/gi, 'ich bin');
                feedback = `**Corrección Clave:** El verbo "sein" (ser/estar) se conjuga como "ich bin", no "ich sein".\n\n**Texto Corregida (IA Co-Pilot):**\n\n\`\`\`\n${correctedText}\n\`\`\`\n\n**Análisis:** ¡Sigue practicando las conjugaciones básicas!`;
            } 
            else if (text.length < 10) {
                 feedback = `**Consejo:** La gramática básica está bien, pero intenta escribir frases más largas para practicar la estructura de la oración.`;
            }

            if (aiFeedbackContainer) {
                aiFeedbackContainer.innerHTML = feedback.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                aiFeedbackContainer.classList.add('ai-feedback');
            }
        }, 2000); 
    }

    function speak(text) {
        console.log(`TTS Mock: Reproduciendo "${text}"`);
        alert(`¡Simulación de voz! Reproduciendo: "${text}"`);
    }

    function renderMiniExercises(dayIndex) {
        const dayData = PLAN_DIARIO[dayIndex];
        const container = document.querySelector('.mini-exercises-container');
        if (!container) return;
        
        container.innerHTML = ''; 

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
                html += `<div class="text-lg text-gray-800">${parts[0]} <input type="text" id="input-${exercise.id}" class="w-20 p-1 border-b-2 border-pink-300 focus:border-pink-500 text-pink-600 font-semibold text-center" placeholder="..." autocomplete="off"> ${parts[1]}</div>`;
                html += `<p class="text-sm text-gray-500 mt-2">Pista: ${exercise.hint}</p>`;
            } else if (exercise.type === 'match') {
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

        container.querySelectorAll('.check-exercise-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const exId = e.target.getAttribute('data-exid');
                const exType = e.target.getAttribute('data-type');
                const exercise = dayData.miniExercises.find(ex => ex.id === exId);
                const feedbackEl = document.getElementById(`feedback-${exId}`);
                
                feedbackEl.classList.remove('text-green-500', 'text-red-500');

                if (exType === 'fill_in') {
                    const input = document.getElementById(`input-${exId}`);
                    if (input.value.toLowerCase().trim() === exercise.answer.toLowerCase().trim()) {
                        feedbackEl.textContent = '¡Correcto! ✅';
                        feedbackEl.classList.add('text-green-500');
                    } else {
                        feedbackEl.textContent = `Incorrecto. Respuesta correcta: "${exercise.answer}"`;
                        feedbackEl.classList.add('text-red-500');
                    }
                } else if (exType === 'match') {
                     feedbackEl.textContent = '¡Muy bien! Pasa al siguiente ejercicio. 👏';
                     feedbackEl.classList.add('text-green-500');
                }
            });
        });
    }


    function renderTask(task, dayId) {
        const taskClone = taskTemplate.content.cloneNode(true);
        const taskDescription = taskClone.querySelector('.task-description');
        const taskTimeBadge = taskClone.querySelector('.task-time-badge');
        
        if (taskDescription) taskDescription.textContent = task.desc;
        if (taskTimeBadge) {
             taskTimeBadge.textContent = task.time;
             taskTimeBadge.classList.add(task.color); 
        }
        return taskClone;
    }

    function renderSingleDay(dayIndex) {
        const day = PLAN_DIARIO[dayIndex];
        const dayTemplateClone = dayTemplate.content.cloneNode(true);
        const dayCard = dayTemplateClone.querySelector('.day-card');
        
        dayCard.querySelector('.day-title').textContent = `Lección: ${day.title}`; 
        dayCard.querySelector('.lesson-content').innerHTML = day.lessonContent;
        
        const taskList = dayCard.querySelector('.task-list');
        if (taskList) taskList.innerHTML = ''; 
        if (day.tasks && taskList) {
            day.tasks.forEach(task => {
                taskList.appendChild(renderTask(task, day.day));
            });
        }

        const lessonTab = dayCard.querySelector('.lesson-tab');
        const tasksTab = dayCard.querySelector('.tasks-tab');
        const exercisesTab = dayCard.querySelector('.exercises-tab'); 

        const tabButtons = dayCard.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetTab = e.target.getAttribute('data-tab');
                
                tabButtons.forEach(btn => btn.classList.remove('active'));
                [lessonTab, tasksTab, exercisesTab].forEach(content => content.classList.add('hidden'));

                e.target.classList.add('active');
                
                if (targetTab === 'lesson') lessonTab.classList.remove('hidden');
                if (targetTab === 'tasks') tasksTab.classList.remove('hidden');
                if (targetTab === 'exercises') {
                    exercisesTab.classList.remove('hidden');
                    renderMiniExercises(dayIndex);
                }
            });
        });
        
        dayCard.querySelector('.journal-focus-btn').addEventListener('click', () => {
            currentlyDisplayedDay = day.day;
            showModal('journal');
        });
        
        return dayTemplateClone;
    }

    function renderDays() {
        if (!daysContainer) return;
        daysContainer.innerHTML = '';
        daysContainer.appendChild(renderSingleDay(currentlyDisplayedDay - 1));

        if(currentDayDisplay) currentDayDisplay.textContent = `Día ${currentlyDisplayedDay}`;
        if(headerDayDisplay) headerDayDisplay.textContent = `Día ${currentlyDisplayedDay} de ${PLAN_DIARIO.length}`;
        if (jumpDay) jumpDay.value = currentlyDisplayedDay;

        if(prevDayBtn) prevDayBtn.disabled = currentlyDisplayedDay === 1;
        if(nextDayBtn) nextDayBtn.disabled = currentlyDisplayedDay === PLAN_DIARIO.length;
    }

    function navigateDay(direction) {
        if (direction === 'next' && currentlyDisplayedDay < PLAN_DIARIO.length) {
            currentlyDisplayedDay++;
        } else if (direction === 'prev' && currentlyDisplayedDay > 1) {
            currentlyDisplayedDay--;
        }
        renderDays();
        updateUIStats();
        saveState();
    }


    // --- Inicialización y Event Listeners ---

    function setupEventListeners() {
        // Navegación
        if(prevDayBtn) prevDayBtn.addEventListener('click', () => navigateDay('prev'));
        if(nextDayBtn) nextDayBtn.addEventListener('click', () => navigateDay('next'));

        // Jump Day (en el Header)
        if (jumpDay) {
            PLAN_DIARIO.forEach(day => {
                const option = document.createElement('option');
                option.value = day.day;
                option.textContent = `Día ${day.day}`;
                jumpDay.appendChild(option);
            });
            jumpDay.addEventListener('change', (e) => {
                currentlyDisplayedDay = parseInt(e.target.value);
                renderDays();
                updateUIStats();
                saveState();
            });
        }

        // Quiz (SRS)
        if(openWordOfDayCard) openWordOfDayCard.addEventListener('click', () => showModal('quiz'));
        if(quizInput) quizInput.addEventListener('keypress', (e) => { 
            if (e.key === 'Enter') { 
                checkAnswer(); 
            } 
        });
        if(checkAnswerBtn) checkAnswerBtn.addEventListener('click', checkAnswer);
        if(revealAnswerBtn) revealAnswerBtn.addEventListener('click', revealAnswer);

        // Botones de Voz (TTS Mock)
        if (listenWordBtn) listenWordBtn.addEventListener('click', () => {
            if (currentWordData) speak(currentWordData.word);
        });
        if (listenExampleBtn) listenExampleBtn.addEventListener('click', () => {
            if (currentWordData) speak(currentWordData.exampleSentence);
        });


        // Diario / IA
        if (checkGrammarBtn) checkGrammarBtn.addEventListener('click', MockAIGrammarCheck);
        if (saveJournalBtn) saveJournalBtn.addEventListener('click', saveJournal);

        // SRS Score Buttons 
        if (srsEasyBtn) srsEasyBtn.addEventListener('click', () => {
            updateSRS(currentWordId, 'easy');
            if (modalBackdrop) { modalBackdrop.classList.add('hidden'); modalBackdrop.style.display = 'none'; }
        });
        if (srsHardBtn) srsHardBtn.addEventListener('click', () => {
            updateSRS(currentWordId, 'hard');
            if (modalBackdrop) { modalBackdrop.classList.add('hidden'); modalBackdrop.style.display = 'none'; }
        });

        // Cierre de Modales
        document.querySelectorAll('.close-modal-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (modalBackdrop) { modalBackdrop.classList.add('hidden'); modalBackdrop.style.display = 'none'; }
            });
        });
        if(modalBackdrop) modalBackdrop.addEventListener('click', (e) => { 
            if (e.target === modalBackdrop) { 
                modalBackdrop.classList.add('hidden'); modalBackdrop.style.display = 'none'; 
            } 
        });
        if(closeGreetingBtn) closeGreetingBtn.addEventListener('click', () => { 
            if (modalBackdrop) { modalBackdrop.classList.add('hidden'); modalBackdrop.style.display = 'none'; }
        });


        // Otros listeners
        if(resetProgressBtn) resetProgressBtn.addEventListener('click', () => {
             if(confirm('¿Estás seguro de que quieres reiniciar todo el progreso?')) {
                localStorage.removeItem('germanPlanState');
                window.location.reload();
            }
        });
        
        window.addEventListener('beforeunload', saveState);
    }

    function init() {
        loadState();
        initDOMReferences(); 
        
        if (Object.keys(state.vocabularyScores).length === 0) {
            initializeVocabularyScores();
            saveState();
        }

        renderWordOfTheDay(); 
        renderDays();
        updateUIStats(); 
        setupEventListeners();
        
        if (localStorage.getItem('germanPlanState') === null) {
            showModal('greeting');
        }
    }

    document.addEventListener('DOMContentLoaded', init);

})();

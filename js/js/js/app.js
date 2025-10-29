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
        vocabularyScores: {} // AÑADIDO: Estado para el SRS (CORRECCIÓN CRÍTICA)
    };
    let currentlyDisplayedDay = 1;
    let currentWordIndex = 0; // Para el Quiz de Palabra del Día (ya no se usa, pero se mantiene si se necesita)

    // --- Referencias del DOM (Elementos HTML) ---
    let daysContainer, dayTemplate, taskTemplate, progressPercentEl, progressBar, streakEl, currentDayDisplay, headerDayDisplay;
    let jumpDay, goDay, resetProgressBtn, prevDayBtn, nextDayBtn;
    // Referencias corregidas/añadidas para el SRS:
    let wodWordEl, wodTranslationEl, openWordOfDayCard; 
    let srsHardBtn, srsMediumBtn, srsEasyBtn;
    let wodTitleEl; 

    let modalBackdrop, modalContainer, modalTitle, closeModalBtn;
    let quizView, answerView, greetingView, reminderView;
    let quizWordTrans, quizInput, quizFeedback, checkAnswerBtn, revealAnswerBtn;
    let modalMessage, modalExampleSentence, modalExampleTranslation, listenWordBtn, listenExampleBtn, prevWordBtn, nextWordBtn, closeGreetingBtn;
    let journalDaySelector, journalCurrentDay, journalTextarea, saveJournalBtn, exportStateBtn, importStateBtn, importFile, autosaveNotice;
    let openReminderModalBtn, reminderInput, addReminderBtn, reminderList, closeReminderModal;

    function getElements() {
        // Contenedores y Plantillas
        daysContainer = document.getElementById('daysContainer');
        dayTemplate = document.getElementById('day-template');
        taskTemplate = document.getElementById('task-template');
        
        // Stats y Navegación
        progressPercentEl = document.getElementById('progressPercent');
        progressBar = document.getElementById('progressBar');
        streakEl = document.getElementById('streak');
        headerDayDisplay = document.getElementById('headerDayDisplay');
        currentDayDisplay = document.getElementById('currentDayDisplay');
        jumpDay = document.getElementById('jumpDay');
        goDay = document.getElementById('goDay');
        resetProgressBtn = document.getElementById('resetProgress');
        prevDayBtn = document.getElementById('prevDayBtn');
        nextDayBtn = document.getElementById('nextDayBtn');

        // Palabra del Día (SRS) - IDs Corregidos
        wodTitleEl = document.getElementById('wodTitle');
        wodWordEl = document.getElementById('wod-word-el'); 
        wodTranslationEl = document.getElementById('wod-translation-el');
        openWordOfDayCard = document.getElementById('openWordOfDayCard');
        srsHardBtn = document.getElementById('srs-hard-btn');
        srsMediumBtn = document.getElementById('srs-medium-btn');
        srsEasyBtn = document.getElementById('srs-easy-btn');
        
        // Modal (General)
        modalBackdrop = document.getElementById('modalBackdrop');
        modalContainer = document.getElementById('modal');
        modalTitle = document.getElementById('modalTitle');
        closeModalBtn = document.getElementById('closeModal');
        closeGreetingBtn = document.getElementById('closeGreetingBtn');
        
        // Modal (Views)
        quizView = document.getElementById('quizView');
        answerView = document.getElementById('answerView');
        greetingView = document.getElementById('greetingView');
        reminderView = document.getElementById('reminderView');
        
        // Modal (Quiz/Answer)
        quizWordTrans = document.getElementById('quizWordTrans');
        quizInput = document.getElementById('quizInput');
        quizFeedback = document.getElementById('quizFeedback');
        checkAnswerBtn = document.getElementById('checkAnswerBtn');
        revealAnswerBtn = document.getElementById('revealAnswerBtn');
        modalMessage = document.getElementById('modalMessage');
        modalExampleSentence = document.getElementById('modalExampleSentence');
        modalExampleTranslation = document.getElementById('modalExampleTranslation');
        listenWordBtn = document.getElementById('listenWordBtn');
        listenExampleBtn = document.getElementById('listenExampleBtn');
        prevWordBtn = document.getElementById('prevWord');
        nextWordBtn = document.getElementById('nextWord');

        // Diario
        journalDaySelector = document.getElementById('journalDay');
        journalCurrentDay = document.getElementById('journalCurrentDay');
        journalTextarea = document.getElementById('journalText');
        saveJournalBtn = document.getElementById('saveJournal');
        exportStateBtn = document.getElementById('exportState');
        importStateBtn = document.getElementById('importStateBtn');
        importFile = document.getElementById('importFile');
        autosaveNotice = document.getElementById('autosaveNotice');
        
        // Recordatorios
        openReminderModalBtn = document.getElementById('openReminderModalBtn');
        reminderInput = document.getElementById('reminderInput');
        addReminderBtn = document.getElementById('addReminderBtn');
        reminderList = document.getElementById('reminderList');
        closeReminderModal = document.getElementById('closeReminderModal');
    }

    // --- Funciones de Utilidad ---

    function getTodayKey() {
        const d = new Date();
        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }

    function calculateStreak() {
        if (!state.lastCompletionDate) {
            return 0;
        }

        let currentStreak = state.streak;
        const lastDate = new Date(state.lastCompletionDate);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        // Función para limpiar la hora
        const normalizeDate = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
        const normalizedToday = normalizeDate(today);
        const normalizedYesterday = normalizeDate(yesterday);
        const normalizedLastDate = normalizeDate(lastDate);

        // Si la última fecha es hoy, no cambia la racha.
        if (normalizedLastDate.getTime() === normalizedToday.getTime()) {
            return currentStreak;
        }

        // Si la última fecha fue ayer, incrementa la racha.
        if (normalizedLastDate.getTime() === normalizedYesterday.getTime()) {
            return currentStreak + 1;
        }

        // Si la última fecha fue anterior a ayer, la racha se rompe.
        return 0;
    }

    function updateStreakDisplay() {
        const streakValue = calculateStreak();
        streakEl.textContent = `${streakValue} Días 🔥`;
        state.streak = streakValue; // Actualiza el estado
    }

    function calculateProgress() {
        let totalTasks = 0;
        let completedTasks = 0;
        
        PLAN_DIARIO.forEach(day => {
            day.tasks.forEach(task => {
                totalTasks++;
                if (state.tasks[task.id]) {
                    completedTasks++;
                }
            });
        });

        const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        progressPercentEl.textContent = `${percentage}%`;
        progressBar.style.width = `${percentage}%`;

        // Si completó el 100% y aún no ha visto el mensaje de felicitación hoy.
        if (percentage === 100 && !localStorage.getItem('confettiShownToday')) {
            showModal('greeting', 0, '🎉 ¡Felicidades! Completaste el Nivel A1. ¡Ahora a por el A2!');
            // Marca que ya se mostró hoy para evitar spam
            localStorage.setItem('confettiShownToday', getTodayKey());
            
            // Llama a confetti
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 150,
                    spread: 60
                });
            }
        }
    }

    function saveState() {
        // Auto-guardar el diario actual antes de guardar todo el estado.
        saveJournalEntry(); 
        
        // Guardar el estado
        localStorage.setItem('germanAppProgress', JSON.stringify(state));
        
        // Guardar la fecha del día actual para la racha, solo si hoy completó tareas.
        if (Object.keys(state.tasks).some(id => state.tasks[id])) {
             localStorage.setItem('lastCompletionDate', new Date().toISOString());
        }
    }

    function loadState() {
        // Cargar estado principal
        const savedProgress = localStorage.getItem('germanAppProgress');
        if (savedProgress) {
            state = JSON.parse(savedProgress);
            
            // Corrección y compatibilidad de estado
            if (state.lastCompletionDate) {
                state.lastCompletionDate = new Date(state.lastCompletionDate).toISOString();
            }

            if (!state.reminders) {
                 state.reminders = [];
            }
            
            if (!state.vocabularyScores) { // COMPATIBILIDAD CON ESTADO ANTIGUO (CORRECCIÓN CRÍTICA)
                 state.vocabularyScores = {};
            }
        }

        // Cargar la última fecha de finalización (si se guardó separadamente)
        const savedLastDate = localStorage.getItem('lastCompletionDate');
        if (savedLastDate) {
            state.lastCompletionDate = savedLastDate;
        }

        // Mostrar mensaje de bienvenida si es la primera vez
        if (!savedProgress) {
            showModal('greeting', 0, '¡Bienvenido/a a tu Plan de Alemán A1! Sigue los días para avanzar.');
        }

        // Inicializar scores de vocabulario si es la primera vez (CORRECCIÓN CRÍTICA)
        initializeVocabularyScores();

        // Recalcular racha al inicio
        updateStreakDisplay();
    }

    // Función para sanear HTML para inyección (CSRF/XSS)
    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
    
    // --- Funciones de Lógica SRS (Palabra del Día) ---

    function initializeVocabularyScores() {
        if (typeof VOCABULARIO_SRS === 'undefined') {
            console.error("VOCABULARIO_SRS no está definido. Asegúrate de que js.plan.js se cargue correctamente.");
            return;
        }

        VOCABULARIO_SRS.forEach(wordData => {
            if (!state.vocabularyScores[wordData.id]) {
                // score: 0 (nuevo), nextReview: hoy, interval: 1 (días)
                state.vocabularyScores[wordData.id] = {
                    score: 0, 
                    nextReview: getTodayKey(), 
                    interval: 1 
                };
            }
        });
        saveState();
    }

    function getWordForSrs() {
        if (typeof VOCABULARIO_SRS === 'undefined') return null;

        const todayKey = getTodayKey();
        const wordsToReview = VOCABULARIO_SRS.filter(wordData => {
            const scoreData = state.vocabularyScores[wordData.id];
            if (!scoreData) return false;

            // Las palabras cuyo nextReview es hoy o anterior deben ser revisadas
            return scoreData.nextReview <= todayKey;
        });

        // Simplemente toma la primera palabra que necesita ser revisada.
        if (wordsToReview.length > 0) {
            return wordsToReview[0];
        }

        // Si no hay palabras para hoy, muestra la palabra del día actual o el día 1
        const currentDayData = PLAN_DIARIO[currentlyDisplayedDay - 1];
        
        return {
            id: 'no-review', 
            word: currentDayData.word, 
            wordTrans: currentDayData.wordTrans
        };
    }

    function updateScore(wordId, score) {
        if (wordId === 'no-review') {
            // No actualizar el score si no es una palabra de revisión
            console.log("No hay palabra para actualizar el score hoy.");
            renderWordOfTheDay(); // Re-renderiza para que muestre la próxima palabra disponible
            return;
        }

        let scoreData = state.vocabularyScores[wordId];
        if (!scoreData) return;

        let newScore = scoreData.score;
        let newInterval = scoreData.interval;

        // Lógica simple de SRS:
        // 1 (Difícil): Intervalo = 1 día. Score = 0.
        // 2 (Medio): Intervalo = Intervalo anterior + 1. Score++.
        // 3 (Fácil): Intervalo = Intervalo anterior * 2. Score++.

        if (score === 1) { // Difícil
            newInterval = 1;
            newScore = 0;
        } else if (score === 2) { // Medio
            newInterval = newInterval + 1;
            newScore = newScore + 1;
        } else if (score === 3) { // Fácil
            newInterval = newInterval * 2;
            newScore = newScore + 1;
        }

        // Asegura que el intervalo sea al menos 1 día
        if (newInterval < 1) newInterval = 1;

        // Calcular la fecha de próxima revisión
        const nextReviewDate = new Date();
        nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);
        
        // Actualizar el estado
        state.vocabularyScores[wordId] = {
            score: newScore,
            nextReview: `${nextReviewDate.getFullYear()}-${nextReviewDate.getMonth() + 1}-${nextReviewDate.getDate()}`,
            interval: newInterval
        };

        saveState();
        renderWordOfTheDay(); // Cargar la siguiente palabra
    }
    
    function renderWordOfTheDay() {
        const wordData = getWordForSrs();

        if (!wodWordEl || !wodTranslationEl || !wodTitleEl) return;
        
        if (wordData && wordData.id !== 'no-review') {
            const scoreData = state.vocabularyScores[wordData.id];
            wodTitleEl.textContent = `Palabra para Repasar (SRS)`;
            wodTranslationEl.textContent = escapeHtml(wordData.wordTrans);
            wodWordEl.textContent = escapeHtml(wordData.word);
            openWordOfDayCard.classList.remove('no-review');
            
            // Opcional: Mostrar la próxima revisión
            if (scoreData && scoreData.interval > 1) {
                wodWordEl.title = `Próx. Revisión en: ${scoreData.interval} días (${scoreData.nextReview})`;
            } else {
                 wodWordEl.title = 'Palabra nueva o difícil. Revisar mañana.';
            }

        } else {
            // No hay palabras para repasar hoy
            wodTitleEl.textContent = `¡Revisión Completada! (Día ${currentlyDisplayedDay})`;
            wodTranslationEl.textContent = escapeHtml(wordData.wordTrans || 'Ninguna');
            wodWordEl.textContent = escapeHtml(wordData.word || 'Palabra');
            wodWordEl.title = 'No hay palabras pendientes de revisión hoy.';
            openWordOfDayCard.classList.add('no-review');
        }
    }

    function initializeSrsListeners() {
        // Asigna un listener a cada botón SRS
        if (srsHardBtn) srsHardBtn.addEventListener('click', (e) => {
            const currentWord = getWordForSrs();
            if (currentWord) updateScore(currentWord.id, parseInt(e.target.dataset.score));
        });
        if (srsMediumBtn) srsMediumBtn.addEventListener('click', (e) => {
            const currentWord = getWordForSrs();
            if (currentWord) updateScore(currentWord.id, parseInt(e.target.dataset.score));
        });
        if (srsEasyBtn) srsEasyBtn.addEventListener('click', (e) => {
            const currentWord = getWordForSrs();
            if (currentWord) updateScore(currentWord.id, parseInt(e.target.dataset.score));
        });
        
        // Esto podría abrir un modal de quiz más tarde, por ahora solo muestra/oculta.
        if (openWordOfDayCard) openWordOfDayCard.addEventListener('click', () => {
             // Lógica futura para un modal de quiz más completo
        });
    }

    // --- Funciones de Renderizado ---

    function renderDays() {
        if (!daysContainer || !dayTemplate) return;
        daysContainer.innerHTML = '';
        
        PLAN_DIARIO.forEach(dayData => {
            const dayEl = renderSingleDay(dayData);
            daysContainer.appendChild(dayEl);
        });
        
        // Resaltar el día actual o el más avanzado sin completar
        const firstIncompleteDay = PLAN_DIARIO.find(day => day.tasks.some(task => !state.tasks[task.id]));
        const targetDay = firstIncompleteDay ? firstIncompleteDay.day : PLAN_DIARIO.length;
        
        currentlyDisplayedDay = targetDay;
        
        // Mostrar solo el día actual, ocultar los demás inicialmente
        document.querySelectorAll('.day-article').forEach(el => el.classList.add('hidden'));
        const activeDayEl = document.querySelector(`.day-article[data-day="${currentlyDisplayedDay}"]`);
        if (activeDayEl) {
            activeDayEl.classList.remove('hidden');
        }

        updateNavigationButtons();
        updateDayDisplay();
    }

    function renderSingleDay(dayData) {
        const clone = dayTemplate.content.cloneNode(true);
        const article = clone.querySelector('article');
        
        article.classList.add('day-article');
        article.setAttribute('data-day', dayData.day);

        const titleEl = clone.querySelector('.day-title');
        titleEl.textContent = `📅 Día ${dayData.day}: ${dayData.title}`;
        
        const wordEl = clone.querySelector('.day-word strong');
        wordEl.textContent = dayData.word;
        
        // Lesson Content
        const lessonContentEl = clone.querySelector('.lesson-content');
        lessonContentEl.innerHTML = dayData.lessonContent || 'Contenido de la lección no disponible.'; // Sanear si es necesario
        
        // Task List
        const taskList = clone.querySelector('.task-list');
        dayData.tasks.forEach(task => {
            const taskEl = renderSingleTask(task, dayData.day);
            taskList.appendChild(taskEl);
        });

        // Day Status
        const dayStatusEl = clone.querySelector('.day-status');
        const totalTasks = dayData.tasks.length;
        const completedTasks = dayData.tasks.filter(task => state.tasks[task.id]).length;
        dayStatusEl.textContent = `${completedTasks} / ${totalTasks} tareas`;

        if (completedTasks === totalTasks) {
             dayStatusEl.classList.add('text-pink-600', 'font-bold');
        } else {
             dayStatusEl.classList.remove('text-pink-600', 'font-bold');
        }

        // Eventos de Pestañas
        const tabButtons = clone.querySelectorAll('.tab-button');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetTab = e.target.getAttribute('data-tab');
                const tabsContainer = e.target.closest('article');
                
                // Activar el botón
                tabsContainer.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                // Mostrar el contenido
                tabsContainer.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
                tabsContainer.querySelector(`.${targetTab}-tab`).classList.remove('hidden');
            });
        });

        // Evento de Botón del Diario
        const journalFocusBtn = clone.querySelector('.journal-focus-btn');
        journalFocusBtn.addEventListener('click', () => {
            selectJournalDay(dayData.day);
            // Hacer scroll suave hacia el área del diario
            journalTextarea.scrollIntoView({ behavior: 'smooth', block: 'start' });
            journalTextarea.focus();
        });

        return article;
    }

    function renderSingleTask(task, day) {
        const clone = taskTemplate.content.cloneNode(true);
        const li = clone.querySelector('.task-item');
        li.setAttribute('data-task-id', task.id);
        li.setAttribute('data-day', day);
        
        const checkbox = clone.querySelector('.task-checkbox');
        checkbox.id = task.id; // Asignar ID al checkbox
        checkbox.checked = !!state.tasks[task.id];
        
        const label = clone.querySelector('.task-label');
        label.setAttribute('for', task.id); // Asignar for al label
        
        const descEl = clone.querySelector('.task-desc');
        descEl.textContent = task.desc;
        
        const iconEl = clone.querySelector('.task-icon');
        iconEl.textContent = task.icon;
        
        const timeEl = clone.querySelector('.task-time');
        timeEl.textContent = task.time;

        // Estilo de tarea completada
        if (checkbox.checked) {
            label.classList.add('task-done');
        } else {
            label.classList.remove('task-done');
        }

        // Listener
        checkbox.addEventListener('change', (e) => {
            state.tasks[task.id] = e.target.checked;

            // Actualizar estilo
            if (e.target.checked) {
                label.classList.add('task-done');
            } else {
                label.classList.remove('task-done');
            }

            // Re-renderizar el estado del día y las estadísticas
            updateDayStatus(day);
            calculateProgress();
            
            // Lógica de Racha
            if (e.target.checked) {
                const currentDayTasks = PLAN_DIARIO.find(d => d.day == day).tasks;
                const allCompleted = currentDayTasks.every(t => state.tasks[t.id]);

                // Solo actualiza la racha si el día está 100% completado.
                if (allCompleted) {
                    const todayKey = getTodayKey();
                    const lastCompletionKey = localStorage.getItem('lastCompletionDateKey');

                    // Si la última finalización fue ayer o hoy (y no hay una marca de hoy), actualiza la fecha.
                    if (!lastCompletionKey || lastCompletionKey !== todayKey) {
                        // Aquí se actualiza la fecha de finalización. La racha se recalcula en `updateStreakDisplay`.
                        state.lastCompletionDate = new Date().toISOString();
                        localStorage.setItem('lastCompletionDateKey', todayKey); // Marca la racha de HOY
                    }
                }
            }
            updateStreakDisplay();
            saveState();
        });
        
        return clone;
    }

    function updateDayStatus(day) {
        const dayData = PLAN_DIARIO.find(d => d.day == day);
        if (!dayData) return;
        
        const totalTasks = dayData.tasks.length;
        const completedTasks = dayData.tasks.filter(task => state.tasks[task.id]).length;
        
        const article = document.querySelector(`.day-article[data-day="${day}"]`);
        if (article) {
            const dayStatusEl = article.querySelector('.day-status');
            dayStatusEl.textContent = `${completedTasks} / ${totalTasks} tareas`;

            if (completedTasks === totalTasks) {
                dayStatusEl.classList.add('text-pink-600', 'font-bold');
            } else {
                dayStatusEl.classList.remove('text-pink-600', 'font-bold');
            }
        }
    }

    // --- Funciones de Navegación ---

    function updateDayDisplay() {
        headerDayDisplay.textContent = `Día ${currentlyDisplayedDay} / ${PLAN_DIARIO.length}`;
        currentDayDisplay.textContent = `Día ${currentlyDisplayedDay} / ${PLAN_DIARIO.length}`;
        updateNavigationButtons();

        // Actualizar el diario al cambiar de día
        selectJournalDay(currentlyDisplayedDay);
        
        // Re-renderizar el SRS para que muestre la palabra del día actual si no hay revisión pendiente
        renderWordOfTheDay(); 

        // Muestra el día actual y oculta los demás
        document.querySelectorAll('.day-article').forEach(el => el.classList.add('hidden'));
        const activeDayEl = document.querySelector(`.day-article[data-day="${currentlyDisplayedDay}"]`);
        if (activeDayEl) {
            activeDayEl.classList.remove('hidden');
            activeDayEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function updateNavigationButtons() {
        prevDayBtn.disabled = currentlyDisplayedDay <= 1;
        nextDayBtn.disabled = currentlyDisplayedDay >= PLAN_DIARIO.length;
    }

    function goToDay(day) {
        if (day >= 1 && day <= PLAN_DIARIO.length) {
            currentlyDisplayedDay = day;
            updateDayDisplay();
        }
    }

    function prevDay() {
        goToDay(currentlyDisplayedDay - 1);
    }

    function nextDay() {
        goToDay(currentlyDisplayedDay + 1);
    }
    
    // --- Funciones de Diario ---

    function selectJournalDay(day) {
        if (journalDaySelector) {
            journalDaySelector.value = day;
            journalCurrentDay.textContent = `Día ${day}`;
            journalTextarea.value = state.journal[day] || '';
            journalTextarea.focus();
        }
    }

    function saveJournalEntry() {
        if (journalDaySelector) {
            const day = journalDaySelector.value;
            const text = journalTextarea.value;
            state.journal[day] = text;
            saveState();
            showAutosaveNotice();
        }
    }

    function showAutosaveNotice() {
        if (autosaveNotice) {
            autosaveNotice.classList.remove('opacity-0');
            autosaveNotice.classList.add('opacity-100');
            setTimeout(() => {
                autosaveNotice.classList.remove('opacity-100');
                autosaveNotice.classList.add('opacity-0');
            }, 2000);
        }
    }

    // --- Funciones de Recordatorios ---

    function addReminder() {
        if (!reminderInput || !addReminderBtn) return;

        const text = reminderInput.value.trim();
        if (text) {
            state.reminders.push({ id: Date.now(), text, completed: false });
            reminderInput.value = '';
            renderReminders();
            saveState();
        }
    }

    function toggleReminder(id) {
        const reminder = state.reminders.find(r => r.id === id);
        if (reminder) {
            reminder.completed = !reminder.completed;
            renderReminders();
            saveState();
        }
    }

    function removeReminder(id) {
        state.reminders = state.reminders.filter(r => r.id !== id);
        renderReminders();
        saveState();
    }

    function renderReminders() {
        if (!reminderList) return;

        reminderList.innerHTML = '';
        state.reminders.forEach(reminder => {
            const li = document.createElement('li');
            li.className = 'flex justify-between items-center p-2 rounded-md transition hover:bg-gray-50';
            li.innerHTML = `
                <label class="checkbox-wrap w-full cursor-pointer">
                    <input type="checkbox" class="task-checkbox" ${reminder.completed ? 'checked' : ''} data-id="${reminder.id}">
                    <span class="checkbox-box mr-3"><span class="tick">✓</span></span>
                    <span class="ml-4 ${reminder.completed ? 'line-through text-gray-500' : 'text-gray-800'}">${escapeHtml(reminder.text)}</span>
                </label>
                <button data-id="${reminder.id}" class="remove-reminder-btn text-gray-400 hover:text-red-500 transition ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            `;
            
            li.querySelector('input[type="checkbox"]').addEventListener('change', (e) => {
                toggleReminder(parseInt(e.target.dataset.id));
            });
            
            li.querySelector('.remove-reminder-btn').addEventListener('click', (e) => {
                removeReminder(parseInt(e.currentTarget.dataset.id));
            });

            reminderList.appendChild(li);
        });
    }
    
    // --- Funciones de Import/Export (Mantenidas para completitud) ---
    
    if (exportStateBtn) {
        exportStateBtn.addEventListener('click', () => {
            const stateJson = JSON.stringify(state, null, 2);
            const blob = new Blob([stateJson], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'german_a1_progress.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    if (importStateBtn) {
        importStateBtn.addEventListener('click', () => {
            if (importFile) {
                importFile.click();
            }
        });
    }

    if (importFile) {
        importFile.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedState = JSON.parse(e.target.result);
                    // Validación mínima de la estructura importada
                    if (importedState.tasks && importedState.journal && importedState.vocabularyScores) {
                        state = importedState;
                        // Asegura la re-inicialización y compatibilidad del SRS
                        initializeVocabularyScores(); 
                        saveState();
                        // Re-renderizar toda la aplicación
                        renderDays(); 
                        calculateProgress();
                        renderReminders();
                        alert('Progreso importado con éxito!');
                    } else {
                        alert('Error al importar: el archivo JSON no tiene la estructura de progreso esperada.');
                    }
                } catch (error) {
                    alert('Error al importar: el archivo no es un JSON válido.');
                    console.error('Import error:', error);
                }
            };
            reader.readAsText(file);
        });
    }
    
    // Función para reiniciar el progreso
    if (resetProgressBtn) {
        resetProgressBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres REINICIAR TODO tu progreso, racha, tareas y diario? Esta acción es irreversible.')) {
                localStorage.removeItem('germanAppProgress');
                localStorage.removeItem('lastCompletionDate');
                localStorage.removeItem('lastCompletionDateKey');
                localStorage.removeItem('confettiShownToday');
                window.location.reload();
            }
        });
    }


    // --- Funciones de Modal ---

    function showModal(view, wordIndex, message = '') {
        if (!modalBackdrop || !modalContainer) return;
        
        // Reiniciar las vistas
        quizView.classList.add('hidden');
        answerView.classList.add('hidden');
        greetingView.classList.add('hidden');
        reminderView.classList.add('hidden');
        
        modalMessage.textContent = message;

        if (view === 'quiz') {
            modalTitle.textContent = 'Palabra del Día (SRS)';
            quizView.classList.remove('hidden');
            // ... (Lógica de Quiz aquí si se implementa un modal)
        } else if (view === 'answer') {
            modalTitle.textContent = 'Respuesta';
            answerView.classList.remove('hidden');
        } else if (view === 'greeting') {
            modalTitle.textContent = '¡Bienvenido/a!';
            greetingView.classList.remove('hidden');
        } else if (view === 'reminder') {
            modalTitle.textContent = 'Recordatorios';
            reminderView.classList.remove('hidden');
            renderReminders();
        }

        // Mostrar el modal
        modalBackdrop.classList.remove('hidden');
        modalBackdrop.style.display = 'flex';
        modalContainer.classList.remove('scale-0');
        modalContainer.classList.add('scale-100');
    }

    // --- Inicialización ---

    function init() {
        getElements();
        loadState();
        renderDays(); // Renderiza los días y selecciona el día actual
        calculateProgress();
        renderWordOfTheDay(); // Llama a la lógica SRS
        initializeSrsListeners();

        // Eventos de Navegación
        if (prevDayBtn) prevDayBtn.addEventListener('click', prevDay);
        if (nextDayBtn) nextDayBtn.addEventListener('click', nextDay);
        if (goDay) goDay.addEventListener('click', () => {
            const day = parseInt(jumpDay.value);
            if (!isNaN(day)) goToDay(day);
        });
        
        // Eventos de Diario
        if (journalDaySelector) {
            PLAN_DIARIO.forEach(day => {
                const option = document.createElement('option');
                option.value = day.day;
                option.textContent = `Día ${day.day}: ${day.title}`;
                journalDaySelector.appendChild(option);
            });
            journalDaySelector.addEventListener('change', (e) => {
                saveJournalEntry(); // Guarda la entrada anterior
                selectJournalDay(parseInt(e.target.value));
            });
            // Auto-guardar mientras se escribe
            journalTextarea.addEventListener('input', saveJournalEntry);
        }
        
        // Eventos de Recordatorios
        if (openReminderModalBtn) openReminderModalBtn.addEventListener('click', () => { showModal('reminder', currentlyDisplayedDay - 1); });
        if (addReminderBtn) addReminderBtn.addEventListener('click', addReminder);
        if (reminderInput) reminderInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') { addReminder(); } });
        if (closeReminderModal) closeReminderModal.addEventListener('click', () => { if (modalBackdrop) { modalBackdrop.classList.add('hidden'); modalBackdrop.style.display = 'none'; } });
        
        // Cierre de Modal
        if (closeModalBtn) closeModalBtn.addEventListener('click', () => { if (modalBackdrop) { modalBackdrop.classList.add('hidden'); modalBackdrop.style.display = 'none'; } });
        if (closeGreetingBtn) closeGreetingBtn.addEventListener('click', () => { if (modalBackdrop) { modalBackdrop.classList.add('hidden'); modalBackdrop.style.display = 'none'; } });
        if (modalBackdrop) modalBackdrop.addEventListener('click', (e) => { 
            if (e.target === modalBackdrop) { 
                modalBackdrop.classList.add('hidden'); modalBackdrop.style.display = 'none'; 
            } 
        });

        // Guardar estado al cerrar/recargar
        window.addEventListener('beforeunload', saveState);
    }

    // --- Iniciar la Aplicación ---
    init();
})();

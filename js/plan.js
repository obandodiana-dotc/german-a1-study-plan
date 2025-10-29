// js/app.js
(function() {
    'use strict';

    // Se asume que PLAN_DIARIO se carga desde plan.js

    // --- Variables de Estado ---
    let state = {
        tasks: {},
        journal: {},
        streak: 0,
        lastCompletionDate: null,
        reminders: []
    };
    let currentlyDisplayedDay = 1;
    let currentWordIndex = 0; // Para el Quiz de Palabra del Día

    // --- Referencias del DOM (Elementos HTML) ---
    // En el código original se usaban variables globales. Aquí se mantienen para mínima refactorización,
    // pero se agruparán en una función para encontrarlas fácilmente.
    let daysContainer, dayTemplate, taskTemplate, progressPercentEl, progressBar, streakEl, currentDayDisplay, headerDayDisplay;
    let jumpDay, goDay, resetProgressBtn, prevDayBtn, nextDayBtn;
    let wodWordEl, wodPluralEl, wodTranslationEl, openWordOfDayCard;
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

        // Palabra del Día (WOTD)
        wodWordEl = document.getElementById('wodWord');
        wodPluralEl = document.getElementById('wodPlural');
        wodTranslationEl = document.getElementById('wodTranslation');
        openWordOfDayCard = document.getElementById('openWordOfDayCard');

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
        
        // Muestra el día actual y oculta los demás
        document.querySelectorAll('.day-article').forEach(el => el.classList.add('hidden'));
        const activeDayEl = document.querySelector(`.day-article[data-day="${currentlyDisplayedDay}"]`);
        if (activeDayEl) {
            activeDayEl.classList.remove('hidden');
        }
    }

    function updateNavigationButtons() {
        prevDayBtn.disabled = currentlyDisplayedDay === 1;
        nextDayBtn.disabled = currentlyDisplayedDay === PLAN_DIARIO.length;
    }

    function goToDay(day) {
        if (day < 1 || day > PLAN_DIARIO.length) return;
        currentlyDisplayedDay = day;
        updateDayDisplay();
    }

    // --- Funciones de Diario (Journal) ---

    function populateJournalDaySelector() {
        journalDaySelector.innerHTML = '';
        for (let i = 1; i <= PLAN_DIARIO.length; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Día ${i}`;
            journalDaySelector.appendChild(option);
        }
    }

    function selectJournalDay(day) {
        const dayKey = `day-${day}`;
        journalTextarea.value = state.journal[dayKey] || '';
        journalCurrentDay.textContent = day;
        journalDaySelector.value = day;

        // Actualizar el prompt en el placeholder
        const dayData = PLAN_DIARIO.find(d => d.day == day);
        if (dayData && dayData.journalPrompt) {
            journalTextarea.placeholder = dayData.journalPrompt;
        } else {
            journalTextarea.placeholder = 'Escribe tus frases, dudas y reflexiones aquí...';
        }
    }

    function saveJournalEntry() {
        const day = journalDaySelector.value;
        if (!day) return;
        const dayKey = `day-${day}`;
        const text = journalTextarea.value.trim();
        
        if (text) {
            state.journal[dayKey] = text;
        } else {
            delete state.journal[dayKey]; // Limpiar si está vacío
        }
        
        saveState();
        autosaveNotice.textContent = 'Guardado automático: ' + new Date().toLocaleTimeString();
    }

    // --- Funciones de Importación/Exportación ---

    function exportState() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "german_app_progress.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        alert('Progreso exportado exitosamente como german_app_progress.json');
    }

    function importState(file) {
        if (!file) {
            alert('Por favor, selecciona un archivo de progreso.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const importedState = JSON.parse(event.target.result);
                
                // Validación básica de la estructura
                if (importedState && importedState.tasks && importedState.journal) {
                    // Cargar el nuevo estado
                    state = importedState;
                    saveState();
                    loadState(); // Recargar el estado para aplicar los cambios
                    renderDays(); // Volver a dibujar todo con el progreso
                    calculateProgress(); // Recalcular barra
                    updateStreakDisplay(); // Recalcular racha
                    renderReminders(); // Redibujar recordatorios
                    alert('Progreso importado con éxito. La página se ha actualizado.');
                } else {
                    throw new Error("Estructura de archivo de progreso no válida.");
                }
            } catch (e) {
                alert('Error al importar el archivo: ' + e.message + '. Asegúrate de que es un archivo JSON válido de progreso.');
            }
        };
        reader.readAsText(file);
    }

    // --- Funciones de Quiz de Palabra del Día (WOTD Quiz) ---

    function getWordOfTheDay() {
        const day = currentlyDisplayedDay; // Usar el día actual para el quiz
        const dayData = PLAN_DIARIO.find(d => d.day === day);
        if (!dayData) return null;

        // Seleccionar una palabra al azar o la clave del día.
        const wordKey = dayData.word;
        const translation = dayData.wordTrans;
        const plural = dayData.plural;
        const exampleSentence = dayData.exampleSentence;
        const exampleTranslation = dayData.exampleTranslation;
        
        return { 
            word: wordKey, 
            translation: translation, 
            plural: plural, 
            exampleSentence: exampleSentence, 
            exampleTranslation: exampleTranslation
        };
    }

    function showModal(view, index = 0, message = '') {
        // Ocultar todas las vistas
        quizView.classList.add('hidden');
        answerView.classList.add('hidden');
        greetingView.classList.add('hidden');
        reminderView.classList.add('hidden');

        // Mostrar la vista requerida
        if (view === 'quiz') {
            currentWordIndex = index;
            const wod = PLAN_DIARIO[currentWordIndex];
            if (!wod) return;

            quizView.classList.remove('hidden');
            modalTitle.textContent = 'Wort des Tages Quiz';
            quizWordTrans.textContent = wod.translation;
            quizInput.value = '';
            quizFeedback.textContent = '';
            checkAnswerBtn.disabled = false;
            quizInput.focus();
            
        } else if (view === 'answer') {
            currentWordIndex = index;
            const wod = PLAN_DIARIO[currentWordIndex];
            if (!wod) return;
            
            answerView.classList.remove('hidden');
            modalTitle.textContent = 'Respuesta';
            modalMessage.textContent = message;
            modalExampleSentence.textContent = wod.exampleSentence;
            modalExampleTranslation.textContent = wod.exampleTranslation;
            
        } else if (view === 'greeting') {
            greetingView.classList.remove('hidden');
            modalTitle.textContent = '¡Hola! 👋';
            document.getElementById('greetingMessage').textContent = message;
            
        } else if (view === 'reminder') {
            reminderView.classList.remove('hidden');
            modalTitle.textContent = 'Notas y Recordatorios';
            renderReminders();
        }
        
        // Mostrar el modal
        modalBackdrop.classList.remove('hidden');
        modalBackdrop.style.display = 'flex';
        modalContainer.classList.add('scale-100', 'opacity-100');
        modalContainer.classList.remove('scale-95', 'opacity-0');
    }

    function checkAnswer() {
        const day = PLAN_DIARIO[currentWordIndex];
        if (!day) return;
        
        const answer = quizInput.value.trim().toLowerCase();
        const correctWord = day.word.toLowerCase();

        // Limpiar artículos para comparación simple
        const simpleCorrectWord = correctWord.replace(/^(der|die|das)\s+/, '');

        // Si la palabra correcta incluye un artículo, acepta ambas formas
        const isCorrect = answer === correctWord || (correctWord.includes(' ') && answer === simpleCorrectWord);
        
        if (isCorrect) {
            // Animación de Confetti
            if (typeof confetti === 'function') {
                confetti({ particleCount: 50, spread: 30, origin: { y: 0.6 } });
            }
            
            showModal('answer', currentWordIndex, `¡Correcto! La palabra del día es "${day.word}".`);
            checkAnswerBtn.disabled = true;
        } else {
            quizFeedback.textContent = 'Respuesta incorrecta. Inténtalo de nuevo.';
            quizInput.classList.add('shake-anim');
            setTimeout(() => quizInput.classList.remove('shake-anim'), 300);
        }
    }

    function revealAnswer() {
        const day = PLAN_DIARIO[currentWordIndex];
        if (!day) return;
        
        showModal('answer', currentWordIndex, `La palabra del día es **${day.word}** (${day.wordTrans}).`);
        checkAnswerBtn.disabled = true;
    }

    function nextQuizWord(direction) {
        let newIndex = currentWordIndex + direction;

        if (newIndex < 0) {
            newIndex = PLAN_DIARIO.length - 1;
        } else if (newIndex >= PLAN_DIARIO.length) {
            newIndex = 0;
        }

        showModal('quiz', newIndex);
    }
    
    // --- Funciones de Audio ---

    function speakGerman(text) {
        if (!('speechSynthesis' in window) || !text) {
            console.warn("Speech Synthesis no es soportado por este navegador o el texto está vacío.");
            return;
        }
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'de-DE';
        
        // Configuración opcional para mejorar la voz (puede variar por navegador)
        const voices = speechSynthesis.getVoices();
        const germanVoice = voices.find(voice => voice.lang === 'de-DE');
        if (germanVoice) {
            utterance.voice = germanVoice;
        }
        
        speechSynthesis.speak(utterance);
    }
    
    // --- Funciones de Recordatorios ---

    function renderReminders() {
        if (!reminderList) return;
        reminderList.innerHTML = '';
        
        if (state.reminders.length === 0) {
            reminderList.innerHTML = '<li class="text-gray-500 italic text-sm">No hay notas guardadas.</li>';
            return;
        }

        state.reminders.forEach((reminder, index) => {
            const li = document.createElement('li');
            li.className = 'text-gray-800 flex justify-between items-center text-sm p-2 bg-gray-50 rounded-md border border-gray-100';
            li.innerHTML = `
                <span>${escapeHtml(reminder)}</span>
                <button data-index="${index}" class="remove-reminder-btn text-red-500 hover:text-red-700 ml-2 p-1 rounded-full hover:bg-red-100 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            `;
            reminderList.appendChild(li);
        });
        
        // Añadir listeners para borrar
        document.querySelectorAll('.remove-reminder-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.getAttribute('data-index'));
                removeReminder(index);
            });
        });
    }

    function addReminder() {
        if (!reminderInput || !addReminderBtn) return;
        const text = reminderInput.value.trim();
        
        if (text) {
            state.reminders.push(text);
            reminderInput.value = '';
            renderReminders();
            saveState();
        } else {
             reminderInput.focus();
        }
    }

    function removeReminder(index) {
        if (index > -1 && index < state.reminders.length) {
            state.reminders.splice(index, 1);
            renderReminders();
            saveState();
        }
    }


    // --- INICIALIZACIÓN ---

    function initializeApp() {
        // 1. Obtener referencias del DOM
        getElements();

        // 2. Cargar el estado guardado
        loadState();

        // 3. Renderizar la interfaz
        populateJournalDaySelector();
        renderDays(); // Esto también configura el día actual (currentlyDisplayedDay)
        calculateProgress(); // Calcular y mostrar estadísticas

        // 4. Palabra del Día (WOTD)
        const initialWod = getWordOfTheDay();
        if (initialWod) {
            wodWordEl.textContent = initialWod.word;
            wodPluralEl.textContent = `Plural: ${initialWod.plural || 'n/a'}`;
            wodTranslationEl.textContent = initialWod.translation;
        }

        // 5. Asignar Event Listeners

        // Navegación
        if (prevDayBtn) prevDayBtn.addEventListener('click', () => goToDay(currentlyDisplayedDay - 1));
        if (nextDayBtn) nextDayBtn.addEventListener('click', () => goToDay(currentlyDisplayedDay + 1));
        if (goDay) goDay.addEventListener('click', () => {
            const day = parseInt(jumpDay.value);
            if (day) goToDay(day);
        });

        // Diario
        if (journalDaySelector) journalDaySelector.addEventListener('change', (e) => selectJournalDay(parseInt(e.target.value)));
        if (journalTextarea) journalTextarea.addEventListener('input', saveJournalEntry);
        if (saveJournalBtn) saveJournalBtn.addEventListener('click', saveJournalEntry);

        // Import/Export
        if (exportStateBtn) exportStateBtn.addEventListener('click', exportState);
        if (importStateBtn) importStateBtn.addEventListener('click', () => importFile.click());
        if (importFile) importFile.addEventListener('change', (e) => importState(e.target.files[0]));

        // Reset
        if (resetProgressBtn) resetProgressBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres reiniciar TODO tu progreso? Esta acción es irreversible (a menos que importes un archivo de guardado).')) {
                localStorage.removeItem('germanAppProgress');
                localStorage.removeItem('lastCompletionDate');
                localStorage.removeItem('lastCompletionDateKey');
                state = { tasks: {}, journal: {}, streak: 0, lastCompletionDate: null, reminders: [] };
                initializeApp(); // Reinicializa la app
            }
        });

        // Quiz/Modal
        if (openWordOfDayCard) openWordOfDayCard.addEventListener('click', () => { showModal('quiz', currentlyDisplayedDay - 1); });
        if (checkAnswerBtn) checkAnswerBtn.addEventListener('click', checkAnswer);
        if (revealAnswerBtn) revealAnswerBtn.addEventListener('click', revealAnswer);
        if (quizInput) quizInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkAnswer();
            }
        });
        
        // Navegación dentro del Modal (Palabra Siguiente/Anterior)
        if (prevWordBtn) prevWordBtn.addEventListener('click', () => { nextQuizWord(-1); });
        if (nextWordBtn) nextWordBtn.addEventListener('click', () => { nextQuizWord(1); });

        // Audio
        if (listenWordBtn) listenWordBtn.addEventListener('click', () => { 
            const day = PLAN_DIARIO[currentWordIndex];
            if (day) speakGerman(day.word); 
        });
        if (listenExampleBtn) listenExampleBtn.addEventListener('click', () => { 
            const day = PLAN_DIARIO[currentWordIndex]; 
            if (day) speakGerman(day.exampleSentence); 
        });
        
        // Recordatorios
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

    // --- INICIO ---
    document.addEventListener('DOMContentLoaded', initializeApp);

})(); // Fin IIFE

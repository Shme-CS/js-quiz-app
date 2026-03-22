// ===================================
// Application State Management
// ===================================
const appState = {
    currentCategory: null,
    currentDifficulty: 'medium',
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    timer: null,
    timeLeft: 30,
    userAnswers: [],
    startTime: null,
    endTime: null,
    highScore: 0
};

// ===================================
// DOM Elements
// ===================================
const elements = {
    // Screens
    startScreen: document.getElementById('startScreen'),
    quizScreen: document.getElementById('quizScreen'),
    resultScreen: document.getElementById('resultScreen'),
    reviewScreen: document.getElementById('reviewScreen'),
    
    // Start Screen
    categoryButtons: document.querySelectorAll('.category-btn'),
    difficultyButtons: document.querySelectorAll('.difficulty-btn'),
    highScoreDisplay: document.getElementById('highScoreDisplay'),
    
    // Quiz Screen
    currentCategory: document.getElementById('currentCategory'),
    currentDifficulty: document.getElementById('currentDifficulty'),
    timer: document.getElementById('timer'),
    timerValue: document.getElementById('timerValue'),
    questionNumber: document.getElementById('questionNumber'),
    totalQuestions: document.getElementById('totalQuestions'),
    progressFill: document.getElementById('progressFill'),
    questionText: document.getElementById('questionText'),
    answersGrid: document.getElementById('answersGrid'),
    currentScore: document.getElementById('currentScore'),
    
    // Result Screen
    resultIcon: document.getElementById('resultIcon'),
    resultTitle: document.getElementById('resultTitle'),
    scorePercentage: document.getElementById('scorePercentage'),
    finalScore: document.getElementById('finalScore'),
    finalTotal: document.getElementById('finalTotal'),
    resultMessage: document.getElementById('resultMessage'),
    correctAnswers: document.getElementById('correctAnswers'),
    wrongAnswers: document.getElementById('wrongAnswers'),
    totalTime: document.getElementById('totalTime'),
    reviewBtn: document.getElementById('reviewBtn'),
    restartBtn: document.getElementById('restartBtn'),
    homeBtn: document.getElementById('homeBtn'),
    
    // Review Screen
    reviewContainer: document.getElementById('reviewContainer'),
    backToResultBtn: document.getElementById('backToResultBtn'),
    
    // Theme Toggle
    themeToggle: document.getElementById('themeToggle')
};

// ===================================
// Initialize Application
// ===================================
function initializeApp() {
    loadHighScore();
    setupEventListeners();
    loadTheme();
}

// ===================================
// Event Listeners Setup
// ===================================
function setupEventListeners() {
    // Category selection
    elements.categoryButtons.forEach(btn => {
        btn.addEventListener('click', handleCategorySelection);
    });
    
    // Difficulty selection
    elements.difficultyButtons.forEach(btn => {
        btn.addEventListener('click', handleDifficultySelection);
    });
    
    // Result screen buttons
    elements.reviewBtn.addEventListener('click', showReviewScreen);
    elements.restartBtn.addEventListener('click', restartQuiz);
    elements.homeBtn.addEventListener('click', goToHome);
    elements.backToResultBtn.addEventListener('click', backToResults);
    
    // Theme toggle
    elements.themeToggle.addEventListener('click', toggleTheme);
}

// ===================================
// Category Selection Handler
// ===================================
function handleCategorySelection(e) {
    const category = e.currentTarget.dataset.category;
    
    // Update UI
    elements.categoryButtons.forEach(btn => btn.classList.remove('selected'));
    e.currentTarget.classList.add('selected');
    
    // Set category and start quiz
    appState.currentCategory = category;
    startQuiz();
}

// ===================================
// Difficulty Selection Handler
// ===================================
function handleDifficultySelection(e) {
    const difficulty = e.currentTarget.dataset.difficulty;
    
    // Update UI
    elements.difficultyButtons.forEach(btn => btn.classList.remove('active'));
    e.currentTarget.classList.add('active');
    
    // Set difficulty
    appState.currentDifficulty = difficulty;
}

// ===================================
// Start Quiz
// ===================================
function startQuiz() {
    if (!appState.currentCategory) return;
    
    // Reset state
    appState.currentQuestionIndex = 0;
    appState.score = 0;
    appState.userAnswers = [];
    appState.startTime = Date.now();
    
    // Load and filter questions
    loadQuestions();
    
    // Update UI
    elements.currentCategory.textContent = appState.currentCategory.toUpperCase();
    elements.currentDifficulty.textContent = appState.currentDifficulty.toUpperCase();
    elements.totalQuestions.textContent = appState.questions.length;
    elements.currentScore.textContent = appState.score;
    
    // Show quiz screen
    showScreen('quizScreen');
    
    // Render first question
    renderQuestion();
}

// ===================================
// Load Questions
// ===================================
function loadQuestions() {
    const categoryQuestions = quizQuestions[appState.currentCategory] || [];
    
    // Filter by difficulty
    let filteredQuestions = categoryQuestions.filter(
        q => q.difficulty === appState.currentDifficulty
    );
    
    // Randomize questions
    filteredQuestions = shuffleArray(filteredQuestions);
    
    // Take first 10 questions
    appState.questions = filteredQuestions.slice(0, 10);
}

// ===================================
// Render Question
// ===================================
function renderQuestion() {
    const question = appState.questions[appState.currentQuestionIndex];
    
    if (!question) {
        endQuiz();
        return;
    }
    
    // Update question number and progress
    elements.questionNumber.textContent = appState.currentQuestionIndex + 1;
    updateProgress();
    
    // Display question
    elements.questionText.textContent = question.question;
    
    // Clear previous answers
    elements.answersGrid.innerHTML = '';
    
    // Render answer buttons
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer;
        button.addEventListener('click', () => handleAnswerSelection(index));
        elements.answersGrid.appendChild(button);
    });
    
    // Start timer
    startTimer();
}

// ===================================
// Handle Answer Selection
// ===================================
function handleAnswerSelection(selectedIndex) {
    stopTimer();
    
    const question = appState.questions[appState.currentQuestionIndex];
    const isCorrect = selectedIndex === question.correct;
    
    // Store user answer
    appState.userAnswers.push({
        question: question.question,
        userAnswer: selectedIndex,
        correctAnswer: question.correct,
        answers: question.answers,
        isCorrect: isCorrect
    });
    
    // Update score
    if (isCorrect) {
        appState.score++;
        elements.currentScore.textContent = appState.score;
        playSound('correct');
    } else {
        playSound('wrong');
    }
    
    // Visual feedback
    const buttons = elements.answersGrid.querySelectorAll('.answer-btn');
    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === question.correct) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            btn.classList.add('wrong');
        }
    });
    
    // Move to next question after delay
    setTimeout(() => {
        appState.currentQuestionIndex++;
        renderQuestion();
    }, 1500);
}

// ===================================
// Timer Functions
// ===================================
function startTimer() {
    appState.timeLeft = 30;
    elements.timerValue.textContent = appState.timeLeft;
    elements.timer.classList.remove('warning');
    
    appState.timer = setInterval(() => {
        appState.timeLeft--;
        elements.timerValue.textContent = appState.timeLeft;
        
        if (appState.timeLeft <= 10) {
            elements.timer.classList.add('warning');
        }
        
        if (appState.timeLeft <= 0) {
            handleTimeout();
        }
    }, 1000);
}

function stopTimer() {
    if (appState.timer) {
        clearInterval(appState.timer);
        appState.timer = null;
    }
}

function handleTimeout() {
    stopTimer();
    
    const question = appState.questions[appState.currentQuestionIndex];
    
    // Store timeout as wrong answer
    appState.userAnswers.push({
        question: question.question,
        userAnswer: -1,
        correctAnswer: question.correct,
        answers: question.answers,
        isCorrect: false
    });
    
    // Show correct answer
    const buttons = elements.answersGrid.querySelectorAll('.answer-btn');
    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === question.correct) {
            btn.classList.add('correct');
        }
    });
    
    playSound('timeout');
    
    // Move to next question
    setTimeout(() => {
        appState.currentQuestionIndex++;
        renderQuestion();
    }, 1500);
}

// ===================================
// Update Progress Bar
// ===================================
function updateProgress() {
    const progress = ((appState.currentQuestionIndex + 1) / appState.questions.length) * 100;
    elements.progressFill.style.width = `${progress}%`;
}

// ===================================
// End Quiz
// ===================================
function endQuiz() {
    stopTimer();
    appState.endTime = Date.now();
    calculateScore();
    showResults();
    saveHighScore();
}

// ===================================
// Calculate Score
// ===================================
function calculateScore() {
    const totalQuestions = appState.questions.length;
    const correctCount = appState.score;
    const wrongCount = totalQuestions - correctCount;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const timeTaken = Math.round((appState.endTime - appState.startTime) / 1000);
    
    return {
        total: totalQuestions,
        correct: correctCount,
        wrong: wrongCount,
        percentage: percentage,
        time: timeTaken
    };
}

// ===================================
// Show Results
// ===================================
function showResults() {
    const results = calculateScore();
    
    // Update result display
    elements.scorePercentage.textContent = `${results.percentage}%`;
    elements.finalScore.textContent = results.correct;
    elements.finalTotal.textContent = results.total;
    elements.correctAnswers.textContent = results.correct;
    elements.wrongAnswers.textContent = results.wrong;
    elements.totalTime.textContent = `${results.time}s`;
    
    // Set result message and icon
    if (results.percentage >= 90) {
        elements.resultIcon.textContent = '🏆';
        elements.resultTitle.textContent = 'Outstanding!';
        elements.resultMessage.textContent = 'You are a true master!';
    } else if (results.percentage >= 70) {
        elements.resultIcon.textContent = '🎉';
        elements.resultTitle.textContent = 'Great Job!';
        elements.resultMessage.textContent = 'You did really well!';
    } else if (results.percentage >= 50) {
        elements.resultIcon.textContent = '👍';
        elements.resultTitle.textContent = 'Good Effort!';
        elements.resultMessage.textContent = 'Keep practicing!';
    } else {
        elements.resultIcon.textContent = '📚';
        elements.resultTitle.textContent = 'Keep Learning!';
        elements.resultMessage.textContent = 'Practice makes perfect!';
    }
    
    // Show result screen
    showScreen('resultScreen');
}

// ===================================
// Show Review Screen
// ===================================
function showReviewScreen() {
    elements.reviewContainer.innerHTML = '';
    
    appState.userAnswers.forEach((answer, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.className = `review-item ${answer.isCorrect ? 'correct' : 'wrong'}`;
        
        const questionDiv = document.createElement('div');
        questionDiv.className = 'review-question';
        questionDiv.textContent = `${index + 1}. ${answer.question}`;
        
        const userAnswerDiv = document.createElement('div');
        userAnswerDiv.className = `review-answer ${answer.isCorrect ? 'correct-answer' : 'wrong-answer'}`;
        userAnswerDiv.textContent = answer.userAnswer === -1 
            ? 'Your Answer: Time Out' 
            : `Your Answer: ${answer.answers[answer.userAnswer]}`;
        
        reviewItem.appendChild(questionDiv);
        reviewItem.appendChild(userAnswerDiv);
        
        if (!answer.isCorrect) {
            const correctAnswerDiv = document.createElement('div');
            correctAnswerDiv.className = 'review-answer correct-answer';
            correctAnswerDiv.textContent = `Correct Answer: ${answer.answers[answer.correctAnswer]}`;
            reviewItem.appendChild(correctAnswerDiv);
        }
        
        elements.reviewContainer.appendChild(reviewItem);
    });
    
    showScreen('reviewScreen');
}

// ===================================
// Restart Quiz
// ===================================
function restartQuiz() {
    startQuiz();
}

// ===================================
// Go to Home
// ===================================
function goToHome() {
    // Reset category selection
    elements.categoryButtons.forEach(btn => btn.classList.remove('selected'));
    appState.currentCategory = null;
    
    showScreen('startScreen');
}

// ===================================
// Back to Results
// ===================================
function backToResults() {
    showScreen('resultScreen');
}

// ===================================
// Screen Management
// ===================================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// ===================================
// Local Storage Functions
// ===================================
function saveHighScore() {
    if (appState.score > appState.highScore) {
        appState.highScore = appState.score;
        localStorage.setItem('quizHighScore', appState.highScore);
        elements.highScoreDisplay.textContent = appState.highScore;
    }
}

function loadHighScore() {
    const savedHighScore = localStorage.getItem('quizHighScore');
    if (savedHighScore) {
        appState.highScore = parseInt(savedHighScore);
        elements.highScoreDisplay.textContent = appState.highScore;
    }
}

// ===================================
// Theme Management
// ===================================
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('quizTheme', newTheme);
    
    // Update icon
    elements.themeToggle.querySelector('.theme-icon').textContent = 
        newTheme === 'dark' ? '☀️' : '🌙';
}

function loadTheme() {
    const savedTheme = localStorage.getItem('quizTheme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    elements.themeToggle.querySelector('.theme-icon').textContent = 
        savedTheme === 'dark' ? '☀️' : '🌙';
}

// ===================================
// Utility Functions
// ===================================
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function playSound(type) {
    // Sound feedback placeholder
    // In production, you would load and play actual audio files
    console.log(`Playing ${type} sound`);
}

// ===================================
// Initialize App on Load
// ===================================
document.addEventListener('DOMContentLoaded', initializeApp);

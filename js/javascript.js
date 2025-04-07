const questions = [
    {
        question: "Which language is used for web development alongside HTML and CSS?",
        options: ["Java", "Python", "JavaScript", "C++"],
        answer: "JavaScript"
    },
    {
        question: "Which keyword is used to define a constant variable in JavaScript?",
        options: ["var", "let", "const", "static"],
        answer: "const"
    },
    {
        question: "What is the output of `typeof NaN` in JavaScript?",
        options: ["NaN", "number", "undefined", "string"],
        answer: "number"
    },
    {
        question: "Which method is used to add an element to the end of an array in JavaScript?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        answer: "push()"
    },
    {
        question: "Which JavaScript method is used to remove the last element from an array?",
        options: ["pop()", "push()", "splice()", "shift()"],
        answer: "pop()"
    },
    {
        question: "Which of the following is a JavaScript framework/library?",
        options: ["React", "Django", "Laravel", "Spring"],
        answer: "React"
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: ["//", "/* */", "#", "--"],
        answer: "//"
    },
    {
        question: "Which function is used to parse a JSON string into a JavaScript object?",
        options: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.convert()"],
        answer: "JSON.parse()"
    },
    {
        question: "What will `console.log(2 + '2')` output in JavaScript?",
        options: ["4", "22", "Error", "undefined"],
        answer: "22"
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Netscape", "Microsoft", "Sun Microsystems", "IBM"],
        answer: "Netscape"
    },
    {
        question: "Which of the following is a JavaScript data type?",
        options: ["string", "number", "boolean", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "Which function is used to convert a JavaScript object into a JSON string?",
        options: ["JSON.stringify()", "JSON.parse()", "JSON.encode()", "JSON.convert()"],
        answer: "JSON.stringify()"
    },
    {
        question: "What is the output of `Boolean('false')` in JavaScript?",
        options: ["true", "false", "Error", "undefined"],
        answer: "true"
    },
    {
        question: "Which JavaScript loop executes at least once before checking the condition?",
        options: ["for", "while", "do...while", "foreach"],
        answer: "do...while"
    },
    {
        question: "Which operator is used for strict comparison in JavaScript?",
        options: ["==", "===", "!=", "="],
        answer: "==="
    }
];


let currentQuestionIndex = 0;
let score = 0;
const timeLimit = 15; // seconds
let timeLeft = timeLimit;
let timer;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const timerEl = document.getElementById('timer');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const finalScoreEl = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');
let highScore = localStorage.getItem('highScore') ? JSON.parse(localStorage.getItem('highScore')) : { score: 0, time: '' };


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add('d-none');
    quizContainer.classList.remove('d-none');
    showQuestion();
}

function showQuestion() {
    clearInterval(timer);
    timeLeft = timeLimit;
    updateTimerDisplay();
    timer = setInterval(updateTimer, 1000);

    feedbackEl.textContent = '';
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-outline-primary', 'mt-2', 'fade-in');
        button.textContent = option;
        button.onclick = () => selectAnswer(option, button);
        optionsEl.appendChild(button);
    });
}

function updateTimer() {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
        clearInterval(timer);
        selectAnswer(null, null);
    }
}

function updateTimerDisplay() {
    timerEl.textContent = `Time left: ${timeLeft}s`;
}

function selectAnswer(selectedOption, buttonElement) {
    clearInterval(timer);
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
        if (buttonElement) buttonElement.classList.add('correct');
        feedbackEl.textContent = 'Correct!';
        feedbackEl.classList.remove('text-danger');
        feedbackEl.classList.add('text-success');
        score++;
    } else {
        if (buttonElement) buttonElement.classList.add('incorrect');
        feedbackEl.textContent = `Wrong! The correct answer was: ${currentQuestion.answer}`;
        feedbackEl.classList.remove('text-success');
        feedbackEl.classList.add('text-danger');
    }
    // Automatically move to the next question after a delay
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    }, 2000); // 2-second delay for feedback
}

function displayHighScore() {
    const highscoreEl = document.getElementById('highscore');
    if (highScore.score > 0) {
        highscoreEl.textContent = `Score: ${highScore.score} (Achieved on: ${highScore.time})`;
    } else {
        highscoreEl.textContent = 'No highscore yet';
    }
}
function updateHighScore() {
    const currentTime = new Date().toLocaleString(); // Get the current date and time
    if (score > highScore.score) {
        highScore = { score: score, time: currentTime };
        localStorage.setItem('highScore', JSON.stringify(highScore));
        displayHighScore(); // Update the displayed high score
    }
}

function endQuiz() {
    quizContainer.classList.add('d-none');
    resultContainer.classList.remove('d-none');
    finalScoreEl.textContent = `Your final score is ${score} out of ${questions.length}.`;

    updateHighScore(); // Update high score if necessary

    localStorage.setItem('quizScore', score);
}

// Initialize the quiz and display the highest score
startQuiz();
displayHighScore();
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "HyperText Markup Language",
            "HyperTransfer Markup Language",
            "HighText Markup Language",
            "HyperText Machine Language"
        ],
        answer: "HyperText Markup Language"
    },
    {
        question: "Which HTML tag is used to define the main heading of a webpage?",
        options: ["<h1>", "<head>", "<title>", "<header>"],
        answer: "<h1>"
    },
    {
        question: "Which tag is used to create a hyperlink in HTML?",
        options: ["<a>", "<link>", "<href>", "<nav>"],
        answer: "<a>"
    },
    {
        question: "Which HTML tag is used to insert an image?",
        options: ["<img>", "<picture>", "<src>", "<image>"],
        answer: "<img>"
    },
    {
        question: "Which attribute is used in an <img> tag to define an alternative text?",
        options: ["alt", "title", "src", "href"],
        answer: "alt"
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: ["color", "background-color", "text-color", "font-color"],
        answer: "color"
    },
    {
        question: "Which HTML tag is used to define a table?",
        options: ["<table>", "<tr>", "<td>", "<tab>"],
        answer: "<table>"
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Cascading Style Sheet",
            "Creative Style System",
            "Computer Styling Sheet",
            "Colorful Style Sheet"
        ],
        answer: "Cascading Style Sheet"
    },
    {
        question: "Which CSS property is used to set the background color of an element?",
        options: ["background-color", "color", "bgcolor", "background"],
        answer: "background-color"
    },
    {
        question: "Which CSS property is used to control the space between elements?",
        options: ["margin", "padding", "border", "spacing"],
        answer: "margin"
    },
    {
        question: "Which CSS property is used to make text bold?",
        options: ["font-weight", "font-style", "text-bold", "bold"],
        answer: "font-weight"
    },
    {
        question: "Which HTML tag is used to create an ordered list?",
        options: ["<ol>", "<ul>", "<li>", "<list>"],
        answer: "<ol>"
    },
    {
        question: "Which CSS property is used to make an element invisible without removing its space?",
        options: ["visibility: hidden", "display: none", "opacity: 0", "hidden: true"],
        answer: "visibility: hidden"
    },
    {
        question: "Which HTML tag is used to create a line break?",
        options: ["<br>", "<lb>", "<break>", "<hr>"],
        answer: "<br>"
    },
    {
        question: "Which CSS property is used to set the font size of an element?",
        options: ["font-size", "text-size", "size", "font"],
        answer: "font-size"
    }
];


let currentQuestionIndex = 0;
let score = 0;
const timeLimit = 15; // seconds
let timeLeft = timeLimit;
let timer;
let highScore = localStorage.getItem('highScore') ? JSON.parse(localStorage.getItem('highScore')) : { score: 0, time: '' };


const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const timerEl = document.getElementById('timer');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const finalScoreEl = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');

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
const questions = [
    {
        question: "What does SQL stand for?",
        options: [
            "Structured Query Language",
            "System Query Language",
            "Sequential Query Language",
            "Standard Query Language"
        ],
        answer: "Structured Query Language"
    },
    {
        question: "Which of the following is a NoSQL database?",
        options: ["MongoDB", "MySQL", "PostgreSQL", "SQL Server"],
        answer: "MongoDB"
    },
    {
        question: "Which SQL clause is used to filter records based on a specific condition?",
        options: ["WHERE", "HAVING", "FILTER", "ORDER BY"],
        answer: "WHERE"
    },
    {
        question: "Which SQL statement is used to remove all records from a table without deleting the table itself?",
        options: ["DELETE", "DROP", "REMOVE", "TRUNCATE"],
        answer: "TRUNCATE"
    },
    {
        question: "Which of the following is a relational database?",
        options: ["MongoDB", "Redis", "MySQL", "Cassandra"],
        answer: "MySQL"
    },
    {
        question: "What type of NoSQL database is MongoDB?",
        options: ["Document-based", "Key-Value", "Graph-based", "Column-based"],
        answer: "Document-based"
    },
    {
        question: "Which SQL command is used to retrieve data from a database?",
        options: ["SELECT", "FETCH", "GET", "RETRIEVE"],
        answer: "SELECT"
    },
    {
        question: "Which of the following is NOT a NoSQL database?",
        options: ["PostgreSQL", "Cassandra", "DynamoDB", "CouchDB"],
        answer: "PostgreSQL"
    },
    {
        question: "Which SQL statement is used to insert new records into a table?",
        options: ["INSERT INTO", "ADD", "CREATE RECORD", "APPEND"],
        answer: "INSERT INTO"
    },
    {
        question: "What is the purpose of the PRIMARY KEY in a relational database?",
        options: [
            "Uniquely identifies each record in a table",
            "Links two tables together",
            "Speeds up queries",
            "Defines foreign key constraints"
        ],
        answer: "Uniquely identifies each record in a table"
    },
    {
        question: "Which SQL keyword is used to update existing records in a table?",
        options: ["UPDATE", "MODIFY", "CHANGE", "ALTER"],
        answer: "UPDATE"
    },
    {
        question: "What does ACID stand for in database transactions?",
        options: [
            "Atomicity, Consistency, Isolation, Durability",
            "Association, Connection, Integrity, Dependability",
            "Automated, Configurable, Integrated, Durable",
            "Access, Control, Integrity, Data"
        ],
        answer: "Atomicity, Consistency, Isolation, Durability"
    },
    {
        question: "Which SQL constraint ensures that a column cannot have duplicate values?",
        options: ["UNIQUE", "NOT NULL", "PRIMARY KEY", "CHECK"],
        answer: "UNIQUE"
    },
    {
        question: "Which NoSQL database is widely used by Facebook for real-time messaging?",
        options: ["Cassandra", "MySQL", "PostgreSQL", "Oracle"],
        answer: "Cassandra"
    },
    {
        question: "What is the main advantage of using NoSQL databases over relational databases?",
        options: [
            "Better scalability and flexibility",
            "Faster for all types of queries",
            "More security than SQL databases",
            "Easier to use for structured data"
        ],
        answer: "Better scalability and flexibility"
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

function endQuiz() {
    quizContainer.classList.add('d-none');
    resultContainer.classList.remove('d-none');
    finalScoreEl.textContent = `Your final score is ${score} out of ${questions.length}.`;
    localStorage.setItem('quizScore', score);
}

restartBtn.onclick = startQuiz;

// Initialize the quiz
startQuiz();
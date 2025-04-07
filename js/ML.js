const questions = [
    {
        question: "What is Machine Learning?",
        options: [
            "A subset of AI that enables systems to learn from data",
            "A programming language for AI development",
            "A software that writes its own code",
            "A type of computer hardware"
        ],
        answer: "A subset of AI that enables systems to learn from data"
    },
    {
        question: "Which of the following is a type of Machine Learning?",
        options: ["Supervised Learning", "Quantum Learning", "Artificial Learning", "Deep Search"],
        answer: "Supervised Learning"
    },
    {
        question: "Which algorithm is commonly used for classification problems?",
        options: ["Decision Tree", "K-Means Clustering", "Apriori Algorithm", "Linear Regression"],
        answer: "Decision Tree"
    },
    {
        question: "What is overfitting in Machine Learning?",
        options: [
            "When a model learns too much noise from the training data",
            "When a model is too simple to capture patterns",
            "When a model performs well on test data but poorly on training data",
            "When a model uses excessive computational power"
        ],
        answer: "When a model learns too much noise from the training data"
    },
    {
        question: "Which of the following is an unsupervised learning algorithm?",
        options: ["K-Means Clustering", "Logistic Regression", "Random Forest", "Support Vector Machine"],
        answer: "K-Means Clustering"
    },
    {
        question: "What is the purpose of the activation function in a neural network?",
        options: [
            "To introduce non-linearity",
            "To increase the learning rate",
            "To normalize the input data",
            "To prevent overfitting"
        ],
        answer: "To introduce non-linearity"
    },
    {
        question: "Which library is commonly used for deep learning?",
        options: ["TensorFlow", "Pandas", "Scikit-Learn", "Matplotlib"],
        answer: "TensorFlow"
    },
    {
        question: "What is a feature in Machine Learning?",
        options: [
            "An individual measurable property of data",
            "A label for supervised learning",
            "A type of learning algorithm",
            "A special function used in AI"
        ],
        answer: "An individual measurable property of data"
    },
    {
        question: "Which metric is commonly used to evaluate classification models?",
        options: ["Accuracy", "Mean Squared Error", "Root Mean Square Error", "R-Squared"],
        answer: "Accuracy"
    },
    {
        question: "Which Machine Learning technique is used for making recommendations?",
        options: ["Collaborative Filtering", "Reinforcement Learning", "Principal Component Analysis", "K-Means Clustering"],
        answer: "Collaborative Filtering"
    },
    {
        question: "What is backpropagation in neural networks?",
        options: [
            "A method used to update weights",
            "A technique to collect training data",
            "A way to preprocess data",
            "A method to remove noise from the dataset"
        ],
        answer: "A method used to update weights"
    },
    {
        question: "Which of the following is NOT a supervised learning algorithm?",
        options: ["K-Means", "Linear Regression", "Support Vector Machine", "Neural Network"],
        answer: "K-Means"
    },
    {
        question: "Which Machine Learning model is best suited for time-series forecasting?",
        options: ["Recurrent Neural Network (RNN)", "Naive Bayes", "Decision Tree", "Random Forest"],
        answer: "Recurrent Neural Network (RNN)"
    },
    {
        question: "What does a confusion matrix help with?",
        options: [
            "Evaluating the performance of a classification model",
            "Visualizing the dataset",
            "Reducing overfitting",
            "Detecting missing values in the dataset"
        ],
        answer: "Evaluating the performance of a classification model"
    },
    {
        question: "Which Machine Learning model is commonly used for image recognition?",
        options: ["Convolutional Neural Network (CNN)", "Decision Tree", "Naive Bayes", "K-Nearest Neighbors"],
        answer: "Convolutional Neural Network (CNN)"
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
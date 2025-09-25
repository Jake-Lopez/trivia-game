// Trivia Game JavaScript

class TriviaGame {
    constructor() {
        this.questions = [
            {
                question: "What is the capital of Australia?",
                answers: ["Sydney", "Melbourne", "Canberra", "Perth"],
                correct: 2,
                category: "Geography"
            },
            {
                question: "Who painted the famous artwork 'The Starry Night'?",
                answers: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Claude Monet"],
                correct: 1,
                category: "Art"
            },
            {
                question: "What is the chemical symbol for gold?",
                answers: ["Go", "Gd", "Au", "Ag"],
                correct: 2,
                category: "Science"
            },
            {
                question: "In which year did World War II end?",
                answers: ["1944", "1945", "1946", "1947"],
                correct: 1,
                category: "History"
            },
            {
                question: "What is the largest planet in our solar system?",
                answers: ["Saturn", "Jupiter", "Neptune", "Earth"],
                correct: 1,
                category: "Science"
            },
            {
                question: "Who wrote the novel 'Pride and Prejudice'?",
                answers: ["Charlotte Brontë", "Emily Dickinson", "Jane Austen", "Virginia Woolf"],
                correct: 2,
                category: "Literature"
            },
            {
                question: "What is the smallest country in the world?",
                answers: ["Monaco", "Nauru", "Vatican City", "San Marino"],
                correct: 2,
                category: "Geography"
            },
            {
                question: "Which element has the chemical symbol 'O'?",
                answers: ["Osmium", "Oxygen", "Oganesson", "Olivine"],
                correct: 1,
                category: "Science"
            },
            {
                question: "In Greek mythology, who is the king of the gods?",
                answers: ["Poseidon", "Hades", "Apollo", "Zeus"],
                correct: 3,
                category: "Mythology"
            },
            {
                question: "What is the longest river in the world?",
                answers: ["Amazon River", "Nile River", "Mississippi River", "Yangtze River"],
                correct: 1,
                category: "Geography"
            }
        ];

        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.gameState = 'start'; // start, playing, results, review

        this.initializeElements();
        this.attachEventListeners();
        this.showScreen('start-screen');
    }

    initializeElements() {
        // Screens
        this.startScreen = document.getElementById('start-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.resultsScreen = document.getElementById('results-screen');
        this.reviewScreen = document.getElementById('review-screen');

        // Game elements
        this.questionText = document.getElementById('question-text');
        this.answersContainer = document.getElementById('answers-container');
        this.scoreElement = document.getElementById('score');
        this.currentQuestionElement = document.getElementById('current-question');
        this.totalQuestionsElement = document.getElementById('total-questions');
        this.progressBar = document.getElementById('progress');
        this.feedbackElement = document.getElementById('feedback');
        this.nextBtn = document.getElementById('next-btn');

        // Results elements
        this.finalScoreElement = document.getElementById('final-score');
        this.performanceMessageElement = document.getElementById('performance-message');

        // Review elements
        this.reviewContainer = document.getElementById('review-container');

        // Buttons
        this.startBtn = document.getElementById('start-btn');
        this.playAgainBtn = document.getElementById('play-again-btn');
        this.reviewBtn = document.getElementById('review-btn');
        this.backToResultsBtn = document.getElementById('back-to-results-btn');

        // Set total questions
        this.totalQuestionsElement.textContent = this.questions.length;
    }

    attachEventListeners() {
        this.startBtn.addEventListener('click', () => this.startGame());
        this.playAgainBtn.addEventListener('click', () => this.resetGame());
        this.reviewBtn.addEventListener('click', () => this.showReview());
        this.backToResultsBtn.addEventListener('click', () => this.showScreen('results-screen'));
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
    }

    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        document.getElementById(screenId).classList.add('active');
    }

    startGame() {
        this.gameState = 'playing';
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.showScreen('game-screen');
        this.updateGameInfo();
        this.displayQuestion();
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        
        // Update question text
        this.questionText.textContent = question.question;
        
        // Clear previous answers
        this.answersContainer.innerHTML = '';
        
        // Create answer buttons
        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = answer;
            button.addEventListener('click', () => this.selectAnswer(index));
            this.answersContainer.appendChild(button);
        });

        // Update progress bar
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        this.progressBar.style.width = `${progress}%`;

        // Clear feedback and hide next button
        this.feedbackElement.innerHTML = '';
        this.feedbackElement.className = 'feedback';
        this.nextBtn.style.display = 'none';
    }

    selectAnswer(selectedIndex) {
        const question = this.questions[this.currentQuestionIndex];
        const buttons = document.querySelectorAll('.answer-btn');
        const isCorrect = selectedIndex === question.correct;

        // Store user's answer
        this.userAnswers.push({
            question: question.question,
            userAnswer: selectedIndex,
            correctAnswer: question.correct,
            isCorrect: isCorrect,
            category: question.category
        });

        // Update score
        if (isCorrect) {
            this.score++;
        }

        // Disable all buttons and show feedback
        buttons.forEach((button, index) => {
            button.disabled = true;
            
            if (index === question.correct) {
                button.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                button.classList.add('incorrect');
            }
        });

        // Show feedback
        this.showFeedback(isCorrect, question.answers[question.correct]);
        
        // Update game info
        this.updateGameInfo();

        // Show next button or finish game
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.nextBtn.style.display = 'block';
        } else {
            setTimeout(() => this.showResults(), 2000);
        }
    }

    showFeedback(isCorrect, correctAnswer) {
        if (isCorrect) {
            this.feedbackElement.innerHTML = '🎉 Correct! Well done!';
            this.feedbackElement.className = 'feedback correct';
        } else {
            this.feedbackElement.innerHTML = `❌ Incorrect. The correct answer is: ${correctAnswer}`;
            this.feedbackElement.className = 'feedback incorrect';
        }
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.displayQuestion();
    }

    updateGameInfo() {
        this.scoreElement.textContent = this.score;
        this.currentQuestionElement.textContent = this.currentQuestionIndex + 1;
    }

    showResults() {
        this.gameState = 'results';
        this.showScreen('results-screen');
        
        const percentage = Math.round((this.score / this.questions.length) * 100);
        this.finalScoreElement.textContent = `${this.score}/${this.questions.length}`;

        // Performance message
        let message = '';
        let emoji = '';
        
        if (percentage >= 90) {
            emoji = '🏆';
            message = 'Outstanding! You\'re a trivia master!';
        } else if (percentage >= 80) {
            emoji = '🥇';
            message = 'Excellent work! You really know your stuff!';
        } else if (percentage >= 70) {
            emoji = '🥈';
            message = 'Great job! You have impressive general knowledge!';
        } else if (percentage >= 60) {
            emoji = '🥉';
            message = 'Good effort! Keep learning and you\'ll improve!';
        } else if (percentage >= 40) {
            emoji = '📚';
            message = 'Not bad! There\'s room for improvement. Keep studying!';
        } else {
            emoji = '💪';
            message = 'Don\'t give up! Practice makes perfect!';
        }

        this.performanceMessageElement.innerHTML = `${emoji} ${message}<br><small>You got ${percentage}% correct</small>`;
    }

    showReview() {
        this.gameState = 'review';
        this.showScreen('review-screen');
        
        // Clear previous review
        this.reviewContainer.innerHTML = '';
        
        // Create review items
        this.userAnswers.forEach((answer, index) => {
            const reviewItem = document.createElement('div');
            reviewItem.className = `review-item ${answer.isCorrect ? 'correct' : 'incorrect'}`;
            
            const question = this.questions[index];
            const userAnswerText = question.answers[answer.userAnswer];
            const correctAnswerText = question.answers[answer.correctAnswer];
            
            reviewItem.innerHTML = `
                <div class="review-question">
                    <strong>Question ${index + 1}:</strong> ${answer.question}
                </div>
                <div class="review-answer user-answer">
                    Your answer: ${userAnswerText} ${answer.isCorrect ? '✓' : '✗'}
                </div>
                ${!answer.isCorrect ? `<div class="review-answer correct-answer">Correct answer: ${correctAnswerText}</div>` : ''}
                <div class="review-category">
                    <small><em>Category: ${answer.category}</em></small>
                </div>
            `;
            
            this.reviewContainer.appendChild(reviewItem);
        });
    }

    resetGame() {
        this.gameState = 'start';
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.updateGameInfo();
        this.showScreen('start-screen');
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TriviaGame();
});
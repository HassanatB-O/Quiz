const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

var currentQuestion = {};
var acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
var availableQuestions = [];

var questions = [
{
    question: "How many tracks does ECX 2.0 have?",
    choice1: "5",
    choice2: "6",
    choice3: "3",
    choice4: "4",
    answer: 2
},
{
    question: "How do you save a JavaScript file?",
    choice1: "xxx.js",
    choice2: "xxx.css",
    choice3: "xxx.html",
    choice4: "xxx.svg",
    answer: 1
},
{
    question: "Which one of these is not part of the ECX 2.0 tracks?",
    choice1: "Frontend",
    choice2: "Fashion Designing",
    choice3: "Engineering Design",
    choice4: "Python",
    answer: 2
},
{
    question: "What is the color of Frontend track on the leaderboard?",
    choice1: "black",
    choice2: "purple",
    choice3: "red",
    choice4: "blue",
    answer: 4
},
{
    question: "What is the highest point you can have in a task in 30daysofCode?",
    choice1: "20",
    choice2: "21",
    choice3: "22",
    choice4: "19",
    answer: 3
}
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => 
{ 
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () =>
{
    if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("end.html");
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice =>{
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion["choice" + number];
    });
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};
choices.forEach(choice =>{
    choice.addEventListener('click', e =>
    {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer? "correct" : "incorrect";
       
        if (classToApply === "correct")
        {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout( () =>
        {  
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
        }, 500);

    });
});

incrementScore = num => 
{
    score += num;
    scoreText.innerText = score;
};

startGame();


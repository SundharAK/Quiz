const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Which of the following functional interface represents a function that accepts a double-valued argument and produces a long-valued result?',
        choice1: 'Double To Long Function',
        choice2: 'Int Binary Operator',
        choice3: 'Function',
        choice4: 'Double Unary Oparator',
        answer: 1,
    },
    {
        question:
            "Which of the following gets introduced with Java 8?",
        choice1: "Compact Profiles",
        choice2: "Lambda Expression",
        choice3: "Only First Two",
        choice4: "Stream API",
        answer: 2,
    },
    {
        question: "How many methods are there in a functional interface in Java 8?",
        choice1: "Any Number Of Methods",
        choice2: "10",
        choice3: "1",
        choice4: "0",
        answer: 3,
    },
    {
        question: "Nashorn the new JavaScript engine is an implementation of",
        choice1: "Javax.Engine.Engine",
        choice2: "Javax.Script.ScriptEngine",
        choice3: "Javax.JavaScript.Engine",
        choice4: "Javax.Script.Engine",
        answer: 2,
    },
    {
        question: "A functional interface acts as target types for which of the following?",
        choice1: "All Of The Above",
        choice2: "Constructor Reference",
        choice3: "Method Reference",
        choice4: "Lambda Expression",
        answer: 1,
    },
    {
        question: "HTML is a",
        choice1: "scripting language",
        choice2: "software",
        choice3: "markup language",
        choice4: "All of the above",
        answer: 3,
    },
    {
        question: "What is the full form of DTD?",
        choice1: "Document To Document",
        choice2: "Dynamic Type Definition",
        choice3: "Document Type Definition",
        choice4: "Direct Type Definition",
        answer: 3,
    },
    {
        question: "Which is the following is a text editor?",
        choice1: "Notepad++",
        choice2: "MS-word",
        choice3: "Both a and b",
        choice4: "None of the above",
        answer: 1,
    },
    {
        question: "A tag is",
        choice1: "HTML command",
        choice2: "HTML Header",
        choice3: "HTML statement",
        choice4: "None of these",
        answer: 1,
    },
    {
        question: "Direct Type Definition",
        choice1: "C Compiler",
        choice2: "Interactive Debugger",
        choice3: "Analyzing tool",
        choice4: "C Interpreter",
        answer: 3,
    },
    {
        question: " Which selector do we use to specify the rule for binding some particular unique element?",
        choice1: "class",
        choice2: "tag",
        choice3: "both tag and class",
        choice4: "id",
        answer: 4,
    },
    {
        question: "Which of these functions is the 2D transformation in the matrix format?",
        choice1: "perspective",
        choice2: "matrix3d()",
        choice3: "matrix2d()",
        choice4: "matrix()",
        answer: 4,
    },
    {
        question: "In an HTML page, which of these tags is used for embedding CSS?",
        choice1: "<!DOCTYPE html>",
        choice2: "<css>",
        choice3: "<style>",
        choice4: "<script>",
        answer: 3,
    },
    {
        question: "The CSS property that is equivalent to the align attribute is:",
        choice1: "text-align",
        choice2: "float",
        choice3: "text-align & float",
        choice4: "centre",
        answer: 2,
    },
    {
        question: "The screen media type can be used with:",
        choice1: "television-type devices",
        choice2: "computer devices",
        choice3: "handheld screens",
        choice4: "all devices",
        answer: 4,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 15

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo');


//Alt

//Display Mobile Menu
const mobileMenu = () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
};

menu.addEventListener('click', mobileMenu);

// Show active menu when scrolling
const highlightMenu = () => {
    const elem = document.querySelector('.highlight');
    const homeMenu = document.querySelector('#home-page');
    const aboutMenu = document.querySelector('#about-page');
    const servicesMenu = document.querySelector('#services-page');
    let scrollPos = window.scrollY;
    // console.log(scrollPos);

    // adds 'highlight' class to my menu items
    if (window.innerWidth > 960 && scrollPos < 600) {
        homeMenu.classList.add('highlight');
        aboutMenu.classList.remove('highlight');
        return;
    } else if (window.innerWidth > 960 && scrollPos < 1400) {
        aboutMenu.classList.add('highlight');
        homeMenu.classList.remove('highlight');
        servicesMenu.classList.remove('highlight');
        return;
    } else if (window.innerWidth > 960 && scrollPos < 2345) {
        servicesMenu.classList.add('highlight');
        aboutMenu.classList.remove('highlight');
        return;
    }

    if ((elem && window.innerWIdth < 960 && scrollPos < 600) || elem) {
        elem.classList.remove('highlight');
    }
};

window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);

//  Close mobile Menu when clicking on a menu item
const hideMobileMenu = () => {
    const menuBars = document.querySelector('.is-active');
    if (window.innerWidth <= 768 && menuBars) {
        menu.classList.toggle('is-active');
        menuLinks.classList.remove('active');
    }
};

menuLinks.addEventListener('click', hideMobileMenu);
navLogo.addEventListener('click', hideMobileMenu);

//Neu
let myChart;
let c = 0;
let w = 0;
let x = 0;
let y = 0;


const data = {
    labels: [
        'Red',
        'Green'
    ],
    datasets: [{
        label: 'My First Dataset',
        data: [w, c],
        backgroundColor: [
            'rgb(220,7,50)',
            'rgb(69,220,3)',
        ],
        hoverOffset: 2
    }]
};

const config = {
    type: 'doughnut',
    data: data,
};

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    x=0
    y=0
    c=0
    w=0
    myChart.data.datasets[0].data[0] = 0
    myChart.data.datasets[0].data[1] = 0
    myChart.update()
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

myChart = new Chart(
    document.getElementById('myChart'),
    config
);

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}

let rightButton;

/*
// Bearbeitung darf erst starten, wenn der Browser alle Daten geleaden hat
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    // Formel in Element question schreiben
    katex.render(jsondata, question, {
        throwOnError: false
    });

    // alle Textknoten ab question werden gerendert
    window.renderMathInElement(jsondata, {delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "$", right: "$", display: false}
        ]});

}); */



function showQuestion(question){
    /*if(topicSaver == quizQuestion["teil-mathe"]){
        const questionString = "$$" + topicSaver[]
    }*/
    questionElement.innerText = "$$" + question.question + "$$"
        renderMathInElement(questionElement, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "$", right: "$", display: false},
                {left: "\(", right: "\)", display: false},
                {left: "\[", right: "\]", display: true},
                {left: "\begin{equation}", right: "\end{equation}", display: true}
            ]
        })
        //questionElement.innerText = question.question
        question.answers.sort(() => Math.random() - .5).forEach(answer => {
            const button = document.createElement('button')
            button.innerText = answer.text
            button.classList.add('btn')
            if (answer.correct) {
                button.dataset.correct = answer.correct;
                rightButton = button;
            }
            button.addEventListener('click', selectAnswer)
            answerButtonsElement.appendChild(button)

        })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')

    }
    if (selectedButton===rightButton) {
        myChart.data.datasets[0].data[1] = ++c
        myChart.update()
    } else {
        myChart.data.datasets[0].data[0] = ++w
        myChart.update()
    }
    x=0
    y=0
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
        ++x
        //myChart.data.datasets[0].data[1] = ++c -1
        //myChart.update()
    } else {
        element.classList.add('wrong')
        y = ++y -4
        //myChart.data.datasets[0].data[0] = ++w -3
        //myChart.update()
    }

    //myChart.update()
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

let jsondata;
jsondata = "mathe.json"

fetch(jsondata)
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then( loadedQuestions =>{
        console.log(loadedQuestions);
        questions = loadedQuestions;
    });



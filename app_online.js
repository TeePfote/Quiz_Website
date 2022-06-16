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

    if ((elem && window.innerWidth < 960 && scrollPos < 600) || elem) {
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


///////////////////////////////////////////////////////////
//Neu
let myChart;
let c = 0;
let w = 0;
let x = 0;
let y = 0;


const data = {
    labels: [
        'Falsch',
        'Richtig'
    ],
    datasets: [{
        label: 'Fragen',
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


let question = []

let index = 0
let max_Question = 3
let questionsTemp


let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    loadOnline()
    setNextQuestion()
})

function startGame() {

    x=0
    y=0
    c=0
    w=0
    myChart.data.datasets[0].data[0] = 0
    myChart.data.datasets[0].data[1] = 0
    myChart.update()

    questionContainerElement.classList.add('hide')
    //startButton.innerText = 'Start'
    //startButton.classList.remove('hide')
    while(index < max_Question){
        questionsTemp = loadOnline()
        question[index]=questionsTemp[0]
        // console.log(onlinequestion1 + "erster Question Log")
        index ++
    }
    startButton.classList.add('hide')
    nextButton.classList.add('hide')
    console.log('SUCCESS')


    shuffledQuestions = question.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    console.log(question)
    setNextQuestion()
}

myChart = new Chart(
    document.getElementById('myChart'),
    config
);


function loadOnline() {

    console.log("Hier komme ich hin")
    question= []

    let email = "hempel-jonas@gmx.de"
    let pws = "Xn+#yv96RK";

    let randomQuiz = Math.floor((Math.random() * 4) + 1594)
    let url = "https://irene.informatik.htw-dresden.de:8888/api/quizzes/" + randomQuiz.toString()
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url,false)
    xhr.setRequestHeader("Authorization", "Basic " + window.btoa(email + ":" + pws))
    xhr.send()
    console.log(xhr.responseText)

    let reslut = JSON.parse(xhr.responseText)

    let onlinequestion1 = [
        {
            "question": reslut.text,
            "answers":[
                { "text": reslut.options[0], "correct": true},
                { "text": reslut.options[1], "correct": false},
                { "text": reslut.options[2], "correct": false},
                { "text": reslut.options[3], "correct": false}
            ]
        }
    ]

    return onlinequestion1
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}
let rightButton;

function showQuestion(question) {
    console.log(question)
    questionElement.innerText = question.question
    console.log(question)
    question.answers.sort(() => Math.random() - 5).forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if(answer.correct) {
            button.dataset.correct = answer.correct
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
    console.log(question)
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')

    }else {
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
    } else {
        element.classList.add('wrong')
        y = ++y -4
    }

    //myChart.update()
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

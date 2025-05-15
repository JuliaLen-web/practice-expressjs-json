let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let acceptingAnswers = false;

let aboutQuestions = [];

const user = JSON.parse(window.sessionStorage.getItem("user"));

const h2 = document.querySelector('h2');
h2.innerHTML = 'Добрый день, ' + user.name + '!';

const question = document.querySelector('#question');
const choices = Array.from(document.getElementsByClassName("choice-text"));

function startTest() {
    console.log(aboutQuestions)

    const h3 = document.querySelector('h3');
    h3.innerHTML = aboutQuestions.name;

    questionCounter = 0;
    score = 0;
    availableQuestions = [...aboutQuestions.questions];
    getNewQuestion();
}

function getNewQuestion() {
    if (availableQuestions.length === 0) {
        updateResult(score);
        let desc = '';

        aboutQuestions.result.filter(el => {
            if (el.min <= score && el.max >= score) desc = el.description
        })

        window.sessionStorage.setItem("resultDescription", desc)

        return window.location.assign('/result.html');
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach(choice => {
        const number = choice.getAttribute('for');
        choice.innerHTML = `<input type="radio" id="${number}">` + currentQuestion['choice' + number].name;
    })

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        e.preventDefault();
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.currentTarget;
        const number = selectedChoice.getAttribute('for');
        score += currentQuestion['choice' + number].weight;
        getNewQuestion();
        console.log(score)
    })
})

function loadQuestions() {
    fetch('/json/test.json', {
        method: "GET",
    })
        .then(res => res.json())
        .then(data => {
            aboutQuestions = data;
            startTest();
        })
}

function updateResult(resultCount) {
    const newData = {
        "id": user.id,
        "result": resultCount
    }

    fetch('/updateResult', {
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(newData),
    })
        .then(() => {
            window.sessionStorage.setItem("user", JSON.stringify({ ...user, "result": resultCount }))
            return new Response(`Received JSON: ${newData}`, {
                status: 200,
                headers: { "Content-Type": "application/json" },
            })
        })
        .catch(error => console.error(error));
}

loadQuestions();
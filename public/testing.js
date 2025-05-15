const user = JSON.parse(window.sessionStorage.getItem("user"));


const h2 = document.querySelector('h2');
h2.innerHTML = 'Добрый день, ' + user.name + '!';
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

function startTest() {
    console.log(questions)
}

function fillQuestionElements(data) {
    console.log(h2)
}

function loadQuestions() {
    fetch('/json/test.json', {
        method: "GET",
    })
        .then(res => res.json())
        .then(data => {
            questions = data;
            fillQuestionElements(data);
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
            return new Response(`Received JSON: ${newData}`, {
                status: 200,
                headers: { "Content-Type": "application/json" },
            })
        })
        .catch(error => console.error(error));
}

loadQuestions();
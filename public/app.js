function serializeForm(formNode) {
    const { elements } = formNode
    const data = Array.from(elements)
        .filter((item) => item.name === "name")
        .map((element) => {
            const { value } = element
            return {
                "name": value,
                "id": value + "-" + Math.floor(Math.random() * 10000),
                "result": null
            };
        })

    fetch('/json/data', {
        method: "POST",
        headers: { 
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data[0]),
    })
        .then((response) => {
            if(response.ok) {
                window.sessionStorage.setItem("user", JSON.stringify(data[0]));
            }
            return new Response(`Received JSON: ${data[0]}`, {
                status: 200,
                headers: { "Content-Type": "application/json" },
              })
        })
        .catch(error => console.error(error));

    return data[0];
}


function handleFormSubmit(event) {
    // event.preventDefault()
    serializeForm(applicantForm);
}

const applicantForm = document.querySelector('#formSaveName');
applicantForm.addEventListener('submit', handleFormSubmit)

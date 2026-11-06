document.querySelector(".form-submit").addEventListener("click", () => {
    var info = {
        text: document.querySelector(".form-name").value,
        name: document.querySelector(".form-text").value,
        data: new Date()
    }
    console.log(info)
    fetch('http://127.0.0.1:3000/receber', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    })
    .then(res => res.json())
    .then(console.log)
    .catch(console.error);
    fetch('http://127.0.0.1:3000/dados')
.then(res => res.json())
.then(dados => {

    console.log(dados[0].name); // João
    console.log(dados[1].name); // Maria

    // Percorrer todos os dados
    dados.forEach(item => {
        console.log(item.name);
        console.log(item.text);
    });

});
})

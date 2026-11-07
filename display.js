document.addEventListener("DOMContentLoaded", () => {
    fetch('http://127.0.0.1:3000/dados')
    .then(res => res.json())
    .then(dados => {

        // Percorrer todos os dados
        dados.forEach(item => {
            console.log(item.name);
            console.log(item.text);
        });

    });
})
document.getElementsByClassName("refresh")[0].addEventListener("click", () => {
    fetch('http://127.0.0.1:3000/dados')
    .then(res => res.json())
    .then(dados => {
        console.log(dados[0].name); // João
        // Percorrer todos os dados
        dados.forEach(item => {
            console.log(item.name);
            console.log(item.text);
        });
        var nameLast = dados[dados.length - 1].name
        var textLast = dados[dados.length - 1].text
        var dateLast = dados[dados.length - 1].date
        var commentsbox = document.createElement("div")
        var commentsname = document.createElement("p")
        var commentstext = document.createElement("p")
        var commentsdate = document.createElement("p")

        commentsbox.className = "comments-box"
        commentsname.className = "comments-name"
        commentstext.className = "comments-text"
        commentsdate.className = "comments-date"

        commentsname.innerHTML = nameLast
        commentstext.innerHTML = textLast
        commentsdate.innerHTML = dateLast

        document.querySelector(".comments-div").appendChild(commentsbox)
        commentsbox.appendChild(commentsname)
        commentsbox.appendChild(commentstext)
        commentsbox.appendChild(commentsdate)
    });
})
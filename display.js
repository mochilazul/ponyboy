async function carregarComentarios() {
    const commentsDiv = document.querySelector(".comments-div");

    try {
        const resposta = await fetch("/dados");

        if (!resposta.ok) {
            throw new Error("Erro ao buscar comentários");
        }

        const dados = await resposta.json();

        commentsDiv.innerHTML = "";

        dados.forEach(item => {
            const commentsbox = document.createElement("div");
            const commentsname = document.createElement("p");
            const commentstext = document.createElement("p");
            const commentsdate = document.createElement("p");

            commentsbox.className = "comments-box";
            commentsname.className = "comments-name";
            commentstext.className = "comments-text";
            commentsdate.className = "comments-date";

            commentsname.textContent = item.name;
            commentstext.textContent = item.text;
            commentsdate.textContent = item.date;

            commentsbox.appendChild(commentsname);
            commentsbox.appendChild(commentstext);
            commentsbox.appendChild(commentsdate);

            commentsDiv.appendChild(commentsbox);
        });

    } catch (erro) {
        console.error("Erro ao carregar comentários:", erro);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    carregarComentarios();

    document.querySelector(".refresh").addEventListener("click", () => {
        carregarComentarios();
    });
});

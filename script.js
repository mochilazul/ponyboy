var today = new Date()
var datebla = today.getDay() + "." + today.getMonth() + "." + today.getFullYear() + ", " + today.getHours() + "h" + today.getMinutes() + "m"
document.querySelector(".form-submit").addEventListener("click", async () => {
    const info = {
        text: document.querySelector(".form-text").value.trim(),
        name: document.querySelector(".form-name").value.trim(),
        date: datebla
    };

    if (!info.name || !info.text) {
        alert("Preencha seu nome e comentário!");
        return;
    }

    try {
        const resposta = await fetch("/receber", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao enviar comentário");
        }

        const resultado = await resposta.json();

        console.log(resultado);
        alert("Comentário enviado!");

        document.querySelector(".form-name").value = "";
        document.querySelector(".form-text").value = "";

    } catch (erro) {
        console.error("Erro:", erro);
        alert("Não foi possível enviar o comentário.");
    }
});

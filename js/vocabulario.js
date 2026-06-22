let data = [];

async function init() {

    data = await fetch("data/vocabulario.json")
        .then(r => r.json());

    mostrarVocabulario();
}

function mostrarVocabulario() {

    const container =
        document.getElementById("vocabulario-container");

    container.innerHTML = "";

    data.forEach(item => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${item.english}</h3>
            <p>${item.spanish}</p>
        `;

        container.appendChild(card);
    });
}

init();
let data = [];

async function init() {

    data = await fetch("data/frases.json")
        .then(r => r.json());

    mostrarFrases();
}

function mostrarFrases() {

    const container =
        document.getElementById("frases-container");

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
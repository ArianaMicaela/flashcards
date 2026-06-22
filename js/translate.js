let data = [];
let current = null;
let bloqueado = false;

async function init() {

    data = await fetch("data/vocabulario.json")
        .then(r => r.json());

    nuevaPalabra();
}

function nuevaPalabra() {

    bloqueado = false;

    document.getElementById("resultado").textContent = "";
    document.getElementById("respuesta").value = "";
    document.getElementById("siguiente").style.display = "none";

    current = data[Math.floor(Math.random() * data.length)];

    document.getElementById("english").textContent =
        current.english;

    document.getElementById("respuesta").focus();
}

function verificar() {

    if (bloqueado) return;

    bloqueado = true;

    const respuesta = document
        .getElementById("respuesta")
        .value
        .trim()
        .toLowerCase();

    const correcta =
        current.spanish.trim().toLowerCase();

    const resultado =
        document.getElementById("resultado");

    if (respuesta === correcta) {

        resultado.innerHTML =
            "¡Correcto!";

    } else {

        resultado.innerHTML =
            "¡Incorrecto!<br><br>" +
            "Respuesta correcta: <strong>" +
            current.spanish +
            "</strong>";
    }

    document.getElementById("siguiente").style.display =
        "inline-block";
}

document
    .getElementById("verificar")
    .addEventListener("click", verificar);

document
    .getElementById("siguiente")
    .addEventListener("click", nuevaPalabra);

document
    .getElementById("respuesta")
    .addEventListener("keypress", function(e) {

        if (e.key === "Enter") {

            if (!bloqueado) {
                verificar();
            } else {
                nuevaPalabra();
            }
        }
    });

init();
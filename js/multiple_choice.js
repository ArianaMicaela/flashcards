let data = [];
let current = null;
let vidas = 3;
let bloqueado = false;

async function init() {
    data = await fetch("data/vocabulario.json").then(r => r.json());
    nuevaPregunta();
}

function nuevaPregunta() {

    document.getElementById("resultado").innerHTML = "";
    document.getElementById("siguiente").style.display = "none";

    // 1. elegir palabra correcta
    current = data[Math.floor(Math.random() * data.length)];

    document.getElementById("english").textContent = current.english;

    // 2. generar opciones
    const opciones = generarOpciones(current);
    renderOpciones(opciones);

    actualizarVidas();
}

function generarOpciones(correctItem) {

    const correct = correctItem.spanish;

    // sacar todas las traducciones menos la correcta
    let distractores = data
        .map(item => item.spanish)
        .filter(tr => tr !== correct);

    // mezclar
    distractores = shuffle(distractores);

    // tomar 3
    distractores = distractores.slice(0, 3);

    // agregar correcta
    const opciones = [correct, ...distractores];

    return shuffle(opciones);
}

function renderOpciones(opciones) {
    const cont = document.getElementById("options");
    cont.innerHTML = "";
    bloqueado = false; // desbloquear nueva pregunta

    opciones.forEach(op => {
        const btn = document.createElement("button");
        btn.className = "option";
        btn.textContent = op;

        btn.onclick = () => {
            if (bloqueado) return; // 👈 evita múltiples clicks
            bloqueado = true;
            verificar(op);
        };

        cont.appendChild(btn);
    });
}

function gameOver() {
    const resultado = document.getElementById("resultado");

    resultado.innerHTML = "<strong>GAME OVER</strong>";

    // ocultar opciones y botones
    //document.getElementById("options").innerHTML = "";
    //document.getElementById("siguiente").style.display = "none";
    resultado.innerHTML =
            "¡Incorrecto!<br>" +
            "Respuesta correcta: " + current.spanish +
            "<br><br>❤︎ Vidas restantes: " + vidas;

    // crear botón reinicio si no existe
    if (!document.getElementById("reintentar")) {
        const btn = document.createElement("button");
        btn.id = "reintentar";
        btn.textContent = "Volver a jugar";
        btn.className = "siguiente_multiple";

        btn.onclick = reiniciarJuego;

        document.querySelector(".container").appendChild(btn);
    }
}

function reiniciarJuego() {
    vidas = 5;
    bloqueado = false;

    document.getElementById("reintentar")?.remove();

    document.getElementById("resultado").innerHTML = "";
    document.getElementById("siguiente").style.display = "none";

    actualizarVidas();
    nuevaPregunta();
}

function verificar(opcion) {

    const resultado = document.getElementById("resultado");

    if (opcion === current.spanish) {
        resultado.innerHTML = "¡Correcto!";
    } else {
        vidas--;

        resultado.innerHTML =
            "¡Incorrecto!<br>" +
            "Respuesta correcta: " + current.spanish +
            "<br><br>❤︎ Vidas restantes: " + vidas;
    }

    actualizarVidas();

    if (vidas <= 0) {
        gameOver(); 
        return;
    }

    document.getElementById("siguiente").style.display = "inline-block";
}

function actualizarVidas() {
    document.getElementById("vidas").textContent = "❤︎ Vidas: " + vidas;
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

document.getElementById("siguiente").onclick = nuevaPregunta;

init();
async function cargarFlashcard() {
    const vocab = await fetch('data/vocabulario.json').then(r => r.json());
    const frases = await fetch('data/frases.json').then(r => r.json());

    const datos = [...vocab, ...frases];

    if (datos.length === 0) return;

    const item = datos[Math.floor(Math.random() * datos.length)];

    document.getElementById("english").textContent = item.english;
    document.getElementById("respuesta").textContent = item.spanish;
}

function mostrar() {
    document.getElementById("respuesta").style.display = "block";
}

cargarFlashcard();
let contador = 0;

function mostrar(color) {
    contador++;
    const html = `<div class='anyadidos' data-color="${color}" data-indice="${contador}" style='border:solid 3px black;background-color:${color};'></div>`;
    div2.innerHTML += html;
    div3.innerHTML = `<br>Número: ${contador}`;
}

function reindexar() {
    const partidos = document.querySelectorAll('.anyadidos');
    partidos.forEach((el, i) => el.dataset.indice = i + 1);
}

seleccionarColor.addEventListener("change", (e) => {
    const color = e.target.value;
    mostrar(color);
});

div2.addEventListener('mouseover', (e) => {
    const el = e.target.closest('.anyadidos');
    if (!el) return;
    el.textContent = el.dataset.color;
});

div2.addEventListener('mouseout', (e) => {
    const el = e.target.closest('.anyadidos');
    if (!el) return;
    el.textContent = "";
});

boton.addEventListener('click', () => {
    contador = 0;
    div2.innerHTML = "";
    div3.innerHTML = `<br>Número: ${contador}`;
});

div2.addEventListener('click', (e) => {
    const elemento = e.target.closest('.anyadidos');
    if (!elemento) return;
    elemento.remove();
    reindexar();
    contador = document.querySelectorAll('.anyadidos').length;
    div3.innerHTML = `<br>Número: ${contador}`;
});

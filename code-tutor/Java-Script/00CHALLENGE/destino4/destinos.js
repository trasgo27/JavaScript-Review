function renderCatalogo() {
    const html = catalogo.map((item, i) =>
        `<span data-index="${i}" style="cursor:pointer">${i + 1}.- ${item.destino}, ${item.continente}</span>`
    ).join('<br>');
    div2.innerHTML = "<h3>Catalogo (clic para eliminar)</h3>" + html;
}

bAgregar.addEventListener('click', (e) => {
    e.preventDefault();
    const destino = inputDestino.value.trim();
    const continente = inputContinente.value.trim();

    if (destino === "" || continente === "") {
        alert('Valores no validos');
        return;
    }

    const repe = catalogo.some(item =>
        item.destino.toLowerCase() === destino.toLowerCase() &&
        item.continente.toLowerCase() === continente.toLowerCase()
    );
    if (repe) {
        alert(`Valor REPETIDO ${destino} en ${continente}`);
        return;
    }

    catalogo.push({ destino, continente });
    console.table(catalogo);
    renderCatalogo();
});

div2.addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    if (index !== undefined) {
        catalogo.splice(index, 1);
        renderCatalogo();
    }
});

div3.addEventListener('click', (e) => {
    const continente = e.target.value;
    if (!continente) return;

    const filtrados = catalogo.filter(item =>
        item.continente.toLowerCase() === continente.toLowerCase()
    );

    const html = filtrados.map((p, i) =>
        `${i + 1}. ${p.destino}, ${p.continente}`
    ).join('<br>');

    div4.innerHTML = `<h3>Continente ${continente}</h3>` + html;
});

renderCatalogo();
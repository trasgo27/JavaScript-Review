function renderCatalogo(que, lista) {
    const items = que.map((d, i) => {
        const li = document.createElement('li');
        li.textContent = `${i + 1}.- Destino: ${d.destino} en ${d.continente}`;
        li.dataset.indice = i;
        return li;
    });
    lista.replaceChildren(...items);
}

function renderTitulo(donde, texto) {
    donde.insertAdjacentHTML('afterbegin', `<h3>${texto}</h3>`);
}

boton.addEventListener('click', () => {
    const destino = iDestino.value.trim();
    const continente = iContinente.value.trim();
    if (!destino || !continente) {
        console.log('No valido');
        return;
    }
    const repetido = catalogo.some(p =>
        p.destino.toLowerCase() === destino.toLowerCase() &&
        p.continente.toLowerCase() === continente.toLowerCase()
    );
    if (repetido) {
        console.log('Repetido');
        return;
    }
    catalogo.push({ destino, continente });
    console.table(catalogo);
    renderCatalogo(catalogo, listaCatalogo);
});

dBotones.addEventListener('click', (e) => {
    const continenteS = e.target.value;
    if (!continenteS) return;
    const catalogoF = catalogo.filter(d =>
        d.continente.toLowerCase() === continenteS.toLowerCase()
    );
    dSeleccion.innerHTML = '';
    renderTitulo(dSeleccion, `Valores en ${continenteS} (${catalogoF.length})`);
    renderCatalogo(catalogoF, listaSeleccion);
});

dMostrar.addEventListener('click', (e) => {
    const indice = e.target.dataset.indice;
    if (indice === undefined) return;
    const borrado = catalogo.splice(+indice, 1);
    console.table(borrado);
    renderCatalogo(catalogo, listaCatalogo);
    dSeleccion.innerHTML = '';
    renderTitulo(dSeleccion, 'Elemento borrado');
    renderCatalogo(borrado, listaSeleccion);
});

renderCatalogo(catalogo, listaCatalogo);

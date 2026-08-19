//const catalogo=[];
function renderCatalogo() {
    const lista = catalogo.map((d, i) =>
        `<span data-index="${i}" style="cursor:pointer">${i + 1}. ${d.destino} — ${d.continente}</span>`
    ).join('<br>');

    div3.innerHTML = "<h3>Destinos (clic para eliminar)</h3>" + lista +
        "<br><br>" +
        `<button value="Africa">África</button>
        <button value="Asia">Asia</button>
        <button value="Europa">Europa</button>
        <button value="Oceania">Oceania</button>
        <button value="Norteamerica">Norteamerica</button>
        <button value="Sudamerica">Sudamerica</button>`;
}

btnEnviar.addEventListener('click', (e) => {
    e.preventDefault();
    const destino = inputDesti.value.trim();
    const continente = selectConti.value;
    if (destino === "" || continente === "") {
        alert('Valor Incorrecto');
        return;
    }

    const repe = catalogo.some(item =>
        item.destino.toLowerCase() === destino.toLowerCase() &&
        item.continente.toLowerCase() === continente.toLowerCase()
    );
    if (repe) {
        alert(`${destino} ya ESTÁ ...`);
        return;
    }

    catalogo.push({ destino, continente });
    console.table(catalogo);
    renderCatalogo();
});

div3.addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    if (index !== undefined) {
        catalogo.splice(index, 1);
        renderCatalogo();
        return;
    }

    const contiSele = e.target.value;
    if (!contiSele) return;

    const filtrados = catalogo.filter(item =>
        item.continente.toLowerCase() === contiSele.toLowerCase()
    );
    const html = filtrados.map((item, i) =>
        `${i + 1}. ${item.destino}`
    ).join('<br>');
    div3.innerHTML = "<h3>" + contiSele + "</h3>" + html +
        '<br><br><button onclick="renderCatalogo()">Volver</button>';
});

renderCatalogo();
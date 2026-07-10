function render() {
    if (catalogo.length === 0) return "<em>No hay destinos aún</em>";
    return catalogo.map((item, i) =>
        `Destino ${i + 1}: ${item.destino} en ${item.continente}`
    ).join('<br>');
}
selectContinente.addEventListener('change', () => {
    const contiEle = selectContinente.value;
    if (!contiEle) {
        divMostrar.innerHTML = `<h3>Destinos</h3>` + render();
        return;
    }

    const html = catalogo.filter(item =>
        item.continente.toLowerCase() === contiEle.toLowerCase()
    ).map((d, i) =>
        `${i + 1} ${d.destino.toUpperCase()}`
    ).join('<br>');

    divMostrar.innerHTML = `<h3>Destinos en ${contiEle}</h3>` + html;
});


btnEnviar.addEventListener('click',(e)=>{ //charge is not event
    e.preventDefault();
    //Validacion Basica
    const destino = inputDestino.value.trim();
    const continente = inputContinente.value.trim();
     
    const valido = destino !== "" && continente !== "";
    if(valido){
        //Check if that combination already exist.
    const repe = catalogo.some(item =>
        item.destino.toLowerCase() === destino.toLowerCase() &&
        item.continente.toLowerCase() === continente.toLowerCase()
    );
        if(!repe){
            catalogo.push({ destino, continente });
        console.table(catalogo);
        }else{
            alert(`destino ${destino} ya está insertado en catálogo ...`);
        }
        
    }else{
        alert('valores no validos');
    }
    divMostrar.innerHTML = `<h3>Destinos Seleccionados ...</h3>`+ render();
});
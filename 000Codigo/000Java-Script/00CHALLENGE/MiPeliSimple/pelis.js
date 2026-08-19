function renderCatalogo() {
    const html = catalogo.map((p, i) => {
        return `<strong>${i + 1}.- Titulo: ${p.titulo}</strong>, 
        Año: ${p.anio}, 
        Genero: ${p.genero}, 
        Cast: ${p.cast.join(', ')}, 
        Presupuesto: $${p.boxOffice.budget} mill, 
        Recaudación: $${p.boxOffice.taquilla} mill<br>`;
    }).join('');

    divMostrar.innerHTML = `<h3>Mostrar Catalogo</h3> ${html}`;
}
function mostrar(que,donde,titulo){
    const html = que.map((peli,indi)=>{
        const budgetM = 500;
        
        let sizeA = "";
        let colorB = "";
        const colorA = (Number(peli.anio) >=2000)?"gold" : "goldenrod";
        if(colorA==="green"){
            sizeA = "25px";
        }else{
            sizeA = "20px";
        }
        if(Number(peli.boxOffice.budget) >= budgetM){
             colorB = "red";
        }else{
             colorB = "green";
        }
        return `
        <span style="color:purple;font-weight:bold;font-size:25px">${indi+1}.- ${peli.titulo},</span>
        de:<span style="color:${colorA}; font-size:${sizeA}" >${peli.anio},</span>  
        Budget: <span style="color:${colorB}">$${peli.boxOffice.budget} mill </span>, 
        Taquilla: <span style=""> $${peli.boxOffice.taquilla} mill </span>, 
        cast: ${peli.cast.join(', ')}

        ` //return automatically inserts ;
    }).join('<br>');
    donde.innerHTML = `<span style="color:darkblue; font-size:30px">${titulo} </span> ` + html;
}

selectGenero.addEventListener('change',(change)=>{
    let generoS = selectGenero.value.toUpperCase().trim();
    const catalogoG = catalogo.filter((peli)=>{      
        return peli.genero.trim().toUpperCase() == generoS
        });
        mostrar(catalogoG,divMostrar2,"Genero Elegido <br>");
        mostrar(catalogo,divMostrar, "Mostrar Catalogo <br>")
/*
    let html = catalogoG.map((p,i)=>{
        return `${i+1}.- ${p.titulo},
         ${p.genero}, 
         del Año: ${p.anio},
         Cast: ${p.cast.join('')},
         Pres: ${p.boxOffice.budget},
         Recaudacion: ${p.boxOffice.taquilla}`
    }).join(`<br>`); //from an array creates a string
    divMostrar2.innerHTML = `<h3>Genero Seleccionado <span style="color:red;font-size:30px">${generoS}</span></h3>`+html;
*/
});


btnEnviar.addEventListener('click', (ev) => {
    ev.preventDefault();
    const titulo = inputTitulo.value.trim();
    const cast = inputCast.value.trim().split(',').map(p => p.trim());
    const budget = Number(inputBudget.value);
    const taquilla = Number(inputTaquilla.value);
    const anio = Number(inputAnio.value);
    const genero = inputGenero.value;

    if (titulo === "" || cast.length === 0 || !(anio >= 1900) || budget <= 0 || taquilla <= 0) {
        alert('Valores NO validos');
        return;
    }

    if (catalogo.some(peli => peli.titulo.toUpperCase() === titulo.toUpperCase())) {
        alert(`${titulo} ya esta incluida en CATALOGO ...`);
        return;
    }

    catalogo.push({ titulo, genero, anio, cast, boxOffice: { budget, taquilla } });
    console.table(catalogo);
    renderCatalogo();
});

divMostrar2.innerHTML = "<h3>Selección ... </h3>";

renderCatalogo();
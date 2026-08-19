function mostrar(que, donde, titulo){
    const html = que.map((d,i)=>
    `<p class="pAdded" data-indice="${i}">${i+1}.- Destino: ${d.destino} en ${d.continente}</p>`
).join('');
    const longi = +que.length;
    const longiString = `Elementos: ${longi}`;
    donde.innerHTML = `<h3>${titulo}</h3>` + html+ `Total Destinos: <span style="color:red;font-size:35px;font-weight:bolder">${longi}</span>`;
    
    
    
}
boton.addEventListener('click',(e)=>{
    const destino = iDestino.value.trim();
    const continente = iContinente.value.trim();
    const valido = (destino !== "" && continente !== "")?true:false;
    if(!valido){
        console.log('No valido');
        return;
    } 
    const repetido = catalogo.some((p)=>
        p.destino === destino &&
        p.continente === continente
    );
    if(repetido){
        console.log('Repetido');
        return;
    } 
    catalogo.push(
        {destino,
        continente}
    );
    console.table(catalogo);
    mostrar(catalogo, dMostrar, `Catalogo`);
    
});

dBotones.addEventListener('click',(e)=>{
    const continenteS = e.target.value;
    if(!continenteS) return;
    const catalogoS = catalogo.filter((d)=>
        d.continente === continenteS
    );
    console.table(catalogo);
    console.table(`En ${continenteS} hay ${catalogoS}`);

    mostrar(catalogoS,dSeleccion,`Valores en ${continenteS}`)
});
mostrar(catalogo, dMostrar, `Catalogo`);
dMostrar.addEventListener('click',(e)=>{
    const destinoS = e.target.dataset.indice;
    if(!destinoS) return;
    const catalogoE = catalogo.splice(destinoS,1);
    mostrar(catalogo, dMostrar, `Catalogo`);
    mostrar(catalogoE, dElimi, `Elemento Eliminado`);
});

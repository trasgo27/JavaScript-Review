function mostrar(que,donde,titulo){
    const html = que.map((d,i)=>
        `<div class="divContinente" data-indice = "${i}">${i+1} destino: ${d.destino}, en: ${d.continente}</div>`
    ).join("");
    donde.innerHTML = `<h3>${titulo }</h3>`+ html;
}
function agregar(){
}
botonEnviar.addEventListener("click",(e)=>{
const destino = iDestino.value.trim();
const continente = iContinente.value.trim();
console.log(destino);
const valido = (destino !=="" && continente !=="")?true:false;
if(!valido){
    alert("Valores NO Validos ...");
}else{
    const repe = catalogo.some((d)=> //devuelve booleano
        
        d.destino.toUpperCase() === destino.toUpperCase() &&
        d.continente.toUpperCase() === continente.toUpperCase()
    );
    if(repe){
        alert("Valor REPE");
    }else{
        //agregar();
        catalogo.push({
            destino,
            continente
        });
        console.table(catalogo);
        mostrar(catalogo,div1Mostrar,"Añadido ...");
    }
}

});
mostrar(catalogo,div1Mostrar,"<h2>Mostrar Catalogo ...</h2><h3 style=color:red;>Clicka para Borrar</h3>")

//Seleccionar por continente
div2Botones.addEventListener("click",(e)=>{//event delegation
    const continente = e.target.value;
    
    //manejar el error
    if(!continente) return;
    const catalogoF = catalogo.filter((d)=>
       
        d.continente.toUpperCase() === continente.toUpperCase()
  
    )
    const longi = catalogoF.length;
    mostrar(catalogoF,div3Mostrar,`En ${continente} hay <span style="font-size:35px; color:red">${longi}</span>`)       
});
div1Mostrar.addEventListener("click",(e)=>{
    const indice = e.target.dataset.indice;
    console.log(indice);
    const borrado = catalogo.splice(indice,1);
    mostrar(catalogo,div1Mostrar,`<h3 style="color:red";>Elemento Borrado ...<h2 id="div4"></h2></h3>`);
    mostrar(borrado,div4,"");
});
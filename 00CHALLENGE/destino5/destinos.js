//mostrar render
function renderCatalogo(){
const html = catalogo.map((item,i)=>
     
 `<div class="destino-item" data-indice="${i}">${i+1}. ${item.destino}, ${item.continente}</div>`
).join("");
div2.innerHTML = "<h2>Catalogo Completo</h2> <h3>Click para Eliminar</h3>"+ html;
}
renderCatalogo();

//agregar
boton.addEventListener("click",()=>{
    const destino = inputD.value.trim();
    const continente = inputC.value.trim();
    //minima verificacion
    const valido = destino !== "" && continente !== "";
    //repetido si,no?
    if(valido){
        //verificar noRepe
        const Repe = (catalogo.some((item)=>{
            return(item.destino.toUpperCase() === destino.toUpperCase() && item.continente.toUpperCase() ===continente.toUpperCase());
        }       
        ))
        if(!Repe){
            catalogo.push({
            destino,
            continente
        });
        renderCatalogo();
        console.table(catalogo);
        }else{
            alert(`El destino: ${destino} en: ${continente} YA ESTÁ INCLUIDO`);
            return;
        }
        
    }else{
        alert("Valores no Validos !!!");
        return;
    }
})

div3.addEventListener("click",(e)=>{
    const contiSe = e.target.dataset.continente;
    if (!contiSe) return;
    const longi = catalogo.filter((item)=>
        item.continente.toUpperCase() === contiSe.toUpperCase()
    ).length;
    const html = catalogo.filter((item)=>        
        item.continente.toUpperCase() === contiSe.toUpperCase()
    ).map((item,indice)=>
        `<div class="destino-item">${indice+1}.- ${item.destino} en ${item.continente}</div>`
    ).join("");
    div4.innerHTML = `<h3>Destinos en: ${contiSe}</h3> Total: <span style="font-size:30px;font-weight:bolder;color:red;">${longi}</span>` + html;
});
div2.addEventListener("click",(e)=>{
    const indice = e.target.dataset.indice;
    if (indice === undefined) return;
    const eliminado = catalogo.splice(+indice, 1)[0];
    div4.innerHTML = `<h3>Eliminado:</h3> ${eliminado.destino} (${eliminado.continente})`;
    console.table(catalogo);
    renderCatalogo();
});



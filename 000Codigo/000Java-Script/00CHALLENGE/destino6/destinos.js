function render(que,donde,titulo){
    const html = que.map((item,i)=>
        `<div class = "divCatalogo" data-indice="${i}"><span>${i+1}.-</span> Destino: ${item.destino} en: ${item.continente}</div>`
    ).join("");

    donde.innerHTML = `<h3>${titulo}</h3>` + html;
}
render(catalogo,div1, "Mostrar Catalogo ...");

boton.addEventListener('click', (e) => {
  const destino = inputDestino.value.trim();
  const continente = inputContinente.value.trim();
  //verificar validez
  const valido = (continente !=="" && destino !=="")?true:false;
  if(valido){
    const repetido = (catalogo.some ((item)=>
        item.destino.toUpperCase() === inputDestino.value.trim().toUpperCase() &&
        item.continente.toUpperCase() === inputContinente.value.trim().toUpperCase()
    ));
    if(!repetido){
        catalogo.push({
            destino,
            continente
        })
        alert("Valor Insertado");
        render(catalogo,div1, "Mostrar Catalogo con Nuevo Valor ...");
        console.table(catalogo);
    }else{
        alert("Valor REPETIDO ...");
    }
  }else{
    alert("Valores NO VALIDOS ...");
  }
});
function selectContinente(){}
div2.addEventListener('click',(e)=>{
    const contiSe = e.target.value;
    console.log(contiSe);
    const catalogoS = catalogo.filter((item)=>
        item.continente === contiSe      
    );
    const longi = catalogoS.length;

    render(catalogoS,div3,`Destinos en  ${contiSe}: <span style="color:red;font-size:30px">${longi}</span>`)
});
function eliminarDestino(){

}
div1.addEventListener('click',(e)=>{
    const indice = Number(e.target.dataset.indice);
    const catalogoEliminado = catalogo.splice(+indice,1);
    console.table(catalogoEliminado);
    render(catalogo,div1,"Valores Actualizados ... ");
    render(catalogoEliminado,div3, "Valor eliminado ...")
});
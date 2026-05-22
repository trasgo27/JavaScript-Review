/*
  Requisitos:

  1. Al hacer clic en "Agregar", tomar los valores de los inputs,
     validar que no estén vacíos, crear un objeto película,
     agregarlo al array catalogo con push(), y actualizar la lista
     completa en divLista usando map() + join().
*/
btnAgregar.addEventListener('click',(e)=>{
  let valido = 
  inputTitulo.value.trim() !== "" ||  
  inputGenero.value.trim() !== "" || 
  Number(inputDuracion.value) <= 0 || 
  Number(inputRating.value) <= 0 || 
  Number(inputAnio.value) <= 0|| 
  Number(inputBudget.value) <= 0|| 
  Number(inputRevenue.value)<= 0|| 
  vistaYa === undefined || 
  cast.value.trim().length > 0;
  if(valido){
    agregar();
  }alert(`Fill up the form PROPERLY ...`);
});
function agregar(){
  //Crear objeto pelicula
  const peliNueva = {
    title: inputTitulo.value.trim(),
    genre: inputGenero.value.trim(),
    duration: Number(inputDuracion.value),
    releaseYear: Number(inputAnio.value),
    rating: Number(inputRating.value),
    isWatch: vistaYa,
    cast: inputCast.value.trim().split(`,`).map((actor)=>{
      return actor.trim();
    }), //Antonio Banderas, Tom Hanks
    boxOffice: 
    {budget:Number(inputBudget.value), //Inside an Object don't use equal
    revenue:Number(inputRevenue.value)}
  }
  //Agregarlo a Catalogo
  if(catalogo.find((peli)=>{
    return (peli.titulo.toLowerCase() === inputTitulo.value.trim().toLowerCase()); 
  })){
    alert(`${peliNueva.titulo} YA está en CATÁLOGO ...`);
  }else{
    catalogo.push(peliNueva);
  }

  //Visualizar

}

/*
  2. Cada botón de género debe filtrar el array catalogo con filter()
     según el genero, luego transformarlo con map() para mostrar
     título, género y año, y mostrarlo en divFiltro.

  Pista: Usa event delegation en divBotones igual que en el ejercicio
  de destinos (e.target.value).
*/

// Escribe tu código acá:

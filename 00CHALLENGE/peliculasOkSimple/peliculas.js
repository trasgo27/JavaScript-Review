
let boxOffice = {
  presupuesto:0,
  taquilla:0
};
let pelicula = {
titulo : "",
genero : "",
anio   : 0,
cast:[],
boxOffice
};
//const catalogo = [pelicula];

function mostrarCatalogo() {
const html = catalogo.map((p,i)=>
`<strong>${i+1}:</strong> Título: ${p.titulo}, Genero: ${p.genero}, Año: ${p.anio},
Cast: ${p.cast.join(', ')},
boxOffice: Presupuesto: ${p.boxOffice.presupuesto}, Taquilla: ${p.boxOffice.taquilla}
`
).join('<br>');
divLista.innerHTML = "<h3>Catalogo Completo</h3> <br>" + html;
}

btnAgregar.addEventListener('click', (event) => {
  event.preventDefault();
  const titulo = inputTitulo.value.trim();
  const genero = inputGenero.value.trim();
  const anio = Number(inputAnio.value);
  const cast = inputCast.value.split(',');//Tom Hans, Antonio Banderas
  const presupuesto = Number(inputPresu.value);
  const taquilla = Number(inputTaquilla.value); 

  if (titulo === "" || genero === "" || !(anio > 0)) {
    alert("Valores NO validos ...");
    return;
  }
  
  if (catalogo.find((p)=>
     titulo.trim().toUpperCase() === p.titulo.toUpperCase() //toUpperCase() no autocompleta
  )){ //p.atributos titulo no title
    alert(`${titulo} ya está en CATALOGO ...` );
    return;
  }

  catalogo.push({ titulo, genero, anio });
  console.table(catalogo);
  mostrarCatalogo();

//Borrar los campos
  inputTitulo.value = "";
  inputGenero.value = "";
  //inputAnio.value = "";
});

divBotones.addEventListener("click", (e) => {
  e.preventDefault();
  const genero = e.target.value;
  if (!genero) return;

  const filtradas = catalogo.filter(p => p.genero === genero);
  divFiltro.innerHTML = "<strong>Filtradas:</strong><br>" +
    filtradas.map((p, i) =>
      `${i + 1}. ${p.titulo} — ${p.genero} (${p.anio})`
    ).join("<br>");
});

mostrarCatalogo();

function getVistaYa() {
  const checked = document.querySelector('input[name="vistaYa"]:checked');
  return checked ? checked.value === "true" : undefined;
}

btnAgregar.addEventListener('click',(e)=>{
  e.preventDefault();
  const vistaYa = getVistaYa();
  const titulo = inputTitulo.value.trim();
  const genero = inputGenero.value.trim();
  const duracion = Number(inputDuracion.value);
  const rating = Number(inputRating.value);
  const anio = Number(inputAnio.value);
  const budget = Number(inputBudget.value);
  const revenue = Number(inputRevenue.value);
  const reparto = inputCast.value.trim();

  const valido =
    titulo !== "" &&
    genero !== "" &&
    duracion > 0 &&
    rating >= 0 &&
    anio > 1800 &&
    budget > 0 &&
    revenue >= 0 &&
    vistaYa !== undefined &&
    reparto.length > 0;

  if (!valido) {
    alert(`Fill up the form PROPERLY ...`);
    return;
  }

  const duplicado = catalogo.find(p => p.title.toLowerCase() === titulo.toLowerCase());
  if (duplicado) {
    alert(`${titulo} is ALREADY in CATALOGO ...`);
    return;
  }

  const peliNueva = {
    title: titulo,
    genre: genero,
    duration: duracion,
    releaseYear: anio,
    rating: rating,
    isWatched: vistaYa,
    cast: reparto.split(`,`).map(a => a.trim()),
    boxOffice: { budget, revenue }
  };
  agregar(peliNueva);
});

function agregar(peliNueva) {
  catalogo.push(peliNueva);

  divLista.innerHTML = `<strong>Todas las películas:</strong><br>` +
    catalogo.map((peli) => {
      return `T: ${peli.title}, G: ${peli.genre}, ${peli.duration} min, de ${peli.releaseYear}, valor: ${peli.rating}, vista: ${peli.isWatched}, cast: ${peli.cast.join(', ')}, boxOffice: Budget: $${peli.boxOffice.budget}, Revenue: $${peli.boxOffice.revenue}`;
    }).join(`<br>`);
}

/*
  Default values set in HTML (peliculas.html):
  - inputTitulo:      "Inception"
  - inputGenero:      "Sci-Fi" (selected option)
  - inputDuracion:    120
  - inputAnio:        2024
  - inputRating:      7.5
  - vistaYa:          false (checked radio)
  - inputCast:        "Leonardo DiCaprio, Elliot Page"
  - inputBudget:      1000000
  - inputRevenue:     5000000
  
  These defaults provide a pre-filled form for faster testing/demo.
  The user can override any field before submitting.
*/


const selectGenero = document.getElementById("selectGenero");
selectGenero.addEventListener("change", () => {
  const generoS = selectGenero.value;
  if (!generoS) {
    divFiltro.innerHTML = "<strong>Filtradas:</strong><br>";
    return;
  }
  const cataGeneroS = catalogo.filter(peli => peli.genre === generoS);
  divFiltro.innerHTML = "<strong>Filtradas:</strong><br>" +
    cataGeneroS.map(peli =>
      `T: ${peli.title}, G: ${peli.genre} (${peli.releaseYear})`
    ).join("<br>");
});


/*
  2. Cada botón de género debe filtrar el array catalogo con filter()
     según el genero, luego transformarlo con map() para mostrar
     título, género y año, y mostrarlo en divFiltro.

  Pista: Usa event delegation en divBotones igual que en el ejercicio
  de destinos (e.target.value).
*/

// Escribe tu código acá:

const divLista = document.getElementById('divLista');
const divFiltro = document.getElementById('divFiltro');
const inputTitulo = document.getElementById('inputTitulo');
const inputGenero = document.getElementById('inputGenero');
const inputAnio = document.getElementById('inputAnio');
const btnAgregar = document.getElementById('btnAgregar');
const divBotones = document.getElementById('divBotones');

const catalogo = [
  { titulo: "Inception", genero: "Ciencia Ficción", anio: 2010 },
  { titulo: "Superbad", genero: "Comedia", anio: 2007 },
  { titulo: "The Shawshank Redemption", genero: "Drama", anio: 1994 },
  { titulo: "Mad Max: Fury Road", genero: "Acción", anio: 2015 },
  { titulo: "Get Out", genero: "Terror", anio: 2017 },
  { titulo: "The Matrix", genero: "Ciencia Ficción", anio: 1999 },
  { titulo: "The Dark Knight", genero: "Acción", anio: 2008 },
  { titulo: "The Shining", genero: "Terror", anio: 1980 }
];

function renderCatalogo() {
  const html = catalogo.map((p, i) =>
    `${i + 1}. ${p.titulo} — ${p.genero} (${p.anio})`
  ).join("<br>");
  divLista.innerHTML = "<strong>Todas las películas:</strong><br>" + html;
}

btnAgregar.addEventListener('click', () => {
  const titulo = inputTitulo.value.trim();
  const genero = inputGenero.value.trim();
  const anio = Number(inputAnio.value);

  if (titulo === "" || genero === "" || !(anio > 0)) {
    alert("Valores NO validos ...");
    return;
  }

  catalogo.push({ titulo, genero, anio });
  console.table(catalogo);
  renderCatalogo();

  inputTitulo.value = "";
  inputGenero.value = "";
  inputAnio.value = "";
});

divBotones.addEventListener("click", (e) => {
  const genero = e.target.value;
  if (!genero) return;

  const filtradas = catalogo.filter(p => p.genero === genero);
  divFiltro.innerHTML = "<strong>Filtradas:</strong><br>" +
    filtradas.map((p, i) =>
      `${i + 1}. ${p.titulo} — ${p.genero} (${p.anio})`
    ).join("<br>");
});

renderCatalogo();

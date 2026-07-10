const divMostrar = document.getElementById("divMostrar");
const divMostrar2 = document.getElementById("divMostrar2");
const inputCiu = document.getElementById("inputCiu");
const inputConti = document.getElementById("inputConti");
const btnEnviar = document.getElementById("btnEnviar");
const divBotones = document.getElementById("divB");

const vector = [
  {ciudad: "Paris", continente: "Europa"},
  {ciudad: "Tokio", continente: "Asia"},
  {ciudad: "Nueva York", continente: "America"},
  {ciudad: "Sidney", continente: "Oceania"},
  {ciudad: "El Cairo", continente: "Africa"},
  {ciudad: "Río de Janeiro", continente: "America"},
  {ciudad: "Cape Town", continente: "Africa"},
  {ciudad: "Roma", continente: "Europa"}
];

function renderAll() {
  divMostrar.innerHTML = vector
    .map((d, i) => `Destino: ${i+1}: ${d.ciudad} en ${d.continente}`)
    .join("<br>");
}

function renderFiltered(continent) {
  const filtered = vector
    .filter(d => d.continente === continent)
    .map((d, i) => `${i+1}, ciudad: ${d.ciudad}, continente: ${d.continente}`);
  divMostrar2.innerHTML = filtered.join("<br>");
  console.table(filtered);
}

btnEnviar.addEventListener("click", () => {
  if (!inputCiu.value.trim() || !inputConti.value.trim()) {
    alert("Completar los campos ...");
    return;
  }
  vector.push({
    ciudad: inputCiu.value.trim(),
    continente: inputConti.value.trim()
  });
  renderAll();
});

divBotones.addEventListener("click", (e) => {
  renderFiltered(e.target.value);
});

renderAll();

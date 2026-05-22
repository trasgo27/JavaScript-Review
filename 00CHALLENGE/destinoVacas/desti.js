const divMostrar = 
document.getElementById("divMostrar");
const divMostrar2 =
document.getElementById("divMostrar2"); 
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
let vectorDesti = [];
let ciudad = "";
let continente = "";

btnEnviar.addEventListener("click",()=>{
  if(!inputCiu.value || !inputConti.value ){
    alert (`Completar los campos ...`);
    return;
  }
  const destino = {
    ciudad: inputCiu.value.trim(),
    continente: inputConti.value.trim()
  };

  vector.push(destino);
  vectorDesti = vector.map((d,i)=>{ // Array de caracteres
    let linea = "";
    linea = `Destino: ${i+1}: ${d.ciudad} en ${d.continente} <br>`;
    return linea;
  });
    divMostrar.innerHTML = vectorDesti.join(`<br>`);  
});

divBotones.addEventListener("click",(e)=>{
  let contiSeleccion = e.target.value;
  let stringSeleccion = "";
  let vectorSeleccion = vector
  .filter(d=>
    d.continente === contiSeleccion)
  .map((d,i)=>{
    
    stringSeleccion = `${i+1}, ciudad: ${d.ciudad}, continente: ${d.continente} <br>`
    
    return stringSeleccion;
  });
  divMostrar2.innerHTML = vectorSeleccion.join(`<br>`);
  console.table(vectorSeleccion);

});
const botonBorrar = document.getElementById('botonBorrar');
const inputGuardar = document.getElementById('inputGuardar');
const botonGuardar = document.getElementById('botonGuardar');
const botonRecuperar = document.getElementById('botonRecuperar');
const inputRecuperar = document.getElementById('inputRecuperar');
const divMostrar = document.getElementById('divMostrar');
//alert('0202');
//Logica
function mostrar(vec){
    divMostrar.innerHTML = "";
    return (vec.map(p=>`Usuario: ${p.username}, puntuacion: ${p.score}`)
    .join('<br>'));
} 
function recuperar(nombre){
    const recuperado = window.localStorage.getItem(nombre);
    const objeto = JSON.parse(recuperado);
    console.log('Objeto Recuperado ...');
    console.table(objeto);
    return objeto;
}
const segundoArray = [
    { username: 'Ana', score: 95 },
    { username: 'Luis', score: 82 },
    { username: 'Carla', score: 88 },
    { username: 'Pedro', score: 73 }
];

const guardado = window.localStorage.getItem('vector');
if(guardado){
    const guardado2 = JSON.parse(guardado);
    const html = mostrar(guardado2);
    divMostrar.innerHTML = `<br> Datos Recuperados: <br>${html}`
}
botonRecuperar.addEventListener('click',(e)=>{
    const clave = inputRecuperar.value;
    const objetoS = recuperar(clave);
    if (!objetoS) return;
    const html = mostrar(objetoS);
    divMostrar.innerHTML =`<br> Datos Recuperados <br> <span style="color:red;font-size:24px">en ${clave}:</span><br> ${html}`;
});
botonGuardar.addEventListener('click',(e)=>{
    const clave = inputGuardar.value;
    window.localStorage.setItem(clave,segundoArray);
    console.log('Guardado');
})

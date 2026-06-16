//Crear Obj
const miBotonS = document.getElementById('botonS');
const miBotonP = document.getElementById('botonP');
const miBotonB = document.getElementById('botonB');
const miDivB = document.getElementById('divB');
const miDivO = document.getElementById('divO');

//Array con data
const perfilesArray = [
  { username: 'trasgo', score: 42 },
  { username: 'luna', score: 88 },
];

//MOSTRAR
function mostrar(vector){
    return vector.map((p) => (
        `Usuario: ${p.username}, puntos: ${p.score}` 
    ))
    .join(`<br>`);
}
    
//comprobar si hay algo guardado
const guardado = window.localStorage.getItem('vector');
if(guardado){
    console.log('Hay registros guardados');
    const htmlObj = JSON.parse(guardado);    
    miDivO.innerHTML = `Datos GUARDADOS <br> ${mostrar(htmlObj)}`;
}

//Guardar
miBotonS.addEventListener('click',(e)=>{
    console.log('boton Guardar');
    const htmlString = JSON.stringify(perfilesArray);
    window.localStorage.setItem('vector',htmlString);
    console.log('Guardado en LOCAL STORAGE ...');
});

//Recuperar
miBotonP.addEventListener('click', (e) => {
    console.log('boton Recuperar');
    const guardado = window.localStorage.getItem('vector');
    if (guardado) {
        const htmlObj = JSON.parse(guardado);
        const htmlObj2 = mostrar(htmlObj);
        miDivO.innerHTML = `Datos RECUPERADOS <br> ${htmlObj2}`;
    } else {
        miDivO.innerHTML = 'No hay datos guardados';
    }
});

//Borrar
miBotonB.addEventListener('click', (e) => {
    console.log('boton Borrar');
    window.localStorage.removeItem('vector');
    miDivO.innerHTML = 'Datos BORRADOS';
});

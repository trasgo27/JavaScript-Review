//alert('0101Ej.js');
//DOM
const boton = document.getElementById('boton');
const mostrar = document.getElementById('mostrar');

//funcion
function lanzar(){
    return Math.floor(Math.random()*2);
}//la funcion devuelve un valor. return resultado

boton.addEventListener('click', (e) => {
  // la creacion de la promesa y su consumo dentro del evento
  const miProme = new Promise((resolve, reject) => {
    //estructura de la promesa. 2 func. parametros
    const resultado = lanzar();
    if (resultado === 0) {
      resolve(`${resultado} que equivale a EXITO ...`); // resolve es una func. con mensaje
    } else {
      reject(`${resultado} que equivale a FRACASO ...`); // reject es una func. con mensaje
    }
  });
  //CONSUMO de la promesa
  miProme
    .then((men) => {
      console.log(men);
    })
    .catch((men) => {
      console.log(men);
    });
});
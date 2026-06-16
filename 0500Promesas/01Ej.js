//alert('Cara o Cruz');
//DOM
const boton = document.getElementById('boton');
const mostrar = document.getElementById('mostrar');

function lanzar() {
  return Math.floor(Math.random() * 2);
}
boton.addEventListener('click', (e) => {
  //lanzar();
  const miPromesa = new Promise((resolve, reject) => {
    const resultado = lanzar();
    if (resultado === 0) {
      resolve('BIEN. Ha salido CARA');//resolve=('BIEN. Ha salido CARA');
    } else {
      reject('MAL. Ha salido CRUZ');//reject=('MAL. Ha salido CRUZ');
    }
  });
  miPromesa
    .then((mensaje) => {
        return console.log(`La promesa ha sido: ${mensaje}`);
    })
    .catch((mensaje) => {
        return console.log(`La promesa ha sido: ${mensaje}`);
    });
});

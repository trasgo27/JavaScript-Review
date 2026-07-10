const boton = document.getElementById('boton');
const input = document.getElementById('input');

function recuperarArch(nom) {
  return new Promise((resolve, reject) => {
    if (!nom || nom.trim() === '') {
      reject('Error');
      return;
    }
        
    console.log('La descarga esta empezando...');
    setTimeout(()=>{
        resolve('Archivo descargado')
    },3000);
    
  });
}

boton.addEventListener('click', (e) => {
  const nom = input.value;
  console.log(nom);
  recuperarArch(nom)
    .then((men) => {
      console.log(men);
    })
    .catch((err) => {
      console.error(err);
    });
});

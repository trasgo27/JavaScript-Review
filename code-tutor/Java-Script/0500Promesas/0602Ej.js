//alert('0602Ej');
const boton = document.getElementById('boton');
const input = document.getElementById('input');

async function recuperarArch(nom) {
    if (!nom || nom.trim() === '') {
      throw new Error('Error');
    }
    console.log('La descarga esta empezando...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    return 'Archivo descargado';
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
    })
    .finally(()=>{
        console.log('Adios ...');
    });
});

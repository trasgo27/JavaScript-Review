//alert('07Ej.js');
//This function takes how many seconds are between saying hello and goodbye
//dom
const boton = document.getElementById('boton');
const input1 = document.getElementById('input1');
const inputN = document.getElementById('inputN');
function saludar(nom, num) {
    console.log(`Hola ${nom}`);
    console.log('se está gestionando su petición...');
    const ale = Math.floor(Math.random() * 3) + 1;
    const exito = ale % 2 !== 0;
    return new Promise((resolve, reject) => {
        if (!nom || typeof num !== 'number' || isNaN(num)) {
            console.log('Valores no validos ...');
            reject('Valores no validos');
            return;
        }
        console.log('valores validos ...');
        setTimeout(() => {
            if (exito) {
                resolve(`${nom}, gestión OKEY. ADIOS`);
            } else {
                reject(`${nom}, gestión FALLIDA. ADIOS`);
            }
        }, num * 1000);
    });
}
boton.addEventListener('click', (e) => {
    const nom = inputN.value;
    const num = parseInt(input1.value);
    saludar(nom, num)
        .then((men) => {
            console.log(men);
        })
        .catch((err) => {
            console.error(err);
        });
});
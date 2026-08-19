//alert('Ej0402');
const Array2 = [
    { username: 'Ana', score: 95 },
    { username: 'Luis', score: 82 },
    { username: 'Carla', score: 88 },
    { username: 'Pedro', score: 73 }
];
const Array1 = [
  { username: 'trasgo', score: 42 },
  { username: 'luna', score: 88 },
];
const Array3 = [
  { username: 'Sofia', score: 91 },
  { username: 'Mateo', score: 78 },
  { username: 'Valentina', score: 85 },
  { username: 'Santiago', score: 69 },
];
const Array4 = [
  { username: 'elfo', score: 95 },
  { username: 'dragon', score: 76 },
  { username: 'mago', score: 88 },
  { username: 'grifo', score: 63 },
];
const Array5 = [
  { username: 'Isabella', score: 97 },
  { username: 'Diego', score: 74 },
  { username: 'Camila', score: 83 },
];
const Array6 = [
  { username: 'fénix', score: 99 },
  { username: 'basilisco', score: 55 },
  { username: 'sirena', score: 90 },
  { username: 'centauro', score: 81 },
  { username: 'hidra', score: 67 },
];
const ArrayNom = ['Array1','Array2','Array3','Array4','Array5','Array6'];
const ArrayObj = [Array1,Array2,Array3,Array4,Array5,Array6];

const selectG = document.getElementById('selectG');
const selectM = document.getElementById('selectM');
const selectB = document.getElementById('selectB');
const divOutput = document.getElementById('divOutput');

function estaGuardado(num) {
    return !!window.localStorage.getItem(ArrayNom[num]);
}

function guardar(num) {
    const nombre = ArrayNom[num];
    const objeto = JSON.stringify(ArrayObj[num]);
    window.localStorage.setItem(nombre, objeto);
    console.log(`Se ha guardado ${nombre}`);
    divOutput.innerHTML = `<p style="color: green;">"${nombre}" se ha guardado en LocalStorage con éxito.</p>`;
}

function mostrar(num) {
    const nombre = ArrayNom[num];
    const guardadoString = window.localStorage.getItem(nombre);

    if (!guardadoString) {
        divOutput.innerHTML = `<p style="color: red;">"${nombre}" no está guardado en LocalStorage.</p>`;
        return;
    }

    const datos = JSON.parse(guardadoString);
    let html = `<h3>Datos de ${nombre}:</h3>`;
    html += '<table border="1" cellpadding="5" style="border-collapse: collapse; text-align: left;">';
    html += '<thead><tr><th>Username</th><th>Score</th></tr></thead><tbody>';
    datos.forEach(item => {
        html += `<tr><td>${item.username}</td><td>${item.score}</td></tr>`;
    });
    html += '</tbody></table>';
    divOutput.innerHTML = html;
}

function borrar(num) {
    const nombre = ArrayNom[num];
    if (window.localStorage.getItem(nombre)) {
        window.localStorage.removeItem(nombre);
        console.log(`Borrado: ${nombre}`);
        divOutput.innerHTML = `<p style="color: green;">"${nombre}" ha sido eliminado de LocalStorage.</p>`;
    } else {
        divOutput.innerHTML = `<p style="color: orange;">"${nombre}" no estaba guardado en LocalStorage.</p>`;
    }
}

function obtenerNum(e) {
    const num = parseInt(e.target.value);
    if (isNaN(num) || num < 0 || num >= ArrayNom.length) return -1;
    return num;
}

selectG.addEventListener('change', (e) => {
    const num = obtenerNum(e);
    if (num === -1) return;
    if (estaGuardado(num)) {
        divOutput.innerHTML = `<p style="color: orange;">"${ArrayNom[num]}" ya está guardado.</p>`;
    } else {
        guardar(num);
    }
});

selectM.addEventListener('change', (e) => {
    const num = obtenerNum(e);
    if (num === -1) return;
    mostrar(num);
});

selectB.addEventListener('change', (e) => {
    const num = obtenerNum(e);
    if (num === -1) return;
    borrar(num);
});

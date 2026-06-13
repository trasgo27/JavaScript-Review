// Set up arrays of data
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

// Get DOM Elements
const botonBorrar = document.getElementById('botonBorrar');
const inputGuardar = document.getElementById('inputGuardar');
const botonGuardar = document.getElementById('botonGuardar');
const botonRecuperar = document.getElementById('botonRecuperar');
const inputRecuperar = document.getElementById('inputRecuperar');
const divMostrar = document.getElementById('divMostrar');
const selectGuardar = document.getElementById('selectGuardar');
const selectRecuperar = document.getElementById('selectRecuperar');
const selectBorrar = document.getElementById('selectBorrar');

const arrayNum = [Array1, Array2, Array3, Array4, Array5, Array6];
const arrayNom = ['Array1', 'Array2', 'Array3', 'Array4', 'Array5', 'Array6'];

// Check stored keys on page load and display status
function comprobarLocal(){
    let vacio = true;
    const vectorMatch = [];    
    // We check for unified keys 'Array1' through 'Array6'
    for (let i = 0; i < arrayNom.length; i++) {
        const guardado = window.localStorage.getItem(arrayNom[i]);
        if (!guardado) {
            console.log(`${arrayNom[i]} ... NO está GUARDADO`);
        } else {
            console.log(`${arrayNom[i]} ... Sí ESTÁ GUARDADO`);
            vacio = false;
            vectorMatch.push(arrayNom[i]);
        }
    }
    
    if (vacio) {
        console.log('No hay NADA GUARDADO...');
        divMostrar.innerHTML = '<p style="color: #666;">No hay datos guardados en LocalStorage.</p>';
    } else {
        divMostrar.innerHTML = `<h3>Arrays Guardados:</h3><ul>${vectorMatch.map(name => `<li>${name}</li>`).join('')}</ul>`;
    }
}

// Initial check
comprobarLocal();

// Function to save an array
function guardar(index) {  
    const vector = arrayNum[index];  
    const clave = arrayNom[index];
    const string = JSON.stringify(vector);
    window.localStorage.setItem(clave, string);
    console.log(`Guardado con éxito: ${clave}`);
    comprobarLocal();
}

// Guardar click event
botonGuardar.addEventListener('click', () => {
    // If the inputGuardar has a value, we can use it, or fallback to the selection
    const index = parseInt(selectGuardar.value) - 1;
    guardar(index);
});

// Guardar change event (as originally implemented, but corrected index)
selectGuardar.addEventListener('change', (e) => {
    const index = parseInt(e.target.value) - 1;
    console.log(`Seleccionado para guardar: ${arrayNom[index]}`);
});

// Function to retrieve and render an array
function recuperar(clave) {
    const guardado = window.localStorage.getItem(clave);
    if (!guardado) {
        divMostrar.innerHTML = `<p style="color: red;">Error: No se encontró ningún dato con la clave "${clave}".</p>`;
        console.log(`No se encontró la clave: ${clave}`);
        return;
    }
    
    try {
        const datos = JSON.parse(guardado);
        console.log(`Recuperado:`, datos);
        
        let html = `<h3>Datos de ${clave}:</h3>`;
        html += '<table border="1" cellpadding="5" style="border-collapse: collapse; text-align: left;">';
        html += '<thead><tr><th>Username</th><th>Score</th></tr></thead><tbody>';
        datos.forEach(item => {
            html += `<tr><td>${item.username}</td><td>${item.score}</td></tr>`;
        });
        html += '</tbody></table>';
        
        divMostrar.innerHTML = html;
    } catch (e) {
        divMostrar.innerHTML = `<p style="color: red;">Error al parsear los datos de "${clave}".</p>`;
    }
}

// Recuperar click event (checks input or select)
botonRecuperar.addEventListener('click', () => {
    // Prioritize text input if user typed a key, otherwise use the dropdown selection
    const clave = inputRecuperar.value.trim() || selectRecuperar.value;
    recuperar(clave);
});

// Function to delete a key
function borrar(clave) {
    if (window.localStorage.getItem(clave)) {
        window.localStorage.removeItem(clave);
        console.log(`Borrado: ${clave}`);
        comprobarLocal();
    } else {
        console.log(`No existe la clave "${clave}" para borrar.`);
    }
}

// Borrar click event
botonBorrar.addEventListener('click', () => {
    const index = parseInt(selectBorrar.value) - 1;
    const clave = arrayNom[index];
    borrar(clave);
});


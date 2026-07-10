# Debug Prompt: localStorage Practice App

You are a code reviewer. Find all bugs in this web app and report them.

## App Purpose

The app manages 6 predefined arrays (`Array1`–`Array6`), each containing objects with `{ username, score }`. Users can:
1. Select an array from a dropdown and save it to localStorage
2. Retrieve saved data by entering a key
3. See which arrays are already stored on page load
4. Ideally clear data (borrar)

## Files

### `0203Ej.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="divBotones">
        <input type="text" id="inputGuardar">
        <select name="" id="selectGuardar">
            <option value="Array1">Array1</option>
            <option value="Array2">Array2</option>
            <option value="Array3">Array3</option>
            <option value="Array4">Array4</option>
            <option value="Array5">Array5</option>
            <option value="Array6">Array6</option>
        </select>
        <button id="botonGuardar">GUARDAR</button>
        <br><br>
        <input type="text" id="inputRecuperar">
                <select name="" id="selectGuardar">
            <option value="Array1">Array1</option>
            <option value="Array2">Array2</option>
            <option value="Array3">Array3</option>
            <option value="Array4">Array4</option>
            <option value="Array5">Array5</option>
            <option value="Array6">Array6</option>
        </select>
        <button id="botonRecuperar">RECUPERAR</button>
        <br><br>
        <button id="botonBorrar">BORRAR</button>
    </div>
    <div id="divMostrar"></div>
    <script src="0203Ej.js"></script>
</body>
</html>
```

### `0203Ej.js`

```js
//alert('Version 3');
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
const botonBorrar = document.getElementById('botonBorrar');
const inputGuardar = document.getElementById('inputGuardar');
const botonGuardar = document.getElementById('botonGuardar');
const botonRecuperar = document.getElementById('botonRecuperar');
const inputRecuperar = document.getElementById('inputRecuperar');
const divMostrar = document.getElementById('divMostrar');
const selectGuardar = document.getElementById('selectGuardar');
const selectRecuperar = document.getElementById('selectRecuperar');

//verificar is hay algo
const arrayNum = [Array1,Array2,Array3,Array4,Array5,Array6];
const arrayNom = ['Array1','Array2','Array3','Array4','Array5','Array6'];
const vacio = true;
const vectorMatch = [];
for(let i=0;i<arrayNom.length;i++){
    const guardado = window.localStorage.getItem(arrayNom[i]);
    if(!guardado){
        console.log(`${arrayNom[i]} ... NO está GUARDADO `);
    }else{
        console.log(`${arrayNom[i]} ... Sí ESTÁ GUARDADO `);
        vacio = false;
        vectorMatch.push(i);
    }
}
    if(vacio){
        console.log('No hay NADA GUARDADO...');
    }else{
        comprobarLocal()
    }

function guardar(vector){
    const num = vector.chartAt(6);
    const clave = "vector"+num;
    const string = JSON.stringify(vector);
    window.localStorage.setItem(clave,string);
}
selectGuardar.addEventListener('change',(e)=>{
    const valor = selectGuardar.value;
    console.log(`Se VA A GUARDAR: ${valor}`);
    const num = valor.chartAt(5);
    console.log(`${num}`);
    guardar(arrayNum[valor]);
});
function comprobarLocal(){
    for(let i=0;i<vectorMatch.length;i++){
            const num = vectorMatch[i];
            console.log(`${num}`);
        }
}
```

## Task

1. Find every bug in both files — syntax errors, logic errors, type errors, HTML errors, etc.
2. For each bug, state the exact line number, explain why it's wrong, and propose the fix.
3. Note any missing functionality (e.g. the borrar/delete feature has no handler).

Return a structured bug report.

---

## Debug Report — `0203Ej.js`

### Bug 1 (Critical) — Key mismatch between save and restore

`guardar()` saves to `localStorage` with key `"vector"+num` (e.g., `"vector1"`, `"vector2"`), but the startup check at lines 109–118 looks for keys from `arrayNom`: `"Array1"`, `"Array2"`, etc.

**Effect:** Data is never found on reload — `vacio` stays `true` every time.

---

### Bug 2 — Wrong event handler reference

**Line 91 in the file (not in this snippet — `selectBorrar` listener):**
```js
const num = +e.value;  // ❌ e is Event, not element
```
`e.value` should be `e.target.value`. This will always produce `NaN`.

---

### Bug 3 — Implicit type coercion

Lines 131–136 use `valor` (a string from `selectGuardar.value`) as an array index in `arrayNum[valor]`. `arrayNum` is a numeric array indexed 0–5, so `arrayNum["Array1"]` returns `undefined`.

---

### Additional observations

- `comprobarLocal()` (line 138) only logs indices — appears to be debug scaffolding, not functional.
- `selectBorrar` is referenced in an event listener but never declared or retrieved from the DOM.
- HTML has duplicate `id="selectGuardar"` on the second `<select>` (line 39), so `getElementById('selectRecuperar')` returns `null`.
- `vacio` is declared `const` (line 107) but reassigned on line 115 — should be `let`.
- `chartAt` (lines 126, 134) is a typo of `charAt`. Even fixed, the logic of extracting a number from a string by position is fragile.

---

# Debug Request: LocalStorage Practice Web App

You are a senior JavaScript and Web Development Code Reviewer. Find all bugs, code issues, usability flaws, and missing functionalities in the provided HTML and JavaScript files, and generate a structured bug report.

## App Goal and Functionality
The application is designed to manage 6 pre-defined arrays (`Array1` through `Array6`) containing username and score objects. 
Users interact with the app via three dropdown menus:
1. **GUARDAR (Save):** Saves the selected array to LocalStorage when selected.
2. **MOSTRAR (Retrieve):** Retrieves the selected array from LocalStorage and displays its content dynamically in the output container.
3. **BORRAR (Delete):** Deletes the selected array from LocalStorage.

---

## Code Files to Review

### 1. `0204Ej.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>
        <label for="selectG"> G U A R D A R : </label>
        <select name="" id="selectG">
            <option value="0">Array1</option>
            <option value="1">Array2</option>
            <option value="2">Array3</option>
            <option value="3">Array4</option>
            <option value="4">Array5</option>
            <option value="5">Array6</option>
        </select>
        <br><br>
        <label for="selectM"> M O S T R A R : </label>
        <select name="" id="selectM">
            <option value="0">Array1</option>
            <option value="1">Array2</option>
            <option value="2">Array3</option>
            <option value="3">Array4</option>
            <option value="4">Array5</option>
            <option value="5">Array6</option>
        </select>
        <br><br>
        <label for="selectB"> B O R R A R : </label>
        <select name="" id="selectB">
            <option value="0">Array1</option>
            <option value="1">Array2</option>
            <option value="2">Array3</option>
            <option value="3">Array4</option>
            <option value="4">Array5</option>
            <option value="5">Array6</option>
        </select>
    </div>
    <div id="divOutput">

    </div>
    <script src="0204Ej.js"></script>
</body>
</html>
```

### 2. `0204Ej.js`
```javascript
//alert('Ej0402');
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
const ArrayNom = ['Array1','Array2','Array3','Array4','Array5','Array6'];
const ArrayObj = [Array1,Array2,Array3,Array4,Array5,Array6];
//DOM
const selectG = document.getElementById('selectG');
const selectM = document.getElementById('selectM');
const selectB = document.getElementById('selectB');
const divOutput = document.getElementById('divOutput');
//functions
function estaGuardado(num){
    let guardado = false;
    const nombre = ArrayNom[num];
    const guardadoString = window.localStorage.getItem(nombre);
    if(guardadoString){
        return console.log('Ya esta guardado');
    }else{
        guardar(num);
    }
}

function guardar(num){
    estaGuardado(num);
    const nombre = ArrayNom[num];
    const objeto = JSON.stringify(ArrayObj[num]);
    window.localStorage.setItem(nombre,objeto);
    console.log(`Se ha guardado ${ArrayNom[num]}`);
}

selectG.addEventListener('change',(e)=>{
    const num = e.target.value;
    estaGuardado(num);    
});
```

---

## Instructions for Your Review

Please analyze the codebase and provide a report containing:
1. **Critical JavaScript Bug:** Identify the runtime recursive loop, the path it takes, and the exact error it triggers.
2. **Missing Functionality:** Identify DOM elements retrieved in JS but never wired to any behavior.
3. **HTML Usability Issues:** Identify the issue with pre-selected defaults in `<select>` elements when combined with change event listeners.
4. **Proposed Fixes:** Provide the complete, refactored HTML and JavaScript code resolving all identified issues cleanly.

---

# Debug Request: LocalStorage Practice Web App (0203Ej)

You are a senior JavaScript and Web Development Code Reviewer. Find all bugs, code issues, usability flaws, and missing functionalities in the provided HTML and JavaScript files, and generate a structured bug report.

## App Goal and Functionality
The app manages 6 predefined arrays (`Array1`–`Array6`) of `{ username, score }` objects. Users can:
1. Select an array from a dropdown and click **GUARDAR** to save it to LocalStorage.
2. Type a key or select an array from a dropdown and click **RECUPERAR** to retrieve and display the data as an HTML table.
3. Select an array from a dropdown and click **BORRAR** to delete it from LocalStorage.
4. On page load, check which arrays are already stored and display their status.

## Code Files to Review

### 1. `0203Ej.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="divBotones">
        <input type="text" id="inputGuardar">
        <select name="" id="selectGuardar">
            <option value="1">Array1</option>
            <option value="2">Array2</option>
            <option value="3">Array3</option>
            <option value="4">Array4</option>
            <option value="5">Array5</option>
            <option value="6">Array6</option>
        </select>
        <button id="botonGuardar">GUARDAR</button>
        <br><br>
        <input type="text" id="inputRecuperar">
        <select name="" id="selectRecuperar">
            <option value="Array1">Array1</option>
            <option value="Array2">Array2</option>
            <option value="Array3">Array3</option>
            <option value="Array4">Array4</option>
            <option value="Array5">Array5</option>
            <option value="Array6">Array6</option>
        </select>
        <button id="botonRecuperar">RECUPERAR</button>
        <br><br>
        <select name="" id="selectBorrar">
            <option value="1">Array1</option>
            <option value="2">Array2</option>
            <option value="3">Array3</option>
            <option value="4">Array4</option>
            <option value="5">Array5</option>
            <option value="6">Array6</option>
        </select>
        <button id="botonBorrar">BORRAR</button>
    </div>
    <div id="divMostrar"></div>
    <script src="0203Ej.js"></script>
</body>
</html>
```

### 2. `0203Ej.js`

```js
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
    const index = parseInt(selectGuardar.value) - 1;
    guardar(index);
});

// Guardar change event
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

// Recuperar click event
botonRecuperar.addEventListener('click', () => {
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
```

---

## Instructions for Your Review

Analyze the codebase and report:
1. **Dead/unused DOM elements** — elements retrieved in JS that are never used.
2. **Event listener design flaws** — listeners that do nothing useful or contradict the app's stated behavior.
3. **Inconsistencies between the three selects** — value formats, behavior, and usability differences.
4. **HTML usability issues** — pre-selected defaults, labeling, and UX concerns.
5. **Any remaining bugs or edge cases** — missing guards, error handling gaps, or logic errors.
6. **Proposed fixes** — provide the complete refactored code for both files.

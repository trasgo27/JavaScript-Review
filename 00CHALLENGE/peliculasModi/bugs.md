# 🐞 Registro de errores — Películas

## Errores transferibles del ejercicio Inventario

Estos errores también aplican al ejercicio de Películas:

### ERROR A — Validación: `input.value != null`

```js
inputTitulo.value != null   // <-- MAL
```

`.value` siempre devuelve string. Vacío es `""`, no `null`.

✅ `inputTitulo.value.trim() !== ""`

---

### ERROR B — `push()` sin convertir tipos

```js
pelicula.anio = inputAnio.value;   // <— MAL (string)
```

`inputAnio.value` devuelve `"2010"` (string), no `2010` (number).

✅ `Number(inputAnio.value)`

---

### ERROR C — `console.table("catalogo")`

```js
console.table(`catalogo`);   // <— MAL
```

Las comillas hacen que muestre el string literal `"catalogo"`, no el array.

✅ `console.table(catalogo);`

---

### ERROR D — `map()` sin `join()` o viceversa

```js
divLista.innerHTML = catalogo.map(p => `${p.titulo}`);
// sin join() → muestra "Pelicula1,Pelicula2,Pelicula3" (con comas)

divLista.innerHTML = catalogo.join("<br>");
// sin map() → muestra "[object Object]" porque join no transforma objetos
```

✅ Siempre: `.map(...).join("<br>")`

---

### ERROR E — Arrow function: `{}` necesita `return`

```js
// MAL — cuerpo vacío, no retorna nada
catalogo.map((p) => {
  `${p.titulo}`
})

// BIEN — sin {}, retorno implícito
catalogo.map((p) => `${p.titulo}`)

// BIEN — con {} y return explícito
catalogo.map((p) => { return `${p.titulo}`; })
```

**Regla:**
```
(param) => expr   → retorna expr
(param) => { ... } → necesita return
```

---

### ERROR F — `includes()` no busca por valor de propiedad

```js
catalogo.includes("Inception")   // <-- MAL (siempre false)
```

`includes()` compara por referencia (`===`). Un string nunca es igual a un objeto.

✅ Usar `find()` o `some()`:
```js
catalogo.find(p => p.titulo === "Inception")

---

## Ampliación de objetos para practicar más métodos de array

Para dominar métodos como `.filter()`, `.map()`, `.reduce()`, `.sort()`, y `.some()`, agrega atributos con distintos tipos de datos (números, booleanos, arrays, objetos anidados).

### 1. `duration` (Number — minutes)

```js
duration: 148
```

**Practica:** `.reduce()` y `.filter()`
- Calcular duración total con `.reduce()`
- Filtrar "cortas" (< 90 min) o "épicas" (> 150 min)

---

### 2. `releaseYear` (Number)

```js
releaseYear: 2010
```

**Practica:** `.sort()` y `.filter()`
- Ordenar cronológicamente
- Filtrar "pelis de los 90s" (`year >= 1900 && year <= 1999`)

---

### 3. `rating` (Number/Float)

```js
rating: 8.8
```

**Practica:** `.sort()`, `.filter()`, `.every()`
- Ordenar por popularidad (mayor rating primero)
- Verificar con `.every()` si **todas** las películas tienen rating > 5.0

---

### 4. `cast` (Array of Strings)

```js
cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"]
```

**Practica:** `.filter()`, `.includes()`, `.flatMap()`
- Filtrar películas donde aparezca un actor específico (`m.cast.includes("Leo")`)
- Extraer lista única de todos los actores con `.flatMap()` + `new Set()`

---

### 5. `isWatched` (Boolean)

```js
isWatched: true
```

**Practica:** `.filter()`, `.some()`, render condicional
- Filtrar no vistas (`isWatched === false`) para hacer Watchlist
- Verificar con `.some()` si hay al menos una sin ver

---

### 6. `boxOffice` (Nested Object)

```js
boxOffice: { budget: 160000000, revenue: 836800000 }
```

**Practica:** Acceso profundo con `.filter()` y `.reduce()`
- Calcular ganancia neta total (`p.boxOffice.revenue - p.boxOffice.budget`)
- Filtrar "fracasos" donde revenue < budget

---

### Objeto completo de ejemplo

```javascript
{
  title: "Inception",
  genre: "Sci-Fi",
  duration: 148,
  releaseYear: 2010,
  rating: 8.8,
  isWatched: true,
  cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
  boxOffice: { budget: 160000000, revenue: 836800000 }
}
```

---

## PowerShell Commands

The correct PowerShell command is:

```powershell
Copy-Item bugs.md D:\apis
```

Or more explicitly:

```powershell
Copy-Item -Path "bugs.md" -Destination "D:\apis"
```

Explanation:

* `Copy-Item` → PowerShell command to copy files/folders
* `-Path` → source file
* `-Destination` → target folder

English correction:

❌ `copy bugs.md to d:\apis`
✅ `Copy bugs.md to D:\apis`
✅ `How do I copy bugs.md to D:\apis in PowerShell?`

Simple English version:

* `Copy-Item` copies files.
* `bugs.md` is the source file.
* `D:\apis` is the destination file (sobreescribe el archivo existente).

---

### Auto-sync con FileSystemWatcher

Para mantener ambos archivos sincronizados automáticamente, ejecuta:

```powershell
.\sync-bugs.ps1
```

Esto inicia un watcher que copia cualquier cambio en `bugs.md` a `D:\apis` al instante. Presiona `Ctrl+C` para detenerlo.

```powershell
# También se puede sincronizar manualmente:
Copy-Item -Path ".\bugs.md" -Destination "D:\apis" -Force
```

---

---

# 🎬 Catálogo de Películas — Ejercicio de Arrays en JavaScript

## Descripción

Crear una aplicación web de catálogo de películas que permita agregar nuevos films, filtrarlos por género, y mostrar listados. El objetivo es practicar los métodos `push`, `map` y `filter` sobre arrays de objetos, además de validación de formularios y delegación de eventos.

## Datos iniciales

```js
const catalogo = [
  { titulo: "Inception",                genero: "Ciencia Ficción", anio: 2010 },
  { titulo: "Superbad",                 genero: "Comedia",         anio: 2007 },
  { titulo: "The Shawshank Redemption", genero: "Drama",           anio: 1994 },
  { titulo: "Mad Max: Fury Road",       genero: "Acción",          anio: 2015 },
  { titulo: "Get Out",                  genero: "Terror",          anio: 2017 },
  { titulo: "The Matrix",               genero: "Ciencia Ficción", anio: 1999 },
  { titulo: "The Dark Knight",          genero: "Acción",          anio: 2008 },
  { titulo: "The Shining",              genero: "Terror",          anio: 1980 }
];
```

## Requisitos

### 1. Agregar película — `push()`

- Tomar los valores de los inputs (`inputTitulo`, `inputGenero`, `inputAnio`).
- Validar que ningún campo esté vacío.
- Crear un objeto `{ titulo, genero, anio }` y agregarlo al array con `push()`.
- Actualizar la lista completa en `divLista` usando `map()` + `join()`.

### 2. Filtrar por género — `filter()` + `map()`

- Usar delegación de eventos sobre `divBotones`.
- Capturar el `value` del botón clickeado.
- Filtrar el array con `filter()` y mostrar los resultados en `divFiltro` usando `map()` + `join()`.

## Estructura HTML

```html
<div id="divLista"><strong>Todas las películas:</strong></div>
<div id="divFiltro"><strong>Filtradas:</strong></div>
```

## Métodos a utilizar

| Método     | Uso |
|------------|-----|
| `push()`   | Agregar nueva película al array |
| `map()`    | Transformar objetos a string HTML |
| `filter()` | Filtrar películas por género |

## Pistas

- Usá `e.target.value` en el contenedor de botones para capturar el género clickeado.
- Usá `trim()` en los valores de los inputs para evitar espacios en blanco.
- Para mostrar en los divs, usá `innerHTML` con el resultado de `join("<br>")`.

---

## HTML Select / Option vs Radio Buttons — Lo básico

Ambos permiten elegir una opción entre varias. La diferencia es **cómo se presentan** y **cómo se obtiene el valor en JS**.

### `<select>` + `<option>` (menú desplegable)

```html
<label>Género:</label>
<select id="inputGenero">
  <option value="">Seleccionar...</option>
  <option value="Acción">Acción</option>
  <option value="Comedia">Comedia</option>
  <option value="Drama">Drama</option>
</select>
```

| Concepto | Detalle |
|----------|---------|
| `value` del `<option>` | Lo que se envía/lee en JS |
| Texto entre etiquetas | Lo que ve el usuario |
| Leer en JS | `document.getElementById("inputGenero").value` |

### Radio buttons (selección única)

```html
<label><input type="radio" name="genero" value="Acción"> Acción</label>
<label><input type="radio" name="genero" value="Comedia"> Comedia</label>
<label><input type="radio" name="genero" value="Drama"> Drama</label>
```

| Concepto | Detalle |
|----------|---------|
| `name` | **Debe ser igual** en todos para que sean excluyentes |
| `value` | Lo que se lee en JS |
| Leer en JS | `document.querySelector('input[name="genero"]:checked')?.value` |

### Diferencias clave

| Aspecto | `<select>` | Radio buttons |
|---------|-----------|---------------|
| Espacio en pantalla | 1 línea (se despliega) | Todas visibles de entrada |
| Lectura en JS | `.value` directo | Requiere `:checked` + `?.value` |
| Valor por defecto | Primer `<option>` con `selected` | El que tenga `checked` |
| Bueno para | Muchas opciones (5+) | Pocas opciones (2–4)

---

## Inputs para `boxOffice`

`boxOffice` es un objeto anidado con dos campos numéricos. En el formulario usamos dos `<input type="number">`:

```html
<input type="number" id="inputBudget" placeholder="Presupuesto (USD)">
<input type="number" id="inputRevenue" placeholder="Recaudación (USD)">
```

Al crear la película en JS, se agrupan en un objeto:

```js
const nuevaPelicula = {
  // ... otros campos ...
  boxOffice: {
    budget: Number(document.getElementById("inputBudget").value),
    revenue: Number(document.getElementById("inputRevenue").value)
  }
};
```

| Input | ID | Propiedad en `boxOffice` |
|-------|----|--------------------------|
| Presupuesto | `inputBudget` | `budget` |
| Recaudación | `inputRevenue` | `revenue` |

Usar `Number()` para convertir el string del input a número antes de guardarlo.

---

## Input para `cast` (array)

`cast` es un array de strings. En el formulario usamos un solo `<input type="text">` donde el usuario escribe los nombres separados por coma:

```html
<input type="text" id="inputCast" placeholder="Reparto (separado por coma)">
```

En JS se convierte a array con `.split(",")` y `.map()` + `.trim()` para limpiar espacios:

```js
const input = document.getElementById("inputCast").value;
const cast = input.split(",").map(nombre => nombre.trim()).filter(nombre => nombre !== "");
```

| Paso | Código | Resultado |
|------|--------|-----------|
| String original | `"Leo, Joseph, Elliot"` | Un solo string |
| `.split(",")` | `["Leo", " Joseph", " Elliot"]` | Array con espacios |
| `.map(n => n.trim())` | `["Leo", "Joseph", "Elliot"]` | Array limpio |
| `.filter(n => n)` | `["Leo", "Joseph", "Elliot"]` | Elimina vacíos |

---

## Validación de inputs

Hay dos formas de validar que los campos no estén vacíos:

### 1. HTML `required` (automático)

```html
<input type="text" id="inputTitulo" required>
<input type="number" id="inputAnio" required>
```

| Ventaja | Desventaja |
|---------|------------|
| Sin código JS | Solo funciona dentro de un `<form>` con `<button type="submit">` |
| Mensaje nativo del browser | No controlas el mensaje ni el estilo |

### 2. Validación manual en JS (recomendado para este ejercicio)

```js
btnAgregar.addEventListener("click", () => {
  if (!inputTitulo.value.trim()) {
    alert("El título es obligatorio");
    return;
  }
  if (!inputAnio.value.trim()) {
    alert("El año es obligatorio");
    return;
  }
  // ... resto de campos ...
});
```

| Ventaja | Desventaja |
|---------|------------|
| Control total de mensajes | Un poco más de código |
| Validación por campo específico | — |
| Funciona sin `<form>` | — |

Usar `if (!input.value.trim())` detecta tanto vacío como solo espacios en blanco.

---

---

# 🐞 Debug Report — peliculas.js

## Resumen
El archivo `peliculas.js` contiene solo el array `catalogo` y comentarios con requisitos. **No hay código funcional implementado.** La aplicación no hace nada al cargarse.

---

## Bug #1 — Faltan referencias al DOM
**Archivo:** `peliculas.js:2`
**Severidad:** 🔴 Alta

El comentario dice `(completar: divLista, divFiltro, inputTitulo, inputGenero, inputAnio, btnAgregar, divBotones)` pero nunca se declaran. Sin `document.getElementById(...)` el JS no puede leer inputs ni actualizar los divs.

---

## Bug #2 — Sin event handler en "Agregar"
**Archivo:** `peliculas.js:31`
**Severidad:** 🔴 Alta

No hay `btnAgregar.addEventListener("click", ...)`. Hacer clic en el botón no ejecuta ninguna acción.

---

## Bug #3 — Sin delegación de eventos en filtros
**Archivo:** `peliculas.js:31`
**Severidad:** 🔴 Alta

No hay `divBotones.addEventListener("click", ...)`. Los botones de género no filtran nada.

---

## Bug #4 — Sin función de renderizado (`map()` + `join()`)
**Archivo:** `peliculas.js:31`
**Severidad:** 🔴 Alta

No existe ninguna función que recorra `catalogo` con `map()` y actualice `divLista.innerHTML`. La lista "Todas las películas" nunca se puebla.

---

## Bug #5 — Sin función de filtrado (`filter()` + `map()`)
**Archivo:** `peliculas.js:31`
**Severidad:** 🔴 Alta

No existe lógica que filtre `catalogo` con `filter()` y muestre resultados en `divFiltro`.

---

## Bug #6 — Sin validación de inputs
**Archivo:** `peliculas.js:31`
**Severidad:** 🟡 Media

Si se implementara el Agregar sin validación, se podrían agregar películas con campos vacíos. Falta `trim()` y chequeo de `!== ""`.

---

## Bug potencial #7 — Tipo string en año
**Archivo:** `peliculas.js` (cuando se implemente)
**Severidad:** 🟡 Media

`inputAnio.value` devuelve string (ej. `"2010"`). Si no se usa `Number()`, el campo `anio` será string en lugar de número (`push()` sin convertir tipos — ver `bugs.md` ERROR B).

---

## Bug potencial #8 — `map()` sin `join()`
**Archivo:** `peliculas.js` (cuando se implemente)
**Severidad:** 🟡 Media

Si se usa `map()` sin `join("<br>")`, los resultados se mostrarán separados por comas (ver `bugs.md` ERROR D).

---

## Bug potencial #9 — Arrow function con `{}` sin `return`
**Archivo:** `peliculas.js` (cuando se implemente)
**Severidad:** 🟡 Media

Usar `{}` en arrow function sin `return` explícito devuelve `undefined` (ver `bugs.md` ERROR E).

---

## Conclusión
**6 bugs críticos y 3 potenciales.** El código no tiene implementación. La solución requiere escribir ~30 líneas de JS para:
1. Obtener referencias del DOM con `document.getElementById()`
2. Agregar `click` event listener en `btnAgregar` con validación, `push()`, y render
3. Agregar event delegation en `divBotones` con `e.target.value`, `filter()`, `map()` y `join()`
4. Crear funciones `renderLista()` y `renderFiltro(genero)` para mostrar resultados

---

---

# 🐞 Bug Report — Validation in `peliculas.js` (current code)

## Code under review
```js
btnAgregar.addEventListener('click',()=>{
  let invalido = inputTitulo === "" ||  inputGenero === "" || inputDuracion <=0 || inputRating <=0 ||inputAnio <=0||inputBudget<=0||inputRevenue<=0||vistaYa === undefined||find(cast) ===null;
  if(invalido){
    alert(`Fill up the form ...`);
  }agregar();
});
```

---

## 🔴 Bug #1 — Comparing DOM elements, not `.value`

```js
inputTitulo === ""     // inputTitulo is an HTMLElement, never === ""
inputGenero === ""
```

`inputTitulo`, `inputGenero`, etc. are DOM element references (from `domRefs.js`). Comparing an element object to a string is always `false`.

✅ **Fix:**
```js
inputTitulo.value.trim() === ""
inputGenero.value === ""    // select .value is already a string
```

---

## 🔴 Bug #2 — `inputDuracion <= 0` compares HTMLElement with number

```js
inputDuracion <= 0   // HTMLElement → NaN → false (always passes)
inputRating   <= 0
inputAnio     <= 0
inputBudget   <= 0
inputRevenue  <= 0
```

An `HTMLElement` coerces to `NaN`, and `NaN <= 0` is `false`. So **invalid values are never caught**.

✅ **Fix:**
```js
Number(inputDuracion.value) <= 0
Number(inputRating.value)   <= 0
Number(inputAnio.value)     <= 0
Number(inputBudget.value)   <= 0
Number(inputRevenue.value)  <= 0
```

---

## 🔴 Bug #3 — `vistaYa === undefined` doesn't check radio selection

`vistaYa` is the first `<input id="vistaYa">` element (auto-global `window.vistaYa`), so it's never `undefined`. You need to check whether **any** radio is checked.

✅ **Fix:**
```js
!document.querySelector('input[name="vistaYa"]:checked')
// or:
![...vistaYaRadios].some(r => r.checked)
```

---

## 🔴 Bug #4 — `find(cast) === null` is invalid

`find` is not a standalone function — it's `Array.prototype.find`. `cast` is not defined either.

✅ **Fix:** Parse `inputCast.value` first, then check if empty:
```js
const castArr = inputCast.value.split(",").map(s => s.trim()).filter(Boolean);
// then check: castArr.length === 0
```

---

## 🔴 Bug #5 — `agregar()` runs even after failed validation

```js
if(invalido){
    alert(`Fill up the form ...`);
}agregar();
```

No `return` or `else` — after the alert `agregar()` still executes.

✅ **Fix:**
```js
if (invalido) {
    alert("Fill up the form ...");
    return;
}
agregar();
```

---

## 🟡 Bug #6 — `agregar()` is empty (`peliculas.js:15-17`)

```js
function agregar(){}
```

Needs implementation: read form values, create object with property names matching `catalogoData.js`, `push()`, clear inputs, render.

**Property mapping (HTML → `catalogo.js`):**

| Input ID | Property |
|----------|----------|
| `inputTitulo` | `title` |
| `inputGenero` | `genre` |
| `inputDuracion` | `duration` |
| `inputAnio` | `releaseYear` |
| `inputRating` | `rating` |
| `inputCast` | `cast` |
| `inputBudget` | `boxOffice.budget` |
| `inputRevenue` | `boxOffice.revenue` |
| `vistaYa` radio | `isWatched` |

---

## 🟡 Bug #7 — Genre value mismatch

HTML `<option value="accion">` but `catalogoData.js` uses `"Action"`. Filtering by genre won't match.

✅ Either change HTML `value` to match (`"Action"`, `"Comedy"`, `"Drama"`, `"Sci-Fi"`, `"Horror"`) or normalize in JS with `.toLowerCase()` on both sides.

---

---

> This line of code is actually an explanation followed by an incomplete snippet of JavaScript. It looks like a code comment and two squeezed-together expressions that deal with a critical concept in JavaScript web development called **Event Delegation**.

Let's unpack the code, fix the formatting, and look at exactly what "no guard" means.

---

## The Corrected Syntax

The snippet has a missing line break and a missing semicolon. If we separate it out properly, it looks like this:

```javascript
// No guard on event delegation
const g = e.target.value;
if (!e.target.value) return; // <-- This is actually the "guard"!

```

---

## 1. What is Event Delegation?

Instead of attaching an event listener to dozens of individual elements (like every single button, option, or input field in a dynamic list), you attach **one single event listener** to a parent element container (like a `<div>` or a `<form>`).

When an event happens inside that container, it bubbles up to the parent. The parent uses `e.target` to figure out exactly which child element was clicked or modified.

---

## 2. What is a "Guard" in Code?

A **guard clause** (or an early exit) is a line of code at the very beginning of a function or event handler that checks if certain conditions are met. If the conditions are *not* met, it stops the execution immediately (`return`) to prevent the code below it from running and throwing a crash error.

---

## 3. Explaining the Breakdown

Let's analyze the exact line step-by-step:

### Line 1: `const g = e.target.value;`

This extracts the current value of the element that triggered the event (for example, the text inside a text field, or the selection from a drop-down menu) and stores it in a variable named `g`.

### Line 2: `if (!e.target.value) return;`

This is the **Guard Clause**.

* The exclamation mark `!` stands for **NOT** (it checks if the value is falsy, meaning it is an empty string `""`, `undefined`, or `null`).
* **In plain English:** *"If the element that triggered this event has an empty value, stop right here and do absolutely nothing else. Exit the function immediately."*

---

## Why the Comment "No guard on event delegation" is Misleading

The comment says *"No guard on event delegation"*, but the line right underneath it is **literally a guard clause**!

However, it is a *weak* guard clause for event delegation. Here is why:
If a user clicks on the blank space *between* your input elements inside the main container, `e.target` will be the parent container itself, not an input box. The container won't have a `.value`, so `!e.target.value` evaluates to `true` and the function returns.

While that stops a crash, a much safer, professional "guard" for event delegation looks like this:

```javascript
// A proper guard for event delegation
// Exit immediately if the item clicked was NOT an input field
if (e.target.tagName !== 'INPUT') return; 

// Now it is safe to read the value!
const g = e.target.value;

```

---

---

You are so close to creating a fantastic, data-rich movie object! This structure perfectly matches all the attributes we talked about for practicing your array methods.

However, you have a small syntax slip inside the object literal declaration. Inside an object, you cannot use the assignment operator (`=`) to set values; you must use a **colon (`:`)**.

Using `=` inside an object literal will throw a `SyntaxError: Unexpected token '='`.

---

## The Corrected Object Syntax

Here is how you fix those last two lines so JavaScript can parse the object correctly:

```javascript
function agregar(){
  // Crear objeto pelicula
  const peliNueva = {
    title: inputTitulo.value.trim(),
    genre: inputGenero.value.trim(),
    duration: Number(inputDuracion.value),
    releaseYear: Number(inputAnio.value),
    rating: Number(inputRating.value),
    isWatch: vistaYa,
    cast: [], // <-- Changed '=' to ':'
    boxOffice: { // <-- Changed '=' to ':'
      budget: Number(inputBudget.value), 
      revenue: Number(inputRevenue.value)
    }
  };
  
  // Don't forget to push it to your movies array here!
  // peliculas.push(peliNueva);
}

```

---

## Next Step: How do you handle the `cast` string?

Right now, you are initializing `cast: []` as a completely empty array. If your user types a comma-separated list of actors into the input field (like `"Antonio Banderas, Tom Hanks"`), you can instantly transform that plain text string into a real JavaScript array using the **`.split()`** method.

Instead of leaving it empty, you can do this:

```javascript
cast: inputCast.value.split(",") // Splits the string at every comma into an array

```

If you do that, typing `"Antonio Banderas, Tom Hanks"` automatically becomes a clean array: `["Antonio Banderas", " Tom Hanks"]` directly inside your object.

Once you save this object to your main array, you'll be completely set up to start filtering and mapping your custom database!

---

---

You are experimenting with exactly the right tools! Using `.split(",")` is the perfect way to turn that comma-separated text string into a clean JavaScript array.

However, your `cast` line introduces a very common JavaScript trap involving how `.push()` behaves. Let's look at why this specific line will break your object, and how to write it cleanly.

---

## The `.push()` Trap

Look closely at this expression:

```javascript
cast: [].push(cast.value.trim().split(`,`))

```

There are two issues happening here:

1. **You still have the `=` sign:** Remember to change `=` to `:` for both `cast` and `boxOffice` so the object literal doesn't throw a syntax error.
2. **What `.push()` actually returns:** In JavaScript, the `.push()` method **does not return the new array**. Instead, it returns the *new length* of the array (a number like `1` or `2`).

If you use `[].push(...)` inside your object, your `cast` property will accidentally end up saving a number (like `1`), rather than the actual array of actors!

---

## The Clean Fix

Since `.split(",")` **already creates a brand-new array** out of your string, you don't need to create an empty array `[]` or use `.push()` at all! You can assign the split string directly to your property.

Here is the fully corrected, functional `agregar` function:

```javascript
function agregar(){
  // Crear objeto pelicula
  const peliNueva = {
    title: inputTitulo.value.trim(),
    genre: inputGenero.value.trim(),
    duration: Number(inputDuracion.value),
    releaseYear: Number(inputAnio.value),
    rating: Number(inputRating.value),
    isWatch: vistaYa,
    
    // .split(",") instantly creates the array: ["Antonio Banderas", "Tom Hanks"]
    cast: cast.value.trim().split(`,`), 
    
    boxOffice: {
      budget: Number(inputBudget.value), 
      revenue: Number(inputRevenue.value)
    }
  };

  // 1. Agregarlo a Catalogo (Assuming your array is named catalogo)
  catalogo.push(peliNueva);

  // 2. Visualizar
  console.table(catalogo);
  // renderCatalogo(); // Call your UI render function here!
}

```

---

## One Pro-Tip for Clean Data: `.map(a => a.trim())`

If a user types a space after the comma (like `"Antonio Banderas, Tom Hanks"`), `.split(",")` will keep that extra space, giving you `" Tom Hanks"`.

To make your array completely pristine, you can chain a small `.map()` right after your split to clean up any accidental spaces left behind by the user:

```javascript
cast: cast.value.trim().split(`,`).map(actor => actor.trim()),

```

Now your custom movie database is fully prepared to handle complex data entry!

---

---

Here is a brief summary table of the minor syntax traps and logical slips we caught and fixed over our last few iterations.

### Movie App Syntax & Logic Mistakes

| Code Section | What you wrote (The Slip) | The Correct Version | Why it needed fixing |
| --- | --- | --- | --- |
| **Object Declarations** | `cast = []`<br>`boxOffice = {}` | `cast: []`<br>`boxOffice: {}` | Inside an object literal, you must separate keys and values with a **colon (`:`)**, not an equals sign (`=`). |
| **Array `.push()` Output** | `cast: [].push(...)` | `cast: inputCast.value.split(',')` | `.push()` returns the *new length* of the array (a number like `1`), not the array itself. |
| **Form Guard Logic** | `invalido = campo !== ""` | `invalido = campo === ""` | For an `invalido` check, you want to flag fields that **are** empty, not fields that have data. |
| **Event Delegation Guard** | `length >= 0` | `length === 0` | The length of a string can never be negative, so `>= 0` is always true, locking up your form. |
| **Method Execution** | `peli.title.toLowerCase` | `peli.title.toLowerCase()` | `.toLowerCase` is a function. Without the parentheses `()`, JavaScript references the function formula instead of actually running it. |
| **Variable Scope** | Using `peli.titulo` inside an `alert()` outside `.find()` | Using `inputTitulo.value` inside the `alert()` | `peli` only exists as a temporary placeholder *inside* the `.find()` loop. It disappears once the loop finishes. |

---

Making these mistakes is one of the absolute best ways to learn JavaScript because you get to see exactly where the browser boundaries are. You caught them and cleaned them up perfectly!

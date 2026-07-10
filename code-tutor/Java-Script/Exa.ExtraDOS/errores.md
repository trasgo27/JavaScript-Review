Veo el problema. Tu `examen.js` solo hace `console.log(e)` con el objeto `Response`, pero no extrae el JSON ni lo muestra en el `<ul>`.

El archivo `libros.json` está bien — tiene 3 libros con `id`, `titulo`, `autor` y `genero`.

**Plan para implementar el Punto 1 (Carga de libros):**

1. En `examen.js`, cambia el `.then((e) => console.log(e))` por una cadena que:
   - Retorne `e.json()` para parsear la respuesta
   - En un segundo `.then()`, reciba el array de libros y los pinte en `<ul id="lista-libros">`

Código propuesto:

```js
document.addEventListener('DOMContentLoaded', () => {
    return fetch('libros.json')
        .then(resp => {
            if (!resp.ok) throw new Error(`Error HTTP: ${resp.status}`);
            return resp.json();
        })
        .then(libros => {
            const ul = document.getElementById('lista-libros');
            ul.innerHTML = libros.map(libro => `<li>${libro.titulo}</li>`).join('');
        })
        .catch(err => console.error('Error al cargar los libros:', err));
});
```

¿Quieres que implemente solo el Punto 1, o prefieres que avancemos con los demás puntos (filtro, cookies, temporizador, reinicio, promesa del autor) de una vez?

---

## Debug Report — `examen.js`

### #1 — Variable name with hyphen (SyntaxError)
**Línea 7:**
```js
const lista-libros = document.getElementById('lista-libros')
```
`lista-libros` se interpreta como `lista` **menos** `libros`. JavaScript no permite guiones en identificadores. Usa camelCase: `listaLibros`.

### #2 — `return` corta todo el flujo
**Línea 9:**
```js
return fetch('libros.json')
```
`return` hace que la función termine ahí. Todo el código de las líneas 10-18 es **muerto** (nunca se ejecuta).

### #3 — `resp` no está definido
**Línea 10:**
```js
if(!resp) throw new Error();
```
`resp` nunca fue declarada ni asignada. `fetch` devuelve una promesa, no la respuesta directamente.

### #4 — `.json()` sin `return`
**Línea 11:**
```js
else resp.json()
```
Falta `return`. La promesa se pierde y el siguiente `.then()` nunca recibe los datos.

### #5 — Arrow function con `let` sin llaves (SyntaxError)
**Líneas 12-14:**
```js
.then((e)=>
    let html2 = map((l)=>
        `<li>id:${l.id}, titulo:${l.titulo}, ...`
    )
)
```
- `let` en un cuerpo de flecha sin `{ }` no es válido
- `map(...)` no tiene array al que pertenezca (debería ser `libros.map(...)` o `e.map(...)`)

### #6 — `lista-lista` no existe
**Línea 18:**
```js
lista-lista.innerHTML = html2;
```
- `lista-lista` → mismo error de guión (SyntaxError)
- `html2` está declarado dentro del `.then()` y no es accesible aquí
- Esta línea es inalcanzable de todos modos por el `return`

### #7 — `.join(' ')` con espacio
**Línea 15:**
```js
).join(' ')
```
Usa espacio como separador, lo que inserta espacios entre `<li>`s. Debe ser `''`.

### Resumen visual

```
línea 7:  const lista-libros = ...   ❌ SyntaxError (guión)
línea 9:  return fetch(...)           ❌ corta todo lo demás
línea 10: if(!resp)                  ❌ resp no definida
línea 11: resp.json()                ❌ falta return
línea 12: .then((e)=> let html2 = .. ❌ SyntaxError (let sin llaves)
línea 15: map(...)                   ❌ map sin array
línea 17: .catch(...)                ⚠️ inalcanzable
línea 18: lista-lista.innerHTML      ❌ SyntaxError (guión) + inalcanzable
```

**Conclusión:** El código tiene errores de sintaxis que impiden ejecutarlo. La raíz del problema es intentar usar `return fetch()` como si `fetch` fuera síncrono.

---

## Debug Report #2 — `examen.js`

**Fixed since last report:**
- Line 7: `lista-libros` → `listaLibros` ✅ 

**Bugs still active:**

### #1 — `return` corta todo el flujo (Line 11)
```js
return fetch('libros.json')
```
`return` termina la función inmediatamente. Líneas 12-20 nunca se ejecutan.

### #2 — `resp` no está definida (Line 12)
```js
if(!resp.ok) throw new Error();
```
`resp` nunca se declaró. `fetch` devuelve una **promesa**, no la respuesta. Necesitas `.then(resp => ...)` o `const resp = await fetch(...)`.

### #3 — `.json()` sin `return` (Line 13)
```js
else resp.json()
```
Falta `return`, la promesa se pierde.

### #4 — Arrow function con asignación sin llaves (Lines 14-17)
```js
.then((e)=>
    html = map((l)=>
```
- `html = map(...)` dentro de una flecha sin `{ }` es SyntaxError
- `map(...)` sin array — debería ser `e.map(...)` si `e` es el array de libros

### #5 — `.join(' ')` con espacio (Line 17)
```js
).join(' ')
```
Pone espacios entre `<li>`s. Debe ser `''`.

### #6 — `html` vacío en Line 20
```js
listaLibros.innerHTML = html;
```
Si por algún milagro llegara aquí, `html` vale `""` (línea 9), no el string del `.then()`.

---

### Resumen visual

```
 7:  const listaLibros = ...    ✅ fixed
 8:  const libros = []          ⚠️ declarado pero nunca usado
11:  return fetch(...)          ❌ corta todo lo demás
12:  if(!resp.ok)               ❌ resp no definida + inalcanzable
14:  .then((e)=> html = map(..) ❌ SyntaxError + inalcanzable
17:  .join(' ')                 ⚠️ separador incorrecto
19:  .catch(...)                ⚠️ inalcanzable
 20:  listaLibros.innerHTML=html ❌ inalcanzable + html vacío
```

---

Hay algunos problemas de sintaxis y lógica en la promesa (`.then()`) que harán que el código falle o no renderice nada en la pantalla.

Aquí tienes los puntos clave a corregir:

1. **El operador ternario con `throw`**: No se puede poner un `throw` directamente dentro de un operador ternario de esa manera sin envolverlo en una función o usar un bloque normal `if/else`.
2. **El método `.map()`**: Lo estás llamando de forma global (`map(...)`) en lugar de encadenarlo al array que recibes del JSON (`e.map(...)`).
3. **Manejo de la asincronía**: Estás asignando `listaLibros.innerHTML = html` **fuera** de la cadena de promesas. Como `fetch` es asíncrono, esa línea se ejecutará antes de que los datos hayan llegado del archivo JSON, dejando la lista vacía.

Aquí tienes el código corregido y optimizado para que funcione correctamente:

```javascript
/*
1. Carga de libros desde JSON (1p)
Carga de forma asíncrona el archivo libros.json. Muestra los títulos de los libros al
cargar la página.
*/
//DOM
const listaLibros = document.getElementById('lista-libros');

document.addEventListener('DOMContentLoaded', () => {
    fetch('libros.json')
        .then((resp) => {
            if (!resp.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return resp.json();
        })
        .then((libros) => {
            // Recorremos el array y creamos el string con el HTML
            const html = libros.map((l) => {
                return `<li>id: ${l.id}, titulo: ${l.titulo}, autor: ${l.autor}, genero: ${l.genero}</li>`;
            }).join('');
            
            // Insertamos el HTML dentro del callback, cuando los datos ya existen
            listaLibros.innerHTML = html;
        })
        .catch((err) => console.error('Hubo un problema con la petición:', err));
});

```

### ¿Qué ha cambiado?

* **Estructura limpia del `fetch`**: Separamos la validación del `response.ok` y el retorno de `resp.json()`.
* **Asignación a la lista**: Ahora `listaLibros.innerHTML = html` está dentro del segundo `.then()`, asegurando que se ejecute únicamente cuando los libros ya se hayan procesado con éxito.

---

Para resolver esta segunda parte, necesitas extraer los géneros únicos del vector de libros que acabas de cargar y rellenar un elemento `<select>` en el DOM. Además, debes escuchar el evento `change` de ese desplegable para filtrar la lista.

Dado que necesitas acceder a los libros desde fuera del `fetch` para poder filtrarlos más tarde, el array `libros` global te vendrá perfecto. Solo hay un pequeño detalle a corregir en cómo guardas los datos en él.

Aquí tienes el código completo con la solución explicada paso a paso:

```javascript
/*
1. Carga de libros desde JSON (1p)
Carga de forma asíncrona el archivo libros.json. Muestra los títulos de los libros al
cargar la página.
*/
//DOM
const listaLibros = document.getElementById('lista-libros');
const selectGeneros = document.getElementById('select-generos'); // <-- Asegúrate de tener este ID en tu HTML
let libros = []; // Cambiado a let para poder asignarle el vector directamente

document.addEventListener('DOMContentLoaded', (e) => {
    fetch('libros.json')
        .then((resp) => {
            if (!resp.ok) {
                throw new Error('Error al cargar los datos');
            } else {
                return resp.json();
            }
        })
        .then((vector) => {
            // Guardamos los libros en la variable global para usarlos en el filtro
            libros = vector; 
            
            // Pintamos todos los libros al cargar la página
            pintarLibros(libros);
            
            // Inicializamos el filtro de géneros
            configurarFiltroGeneros(libros);
        })
        .catch((err) => {
            console.error(err);
        });
});

// Función auxiliar para pintar los libros en el DOM
function pintarLibros(lista) {
    const html = lista.map((libro) => `<li>id: ${libro.id}, titulo: ${libro.titulo}, autor: ${libro.autor}, genero: ${libro.genero}</li>`).join('');
    listaLibros.innerHTML = html;
}

/*
### 2. Filtro por género *(2 puntos)*
Muestra un desplegable con los géneros extraídos del JSON. Ten en cuenta que si hay algún género repetido solo se mostrará una vez en el `select`. Al cambiar el género seleccionado, muestra solo los libros de esa categoría.
*/
function configurarFiltroGeneros(vectorLibros) {
    // 1. Extraer los géneros y eliminar duplicados usando un Set
    const generosRepetidos = vectorLibros.map(libro => libro.genero);
    const generosUnicos = [...new Set(generosRepetidos)];

    // 2. Crear las opciones del select (añadiendo una opción inicial para "Todos")
    let opcionesHTML = `<option value="todos">Todos los géneros</option>`;
    opcionesHTML += generosUnicos.map(genero => `<option value="${genero}">${genero}</option>`).join('');
    selectGeneros.innerHTML = opcionesHTML;

    // 3. Escuchar el cambio de selección para filtrar
    selectGeneros.addEventListener('change', (e) => {
        const generoSeleccionado = e.target.value;

        if (generoSeleccionado === 'todos') {
            // Si eligen "Todos", mostramos el array completo
            pintarLibros(libros);
        } else {
            // Si eligen un género, filtramos el array global
            const librosFiltrados = libros.filter(libro => libro.genero === generoSeleccionado);
            pintarLibros(librosFiltrados);
        }
    });
}

```

---

### Puntos clave de la solución:

* **`new Set()`**: Es la forma más limpia y eficiente en JavaScript para eliminar duplicados de un array. Al pasarle el mapa de géneros, automáticamente descarta los repetidos. Con el operador spread (`[...]`) lo volvemos a transformar en un array normal.
* **Modularidad (`pintarLibros`)**: He extraído la lógica de renderizar los `<li>` a una función independiente. Así evitamos repetir código, ya que la necesitas llamar dos veces: al cargar la página por primera vez y cada vez que el usuario use el filtro.
* **Corrección en el almacenamiento**: En tu código tenías `libros.push([...vector])`. Eso introduce un array dentro de otro array creando una estructura bidimensional (`[[libro1, libro2...]]`). Cambiándolo a `libros = vector` mantienes la estructura plana ideal para trabajar.

---

## Debug Report

**Punto 1** ✅ — Fetch chain is correct, books load and render.

**Punto 2** ❌ — Three bugs:

### #1 — `map` accede a `.genero` en strings (Line 29-30)
```js
const html2 = generosArray.map((libro)=>
    `<option value=${libro.genero}>${libro.genero}</option>`).join('');
```
`generosArray` es `["Novela", "Fantasía"]` (strings), no objetos. `libro.genero` da `undefined`. Debe ser solo `libro` (el parámetro).

### #2 — `value` sin comillas (Line 30)
```js
value=${libro}
```
Si un género tiene espacios ("Ciencia Ficción"), el HTML se rompe. Debe ser `value="${libro}"`.

### #3 — Falta event listener `change` (after Line 32)
El `<select id="categoria">` se puebla, pero nadie escucha el cambio. Sin `addEventListener('change', ...)` el filtro no funciona.

---

### Summary

```
Line 29: .map((libro)=> libro.genero) ❌ strings no tienen .genero
Line 30: value=${...}                ❌ faltan comillas en value
Line 32: miCategoria.innerHTML = ... ✅ poblado
After 32: addEventListener('change')  ❌ no existe
```

---

## Debug Report

**New changes since last report:**
- `generosArray.map((genero)=>` ✅ — now uses the string, not `.genero`
- `addEventListener('change', ...)` ✅ — filter event listener added
- `pintar(filtro)` function extracted ✅ — reusable filter+render logic

**Bugs still active:**

### #1 — `value` sin comillas (Line 37)
```js
`<option value=${genero}>${genero}</option>`
```
Faltan comillas. Con "Fantasía" funciona por casualidad, pero con "Ciencia Ficción" el HTML se rompe.
→ Debe ser `` `value="${genero}"` ``

### #2 — Cookie: `max-life` no existe (Line 46)
```js
document.cookie = `genero=${filtro}; path=/; max-life=84600;`;
```
`max-life` no es una directiva de cookies válida. Debe ser `max-age`.
→ `max-age=84600`

---

### Summary status

| Punto | Status |
|-------|--------|
| 1. Carga JSON | ✅ |
| 2. Filtro género | ⚠️ (2 bugs above) |
| 3. Cookie | 🔴 (not working — `max-life` typo) |
| 4. Temporizador | ❌ not implemented |
| 5. Reiniciar | ❌ not implemented |
| 6. Promesa autor | ❌ not implemented |

---

Esa línea de código para recuperar la cookie está súper bien tirada y estructurada. Romper el string con `.split('; ')`, buscar con `.startsWith()` y luego extraer el valor con el segundo `.split('=')[1]` es la forma de libro de hacerlo en JavaScript vanilla sin librerías.

Sin embargo, hay un **pequeño peligro lógico** en la última línea: `listaLibros.innerHTML = pintar(guardado);`.

### El problema: ¿Qué le estás pasando a `pintar()`?

Si la cookie existe (por ejemplo, `genero=Novela`), `guardado` valdrá `"Novela"`. Pero si estás intentando reutilizar la función `pintar` que procesa los libros, vas a tener un conflicto de tipos:

1. Tu función de pintar (el `.map()` que tenías antes) espera recibir **un array de objetos** (los libros).
2. Al hacer `pintar(guardado)`, le estás pasando **un string** (el nombre del género, como `"Novela"`).

Si intentas hacer `.map()` sobre un string, el código se romperá. Además, si la cookie no existe, `guardado` será un string vacío (`""`), y terminarás pintando nada o rompiendo la pantalla.

---

### La Solución Correcta

Para que funcione al cargar la página usando tu cookie, debes **filtrar primero el array de libros** usando ese género guardado, y luego pasarle el resultado filtrado a la función de pintar.

Aquí tienes cómo integrarlo de forma segura dentro de tu flujo:

```javascript
// 1. Recuperamos el género de la cookie
const guardado = document.cookie
    .split('; ')
    .find(item => item.startsWith('genero=')) // .find es más eficiente aquí que .filter si solo buscas uno
    ?.split('=')[1] || ''; // Si no existe la cookie, guardado será un string vacío ''

console.log("Género recuperado de la cookie:", guardado);

// 2. Decidimos qué pintar en base a si había cookie o no
if (guardado && guardado !== 'todos') {
    // Si hay un género guardado, filtramos el array global de libros
    const librosFiltrados = libros.filter(libro => libro.genero === guardado);
    pintar(librosFiltrados);
    
    // Opcional: Si tienes el select, puedes hacer que se preseleccione visualmente
    selectGeneros.value = guardado;
} else {
    // Si no hay cookie (o es 'todos'), pintamos la lista completa
    pintar(libros);
}

```

> **Nota de optimización:** He cambiado tu `.filter(...).map(...).join('')` por un `.find(...)`. Como las cookies son una lista de elementos únicos, `.find()` se detiene en cuanto encuentra la coincidencia en lugar de seguir recorriendo todo el string, lo cual es ligeramente más eficiente. El operador `?.` (optional chaining) evita que el código falle si `.find()` devuelve `undefined`.

---

## Debug Report

### Fixed since last report
| Bug | Status |
|-----|--------|
| `value=${genero}` → `value="${genero}"` | ✅ |
| `max-life` → `max-age` | ✅ |
| Cookie reading logic | ✅ |

### Bugs still active

#### #1 — `pintar("")` returns empty list (Line 60)
```js
listaLibros.innerHTML = pintar(guardado);
```
If no cookie exists, `guardado = ""`, then `pintar("")` filters for `libro.genero === ""` → empty result. The list goes blank on first load.
→ Fix: default to `'todos'` if `guardado` is falsy.

#### #2 — `setTimeout` + `while(true)` locks the browser (Lines 49-58)
```js
const cronometro = setTimeout(() => {
    while(true){
        contador += 1;
        temporizador.innerText = contador;
    }
}, 100);
```
Two critical problems:
- `setTimeout` runs **once** after 100ms. Use `setInterval` instead.
- `while(true)` is an infinite loop → **freezes the tab forever**. The browser can never update the UI because the main thread is stuck.
→ Fix: `setInterval(() => { contador++; temporizador.innerText = contador; }, 100);`

#### #3 — `contador` and `temporizador` scoped inside `.then()` (Lines 46-47)
They're defined inside the callback, so the reset button (Punto 5) can't access them later. Should be hoisted outside `DOMContentLoaded`.

---

### Summary

| Punto | Status |
|-------|--------|
| 1. Carga JSON | ✅ |
| 2. Filtro género | ✅ |
| 3. Cookie | ⚠️ #1 bug (empty cookie = blank list) |
| 4. Temporizador | 🔴 #2 bug (freezes browser) |
| 5. Reiniciar | ❌ not implemented |
| 6. Promesa autor | ❌ not implemented |

---

## `setTimeout` vs `setInterval`

| | `setTimeout` | `setInterval` |
|---|---|---|
| **Runs** | Once after a delay | Repeatedly every interval |
| **Usage** | `setTimeout(fn, ms)` | `setInterval(fn, ms)` |
| **Stop** | `clearTimeout(id)` | `clearInterval(id)` |

```js
// setTimeout — runs ONCE after 1 second
setTimeout(() => console.log('one'), 1000);

// setInterval — runs EVERY second
setInterval(() => console.log('repeat'), 1000);
```

**`setTimeout`** waits `delay` milliseconds, runs the function **once**, and then stops. If you want it to repeat, you'd have to call another `setTimeout` inside the function (recursive setTimeout).

```js
// recursive setTimeout — runs repeatedly but waits for execution to finish first
setTimeout(function repeat() {
    console.log('fires again');
    setTimeout(repeat, 1000);
}, 1000);
```

`setInterval` is the simpler choice when you want something to keep firing at a fixed interval — which is exactly what your counter needs.

---

## Bug Report — `pintar()` no funciona en DOMContentLoaded tras implementar Reiniciar

### Síntoma

Al cargar la página, la lista de libros aparece **vacía** si no hay cookie guardada.

### Causa raíz

**Línea 48–51** — lectura de cookie:
```js
const guardado = document.cookie
  .split('; ')
  .find((item) => item.startsWith('genero='))
  ?.split('=')[1] || "";
```

Cuando **no existe cookie**, `guardado` queda como `""` (string vacío).

**Línea 59:**
```js
listaLibros.innerHTML = pintar(guardado);
```

Se llama a `pintar("")`. Dentro de `pintar(filtro)` (líneas 11–16):

```js
function pintar(filtro) {
  if (filtro == "todos")
    return libros.map(...).join("");
  return libros.filter((libro) => libro.genero === filtro).map(...).join("");
}
```

`"" !== "todos"` → cae en la rama `filter`: `libros.filter(l => l.genero === "")`. Ningún libro tiene género vacío → **resultado vacío** → la lista se ve en blanco.

### Por qué "no funciona como antes"

Antes de implementar Reiniciar, el `listaLibros.innerHTML = html` (línea 46) probablemente era el único render, mostrando todos los libros. La línea 59 (`pintar(guardado)`) se añadió o modificó al integrar cookies con el Reiniciar, y el caso `guardado = ""` no se manejó.

### Código muerto adicional

- **Línea 67:** `pintar('todos'); //No lo coge` — resultado no asignado al DOM.
- **Línea 76:** `pintar('todos');` — en el handler de Reiniciar, mismo problema.

### Solución

**Opción A (recomendada)** — Arreglar `pintar()` para que trate string vacío como `'todos'`:

```js
function pintar(filtro) {
  if (filtro == "todos" || !filtro)
    return libros.map((libro) => `<li>id: ${libro.id}, titulo: ${libro.titulo}, autor: ${libro.autor}, genero: ${libro.genero}</li>`).join("");
  return libros
    .filter((libro) => libro.genero === filtro)
    .map((libro) => `<li>id: ${libro.id}, titulo: ${libro.titulo}, autor: ${libro.autor}, genero: ${libro.genero}</li>`).join("");
}
```

**Opción B** — Arreglar solo el punto de llamada (línea 59):

```js
listaLibros.innerHTML = pintar(guardado || "todos");
```

### Arreglos adicionales necesarios

| Línea | Problema | Arreglo |
|-------|----------|---------|
| 67 | `pintar('todos')` sin asignar | `listaLibros.innerHTML = pintar('todos');` (o eliminar) |
| 76 | `pintar('todos')` sin asignar | `listaLibros.innerHTML = pintar('todos');` |
| — | `<select>` no se resetea en Reiniciar | `document.getElementById('categoria').value = 'todos';` |

---

## Punto 6 — Información del autor con promesa — Desglose

### Enunciado

> Al pasar por encima de un título muestra información del autor (no hace falta que esa información desaparezca después). Esta información se debe simular con una promesa.

### Pasos propuestos

**Paso 1 — Crear la función `obtenerAutor(libro)`**
- Que devuelva una `new Promise(resolve => ...)` que resuelva con `libro.autor` tras un pequeño retardo (ej. 300ms con `setTimeout`).

**Paso 2 — Modificar `pintar()` para incluir un contenedor del autor**
- Dentro de cada `<li>` que genera `pintar()`, añadir un `<span>` vacío con un id único (ej. `id="autor-${libro.id}"`) donde se inyectará el nombre del autor.

**Paso 3 — Añadir evento `mouseenter` a cada `<li>`**
- Tras pintar los libros, recorrer los `<li>` y añadir un listener `mouseenter` que llame a `obtenerAutor(libro)` y asigne el resultado al `textContent` del `<span>` correspondiente.

**Paso 4 — Evitar llamadas repetidas**
- Antes de lanzar la promesa, comprobar si el `<span>` ya tiene texto (`span.textContent`). Si ya tiene contenido, no hacer nada (el autor ya se cargó).

---

## Breakdown from another AI — Punto 6

### Step 1: Identify and Prepare the Targets (The DOM)

We need to know *where* the author info will appear. In your current HTML (inside `pintar()`), we just have one big list item:
`<li>id: ${libro.id}, titulo: ${libro.titulo}, autor: ${libro.autor}, genero: ${libro.genero}</li>`

* **Goal:** Create a specific "container" in your HTML where the author's name will be displayed temporarily. Give it an ID like `author-display` or something similar.
* **Refinement (Optional but helpful):** In `pintar()`, could you wrap just the *title* part (e.g., `<span class="libro-titulo">`) in its own `<span>`? This makes it easier to target precisely with your event listener later, rather than the entire `<li>`.

### Step 2: Write the Simulated Promise Function

You need to create a *pure* JavaScript function (let's call it `fetchAuthor`) that mimics fetching data. It shouldn't depend on DOM elements directly.

* **Goal:** This function should:
1. Accept the book's *title* (or another identifier) as an argument.
2. Return a `new Promise`.
3. Inside the Promise, use `setTimeout` (like your `cronometrar` function) to create a artificial delay (e.g., 500ms).
4. After the delay, `resolve()` the Promise with the author's name (which you can look up in your existing `libros` array based on the provided title). If the book isn't found, you could `reject()` it.

### Step 3: Set Up the Event Listener

Now, decide where to attach the listener and what event to listen for.

* **Target:** Where will the user hover?
* *Option A:* On the main `listaLibros` (simpler, but you must use event delegation).
* *Option B:* On each *title* `<span>` (more precise, but you must attach listeners dynamically).

* **Event:** Use `mouseover` or `mouseenter`.
* **Action (Inside the listener):**
1. Get the title of the book the user is hovering over.
2. Clear the `author-display` container (Step 1) just in case.

### Step 4: Combine and Consume the Promise

Finally, execute the promise chain.

* **Inside the listener (Step 3, continuation):**
1. Call your `fetchAuthor` function (Step 2), passing the current book title.
2. Use `.then()` to handle the successfully fetched author name. Inside `.then()`:
* Update the `innerHTML` or `innerText` of your `author-display` container (Step 1) with the author's name.

3. (Highly recommended) Use `.catch()` to handle any potential errors (e.g., if `reject()` was called).

---

## Comparación de enfoques — Punto 6

| Aspecto | Mi enfoque | Gemini |
|---------|------------|--------|
| **Función promesa** | `obtenerAutor(libro)` — recibe el objeto libro entero, resuelve con `libro.autor` | `fetchAuthor(title)` — recibe solo el título, busca el autor dentro de la promesa |
| **Contenedor DOM** | Un `<span>` por libro con id único (`autor-${libro.id}`) | Un contenedor compartido `author-display` (único para todos) |
| **Evento** | `mouseenter` en cada `<li>` individualmente | Dos opciones: delegación en `listaLibros` o en cada `<span>` título |
| **Evitar repetir** | ✅ Guard clause: comprobar `span.textContent` antes de llamar | ❌ Solo "limpiar el contenedor" — no evita llamadas duplicadas |
| **Error handling** | ❌ No menciona `.catch()` | ✅ Recomienda `.catch()` explícitamente |

### Mi enfoque — Pros ✅
- **Más directo para un principiante:** pasar el objeto `libro` entero es más natural que buscar por título dentro de la promesa
- **Un `<span>` por libro:** cada libro tiene su propio espacio, el autor permanece visible aunque pases por encima de otro (mejor UX)
- **Guard clause:** te enseña una optimización práctica desde el principio
- **Menos conceptos nuevos:** no mezcla delegación de eventos, búsqueda en arrays, etc.

### Mi enfoque — Contras ❌
- **Listeners individuales:** menos eficiente (muchos listeners vs. uno con delegación)
- **No enseña `.catch()`:** el manejo de errores es importante aunque aquí sea simple

### Gemini — Pros ✅
- **`fetchAuthor(title)`:** te fuerza a buscar en el array, practicas `find()` o `filter()`
- **Delegación de eventos:** patrón importante que verás en proyectos reales
- **`.catch()` explícito:** buena práctica desde el principio
- **Limpia el contenedor:** evita información mezclada al pasar rápido

### Gemini — Contras ❌
- **Contenedor único:** si pasas por encima de otro libro, el autor anterior se borra. Pierdes la info inmediatamente (peor UX aunque el enunciado dice "no hace falta que desaparezca")
- **Buscar dentro de la promesa:** es redundante — si ya tienes el objeto libro en el evento, no necesitas buscarlo otra vez
- **Más complejo:** mezcla delegación + búsqueda + error handling en un solo paso

### Recomendación para alguien que está aprendiendo

Empieza con **mi enfoque** (más simple, visual, cada libro mantiene su autor). Cuando lo tengas funcionando, como ejercicio extra puedes refactorizarlo al enfoque de Gemini para aprender delegación de eventos y arrays. Así cubres ambos estilos sin saturarte.

---

## Big Pickle Proposal for Punto 6

**Paso 1** — Crear `obtenerAutor(libro)`
- Recibe el objeto libro, devuelve una Promise que resuelve con `libro.autor` tras 300ms (setTimeout).

**Paso 2** — Modificar `pintar()`
- Dentro de cada `<li>`, añadir `<span id="autor-${libro.id}"></span>` vacío para que el autor aparezca ahí.

**Paso 3** — Añadir `mouseenter` a cada `<li>`
- Después de pintar (o al generar los `<li>`), asignar un evento `mouseenter` que llame a `obtenerAutor(libro)` y meta el resultado en el `<span>` correspondiente.

**Paso 4** — Evitar repetir llamadas
- Dentro del evento, comprobar si `span.textContent` ya tiene contenido; si sí, no hacer nada.

---

append this That final approach (`id="autor-${libro.id}"`) is exactly right!

The reason you got an error before is that the dollar-sign curly braces (`${}`) **only work inside backticks (```)**. If you try to use them inside regular double quotes (`" "`) or single quotes (`' '`) without backticks wrapped around the outside, JavaScript treats them as plain, literal text characters instead of executing code.

Since your whole HTML string is already wrapped in backticks, putting double quotes inside it for the HTML attribute is completely valid:

``... <span id="autor-${libro.id}"></span> ...``

---

## 💻 Technical Vocabulary

| Term | Meaning | Example Context |
| --- | --- | --- |
| **String Interpolation** | The process of evaluating a string literal containing one or more placeholders, yielding a result where the placeholders are replaced with their corresponding values. | *The `${id}` syntax is used for **string interpolation** inside backticks.* |
| **Nesting** | Placing an element, string, or code structure inside another structure of the same or a similar type. | *You are **nesting** double quotes inside a template literal string.* |
| **Plain Text / Literal Text** | Text that is treated exactly as it is written, without being evaluated as dynamic code or logic. | *Inside normal double quotes, `${id}` is treated as **plain text**.* |

---

## 🗣️ Regular Vocabulary & Common Mistakes

### Useful English Phrases

* **To yield:** To produce or provide a natural result.
> *Using backticks allows the expression to **yield** the dynamic ID number.*


* **To interpret:** To understand or decode something in a specific way.
> *Without backticks, JavaScript will **interpret** the dollar sign as a literal character.*



### Code Missteps Explained

* **The Mistake:** Expecting `${}` to evaluate inside standard quotes like `"id="autor-${id}""`.
* **The Correction:** Remember that backticks must always act as the outer "wrapper" for string interpolation to function. Your final approach correctly leaves the double quotes to the HTML parser while letting JavaScript handle the backticks.

---

This is excellent progress! You have successfully added the `<span class="autor"></span>` to your HTML string, which is exactly where the fetched author will eventually appear.

However, there is one crucial missing piece: **How will the event listener know *which* book is being hovered over?**

Right now, when the user hovers over an `<li>`, the event listener fires, but it has no way of knowing if it's hovering over book ID 1, ID 2, or ID 3. We need to give each `<li>` a unique identifier.

### The Solution: Data Attributes

We can add a **data attribute** (specifically `data-id`) to each `<li>`. This allows us to store the book's ID directly in the HTML, making it incredibly easy for JavaScript to read later.

Here is how we can update your `pintar` function. I also took the liberty of refactoring it slightly to follow the **DRY principle** (Don't Repeat Yourself), so you don't have to write the `.map().join('')` logic twice!

```javascript
function pintar(filtro) {
    // 1. Filter the books first (DRY principle)
    let librosAMostrar = libros;
    if (filtro && filtro !== 'todos') {
        librosAMostrar = libros.filter(libro => libro.genero === filtro);
    }

    // 2. Map through the filtered books to create the HTML string
    return librosAMostrar.map((libro) => {
        // Add data-id="${libro.id}" to the <li>!
        return `<li data-id="${libro.id}">
                    id: ${libro.id}, 
                    titulo: ${libro.titulo}, 
                    autor: ${libro.autor}, 
                    genero: ${libro.genero} 
                    <span class="autor"></span>
                </li>`;
    }).join('');
}
```

---

### Paso 3 & 4: The Event Listener and Optimization

Since your `pintar` function returns a string, you are likely inserting it into the DOM somewhere like this: `document.getElementById('listaLibros').innerHTML = pintar(filtro);`.

Because the `<li>` elements are created dynamically, we need to attach the `mouseenter` event listener *after* the HTML is inserted.

Here is the complete code to handle the hover event, find the correct book, call your Promise, and implement your **Paso 4 optimization** (avoiding repeated calls).

```javascript
// Assuming you call this function after updating the innerHTML
function agregarEventosHover() {
    const lista = document.getElementById('listaLibros');
    const lis = lista.querySelectorAll('li');

    lis.forEach(li => {
        li.addEventListener('mouseenter', () => {
            // 1. Get the ID from the data-id attribute using the dataset property
            const libroId = li.dataset.id;

            // 2. Find the corresponding book object in our array
            const libro = libros.find(l => l.id == libroId);

            // 3. Find the specific <span> inside this <li> (DOM Traversal)
            const spanAutor = li.querySelector('.autor');

            // PASO 4: Optimization - Check if the span already has text
            if (spanAutor.textContent) {
                return; // Exit early! Do not make the API call again.
            }

            // Optional: Show a loading state while the Promise resolves
            spanAutor.textContent = 'Cargando...';

            // PASO 3: Call the Promise function and handle the result
            obtenerAutor(libro)
                .then(autor => {
                    spanAutor.textContent = autor; // Success!
                })
                .catch(error => {
                    // If rejected (e.g., author is 'anonimo'), show the error
                    spanAutor.textContent = error.message;
                });
        });
    });
}
```

### Key English Terminology Used:
*   **Data attribute**: Custom attributes in HTML that start with `data-` (e.g., `data-id`). They are used to store extra information on the element.
*   **Dataset**: The JavaScript property used to read data attributes. `li.dataset.id` reads the value of `data-id`.
*   **DRY (Don't Repeat Yourself)**: A core programming principle aimed at reducing repetition of code.
*   **DOM Traversal**: Moving through the HTML tree to find specific elements (e.g., using `li.querySelector('.autor')` to find the span *only* inside the hovered `<li>`).
*   **Early return**: Using `return;` inside an `if` statement to exit a function immediately, preventing the rest of the code from running.

### How to tie it all together:
Whenever you filter or paint the list, make sure you call `agregarEventosHover()` right after updating the HTML:

```javascript
const lista = document.getElementById('listaLibros');
lista.innerHTML = pintar('todos'); // or whatever filter
agregarEventosHover(); // Attach the listeners to the new <li>s
```

---

It is completely normal to be confused by this! This is actually one of the biggest "aha!" moments when learning JavaScript.

To understand `agregarEventosHover()`, we first need to understand **why** it exists and **when** it runs.

### The Big Picture: The "Chalkboard" Analogy

Imagine you are a teacher.
1. **`pintar()`** is you writing a list of student names on the chalkboard. It is just chalk on a board (a **String** of text).
2. **`innerHTML = pintar()`** is the moment the students actually walk into the classroom and sit at their desks. The browser turns your text into **Real HTML Elements** (the **DOM**).
3. **`agregarEventosHover()`** is you walking up to each student's desk and handing them a specific instruction card (e.g., *"When I tap your desk, raise your hand"*).

**The crucial rule:** You *cannot* hand out the instruction cards while the students are just names on the chalkboard. You have to wait until they are physically in the room (in the DOM) before you can interact with them.

Because `pintar()` only returns a string, we have to wait until *after* that string is injected into the HTML before we can attach the "hover" events. That is exactly what `agregarEventosHover()` does.

---

### Line-by-Line Translation

Let's translate the code into plain English so you can see exactly what it's doing.

```javascript
function agregarEventosHover() {
    // 1. "Teacher, find the classroom."
    const lista = document.getElementById('listaLibros');

    // 2. "Find every single student (every <li>) sitting in that classroom."
    const lis = lista.querySelectorAll('li');

    // 3. "Walk up to each student's desk one by one."
    lis.forEach(li => {

        // 4. "Hand them this instruction card:"
        li.addEventListener('mouseenter', () => {

            // --- WHAT HAPPENS WHEN THE MOUSE HOVERS (THE INSTRUCTION CARD) ---

            // A. "Look at the ID badge on your desk. What is your book ID?"
            const libroId = li.dataset.id;

            // B. "Go to the teacher's filing cabinet (the `libros` array) and find my full file."
            const libro = libros.find(l => l.id == libroId);

            // C. "Look at your desk and find the specific blank piece of paper (the <span>)."
            const spanAutor = li.querySelector('.autor');

            // D. "Wait! Look at the paper. Is there already writing on it? (Paso 4 Optimization)"
            if (spanAutor.textContent) {
                return; // "If yes, do nothing. Stop here."
            }

            // E. "Okay, the paper is blank. Make a phone call to get the author's name (The Promise)."
            // "When they answer (.then), write their name on the paper."
            // "If they don't answer (.catch), write the error message on the paper."
            obtenerAutor(libro)
                .then(autor => {
                    spanAutor.textContent = autor;
                })
                .catch(error => {
                    spanAutor.textContent = error.message;
                });
        });
    });
}
```

### Why do we need `libros.find()` inside the hover?

You might be wondering: *"I already have the `libro` object when I am inside `pintar()`. Why do I have to find it again?"*

Because `pintar()` only creates **HTML text**. HTML doesn't know what a JavaScript object is. When the user hovers over the screen, the browser only knows: *"The mouse is currently touching an `<li>` element."*

The browser doesn't automatically know *which* JavaScript object corresponds to that `<li>`. We had to "hide" the ID inside the HTML using `data-id="${libro.id}"` so that when the hover happens, we can read the ID, go back to our JavaScript array (`libros.find`), and get the full object again.
```

---

Excellent question! You're thinking like a programmer now - questioning whether we're doing things the most efficient way.

The short answer is: **No, you don't HAVE to use data attributes.** There are other ways to access the `libro` object when the hover happens.

Let me explain why we used data attributes and show you the alternatives.

---

## Why We Used Data Attributes (The Problem)

When you're inside `pintar()`, you have the `libro` object:

```javascript
libros.forEach(libro => {
    // Here you have access to the full libro object
    console.log(libro.titulo); // ✅ Works!
});
```

But `pintar()` returns a **STRING** of HTML. Once that string is inserted into the page with `innerHTML`, it becomes DOM elements. The browser doesn't remember your JavaScript objects - it only knows HTML.

Later, when the user hovers:

```javascript
li.addEventListener('mouseenter', () => {
    // Here, you only have the DOM element (li)
    // You DON'T have the libro object anymore!
    console.log(libro.titulo); // ❌ Error: libro is not defined
});
```

So we need a way to "connect" the DOM element back to the JavaScript object. Data attributes are one way to do this.

---

## Alternative 1: Store the Object Directly on the Element

Instead of storing just the ID in a data attribute, you can attach the entire `libro` object directly to the DOM element as a property.

```javascript
function pintar() {
    const lista = document.getElementById('listaLibros');
    lista.innerHTML = '';
    
    libros.forEach(libro => {
        const li = document.createElement('li');
        li.innerHTML = `
            id: ${libro.id}, 
            titulo: ${libro.titulo}, 
            autor: ${libro.autor}, 
            genero: ${libro.genero} 
            <span class="autor"></span>
        `;
        
        // Store the entire libro object on the li element
        li.libro = libro; // ← This is the key!
        
        lista.appendChild(li);
    });
}

function agregarEventosHover() {
    const lis = document.querySelectorAll('li');
    
    lis.forEach(li => {
        li.addEventListener('mouseenter', () => {
            // Access the libro object directly!
            const libro = li.libro; // ← No need for find()!
            
            const spanAutor = li.querySelector('.autor');
            
            if (spanAutor.textContent) {
                return;
            }
            
            obtenerAutor(libro)
                .then(autor => {
                    spanAutor.textContent = autor;
                })
                .catch(error => {
                    spanAutor.textContent = error.message;
                });
        });
    });
}
```

**Pros:**
- ✅ Simpler - no need for `libros.find()`
- ✅ Faster - no searching through the array
- ✅ You have access to the entire object

**Cons:**
- ❌ Not visible in the HTML (can't debug by looking at the HTML)
- ❌ Not standard HTML5 (but it works perfectly)

---

## Alternative 2: Attach Event Listener While You Have the Object

Instead of returning a string from `pintar()`, create the DOM elements and attach the event listener immediately while you still have the `libro` object.

```javascript
function pintar() {
    const lista = document.getElementById('listaLibros');
    lista.innerHTML = '';
    
    libros.forEach(libro => {
        const li = document.createElement('li');
        li.innerHTML = `
            id: ${libro.id}, 
            titulo: ${libro.titulo}, 
            autor: ${libro.autor}, 
            genero: ${libro.genero} 
            <span class="autor"></span>
        `;
        
        // Attach the event listener RIGHT HERE, while we have `libro`
        li.addEventListener('mouseenter', () => {
            const spanAutor = li.querySelector('.autor');
            
            if (spanAutor.textContent) {
                return;
            }
            
            // We still have access to `libro` thanks to closure!
            obtenerAutor(libro)
                .then(autor => {
                    spanAutor.textContent = autor;
                })
                .catch(error => {
                    spanAutor.textContent = error.message;
                });
        });
        
        lista.appendChild(li);
    });
}

// No need for agregarEventosHover() anymore!
```

**Pros:**
- ✅ Cleanest solution - no data attributes needed
- ✅ Event listener is attached immediately
- ✅ Uses closure to keep access to `libro`

**Cons:**
- ❌ Changes your `pintar()` function structure (no longer returns a string)

---

## So Which Should You Use?

| Approach | When to Use |
|----------|-------------|
| **Data attributes** | When you want standard HTML5, or when you need the data to be visible in the HTML for debugging |
| **Store object on element** | When you want simplicity and don't care about HTML visibility |
| **Attach immediately** | When you want the cleanest code and are okay with changing `pintar()` |

---

## My Recommendation

If you want to keep your current `pintar()` function that returns a string, **use data attributes** (your current approach) or **Alternative 1** (store the object on the element).

If you're willing to refactor `pintar()`, **Alternative 2** is the cleanest.

Which approach would you like to try? 
```

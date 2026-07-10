## Debug Report — Punto 4: Temporizador

### Código actual (líneas 8-13)

```js
function iniciarTemporizador(){
  intervalo = setInterval(()=>{
    contador ++;
    span.textContent = contador;
    },100)
}
```

### Bug encontrado

| # | Línea | Problema | Gravedad |
|---|-------|----------|----------|
| **B31** | 11 | `span` no está definido en ningún lado. `span.textContent = contador;` lanza **`ReferenceError: span is not defined`** — el temporizador nunca arranca. | 🔴 Bloqueante |

### Causa

Falta obtener la referencia al elemento del DOM dentro de la función:
```js
const span = document.getElementById('temporizador');
```

### Edge cases

| Escenario | Comportamiento actual |
|-----------|----------------------|
| Sin cookie | ❌ `ReferenceError` — todo se rompe antes de `dibujar()` |
| Al hacer clic en Reiniciar | ❌ Mismo error al llamar `iniciarTemporizador()` |

### Corrección necesaria (1 línea)

```js
function iniciarTemporizador(){
  const span = document.getElementById('temporizador');  // ← falta esta línea
  intervalo = setInterval(()=>{
    contador ++;
    span.textContent = contador;
  }, 100);
}
```

### Contexto extra — integraciones que sí están correctas

- `clearInterval(intervalo)` en Reiniciar (línea 81) ✅
- `contador = 0` y `textContent = '0'` en Reiniciar (líneas 82-83) ✅
- Llamada a `iniciarTemporizador()` al cargar (línea 72) y en Reiniciar (línea 86) ✅

Solo falta esa línea — el resto del punto 4 está bien estructurado.

---

This is a beautiful, clean block of code! It looks like you refactored your cookie logic into a separate function called `leerCookie()`, which is a great practice. 

This specific block of code is responsible for **initializing the app's state when the page loads**. It makes sure that the dropdown menu and the list of books are perfectly synchronized with the user's previous choice.

Here is the line-by-line breakdown of exactly what is happening:

### Line 1: `const generoGuardado = leerCookie();`
* **What it does:** It calls your custom function `leerCookie()` (which presumably reads `document.cookie`, finds the "genero" cookie, and returns its value).
* **The Result:** `generoGuardado` will now hold a string like `"fantasia"` or `"terror"`. If the user has never visited the site before (or the cookie expired), it will return a "falsy" value like `null`, `undefined`, or an empty string `""`.

### Line 2: `select.value = generoGuardado || 'todos';`
* **What it does:** It sets the visual selection of your `<select>` dropdown menu.
* **The Magic (`||` operator):** This uses the **Logical OR (`||`)** operator to provide a **fallback (or default) value**. JavaScript evaluates the left side first. If it is "truthy" (has a real value), it uses it. If it is "falsy" (empty/null), it moves to the right side.
  * **Scenario A (Cookie exists):** If `generoGuardado` is `"terror"`, the code evaluates `"terror" || 'todos'`. Since `"terror"` is true, it assigns `"terror"` to `select.value`. The dropdown visually shows "Terror".
  * **Scenario B (No cookie):** If `generoGuardado` is `null`, the code evaluates `null || 'todos'`. Since `null` is false, it falls back and assigns `'todos'` to `select.value`. The dropdown visually shows "Todos".

### Line 3: `dibujar(select.value);`
* **What it does:** It calls your `dibujar()` function to paint the list of books on the screen.
* **Why use `select.value` instead of `generoGuardado`?** This is a brilliant move! By passing `select.value`, you guarantee that the list of books being drawn is **exactly** what the dropdown is currently showing. 
  * If there was a cookie, `select.value` is `"terror"`, so it draws horror books.
  * If there was no cookie, `select.value` is `"todos"`, so it draws all books.

---

### Why this order is perfect:
1. **Get the data** (Line 1)
2. **Update the UI (Dropdown)** to reflect that data, with a safe backup plan (Line 2)
3. **Update the UI (Book List)** to match the Dropdown exactly (Line 3)

This completely eliminates the need for complex `if/else` statements to check if the cookie exists. The `||` operator handles the logic for you in one elegant line! 

Did you write the `leerCookie()` function yourself? If you want, you can paste it here and I can review it to make sure it handles edge cases perfectly!

---

Yes, exactly! **`select.value` is 100% interacting with the DOM.**

Let's break down exactly what those two words mean and how they connect your JavaScript to the HTML on the screen.

### 1. What is `select`?
`select` is **not** a special JavaScript keyword. It is simply a variable name that holds a reference to a DOM element. 

Somewhere in your code (probably right before that block), you likely have a line like this:
```javascript
const select = document.getElementById('categoria');
```
Here, the browser reaches into the DOM, finds the `<select id="categoria">` element in your HTML, and saves it in the JavaScript variable named `select`. 

*(Note: You could have named this variable `dropdown`, `menu`, or `miSelect`, but `select` is a very common and descriptive name for it!)*

### 2. What is `.value`?
`.value` is a **built-in DOM property** that belongs to all form elements (like `<input>`, `<textarea>`, and `<select>`). 

It acts as a two-way bridge between your JavaScript and the HTML:

#### A. Reading from the DOM (Getting)
When you read it, it tells you what the user currently has selected in the dropdown.
```javascript
// If the user selected "Fantasía" in the dropdown:
const eleccion = select.value; 
// eleccion is now "fantasia" (because that's what the 'value' attribute of that <option> is)
```

#### B. Writing to the DOM (Setting)
When you assign a value to it (like in your code: `select.value = generoGuardado`), you are **commanding the DOM to update the visual HTML**.
```javascript
// JavaScript command:
select.value = 'terror';
```
**What the browser does:** 
1. It looks at all the `<option>` tags inside that `<select>`.
2. It finds the one that has `value="terror"`.
3. It visually highlights that option in the dropdown menu on the screen.

---

### See it in action

Imagine your HTML looks like this:
```html
<select id="categoria">
    <option value="todos">Todos los libros</option>
    <option value="fantasia">Fantasía</option>
    <option value="terror">Terror</option>
</select>
```

And your JavaScript does this:
```javascript
const select = document.getElementById('categoria'); // Grabs the DOM element
console.log(select.value); // Reads the DOM -> logs "todos" (because it's the first one by default)

select.value = 'fantasia'; // WRITES to the DOM!
```

The moment you run `select.value = 'fantasia';`, if you look at your screen, the dropdown menu will instantly change to show "Fantasía" as the selected option. 

### Summary
* **`select`** = The JavaScript variable holding the HTML `<select>` element.
* **`.value`** = The DOM property that reads or changes the currently selected option.
* **`select.value = 'todos'`** = JavaScript telling the DOM, "Make sure the 'todos' option is visually selected on the screen."

Welcome back! That's a really elegant piece of code. Let me break it down for you.

This is using a **ternary operator** (`condition ? trueResult : falseResult`) combined with a **logical AND** (`&&`) to decide which books to show.

---

## Line-by-Line Breakdown

### Line 1: `const filtrados = genero && genero !== 'todos'`

This is the **condition** that determines which path to take. It has two parts connected by `&&` (AND):

1. **`genero`** — This checks if `genero` has a value (is "truthy"). If `genero` is `null`, `undefined`, or an empty string `""`, this part is `false`.
2. **`genero !== 'todos'`** — This checks if the genre is NOT the string "todos".

**Both must be true** for the whole condition to be true. This prevents errors when `genero` is empty/null, and also handles the "show all" case.

### Line 2: `? libros.filter(l => l.genero.toLowerCase() === genero)`

This is the **true branch** (what happens if the condition is true).

- **`.filter()`** creates a new array with only the books that match the condition.
- **`l => l.genero.toLowerCase() === genero`** — For each book `l`, it checks if the book's genre (converted to lowercase) matches the `genero` variable.
- **Result:** A new array containing only the books of that specific genre.

### Line 3: `: libros;`

This is the **false branch** (what happens if the condition is false).

- **Result:** The entire `libros` array (no filtering, show everything).

---

## The Logic in Plain English

"If `genero` exists AND it's not 'todos', then filter the books by that genre. Otherwise, just give me all the books."

---

## Equivalent with `if/else`

To make it crystal clear, here's the exact same logic written with a traditional `if/else`:

```javascript
let filtrados;

if (genero && genero !== 'todos') {
    // Condition is true: filter the books
    filtrados = libros.filter(l => l.genero.toLowerCase() === genero);
} else {
    // Condition is false: use all books
    filtrados = libros;
}
```

The ternary version is just a more concise way to write this!

---

## Why This is Smart

1. **Prevents errors:** If `genero` is `null` or `undefined`, the `&&` operator stops evaluating immediately (short-circuit) and returns `false`, avoiding the error of calling `.toLowerCase()` on `null`.
2. **Handles "all" case:** By checking `!== 'todos'`, it treats "todos" as "show everything" rather than trying to filter by a genre literally called "todos".
3. **Clean and readable:** Once you get used to ternary operators, this is much faster to read than an `if/else` block.

---

## Example Scenarios

| `genero` value | Condition result | `filtrados` becomes |
|----------------|------------------|---------------------|
| `null` | `false` (short-circuit) | All books |
| `""` (empty) | `false` (short-circuit) | All books |
| `"todos"` | `false` (second check fails) | All books |
| `"fantasia"` | `true` | Only fantasy books |
| `"terror"` | `true` | Only horror books |

Does this make sense? Let me know if you want me to clarify any part!    at segundoErrores.md  Don't do anything else

Perfect! This is a beautifully refactored version of your `dibujar()` function. You've integrated everything we discussed, plus you've added **async/await** which is a modern alternative to `.then()/.catch()`. Let me break it down.

---

## Line-by-Line Breakdown

### Line 1: `marcador.innerHTML = "";`
**What it does:** Clears the entire list before redrawing.
**Why:** When you filter or change genres, you need to remove the old books before adding the new ones. Otherwise, you'd end up with duplicates.

---

### Lines 2-4: The Filtering Logic
```javascript
const filtrados = genero && genero !== 'todos'
  ? libros.filter(l => l.genero.toLowerCase() === genero)
  : libros;
```
**What it does:** This is the ternary operator we just discussed. It creates a `filtrados` array that either contains all books or just the filtered ones.
**Result:** `filtrados` is now the array we'll actually display.

---

### Line 5: `filtrados.forEach((libro, ind) => {`
**What it does:** Loops through each book in the filtered array.
**Parameters:**
- `libro` = The current book object
- `ind` = The index (0, 1, 2, 3...) used for numbering

---

### Line 6: `const li = document.createElement('li');`
**What it does:** Creates a new empty `<li>` element in memory (not yet in the DOM).

---

### Line 7: `li.dataset.id = libro.id;`
**What it does:** Adds a `data-id` attribute to the `<li>` element.
**Result in HTML:** `<li data-id="1">`
**Why:** This stores the book's ID directly in the HTML, making it easy to access later if needed.

---

### Line 8: `li.innerHTML = ...`
```javascript
li.innerHTML = `${ind + 1}.- ${libro.titulo} <span id="autor-${libro.id}"></span>`;
```
**What it does:** Sets the content of the `<li>`.
**Breakdown:**
- `${ind + 1}` = Shows the number (1, 2, 3... instead of 0, 1, 2...)
- `${libro.titulo}` = The book's title
- `<span id="autor-${libro.id}"></span>` = An empty span with a unique ID like `autor-1`, `autor-2`, etc.

**Example output:**
```html
<li data-id="1">1.- Cien años de soledad <span id="autor-1"></span></li>
```

---

### Lines 9-13: The Event Listener (The Magic!)
```javascript
li.addEventListener('mouseenter', async () => {
  const span = document.getElementById(`autor-${libro.id}`);
  if (!span.textContent) {
    span.textContent = await obtenerAutor(libro);
  }
});
```

This is where **async/await** comes in. Let me explain each part:

#### Line 9: `li.addEventListener('mouseenter', async () => {`
**What it does:** Attaches a hover event to this specific `<li>`.
**`async`:** This keyword tells JavaScript that this function will use `await` to handle asynchronous code (like Promises). It's a cleaner alternative to `.then()`.

#### Line 10: `const span = document.getElementById(`autor-${libro.id}`);`
**What it does:** Finds the empty `<span>` inside THIS specific `<li>`.
**Why:** Each book has its own span with a unique ID (`autor-1`, `autor-2`, etc.), so we need to target the right one.

#### Line 11: `if (!span.textContent) {`
**What it does:** Checks if the span is empty (your optimization from Paso 4!).
**Why:** If the author's name is already there, don't fetch it again. This prevents redundant "API calls".

#### Line 12: `span.textContent = await obtenerAutor(libro);`
**What it does:** This is the key line!
- **`obtenerAutor(libro)`** = Calls your Promise function (the one with `setTimeout`)
- **`await`** = Pauses the code here until the Promise resolves (waits for the 1000ms delay)
- **`span.textContent = ...`** = Once the Promise resolves, it puts the author's name into the span

**The beauty of `await`:** Instead of writing `.then(autor => { span.textContent = autor })`, you can write it as if it were synchronous code. It's much cleaner!

---

### Line 14: `marcador.appendChild(li);`
**What it does:** Finally adds the completed `<li>` (with its event listener attached) to the actual DOM.
**Why last?** You want to attach the event listener BEFORE adding it to the DOM, so the hover event is ready to go the moment the user sees it.

---

## The Complete Flow

1. **Clear the list** → `marcador.innerHTML = ""`
2. **Filter the books** → Get the right array based on genre
3. **For each book:**
   - Create an `<li>` element
   - Add a `data-id` attribute
   - Add the title and an empty `<span>` for the author
   - Attach a hover event that will fetch the author (using async/await)
   - Add the `<li>` to the page
4. **When user hovers:**
   - Check if author is already loaded (optimization)
   - If not, call `obtenerAutor()` and wait for it to complete
   - Display the author in the span

---

## Async/Await vs .then()

Here's the comparison:

**Old way (with .then):**
```javascript
obtenerAutor(libro)
  .then(autor => {
    span.textContent = autor;
  })
  .catch(error => {
    span.textContent = error.message;
  });
```

**New way (with async/await):**
```javascript
try {
  span.textContent = await obtenerAutor(libro);
} catch (error) {
  span.textContent = error.message;
}
```

Both do the same thing, but `async/await` is more readable and easier to debug. The `await` keyword literally makes JavaScript "wait" for the Promise to finish before moving to the next line.

---

## One Small Improvement

You might want to add error handling with `try/catch` since you're using `async/await`:

```javascript
li.addEventListener('mouseenter', async () => {
  const span = document.getElementById(`autor-${libro.id}`);
  if (!span.textContent) {
    try {
      span.textContent = await obtenerAutor(libro);
    } catch (error) {
      span.textContent = error.message; // Show error if rejected
      span.style.color = 'red';
    }
  }
});
```

This way, if `obtenerAutor()` rejects (like when the author is 'anonimo'), you can handle it gracefully instead of crashing.

---

Does this explanation help? The `async/await` syntax is a game-changer for working with Promises!     at segundoErrores.md  Don't do anything else

This updated version of the `dibujar` function is clean, optimized, and modern. It combines Big Pickle's hover optimization (Paso 4) with efficient DOM rendering.

Here is the breakdown of how it works step-by-step, along with the English technical terminology to describe it.

---

## 🛠️ Step-by-Step Explanation

### 1. Clearing the Container & Conditional Filtering

```javascript
marcador.innerHTML = "";
const filtrados = genero && genero !== 'todos'
  ? libros.filter(l => l.genero.toLowerCase() === genero)
  : libros;

```

* **What happens:** The function wipes the container clean. Then, it uses a ternary operator to decide which data to look at. If a specific genre is provided, it subsets the array using `.filter()`. If the genre is missing, null, or `"todos"`, it skips filtering and reuses the entire original `libros` array.

### 2. Attaching Metadata and Layout via the Loop

```javascript
li.dataset.id = libro.id;
li.innerHTML = `${ind + 1}.- ${libro.titulo} <span id="autor-${libro.id}"></span>`;

```

* **What happens:** As it loops over each book, it injects the book's ID directly into the HTML element configuration using a standard data attribute. It sets up the list structure with a dynamic template string, leaving the inner span completely blank.

### 3. Asynchronous Hover Logic (The Optimization)

```javascript
li.addEventListener('mouseenter', async () => {
  const span = document.getElementById(`autor-${libro.id}`);
  if (!span.textContent) {
    span.textContent = await obtenerAutor(libro);
  }
});

```

* **What happens:** A `mouseenter` event listener is attached directly to each individual list item. When triggered, it grabs its own internal target span.
* **The Optimization:** The `if (!span.textContent)` check ensures that if the author name is already written there from a previous hover, the function exits immediately and does nothing. If it is empty, it pauses execution using `await` until `obtenerAutor(libro)` resolves, and then updates the DOM.

---

## 💻 Technical Vocabulary

| Term | Meaning | Example Context |
| --- | --- | --- |
| **Data Attribute (`dataset`)** | A standard HTML feature that allows devs to store custom, invisible metadata directly on DOM elements. | *Setting `li.dataset.id` embeds the database key directly onto the list item.* |
| **`async/await` Syntax** | A modern, clean way to write asynchronous code that reads sequentially like synchronous code, bypassing manual `.then()` chains. | *Marking the listener as `async` lets you use **`await`** to resolve the author name cleanly.* |
| **Short-Circuit Evaluation** | Stopping a logical operation or function early once a specific condition is met, saving execution time. | *Checking `if (!span.textContent)` acts as a **short-circuit** to prevent redundant API simulations.* |

---

## 🗣️ Regular Vocabulary & Structural Highlights

### Useful English Phrases

* **To bypass:** To skip a standard restriction, structure, or path to take a more direct route.
> *Using async/await allows you **to bypass** nesting multiple `.then()` blocks inside your event listener.*


* **Sequentially:** Happening in a smooth, chronological order, one after the other.
> *Even though the promise is asynchronous, `await` makes the code execute **sequentially**.*



### Architectural Review

This function is highly efficient because it completely fulfills Big Pickle's Step 4 requirement: **it remembers its own state**. Once an author is fetched, it stays in the DOM, and moving your mouse over it a second time will not re-trigger the timer loop.

Are you ready to integrate this into the main file and connect it with your cookie retrieval logic?      at segundoErrores.md  Don't do anything else

---

## 📝 Debug report — 03Ej.js (v3)

| Aspecto | Estado | Detalle |
|---|---|---|
| `delay(ms)` | ❌ | Promise nunca se resuelve — `resolve=true` no llama a `resolve()`, y el parámetro `ms` se ignora |
| `if/else` con `return` / `throw` | ✅ | Ahora correcto |
| `probarVerificacion(edad)` | ⚠️ | Definida pero nunca llamada |
| `try/catch` | ❌ | `await` está **fuera** del `try`, y ambos bloques están vacíos |

### Bugs

1. **Línea 2-4**: `delay()` roto — el `resolve` interno sombrea al externo, `resolve=true` asigna un booleano en vez de ejecutar la función, y `ms` no se usa. Debería ser:
   ```js
   return new Promise(resolve => setTimeout(resolve, ms));
   ```

2. **Línea 15**: `const edad` redeclara el parámetro. Además, `await` está **fuera** del `try` — si `verificarEdadAsync()` lanza un error, no se captura.

3. **Líneas 16-20**: `try {} catch {}` vacíos — no hay `console.log` ni `console.error`.

4. **Línea 21**: Nunca llamas a `probarVerificacion()`.

### ¿Vas bien encaminado?

✅ **Mucho mejor.** El núcleo de `verificarEdadAsync()` ya es correcto. Solo queda arreglar `delay()`, el `try/catch` y llamar a la función.

### 🔧 Corrección rápida

```js
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function verificarEdadAsync() {
    const edad = Math.floor(Math.random() * 8) + 14;
    await delay(1000);
    if (edad >= 18) return `Permitido ${edad}`;
    throw new Error(`No Permitido ${edad}`);
}

async function probarVerificacion() {
    try {
        const resultado = await verificarEdadAsync();
        console.log(resultado);
    } catch (err) {
        console.error(err.message);
    }
}

probarVerificacion();
```

---

## 📝 Feedback externo — 03Ej.js debug walkthrough (de segundoErrores.md)

> I can see you're making progress, but there are a few issues we need to fix. Let me walk through them:

---

### ❌ Issue 1: The `delay()` function is broken

```javascript
function delay(ms){
    return new Promise((resolve)=>setTimeout((resolve)=>{
        resolve=true; // ❌ This doesn't work
    },1000));
}
```

**The problem:** You're shadowing the `resolve` parameter. The `resolve` inside `setTimeout` is a different variable than the `resolve` from the Promise constructor. Also, `resolve=true` doesn't actually call the function.

**The fix:**
```javascript
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
```

This is the standard pattern. `setTimeout(resolve, ms)` means "after `ms` milliseconds, call the `resolve` function".

---

### ❌ Issue 2: `await` is outside the `try/catch`

```javascript
async function probarVerificacion(edad) {
    const edad = await verificarEdadAsync(); // ❌ await outside try/catch
    try{
        // Empty
    }catch{
        // Empty
    }
}
```

**The problem:** If `verificarEdadAsync()` throws an error, it will crash before reaching the `try` block. The `await` needs to be **inside** the `try`.

**The fix:**
```javascript
async function probarVerificacion() {
    try {
        const resultado = await verificarEdadAsync();
        console.log(resultado);
    } catch (error) {
        console.error(error.message);
    }
}
```

---

### ❌ Issue 3: Variable name conflict

```javascript
async function probarVerificacion(edad) { // ❌ Parameter named 'edad'
    const edad = await verificarEdadAsync(); // ❌ Also declaring 'const edad'
```

You can't have a parameter and a `const` with the same name. Since `verificarEdadAsync()` generates a random age internally, you don't need to pass it as a parameter.

---

### ✅ The Complete Corrected Code

```javascript
// Helper function for delays
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// The async function that does the work
async function verificarEdadAsync() {
    const edad = Math.floor(Math.random() * 8) + 14;

    await delay(1000);

    if (edad >= 18) {
        return `Permitido ${edad}`;
    }

    throw new Error(`No Permitido ${edad}`);
}

// The function that calls it and handles errors
async function probarVerificacion() {
    try {
        const resultado = await verificarEdadAsync();
        console.log(resultado);
    } catch (error) {
        console.error(error.message);
    }
}

// Run it
probarVerificacion();
```

---

### 🔑 Key Takeaways

1. **`delay()` function:** Use `setTimeout(resolve, ms)` directly, don't wrap it in another arrow function
2. **`await` placement:** Always put `await` inside the `try` block so errors can be caught
3. **Variable scope:** Don't declare variables with the same name as parameters

> You're very close! The logic in `verificarEdadAsync()` is perfect. Just need to fix the helper function and the error handling structure.
>
> Ready to try it again, or shall we move to Exercise 3?

---

## 📝 Feedback externo — 03Ej.js en español (de segundoErrores.md)

> Tu código tiene un par de errores que impiden que funcione correctamente. Aquí te explico cuáles son y cómo solucionarlos:

### Errores encontrados:

1. **En la función `delay`:**
   - **Sombreado de variable (*Shadowing*):** Dentro del `setTimeout` estás declarando un parámetro llamado `resolve` `(resolve) => { ... }`. Esto oculta al `resolve` original de la Promesa.
   - **Asignación en lugar de ejecución:** Estás haciendo `resolve = true` (una asignación) en lugar de `resolve()` (ejecutar la función para resolver la promesa). Como la promesa nunca se resuelve, el `await` se queda colgado infinitamente.
   - **Parámetro ignorado:** No estás usando el parámetro `ms` que recibe la función, tienes el tiempo hardcodeado a `1000`.

2. **En la función `probarVerificacion`:**
   - **Variable `err` no definida:** En el bloque `catch` no estás capturando el error (te falta poner `catch(err)`), pero luego intentas imprimir `err.message`. Esto lanzará un `ReferenceError` porque `err` no existe en ese contexto.

---

### Código corregido:

```javascript
function delay(ms){
    return new Promise((resolve) => setTimeout(() => {
        resolve(); // Llamamos a la función resolve() para cumplir la promesa
    }, ms)); // Usamos el parámetro ms en lugar de 1000 hardcodeado
}

async function verificarEdadAsync(){
    const edad = Math.floor(Math.random() * 8) + 14;
    await delay(1000);
    if(edad >= 18) return `Permitido ${edad}`;
    throw new Error(`No Permitido ${edad}`);
}

async function probarVerificacion() {    
    try {
        const resultado = await verificarEdadAsync();
        console.log(resultado);
    } catch(err) { // Capturamos el error en la variable 'err'
        console.error(err.message);
    }
}
 
probarVerificacion();
```

### ¿Qué cambió?
- En `delay`, eliminamos el parámetro fantasma del `setTimeout` y cambiamos `resolve = true` por `resolve()`. También usamos `ms` para que la función sea reutilizable con distintos tiempos.
- En `probarVerificacion`, añadimos `err` como parámetro del `catch(err)` para que el `console.error(err.message)` funcione sin romper el programa.

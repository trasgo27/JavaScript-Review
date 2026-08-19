# 🐞 Errores en `01Ej.js`

> Registro de depuración del ejercicio de importación asíncrona de JSON.

---

## 📋 Tabla de contenidos

1. [Primera revisión — Código inicial roto](#-primera-revisión--código-inicial-roto)
2. [Segunda revisión — Código corregido a medias](#-segunda-revisión--código-corregido-a-medias)
3. [Comparativa de opciones (A / B / C)](#-comparativa-de-opciones-a--b--c)
4. [Auditoría general del proyecto](#-auditoría-general-del-proyecto)

---

## 🚫 Primera revisión — Código inicial roto

### ❌ Problemas identificados (5 bugs)

| # | Código erróneo | Problema | Solución |
|---|---|---|---|
| 1 | `async const resp` | `async` no puede usarse en declaraciones `const` | Usar solo `const resp` |
| 2 | `.try(()=>()` | `try`/`catch` son **sentencias**, no métodos encadenables | Usar bloque `try { ... } catch { ... }` |
| 3 | `resp.jason()` | Typo: `jason` no es un método | Cambiar a `resp.json()` |
| 4 | `console.table(parseado)` | `parseado` nunca se declara | Añadir `const parseado = await ...` |
| 5 | `console.error(error.message)` | La variable capturada es `err`, no `error` | Cambiar a `err.message` |

### Código roto original

```js
async const resp = await fetch('libros.json');
.try((resp)=>(){
    await resp.jason();
    console.table(parseado);
};
 
.catch(err){
    console.error(error.message);
}
```

### ✅ Solución propuesta

```js
const resp = await fetch('libros.json');
const data = await resp.json();
console.table(data);
```

> **Nota:** El `<script>` debe llevar `type="module"` para que funcione `await` de nivel superior:
> ```html
> <script src="01Ej.js" type="module"></script>
> ```

### 🔁 Alternativa (sin `type="module"`)

```js
async function loadData() {
    try {
        const resp = await fetch('libros.json');
        const data = await resp.json();
        console.table(data);
    } catch (err) {
        console.error(err.message);
    }
}
loadData();
```

---

## 🔧 Segunda revisión — Código corregido a medias

### Código actual del usuario

```js
//importar json

async function importar(nom){
    const resp = await fetch('libros.json');
    const parseado = await resp.json();
    return parseado;
}

importar('libros.json')
.try()
.catch();
```

### ✅ Lo que está bien

| Acierto | Detalle |
|---|---|
| `async function importar(nom)` | Sintaxis correcta de función async |
| `const resp = await fetch(...)` | Llamada fetch correcta |
| `resp.json()` | Typo `jason` corregido ✅ |
| `const parseado` | Variable correctamente declarada ✅ |

### ⚠️ Lo que aún falla

| # | Líneas | Problema | Solución |
|---|---|---|---|
| 1 | 3-4 | El parámetro `nom` no se usa — el filename está hardcodeado | Cambiar a `const resp = await fetch(nom);` |
| 2 | 9-11 | `.try()` y `.catch()` **no existen** como métodos | Usar `try/catch` o `.then().catch()` (ver opciones abajo) |

---

## 📊 Comparativa de opciones (A / B / C)

Todas son válidas, pero difieren en **dónde** se captura el error:

| Opción | Dónde vive `try/catch` | Estilo | ¿Recomendada? |
|--------|------------------------|--------|:---:|
| **A** | Dentro de la `async function` | Async/await puro | ✅ |
| **B** | `.then().catch()` sobre la promesa | Mixto (async + promesas) | ❌ |
| **C** | Fuera, donde se llama con `await` | Async/await puro | ✅ |

### Opción A — try/catch dentro de la función

```js
async function importar(nom) {
    try {
        const resp = await fetch(nom);
        const parseado = await resp.json();
        return parseado;
    } catch (err) {
        console.error(err.message);
    }
}
```

### Opción B — .then().catch() (no recomendada)

```js
importar('libros.json')
    .then(data => console.table(data))
    .catch(err => console.error(err.message));
```

### Opción C — try/catch fuera, con await

```js
try {
    const data = await importar('libros.json');
    console.table(data);
} catch (err) {
    console.error(err.message);
}
```

### 💡 Notas sobre cada opción

- **A y C son el mismo patrón** — ambos usan `try/catch` + `await`. Solo cambia el ámbito:
  - **A**: el error se maneja *dentro* de `importar` → ella misma traga los errores.
  - **C**: el error se maneja *fuera* → quien llama a `importar` decide cómo manejarlo.
- **B no se recomienda** porque mezcla dos sintaxis (async/await dentro, `.then/.catch` fuera). Funciona, pero es inconsistente y más difícil de leer.

### 📌 ¿Cuál elegir?

| Si... | Usa |
|---|---|
| `importar` debe ser reutilizable por distintos llamadores | **C** |
| `importar` solo se usa una vez y debe loguear errores | **A** |
| No hay diferencia clara | Cualquiera — es preferencia personal |

---

## 📈 Auditoría general del proyecto (2026-06-23)

### Estado de los archivos

| Archivo | Estado | Notas |
|---|---|---|
| `01Ej.js` | ⚠️ Parcial | 3 intentos: 1ro roto, 2do correcto, 3ro bug (falta `await`) |
| `01Ej.html` | ✅ Correcto | `type="module"` presente |
| `libros.json` | ✅ Correcto | 3 libros: 1984, El Hobbit, Don Quijote |
| `errores.md` | ✅ Completo | Cubre los 3 intentos con soluciones |

### ¿Vas bien encaminado?

> ✅ **Sí.** Este proyecto funciona como diario de prácticas y depuración. Has documentado errores reales con sus soluciones.

### ⚠️ Pero esto NO es el examen completo

`0000PracticasLibreria` solo cubre **1 de los 6 puntos** del examen (importar JSON). El proyecto hermano `0000Libreria` tiene la solución completa:

| Punto | Descripción | Estado aquí |
|:---:|---|---|
| P1 | Carga asíncrona de JSON | ✅ |
| P2 | Filtro por género | ❌ |
| P3 | Cookie (guardar/leer estado) | ❌ |
| P4 | Temporizador con `setInterval` | ❌ |
| P5 | Botón reiniciar | ❌ |
| P6 | Hover autor con Promise + `setTimeout` | ❌ |

### 🐛 Bugs pendientes en `01Ej.js`

| Línea | Código actual | Debería ser |
|:---:|---|---|
| 9 | `err.mesage` | `err.message` |
| 30 | `console.table(impor)` | `console.table(await impor)` |

### 🎯 Recomendación

| Si tu objetivo es... | Entonces... |
|---|---|
| **Practicar depuración** | Estás en el camino correcto ✅ |
| **Completar el examen** | Te faltan 5 puntos (P2–P6). Revisa `0000Libreria/examen.js` como referencia |

---

## 📝 Feedback externo — Great work! (de segundoErrores.md)

> Great work! You're exploring different ways to handle asynchronous JSON fetching. Let me break down what's happening in each approach and fix a few issues.

---

### First Block: "MAL" (BAD)

```javascript
try {
  const resp = await fetch('nombreMal.json');
  const pars = await resp.json();
  console.table(pars);
} catch(err) {
  console.error(err.mesage); // ❌ TYPO: should be err.message
}
```

**Issues:**
1. **Wrong filename:** `'nombreMal.json'` probably doesn't exist, so it will always fail
2. **Typo:** `err.mesage` should be `err.message`
3. **Top-level await:** This code uses `await` at the top level, which only works in:
   - ES6 Modules (`<script type="module">`)
   - Modern Node.js environments
   - If you're in a regular `<script>` tag, this will throw an error

---

### Second Block: "BIEN" (GOOD)

```javascript
try {
    const importado = await fetch('libros.json');
    const parseado = await importado.json();
    console.table(parseado);
} catch (err) {
    console.error(err);
}
```

**What's good:**
- ✅ Correct filename
- ✅ Proper error handling
- ✅ Clean variable names

**Same issue:** Top-level `await` only works in modules. If this is in a regular script, wrap it in an async function:

```javascript
async function cargarLibros() {
    try {
        const importado = await fetch('libros.json');
        const parseado = await importado.json();
        console.table(parseado);
    } catch (err) {
        console.error(err);
    }
}

cargarLibros();
```

---

### Third Block: "con funcion" (with function) — THE PROBLEM!

```javascript
async function importar(nombre) {
    try {
        const impor = await fetch(nombre);
        const par = await impor.json();
        return par;
    } catch (err) {
        console.error(err.mesage); // ❌ TYPO: should be err.message
    }    
}

const impor = importar('libros.json');
console.table(impor); // ❌ This will show a Promise, not the data!
```

#### The Big Issue: Missing `await`!

When you call an `async` function, it **always returns a Promise**. So `impor` is not your array of books—it's a Promise object!

**What's happening:**
1. `importar('libros.json')` returns a Promise
2. `console.table(impor)` logs the Promise object (you'll see `{<pending>}` or similar)
3. The actual data is inside that Promise, but you haven't extracted it yet

#### The Solution: Use `await` or `.then()`

**Option 1: Use `await` (requires async context)**
```javascript
async function importar(nombre) {
    try {
        const impor = await fetch(nombre);
        const par = await impor.json();
        return par;
    } catch (err) {
        console.error(err.message); // Fixed typo
    }    
}

// Wrap in an async IIFE (Immediately Invoked Function Expression)
(async () => {
    const impor = await importar('libros.json'); // ✅ Now we wait for the Promise!
    console.table(impor); // ✅ This will show your books array
})();
```

**Option 2: Use `.then()`**
```javascript
async function importar(nombre) {
    try {
        const impor = await fetch(nombre);
        const par = await impor.json();
        return par;
    } catch (err) {
        console.error(err.message);
    }    
}

importar('libros.json')
    .then(impor => {
        console.table(impor); // ✅ Data is here!
    });
```

**Option 3: Use it inside another async function**
```javascript
async function importar(nombre) {
    try {
        const impor = await fetch(nombre);
        const par = await impor.json();
        return par;
    } catch (err) {
        console.error(err.message);
    }    
}

async function iniciarApp() {
    const impor = await importar('libros.json'); // ✅ await here!
    console.table(impor);
    // Now you can use 'impor' to populate your UI
}

iniciarApp();
```

---

### The Corrected Complete Version

Here's the clean, working version:

```javascript
// Function to fetch and parse JSON
async function importar(nombre) {
    try {
        const response = await fetch(nombre);
        
        // Check if the response is OK (status 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error importing JSON:', err.message);
        throw err; // Re-throw so the caller knows it failed
    }    
}

// Use the function
(async () => {
    try {
        const libros = await importar('libros.json');
        console.table(libros);
        
        // Now you can use 'libros' to populate your UI
        // dibujar('todos');
    } catch (err) {
        console.error('Failed to load books:', err);
    }
})();
```

---

### Key Takeaways

1. **`async` functions always return Promises** — you must use `await` or `.then()` to get the actual data
2. **Top-level `await`** only works in modules — wrap in an async function otherwise
3. **Check `response.ok`** — `fetch()` doesn't throw on HTTP errors (404, 500), so check it manually
4. **Fix typos** — `err.message` not `err.mesage`

> Does this clarify the issue with the third approach? The key is remembering that calling an async function gives you a Promise, not the data itself!

---

## 📝 Feedback externo — Type="module" deep dive (de segundoErrores.md)

> You hit the nail on the head! Adding `type="module"` to your `<script>` tag was exactly the right move to make your top-level `await` work.

Let's break down exactly what **Top-level await** is, why it was forbidden in normal scripts, and the "superpowers" you just unlocked by using `type="module"`.

---

### 1. What is "Top-Level Await"?

Normally, you can only use the `await` keyword *inside* an `async function`.

```javascript
// ❌ NORMAL SCRIPT: This causes an error
const data = await fetch('libros.json');

// ✅ NORMAL SCRIPT: You must wrap it in an async function
async function cargar() {
    const data = await fetch('libros.json');
}
cargar();
```

**"Top-level await"** means using the `await` keyword at the very root (top level) of your file, outside of any function.

```javascript
// ✅ MODULE SCRIPT: This works perfectly!
const data = await fetch('libros.json');
console.log(data);
```

### 2. Why do regular `<script>` tags hate it?

JavaScript is **single-threaded** and runs synchronously. If you put an `await` at the top level of a normal `<script>` tag, you are telling the browser: *"Stop parsing the HTML, stop loading the CSS, freeze the entire screen, and wait for this API call to finish."*

To prevent web pages from freezing, the creators of JavaScript made a strict rule: **Top-level await is illegal in standard scripts.**

### 3. How `<script type="module">` fixes it

When you add `type="module"`, you are telling the browser: *"Treat this JavaScript file as a modern **ES6 Module**."*

Modules are loaded differently by the browser. They are fetched and parsed in the background *without* blocking the HTML rendering. Because the browser already handles modules asynchronously behind the scenes, it is safe to let the script pause itself with a top-level `await` without freezing the user's screen.

---

### 🌟 4 Superpowers You Just Unlocked

By changing to `type="module"`, you didn't just unlock top-level `await`. You actually changed how JavaScript behaves in your file! Here are the biggest changes:

#### Superpower 1: You don't need `DOMContentLoaded` anymore!

In a normal script, you had to write this to make sure the HTML was ready before you tried to select elements:

```javascript
// OLD WAY (Normal Script)
document.addEventListener('DOMContentLoaded', () => {
    const listado = document.getElementById('lista-libros');
    // ...
});
```

**Modules are deferred by default.** This means the browser automatically waits for the entire HTML document to be parsed *before* running your module.

```javascript
// NEW WAY (Module Script)
// You can just grab the element immediately at the top level!
const listado = document.getElementById('lista-libros');
```

#### Superpower 2: Strict Mode is automatic

Modules automatically run in "Strict Mode". This means JavaScript will catch your silent errors. For example, if you forget to declare a variable with `let` or `const`, a normal script might just create a messy global variable. A module will immediately throw an error and stop, saving you from hidden bugs.

#### Superpower 3: Variables are isolated (Scoped)

In a normal script, every `const` or `let` you declare at the top level is attached to the global `window` object. Anyone (or any other script) can access or overwrite them.

In a module, your variables are **private** to that file. They do not pollute the global `window`.

#### Superpower 4: `import` and `export`

This is the main reason modules exist. You can now split your code into multiple files and share variables between them!

```javascript
// api.js
export async function fetchLibros() { ... }

// main.js (type="module")
import { fetchLibros } from './api.js';
```

---

### ⚠️ The One Big "Gotcha" (CORS)

There is one major catch to using `type="module"` that trips up a lot of beginners: **Security (CORS).**

Because modules are designed for modern web apps, browsers enforce strict security rules. **You can no longer just double-click your `index.html` file to open it in the browser via the `file://` protocol.**

If you try to open a module directly from your hard drive, the browser will block it, and your `fetch()` calls will fail with a "CORS error".

**The Fix:** You must run your code using a **Local Development Server**.

- If you use **VS Code**, just install the **"Live Server"** extension and click "Go Live" at the bottom right.
- If you use the terminal, you can run `npx serve` or `python -m http.server` in your project folder.

---

### Summary: Your New, Clean Setup

Because you are now using `<script type="module" src="script.js"></script>`, your main code can be beautifully simplified!

```javascript
// script.js

// 1. Grab DOM elements immediately (No DOMContentLoaded needed!)
const listado = document.getElementById('lista-libros');

// 2. Use Top-Level Await to fetch data immediately!
try {
    const response = await fetch('libros.json');
    const libros = await response.json();

    // 3. Call your functions
    dibujar('todos');

} catch (err) {
    console.error('Error loading the app:', err);
}

// ... rest of your functions (dibujar, obtenerAutor, etc.) ...
```

> Does this make sense? Using `type="module"` is exactly how professional JavaScript is written today, so you are using industry-standard best practices!

---

## 📝 Feedback externo — Resumen final (de segundoErrores.md)

> **Exactly right!** You've got it perfectly.

Here's a quick summary to lock it in:

---

### ✅ Your Understanding is 100% Correct

| Scenario | Top-Level `await`? | Example |
|----------|-------------------|---------|
| **Regular `<script>`** | ❌ NO | `const data = await fetch(...)` → **ERROR** |
| **`<script type="module">`** | ✅ YES | `const data = await fetch(...)` → **WORKS** |
| **Regular `<script>` with async function** | ✅ YES (but inside function) | `async function load() { const data = await fetch(...) }` → **WORKS** |

---

### Visual Examples

#### ❌ Regular Script (Top-Level) — BROKEN

```html
<script>
    const data = await fetch('libros.json'); // ERROR: await is only valid in async functions
</script>
```

#### ✅ Module Script (Top-Level) — WORKS

```html
<script type="module">
    const data = await fetch('libros.json'); // Perfect!
</script>
```

#### ✅ Regular Script (Inside Function) — WORKS

```html
<script>
    async function cargar() {
        const data = await fetch('libros.json'); // Perfect!
    }
    cargar();
</script>
```

---

> You've mastered this concept! 🎉

---

## 📝 Feedback externo — Async/await con delay (de segundoErrores.md)

> ¡Veo varios conceptos que se están mezclando! Déjame explicarte los errores y cómo corregirlos.

---

### ❌ Error 1: `await setTimeout()`

**El problema:** `setTimeout` NO retorna una Promise, retorna un número (el ID del timer). No puedes hacer `await` sobre él directamente.

```javascript
// ❌ MAL
await setTimeout(() => { ... }, 1000);

// ✅ BIEN: Envolver setTimeout en una Promise
await new Promise(resolve => setTimeout(resolve, 1000));

// ✅ MEJOR: Usar la función delay() que te proporcioné
await delay(1000);
```

---

### ❌ Error 2: `try` y `catch` como funciones

**El problema:** Estás usando `try(...)` y `catch(...)` como si fueran funciones. Pero `try/catch` son **bloques de código**, no funciones.

```javascript
// ❌ MAL
try("mensaje")
catch(new Error("mensaje"))

// ✅ BIEN: En async/await, usas return y throw
return "mensaje"; // Equivale a resolve()
throw new Error("mensaje"); // Equivale a reject()
```

---

### ❌ Error 3: Estructura incorrecta

En async/await, la estructura es diferente a Promises:

| Promises | async/await |
|----------|-------------|
| `resolve(valor)` | `return valor` |
| `reject(error)` | `throw new Error(error)` |
| `.then().catch()` | `try/catch` (en la función que llama) |

---

### ✅ Código corregido:

```javascript
// Función helper para delays
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// PARTE 1: La función async que hace el trabajo
async function verificarEdadAsync() {
    const edad = Math.floor(Math.random() * 8) + 14;

    // ✅ await con la función delay()
    await delay(1000);

    // ✅ return en lugar de resolve()
    if (edad >= 18) {
        return `Permitido, ${edad}`;
    } else {
        // ✅ throw en lugar de reject()
        throw new Error(`No permitido, ${edad}`);
    }
}

// PARTE 2: La función que llama y maneja errores
async function probarVerificacion() {
    try {
        const resultado = await verificarEdadAsync();
        console.log(resultado);
    } catch (error) {
        console.error(error.message);
    }
}

// PARTE 3: Ejecutar
probarVerificacion();
```

---

### 🔑 Diferencias clave:

1. **Dentro de la función async:**
   - Usa `return` para resolver (no `resolve()`)
   - Usa `throw new Error()` para rechazar (no `reject()`)

2. **En la función que llama:**
   - Usa `try/catch` para manejar el resultado
   - Usa `await` para esperar la Promise

3. **Para delays:**
   - No puedes hacer `await setTimeout()`
   - Debes envolverlo en una Promise o usar `delay()`

---

> ¿Tiene más sentido ahora? La clave es recordar que `async/await` es azúcar sintáctica sobre Promises, pero la sintaxis cambia un poco.

---

## 📝 Feedback externo — Async/await in English (de segundoErrores.md)

> Absolutely, my apologies! Let's switch right back to English.

You made some really interesting attempts here, but there are a few concepts that got mixed up. Let's break down exactly what went wrong and how to fix it.

---

### ❌ Mistake 1: `await setTimeout()`

**The problem:** `setTimeout` does **not** return a Promise. It returns a number (the timer ID). Because it's not a Promise, you cannot use `await` on it directly.

```javascript
// ❌ WRONG
await setTimeout(() => { ... }, 1000);

// ✅ RIGHT: Wrap it in a Promise (like the delay() function I gave you)
await delay(1000);
// OR
await new Promise(resolve => setTimeout(resolve, 1000));
```

### ❌ Mistake 2: Using `try` and `catch` as functions

**The problem:** You wrote `try(...)` and `catch(...)`. In JavaScript, `try` and `catch` are **keywords for code blocks**, not functions that you can call with parentheses.

More importantly, when you are **inside** an `async` function, you don't use `try/catch` to resolve or reject. You use standard JavaScript keywords:
- The equivalent of `resolve()` is **`return`**
- The equivalent of `reject()` is **`throw new Error()`**

```javascript
// ❌ WRONG
try("message")
catch(new Error("message"))

// ✅ RIGHT (Inside an async function)
return "message";           // This acts like resolve()
throw new Error("message"); // This acts like reject()
```

### ❌ Mistake 3: Where does `try/catch` actually go?

The `try/catch` block doesn't go inside the function that *creates* the error. It goes inside the function that *calls* it (the one waiting for the result).

---

### ✅ The Corrected Code

Here is how your Exercise 2 should look. Notice how clean it is compared to the Promise version!

```javascript
// Helper function to create a delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// PART 1: The async function doing the work
async function verificarEdadAsync() {
    const edad = Math.floor(Math.random() * 8) + 14;

    // 1. Wait for the delay
    await delay(1000);

    // 2. Check the condition
    if (edad >= 18) {
        // Equivalent to resolve()
        return `Permitido, ${edad}`;
    } else {
        // Equivalent to reject()
        throw new Error(`No permitido, ${edad}`);
    }
}

// PART 2: The function that calls it and handles the result
async function probarVerificacion() {
    try {
        // We use await to wait for the result
        const resultado = await verificarEdadAsync();
        console.log(resultado);
    } catch (error) {
        // If the async function throws an error, it gets caught here!
        console.error(error.message);
    }
}

// PART 3: Run it
probarVerificacion();
```

### 💡 The Golden Rule of Async/Await:

- Inside the `async` function: use **`return`** and **`throw`**.
- Outside, in the calling function: use **`await`** inside a **`try/catch`** block.

> Does this clear up the confusion between Promises and async/await? Let me know if you want to tweak this code, or if you are ready for **Exercise 3**!

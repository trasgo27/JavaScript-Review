**`cargarSecuencial()` — partially right:**
- ✅ Correct pattern: `await` each function sequentially
- ❌ **Task says return an object** with 3 keys (e.g., `{ clima, noticias, acciones }`), but you return an array (`vector`)
- ❌ `vector.push(...news)` flattens the news array into individual items instead of storing it as one value
- ❌ The `console.table` with interpolation won't display properly

**`cargarParalelo()` — needs significant fixes:**
- ❌ `new Promise.all(...)` is wrong — `Promise.all` is a static method, not a constructor. Use `Promise.all([...])`.
- ❌ Missing `obtenerAcciones()` in the call
- ❌ No `await` on the `Promise.all` call
- ❌ No return value

**Extra code issues (lines 71–78):**
- ❌ Top-level `cargarSecuencial()` call returns a Promise, not the array — `console.table(vector)` logs a pending Promise
- ❌ `cargarParalelod` (typo) is an empty duplicate
- ❌ `console.time()` / `console.timeEnd()` with no label is fragile

You are doing great! You completely nailed the logic for the sequential part, and you are very close on the parallel part. Let's break down a few things to get this working perfectly.

### 1. The Sequential Function (`cargarSecuencial`)
Your use of `await` here is **100% correct**. You waited for the weather, then the news, then the stocks. 
**The only small tweak:** The instructions asked to return an **object** `{ }`, but you created an array `[ ]`. Returning an object is much cleaner here so you can keep track of what data is what. 

```javascript
async function cargarSecuencial() {
    const weatherForecast = await obtenerClima();
    const news = await obtenerNoticias();
    const acciones = await obtenerAcciones();
    
    // Return an object instead of an array
    return {
        clima: weatherForecast,
        noticias: news,
        acciones: acciones
    };
}
```

### 2. The Parallel Function (`cargarParalelo`)
Here is where the main learning opportunity is! You tried to do `new Promise.all(...)`. 
`Promise.all()` is not a constructor like `new Promise()`. Instead, it is a tool that takes an **array of promises** that are *already running*. 

You just pass the function calls inside an array `[ ]`, and `await` the whole thing!

```javascript
async function cargarParalelo() {
    // We pass an array of the 3 promises to Promise.all()
    const resultados = await Promise.all([
        obtenerClima(),
        obtenerNoticias(),
        obtenerAcciones()
    ]);
    
    // Promise.all returns an array with the results in the same order.
    // We can use destructuring to assign them to variables:
    const [clima, noticias, acciones] = resultados;
    
    return { clima, noticias, acciones };
}
```

### 3. The Testing Code
At the bottom, you tried to do this:
```javascript
const vector = cargarSecuencial();
console.table(vector);
```
Because `cargarSecuencial` is an `async` function, it **always returns a Promise**. So `vector` was just a pending Promise object, which is why `console.table` looked weird! 

To see the real magic of this exercise (the speed difference), we need to uncomment the `probarVelocidad()` function provided in the boilerplate. It uses `console.time()` to measure exactly how many milliseconds each approach takes.

---

### Here is the fully corrected code to copy and paste:

```javascript
// --- SIMULATED APIs (Do not modify these) ---
function obtenerClima() {
    return new Promise((resolve) => setTimeout(() => resolve("Soleado, 25°C ☀️"), 1000));
}
function obtenerNoticias() {
    return new Promise((resolve) => setTimeout(() => resolve(["Noticia 1: JS es genial", "Noticia 2: IA avanza"]), 1500));
}
function obtenerAcciones() {
    return new Promise((resolve) => setTimeout(() => resolve({ AAPL: 150, TSLA: 200 }), 2000));
}

// --- YOUR CODE ---

// 1. Sequential
async function cargarSecuencial() {
    const weatherForecast = await obtenerClima();
    const news = await obtenerNoticias();
    const acciones = await obtenerAcciones();
    
    return { clima: weatherForecast, noticias: news, acciones: acciones };
}

// 2. Parallel
async function cargarParalelo() {
    const resultados = await Promise.all([
        obtenerClima(),
        obtenerNoticias(),
        obtenerAcciones()
    ]);
    
    const [clima, noticias, acciones] = resultados;
    return { clima, noticias, acciones };
}

// --- TESTING THE SPEED ---
async function probarVelocidad() {
    console.log("--- Empezando carga SECUENCIAL ---");
    console.time("Secuencial");
    const resultado1 = await cargarSecuencial();
    console.timeEnd("Secuencial");
    console.log("Datos:", resultado1);

    console.log("\n--- Empezando carga PARALELA ---");
    console.time("Paralelo");
    const resultado2 = await cargarParalelo();
    console.timeEnd("Paralelo");
    console.log("Datos:", resultado2);
}

// Run the test!
probarVelocidad();
```

**What to look for when you run it:**
- **Secuencial** will take about **4.5 seconds** (1s + 1.5s + 2s) because it waits for each one to finish.
- **Paralelo** will take about **2 seconds** (the time of the longest promise) because they all start at the exact same time!

Run it and let me know if you see the speed difference!

`cargarParalelo()` runs all three API calls at the same time instead of waiting for each one to finish before starting the next.

```javascript
async function cargarParalelo() {
    const resultados = await Promise.all([
        obtenerClima(),      // starts immediately
        obtenerNoticias(),   // starts immediately (at the same time)
        obtenerAcciones()    // starts immediately (at the same time)
    ]);

    const [clima, noticias, acciones] = resultados;
    return { clima, noticias, acciones };
}
```

**How it works:**

1. `Promise.all([...])` takes an **array of promises** and returns a single promise that resolves when ALL of them finish.
2. The 3 functions (`obtenerClima`, `obtenerNoticias`, `obtenerAcciones`) are **all called at once** — they don't wait for each other. They run in parallel.
3. `await` waits until the slowest one finishes (~2s for `obtenerAcciones`).
4. `resultados` is an array: `["Soleado...", ["Noticia 1..."], { AAPL: 150, ... }]` — in the same order as the input array.
5. Destructuring `const [clima, noticias, acciones] = resultados` unpacks them into named variables.

**Key contrast with `cargarSecuencial()`:**
- **Secuencial:** 1s + 1.5s + 2s = **~4.5s** total
- **Paralelo:** max(1s, 1.5s, 2s) = **~2s** total (determined by the slowest promise)

I would love to break this down for you! Understanding exactly *how* `Promise.all()` works is a huge milestone in mastering asynchronous JavaScript. 

Here is the function again so we can look at it closely:

```javascript
async function cargarParalelo() {
    // Step 1 & 2: Starting the promises and waiting for ALL of them
    const resultados = await Promise.all([
        obtenerClima(),
        obtenerNoticias(),
        obtenerAcciones()
    ]);
    
    // Step 3: Unpacking the results
    const [clima, noticias, acciones] = resultados;
    
    // Step 4: Returning the final object
    return { clima, noticias, acciones };
}
```

Let's break it down line by line, because there is a very specific "magic" happening here.

### 1. Starting the Clocks (The Array)
Look at the array we pass into `Promise.all`:
```javascript
[
    obtenerClima(),     // Starts a 1000ms timer
    obtenerNoticias(),  // Starts a 1500ms timer
    obtenerAcciones()   // Starts a 2000ms timer
]
```
**Crucial Concept:** The moment JavaScript evaluates this array, it *executes* those three functions. Because those functions contain `setTimeout`, **all three timers start ticking at the exact same millisecond.** 

They are not waiting for each other. They are running "in parallel" (concurrently) in the background. 
*   The weather will be ready in 1 second.
*   The news will be ready in 1.5 seconds.
*   The stocks will be ready in 2 seconds.

### 2. The Traffic Cop: `Promise.all()`
`Promise.all()` is a built-in JavaScript tool designed specifically to handle an array of Promises. 
You can think of it like a group project. `Promise.all` says: *"I don't care if one person finishes their work in 1 hour and the other takes 10 hours. I am not going to declare the project 'done' until the **last** person finishes."*

Because the stocks take 2 seconds (the longest), `Promise.all()` will wait exactly 2 seconds. Once the 2 seconds are up, it bundles up all three results and hands them back to you.

### 3. The Pause Button: `await`
```javascript
const resultados = await Promise.all(...)
```
Because `Promise.all` returns a Promise itself, we must use `await`. This tells the `cargarParalelo` function: *"Stop right here. Do not move to the next line until `Promise.all` has gathered all three pieces of data."*

Once the 2 seconds are up, `resultados` becomes a standard JavaScript array containing the final data:
`["Soleado, 25°C ☀️", ["Noticia 1...", "Noticia 2..."], { AAPL: 150, TSLA: 200 }]`

*Note: `Promise.all` is very smart. Even though the weather finished first, it puts the weather in the **first** position of the array to match the exact order you asked for them!*

### 4. Unpacking the Box (Array Destructuring)
```javascript
const [clima, noticias, acciones] = resultados;
```
This is just a beautiful, modern JavaScript shortcut called **destructuring**. 
Instead of writing this boring, repetitive code:
```javascript
const clima = resultados[0];
const noticias = resultados[1];
const acciones = resultados[2];
```
You can just put brackets `[ ]` on the left side, and JavaScript automatically unpacks the array into your variables based on their position.

---

### 🍔 The Real-World Analogy

Imagine you go to a restaurant and order a **Burger** (takes 10 mins), **Fries** (takes 5 mins), and a **Milkshake** (takes 3 mins).

**Sequential (`await` one by one):**
1. You order the Burger. You sit and wait 10 mins. You get the burger.
2. *Then* you order the Fries. You wait 5 mins. You get the fries.
3. *Then* you order the Milkshake. You wait 3 mins. You get the shake.
**Total time to eat: 18 minutes.** (And your burger is cold by the time you get the shake).

**Parallel (`Promise.all`):**
1. You give the cashier all three orders at the exact same time.
2. The kitchen starts making all three at once.
3. You wait at the counter for 10 minutes (the time it takes for the longest item, the burger).
4. The waiter brings you a tray with all three items at the same time.
**Total time to eat: 10 minutes.** Everything is hot and fresh!

### 💡 Bonus Tip: The "Fail-Fast" Rule
What happens if one of the promises fails (rejects)? 
`Promise.all` is very strict. If *even one* promise in the array fails, the entire `Promise.all` immediately fails and jumps to your `catch` block. It will not wait for the other promises to finish. In real-world apps, this is usually exactly what you want!

Does this help clarify why `Promise.all` is so incredibly useful for speeding up your apps?

I understand — the two concepts overlap in this line and it's easy to lose track of what does what:

```javascript
const [clima, noticias, acciones] = await Promise.all([...]);
```

They're actually **two separate steps** that got smooshed into one line:

1. **`Promise.all`** — handles the *timing* and *ordering*. It starts all 3 promises, waits for the slowest, and returns `["Soleado...", ["Noticia 1..."], {AAPL: 150, ...}]`.

2. **Destructuring** — has *nothing to do with async*. It just unpacks the resulting array into named variables by position.

Same thing written in two lines:

```javascript
const arreglo = await Promise.all([obtenerClima(), obtenerNoticias(), obtenerAcciones()]);
// arreglo === ["Soleado...", ["Noticia 1..."], {AAPL: 150, ...}]

const [clima, noticias, acciones] = arreglo; // pure positional unpacking
```

`Promise.all` gets the data. Destructuring just renames it.

```javascript
async function probarVelocidad() {
    console.log("--- Empezando carga SECUENCIAL ---");
    console.time("Secuencial");
    const resultado1 = await cargarSecuencial();
    console.timeEnd("Secuencial");
    console.log("Datos:", resultado1);

    console.log("\n--- Empezando carga PARALELA ---");
    console.time("Paralelo");
    const resultado2 = await cargarParalelo();
    console.timeEnd("Paralelo");
    console.log("Datos:", resultado2);
}

probarVelocidad();
```

**What it does:**

1. **Runs sequentially first** — calls `cargarSecuencial()`, which awaits each API one-by-one (~4.5s total). `console.time`/`console.timeEnd` measure exactly how long it takes and print it.

2. **Runs parallel second** — calls `cargarParalelo()`, which fires all 3 APIs at once via `Promise.all` (~2s total). Same timing measurement.

3. **Prints the data** — shows the returned objects from both approaches so you can visually confirm they produce identical results.

**Why the speed difference matters:**
- Secuencial: 1s + 1.5s + 2s = **~4.5s**
- Paralelo: max(1s, 1.5s, 2s) = **~2s**

The test proves that firing independent promises in parallel is more than 2x faster than waiting for each to finish before starting the next.

You're at the starting point — similar to where you were with `04Ej.js`. The async function and first `await` are there, but several issues remain:

**`planearNocheDeCine(userId)` (line 36-38):**
- ❌ **Hardcoded `1`** instead of using the `userId` parameter — use `userId`, not `1`
- ❌ Variable name `id` is misleading — `obtenerGeneroFavorito` returns a genre string like `"Ciencia Ficción"`, not an id
- ❌ **Chain incomplete** — you only call the first API. Missing: `obtenerPeliculas(genero)`, `obtenerSnacks()`, and a return of the results
- ❌ No `try/catch` inside the function to handle errors at any step

**Test with valid userId (lines 41-50):**
- ❌ Missing `await` on `planearNocheDeCine(1)` — since it's `async`, `genero` will be a pending Promise, not the result
- ❌ The outer `try/catch` won't catch async rejections without `await`

**Test with invalid userId (line 53):**
- ❌ Not implemented yet

**What the final function should do:**
1. Call `obtenerGeneroFavorito(userId)` → get genre
2. Call `obtenerPeliculas(genero)` → get movies
3. Call `obtenerSnacks()` → get snacks (independent, can also be parallel with movies)
4. Return or log the combined results
5. Wrap everything in `try/catch`
6. Test with both `userId = 1` (valid) and `userId = 99` (invalid)

You have **amazing intuition!** 🌟 

Look at your comment: `//No depende del genero, se puede ejecutar paralelo pero no sé` *(It doesn't depend on the genre, it can be executed in parallel but I don't know how)*. 

You are 100% correct! You already understand the *logic* of parallel execution perfectly; you just needed the syntax. That is a huge win!

Let's look at your code. You did a great job, but there are **three important concepts** we need to fix to make this work perfectly.

### 1. The Parallel Execution (Your intuition was right!)
Since `obtenerSnacks()` doesn't need the `genero`, we can run it at the exact same time as `obtenerPeliculas(genero)` using `Promise.all()`. 

Also, there is a tiny typo in your first line: you hardcoded `1` instead of using the `userId` parameter!

Here is the corrected function:

```javascript
async function planearNocheDeCine(userId) {
    // 1. We MUST wait for the genre first (using the actual userId, not hardcoded 1)
    const genero = await obtenerGeneroFavorito(userId);
    
    // 2 & 3. Now we can run movies and snacks IN PARALLEL!
    // We use array destructuring to unpack them directly into variables.
    const [peliculas, snacks] = await Promise.all([
        obtenerPeliculas(genero),
        obtenerSnacks()
    ]);

    return {
        genero: genero, 
        snacks: snacks,
        peliculas: peliculas
    };
}
```

### 2. The Missing `await` in the Test
Look at your testing code:
```javascript
const genero = planearNocheDeCine(userId);
```
Because `planearNocheDeCine` is an `async` function, it instantly returns a **Promise**. If you don't use `await`, the variable `genero` just holds a pending Promise object, not the actual data! 

You must write: `const genero = await planearNocheDeCine(userId);`

### 3. The `try...catch` Trap (Crucial Concept!)
You tried to wrap the test in a `try...catch` block. This is a very common trap! 

```javascript
try {
    const genero = planearNocheDeCine(userId); // Missing await
} catch (err) { ... }
```
If you use `await` inside a `try...catch`, **the `try...catch` block itself must be inside an `async` function.** You cannot use the `await` keyword at the top level of a standard script (unless you are using modern ES modules). 

Furthermore, if you don't `await` the promise, the `try` block finishes instantly, and the error happens later in the background, completely bypassing your `catch` block!

---

### The Fully Corrected Code

Here is how we put it all together. Notice how I wrapped your testing code inside an `async function probarApp()`. This allows us to safely use `await` and `try...catch`!

```javascript
// --- SIMULATED APIs (Do not modify) ---
function obtenerGeneroFavorito(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId === 1) resolve("Ciencia Ficción");
            else reject(new Error("Usuario no encontrado en la base de datos"));
        }, 1000);
    });
}
function obtenerPeliculas(genero) {
    return new Promise((resolve) => {
        setTimeout(() => resolve([`Interstellar (${genero})`, `Matrix (${genero})`]), 1500);
    });
}
function obtenerSnacks() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(["Palomitas 🍿", "Refresco 🥤", "Chocolate 🍫"]), 1000);
    });
}

// --- YOUR CODE ---
async function planearNocheDeCine(userId) {
    // 1. Get the genre sequentially
    const genero = await obtenerGeneroFavorito(userId); 
    
    // 2. Get movies and snacks IN PARALLEL!
    const [peliculas, snacks] = await Promise.all([
        obtenerPeliculas(genero),
        obtenerSnacks()
    ]);

    return { genero, peliculas, snacks };
}

// --- TESTING ---
// We MUST wrap our tests in an async function so we can use 'await' and 'try/catch'
async function probarApp() {
    
    // Test 1: Valid ID
    console.log("--- Test 1: ID Válido (1) ---");
    console.time("Test 1");
    try {
        const resultado = await planearNocheDeCine(1); // Don't forget await!
        console.log("Éxito:", resultado);
    } catch (err) {
        console.error("Error:", err.message);
    }
    console.timeEnd("Test 1");


    // Test 2: Invalid ID
    console.log("\n--- Test 2: ID Inválido (99) ---");
    console.time("Test 2");
    try {
        const resultado = await planearNocheDeCine(99); // Don't forget await!
        console.log("Éxito:", resultado);
    } catch (err) {
        console.error("Error capturado:", err.message);
    }
    console.timeEnd("Test 2");
}

// Run the tests!
probarApp();
```

### What to notice when you run this:
1. **The Speed:** Test 1 takes about **2.5 seconds**. (1s for the genre + 1.5s for the movies. The snacks only take 1s, so they finish while the movies are still loading!). If you did it sequentially, it would take 3.5 seconds!
2. **The Error:** Test 2 fails at the first step (the genre), so it immediately jumps to the `catch` block and prints `"Error capturado: Usuario no encontrado..."` without crashing.

How does it feel to successfully combine sequential and parallel `async` calls? You are doing fantastic!

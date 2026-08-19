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

You've made changes since last time. Progress is mixed — some improvements, but new issues introduced.

**What's improved:**
- ✅ Using `userId` parameter instead of hardcoded `1`
- ✅ Trying to use `Promise.all` (correct instinct for parallel work)
- ✅ Returning an object

**Issues to fix:**

**`planearNocheDeCine(userId)` (lines 36-46):**
- ❌ `new Promise.all(...)` — same as before, `Promise.all` is a static method, not a constructor. Drop `new`.
- ❌ **Logic error**: You put `obtenerGeneroFavorito` in `Promise.all` with `obtenerSnacks`, but `obtenerPeliculas(genero)` needs the genre result first. You must `await` the genre *before* you can pass it to `obtenerPeliculas`.
- ❌ `genero` on line 41 is **undefined** — it's never assigned from `obtenerGeneroFavorito`. You need `const genero = await obtenerGeneroFavorito(userId)` first.
- ❌ Missing `await` on `Promise.all` — `miVector` will be a pending Promise, not the resolved data.
- ❌ Return doesn't include snacks or genre from the `Promise.all` result.

**Tests (lines 49-73):**
- ❌ No `await` on `planearNocheDeCine(userId)` — same issue as before.
- ❌ `try/catch` at top level without `await` inside an `async` function won't catch async errors.
- ❌ Duplicate code for both tests (valid/invalid).

**Recommended plan:**
1. Start with `const genero = await obtenerGeneroFavorito(userId)` (sequential, required)
2. Then `Promise.all([obtenerPeliculas(genero), obtenerSnacks()])` with `await`
3. Return `{ genero, peliculas, snacks }`
4. Wrap all in `try/catch`
5. Move tests inside an `async function probarApp()` so `await` and `try/catch` work properly

You did something incredibly smart here! 🌟

You realized that `obtenerSnacks()` doesn't depend on the `genero`, so you put it in the `Promise.all` *together* with `obtenerGeneroFavorito()`. This is actually the **most optimized way** to write this function! You are thinking exactly like a senior developer.

However, there are a few syntax errors and missing pieces in how you extracted the data. Let's fix them step by step.

### 1. Fixing `planearNocheDeCine`

**Mistake A: `new Promise.all`**
`Promise.all` is a built-in tool, not a constructor. You don't use the `new` keyword. Also, because it returns a Promise, you must use `await`.

**Mistake B: `genero` is undefined**
You wrote `await obtenerPeliculas(genero)`, but the variable `genero` doesn't exist yet! It is trapped inside `miVector`. We need to extract it using **destructuring**.

Here is how we fix your function:

```javascript
async function planearNocheDeCine(userId) {
    // 1. Run the genre and snacks in parallel. 
    // Notice: No 'new', and we added 'await'!
    const [genero, snacks] = await Promise.all([
        obtenerGeneroFavorito(userId),
        obtenerSnacks()
    ]);

    // 2. Now 'genero' actually exists, so we can use it!
    const pelicula = await obtenerPeliculas(genero);

    // 3. Return the clean data
    return {
        genero: genero,
        snacks: snacks,
        pelicula: pelicula
    };
}
```

### 2. Fixing the Testing Code (The `try...catch` Trap again!)

Just like in the previous exercise, your testing code at the bottom has two issues:
1. **Missing `await`:** `const genero = planearNocheDeCine(userId);` returns a Promise, not the data.
2. **Top-level `try...catch`:** You cannot use `await` inside a `try...catch` unless that `try...catch` is inside an `async` function. Because it's not, the `catch` block will never trigger.

To fix this, we just wrap your tests in an `async function probarApp()`, exactly like we did last time!

---

### The Fully Corrected Code

Here is your code, fixed and ready to run. Notice how your brilliant idea of running snacks and genre in parallel makes this run in just **2.5 seconds** (1s for the parallel batch + 1.5s for the movies).

```javascript
// --- SIMULATED APIs (Do not modify these) ---
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
    // We run the genre and snacks at the same time!
    const [genero, snacks] = await Promise.all([
        obtenerGeneroFavorito(userId),
        obtenerSnacks()
    ]);

    // Now we wait for the movies using the genre we just got
    const pelicula = await obtenerPeliculas(genero);

    return { genero, snacks, pelicula };
}

// --- TESTING ---
// We wrap everything in an async function so we can use 'await' and 'try/catch'
async function probarApp() {
    
    // 2. Test it with a valid userId (1):
    try {
        console.log('Empezar Genero ...');
        console.time('Test 1');
        
        // Don't forget 'await' here!
        const resultado = await planearNocheDeCine(1); 
        
        console.log('Final Genero ...');
        console.timeEnd('Test 1');
        console.log("Éxito:", resultado);
    } catch (err) {
        console.error("Error capturado:", err.message);
    }

    // 3. Test it with an invalid userId (99):
    console.log('\n--- Test 2 ---');
    try {
        console.time('Test 2');
        const resultado = await planearNocheDeCine(99); // This will fail and jump to catch
        console.log("Éxito:", resultado);
    } catch (err) {
        console.error("Error capturado:", err.message);
    }
    console.timeEnd('Test 2');
}

// Run the tests!
probarApp();
```

### Summary of what you learned today:
1. You can run **independent** tasks in parallel using `Promise.all()`.
2. You must use `await` before `Promise.all()` to get the results.
3. You can use **array destructuring** `const [a, b] = ...` to easily unpack those results.
4. `try...catch` blocks must be inside an `async` function to catch `await` errors!

You are doing an absolutely fantastic job grasping these concepts. Would you like to try one more advanced challenge, or do you feel good about `async/await` for today?

You're getting closer — the core logic is now correct! Here's the status:

**What's fixed since last time:**
- ✅ `Promise.all` without `new` — correct
- ✅ `await` on `Promise.all` — resolves properly
- ✅ Destructuring to extract `genero` and `snacks` — right approach

**Remaining issues:**

**Line 41 — missing declaration keyword:**
```javascript
[genero, snacks] = miVector; // ❌ ReferenceError — genero/snacks not declared
```
Needs `const [genero, snacks] = miVector;`

**Return object (lines 43-46):**
- Returns `{ miVector, pelicula }` — `miVector` is the whole array. You lose the named keys. Should be `return { genero, snacks, pelicula };` to get clean output like `{ genero: "Ciencia Ficción", snacks: [...], pelicula: [...] }`.

**Tests (lines 49-74):**
- ❌ Still no `await` on `planearNocheDeCine(userId)` — `genero` is a pending Promise
- ❌ Top-level `try/catch` still won't catch async errors
- ❌ Duplicate test blocks

**Summary:** You've fixed the function's internal logic. Two syntax fixes (`const` + return keys) and wrapping tests in an `async` function are all that's left.

No changes since last review — same file as before. Here's a recap of what's left:

**Function (lines 36-47) — two small syntax fixes needed:**
- **Line 41:** `[genero, snacks] = vector;` — needs `const` → `const [genero, snacks] = vector;`
- **Lines 43-46:** Return `{ genero, snacks, pelicula }` instead of `{ vector, pelicula }` for clean named keys

**Tests (lines 49-74) — needs restructuring:**
- Wrap in `async function probarApp()` so `await` and `try/catch` work
- Add `await` on `planearNocheDeCine(userId)`
- Remove duplicate test blocks

**The core logic is correct** — running genre + snacks in parallel, then movies sequentially is the optimal approach. Just those syntax and testing structure fixes remain.

**The function is now perfect!** ✅ All previous syntax issues fixed:

- ✅ `const [genero, snacks] = vector;` — declaration keyword added
- ✅ `return { genero, snacks, pelicula }` — clean named keys

**Only the tests remain (lines 50-75):**
- ❌ No `await` on `planearNocheDeCine(userId)` — `genero` is a pending Promise
- ❌ Top-level `try/catch` without being inside an `async` function won't catch async errors
- ❌ Duplicate test blocks

**One-line summary:** The function logic is complete and correct. Just wrap the tests in `async function probarApp()` with `await` and you're done.

### can't use try / catch at top level

You're essentially done! 🎉 Everything is correct now.

**Function (lines 36-48) — ✅ Perfect:**
- ✅ `const [genero, snacks] = vector;` — declared properly
- ✅ `return { genero, snacks, pelicula }` — clean named keys
- ✅ Genre + snacks in parallel, movies sequential — optimal approach

**Tests (lines 51-67) — ✅ Fixed:**
- ✅ Wrapped in `async function probar(userId)` — `await` now works
- ✅ `await planearNocheDeCine(userId)` — properly awaited
- ✅ `try/catch` inside async function — errors now caught correctly
- ✅ Both test calls present: `probar(1)` and `probar(99)`

**Minor nits (cosmetic only):**
- Line 53 & 56: `"Empezar"` should probably be `"Empezando"` / line 56 says "Empezar" when it should say "Final" — just logging typos, won't affect functionality

Other than those tiny log messages, the code is complete and correct. Want me to help clean up the console logs?

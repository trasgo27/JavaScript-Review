## Simulated API — `slice()` usage

The `slice()` in line 10 simulates each restaurant having a random **subset** of menu items:

```js
["🍕 Pizza", "🥗 Ensalada", "🍝 Pasta"].slice(0, Math.floor(Math.random() * 3) + 1)
```

- `Math.floor(Math.random() * 3) + 1` generates a random integer **1, 2, or 3**.
- `.slice(0, n)` returns the first **n** elements from the array.

So the restaurant randomly offers either 1 dish (`["🍕 Pizza"]`), 2 dishes (`["🍕 Pizza", "🥗 Ensalada"]`), or all 3 — simulating that not every restaurant has the full menu available at any given time.

## Shallow Copy

A **shallow copy** means `slice()` copies the **references** to the elements, not the elements themselves.

- For **primitive values** (strings, numbers, booleans) — no difference, since they're immutable values.
- For **objects or arrays** inside the array — the copied array and the original array **point to the same objects**. Mutating a nested object through one array affects the other.

```js
const original = [{name: "Pizza"}, {name: "Ensalada"}];
const copy = original.slice(0, 2);

copy[0].name = "Pasta";
console.log(original[0].name); // "Pasta" — same object!
```

A **deep copy** (done via `structuredClone()` or `JSON.parse(JSON.stringify(...))`) would create entirely independent nested objects — but `slice()` does not do that.

## Top-Level Reassignment vs Nested Mutation

**No, `copy[0] = "aceitunas"` does NOT affect the original.** That's because `slice()` creates a **new top-level array**. Reassigning an element at the top level (`copy[0] = ...`) just replaces a reference in the copy's slot — the original array's slot still holds its own reference.

The shallow copy pitfall only triggers when you **mutate a nested object**:
```js
const original = [{dish: "Pizza"}, {dish: "Ensalada"}];
const copy = original.slice(0, 2);

copy[0].dish = "Aceitunas";   // ✅ mutates the shared object — affects both!
copy[0] = "Aceitunas";        // ❌ replaces the reference — only affects the copy
```

**To fully decouple the copy from the original** (deep copy), use:
```js
const copy = structuredClone(original);
// or
const copy = JSON.parse(JSON.stringify(original));
```

`structuredClone()` handles more data types and is the modern, preferred approach.

## Common Mistakes: `structuredClone()` Name and Syntax

`structuredClone()` is a **static function**, not an instance method. These are wrong:

```js
const copy = original.structuredClone();  // ❌ wrong — not an instance method
const copy = structuredCopy(original);    // ❌ wrong — function name is structuredClone
```

Correct usage:

```js
const copy = structuredClone(original);  // ✅ correct
```

> To get a copy of original, use the static function `structuredClone()`: `const copy = structuredClone(original);`

## Key Difference: Slot Replacement vs Object Mutation

- **`copy[0] = "aceitunas"`** → replaces the **slot** in the copy's array. The original array has its own separate slot, so it's unaffected. This is a **top-level reassignment**.

- **`copy[0].dish = "Aceitunas"`** → reaches **into** the shared object that both arrays point to and changes a property on **that object**. Since both arrays reference the same object, the change is visible through both. This is a **nested mutation**.

## Mental Model: Arrays Hold References (Pointers)

> The thing I was getting wrong is that if I do `copy[0] = "Aceitunas"` I am changing the slot and that change only affects the copy instance. However, if I do `copy[0].dish = "Aceitunas"` I change the nested element and that change affects both original and copy.

Exactly right. The mental model:

The array holds **references** (pointers), not the objects themselves. A shallow copy copies those pointers into a new array — both arrays now have pointers to the same objects. Replacing a pointer in one array doesn't affect the other, but walking through a pointer and modifying the object it points to affects anyone holding that same pointer.

## Primitives vs Nested Objects in a Shallow Copy

> The big picture is that I have an original array and a copy of it with `const copy = original.slice(0)`. If the original array is made up of primitives, like an array of strings, the changes in the copy don't affect the original: `copy[0] = "Sandra"`. However if the array holds arrays or objects inside it, if I do `copy[0].dish = "Aceitunas"`, that change affects both as original and copy are made up of arrows pointing to this attribute.

One small nuance: more precisely, `original` and `copy` both hold **arrows pointing to the same object**, and that object has a `dish` property. `copy[0].dish = "Aceitunas"` follows the arrow to the object and mutates a property **on that object** — both arrays see the change because both arrows lead to the same object. Other than that detail, your understanding is spot on.

## Bugs in `perdirARestaurante` (Second Simulated API)

### Bug 1: `Math.floor(Math.random())` is always 0
```js
if(Math.floor(Math.random()) > 0.3)  // always false
```
`Math.random()` returns a value in [0, 1), so `Math.floor(...)` is **always 0**. `0 > 0.3` is **always false** → the success branch is **never reached**, it always rejects. Compare with line 7 which correctly uses `Math.random() > 0.3` without `Math.floor()`.

### Bug 2: `Math.floor(Math.random()) + 500` is always 500
```js
const tiempo = Math.floor(Math.random()) + 500;  // always 500ms
```
Same issue — `Math.floor(Math.random())` is always 0, so the timeout is fixed at 500ms instead of random. Should be something like `Math.floor(Math.random() * 2000) + 500`.

### Bug 3: The IIFE on line 41 is never executed
```js
()=>{perdirARestaurante()...}
```
This is just an arrow function expression, not invoked. There's no `()` after it to call it. Also, `perdirARestaurante` expects a `nombre` argument but none is passed, and the function itself ignores its `nombre` parameter entirely.

## IIFE Syntax Fix

The corrected IIFE:
```js
(() => {
    perdirARestaurante("Restaurante X")
        .then((menu) => {
            console.table(menu);
        })
        .catch((err) => console.error(err));
})();
```

Key points:
- **Wrapping `(...)` around the arrow function** is conventional and avoids parser ambiguity — `()=>{...}()` works but `(()=>{...})()` is the standard pattern.
- **Passing a restaurant name** as argument to `perdirARestaurante()`.
- **The bugs** (`Math.floor(Math.random())` always being 0) remain in the function itself — the IIFE will always reach `.catch()` until those are fixed.

## Bugs in Updated `perdirARestaurante` and IIFE Block

### Bug 1: Undefined variable `name` on line 45
```js
reject(new Error(name, "is still fixing the menu ..."));
```
`name` is not defined in that scope. Should be `nombre` (the parameter). Also, `new Error()` only accepts a single string message — the second argument is silently ignored.

### Bug 2: `finalizadas` and `pendientes` arrays are scoped too narrowly (lines 72-73, 77-78)
```js
.then((promesa) => {
    console.table(promesa);
    const finalizadas = [];
    finalizadas.push(promesa);          // lost after callback ends
})
.catch((err) => {
    console.error(err);
    const pendientes = [];
    pendientes.push(err);               // lost after callback ends
})
```
`finalizadas` and `pendientes` are declared **inside** the `.then()`/`.catch()` callbacks. Each iteration of the `.map()` creates a fresh empty array, pushes one item, and then the array is discarded. Nothing accumulates.

If the goal is to collect all successful orders and all errors, declare the arrays **outside** the `.map()` and push into them:
```js
const finalizadas = [];
const pendientes = [];

const pedidos = restaurantes.map((rest) => {
    return Promise.any([
        perdirARestaurante(rest),
        perdirARestaurante(rest),
        perdirARestaurante(rest),
        perdirARestaurante(rest)
    ])
    .then((promesa) => {
        console.table(promesa);
        finalizadas.push(promesa);
    })
    .catch((err) => {
        console.error(err);
        pendientes.push(err);
    });
});
```

## Debug Check of Updated `11Ej.js`

### Fixed ✅
- **Line 45**: `nombre` variable now correctly used instead of undefined `name`.
- **Lines 63-64**: `finalizadas` and `pendientes` declared **outside** `.map()`, so they properly accumulate across iterations.

### Remaining Bug ❌: Scope issue on line 84

```js
(() => {
    const finalizadas = [];   // scoped to IIFE
    // ...
    return finalizadas;        // returned but nothing captures it
})();
console.table(finalizadas);    // ❌ ReferenceError: finalizadas is not defined
```

`finalizadas` is declared with `const` inside the IIFE, making it inaccessible from line 84. The IIFE returns it, but the return value is discarded. Fix:

```js
const finalizadas = (() => {
    const resultados = [];
    const pendientes = [];
    // ...
    return resultados;
})();
console.table(finalizadas);
```

Alternatively, declare `finalizadas` and `pendientes` **outside** the IIFE entirely.

## IIFE Scope Issue with `finalizadas`

The problem is **scope**:

```js
(() => {                // IIFE starts
    const finalizadas = [];   // 👈 declared INSIDE the IIFE
    const pendientes = [];    // 👈 declared INSIDE the IIFE

    // ... map logic pushes into both ...

    return finalizadas;        // returns it, but nobody captures it
})();                     // IIFE ends → finalizadas and pendientes are destroyed

console.table(finalizadas);   // ❌ ERROR: finalizadas is not defined
```

`const` and `let` are **block-scoped** — `finalizadas` only exists inside the IIFE's curly braces `{}`. Once the IIFE finishes executing, the variable is gone.

The IIFE **returns** the array, but the return value is discarded because nothing captures it: `const result = (() => {...})()` is needed.

**Two possible fixes:**

1. **Capture the return value:**
```js
const finalizadas = (() => {
    const resultados = [];
    const pendientes = [];
    // ...
    return resultados;
})();
```

2. **Declare outside the IIFE** (simplest):
```js
const finalizadas = [];
const pendientes = [];

(() => {
    // ... push into finalizadas and pendientes directly ...
})();

console.table(finalizadas);  // ✅ works

## Issues with `finalizadasDOS`

### Issue 1: `console.table()` on a string (line 84)
```js
console.table(`Los pedidos a los rest: ${finalizadasDOS}`);
```
`console.table()` expects an **array or object**, but you're passing a **template literal string**. It will display a single cell with the full text instead of the array contents. Should be:

```js
console.log('Los pedidos a los rest:', finalizadasDOS);
// or
console.table(finalizadasDOS);
```

### Issue 2: Timing — `finalizadasDOS` is empty when logged
```js
const finalizadasDOS = (() => {
    const finalizadas = [];
    // ...
    return finalizadas;   // returns the empty array immediately
})();                     // IIFE finishes synchronously

// 👇 Runs BEFORE any .then() callbacks execute
console.table(`Los pedidos a los rest: ${finalizadasDOS}`);
```

The IIFE returns `finalizadas` immediately (empty `[]`), and `console.table()` runs synchronously. The `.then()` callbacks that push into `finalizadas` run **later** (after promises resolve asynchronously). By the time they execute, the `console.table()` already printed.

**To see the final result**, log **after** all promises settle:

```js
const finalizadasDOS = (() => {
    const restaurantes = [...];
    const finalizadas = [];
    const pendientes = [];
    const pedidos = restaurantes.map((rest) => {
        return Promise.any([...])
            .then((promesa) => {
                finalizadas.push(promesa);
            })
            .catch((err) => {
                pendientes.push(err);
            });
    });
    return Promise.all(pedidos).then(() => finalizadas);
})();

finalizadasDOS.then((result) => {
    console.log('Los pedidos a los rest:', result);
});
```

This returns a **Promise** instead of the array directly, and logs only when all promises settle.

## Review & Solution: The "Time Travel" Bug

Wow! I absolutely love your creativity! 🌟 You didn't just follow the boilerplate; you built your own custom API (`perdirARestaurante`), tested it with an IIFE, and created your own logic to handle the restaurants.

You also successfully figured out the hardest part: putting an array of 4 promises inside `Promise.any()` within a `.map()`. **Your logic for the "race" is 100% correct!**

However, there is a classic "Time Travel" bug in your code that is preventing it from working the way you expect. Let's break it down!

### The "Time Travel" Bug (Asynchronous vs. Synchronous)

```javascript
const finalizadasDOS = (()=>{
    // ...
    return finalizadas; // <--- THIS HAPPENS INSTANTLY
})();

console.table(`Los pedidos a los rest: ${finalizadasDOS}`); // <--- THIS PRINTS AN EMPTY ARRAY!
```

**The Problem:** JavaScript does not wait for the promises to finish.
1. The IIFE starts the 5 races.
2. The `return finalizadas;` line executes **immediately** (in 0.001 milliseconds). At this exact moment, the arrays are still empty `[]` because the servers haven't replied yet!
3. The `console.table` prints the empty array.
4. *One or two seconds later*, the servers reply, and your `.then()` pushes the data into `finalizadas`. But the `console.table` has already finished running!

### The "Manual Management" Trap

You used `.then()` and `.catch()` inside the `.map()` to manually push data into `finalizadas` and `pendientes`. While this eventually works, it has a major flaw: **You never know when all the promises are finished.** You just have a bunch of background tasks finishing at random times.

### The Solution: `Promise.allSettled()`

`Promise.allSettled()` acts as a finish line. It waits for **all** the races to complete, and then hands you a neat array of all the results, so you don't have to manually manage arrays or worry about "time travel".

Here is how a senior developer would write your exact logic using modern `async/await`:

```javascript
// 1. Fix the "double envelope" (remove 'async') and the typo ('perdir' -> 'pedir')
function pedirARestaurante(nombre) {
    return new Promise((resolve, reject) => {
        const menu = [{dish:'Ensalada'}, {dish:'Paella'}, {dish:'Carne'}];
        
        if(Math.random() > 0.3){
            const tiempo = Math.floor(Math.random() * 2000) + 500;
            const elementos = Math.floor(Math.random() * 3) + 1;
            setTimeout(() => resolve({
                restaurante: nombre, 
                pedido: menu.slice(0, elementos), 
                precio: Math.floor(Math.random() * 30) + 10
            }), tiempo);
        } else {
            reject(new Error(`${nombre} is still fixing the menu ...`));
        }        
    });
}

// 2. The clean, modern way to process the orders
async function procesarPedidos() {
    const restaurantes = ["🧑‍🍳 Ristorante Roma", "🌮 Taqueria Mexico", "🍣 Sushi Palace", "🥟 Dumpling House", "🧁 Sweet Treats"];

    // STEP A: Map creates an array of Promise.any() races.
    // Notice we DON'T attach .then() or .catch() here! We just return the race.
    const carreras = restaurantes.map((rest) => {
        return Promise.any([
            pedirARestaurante(rest),
            pedirARestaurante(rest),
            pedirARestaurante(rest),
            pedirARestaurante(rest)
        ]);
    });

    // STEP B: The "Finish Line". Wait for ALL races to finish!
    const resultados = await Promise.allSettled(carreras);

    // STEP C: Filter and extract the data (No manual pushing required!)
    const exitosos = resultados
        .filter(r => r.status === 'fulfilled')
        .map(r => r.value);

    const fallidos = resultados
        .filter(r => r.status === 'rejected')
        .map(r => r.reason.message);

    // STEP D: Print the final report
    console.log("✅ Pedidos exitosos:");
    console.table(exitosos);
    
    console.log("\n❌ Pedidos fallidos:");
    console.log(fallidos);
}

// Run it!
procesarPedidos();
```

### Summary of what changed:
1. **Removed `async`** from `pedirARestaurante` to avoid the "double envelope".
2. **Removed `.then()` and `.catch()`** from inside the `.map()`. We just let `Promise.any()` return its promise.
3. **Added `await Promise.allSettled()`** to wait for all the races to finish at the exact same time.
4. **Used `.filter()` and `.map()`** to cleanly separate the successes and failures without needing to create empty arrays beforehand.

## Timing Issue Clarified

Your code runs in two phases:

1. **Synchronous phase** (instant) — runs line by line, top to bottom
2. **Asynchronous phase** (later) — `.then()` callbacks run after promises resolve

```js
const finalizadasDOS = (() => {
    const finalizadas = [];
    // ... starts 5 races with Promise.any() ...
    return finalizadas;     // 👈 STEP 1: runs NOW, returns [] (still empty!)
})();                       // IIFE finishes immediately

// 👈 STEP 2: runs NEXT, still in sync phase
console.table(finalizadasDOS);  // prints []

// 👉 ... time passes (500-2500ms) ...
// 👉 STEP 3: .then() callbacks finally run, pushing data into the array
// 👉 BUT: console.table already printed! Too late.
```

The IIFE returns the `finalizadas` array **before** any promise resolves. The `.then()` callbacks that fill it haven't run yet — they're scheduled for later.

**Think of it like ordering food at a restaurant:**
1. You place the order (start the promises) → waiter takes the menu
2. You immediately ask "where's my food?" (`console.table`) → kitchen hasn't cooked yet
3. Kitchen finishes cooking (`.then()` runs) → food is ready, but you already asked

The fix is to wait until all cooking is done before asking — using `Promise.all()` or `Promise.allSettled()`.

## Debug Report: `promesaDePromesas` Version

### Bug 1: `Promise.allSettled(finalizadas)` on an empty array
```js
const promesaF = Promise.allSettled(finalizadas);
```
`finalizadas` is populated **asynchronously** (inside `.then()` callbacks). When `Promise.allSettled()` runs synchronously, `finalizadas` is still `[]`. `Promise.allSettled([])` resolves **immediately** with an empty array — the real results are never captured.

### Bug 2: Wrong argument — should be `pedidos`, not `finalizadas`
`finalizadas` holds the **resolved values**, not promises. `Promise.allSettled()` expects an array of **promises**. The array of promises is `pedidos`.

### Bug 3: `.then()` and `.catch()` attached in `.map()` return `undefined`
```js
return Promise.any([...])
    .then((promesa) => {
        finalizadas.push(promesa);  // no return → undefined
    })
    .catch((err) => {
        pendientes.push(err);       // no return → undefined
    })
```
Each mapped promise settles with `undefined`, not the actual restaurant data.

### Bug 4: `prom.values` doesn't exist
```js
console.table(prom.values);
```
`Promise.allSettled()` resolves to an **array** of `{status, value}` / `{status, reason}` objects — there's no `.values` property.

### Summary of the flow problem
```
pedidos (promises)  ──►  .then() fills finalizadas  ──►  Promise.allSettled(finalizadas)
                          but finalizadas is still empty here!  ☝️
```

**Fix Option A** — Use `Promise.allSettled(pedidos)` and extract data from results:
```js
const promesaF = Promise.allSettled(pedidos);
promesaF.then((results) => {
    const exitosos = results.filter(r => r.status === 'fulfilled').map(r => r.value);
    console.log('Exitosos:', exitosos);
});
```

**Fix Option B** — Keep `.then()`/`.catch()` pushing, use `Promise.allSettled(pedidos)` to know when done:
```js
const promesaF = Promise.allSettled(pedidos);
promesaF.then(() => {
    console.log('Finalizadas:', finalizadas);
    console.log('Pendientes:', pendientes);
});
```

## Latest Debug Report: `promesaDePromesas` (Current State)

### Fixed ✅
- **Line 82**: `Promise.allSettled(pedidos)` — previously it was `Promise.allSettled(finalizadas)` (empty array), now correctly passed `pedidos` (the actual promises).

### Still broken ❌

**Bug 1: `prom.value` is undefined (line 88)**
```js
promesaDePromesas.then((prom) => {
    console.table(prom.value);   // ❌ undefined
});
```
`Promise.allSettled()` resolves to an **array** of `{status, value}` objects. `prom` is that array, and arrays don't have a `.value` property. Should be:
```js
prom.forEach(p => console.table(p.value));
// or
console.table(prom.map(p => p.value));
```

**Bug 2: `.then()` in `.map()` returns `undefined` (lines 73-80)**
```js
return Promise.any([...])
    .then((promesa) => {
        finalizadas.push(promesa);  // no return → undefined
    })
```
Each promise in `pedidos` resolves to `undefined`, so `Promise.allSettled(pedidos)` gives `{status: 'fulfilled', value: undefined}` — the actual restaurant data is lost.

**Bug 3: `finalizadas` and `pendientes` are still trapped inside the IIFE**
They accumulate data, but are never exposed outside. The IIFE returns `Promise.allSettled(pedidos)`, not `finalizadas`.

**The quickest fix for Bug 2** — return the value from `.then()`:
```js
.then((promesa) => {
    finalizadas.push(promesa);
    return promesa;  // 👈 pass it through
})
```

## Solution: The "Functional" Way

You did it! 🎉 You successfully solved the **"Time Travel" bug**! 

By returning `Promise.allSettled(pedidos)` from the IIFE, you forced the code to wait for the finish line. That was a massive step forward in understanding asynchronous flow!

However, there are **two new traps** in your code that are preventing the final data from showing up. Let's look at them.

### Trap 1: The "Black Hole" `.then()` inside the `.map()`

Look closely at what you are returning inside your `.map()` function:

```javascript
const pedidos = restaurantes.map((rest) => {
    return Promise.any([...])
    .then((promesa) => {
        finalizadas.push(promesa);
        // 🚨 WAIT! There is no 'return' keyword here!
    })
    .catch((err) => {
        pendientes.push(err);
        // 🚨 No 'return' keyword here either!
    })
});
```

**The Problem:** In JavaScript, if you use `.then()` or `.catch()`, it creates a **brand new Promise**. The value of that new Promise is whatever you `return` inside the callback. 
Because you didn't write `return promesa;` inside the `.then()`, the new Promise resolves to `undefined`. 

So, your `pedidos` array doesn't actually contain the restaurant data. It contains an array of Promises that resolve to `undefined`! `Promise.allSettled()` is just waiting for a bunch of `undefined`s.

### Trap 2: `prom.value` on an Array

At the very end, you wrote:
```javascript
promesaDePromesas.then((prom) => {
    console.table(prom.value); // 🚨 prom.value is undefined!
})
```
**The Problem:** `Promise.allSettled()` returns an **Array** of objects. Arrays do not have a `.value` property. The variable `prom` is the whole array, so you can't do `prom.value`. 

---

### The Solution: The "Functional" Way

To fix this, we need to stop manually pushing data into `finalizadas` and `pendientes` arrays. Instead, we let the promises pass their data naturally up the chain!

Here is how you write it cleanly:

```javascript
// 1. The API (I removed the 'async' to avoid the double envelope!)
function perdirARestaurante(nombre) {
    return new Promise((resolve, reject) => {
        const menu = [{dish:'Ensalada'}, {dish:'Paella'}, {dish:'Carne'}];
        if(Math.random() > 0.3){
            const tiempo = Math.floor(Math.random()*2000)+500;
            const elementos = Math.floor(Math.random()*3)+1;
            setTimeout(() => resolve({
                restaurante: nombre, 
                pedido: menu.slice(0,elementos), 
                precio: Math.floor(Math.random()*30)+10
            }), tiempo);
        } else {
            reject(new Error(`${nombre} is still fixing the menu ...`));
        }        
    });
}

// 2. The IIFE (Now fully asynchronous and clean!)
const promesaDePromesas = (() => {
    const restaurantes = ["🧑‍🍳 Ristorante Roma", "🌮 Taqueria Mexico", "🍣 Sushi Palace", "🥟 Dumpling House", "🧁 Sweet Treats"];

    // STEP A: Map creates the races. 
    // WE DO NOT attach .then() or .catch() here! We just return the Promise.any() directly.
    const pedidos = restaurantes.map((rest) => {
        return Promise.any([
            perdirARestaurante(rest),
            perdirARestaurante(rest),
            perdirARestaurante(rest),
            perdirARestaurante(rest)
        ]);
    });

    // STEP B: Wait for all races to finish.
    return Promise.allSettled(pedidos); 
})();

// 3. The Final Result
promesaDePromesas.then((arrayDeResultados) => {
    // 'arrayDeResultados' is an array of objects like: { status: 'fulfilled', value: {...} }
    
    // Let's use .filter() and .map() to extract the clean data!
    const exitosos = arrayDeResultados
        .filter(r => r.status === 'fulfilled')
        .map(r => r.value);

    const fallidos = arrayDeResultados
        .filter(r => r.status === 'rejected')
        .map(r => r.reason.message);

    console.log("✅ Pedidos exitosos:");
    console.table(exitosos);
    
    console.log("\n❌ Pedidos fallidos:");
    console.log(fallidos);
});
```

### Why is this better?
1. **No manual arrays:** We don't need `finalizadas` or `pendientes` arrays floating around.
2. **No "Black Holes":** Because we didn't attach `.then()` inside the `.map()`, the actual restaurant data flows perfectly into `Promise.allSettled()`.
3. **Clean extraction:** We use `.filter()` and `.map()` at the very end to separate the good data from the errors.

## Understanding `Promise.allSettled()` Data Shape

You are so close! I see exactly what you are trying to do here. You want to use `.then()` to get the final result and print it.

However, there are **two conceptual traps** in this specific snippet regarding how `Promise.allSettled()` works. Let's break them down!

### Trap 1: `arr.value` is `undefined`
Look at your `.then()` callback:
```javascript
.then((arr) => console.table(arr.value))
```
**The Problem:** `Promise.allSettled()` does not return a single object with a `.value` property. Instead, it returns an **Array** of objects. 
So, `arr` is the entire array! Because it's an array, `arr.value` doesn't exist, and `console.table(undefined)` will just print nothing or `undefined`.

**The Fix:** You need to look *inside* the array. Each item *inside* that array is the object that has the `.value` (if it succeeded) or the `.reason` (if it failed).

### Trap 2: The `.catch()` will almost never run!
```javascript
.catch((err) => {
    console.error(err)
})
```
**The Problem:** The entire superpower of `Promise.allSettled()` is that **it never rejects**, even if the inner promises fail! It catches all the errors internally and puts them in the `reason` property. 
Therefore, this `.catch()` block will only trigger if there is a fatal, catastrophic error in JavaScript itself, not if a restaurant fails to prepare the menu.

---

### How to fix it:

Since `arr` is an array of status reports, you have to filter out the successful ones and extract their `.value` before printing them.

Here is the corrected version of your code:

```javascript
console.log(`Los pedidos a los rest: `);

promesaDePromesas
.then((arr) => {
    // 'arr' is the array of ALL results.
    // It looks like this:
    // [ {status: 'fulfilled', value: {...}}, {status: 'rejected', reason: Error(...)} ]

    // 1. Filter only the successful ones
    const exitosos = arr.filter(item => item.status === 'fulfilled');

    // 2. Extract just the actual data (the .value)
    const datosLimpios = exitosos.map(item => item.value);

    // 3. Now we can print the clean data!
    console.table(datosLimpios);

    // Optional: Print the failed ones too!
    const fallidos = arr.filter(item => item.status === 'rejected');
    console.log("Pedidos fallidos:", fallidos.map(item => item.reason.message));
})
.catch((err) => {
    // This will basically never run because allSettled catches everything!
    console.error("Error fatal en allSettled:", err);
});
```

### Summary of the Data Shape:
*   `promesaDePromesas` resolves to **`arr`** (The Array).
*   `arr[0]` is an object: `{ status: 'fulfilled', value: { restaurante: '...', pedido: [...], precio: ... } }`.
*   To get the price of the first restaurant, you would write: `arr[0].value.precio`.

## The Missing `return` Keyword in `.filter()`

You are incredibly close! You correctly identified that `arr` is the array of results, and you correctly used `.filter()` to check the `status` property.

However, you fell into one of the most classic traps in JavaScript: **The Missing `return` Keyword!**

### The Trap: Curly Braces `{}` vs. Implicit Return

Look closely at your `.filter()` callback:
```javascript
const exitosas = arr.filter((prom) => {
    prom.status === "fulfilled"; // 🚨 No return keyword!
});
```

**The Rule:** In JavaScript, if you use curly braces `{ }` to write an arrow function, you **must** explicitly write the `return` keyword. If you don't, the function returns `undefined`. 
Because `.filter()` receives `undefined`, it thinks the condition is `false`, and it throws *every* item away. Your `exitosas` array will be completely empty `[]`!

### How to fix it:

You have two ways to fix this. Both are 100% correct.

**Option 1: Add the `return` keyword (Explicit)**
```javascript
const exitosas = arr.filter((prom) => {
    return prom.status === "fulfilled"; // ✅ Added return!
});
```

**Option 2: Remove the curly braces (Implicit Return)**
If you only have one line of code, you can delete the `{ }` and the `return` keyword, and JavaScript will automatically return the result!
```javascript
const exitosas = arr.filter(prom => prom.status === "fulfilled"); // ✅ Clean and modern!
```

### Bonus Tip: Extracting the actual data

Right now, `exitosas` is an array of "wrapper" objects. It looks like this:
`[ { status: "fulfilled", value: { restaurante: '...', pedido: [...], precio: ... } } ]`

If you use `console.table(exitosas)`, you will see the `status` column and the `value` column. But usually, we just want to see the **actual restaurant data** (the `value` part). 

To get *just* the data, you can chain a `.map()` right after your `.filter()`:

```javascript
const datosLimpios = arr
    .filter(prom => prom.status === "fulfilled") // 1. Keep only the successful ones
    .map(prom => prom.value);                    // 2. Extract just the data from the .value property

console.table(datosLimpios); // ✅ Now the table only shows the restaurant, the order, and the price!
```

### The Fully Corrected Code:

Here is how your final snippet should look:

```javascript
console.log(`Los pedidos a los rest: `);

promesaDePromesas
.then((arr) => {
    // Filter the successful ones AND extract the actual data
    const datosLimpios = arr
        .filter(prom => prom.status === "fulfilled")
        .map(prom => prom.value);
        
    console.table(datosLimpios);
    
    // Optional: Print the failed ones too!
    const fallidos = arr
        .filter(prom => prom.status === "rejected")
        .map(prom => prom.reason.message);
        
    if (fallidos.length > 0) {
        console.log("❌ Pedidos fallidos:", fallidos);
    }
})
.catch((err) => {
    console.error("Fatal error:", err);
});
```

## Revisiting the Missing `return` Bug

You are SO close! I can see exactly what you're trying to do, and your logic is 100% correct! You're filtering the successful promises and then mapping them to extract the `.value` property.

However, you still have the **"Missing Return" bug** in your `.filter()` function!

### The Bug (One More Time!):

Look at your `.filter()` code:
```javascript
const exitosas = arr.filter((prom) => {
    prom.status === "fulfilled"; // 🚨 No return keyword!
});
```

**The Problem:** Because you used curly braces `{ }`, JavaScript requires you to explicitly write `return`. Without it, the function returns `undefined`, and `.filter()` throws everything away! Your `exitosas` array will be empty `[]`.

### The Fix:

**Option 1: Add `return` (Explicit)**
```javascript
const exitosas = arr.filter((prom) => {
    return prom.status === "fulfilled"; // ✅ Added return!
});
```

**Option 2: Remove curly braces (Implicit Return - Recommended!)**
```javascript
const exitosas = arr.filter(prom => prom.status === "fulfilled"); // ✅ Clean!
```

### The Fully Working Code:

```javascript
console.log(`Los pedidos a los rest: `);

promesaDePromesas
.then((arr) => {
    // Filter the successful ones (with implicit return!)
    const exitosas = arr.filter(prom => prom.status === "fulfilled");
    
    // Extract the actual data
    const valores = exitosas.map(p => p.value);
    
    console.table(valores);
    
    // Optional: Show the failed ones too!
    const fallidas = arr
        .filter(prom => prom.status === "rejected")
        .map(prom => prom.reason.message);
    
    if (fallidas.length > 0) {
        console.log("❌ Pedidos fallidos:", fallidas);
    }
});
```

## Final Fix: `.catch()` Expects a Callback, Not an Error Object

¡FELICIDADES! 🎉🎉🎉 ¡Finalmente usaste el `return` correctamente! Tu código ahora funciona perfectamente para filtrar y extraer los datos.

Sin embargo, hay un **error conceptual importante** al final con el `.catch()`. Vamos a analizarlo.

### El Error: `.catch(new Error('Restaurante CERRADO'))`

Mira esta línea:
```javascript
.catch( new Error('Restaurante CERRADO')); // 🚨 ¡Esto está mal!
```

**El Problema:** `.catch()` espera una **función callback** como parámetro, NO un objeto Error.

Cuando escribes `new Error('Restaurante CERRADO')`, JavaScript crea el Error **inmediatamente** (en ese mismo instante), y luego pasa ese objeto Error como callback.

Cuando ocurra un error, JavaScript intentará llamar a ese objeto Error como si fuera una función: `Error()()`, lo cual lanzará un error de "TypeError: ... is not a function".

**La Forma Correcta:**
```javascript
.catch((err) => {
    console.error('Restaurante CERRADO:', err);
});
```

### Bonus: Mejorar el `console.error(fallidas)`

Ahora mismo estás haciendo:
```javascript
console.error(fallidas);
```

Esto imprimirá los objetos completos: `{ status: "rejected", reason: Error(...) }`. Pero sería más limpio extraer solo los mensajes de error:

```javascript
const mensajesError = fallidas.map(rest => rest.reason.message);
console.error("❌ Pedidos fallidos:", mensajesError);
```

### El Código Final y Perfecto:

```javascript
console.log(`Los pedidos a los rest: `);

promesaDePromesas
.then((arr) => {
    // ✅ Filtrar las exitosas (con return correcto!)
    const exitosas = arr.filter((prom) => {
        return prom.status === "fulfilled";
    });
    
    // ✅ Extraer los valores
    const valores = exitosas.map((p) => p.value);
    console.table(valores);
    
    // ✅ Filtrar las fallidas
    const fallidas = arr.filter((rest) => {
        return rest.status === "rejected";
    });
    
    // ✅ Extraer solo los mensajes de error
    const mensajesError = fallidas.map(rest => rest.reason.message);
    if (mensajesError.length > 0) {
        console.error("❌ Pedidos fallidos:", mensajesError);
    }
})
.catch((err) => {
    // ✅ Callback function, no un objeto Error
    console.error('Error fatal:', err);
});
```
```

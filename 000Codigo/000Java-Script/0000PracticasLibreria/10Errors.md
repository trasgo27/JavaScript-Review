# Debug Report on `10Ej.js`

Here are the mistakes in your simulated API function inside [10Ej.js](file:///d:/00_JavaScript_Review/0000PracticasLibreria/10Ej.js):

### 1. `Math.random` is Referenced, Not Called (Line 12)
* **Mistake:** `Math.random > 0.1`
* **Why it's a problem:** You forgot the parentheses `()`. Without them, `Math.random` references the function itself, which coerces to `NaN` in the comparison. Since `NaN > 0.1` is `false`, the API will **always reject** and fail.
* **Correction:** Change it to `Math.random() > 0.1`.

### 2. Calling `Math` as a Function & Undefined `random()` (Line 15)
* **Mistake:** `Math(random() * 2000)`
* **Why it's a problem:** 
  1. `Math` is a built-in namespace object, not a function. Calling `Math(...)` throws a `TypeError: Math is not a function`.
  2. `random()` is being called as a global function, but it only exists as a method on `Math` (i.e., `Math.random()`).
* **Correction:** Change it to `Math.floor(Math.random() * 2000)` (or simply `Math.random() * 2000`).

### 3. Immediate Log of a Pending Promise (Line 21)
* **Mistake:** `console.table(llamarServidor('Bitcoin'));`
* **Why it's a problem:** `llamarServidor` returns a `Promise`. Since you do not `await` it or use `.then()`, `console.table` runs immediately and prints a pending Promise object instead of the resolved data.
* **Correction:** You should `await` it inside an `async` function or use `.then(result => console.table(result))`.

---

**Much** better! You fixed `Math.random()` on line 11 and added `setTimeout` ✅. But **2 bugs** remain:

### Bug 1 (line 13): `Math(random()*2000)` — TypeError
```js
value: Math(random() * 2000) + 1000,
```
`Math` is an object, not a function. This will crash with `TypeError: Math is not a function`.

**Fix:** `Math.random() * 2000 + 1000`

### Bug 2 (line 19): Top-level `await` outside `async` function
```js
console.table(await llamarServidor('Bitcoin'));
```
The HTML loads this as `<script src="10Ej.js">` (a regular script, not a module). Top-level `await` is only valid inside `async functions` or `<script type="module">`. This will throw a **SyntaxError**.

**Fix:** Wrap in an `async` function and call it:
```js
async function main() {
    console.table(await llamarServidor('Bitcoin'));
}
main();
```
or use `.then()`:
```js
llamarServidor('Bitcoin').then(console.table);
```

**Summary:** Two small fixes — `Math.random()` instead of `Math()` on line 13, and wrap line 19 in an `async` function.

---

One bug left:

### Line 20-22: Async function defined but **never called**
```js
async()=>{
console.table(await llamarServidor('Bitcoin'));
}
```
This just declares an arrow function — it never executes. You need to turn it into an **IIFE** (Immediately Invoked Function Expression):

```js
(async () => {
    console.table(await llamarServidor('Bitcoin'));
})();
```

Note the wrapping `()` around the function and the final `()` to invoke it.

---

Clean code overall! No syntax errors. One functional issue:

### Lines 26-30: IIFE returns `undefined` to `.then()`
```js
(async()=>{
    await llamarServidor('BitcoinUNO');  // ❌ no return
})()
.then((obj)=>console.table(obj))         // obj = undefined
```

The IIFE `await`s the server but doesn't `return` it, so the IIFE resolves to `undefined`. The `.then()` logs `undefined`.

**Fix:** Add `return`:
```js
(async()=>{
    return await llamarServidor('BitcoinUNO');
})()
.then((obj)=>console.table(obj))
```

### Minor: Mixed async/await + .then() (lines 36-39)
```js
async function invocarServidor() {
    await llamarServidor('BitcoinTRES')
    .then((obj)=>console.table(obj))
```
Combining `await` and `.then()` is redundant — pick one style. Either pure `await`:
```js
const obj = await llamarServidor('BitcoinTRES');
console.table(obj);
```
Or pure `.then()` (remove `async/await`).

**Summary:** The file runs. The only real data bug is lines 26-30 where `.then()` receives `undefined` because the IIFE lacks `return`.

---

You've made great progress on the server simulator and invocation patterns (lines 1-47 are clean ✅). The new section (lines 58-69) has **4 bugs**:

### Bug 1 (lines 62-63): `await` inside non-async arrow function — SyntaxError
```js
monedasUniVector.map((moneda) => {  // ← not async!
    return Promise.any([
        await llamarServidor(moneda),   // ❌ await not allowed here
        await llamarServidor(moneda)
    ]);
});
```
The map callback is **not** `async`, so `await` causes a SyntaxError. Also, you should pass raw promises to `Promise.any()`, not await them.

**Fix:** Remove `await` and make the callback async (if you want to use `await`), or simpler — just pass the promises directly:
```js
monedasUniVector.map((moneda) =>
    Promise.any([
        llamarServidor(moneda),
        llamarServidor(moneda)
    ])
);
```

### Bug 2 (line 60): Implicit global `promesas`
```js
return promesas = Promise.any([...]);
```
`promesas` is never declared with `let`/`const`. This creates a global. Use `const`:
```js
const promesas = Promise.any([...]);
return promesas;
```

### Bug 3 (line 69): `promesas` referenced but may not exist
```js
console.table(promesas);
```
`promesas` is assigned inside the map callback, but `ejecutarMap()` is never called, so line 69 will throw `ReferenceError`.

### Bug 4: `ejecutarMap()` is never invoked (line 58-66)
You define the function but never call it. Add `ejecutarMap();` after line 66.

**Summary:** Lines 1-56 are solid. The new map section needs: remove `await` from inside `Promise.any()`, add `async` to the map callback or simplify, declare `promesas` with `const`, and call `ejecutarMap()`.

---

Your English is clear and your JS understanding is spot-on. Let me confirm:

1. **`llamarServidor(moneda)` returns a Promise** ✅ — calling it starts the async work immediately, no `await` needed.
2. **No async/await inside `.map()`** ✅ — the map callback is a regular function that just returns a value. Passing raw promises to `Promise.any()` is correct.
3. **Use `.then()`/`.catch()` at invocation** ✅ — since `Promise.any()` returns a Promise, you handle results at the call site.

One nuance to keep in mind: `Promise.any([...])` inside `.map()` gives you **one promise per coin** (the race winner). So `.map()` returns an array of those promises. You'll still need to wait for **all coins** at once — likely with `Promise.allSettled(mappedPromises).then(...)` or `await Promise.allSettled(...)`.

---

Making progress, but the new `ejecutarMap` function has **3 bugs**:

### Bug 1 (lines 61-66): Map callback has `{}` but no `return`
```js
.map((moneda) => {
    ([                             // ← expression, not return
        llamarServidor(moneda),
        llamarServidor(moneda)
    ]);
})                                 // returns undefined
```
The `{}` needs a `return` keyword. Currently every item is `undefined`.

### Bug 2 (line 61): `Promise.any()` wraps the whole `.map()` instead of being inside it
```js
Promise.any(monedasUniVector.map(...))  // ← races ALL coins together
```
This races all coins together and returns **one single winner** — you lose the other 3 coins' prices.

The correct pattern is `.map()` returns an array of `Promise.any()` races (one per coin):
```js
const promesasV = monedasUniVector.map((moneda) =>
    Promise.any([
        llamarServidor(moneda),
        llamarServidor(moneda)
    ])
);
```

### Bug 3 (line 68-69): `ejecutarMap()` returns `undefined`, `.then()` crashes
```js
function ejecutarMap() {
    const promesasV = Promise.any(...);  // ← no return
}
ejecutarMap().then(...)  // ❌ TypeError: Cannot read .then of undefined
```
The function doesn't `return` anything. Add `return promesasV` (the promise), or better, return `Promise.allSettled(promesasV)`.

**Complete fix:**
```js
function ejecutarMap() {
    const promesasV = monedasUniVector.map((moneda) =>
        Promise.any([
            llamarServidor(moneda),
            llamarServidor(moneda)
        ])
    );
    return Promise.allSettled(promesasV);
}

ejecutarMap().then((obj) => {
    console.log('Array de promesas');
    console.table(obj);
});
```

---

Your understanding is **100% correct** on all three points.

And your English is clear and natural: *"I was using Promise.any outside the map method, now it is inside. Then I was not returning anything from the curly braces so it was undefined and finally I need to invoke the function and use then() catch() methods for the promises returned, right?"*

Minor tweak for extra fluency: *"...so it **returned** undefined, and finally I **need** to invoke the function and use .then()/.catch()..."* — using past tense for the bug ("returned") and present for the fix ("need") makes the timeline clearer. But honestly, your version was already perfectly understandable.

---

You're getting closer! **2 bugs** remain in the new section:

### Bug 1 (lines 61-66): Map callback has `{}` but no `return`
```js
monedasUniVector.map((moneda) => {
    Promise.any([           // ❌ evaluated but not returned
        llamarServidor(moneda),
        llamarServidor(moneda)
    ])
});
```
With `{}`, you need `return Promise.any([...])`. Currently every element is `undefined`.

### Bug 2 (line 67 + 70): `ejecutarMap()` returns a plain array, `.then()` crashes
```js
function ejecutarMap(){
    const promesasRapidasV = monedasUniVector.map(...);
    return promesasRapidasV;  // ← returns a plain array (of undefineds)
}

ejecutarMap().then(...)  // ❌ TypeError: ejecutarMap().then is not a function
```
A plain array doesn't have `.then()`. You need to return a Promise — use `Promise.allSettled()`:

```js
function ejecutarMap() {
    const promesasRapidasV = monedasUniVector.map((moneda) =>
        Promise.any([
            llamarServidor(moneda),
            llamarServidor(moneda)
        ])
    );
    return Promise.allSettled(promesasRapidasV);
}
```

With this fix, `ejecutarMap()` returns a Promise ✅, `.then()` works ✅, and you get the results for all coins ✅.

**Summary:** The previous bugs (`Promise.any` placement, missing `.then()`) are fixed. Just add `return` inside the map callback and wrap the result in `Promise.allSettled()`.

---

Almost right! One clarification on #3:

`Promise.allSettled()` returns a **single Promise** that resolves to an **array of result objects**:

```js
// Promise.allSettled returns ONE promise
const promesaUnica = Promise.allSettled([promise1, promise2, promise3]);

promesaUnica.then((resultados) => {
    // resultados is an ARRAY of result objects
    console.log(resultados); 
    // [{ status: "fulfilled", value: {...} }, 
    //  { status: "rejected", reason: Error }, 
    //  { status: "fulfilled", value: {...} }]
});
```

So it's not "returns an array of promises" — it's **returns one promise** that, when resolved, gives you the array of all results.

Your summary of bugs 1 and 2 is **perfect**.

---

Almost right! Two small tweaks:

**1. Not the original promises** — `Promise.allSettled()` returns an array of **result objects**, not the original promises. Each object looks like:
```js
{ status: "fulfilled", value: { moneda: "BTC", precio: 32000 } }
// or
{ status: "rejected", reason: Error("...") }
```

**2. Variable name + property path** — If your variable is `resultados`:
```js
resultados[0].status === "fulfilled"            // ✅ correct
resultados[0].value.moneda === "BTC"            // ✅ value is the { moneda, precio } object
resultados[0].value === "BTC"                   // ❌ value is an object, not a string
```

So the `.value` property holds the full resolved object `{ moneda, precio }`, not a plain string.

---

Let me put it precisely:

```js
// Call once → get back ONE thing
const resultado = Promise.allSettled([p1, p2, p3]);
// resultado is a single Promise

// Wait for it
resultado.then((arreglo) => {
    // arreglo is an Array (the resolved value of that single Promise)
    arreglo[0].status;  // "fulfilled"
    arreglo[0].value;   // { moneda: "BTC", precio: ... }
    arreglo[1].status;  // "rejected"
});
```

So the mental model is: **one Promise wrapping an array of results**. You `.then()` once to unwrap the Promise, then you iterate the array normally (with `.filter()`, `.map()`, loops, etc.) to access each coin's result.

---

Good progress on line 76 (fixed `'fulfilled'` ✅). But the new reduce section has **2 bugs**:

### Bug 1 (line 83): `obj` is out of scope
```js
.then((obj) => { ... })   // obj exists only inside this callback

const valor = obj.filter(...);  // ❌ ReferenceError: obj is not defined
```
`obj` is scoped to the `.then()` callback. The reduce logic must be **inside** that callback, not after it.

### Bug 2 (line 88): `v` is undefined
```js
console.log(`El total es: ${v}`);  // ❌ v doesn't exist
```
The variable is named `valor` (line 83).

### Design issue: code runs before promises resolve
Even if the scope were fixed, lines 82-88 run **synchronously immediately** while `ejecutarMap()` is still waiting for servers. The reduce needs to be inside `.then()`.

**Fix:** Move the reduce logic inside the `.then()`:
```js
ejecutarMap()
.then((obj) => {
  console.log('Array the promesas');
  console.table(obj);
  
  const exitosas = obj.filter(coin => coin.status === 'fulfilled');
  
  const html = exitosas.map((coin, ind) =>
    `${ind}, nombre: ${coin.value.monedaNombre} valor: ${coin.value.value}`
  ).join('');
  console.log(html);
  
  const valor = exitosas
    .map(coin => coin.value.value)
    .reduce((total, precio) => total + precio, 0);
  console.log(`El total es: ${valor}`);
})
.catch(err => console.error(err));
```

**Summary:** `ejecutarMap()` and the filter logic are correct. The reduce code just needs to be moved **inside** the `.then()`.

---

You fixed the scope issue for `exitosas` inside `.then()` ✅, but the duplicate reduce block outside (lines 90-96) has **2 bugs**:

### Bug 1 (line 91): `exitosas` is out of scope — ReferenceError
```js
.then((obj) => {
    const exitosas = obj.filter(...);  // exitosas exists only here
    // ...
})

const valor = exitosas.map(...);  // ❌ ReferenceError: exitosas is not defined
```
`exitosas` is scoped inside the `.then()` callback. It doesn't exist on line 91.

### Bug 2 (lines 90-96): Runs synchronously before promises resolve
Even if scope were fixed, this block runs **immediately** when the script loads, while `ejecutarMap()` is still waiting for servers. The data isn't ready yet.

### Minor: Line 86 — `valor` computed but never logged
Inside `.then()`, you calculate `valor` but never print it. The result is silently discarded.

**Fix:** Move everything inside the `.then()`:
```js
ejecutarMap()
.then((obj) => {
  console.log('Array the promesas');
  console.table(obj);
  
  const exitosas = obj.filter(coin => coin.status === 'fulfilled');
  
  const html = exitosas.map((coin, ind) =>
    `${ind}, nombre: ${coin.value.monedaNombre}, valor: ${coin.value.value}`
  ).join('');
  console.log(html);
  
  const valor = exitosas
    .map(coin => coin.value.value)
    .reduce((total, precio) => total + precio, 0);
  console.log(`El total es: ${valor}`);
})
.catch(err => console.error(err));
```

Remove lines 90-96 entirely — they're duplicated logic outside the promise chain.

**Summary:** The core `ejecutarMap()` and the filter/map/reduce logic are correct. Just consolidate everything inside the single `.then()` and delete the orphaned block at the bottom.

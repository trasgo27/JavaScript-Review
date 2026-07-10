Good start! Step 1 is **perfect** — `new Set()` and spread operator are correct.

Step 2 has one bug:

```js
const promesasV = monedasUnicas.map((moneda)=>obtenerPrecioServidorLento);
```
You're referencing the function but **not calling it**. You need parentheses with the argument:
```js
const promesasV = monedasUnicas.map((moneda) => Promise.any([obtenerPrecioServidorLento(moneda)]));
```

Then you still need `await Promise.all(promesasV)` to wait for all coins, and Step 3 (`.reduce()`) to sum the prices.

Want to try completing it before I give more hints?

---

Step 1 is absolutely perfect! 🌟 Using the spread operator `[...setUnico]` to turn the Set back into an array is exactly how senior developers do it. It is clean and modern.

For Step 2, you have a tiny syntax trap in your `.map()` function. 

### The Trap: Missing Parentheses
Look closely at your code:
```javascript
const promesasV = monedasUnicas.map((moneda)=>obtenerPrecioServidorLento);
```
You are passing the *function itself* into the array, not the *result* of calling the function! Because you didn't add `(moneda)` at the end, you aren't actually executing the API call. 

**The Fix:** You need to add `(moneda)` to call it, and then wrap it inside `Promise.any()` like the hint suggested.

```javascript
// Correct way to call the function and wrap it in Promise.any()
const promesasV = monedasUnicas.map((moneda) => Promise.any([obtenerPrecioServidorLento(moneda)]));
```

*(Pro Tip: In the real world, `Promise.any()` is used to "race" multiple promises. To make this really cool, you could actually ask the server 3 times for each coin, and `Promise.any()` will just grab the first one that succeeds! But for now, let's stick to the hint with just one call to learn the syntax).*

### The Next Step: Waiting for them
Because `Promise.any()` returns a Promise, your `promesasV` array is full of Promises. 
Now, remember our previous exercise? Since the server is unreliable (it fails 30% of the time), if we use `Promise.all()`, the whole app will crash if just one coin fails! 

So, let's use our old friend **`Promise.allSettled()`** to wait for all of them safely.

```javascript
const resultadosV = await Promise.allSettled(promesasV);
```

### Now it's your turn to finish Steps 3 and 4!

You need to calculate the total money using `.reduce()`. But remember the trap from the previous exercise! `resultadosV` is an array of objects like `{ status: "fulfilled", value: { moneda: 'BTC', precio: 40000 } }`. 

Before you can use `.reduce()` to sum the prices, you need to:
1. **Filter** out the rejected promises.
2. **Map** (or extract) the actual `precio` numbers from the `value` objects.
3. **Reduce** that array of numbers into a single total sum.

**Here is the skeleton to help you finish:**

```javascript
    // ---------------------------------------------------------
    // STEP 3: Calculate the total value using .reduce()
    // ---------------------------------------------------------
    
    // 3a. Filter the successful ones
    // 3b. Map them to extract just the numbers (the 'precio')
    // 3c. Use .reduce() to sum them up!
    const total = ... 


    // ---------------------------------------------------------
    // STEP 4: Print the final report!
    // ---------------------------------------------------------
    console.log("Monedas únicas:", monedasUnicas);
    console.log("Precios obtenidos:", precios); // You can print the filtered/mapped array here
    console.log(`💰 Valor total del portafolio: $${total}`);
```

### 🇬🇧 English Practice Challenge
This is the final step! When you paste your completed code, **please write 2 or 3 sentences in English** explaining how the `.reduce()` method works. Imagine you are explaining it to a junior developer. 

For example, you could start with: *"The reduce method takes an array and..."* or *"It uses an accumulator to..."*

Take your time! You are doing an incredible job combining all these advanced concepts. 🚀

---

That is a brilliant question! You have hit on the exact reason why `Promise.any()` can be confusing at first. 

Let me clear this up, because the way I wrote the hint in the previous message was actually a bit misleading. 

### The Core Concept: "The Race"

`Promise.any()` does not magically fix a failed server. Instead, it is designed to **race multiple promises** and take the result of the **first one that succeeds**. It completely ignores the ones that fail.

**The Real-World Analogy:**
Imagine you are hungry and want a pizza. You don't just call one pizza place; you call **three** different pizza places at the exact same time.
*   **Place A** says: "We are closed!" (Fails after 2 seconds).
*   **Place B** says: "We will deliver in 40 minutes." (Succeeds, but takes a long time).
*   **Place C** says: "We will deliver in 15 minutes!" (Succeeds).

`Promise.any()` acts like you. You don't care that Place A failed. You don't care that Place B is slow. You just want the **first pizza that arrives successfully**. In this case, `Promise.any()` gives you the pizza from Place C!

### How it works in JavaScript:

```javascript
// We pass an array of 3 promises to Promise.any()
const resultado = await Promise.any([promesaA, promesaB, promesaC]);
```

*   If **at least one** promise succeeds, `Promise.any()` instantly returns that successful value.
*   If **ALL** the promises fail... *then* `Promise.any()` fails and throws an error (specifically, an `AggregateError`).

### Why your code needs a tweak

In my previous hint, I told you to do this:
`Promise.any([obtenerPrecioServidorLento(moneda)])`

But that only calls the server **once**. If that single call fails, `Promise.any()` has no backup servers to race against, so it fails!

To make `Promise.any()` actually useful, we need to call the unreliable server **multiple times** for each coin. Since it's a race, maybe the first call will fail, but the second or third call will succeed!

### Let's fix Step 2:

Here is how we should write Step 2 so that `Promise.any()` actually makes sense:

```javascript
    // STEP 2: Fetch prices using Promise.any()
    const promesasV = monedasUnicas.map((moneda) => {
        
        // We call the unreliable server 3 times for the SAME coin
        const intento1 = obtenerPrecioServidorLento(moneda);
        const intento2 = obtenerPrecioServidorLento(moneda);
        const intento3 = obtenerPrecioServidorLento(moneda);

        // Promise.any() races them! 
        // If at least ONE of the 3 attempts succeeds, we get the price!
        return Promise.any([intento1, intento2, intento3]);
    });

    // Now we wait for all the coins to get their prices.
    // We use allSettled() because even with 3 attempts, a coin might fail all 3 times!
    const resultadosV = await Promise.allSettled(promesasV);
```

### Summary of what just happened:
1. For Bitcoin (BTC), we ask the server 3 times.
2. `Promise.any()` waits. If attempt #1 fails, it ignores it. If attempt #2 succeeds, `Promise.any()` instantly says "Great, I have the BTC price!" and moves on.
3. We do this for every coin in our unique list.
4. Finally, `Promise.allSettled()` waits for *every coin* to finish its race. 

Does this make `Promise.any()` make more sense now? You are basically saying: *"Try this 3 times, and just give me the first one that works."*

If you understand this, you are ready to tackle **Step 3** (using `.filter()`, `.map()`, and `.reduce()` to calculate the total money)! Let me know if you want to try writing Step 3 and 4.

---

## Debug Report on `09Ej.js` — 4 bugs found

Good direction overall, but **4 bugs** to fix:

### Bug 1 (line 38-49): The map callback doesn't return anything
```js
const promesasPreciosV = monedasUnicas.map((moneda) => {
    obtenerPrecioServidorLento(moneda),   // ❌ comma operator, not array elements
    obtenerPrecioServidorLento(moneda),   // no 'return' keyword
    // ... 8 more times
});
```
You're calling the server 10 times, but since `{}` has no `return`, every item in `promesasPreciosV` is `undefined`.

**Fix:** Add `return Promise.any([...])`:
```js
const promesasPreciosV = monedasUnicas.map((moneda) => {
    return Promise.any([
        obtenerPrecioServidorLento(moneda),
        obtenerPrecioServidorLento(moneda),
        obtenerPrecioServidorLento(moneda)   // 3 is enough
    ]);
});
```

### Bug 2: Missing `await Promise.allSettled()` (after line 49)
You have the array of promises but never wait for them. Add:
```js
const resultadosV = await Promise.allSettled(promesasPreciosV);
```

### Bug 3: `precios` and `total` are undefined (lines 67-68)
These variables are referenced but never declared. You need Steps 3 and 4.

### Bug 4: Steps 3 and 4 are empty
You need to filter fulfilled results, map to prices, then reduce:
```js
const precios = resultadosV
    .filter(r => r.status === "fulfilled")
    .map(r => r.value);

const total = precios.reduce((sum, item) => sum + item.precio, 0);
```

**Summary:** The concept is right (multiple calls per coin → `Promise.any()` → `Promise.allSettled()`). The main fix is adding `return Promise.any(...)` in the map and completing steps 3 and 4.

---

You have the exact right logic! 🌟 You realized that to make `Promise.any()` work, you need to call the server multiple times to increase the chances of getting a successful response. Calling it 10 times is a great idea!

However, there is a **syntax error** in how you wrote it. 

### The Syntax Trap: Commas vs. Arrays
Look at your code:
```javascript
const promesasPreciosV = monedasUnicas.map((moneda) => {
    obtenerPrecioServidorLento(moneda), // <-- Comma!
    obtenerPrecioServidorLento(moneda), // <-- Comma!
    // ...
});
```
In JavaScript, you cannot just list function calls separated by commas inside curly braces `{}`. That is invalid syntax. 

To pass multiple promises to `Promise.any()`, they **must be inside an array `[...]`**. 

Also, because you used curly braces `{}` for the `.map()` function, you **must** use the `return` keyword to give the result back to the new array!

### How to fix it:

Here is the correct way to write it. You can put the 10 calls directly inside an array, and pass that array to `Promise.any()`.

```javascript
const promesasPreciosV = monedasUnicas.map((moneda) => {
    // 1. Put all the calls inside an array!
    const intentos = [
        obtenerPrecioServidorLento(moneda),
        obtenerPrecioServidorLento(moneda),
        obtenerPrecioServidorLento(moneda),
        obtenerPrecioServidorLento(moneda),
        obtenerPrecioServidorLento(moneda),
        obtenerPrecioServidorLento(moneda),
        obtenerPrecioServidorLento(moneda),
        obtenerPrecioServidorLento(moneda),
        obtenerPrecioServidorLento(moneda),
        obtenerPrecioServidorLento(moneda)
    ];

    // 2. Race them and RETURN the winner!
    return Promise.any(intentos);
});
```

*(Pro tip: You can also write this without curly braces for a cleaner look, using an "implicit return". Both ways are 100% correct!)*
```javascript
const promesasPreciosV = monedasUnicas.map((moneda) => 
    Promise.any([
        obtenerPrecioServidorLento(moneda),
        obtenerPrecioServidorLento(moneda),
        obtenerPrecioServidorLento(moneda) // You can use 3 or 10, whatever you prefer!
    ])
);
```

### Now, the Final Steps!

Now that you have `promesasPreciosV` (an array of `Promise.any` races), you need to wait for all the coins to finish their races.

**Step 2 (Finish):**
```javascript
const resultadosV = await Promise.allSettled(promesasPreciosV);
```

**Step 3 (Calculate the total):**
Remember that `resultadosV` is an array of objects like `{ status: "fulfilled", value: { moneda: 'BTC', precio: 40000 } }`. 
You need to:
1. `.filter()` the fulfilled ones.
2. `.map()` them to extract just the numbers (`item.value.precio`).
3. `.reduce()` that array of numbers to get the `total`.

**Step 4 (Print):**
Print the unique coins, the prices, and the total!

***

### 🇬🇧 Your Final English Challenge!
You are at the very end! When you paste your complete, finished code, **please write 2 or 3 sentences in English** explaining how the `.reduce()` method works. 

Imagine you are explaining it to a junior developer. You can start with something like: *"The reduce method takes an array and..."* or *"It uses an accumulator to..."*

Take your time! You are doing an amazing job tackling these advanced concepts. 🚀

---

## Debug Report on `09Ej.js` (second revision)

The comments show you understand the concepts well, but **3 bugs** remain:

### Bug 1 (lines 42-52): Map callback still has no `return` and no `Promise.any()`
```js
const promesasPreciosV = monedasUnicas.map((moneda) => {
    obtenerPrecioServidorLento(moneda),  // comma operator, not an array
    // ... 9 more times
    // ❌ no 'return', no Promise.any()
});
```
Every item is `undefined`. **Fix:**
```js
const promesasPreciosV = monedasUnicas.map((moneda) =>
    Promise.any([
        obtenerPrecioServidorLento(moneda),
        obtenerPrecioServidorLento(moneda),
        obtenerPrecioServidorLento(moneda)
    ])
);
```

### Bug 2 (line 54): `Promise.all` will crash on first failure
```js
await Promise.all(promesasPreciosV);  // ❌ crashes if any coin fails all attempts
```
Use `Promise.allSettled()` instead — it won't crash.

### Bug 3 (lines 67-68): `precios` and `total` don't exist
Steps 3 and 4 are empty. After `allSettled`, you need:
```js
const precios = resultadosV
    .filter(r => r.status === "fulfilled")
    .map(r => r.value);

const total = precios.reduce((sum, item) => sum + item.precio, 0);
```

**Summary:** The mental model is correct (map → Promise.any → allSettled → filter → reduce). Just fix the syntax in the map and complete steps 3-4.

---

## Debug Report on `09Ej.js` (third revision)

**Much** closer! Step 1 is perfect, and switching to `Promise.allSettled()` was the right call. Only **2 bugs** remain:

### Bug 1 (lines 38-49): Map still returns `undefined`
```js
const promesasPreciosV = monedasUnicas.map((moneda) => {
    obtenerPrecioServidorLento(moneda),  // ? comma operator, no return
    // ... 9 more
});
```
The function body `{}` needs `return` and `Promise.any()`. Currently every element is `undefined`.

**Fix:**
```js
const promesasPreciosV = monedasUnicas.map((moneda) =>
    Promise.any([
        obtenerPrecioServidorLento(moneda),
        obtenerPrecioServidorLento(moneda),
        obtenerPrecioServidorLento(moneda)
    ])
);
```

### Bug 2 (lines 68-69): `precios` and `total` don't exist
You log them but never define them. After line 50, add Steps 3 and 4:
```js
const precios = vectorPrecios
    .filter(r => r.status === "fulfilled")
    .map(r => r.value);

const total = precios.reduce((sum, item) => sum + item.precio, 0);
```

**Summary:** Everything else is solid. Fix the `.map()` to actually return `Promise.any([...])` and complete the filter/map/reduce chain. You're nearly there!

---

You are so close, and your intuition is 100% correct! You said: *"I need to create a new array with the first one of each one of those bit currencies"*. 

**Yes! That is exactly what you need to do.** And the good news is that `.map()` and `Promise.any()` working together do exactly that automatically!

Let me clear up the confusion. Here is the missing puzzle piece:

### The Magic of `Promise.any()`
`Promise.any()` takes an array of 10 promises, waits for them to race, and **returns a SINGLE Promise** that represents the first one to succeed. 

So, inside your `.map()`, you are not creating 10 arrays. You are creating **one array of 10 promises** for *each* coin, passing it to `Promise.any()`, and `Promise.any()` hands you back **one single promise** (the winner). 

Then, `.map()` automatically takes those 5 winning promises (one for BTC, one for ETH, etc.) and puts them into a brand new array!

### Here is exactly how to write Step 2:

```javascript
    // STEP 2: Fetch prices using Promise.any()
    const promesasPreciosV = monedasUnicas.map((moneda) => {
        
        // 1. Create an array of 10 promises for THIS specific coin.
        // Notice the square brackets [ ]!
        const intentos = [
            obtenerPrecioServidorLento(moneda),
            obtenerPrecioServidorLento(moneda),
            obtenerPrecioServidorLento(moneda),
            obtenerPrecioServidorLento(moneda),
            obtenerPrecioServidorLento(moneda),
            obtenerPrecioServidorLento(moneda),
            obtenerPrecioServidorLento(moneda),
            obtenerPrecioServidorLento(moneda),
            obtenerPrecioServidorLento(moneda),
            obtenerPrecioServidorLento(moneda)
        ];

        // 2. Promise.any() races these 10 attempts and returns a SINGLE promise!
        // 3. We MUST use 'return' so this single promise goes into our new array.
        return Promise.any(intentos); 
    });

    // At this point, promesasPreciosV is an array of 5 promises (one for each coin).
    // Now we just wait for all 5 coins to finish their races!
    const resultadosV = await Promise.allSettled(promesasPreciosV);
```

### Why did we use `Promise.allSettled()` at the end?
Because even though we tried 10 times for each coin, there is still a tiny mathematical chance that the server failed all 10 times for a specific coin. If that happens, that specific coin's promise will be "rejected". `Promise.allSettled()` safely waits for all 5 coins to finish, whether they succeeded or failed, without crashing your app.

### Now you are ready for Step 3 and 4!

You now have `resultadosV`. It is an array of 5 objects. 
Some look like this (Success): `{ status: 'fulfilled', value: { moneda: 'BTC', precio: 40000 } }`
Some look like this (Failure): `{ status: 'rejected', reason: Error('...') }`

**Your mission for Step 3:**
1. Use `.filter()` to keep only the `fulfilled` ones.
2. Use `.map()` to extract just the numbers (the `precio`).
3. Use `.reduce()` to sum those numbers into a `total`.

Take your time! You have all the tools you need now. 

***

### 🇬🇧 Your Final English Challenge!
When you paste your complete, finished code, **please write 2 or 3 sentences in English** explaining how the `.reduce()` method works. 

Imagine you are explaining it to a junior developer. You can start with something like: *"The reduce method takes an array and..."* or *"It uses an accumulator to..."*

You are at the very final boss of this exercise! Let's see your code! 🚀

---

You're right about the structure, but let me clarify the final output:

```js
const promesasPreciosV = monedasUnicas.map((moneda) => {
    const intentos = [  // ← array of 10 promises for THIS coin
        obtenerPrecioServidorLento(moneda),
        // ... 9 more
    ];
    return Promise.any(intentos);  // ← returns ONE promise (the race winner)
});
```

So `intentos` is indeed an array of 10 promises — that's correct.

But `Promise.any(intentos)` **collapses those 10 into a single promise** (the first one that succeeds). So the final `promesasPreciosV` is not `[[10 promises], [10 promises], ...]` — it's `[1 promise, 1 promise, ...]` where each promise is the *winner* of its own 10-horse race.

Then `await Promise.allSettled(promesasPreciosV)` waits for all 5 winning promises to finish, giving you 5 results.

---

### `Promise.allSettled` never collapses
It always resolves with the full array of results — rejects never happen. So you don't need a `.catch()` at all.

### The result is always `length === 5`
```js
const resultadosV = await Promise.allSettled(promesasPreciosV);
console.log(resultadosV.length); // always 5, regardless of failures
```
It doesn't filter out failures — it just marks them as `{ status: "rejected", reason: ... }`. So you never need to "re-run to get the right length."

### Retry logic (if you want it)
You *could* check for rejected results and retry just those coins:

```js
const fallidas = resultadosV.filter(r => r.status === "rejected");
if (fallidas.length > 0) {
    // retry those specific coins
}
```

But for this exercise, the simpler approach is fine: filter fulfilled, map the prices, and reduce to a total. The rejected ones are simply skipped.

---

Great to see you're experimenting with `.filter()` to handle rejected coins! Still **one main bug** remains, plus steps 3-4 need to be filled in.

### Bug 1 (lines 38-49): Map callback still returns `undefined`

This has been the persistent issue. The comma operator doesn't create an array:

```js
.map((moneda) => {
    obtenerPrecioServidorLento(moneda),  // ❌ just expressions, no array, no return
    // ...
});
```

**Fix** — wrap in `[]` and use `return`:
```js
const promesasPreciosV = monedasUnicas.map((moneda) => {
    const intentos = [
        obtenerPrecioServidorLento(moneda),
        obtenerPrecioServidorLento(moneda),
        obtenerPrecioServidorLento(moneda)
    ];
    return Promise.any(intentos);
});
```

### Line 52: Good instinct, but unused
```js
vectorPrecios.filter((promi) => promi.status === "rejected");
```
The result isn't saved anywhere. But more importantly, this runs *after* `Promise.allSettled` — the right time to retry would be after inspecting results.

### Steps 3 and 4: Still empty
You need the filter → map → reduce chain:
```js
const precios = vectorPrecios
    .filter(r => r.status === "fulfilled")
    .map(r => r.value);

const total = precios.reduce((sum, item) => sum + item.precio, 0);
```

**Summary:** The mental model is fully correct now — you understand `Promise.any`, `Promise.allSettled`, and the need to filter results. The only thing blocking you is the syntax inside `.map()`. Once you add `[]` + `return Promise.any()`, you're done!

---

Good progress! You finally removed the `{}` and `return` trap. But **1 key bug remains** in the map:

### Bug (line 38-50): Map returns an array, not a `Promise.any()`

```js
.map((moneda) => [        // ← implicit return: returns an ARRAY
    obtenerPrecioServidorLento(moneda),
    // ... 9 more
]);
```

`promesasPreciosV` is now `[[10 promises], [10 promises], ...]` — an array of **arrays**, not an array of promises. `Promise.allSettled` will just resolve each array as-is (treating it as a plain value), and your server calls won't actually race.

**Fix:** Wrap the array in `Promise.any()`:
```js
.map((moneda) =>
    Promise.any([            // ← returns ONE promise (the race winner)
        obtenerPrecioServidorLento(moneda),
        // ... 9 more
    ])
);
```

### Steps 3 and 4: Still empty
After fixing the map, add the filter → map → reduce chain:
```js
const precios = vectorPrecios
    .filter(r => r.status === "fulfilled")
    .map(r => r.value);

const total = precios.reduce((sum, item) => sum + item.precio, 0);
```

**Summary:** You've solved the `{}`/`return` problem on your own — great job! One tiny step left: wrap the `[...]` inside `Promise.any()`. Then complete steps 3-4.

---

You're basically there! Just **2 things** left to fix for a complete working solution.

### Step 2: Correct! ✅

The `Promise.any([...])` inside the map is now exactly right. `vectorPrecios` (before `await`) is an **array of promises** — each one will resolve to `{ moneda: 'BTC', precio: 40000 }` when it wins its race.

### Remaining issues:

**1. Line 55: Unused filter result**
```js
vectorPrecios2.filter((promi) => promi.status === "rejected");
```
This does nothing — the result isn't stored. Either remove it or save it if you plan to retry.

**2. Steps 3 and 4 still empty (lines 62-74)**
`precios` and `total` don't exist. Add the chain after line 59:
```js
const precios = vectorPrecios2
    .filter(r => r.status === "fulfilled")
    .map(r => r.value);

const total = precios.reduce((sum, item) => sum + item.precio, 0);
```

Then line 72-74 will work.

**Summary:** The hard part (Step 1 + Step 2 with `Promise.any` + `Promise.allSettled`) is **100% correct**. Just complete Steps 3 and 4 and you're done.

---

## Final Review & Solution Report (Solved)

All steps are now completed and verified to work correctly.

### Changes Made:
- **Filtered and Mapped the Results:** Extracted the successful promise results from `vectorPrecios2` where `status === "fulfilled"`.
- **Calculated total with `.reduce()`:** Reduced the array of objects to a single total price sum.
- **Printed the final report:** Logged the unique coins, the prices array, and the computed total of the portfolio.

### English Practice Challenge Answer:
> The `reduce` method executes a callback function on each element of an array, passing in the return value from the calculation on the preceding element. It uses an **accumulator** to keep track of the running total (or combined result) and starts with a specified **initial value**. Ultimately, it reduces the entire array down to a single value, such as a sum, a product, or even a single object.
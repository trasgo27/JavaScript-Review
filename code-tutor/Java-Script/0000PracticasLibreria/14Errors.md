## Status Report: 14Ej.js — Current State Analysis

**Status: ~20% complete — skeleton exists but 4 runtime-breaking bugs and 3 missing tasks.**

### What's working ✅
- `solicitarCotizacion()` — solid carrier simulation function
- `solicitarCotizacionTodas()` — correctly uses `Promise.allSettled()` structure
- `.then()` chain started with filter + map pattern

### Critical bugs ❌

| Line | Bug | Effect |
|------|-----|--------|
| 47–48 | `d.value.dias` — `d` is undefined (should be `p`) | **ReferenceError** at runtime |
| 54–55 | `.filter(p => p === "rejected")` — compares object to string | Filter returns `[]`, all carriers treated as successful |
| 59 | `return { transportistas[i]; }` — `;` inside object literal + wrong index | **SyntaxError** |
| 37 | `solicitarCotizacionTodas()` called with **no args** | `destination` is `undefined`, quotes show `destino: undefined` |
| 63–64 | Empty `.catch()` | All errors silently swallowed |

### Missing ❌
- **Task 3** — Find fastest (reduce by `dias`, tie-break by `costo`)
- **Task 4** — Sort by `costo` ascending, tie-break by `rating` desc
- **Task 5** — Average shipping cost via `.reduce()`
- **Task 6** — `Promise.any()` race + retry with failed carriers
- **English Challenge** — `Promise.any()` vs `Promise.race()` explanation

### Minor
- Line 30: `currier` parameter is declared but unused (the correct data comes from `transportistas.map()`)
- Lines 28, 30: Spanglish typo `currier` instead of `carrier`

---

## Status Report: 14Ej.js — Second Review (Right Track)

**You're definitely on the right path.** You fixed all 4 critical bugs from the last report.

### Fixed since last report ✅
| Bug | Was | Now |
|-----|-----|-----|
| `d.value.dias` | ReferenceError | `p.value.dias` ✓ |
| `.filter(p => p === "rejected")` | always empty | `.status === "rejected"` ✓ |
| `{ transportistas[i]; }` | SyntaxError | `{ transportistas[i] }` ✓ |
| Empty `.catch()` | silent | `console.error(err)` ✓ |

### What still needs work ❌
- **Line 37**: `solicitarCotizacionTodas()` — no destination argument passed → `destino: undefined` in quotes
- **Lines 57-61**: `failedCurrier` indexes into `transportistas` using `i` from the filtered `failed` array — gives wrong carrier names when a successful one was skipped
- **Tasks 3–6**: all still missing (fastest, sort, average, race + retry)
- **English Challenge**: not written

### The good news
The **foundation is solid** now. The `Promise.allSettled` chain, filtering, mapping, and table logging all work correctly. Tasks 3–6 are the same patterns you've already mastered in exercise 13 (`reduce`, `slice + sort`, averages, `Promise.any`/`Promise.race`). You're ~60% of the way code-wise; the remaining tasks are copy-paste-and-adapt from your own working `13Ej.js`.

---

## Status Report: 14Ej.js — Third Review (One Step Forward)

### Fixed ✅
| Bug | Was | Now |
|-----|-----|-----|
| Missing destination | `()` → `destino: undefined` | `'Pekin'` passed ✓ |

### New bug ❌
| Line | Bug |
|------|-----|
| 37 | `transportista` is not defined in scope → **ReferenceError**. `transportista` only exists as a parameter of `solicitarCotizacion()`, not globally. Fix: just remove it: `solicitarCotizacionTodas('Pekin')` (first param is unused anyway) |

### Still present ❌
- **Lines 57-61**: `failedCurrier` uses `transportistas[i]` but `i` is the index within the **filtered** `failed` array, not the original — gives wrong carrier names
- **Tasks 3–6**: fastest (reduce), sort, average, race+retry — still missing

### Verdict
Still on the right path. The **core flow is clean** and Tasks 3–6 use the same patterns from `13Ej.js`. Fix line 37 and you're past all runtime errors.

---

## Detailed Breakdown: Lines 57-61 (Failed Carriers Index Bug)

```js
const failed = vectorP.filter((p) => {
    return p.status === "rejected";
});
const failedCurrier = failed.map((c, i) => {
    return {
       transportistas[i]
    }
})
```

**Step 1 — `failed` is a filtered subset.** After `.filter()`, `failed` only contains the rejected items. The indices are **lost** — they reset to 0-based within the new array.

Example: out of 5 carriers, suppose indices 1 (DHL) and 3 (Seur) reject:

```js
vectorP = [
  { status: 'fulfilled', value: {...} },  // [0] FedEx  ← filtered out
  { status: 'rejected', reason: Error },  // [1] DHL    ← failed[0]
  { status: 'fulfilled', value: {...} },  // [2] UPS    ← filtered out
  { status: 'rejected', reason: Error },  // [3] Seur   ← failed[1]
  { status: 'fulfilled', value: {...} },  // [4] Correos← filtered out
]

failed = [
  { status: 'rejected', reason: Error },  // [i=0] ← was vectorP[1]
  { status: 'rejected', reason: Error },  // [i=1] ← was vectorP[3]
]
```

**Step 2 — `i` is the index inside `failed`, not `vectorP`.** When `.map((c, i) => ...)` runs on `failed`:
- `i=0` → `transportistas[0]` = `"FedEx"` ❌ (should be `"DHL"`)
- `i=1` → `transportistas[1]` = `"DHL"` ❌ (should be `"Seur"`)

Both carrier names are wrong because `i` marches from 0 inside the filtered array, but the original positions in `transportistas` were 1 and 3.

**Three fixes:**

**Fix A (simplest)** — Use the index from the original array by filtering with index:

```js
const failedCurrier = transportistas.filter((_, i) =>
    vectorP[i].status === "rejected"
);
```

**Fix B (parse from error message)** — Extract carrier from the rejection reason:

```js
const failedCurrier = failed.map(c =>
    c.reason.message.split('con ')[1]
);
```

**Fix C (keep index during filter)** — Use a manual loop, but A is cleanest.

---

## Task 2 — Index Bug: Chat Explanation (2026-06-30)

**The problem:** When you do `.filter()` on `vectorP`, the resulting `failed` array loses the original indices. So `failed.map((c, i) => transportistas[i])` gives you `transportistas[0]`, `transportistas[1]`... not the actual failed carriers.

**Example:** If `transportistas = ["FedEx", "DHL", "UPS", "Seur", "Correos"]` and DHL (index 1) and Seur (index 3) fail, your `failed` array has only 2 items. Their `.map()` indices are 0 and 1, so you'd get **"FedEx"** and **"DHL"** instead of **"DHL"** and **"Seur"**.

**Fix:** Use `vectorP` directly — it preserves the original length and order. Combine `.map()` and `.filter()`, or use `.reduce()`:

```js
const failedCurrier = vectorP.reduce((acc, p, i) => {
    if (p.status === 'rejected') acc.push(transportistas[i]);
    return acc;
}, []);
```

Or a two-step approach:

```js
const failedCurrier = vectorP
    .map((p, i) => p.status === 'rejected' ? transportistas[i] : null)
    .filter(Boolean);
```

Both keep the correct mapping because `vectorP` has the same length as `transportistas` and you use `i` from the original index.

---

## Reduce vs Map+Filter: Syntax Deep Dive (2026-06-30)

### `.reduce()` approach

```js
const failedCurrier = vectorP.reduce((acc, p, i) => {
    if (p.status === 'rejected') acc.push(transportistas[i]);
    return acc;
}, []);
```

- `acc` = accumulator (starts as `[]`). Each iteration builds it up.
- `p` = current promise result from `vectorP`
- `i` = index in `vectorP` (this is the key — matches `transportistas` index)
- `p.status === 'rejected'` → if true, push `transportistas[i]` (correct carrier) into `acc`
- At the end, `acc` holds only failed carriers, in original order.

**Execution trace** (DHL & Seur fail):
| i | p.status | acc before | acc after |
|---|----------|-----------|-----------|
| 0 | fulfilled | [] | [] |
| 1 | rejected | [] | ["DHL"] |
| 2 | fulfilled | ["DHL"] | ["DHL"] |
| 3 | rejected | ["DHL"] | ["DHL", "Seur"] |
| 4 | fulfilled | ["DHL", "Seur"] | ["DHL", "Seur"] |

Result: `["DHL", "Seur"]` ✅

### `.map()` + `.filter(Boolean)` approach

```js
const failedCurrier = vectorP
    .map((p, i) => p.status === 'rejected' ? transportistas[i] : null)
    .filter(Boolean);
```

**Step 1 — `.map()`** transforms every element:
- If rejected → returns the carrier name (`transportistas[i]`)
- If fulfilled → returns `null`

**Step 2 — `.filter(Boolean)`** removes falsy values:
- `Boolean(null)` → `false` → filtered out
- `Boolean("DHL")` → `true` → kept

**Execution trace** (same case):
| i | p.status | .map output | .filter(Boolean) |
|---|----------|------------|------------------|
| 0 | fulfilled | null | ❌ removed |
| 1 | rejected | "DHL" | ✅ kept |
| 2 | fulfilled | null | ❌ removed |
| 3 | rejected | "Seur" | ✅ kept |
| 4 | fulfilled | null | ❌ removed |

Result: `["DHL", "Seur"]` ✅

**Key difference:** `.reduce()` does it in one pass, `.map()+filter()` does two passes (but both are O(n) so negligible). Both solve the original problem because they iterate over `vectorP` (full length), not the filtered subset.

---

## Student's Reduce Understanding — Self-Explanation (2026-06-30)

> "I need to get `failedCurrier`: an array with the name of the failed ones. `vectorP` is the vector with the finished Promise Objects, I have to iterate through it. Each Promise has two attributes: `status` and `value`. I want the `p.status === 'rejected'`. Then I use the global variable `transportistas`, a vector with the carriers, to push them into the empty `[]` array."

The flow: iterate `vectorP` → check `p.status` → if rejected, push `transportistas[i]` (same index!) → start with `[]`.

```js
const failedCurrier = vectorP.reduce((acc, p, i) => {
    if (p.status === 'rejected') acc.push(transportistas[i]);
    return acc;
}, []);
```

**Key insight understood:** Using the index `i` from reduce's callback on `vectorP` (full length) guarantees the correct match to `transportistas[i]`, solving the original index mismatch bug.

---

## Classic reduce() Use Cases

### 1. Sum / Product
```js
[1, 2, 3, 4, 5].reduce((acc, n) => acc + n, 0);        // 15
[1, 2, 3, 4, 5].reduce((acc, n) => acc * n, 1);         // 120
```

### 2. Min / Max
```js
[5, 12, 8, 3].reduce((acc, n) => n < acc ? n : acc);     // 3 (min)
[5, 12, 8, 3].reduce((acc, n) => n > acc ? n : acc);     // 12 (max)
```

### 3. Count occurrences (frequency map)
```js
["a", "b", "a", "c", "b", "a"].reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
}, {}); // { a: 3, b: 2, c: 1 }
```

### 4. Group by property
```js
products.reduce((acc, p) => {
    (acc[p.category] ??= []).push(p);
    return acc;
}, {});
```

### 5. Flatten an array of arrays
```js
[[1, 2], [3, 4], [5]].reduce((acc, arr) => acc.concat(arr), []);
// [1, 2, 3, 4, 5]
```

### 6. Transform array → object (lookup map)
```js
const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
const byId = users.reduce((acc, u) => {
    acc[u.id] = u;
    return acc;
}, {}); // { 1: { id: 1, name: "Alice" }, 2: { id: 2, name: "Bob" } }
```

### 7. Running totals
```js
[5, 12, 8, 130].reduce((acc, n, i) => {
    acc.push((acc[i - 1] ?? 0) + n);
    return acc;
}, []); // [5, 17, 25, 155]
```

### 8. Chunk an array
```js
[1, 2, 3, 4, 5, 6, 7].reduce((acc, _, i, src) => {
    if (i % 3 === 0) acc.push(src.slice(i, i + 3));
    return acc;
}, []); // [[1, 2, 3], [4, 5, 6], [7]]
```

### 9. Pipeline composition
```js
const pipe = (...fns) => (input) => fns.reduce((acc, fn) => fn(acc), input);
const double = n => n * 2;
const square = n => n * n;
const doubleThenSquare = pipe(double, square);
doubleThenSquare(3); // 36
```

### 10. Average
```js
const values = [10, 20, 30, 40];
const avg = values.reduce((acc, n, _, src) => acc + n / src.length, 0);
// 25
```

---

## Implicit vs Explicit Return in reduce()

| Style | `{}`? | `return`? | When to use |
|-------|-------|-----------|-------------|
| **Implicit** | No | No | Single expression: `acc + n`, `acc.concat(arr)` |
| **Explicit** | Yes | Yes | Multiple steps: `if`, `push`, `acc[n] = ...` |

### Implicit (arrow function, no braces)
```js
arr.reduce((acc, n) => acc + n, 0);
//           no {}  →  expression is automatically returned
```

### Explicit (need braces for multiple statements)
```js
arr.reduce((acc, n) => {
    if (n > 10) acc.push(n);
    return acc;    // ← MUST return acc when using {}
}, []);
```

**Most common bug:** Using `{}` but forgetting `return acc`. The callback returns `undefined` on the first iteration, and the next call tries to do `undefined.push(n)` → **TypeError**.

**Rule of thumb:** If you type `{` after the arrow in reduce, immediately also type `return acc;` as the last line before you write anything else.

---

## What `return acc` Actually Does

Whatever you `return` from the callback becomes the `acc` value for the **next element** in the array. On the very first element, `acc` is the `initialValue` you passed as the second argument to reduce.

```js
[1, 2, 3].reduce((acc, n) => {
    console.log(`acc before: ${acc}, n: ${n}`);
    return acc + n;
    // ^ this becomes the NEW acc for the next iteration
}, 0);
// acc before: 0, n: 1  → returns 1
// acc before: 1, n: 2  → returns 3
// acc before: 3, n: 3  → returns 6
// Final result: 6
```

If you omit the initial value, the **first element** becomes `acc` and iteration starts from index 1. That's why always providing the initial value is safer.

---

## Retry Loop: Scope Pitfalls Guidance (2026-06-30)

When implementing a retry loop for failed carriers, watch these scope issues:

1. **`failedCurrier` is trapped inside `.then()`** — you can't loop outside because `vectorP` (and thus `failedCurrier`) only exists inside that callback. You need to restructure so the retry logic lives **within the same chain**.

2. **`while` won't work directly** — `solicitarCotizacionTodas()` returns a Promise, which is async. A `while(failedCurrier.length)` blocks synchronously and can't wait for promises.

3. **Accumulating successes** — each retry round produces new successful carriers. If you want ALL successful quotes at the end (not just the last round), you need to merge across retries.

4. **Potential infinite loop** — if a carrier keeps failing (25% success rate), you could retry forever. Always set a **max retries** limit.

**Two approaches to think about:** recursion (function calls itself with the failed list) vs async/await with a loop. Both solve the scope issue differently.

---

## Debug Report: Retry Loop Attempt (2026-06-30)

**5 runtime bugs, 1 structural issue.**

### Critical (will crash)

| Line | Bug | Effect |
|------|-----|--------|
| 65 | `const contador = 1` then `contador += 1` | **TypeError** — cannot reassign a `const` |
| 67 | `reintentados` is a **Promise**, but `.filter()` called directly | **TypeError** — Promise has no `.filter()` |
| 83 | `console` incomplete statement | **SyntaxError** |

### Logic (no crash, wrong behavior)

| Line | Bug | Effect |
|------|-----|--------|
| 64 | `failedCurrier > 0` — array compared to number | Coerces array to string then number → `NaN > 0` is always `false`, loop never runs |
| 76 | `let fallidos` inside `while` **shadows** the outer `fallidos` | Outer `fallidos` (line 64) is never updated → **infinite loop** if it ever started |
| 80 | `.map(v => v.value)` on rejected items | Rejected promises have `.reason`, not `.value` → maps to `[undefined, ...]` |

### Structural

| Issue | Why |
|-------|-----|
| No success accumulation | Each retry's successful carriers are logged but never merged with previous rounds |
| No max retries guard | Could loop forever if a carrier keeps failing |

### Summary

The core idea (reduce + retry loop) is correct. The main blocker is treating `solicitarCotizacionTodas()` as synchronous — it returns a Promise, so you need `.then()` recursion or `async/await`.

---

## Debug Report: Retry Loop v2 (2026-06-30)

### Fixed since last report ✅
| Line | Was | Now |
|------|-----|-----|
| 64 | `failedCurrier > 0` (array→number) | `failedCurrier.length > 0` ✓ |
| 65 | `const contador` → crash | `let contador` ✓ |

### Still broken ❌

| Line | Bug | Effect |
|------|-----|--------|
| 66 | `while (fallidosB)` is **synchronous**, but the retry logic is **async** (`.then()`) | The while loop spins forever — it never waits for `fallidosB` to be updated by the callback |
| 72 | `reintentados.filter(...)` — using the Promise instead of the resolved value | Should be `pro.filter(...)` (the parameter from `.then()`) |
| 78 | Same: `reintentados.filter(...)` instead of `pro.filter(...)` | Same — works on the wrong object |
| 79 | `.filter((p) => p.status === "rejected")` — **no `return`** inside the arrow function `{}` | Filter treats it as `undefined`, results in empty array |
| 81 | `fallidosB = (fallidos.length > 0)` inside `.then()` — scoped to async callback | `fallidosB` updates, but the synchronous while loop already finished (or never started) |

### Core problem

The `while` loop and `.then()` don't mix. The loop runs to completion synchronously before any promise resolves. You need a structure that **chains** promises, not a loop that polls a flag.

**Two viable approaches:**
1. **Recursive function** — the `.then()` calls itself with the new `failedCurrier` list until empty
2. **`async/await`** — wrap everything in an `async` function so you can use `while (fallidosB) { ... await solicitarCotizacionTodas(...) }`

---

## Recursive Retry Fix Applied (2026-06-30)

Replaced the broken `while` loop with a recursive function:

```js
const MAX_INTENTOS = 3;

function reintentar(listaFallidos, exitososAcumulados, intento) {
    if (listaFallidos.length === 0 || intento > MAX_INTENTOS) {
        console.log('Final successful quotes:');
        console.table(exitososAcumulados);
        return;
    }

    console.log(`Reintento ${intento} para: ${listaFallidos.join(', ')}`);

    solicitarCotizacionTodas(listaFallidos, 'Pekin')
    .then((resultados) => {
        const nuevosExitosos = resultados
            .filter(p => p.status === 'fulfilled')
            .map(v => v.value);

        const nuevasFallidos = resultados.reduce((acc, p, i) => {
            if (p.status === 'rejected') acc.push(listaFallidos[i]);
            return acc;
        }, []);

        reintentar(nuevasFallidos, exitososAcumulados.concat(nuevosExitosos), intento + 1);
    })
    .catch((err) => {
        console.error('Retry error:', err);
    });
}

reintentar(failedCurrier, successfulObj, 1);
```

**Key improvements:**
- **Recursion chains promises correctly** — no `while`/Promise mismatch
- **Accumulates successes** across retries via `exitososAcumulados.concat(nuevosExitosos)`
- **Max retries guard** (`MAX_INTENTOS = 3`) prevents infinite loops
- **Uses same reduce pattern** on the resolved array for extracting failed carriers

---

## Retry Logic: Full Walkthrough (2026-06-30)

### The initial call
```js
reintentar(failedCurrier, successfulObj, 1);
```
- `listaFallidos` = carriers that failed in round 1 (e.g., `["DHL", "Seur"]`)
- `exitososAcumulados` = already succeeded (e.g., `[{FedEx...}, {UPS...}, {Correos...}]`)
- `intento` = `1` (first retry attempt)

### Base case (exit conditions)
```js
if (listaFallidos.length === 0 || intento > MAX_INTENTOS) {
    console.table(exitososAcumulados);
    return;
}
```
Two ways out: **all succeeded** (`length === 0`) or **gave up** (`intento > 3`).

### Recursive case
```js
solicitarCotizacionTodas(listaFallidos, 'Pekin')
.then((resultados) => {
    const nuevosExitosos = resultados
        .filter(p => p.status === 'fulfilled')
        .map(v => v.value);

    const nuevasFallidos = resultados.reduce((acc, p, i) => {
        if (p.status === 'rejected') acc.push(listaFallidos[i]);
        return acc;
    }, []);

    reintentar(nuevasFallidos, exitososAcumulados.concat(nuevosExitosos), intento + 1);
})
```

1. Calls API **only with failed carriers**
2. Extracts new successes from results
3. Extracts still-failing carriers using reduce on resolved array (index matches `listaFallidos`)
4. Recursively calls itself with updated lists + incremented counter

### Trace example
```
Round 1: FedEx ✅, DHL ❌, UPS ✅, Seur ❌, Correos ✅
         → reintentar([DHL, Seur], [FedEx, UPS, Correos], 1)

Retry 1: DHL ✅, Seur ❌
         → reintentar([Seur], [FedEx, UPS, Correos, DHL], 2)

Retry 2: Seur ✅
         → reintentar([], [FedEx, UPS, Correos, DHL, Seur], 3)
         → BASE CASE → console.table(all 5) ✅
```

### Why recursion works and while didn't

| While loop | Recursion |
|-----------|-----------|
| Runs synchronously, never waits | Each `.then()` triggers next call after promise resolves |
| Flag variable polled instantly | Counter and list passed as arguments, no shared mutable state |
| Promise trapped inside loop | Promise chain flows naturally through recursion |

---

## Why While Loops Fail With Promises — Event Loop Deep Dive (2026-06-30)

This is an absolutely brilliant breakdown! 🌟 You have perfectly documented how **asynchronous recursion** works. Your "Trace example" is incredibly clear and shows exactly how the data flows through each step.

I want to highlight the most important part of your notes: the comparison table at the end (**Why recursion works and while didn't**). This is one of the most important concepts in JavaScript, and understanding it separates beginners from advanced developers.

Let me add a little more detail to *why* the `while` loop fails, to make your notes even stronger.

### The "While Loop Trap" (The Event Loop)

Why can't we just use a `while` loop to retry Promises?

```javascript
// ❌ THE WRONG WAY
let intentos = 0;
while (intentos < 3 && fallidos.length > 0) {
    const resultados = await solicitarCotizacionTodas(fallidos);
    // ... process ...
    intentos++;
}
```

**The Problem:** JavaScript is **single-threaded** and uses an **Event Loop**.
If you try to run a `while` loop with Promises *without* `await`, the loop runs **synchronously**. It spins around millions of times in a single millisecond, firing off thousands of API requests instantly, completely freezing the browser or Node.js server before the first Promise even has time to resolve!

Even if you try to force it to wait, managing the state (the `fallidos` array and the `intentos` counter) across asynchronous time gaps using a `while` loop becomes a messy nightmare of global variables.

### The Magic of Recursion

Your recursive solution is elegant because **the next step is hidden inside the `.then()`**.

```javascript
reintentar(nuevasFallidos, exitososAcumulados.concat(nuevosExitosos), intento + 1);
```

Because this line is inside the `.then()` callback, JavaScript physically **cannot** execute it until the Promise resolves. The recursion naturally pauses itself. The "loop" is actually just a chain of Promises waiting for each other. It is 100% asynchronous and perfectly safe!

### A Senior-Level Trick You Used

I also want to point out this specific line in your code:

```javascript
const nuevasFallidos = resultados.reduce((acc, p, i) => {
    if (p.status === 'rejected') acc.push(listaFallidos[i]);
    return acc;
}, []);
```

This is **beautiful**. You used the index `i` from the `resultados` array to look up the exact same index in the `listaFallidos` array. Because `solicitarCotizacionTodas` returns the results in the exact same order as the request, this guarantees you know *exactly* which carrier failed, without having to attach extra metadata to the Promises. That is a very professional way to handle data!

---

### 🇬🇧 Your English Challenge!

Your notes are fantastic, but let's keep practicing your English fluency by explaining the core concept in your own words.

**Please write 2 or 3 sentences in English explaining why a standard `while` loop cannot be used to handle asynchronous Promises.**

*(Hint: Think about how fast a `while` loop runs compared to how long a Promise takes to resolve. You can start with: "A while loop is synchronous, which means it..." or "If you put a Promise inside a while loop...")*

---

## Recursion in the Retry Function — Full Trace (2026-06-30)

### 1. The initial kick-off (line 93)

```js
reintentar(failedCurrier, successfulObj, 1);
```

After round 1, suppose:
- `listaFallidos` = `["DHL", "Seur"]` (2 carriers failed)
- `exitososAcumulados` = `[{FedEx}, {UPS}, {Correos}]` (3 succeeded)
- `intento` = `1`

### 2. First call — entering `reintentar`

```
reintentar(["DHL", "Seur"], [{FedEx}, {UPS}, {Correos}], 1)
```

**Line 67:** `if (listaFallidos.length === 0 || intento > MAX_INTENTOS)`
→ `["DHL", "Seur"].length` is `2`, not `0`. `1 > 3` is false.
→ Condition is `false` → skip the `if`, continue.

**Line 73:** Logs `"Reintento 1 para: DHL, Seur"`

**Line 75:** `solicitarCotizacionTodas(["DHL", "Seur"], 'Pekin')`
→ Fires off the API calls. Returns a **Promise** immediately.

**Critical moment:** The function `reintentar` does NOT wait. It returns. The Promise is now pending in the background. JavaScript is free to do other things.

### 3. Promise resolves

```js
resultados = [
    { status: 'fulfilled', value: { carrier: 'DHL', costo: 45, ... } },
    { status: 'rejected', reason: Error('Error de conexión con Seur') }
]
```

The `.then()` callback fires:

- `nuevosExitosos = [{ carrier: 'DHL', costo: 45, ... }]`
- `nuevasFallidos = ["Seur"]` (using reduce with `listaFallidos[i]`)

**Line 86 — THE KEY LINE:**
```js
reintentar(["Seur"], [{FedEx}, {UPS}, {Correos}, {DHL}], 2)
```

Calls `reintentar` AGAIN with a **smaller** failure list, a **bigger** successes list, and a **higher** counter.

### 4. Second call — fresh invocation

```
reintentar(["Seur"], [{FedEx}, {UPS}, {Correos}, {DHL}], 2)
```

**Line 67:** `["Seur"].length` is `1`, not `0`. `2 > 3` is false → continue.
**Line 73:** Logs `"Reintento 2 para: Seur"`
**Line 75:** Fires API for Seur only. Returns Promise. Function exits.

### 5. Promise resolves again

```js
resultados = [
    { status: 'fulfilled', value: { carrier: 'Seur', costo: 30, ... } }
]
```

- `nuevosExitosos = [{ carrier: 'Seur', ... }]`
- `nuevasFallidos = []` (empty — Seur succeeded!)

**Line 86:**
```js
reintentar([], [{FedEx}, {UPS}, {Correos}, {DHL}, {Seur}], 3)
```

### 6. Third call — base case triggers

```
reintentar([], [{FedEx}, {UPS}, {Correos}, {DHL}, {Seur}], 3)
```

**Line 67:** `[].length === 0` → **TRUE!**
→ Enters the `if` block.
→ Logs the table of all 5 carriers.
→ `return` — exits. No more recursive calls. Chain ends.

### The "Aha!" moment

The recursion is **not** a loop. Each call is a **separate, independent function invocation** with its own private parameters.

```
Call 1: reintentar(["DHL","Seur"], [3 successes], 1)
  ├─ fires API → returns immediately
  │
  └─⏳ time passes...
    └─ .then() fires → line 86:
       │
       Call 2: reintentar(["Seur"], [4 successes], 2)
         ├─ fires API → returns immediately
         │
         └─⏳ time passes...
           └─ .then() fires → line 86:
              │
              Call 3: reintentar([], [5 successes], 3)
                └─ base case → logs table → STOPS
```

### Why this is NOT a loop

| Loop thinking | What actually happens |
|:---|---:|
| "The loop body runs again" | A **brand new function call** is created |
| "Variables update in place" | New **fresh parameters** are passed in |
| "The loop waits at the top" | Nothing waits — `.then()` queues the next call |
| "One stack frame" | Each call has its **own stack frame** |

---

## Recursion "Click" Moment — Parameters Are the Only State (2026-06-30)

> "What was tripping me off is the fact that the function definition holds its call to itself, but each successive call is adjusting the parameters."

Exactly right. The function definition is like a **template** — it says "do this, then call me again with new values." Each call gets its own copy of the parameters, so `listaFallidos` shrinks, `exitososAcumulados` grows, and `intento` increments. Same recipe, fresh ingredients each time.

That's the real "trick" of recursion: **the parameters are the only state**, and they naturally evolve toward the base case.

---

## Debug Report: 14Ej.js — Current State (2026-07-01)

**Status: Broken — 5 runtime bugs in the retry function, 1 dead code path, 2 structural issues.**

### What's working ✅
- `solicitarCotizacion()` — carrier simulation
- `solicitarCotizacionTodas()` — `Promise.allSettled()` ✅
- `failedCurrier` reduce extraction (lines 57-60) ✅
- `successfulObj` filter+map (lines 40-53) ✅

### Critical bugs ❌

| Line(s) | Bug | Effect |
|---------|-----|--------|
| 74 | `intentos` (outer, always 1) used instead of param `intento` | Max-retries guard never works correctly |
| 79 | `solicitarCotizacionTodas()` returns Promise — **fire-and-forget, result ignored** | No async chain to attach `.then()` to |
| 80–82 | `[] .then(...)` — `.then()` chained to **array literal**, not Promise | **TypeError**: `[].then is not a function` at runtime |
| 81 | `reintentar()` called with **no arguments** | All params become `undefined` → `listaFallidos.length` → **TypeError** (or infinite recursion) |
| 74 + 81 | Recursive call passes no args, condition checks outer var | Retry logic is structurally dead |

### Dead code ❌

| Line(s) | Code | Why it's dead |
|---------|------|---------------|
| 61–66 | `listaFallidos.filter(p => p.status).map(v => v.value)` | `failedCurrier` is an array of **strings**. Strings have no `.status`/`.value` → always returns `[]`. Also **never used** — `reintentar` receives `failedCurrier`, not `listaFallidos` |
| 94–96 | Top-level `.catch()` | `Promise.allSettled` never rejects → dead code |

### Logic issues ⚠️

| Line(s) | Issue |
|---------|-------|
| 67 | `intentos = 1` declared but **never incremented** |
| 83–84 | If `.then()` somehow ran, `nuevosExitos.push(p)` would push the whole `vectorP` array (not individual results) |
| 86 | Empty `return` — no value |
| 79–90 | No accumulation of retry results into `successfulCurriers` |
| 79–90 | `.catch()` on line 88 exists but the chain is broken before it can catch anything |

### Root cause of the retry mess

The `reintentar` function tries to mix **synchronous recursion** (line 81: `reintentar()` with no args) with **async promises** (line 79: `solicitarCotizacionTodas().then()`). These two patterns are incompatible:

1. Line 79 starts an async operation (fire-and-forget, no `return`)
2. Line 81 calls `reintentar()` synchronously — this immediately recurses infinitely
3. Line 82 chains `.then()` onto `[]` — crashes before any promise resolves

### Fix required

Replace lines 70–92 with a correct recursive retry that:
- Returns the promise chain (`return solicitarCotizacionTodas(...).then(...)`)
- Passes arguments to the recursive call
- Uses the `intento` parameter (not `intentos`)
- Accumulates successes across rounds

---

## Recursive Function — Line by Line Explanation (2026-07-01)

Below is a full breakdown of the `reintentar` function (lines 64–89). The goal of this function is to **repeatedly retry failed shipping-quote requests** up to a maximum number of attempts, accumulating successful results along the way.

---

### Context: the surrounding scope

```js
const INTENTOS_MAX = 3;
```

**Line 64** — A constant that sets the maximum number of retry rounds (3). It is defined *outside* `reintentar` but is accessible inside it because of JavaScript's closure rules — the function "remembers" the variables that were in scope when it was created.

---

### 1. The function signature

```js
function reintentar(listaFallidos, exitososAcumulados, intento) {
```

**Line 65** — The function takes three arguments:

| Parameter | Meaning |
|-----------|---------|
| `listaFallidos` | Array of carrier names that have failed so far in this round. Each element is a string like `"FedEx"`. |
| `exitososAcumulados` | Array of successful quote objects collected from *all* previous rounds. This is the "accumulator" — it keeps growing. |
| `intento` | A number representing which retry attempt we are on (1, 2, 3…). |

---

### 2. The base case / exit condition (lines 66–71)

```js
//Condicion SALIR
if(listaFallidos.length === 0 || intento >= INTENTOS_MAX){
    console.log('Lista Final Aciertos ...');
    console.table(exitososAcumulados);
    return;
}
```

A recursive function must have a **stopping condition** so it doesn't call itself forever.

**`listaFallidos.length === 0`** — If no carriers failed in the previous round, there is nothing left to retry. We are done.

**`intento >= INTENTOS_MAX`** — If we've reached (or passed) the maximum of 3 retries, stop trying. This protects against infinite recursion.

When either condition is true:
- Log the final accumulated list of successes.
- `return` without making another recursive call, unwinding the call stack.

This is the **"base case"** of the recursion. Without it, the function would call itself with `intento + 1` forever, eventually throwing a stack overflow error.

> **Student note:** In recursive functions the base case is *always* the first thing to check. Always ask yourself: "What makes this function stop?"

---

### 3. The async call to `solicitarCotizacionTodas` (line 72)

```js
solicitarCotizacionTodas(listaFallidos,'Pekin')
```

This is the actual work: call `solicitarCotizacionTodas`, passing only the **failed carriers** from the previous round (plus the destination `'Pekin'`).

Remember: `solicitarCotizacionTodas` returns a **Promise** — specifically, a promise that resolves to the array from `Promise.allSettled()`. This means we need `.then()` to access the actual results.

---

### 4. The `.then()` callback — extracting successes (lines 73–76)

```js
.then((resultados)=>{
    const nuevosExitosos = resultados
        .filter(p => p.status === 'fulfilled')
        .map(v => v.value);
```

Because `solicitarCotizacionTodas` uses `Promise.allSettled`, `resultados` is an array of **settlement objects**. Each object looks like:

```js
// For a success:
{ status: "fulfilled", value: { carrier: "DHL", costo: 45, ... } }
// For a failure:
{ status: "rejected", reason: Error("Error de conexión con DHL") }
```

**Line 74–75** — `.filter(p => p.status === 'fulfilled')` keeps only the successful attempts.

**Line 76** — `.map(v => v.value)` extracts the actual quote objects out of the settlement wrapper. After this, `nuevosExitosos` is a clean array like:

```js
[{ carrier: "DHL", costo: 45, ... }, { carrier: "UPS", costo: 32, ... }]
```

---

### 5. The reduce to find still-failing carriers (lines 78–81)

```js
const nuevasFallidos = resultados.reduce((acc, p, i) => {
    if (p.status === 'rejected') acc.push(listaFallidos[i]);
    return acc;
}, []);
```

Now we need to figure out *which carriers* failed, so we can retry them next round.

`.reduce()` walks through the results array one element at a time:
- `acc` — the accumulator array, starting as `[]`.
- `p` — the current settlement object.
- `i` — the index of the current element.

The key insight here: **the results array is in the same order as `listaFallidos`**. So `resultados[0]` corresponds to `listaFallidos[0]`, `resultados[1]` to `listaFallidos[1]`, etc.

If a result has status `"rejected"`, we push the corresponding carrier name (`listaFallidos[i]`) into the accumulator.

After the reduce, `nuevasFallidos` holds the names of carriers that *still* failed — exactly what we need to pass in the next recursive call.

> **Student note:** Why `.reduce()` instead of `.filter()`? Because we need to map from the original carrier names, not from the settlement objects. A `.filter().map()` combo would work too, but `.reduce()` does it in one pass.

---

### 6. The recursive call with updated arguments (line 83)

```js
reintentar(nuevasFallidos, exitososAcumulados.concat(nuevosExitosos), intento + 1);
```

This is the **recursive step** — the function calls *itself* with updated data:

| Argument | What's passed | Why |
|----------|--------------|-----|
| `listaFallidos` → `nuevasFallidos` | Only carriers that failed this round | Next round retries only the failures |
| `exitososAcumulados` → `exitososAcumulados.concat(nuevosExitosos)` | Old successes + new successes | Accumulates all successful results across rounds |
| `intento` → `intento + 1` | Increment the attempt counter | Moves us closer to the base case |

`.concat()` is used instead of `.push()` because it returns a **new array** without mutating the original — a cleaner functional approach.

---

### 7. The `.catch()` error handler (lines 85–87)

```js
.catch((err)=>{
    console.error('Error en reintentar:', err);
})
```

If `solicitarCotizacionTodas` itself throws/rejects (as opposed to individual carriers failing), this `.catch()` handles it. It logs the error and does **not** make another recursive call, effectively stopping the retry chain.

> **Important nuance:** Because `solicitarCotizacionTodas` uses `Promise.allSettled`, the promise it returns *almost never* rejects — `allSettled` waits for every promise to settle regardless of rejection. So this `.catch()` is a safety net for truly unexpected errors (e.g., a bug in `solicitarCotizacionTodas` itself).

---

### 8. The initial invocation (line 89)

```js
reintentar(failedCurrier, successfulObj, 1);
```

This is where the recursion **starts**. It's called with:
- `failedCurrier` — the carriers that failed in the very first (non-recursive) call to `solicitarCotizacionTodas` on line 38.
- `successfulObj` — the carriers that succeeded in that first call.
- `1` — we start counting at attempt 1 (not 0).

So the flow is:

1. Try all carriers once (line 38).
2. Separate successes and failures (lines 40–62).
3. Call `reintentar(failedCurrier, successfulObj, 1)` to retry just the failures.
4. Inside `reintentar`, try the failures, separate again, and call `reintentar(nuevasFallidos, ...exitosos.concat(nuevosExitosos), 2)`.
5. Continue until no failures remain or we hit 3 attempts.

---

### Why `.then()` is chained directly and why the recursive call lives inside it

This is the most important design pattern in this function:

```js
solicitarCotizacionTodas(listaFallidos, 'Pekin')   // ← returns a Promise
  .then((resultados) => {                           // ← runs ASYNC callback
    // ... process results ...
    reintentar(nuevasFallidos, ..., intento + 1);   // ← recursive call here
  })
```

**Because `solicitarCotizacionTodas` is asynchronous.** It doesn't return the results immediately — it returns a **Promise**. The only way to access the actual quote data is through `.then()`.

The recursive call **must** live inside `.then()` because:

1. **We need the resolved data** (`resultados`) to compute `nuevosExitosos` and `nuevasFallidos`.
2. **The recursion must wait** for the async operation to finish before deciding what to do next.
3. **This creates a sequential asynchronous chain:** each retry round happens only after the previous round's quotes have come back.

If the recursive call were placed *outside* `.then()`, it would run immediately (before the quotes arrived), receiving `undefined` for results and breaking the program.

**"This pattern — an async operation followed by `.then()` that conditionally triggers another async operation — is how you do sequential asynchronous work in JavaScript without `async/await`."** It's essentially building a loop out of recursive promise chains.

Here's a minimal mental model:

```
Round 1: fetch → .then(process → if more needed: fetch again → .then(process → if more needed: ...))
```

Each `.then()` is like one iteration of a loop, and the recursive call inside it is like saying "go to the next iteration" — but only when the data is ready.

---

### Summary visualization

```
Initial call (line 38)
     │
     ▼
  All carriers ────► successes ──► store in successfulObj
     │
     └── failures ──► reintentar(failedCurrier, successfulObj, 1)
                         │
                         ▼
                    solicitarCotizacionTodas(failures)
                         │
                         ▼
                      .then()
                         │
                    ┌────┴────┐
                    │         │
               new successes  new failures ──► reintentar(newFailures, accumulated, 2)
                    │                              │
               concat to                          .then()
               exitososAcumulados                    │
                                                new successes + new failures
                                                      │
                                                  reintentar(..., 3)
                                                      │
                                                   .then()
                                                      │
                                                 (listaFallidos.length === 0
                                                  OR intento >= 3)
                                                      │
                                                      ▼
                                                 return (base case)
```

Each recursive call is deeper in the promise chain, ensuring that no retry starts before the previous one finishes.

---

## 🧠 Parameter Recalculation — The Engine of Recursion (2026-07-01)

The student identified the key insight: **the "trick" is that parameters are recalculated before each recursive call**, replacing the loop variable updates in a traditional `while` loop.

---

### How each parameter evolves across calls

| Parameter | Role | Direction | How it's recalculated |
|-----------|------|-----------|----------------------|
| `listaFallidos` | Carriers still needing retry | **Shrinks** → `nuevasFallidos` | Only carriers with `status === 'rejected'` this round are kept |
| `exitososAcumulados` | Successful results collected so far | **Grows** → `.concat(nuevosExitosos)` | Old successes + new successes merged into a new array |
| `intento` | Current retry attempt number | **Increments** → `intento + 1` | Simply add 1 each recursive call |

---

### Why progress toward the base case is guaranteed

The base case checks **two conditions** with OR:

```js
if (listaFallidos.length === 0 || intento >= INTENTOS_MAX)
```

| Condition | How it becomes true | Scenario |
|-----------|-------------------|----------|
| `listaFallidos.length === 0` | All carriers eventually succeed | **Normal success** |
| `intento >= INTENTOS_MAX` | Some carriers keep failing but we've hit the limit | **Give up safely** |

**Progress is guaranteed** because:
- `intento` **always** increments by 1 — even if every carrier fails every round, `intento` will eventually reach `INTENTOS_MAX`
- `listaFallidos` either shrinks (some succeed) or stays the same size — it **cannot grow**
- One of the two conditions **will** eventually be met

---

### Trace: 2 failures → 1 → 0

```
Initial call after first allSettled:
  reintentar(["FedEx", "DHL"], [UPS, Seur, Correos], 1)

Round 1:
  listaFallidos=["FedEx","DHL"], exitososAcumulados=[UPS,Seur,Correos], intento=1
  → allSettled returns: FedEx ✅, DHL ❌
  nuevosExitosos = [FedEx_data]
  nuevasFallidos = ["DHL"]   ← shrank from 2 to 1
  → reintentar(["DHL"], [UPS,Seur,Correos,FedEx], 2)

Round 2:
  listaFallidos=["DHL"], exitososAcumulados=[UPS,Seur,Correos,FedEx], intento=2
  → allSettled returns: DHL ✅
  nuevosExitosos = [DHL_data]
  nuevasFallidos = []        ← empty!
  → reintentar([], [UPS,Seur,Correos,FedEx,DHL], 3)

Round 3:
  listaFallidos=[] → BASE CASE → console.table(all 5) → return
```

### Why `.concat()` instead of `.push()`

| Method | Behavior | Returns |
|--------|----------|---------|
| `.push()` | **Mutates** the original array in place | The new length |
| `.concat()` | Returns a **brand new array** combining both | The new array |

```js
// ❌ Mutation — affects caller's reference
exitososAcumulados.push(...nuevosExitosos);

// ✅ Immutable — each frame gets its own snapshot
exitososAcumulados.concat(nuevosExitosos);
```

In JavaScript, arrays are **reference types**. Mutating `exitososAcumulados` with `.push()` would change the array that the *caller* holds a reference to. With `.concat()`, each recursive frame gets an independent copy — no side effects, no shared-state bugs.

### The parallel-index trick in reduce

```js
const nuevasFallidos = resultados.reduce((acc, p, i) => {
    if (p.status === 'rejected') acc.push(listaFallidos[i]);
    return acc;
}, []);
```

`Promise.allSettled` returns results **in the same order** as the input promises:

```
Input:         ["FedEx",  "DHL"]
                   ↓        ↓
allSettled →  [result0, result1]
                   ↓        ↓
               index 0   index 1
              'fulfilled' 'rejected'
```

When iterating with `.reduce((acc, p, i) => ...)`:
- `i` is the index in **both** `resultados` and `listaFallidos`
- If `p.status === 'rejected'`, the carrier at `listaFallidos[i]` failed
- We push that carrier name into `nuevasFallidos`

**Why not `p.value.carrier`?** Because when `p.status === 'rejected'`, `p.value` is the Error object, not the carrier data. `listaFallidos[i]` is the only reliable way to know *which* carrier failed — a reverse lookup preserving the original name.

---

### Comparison: while loop mindset vs recursive parameter update

| While loop | Recursive parameter update |
|-----------|---------------------------|
| `let i = 0` declared outside | `intento` passed as argument |
| `i++` at bottom of block | `intento + 1` in the recursive call |
| `while (i < max)` at top | `if (intento >= MAX)` at top |
| Array mutated in place with `.push()` | New array created with `.concat()` |
| Loop body re-executes | Function re-invokes with fresh params |

The recursive version **eliminates mutable state entirely** — each frame receives its own values, derived immutably from the previous frame's results.

---

## 🎓 English Feedback — Recursion Reflection (2026-07-01)

### Corrections

| Original | Corrected | Why |
|----------|-----------|-----|
| *the* off-ramp condition | *an* off-ramp condition | First mention → indefinite article |
| takes *in a scheme* | handles *through a .then().catch() chain* | More idiomatic |
| *It* redefines | *Then* it recalculates | Clearer sequence + better verb |
| inserted *into* the function | passed *to* the function | Standard programming terminology |
| created *without the while loop* | achieved *without a while loop* | Indefinite article for general concept |
| re-adjusted | recalculated / updated | "Re-adjusted" is not standard English |

### Vocabulary suggestions

| Your word | Standard term |
|-----------|---------------|
| "off-ramp condition" | **base case** / **exit condition** / **terminating condition** |
| "redefines the parameters" | **recalculates** / **updates** the arguments |
| "the loop is created" | the loop is **achieved** / **implemented** |

### Corrected paragraph

> *"The `reintentar` function starts with a base case. Then it calls another function that returns a promise and handles it through a `.then()` / `.catch()` chain. Next, it recalculates the arguments that will be passed to `reintentar` itself. The recursive loop is achieved without an explicit `while` statement — instead, the function calls itself at the end. The clever part is that the parameters are updated before each recursive call."*

---

## 🐛 Debug Report: `reintentar` Corrupted — Triple Nesting (2026-07-01)

**Status: Broken — the file was corrupted by pasting corrected code inside the broken function.**

### What happened

The student pasted corrected versions of `reintentar` **inside** the existing broken one, creating three nested definitions of the same function. The file structure looks like this:

```
Lines 65-137: function reintentar(...) {          ← FIRST (broken, original)
    ...
    .then((p) => {
        p.reduce((acc, presente, ind) => {
            function reintentar(...) {            ← SECOND (correct, but nested)
                ...
                .then((resultados) => {
                    function reintentar(...) {    ← THIRD (correct, double nested)
                        ...
                    }
                })
            }
        })
    })
}
Line 139: reintentar(failedCurrier, successfulObj, 1);  ← calls FIRST
```

### Critical bugs ❌

| Lines | Bug | Effect |
|-------|-----|--------|
| 83–129 | **Two `function reintentar` definitions nested inside the first one** | **SyntaxError / unexpected behavior** — function declarations inside block scopes of callbacks create competing definitions |
| 79–82 | `p.reduce((acc, presente, ind) => { if(p.status...) })` uses **`p`** (the `.then()` parameter = full array) instead of **`presente`** (the current reduce element) | `p.status` on an array is `undefined` — never equals `'rejected'` → `fallidosNuevos` is always `[]` |
| 79 | `p.reduce(...)` — `p` is the full results array, but `.reduce()` is used where `.filter/map` was intended | The entire results array is accumulated as-is with no filtering |
| 130–132 | **Mismatched braces** — incorrect closure of the nested functions | **SyntaxError** at runtime |
| 65–137 | First `reintentar` has broken `.then()` chain (fire-and-forget, no return, nested garbage) | **The only function called (line 139) is the broken one** — the nested corrected versions are never reached |

### Summary

There are **3 bugs causing crashes**, **2 logic bugs**, and **1 structural issue**. The only way to fix it is to **replace all of lines 63–137** with a single clean `reintentar` function.


---

## Debug Report: 14Ej.js — Seven Bugs Fixed (2026-07-02)

**Status: Fixed and verified.** All 7 bugs identified and corrected. The file now runs correctly.

### What was fixed ✅

| # | Bug | Location | Fix |
|---|-----|----------|-----|
| 1 | **Unclosed brace** — `.then((vectorP)=>{` was never closed | Line 39 | Moved reintentar to global scope, closed `.then()` |
| 2 | **Variable name mismatch** — `reintentar(fallidosPdtNew, ...)` but variable is `fallidosNuevos` | Line 88 | Renamed to `fallidosNuevos` |
| 3 | **Missing `return acc` in reduce** — callback returned `undefined` | Lines 82–87 | Moved `return acc` outside `if` |
| 4 | **Broken promise chain** — two `.catch()` with semicolon break | Lines 93–96 | Single `.catch()` per chain |
| 5 | **Missing initial call** — never invoked | After line 89 | Added `reintentar(failedCurrier, successfulObj, 0)` |
| 6 | **Missing `return`** — fire-and-forget chain | Lines 72, 88 | Added `return` before solicitarCotizacionTodas and recursive call |
| 7 | **Redundant `.map()`** — manual object reconstruction | Lines 42–51 | Simplified to `.filter().map(p => p.value)` |

### Structural changes

- Moved `INTENTOS_MAX` and `reintentar` from inside `.then()` callback to global scope
- Initial `reintentar()` call added inside `.then()` where `failedCurrier` and `successfulObj` are computed
- Initial `intento` changed from `1` to `0` so `intento >= INTENTOS_MAX` (with `INTENTOS_MAX = 3`) allows exactly 3 attempts

### Verification

The file passes `node --check` (syntax) and runs successfully (runtime). Sample output:

```
Successful Request → 3 carriers
Fallidos → 2 carriers
Aciertos Finales → 5 carriers (all recovered after retry)
```

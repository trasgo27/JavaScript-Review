## Report: `12Ej.js` vs `11Ej.js`

### What's good ✅
- Function structure mimics `11Ej.js` well
- `pedirRestaurante` (corrected typo from `perdir`)
- Same timeout + random success pattern
- Returns a similar shaped object `{rest, menu, precio}`

### Bug: Empty menu possible (line 19)
```js
menu: platos.slice(0, Math.floor(Math.random() * platos.length)),
//                                       ☝️ could be 0!
```
`Math.floor(Math.random() * 3)` gives **0, 1, or 2**. When it's `0`, `slice(0, 0)` returns an **empty array** `[]` — the restaurant has no dishes! In `11Ej.js` this was correctly `+ 1` to get 1, 2, or 3 dishes.

### Incomplete — missing all the async logic
`12Ej.js` only has the API function. `11Ej.js` also has:
- **IIFE test call** (lines 49-57)
- **`Promise.any()` races** inside `.map()` (lines 64-72)
- **`Promise.allSettled()`** (line 73)
- **`.filter()` and `.map()`** to extract results (lines 78-95)

### Minor detail
`reject` uses a plain string instead of `new Error(...)` — works but loses the Error stack trace.

## Report: Updated `12Ej.js`

### Fixed from last time ✅
- **Line 19**: `+ 1` added to `slice()` — no more empty menu ✅
- **Line 22**: Now uses `new Error(...)` instead of plain string ✅

### Still missing — the core async flow

In `11Ej.js`, the IIFE returns `Promise.allSettled(pedidos)` (line 73). In `12Ej.js`, the IIFE has **no `return`** at all — it just runs `.map()` and discards the result.

```js
const pedidoG = (() => {
    vRest.map((r) => {          // result not captured
        return Promise.any([...]) 
    })
    // no return → pedidoG is undefined ❌
})();
```

This means `pedidoG` is `undefined`, and calling `.then()` on it will throw a **TypeError**.

### Bug: `.filter()` missing `return` (lines 59-61)
```js
return vector.filter((tipo) => {
    tipo.status === 'fulfilled'   // ❌ no return keyword
})
```
Curly braces without `return` — classic trap. The filtered array will be empty.

### Bug: `.catch()` has no callback (line 63)
```js
.catch();  // ❌ needs a callback function
```

### Missing: no `console.table()` or logging
The `.then()` returns the filtered array but never displays it.

### What you need to add to match `11Ej.js`:
1. `return Promise.allSettled(vRest.map(...))` inside the IIFE
2. Remove the dangling `.map()` result — integrate it into the return
3. Add `return` inside `.filter()`
4. Add a callback to `.catch()`
5. Add `console.table()` inside `.then()`

## Report: Current `12Ej.js`

### `pedirRestaurante` ✅
- `slice()` has `+1` — no empty menu
- Uses `new Error(...)` for reject
- Good structure

### IIFE `pedidoG` ✅
- `.map()` result assigned to `vRest2`
- `return Promise.allSettled(vRest2)` — core async flow fixed

### `.then()` callback ❌ — three bugs in lines 57-61

**Bug 1: `.filter()` missing `return`** (line 57-59)
```js
vector.filter((tipo) => {
    tipo.status = 'fulfilled'   // no return → undefined
})
```
Curly braces without `return` → callback returns `undefined` (falsy) → **all items are filtered out**. `acabados2` will be `[]`.

**Bug 2: Assignment instead of comparison** (line 58)
```js
tipo.status = 'fulfilled'   // single '=' assigns, does NOT compare
```
This **mutates** every object's status to `'fulfilled'`. Should be `tipo.status === 'fulfilled'`.

**Bug 3: `.map()` missing `return`** (line 60)
```js
.map((acabados) => {
    acabados.value;   // expression evaluated but nothing returned
})
```
Should be `return acabados.value` or remove curly braces: `.map(acabados => acabados.value)`.

### `.catch()` ✅
Now has a proper callback.

### Summary — what to fix:
1. `tipo.status = 'fulfilled'` → `tipo.status === 'fulfilled'`
2. Add `return` in `.filter()` or remove curly braces
3. Add `return` in `.map()` or remove curly braces

The quickest fix for lines 57-61:
```js
const acabados2 = vector
    .filter(tipo => tipo.status === 'fulfilled')
    .map(acabados => acabados.value);
console.table(acabados2);
```

## Report: Final `12Ej.js` — All Bugs Fixed

### `pedirRestaurante` ✅
- `slice()` has `+1` — no empty menu
- Uses `new Error(...)` for reject
- Proper timeout structure

### IIFE `pedidoG` ✅
- `.map()` result assigned to `vRest2`
- `return Promise.allSettled(vRest2)` — correct

### `.then()` callback ✅
All three bugs from last time are fixed:
- `.filter()` now has `return` ✅
- Uses `===` (comparison), not `=` (assignment) ✅
- `.map()` now has `return` ✅
- `console.table(acabados2)` to display results ✅

### `.catch()` ✅
Proper callback function.

**The code is now complete and functionally equivalent to `11Ej.js`. No bugs found.**

# Debug Report — destino6

| # | Severity | Line | Bug |
|---|---|---|---|
| 🔴 | Critical | 8, 24 | `render(catalogo, div1, ...)` overwrites `div1` — but `div1` contains the input fields and button. After first render, the form disappears and you can't add anything. Should render into a different div (e.g. `div2`). |
| 🔴 | Critical | 19 | `catalogo.push({ destinoI, continenteI })` — property shorthand creates `{ destinoI: "...", continenteI: "..." }` but existing items use `{ destino: "...", continente: "..." }`. The render function accesses `item.destino` and `item.continente`, so new items will show `undefined`. |
| 🔴 | Hardcoded logic | 13, 15 | `const valido = true;` and `const unico = true;` — never checks empty fields or duplicates. The `else` blocks (lines 22, 26) can never execute. |
| 🟡 | Minor | 10-11 | `destino.value.trim()` and `continente.value.trim()` — assumes `destino` and `continente` are DOM element references. If you meant `inputDestino` / `inputContinente`, rename them to avoid confusion with the data property names. |
| 🟡 | Minor | 3 | `data-indice=${i}` without quotes — works but better as `data-indice="${i}"`. Also `.join("<br>")` between `<div>` blocks is redundant; use `""`. |

## Summary

This code would crash the form on first render (overwrites inputs), store new items with wrong property names (`destinoI` vs `destino`), and never validate anything.

---

## Additional Bugs

| # | Severity | Line | Bug |
|---|---|---|---|
| 🔴 | Critical | 13 | `destino.value.trim !== ""` — missing `()`. You're checking if the function reference itself is empty (it never is). So `valido` is always `true` even if both fields are empty. Should be `destino.value.trim() !== ""`. |
| 🔴 | Critical | 14-16 | `some()` callback has `return;` on its own line again + comparison result discarded. Same ASI bug as before — returns `undefined` for every item, `repetido` is always `false`, duplicates pass through. |
| 🔴 | Critical | 9, 27 | `render(catalogo, div1, ...)` — overwrites `div1` which likely contains the form. After one render, inputs and button disappear. |
| 🔴 | Critical | 7, 9 | Assumes `destino` and `continente` are DOM elements (`destino.value`). If they aren't defined in `dom.js` or the HTML, this throws a `ReferenceError`/`TypeError`. |
| 🟡 | Minor | 13 | `continente.value.trim() !== ""` — missing second `=` (should be `!==`). Works but inconsistent. |
| 🟡 | Minor | 16 | Uses `destino.value.trim().toUpperCase()` inside `some()` — could use `destinoI.toUpperCase()` since it's already trimmed. |
| 🟡 | Minor | 4 | `.join("<br>")` between `<div>` tags — adds unwanted line breaks between block elements. Use `""`.

---

## `dataset` vs `setdata` Bug

The bug:
```js
e.target.setdata.indice  // ❌ setdata doesn't exist
```

The correct property is `dataset`, not `setdata`:
```js
const indice = Number(e.target.dataset.indice);  // ✅
```

Also, clicking on non-item elements (inputs, button, header) would throw a `TypeError` because `dataset.indice` would be `undefined`, and `Number(undefined)` is `NaN`, then `splice(NaN, 1)` returns `[]` silently. But to be safe, add a guard:

```js
div1.addEventListener('click', (e) => {
    const indice = e.target.dataset.indice;
    if (indice === undefined) return;
    catalogo.splice(+indice, 1);
    render(catalogo, div1, "Mostrar Catalogo ...");
});
```

Also note: you need to call `render()` again after `splice` to update the view — otherwise the DOM still shows the old list until the next add.

---

## How `splice()` Returns the Deleted Element

`splice()` returns an **array** of the removed items, even if you only remove one:

```js
const arr = ["A", "B", "C", "D"];
const removed = arr.splice(2, 1);
// removed  → ["C"]     ← an array with one element
// arr      → ["A", "B", "D"]

const solo = removed[0];
// solo → "C"           ← the actual object
```

So in the code:

```js
const eliminado = catalogo.splice(+indice, 1)[0];
//                                   splice returns [ {destino:"Sidney", continente:"Oceania"} ]
//                              [0] gets the first (and only) element → {destino:"Sidney", ...}
```

Alternative ways to write the same thing:

```js
// Step by step
const removidos = catalogo.splice(+indice, 1);  // array of removed items
const eliminado = removidos[0];                  // the actual object

// In one line
const [eliminado] = catalogo.splice(+indice, 1); // destructuring
```

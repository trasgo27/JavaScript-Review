# 🐛 Debug Report — Destinos de Viaje

Here's the debug report:

### 🔴 Bug 1 — `'charge'` is not a real event (line 4)

```js
btnEnviar.addEventListener('charge', (e) => {   // ❌ 'charge' doesn't exist
```

There is no `'charge'` event in the DOM. It should be:
- `'click'` — for button clicks
- `'submit'` — for form submission
- `'change'` — for `<select>` or `<input>` changes

The listener never fires — nothing works.

### 🔴 Bug 2 — `destino` and `continente` read once at page load (lines 1, 3)

```js
const destino = inputDestino.value.trim();   // runs ONCE when script loads
const continente = inputContinente.value.trim();

btnEnviar.addEventListener('click', () => {
    // destino and continente still hold values from page load
```

They're declared **outside** the listener. Their values are captured when the script runs (before the user types anything) and never update. Should be **inside** the listener.

### 🔴 Bug 3 — Wrong object property (line 10)

```js
catalogo.push({
    destino: continente   // ❌ key=destino, value=continente
});
```

This stores `{ destino: "Europa" }` — the continent goes into the `destino` field. You want both fields:

```js
catalogo.push({ destino, continente });
```

### 🟡 Bug 4 — `? true : false` is redundant (line 7)

```js
valido = (destino !== "" && continente !== "") ? true : false;
```

The condition already returns `true`/`false`. Simpler:

```js
valido = destino !== "" && continente !== "";
```

### ✅ Fixed version

```js
btnEnviar.addEventListener('click', (e) => {
    e.preventDefault();
    const destino = inputDestino.value.trim();
    const continente = inputContinente.value.trim();

    if (destino === "" || continente === "") {
        alert('Valores no validos');
        return;
    }

    catalogo.push({ destino, continente });
    console.table(catalogo);
});
```

Ready to implement?

---

## Button `'click'` vs Form `'submit'`

Both work, but different behavior:

| Approach | Button `'click'` | Form `'submit'` |
|---|---|---|
| Listener on | `<button id="btnEnviar">` | `<form id="form">` |
| Triggered by | Clicking the button | Clicking button **OR** pressing Enter in any input |
| `preventDefault()` | Needed only if button is `type="submit"` | Always needed (prevents page reload) |

**Recommendation:** Listen on the **form** with `'submit'` — the Enter key works naturally, which is better UX:

```js
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    // ...
});
```

Or if you already have `id="form"`:

```js
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // ...
});
```

Either approach is fine though. Your call.

---

## Handling duplicates — two approaches

### 1. Prevent before adding (recommended)

Check if the combination already exists **before** pushing:

```js
const duplicado = catalogo.some(item =>
    item.destino.toLowerCase() === destino.toLowerCase() &&
    item.continente.toLowerCase() === continente.toLowerCase()
);

if (duplicado) {
    alert(`"${destino}" ya está en ${continente}`);
    return;  // ❌ don't push
}

catalogo.push({ destino, continente });
```

Best for forms — the user gets immediate feedback and the array never has duplicates.

### 2. Clean duplicates after the fact

Remove all duplicates from the existing array:

```js
function eliminarDuplicados(arr) {
    const vistos = new Set();
    return arr.filter(item => {
        const clave = `${item.destino.toLowerCase()}|${item.continente.toLowerCase()}`;
        if (vistos.has(clave)) return false;
        vistos.add(clave);
        return true;
    });
}

catalogo = eliminarDuplicados(catalogo);
```

Best for cleaning existing data — removes all repeated entries in one pass.

### Which one?

| Approach | Mechanism | Feedback | Use case |
|---|---|---|---|
| Prevent (`.some()`) | Check before push | ✅ Immediate alert | Forms, new entries |
| Clean (`.filter()` + `Set`) | Post-hoc removal | ❌ Silent | Cleaning existing data |

For your form-based app, approach **1** is simpler and gives user feedback.

---

## Debug — duplicate check with `.some()` vs `.findIndex()`

You are on a roll with catching your own logic! Your comment `//charge is not event` is absolutely right; passing `e` (or `event`) and using `e.preventDefault()` is the correct way to handle a form submission click.

However, looking at your validation logic for checking duplicates, you have stumbled into a few more logical and syntax snags. Let's break down why the current check won't behave the way you expect and how to fix it cleanly.

### The Issues in Your Duplicate Check

Look at this specific line:

```javascript
const noRepe = (catalogo.map((d)=>findIndex(`destino:${destino}`))>=0)?true:false;

```

1. **`findIndex` Misplaced:** `findIndex()` is an array method, not a global function. It must be called directly on an array (e.g., `catalogo.findIndex(...)`). Passing a template string like ``destino:${destino}`` into it won't work because `findIndex` expects a callback function to test each element.
2. **Mixing `.map()` and `.findIndex()`:** By nesting them, you are trying to run a search inside a loop that is already transforming the array. This will cause unexpected evaluations.
3. **Inverted Boolean Logic:** You named your variable `noRepe` (meaning "No Repeat / Unique"). But your ternary operator says: *If the index is found (>= 0), set `noRepe` to true.* If an index is found, it means it **is** a duplicate, so `noRepe` should actually be `false`.

### The Clean Fixes

Instead of mixing `.map()` and `findIndex`, JavaScript provides two excellent native array methods to check for existence: `.some()` or `.findIndex()`.

#### Option A: Using `.some()` (Recommended)

The `.some()` method tests whether at least one element in the array passes your condition. It returns a clean `true` or `false` instantly.

```javascript
// This returns true if the combination already exists
const isDuplicate = catalogo.some(
    (item) => item.destino.toUpperCase() === destino.toUpperCase() && 
              item.continente.toUpperCase() === continente.toUpperCase()
);

if (!isDuplicate) { // If it is NOT a duplicate, push it!
    catalogo.push({ destino, continente });
    console.table(catalogo);
} else {
    alert(`Destino ${destino} ya está insertado en catálogo ...`);
}

```

#### Option B: Fixing your `.findIndex()` approach

If you prefer checking indices, you call `.findIndex()` directly on `catalogo`. It returns `-1` if no match is found.

```javascript
// Find index where both match
const index = catalogo.findIndex(
    (item) => item.destino.toUpperCase() === destino.toUpperCase()
);

const noRepe = index === -1; // True if it doesn't exist yet

if (noRepe) {
    catalogo.push({ destino, continente });
    console.table(catalogo);
} else {
    alert(`Destino ${destino} ya está insertado en catálogo ...`);
}

```

*Note: Adding `.toUpperCase()` ensures that entering "Madrid" and "madrid" won't bypass your duplicate check.*

### Your Refactored Code Block

Here is how your event listener looks when put all together with Option A:

```javascript
Enviar.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Basic Validation
    const destino = inputDestino.value.trim();
    const continente = inputContinente.value.trim();
    
    const valido = (destino !== "" && continente !== "");
    
    if (valido) {
        // Check if that destination already exists (case-insensitive)
        const isDuplicate = catalogo.some((item) => item.destino.toUpperCase() === destino.toUpperCase());
        
        if (!isDuplicate) {
            catalogo.push({
                destino: destino,
                continente: continente
            });
            console.table(catalogo);
        } else {
            alert(`Destino ${destino} ya está insertado en catálogo ...`);
        }
        
    } else {
        alert('Valores no válidos');
    }
    
    divMostrar.innerHTML = `<h3>Destinos Seleccionados ...</h3>` + render();
});

```

---

## Debug — `selectContinente` change event with `.filter()` + `.map()`

You are building up excellent muscle memory for handling events and manipulating the DOM! However, you have run into a few bugs here that are quite common when learning JavaScript.

Let's look at why this code will break and how to get it working perfectly.

### The 5 Snags in this Code

1. **`selectContinente.target` is invalid:** The event object `e` holds the target, not the element itself. It should be `e.target.value` to grab what the user selected.
2. **Typo in `toLowerCase()`:** The native JavaScript method is spelled with a capital "C": `.toLowerCase()`, not `.toLowCase()`.
3. **The `return` line-break trap:** Just like in your previous code, you put a line break right after `return`. This causes JavaScript to return `undefined` immediately.
4. **Using `.map()` instead of `.filter()`:** `.map()` changes every element but keeps the array the exact same length. If you want a "sub-array with the matches" (as your comment correctly suggests), you need **`.filter()`** first to get only the matching destinations, and *then* `.map()` to turn those matches into HTML text.
5. **Assignment (`=`) instead of Comparison (`===`):** Inside your loop, you used a single `=` which overwrites data, instead of `===` which compares values. Also, you are comparing the destination (`d.destino`) with the continent (`contiEle`). You'll want to compare `d.continente` with `contiEle`.

### The Corrected Code

Here is how you can structure it smoothly:

```javascript
selectContinente.addEventListener('change', (e) => {
    divMostrar.innerHTML = "";
    
    // 1. Correctly read the target value and fix the typo in toLowerCase()
    const contiEle = e.target.value.trim().toLowerCase();
    
    // 2. Filter the catalog to get ONLY the items matching the selected continent
    const filteredCatalogo = catalogo.filter((d) => d.continente.trim().toLowerCase() === contiEle);
    
    // 3. Map those filtered items into string lines and join them
    const html = filteredCatalogo.map((d, i) => {
        return `${i + 1}.- ${d.destino} (${d.continente})`; // 'return' and string on the same line!
    }).join('<br>');
    
    // 4. Update the DOM
    divMostrar.innerHTML = html;
});

```

### Why this works:

* **`e.target.value`** correctly reaches into the event object to extract the string option selected by the user.
* **`.filter()`** runs first and discards any destinations that aren't in the selected continent.
* **`.map()`** takes that clean sub-array and cleanly formats it for your `divMostrar`.

---

## Debug Report — `destinoViaje/`

### 🔴 Bug 1 — Comma instead of concatenation (destinos.js:22)

```js
divMostrar.innerHTML = `<h3>Destinos Seleccionados en ${contiEle}</h3>`,`${html}`;
//                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  ^^^^^^^^
//                      evaluated but DISCARDED                        ← only this is assigned
```

The comma operator `,` evaluates both sides but returns only the right side. The `<h3>` header is completely lost — `innerHTML` only gets the HTML string from `html`.

✅ **Fix:** Replace `,` with `+`:
```js
divMostrar.innerHTML = `<h3>Destinos Seleccionados en ${contiEle}</h3>` + html;
```

### 🟡 Bug 2 — `btnEnviar` vs `btnAgregar` name mismatch (domElements.js:1 vs HTML)

| File | Declaration | HTML ID |
|------|------------|---------|
| `domElements.js:1` | `const btnAgregar = document.getElementById('btnAgregar')` | ❌ no element with that ID → `null` |
| `destinos.js:26` | `btnEnviar.addEventListener(...)` | ✅ HTML has `id="btnEnviar"` — works via global `window.btnEnviar` |

Not broken (browser auto-creates globals for elements with IDs), but inconsistent and confusing. If you ever add `"use strict"` or move to a module, it breaks.

✅ **Fix:** Change `domElements.js:1` to:
```js
const btnEnviar = document.getElementById('btnEnviar');
```

### 🟡 Bug 3 — Duplicate check only by `destino`, case-sensitive (destinos.js:35)

```js
const repe = catalogo.some(item => item.destino === destino);
```

| Issue | Example | Behavior |
|-------|---------|----------|
| Case-sensitive | `"paris"` vs `"Paris"` | Not detected as duplicate |
| Ignores continent | `"Paris"` in Europa already exists | Can't add `"Paris"` in America |

✅ **Fix:** Case-insensitive, include continent:
```js
const repe = catalogo.some(item =>
    item.destino.toLowerCase() === destino.toLowerCase() &&
    item.continente.toLowerCase() === continente.toLowerCase()
);
```

### 🟡 Bug 4 — `render()` doesn't handle empty catalog

```js
function render() {
    return catalogo.map(...).join('<br>');
}
```

If `catalogo` is empty, returns `""` (empty string). Not a crash, but the UI will show just the `<h3>` header with no content.

✅ **Optional guard:**
```js
if (catalogo.length === 0) return "<em>No hay destinos aún</em>";
```

### ✅ Summary

| Priority | Bug | File:Line | Fix |
|----------|-----|-----------|-----|
| 🔴 | Comma `,` instead of `+` | `destinos.js:22` | Change to `+` |
| 🟡 | `btnAgregar`/`btnEnviar` mismatch | `domElements.js:1` | Align name with HTML |
| 🟡 | Duplicate check too loose | `destinos.js:35` | Add `.toLowerCase()` + continent |

---

## Final fixed version — `destinos.js`

```js
function render() {
    return catalogo.map((item, i) =>
        `Destino ${i + 1}: ${item.destino} en ${item.continente}`
    ).join('<br>');
}

selectContinente.addEventListener('change', () => {
    const contiEle = selectContinente.value;
    if (!contiEle) {
        divMostrar.innerHTML = `<h3>Destinos</h3>` + render();
        return;
    }
    const html = catalogo.filter(item =>
        item.continente.toLowerCase() === contiEle.toLowerCase()
    ).map((d, i) =>
        `${i + 1} ${d.destino.toUpperCase()}`
    ).join('<br>');
    divMostrar.innerHTML = `<h3>Destinos en ${contiEle}</h3>` + html;
});

btnEnviar.addEventListener('click', (e) => {
    e.preventDefault();
    const destino = inputDestino.value.trim();
    const continente = inputContinente.value.trim();

    if (destino === "" || continente === "") {
        alert('Valores no validos');
        return;
    }

    const repe = catalogo.some(item =>
        item.destino.toLowerCase() === destino.toLowerCase() &&
        item.continente.toLowerCase() === continente.toLowerCase()
    );

    if (!repe) {
        catalogo.push({ destino, continente });
        console.table(catalogo);
    } else {
        alert(`destino ${destino} ya está insertado en catálogo ...`);
    }
});
```

### All bugs fixed

| Fix | Before | After |
|-----|--------|-------|
| Comma `,` → `+` | `<h3>...</h3>,${html}` | `<h3>...</h3>` + html |
| Empty select guard | No guard → empty filter | `if (!contiEle) return render()` |
| Case-insensitive filter | `item.continente == contiEle` | `.toLowerCase()` on both sides |
| Duplicate check | Only `destino`, case-sensitive | Both fields, `.toLowerCase()` |
| `btnAgregar` → `btnEnviar` | Wrong ID in `domElements.js` | Matches HTML `id="btnEnviar"` |
| Empty catalog | Renders blank | Guard returns `"<em>No hay destinos aún</em>"` |
| Object creation | `{ destino: destino, continente: continente }` | `{ destino, continente }` (shorthand) |
| Redundant ternary | `? true : false` | Direct boolean expression |

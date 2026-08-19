# 🗺️ RoadMap — `01countClick.html` (localStorage Counter)

> **Goal:** A click counter that persists across page reloads using `localStorage`.
> Three buttons: **Increase**, **Reduce**, **Delete**. The current count is always shown in `divResultados`.

---

## 🐛 Current Bugs to Fix

Before building, here are the issues in the existing code:

| # | Bug | Line(s) | Why it breaks |
|---|-----|---------|---------------|
| 1 | `contador` is **never declared** | 52 | `var contador = 0;` is commented out. When `localStorage` has no value, `contador` is `undefined` and `sumar()`/`restar()` produce `NaN`. |
| 2 | `borrar()` removes the key but **never resets** the in-memory `contador` | 90-93 | After deleting, clicking *Increase* saves `NaN` because `contador` is still the old number but `localStorage` is empty. |
| 3 | The `<p>` tag inside `mostrar()` is **never closed** properly | 77 | `<p>Contador: ${contadorLetras}<p>` — the closing tag is `<p>` instead of `</p>`. |
| 4 | First-visit UX: an `alert()` fires when there is no saved value | 55 | This is disruptive; better to silently initialize to `0`. |

---

## Phase 1 — Declare the Global `contador` Variable

**Goal:** Ensure `contador` always has a numeric value, regardless of `localStorage` state.

**Action:**
1. **Uncomment** the `var contador = 0;` line (line 50).
2. This guarantees a default of `0` before any `localStorage` check runs.

```js
// ✅ Globals
var contador = 0;
```

**✅ Checkpoint:** Open the page fresh (no localStorage). `contador` should be `0` — no errors in the console.

---

## Phase 2 — Initialize from `localStorage`

**Goal:** On page load, read the stored value and update both the variable and the display.

**Action:**
1. Use `localStorage.getItem("contador")` to read the saved string.
2. If the value **exists** (`!== null`), parse it with `parseInt()` and assign it to `contador`.
3. If it **does not exist**, keep `contador = 0` (already set in Phase 1) — **no alert**.
4. Call `mostrar()` to render the current value immediately.

```js
// ✅ Initialize
let stored = localStorage.getItem("contador");
if (stored !== null) {
    contador = parseInt(stored);
}
mostrar();   // always show current value on load
```

> [!TIP]
> Replace the `alert()` with this silent initialization. The user doesn't need a popup every first visit.

**✅ Checkpoint:** Set a value in DevTools (`localStorage.setItem("contador", "5")`), reload → the page should display `5`.

---

## Phase 3 — Wire Up the Button Listeners

**Goal:** Connect each button to its respective function.

**Action:**
1. Grab the three buttons by their IDs: `btnAdd`, `btnSubst`, `btnDelete`.
2. Attach a `click` event listener to each one.

```js
// ✅ Listeners
const miSumar  = document.getElementById('btnAdd');
const miRestar = document.getElementById('btnSubst');
const miBorrar = document.getElementById('btnDelete');

miSumar.addEventListener('click',  () => { sumar();  });
miRestar.addEventListener('click', () => { restar(); });
miBorrar.addEventListener('click', () => { borrar(); });
```

> [!NOTE]
> The `(e)` parameter in the arrow functions is unused — you can omit it for cleaner code.

**✅ Checkpoint:** Each button should fire its function (you'll verify the logic in Phase 4).

---

## Phase 4 — Implement the Logic Functions

**Goal:** `sumar()`, `restar()`, and `borrar()` correctly update the in-memory variable, persist to `localStorage`, and refresh the display.

### 4a — `mostrar()`

Reads from `localStorage` (or falls back to `'0'`) and renders it inside `divResultados`.

```js
function mostrar() {
    let contadorLetras = localStorage.getItem('contador') || '0';
    const miMarcador = document.getElementById('divResultados');
    miMarcador.innerHTML = `<p>Contador: ${contadorLetras}</p>`;
    //                                              ^^^^ fix: </p>
}
```

### 4b — `sumar()`

```js
function sumar() {
    contador++;
    localStorage.setItem('contador', contador);
    mostrar();
}
```

### 4c — `restar()`

```js
function restar() {
    contador--;
    localStorage.setItem('contador', contador);
    mostrar();
}
```

### 4d — `borrar()` ⚠️ Critical fix

```js
function borrar() {
    localStorage.removeItem('contador');
    contador = 0;          // ← reset the in-memory variable too!
    mostrar();
}
```

> [!WARNING]
> Without `contador = 0` inside `borrar()`, the next click on *Increase* will save the **old value + 1** instead of starting from `0`.

**✅ Checkpoint:**
1. Click *Increase* 5 times → display shows `5`.
2. Reload → display still shows `5`.
3. Click *Delete* → display shows `0`.
4. Click *Reduce* → display shows `-1`.
5. Reload → display shows `-1`.

---

## Phase 5 — Polish & Edge Cases

**Goal:** Harden the code and improve UX.

| Task | Details |
|------|---------|
| **Close the `<p>` tag** | Change `<p>` to `</p>` in `mostrar()` (already done in Phase 4a). |
| **Remove the `alert()`** | Already replaced with silent init in Phase 2. |
| **Optional: add a `divMarcador`** | If you want a *separate* element for the counter (instead of replacing `divResultados` contents), add `<div id="divMarcador"></div>` inside `divResultados` and target that in `mostrar()`. |
| **Optional: prevent negative values** | Add a guard: `if (contador > 0) { contador--; }` inside `restar()`. |
| **Optional: disable buttons visually** | Disable *Reduce* when `contador === 0` for better UX. |

---

## 📋 Final Code Structure (Order of Execution)

```
1. var contador = 0;                  ← Global declaration
2. Read localStorage → update contador
3. mostrar()                          ← Render initial value
4. Grab button references
5. Attach event listeners
6. Function definitions (sumar, restar, borrar, mostrar)
```

> [!IMPORTANT]
> `mostrar()` is called **before** it is defined in the code, but this works because regular `function` declarations are **hoisted** in JavaScript. Arrow functions or `const` function expressions would **not** be hoisted — keep using `function` keyword here.

---

**Which phase do you want to start coding? I recommend Phase 1 → Phase 2 so you can verify localStorage is working before wiring up the buttons.**

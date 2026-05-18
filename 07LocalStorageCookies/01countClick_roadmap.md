# 🗺️ RoadMap — `01countClick.html` — New Features & Improvements

> **Current state:** The counter works — it increments, decrements, persists in `localStorage`, and displays in `divResultados`.
> **This roadmap** adds new functionalities and hardens the existing code.

---

## 🐛 Phase 0 — Fix the Remaining Bug

There is **one bug** left from the original code that must be fixed before building new features.

**Bug:** `borrar()` removes the `localStorage` key but **never resets** the in-memory `contador` variable.

```js
// ❌ Current code
function borrar() {
    localStorage.removeItem('contador');
    mostrar();
}
```

**What happens:** After clicking *Delete*, `contador` still holds the old value (e.g. `5`). The display shows `0` (because `mostrar()` falls back to `'0'`), but clicking *Increase* saves `6` instead of `1`.

**Fix:**
```js
// ✅ Fixed
function borrar() {
    localStorage.removeItem('contador');
    contador = 0;           // ← reset the in-memory variable!
    mostrar();
}
```

**✅ Checkpoint:** Click *Increase* 5× → shows `5`. Click *Delete* → shows `0`. Click *Increase* → should show `1`, **not** `6`.

---

## 🆕 Phase 1 — Add a Dedicated `divMarcador` Display

**Goal:** Separate the counter display from the instructions/results area for cleaner structure.

**Actions:**
1. Inside `divResultados`, add a new element: `<span id="divMarcador">0</span>`.
2. Update `mostrar()` to target `divMarcador` instead of replacing the entire `divResultados` content.

**HTML:**
```html
<div id="divResultados">
    <p>Contador: <span id="divMarcador">0</span></p>
</div>
```

**JavaScript — update `mostrar()`:**
```js
function mostrar() {
    let contadorLetras = localStorage.getItem('contador') || '0';
    const miMarcador = document.getElementById('divMarcador');
    miMarcador.innerText = contadorLetras;
}
```

> [!TIP]
> Using `innerText` on a `<span>` is safer than `innerHTML` on the whole `<div>` — it avoids accidentally wiping out other elements inside `divResultados`.

**✅ Checkpoint:** The number updates inside the `<span>` without erasing any surrounding text or elements.

---

## 🆕 Phase 2 — Add a `btnReset` Button to Set Counter to a Custom Value

**Goal:** Let the user type a number and set the counter to that value.

**Actions:**
1. Add an `<input>` field and a new button to the HTML.
2. Create a `resetear()` function that reads the input value, validates it, and saves it.

**HTML — add inside `divBotones`:**
```html
<br><br>
<input type="number" id="inputReset" placeholder="Set value..." />
<button id="btnReset">Set!</button>
```

**JavaScript:**
```js
// Listener
const miReset = document.getElementById('btnReset');
miReset.addEventListener('click', () => {
    resetear();
});

// Logic
function resetear() {
    const inputVal = document.getElementById('inputReset').value;
    const parsed = parseInt(inputVal);

    if (isNaN(parsed)) {
        alert('Please enter a valid number');
        return;
    }

    contador = parsed;
    localStorage.setItem('contador', contador);
    mostrar();
}
```

> [!NOTE]
> `parseInt()` returns `NaN` if the input is empty or non-numeric. The `isNaN()` guard prevents saving garbage to `localStorage`.

**✅ Checkpoint:** Type `42` → click *Set!* → display shows `42`. Reload → still `42`. Leave input empty → click *Set!* → alert appears, counter unchanged.

---

## 🆕 Phase 3 — Visual Feedback with Color Changes

**Goal:** The counter display changes color based on the value (positive = green, negative = red, zero = default).

**Actions:**
1. Modify `mostrar()` to apply a CSS class or inline style based on `contador`'s value.

**JavaScript — enhance `mostrar()`:**
```js
function mostrar() {
    let contadorLetras = localStorage.getItem('contador') || '0';
    const miMarcador = document.getElementById('divMarcador');
    miMarcador.innerText = contadorLetras;

    // Color feedback
    let valor = parseInt(contadorLetras);
    if (valor > 0) {
        miMarcador.style.color = 'green';
    } else if (valor < 0) {
        miMarcador.style.color = 'red';
    } else {
        miMarcador.style.color = 'black';
    }
}
```

**✅ Checkpoint:** Counter at `3` → green text. Counter at `-2` → red text. Counter at `0` → black text.

---

## 🆕 Phase 4 — Display a Click History Log

**Goal:** Keep a log of every action (increase, reduce, delete, set) and display it below the counter.

**Actions:**
1. Add a new `<div id="divHistorial"></div>` in the HTML.
2. Create a `registrar(accion)` function that adds a timestamped entry.
3. Store the history in `localStorage` as a JSON array.

**HTML:**
```html
<br><br>
<div id="divHistorial">
    <h3>History</h3>
    <ul id="listaHistorial"></ul>
</div>
```

**JavaScript:**
```js
function registrar(accion) {
    // Read existing history or start empty
    let historial = JSON.parse(localStorage.getItem('historial') || '[]');

    // Create a new entry
    let entrada = {
        accion: accion,
        valor: contador,
        hora: new Date().toLocaleTimeString()
    };

    historial.push(entrada);
    localStorage.setItem('historial', JSON.stringify(historial));

    mostrarHistorial();
}

function mostrarHistorial() {
    let historial = JSON.parse(localStorage.getItem('historial') || '[]');
    const lista = document.getElementById('listaHistorial');
    lista.innerHTML = '';

    historial.forEach(entry => {
        let li = document.createElement('li');
        li.textContent = `[${entry.hora}] ${entry.accion} → ${entry.valor}`;
        lista.appendChild(li);
    });
}
```

**Then call `registrar()` inside each function:**
```js
function sumar() {
    contador++;
    localStorage.setItem('contador', contador);
    mostrar();
    registrar('Increase');    // ← add this
}

function restar() {
    contador--;
    localStorage.setItem('contador', contador);
    mostrar();
    registrar('Reduce');      // ← add this
}

function borrar() {
    localStorage.removeItem('contador');
    contador = 0;
    mostrar();
    registrar('Delete');      // ← add this
}
```

> [!IMPORTANT]
> This phase uses `JSON.stringify()` and `JSON.parse()` — remember that `localStorage` only stores **strings**. You must convert the array to/from JSON every time.

**✅ Checkpoint:** Click *Increase* 3×, *Reduce* 1×, *Delete* → the history list shows 5 entries with timestamps. Reload → history is still there.

---

## 🆕 Phase 5 — Add a "Clear History" Button

**Goal:** Let the user wipe the history log without affecting the counter.

**Actions:**
1. Add a `<button id="btnClearHistory">Clear History</button>` near the history section.
2. Create a `borrarHistorial()` function.

**JavaScript:**
```js
const miClearHistory = document.getElementById('btnClearHistory');
miClearHistory.addEventListener('click', () => {
    borrarHistorial();
});

function borrarHistorial() {
    localStorage.removeItem('historial');
    mostrarHistorial();
}
```

**✅ Checkpoint:** History has entries → click *Clear History* → list is empty. Counter value is unchanged.

---

## 🆕 Phase 6 — Prevent Negative Values (Optional Guard)

**Goal:** Optionally prevent the counter from going below zero.

**Action — modify `restar()`:**
```js
function restar() {
    if (contador <= 0) {
        alert('Counter is already at zero!');
        return;     // ← stop here, don't decrement
    }
    contador--;
    localStorage.setItem('contador', contador);
    mostrar();
    registrar('Reduce');
}
```

> [!WARNING]
> This is **optional** — the current program allows negative values, which is valid behavior. Only add this if you want strictly non-negative counters.

**✅ Checkpoint:** Counter at `0` → click *Reduce* → alert appears, counter stays at `0`.

---

## 📋 Summary — Feature Priority Order

| Phase | Feature | Difficulty | Depends on |
|-------|---------|------------|------------|
| 0 | Fix `borrar()` bug | ⭐ | — |
| 1 | Add `divMarcador` element | ⭐ | Phase 0 |
| 2 | Custom value input (`btnReset`) | ⭐⭐ | Phase 1 |
| 3 | Color feedback (green/red/black) | ⭐ | Phase 1 |
| 4 | Click history log with `JSON` | ⭐⭐⭐ | Phase 0 |
| 5 | Clear history button | ⭐ | Phase 4 |
| 6 | Prevent negative values (optional) | ⭐ | Phase 0 |

---

## 🛠️ Concepts You Will Practice

| Concept | Phases |
|---------|--------|
| `localStorage.setItem()` / `getItem()` / `removeItem()` | 0, 1, 2, 4, 5 |
| `JSON.stringify()` / `JSON.parse()` | 4, 5 |
| `parseInt()` and `isNaN()` validation | 2 |
| DOM manipulation (`innerText`, `innerHTML`, `createElement`) | 1, 3, 4 |
| Conditional styling (`.style.color`) | 3 |
| Event listeners and modular functions | 2, 5 |

---

**Start with Phase 0 (the bug fix) — it's one line of code and everything else depends on it. Then move to Phase 1 to set up the `divMarcador`. After that, pick any phase that interests you!**

# 🐛 Debugging Guide — `4CuadradosChallengeDOS.html`

> [!NOTE]
> This guide compares `4CuadradosChallengeDOS.html` (the buggy file) against the working reference `4CuadradosChallenge.html`. Each bug is listed with the exact line, root cause, and fix.

---

## Summary of Bugs Found

| # | Line(s) | Severity | Description |
|---|---------|----------|-------------|
| 1 | 244 | 🔴 High | `classList` assignment instead of `className` |
| 2 | 266 | 🔴 High | `this.posicionInicial` initialized with wrong shape (`{x,y}`) |
| 3 | 270-274 | 🔴 High | Initial position stored in a **local** variable, never saved to `this` |
| 4 | 301 | 🔴 Critical | Missing `this.` prefix on `estaSeleccionada` — drag never works |
| 5 | 329-333 | 🔴 Critical | `dejarCaja()` is incomplete — missing guards, cleanup, and validation |
| 6 | — | 🔴 Critical | Three methods (`reset`, `saveState`, `loadState`) called but never defined |
| 7 | 351-353 | 🟡 Low | Duplicate `volverAlInicio()` in `AppManager` (first is incomplete) |

---

## Bug 1 — `classList` vs `className` (Line 244)

### What's wrong

```javascript
// ❌ Line 244 — 4CuadradosChallengeDOS.html
res.classList = type;
```

### Why it fails

`classList` is a **read-only** `DOMTokenList` property. Assigning a string to it does **not** replace the element's classes — the assignment is silently ignored (or throws in strict mode). This means the result box never gets the `success` or `error` CSS classes applied.

### Fix

```diff
- res.classList   = type;
+ res.className   = type;
```

> [!TIP]
> `className` is a plain string property — assigning to it replaces **all** classes on the element, which is exactly the intended behavior here.

---

## Bug 2 — `this.posicionInicial` has the wrong shape (Line 266)

### What's wrong

```javascript
// ❌ Line 266
this.posicionInicial = {x:0, y:0};
```

Later, `dejarCaja()` on **line 330-332** tries to read:

```javascript
this.posicionInicial.left      // undefined — property doesn't exist
this.posicionInicial.top       // undefined
this.posicionInicial.colorCaja // undefined
```

### Why it fails

The object literal `{x:0, y:0}` doesn't have `left`, `top`, or `colorCaja` properties. So when `dejarCaja()` runs, it sets the element's `style.left`, `style.top`, and `style.backgroundColor` to `undefined`, which either removes those styles or makes the box disappear.

### Fix

Delete this line entirely — it's replaced by the fix in Bug 3, where the properly structured object is assigned to `this.posicionInicial`.

---

## Bug 3 — Initial position stored in a local variable, not on `this` (Lines 270-274)

### What's wrong

```javascript
// ❌ Lines 270-274
const posicionInicial = {
    izq: this.caja.style.left || getComputedStyle(this.caja).left,
    arriba: this.caja.style.top || getComputedStyle(this.caja).top,
    colorCaja: getComputedStyle(this.caja).backgroundColor    
};
```

### Why it fails

Two problems at once:

1. **Scope:** `const posicionInicial` is a **local** variable. It vanishes when the constructor finishes. It is never saved to `this.posicionInicial`, so the instance never holds the real initial values.

2. **Property names mismatch:** Even if you changed `const` to `this.`, the keys are `izq` and `arriba`, but `dejarCaja()` reads `left` and `top`.

### Fix

Replace both Bug 2 and Bug 3 blocks with a single, correctly structured instance property:

```diff
  constructor(id){
      this.id = id;
      this.caja = document.getElementById(id);
      this.estaSeleccionada = false;
-     this.posicionInicial = {x:0, y:0};
      this.compensacion = {x:0, y:0};
      this.contenedor = document.getElementById('div-contenedor');
-     //Posicion Inicial
-     const posicionInicial = {
-         izq:this.caja.style.left||getComputedStyle(this.caja).left,
-         arriba:this.caja.style.top||getComputedStyle(this.caja).top,
-         colorCaja:  getComputedStyle(this.caja).backgroundColor    
-     };
+     // Store initial CSS position for reset
+     this.posicionInicial = {
+         left: this.caja.style.left || getComputedStyle(this.caja).left,
+         top: this.caja.style.top || getComputedStyle(this.caja).top,
+         colorCaja: getComputedStyle(this.caja).backgroundColor
+     };
      this.iniciarEventList();
  }
```

---

## Bug 4 — Missing `this.` on `estaSeleccionada` (Line 301)

### What's wrong

```javascript
// ❌ Line 301
if(!estaSeleccionada) return;
```

### Why it fails

`estaSeleccionada` (without `this.`) is looked up as a **global** variable. It doesn't exist globally, so JavaScript throws:

```
Uncaught ReferenceError: estaSeleccionada is not defined
```

This crashes `moverCaja()` on every `mousemove` event. **Dragging never works at all.**

### Fix

```diff
- if(!estaSeleccionada) return;
+ if(!this.estaSeleccionada) return;
```

> [!CAUTION]
> This is the most critical bug. Without this fix, zero squares can be dragged — the application is completely non-functional.

---

## Bug 5 — `dejarCaja()` is incomplete (Lines 329-333)

### What's wrong

```javascript
// ❌ Lines 329-333
dejarCaja(){
    this.caja.style.left = this.posicionInicial.left;
    this.caja.style.top  = this.posicionInicial.top;
    this.caja.style.backgroundColor = this.posicionInicial.colorCaja;
}
```

### Why it fails

Compared to the working version's `onEnd()`, this method is missing **all** of the following:

| Missing piece | Consequence |
|---|---|
| `if (!this.estaSeleccionada) return;` | Fires on **every** mouseup globally, even when not dragging |
| `this.estaSeleccionada = false;` | Box stays in "dragging" state forever |
| `this.caja.classList.remove('dragging');` | Visual "dragging" effect never clears (scale + opacity) |
| `UI.toggleTarget(false);` | Target area keeps pulsing after drop |
| `validateDrop()` / Promise logic | No success/error feedback — always resets blindly |

### Fix

Replace the entire `dejarCaja()` with the full logic:

```javascript
async dejarCaja() {
    if (!this.estaSeleccionada) return;
    this.estaSeleccionada = false;
    this.caja.classList.remove('dragging');
    UI.toggleTarget(false);

    try {
        const message = await this.validarDrop();
        UI.updateResultado(message, 'success');
        this.caja.style.backgroundColor = 'var(--success)';
    } catch (err) {
        UI.updateResultado(err, 'error');
        this.caja.style.backgroundColor = 'var(--error)';
        setTimeout(() => {
            this.caja.style.backgroundColor = this.posicionInicial.colorCaja;
        }, 1000);
    }
}

validarDrop() {
    return new Promise((resolve, reject) => {
        if (this.comprobarColision()) {
            resolve(`Success! ${this.id.split('-')[1]} reached the target.`);
        } else {
            reject(`Missed! Try again.`);
        }
    });
}
```

---

## Bug 6 — Three methods called but never defined

### What's wrong

`AppManager` calls three methods on each `Caja` instance that **do not exist** in the `Caja` class:

| Method called | Where called | Line |
|---|---|---|
| `c.reset()` | `volverAlInicio()` | 359 |
| `caja.saveState()` | `guardar()` | 366 |
| `caja.loadState(data)` | `load()` | 377 |

### Why it fails

Calling an undefined method throws:

```
Uncaught TypeError: c.reset is not a function
```

All three buttons (**Reset**, **Save**, **Clear Storage**) will crash.

### Fix

Add these three methods to the `Caja` class:

```javascript
reset() {
    this.caja.style.left = this.posicionInicial.left;
    this.caja.style.top = this.posicionInicial.top;
    this.caja.style.backgroundColor = this.posicionInicial.colorCaja;
}

saveState() {
    return {
        x: this.caja.style.left,
        y: this.caja.style.top,
        bg: this.caja.style.backgroundColor
    };
}

loadState(state) {
    if (!state) return;
    this.caja.style.left = state.x;
    this.caja.style.top = state.y;
    this.caja.style.backgroundColor = state.bg;
}
```

> [!IMPORTANT]
> `reset()` and `dejarCaja()` look similar but serve different purposes. `reset()` unconditionally restores original CSS positions (for the Reset button). `dejarCaja()` handles the end of a drag with validation logic.

---

## Bug 7 — Duplicate `volverAlInicio()` in `AppManager` (Lines 351-361)

### What's wrong

```javascript
// ❌ Lines 351-353 — First definition (incomplete)
volverAlInicio(){
    Object.values(this.cajas)   // ← does nothing, no .forEach()
}

// Lines 358-361 — Second definition (correct)
volverAlInicio() {
    Object.values(this.cajas).forEach(c => c.reset());
    UI.updateResultado("Positions reset to default.");
}
```

### Why it doesn't crash (but is still wrong)

In JavaScript, when a class has two methods with the same name, the **second one silently overwrites the first**. So the correct version runs — but the dead code is confusing and should be removed.

### Fix

```diff
- //FUNCIONES
- volverAlInicio(){
-     Object.values(this.cajas)
- }
```

---

## 🛠️ Fix Order (Recommended)

Follow this order to debug incrementally, testing after each step:

1. **Bug 4** → Fix `this.estaSeleccionada` — makes dragging work at all
2. **Bug 2 + Bug 3** → Fix `this.posicionInicial` — stores correct initial positions
3. **Bug 1** → Fix `className` — enables visual feedback on the result bar
4. **Bug 5** → Complete `dejarCaja()` — adds drop validation, cleanup, feedback
5. **Bug 6** → Add `reset()`, `saveState()`, `loadState()` — makes all 3 buttons work
6. **Bug 7** → Remove duplicate `volverAlInicio()` — clean up dead code

> [!TIP]
> After each fix, open the browser DevTools console (`F12`) and test the feature. If you see no errors, move on to the next fix.

---

## Quick Reference — File Comparison

| Feature | Working file (`4CuadradosChallenge.html`) | Buggy file (`4CuadradosChallengeDOS.html`) |
|---|---|---|
| Element property name | `this.el` | `this.caja` ✅ |
| Drag state flag | `this.isDragging` | `this.estaSeleccionada` ✅ |
| Initial position storage | `this.initialStylePos` (on `this`, correct keys) | Local `const` + wrong keys ❌ |
| Class assignment | `res.className = type` | `res.classList = type` ❌ |
| Move guard | `if (!this.isDragging)` | `if (!estaSeleccionada)` — missing `this.` ❌ |
| Drop handler | Full async/await with Promise | 3-line stub, no validation ❌ |
| `reset()` method | ✅ Defined | ❌ Missing |
| `saveState()` method | ✅ Defined | ❌ Missing |
| `loadState()` method | ✅ Defined | ❌ Missing |

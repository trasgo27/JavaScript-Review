# 🔍 Code Review: Promise + `mouseup` Logic

## ❌ Bug 1 — Promise is created in `seleccionar()`, not `desseleccionar()`

**The problem:** You create the Promise when the user **clicks down** (`seleccionar`). At that moment, the box hasn't moved yet — so the overlap check is always comparing the **starting position**, not the final dropped position.

**The fix:** The Promise should be created (and resolved/rejected) inside `desseleccionar()`, **after** the drag is complete. That's when `mouseup` fires.

```js
// ❌ WRONG — checking position at mousedown (box hasn't moved yet)
seleccionar(e) {
    const miPromesa = new Promise(...); // too early!
}

// ✅ CORRECT — check position at mouseup (drag is finished)
desseleccionar(e) {
    const miPromesa = new Promise(...); // right time!
}
```

---

## ❌ Bug 2 — `this` is lost inside `new Promise(function(resolve, reject){...})`

**The problem:** You used a regular `function` for the Promise executor. Inside it, `this` no longer refers to the `Caja` instance — it refers to the `Promise` object (or `undefined` in strict mode).

```js
// ❌ WRONG — 'this' is lost here
new Promise(function(resolve, reject) {
    this.posiCaja = ...  // 'this' is NOT the Caja!
});

// ✅ CORRECT — arrow function preserves 'this'
new Promise((resolve, reject) => {
    this.posiCaja = ...  // 'this' IS the Caja ✅
});
```

---

## ❌ Bug 3 — `hueco` variable not referenced correctly

```js
if (!hueco) {        // ❌ hueco is not defined in this scope
if (!this.hueco) {   // ✅ correct (or use a local const, see below)
```

---

## ❌ Bug 4 — `.backgroundColor` is a property, not a method

```js
// ❌ WRONG — style.backgroundColor is NOT a function
this.caja.style.backgroundColor('lightgreen');

// ✅ CORRECT — assign it like a property
this.caja.style.backgroundColor = 'lightgreen';
```

---

## ❌ Bug 5 — `miPromesa` is not accessible in `desseleccionar()`

Since `miPromesa` is declared with `const` inside `seleccionar()`, it's **local** to that method. `desseleccionar()` can't see it.

**The fix:** Moving the Promise creation into `desseleccionar()` (fixing Bug 1) also solves this automatically.

---

## ✅ Corrected Structure for `desseleccionar()`

```js
desseleccionar(e) {
    this.enFoco = false;
    this.caja.style.backgroundColor = "white";
    cambiarDesSeleccionar();

    // ✅ Promise created HERE, at mouseup, after the drag
    const miPromesa = new Promise((resolve, reject) => {
        const posiCaja   = this.caja.getBoundingClientRect();
        const posiTarget = document.getElementById("cuadrado-Centro").getBoundingClientRect();

        // 'hueco' = true means NO overlap (there is a gap between them)
        const hueco =
            posiCaja.right  < posiTarget.left   ||
            posiCaja.left   > posiTarget.right  ||
            posiCaja.bottom < posiTarget.top    ||
            posiCaja.top    > posiTarget.bottom;

        if (!hueco) {
            resolve("CONSEGUIDO!!!");   // ✅ overlap detected
        } else {
            reject("Nooo!!!");          // ❌ no overlap
        }
    });

    miPromesa
        .then((msg) => {
            this.caja.style.backgroundColor = 'lightgreen';  // ✅ property, not method
            console.log(msg);
        })
        .catch((msg) => {
            this.caja.style.backgroundColor = 'red';         // ✅ property, not method
            console.log(msg);
        });
}
```

And `seleccionar()` should be cleaned up — **remove the Promise from it entirely**.

---

## Summary of all bugs

| # | Location | Bug | Fix |
|---|---|---|---|
| 1 | `seleccionar()` | Promise fires too early (mousedown) | Move Promise to `desseleccionar()` |
| 2 | Promise executor | `function()` loses `this` | Use arrow function `() =>` |
| 3 | `if(!hueco)` | `hueco` not in scope | Declare as local `const` inside arrow fn |
| 4 | `.then/.catch` | `backgroundColor()` called as function | Use `=` assignment instead |
| 5 | `desseleccionar()` | `miPromesa` out of scope | Create Promise locally in `desseleccionar()` |

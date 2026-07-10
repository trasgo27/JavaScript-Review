# 🐛 The Bug: `mouseup` fires on ALL instances, not just the dragged one

Look at the constructor:

```js
window.addEventListener('mouseup', (e) => {
    this.desseleccionar(e);
});
```

Every `Caja` instance registers its **own** `mouseup` listener on `window`. So when you release the mouse, **all 4 instances** call their `desseleccionar()` simultaneously. Each one runs its Promise and sets its own `backgroundColor` to red.

---

## Why `this.enFoco` doesn't save you here

You correctly guard `mover()` with `if(!this.enFoco) return;` — but **you forgot the same guard in `desseleccionar()`**.

When you release the mouse:
- Only **one** caja has `enFoco = true` (the one you dragged)
- But all 4 still run `desseleccionar()` and evaluate their Promise

---

## ✅ The Fix — guard `desseleccionar()` with `enFoco`

```js
desseleccionar(e) {
    if (!this.enFoco) return;  // ← ADD THIS LINE

    this.enFoco = false;
    cambiarDesSeleccionar();
    this.caja.style.backgroundColor = "white";

    const miPromesa = new Promise((resolve, reject) => {
        // ... same as before
    });

    miPromesa
        .then((msg) => { this.caja.style.backgroundColor = 'lightgreen'; })
        .catch((msg) => { this.caja.style.backgroundColor = 'red'; });
}
```

The early `return` ensures only the **box that was actually being dragged** (the one with `enFoco = true`) evaluates the Promise and changes its color.

---

## Summary

| | `mover()` | `desseleccionar()` |
|---|---|---|
| Has `if(!this.enFoco) return`? | ✅ Yes | ❌ Missing! |
| Result | Only dragged box moves | **ALL boxes** change color |

One line fixes it. Give me the green light when ready! 🟢

# 🧠 Understanding the Boundary Logic in `cajaChallegeTRES.html`

## What the code is trying to do

You have a **container** (`div-contenedor`, 1000×500px) and draggable **boxes** (`.cuadrado`, 100×100px each). The goal is: **when you drag a box, stop it from going outside the container**.

---

## The current approach (and why it's broken)

The `mover()` method calculates the box position **relative** to the container:

```js
let RelativaX = (e.clientX - contePosiIzq);
let RelativaY = (e.clientY - contePosiArri);
```

Then it tries to check limits with this condition (lines 122–126):

```js
if (!contePosiIzq < e.clientX-50   ||
     contePosiDer > e.clientX +100 ||
     contePosiArri < e.clientY -50 ||
     contePosiAbaj > e.clientY +100
)
```

> ⚠️ **This condition is logically inverted and incorrect.** The `||` should be `&&`, and the comparisons use absolute `clientX/Y` values instead of the relative positions. The box still escapes the container.

---

## ✅ The correct logic to clamp the box inside

Think of it this way:

```
Container: x from 0 to 1000px, y from 0 to 500px
Box:       100×100px
```

When placing the box, the **top-left corner** of the box must be:
- `left` ≥ `0` (not past the left edge)
- `left` ≤ `1000 - 100 = 900` (not past the right edge)
- `top`  ≥ `0` (not past the top edge)
- `top`  ≤ `500 - 100 = 400` (not past the bottom edge)

So in `mover()`, after computing `RelativaX` and `RelativaY`, you **clamp** them:

```js
mover(e) {
    if (!this.enFoco) return;

    const contenedor = document.getElementById("div-contenedor");
    const contRect   = contenedor.getBoundingClientRect();

    const cajaAncho = this.caja.offsetWidth;   // 100px
    const cajaAlto  = this.caja.offsetHeight;  // 100px

    // Position relative to the container, centered on the cursor
    let RelativaX = e.clientX - contRect.left - cajaAncho / 2;
    let RelativaY = e.clientY - contRect.top  - cajaAlto  / 2;

    // 🔒 CLAMP: keep the box inside the container
    //   Min: 0 (left/top edge)
    //   Max: container size - box size (right/bottom edge)
    RelativaX = Math.max(0, Math.min(RelativaX, contRect.width  - cajaAncho));
    RelativaY = Math.max(0, Math.min(RelativaY, contRect.height - cajaAlto));

    this.caja.style.left = RelativaX + "px";
    this.caja.style.top  = RelativaY + "px";
}
```

---

## 🔑 The key concept: `Math.max` + `Math.min` = Clamp

| Expression | Meaning |
|---|---|
| `Math.max(0, x)` | Never let `x` go below `0` |
| `Math.min(x, 900)` | Never let `x` go above `900` |
| Combined | Keeps `x` in the range `[0, 900]` |

This is called **clamping** a value between a minimum and maximum.

---

## Why use `getBoundingClientRect()` inside `mover()` instead of the pre-computed values?

Your pre-computed values (`contePosiIzq`, etc.) are calculated **once at page load**. If the user scrolls or the layout shifts, they become stale. Calling `getBoundingClientRect()` inside `mover()` is more reliable.
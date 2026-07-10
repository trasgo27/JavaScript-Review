# Debug Report — destino5/destinos.js

| # | Bug | Line | Description |
|---|---|---|---|
| 🔴 | `.trim()` on wrong target | 13-14 | `inputD.trim().value` → should be `inputD.value.trim()`. Calling `.trim()` on a DOM element (not a string) will throw an error and crash the whole script. |
| 🔴 | Hardcoded `valido` | 16 | `(true)?true:false` never checks if fields are empty. It's always `true`, so the `else` (alert) can never run. |
| 🔴 | Hardcoded `noRepe` | 20 | `(true)?true:false` never checks for duplicates. Always allows them. |
| 🟡 | Event on `div1` instead of `boton` | 12 | Clicking anywhere inside `div1` (inputs, labels, empty space) triggers the `add`. Should be `boton.addEventListener(...)`. |
| 🔴 | Delete functionality missing | — | Unlike `destino4`, there's no `div2` click handler with event delegation, and the items in `renderCatalogo()` (line 5) are plain text — no `<span>` with `data-index` or `cursor:pointer`. |
| 🟡 | Continent filter not implemented | — | `div3` has buttons with `data-continente` but no corresponding event handler in `destinos.js`. |
| 🟡 | `div4` unused | dom.js:7 | Declared but never referenced in `destinos.js`. |

## Summary of missing features compared to `destino4`:

- No click-to-delete from catalog (`<span data-index>` + `splice`)
- No duplicate validation
- No empty-field validation
- No continent filter
- The `.trim()` order error alone would crash the app on first click

---

## Bugs in rewritten `destinos.js` (with `boton.addEventListener`)

| # | Bug | Line | Description |
|---|---|---|---|
| 🔴 | `some()` callback missing `return` | 8-10 | `catalogo.some((item) => { item.destino... })` uses `{}` block body but no `return`. Callback always returns `undefined` (falsy), so `some()` always returns `false`, `noRepe` is always `true` — duplicates pass through unchecked. |
| 🟡 | `valido` doesn't use already-trimmed vars | 6 | `inputD.value.trim() !== ""` re-trims instead of using `destino !== ""` and `continente !== ""`. Works but redundant. |
| 🟡 | `!= ""` instead of `!== ""` | 6 | Loose inequality works but `!==` is stricter and better practice for string comparison. |
| 🟡 | `noRepe` logic is inverted and hard to read | 7-11 | `const noRepe = (...some(...)) ? false : true` is confusing. Better: `const repe = catalogo.some(...); if (repe) { alert(...); return; }` |
| 🟡 | Duplicates silently accepted | 13 | If `noRepe` is `false`, nothing happens — no alert to the user, just a silent failure. |

### The critical bug:

```js
const noRepe = (catalogo.some((item) => {
    item.destino.toUpperCase() === destino.toUpperCase()  // ❌ no return!
})) ? false : true;
```

Because `{ }` without `return`, `some()` always returns `undefined` (falsy), so `noRepe` is always `true` — **duplicates are silently accepted**.

---

# Hover Highlight on Destino Items

## CSS Changes

Problems with original CSS:
- `div2` → `#div2` (ID selector needs `#`)
- `::hover` → `:hover` (single colon, pseudo-class)
- Hover on container highlights everything — need individual items

Fixed CSS:
```css
#div2{
    border: 6px solid rebeccapurple;
    border-radius: 10px;
    padding: 10px;
}
.destino-item{
    cursor:pointer;
    padding:4px;
    border-radius:4px;
    transition: background 0.2s;
}
.destino-item:hover{
    background: #ffeb3b;
    font-weight:bolder;
    font-size:24px;
    color:red;
}
```

## JS Changes (renderCatalogo)

Before (items as plain text separated by `<br>`):
```js
`${i+1}, Destino: ${item.destino}, Continente: ${item.continente}`
).join("<br>");
```

After (each item wrapped in its own hoverable `<div>`):
```js
`<div class="destino-item" data-indice="${i}">${i+1}. ${item.destino}, ${item.continente}</div>`
).join("");
```

Now each item is individually hoverable — only the item under the cursor highlights.

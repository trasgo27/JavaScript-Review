# Debug Report — destino5/destinos.js

Here are the bugs I found:

| # | Bug | Line | Description |
|---|-----|------|-------------|
| 🔴 | `.trim()` on wrong target | 13-14 | `inputD.trim().value` → should be `inputD.value.trim()`. Calling `.trim()` on a DOM element (not a string) will throw an error and crash the whole script. |
| 🔴 | Hardcoded `valido` | 16 | `(true)?true:false` never checks if fields are empty. It's always `true`, so the `else` (alert) can never run. |
| 🔴 | Hardcoded `noRepe` | 20 | `(true)?true:false` never checks for duplicates. Always allows them. |
| 🟡 | Event on `div1` instead of `boton` | 12 | Clicking anywhere inside `div1` (inputs, labels, empty space) triggers the add. Should be `boton.addEventListener(...)`. |
| 🔴 | Delete functionality missing | — | Unlike `destino4`, there's no `div2` click handler with event delegation, and the items in `renderCatalogo()` (line 5) are plain text — no `<span>` with `data-index` or `cursor:pointer`. |
| 🟡 | Continent filter not implemented | — | `div3` has buttons with `data-continente` but no corresponding event handler in `destinos.js`. |
| 🟡 | `div4` unused | dom.js:7 | Declared but never referenced in `destinos.js`. |

## Summary of missing features compared to `destino4`:

- No click-to-delete from catalog (`<span data-index>` + `splice`)
- No duplicate validation
- No empty-field validation
- No continent filter
- The `.trim()` order error alone would crash the app on first click

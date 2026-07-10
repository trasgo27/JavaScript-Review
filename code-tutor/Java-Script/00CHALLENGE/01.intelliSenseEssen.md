# VS Code IntelliSense Essentials for JavaScript Timer Methods

## 1. Type-checking with JSDoc

Add at the top of your JS file to enable full type inference:

```js
// @ts-check
```

Now `setTimeout(`, `setInterval(` etc. will show:
- Parameter signatures (`callback`, `delay`, `...args`)
- Return types (`number` / `Timeout`)

## 2. Trigger IntelliSense manually

- **`Ctrl+Space`** — force IntelliSense at cursor
- **`Ctrl+Shift+Space`** — detailed parameter hints when inside parentheses, e.g. `setTimeout(|)`

## 3. Peek at definitions

- **`F12`** (or right-click → *Go to Definition*) on `setTimeout` — jumps to the TypeScript type definition (`lib.dom.d.ts`) showing exact signature and docs.
- **`Alt+F12`** — *Peek Definition* in-line.

## 4. Hover for info

- **Hover** over `setTimeout` — shows type signature and brief description from built-in type definitions.

## 5. Ensure correct language service

- Open a `.js` or `.mjs` file (not `.html` inline scripts — those get limited IntelliSense).
- Bottom-right of VS Code should say **"JavaScript"** (not **"No"** or another language).

## 6. See all timer methods at once

`F12` on `setTimeout`, then peek around — `setInterval`, `clearTimeout`, `clearInterval`, `setImmediate`, `queueMicrotask` are all defined together in the DOM typings.

## 7. Quick test

Create a new `.js` file, type this and watch suggestions:

```js
// @ts-check
setTimeout
setInterval
clearTimeout
```

# 🐛 Debug Report — Películas

## Solution code

```js
const divLista = document.getElementById('divLista');
const divFiltro = document.getElementById('divFiltro');
const inputTitulo = document.getElementById('inputTitulo');
const inputGenero = document.getElementById('inputGenero');
const inputAnio = document.getElementById('inputAnio');
const btnAgregar = document.getElementById('btnAgregar');
const divBotones = document.getElementById('divBotones');

const catalogo = [
  { titulo: "Inception", genero: "Ciencia Ficción", anio: 2010 },
  { titulo: "Superbad", genero: "Comedia", anio: 2007 },
  { titulo: "The Shawshank Redemption", genero: "Drama", anio: 1994 },
  { titulo: "Mad Max: Fury Road", genero: "Acción", anio: 2015 },
  { titulo: "Get Out", genero: "Terror", anio: 2017 },
  { titulo: "The Matrix", genero: "Ciencia Ficción", anio: 1999 },
  { titulo: "The Dark Knight", genero: "Acción", anio: 2008 },
  { titulo: "The Shining", genero: "Terror", anio: 1980 }
];

function renderCatalogo() {
  const html = catalogo.map((p, i) =>
    `${i + 1}. ${p.titulo} — ${p.genero} (${p.anio})`
  ).join("<br>");
  divLista.innerHTML = "<strong>Todas las películas:</strong><br>" + html;
}

btnAgregar.addEventListener('click', () => {
  const titulo = inputTitulo.value.trim();
  const genero = inputGenero.value.trim();
  const anio = Number(inputAnio.value);

  if (titulo === "" || genero === "" || !(anio > 0)) {
    alert("Valores NO validos ...");
    return;
  }

  catalogo.push({ titulo, genero, anio });
  console.table(catalogo);
  renderCatalogo();

  inputTitulo.value = "";
  inputGenero.value = "";
  inputAnio.value = "";
});

divBotones.addEventListener("click", (e) => {
  const genero = e.target.value;
  if (!genero) return;

  const filtradas = catalogo.filter(p => p.genero === genero);
  divFiltro.innerHTML = "<strong>Filtradas:</strong><br>" +
    filtradas.map((p, i) =>
      `${i + 1}. ${p.titulo} — ${p.genero} (${p.anio})`
    ).join("<br>");
});

renderCatalogo();
```

---

## Potential bugs and how to avoid them

### 1. `inputAnio.value` returns a string

```js
const anio = inputAnio.value;   // "2010" (string), not 2010 (number)
```

✅ **Fix:** Use `Number(inputAnio.value)`.

**Why it matters:** If you later compare or calculate with `anio` (e.g. `anio > 2000`), JavaScript's loose comparison may coerce, but strict comparison (`anio === 2010`) fails because `"2010" !== 2010`. Always convert numeric inputs.

---

### 2. Validation: `inputTitulo.value != null` never works

```js
if (inputTitulo.value != null)   // always true — .value is always a string
```

✅ **Fix:** `inputTitulo.value.trim() !== ""`

**Why:** An empty input returns `""` (empty string), never `null` or `undefined`. The `!= null` check always passes, even when the user typed nothing.

---

### 3. Forgetting `.trim()` on inputs

```js
const titulo = inputTitulo.value;   // "  " (spaces) passes validation!
```

✅ **Fix:** Always `.trim()` before validating: `inputTitulo.value.trim()`

**Why:** A user could enter just spaces, which looks empty but passes `!== ""` without `.trim()`.

---

### 4. Validation order: validate `.trim()` AFTER `.trim()`

```js
const titulo = inputTitulo.value.trim();    // ✅ trim first
if (titulo === "") { /* error */ }          // ✅ then validate
```

---

### 5. `console.table("catalogo")` — string literal vs variable

```js
console.table("catalogo");   // shows the word "catalogo", not the array
console.table(catalogo);     // ✅ shows the actual array as a table
```

**Why:** Quotes create a string literal. The variable name goes without quotes.

---

### 6. `map()` without `join()` — adds commas

```js
divLista.innerHTML = catalogo.map(p => `${p.titulo}`);
// Result: "Inception,Superbad,The Shawshank Redemption,..."
```

✅ **Fix:** Always add `.join("<br>")` after `.map()` when displaying in HTML.

---

### 7. `.join()` without `.map()` — shows `[object Object]`

```js
divLista.innerHTML = catalogo.join("<br>");
// Result: "[object Object]<br>[object Object]..."
```

✅ **Fix:** `.map()` first to transform objects to strings, then `.join()`.

---

### 8. Arrow function with `{}` needs `return`

```js
catalogo.map((p) => {
  `${p.titulo}`       // ❌ no return
})
// Returns: [undefined, undefined, ...]
```

✅ **Fix — either:**
```js
catalogo.map((p) => `${p.titulo}`)              // implicit return (no {})
catalogo.map((p) => { return `${p.titulo}`; })  // explicit return (with {})
```

---

### 9. Event delegation: checking `e.target.value`

```js
divBotones.addEventListener("click", (e) => {
  const genero = e.target.value;
  if (!genero) return;   // <-- guard: ignore clicks on the container itself
```

**Why:** Without `if (!genero) return`, clicking the `<div>` (between buttons) would call `filter` with `undefined`, breaking the filter.

---

### 10. Input clearing after add — UX detail

After a successful `push()`, the inputs should be cleared so the user can easily add the next movie:

```js
inputTitulo.value = "";
inputGenero.value = "";
inputAnio.value = "";
```

Not a bug per se, but missing this makes for poor UX.

---

## Common student mistakes table

| # | Mistake | Wrong code | Correct code |
|---|---------|------------|--------------|
| 1 | `.value` treated as number | `anio: inputAnio.value` | `anio: Number(inputAnio.value)` |
| 2 | Null check on `.value` | `if (inputTitulo.value != null)` | `if (inputTitulo.value.trim() === "")` |
| 3 | No `.trim()` on inputs | `const t = inputTitulo.value` | `const t = inputTitulo.value.trim()` |
| 4 | `console.table` with quotes | `console.table("catalogo")` | `console.table(catalogo)` |
| 5 | `.map()` without `.join()` | `catalogo.map(p => p.titulo)` | `catalogo.map(p => p.titulo).join("<br>")` |
| 6 | `.join()` without `.map()` | `catalogo.join("<br>")` | `catalogo.map(p => ...).join("<br>")` |
| 7 | Arrow `{}` without `return` | `p => { p.titulo }` | `p => p.titulo` or `p => { return p.titulo; }` |
| 8 | No guard on event delegation | `const g = e.target.value` | `if (!e.target.value) return` |
| 9 | Missing DOM reference | unf declared variable | `const inputAnio = document.getElementById("inputAnio")` |
| 10 | Not rendering after push | `catalogo.push(...)` only | `catalogo.push(...); renderCatalogo()` |

---

## Verification checklist

- [ ] All DOM elements referenced with `document.getElementById()`
- [ ] `.trim()` applied to string inputs before validation
- [ ] `Number()` applied to `inputAnio.value`
- [ ] Validation rejects empty strings and invalid years
- [ ] `.push()` receives a proper object `{ titulo, genero, anio }`
- [ ] `console.table(catalogo)` without quotes
- [ ] `renderCatalogo()` calls `.map().join("<br>")`
- [ ] Event delegation has `if (!e.target.value) return` guard
- [ ] Filter uses `.filter().map().join("<br>")`
- [ ] Inputs are cleared after successful add
- [ ] `renderCatalogo()` is called on page load and after each add

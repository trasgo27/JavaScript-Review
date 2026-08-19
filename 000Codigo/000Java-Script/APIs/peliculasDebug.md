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

---

## Checking if a value already exists in an array of objects

Use `.some()` — returns `true`/`false` as soon as it finds a match:

```js
// Check if a movie title already exists (case-insensitive)
const existe = catalogo.some(p => p.titulo.toLowerCase() === nuevoTitulo.toLowerCase());
if (existe) {
  alert("Esa película ya está en el catálogo");
  return;
}
```

**Other methods:**

| Method | Returns | Use when |
|--------|---------|----------|
| `array.some(fn)` | `true`/`false` | You only need a yes/no answer |
| `array.find(fn)` | The first matching object (or `undefined`) | You need the found object |
| `array.findIndex(fn)` | Index number (or `-1`) | You need the position |
| `array.filter(fn).length` | Count of matches | You need to know *how many* match |

**Example with `.find()`:**

```js
const duplicado = catalogo.find(p => p.titulo === inputTitulo.value.trim());
if (duplicado) {
  alert(`"${duplicado.titulo}" ya existe (${duplicado.anio})`);
}
```

**Example with `.findIndex()`:**

```js
const idx = catalogo.findIndex(p => p.titulo === inputTitulo.value.trim());
if (idx !== -1) {
  catalogo.splice(idx, 1); // remove the duplicate instead of adding
}
```

**Key rule:** Pass a callback that returns `true` for the matching element. The methods stop iterating once a match is found (except `.filter()` which scans the whole array).

---

## Default HTML values (peliculas.html)

Default values were added to the form inputs for faster testing/demo:

| Field | Default value | Attribute |
|-------|--------------|-----------|
| `inputTitulo` | `"Inception"` | `value` |
| `inputGenero` | `"ficcion"` | `selected` on `<option>` |
| `inputDuracion` | `120` | `value` |
| `inputAnio` | `2024` | `value` |
| `inputRating` | `7.5` | `value` |
| `vistaYa` | `false` | `checked` on radio |
| `inputCast` | `"Leonardo DiCaprio, Elliot Page"` | `value` |
| `inputBudget` | `1000000` | `value` |
| `inputRevenue` | `5000000` | `value` |

These defaults can be overridden by the user before submitting.

### Two ways to set default values

**1. HTML `value` attribute (static defaults)** — in `peliculas.html`:
```html
<input type="text" id="inputTitulo" value="Inception">
<input type="number" id="inputDuracion" value="120">
<input type="radio" name="vistaYa" value="true" checked>
<option value="Sci-Fi" selected>Sci-Fi</option>
```

**2. JS on page load (dynamic defaults)** — in `peliculas.js`:
```js
inputTitulo.value = "Inception";
inputDuracion.value = "120";
inputGenero.value = "Sci-Fi";
```

HTML attributes are simpler for static values. JS is better when defaults depend on logic (e.g., today's date, previous user data).

---

## `find()` — case sensitivity

When checking for duplicates with `.find()`, a **case-sensitive** comparison will miss matches with different casing:

```js
// ❌ Case-sensitive — "inception" won't match "Inception"
catalogo.find(p => p.title === inputTitulo.value.trim())

// ✅ Case-insensitive — catches all casing variations
catalogo.find(p => p.title.toLowerCase() === inputTitulo.value.trim().toLowerCase())
```

Always normalize both sides with `.toLowerCase()` (or `.toUpperCase()`) for reliable duplicate detection.

---

## Rating input constraints (0–10, step 0.5)

**HTML changes** (`peliculas.html`):
```html
<input type="number" id="inputRating" placeholder="Rating 0/10"
       min="0" max="10" step="0.5" value="7.5" required>
```

| Attribute | Purpose |
|-----------|---------|
| `min="0"` | Prevents values below 0 via browser controls |
| `max="10"` | Prevents values above 10 via browser controls |
| `step="0.5"` | Arrow buttons increment/decrement by 0.5 |

**JS validation** (`peliculas.js`):
```js
// Before (only checked lower bound):
rating >= 0 &&

// After (enforces both bounds):
rating >= 0 && rating <= 10 &&
```

**Why:** The `step` attribute only affects the browser's arrow buttons — users can still type invalid values (e.g. `-5` or `99`) directly. The JS validation is the **backstop** that rejects anything outside `0–10`.


---

## Debug: template literal with arrays and objects

### Original (buggy) code

```js
divLista.innerHTML = `<strong>Todas las películas:</strong><br>` +
  catalogo.map((peli) => {
    return `T: ${peli.title}, G: ${peli.genero}, ${peli.duration} min, de ${peli.releaseYear}, valor: ${peli.rating}, vista:${peli.isWatched},cast:${peli.cast},(boxOffice:${peli.boxOffice}).join()`;
  }).join(`<br>`);
```

### Bugs

| # | Bug | Cause | Fix |
|---|-----|-------|-----|
| 1 | `peli.genero` → renders `undefined` | Property name mismatch: the object has `genre`, not `genero` | `peli.genre` |
| 2 | `.join()` is **inside** the backtick → rendered as literal text | The `.join()` call sits after `${peli.boxOffice}` but before the closing backtick | Move `.join()` outside: `peli.cast.join(", ")` |
| 3 | `${peli.boxOffice}` → renders `[object Object]` | `boxOffice` is an object `{ budget, revenue }`, not a primitive | `peli.boxOffice.budget` / `peli.boxOffice.revenue` |

### Why `join` vs dot notation

- **`peli.cast`** is an **array** → use `.join(", ")` to flatten it into a readable string:
  ```js
  peli.cast.join(", ")  // "Jack Nicholson, Shelley Duvall"
  ```
- **`peli.boxOffice`** is an **Object** → use **dot notation** to access its properties:
  ```js
  peli.boxOffice.budget   // 1000000
  peli.boxOffice.revenue  // 5000000
  ```

### Corrected code

```js
divLista.innerHTML = `<strong>Todas las películas:</strong><br>` +
  catalogo.map((peli) => {
    return `T: ${peli.title}, G: ${peli.genre}, ${peli.duration} min, de ${peli.releaseYear}, valor: ${peli.rating}, vista: ${peli.isWatched}, cast: [${peli.cast.join(", ")}], presupuesto: $${peli.boxOffice.budget}, recaudación: $${peli.boxOffice.revenue}`;
  }).join(`<br>`);
```

### Debug

---

## Bugs in `peliculasModi/peliculas.js`

The file `peliculasModi/peliculas.js` contains an extended version with more fields (rating, cast, boxOffice), but introduces several bugs.

### Bug 1 — Property name mismatch: `peli.genero`

```js
// Line 61 — template uses wrong property:
`T: ${peli.title}, G: ${peli.genero}, ...`

// Object structure (catalogoData.js lines 3-4):
{
  title: "Inception",
  genre: "Sci-Fi",          // <-- genre, NOT genero
  ...
}
```

**Result:** `peli.genero` → `undefined` for ALL movies. The property is named `genre`, not `genero`.

✅ **Fix:** Use the correct property name:
```js
`G: ${peli.genre}, ...`
```

**Rule:** Object property names must be written **exactly** as defined. JS is case-sensitive: `genre !== genero`.

---

### Naming inconsistency — `isWatch` vs `isWatched`

There are **three locations** where this boolean property appears with different names:

| Location | Property name | File | Line |
|----------|--------------|------|------|
| Preloaded catalog data | `isWatched` | `catalogoData.js` | 8, 18, 28, ... |
| Form creates new movie as | `isWatch` | `peliculasModi/peliculas.js` | 37 |
| Template reads | `isWatched` | `peliculasModi/peliculas.js` | 61 |

**The mismatch:**

```js
// catalogoData.js — existing data uses "isWatched"
{ title: "Inception", isWatched: true, ... }

// Line 37 — form creates new objects with "isWatch"
const peliNueva = {
  title: titulo,
  isWatch: vistaYa,     // <-- isWatch (not isWatched)
  ...
};

// Line 61 — template reads "isWatched"
`vista:${peli.isWatched}`  // <-- undefined for NEW movies
```

**Result:**
- **Preloaded movies** (from `catalogoData.js`) display correctly — they have `isWatched` and the template reads `isWatched`.
- **New movies added via the form** display `undefined` for `vista:` — they were created with `isWatch`, but the template reads `isWatched`.

**Root cause:** The form constructor (line 37) used `isWatch` while the existing data and template both use `isWatched`. A simple typo/oversight when writing the form.

✅ **Fix (Option A — recommended):** Change the form to match existing data:
```js
// Line 37 of peliculasModi/peliculas.js — change isWatch → isWatched
const peliNueva = {
  ...
  isWatched: vistaYa,
  ...
};
```

✅ **Fix (Option B):** Change the template to match the form:
```js
// Line 61 — change isWatched → isWatch
`vista:${peli.isWatch}`
```
(But then preloaded movies would show `undefined` instead — Option A is better.)

**Key rule:** When adding new code that works with existing data, **match the existing property names**. Decide on a convention and stick to it across all files. `isWatched` already existed → new code should use `isWatched`.

---

### Note — DOM refs in a separate file (not a bug)

`divLista` and all other DOM references are declared in **`domRefs.js`**:

```js
// domRefs.js — loaded via <script src="domRefs.js"> in the HTML
const inputTitulo = document.getElementById("inputTitulo");
const inputGenero = document.getElementById("inputGenero");
const inputDuracion = document.getElementById("inputDuracion");
const inputAnio = document.getElementById("inputAnio");
const inputRating = document.getElementById("inputRating");
const inputCast = document.getElementById("inputCast");
const inputBudget = document.getElementById("inputBudget");
const inputRevenue = document.getElementById("inputRevenue");
const vistaYaRadios = document.getElementsByName("vistaYa");
const btnAgregar = document.getElementById("btnAgregar");
const selectGenero = document.getElementById("selectGenero");
const divLista = document.getElementById("divLista");
const divFiltro = document.getElementById("divFiltro");
const divBotones = document.getElementById("divBotones");
```

**Key:** The HTML loads scripts in order:
```html
<script src="domRefs.js"></script>       <!-- first: DOM refs -->
<script src="catalogoData.js"></script>  <!-- second: data -->
<script src="peliculas.js"></script>      <!-- third: logic -->
```

Since `domRefs.js` runs first, all variables are available when `peliculas.js` executes. This is a valid multi-file pattern — **not a bug**.

**However**, this pattern has trade-offs:

| Pro | Con |
|-----|-----|
| Keeps DOM queries separate from logic | Creates implicit global dependencies |
| Reusable across scripts | If `domRefs.js` is missing from HTML, **every variable is `undefined`** (silent errors) |
| Cleaner per-file | Harder to trace where a variable comes from |

**Teaching tip:** For small projects, declaring all DOM refs at the top of one file is simpler and avoids the hidden dependency.

---

### Bug 2 — Filter result never displayed

```js
// Lines 85–89:
selectGenero.addEventListener("change", (e) => {
  let generoS = selectGenero.value;
  const cataGeneroS = catalogo.filter((peli) => {
    return peli.genre === generoS;
  });
  // ❌ cataGeneroS is computed but never rendered anywhere
});
```

**Result:** The filtered array is computed but silently discarded. The user sees no change in the UI.

✅ **Fix:** Render the filtered results to `divFiltro`:
```js
selectGenero.addEventListener("change", (e) => {
  const generoS = selectGenero.value;
  const cataGeneroS = catalogo.filter((peli) => peli.genre === generoS);
  divFiltro.innerHTML = "<strong>Filtradas:</strong><br>" +
    cataGeneroS.map((peli) =>
      `T: ${peli.title}, G: ${peli.genre} (${peli.releaseYear})`
    ).join("<br>");
});
```

**Rule:** Every computed result must have a side effect (render to DOM, log, etc.), otherwise the computation is dead code.

---

### Bug 3 — `divFiltro.innerText = "hola"` overwrites content

```js
// Line 92:
divFiltro.innerText = "hola";
```

**Result:** This runs **immediately on page load**, setting `divFiltro` to `"hola"`. Any later filter output (even if properly rendered) would need to overwrite this value — but since the filter output never gets rendered (Bug 2), the user only ever sees `"hola"`.

✅ **Fix:** Remove the debug line. If initial placeholder text is desired, use it only as a default that gets replaced by actual filter results.

---

### Bug 4 — No `renderCatalogo()` function

In `peliculasOk/peliculas.js`, the catalog is rendered via a reusable `renderCatalogo()` function. In `peliculasModi/peliculas.js`, rendering is embedded inside `agregar()` only:

```js
function agregar(peliNueva) {
  // ... validation and push ...
  divLista.innerHTML = `<strong>Todas las películas:</strong><br>` +
    catalogo.map((peli) => { /* ... */ }).join(`<br>`);
}
```

**Problem:** There is no way to re-render the full catalog after other mutations (e.g., sort, delete, reset). The display logic is coupled to `agregar()`.

✅ **Fix:** Extract a `renderCatalogo()` function and call it from `agregar()`:
```js
function renderCatalogo() {
  divLista.innerHTML = `<strong>Todas las películas:</strong><br>` +
    catalogo.map((peli) => {
      return `T: ${peli.title}, G: ${peli.genre}, ...`;
    }).join(`<br>`);
}

function agregar(peliNueva) {
  // ... validation and push ...
  renderCatalogo();
}
```

---

### Bug 5 — Validation logic conflates form errors with duplicate checking

```js
// Lines 29–48:
if (valido) {
  agregar(peliNueva);
} else {
  const duplicado = catalogo.find(p => p.title.toLowerCase() === inputTitulo.value.trim().toLowerCase());
  if (duplicado) {
    alert(`${titulo} is ALREADY in CATALOGO ...`);
  } else {
    alert(`Fill up the form PROPERLY ...`);
  }
}
```

**Problem:** When validation fails, the code checks for duplicates. If a duplicate exists, it shows an "already in catalog" message — but the form could be invalid for an entirely different reason (e.g., duration is 0, rating is missing). The user gets a misleading error message. Also, `agregar()` already has its own duplicate check (line 52), so the duplicate check runs **twice**.

✅ **Fix:** Separate concerns:
```js
// First check for duplicates on valid input:
if (valido) {
  const duplicado = catalogo.find(p => p.title.toLowerCase() === titulo.toLowerCase());
  if (duplicado) {
    alert(`${titulo} is ALREADY in CATALOGO ...`);
  } else {
    agregar(peliNueva);
  }
} else {
  alert(`Fill up the form PROPERLY ...`);
}
```

Then remove the duplicate check from inside `agregar()` (or keep it as a safety net but don't duplicate the alert logic).

---

### Bug 6 — Event delegation vs individual event listener

In `peliculasOk/peliculas.js`, the solution uses **event delegation** on `divBotones`:

```js
divBotones.addEventListener("click", (e) => {
  const genero = e.target.value;
  if (!genero) return;
  // filter + render
});
```

In `peliculasModi/peliculas.js`, an **individual event listener** is attached to `selectGenero`:

```js
selectGenero.addEventListener("change", (e) => { ... });
```

**Problem:** The comment block at lines 94–101 explicitly asks for event delegation on `divBotones`, but the implementation uses a `<select>` element with a single change listener. These are two different approaches — the student didn't follow the spec.

✅ **Fix:** Either implement event delegation on `divBotones` as required, or the comment block should be updated to reflect the `<select>` approach. The correct solution based on the spec is:
```js
divBotones.addEventListener("click", (e) => {
  const genero = e.target.value;
  if (!genero) return;
  // filter + render
});
```

---

### Bug 7 — Unused parameters and variables

```js
// Line 85:
selectGenero.addEventListener("change", (e) => {  // <-- `e` is never used
  let generoS = selectGenero.value;                // <-- does not need `let`
  const cataGeneroS = catalogo.filter((peli) => {  // <-- `cataGeneroS` never used
    return peli.genre === generoS;
  });
});
```

✅ **Fix:** Remove unused parameters, use `const` for values that don't change, and render the result.

---

## Summary table — All bugs in `peliculasModi/peliculas.js`

| # | Bug | Line(s) | Cause | Fix |
|---|-----|---------|-------|-----|
| 1 | Property mismatch (`genre`) | 61 | Template uses `peli.genero`, catalogoData has `genre` | Use `peli.genre` |
| — | Naming inconsistency (`isWatch`) | 37, 61 | Form creates `isWatch`, template reads `isWatched` | Use `isWatched` everywhere |
| 2 | Filter result discarded | 87–89 | `cataGeneroS` computed but not rendered | Render to `divFiltro` |
| 3 | `divFiltro.innerText = "hola"` | 92 | Debug line overwrites filter area | Remove or change logic |
| 4 | No reusable render function | 51–62 | Display logic stuck inside `agregar()` | Extract `renderCatalogo()` |
| 5 | Validation logic conflated | 41–48 | Duplicate check inside `else` of form validation | Split concerns |
| 6 | Wrong approach vs spec | 83–91 | Uses `<select>` instead of button delegation | Use event delegation on `divBotones` |
| 7 | Unused `e` parameter | 85 | Event param never referenced | Remove or use properly |

---

## Key rules to remember

| Rule | Why |
|------|-----|
| `.value` is always a string | Use `Number()` for numeric inputs |
| Declare DOM refs before use | `document.getElementById()` at top of file |
| `map()` needs `join()` | Without `join()`, `.toString()` adds commas |
| Arrow `{}` needs `return` | Bare `{}` returns `undefined` |
| Match object property names exactly | `genre` vs `genero` breaks rendering |
| Every computed value needs a side effect | Otherwise it's dead code |
| Event delegation vs direct listener | Know which one the spec requires |
| Separate duplicate checking from validation | Don't conflate two concerns |

---

## Clean Separation of Concerns

Validation gates first, duplicate check second, insert third. That's the right call.

```js
btnAgregar.addEventListener("click", () => {
  // 1. Form validation — reject early if invalid
  if (titulo === "" || genero === "" || !(anio > 0) /* etc */) {
    alert("Fill up the form PROPERLY ...");
    return;
  }

  // 2. Duplicate check — reject if already exists
  const duplicado = catalogo.find(
    p => p.title.toLowerCase() === titulo.toLowerCase()
  );
  if (duplicado) {
    alert(`${titulo} is ALREADY in CATALOGO ...`);
    return;
  }

  // 3. Only now: insert and render
  catalogo.push({ titulo, genero, anio, ... });
  renderCatalogo();
});
```

- No conflated `if/else` — each concern is its own `if + return` guard.
- `agregar()` is simplified to pure push + render, no duplicate logic.
- Every failure path returns immediately; the happy path falls through cleanly.

---

## `ReferenceError: Cannot access 'inputVentas' before initialization`

**Error (at `domElement.js:10:47`):**
```
Uncaught ReferenceError: Cannot access 'inputVentas' before initialization
```

### Bug — missing quotes in `getElementById`

```js
// Line 10 of domElement.js — hex dump confirms NO quotes around argument:
const inputVentas   = document.getElementById(inputVentas);
//                                                ^^^^^^^^^^
//                                                bare variable, not a string!
```

### Why the TDZ error occurs

1. `const inputVentas` is being **declared** on this line.
2. `inputVentas` on the right side (the argument to `getElementById`) is treated as a **variable reference**, not a string literal.
3. Since the declaration hasn't completed yet, `inputVentas` is in the **temporal dead zone (TDZ)**.
4. Accessing a `const`/`let` variable during its TDZ throws `ReferenceError: Cannot access 'X' before initialization`.

Compare with the correct pattern (lines 8-9 of the same file):
```js
const inputCast     = document.getElementById("inputCast");   // ✅ double quotes
const inputPresu    = document.getElementById('inputPresu');  // ✅ single quotes
const inputVentas   = document.getElementById(inputVentas);   // ❌ NO quotes — TDZ error
```

### Fix

Add quotes around the argument:
```js
const inputVentas   = document.getElementById('inputVentas');
```

### Rule

`document.getElementById()` expects a **string** as its argument. Without quotes, JavaScript reads it as a variable name — and if that variable is the same `const` being declared, the circular reference triggers the TDZ before initialization completes.

---

## Java `new Object() { ... }` vs JavaScript `{ ... }`

Yes, that specific syntax is valid in Java but does something completely different:

```java
Object pelicula = new Object() {
    String titulo = "";
    String genero = "";
    int anio = 0;
};
```

This creates an **anonymous inner class** — a new unnamed subclass of `Object` with those fields. It's not a simple object/dictionary like JavaScript's `{}`.

| | JavaScript | Java |
|---|---|---|
| Syntax | `{ titulo: "" }` | `new Object() { String titulo = ""; }` |
| What it creates | Plain dictionary | Anonymous subclass instance |
| Access pattern | `obj.titulo` or `obj["titulo"]` | `obj.titulo` (only if cast) |

The JavaScript syntax `new Object(){ ... }` is **not valid** in either language — Java uses `new Object() { field declarations; }` (semicolons, type declarations, no commas) and JavaScript uses `{ key: value }`.

So you're mixing two different language patterns. Stick with `{ titulo: "", genero: "", anio: 0 }` for JavaScript.

---

## Conflicting `catalogo` declarations — redeclaration erases initial data

Found the problem. You have **two conflicting declarations** of `catalogo`:

**`catalogoIni.js` (loaded 2nd in HTML):**
```js
catalogo = [   // ← no const/let/var — creates a global
  { titulo: "Inception", ... },
  ...
];
```

**`peliculas.js` line 6 (loaded 3rd in HTML):**
```js
const catalogo = [];  // ← redeclares catalogo as empty array
```

**Execution order when the page loads:**

1. `domElement.js` → DOM refs
2. `catalogoIni.js` → creates global `catalogo` with 8 movies
3. `peliculas.js` line 6 → `const catalogo = []` overwrites it with an empty array (or throws `SyntaxError: already declared`)

So yes — you are **deleting** the initial 8 movies from `catalogoIni.js` by redeclaring `catalogo` as empty in `peliculas.js`.

**Fix:** Remove line 6 from `peliculas.js` — `catalogo` is already declared in `catalogoIni.js`:

```js
// DELETE this line from peliculas.js:
// const catalogo = [];
```

**Or better,** move everything into one file and delete `catalogoIni.js`:

```js
// peliculas.js — all in one place
const catalogo = [
  { titulo: "Inception", genero: "Ciencia Ficción", anio: 2010 },
  { titulo: "Superbad", genero: "Comedia", anio: 2007 },
  // ...
];
```

Which approach do you prefer?

---

## Template object bugs — `catalogo` commented out, empty entries, `.join()` fragility

### Bug 1 — `catalogo` is not declared

```js
// const catalogo = [pelicula];   ← commented out
function mostrarCatalogo() {
  catalogo.map(...)   // ❌ ReferenceError: catalogo is not defined
}
```

**Fix:** Uncomment the line or declare `catalogo` with real data.

### Bug 2 — Template object has no `titulo` when used as a catalog entry

If you uncomment `const catalogo = [pelicula]`, the catalog starts with:

```js
[{ titulo: "", genero: "", anio: 0, cast: [], boxOffice: { presupuesto: 0, taquilla: 0 } }]
```

That empty entry will render as:

```
1: Título: , Genero: , Año: 0, Cast: , boxOffice: Presupuesto: 0, Taquilla: 0
```

Probably not what you want. Better to start with an empty array or real movie data:

```js
const catalogo = [];  // start empty, add via form

// or

const catalogo = [
  { titulo: "Inception", genero: "Ciencia Ficción", anio: 2010, cast: ["Leo"], boxOffice: { presupuesto: 160, taquilla: 836 } }
];
```

### Potential Bug 3 — `.join()` on non-array

`p.cast.join(', ')` will throw `TypeError` if any movie's `cast` is `undefined` or not an array. Since all movies follow the template, this is safe for now — but if later you add movies without `cast`, it breaks.

✅ **Safe guard:**
```js
Cast: ${Array.isArray(p.cast) ? p.cast.join(', ') : "N/A"}
```

### Summary of needed fixes

| # | Issue | Fix |
|---|-------|-----|
| 1 | `catalogo` not declared | Uncomment + decide: empty `[]` or real data? |
| 2 | Empty template object as only entry | Don't use the template in `catalogo` — just define the shape for reference |
| 3 | `.join()` fragile if `cast` missing | Add guard or ensure all objects have `cast: []` |

Want me to plan a fix once you're ready?

---

## Full debug report — `peliculas.js` and related files

### 🔴 Bug 1 — `inputCast.value` not accessed (line 29)

```js
const cast = inputCast.split(', ');   // ❌ inputCast is an HTMLElement
```

`inputCast` is a DOM element (from `domElement.js`). DOM elements don't have `.split()`.

✅ **Fix:** `inputCast.value.split(',')`. Also note: the original `peliculasOk` uses `','` (no space), but you wrote `', '` (comma+space) — either works as long as the user types consistently.

### 🔴 Bug 2 — `inputTaquilla` is not declared (line 31)

Three-way mismatch:

| File | Declaration |
|------|------------|
| HTML line 39 | — |
| `domElement.js` line 10 | `const inputVentas = document.getElementById('inputVentas')` |
| `peliculas.js` line 31 | `Number(inputTaquilla.value)` |

✅ **Fix (choose one):**
- **Option A:** Change HTML `id` to `inputVentas`, change `peliculas.js` to use `inputVentas`
- **Option B:** Change `domElement.js` to `const inputTaquilla = document.getElementById('inputTaquilla')`

### 🔴 Bug 3 — `catalogoIni.js` movies lack `cast` and `boxOffice` (line 17-18)

```js
Cast: ${p.cast.join(', ')},                  // ❌ p.cast is undefined
boxOffice: Presupuesto: ${p.boxOffice.presupuesto}  // ❌ p.boxOffice is undefined
```

Preloaded movies from `catalogoIni.js` only have `{ titulo, genero, anio }`. They don't have `cast` or `boxOffice`. When `mostrarCatalogo()` runs on page load, it iterates over all 8 preloaded movies and crashes on `.join()` of `undefined`.

✅ **Fix — either:**
- **A:** Add `cast: []` and `boxOffice: { presupuesto: 0, taquilla: 0 }` to every preloaded movie in `catalogoIni.js`
- **B:** Add optional chaining guards in the template:
  ```js
  Cast: ${p.cast?.join(', ') || "N/A"}
  boxOffice: Presupuesto: ${p.boxOffice?.presupuesto ?? 0}
  ```

### 🟡 Bug 4 — `catalogoIni.js` const vs `peliculas.js` `mostrarCatalogo()`

`catalogo.js` uses `const catalogo = [...]`. `mostrarCatalogo()` calls `catalogo.map(...)`. This works (no redeclaration issue since `catalogoIni.js` runs first). But the `mostrarCatalogo()` call at line 67 runs before any movies are pushed — it tries to render preloaded movies and crashes with **Bug 3**.

### 🟡 Bug 5 — `divBotones` listener has unnecessary `e.preventDefault()` (line 56)

```js
divBotones.addEventListener("click", (e) => {
  e.preventDefault();   // ❌ unnecessary — divBotones is not a form
```

Buttons inside a `<div>` don't trigger form submission. `preventDefault()` does nothing here.

### ⚪ Bug 6 — Unused template object (lines 1-11)

```js
let boxOffice = { presupuesto:0, taquilla:0 };  // unused
let pelicula = { titulo: "", genero: "", anio: 0, cast:[], boxOffice };  // unused
```

This is **dead code** — `pelicula` and `boxOffice` are never used anywhere.

### ✅ Summary of necessary fixes

| Priority | Bug | File:Line |
|----------|-----|-----------|
| 🔴 | `inputCast` → `inputCast.value` | `peliculas.js:29` |
| 🔴 | `inputTaquilla` not declared | `domElement.js:10` + `peliculas.js:31` |
| 🔴 | Preloaded movies missing `cast`/`boxOffice` | `catalogoIni.js` |
| 🟡 | Unnecessary `preventDefault()` | `peliculas.js:56` |
| ⚪ | Dead template code | `peliculas.js:1-11` |

Ready to fix any of these when you are.

---

## Analysis of your `.map()` callback

### 🔴 Bug 1 — `${}` inside `if()` (not in template literal)

```js
if ((${Number(p.anio)}) > 2000) {  // ❌ $ {} only works inside backticks
```

The `${}` syntax is only valid inside backtick template literals. Here it's in plain JS before the `return` → syntax error or unexpected identifier.

✅ **Fix:**
```js
if (p.anio > 2000) {
```

### 🟡 Bug 2 — `color1` never declared

```js
color1 = "darkgreen";   // ❌ implicit global
```

No `let`, `const`, or `var`. In strict mode this throws `ReferenceError`.

✅ **Fix:** `let color1 = "darkgreen";`

### 🟡 Bug 3 — `color1` set but never used

You assign `color1` but never apply it to any element (e.g., no `style.color = color1`). Dead assignment.

✅ **Fix:** Either use it:
```js
return `<strong style="color:${color1}">${i+1}.- ...`;
```
Or remove it entirely if coloring isn't needed.

### ✅ Everything else is fine

| Expression | Status |
|---|---|
| `p.genero.toUpperCase()` | ✅ works (string method) |
| `p.cast.join(', ')` | ✅ works (array method) |
| `$${p.boxOffice.budget}` | ✅ correct — `$$` renders `$`, `${}` interpolates value |
| `Number(p.anio)` | ✅ safe conversion (though `p.anio` is already a number) |

### Recommended cleaner version

```js
catalogo.map((p, i) => {
  const color = p.anio > 2000 ? "darkgreen" : "red";
  return `<strong style="color:${color}">${i + 1}.- Titulo: ${p.titulo}</strong>, 
  Año: ${p.anio}, Genero: ${p.genero.toUpperCase()}, 
  Cast: ${p.cast.join(', ')}, 
  Presupuesto: $${p.boxOffice.budget} millones, 
  Recaudación: $${p.boxOffice.taquilla} millones`;
})
```

Want me to apply this fix when we exit plan mode? @peliculasDebug.md

---

## `<style>` vs `<span style>` — inline styling

The problem is `<style>` is not an HTML tag for inline styling — it's the CSS block tag used in `<head>`. You want a `<span>` (or any element) with the `style` attribute:

```js
const color1 = p.anio >= 2000 ? "darkgreen" : "red";
return `<strong>${i + 1}.- Titulo: ${p.titulo}</strong>, 
<span style="color:${color1}">Año: ${p.anio}</span>, 
Genero: ${p.genero.toUpperCase()}, 
Cast: ${p.cast.join(', ')}, 
Presupuesto: $${p.boxOffice.budget} millones, 
Recaudación: $${p.boxOffice.taquilla} millones<br>`;
```

| | Your approach | Correct approach |
|---|---|---|
| Syntax | `<style="color:red">Año</style>` | `<span style="color:red">Año</span>` |

Want me to apply the fix to your file?

---

## Plan for `agregar` function in MiPeliSimple

**Current state:** No event listener exists yet. The form button has no id.

### Changes needed

**1. `index.html`** — Add `id="btnAgregar"` to the submit button:
```html
<button id="btnAgregar">Enviar</button>
```

**2. `domElement.js`** — Add the button reference:
```js
const btnAgregar = document.getElementById('btnAgregar');
```

**3. `pelis.js`** — Extract a `renderCatalogo()` function, then add the click handler:

```js
function renderCatalogo() {
  const html = catalogo.map((p, i) => {
    const color = p.anio >= 2000 ? "darkgreen" : "red";
    return `<strong>${i + 1}.- Titulo: ${p.titulo}</strong>
<span style="color:${color}">Año: ${p.anio}</span>
Genero: ${p.genero.toUpperCase()}
Cast: ${p.cast.join(', ')}
Presupuesto: $${p.boxOffice.budget} millones
Recaudación: $${p.boxOffice.taquilla} millones<br>`;
  }).join("");
  divMostrar.innerHTML = "<h3>Catalogo Completo</h3>" + html;
}

btnAgregar.addEventListener('click', (ev) => {
  ev.preventDefault();

  const titulo = inputTitulo.value.trim();
  const genero = inputGenero.value;
  const cast = inputCast.value.trim();
  const budget = Number(inputBudget.value);
  const taquilla = Number(inputTaquilla.value);
  const anio = Number(inputAnio.value);

  // validation
  if (titulo === "" || genero === "" || cast === "" || !(anio > 0) || budget <= 0 || taquilla <= 0) {
    alert("Fill up the form PROPERLY ...");
    return;
  }

  // check duplicate
  if (catalogo.some(p => p.titulo.toLowerCase() === titulo.toLowerCase())) {
    alert(`${titulo} ya está en CATÁLOGO`);
    return;
  }

  // add movie
  catalogo.push({
    titulo,
    genero,
    anio,
    cast: cast.split(',').map(a => a.trim()),
    boxOffice: { budget, taquilla }
  });

  renderCatalogo();

  // clear inputs
  inputTitulo.value = "";
  inputCast.value = "";
  inputBudget.value = "";
  inputTaquilla.value = "";
  inputAnio.value = "";
  inputGenero.value = "accion";
});

// initial render
renderCatalogo();
```

Also need to **remove** the existing standalone `.map()` + `.join("")` at the bottom of `pelis.js` (lines 1-17) since it becomes part of `renderCatalogo()`.

---

## Six bugs in `pelis.js`

### 🔴 Bug 1 — `renderCatalogo()` template broken (pelis.js:12-15)

```js
function renderCatalogo(){
    let html = "";
    return html = catalogo.map((p,i)=>{
        `<strong>${i+1}.- Titulo: p.titulo,</strong> ...`
//                          ^^^^^^^^^ literal text, NOT interpolated
    })
}
```

Three errors:

| Issue | Line | Wrong |
|-------|------|-------|
| Missing `${}` | 14 | `p.titulo,` (literal) |
| Wrong property | 14 | `p.presupuesto` |
| Wrong property | 14 | `p.budget` |
| Missing `.join()` | 15 | returns array |

### 🔴 Bug 2 — Double `.split()` on cast (pelis.js:23 + :42)

```js
// Line 23 — already splits into array
const cast = inputCast.value.trim().split(',');
// Line 42 — tries to split an array → TypeError
cast: cast.split(',').map((p)=>p.trim()),
```

`cast` is already an `["Tom", "Hans"]` array after line 23. You call `.split()` on it again which doesn't exist on arrays.

✅ **Fix:** Use `cast.map(a => a.trim())` (no split), or do it all on line 23:
```js
const cast = inputCast.value.trim().split(',').map(a => a.trim());
// then line 42: cast: cast,
```

### 🔴 Bug 3 — `catalogo.includes(titulo)` always false (pelis.js:34)

```js
if(catalogo.includes(titulo)){   // ❌ always false
```

`includes()` compares by reference (`===`). A string `"RockyIV"` is never `===` to an object `{ titulo:"RockyIV", ... }`. This check never catches duplicates.

✅ **Fix:**
```js
if (catalogo.some(p => p.titulo.toLowerCase() === titulo.toLowerCase())) {
```

### 🟡 Bug 4 — Weak validation (pelis.js:30)

```js
const valido = (titulo!=="" && anio >= 1900)? true:false;
```

Only checks `titulo` and `anio`. Missing `cast`, `budget`, `taquilla`, `genero`. A movie with empty cast or zero budget passes validation.

✅ **Fix:**
```js
const valido = titulo !== "" && cast.length > 0 && anio >= 1900 && budget > 0 && taquilla >= 0;
```

### 🟡 Bug 5 — Genre mismatch (HTML vs catalogo.js)

| File | Value |
|------|-------|
| `index.html:70,84` | `<option value="ficcion">` |
| `catalogo.js:48` | `"The Matrix"` has `genero: "ciencia ficcion"` |

`"The Matrix"` has `genero: "ciencia ficcion"` but the filter selects `"ficcion"`. `p.genero === generoS` → `false`, so it never appears when filtering by Ficción.

✅ **Fix:** Change HTML to `<option value="ciencia ficcion">Ficción</option>` in both selects.

### 🟡 Bug 6 — Duplicate rendering paths (pelis.js:1-9 + :54 vs :11-16)

Lines 1-9 and 54 render the catalog on page load:
```js
const texto = catalogo.map(...).join("<br>");
divMostrar.innerHTML = "<h3>Catalogo Completo</h3>" + texto;
```

But `renderCatalogo()` on line 11-16 exists but is broken (Bug 1). After fixing Bug 1, you should pick **one** rendering path — replace lines 1-9 + 54 with a call to `renderCatalogo()`, and remove the duplicate.

### ✅ Clean fixed structure (proposed)

```js
// pelis.js
function renderCatalogo() {
  const html = catalogo.map((p, i) => {
    const color = p.anio >= 2000 ? "darkgreen" : "red";
    return `<strong>${i + 1}.- Titulo: ${p.titulo}</strong>
<span style="color:${color}">Año: ${p.anio}</span>
Genero: ${p.genero.toUpperCase()}
Cast: ${p.cast.join(', ')}
Presupuesto: $${p.boxOffice.budget} millones
Recaudación: $${p.boxOffice.taquilla} millones<br>`;
  }).join("");
  divMostrar.innerHTML = "<h3>Catalogo Completo</h3>" + html;
}

btnEnviar.addEventListener('click', (ev) => {
  ev.preventDefault();

  const titulo = inputTitulo.value.trim();
  const genero = inputGenero.value;
  const cast = inputCast.value.trim().split(',').map(a => a.trim());
  const budget = Number(inputBudget.value);
  const taquilla = Number(inputTaquilla.value);
  const anio = Number(inputAnio.value);

  if (titulo === "" || cast.length === 0 || !(anio >= 1900) || budget <= 0 || taquilla <= 0) {
    alert("Valores NO validos ...");
    return;
  }

  if (catalogo.some(p => p.titulo.toLowerCase() === titulo.toLowerCase())) {
    alert(`${titulo} ya está incluida en CATALOGO ...`);
    return;
  }

  catalogo.push({ titulo, genero, anio, cast, boxOffice: { budget, taquilla } });
  renderCatalogo();

  // clear form
  inputTitulo.value = "";
  inputCast.value = "";
  inputBudget.value = "";
  inputTaquilla.value = "";
  inputAnio.value = "";
  inputGenero.value = "accion";
});

renderCatalogo();
```

| Priority | Bug |
|----------|-----|
| 🔴 | `renderCatalogo()` template broken |
| 🔴 | Double `.split()` on cast |
| 🔴 | `includes()` can't find duplicates |
| 🟡 | Weak validation |
| 🟡 | Genre mismatch `"ficcion"` vs `"ciencia ficcion"` |
| 🟡 | Duplicate rendering paths |

Ready to apply these fixes?

---

## Found the bugs — `pelis.js` fix analysis

### Current messy state of `pelis.js`

The file has multiple conflicting attempts at `renderCatalogo()` (three versions stacked), duplicate event listeners, and dead code.

### Bug fixes applied

| Bug | Details | Fix |
|-----|---------|-----|
| `return` + newline → ASI returns `undefined` | `return` followed by a template literal on a new line triggers automatic semicolon insertion | Put `return` and the value on the same line |
| `.map()` without `.join()` | Renders `[object Object]` | Add `.join("<br>")` or `.join("")` |
| Duplicate initial render code | `texto` + `divMostrar.innerHTML` at bottom duplicates `renderCatalogo()` | Pick one — call `renderCatalogo()` |
| `console.table` with `.join()` | `console.table(catalogo.join(', '))` shows `[object Object]` | Use `console.table(catalogo)` |
| Redundant `? true : false` | `const valido = (cond) ? true : false` | `const valido = cond` |
| `cast.split()` then `cast.map()` | Already split on line 23, split again on line 42 → `TypeError` | Do it once: `cast.split(',').map(a => a.trim())` |
| Weak validation | Only checks `titulo` and `anio` | Add `cast`, `budget`, `taquilla` |
| Form not clearing after add | Inputs keep old values after successful push | Reset all inputs after `catalogo.push()` |

---

## Two classic bugs — ASI after `return` + wrong parameter name

### Bug 1 — ASI after `return`

```js
return        // ← JS inserts `;` here → returns undefined
`${i+1}.- ${peli.titulo}, ...
```

A line break after `return` triggers **automatic semicolon insertion (ASI)**. The function returns `undefined`. The template literal on the next line is dead code.

### Bug 2 — Wrong parameter name in `.map()`

```js
catalogoG.map((p, i) => {     // ← parameter is p
    return `${i+1}.- ${peli.titulo}, ...`  // ← peli is not defined
```

You named the parameter `p` but reference `peli` inside — `peli` is `undefined`.

### Fix

```js
const html = catalogoG.map((peli, i) =>
    `${i+1}.- ${peli.titulo}, ${peli.genero}`
).join(`<br>`);
```

**Key:** Use **implicit return** (no `{}`, no `return` keyword) to avoid the ASI trap entirely. Match the parameter name to what you reference in the body.

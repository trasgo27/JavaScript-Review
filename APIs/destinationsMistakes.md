# Destinations Mistakes

## unlinked script

### 1. desti.js — Object literal syntax error (line 9)
```js
const destino = {ciudad = inputCiu.value, continente=inputConti.value};
```
**Fix:** Use `:` instead of `=` for key-value pairs in object literals.
```js
const destino = {ciudad: inputCiu.value, continente: inputConti.value};
```

### 2. desti.js — No input validation
Empty inputs are accepted and pushed as empty strings into the vector.

### 3. desti.js — `.join()` on objects
`vector.join()` calls `.toString()` on each object, producing `[object Object]` — not readable output.

### 4. desti.js — Wrong property access in `.map()` callback (line 16)
```js
linea = `Destino: ${i+1}: ${d[i].ciudad} en ${d[i].continente}`;
```
**Bug:** `d` is the current object, but `d[i]` tries to index it numerically — `d` is an object, not an array. This throws `TypeError: Cannot read properties of undefined`.

**Fix:** Access properties directly on `d` — no bracket index needed.
```js
linea = `Destino: ${i+1}: ${d.ciudad} en ${d.continente}`;
```

### 5. desti.js — Stray `div` keyword on line 32
```js
div
```
**Bug:** Bare `div` keyword causes a `SyntaxError`. It's leftover junk between the object literal and `vector.push()`.

**Fix:** Remove the stray `div` line.

### 6. desti.js — `.map()` misused for filtering in `divBotones` click handler (lines 42-52)
```js
divBotones.addEventListener("click",(e)=>{
  let contiSeleccion = e.target.value;
  let stringSeleccion = "";
  let vectorSeleccion = vector.map((d,i)=>{
    if(d.continente === contiSeleccion){
      stringSeleccion = `${i+1}, ciudad: ${d.ciudad}, continente: ${d.continente}`
    }else{

    }
    return stringSeleccion;
  });
});
```
**Bugs:**
- `.map()` returns a value for **every** element. Non-matching items return whatever `stringSeleccion` held from the previous match, causing duplicate/wrong results.
- `stringSeleccion` is a shared mutable variable — state leaks across iterations.
- Empty `else` block is dead code.

**Fix:** Use `.filter()` then `.map()`, or return the string only on match and filter out falsy values:
```js
divBotones.addEventListener("click",(e)=>{
  let contiSeleccion = e.target.value;
  let vectorSeleccion = vector
    .filter(d => d.continente === contiSeleccion)
    .map((d,i) => `${i+1}, ciudad: ${d.ciudad}, continente: ${d.continente}`);
});
```

### 7. desti.js — No initial render
`vector` starts with 10 items but nothing is displayed on page load. User has to trigger an event to see any data.

**Fix:** Call the render logic after the event listener setup, or extract a render function and invoke it once at startup.

### 8. desti.js — Broken `.filter()` + `.map()` chain in `divBotones` handler
```js
divBotones.addEventListener("click",(e)=>{
  let contiSeleccion = e.target.value;
  let vectorSeleccion = vector
  .filter((d)=>{
    d.continente === contiSeleccion;
  });
  .map((d,i)=>{
    if(d.continente === contiSeleccion){
      stringSeleccion = `${i+1}, ciudad: ${d.ciudad}, continente: ${d.continente}`
    }else{
      stringSeleccion = "";
    }
    return stringSeleccion;
  });
});
```
**Bugs:**
- `.filter()` uses `{}` but no `return` — always returns `undefined`, producing an empty array.
- Semicolon after `)});` breaks the chain — `.map()` on the next line is a dangling `SyntaxError`.
- `stringSeleccion` is commented out (`//let stringSeleccion = ""`) → `ReferenceError` at runtime.
- `.map()` re-checks the filter condition redundantly — `.filter()` already did that.

**Fix:**
```js
divBotones.addEventListener("click",(e)=>{
  let contiSeleccion = e.target.value;
  let vectorSeleccion = vector
    .filter(d => d.continente === contiSeleccion)
    .map((d,i) => `${i+1}, ciudad: ${d.ciudad}, continente: ${d.continente}`);
});
```

### 9. desti.js/desti.html — Spanish accents in continent names
Vector had accented continents (`"América"`, `"Oceanía"`, `"África"`) which didn't match the button values (`"America"`, `"Oceania"`, `"Africa"`).

**Fix:** Normalized all continent strings in `desti.js` to accent-free versions:
- `"América"` → `"America"`
- `"Oceanía"` → `"Oceania"`
- `"África"` → `"Africa"`

### 10. desti.html — Australia button value mismatch
Button had `value="Australia"` but the continent name in the vector is `"Oceania"`, so filter never matched.

**Fix:** Changed `value="Australia"` to `value="Oceania"` in `desti.html`.
```

# Palindromo Fix

## Files
- `palindromos.html`
- `palindromos.js`

## 🔴 Bugs (3)

### 1. Line 23 — Template literal uses wrong quotes
```js
// ✗ Wrong — single quotes don't interpolate ${}
alert('${palabra} no cumple, tiene ${palabra.length} caracteres');

// ✓ Correct — backticks for template literals
alert(`${palabra} no cumple, tiene ${palabra.length} caracteres`);
```

### 2. Line 25 — Extra push runs after if/else
```js
// ✗ Wrong — pushes empty string because miInput.value was already cleared on line 20
misPalabras.push(miInput.value);

// ✓ Remove this line entirely
```

### 3. Line 30 — Comma instead of semicolon
```js
// ✗ Wrong — trailing comma causes SyntaxError
let texto = '',

// ✓ Correct
let texto = '';
```

---

## 🟡 Improvements

### 1. `mostrarPalabras` function — simplify
```js
// ✗ Current — loop overwrites textContent each iteration, no separator
function mostrarPalabras(vector) {
    let texto = '';
    for (let i of vector) {
        texto += i;
        divMostrar.textContent = texto;
    }
}

// ✓ Improved — use join(), set textContent once
function mostrarPalabras(vector) {
    divMostrar.textContent = vector.join(' - ');
}
```

### 2. `miDiv` — declared but never used (line 1-3)
```js
// Can be removed, not a bug
const miDiv = document.getElementById('miDiv');
```

---

---

## `function invertirPalabras(vector)` — Debug

### User's code
```js
function invertirPalabras(vector){
    let reverso = "";
    let texto = "";
    let palabra="";
    for(let i=0 ; i < misPalabras.length; i++){
        palabra = misPalabras[0];
        for(let j= palabra.length;j>0; j--){
            reverso += palabra.charAt(j);
        }
        texto += `${palabra} - ${reverso} <br> `            
    }
    divMostrar2.innerHTML = texto;
}
```

### 🔴 Bugs

| # | Line | Issue | Fix |
|---|------|-------|-----|
| 1 | 6 | `misPalabras[0]` always takes the **first** word | Change to `misPalabras[i]` |
| 2 | 7 | `j = palabra.length` — `charAt(length)` is out of bounds (returns `""`) | Change to `j = palabra.length - 1` |
| 3 | 7 | Loop condition `j > 0` skips index `0` (first character) | Change to `j >= 0` |
| 4 | 3/5 | `reverso` declared **outside** the `for` loop — never resets, keeps growing | Move `let reverso = "";` **inside** the outer loop |
| 5 | — | Parameter `vector` is unused (uses `misPalabras` directly) | Use `vector[i]` or remove parameter |

### ✅ Corrected version
```js
function invertirPalabras() {
    let texto = "";
    for (let i = 0; i < misPalabras.length; i++) {
        let reverso = "";
        let palabra = misPalabras[i];
        for (let j = palabra.length - 1; j >= 0; j--) {
            reverso += palabra.charAt(j);
        }
        texto += `${palabra} - ${reverso}<br>`;
    }
    divMostrar2.innerHTML = texto;
}
```

### Shorter alternative using `split/reverse/join`
```js
function invertirPalabras() {
    let texto = "";
    for (const palabra of misPalabras) {
        const reverso = palabra.split('').reverse().join('');
        texto += `${palabra} - ${reverso}<br>`;
    }
    divMostrar2.innerHTML = texto;
}
```

---

---

## Debug and Report — Current state

### ✅ Fixed
| Issue | Status |
|-------|--------|
| `invertirPalabras` function logic bugs | ✅ Corrected |
| `divMostrar2` added to HTML | ✅ Present |
| Click handler (extra push, template literals) | ✅ Fixed |
| `mostrarPalabras` uses `join('<br>')` | ✅ Fixed |

### 🔴 Problem
**`invertirPalabras()` is never called.** Defined but never invoked — `divMostrar2` stays empty.

**Fix:** Add call after `mostrarPalabras` on line 24:
```js
mostrarPalabras(misPalabras);
invertirPalabras();  // ← add this
```

### 🟡 Other
| Line | Issue | Suggestion |
|------|-------|------------|
| 1-3 | `miDiv` declared but unused | Remove |
| 35-37 | `quitarRepetidas()` empty stub | Implement or remove |

---

## ✅ What was already correct
- `misPalabras = []` — empty array (not `[""]`)
- `miBoton` typed as `HTMLButtonElement` (not `HTMLDivElement`)
- `miInput.value.trim()` — trims whitespace
- Length validation: `palabra.length >= 6 && palabra.length <= 10`
- `miInput.value = ""` — clears input after valid submission

---

## Uppercase + No duplicates

### Changes applied

**1. Uppercase conversion** (line 20)
```js
const palabra = miInput.value.trim().toUpperCase();
```

**2. Duplicate check** (lines 25-28)
```js
if(misPalabras.includes(palabra)){
    alert(`"${palabra}" ya existe`);
    miInput.value = "";
    return;
}
```

### Flow
1. Input is trimmed and uppercased
2. Check length (6-10) — if not, alert + return
3. Check duplicates via `misPalabras.includes()` — if exists, alert + return
4. Otherwise push to array, clear input, update both divs

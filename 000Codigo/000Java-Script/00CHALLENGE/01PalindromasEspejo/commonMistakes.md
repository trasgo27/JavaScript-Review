# Common Mistakes

## const used for reassignable variables

Using `const` when the variable needs to be reassigned later causes a runtime error.

**File:** `palindromas.js:39-41`, `45`, `54`, `57`

```js
const palabra = "";     // line 39
const inversa = "";     // line 40
const texto = "";       // line 41

button.addEventListener("click", () => {
    palabra = input.value;   // line 45 — Error: can't reassign const
    ...
});

// Inside mostrar():
texto += vector[i];          // line 54 — Error: can't reassign const
texto += vector[i] + ` - `;  // line 57 — Error: can't reassign const
```

**Fix:** Use `let` instead of `const` when the value will change.

```js
let palabra = "";
let texto = "";
```

---

## Duplicated const declarations

Declaring the same variable twice with `const` causes a SyntaxError.

**File:** `palindromas.js:27-31`

```js
const div2 = document.getElementById("div2");  // line 8
const div2 = document.getElementById("div2");  // line 27 — Duplicate!
```

**Fix:** Remove the duplicate declarations.

---

## Off-by-one in loop condition

Using `i <= vector.length` instead of `i < vector.length` reads one extra element past the end of the array, producing `undefined`.

**File:** `palindromas.js:52`

```js
for (let i = 0; i <= vector.length; i++) {  // should be i < vector.length
```

**Fix:**

```js
for (let i = 0; i < vector.length; i++) {
```

---

## Unused variable

Declaring a variable that is never used adds dead code.

**File:** `palindromas.js:40`

```js
const inversa = "";
```

`inversa` is declared but never referenced anywhere in the file.

**Fix:** Remove it if not needed.

---

## Function called at the wrong time

Calling a display function on page load when the data is still empty, and never calling it when data actually changes.

**File:** `palindromas.js:61`, `41-45`

```js
mostrar();  // line 61 — runs on load when vector is empty

button.addEventListener("click", () => {
    palabra = input.value;
    vector.push(palabra);
    alert("Insertada en vector");
    // mostrar() is never called here — display never updates
});
```

**Fix:** Call the display function right after the data changes.

```js
button.addEventListener("click", () => {
    palabra = input.value;
    vector.push(palabra);
    mostrar();  // update display after adding a word
});
```

---

## Early `return` inside a loop

Using `return` to skip the rest of an iteration exits the entire function, so all remaining array elements are never processed.

**File:** `palindromas.js:55`

```js
for (let i = 0; i < vector.length; i++) {
    if (i === 1) {
        texto += vector[i];
        p2.textContent = texto;
        return;   // exits the function — items at index 2, 3, ... are ignored
    }
    texto += vector[i] + ` - `;
}
```

**Fix:** Use `continue` to skip only the current iteration, or finish the loop normally.

```js
for (let i = 0; i < vector.length; i++) {
    texto += vector[i];
    if (i === 1) {
        p2.textContent = texto;
    }
    texto += ` - `;
}
```

---

## textContent vs innerHTML

`textContent` sets plain text — HTML tags like `<br>` are shown literally. `innerHTML` parses and renders HTML tags.

**File:** `palindromas.js:62`

```js
p2.textContent = texto;  // "<br>" appears as literal text, not a line break
```

**Fix:** Use `innerHTML` when you need HTML rendering.

```js
p2.innerHTML = texto;    // "<br>" is rendered as a line break
```

---

## innerHTML vs innerText vs textContent

All three set content inside an element, but handle HTML differently:

| Property | Renders `<br>`? | Respects CSS hidden? | Use case |
|----------|----------------|---------------------|----------|
| `innerHTML` | ✅ Yes | ❌ No | When content has HTML tags |
| `innerText` | ❌ Literal text | ✅ Yes | Text shown to user (slow) |
| `textContent` | ❌ Literal text | ❌ No | Raw text (fast) |

**File:** `palindromas.js (inversar function)`

```js
div3.innerHTML = textFIN;    // ✅ "<br>" becomes a real line break
div3.innerText = textFIN;    // ❌ shows "<br>" as literal text
div3.textContent = textFIN;  // ❌ same — "<br>" is literal
```

**Fix:** Use `innerHTML` if your string contains `<br>` or other HTML tags.

---

## Overwriting instead of building in a loop

Using `=` inside a loop replaces the value each iteration, so only the last assignment survives.

**File:** `palindromas.js (inversar function)`

```js
let inversa = "";
for (let i = 0; i < longi; i++) {
    inversa = palabra.charAt(longi - 1 - i);  // overwrites each time
}
// inversa ends up as only the LAST character
```

**Fix:** Use `+=` to append (concatenate) each character, and reset the variable before the loop.

```js
inversa = "";  // reset before building
for (let i = 0; i < longi; i++) {
    inversa += palabra.charAt(longi - 1 - i);  // append character
}
```

---

## Parentheses on properties (IntelliSense stops working)

Using `()` on a **property** (not a method) breaks IntelliSense — `length` is a property, not a function.

**File:** `palindromas.js (inversar function)`

```js
vectorInv.length();  // ❌ length is a property, not a method
palabra.length();    // ❌ same
```

**Runtime error in console:**

```
palindromas.js:82 Uncaught TypeError: vectorInv.length is not a function
    at inversar (palindromas.js:82:29)
    at HTMLButtonElement.<anonymous> (palindromas.js:51:9)
```

**Fix:** Remove the parentheses.

```js
vectorInv.length;   // ✅ correct
palabra.length;     // ✅ correct
palabra.charAt(i);  // ✅ charAt IS a method — needs parentheses
```

---

## Mutating an array while iterating it (infinite loop)

Using `push()` inside a `for...of` loop over the same array adds new items indefinitely — the loop never reaches the end.

**File:** `palindromas.js (inversar function)`

```js
for (let palabra of vectorInv) {
    // ...
    vectorInv.push(textoInv);  // ❌ adds new items while iterating = infinite loop
}
```

**Fix:** Iterate over a copy of the array, or collect results in a separate array.

```js
const resultados = [];
for (let palabra of vectorInv) {
    // ...
    resultados.push(textoInv);
}
```

---

## Variable not reset inside a loop

If a variable is not reset at the start of each iteration, it carries over accumulated values from previous runs.

**File:** `palindromas.js (inversar function)`

```js
for (let palabra of vectorInv) {
    for (let i = 0; i < longiP; i++) {
        inversa += palabra.charAt(longiP - 1 - i);  // ❌ keeps growing each word
    }
}
```

**Fix:** Reset before the inner loop.

```js
for (let palabra of vectorInv) {
    inversa = "";  // ✅ fresh start for each word
    for (let i = 0; i < longiP; i++) {
        inversa += palabra.charAt(longiP - 1 - i);
    }
}
```

---

## Undeclared variable (implicit global)

Assigning to a variable without `let` or `const` creates a global variable silently.

**File:** `palindromas.js (inversar function)`

```js
textoInv = palabra + ` - ` + inversa;  // ❌ missing let/const
```

**Fix:** Always declare with `let` or `const`.

```js
let textoInv = palabra + ` - ` + inversa;  // ✅ declared
```

---

## Calling a method incorrectly

Using `=` instead of `()` treats the method as a property — you overwrite it instead of calling it.

**File:** `palindromas.js (inversar function)`

```js
console.table = vectorInv;       // ❌ overwrites the method
console.table(vectorInv);        // ✅ calls it
```

---

## Building output then overwriting it

Doing work in a loop and then overwriting the output element at the end discards all the loop's results.

**File:** `palindromas.js (inversar function)`

```js
for (let palabra of vectorInv) {
    // ... builds output ...
}
p3.innerHTML = "hola";  // ❌ overwrites everything the loop did
```

**Fix:** Set the output inside the loop, or only once with the final result.

---

## Missing object name prefix on properties

Using a property name like `length` without the object (`palabra.length`) causes a ReferenceError. Every property must be qualified with its object.

**File:** `palindromas.js:84`

```js
for (let i = length - 1; i <= 0; i--) {   // ❌ "length" is not defined
    palabraInv += palabra.charAt(i);
}
```

**Fix:**
```js
for (let i = palabra.length - 1; i >= 0; i--) {   // ✅ qualified with "palabra"
    palabraInv += palabra.charAt(i);
}
```

---

## Wrong loop condition (loop never runs)

When decrementing (`i--`), the condition should check `i >= 0`, not `i <= 0`. Starting at e.g. 4, `4 <= 0` is immediately `false`.

**File:** `palindromas.js:84`

```js
for (let i = length - 1; i <= 0; i--) {   // ❌ 4 <= 0 is false — loop never runs
```

**Fix:**
```js
for (let i = palabra.length - 1; i >= 0; i--) {   // ✅ runs from end to start
```

---

## Template literal broken by wrong quotes

Using single or double quotes disables `${}` interpolation. Only backticks work for template literals.

**File:** `palindromas.js:93`

```js
textoInv = palabra + '--- ' + invertida + '${(palabra === invertida)}';
//                                        ^^                        ^^
//                                        single quotes — ${} is literal text
```

**Fix:** Use backticks for the whole string.

```js
textoInv = `${palabra} --- ${invertida} ${palabra === invertida}`;
```

---

## Dead code (commented-out blocks)

Large commented-out functions clutter the file and can be confusing. Use version control instead of comments to keep old code.

**File:** `palindromas.js:72-80`, `99-116`

```js
/*function inversar(){
    // ... old version ...
}*/
```

**Fix:** Delete dead code. Git history preserves it if you need it later.

---

## Brackets instead of parentheses on a method

Using `[...]` instead of `(...)` on a method silently returns `undefined`. Methods are called with parentheses.

**File:** `palindromas.js (inversar function)`

```js
palabra1 += palabra0.charAt[longi - j];   // ❌ brackets — undefined
```

**Fix:**
```js
palabra1 += palabra0.charAt(longi - j);   // ✅ parentheses — correct
```

**Tip:** `[]` is for property access (bracket notation), `()` is for calling functions/methods.

---

## Refactoring: replace manual loops with built-in methods

Manual loops for joining or reversing can be replaced with cleaner built-in methods.

### `mostrar()` — before (17 lines)
```js
function mostrar(){
    texto = "";
    for(let i=0 ; i < vector.length ; i++){
        if(i === vector.length - 1){
            texto += vector[i] + `<br>`;
            p2.innerHTML = texto;
            return;
        }
        texto += vector[i] + ` - ` ;
    }    
}
```

### `mostrar()` — after (4 lines)
```js
function mostrar(){
    p2.innerHTML = vector.length 
        ? vector.join(` - `) + `<br>` 
        : "";
}
```

**Built-in used:** `Array.join()` — joins all elements with a separator in one call.

---

### `inversar()` — before (16 lines)
```js
function inversar(){ 
    let textFIN = "";
    for(let i=0;i<vector.length;i++){
        palabra0 = vector[i];
        palabra1 = "";
        for(let j=0;j<palabra0.length;j++){
            palabra1 += palabra0.charAt(longi-j);            
        }
        textFIN += `${palabra0}, ${palabra1}, ... <br>`;
    }
    div3.innerHTML = textFIN;
}
```

### `inversar()` — after (8 lines)
```js
function inversar(){ 
    div3.innerHTML = vector
        .map(p => {
            const r = p.split('').reverse().join('');
            return `${p}, ${r}, ${p === r} <br>`;
        })
        .join('');
}
```

**Built-ins used:** `String.split('')` → `Array.reverse()` → `Array.join('')` for reversal, `Array.map()` to transform each element.

---

## truthy vs falsy — checking an array vs checking its length

`if (vector)` checks if the array **object** is truthy — arrays always are, even when empty. `if (vector.length)` checks the **length value**: `0` is falsy, `> 0` is truthy.

**File:** `palindromas.js (mostrar function)`

```js
p2.innerHTML = vector.length 
    ? vector.join(` - `) + `<br>` 
    : "";
```

- `vector.length` is `0` (falsy) → empty string `""`
- `vector.length` is `3` (truthy) → builds `"a - b - c<br>"`

**Common confusion:**
```js
if (vector) { /* always runs, even if empty */ }     // ❌ wrong
if (vector.length) { /* only runs if items exist */ } // ✅ correct
```

---

## Array.map()

`map()` creates a **new array** — it does **not** modify the original. You must assign the result back to a variable or use it directly.

```js
// ❌ map result is discarded — original array unchanged
vi.map((p) => {
    let pi = "";
    for (let i = 1; i <= p.length; i++) {
        pi += p.charAt(p.length - i);
    }
    return `${p}, ${pi} es PALINDROMA: ${p === pi}`;
});
div2.innerHTML = vi.join(`<br>`);  // shows original values, not transformed

// ✅ assign the map result
vi = vi.map((p) => {
    let pi = "";
    for (let i = 1; i <= p.length; i++) {
        pi += p.charAt(p.length - i);
    }
    return `${p}, ${pi} es PALINDROMA: ${p === pi}`;
});
div2.innerHTML = vi.join(`<br>`);
```

**File:** `palindromas.js (reversar function)`

```js
vi.map(...)  // ❌ returns a new array that is never stored
```

**Fix:** Assign or chain the result.

```js
vi = vi.map(...)          // ✅ overwrite with transformed array
// or
div2.innerHTML = vi.map(...).join(`<br>`)  // ✅ use directly
```

---

# English Vocabulary

## butt / button

A **button** is a small fastener or a control you press. **Butt** means to hit with the head or the thick end of something (e.g., a rifle butt).

- I pressed the **button** to start the game.
- He asked me to **button** up my coat.
- The goat tried to **butt** me with its horns.
- Please don't **butt** in when I'm speaking.

---

# Technical Vocabulary

| Term | Meaning |
|------|---------|
| **declare** a variable | Create a variable with `let`, `const`, or `var` |
| **reassign** a variable | Give a new value to an existing variable (`=`) |
| **iterate over** an array | Loop through each element of an array |
| **off-by-one error** | A bug where a loop runs one too many or one too few times |
| **call / invoke** a function | Execute a function by writing its name followed by `()` |
| **event listener** | A function that runs when a specific event happens (e.g., a click) |
| **empty array** | An array with `length === 0` — a loop over it runs zero times |
| **return vs break** | `return` exits the entire function; `break` exits only the current loop |
| **overwrite** | Replace the entire value using `=` |
| **append / concatenate** | Add to the end using `+=` |
| **reset** a variable | Set it back to its initial state before reusing it |
| **last index** | The final position in a string or array: `length - 1` |
| **textContent** | Sets text as plain text — HTML tags are not rendered |
| **innerText** | Sets text as plain text AND respects CSS visibility (slower) |
| **innerHTML** | Parses and renders HTML tags inside the element |
| **property** | A value stored on an object (e.g., `length`) — accessed without `()` |
| **method** | A function stored on an object (e.g., `charAt()`) — called with `()` |
| **for...of** loop | Loop that iterates over the **values** of an array directly |
| **mutate** an array | Change the array while iterating it (dangerous — can cause infinite loops) |
| **infinite loop** | A loop that never ends, freezing or crashing the page |
| **undeclared variable** | Using a variable without `let`/`const` — it becomes an implicit global |
| **discard / overwrite** | Replace a value before using it, losing the previous work |
| **qualify / prefix** a property | Add the object name before the property (e.g., `palabra.length`, not just `length`) |
| **loop condition** | The middle expression in a `for` loop that determines when to stop |
| **template literal** | A string with backticks (`` ` ``) that can embed expressions with `${}` |
| **dead code** | Code that is never reached or executed — delete it instead of commenting out |
| **bracket notation** | Accessing properties with `[]` (e.g., `arr[0]`) |
| **method call syntax** | Calling a function with `()` (e.g., `charAt(i)`) |
| **refactor** | Rewrite code to be cleaner or more efficient without changing what it does |
| **method chaining** | Calling multiple methods in sequence (e.g., `split('').reverse().join('')`) |
| **`Array.join()`** | Joins all array elements into a string with a separator |
| **`Array.map()`** | Creates a new array by transforming each element |
| **`String.split()`** | Splits a string into an array of substrings |
| **truthy / falsy** | Values that coerce to `true` or `false` in a boolean context (e.g., `0`, `""` are falsy; non-zero numbers, non-empty strings are truthy) |
| **coercion** | JavaScript automatically converting a value to another type (e.g., `0` → `false`) |

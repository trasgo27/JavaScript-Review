# Debugging Report: 09UniversalArmStrongDigits.html

## 🎯 Goal of the Exercise

> *Find all **Armstrong (narcissistic) numbers** for a given number of digits.*

An Armstrong number is one where the sum of each digit raised to the power of the total number of digits equals the number itself.  
Example: `153 = 1³ + 5³ + 3³ = 1 + 125 + 27 = 153` ✅

---

## 🐛 Bug #1 — `deVectorNum`: `forEach` returns `undefined` (Lines 34–40)

### The Code
```javascript
function deVectorNum(vector) {
    let num = 0;
    let long = vector.length;
    return num = vector.forEach((dig) => {
        num = dig ** (long - 1);
    });
}
```

### The Problem
| # | Issue | Explanation |
|---|-------|-------------|
| 1 | **`forEach` always returns `undefined`** | `return num = vector.forEach(...)` assigns `undefined` to `num` and returns it. The function **never** returns a number. |
| 2 | **Overwrites instead of accumulating** | `num = dig ** (long - 1)` replaces `num` on every iteration. It should be `num +=`. |
| 3 | **Wrong math entirely** | Raising digits to powers does not reconstruct a number. `[1,0,0]` should become `100`, not `1² + 0² + 0²`. The correct operation is concatenation, not exponentiation. |

> [!CAUTION]
> Because this function always returns `undefined`, the downstream call `iterar(deVectorNum(...))` receives `undefined`, causing a crash on `undefined.length`.

### The Fix
```diff
 function deVectorNum(vector) {
-    let num = 0;
-    let long = vector.length;
-    return num = vector.forEach((dig) => {
-        num = dig ** (long - 1);
-    });
+    return Number(vector.join(''));
 }
```

---

## 🐛 Bug #2 — `esArmStrong`: unreachable code + broken `reduce` (Lines 42–59)

### The Code
```javascript
const esArmStrong = function (num) {
    let sumaDig = 0;
    let vector = vectorizarNum(num);
    let longi = vector.length;
    return num = vector.forEach((element) => {   // ← exits here
        num += element ** longi;
    });
    // ⚠️ EVERYTHING BELOW IS UNREACHABLE
    sumaDig = vector.reduce((acumula, ele) => {
        let longi = vector.length;
        acumula + ele ** (longi);   // missing +=
        return sumaDig;             // wrong variable
    }, 0);
    return num === sumaDig;
}
```

### The Problem
| # | Issue | Explanation |
|---|-------|-------------|
| 1 | **`return` on `forEach` exits immediately** | `return num = vector.forEach(...)` returns `undefined` and the function ends. Nothing after this line runs. |
| 2 | **Unreachable code** | The entire `reduce` block (lines 52–58) and `return num === sumaDig` are **dead code** — they can never execute. |
| 3 | **`reduce` missing accumulator assignment** | `acumula + ele ** longi` computes a value but **discards it**. Should be `return acumula + ele ** longi` or `acumula +=`. |
| 4 | **`reduce` returns wrong variable** | `return sumaDig` returns the outer variable (still `0`) instead of the accumulator `acumula`. |

> [!WARNING]
> This function has **two** separate attempts at the same logic (`forEach` + `reduce`), and **both** are broken. The `forEach` attempt exits the function; the `reduce` attempt is unreachable and contains two internal bugs.

### The Fix
```diff
 const esArmStrong = function (num) {
-    let sumaDig = 0;
     let vector = vectorizarNum(num);
     let longi = vector.length;
-    return num = vector.forEach((element) => {
-        num += element ** longi;
-    });
-    sumaDig = vector.reduce((acumula, ele) => {
-        let longi = vector.length;
-        acumula + ele ** (longi);
-        return sumaDig;
+    let sumaDig = vector.reduce((acumula, ele) => {
+        return acumula + ele ** longi;
     }, 0);
     return num === sumaDig;
 }
```

---

## 🐛 Bug #3 — `iterar`: wrong parameter type + undeclared variable (Lines 61–73)

### The Code
```javascript
function iterar(vector) {
    const vectorExitos = [];
    let longi = vector.length;
    let iniciNum = 0;
    iniciNum = 10 ** (longi - 1);
    finNum = 10 ** (longi);          // ← missing let/const
    for (let i = iniciNum; i < finNum; i++) {
        if (esArmStrong(i)) {
            vectorExitos.push(i);
        }
    }
    return vectorExitos;
}
```

### The Problem
| # | Issue | Explanation |
|---|-------|-------------|
| 1 | **Parameter type mismatch** | The function is called with `deVectorNum()`'s result (a number), but uses `.length` as if it's an array. `Number.length` is `undefined`, so `10 ** (undefined - 1)` → `NaN`. |
| 2 | **Implicit global variable** | `finNum = 10 ** (longi)` is assigned without `let`/`const`, creating a global variable. In strict mode, this would throw a `ReferenceError`. |
| 3 | **Redundant initialization** | `let iniciNum = 0; iniciNum = 10 ** (longi - 1);` — the `= 0` is immediately overwritten. |

### The Fix
```diff
-function iterar(vector) {
+function iterar(numDigits) {
     const vectorExitos = [];
-    let longi = vector.length;
-    let iniciNum = 0;
-    iniciNum = 10 ** (longi - 1);
-    finNum = 10 ** (longi);
+    let iniciNum = 10 ** (numDigits - 1);
+    let finNum = 10 ** numDigits;
     for (let i = iniciNum; i < finNum; i++) {
```

---

## 🐛 Bug #4 — `activar`: broken pipeline + no visible output (Lines 76–81)

### The Code
```javascript
function activar() {
    const input = document.getElementById("howManyD");
    const n = Number(input.value);
    const resultado = iterar(deVectorNum(vectorizarNum(n)));
    console.log(resultado);
}
```

### The Problem
| # | Issue | Explanation |
|---|-------|-------------|
| 1 | **Needlessly broken pipeline** | `iterar(deVectorNum(vectorizarNum(n)))` converts `n` → array → number → passes to `iterar`. This is circular and pointless — `n` is already a number. Worse, because `deVectorNum` was broken (Bug #1), the whole pipeline fails. |
| 2 | **No visible output** | Results only go to `console.log`. The user sees nothing on the page. |

### The Fix
```diff
 function activar() {
     const input = document.getElementById("howManyD");
     const n = Number(input.value);
-    const resultado = iterar(deVectorNum(vectorizarNum(n)));
+    const resultado = iterar(n);
     console.log(resultado);
+    document.getElementById("resultado").textContent =
+        resultado.length > 0
+            ? "Armstrong numbers: " + resultado.join(", ")
+            : "No Armstrong numbers found for " + n + " digits.";
 }
```

---

## 🟡 Minor Issue — `<label>` missing `for` attribute (Line 21)

### The Code
```html
<label for="">Numeros con Cuantos Digitos ?</label>
```

### The Fix
```diff
-<label for="">Numeros con Cuantos Digitos ?</label>
+<label for="howManyD">Numeros con Cuantos Digitos ?</label>
```

---

## ✅ Verified Results

After all fixes, tested with Node.js:

| Digits | Armstrong Numbers | Count |
|--------|-------------------|-------|
| 1 | 1, 2, 3, 4, 5, 6, 7, 8, 9 | 9 |
| 2 | *(none)* | 0 |
| 3 | 153, 370, 371, 407 | 4 |
| 4 | 1634, 8208, 9474 | 3 |

---

## 📋 Summary of All Issues

| # | Type | Severity | Function | Description |
|---|------|----------|----------|-------------|
| 1 | Return Bug | 🔴 Fatal | `deVectorNum` | `forEach` returns `undefined`; function never returns a number |
| 2 | Math Bug | 🔴 Critical | `deVectorNum` | Exponentiation used instead of concatenation to reconstruct number |
| 3 | Return Bug | 🔴 Fatal | `esArmStrong` | `return` on `forEach` line exits function immediately |
| 4 | Dead Code | 🟠 Major | `esArmStrong` | Entire `reduce` block is unreachable |
| 5 | Accumulator Bug | 🟠 Major | `esArmStrong` | `reduce` callback discards computed value (missing `+=`) |
| 6 | Wrong Return | 🟠 Major | `esArmStrong` | `reduce` returns `sumaDig` instead of `acumula` |
| 7 | Type Mismatch | 🔴 Fatal | `iterar` | Receives a number but accesses `.length` as if array |
| 8 | Implicit Global | 🟡 Minor | `iterar` | `finNum` declared without `let`/`const` |
| 9 | Broken Pipeline | 🔴 Critical | `activar` | `n → vector → number → iterar` round-trip is pointless and broken |
| 10 | Missing Output | 🟡 Minor | `activar` | Results only in console, nothing on page |
| 11 | HTML Issue | 🟢 Trivial | — | `<label for="">` empty attribute |

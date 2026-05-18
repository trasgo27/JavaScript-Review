# Debugging Report: 02SignProduct3Numbers.html

## 🎯 Goal of the Exercise

> *Write a JavaScript conditional statement to find the **sign of the product** of three numbers.*
> *Display an alert box with the specified sign.*

The program should determine whether multiplying three numbers together yields a **positive** or **negative** result, and display `"+"` or `"-"` accordingly.

---

## 🐛 Bug #1 — Syntax Error in `forEach` (Line 31)

### The Code
```javascript
vectorNum.forEach(num)=> {
```

### The Problem
The arrow function syntax is **broken**. The parentheses wrapping `num` are closed *before* the `=>`, making the parser see `forEach(num)` as a complete call, then a stray `=> {` block.

### The Fix
```diff
-vectorNum.forEach(num)=> {
+vectorNum.forEach((num) => {
```

> **CAUTION:** This is a **fatal syntax error** — it stops the entire `<script>` block from executing. None of the logic below it will run.

---

## 🐛 Bug #2 — Missing closing `)` for `forEach` (Line 35)

### The Code
```javascript
        vectorSigno.push(signo);
}
```

### The Problem
Even after fixing Bug #1, the `forEach` call is never closed. The `}` on line 35 closes the callback body, but the wrapping `forEach(...)` parenthesis is missing.

### The Fix
```diff
         vectorSigno.push(signo);
-}
+});
```

---

## 🤔 Misunderstanding #1 — Random numbers are always **positive** (Lines 24–26)

### The Code
```javascript
num1 = Math.floor(Math.random() * 10000 + 1);
num2 = Math.floor(Math.random() * 10000 + 1);
num3 = Math.floor(Math.random() * 10000 + 1);
```

### The Problem
`Math.random()` returns a value in **[0, 1)**, so `Math.random() * 10000 + 1` is always a **positive** number between 1 and 10000. The exercise is about determining the sign of a product, so you **need** some numbers to be negative for the exercise to be meaningful.

### The Fix
Generate numbers that can be negative, for example:

```javascript
num1 = Math.floor(Math.random() * 10000 + 1) * (Math.random() < 0.5 ? -1 : 1);
num2 = Math.floor(Math.random() * 10000 + 1) * (Math.random() < 0.5 ? -1 : 1);
num3 = Math.floor(Math.random() * 10000 + 1) * (Math.random() < 0.5 ? -1 : 1);
```

---

## 🤔 Misunderstanding #2 — The "sign-assignment" logic is nonsensical (Lines 31–38)

### The Code
```javascript
vectorNum.forEach((num) => {
    let signo = (num % 2 == 0) ? -1 : 1;      // even → negative?
    signo = (num % 3 == 0) ? signo : signo * -1; // divisible by 3 → keep, else flip?
    vectorSigno.push(signo);
});
// ...
vectorNum[i] = Math.floor(vectorNum[i] / 100 * vectorSigno[i]);
```

### The Problem
This block tries to artificially assign signs to the random numbers, but:

1. **Divisibility by 2 or 3 has nothing to do with sign.** Whether a number is even or divisible by 3 is unrelated to whether it should be positive or negative.
2. **After applying the sign, the original variables (`num1`, `num2`, `num3`) are stale.** The code modifies `vectorNum[i]` but the `if/else` chain on lines 41–49 still reads the original `num1`, `num2`, `num3` variables — which were never updated.
3. **Dividing by 100 changes the magnitude** for no clear reason.

### The Fix
This entire block is unnecessary. Either:
- Generate numbers that are already negative (see Misunderstanding #1), **or**
- Simply compute the product sign directly (see Bug #3 below).

---

## 🐛 Bug #3 — The sign-detection logic is **wrong** (Lines 41–49)

### The Code
```javascript
if (num1 < 0 || num2 < 0 || num3 < 0) {
    signoFinal = "-";
} else if (num1 < 0 || (num2 && num3) < 0) {
    signoFinal = "+";
} else if (num1 < 0) {
    signoFinal = "-";
} else {
    signoFinal = "+";
}
```

### Problems

| # | Issue | Explanation |
|---|-------|-------------|
| 1 | **Logic is fundamentally wrong** | The sign of a product is negative when an **odd** number of factors are negative. Using `||` (OR) to test "if *any* number is negative → minus" is incorrect. If **two** numbers are negative, the product is *positive*. |
| 2 | **`(num2 && num3) < 0` doesn't work** | `num2 && num3` evaluates the logical AND of two numbers (returns `num3` if `num2` is truthy), then compares *that single value* to `0`. It does **not** check whether both `num2` and `num3` are negative. |
| 3 | **Dead code** | The `else if (num1 < 0)` branch on line 45 is unreachable — if `num1 < 0`, the *first* `if` on line 41 already catches it. |
| 4 | **Variables are stale** | As noted above, `num1`, `num2`, `num3` still hold their original positive values even after the `vectorNum` modifications. |

### The Fix — Correct approach

The mathematical rule is simple: **count how many numbers are negative**. If the count is odd, the product is negative; if even (including zero), it's positive.

```javascript
let negativeCount = 0;
if (num1 < 0) negativeCount++;
if (num2 < 0) negativeCount++;
if (num3 < 0) negativeCount++;

signoFinal = (negativeCount % 2 === 0) ? "+" : "-";
```

Or even more concisely:

```javascript
signoFinal = (num1 * num2 * num3 >= 0) ? "+" : "-";
```

---

## 🐛 Bug #4 — No `alert()` as required (Lines 50–51)

### The Code
```javascript
console.log(`Los numeros son ${num1}, ${num2} y ${num3}`);
console.log(`El signo es: ${signoFinal}`);
```

### The Problem
The exercise says *"Display an **alert box**"*, but the code uses `console.log` only.

### The Fix
```diff
 console.log(`Los numeros son ${num1}, ${num2} y ${num3}`);
-console.log(`El signo es: ${signoFinal}`);
+alert(`El signo es: ${signoFinal}`);
```

---

## ⚠️ Minor Issue — Zero is not handled

If any of the three numbers is **0**, the product is **0** (which is neither positive nor negative). The code never checks for this edge case.

### Suggestion
```javascript
if (num1 === 0 || num2 === 0 || num3 === 0) {
    signoFinal = "0 (the product is zero)";
} else {
    // ... count negatives
}
```

---

## 📋 Summary of All Issues

| # | Type | Severity | Line(s) | Description |
|---|------|----------|---------|-------------|
| 1 | Syntax Bug | 🔴 Fatal | 31 | `forEach(num)=>` — broken arrow function syntax |
| 2 | Syntax Bug | 🔴 Fatal | 35 | Missing closing `)` for `forEach` |
| 3 | Misunderstanding | 🟠 Major | 24–26 | Random numbers are always positive |
| 4 | Misunderstanding | 🟠 Major | 31–38 | Sign assignment based on divisibility is nonsensical |
| 5 | Logic Bug | 🔴 Critical | 41–49 | Sign-detection logic is fundamentally wrong |
| 6 | Logic Bug | 🟠 Major | 43 | `(num2 && num3) < 0` doesn't check both values |
| 7 | Missing Feature | 🟡 Minor | 50–51 | Uses `console.log` instead of `alert()` |
| 8 | Edge Case | 🟡 Minor | — | Zero not handled |

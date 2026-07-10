# Implementation Roadmap: 10PyramidPatternNestedLoop.html

## 🎯 Goal of the Exercise

> *Use **nested `for` loops** to build various **pyramid / triangle patterns** out of characters (e.g. `*`) and display them on the page.*

This is **the** classic exercise for mastering:
- Outer loop → controls **rows**
- Inner loop(s) → controls **spaces** and **symbols** per row
- String concatenation inside loops

---

## 📐 Patterns to Implement

We will build **five** patterns of height `n` (user-supplied). Each pattern is a separate function.

### Pattern 1 — Right-aligned half pyramid
```
*
**
***
****
*****
```

### Pattern 2 — Left-aligned half pyramid (right-justified)
```
    *
   **
  ***
 ****
*****
```

### Pattern 3 — Full (centered) pyramid
```
    *
   ***
  *****
 *******
*********
```

### Pattern 4 — Inverted full pyramid
```
*********
 *******
  *****
   ***
    *
```

### Pattern 5 — Diamond (pyramid + inverted)
```
    *
   ***
  *****
 *******
*********
 *******
  *****
   ***
    *
```

---

## 🗺️ Roadmap

### Phase 1 — HTML Scaffold

> **TIP:** Follow the same structure as previous exercises (`09UniversalArmStrongDigits.html`).

| Step | Task | Details |
|------|------|---------|
| 1.1 | Create `10PyramidPatternNestedLoop.html` | Standard `<!DOCTYPE html>` boilerplate |
| 1.2 | Add a `<h1>` title | e.g. `Pyramid Pattern — Nested Loops` |
| 1.3 | Add an `<input>` for height | `<input type="number" id="alturaInput" min="1" max="20" value="5">` with a matching `<label>` |
| 1.4 | Add a `<select>` for pattern type | Options: `1–5` corresponding to the five patterns, or `"all"` |
| 1.5 | Add a `<button>` to trigger | `<button onclick="activar()">Generar</button>` |
| 1.6 | Add a `<pre id="resultado">` | Use `<pre>` (not `<p>`) so whitespace/alignment is preserved |

```html
<!-- Starter HTML skeleton -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pyramid Patterns — Nested Loops</title>
</head>
<body>
    <h1>Pyramid Patterns — Nested Loops</h1>

    <label for="alturaInput">Altura (height):</label>
    <input type="number" id="alturaInput" min="1" max="20" value="5">
    <br><br>

    <label for="patronSelect">Patrón:</label>
    <select id="patronSelect">
        <option value="1">1 — Half Pyramid (right)</option>
        <option value="2">2 — Half Pyramid (left)</option>
        <option value="3">3 — Full Pyramid</option>
        <option value="4">4 — Inverted Pyramid</option>
        <option value="5">5 — Diamond</option>
        <option value="all">All Patterns</option>
    </select>
    <br><br>

    <button onclick="activar()">Generar</button>
    <br><br>

    <pre id="resultado"></pre>

    <script>
        // JavaScript goes here (Phase 2–6)
    </script>
</body>
</html>
```

> **IMPORTANT:** Use `<pre>` for output — regular `<p>` or `<div>` will collapse spaces and break alignment.

---

### Phase 2 — Pattern 1: Right-Aligned Half Pyramid ⭐

**This is the easiest pattern and the foundation for all others.**

#### Logic

| Row (`i`) | Stars | Output |
|-----------|-------|--------|
| 1 | 1 | `*` |
| 2 | 2 | `**` |
| 3 | 3 | `***` |
| 4 | 4 | `****` |
| 5 | 5 | `*****` |

#### Pseudocode
```
for i = 1 to n:
    line = ""
    for j = 1 to i:
        line += "*"
    result += line + newline
```

#### Implementation Steps

| Step | Task | Key Concept |
|------|------|-------------|
| 2.1 | Create function `halfPyramidRight(n)` | Returns a **string** (not `console.log`) |
| 2.2 | Outer loop: `for (let i = 1; i <= n; i++)` | Each iteration = one row |
| 2.3 | Inner loop: `for (let j = 1; j <= i; j++)` | `j <= i` means row 1 gets 1 star, row 2 gets 2, etc. |
| 2.4 | Concatenate `"*"` in inner loop | Build the line string |
| 2.5 | Append `"\n"` after inner loop | Move to next row |
| 2.6 | Return the full string | Don't forget to return! |

> **NOTE:** **Alternative**: Instead of the inner loop, you can use `"*".repeat(i)`. But the goal of this exercise is to practice nested loops, so write the inner loop first, then optionally add a `repeat()` version as a comment.

#### ✅ Checkpoint
Wire up `activar()` to call `halfPyramidRight(n)` and display in `<pre id="resultado">`. Verify output matches the expected pattern.

---

### Phase 3 — Pattern 2: Left-Aligned Half Pyramid (Right-Justified) ⭐⭐

**New concept: leading spaces.**

#### Logic

| Row (`i`) | Spaces | Stars | Output |
|-----------|--------|-------|--------|
| 1 | 4 | 1 | `    *` |
| 2 | 3 | 2 | `   **` |
| 3 | 2 | 3 | `  ***` |
| 4 | 1 | 4 | ` ****` |
| 5 | 0 | 5 | `*****` |

**Key insight**: `spaces = n - i`, `stars = i`

#### Pseudocode
```
for i = 1 to n:
    line = ""
    for s = 1 to (n - i):       // spaces
        line += " "
    for j = 1 to i:             // stars
        line += "*"
    result += line + newline
```

#### Implementation Steps

| Step | Task | Key Concept |
|------|------|-------------|
| 3.1 | Create function `halfPyramidLeft(n)` | Same signature as Pattern 1 |
| 3.2 | Outer loop: same as before | `for (let i = 1; i <= n; i++)` |
| 3.3 | **First** inner loop: spaces | `for (let s = 1; s <= n - i; s++)` → appends `" "` |
| 3.4 | **Second** inner loop: stars | `for (let j = 1; j <= i; j++)` → appends `"*"` |
| 3.5 | Newline after both inner loops | `line += "\n"` |

> **WARNING:** Common mistake: using `n - i + 1` spaces instead of `n - i`. Trace through row 1 manually to verify: when `i=1`, spaces should be `n-1 = 4` (for n=5).

#### ✅ Checkpoint
Test with `n = 5`. Each row should be exactly `n` characters wide (spaces + stars).

---

### Phase 4 — Pattern 3: Full (Centered) Pyramid ⭐⭐⭐

**Combines spaces + an odd number of stars per row.**

#### Logic

| Row (`i`) | Spaces | Stars | Formula |
|-----------|--------|-------|---------|
| 1 | 4 | 1 | spaces = `n - i`, stars = `2*i - 1` |
| 2 | 3 | 3 | |
| 3 | 2 | 5 | |
| 4 | 1 | 7 | |
| 5 | 0 | 9 | |

**Key insight**: Stars per row = `2 * i - 1` (always odd: 1, 3, 5, 7, 9…)

#### Pseudocode
```
for i = 1 to n:
    line = ""
    for s = 1 to (n - i):           // leading spaces
        line += " "
    for j = 1 to (2 * i - 1):       // stars
        line += "*"
    result += line + newline
```

#### Implementation Steps

| Step | Task | Key Concept |
|------|------|-------------|
| 4.1 | Create function `fullPyramid(n)` | |
| 4.2 | Outer loop | Same as before |
| 4.3 | First inner loop: spaces | `n - i` spaces (same as Pattern 2) |
| 4.4 | Second inner loop: stars | `2 * i - 1` stars — **this is the new formula** |
| 4.5 | Newline | |

> **TIP:** Trace the formula: Row 1 → `2(1)-1 = 1` star. Row 5 → `2(5)-1 = 9` stars. ✅

#### ✅ Checkpoint
Verify the pyramid is visually centered. The top `*` should be directly above the middle of the base.

---

### Phase 5 — Pattern 4: Inverted Full Pyramid ⭐⭐⭐

**Same as Pattern 3 but upside-down.**

#### Logic

| Row (`i`) | Spaces | Stars |
|-----------|--------|-------|
| 1 | 0 | 9 |
| 2 | 1 | 7 |
| 3 | 2 | 5 |
| 4 | 3 | 3 |
| 5 | 4 | 1 |

**Key insight**: spaces = `i - 1`, stars = `2 * (n - i) + 1`

#### Pseudocode
```
for i = 1 to n:
    line = ""
    for s = 1 to (i - 1):               // leading spaces
        line += " "
    for j = 1 to (2 * (n - i) + 1):     // stars
        line += "*"
    result += line + newline
```

#### Implementation Steps

| Step | Task | Key Concept |
|------|------|-------------|
| 5.1 | Create function `invertedPyramid(n)` | |
| 5.2 | Outer loop | Same |
| 5.3 | First inner loop: spaces | `i - 1` spaces (increases each row) |
| 5.4 | Second inner loop: stars | `2 * (n - i) + 1` — mirror of Pattern 3 |
| 5.5 | Newline | |

> **NOTE:** **Alternative approach**: You could reverse the outer loop (`for i = n; i >= 1; i--`) and reuse the Pattern 3 formulas exactly. Both approaches are valid — try both to deepen understanding!

#### ✅ Checkpoint
The first row should have `2n - 1` stars and the last row should have exactly `1` star.

---

### Phase 6 — Pattern 5: Diamond ⭐⭐⭐⭐

**Combines Pattern 3 (top half) + Pattern 4 (bottom half, minus the middle row).**

#### Pseudocode
```
// Top half (rows 1 to n) — same as fullPyramid
for i = 1 to n:
    spaces(n - i) + stars(2*i - 1)

// Bottom half (rows n-1 down to 1) — inverted, skipping the widest row
for i = (n - 1) down to 1:
    spaces(n - i) + stars(2*i - 1)
```

#### Implementation Steps

| Step | Task | Key Concept |
|------|------|-------------|
| 6.1 | Create function `diamond(n)` | |
| 6.2 | First outer loop: `i = 1` to `n` | Top half (identical to `fullPyramid`) |
| 6.3 | Second outer loop: `i = n - 1` down to `1` | Bottom half — starts at `n-1` to avoid duplicating the widest row |
| 6.4 | Inner loops (spaces + stars) | Same formulas as Pattern 3, reused in both halves |

> **WARNING:** The second loop must start at `n - 1`, **not** `n`, otherwise the middle row is printed twice.

#### ✅ Checkpoint
A diamond with `n = 5` should have exactly `9` rows (5 top + 4 bottom). The widest row (`2*5 - 1 = 9` stars) appears only once.

---

### Phase 7 — Controller Function `activar()`

| Step | Task | Details |
|------|------|---------|
| 7.1 | Read `alturaInput` value | `const n = Number(document.getElementById("alturaInput").value)` |
| 7.2 | Read `patronSelect` value | `const patron = document.getElementById("patronSelect").value` |
| 7.3 | Validate input | Ensure `n >= 1` and `n <= 20`; alert if invalid |
| 7.4 | Use a `switch` or `if/else` | Call the correct pattern function based on `patron` |
| 7.5 | Handle `"all"` option | Concatenate all five patterns with labels between them |
| 7.6 | Display in `<pre>` | `document.getElementById("resultado").textContent = result` |

```javascript
function activar() {
    const n = Number(document.getElementById("alturaInput").value);
    const patron = document.getElementById("patronSelect").value;

    if (n < 1 || n > 20 || isNaN(n)) {
        alert("Please enter a height between 1 and 20");
        return;
    }

    let result = "";

    switch (patron) {
        case "1": result = halfPyramidRight(n); break;
        case "2": result = halfPyramidLeft(n);  break;
        case "3": result = fullPyramid(n);      break;
        case "4": result = invertedPyramid(n);  break;
        case "5": result = diamond(n);          break;
        case "all":
            result  = "=== Half Pyramid (Right) ===\n" + halfPyramidRight(n) + "\n";
            result += "=== Half Pyramid (Left) ===\n"  + halfPyramidLeft(n)  + "\n";
            result += "=== Full Pyramid ===\n"         + fullPyramid(n)      + "\n";
            result += "=== Inverted Pyramid ===\n"     + invertedPyramid(n)  + "\n";
            result += "=== Diamond ===\n"              + diamond(n);
            break;
    }

    document.getElementById("resultado").textContent = result;
}
```

---

## 📋 Task Checklist

| # | Task | Status |
|---|------|--------|
| 1 | Create HTML file with scaffold (Phase 1) | ⬜ |
| 2 | Implement `halfPyramidRight(n)` (Phase 2) | ⬜ |
| 3 | Wire up `activar()` and test Pattern 1 | ⬜ |
| 4 | Implement `halfPyramidLeft(n)` (Phase 3) | ⬜ |
| 5 | Test Pattern 2 — verify alignment | ⬜ |
| 6 | Implement `fullPyramid(n)` (Phase 4) | ⬜ |
| 7 | Test Pattern 3 — verify centering | ⬜ |
| 8 | Implement `invertedPyramid(n)` (Phase 5) | ⬜ |
| 9 | Test Pattern 4 — verify it mirrors Pattern 3 | ⬜ |
| 10 | Implement `diamond(n)` (Phase 6) | ⬜ |
| 11 | Test Pattern 5 — verify no duplicate middle row | ⬜ |
| 12 | Implement full `activar()` with switch (Phase 7) | ⬜ |
| 13 | Test `"all"` option | ⬜ |
| 14 | Edge cases: `n = 1`, `n = 20` | ⬜ |

---

## 🧠 Key Concepts to Internalize

| Concept | Where It Appears |
|---------|------------------|
| **Nested loops** | Every pattern — outer = rows, inner = columns |
| **Loop boundary formulas** | `n - i` for spaces, `2*i - 1` for centered stars |
| **String building** | Concatenating `" "` and `"*"` inside loops |
| **Returning strings vs. logging** | Functions return strings; only `activar()` touches the DOM |
| **`<pre>` for monospace output** | Preserves spaces — critical for alignment patterns |
| **Reverse loops** | `for (let i = n-1; i >= 1; i--)` for bottom half of diamond |

---

## 🎁 Optional Stretch Goals

Once all five patterns work:

| # | Stretch | Hint |
|---|---------|------|
| 1 | Let the user pick the symbol (`*`, `#`, `@`, etc.) | Add another `<input>` and pass the character to each function |
| 2 | Number pyramid (use row number instead of `*`) | Replace `"*"` with `i.toString()` |
| 3 | Hollow pyramid (only outline, no fill) | Print `*` only when `j === 1`, `j === lastStar`, or `i === n` |
| 4 | Add CSS styling | Monospace font, colors, dark background for a "terminal" look |

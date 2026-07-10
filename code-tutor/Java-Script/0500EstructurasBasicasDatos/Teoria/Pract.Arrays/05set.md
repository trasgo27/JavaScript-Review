**Bug report for `05set.js`:**

| Line | Severity | Issue | Expected |
|---|---|---|---|
| 2 | **🔴 Crash** | `new Set(...valores)` spreads array elements as individual args. `Set` constructor only uses the first arg (number `1`), which is **not iterable** — throws `TypeError`. | `new Set(valores)` |
| 3 | **🟡 Wrong output** | Single quotes `'valores: ${valores}'` — no template interpolation. Prints literal `${valores}`. | Backticks: `` `valores: ${valores}` `` |
| 4 | **🟡 Wrong output** | Same single-quote bug + `console.table` on a string just shows a single cell table. Should log the actual array. | ``console.table(valores);`` |
| 5 | **🟡 Wrong output** | Same single-quote bug. | Backticks: `` `Unicos: ${unicos}` `` |
| 6 | **🟡 Wrong output** | Same issues as #4 — string in `console.table` + no interpolation. | ``console.table([...unicos]);`` |

Also note: `console.table` on a `Set` doesn't display well — you'd want `[...unicos]` to convert to an array first.

---

Perfect! That is the absolute gold standard for removing duplicates from an array in modern JavaScript.

It is incredibly efficient and clean. Let's break down exactly what JavaScript does under the hood in that single line:

1. **`new Set(valores)`**: It takes your original array `valores` and passes it into a `Set`. Since sets can *never* hold duplicate entries, JavaScript instantly drops any repeated values.
2. **`[...]` (Spread Operator)**: Because a Set is an iterable structure but not a real array, you use the spread operator to unpack those unique values back into a brand-new array literal.

You have completely mastered unique data filtering! What would you like to focus on next?

---

You are completely right on the first part: a `Set` absolutely **cannot** hold repeated values.

However, you **can** show a `Set` directly using `console.log()`! If you pass a Set to `console.log()`, the browser console will display it, but it will look a bit different from a standard array.

Let's look at exactly what happens when you log a Set vs an Array:

```javascript
const miSet = new Set([1, 2, 2, 3]);

console.log(miSet); 
// Output in console: Set(3) { 1, 2, 3 }

```

### How the Console Displays a Set

* It shows the total number of unique elements (e.g., `Set(3)`).
* It uses **curly braces `{}`** instead of square brackets `[]` to remind you it is a Set, not an Array.
* You can click the tiny arrow next to it in the browser console to inspect the values inside.

### Why do we still convert it to an Array then?

Even though you can print it, you usually convert it back to an array using `[...]` because **Sets are missing almost all of the best JavaScript tools**.

If you leave it as a `Set`, you lose access to essential array methods:

* You **cannot** use `.sort()` to order the elements.
* You **cannot** use `.filter()` or `.map()`.
* You **cannot** access items by their index (e.g., `miSet[0]` returns `undefined`).

So, your instinct is entirely practical! While `console.log` can print it, we convert it to an array so we can actually manipulate, sort, and work with the data easily.

---

Ah, you hit one of the classic JavaScript traps! That is exactly what happens when you try to force an object into a string context using backticks.

When you use backticks, JavaScript automatically tries to convert whatever is inside into plain text. If you pass a plain object or a `Set`, JavaScript doesn't know how to convert that complex structure into text, so it falls back to a generic label: **`[object Object]`** (for regular objects) or **`[object Set]`** (for Sets).

Here is exactly what happened in your code:

```javascript
const miSet = new Set([1, 2, 3]);

// Because of backticks, JS turns the Set into a generic string label
console.log(`Mi set es: ${miSet}`); 
// Output: Mi set es: [object Set] ❌

```

### The Difference in `console.log`

The trick is that `console.log()` behaves differently depending on *how* you feed it the data:

1. **Combined with text (Backticks):** Forces conversion to a string.
```javascript
console.log(`Datos: ${miSet}`); // Output: Datos: [object Set]

```


2. **Passed directly as its own argument:** Keeps the raw data structure intact so you can inspect it.
```javascript
console.log(miSet); // Output: Set(3) { 1, 2, 3 } ✅

```

### How to use backticks and still see your data

If you absolutely want to use backticks to keep your text layout but need to see inside the object or Set, you have to tell JavaScript to convert the data into a readable string first using **`JSON.stringify()`**:

```javascript
const datos = { name: "trasgo", age: 40 };

// JSON.stringify turns the object into a readable string layout
console.log(`Mis datos: ${JSON.stringify(datos)}`);
// Output: Mis datos: {"name":"trasgo","age":40} ✅

```

*(Note: `JSON.stringify()` doesn't work perfectly on native `Set` objects directly unless you convert the Set back to an array first using `[...miSet]`)*.

---

You are completely correct. It is not guaranteed at all—in fact, passing a raw `Set` directly into `JSON.stringify()` will always fail to show your data!

If you try to run this code:

```javascript
const miSet = new Set([1, 2, 3]);
console.log(`Mi set: ${JSON.stringify(miSet)}`);

```

Your output will look completely empty like this:

```text
Mi set: {}

```

### Why does `JSON.stringify` fail on a Set?

`JSON.stringify()` only knows how to read standard, enumerable object properties (like a regular object's `key: value` pairs or a standard array's elements).

A `Set` stores its data internally in a completely different way using specialized internal mechanisms. Because a Set doesn't have standard object keys, `JSON.stringify()` looks inside, sees absolutely "nothing" it recognizes, and returns an empty object notation `{}`.

### The Foolproof Solution

If you want to use backticks and print a Set properly as text, you *must* unpack it into a regular array first using the spread operator `[...]` right inside the stringification process:

```javascript
const miSet = new Set([1, 2, 3]);

// Convert to array first, then stringify!
console.log(`Mi set: ${JSON.stringify([...miSet])}`);
// Output: Mi set: [1,2,3]

```

This ensures JavaScript turns the data into a standard array format that `JSON.stringify` can actually read and display perfectly every single time. 

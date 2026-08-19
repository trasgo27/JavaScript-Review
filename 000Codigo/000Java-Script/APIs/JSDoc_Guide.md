# JSDoc Guide for Beginners

## What is JSDoc?

JSDoc is a **markup language** used to document JavaScript code using special `/** ... */` block comments. It helps:

- Describe what functions, parameters, return values do
- Add type annotations (without TypeScript)
- Generate documentation websites automatically
- Enable intelligent autocomplete in VS Code and other editors

---

## Basic Syntax

A JSDoc comment starts with `/**` (note the **two** asterisks) and ends with `*/`. Each line inside usually begins with `*`.

```js
/**
 * This is a JSDoc comment.
 */
```

---

## Tags Reference

### `@param` — Document a function parameter

```js
/**
 * @param {string} name - The user's name.
 * @param {number} age - The user's age.
 */
function greet(name, age) {
  console.log(`${name} is ${age} years old`);
}
```

| Part | Meaning |
|------|---------|
| `{string}` | Type of the parameter |
| `name` | Parameter name |
| `-` | Separator (optional but conventional) |
| The description | What it does |

Common types: `{string}`, `{number}`, `{boolean}`, `{Object}`, `{Array}`, `{string[]}`, `{null}`, `{undefined}`, `{Promise<string>}`

### `@returns` — Document the return value

```js
/**
 * @param {number} a
 * @param {number} b
 * @returns {number} The sum of a and b.
 */
function add(a, b) {
  return a + b;
}
```

For void functions, omit `@returns` or use `@returns {void}`.

### `@type` — Document a variable type

```js
/** @type {string} */
const userName = 'Alice';

/** @type {number[]} */
const scores = [95, 87, 92];

/** @type {{ id: number, name: string }} */
const product = { id: 1, name: 'Widget' };
```

### `@typedef` — Define a custom type

```js
/**
 * @typedef {Object} User
 * @property {number} id - Unique identifier
 * @property {string} name - Full name
 * @property {boolean} isActive - Whether user is active
 */

/** @type {User} */
const myUser = { id: 1, name: 'Alice', isActive: true };
```

### `@example` — Add a usage example

```js
/**
 * Calculates the factorial of a number.
 * @param {number} n - A non-negative integer.
 * @returns {number} The factorial result.
 * @example
 * // returns 120
 * factorial(5);
 */
function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}
```

### Other Useful Tags

| Tag | Purpose |
|-----|---------|
| `@deprecated` | Marks code as deprecated |
| `@see` | Link to related documentation |
| `@throws` | Describes errors the function might throw |
| `@since` | Version when the feature was added |

---

## Full Function Example

```js
/**
 * Fetches a user by ID from the API.
 *
 * @param {number} userId - The user's unique ID.
 * @returns {Promise<Object>} A promise that resolves to the user object.
 * @throws {Error} If the user is not found (404).
 *
 * @example
 * const user = await getUser(42);
 * console.log(user.name); // 'Alice'
 */
async function getUser(userId) {
  const res = await fetch(`/api/users/${userId}`);
  if (!res.ok) throw new Error('User not found');
  return res.json();
}
```

---

## Rules & Best Practices

1. **Use `/** ... */`** — regular `/* ... */` or `//` comments are NOT JSDoc.
2. **Document all public functions** — anything another developer might call.
3. **Don't state the obvious** — `/** @param {number} x - The number x */` is useless. Say what it represents.
4. **Keep descriptions concise** — 1-2 lines per tag.
5. **Use `@param` and `@returns` consistently** — they enable VS Code IntelliSense.
6. **Prefer primitive types** — `{string}` not `{String}`, `{number}` not `{Number}`.
7. **Optional parameters** — use `{string=}` or `{string} [name]`:

```js
/**
 * @param {string} message
 * @param {boolean} [uppercase] - Whether to uppercase (default false)
 */
function log(message, uppercase = false) {
  console.log(uppercase ? message.toUpperCase() : message);
}
```

8. **Union types** — use `{string|number}` or `{?string}` for nullable.
9. **Array types** — `{string[]}` or `{Array<string>}`.

---

## VS Code Benefits

When you write proper JSDoc, VS Code automatically shows:
- Parameter names and types when calling a function
- Return type information
- Warnings when passing the wrong type

No extra setup needed — it works out of the box.

---

## Quick Reference Card

```js
/** @type {string} */           // Variable type
/** @param {number} n */        // Parameter
/** @returns {boolean} */       // Return value
/** @typedef {Object} Name */   // Custom type
/** @property {string} prop */  // Type property
/** @example */                 // Usage example
/** @deprecated */              // Deprecation notice
/** @throws {Error} */          // Error description
/** @see FunctionName */        // Cross-reference
```

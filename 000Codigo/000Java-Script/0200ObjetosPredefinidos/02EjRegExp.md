# 02Ej.js — RegExp Breakdown

## The Pattern

```javascript
const patronCupon = /^(DESCUENTO|PROMO)-[0-9]{3}$/i;
```

| Part | Meaning |
|------|---------|
| `^` | Start of string anchor |
| `(DESCUENTO\|PROMO)` | Group: must be exactly `DESCUENTO` or `PROMO` |
| `-` | Literal hyphen |
| `[0-9]{3}` | Exactly 3 digits (0–9) |
| `$` | End of string anchor |
| `i` | Case-insensitive flag |

## The Bug (Line 19)

```javascript
// ❌ Wrong — .test() belongs to RegExp, not String
c.codigo.test(patronCupon)

// ✅ Correct
patronCupon.test(c.codigo)
```

- `.test()` is a method of `RegExp.prototype`.
- `String.prototype` has no `.test()` method → throws `TypeError: c.codigo.test is not a function`.

## Validation Results

| # | Código (after trim) | Valid? | Reason |
|---|---------------------|--------|--------|
| 1 | `PROMO-100` | ✅ | `PROMO` + hyphen + 3 digits |
| 2 | `descuento-50` | ❌ | Only 2 digits |
| 3 | `DESCUENTO-025` | ✅ | `DESCUENTO` + hyphen + 3 digits |
| 4 | `PROMO-9999` | ❌ | 4 digits |
| 5 | `promo-500abc` | ❌ | Letters after digits |
| 6 | `Descuento-001` | ✅ | Mixed case OK due to `i` flag |

## Key Takeaway

Always call `regex.test(string)`, not `string.test(regex)`.

---

# RegExp Syntax Summary

## Creation

```js
/patron/modificadores       // Literal (recommended)
new RegExp("patron", "mod") // Constructor
```

---

## Modifiers (Flags)

| Flag | Name | Effect |
|------|------|--------|
| `g` | Global | Find all matches, not just the first |
| `i` | Case-insensitive | Ignores upper/lower case |
| `m` | Multiline | `^` / `$` match start/end of each line |

---

## Metacharacters

| Char | Meaning |
|------|---------|
| `.` | Any character except newline |
| `\d` | Digit `[0-9]` |
| `\D` | Non-digit |
| `\w` | Word char `[a-zA-Z0-9_]` |
| `\W` | Non-word char |
| `\s` | Whitespace (space, tab, newline) |
| `\S` | Non-whitespace |

---

## Anchors

| Anchor | Meaning |
|--------|---------|
| `^` | Start of string (or line with `m`) |
| `$` | End of string (or line with `m`) |
| `\b` | Word boundary |
| `\B` | Non-word boundary |

---

## Quantifiers

| Quantifier | Meaning |
|------------|---------|
| `*` | 0 or more |
| `+` | 1 or more |
| `?` | 0 or 1 (optional) |
| `{n}` | Exactly n |
| `{n,}` | n or more |
| `{n,m}` | Between n and m |

---

## Groups & Ranges

| Syntax | Meaning |
|--------|---------|
| `[abc]` | Any char in set |
| `[^abc]` | Any char NOT in set |
| `[a-z]` | Range (a to z) |
| `(abc)` | Capturing group |
| `(?:abc)` | Non-capturing group |
| `\|` | OR (`foo\|bar`) |

---

## String Methods that use RegExp

| Method | Returns |
|--------|---------|
| `str.match(regex)` | Array of matches or `null` |
| `str.search(regex)` | Index of match or `-1` |
| `str.replace(regex, str)` | New string with replacements |
| `str.split(regex)` | Array split by pattern |

## RegExp Methods

| Method | Returns |
|--------|---------|
| `regex.test(str)` | `true` / `false` |
| `regex.exec(str)` | Match array or `null` (loop with `g`) |

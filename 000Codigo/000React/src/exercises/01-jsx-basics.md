# Exercise 01: JSX Basics — Companion Guide

## Objective
Learn the fundamentals of JSX syntax, expressions, and attributes in React.

## Core Concepts
- JSX is a syntax extension for JavaScript that looks similar to HTML
- JSX expressions are wrapped in curly braces `{}`
- JSX must return a single root element (use fragments `<> </>` for multiple)
- `className` is used instead of `class` for CSS
- camelCase for most attributes (`onClick`, `htmlFor`, etc.)

---

## Exercise 1.1: Basic JSX Elements
**Status:** ✅ Complete

**What it does:** Creates a component rendering basic HTML elements including headings, paragraphs, and lists.

**Key points:**
- Uses semantic HTML elements (`<h1>`, `<p>`, `<ul>`, `<li>`)
- Returns a single root `<div>` wrapper
- All elements properly nested and closed

```jsx
function BasicElements() {
  return (
    <div>
      <h1>Salvador</h1> 
      <p>Un pringaiyo</p>
      <ul>
        <li>Comer Carne de Ternera</li>
        <li>Estar con Ritmo Cardiaco Bueno</li>
        <li>Ver bien y prácticar la vista</li>
      </ul>      
    </div>
  );
}
```

---

## Exercise 1.2: JSX Expressions
**Status:** 🟡 Complete (minor cleanup needed)

**What it does:** Demonstrates JavaScript expressions inside JSX using variables, calculations, ternary operators, and template literals.

**Issues identified:**
- Lines 77-83: Empty `<p>` tag and an anchor tag with no text content
- The anchor tag `<a>` at line 78-83 is missing link text (accessibility issue)

**Fix required:**
```jsx
// Before (line 77-83):
<p></p>
<a 
href="https://www.w3schools.com/react/default.asp"

>

</a>

// After:
<p></p>
<a 
  href="https://www.w3schools.com/react/default.asp"
  target="_blank"
  rel="noopener noreferrer"
>
  W3Schools React Tutorial
</a>
```

**Key points:**
- Use `{expression}` to embed JavaScript in JSX
- Template literals with backticks and `${variable}` work inside `{}` 
- Ternary operators: `{condition ? 'valueIfTrue' : 'valueIfFalse'}`

---

## Exercise 1.3: JSX Attributes
**Status:** 🟡 Complete (needs link text for accessibility)

**What it does:** Shows proper JSX attribute syntax including image tags, inputs, links, and buttons.

**Issues identified:**
- Anchor tags at lines 121-126 and 128-133 are missing text content
- Empty links are not accessible to screen readers

**Fix required:**
```jsx
// Before (line 121-126):
<a
  href="https://react.dev"
  target="_blank" 
  rel="noopener noreferrer"
>
</a>

// After:
<a
  href="https://react.dev"
  target="_blank" 
  rel="noopener noreferrer"
>
  React Official Docs
</a>

// Before (line 128-133):
<a 
  href = "https://www.w3schools.com/react/default.asp"
  target = '_blank'
  rel = "noopener noreferrer"
>
</a>

// After:
<a 
  href="https://www.w3schools.com/react/default.asp"
  target="_blank"
  rel="noopener noreferrer"
>
  W3Schools React Tutorial
</a>
```

**Key points:**
- Use `className` instead of `class`
- Boolean attributes: `disabled={true}` or just `disabled`
- Numeric attributes: `width={200}` (no quotes)
- Always add `target="_blank"` with `rel="noopener noreferrer"` for security

---

## Exercise 1.4: Inline Styles
**Status:** ❌ BROKEN (syntax errors)

**What it does:** Applies inline styles to elements using JavaScript objects.

**Critical issues found:**
1. Using `=` instead of `:` for object properties
2. Unquoted string values (e.g., `blue` instead of `'blue'`)
3. Invalid template literals for pixel values (`` `{5}px` `` instead of `25` or `'5px'`)

**Before (broken code):**
```jsx
const containerStyle = {
  backgroundColor = blue,    // ❌ = instead of :
  color = white,              // ❌ = instead of : and unquoted string
  padding = `{5}px`,         // ❌ Template literal misuse
  borderRadius = `{5}px`     // ❌ Template literal misuse
};

const headingStyle = {
  fontSize = `${30}px`,      // ❌ Template literal misuse
  color = 'black',           // ❌ = instead of :
  marginBottom = `${10}px`   // ❌ Template literal misuse
};
```

**After (fixed code):**
```jsx
const containerStyle = {
  backgroundColor: 'blue',     // ✅ : and quoted string
  color: 'white',              // ✅ : and quoted string
  padding: '5px',              // ✅ Simple string value
  borderRadius: '5px'          // ✅ Simple string value
};

const headingStyle = {
  fontSize: '30px',            // ✅ String with units
  color: 'black',              // ✅ : and quoted string
  marginBottom: '10px'         // ✅ String with units
};
```

**Key points:**
- Inline styles are **objects**, not strings
- Use `:` (colon) for property assignment, not `=` (equals)
- String values must be **quoted**: `'blue'`, `'30px'`
- For pixel values, use the number directly or a string: `padding: 20` or `padding: '20px'`
- No template literals needed for simple CSS values

---

## Exercise 1.5: Fragments
**Status:** 🟡 Scaffolded (needs more content)

**What it does:** Demonstrates React Fragments for returning multiple elements without extra DOM nodes.

**Current state:** Only shows the `<>` shorthand syntax with minimal content.

**Recommended additions:**
```jsx
function WithFragments() {
  return (
    <>
      <h3>Fragment with Shorthand Syntax</h3>
      <p>This is rendered without an extra wrapper div.</p>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    </>
  );
}

function WithReactFragment() {
  return (
    <React.Fragment>
      <h3>Fragment with React.Fragment Syntax</h3>
      <p>Same behavior as the shorthand syntax.</p>
      <p>Use this when you need to pass a key prop.</p>
    </React.Fragment>
  );
}
```

**Key points:**
- `<> </>` is the shorthand syntax (most common)
- `<React.Fragment>` is the explicit syntax (use when you need `key` prop)
- Fragments don't add extra nodes to the DOM
- Useful for returning multiple elements from a component

---

## Summary Table

| Exercise | Topic | Status | Issues |
|----------|-------|--------|--------|
| 1.1 | Basic Elements | ✅ Complete | None |
| 1.2 | JSX Expressions | 🟡 Minor | Empty tags at lines 77-83 |
| 1.3 | JSX Attributes | 🟡 Minor | Missing link text for accessibility |
| 1.4 | Inline Styles | ❌ Broken | Syntax errors (`=` vs `:`, unquoted strings, template literals) |
| 1.5 | Fragments | 🟡 Scaffolded | Needs both syntax examples |

---

## Key Takeaways

1. **JSX is not HTML** — Use `className`, camelCase attributes, and self-closing tags
2. **Expressions in curly braces** — `{}` lets you embed any valid JavaScript
3. **Styles are objects** — Use `:` for properties, quote string values, avoid template literals for simple CSS
4. **Accessibility matters** — Always add text content to links and use `alt` text for images
5. **Fragments reduce DOM bloat** — Use `<>` to group elements without extra wrapper nodes

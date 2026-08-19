## `insertAdjacentHTML(position, html)`

Inserts an HTML string at a specific position relative to the element, without breaking existing children or event listeners (unlike `innerHTML +=`).

**Positions**:

| Position | Location |
|---|---|
| `'beforebegin'` | Before the element itself (sibling) |
| `'afterbegin'` | **Inside**, before all existing children |
| `'beforeend'` | **Inside**, after all existing children |
| `'afterend'` | After the element itself (sibling) |

```
// Before  <div>  <!-- afterbegin -->
//           existing children
//         <!-- beforeend -->  </div>
// After
```

In `destinos.js` I used `'afterbegin'` to insert a `<h3>` title before the `<ul>` inside the same `<div>`, keeping the `<ul>` intact.

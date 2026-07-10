Here is a concise summary of our review based on your PDF and our exercises.

---

## 📘 JS Events: Quick Reference Guide

### 1. Event Assignment Styles
| Method | Syntax Example | Note |
| :--- | :--- | :--- |
| **HTML Attribute** | `onclick="miFuncion()"` | Always uses the **"on"** prefix. |
| **JS Property** | `element.onclick = miFuncion;` | **No parentheses** when assigning. |
| **EventListener** | `element.addEventListener('click', miFuncion);` | Remove **"on"**; best for multiple listeners. |

### 2. The `event` Object (The "Swiss Army Knife")
When an event fires, JS passes an object (usually named `e` or `evento`) containing data:
*   **`evento.type`**: Returns the event name (e.g., "click", "mouseover").
*   **`evento.key`**: Returns the character pressed (e.g., "Enter", "a").
*   **`evento.clientX/Y`**: Mouse coordinates relative to the **browser window**.
*   **`evento.screenX/Y`**: Mouse coordinates relative to the **physical screen**.

### 3. Identifying Elements: `this` vs. `target`
*   **`this`**: The element that **owns the listener** (the Parent/Container).
*   **`event.target`**: The specific element that **triggered the event** (the Child/Button).
> **Rule:** Use `this.style.property` to modify the container, and `event.target.style.property` to modify the specific item clicked.

### 4. Passing Parameters
To pass a value to a function inside an `addEventListener`, you must wrap it in an **anonymous function**:
```javascript
// Correct: The wrapper waits for the click to execute the call
btn.addEventListener('click', function() { 
    miFuncion(5); 
});
```

### 5. Essential Events to Remember
*   **`onload`**: Fires when **everything** (HTML, CSS, Images) is fully loaded.
*   **`submit`**: Fires when a form is sent (use `e.preventDefault()` to stop refresh).
*   **`mouseover` / `mouseout`**: When the mouse enters or leaves an element.
*   **`change`**: Best for dropdown menus (`<select>`) and checkboxes.

---

### Final Code Snippet (The "All-in-One" Pattern)
```javascript
function colorManager(evento) {
    if (evento.type === 'mouseover') {
        this.style.backgroundColor = "green";
    } else if (evento.type === 'mouseout') {
        this.style.backgroundColor = "red";
    } else if (evento.type === 'click') {
        this.style.backgroundColor = "blue";
    }
}
```
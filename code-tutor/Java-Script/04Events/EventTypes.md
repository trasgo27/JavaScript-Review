To keep your study organized, it is best to group events by **where they come from** (the mouse, the keyboard, or the browser itself). This helps you predict what kind of data will be inside the `event` object.

---

## 1. Mouse Events
These are triggered by the user's physical interaction with a pointing device.

| Event | Trigger |
| :--- | :--- |
| `click` | Pressing and releasing the main mouse button. |
| `dblclick` | Clicking twice rapidly. |
| `mousedown` / `mouseup` | The moment the button is pressed down or let go. |
| `mouseenter` / `mouseleave` | Moving the cursor into or out of an element's boundary. |
| `mousemove` | Every single pixel the mouse moves (very high frequency!). |



---

## 2. Keyboard Events
These events allow you to capture user input and create shortcuts.

*   **`keydown`**: Fires the moment a key is pressed. It repeats if the user holds the key down.
*   **`keyup`**: Fires when the user releases the key.
*   **Key Properties**: Inside these events, you usually look for `event.key` (the character like "a" or "Enter") or `event.code` (the physical location like "KeyA").



---

## 3. Form & Input Events
These are essential for data validation and handling user choices.

*   **`submit`**: Fires on the `<form>` itself when a button is clicked or "Enter" is pressed. **Crucial:** This is where you use `event.preventDefault()`.
*   **`change`**: Fires when an element loses focus after its value has changed (common for `<select>` or checkboxes).
*   **`input`**: Fires **every time** the value changes (as the user types). This is better for live character counters.
*   **`focus` / `blur`**: When an input is clicked into (focus) or clicked away from (blur).

---

## 4. Window & Document Events
These relate to the state of the browser window or the loading of the page.

*   **`DOMContentLoaded`**: Fires when the HTML is fully loaded and parsed, without waiting for images or CSS. This is the safest place to start your JS.
*   **`load`**: Fires only after **everything** (including images and styles) has finished loading.
*   **`resize`**: Fires when the user changes the size of the browser window.
*   **`scroll`**: Fires when the user moves up or down the page.



---

## 5. Drag & Drop Events
A more advanced group used for moving elements around the interface.

*   **`dragstart`**: When the user starts dragging an item.
*   **`dragover`**: Required to allow an item to be dropped over a valid target.
*   **`drop`**: When the mouse button is released over a valid drop target.

---

### Study Tip: The "Pointer" Evolution
In modern web development, we often use **Pointer Events** (like `pointerdown` or `pointerup`). These are "super-events" that work for mouse, touchscreens, and pens all at once, so you don't have to write separate code for mobile and desktop!

Which of these groups feels most relevant to the project you are working on right now?

 El total de eventos disponibles está descrito en
http://www.w3schools.com/jsref/dom_obj_event.asp
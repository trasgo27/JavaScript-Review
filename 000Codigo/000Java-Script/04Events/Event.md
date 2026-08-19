Here is the markdown file containing the first five sections of the JavaScript Events summary for your study.

```markdown
# Study Guide: JavaScript Events (Sections 1-5)

Events are the backbone of interactive web applications. They allow your JavaScript code to "listen" for specific user or browser actions and execute logic in response.

---

## 1. The Event Listener Pattern
The modern and most flexible way to handle events is using the `addEventListener()` method. This method acts as a "bridge" between an HTML element and a JavaScript callback function.

**Syntax:** `element.addEventListener('event', callback);`

```javascript
const btn = document.querySelector('#myButton');

// The function is the "callback" that runs when the click happens
btn.addEventListener('click', function(event) {
    console.log("The button was clicked!");
    console.log("Event details:", event.target); 
});
```

---

## 2. Common Categories of Events
Events are triggered by different types of interactions. Understanding these categories helps you choose the right "trigger" for your logic.

| Category | Event Name | Description |
| :--- | :--- | :--- |
| **Mouse** | `click`, `dblclick`, `mouseenter`, `mouseleave` | Actions performed with a mouse or trackpad. |
| **Keyboard** | `keydown`, `keyup`, `keypress` | When a user interacts with the physical keyboard. |
| **Form** | `submit`, `change`, `input`, `focus` | Interactions with input fields, select boxes, or form sending. |
| **Window** | `load`, `resize`, `scroll` | Actions related to the browser window or document state. |

---

## 3. The Event Object (`e` or `event`)
When an event occurs, the browser automatically creates an **Event Object** and passes it as an argument to your callback. This object contains data about the specific interaction.



*   **`event.target`**: The specific HTML element that triggered the event.
*   **`event.type`**: The string name of the event (e.g., "click").
*   **`event.key`**: For keyboard events, this tells you exactly which key (e.g., "Enter", "a") was pressed.
*   **`event.preventDefault()`**: A vital method used to stop the browser's default behavior, such as preventing a form from refreshing the page upon submission.

---

## 4. Event Propagation: Bubbling vs. Capturing
Events do not stay isolated on a single element; they travel through the DOM tree. This movement is known as propagation.



*   **Capturing Phase**: The event starts at the very top (Window/Document) and moves down toward the target element.
*   **Target Phase**: The event reaches the element that was clicked/interacted with.
*   **Bubbling Phase (Default)**: The event "bubbles up" from the target element back to the top. If you click a button inside a `<div>`, the event fires on the button first, then the `<div>`, then the `<body>`.
*   **`event.stopPropagation()`**: This method prevents the event from "bubbling up" to parent elements.

---

## 5. Event Delegation
Event Delegation is an optimization technique that takes advantage of **Bubbling**. Instead of adding a listener to every single child element (which uses a lot of memory), you add **one** listener to their common parent.

The parent "catches" the event as it bubbles up and uses `event.target` to identify which specific child was interacted with.

**Example:**
```javascript
// Instead of 100 listeners for 100 <li> items:
document.querySelector('#parent-list').addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        console.log("Item clicked:", e.target.innerText);
    }
});
```
```

This summary covers the core mechanics of how JavaScript "hears" the user. Ready to move on to the practical exercises once you've reviewed this?
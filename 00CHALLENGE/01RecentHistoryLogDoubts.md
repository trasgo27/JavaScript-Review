If I have several Buttons to click, each one with its own Event Listener, how can I identify which one was  clicked?
Great question! There are several ways to identify which button was clicked. Here are the main techniques:

## 1. Using `event.target` / `event.currentTarget`

Every event listener callback receives an **event object** automatically. Use it to identify the clicked element:

```javascript
btn1.addEventListener("click", function(event) {
    console.log(event.target);        // the exact element clicked
    console.log(event.currentTarget); // the element the listener is attached to
    console.log(event.target.id);     // its id
    console.log(event.target.textContent); // its text
});
```

## 2. Using `this` (only with regular functions, **not** arrow functions)

```javascript
btn1.addEventListener("click", function() {
    console.log(this);    // refers to the button that was clicked
    console.log(this.id); // e.g. "btn1"
});
```

> ⚠️ **Arrow functions** (`() => {}`) do **not** have their own `this`, so `this` won't point to the button.

## 3. Using `data-*` attributes (very useful for multiple buttons)

```html
<button data-action="increase">Increase</button>
<button data-action="reduce">Reduce</button>
<button data-action="delete">Delete</button>
```

```javascript
document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", function(event) {
        const action = event.target.dataset.action;
        // action will be "increase", "reduce", or "delete"
        console.log("Clicked:", action);
    });
});
```

## 4. Event Delegation (one listener for all buttons)

Instead of adding a listener to **each** button, add **one** to a parent container:

```javascript
document.getElementById("container").addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        console.log("Button clicked:", event.target.id);
        console.log("Action:", event.target.dataset.action);
    }
});
```

This is more efficient when you have many buttons.

---

**Summary:** The `event` object (especially `event.target`) is your main tool. Combine it with `id`, `data-*` attributes, or `textContent` to distinguish buttons. For your counter project, you're likely already doing this — each button has its own listener that knows its purpose by being attached to a specific element.

Would you like me to build a small working demo with these techniques?
# JavaScript Events: A Comprehensive Summary

Events are signals sent by the browser to notify your code that "something has happened." They are the foundation of interactive web development, allowing JavaScript to react to user behavior.

---

## 1. The Event Listener Pattern
The modern standard for handling events is the `addEventListener()` method. It allows you to attach a **callback function** to an HTML element without overwriting existing event handlers.

**Syntax:** `element.addEventListener('event_type', callback_function);`

```javascript
const btn = document.querySelector('#myButton');

btn.addEventListener('click', function(event) {
    console.log("The button was clicked!");
    // 'event' is the object containing all data about the action
    console.log("Target element:", event.target); 
});
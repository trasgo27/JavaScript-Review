You have a great start here, trasgo! You are correctly selecting your HTML elements and setting up an event listener.

However, there are a few important details in the JavaScript logic that need adjustments to work properly. Let's look at them directly.

---

## The Feedback

### 1. Quotes for Strings

In JavaScript, when you want to save a literal word as a key or value, you must wrap it in quotes (`'...'` or `"..."`). Without quotes, JavaScript thinks `modo` and `oscuro` are variables that you haven't created yet.

* **Incorrect:** `window.localStorage.setItem(modo, oscuro);`
* **Correct:** `window.localStorage.setItem('modo', 'oscuro');`

### 2. The Logic of a Toggle (Switch)

Right now, your listener sets the mode to dark *every single time* the switch is clicked. A toggle switch needs to check if it is being turned **on** or **off**.

Since `miCheck` is a checkbox, you can use `miCheck.checked` (which is `true` or `false`) to decide what to do.

### 3. Setting the Class

Using `miBody.classList.value = 'modoOscuro'` works, but it replaces *all* classes on the body. A safer and more standard way to add or remove specific classes is using `miBody.classList.add()` and `miBody.classList.remove()`.

---

## Refactored Code

Here is how you can structure the logic to make the switch fully functional:

```javascript
//objetos
const miCheck = document.getElementById('iCheck');
const miBoton = document.getElementById('bBorrar');
const miBody = document.getElementById('miBody');

// eventListeners
miCheck.addEventListener('change', (e) => {
    // Check if the switch is turned ON
    if (miCheck.checked) {
        window.localStorage.setItem('modo', 'oscuro');
        miBody.classList.add('modoOscuro');
    } else {
        // If it is turned OFF, remove it
        window.localStorage.removeItem('modo');
        miBody.classList.remove('modoOscuro');
    }
});

```

*(Note: Listening for the `'change'` event is generally better than `'click'` for checkboxes and switches).*

---

## English Fluency Quick Check

In your previous message, you asked: *"is there any king of button like a swicht?"*

* **Correction:** *"Is there any **kind** of button like a **switch**?"* * "King" was likely just a typo for "kind", and "switch" just had two letters swapped. Your meaning was 100% clear!

---

How would you write the logic for the delete button (`miBoton`) to clear the storage and reset the background?

---

## Debug Report — `01Ej.js` & `01Ej.html`

### Bugs Found

#### 1. `01Ej.js` line 12 — `===` used instead of assignment
```javascript
localStorage.modo ==='oscuro'  // ❌ comparison, does nothing
```
This uses the strict equality operator (`===`), which just evaluates to `true` or `false` without storing anything. Should be `localStorage.setItem('modo', 'oscuro')`.

#### 2. `01Ej.js` line 6-8 — No initialization/restore logic
The `// Local Storage` section is empty. When the page loads, the code never checks `localStorage` to restore the dark mode state. If the user refreshes the page, the checkbox resets to unchecked and the body loses the `modoOscuro` class, even though the key may still exist in localStorage.

**Fix:** Add a check on page load:
```javascript
if (localStorage.getItem('modo') === 'oscuro') {
    miCheck.checked = true;
    miBody.classList.add('modoOscuro');
}
```

#### 3. `01Ej.js` — `miBoton` declared but never used
`miBoton` is selected on line 3 but has no event listener attached. The delete button does nothing when clicked.

#### 4. `01Ej.html` line 11 — Wrong CSS selector (`#modoOscuro` vs `.modoOscuro`)
```css
#modoOscuro {   /* ❌ ID selector — targets <any id="modoOscuro"> */
```
The JS adds `modoOscuro` as a **class** via `miBody.classList.add('modoOscuro')`, but the CSS uses an **ID selector** (`#`). It should be a class selector (`.`):
```css
.modoOscuro {
    background-color: black;
}
```

### Summary of Required Fixes

| File | Line | Issue | Severity |
|------|------|-------|----------|
| `01Ej.js` | 12 | `===` instead of `setItem()` | High — dark mode is never saved |
| `01Ej.js` | 6-8 | No restore logic on page load | High — state lost on refresh |
| `01Ej.js` | 3 | `miBoton` listener missing | Medium — button does nothing |
| `01Ej.html` | 11 | `#modoOscuro` should be `.modoOscuro` | High — CSS never applies

---

## Debug Report & Solutions — `01Ej.js` & `01Ej.html`

### Summary of Bugs Fixed:

1. **Missing Script Reference in HTML**:
   * **Problem**: `01Ej.html` did not import or link `01Ej.js`.
   * **Fix**: Added `<script src="01Ej.js"></script>` right before the closing `</body>` tag.

2. **Syntax Error in LocalStorage Assignment**:
   * **Problem**: In `01Ej.js`, line 15 had `localStorage.setItem('modo') = 'oscuro';` which is invalid JavaScript and threw a runtime error.
   * **Fix**: Corrected it to the proper method call: `localStorage.setItem('modo', 'oscuro');`.

3. **Checkbox Initialization**:
   * **Problem**: On line 9, `miCheck.checked;` was evaluated as a statement but did not change the checkbox state when the page was loaded in dark mode.
   * **Fix**: Changed it to `miCheck.checked = true;`.

4. **Missing Event Listener for Delete Button**:
   * **Problem**: The "Delete" button (`bBorrar`) was defined in the HTML and retrieved in JavaScript (`miBoton`), but had no functionality.
   * **Fix**: Added a click event listener to `miBoton` that removes the `'modo'` key from `localStorage`, unchecks the checkbox, and removes the dark mode styling from the body.

## Debug Report — `011Ej.js`

### Bugs Found

#### 1. Lines 12-18 — Toggle never persists to localStorage
The `change` listener toggles the CSS class on/off but never calls `localStorage.setItem()`. The dark mode state is **never saved**, so refreshing the page always starts with light mode, and the `getItem` check on line 7 never triggers.

**Fix:** Add `setItem` in the `if` branch and `removeItem` in the `else`:
```javascript
if (miCheck.checked) {
    miCuerpo.classList.add('claseOscura');
    window.localStorage.setItem('darkMode', 'true');
} else {
    miCuerpo.classList.remove('claseOscura');
    window.localStorage.removeItem('darkMode');
}
```

#### 2. Lines 20-22 — Delete button doesn't reset the UI
Clicking the delete button removes `'darkMode'` from localStorage but **never removes the `claseOscura` class** from the body. The page stays visually dark even though storage is cleared.

**Fix:** Remove the class alongside the storage key:
```javascript
miBorrar.addEventListener('click', (e) => {
    window.localStorage.removeItem('darkMode');
    miCuerpo.classList.remove('claseOscura');
    miCheck.checked = false;
});
```

### Summary

| Line | Issue | Severity |
|------|-------|----------|
| 12-18 | No `setItem` in toggle — state never saved | High |
| 20-22 | Removes key but doesn't remove class or uncheck box | High |

---

## Debug Report — `011Ej.js` (v2)

### Status: 2 bugs fixed, 1 remaining

The previous bugs are now corrected:
- ✅ Toggle now persists with `setItem` / `removeItem`
- ✅ Delete button now removes the `claseOscura` class

### Remaining Bug

#### Lines 22-25 — Delete button doesn't uncheck the checkbox
```javascript
miBorrar.addEventListener('click',(e)=>{
    window.localStorage.removeItem('darkMode');
    miCuerpo.classList.remove('claseOscura');   // ✅ class removed
    // ❌ miCheck.checked is never set to false
});
```
After clicking delete, `localStorage` is cleared and the body returns to light mode, but the checkbox stays **checked**. The UI is out of sync — the switch says "dark mode on" while the page is in light mode.

**Fix:** Add `miCheck.checked = false;` to the delete handler:
```javascript
miBorrar.addEventListener('click',(e)=>{
    window.localStorage.removeItem('darkMode');
    miCuerpo.classList.remove('claseOscura');
    miCheck.checked = false;
});
```

---

## Debug Report — `02Ej.js`

### Bugs Found

#### 1. Line 19 — `console.table(html1)` logs raw string, not object
The "PARSON" button retrieves the JSON string with `getItem` but never parses it back to an object. `console.table()` on a raw JSON string just renders the string's characters instead of the object's key-value pairs.

**Fix:** Call `JSON.parse()` before logging:
```javascript
miBotonP.addEventListener('click', (e) => {
    const html1 = window.localStorage.getItem('user');
    const obj = JSON.parse(html1);
    console.table(obj);
});
```

#### 2. Line 18-19 — No guard when key doesn't exist
If the user clicks "PARSON" before ever clicking "STRINGIFIVE", `getItem('user')` returns `null` and `JSON.parse(null)` throws a SyntaxError.

**Fix:** Add a null check:
```javascript
miBotonP.addEventListener('click', (e) => {
    const html1 = window.localStorage.getItem('user');
    if (html1) {
        console.table(JSON.parse(html1));
    } else {
        console.log('No hay datos guardados');
    }
});
```

### Summary

| Line | Issue | Severity |
|------|-------|----------|
| 19 | `getItem` result passed to `console.table` without `JSON.parse` — displays string, not object | High |
| 18-19 | No null guard — crashes if key is missing | Medium |

---

## Tasks — `02Ej.js`

### Task 1 — Fix the "PARSON" button
Apply the fixes described in the debug report above:
- Parse the JSON string with `JSON.parse()` before logging
- Add a null guard so it doesn't crash when no data exists

### Task 2 — Show data on the page
Add a `<div id="output">` in `02Ej.html` and render the user profile inside it when the "PARSON" button is clicked, instead of only logging to the console.

### Task 3 — Add a "Delete" button
Add a third button to `02Ej.html` labeled "DELETE" that removes the `'user'` key from localStorage and clears the output div.

### Task 4 — Edit score
Add an `<input type="number" id="scoreInput">` to `02Ej.html`. Before saving with "STRINGIFIVE", update `userProfile.score` with the value from the input.

### Task 5 — Persist across refreshes on load
When the page loads, check if `'user'` exists in localStorage. If it does, parse it and render the profile data in the output div automatically (without clicking any button).

### Task 6 — Handle corrupt data
Wrap `JSON.parse()` in a `try/catch` block. If the stored data is corrupted (invalid JSON), show an error message on the page and remove the corrupt key from localStorage.

### Summary

| Task | Skill | Difficulty |
|------|-------|------------|
| 1 | `JSON.parse`, null checks | Easy |
| 2 | DOM manipulation | Easy |
| 3 | `removeItem`, DOM cleanup | Easy |
| 4 | Reading input values, mutation | Medium |
| 5 | `DOMContentLoaded`, auto-render | Medium |
| 6 | Error handling, `try/catch` | Medium |

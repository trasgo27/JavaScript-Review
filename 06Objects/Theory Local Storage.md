Today has been a deep dive into the "Bumps in the Road" of web development. We moved from simple visual movement to complex data persistence. Here is a summary of the obstacles we conquered and the technical solutions we found.

---

### 1. The "Coordinates" Bump: Getting `left` and `top`
We discovered three ways to see where an element is, but they all behave differently.

| Method | What it sees | Best Use Case |
| :--- | :--- | :--- |
| **`element.style.left`** | Only **inline** styles (styles written directly in the HTML tag). | Reading a position you *just* set with JavaScript. |
| **`window.getComputedStyle(el).left`** | The **final result** of CSS files + Style tags + Inline. | Reading positions defined in your `<style>` section. |
| **`element.getBoundingClientRect()`** | Absolute **Screen position** (Viewport). | The most accurate for "Start" positions, but requires math to convert to "Container" coordinates. |



---

### 2. The "CSS File" Bump: Invisible Styles
**The Issue:** When your CSS is in a separate section or file, `element.style.left` returns an empty string `""`.
**The Fix:** Use `getComputedStyle`.
> **Warning:** This returns a **string** like `"450px"`. If you need to do math (like adding 10 pixels), you must use `parseFloat()` to turn it into a number.

---

### 3. The "Unit" Bump: Appending `"px"`
**The Issue:** CSS is strict. If you tell a box to move to `450`, the browser ignores it. It must be `450px`.
**The Fix:** Always append the string.
*   **Correct:** `this.caja.style.left = this.x + "px";`
*   **Incorrect:** `this.caja.style.left = this.x;`

---

### 4. The "Local Storage" Bump: Persistence
`localStorage` is a key-value filing cabinet that only accepts strings.

*   **To Save:** `localStorage.setItem("keyName", stringValue);`
*   **To Read:** `localStorage.getItem("keyName");`
*   **To Delete:** `localStorage.removeItem("keyName");`

---

### 5. Syntax: Creating Objects and Arrays
To save data for multiple boxes, we needed structured containers.

#### **JavaScript Object (The "Snapshot")**
Used to store labeled data (like coordinates for specific boxes).
```javascript
const posiciones = {
    norte: { x: "450px", y: "0px" },
    este:  { x: "900px", y: "200px" }
};
```

#### **JavaScript Array (The "List")**
Used when you have a collection of similar items.
```javascript
const listaDeIDs = ["cuadrado-N", "cuadrado-E", "cuadrado-S", "cuadrado-O"];
```

---

### 6. The "Translation" Bump: `JSON`
Since objects cannot go directly into `localStorage`, we use JSON as a bridge.
*   **`JSON.stringify(object)`**: Turns your live object into a text string (to save).
*   **`JSON.parse(string)`**: Turns that text string back into a live object (to load).



---

### ✍️ English Summary
*   **"Bumps in the road"**: A great idiom for the small problems we encounter while coding.
*   **"Inline style"**: Style written inside the HTML tag.
*   **"Computed style"**: The final style the browser actually displays.

**You have basically built a "Save Game" system today. Which of these "bumps" felt the most difficult to understand?**
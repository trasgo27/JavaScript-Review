This is a classic **DOM Manipulation** exercise. To make that "Style" button work, you need to write a JavaScript function that targets the paragraph by its ID and modifies its CSS properties through the `.style` object.

Here is the logic you can add inside a `<script>` tag or an external file:

### 1. The Implementation

```javascript
function js_style() {
    // 1. Capture the element
    const textElement = document.getElementById('text');

    // 2. Change the styles
    textElement.style.fontSize = "24px";
    textElement.style.fontFamily = "Comic Sans MS";
    textElement.style.color = "royalblue";
    textElement.style.backgroundColor = "lightyellow";
}
```

---

### 2. Key Concepts to Remember

*   **CamelCase for CSS:** In CSS, you write `font-size`. In JavaScript, you must use **camelCase**: `fontSize`.
*   **The `.style` Property:** This property only modifies **inline styles**. It's like adding `style="..."` directly into your HTML tag.
*   **Strings for Values:** Notice that values like `"24px"` or `"royalblue"` must be wrapped in quotes because they are treated as strings in JavaScript.



---

### 3. Technical Vocabulary & Fluency

**English Tip: "Trigger"**
When an action (like a click) starts a function, we say the event **triggers** the function.
* *"Clicking the button **triggers** the `js_style` function, which then modifies the paragraph's appearance."*

**Key Terms:**
*   **Selector:** The method used to find the element (e.g., `getElementById`).
*   **Inline Styles:** CSS applied directly to an HTML element rather than in a separate `.css` file.
*   **DOM (Document Object Model):** The "map" of your HTML that JavaScript uses to find and change things.

### 💡 Experiment
Try adding a line to change the border or the padding! For example:
`textElement.style.border = "2px dashed red";`

How does it feel to change the visual look of the page using only logic?
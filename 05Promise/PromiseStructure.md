To understand the syntaxes of `.then()` and `.catch()`, you have to remember they are **methods** that belong to the Promise object. Think of them as "hooks" waiting for the delivery chute to open.

Here is the breakdown from the most common to the most advanced.

---

### 1. The Standard "Arrow Function" Syntax
This is what most modern developers use. it is clean and uses the `=>` (fat arrow) to point to the action.

```javascript
verificarChoque()
    .then((mensaje) => {
        // Success action here
        console.log(mensaje);
    })
    .catch((error) => {
        // Failure action here
        console.error(error);
    });
```
*   **Punctuation Note:** Notice the parentheses `(mensaje)` for the "data" and the curly brackets `{ }` for the "room" where the work happens.

---

### 2. The "Anonymous Function" Syntax
This is the older, more "classic" way. It uses the word `function` explicitly. It works exactly the same way as the arrow function.

```javascript
verificarChoque()
    .then(function(mensaje) {
        console.log(mensaje);
    })
    .catch(function(error) {
        console.log(error);
    });
```

---

### 3. The "Two-Argument" .then() (No .catch needed)
Did you know `.then()` can actually handle **both** success and failure at the same time? It accepts two functions: the first for `resolve` and the second for `reject`.

```javascript
verificarChoque().then(
    (mensaje) => { console.log("Success: " + mensaje); }, // Argument 1: Success
    (error) => { console.log("Error: " + error); }        // Argument 2: Failure
);
```
*   **Teacher's Tip:** Most developers avoid this because it’s harder to read. Using a separate `.catch()` is much cleaner!

---

### 4. The "Direct Reference" Syntax
If you already have a function defined elsewhere, you don't need to write a new one inside the `.then()`. You can just "point" to it by its name.

```javascript
function celebrar(msg) {
    alert(msg);
}

// Just pass the name of the function
verificarChoque().then(celebrar); 
```
*   **Danger Zone:** Do **not** put parentheses after the function name here (don't write `celebrar()`). If you do, the function runs immediately instead of waiting for the Promise!

---

### 5. The "Chain" Syntax
You can stack multiple `.then()` methods. Each one takes the result of the previous one.

```javascript
verificarChoque()
    .then((msg) => {
        return msg.toUpperCase(); // Pass a SHOUTING message to the next link
    })
    .then((shoutingMsg) => {
        console.log(shoutingMsg); // Prints: "¡DIANA!"
    })
    .catch((err) => {
        console.log(err);
    });
```

---

### 🏛️ Visualizing the Structure (The "Brackets" Map)



| Part | Purpose | Punctuation |
| :--- | :--- | :--- |
| **`.then`** | The "Success" Hook | `.then( (data) => { ... } )` |
| **`.catch`** | The "Error" Hook | `.catch( (err) => { ... } )` |
| **`.finally`** | Runs no matter what | `.finally( () => { ... } )` |

---

### 🍎 Teacher's Semicolon Warning:
If you are **chaining** (connecting them), you only put the semicolon at the very, very end of the last method.

*   **Wrong:** `.then(...); .catch(...);` (This breaks the chain!)
*   **Right:** `.then(...) .catch(...);` (The semicolon "locks" the whole sequence).

**Which of these syntaxes feels the most "natural" to you? The Arrow Function (=>) or the classic `function()` word?**
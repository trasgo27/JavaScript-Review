Here is the updated summary of **Promises** to complement your previous notes on Events.

---

## 📦 Promises: The "Asynchronous Contract"

### 1. The Three States
A Promise represents a value that will be available **now**, **later**, or **never**.

| State | Technical Term | Analogy |
| :--- | :--- | :--- |
| **Waiting** | `Pending` | You ordered the coffee; it’s being made. |
| **Success** | `Fulfilled` / `Resolved` | You received the coffee. |
| **Failure** | `Rejected` | The shop ran out of beans (Error). |

### 2. Creating a Promise (The Constructor)
You use a constructor with two callback functions: **`resolve`** and **`reject`**.
```javascript
const myPromise = new Promise((resolve, reject) => {
    const success = true; 
    if (success) {
        resolve("Package Delivered!"); // Sends the "cup of coffee"
    } else {
        reject("Delivery Failed.");    // Sends the error
    }
});
```

### 3. Consuming the Result (The Methods)
* **`.then()`**: Receives the successful "package" from `resolve`.
* **`.catch()`**: Receives the error from `reject`.
* **`.finally()`**: Executes at the very end, regardless of success or failure.

### 4. Chaining & The "Jump" Rule
Promises allow you to "chain" operations together. If you `return` a value in one `.then()`, it is passed to the next one.

**The "Jump" Rule:**
If an error occurs in the middle of a chain, JavaScript **skips** all subsequent `.then()` blocks and jumps directly to the nearest **`.catch()`**.

```javascript
// Clean Chaining Example
initialPromise
    .then(stepOne)    // If this fails...
    .then(stepTwo)    // ...this is skipped...
    .then(stepThree)  // ...and this is skipped...
    .catch(handleError); // ...and we land here.
```

### 5. Built-in Utilities
* **`setTimeout()`**: A built-in browser function used to create artificial delays (often used to simulate API calls in exercises).
* **`async / await`**: Modern syntax that makes Promises look like synchronous, top-to-bottom code.

---

### 📝 English Memory Drill Summary:
* **Fulfillment** (double 'l'): The state of success.
* **Receive** (i before e, except after c): What you do to the data package.
* **Receipt**: The "handle" or instance of the promise you hold while pending.
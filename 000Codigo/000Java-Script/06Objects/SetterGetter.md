Here is the structured summary of the `setCookie` logic and the concept of "Past-Dating" to delete cookies, ready for your **Markdown (.md)** file.

---

## ✍️ Setting and Deleting Cookies

Unlike Local Storage, setting a cookie requires manual string construction and time calculation.

### 1. The `setCookie()` Function (The Writer)
This function moves an object's "internal clock" into the future to set a deadline for the data.

```javascript
function setCookie(cname, cvalue, exdays) {
  // 1. Create a Date object (Current moment)
  var d = new Date();
  
  // 2. Perform the Math: Convert days to milliseconds
  // (days * 24h * 60m * 60s * 1000ms)
  let expirationInMs = exdays * 24 * 60 * 60 * 1000;
  
  // 3. Update the object (Move the clock forward)
  d.setTime(d.getTime() + expirationInMs);
  
  // 4. Format the date for the browser (UTC String)
  var expires = "expires=" + d.toUTCString();
  
  // 5. Assemble the "Bead Necklace" string
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
```

---

### 2. The Logic of `d.setTime()`
In JavaScript, the `Date` object is **mutable**. This means we don't need to create a new variable to change the time; we simply "invoke" a method on the existing object to update it.
*   **`getTime()`**: Acts as the **Getter** (returns the current time in milliseconds).
*   **`setTime()`**: Acts as the **Setter** (updates the object to a new time point).



---

### 3. How to Delete a Cookie (The "Past-Date" Trick)
Browsers do not have a `deleteCookie` command. To remove a cookie, you must **overwrite** it with an expiration date that has already passed. When the browser sees a date from the past, it automatically triggers its "trash collection" logic.

```javascript
function deleteCookie(cname) {
  // Setting exdays to -1 moves the clock to yesterday
  // The browser sees it is expired and deletes it instantly
  setCookie(cname, "", -1);
}
```

---

### 📋 Key Differences at a Glance

| Step | Technique | Why? |
| :--- | :--- | :--- |
| **Math** | Milliseconds | Computers calculate time in "ticks" (ms), not "days." |
| **Format** | `.toUTCString()` | Cookies require a very specific, rigid text format. |
| **Scope** | `;path=/` | Ensures the cookie is visible across the whole website. |
| **Deletion** | Negative Expiry | The only way to "kill" a cookie is to make it "old." |

---

### ✍️ Pro Tip for your .md file
> **Remember:** When you update `document.cookie`, you are **appending** to the necklace, not replacing the whole thing. The browser handles the logic of merging your new "bead" into the existing string of cookies.
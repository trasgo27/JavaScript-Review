# 💾 Using LocalStorage for Data Persistence

Since we are talking about saving the state of our page without needing a database, **LocalStorage** is currently the best tool in modern JavaScript. It is much easier to use than Cookies and can store more data.

## What is LocalStorage?

Think of `localStorage` as a small notebook that the browser gives to your specific web page. 
*   You write things inside it using: `localStorage.setItem('key', 'value')`
*   You read things from it using: `localStorage.getItem('key')`
*   Even if the user closes the browser or restarts their computer, the notebook remains intact. It only disappears if the user clears their browsing data.

## The Goal: Remember Box Positions!

Right now, every time you refresh the page, the boxes jump back to their original positions (Norte, Sur, Este, Oeste). 
Let's make it so that if you drag a box and leave it somewhere, **it stays exactly there when you refresh the page**.

---

## How to Implement it in our Code

### Step 1: Saving the position on `mouseup`
When the user finishes moving the box, we already trigger the `desseleccionar(e)` method. That is the perfect time to save the new coordinates.

```javascript
desseleccionar(e){
    if(!this.enFoco) return;
    this.enFoco = false;
    
    // ... your existing color and promise code ...

    // 💾 SAVE TO LOCAL STORAGE
    // We create an object with our precise coordinates
    const posicionGuardada = {
        left: this.caja.style.left,
        top: this.caja.style.top,
        color: this.caja.style.backgroundColor
    };
    
    // LocalStorage only accepts STRINGS.
    // 'JSON.stringify' converts our Javascript object into text.
    // We use 'this.id' (e.g. "cuadrado-N") as the unique key.
    localStorage.setItem(this.id, JSON.stringify(posicionGuardada));
}
```

### Step 2: Loading the position when the page starts
When we create our instances (`const cN = new Caja("cuadrado-N");`), the constructor function runs. That is the perfect time to check our notebook and see if we have previously saved positions.

```javascript
class Caja {
    constructor(id){
        this.id = id;
        this.enFoco = false;
        this.caja = document.getElementById(id);
        
        // ... your existing event listeners ...

        // 💾 LOAD FROM LOCAL STORAGE
        // Check if there is data saved under this specific ID
        const posicionGuardadaString = localStorage.getItem(this.id);
        
        if (posicionGuardadaString) {
            // 'JSON.parse' turns the text back into a Javascript object
            const posicionOriginal = JSON.parse(posicionGuardadaString);
            
            // Apply the saved styles immediately!
            this.caja.style.left = posicionOriginal.left;
            this.caja.style.top = posicionOriginal.top;
            this.caja.style.backgroundColor = posicionOriginal.color;
        }
        
        this.puntoInicio = this.caja.getBoundingClientRect();
    }
}
```

---

## Optional: How to clear the memory
If you ever want to "reset" the game and put the boxes back in their original spots from the CSS, you can just add a button in the HTML that executes:
`localStorage.clear();` 
and then reloads the page.

If this idea looks good, let me know when we have the **"green light"** to apply all our fixes (the boundary logic, the Promise bugs, and this LocalStorage code) into the main HTML file!

This is a fantastic idea! You have mastered `.map()` and `.filter()`, and you know how to handle multiple promises. 

Now, we are going to level up. This exercise introduces **three new, powerful JavaScript concepts** that are heavily used in senior-level code:

1. **`Set`**: A new data structure that automatically removes duplicate values.
2. **`Promise.any()`**: A promise method that waits for the *first* promise to succeed (ignoring the ones that fail).
3. **`.reduce()`**: The most powerful (and sometimes most confusing!) array method. It takes an array and "reduces" it down to a single value (like a sum, or an object).

---

### Exercise: The High-Frequency Crypto Trader 📈🚀

Imagine you are building a trading bot. You have a list of cryptocurrencies you want to check. 
However, your list has **duplicates** (you accidentally added Bitcoin twice!). Also, you are connected to 3 different servers. You want to get the price of your coins from the **fastest server** that responds. Finally, you need to calculate the **total value** of your portfolio.

**Your Task:**
1. Use a **`Set`** to remove duplicate coins from your list.
2. Create an array of promises to fetch the prices.
3. Use **`Promise.any()`** to get the result from the *first* server that successfully returns the data.
4. Use **`.reduce()`** to calculate the total money you have.

---

### Boilerplate Code:

```javascript
// --- SIMULATED APIs (Do not modify) ---

// Simulates a slow, unreliable server
function obtenerPrecioServidorLento(moneda) {
    return new Promise((resolve, reject) => {
        const tiempo = Math.floor(Math.random() * 2000) + 500; // Random time between 500ms and 2500ms
        setTimeout(() => {
            // 30% chance the server fails
            if (Math.random() > 0.3) {
                resolve({ moneda: moneda, precio: Math.floor(Math.random() * 50000) + 1000 });
            } else {
                reject(new Error(`Servidor lento falló para ${moneda}`));
            }
        }, tiempo);
    });
}

// --- YOUR CODE GOES HERE ---

async function calcularPortafolio() {
    // Your portfolio has duplicates! 'BTC' and 'ETH' are there twice.
    const monedas = ['BTC', 'ETH', 'SOL', 'BTC', 'DOGE', 'ETH'];

    // ---------------------------------------------------------
    // STEP 1: Remove duplicates using a Set
    // Hint: const setUnico = new Set(monedas);
    // Hint: const monedasUnicas = Array.from(setUnico); (or use the spread operator [...setUnico])
    // ---------------------------------------------------------


    // ---------------------------------------------------------
    // STEP 2: Fetch prices using Promise.any()
    // For EACH unique coin, we want to call obtenerPrecioServidorLento().
    // BUT, because the server is unreliable, we want to use Promise.any() 
    // to just grab the first successful response for each coin.
    // Hint: Create an array of promises using .map(). 
    // Each item in the map should be: Promise.any([obtenerPrecioServidorLento(moneda)])
    // Then, await Promise.all() on that array of "any" promises.
    // ---------------------------------------------------------


    // ---------------------------------------------------------
    // STEP 3: Calculate the total value using .reduce()
    // Now you have an array of objects like: [{moneda: 'BTC', precio: 40000}, ...]
    // Use .reduce() to sum up all the 'precio' values.
    // Hint: const total = precios.reduce((acumulador, itemActual) => acumulador + itemActual.precio, 0);
    // ---------------------------------------------------------


    // ---------------------------------------------------------
    // STEP 4: Print the final report!
    // ---------------------------------------------------------
    console.log("Monedas únicas:", monedasUnicas);
    console.log("Precios obtenidos:", precios);
    console.log(`💰 Valor total del portafolio: $${total}`);
}

// Run it!
calcularPortafolio();
```

### 💡 A quick guide to the new concepts:

**1. The `Set`**
A `Set` is like an array, but it **cannot contain duplicates**. 
```javascript
const numeros = [1, 2, 2, 3, 3, 3];
const miSet = new Set(numeros); // Set { 1, 2, 3 }
const arrayLimpio = [...miSet]; // [1, 2, 3] (Using the spread operator to turn it back into an array)
```

**2. `Promise.any()`**
While `Promise.all()` waits for *all* promises to finish, and `Promise.allSettled()` waits for all to finish regardless of errors... **`Promise.any()`** is a race! It returns the exact moment the **first** promise succeeds. If all of them fail, *then* it throws an error.

**3. `.reduce()`**
`.reduce()` takes an array and squashes it into a single value. It takes two arguments: a **callback function** and an **initial value** (like `0`).
```javascript
const numeros = [10, 20, 30];
const suma = numeros.reduce((acumulador, numero) => {
    return acumulador + numero;
}, 0); // suma is 60
```

---

### 🇬🇧 English Practice Challenge
Take your time with this one! It is definitely a step up in difficulty. 
When you paste your final code, **please write 2 or 3 sentences in English** explaining how `.reduce()` works in your own words. Imagine you are explaining it to a junior developer!

Let me know if you need hints for any of the steps. You've got this! 🚀

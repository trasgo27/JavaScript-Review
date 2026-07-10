# Exercise 11: Food Delivery Dashboard 🍕🚴

You are building a food delivery app. You need to check orders from multiple restaurants, find out which ones are ready, and calculate the total bill.

## Setup (simulated API)

```javascript
// Simulates checking an order at a restaurant
function consultarRestaurante(nombre) {
    return new Promise((resolve, reject) => {
        const tiempo = Math.floor(Math.random() * 2000) + 500;
        setTimeout(() => {
            // 70% chance the order is ready
            if (Math.random() > 0.3) {
                resolve({
                    restaurante: nombre,
                    platos: ["🍕 Pizza", "🥗 Ensalada", "🍝 Pasta"].slice(0, Math.floor(Math.random() * 3) + 1),
                    total: Math.floor(Math.random() * 3000) + 500
                });
            } else {
                reject(new Error(`${nombre} still preparing...`));
            }
        }, tiempo);
    });
}
```

## Tasks

### Task 1: Check all restaurants at once
You have an array of restaurants. Use `Promise.allSettled()` to check all of them simultaneously. Use **only `.then()` and `.catch()`** (no `async/await`) to handle the results.

```javascript
const restaurantes = ["🧑‍🍳 Ristorante Roma", "🌮 Taqueria Mexico", "🍣 Sushi Palace", "🥟 Dumpling House", "🧁 Sweet Treats"];
```

### Task 2: Filter successful orders
From the `allSettled` results, use `.filter()` to keep only the fulfilled orders. Log them.

### Task 3: Calculate total bill
From the fulfilled orders, use `.map()` to extract just the `total` values, then `.reduce()` to sum them up. Log the grand total.

### Task 4: Race the restaurants (bonus)
Pretend you only have time to eat at **one** restaurant — the fastest one to respond successfully. Use `Promise.any()` to race all restaurants. Log which one wins.

### Task 5: Plan B (extra bonus)
If `Promise.any()` fails (all restaurants reject), catch the error and log: `"No restaurants available, ordering pizza delivery instead!"`

---

## 🇬🇧 English Challenge
Write 2-3 sentences in English explaining what `Promise.allSettled()` does differently from `Promise.all()`. For example: *"Promise.allSettled waits for all promises but..."*

---

## Hints (if stuck)
<details>
<summary>Click to expand</summary>

**Task 1 structure:**
```javascript
function revisarPedidos() {
    const promesas = restaurantes.map(rest => consultarRestaurante(rest));
    // Promise.allSettled + .then + .catch here
}

revisarPedidos();
```

**Task 2-3 chain:**
```javascript
.then(resultados => {
    const exitosas = resultados.filter(r => r.status === "fulfilled");
    console.table(exitosas.map(r => r.value));
    
    const total = exitosas.map(r => r.value.total).reduce(...);
    console.log("Total: $", total);
})
```

**Task 4:**
```javascript
Promise.any(promesas)
    .then(ganador => console.log("First ready:", ganador))
    .catch(err => console.log("Plan B!"));
```
</details>

# Exercise 13: Flight Booking Dashboard ✈️

You are building a flight aggregator. Query multiple airlines, retry the failed ones, find the cheapest and best-rated flights, and race them to find the fastest responder.

## Setup (simulated API)

```javascript
// Returns flight data for a given airline + destination
function consultarVuelo(aerolinea, destino) {
    return new Promise((resolve, reject) => {
        const tiempo = Math.floor(Math.random() * 2500) + 500;
        setTimeout(() => {
            if (Math.random() > 0.3) { // 70% success
                resolve({
                    airline: aerolinea,
                    destination: destino,
                    price: Math.floor(Math.random() * 400) + 100,
                    duration: Math.floor(Math.random() * 240) + 60,
                    rating: Number((Math.random() * 3 + 2).toFixed(1)),
                    seats: Math.floor(Math.random() * 50) + 1
                });
            } else {
                reject(`${aerolinea} is down for maintenance`);
            }
        }, tiempo);
    });
}

// Retry pattern: recursive .catch()
function consultarConReintento(aerolinea, destino, maxIntentos = 2) {
    return consultarVuelo(aerolinea, destino)
        .catch(err => {
            if (maxIntentos > 1) {
                return consultarConReintento(aerolinea, destino, maxIntentos - 1);
            }
            throw new Error(err);
        });
}
```

## Tasks

### Task 1: Query all airlines with retry
You have an array of airlines. Use `.map()` to call `consultarConReintento()` for each one. Wrap everything in `Promise.allSettled()` and handle the results with `.then()` / `.catch()` (no `async/await`).

```javascript
const aerolineas = ['Iberia', 'Ryanair', 'Air Europa', 'Vueling', 'Lufthansa', 'EasyJet'];
const destino = 'Paris';
```

### Task 2: Filter and display flights
From the `allSettled` results, use `.filter()` and `.map()` to extract only the successful flight data. Log them with `console.table()`.

### Task 3: Find the cheapest flight
Use `.reduce()` to find the flight object with the lowest `price`. Log the airline and price.

### Task 4: Sort flights by rating
Use `.slice()` to copy the array (avoid mutation), then `.sort()` to order by `rating` descending. Log the sorted table.

### Task 5: Calculate averages
Use `.reduce()` to compute the **average price** and **total seats** across all successful flights. Log both values.

### Task 6: Race the airlines
Use `Promise.race()` to find which airline responds **first** (fastest `setTimeout`). Log the winner. Chain this after Task 5 by returning the race promise.

---

## 🇬🇧 English Challenge

Write 2-3 sentences in English explaining the difference between `Promise.allSettled()` and `Promise.race()`.
For example: *"Promise.allSettled waits for all promises..."*

---

## Hints (if stuck)

<details>
<summary>Click to expand</summary>

**Task 1 + 2 structure:**
```javascript
const pendientes = aerolineas.map(aer => consultarConReintento(aer, destino, 2));

Promise.allSettled(pendientes)
    .then(resultados => {
        const vuelos = resultados
            .filter(r => r.status === "fulfilled")
            .map(r => r.value);
        console.table(vuelos);
    })
    .catch(err => console.error(err));
```

**Task 3 (reduce for minimum):**
```javascript
const masBarato = vuelos.reduce((min, v) =>
    v.price < min.price ? v : min
);
```

**Task 4 (sort by rating):**
```javascript
const ordenado = vuelos.slice().sort((a, b) => b.rating - a.rating);
```

**Task 5 (reduce for sum):**
```javascript
const total = vuelos.reduce((sum, v) => sum + v.price, 0);
```

**Task 6 (race + chaining):**
```javascript
// Return the race promise to chain it
return Promise.race(aerolineas.map(aer => consultarVuelo(aer, destino)));
```
</details>

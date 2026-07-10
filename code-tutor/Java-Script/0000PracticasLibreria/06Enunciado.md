Here is the complete statement (enunciado) and the boilerplate code for the **Movie Night Planner** exercise you just solved. You can copy this to your notes!

***

### Exercise: The Movie Night Planner 🍿🎬

Imagine you are building an app that plans a movie night. 
First, you need to ask the server what the user's favorite movie genre is. 
Once you know the genre, you can simultaneously search for **Movies** in that genre and order **Snacks** for the night.

**Your Task:**
Write an `async` function called `planearNocheDeCine(userId)` that does the following:
1. Waits to get the user's favorite genre using their `userId`.
2. Uses `Promise.all()` to fetch the **Movies** (using the genre) and the **Snacks** at the exact same time.
3. Uses **array destructuring** to unpack the results from `Promise.all()`.
4. Returns a final object containing the `genero`, `peliculas`, and `snacks`.
5. Uses a `try...catch` block to handle any errors (like an invalid `userId`).

**Boilerplate Code:**
```javascript
// --- SIMULATED APIs (Do not modify these) ---

function obtenerGeneroFavorito(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId === 1) {
                resolve("Ciencia Ficción");
            } else {
                reject(new Error("Usuario no encontrado en la base de datos"));
            }
        }, 1000);
    });
}

function obtenerPeliculas(genero) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulates searching a database for movies of a specific genre
            resolve([`Interstellar (${genero})`, `Matrix (${genero})`]);
        }, 1500);
    });
}

function obtenerSnacks() {
    return new Promise((resolve) => {
        setTimeout(() => {
            // This doesn't depend on the genre, it's always the same!
            resolve(["Palomitas 🍿", "Refresco 🥤", "Chocolate 🍫"]);
        }, 1000);
    });
}

// --- YOUR CODE GOES HERE ---

// 1. Write your async function planearNocheDeCine(userId) below:


// 2. Test it with a valid userId (1):


// 3. Test it with an invalid userId (99):

```

***

*(Small note: In step 2 of the instructions, it says to run the Movies and Snacks in parallel. However, as you brilliantly discovered on your own, running the **Genre** and **Snacks** in parallel is actually the most optimized way to do it because the snacks don't depend on anything! You outsmarted the prompt!)*

Let me know if you need the statement for any of the previous exercises, or if you are ready for the "Boss Level" challenge!

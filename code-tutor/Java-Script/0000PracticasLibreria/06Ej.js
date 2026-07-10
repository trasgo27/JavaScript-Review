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
async function planearNocheDeCine(userId) {
    const vector = await Promise.all([
        obtenerGeneroFavorito(userId),
        obtenerSnacks()
    ]);
    const [genero, snacks] = vector; 
    const pelicula = await obtenerPeliculas(genero);
    return {
        genero,
        snacks,
        pelicula: pelicula
    }
}


async function probar(userId) {
    try{
    console.log(`Empezar Genero ...${userId}`);
    console.time(`Genero${userId}`);     
    const genero =  await planearNocheDeCine(userId);
    console.log(`Empezar Genero ...${userId}`)
    console.timeEnd(`Genero${userId}`);
    console.log(genero);
}catch (err){
    console.error(err);
}
}
// 2. Test it with a valid userId (1):
probar(1);

// 3. Test it with an invalid userId (99):
probar(99);
// --- SIMULATED APIs (Do not modify these) ---
function obtenerDeportes(){
    return new Promise((resolve)=>{
        setTimeout(()=>
            resolve('España ha ganado el mundial'), 2000); //funcion resolve
    });
}
function obtenerClima() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Soleado, 25°C ☀️"), 1000);
    });
}

function obtenerNoticias() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(["Noticia 1: JS es genial", "Noticia 2: IA avanza"]), 1500);
    });
}

function obtenerAcciones() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ AAPL: 150, TSLA: 200 }), 2000);
    });
}

// --- YOUR CODE GOES HERE ---

// 1. Write cargarSecuencial()
// Use await for each function one by one. Return an object with the 3 results.
async function cargarSecuencial() {
    const weatherForecast = await obtenerClima();
    const news = await obtenerNoticias();
    const acciones = await obtenerAcciones();
    const deportes = await obtenerDeportes();

    return {
        clima: weatherForecast,
        noticias: news,
        acciones: acciones,
        deportes: deportes
    };
}

// 2. Write cargarParalelo()
// Use Promise.all() to run them at the same time.
// Hint: You can destructure the result like this: const [clima, noticias, acciones] = await Promise.all([...]);
async function cargarParalelo() {
    const resultados = await Promise.all([
        obtenerClima(),
        obtenerNoticias(),
        obtenerAcciones(),
        obtenerDeportes()
    ]);

    const [clima, noticias, acciones, deportes] = resultados;
    return { clima, noticias, acciones, deportes };
}

// --- TESTING THE SPEED ---
async function probarVelocidad() {
    console.log("--- Empezando carga SECUENCIAL ---");
    console.time("Secuencial");
    const resultado1 = await cargarSecuencial();
    console.timeEnd("Secuencial");
    console.log("Datos:", resultado1);

    console.log("\n--- Empezando carga PARALELA ---");
    console.time("Paralelo");
    const resultado2 = await cargarParalelo();
    console.timeEnd("Paralelo");
    console.log("Datos:", resultado2);
}

probarVelocidad();

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
    const setUnico = new Set(monedas);
    // Hint: const monedasUnicas = Array.from(setUnico); (or use the spread operator [...setUnico])
    const monedasUnicas = [...setUnico];
    // ---------------------------------------------------------


    // ---------------------------------------------------------
    // STEP 2: Fetch prices using Promise.any()
    // For EACH unique coin, we want to call obtenerPrecioServidorLento().
    // BUT, because the server is unreliable, we want to use Promise.any() 
    // to just grab the first successful response for each coin.
    // Hint: Create an array of promises using .map(). 
    const vectorPrecios = monedasUnicas.map((moneda)=>
        Promise.any([
        obtenerPrecioServidorLento(moneda), //the func. throws a promise
        obtenerPrecioServidorLento(moneda), // not await in front of it 
        obtenerPrecioServidorLento(moneda),
        obtenerPrecioServidorLento(moneda),
        obtenerPrecioServidorLento(moneda),
        obtenerPrecioServidorLento(moneda),
        obtenerPrecioServidorLento(moneda),
        obtenerPrecioServidorLento(moneda),
        obtenerPrecioServidorLento(moneda),
        obtenerPrecioServidorLento(moneda)])    //it is going to return the first resolve
    );
    //vectorPrecios is un precio o la promesa de un precio?
    console.table(vectorPrecios);
    const vectorPrecios2 = await Promise.allSettled(vectorPrecios);
    const rechazados = vectorPrecios2.filter((promi)=> promi.status === "rejected");
    if (rechazados.length > 0) {
        console.warn("Algunas solicitudes fallaron:", rechazados);
    }
    // ---------------------------------------------------------
    console.table(vectorPrecios2);

    // ---------------------------------------------------------
    // STEP 3: Calculate the total value using .reduce()
    // Now you have an array vectorPreciosof objects like: [{moneda: 'BTC', precio: 40000}, ...]
    // Use .reduce() to sum up all the 'precio' values.
    // Hint: const total = precios.reduce((acumulador, itemActual) => acumulador + itemActual.precio, 0);
    // ---------------------------------------------------------
    const precios = vectorPrecios2
        .filter((promi) => promi.status === "fulfilled")
        .map((promi) => promi.value);

    const total = precios.reduce((acumulador, itemActual) => acumulador + itemActual.precio, 0);

    // ---------------------------------------------------------
    // STEP 4: Print the final report!
    // ---------------------------------------------------------
    console.log("Monedas únicas:", monedasUnicas);
    console.log("Precios obtenidos:", precios);
    console.log(`💰 Valor total del portafolio: $${total}`);
}

// Run it!
calcularPortafolio();
// --- SIMULATED API (Do not modify) ---

function obtenerClima(ciudadId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const baseDeDatos = {
                1: { ciudad: "Madrid", temp: "28°C", estado: "Soleado ☀️" },
                2: { ciudad: "Londres", temp: "15°C", estado: "Lluvioso 🌧️" },
                3: { ciudad: "Tokio", temp: "32°C", estado: "Húmedo 💧" },
            };

            if (baseDeDatos[ciudadId]) {
                resolve(baseDeDatos[ciudadId]);
            } else {
                reject(new Error(`Ciudad con ID ${ciudadId} no encontrada`));
            }
        }, 1000);
    });
}

// --- YOUR CODE GOES HERE ---

async function cargarDashboardClima() {
    const ciudadesIds = [1, 2, 99, 3, 77];

    const misPromesas = ciudadesIds.map(item => await obtenerClima(item));

    const resultados = await Promise.allSettled(misPromesas);

    const exitosas = resultados.filter(r => r.status === "fulfilled");
    const fallidas = resultados.filter(r => r.status === "rejected");

    console.log("Ciudades exitosas:", exitosas);
    console.log("Ciudades fallidas:", fallidas);
}

// Run it!
cargarDashboardClima();

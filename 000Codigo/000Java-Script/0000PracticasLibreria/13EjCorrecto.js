// ============================================================
// Flight Booking Dashboard ✈️
// Concepts: retry/catch recursion, reduce, sort, race, chaining
// ============================================================

// Simulated API: queries a flight for a given airline + destination
function consultarVuelo(aerolinea, destino) {
    return new Promise((resolve, reject) => {
        const tiempo = Math.floor(Math.random() * 2500) + 500;
        setTimeout(() => {
            if (Math.random() > 0.3) {
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

// Retry pattern: recursive .catch(), retries up to maxAttempts
function consultarConReintento(aerolinea, destino, maxIntentos = 2) {
    return consultarVuelo(aerolinea, destino)
        .catch(err => {
            if (maxIntentos > 1) {
                return consultarConReintento(aerolinea, destino, maxIntentos - 1);
            }
            throw new Error(err);
        });
}

// --- Main program ---

const aerolineas = [
    'Iberia', 'Ryanair', 'Air Europa',
    'Vueling', 'Lufthansa', 'EasyJet'
];
const destino = 'Paris';

const vuelosPendientes = aerolineas.map(aer =>
    consultarConReintento(aer, destino, 2)
);

Promise.allSettled(vuelosPendientes)
    .then(resultados => {
        // Separate successes from failures
        const vuelos = resultados
            .filter(r => r.status === 'fulfilled')
            .map(r => r.value);
        const errores = resultados
            .filter(r => r.status === 'rejected')
            .map(r => r.reason.message);

        console.log(`✈️ Flights to ${destino}`);
        console.log(`✅ ${vuelos.length} available  |  ❌ ${errores.length} failed`);
        if (errores.length) console.log('Failed:', errores);

        // Task 2: Show all flights table
        console.log('\n--- All Flights ---');
        console.table(vuelos);

        // Task 3: Cheapest flight using reduce
        const masBarato = vuelos.reduce((min, v) =>
            v.price < min.price ? v : min
        );
        console.log(`\n💰 Cheapest: ${masBarato.airline} — $${masBarato.price}`);

        // Task 4: Sort by rating (slice to avoid mutating original)
        const mejorValorados = vuelos
            .slice()
            .sort((a, b) => b.rating - a.rating);
        console.log('\n🏆 By rating:');
        console.table(mejorValorados.map(v => ({
            airline: v.airline,
            rating: v.rating,
            price: `$${v.price}`
        })));

        // Task 5: Average price + total seats using reduce
        const totalPrecio = vuelos.reduce((s, v) => s + v.price, 0);
        const media = Math.round(totalPrecio / vuelos.length);
        const totalAsientos = vuelos.reduce((s, v) => s + v.seats, 0);
        console.log(`\n📊 Avg price: $${media}  |  💺 Total seats: ${totalAsientos}`);

        // Task 6: Race all airlines — fastest responder wins
        const carrera = Promise.race(
            aerolineas.map(aer => consultarVuelo(aer, destino))
        );
        return carrera;
    })
    .then(ganador => {
        console.log(`\n⚡ First to respond: ${ganador.airline} — $${ganador.price}`);
    })
    .catch(err => {
        console.error('❌ All airlines failed to respond');
    });

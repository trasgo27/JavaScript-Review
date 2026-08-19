// 01Ej.js
// Ejercicio 1: Cache simple de respuestas

console.log('=== Inciando Ejercicio 1 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── Cache global ────────────────────────────────────────────
const cache = new Map();
let fetchCount = 0;
let cacheHitCount = 0;

// ─── TASK 1 & 2: fetchCached() ─────────────────────────────
function fetchCached(url) {
    if (cache.has(url)) {
        const entry = cache.get(url);
        console.log(`✅ CACHE HIT: ${url}`);
        cacheHitCount++;
        return Promise.resolve(entry.data);
    }

    console.log(`🌐 FETCH REAL: ${url}`);
    fetchCount++;

    return fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(data => {
            cache.set(url, { data, timestamp: Date.now() });
            return data;
        });
}

// ─── TASK 3: TTL de 30 segundos ────────────────────────────
function fetchCachedTTL(url, ttlMs = 30000) {
    if (cache.has(url)) {
        const entry = cache.get(url);
        const age = Date.now() - entry.timestamp;

        if (age < ttlMs) {
            console.log(`✅ CACHE HIT (${Math.round(age / 1000)}s ago): ${url}`);
            cacheHitCount++;
            return Promise.resolve(entry.data);
        } else {
            console.log(`⏰ CACHE EXPIRED (${Math.round(age / 1000)}s > ${ttlMs / 1000}s): ${url}`);
            cache.delete(url);
        }
    }

    console.log(`🌐 FETCH REAL: ${url}`);
    fetchCount++;

    return fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(data => {
            cache.set(url, { data, timestamp: Date.now() });
            return data;
        });
}

// ─── Demostración ────────────────────────────────────────────
hacerEj('Task 1-3: Demostrar cache con TTL', async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    const output = document.getElementById('output');

    // Primera llamada — fetch real
    console.log('--- Primera llamada ---');
    const data1 = await fetchCachedTTL(url);
    console.log('Data:', data1.title);

    // Segunda llamada — cache hit
    console.log('\n--- Segunda llamada ---');
    const data2 = await fetchCachedTTL(url);
    console.log('Mismos datos?', data1.title === data2.title);

    // Estadísticas
    console.log(`\n📊 Fetches reales: ${fetchCount} | Cache hits: ${cacheHitCount}`);
    console.log('TTL configurado: 30 segundos');

    if (output) {
        output.innerHTML = `
            <h4>Estadísticas de Cache</h4>
            <p>Fetches reales: <strong>${fetchCount}</strong></p>
            <p>Cache hits: <strong>${cacheHitCount}</strong></p>
            <p>TTL: <strong>30 segundos</strong></p>
            <p>Entradas en cache: <strong>${cache.size}</strong></p>
            <hr>
            <p><em>Intenta hacer clic en "Limpiar Cache" y luego vuelve a ejecutar para ver un fetch real.</em></p>
        `;
    }
});

// ─── TASK 4: Botón Limpiar Cache ───────────────────────────
hacerEj('Task 4: Botón Limpiar Cache', () => {
    const btn = document.getElementById('clear-cache-btn');
    if (btn) {
        btn.addEventListener('click', () => {
            cache.clear();
            fetchCount = 0;
            cacheHitCount = 0;
            console.log('🗑️ Cache limpiado');
            const output = document.getElementById('output');
            if (output) output.innerHTML = '<p>Cache limpiado. Las próximas peticiones serán reales.</p>';
        });
    }
});

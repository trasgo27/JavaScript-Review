console.log('=== Inciando Ejercicio 05 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── TASK 1: Crear funcion fetchWithTimeout(url, ms) usando Promise.race ──────────────────
hacerEj('TASK 1: Crear fetchWithTimeout() con Promise.race', async () => {
    function fetchWithTimeout(url, ms = 5000) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), ms);

        const fetchPromise = fetch(url, { signal: controller.signal })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            });

        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error(`Timeout: la peticion a ${url} tardo mas de ${ms}ms`));
            }, ms);
        });

        return Promise.race([fetchPromise, timeoutPromise])
            .finally(() => clearTimeout(timeoutId));
    }

    console.log('Test 1: URL rapida con timeout largo');
    try {
        const datos = await fetchWithTimeout('https://jsonplaceholder.typicode.com/posts/1', 5000);
        console.log('  OK:', datos.title);
    } catch (error) {
        console.log('  Error:', error.message);
    }

    console.log('Test 2: URL real con timeout muy corto (1ms)');
    try {
        const datos = await fetchWithTimeout('https://jsonplaceholder.typicode.com/posts/1', 1);
        console.log('  OK:', datos.title);
    } catch (error) {
        console.log('  Error:', error.message);
    }

    window.fetchWithTimeout = fetchWithTimeout;
});

// ─── TASK 2: Probar con API lenta (simular con setTimeout + Promise) ──────────────────
hacerEj('TASK 2: Simular API lenta con setTimeout', async () => {
    function simularAPI(nombre, tiempoMs, exito = true) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (exito) {
                    resolve({ nombre, tiempoMs, mensaje: `Respuesta de ${nombre}` });
                } else {
                    reject(new Error(`${nombre} fallo despues de ${tiempoMs}ms`));
                }
            }, tiempoMs);
        });
    }

    function promesaConTimeout(promesa, ms) {
        const timeout = new Promise((_, reject) => {
            setTimeout(() => reject(new Error(`Timeout de ${ms}ms`)), ms);
        });
        return Promise.race([promesa, timeout]);
    }

    console.log('Test 1: API rapida dentro del timeout');
    try {
        const resultado = await promesaConTimeout(simularAPI('Rapida', 100), 2000);
        console.log('  OK:', resultado);
    } catch (error) {
        console.log('  Error:', error.message);
    }

    console.log('Test 2: API lenta que excede el timeout');
    try {
        const resultado = await promesaConTimeout(simularAPI('Lenta', 3000), 500);
        console.log('  OK:', resultado);
    } catch (error) {
        console.log('  Error:', error.message);
    }

    console.log('Test 3: API que falla antes del timeout');
    try {
        const resultado = await promesaConTimeout(simularAPI('Fallida', 200, false), 2000);
        console.log('  OK:', resultado);
    } catch (error) {
        console.log('  Error:', error.message);
    }

    console.log('');
    console.log('LECCION: Promise.race resuelve/rechaza con el PRIMERO que termine.');
    console.log('Si el timeout llega primero → rechaza con timeout.');
    console.log('Si la promesa llega primero → resuelve con el resultado.');
});

// ─── TASK 3: Crear funcion fetchWithFallback(urls) usando Promise.any ──────────────────
hacerEj('TASK 3: Crear fetchWithFallback() con Promise.any', async () => {
    function fetchWithFallback(urls) {
        const promesas = urls.map(url =>
            fetch(url)
                .then(r => {
                    if (!r.ok) throw new Error(`HTTP ${r.status}`);
                    return r.json();
                })
        );
        return Promise.any(promesas);
    }

    console.log('Test 1: Primera URL funciona');
    try {
        const datos = await fetchWithFallback([
            'https://jsonplaceholder.typicode.com/posts/1',
            'https://jsonplaceholder.typicode.com/users/1'
        ]);
        console.log('  OK:', datos.title || datos.name);
    } catch (error) {
        console.log('  Error:', error.message);
    }

    console.log('Test 2: Primera URL falla, segunda funciona');
    try {
        const datos = await fetchWithFallback([
            'https://dominio-que-no-existe-xyz.com/api',
            'https://jsonplaceholder.typicode.com/users/1'
        ]);
        console.log('  OK:', datos.name);
    } catch (error) {
        console.log('  Error:', error.message);
    }

    console.log('Test 3: Todas las URLs fallan');
    try {
        await fetchWithFallback([
            'https://dominio-que-no-existe-xyz.com/api',
            'https://otro-dominio-falso-abc.com/api'
        ]);
    } catch (error) {
        console.log('  Error (AggregateError):', error.message);
        console.log('  Errores individuales:');
        error.errors.forEach((e, i) => {
            console.log(`    [${i}] ${e.message}`);
        });
    }

    window.fetchWithFallback = fetchWithFallback;
});

// ─── TASK 4: Demostrar race vs any — diferencia clave ──────────────────
hacerEj('TASK 4: Race vs Any — diferencia clave', async () => {
    const contenedor = document.getElementById('resultados');

    function crearPromesa(nombre, tiempoMs, exito) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (exito) resolve(`${nombre} OK`);
                else reject(new Error(`${nombre} FALLO`));
            }, tiempoMs);
        });
    }

    console.log('=== PROMISE.RACE ===');
    console.log('Race resuelve/rechaza con el PRIMERO que termine (exito o error).');
    console.log('');

    console.log('Race: rapido OK vs lento OK');
    try {
        const resultado = await Promise.race([
            crearPromesa('Rapido', 100, true),
            crearPromesa('Lento', 1000, true)
        ]);
        console.log('  Ganador:', resultado);
    } catch (error) {
        console.log('  Error:', error.message);
    }

    console.log('Race: rapido FALLO vs lento OK');
    try {
        const resultado = await Promise.race([
            crearPromesa('RapidoFallido', 100, false),
            crearPromesa('LentoOK', 1000, true)
        ]);
        console.log('  Ganador:', resultado);
    } catch (error) {
        console.log('  Ganador (error):', error.message);
    }

    console.log('');
    console.log('=== PROMISE.ANY ===');
    console.log('Any espera el PRIMERO que tenga EXITO. Ignora errores hasta encontrar uno ok.');
    console.log('');

    console.log('Any: rapido FALLO vs lento OK');
    try {
        const resultado = await Promise.any([
            crearPromesa('RapidoFallido', 100, false),
            crearPromesa('LentoOK', 500, true)
        ]);
        console.log('  Ganador:', resultado);
    } catch (error) {
        console.log('  Error:', error.message);
    }

    console.log('Any: rapido OK vs lento FALLO');
    try {
        const resultado = await Promise.any([
            crearPromesa('RapidoOK', 100, true),
            crearPromesa('LentoFallido', 500, false)
        ]);
        console.log('  Ganador:', resultado);
    } catch (error) {
        console.log('  Error:', error.message);
    }

    console.log('Any: todas fallan');
    try {
        await Promise.any([
            crearPromesa('A', 100, false),
            crearPromesa('B', 200, false),
            crearPromesa('C', 300, false)
        ]);
    } catch (error) {
        console.log('  AggregateError con', error.errors.length, 'errores');
        error.errors.forEach(e => console.log('    ', e.message));
    }

    let salida = `
=== RESUMEN: race vs any ===

PROMISE.RACE:
  - Resuelve o rechaza con el PRIMERO que termine
  - Si el primero es error → RECHAZA (aunque otros exiten)
  - Uso tipico: timeouts

PROMISE.ANY:
  - Resuelve con el PRIMERO que tenga EXITO
  - Ignora errores hasta encontrar uno ok
  - Si todos fallan → RECHAZA (AggregateError)
  - Uso tipico: fallbacks, mirror/CDN

EJEMPLO PRACTICO:
  Race: fetch + timeout → quien llegue primero
  Any:  fetch CDN1, CDN2, CDN3 → el que responda
`.trim();

    console.log(salida);
    contenedor.textContent = salida;
});
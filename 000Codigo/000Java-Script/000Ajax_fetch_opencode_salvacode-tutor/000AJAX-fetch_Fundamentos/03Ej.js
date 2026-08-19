console.log('=== Inciando Ejercicio 03 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── TASK 1: Fetch a URL válida, examinar campos del Response ──────────────────
hacerEj('TASK 1: Fetch a URL válida — examinar response.ok, .status, .statusText', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');

    console.log('response.ok:', response.ok);
    console.log('response.status:', response.status);
    console.log('response.statusText:', response.statusText);
    console.log('response.headers:', response.headers);
    console.log('response.type:', response.type);
    console.log('response.url:', response.url);
    console.log('response.redirected:', response.redirected);

    console.log('\nIterando headers:');
    response.headers.forEach((value, key) => {
        console.log(`  ${key}: ${value}`);
    });

    console.log('\nLectura específica de headers:');
    console.log('  content-type:', response.headers.get('content-type'));
    console.log('  content-length:', response.headers.get('content-length'));
    console.log('  cache-control:', response.headers.get('cache-control'));

    const data = await response.json();
    console.log('\nBody parseado:', data);
});

// ─── TASK 2: Fetch a URL inexistente (404), examinar campos ──────────────────
hacerEj('TASK 2: Fetch a URL inexistente (404) — examinar campos', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/99999');

    console.log('response.ok:', response.ok);
    console.log('response.status:', response.status);
    console.log('response.statusText:', response.statusText);

    console.log('\n¡OJO! fetch() NO lanzó un error a pesar del 404');
    console.log('La petición fue "exitosa" desde el punto de vista de la red');
    console.log('El 404 es un estado HTTP válido, no una excepción');

    const contentType = response.headers.get('content-type');
    console.log('content-type:', contentType);

    if (contentType && contentType.includes('application/json')) {
        const body = await response.json();
        console.log('Body:', body);
    } else {
        const text = await response.text();
        console.log('Body (texto):', text.substring(0, 200));
    }
});

// ─── TASK 3: Crear función fetchInfo(url) ──────────────────
hacerEj('TASK 3: Crear función fetchInfo(url)', async () => {
    async function fetchInfo(url) {
        const response = await fetch(url);
        const contentType = response.headers.get('content-type');
        return {
            ok: response.ok,
            status: response.status,
            contentType: contentType
        };
    }

    console.log('Probando con URL válida:');
    const info1 = await fetchInfo('https://jsonplaceholder.typicode.com/posts/1');
    console.log('fetchInfo resultado:', info1);

    console.log('\nProbando con URL que retorna 404:');
    const info2 = await fetchInfo('https://jsonplaceholder.typicode.com/posts/99999');
    console.log('fetchInfo resultado:', info2);

    console.log('\nProbando con URL que retorna 500 (simulado):');
    const info3 = await fetchInfo('https://jsonplaceholder.typicode.com/status/500');
    console.log('fetchInfo resultado:', info3);

    console.log('\nProbando con URL que no existe (error de red):');
    try {
        const info4 = await fetchInfo('https://url-que-no-existe-999.com/dato');
        console.log('fetchInfo resultado:', info4);
    } catch (error) {
        console.log('Aquí fetch() SÍ lanza error — es error de RED, no HTTP');
        console.log('Tipo de error:', error.constructor.name);
        console.log('Mensaje:', error.message);
    }
});

// ─── TASK 4: Lección — fetch() NO rechaza en errores HTTP ──────────────────
hacerEj('TASK 4: Lección — fetch() solo rechaza en errores de red', async () => {
    console.log('═══════════════════════════════════════════════════');
    console.log('  LECCIÓN CLAVE: fetch() y el manejo de errores  ');
    console.log('═══════════════════════════════════════════════════');
    console.log('');
    console.log('fetch() solo rechaza (rejected) cuando:');
    console.log('  ✗ No hay conexión a internet');
    console.log('  ✗ DNS falla');
    console.log('  ✗ CORS bloquea la petición');
    console.log('  ✗ Timeout de red');
    console.log('  ✗ URL inválida');
    console.log('');
    console.log('fetch() NO rechaza en:');
    console.log('  ✗ 400 Bad Request');
    console.log('  ✗ 401 Unauthorized');
    console.log('  ✗ 403 Forbidden');
    console.log('  ✗ 404 Not Found');
    console.log('  ✗ 500 Internal Server Error');
    console.log('');
    console.log('Por eso SIEMPRE debes verificar response.ok o response.status');
    console.log('');

    console.log('--- Ejemplo de error de red (fetch SÍ rechaza) ---');
    try {
        await fetch('https://esta-url-no-existe-999.com/api');
    } catch (error) {
        console.log('Error capturado:', error.message);
        console.log('Tipo:', error.name);
    }

    console.log('\n--- Ejemplo de error HTTP (fetch NO rechaza) ---');
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/99999');
    console.log('response.ok:', response.ok, '(debería ser false)');
    console.log('response.status:', response.status, '(debería ser 404)');
    console.log('Pero fetch() no lanzó excepción — hay que verificar manualmente');

    console.log('\n--- Patrón recomendado: verificar response.ok ---');
    console.log(`
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const data = await response.json();
    `);
});

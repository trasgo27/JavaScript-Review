console.log('=== Inciando Ejercicio 03 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── TASK 1: Crear funcion fetchJSON(url, options) ──────────────────
hacerEj('TASK 1: Crear funcion fetchJSON()', async () => {
    async function fetchJSON(url, options = {}) {
        let response;
        try {
            response = await fetch(url, options);
        } catch (error) {
            const err = new Error(`Error de red: ${error.message}`);
            err.code = 'NETWORK_ERROR';
            err.originalError = error;
            throw err;
        }

        if (!response.ok) {
            let body = '';
            try {
                body = await response.text();
            } catch (_) {}

            const err = new Error(`HTTP ${response.status} ${response.statusText} — ${url}`);
            err.status = response.status;
            err.statusText = response.statusText;
            err.url = url;
            err.body = body;
            err.code = 'HTTP_ERROR';
            throw err;
        }

        try {
            return await response.json();
        } catch (error) {
            const err = new Error(`Error al parsear JSON: ${error.message}`);
            err.code = 'PARSE_ERROR';
            err.url = url;
            throw err;
        }
    }

    console.log('fetchJSON creada correctamente');
    console.log('Estructura de error para HTTP:');
    console.log('  { code, status, statusText, url, body, message }');
    console.log('Estructura de error para red:');
    console.log('  { code, message, originalError }');
});

// ─── TASK 2: Probar con URLs validas, 404s, 500s, URLs rotas ──────────────────
hacerEj('TASK 2: Probar fetchJSON con distintos escenarios', async () => {
    async function fetchJSON(url, options = {}) {
        let response;
        try {
            response = await fetch(url, options);
        } catch (error) {
            const err = new Error(`Error de red: ${error.message}`);
            err.code = 'NETWORK_ERROR';
            err.originalError = error;
            throw err;
        }

        if (!response.ok) {
            let body = '';
            try { body = await response.text(); } catch (_) {}
            const err = new Error(`HTTP ${response.status} ${response.statusText} — ${url}`);
            err.status = response.status;
            err.statusText = response.statusText;
            err.url = url;
            err.body = body;
            err.code = 'HTTP_ERROR';
            throw err;
        }

        try {
            return await response.json();
        } catch (error) {
            const err = new Error(`Error al parsear JSON: ${error.message}`);
            err.code = 'PARSE_ERROR';
            err.url = url;
            throw err;
        }
    }

    const tests = [
        { nombre: 'URL valida', url: 'https://jsonplaceholder.typicode.com/posts/1' },
        { nombre: '404 - Post inexistente', url: 'https://jsonplaceholder.typicode.com/posts/99999' },
        { nombre: '404 - Endpoint inexistente', url: 'https://jsonplaceholder.typicode.com/no-existe' },
        { nombre: 'URL rota', url: 'https://dominio-que-no-existe-abc.com/api' }
    ];

    for (const test of tests) {
        try {
            const data = await fetchJSON(test.url);
            console.log(`[OK] ${test.nombre}:`, data.title || data.name || 'Datos recibidos');
        } catch (error) {
            console.log(`[FALLO] ${test.nombre}:`);
            console.log(`  Code: ${error.code}`);
            console.log(`  Message: ${error.message}`);
            if (error.status) console.log(`  Status: ${error.status}`);
        }
    }
});

// ─── TASK 3: Mostrar resultados en consola y DOM ──────────────────
hacerEj('TASK 3: Mostrar resultados en consola y DOM', async () => {
    async function fetchJSON(url, options = {}) {
        let response;
        try {
            response = await fetch(url, options);
        } catch (error) {
            const err = new Error(`Error de red: ${error.message}`);
            err.code = 'NETWORK_ERROR';
            err.originalError = error;
            throw err;
        }

        if (!response.ok) {
            let body = '';
            try { body = await response.text(); } catch (_) {}
            const err = new Error(`HTTP ${response.status} ${response.statusText} — ${url}`);
            err.status = response.status;
            err.statusText = response.statusText;
            err.url = url;
            err.body = body;
            err.code = 'HTTP_ERROR';
            throw err;
        }

        try {
            return await response.json();
        } catch (error) {
            const err = new Error(`Error al parsear JSON: ${error.message}`);
            err.code = 'PARSE_ERROR';
            err.url = url;
            throw err;
        }
    }

    const contenedor = document.createElement('div');
    contenedor.style.cssText = 'margin-top:1rem;padding:1rem;border-radius:8px;font-family:monospace;white-space:pre-wrap;background:rgba(22,30,49,0.9);color:#f8fafc;border:1px solid rgba(56,189,248,0.2);max-height:400px;overflow-y:auto;';
    document.querySelector('.card').appendChild(contenedor);

    const tests = [
        { nombre: 'GET /posts/1', url: 'https://jsonplaceholder.typicode.com/posts/1' },
        { nombre: 'GET /posts/99999 (404)', url: 'https://jsonplaceholder.typicode.com/posts/99999' },
        { nombre: 'POST /posts (201)', url: 'https://jsonplaceholder.typicode.com/posts', opts: { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: 'test', body: 'test', userId: 1 }) } },
        { nombre: 'DELETE /posts/1 (200)', url: 'https://jsonplaceholder.typicode.com/posts/1', opts: { method: 'DELETE' } },
        { nombre: 'URL rota (red)', url: 'https://esta-url-no-existe-xyz.com/api' }
    ];

    let salida = '';

    for (const test of tests) {
        try {
            const data = await fetchJSON(test.url, test.opts);
            salida += `[OK]      ${test.nombre}\n`;
            salida += `           Resultado: ${JSON.stringify(data).substring(0, 80)}...\n\n`;
        } catch (error) {
            salida += `[FALLO]   ${test.nombre}\n`;
            salida += `           Code: ${error.code}\n`;
            salida += `           Msg:  ${error.message}\n\n`;
        }
    }

    contenedor.textContent = salida;
    console.log(salida);
});
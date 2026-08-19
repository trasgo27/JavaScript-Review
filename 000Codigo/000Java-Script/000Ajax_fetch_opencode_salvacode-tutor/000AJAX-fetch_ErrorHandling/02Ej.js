console.log('=== Inciando Ejercicio 02 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── TASK 1: Fetch a /posts/99999 (404) y verificar !response.ok ──────────────────
hacerEj('TASK 1: Fetch a /posts/99999 y verificar !response.ok', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/99999');

    console.log('response.ok:', response.ok);
    console.log('response.status:', response.status);
    console.log('response.statusText:', response.statusText);

    if (!response.ok) {
        console.log('¡La respuesta NO es exitosa!');
        console.log(`El servidor devolvio ${response.status} ${response.statusText}`);
        console.log('Pero fetch() NO lanzo un error — esto es lo que confunde.');

        const texto = await response.text();
        console.log('Body de la respuesta 404:', texto.substring(0, 200));
    } else {
        const data = await response.json();
        console.log('Datos:', data);
    }
});

// ─── TASK 2: Fetch a /invalid-endpoint y manejar 404 ──────────────────
hacerEj('TASK 2: Fetch a /invalid-endpoint y manejar 404', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/invalid-endpoint');

    console.log('Status:', response.status);
    console.log('URL solicitada:', response.url);

    if (response.status === 404) {
        console.log('Recurso no encontrado (404)');
    } else if (response.status >= 500) {
        console.log('Error del servidor (5xx)');
    }

    const contentType = response.headers.get('content-type');
    console.log('Content-Type:', contentType);

    if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('Respuesta JSON:', data);
    } else {
        const texto = await response.text();
        console.log('Respuesta texto:', texto.substring(0, 300));
    }
});

// ─── TASK 3: Crear funcion checkStatus(response) que lance error si !ok ──────────────────
hacerEj('TASK 3: Crear funcion checkStatus()', async () => {
    function checkStatus(response) {
        if (response.ok) {
            return response;
        }

        const error = new Error(`HTTP Error ${response.status}: ${response.statusText}`);
        error.status = response.status;
        error.statusText = response.statusText;
        error.url = response.url;
        throw error;
    }

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/99999');
        checkStatus(response);
        console.log('Esto no se ejecuta');
    } catch (error) {
        console.log('checkStatus lanzo error:');
        console.log('  Mensaje:', error.message);
        console.log('  Status:', error.status);
        console.log('  StatusText:', error.statusText);
        console.log('  URL:', error.url);
    }

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        checkStatus(response);
        console.log('checkStatus con URL valida: OK');
    } catch (error) {
        console.log('Error inesperado:', error.message);
    }
});

// ─── TASK 4: Mostrar en DOM: status, statusText, URL ──────────────────
hacerEj('TASK 4: Mostrar en DOM status, statusText, URL', async () => {
    const contenedor = document.createElement('div');
    contenedor.style.cssText = 'margin-top:1rem;padding:1rem;border-radius:8px;font-family:monospace;white-space:pre-wrap;background:rgba(22,30,49,0.9);color:#f8fafc;border:1px solid rgba(56,189,248,0.2);';
    document.querySelector('.card').appendChild(contenedor);

    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/99999',
        'https://jsonplaceholder.typicode.com/invalid-endpoint',
        'https://jsonplaceholder.typicode.com/users/1'
    ];

    let salida = '';

    for (const url of urls) {
        try {
            const response = await fetch(url);
            const status = response.status;
            const statusText = response.statusText;
            const esOk = response.ok ? 'OK' : 'FALLO';

            salida += `[${esOk}] Status: ${status} | Text: "${statusText}" | URL: ${url}\n`;
        } catch (error) {
            salida += `[RED] Error: ${error.message} | URL: ${url}\n`;
        }
    }

    contenedor.textContent = salida;
    console.log(salida);
});
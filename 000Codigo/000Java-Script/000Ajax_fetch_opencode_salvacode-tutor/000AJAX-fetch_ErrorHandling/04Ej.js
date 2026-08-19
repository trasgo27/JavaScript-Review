console.log('=== Inciando Ejercicio 04 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── TASK 1: Fetch a URL que retorne texto plano ──────────────────
hacerEj('TASK 1: Fetch a URL que retorne texto plano', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    console.log('Content-Type:', response.headers.get('content-type'));

    try {
        const data = await response.json();
        console.log('JSON parseado OK:', typeof data, data.title);
    } catch (error) {
        console.log('Esto no deberia fallar porque jsonplaceholder SI retorna JSON');
    }

    const responseTexto = await fetch('https://httpbin.org/html');
    console.log('Content-Type de httpbin/html:', responseTexto.headers.get('content-type'));

    try {
        await responseTexto.json();
        console.log('JSON parse OK (no deberia llegar aqui)');
    } catch (error) {
        console.log('SyntaxError atrapado:', error.constructor.name);
        console.log('Mensaje:', error.message);
        console.log('Esto pasa cuando response.json() encuentra HTML/texto plano');
    }
});

// ─── TASK 2: Capturar SyntaxError de JSON.parse ──────────────────
hacerEj('TASK 2: Capturar SyntaxError de JSON.parse', async () => {
    const textosInvalidos = [
        'Esto no es JSON',
        '{ json incompleto',
        '<html><body>Hola</body></html>',
        '{"key": "value",}',  // trailing comma
        'undefined',
        ''
    ];

    for (const texto of textosInvalidos) {
        try {
            const data = JSON.parse(texto);
            console.log(`Parse OK: "${texto.substring(0, 30)}" →`, data);
        } catch (error) {
            console.log(`Parse FALLO: "${texto.substring(0, 30)}"`);
            console.log(`  Tipo: ${error.constructor.name}`);
            console.log(`  Message: ${error.message.substring(0, 80)}`);
        }
    }
});

// ─── TASK 3: Crear funcion fetchJSON() mejorada que maneje parse errors ──────────────────
hacerEj('TASK 3: fetchJSON() mejorada con manejo de parse errors', async () => {
    async function fetchJSON(url, options = {}) {
        let response;
        try {
            response = await fetch(url, options);
        } catch (error) {
            const err = new Error(`Error de red: ${error.message}`);
            err.code = 'NETWORK_ERROR';
            throw err;
        }

        if (!response.ok) {
            const err = new Error(`HTTP ${response.status} ${response.statusText}`);
            err.status = response.status;
            err.code = 'HTTP_ERROR';
            throw err;
        }

        const contentType = response.headers.get('content-type') || '';
        const texto = await response.text();

        try {
            return JSON.parse(texto);
        } catch (error) {
            const err = new Error(`Respuesta no es JSON valida: ${error.message}`);
            err.code = 'PARSE_ERROR';
            err.rawBody = texto.substring(0, 200);
            err.contentType = contentType;
            throw err;
        }
    }

    try {
        const data = await fetchJSON('https://jsonplaceholder.typicode.com/posts/1');
        console.log('fetchJSON posts/1 OK:', data.title);
    } catch (error) {
        console.log('Error:', error.code, error.message);
    }

    try {
        await fetchJSON('https://httpbin.org/html');
    } catch (error) {
        console.log('fetchJSON httpbin/html FALLO:');
        console.log('  Code:', error.code);
        console.log('  Message:', error.message);
        console.log('  ContentType:', error.contentType);
        console.log('  Body:', error.rawBody);
    }
});

// ─── TASK 4: Crear funcion fetchText(url) para respuestas que NO son JSON ──────────────────
hacerEj('TASK 4: Crear funcion fetchText(url)', async () => {
    async function fetchText(url, options = {}) {
        let response;
        try {
            response = await fetch(url, options);
        } catch (error) {
            const err = new Error(`Error de red: ${error.message}`);
            err.code = 'NETWORK_ERROR';
            throw err;
        }

        if (!response.ok) {
            const err = new Error(`HTTP ${response.status} ${response.statusText}`);
            err.status = response.status;
            err.code = 'HTTP_ERROR';
            throw err;
        }

        const text = await response.text();
        return {
            text,
            contentType: response.headers.get('content-type'),
            status: response.status,
            url: response.url
        };
    }

    const resultado = await fetchText('https://httpbin.org/html');
    console.log('fetchText OK:');
    console.log('  Content-Type:', resultado.contentType);
    console.log('  Status:', resultado.status);
    console.log('  Texto (primeros 100 chars):', resultado.text.substring(0, 100));

    try {
        await fetchText('https://jsonplaceholder.typicode.com/no-existe');
    } catch (error) {
        console.log('fetchText 404:', error.code, error.message);
    }
});

// ─── TASK 5: Wrapper final fetchSmart(url, { expectJson: true }) ──────────────────
hacerEj('TASK 5: Wrapper final fetchSmart()', async () => {
    async function fetchSmart(url, options = {}) {
        const { expectJson = true, ...fetchOptions } = options;

        let response;
        try {
            response = await fetch(url, fetchOptions);
        } catch (error) {
            const err = new Error(`Error de red: ${error.message}`);
            err.code = 'NETWORK_ERROR';
            throw err;
        }

        if (!response.ok) {
            const err = new Error(`HTTP ${response.status} ${response.statusText}`);
            err.status = response.status;
            err.statusText = response.statusText;
            err.code = 'HTTP_ERROR';
            throw err;
        }

        const contentType = response.headers.get('content-type') || '';

        if (expectJson) {
            const texto = await response.text();
            try {
                return { data: JSON.parse(texto), type: 'json', contentType };
            } catch (error) {
                const err = new Error(`Se esperaba JSON pero la respuesta es: ${contentType}`);
                err.code = 'PARSE_ERROR';
                err.rawBody = texto.substring(0, 200);
                err.expectedFormat = 'json';
                err.actualContentType = contentType;
                throw err;
            }
        } else {
            const text = await response.text();
            return { data: text, type: 'text', contentType };
        }
    }

    console.log('--- Caso 1: JSON valido ---');
    try {
        const resultado = await fetchSmart('https://jsonplaceholder.typicode.com/posts/1');
        console.log('Tipo:', resultado.type, '| Titulo:', resultado.data.title);
    } catch (error) {
        console.log('Error:', error.code, error.message);
    }

    console.log('\n--- Caso 2: Se espera JSON, pero viene HTML ---');
    try {
        const resultado = await fetchSmart('https://httpbin.org/html', { expectJson: true });
        console.log('Tipo:', resultado.type);
    } catch (error) {
        console.log('Error:', error.code);
        console.log('Message:', error.message);
        console.log('Expected:', error.expectedFormat);
        console.log('Actual:', error.actualContentType);
    }

    console.log('\n--- Caso 3: Texto plano intencional ---');
    try {
        const resultado = await fetchSmart('https://httpbin.org/html', { expectJson: false });
        console.log('Tipo:', resultado.type, '| Longitud:', resultado.data.length);
    } catch (error) {
        console.log('Error:', error.message);
    }

    console.log('\n--- Caso 4: URL rota ---');
    try {
        await fetchSmart('https://dominio-que-no-existe-abc.com/api');
    } catch (error) {
        console.log('Error:', error.code, error.message);
    }
});
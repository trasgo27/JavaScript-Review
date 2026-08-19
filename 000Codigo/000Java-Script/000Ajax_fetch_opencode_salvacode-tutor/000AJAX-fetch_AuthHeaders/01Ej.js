// 01Ej.js
// Ejercicio 1: Headers personalizados

console.log('=== Inciando Ejercicio 1 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── TASK 1: Header personalizado simple ──────────────────────
hacerEj('Task 1: Header X-Custom-Header', async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
            headers: {
                'X-Custom-Header': 'salvacode'
            }
        });
        const data = await response.json();
        console.log('Header X-Custom-Header enviado. Respuesta:', data.title);
        console.log('Abre DevTools → Network → selecciona la petición → Headers → Request Headers');
    } catch (error) {
        console.error('Error:', error.message);
    }
});

// ─── TASK 2: Header Accept ────────────────────────────────────
hacerEj('Task 2: Header Accept', async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
            headers: {
                'Accept': 'application/json'
            }
        });
        const contentType = response.headers.get('content-type');
        console.log('Content-Type de respuesta:', contentType);
        console.log('Accept enviado: application/json');
    } catch (error) {
        console.error('Error:', error.message);
    }
});

// ─── TASK 3: Múltiples headers ───────────────────────────────
hacerEj('Task 3: Múltiples headers', async () => {
    try {
        const customHeaders = {
            'X-Custom-Header': 'salvacode',
            'Accept': 'application/json',
            'X-Request-Source': 'exercise-01',
            'X-Client-Version': '1.0.0'
        };

        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
            headers: customHeaders
        });
        const data = await response.json();

        const output = document.getElementById('output');
        if (output) {
            output.innerHTML = `
                <h4>Headers enviados:</h4>
                <pre>${JSON.stringify(customHeaders, null, 2)}</pre>
                <h4>Respuesta del servidor:</h4>
                <pre>${JSON.stringify(data, null, 2)}</pre>
            `;
        }

        console.log('Headers enviados:', customHeaders);
        console.log('Respuesta:', data);
    } catch (error) {
        console.error('Error:', error.message);
    }
});

// ─── TASK 4: Inspección en DevTools ──────────────────────────
hacerEj('Task 4: Instrucciones DevTools', () => {
    console.log('=== INSTRUCCIONES PARA VER HEADERS EN DEVTOOLS ===');
    console.log('1. Abre DevTools con F12');
    console.log('2. Ve a la pestaña "Network"');
    console.log('3. Haz clic en el botón de abajo para hacer una petición');
    console.log('4. Click en la petición que aparece en la lista');
    console.log('5. Ve a la pestaña "Headers" dentro de la petición');
    console.log('6. Busca "Request Headers" — ahí verás tus headers custom');
    console.log('================================================');

    const btn = document.getElementById('devtools-btn');
    if (btn) {
        btn.addEventListener('click', async () => {
            await fetch('https://jsonplaceholder.typicode.com/posts/1', {
                headers: { 'X-Custom-Header': 'ver-me-en-devtools' }
            });
            console.log('Petición enviada. ¡Revisa DevTools → Network!');
        });
    }
});

// ─── TASK 5: Función fetchConHeaders ─────────────────────────
hacerEj('Task 5: fetchConHeaders()', async () => {
    const defaultHeaders = {
        'Accept': 'application/json',
        'X-Client': 'salvacode-course'
    };

    function fetchConHeaders(url, customHeaders = {}) {
        return fetch(url, {
            headers: { ...defaultHeaders, ...customHeaders }
        });
    }

    try {
        const response = await fetchConHeaders('https://jsonplaceholder.typicode.com/posts/1', {
            'X-Custom-Header': 'mi-header-extra'
        });
        const data = await response.json();
        console.log('fetchConHeaders funcionó:', data.title);
        console.log('Headers combinados: default + custom');
    } catch (error) {
        console.error('Error:', error.message);
    }
});

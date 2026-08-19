console.log('=== Inciando Ejercicio 01 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── TASK 1: Crear XMLHttpRequest, abrir GET ──────────────────
hacerEj('TASK 1: Crear XMLHttpRequest y abrir GET', () => {
    const xhr = new XMLHttpRequest();
    console.log('XMLHttpRequest creado:', xhr);
    console.log('Estado inicial (readyState):', xhr.readyState);

    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/1');
    console.log('Método y URL abiertos con xhr.open()');
    console.log('Estado después de open (readyState):', xhr.readyState);
});

// ─── TASK 2: Escuchar onload y logear responseText ──────────────────
hacerEj('TASK 2: Escuchar onload y logear responseText', () => {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/1');

        xhr.onload = function () {
            console.log('¡Petición completada con éxito!');
            console.log('Status HTTP:', xhr.status);
            console.log('Status Text:', xhr.statusText);
            console.log('Response Headers:', xhr.getAllResponseHeaders());
            console.log('responseText (crudo):', xhr.responseText);

            const data = JSON.parse(xhr.responseText);
            console.log('Datos parseados:', data);
            resolve();
        };

        xhr.send();
    });
});

// ─── TASK 3: Escuchar onerror y manejar errores de red ──────────────────
hacerEj('TASK 3: Escuchar onerror y manejar errores de red', () => {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://url-que-no-existe-999.com/dato');

        xhr.onerror = function () {
            console.log('Error de red detectado en onerror');
            console.log('Status:', xhr.status);
            console.log('Status Text:', xhr.statusText);
            console.log('Esto ocurre cuando falla la conexión, CORS, DNS, etc.');
            resolve();
        };

        xhr.ontimeout = function () {
            console.log('Timeout detectado');
            resolve();
        };

        xhr.timeout = 5000;
        xhr.send();
    });
});

// ─── TASK 4: Enviar con xhr.send() ──────────────────
hacerEj('TASK 4: Enviar con xhr.send()', () => {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/1');

        console.log('readyState antes de send():', xhr.readyState);

        xhr.onreadystatechange = function () {
            console.log('onreadystatechange disparado — readyState:', xhr.readyState);
            switch (xhr.readyState) {
                case 0: console.log('  → UNSENT:open() no llamado aún'); break;
                case 1: console.log('  → OPENED:open() fue llamado'); break;
                case 2: console.log('  → HEADERS_RECEIVED:headers recibidos'); break;
                case 3: console.log('  → LOADING:descargando body'); break;
                case 4: console.log('  → DONE:operación completa'); break;
            }
        };

        xhr.onload = function () {
            console.log('xhr.send() completado. Status:', xhr.status);
            resolve();
        };

        xhr.send();
        console.log('xhr.send() ejecutado — la petición está en vuelo');
    });
});

// ─── TASK 5: Reescribir con fetch() para comparar ──────────────────
hacerEj('TASK 5: Reescribir con fetch() para comparar', async () => {
    console.log('--- XMLHttpRequest (el viejo camino) ---');
    console.log(`
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
    };
    xhr.onerror = function() { console.error('Error'); };
    xhr.send();
    `);

    console.log('--- fetch() (el nuevo camino) ---');
    console.log(`
    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error'));
    `);

    console.log('--- fetch() con async/await ---');
    console.log(`
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
    `);

    console.log('\nEjecutando con fetch():');
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const data = await response.json();
        console.log('fetch() resultado:', data);
        console.log('\n--- Comparación ---');
        console.log('XMLHttpRequest: más verboso, callback-based, mutable state');
        console.log('fetch(): más limpio, promise-based, composable con async/await');
    } catch (error) {
        console.error('Error con fetch():', error);
    }
});

console.log('=== Inciando Ejercicio 02 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── TASK 1: Fetch GET a /users/1 y logear respuesta cruda ──────────────────
hacerEj('TASK 1: Fetch GET a /users/1 y logear respuesta cruda', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    console.log('Respuesta cruda (objeto Response):', response);
    console.log('Tipo de response:', typeof response);
    console.log('Es instanceof Response:', response instanceof Response);
    console.log('response.url:', response.url);
    console.log('response.type:', response.type);

    const textoCrudo = await response.text();
    console.log('response.text() — cadena cruda (no es JSON):', textoCrudo);
    console.log('Tipo de textoCrudo:', typeof textoCrudo);
});

// ─── TASK 2: Explicar por qué la respuesta NO es JSON directamente ──────────────────
hacerEj('TASK 2: ¿Por qué la respuesta NO es JSON directamente?', () => {
    console.log('fetch() NO retorna JSON directamente porque:');
    console.log('1. fetch() retorna un objeto Response que representa toda la respuesta HTTP');
    console.log('2. La respuesta HTTP puede contener cualquier tipo de contenido:');
    console.log('   - HTML, JSON, XML, texto plano, binario, imágenes, etc.');
    console.log('3. fetch() te da el body como un "ReadableStream" — no lo parsea automáticamente');
    console.log('4. Debes DECIDIR tú cómo leer el body según el Content-Type');
    console.log('');
    console.log('Métodos disponibles para leer el body:');
    console.log('   response.json()   → parsea como JSON');
    console.log('   response.text()   → lee como texto plano');
    console.log('   response.blob()   → lee como Blob (archivos binarios)');
    console.log('   response.arrayBuffer() → lee como ArrayBuffer');
    console.log('   response.formData() → lee como FormData');
    console.log('');
    console.log('Esto es una DIFERENCIA CLAVE con XMLHttpRequest que tenía responseText y responseJSON');
});

// ─── TASK 3: Encadenar .then(r => r.json()) y logear datos ──────────────────
hacerEj('TASK 3: Encadenar .then() y logear datos', async () => {
    console.log('--- Forma con .then() encadenados ---');
    const data1 = await fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(response => {
            console.log('.then(1): Recibido Response, status:', response.status);
            return response.json();
        })
        .then(datos => {
            console.log('.then(2): Datos parseados como JSON');
            return datos;
        });
    console.log('Resultado final (con .then()):', data1);

    console.log('\n--- Forma con async/await ---');
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    console.log('Step 1: Response recibido, status:', response.status);
    const data2 = await response.json();
    console.log('Step 2: JSON parseado');
    console.log('Resultado final (con async/await):', data2);
});

// ─── TASK 4: Comparar .then() vs XMLHttpRequest ──────────────────
hacerEj('TASK 4: Comparar cantidad de .then() vs XMLHttpRequest', () => {
    console.log('--- XMLHttpRequest para GET simple ---');
    console.log(`
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);           // 1. Crear
    xhr.onload = function() {       // 2. Callback onload
        const data = JSON.parse(    // 3. Parsear manualmente
            xhr.responseText        // 4. Obtener texto
        );
        console.log(data);          // 5. Usar
    };
    xhr.onerror = function() { ... };  // 6. Error handler
    xhr.send();                        // 7. Enviar
    `);

    console.log('--- fetch() con .then() ---');
    console.log(`
    fetch(url)                                      // 1. Crear + enviar
        .then(r => r.json())                       // 2. Parsear
        .then(data => console.log(data))           // 3. Usar
        .catch(err => console.error(err));         // 4. Error
    `);

    console.log('--- fetch() con async/await ---');
    console.log(`
    try {                                           // 1. Crear + enviar + parsear + usar
        const r = await fetch(url);
        const data = await r.json();
        console.log(data);
    } catch (err) {                                 // 2. Error
        console.error(err);
    }
    `);

    console.log('Resumen:');
    console.log('XMLHttpRequest: 7 pasos, verboso, callback-based');
    console.log('fetch() .then(): 4 pasos, limpio, promise-based');
    console.log('fetch() async/await: 2 bloques, más legible, estructura try/catch familiar');
    console.log('async/await es la forma moderna recomendada');
});

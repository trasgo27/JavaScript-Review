// 03Ej.js
// Ejercicio 03: POST con XMLHttpRequest

console.log('=== Ejercicio 03: POST con XHR ===');

// ─── TASK 1: Configurar POST ────────────────────────────────
// 💡 Pista: Para hacer un POST con XHR necesitas:
//   1. xhr.open('POST', url)          ← método POST
//   2. xhr.setRequestHeader(...)      ← decirle al server que envías JSON
//   3. xhr.send(JSON.stringify(data))  ← enviar los datos como string

hacerEj('TASK 1 & 2: POST con XHR', () => {

    const datos = {
        title: 'Mi post con XHR',
        body: 'Estoy aprendiendo XMLHttpRequest',
        userId: 1
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts');

    // 💡 Pista: Este header le dice al servidor que envías JSON.
    //   Sin él, el servidor no sabrá cómo interpretar tu body.
    xhr.setRequestHeader('Content-type','application/json; charset=UTF-8')
    // xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    /* Tu código aquí: configurar el header Content-type */

    xhr.onload = function() {
        const respuesta = JSON.parse(xhr.responseText);
        console.log('Post creado con XHR:', respuesta);
        console.log('ID asignado:', respuesta.id);
    };

    xhr.onerror = function() {
        console.error('Error de red');
    };

    // 💡 Pista: No puedes enviar un objeto directamente.
    //   Necesitas convertirlo a string con JSON.stringify():
    //   xhr.send(JSON.stringify(datos));
    /* Tu código aquí: enviar los datos */
    xhr.send(JSON.stringify(datos));

});

// ─── TASK 3: Comparar con fetch ─────────────────────────────
// 💡 Pista: Mira cuántas líneas necesitas con XHR vs fetch.
//   XHR: open → setRequestHeader → onload → send
//   fetch: await fetch(url, options) → await response.json()

hacerEj('TASK 3: Comparar con fetch POST', async () => {

    console.log('\n--- Con XMLHttpRequest: ---');
    console.log('  1. new XMLHttpRequest()');
    console.log('  2. xhr.open("POST", URL)');
    console.log('  3. xhr.setRequestHeader("Content-type", "...")');
    console.log('  4. xhr.onload = function() { ... }');
    console.log('  5. xhr.send(JSON.stringify(data))');
    console.log('  → 5 pasos, más verboso');

    console.log('\n--- Con fetch: ---');
    console.log('  1. await fetch(URL, { method, headers, body })');
    console.log('  2. await response.json()');
    console.log('  → 2 pasos, mucho más limpio');

    console.log('\n✅ Por eso el curso usa fetch() en vez de XHR');
    console.log('   Pero es bueno conocer XHR para entender la evolución.');

});

// ─── Función helper ─────────────────────────────────────────
function hacerEj(taskName, taskFunction) {
    console.log(`\n--- ${taskName} ---`);
    try { taskFunction(); } catch (error) { console.error(`Error:`, error); }
}

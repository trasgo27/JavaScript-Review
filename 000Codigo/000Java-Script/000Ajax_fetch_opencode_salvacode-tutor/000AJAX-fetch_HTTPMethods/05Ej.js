console.log('=== Inciando Ejercicio 05 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── TASK 1: Fetch DELETE a /posts/1 ──────────────────
hacerEj('TASK 1: Fetch DELETE a /posts/1', async () => {
    console.log('Antes de eliminar, verificamos que el post 1 existe:');
    const antesRes = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const antes = await antesRes.json();
    console.log('Post 1 existe:', antes.title);

    console.log('\nEjecutando DELETE a /posts/1...');
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'DELETE'
    });

    console.log('\nRespuesta del DELETE:');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    console.log('response.ok:', response.ok);

    const contentType = response.headers.get('content-type');
    console.log('Content-Type:', contentType);

    if (contentType && contentType.includes('application/json')) {
        const body = await response.json();
        console.log('Body:', body);
    } else {
        const text = await response.text();
        console.log('Body (texto):', text || '(vacío)');
    }
});

// ─── TASK 2: Verificar status 200/204 ──────────────────
hacerEj('TASK 2: Verificar status 200/204', async () => {
    console.log('Códigos de éxito para DELETE:');
    console.log('');
    console.log('200 OK:');
    console.log('  → El recurso fue eliminado');
    console.log('  → Generalmente retorna el recurso eliminado en el body');
    console.log('  → Uso común: "Te muestro lo que borré"');
    console.log('');
    console.log('204 No Content:');
    console.log('  → El recurso fue eliminado');
    console.log('  → NO retorna body (no hay contenido)');
    console.log('  → Uso más común en APIs REST');
    console.log('');

    console.log('Ejecutando DELETE y verificando status:');
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'DELETE'
    });

    console.log('Status code:', response.status);
    console.log('¿Es 200?', response.status === 200 ? '✓ SÍ' : '✗ NO');
    console.log('¿Es 204?', response.status === 204 ? '✓ SÍ' : '✗ NO');

    if (response.ok) {
        console.log('✓ El DELETE fue exitoso (status 2xx)');
    } else {
        console.log('✗ El DELETE falló con status:', response.status);
    }
});

// ─── TASK 3: Confirmar que ya no existe con GET ──────────────────
hacerEj('TASK 3: Confirmar eliminación con GET', async () => {
    console.log('Secuencia completa: DELETE → GET para verificar:');
    console.log('');

    console.log('Paso 1: Verificar que el post 1 existe ANTES del DELETE');
    const antesRes = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    console.log('Status GET antes:', antesRes.status, antesRes.ok ? '(existe)' : '(no existe)');

    console.log('\nPaso 2: Ejecutar DELETE');
    const deleteRes = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'DELETE'
    });
    console.log('Status DELETE:', deleteRes.status);

    console.log('\nPaso 3: Intentar GET al post 1 DESPUÉS del DELETE');
    const despuesRes = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    console.log('Status GET después:', despuesRes.status, despuesRes.ok ? '(existe)' : '(no existe/404)');

    if (despuesRes.status === 404) {
        console.log('✓ Confirmado: el recurso ya no existe (404)');
    } else if (despuesRes.ok) {
        console.log('jsonplaceholder retorna 200 porque es una API mock (simulada)');
        console.log('En un servidor real, un DELETE exitoso haría que el GET retorne 404');
    }

    console.log('\n--- Patrón de eliminación con confirmación ---');
    console.log(`
    async function eliminarYConfirmar(url) {
        const deleteRes = await fetch(url, { method: 'DELETE' });
        if (!deleteRes.ok) throw new Error('Falló el DELETE');

        const getRes = await fetch(url);
        if (getRes.status === 404) {
            console.log('Recurso eliminado exitosamente');
            return true;
        }
        return false;
    }
    `);
});

console.log('=== Inciando Ejercicio 03 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── TASK 1: Fetch PUT a /posts/1 con body completo ──────────────────
hacerEj('TASK 1: Fetch PUT a /posts/1 con body completo', async () => {
    console.log('Primero, obtenemos el recurso ORIGINAL:');
    const originalRes = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const original = await originalRes.json();
    console.log('Original:', original);

    console.log('\nAhora reemplazamos con PUT:');
    const recursoReemplazado = {
        id: 1,
        title: 'Título completamente nuevo',
        body: 'Este es el body reemplazado con PUT. Todos los campos deben estar presentes.',
        userId: 10
    };

    console.log('Body a enviar:', recursoReemplazado);

    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(recursoReemplazado)
    });

    const data = await response.json();
    console.log('\nRespuesta del PUT:', data);
    console.log('Status:', response.status);
});

// ─── TASK 2: Verificar que el objeto fue reemplazado ──────────────────
hacerEj('TASK 2: Verificar que el objeto fue reemplazado', async () => {
    const recursoActualizado = {
        id: 1,
        title: 'Verificación de reemplazo completo',
        body: 'Con PUT, todos los campos del recurso son reemplazados. Si omites un campo, el servidor puedeEliminarlo.',
        userId: 1
    };

    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(recursoActualizado)
    });

    const data = await response.json();
    console.log('Recurso después de PUT:', data);

    console.log('\nVerificación de campos:');
    console.log('  id:', data.id, '(esperado: 1)');
    console.log('  title:', data.title);
    console.log('  body:', data.body);
    console.log('  userId:', data.userId, '(esperado: 1)');

    console.log('\nComparación:');
    console.log('  title ORIGINAL: "sunt aut facere..."');
    console.log('  title DESPUÉS de PUT:', data.title);
    console.log('  → El título fue COMPLETAMENTE reemplazado');
});

// ─── TASK 3: Comparar PUT vs PATCH conceptualmente ──────────────────
hacerEj('TASK 3: Comparar PUT vs PATCH conceptualmente', () => {
    console.log('═══════════════════════════════════════════════════');
    console.log('     PUT vs PATCH — Diferencias conceptuales      ');
    console.log('═══════════════════════════════════════════════════');
    console.log('');
    console.log('PUT (Reemplazo completo):');
    console.log('  → Envías el objeto COMPLETO');
    console.log('  → Todos los campos son reemplazados');
    console.log('  → Si omites un campo, puede ser eliminado');
    console.log('  → Ejemplo:');
    console.log('    PUT /posts/1');
    console.log('    { id: 1, title: "nuevo", body: "nuevo", userId: 1 }');
    console.log('');
    console.log('PATCH (Actualización parcial):');
    console.log('  → Envías SOLO los campos que quieres cambiar');
    console.log('  → Los demás campos se mantienen intactos');
    console.log('  → Más eficiente en ancho de banda');
    console.log('  → Ejemplo:');
    console.log('    PATCH /posts/1');
    console.log('    { title: "solo cambio el título" }');
    console.log('');
    console.log('Analogía:');
    console.log('  PUT = Reemplazar una página entera de un libro');
    console.log('  PATCH = Corregir una errata en una página');
    console.log('');
    console.log('En la práctica:');
    console.log('  PUT es mejor cuando tienes todos los datos del recurso');
    console.log('  PATCH es mejor cuando solo cambias uno o dos campos');
});

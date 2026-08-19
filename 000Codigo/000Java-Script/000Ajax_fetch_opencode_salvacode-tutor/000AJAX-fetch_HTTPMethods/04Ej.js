console.log('=== Inciando Ejercicio 04 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── TASK 1: Fetch PATCH a /posts/1 solo con { title: 'Nuevo título' } ──────────────────
hacerEj('TASK 1: Fetch PATCH — solo enviar { title }', async () => {
    console.log('Estado ORIGINAL del post 1:');
    const originalRes = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const original = await originalRes.json();
    console.log('  id:', original.id);
    console.log('  title:', original.title);
    console.log('  body:', original.body);
    console.log('  userId:', original.userId);

    console.log('\nEnviando PATCH con SOLO el campo title:');
    const patchData = { title: 'Título actualizado con PATCH' };
    console.log('Body:', JSON.stringify(patchData));

    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(patchData)
    });

    const data = await response.json();
    console.log('\nRespuesta después de PATCH:');
    console.log('  id:', data.id);
    console.log('  title:', data.title);
    console.log('  body:', data.body);
    console.log('  userId:', data.userId);
});

// ─── TASK 2: Verificar que solo el título cambió ──────────────────
hacerEj('TASK 2: Verificar que solo el título cambió', async () => {
    const originalRes = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const original = await originalRes.json();

    console.log('Antes del PATCH:');
    console.log('  title:', original.title);
    console.log('  body:', original.body);
    console.log('  userId:', original.userId);

    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ title: 'Solo el título cambió' })
    });

    const data = await response.json();

    console.log('\nDespués del PATCH:');
    console.log('  title:', data.title, '← CAMBIÓ');
    console.log('  body:', data.body, '← SE MANTIENE');
    console.log('  userId:', data.userId, '← SE MANTIENE');

    console.log('\nAnálisis:');
    console.log('  title cambió:', original.title !== data.title ? '✓ SÍ' : '✗ NO');
    console.log('  body se mantuvo:', original.body === data.body ? '✓ SÍ' : '✗ NO');
    console.log('  userId se mantuvo:', original.userId === data.userId ? '✓ SÍ' : '✗ NO');
});

// ─── TASK 3: Mostrar diferencia visual con PUT ──────────────────
hacerEj('TASK 3: Diferencia visual PUT vs PATCH', async () => {
    console.log('══════════════════════════════════════════════════════════════');
    console.log('          DIFERENCIA VISUAL: PUT vs PATCH                     ');
    console.log('══════════════════════════════════════════════════════════════');
    console.log('');
    console.log('Escenario: Quieres cambiar solo el título del post 1');
    console.log('');

    console.log('┌─── PUT (Reemplazo completo) ───────────────────┐');
    console.log('│                                                │');
    console.log('│  fetch("/posts/1", {                           │');
    console.log('│    method: "PUT",                              │');
    console.log('│    body: JSON.stringify({                       │');
    console.log('│      id: 1,           ← debes enviar esto     │');
    console.log('│      title: "nuevo",  ← lo que cambias        │');
    console.log('│      body: "...",     ← debes reenviarlo      │');
    console.log('│      userId: 1        ← debes reenviarlo      │');
    console.log('│    })                                          │');
    console.log('│  })                                            │');
    console.log('│                                                │');
    console.log('│  Envías: 4 campos (160+ bytes)                 │');
    console.log('└────────────────────────────────────────────────┘');
    console.log('');

    console.log('┌─── PATCH (Actualización parcial) ──────────────┐');
    console.log('│                                                │');
    console.log('│  fetch("/posts/1", {                           │');
    console.log('│    method: "PATCH",                            │');
    console.log('│    body: JSON.stringify({                       │');
    console.log('│      title: "nuevo"   ← solo lo que cambias   │');
    console.log('│    })                                          │');
    console.log('│  })                                            │');
    console.log('│                                                │');
    console.log('│  Envías: 1 campo (30 bytes)                    │');
    console.log('└────────────────────────────────────────────────┘');
    console.log('');
    console.log('PATCH es más eficiente cuando solo cambias 1-2 campos');
    console.log('PUT es mejor cuando actualizas el recurso completo');

    console.log('\nDemostración con fetch:');
    const putRes = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
            id: 1,
            title: 'PUT envía todo',
            body: 'body original reenviado',
            userId: 1
        })
    });
    const putData = await putRes.json();
    console.log('\nResultado PUT:', putData);

    const patchRes = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ title: 'PATCH envía solo lo necesario' })
    });
    const patchData = await patchRes.json();
    console.log('Resultado PATCH:', patchData);
});

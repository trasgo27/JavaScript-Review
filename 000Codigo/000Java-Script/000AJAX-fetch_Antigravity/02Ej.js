// 02Ej.js
// Ejercicio 2: POST, PUT y DELETE con Fetch

console.log('=== Inciando Ejercicio 2 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── TASK 1: POST Request ─────────────────────────────────────
hacerEj('Task 1: Crear un nuevo post (POST)', async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                title: 'Mi nuevo post',
                body: 'Este es el contenido de prueba',
                userId: 1,
            }),
        });
        const data = await response.json();
        console.log('Post creado exitosamente:', data);
    } catch (error) {
        console.error('Error creando post:', error);
    }
});

// ─── TASK 2: PUT Request ──────────────────────────────────────
hacerEj('Task 2: Actualizar un post (PUT)', async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                id: 1,
                title: 'Título actualizado',
                body: 'Contenido actualizado',
                userId: 1,
            }),
        });
        const data = await response.json();
        console.log('Post actualizado:', data);
    } catch (error) {
        console.error('Error actualizando post:', error);
    }
});

// ─── TASK 3: DELETE Request ───────────────────────────────────
hacerEj('Task 3: Eliminar un post (DELETE)', async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'DELETE',
        });
        console.log('Status de la respuesta DELETE:', response.status);
        console.log('¿Fue exitoso?:', response.ok);
    } catch (error) {
        console.error('Error eliminando post:', error);
    }
});

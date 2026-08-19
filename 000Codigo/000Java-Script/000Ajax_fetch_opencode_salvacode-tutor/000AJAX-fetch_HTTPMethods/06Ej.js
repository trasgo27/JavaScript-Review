console.log('=== Inciando Ejercicio 06 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

const API_BASE = 'https://jsonplaceholder.typicode.com';

// ─── TASK 1: Crear función crearPost(data) → POST ──────────────────
hacerEj('TASK 1: crearPost(data) → POST', async () => {
    async function crearPost(data) {
        const response = await fetch(`${API_BASE}/posts`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Error al crear post: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    }

    const nuevoPost = await crearPost({
        title: 'Post desde crearPost()',
        body: 'Este post fue creado con la función crearPost usando POST',
        userId: 1
    });

    console.log('Post creado:', nuevoPost);
    console.log('ID asignado:', nuevoPost.id);
});

// ─── TASK 2: Crear función obtenerPost(id) → GET ──────────────────
hacerEj('TASK 2: obtenerPost(id) → GET', async () => {
    async function obtenerPost(id) {
        const response = await fetch(`${API_BASE}/posts/${id}`);

        if (!response.ok) {
            throw new Error(`Error al obtener post: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    }

    const post = await obtenerPost(1);
    console.log('Post obtenido:', post);
    console.log('Título:', post.title);
    console.log('Body:', post.body);
});

// ─── TASK 3: Crear función actualizarPost(id, data) → PUT ──────────────────
hacerEj('TASK 3: actualizarPost(id, data) → PUT', async () => {
    async function actualizarPost(id, data) {
        const response = await fetch(`${API_BASE}/posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Error al actualizar post: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    }

    const postActualizado = await actualizarPost(1, {
        id: 1,
        title: 'Post actualizado con actualizarPost()',
        body: 'Este post fue actualizado completamente con PUT',
        userId: 1
    });

    console.log('Post actualizado:', postActualizado);
});

// ─── TASK 4: Crear función eliminarPost(id) → DELETE ──────────────────
hacerEj('TASK 4: eliminarPost(id) → DELETE', async () => {
    async function eliminarPost(id) {
        const response = await fetch(`${API_BASE}/posts/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar post: ${response.status} ${response.statusText}`);
        }

        return response.status;
    }

    const status = await eliminarPost(1);
    console.log('Post eliminado. Status:', status);
    console.log('El DELETE fue exitoso (status 2xx)');
});

// ─── TASK 5: Encadenar crear → obtener → actualizar → obtener → eliminar ──────────────────
hacerEj('TASK 5: Cadena completa CRUD', async () => {
    async function crearPost(data) {
        const res = await fetch(`${API_BASE}/posts`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error(`POST falló: ${res.status}`);
        return await res.json();
    }

    async function obtenerPost(id) {
        const res = await fetch(`${API_BASE}/posts/${id}`);
        if (!res.ok) throw new Error(`GET falló: ${res.status}`);
        return await res.json();
    }

    async function actualizarPost(id, data) {
        const res = await fetch(`${API_BASE}/posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error(`PUT falló: ${res.status}`);
        return await res.json();
    }

    async function eliminarPost(id) {
        const res = await fetch(`${API_BASE}/posts/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error(`DELETE falló: ${res.status}`);
        return res.status;
    }

    console.log('═══ PASO 1: CREAR ═══');
    const nuevo = await crearPost({
        title: 'Post CRUD',
        body: 'Este post recorre todo el ciclo CRUD',
        userId: 1
    });
    console.log('Creado:', nuevo);
    const postId = nuevo.id;

    console.log('\n═══ PASO 2: OBTENER ═══');
    const obtenido = await obtenerPost(postId);
    console.log('Obtenido:', obtenido);

    console.log('\n═══ PASO 3: ACTUALIZAR ═══');
    const actualizado = await actualizarPost(postId, {
        id: postId,
        title: 'Post CRUD actualizado',
        body: 'El body fue actualizado con PUT',
        userId: 1
    });
    console.log('Actualizado:', actualizado);

    console.log('\n═══ PASO 4: OBTENER DE NUEVO ═══');
    const verificacion = await obtenerPost(postId);
    console.log('Verificación:', verificacion);
    console.log('¿El title cambió?', verificacion.title === 'Post CRUD actualizado' ? '✓ SÍ' : '✗ NO');

    console.log('\n═══ PASO 5: ELIMINAR ═══');
    const statusDelete = await eliminarPost(postId);
    console.log('Eliminado con status:', statusDelete);

    console.log('\n═══ CADENA CRUD COMPLETA ═══');
    console.log('Crear → Obtener → Actualizar → Verificar → Eliminar');
    console.log('✓ Todas las operaciones CRUD completadas exitosamente');
});

// ─── TASK 6: Refactor a async/await con try/catch ──────────────────
hacerEj('TASK 6: Refactor final — async/await con try/catch robusto', async () => {
    const API = 'https://jsonplaceholder.typicode.com/posts';

    async function crearPost(data) {
        const res = await fetch(API, {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error(`POST ${res.status}: ${res.statusText}`);
        return res.json();
    }

    async function obtenerPost(id) {
        const res = await fetch(`${API}/${id}`);
        if (!res.ok) throw new Error(`GET ${res.status}: ${res.statusText}`);
        return res.json();
    }

    async function actualizarPost(id, data) {
        const res = await fetch(`${API}/${id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error(`PUT ${res.status}: ${res.statusText}`);
        return res.json();
    }

    async function eliminarPost(id) {
        const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error(`DELETE ${res.status}: ${res.statusText}`);
        return res.status;
    }

    async function ejecutarCRUD() {
        console.log('Iniciando ciclo CRUD completo con manejo de errores...\n');

        let postId = null;

        try {
            console.log('1️⃣  CREANDO post...');
            const creado = await crearPost({
                title: 'CRUD final con try/catch',
                body: 'Implementación robusta con manejo de errores',
                userId: 1
            });
            postId = creado.id;
            console.log(`   ✓ Creado con id: ${postId}`);

            console.log('\n2️⃣  OBTENIENDO post...');
            const obtenido = await obtenerPost(postId);
            console.log(`   ✓ Obtenido: "${obtenido.title}"`);

            console.log('\n3️⃣  ACTUALIZANDO post...');
            const actualizado = await actualizarPost(postId, {
                id: postId,
                title: 'CRUD final — actualizado',
                body: 'Contenido actualizado con PUT en la cadena CRUD',
                userId: 1
            });
            console.log(`   ✓ Actualizado: "${actualizado.title}"`);

            console.log('\n4️⃣  VERIFICANDO cambio...');
            const verificacion = await obtenerPost(postId);
            const cambio = verificacion.title === 'CRUD final — actualizado';
            console.log(`   ${cambio ? '✓' : '✗'} Cambio verificado: "${verificacion.title}"`);

            console.log('\n5️⃣  ELIMINANDO post...');
            const status = await eliminarPost(postId);
            console.log(`   ✓ Eliminado (status: ${status})`);

            console.log('\n══════════════════════════════════════');
            console.log('  ✅ CRUD COMPLETO EXITOSAMENTE');
            console.log('══════════════════════════════════════');

        } catch (error) {
            console.error('\n❌ Error en la cadena CRUD:', error.message);
            console.error('Stack:', error.stack);

            if (postId) {
                console.log('\nIntentando limpiar: eliminar post parcialmente creado...');
                try {
                    await eliminarPost(postId);
                    console.log('Post de limpieza eliminado');
                } catch (cleanupError) {
                    console.error('Error en limpieza:', cleanupError.message);
                }
            }
        }
    }

    await ejecutarCRUD();
});

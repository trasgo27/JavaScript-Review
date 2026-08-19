console.log('=== Inciando Ejercicio 02 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── TASK 1: Crear objeto { title, body, userId } ──────────────────
hacerEj('TASK 1: Crear objeto para enviar', () => {
    const nuevoPost = {
        title: 'Mi primer post con fetch()',
        body: 'Este es el contenido del post que vamos a crear con una petición POST.',
        userId: 1
    };
    console.log('Objeto a enviar:', nuevoPost);
    console.log('Tipo:', typeof nuevoPost);
    console.log('Keys:', Object.keys(nuevoPost));

    const comoString = JSON.stringify(nuevoPost);
    console.log('\nDespués de JSON.stringify():', comoString);
    console.log('Tipo después de stringify:', typeof comoString);
});

// ─── TASK 2: Fetch POST a /posts con method, headers, body stringify ──────────────────
hacerEj('TASK 2: Fetch POST a /posts', async () => {
    const nuevoPost = {
        title: 'Post creado con fetch POST',
        body: 'Contenido del post creado usando fetch() con método POST.',
        userId: 1
    };

    console.log('Enviando POST a https://jsonplaceholder.typicode.com/posts');
    console.log('Body:', JSON.stringify(nuevoPost));

    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(nuevoPost)
    });

    console.log('\nRespuesta recibida:');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    console.log('response.ok:', response.ok);

    const data = await response.json();
    console.log('\nDatos de respuesta:', data);
    console.log('ID asignado:', data.id);
    console.log('title:', data.title);
    console.log('body:', data.body);
    console.log('userId:', data.userId);
});

// ─── TASK 3: Verificar que devolvió objeto con id ──────────────────
hacerEj('TASK 3: Verificar respuesta con id', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
            title: 'Verificación de id',
            body: 'Este post tiene un id asignado por el servidor.',
            userId: 1
        })
    });

    const data = await response.json();

    console.log('¿Tiene propiedad "id"?', 'id' in data);
    console.log('Tipo de id:', typeof data.id);
    console.log('Valor de id:', data.id);

    if (typeof data.id === 'number' && data.id > 0) {
        console.log('✓ El servidor asignó un id válido al recurso creado');
    } else {
        console.log('✗ Algo salió mal con el id');
    }

    console.log('\nObjeto completo recibido del servidor:');
    console.log(data);
});

// ─── TASK 4: Demostrar error — olvidar JSON.stringify() ──────────────────
hacerEj('TASK 4: Error demo — olvidar JSON.stringify()', async () => {
    const nuevoPost = {
        title: 'Post sin stringify',
        body: 'Este post se envía sin stringify',
        userId: 1
    };

    console.log('Enviando objeto SIN JSON.stringify()...');
    console.log('Lo que se enviaría como body:', nuevoPost);
    console.log('Tipo:', typeof nuevoPost);
    console.log('');
    console.log('¡ERROR! fetch() necesita un string o FormData en body, no un objeto');
    console.log('Sin stringify, el body se convierte a "[object Object]"');
    console.log('');

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: nuevoPost
        });
        const data = await response.json();
        console.log('Respuesta con body sin stringify:', data);
        console.log('Nota: jsonplaceholder lo acepta, pero en un servidor real esto fallaría');
    } catch (error) {
        console.error('Error capturado:', error.message);
    }
});

// ─── TASK 5: Demostrar error — olvidar Content-type header ──────────────────
hacerEj('TASK 5: Error demo — olvidar Content-type header', async () => {
    const nuevoPost = {
        title: 'Post sin Content-type',
        body: 'Este post no tiene el header Content-type',
        userId: 1
    };

    console.log('Enviando SIN header Content-type...');
    console.log('');

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(nuevoPost)
        });

        const data = await response.json();
        console.log('Respuesta sin Content-type:', data);
        console.log('');
        console.log('jsonplaceholder lo acepta de todas formas, pero:');
        console.log('En servidores reales, sin Content-type el servidor no sabe');
        console.log('que el body es JSON y podría rechazarlo con 400 o 415');
        console.log('');
        console.log('SIEMPRE incluye: Content-type: application/json');
    } catch (error) {
        console.error('Error:', error.message);
    }
});

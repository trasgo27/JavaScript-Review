console.log('=== Inciando Ejercicio 01 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── TASK 1: Fetch a URL que falle (dominio inexistente) ──────────────────
hacerEj('TASK 1: Fetch a URL que falle', async () => {
    try {
        const response = await fetch('https://this-domain-does-not-exist-999.com/data');
        console.log('Respuesta recibida (esto no deberia aparecer):', response);
    } catch (error) {
        console.log('¡Error atrapado! Tipo:', error.constructor.name);
        console.log('Mensaje:', error.message);
    }
});

// ─── TASK 2: Capturar TypeError de red en catch ──────────────────
hacerEj('TASK 2: Capturar TypeError de red en catch', async () => {
    const urlsMalas = [
        'https://localhost:99999/no-existe',
        'https://this-is-not-a-real-domain-abc123.xyz/api',
        'http://192.0.2.1/dato'
    ];

    for (const url of urlsMalas) {
        try {
            console.log(`Intentando: ${url}`);
            await fetch(url);
        } catch (error) {
            console.log(`  Tipo de error: ${error.constructor.name}`);
            console.log(`  Mensaje: ${error.message}`);
            console.log(`  Stack: ${error.stack ? error.stack.split('\n')[1] : 'N/A'}`);
        }
    }
});

// ─── TASK 3: Mostrar mensaje amigable en DOM ──────────────────
hacerEj('TASK 3: Mostrar mensaje amigable en DOM', async () => {
    const contenedor = document.createElement('div');
    contenedor.id = 'error-display';
    contenedor.style.cssText = 'margin-top:1rem;padding:1rem;border-radius:8px;font-family:monospace;';
    document.querySelector('.card').appendChild(contenedor);

    try {
        contenedor.textContent = 'Conectando...';
        contenedor.style.background = 'rgba(56,189,248,0.1)';
        contenedor.style.color = '#38bdf8';

        await fetch('https://este-sitio-no-existe-xyz.com/api');
    } catch (error) {
        let mensaje = '';
        if (error instanceof TypeError) {
            if (error.message.includes('Failed to fetch')) {
                mensaje = 'No se pudo conectar al servidor. Verifica tu conexion a internet.';
            } else if (error.message.includes('NetworkError') || error.message.includes('network')) {
                mensaje = 'Error de red detectado. El servidor puede estar caido.';
            } else {
                mensaje = `Error de red: ${error.message}`;
            }
        } else {
            mensaje = `Error inesperado: ${error.message}`;
        }

        contenedor.textContent = `Mensaje amigable: ${mensaje}`;
        contenedor.style.background = 'rgba(239,68,68,0.15)';
        contenedor.style.color = '#f87171';
        console.log('Mensaje mostrado en DOM:', mensaje);
    }
});

// ─── TASK 4: Crear funcion fetchSafe(url) que maneje errores de red ──────────────────
hacerEj('TASK 4: Crear funcion fetchSafe()', async () => {
    async function fetchSafe(url) {
        try {
            const response = await fetch(url);
            return { ok: true, data: response };
        } catch (error) {
            console.log(`fetchSafe captura error para ${url}`);
            let tipo = 'desconocido';
            let sugerencia = 'Intenta de nuevo mas tarde.';

            if (error instanceof TypeError) {
                if (error.message.includes('Failed to fetch')) {
                    tipo = 'conexion';
                    sugerencia = 'No hay conexion a internet o el servidor esta caido.';
                } else {
                    tipo = 'red';
                    sugerencia = 'Error en la capa de red.';
                }
            } else if (error.name === 'AbortError') {
                tipo = 'timeout';
                sugerencia = 'La peticion tardo demasiado.';
            } else {
                tipo = error.name;
            }

            return {
                ok: false,
                error: {
                    tipo,
                    mensaje: error.message,
                    sugerencia
                }
            };
        }
    }

    const resultado1 = await fetchSafe('https://jsonplaceholder.typicode.com/posts/1');
    console.log('fetchSafe URL valida:', resultado1.ok ? 'Exito' : 'Fallo');
    if (resultado1.ok) {
        const datos = await resultado1.data.json();
        console.log('  Datos:', datos.title);
    }

    const resultado2 = await fetchSafe('https://dominio-que-no-existe-999.com/api');
    console.log('fetchSafe URL muerta:', resultado2.ok ? 'Exito' : 'Fallo');
    if (!resultado2.ok) {
        console.log('  Tipo:', resultado2.error.tipo);
        console.log('  Sugerencia:', resultado2.error.sugerencia);
    }
});
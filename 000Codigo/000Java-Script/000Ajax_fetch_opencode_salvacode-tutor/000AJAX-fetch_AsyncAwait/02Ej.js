console.log('=== Inciando Ejercicio 02 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── TASK 1: Crear funcion cargarDatos(url) con async/await ──────────────────
hacerEj('TASK 1: Crear funcion cargarDatos(url)', async () => {
    async function cargarDatos(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }
        return await response.json();
    }

    const datos = await cargarDatos('https://jsonplaceholder.typicode.com/posts/1');
    console.log('cargarDatos OK:', datos.title);
});

// ─── TASK 2: Usar try para peticion exitosa ──────────────────
hacerEj('TASK 2: Usar try para peticion exitosa', async () => {
    async function cargarDatos(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }
        return await response.json();
    }

    try {
        const datos = await cargarDatos('https://jsonplaceholder.typicode.com/users/1');
        console.log('try - Exito! Usuario:', datos.name);
        console.log('try - Email:', datos.email);
    } catch (error) {
        console.error('try - Error:', error.message);
    }
});

// ─── TASK 3: Usar catch para errores de red y HTTP ──────────────────
hacerEj('TASK 3: Usar catch para errores de red y HTTP', async () => {
    async function cargarDatos(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }
        return await response.json();
    }

    console.log('--- Error de red ---');
    try {
        await cargarDatos('https://dominio-que-no-existe-xyz.com/api');
    } catch (error) {
        console.log('catch - Error de red:', error.message);
        console.log('catch - Tipo:', error.constructor.name);
    }

    console.log('--- Error HTTP 404 ---');
    try {
        await cargarDatos('https://jsonplaceholder.typicode.com/posts/99999');
    } catch (error) {
        console.log('catch - Error HTTP:', error.message);
    }

    console.log('--- Error HTTP 404 endpoint inexistente ---');
    try {
        await cargarDatos('https://jsonplaceholder.typicode.com/no-existe');
    } catch (error) {
        console.log('catch - Error HTTP:', error.message);
    }
});

// ─── TASK 4: Usar finally para limpiar loading indicator ──────────────────
hacerEj('TASK 4: Usar finally para limpiar loading indicator', async () => {
    const spinner = document.getElementById('spinner');
    const statusBox = document.getElementById('status-box');

    async function cargarDatos(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }
        return await response.json();
    }

    console.log('Probando finally con URL valida...');
    try {
        spinner.style.display = 'block';
        statusBox.textContent = 'Cargando datos...';
        statusBox.style.background = 'rgba(56,189,248,0.1)';
        statusBox.style.color = '#38bdf8';

        const datos = await cargarDatos('https://jsonplaceholder.typicode.com/posts/1');
        statusBox.textContent = `Exito: ${datos.title}`;
        statusBox.style.color = '#4ade80';
        console.log('finally test - OK:', datos.title);
    } catch (error) {
        statusBox.textContent = `Error: ${error.message}`;
        statusBox.style.color = '#f87171';
        console.error('finally test - Error:', error.message);
    } finally {
        spinner.style.display = 'none';
        console.log('finally ejecutado: spinner ocultado');
    }

    console.log('Probando finally con URL mala...');
    try {
        spinner.style.display = 'block';
        statusBox.textContent = 'Cargando datos...';
        statusBox.style.color = '#38bdf8';

        await cargarDatos('https://dominio-que-no-existe-xyz.com/api');
    } catch (error) {
        statusBox.textContent = `Error: ${error.message}`;
        statusBox.style.color = '#f87171';
        console.error('finally test - Error:', error.message);
    } finally {
        spinner.style.display = 'none';
        console.log('finally ejecutado: spinner ocultado (incluso con error)');
    }
});

// ─── TASK 5: Agregar spinner visual durante carga ──────────────────
hacerEj('TASK 5: Spinner visual con todos los estados', async () => {
    const spinner = document.getElementById('spinner');
    const statusBox = document.getElementById('status-box');

    async function cargarDatosConEstado(url) {
        spinner.style.display = 'block';
        statusBox.textContent = `Conectando a: ${url}`;
        statusBox.style.background = 'rgba(56,189,248,0.1)';
        statusBox.style.color = '#38bdf8';

        try {
            statusBox.textContent = 'Descargando datos...';
            const response = await fetch(url);

            statusBox.textContent = `Status ${response.status} - Parseando respuesta...`;
            if (!response.ok) {
                throw new Error(`HTTP ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            statusBox.textContent = `OK - ${Array.isArray(data) ? data.length + ' items' : '1 item'} recibidos`;
            statusBox.style.background = 'rgba(74,222,128,0.1)';
            statusBox.style.color = '#4ade80';
            return data;
        } catch (error) {
            statusBox.textContent = `FALLO: ${error.message}`;
            statusBox.style.background = 'rgba(248,113,113,0.1)';
            statusBox.style.color = '#f87171';
            throw error;
        } finally {
            spinner.style.display = 'none';
            console.log('Estado final: spinner ocultado');
        }
    }

    await cargarDatosConEstado('https://jsonplaceholder.typicode.com/posts?_limit=3');
    console.log('Estado OK visible en DOM');

    await new Promise(r => setTimeout(r, 1000));

    try {
        await cargarDatosConEstado('https://jsonplaceholder.typicode.com/no-existe');
    } catch (error) {
        console.log('Estado FALL visible en DOM');
    }
});
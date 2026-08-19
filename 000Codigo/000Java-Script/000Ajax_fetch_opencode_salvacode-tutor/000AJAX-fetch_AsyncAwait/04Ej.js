console.log('=== Inciando Ejercicio 04 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── TASK 1: Hacer 3 fetches: 2 validos, 1 con URL rota ──────────────────
hacerEj('TASK 1: 3 fetches — 2 validos, 1 URL rota', async () => {
    console.log('Demostrando por que Promise.all falla con 1 error:');

    try {
        const resultados = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/posts/1').then(r => r.json()),
            fetch('https://jsonplaceholder.typicode.com/users/1').then(r => r.json()),
            fetch('https://dominio-que-no-existe-xyz.com/api').then(r => r.json())
        ]);
        console.log('No deberia llegar aqui');
    } catch (error) {
        console.log('Promise.all fallo COMPLETAMENTE:', error.message);
        console.log('Incluso los 2 requests validos se perdieron.');
        console.log('Esta es la limitacion de Promise.all.');
    }
});

// ─── TASK 2: Usar Promise.allSettled ──────────────────
hacerEj('TASK 2: Promise.allSettled no se detiene con errores', async () => {
    const resultados = await Promise.allSettled([
        fetch('https://jsonplaceholder.typicode.com/posts/1').then(r => r.json()),
        fetch('https://jsonplaceholder.typicode.com/users/1').then(r => r.json()),
        fetch('https://dominio-que-no-existe-xyz.com/api').then(r => r.json())
    ]);

    console.log('Promise.allSettled completado. Resultados:');
    resultados.forEach((resultado, i) => {
        console.log(`  [${i}] status: ${resultado.status}`);
        if (resultado.status === 'fulfilled') {
            console.log(`       value: ${JSON.stringify(resultado.value).substring(0, 80)}...`);
        } else {
            console.log(`       reason: ${resultado.reason.message}`);
        }
    });
});

// ─── TASK 3: Iterar y mostrar cuales ok, cuales fallaron ──────────────────
hacerEj('TASK 3: Iterar resultados y clasificar exitos/fallos', async () => {
    const contenedor = document.getElementById('resultados');

    const urls = [
        { nombre: 'Posts', url: 'https://jsonplaceholder.typicode.com/posts?_limit=3' },
        { nombre: 'Users', url: 'https://jsonplaceholder.typicode.com/users' },
        { nombre: 'URL rota', url: 'https://dominio-que-no-existe-xyz.com/api' },
        { nombre: 'Comments', url: 'https://jsonplaceholder.typicode.com/comments?_limit=5' },
        { nombre: '404 test', url: 'https://jsonplaceholder.typicode.com/no-existe' }
    ];

    const resultados = await Promise.allSettled(
        urls.map(item => fetch(item.url).then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        }))
    );

    let salida = '=== RESULTADOS DE Promise.allSettled ===\n\n';

    let exitos = 0;
    let fallos = 0;

    resultados.forEach((resultado, i) => {
        const nombre = urls[i].nombre;
        if (resultado.status === 'fulfilled') {
            exitos++;
            const datos = resultado.value;
            const conteo = Array.isArray(datos) ? datos.length + ' items' : '1 item';
            salida += `[OK]      ${nombre} — ${conteo}\n`;
        } else {
            fallos++;
            salida += `[FALLO]   ${nombre} — ${resultado.reason.message}\n`;
        }
    });

    salida += `\nResumen: ${exitos} exitos, ${fallos} fallos de ${urls.length} total`;

    console.log(salida);
    contenedor.textContent = salida;
});

// ─── TASK 4: Crear funcion fetchMultiple(urls) ──────────────────
hacerEj('TASK 4: Crear funcion fetchMultiple(urls)', async () => {
    const contenedor = document.getElementById('resultados');

    async function fetchMultiple(urls) {
        const resultados = await Promise.allSettled(
            urls.map(url =>
                fetch(url)
                    .then(r => {
                        if (!r.ok) throw new Error(`HTTP ${r.status} ${r.statusText}`);
                        return r.json();
                    })
            )
        );

        const exitos = [];
        const fallos = [];

        resultados.forEach((resultado, i) => {
            if (resultado.status === 'fulfilled') {
                exitos.push({
                    url: urls[i],
                    data: resultado.value
                });
            } else {
                fallos.push({
                    url: urls[i],
                    error: resultado.reason.message
                });
            }
        });

        return {
            exitos,
            fallos,
            total: urls.length,
            exitosos: exitos.length,
            fallidos: fallos.length,
            todoOk: fallos.length === 0
        };
    }

    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/users/1',
        'https://dominio-que-no-existe-xyz.com/api',
        'https://jsonplaceholder.typicode.com/todos/1',
        'https://jsonplaceholder.typicode.com/albums/1'
    ];

    const resultado = await fetchMultiple(urls);

    let salida = '=== fetchMultiple() RESULTADO ===\n\n';
    salida += `Total: ${resultado.total} | Exitosos: ${resultado.exitosos} | Fallidos: ${resultado.fallidos}\n`;
    salida += `Todo OK: ${resultado.todoOk ? 'SI' : 'NO'}\n\n`;

    salida += 'EXITOS:\n';
    resultado.exitos.forEach(e => {
        const datos = typeof e.data === 'object' ? JSON.stringify(e.data).substring(0, 60) : String(e.data).substring(0, 60);
        salida += `  [OK] ${e.url}\n       ${datos}...\n`;
    });

    salida += '\nFALLOS:\n';
    resultado.fallos.forEach(f => {
        salida += `  [ERR] ${f.url}\n        ${f.error}\n`;
    });

    console.log(salida);
    contenedor.textContent = salida;
});
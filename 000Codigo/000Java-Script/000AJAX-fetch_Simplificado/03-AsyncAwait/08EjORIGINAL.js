console.log('=== Ejercicio 08: AbortController y Retry — Patrones avanzados ===');

// ============================================================
// CONTEXTO 1: AbortController cancela fetch que tarda demasiado.
// CONTEXTO 2: Retry reintenta fetch que falla.
// ============================================================
// 💡 AbortController:
//   const controller = new AbortController();
//   const signal = controller.signal;
//
//   // Cancelar despues de 3 segundos:
//   setTimeout(() => controller.abort(), 3000);
//
//   const resp = await fetch(url, { signal });
//   // Si se cancela, lanza AbortError
//
// 💡 Retry basico:
//   for (let intento = 0; intento < 3; intento++) {
//     try {
//       const resp = await fetch(url);
//       return await resp.json();
//     } catch (e) {
//       console.log('Fallo, reintentando...');
//     }
//   }
//   throw new Error('Todos los reintentos fallaron');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- ${taskName} ---`);
    try { taskFunction(); } catch (error) { console.error(`Error:`, error); }
}

// ============================================================
// TAREA 1: Crear funcion fetchConTimeout
// ============================================================
// 💡 Pista: Usa AbortController para cancelar si el fetch tarda
// mas de X milisegundos.
//
//   async function fetchConTimeout(url, timeout = 3000) {
//     const controller = new AbortController();
//     const signal = controller.signal;
//
//     // Programar cancelacion
//     const timer = setTimeout(() => controller.abort(), timeout);
//
//     try {
//       const resp = await fetch(url, { signal });
//       clearTimeout(timer);
//       return await resp.json();
//     } catch (error) {
//       clearTimeout(timer);
//       if (error.name === 'AbortError') {
//         console.log('Timeout: la peticion tardo demasiado');
//       }
//       throw error;
//     }
//   }

hacerEj('TASK 1: fetchConTimeout', async () => {

    // Tu codigo aqui — completa la funcion:
    async function fetchConTimeout(url, timeout = 3000) {
        const controller = new AbortController();
        const signal = /* Tu codigo aqui */;

        // Programar cancelacion despues de 'timeout' ms
        const timer = setTimeout(() => /* Tu codigo aqui */, timeout);

        try {
            const resp = await fetch(url, /* Tu codigo aqui — pasa signal */);
            clearTimeout(timer);
            return await resp.json();
        } catch (error) {
            clearTimeout(timer);
            if (error.name === 'AbortError') {
                console.log('Timeout: la peticion tardo demasiado');
            }
            throw error;
        }
    }

    // Probar con URL valida y timeout largo
    console.log('Probando URL valida...');
    const usuario = await fetchConTimeout(
        'https://jsonplaceholder.typicode.com/users/1',
        5000
    );
    console.log('Exito:', usuario.name);

});

// ============================================================
// TAREA 2: Probar fetchConTimeout con timeout muy corto
// ============================================================
// 💡 Pista: Si el timeout es muy corto (ej: 1ms), el fetch
// se cancelara antes de completar.
//
//   try {
//     await fetchConTimeout('https://jsonplaceholder.typicode.com/users/1', 1);
//   } catch (e) {
//     console.log('Fallo como esperaba:', e.name);
//   }

hacerEj('TASK 2: Probar timeout corto', async () => {

    async function fetchConTimeout(url, timeout = 3000) {
        const controller = new AbortController();
        const signal = controller.signal;
        const timer = setTimeout(() => controller.abort(), timeout);

        try {
            const resp = await fetch(url, { signal });
            clearTimeout(timer);
            return await resp.json();
        } catch (error) {
            clearTimeout(timer);
            if (error.name === 'AbortError') {
                console.log('Timeout: la peticion tardo demasiado');
            }
            throw error;
        }
    }

    // Tu codigo aqui — intenta con timeout de 1ms (deberia fallar)
    try {
        console.log('Probando con timeout de 1ms (deberia fallar)...');
        const resultado = /* Tu codigo aqui — fetchConTimeout con 1ms */;
        console.log('Inesperado - funciono:', resultado);
    } catch (e) {
        console.log('Fallo como esperaba:', e.name);
    }

});

// ============================================================
// TAREA 3: Crear funcion fetchConReintentos
// ============================================================
// 💡 Pista: Usa un loop for con try/catch para reintentar.
//
//   async function fetchConReintentos(url, maxReintentos = 3) {
//     for (let intento = 1; intento <= maxReintentos; intento++) {
//       try {
//         console.log(`Intento ${intento}/${maxReintentos}...`);
//         const resp = await fetch(url);
//         if (!resp.ok) throw new Error('HTTP ' + resp.status);
//         return await resp.json();
//       } catch (error) {
//         console.log(`Fallo en intento ${intento}:`, error.message);
//         if (intento === maxReintentos) throw error;
//       }
//     }
//   }

hacerEj('TASK 3: fetchConReintentos', async () => {

    // Tu codigo aqui — completa la funcion:
    async function fetchConReintentos(url, maxReintentos = 3) {
        for (/* Tu codigo aqui — inicializacion del loop */) {
            try {
                console.log('Intento ' + /* tu codigo */ + '/' + maxReintentos + '...');
                const resp = await fetch(url);
                if (!resp.ok) throw new Error('HTTP ' + resp.status);
                return await resp.json();
            } catch (error) {
                console.log('Fallo en intento ' + /* tu codigo */ + ':', error.message);
                if (/* tu codigo aqui — es el ultimo intento */) throw error;
            }
        }
    }

    // Probar con URL valida
    console.log('Probando con URL valida:');
    const usuario = await fetchConReintentos(
        'https://jsonplaceholder.typicode.com/users/1'
    );
    console.log('Exito:', usuario.name);

});

// ============================================================
// TAREA 4: Probar fetchConReintentos con URL invalida
// ============================================================
// 💡 Pista: Usa una URL que no existe para ver los reintentos.
//
//   try {
//     await fetchConReintentos('https://jsonplaceholder.typicode.com/NOEXISTE/999');
//   } catch (e) {
//     console.log('Todos los reintentos fallaron:', e.message);
//   }

hacerEj('TASK 4: Probar con URL invalida', async () => {

    async function fetchConReintentos(url, maxReintentos = 3) {
        for (let intento = 1; intento <= maxReintentos; intento++) {
            try {
                console.log('Intento ' + intento + '/' + maxReintentos + '...');
                const resp = await fetch(url);
                if (!resp.ok) throw new Error('HTTP ' + resp.status);
                return await resp.json();
            } catch (error) {
                console.log('Fallo en intento ' + intento + ':', error.message);
                if (intento === maxReintentos) throw error;
            }
        }
    }

    // Tu codigo aqui — intenta con URL invalida
    try {
        console.log('Probando con URL invalida (deberia fallar 3 veces):');
        const resultado = /* Tu codigo aqui — fetchConReintentos con URL invalida */;
        console.log('Inesperado - funciono:', resultado);
    } catch (e) {
        console.log('Todos los reintentos fallaron. Error final:', e.message);
    }

});

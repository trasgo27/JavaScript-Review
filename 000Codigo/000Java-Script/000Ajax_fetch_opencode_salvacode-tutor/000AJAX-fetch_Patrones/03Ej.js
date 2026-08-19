// 03Ej.js
// Ejercicio 3: Retry con backoff exponencial

console.log('=== Inciando Ejercicio 3 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── TASK 1-3: fetchRetry con backoff exponencial ──────────
async function fetchRetry(url, options = {}, maxRetries = 3) {
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Intento ${attempt}/${maxRetries}: ${url}`);
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            console.log(`✅ Éxito en intento ${attempt}`);
            return await response.json();

        } catch (error) {
            lastError = error;
            console.log(`❌ Intento ${attempt} falló: ${error.message}`);

            if (attempt < maxRetries) {
                const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s
                console.log(`⏳ Reintentando en ${delay / 1000}s...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    console.log(`🚫 Todos los ${maxRetries} intentos fallaron`);
    throw new Error(`Todos los ${maxRetries} intentos fallaron. Último error: ${lastError.message}`);
}

// ─── TASK 4: Demostración con DOM ──────────────────────────
hacerEj('Task 1-4: Demostrar fetchRetry', async () => {
    const btn = document.getElementById('retryBtn');
    const output = document.getElementById('output');

    if (btn) {
        btn.addEventListener('click', async () => {
            if (output) output.innerHTML = '<p style="color:#38bdf8;">🔄 Intentando...</p>';

            try {
                // URL válida — debería funcionar
                const data = await fetchRetry('https://jsonplaceholder.typicode.com/posts/1');
                if (output) {
                    output.innerHTML = `
                        <p style="color:lime;">✅ Éxito</p>
                        <p>Título: ${data.title}</p>
                        <p><em>Revisa la consola para ver los logs de reintentos.</em></p>
                    `;
                }
            } catch (error) {
                if (output) {
                    output.innerHTML = `<p style="color:#ff6b6b;">❌ ${error.message}</p>`;
                }
            }
        });
    }

    // Demo con URL que falla
    console.log('=== Demo: URL que falla (3 reintentos) ===');
    try {
        await fetchRetry('https://jsonplaceholder.typicode.com/invalid-url-que-no-existe', {}, 3);
    } catch (error) {
        console.log('Error final:', error.message);
    }
});

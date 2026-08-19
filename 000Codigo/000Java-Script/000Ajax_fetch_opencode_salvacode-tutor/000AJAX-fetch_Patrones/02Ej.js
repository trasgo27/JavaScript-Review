// 02Ej.js
// Ejercicio 2: AbortController — Cancelar peticiones

console.log('=== Inciando Ejercicio 2 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

let currentController = null;

// ─── TASK 1-4: fetchAbort con AbortController ──────────────
function fetchAbort(url) {
    // Cancelar petición anterior si existe
    if (currentController) {
        currentController.abort();
        console.log('Petición anterior cancelada');
    }

    currentController = new AbortController();
    const signal = currentController.signal;

    const output = document.getElementById('output');
    if (output) output.innerHTML = '<p style="color:#38bdf8;">⏳ Petición en curso...</p>';

    return fetch(url, { signal })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log('✅ Petición completada:', data.title || data.name);
            if (output) output.innerHTML = `<p style="color:lime;">✅ Completado: ${JSON.stringify(data).substring(0, 100)}...</p>`;
            currentController = null;
            return data;
        })
        .catch(error => {
            if (error.name === 'AbortError') {
                console.log('🚫 Petición cancelada por el usuario');
                if (output) output.innerHTML = '<p style="color:#ff6b6b;">🚫 Petición cancelada</p>';
            } else {
                console.error('❌ Error:', error.message);
                if (output) output.innerHTML = `<p style="color:#ff6b6b;">❌ Error: ${error.message}</p>`;
            }
            currentController = null;
            throw error;
        });
}

// ─── Botones de control ─────────────────────────────────────
hacerEj('Task 1-4: Demostración AbortController', () => {
    const fetchBtn = document.getElementById('fetchBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    if (fetchBtn) {
        fetchBtn.addEventListener('click', () => {
            console.log('Iniciando petición a API lenta...');
            // Usamos una API que tarda, o simulamos delay
            fetchAbort('https://jsonplaceholder.typicode.com/posts/1?_delay=5');
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if (currentController) {
                currentController.abort();
            } else {
                console.log('No hay petición en curso para cancelar');
            }
        });
    }

    console.log('Botones configurados. Haz clic en "Iniciar Petición" y luego "Cancelar".');
});

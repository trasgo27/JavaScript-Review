// 04Ej.js
// Ejercicio 4: Manejo de 401 Unauthorized

console.log('=== Inciando Ejercicio 4 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── TASK 2: handleAuthError() ──────────────────────────────
function handleAuthError() {
    console.log('⚠️ Sesión expirada / Token inválido');

    // Limpiar token
    localStorage.removeItem('authToken');
    console.log('Token eliminado de localStorage');

    // Mostrar modal
    const modal = document.getElementById('modal-overlay');
    if (modal) {
        modal.style.display = 'flex';
    }

    // Mostrar en output
    const output = document.getElementById('output');
    if (output) {
        output.innerHTML = `
            <p style="color: #ff6b6b; font-weight: bold;">
                ❌ 401 Unauthorized — Sesión expirada. Token limpiado.
            </p>
        `;
    }
}

// ─── TASK 3: fetchInterceptor() ─────────────────────────────
function fetchInterceptor(url, options = {}) {
    // Añadir token si existe
    const stored = localStorage.getItem('authToken');
    if (stored) {
        const { token } = JSON.parse(stored);
        options.headers = {
            ...options.headers,
            'Authorization': token
        };
    }

    return fetch(url, options)
        .then(response => {
            if (response.status === 401) {
                handleAuthError();
                throw new Error('401 Unauthorized');
            }
            return response;
        });
}

// ─── TASK 1: Simular token inválido ─────────────────────────
hacerEj('Task 1: Simular 401 con token inválido', async () => {
    // Forzar token inválido
    localStorage.setItem('authToken', JSON.stringify({
        token: 'bearer_TOKEN_INVALIDO_EXPIRADO',
        timestamp: Date.now() - 999999999,
        expiresAt: Date.now() - 1000 // Ya expiró
    }));

    console.log('Token inválido instalado. Intentando petición...');

    try {
        // Simular detección de 401 (JSONPlaceholder no retorna 401 real)
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const data = await response.json();

        // Simular detección: en un API real, verificarías response.status === 401
        console.log('Respuesta recibida (simularemos 401):');
        console.log('En producción, si status === 401, llamaríamos handleAuthError()');

        // Simular el 401
        console.log('Simulando detección de 401...');
        handleAuthError();
    } catch (error) {
        console.error('Error:', error.message);
    }
});

// ─── TASK 4: Demostrar interceptor ──────────────────────────
hacerEj('Task 4: Demostrar fetchInterceptor()', async () => {
    console.log('fetchInterceptor está listo para usar.');
    console.log('Ejemplo: fetchInterceptor("https://api.example.com/data")');
    console.log('→ Si retorna 401, automáticamente limpia token y muestra modal');

    const output = document.getElementById('output');
    if (output) {
        output.innerHTML += `
            <h4>Interceptor configurado:</h4>
            <pre>
function fetchInterceptor(url, options = {}) {
    // Añade token automáticamente
    // Si recibe 401 → handleAuthError()
    // → Limpia localStorage
    // → Muestra modal de sesión expirada
}
            </pre>
            <p>El interceptor está activo. Cualquier petición que retorne 401 será manejada automáticamente.</p>
        `;
    }
});

// ─── Cerrar modal al hacer click fuera ──────────────────────
document.addEventListener('click', (e) => {
    const modal = document.getElementById('modal-overlay');
    if (modal && e.target === modal) {
        modal.style.display = 'none';
    }
});

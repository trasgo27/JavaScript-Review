// 03Ej.js
// Ejercicio 3: Peticiones autenticadas

console.log('=== Inciando Ejercicio 3 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── Helper: obtener headers de auth ─────────────────────────
function getAuthHeaders() {
    const stored = localStorage.getItem('authToken');
    if (!stored) return null;
    const { token } = JSON.parse(stored);
    return { 'Authorization': token };
}

// ─── TASK 5 (primero): Verificar autenticación ──────────────
hacerEj('Task 4: Verificar autenticación', () => {
    const output = document.getElementById('output');
    const auth = getAuthHeaders();

    if (!auth) {
        if (output) {
            output.innerHTML = `
                <p style="color: #ff6b6b; font-weight: bold;">
                    ❌ No estás autenticado.
                    <a href="02Ej.html" style="color: #38bdf8;">Ve al Ejercicio 02 para hacer login</a>
                </p>
            `;
        }
        console.log('No hay token. Redirige al Ejercicio 02.');
    } else {
        console.log('Token encontrado. Procediendo con peticiones autenticadas.');
    }
});

// ─── TASK 1: fetchAuth con GET ──────────────────────────────
hacerEj('Task 1: fetchAuth GET /users', async () => {
    const auth = getAuthHeaders();
    if (!auth) { console.log('Saltado: sin auth'); return; }

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=3', {
            headers: auth
        });
        const users = await response.json();

        console.log('GET /users con auth:', users.map(u => u.name));
        console.log('Headers enviados:', auth);

        const output = document.getElementById('output');
        if (output) {
            output.innerHTML += `
                <h4>GET /users (con Authorization header)</h4>
                <p>Headers: <code>${JSON.stringify(auth)}</code></p>
                <ul>${users.map(u => `<li>${u.name} — ${u.email}</li>`).join('')}</ul>
            `;
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});

// ─── TASK 2: fetchAuth con POST ─────────────────────────────
hacerEj('Task 2: fetchAuth POST /posts', async () => {
    const auth = getAuthHeaders();
    if (!auth) { console.log('Saltado: sin auth'); return; }

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                ...auth,
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                title: 'Post autenticado',
                body: 'Este post fue creado con token de autorización',
                userId: 1
            })
        });
        const data = await response.json();

        console.log('POST /posts con auth:', data);

        const output = document.getElementById('output');
        if (output) {
            output.innerHTML += `
                <h4>POST /posts (con Authorization header)</h4>
                <p>Headers: <code>${JSON.stringify({ ...auth, 'Content-type': 'application/json; charset=UTF-8' })}</code></p>
                <p>Respuesta: <code>${JSON.stringify(data)}</code></p>
            `;
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});

// ─── TASK 3: fetchAuth wrapper ──────────────────────────────
hacerEj('Task 3: fetchAuth() wrapper function', async () => {
    function fetchAuth(url, options = {}) {
        const auth = getAuthHeaders();
        if (!auth) {
            return Promise.reject(new Error('No autenticado'));
        }

        return fetch(url, {
            ...options,
            headers: {
                ...auth,
                ...options.headers
            }
        });
    }

    console.log('fetchAuth() definida. Ejemplo de uso:');
    console.log('fetchAuth("https://jsonplaceholder.typicode.com/posts/1")');
    console.log('→ Añade Authorization header automáticamente');

    // Demostración
    try {
        const res = await fetchAuth('https://jsonplaceholder.typicode.com/posts/1');
        const post = await res.json();
        console.log('fetchAuth demo:', post.title);
    } catch (error) {
        console.log('fetchAuth error:', error.message);
    }
});

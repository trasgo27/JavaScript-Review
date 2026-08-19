// 02Ej.js
// Ejercicio 2: Simular login con token

console.log('=== Inciando Ejercicio 2 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── TASK 1: Capturar credenciales ──────────────────────────
hacerEj('Task 1: Capturar credenciales del formulario', () => {
    const btn = document.getElementById('loginBtn');
    if (btn) {
        btn.addEventListener('click', () => {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            console.log('Credenciales capturadas:', { username, password });

            if (username && password) {
                simulLogin(username, password);
            } else {
                mostrarStatus('Por favor ingresa usuario y contraseña', 'red');
            }
        });
    }
});

// ─── TASK 2: POST simulado ──────────────────────────────────
function simulLogin(username, password) {
    mostrarStatus('Iniciando sesión...', '#38bdf8');

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(() => {
        // Simular token ficticio (en producción vendría del servidor)
        const mockToken = `bearer_${btoa(username + ':' + Date.now())}_xyz`;
        console.log('Token simulado recibido:', mockToken);

        // ─── TASK 3: Guardar en localStorage ────────────────────
        guardarToken(mockToken);
    })
    .catch(error => {
        mostrarStatus('Error en login: ' + error.message, 'red');
    });
}

// ─── TASK 3: Guardar token con timestamp ─────────────────────
function guardarToken(token) {
    const tokenData = {
        token: token,
        timestamp: Date.now(),
        expiresAt: Date.now() + (60 * 60 * 1000) // 1 hora
    };
    localStorage.setItem('authToken', JSON.stringify(tokenData));
    console.log('Token guardado en localStorage:', tokenData);
    mostrarStatus(`Login exitoso. Token guardado. Expira en 1 hora.`, 'lime');
}

// ─── TASK 4: getAuthHeaders() ───────────────────────────────
function getAuthHeaders() {
    const stored = localStorage.getItem('authToken');
    if (!stored) return {};

    const { token } = JSON.parse(stored);
    return {
        'Authorization': token,
        'Content-type': 'application/json'
    };
}

// ─── TASK 5: isAuthenticated() ──────────────────────────────
function isAuthenticated() {
    const stored = localStorage.getItem('authToken');
    if (!stored) return false;

    const { expiresAt } = JSON.parse(stored);
    return Date.now() < expiresAt;
}

// ─── Verificación al cargar ─────────────────────────────────
hacerEj('Verificación de estado actual', () => {
    const status = document.getElementById('auth-status');
    if (isAuthenticated()) {
        const stored = JSON.parse(localStorage.getItem('authToken'));
        const remaining = Math.round((stored.expiresAt - Date.now()) / 60000);
        mostrarStatus(`Ya estás autenticado. Expira en ${remaining} minutos.`, 'lime');
        console.log('Token actual:', stored.token);
        console.log('Headers que enviarías:', getAuthHeaders());
    } else {
        mostrarStatus('No autenticado. Inicia sesión.', '#ff6b6b');
    }
});

// ─── Utilidad: mostrar estado ────────────────────────────────
function mostrarStatus(msg, color) {
    const status = document.getElementById('auth-status');
    if (status) {
        status.innerHTML = `<p style="color: ${color}; font-weight: bold;">${msg}</p>`;
    }
    console.log('Status:', msg);
}

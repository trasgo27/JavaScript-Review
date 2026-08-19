// 01Ej.js
// Ejercicio 1: AJAX y Fetch API

console.log('=== Inciando Ejercicio 1 ===');

/**
 * Función principal para organizar los ejercicios.
 * @salvacode-tutor: Utiliza esta estructura para separar la lógica de cada tarea.
 */
function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── TASK 1 & 2: Basic GET request & Handling JSON ──────────────────
hacerEj('Task 1 & 2: Fetch Users', () => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(users => {
            console.log('Usuarios obtenidos:', users);
            
            // ─── TASK 3: Display data in DOM ──────────────────────────────
            const container = document.getElementById('users-container');
            if (container) {
                container.innerHTML = '<h4>Lista de Usuarios:</h4><ul>' + 
                    users.map(user => `<li>${user.name} (${user.email})</li>`).join('') + 
                    '</ul>';
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
});

// ─── TASK 4: Error Handling ──────────────────────────────────────────
hacerEj('Task 4: Error Handling', () => {
    fetch('https://jsonplaceholder.typicode.com/invalid-url')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => console.log(data))
        .catch(error => {
            console.log('¡Ups! Ha ocurrido un error al obtener los datos:', error.message);
        });
});

// ─── TASK 5: Async / Await ────────────────────────────────────────────
hacerEj('Task 5: Async / Await', async () => {
    const fetchWithAsync = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Datos obtenidos con async/await (primer usuario):', data[0]);
        } catch (error) {
            console.log('Error usando async/await:', error.message);
        }
    };
    
    // Al ser asíncrono, lo llamamos aquí
    fetchWithAsync();
});

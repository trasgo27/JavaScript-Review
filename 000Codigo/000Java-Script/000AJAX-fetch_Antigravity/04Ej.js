// 04Ej.js
// Ejercicio 4: DOM dinámico con Fetch

console.log('=== Inciando Ejercicio 4 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── TASK 1: Botón para obtener random users ───────────────────
hacerEj('Task 1: Fetch and display Random Users', () => {
    const btn = document.getElementById('fetchUsersBtn');
    const grid = document.getElementById('users-grid');

    if (btn && grid) {
        btn.addEventListener('click', async () => {
            try {
                grid.innerHTML = '<p>Cargando usuarios...</p>';
                const response = await fetch('https://randomuser.me/api/?results=3');
                if (!response.ok) throw new Error('Network error');
                
                const data = await response.json();
                
                grid.innerHTML = data.results.map(user => `
                    <div style="border: 1px solid #ccc; padding: 10px; text-align: center; border-radius: 8px;">
                        <img src="${user.picture.medium}" alt="${user.name.first}" style="border-radius: 50%;">
                        <h4>${user.name.first} ${user.name.last}</h4>
                        <p style="font-size: 0.8em; color: #666;">${user.location.country}</p>
                    </div>
                `).join('');
                
            } catch (error) {
                grid.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
                console.error(error);
            }
        });
    }
});

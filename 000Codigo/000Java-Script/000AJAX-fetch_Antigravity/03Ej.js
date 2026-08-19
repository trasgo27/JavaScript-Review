// 03Ej.js
// Ejercicio 3: Promise.all y peticiones concurrentes

console.log('=== Inciando Ejercicio 3 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── TASK 1: Promise.all ──────────────────────────────────────────
hacerEj('Task 1: Peticiones concurrentes (users & posts)', async () => {
    try {
        const [usersRes, postsRes] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users'),
            fetch('https://jsonplaceholder.typicode.com/posts')
        ]);
        
        const users = await usersRes.json();
        const posts = await postsRes.json();
        
        console.log(`Carga completa: ${users.length} usuarios y ${posts.length} posts obtenidos.`);
    } catch (error) {
        console.error('Error en Promise.all:', error);
    }
});

// ─── TASK 2: Promise.allSettled ───────────────────────────────────
hacerEj('Task 2: Manejar fallos parciales con allSettled', async () => {
    try {
        const urls = [
            'https://jsonplaceholder.typicode.com/users/1',
            'https://jsonplaceholder.typicode.com/invalid-url' // This will fail 404
        ];
        
        const requests = urls.map(url => fetch(url).then(res => {
            if(!res.ok) throw new Error(`Status ${res.status}`);
            return res.json();
        }));
        
        const results = await Promise.allSettled(requests);
        
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`Request ${index + 1} exitoso:`, result.value.name);
            } else {
                console.log(`Request ${index + 1} falló:`, result.reason.message);
            }
        });
    } catch (error) {
        console.error('Error catastrófico (no debería ocurrir con allSettled):', error);
    }
});

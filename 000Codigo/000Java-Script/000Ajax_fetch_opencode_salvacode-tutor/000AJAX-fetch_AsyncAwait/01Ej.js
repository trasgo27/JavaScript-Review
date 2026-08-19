console.log('=== Inciando Ejercicio 01 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── TASK 1: Version .then(): fetch users -> then -> then -> log ──────────────────
hacerEj('TASK 1: Version .then() de fetch users', () => {
    console.log('--- Codigo con .then() ---');
    console.log(`
fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(response => {
        console.log('Status:', response.status);
        return response.json();
    })
    .then(usuario => {
        console.log('Usuario:', usuario.name);
        console.log('Email:', usuario.email);
        return fetch(\`https://jsonplaceholder.typicode.com/posts?userId=\${usuario.id}\`);
    })
    .then(response => response.json())
    .then(posts => {
        console.log('Posts del usuario:', posts.length);
    })
    .catch(error => console.error('Error:', error));
    `);

    return fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(response => {
            console.log('Status:', response.status);
            return response.json();
        })
        .then(usuario => {
            console.log('Usuario:', usuario.name);
            console.log('Email:', usuario.email);
            return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${usuario.id}`);
        })
        .then(response => response.json())
        .then(posts => {
            console.log('Posts del usuario:', posts.length);
        })
        .catch(error => console.error('Error:', error));
});

// ─── TASK 2: Reescribir con async/await ──────────────────
hacerEj('TASK 2: Reescribir con async/await', async () => {
    console.log('--- Codigo con async/await ---');
    console.log(`
async function obtenerDatos() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    console.log('Status:', response.status);
    const usuario = await response.json();
    console.log('Usuario:', usuario.name);
    console.log('Email:', usuario.email);
    const postsRes = await fetch(\`https://jsonplaceholder.typicode.com/posts?userId=\${usuario.id}\`);
    const posts = await postsRes.json();
    console.log('Posts del usuario:', posts.length);
}
obtenerDatos().catch(console.error);
    `);

    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    console.log('Status:', response.status);
    const usuario = await response.json();
    console.log('Usuario:', usuario.name);
    console.log('Email:', usuario.email);
    const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${usuario.id}`);
    const posts = await postsRes.json();
    console.log('Posts del usuario:', posts.length);
});

// ─── TASK 3: Comparar legibilidad lado a lado ──────────────────
hacerEj('TASK 3: Comparar legibilidad lado a lado', async () => {
    console.log('=== COMPARACION .then() vs async/await ===');
    console.log('');
    console.log('.then() — anidacion visual, flechas, return implicito:');
    console.log('  fetch(url1).then(r => r.json())');
    console.log('    .then(data => fetch(url2))');
    console.log('      .then(r => r.json())');
    console.log('        .then(final => console.log(final))');
    console.log('        .catch(err => ...)');
    console.log('');
    console.log('async/await — se lee como codigo sincrono:');
    console.log('  const r1 = await fetch(url1);');
    console.log('  const data = await r1.json();');
    console.log('  const r2 = await fetch(url2);');
    console.log('  const final = await r2.json();');
    console.log('  console.log(final);');
    console.log('');
    console.log('Ventajas de async/await:');
    console.log('  1. Sin anidacion de .then()');
    console.log('  2. Variables con scope normal (const, let)');
    console.log('  3. try/catch nativo en vez de .catch()');
    console.log('  4. Mas facil de depurar (breakpoints funcionan)');
    console.log('  5. Mas legible para quien lee el codigo');
    console.log('');
    console.log('Ventajas de .then():');
    console.log('  1. No necesita async/await');
    console.log('  2. Funciona en contexto sin async');
    console.log('  3. Composicion funcional (Promise.all, etc.)');
});

// ─── TASK 4: Mostrar misma funcion en ambos estilos ──────────────────
hacerEj('TASK 4: Misma funcion en ambos estilos', async () => {
    async function obtenerPerfilCompleto(userId) {
        const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!userRes.ok) throw new Error(`Usuario no encontrado: ${userRes.status}`);
        const user = await userRes.json();

        const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (!postsRes.ok) throw new Error(`Posts no encontrados: ${postsRes.status}`);
        const posts = await postsRes.json();

        const todosRes = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
        if (!todosRes.ok) throw new Error(`Todos no encontrados: ${todosRes.status}`);
        const todos = await todosRes.json();

        return {
            nombre: user.name,
            email: user.email,
            posts: posts.length,
            todosCompletados: todos.filter(t => t.completed).length,
            todosTotal: todos.length
        };
    }

    const perfil = await obtenerPerfilCompleto(1);
    console.log('Perfil completo (async/await):', perfil);

    function obtenerPerfilCompletoThen(userId) {
        let userData;
        return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then(r => { if (!r.ok) throw new Error(`Usuario: ${r.status}`); return r.json(); })
            .then(user => {
                userData = user;
                return Promise.all([
                    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then(r => r.json()),
                    fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`).then(r => r.json())
                ]);
            })
            .then(([posts, todos]) => ({
                nombre: userData.name,
                email: userData.email,
                posts: posts.length,
                todosCompletados: todos.filter(t => t.completed).length,
                todosTotal: todos.length
            }));
    }

    const perfilThen = await obtenerPerfilCompletoThen(2);
    console.log('Perfil completo (.then()):', perfilThen);

    console.log('Ambas funciones producen el mismo resultado.');
    console.log('La version async/await es mas facil de leer y mantener.');
});
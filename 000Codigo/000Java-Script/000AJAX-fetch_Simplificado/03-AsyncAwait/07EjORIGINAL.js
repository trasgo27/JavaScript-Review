console.log('=== Ejercicio 07: Async iterators — for await...of ===');

// ============================================================
// CONTEXTO: for await...of te permite iterar sobre un array
// de promesas de forma secuencial, esperando cada una.
// ============================================================
// 💡 Patron basico:
//   const urls = [url1, url2, url3];
//   for (const url of urls) {
//     const resp = await fetch(url);
//     const data = await resp.json();
//     console.log(data);
//   }
//
// Esto es SECUENCIAL: espera a que termine cada fetch
// antes de empezar el siguiente. Util cuando el orden importa.

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- ${taskName} ---`);
    try { taskFunction(); } catch (error) { console.error(`Error:`, error); }
}

// ============================================================
// TAREA 1: Crear array de URLs de usuarios
// ============================================================
// 💡 Pista: Crea un array con 3 URLs:
//
//   const urls = [
//     'https://jsonplaceholder.typicode.com/users/1',
//     'https://jsonplaceholder.typicode.com/users/2',
//     'https://jsonplaceholder.typicode.com/users/3'
//   ];

hacerEj('TASK 1: Array de URLs', async () => {

    // Tu codigo aqui:
   const urls = [
     'https://jsonplaceholder.typicode.com/users/1',
     'https://jsonplaceholder.typicode.com/users/2',
     'https://jsonplaceholder.typicode.com/users/3'
   ];
    console.log('URLs a iterar:', urls.length);

});

// ============================================================
// TAREA 2: Iterar con for...of (sin await en el loop)
// ============================================================
// 💡 Pista: for...of normal NO espera promesas.
// Solo muestra que cada fetch retorna una promesa pendiente.
//
//   for (const url of urls) {
//     const promesa = fetch(url);  // Esto es una Promesa!
//     console.log('Promesa:', promesa);  // Promise {<pending>}
//   }

hacerEj('TASK 2: for...of sin await', async () => {
//Codigo AQUÍ
    // Tu codigo aqui:
    const urls = [
        /* Tu codigo aqui — 3 URLs de usuarios */
    ];
    console.log('Iterando con for...of SIN await:');
    for (const url of urls) {
        // Tu codigo aqui — haz fetch SIN await
        const promesa = /* Tu codigo aqui — solo fetch, sin await */;
        console.log(url, '->', promesa);  // Veras Promise {<pending>}
    }

});

// ============================================================
// TAREA 3: Iterar con for...of Y await (secuencial)
// ============================================================
// 💡 Pista: Agrega await para que cada fetch termine antes
// de empezar el siguiente.
//
//   for (const url of urls) {
//     const resp = await fetch(url);   // Espera a que responda
//     const data = await resp.json();  // Espera a que convierta
//     console.log(data.name);
//   }

hacerEj('TASK 3: for...of CON await', async () => {

    const urls = [
        'https://jsonplaceholder.typicode.com/users/1',
        'https://jsonplaceholder.typicode.com/users/2',
        'https://jsonplaceholder.typicode.com/users/3'
    ];

    console.log('Iterando con for...of CON await (secuencial):');
    for (const url of urls) {
        // Tu codigo aqui — fetch CON await
        const resp = /* Tu codigo aqui — await fetch(url) */;
        const usuario = /* Tu codigo aqui — await resp.json() */;
        console.log('Usuario:', usuario.name);
    }

});

// ============================================================
// TAREA 4: Acumular resultados en un array
// ============================================================
// 💡 Pista: Crea un array vacio antes del loop y pushea cada resultado.
//
//   const usuarios = [];
//   for (const url of urls) {
//     const resp = await fetch(url);
//     const data = await resp.json();
//     usuarios.push(data);
//   }
//   console.log('Total usuarios:', usuarios.length);

hacerEj('TASK 4: Acumular resultados', async () => {

    const urls = [
        'https://jsonplaceholder.typicode.com/users/1',
        'https://jsonplaceholder.typicode.com/users/2',
        'https://jsonplaceholder.typicode.com/users/3'
    ];

    // Tu codigo aqui — crea array vacio
    const usuarios = [];

    for (const url of urls) {
        const resp = await fetch(url);
        const usuario = await resp.json();
        // Tu codigo aqui — agregar al array
    }

    console.log('=== Todos los usuarios ===');
    console.log('Total:', usuarios.length);
    usuarios.forEach(u => console.log('-', u.name, '(' + u.email + ')'));

});

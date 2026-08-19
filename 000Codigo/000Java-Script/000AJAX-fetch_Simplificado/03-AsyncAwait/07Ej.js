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

// Creamos un array con las URLs de la API de ejemplo
// Cada URL apunta a un usuario diferente en jsonplaceholder
const urls = [
        'https://jsonplaceholder.typicode.com/users/1',
        'https://jsonplaceholder.typicode.com/users/2',
        'https://jsonplaceholder.typicode.com/users/3'
    ];

    // Mostramos cuantas URLs tenemos para iterar
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

    const urls = [
        'https://jsonplaceholder.typicode.com/users/1',
        'https://jsonplaceholder.typicode.com/users/2',
        'https://jsonplaceholder.typicode.com/users/3'
    ];

    console.log('Iterando con for...of SIN await:');
    // IMPORTANTE: Sin await, fetch() retorna una PROMESA inmediatamente
    // La promesa esta en estado "pending" (pendiente) porque la peticion
    // HTTP aun no ha completado
    for (const url of urls) {
        // fetch() retorna una Promise, no los datos directamente
        const promesa = fetch(url);
        // Imprimimos la promesa - veras "Promise {<pending>}"
        // Esto demuestra que fetch() es ASINCRONO
        console.log(url, '->', promesa);  // Veras Promise {<pending>}
    }
    // RESUMEN: Sin await, las 3 peticiones se lanzan casi al mismo tiempo
    // pero no esperamos a que terminen. Solo vemos las promesas pendientes.
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
        // CON await: cada iteracion ESPERA a que termine la peticion
        // fetch() retorna una Promise, pero await la "resuelve"
        const resp = await fetch(url); 
        // .json() TAMBIEN es asincrono - retorna otra Promise
        // Por eso necesitamos otro await para obtener los datos
        const usuario = await resp.json();
        console.log('Usuario:', usuario.name);
    }
    // RESUMEN: Con await, el loop es SECUENCIAL:
    // 1. Espera fetch usuario 1 -> obtiene datos -> imprime
    // 2. Luego fetch usuario 2 -> obtiene datos -> imprime
    // 3. Luego fetch usuario 3 -> obtiene datos -> imprime
    // Esto es mas lento que paralelo, pero garantiza el ORDEN.

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

    // En esta tarea guardamos todos los usuarios en un array
    // Esto es util cuando necesitamos procesar todos los datos despues

    // PRIMER EJEMPLO: Usando push() y viendo el contador
    const usuarios4 = [];
    // Iteramos sobre cada URL del array
    for(const una of urls){
        // fetch() retorna una Promise - await la resuelve
        const respuesta = await fetch(una);
        // .json() tambien retorna una Promise - await la resuelve
        // Esto convierte la respuesta HTTP en un objeto JavaScript
        const usua = await respuesta.json();
        // push() agrega el usuario al array y retorna el NUEVO largo
        // Ejemplo: si habia 0 elementos, push retorna 1 (el nuevo largo)
        let contador = 0;
        contador = usuarios4.push(usua);
        console.log ('Contador: ', contador); // Muestra el largo actual del array
    }
    // Mostramos cada usuario usando forEach
    usuarios4.forEach(u=>
        console.log('Nombre: ',u.name, ' email( ',u.email, ' )')
    );

    // SEGUNDO EJEMPLO: Version mas limpia del mismo codigo
    const usuarios = [];
 
    for (const url of urls) {
        // Mismo patron: fetch + await, json() + await
        const resp = await fetch(url);
        const usuario = await resp.json();
        const contador = usuarios.push(usuario);
        console.log(contador); // Cada push retorna el nuevo largo
    }

    console.log('=== Todos los usuarios ===');
    console.log('Total:', usuarios.length); // Deberia ser 3
    // forEach itera sobre cada elemento del array
    usuarios.forEach(u => console.log('-' + u.name, '(' + u.email + ')'));
    // RESUMEN: Acumular en un array es patron comun cuando:
    // 1. Necesitas guardar multiples resultados
    // 2. Quieres procesar todos los datos despues del loop
    // 3. Necesitas saber cuantos resultados obtuviste

});

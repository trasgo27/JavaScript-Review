console.log('=== Ejercicio 06: Promise.allSettled — Exitos y fallos parciales ===');

// ============================================================
// CONTEXTO: Promise.all FALLA si UNA sola promesa falla.
// Promise.allSettled NUNCA falla — retorna el estado de cada promesa.
// ============================================================
// 💡 Patron basico:
//   const resultados = await Promise.allSettled([
//     fetch(url1), fetch(url2), fetch(url3)
//   ]);
//
//   resultados.forEach(r => {
//     if (r.status === 'fulfilled') {
//       console.log('Exito:', r.value);
//     } else {
//       console.log('Fallo:', r.reason);
//     }
//   });

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- ${taskName} ---`);
    try { taskFunction(); } catch (error) { console.error(`Error:`, error); }
}

// ============================================================
// TAREA 1: Intentar obtener datos de varios usuarios
// ============================================================
// 💡 Pista: Crea un array con 4 URLs — 3 validas y 1 invalida:
//
//   const urls = [
//     'https://jsonplaceholder.typicode.com/users/1',  // valid
//     'https://jsonplaceholder.typicode.com/users/2',  // valid
//     'https://jsonplaceholder.typicode.com/users/3',  // valid
//     'https://jsonplaceholder.typicode.com/users/999' // invalid (404)
//   ];
//
// Nota: La API de jsonplaceholder SIEMPRE responde 200,
// pero si cambias a otra API real, userId=999 podria fallar.

hacerEj('TASK 1: Crear array de URLs', async () => {

    // Tu codigo aqui:
    
    const peticiones1 = await Promise.allSettled([
        fetch('https://jsonplaceholder.typicode.com/users/1'),
        fetch('https://jsonplaceholder.typicode.com/users/2'),
        fetch('https://jsonplaceholder.typicode.com/users/3'),
        fetch('https://jsonplaceholder.typicode.com/users/999')
    ]);
    /*const urls = await Promise.allSettled(
        peticiones1[0].json(),
        peticiones1[1].json(),
        peticiones1[2].json(),
        peticiones1[3].json()
    );*/
    console.log('Peticiones: ', peticiones1)
    /*console.log('URLs:', urls);*/

});

// ============================================================
// TAREA 2: Usar Promise.allSettled
// ============================================================
// 💡 Pista: Promise.allSettled retorna un array de objetos con:
//   { status: 'fulfilled', value: respuesta }  — si fue exitoso
//   { status: 'rejected', reason: error }      — si fallo
//
//   const resultados = await Promise.allSettled(
//     urls.map(url => fetch(url))
//   );
//   console.log(resultados);

hacerEj('TASK 2: Promise.allSettled', async () => {

    const urls = [
        'https://jsonplaceholder.typicode.com/users/1',
        'https://jsonplaceholder.typicode.com/users/2',
        'https://jsonplaceholder.typicode.com/users/3',
        'https://jsonplaceholder.typicode.com/users/999'
    ];

    // Tu codigo aqui:
    /*const resultados = await Promise.allSettled([
        fetch('https://jsonplaceholder.typicode.com/users/1'),
        fetch('https://jsonplaceholder.typicode.com/users/2'),
        fetch('https://jsonplaceholder.typicode.com/users/3'),
        fetch('https://jsonplaceholder.typicode.com/users/999')
    ]);*/
    console.log('URLs Iniciales: ', urls);
    /*console.log('Resultados: ', resultados);*/
    const resultados10 = await Promise.allSettled(
        urls.map((url)=>fetch(url))
    );
    console.log('Resultados crudos:', resultados10); //Duda sale undefined

});

// ============================================================
// TAREA 3: Contar exitos y fallos
// ============================================================
// 💡 Pista: Recorre el array de resultados y cuenta:
//
//   let exitos = 0;
//   let fallos = 0;
//   resultados.forEach(r => {
//     if (r.status === 'fulfilled') exitos++;
//     else fallos++;
//   });
//   console.log('Exitos:', exitos, '| Fallos:', fallos);

hacerEj('TASK 3: Contar exitos y fallos', async () => {

    const urls = [
        'https://jsonplaceholder.typicode.com/users/1',
        'https://jsonplaceholder.typicode.com/users/2',
        'https://jsonplaceholder.typicode.com/users/3',
        'https://jsonplaceholder.typicode.com/users/999'
    ];

    const resultados = await Promise.allSettled(
        urls.map(url => fetch(url))
    );

    // Tu codigo aqui:
    let exitos = 0;
    let fallos = 0;
    for (const result of resultados){
        (result.status ==='fulfilled')?exitos ++:fallos++;
    }
    // Recorre resultados y cuenta exitos/fallos


    console.log('Exitos:', exitos, '| Fallos:', fallos); //Mal Exitos: 3 | Fallos: 1

});

// ============================================================
// TAREA 4: Mostrar solo usuarios exitosos
// ============================================================
// 💡 Pista: Filtra los resultados fulfilled y convierte a JSON:
//
//   const exitosos = resultados
//     .filter(r => r.status === 'fulfilled')
//     .map(r => r.value);  // value ya es la Response
//
//   // Luego convertir cada Response a JSON:
//   const usuarios = await Promise.all(
//     exitosos.map(resp => resp.json())
//   );
//
//   usuarios.forEach(u => console.log(u.name));

hacerEj('TASK 4: Usuarios exitosos', async () => {

    const urls = [
        'https://jsonplaceholder.typicode.com/users/1',
        'https://jsonplaceholder.typicode.com/users/2',
        'https://jsonplaceholder.typicode.com/users/3',
        'https://jsonplaceholder.typicode.com/users/999'
    ];

    // Paso 1: Fetch y filtrar exitosos
    const resultados = await Promise.allSettled(
        urls.map((url) => fetch(url))
    );

    // Extraer URLs exitosas
    const urlsExitosas = resultados
        .filter((r) => r.status === 'fulfilled')
        .map((r) => r.value.url);

    console.log('URLs exitosas:', urlsExitosas);

    // Paso 2: Re-fetch solo las URLs exitosas para obtener JSON
    const usuarios = await Promise.all(
        urlsExitosas.map((url) => fetch(url).then((r) => r.json()))
    );

    console.log('=== Usuarios exitosos ===');
    usuarios.forEach((u) => console.log(u.name));
});

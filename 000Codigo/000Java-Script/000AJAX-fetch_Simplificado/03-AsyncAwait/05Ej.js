console.log('=== Ejercicio 05: Promise.all — Multiples fetch en paralelo ===');

// ============================================================
// CONTEXTO: Promise.all permite ejecutar multiples fetch
// simultáneamente y esperar a que TODOS terminen.
// ============================================================
// 💡 Patron basico:
//   const [res1, res2, res3] = await Promise.all([
//     fetch(url1),
//     fetch(url2),
//     fetch(url3)
//   ]);
//   const [data1, data2, data3] = await Promise.all([
//     res1.json(),
//     res2.json(),
//     res3.json()
//   ]);
//
// Esto es mucho mas rapido que hacer fetch secuencialmente.

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- ${taskName} ---`);
    try { taskFunction(); } catch (error) { console.error(`Error:`, error); }
}

// ============================================================
// TAREA 1: Obtener usuario con id=1
// ============================================================
// 💡 Pista: Usa await fetch con la URL de usuarios
//   const resp = await fetch('https://jsonplaceholder.typicode.com/users/1');
//   const usuario = await resp.json();

hacerEj('TASK 1: Obtener usuario', async () => {

    // Tu codigo aqui:
    const respuestaU =   await fetch('https://jsonplaceholder.typicode.com/users/1');
    const usuario   =   await respuestaU.json();
    console.log('Usuario: ', usuario.name);

});

// ============================================================
// TAREA 2: Obtener posts del usuario con id=1
// ============================================================
// 💡 Pista: Filtro por userId en query string
//   const resp = await fetch('https://jsonplaceholder.typicode.com/posts?userId=1');
//   const posts = await resp.json();

hacerEj('TASK 2: Obtener posts', async () => {

    // Tu codigo aqui:
    const respuestaP = await fetch('https://jsonplaceholder.typicode.com/posts?userId=1');
    const posts     = await respuestaP.json();
    console.log('Posts:', posts.length, 'publicaciones');

});

// ============================================================
// TAREA 3: Obtener albums del usuario con id=1
// ============================================================
// 💡 Pista: Mismo patron que Tarea 2 pero con albums
//   const resp = await fetch('https://jsonplaceholder.typicode.com/albums?userId=1');
//   const albums = await resp.json();

hacerEj('TASK 3: Obtener albums', async () => {

    // Tu codigo aqui:
    const respuesta =  await fetch('https://jsonplaceholder.typicode.com/albums?userId=1');
    const albums    =  await respuesta.json();
    console.log('Albums:', albums.length, 'albumes');

});

// ============================================================
// TAREA 4: Usar Promise.all para ejecutar los 3 fetch en paralelo
// ============================================================
// 💡 Pista: Promise.all recibe un array de promesas y retorna
// un array con los resultados en el mismo orden.
//
//   const [respUsuario, respPosts, respAlbums] = await Promise.all([
//     fetch('https://jsonplaceholder.typicode.com/users/1'),
//     fetch('https://jsonplaceholder.typicode.com/posts?userId=1'),
//     fetch('https://jsonplaceholder.typicode.com/albums?userId=1')
//   ]);
//
//   const [usuario, posts, albums] = await Promise.all([
//     respUsuario.json(),
//     respPosts.json(),
//     respAlbums.json()
//   ]);

hacerEj('TASK 4: Promise.all en paralelo', async () => {

    // Tu codigo aqui:
    // Paso 1: Lanza los 3 fetch simultaneamente
     /* Tu codigo aqui */;
    const [respUsuario, respPosts, respAlbums] = 
    await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users/1'),
        fetch('https://jsonplaceholder.typicode.com/posts?userId=1'),
        fetch('https://jsonplaceholder.typicode.com/albums?userId=1')
   ]);

    // Paso 2: Convierte todos a JSON
    /* Tu codigo aqui */
    
    //const [usuario, posts, albums] 
        const [usuario, posts, albums]  = 
        await Promise.all([
        respUsuario.json(), 
        respPosts.json(), 
        respAlbums.json()
    ]);
       console.log('=== RESUMEN ===');
       console.log('Usuario:', usuario);
       console.log('Posts:', posts.length);
       console.log('Albums:', albums.length);
       console.log('✅ Promise.all completado!');

});

// ============================================================
// TAREA 5: Mostrar resumen final
// ============================================================
// 💡 Pista: Accede a las variables de la tarea anterior
// y muestra un resumen formateado.
//
//   console.log('=== RESUMEN ===');
//   console.log('Usuario:', usuario.name);
//   console.log('Posts:', posts.length);
//   console.log('Albums:', albums.length);



hacerEj('TASK 5: Resumen', async () => {

    // Tu codigo aqui:
    // Primero necesitas obtener los datos con Promise.all
    // Luego muestra el resumen:
    const [respUsuario, respPosts, respAlbums] = 
        await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users/1'),
        fetch('https://jsonplaceholder.typicode.com/posts?userId=1'),
        fetch('https://jsonplaceholder.typicode.com/albums?userId=1')
   ]);

    let vector = []; 

    vector = [usuario, posts, albums]  = 
        await Promise.all([
        respUsuario.json(), 
        respPosts.json(), 
        respAlbums.json()
    ]);
    console.log('=== RESUMEN V E C T O R ===');
    console.log('Usuario:', vector[0]);
    console.log('Posts:', vector[1], 'publicaciones');
    console.log('Albums:', vector[2], 'albumes');

});

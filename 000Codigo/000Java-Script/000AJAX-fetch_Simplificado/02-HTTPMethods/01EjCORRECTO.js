console.log('=== Ejercicio 01: GET con query params ===');

// =============================================
// TAREA 1: Fetch a /posts?userId=1
// Obtén todos los posts del usuario 1
// y muestra cuántos hay con .length
// =============================================

/* Tu código aquí */
// 💡 Pista: Los query params se añaden directamente a la URL
// como un string después del signo "?". Varios params se
// separan con "&".
//
// const respuesta = await fetch('https://jsonplaceholder.typicode.com/posts?userId=1');
// const posts = await respuesta.json();
// console.log('Posts del usuario 1:', posts.length);
//

// =============================================
// TAREA 2: Fetch a /posts?userId=1&_limit=3
// Ahora limita a solo 3 resultados
// y muestra los títulos
// =============================================

/* Tu código aquí */
// 💡 Pista: Añade otro query param con "&":
//
// const respuesta2 = await fetch('https://jsonplaceholder.typicode.com/posts?userId=1&_limit=3');
// const postsLimitados = await respuesta2.json();
// console.log('Solo 3 posts:', postsLimitados);
// postsLimitados.forEach((post) => console.log('-', post.title));
//

// =============================================
// TAREA 3: Crear variable con params
// Declara una variable con los parámetros
// y úsala para construir la URL final
// =============================================

/* Tu código aquí */
// 💡 Pista: Puedes construir la URL usando template literals:
//
// const userId = 2;
// const limite = 5;
// const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}&_limit=${limite}`;
// const respuesta3 = await fetch(url);
// const misPosts = await respuesta3.json();
// console.log(`Posts del usuario ${userId} (máx ${limite}):`, misPosts);
//

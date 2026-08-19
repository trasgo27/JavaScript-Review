console.log('=== Ejercicio 01: GET con query params ===');
console.log('En el 01Ej.html he modificado script type="module" ');

// =============================================
// TAREA 1: Fetch a /posts?userId=1
// Obtén todos los posts del usuario 1
// y muestra cuántos hay con .length
// =============================================

/* Tu código aquí */
const respuesta = await fetch('https://jsonplaceholder.typicode.com/posts?userId=1');
const posts = await respuesta.json();
console.log('Posts del Usuario 1: ', posts.length);
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
const respuesta2 = await fetch('https://jsonplaceholder.typicode.com/posts?userId=1&_limit=3');
const respJason2 = await respuesta2.json();
console.log('Solo 3 posts: ', respJason2);//[{id,title,body},{},{}]
for(const post of respJason2){
    console.log('Titulo: ', post.id, post.title);
}
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
const idUsu = 2;
const limitacion = 3;
const url = `https://jsonplaceholder.typicode.com/posts?userId=${idUsu}&_limit=${limitacion}`;
const peticion3 = await fetch(url);
const petiJas3  = await peticion3.json();
console.log('Numero de Peticiones: ', petiJas3.length);
//mostrar for Each
petiJas3.forEach(element => {
    console.table(element);
});
// 💡 Pista: Puedes construir la URL usando template literals:
//
// const userId = 2;
// const limite = 5;
// const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}&_limit=${limite}`;
// const respuesta3 = await fetch(url);
// const misPosts = await respuesta3.json();
// console.log(`Posts del usuario ${userId} (máx ${limite}):`, misPosts);
//


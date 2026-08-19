console.log('=== Ejercicio 01: Headers personalizados ===');

const API = 'https://jsonplaceholder.typicode.com';

// ============================================================
// TAREA 1: Fetch con header X-Custom-Header
// ============================================================
// Haz fetch a /posts/1 con el header personalizado X-Custom-Header

async function hacerEj1() {
  console.log('\n--- Tarea 1: Header X-Custom-Header ---');

  // 💡 Pista: En la segunda opción del fetch, pasa un objeto con la propiedad headers.
  // Usa el constructor Headers o un objeto plano:
  //
  //   const respuesta = await fetch(`${API}/posts/1`, {
  //     headers: {
  //       'X-Custom-Header': 'salvacode'
  //     }
  //   });
  //   const datos = await respuesta.json();
  //   console.log('Post:', datos);

  /* Tu código aquí */
}

// ============================================================
// TAREA 2: Fetch con header Accept
// ============================================================
// Haz fetch a /posts/2 indicando que aceptas JSON

async function hacerEj2() {
  console.log('\n--- Tarea 2: Header Accept ---');

  // 💡 Pista: El header Accept le dice al servidor qué formato esperas:
  //
  //   const respuesta = await fetch(`${API}/posts/2`, {
  //     headers: {
  //       'Accept': 'application/json'
  //     }
  //   });
  //   const datos = await respuesta.json();
  //   console.log('Post:', datos);

  /* Tu código aquí */
}

// ============================================================
// TAREA 3: Función fetchConHeaders(url, headersObj)
// ============================================================
// Crea una función reutilizable que combine fetch con headers

async function hacerEj3() {
  console.log('\n--- Tarea 3: Función fetchConHeaders ---');

  // 💡 Pista: Define una función async que acepte url y headersObj:
  //
  //   async function fetchConHeaders(url, headersObj) {
  //     const respuesta = await fetch(url, {
  //       headers: headersObj
  //     });
  //     return await respuesta.json();
  //   }
  //
  // Luego úsala:
  //   const post = await fetchConHeaders(`${API}/posts/3`, { 'Accept': 'application/json' });
  //   console.log('Con función:', post);

  /* Tu código aquí */

  // 1. Crea la función fetchConHeaders
  // 2. Usa la función para obtener /posts/3
  // 3. Muestra el resultado en consola
}

// Ejecutar todos
hacerEj1();
hacerEj2();
hacerEj3();

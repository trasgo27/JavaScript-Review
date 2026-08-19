console.log('=== Ejercicio 02: await encadenado: fetch → fetch ===');

// ============================================================
// TAREA 1: Obtener usuario
// ============================================================
// Fetch el usuario con id=1

async function hacerEj() {
  console.log('\n--- Tarea 1: Obtener usuario ---');

  // 💡 Pista:
  //   const respuesta = await fetch('https://jsonplaceholder.typicode.com/users/1');
  //   const usuario = await respuesta.json();

  /* Tu código aquí */

  // ============================================================
  // TAREA 2: Obtener posts del usuario
  // ============================================================
  // Usa usuario.id para buscar sus posts

  console.log('\n--- Tarea 2: Obtener posts del usuario ---');

  // 💡 Pista:
  //   const postsResp = await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + usuario.id);
  //   const posts = await postsResp.json();

  /* Tu código aquí */

  // ============================================================
  // TAREA 3: Mostrar los posts
  // ============================================================
  // Recorre los posts y muestra título de cada uno

  console.log('\n--- Tarea 3: Mostrar posts ---');

  // 💡 Pista:
  //   console.log('El usuario ' + usuario.name + ' tiene ' + posts.length + ' posts:');
  //   posts.forEach(post => console.log('  -', post.title));

  /* Tu código aquí */
}

hacerEj();

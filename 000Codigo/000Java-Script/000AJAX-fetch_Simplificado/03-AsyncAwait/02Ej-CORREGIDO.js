console.log('=== Ejercicio 02 (CORREGIDO): await encadenado: fetch → fetch ===');

// ============================================================
// VERSIÓN CORREGIDA — Solo async/await, sin .then()
// ============================================================

async function hacerEj() {

  // ── TAREA 1: Obtener usuario ──────────────────────────────
  console.log('\n--- Tarea 1: Obtener usuario ---');

  // ✅ CORRECCIÓN: await directo, sin función async innecesaria
  try {
    const respuesta = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const usuario = await respuesta.json();

    console.log('Mostrar Usuario 1: ');
    console.table(usuario);

    // ── TAREA 2: Obtener posts del usuario ────────────────────
    console.log('\n--- Tarea 2: Obtener posts del usuario ---');

    // ✅ CORRECCIÓN: Encadenamos con await, usando usuario.id
    //    No necesitamos otra función async interna
    const postsResp = await fetch(
      'https://jsonplaceholder.typicode.com/posts?userId=' + usuario.id
    );
    const posts = await postsResp.json();

    console.log('He conseguido el objeto usuario 1');
    console.log('Los posts son: ');
    console.table(posts);

    // ── TAREA 3: Mostrar los posts ────────────────────────────
    console.log('\n--- Tarea 3: Mostrar posts ---');

    // ✅ CORRECCIÓN: Tarea implementada con forEach
    console.log('El usuario ' + usuario.name + ' tiene ' + posts.length + ' posts:');
    posts.forEach(post => {
      console.log('  -', post.title);
    });

  } catch (error) {
    console.error('Error en el ejercicio:', error);
  }
}

hacerEj();

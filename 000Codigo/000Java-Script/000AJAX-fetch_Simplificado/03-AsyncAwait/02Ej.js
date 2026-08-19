console.log('=== Ejercicio 02: await encadenado: fetch → fetch ===');

async function hacerEj() {
  try {
    // TAREA 1: Obtener usuario
    console.log('\n--- Tarea 1: Obtener usuario ---');
    const respuesta = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const usuario = await respuesta.json();
    console.log('Mostrar Usuario 1: ');
    console.table(usuario);

    // TAREA 2: Obtener posts del usuario
    console.log('\n--- Tarea 2: Obtener posts del usuario ---');
    const postsResp = await fetch(
      'https://jsonplaceholder.typicode.com/posts?userId=' + usuario.id
    );
    const posts = await postsResp.json();
    console.log('Los posts son: ');
    console.table(posts);

    // TAREA 3: Mostrar posts
    console.log('\n--- Tarea 3: Mostrar posts ---');
    console.log('El usuario ' + usuario.name + ' tiene ' + posts.length + ' posts:');
    posts.forEach(post => console.log('  -', post.title));

  } catch (error) {
    console.error('Error:', error);
  }
}

hacerEj();

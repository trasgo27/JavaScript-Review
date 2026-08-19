console.log('=== Ejercicio 01: fetch() NO falla en 404 ===');

// ============================================================
// TAREA 1: Fetch a recurso inexistente
// ============================================================
// Haz fetch a /posts/99999

function hacerEj() {
  console.log('\n--- Tarea 1: Fetch a /posts/99999 ---');

  // 💡 Pista:
  //   fetch('https://jsonplaceholder.typicode.com/posts/99999')
  //     .then(respuesta => {
  //       // vamos a la tarea 2 y 3
  //     });

  /* Tu código aquí */

  // ============================================================
  // TAREA 2: Verificar que NO entró al catch
  // ============================================================
  // Muestra un mensaje indicando que la promesa se resolvió

  // 💡 Pista: Después del .then(), añade .catch():
  //   .catch(error => {
  //     console.log('Este catch NO debería ejecutarse');
  //   });

  /* Tu código aquí */

  // ============================================================
  // TAREA 3: Inspeccionar response.ok y response.status
  // ============================================================
  // Muestra el estado real de la respuesta

  // 💡 Pista: Dentro del .then():
  //   console.log('¿response.ok?', respuesta.ok);         // → false
  //   console.log('response.status:', respuesta.status);   // → 404
  //   console.log('fetch NO lanzó error, ¡aunque el post no existe!');

  /* Tu código aquí */
}

hacerEj();

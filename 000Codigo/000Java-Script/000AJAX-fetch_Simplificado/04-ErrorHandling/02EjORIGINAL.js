console.log('=== Ejercicio 02: Verificar response.ok SIEMPRE ===');

// ============================================================
// TAREA 1: Hacer fetch genérico
// ============================================================
// Fetch a una URL de la API

function hacerEj() {
  console.log('\n--- Tarea 1: Fetch genérico ---');

  // 💡 Pista:
  //   fetch('https://jsonplaceholder.typicode.com/posts/99999')
  //     .then(respuesta => {
  //       // vamos a la tarea 2
  //     });

  /* Tu código aquí */

  // ============================================================
  // TAREA 2: Verificar response.ok
  // ============================================================
  // Si response.ok es false, lanza un error manualmente

  // 💡 Pista: Dentro del .then():
  //   if (!respuesta.ok) {
  //     throw new Error('Error HTTP: ' + respuesta.status + ' - ' + respuesta.statusText);
  //   }
  //   // Si llega aquí, todo fue bien
  //   return respuesta.json();
  //   .then(datos => console.log('Éxito:', datos));

  /* Tu código aquí */

  // ============================================================
  // TAREA 3: Probar con URL válida y URL 404
  // ============================================================
  // Ejecuta dos veces con diferentes URLs

  console.log('\n--- Tarea 3: Probar ambas URLs ---');

  // 💡 Pista: Llama a la función dos veces:
  //   fetchConVerificacion('https://jsonplaceholder.typicode.com/posts/1');
  //   fetchConVerificacion('https://jsonplaceholder.typicode.com/posts/99999');

  // Primero define la función:

  function fetchConVerificacion(url) {
    // 💡 Pista completa:
    //   fetch(url)
    //     .then(respuesta => {
    //       if (!respuesta.ok) {
    //         throw new Error('Error HTTP: ' + respuesta.status);
    //       }
    //       return respuesta.json();
    //     })
    //     .then(datos => console.log('✅ Datos de', url, ':', datos.title || datos))
    //     .catch(error => console.log('❌ Error con', url, ':', error.message));
    /* Tu código aquí */
  }

  /* Tu código aquí: llama a fetchConVerificacion con las dos URLs */
}

hacerEj();

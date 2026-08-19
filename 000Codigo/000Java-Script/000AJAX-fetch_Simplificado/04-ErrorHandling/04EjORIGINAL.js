console.log('=== Ejercicio 04: Wrapper fetchJSON seguro ===');

// ============================================================
// TAREA 1: Crear función fetchJSON
// ============================================================
// Una función reutilizable que haga fetch seguro

function hacerEj() {
  console.log('\n--- Tarea 1: Crear fetchJSON ---');

  // 💡 Pista: La función completa con blanks:
  //
  //   async function fetchJSON(url) {
  //     const respuesta = /* Tu código aquí: haz fetch */ ;
  //
  //     /* Tu código aquí: verifica response.ok */
  //
  //     /* Tu código aquí: retorna el JSON parseado */
  //   }
  //
  // Versión completa como guía:
  //   async function fetchJSON(url) {
  //     const respuesta = await fetch(url);
  //     if (!respuesta.ok) {
  //       throw new Error('Error HTTP ' + respuesta.status + ': ' + respuesta.statusText);
  //     }
  //     return await respuesta.json();
  //   }

  async function fetchJSON(url) {
    /* Tu código aquí */
  }

  // ============================================================
  // TAREA 2: Probar con URL válida
  // ============================================================
  // Usa fetchJSON con /users/1

  console.log('\n--- Tarea 2: URL válida ---');

  // 💡 Pista:
  //   fetchJSON('https://jsonplaceholder.typicode.com/users/1')
  //     .then(datos => console.log('✅ Usuario:', datos.name, '- Email:', datos.email))
  //     .catch(error => console.log('❌ Error:', error.message));

  /* Tu código aquí */

  // ============================================================
  // TAREA 3: Probar con URL inválida
  // ============================================================
  // Usa fetchJSON con /posts/99999

  console.log('\n--- Tarea 3: URL inválida ---');

  // 💡 Pista:
  //   fetchJSON('https://jsonplaceholder.typicode.com/posts/99999')
  //     .then(datos => console.log('Post:', datos))
  //     .catch(error => console.log('❌ Error esperado:', error.message));

  /* Tu código aquí */
}

hacerEj();

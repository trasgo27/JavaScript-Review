console.log('=== Ejercicio 03: Errores de red vs HTTP ===');

// ============================================================
// TAREA 1: Error de red (TypeError)
// ============================================================
// Fetch a una URL que no existe en un dominio falso

async function hacerEj() {
  console.log('\n--- Tarea 1: Error de red ---');

  // 💡 Pista:
  //   try {
  //     const resp = await fetch('https://dominio-que-no-existe-xyz123.com/api');
  //     console.log('¿Llegamos aquí? No debería');
  //   } catch (error) {
  //     console.log('🔴 Error de RED detectado');
  //     console.log('Tipo:', error.constructor.name);  // → TypeError
  //     console.log('Mensaje:', error.message);
  //   }

  /* Tu código aquí */

  // ============================================================
  // TAREA 2: Error HTTP (404)
  // ============================================================
  // Fetch a /posts/99999 con response.ok check

  console.log('\n--- Tarea 2: Error HTTP ---');

  // 💡 Pista:
  //   try {
  //     const resp = await fetch('https://jsonplaceholder.typicode.com/posts/99999');
  //     if (!resp.ok) {
  //       throw new Error('HTTP ' + resp.status + ': ' + resp.statusText);
  //     }
  //     const datos = await resp.json();
  //     console.log('Datos:', datos);
  //   } catch (error) {
  //     console.log('🟡 Error HTTP detectado');
  //     console.log('Tipo:', error.constructor.name);  // → Error
  //     console.log('Mensaje:', error.message);
  //   }

  /* Tu código aquí */

  // ============================================================
  // TAREA 3: Diferenciar ambos en catch
  // ============================================================
  // Escribe una función que detecte el tipo de error

  console.log('\n--- Tarea 3: Diferenciar errores ---');

  // 💡 Pista: Un error de red es un TypeError:
  //   async function fetchSeguro(url) {
  //     try {
  //       const resp = await fetch(url);
  //       if (!resp.ok) {
  //         throw new Error('HTTP ' + resp.status);
  //       }
  //       return await resp.json();
  //     } catch (error) {
  //       if (error instanceof TypeError) {
  //         console.log('🔴 Error de RED (sin conexión o dominio):', error.message);
  //       } else {
  //         console.log('🟡 Error HTTP:', error.message);
  //       }
  //     }
  //   }

  // Prueba la función:

  /* Tu código aquí */
}

hacerEj();
